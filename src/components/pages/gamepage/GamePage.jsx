import React, {useState} from 'react';
import {GameContextProvider} from "../../../contexts/GameContext";
import Game from "../../gamespace/Game";
import Chat from "../../chat/Chat";
import Dice from "../../gamespace/actions/Dice";
import {useLoaderData,} from "react-router-dom";
import Navbar from "../../common/navbar/Navbar";
import Skill from "../../gamespace/actions/Skill";
import PageLobby from "../lobbypage/PageLobby";
import Footer from "../../common/footer/Footer";
import EntityCard from "../../gamespace/entitycard/EntityCard";


export const gamePhaseType = {
    HAS_NOT_PLAYER: 0,
    NOT_STARTED: 1,
    WAITING_FOR_MOVE: 2,
    MAKING_MOVE: 3,
    PAUSED: 4,
    ENDED: 5
}
export const userLocation = {
    LOBBY: 0,
    GAME_FIELD: 1
}
const GamePage = () => {
    const {session, players} = useLoaderData()
    const [whereIsUser, setWhereIsUser] = useState(userLocation.LOBBY)
    console.log('WHIU',whereIsUser)
    return (
        <>
            <Navbar/>
            <GameContextProvider session={session} players={players}>
                {whereIsUser === userLocation.LOBBY
                    ? <>
                        <div className='wrapper'>
                            <PageLobby  players={players} setWhereIsUser={setWhereIsUser}/>
                        </div>
                        <Footer/>
                    </>
                    :
                    <>
                        <Game/>
                        <div className='game-field__side-panel' onClick={e => e.stopPropagation()}>
                            <Chat/>
                            <Dice/>
                            <Skill/>
                        </div>
                            <EntityCard/>
                    </>
                }
            </GameContextProvider>
        </>
    );
};

export default GamePage;