//Request
const request = require("request");
// RequestPromise
const requestPromise = require("request-promise");
// Cheerio $
const cheerio = require("cheerio");
//File system
const fs = require("fs");
// Json2csv
const { Parser } = require("json2csv");
// Colors
const colors = require("colors");

// Empty array declaration
let empresasArray = [];
let paginationArray = [];
let resultsObject = [];
let cleanempresasArray = [];


//Autoexcutable annonimous function
(async () => {
  //Try block
  try {
    let response = await requestPromise(
      "https://www.balearhouse.com/es/comprar/inmuebles/mallorca"
    );
    let $ = cheerio.load(response);


      // PAGINATION LAST PAGE NUMBER
      let PAGENUMBER = 21;
      console.log(PAGENUMBER);
  
    //const pageNumber = parseInt( $ ('ul.c-paginate > li').last().find("page: ").text());
  
  
      // POBLAR ARRAY DE LINKS
      for (let i = 1; i < PAGENUMBER + 1; i++) {
        if (paginationArray.length === 0) {
          paginationArray.push(
            `https://www.balearhouse.com/es/comprar/inmuebles/mallorca`
          );
        } else {
          paginationArray.push(
            `https://www.balearhouse.com/es/comprar/inmuebles/mallorca?page=${i}`
          );
        }
      }
  
      console.log (paginationArray);
  
      console.log(
        `Pagination ARRAY has ${paginationArray.length} LINKS to scrape`.bgGreen
          .black
      );
  
      // HTTP REQUEST TO PAGINATION TO GET EACH ITEM'S LINK
      for (let url of paginationArray) {
        let item = 0;
        let size = 0;
        response = await requestPromise(url);
        $ = await cheerio.load(response);
        $('*').each(function () {
          item = 0
          item += $(this).attr("href");
          //console.log (item.length);
         if (item.length > 120) {
          //console.log($(this).attr("href"));
          //console.log('✅');
          empresasArray.push($(this).attr("href"));
        } else {
        //console.log('⛔️');
        };
          });
         //console.log(empresasArray)
         cleanempresasArray = [...new Set(empresasArray)];
      };
  
      
      console.log(
        `Empresas ARRAY has ${cleanempresasArray.length} LINKS to scrape`.yellow
      );
  
  

    // SCRAPE ALL THE DATA
    for (let url of cleanempresasArray) {
      response = await requestPromise(url);
      $ = await cheerio.load(response);

//Pendiente añadir un timeout para esta página

      let Zone = $('div[class="o-layout__item u-2/3@l"] > p[class="u-uppercase"]').text();
      let Title = $("h1").text();
      let features = $('div[class="c-property-features c-property-features--inner u-flex u-mrb-m u-pdb-m"] > div[class="u-mrr-dxl@m u-mrb-none@m u-mrb-s"] > p[class="c-property-features__big u-color-secondary"]').text();  
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


    //console.log(Zone, Title, Price, Location, Rooms, Bathrooms, Builtsize, Landsize, Pool, Seaview, Referencenumber, PhotosArray, GPSlocation, Description);

     //Push elements to an JSON
      resultsObject.push({
        Zone: Zone, 
        Title: Title, 
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
      });

      // CREATE JSONFILE
      let data = JSON.stringify(resultsObject);
      fs.writeFileSync("resultsObject.json", data);
      console.log(`Item scraped ✅`.green);
    }
    console.log("Scrapped Successfull".bgGreen.black);
    const fields = ["Zone","Title","Price","Location","Rooms","Bathrooms","Builtsize","Landsize","Pool","Seaview","Referencenumber","PhotosArray","GPSlocation","Description"];

    // I SPECIFY THE FIELDS THAT I NEED
    const json2csvParser = new Parser({
      fields: fields, // I SPECIFY THE FIELDS THAT I NEED
      // quote: "", // I ELIMINATE THE QUOTES FORM THE FIELDS
      // delimiter: '"', // I CHANGE THE DELIMITER FROM , WHICH IS DEFAULT TO "
      defaultValue: "No info", // THIS IS THE DEFAULT VALUE WHEN THERE IS NO INFO IN THE FIELD
    });

    const csv = json2csvParser.parse(resultsObject);

    // const ramdom = Math.floor(Math.random() * (1000000 - 100)) + 100;
    fs.writeFileSync(`./results/BalearHouseresults.csv`, csv, "utf-8");
    console.log("Done JSON to CSV...".bgGreen.black);

  } catch (err) {
    console.error(err);
  }
})();

/* Extraer la estructura del DOM 
crumb = function(node) {
var idOrClass = (node.id && "#"+node.id) || (""+node.classList && (" "+node.classList).replace(/ /g, "."));
return node.tagName.toLowerCase() + idOrClass;};
crumbPath = function(node) {return node.parentNode ? crumbPath(node.parentNode).concat(crumb(node)) : [];};
crumbPath($0);
*/