import styled from 'styled-components'

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

const Value = styled.span`
	color: #03a9f4;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	font-size: 18px;
	margin-block: 1rem;

	form {
		margin: 0 auto;
		margin-top: -15px;
		transform: scale(0.95);
		width: 80%;
	}
`

export default SettingComponent
