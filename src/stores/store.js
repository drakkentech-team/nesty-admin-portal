import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'user',
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user')) || null,
  }),
  actions: {
    setUser(data) {
      console.log(data)
      this.user = data;
      sessionStorage.setItem('user', JSON.stringify(data));
    },
    getUser() {
      const data =sessionStorage.getItem('user');
      this.user = data;
    }
    ,
    clearUser() {
      this.user = null;
      sessionStorage.removeItem('user');
    }
  }
});
