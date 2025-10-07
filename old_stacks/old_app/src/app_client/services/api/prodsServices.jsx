
import OptionsFetch from '../../../utils/optionsFetch';
import { ls, ss } from '../../../utils/store';

export const API_prods = {
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

    async get_all_profs(){
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
    }
};

