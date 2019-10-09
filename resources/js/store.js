import { getLocalUser } from "./helpers/auth";
// import createPersistedState from 'vuex-persistedstate'
const user = getLocalUser();

export default {
    state: {
        post : 'im a post from state',
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        customers: []
    },
    getters: {

        post(state) {
            return state.post;
        },

        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state){
            return state.currentUser;
        },
        authError(state){
            return state.auth_error;
        },
        customers(state) {
            return state.customers
        }
        
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem("user", JSON.stringify(state.currentUser))
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.currentUser = null;
        }
    },

    actions: {
        login(context) {
            context.commit("login");
        }

    },
    // plugins: [
    //     createPersistedState({
    //       getState: (key) => Cookies.getJSON(key),
    //       setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    //     })
    //   ]
}