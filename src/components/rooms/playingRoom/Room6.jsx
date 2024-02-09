import styles from '../../../styles/playingRoom.module.css'
import animation from '../../../styles/animation.module.css'
import renderCards from "../../../data/cards"
import { useEffect, useState } from 'react'
import PileCards from './cards/PileCards';
import UserCards, { UserCards2 } from './cards/UserCards';
import { Button, Col } from 'reactstrap';
import PlayDrawButton from './buttons/PlayDrawBtn';

const Room6 = ({ loginRoom, waitingRoom, userCards, otherUserCards, pileCards, turn, socket }) => {
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
        <div className={styles.playing_room_wrapper_2} style={{ height: innerWidth > 425 ? '92%' : '85%' }}>
            <div
                className={styles.room2_wrapper}
                style={{ position: 'relative', height: '90%', flexDirection: 'column-reverse' }}>
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
                    {turn?.user === newUsers[0]
                        ? <div className='d-flex flex-column' >
                            <PlayDrawButton socket={socket} />
                            <UserCards userCards={userCards} innerWidth={innerWidth} suitCards={turn.suitCards} />
                        </div>
                        : <UserCards userCards={userCards} innerWidth={innerWidth} suitCards={turn.suitCards} />
                    }

                    {/* </div> */}
                </div >
                <PileCards imgs={pileCards} innerWidth={innerWidth} room='room4' />
                {/* Players top */}
                <div
                    className='d-flex align-items-center flex-column'
                    style={{ width: otherUserCards.find(obj => obj.username === newUsers[3])?.length > 8 ? '28%' : '' }}
                >
                    <div className={styles.user_wrapper} style={{ width: '100%' }}>
                        <span>{newUsers[3]}</span>
                        {turn?.user === newUsers[3]
                            ? <div className={animation.count_time_box}>
                                <div className={animation.count_time_bar} style={{ width: '30%' }}></div>
                            </div>
                            : <></>
                        }
                    </div>
                    <div style={{ width: otherUserCards.find(obj => obj.username === newUsers[3])?.imgs.length <= 7 ? '' : innerWidth > 768 ? '65%' : '80%' }}>
                        <UserCards2 userCards={otherUserCards.find(obj => obj.username === newUsers[3])} innerWidth={innerWidth} />
                    </div>
                </div >
                {/* Left & right */}
                <div style={{ position: 'absolute', top: innerWidth <= 768 ? '14%' : '24%', width: '100%', height: innerWidth <= 768 ? '70%' : '50%' }}>
                    <div className='w-100 d-flex justify-content-evenly align-items-center h-100'>
                        <div style={{ height: '100%', width: innerWidth > 572 ? '40%' : innerWidth <= 572 && innerWidth >= 530 ? '45%' : '50%', display: 'flex', flexDirection: 'column-reverse' }}>
                            {[newUsers[1], newUsers[2]].map((user, index) => (
                                <>
                                    <div
                                        className='d-flex align-items-center justify-content-center w-100 h-100'
                                    // style={{
                                    //     flexDirection: index === 1 ? 'row-reverse' : 'row',
                                    // }}
                                    >
                                        <div className={styles.user_wrapper} style={{
                                            rotate: '270deg',
                                            flexDirection: 'column',
                                            zIndex: (index + 1) * 10,
                                            height: '100%',
                                            width: '100%',
                                            alignItems: 'center'
                                        }}>
                                            <span>{user}</span>
                                            {turn?.user === user
                                                ? <div className={animation.count_time_box} style={{ width: '100%' }}>
                                                    <div className={animation.count_time_bar} style={{ width: '28%' }}></div>
                                                </div>
                                                : <></>
                                            }
                                            <div style={{ width: otherUserCards.find(obj => obj.username === user)?.imgs.length <= 7 ? '' : innerWidth <= 768 ? '45%' : '28%' }}>
                                                <UserCards2 userCards={otherUserCards.find(obj => obj.username === user)} innerWidth={innerWidth} />
                                            </div>
                                        </div>

                                    </div >
                                </>
                            ))}
                        </div >
                        <div style={{ height: '100%', width: innerWidth > 572 ? '40%' : innerWidth <= 572 && innerWidth >= 530 ? '45%' : '50%', display: 'flex', flexDirection: 'column' }}>
                            {[newUsers[4], newUsers[5]].map((user, index) => (
                                <>
                                    <div
                                        className='d-flex align-items-center justify-content-center w-100 h-100'
                                    // style={{
                                    //     flexDirection: index === 1 ? 'row-reverse' : 'row',
                                    // }}
                                    >
                                        <div className={styles.user_wrapper} style={{
                                            rotate: '270deg',
                                            flexDirection: 'column-reverse',
                                            zIndex: 10,
                                            height: '100%',
                                            width: '100%',
                                            alignItems: 'center'
                                        }}>
                                            <span>{user}</span>
                                            {turn?.user === user
                                                ? <div className={animation.count_time_box} style={{ width: '100%' }}>
                                                    <div className={animation.count_time_bar} style={{ width: '28%' }}></div>
                                                </div>
                                                : <></>
                                            }
                                            <div style={{ width: otherUserCards.find(obj => obj.username === user)?.imgs.length <= 7 ? '' : innerWidth <= 768 ? '45%' : '28%' }}>
                                                <UserCards2 userCards={otherUserCards.find(obj => obj.username === user)} innerWidth={innerWidth} />
                                            </div>
                                        </div>

                                    </div >
                                </>
                            ))}
                        </div >
                    </div >
                </div>
            </div>

        </div >
    )
}
export default Room6