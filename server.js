const http = require("http");
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer();
const PORT = 3000;

httpServer.on('listening', () => console.log(`Server started in port ${PORT}`));
httpServer.on('request', (req, res) => {
  const isHomePage = req.url === '/';
  const isUpload = req.url === '/upload';

  if (isHomePage) {
        res.end(fs.readFileSync('./pages/index.html'));
        return;
   }

   if (isUpload) {
      const fileName = req.headers['file-name'];
      let dirForFile = path.join(__dirname, 'assets', fileName);
      
      req.on('data', (chunk) => {
        fs.appendFileSync(dirForFile, chunk);
        console.log(`received chunk! ${chunk.length}`);
      });

      res.end('uploaded!');
    }
});


httpServer.listen(PORT);