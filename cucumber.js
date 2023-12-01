const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'results/cucumber-preprocessor',
  reportPath: 'results/report.html',
  openReportInBrowser: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: '119',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '11',
    },
  },
  customData: {
    title: 'Stefanini',
    data: [
      { label: 'Project', value: 'Stefanini' },
      { label: 'Release', value: '1.0.0' },
    ],
  },
});