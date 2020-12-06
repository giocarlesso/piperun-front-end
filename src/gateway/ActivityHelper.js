import api from '../config/api';

export default {
  getActitivitiesList: async (params) => {
    return await api
      .get('/activities', {
        params: { show: 30, ...params },
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .catch((err) => {
        console.log('Create Listy', err);
      });
  },

  getFilteredActivityByDate: async (params) => {
    return await api
      .get('/activities', {
        params: { show: 30, ...params },
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .then(console.log('Aqui'))
      .catch((err) => console.log('Filter by date', err));
  },

  getActitivitiesTypes: async () => {
    return await api
      .get('/activityTypes', {
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .catch((err) => {
        console.log('Get Types', err);
      });
  },

  createActivity: async (activityData) => {
    return await api
      .post('/activities', activityData, {
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .catch((err) => {
        console.log('Create Activity', err);
      });
  },

  deleteActivity: async (activityId) => {
    return await api
      .delete('/activities/' + activityId, {
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .catch((err) => {
        console.log('Delete Activities', err);
      });
  },

  getSpecificActivity: async (activityId) => {
    return await api.get('/activities/' + activityId, {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },

  updateActivity: async (activityData, activityId) => {
    return await api.put('/activities/' + activityId, activityData, {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },

  concludeActivity: async (activityId, formatedDate, status) => {
    return await api
      .put(
        '/activities/' + activityId,
        { end_at: formatedDate, status: status },
        {
          headers: {
            'Content-Type': 'application/json',
            Token: localStorage.getItem('Token'),
          },
        }
      )
      .catch((err) => console.log('Conclude Activity', err));
  },
};
