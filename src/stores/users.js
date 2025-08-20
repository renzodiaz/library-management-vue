import { defineStore } from "pinia";
import { dataFormatter } from "@/utils/jsona";


export const useUsersStore = defineStore("users", {
    state: () => ({
        list: [],
        currentUser: {},
    }),

    actions: {
        async fetchUsers() {
            const response = await secureAxiosInstance.get("/users");

            const data = dataFormatter.deserialize(response.data);

            this.list = data;
        },
    },

    persist: true
});