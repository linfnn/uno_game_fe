import styles from '../../../styles/playingRoom.module.css'
import animation from '../../../styles/animation.module.css'
import renderCards from "../../../data/cards"
import { useEffect, useState } from 'react'
import PileCards from './cards/PileCards';
import UserCards, { UserCards2 } from './cards/UserCards';
import { Button, Col } from 'reactstrap';
import PlayDrawButton from './buttons/PlayDrawBtn';

const Room4 = ({ loginRoom, waitingRoom, userCards, otherUserCards, pileCards, turn, socket }) => {


    // userCards
    const users = waitingRoom.users
    const loginData = loginRoom.data
    // Tìm vị trí của phần tử có giá trị là name trong mảng
    let index = users.indexOf(loginData.username);
    // Tạo mảng mới bằng cách sử dụng slice để cắt và nối các phần tử
    let newUsers = users.slice(index).concat(users.slice(0, index));

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setInnerWidth(window.innerWidth))
        return window.removeEventListener('resize', () => setInnerWidth(window.innerWidth))
    }, [innerWidth])

    return (
        <div className={styles.playing_room_wrapper_2} style={{ height: innerWidth > 425 ? '80%' : '70%' }}>
            <div
                className={styles.room2_wrapper}
                style={{ position: 'relative', height: '90%', flexDirection: 'column-reverse' }}>
                {/* Players */}

                {/* main players */}
                <div
                    className='d-flex align-items-center w-100 flex-column-reverse'
                >
                    <div className={styles.user_wrapper}>
                        <div className={animation.count_time_box}>
                            {/* <CountTimeProgress progress={progress} time={countDown.time} /> */}
                            <div className={animation.count_time_bar}></div>
                        </div>
                        <span>{newUsers[0]}</span>
                    </div>
                    {/* <div style={{ paddingLeft: 10 }}> */}
                    <div className='d-flex flex-column' >
                        <PlayDrawButton socket={socket} />
                        <UserCards userCards={userCards} innerWidth={innerWidth} suitCards={turn.suitCards} />
                    </div>
                    {/* </div> */}
                </div >
                <PileCards imgs={pileCards} innerWidth={innerWidth} room='room4' />
                {/* Pile cards & player2,4 */}
                {/* Player top*/}
                <div
                    className='d-flex align-items-center w-50 flex-column'
                >
                    <div className={styles.user_wrapper}>
                        <span>{newUsers[2]}</span>
                        <div className={animation.count_time_box}>
                            <div className={animation.count_time_bar}></div>
                        </div>
                    </div>
                    <UserCards2 userCards={otherUserCards.find(obj => obj.username === newUsers[2])} innerWidth={innerWidth} />
                </div >
                <div style={{ position: 'absolute', top: '28%', width: '100%', height: '40%' }}>
                    <div className='w-100 d-flex justify-content-evenly align-items-center h-100'>
                        {[newUsers[1], newUsers[3]].map((user, index) => (
                            <>
                                <div style={{ height: '100%', width: innerWidth > 572 ? '33%' : innerWidth <= 572 && innerWidth >= 530 ? '45%' : '50%' }}>
                                    <div
                                        className='d-flex align-items-center justify-content-center w-100 h-100'
                                        style={{
                                            flexDirection: index === 1 ? 'row-reverse' : 'row',
                                        }}
                                    >
                                        <div className={styles.user_wrapper} style={{
                                            rotate: '270deg',
                                            flexDirection: index === 1 ? 'column-reverse' : 'column',
                                            zIndex: 10,
                                            height: '100%',
                                            width: '100%'
                                        }}>
                                            <span style={{ rotate: '90deg' }}>{user}</span>
                                            <div className={animation.count_time_box}>
                                                <div className={animation.count_time_bar} style={{ width: '38%' }}></div>
                                            </div>
                                            <div>
                                                <UserCards2 imgs={otherUserCards.find(obj => obj.username === user)} innerWidth={innerWidth} />
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </>
                        ))}
                    </div >

                </div>

            </div>

        </div >
    )
}

export default Room4