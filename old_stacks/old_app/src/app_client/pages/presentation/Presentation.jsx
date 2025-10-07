

import { useState, useEffect, useRef } from 'react';
import carteCouleur from '../../assets/Images/CarteSansFond.png';
import './presentation.css';
import Header from '../../header/Header';
import NumberBand from '../homepage/components/NumberBand';
import Footer from '../../footer/Footer';
import { API_global } from '../../services/api/globalServices';
import ErrorPage from '../../../utils/error-page';
import Footer2 from '../../footer/Footer2';

import { ls, ss } from '../../../utils/store';

function Presentation (props) {

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setGlobalData(await API_global.get_all());
        }
        getData();
    }, []);

    function handleClick(page) {
        window.location.replace(process.env.REACT_APP_BASE_APP_URI + page);
    };
    
    try {
        return( 
            <div className='container-root'>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 257" fill="none">
                <path d="M1999.5 29C2223.5 284.5 2312.5 382.5 2024 153C1725.95 -84.0969 -100.5 487.002 -184 212.502C-207.762 134.386 -405.541 29.802 -184 134.002C406 411.502 1862.69 -127.051 1999.5 29Z" fill="#F74924" fill-opacity="0.33"/>
                </svg>
                <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                <path d="M2006 24.5001C2108.97 129.168 2248.83 416.111 1956.5 245C1499.5 -22.5 -159.629 596.5 -239.468 232C-259.52 140.453 -444.877 80.6212 -239.467 213.832C172.5 481 1860.46 -123.444 2006 24.5001Z" fill="#F74924" fill-opacity="0.33"/>
                </svg>
                <h2 className='md:text-7xl text-3xl titlepage relative grid place-items-center'>
                    Qu’est-ce qu’une CPTS ?                    
                </h2>
                <div className='grid place-items-center z-10'>
                    <img src={carteCouleur} className='relative md:w-[1000px] w-[100%]' />
                </div>
                <NumberBand />
                <div className='my-10 px-5 grid place-items-center z-10   '>
                    {
                        globalData !== null ? (
                            <p className='md:text-5xl text-2xl textpresentation card bg-transparent'>{globalData[0].quisommesnousmaintext.replaceAll('_GD_', '"').replaceAll("_GS_", "'")}</p>
                        ) :
                        (
                            null
                        )
                    }
                </div>
                <div className="infoband infoband2 md:w-[50dvw] md:h-[8dvh] w-[95dvw] h-[15dvh] grid place-items-center mb-10" onClick={() => handleClick("/adherer")}>
                    <p className='infobandtext'>
                        Vous souhaitez adhérer ?
                    </p>
                </div>
                <Footer2 />
            </div>
        )   
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default Presentation;