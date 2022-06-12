import React, { Component } from "react";

export class Result extends Component {
	render() {
		return (
			<div className="row">
				<label htmlFor="output">result</label>
				<input id="output" type="text" value={this.props.result} disabled />
			</div>
		);
	}
}
