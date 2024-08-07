var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

let highScore = {
  score: 0,
  name: 'None'
};
router.get('/game', function(req, res) {
  res.render('game')
});
router.get('/highscore', (req, res) => {
  res.json(highScore);
});

// Endpoint to update the high score
router.post('/highscore', (req, res) => {
  const { score, name } = req.body;
  if (score > highScore.score) {
      highScore = { score, name };
  }
  res.json(highScore);
});
module.exports = router;
