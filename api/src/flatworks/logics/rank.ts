/*
rankLanguage: return score of match jobSeeker git used language and required languages for a posted job: 0-4
rankPrice: return score of match placed price with given budget: 0-4
rankBid: return final score of match for given bid: number 0-5
*/

const rankLanguage = (
  gitLanguages: string[],
  requiredLanguages: string[],
): number => {
  const matchedLangues = requiredLanguages.filter((language) =>
    gitLanguages.includes(language),
  );
  return (matchedLangues.length / requiredLanguages.length) * 4;
};

const rankPrice = (
  minPrice = 0,
  maxPrice: number,
  placedPrice: number,
): number => {
  return ((maxPrice - placedPrice) / (maxPrice - minPrice)) * 4;
};

const rankBid = (
  languageRank: number,
  priceRank: number,
  hasPrototype: boolean,
): number => {
  return (languageRank * 3 + priceRank) / 4 + (hasPrototype ? 1 : 0);
};

export { rankBid, rankLanguage, rankPrice };
