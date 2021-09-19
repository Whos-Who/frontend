// Knuth shuffle - https://bost.ocks.org/mike/shuffle/
// Shuffles and returns a new array
export const shuffle = (array: any[]): any[] => {
  const newArray = [...array];
  let currIndex = newArray.length;
  let randomIndex;
  let temp;

  // While there are remaining elements to shuffle
  while (currIndex) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;

    // Swap with current element
    temp = newArray[currIndex];
    newArray[currIndex] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }

  return newArray;
};
