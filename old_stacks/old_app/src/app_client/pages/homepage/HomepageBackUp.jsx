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
import Header from '../../header/Header';

function HomePage(props) {

  const [docHeight, setDocHeight] = useState(null);
  const [docWidth, setDocWidth] = useState(null);

  useEffect(() => {
    ss.set('window', 'home');
  }, []);

  useEffect(() => {
      setDocHeight(window.innerHeight);
      setDocWidth(window.innerWidth - 10);

      var body = document.body,
      html = document.documentElement;

      var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
      setDocHeight(height);
  }, [window.innerHeight]);

  if (window.innerWidth < 1468){
    return (
      <div>
        <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
        <div id='homepage' className="homepagebackgroundmain">
          <div className='grid grid-rows-12'>
            <div className='absolute overflow-hidden' style={{width: window.innerWidth, height: docHeight}}>
              {/*
                <Button label='test' onClick={test} ></Button>
              */}
              <img src={bg} className='bg' />
              <div className='cursor-pointer marginmobile'>
                <ButtonAbs selected={'decouvrir'} setChildW={props.setChildW}/>
              </div>
              <div className='row-start-1 row-end-2'>
                <HomePageTitle mobile={true} />
              </div>
              <div id="" className='grid place-content-center row-start-2 row-end-3'>
                <HomePageSubtitle001 mobile={true} />
              </div>
              <div className='my-10 row-start-3 row-end-4'>
                <CardProject setChildW={props.setChildW} mobile={true} />
              </div>
              {/*
              <div className='cursor-pointer'>
                <ButtonAbs selected={'actualites'} setChildW={props.setChildW}/>
              </div>
              */}
              <div className='row-start-4 row-end-5 h-[400px]'>
                <Acturesume setChildW={props.setChildW}/>
              </div>
              <div>
                <NumberBand mobile={true} />
              </div>
              <div>
                <CoAssoc mobile={true} />
              </div>
              <div className='mt-10'>
                <InfoBand mobile={true} setChildW={props.setChildW} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className=''>
        <Header setChildW={props.setChildW} setHeaderHeight={props.setHeaderHeight} />
        <div id='homepage' className="homepagebackgroundmain" style={{width: docWidth + 10, height: docHeight}}>
          <div className='grid grid-rows-12'>
            <div className='absolute' style={{width: window.innerWidth - 10, height: docHeight}}>
              {/*
                <Button label='test' onClick={test} ></Button>
              */}
              <img src={bg} className='bg' />
              <div className='cursor-pointer'>
                <ButtonAbs selected={'decouvrir'} setChildW={props.setChildW}/>
              </div>
              <div className='row-start-1 row-end-2'>
                <HomePageTitle />
              </div>
              <div id="" className='grid place-content-center row-start-2 row-end-3'>
                <HomePageSubtitle001 />
              </div>
              <div className='cursor-pointer'>
                <ButtonAbs selected={'notreprojet'} setChildW={props.setChildW}/>
              </div>
              <div className='my-10 row-start-3 row-end-4'>
                <CardProject setChildW={props.setChildW} />
              </div>
              {/*
              <div className='cursor-pointer'>
                <ButtonAbs selected={'actualites'} setChildW={props.setChildW}/>
              </div>
              */}
              <div className='row-start-4 row-end-5 h-[400px]'>
                <Acturesume setChildW={props.setChildW}/>
              </div>
              <div>
                <NumberBand />
              </div>
              <div>
                <CoAssoc />
              </div>
              <div className='cursor-pointer'>
                <ButtonAbs selected={'contact'} setChildW={props.setChildW}/>
              </div>
              <div>
                <InfoBand setChildW={props.setChildW} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default HomePage;
