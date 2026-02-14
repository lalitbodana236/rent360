export const API_ENDPOINTS = {
  dashboard: {
    aggregate: 'dashboard/aggregate',
    overview: (persona: string) => `dashboard/overview/${persona}`,
  },
};
