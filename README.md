<div align="center">
  <img alt="ReDoc logo" src="https://raw.githubusercontent.com/catalyst-network/Community/master/media-pack/logo.png" width="400px" />

  # Catalyst Node Dashboard (Catalyst-dashboard)
 
[![Discord](https://img.shields.io/discord/713661828239982683?color=blueviolet&label=discord)](https://discord.gg/93q3ve)
[![Twitter Follow](https://img.shields.io/twitter/follow/catalystprot?style=social)](https://twitter.com/catalystprot)
</div>

A node dashboard for Catalyst Network. It displays a nodes peer list and pending transactions as well as network stats. The dashboard works as a desktop application using Electron. There is also a web version of the dashboard available [here](http://catalystexplorer.z33.web.core.windows.net/dashboard/#/).

Status: **Active development.** This repository is being actively worked on, mostly in feature branches. 



## Build Desktop Dashboard

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev -m electron
```

### Build the app for production
```bash
quasar build -m electron
```


## Build Web Dashboard
``` bash
git checkout web-version
```

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Build the app for production
```bash
quasar build
```

