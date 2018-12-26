/*! Built with http://stenciljs.com */
import { h } from '../agc-average-daily-gain.core.js';

class AgcAverageDailyGainResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.weight-gain" }, "Total Weight Gain"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.average-daily-gain" }, "Average Daily Gain (ADG)"),
                    placeholder()))));
    }
    static get is() { return "agc-average-daily-gain-results-placeholder"; }
}

export { AgcAverageDailyGainResultsPlaceholder };
