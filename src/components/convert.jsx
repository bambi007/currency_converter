import React, { Component } from "react";
import { ReactComponent as Spinner } from "../images/spinner.svg";
import { Result } from "./result";
import { Currency } from "./currency";
import { Ammount } from "./ammount";

export class Convert extends Component {
	state = {
		symbols: null,
		data: null,
		loading: true,
		rates: [],
	};

	async componentDidMount() {
		const apiUrl = `https://api.exchangerate.host/symbols`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		this.setState({
			data: data,
			symbols: data.symbols,
			loading: false,
		});
	}
	render() {
		if (this.state.loading) {
			<div className="app">
				<Spinner />;
			</div>;
		}
		if (!this.state.data) {
			return <div>no data</div>;
		}
		return (
			<div className="convert">
				<span className="heading">Convert</span>
				<Currency
					currency="from"
					defaultValue={this.props.defaultCurrency}
					selectCurrency={this.props.selectCurrency}
					symbols={this.state.symbols}
				/>
				<Ammount value={this.props.value} setAmmount={this.props.setAmmount} />
				<Currency
					currency="to"
					defaultValue="initial"
					symbols={this.state.symbols}
					selectCurrency={this.props.selectTarget}
				/>
				<Result result={this.props.result} />
			</div>
		);
	}
}
