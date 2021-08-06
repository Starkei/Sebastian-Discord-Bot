export function mapToArabic(roman: string): number {
  if (roman == null) return -1;
  var totalValue = 0,
    value = 0, // Initialise!
    prev = 0;

  for (var i = 0; i < roman.length; i++) {
    var current = char_to_int(roman.charAt(i));
    if (current > prev) {
      // Undo the addition that was done, turn it into subtraction
      totalValue -= 2 * value;
    }
    if (current !== prev) {
      // Different symbol?
      value = 0; // reset the sum for the new symbol
    }
    value += current; // keep adding same symbols
    totalValue += current;
    prev = current;
  }
  return totalValue;
}

function char_to_int(character: string): number {
  switch (character) {
    case "I":
      return 1;
    case "V":
      return 5;
    case "X":
      return 10;
    case "L":
      return 50;
    case "C":
      return 100;
    case "D":
      return 500;
    case "M":
      return 1000;
    default:
      return -1;
  }
}
