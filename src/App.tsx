import React, { useState } from 'react';
import { ShoppingBag, UtensilsCrossed, Stars, PartyPopper, Heart } from 'lucide-react';

function App() {
  const sleep = (ms: number): Promise<void> => { return new Promise(resolve => setTimeout(resolve, ms)); };
  const [choice, setChoice] = useState<null | 'shopping' | 'dinner'>(null);
  const [noCount, setNoCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {!answered ? (
          <>
            <div className="mb-8">
              <div className="flex justify-center gap-4 mb-4">
                <ShoppingBag className="w-12 h-12 text-purple-500 animate-bounce" />
                <UtensilsCrossed className="w-12 h-12 text-orange-500 animate-bounce" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Quer sair comigo?
              </h1>
              <p className="text-gray-600 mb-8">
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
                    window.location.href = "https://wa.me/<Seu número>?text=Quero ir pro shopping!"
                  };
                  exemplo();
                }}
                style={{ transform: `scale(${optionsSize})` }}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
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
                    window.location.href = "https://wa.me/<Seu número>>?text=Quero ir comer hambúrguer!"
                  };
                exemplo();
                }}
                style={{ transform: `scale(${optionsSize})` }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Hamburgueria
              </button>
              <button
                onClick={() => {
                  setNoCount(noCount + 1);
                }}
                style={{ transform: `scale(${noButtonSize})` }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-full transition-all duration-200"
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {choice === 'shopping' ? (
                <ShoppingBag className="w-16 h-16 text-purple-500 animate-bounce" />
              ) : (
                <UtensilsCrossed className="w-16 h-16 text-orange-500 animate-bounce" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Eba! 🎉
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              {choice === 'shopping' 
                ? 'Vai ser incrível!' 
                : 'Vai ser incrível!'}
            </p>
            <div className="flex justify-center">
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;