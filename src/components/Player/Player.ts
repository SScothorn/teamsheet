export type PlayerTeamInfo = {
	team: number;
	positionInTeam: number;
};

export type Player = {
	id: string;
	name: string;
	teamInfo?: PlayerTeamInfo;
};
