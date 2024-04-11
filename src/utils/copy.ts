/**
 * 拷贝文字到剪贴板
 * @param text 需要拷贝的文字
 */
export async function copyText(text: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const clipboardItem = new ClipboardItem({ 'text/plain': blob });
  await navigator.clipboard['write']([clipboardItem]);
}

/**
 * 下载文件
 * @param file 文件 Blob
 * @param mimeType 文件类型（默认 `image/png`）
 */
export async function copyFile(file: Blob, mimeType = 'image/png') {
  const clipboardItem = new ClipboardItem({ [mimeType]: file });
  await navigator.clipboard['write']([clipboardItem]);
}
