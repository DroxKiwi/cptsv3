import { Badge } from 'primereact/badge';
import { ls, ss } from '../../../utils/store';
import { Dialog } from 'primereact/dialog';
import { API_actualitesDash } from '../api/articles/actualitesServicesDash';

const path = 'src/services/MenuDashboardServices.jsx';

export const MenuDashboard = {
    getNavSettings(setChildW) {
        try {
            const result = [
                {
                    label: 'Paramètres globaux',
                    icon: 'pi pi-cog',
                    command: () => {
                        ss.set("menu", "general");
                        window.top.location.href= '/dashboard';
                    }
                },
                {
                    label: 'Gestion des Tags',
                    icon: 'pi pi-box',
                    command: () => {
                        ss.set("menu", "general");
                        window.top.location.href= '/dashboard/createtags';
                    }
                },
                {
                    label: 'Retourner sur le site',
                    icon: 'pi pi-globe',
                    command: () => {
                        ss.rm("menu");
                        window.top.location.href= '/';
                    }
                },
                {
                    label: 'Administrateur',
                    icon: 'pi pi-id-card',
                    items: [
                        {
                            label: 'Se déconnecter',
                            icon: 'pi pi-fw pi-power-off',
                            command: () => {
                                ls.rm("accesstoken");
                                ls.rm("bearerToken");
                                ss.rm("editmode");
                                window.top.location.href= '/dashboard';
                            }
                        },
                    ]
                },
            ]
            return result;
        }
        catch(error){
            console.error(error);
        }
    },

    getAppList(setChildW, setUrlViewer){
        try {
            const apps = [

                {
                    appName: 'home',
                    label: 'accueil',
                    icon:'pi pi-fw pi-code',
                    command:()=>{
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/")
                    },
                    items: [],
                },

                {
                    appName: 'pre',
                    label: 'presentation',
                    icon:'pi pi-fw pi-code',
                    command:()=>{
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/presentation")
                    },
                    items: [],
                },

                {
                    appName: 'bec',
                    label: 'bureau et conseil',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/bureauetconseil")
                    },
                    items: [],
                },

                {
                    appName: 'prj',
                    label: 'projets / missions',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/projetdesante")
                    },
                    items: [],

                },

                {
                    appName: 'act',
                    label: 'actualites',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/nosactualites")
                    },
                    items: [],
                },

                {
                    appName: 'agd',
                    label: 'agenda',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/agenda")
                    },
                    items: [],
                },

                {
                    appName: 'jsp',
                    label: 'je suis patient',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/jesuispatient")
                    },
                    items: [],
                },

                {
                    appName: 'jspr',
                    label: 'je suis pro',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/jesuisprofessionnel")
                    },
                    items: [],
                },

                {
                    appName: 'adh',
                    label: 'adherer',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/adherer")
                    },
                    items: [],
                },

                {
                    appName: 'ctc',
                    label: 'nous contacter',
                    icon:'pi pi-fw pi-code',
                    command:()=>{ 
                        if (window.top.location.href !== process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer'){
                            window.top.location.href= process.env.REACT_APP_BASE_APP_URI + '/dashboard/viewer';   
                        }
                        setUrlViewer("/contact")
                    },
                    items: [],
                },
            ];
    
            var userPanels = [
                {
                    items: apps
                },
            ]
    
            return userPanels;
        }
        catch(error){
            console.error(error);
        }

    },
};

