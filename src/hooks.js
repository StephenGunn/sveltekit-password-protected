import { parse } from 'cookie'
import bcrypt from 'bcrypt'

const password  = import.meta.env.VITE_PASSWORD                                 // password is set in .env and will need to be set locally and on your server

const checkAuth = hash => bcrypt.compareSync(password, hash)                    // compares our password from .env to the hash in the auth cookie, returns true or false

export function getSession(event) {                                             // this fires every time we get a request
    
    let session = { authenticated: false }                                      // set a default session state of not authenticated
    let authCookie = parse(event.request.headers.get('cookie') || '').auth      // check to see if the user has a cookie called auth

    if (checkAuth(authCookie)) {                                                // check authCookie against security hash
        session = { authenticated: true }                                       // set session object
    }
    return session                                                              // return session object
}