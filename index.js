const express = require("express");
const https = require("https");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 mylexion.herokuapp.com:*"
}); //should be changed if deployed to HEROKU

const db = require("./utils/db");
const bc = require("./utils/bc");
const compression = require("compression");
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 7
});
const bodyParser = require("body-parser");
const csurf = require("csurf");

// Amazon Server
const s3 = require("./s3");

// code we need to name and upload file
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  App Use
app.use(compression());
app.use(express.static("./public"));
app.use(express.json());
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//only 2 servers with proxy in dev, in prodution it reads bundle.js
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//Routs

///////////////// POST REQUESTS ////////////////////////////////////

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    let imageUrl = "https://s3.amazonaws.com/chrisgiann44/" + req.file.filename;
    db.insertImg(req.session.userId, imageUrl);
    res.json({ imageUrl: imageUrl });
});

app.post("/register", function(req, res) {
    let { name, surname, email, password } = req.body;
    bc.hashPassword(password)
        .then(hashedPassword => {
            db.addUser(name, surname, email, hashedPassword)
                .then(resp => {
                    req.session.userId = resp.rows[0].id;
                    res.json({ userId: resp.rows[0].id });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ error: true });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.post("/login", function(req, res) {
    let { email, password } = req.body;
    db.findUser(email)
        .then(resp =>
            bc
                .checkPassword(password, resp.rows[0].password)
                .then(doesMatch => {
                    if (!doesMatch) {
                        res.json({ error: true });
                    } else {
                        req.session.userId = resp.rows[0].id;
                        res.json({ userId: resp.rows[0].id });
                    }
                })
        )
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.post("/sendmessage", function(req, res) {
    let { email, name, message } = req.body;
    db.addMessage(name, email, message).then(() => res.end());
});

app.post("/addexternalverb", function(req, res) {
    let verbId = req.body.verbId;
    let action = req.body.type;
    let prfword = req.body.data.prfword;
    let prffirst = req.body.data.prffirst;
    let prfsecond = req.body.data.prfsecond;
    let verb = req.body.data.verb;
    let example = req.body.data.example;
    let noun = req.body.data.noun;
    let particip = req.body.data.particip;
    let adjective = req.body.data.adjective;

    db.addexternalverb(
        action,
        prfword,
        prffirst,
        prfsecond,
        verb,
        example,
        noun,
        particip,
        adjective,
        verbId,
        req.session.userId,
        false,
        false
    )
        .then(() => res.json({ data: "success" }))
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

app.post("/replaceexternalverb", function(req, res) {
    let insertionId = req.body.insertionId;
    let prfword = req.body.data.prfword;
    let prffirst = req.body.data.prffirst;
    let prfsecond = req.body.data.prfsecond;
    let verb = req.body.data.verb;
    let example = req.body.data.example;
    let noun = req.body.data.noun;
    let particip = req.body.data.particip;
    let adjective = req.body.data.adjective;

    db.replaceexternalverb(
        insertionId,
        prfword,
        prffirst,
        prfsecond,
        verb,
        example,
        noun,
        particip,
        adjective
    )
        .then(() => res.json({ data: "success" }))
        .catch(err => {
            console.log(err);
            res.json({ error: true });
        });
});

///////////////// GET REQUESTS ////////////////////////////////////

app.get("/getstats", function(req, res) {
    db.getStats().then(data => res.json(data.rows[0]));
});

app.get("/getverbs", function(req, res) {
    db.getStats().then(data => res.json(data.rows[0]));
});

app.get("/getmessages", function(req, res) {
    db.getMessages().then(data => res.json(data.rows));
});

app.get("/getusers", function(req, res) {
    db.getUsers().then(data => res.json(data.rows));
});

app.get("/getuserinfo", function(req, res) {
    db.findUserById(req.session.userId).then(data => {
        res.json(data.rows[0]);
    });
});

app.get("/apply", function(req, res) {
    db.apply(req.query.id).then(data => {
        res.json(data.rows[0]);
    });
});

app.get("/pons", function(req, res) {
    const options = {
        hostname: "api.pons.com",
        path: `/v1/dictionary?q=${req.query.verb}&l=deen&in=de&fm=1&ref=true`,
        method: "GET",
        port: 443,
        headers: {
            "X-Secret":
                "269376c7686baf2258ac73729fdc4fb07d0930de035947409593141679673388"
        }
    };

    const request = https.request(options, response => {
        var responseData = "";

        response.setEncoding("utf8");

        response.on("data", chunk => {
            responseData += chunk;
        });

        response.on("end", function() {
            res.json(responseData);
        });
    });

    request.on("error", e => {
        console.error(e);
    });

    request.end();
});

app.get("/cancelapply", function(req, res) {
    db.cancelapply(req.query.id).then(data => {
        res.json(data.rows[0]);
    });
});

app.get("/acceptapplication", function(req, res) {
    db.acceptApplication(req.query.id).then(data => {
        res.json(data.rows[0]);
    });
});

app.get("/getinsertions", function(req, res) {
    db.getInsertions(req.session.userId).then(data => {
        res.json(data.rows);
    });
});

app.get("/getallinsertions", function(req, res) {
    db.getAllInsertions().then(data => {
        res.json(data.rows);
    });
});

app.get("/deleteinsertions", function(req, res) {
    db.deleteInsertions(req.query.id).then(() => res.end());
});

app.get("/dismiss", function(req, res) {
    db.dismissInsertions(req.query.id).then(() => res.end());
});

app.get("/approve", function(req, res) {
    if (req.query.type == "new") {
        db.approveInsertions(req.query.id).then(data => {
            let prfword = data.rows[0].prfword;
            let prffirst = data.rows[0].prffirst;
            let prfsecond = data.rows[0].prfsecond;
            let verb = data.rows[0].verb;
            let example = data.rows[0].example;
            let noun = data.rows[0].noun;
            let particip = data.rows[0].particip;
            let adjective = data.rows[0].adjective;
            let final = prfword + prffirst + prfsecond + verb;

            if (prfword == "" && prffirst == "" && prfsecond == "") {
                let haupt = 1;
                let neben = 0;
                db.addVerb(
                    haupt,
                    neben,
                    0,
                    prfword,
                    prffirst,
                    prfsecond,
                    verb,
                    example,
                    particip,
                    noun,
                    adjective,
                    final
                );
            } else {
                let haupt = 0;
                let neben = 1;
                db.addVerb(
                    haupt,
                    neben,
                    0,
                    prfword,
                    prffirst,
                    prfsecond,
                    verb,
                    example,
                    particip,
                    noun,
                    adjective,
                    final
                );
            }
            res.end();
        });
    } else {
        db.approveInsertions(req.query.id).then(data => {
            let verbId = data.rows[0].verbid;
            let prfword = data.rows[0].prfword;
            let prffirst = data.rows[0].prffirst;
            let prfsecond = data.rows[0].prfsecond;
            let verb = data.rows[0].verb;
            let example = data.rows[0].example;
            let noun = data.rows[0].noun;
            let particip = data.rows[0].particip;
            let adjective = data.rows[0].adjective;
            let final = prfword + prffirst + prfsecond + verb;

            db.editVerb(
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
            );
        });
        res.end();
    }
});

// searchbar routes ////////////////////////////////

app.get("/getverbsbyvparts/:val", function(req, res) {
    db.getverbsbyvparts(req.params.val).then(data => {
        res.json(data.rows);
    });
});

app.get("/getverbsbyfirstpre/:val", function(req, res) {
    db.getverbsbyfirstpre(req.params.val).then(data => {
        res.json(data.rows);
    });
});

app.get("/getverbsbysecondpre/:val", function(req, res) {
    db.getverbsbysecondpre(req.params.val).then(data => {
        res.json(data.rows);
    });
});

app.get("/getverbsbyverb/:val", function(req, res) {
    db.getverbsbyverb(req.params.val).then(data => {
        res.json(data.rows);
    });
});

app.get("/getverbsbyfullverb/:val", function(req, res) {
    db.getverbsbyfullverb(req.params.val).then(data => {
        res.json(data.rows);
    });
});

// examples and others route ////////////////////

app.get("/getmore", function(req, res) {
    db.getmoreById(req.query.id).then(data => res.json(data.rows[0]));
});

app.get("/getmoreunapproved", function(req, res) {
    db.getunappovedmoreById(req.query.id).then(data => res.json(data.rows[0]));
});
// other routes ////////////////////////////////

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/in");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

// our server listens
if (require.main == module) {
    server.listen(process.env.PORT || 8080, () =>
        console.log("Server is listening...")
    );
}

// Socket EVENT Handling
io.on("connection", socket => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
});
