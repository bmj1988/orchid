import { csrfFetch } from "./csrfFetch";
import { createSelector } from "reselect";
import { loadQuotes } from "./quotes";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

/// ACTIONS

const WALLS = 'WALLS/'
const WALL_DETAILS = 'WALLS/DETAILS'
const EDIT_QUOTE = 'quotes/EDIT'
const QUOTE_DELETE = 'quote/DEL'

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

const deleteQuote = (payload) => {
    return (
        {
            type: QUOTE_DELETE,
            payload
        }
    )
}

//  if we normalize the quote data we will need this and it will be slightly more
// efficient. for show model this will work completely fine

// const editQuote = (payload) => {
//     return (
//         {
//             type: EDIT_QUOTE,
//             payload
//         }
//     )
// }

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
