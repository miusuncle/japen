export const encrypt = <T extends Record<string, unknown>>(obj: T) => {
  const encoded = btoa(encodeURIComponent(JSON.stringify(obj)));
  return encoded.replace(/=+$/g, '');
};

export function decrypt<T extends Record<string, unknown>>(encoded: string) {
  return JSON.parse(decodeURIComponent(atob(encoded))) as T;
}
