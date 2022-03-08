export default function coinToss(): boolean {
  // generate a random number if it is even true or false if it is odd
  return Math.floor(Math.random() * 2) === 0;
}
