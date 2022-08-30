const { json } = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/pets", (req, res) => {
  const petData = req.body;
  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    parsedData.push(petData);
    const stringData = JSON.stringify(parsedData);
    console.log(stringData);
    fs.writeFile("pets.json", stringData, (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(petData);
    });
  });
});

app.get("/pets/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } 
    const parsedData = JSON.parse(data);
  
      res.status(200).send(parsedData[id]);
    
    console.log(parsedData);
  });

  const pet = req.url.split('/')
  const lastIndex = pet[pet.length-1]
  const parsedIndex = JSON.parse(lastIndex)
  
  console.log(parsedIndex)
  
if (id >= parsedIndex) {
  res.status(404).send(`Error 404! Input ${parsedIndex} too large, please go lower.`)
 } else if (id < parsedIndex.length- 3) {
  res.status(404).send(`Error 404! Input ${parsedIndex} too small, please go higher.`)

 }

});

app.patch("/pets/:id", (req, res) => {
  const id = req.params.id;
  const changeData = req.body;
  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    parsedData.splice(id, 0, changeData);
    console.log(parsedData);
    const stringData = JSON.stringify(parsedData);

    fs.writeFile("pets.json", stringData, (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(changeData);
    });
  });
});

app.get("/pets", (req, res) => {
  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let pets = JSON.parse(data);
    res.status(200).send({ status: "success", data: pets });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});

app.delete("/pets/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("pets.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const deleteData = JSON.parse(data);
    deleteData.splice(id, 1);
    const stringData = JSON.stringify(deleteData);
    console.log(stringData);

    fs.writeFile("pets.json", stringData, (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).send(stringData);
    });
  });
});
