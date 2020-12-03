<template>
  <div>
    <button @click.prevent.stop="createNewActivity">
      Adicionar Nova Atividade
    </button>
    <table class="table">
      <thead>
        <th>Título</th>
        <th>Status</th>
        <th>Responsável</th>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.title }}</td>
          <td>{{ activity.status }}</td>
          <td>{{ findUserName(activity.owner_id) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import ActivityHelper from '../gateway/ActivityHelper';
  import UserHelper from '../gateway/UserHelper';

  export default {
    data() {
      return {
        activities: [],
        users: [],
      };
    },

    methods: {
      getActitivities() {
        ActivityHelper.getActitivitiesList().then(
          (res) => (this.activities = res.data.data)
        );
      },

      createNewActivity() {
        this.$router.push({ name: 'CreateActivity' });
      },

      findUserName(owner_id) {
        const foundUser = this.users.find((user) => user.id === owner_id);
        JSON.stringify(foundUser);

        return foundUser.name;
      },

      async getUsers() {
        await UserHelper.getUsersList().then(
          (res) => (this.users = res.data.data)
        );
      },
    },

    mounted() {
      this.getActitivities();
      this.getUsers();
    },
  };
</script>

<style>
  .table {
    border: 1px solid #191919;
    border-collapse: collapse;
    width: 99%;
    margin-top: 15px;
  }

  th {
    height: 40px;
    border: 1px solid #191919;
    text-align: center;
    height: 40px;
    padding: 0 5px 0 5px;
    background-color: #f5f5f6;
  }

  td {
    border-right: 1px solid #191919;
    border-bottom: 1px solid #191919;
    height: 35px;
  }

  tfoot td {
    border: none;
  }
</style>
