import LogoSalesky from '../../app_client/assets/Images/logoDetoure.png';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { ss, ls } from '../../utils/store';

function LoaderComponents() {

    const [visible, setVisible] = useState(false);

    const [stateLoader, setStateLoader] = useState(0);

    useEffect(() => {
        const delay = 30000; 
        setTimeout(() => {
            setStateLoader(1);
        }, delay);
    })


    if (stateLoader == 0) {
        return (
            <div className="h-screen w-full loadercomponent grid place-items-center">
                {
                    ls.getFormated('theme') === true ? (
                        <ProgressSpinner style={{width: '40%', height: '40%'}} strokeWidth="0.5" fill="hsl(0, 0%, 17%)" animationDuration="2s" className="absolute loadercomponentin overflow-hidden"/>
                    ) :
                    (
                        <ProgressSpinner style={{width: '40%', height: '40%'}} strokeWidth="0.5" fill="rgb(255 255 255)" animationDuration="2s" className="absolute loadercomponentin overflow-hidden"/>
                    )
                }
                <img src={LogoSalesky} className='absolute w-[150px]'/>
                <h2 className='absolute text-red-500 bottom-[100px]'>Chargement . . .</h2>
            </div>
        )
    }
    else if (stateLoader == 1) {
        return (
            <div className="w-screen h-screen grid place-content-center">
                <p><i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', marginRight: '30px' }}></i><i onClick={() => setVisible(true)} style={{ fontSize: '2rem' }} className="pi pi-wifi mx-2 text-blue-300 hover:text-blue-500 hover:cursor-pointer animate-pulse" ></i></p>
                <p><b>Vous semblez avoir des lenteurs réseaux</b></p>
                <p><i>Si ce message s'affiche c'est que vous êtes toujours connecté et la page finira par se charger</i></p>
                <p>Testez votre débit en cliquant sur l'icone wifi. Si celui ci est inférieur à 1Mb/secondes, le débit de votre réseau en est problalement la cause.</p>
                <p>Si vous êtes connecté avec un VPN les lenteurs sont normales.</p>
                <p>Si votre débit est supérieur à 1Mb/secondes veuillez contacter le service informatique</p>
                <Dialog header="Que se passe t-il ?" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <div style={{minHeight:'360px'}}>
                        <div style={{width:'100%', height:'0', paddingBottom:'50%', position:'relative'}}>
                            <iframe style={{order:'none', position:'absolute', top:'0', left:'0', width:'100%', height:'100%', minHeight:'360px', border:'none', overflow:'hidden'}} src="https://www.metercustom.net/plugin/">

                            </iframe>
                        </div>
                    </div>                
                </Dialog>
            </div>
        )
    }

}

export default LoaderComponents;