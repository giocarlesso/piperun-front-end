<template>
  <div>
    <the-side-bar></the-side-bar>
    <activity-list></activity-list>
  </div>
</template>

<script>
  import TheSideBar from '../components/TheSideBar.vue';
  import ActivityList from '../components/ActivityList';

  export default {
    components: { TheSideBar, ActivityList },
  };
</script>

<style></style>
