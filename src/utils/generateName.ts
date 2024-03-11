export function generateName(input: string): string {
  const vowels = "aeiouAEIOU";
  const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";

  let result = "";
  let syllableCount = 0;

  let consonantQueue: string[] = [];
  let vowelQueue: string[] = [];

  // Split characters into consonants and vowels
  for (const char of input) {
    if (consonants.includes(char)) {
      consonantQueue.push(char);
    } else if (vowels.includes(char)) {
      vowelQueue.push(char);
    }
  }

  // Try forming up to 3 syllables
  while (syllableCount < 3 && (consonantQueue.length > 0 || vowelQueue.length > 0)) {
    let syllable = "";

    // Add consonant if available
    if (consonantQueue.length > 0) {
      syllable += consonantQueue.shift();
    }

    // Add vowel if available
    if (vowelQueue.length > 0) {
      syllable += vowelQueue.shift();
      syllableCount += 1; // A valid syllable is only counted when a vowel is added
    } else if (syllable) {
      // If we have a consonant but no vowel, still count it as a syllable for the purpose of this task
      syllableCount += 1;
    }

    result += syllable;
  }

  return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}
