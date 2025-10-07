
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_prodsDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/prods/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(prod_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/prods/byid/' + prod_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_prod(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/new';
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

    async remove_prod(prod_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('prod_id', prod_id);
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

    async update_prod(prod_id, target, name, base64, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        if (target.length > 0){
            var prof_ids = "";
        }
        else {
            var prof_ids = "null";
        }
        for (let i = 0; i < target.length; i++) {
            if (i === target.length - 1) {
                prof_ids += target[i].prof_id;
            }
            else {
                prof_ids += target[i].prof_id + ',';
            }
        };

        formData.append('prod_id', prod_id);
        formData.append('prof_ids', prof_ids);
        formData.append('name', nameToSend);
        formData.append('img', base64);
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

    // Gestion des sous-fichiers

    async get_all_prof(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/prods/prof/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id_prof(prof_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/prods/prof/byid/' + prof_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_prod_prof(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/prof/new';
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

    async remove_prod_prof(prof_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/prof/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('prof_id', prof_id);
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

    async update_prod_prof(prof_id, name, subtitle, description, base64, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/prods/prof/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var subtitleToSend = subtitle.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var descriptionToSend = description.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        formData.append('prof_id', prof_id);
        formData.append('name', nameToSend);
        formData.append('subtitle', subtitleToSend);
        formData.append('description', descriptionToSend);
        formData.append('img', base64);
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
    }
};

