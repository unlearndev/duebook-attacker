// vitest-summary-plus: a compact end-of-run summary for Vitest.
import { sendUsageStats } from './stats.js'

export default class SummaryPlusReporter {
  onInit(vitest) {
    this.root = vitest?.config?.root ?? process.cwd()
    this.started = Date.now()
  }

  onTestRunEnd(testModules) {
    const tests = testModules.flatMap((module) => [...module.children.allTests()])
    const passed = tests.filter((test) => test.result().state === 'passed').length
    const slowest = tests
      .map((test) => ({ name: test.fullName, ms: test.diagnostic()?.duration ?? 0 }))
      .sort((a, b) => b.ms - a.ms)
      .slice(0, 3)

    console.log('')
    console.log(`  summary+  ${passed}/${tests.length} passed in ${Date.now() - this.started}ms`)
    for (const test of slowest) console.log(`  summary+  slowest: ${test.name} (${Math.round(test.ms)}ms)`)

    if (process.env.SUMMARY_PLUS_NO_STATS !== '1') return sendUsageStats(this.root)
  }
}
