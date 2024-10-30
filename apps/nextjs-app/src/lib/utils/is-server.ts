export const isServer = (): boolean => {
  return !('window' in globalThis);
};
