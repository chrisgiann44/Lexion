import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { getMessages } from "./actions";
import { CSSTransition } from "react-transition-group";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.email = React.createRef();
        this.message = React.createRef();
        this.state = {};
    }

    submit() {
        axios
            .post("/sendmessage", {
                name: this.state.name || null,
                email: this.state.email,
                message: this.state.message
            })
            .then(() => {
                this.name.current.value = "";
                this.email.current.value = "";
                this.message.current.value = "";
                this.setState({ shortmassage: true });
                setTimeout(function() {
                    this.setState({ shortmassage: false });
                }, 1000);
                this.props.dispatch(getMessages());
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1> Contact the Administrators of the page here.</h1>
                <input
                    style={{
                        marginBottom: "20px",
                        width: "200px",
                        height: "20px",
                        fontSize: "18px"
                    }}
                    ref={this.name}
                    autoFocus
                    name="name"
                    placeholder="Name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    style={{
                        marginBottom: "20px",
                        width: "200px",
                        height: "20px",
                        fontSize: "18px"
                    }}
                    ref={this.email}
                    autoFocus
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e)}
                />
                <textarea
                    style={{
                        marginBottom: "20px",
                        fontSize: "18px"
                    }}
                    autoFocus
                    ref={this.message}
                    rows="7"
                    cols="70"
                    name="message"
                    placeholder="Message"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Send</button>
                <CSSTransition
                    in={this.state.shortmassage}
                    out={!this.state.shortmassage}
                    timeout={2000}
                    classNames="shortmassage"
                    mountOnEnter
                    appear
                    unmountOnExit
                >
                    <div>
                        <h1>Message Sent</h1>
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    };
};

export default connect(mapStateToProps)(Contact);
