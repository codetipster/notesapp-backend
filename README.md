### nodemone
npm install --save-dev nodemon

### Deployment
Create a Heroku account in https://devcenter.heroku.com/. Install the Heroku package using the command: npm install -g heroku. Create a Heroku application with the command heroku create, commit your code to the repository and move it to Heroku with the command git push heroku main.

## Running this application.(stage 1- without DB configuration)
- First clone this repository with `git clone (url)`down to your local machine.
- Open it in an editor of your choice (Prefferrably, vscode)
- From the command line Run `npm install` to install all dependencies.
- To run in your local machine: Run `npm run dev` to launch the application.

### N.B: The Json server is hosted on: https://lit-garden-32667.herokuapp.com/api/notes and can be accessed from any client with an HTTP request to the server. But with the production build file committed, the full production build is accessible at: https://lit-garden-32667.herokuapp.com 