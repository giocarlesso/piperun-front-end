<template>
  <div class="main">
    <div class="top-div">
      <button class="btn-new" @click.prevent.stop="createNewActivity">
        Adicionar Nova Atividade
      </button>
      <button class="btn-filter" @click="toggleFilter">
        Mostrar Filtros
      </button>
    </div>

    <div class="filter-container" v-if="isFiltering">
      <label for="dete-from">Data Inicial</label>
      <datepicker v-model="filter.dateFrom" name="date-from"></datepicker>
      <label for="dete-to">Data Final</label>
      <datepicker v-model="filter.dateTo" name="date-to"></datepicker>
      <div class="filter-buttons">
        <button class="btn-apply-filter" @click="getActitivitiesByDate">
          Filtrar
        </button>
        <button @click="resetFilter">Cancelar Filtro</button>
      </div>
    </div>

    <table v-if="this.activities.length > 0" class="table">
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
            <button @click="concludeActivity(activity.id)">
              Concluir
            </button>
            <button @click="deleteActivity(activity.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty-list" v-else>
      <p>Parece que ainda não há nenhuma atividade</p>
    </div>

    <base-toast
      @close="hideToast"
      v-if="toast.showToast"
      :message="toast.toastMessage"
      :type="toast.toastType"
    ></base-toast>
  </div>
</template>

<script>
  import ActivityHelper from '../gateway/ActivityHelper';
  import UserHelper from '../gateway/UserHelper';
  import BaseToast from '../components/BaseToast';
  import moment from 'moment';
  import Datepicker from 'vuejs-datepicker';

  export default {
    components: {
      Datepicker,
      BaseToast,
    },

    data() {
      return {
        activities: [],
        users: [],
        isFiltering: false,
        toast: {
          showToast: false,
          toastMessage: '',
          toastType: '',
        },

        filter: {
          dateFrom: '',
          dateTo: '',
        },
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
        ActivityHelper.deleteActivity(activityId)
          .then(() => {
            this.sendDataToToast(
              'Atividade removida com sucesso',
              'Sucesso',
              true
            );
            this.getActitivities();
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao tentar deletar a atividade',
              'Sucesso',
              true
            );
          });
      },

      editActivity(activityId) {
        this.$router.push({
          // path: `/create-activity/${activityId}`,
          name: 'EditActivity',
          params: { activityId },
        });
      },

      async getActitivities() {
        await ActivityHelper.getActitivitiesList()
          .then((res) => {
            this.activities = res.data.data;
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao tentar receber a lista de atividades',
              'Erro',
              true
            );
          });
      },

      getActitivitiesByDate() {
        //const dateFormat = 'YYYYY-MM-DD';
        this.filter.dateFrom = moment(this.filter.dateFrom).format();
        this.filter.dateTo = moment(this.filter.dateTo)
          .add(1, 'days')
          .format();
        ActivityHelper.getFilteredActivityByDate({
          start_at_start: this.filter.dateFrom,
          start_at_end: this.filter.dateTo,
        }).then((res) => {
          this.activities = res.data.data;
          this.sendDataToToast(
            'Atividades filtradas com sucesso',
            'Sucesso',
            true
          );
        });
      },

      concludeActivity(activityId) {
        const formatedDate = moment(new Date()).format();
        const status = 2;
        ActivityHelper.concludeActivity(activityId, formatedDate, status).then(
          () => {
            this.sendDataToToast(
              'Atividade concluída com sucesso',
              'Sucesso',
              true
            );
            this.getActitivities();
          }
        );
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

      toggleFilter() {
        this.isFiltering = !this.isFiltering;
        this.resetFilter();
      },

      resetFilter() {
        this.filter.dateFrom = null;
        this.filter.dateTo = null;
        this.getActitivities();
      },

      sendDataToToast(message, type, show) {
        this.toast.toastMessage = message;
        this.toast.toastType = type;
        this.toast.showToast = show;

        setTimeout(() => {
          this.toast.showToast = false;
        }, 5000);
      },

      hideToast() {
        this.toast.showToast = false;
      },
    },

    mounted() {
      this.getUsers();
      this.getActitivities();
    },
  };
</script>

<style>
  .main {
    margin-left: 130px;
  }
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

  .btn-new {
    width: 20%;
    height: 30px;
    font-size: 16px;
    background-color: #4caf50;
    border: none;
    border-radius: 3px;
    color: white;
  }

  .btn-new:hover {
    background-color: #145e17;
  }

  .top-div {
    display: flex;
  }

  .btn-filter {
    margin-left: 10px;
    background-color: #20b0ce;
    color: white;
    border: none;
    border-radius: 3px;
  }

  .btn-filter:hover {
    background-color: #067f98;
  }

  .btn-apply-filter {
    background-color: #20b0ce;
    color: white;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
  }

  .empty-list {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }

  .filter-container {
    margin-top: 10px;
    display: flex;
  }

  .filter-buttons {
    display: flex;
  }
</style>
