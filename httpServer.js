const http = require("http");

const fs = require("fs");

const server = http.createServer();

const PORT = 8000;

server.on("request", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    if (error) {
      console.log("We hit a snag");
    } 
    if (req.url === "/pets") {
      res.status == 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(data);
    }

    const pet = req.url.split('/')
    const index = pet[pet.length -1]
    if(req.url === `/pets/${index}`)  {
    
      res.status = 200
      res.setHeader("Content-Type", "text/plain");
     
      const petObj = JSON.parse(data)
      
      const petString = JSON.stringify(petObj[index])
     
      res.end(petString)
  
      
    }
  });
  

});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});