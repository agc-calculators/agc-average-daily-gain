/*! Built with http://stenciljs.com */
const{h:t}=window.AgcAverageDailyGain;class a{constructor(){this.socket="",this.ready=!1}render(){return t("section",{"data-wizard-results":!0,ref:t=>this.section=t},t("div",{style:{display:this.ready?"none":"block"}},t("slot",{name:"empty"})),t("div",{style:{display:this.ready?"block":"none"}},this.data&&t("ul",{class:"agc-results"},t("li",null,t("h2",{"data-i18n":"results.weight-gain"},"Total Weight Gain"),t("span",{class:"agc-results__value"},this.data.weightGain)),t("li",null,t("h2",{"data-i18n":"results.average-daily-gain"},"Average Daily Gain (ADG)"),t("span",{class:"agc-results__value"},this.data.averageDailyGain)))))}handleResults(t){t.detail.socket===this.socket&&(this.data=Object.assign({},t.detail.results),this.ready=!0)}componentDidLoad(){this.socket&&window.document.addEventListener("agcCalculated",this.handleResults.bind(this))}componentDidUnload(){window.document.removeEventListener("agcCalculated",this.handleResults)}static get is(){return"agc-average-daily-gain-results"}static get properties(){return{data:{state:!0},ready:{state:!0},socket:{type:String,attr:"socket"}}}}export{a as AgcAverageDailyGainResults};