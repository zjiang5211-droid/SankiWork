import { describe, expect, it } from 'vitest';

import { buildAgentGuideMarkdown } from '../../src/components/use-everywhere/agent-guide';
import { GUIDE_SECTIONS } from '../../src/components/use-everywhere/sections';

describe('buildAgentGuideMarkdown', () => {
  it('emits a top-level header and the setup checklist by default', () => {
    const md = buildAgentGuideMarkdown();
    expect(md).toMatch(/^# SankiWork — agent setup guide/);
    expect(md).toContain('## Setup checklist');
    expect(md).toContain('http://127.0.0.1:7456/api/health');
    expect(md).toContain('http://127.0.0.1:7456/api/mcp/install-info');
  });

  it('substitutes the daemonUrl into every default snippet URL', () => {
    const md = buildAgentGuideMarkdown({ daemonUrl: 'http://localhost:9999' });
    expect(md).toContain('http://localhost:9999/api/health');
    expect(md).toContain('http://localhost:9999/api/mcp/install-info');
    expect(md).not.toContain('http://127.0.0.1:7456');
  });

  it('strips a trailing slash on the daemonUrl so URLs do not double up', () => {
    const md = buildAgentGuideMarkdown({ daemonUrl: 'http://example.test:1234/' });
    expect(md).toContain('http://example.test:1234/api/health');
    expect(md).not.toContain('http://example.test:1234//api/health');
  });

  it('includes every guide section heading', () => {
    const md = buildAgentGuideMarkdown();
    for (const section of GUIDE_SECTIONS) {
      expect(md).toContain(`## ${section.heading}`);
    }
  });

  it('renders fenced code blocks that match each snippet language', () => {
    const md = buildAgentGuideMarkdown();
    const fenceCount = (md.match(/```/g) ?? []).length;
    expect(fenceCount % 2).toBe(0);
    expect(fenceCount).toBeGreaterThan(GUIDE_SECTIONS.length * 2);
    expect(md).toContain('```bash');
    expect(md).toContain('```json');
    expect(md).toContain('```yaml');
  });

  it('documents the current project create plus run start CLI flow', () => {
    const md = buildAgentGuideMarkdown();
    expect(md).toContain('sw project create');
    expect(md).toContain('sw run start');
    expect(md).toContain('--conversation "$CONVERSATION_ID"');
    expect(md).toContain('[form answers - discovery]');
    expect(md).toContain('sw files list "$PROJECT_ID"');
    expect(md).not.toContain('sw run \\\n  --plugin');
    expect(md).not.toContain("--prompt 'A 10-slide investor pitch");
  });

  it('surfaces version and CLI hints in the checklist when supplied', () => {
    const md = buildAgentGuideMarkdown({
      versionHint: '0.42.0',
      cliHint: '/usr/local/bin/sw',
    });
    expect(md).toContain('Reported SankiWork version: `0.42.0`');
    expect(md).toContain('The user reported `sw` at: `/usr/local/bin/sw`');
  });

  it('omits hint sentences when the corresponding option is not provided', () => {
    const md = buildAgentGuideMarkdown();
    expect(md).not.toContain('Reported SankiWork version');
    expect(md).not.toContain('The user reported `sw` at');
  });

  it('always closes with a Reference URLs section', () => {
    const md = buildAgentGuideMarkdown({ daemonUrl: 'http://example.test:5555' });
    expect(md).toContain('## Reference URLs');
    expect(md).toContain('- Daemon: `http://example.test:5555`');
    expect(md).toContain('- MCP install info: `http://example.test:5555/api/mcp/install-info`');
  });

  it('uses daemon install-info for the MCP config instead of assuming sw is on PATH', () => {
    const md = buildAgentGuideMarkdown({
      daemonUrl: 'http://127.0.0.1:7456',
      mcpInstallInfo: {
        command: 'C:\\Program Files\\SankiWork\\SankiWork.exe',
        args: [
          'C:\\Program Files\\SankiWork\\resources\\app\\apps\\daemon\\dist\\cli.js',
          'mcp',
        ],
        env: {
          ELECTRON_RUN_AS_NODE: '1',
          SW_DATA_DIR: 'C:\\Users\\Ada\\AppData\\Roaming\\SankiWork',
        },
      },
    });

    expect(md).toContain('"command": "C:\\\\Program Files\\\\SankiWork\\\\SankiWork.exe"');
    expect(md).toContain(
      '"C:\\\\Program Files\\\\SankiWork\\\\resources\\\\app\\\\apps\\\\daemon\\\\dist\\\\cli.js"',
    );
    expect(md).toContain('"ELECTRON_RUN_AS_NODE": "1"');
    expect(md).toContain('"SW_DATA_DIR": "C:\\\\Users\\\\Ada\\\\AppData\\\\Roaming\\\\SankiWork"');
    expect(md).not.toContain('"command": "sw"');
  });

  it('does not rewrite CLI snippets with POSIX env prefixes for Windows packaged installs', () => {
    const md = buildAgentGuideMarkdown({
      daemonUrl: 'http://127.0.0.1:7456',
      mcpInstallInfo: {
        command: 'C:\\Program Files\\SankiWork\\SankiWork.exe',
        args: [
          'C:\\Program Files\\SankiWork\\resources\\app\\apps\\daemon\\dist\\cli.js',
          'mcp',
        ],
        env: {
          ELECTRON_RUN_AS_NODE: '1',
          SW_DATA_DIR: 'C:\\Users\\Ada\\AppData\\Roaming\\SankiWork',
        },
      },
    });

    expect(md).toContain('"command": "C:\\\\Program Files\\\\SankiWork\\\\SankiWork.exe"');
    expect(md).toContain('"ELECTRON_RUN_AS_NODE": "1"');
    expect(md).toContain('sw skills list --json');
    expect(md).not.toMatch(/^\s*ELECTRON_RUN_AS_NODE=1\s+SW_DATA_DIR=/m);
  });
});
