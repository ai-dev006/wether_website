import { config } from "./config";

export function isCacheValid(fetchedAt: Date, now: Date = new Date()): boolean {
  const elapsed = now.getTime() - fetchedAt.getTime();
  return elapsed < config.cacheTtlMs;
}
