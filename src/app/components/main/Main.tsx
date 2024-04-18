import React, { useState } from "react";
import {Outlet} from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import './style.css';
import Header from "../header/Header";
import Sidenav from "../sidenav/SideNav";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {
    const [isMenuVisible, setVisible] = useState(false);

    const openDrawer = () => setVisible(!isMenuVisible);

    const closeMenu = () => {
        setVisible(false);
    }

    return (
        <Layout
            className={"layout-dashboard"}
        >
            <Drawer
                title={false}
                placement={"left"}
                closable={false}
                onClose={closeMenu}
                open={isMenuVisible}
                key={"left"}
                className="drawer-sidebar"
                maskClosable={false}
            >
                <div className="menu-close-btn-img-div" onClick={closeMenu}/>
                <Layout>
                    <Sider
                        trigger={null}
                        className="sider ant-layout-sider"
                        style={{ background: "transparent" }}
                    >
                        <Sidenav closeMenu={closeMenu}/>
                    </Sider>
                </Layout>
            </Drawer>
            <Layout>
                <Affix style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <AntHeader style={{
                        width: "72vw",
                        height: "14vh",
                        display: "flex",
                        alignItems: "center",
                        background: "transparent"
                    }}>
                        <Header
                            onPress={openDrawer}
                        />
                    </AntHeader>
                </Affix>
                <Content className="content-ant">
                    <Outlet context={{closeMenu, isMenuVisible}}/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Main;