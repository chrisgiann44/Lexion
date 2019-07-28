import React from "react";
import { connect } from "react-redux";
import { getUserInfo, acceptApplication, getUsers } from "./actions";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(getUserInfo());
    }

    render() {
        if (this.props.users == undefined) {
            return <div>No users</div>;
        } else {
            return (
                <React.Fragment>
                    <h1> Approval needed for: </h1>
                    <div className="users">
                        <div className="user">
                            <div>
                                <p>UserId</p>
                            </div>
                            <div>
                                <p>Name</p>
                            </div>
                            <div>
                                <p>Surname</p>
                            </div>
                            <div>
                                <p>Member Since:</p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p>Actions</p>
                            </div>
                        </div>
                        {this.props.users &&
                            this.props.users.data.map(result => (
                                <div key={result.id} className="user">
                                    <div>
                                        <p>{result.id}</p>
                                    </div>
                                    <div>
                                        <p>{result.name}</p>
                                    </div>
                                    <div>
                                        <p>{result.surname}</p>
                                    </div>
                                    <div>
                                        <p>
                                            {new Date(
                                                result.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    {result.applied == true &&
                                        result.admin == false && (
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                <button
                                                    style={{
                                                        backgroundColor: "green"
                                                    }}
                                                    data-id={result.id}
                                                    onClick={e => {
                                                        new Promise(() => {
                                                            this.props
                                                                .dispatch(
                                                                    acceptApplication(
                                                                        e.target
                                                                            .dataset
                                                                            .id
                                                                    )
                                                                )
                                                                .then(() => {
                                                                    this.props.dispatch(
                                                                        getUsers()
                                                                    );
                                                                });
                                                        });
                                                    }}
                                                >
                                                    Accept
                                                </button>
                                            </div>
                                        )}
                                    <div style={{ textAlign: "center" }}>
                                        {result.admin && <p>Admin User</p>}
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
    if (state.users) {
        return {
            users: state.users
        };
    } else {
        return state;
    }
};

export default connect(mapStateToProps)(Users);
