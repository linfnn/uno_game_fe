import styles from '../../../styles/playingRoom.module.css'
import animation from '../../../styles/animation.module.css'

import { useEffect, useState } from 'react'
import PileCards from './cards/PileCards';
import UserCards, { UserCards2 } from './cards/UserCards';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import PlayDrawButton from './buttons/PlayDrawBtn';

const Room3 = ({ loginRoom, waitingRoom, userCards, pileCards, turn, socket }) => {
    const { otherUserCards } = useSelector(state => state.gameReducer)
    // const users = ['nga', 'hongtang', 'danh'] //waitingRoom.users
    // userCards
    const users = waitingRoom.users
    const loginData = loginRoom.data
    // Tìm vị trí của phần tử có giá trị là name trong mảng
    let index = users.indexOf(loginData.username);
    // Tạo mảng mới bằng cách sử dụng slice để cắt và nối các phần tử
    let newUsers = users.slice(index).concat(users.slice(0, index));

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [otherCards, setOtherCards] = useState(otherUserCards)
    useEffect(() => {
        setOtherCards(otherUserCards)
        window.addEventListener('resize', () => setInnerWidth(window.innerWidth))
        return window.removeEventListener('resize', () => setInnerWidth(window.innerWidth))
    }, [innerWidth, otherUserCards.length])
    return (
        <div className={styles.playing_room_wrapper_2} style={{ height: '80%' }}>
            <div
                className={styles.room2_wrapper}
                style={{ position: 'relative', height: '100%', flexDirection: 'column-reverse' }}>
                {/* Players */}
                {/* main players */}
                <div
                    className='d-flex align-items-center w-100 flex-column-reverse'
                >
                    <div className={styles.user_wrapper}>
                        {turn?.user === newUsers[0]
                            ? <div className={animation.count_time_box}>
                                {/* <CountTimeProgress progress={progress} time={countDown.time} /> */}
                                <div className={animation.count_time_bar}></div>
                            </div>
                            : <></>
                        }
                        <span>{newUsers[0]}</span>
                    </div>
                    {/* <div style={{ paddingLeft: 10 }}> */}
                    {turn?.user === newUsers[0]
                        ? <div className='d-flex flex-column' >
                            <PlayDrawButton socket={socket} />
                            <UserCards userCards={userCards} innerWidth={innerWidth} suitCards={turn.suitCards} />
                        </div>
                        : <UserCards userCards={userCards} innerWidth={innerWidth} suitCards={turn.suitCards} />
                    }

                    {/* </div> */}
                </div >
                {/* Pile cards */}
                <PileCards imgs={pileCards} innerWidth={innerWidth} room='room3' />

                {/* Players top */}
                <div className='d-flex justify-content-evenly w-100'>
                    {[newUsers[1], newUsers[2]].map((user, index) => (
                        <>
                            <div
                                key={user}
                                className='d-flex align-items-center flex-column'
                            >
                                <div className={styles.user_wrapper} style={{ width: '100%' }}>
                                    <span>{user}</span>
                                    {turn?.user === user
                                        ? <div className={animation.count_time_box}>
                                            <div className={animation.count_time_bar}></div>
                                        </div>
                                        : <></>
                                    }
                                </div>
                                {/* <div style={{ paddingLeft: 10 }}> */}
                                <UserCards2 userCards={otherCards.find(obj => obj.username === user)} innerWidth={innerWidth} />


                                {/* </div> */}
                            </div >
                        </>
                    ))}
                </div>
                {/* Pile cards */}

            </div>

        </div >
    )
}

export default Room3