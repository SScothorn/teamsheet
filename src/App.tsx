import { useState } from 'react';
import './App.css';
import { testDefaultPlayers } from './components/Player/DummyPlayers';
import { Player } from './components/Player/Player';
import Setup from './pages/Setup/Setup';
import { shuffle } from './util/shuffle';
import { Team } from './components/Team/Team';

function App() {
	const [teamSize, setTeamSize] = useState(2);
	const [teams, setTeams] = useState<Team[]>([{ name: 'Lights' }, { name: 'Darks' }]);
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);

	// For code clarity
	function numberOfTeams() {
		return teams.length;
	}

	function generateLineup() {
		console.clear();
		console.log(`Generate Pressed`);

		let updatedPlayers = [...players];

		// Find the eligible players
		const eligiblePlayers = shuffle(updatedPlayers.slice(0, teamSize * numberOfTeams()));

		// Assign them their teams at random.
		eligiblePlayers.forEach((player, index) => {
			player.team = index % numberOfTeams();
		});

		// Find the ineligible players
		const ineligiblePlayers = updatedPlayers.slice(teamSize * numberOfTeams());
		// Set rest to have no team assigned, incase team size has been reduced.
		ineligiblePlayers.forEach((player) => {
			player.team = undefined;
		});

		setPlayers(updatedPlayers);
		outputLineupToLogs(updatedPlayers);
		// outputPlayersToLogs(updatedPlayers);
	}

	function outputLineupToLogs(lineup: Player[] = players) {
		console.log(`--- LINEUP ---`);
		teams.forEach((team, index) => {
			console.log(`- ${team.name}:`);
			lineup
				.filter((player) => player.team === index)
				.forEach((player) => {
					console.log(`${player.name}`);
				});
		});
	}

	function outputPlayersToLogs(allPlayers: Player[] = players) {
		console.log(`--- ALL PLAYERS ---`);
		allPlayers.forEach((player) => {
			console.log(`${player.team ?? `Sub`} - ${player.name}`);
		});
	}

	return (
		<div className="App">
			<Setup teamSize={teamSize} setTeamSize={setTeamSize} teams={teams} setTeams={setTeams} players={players} setPlayers={setPlayers} generateLineup={generateLineup} />
		</div>
	);
}

export default App;
