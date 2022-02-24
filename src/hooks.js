import { parse } from 'cookie'
const setCookie = import.meta.env.VITE_COOKIE_VALUE

export function getSession(event) {                                             // this fires every time we get a request
    let session = { authenticated: false }                                      // set a default session state of not authenticated
    const authCookie = parse(event.request.headers.get('cookie') || '').auth    // check to see if the user has a cookie called auth

    if (!authCookie) return session                                             // return early if missing the auth cookie
    if (authCookie == setCookie) session.authenticated = true                   // check authCookie against security hash
    return session                                                              // return session object
}