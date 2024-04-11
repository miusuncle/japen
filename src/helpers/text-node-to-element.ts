import { traverseDomBottomUp, parseStringAsDom } from '@/utils';

/**
 * 将文本节点包裹在 `<span data-text />` 元素中
 */
export function textNodeToElement(htmlString: string) {
  const rootNode = parseStringAsDom(htmlString);

  traverseDomBottomUp(rootNode, node => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (['RT', 'RP'].includes(node.nodeName)) {
      return;
    }

    for (const childNode of node.childNodes) {
      if (childNode.nodeType !== Node.TEXT_NODE) {
        continue;
      }

      const newChildNode = document.createElement('span');
      newChildNode.dataset.text = '';
      newChildNode.textContent = childNode.textContent;
      node.replaceChild(newChildNode, childNode);
    }
  });

  return rootNode.innerHTML;
}
