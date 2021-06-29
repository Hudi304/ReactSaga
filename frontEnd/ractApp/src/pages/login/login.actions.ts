import { LoginData } from './login.types'
import { UserDetails } from '../../common-components/utils'

export const loginRequest = (user: LoginData, history: History) => {
    return {
        type: 'LOGIN',
        payload: { account: user, history: history }
    }
}

export const loginSuccessful = (userDetails: UserDetails) => {
    console.log('LOGIN SUCC')
    return {
        type: 'LOGIN_SUCCESS',
        payload: userDetails
    }
}

export const loginFailed = () => {
    return {
        type: 'LOGIN_FAILED',
        payload: ' Failed '
    }
}
