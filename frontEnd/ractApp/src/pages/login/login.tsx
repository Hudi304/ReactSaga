import './login.scss';
import '../../common-components/common.scss';
import Header from '../../common-components/components/header/header.component';
import LoginFooter from './components/login-footer.component/login-footer.component';
import { LoginLeft } from './components/login-left.component/login-left.component';
import LoginRight from './components/login-right/login-right.component';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginRequest } from './login.actions';
import { LoginData } from './login.types';
import { useHistory } from 'react-router-dom';


function Login(props: any): JSX.Element {
  const history = useHistory();

  const user : LoginData = {
    username: "Itachi",
    password : "1234"
  }

  return (
    <div className="grid-container debug">
      <div className="header-container">
        <Header></Header>
      </div>

      <LoginLeft ></LoginLeft>
      <LoginRight></LoginRight>
      <LoginFooter></LoginFooter>
 
      <button onClick={() => props.login(user,history)}>-</button>
    </div>
  )
}


const mapStateToProps = (state:any) => ({
  ...state
})

const mapDispatchToProps = (dispatch:any) => ({dispatch, ...bindActionCreators({ loginRequest }, dispatch)
})

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
// conecteaza pagina la store, deci avem access la store

