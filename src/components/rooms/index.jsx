import io from 'socket.io-client';
import styles from '../../styles/rooms.module.css'
import logo from '../../img/logo.png'
import { Card } from 'reactstrap'
import { useEffect, useLayoutEffect, useState } from 'react'
import 'animate.css'
import LoginRoom from './LoginRoom';
import WaitingRoom from './WaitingRoom';
import PlayingRoom from './PlayingRoom';

const Rooms = () => {
    const socket = io('http://localhost:8000');
    // set Username & roomcode
    const [data, setData] = useState({
        username: '',
        roomCode: ''
    })
    const [invalidData, setInvalidData] = useState({
        username: false,
        roomCode: false,
        warning: ''
    })

    const [renderLogo, setRenderLogo] = useState(true)
    const [waitingRoom, setWaitingRoom] = useState({
        status: false,
        host: '',
        users: [],
        roomCode: ''
    })

    const setUsername = (e) => {
        setData(prev => {
            return {
                ...prev,
                username: e.target.value
            }
        })
        setInvalidData(prev => {
            return {
                ...prev,
                username: false
            }
        })
    }
    const setRoomCode = (e) => {
        setData(prev => {
            return {
                ...prev,
                roomCode: e.target.value
            }
        })
        setInvalidData(prev => {
            return {
                ...prev,
                roomCode: false
            }
        })
    }
    // send Request to join room
    const joinRoom = () => {
        if (data.username === '') {
            setInvalidData(prev => {
                return {
                    ...prev,
                    username: true,
                    warning: 'please fill your name'
                }
            })
        }
        if (data.roomCode === '') {
            setInvalidData(prev => {
                return {
                    ...prev,
                    roomCode: true,
                    warning: 'please fill room code'
                }
            })
        }
        // Send a message to the server to join the room
        if (data.username !== '' && data.roomCode !== '') {
            socket.emit('join', { username: data.username, roomCode: data.roomCode });
            socket.on('joinStatus', data => {
                if (data === 'username is exist') {
                    setInvalidData(prev => {
                        return {
                            ...prev,
                            username: true,
                            warning: data
                        }
                    })
                } else {
                    socket.on('joined', (data) => {
                        console.log(`${data.username} joined room ${data.roomCode}`);
                        console.log(data)
                        setWaitingRoom(prev => {
                            return {
                                status: true,
                                host: data.rooms.host,
                                users: data.rooms.users,
                                roomCode: data.roomCode
                            }
                        })
                    });
                }
            })
        }
    };
    // leaveRoom
    const leaveRoom = () => {
        socket.emit('leave', { username: data.username, roomCode: data.roomCode })
        socket.on('leaveStatus', (data) => {
            if (data === 'leaved successfully') {
                setWaitingRoom(prev => {
                    return {
                        ...prev,
                        status: false
                    }
                })
            }
        })

        // socket.on('leaved', (data) => {
        //     console.log(`${data.username} leaved room ${data.roomCode}`);
        //     setWaitingRoom(prev => {
        //         return {
        //             host: data.rooms.host,
        //             users: data.rooms.users,
        //             roomCode: data.roomCode
        //         }
        //     })
        // })
    }
    useEffect(() => {
        socket.on('leaved', (data) => {
            console.log(`${data.username} leaved room ${data.roomCode}`);
            setWaitingRoom(prev => {
                return {
                    status: data?.rooms?.host !== undefined ? prev.status : false,
                    host: data?.rooms?.host,
                    users: data?.rooms?.users,
                    roomCode: data.roomCode
                }
            })
        })
    }, [socket])
    // startGame
    // useEffect(() => {
    //     if (started === true) {

    //     }
    // }, [started])

    // Animation
    useLayoutEffect(() => {
        const timeoutLogo = setTimeout(() => {
            setRenderLogo(false)
        }, 3000)
        return () =>
            clearTimeout(timeoutLogo)
    }, [])
    return (
        <div className={styles.login_container}>
            <div className={styles.login_wrapper}>
                <img src={logo} alt='logo'
                    style={{ display: renderLogo ? 'block' : 'none' }}
                    className={`${styles.login_logo} animate__animated animate__fadeOutUp animate__delay-2s animate__fast`}
                />
                <Card
                    style={{
                        display: renderLogo ? 'none' : 'flex'
                    }}
                    className={`${styles.login_card} animate__animated animate__zoomIn animate__fast`}
                >
                    <img
                        alt="Sample"
                        src={logo}
                        style={{ width: "50%", padding: '25px 0' }}
                    />
                    {
                        waitingRoom.status === false
                            ? <LoginRoom setUsername={setUsername} setRoomCode={setRoomCode} invalidData={invalidData} joinRoom={joinRoom} />
                            : <WaitingRoom waitingRoom={waitingRoom} host={data.username} leaveRoom={leaveRoom} socket={socket} />
                    }
                </Card>
                <PlayingRoom />
            </div>
        </div>
    )
}
export default Rooms