import { SyntheticEvent, useEffect, useState } from 'react';
import { Player } from './Player';

export type PlayerFormProps = {
	onSubmit: (player: Player) => void;
	onCancel: () => void;
};

export default function PlayerForm(props: PlayerFormProps) {
	const { onSubmit, onCancel } = props;
	const [name, setName] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [shouldShowErrors, setShouldShowErrors] = useState(false);

	useEffect(validate, [name, shouldShowErrors]);

	function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();
		if (!isValid()) {
			setShouldShowErrors(true);
			return;
		}
		const player: Player = {
			name,
		};
		// console.log(player);
		onSubmit(player);
	}

	function onNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
		setShouldShowErrors(false);
	}

	function validate() {
		const newErrors: string[] = [];

		if (name.length <= 0) {
			newErrors.push('Name is required.');
		}
		// console.log(`Should show errors: ${shouldShowErrors}. Validate: ${newErrors}`);
		setErrors(newErrors);
	}

	function isValid() {
		// console.log(`Is Valid: ${errors.length === 0}`);
		return errors.length === 0;
	}

	const errorText = errors.map((error, i) => {
		return <div key={i}>{error}</div>;
	});

	return (
		<>
			{shouldShowErrors && errorText}
			<form>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" value={name} onChange={onNameChanged} />
			</form>
			<button onClick={handleSubmit}>Save</button>
			<button onClick={onCancel}>Cancel</button>
		</>
	);
}
