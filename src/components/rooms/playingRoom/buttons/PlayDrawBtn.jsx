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
        socket.emit('pass', { roomCode: waitingRoom.roomCode, pileCard: pileCards.topCard, index: userIndex })
    }
    const disableCondition = turn.suitCards.length === 0 || play.card === ''
    const passCondition = turn.passBtn
    return (
        <>
            <div className='d-flex flex-column mb-3' style={{ zIndex: 100 }}>
                <div className="d-flex justify-content-center">
                    <Button color='primary' className="mx-2" onClick={drawCard}>Draw</Button>
                    <Button color='warning' className="mx-2" style={{ display: passCondition ? 'block' : 'none' }} onClick={passCard}>Pass</Button>
                    <Button color='success' className="mx-2" disabled={disableCondition} onClick={playCard}>Play</Button>
                </div>
                {color
                    ? <>
                        <div className='d-flex justify-content-center my-1'>
                            <Button color='danger' className="mx-1" size="sm" onClick={() => playCardWithColor('r')}>Red</Button>
                            <Button color='warning' className="mx-1" size="sm" onClick={() => playCardWithColor('y')}>Yellow</Button>
                            <Button color='success' className="mx-1" size="sm" onClick={() => playCardWithColor('g')}>Green</Button>
                            <Button color='primary' className="mx-1" size="sm" onClick={() => playCardWithColor('b')}>Blue</Button>
                        </div>
                        <p className="my-0 py-0">Please choose color</p>
                    </>
                    : <></>
                }
            </div>

        </>
    )
}
export default PlayDrawButton