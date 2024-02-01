// import renderCards from "../../data/cards"

import { useDispatch, useSelector } from "react-redux"
// import io from 'socket.io-client';
import styles from '../../../styles/playingRoom.module.css'
// import Room2 from "./Room2"
import Room3 from "./Room3"
import Room4 from "./Room4"
import Room5 from "./Room5"
import Room6 from "./Room6"
import Room7 from "./Room7"
import Room8 from "./Room8"
import Room2 from "./Room2"
import WinModal from "../../modal/WinModal"
import { useEffect } from "react"
import { countDown } from "../../../store/gameReducer"
const PlayingRoom = ({ socket }) => {
    // const cards = renderCards()
    const dispatch = useDispatch()
    const { loginRoom, waitingRoom } = useSelector(state => state.roomReducer)
    const { userCards, otherUserCards, pileCards, turn, wildColor, userIndex } = useSelector(state => state.gameReducer)
    useEffect(() => {
        const time = setInterval(() => {
            if (turn.time > 0) {
                dispatch(countDown())
            } else {
                clearInterval(time)
            }
        }, 1000)
        if (turn.time === 0) {
            socket.emit('draw', { roomCode: waitingRoom.roomCode, pileCard: pileCards.topCard, index: userIndex, color: wildColor, auto: true })
        }
        if (turn.time === -1 || turn?.user === '') {
            clearInterval(time)
        }

        return () => {
            clearInterval(time)
        };

    }, [turn.time, turn?.user])
    const renderRoom = () => {
        switch (waitingRoom.users.length) {
            case 0:
                return <h2>Playing room</h2>
            case 2:
                return <Room2 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 3:
                return <Room3 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 4:
                return <Room4 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 5:
                return <Room5 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 6:
                return <Room6 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 7:
                return <Room7 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            case 8:
                return <Room8 loginRoom={loginRoom} waitingRoom={waitingRoom} userCards={userCards} otherUserCards={otherUserCards} pileCards={pileCards} turn={turn} socket={socket} />
            default:
                break
        }
    }
    return (
        <>
            <div className={styles.playing_room_container}>
                <div className={styles.playing_room_bg}></div>
                {/* style={{ display: playingRoom.status ? 'block' : 'none' }} */}
                {/* <Room2 colors={colors} /> */}
                {/* <Room3 colors={colors} /> */}
                {/* <Room4 colors={colors} /> */}
                {/* <Room5 colors={colors} /> */}
                {/* <Room6 colors={colors} /> */}
                {/* <Room7 colors={colors} /> */}
                {renderRoom()}
            </div>
            <WinModal socket={socket} />
        </>
    )
}

export default PlayingRoom