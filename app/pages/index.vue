<template lang="pug">
  NuxtLink.coin-item(
    v-for="coin in coins",
    :to="`/coin/${coin.symbol}/${coin.mint}`")
    .border.border-neutral-300.b-1.p-2.m-2.rounded-md(class="hover:bg-neutral-100")
      .text-base.pb-1 {{ coin.symbol }}
      .text-sm {{ coin.name }}
</template>

<script setup lang="ts">
  // Composable to handle Coins.
  const { coins, getCoins } = useCoins();

  // Get coins available for user.
  await getCoins();
</script>
