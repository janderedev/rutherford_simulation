import { FunctionComponent } from "react";

const Footer: FunctionComponent = (props) => {
    return (
        <div className="footer" children={props.children} />
    );
}

export default Footer;