import React from 'react';
import ReactDOM from 'react-dom/client';
// import "primereact/resources/themes/soho-dark/theme.css";
// import "primereact/resources/themes/soho-light/theme.css";
// import "primereact/resources/themes/lara-dark-blue/theme.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';    
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { PrimeReactContext } from 'primereact/api';
import './indexLight.css';
import './scrollbar.css';

import Root from "./routes/root";
import Presentation from './app_client/pages/presentation/Presentation';
import BureauEtConseil from './app_client/pages/bureauetconseil/BureauEtConseil';
import ProjetDeSante from './app_client/pages/projetdesante/ProjetDeSante';
import NosActualite from './app_client/pages/nosactu/NosActualites';
import Agenda from './app_client/pages/agenda/Agenda';
import JeSuisPatient from './app_client/pages/jesuispatient/JeSuisPatient';
import JeSuisProfessionnel from './app_client/pages/jesuispro/JeSuisProfessionnel';
import CommentAdherer from './app_client/pages/commentadherer/CommentAdherer';
import Contact from './app_client/pages/contact/Contact';
import PrivacyPolicy from './app_client/services/PrivacyPolicy';
import TermsOfService from './app_client/services/TermsOfService';

import DashboardGeneralSettings from './routes/dashboardGeneralSettings';
import DashboardViewer from './routes/dashboardViewer';
import DashboardCreateTags from './routes/dashboardCreateTags';
import DashboardAddArticle from './routes/dashboardAddArticle';
import ErrorPage from "./utils/error-page";

import logo from './app_client/assets/Images/logoDetoure.png';
import CookieBanner from './app_client/services/CookieBanner';
import './app_client/services/cookiebanner.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// Liste des routes, possible de les déplacer dans un fichier à côté puis de les importer !
// Je passe par des routes pour permettre une scission entre l'application central, le tableau de bord et les applications annexes. Dans l'immédiat peut utile, mais si on décide
// de rendre indépendantes les applications, je pourrais simplement copier coller le code.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bureauetconseil",
    element: <BureauEtConseil />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/presentation",
    element: <Presentation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projetdesante",
    element: <ProjetDeSante />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/nosactualites",
    element: <NosActualite />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/agenda",
    element: <Agenda />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jesuispatient",
    element: <JeSuisPatient />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jesuisprofessionnel",
    element: <JeSuisProfessionnel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/adherer",
    element: <CommentAdherer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: <DashboardGeneralSettings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/viewer",
    element: <DashboardViewer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/createtags",
    element: <DashboardCreateTags />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard/addarticle",
    element: <DashboardAddArticle />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/politique-de-confidentialite",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
    errorElement: <ErrorPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider value={{ unstyled: false }}>
        <div id="container-animation" className='container-animation grid place-items-center'>
          <img src={logo} width='500px' />
        </div>
        <CookieBanner />
        <RouterProvider router={router}/>
    </PrimeReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
