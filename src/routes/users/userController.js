import { User } from '../../models/users';
import { user, users } from '../../datastores/userData';

import checkRequired from '../../helpers/auth_field_helpers';
import { ROOT_URL } from '../index';

const userExists = username => Boolean(users.findByUsername(username));
const findUser = username => users.findByUsername(username);

const createUser = (req, res) => {
  if (!req.user.anonymous) {
    res.status(307).json({
      success: true,
      location: `${req.headers.host + ROOT_URL}/menu`,
      message: `already logged in as ${req.user.details.username}`
    });
  }

  checkRequired(req, res);

  if (userExists(req.body.username)) {
    res.status(409).json({
      success: false,
      message: `user '${req.body.username}' already exists`
    });
  }

  const userToCreate = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email || ''
  };

  const newUser = new User(userToCreate);
  newUser.save();

  res.status(201).json({
    success: true,
    message: `user ${newUser.username} registered successfully`
  });
};

/* 


*/

const userLogin = (req, res) => {
  checkRequired(req, res);

  if (!userExists(req.body.username)) {
    res.status(401).json({
      success: false,
      message: `user ${req.body.username} not registered`
    });
  } else {
    const match = findUser(req.body.username);

    if (match.password === req.body.password) {
      user.details = { ...match };
      user.anonymous = false;

      res.status(200).json({
        success: true,
        message: `successful login as ${req.user.details.username}`,
        user
      });
    }
  }
};

const redirectAuthPages = (req, res) => {
  if (!req.user.anonymous) {
    res.status(307).json({
      success: true,
      location: `${req.headers.host + ROOT_URL}/menu`,
      message: `already logged in as ${req.user.details.username}`
    });
  } else {
    res.status(200).json({
      success: true
    });
  }
};

export default { createUser, userLogin, redirectAuthPages };
