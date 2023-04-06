require('dotenv').config()
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header
  res.setHeader("Content-Type", "text/html");

  // routes
  let path = "./html/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader('Location', '/about')
      break;
    default:
      path += "notFond.html";
      res.statusCode = 404;
      break;
  }

  // res.ssend html file  to the client
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      res.end(data);
    }
  });
});
// port
const PORT = process.env.PORT || 4000;
server.listen(PORT, "localhost", () => {
  console.log(`we are ready to listing on port ${PORT}`);
});
