import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import roomReducer from './roomReducer';
import gameReducer from './gameReducer';
import globalReducer from './globalReducer';
const store = configureStore({
    reducer: {
        roomReducer,
        gameReducer,
        globalReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

setupListeners(store.dispatch);

export default store;