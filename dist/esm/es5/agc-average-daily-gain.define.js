
// AgcAverageDailyGain: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-average-daily-gain.core.js';
import {
  AgcAverageDailyGain,
  AgcAverageDailyGainProgress,
  AgcAverageDailyGainResults,
  AgcAverageDailyGainResultsPlaceholder
} from './agc-average-daily-gain.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcAverageDailyGain,
    AgcAverageDailyGainProgress,
    AgcAverageDailyGainResults,
    AgcAverageDailyGainResultsPlaceholder
  ], opts);
}
