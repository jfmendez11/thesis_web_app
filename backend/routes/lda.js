const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const path = require('path');
const ldaModelFilename = process.env.MODEL_PATH;

/* GET LDA Model */
router.get('/', async function(req, res, next) {
  let topics = req.query.topics;
  let args = [ldaModelFilename, '--topics', topics]//, '--logging', logging];

  if(req.query.start) args.push('--start', req.query.start);
  if(req.query.end) args.push('--end', req.query.end);
  if(req.query.accounts) args.push('--accounts', req.query.accounts);
  if(req.query.hashtagmodel) args.push('--hashtagmodel', req.query.hashtagmodel);

  let child = spawn('python3', args);

  child.stdout.on('data', function (data) {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    return res.json({ success: true, data: parsedData, message: "" });
  });

  child.stderr.on('data', (data) => {
    console.log(`error:${data}`);
  });

  child.on('close', function (code) {
    if (code !== 0) {
        console.log('an error has occurred', code);
        return res.json({ success: false, message: "Ocurrió un error" });
    }
  });
});

module.exports = router;
