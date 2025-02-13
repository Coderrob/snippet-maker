import { SnippetFactory } from "./snippet-factory";
import path from "path";
import { getFileProvider } from "./files";

/**
 * Writes the generated snippets to a JSON file.
 */
export class SnippetWriter {
  private static readonly OUTPUT_PATH = ".vscode/snippets/";

  static async writeSnippets(filename: string): Promise<void> {
    const snippets = SnippetFactory.generateAllSnippets();
    const provider = getFileProvider(filename);
    const filepath = path.join(this.OUTPUT_PATH, filename);
    await provider.save(filepath, JSON.stringify(snippets, null, 2));
    console.log(`✅ Snippets saved to ${this.OUTPUT_PATH}`);
  }
}
