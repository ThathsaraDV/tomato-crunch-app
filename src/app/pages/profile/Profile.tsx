import './style.css';
import {
    Avatar,
    Col,
    message,
    Row, Spin, Typography,
} from "antd";
import { UserOutlined } from '@ant-design/icons';
import {useContext, useEffect, useState} from "react";
import profileService from "../../service/ProfileService";
import {AuthContext} from "../../context/AuthContext";
import GameDto from "../../dto/GameDto";

const { Title } = Typography;

function Profile() {
    const {authDto} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [gameDto, setGameDto] = useState<GameDto>({
        username: '',
        score: 0,
        time: 0,
        id: 0,
        bestTime: 0,
        key: 0,
        highestScore: 0,
        level: 0,
        lowestScore: 0,
        totalScore: 0,
        worstTime: 0
    });

    useEffect(() => {
        fetchProfileData();
    },[]);

    const fetchProfileData = () => {
        profileService.getProfileData(authDto.username).then(res => {
            if (200 === res.status) {
                setGameDto(res.data);
                setLoading(false);
            } else {
                message.error("Internal Server Error").then()
            }
        }).catch(() =>
            message.error("Internal Server Error").then()
        );
    }

    return (
        <Spin spinning={loading} tip="Loading">
            <div className="layout-content-profile">
                <div className={"profile-inner-div"}>
                    <Row gutter={[24, 0]} justify="space-around">
                        <Col span={8}>
                            <Row className="row-username">
                                <Col span={8}>
                                    <Avatar size={64}
                                            style={{ background: "bisque" }}
                                            icon={<UserOutlined style={{ color: "brown" }}/>} />
                                </Col>
                                <Col span={16}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{authDto.username}</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Row className="row-username">
                                <Col span={24} style={{textAlign: "center"}}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Level {gameDto.level}</Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]} justify="space-around" className="row-stats">
                        <Col span={12}>
                            <Row>
                                <Col span={12} className="stat-title">
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Best Time :</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{gameDto.bestTime}</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12} className="stat-title">
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Worst Time :</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{gameDto.worstTime}</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12} className="stat-title">
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Highest Score :</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{gameDto.highestScore}</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12} className="stat-title">
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Lowest Score :</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{gameDto.lowestScore}</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>Total Score :</Title>
                                </Col>
                                <Col span={12}>
                                    <Title level={2} style={{marginTop: "15px", color: "brown"}}>{gameDto.totalScore}</Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </Spin>
    );
}

export default Profile;
