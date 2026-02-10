import { describe, expect, it } from "vitest";
import {
  isMembersListKey,
  isUnassignedAttributeKey,
  parseMemberNames,
  resolveMembersAttributeKey,
} from "./attributes";

describe("attributes", () => {
  it("finds explicit unassigned-members keys first", () => {
    const attributes: Array<[string, string]> = [
      ["members", "a,b"],
      ["Unassigned Members", "x,y"],
    ];
    expect(resolveMembersAttributeKey(attributes)).toBe("Unassigned Members");
  });

  it("parses member names from delimited text and JSON arrays", () => {
    expect(parseMemberNames("a, b, c")).toEqual(["a", "b", "c"]);
    expect(parseMemberNames('["a","b","a"]')).toEqual(["a", "b"]);
  });

  it("detects member list and unassigned attribute keys", () => {
    expect(isMembersListKey("members", "abc")).toBe(true);
    expect(isMembersListKey("notes", "abc")).toBe(false);
    expect(isUnassignedAttributeKey("unassigned members")).toBe(true);
    expect(isUnassignedAttributeKey("members")).toBe(false);
  });
});
