const http = require("http");

const fs = require("fs");

const server = http.createServer();
console.log(module)
const PORT = 8000;

server.on('request', (req, res)=> {
  fs.readFile('pets.json', 'utf-8', (error, data) => {
    
    const pet = req.url.split('/')
    const index = pet[pet.length -1]
    if(req.url === `/pets/${index}` && ( index >=2 || index <= -1) ) {
    
      res.status = 404
      res.setHeader("Content-Type", "text/plain");
     console.log(req.url)
      res.end(`Not Found`)

      
    } else if (req.url === `/pets/${index}`){

      res.status = 200
      res.setHeader("Content-Type", "text/plain");
     
      const petObj = JSON.parse(data)
      
      const petString = JSON.stringify(petObj[index])
     
      res.end(petString)
  
    }
    
    if (error) {
      console.log("We hit a snag");
    } 
    if (req.url === "/pets") {
      res.status == 200;
      res.setHeader("Content-Type", "text/plain");
      console.log(req.url)
      res.end(data);
      
    }


  });
  

});


server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


// myLibrary = () => {
//   const propsAndMethods = {
//     name: 'Franklyn',
//     math: function () {
//      return 2 + 2
//     },
//     english: function () {
//       console.log ("made a new function")
//     }
//   }
//   return propsAndMethods
// }

// const showLib = myLibrary()
// showLib.math()