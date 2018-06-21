<template>
  <div class="as-users">
    <v-card class="as-user-data-table-container">
      <v-card-title>
        <h2>ELECTRUM PERFORMANCE USERS</h2>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        class="as-user-data-table"
      >
        <!-- props: Vuetify's transformation of our 'users' data --> 
        <template slot="items" slot-scope="props">
          <td>{{ props.item.firstName }}</td>
          <td>{{ props.item.email }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>

  import UsersService from '@/services/UsersService';

  export default {
    name: 'users',
    data() {
      return {
        users: [],
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left', 
            sortable: true,
            value: 'firstName'
          },
          { text: 'Email', value: 'email' }
        ]
      }
    },
    mounted() {
      this.getAllInfo();
      //this.getUsers();
    },
    methods: {
      async getUsers() {
        let response = await UsersService.fetchUsers();
        this.users = response.data.users; 
      },
      async getAllInfo() {
        let response = await UsersService.fetchAllInfo();
      }
    }
  };
</script>

<style lang="scss">
  .as-users {
    text-align: center;
    width: 100%;
  }
  .as-user-data-table-container {
    height: 900px !important;
  }

  .as-user-data-table {
    td {
      text-align: left;
    }
  }
</style>
