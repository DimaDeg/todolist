import * as appActions from './bll/applicationActions'
import {slice} from './bll/application-reducer'

const appReducer = slice.reducer;

export {appReducer,appActions}
