import { exec } from './exec';

/**
 * 获取当前 Commit ID
 * @param length 需要截取的长度 (默认前 16 位)
 */
export async function getRepoCommitId(length = 16) {
  return String(await exec('git rev-parse HEAD', { silent: true })).slice(0, length);
}
