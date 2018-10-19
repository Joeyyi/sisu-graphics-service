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
  res.send(JSON.stringify(brief));
})

module.exports = router;