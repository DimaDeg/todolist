import {Login} from "./ui/Login";
import * as authAsyncActions from './bll/authActions';
import {slice} from './bll/auth-reducer'

const authActions = {
    ...authAsyncActions,
    ...slice.actions
}


export {Login,authActions}