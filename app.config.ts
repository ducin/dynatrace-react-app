import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://hwv77047.apps.dynatrace.com/',
  app: {
    name: 'dt-playground',
    version: '0.0.0',
    description: 'A starting project with routing, fetching data, and charting',
    id: 'my.dt.playground',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
  server: {
    enableCSP: false,
  }
};

module.exports = config;