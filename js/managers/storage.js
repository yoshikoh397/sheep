const STORAGE_KEYS = {
  COLLECTION: "gacha_user_collection",
  ROLL_COUNT: "gacha_total_roll_count",
};

export function getCollection() {
  const data = localStorage.getItem(STORAGE_KEYS.COLLECTION);
  return data ? JSON.parse(data) : [];
}

export function addCollection(cardId) {
  const collection = getCollection();
  if (!collection.includes(cardId)) {
    collection.push(cardId);
    localStorage.setItem(STORAGE_KEYS.COLLECTION, JSON.stringify(collection));
    return true; // 新規獲得
  }
  return false; // 重複獲得
}

export function isCollected(cardId) {
  return getCollection().includes(cardId);
}

export function getRollCount() {
  const count = localStorage.getItem(STORAGE_KEYS.ROLL_COUNT);
  return count ? Number(count) : 0;
}

export function incrementRollCount() {
  const nextCount = getRollCount() + 1;
  localStorage.setItem(STORAGE_KEYS.ROLL_COUNT, nextCount);
  return nextCount;
}

export function resetCollection() {
  localStorage.removeItem(STORAGE_KEYS.COLLECTION);
  localStorage.removeItem(STORAGE_KEYS.ROLL_COUNT);
}
