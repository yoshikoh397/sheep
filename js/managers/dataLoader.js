let cardCache = null;

/**
 * cards.jsonからデータを一度だけ読み込みキャッシュ
 */
export async function initDataLoader() {
  if (cardCache) return;
  try {
    const response = await fetch("../../data/cards.json");
    if (!response.ok) throw new Error("カードデータの読み込みに失敗しました");
    cardCache = await response.json();
  } catch (error) {
    console.error(error);
    cardCache = [];
  }
}

export function getCards() {
  return cardCache;
}

export function getCard(id) {
  return cardCache.find((card) => card.id === Number(id)) || null;
}

export function getCardCount() {
  return cardCache.length;
}
