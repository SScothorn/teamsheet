import { useNavigate } from 'react-router-dom';
import { Player } from '../../components/Player/Player';
import PlayerBox from '../../components/Player/PlayerBox';
import { Team } from '../../components/Team/Team';
import { useState } from 'react';

export type OutputProps = {
	teams: Team[];
	players: Player[];
	setPlayers: (value: React.SetStateAction<Player[]>) => void;
	generateLineup: () => void;
};

export default function Output(props: OutputProps) {
	const { teams, players, setPlayers, generateLineup } = props;
	const [playerToSwap, setPlayerToSwap] = useState<Player | undefined>(undefined);

	// Either set a player ready to be swapped, or swap it if another player has already been set ready to swap.
	function onPlayerSwapClicked(player: Player) {
		// Perform swap
		if (playerToSwap !== undefined) {
			// let updatedPlayers = [...players];
			console.log(
				`Swapping ${playerToSwap.name} of team ${playerToSwap.teamInfo?.team}, position ${playerToSwap.teamInfo?.positionInTeam} with ${player.name} of team ${player.teamInfo?.team}, position ${player.teamInfo?.positionInTeam}.`,
			);
			const tempPlayerTeamInfo = player.teamInfo ? { ...player.teamInfo } : undefined;
			player.teamInfo = playerToSwap.teamInfo ? { ...playerToSwap.teamInfo } : undefined;
			playerToSwap.teamInfo = tempPlayerTeamInfo;
			setPlayers(players);
			setPlayerToSwap(undefined);
		} else {
			// Set ready to swap
			console.log(`Setting ${player.name} of team ${player.teamInfo?.team}, position ${player.teamInfo?.positionInTeam} to ready to swap.`);
			setPlayerToSwap(player);
		}
	}

	const navigate = useNavigate();
	const test = teams.map((team, teamIndex) => {
		return (
			<div className="Section" key={teamIndex}>
				<h3>{team.name}</h3>
				{players
					.filter((player) => {
						return player.teamInfo && player.teamInfo.team === teamIndex;
					})
					.sort((a, b) => {
						return a.teamInfo && b.teamInfo ? a.teamInfo.positionInTeam - b.teamInfo.positionInTeam : -1;
					})
					.map((player, playerIndex) => {
						return (
							<PlayerBox
								index={playerIndex}
								player={player}
								key={player.id}
								onSwapClicked={() => {
									onPlayerSwapClicked(player);
								}}
							/>
						);
					})}
			</div>
		);
	});
	return (
		<>
			<button
				onClick={() => {
					navigate('/setup');
				}}
			>
				Back To Setup
			</button>
			<div className="SectionContainer">{test}</div>
		</>
	);
}
