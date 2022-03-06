import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { positive } from "../util";
import Atom from "./atom";
import Particle from "./particle";

const DIST_THRESHOLD = 2;
const MAX_LIFETIME = 20000; // 20 Seconds
const MAX_TRAIL_LENGTH = 500;
const TRAIL_LIFETIME = 5000;
const CANVAS_SCALE = 10;
const TRAIL_COLOR = { r: 150, g: 150, b: 150 };

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
    spread: 0,
    autoSpawn: true,
    paused: true,
    trails: false,
    mode: 'rutherford' as 'pudding'|'rutherford',
};

const oldTrails: { lifetime: number, trail: { x: number, y: number }[] }[] = [];
let frame = 0;

type ParticlePos = { x: number, y: number, vx: number, vy: number, activated: boolean, lifetime: number, trail: { x: number, y: number }[] }

const Simulation: FunctionComponent = () => {
    const [particles, setParticles] = useState([] as ParticlePos[]);
    const [fpsDisplay, setFpsDisplay] = useState('NaN');

    const animate = useCallback((d: number, f: number) => {
        if (config.paused) return setParticles([...particles]); // Calling setParticles so the component gets rerendered
        const delta = (window.performance.now() - d);

        if (f % 6 == 0) setFpsDisplay(`${Math.round(delta)}ms, ${Math.round(1000/delta)} FPS, ${particles.length} particles`);

        // Spawning
        let spawnChance = config.spawnChance;
        while ((Math.random() > (1 - spawnChance) || spawnChance > 1) && particles.length < config.maxParticles && config.autoSpawn) {
            particles.push({
                x: 0,
                y: (Math.random() * 75) + 12.5,
                vx: (Math.random() * 2.75) + 0.25,
                vy: (Math.random() * config.spread * 2) - config.spread,
                activated: false,
                lifetime: 0,
                trail: [],
            });
            if (spawnChance > 1) spawnChance--;
        }

        setParticles(
            particles
                .map(h => {
                    // Increase lifetime
                    h.lifetime += delta;

                    // Moving particles
                    h.x += h.vx * 0.01 * delta;
                    h.y += h.vy * 0.01 * delta;

                    // Add trail
                    if (config.trails) {
                        h.trail.push({ x: h.x, y: h.y });
                        if (h.trail.length > MAX_TRAIL_LENGTH) h.trail.shift();
                    } else if (h.trail.length > 0) h.trail.length = 0;

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
                particle => {
                    if (particle.x > -1 && particle.x < 101
                       && particle.y > -1 && particle.y < 101
                       && particle.lifetime < MAX_LIFETIME) return true;
                    else {
                        oldTrails.push({ trail: particle.trail, lifetime: TRAIL_LIFETIME });
                        return false;
                    }
                }
            )
        );

        if (config.trails) {
            const toRemove: number[] = [];
            for (const i in oldTrails) {
                const trail = oldTrails[i];
                trail.lifetime -= delta;
                if (trail.lifetime < 0) toRemove.unshift(parseInt(i));
            }
            toRemove.forEach(i => oldTrails.splice(i, 1));
        } else if (oldTrails.length > 0) oldTrails.length = 0;
    }, [ particles ]);

    const now = window.performance.now();
    useEffect(() => {
        requestAnimationFrame(() => animate(now, frame + 1));
        frame++;
    }, [ particles ])

    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }}>
            <span style={{ position: 'fixed', left: '5px', top: '5px' }}>
                {fpsDisplay}
            </span>
            {config.trails ? <TrailCanvas trails={[
                ...particles.map(p => ({ points: p.trail, color: TRAIL_COLOR })),
                ...oldTrails.map(t => ({ points: t.trail, color: TRAIL_COLOR, lifetime: t.lifetime }))
            ]} /> : <></>}
            {ATOMS.map((atom, i) => <Atom x={atom.x} y={atom.y} key={i} />)}
            {particles.map((particle, i) => <Particle x={particle.x} y={particle.y} activated={particle.activated} key={i} />)}
        </div>
    );
}

type TrailCanvasTrails = {
    trails: {
        points: {
            x: number,
            y: number
        }[],
        color: {
            r: number,
            g: number,
            b: number,
        },
        lifetime?: number,
    }[]
}
const TrailCanvas: FunctionComponent<TrailCanvasTrails> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return console.warn('Canvas was null');
        const ctx = canvas.getContext('2d');
        if (!ctx) return console.warn('Context was null');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const trail of props.trails) {
            if (trail.points.length == 0) continue;

            const lifetime = trail.lifetime ?? TRAIL_LIFETIME;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${trail.color.r}, ${trail.color.b}, ${trail.color.g}, ${(1 / TRAIL_LIFETIME) * lifetime})`;

            ctx.moveTo(trail.points[0].x * CANVAS_SCALE, trail.points[0].y * CANVAS_SCALE);
            for (const point of trail.points.slice(1)) {
                ctx.lineTo(point.x * CANVAS_SCALE, point.y * CANVAS_SCALE);
            }
            ctx.stroke();
            ctx.closePath();
        }
    }, [props]);

    return (
        <div
            style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                width: "auto",
                height: "auto",
                overflow: "hidden",
            }}
        >
            <canvas
                ref={ref}
                width={100 * CANVAS_SCALE}
                height={100 * CANVAS_SCALE}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>)
    ;
}

export default Simulation;
export { config }
