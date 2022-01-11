import cookie from 'cookie'
const securityHash = import.meta.env.VITE_SECURITY_HASH

export function getSession(request) {                                      // this fires every time we get a request
    let session = {}                                                       // declare a blank object to manipulate
    let authCookie = cookie.parse(request.headers.cookie || '').auth       // check to see if the user has a cookie called auth
    
    if (authCookie == securityHash) {                                      // check authCookie against security hash
        session = { authenticated: true }                                  // set session object
    } else {
        session = { authenticated: false }                                 // set session object
    }

    return session                                                         // return session object
}
