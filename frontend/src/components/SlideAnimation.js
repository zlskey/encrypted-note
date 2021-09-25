import { useTransition, animated } from 'react-spring'

const SlideAnimation = ({ isVisible, children, start, end }) => {
	const transition = useTransition(isVisible, {
		from: { ...start, opacity: 0, position: 'absolute' },
		enter: { ...end, opacity: 1, position: 'static' },
		leave: { ...start, opacity: 0, position: 'absolute' },
	})

	return (
		<>
			{transition(
				(style, item) =>
					item && (
						<animated.div style={style}>{children}</animated.div>
					)
			)}
		</>
	)
}

export default SlideAnimation
