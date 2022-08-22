//////////////////////////////////////////////
///////// CONFIGS ////////////////////////////
//////////////////////////////////////////////

// Dependencies
const express = require("express");
//const schedule = require("node-schedule");
//const axios = require("axios");
var cors = require("cors");
const porta = require("./drivers/portaMallorquina");
const engels = require("./drivers/engelsVolkers");


//console.log(typeof getPortaLinks, getPortaLinks);
// Routers imports
//var user = require("./routes/user");
//var collection = require("./routes/collection");
//var typeform = require("./routes/typeform");

// Middlewares code
/* var retriveFirebaseAdmin = async function (req, res, next) {
  let admin = adminSelector(req.originalUrl.split("/")[1]);
  if (typeof admin !== "undefined") {
    req.adminObj = admin;
    req.authObj = await getAuth(admin);
    next();
  } else {
    res.status(400).send({ message: "Bad request" });
  }
}; 

var securityTokenCheck = function (req, res, next) {
  // geting the token from headers and cheking it.

  const { authorization } = req.headers;
  if (
    !authorization ||
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer")
  )
    res.status(401).send({ message: "Unauthorized new" });
  const split = authorization.split("Bearer ");
  if (split.length !== 2) res.status(401).send({ message: "Unauthorized" });
  const token = split[1]; //storing the token

  // Verify the token.

  req.authObj
    .verifyIdToken(token)
    .then((claims) => {
      if (claims.admin === true) {
        req.claims = claims;

        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((error) => {
      res.status(401).send("Unauthorized");
    });
};*/

//////////////////////////////////////////////
///////// SCHEDULER //////////////////////////
//////////////////////////////////////////////

/* if (process.env.ENVIRONMENT !== "develop") {
  console.log("SCHEDULER TASK START");

  let job = schedule.scheduleJob("0 0 21 * * *", async function () {
    try {
      console.log(
        "Sending Palisis Booking from citysightseeing to Arges, Trigger a las 23:00 am!"
      );

      let result = await sendMonthPalisisBookings("citysightseeing");

      console.log(result);
    } catch (error) {
      console.log(
        "ERROR on sending Palisis Booking from citysightseeing to Arges!"
      );

      console.error(error);
    }
  });
}*/

//////////////////////////////////////////////
///////// RUTES AND MIDDLEWARES //////////////
//////////////////////////////////////////////

const app = express();
app.use(express.raw({ type: "application/json" }));
app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend app is online and working!");
}); //index

app.get("/portamallorquina", async (req, res) => {
  let result = await porta.getPortaLinks();
  let result2 = await porta.getDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/engelsvolkers", async (req, res) => {
  let result = await engels.getEngelsLinks();
  let result2 = await engels.getEngelsDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

const port = process.env.PORT || 3000;

// Firebase

/*const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const admin0 = initializeApp({
  credential: cert(JSON.parse(process.env.DEVELOP)),
  databaseURL: "https://developstudio.firebaseio.com",
});

const admin1 = initializeApp(
  {
    credential: cert(JSON.parse(process.env.FONTSANA)),

    databaseURL: "https://fontsana-3037b.firebaseio.com",
  },
  "FONTSANA"
);*/

//////////////////////////////////////////////
///////// SERVER START ///////////////////////
//////////////////////////////////////////////

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
