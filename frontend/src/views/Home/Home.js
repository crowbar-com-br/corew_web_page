import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Badge, CardDeck, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade, NavLink } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'

class ModuleCard extends Component {
	render() {
		return (
			<Col xl="2" md="4" sm="6" xs="12" className="mb-4">
				<Card tag="a" href={ this.props.url }>
					<CardBody className={ this.props.color }>
						<div className="display-3 text-light text-center">
							<div className={ this.props.icon }/>
						</div>
					</CardBody>
					<CardFooter>
						<p className="text-dark">{ this.props.name }</p>
					</CardFooter>
				</Card>
			</Col>
		)
	}
}

class Home extends Component {
  render() {

		var list = [
			{
				name: 'API Gateway',
				url: '#',
				icon: 'fa fa-map-signs',
			},
			{
				name: 'REST API',
				url: '#',
				icon: 'fa fa-book',
			},
			{
				name: 'Authentication',
				url: '#',
				icon: 'fa fa-lock',
			},
			{
				name: 'Web Page',
				url: '#',
				icon: 'fa fa-globe',
			},
		]

		let x = -1;
		const colors = [
			'bg-light-blue',
			'bg-blue',
			'bg-indigo',
			'bg-purple',
			'bg-pink',
			'bg-red',
			'bg-orange',
			'bg-yellow',
			'bg-green',
			'bg-teal',
			'bg-cyan'
		]

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="fa fa-server"></i> Módulos Corew
          </div>
          <div className="card-body">
            <Row>
							{ list.map(function(item) {
								x++;
								let mod = (<ModuleCard name={ item.name } icon={ item.icon } url={ item.url } color={ colors[x] } />);
								if((x + 1) == 12) {
									x = -1;
								}
								return mod;
							}) }
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
