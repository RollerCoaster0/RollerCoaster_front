import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage";
import GamePage from "./components/pages/gamepage/GamePage";
import RegistrationPage from "./components/pages/registrationpage/RegistrationPage";
import Authentication from "./components/pages/authentication/LogInForm";
import PageLayout from "./components/pages/pagelayout/PageLayout";


const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout/>,
        children: [
            {
             path: '',
             element: <HomePage/>
            },
            {
                path: 'game/:sessionId',
                element: <GamePage/>
            },
            {
                path:'registration',
                element:<RegistrationPage/>
            },
            {
                path:'authentication',
                element:<Authentication/>
            }
        ]
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

