const addPerson = require("./addPerson");
const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl : settings.ssl,
    port : settings.port
  }
});


let items = addPerson();
console.log(items[2]);

knex('famous_people').insert(
  {
  first_name: items[1],
  last_name: items[0],
  birthdate: items[2]
  }
).then( (resp) => {
  knex.select()
  .from('famous_people')
    .then(
      (resp) => {
        console.log(resp);
        knex.destroy();
      }
  );
});
