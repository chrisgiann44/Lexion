import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.user) {
            return null;
        } else {
            return (
                <div className="lgtarea">
                    <div
                        className="links"
                        style={{
                            width: "100%",
                            paddingTop: "2.7vh",
                            paddingRight: "30px"
                        }}
                    >
                        <Link
                            style={{
                                textDecoration: "none"
                            }}
                            to="/in"
                        >
                            Home
                        </Link>
                        {this.props.user.data.admin && (
                            <Link
                                style={{
                                    backgroundColor: "orange",
                                    textDecoration: "none"
                                }}
                                to="/messages"
                            >
                                {this.props.allinsertions && (
                                    <span className="adminlogo num">admin</span>
                                )}
                                Messages
                            </Link>
                        )}
                        {this.props.user.data.admin && (
                            <Link
                                style={{
                                    backgroundColor: "orange",
                                    textDecoration: "none"
                                }}
                                to="/users"
                            >
                                {this.props.allinsertions && (
                                    <span className="adminlogo num">admin</span>
                                )}
                                Users
                            </Link>
                        )}
                        {this.props.user.data.admin && (
                            <Link
                                style={{
                                    backgroundColor: "orange",
                                    textDecoration: "none"
                                }}
                                to="/insertions"
                            >
                                {this.props.allinsertions && (
                                    <span className="mycor num">
                                        {this.props.pending || 0}
                                    </span>
                                )}
                                {this.props.allinsertions && (
                                    <span className="adminlogo num">admin</span>
                                )}
                                New Insertions
                            </Link>
                        )}
                        <Link
                            style={{
                                textDecoration: "none"
                            }}
                            to="/profile"
                        >
                            My Profile
                        </Link>
                        <Link
                            style={{
                                textDecoration: "none"
                            }}
                            to="/myverbs"
                        >
                            {this.props && (
                                <span className="myver num">
                                    {this.props.ver || 0}
                                </span>
                            )}
                            My Verbs
                        </Link>
                        <Link
                            style={{
                                textDecoration: "none"
                            }}
                            to="/mycorrections"
                        >
                            {this.props && (
                                <span className="mycor num">
                                    {this.props.corr || 0}
                                </span>
                            )}
                            My Corrections
                        </Link>
                        <a
                            style={{
                                textDecoration: "none"
                            }}
                            href="/logout"
                        >
                            Logout
                        </a>
                    </div>
                    <div className="minipic">
                        <Route
                            render={({ history }) => (
                                <img
                                    onClick={() => history.push("/profile")}
                                    style={{
                                        marginTop: "2%",
                                        cursor: "pointer",
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid black"
                                    }}
                                    src={
                                        this.props.user.data.pic_url ||
                                        "./placeholder.gif"
                                    }
                                />
                            )}
                        />
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    if (state.insertions && state.allinsertions) {
        let verbs =
            state.insertions.data.filter(
                result =>
                    result.type == "new" &&
                    result.dismissed == false &&
                    result.approved == false
            ) || 0;
        let corr =
            state.insertions.data.filter(
                result =>
                    result.type == "edit" &&
                    result.dismissed == false &&
                    result.approved == false
            ) || 0;
        let pending =
            state.allinsertions.data.filter(
                result => result.dismissed == false && result.approved == false
            ) || 0;
        return {
            user: state.user,
            ver: verbs.length,
            corr: corr.length,
            pending: pending.length,
            allinsertions: state.allinsertions
        };
    } else {
        return state;
    }
};

export default connect(mapStateToProps)(Logout);
