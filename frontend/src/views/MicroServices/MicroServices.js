import React, { Component } from 'react';
import { Col, Row, Card, CardHeader, CardBody, FormGroup, Label, Input, Table, Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class MicroServices extends Component {

	render() {
		var list = [
			{
				name: 'API Gateway',
				url: '#/ms/api_gateway',
				MSs: '1',
				icon: 'fa fa-map-signs',
				status: 'success',
			},
			{
				name: 'REST API',
				url: '#/ms/#',
				MSs: 1,
				icon: 'fa fa-book',
				status: 'success',
			},
			{
				name: 'Authentication',
				url: '#/ms/#',
				MSs: 1,
				icon: 'fa fa-lock',
				status: 'success',
			},
			{
				name: 'Web Page',
				url: '#/ms/#',
				MSs: 1,
				icon: 'fa fa-globe',
				status: 'success',
			},
		];

		return(
			<div className="animated fadeIn">
				<Row>
					<Col xs="12">
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify"></i> Micro Serviços
							</CardHeader>
							<CardBody>
								<Table responsive>
									<thead>
									<tr>
										<th>Nome</th>
										<th>Servidores</th>
										<th>Estado</th>
									</tr>
									</thead>
									<tbody>
										{
											list.map(function(item) {
												return(
													<tr>
														<td><a href={ item.url }>{ item.name }</a></td>
														<td>{ item.MSs }</td>
														<td>
															<Badge color={ item.status }>Ativo</Badge>
														</td>
													</tr>
												);
											})
										}
									</tbody>
								</Table>
								{
									function() {
										if(list.length > 10) {
											return (
												<Pagination>
													<PaginationItem>
														<PaginationLink previous tag="button"></PaginationLink>
													</PaginationItem>
													<PaginationItem active>
														<PaginationLink tag="button">1</PaginationLink>
													</PaginationItem>
													<PaginationItem>
														<PaginationLink tag="button">2</PaginationLink>
													</PaginationItem>
													<PaginationItem>
														<PaginationLink tag="button">3</PaginationLink>
													</PaginationItem>
													<PaginationItem>
														<PaginationLink tag="button">4</PaginationLink>
													</PaginationItem>
													<PaginationItem>
														<PaginationLink next tag="button"></PaginationLink>
													</PaginationItem>
												</Pagination>
											)
										} else {
											return (<div/>)
										}
									}
								}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default MicroServices;
