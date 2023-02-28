import { Player } from './Player';
import { IoIosRemove, IoIosSwap } from 'react-icons/io';
import './Player.css';

export type PlayerBoxProps = {
	index: number;
	player: Player;
	onRemoveClicked?: () => void;
	onSwapClicked?: () => void;
};

export default function PlayerBox(props: PlayerBoxProps) {
	const { onRemoveClicked, onSwapClicked, player, index } = props;
	return (
		<div className="PlayerBox">
			<div className="PlayerBox__Number PlayerBox__Background">
				<span className="Number">{index}</span>
			</div>
			<div className="PlayerBox__Name PlayerBox__Background">
				<span>{player.name}</span>
				<div className="PlayerBox__ButtonsContainer">
					{onRemoveClicked !== undefined && (
						<button className="PlayerBox__DeleteButton" onClick={onRemoveClicked}>
							<IoIosRemove />
						</button>
					)}
					{onSwapClicked !== undefined && (
						<button className="PlayerBox__DeleteButton" onClick={onSwapClicked}>
							<IoIosSwap />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
