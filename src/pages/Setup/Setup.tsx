import { SyntheticEvent, useState } from 'react';
import './Setup.css';
import { Player } from '../../components/Player/Player';
import PlayerBox from '../../components/Player/PlayerBox';
import PlayerForm from '../../components/Player/PlayerForm';

export type SetupProps = {
	teamSize: number;
	setTeamSize: (value: React.SetStateAction<number>) => void;
	team1Name: string;
	setTeam1Name: (value: React.SetStateAction<string>) => void;
	team2Name: string;
	setTeam2Name: (value: React.SetStateAction<string>) => void;
	players: Player[];
	setPlayers: (value: React.SetStateAction<Player[]>) => void;
	generateLineup: () => void;
};

export default function Setup(props: SetupProps) {
	const [addingPlayer, setAddingPlayer] = useState(false);
	const { teamSize, setTeamSize, team1Name, setTeam1Name, team2Name, setTeam2Name, players, setPlayers, generateLineup } = props;

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

	function onGenerateClicked(event: SyntheticEvent) {
		event.preventDefault();
		generateLineup();
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

				<button className="Setup__GenerateButton" onClick={onGenerateClicked}>
					Generate Lineup
				</button>
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
