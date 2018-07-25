/**
 * @fileoverview Publixe/React navigator component
 * @author Pavel Macháèek <pavex@ines.cz>
 */
import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'react-ui-modal-window';


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
		this._childs.push({component, props});
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
		this._currentModalWindowRef.close(() => {
			this._pop();
			this.forceUpdate();
		});
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
	_createComponent(component, props) {
		if (this.props.createComponent) {
			return this.props.createComponent.call(this, component, props);
		}
		return React.createElement(component, props);
	};





/** @private @type {Object} */
	_currentModalWindowRef;





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
			<ModalWindow ref={(ref) => {this._currentModalWindowRef = ref}}>	
				{this._createComponent(child.component, {...child.props, ...{navigator: this}})}
				{hasChildren ? this._renderIndex(nextIndex) : null}
			</ModalWindow>
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
				{this._createComponent(this.props.initialComponent, {navigator: this})}
				{this._renderChilds()}
			</div>
		);
	};


}
