export default {
    state: {
        token: localStorage.getItem('access_token') || null,
        authError : null,
        requisitionSlips: [],
        currentUser: null,
        dialogOitm: false,
        selectedIndex: null,
        apiSelectedValue: null,
        watchApiChange: 0,
        // requisitionSlipEditDialog: false,
        
        

    },
    getters: {
        // requisitionSlipEditDialog(state){
        //     return state.requisitionSlipEditDialog;
        // },

        dialogOitm(state) {
            return state.dialogOitm;
        },
        getApiSelectedValue(state){
            return state.apiSelectedValue
        },
        getSelectedIndex(state) {
            return state.selectedIndex;
        },

        isLoggedIn(state) {
            return !!state.token;
        },

        authError(state) {
            return state.authError;
        },

        getRequisitionSlips(state) {
            return state.requisitionSlips;
        },

        getCurrentUser(state) {
            return state.currentUser;
        },

        getRequisitionSlipsHeader(state) {
            return state.requisitionSlips.map( val => {
                    return {
                        docNum: val.DocEntry,
                        projectName: val.U_ProjName,
                        cardCode: val.U_CardCode,
                        taxDate: val.U_TaxDate,
                        preparedBy: val.U_PreparedBy,
                        status: val.U_DocStatus
                    }
                });
        } 

        




        
    },
    mutations: {

        //USE COMMIT TO USE MUTATION

        getOitm(state, index) {
            state.dialogOitm = !state.dialogOitm;
            state.selectedIndex = index

        },

        closeDialogOitm(state)
        {
            state.dialogOitm = !state.dialogOitm;
        },

        updateSelectedOitm(state, payload) {
            state.watchApiChange ++;
            state.apiSelectedValue = payload;
            state.dialogOitm = !state.dialogOitm;
        },

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

        retrieveRequisitionSlips(state, requisitionSlips) {
            state.requisitionSlips = requisitionSlips
        },
        getUser(state, payload){
            state.currentUser = payload
        },

        //REQUISITION SLIP

        // openRequisitionSlipEdit(state){
        //     state.requisitionSlipEditDialog = true
        // },


    },

    actions: { 
        //USE DISPATCH TO USE ACTION

        // laravel passport
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
        },

        retrieveRequisitionSlips (context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;

            return new Promise((resolve, reject) => {
                axios.get('/requisition-slip')
                .then(response => {
                    context.commit('retrieveRequisitionSlips', response.data)
                    resolve(response)
                }) 
                .catch(error => {
                    console.log(error)
                    reject(error)
                  })    
            })     
        },

        updateSelectedOitm (context, payload) {
            context.commit('updateSelectedOitm', payload);
        },

        getOitm(context, payload){
            context.commit('getOitm', payload);
        }


    },

}