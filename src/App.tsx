import React from 'react';
import {GameBoard} from './components/GameBoard';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen  flex items-center justify-center bg-pokemon-pattern bg-cover bg-no-repeat bg-center">
      <GameBoard />
    </div>
  );
};

