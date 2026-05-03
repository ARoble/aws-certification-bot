import { describe, it, expect } from "vitest";
import { config } from "./config";

describe("config", () => {
  it("should load default port", () => {
    expect(config.port).toBe(3000);
  });
});
