import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { positive } from "../util";
import Atom from "./atom";
import Particle from "./particle";

const DIST_THRESHOLD = 2;
const MAX_LIFETIME = 20000; // 20 Seconds

const ATOMS = [] as { x: number, y: number }[];

for (let i = 2; i < 9; i++) {
    if (i % 2 == 0) {
        ATOMS.push({ x: 50, y: i * 10 });
    } else {
        ATOMS.push({ x: 40, y: i * 10 });
        ATOMS.push({ x: 60, y: i * 10 });
    }
}
const config = {
    spawnChance: 0.05,
    maxParticles: 100,
    autoSpawn: true,
    paused: true,
    mode: 'rutherford' as 'pudding'|'rutherford',
};

let frame = 0;

type ParticlePos = { x: number, y: number, vx: number, vy: number, activated: boolean, lifetime: number }

const Simulation: FunctionComponent = () => {
    const [particles, setParticles] = useState([] as ParticlePos[]);
    const [fpsDisplay, setFpsDisplay] = useState('NaN');

    const animate = useCallback((d: number, f: number) => {
        if (config.paused) return setParticles([...particles]); // Calling setParticles so the component gets rerendered
        const delta = (window.performance.now() - d);

        if (f % 6 == 0) setFpsDisplay(`${Math.round(delta)}ms, ${Math.round(1000/delta)} FPS, ${particles.length} particles`);

        // Spawning
        if (Math.random() > (1 - config.spawnChance) && particles.length < config.maxParticles && config.autoSpawn) particles.push({
            x: 0,
            y: (Math.random() * 75) + 12.5,
            vx: (Math.random() * 2.75) + 0.25,
            vy: Math.random() > 0.5 ? (Math.random() * 2) - 1 : 0,
            activated: false,
            lifetime: 0,
        });

        setParticles(
            particles
                .map(h => {
                    // Increase lifetime
                    h.lifetime += delta;

                    // Moving particles
                    h.x += h.vx * 0.01 * delta;
                    h.y += h.vy * 0.01 * delta;

                    // Interacting with atoms
                    if (config.mode == 'rutherford') {
                        const distances = ATOMS.map(
                            atom => ({
                                dist: Math.sqrt(Math.pow(atom.x - h.x, 2) + Math.pow(atom.y - h.y, 2)),
                                atom: atom,
                            })
                        );

                        // Not proud of this one
                        // Idk how it works exactly
                        // It just does
                        // "activate" makes the particle change color
                        let activate = false;
                        for (const d of distances) {
                            if (d.dist < DIST_THRESHOLD) {
                                activate = true;

                                const dist_x = -(h.x - d.atom.x);
                                const dist_y = -(h.y - d.atom.y);
                                let strength_x = DIST_THRESHOLD - positive(dist_x);
                                let strength_y = DIST_THRESHOLD - positive(dist_y);

                                const energy_total = strength_x + strength_y;
                                const energy_affected = energy_total / DIST_THRESHOLD;
                                const amt_x = strength_x / (strength_x + strength_y);
                                const amt_y = strength_y / (strength_x + strength_y);

                                h.vx -= amt_x * energy_affected * 0.2 * (dist_x < 0 ? -1 : 1);
                                h.vy -= amt_y * energy_affected * 0.2 * (dist_y < 0 ? -1 : 1);
                            };
                        }

                        h.activated = activate;
                    }

                    return h;
            })
            .filter(
                particle => particle.x > 0 && particle.x < 99
                       && particle.y > 0 && particle.y < 99
                       && particle.lifetime < MAX_LIFETIME
            )
        );
    }, [ particles ]);

    const now = window.performance.now();
    useEffect(() => {
        requestAnimationFrame(() => animate(now, frame + 1));
        frame++;
    }, [ particles ])

    return (
        <div style={{
            width: '100%',
            height: '75%',
        }}>
            <span style={{ position: 'fixed', left: '5px', top: '5px' }}>
                {fpsDisplay}
            </span>
            {ATOMS.map((atom, i) => <Atom x={atom.x} y={atom.y} key={i} />)}
            {particles.map((particle, i) => <Particle x={particle.x} y={particle.y} activated={particle.activated} key={i} />)}
        </div>
    );
}

export default Simulation;
export { config }
