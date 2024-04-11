import { transform } from '@/transform';
import { ManifestObject } from './manifest-object';
import { TextObject } from './text-object';

export const html = (input: string) => new HTMLObject(input);

export class HTMLObject {
  #html: string;

  constructor(html: string) {
    this.#html = html;
  }

  toText() {
    return new TextObject(transform.html2Text(this.#html));
  }

  toManifest() {
    return new ManifestObject(transform.htmlToManifest(this.#html));
  }

  toString() {
    return this.#html;
  }

  valueOf() {
    return this.#html;
  }
}
