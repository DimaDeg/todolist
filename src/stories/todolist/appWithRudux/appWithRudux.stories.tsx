import App from "../../../app/App";
import {BrowserRouterDecorator, reduxStoreProviderDecorator} from "../../decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App',
    component: App,
    decorators: [reduxStoreProviderDecorator,BrowserRouterDecorator],
}

export const AppExample = (props: any)=> {
    return (<App demo={true} />)
}
