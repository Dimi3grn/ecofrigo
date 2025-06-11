import React, { createContext, useContext } from 'react';
import { useScore } from '../hooks/useScore';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const scoreData = useScore();

  return (
    <ScoreContext.Provider value={scoreData}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScoreContext must be used within a ScoreProvider');
  }
  return context;
}; 