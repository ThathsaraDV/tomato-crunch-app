import React, {useContext} from "react";
import {
    Layout,
    Button,
    Typography,
    Card,
    Form,
    Input, FormInstance, message,
} from "antd";
import {useNavigate, Link} from "react-router-dom";
import './style.css'
import {Register} from "../../service/auth/AuthService";
import {AuthContext} from "../../context/AuthContext";
const { Title } = Typography;
const { Content } = Layout;

export const SignUp = () => {
    const formRef: any = React.createRef<FormInstance>();
    let navigate = useNavigate();
    const {setAuthDto} = useContext(AuthContext);

    let onFinish = () => {
        formRef.current.validateFields().then((values: any) => {
            Register(values.username, values.password).then((res) => {
                if (res.status === 200) {
                    setAuthDto(res.data);
                    navigate('/');
                } else {
                    message.error("Internal Server Error").then();
                }
            });
        })
    };

    return (
        <>
            <div className="layout-default ant-layout layout-sign-up">
                <Content className="p-0">
                    <div className="sign-up-header">
                        <div className="content">
                            <Title>Sign Up</Title>
                            <p className="text-lg">
                                Welcome to our Tomato API-based web game! 🍅
                            </p>
                        </div>
                    </div>
                    <Card
                        className="card-signup header-solid h-full ant-card pt-0"
                        title={<h5>Sign Up to continue</h5>}
                        bordered={false}
                    >
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                className="sign-up-form"
                                layout="vertical"
                                ref={formRef}
                            >
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[
                                        {
                                            message: "*Minimum 4 characters",
                                            validator: (_: any, value: string) => {
                                                if (value.length >= 4) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject();
                                            }
                                        }
                                    ]}
                                >
                                    <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        { required: true, message: "Please input your password!" },
                                    ]}
                                >
                                    <Input placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    rules={[
                                        { required: true, message: "Please input your password!" },
                                    ]}
                                >
                                    <Input placeholder="Password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        style={{ width: "100%", marginTop: '10px'}}
                                        type="primary"
                                        htmlType="submit"
                                        className="signUp-btn"
                                    >
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                            </Form>
                        <p className="signIn-question">
                            Already have an account?{" "}
                            <Link to="/" className="signIn-link">
                                Sign In
                            </Link>
                        </p>
                    </Card>
                </Content>
            </div>
        </>
    );
}
