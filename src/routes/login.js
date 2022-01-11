import cookie from 'cookie'

// password is set in .env and will need to be set locally and on your server
const setPassword = import.meta.env.VITE_PASSWORD
const securityHash = import.meta.env.VITE_SECURITY_HASH
/**
 * @type {import('@sveltejs/kit').RequestHandler}
*/

export const post = async request => {
    // the security hash is just a string that is used in the below cookie that is verified on the server
    // on each request. We use a different string than the password because it is exposed on the client
    let tracking = cookie.serialize('auth', securityHash, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 * 1, // 1 week (adjust the last 1 for week)
    })

    let submittedPassword

    // get the password from the request in dev mode (windows)
    if (import.meta.env.DEV) {
        submittedPassword = request.body.password
    }

    // get the password from the request in (netlify)
    if (import.meta.env.PROD) {
        let req = JSON.parse(request.body)
        submittedPassword = req.password
    }

    try {
        // determine if the password is correct
        const password = submittedPassword === setPassword ? true : false

        // check for a correct password
        if (password) {
            return {
                status: 200,
                headers: {
                    'set-cookie': [tracking],
                },
                body: {
                    success: true,
                }
            }
        } else {
            return {
                status: 403,
                body: {
                    success: false,
                    message: 'The password you entered is not correct.',
                },
            }
        }
    } catch (error) {
        return {
            status: 500,
            body: {
                success: false,
                message: error,
            },
        }
    }
}