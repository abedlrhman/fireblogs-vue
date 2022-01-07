import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog CArd #1", blogCoverPhoto: "stock-1", blogDate: " 1 jan 2022"},
      { blogTitle: "Blog CArd #2", blogCoverPhoto: "stock-2", blogDate: " 10 may 2021"},
      { blogTitle: "Blog CArd #3", blogCoverPhoto: "stock-3", blogDate: " 17 dec 2012"},
      { blogTitle: "Blog CArd #4", blogCoverPhoto: "stock-4", blogDate: " 15 oct 2019"},
    ],
    editPosts: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPosts = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
