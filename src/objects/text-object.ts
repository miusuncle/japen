import { transform } from '@/transform';
import { ManifestObject } from './manifest-object';
import { HTMLObject } from './html-object';

export const text = (input: string) => new TextObject(input);

export class TextObject {
  #text: string;

  constructor(text: string) {
    this.#text = text;
  }

  toManifest() {
    return new ManifestObject(transform.textToManifest(this.#text));
  }

  toHtml() {
    return new HTMLObject(transform.textToHtml(this.#text));
  }

  toString() {
    return this.#text;
  }

  valueOf() {
    return this.#text;
  }
}
