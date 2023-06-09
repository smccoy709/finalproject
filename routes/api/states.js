const express = require('express');
const app = express();
const router = express.Router();

const data = {};
data.states = require.main.require('./model/statesData.json');

//const statesController = require.main.require('./controllers/statesController');

// GET state requests
router.route('/').get((req, res) => {
  getAllStates(req, res);
});

router.route('/:state').get((req, res) => {
  const requestedState = findState(req.params.state);
  
  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else {
    res.json(requestedState);
  }
});

router.route('/:state/capital').get((req, res) => {
  const requestedState = findState(req.params.state);

  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else {
    res.json({ "state" : requestedState.state, "capital" : requestedState.capital_city});
  }
});

router.route('/:state/nickname').get((req, res) => {
  const requestedState = findState(req.params.state);

  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else {
    res.json({ "state" : requestedState.state, "nickname" : requestedState.nickname});
  }
});

router.route('/:state/population').get((req, res) => {
  const requestedState = findState(req.params.state);

  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else {
    return res.json({"state":requestedState.state,"population":requestedState.population.toLocaleString()});
  }
});

router.route('/:state/admission').get((req, res) => {
  const requestedState = findState(req.params.state);

  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else {
    res.json({ "state" : requestedState.state, "admitted" : requestedState.admission_date});
  }
});

router.route('/:state/funfact').get((req, res) => {
  const requestedState = findState(req.params.state);

  if (!requestedState) {
    res.json({"message": "Invalid state abbreviation parameter"});
  }
  else if (requestedState === findState("GA")) {
    res.json({"message": "No Fun Facts found for Georgia"});
  }
  else {
    res.json({ "state" : requestedState.state, "funfact" : requestedState.funfact});
  }
});

// POST state requests

router.route('/:state/funfact').post((req, res) => {

});


// Router Helper Methods
const getAllStates = (req, res) => {
  let states = data.states;

  if (req.query.contig === 'true') {
    states = data.states.filter(state => state.code !== 'AK' && state.code !== 'HI');
  } 
  else if (req.query.contig === 'false') {
    states = data.states.filter(state => state.code === 'AK' || state.code === 'HI');
  }
  
  res.json(states);
};

const findState = (stateParam) => {
  return data.states.find(state => state.code.toUpperCase() == stateParam.toUpperCase());
};

module.exports = router;