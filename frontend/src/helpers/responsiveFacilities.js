export const getColumns = () => {
    const width = window.innerWidth

    if (width > 1500) return '1fr 1fr 1fr 1fr'
    else if (width > 1000) return '1fr 1fr 1fr'
    else return '1fr 1fr'
}
