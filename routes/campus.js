var express = require('express');
var router  = express.Router();
var mapData = require('../public/mapData.json');

var brief = mapData.map((campus) => {
  return campus.buildings.map((building) => {
    return {
      name: building.name,
      tags: building.tags,
      description: building.description,
      stories: building.floors.length
    }
  })
})
router.get('/', (req, res) => {
  var response = Object.assign({}, brief, {responseStatus: 1} )
  res.header('Access-Control-Allow-Origin','*')
  res.send(JSON.stringify(response));
})

module.exports = router;