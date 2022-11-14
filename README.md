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

### Database
visit mongo atlas
login/signup for a free account
create a cluster and add an administrative user credential
run node mongo.js <password> (password is passed as process.argv[2] through the command line)

NB: Do not forget to set the database url connection with `heroku config:set MONGODB_URI=mongodb+srv://fullstack:secretpasswordhere@cluster0-ostce.mongodb.net/note-app?retryWrites=true`when you build yours