export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static isServerError(error: unknown): boolean {
    return error instanceof ApiError && error.statusCode >= 500;
  }

  static isNotFound(error: unknown): boolean {
    return error instanceof ApiError && error.statusCode === 404;
  }
}
