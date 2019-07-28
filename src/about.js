import React from "react";

export class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    fontSize: "30px",
                    paddingTop: "20%",
                    textAlign: "center"
                }}
            >
                This Page was created by a fun of the german Verbs. Please Login
                in order to add your verbs or use the contact form in order to
                contact me.
            </div>
        );
    }
}
