interface Person {
  name: string;
}
function geName(
  person: Person | null | undefined
): string | null | undefined {
  return person?.name;
}