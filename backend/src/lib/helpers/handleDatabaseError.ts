export function handleDatabaseError(error: Error): DatabaseError;
export function handleDatabaseError(
  customMessage: string,
  joinErrorName: true,
): (error: Error) => DatabaseError;
export function handleDatabaseError(
  customMessage: string,
  joinErrorName?: false | undefined,
): () => DatabaseError;
export function handleDatabaseError(
  customMessageOrError: string | Error,
  joinErrorName?: boolean,
) {
  if (typeof customMessageOrError === "string") {
    if (joinErrorName) {
      return (error: Error) =>
        new DatabaseError(`${customMessageOrError}: ${error.message}`);
    }
    return () => new DatabaseError(customMessageOrError);
  }

  return new DatabaseError(
    `Database operation failed: ${customMessageOrError.message}`,
  );
}

export class DatabaseError extends Error {
  /**
   * Custom error class for handling database-related errors.
   * @param message - The error message to be associated with the error.
   */
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}
