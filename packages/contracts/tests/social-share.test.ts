import { describe, expect, it } from 'vitest';

import {
  buildSocialSharePayload,
  SANKIWORK_GITHUB_REPO_URL,
} from '../src/api/social-share';

describe('social-share contract', () => {
  it('builds SankiWork repository share targets', () => {
    const payload = buildSocialSharePayload({
      kind: 'sankiwork-repo',
      locale: 'zh-CN',
      title: 'SankiWork GitHub',
      text: '推荐 SankiWork',
    });

    expect(payload.url).toBe(SANKIWORK_GITHUB_REPO_URL);
    expect(payload.locale).toBe('zh-CN');
    expect(payload.platforms.some((target) => target.platform === 'x' && target.shareUrl?.includes('twitter.com/intent/tweet'))).toBe(true);
    expect(payload.platforms.some((target) => target.platform === 'xiaohongshu' && target.mode === 'copy-open')).toBe(true);
  });

  it('keeps deployed project links and the repo recommendation together', () => {
    const payload = buildSocialSharePayload({
      kind: 'project-html',
      locale: 'en',
      url: 'https://example.com/sankiwork-demo',
      title: 'Demo',
      text: `Built with SankiWork. Repo: ${SANKIWORK_GITHUB_REPO_URL}`,
      copyText: `Demo\nhttps://example.com/sankiwork-demo\n${SANKIWORK_GITHUB_REPO_URL}`,
    });

    expect(payload.url).toBe('https://example.com/sankiwork-demo');
    expect(payload.githubRepoUrl).toBe(SANKIWORK_GITHUB_REPO_URL);
    expect(payload.copyText).toContain(SANKIWORK_GITHUB_REPO_URL);
    expect(payload.platforms.find((target) => target.platform === 'telegram')?.shareUrl)
      .toContain('https%3A%2F%2Fexample.com%2Fsankiwork-demo');
  });
});
