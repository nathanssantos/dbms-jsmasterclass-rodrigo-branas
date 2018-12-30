const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regExp = /create table ([a-z]+) \((.+)\)/;
const parsedstatement = statement.match(regExp);
const tableName = parsedstatement[1];
let columns = parsedstatement[2];
columns = columns.split(", ");

