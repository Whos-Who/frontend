// Knuth shuffle - https://bost.ocks.org/mike/shuffle/
// Shuffles the given array in-place
export const shuffle = (array: any[]): any[] => {
  let currIndex = array.length;
  let randomIndex;
  let temp;

  // While there are remaining elements to shuffle
  while (currIndex) {
    // Pick a random element
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;

    // Swap with current element
    temp = array[currIndex];
    array[currIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};
