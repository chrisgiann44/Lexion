import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Login } from "./login";
import Logout from "./logout";
import Users from "./users";
import Messages from "./messages";
import Verbform from "./verbform";
import Myverbs from "./myverbs";
import Insertions from "./insertions";
import Mycorrections from "./mycorrections";
import { Regis } from "./register";
import Contact from "./contact";
import { About } from "./about";
import Profile from "./profile";
import Findverbs from "./findverbs";
import {
    getStats,
    getUserInfo,
    getVerbForm,
    getInsertions,
    getAllInsertions,
    getUsers
} from "./actions";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getInsertions());
        this.props.dispatch(getAllInsertions());
        this.props.dispatch(getStats());
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getVerbForm());
        this.props.dispatch(getUsers());
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <div className="bar">
                        <Route
                            render={({ history }) => (
                                <div
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    className="miniprof"
                                    onClick={() => {
                                        if (this.props.state.user.data.id) {
                                            history.push("/in");
                                        } else {
                                            history.push("/welcome");
                                        }
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "200px",
                                            height: "100%"
                                        }}
                                        src="./logo.png"
                                    />
                                </div>
                            )}
                        />
                        <div className="logregarea">
                            <Route
                                render={({ location }) => {
                                    switch (location.pathname) {
                                        case "/welcome":
                                            return <Login />;
                                        case "/register":
                                            return <Regis />;
                                        case "/contact":
                                            if (this.props.state.user.data.id) {
                                                return <Logout />;
                                            } else {
                                                return <Login />;
                                            }
                                        case "/about":
                                            if (this.props.state.user.data.id) {
                                                return <Logout />;
                                            } else {
                                                return <Login />;
                                            }
                                        case "/in":
                                            return <Logout />;
                                        case "/profile":
                                            return <Logout />;
                                        case "/myverbs":
                                            return <Logout />;
                                        case "/mycorrections":
                                            return <Logout />;
                                        case "/insertions":
                                            return <Logout />;
                                        case "/users":
                                            return <Logout />;
                                        case "/messages":
                                            return <Logout />;
                                        default:
                                            return <div />;
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="statsarea">
                        {this.props.state.stats && (
                            <div className="stats">
                                <strong>
                                    {this.props.state.stats.data.neben}
                                </strong>{" "}
                                verbs derived by{" "}
                                <strong>
                                    {this.props.state.stats.data.haupt}
                                </strong>{" "}
                                main verbs which are combined with{" "}
                                <strong>
                                    {this.props.state.stats.data.prffirst}
                                </strong>{" "}
                                prepositions or{" "}
                                <strong>
                                    {this.props.state.stats.data.prfword}
                                </strong>{" "}
                                other particles.
                            </div>
                        )}
                    </div>
                    <div>
                        <Route
                            render={({ location }) => {
                                if (location.pathname == "/in") {
                                    return (
                                        <div>
                                            <CSSTransition
                                                in={this.props.state.verbId}
                                                timeout={1000}
                                                classNames="btn"
                                                mountOnEnter
                                                appear
                                                unmountOnExit
                                            >
                                                <button
                                                    className="btn btn1"
                                                    onClick={() =>
                                                        this.props.dispatch(
                                                            getVerbForm("edit")
                                                        )
                                                    }
                                                >
                                                    Edit this Verb
                                                </button>
                                            </CSSTransition>
                                            <CSSTransition
                                                in={this.props.state.user}
                                                timeout={1000}
                                                classNames="btn"
                                                mountOnEnter
                                                appear
                                                unmountOnExit
                                            >
                                                <button
                                                    className="btn btn2"
                                                    onClick={() =>
                                                        this.props.dispatch(
                                                            getVerbForm("new")
                                                        )
                                                    }
                                                >
                                                    Add a new Verb
                                                </button>
                                            </CSSTransition>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            }}
                        />
                    </div>
                    <div className="searcharea">
                        <Route
                            render={({ location }) => {
                                switch (location.pathname) {
                                    case "/about":
                                        return <About />;
                                    case "/contact":
                                        return <Contact />;
                                    case "/in":
                                        return <Findverbs />;
                                    case "/register":
                                        return <Findverbs />;
                                    case "/welcome":
                                        return <Findverbs />;
                                    case "/":
                                        return <Findverbs />;
                                    case "/profile":
                                        return <Profile />;
                                    case "/myverbs":
                                        return <Myverbs />;
                                    case "/mycorrections":
                                        return <Mycorrections />;
                                    case "/insertions":
                                        return <Insertions />;
                                    case "/users":
                                        return <Users />;
                                    case "/messages":
                                        return <Messages />;
                                    default:
                                        return <div />;
                                }
                            }}
                        />
                    </div>
                    <CSSTransition
                        in={this.props.state.form}
                        timeout={1000}
                        classNames="verbform"
                        mountOnEnter
                        appear
                        unmountOnExit
                    >
                        <div className="verform">
                            <Verbform />
                        </div>
                    </CSSTransition>
                    <div className="foot">
                        <Link
                            to={"/contact"}
                            style={{ textDecoration: "none" }}
                        >
                            <p>Contact Us &nbsp;</p>
                        </Link>
                        <Link to={"/about"} style={{ textDecoration: "none" }}>
                            <p>About</p>
                        </Link>
                    </div>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(App);
