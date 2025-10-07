import { useState, useEffect, useRef } from "react";
import { PanelMenu } from 'primereact/panelmenu';
import { Badge } from 'primereact/badge';
import logo from '../assets/Images/logoKDDS.png';
import { ls, ss } from '../../utils/store';


function SideMenu (props) {

    const ItemRenderer = (item, options) => (
        <a className="flex align-items-center px-5 py-2 cursor-pointer" onClick={options.onClick}>
            <span className={`${item.icon} text-primary ${item.items && 'isFolderSideMenu'}`} />
            <span className={`mx-2 ${item.items && 'font-bold' && 'isFolderSideMenu'}`}>{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const [isCollapse, setIsCollapse] = useState(false);
    const [items, setItems] = useState([]);

    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };

    useEffect(() => {
        if (!isCollapse) {
            if (isDashboardViewerUrl(window.top.location.href)){
                var itemsTemp = [];
                var applications = {
                    label: 'Pages',
                    icon: 'pi pi-microsoft',
                    template: ItemRenderer,
                    items: []
                }
                for (let i = 0; i < props.panelmenuitems[0].items.length; i++) {
                    applications.items.push({
                        label: props.panelmenuitems[0].items[i].label,
                        icon: props.panelmenuitems[0].items[i].icon,
                        command: props.panelmenuitems[0].items[i].command,
                        template: ItemRenderer,
                        items: []
                    })
                    console.log(props.panelmenuitems[0].items[i])
                    for (let j = 0; j < props.panelmenuitems[0].items[i].items.length; j++){
                        applications.items[i].items.push({
                            label: props.panelmenuitems[0].items[i].items[j].label,
                            icon: props.panelmenuitems[0].items[i].items[j].icon,
                            command: props.panelmenuitems[0].items[i].items[j].command,
                            template: ItemRenderer
                        })
                    }
                }
                itemsTemp.push(applications);
                for (let i = 0; i < props.menubaruser.length; i++) {
                    if (props.menubaruser[i].icon === 'pi pi-id-card'){
                        var itemsTemplated = [];
                        console.log(props.menubaruser[i])
                        for (let j = 0; j < props.menubaruser[i].items.length; j++){
                            itemsTemplated.push({
                                label: props.menubaruser[i].items[j].label,
                                icon: props.menubaruser[i].items[j].icon,
                                command: props.menubaruser[i].items[j].command,
                                template: ItemRenderer
                            });
                        };
                        itemsTemp.push({
                            label: props.menubaruser[i].label,
                            icon: props.menubaruser[i].icon,
                            command: props.menubaruser[i].command,
                            template: ItemRenderer,
                            items: itemsTemplated
                        });
                    }
                    else {
                        itemsTemp.push({
                            label: props.menubaruser[i].label,
                            icon: props.menubaruser[i].icon,
                            command: props.menubaruser[i].command,
                            template: ItemRenderer
                        });
                    }
                }
            }
            else {
                var itemsTemp = [];
                var applications = {
                    label: 'Pages',
                    icon: 'pi pi-microsoft',
                    template: ItemRenderer,
                    command: () => {
                        window.top.location.href = process.env.REACT_APP_BASE_APP_URI + "/dashboard/viewer";
                        ss.set("editmode", true);
                    }
                }
                itemsTemp.push(applications);
                for (let i = 0; i < props.menubaruser.length; i++) {
                    if (props.menubaruser[i].icon === 'pi pi-id-card'){
                        var itemsTemplated = [];
                        console.log(props.menubaruser[i])
                        for (let j = 0; j < props.menubaruser[i].items.length; j++){
                            itemsTemplated.push({
                                label: props.menubaruser[i].items[j].label,
                                icon: props.menubaruser[i].items[j].icon,
                                command: props.menubaruser[i].items[j].command,
                                template: ItemRenderer
                            });
                        };
                        itemsTemp.push({
                            label: props.menubaruser[i].label,
                            icon: props.menubaruser[i].icon,
                            command: props.menubaruser[i].command,
                            template: ItemRenderer,
                            items: itemsTemplated
                        });
                    }
                    else {
                        itemsTemp.push({
                            label: props.menubaruser[i].label,
                            icon: props.menubaruser[i].icon,
                            command: props.menubaruser[i].command,
                            template: ItemRenderer
                        });
                    }
                }
            }
            setItems(itemsTemp);
        }
        else {
            var itemsTemp = [];

            //for (let i = 0; i < props.panelmenuitems[0].items.length; i++) {
            //    itemsTemp.push({
            //        icon: props.panelmenuitems[0].items[i].icon,
            //        command: props.panelmenuitems[0].items[i].command,
            //        template: ItemRenderer
            //    })
            //};

            for (let i = 0; i < props.menubaruser.length; i++) {
                if (props.menubaruser[i].icon !== 'pi pi-id-card'){
                    itemsTemp.push({
                        icon: props.menubaruser[i].icon,
                        command: props.menubaruser[i].command,
                        template: ItemRenderer
                    });
                }
            };

            setItems(itemsTemp);
        }
    }, [isCollapse]);

    function handleRetractSideMenu() {
        var sideMenu = document.getElementById('side-menu');
        var contentMainPage = document.getElementById('content-main-page');
        setIsCollapse(!isCollapse);
        sideMenu.classList.toggle('collapse-side-menu');
        sideMenu.classList.toggle('not-collapse-side-menu');
        contentMainPage.classList.toggle('collapse-content-menu');
        contentMainPage.classList.toggle('not-collapse-content-menu');
    }

    return (
        <div className="flex z-10">
            <div id='side-menu' className="sidemenubg h-screen text-white not-collapse-side-menu">
                {
                    !isCollapse ? (
                        <div className="w-full">
                            <i onClick={() => handleRetractSideMenu()} className="pi pi-angle-double-left cursor-pointer" style={{ color: 'white', fontSize: '1.5rem', marginLeft: '10px', marginTop: '10px' }}></i>
                        </div>
                    ) :
                    (
                        <div className="w-full">
                            <i onClick={() => handleRetractSideMenu()} className="pi pi-angle-double-right cursor-pointer" style={{ color: 'white', fontSize: '1.5rem', marginLeft: '10px', marginTop: '10px' }}></i> 
                        </div>
                    )
                }
                <span className="inline-flex align-items-center gap-5 py-2">
                    <img src={logo} className="w-[50px] h-[50px]" />
                    <span className="pl-10 text-xl font-semibold img-menu">
                        Administration
                    </span>
                </span>
                <PanelMenu model={items} className="w-full md:w-20rem" />
            </div>
            <div id='content-main-page' className="not-collapse-content-menu">
                {props.children}
            </div>
        </div>
    )
}

export default SideMenu;