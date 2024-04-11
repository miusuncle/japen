import { Deferred } from '@/utils/deferred';

export function loadScript(path: string) {
  const dfd = new Deferred();

  const script = document.createElement('script');
  script.src = path;
  script.async = true;

  script.addEventListener('load', () => {
    script.remove();
    dfd.resolve(null);
  });

  script.addEventListener('error', () => {
    script.remove();
    dfd.reject(new Error(`Load script \`${path}\` failed`));
  });

  document.body.appendChild(script);

  return dfd.promise;
}
