import api from '../config/api';

export default {
  getActitivitiesList: (params) => {
    return api
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

  getFilteredActivityByDate: (params) => {
    return api
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

  getActitivitiesTypes: () => {
    return api
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

  createActivity: (activityData) => {
    return api
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

  deleteActivity: (activityId) => {
    return api
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

  getSpecificActivity: (activityId) => {
    return api.get('/activities/' + activityId, {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },

  updateActivity: (activityData, activityId) => {
    return api.put('/activities/' + activityId, activityData, {
      headers: {
        'Content-Type': 'application/json',
        Token: localStorage.getItem('Token'),
      },
    });
  },

  concludeActivity: (activityId, formatedDate, status) => {
    return api
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
