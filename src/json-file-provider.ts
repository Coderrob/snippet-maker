import { FileProvider } from "./file-provider";

/**
 * JSON file provider implementing FileProvider.
 */

export class JsonFileProvider<T> extends FileProvider<T> {
  parse(content: string): T {
    return JSON.parse(content);
  }

  serialize(data: T): string {
    return JSON.stringify(data, null, 2);
  }
}
