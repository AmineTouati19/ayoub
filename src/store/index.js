import { createStore } from 'vuex'

export default createStore({
  state: {
    account:{
      "id": null,
      "email": null,
      "username": null,
      "role": null,
      "is_verified": null,
      "image": null,
      "skills": null
    }
  },
  getters: {
    // Get the account object from the state
    getAccount: state => state.account
  },
  mutations: {
    // Update the account object in the state
    setAccount: (state, data) => {
      state.account = data;
    }
  },
  actions: {
    login: ({ commit }, data) => {
      // Call the setAccount mutation to update the account object
      commit('setAccount', data);
    }
  },
  modules: {}
});