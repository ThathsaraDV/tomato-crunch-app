import {Col, Row} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import './style.css';

interface SideNavI {
    closeMenu: () => void
}

function Sidenav(props: SideNavI) {
    let navigate = useNavigate();
    const {pathname} = useLocation();
    let page = pathname.replace('/main', "");

    const navigateTo = (path: string) => {
        navigate(path);
        props.closeMenu();
    }

    return (
        <Row>
            <Col span={24}>
                <Row className="menu-title-row">
                    <span className="menu-title">Menu</span>
                </Row>
                <hr/>
                <Col>
                    {("/" === page || 0 === page.length) && <Row justify="center" className="menu-btn-row">
                        <div className="menu-btn-img-div" onClick={props.closeMenu}>
                            <p className="menu-btn-text">Continue</p>
                        </div>
                    </Row>}
                    {("/" !== page && "" !== page) && <Row justify="center" className="menu-btn-row">
                        <div className="menu-btn-img-div" onClick={() => navigateTo('')}>
                            <p className="menu-btn-text">Play</p>
                        </div>
                    </Row>}
                    {"/leaderboard" !== page && <Row justify="center" className="menu-btn-row">
                        <div className="menu-btn-img-div" onClick={() => navigateTo('leaderboard')}>
                            <p className="menu-btn-text">Leaderboard</p>
                        </div>
                    </Row>}
                    {"/profile" !== page && <Row justify="center" className="menu-btn-row">
                        <div className="menu-btn-img-div" onClick={() => navigateTo('profile')}>
                            <p className="menu-btn-text">Profile</p>
                        </div>
                    </Row>}
                    <Row justify="center" className="menu-btn-row">
                        <div className="menu-btn-img-div" onClick={() => navigate('/')}>
                            <p className="menu-btn-text">Exit</p>
                        </div>
                    </Row>
                </Col>
            </Col>
        </Row>
    );
}

export default Sidenav;
