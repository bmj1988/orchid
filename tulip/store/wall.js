import { csrfFetch } from "./csrfFetch";
import { createSelector } from "reselect";
import { loadQuotes } from "./quotes";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

/// ACTIONS

const WALLS = 'WALLS/'
const WALL_DETAILS = 'WALLS/DETAILS'
const DEL_WALL = "WALLS/DELETE"

/// ACTION CREATORS

const getAllWalls = (payload) => {

    return ({
        type: WALLS,
        payload
    })

}

const wallDetails = (payload) => {
    return (
        {
            type: WALL_DETAILS,
            payload
        }
    )
}

const deleteWall = (payload) => {
    return (
        {
            type: DEL_WALL,
            payload
        }
    )
}


/// THUNKS

export const getUserWalls = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/walls`)
        if (response.ok) {
            const result = await response.json()
            dispatch(getAllWalls(result))
            return result
        }
    }
    catch (e) {
        return e
    }
}

export const thunkWallById = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/walls/${id}`)
        if (response.ok) {
            const wall = await response.json()
            await dispatch(wallDetails(wall))
            await dispatch(loadQuotes(wall.quotes))
        }
    }
    catch (e) {
        console.log(e)
    }
}


export const thunkCreateWall = (wallData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/walls/new`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(wallData)
        })
        if (response.ok) {
            const wall = await response.json()
            dispatch(wallDetails(wall))
        }
        else {
            throw new Error('Wall creation falled.')
        }
    }
    catch (e) {
        console.error(e)
    }
}

export const thunkDeleteWall = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/walls/${id}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            // await dispatch(deleteWall(id))
            return
        }
    }
    catch (e) {
        console.log(e)
        const err = await e.json()
        return err
    }
}

export const thunkEditWall = (info) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/walls/${info.wallId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        if (response.ok) {
            const wall = await response.json()
            await dispatch(wallDetails(wall))
            return true
        }
    }
    catch (e) {
        console.error(e)
        return false
    }
}

/// SELECTORS

export const wallsArray = createSelector((state) => state.walls, (walls) => {
    return Object.values(walls)
})

/// REDUCER

export const wallReducer = (state = {}, action) => {
    let wallState = { ...state }
    switch (action.type) {
        case WALLS: {
            wallState = {};
            action.payload.forEach((wall) => {
                wallState[wall.id] = wall
            })
            return wallState
        }
        case WALL_DETAILS: {
            wallState[action.payload.id] = action.payload
            return wallState;
        }
        case DEL_WALL: {
            delete wallState[action.payload]
            return wallState
        }
        default: {
            return wallState;
        }
    }
}
