const router = require('express').Router();
const { Activity, User, Client } = require('../models');
const withAuth = require('../utils/auth');
const jsonexport = require('jsonexport');

router.get('/', async (req, res) => {
  try {
    res.render('login', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [{ model: Activity, include: [{ model: Client }] }]
    });

    const user = userData.get({ plain: true });
    const views = userData.isAdmin ? 'admin' : 'profile';

    const employees = await User.findAll();
    const employeeName = employees.map(individualEmployee => individualEmployee.get({ plain: true}));

    res.render(views, {
      employee: employeeName,
      user: user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/export', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Activity }]
    });

    const user = userData.get({ plain: true });
    // console.log(user.activities);

    jsonexport(user.activities, { rowDelimiter: '|' }, function (err, csv) {
      if (err) {
        return console.error(err);
      }
      console.log(csv);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
