const router = require('express').Router();
const { Activity, User, Client } = require('../models');
const withAuth = require('../utils/auth');
var csv = require('fast-csv');

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
      attributes: { exclude: ['password'] },
      include: [{ model: Activity, include: [{ model: Client }] }]
    });

    const user = userData.get({ plain: true });
    const views = userData.isAdmin ? 'admin' : 'profile';

    const employees = await User.findAll();
    const employeeName = employees.map((individualEmployee) =>
      individualEmployee.get({ plain: true })
    );

    res.render(views, {
      employee: employeeName,
      user: user,
      activities: user.activities,
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

    res.writeHead(200, {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=' + user.name + '_Export.csv'
    });
    csv.write(user.activities, { headers: true }).pipe(res);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile/:id', withAuth ,async (req, res) => {
  try {
    console.log('request received')
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Activity, include: [{ model: Client }] }]
    });

    const activityData = await Activity.findAll({ where: { user_id: req.params.id }
    });

    const activities = activityData.map((activity) =>
      activity.get({ plain: true })
    );

    const user = userData.get({ plain: true });
    const views = userData.isAdmin ? 'admin' : 'profile';

    const employees = await User.findAll();
    const employeeName = employees.map((individualEmployee) =>
      individualEmployee.get({ plain: true })
    );

    res.render(views, {
      employee: employeeName,
      activities,
      user: user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
