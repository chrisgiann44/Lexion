import React from "react";
import { ProfilePic } from "./profilepic";
import { connect } from "react-redux";
import { Uploader } from "./uploader";
import { CSSTransition } from "react-transition-group";
import { getUserInfo, apply, cancelapply } from "./actions";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			uploaderVisible: false
		};
	}

	render() {
		if (!this.props.state.user) {
			return null;
		} else {
			return (
				<div className="personaldata">
					<div>
						<ProfilePic
							imageUrl={
								this.props.state.user.data.pic_url ||
								"/placeholder.gif"
							}
							surname={this.props.state.user.data.surname}
							name={this.props.state.user.data.name}
							clickHandler={() => {
								if (this.state.uploaderVisible) {
									this.setState({
										uploaderVisible: false
									});
								} else {
									this.setState({
										uploaderVisible: true
									});
								}
							}}
						/>
					</div>
					<p>
						<strong>Name: </strong>
						{this.props.state.user.data.name}
					</p>
					<p>
						<strong>Surname: </strong>
						{this.props.state.user.data.surname}
					</p>
					<p>
						<strong>Member since: </strong>
						{new Date(
							this.props.state.user.data.created_at
						).toLocaleString()}
					</p>
					{this.props.state.user.data.admin && (
						<p>
							<strong>Admin: </strong>
							Yes
						</p>
					)}
					{!this.props.state.user.data.admin &&
						!this.props.state.user.data.applied && (
							<button
								style={{
									backgroundColor: "orange"
								}}
								data-id={this.props.state.user.data.id}
								onClick={e => {
									new Promise(() => {
										this.props
											.dispatch(
												apply(e.target.dataset.id)
											)
											.then(() => {
												this.props.dispatch(
													getUserInfo()
												);
											});
									});
								}}
							>
								Apply for admin rights
							</button>
						)}
					{this.props.state.user.data.applied == true &&
						this.props.state.user.data.admin == false && (
							<button
								style={{
									backgroundColor: "red"
								}}
								data-id={this.props.state.user.data.id}
								onClick={e => {
									new Promise(() => {
										this.props
											.dispatch(
												cancelapply(e.target.dataset.id)
											)
											.then(() => {
												this.props.dispatch(
													getUserInfo()
												);
											});
									});
								}}
							>
								Cancel Application
							</button>
						)}
					<CSSTransition
						in={this.state.uploaderVisible}
						timeout={1000}
						classNames="uploader"
						mountOnEnter
						appear
						unmountOnExit
					>
						<div className="uploader">
							<Uploader
								changeImage={() =>
									this.props.dispatch(getUserInfo())
								}
								clickHandler={() => {
									if (this.state.uploaderVisible) {
										this.setState({
											uploaderVisible: false
										});
									} else {
										this.setState({
											uploaderVisible: true
										});
									}
								}}
							/>
						</div>
					</CSSTransition>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		state
	};
};

export default connect(mapStateToProps)(Profile);
