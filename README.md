# Simple Password Protected App with Persistent Auth using SvelteKit

This repo is a companion to a blog post I created explaining how to create a Simple Password Protected App with Persistent Auth using SvelteKit. [`View the post & tutorial here.`](https://jovianmoon.io/blog/sveltekit-password-protected-project)

## Run Locally

Clone this repo or fork it. [`Learn how here`](https://dev.to/ceceliacreates/how-to-clone-a-github-repository-59hg)

You will need to setup a .env for the password / security hash or you will need to alter the code. The two variables you need to define are

```
VITE_PASSWORD="pass1234"
VITE_SECURITY_HASH="1234567890"
```

You can change these variables to any value. 

### Install the dependencies
```bash
# enter the project directory
npm install

# start the project
npm run dev
```



> Note: the project is set to open on port 4444, to try to avoid cookie conflicts with other SvelteKit projects

## Questions or Comments

I would love to hear any feed back or answer any questions on my [`blog post.`](https://jovianmoon.io/blog/sveltekit-password-protected-project);
