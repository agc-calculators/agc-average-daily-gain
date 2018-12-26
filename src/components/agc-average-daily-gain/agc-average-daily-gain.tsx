
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate } from '../../utils';
// import { addDays, formatDate, inputDate, daysBetween } from '../../utils'

@Component({
    tag: 'agc-average-daily-gain'
})
export class AgcAverageDailyGain {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-average-daily-gain" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.start-weight">Start Weight</label>
                            <input name="startWeight" type="text" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.start-weight.required" data-validates="startWeight">Please enter a valid weight.</p>
                            <p data-i18n="hints.start-weight">⮤ Enter the starting weight of the animal.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.end-weight">End Weight</label>
                            <input name="endWeight" type="text" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.end-weight.required" data-validates="endWeight">Please enter a valid weight.</p>
                            <p data-i18n="hints.end-weight">⮤ Enter the finish weight of the animal.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && [<button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}
                        </div>
                    </section>
                    <section data-wizard-section="3">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.days-on-feed">Days on Feed</label>
                            <input name="daysOnFeed" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.days-on-feed.required" data-validates="daysOnFeed">Please enter a number.</p>
                            <p data-i18n="hints.days-on-feed">⮤ Enter the total number of days on feed.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'startWeight')) {
                valid = false
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'endWeight')) {
                valid = false
            }
        }
        if (this.currentStep === 2 || this.mode === 'full') {
            if (!validate(this.form, 'daysOnFeed')) {
                valid = false
            }
        }        

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let startWeight =  parseFloat((this.form.querySelector('[name="startWeight"') as HTMLInputElement).value);
        let endWeight =  parseFloat((this.form.querySelector('[name="endWeight"') as HTMLInputElement).value);
        let daysOnFeed =  parseFloat((this.form.querySelector('[name="daysOnFeed"') as HTMLInputElement).value);
        let weightGain = parseFloat((endWeight - startWeight).toFixed(2));
        let averageDailyGain = parseFloat((weightGain / daysOnFeed).toFixed(2));

        let results = {
            socket: this.socket,
            tract: this.tract,
            startWeight,
            endWeight,
            daysOnFeed,
            weightGain,
            averageDailyGain
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        //(this.form.querySelector('[name="first"]') as HTMLInputElement)!.defaultValue = 'Yup';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}