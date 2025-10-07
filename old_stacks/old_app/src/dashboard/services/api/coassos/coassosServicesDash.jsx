
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_coassosDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/coassos/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(coassos_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/coassos/byid/' + coassos_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_coassos(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/coassos/new';
        const FormData = require('form-data');
        const formData = new FormData();
        try {
            const answer = await fetch(apiCmd, await OptionsFetch.POST(formData)).then((res => {
                if (res.status === 200) {
                    return true;
                }
                else {
                    return false;
                }
            }))
            return answer;
        }
        catch(error){
            return false;
        }
    },

    async remove_coassos(coassos_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/coassos/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('coassos_id', coassos_id);
        try {
            const answer = await fetch(apiCmd, await OptionsFetch.POST(formData)).then((res => {
                if (res.status === 200) {
                    return true;
                }
                else {
                    return false;
                }
            }))
            return answer;
        }
        catch(error){
            return false;
        }
    },

    async update_coassos(coassos_id, img, redirect_url){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/coassos/update';
        const FormData = require('form-data');
        const formData = new FormData();

        if (redirect_url === ''){
            redirect_url = 'null';
        }

        formData.append('coassos_id', coassos_id);
        formData.append('img', img);
        formData.append('redirect_url', redirect_url);
        try {
            const answer = await fetch(apiCmd, await OptionsFetch.POST(formData)).then((res => {
                if (res.status === 200) {
                    return true;
                }
                else {
                    return false;
                }
            }))
            return answer;
        }
        catch(error){
            return false;
        }
    }
};

