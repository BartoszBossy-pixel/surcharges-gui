export class DataController {
    constructor(config) {
        this.fallbackData = config?.fallbackData || this.getDefaultFallbackData();
    }
    getDefaultFallbackData() {
        return {
            triggerVariables: [
                { value: "None", label: "None" },
                { value: "ShipDate", label: "ShipDate" },
                { value: "Weight", label: "Weight" },
                { value: "PostCode", label: "PostCode" },
                { value: "Girth", label: "Girth" },
                { value: "IsResidential", label: "IsResidential" },
                { value: "PackagesCount", label: "PackagesCount" }
            ],
            operators: [
                { value: "None", label: "None" },
                { value: "InRange", label: "InRange" },
                { value: "MoreThen", label: "MoreThen" },
                { value: "LessThen", label: "LessThen" },
                { value: "InList", label: "InList" },
                { value: "Is", label: "Is" }
            ],
            calculationTypes: [
                { value: "Fixed", label: "Fixed" },
                { value: "Percentage", label: "Percentage" },
                { value: "Linear", label: "Linear" }
            ],
            calculationBasis: [
                { value: "BasePrice", label: "BasePrice" },
                { value: "Subtotal", label: "Subtotal" }
            ],
            applicableZones: [
                { value: "-", label: "All Zones" },
                { value: "domestic", label: "Domestic" },
                { value: "international", label: "International" },
                { value: "europe", label: "Europe" },
                { value: "zone_1", label: "Zone 1" },
                { value: "zone_2", label: "Zone 2" }
            ]
        };
    }
    async loadData() {
        try {
            const [triggerVariables, operators, calculationTypes, calculationBasis, applicableZones] = await Promise.all([
                this.loadJsonFile('./data/trigger-variables.json'),
                this.loadJsonFile('./data/operators.json'),
                this.loadJsonFile('./data/calculation-types.json'),
                this.loadJsonFile('./data/calculation-basis.json'),
                this.loadJsonFile('./data/applicable-zones.json')
            ]);
            return {
                triggerVariables,
                operators,
                calculationTypes,
                calculationBasis,
                applicableZones
            };
        }
        catch (error) {
            console.error('Error loading data:', error);
            return this.fallbackData;
        }
    }
    async loadJsonFile(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.json();
    }
    generateSelectOptions(options) {
        return options
            .map(option => `<option value="${this.escapeHtml(option.value)}">${this.escapeHtml(option.label)}</option>`)
            .join('');
    }
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    getFallbackData() {
        return { ...this.fallbackData };
    }
    // Metody pomocnicze dla konkretnych typów danych
    getTriggerVariables() {
        return this.loadData().then(data => data.triggerVariables);
    }
    getOperators() {
        return this.loadData().then(data => data.operators);
    }
    getCalculationTypes() {
        return this.loadData().then(data => data.calculationTypes);
    }
    getCalculationBasis() {
        return this.loadData().then(data => data.calculationBasis);
    }
    getApplicableZones() {
        return this.loadData().then(data => data.applicableZones);
    }
    // Metoda do aktualizacji danych fallback
    updateFallbackData(newData) {
        this.fallbackData = { ...this.fallbackData, ...newData };
    }
    // Metoda do walidacji struktury danych
    validateDataStructure(data) {
        if (!data || typeof data !== 'object')
            return false;
        const formData = data;
        const requiredFields = ['triggerVariables', 'operators', 'calculationTypes', 'calculationBasis', 'applicableZones'];
        return requiredFields.every(field => {
            const fieldData = formData[field];
            return Array.isArray(fieldData) &&
                fieldData.every(item => typeof item === 'object' &&
                    item !== null &&
                    'value' in item &&
                    'label' in item &&
                    typeof item.value === 'string' &&
                    typeof item.label === 'string');
        });
    }
}
//# sourceMappingURL=data-controller.js.map