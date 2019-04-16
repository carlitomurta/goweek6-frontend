import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';
import './styles.css';

export default class box extends Component {
	state = {
		box: {}
	};
	async componentDidMount() {
		this.subscribeToNewFiles();

		const box = this.props.match.params.id;
		const resp = await api.get(`boxes/${box}`);
		this.setState({ box: resp.data });
	}

	subscribeToNewFiles = () => {
		const box = this.props.match.params.id;
		const io = socket('https://goweek6-backend.herokuapp.com');
		io.emit('connectRoom', box);

		io.on('file', data => {
			this.setState({
				box: { ...this.state.box, files: [data, ...this.state.box.files] }
			});
		});
	};

	handleUpload = files => {
		files.forEach(file => {
			const data = new FormData();
			const box = this.props.match.params.id;
			data.append('file', file);
			api.post(`boxes/${box}/files`, data);
		});
	};

	render() {
		const { title, files } = this.state.box;
		return (
			<div id="box-container">
				<header>
					<img width={80} height={80} src={logo} alt="" />
					<h1>{title}</h1>
				</header>
				<Dropzone onDropAccepted={this.handleUpload}>
					{({ getRootProps, getInputProps }) => (
						<div className="upload" {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Arraste arquivos ou clique aqui</p>
						</div>
					)}
				</Dropzone>
				<ul>
					{files &&
						files.map(file => (
							<li key={file._id}>
								<a
									className="fileInfo"
									href={file.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									<MdInsertDriveFile size={24} color="#A5Cfff" />
									<strong>{file.title}</strong>
								</a>
								<span>
									hà{' '}
									{distanceInWords(file.createdAt, new Date(), { locale: pt })}
								</span>
							</li>
						))}
				</ul>
			</div>
		);
	}
}
