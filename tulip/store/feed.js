import { csrfFetch } from "./csrfFetch"
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

// ACTIONS

const FEED = "quote/FEED"

// ACTION CREATORS

const loadFeed = (payload) => {
    return (
        {
            type: FEED,
            payload
        }
    )
}

// THUNKS

export const thunkLoadFeed = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/quotes/feed`)
        if (response.ok) {
            const feed = await response.json()
            dispatch(loadFeed(feed))
        }
    }
    catch (e) {
        console.log(e)
    }
}

// SELECTORS

// REDUCER

export const feedReducer = (state = {}, action) => {
    let feedState = { ...state }
    switch (action.type) {
        case FEED: {
            feedState = action.payload
            return feedState
        }
        default: {
            return feedState
        }
    }
}
