import { Button, CardBody, CardText, CardTitle, Input } from 'reactstrap'
import 'animate.css'
import { useDispatch, useSelector } from 'react-redux'
import { setInvalidData, setRoomCode, setUsername, setWaitingRoom } from '../../store/roomReducer'
import { toggleRuleModal } from '../../store/globalReducer'

const LoginRoom = ({ socket }) => {
    const dispatch = useDispatch()
    const { loginRoom } = useSelector(state => state.roomReducer)
    const invalidData = loginRoom.invalidData
    const joinRoom = () => {
        console.log('socket: ', socket)
        if (loginRoom.data.username === '') {
            dispatch(setInvalidData({ flag: 'username', warning: 'Please fill your name' }))
        }
        if (loginRoom.data.roomCode === '') {
            dispatch(setInvalidData({ flag: 'roomCode', warning: 'Please fill room code' }))
        }
        // Send a message to the server to join the room
        if (loginRoom.data.username !== '' && loginRoom.data.roomCode !== '') {
            socket.emit('join', { username: loginRoom.data.username, roomCode: loginRoom.data.roomCode });
            socket.on('joinStatus', data => {
                if (data === 'username is exist') {
                    dispatch(setInvalidData({ flag: 'username', warning: 'Username is exist' }))
                } else {
                    socket.on('joined', (data) => {
                        console.log(`${data.username} joined room ${data.roomCode}`);
                        console.log(data)
                        dispatch(setWaitingRoom({
                            status: true,
                            host: data.rooms.host,
                            users: data.rooms.users,
                            roomCode: data.roomCode
                        }))
                    });
                }
            })
        }
    };

    const openRule = () => {
        dispatch(toggleRuleModal())
    }
    return (
        <CardBody style={{ paddingTop: '0px' }}>
            <CardTitle tag="h3" className='pb-3'>
                Welcome to UNO Game!
            </CardTitle>
            <CardText>
                <Input placeholder='your name...' onChange={(e) => dispatch(setUsername(e.target.value))} invalid={invalidData.username} />
                <small className='text-danger' style={{ display: invalidData.username ? 'block' : 'none' }}>{invalidData.warning}</small>
            </CardText>
            <CardText>
                <Input placeholder='room code...' onChange={(e) => dispatch(setRoomCode(e.target.value))} invalid={invalidData.roomCode} />
                <small className='text-danger' style={{ display: invalidData.roomCode ? 'block' : 'none' }}>{invalidData.warning}</small>
            </CardText>
            <CardText className='d-flex justify-content-center flex-wrap pt-3'>
                <Button size='lg' className='mx-2' color='primary' onClick={openRule}>
                    Rules
                </Button>
                <Button size='lg' className='mx-2' color='success' onClick={joinRoom}>
                    Next
                </Button>
            </CardText>
        </CardBody>
    )

}
export default LoginRoom