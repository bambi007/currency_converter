import React, { Component } from "react";

export class Currency extends Component {
	render() {
		return (
			<div className="row">
				<label htmlFor={this.props.currency}>{this.props.currency}</label>
				<div className="custom-select">
					<select
						name={this.props.currency}
						id={this.props.currency}
						defaultValue={this.props.defaultValue}
						onChange={this.props.selectCurrency}
					>
						<option disabled value="initial" style={{ display: "none" }}>
							select an option
						</option>
						{Object.keys(this.props.symbols).map((element) => (
							<option value={element} key={element}>
								{element} {this.props.symbols[element].description}
							</option>
						))}
					</select>
				</div>
			</div>
		);
	}
}
