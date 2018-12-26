
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-average-daily-gain-results'
})
export class AgcAverageDailyGainResults {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n="results.weight-gain">Total Weight Gain</h2>
                                <span class="agc-results__value">{this.data['weightGain']}</span>
                            </li>
                            <li>
                                <h2 data-i18n="results.average-daily-gain">Average Daily Gain (ADG)</h2>
                                <span class="agc-results__value">{this.data['averageDailyGain']}</span>
                            </li>                      
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
