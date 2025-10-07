import { useState, useEffect, useRef } from 'react';
import './design004.css';

function Design004(props) {

    const [Design004W, setDesign004W] = useState(null);

    useEffect(() => {
        setDesign004W(window.innerWidth - 10);
    }, [])

    return (
        <div className='homepagedesign004 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" width={Design004W} style={{marginTop: '1900px'}} height="1367" viewBox="0 0 1920 1367" fill="none">
            <g filter="url(#filter0_di_1_4071)">
                <path d="M1413.5 351.749C910 2520.75 1205 568.245 -264 171.748C169.268 171.748 2378.5 -180.75 2162 124.25C2206 164.25 2092.29 206.166 2055 320.75C2000 489.75 1476.26 81.373 1413.5 351.749Z" fill="#F2EE2C" fill-opacity="0.33" shape-rendering="crispEdges"/>
            </g>
            <defs>
                <filter id="filter0_di_1_4071" x="-268" y="0.000244141" width="2448.89" height="1366.12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_4071"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_4071" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_1_4071"/>
                </filter>
            </defs>
            </svg>
        </div>
    )
}

export default Design004;