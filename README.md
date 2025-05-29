# **CourseSeeker**
## 📚 Course Management Platform
## How to run
To build and run the web application server you need node.
Here are the steps:
```bash
#Move into src directory
cd src/
#Install dependencies (node packages) (e.g. nextjs, sqlite, bootstrap)
npm install
#Build nextjs javascript/html/css high level code into nodejs javascript (server) and html/css/javascript (client)
npm run build
#Run the nodejs server (result of build)
npm start
```
Then connect to the url printed on stdout using a browser.

## Technologies
The technologies we use are:

### Nextjs (Frontend and Backend)
Nextjs is a fullstack framework which handles both backend (implemented in Node) and frontend (implemented in browser with React library).
The app folder describes the webapp routes (each folder is a portion of the url path) (i.e. the folder app/test/about corresponds to url path /test/about).
(NOTE: folders like (app) and (auth) are used to group routes and not included in url path)
(NOTE: folders like \[id\] are variables path names with value accessable in the corresponding path components)
Each folder can contain files like:
1. page.js file contains the page component made of the html/css template (VIEW) and javascript code run on the SERVER when the page
is requested (CONTROLLER) which can query the database (MODEL).
2. route.js where api endpoints can be implemented specifying a function for the http verbs to implement (i.e. GET, POST, PUT, DELETE)
If a component has 'use client' directive at the beginning of the file it is a client component and its javascript is run on the CLIENT (so in this case 
the server environment is not available, like db, but still can be made http api requests).
We have server side rendering enabled so both server and client components are rendered on server and sent as HTML/CSS to the client ready to display (just
client components will then be hydrated with their javascript to become interactive).
The components folder simply contains files declaring components (server components or client components).

### Sqlite (Database)
Sqlite is a library which can handle a database stored in a local file (in our case sqlite.db) without needing to install a separate DBMS.


## Demo data
The database has beed populated with test demo data.
