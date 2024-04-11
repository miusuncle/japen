/**
 * 下载文件
 * @param file 文件 Blob
 * @param downloadName 下载名称
 */
export function downloadFile(file: Blob, downloadName = `japen-${Date.now()}`) {
  const link = document.createElement('a');
  link.download = downloadName;
  link.href = URL.createObjectURL(file);
  link.click();
}
