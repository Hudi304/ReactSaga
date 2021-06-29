/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { User } from './login.types'
import { UserDetails, userDetailsInit } from '../../common-components/utils'

interface Action {
    type: string
    payload: any
}

const defaultState = {
    isLogged: false,
    account: {
        email: '',
        password: ''
    },
    userDetails: userDetailsInit
}

export const LoginReducer = (state = defaultState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, account: action.payload }
        case 'LOGIN_SUCCESSFUL':
            return { ...state, isLogged: true, userDetails: action.payload }
        case 'LOGIN_FAILED':
            return { ...state, isLogged: true }
        case 'LOGOUT':
            return { ...state, isLogged: false }
        default:
            return state
    }
}
