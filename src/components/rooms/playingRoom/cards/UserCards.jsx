import { useDispatch, useSelector } from 'react-redux'
import styles from '../../../../styles/playingRoom.module.css'
import { setChosenCard, setWildColor } from '../../../../store/gameReducer'
const UserCards = ({ userCards, innerWidth, suitCards }) => {
    const { turn, play } = useSelector(state => state.gameReducer)
    const { loginRoom, waitingRoom } = useSelector(state => state.roomReducer)
    const loginData = loginRoom.data.username
    const dispatch = useDispatch()
    const chooseCard = (card, index) => {
        if (card !== 'drawFour' || card !== 'wild') {
            dispatch(setWildColor(card[0]))
        }
        dispatch(setChosenCard({
            card: card,
            cardIndex: index,
            // index: waitingRoom.users.indexOf(userCards?.username),
            roomCode: waitingRoom.roomCode,
        }))
    }
    const userCondition = turn?.user === loginData && turn?.user === userCards?.username
    const suitCondition = userCondition && suitCards?.length === 0
    return (
        <div className='d-flex flex-column justify-content-center'>
            <p style={{ display: suitCondition ? 'block' : 'none', margin: 0, padding: 0 }}>OMG, you don't have any suitable card to play. Please draw 1 card from pile.</p>
            <div className={userCards?.imgs?.length > 8 ? styles.scrollbar_main : ''}>
                {userCards?.imgs?.length !== 0
                    ? userCards?.imgs?.map((img, index) => (
                        <img
                            src={img}
                            className={styles.card_imgs}
                            style={{
                                width: userCondition ? suitCards?.includes(userCards?.cards[index]) ? play?.cardIndex === index ? 70 : 55 : 50 : 50,
                                height: userCondition ? suitCards?.includes(userCards?.cards[index]) ? play?.cardIndex === index ? 90 : 75 : 70 : 70,
                                marginTop: userCondition ? suitCards?.includes(userCards?.cards[index]) ? -10 : 0 : 0,
                                opacity: userCondition ? suitCards?.includes(userCards?.cards[index]) ? 1 : 0.6 : 1,
                                filter: userCondition ? suitCards?.includes(userCards?.cards[index]) ? "brightness(100%)" : 'brightness(80%)' : "brightness(100%)",
                                marginLeft: index !== 0 && innerWidth > 340 && innerWidth <= 460 ? -15 : index !== 0 && innerWidth <= 340 ? -25 : 0
                            }}
                            onClick={() => {
                                chooseCard(userCards?.cards[index], index)
                            }}
                            alt={img}
                        />
                    ))
                    : <></>
                }
            </div>
        </div>
    )
}

export const UserCards2 = ({ userCards, innerWidth, suitCards }) => {
    // 560
    const responsive = {
        // marginLeft: innerWidth >= 450 ? -20 : -20,
        width: innerWidth >= 450 ? 40 : 35,
        height: innerWidth >= 450 ? 55 : 50,
        marginLeft: innerWidth <= 550 ? -28 : -25
    }
    return (
        <div className={userCards?.imgs?.length >= 8 ? styles.scrollbar_main : ''} style={{
            // marginLeft: rotate ? 10 : 0,
            width: '100%'
            // rotate: rotate ? '270deg' : '',
            // width: rotate === undefined || usersCard.imgs.length < 8 ? '90%' : rotate && innerWidth > 768 ? "28%" : '40%'
        }}>

            {userCards?.imgs?.length !== 0
                ? userCards?.imgs?.map((img, index) => (
                    <img
                        src={img}
                        className={styles.card_imgs_2}
                        style={{
                            ...responsive,
                            marginLeft: index === 0 ? 0 : innerWidth <= 550 ? -28 : -25
                        }}
                        alt={img}
                    />
                ))
                : <></>
            }
        </div>
    )
}


export default UserCards