import { Player } from '../../components/Player/Player';
import PlayerBox from '../../components/Player/PlayerBox';
import { Team } from '../../components/Team/Team';

export type OutputProps = {
	teams: Team[];
	players: Player[];
	setPlayers: (value: React.SetStateAction<Player[]>) => void;
	generateLineup: () => void;
};

export default function Output(props: OutputProps) {
	const { teams, players, setPlayers, generateLineup } = props;
	const test = teams.map((team, teamIndex) => {
		return (
			<>
				<h3>{team.name}</h3>
				{players
					.filter((player) => player.team === teamIndex)
					.map((player, playerIndex) => {
						return (
							<PlayerBox
								index={playerIndex}
								player={player}
								key={player.id}
								onRemoveClicked={() => {
									console.log('Player remove pressed from output');
								}}
							/>
						);
					})}
			</>
		);
	});
	return <div className="Output__Container">{test}</div>;
}
