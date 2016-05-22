var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
    next();
});

router.post('/',function(req,res,next){
  var buffer  = fs.createWriteStream('public/droppr/'+req.query.name);
  req.on('data', function(data){
      buffer.write(data);
  }).on('end', function() {
    buffer.end();
    var bind = (process.env.ADDR || "localhost")+":"+(process.env.PORT || 3000);
    res.send(bind+'/droppr/'+req.query.name)
  });
})

module.exports = router;
