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
import {AlertContextProvider} from "./contexts/AlertContext";
import AlertMessage from "./components/common/AlertMessage";
import {fetchGame, fetchPlayers, fetchSessionInfo} from "./api/game";
import Error from "./components/error/Error";
import Character from "./components/character/Character";
import AuthorizedOnly from "./components/common/AuthorizedOnly";
import CreateSession from "./components/pages/createsession/CreateSession";
import red_player from "./devassets/red_player.png";
import {green} from "@mui/material/colors";


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
                path: 'registration',
                element: <RegistrationPage/>
            },
            {
                path: 'authentication',
                element: <LogInPage/>
            },
            {
                path: 'creategame',
                element: <AuthorizedOnly><CreateGamePage/></AuthorizedOnly>
            },
            {
                path: 'postpage',
                element: <AuthorizedOnly><Postpage/></AuthorizedOnly>
            },
            {
                path: 'lobby/:sessionId',
                element: <AuthorizedOnly><PageLobby/></AuthorizedOnly>,
                loader: async ({params}) => {
                    let response = await fetchSessionInfo(params.sessionId);
                    if (response.status === 404) {
                        throw new Error('404 Invalid session id')
                    }
                    const session = await response.json()
                    const players = await fetchPlayers(params.sessionId)
                    return {session, players}
                },
            },
            {
                path: 'character/:sessionId',
                element: <Character/>,
                loader: async ({params}) => {
                    const response = await fetchSessionInfo(params.sessionId);
                    if (response.status === 404) {
                        throw new Error('404 Invalid session id')
                    }
                    const sessionObj = await response.json()
                    const responseGame = await fetchGame(sessionObj.gameId)
                    if (!responseGame.ok) {
                        throw new Error('404 Invalid session id')
                    }
                    const gameObj = await responseGame.json()
                    return {sessionObj, gameObj}
                }

            },
            {
                path: 'createsession',
                element: <CreateSession/>
            }

        ]
    },
    {
        path: 'game/:sessionId',
        loader: async ({params}) => {
            let response = await fetchSessionInfo(params.sessionId);
            if (response.status === 404) {
                throw new Error('404 Invalid session id')
            }
            const session = await response.json()
            let players = null
            response = await fetchPlayers(params.sessionId)
            if (response.ok) {
                players = await response.json()
                players = players?.map(((p, i) => {
                    return {
                        ...p,
                        pos: {x: p.currentXPosition, y: p.currentYPosition},
                        characterClass: null,
                        avatar: null
                    }
                })) ?? []
                console.log('PLAYERS', players)
            } else {
                console.log(response)
            }
            return {session, players}
        },
        element: <AuthorizedOnly><GamePage/></AuthorizedOnly>
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AlertContextProvider>
        <AlertMessage/>
        <UserContextProvider>
            <RouterProvider router={router}/>
        </UserContextProvider>
    </AlertContextProvider>
    // </React.StrictMode>
);

