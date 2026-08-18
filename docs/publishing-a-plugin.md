# Publishing An SankiWork Plugin

SankiWork registry publishing is GitHub-backed in v1. The CLI remains the
canonical workflow; the product UI and agent flows wrap these commands.

## 1. Scaffold

```bash
sw plugin scaffold --id figma-workflow --title "Figma workflow" --out ./plugins/community
```

The scaffold command creates `./plugins/community/figma-workflow/`. Plugin IDs
must be lowercase, start with a letter, and use only `[a-z0-9._-]`; slash-
separated registry paths are used by catalogs, not by `sw plugin scaffold`.
The generated `sankiwork.json` is the SankiWork sidecar next to `SKILL.md`.

## 2. Validate And Pack

```bash
sw plugin validate ./plugins/community/figma-workflow --no-daemon
sw plugin pack ./plugins/community/figma-workflow
```

The registry accepts anything that validates and packs. The source repository
does not need a special layout beyond `SKILL.md` plus `sankiwork.json`.
`sw plugin pack` writes the archive next to the plugin folder by default.

## 3. Authenticate

```bash
sw plugin login
sw plugin whoami --json
```

These commands wrap GitHub CLI. Tokens stay in `gh`; SankiWork does not store
GitHub credentials.

## 4. Publish

```bash
sw plugin publish figma-workflow --to sankiwork --repo https://github.com/acme/figma-workflow
```

v1 opens the GitHub registry review flow. The publish payload includes the
plugin ID, version, repo, capability summary, and target registry entry path.
After merge, CI regenerates `sankiwork-marketplace.json`.

## 5. Install From The Registry

```bash
sw marketplace refresh official
sw plugin install figma-workflow
sw plugin info figma-workflow --json
```

Installs preserve marketplace provenance, resolved source, manifest digest, and
archive integrity. `official` and `trusted` sources install as trusted;
`restricted` sources stay restricted until the user grants more trust.

## 6. Yank A Version

```bash
sw plugin yank figma-workflow@1.0.0 --reason "Security issue"
```

Yanking never deletes metadata or bytes. New installs refuse yanked versions;
existing exact lockfile replays can still warn and proceed if the archive
remains reachable and integrity matches.
