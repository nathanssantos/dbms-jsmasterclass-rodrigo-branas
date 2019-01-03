const DatabaseError = function (statement, message) {
    this.statement = statement;
    this.message = message;
}
const database = {
    tables: {},
    
    createTable(statement) {

        const regExp = /create table ([a-z]+) \((.+)\)/;
        const parsedstatement = statement.match(regExp);
        const tableName = parsedstatement[1];

        this.tables[tableName] = {
            columns: {},
            data: []
        };

        let columns = parsedstatement[2];
        columns = columns.split(", ");

        for (let column of columns) {
            column = column.trim().split(" ");
            const name = column[0];
            const type = column[1];
            this.tables[tableName].columns[name] = type;
        }
    },
    execute(statement) {
        if (statement.startsWith("create table")) {
            return this.createTable(statement);
        }
        const message = `Syntax error: "${statement}"`;
        throw new DatabaseError(statement, message);
    }
};

try {
    database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    console.log(JSON.stringify(database, undefined, " "));
    database.execute("select id, name from author");
} catch (e) {
    console.log(e.message);
}
