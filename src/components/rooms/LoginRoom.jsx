import { Button, CardBody, CardText, CardTitle, Input } from 'reactstrap'
import 'animate.css'

const LoginRoom = ({ setUsername, setRoomCode, invalidData, joinRoom }) => {
    return (
        <CardBody style={{ paddingTop: '0px' }}>
            <CardTitle tag="h3" className='pb-3'>
                Welcome to UNO Game!
            </CardTitle>
            <CardText>
                <Input placeholder='your name...' onChange={setUsername} invalid={invalidData.username} />
                <small className='text-danger' style={{ display: invalidData.username ? 'block' : 'none' }}>{invalidData.warning}</small>
            </CardText>
            <CardText>
                <Input placeholder='room code...' onChange={setRoomCode} invalid={invalidData.roomCode} />
                <small className='text-danger' style={{ display: invalidData.roomCode ? 'block' : 'none' }}>{invalidData.warning}</small>
            </CardText>
            <CardText className='d-flex justify-content-center flex-wrap pt-3'>
                <Button size='lg' className='mx-2' color='primary'>
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