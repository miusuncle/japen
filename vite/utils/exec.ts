import child from 'node:child_process';

/**
 * 执行 SHELL 命令
 * @param command 要执行的命令
 */
export async function exec(
  command: string,
  {
    silent = false,
  }: {
    /** 是否打印输出？ */
    silent?: boolean;
  } = {},
) {
  return new Promise((resolve, reject) => {
    const cp = child.exec(command, (err, stdout, stderr) => {
      if (!err || err.code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(stderr.trim()));
      }
    });

    if (!silent) {
      cp.stdout.pipe(process.stdout);
      cp.stderr.pipe(process.stderr);
    }
  });
}
