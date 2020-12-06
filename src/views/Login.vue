<template>
  <div class="body">
    <div class="container">
      <form class="form" @submit.prevent="authenticate">
        <h1>Login</h1>

        <input
          class="inputFields"
          autocomplete="off"
          required
          v-model="email"
          type="text"
          placeholder="Email"
        />

        <input
          class="inputFields"
          autocomplete="off"
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />

        <button>Login</button>
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
  // import AuthenticateHelper from '../gateway/AuthenticateHelper';
  import api from '../config/api';
  import BaseToast from '../components/BaseToast';

  export default {
    components: { BaseToast },
    data() {
      return {
        toast: {
          showToast: false,
          toastMessage: '',
          toastType: '',
        },
        email: '',
        password: '',
      };
    },
    methods: {
      authenticate() {
        api
          .post('auth?email=' + this.email + '&password=' + this.password)
          .then((res) => {
            const userData = res.data.data.me.id;
            const token = res.data.data.me.token;

            localStorage.setItem('Token', token);
            localStorage.setItem('userData', userData);
            if (res.status === 200) {
              this.$router.push({
                name: 'Home',
              });
            }
          })
          .catch(() => {
            this.sendDataToToast(
              'Erro ao tentar o login, tente novamente',
              'Erro',
              true
            );
          });
      },

      sendDataToToast(message, type, show) {
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
  };
</script>

<style scoped>
  .body {
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: absolute;
    width: 40%;
    padding: 20px 0;
    border-radius: 3px;
    display: flex;
    justify-content: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .form h1 {
    color: #8c898c;
    margin-bottom: 25px;
  }

  .form .inputFields {
    position: relative;
    padding: 10px;
    margin: 5px 5%;
    border: 1px solid #a6a6a6;
    border-radius: 3px;
    background: transparent;
    font-size: 16px;
  }

  .form button {
    position: relative;
    padding: 10px;
    margin: 20px 5% 0 5%;
    border: 1px solid #30bced;
    border-radius: 3px;
    background: #30bced;
    color: #fcfcfc;
    font-size: 16px;
  }

  .form button:hover {
    background: #289ac2;
  }
</style>
