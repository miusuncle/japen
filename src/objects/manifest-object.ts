import { transform } from '@/transform';
import type { ITextManifest } from '@/types/text-manifest';
import { TextObject } from './text-object';
import { HTMLObject } from './html-object';

export const manifest = (input: ITextManifest) => new ManifestObject(input);

export class ManifestObject {
  #manifest: ITextManifest;

  constructor(manifest: ITextManifest) {
    this.#manifest = manifest;
  }

  toText() {
    return new TextObject(transform.manifestToText(this.#manifest));
  }

  toHtml() {
    return new HTMLObject(transform.manifest2Html(this.#manifest));
  }

  toString() {
    return JSON.stringify(this.#manifest);
  }

  valueOf() {
    return this.#manifest;
  }
}
