import renderCards from '../../../../data/cards'
import styles from '../../../../styles/playingRoom.module.css'
import PlayAnimation from '../animation/PlayAnimation'
const PileCards = ({ imgs, innerWidth, room }) => {
    const size = {
        height: innerWidth > 555 ? '45%' : innerWidth <= 340 ? '25%' : '35%',
        width: innerWidth > 555 ? '70%' : innerWidth <= 340 ? '40%' : '50%'
    }
    const margin = {
        // 490 - 10px
        marginLeft: (innerWidth > 470 && innerWidth <= 490) || innerWidth <= 440 ? '10px' : innerWidth <= 410 ? '15px' : '0px',
        marginRight: innerWidth <= 470 ? '10px' : '0px'
    }
    const position = {
        position: room === 'room2' ? "absolute" : '',
        top: room === 'room2' ? "13%":'0%',
        height: room === 'room2' ? "60%" : '40%',
        //  : room === 'room4' ? '90%'
    }
    return (
        <div className={styles.pile_wrapper} style={{ ...margin, ...position }}>
            {/* <div className='w-50 h-50'> */}
            <img
                src={renderCards().cardImgs.uno}
                // room === 'room4' && innerWidth <= 530 ? 15 : marginRight
                style={{ ...size, opacity: 0.8, marginRight: 22 }}
                alt='uno'
            />
            {/* </div> */}
            {/* <div className='w-50 h-50'> */}
            <img
                src={renderCards().cardImgs[imgs.topCard]}
                style={{ ...size }}
                alt={imgs.topCard}
            />
            {/* </div> */}
            <PlayAnimation />
        </div>
    )
}
export default PileCards