/**
 * Return a trustworthy recent driver-command timestamp, or null when the
 * runner did not provide one or it is outside the idle window.
 *
 * The overseer and runner share a host clock, so a future timestamp is
 * treated as invalid instead of suppressing autonomous work indefinitely.
 */
export function recentDriverCommandAt(value, now, idleWindowMs) {
  const commandAt = Number(value);
  if (!Number.isFinite(commandAt) || commandAt <= 0) return null;
  if (!Number.isFinite(now) || !Number.isFinite(idleWindowMs) || idleWindowMs <= 0) return null;

  const age = now - commandAt;
  return age >= 0 && age < idleWindowMs ? commandAt : null;
}
