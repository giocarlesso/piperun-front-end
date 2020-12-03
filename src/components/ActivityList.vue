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
        <th>Ações</th>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.title }}</td>
          <td>{{ findStatusName(activity.status) }}</td>
          <td>{{ findUserName(activity.owner_id) }}</td>
          <td>
            <button @click="editActivity(activity.id)">
              Editar
            </button>
            <button>
              Concluir
            </button>
            <button @click="deleteActivity(activity.id)">
              Excluir
            </button>
          </td>
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
            name: 'Concluído',
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
      };
    },

    methods: {
      createNewActivity() {
        this.$router.push({ name: 'CreateActivity' });
      },

      deleteActivity(activityId) {
        ActivityHelper.deleteActivity(activityId).then(() => {
          this.getActitivities();
        });
      },

      editActivity(activityId) {
        this.$router.push({
          // path: `/create-activity/${activityId}`,
          name: 'EditActivity',
          params: { activityId },
        });
      },

      getActitivities() {
        ActivityHelper.getActitivitiesList().then((res) => {
          this.activities = res.data.data;
        });
      },

      getUsers() {
        UserHelper.getUsersList().then((res) => (this.users = res.data.data));
      },

      findStatusName(statusId) {
        const foundStatus = this.statusTypes.find(
          (status) => status.id === statusId
        );
        return foundStatus.name;
      },

      findUserName(owner_id) {
        const foundUser = this.users.find((user) => user.id === owner_id);
        JSON.stringify(foundUser);
        return foundUser.name;
      },
    },

    mounted() {
      this.getUsers();
      this.getActitivities();
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
