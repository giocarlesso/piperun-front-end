<template>
  <div>
    <button class="btn-primary">
      Adicionar Nova Atividade
    </button>
    <table class="table">
      <thead>
        <th>Título</th>
        <th>Responsável</th>
        <th>Status</th>
        <th>Tipo</th>
        <th>Criada</th>
        <th>Finalizada</th>
        <th>Opções</th>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.id">
          <td>{{ activity.title }}</td>
          <td>{{ getUserName(activity.owner_id) }}</td>
          <td>{{ activity.status }}</td>
          <td>{{ getType(activity.activity_type) }}</td>
          <td>{{ formatDate(activity.created_at) }}</td>
          <td>{{ formatDate(activity.delivery_date) }}</td>
          <td>
            <button
              v-if="activity.status !== 2"
              @click="finishActivity(activity)"
            >
              Concluir
            </button>
            <button @click="updateActivity(activity)">
              Editar
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
  export default {
    data() {
      return {
        activities: [],
      };
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
