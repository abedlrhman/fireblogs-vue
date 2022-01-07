import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit"

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
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,

  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPosts = payload;
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email;
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("")
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResult = await dataBase.get();
      commit("setProfileInfo", dbResult);
      commit("setProfileInitials")
    }
  },
  modules: {
  }
})
