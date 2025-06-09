export function useCoinBars() {
  async function getCoinBars(mint: string): Promise<any> {
    return await $fetch('/api/coin/bars', {
      query: { mint }
    });
  }

  return { getCoinBars };
}
