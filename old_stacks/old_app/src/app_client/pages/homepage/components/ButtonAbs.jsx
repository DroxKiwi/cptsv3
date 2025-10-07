
import { useState, useEffect, useRef } from 'react';

import './buttonabs.css';
import cliquezSur from '../../../assets/Images/icones/cliquez-sur.png';
import cliquezSur1 from '../../../assets/Images/icones/cliquez-sur(1).png';
import cliquezSur2 from '../../../assets/Images/icones/cliquez-ici.png';
import cliquezSur3 from '../../../assets/Images/icones/le-curseur.png';
import { API_global } from '../../../services/api/globalServices';

function ButtonAbs(props) {

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        try {
            const getData = async () => {
                setGlobalData(await API_global.get_all());
            };
            getData();
        }
        catch(error){
            console.error(error);
        }
    }, []);

    function handleClick(page) {
        window.location.replace(process.env.REACT_APP_BASE_APP_URI + page);
    };

    function handleRelocateToURL() {
        window.open(globalData[0].adhererurl);
    };

    switch (props.selected){
        case 'decouvrir':
            return (
                <div className="btntrns decouvrirquinoussomme cursor-pointer z-10" onClick={() => handleClick('/presentation')}>
                    <p className='decouvrirquinoussommetext'>Découvrir qui nous sommes !</p>
                    <img className='decouvrirquinoussommeimg' src={cliquezSur} width='70px'/>
                </div>
            );
        case 'notreprojet':
            return (
                <div className="btntrns notreprojet cursor-pointer z-10" onClick={() => handleClick('/projetdesante')}>
                    <p className='notreprojettext'>Notre projet de santé en détail !</p>
                    <img className='notreprojetimg' src={cliquezSur1} width='70px'/>
                </div>
            );
        case 'actualites':
            return (
                <div className="btntrns actualitessbtnabs cursor-pointer z-10" onClick={() => handleClick('/nosactualites')}>
                    <p className='actualitesstextbtnabs'>Découvrir nos actualités !</p>
                    <img className='actualitessimgbtnabs' src={cliquezSur2} width='70px'/>
                </div>
            );
        case 'contact':
            return (
                <div className="btntrns contactbtnabs cursor-pointer z-10" onClick={() => handleClick('/contact')}>
                    <p className='contacttextbtnabs'>Contactez nous !</p>
                    <img className='contactimgbtnabs' src={cliquezSur3} width='70px'/>
                </div>
            );
        case 'redirectAdh':
            return (
                <div className="btntrns testabs md:w-[300px] w-[180px] cursor-pointer z-10" onClick={handleRelocateToURL}>
                    <p className='testtextbtnabs'>Adhérer à la CPTS !</p>
                    <img className='contactimgbtnabs' src={cliquezSur3} width='70px'/>
                </div>
            );
        default:
            return (
                null
            )  
    }


}

export default ButtonAbs;