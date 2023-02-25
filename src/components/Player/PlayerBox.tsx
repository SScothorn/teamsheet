import { Player } from './Player';
import { IoIosRemove } from 'react-icons/io';
import './Player.css';

export type PlayerBoxProps = {
	index: number;
	player: Player;
	onRemoveClicked: () => void;
};

export default function PlayerBox(props: PlayerBoxProps) {
	const { onRemoveClicked, player, index } = props;
	return (
		<div className="PlayerBox">
			<div className="PlayerBox__Number PlayerBox__Background">
				<span className="Number">{index}</span>
			</div>
			<div className="PlayerBox__Name PlayerBox__Background">
				<span>{player.name}</span>
				<button className="PlayerBox__DeleteButton" onClick={onRemoveClicked}>
					<IoIosRemove />
				</button>
			</div>
		</div>
	);
}
