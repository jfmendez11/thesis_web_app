const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
var path = require('path');
const fs = require("fs")

const ldaModelFilename = process.env.MODEL_PATH;
const fullPath = path.resolve("./files/model_result.json");

/* GET LDA Model */
router.get('/', function(req, res, next) {
  let topics = req.query.topics;
  let args = [ldaModelFilename, '--topics', topics]//, '--logging', logging];

  if(req.query.start) args.push('--start', req.query.start);
  if(req.query.end) args.push('--end', req.query.end);
  if(req.query.accounts) args.push('--accounts', req.query.accounts);
  if(req.query.hashtagmodel) args.push('--hashtagmodel', req.query.hashtagmodel);

  let child = spawn('python3', args);

  let success;
  let message;

  child.stdout.on('data', function (data) {
    const scriptResult = JSON.parse(data);
    console.log(scriptResult);
    success = scriptResult.success;
    message = scriptResult.message;
  });
  child.stderr.on('data', (data) => {
    console.log(`error:${data}`);
  });

  child.on('close', function (code) {
    if (code !== 0) {
        console.log('an error has occurred', code);
        return res.json({ success: false, message: "Ocurrió un error" }).status(500);
    } else {
      const fileContents = fs.readFileSync(fullPath);
      try {
        const data = JSON.parse(fileContents)
        console.log(data);
        if(success) return res.json({success: success, data: data, message: message}).status(200);
        else return res.json({success: success, message: message}).status(400);
      } catch(err) {
        console.log(err);
        return res.json({ success: false, message: "Ocurrió un error" }).status(500);
      }
    }
  });
});

module.exports = router;
