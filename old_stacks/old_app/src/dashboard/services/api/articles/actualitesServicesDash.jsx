
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_actualitesDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/articles/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_by_id(article_id){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/articles/byid/' + article_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    //async create_article(name, base64, tag, actif){
    //    var tagToPost = null;
    //    if (tag !== null){
    //        tagToPost = tag.tag_id;
    //    }
    //    const apiCmd = process.env.REACT_APP_BASE_API_URI + '/articles/new';
    //    const FormData = require('form-data');
    //    const formData = new FormData();
    //    formData.append('name', name);
    //    formData.append('img', base64);
    //    formData.append('tagid', tagToPost);
    //    formData.append('actif', actif);
    //    try {
    //        const answer = await fetch(apiCmd, await OptionsFetch.POST(formData)).then((res => {
    //            if (res.status === 200) {
    //                return true;
    //            }
    //            else {
    //                return false;
    //            }
    //        }))
    //        return answer;
    //    }
    //    catch(error){
    //        return false;
    //    }
    //},

    async create_article(){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/articles/new';
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

    async remove_article(article_id){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/articles/remove';
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('article_id', article_id);
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

    async update_article(article_id, name, subtitle, description, base64, tag, actif){
        console.log(article_id, name, base64, tag, actif);
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/articles/update';
        const FormData = require('form-data');
        const formData = new FormData();

        // Modification des guillements vers un caractère spécial pour l'insertion en BDD (à cause du pkdDal)
        var nameToSend = name.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var subtitleToSend = subtitle.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var descriptionToSend = description.replaceAll('"', '_GD_').replaceAll("'", '_GS_');


        formData.append('article_id', article_id);
        formData.append('name', nameToSend);
        formData.append('subtitle', subtitleToSend);
        formData.append('description', descriptionToSend);
        formData.append('img', base64);
        formData.append('tagid', tag.tag_id);
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

