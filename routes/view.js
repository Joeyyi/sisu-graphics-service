var express = require('express');
var router  = express.Router();
var mapData = require('../public/mapData.json');

// response status:
// 1: sucess, Data
// 2: redirect, redirect
// 3: not found, massage
// 4: err, err

function resGenerator(status, key, value) {
  var obj = {}
  obj.responseStatus = status
  obj[key] = value
  return JSON.stringify(obj)
}

router.get('/', (req, res) => {
  //         let res = mapData[params.campus || 0].buildings[params.building || 0].floors[params.floor || 0];
  if (!req.query.campus) {
    res.send(resGenerator(2, 'redirect', '/'))
  } else if (!req.query.building) {
    res.send(resGenerator(2, 'redirect', '/campus'))
  } else {
    try {
      var result = mapData[req.query.campus].buildings[req.query.building].floors[req.query.floor || 0]
      if (!result) throw ('got result: ' + result)
      res.send(resGenerator(1, 'data', result))
    } catch (e) {
      console.log({
        query: req.query,
        datetime: new Date(),
        err: e
      })
      res.send(resGenerator(4, 'message', '地图获取失败，请重新选择'))
    }
  }
})

module.exports = router;