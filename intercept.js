module.exports = targets => {
  targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
    flags[targets.name] = {
      esModules: true,
      cssModules: true,
      i18n: true
    };
  });
};
