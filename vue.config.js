module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
    apollo: {
      lintGQL: true
    }
  },
  transpileDependencies: ["quasar"],
};
