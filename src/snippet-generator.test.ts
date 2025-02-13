import { SnippetGenerator } from "./snippet-generator";
import { Context } from "./types";

describe("Snippet Generator", () => {
  /**
   * Defines the available GitHub Actions contexts.
   */
  const CONTEXTS: Context[] = [
    {
      name: "GitHub Context",
      prefix: "gha-github",
      fields: [
        {
          name: "github.actor",
          description: "The username that triggered the workflow",
          type: "string",
        },
        {
          name: "github.repository",
          description: "The repository where the workflow runs",
          type: "string",
        },
        {
          name: "github.ref",
          description: "The Git reference for the workflow run",
          type: "string",
        },
        {
          name: "github.sha",
          description: "The commit SHA that triggered the workflow",
          type: "string",
        },
        {
          name: "github.workspace",
          description: "The absolute path to the GitHub workspace",
          type: "string",
        },
      ],
    },
    {
      name: "Job Context",
      prefix: "gha-job",
      fields: [
        {
          name: "job.status",
          description: "The status of the job",
          type: "enum",
          enumValues: ["success", "failure", "cancelled"],
        },
      ],
    },
    {
      name: "Steps Context",
      prefix: "gha-steps",
      fields: [
        {
          name: "steps.${1:step_id}.outcome",
          description: "The outcome of a previous step",
          type: "enum",
          enumValues: ["success", "failure", "cancelled", "skipped"],
        },
      ],
    },
    {
      name: "Runner Context",
      prefix: "gha-runner",
      fields: [
        {
          name: "runner.os",
          description: "The OS of the runner",
          type: "enum",
          enumValues: ["Linux", "Windows", "macOS"],
        },
        {
          name: "runner.arch",
          description: "The architecture of the runner",
          type: "enum",
          enumValues: ["X86", "X64", "ARM", "ARM64"],
        },
      ],
    },
  ];

  it("should generate a valid snippet for a given language and code", () => {
    // Arrange
    const language = "javascript";
    const code = 'console.log("Hello, world!");';
    const expectedSnippet = `// ${language} snippet\n${code}`;
    // Act
    const snippetGenerator = new SnippetGenerator();
    const result = snippetGenerator.generate(language, code);
    // Assert
    expect(result).toBe(expectedSnippet);
  });
});
