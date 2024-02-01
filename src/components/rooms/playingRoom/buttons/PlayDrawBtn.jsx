import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "reactstrap"
import { setWildColor } from "../../../../store/gameReducer"

const PlayDrawButton = ({ socket }) => {
    const dispatch = useDispatch()
    const { pileCards, turn, play, wildColor, userIndex } = useSelector(state => state.gameReducer)
    const { waitingRoom } = useSelector(state => state.roomReducer)
    const [color, setColor] = useState(false)
    const playCard = () => {
        if (play.card === 'wild' || play.card === 'drawFour') {
            setColor(true)
        }
        else {
            setColor(false)
            socket.emit('play', { roomCode: play.roomCode, pileCard: play.card, index: userIndex, cardIndex: play.cardIndex, color: wildColor })
        }

    }
    const playCardWithColor = (color) => {
        setColor(false)
        dispatch(setWildColor(color))
        socket.emit('play', { roomCode: play.roomCode, pileCard: play.card, index: userIndex, cardIndex: play.cardIndex, color: color })
    }
    const drawCard = () => {
        setColor(false)
        socket.emit('draw', { roomCode: waitingRoom.roomCode, pileCard: pileCards.topCard, index: userIndex, color: wildColor, auto: false })
    }
    const passCard = () => {
        setColor(false)
        socket.emit('draw', { roomCode: waitingRoom.roomCode, pileCard: pileCards.topCard, index: userIndex })
    }
    const disableCondition = turn.suitCards.length === 0 || play.card === ''
    const passCondition = turn.passBtn
    return (
        <>
            <div className='d-flex flex-column mb-3' style={{ zIndex: 100 }}>
                <div className="d-flex justify-content-evenly ">
                    <Button color='primary' onClick={drawCard}>Draw</Button>
                    <Button color='success' disabled={disableCondition} onClick={playCard}>Play</Button>
                    <Button color='warning' style={{ display: passCondition ? 'block' : 'none' }} onClick={passCard}>Pass</Button>
                </div>
                {color
                    ? <>
                        <div className='d-flex justify-content-evenly'>
                            <Button color='danger' size="sm" onClick={() => playCardWithColor('r')}>Red</Button>
                            <Button color='warning' size="sm" onClick={() => playCardWithColor('y')}>Yellow</Button>
                            <Button color='success' size="sm" onClick={() => playCardWithColor('g')}>Green</Button>
                            <Button color='primary' size="sm" onClick={() => playCardWithColor('b')}>Blue</Button>
                        </div>
                        <p>Please choose color</p>
                    </>
                    : <></>
                }
            </div>

        </>
    )
}
export default PlayDrawButton