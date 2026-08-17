// Help surface for `sw design-systems`. Kept pure and separate from cli.ts so a
// test can assert the advertised subcommands without spawning the CLI or
// stubbing process.exit / console.log.

export const DESIGN_SYSTEMS_USAGE = `Usage:
  sw design-systems list                       List design systems.
  sw design-systems show <id>                  Print one entry.
  sw design-systems rename <id> --title <new>  Rename an editable design system.
  sw design-systems download <id> [--out <p>]  Download a brand .zip (files + SKILLS.md).
  sw design-systems import-local <path>        Import a local project.
  sw design-systems import-github <url>        Import a public GitHub repo.
  sw design-systems import-shadcn <reference>  Import a shadcn registry item.
  sw design-systems rebuild-token-contract <id>  Start a token contract rebuild review.

Workspace options:
  --workspace <id>         Exact Workspace for a bound design system.
  --workspace-member <id>  Exact caller membership for a bound design system.
                           Pass both together, or omit both for legacy local data.`;

// `help`, `--help`, and `-h` all route to the usage text above. Without the
// flag forms, `sw design-systems --help` falls through to the generic library
// list, which only advertises `list` and `show` and never mentions `rename`.
export function isDesignSystemsHelpArg(arg: string | undefined): boolean {
  return arg === 'help' || arg === '--help' || arg === '-h';
}
