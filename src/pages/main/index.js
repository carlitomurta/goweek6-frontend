import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import './styles.css';

export default class main extends Component {
	state = {
		newBox: ''
	};
	handleInputChange = e => {
		this.setState({ newBox: e.target.value });
	};

	handleSubmit = async e => {
		e.preventDefault();

		const resp = await api.post('/boxes', { title: this.state.newBox });
		this.props.history.push(`/box/${resp.data._id}`);
		console.log(resp.data);
	};

	render() {
		return (
			<div id="main-container">
				<form onSubmit={this.handleSubmit}>
					<img src={logo} alt="" />
					<input
						placeholder="Criar um Box"
						value={this.state.newBox}
						onChange={this.handleInputChange}
					/>
					<button type="submit">Criar</button>
				</form>
			</div>
		);
	}
}
