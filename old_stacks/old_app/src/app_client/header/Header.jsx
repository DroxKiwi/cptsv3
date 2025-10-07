import { useEffect, useRef, useState } from 'react';
import './Header.css';
import { ls, ss } from '../../utils/store';

import { Button } from 'primereact/button';
import logo from '../assets/Images/logoDetoure.png';
import fb from '../assets/Images/icones/facebook.png';
import linkedin from '../assets/Images/icones/linkedin.png';
import ErrorPage from '../../utils/error-page';

import { Dialog } from 'primereact/dialog';

import { API_global } from '../services/api/globalServices';



import { Sidebar } from 'primereact/sidebar';

// Le but du header est uniquement de gérer la gestion d'affichage autre part que dans le corps du composant tableau de bord.

function Header (props) {

    const [globalData, setGlobalData] = useState(null);
    const [visible, setVisible] = useState(false);

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

    const [docWidth, setDocWidth] = useState(null);
    useEffect(() => {
        setDocWidth(window.innerWidth - 10);
    }, [window.innerHeight]);

    function handleClickOngle(e){
        var tbh = document.getElementById('tbh');
        for (let i = 0; i < tbh.childNodes.length; i++){
            tbh.childNodes[i].classList.remove('activeh');
            var temp = tbh.childNodes[i].childNodes;
            if (temp[0] !== undefined){
                temp[0].classList.remove('activeh');
            }
        }
        if (e.target.nodeName === 'BUTTON'){
            e.target.classList.add('activeh');
        }
        else if (e.target.nodeName === 'SPAN'){
            e.target.parentNode.classList.add('activeh');
        }
    };

    function handleAnimationPlay(e, page) {
        //document.getElementById('container-animation').classList.add('container-animation-maskon');
        //document.getElementById('container-animation').classList.remove('container-animation');
        setTimeout(() => {
            //document.getElementById('container-animation').classList.add('container-animation');
            setTimeout(() => {
                //props.setChildW(page);
                window.location.replace(process.env.REACT_APP_BASE_APP_URI + page);
                //handleClickOngle(e);
            }, 0);
        }, 0);
    };

    if (!ss.getFormated("editmode")){
        try {
            return (
                <div>
                    {/*Version < sm */}
                    <div className='relative z-10'>
                        <Sidebar className='w-full' visible={visible} onHide={() => setVisible(false)}>
                            <h2 className='z-50 relative'>Menus</h2>
                            <div id="tbh" className='header grid'>
                                <img src={logo} height="100dvh" width="100dvw" className='cursor-pointer ml-10' onClick={(e) => {handleAnimationPlay(e, '/')}}/>
                                <Button id='presentation' className='headerButton my-10' text label='Qui sommes nous ?' onClick={(e) => {handleAnimationPlay(e, '/presentation')}}></Button>
                                <Button id='bureauetconseil' className='headerButton my-10' text label='Bureau / CA' onClick={(e) => {handleAnimationPlay(e, '/bureauetconseil')}}></Button>
                                <Button id='projetdesante' className='headerButton my-10' text label='Nos projets / missions' onClick={(e) => {handleAnimationPlay(e, '/projetdesante')}}></Button>
                                <Button id='nosactualites' className='headerButton my-10' text label='Nos actualités' onClick={(e) => {handleAnimationPlay(e, '/nosactualites')}}></Button>
                                <Button id='agenda' className='headerButton my-10' text label='Agenda' onClick={(e) => {handleAnimationPlay(e, '/agenda')}}></Button>
                                <Button id='jesuispatient' className='headerButton my-10' text label='Je suis patient' onClick={(e) => {handleAnimationPlay(e, '/jesuispatient')}}></Button>
                                <Button id='jesuisprofessionnel' className='headerButton my-10' text label='Je suis professionnel' onClick={(e) => {handleAnimationPlay(e, '/jesuisprofessionnel')}}></Button>
                                <Button id='adherer' className='headerButton my-10' text label='Comment adhérer ?' onClick={(e) => {handleAnimationPlay(e, '/adherer')}}></Button>
                                <Button id='contact' className='headerButton my-10' text label='Contacts' onClick={(e) => {handleAnimationPlay(e, '/contact')}}></Button>
                            </div>
                        </Sidebar>
                        <div className='card sm:hidden'>
                            <Button className='bg-green-600' label='Menus' icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
                        </div>
                    </div>

                    {/*Version PC */}
                    <div className='relative z-10 hidden lg:block' id="headerDiv z-100">
                        <div className='grid grid-cols-12'>
                            <div id="tbh" className='w-screen header col-span-8 grid grid-cols-11'>
                                <img src={logo} height="100dvh" width="100dvw" className='cursor-pointer ml-10' onClick={(e) => {handleAnimationPlay(e, '/')}}/>
                                <Button id='presentation' className='headerButton my-10' text label='Qui sommes nous ?' onClick={(e) => {handleAnimationPlay(e, '/presentation')}}></Button>
                                <Button id='bureauetconseil' className='headerButton my-10' text label='Bureau / CA' onClick={(e) => {handleAnimationPlay(e, '/bureauetconseil')}}></Button>
                                <Button id='projetdesante' className='headerButton my-10' text label='Nos projets / missions' onClick={(e) => {handleAnimationPlay(e, '/projetdesante')}}></Button>
                                <Button id='nosactualites' className='headerButton my-10' text label='Nos actualités' onClick={(e) => {handleAnimationPlay(e, '/nosactualites')}}></Button>
                                <Button id='agenda' className='headerButton my-10' text label='Agenda' onClick={(e) => {handleAnimationPlay(e, '/agenda')}}></Button>
                                <Button id='jesuispatient' className='headerButton my-10' text label='Je suis patient' onClick={(e) => {handleAnimationPlay(e, '/jesuispatient')}}></Button>
                                <Button id='jesuisprofessionnel' className='headerButton my-10' text label='Je suis professionnel' onClick={(e) => {handleAnimationPlay(e, '/jesuisprofessionnel')}}></Button>
                                <Button id='adherer' className='headerButton my-10' text label='Comment adhérer ?' onClick={(e) => {handleAnimationPlay(e, '/adherer')}}></Button>
                                <Button id='contact' className='headerButton my-10' text label='Contacts' onClick={(e) => {handleAnimationPlay(e, '/contact')}}></Button>
                            </div>
                            <div className='grid grid-cols-2 col-start-11 col-end-12'>
                                <div className='iconMediaHeader grid place-items-center ' onClick={() => handleRedirect("fb")} >
                                    <img src={fb} width={30} />
                                </div>
                                <div className='iconMediaHeader grid place-items-center' onClick={() => handleRedirect("lk")} >
                                    <img src={linkedin} width={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )   
        }
        catch(error){
            return <ErrorPage error={error}/>
        }
    }
}

export default Header;