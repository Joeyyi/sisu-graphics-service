var express = require('express');
var router  = express.Router();
var mapData = require('../public/mapData.json');

var brief = mapData.map((campus) => {
  var buildings = campus.buildings.map((building) => {
    return {
      name: building.name,
      tags: building.tags,
      description: building.description,
      stories: building.floors.length
    }
  })
  return {
    name: campus.name,
    address: campus.address,
    description: campus.description,
    buildings: buildings
  }
})

router.get('/', (req, res) => {
  var response = Object.assign({}, {data: brief}, {responseStatus: 1} )
  res.header('Access-Control-Allow-Origin','*')
  res.send(JSON.stringify(response));
})

module.exports = router;