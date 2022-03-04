import { FunctionComponent } from "react";

const Particle: FunctionComponent<{x: number, y: number, activated: boolean}> = (props) => {
    return (
        <div
            className={`particle ${props.activated ? 'particle-activated' : ''}`}
            style={{
                left: `${props.x}%`,
                top: `${props.y}%`,
            }}
        />
    );
}

export default Particle;
