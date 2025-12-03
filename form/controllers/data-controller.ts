import {
    FormData,
    SelectOption,
    TriggerVariable,
    Operator,
    CalculationType,
    CalculationBasis,
    ApplicableZone,
    Service,
    TriggerVariableTypeMapping,
    IDataController,
    DataControllerConfig
} from '../types/form-types';

export class DataController implements IDataController {
    private fallbackData: FormData;

    constructor(config?: DataControllerConfig) {
        this.fallbackData = config?.fallbackData || this.getDefaultFallbackData();
    }

    private getDefaultFallbackData(): FormData {
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
                { value: "MoreThan", label: "MoreThan" },
                { value: "LessThan", label: "LessThan" },
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
            ],
            services: [
                { value: "all", label: "All Services" },
                { value: "hermes_parcel_shop", label: "Hermes Parcel Shop Drop Off" },
                { value: "hermes_courier", label: "Hermes Courier Collection" },
                { value: "dpd_pickup", label: "DPD Pickup" },
                { value: "ups_standard", label: "UPS Standard" },
                { value: "fedex_ground", label: "FedEx Ground" },
                { value: "royal_mail_1st", label: "Royal Mail 1st Class" }
            ],
            triggerVariableTypes: {
                typeMapping: {
                    'ShipDate': 'date',
                    'Weight': 'numeric',
                    'PostCode': 'text',
                    'Girth': 'numeric',
                    'IsResidential': 'boolean',
                    'PackagesCount': 'numeric'
                },
                defaultType: 'default'
            }
        };
    }

    public async loadData(): Promise<FormData> {
        try {
            const [triggerVariablesData, operatorsData, calculationTypesData, calculationBasisData, applicableZonesData, servicesData, triggerVariableTypesData] = await Promise.all([
                this.loadJsonFile<any>('./data/trigger-variables.json'),
                this.loadJsonFile<any>('./data/operators.json'),
                this.loadJsonFile<any>('./data/calculation-types.json'),
                this.loadJsonFile<any>('./data/calculation-basis.json'),
                this.loadJsonFile<any>('./data/applicable-zones.json'),
                this.loadJsonFile<any>('./data/services.json'),
                this.loadJsonFile<TriggerVariableTypeMapping>('./data/trigger-variable-types.json')
            ]);

            // Extract data from different JSON structures
            const triggerVariables = triggerVariablesData.triggerVariables || triggerVariablesData;
            const operators = operatorsData.operators || operatorsData;
            const calculationTypes = calculationTypesData.calculationTypes || calculationTypesData;
            const calculationBasis = calculationBasisData.calculationBasis || calculationBasisData;
            const applicableZones = applicableZonesData.applicableZones || applicableZonesData;
            const services = servicesData.services || servicesData;

            return {
                triggerVariables,
                operators,
                calculationTypes,
                calculationBasis,
                applicableZones,
                services,
                triggerVariableTypes: triggerVariableTypesData
            };
        } catch (error) {
            console.error('Error loading data:', error);
            return this.fallbackData;
        }
    }

    private async loadJsonFile<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    }

    public generateSelectOptions(options: SelectOption[]): string {
        if (!Array.isArray(options)) {
            console.warn('generateSelectOptions received non-array:', options);
            return '';
        }
        return options
            .map(option => `<option value="${this.escapeHtml(option.value)}">${this.escapeHtml(option.label)}</option>`)
            .join('');
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    public getFallbackData(): FormData {
        return { ...this.fallbackData };
    }

    // Metody pomocnicze dla konkretnych typów danych
    public getTriggerVariables(): Promise<TriggerVariable[]> {
        return this.loadData().then(data => data.triggerVariables);
    }

    public getOperators(): Promise<Operator[]> {
        return this.loadData().then(data => data.operators);
    }

    public getCalculationTypes(): Promise<CalculationType[]> {
        return this.loadData().then(data => data.calculationTypes);
    }

    public getCalculationBasis(): Promise<CalculationBasis[]> {
        return this.loadData().then(data => data.calculationBasis);
    }

    public getApplicableZones(): Promise<ApplicableZone[]> {
        return this.loadData().then(data => data.applicableZones);
    }

    public getServices(): Promise<Service[]> {
        return this.loadData().then(data => data.services);
    }

    // Metoda do aktualizacji danych fallback
    public updateFallbackData(newData: Partial<FormData>): void {
        this.fallbackData = { ...this.fallbackData, ...newData };
    }

    // Metoda do walidacji struktury danych
    public validateDataStructure(data: unknown): data is FormData {
        if (!data || typeof data !== 'object') return false;
        
        const formData = data as Record<string, unknown>;
        
        const requiredFields = ['triggerVariables', 'operators', 'calculationTypes', 'calculationBasis', 'applicableZones', 'services'];
        
        return requiredFields.every(field => {
            const fieldData = formData[field];
            return Array.isArray(fieldData) &&
                   fieldData.every(item =>
                       typeof item === 'object' &&
                       item !== null &&
                       'value' in item &&
                       'label' in item &&
                       typeof (item as SelectOption).value === 'string' &&
                       typeof (item as SelectOption).label === 'string'
                   );
        });
    }
}