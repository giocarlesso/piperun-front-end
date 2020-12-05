<template>
  <div>
    <nav class="vertical">
      <ul>
        <li class="sidebar-activities">
          <router-link to="/home">Atividades</router-link>
        </li>
        <li class="sidebar-logout">
          <router-link @click="logout" to="/">Logout</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        //Limpa a localStorage do token e dados do usuário e destrói a sessão
        localStorage.clear();
        window.localStorage.removeItem('Token');
        window.localStorage.removeItem('userData');
        this.$session.destroy();
      },
    },
  };
</script>

<style scoped>
  .vertical {
    height: 100%;
    width: 130px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #454545;
    overflow-x: hidden;
    padding-top: 20px;
    display: flex;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  .vertical a {
    text-decoration: none;
    font-size: 25px;
    color: white;
    display: block;
  }

  .vertical a:hover {
    color: #f1f1f1;
  }

  .sidebar-activities {
    top: 20%;
    text-align: center;
    position: absolute;
    width: 100%;
  }

  .sidebar-logout {
    text-align: center;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 1.5em;
  }

  @media screen and (max-height: 450px) {
    .vertical {
      padding-top: 15px;
    }
    .vertical a {
      font-size: 18px;
    }
  }
</style>
