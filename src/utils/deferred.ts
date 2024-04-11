export class Deferred<T> {
  #promise: Promise<T>;
  #resolve?: (value: T | PromiseLike<T>) => void;
  #reject?: (reason?: unknown) => void;

  constructor() {
    this.#promise = new Promise<T>((resolve, reject) => {
      this.#resolve = resolve;
      this.#reject = reject;
    });
  }

  get promise() {
    return this.#promise;
  }

  resolve = (value: T | PromiseLike<T>) => {
    this.#resolve?.(value);
  };

  reject = (reason?: unknown) => {
    this.#reject?.(reason);
  };
}
