# The attacker's side

A tiny server for the course demos. It stands in for an attacker's server, but it only listens on this machine
(`127.0.0.1` and `::1`, port 8787), so nothing ever leaves it.

```bash
npm start                                  # listen on http://metrics.localhost:8787
curl -s http://metrics.localhost:8787       # what it has received
curl -s http://metrics.localhost:8787/reset # forget it
```
