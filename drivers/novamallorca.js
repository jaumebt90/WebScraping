const puppeteer = require("puppeteer");

async function getNovaLinks() {
  let url = "https://www.bhhsmallorca.com/en/properties?page=";
  let i;
  let arrayResult = [];
  for (i = 1; i <= 45; i++) {
    let urlFinal = url + i;
    console.log("Trabajando para obtener la url desde: " + urlFinal);

    //console.log(urlFinal);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlFinal);

    //await page.screenshot({ path: "prueba.jpg" });

    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll(".ic-hiliteIMG a");
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
async function getNovaDetalles(input) {
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
      const elements = document.querySelectorAll("#ic-detContent");
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

module.exports = { getNovaLinks, getNovaDetalles };
