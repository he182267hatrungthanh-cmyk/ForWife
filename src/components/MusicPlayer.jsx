import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import siteConfig from '../config/siteConfig';

export default function MusicPlayer({ shouldPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(siteConfig.music?.initialVolume || 0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudioFile, setHasAudioFile] = useState(true);
  const audioRef = useRef(null);
  const synthRef = useRef(null); // Web Audio API fallback nếu chưa có file MP3

  // Khởi tạo synth piano / music box du dương nếu không tìm thấy file MP3
  const playSynthesizedMelody = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      synthRef.current = ctx;

      // Nốt nhạc giai điệu lãng mạn (Canon in D / Romantic chords)
      const notes = [
        261.63, 329.63, 392.00, 523.25, // C - E - G - C
        220.00, 261.63, 329.63, 440.00, // A - C - E - A
        174.61, 220.00, 261.63, 349.23, // F - A - C - F
        196.00, 246.94, 293.66, 392.00, // G - B - D - G
      ];

      let noteIdx = 0;
      const interval = setInterval(() => {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], ctx.currentTime);

        const currentVol = isMuted ? 0 : volume * 0.25;
        gain.gain.setValueAtTime(currentVol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.2);

        noteIdx++;
      }, 500);

      synthRef.current.intervalId = interval;
    } catch (e) {
      console.warn("Synthesizer error", e);
    }
  };

  const stopSynthesizer = () => {
    if (synthRef.current) {
      if (synthRef.current.intervalId) {
        clearInterval(synthRef.current.intervalId);
      }
      if (synthRef.current.close) {
        synthRef.current.close();
      }
      synthRef.current = null;
    }
  };

  // Cố gắng phát nhạc khi có tín hiệu shouldPlay (sau khi bấm mở khóa)
  useEffect(() => {
    if (shouldPlay && !isPlaying) {
      startPlayback();
    }
  }, [shouldPlay]);

  const startPlayback = () => {
    if (audioRef.current && hasAudioFile) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay was prevented by browser policy:", err);
          // Không bật synth nếu file audio có thật để người dùng click nút phát
        });
    } else if (!hasAudioFile) {
      playSynthesizedMelody();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    stopSynthesizer();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.35;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  // Dọn dẹp synthesizer khi component unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
    };
  }, []);

  return (
    <>
      {/* Thẻ audio ẩn */}
      <audio
        ref={audioRef}
        src={siteConfig.music?.src || '/music/love-song.mp3'}
        loop
        preload="auto"
        onError={() => {
          setHasAudioFile(false);
        }}
      />

      {/* Thanh điều khiển nhạc nổi góc dưới màn hình */}
      <div className="floating-music-bar">
        <button
          className={`music-disk-btn ${isPlaying ? 'spinning' : ''}`}
          onClick={togglePlay}
          title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc lãng mạn'}
          aria-label="Điều khiển nhạc"
        >
          {isPlaying ? <Music size={18} /> : <Play size={16} style={{ marginLeft: 2 }} />}
        </button>

        <div className="music-info" onClick={togglePlay} style={{ cursor: 'pointer' }}>
          <span className="music-title-text">
            {siteConfig.music?.title || 'Romantic Melody'}
          </span>
          <span className="music-sub-text">
            {isPlaying ? 'Đang phát du dương 🎶' : 'Bấm để phát nhạc'}
          </span>
        </div>

        <button
          onClick={toggleMute}
          style={{ background: 'none', border: 'none', color: '#ffb3c1', cursor: 'pointer', display: 'flex' }}
          title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
        >
          {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="music-volume-slider"
          title="Âm lượng"
        />
      </div>
    </>
  );
}
