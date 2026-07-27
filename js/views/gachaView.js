export function updateStats({ rollCount, collectedCount, totalCount }) {
  document.getElementById("total-rolls").textContent = rollCount;
  document.getElementById("collection-count").textContent = collectedCount;
}

/**
 * 抽選結果の演出およびカード描画を行います
 * @param {Object} card 獲得したカードデータ
 * @returns {Promise} 演出完了後に解決するPromise
 */
export function displayResult(card) {
  return new Promise((resolve) => {
    const displayEl = document.getElementById("result-display");

    displayEl.innerHTML = `<div class="loading-spinner">シャッフル中...</div>`;

    setTimeout(() => {
      displayEl.innerHTML = `
        <div class="card-item rarity-${card.rarity.toLowerCase()} animate-pop">
          <div class="card-rarity-badge">${card.rarity}</div>
          <div class="card-mock-img"><img src= "${card.image}"/></div>
          <p class="card-name">${card.name}</p>
          <p class="card-explanation">${card.explanation}</p>
        </div>
      `;
      resolve();
    }, 400); // 400msのダミー演出時間
  });
}

export function resetDisplay() {
  document.getElementById("result-display").innerHTML = `
    <div class="placeholder-card"></div>
  `;
}
