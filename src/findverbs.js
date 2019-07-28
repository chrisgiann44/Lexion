import React from "react";
import axios from "./axios";
import { connect } from "react-redux";
import { getVerbOnScreen, currentVerb, askApi2, askApi } from "./actions";

class Findverbs extends React.Component {
    constructor(props) {
        super(props);
        this.vparts = React.createRef();
        this.firstpre = React.createRef();
        this.secondpre = React.createRef();
        this.verb = React.createRef();
        this.fullverb = React.createRef();
        this.state = {};
    }

    handleChange() {
        this.setState({
            vparts: this.vparts.current.value,
            firstpre: this.firstpre.current.value,
            secondpre: this.secondpre.current.value,
            fullverb: this.fullverb.current.value,
            verb: this.verb.current.value
        });
    }

    handleClick(e) {
        this.props.dispatch(getVerbOnScreen(e.target.dataset.id));
        this.props.dispatch(currentVerb(e.target.dataset.id));
        this.props.dispatch(askApi2(e.target.dataset.finalverb));
        this.props.dispatch(askApi(e.target.dataset.finalverb));
        var elements = e.target.parentElement.children;
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove("selected");
        }
        e.target.classList.add("selected");
    }

    componentDidUpdate(prevState, nextState) {
        if (
            nextState.vparts == this.vparts.current.value &&
            nextState.firstpre == this.firstpre.current.value &&
            nextState.secondpre == this.secondpre.current.value &&
            nextState.verb == this.verb.current.value &&
            nextState.fullverb == this.fullverb.current.value
        ) {
            return;
        } else {
            if (this.state.vparts) {
                axios
                    .get(`/getverbsbyvparts/${this.state.vparts}`)
                    .then(res => {
                        this.setState({ results: res.data });
                    });
            }
            if (this.state.firstpre) {
                axios
                    .get(`/getverbsbyfirstpre/${this.state.firstpre}`)
                    .then(res => {
                        this.setState({ results: res.data });
                    });
            }
            if (this.state.secondpre) {
                axios
                    .get(`/getverbsbysecondpre/${this.state.secondpre}`)
                    .then(res => {
                        this.setState({ results: res.data });
                    });
            }
            if (this.state.verb) {
                axios.get(`/getverbsbyverb/${this.state.verb}`).then(res => {
                    this.setState({ results: res.data });
                });
            }
            if (this.state.fullverb) {
                axios
                    .get(`/getverbsbyfullverb/${this.state.fullverb}`)
                    .then(res => {
                        this.setState({ results: res.data });
                    });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="searchbar">
                    <input
                        ref={this.vparts}
                        name="vparts"
                        className="searchinput"
                        onChange={() => {
                            this.firstpre.current.value = "";
                            this.secondpre.current.value = "";
                            this.verb.current.value = "";
                            this.fullverb.current.value = "";
                            this.handleChange();
                        }}
                        placeholder="Various Particles as Prefix"
                    />
                    <input
                        ref={this.firstpre}
                        name="firstpre"
                        className="searchinput"
                        onChange={() => {
                            this.vparts.current.value = "";
                            this.secondpre.current.value = "";
                            this.verb.current.value = "";
                            this.fullverb.current.value = "";
                            this.handleChange();
                        }}
                        placeholder="Preposition as Prefix"
                    />
                    <input
                        ref={this.secondpre}
                        name="secondpre"
                        className="searchinput"
                        onChange={() => {
                            this.vparts.current.value = "";
                            this.firstpre.current.value = "";
                            this.verb.current.value = "";
                            this.fullverb.current.value = "";
                            this.handleChange();
                        }}
                        placeholder="Second Preposition"
                    />
                    <input
                        ref={this.verb}
                        name="verb"
                        className="searchinput"
                        onChange={() => {
                            this.firstpre.current.value = "";
                            this.secondpre.current.value = "";
                            this.vparts.current.value = "";
                            this.fullverb.current.value = "";
                            this.handleChange();
                        }}
                        placeholder="Verb"
                    />
                    <input
                        ref={this.fullverb}
                        name="fullverb"
                        className="searchinput"
                        onChange={() => {
                            this.firstpre.current.value = "";
                            this.verb.current.value = "";
                            this.secondpre.current.value = "";
                            this.vparts.current.value = "";
                            this.handleChange();
                        }}
                        placeholder="FullVerb"
                    />
                </div>
                <div className="resultswindow">
                    <div
                        className="verbscorner"
                        style={{
                            width: "25%",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div className="verbswindow">
                            <div>
                                <h2>
                                    {this.state.results &&
                                        this.state.results.length}{" "}
                                    Verbs
                                </h2>
                            </div>

                            {this.state.results &&
                                this.state.results.map(result => (
                                    <p
                                        style={{ cursor: "pointer" }}
                                        key={result.id}
                                        data-id={result.id}
                                        data-finalverb={result.finalverb}
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        {result.prfword}
                                        {result.prffirst}
                                        {result.prfsecond}
                                        {result.verb}
                                    </p>
                                ))}
                        </div>
                        <div
                            className="synonymswindow"
                            style={{ marginTop: "30px" }}
                        >
                            <div>
                                <div>
                                    <h2>
                                        {this.props.state.synonyms &&
                                            this.props.state.synonyms.terms
                                                .length}{" "}
                                        Synonyms
                                    </h2>
                                    <h3>
                                        from{" "}
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="https://www.openthesaurus.de"
                                        >
                                            {" "}
                                            Openthesaurus
                                        </a>
                                    </h3>
                                </div>

                                {this.props.state.synonyms &&
                                    this.props.state.synonyms.terms.map(
                                        result => (
                                            <p key={result.term}>
                                                {result.term}
                                            </p>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="middlewindow">
                        <div className="exampleswindow">
                            <h2
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                Examples in GE{" "}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.verb &&
                                    "of"}{" "}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prfword}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prffirst}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prfsecond}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.verb}
                            </h2>
                            {this.props.state.verbtoshow && (
                                <div>
                                    <p style={{ lineHeight: "20px" }}>
                                        {this.props.state.verbtoshow.example !=
                                            "" &&
                                            this.props.state.verbtoshow.example}
                                        {this.props.state.verbtoshow.example ==
                                            "" && "No example yet"}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div
                            className="transswindow"
                            style={{ borderTop: "1px solid black" }}
                        >
                            <h2
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                Translation in EN{" "}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.verb &&
                                    "of"}{" "}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prfword}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prffirst}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.prfsecond}
                                {this.props.state.verbtoshow &&
                                    this.props.state.verbtoshow.verb}
                            </h2>
                            <h3
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                from{" "}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.pons.de"
                                >
                                    {" "}
                                    Pons
                                </a>
                            </h3>
                            {this.props.state.translations &&
                                this.props.state.translations.map(result => (
                                    <p key={result.target}>
                                        {result.target.slice(
                                            0,
                                            result.target.indexOf("<")
                                        )}
                                    </p>
                                ))}
                        </div>
                    </div>
                    <div className="morereulultswindow">
                        <div className="more">
                            <h2
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                Noun
                            </h2>
                            {this.props.state.verbtoshow && (
                                <p style={{ lineHeight: "20px" }}>
                                    {this.props.state.verbtoshow.noun != "" &&
                                        this.props.state.verbtoshow.noun}
                                    {this.props.state.verbtoshow.noun == "" &&
                                        "No example yet"}
                                </p>
                            )}
                        </div>
                        <div className="more">
                            <h2
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                Adjective
                            </h2>
                            {this.props.state.verbtoshow && (
                                <p style={{ lineHeight: "20px" }}>
                                    {this.props.state.verbtoshow.adjective !=
                                        "" &&
                                        this.props.state.verbtoshow.adjective}
                                    {this.props.state.verbtoshow.adjective ==
                                        "" && "No example yet"}
                                </p>
                            )}
                        </div>
                        <div className="more">
                            <h2
                                style={{
                                    paddingLeft: "5px",
                                    paddingBottom: "5px "
                                }}
                            >
                                Particip
                            </h2>
                            {this.props.state.verbtoshow && (
                                <p style={{ lineHeight: "20px" }}>
                                    {this.props.state.verbtoshow.particip !=
                                        "" &&
                                        this.props.state.verbtoshow.particip}
                                    {this.props.state.verbtoshow.particip ==
                                        "" && "No example yet"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        state
    };
};

export default connect(mapStateToProps)(Findverbs);
