const webSearchConfig = () => {
  const webBaseUrl = process.env.WEB_SEARCH_BASE_URL;
  return {
    baseUrl: webBaseUrl,
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
};

const cmsSearchConfig = () => {
  const cmsBaseUrl = process.env.CMS_SEARCH_BASE_URL;

  return {
    baseUrl: cmsBaseUrl,
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
};

export { webSearchConfig, cmsSearchConfig };
