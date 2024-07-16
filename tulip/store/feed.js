import { createSelector } from "reselect"
import { csrfFetch } from "./csrfFetch"
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

// ACTIONS

const FEED = "quote/FEED"
const COMMENT = "comment/ADD"

// ACTION CREATORS

const loadFeed = (payload) => {
    return (
        {
            type: FEED,
            payload
        }
    )
}

const addComment = (payload) => {
    return (
        {
            type: COMMENT,
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

export const thunkLeaveComment = (info) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/comments/${info.quoteId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info)
        })
        if (response.ok) {
            const comment = await response.json()
            dispatch(addComment(comment))
        }
    }
    catch (e) {
        console.error(e)
        const err = await e.json()
        console.log(err)
    }
}

// SELECTORS

export const feedArray = createSelector((state) => state.feed, quotes => {
    let normalizedData = Object.values(quotes)
    normalizedData = normalizedData.sort((a, b) => {
        return b.id - a.id
    })
    return normalizedData
})

// REDUCER

export const feedReducer = (state = {}, action) => {
    let feedState = { ...state }
    switch (action.type) {
        case FEED: {
            console.log("FEED FROM DB", action.payload)
            action.payload.forEach((quote) => {
                feedState[quote.id] = quote
            })
            return feedState
        }
        case COMMENT: {
            feedState[action.payload.quoteId].comments.push(action.payload)
            return feedState
        }
        default: {
            return feedState
        }
    }
}
