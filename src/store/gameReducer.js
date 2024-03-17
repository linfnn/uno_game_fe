import { createSlice } from '@reduxjs/toolkit';

const initialGameState = {
    userCards: {
        username: '',
        cards: [],
        imgs: []
    },
    otherUserCards: [],
    pileCards: {
        topCard: '',
        pile: []
    },
    turn: {
        user: '',
        suitCards: [],
        time: 15,
        passBtn: false
    },
    play: {
        roomCode: '',
        card: '',
        cardIndex: '',
        // index: 0,
        draw: false
    },
    wildColor: '',
    userIndex: 0,
    animation: {
        time: {
            display: 3,
            state: 2
        },
        display: false,
        state: '',
        type: {
            skip: false,
            reverse: false,
            draw: [false, 1],
            wild: [false, '#e67525']
        }
    },

}

const gameCreateSlice = createSlice({
    name: 'gameReducer',
    initialState: initialGameState,
    reducers: {
        setUserCards: (state, action) => {
            state.userCards.username = action.payload?.username
            state.userCards.cards = action.payload?.cards
            state.userCards.imgs = action.payload?.imgs
        },
        setOtherUserCards: (state, action) => {
            if (state.otherUserCards.length !== 0) {
                const isUserExist = state.otherUserCards.find(user => user?.username === action.payload.username)
                if (isUserExist) {
                    isUserExist.cards = action.payload.cards
                    isUserExist.imgs = action.payload.imgs
                } else {
                    state.otherUserCards.push(action.payload)
                }
            } else {
                state.otherUserCards.push(action.payload)
            }
        },
        setPileCards: (state, action) => {
            state.pileCards.topCard = action.payload.pileCard
            state.pileCards.pile = action.payload?.residualCards !== undefined ? action.payload?.residualCards : state.pileCards.pile
        },
        setTurn: (state, action) => {
            state.turn.user = action.payload.user
            state.turn.suitCards = action.payload.suitCards
            state.turn.time = 15
            state.turn.passBtn = false
            if (action.payload?.passBtn || action.payload.passBtn !== undefined) {
                state.turn.passBtn = true
            }
        },
        removeTurn: (state, action) => {
            state.turn.user = ''
            state.turn.suitCards = []
            state.turn.time = -1
        },
        countDown: (state, action) => {
            state.turn.time = state.turn.time - 1
        },
        setCurrentUserIndex: (state, action) => {
            state.userIndex = action.payload
        },
        setChosenCard: (state, action) => {
            if (action.payload?.card === 'wild' || action.payload?.card === 'drawFour') {
                state.chooseColorBtn = true
            } else {
                state.chooseColorBtn = false
            }
            state.play.card = action.payload?.card
            state.play.roomCode = action.payload?.roomCode
            // state.play.index = action.payload?.index
            state.play.cardIndex = action.payload?.cardIndex
        },
        setWildColor: (state, action) => {
            state.wildColor = action.payload
        },
        togglePlayAnimation: (state, action) => {
            const pileCard = action.payload?.pileCard
            const display = action.payload?.display
            state.animation.display = display
            state.animation.state = action.payload?.state || 'out'
            if (action.payload.flag === 'play') {
                state.animation.time.display = 3
                state.animation.time.state = 2
                console.log(pileCard)
                state.animation.type.wild[1] = '#e67525'
                if (pileCard === 'drawFour' || pileCard.includes('_draw')) {
                    state.animation.type.draw[0] = display
                    state.animation.type.draw[1] = action.payload?.draw || 1
                    if (pileCard === 'drawFour') {
                        if (state.wildColor === 'b') {
                            state.animation.type.wild[1] = 'blue'
                        }
                        if (state.wildColor === 'g') {
                            state.animation.type.wild[1] = 'green'
                        }
                        if (state.wildColor === 'y') {
                            state.animation.type.wild[1] = 'yellow'
                        }
                        if (state.wildColor === 'r') {
                            state.animation.type.wild[1] = 'red'
                        }
                    } else {
                        if (pileCard[0] === 'b') {
                            state.animation.type.wild[1] = 'blue'
                        }
                        if (pileCard[0] === 'g') {
                            state.animation.type.wild[1] = 'green'
                        }
                        if (pileCard[0] === 'y') {
                            state.animation.type.wild[1] = 'yellow'
                        }
                        if (pileCard[0] === 'r') {
                            state.animation.type.wild[1] = 'red'
                        }
                    }
                }
                if (pileCard === 'wild') {
                    state.animation.type.draw[0] = false
                    state.animation.type.wild[0] = display
                    state.animation.type.wild[1] = action.payload?.color || '#e67525'
                    if (action.payload?.color === 'b') {
                        state.animation.type.wild[1] = 'blue'
                    }
                    if (action.payload?.color === 'g') {
                        state.animation.type.wild[1] = 'green'
                    }
                    if (action.payload?.color === 'y') {
                        state.animation.type.wild[1] = 'yellow'
                    }
                    if (action.payload?.color === 'r') {
                        state.animation.type.wild[1] = 'red'
                    }
                }
                if (pileCard.includes('skip')) {
                    state.animation.type.skip = display
                }
                if (pileCard.includes('reverse')) {
                    state.animation.type.reverse = display
                }
            }
            if (action.payload.flag === 'draw') {
                console.log('draw flag')
                state.animation.time.display = 3
                state.animation.time.state = 2
                state.animation.type.draw[0] = display
                state.animation.type.draw[1] = action.payload?.draw || 1
            }
            if (action.payload.flag === 'removeAnimation') {
                console.log('remove flag')
                state.animation.display = false
                state.animation.type.draw[0] = false
                state.animation.type.draw[1] = 1
                state.animation.type.wild[0] = false
                state.animation.type.wild[1] = '#e67525'
                state.animation.type.skip = false
                state.animation.type.reverse = false
            }
        },
        changeStateAnimation: (state, action) => {
            state.animation.state = action.payload
        },
        setAnimationTime: (state, action) => {
            if (action.payload.flag === 'display') {
                state.animation.time.display = state.animation.time.display - 1
            }
            if (action.payload.flag === 'state') {
                state.animation.time.state = state.animation.time.state - 1
            }
        }
    }
})

export const {
    setUserCards,
    setOtherUserCards,
    setPileCards,
    setTurn, countDown, removeTurn,
    setCurrentUserIndex,
    setChosenCard,
    setWildColor,
    togglePlayAnimation,
    changeStateAnimation,
    setAnimationTime
} = gameCreateSlice.actions

export default gameCreateSlice.reducer;