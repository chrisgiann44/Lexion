const spicedPg = require("spiced-pg");

// Setting up the query //

const dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/lexion";
const db = spicedPg(dbUrl);

// adding queries //

module.exports.insertImg = function insertImg(userId, url) {
    return db.query(
        `UPDATE users
        SET pic_url=$2
        WHERE id=$1;`,
        [userId, url]
    );
};

module.exports.addUser = function addUser(name, surname, email, password) {
    return db.query(
        `INSERT INTO users (name, surname, email, password, applied, admin)
        VALUES ($1,$2,$3,$4,false,false)
        RETURNING id, name, surname, email;
        `,
        [name, surname, email, password]
    );
};

module.exports.addexternalverb = function addexternalverb(
    type,
    prfword,
    prffirst,
    prfsecond,
    verb,
    example,
    noun,
    particip,
    adjective,
    verbId,
    userId,
    approved,
    dismissed
) {
    return db.query(
        `INSERT INTO externaladditions (userId, type, verbid, prfword, prffirst, prfsecond, verb, example, particip, noun, adjective, approved, dismissed)
        VALUES ($11,
            $1,
            $10,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $12,
            $13);
        `,
        [
            type,
            prfword,
            prffirst,
            prfsecond,
            verb,
            example,
            noun,
            particip,
            adjective,
            verbId,
            userId,
            approved,
            dismissed
        ]
    );
};

module.exports.addVerb = function addVerb(
    haupt,
    neben,
    prefix,
    prfword,
    prffirst,
    prfsecond,
    verb,
    particip,
    noun,
    example,
    adjective,
    final
) {
    return db.query(
        `INSERT INTO verbs (haupt, neben, prefix, prfword, prffirst, prfsecond, verb, example, particip, noun, adjective, finalverb)
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
        $12);
        `,
        [
            haupt,
            neben,
            prefix,
            prfword,
            prffirst,
            prfsecond,
            verb,
            particip,
            noun,
            example,
            adjective,
            final
        ]
    );
};

module.exports.editVerb = function editVerb(
    verbId,
    prfword,
    prffirst,
    prfsecond,
    verb,
    example,
    particip,
    noun,
    adjective,
    final
) {
    return db.query(
        `UPDATE verbs
        SET prfword=$2, prffirst=$3, prfsecond=$4, verb=$5, example=$6, particip=$7, noun=$8, adjective=$9, finalverb=$10
        WHERE id=$1;
        `,
        [
            verbId,
            prfword,
            prffirst,
            prfsecond,
            verb,
            example,
            particip,
            noun,
            adjective,
            final
        ]
    );
};

module.exports.replaceexternalverb = function replaceexternalverb(
    insertionId,
    prfword,
    prffirst,
    prfsecond,
    verb,
    example,
    noun,
    particip,
    adjective
) {
    return db.query(
        `UPDATE externaladditions
        SET prfword=$2, prffirst=$3, prfsecond=$4, verb=$5, example=$6, noun=$7, particip=$8, adjective=$9
        WHERE id=$1;
        `,
        [
            insertionId,
            prfword,
            prffirst,
            prfsecond,
            verb,
            example,
            noun,
            particip,
            adjective
        ]
    );
};

module.exports.findUser = function findUser(email) {
    return db.query(
        `SELECT users.id, name, surname, email, password, created_at
        FROM users
        WHERE email=$1;
        `,
        [email]
    );
};

module.exports.getUsers = function getUsers() {
    return db.query(
        `SELECT users.id, name, surname, email, pic_url, applied, admin, created_at
        FROM users;
        `
    );
};

module.exports.findUserById = function findUserById(id) {
    return db.query(
        `SELECT users.id, name, surname, email, pic_url, password, admin, applied, created_at
        FROM users
        WHERE id=$1;
        `,
        [id]
    );
};

module.exports.getStats = function getStats() {
    return db.query(
        `select
        (select count(haupt) from verbs where haupt=1) as haupt,
        (select count(neben) from verbs where neben=1) as neben,
        (select count(distinct prffirst) from verbs) as prffirst,
        (select count(distinct prfword) from verbs) as prfword
        ;`
    );
};

// searchbar queries ////////////////////////////////

module.exports.getverbsbyvparts = function getverbsbyvparts(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, finalverb
        FROM verbs
        WHERE prfword ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getverbsbyfirstpre = function getverbsbyfirstpre(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, finalverb
        FROM verbs
        WHERE prffirst ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getverbsbysecondpre = function getverbsbysecondpre(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, finalverb
        FROM verbs
        WHERE prfsecond ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getverbsbyverb = function getverbsbyverb(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, finalverb
        FROM verbs
        WHERE verb ILIKE $1;`,
        [val + "%"]
    );
};

module.exports.getverbsbyfullverb = function getverbsbyfullverb(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, finalverb
        FROM verbs
        WHERE finalverb ILIKE $1;`,
        ["%" + val + "%"]
    );
};

module.exports.getmoreById = function getmore(val) {
    return db.query(
        `SELECT prfword, prffirst, prfsecond, verb, example, noun, particip, adjective, finalverb
        FROM verbs
        WHERE id=$1;`,
        [val]
    );
};

module.exports.getunappovedmoreById = function getunappovedmoreById(val) {
    return db.query(
        `SELECT id, prfword, prffirst, prfsecond, verb, example, noun, particip, adjective, created_at
        FROM externaladditions
        WHERE id=$1;`,
        [val]
    );
};

module.exports.getInsertions = function getInsertions(val) {
    return db.query(
        `SELECT id, userId, type, prfword, prffirst, prfsecond, verb, example, noun, particip, adjective, approved, dismissed, created_at
        FROM externaladditions
        WHERE userId=$1;`,
        [val]
    );
};

module.exports.getAllInsertions = function getAllInsertions() {
    return db.query(
        `SELECT id, userId, type, prfword, prffirst, prfsecond, verb, example, noun, particip, adjective, approved, dismissed, created_at
        FROM externaladditions;`
    );
};

module.exports.deleteInsertions = function deleteInsertions(val) {
    return db.query(
        `DELETE FROM externaladditions
       WHERE id=$1;`,
        [val]
    );
};

module.exports.dismissInsertions = function dismissInsertions(val) {
    return db.query(
        `UPDATE externaladditions
        SET dismissed=true
        WHERE id=$1;
        `,
        [val]
    );
};

module.exports.approveInsertions = function approveInsertions(val) {
    return db.query(
        `UPDATE externaladditions
        SET approved=true
        WHERE id=$1
        RETURNING id, userId, verbId, type, prfword, prffirst, prfsecond, verb, example, noun, particip, adjective, approved, dismissed, created_at;
        `,
        [val]
    );
};

module.exports.apply = function apply(val) {
    return db.query(
        `UPDATE users
        SET applied=true
        WHERE id=$1;
        `,
        [val]
    );
};

module.exports.cancelapply = function cancelapply(val) {
    return db.query(
        `UPDATE users
        SET applied=false
        WHERE id=$1;
        `,
        [val]
    );
};

module.exports.acceptApplication = function acceptApplication(val) {
    return db.query(
        `UPDATE users
        SET admin=true
        WHERE id=$1;
        `,
        [val]
    );
};

module.exports.addMessage = function addMessage(name, email, message) {
    return db.query(
        `INSERT INTO messages (name, email, message)
        VALUES ($1,$2,$3);
        `,
        [name, email, message]
    );
};

module.exports.getMessages = function getMessages() {
    return db.query(
        `SELECT name, email, message, created_at
        FROM messages;
        `
    );
};
