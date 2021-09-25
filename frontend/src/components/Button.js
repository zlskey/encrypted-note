import styled from 'styled-components'

const Button = ({ content, ...props }) => {
	return (
		<StyledButton className="clickable" {...props}>
			{content}
		</StyledButton>
	)
}

const StyledButton = styled.button`
	background-color: #2196f3;
	color: #fafafa;
	margin-top: 15px;
	outline: none;
	border: none;
	padding: 10px 30px;
	font-size: 1em;
	border-radius: 5px;
`

export default Button
