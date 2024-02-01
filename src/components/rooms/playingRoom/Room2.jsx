import styles from '../../../styles/playingRoom.module.css'
import animation from '../../../styles/animation.module.css'
import { useEffect, useState } from 'react'
import PileCards from './cards/PileCards';
import UserCards from './cards/UserCards';
import { Button } from 'reactstrap';
import PlayDrawButton from './buttons/PlayDrawBtn';
import { useDispatch } from 'react-redux';
import { countDown } from '../../../store/gameReducer';

const Room2 = ({ loginRoom, waitingRoom, userCards, otherUserCards, pileCards, turn, socket }) => {
    // const users = ['nga', 'hongtang'] //waitingRoom.users
    const users = waitingRoom.users
    const loginData = loginRoom.data
    // Tìm vị trí của phần tử có giá trị là name trong mảng
    let index = users.indexOf(loginData.username);
    // Tạo mảng mới bằng cách sử dụng slice để cắt và nối các phần tử
    let newUsers = users.slice(index).concat(users.slice(0, index));

    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()
    useEffect(() => {
        window.addEventListener('resize', () => setInnerWidth(window.innerWidth))
        return window.removeEventListener('resize', () => setInnerWidth(window.innerWidth))
    }, [innerWidth])
    // const [time, setTime] = useState(turn.time)
    
    return (
        <div className={styles.playing_room_wrapper}>
            <div
                className={styles.room2_wrapper}
                style={{ position: 'relative', height: '100%', flexDirection: 'column-reverse' }}>
                {/* Players */}
                {newUsers.map((user, index) => (
                    <>
                        <div key={user} className='d-flex align-items-center w-100' style={{ flexDirection: index === 0 ? 'column-reverse' : 'column' }}>
                            <div className={styles.user_wrapper}>
                                {index === 1 ? <span>{user}</span> : <></>}
                                {turn?.user === user
                                    ? <div className={animation.count_time_box}>
                                        {/* <CountTimeProgress progress={progress} time={countDown.time} /> */}
                                        <div className={animation.count_time_bar}></div>
                                    </div>
                                    : <></>
                                }
                                {index === 0 ? <span>{user}</span> : <></>}
                            </div>
                            {
                                turn?.user === user && user === loginData.username
                                    ? <div className='d-flex flex-column' >
                                        <PlayDrawButton socket={socket} />
                                        <UserCards userCards={user === loginData.username ? userCards : otherUserCards[0]} innerWidth={innerWidth} suitCards={turn.suitCards} />
                                    </div>
                                    : <UserCards userCards={user === loginData.username ? userCards : otherUserCards[0]} innerWidth={innerWidth} suitCards={turn.suitCards} />
                            }
                        </div >
                    </>
                ))}
                {/* Pile cards */}
                <PileCards imgs={pileCards} innerWidth={innerWidth} room='room2' />
            </div>

        </div >
    )
}
// const [progress, setProgress] = useState(0);
// const [countDown, setCountDown] = useState({
//     status: false,
//     time: 15
// })
// useEffect(() => {
//     const time = setInterval(() => {
//         if (countDown.time > 0) {
//             setCountDown(prev => {
//                 return {
//                     ...prev,
//                     time: prev.time - 1
//                 }
//             })
//         } else {
//             clearInterval(time);
//         }

//     }, 1000)

//     return () => {
//         clearInterval(time)
//     };
// }, [countDown.time]);
// useEffect(() => {
//     const timer = setInterval(() => {
//         if (progress <= 100) {
//             setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 6.67));
//         } else {
//             clearInterval(timer)
//         }
//     }, 1000);
//     return () => {
//         clearInterval(timer);
//     }
// }, [progress])
export default Room2