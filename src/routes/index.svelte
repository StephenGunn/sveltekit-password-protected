<script context="module">
    export async function load({session}) {                 // server-side code that runs before the route is rendered
        if (session.authenicated) {                         // check if we're authenticated
            return {
                status: 302,                                // redirect status
                redirect: '/dashboard',                     // redirect the user to the dashboard if they have the auth cookie
            }
        }
        return {}                                           // blank object return keeps the route from 404ing
    }
</script>
<script>
    import { session } from "$app/stores"                   // import the session store
    import { goto } from '$app/navigation'                  // impor the goto function for internal app navigation
    
    let password  = ''                                      // bound to the password input, starts blank
    let error     = false                                   // used to trigger error display if there is an error
    let loggingIn = false                                   // controls the button text
    let res                                                 // helper var to get some data out of the try block / login function

    const login = async () => {
        loggingIn = true                                    // changes the button text to "Logging In..."
        try {
            const response = await fetch('/login', {        // send our password to our login endpoint.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password,                               // use the password as the request body
                }),
            })
            const data = await response.json()              // parse the response into a usable object
            res = data                                      // helper var to break the response data out of the function scope
            if (response.ok) {                              // check for a successful return
                error = false                               // removes the error state if it were previously activated
                $session = { authenticated: true}           // set authentication in the session store
                goto('/dashboard')                          // tells the app to load the '/dashboard' route
            } else {
                error = true
                loggingIn = false                           // reset the button state
            }
        } catch (error) {
            console.error(error)                            // log the error if there is one
            error = true                                    // display the error box on the ui
            loggingIn = false                               // reset the button state
        }
    }
</script>

    <svelte:head>
        <title>Login</title>
    </svelte:head>
    <main>
        <div id="login">
            <form on:submit|preventDefault={login}>
                <h1>
                    Password Protected Demo
                </h1>
                <input type="text" placeholder="Enter Password" bind:value={password} class:error />
                <button>
                    {#if loggingIn}
                        Logging In...
                    {:else}
                        Enter
                    {/if}
                </button>
                <div>
                    Password is: <em>pass1234</em>
                </div>
                {#if error}
                    <div class="errorMessage">
                        {res.message}
                    </div>
                {/if}
            </form>
        </div>
    </main>

<style>
main {
    display: grid;
    place-content: center;
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
}
#login {
    padding: 2rem;
    border: 1px solid #888;
    max-width: 90%;
    margin: 0 auto;
    background: white;
}
h1 {
    margin: 0;
}
input {
    border: 2px solid #666;
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
    font-family: 'Courier New', Courier, monospace;
}
input.error {
    border: 2px solid red;
}
button {
    margin: 1rem 0;
    padding: 1rem;
}
.errorMessage {
    color: red;
    border: 2px dashed #ccc;
    padding: .5rem;
    margin-top: 1rem;
}
</style>