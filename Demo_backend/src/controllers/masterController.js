const roles = require('../data/roles');
const countries = require('../data/countries');
const states = require('../data/states');

exports.getRoles = (req, res) => {
  res.json({ success: true, data: roles });
};

exports.getCountries = (req, res) => {
  res.json({ success: true, data: countries });
};

exports.getStates = (req, res) => {
  const { countryId } = req.query;
  let result = states;

  if (countryId) {
    result = states.filter(s => s.countryId === parseInt(countryId));
  }

  res.json({ success: true, data: result });
};
