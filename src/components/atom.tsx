import { FunctionComponent } from "react";

const Atom: FunctionComponent<{x: number, y: number}> = (props) => {
    return (
        <div
            className="atom-core"
            style={{
                top: `${props.y}%`,
                left: `${props.x}%`,
            }}
        >
            <div className="atom-shell"/>
        </div>
    );
}

export default Atom;
