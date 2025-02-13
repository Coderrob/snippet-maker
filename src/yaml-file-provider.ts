import yaml from "js-yaml";
import { FileProvider } from "./file-provider";

/**
 * YAML file provider implementing FileProvider.
 */

export class YamlFileProvider<T> extends FileProvider<T> {
  parse(content: string): T {
    return yaml.load(content, { json: true }) as T;
  }

  serialize(
    data: T,
    {
      condenseFlow = false,
      indent = 2,
      sortKeys = false,
    }: { sortKeys?: boolean; condenseFlow?: boolean; indent?: number } = {}
  ): string {
    return yaml.dump(data, { sortKeys, condenseFlow, indent });
  }
}
