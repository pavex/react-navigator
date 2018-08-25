/**
 * @fileoverview Publixe application componnet
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigator from './Navigator.js';


export default class Application extends Component {


	static propTypes = {
		initialComponent: PropTypes.func.isRequired
	};





/**
 * Default component builder
 * @protected
 * @param {React.Component}
 * @param {object}
 * @return {React.Element}
 */
	_createComponent(component, props) {
		return React.createElement(component, props);
	};





//
	render() {
		return (
			<Navigator
				createComponent={this._createComponent.bind(this)}
				initialComponent={this.props.initialComponent}
			/>
		);
	};


}