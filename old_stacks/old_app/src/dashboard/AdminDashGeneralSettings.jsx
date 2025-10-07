
import { useState, useEffect, useRef } from 'react';
import GeneralSettings from './containers/GeneralSettings';
import { ls, ss } from '../utils/store';
import './root.css';
import ErrorPage from '../utils/error-page';

import SideMenu from './components/SIdeMenu';

import { MenuDashboard } from './services/menus/MenuDashboardServices';

function AdminDashGeneralSettings () {

    const [childW, setChildW] = useState(null);
    const [urlViewer, setUrlViewer] = useState("/");

    const panelmenuitems = MenuDashboard.getAppList(setChildW, setUrlViewer);
    const menubaruser = MenuDashboard.getNavSettings(setChildW);

    useEffect(() => {
        ss.set("editmode", true);
    }, []);

    try {
        return (
            <div className="overflow-x-hidden wrapper">
                <div className="h-full w-full overflow-y-hidden">
                    <SideMenu panelmenuitems={panelmenuitems} menubaruser={menubaruser}>
                        <GeneralSettings />
                    </SideMenu>
                </div>
            </div>
        )
    }
    catch(error){
        return <ErrorPage error={error} />;
    }

}

export default AdminDashGeneralSettings;