export const isBrowser = (): boolean => {
  return 'window' in globalThis;
};
