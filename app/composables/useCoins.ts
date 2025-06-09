import type { Coin } from '~~/models';

export function useCoins() {
  const coins: Ref<Coin[]> = ref([]);

  async function getCoins(): Promise<void> {
    coins.value = await $fetch('/api/coins');
  }

  return { coins, getCoins };
}
