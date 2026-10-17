import confetti from "canvas-confetti";

export interface ScrambleWordState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
export const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
export const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getInitialState = (): ScrambleWordState => {
  const shuffleWords = shuffleArray([...GAME_WORDS]);
  return {
    currentWord: shuffleWords[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffleWords[0]),
    skipCounter: 0,
    words: shuffleWords,
    totalWords: shuffleWords.length,
  };
};

export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "SKIP_WORD" }
  | { type: "PLAY_AGAIN"; payload: ScrambleWordState };

export const ScrambleWordsReducer = (
  state: ScrambleWordState,
  action: ScrambleWordsAction,
): ScrambleWordState => {
  switch (action.type) {
    case "SET_GUESS":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };
    case "CHECK_ANSWER":
      if (state.currentWord === state.guess) {
        const newWords = state.words.slice(1);
        confetti({
          spread: 120,
          particleCount: 100,
          origin: { y: 0.6 },
        });
        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
          guess: "",
        };
      }
      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: "",
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };

    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state;
      const updatedWords = state.words.slice(1);
      return {
        ...state,
        words: updatedWords,
        skipCounter: state.skipCounter + 1,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guess: "",
      };
    }
    case "PLAY_AGAIN": {
      return action.payload;
    }
    default:
      return state;
  }
};
