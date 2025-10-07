
import { useState, useEffect, useRef } from 'react';

import './footermedia.css';
import logo from '../assets/Images/logoDetoure.png';
import carteCouleur from '../assets/Images/CarteSansFond.png';
import { API_global } from '../services/api/globalServices';
import ErrorPage from '../../utils/error-page';
import logoKDDS from '../assets/Images/logoKDDS.png';


function FooterMedia (props) {

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setGlobalData(await API_global.get_all());
        }
        getData();
    }, []);

    function handleRedirect(wh){
        try{
            if (wh === 'fb'){
                window.open(globalData[0].facebook);
            }
            else if (wh === 'lk'){
                window.open(globalData[0].linkedin);
            }
        }
        catch(error){
            console.error(error);
        }
    };

    try {
        return (
            <div className='footermedia'>
                <div className='grid grid-cols-3 place-items-center footer-media-grid'>
                    {
                        globalData !== null ? (
                            <div className='grid'>
                                <img src={logo} className='w-[150px] md:w-[250px]' ></img>
                                <p>{globalData[0].adr}</p>
                                <p>{globalData[0].postalcode}</p>
                                <p>{globalData[0].tel}</p>
                            </div>
                        ) :
                        (
                            null
                        )
                    }
                    <div>
                        <img src={carteCouleur} className='w-[160px] md:w-[400px]'></img>
                    </div>
                    <div className='declarationofficiel'>
                        <img src={logoKDDS} className='w-[100px]' />
                        <p>
                            © 2024 Réalisé par <a className='targetfootermedia' href='mailto:dev.kdds@gmail.com' target='_blank'>KDDS</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default FooterMedia;