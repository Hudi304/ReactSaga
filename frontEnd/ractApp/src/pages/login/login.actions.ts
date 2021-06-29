import { LoginData } from "./login.types"
import { UserDetails } from "../../common-components/utils"

export const loginRequest = (user:LoginData, history:History) =>{
    return{
        type:"LOGIN",
        payload:{account: user,
                history: history}
    }
}

export const loginSuccessful = ( userDetails : UserDetails) =>{
    return{
        type:"LOGIN_SUCCESSFUL",
        payload : userDetails
    }
}

export const loginFailed = () =>{
    return{
        type:"LOGIN_FAILED",
        payload: " Failed "
    }
}


  
