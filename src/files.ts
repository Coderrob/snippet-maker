/*
 * Copyright 2025 Robert Lindley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import path from "path";
import { FileProvider } from "./file-provider.js";
import { JsonFileProvider } from "./json-file-provider.js";
import { YamlFileProvider } from "./yaml-file-provider.js";

export const DEFAULT_ENCODING: BufferEncoding = "utf-8";

/**
 * Factory function to retrieve a file provider based on extension.
 */
export function getFileProvider<T>(filePath: string): FileProvider<T> {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".json":
      return new JsonFileProvider();
    case ".yaml":
    case ".yml":
      return new YamlFileProvider();
    default:
      throw new Error(`Unsupported file extension: ${ext}`);
  }
}
