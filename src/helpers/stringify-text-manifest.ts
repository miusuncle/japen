import type { ITextManifest } from '@/types/text-manifest';
import { applyTextNotation } from './apply-text-notation';

// Alias
export { stringifyTextManifest as manifestToText };

export function stringifyTextManifest(manifest: ITextManifest): string {
  if (typeof manifest === 'string') {
    return manifest;
  }

  if (Array.isArray(manifest)) {
    return manifest.map(stringifyTextManifest).join('');
  }

  const { text, notation } = manifest;

  if (typeof text === 'string') {
    return applyTextNotation(text, notation);
  }

  const strings: string[] = [];

  for (const stub of text) {
    if (typeof stub === 'string') {
      strings.push(stub);
    } else if (typeof stub.text === 'string') {
      strings.push(applyTextNotation(stub.text, stub.notation));
    } else {
      strings.push(stringifyTextManifest(stub));
    }
  }

  return applyTextNotation(strings.join(''), notation);
}
