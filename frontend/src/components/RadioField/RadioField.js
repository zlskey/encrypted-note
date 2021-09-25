import { useContext } from 'react'
import { ThemeContext } from '@contexts/ThemeContext'
import { IconCheck } from '@tabler/icons'
import {
	InputField,
	Input,
	Label,
	Checkbox,
	Content,
} from './RadioField.styles'

const RadioField = ({ name, text, isChecked, setIsChecked }) => {
	const { theme } = useContext(ThemeContext)

	return (
		<InputField className="clickable">
			<Input
				value={isChecked}
				onChange={() => setIsChecked(!isChecked)}
				type="checkbox"
				id={name}
			/>

			<Label htmlFor={name}>
				<Checkbox theme={theme}>
					{isChecked && (
						<IconCheck size="100%" color={theme.fontColor} />
					)}
				</Checkbox>

				<Content>{text}</Content>
			</Label>
		</InputField>
	)
}

export default RadioField
