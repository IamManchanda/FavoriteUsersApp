import { BADGE_OPTIONS } from "../constants/badges";
import { Badge } from "../types/badge";

const swap = (array: Badge[], i: number, j: number) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const shuffleArray = (array: Badge[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swap(array, currentIndex, randomIndex);
  }

  return array;
};

export const getRandomBadges = (min: number, max: number): Badge[] => {
  const shuffledBadges = shuffleArray([...BADGE_OPTIONS]);
  return shuffledBadges.slice(
    0,
    Math.floor(Math.random() * (max - min + 1) + min),
  );
};
