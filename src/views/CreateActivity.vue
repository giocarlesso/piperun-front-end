<template>
  <div>
    <the-side-bar></the-side-bar>
    <div class="container">
      <base-loading-spinner v-if="isLoading"></base-loading-spinner>
      <form v-else class="form-style" @submit.prevent="submitActivity">
        <h2 v-if="isEditing">Atualizar Atividade</h2>
        <h2 v-else>Criar Atividade</h2>
        <label for="title">Título<span class="required"> *</span></label>
        <textarea
          required
          type="text"
          rows="4"
          cols="50"
          name="title"
          v-model="activityData.title"
        />
        <div>
          <label for="">Responsável<span class="required"> *</span></label>
          <select required v-model="activityData.owner_id">
            <option value="Responsável" disabled>Responsável</option>
            <option v-for="owner in owners" :key="owner.id" :value="owner.id">
              {{ owner.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="">Tipo<span class="required"> *</span></label>
          <select required v-model="activityData.activity_type_id">
            <option value="Tipo" disabled>Tipo</option>
            <option
              v-for="type in activityTypes"
              :key="type.id"
              :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="">Status</label>
          <select v-model="activityData.status">
            <option value="Status" disabled>Status</option>
            <option
              v-for="status in statusTypes"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="">Data de início<span class="required"> *</span></label>
          <datepicker
            required
            class="datepicker"
            v-model="activityData.start_at"
            name="date-from"
          ></datepicker>
        </div>
        <button v-if="isEditing" class="btn-form" type="submit">
          Atualizar
        </button>
        <button v-else class="btn-form" type="submit">Criar</button>
      </form>
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

  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';

  import BaseLoadingSpinner from '../components/BaseLoadingSpinner';
  import BaseToast from '../components/BaseToast';
  import TheSideBar from '../components/TheSideBar';

  export default {
    components: {
      Datepicker,
      BaseToast,
      BaseLoadingSpinner,
      TheSideBar,
    },
    data() {
      return {
        isEditing: false,
        isLoading: false,
        owners: [],
        activityTypes: [],
        toast: {
          showToast: false,
          toastMessage: '',
          toastType: '',
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
        activityData: {
          account_id: window.localStorage.getItem('userData'),
          owner_id: 0,
          title: '',
          activity_type_id: 0,
          status: 0,
          priority: 1,
          description: '',
          start_at: new Date(),
        },
      };
    },

    methods: {
      getUsers() {
        UserHelper.getUsersList()
          .then((res) => {
            this.owners = res.data.data;
          })
          .catch(() => {
            this.sendDataToToast('Erro ao obter os usuários', 'Erro', true);
          });
      },

      getActivityTypes() {
        ActivityHelper.getActitivitiesTypes()
          .then((res) => {
            this.activityTypes = res.data.data;
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao obter os tipos de atividade',
              'Erro',
              true
            );
          });
      },

      submitActivity() {
        if (this.isEditing) {
          this.formatDate();
          ActivityHelper.updateActivity(
            this.activityData,
            this.$route.params.activityId
          )
            .then(() => {
              this.isEditing = false;
              this.$router.push({ name: 'Home' });
            })
            .catch(() => {
              this.sendDataToToast(
                'Erro ao atualizar a atividade',
                'Erro',
                true
              );
            });
        } else {
          this.formatDate();
          ActivityHelper.createActivity(this.activityData)
            .then(() => {
              this.isEditing = false;
              this.$router.push({ name: 'Home' });
            })
            .catch(() => {
              this.sendDataToToast('Erro ao criar a atividade', 'Erro', true);
            });
        }
      },

      getSpecificActivity() {
        this.isLoading = true;
        ActivityHelper.getSpecificActivity(this.$route.params.activityId)
          .then((res) => {
            const selectedActivity = res.data.data;
            this.activityData.title = selectedActivity.title;
            this.activityData.owner_id = selectedActivity.owner_id;
            this.activityData.activity_type_id =
              selectedActivity.activity_type_id;
            this.activityData.status = selectedActivity.status;
            this.isLoading = false;
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao obter os dados da atividade',
              'Erro',
              true
            );
          });
      },

      formatDate() {
        this.activityData.start_at = moment(
          this.activityData.start_at
        ).format();
      },

      sendDataToToast(message, type, show) {
        this.toast.toastMessage = message;
        this.toast.toastType = type;
        this.toast.showToast = show;

        setTimeout(() => {
          this.toast.showToast = false;
        }, 4000);
      },
    },

    mounted() {
      if (this.$route.params.activityId) {
        this.getSpecificActivity();
        this.isEditing = true;
      }
      this.getActivityTypes();
      this.getUsers();
    },
  };
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    height: 100vh;
  }

  .form-style {
    margin: 10px auto;
    max-width: 400px;
    padding: 20px 12px 10px 20px;
    font: 20px Tahoma;
  }

  .form-style label {
    margin: 0 0 3px 0;
    padding-top: 20px;
    display: block;
  }

  select,
  textarea {
    width: 100%;
    height: 25px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #bebebe;
  }

  .btn-form {
    margin-top: 20px;
    width: 44%;
    height: 50px;
    font-size: 16px;
    background-color: #4caf50;
    border: none;
    border-radius: 3px;
    color: white;
  }

  .btn-form:hover {
    background-color: #145e17;
  }

  .required {
    color: red;
  }
</style>
