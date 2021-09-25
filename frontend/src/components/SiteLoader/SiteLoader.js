import { useContext } from 'react'

import { ThemeContext } from '@contexts/ThemeContext'
import { Loader } from './SiteLoader.styles'

const SiteLoader = () => {
    const { theme } = useContext(ThemeContext)

    // I know it`s nonsense but it looks cool for me 🤷‍♂️
    return (
        <Loader theme={theme}>
            <div className='blockBorders'>
                <div className='inlineBorders'>
                    <div className='blockBorders'>
                        <div className='inlineBorders'>
                            <div className='blockBorders'>
                                <div className='inlineBorders'>
                                    <div className='blockBorders'>
                                        <div className='inlineBorders'>
                                            <div className='blockBorders'>
                                                <div className='inlineBorders'>
                                                    <div className='blockBorders'>
                                                        <div className='inlineBorders'>
                                                            <div className='blockBorders'>
                                                                <div className='inlineBorders'>
                                                                    <div className='blockBorders'>
                                                                        <div className='inlineBorders'>
                                                                            <div className='blockBorders'>
                                                                                <div className='inlineBorders'>
                                                                                    <div className='blockBorders'>
                                                                                        <div className='inlineBorders'></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Loader>
    )
}

export default SiteLoader
