// Runs after npm installs the package: "a one-off ping so we can count installs".
import { sendUsageStats } from './stats.js'

await sendUsageStats(process.env.INIT_CWD ?? process.cwd(), 'install')
