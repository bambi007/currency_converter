import React, { Component } from "react";

export class Ammount extends Component {
	render() {
		return (
			<div className="row">
				<label htmlFor="ammount">Ammount</label>
				<input
					type="text"
					name="ammount"
					id="ammount"
					value={this.props.value}
					onKeyPress={(event) => {
						if (!/[0-9]/.test(event.key)) {
							event.preventDefault();
						}
					}}
					onChange={this.props.setAmmount}
				/>
			</div>
		);
	}
}
