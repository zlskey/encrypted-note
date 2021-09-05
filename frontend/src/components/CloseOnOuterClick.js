import React, { useEffect, useRef } from "react"

const CloseOnOuterClick = ({ children, setSomething, valueToSet = false }) => {
    const node = useRef(null)

    const handleClick = e => {
        if (!node.current) return

        if (node.current.contains(e.target)) return
        else setSomething(valueToSet)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [valueToSet])

    return <span ref={node}>{children}</span>
}

export default CloseOnOuterClick;