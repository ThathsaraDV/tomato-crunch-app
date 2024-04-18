import {Col, Drawer, Layout, Row} from "antd";
import {useNavigate} from "react-router-dom";
import './style.css';

const {Sider} = Layout;

interface AnswerModalI {
    visible: boolean
    closeModal: () => void
    isCorrect: boolean
    correctAnswer: number | undefined
    selectedAnswer: number | undefined
    startNextGame: () => void
    isFirstTime: boolean
    isGameOver: boolean
    isNextGame: boolean
    setUpNextGame: () => void
    restartProgress: () => void
}

function AnswerModal(props: AnswerModalI) {
    let navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
        props.closeModal();
    }

    const getTitleColor = () => {
        if (props.isFirstTime || props.isNextGame) {
            return "#E6E5D1";
        } else if (!props.isCorrect || props.isGameOver) {
            return "#EB5E28";
        } else {
            return "#95D543";
        }
    }

    const getTitleFontSize = () => {
        if (props.isFirstTime || props.isGameOver) {
            return "2rem";
        } else {
            return "3rem";
        }
    }

    const getTitleText = () => {
        if (props.isFirstTime) {
            return "Welcome Back!";
        } else if (props.isGameOver) {
            return "Game Over!";
        } else if (!props.isCorrect && !props.isNextGame) {
            return "Wrong";
        } else if (props.isNextGame){
            return "Continue";
        } else {
            return "Correct";
        }
    }

    const getStartBtnText = () => {
        if (props.isFirstTime || props.isNextGame) {
            return "Start";
        } else if (props.isGameOver) {
            return "Restart";
        }
    }

    return (
        <Drawer
            title={false}
            placement={"left"}
            closable={false}
            open={props.visible}
            key={"left"}
            className="drawer-sidebar-answer"
            maskClosable={false}
        >
            <Layout>
                <Sider
                    trigger={null}
                    className="modal ant-layout-sider"
                    style={{ background: "transparent" }}
                >
                    <Row>
                        <Col span={24}>
                            <Row className="answer-title-row">
                                    <span className="answer-title" style={{
                                        color: getTitleColor(),
                                        fontSize: getTitleFontSize(),
                                    }}>{getTitleText()}</span>
                            </Row>
                            <Col>
                                {!props.isFirstTime && !props.isGameOver && !props.isCorrect && !props.isNextGame && <Row justify="center" className="answer-row">
                                    <Col span={12} className="wrong-answer-text">Your Answer</Col>
                                    <Col span={4} className="wrong-answer-text"> : </Col>
                                    <Col span={8} className="wrong-answer-text">{props.selectedAnswer}</Col>
                                </Row>}
                                {!props.isFirstTime && !props.isCorrect && !props.isNextGame && <Row justify="center" className="answer-row">
                                    <Col span={12} className="wrong-answer-text">Correct Answer</Col>
                                    <Col span={4} className="wrong-answer-text"> : </Col>
                                    <Col span={8} className="wrong-answer-text">{props.correctAnswer}</Col>
                                </Row>}
                                {!props.isFirstTime && !props.isGameOver && !props.isNextGame && <Row justify="center" className="answer-btn-row">
                                    <div className="answer-btn-img-div" onClick={props.setUpNextGame}>
                                        <p className="answer-btn-text">Next</p>
                                    </div>
                                </Row>}
                                {(props.isFirstTime || props.isNextGame) && <Row justify="center" className="answer-btn-row">
                                    <div className="answer-btn-img-div" onClick={props.startNextGame}>
                                        <p className="answer-btn-text">{getStartBtnText()}</p>
                                    </div>
                                </Row>}
                                {props.isFirstTime && <Row justify="center" className="menu-btn-row">
                                    <div className="menu-btn-img-div" onClick={() => navigateTo('leaderboard')}>
                                        <p className="menu-btn-text">Leaderboard</p>
                                    </div>
                                </Row>}
                                {props.isFirstTime && <Row justify="center" className="menu-btn-row">
                                    <div className="menu-btn-img-div" onClick={() => navigateTo('profile')}>
                                        <p className="menu-btn-text">Profile</p>
                                    </div>
                                </Row>}
                                {props.isGameOver && <Row justify="center" className="answer-btn-row">
                                    <div className="answer-btn-img-div" onClick={props.restartProgress}>
                                        <p className="answer-btn-text">Restart</p>
                                    </div>
                                </Row>}
                                <Row justify="center" className="answer-btn-row">
                                    <div className="answer-btn-img-div" onClick={() => navigate('/')}>
                                        <p className="answer-btn-text">Exit</p>
                                    </div>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </Sider>
            </Layout>
        </Drawer>
    );
}

export default AnswerModal;