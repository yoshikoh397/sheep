let isGridInitialized = false;

/**
 * ギャラリーの骨組み生成
 */
export function initGalleryGrid(allCards) {
  if (isGridInitialized) return;

  const gridEl = document.getElementById("gallery-grid");
  gridEl.innerHTML = allCards
    .map(
      (card) => `
    <div class="gallery-card-wrapper not-collected" id="gallery-card-${card.id}">
      <div class="card-item rarity-${card.rarity.toLowerCase()}">
        <div class="card-rarity-badge">${card.rarity}</div>
        <div class="card-mock-img"><img src="${card.image}" alt=""></div>
        <p class="card-name">${card.name}</p>
      </div>
    </div>
  `,
    )
    .join("");

  isGridInitialized = true;
}

/**
 * 現在の所持状況に合わせて、グレーアウト解除
 */
export function updateGalleryState(collectedIds) {
  collectedIds.forEach((id) => {
    const cardEl = document.getElementById(`gallery-card-${id}`);
    if (cardEl && cardEl.classList.contains("not-collected")) {
      cardEl.classList.remove("not-collected");
      cardEl.classList.add("collected");
    }
  });
}

export function openGalleryModal() {
  document.getElementById("gallery-modal").classList.remove("hidden");
}

export function closeGalleryModal() {
  document.getElementById("gallery-modal").classList.add("hidden");
}

export function clearGalleryState(allCards) {
  allCards.forEach((card) => {
    const cardEl = document.getElementById(`gallery-card-${card.id}`);
    if (cardEl) {
      cardEl.classList.remove("collected");
      cardEl.classList.add("not-collected");
    }
  });
}
