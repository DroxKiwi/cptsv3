
import { ls, ss } from '../../utils/store';

import ErrorLoadPage from './ErrorLoadPage';

export const CheckToken = async () => {    
    try {
        var accesstoken;
        var url;
        const FormData = require('form-data');
        const formData = new FormData();
        console.log(ls.get('accesstoken'));
        accesstoken = ls.get('accesstoken');
        url = process.env.REACT_APP_BASE_API_URI + '/user/token';
        formData.append("accesstoken", accesstoken);
        // Inserer la bonne URI
        const options = {
            method: 'POST',
            headers: {
                Accept: "multipart/form-data",
                'Access-Control-Allow-Headers': 'origin,X-Requested-With,content-type,accept',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: formData,
        };
        try {
            ss.setFormated('stateaccesstoken', 0);
            const answer = await fetch(url, options).then((res => {
                if (res.status === 200 ){
                    ss.setFormated('stateaccesstoken', 1);
                    return res.json();
                }
                else {
                    ss.setFormated('stateaccesstoken', -1);
                    return null;
                }
            }));
            //localStorage.setItem('bearerToken', 'Bearer '+answer[0].bearerToken.access_token);
            //const answer = await fetch(url, options)
            return answer;
        }
        catch (error) {
            console.log(error);
        }
    }
    catch(error){
        console.error(error);
    }
}

export default CheckToken;