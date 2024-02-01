import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWinModal } from '../../store/globalReducer';
import { setWaitingRoom, togglePlayingRoom } from '../../store/roomReducer';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function WinModal({ socket }) {
    const { winModal } = useSelector(state => state.globalReducer)
    const { loginRoom, waitingRoom } = useSelector(state => state.roomReducer)
    const dispatch = useDispatch()

    const backHome = () => {
        socket.emit('leave', { username: loginRoom.data.username, roomCode: loginRoom.data.roomCode, leaveFrom: 'playingRoom' })
        dispatch(toggleWinModal({ state: false, user: '' }))
        window.location.reload()
    }

    const playAgain = () => {
        socket.emit('playAgain', { username: loginRoom.data.username, roomCode: loginRoom.data.roomCode });
        socket.on('playedAgain', (data) => {
            console.log(data)
            // if (data.message === 'Host played again. Can start game now') {
            dispatch(setWaitingRoom({
                status: true,
                host: data.rooms.host,
                users: data.rooms.users,
                roomCode: data.roomCode
            }))
            dispatch(togglePlayingRoom({ playingRoom: false, waitingRoom: true }))
            // } else if (data.message === 'Please wait for host or more players to start the game') {
            //     dispatch(setWaitingRoom({
            //         status: true,
            //         host: data.rooms.host,
            //         users: data.rooms.users,
            //         roomCode: data.roomCode
            //     }))
            // }
            dispatch(toggleWinModal({ state: false, user: '' }))
        });
    }

    return (
        <Dialog
            open={winModal.state}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className='text-center'>
                <h3><b>{winModal.user === loginRoom.data.username ? 'Congratulations!' : 'Game over!'}</b></h3>
            </DialogTitle>
            <DialogContent style={{ paddingTop: 5 }}>
                <DialogContentText id="alert-dialog-slide-description" className='text-center'>
                    {winModal.user} has won the game!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={playAgain}>Play again!</Button> */}
                <Button onClick={backHome}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}
