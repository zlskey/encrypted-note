export const getSize = () => {

    const width = window.innerWidth

    if (width > 1400) return '18px'
    else if (width > 1200) return '17px'
    else return '16px'

}

export const getColumns = () => {

    const width = window.innerWidth

    if (width > 1500) return '1fr 1fr 1fr 1fr'
    else if (width > 1000) return '1fr 1fr 1fr'
    else return '1fr 1fr'
}

