import { Value, Content } from './SettingComponent.styles'

const SettingComponent = ({
	description,
	value,
	children,
	setShowSetting,
	showSetting,
}) => (
	<Content>
		<p>
			{description}
			<Value
				onClick={() => setShowSetting(currentValue => !currentValue)}
			>
				{value}
			</Value>
		</p>

		{showSetting && children}
	</Content>
)

export default SettingComponent
