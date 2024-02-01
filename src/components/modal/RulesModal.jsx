import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRuleModal } from '../../store/globalReducer';
import renderCards from '../../data/cards';
import { Col } from 'reactstrap';
import { IconButton } from '@mui/material';
import { IoClose } from "react-icons/io5";
import { PiDotBold } from "react-icons/pi";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function RuleModal() {
    const { ruleModal } = useSelector(state => state.globalReducer)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(toggleRuleModal())
    }
    const actionCards = renderCards().cardImgs
    const skipCards = [actionCards.r_skip, actionCards.y_skip, actionCards.b_skip, actionCards.g_skip]
    const reverseCards = [actionCards.r_reverse, actionCards.y_reverse, actionCards.b_reverse, actionCards.g_reverse]
    const drawCards = [actionCards.r_draw, actionCards.y_draw, actionCards.b_draw, actionCards.g_draw]
    const wildCard = actionCards.wild
    const drawFourCard = actionCards.drawFour
    return (
        <Dialog
            open={ruleModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className='text-center'>
                <h3><b>How to play uno game?</b></h3>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <IoClose />
            </IconButton>
            <DialogContent style={{ paddingTop: 5 }}>
                <DialogContentText id="alert-dialog-slide-description">
                    <b className='text-dark text-decoration-underline'> Main rule:</b>
                    <br /> <PiDotBold /> Play a card which matches the top card of the discard pile in either number or color.
                    <br /> <PiDotBold /> If you don't have any playable card, draw a card from draw pile.
                    <br /> <PiDotBold /> If that card is playable, you can play it; otherwise, your turn ends.
                    <br /> <PiDotBold /> You will win the game when you has no cards left.
                    <br /> <PiDotBold /> You will lose if you have the highest score.
                    <br /> <PiDotBold /> Example: the top pile card is red 7, you must play card which number is 7 or color is red.
                </DialogContentText>
                <DialogContentText style={{ paddingTop: 15 }}>
                    <b className='text-dark text-decoration-underline'> Scoring:</b>
                    <br /> <PiDotBold /> Number cards: Face value.
                    <br /> <PiDotBold /> Skip, Reverse, and Draw Two: 10 points.
                    <br /> <PiDotBold /> Wild and Wild Draw Four: 20 points.
                </DialogContentText>
                <DialogContentText style={{ paddingTop: 15 }}>
                    <b className='text-dark text-decoration-underline'>Special Action Cards:</b>
                    <ul className='px-0'>
                        <li className='d-flex my-1 align-items-center flex-wrap'>
                            <Col md={3}>
                                <span className='d-flex'>
                                    {skipCards.map((skip, index) => (
                                        <img key={index} src={skip} width={30} height={50} style={{ marginRight: 4 }} />
                                    ))}
                                </span>
                            </Col>
                            <Col md={9}>
                                <span className='px-2'>Skips the next player's turn.</span>
                            </Col>
                        </li>
                        <li className='d-flex my-1 align-items-center flex-wrap'>
                            <Col md={3}>
                                <span className='d-flex'>
                                    {reverseCards.map((reverse, index) => (
                                        <img key={index} src={reverse} width={30} height={50} style={{ marginRight: 4 }} />
                                    ))}
                                </span>
                            </Col>
                            <Col md={9}>
                                <span className='px-2'>Reverses the direction of play.</span>
                            </Col>
                        </li>
                        <li className='d-flex my-1 align-items-center flex-wrap'>
                            <Col md={3}>
                                <span className='d-flex'>
                                    {drawCards.map((draw, index) => (
                                        <img key={index} src={draw} width={30} height={50} style={{ marginRight: 4 }} />
                                    ))}
                                </span>
                            </Col>
                            <Col md={9}>
                                <span className='px-2'>Forces the next player to draw two cards and skip their turn.</span>
                            </Col>
                        </li>
                        <li className='d-flex my-1 align-items-center flex-wrap'>
                            <Col md={3}>
                                <span className='d-flex'>
                                    <img src={drawFourCard} width={30} height={50} />
                                </span>
                            </Col>
                            <Col md={9}>
                                <span className='px-2'>Choose the next color, forces the next player to draw four cards then skip their turn.</span>
                            </Col>
                        </li>
                        <li className='d-flex my-1 align-items-center flex-wrap'>
                            <Col md={3}>
                                <span className='d-flex'>
                                    <img src={wildCard} width={30} height={50} />
                                </span>
                            </Col>
                            <Col md={9}>
                                <span className='px-2'>Choose the next color to be played.</span>
                            </Col>
                        </li>
                    </ul>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
