/**
 * @fileoverview Publixe/React navigator component
 * @author Pavel Macháèek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'pavex-react-ui-modal-window';


export default class Navigator extends React.Component {


	static propTypes = {
		createComponent: PropTypes.func,
		initialComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired
	};





/**
 * @private
 * @type {Array}
 */
	_childs = [];





/**
 * Push component into navigator
 * @private
 * @param {React.Component} component
 * @param {Object} props
 */
	_push(component, props) {
		this._childs.push({component, props, ref: null});
	};





/**
 * Pop component from navigator
 * @private
 */
	_pop() {
		this._childs.splice(this._childs.length - 1, 1);
	};





/**
 * @param {React.Component} component
 * @param {Object=} props
 */	
	open(component, opt_props) {
		this._push(component, opt_props);
		this.forceUpdate();
	};





/**
 */
	close() {
		let index = this._childs.length - 1;
		if (index >= 0) {
			let child = this._childs[index];
			child.ref.close(() => {			
				this._pop();
				this.forceUpdate();
			});
		}
	};





/**
 * @private
 * @return {boolean}
 */
	_hasChildren() {
		return this._childs.length > 0;
	};





/**
 */	
	createComponent(component, props) {
		if (this.props.createComponent) {
			return this.props.createComponent.call(this, component, props);
		}
		return React.createElement(component, props);
	};





/**
 * @private
 * @param {number} index
 * @return {React.Element}
 */
	_renderIndex(index) {
		const child = this._childs[index];
		const nextIndex = index + 1;
		const hasChildren = this._childs.length > nextIndex;
//
		return (
			<div>
				<ModalWindow ref={ref => child.ref = ref}>	
					{this.createComponent(child.component, {...child.props, ...{navigator: this}})}
				</ModalWindow>
				{hasChildren ? this._renderIndex(nextIndex) : null}
			</div>
		);
	}





/**
 * @private
 * @return {React.Element}
 */
	_renderChilds() {
		if (this._hasChildren()) {
			return this._renderIndex(0);
		}
		return null;
	};





//
	render() {
		return (
			<div className='ui-navigator'>
				{this.createComponent(this.props.initialComponent, {navigator: this})}
				{this._renderChilds()}
			</div>
		);
	};


}
