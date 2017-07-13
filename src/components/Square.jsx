import React, { Component } from 'react';

class Square extends Component {
	constructor(props) {
		super(props);

	}
	shouldComponentUpdate(nextProps) {

		return (JSON.stringify(nextProps) != JSON.stringify(this.props));
	}
	render() {
		console.log(`render: ${this.props.seq}`);
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}

}

export default Square;
