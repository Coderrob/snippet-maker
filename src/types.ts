export interface ContextField {
  name: string;
  description: string;
  type: "string" | "boolean" | "number" | "enum" | "object" | "array";
  enumValues?: string[];
}

export interface Context {
  name: string;
  prefix: string;
  fields: ContextField[];
}

export enum OperationStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

export enum FilePermission {
  READ = "read",
  WRITE = "write",
}

export interface IFileSystemResult<T> {
  status: OperationStatus;
  requires?: FilePermission;
  data?: T;
  reason?: string;
  encoding?: BufferEncoding;
}

export interface IFileProvider<T> {
  load: (filePath: string, defaultValue?: T) => Promise<IFileSystemResult<T>>;
  save: (filePath: string, data: T) => Promise<IFileSystemResult<T>>;
}

export interface IFolderOperations {
  ensureDirectoryExists(
    directoryPath: string
  ): Promise<IFileSystemResult<void>>;
}
