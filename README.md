# SafeChat

App for private messaging

#### Video Demo:  !!!<URL HERE>


## How to Start
1. Back-end: \
`git clone https://github.com/AndreyRyab/messenger-api` \
`cd messenger-api` \
`npm i` \
`npm run dev`
2. Front-end: \
`git clone https://github.com/AndreyRyab/messenger-client` \
`cd messenger-client` \
`npm i` \
`npm run dev` 

## Technological Stack
* **Vue.js**: a JavaScript framework for building user interfaces
* **TypeScript**: a superset of JavaScript that adds static types
* **Node.js**: a JavaScript runtime for server-side programming
* **Express**: a web application framework for Node.js
* **Socket.io**: a library for real-time web applications
* **Mongo.db**: a NoSQL database

## Architecture
The architecture of SafeChat is really straightforward. We have two main processes: authorization with JSON Web Tokens and socket-based real-time chat for authorized users. Notice we don’t have a database for messages.
![Architecture of the project.](/presentation.jpg)

## Implementation details
* The frontend (client side) is a single-page application (SPA) with a component-based architecture.
* Eight components (‘/components’) are used in pages (‘/views’ folder).
* Pages are rendered as the user navigates around the application. The page doesn't need to be reloaded from the server because we utilize [Vue Router](https://router.vuejs.org/) (configured in ‘/router/index.ts’).
* Some components are reusable, such as ButtonBlock, ModalBlock, and MessageItem. To pass specific parameters into them, we use props, which are treated as fallthrough attributes. Every time the parent component is updated, the child component will be refreshed and re-rendered — this is how Vue.js’ reactivity system works.
* For getting users’ data, we utilize the AuthForm component. It collects input values and passes them to the application store. This is the only entry point for essential data which we send and get from the backend. The store (located in the ‘/stores’ folder) is implemented with [Pinia](https://pinia.vuejs.org/) (the official store library for Vue.js) and consists of two stores: ‘user’ and ‘message’. In the ‘helpers.ts’ file, we keep error-handling functions.
* For fetching data, we use the [Axios](https://axios-http.com/) library, which is utilized in the api() function (in ‘/helpers/api’). This construction is reused in methods implemented in the stores and called in components.

## Authorization and authentication
* SafeChat functionality is available for authorized users only. During signup, we send a POST request with the username (which must have an email format) and password.
* On the [backend](https://github.com/AndreyRyab/messenger-api), we have a createUser method where the username is validated. If the username is not valid, we send an error and don’t allow the process to go further. If the validation passes, a salt for the bcrypt.hash is generated; the ‘bcrypt’ library is utilized for hashing the user's password. We don’t store passwords in the database.
* For connection and interaction with [MongoDB](https://www.mongodb.com/), we utilize the [Mongoose](https://mongoosejs.com/) library. It provides the mongoose.connect() method, which allows us to establish a connection (found in ‘/utils/db.js’ on the backend). We use it in the Schema object, which is handy for defining the model structure of the document to store (in ‘/models/user.js’ on the backend). The User model is used in ‘controllers/users.js’ for operations on the documents when receiving and sending data from and to the client-side.
* When a user is signed up, the backend sets a ‘jwt’ cookie with a [JSON Web Token](https://jwt.io/) and sends it. Upon receiving the cookie, the browser saves it for 7 days, so that the user doesn’t need to log in with every session. If a cookie is expired or absent, the backend won’t return user data (this feature is implemented in ‘/routes/index.js’ where the router for the backend is set). On the client-side, the user will be redirected to the login page.

## Real-time Messaging
The main SafeChat feature is built on [Socket.io](https://socket.io/), a widely adopted open-source library used in commercial productions. \
To establish a socket connection, we need to integrate Socket.io with both the backend server and the client. \
In the ‘app.js’ file on the backend, a new instance of Socket.io is initialized with httpServer and parameters. After that, we can utilize methods that allow us to check if a user is authorized, send and receive messages, and broadcast messages (i.e., push a message to all users excluding the author). \
On the client side, we also need to initialize an instance for the Socket.io connection. It takes just a couple of lines of code in the ‘socket.ts’ file. \
When all users leave the connection, the socket closes and all message data disappears. However, we temporarily store messages in an object on the server side while the socket is active, just in case some users lose connection and want to rejoin the conversation.

## Next steps
SafeChat could be a notable starting point for a more advanced and feature-rich application. Future features might include:
1. Fully private messaging in a ‘room’ that is accessible only to authorized users.
2. The ability to send emojis and files.
3. A personalized contact list for each user.

