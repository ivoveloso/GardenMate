const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    if (userData.IsAdmin) {
      req.session.save(() => {
        req.session.Admin_user_id = userData.id;
        req.session.logged_in = true;

        res.json({
          user: userData,
          message: 'You are now logged in as an Admin!',
        });
      });
    }else {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.json({
          user: userData,
          message: 'You are now logged in!',
        });
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/user/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({message: 'No user found with this id!'});
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
