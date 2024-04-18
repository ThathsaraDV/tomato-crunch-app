import './style.css';
import {
    Row,
    Col,
    Button,
} from "antd";
import {menu} from "../../../assets/SvgIcons";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

interface HeaderProps {
    onPress: any,
}

function Header(props: HeaderProps) {
    const {authDto} = useContext(AuthContext);

    return (
            <Row className="row-header">
                <Col span={6} style={{
                    textTransform: "capitalize",
                    textAlign: "center",
                    display: "flex"
                }}>
                    <div className="ant-page-header-heading" style={{margin: "auto"}}>
                        <span
                            className="ant-page-header-heading-title"
                            style={{textTransform: "capitalize", fontSize: "1.8rem", color: "#95D543", fontFamily: "DriftWood"}}
                        >
                          {authDto.username}
                        </span>
                    </div>
                </Col>
                <Col span={6} className="header-control">
                    <Button
                        type="link"
                        className="sidebar-toggler"
                        onClick={() => props.onPress()}
                    >
                        {menu}
                    </Button>
                </Col>
            </Row>
    );
}

export default Header;