import { useState, useEffect, useRef } from 'react';
import { ls, ss } from '../../../utils/store';

import './homepage.css';
import HomePageTitle from './components/HomePageTitle';
import HomePageSubtitle001 from './components/HomePageSubtitle001';
import ButtonAbs from './components/ButtonAbs';
import CardProject from './components/CardsProject';
import RecapCards from './components/RecapCards';
import NumberBand from './components/NumberBand';
import CoAssoc from './components/CoAssoc';
import InfoBand from './components/InfoBand';
import bg from '../../assets/Images/backgrounds/bg-1.png';
import Acturesume from './components/Acturesume';
import Agendaresume from './components/Agendaresume';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import ErrorPage from '../../../utils/error-page';
import { Helmet } from "react-helmet";
import Footer2 from '../../footer/Footer2';

import ScrollChangePosition from './components/ScrollChangePosition';

function HomePage(props) {

  const targetRef = useRef(null); // Référence de l'élément cible

  useEffect(() => {
    ss.set('window', 'home');
  }, []);

  try {
    return (
      <>
        <Helmet>
          <title>Politique de Confidentialité - MonSite</title>
          <meta name="description" content="site officiel de la CPTS des Mauges" />
          <meta name="keywords" content="CPTS des Mauges, Mauges, CPTS" />
          <meta name="author" content="KDDS" />

          <meta property="og:title" content="Page d'accueil - CPTS des Mauges" />
          <meta property="og:description" content="Bienvenue sur le site de la CPTS des Mauges" />
          <meta property="og:url" content="https://cptsdesmauges.fr" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://cptsdesmauges.fr/favicon.ico" />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Politique de Confidentialité",
              "description": "Découvrez comment nous collectons, utilisons et protégeons vos données.",
              "url": "https://cptsdesmauges.fr",
            })}
          </script>
        </Helmet>

        <div className='container-root'>
          <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
    
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="274" viewBox="0 -70 1920 274" fill="none">
            <path d="M1969.5 147.685C1997.68 176.5 2000 291.828 1969.5 270.5C1623.69 28.6873 55.3823 294.383 -147.5 91.5C-182 57 -105 -16.3691 -66.4998 4.18471C508.669 311.247 1824.41 -0.699097 1969.5 147.685Z" fill="#008CDD" fill-opacity="0.33"/>
          </svg>
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="487" viewBox="0 -70 1920 487" fill="none">
            <path d="M2043.5 250C2050.57 289.677 2159.61 523.723 2129.1 502.396C1783.29 260.583 129.382 401.883 -73.4998 199C-108 164.5 -201.194 -137 -40.5 76C275.988 495.505 2010 62.0003 2043.5 250Z" fill="#008CDD" fill-opacity="0.33"/>
          </svg>
    
          <div className='grid place-items-center'>
            <HomePageTitle />
          </div>
    
                  
          <div className='h-[50px] grid grid-cols-5'>
            <div className='col-start-2'>
              <ButtonAbs selected={'decouvrir'} setChildW={props.setChildW}/>
            </div>
          </div>
    
          <NumberBand />
    
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 257" fill="none">
            <path d="M1999.5 29C2223.5 284.5 2312.5 382.5 2024 153C1725.95 -84.0969 -100.5 487.002 -184 212.502C-207.762 134.386 -405.541 29.802 -184 134.002C406 411.502 1862.69 -127.051 1999.5 29Z" fill="#F74924" fill-opacity="0.33"/>
          </svg>
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
            <path d="M2006 24.5001C2108.97 129.168 2248.83 416.111 1956.5 245C1499.5 -22.5 -159.629 596.5 -239.468 232C-259.52 140.453 -444.877 80.6212 -239.467 213.832C172.5 481 1860.46 -123.444 2006 24.5001Z" fill="#F74924" fill-opacity="0.33"/>
          </svg>
    
    
          <HomePageSubtitle001 />
    
          <ButtonAbs selected={'notreprojet'} setChildW={props.setChildW}/>
    
          <CardProject setChildW={props.setChildW} />
    
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 157" fill="none">
            <path d="M2005 26.4999C2192 -63.5007 2398.5 106.001 2005 135.5C1625.21 163.971 -92.4998 451.5 -176 177C-199.762 98.8847 -293.541 -50.1995 -71.9997 54.0001C518 331.5 1818 116.501 2005 26.4999Z" fill="#F2EE2C" fill-opacity="0.33"/>
          </svg>
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
            <path d="M1999.5 173.5C2186.5 83.4994 2363 250.501 1969.5 280C1589.71 308.471 -90.0001 475.501 -173.5 201C-197.262 122.885 -264.541 -74.1996 -43 30C547 307.5 1812.5 263.501 1999.5 173.5Z" fill="#F2EE2C" fill-opacity="0.33"/>
          </svg>
    
          <Acturesume setChildW={props.setChildW}/>
    
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
            <path d="M2003.5 42.5C2290 335.5 2322.89 291.534 1968 119C1588.5 -65.5 -77 549 -160.5 274.5C-184.262 196.384 -249 -79.0003 -57 23.4997C518.171 330.558 1858.41 -105.884 2003.5 42.5Z" fill="#8DC943" fill-opacity="0.33"/>
          </svg>
          <svg className='absolute w-[100%] h-[100%]' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
            <path d="M1999.5 28.4999C2286 321.5 2324.39 307.534 1969.5 135C1590 -49.5 -63.9998 515 -147.5 240.5C-171.262 162.385 -254.5 -15.4999 -62.5 87.0001C512.671 394.058 1854.41 -119.884 1999.5 28.4999Z" fill="#8DC943" fill-opacity="0.33"/>
          </svg>
    
          <Agendaresume setChildW={props.setChildW}/>
    
          <CoAssoc />
    
          <ButtonAbs selected={'contact'} setChildW={props.setChildW}/>
    
          <InfoBand setChildW={props.setChildW} />
    
          <Footer2 />
        </div>
      </>

    );
  }
  catch(error){
    return <ErrorPage error={error} />
  }
}

export default HomePage;
