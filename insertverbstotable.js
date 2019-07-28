const fs = require("fs");

const verbs = JSON.parse(fs.readFileSync("./jsonverbs.json", "utf8"));

function createsql() {
    var sql = "";
    for (let i = 0; i < verbs.length; i++) {
        sql += `
        INSERT INTO verbs (haupt, neben, prefix, prfword, prffirst, prfsecond, verb, example, particip, noun, adjective, finalverb)
        VALUES (${verbs[i].haupt},
            ${verbs[i].neben},
            ${verbs[i].prefix},
            '${verbs[i].prfword}',
            '${verbs[i].prffirst}',
            '${verbs[i].prfsecond}',
            '${verbs[i].verb}',
            '${verbs[i].example}',
            '${verbs[i].particip}',
            '${verbs[i].sustantive}',
            '${verbs[i].adjective}',
            '${verbs[i].prfword}${verbs[i].prffirst}${verbs[i].prfsecond}${
            verbs[i].verb
        }'
        );
        `;
    }

    return sql;
}

const sqltext = createsql();

fs.writeFile("insertverbs.sql", sqltext, function(err) {
    if (err) return console.log(err);
    console.log("Wrote in file, just check it");
});
