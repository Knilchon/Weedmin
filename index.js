const express = require("express");
const path = require("path");

const app = express();
visits = 0;
app.get("/", (req,res) => {
    ++visits;
    console.log(visits)
    res.sendFile(path.join(__dirname,"/index.html"))
})
app.get("/image-4.png", (req,res) => {
  const imagePath = path.join(__dirname, 'image-4.png');
  
  // Set the content type to indicate that it's an image
  res.contentType('image/jpeg');

  // Send the image file
  res.sendFile(imagePath);
})

app.listen(8020, () => console.log("Server life Works!"));