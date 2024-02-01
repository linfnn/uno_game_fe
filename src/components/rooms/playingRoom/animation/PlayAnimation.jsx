import 'animate.css'
import styles from '../../../../styles/animation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect, useState } from 'react'
import { changeStateAnimation, setAnimationTime, togglePlayAnimation } from '../../../../store/gameReducer'
const PlayAnimation = () => {
    const { animation } = useSelector(state => state.gameReducer)
    // const [displayTime, setDisplayTime] = useState(4)
    // const [animationTime, setAnimationTime] = useState(3)
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        if (animation.display) {
            const countDown = setInterval(() => {
                if (animation.time.display > 0) {
                    dispatch(setAnimationTime({ flag: 'display' }))
                } else {
                    clearInterval(countDown)
                }
            }, 1000)
            if (animation.time.display === 0) {
                dispatch(togglePlayAnimation({ display: false, flag: 'removeAnimation' }))
            }
            return () => {
                clearInterval(countDown)
            };
        }
    }, [animation.display, animation.time.display])
    useLayoutEffect(() => {
        if (animation.state === 'in') {
            const countDown = setInterval(() => {
                if (animation.time.state > 0) {
                    dispatch(setAnimationTime({ flag: 'state' }))
                } else {
                    clearInterval(countDown)
                }
            }, 1000)
            if (animation.time.state === 0) {
                dispatch(changeStateAnimation('out'))
            }
            return () => {
                clearInterval(countDown)
            };
        }
    }, [animation.state, animation.time.state])
    const renderNoti = () => {
        if (animation.type.skip) {
            return <img width="70" height="70" src="https://img.icons8.com/external-prettycons-flat-prettycons/47/000000/external-forbidden-essentials-prettycons-flat-prettycons.png" alt="external-forbidden-essentials-prettycons-flat-prettycons" />
        }
        if (animation.type.reverse) {
            return <img width="70" height="70" src="https://img.icons8.com/color/48/synchronize--v1.png" alt="synchronize--v1" />
        }
        if (animation.type.draw[0] === true) {
            return `+${animation.type.draw[1]}`
        }
        if (animation.type.wild[0] === true) {
            return animation.type.wild[1].toUpperCase()
        }
    }
    return (
        <div className={styles.draw_wrapper} style={{ display: animation.display ? 'block' : 'none' }}>
            <div
                style={{ color: animation.type.wild[1] }}
                className={`${styles.draw_text} animate__animated ${animation.state === 'in' ? 'animate__bounceIn' : 'animate__fadeOut'} ${animation.state === 'in' ? 'animate__slow' : 'animate__fast'}`} >
                {renderNoti()}
            </div>
        </div >
    )
}

export default PlayAnimation
