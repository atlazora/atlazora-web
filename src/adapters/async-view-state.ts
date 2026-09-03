import type { AsyncViewState } from "@/types/async-view-state";
import type { TransportResult } from "@/types/transport";

export type EmptyPredicate<T> = (data: T) => boolean;

export function toAsyncViewState<T>(
  result: TransportResult<T>,
  isEmpty?: EmptyPredicate<T>,
): AsyncViewState<T> {
  if (result.ok) {
    if (isEmpty?.(result.data)) {
      return { status: "empty" };
    }

    return { status: "ready", data: result.data };
  }

  if (result.status === 403) {
    return { status: "forbidden", problem: result.problem };
  }

  return {
    status: "error",
    problem: result.problem,
    recoverable: result.status === 408 || result.status === 429 || result.status >= 500,
  };
}
