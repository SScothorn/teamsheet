import { useState } from 'react';
import { Player } from '../Player/Player';
import PlayerForm from '../Player/PlayerForm';
import PlayerBox from '../Player/PlayerBox';
import { v4 as uuidv4 } from 'uuid';
import './SetupForm.css';

export default function SetupForm() {
	const testDefaultPlayers: Player[] = [
		{ id: uuidv4(), name: 'Seb' },
		{ id: uuidv4(), name: 'Dec' },
		{ id: uuidv4(), name: 'Jake' },
		{ id: uuidv4(), name: 'Charlie' },
		{ id: uuidv4(), name: 'Stan' },
		{ id: uuidv4(), name: 'Owen' },
		{ id: uuidv4(), name: 'AJ' },
		{ id: uuidv4(), name: 'Birksy' },
		{ id: uuidv4(), name: 'Seb' },
		{ id: uuidv4(), name: 'Dec' },
		{ id: uuidv4(), name: 'Jake' },
		{ id: uuidv4(), name: 'Charlie' },
		{ id: uuidv4(), name: 'Stan' },
		{ id: uuidv4(), name: 'Owen' },
		{ id: uuidv4(), name: 'AJ' },
		{ id: uuidv4(), name: 'Birksy' },
		{ id: uuidv4(), name: 'Seb' },
		{ id: uuidv4(), name: 'Dec' },
		{ id: uuidv4(), name: 'Jake' },
		{ id: uuidv4(), name: 'Charlie' },
		{ id: uuidv4(), name: 'Stan' },
		{ id: uuidv4(), name: 'Owen' },
		{ id: uuidv4(), name: 'AJ' },
		{ id: uuidv4(), name: 'Birksy' },
	];
	const [teamSize, setTeamSize] = useState(6);
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
		const newPlayers = [...players];
		newPlayers.push(player);
		setPlayers(newPlayers);
		setAddingPlayer(false);
	}

	function onNewPlayerCancelled() {
		setAddingPlayer(false);
	}

	function onPlayerRemoved(id: string) {
		const newPlayers = players.filter((player) => {
			return player.id !== id;
		});
		setPlayers(newPlayers);
	}

	const playersList = players.slice(0, teamSize * 2).map((player, i) => {
		return (
			<PlayerBox
				index={i + 1}
				player={player}
				key={player.id}
				onRemoveClicked={() => {
					onPlayerRemoved(player.id);
				}}
			/>
		);
	});

	const subsList = players.slice(teamSize * 2).map((player, i) => {
		return (
			<PlayerBox
				index={i + teamSize * 2 + 1}
				player={player}
				key={player.id}
				onRemoveClicked={() => {
					onPlayerRemoved(player.id);
				}}
			/>
		);
	});

	const addPlayer = addingPlayer ? (
		<PlayerForm onSubmit={onNewPlayerAdded} onCancel={onNewPlayerCancelled} />
	) : (
		<button
			onClick={() => {
				setAddingPlayer(true);
			}}
		>
			Add Player
		</button>
	);

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
				<div className="Setup__PlayersList">
					<h3>Players</h3>
					{playersList}
				</div>

				{subsList.length === 0 && addPlayer}
			</div>
			{subsList.length > 0 && (
				<div className="Setup__Section">
					<div className="Setup__PlayersList">
						<h3>Subs</h3>
						{subsList}
					</div>

					{subsList.length > 0 && addPlayer}
				</div>
			)}
		</div>
	);
}
