import { Player } from './Player';
import './Player.css';

export type PlayerBoxProps = {
	player: Player;
};

export default function PlayerBox(props: PlayerBoxProps) {
	return <div className="PlayerBox">{props.player.name}</div>;
}
