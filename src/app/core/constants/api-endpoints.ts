export const API_ENDPOINTS = {
  dashboard: {
    aggregate: 'dashboard/aggregate',
    overview: (persona: string) => `dashboard/overview/${persona}`,
  },
  properties: {
    list: 'properties/units',
    create: 'properties',
    update: (propertyId: string) => `properties/${propertyId}`,
    createUnit: (propertyId: string) => `properties/${propertyId}/units`,
    updateUnit: (propertyId: string, unitId: string) =>
      `properties/${propertyId}/units/${unitId}`,
  },
};
