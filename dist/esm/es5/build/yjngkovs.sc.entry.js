/*! Built with http://stenciljs.com */
import{h}from"../agc-average-daily-gain.core.js";var validate=function(t,e){var a=t.querySelector('[name="'+e+'"]'),i=t.querySelector('[data-validates="'+e+'"');return a.checkValidity()?(a.className=a.className.replace(" invalid",""),i.style.display="none",!0):(-1===a.className.indexOf("invalid")&&(a.className+=" invalid"),i.style.display="block",!1)},AgcAverageDailyGain=function(){function t(){this.socket="",this.tract="",this.mode="step",this.currentStep=0,this.cache={},this.submitted=!1,this.results={}}return t.prototype.render=function(){var t=this;return h("div",null,h("form",{onSubmit:function(t){return t.preventDefault()},ref:function(e){return t.form=e},"data-wizard":"agc-average-daily-gain","data-wizard-mode":this.mode,class:"agc-wizard"},h("slot",null),h("section",{"data-wizard-section":"1"},h("div",{class:"agc-wizard__field"},h("label",{"data-i18n":"fields.start-weight"},"Start Weight"),h("input",{name:"startWeight",type:"text",required:!0,min:"1"}),h("p",{class:"agc-wizard__validation-message","data-i18n":"validation.start-weight.required","data-validates":"startWeight"},"Please enter a valid weight."),h("p",{"data-i18n":"hints.start-weight"},"⮤ Enter the starting weight of the animal.")),h("div",{class:"agc-wizard__actions"},"step"===this.mode&&[h("button",{class:"agc-wizard__actions-back","data-i18n":"actions.back",onClick:this.nextPrev.bind(this,-1)},"🠔 Back"),h("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next 🠖")])),h("section",{"data-wizard-section":"2"},h("div",{class:"agc-wizard__field"},h("label",{"data-i18n":"fields.end-weight"},"End Weight"),h("input",{name:"endWeight",type:"text",required:!0,min:"1"}),h("p",{class:"agc-wizard__validation-message","data-i18n":"validation.end-weight.required","data-validates":"endWeight"},"Please enter a valid weight."),h("p",{"data-i18n":"hints.end-weight"},"⮤ Enter the finish weight of the animal.")),h("div",{class:"agc-wizard__actions"},"step"===this.mode&&[h("button",{class:"agc-wizard__actions-back","data-i18n":"actions.back",onClick:this.nextPrev.bind(this,-1)},"🠔 Back"),h("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next 🠖")])),h("section",{"data-wizard-section":"3"},h("div",{class:"agc-wizard__field"},h("label",{"data-i18n":"fields.days-on-feed"},"Days on Feed"),h("input",{name:"daysOnFeed",type:"number",required:!0,min:"1"}),h("p",{class:"agc-wizard__validation-message","data-i18n":"validation.days-on-feed.required","data-validates":"daysOnFeed"},"Please enter a number."),h("p",{"data-i18n":"hints.days-on-feed"},"⮤ Enter the total number of days on feed.")),h("div",{class:"agc-wizard__actions"},"step"===this.mode&&h("button",{class:"agc-wizard__actions-back","data-i18n":"actions.back",onClick:this.nextPrev.bind(this,-1)},"🠔 Back"),h("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,"step"===this.mode?1:3)},"Calculate 🠖"))),h("section",{"data-wizard-results":!0},h("slot",{name:"results"}))))},t.prototype.showTab=function(t){"step"===this.mode&&(this.cache.sections[t].style.display="block"),this.socket&&this.agcStepChanged.emit({socket:this.socket,tract:this.tract,step:this.currentStep})},t.prototype.reset=function(){this.currentStep=0,this.submitted=!1,this.showTab(0)},t.prototype.validateForm=function(){var t=!0;return 0!==this.currentStep&&"full"!==this.mode||validate(this.form,"startWeight")||(t=!1),1!==this.currentStep&&"full"!==this.mode||validate(this.form,"endWeight")||(t=!1),2!==this.currentStep&&"full"!==this.mode||validate(this.form,"daysOnFeed")||(t=!1),t},t.prototype.nextPrev=function(t,e){if(e&&e.preventDefault(),"full"===this.mode){if(!this.validateForm())return!1}else if(1==t&&!this.validateForm())return!1;if("step"===this.mode&&(this.cache.sections[this.currentStep].style.display="none"),this.currentStep=this.currentStep+t,this.currentStep>=this.cache.sections.length)return this.submitted=!0,this.showResults.call(this),!1;this.showTab.call(this,this.currentStep)},t.prototype.showResults=function(){var t=parseFloat(this.form.querySelector('[name="startWeight"').value),e=parseFloat(this.form.querySelector('[name="endWeight"').value),a=parseFloat(this.form.querySelector('[name="daysOnFeed"').value),i=parseFloat((e-t).toFixed(2)),s=parseFloat((i/a).toFixed(2)),n={socket:this.socket,tract:this.tract,startWeight:t,endWeight:e,daysOnFeed:a,weightGain:i,averageDailyGain:s};this.socket&&this.agcCalculated.emit({socket:this.socket,tract:this.tract,results:Object.assign({},n)}),this.results=Object.assign({},n),this.cache.results.forEach(function(t){t.style.display="block"})},t.prototype.handleAction=function(t){"reset"===t.detail.action&&this.reset()},t.prototype.componentDidLoad=function(){var t=Array.from(this.form.querySelectorAll("[data-wizard-section]")).map(function(t){return t}).map(function(t){return t}),e=Array.from(this.form.querySelectorAll("[data-wizard-results]")).map(function(t){return t}).map(function(t){return t});this.cache=Object.assign({},this.cache,{sections:t,results:e}),window.document.addEventListener("agcAction",this.handleAction.bind(this)),this.showTab(0)},t.prototype.componentDidUnload=function(){window.document.removeEventListener("agcAction",this.handleAction)},Object.defineProperty(t,"is",{get:function(){return"agc-average-daily-gain"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{cache:{state:!0},currentStep:{state:!0},mode:{type:String,attr:"mode"},results:{state:!0},socket:{type:String,attr:"socket"},submitted:{state:!0},tract:{type:String,attr:"tract"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"agcCalculated",method:"agcCalculated",bubbles:!0,cancelable:!0,composed:!0},{name:"agcStepChanged",method:"agcStepChanged",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),t}();export{AgcAverageDailyGain};