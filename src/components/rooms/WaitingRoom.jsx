import { CardBody, CardTitle, CardText, Button } from "reactstrap"
import { MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
const WaitingRoom = ({ waitingRoom, host, leaveRoom, socket }) => {
    const [started, setStarted] = useState(false)

    useEffect(() => {
        socket.on('started', () => {

        })
        return () => {
            // Clean up the Socket.IO connection on unmount
            socket.disconnect();
        };
    }, [])
    const startGame = () => {
        socket.emit('start', { count: waitingRoom.users.length, users: waitingRoom.users })
        // socket.on('started', () => setStarted(true))
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
                        : waitingRoom.users.map((user, index) => (
                            <li key={index}>
                                <MdOutlineAccountCircle />
                                <span className="mx-2" style={{ color: host === user ? 'green' : 'dark' }}>{user}</span>
                            </li>
                        ))
                    }
                </ul>
            </CardText>
            <CardText>
                {host !== waitingRoom.host
                    ? <div className='d-flex justify-content-center flex-column'>
                        <p>
                            Please wait for host to start the game
                        </p>
                        <Button size='lg' className='mx-2' color='secondary' onClick={leaveRoom}>
                            Back
                        </Button>
                    </div>
                    : <div className='d-flex justify-content-center flex-wrap'>
                        <Button size='lg' className='mx-2' color='secondary' onClick={leaveRoom}>
                            Back
                        </Button>
                        <Button size='lg' className='mx-2' color='success' onClick={startGame}>
                            Play now
                        </Button>
                    </div>
                }
            </CardText>
        </CardBody>

    )
}
export default WaitingRoom