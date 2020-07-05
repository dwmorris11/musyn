const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const redirect = require('./redirect');
const User = require('../../entity/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.get(id)
    .then((user) => done(null, user))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error deserializing user:', err);
      done('Error deserializing user');
    });
});

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, redirect),
);
