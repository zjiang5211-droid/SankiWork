import { expect, test } from 'vitest';

import { resolveSafePromptImagePaths, selectPromptImagePaths } from '../src/server.js';

test('selectPromptImagePaths uses staged AMR paths in prompt text', () => {
  expect(
    selectPromptImagePaths(
      'amr',
      ['/tmp/sw-uploads/original.png'],
      ['/project/.amr-attachments/staged.png'],
    ),
  ).toEqual(['/project/.amr-attachments/staged.png']);
});

test('selectPromptImagePaths keeps original paths for non-AMR agents', () => {
  expect(
    selectPromptImagePaths(
      'opencode',
      ['/tmp/sw-uploads/original.png'],
      ['/project/.amr-attachments/staged.png'],
    ),
  ).toEqual(['/tmp/sw-uploads/original.png']);
});

test('resolveSafePromptImagePaths rejects images larger than 1 MB', () => {
  const result = resolveSafePromptImagePaths(
    ['/tmp/sw-uploads/too-large.png', '/tmp/sw-uploads/ok.png'],
    {
      uploadDir: '/tmp/sw-uploads',
      existsSync: () => true,
      statSync: (inputPath: string) => ({
        isFile: () => true,
        size: inputPath.endsWith('too-large.png') ? 1024 * 1024 + 1 : 1024,
      }),
    },
  );

  expect(result.safeImages).toEqual(['/tmp/sw-uploads/ok.png']);
  expect(result.oversizedImages).toEqual([
    { path: '/tmp/sw-uploads/too-large.png', sizeBytes: 1024 * 1024 + 1 },
  ]);
});

test('resolveSafePromptImagePaths keeps images at or below 1 MB', () => {
  const result = resolveSafePromptImagePaths(
    ['/tmp/sw-uploads/exactly-1mb.png'],
    {
      uploadDir: '/tmp/sw-uploads',
      existsSync: () => true,
      statSync: () => ({
        isFile: () => true,
        size: 1024 * 1024,
      }),
    },
  );

  expect(result.safeImages).toEqual(['/tmp/sw-uploads/exactly-1mb.png']);
  expect(result.oversizedImages).toEqual([]);
});

test('resolveSafePromptImagePaths surfaces stat failures instead of dropping the image', () => {
  const result = resolveSafePromptImagePaths(['/tmp/sw-uploads/unreadable.png'], {
    uploadDir: '/tmp/sw-uploads',
    existsSync: () => true,
    statSync: () => {
      throw Object.assign(new Error('EACCES: permission denied'), {
        code: 'EACCES',
      });
    },
  });

  expect(result.safeImages).toEqual([]);
  expect(result.oversizedImages).toEqual([]);
  expect(result.failedImages).toEqual([
    { path: '/tmp/sw-uploads/unreadable.png', error: 'EACCES: permission denied' },
  ]);
});
