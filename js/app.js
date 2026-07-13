import {
  initDataLoader,
  getCards,
  getCardCount,
} from "./managers/dataLoader.js";
import * as storage from "./managers/storage.js";
import { drawGacha } from "./domain/gachaLogic.js";
import * as gachaView from "./views/gachaView.js";
import * as galleryView from "./views/galleryView.js";

let isProcessing = false;

/**
 * アプリ初期化
 */
async function initApp() {
  // 1. マスターデータ読み込み
  await initDataLoader();

  // 2. ギャラリーDOMの初回取得
  galleryView.initGalleryGrid(getCards());

  // 3. UIの初期表示
  refreshUserStats();

  // 4. イベントリスナーのバインド
  setupEventListeners();
}

/**
 * 所持数や総ガチャ回数の表示を同期
 */
function refreshUserStats() {
  const collectedIds = storage.getCollection();
  gachaView.updateStats({
    rollCount: storage.getRollCount(),
    collectedCount: collectedIds.length,
    totalCount: getCardCount(),
  });
}

/**
 * イベントリスナー登録
 */
function setupEventListeners() {
  // ガチャを引くボタン
  document
    .getElementById("btn-roll")
    .addEventListener("click", handleRollGacha);

  // ギャラリー開閉モーダル
  document.getElementById("btn-open-gallery").addEventListener("click", () => {
    galleryView.updateGalleryState(storage.getCollection());
    galleryView.openGalleryModal();
  });
  document
    .getElementById("btn-close-gallery")
    .addEventListener("click", galleryView.closeGalleryModal);

  // データリセットボタン
  document
    .getElementById("btn-reset")
    .addEventListener("click", handleResetData);
}

/**
 * ガチャを引くイベントハンドラーフロー
 */
async function handleRollGacha() {
  if (isProcessing) return;
  isProcessing = true;

  const allCards = getCards();
  const collectedIds = storage.getCollection();
  const currentRolls = storage.getRollCount();

  const drawnCard = drawGacha(allCards, collectedIds, currentRolls);

  if (!drawnCard) {
    isProcessing = false;
    return;
  }

  storage.incrementRollCount();
  storage.addCollection(drawnCard.id);

  // 演出終了をawaitで待つ
  await gachaView.displayResult(drawnCard);

  refreshUserStats();
  isProcessing = false;
}

/**
 * リセット処理
 */
function handleResetData() {
  if (!confirm("これまでのコレクションデータをすべて削除しますか？")) return;

  storage.resetCollection();
  gachaView.resetDisplay();
  galleryView.clearGalleryState(getCards());
  refreshUserStats();
}

// アプリの起動
initApp();
