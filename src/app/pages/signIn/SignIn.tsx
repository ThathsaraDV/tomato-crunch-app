import './style.css';
import {Link, useNavigate} from "react-router-dom";
import {
    Layout,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    message,
} from "antd";
import signInImg from '../../../assets/images/sign-in-img.jpg';
import {Login} from "../../service/auth/AuthService";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const { Title } = Typography;
const { Content } = Layout;


export const SignIn = () => {
    let navigate = useNavigate();
    const {setAuthDto} = useContext(AuthContext);

    let onFinish = (values: any) => {
        Login(values.username, values.password).then((res) => {
            if (res.status === 200) {
                if (res.data.access_token) {
                    setAuthDto({
                        access_token: res.data.access_token,
                        refresh_token: res.data.refresh_token,
                        username: values.username
                    });
                    navigate('main/');
                }
            } else {
                message.error("Internal Server Error").then();
            }
        }).catch((err) => {
            if (undefined !== err.response && 400 === err.response.status) {
                message.error("Wrong username or password").then();
            } else {
                message.error("Internal Server Error").then();
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo.message).then();
    };

    let onClickSignUp = () => {
        navigate('/sign-up');
    };

    return (
        <>
            <Layout className="layout-default layout-signIn">
                <Content className="signIn">
                    <Row className="signIn-row">
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            lg={{ span: 6, offset: 2 }}
                            md={{ span: 12 }}
                            className="signIn-form-col"
                        >
                            <Row><Title className="mb-15">Sign In</Title></Row>
                            <Row><Title className="font-regular text-muted" level={5}>
                                Enter your username and password to sign in
                            </Title></Row>
                            <Row style={{width: '80%'}}><Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                className="signIn-form"
                            >
                                <Form.Item
                                    className="username"
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="username" />
                                </Form.Item>

                                <Form.Item
                                    className="username"
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="signIn-btn"
                                        style={{ width: "100%" , marginTop: '16px'}}
                                    >
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                                <p className="signUp-question">
                                    Don't have an account?{" "}
                                    <Link to="/sign-up" className="signUp-link" onClick={onClickSignUp}>
                                        Sign Up
                                    </Link>
                                </p>
                            </Form></Row>
                        </Col>
                        <Col
                            className="sign-img"
                            xs={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            <img src={signInImg} alt="" style={{width: '100%'}} />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}