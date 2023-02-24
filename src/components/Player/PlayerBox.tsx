import { Player } from './Player';
import { IoIosRemove } from 'react-icons/io';
import './Player.css';

export type PlayerBoxProps = {
	player: Player;
};

export default function PlayerBox(props: PlayerBoxProps) {
	return (
		<div className="PlayerBox">
			<span>{props.player.name}</span>
			<button
				className="PlayerBox__DeleteButton"
				onClick={() => {
					console.log(`delete me`);
				}}
			>
				<IoIosRemove />
			</button>
		</div>
	);
}
