
import { useState, useEffect, useRef } from 'react';
import HomePage from '../app_client/pages/homepage/HomePage';
import { Dialog } from 'primereact/dialog';
import {ls, ss} from '../utils/store';
import './root.css';

import useWindowSize from "../hooks/useWindowResize";

function Root () {

    const winW = useWindowSize();

    function isDashboardViewerUrl(url) {
        const regex = /.*\/dashboard\/viewer$/;
        return regex.test(url);
    };

    useEffect(() => {
        if (!isDashboardViewerUrl(window.top.location.href)){
            if (ss.getFormated("editmode")){
                ss.set("editmode", false);
            }
        }
    }, []);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (consent === "true") {
            // Initialisation de Google Analytics ou autres services
            console.log("Cookies acceptés, chargement des scripts...");
        }
    }, []);
      

    return (
        <div>
            <HomePage />
        </div>
    )
}

export default Root;