// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

import { openFirstPartyExternalLinkFromClick } from '../src/first-party-external-link';

describe('openFirstPartyExternalLinkFromClick', () => {
  it('bridges the final URL after a bubbling AMR handler appends attribution parameters', () => {
    const opened = vi.fn();
    const anchor = document.createElement('a');
    anchor.href = 'https://sanki-ai.cloud/console';
    anchor.addEventListener('click', () => {
      const url = new URL(anchor.href);
      url.searchParams.set('od_origin', 'sankiwork');
      url.searchParams.set('od_entry_id', 'settings');
      url.searchParams.set('od_device_id', 'install-123');
      anchor.href = url.toString();
    });
    document.body.append(anchor);
    const listener = (event: MouseEvent) => openFirstPartyExternalLinkFromClick(event, opened);
    document.addEventListener('click', listener);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    anchor.dispatchEvent(event);
    document.removeEventListener('click', listener);

    expect(event.defaultPrevented).toBe(true);
    expect(opened).toHaveBeenCalledWith(
      'https://sanki-ai.cloud/console?od_origin=sankiwork&od_entry_id=settings&od_device_id=install-123',
    );
  });
});
