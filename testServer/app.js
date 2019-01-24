/**
 * To get started install
 * express bodyparser jsonwebtoken express-jwt
 * via npm
 * command :-
 * npm install express bodyparser jsonwebtoken express-jwt --save
 */

// Bringing all the dependencies in
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

// Instantiating the express app
const app = express();

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

// MOCKING DB just for test
let users = [
  {
    id: 7,
    role: "ap_admin",
    username: "a",
    password: "a"
  },
  {
    id: 1,
    role: "sp_admin",
    username: "test2",
    password: "asdf12345"
  },
  {
    id: 2,
    role: "sp_admin",
    username: "test2",
    password: "asdf12345"
  }
];

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  for (let user of users) {
    // I am using a simple array users which i made above
    if (
      username == user.username &&
      password ==
        user.password /* Use your password hash checking logic here !*/
    ) {
      //If all credentials are correct do this
      let token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        "keyboard cat 4 ever",
        { expiresIn: 129600 }
      ); // Sigining the token
      res.json({
        sucess: true,
        err: null,
        token
      });
      break;
    } else {
      res.status(401).json({
        sucess: false,
        token: null,
        err: "Username or password is incorrect"
      });
    }
  }
});

app.get("/", jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.send("You are authenticated"); //Sending some response when authenticated
});

app.get("/orders", jwtMW /* Using the express jwt MW here */, (req, res) => {
  res.send(`[
        {
          "id": 1,
          "providerId": 1,
          "appUser": {
            "phoneNumber": "+77024733224",
            "name": "dake"
          },
          "address": {
            "street": "Тархана 9",
            "apartment": "277",
            "entrance": "6",
            "floor": "4"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 3,
              "price": 2500
            },
            {
              "type": {
                "id": "2",
                "name": "Полотенца и банное"
              },
              "count": 2,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "1",
            "name": "Принят в обработку"
          },
          "userNote": "Проверьте карманы"
        },
        {
          "id": 2,
          "providerId": 1,
          "appUser": {
            "phoneNumber": "+77777777777",
            "name": "Bake"
          },
          "address": {
            "street": "Достык 59",
            "apartment": "45",
            "entrance": "1",
            "floor": "3"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 1,
              "price": 2500
            },
            {
              "type": {
                "id": "2",
                "name": "Полотенца и банное"
              },
              "count": 1,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "1",
            "name": "Принят в обработку"
          },
          "userNote": ""
        },
        {
          "id": 3,
          "providerId": 1,
          "appUser": {
            "phoneNumber": "+77079999999",
            "name": "Жандос"
          },
          "address": {
            "street": "Республика 101",
            "apartment": "97",
            "entrance": "3",
            "floor": "15"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 3,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "3",
            "name": "Выполнен"
          },
          "userNote": ""
        },
        {
          "id": 4,
          "providerId": 1,
          "appUser": {
            "phoneNumber": "+7011542154",
            "name": "Афоня"
          },
          "address": {
            "street": "Кошкарбаева",
            "apartment": "123б",
            "entrance": "1",
            "floor": "5"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 3,
              "price": 2500
            },
            {
              "type": {
                "id": "2",
                "name": "Полотенца и банное"
              },
              "count": 2,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "3",
            "name": "Выполнен"
          },
          "userNote": ""
        },
        {
          "id": 5,
          "providerId": 2,
          "appUser": {
            "phoneNumber": "+7715456656",
            "name": "Мадияр"
          },
          "address": {
            "street": "Республика 59",
            "apartment": "45",
            "entrance": "1",
            "floor": "3"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 1,
              "price": 2500
            },
            {
              "type": {
                "id": "2",
                "name": "Полотенца и банное"
              },
              "count": 1,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "1",
            "name": "Принят в обработку"
          },
          "userNote": ""
        },
        {
          "id": 6,
          "providerId": 2,
          "appUser": {
            "phoneNumber": "+77777777777",
            "name": "Bake"
          },
          "address": {
            "street": "Достык 59",
            "apartment": "45",
            "entrance": "1",
            "floor": "3"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 2,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "3",
            "name": "Выполнен"
          },
          "userNote": ""
        },
        {
          "id": 7,
          "providerId": 2,
          "appUser": {
            "phoneNumber": "+77777777777",
            "name": "Илья"
          },
          "address": {
            "street": "Космонавтов 59",
            "apartment": "45",
            "entrance": "1",
            "floor": "3"
          },
          "bucketList": [
            {
              "type": {
                "id": "1",
                "name": "Одежда и постельное белье"
              },
              "count": 1,
              "price": 2500
            },
            {
              "type": {
                "id": "2",
                "name": "Полотенца и банное"
              },
              "count": 1,
              "price": 2500
            }
          ],
          "paymentType": {
            "id": "0",
            "name": "Наличные"
          },
          "status": {
            "id": "4",
            "name": "Отменен"
          },
          "userNote": ""
        }
      ]
      `); //Sending some response when authenticated
});

// Error handling
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Magic happens on port ${PORT}`);
});
