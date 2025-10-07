
import './footer.css';
import FooterMedia from './FooterMedia';
import { useState, useEffect } from 'react';
import fb from '../assets/Images/icones/facebook.png';
import lk from '../assets/Images/icones/linkedin.png';
import { API_global } from '../services/api/globalServices';
import ErrorPage from '../../utils/error-page';

function Footer (props){

    const [globalData, setGlobalData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setGlobalData(await API_global.get_all());
        }
        getData();
    }, []);

    function handleRedirect(wh){
        try{
            console.log(globalData)
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
            <div style={{
                position: 'relative',
            }}>
                {/* 
                    <img id='imgHandDown' src={handDown} width={30} className='animate-pulse' />
                    <FooterMedia docWidth={props.docWidth} setChildW={props.setChildW} />
                */}
                {
                    globalData !== null ? (
                        <div class="container-footer">
                            <h2 className='reseaux-footer-title text-6xl md:text-9xl cooperblack'>@cptsdesmauges</h2>
                            <h3 className='reseaux-footer-subtitle mt-[50px] text-2xl md:text-4xl comicsansms'>Retrouvez nous sur les réseaux</h3>
                            <div className='reseaux-footer-items'>
                                <img className='reseaux-footer-item' src={lk} width="50px" onClick={() => handleRedirect("lk")} ></img>
                                <img className='reseaux-footer-item' src={fb} width="50px" onClick={() => handleRedirect("fb")} ></img>
                            </div>
                            <div class="distorted-oval">
                                <FooterMedia />
                            </div>
                        </div>
                    ) : 
                    (
                        null
                    )
                }
    
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />;
    }
}

export default Footer;