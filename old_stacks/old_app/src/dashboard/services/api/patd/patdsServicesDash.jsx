
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_patdsDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/patds/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(patd_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/patds/byid/' + patd_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_patd(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/new';
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

    async remove_patd(patd_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('patd_id', patd_id);
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

    async update_patd(patd_id, target, name, base64, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        if (target.length > 0){
            var patf_ids = "";
        }
        else {
            var patf_ids = "null";
        }
        for (let i = 0; i < target.length; i++) {
            if (i === target.length - 1) {
                patf_ids += target[i].patf_id;
            }
            else {
                patf_ids += target[i].patf_id + ',';
            }
        }

        formData.append('patd_id', patd_id);
        formData.append('patf_ids', patf_ids);
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

    async get_all_patf(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/patds/patf/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id_patf(patf_id){
        try {
            console.log(patf_id);
            const api = process.env.REACT_APP_BASE_API_URI + '/patds/patf/byid/' + patf_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async create_patd_patf(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/patf/new';
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

    async remove_patd_patf(patf_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/patf/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('patf_id', patf_id);
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

    async update_patd_patf(patf_id, name, subtitle, description, base64, actif){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/patds/patf/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var subtitleToSend = subtitle.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var descriptionToSend = description.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        formData.append('patf_id', patf_id);
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

