import './style.css';
import {Col, message, Row, Spin} from "antd";
import Title from "antd/lib/typography/Title";
import {useContext, useEffect, useState} from "react";
import tomatoService from "../../service/TomatoService";
import TomatoResponse from "../../dto/TomatoResponse";
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import RenderTime from "./RenderTime";
import AnswerModal from "./AnswerModal";
import {useOutletContext} from "react-router-dom";
import {OutletContext} from "../../context/OutletContext";
import gameService from "../../service/GameService";
import {AuthContext} from "../../context/AuthContext";
import GameDto from '../../dto/GameDto';
import AnswerBtn from "./AnswerBtn";

function Play() {
    const {authDto} = useContext(AuthContext);
    const [tomato, setTomato] = useState<TomatoResponse>();
    const [visible, setVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number|undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [keyTimer, setKeyTimer] = useState(0);
    const [level, setLevel] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isNextGame, setIsNextGame] = useState(false);

    let time = 0;

    const {isMenuVisible} = useOutletContext<OutletContext>();

    const openAnswerModal = () => setVisible(true);

    const closeAnswerModal = () => setVisible(false);

    useEffect(() => {
        setUpGame();
    },[]);

    const setUpGame = () => {
        getTomato().then(() => {
            getGameData().then(() => {
                setLoading(false);
                openAnswerModal();
            })
        });
    };

    useEffect(() => {
        if (!isFirstTime && isMenuVisible) {
            setIsPlaying(false);
        } else if (!isFirstTime && !isMenuVisible) {
            setIsPlaying(true);
        }
    },[isMenuVisible]);

    const getTomato = () => {
        return tomatoService.getTomato().then((res) => {
            if (200 === res.status) {
                setTomato(res.data);
            } else {
                message.error("Internal Server Error").then();
            }
        }).catch(() =>
            message.error("Internal Server Error").then()
        );
    }

    const getGameData = () => {
        return gameService.getGameData(authDto.username).then(res => {
            if (200 === res.status) {
                setLevel(res.data.level);
                setScore(res.data.score);
            } else {
                message.error("Internal Server Error").then()
            }
        }).catch(() =>
            message.error("Internal Server Error").then()
        );
    }

    const onClickNumber = (answer: number) => {
        setIsPlaying(false);
        const isCorrect = tomato?.solution === answer;
        setIsCorrect(isCorrect);
        setSelectedAnswer(answer);
        if (isCorrect) {
            let gameDto = {} as GameDto;
            gameDto.username = authDto.username;
            gameDto.score = score + getScore();
            gameDto.level = getLevel(gameDto.score) ? level + 1 : level;
            gameDto.score = getLevel(gameDto.score) ? gameDto.score - 10000 : gameDto.score;
            gameDto.time = 60 - time;

            gameService.saveGameData(gameDto).then((res) => {
                if (200 === res.status) {
                    openAnswerModal();
                } else {
                    message.error("Internal Server Error").then()
                }
            }).catch(() =>
                message.error("Internal Server Error").then()
            )
        } else {
            openAnswerModal();
        }
    }

    const restartProgress = () => {
        setLoading(true);
        gameService.restartProgress(authDto.username).then((res) => {
            if (200 === res.status) {
                setIsFirstTime(true);
                setIsGameOver(false);
                closeAnswerModal();
                setUpGame();
            } else {
                message.error("Internal Server Error").then()
            }
        }).catch(() =>
            message.error("Internal Server Error").then()
        )
    }

    const startNextGame = () => {
        if (!isFirstTime) {
            setIsCorrect(false);
            setSelectedAnswer(undefined);
        } else {
            setIsFirstTime(false);
        }
        setIsNextGame(false);
        setKeyTimer(prevKey => prevKey + 1);
        closeAnswerModal();
        setIsPlaying(true);
    }

    const setUpNextGame = () => {
        closeAnswerModal();
        setLoading(true);
        setIsNextGame(true);
        setUpGame();
    }

    const onTimerComplete = () => {
        setIsGameOver(true);
        openAnswerModal();
    }

    const getScore = () => {
        if (time >= 45) {
            return 4000;
        } else if (time >= 30) {
            return 3000;
        } else if (time >= 15) {
            return 2000;
        } else {
            return 1000;
        }
    }

    const getLevel = (score: number) => {
        return score >= 10000;
    }

    return (
        <>
            <Spin spinning={loading} tip="Loading">
                <div className="layout-content" style={{paddingTop: "4vh"}}>
                <Row className="play-outer-row" justify="space-between">
                    <Col span={5} className="level-score-col">
                        <Row>
                            <div className="img-level-outer">
                                <div className="img-level-inner">
                                    <Title level={1} className="level-text">{level}</Title>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="img-score-outer">
                                <div className="img-score-inner">
                                    <Title level={1} className="score-text">{score}</Title>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <div className="img-row">
                                <div className="img-div">
                                    <div className="img-question-div"
                                         style={{backgroundImage: `url(${tomato?.question})`}}></div>
                                </div>
                            </div>
                        </Row>
                        <Col>
                            <Row justify="center">
                                <AnswerBtn value={0} onclick={onClickNumber}/>
                                <AnswerBtn value={1} onclick={onClickNumber}/>
                                <AnswerBtn value={2} onclick={onClickNumber}/>
                                <AnswerBtn value={3} onclick={onClickNumber}/>
                                <AnswerBtn value={4} onclick={onClickNumber}/>
                            </Row>
                            <Row justify="center">
                                <AnswerBtn value={5} onclick={onClickNumber}/>
                                <AnswerBtn value={6} onclick={onClickNumber}/>
                                <AnswerBtn value={7} onclick={onClickNumber}/>
                                <AnswerBtn value={8} onclick={onClickNumber}/>
                                <AnswerBtn value={9} onclick={onClickNumber}/>
                            </Row>
                        </Col>
                    </Col>
                    <Col span={5} className="timer-col">
                        <Row>
                            <div className="img-timer-outer">
                                <div className="img-timer-inner">
                                    <div>
                                        <CountdownCircleTimer
                                            key={keyTimer}
                                            isPlaying={isPlaying}
                                            duration={60}
                                            colors={['#95D543', '#F7B801', '#A30000', '#A30000']}
                                            colorsTime={[60, 30, 15, 0]}
                                            trailColor="#96440C"
                                            onComplete={onTimerComplete}
                                        >
                                            {({remainingTime}) => {
                                                time = remainingTime;
                                                return RenderTime(remainingTime);
                                            }}
                                        </CountdownCircleTimer>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div>
            </Spin>
            <AnswerModal
                visible={visible}
                closeModal={closeAnswerModal}
                isCorrect={isCorrect}
                correctAnswer={tomato?.solution}
                selectedAnswer={selectedAnswer}
                startNextGame={startNextGame}
                isFirstTime={isFirstTime}
                isGameOver={isGameOver}
                setUpNextGame={setUpNextGame}
                isNextGame={isNextGame}
                restartProgress={restartProgress}
            />
        </>
    );
}

export default Play;
