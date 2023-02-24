import { Player } from './Player';
import { IoIosRemove } from 'react-icons/io';
import './Player.css';

export type PlayerBoxProps = {
	player: Player;
	onRemoveClicked: () => void;
};

export default function PlayerBox(props: PlayerBoxProps) {
	const { onRemoveClicked } = props;
	return (
		<div className="PlayerBox">
			<span>{props.player.name}</span>
			<button className="PlayerBox__DeleteButton" onClick={onRemoveClicked}>
				<IoIosRemove />
			</button>
		</div>
	);
}
