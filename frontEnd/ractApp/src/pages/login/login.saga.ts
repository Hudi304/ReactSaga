/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios from 'axios'
import { take, call, put, takeEvery } from 'redux-saga/effects'
import * as action from './login.actions'
import { URL } from './login.types'
import { LoginData } from './login.types'

// import * as Eff from 'redux-saga/effects'

// const takeEvery: any = Eff.takeEvery;      // <-- new
// const takeLatest: any = Eff.takeLatest;

export function loginFC(payload: any): void {
    const { account, history } = payload
    axios
        .post(`${URL}/login`, account)
        .then(res => {
            console.log('Login response :', res.data.userDetails)
            if (res.statusText == 'Logged in') {
                //! TODO pune datele
                //? trigger Loggin succ care are ca payload resposnse-ul

                // sessionStorage.setItem("userDetails",res.data.userDetails )
                history.push('./account')
                alert('Successful Login')
            }
        })
        .catch(err => {
            alert(err.response.statusText)
            //? trigger login error
        })
}

function loginRequest(loginCredentials: LoginData) {
    console.log(loginCredentials)
    const loginResponse = axios
        .post(`${URL}/login`, loginCredentials)
        .then(res => {
            console.log('Login response :', res.data.userDetails)
            if (res.statusText == 'Logged in') {
                //! TODO pune datele
                //? trigger Loggin succ care are ca payload resposnse-ul

                // sessionStorage.setItem("userDetails",res.data.userDetails )
                // history.push('./account')
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
    console.log('CREDENTIALS', loginCredentials)
    const loginResponse = yield call(loginRequest, loginCredentials.payload.account)
    console.log('LOGIN RESPONSE', loginResponse)

    if (loginResponse.statusText == 'Logged in') {
        yield put({
            type: 'LOGIN_SUCCESS',
            payload: loginResponse.data.userDetails
        })
    }
}

export default function* loginSaga(): any {
    yield takeEvery('LOGIN', login) //? pot sa fac call-ul de cate ori vreau
    //   yield all([sagaGenerators()]); //? pot sa fac un singur call
    //? OK cauta ce si de ce
}

// export function* sagaGenerators() {
//   const { payload } = yield take(action.loginRequest);
//   yield call(loginFC, payload)
// }

// function login(action: any) {
//   loginFC(action.payload)
// }
