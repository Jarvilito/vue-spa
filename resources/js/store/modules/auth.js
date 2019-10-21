export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') || null,
        authError : null,
        currentUser: null,
    },
    getters: {

        isLoggedIn(state) {
            return !!state.token;
        },

        authError(state) {
            return state.authError;
        },

        getCurrentUserData(state) {
            return state.currentUser;
        },

        getToken(state){
            return state.token;
        }
        


    },

    mutations: {
        retrieveToken(state,token){
            state.token = token;
            state.authError = null
        },

        destroyAll(state) {
            state.token = null
            state.authError = null
            state.currentUser = null
        },

        authError(state) {
            state.authError = 'Incorrect Password or Email'
        },

        getUser(state, payload){
            state.currentUser = payload
        },

    },
    actions: {
        retrieveToken(context, credentials)  {

            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    email: credentials.email,
                    password: credentials.password
                })
                .then(response => {
                    console.log(response.data);
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token);
                    context.commit('retrieveToken', token);
                    resolve(response);
    
                })
                .catch(error => {
                    context.commit('authError');
                    console.log(error)
                    reject(error);
                })
    
                })
            },

            

            getUserInfo(context){
                if(context.state.token) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' +  context.state.token;
    
                    axios.get('/user')
                        .then(response => {
                            console.log(response.data)
                            context.commit('getUser', response.data);
        
                        })
                        .catch(error => {
                            console.log(error)
                        })
                        
                }
    
                return null;
    
            },

            logout(context){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' +  context.state.token;

                if (context.getters.isLoggedIn){
                    return new Promise((resolve, reject) => {
                    axios.post('/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyAll')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyAll')
                            reject(error)
                        })
                    
                    })
                }
            }

    }
}