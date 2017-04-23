const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cowabunga-checkin.firebaseio.com"
});

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
  Object.values = function values(O) {
    return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
  };
}

if (!Object.entries) {
  Object.entries = function entries(O) {
    return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
  };
}

exports.checkForBadges = functions.database.ref('/users/{userId}/checkIns')
  .onWrite(event => {
    const achievement = Object.values(event.data.val())[0].achievement;
    console.log(`Achievement key: ${achievement.key}`);
    const userId = event.params.userId;
    console.log(`Resolving badges for user ${userId}`);
    return admin.database().ref('/badges').once('value').then(badgesSnapshot => {
      const badges = Object.values(badgesSnapshot.val());
      console.log(`There are ${badges.length} badges in total.`);
      return admin.database().ref(`/users/${userId}/badges`).once('value').then(userBadgesSnapshot => {
        let userBadges = [];
        if (userBadgesSnapshot.val()) {
          userBadges = userBadgesSnapshot.val();
        }
        console.log(`This user has ${userBadges.length} badges.`);
        const userBadgeIds = userBadges.map(userBadge => userBadge.$key);
        const possibleBadges = badges
          //.filter(badge => !userBadgeIds.includes(badge.$key))
          .filter(badge => badge.achievements.includes(achievement.key));
        console.log(`User has ${possibleBadges.length} potential badges to earn.`);
        return admin.database().ref(`/users/${userId}/checkIns`).once('value').then(checkInsSnapshot => {
          let checkIns = [];
          if (checkInsSnapshot.val()) {
            checkIns = Object.values(checkInsSnapshot.val());
          }
          console.log(`User has ${checkIns.length} check ins.`);
          const achievementIds = checkIns.map(checkIn => checkIn.achievement.key);
          possibleBadges.forEach(badge => {
            console.log(`Checking for badge ${badge.name} which requires achievements ${JSON.stringify(badge.achievements)}`);
            if (badge.achievements.every(achievement => achievementIds.includes(achievement))) {
              console.log(`User earned badge ${badge.name}.`);
              badge.timestamp = Date.now();
              admin.database().ref(`/users/${userId}/badges`).push(badge);
              return admin.database().ref(`/users/${userId}/newBadges`).push(badge);
            }
          })
        });
      });
    });
  });
