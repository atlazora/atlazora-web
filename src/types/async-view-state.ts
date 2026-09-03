import type { TransportProblem } from "@/types/transport";

export type AsyncViewState<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "empty" }
  | { status: "forbidden"; problem: TransportProblem }
  | { status: "error"; problem: TransportProblem; recoverable: boolean };
