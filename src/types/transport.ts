export type TransportProblem = {
  code: string;
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
};

export type TransportSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

export type TransportFailure = {
  ok: false;
  status?: number;
  problem: TransportProblem;
};

export type TransportResult<T> = TransportSuccess<T> | TransportFailure;
