class DataController {
    constructor() {
        this.data = {};
    }

    // Ładowanie danych z plików JSON
    async loadData() {
        try {
            const [triggerVariables, operators, calculationTypes, calculationBasis] = await Promise.all([
                this.fetchJSON('./data/trigger-variables.json'),
                this.fetchJSON('./data/operators.json'),
                this.fetchJSON('./data/calculation-types.json'),
                this.fetchJSON('./data/calculation-basis.json')
            ]);

            this.data = {
                triggerVariables: triggerVariables.triggerVariables,
                operators: operators.operators,
                calculationTypes: calculationTypes.calculationTypes,
                calculationBasis: calculationBasis.calculationBasis
            };

            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to static data
            this.loadFallbackData();
            return this.data;
        }
    }

    // Pobieranie JSON z pliku
    async fetchJSON(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    // Fallback data in case of loading error
    loadFallbackData() {
        this.data = {
            triggerVariables: [
                { value: "None", label: "None", selected: true },
                { value: "ShipDate", label: "ShipDate" },
                { value: "Weight", label: "Weight" },
                { value: "PostCode", label: "PostCode" },
                { value: "Girth", label: "Girth" },
                { value: "IsResidential", label: "IsResidential" },
                { value: "PackagesCount", label: "PackagesCount" }
            ],
            operators: {
                default: [{ value: "None", label: "None", selected: true }],
                numeric: [
                    { value: "None", label: "None" },
                    { value: "InRange", label: "InRange" },
                    { value: "MoreThen", label: "MoreThen" },
                    { value: "LessThen", label: "LessThen" },
                    { value: "Is", label: "Is" }
                ],
                text: [
                    { value: "None", label: "None" },
                    { value: "InList", label: "InList" },
                    { value: "Is", label: "Is" }
                ],
                boolean: [
                    { value: "None", label: "None" },
                    { value: "Is", label: "Is" }
                ],
                date: [
                    { value: "None", label: "None" },
                    { value: "InRange", label: "InRange" },
                    { value: "MoreThen", label: "MoreThen" },
                    { value: "LessThen", label: "LessThen" }
                ]
            },
            calculationTypes: [
                { value: "Fixed", label: "Fixed" },
                { value: "Percentage", label: "Percentage" },
                { value: "Linear", label: "Linear" }
            ],
            calculationBasis: [
                { value: "BasePrice", label: "BasePrice" },
                { value: "Subtotal", label: "Subtotal" }
            ]
        };
    }

    // Get trigger variables
    getTriggerVariables() {
        return this.data.triggerVariables || [];
    }

    // Get operators for given variable type
    getOperatorsForVariable(variableType) {
        const operators = this.data.operators;
        
        switch(variableType) {
            case 'Weight':
            case 'Girth':
            case 'PackagesCount':
                return operators.numeric || operators.default;
            case 'PostCode':
                return operators.text || operators.default;
            case 'IsResidential':
                return operators.boolean || operators.default;
            case 'ShipDate':
                return operators.date || operators.default;
            default:
                return operators.default || [];
        }
    }

    // Get calculation types
    getCalculationTypes() {
        return this.data.calculationTypes || [];
    }

    // Get calculation basis
    getCalculationBasis() {
        return this.data.calculationBasis || [];
    }

    // Get placeholder for trigger value based on variable type
    getPlaceholderForVariable(variableType) {
        const placeholders = {
            'Weight': 'np. 10 lub 5-15',
            'Girth': 'np. 10 lub 5-15',
            'PackagesCount': 'np. 10 lub 5-15',
            'PostCode': 'np. 00-001,00-002 lub 00-001',
            'IsResidential': 'true lub false',
            'ShipDate': 'YYYY-MM-DD lub YYYY-MM-DD:YYYY-MM-DD',
            'None': '-'
        };
        
        return placeholders[variableType] || '-';
    }

    // Generate HTML options for select
    generateSelectOptions(options, selectedValue = null) {
        return options.map(option => {
            const selected = selectedValue === option.value || option.selected ? 'selected' : '';
            return `<option value="${option.value}" ${selected}>${option.label}</option>`;
        }).join('');
    }
}

// Export for use in other files
window.DataController = DataController;