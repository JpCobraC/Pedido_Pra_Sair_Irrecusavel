import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, UtensilsCrossed, Stars, PartyPopper, Heart, Music, Play, Pause } from 'lucide-react';
import './index.css';

function App() {
  const sleep = (ms: number): Promise<void> => { return new Promise(resolve => setTimeout(resolve, ms)); };
  const [choice, setChoice] = useState<null | 'shopping' | 'dinner'>(null);
  const [noCount, setNoCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, player]);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'izGwDsrQ1eQ', // ID do vídeo do YouTube
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
          },
          onStateChange: (event: any) => {
            if (event.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      
      if (firstScriptTag) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag); // Em caso de fallback, adicionar o script no head
      }
    }
  }, []);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    document.documentElement.classList.toggle('dark', darkModeQuery.matches);
    darkModeQuery.addEventListener('change', applyTheme);
    return () => darkModeQuery.removeEventListener('change', applyTheme);
  }, []);

  const noButtonSize = Math.max(1, 1 - noCount * 0.1);
  const optionsSize = 1 + noCount * 0.1;

  const getNoButtonText = () => {
    const texts = [
      'Não quero 😕',
      'Tem certeza?',
      'Vai ser divertido!',
      'Por favor!',
      'Vamos lá!',
      'Não me deixa no vácuo!',
      'Só um pouquinho!',
      'Prometo que vai ser legal!',
      'Última chance!',
      'Tá bom, vou perguntar de novo...'
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div id="player"></div>
          <button 
            onClick={togglePlay} 
            className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full mb-6 transition-all duration-200 hover:shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-gray-800 dark:text-gray-200" />
            ) : (
              <Play className="w-8 h-8 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
        {!answered ? (
          <>
            <div className="mb-8">
              <div className="flex justify-center gap-4 mb-4">
                <ShoppingBag className="w-12 h-12 text-purple-500 dark:text-purple-400 animate-bounce" />
                <UtensilsCrossed className="w-12 h-12 text-orange-500 dark:text-orange-400 animate-bounce" />
                <Music className="w-12 h-12 text-blue-500 dark:text-blue-400 animate-bounce" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Quer sair comigo?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Escolhe uma opção! Prometo que vai ser incrível!
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <button
                onClick={() => {
                  setChoice('shopping');
                  setAnswered(true);
                  const exemplo = async () => {
                    await sleep(2000);
                    window.location.href = "Seu zap";
                  };
                  exemplo();
                }}
                style={{ transform: `scale(${optionsSize})` }}
                className="w-full bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shopping
              </button>
              <button
                onClick={() => {
                  setChoice('dinner');
                  setAnswered(true);
                  const exemplo = async () => {
                    await sleep(2000);
                    window.location.href = "Seu ZAP";
                  };
                  exemplo();
                }}
                style={{ transform: `scale(${optionsSize})` }}
                className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Jantar
              </button>
              <button
                onClick={() => {
                  setNoCount(noCount + 1);
                }}
                style={{ transform: `scale(${noButtonSize})` }}
                className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold py-3 px-8 rounded-full transition-all duration-200"
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {choice === 'shopping' ? (
                <ShoppingBag className="w-16 h-16 text-purple-500 dark:text-purple-400 animate-bounce" />
              ) : (
                <UtensilsCrossed className="w-16 h-16 text-orange-500 dark:text-orange-400 animate-bounce" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Eba! 🎉
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {choice === 'shopping' 
                ? 'Vai ser incrível!' 
                : 'Vai ser incrível!'}
            </p>
            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-pink-500 dark:text-pink-400 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
