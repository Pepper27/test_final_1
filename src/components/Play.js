import React, { useState, useRef } from "react";
// import YouTube from 'react-youtube';
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import Bottom from "../image/bottom.png";
import { onValue, ref } from "firebase/database";
import { db } from "../db";

const MusicPlay = () => {
  const audioRef = useRef(null);
  const progressInterval = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);

const togglePlay = () => {
  if (isPlaying) {
    audioRef.current.pause();
    clearInterval(progressInterval.current);
  } else {
    audioRef.current.play();
    progressInterval.current = setInterval(() => {
      setProgress(audioRef.current.currentTime);
    }, 500); // Cập nhật progress mỗi 500ms
  }
  setIsPlaying(!isPlaying);
};

// Cập nhật progress khi kéo thanh progress-bar
const handleProgressChange = (e) => {
  const newTime = e.target.value;
  audioRef.current.currentTime = newTime;
  setProgress(newTime);
};
const changeSong = (direction) => {
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = arraySong.length - 1;
  if (newIndex >= arraySong.length) newIndex = 0;
  setCurrentIndex(newIndex);
  setIsPlaying(false);
  audioRef.current.load();
  audioRef.current.play();
  setIsPlaying(true);
};

const volumeChangeHandler = (e) => {
  const newVolume = e.target.value;
  setVolume(newVolume);
  audioRef.current.volume = newVolume;
};

const arraySong = [];
  const songRef = ref(db, 'songs');
  onValue(songRef, (items) => {
    items.forEach(item => {
      const data = item.val();
      const key = item.key;
      if (arraySong.length < 1) {
        const id = data.singerId[0];
        const singer = ref(db, `singers/${id}`);
        onValue(singer, item => {
          const datasinger = item.val();
          arraySong.push(
            {
              id: data.key,
              image: data.image,
              title: data.title,
              titlesinger: datasinger.title,
              audio: datasinger.audio
            }
          )
        })
      }
    });
  })

return (
  <div className="MusicPlay">
    <div className="container">
      {
        arraySong.map(item => (
          <div className="left" >
            <div className="image" >
              <img src={item.image} />
            </div>
            <div className="content">
              <h2 className="name-song">{item.title}</h2>
              <p className="name-singer">{item.titlesinger}</p>
              <audio src={item.audio} />
            </div>
          </div>
        ))
      }
      <div className="mid">
        <div className="music-controls">
          <button className="prev-button" onClick={changeSong}><FaBackwardStep /></button>
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? <FaPlay /> : <FaPause />}
          </button>
          <button className="next-button" onClick={changeSong}><FaForwardStep /></button>
        </div>
        <div className="progress-bar">
          <input type="range" className="progress-bar" min="0"
            max={audioRef.current?.duration || 0}
            value={progress}
            onChange={handleProgressChange}
          />
        </div>
      </div>
      <div className="right" >
        <FaVolumeUp />
        <input type="range" min="0" max="1" step="0.01" value={volume}
          onChange={volumeChangeHandler}
        />
      </div>
    </div>
  </div>
);
};

export default MusicPlay;


