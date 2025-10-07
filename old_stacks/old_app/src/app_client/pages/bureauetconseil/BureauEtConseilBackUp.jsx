
import { useState, useEffect, useRef } from "react";
import './bureauetconseil.css';
import OrganigrameItem from "./OrganigrameItem";
import userProfil from '../../assets/Images/User-Profile.png';
import orgServ from '../../services/organigrame.json';
import { SpeedDial } from 'primereact/speeddial';
import { ls, ss } from '../../../utils/store';
import Header from '../../header/Header';
import Footer from "../../footer/Footer";
import ErrorPage from "../../../utils/error-page";
import { API_bureauetca } from "../../services/api/bureauetcaServices";
import EditorWindowBCA from "../../../dashboard/tools/EditorWindowBCA";

function BureauEtConseil(props) {
  
    const [data, setData] = useState([]);
    const [docHeight, setDocHeight] = useState(null);
    const [docWidth, setDocWidth] = useState(null);
    const [orgaHeight, setOrgaHeight] = useState(null);
    const [items, setItems] = useState([]);
    const [usersProfil, setUsersProfil] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(true);

    const refSpeedDial = useRef(null);
    
    useEffect(() => {
        ss.set('window', 'bureauetconseil');
    }, []);

    useEffect(() => {
        try {
            const getData = async () => {
                setData(await await API_bureauetca.get_all());
            }
            getData();
        }
        catch(error){
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            var temp = data;
            for (let i = 0; i < temp.length; i++) {
                temp[i].template = <OrganigrameItem imgSrc={userProfil} src={temp[i]} />
                temp[i].command = console.log("Delete clicked");
            }
            setItems(temp);
            setLoaded(true);
        }
        catch(error){
            console.log(error);
        }
    }, [data]);

    useEffect(() => {
        try {
            var tabTemp = [];
            for (let i = 0; i < orgServ.items.length; i++){
                tabTemp.push(orgServ.items[i]);
            }
            setUsersProfil(tabTemp);
            refSpeedDial.current.show();
        }
        catch(error){
            console.log(error);
        }
    }, [items]);
  
    useEffect(() => {
        setDocHeight(window.innerHeight);
        setDocWidth(window.innerWidth - 10);
    }, [window.innerHeight]);

    // ----

    const handleToggle = (e) => {
        try {
            setVisible(true); // Force l'état ouvert
        }
        catch(error){
            console.error(error);
        }
    };

    const handleKeyDown = (event) => {
        event.preventDefault(); // Empêche le comportement par défaut
        console.log("Disabled key !");
    };

    try {
        return (
            <div className='container-root'>
                <EditorWindowBCA>
                    <Header setHeaderHeight={props.setHeaderHeight} />
                    <div className='grid place-items-center card bg-transparent'>
                        <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 157" fill="none">
                        <path d="M2005 26.4999C2192 -63.5007 2398.5 106.001 2005 135.5C1625.21 163.971 -92.4998 451.5 -176 177C-199.762 98.8847 -293.541 -50.1995 -71.9997 54.0001C518 331.5 1818 116.501 2005 26.4999Z" fill="#F2EE2C" fill-opacity="0.33"/>
                        </svg>
                        <svg className='absolute w-[100%] h-[100%] z-0' xmlns="http://www.w3.org/2000/svg" width="1920" height="357" viewBox="0 0 1920 357" fill="none">
                        <path d="M1999.5 173.5C2186.5 83.4994 2363 250.501 1969.5 280C1589.71 308.471 -90.0001 475.501 -173.5 201C-197.262 122.885 -264.541 -74.1996 -43 30C547 307.5 1812.5 263.501 1999.5 173.5Z" fill="#F2EE2C" fill-opacity="0.33"/>
                        </svg>
                        <div className='grid place-items-center card bg-transparent'>
                            <h2 className='titlepage relative'>
                                Organigramme de la CPTS
                            </h2>
                        </div>
                        <div className="overflow-hidden h-screen grid grid-cols-1 place-items-center">
                            <div className="grid place-items-center h-50dvh">
                                <SpeedDial onKeyDown={handleKeyDown} onVisibleChange={handleToggle} id='organigrame' ref={refSpeedDial} visible={visible} buttonStyle={{display: 'none'}} disabled={false} hideOnClickOutside={false} model={items} radius={(450)} type="circle" rotateAnimation={true} />
                            </div>
                        </div>
                    </div>
                </EditorWindowBCA>
                <Footer />
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />
    }
}

export default BureauEtConseil;