
import OptionsFetch from '../../../../utils/optionsFetch';
import { ls, ss } from '../../../../utils/store';

export const API_globalsDash = {
    async get_all(){
        try {
            const api = process.env.REACT_APP_BASE_API_URI + '/globaldatas/all';
            const answer = await fetch(api, await OptionsFetch.GET());
            return await answer.json();
        }
        catch(error){
            console.error(error);
            return(false);
        }
    },

    async update_global(globaldata_id, tel, adr, postalcode, facebook, linkedin, chiffrepsl, chiffrecom, chiffrehab, hommepageprjstext, quisommesnousmaintext, mail, adhererurl){
        const apiCmd = process.env.REACT_APP_BASE_API_URI + '/globaldatas/update';
        const FormData = require('form-data');
        const formData = new FormData();

        var valueToSendHommepageprjstext;
        if (hommepageprjstext === null || hommepageprjstext === undefined || hommepageprjstext === ''){
            valueToSendHommepageprjstext = ' ';
        }
        else {
            valueToSendHommepageprjstext = hommepageprjstext;
        };

        var valueToSendQuisommesnousmaintext;
        if (quisommesnousmaintext === null || quisommesnousmaintext === undefined || quisommesnousmaintext === ''){
            valueToSendQuisommesnousmaintext = ' ';
        }
        else {
            valueToSendQuisommesnousmaintext = quisommesnousmaintext;
        };

        var valueToSendHommepageprjstext = valueToSendHommepageprjstext.replaceAll('"', '_GD_').replaceAll("'", '_GS_');
        var valueToSendQuisommesnousmaintext = valueToSendQuisommesnousmaintext.replaceAll('"', '_GD_').replaceAll("'", '_GS_');

        if (tel === ''){
            tel = 'null';
        }
        if (adr === ''){
            adr = 'null';
        }
        if (postalcode === ''){
            postalcode = 'null';
        }
        if (facebook === ''){
            facebook = 'null';
        }
        if (linkedin === ''){
            linkedin = 'null';
        }
        if (chiffrepsl === ''){
            chiffrepsl = 'null';
        }
        if (chiffrecom === ''){
            chiffrecom = 'null';
        }
        if (chiffrehab === ''){
            chiffrehab = 'null';
        }
        if (mail === ''){
            mail = 'null';
        }
        if (adhererurl === ''){
            adhererurl = 'null';
        }

        formData.append('globaldata_id', globaldata_id);
        formData.append('tel', tel);
        formData.append('adr', adr);
        formData.append('postalcode', postalcode);
        formData.append('facebook', facebook);
        formData.append('linkedin', linkedin);
        formData.append('chiffrepsl', chiffrepsl);
        formData.append('chiffrecom', chiffrecom);
        formData.append('chiffrehab', chiffrehab);
        formData.append('hommepageprjstext', valueToSendHommepageprjstext);
        formData.append('quisommesnousmaintext', valueToSendQuisommesnousmaintext);
        formData.append('mail', mail);
        formData.append('adhererurl', adhererurl);
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
