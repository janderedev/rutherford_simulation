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
                    defaultValue="rutherford"
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
                    defaultChecked={true}
                />
            </div>

            <div style={innerStyle}>
                <span>Paused</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => { config.paused = e.currentTarget.checked }}
                    defaultChecked={true}
                />
            </div>
                
            <div style={innerStyle}>
                <span>Enable Spawning</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="checkbox"
                    onChange={e => { config.autoSpawn = e.currentTarget.checked }}
                    defaultChecked={true}
                />
            </div>

            <div style={innerStyle}>
                <span>Spawn Chance (0-1)</span>
                <input
                    style={{ width: '64px', marginLeft: '8px' }}
                    type="number"
                    onChange={e => { config.spawnChance = parseFloat(e.currentTarget.value) }}
                    defaultValue={0.05}
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
                    defaultValue={100}
                    step={10}
                    min={0}
                    max={1000}
                />
            </div>
            
        </div>
    );
}

export default Controls;
