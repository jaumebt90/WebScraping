const puppeteer = require("puppeteer");

async function getFirstLinks() {
  let url =
    "https://www.privatepropertymallorca.com/es/busqueda-inmobiliaria/page/";
  let i;
  let url2 =
    "/?lang=es&filter_search_type%5B0%5D&advanced_contystate&advanced_city&ref-nr&preis-bis&submit=Buscar%20Inmuebles&wpestate_regular_search_nonce=740c27317a&_wp_http_referer=%2Fes%2F";
  let arrayResult = [];
  for (i = 1; i <= 55; i++) {
    let urlFinal = url + i + url2;
    console.log("Trabajando para obtener la url desde: " + urlFinal);

    //console.log(urlFinal);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlFinal);

    //await page.screenshot({ path: "prueba.jpg" });

    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll(".listing-unit-img-wrapper a");
      const links = [];
      for (let element of elements) {
        links.push(element.href);
      }
      return links;
    });
    console.log(enlaces);
    for (let i = 0; i < enlaces.length; i++) {
      arrayResult.push(enlaces[i]);
    }

    //console.log(enlaces.length);

    await browser.close();
  }
  return arrayResult;
}

//Input es un array de URL's
async function getFirstDetalles(input) {
  console.log("input", input);
  let arrayResult = [];
  for (let i = 0; i < input.length; i++) {
    let urlFinal = input[i];

    //console.log(urlFinal);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlFinal);

    //await page.screenshot({ path: "prueba.jpg" });

    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll(".website-wrapper");
      const links = [];
      for (let element of elements) {
        links.push(element.href);
      }
      return links;
    });

    //console.log(enlaces.length);
    //console.log(enlaces);
    await browser.close();
  }
  return arrayResult;
}

/*
Zone
Name/Title
Price
Location
Rooms
Bathrooms
Builtsize
Landsize
Pool
Seaview
Referencenumber
PhotosArray
GPSlocation
url
sourceurl
source
*/

module.exports = { getFirstLinks, getFirstDetalles };
