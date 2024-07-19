import { csrfFetch } from './csrfFetch'
import { createSelector } from "reselect";
const URL = process.env.EXPO_PUBLIC_LOCAL_TUNNEL

const LOAD = 'profile/LOAD'
const FOLLOW = 'profile/FOLLOW'
const UNFOLLOW = 'profile/UNFOLLOW'

const loadProfile = (payload) => {
    return (
        {
            type: LOAD,
            payload
        }
    )
}
const addFollower = (payload) => {
    return (
        { type: FOLLOW, payload }
    )
}

const removeFollower = (payload) => {
    return (
        { type: UNFOLLOW, payload }
    )
}


export const thunkLoadProfile = (userId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/users/${userId}`)
        if (response.ok) {
            const profile = await response.json();
            await dispatch(loadProfile(profile))
        }
    }

    catch (e) {
        const err = await e.json()
        console.log(err)
        return err
    }

}

export const thunkFollow = (userId, viewerId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/users/follow/${userId}`, {
            method: "POST",
        }
        )
        if (response.ok) {
            await dispatch(addFollower(viewerId))
        }
    }

    catch (e) {
        const err = await e.json()
        console.log(err)
        return err
    }
}

export const thunkUnfollow = (userId, viewerId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`${URL}/api/users/unfollow/${userId}`, {
            method: "DELETE",
        }
        )
        if (response.ok) {
            await dispatch(removeFollower(viewerId))
        }
    }

    catch (e) {
        const err = await e.json()
        console.log(err)
        return err
    }
}

export const followArray = createSelector((state) => state.profile.followers, (follows) => {
    return Object.values(follows)
})

export const profileReducer = (state = {}, action) => {
    let profileState = { ...state }
    switch (action.type) {
        case LOAD: {
            profileState = { ...action.payload }
            profileState["followers"] = {}
            action.payload.followers.forEach((follow) => {
                profileState["followers"][follow.followingId] = follow
            })
            return profileState
        }
        case FOLLOW: {
            profileState.followers[action.payload] = action.payload
            return profileState
        }
        case UNFOLLOW: {
            delete profileState.followers[action.payload]
            return profileState
        }
        default: {
            return profileState
        }
    }
}
