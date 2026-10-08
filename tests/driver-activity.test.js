import test from 'ava';

import { recentDriverCommandAt } from '../cave/driver-activity.js';

test('keeps recent driver commands inside the idle window', (t) => {
  const now = 500_000;

  t.is(recentDriverCommandAt(now - 30_000, now, 120_000), now - 30_000);
  t.is(recentDriverCommandAt(now - 119_999, now, 120_000), now - 119_999);
});

test('releases genuinely idle or invalid activity timestamps', (t) => {
  const now = 500_000;

  t.is(recentDriverCommandAt(now - 120_000, now, 120_000), null);
  t.is(recentDriverCommandAt(now + 1, now, 120_000), null);
  t.is(recentDriverCommandAt('not-a-timestamp', now, 120_000), null);
  t.is(recentDriverCommandAt(undefined, now, 120_000), null);
});
