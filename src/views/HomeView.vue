<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';

const usersStore = useUsersStore();
usersStore.fetchUsers();

const newUser = ref({
  id: null,
  nom: '',
  prenom: '',
  pseudo: ''
});

const isEditing = ref(false);

const addUser = async () => {
  try {
    await usersStore.addUser(newUser.value);
    resetForm();
  } catch (err) {
    console.error("Error adding user:", err);
  }
};

const editUser = (user) => {
  newUser.value = { ...user };
  isEditing.value = true;
};

const updateUser = async () => {
  try {
    await usersStore.updateUser(newUser.value);
    resetForm();
  } catch (err) {
    console.error("Error updating user:", err);
  }
};

const deleteUser = async (userId) => {
  try {
    await usersStore.deleteUser(userId);
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

const resetForm = () => {
  newUser.value = { id: null, nom: '', prenom: '', pseudo: '' };
  isEditing.value = false;
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Liste des utilisateurs</h1>

    <form @submit.prevent="isEditing ? updateUser() : addUser()" class="mb-4 p-4 border rounded">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom:</label>
        <input id="nom" v-model="newUser.nom" required class="form-control" />
      </div>
      <div class="mb-3">
        <label for="prenom" class="form-label">Prénom:</label>
        <input id="prenom" v-model="newUser.prenom" required class="form-control" />
      </div>
      <div class="mb-3">
        <label for="pseudo" class="form-label">Pseudo:</label>
        <input id="pseudo" v-model="newUser.pseudo" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary me-2">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
      <button type="button" @click="resetForm" v-if="isEditing" class="btn btn-secondary">Cancel</button>
    </form>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Pseudo</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usersStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.nom }}</td>
          <td>{{ user.prenom }}</td>
          <td>{{ user.pseudo }}</td>
          <td>
            <button @click="editUser(user)" class="btn btn-warning btn-sm me-2">Modifier</button>
            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
