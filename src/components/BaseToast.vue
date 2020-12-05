<template>
  <div class="toast" :class="checkToastType()">
    <p>{{ type }}</p>
    <p>{{ message }}</p>
    <button class="close" @click="closeToast">X</button>
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
        this.$emit('close');
      },
    },
  };
</script>

<style scoped>
  .toast {
    min-width: 250px;
    margin-left: -125px;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
  }

  .success {
    background-color: green;
    color: white;
  }

  .error {
    background-color: red;
    color: white;
  }

  .close {
    position: absolute;
    background-color: green;
    color: white;
    border: none;
    top: 10px;
    right: 10px;
  }
</style>
