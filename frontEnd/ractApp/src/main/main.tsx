
import { Redirect, Route, Switch} from 'react-router-dom'
import { UserProfilePage } from '../pages/account/account'
import { LoginPage } from '../pages/login/login'


export function MainPage() : JSX.Element  {
    return (
        <Switch>
            <Route exact path={"/login"} component={() => <LoginPage />} />
            <Route exact path="/account" component={UserProfilePage} />

            <Route exact path={"/"}>
                <Redirect to='/login'/>
            </Route>

        </Switch>

    )


}
