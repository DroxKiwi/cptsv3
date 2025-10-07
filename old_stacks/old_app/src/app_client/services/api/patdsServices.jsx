
import OptionsFetch from '../../../utils/optionsFetch';
import { ls, ss } from '../../../utils/store';

export const API_patds = {
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

    async get_all_patfs(){
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
            const api = process.env.REACT_APP_BASE_API_URI + '/patds/patf/byid/' + patf_id;
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    }
};

