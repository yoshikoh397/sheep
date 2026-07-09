/**
 * ガチャの抽選ロジック
 * @param {Array} allCards 全カードのマスター配列
 * @param {Array} collectedIds ユーザーが所持しているIDの配列
 * @param {number} currentRollCount 引く前の累計ガチャ回数
 * @returns {Object} 抽選されたカードオブジェクト
 */
export function drawGacha(allCards, collectedIds, currentRollCount) {
  if (!allCards || allCards.length === 0) return null;

  const nextRollCount = currentRollCount + 1;

  // 10回に1回は「確定で未所持カード」が出る救済システム
  const isGuaranteedNew = nextRollCount % 10 === 0;

  if (isGuaranteedNew) {
    const uncollectedCards = allCards.filter(
      (card) => !collectedIds.includes(card.id),
    );

    // 未取得カードが残っていれば、その中から抽選
    if (uncollectedCards.length > 0) {
      return getRandomElement(uncollectedCards);
    }
  }

  // 通常時は全カードから完全ランダム抽選
  return getRandomElement(allCards);
}

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
