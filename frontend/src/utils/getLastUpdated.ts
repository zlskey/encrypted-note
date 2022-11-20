const getLastUpdated = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()

    if (date.toLocaleDateString === now.toLocaleDateString) {
        return `today, at ${date.toLocaleTimeString()}`
    }

    return date.toLocaleDateString()
}

export default getLastUpdated
