<script context="module">
    export async function load({ session }) {               // server-side code that runs before the route is rendered
        if (!session.authenticated) {                       // check if we're authenticated
            return {
                status: 302,                                // redirect status
                redirect: '/',                              // if the user doesn't have the auth cookie, send them back to the login page
            }
        }
        return {}                                           // blank object return keeps the route from 404ing
    }
</script>
<script>
    import { session } from "$app/stores"
    import { goto } from '$app/navigation'
    import '$lib/style.css'                                 // include some global styles
    
    const logout = async () => {
        const response = await fetch('/logout')             // handle logout on the server side to have access to cookies
        if (response.ok) {                                  // check if the logout is accepted
            $session = { authenicated: false }              // set session auth to false
            goto('/')                                       // redirect home after logout success
        } else {
            console.error('Error logging out.')             // this is just incase something happens on the backend.
        }
    }
</script>

    <header>
        <nav>
            <div>
                <a href="/dashboard">Dashboard</a>
                <a href="/dashboard/ipsum">Dummy Ipsum</a>
            </div>
            <span on:click={logout}>Logout</span>
        </nav>
    </header>
    <main>
        <slot />
    </main>

<style>
header {
    border-bottom: 1px solid #888;
    height: 60px;
}
nav, main {
    width: 900px;
    max-width: 90%;
    margin: 0 auto;
}
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}
nav a:first-of-type {
    margin-right: 2rem;
}
main {
    padding-top: 2rem;
}
a, span {
    text-decoration: none;
    color: black;
    font-weight: bold;
    cursor: pointer;
}
a:hover, span:hover {
    color: blue;
}
</style>