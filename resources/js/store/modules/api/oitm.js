export default {
    namespaced: true,
    state: {
        dialogOitm: false,
        selectedIndex: null,
        apiSelectedValue: null,
        watchApiChange: 0,
        oitm: [],
    },

    getters: {
        dialogOitm(state) {
            return state.dialogOitm;
        },
        getApiSelectedValue(state){
            return state.apiSelectedValue
        },
        getSelectedIndex(state) {
            return state.selectedIndex;
        },

        watchApiChange(state){
            return state.watchApiChange;
        },

        getOitm(state) {
            return state.oitm.map(item => {
                return {
                  itemCode: item.ItemCode,
                  itemName: item.ItemName
                };
              });;;
        }
    },

    mutations: {
        getOitm(state, payload) {
            state.oitm = payload.response;
            state.dialogOitm = !state.dialogOitm;
            state.selectedIndex = payload.index

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
    },

    actions : {
        
        // updateSelectedOitm (context, payload) {
        //     context.commit('updateSelectedOitm', payload);
        // },
        async getOitm(context,index){

        //     return new Promise((resolve,reject) => {
        //         axios.get('/oitm/all/api')
        //             .then( response => {
        //                 context.commit('getOitm', {
        //                     index: index,
        //                     response: response.data
        //             })
        //             .catch( error => {
        //                 console.log(error)
        //             })
        //         })
        //     }
        // )

            try {
                const response = await axios.get('/oitm/all/api')
                context.commit('getOitm', {
                    index: index,
                    response: response.data
                })
            }
            catch (error) {
                console.log(error);
            }
        },
        // async getOitm(context, index){
        //     const response = await axios.get('/oitm/all/api')
        //     context.commit('getOitm', {
        //         index: index,
        //         response: response.data
        //     });
        // }

    },

}