export function delay(ms = 1000) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
