export class RunlyError extends Error {
  readonly exitCode: number;

  constructor(message: string, exitCode = 1) {
    super(message);
    this.name = "RunlyError";
    this.exitCode = exitCode;
  }
}

export function fail(message: string, exitCode = 1): never {
  throw new RunlyError(message, exitCode);
}
