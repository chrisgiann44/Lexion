import React from "react";
import { connect } from "react-redux";
import {
    getAllInsertions,
    getVerbForm,
    getUnapprovedVerbOnScreen,
    dismiss,
    approve,
    getUserInfo
} from "./actions";
import Verbform from "./verbform";
import { CSSTransition } from "react-transition-group";

class Insertions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getUserInfo());
        this.props.dispatch(getAllInsertions());
    }

    render() {
        if (this.props.allinsertions == undefined) {
            return <div>No Insertions by you.</div>;
        } else {
            return (
                <React.Fragment>
                    <h1> Approval needed for: </h1>
                    <div className="allownverbs">
                        <div className="allownverb">
                            <div>
                                <p>Type-UserId</p>
                            </div>
                            <div>
                                <p>Verb</p>
                            </div>
                            <div>
                                <p>Example</p>
                            </div>
                            <div>
                                <p>Noun</p>
                            </div>
                            <div>
                                <p>Adjective</p>
                            </div>
                            <div>
                                <p>Particip</p>
                            </div>
                            <div>
                                <p>Date</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p>Actions</p>
                            </div>
                        </div>
                        {this.props.allinsertions &&
                            this.props.allinsertions.data
                                .sort((a, b) => {
                                    return a.id - b.id;
                                })
                                .map(result => (
                                    <div key={result.id} className="allownverb">
                                        <div>
                                            <p>
                                                {result.type}
                                                {"-"}
                                                {result.userid}
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                {result.prfword}
                                                {result.prffirst}
                                                {result.prfsecond}
                                                {result.verb}
                                            </p>
                                        </div>
                                        <div>
                                            <p>{result.example}</p>
                                        </div>
                                        <div>
                                            <p>{result.noun}</p>
                                        </div>
                                        <div>
                                            <p>{result.adjective}</p>
                                        </div>
                                        <div>
                                            <p>{result.particip}</p>
                                        </div>
                                        <div>
                                            <p>
                                                {new Date(
                                                    result.created_at
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        {!result.approved && !result.dismissed && (
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <button
                                                    style={{
                                                        backgroundColor:
                                                            "yellow"
                                                    }}
                                                    data-id={result.id}
                                                    onClick={e => {
                                                        new Promise(() => {
                                                            this.props
                                                                .dispatch(
                                                                    getUnapprovedVerbOnScreen(
                                                                        e.target
                                                                            .dataset
                                                                            .id
                                                                    )
                                                                )
                                                                .then(() => {
                                                                    this.props.dispatch(
                                                                        getVerbForm(
                                                                            "edit"
                                                                        )
                                                                    );
                                                                });
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    style={{
                                                        backgroundColor:
                                                            "orange"
                                                    }}
                                                    data-id={result.id}
                                                    onClick={e => {
                                                        new Promise(() => {
                                                            this.props
                                                                .dispatch(
                                                                    dismiss(
                                                                        e.target
                                                                            .dataset
                                                                            .id
                                                                    )
                                                                )
                                                                .then(() => {
                                                                    this.props.dispatch(
                                                                        getAllInsertions()
                                                                    );
                                                                });
                                                        });
                                                    }}
                                                >
                                                    Dismiss
                                                </button>

                                                <button
                                                    style={{
                                                        backgroundColor: "green"
                                                    }}
                                                    data-id={result.id}
                                                    data-type={result.type}
                                                    onClick={e => {
                                                        new Promise(() => {
                                                            this.props
                                                                .dispatch(
                                                                    approve(
                                                                        e.target
                                                                            .dataset
                                                                            .id,
                                                                        e.target
                                                                            .dataset
                                                                            .type
                                                                    )
                                                                )
                                                                .then(() => {
                                                                    this.props.dispatch(
                                                                        getAllInsertions()
                                                                    );
                                                                });
                                                        });
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        )}
                                        <div style={{ textAlign: "center" }}>
                                            {result.dismissed && (
                                                <p>Dismissed</p>
                                            )}
                                            {result.approved && <p>Approved</p>}
                                        </div>
                                    </div>
                                ))}
                        <CSSTransition
                            in={this.props.form}
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
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    if (state.user && state.allinsertions) {
        return {
            user: state.user.data,
            form: state.form,
            allinsertions: state.allinsertions
        };
    } else {
        return state;
    }
};

export default connect(mapStateToProps)(Insertions);
