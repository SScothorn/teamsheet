import { useState } from 'react';
import './App.css';
import { testDefaultPlayers } from './components/Player/DummyPlayers';
import { Player } from './components/Player/Player';
import Setup from './pages/Setup/Setup';
import { shuffle } from './util/shuffle';
import { Team } from './components/Team/Team';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { outputPlayersAndTeamsToLogs } from './util/logging';
import Output from './pages/Output/Output';

function App() {
	const [lineupReady, setLineupReady] = useState(false);
	const [teamSize, setTeamSize] = useState(2);
	// const [teams, setTeams] = useState<Team[]>([{ name: 'Lights' }, { name: 'Darks' }]);
	const [teams, setTeams] = useState<Team[]>([{ name: 'Lights' }, { name: 'Darks' }, { name: 'Stripes' }, { name: 'Hoops' }]);
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);
	const navigate = useNavigate();

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
			player.teamInfo = {
				team: index % numberOfTeams(),
				positionInTeam: Math.floor(index / numberOfTeams()),
			};
		});

		// Find the ineligible players
		const ineligiblePlayers = updatedPlayers.slice(teamSize * numberOfTeams());
		// Set rest to have no team assigned, incase team size has been reduced.
		ineligiblePlayers.forEach((player) => {
			player.teamInfo = undefined;
		});

		setPlayers(updatedPlayers);
		// outputPlayersAndTeamsToLogs(updatedPlayers, teams);
		setLineupReady(true);
		navigate('/output');
	}

	return (
		<div className="App">
			<Routes>
				<Route
					path="/setup"
					element={
						<Setup
							teamSize={teamSize}
							setTeamSize={setTeamSize}
							teams={teams}
							setTeams={setTeams}
							players={players}
							setPlayers={setPlayers}
							generateLineup={generateLineup}
						/>
					}
				/>
				<Route
					path="/output"
					element={lineupReady ? <Output teams={teams} players={players} setPlayers={setPlayers} generateLineup={generateLineup} /> : <Navigate to="/setup" />}
				/>
				<Route path="*" element={<Navigate to="/setup" />} />
			</Routes>
		</div>
	);
}

export default App;
