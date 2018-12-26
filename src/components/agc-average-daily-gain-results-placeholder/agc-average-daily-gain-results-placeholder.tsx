
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-average-daily-gain-results-placeholder'
})
export class AgcAverageDailyGainResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.weight-gain">Total Weight Gain</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.average-daily-gain">Average Daily Gain (ADG)</h2>
                        {placeholder()}
                    </li>                                     
                </ul>
            </section>
        );
    }
}