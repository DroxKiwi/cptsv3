
import OptionsFetch from '../../../utils/optionsFetch';
import { ls, ss } from '../../../utils/store';

export const API_events = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/events/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async get_all_tags() {
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/tags/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    }
};

