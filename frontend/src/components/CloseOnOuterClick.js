import { useEffect, useRef } from "react"

const CloseOnOuterClick = ({ children, setSomething, valueToSet = false }) => {
    const node = useRef(null)

    useEffect(
        () => {
            const handleClick = e => {
                if (!node.current || node.current.contains(e.target)) return
                else setSomething(valueToSet)
            }

            document.addEventListener('click', handleClick)
            return () => document.removeEventListener('click', handleClick)
        },
        [valueToSet, setSomething]
    )

    return <span ref={node}>{children}</span>
}

export default CloseOnOuterClick;