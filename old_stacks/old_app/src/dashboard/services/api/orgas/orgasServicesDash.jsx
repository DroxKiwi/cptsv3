
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_orgasDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/orgas/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(orga_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/orgas/byid/' + orga_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_orga(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/orgas/new';
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

    async remove_orga(orga_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/orgas/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('orga_id', orga_id);
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

    async update_orga(orga_id, name, img, role, description){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/orgas/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var roleToSend = role.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var descriptionToSend = description.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        formData.append('orga_id', orga_id);
        formData.append('name', nameToSend);
        formData.append('img', img);
        formData.append('role', roleToSend);
        formData.append('description', descriptionToSend);
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

