import { CardBody, CardTitle, CardText, Button } from "reactstrap"
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWaitingRoom, togglePendingState, togglePlayingRoom } from "../../store/roomReducer";
import { toggleRuleModal } from "../../store/globalReducer";
const WaitingRoom = ({ socket }) => {
    // const [started, setStarted] = useState(false)
    const dispatch = useDispatch()
    const { loginRoom, waitingRoom } = useSelector(state => state.roomReducer)
    // leaveRoom
    const leaveRoom = () => {
        socket.emit('leave', { username: loginRoom.data.username, roomCode: loginRoom.data.roomCode, leaveFrom: 'waitingRoom' })
        socket.on('leaveStatus', (data) => {
            if (data === 'leaved successfully') {
                dispatch(setWaitingRoom({ status: false }))
            }
        })
    }
    const startGame = () => {
        dispatch(togglePendingState(true))
        socket.emit('start', { count: waitingRoom.users.length, roomCode: waitingRoom.roomCode, users: waitingRoom.users })
    }

    const openRule = () => {
        dispatch(toggleRuleModal())
    }
    return (
        <CardBody
            style={{ paddingTop: '0px' }}>
            <CardTitle tag="h3" className='pb-3 text-center'>
                Room {waitingRoom.roomCode}
            </CardTitle>
            <CardText>
                <ul style={{ listStyle: 'none' }}>
                    {waitingRoom.users.length === 0
                        ? <></>
                        : waitingRoom.users.map((username, index) => (
                            <li key={index}>
                                <MdOutlineAccountCircle />
                                <span className="mx-2" style={{ color: loginRoom.data.username === username ? 'green' : 'dark' }}>{username}</span>
                            </li>
                        ))
                    }
                </ul>
            </CardText>
            <CardText>
                {loginRoom.data.username !== waitingRoom.host
                    ? <div>
                        <p>
                            Please wait for host to start the game
                        </p>
                        <div className='d-flex justify-content-center flex-wrap'>
                            <Button size='lg' className='mx-2' color='secondary' onClick={leaveRoom}>
                                Back
                            </Button>
                            <Button size='lg' className='mx-2' color='primary' onClick={openRule}>
                                Rules
                            </Button>
                        </div>
                    </div>
                    : <div className='d-flex justify-content-center flex-wrap'>
                        <Button size='lg' className='mx-2' color='secondary' onClick={leaveRoom}>
                            Back
                        </Button>
                        <Button size='lg' className='mx-2' color='primary' onClick={openRule}>
                            Rules
                        </Button>
                        <Button
                            size='lg' className='mx-2' color='success'
                            onClick={startGame}
                            disabled={waitingRoom.users.length === 1}
                        >
                            Play now
                        </Button>
                    </div>
                }
            </CardText>
        </CardBody>

    )
}
export default WaitingRoom