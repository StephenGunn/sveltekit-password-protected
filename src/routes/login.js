import cookie from 'cookie'

const setPassword  = import.meta.env.VITE_PASSWORD                          // password is set in .env and will need to be set locally and on your server
const setCookie    = import.meta.env.VITE_COOKIE_VALUE                      // cookie value is set in .env

/**
 * @type {import('@sveltejs/kit').RequestHandler}
*/
export const post = async ({ request }) => {
    const body = await request.json()                                       // process the request body
    const submittedPassword = body.password                                 // grab the submitted password out of the request body (this will break on Netlify)
    
    let tracking = cookie.serialize('auth', setCookie, {                    // build the auth cookie using the cookie package
        httpOnly: true,
        sameSite: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 1                                        // 1 week (seconds * minutes * hours * days * weeks)
    })
    
    try {
        const password = submittedPassword === setPassword                  // determine if the password is correct (boolean)
        
        if (password) {                                                     // check for a correct password
            return {
                status: 200,                                                // tell the front-end everything is OK
                headers: {
                    'set-cookie': [tracking]                                // send our tracking cookie to the user
                },
                body: {
                    message: 'Password has been accepted.'                  // a message that can be useful if you are testing your API with a 3rd party app
                }
            }
        } else {
            return {
                status: 403,                                                // tell the front-end that we're not authorized
                body: {
                    message: 'The password you entered is not correct.'     // shows on the front-end and can be manipulated in the backend if needed
                }
            }
        }
    } catch (error) {
        console.error(error)                                                // log the error in the server
        return {
            status: 500,                                                    // tell the front-end that the try block errored
            body: {
                message: error                                              // send the error to the front-end for bebugging
            }
        }
    }
}