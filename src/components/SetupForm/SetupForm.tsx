import { useState } from 'react';
import { Player } from '../Player/Player';
import PlayerForm from '../Player/PlayerForm';

export default function SetupForm() {
	const testDefaultPlayers: Player[] = [{ name: 'Seb' }, { name: 'Dec' }];
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

	const playersList = players.map((player, i) => {
		console.log(player);
		return <div key={i}>{player.name}</div>;
	});

	return (
		<>
			<form>
				<label htmlFor="team-size">Max Team Size</label>
				<input type="number" name="team-size" value={teamSize} min="1" max="11" onChange={onTeamSizeChanged} />
			</form>
			{playersList}
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
