/* PRIVATE ROUTE - A route to ensure user pages aren't accessible without logging in */

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
const PrivateRoute = (props) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
    if (isLoggedIn) {
        return <Route {...props} />
    } else {
        return <Redirect to={{
            pathname: '/',
            state: { authorised: false }
        }} />
    }

}

export default PrivateRoute;