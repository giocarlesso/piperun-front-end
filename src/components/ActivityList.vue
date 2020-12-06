<template>
  <div class="main">
    <div class="top-div">
      <button class="btn-new" @click.prevent.stop="createNewActivity">
        Nova Atividade
      </button>

      <button v-if="isFiltering" class="btn-filter" @click="toggleFilter">
        Omitir Filtros
      </button>
      <button v-else class="btn-filter" @click="toggleFilter">
        Mostrar Filtros
      </button>
    </div>

    <div class="filter-container" v-if="isFiltering">
      <div>
        <label for="dete-from">Data Inicial</label>
        <datepicker v-model="filter.dateFrom" name="date-from"></datepicker>
      </div>
      <div>
        <label for="dete-to">Data Final</label>
        <datepicker v-model="filter.dateTo" name="date-to"></datepicker>
      </div>

      <div class="filter-buttons"></div>
      <button class="btn-apply-filter" @click="getActitivitiesByDate">
        Filtrar
      </button>
      <button class="btn-remove-filter" @click="resetFilter">
        Cancelar Filtro
      </button>
    </div>

    <div v-if="isLoading" class="empty-list">
      <base-loading-spinner>Te4ste</base-loading-spinner>
    </div>
    <table v-else-if="this.activities.length > 0" class="table">
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
          <td class="actions">
            <button @click="editActivity(activity.id)">
              Editar
            </button>
            <button
              :disabled="activity.status == '2'"
              @click="concludeActivity(activity.id)"
            >
              Concluir
            </button>
            <button @click="deleteActivity(activity.id)">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p class="empty-list">
        Nenhuma atividade encontrada.
      </p>
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

  import moment from 'moment';

  import Datepicker from 'vuejs-datepicker';
  import BaseToast from '../components/BaseToast';
  import BaseLoadingSpinner from './BaseLoadingSpinner.vue';

  export default {
    components: {
      Datepicker,
      BaseToast,
      BaseLoadingSpinner,
    },

    data() {
      return {
        activities: [],
        users: [],
        isFiltering: false,
        isLoading: false,
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
          name: 'EditActivity',
          params: { activityId },
        });
      },

      getActitivities() {
        this.isLoading = true; //Chama o componente que mostra o carregamento dos dados para dar feedback ao usuário.
        ActivityHelper.getActitivitiesList()
          .then((res) => {
            this.activities = res.data.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao receber a lista de atividades, tente atualizar a página',
              'Erro',
              true
            );
          })
          .finally(() => {
            this.isLoading = false; //Esconde o componente assim que o caregamento acabe
          });
      },

      getActitivitiesByDate() {
        this.isLoading = true;
        //Formata as datas para que estejam no mesmo padrão que a API aceita
        this.filter.dateFrom = moment(this.filter.dateFrom).format();
        this.filter.dateTo = moment(this.filter.dateTo)
          .add(1, 'days') //Adiciona um dia à data final escolhida no filtro para que o dia selecionado pelo usuário como filtro de data final seja inteiramente levado em conta quando as atividades retornarem
          .format();
        ActivityHelper.getFilteredActivityByDate({
          start_at_start: this.filter.dateFrom,
          start_at_end: this.filter.dateTo,
        }).then((res) => {
          this.activities = res.data.data;
          this.sendDataToToast('Filtro por data ativo', 'Sucesso', true);
          this.isLoading = false;
        });
      },

      getActivityTypes() {
        //Busca todos os tipos de atividades que existem na API para comparar e mostrar na tela
        ActivityHelper.getActitivitiesTypes().then((res) => {
          this.activityTypes = res.data.data;
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

      async getUsers() {
        //Busca os usuários cadastrados no sistema para que apareçam na tela os seus nomes
        await UserHelper.getUsersList()
          .then((res) => (this.users = res.data.data))
          .catch(() => {
            this.sendDataToToast(
              'Erro ao buscar a lista de usuários',
              'Erro',
              true
            );
          });
      },

      findStatusName(statusId) {
        //Compara os ID's dos status de atividades que exitem com a ID de status da atividade selecionada
        const foundStatus = this.statusTypes.find(
          (status) => status.id === statusId
        );
        return foundStatus.name;
      },

      findUserName(owner_id) {
        //Compara o ID do usuário com o ID do owner da atividade
        const foundUser = this.users.find((user) => user.id === owner_id);
        return foundUser.name;
      },

      toggleFilter() {
        this.isFiltering = !this.isFiltering;
      },

      resetFilter() {
        // Reseta os filtros selecionados para que a lista de atividades venha sem filtros novamente, caso nenhum filtro tenha sido escolhido, simplesmente esconde o componente sem que uma nova busca seja feita no banco
        if (this.filter.dateFrom === null || this.filter.dateTo === null) {
          this.filter.dateFrom = null;
          this.filter.dateTo = null;
          this.isFiltering = false;
          this.sendDataToToast('Filtro removido', 'Sucesso', true);
        } else {
          this.filter.dateFrom = null;
          this.filter.dateTo = null;
          this.isFiltering = false;
          this.sendDataToToast('Filtro removido', 'Sucesso', true);
          this.getActitivities();
        }
      },

      sendDataToToast(message, type, show) {
        //Atualiza o componente de toast com o tipo de erro e mensagem para dar feedback ao usuário
        this.toast.toastMessage = message;
        this.toast.toastType = type;
        this.toast.showToast = show;

        setTimeout(() => {
          this.toast.showToast = false;
        }, 4000);
      },

      hideToast() {
        this.toast.showToast = false;
      },
    },

    mounted() {
      this.getUsers();
      this.getActitivities();
      this.getActivityTypes();
    },
  };
</script>

<style scoped>
  .main {
    margin-left: 130px;
    width: calc(100vw - 130px);
    height: 95vh;
  }
  .table {
    border: 1px solid #191919;
    border-collapse: collapse;
    width: 99%;
    margin-top: 15px;
    text-align: center;
  }

  th {
    height: 40px;
    border: 1px solid #191919;
    text-align: center;
    height: 40px;
    padding: 0 5px 0 5px;
    background-color: #454545;
    color: white;
  }

  td {
    border: 1px solid #191919;
    height: 35px;
    background-color: white;
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
    height: 30px;
  }

  .btn-remove-filter {
    background-color: #eb7734;
    color: white;
    border: none;
    border-radius: 3px;
    margin-left: 10px;
    height: 30px;
  }

  .filter-buttons {
    margin-top: 10px;
  }

  .btn-remove-filter:hover {
    background-color: #a6511f;
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
  }
</style>
