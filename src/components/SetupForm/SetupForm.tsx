import { useState } from 'react';
import { Player } from '../Player/Player';
import PlayerForm from '../Player/PlayerForm';
import PlayerBox from '../Player/PlayerBox';
import './SetupForm.css';

export default function SetupForm() {
	const testDefaultPlayers: Player[] = [
		{ name: 'Seb' },
		{ name: 'Dec' },
		{ name: 'Jake' },
		{ name: 'Charlie' },
		{ name: 'Stan' },
		{ name: 'Owen' },
		{ name: 'AJ' },
		{ name: 'Birksy' },
	];
	const [teamSize, setTeamSize] = useState(3);
	const [team1Name, setTeam1Name] = useState('Lights');
	const [team2Name, setTeam2Name] = useState('Darks');
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);
	const [addingPlayer, setAddingPlayer] = useState(false);

	function onTeamSizeChanged(event: React.ChangeEvent<HTMLInputElement>) {
		setTeamSize(+event.target.value);
	}

	function onTeamNameChanged(event: React.ChangeEvent<HTMLInputElement>, team: number) {
		if (team === 1) {
			setTeam1Name(event.target.value);
		} else {
			setTeam2Name(event.target.value);
		}
	}

	function onNewPlayerAdded(player: Player) {
		const newPlayers = players;
		newPlayers.push(player);
		setPlayers(newPlayers);
		setAddingPlayer(false);
	}

	function onNewPlayerCancelled() {
		setAddingPlayer(false);
	}

	const playersList = players.slice(0, teamSize * 2).map((player, i) => {
		return <PlayerBox player={player} key={i} />;
	});

	const subsList = players.slice(teamSize * 2).map((player, i) => {
		return <PlayerBox player={player} key={i} />;
	});

	return (
		<div className="Setup__Container">
			<form className="Setup__Section">
				<label htmlFor="team-size">
					<h3>Max Team Size</h3>
				</label>
				<input type="number" name="team-size" value={teamSize} min="1" max="11" onChange={onTeamSizeChanged} />
				<label htmlFor="team-1-name">
					<h3>Team 1 Name</h3>
				</label>
				<input
					type="text"
					name="team-1-name"
					value={team1Name}
					onChange={(event) => {
						onTeamNameChanged(event, 1);
					}}
				/>
				<label htmlFor="team-2-name">
					<h3>Team 2 Name</h3>
				</label>
				<input
					type="text"
					name="team-2-name"
					value={team2Name}
					onChange={(event) => {
						onTeamNameChanged(event, 2);
					}}
				/>
			</form>
			<div className="Setup__Section">
				<h3>Players</h3>
				{playersList}
				{subsList.length > 0 && (
					<>
						<br />
						<h3>Subs</h3>
						{subsList}
					</>
				)}
				<br />
				{addingPlayer ? (
					<PlayerForm onSubmit={onNewPlayerAdded} onCancel={onNewPlayerCancelled} />
				) : (
					<button
						onClick={() => {
							setAddingPlayer(true);
						}}
					>
						Add Player
					</button>
				)}
			</div>
		</div>
	);
}
