#!/usr/bin/env python3
"""Release + publish helper for GitHub Pages deployments.

Workflow:
1. Ensure clean git state.
2. Checkout release branch and bump package version.
3. Commit + tag the release.
4. Merge release branch into publish branch.
5. Build and sync docs via `npm run deploy:docs`.
6. Commit publish artifacts and push.
"""

from __future__ import annotations

import argparse
import json
import shlex
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
PACKAGE_JSON = REPO_ROOT / "package.json"


class PublishError(RuntimeError):
    """Raised when the publish workflow fails."""


def run_command(command: list[str], *, capture_output: bool = False) -> str:
    printable = " ".join(shlex.quote(token) for token in command)
    print(f"$ {printable}")
    completed = subprocess.run(
        command,
        cwd=REPO_ROOT,
        text=True,
        capture_output=capture_output,
    )
    if completed.returncode != 0:
        stderr = (completed.stderr or "").strip()
        stdout = (completed.stdout or "").strip()
        detail = stderr or stdout or f"exit code {completed.returncode}"
        raise PublishError(f"Command failed: {printable}\n{detail}")
    return (completed.stdout or "").strip()


def command_succeeds(command: list[str]) -> bool:
    completed = subprocess.run(
        command,
        cwd=REPO_ROOT,
        text=True,
        capture_output=True,
    )
    return completed.returncode == 0


def ensure_required_tools() -> None:
    missing = [tool for tool in ("git", "npm", "rsync") if shutil.which(tool) is None]
    if missing:
        raise PublishError(f"Missing required tools: {', '.join(missing)}")


def current_branch() -> str:
    branch = run_command(["git", "branch", "--show-current"], capture_output=True)
    if not branch:
        raise PublishError("Unable to determine current git branch.")
    return branch


def ensure_clean_worktree() -> None:
    status = run_command(["git", "status", "--porcelain"], capture_output=True)
    if status.strip():
        raise PublishError("Working tree is not clean. Commit/stash changes before publishing.")


def ensure_local_branch_exists(branch: str) -> None:
    if not command_succeeds(["git", "show-ref", "--verify", f"refs/heads/{branch}"]):
        raise PublishError(f"Local branch '{branch}' does not exist.")


def read_package_version() -> str:
    content = PACKAGE_JSON.read_text(encoding="utf-8")
    package = json.loads(content)
    version = package.get("version")
    if not isinstance(version, str) or not version:
        raise PublishError("package.json version is missing or invalid.")
    return version


def staged_changes_exist() -> bool:
    return not command_succeeds(["git", "diff", "--cached", "--quiet"])


def tag_exists(tag_name: str) -> bool:
    return command_succeeds(["git", "rev-parse", "-q", "--verify", f"refs/tags/{tag_name}"])


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Release + publish workflow for Jowna")
    parser.add_argument(
        "--release-branch",
        default="main",
        help="Branch where release commits/tags are created (default: main)",
    )
    parser.add_argument(
        "--publish-branch",
        default="publish",
        help="Branch used to host docs artifacts (default: publish)",
    )
    parser.add_argument(
        "--remote",
        default="origin",
        help="Git remote to push to (default: origin)",
    )
    parser.add_argument(
        "--bump",
        default="patch",
        choices=("patch", "minor", "major", "prepatch", "preminor", "premajor", "prerelease"),
        help="Semver increment for npm version (default: patch)",
    )
    parser.add_argument(
        "--no-pull",
        action="store_true",
        help="Skip pulling latest changes before release/publish steps.",
    )
    parser.add_argument(
        "--no-push",
        action="store_true",
        help="Run all local steps but skip pushing release/tag/publish branches.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    ensure_required_tools()
    ensure_local_branch_exists(args.release_branch)
    ensure_local_branch_exists(args.publish_branch)
    ensure_clean_worktree()

    starting_branch = current_branch()

    try:
        run_command(["git", "checkout", args.release_branch])
        if not args.no_pull:
            run_command(["git", "pull", "--ff-only", args.remote, args.release_branch])

        run_command(["npm", "version", args.bump, "--no-git-tag-version"])
        release_version = read_package_version()
        release_tag = f"v{release_version}"
        if tag_exists(release_tag):
            raise PublishError(f"Tag '{release_tag}' already exists.")

        run_command(["git", "add", "package.json", "package-lock.json"])
        run_command(["git", "commit", "-m", f"release: {release_tag}"])
        run_command(["git", "tag", release_tag])

        if not args.no_push:
            run_command(["git", "push", args.remote, args.release_branch])
            run_command(["git", "push", args.remote, release_tag])

        run_command(["git", "checkout", args.publish_branch])
        if not args.no_pull:
            run_command(["git", "pull", "--ff-only", args.remote, args.publish_branch])

        run_command(
            [
                "git",
                "merge",
                "--no-ff",
                args.release_branch,
                "-m",
                f"Merge {args.release_branch} {release_tag} into {args.publish_branch}",
            ]
        )

        run_command(["npm", "run", "deploy:docs"])
        run_command(["git", "add", "docs"])
        if staged_changes_exist():
            run_command(["git", "commit", "-m", f"publish: {release_tag}"])
        else:
            print("No docs changes detected after deploy; skipping publish commit.")

        if not args.no_push:
            run_command(["git", "push", args.remote, args.publish_branch])

        print(f"Publish workflow completed successfully for {release_tag}.")
        return 0

    except PublishError as error:
        print(f"publish.py: {error}", file=sys.stderr)
        return 1

    finally:
        try:
            if current_branch() != starting_branch:
                run_command(["git", "checkout", starting_branch])
        except Exception as restore_error:  # noqa: BLE001
            print(
                "publish.py: warning: failed to restore original branch "
                f"'{starting_branch}': {restore_error}",
                file=sys.stderr,
            )


if __name__ == "__main__":
    raise SystemExit(main())
