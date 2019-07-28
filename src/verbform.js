import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { closeForm, getInsertions, getAllInsertions } from "./actions";

class Verbform extends React.Component {
    constructor(props) {
        super(props);
        this.prfword = React.createRef();
        this.prffirst = React.createRef();
        this.prfsecond = React.createRef();
        this.verb = React.createRef();
        this.example = React.createRef();
        this.noun = React.createRef();
        this.adjective = React.createRef();
        this.particip = React.createRef();
        this.state = {};
    }

    submit() {
        if (this.state.verb) {
            if (this.props.state.action == "new" || this.props.state.verbId) {
                axios
                    .post("/addexternalverb", {
                        verbId: this.props.state.verbId || null,
                        type: this.props.state.action,
                        data: this.state
                    })
                    .then(() => {
                        this.props.dispatch(getAllInsertions());
                        this.props.dispatch(getInsertions());
                    });
            } else {
                axios
                    .post("/replaceexternalverb", {
                        data: this.state,
                        insertionId: this.props.state.verbtoshow.id
                    })
                    .then(() => {
                        this.props.dispatch(getAllInsertions());
                        this.props.dispatch(getInsertions());
                    });
            }
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
            prfword: this.prfword.current.value,
            prffirst: this.prffirst.current.value,
            prfsecond: this.prfsecond.current.value,
            verb: this.verb.current.value,
            example: this.example.current.value,
            noun: this.noun.current.value,
            adjective: this.adjective.current.value,
            particip: this.particip.current.value
        });
    }

    render() {
        return (
            <div className="form">
                <p
                    style={{
                        cursor: "pointer",
                        textAlign: "right",
                        paddingRight: "20px",
                        fontSize: "1.5em"
                    }}
                    onClick={() => this.props.dispatch(closeForm())}
                >
                    X
                </p>
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Word as Prefix:</label>
                        <input
                            autoFocus
                            ref={this.prfword}
                            name="prfword"
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Word as Prefix:</label>
                        <input
                            autoFocus
                            name="prfword"
                            ref={this.prfword}
                            defaultValue={this.props.state.verbtoshow.prfword}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Preposition as Prefix:</label>
                        <input
                            autoFocus
                            name="prffirst"
                            ref={this.prffirst}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Preposition as Prefix:</label>
                        <input
                            autoFocus
                            name="prffirst"
                            ref={this.prffirst}
                            defaultValue={this.props.state.verbtoshow.prffirst}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">
                            Second Preposition as Prefix:
                        </label>
                        <input
                            autoFocus
                            name="prfsecond"
                            ref={this.prfsecond}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">
                            Second Preposition as Prefix:
                        </label>
                        <input
                            autoFocus
                            name="prfsecond"
                            ref={this.prfsecond}
                            defaultValue={this.props.state.verbtoshow.prfsecond}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Verb:</label>
                        <input
                            autoFocus
                            name="verb"
                            ref={this.verb}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Verb:</label>
                        <input
                            autoFocus
                            name="verb"
                            ref={this.verb}
                            defaultValue={this.props.state.verbtoshow.verb}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Example:</label>
                        <textarea
                            rows="7"
                            cols="50"
                            ref={this.example}
                            autoFocus
                            name="example"
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Example:</label>
                        <textarea
                            rows="7"
                            cols="70"
                            autoFocus
                            ref={this.example}
                            defaultValue={this.props.state.verbtoshow.example}
                            name="example"
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Noun:</label>
                        <input
                            autoFocus
                            name="noun"
                            ref={this.noun}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Noun:</label>
                        <input
                            autoFocus
                            name="noun"
                            ref={this.noun}
                            defaultValue={this.props.state.verbtoshow.noun}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Adjective:</label>
                        <input
                            autoFocus
                            name="adjective"
                            ref={this.adjective}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Adjective:</label>
                        <input
                            autoFocus
                            name="adjective"
                            ref={this.adjective}
                            defaultValue={this.props.state.verbtoshow.adjective}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}

                {this.props.state.action == "new" && (
                    <div>
                        <label htmlFor="name">Particip:</label>
                        <input
                            autoFocus
                            name="particip"
                            ref={this.particip}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}
                {this.props.state.action == "edit" && (
                    <div>
                        <label htmlFor="name">Particip:</label>
                        <input
                            autoFocus
                            name="particip"
                            ref={this.particip}
                            defaultValue={this.props.state.verbtoshow.particip}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>
                )}

                <button
                    onClick={() => {
                        this.props.dispatch(closeForm());
                        this.submit();
                    }}
                >
                    Submit Changes
                </button>
                <p>
                    * your changes will be examined and the table will be
                    updated respectively
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(Verbform);
