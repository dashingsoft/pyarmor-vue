# pyarmor-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Change logs

### v0.2.0

* Add hints for most of fields in each page
* Add new platform: `uclibc.armv7.0`
* In my projects page add an action `Diagnostics` which will print debug information in the console
* In project edit page add 2 buttons:
  - Build
  - Diagnose
* In project edit page, the field of `Pack options` now is textarea with a popup
  dialog to accept any pyinstaller option.
* In pack wizard page, change the input way for extra data and extra binary
  field, now what you need to do is jsut to select multiple folders or files
  from a cascader.
