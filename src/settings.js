import ReactSlider from "react-slider";
import './slider.css'
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";
function Settings()
{
    const settingsInfo=useContext(SettingsContext);
    return(
        <div style={{textAlign:'left'}}>
        <label>Work minutes: {settingsInfo.workMinutes}:00</label>
        <ReactSlider 
        className="slider" thumbClassName="thumb" trackClassName="track" onChange={newValue=>settingsInfo.setWorkMinutes(newValue)} value={settingsInfo.workMinutes} min={1} max={120}/>

        
        <label>Break minutes: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider 
  className="slider2" thumbClassName="thumb2" trackClassName="track2" 
  onChange={newValue => settingsInfo.setBreakMinutes(newValue)} 
  value={settingsInfo.breakMinutes} min={1} max={30}
/>
        <div style={{textAlign:'center',marginTop:'20px'}}>
            <br />
            <br />
            <BackButton onClick={()=>settingsInfo.setShowSettings(false)}/>
        </div>
        </div>
        
    );

}
export default Settings;