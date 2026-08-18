import type { Express } from 'express';
import type {
  SankiWorkDiscordPresenceResponse,
  SankiWorkGithubLatestReleaseResponse,
  SankiWorkGithubRepoResponse,
} from '@sankiwork/contracts';
import type { RouteDeps } from '../server-context.js';
import {
  SANKIWORK_DISCORD_INVITE_URL,
  type SankiWorkPublicMetadataService,
} from '../services/sankiwork-public-metadata.js';

export interface RegisterSankiWorkPublicMetadataRoutesDeps extends RouteDeps<'http'> {
  sankiWorkPublicMetadata: SankiWorkPublicMetadataService;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function registerSankiWorkPublicMetadataRoutes(
  app: Express,
  ctx: RegisterSankiWorkPublicMetadataRoutesDeps,
): void {
  const { sankiWorkPublicMetadata } = ctx;

  app.get('/api/github/sankiwork', async (_req, res) => {
    try {
      const stats = await sankiWorkPublicMetadata.readGithubRepoStats();
      const payload: SankiWorkGithubRepoResponse = {
        repo: 'nexu-io/open-design',
        stargazers_count: stats.stargazersCount,
        fetchedAt: stats.fetchedAt,
        stale: stats.stale,
      };
      res.json(payload);
    } catch (error) {
      res.status(502).json({ error: errorMessage(error) });
    }
  });

  app.get('/api/github/sankiwork/releases/latest', async (_req, res) => {
    try {
      const release = await sankiWorkPublicMetadata.readLatestReleaseInfo();
      const payload: SankiWorkGithubLatestReleaseResponse = {
        repo: 'nexu-io/open-design',
        tag_name: release.tagName,
        html_url: release.htmlUrl,
        fetchedAt: release.fetchedAt,
        stale: release.stale,
      };
      res.json(payload);
    } catch (error) {
      res.status(502).json({ error: errorMessage(error) });
    }
  });

  app.get('/api/community/discord', async (_req, res) => {
    try {
      const presence = await sankiWorkPublicMetadata.readDiscordPresence();
      const payload: SankiWorkDiscordPresenceResponse = {
        inviteCode: 'mHAjSMV6gz',
        inviteUrl: SANKIWORK_DISCORD_INVITE_URL,
        onlineCount: presence.onlineCount,
        memberCount: presence.memberCount,
        fetchedAt: presence.fetchedAt,
        stale: presence.stale,
      };
      res.json(payload);
    } catch (error) {
      res.status(502).json({ error: errorMessage(error) });
    }
  });
}
