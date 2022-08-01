import * as appAsyncActions from './bll/applicationActions'
import {slice} from './bll/application-reducer'

const appReducer = slice.reducer;
const appActions = {...appAsyncActions,...slice.actions}

export {appActions,appReducer
}