import { afterEach, describe, expect, it, vi } from "vitest";

import { toAsyncViewState } from "@/adapters/async-view-state";
import type { TransportResult } from "@/types/transport";

import { requestJson } from "@/services/http";

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
      problem: { code: "service.unavailable", title: "Unavailable", status: 503 },
    };

    expect(toAsyncViewState(result)).toMatchObject({
      status: "error",
      recoverable: true,
    });
  });
});

describe("HTTP transport hardening", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles 204 responses without forcing JSON parsing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 204 })));

    const result = await requestJson<never>("https://example.test/no-content");

    expect(result).toEqual({
      ok: true,
      status: 204,
      data: undefined,
    });
  });

  it("normalizes network failures without inventing an HTTP status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network unavailable")));

    const result = await requestJson<unknown>("https://example.test/network");

    expect(result).toEqual({
      ok: false,
      problem: {
        code: "web.transport.network_error",
        title: "Network request failed",
        detail: "network unavailable",
      },
    });
  });

  it("preserves authoritative problem code with optional RFC fields", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ code: "resource.not_found", detail: "Missing" }), {
          status: 404,
          headers: { "content-type": "application/problem+json" },
        }),
      ),
    );

    const result = await requestJson<unknown>("https://example.test/missing");

    expect(result).toEqual({
      ok: false,
      status: 404,
      problem: {
        code: "resource.not_found",
        type: undefined,
        title: undefined,
        status: undefined,
        detail: "Missing",
        instance: undefined,
      },
    });
  });
});
