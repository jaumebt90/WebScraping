const puppeteer = require("puppeteer");
const request = require("request");
const requestPromise = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const { Parser } = require("json2csv");
const colors = require("colors");

async function getBalearLinks() {
  let url = "https://www.balearhouse.com/es/comprar/inmuebles/mallorca?page=";
  let i;
  let arrayResult = [];
  for (i = 1; i <= 2; i++) {
    let urlFinal = url + i;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(urlFinal);

    const enlaces = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.c-card__content.u-bg-color-grey.u-pdh-ds.u-pdt-m.u-pdb-dm > a:nth-child(2)");
      const links = [];
      for (let element of elements) {
        links.push(element.href);
      }
      return links;
    });
    for (let i = 0; i < enlaces.length; i++) {
      arrayResult.push(enlaces[i]);
    }
    //console.log(enlaces.length);
    await browser.close();
  }
  cleanpropertyarray = [...new Set(arrayResult)];
  console.log(cleanpropertyarray);
  return cleanpropertyarray;
}

//Input es un array de URL's
async function getBalearDetalles(input) {
let resultsObject = [];
//Autoexcutable annonimous function
    // SCRAPE ALL THE DATA
    for (let url of input) {
      try{
      response = await requestPromise(url);
      $ = await cheerio.load(response);
      
      
      //let Zone = $('div[class="o-layout__item u-2/3@l"] > p[class="u-uppercase"]').text();
      let Title = $("h1").text();
     /* let features = $('div[class="c-property-features c-property-features--inner u-flex u-mrb-m u-pdb-m"] > div[class="u-mrr-dxl@m u-mrb-none@m u-mrb-s"] > p[class="c-property-features__big u-color-secondary"]').text();  
      console.log (features);
      let Price = $('div[class="c-property-features c-property-features--inner u-flex u-mrb-m u-pdb-m"] > div[class="u-mrr-xl@m u-mrb-none@m u-mrb-s"] > p[class="c-property-features__big u-color-primary"]').text();
      let Referencenumber = $('div[class="c-property-features c-property-features--inner u-flex u-mrb-m u-pdb-m"] > div[class="u-mrr-dxl@m u-mrb-none@m u-mrb-s"] > p[class="c-property-features__big u-color-secondary"]').text();
      let Rooms = $('p[id="js-rooms-value"]').text();
      let Bathrooms = $('p[id="js-baths-value"]').text();
      let Builtsize = $('p[id="js-m_cons-value"]').text();
      let Landsize = $('p[id="js-m_parc-value"]').text();
      let Location = "";
      let Pool = "";
      let Seaview = "";
      let PhotosArray = [];
      let GPSlocation = "";
      let Description = $('div[class="c-property-text u-mrv-xl"]').text();
 */
     //Push elements to an JSON
      resultsObject.push({
        Title: Title, 
      /*   Zone: Zone, 
        Price: Price, 
        Location: Location, 
        Rooms: Rooms, 
        Bathrooms: Bathrooms, 
        Builtsize: Builtsize, 
        Landsize: Landsize, 
        Pool: Pool, 
        Seaview: Seaview, 
        Referencenumber: Referencenumber, 
        PhotosArray: PhotosArray, 
        GPSlocation: GPSlocation, 
        Description: Description 
        Source: Source */
      });  
      console.log(Title);
  } 
  catch (error){
    console.log("Error con "&url);
  };
}

console.log(resultsObject);
return resultsObject;
}

module.exports = { getBalearLinks, getBalearDetalles };
