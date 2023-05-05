const { defineConfig } = require("cypress");

module.exports = defineConfig({
  includeShadowDom: true,
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
