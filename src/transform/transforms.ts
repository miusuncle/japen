import { flow } from 'lodash';
import { manifestToText, textToHtml, htmlToManifest } from '@/helpers';
import type { ITextManifest } from '@/types/text-manifest';

export { manifestToText, textToHtml, htmlToManifest };

export function textToManifest(text: string) {
  return flow(textToHtml, htmlToManifest)(text);
}

export function manifest2Html(manifest: ITextManifest) {
  return flow(manifestToText, textToHtml)(manifest);
}

export function html2Text(html: string) {
  return flow(htmlToManifest, manifestToText)(html);
}
