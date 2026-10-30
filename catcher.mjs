// The attacker's side of the course demos. It only listens on this machine.
// It records whatever is POSTed to it, and shows it at GET /.
import { createServer } from 'node:http'

const PORT = Number(process.env.PORT ?? 8787)
const received = []

const server = (host) => createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      received.push({ at: new Date().toISOString().slice(11, 19), path: req.url, body })
      res.writeHead(204).end()
    })
    return
  }
  if (req.url === '/health') return res.writeHead(200).end('ok\n')
  if (req.url === '/reset' ) { received.length = 0; return res.writeHead(200).end('cleared\n') }
  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' })
  if (!received.length) return res.end('Nothing received.\n')
  res.end(received.map(({ at, path, body }) => {
    let text = body
    try {
      const data = JSON.parse(body)
      text = Object.entries(data).map(([key, value]) => `  ${key}: ${String(value).trim().replace(/\n/g, '\n    ')}`).join('\n')
    } catch {}
    return `${at}  POST ${path}\n${text}\n`
  }).join('\n'))
}).listen(PORT, host)

// metrics.localhost can resolve to either loopback address, so listen on both.
server('127.0.0.1')
server('::1')
console.log(`Catcher listening on http://metrics.localhost:${PORT}`)
