import styles from '../../../styles/playingRoom.module.css'
import animation from '../../../styles/animation.module.css'
import renderCards from "../../../data/cards"
import { useEffect, useState } from 'react'
import PileCards from './cards/PileCards';
import UserCards, { UserCards2 } from './cards/UserCards';
import { Button, Col } from 'reactstrap';
import PlayDrawButton from './buttons/PlayDrawBtn';

const Room5 = ({ loginRoom, waitingRoom, userCards, otherUserCards, pileCards, turn, socket }) => {
    const users = waitingRoom.users
    const loginData = loginRoom.data
    // const users = ['nga', 'hong', 'nobi', 'trang', 'danhdiep']
    // const loginData = { roomCode: 1, username: 'nobi' }
    // // const userCards
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
        <div className={styles.playing_room_wrapper_2} style={{ height: innerWidth > 425 ? '80%' : '75%' }}>
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
                <PileCards imgs={pileCards} innerWidth={innerWidth} room='room4' />

                {/* Players top */}
                <div className='d-flex justify-content-center w-100'>
                    {[newUsers[2], newUsers[3]].map((user, index) => (
                        <>
                            <div
                                key={user}
                                className='d-flex align-items-center flex-column'
                                style={{
                                    marginRight: index === 0 ? 22 : 0,
                                    // marginLeft: index === 1 ? 22 : 0
                                }}
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
                                <div style={{ width: otherUserCards.find(obj => obj.username === user)?.imgs.length > 7 ? '70%' : '' }}>
                                    <UserCards2 userCards={otherUserCards.find(obj => obj.username === user)} innerWidth={innerWidth} />
                                </div>
                            </div >
                        </>
                    ))}
                </div>
                {/* Left & right */}
                <div style={{ position: 'absolute', top: '28%', width: '100%', height: '40%' }}>
                    <div className='w-100 d-flex justify-content-evenly align-items-center h-100'>
                        {[newUsers[1], newUsers[4]].map((user, index) => (
                            <>
                                <div style={{ height: '100%', width: innerWidth > 572 ? '33%' : innerWidth <= 572 && innerWidth >= 530 ? '45%' : '50%' }}>
                                    <div
                                        className='d-flex align-items-center justify-content-center w-100 h-100'
                                        style={{
                                            flexDirection: index === 1 ? 'row-reverse' : 'row',
                                        }}
                                    >
                                        <div className={styles.user_wrapper} style={{
                                            // rotate: '270deg',
                                            transform: 'rotate(270deg)',
                                            flexDirection: index === 1 ? 'column-reverse' : 'column',
                                            zIndex: 10,
                                            height: '100%',
                                            width: '100%',
                                            alignItems: 'center'
                                        }}>
                                            <span >{user}</span>
                                            {turn?.user === user
                                                ? <div className={animation.count_time_box} style={{ width: '90%' }}>
                                                    {/* <CountTimeProgress progress={progress} time={countDown.time} /> */}
                                                    <div className={animation.count_time_bar} style={{ width: '32%' }}></div>
                                                </div>
                                                : <></>
                                            }

                                            <div style={{ width: otherUserCards.find(obj => obj.username === user)?.imgs.length < 7 ? '' : innerWidth > 425 && innerWidth <= 768 ? '52%' : innerWidth > 768 ? '40%' : '60%' }}>

                                                <UserCards2 userCards={otherUserCards.find(obj => obj.username === user)} innerWidth={innerWidth} />
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
export default Room5