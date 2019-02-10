import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import getClient from '../postgres/get-client';

passport.serializeUser((user: { id: string }, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) =>
  getClient(client => {
    client.query(
      'SELECT id, name, email, latitude, longitude, points FROM ottr_user WHERE id = $1',
      [id],
      (err, results) => {
        if (err) {
          console.error(
            'Error when selecting user on session deserialize',
            err,
          );
          return done(err);
        }

        done(null, results.rows[0]);
      },
    );
  }),
);

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    getClient(client =>
      client.query(
        'SELECT id, email, password FROM ottr_user WHERE email=$1',
        [email],
        (err, result) => {
          if (err) {
            console.error('Error when selecting user on login', err);
            return done(err);
          }

          if (result.rows.length > 0) {
            const first = result.rows[0];
            bcrypt.compare(password, first.password, (error, res) => {
              if (res) {
                done(null, {
                  id: first.id,
                  username: first.email,
                });
              } else {
                done(null, false);
              }
            });
          } else {
            done(null, false);
          }
        },
      ),
    );
  }),
);
