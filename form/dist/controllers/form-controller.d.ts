import { SurchargeRule, ValidationResult, FormElement, IFormController, IDataController, FormControllerConfig } from '../types/form-types.js';
export declare class FormController implements IFormController {
    dataController: IDataController;
    private nextRowId;
    private validationState;
    constructor(config: FormControllerConfig);
    init(): Promise<void>;
    private populateSelectOptions;
    private setupEventListeners;
    private initializeExistingRows;
    addRow(): void;
    private populateNewRowSelects;
    private generateRowTemplate;
    removeRow(rowId: number): void;
    private setupRowEventListeners;
    handleFieldDependencies(triggerVariable: HTMLSelectElement, operator: HTMLSelectElement, triggerValue: HTMLInputElement): void;
    validateField(field: FormElement): boolean;
    validate(): ValidationResult;
    execute(): SurchargeRule[];
    private getFieldValue;
    done(): void;
    private showMessage;
}
//# sourceMappingURL=form-controller.d.ts.map