import { CONTEXTS } from "./snippet-gen";
import { SnippetGenerator } from "./snippet-generator";

/**
 * Generates snippets for all defined GitHub contexts.
 */
export class SnippetFactory {
  static generateAllSnippets(): Record<string, any> {
    return CONTEXTS.reduce((snippets, context) => {
      return { ...snippets, ...SnippetGenerator.generateSnippet(context) };
    }, {});
  }
}
