import { traverseDomBottomUp, parseStringAsDom } from '@/utils';

export function flattenNestedSpans(htmlString: string) {
  const rootNode = parseStringAsDom(htmlString);

  traverseDomBottomUp(rootNode, node => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
      if (node.children.length === 1 && node.childNodes.length === 1) {
        const childSpan = node.firstElementChild as HTMLElement;
        if (childSpan.tagName === 'SPAN') {
          // 针对有且仅有一个子元素的 span 标签做塌陷处理

          node.dataset.notation = [
            ...(childSpan.dataset.notation?.split(',') || []),
            ...(node.dataset.notation?.split(',') || []),
          ].join(',');

          const classList = `${childSpan.className} ${node.className}`.split(' ');
          const newClassName = [...new Set(classList)].join(' '); // 去重处理

          node.className = newClassName;
          node.innerHTML = childSpan.innerHTML;
        }
      }
    }
  });

  return rootNode.innerHTML;
}
