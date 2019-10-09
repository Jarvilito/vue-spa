export default {
    state: {
        token: localStorage.getItem('access_token') || null,
        authError : null,
        

    },
    getters: {

        isLoggedIn(state) {
            return !!state.token;
        },

        authError(state) {
            return state.authError;
        }



        
    },
    mutations: {
        retrieveToken(state,token){
            state.token = token;
            state.authError = null
        },

        destroyToken(state) {
            state.token = null
        },

        authError(state) {
            state.authError = 'Incorrect Password or Email'
        },


    },

    actions: {

        // laravel passport
        retrieveToken(context, credentials)  {

            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    email: credentials.email,
                    password: credentials.password
                })
                .then(response => {
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
        logout(context){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' +  context.state.token;

            if (context.getters.isLoggedIn){
                return new Promise((resolve, reject) => {
                axios.post('/logout')
                    .then(response => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        resolve(response)
                    })
                    .catch(error => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        reject(error)
                    })
                
                })
            }
        },


    },

}