const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email_hifni: 'muhammad.gcs@gmail.com',
    pass_hifni: 'h1fn1berijalan..',
  },
});
