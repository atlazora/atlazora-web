import { describe, expect, it } from "vitest";

import { toAsyncViewState } from "@/adapters/async-view-state";
import type { TransportResult } from "@/types/transport";

describe("toAsyncViewState", () => {
  it("maps successful data to ready", () => {
    const result: TransportResult<string[]> = {
      ok: true,
      status: 200,
      data: ["item"],
    };

    expect(toAsyncViewState(result, (items) => items.length === 0)).toEqual({
      status: "ready",
      data: ["item"],
    });
  });

  it("maps successful empty data to empty", () => {
    const result: TransportResult<string[]> = {
      ok: true,
      status: 200,
      data: [],
    };

    expect(toAsyncViewState(result, (items) => items.length === 0)).toEqual({
      status: "empty",
    });
  });

  it("maps 403 to forbidden", () => {
    const result: TransportResult<never> = {
      ok: false,
      status: 403,
      problem: { title: "Forbidden", status: 403, code: "forbidden" },
    };

    expect(toAsyncViewState(result)).toMatchObject({
      status: "forbidden",
    });
  });

  it("marks server failures as recoverable", () => {
    const result: TransportResult<never> = {
      ok: false,
      status: 503,
      problem: { title: "Unavailable", status: 503 },
    };

    expect(toAsyncViewState(result)).toMatchObject({
      status: "error",
      recoverable: true,
    });
  });
});
