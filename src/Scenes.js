/**
 * @fileoverview Publixe window component
 * @author Pavel Mach·Ëek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';


export default class WindowComponent extends React.Component {


//
	static propTypes = {
		navigator: PropTypes.object.isRequired,
		onWillUnmount: PropTypes.func
	};





//
	componentWillUnmount() {
		if (this.props.onWillUnmount) {
			this.props.onWillUnmount.call(this);
		}
	}





/**
 * Open/push new window throught navigator
 * @param {Publixe.Window} component
 * @param {Object=} opt_props
 */
	open(component, opt_props) {
		this.props.navigator.open(component, opt_props || {});
	};





/**
 * Close current window
 */
	close() {
		this.props.navigator.close();
	};


};

