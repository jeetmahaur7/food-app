import React from 'react'
import ReactDom from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './Components/App'
import Store from "./Redux/Store"

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <>
        <Provider store={Store}>
            <App />
        </Provider>
    </>
)