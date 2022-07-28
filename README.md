# pyarmor-vue

## Project setup
```
vue create .
vue add element

npm install
npm install -S gettext.js
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

### v0.2.4
* Add new option `mix-str`

### v0.2.3
* Add new obfCode mode 2

### v0.2.2
* Add super mode

### v0.2.1
* Add hints for some fields

### v0.2.0
* Add new platform: `uclibc.armv7.0`
* In my projects page add a project action `Diagnose` to print debug information
  in case something is wrong with building the project
* In project edit page add 2 buttons:
  - Build
  - Diagnose
* In project edit page, the field of `Pack options` now is textarea.
* Change default restrict mode to `1`
