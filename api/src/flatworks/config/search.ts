const webSearchConfig = {
  baseUrl: 'http://localhost:3002/#',
  priority: [
    {
      priority: 1,
      collection: 'proposals',
      serviceName: 'proposalService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 2,
      collection: 'proposers',
      serviceName: 'proposerService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 3,
      collection: 'funds',
      serviceName: 'fundService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 4,
      collection: 'challenges',
      serviceName: 'challengeService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
  ],
};

const cmsSearchConfig = {
  baseUrl: 'http://localhost:3001/#',
  priority: [
    {
      priority: 1,
      collection: 'proposals',
      serviceName: 'proposalService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 2,
      collection: 'proposers',
      serviceName: 'proposerService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 3,
      collection: 'funds',
      serviceName: 'fundService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
    {
      priority: 4,
      collection: 'challenges',
      serviceName: 'challengeService',
      totalRecords: 0,
      limit: 0,
      skip: 0,
    },
  ],
};

export { webSearchConfig, cmsSearchConfig };
