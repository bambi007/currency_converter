import React, { Component } from "react";
import "./css/style.css";
import { ReactComponent as Spinner } from "./images/spinner.svg";

import { Header } from "./components/header";
import { Convert } from "./components/convert";
import { Footer } from "./components/footer";
class App extends Component {
	state = {
		loading: true,
		data: null,
		defaultCurrency: "PLN",
		rates: null,
		convertValue: 1,
		convertTarget: null,
	};

	selectDefaultCurrency(event) {
		this.setState({
			defaultCurrency: event.target.value,
		});
	}

	setConvertValue(event) {
		this.setState({
			convertValue: event.target.value,
		});
	}
	setConvertTarget(event) {
		this.setState({
			convertTarget: event.target.value,
		});
	}

	async componentDidMount() {
		const apiUrl = `https://api.exchangerate.host/data?base=${this.state.defaultCurrency}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		this.setState({
			data: data,
			defaultCurrency: data.base,
			rates: data.rates,
			loading: false,
		});
	}

	getSnapshotBeforeUpdate(prevState) {
		if (prevState.defaultCurrency !== this.state.defaultCurrency) {
			const snapshot = this.state.defaultCurrency;
			return snapshot;
		}
		return null;
	}

	async componentDidUpdate(prevProps, snapshot) {
		if (snapshot.defaultCurrency !== this.state.defaultCurrency) {
			const apiUrl = `https://api.exchangerate.host/data?base=${this.state.defaultCurrency}`;
			const response = await fetch(apiUrl);
			const data = await response.json();
			this.setState({
				data: data,
				defaultCurrency: data.base,
				rates: data.rates,
				loading: true,
			});
		}
	}

	render() {
		if (this.state.loading) {
			<div className="app">
				<Spinner />;
			</div>;
		}
		if (!this.state.data) {
			return <div className="app">no data</div>;
		}

		console.log(
			"Conversion:",
			"\n",
			"currency:",
			this.state.defaultCurrency,
			"\n",
			"currency rate:",
			this.state.data.rates[this.state.defaultCurrency],
			"\n",
			"convert value:",
			this.state.convertValue,
			"\n",
			"target currency:",
			this.state.convertTarget,
			"\n",
			"target currency rate:",
			this.state.data.rates[this.state.convertTarget],
			"\n",
			"Conversion result:",
			this.state.data.rates[this.state.convertTarget] *
				(this.state.data.rates[this.state.defaultCurrency] * this.state.convertValue),
			"\n"
		);

		return (
			<div className="app">
				<Header
					defaultCurrency={this.state.defaultCurrency}
					symbols={this.state.rates}
					onChange={this.selectDefaultCurrency.bind(this)}
				/>
				<Convert
					defaultCurrency={this.state.defaultCurrency}
					symbols={this.state.rates}
					selectCurrency={this.selectDefaultCurrency.bind(this)}
					value={this.state.convertValue}
					setAmmount={this.setConvertValue.bind(this)}
					selectTarget={this.setConvertTarget.bind(this)}
					result={
						this.state.convertTarget
							? this.state.data.rates[this.state.convertTarget] *
							  (this.state.data.rates[this.state.defaultCurrency] * this.state.convertValue)
							: ""
					}
				/>
				<Footer />
			</div>
		);
	}
}

export default App;
