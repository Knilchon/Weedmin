import express from "express";
import path from "path";
import fs from "fs"
import https from 'https'

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/knilchon.mywire.org/fullchain.pem'),
};

const app = express();
let visits = 0;
app.get("/", (req,res) => {
    ++visits;
    console.log(visits)
    res.sendFile(path.resolve('index.html'))
})
app.get("/image-4.png", (req,res) => {
  const imagePath = path.join(path.resolve('image-4.png') );
  
  // Set the content type to indicate that it's an image
  res.contentType('image/jpeg');

  // Send the image file
  res.sendFile(imagePath);
})

const server = https.createServer(options,app)

server.listen(443, () => {
  console.log(`Server running on https://knilchon.mywire.org`);
})
