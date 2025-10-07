
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_livretpagesDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/livretpages/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(livret_pages_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/livretpages/byid/' + livret_pages_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_livretpage(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/livretpages/new';
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

    async remove_livretpage(livret_pages_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/livretpages/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('livret_pages_id', livret_pages_id);
        try {
            const answer = await fetch(apiCmd, await OptionsFetch.POST(formData)).then((res => {
                if (res.status === 200) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            return answer;
        }
        catch(error){
            return false;
        }
    },

    async update_livretpage(livret_pages_id, numero_page, img){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/livretpages/update';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('livret_pages_id', livret_pages_id);
        formData.append('numero_page', numero_page);
        formData.append('img', img);
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

