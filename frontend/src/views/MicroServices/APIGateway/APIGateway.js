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

var drop	= false,
		add		= true;

var form = [
	{
		type: "field",
		name: "name",
		path: "ms.name",
		title: "Nome",
		placeholder: "Nome do Micro Serviço",
		required: "required"
	},
	{
		type: "field",
		name: "description",
		path: "ms.description",
		title: "Descrição",
		placeholder: "Descrição do Micro Serviço",
		required: "required"
	},
	{
		type: "field",
		name: "slug",
		path: "ms.slug",
		title: "Slug",
		placeholder: "slug",
		required: "required"
	},
	{
		type: "select",
		name: "state",
		path: "ms.state",
		title: "Estado",
		placeholder: "Estado",
		options: [
			{ value: "active", title: "Ativo" },
			{ value: "inactive", title: "Inativo" }
		],
		required: "required"
	},
	{
		type: "table",
		nameTable: "urls",
		nameField: "url",
		pathTable: "ms.urls",
		title: "URLs",
		placeholder: "www.sam.ple:8080/sample",
		required: "",
		head: "URL"
	},
];
class APIGateway extends Component {

	constructor(props) {
		super(props);

		this.state = {
			modal				: false,
			modal_danger: false,
			title				: "",
			add					: true,
			index				: "",
			ms: {
				name				: "",
				description	: "",
				slug				: "",
				urls				: [],
				state				: "active",
			},
			url	: "",
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

		this.toggle				= this.toggle.bind(this);
		this.toggleDanger	= this.toggleDanger.bind(this);
		this.handleChange	= this.inputChangeHandler.bind(this);
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
												<Button className="btn-pill no-width" color="success" size="md" onClick={ e => { this.setState({ title: "Adicionar"}); add = true; this.toggle(); }}><i className="fa fa-plus"/></Button>
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
										{
											form.map(function(item, index) {
												switch (item.type) {
													case "field":
														return(
															<FormField father={ this } id={ item.name } path={ item.path } title={ item.title } placeholder={ item.placeholder } required={ item.required } />
														);
													case "select":
														return(
															<FormSelect father={ this } id={ item.name } path={ item.path } title={ item.title } placeholder={ item.placeholder } options={ item.options } required={ item.required } />
														);
													case "table":
														return(
															<FormTable father={ this } id={ item.nameTable } name={ item.nameField } pathTable={ item.pathTable } title={ item.title } placeholder={ item.placeholder } head={ item.head } required={ item.required } />
														);
													default:
														return(<div />);
												}
											}, this)
										}
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

const FormField = ({ father, id, path, title, placeholder, required }) => {
	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<Input type="text" id={ id } path={ path } placeholder={ placeholder } value={ getState(path, father.state) } { ...required } onChange={ e => { alterState(father, path, e.target.value) } } />
				</FormGroup>
			</Col>
		</Row>
	)
}

const FormSelect = ({ father, id, path, title, placeholder, options, required }) => {
	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<Input type="select" id={ id } path={ path } placeholder={ placeholder } value={ getState(path, father.state) } { ...required } onChange={ e => { alterState(father, path, e.target.value) } }>
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

const FormTable = ({ father, id, name, title, placeholder, required, head, pathTable }) => {

	return (
		<Row>
			<Col xs="12">
				<FormGroup>
					<Label htmlFor={ id }>{ title }</Label>
					<InputGroup>
						<Input type="text" id={ id } name={ name } placeholder={ placeholder } value={ getState(name, father.state) } { ...required } onChange={ father.handleChange } />
						<InputGroupAddon addonType="append">
							<Button className="btn-ghost-* no-width" color="ghost-success" size="sm" onClick={ e => { alterStateList(father, pathTable, getState(name, father.state)); alterState(father, name, "") } }><i className="fa fa-plus"/></Button>
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
								getList(father, pathTable).map(function(item, index) {
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

function getList(father, pathTable) {
	if(getState(pathTable, father.state) === undefined) {
		alterState(father, pathTable, []);
	}
	return getState(pathTable, father.state);
}

function getColorFromState(state) {
	switch (state) {
		case "active":
			return "success";
		case "inactive":
			return "danger";
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

function getState(path, obj) {
	var schema = obj;
	var pList = path.split('.');
	var len = pList.length;
	for(var i = 0; i < len-1; i++) {
		var elem = pList[i];
		if( !schema[elem] ) schema[elem] = {}
		schema = schema[elem];
	}
	return schema[pList[len-1]];
}

function pushList(path, value, obj) {
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
		pushList(name, value, father.state);
		father.setState({ "temp": "null" });
	}
}

function dropStateList(father, name, index) {
	dropList(name, index, father.state);
	father.setState({ "temp": "null" });
}

function addMS(father, path, item) {
	if(add) {
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
	alterState(father, "index", index );
	add = false;
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
