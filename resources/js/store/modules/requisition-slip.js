import moment from "moment";

export default {
    namespaced: true,
    
    state: {
        requisitionSlips: [],
        loading: true,
        viewDialog: false,
        id: '',
        currentItem: {
            projectId: "",
            projectName: "",
            location: "",
            supplier: "",
            preferredSupplier: "",
            preparedBy: "",
            documentNumber: "",
            status: "",
            documentDate: '',
            requiredDate: "",
            urgencyPriority: "",
            checkedBy: "",
            id: "",
            lineDetails: [
                {
                    itemCode: "",
                    itemDescription: "",
                    scopeOfWork: "",
                    scopeDescription: "",
                    materialCode: "",
                    materialDescription: "",
                    lineRemarks: "",
                    infoPrice: '',
                    quantity: "",
                    uom: ""
                }
            ],
      },
    },

    getters: {

        getForm(state)
        {
            return state.form;
        },
        
        getRequisitionSlips(state) {
            return state.requisitionSlips;
        },

        getId(state)
        {
            return state.id;
        },

        getViewDialog(state) {
            return state.viewDialog;
        },

        getCurrentItem(state)
        {
            return state.currentItem
        },

        getRequisitionSlipsLastId(state) {
            let id = 0;
            state.requisitionSlips.forEach(val => {
                if(val.DocEntry > id)
                {
                    id = val.DocEntry
                }
            });

            return id;

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
        },
    },

    mutations: {

        openViewDialog(state){
            state.viewDialog = !state.viewDialog;

        },

        setItemInfo(state, items)
        {
            let result = items;
            let resultHeader = items.header[0];
            let lineDetails = result.lineDetails.map(val => {
                return {
                id: val.id,
                itemCode: val.U_ItemCode,
                itemDescription: val.U_Dscription,
                scopeOfWork: val.U_Scope,
                scopeDescription: val.U_ScopeDesc,
                materialCode: val.U_MaterialCode,
                materialDescription: val.U_MaterialDesc,
                lineRemarks: val.U_LineRemarks,
                infoPrice: val.U_InfoPrice,
                quantity: val.U_Quantity,
                uom: val.U_UomCode
                };
            });
            console.log(items);
            state.currentItem = {
                projectId: resultHeader.U_ProjectID,
                projectName: resultHeader.U_ProjName,
                location: resultHeader.U_Location,
                supplier: resultHeader.U_CardCode,
                preferredSupplier: resultHeader.U_PrefSupplier,
                preparedBy: resultHeader.U_PreparedBy,
                documentNumber: resultHeader.U_DocNum,
                status: resultHeader.U_DocStatus,
                documentDate: resultHeader.U_TaxDate,
                requiredDate: resultHeader.U_ReqDate,
                urgencyPriority: resultHeader.U_Urgency,
                checkedBy: resultHeader.U_CheckedBy,
                id: resultHeader.DocEntry,
                lineDetails: lineDetails,
            };
        },
        retrieveRequisitionSlips(state, requisitionSlips) {
            state.requisitionSlips = requisitionSlips
        },

        createNew(state, payload){
            payload.id ? state.form.documentNumber = payload.id + 1 : state.form.documentNumber = 1;
                state.form.preparedBy = state.getters['getCurrentUser.name'];
                state.form.status = "O";
                
        }

    },

    actions: {

        getItemInfo(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.auth.token;

            return new Promise((resolve, reject) => {
                axios.get(`/requisition-slip/edit/${id}`)
                .then( response => {
                    context.commit('setItemInfo' , response.data)
                    resolve(response);
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
            })
        },
        
        retrieveRequisitionSlipsAction (context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.rootState.auth.token;

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

        openViewDialog(context) {
            return new Promise((resolve,reject) => {
                context.commit('openViewDialog');
            }).then(response => {
                resolve(response)
            })
        }
    }

}