import React, { Component } from 'react';
import {
	Col,
	Row,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	Input,
	Table,
	Badge,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';

var drop = false;

class APIGateway extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			modal_danger: false,
			title: "",
			add: true,
			index: "",
			ms: {
				name: "",
				description: "",
				slug: "",
				urls: [],
				state: "active",
			},
			url: "",
			list: [
				{
					name: "Authentication",
					description: "The authentication MS",
					slug: "authentication",
					urls: ["http://localhost:8001"],
					state: "active",
				},
				{
					name: "REST API",
					description: "The REST API MS",
					slug: "rest",
					urls: ["http://localhost:8002"],
					state: "active",
				}
			],
		}

		this.toggle = this.toggle.bind(this);
		this.toggleDanger = this.toggleDanger.bind(this);
		this.handleChange = this.inputChangeHandler.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
	}

	toggleDanger() {
		this.setState({
			modal_danger: !this.state.modal_danger,
		});
	}

	inputChangeHandler(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		return(
			<div className="animated fadeIn">
				<Row>
					<Col xs="12">
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify"></i> Lista de Micro Serviços
							</CardHeader>
							<CardBody>
								<Table responsive>
									<thead>
									<tr>
										<th>Nome</th>
										<th>Descrição</th>
										<th>Slug</th>
										<th>URLs</th>
										<th>Estado</th>
										<th>
											<div className="text-center">
												<Button className="btn-pill no-width" color="success" size="md" onClick={ e => { this.setState({ title: "Adicionar"}); this.toggle(); }}><i className="fa fa-plus"/></Button>
											</div>
										</th>
									</tr>
									</thead>
									<tbody>
										{
											this.state.list.map(function(item, index) {
												return(
													<tr key={ index }>
														<td>{ item.name }</td>
														<td>{ item.description }</td>
														<td>{ item.slug }</td>
														<td>{ item.urls.length }</td>
														<td>
															<Badge color={ getColorFromState(item.state) }>{ item.state }</Badge>
														</td>
														<td>
															<div className="text-center">
																	<Button className="btn-pill no-width" color="warning" size="sm" onClick={ e => { loadMS(this, "list", index, "ms"); }}><i className="fa fa-cog"/></Button>
																	<span> </span>
																	<Button className="btn-pill no-width" color="danger" size="sm" onClick={ e => { dropMS(this, "list", index); }}><i className="fa fa-minus"/></Button>
															</div>
														</td>
													</tr>
												);
											}, this)
										}
									</tbody>
								</Table>
								<Modal isOpen={ this.state.modal } toggle={ this.toggle } className={ this.props.className }>
									<ModalHeader toggle={ this.toggle }>{ this.state.title } Micro Serviço</ModalHeader>
									<ModalBody>
										<FormField father={ this } id="name" path="ms.name" title="Nome" placeholder="Nome do Micro Serviço" value={ this.state.ms.name } required="required" />
										<FormField father={ this } id="description" path="ms.description" title="Descrição" placeholder="Descrição do Micro Serviço" value={ this.state.ms.description } required="required" />
										<FormField father={ this } id="slug" path="ms.slug" title="Slug" placeholder="slug" value={ this.state.ms.slug } required="required" />
										<FormSelect father={ this } id="state" path="ms.state" title="Estado" placeholder="Estado" value={ this.state.ms.state } options={ [{value: "active", title: "Ativo"}, {value: "inactive", title: "Inativo"}] } required="required" />
										<FormTable father={ this } id="urls" name="url" title="URLs" placeholder="www.sam.ple:8080/sample" value={ this.state.url } required="" head="URL" list={ this.state.ms.urls } pathTable="ms.urls" />
									</ModalBody>
									<ModalFooter>
										<Button color="success" onClick={ e => { addMS(this, "list", "ms") } }>{ this.state.title }</Button>
										<Button color="secondary" onClick={ e => { this.setState({ ["ms"]: {name: "",description: "",slug: "",urls: [],state: ""}}); this.setState({ ["url"]: ""}); this.toggle(); } }>Cancelar</Button>
									</ModalFooter>
								</Modal>
								<Modal isOpen={this.state.modal_danger} toggle={this.toggleDanger}
											 className={'modal-danger ' + this.props.className}>
									<ModalHeader toggle={this.toggleDanger}>Remover</ModalHeader>
									<ModalBody>
										Você realmente deseja remover { this.state.name }? Esta ação
										não poderá ser desfeita!
									</ModalBody>
									<ModalFooter>
										<Button color="danger" onClick={ e => { drop = true;dropMS(this, "list", this.state.index); } }>Remover</Button>{' '}
										<Button color="secondary" onClick={this.toggleDanger}>Cancelar</Button>
									</ModalFooter>
								</Modal>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

const FormField = ({ father, id, path, title, placeholder, value, required }) => {
	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<Input type="text" id={ id } path={ path } placeholder={ placeholder } value={ value } { ...required } onChange={ e => { alterState(father, path, e.target.value) } } />
				</FormGroup>
			</Col>
		</Row>
	)
}

const FormSelect = ({ father, id, path, title, placeholder, value, options, required }) => {
	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<Input type="select" id={ id } path={ path } placeholder={ placeholder } value={ value } { ...required } onChange={ e => { alterState(father, path, e.target.value) } }>
						{
							options.map(function(item, index) {
								return (
									<option value={ item.value }>{ item.title }</option>
								);
							})
						}
					</Input>
				</FormGroup>
			</Col>
		</Row>
	);
}

const FormTable = ({ father, id, name, title, placeholder, value, required, head, list, pathTable }) => {

	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<InputGroup>
						<Input type="text" id={ id } name={ name } placeholder={ placeholder } value={ value } { ...required } onChange={ father.handleChange } />
						<InputGroupAddon addonType="append">
							<Button className="btn-ghost-* no-width" color="ghost-success" size="sm" onClick={ e => { alterStateList(father, pathTable, father.state.url); alterState(father, name, "") } }><i className="fa fa-plus"/></Button>
						</InputGroupAddon>
					</InputGroup>
					<Table responsive>
							<thead>
							<tr>
								<th>{ head }</th>
							</tr>
						</thead>
						<tbody>
							{
								list.map(function(item, index) {
									return(
										<tr key={ index }>
											<td>{ item }</td>
											<td>
												<div className="text-right">
													<Button className="btn-ghost-* no-width" color="ghost-danger" size="sm" onClick={ e => { dropStateList(father, pathTable, index) } } ><i className="fa fa-minus" /></Button>
												</div>
											</td>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
				</FormGroup>
			</Col>
		</Row>
	)
}

function getColorFromState(state) {
	switch (state) {
		case "active":
			return "success";
			break;
		case "inactive":
			return "danger";
			break;
		default:
			return "secondary";
	}
}

function set(path, value, obj) {
	var schema = obj;
	var pList = path.split('.');
	var len = pList.length;
	for(var i = 0; i < len-1; i++) {
		var elem = pList[i];
		if( !schema[elem] ) schema[elem] = {}
		schema = schema[elem];
	}
	schema[pList[len-1]] = value;
}

function setList(path, value, obj) {
	var schema = obj;
	var pList = path.split('.');
	var len = pList.length;
	for(var i = 0; i < len-1; i++) {
		var elem = pList[i];
		if( !schema[elem] ) schema[elem] = {}
		schema = schema[elem];
	}
	schema[pList[len-1]].push(value);
}

function dropList(path, index, obj) {
	var schema = obj;
	var pList = path.split('.');
	var len = pList.length;
	for(var i = 0; i < len-1; i++) {
		var elem = pList[i];
		if( !schema[elem] ) schema[elem] = {}
		schema = schema[elem];
	}
	schema[pList[len-1]].splice(index, 1);
}

function alterState(father, name, value) {
	if (name.includes('.')) {
		set(name, value, father.state);
		father.setState({ "temp": "null" });
	} else {
		father.setState({ [name]: value });
	}
}

function alterStateList(father, name, value) {
	if (name.includes('.')) {
		setList(name, value, father.state);
		father.setState({ "temp": "null" });
	}
}

function dropStateList(father, name, index) {
	dropList(name, index, father.state);
	father.setState({ "temp": "null" });
}

function addMS(father, path, item) {
	if(father.state.add) {
		alterState(father, path, [...father.state[path], father.state[item]]);
	} else {
		alterState(father, path + "." + father.state.index, father.state[item]);
	}
	alterState(father, item, {name: "",description: "",slug: "",urls: [],state: ""});
	alterState(father, "url", "");
	alterState(father, "add", true);
	father.toggle();
}

function loadMS(father, path, index, item) {
	let ms	= father.state[path][index];
	alterState(father, item, {name: ms.name, description: ms.description, slug: ms.slug, urls: ms.urls, state: ms.state });
	alterState(father, "title", "Modificar" );
	alterState(father, "add", false );
	alterState(father, "index", index );
	father.toggle();
}

function dropMS(father, path, index) {
	alterState(father, "index", index);
	if(!drop) {
		father.toggleDanger();
	} else {
		dropStateList(father, path, index);
		father.toggleDanger();
		drop = false;
	}
}

export default APIGateway;
