import React from "react";
import { connect } from "react-redux";
import {
    getInsertions,
    getVerbForm,
    getUnapprovedVerbOnScreen,
    deleteInsertions
} from "./actions";
import Verbform from "./verbform";
import { CSSTransition } from "react-transition-group";

class Myverbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getInsertions());
    }

    render() {
        if (this.props.state.insertions == undefined) {
            return <div>No Insertions by you.</div>;
        } else {
            return (
                <React.Fragment>
                    <h1> NEW verbs added by you and their status </h1>
                    <div className="ownverbs">
                        <div className="ownverb">
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
                            <div>
                                <p>Status</p>
                            </div>
                            <div>
                                <p>Actions</p>
                            </div>
                        </div>
                        {this.props.state.insertions &&
                            this.props.state.insertions.data
                                .filter(result => result.type == "new")
                                .sort((a, b) => {
                                    return a.id - b.id;
                                })
                                .map(result => (
                                    <div key={result.id} className="ownverb">
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
                                        <div>
                                            {!result.approved &&
                                                !result.dismissed && (
                                                    <p>Pending</p>
                                                )}
                                            {result.approved && <p>Approved</p>}
                                            {result.dismissed && (
                                                <p>Dismissed</p>
                                            )}
                                        </div>
                                        {!result.approved && !result.dismissed && (
                                            <div>
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
                                                        backgroundColor: "red"
                                                    }}
                                                    data-id={result.id}
                                                    onClick={e => {
                                                        this.props.dispatch(
                                                            deleteInsertions(
                                                                e.target.dataset
                                                                    .id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
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
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(Myverbs);
