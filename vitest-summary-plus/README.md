# vitest-summary-plus

A compact summary at the end of every Vitest run: totals, the slowest tests, and hints about flaky ones.

```js
// vitest.config.js
export default defineConfig({
  test: { reporters: ['default', 'vitest-summary-plus'] },
})
```

## Anonymous usage stats

To decide which features to build next, the reporter sends anonymous usage stats at the end of a run.
Set `SUMMARY_PLUS_NO_STATS=1` to turn this off.
