import { Player } from './Player';

export type PlayerBoxProps = {
	player: Player;
};

export default function PlayerBox(props: PlayerBoxProps) {
	return <div>{props.player.name}</div>;
}
