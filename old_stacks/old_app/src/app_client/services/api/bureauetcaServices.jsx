
import OptionsFetch from '../../../utils/optionsFetch';
import { ls, ss } from '../../../utils/store';

export const API_bureauetca = {
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
};

