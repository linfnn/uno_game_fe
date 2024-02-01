import { createSlice } from '@reduxjs/toolkit';

const initialGlobalState = {
    ruleModal: false,
    winModal: {
        state: false,
        user: ''
    }
}

const globalCreateSlice = createSlice({
    name: 'globalReducer',
    initialState: initialGlobalState,
    reducers: {
        toggleRuleModal: (state, action) => {
            state.ruleModal = !state.ruleModal
        },
        toggleWinModal: (state, action) => {
            state.winModal.state = action.payload.state
            state.winModal.user = action.payload.user
        }
    }
})

export const {
    toggleRuleModal,
    toggleWinModal
} = globalCreateSlice.actions

export default globalCreateSlice.reducer;