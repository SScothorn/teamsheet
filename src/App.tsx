import { useState } from 'react';
import './App.css';
import { testDefaultPlayers } from './components/Player/DummyPlayers';
import { Player } from './components/Player/Player';
import Setup from './pages/Setup/Setup';

function App() {
	const [teamSize, setTeamSize] = useState(6);
	const [team1Name, setTeam1Name] = useState('Lights');
	const [team2Name, setTeam2Name] = useState('Darks');
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);

	function generateLineup() {
		console.log(`Generate Pressed`);
	}
	return (
		<div className="App">
			<Setup
				teamSize={teamSize}
				setTeamSize={setTeamSize}
				team1Name={team1Name}
				setTeam1Name={setTeam1Name}
				team2Name={team2Name}
				setTeam2Name={setTeam2Name}
				players={players}
				setPlayers={setPlayers}
				generateLineup={generateLineup}
			/>
		</div>
	);
}

export default App;
