import type { Context } from '@deepseek-ai/cordis';
import type { InvariantInstaller } from '@deepseek-ai/dsh-invariants';

const PACKAGE_NAME = '@sankiwork/dsh-runtime';
export const name = 'sankiwork-runtime-invariant';
export const inject = ['invariants'];
const install: InvariantInstaller = () => {};

export const apply = (ctx: Context): Promise<() => void> =>
  Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
