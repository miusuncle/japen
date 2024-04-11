import { parseStringAsDom } from '@/utils';
import type { ITextManifest, INotatedText } from '@/types/text-manifest';
import { ETextNotation } from '@/configs/settings';
import { simplifyTextManifest } from './simplify-text-manifest';

export function htmlToManifest(htmlString: string): ITextManifest {
  const rootNode = parseStringAsDom(htmlString);
  const manifest: INotatedText = { text: [] };

  function traverse(tree: HTMLElement, ctx: { manifest: INotatedText }) {
    for (const node of tree.childNodes as unknown as HTMLElement[]) {
      const manifest: INotatedText = { text: [], notation: [] };

      switch (node.nodeType) {
        case Node.ELEMENT_NODE: {
          manifest.notation = (node.dataset.notation?.split(',') || []) as ETextNotation[];

          if (node.childNodes.length === 1) {
            manifest.text = node.firstChild?.textContent || '';
          } else {
            traverse(node, { manifest });
          }
          break;
        }

        case Node.TEXT_NODE: {
          manifest.text = node.textContent || '';
          break;
        }
      }

      if (Array.isArray(ctx.manifest.text)) {
        ctx.manifest.text.push(manifest);
      }
    }
  }

  traverse(rootNode, { manifest });

  return simplifyTextManifest(manifest);
}
