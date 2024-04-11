/**
 * 从里往外遍历 DOM 节点
 */
export function traverseDomBottomUp(target: HTMLElement, visit: (node: HTMLElement) => void) {
  for (const node of target.childNodes) {
    traverseDomBottomUp(node as HTMLElement, visit);
  }
  visit(target);
}
