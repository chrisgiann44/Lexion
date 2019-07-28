import React from "react";
import { connect } from "react-redux";
import { getMessages } from "./actions";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getMessages());
    }

    render() {
        if (this.props.messages == undefined) {
            return <div>No users</div>;
        } else {
            return (
                <React.Fragment>
                    <h1> Messages </h1>
                    <div className="messages">
                        <div className="message">
                            <div>
                                <p>Name</p>
                            </div>
                            <div>
                                <p>email</p>
                            </div>
                            <div>
                                <p>Message</p>
                            </div>
                            <div>
                                <p>Date:</p>
                            </div>
                        </div>
                        {this.props.messages &&
                            this.props.messages.data.map(result => (
                                <div
                                    key={result.created_at}
                                    className="message"
                                >
                                    <div>
                                        <p>{result.name}</p>
                                    </div>
                                    <div>
                                        <p>{result.email}</p>
                                    </div>
                                    <div>
                                        <p>{result.message}</p>
                                    </div>
                                    <div>
                                        <p>
                                            {new Date(
                                                result.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => {
    if (state.messages) {
        return {
            messages: state.messages
        };
    } else {
        return state;
    }
};

export default connect(mapStateToProps)(Messages);
