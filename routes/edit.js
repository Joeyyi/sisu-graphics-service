var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin','*')
  res.send('edit')
})

module.exports = router;