<template>
  <div class="container">
    <div class="toast" :class="checkToastType()">
      <p>{{ type }}</p>
      <p>{{ message }}</p>
      <button class="close" @click="closeToast">X</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type', 'message', 'showToast'],
    emits: ['close'],
    methods: {
      checkToastType() {
        if (this.type === 'Sucesso') {
          return 'success';
        } else {
          return 'error';
        }
      },
      closeToast() {
        //Envia um emit para o parent component ao usuário clicar no X para fechar o toast antes do tempo pré selecionado
        this.$emit('close');
      },
    },
  };
</script>

<style scoped>
  .toast {
    min-width: 250px;
    text-align: center;
    border-radius: 3px;
    margin-left: -125px;
    padding: 10px;
    position: fixed;
    left: 50%;
    z-index: 1;
    bottom: 30px;
    font-size: 18px;
  }

  .success {
    background-color: #28a745;
    color: white;
  }

  .error {
    background-color: #dc3545;
    color: white;
  }

  .close {
    position: absolute;
    background-color: inherit;
    color: white;
    border: none;
    top: 10px;
    right: 10px;
  }
</style>
