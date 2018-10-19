var express = require('express');
var router  = express.Router();

router.get('/', (req, res) => {
  res.send('edit')
})

module.exports = router;