# Github stats SVG generator

Express service rendering your top programming languages as an SVG pie chart —
one card from the GitHub GraphQL API, one from Wakatime.

Live at **https://github-stats.quasarity.com**

| Endpoint | Source |
| --- | --- |
| [`/langs`](https://github-stats.quasarity.com/langs) | GitHub GraphQL API — bytes per language across public repos |
| [`/wakatime`](https://github-stats.quasarity.com/wakatime) | Wakatime API — time per language |

Embed in a profile README:

```markdown
![GitHub top languages](https://github-stats.quasarity.com/langs)
![Wakatime top languages](https://github-stats.quasarity.com/wakatime)
```

Each endpoint serves the previously cached card and refreshes it afterwards, so
the very first request after a restart returns a placeholder.

### Running

```bash
npm ci
npm run dev     # nodemon + ts-node
npm run prod    # tsc build, then node ./dist/index.js
```

### .env file template:

```.env
GITHUB_USERNAME="your github username"
GITHUB_PAT="github token"
WAKATIME_USERNAME="your wakatime username"
PORT="server port"
```

### Deployment

Runs under pm2 behind Caddy:

```bash
npm ci && npm run build
pm2 start ecosystem.config.js && pm2 save
```
