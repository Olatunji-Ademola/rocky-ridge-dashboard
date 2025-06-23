# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---Mr Ara here--------------------------------------------------------------------------------------------------

## Start here

## initializing the project

Once you have successfully pulled/clone the project from github

run this command on the terminal (make sure you are on the project folder)

```bash
npm install
```

to install all the dev dependencies this project will be needing ( we will talk more about this in the next meet or you can do your own research)

## Build the Login page

Navigate to the "src/routes/+page.svelte" file (This is where you will write the Login Code)
you can make small components to use if you like (but this is optional)

## What i want

an input of type 'text',
an input of type 'email',
a dropdown menu of (student, staff, faculty),
a Login button,
all inside a form and it should be centered on the page
style any how you feel best but should adhere to the existing color palette of the rest of the website

## View your work

to run the App (run on the terminal)

```bash
npm run dev
```

and navigate to http://localhost:5173/ on your browser
to see the page as you build it and make changes

To quit the runing process
press Ctrl + c

remember even if you exit the browser the app is still running you have to either terminate using (Ctrl + c) or exit VS code

Once we are done and confident with your work this should be before 1PM tomorrow, push it to the gitHub for review

have any question hit the group
Good luck guys Adios
