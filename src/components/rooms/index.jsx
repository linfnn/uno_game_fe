import io from 'socket.io-client';
import styles from '../../styles/rooms.module.css'
import logo from '../../img/logo.png'
import { Card } from 'reactstrap'
import { useEffect, useLayoutEffect, useState } from 'react'
import 'animate.css'
import LoginRoom from './LoginRoom';
import WaitingRoom from './WaitingRoom';
import PlayingRoom from './playingRoom';
import { useDispatch, useSelector } from 'react-redux';
import { setWaitingRoom, togglePlayingRoom } from '../../store/roomReducer';
import { removeTurn, setCurrentUserIndex, setOtherUserCards, setPileCards, setTurn, setUserCards, setWildColor, togglePlayAnimation } from '../../store/gameReducer';
import renderCards from '../../data/cards';
import { toggleRuleModal, toggleWinModal } from '../../store/globalReducer';


const Rooms = () => {
    const socket = io('https://uno-game-be.onrender.com');

    const [renderLogo, setRenderLogo] = useState(true)

    const { loginRoom, waitingRoom, playingRoom } = useSelector(state => state.roomReducer)
    const { ruleModal } = useSelector(state => state.globalReducer)

    const dispatch = useDispatch()
    const imgArr = renderCards().cardImgs

    useEffect(() => {
        socket.on('leaved', (data) => {
            console.log(`${data.username} leaved room ${data.roomCode}`);
            dispatch(setWaitingRoom({
                host: data?.rooms?.host,
                users: data?.rooms?.users,
                roomCode: data.roomCode
            }))
            if (playingRoom.status === true) {
                dispatch(togglePlayingRoom({ playingRoom: false, waitingRoom: false }))
            }
            dispatch(togglePlayAnimation({ display: false, flag: 'removeAnimation' }))
            dispatch(removeTurn())
            console.log(waitingRoom)
        })
        socket.on('started', data => {
            if (ruleModal === true) {
                dispatch(toggleRuleModal())
            }
            if (data) {
                socket.on('divided', dividedCard => {
                    const username = loginRoom.data.username
                    const cards = dividedCard.userCards
                    console.log(dividedCard)
                    for (var key in cards) {
                        if (key === username) {
                            const imgs = cards[key].map(card => imgArr[card])
                            dispatch(setUserCards({ username: key, cards: cards[key], imgs }))
                        } else {
                            const otherUser = { username: key, cards: cards[key], imgs: Array(cards[key].length).fill(imgArr.uno) }
                            dispatch(setOtherUserCards(otherUser))
                        }
                    }
                    dispatch(setPileCards({ pileCard: dividedCard.pileCard, residualCards: dividedCard.residualCards }))
                })
                socket.on('firstTurn', (data) => {
                    dispatch(setTurn(data))
                })
            }
            dispatch(togglePlayingRoom({ playingRoom: true, waitingRoom: false }))
        })
        socket.on('played', (noti) => {
            if (noti === 'valid card & won the game') {
                // Xử lý giao diện chiến thắng
                socket.on('won', data => {
                    dispatch(setPileCards({ pileCard: data.pileCard }))
                    data.winner === loginRoom.data.username
                        ? dispatch(setUserCards({ username: loginRoom.data.username, cards: [], imgs: [] }))
                        : dispatch(setOtherUserCards({ username: data.winner, cards: [], imgs: [] }))
                    dispatch(toggleWinModal({ state: true, user: data.winner }))
                    dispatch(removeTurn())
                })
            } else if (noti === 'valid card') {
                socket.on('nextTurn', (data) => {
                    console.log('played data: ', data)
                    // Xử lý next turn nhận được dữ liệu pile card, user(tiếp theo), suitCards, wildColor
                    // Xử lý hiện thị số lượng card 
                    data.prevUser.username === loginRoom.data.username
                        ? dispatch(setUserCards({ username: loginRoom.data.username, cards: data.prevUser.cards, imgs: data.prevUser.cards.map(card => imgArr[card]) }))
                        : dispatch(setOtherUserCards({ username: data.prevUser.username, cards: data.prevUser.cards, imgs: Array(data.prevUser.cards.length).fill(imgArr.uno) }))
                    // Xử lý pile card
                    dispatch(setPileCards({ pileCard: data.pileCard, residualCards: data.residualCards }))
                    // Xử lý animation
                    if (data.pileCard === 'drawFour' || data.pileCard.includes('_draw') || data.pileCard === 'wild' || data.pileCard.includes('skip')) {
                        dispatch(togglePlayAnimation({ display: true, state: 'in', pileCard: data.pileCard, draw: data.draw, color: data.wildColor, flag: 'play' }))
                    } else {
                        dispatch(togglePlayAnimation({ display: false, pileCard: data.pileCard, flag: 'removeAnimation' }))
                    }
                    // Xử lý lượt đi người tiếp theo
                    dispatch(setTurn({ user: data.nextUser.username, suitCards: data.suitCards }))
                    dispatch(setCurrentUserIndex(data.nextUser.index))
                    // Xử lý màu
                    dispatch(setWildColor(data.wildColor))
                })
            }
        })
        socket.on('drew', (noti) => {
            console.log('đã lắng nghe sự kiện drew từ server')
            if (noti === 'user successfully drew') {
                socket.on('nextTurn', (data) => {
                    // Xử lý next turn nhận được dữ liệu pile card, user(tiếp theo), suitCards, wildColor
                    // Xử lý hiện thị số lượng card 
                    data.prevUser.username === loginRoom.data.username
                        ? dispatch(setUserCards({ username: loginRoom.data.username, cards: data.prevUser.cards, imgs: data.prevUser.cards.map(card => imgArr[card]) }))
                        : dispatch(setOtherUserCards({ username: data.prevUser.username, cards: data.prevUser.cards, imgs: Array(data.prevUser.cards.length).fill(imgArr.uno) }))
                    // Xử lý pile card
                    dispatch(setPileCards({ pileCard: data.pileCard, residualCards: data.residualCards }))
                    // Xử lý animation
                    dispatch(togglePlayAnimation({ display: true, state: 'in', pileCard: data.pileCard, draw: data.draw, flag: 'draw' }))
                    // Xử lý lượt đi người tiếp theo
                    if (data.nextUser.username === data.prevUser.username) {
                        dispatch(setTurn({ user: data.nextUser.username, suitCards: data.suitCards, passBtn: true }))
                    } else {
                        dispatch(setTurn({ user: data.nextUser.username, suitCards: data.suitCards }))
                    }
                    dispatch(setCurrentUserIndex(data.nextUser.index))
                    // Xử lý màu
                    dispatch(setWildColor(data.wildColor))
                })
            }
        })
        socket.on('passed', (noti) => {
            if (noti === 'user successfully passed') {
                socket.on('nextTurn', (data) => {
                    // Xử lý next turn nhận được dữ liệu pile card, user(tiếp theo), suitCards, wildColor
                    // Xử lý hiện thị số lượng card 
                    data.prevUser.username === loginRoom.data.username
                        ? dispatch(setUserCards({ username: loginRoom.data.username, cards: data.prevUser.cards, imgs: data.prevUser.cards.map(card => imgArr[card]) }))
                        : dispatch(setOtherUserCards({ username: data.prevUser.username, cards: data.prevUser.cards, imgs: Array(data.prevUser.cards.length).fill(imgArr.uno) }))
                    // Xử lý pile card
                    dispatch(setPileCards({ pileCard: data.pileCard, residualCards: data.residualCards }))
                    // Xử lý animation
                    dispatch(togglePlayAnimation({ display: true, flag: 'removeAnimation' }))
                    // Xử lý lượt đi người tiếp theo
                    dispatch(setTurn({ user: data.nextUser.username, suitCards: data.suitCards }))
                    dispatch(setCurrentUserIndex(data.nextUser.index))
                    // Xử lý màu
                    dispatch(setWildColor(data.wildColor))
                })
            }
        })
    }, [socket])
    // console.log(playingRoom.status)
    // Animation
    useLayoutEffect(() => {
        const timeoutLogo = setTimeout(() => {
            setRenderLogo(false)
        }, 3000)
        return () =>
            clearTimeout(timeoutLogo)
    }, [])
    // Direct to playing room

    return (
        <div className={styles.login_container}>
            {playingRoom.status === false
                ? <div className={styles.login_wrapper}>
                    <img src={logo} alt='logo'
                        style={{ display: renderLogo ? 'block' : 'none' }}
                        className={`${styles.login_logo} animate__animated animate__fadeOutUp animate__delay-2s animate__fast`}
                    />
                    <Card
                        style={{
                            display: renderLogo ? 'none' : 'flex'
                        }}
                        className={`${styles.login_card} animate__animated animate__zoomIn animate__fast`}
                    >
                        <img
                            alt="Sample"
                            src={logo}
                            style={{ width: "50%", padding: '25px 0' }}
                        />
                        {
                            waitingRoom.status === false
                                ? <LoginRoom socket={socket} />
                                : <WaitingRoom socket={socket} />
                        }
                    </Card>
                    {/* <PlayingRoom /> */}
                </div>
                : <PlayingRoom socket={socket} />
            }
        </div>
    )
}
export default Rooms