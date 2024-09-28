import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const mainVideoRef = useRef(null);
  const videoTimelineRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeBtnRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const currentVidTimeRef = useRef(null);
  const videoDurationRef = useRef(null);
  const skipBackwardRef = useRef(null);
  const skipForwardRef = useRef(null);
  const playPauseBtnRef = useRef(null);
  const speedBtnRef = useRef(null);
  const speedOptionsRef = useRef(null);
  const pipBtnRef = useRef(null);
  const fullScreenBtnRef = useRef(null);

  const [mp4, setmp4] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoName = searchParams.get("name");
  videoName && console.log(videoName);

  useEffect(() => {
    switch (videoName) {
      case "Kingdom of the Planet of the Apes":
        setmp4(KingdomOfThePlanetOfTheApes);
        break;
      case "Atlas":
        setmp4(Atlas);
        break;
      case "Civil War":
        setmp4(CivilWar);
        break;
      case "Godzilla x Kong: The New Empire":
        setmp4(Godzilla);
        break;
      case "The Fall Guy":
        setmp4(TheFallGuy);
        break;
      default:
        setmp4(Atlas);
    }
  }, [videoName]);

  const [timer, setTimer] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const hideControls = () => {
      if (mainVideoRef.current.paused) return;
      setTimer(
        setTimeout(() => {
          setShowControls(false);
        }, 3000)
      );
    };

    const handleMouseMove = () => {
      setShowControls(true);
      if (timer) clearTimeout(timer);
      hideControls();
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const formatTime = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours === 0) {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleTimelineMouseMove = (e) => {
    const timelineWidth = videoTimelineRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = Math.floor(
      (offsetX / timelineWidth) * mainVideoRef.current.duration
    );
    const progressTime = videoTimelineRef.current.querySelector("span");
    const adjustedOffsetX =
      offsetX < 20
        ? 20
        : offsetX > timelineWidth - 20
        ? timelineWidth - 20
        : offsetX;
    progressTime.style.left = `${adjustedOffsetX}px`;
    progressTime.innerText = formatTime(percent);
  };

  const handleTimelineMouseDown = (e) => {
    const timelineWidth = videoTimelineRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const percent = offsetX / timelineWidth;
    mainVideoRef.current.currentTime = percent * mainVideoRef.current.duration;
    setCurrentTime(mainVideoRef.current.currentTime);
  };

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    mainVideoRef.current.volume = volume;
    setVolume(volume);
  };

  const togglePlayPause = () => {
    if (mainVideoRef.current.paused) {
      mainVideoRef.current.play();
      setIsPlaying(true);
    } else {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(mainVideoRef.current.duration);
    mainVideoRef.current.volume = volume;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(mainVideoRef.current.currentTime);
    const percent = (mainVideoRef.current.currentTime / duration) * 100;
    progressBarRef.current.style.width = `${percent}%`;
  };

  const handleFullscreen = () => {
    const videoContainer = containerRef.current;
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    } else {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const changePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    mainVideoRef.current.playbackRate = newRate;
  };

  const skipForward = () => {
    mainVideoRef.current.currentTime = Math.min(mainVideoRef.current.currentTime + 10, mainVideoRef.current.duration);
    setCurrentTime(mainVideoRef.current.currentTime);
  };

  const skipBackward = () => {
    mainVideoRef.current.currentTime = Math.max(mainVideoRef.current.currentTime - 10, 0);
    setCurrentTime(mainVideoRef.current.currentTime);
  };

  return (
    <div className="flex items-center justify-center text-white font-abc font-bold">
      <div ref={containerRef} className="w-[800px]">
        <video
          ref={mainVideoRef}
          src={mp4}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          className="main-video"
        ></video>

        <div className={`controls ${showControls ? "show" : ""}`}>
          <div
            ref={videoTimelineRef}
            className="timeline"
            onMouseMove={handleTimelineMouseMove}
            onMouseDown={handleTimelineMouseDown}
          >
            <div
              ref={progressBarRef}
              className="progress-bar h-4 w-full color-white bg-blue-400 mb-2"
            ></div>
            <span className="progress-time">00:00</span>
          </div>

          <div className="bottom-controls flex mt-4 items-center justify-between">
            <div className="left-controls flex gap-4 items-center justify-center">
              <button ref={playPauseBtnRef} onClick={togglePlayPause}>
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pause"
                  >
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                )}
              </button>
              <span ref={currentVidTimeRef}>{formatTime(currentTime)}</span>
              <span>/</span>
              <span ref={videoDurationRef}>{formatTime(duration)}</span>
            </div>

            <div className="right-controls flex items-center gap-4">
              <button ref={volumeBtnRef}>
                <input
                  ref={volumeSliderRef}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </button>
              <button ref={skipBackwardRef} onClick={skipBackward}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-left-to-line"
                >
                  <path d="M3 19V5" />
                  <path d="m13 6-6 6 6 6" />
                  <path d="M7 12h14" />
                </svg>
              </button>
              <button ref={skipForwardRef} onClick={skipForward}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-right-to-line"
                >
                  <path d="M17 12H3" />
                  <path d="m11 18 6-6-6-6" />
                  <path d="M21 5v14" />
                </svg>
              </button>
              <button ref={fullScreenBtnRef} onClick={handleFullscreen}>
                {isFullscreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-minimize-2"
                  >
                    <polyline points="4 14 10 14 10 20" />
                    <polyline points="20 10 14 10 14 4" />
                    <line x1="14" x2="21" y1="10" y2="3" />
                    <line x1="3" x2="10" y1="21" y2="14" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-maximize"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                  </svg>
                )}
              </button>
              <button className="flex gap-2" ref={speedBtnRef} onClick={changePlaybackRate}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-circle-gauge"
                >
                  <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M13.4 10.6 19 5" />
                </svg>
                : {playbackRate}x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
