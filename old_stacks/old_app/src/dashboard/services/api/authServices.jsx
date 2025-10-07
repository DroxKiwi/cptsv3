
import OptionsFetch from '../../../utils/optionsFetch';
import { ls, ss } from '../../../utils/store';

export const API_authent = {
    async login(username, password){
        try {
            const FormData = require('form-data');
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const answer = await fetch(process.env.REACT_APP_BASE_API_URI + '/user/authent', await OptionsFetch.POST(formData)).then((res => {
                if (res.status === 200) {
                    return(res.json());
                }
                else {
                    return(false);
                }
            }));
            if (answer){
                ls.set('accesstoken', answer[0].accesstoken);
                return(true);
            }
            else {
                return(false);
            }
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },
};

