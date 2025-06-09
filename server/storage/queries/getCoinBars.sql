SELECT
  toUnixTimestamp(toStartOfInterval(slot_time, INTERVAL 15 minute)) AS time,
  anyHeavy(avg_price) AS open,
  max(avg_price) AS high,
  min(avg_price) AS low,
  anyLast(price_after) AS close,
  toFloat32(sum(tokens_raw)) AS valume,
  sum(lamports_actual) AS volume_lamports
FROM default.pumpfun_trades
WHERE
  coin_mint = '${mint}'
  and slot_time >= now() - INTERVAL 1000 DAY
GROUP BY time
ORDER BY time