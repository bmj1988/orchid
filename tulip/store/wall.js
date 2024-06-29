import { csrfFetch } from "./csrfFetch";
import { createSelector } from "reselect";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

/// ACTIONS

const WALLS = 'WALLS/'
const WALL_DETAILS = 'WALLS/DETAILS'

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
            dispatch(wallDetails(wall))
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

export const thunkAddQuoteToWall = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/quotes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const wall = await response.json()
            dispatch(wallDetails(wall))
            console.log(wallDetails(wall))
        }
    }
    catch (e) {
        console.error(e)
        const err = await e.json()
        console.log(err)
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

        default: {
            return wallState;
        }
    }
}
