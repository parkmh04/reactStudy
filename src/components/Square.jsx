import React from 'react';
class Square extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}
export default Square;
