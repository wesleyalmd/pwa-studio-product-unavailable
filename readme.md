# PWA Studio Product Unavailable Extension

![Preview](https://github.com/wesleyalmd/pwa-studio-product-unavailable/raw/master/docs/preview.png 'Preview')

### Install

**1. Adding dependency**

```
yarn add @wesleyalmd/pwa-studio-product-unavailable
```

**2. Wrap module in your `local-intercept.js`**

```
const { Targetables } = require('@magento/pwa-buildpack');

module.exports = targets => {
  const targetables = Targetables.using(targets);
  const peregrineTargets = targets.of('@magento/peregrine');
  const talonsTarget = peregrineTargets.talons;

  /* Product Unavailable */
  const {
    wrapProductUnavailableModule
  } = require('@wesleyalmd/pwa-studio-product-unavailable/targets');
  wrapProductUnavailableModule(targetables, talonsTarget);
};

```
