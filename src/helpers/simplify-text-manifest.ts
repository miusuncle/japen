import { ITextManifest, INotatedText } from '@/types/text-manifest';

export function simplifyTextManifest(manifest: ITextManifest): ITextManifest {
  if (Array.isArray(manifest)) {
    if (manifest.length === 1) {
      return simplifyTextManifest(manifest[0]);
    }
    return manifest.map(simplifyTextManifest) as ITextManifest;
  }

  if (typeof manifest === 'string') {
    return manifest;
  }

  let text = simplifyTextManifest(manifest.text) as string | INotatedText[];
  if (Array.isArray(text) && text.every(x => typeof x === 'string')) {
    text = text.join('');
  }

  if (!manifest.notation) {
    return text;
  } else if (Array.isArray(manifest.notation)) {
    if (manifest.notation.length === 0) {
      return text;
    } else if (manifest.notation.length === 1) {
      return { text, notation: manifest.notation[0] };
    }
  }
  return { text, notation: manifest.notation };
}
