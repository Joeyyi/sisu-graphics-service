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
var arr = []

mapData.forEach((campus, iC) => {
  campus.buildings.forEach((building, iB) => {
    building.floors.forEach((floor, iF) => {
      floor.blocks.forEach((room, iR) => {
        if (room.type !== 1) return
        arr.push({
          index: [iC, iB, iF, iR],
          name: (iB + 1).toString() + room.numbers.join('-' + (iB + 1).toString()) + '(' + campus.name + '校区' + building.name + floor.name + ')'
          // name: (iF + 1).toString() + room.numbers.join('-' + (iF + 1).toString()) + room.name ? '楼' + room.name : '' + '(' + campus.name + '校区' + floor.name + ')'
        })
      })
    })
  })
})

router.get('/', (req, res) => {
  var keywords = req.query.kw.split(' ');
  var result = arr;
  for (i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    var re = new RegExp(keyword, "i");
    result = result.filter((item, i) => {
      return item.name.match(re)
    })
    if (result.length < 5) break;
  }
  res.send(result.slice(0, 15))
})

module.exports = router;