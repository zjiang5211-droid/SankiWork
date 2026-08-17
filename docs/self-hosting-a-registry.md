# Self-hosting An SankiWork Registry

An SankiWork registry is a source of `open-design-marketplace.json` plus the
review process that produces it. In v1 this can be a static GitHub repository,
GitHub Enterprise, S3/R2, or any HTTPS host.

## Static Catalog Shape

```text
plugins/registry/
  official/open-design-marketplace.json
  community/open-design-marketplace.json
plugins/community/<vendor>/<plugin-name>/
  SKILL.md
  open-design.json
```

The machine-readable URL is the raw JSON file:

```bash
sw marketplace add https://example.com/open-design-marketplace.json --trust restricted
sw marketplace refresh <id>
sw marketplace search "deck" --json
```

Do not add a GitHub tree page. The daemon validates the response as JSON and
rejects HTML.

## Private GitHub Or GitHub Enterprise

```bash
sw marketplace login https://github.example.com/org/plugin-registry
sw marketplace add https://raw.github.example.com/org/plugin-registry/main/open-design-marketplace.json --trust trusted
```

Authentication is delegated to `gh auth login --hostname <host>`. Tokens stay
inside GitHub CLI.

## Doctor

```bash
sw marketplace doctor <id> --strict --json
```

Doctor checks stable `vendor/plugin-name` IDs, source/archive presence,
archive integrity, yanking reasons, dist-tag consistency, publisher identity,
license, and capability summaries.

## Database Backend Path

The runtime code talks to `RegistryBackend`. A static JSON registry, GitHub PR
registry, and database registry expose the same list/search/resolve/publish/yank
contract. A commercial deployment can replace the static backend with a managed
database for:

- private catalogs
- organization allowlists
- approval workflows
- SSO-backed publisher identity
- audit logs
- entitlements and paid distribution

The CLI vocabulary stays the same: `sw marketplace add/search/doctor`,
`sw plugin install/upgrade/publish/yank`.
