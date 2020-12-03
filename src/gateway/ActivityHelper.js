import api from '../config/api';

export default {
  getActitivitiesList: () => {
    return api
      .get('/activities', {
        headers: {
          'Content-Type': 'application/json',
          Token: localStorage.getItem('Token'),
        },
      })
      .catch((err) => {
        console.log('Create Listy', err);
      });
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
};
