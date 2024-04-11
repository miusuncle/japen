type Transform = (text: string) => string | Promise<string>;

/**
 * 将带有标记的内容转换成 HTML 文本块
 */
export async function contentToBlocks(
  text: string,
  { transform = [] }: { transform?: Transform | Transform[] } = {},
) {
  if (!text.trim()) {
    return null;
  }

  const blocks: React.ReactNode[] = [];

  // 两个（或以上）换行符拆分成块
  const sections = text.split(/(?:\r?\n){2,}/);

  for (const [index, section] of Object.entries(sections)) {
    // 通过单换行符拆分行
    const lines = section.split(/(?:\r?\n)/);
    if (lines.every(line => !line?.trim())) {
      continue;
    }

    const pieces: React.ReactNode[] = [];
    for (const [idx, line] of Object.entries(lines)) {
      if (!line.trim()) {
        continue;
      }

      const transforms = Array.isArray(transform) ? transform : [transform];
      let text = line;

      for (const transform of transforms) {
        text = await transform(text);
      }

      pieces.push(
        <div
          key={idx}
          className="text-piece"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />,
      );
    }

    blocks.push(
      <div key={index} className="text-block">
        {pieces}
      </div>,
    );
  }

  return <>{blocks}</>;
}
