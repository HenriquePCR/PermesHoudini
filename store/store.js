
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import user from './userSlice'
import isAuthenticatedFunc from './isAuthenticatedFuncSlice';
import isAuthenticatedClient from './isAutheticatedClientSlice'
import isAuthenticatedGerente from './isAuthenticatedGerenteSlice'
import logger from "redux-logger";

const combinedReducer = combineReducers({
    user,
    isAuthenticatedClient,
    isAuthenticatedFunc,
    isAuthenticatedGerente

});

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            user: {
                user: [...action.payload.user.user, ...state.user.user]
            },
            isAuthenticatedClient: {
                isAuthenticatedClient: [...action.payload.isAuthenticatedClient.isAuthenticatedClient, ...state.isAuthenticatedClient.isAuthenticatedClient]
            },
            isAuthenticatedFunc: {
                isAuthenticatedFunc: [...action.payload.isAuthenticatedFunc.isAuthenticatedFunc, ...state.isAuthenticatedFunc.isAuthenticatedFunc]
            },
            isAuthenticatedGerente: {
                isAuthenticatedGerente: [...action.payload.isAuthenticatedGerente.isAuthenticatedGerente, ...state.isAuthenticatedGerente.isAuthenticatedGerente]
            }

        }
        return nextState;
    } else {
        return combinedReducer(state, action)
    }
}

export const makeStore = () =>
    configureStore({
        reducer: masterReducer,
        middleware: [logger],
    });

export const wrapper = createWrapper(makeStore, { debug: true });