import type { TransportProblem, TransportResult } from "@/types/transport";

const HTTP_ERROR_CODE = "web.transport.http_error";
const NETWORK_ERROR_CODE = "web.transport.network_error";

function fallbackProblem(status: number): TransportProblem {
  return {
    code: HTTP_ERROR_CODE,
    title: "Request failed",
    status,
  };
}

function networkProblem(error: unknown): TransportProblem {
  return {
    code: NETWORK_ERROR_CODE,
    title: "Network request failed",
    detail: error instanceof Error ? error.message : undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asProblem(value: unknown, status: number): TransportProblem {
  if (!isRecord(value)) {
    return fallbackProblem(status);
  }

  const code =
    typeof value.code === "string" && value.code.length > 0 ? value.code : HTTP_ERROR_CODE;

  return {
    code,
    type: typeof value.type === "string" ? value.type : undefined,
    title: typeof value.title === "string" ? value.title : undefined,
    status: typeof value.status === "number" ? value.status : undefined,
    detail: typeof value.detail === "string" ? value.detail : undefined,
    instance: typeof value.instance === "string" ? value.instance : undefined,
  };
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TransportResult<T | undefined>> {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch (error) {
    return {
      ok: false,
      problem: networkProblem(error),
    };
  }

  if (response.ok) {
    if (response.status === 204) {
      return {
        ok: true,
        status: response.status,
        data: undefined,
      };
    }

    return {
      ok: true,
      status: response.status,
      data: (await response.json()) as T,
    };
  }

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    body = undefined;
  }

  return {
    ok: false,
    status: response.status,
    problem: asProblem(body, response.status),
  };
}
