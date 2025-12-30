import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface CutsceneModalProps {
  scene: 'intro' | 'boss-appear' | 'victory' | null;
  onClose: () => void;
}

const cutscenes = {
  intro: {
    title: '🏰 ПАДЕНИЕ КОРОЛЕВСТВА',
    frames: [
      {
        text: 'Давным-давно собаки и коты жили в мире...',
        image: '🏰🐕🤝🐱',
      },
      {
        text: 'Но злой Кот Альфа жаждал власти над всеми королевствами!',
        image: '😼👑⚡',
      },
      {
        text: 'Он собрал армию котов и напал на Королевство Собак...',
        image: '😾😾😾⚔️🏰',
      },
      {
        text: 'Король Догги пал в бою. Ты - последний воин!',
        image: '🐕💔⚔️',
      },
      {
        text: 'Попугай Пьер и гусь Гал помогут тебе отомстить!',
        image: '🦜🦢🐕✨',
      },
    ],
  },
  'boss-appear': {
    title: '⚡ ПОЯВЛЕНИЕ БОССА',
    frames: [
      {
        text: 'Земля задрожала... В небе появилась тень!',
        image: '🌩️☁️',
      },
      {
        text: 'КОТ АЛЬФА НА ДРАКОНЕ!',
        image: '😼🐉🔥',
      },
      {
        text: 'Это твой шанс отомстить за королевство!',
        image: '🐕⚔️🔥',
      },
    ],
  },
  victory: {
    title: '👑 ПОБЕДА',
    frames: [
      {
        text: 'Кот Альфа повержен!',
        image: '😼💥❌',
      },
      {
        text: 'Королевство собак спасено!',
        image: '🏰✨🎉',
      },
      {
        text: 'Ты стал легендой! 🏆',
        image: '🐕👑⭐',
      },
    ],
  },
};

export default function CutsceneModal({ scene, onClose }: CutsceneModalProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  if (!scene) return null;

  const cutscene = cutscenes[scene];
  const frame = cutscene.frames[currentFrame];

  const handleNext = () => {
    if (currentFrame < cutscene.frames.length - 1) {
      setCurrentFrame(currentFrame + 1);
    } else {
      onClose();
      setCurrentFrame(0);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentFrame]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <div className="w-full max-w-3xl mx-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-8 animate-fade-in">
          {cutscene.title}
        </h1>

        <div className="bg-gray-900 border-4 border-gray-700 p-8 rounded-lg mb-6 min-h-[300px] flex flex-col items-center justify-center animate-scale-in">
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">
            {frame.image}
          </div>
          <p className="text-white text-lg md:text-xl leading-relaxed px-4">
            {frame.text}
          </p>
        </div>

        <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
          <span>
            {currentFrame + 1} / {cutscene.frames.length}
          </span>
          <span className="animate-pulse">Нажми ENTER или ПРОБЕЛ</span>
        </div>

        <Button
          onClick={handleNext}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
        >
          {currentFrame < cutscene.frames.length - 1 ? 'Далее ►' : 'Начать игру!'}
        </Button>
      </div>
    </div>
  );
}
