import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class Regis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit() {
        const regex = /[a-z]+@+[a-z]+.+[a-z]/i;

        if (!this.state.email.match(regex)) {
            this.setState({
                error: "Oops! Something went wrong, please check your input!"
            });
        } else {
            axios
                .post("/register", {
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    password: this.state.password
                })
                .then(({ data }) => {
                    if (data.userId) {
                        location.href = "/in";
                    } else if (data.error) {
                        this.setState({
                            error:
                                "Oops! Something went wrong, please try again!"
                        });
                    }
                });
        }
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div className="RegForm">
                <p
                    style={{
                        position: "absolute",
                        top: "4%",
                        left: "30%",
                        color: "red"
                    }}
                >
                    {this.state.error}{" "}
                </p>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="surname"
                    placeholder="Surname"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Register</button>
                <p>
                    Already a member? <Link to="/welcome"> Login</Link>
                </p>
            </div>
        );
    }
}
