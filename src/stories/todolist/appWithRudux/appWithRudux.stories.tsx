import App from "../../../app/ui/App";
import {BrowserRouterDecorator, reduxStoreProviderDecorator} from "../../decorators/reduxStoreProviderDecorator";


export default {
    title: 'App',
    component: App,
    decorators: [reduxStoreProviderDecorator,BrowserRouterDecorator],
}

export const AppExample = (props: any)=> {
    return (<App />)
}
