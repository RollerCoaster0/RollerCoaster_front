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
import Postpage from "./components/pages/postpage/Postpage";
import PageLobby from "./components/pages/lobbypage/PageLobby";
import UserContextProvider from "./contexts/UserContext";
import {AlertContext, AlertContextProvider} from "./contexts/AlertContext";
import AlertMessage from "./components/common/AlertMessage";
import {fetchPlayers, fetchSessionInfo} from "./api/game";
import Error from "./components/error/Error";
import Character from "./components/character/Character";


const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'game/:sessionId',
                loader: async ({params}) => {
                    const response = await fetchSessionInfo(params.sessionId);
                    if (response.status === 404) {
                        throw new Error('404 Invalid session id')
                    }
                    return await response.json()
                },
                element: <GamePage/>
            },
            {
                path: 'registration',
                element: <RegistrationPage/>
            },
            {
                path: 'authentication',
                element: <LogInPage/>
            },
            {
                path: 'creategame',
                element: <CreateGamePage/>
            },
            {
                path: 'postpage',
                element: <Postpage/>
            },
            {
                path: 'lobby/:sessionId',
                element: <PageLobby/>,
                loader: async ({params}) => {
                    console.log(params)
                    let response = await fetchSessionInfo(params.sessionId);
                    if (response.status === 404) {
                        throw new Error('404 Invalid session id')
                    }
                    const session =  await response.json()
                    const players = await fetchPlayers(params.sessionId)
                    return {session, players}
                },
            },
        ]
    },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AlertContextProvider>
            <AlertMessage/>
            <UserContextProvider>
                <RouterProvider router={router}/>
            </UserContextProvider>
        </AlertContextProvider>
    </React.StrictMode>
);

