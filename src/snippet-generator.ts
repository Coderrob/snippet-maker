import { Context } from "./types";

/**
 * Generates a VS Code snippet from the provided context definition.
 */
export class SnippetGenerator {
  private static formatSnippetBody(context: Context): string[] {
    return [
      "env:",
      ...context.fields.map(
        (field) =>
          `  ${field.name}: \${{ ${field.name} }} # ${field.description}`
      ),
    ];
  }

  static generateSnippet(context: Context): Record<string, any> {
    return {
      [context.name]: {
        prefix: context.prefix,
        body: this.formatSnippetBody(context),
        description: `Insert commonly used ${context.name} variables`,
      },
    };
  }
}
