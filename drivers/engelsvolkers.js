const puppeteer = require("puppeteer");

async function getEngelsLinks() {
  let url1 = "https://www.engelvoelkers.com/en/search/?q=&startIndex="
  let url2 = "&businessArea=residential&sortOrder=DESC&sortField=sortPrice&pageSize=18&facets=bsnssr%3Aresidential%3Bcntry%3Aspain%3Brgn%3Amajorca%3Btyp%3Abuy%3B";
  let i;
  let arrayResult = [];
  for (i = 1; i <= 2000; i+=15) {
    let urlFinal = url1 + i + url2;
    console.log("Trabajando para obtener la url desde: " + urlFinal);

    //console.log(urlFinal);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlFinal);

    //await page.screenshot({ path: "prueba.jpg" });

    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll(".ev-property-container");
      const links = [];
      for (let element of elements) {
        links.push(element.href);
      }
      return links;
    });
    console.log (enlaces);
    for (let i = 0; i < enlaces.length; i++) {
      arrayResult.push(enlaces[i]);
    }

    //console.log(enlaces.length);

    await browser.close();
  }
  return arrayResult;
}

//Input es un array de URL's
async function getEngelsDetalles(input) {
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
      const elements = document.querySelectorAll("beschreibungstext");
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

module.exports = { getEngelsLinks, getEngelsDetalles };
