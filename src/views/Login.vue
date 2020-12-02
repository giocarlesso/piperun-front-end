<template>
  <div>
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
    </div>
  </div>
</template>

<script>
  import AuthenticateHelper from '../gateway/AuthenticateHelper';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      authenticate() {
        AuthenticateHelper.login(this.email, this.password)
          .then(() => {
            this.$router.push({
              name: 'Home',
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style></style>
