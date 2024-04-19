import {Col} from "antd";
import './style.css';
import Title from "antd/lib/typography/Title";

interface AnswerBtnI {
    value: number
    onclick: (value: number) => void
}

function AnswerBtn(props: AnswerBtnI) {

    return (
        <Col>
            <div className="btn-img-div" onClick={() => props.onclick(props.value)}>
                <Title level={1} className="btn-text">{props.value}</Title>
            </div>
        </Col>
    );
}

export default AnswerBtn;