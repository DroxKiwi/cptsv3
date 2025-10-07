import CheckToken from "./CheckToken";
import { useState, useEffect } from "react";
import { ls , ss } from '../../utils/store';

import ErrorLoadPage from './ErrorLoadPage';

export const Middleware = {

    Execute () {
        const [valideToken, setValideToken] = useState(false);

        useEffect(() => {
            try {
                CheckToken().then((data) => setValideToken(data));
            }
            catch(error){
                console.error(error);
            }
        }, []);
        try {
            if (valideToken !== false){
                ls.setFormated('bearerToken', 'Bearer ' + valideToken[0].bearertoken.access_token)
            }
            return valideToken;
        }
        catch(error){
            console.error(error);
        }
    }
}


export default Middleware;