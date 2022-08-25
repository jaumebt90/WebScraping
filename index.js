//////////////////////////////////////////////
///////// CONFIGS ////////////////////////////
//////////////////////////////////////////////

// Dependencies
const express = require("express");
//const schedule = require("node-schedule");
//const axios = require("axios");
var cors = require("cors");


const balearhouse = require("./drivers/balearhouse");
const engels = require("./drivers/engelsVolkers");
const johntaylor = require("./drivers/johntaylor");
const firstmallorca = require("./drivers/firstMallorca");
const kensington = require("./drivers/kensington");
const lavin = require("./drivers/lavin");
const luciehauri = require("./drivers/luciehauri");
const mallorcagold = require("./drivers/mallorcagold");
const mallorcaresidencia = require("./drivers/mallorcaresidencia");
const mallorcasite = require("./drivers/mallorcasite");
const martinburri = require("./drivers/martinburri");
const minker = require("./drivers/minker");
const novamallorca = require("./drivers/novamallorca");
const olivermateu = require("./drivers/olivermateu");
const onlymallorca = require("./drivers/onlymallorca");
const palmer = require("./drivers/palmer");
const porta = require("./drivers/portaMallorquina");
const pollentiaproperties = require("./drivers/pollentiaproperties");
const sandberg = require("./drivers/sandberg");
const privateproperty = require("./drivers/privateproperty");
const sothebysrealty = require("./drivers/sothebysrealty");




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

app.get("/balearhouse", async (req, res) => {
  let result = await balearhouse .getBalearLinks();
  let result2 = await balearhouse .getBalearDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/engelsVolkers", async (req, res) => {
  let result = await engels .getEngelsLinks();
  let result2 = await engels .getEngelsDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/johntaylor", async (req, res) => {
  let result = await johntaylor .getJohnLinks();
  let result2 = await johntaylor .getJohnDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/firstMallorca", async (req, res) => {
  let result = await firstmallorca .getFirstLinks();
  let result2 = await firstmallorca .getFirstDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/kensington", async (req, res) => {
  let result = await kensington .getKensingtonLinks();
  let result2 = await kensington .getKensingtonDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/lavin", async (req, res) => {
  let result = await lavin .getLavinLinks();
  let result2 = await lavin .getLavinDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/luciehauri", async (req, res) => {
  let result = await luciehauri .getLucieLinks();
  let result2 = await luciehauri .getLucieDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/mallorcagold", async (req, res) => {
  let result = await mallorcagold .getGoldLinks();
  let result2 = await mallorcagold .getGoldDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/mallorcaresidencia", async (req, res) => {
  let result = await mallorcaresidencia .getResidenciaLinks();
  let result2 = await mallorcaresidencia .getResidenciaDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/mallorcasite", async (req, res) => {
  let result = await mallorcasite .getSiteLinks();
  let result2 = await mallorcasite .getSiteDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/martinburri", async (req, res) => {
  let result = await martinburri .getMartinLinks();
  let result2 = await martinburri .getMartinDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/minker", async (req, res) => {
  let result = await minker .getMinkerLinks();
  let result2 = await minker .getMinkerDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/novamallorca", async (req, res) => {
  let result = await novamallorca .getNovaLinks();
  let result2 = await novamallorca .getNovaDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/olivermateu", async (req, res) => {
  let result = await olivermateu .getOliverLinks();
  let result2 = await olivermateu .getOliverDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/onlymallorca", async (req, res) => {
  let result = await onlymallorca .getOnlyLinks();
  let result2 = await onlymallorca .getOnlyDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/palmer", async (req, res) => {
  let result = await palmer .getPalmerLinks();
  let result2 = await palmer .getPalmerDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/portaMallorquina", async (req, res) => {
  let result = await porta .getPortaLinks();
  let result2 = await porta .getPortaDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/sandberg", async (req, res) => {
  let result = await sandberg .getSandbergLinks();
  let result2 = await sandberg .getSandbergDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/privateproperty", async (req, res) => {
  let result = await privateproperty .getPrivateLinks();
  let result2 = await privateproperty .getPrivateDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/sothebysrealty", async (req, res) => {
  let result = await sothebysrealty .getSotherbysLinks();
  let result2 = await sothebysrealty .getSotherbysDetalles(result);
  res.send(JSON.stringify(result2));
}); //index

app.get("/pollentiaproperties", async (req, res) => {
  let result = await pollentiaproperties.getPollentiaLinks();
  let result2 = await pollentiaproperties.getPollentiaDetalles(result);
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
