import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage";
import GamePage from "./components/pages/gamepage/GamePage";
import RegistrationPage from "./components/pages/registrationpage/RegistrationPage";
import PageLayout from "./components/pages/pagelayout/PageLayout";
import LogInPage from "./components/pages/authentication/LogInPage";
import CreateGamePage from "./components/pages/creategame/CreateGamePage";


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
                element: <LogInPage/>
            },
            {
                path:'creategame',
                element: <CreateGamePage/>
            },
        ]
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

