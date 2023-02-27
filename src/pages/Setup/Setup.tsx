import { SyntheticEvent, useState } from 'react';
import './Setup.css';
import { Player } from '../../components/Player/Player';
import PlayerBox from '../../components/Player/PlayerBox';
import PlayerForm from '../../components/Player/PlayerForm';
import { Team } from '../../components/Team/Team';

export type SetupProps = {
	teamSize: number;
	setTeamSize: (value: React.SetStateAction<number>) => void;
	teams: Team[];
	setTeams: (value: React.SetStateAction<Team[]>) => void;
	players: Player[];
	setPlayers: (value: React.SetStateAction<Player[]>) => void;
	generateLineup: () => void;
};

export default function Setup(props: SetupProps) {
	const { teamSize, setTeamSize, teams, setTeams, players, setPlayers, generateLineup } = props;
	const [addingPlayer, setAddingPlayer] = useState(false);

	// For code clarity
	function numberOfTeams() {
		return teams.length;
	}

	function onTeamSizeChanged(event: React.ChangeEvent<HTMLInputElement>) {
		setTeamSize(+event.target.value);
	}

	function onTeamNameChanged(event: React.ChangeEvent<HTMLInputElement>, teamIndex: number) {
		const updatedTeams = [...teams];
		updatedTeams[teamIndex].name = event.target.value;
		setTeams(updatedTeams);
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

	const teamNames = teams.map((team, index) => {
		return (
			<>
				<label htmlFor={`team-${index + 1}-name`}>
					<h3>{`Team ${index + 1} Name`}</h3>
				</label>
				<input
					type="text"
					name={`team-${index + 1}-name`}
					value={team.name}
					onChange={(event) => {
						onTeamNameChanged(event, index);
					}}
				/>
			</>
		);
	});

	const playersList = players.slice(0, teamSize * numberOfTeams()).map((player, i) => {
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

	const subsList = players.slice(teamSize * numberOfTeams()).map((player, i) => {
		return (
			<PlayerBox
				index={i + teamSize * numberOfTeams() + 1}
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
				{teamNames}

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
