var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var path = require('path');
const ldaModelFilename = path.join(__dirname, 'scripts', 'lda_model.py');

/* GET LDA Model */
router.get('/', async function(req, res, next) {
  let topics = req.query.topics;
  let logging = 0;
  let args = [ldaModelFilename, '--topics', topics]//, '--logging', logging];

  if(req.query.start) args.push('--start', req.query.start);
  if(req.query.end) args.push('--end', req.query.end);
  if(req.query.accounts) args.push('--accounts', req.query.accounts);

  let child = spawn('python3', args);

  child.stdout.on('data', function (data) {
    var parsedData = JSON.parse(data);
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
