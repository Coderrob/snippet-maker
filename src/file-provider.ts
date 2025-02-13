import fs from "fs/promises";
import path from "path";
import {
  FilePermission,
  IFileProvider,
  IFileSystemResult,
  OperationStatus,
} from "./types";
import { isError } from "util";
import { DEFAULT_ENCODING } from "./files";

/**
 * Abstract class providing base functionality for file operations.
 */
export abstract class FileProvider<T> implements IFileProvider<T> {
  abstract parse(content: string): T;
  abstract serialize(data: T): string;

  async load(
    filePath: string,
    defaultValue?: T
  ): Promise<IFileSystemResult<T>> {
    try {
      await this.ensureDirectoryExists(path.dirname(filePath));
      const content = await fs.readFile(filePath, DEFAULT_ENCODING);
      return this.successfulResult({
        content: this.parse(content),
        reason: `File ${filePath} read successfully`,
      });
    } catch (error) {
      return this.failedToRead({ error, defaultValue });
    }
  }

  async save(
    filePath: string,
    data: T,
    options = { encoding: DEFAULT_ENCODING }
  ): Promise<IFileSystemResult<T>> {
    try {
      await this.ensureDirectoryExists(path.dirname(filePath));
      await fs.writeFile(filePath, this.serialize(data), options.encoding);
      return this.successfulResult({
        reason: `Saved file ${filePath} successfully.`,
      });
    } catch (error) {
      return this.failedToWrite({ error });
    }
  }

  private async ensureDirectoryExists(directoryPath: string): Promise<void> {
    try {
      await fs.mkdir(directoryPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory ${directoryPath}: ${error}`);
    }
  }

  private failedToRead({
    error,
    defaultValue,
  }: {
    error: unknown;
    defaultValue?: T;
  }): IFileSystemResult<T> {
    return {
      status: OperationStatus.FAILURE,
      requires: FilePermission.READ,
      data: defaultValue,
      reason: `Read operation failed: ${
        isError(error) ? error.message : "Unknown error"
      }`,
      encoding: DEFAULT_ENCODING,
    };
  }

  private failedToWrite({ error }: { error: unknown }): IFileSystemResult<T> {
    return {
      status: OperationStatus.FAILURE,
      requires: FilePermission.WRITE,
      reason: `Write operation failed: ${
        isError(error) ? error.message : "Unknown error"
      }`,
    };
  }

  private successfulResult<T>({
    content,
    reason,
  }: {
    content?: T | undefined;
    reason: string;
  }): IFileSystemResult<T> {
    return {
      status: OperationStatus.SUCCESS,
      requires:
        content !== undefined ? FilePermission.READ : FilePermission.WRITE,
      data: content,
      reason,
      encoding: DEFAULT_ENCODING,
    };
  }
}
