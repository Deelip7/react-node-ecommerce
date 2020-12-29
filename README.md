# 🛍️ MERN E-commerce Store 
An ecommerce store built with MERN stack and Paypal payments API.

![Homepage screenshot](https://www.theelipan.com/images/rn-mockup.svg)

## Features
* Login/register 
* Place order
* Search for product
* Add/remove products to cart
* Admin panel (CRUD operations)
* Semantic UI
* Fully responsive UI
* JWT Authorization
* Paypal payment integration 


## Tools

- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Heroku](https://devcenter.heroku.com/)


## Installation

1. React Setup & Git Initialize

    ```bash
    npx create-react-app frontend
    ```

2. Implementing React Router

    ```jsx
    npm i react-router-dom
    ```

3.  Fetch Data From Express

    ```jsx
    npm i axios
    ```

    ```jsx
    "proxy":  "http://127.0.0.1:5000", 
    ```

    ```jsx
    npm i -D nodemon concurrently
    npm i dotenv
    ```

4. Connect to MongoDB

    ```markdown
    npm i mongoose
    ```

---

1. Back-End Server Setup

    [📜 Back-End Scripts]
    ```
    "scripts": {
    "start": "node backend/server" 
	// Run node server | npm start

    "server": "nodemon backend/server",
	// Run node server automatically | npm run server

    "client": "npm start --prefix frontend" 
	// Run frontend React server from backend | npm run client

    "dev": "concurrently \"npm run server\"  \"npm run client\"" 
	// Run Both servers at the same time | npm run dev

    "data:import": "node backend/seeder",
	// Import seeder date to DB | npm run data:import
    "data:destory": "node backend/seeder -d"
	// Destory data from DB | npm run data:destory
    },
    ```
    
    ```jsx
    npm i express
    npm i bcryptjs
    npm i express-async-handler
    npm i morgan
    npm i jsonwebtoken
    npm i multer
    npm i react-helmet
    ```

2. Connect to MongoDB

    ```jsx
    const conn = await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
    ```

3. Redux Setup

    ```jsx
    npm i redux  react-redux  redux-thunk  redux-devtools-extension
    ```

4. JWT Token

    ```jsx
    pm.environment.set("TOKEN", pm.response.json().token)
    ```

5. Heroku Deploy

    ```jsx
    heroku login
    heroku create "URL name"

    in Procfile file --> web: node backend/server.js

    ```
    
## Author

  Theelipan Prabakar - [www.theelipan.com](https://www.theelipan.com)

  Project Link: [https://rn-store.herokuapp.com/](https://rn-store.herokuapp.com/)
  
  
## License
  
  Released under the MIT License.
  
