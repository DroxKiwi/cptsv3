
import { useState, useEffect, useRef } from 'react';
import AddArticle from './containers/AddArticle';
import { ls, ss } from '../utils/store';
import './root.css';

import SideMenu from './components/SIdeMenu';

import { MenuDashboard } from './services/menus/MenuDashboardServices';

function AdminDashCreateTags () {

    const [childW, setChildW] = useState(null);
    const [urlViewer, setUrlViewer] = useState("/");

    const panelmenuitems = MenuDashboard.getAppList(setChildW, setUrlViewer);
    const menubaruser = MenuDashboard.getNavSettings(setChildW);

    useEffect(() => {
        ss.set("editmode", true);
    }, []);

    return (
        <div className="overflow-x-hidden wrapper">
            <div className="h-full w-full overflow-y-hidden">
                <SideMenu panelmenuitems={panelmenuitems} menubaruser={menubaruser}>
                    <AddArticle />;
                </SideMenu>
            </div>
        </div>
    )
}

export default AdminDashCreateTags;