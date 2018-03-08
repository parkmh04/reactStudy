import React from 'react';
import Game from './components/Game';
import Title from './components/Title';
import './App.scss';

class App extends React.Component {
	render() {
		return (
			<div>
				<Title/>
				<Game/>
			</div>
		);
	}
}

export default App;
