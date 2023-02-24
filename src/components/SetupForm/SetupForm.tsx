import { useState } from 'react';
import { Player } from '../Player/Player';
import PlayerForm from '../Player/PlayerForm';
import PlayerBox from '../Player/PlayerBox';

export default function SetupForm() {
	const testDefaultPlayers: Player[] = [{ name: 'Seb' }, { name: 'Dec' }, { name: 'Jake' }, { name: 'Charlie' }];
	const [teamSize, setTeamSize] = useState(5);
	const [players, setPlayers] = useState<Player[]>(testDefaultPlayers);
	const [addingPlayer, setAddingPlayer] = useState(false);

	function onTeamSizeChanged(event: React.ChangeEvent<HTMLInputElement>) {
		setTeamSize(+event.target.value);
	}

	function onNewPlayerAdded(player: Player) {
		const newPlayers = players;
		newPlayers.push(player);
		console.log(newPlayers);
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
		<>
			<form>
				<label htmlFor="team-size">Max Team Size</label>
				<input type="number" name="team-size" value={teamSize} min="1" max="11" onChange={onTeamSizeChanged} />
			</form>
			<h3>Players</h3>
			{playersList}
			{subsList.length > 0 && <h3>Subs</h3>}
			{subsList}
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
		</>
	);
}
