import api from '../config/api';

export default {
  getActitivitiesList: async (params) => {
    return await api
      .get('/activities', { params: { show: 30, ...params } })
      .catch((err) => {
        console.log('Create Listy', err);
      });
  },

  getFilteredActivityByDate: async (params) => {
    return await api
      .get('/activities', { params: { show: 30, ...params } })
      .catch((err) => console.log('Filter by date', err));
  },

  getActitivitiesTypes: async () => {
    return await api.get('/activityTypes').catch((err) => {
      console.log('Get Types', err);
    });
  },

  createActivity: async (activityData) => {
    return await api.post('/activities', activityData).catch((err) => {
      console.log('Create Activity', err);
    });
  },

  deleteActivity: async (activityId) => {
    return await api.delete('/activities/' + activityId).catch((err) => {
      console.log('Delete Activities', err);
    });
  },

  getSpecificActivity: async (activityId) => {
    return await api
      .get('/activities/' + activityId)
      .catch((err) => console.log('Specific Activity', err));
  },

  updateActivity: async (activityData, activityId) => {
    return await api.put('/activities/' + activityId, activityData);
  },

  concludeActivity: async (activityId, formatedDate, status) => {
    return await api
      .put('/activities/' + activityId, {
        end_at: formatedDate,
        status: status,
      })
      .catch((err) => console.log('Conclude Activity', err));
  },
};
