
import { useState, useEffect, useRef } from 'react';
import './contact.css';
import Header from '../../header/Header';
import ErrorPage from '../../../utils/error-page';
import Footer2 from '../../footer/Footer2';

import { API_global } from '../../services/api/globalServices';

import { ls, ss } from '../../../utils/store';
import Footer from '../../footer/Footer';

function Contact (props) {

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setGlobalData(await API_global.get_all());
        }
        getData();
    }, []);

    useEffect(() => {
        ss.set('window', 'bureauetconseil');
    }, []);

    const [docWidth, setDocWidth] = useState(null);
    const [docHeight, setDocHeight] = useState(null);

    useEffect(() => {
        setDocHeight(window.innerHeight);
        setDocWidth(window.innerWidth - 10);
    }, [window.innerHeight]);

    try {
        return (
            <div className='container-root'>
                <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
                <div className='bg-transparent'>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 157" fill="none">
                    <path d="M2005 26.4999C2192 -63.5007 2398.5 106.001 2005 135.5C1625.21 163.971 -92.4998 451.5 -176 177C-199.762 98.8847 -293.541 -50.1995 -71.9997 54.0001C518 331.5 1818 116.501 2005 26.4999Z" fill="#F2EE2C" fill-opacity="0.33"/>
                    </svg>
                    <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                    <path d="M1999.5 173.5C2186.5 83.4994 2363 250.501 1969.5 280C1589.71 308.471 -90.0001 475.501 -173.5 201C-197.262 122.885 -264.541 -74.1996 -43 30C547 307.5 1812.5 263.501 1999.5 173.5Z" fill="#F2EE2C" fill-opacity="0.33"/>
                    </svg>
                    <h2 className='titlepage grid place-items-center relative md:text-7xl text-3xl'>
                        Où nous trouver ?
                    </h2>
                    <div className='card bg-transparent z-10 relative grid place-items-center'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2711.0886173810504!2d-0.8697339232249247!3d47.19527801629017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4806394f5c7e37b9%3A0x70449768053ab591!2s1%20Pl.%20Andr%C3%A9%20Brossier%2C%2049510%20Beaupr%C3%A9au-en-Mauges!5e0!3m2!1sfr!2sfr!4v1736268725206!5m2!1sfr!2sfr" className='w-[80dvw] h-[50dvh]' allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> 
                    </div>
                    <div className='z-10 relative'>  
                        {
                            globalData !== null ? (
                                <div>
                                    <p className='maintext'>Vous pouvez nous contacter à l'adresse mail <a href={'mailto: ' + globalData[0].mail}><span className='text-sky-400 redirectioncontact'>{globalData[0].mail}</span></a></p>
                                    <p className='maintext'>Par téléphone au <a href={'tel: ' + globalData[0].tel}><span className='text-sky-400 redirectioncontact'>{globalData[0].tel}</span></a></p>
                                </div>
                            ) :
                            (
                                null
                            )
                        }
                    </div>
                </div>
                <Footer2 />
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default Contact;