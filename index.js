const express = require("express");
const path = require("path");
const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/fullchain.pem'),
};

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

const server = https.createServer(options,app)

server.listen(443, () => {
  console.log(`Server running on https://knilchon.mywire.org`);
})