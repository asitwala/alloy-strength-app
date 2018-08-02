import Api from './Api'; 

export default {
    sendContactMessage(params) {
        return Api().post(`/api/users/contact-form`, params);
    },
    purchaseGalvaoPDF(params) {
        return Api().post(`/api/users/purchase/galvao-pdf`, params);
    }

};