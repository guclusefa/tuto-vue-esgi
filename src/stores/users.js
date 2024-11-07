import api from "@/services/api";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
    const users = ref([]);
    const error = ref(null);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            users.value = response.data;
            error.value = null;
        } catch (err) {
            error.value = 'Erreur lors de la récupération des utilisateurs';
            console.error(err);
        }
    };

    const addUser = async (user) => {
        try {
            const response = await api.post('/users', user);
            users.value.push(response.data);
            error.value = null;
        } catch (err) {
            error.value = 'Erreur lors de l\'ajout de l\'utilisateur';
            console.error(err);
        }
    };

    const updateUser = async (user) => {
        try {
            const response = await api.put(`/users/${user.id}`, user);
            const index = users.value.findIndex(u => u.id === user.id);
            if (index !== -1) {
                users.value[index] = response.data;
            }
            error.value = null;
        } catch (err) {
            error.value = 'Erreur lors de la mise à jour de l\'utilisateur';
            console.error(err);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await api.delete(`/users/${userId}`);
            users.value = users.value.filter(user => user.id !== userId);
            error.value = null;
        } catch (err) {
            error.value = 'Erreur lors de la suppression de l\'utilisateur';
            console.error(err);
        }
    };

    return {
        users,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
    };
});
