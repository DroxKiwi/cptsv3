
import './footer2.css';
import { useState, useEffect } from 'react';
import fb from '../assets/Images/icones/facebook.png';
import lk from '../assets/Images/icones/linkedin.png';
import { API_global } from '../services/api/globalServices';
import ErrorPage from '../../utils/error-page';
import logoKDDS from '../assets/Images/logoKDDS.png';

function Footer2 () {

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
            <div>
                <h2 className='reseaux-footer-title text-6xl md:text-9xl cooperblack'>@cptsdesmauges</h2>
                <h3 className='reseaux-footer-subtitle mt-[50px] text-2xl md:text-4xl comicsansms'>Retrouvez nous sur les réseaux</h3>
                <footer className='footerpage'>
                <div class="footer-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff4ee" fill-opacity="1" d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,208C672,235,768,245,864,218.7C960,192,1056,128,1152,128C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    </svg>
                </div>
                <div class="footer-container">
                    <div class="footer-column">
                    <h4>Contact</h4>
                    <p>{globalData[0].adr}</p>
                    <p>{globalData[0].postalcode}</p>
                    <p>Téléphone : {globalData[0].tel}</p>
                    <p>Email : <a href={globalData[0].mail}>{globalData[0].mail}</a></p>
                    </div>
                    <div class="footer-column">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="/presentation">À propos</a></li>
                        <li><a href="/adherer">Comment adhérer</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                    </div>
                    <div class="footer-column">
                    <h4>Suivez-nous</h4>
                    <div class="social-links">
                        <img className='reseaux-footer-item' src={lk} width="50px" onClick={() => handleRedirect("lk")} ></img>
                        <img className='reseaux-footer-item' src={fb} width="50px" onClick={() => handleRedirect("fb")} ></img>
                    </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 CPTS des Mauges. Tous droits réservés.</p>
                    <a href="/politique-de-confidentialite">Politique de confidentialité</a> | <a href="/terms-of-service">Conditions d'utilisation</a>
                </div>
                </footer>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default Footer2;