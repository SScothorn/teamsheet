import { Player } from '../components/Player/Player';
import { Team } from '../components/Team/Team';

export function outputPlayersAndTeamsToLogs(players: Player[], teams: Team[]) {
	outputLineupToLogs(players, teams);
	outputPlayersToLogs(players);
}

function outputLineupToLogs(players: Player[], teams: Team[]) {
	console.log(`--- LINEUP ---`);
	teams.forEach((team, index) => {
		console.log(`- ${team.name}:`);
		players
			.filter((player) => player.teamInfo?.team === index)
			.forEach((player) => {
				console.log(`${player.name}`);
			});
	});
}

function outputPlayersToLogs(players: Player[]) {
	console.log(`--- ALL PLAYERS ---`);
	players.forEach((player) => {
		console.log(`${player.teamInfo?.team ?? `Sub`} - ${player.name}`);
	});
}
