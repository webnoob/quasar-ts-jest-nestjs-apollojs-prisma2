# Quasar App (app)

A Quasar Framework app

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Development Concepts

1. Components access the store
2. Store accesses services
3. Services return data and don't modify the state directly.
    3a. They can however dispatch events
