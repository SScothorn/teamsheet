import { useState } from 'react';
import './App.css';
import { testDefaultPlayers } from './components/Player/DummyPlayers';
import { Player } from './components/Player/Player';
import Setup from './pages/Setup/Setup';
import { shuffle } from './util/shuffle';

function App() {
	const [teamSize, setTeamSize] = useState(2);
	const [team1Name, setTeam1Name] = useState('Lights');
	const [team2Name, setTeam2Name] = useState('Darks');
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);

	function generateLineup() {
		console.clear();
		console.log(`Generate Pressed`);
		// Randomly pick a lineup
		const eligiblePlayers = shuffle(players.slice(0, teamSize * 2)).map((player, index) => {
			player.team = index % 2;
			return player;
		});
		// Set rest to have no team assigned, incase team size has been reduced.
		const ineligiblePlayers = players.slice(teamSize * 2).map((player) => {
			player.team = undefined;
			return player;
		});
		const updatedPlayers = [...eligiblePlayers, ...ineligiblePlayers];
		setPlayers(updatedPlayers);
		outputLineupToLogs(updatedPlayers);
	}

	function outputLineupToLogs(lineup: Player[] = players) {
		console.log(`${team1Name}:`);
		lineup
			.filter((player) => player.team === 0)
			.forEach((player) => {
				console.log(`${player.name}`);
			});
		console.log(`${team2Name}:`);
		lineup
			.filter((player) => player.team === 1)
			.forEach((player) => {
				console.log(`${player.name}`);
			});
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
