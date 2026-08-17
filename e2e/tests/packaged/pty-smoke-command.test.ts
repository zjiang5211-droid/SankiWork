import { describe, expect, it } from 'vitest';

import { packagedPtySmokeCommand } from '@/vitest/packaged-pty-smoke';

describe('packaged PTY smoke command', () => {
  it('expands the Windows marker only after cmd.exe applies the assignment', () => {
    const command = packagedPtySmokeCommand('win32');

    expect(command.split('\r\n')).toEqual([
      'set "SW_PTY_VALUE=PTY_OK"',
      'echo SW_PACKAGED_%SW_PTY_VALUE%',
      'exit /b 0',
      '',
    ]);
    expect(command).not.toContain('SW_PACKAGED_PTY_OK');
  });

  it('keeps the macOS marker out of echoed command input', () => {
    const command = packagedPtySmokeCommand('darwin');

    expect(command).toBe(`printf 'SW_PACKAGED_%s\\n' 'PTY_OK'; exit 0\n`);
    expect(command).not.toContain('SW_PACKAGED_PTY_OK');
  });
});
