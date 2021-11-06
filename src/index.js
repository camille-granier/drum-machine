import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'

const firstSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

const secondSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

const soundsName = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit'
}

const soundsGroup = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
}

const KeyboardKey = ({play, sound: {key, url, id, keyCode}}) => {

  const handlekeydown = (e) => {
    if (e.keyCode === keyCode) {
      play(key, id)
    }
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handlekeydown);
  }, [])
  return (<button
               className='drum-pad'
                id={id}
               onClick={() => play(key, id)}>
          <audio src={url}
            className="clip"
            id={key} /><h4>
        {key}</h4>
        </button>
  )
}

const Keyboard = ({power, play, group}) => {
  return (
    <div className="keyboard">
      { power? group.map((sound) => <KeyboardKey play ={play} sound={sound}/>)
      : group.map((sound) => <KeyboardKey play ={play} sound={{...sound, url:"#"}} />)
      }
    </div>
    )}

const Control = ({stop, power, name, changeSoundsGroup, volume, handleVolumeChange}) => {
 return (
      <div classNamz="control">
        <button onClick={stop}>Turn the Power {power? "OFF" : "ON"}</button>
        <h2>Volume: %{Math.round(volume*100)}</h2>
        <input
          className="volume"
          min="0"
          max="1"
          step="0.01"
          type="range"
          value={volume}
          onChange={handleVolumeChange}/>
        <h2 id="display">{name}</h2>
        <button onClick={changeSoundsGroup}>Change Sounds Group</button>
      </div>
    )
  }

const DrumMachine = () => {
  const [power, setPower] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [soundName, setSoundName] = React.useState("");
  const [soundType, setSoundType] = React.useState("heaterKit");
  const [group, setGroup] = React.useState(soundsGroup[soundType])

  const stop = () => {
    setPower(!power)
  }

  const handleVolumeChange = (e) => {
    setVolume(e.target.value)
  }


  const play = (key, sound) => {
    setSoundName(sound)
    const audio = document.getElementById(key)
    audio.currentTime = 0;
    audio.play()

  }

  const changeSoundsGroup = () => {
    if (soundType === "heaterKit") {
      setSoundType("smoothPianoKit")
      setGroup(soundsGroup.smoothPianoKit)
      setSoundName(soundsName.smoothPianoKit)
    } else {
      setSoundType("heaterKit")
      setGroup(soundsGroup.heaterKit)
      setSoundName(soundsName.heaterKit)
    }
  }

  const setKeyVolume = () => {
    const audios = group.map(sound => document.getElementById(sound.key))
      audios.forEach(audio => {
          if(audio) {
        audio.volume = volume
      }})
  }

  return (
    <div id="drum-machine">
      {setKeyVolume()}
      <Keyboard power={power} play={play} group={group}/>
      <Control changeSoundsGroup={changeSoundsGroup}
               name={soundName || soundsName[soundType]}
               volume={volume}
               handleVolumeChange={handleVolumeChange}
               power={power}
               stop={stop}/>
    </div>

  )
};


ReactDOM.render(<BrowserRouter>
     <DrumMachine />
   </BrowserRouter>, document.getElementById('root'))
