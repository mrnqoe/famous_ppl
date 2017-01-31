const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
var input = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT id, last_name, first_name, birthdate FROM famous_people WHERE last_name = $1::text', input, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('searching...');
    let res = result.rows;
    console.log(`Found ${res.length} person(s) by the name '${input}':`);
    res.forEach((i) => {
      console.log(`- ${i.id} ${i.first_name} ${i.last_name}, born: ${i.birthdate.toDateString()} `);
    })
    client.end();
  });
});
