import React, { useState, useEffect } from 'react';
import { Card } from '../Card';

const pokemonImages = [
  '/pokemon/1.png',
  '/pokemon/2.png',
  '/pokemon/3.png',
  '/pokemon/4.png',
  '/pokemon/5.png',
  '/pokemon/6.png',
  '/pokemon/7.png',
  '/pokemon/8.png',
  '/pokemon/9.png',
  '/pokemon/17.png',
  '/pokemon/25.png',
  '/pokemon/71.png',
  '/pokemon/130.png',
  '/pokemon/143.png',

  // Adicione mais imagens de pokémon aqui
];

const shuffleArray = (array: any[]) => {
  return array
    .concat(array) // duplicar o array para ter pares de cartas
    .sort(() => Math.random() - 0.5);
};

export const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0); // Índice do jogador atual (0 = Jogador 1, 1 = Jogador 2, etc.)
  const [scores, setScores] = useState<number[]>([0, 0, 0]); // Placar para até 3 jogadores

  useEffect(() => {
    const shuffledCards = shuffleArray(pokemonImages.map((image, index) => ({ id: index, image })));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return; // Bloqueia mais cliques ou cards já virados

    setFlippedCards((prev) => [...prev, index]);

    // Se já tem 1 card virado, checar se é um par
    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;

      if (cards[firstIndex].id === cards[secondIndex].id) {
        // É um par, adicionar à lista de matchedCards
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        // Incrementa o placar do jogador atual
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[currentPlayer] += 1; // Adiciona 1 ponto ao jogador atual
          return newScores;
        });
        setFlippedCards([]); // Limpa os flippedCards porque já acertou o par
      } else {
        // Não é um par, virar os cards de volta após um tempo e trocar de jogador
        setTimeout(() => {
          setFlippedCards([]);
          // Passa para o próximo jogador
          setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % 3); // Cicla entre 3 jogadores (0, 1, 2)
        }, 1000);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Placar */}
      <div className="mb-4 bg-purple-600 p-1 rounded-xl">
        <h2 className="text-xl text-zinc-50 font-bold text-center">Placar</h2>
        <div className="flex space-x-4">
          <div className={`text-lg text-zinc-100 ${currentPlayer === 0 ? 'font-bold' : ''}`}>Jogador 1: {scores[0]}</div>
          <div className={`text-lg text-zinc-100 ${currentPlayer === 1 ? 'font-bold' : ''}`}>Jogador 2: {scores[1]}</div>
          <div className={`text-lg text-zinc-100 ${currentPlayer === 2 ? 'font-bold' : ''}`}>Jogador 3: {scores[2]}</div>
        </div>
      </div>

      {/* Tabuleiro do jogo */}
      <div className="flex max-w-screen-xl flex-wrap justify-center gap-4 p-2 bg-zinc-100 bg-opacity-20 rounded-xl">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={card.id}
            image={card.image}
            flipped={flippedCards.includes(index) || matchedCards.includes(index)} // Deixa o card virado se acertado
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Jogador atual */}
      <div className="mt-1 bg-purple-700 p-1 rounded-lg">
        <h2 className="text-lg text-zinc-100 ">Vez do Jogador {currentPlayer + 1}</h2>
      </div>
    </div>
  );
};