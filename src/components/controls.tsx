import { CSSProperties, FunctionComponent } from "react";
import { config } from "./simulation";

const innerStyle: CSSProperties = { textAlign: 'right' };

const Controls: FunctionComponent = () => {
    return (
        <div style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            zIndex: 100,
        }}>
                
            <div style={innerStyle}>
                <span>Simulation Type</span>
                <select
                    style={{ width: '128px', marginLeft: '8px' }}
                    onChange={e => { config.mode = e.currentTarget.value as any }}
                    defaultValue={config.mode}
                >
                    <option value={"pudding"}>Plum Pudding</option>
                    <option value={"rutherford"}>Rutherford</option>
                </select>
            </div>

            <div style={innerStyle}>
                <span>Dark Theme</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => {
                        if (e.currentTarget.checked) {
                            document.body.className = 'dark';
                        } else {
                            document.body.className = 'light';
                        }
                    }}
                    defaultChecked={document.body.className == 'dark'}
                />
            </div>

            <div style={innerStyle}>
                <span>Paused</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => { config.paused = e.currentTarget.checked }}
                    defaultChecked={config.paused}
                />
            </div>
                
            <div style={innerStyle}>
                <span>Enable Spawning</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => { config.autoSpawn = e.currentTarget.checked }}
                    defaultChecked={config.autoSpawn}
                />
            </div>
                
            <div style={innerStyle}>
                <span>Show Trails</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => { config.trails = e.currentTarget.checked }}
                    defaultChecked={config.trails}
                />
            </div>

            <div style={innerStyle}>
                <span>Spawn Chance (0-1)</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="number"
                    onChange={e => { config.spawnChance = parseFloat(e.currentTarget.value) }}
                    defaultValue={config.spawnChance}
                    step={0.05}
                    min={0}
                    max={1}
                />
            </div>

            <div style={innerStyle}>
                <span>Max Particles</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="number"
                    onChange={e => { config.maxParticles = parseFloat(e.currentTarget.value) }}
                    defaultValue={config.maxParticles}
                    step={10}
                    min={0}
                    max={1000}
                />
            </div>

            <div style={innerStyle}>
                <span>Spread</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="number"
                    onChange={e => { config.spread = parseFloat(e.currentTarget.value) }}
                    defaultValue={config.spread}
                    step={0.25}
                    min={0}
                    max={5}
                />
            </div>
            
        </div>
    );
}

export default Controls;
