/**
 * skip one event loop to wait for promises to get resolved
 */
export async function skipTick(): Promise<void> {
  return new Promise(setImmediate);
}
