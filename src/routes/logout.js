export async function get() {
    return {
        status: 302,
        headers: {
            location: '/',                                              // send the user back to the login on the index
            'set-cookie': `auth=; path=/; expires=0;`,                  // render the auth cookie moot
        },
    }
}
