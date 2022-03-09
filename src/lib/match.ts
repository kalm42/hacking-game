export default function match(a: string, b: string): number {
  let likeness = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) likeness++;
  }
  return likeness;
}
