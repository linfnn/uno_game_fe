import { createSlice } from '@reduxjs/toolkit';

const initialRoomState = {
    loginRoom: {
        data: {
            username: '',
            roomCode: ''
        },
        invalidData: {
            username: false,
            roomCode: false,
            warning: ''
        }
    },
    waitingRoom: {
        status: false,
        host: '',
        users: [],
        roomCode: ''
    },
    playingRoom: {
        status: false
    },
    pending: false
}

const roomCreateSlice = createSlice({
    name: 'roomReducer',
    initialState: initialRoomState,
    reducers: {
        // handle login data
        setUsername: (state, action) => {
            state.loginRoom.data.username = action.payload
            state.loginRoom.invalidData.username = false
            state.loginRoom.invalidData.warning = ""
        },
        setRoomCode: (state, action) => {
            state.loginRoom.data.roomCode = action.payload
            state.loginRoom.invalidData.roomCode = false
            state.loginRoom.invalidData.warning = ""
        },
        setInvalidData: (state, action) => {
            if (action.payload.flag === 'username') {
                state.loginRoom.invalidData.username = true
            }
            if (action.payload.flag === 'roomCode') {
                state.loginRoom.invalidData.roomCode = true
            }
            state.loginRoom.invalidData.warning = action.payload.warning
        },

        // handle waiting room data
        setWaitingRoom: (state, action) => {
            state.waitingRoom.status = action.payload?.status === undefined ? state.waitingRoom.status : action.payload?.status
            state.waitingRoom.host = action.payload?.host === undefined ? state.waitingRoom.host : action.payload?.host
            state.waitingRoom.users = action.payload?.users === undefined ? state.waitingRoom.users : action.payload?.users
            state.waitingRoom.roomCode = action.payload?.roomCode === undefined ? state.waitingRoom.roomCode : action.payload?.roomCode
        },
        togglePlayingRoom: (state, action) => {
            state.playingRoom.status = action.payload.playingRoom
            state.waitingRoom.status = action.payload.waitingRoom
        },
        togglePendingState: (state, action) => {
            state.pending = action.payload
        }
    }
})

export const {
    // toggleDetailDialog,
    setUsername, setRoomCode, setInvalidData,
    setWaitingRoom,
    togglePlayingRoom,
    togglePendingState
} = roomCreateSlice.actions

export default roomCreateSlice.reducer;