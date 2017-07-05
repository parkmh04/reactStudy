import React from 'react';
class Square extends React.Component {
	constructor() {
		super();
	}
	render() {
		return (
			<button className="square">
				{this.props.value}
			</button>
		);
	}
}
export default Square;
