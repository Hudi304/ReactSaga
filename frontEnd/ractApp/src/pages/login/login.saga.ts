/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios from 'axios'
import { take, call, put, takeEvery } from 'redux-saga/effects'
import { URL } from './login.types'
import { LoginData } from './login.types'
import history from '../../history'

function loginRequest(loginCredentials: LoginData) {
    // console.log(loginCredentials)
    const loginResponse = axios
        .post(`${URL}/login`, loginCredentials)
        .then(res => {
            if (res.statusText == 'Logged in') {
                alert('Successful Login')
            }
            return res
        })
        .catch(err => {
            alert(err.response.statusText)
            //? trigger login error
        })
    return loginResponse
}

export function* login(loginCredentials: any): any {
    // console.log('CREDENTIALS', loginCredentials)
    const loginResponse = yield call(loginRequest, loginCredentials.payload.account)
    // console.log('LOGIN RESPONSE', loginResponse)
    const userDetails = loginResponse.data.userDetails
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
    if (loginResponse.status == 200) {
        yield put({
            type: 'LOGIN_SUCCESS',
            payload: userDetails
        })
        history.push('/account')
    }
}

export default function* loginSaga(): any {
    yield takeEvery('LOGIN', login) //? pot sa fac call-ul de cate ori vreau
    //   yield all([sagaGenerators()]); //? pot sa fac un singur call
    //? OK cauta ce si de ce
}
