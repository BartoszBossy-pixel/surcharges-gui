// Form data types and interfaces

export interface SelectOption {
  value: string;
  label: string;
}

export interface TriggerVariable extends SelectOption {}
export interface Operator extends SelectOption {}
export interface CalculationType extends SelectOption {}
export interface CalculationBasis extends SelectOption {}
export interface ApplicableZone extends SelectOption {}
export interface Service extends SelectOption {}

export interface TriggerVariableTypeMapping {
  typeMapping: Record<string, string>;
  defaultType: string;
}

export interface FormData {
  triggerVariables: TriggerVariable[];
  operators: Operator[];
  calculationTypes: CalculationType[];
  calculationBasis: CalculationBasis[];
  applicableZones: ApplicableZone[];
  services: Service[];
  triggerVariableTypes?: TriggerVariableTypeMapping;
}

export interface SurchargeRule {
    service: string | string[]; // Support both single string and array for multi-select
    zones: string | string[]; // Support both single string and array for multi-select
    surcharge_code: string;
    surcharge_name: string;
    trigger_variable: string;
    operator: string;
    trigger_value: string;
    calculation_type: string;
    calculation_basis: string;
    rate_base: number;
    offset: number;
    multiplier: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FormValidationState {
  [fieldName: string]: {
    isValid: boolean;
    errorMessage: string;
  };
}

export interface DataControllerConfig {
  fallbackData: FormData;
}

export interface FormControllerConfig {
  dataController: IDataController;
}

export interface IDataController {
  loadData(): Promise<FormData>;
  generateSelectOptions(options: SelectOption[]): string;
  getFallbackData(): FormData;
}

// Output format types
export interface OutputSurcharge {
  surcharge_key: string;
  name: string;
  expression: string;
  appliesTo_zones: string[];
}

export interface ServiceGroupedSurcharges {
  [serviceName: string]: OutputSurcharge[];
}

export interface IFormController {
  dataController: IDataController;
  init(): Promise<void>;
  addRow(): void;
  removeRow(rowId: number): void;
  validate(): ValidationResult;
  execute(): SurchargeRule[];
  convertToOutputFormat(rules: SurchargeRule[]): ServiceGroupedSurcharges;
  done(): void;
  validateField(field: HTMLElement): boolean;
  handleFieldDependencies(triggerVariable: HTMLSelectElement, operator: HTMLSelectElement, triggerValue: HTMLInputElement): void;
}

// DOM element types
export type FormElement = HTMLInputElement | HTMLSelectElement;
export type FormRow = HTMLElement & { dataset: { rowId: string } };

// Event handler types
export type FieldChangeHandler = (event: Event) => void;
export type FormSubmitHandler = (event: Event) => void;

// Utility types
export type RequiredFields = 'service' | 'surcharge_code' | 'surcharge_name' | 'calculation_type' | 'calculation_basis' | 'rate_base';
export type OptionalFields = 'zones' | 'trigger_variable' | 'operator' | 'trigger_value' | 'offset' | 'multiplier';

export type SurchargeRuleField = RequiredFields | OptionalFields;