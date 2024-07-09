import { csrfFetch } from "./csrfFetch";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const thunkLogin = (credentials) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        if (response.ok) {
            const userInfo = await response.json();
            dispatch(setUser(userInfo));
            return userInfo
        }
    }
    catch (e) {
        return e
    }
}

export const thunkRestoreUser = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/users`)
        if (response.ok) {
            const userInfo = await response.json();
            await dispatch(setUser(userInfo));
            return userInfo
        }
        else {
            throw response
        }
    }
    catch (e) {
        const error = await e.json()
        return error
    }
}

export const thunkCreateUser = (newUserInfo) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserInfo)
        })
        if (response.ok) {
            const userInfo = await response.json()
            dispatch(setUser(userInfo))
            return userInfo
        }
        else {
            throw response
        }
    }
    catch (e) {
        const error = await e.json()
        return error
    }
}

export const thunkLogout = () => async (dispatch) => {
    const response = await csrfFetch(`${URL}/api/session`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeUser())
    }
    else {
        throw response
    }
}

export const sessionReducer = (state = { user: null }, action) => {
    let sessionState = { ...state }
    switch (action.type) {
        case SET_USER: {
            sessionState.user = { ...action.payload.user }
            return sessionState
        }

        case REMOVE_USER: {
            sessionState.user = null
            return sessionState
        }

        default: return sessionState
    }

}
