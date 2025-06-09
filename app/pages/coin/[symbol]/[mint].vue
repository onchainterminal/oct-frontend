<template lang="pug">
  #chartContainer(ref="chart$")
</template>

<script setup lang="ts">
  import { type ResolutionString, widget } from 'trading-view';

  // Composable to handle Router.
  const router = useRouter();

  // Composable to handle Coin Bars.
  const { getCoinBars } = useCoinBars();

  let bars: Bar[] = [];

  const mint = computed(() => {
    return router.currentRoute.value.params.mint;
  });

  const symbol = computed(() => {
    return router.currentRoute.value.params.symbol;
  });

  // Interface for a single bar/candle
  interface Bar {
    time: number; // UTC timestamp in seconds
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number; // Optional
  }

  const Datafeed = {
    onReady: (callback) => {
      setTimeout(
        () =>
          callback({
            supports_marks: false,
            supports_timescale_marks: false,
            supports_time: true, // Needed to get server time
            exchanges: [], // [{ value: "BITFINEX", name: "Bitfinex", desc: "Bitfinex" }, { value: "BITSTAMP", name: "Bitstamp", desc: "Bitstamp"}],
            symbols_types: [], // [{ name: "crypto", value: "crypto" }]
            supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M', '1S']
          }),
        0
      );
    },
    searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
      console.log('[searchSymbols]: Method call');
    },
    resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
      const symbolInfo = {
        ticker: symbolName.toUpperCase(),
        name: `${symbolName.toUpperCase()}`,
        description: '',
        type: 'crypto',
        session: '24x7',
        timezone: 'Etc/UTC',
        exchange: 'CUSTOM_EXCHANGE',
        minmov: 1,
        pricescale: 1000000,
        has_intraday: true,
        visible_plots_set: 'ohlcv',
        has_weekly_and_monthly: true,
        supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M', '1S'],
        volume_precision: 4,
        data_status: 'streaming'
      };
      console.log('[resolveSymbol]: Resolved symbol info:', symbolInfo);
      setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
    },
    getBars: (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
      const { from, to, countBack, firstDataRequest } = periodParams;

      getCoinBars(mint.value).then((allBars) => {
        let barsToReturn: Bar[] = [];

        if (firstDataRequest && countBack && countBack > 0 && allBars.length > 0) {
          const sortedAllBars = [...allBars].sort((a, b) => a.time - b.time);
          barsToReturn = sortedAllBars.slice(-countBack);
        } else {
          barsToReturn = allBars.filter((bar) => {
            return bar.time >= from && bar.time <= to;
          });
          console.log(
            `[getBars] Standard request. Loaded ${allBars.length} total bars, filtered to ${barsToReturn.length} bars for the requested range (from: ${new Date(from * 1000).toISOString()}, to: ${new Date(to * 1000).toISOString()}).`
          );
        }

        if (barsToReturn.length === 0) {
          console.log('[getBars] No bars to display for the current logic/range.');
          onHistoryCallback([], { noData: true });
        } else {
          // The library expects bars to be sorted by time
          const sortedBarsToSend = [...barsToReturn].sort((a, b) => a.time - b.time);
          console.log(`[getBars] Sending ${sortedBarsToSend.length} bars to chart.`);
          bars = sortedBarsToSend;
          onHistoryCallback(sortedBarsToSend, { noData: false });
        }
      });
    },
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
      console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
      console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    getServerTime: (callback: (unixTime: number) => void) => {
      // Return current UTC time in seconds
      const nowSeconds = Math.floor(Date.now() / 1000);
      console.log('[getServerTime]: Providing current time:', new Date(nowSeconds * 1000).toISOString());
      callback(nowSeconds);
    }
  };

  onMounted(() => {
    const tvWidget = new widget({
      symbol: symbol.value as string,
      container: 'chartContainer',
      locale: 'en',
      library_path: '/charting_library/',
      datafeed: Datafeed,
      interval: '1' as ResolutionString,
      fullscreen: true,
      debug: true,
      disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_search_hot_key'],
      overrides: {
        'mainSeriesProperties.statusViewStyle.showInterval': true,
        'mainSeriesProperties.statusViewStyle.symbolTextSource': 'ticker'
      }
    });

    tvWidget.onChartReady(() => {
      console.log('TradingView Chart is ready!');
      const lastBarTime = new Date().getTime();
      const padding = 100;

      try {
        tvWidget.chart().setVisibleRange(
          {
            from: (bars[0]?.time || 0) - padding,
            to: lastBarTime + padding
          },
          { percentRightMargin: 10 }
        );
      } catch (e) {
        console.error('TradingView: Error setting visible range:', e);
      }
    });
  });
</script>
