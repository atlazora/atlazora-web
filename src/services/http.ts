import type { TransportProblem, TransportResult } from "@/types/transport";

function fallbackProblem(status: number): TransportProblem {
  return {
    title: "Request failed",
    status,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asProblem(value: unknown, status: number): TransportProblem {
  if (!isRecord(value)) {
    return fallbackProblem(status);
  }

  return {
    type: typeof value.type === "string" ? value.type : undefined,
    title: typeof value.title === "string" ? value.title : "Request failed",
    status: typeof value.status === "number" ? value.status : status,
    detail: typeof value.detail === "string" ? value.detail : undefined,
    instance: typeof value.instance === "string" ? value.instance : undefined,
    code: typeof value.code === "string" ? value.code : undefined,
  };
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TransportResult<T>> {
  const response = await fetch(input, init);

  if (response.ok) {
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
