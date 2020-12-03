<template>
  <form @submit.prevent="createActivity">
    <label for="title">Título</label>
    <input type="text" name="title" v-model="activityData.title" />

    <select v-model="activityData.owner_id">
      <option value="Responsável" disabled>Responsável</option>
      <option v-for="owner in owners" :key="owner.id" :value="owner.id">
        {{ owner.name }}
      </option>
    </select>

    <select v-model="activityData.activity_type_id">
      <option value="Tipo" disabled>Tipo</option>
      <option v-for="type in activityTypes" :key="type.id" :value="type.id">
        {{ type.name }}
      </option>
    </select>

    <select v-model="activityData.status">
      <option value="Status" disabled>Status</option>
      <option v-for="status in statusTypes" :key="status.id" :value="status.id">
        {{ status.name }}
      </option>
    </select>

    <button type="submit">Enviar</button>
  </form>
</template>

<script>
  import ActivityHelper from '../gateway/ActivityHelper';
  import UserHelper from '../gateway/UserHelper';

  export default {
    data() {
      return {
        owners: [],
        activityTypes: [],
        statusTypes: [
          {
            id: 0,
            name: 'Aberta',
          },
          {
            id: 1,
            name: 'Em progresso',
          },
          {
            id: 2,
            name: 'Finalizada',
          },
          {
            id: 3,
            name: 'Cancelada',
          },
          {
            id: 4,
            name: 'Escondida',
          },
        ],
        activityData: {
          account_id: window.localStorage.getItem('userData'),
          owner_id: 0,
          title: '',
          activity_type_id: 0,
          status: 0,
          priority: 1,
          description: 'Teste',
        },
      };
    },

    methods: {
      async getUsers() {
        await UserHelper.getUsersList().then((res) => {
          this.owners = res.data.data;
        });
      },

      async getActivityTypes() {
        await ActivityHelper.getActitivitiesTypes().then((res) => {
          this.activityTypes = res.data.data;
        });
      },

      async getActitivities() {
        await ActivityHelper.getActitivitiesList().then(
          (res) => (this.activities = res.data.data)
        );
      },

      async createActivity() {
        await ActivityHelper.createActivity(this.activityData).then(() =>
          this.$router.push({ name: 'Home' })
        );
      },

      getSpecificActivity() {
        ActivityHelper.getSpecificActivity(this.$route.params.activityId).then(
          (res) => {
            const selectedActivity = res.data.data;
            this.activityData.title = selectedActivity.title;
            this.activityData.owner_id = selectedActivity.owner_id;
            this.activityData.activity_type_id =
              selectedActivity.activity_type_id;
            this.activityData.status = selectedActivity.status;
          }
        );
      },
    },
    mounted() {
      console.log(this.$route.params.activityId);
      if (this.$route.params.activityId) {
        this.getSpecificActivity();
      }
      this.getActivityTypes();
      this.getUsers();
    },
  };
</script>

<style></style>
