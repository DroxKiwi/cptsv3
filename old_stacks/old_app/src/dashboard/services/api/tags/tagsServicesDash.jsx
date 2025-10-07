
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_tagsDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/tags/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(tag_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/tags/byid/' + tag_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_tag(name, color, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/tags/new';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('color', color);
        formData.append('actif', actif);
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

    async update_tag(tag_id, name, color, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/tags/update';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('tag_id', tag_id);
        formData.append('name', name);
        formData.append('color', color);
        formData.append('actif', actif);
        console.log(tag_id, name, color, actif);
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
};

