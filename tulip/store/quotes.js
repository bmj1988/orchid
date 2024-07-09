import { csrfFetch } from './csrfFetch'
import { createSelector } from "reselect";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

const ADD = 'add/Quote'
const DEL = 'del/Quote'
const EDIT = 'edit/Quote'
const LOAD = 'load/Quote'

export const loadQuotes = (payload) => {
    return (
        {
            type: LOAD,
            payload
        }
    )
}

const addQuote = (payload) => {
    return (
        {
            type: ADD,
            payload
        }
    )
}

const deleteQuote = (payload) => {
    return (
        {
            type: DEL,
            payload
        }
    )
}


export const thunkAddQuote = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/quotes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const quote = await response.json()
            dispatch(addQuote(quote))
        }
    }
    catch (e) {
        console.error(e)
        const err = await e.json()
        console.log(err)
    }

}

export const thunkEditQuote = (data) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/quotes/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const quote = await response.json();
            await dispatch(addQuote(quote))
        }
    }
    catch (e) {
        console.error(e)
        const err = await e.json()
        return err
    }
}

export const thunkDeleteQuote = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/quotes/${id}`, {
            method: "DELETE"
        })
        if (response.ok) {
            await dispatch(deleteQuote(id))
        }
    }
    catch (e) {
        console.log(e)
    }

}

export const quotesArray = createSelector((state) => state.quotes, (quotes) => {
    return Object.values(quotes)
})


export const quoteReducer = (state = {}, action) => {
    let quoteState = { ...state }
    switch (action.type) {
        case ADD: {
            quoteState[action.payload.id] = action.payload
            return quoteState
        }
        case LOAD: {
            quoteState = {}
            action.payload.forEach((quote) => {
                quoteState[quote.id] = quote
            })
            return quoteState
        }
        case DEL: {
            delete quoteState[action.payload]
            return quoteState
        }
        default: {
            return quoteState
        }
    }
}
