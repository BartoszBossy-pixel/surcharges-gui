import {
    SurchargeRule,
    ValidationResult,
    FormValidationState,
    FormElement,
    FormRow,
    IFormController,
    IDataController,
    FormControllerConfig,
    FormData,
    SelectOption,
    OutputSurcharge,
    ServiceGroupedSurcharges
} from '../types/form-types';

export class FormController implements IFormController {
    public dataController: IDataController;
    private nextRowId: number = 3;
    private validationState: FormValidationState = {};
    private rowTemplate: string = '';

    constructor(config: FormControllerConfig) {
        this.dataController = config.dataController;
    }

    public async init(): Promise<void> {
        try {
            // Load row template
            await this.loadRowTemplate();
            
            const data = await this.dataController.loadData();
            await this.populateSelectOptions(data);
            this.setupEventListeners();
            this.initializeExistingRows();
            console.log('Form controller initialized successfully');
        } catch (error) {
            console.error('Error initializing form controller:', error);
            // Fallback to default data
            const fallbackData = this.dataController.getFallbackData();
            await this.populateSelectOptions(fallbackData);
            this.setupEventListeners();
            this.initializeExistingRows();
        }
    }

    private async loadRowTemplate(): Promise<void> {
        try {
            const response = await fetch('./templates/row-template.html');
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.statusText}`);
            }
            this.rowTemplate = await response.text();
        } catch (error) {
            console.error('Error loading row template:', error);
            // Fallback to inline template
            this.rowTemplate = this.getInlineRowTemplate();
        }
    }

    private async populateSelectOptions(data: FormData): Promise<void> {
        // Populate services (multiselect)
        const serviceContainers = document.querySelectorAll<HTMLElement>('.services');
        serviceContainers.forEach(container => {
            this.populateMultiselect(container, data.services);
        });

        // Populate applicable zones (multiselect)
        const applicableZoneContainers = document.querySelectorAll<HTMLElement>('.applicable-zones');
        applicableZoneContainers.forEach(container => {
            this.populateMultiselect(container, data.applicableZones);
        });

        // Populate trigger variables
        const triggerVariableSelects = document.querySelectorAll<HTMLSelectElement>('.trigger-variable');
        triggerVariableSelects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = this.dataController.generateSelectOptions(data.triggerVariables);
            if (currentValue) {
                select.value = currentValue;
            }
            
            // Re-setup field dependencies after populating options
            const row = select.closest<FormRow>('[data-row-id]');
            if (row) {
                // Re-setup all event listeners for this row after data population
                this.setupRowEventListeners(row);
            }
        });

        // Populate operators
        const operatorSelects = document.querySelectorAll<HTMLSelectElement>('.operator');
        operatorSelects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = this.dataController.generateSelectOptions(data.operators);
            if (currentValue) {
                select.value = currentValue;
            }
        });

        // Populate calculation types
        const calculationTypeSelects = document.querySelectorAll<HTMLSelectElement>('select[name="calculation_type"]');
        calculationTypeSelects.forEach(select => {
            const currentValue = select.value;
            const optionsHtml = '<option value="">Select...</option>' +
                               this.dataController.generateSelectOptions(data.calculationTypes);
            select.innerHTML = optionsHtml;
            if (currentValue) {
                select.value = currentValue;
            }
        });

        // Populate calculation basis
        const calculationBasisSelects = document.querySelectorAll<HTMLSelectElement>('select[name="calculation_basis"]');
        calculationBasisSelects.forEach(select => {
            const currentValue = select.value;
            const optionsHtml = '<option value="">Select...</option>' +
                               this.dataController.generateSelectOptions(data.calculationBasis);
            select.innerHTML = optionsHtml;
            if (currentValue) {
                select.value = currentValue;
            }
        });
    }

    private populateMultiselect(container: HTMLElement, options: SelectOption[]): void {
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        if (!dropdown) return;

        const fieldName = container.dataset.name || 'zones';
        const rowId = container.closest<HTMLElement>('[data-row-id]')?.dataset.rowId || '1';
        
        dropdown.innerHTML = '';
        
        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'multiselect-option';
            optionDiv.dataset.value = option.value;
            
            const checkboxId = `${fieldName}-${option.value}-${rowId}`;
            const isChecked = option.value === 'all' || option.value === '-'; // Default to "All Zones"
            
            optionDiv.innerHTML = `
                <input type="checkbox" id="${checkboxId}" ${isChecked ? 'checked' : ''}>
                <label for="${checkboxId}">${option.label}</label>
            `;
            
            dropdown.appendChild(optionDiv);
        });
        
        this.setupMultiselectEventListeners(container);
        this.updateMultiselectDisplay(container);
    }

    private setupMultiselectEventListeners(container: HTMLElement): void {
        const display = container.querySelector<HTMLElement>('.multiselect-display');
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        
        if (!display || !dropdown) return;

        // Toggle dropdown on display click
        display.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMultiselectDropdown(container);
        });

        // Handle checkbox changes
        const checkboxes = dropdown.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.handleMultiselectChange(container);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target as Node)) {
                this.closeMultiselectDropdown(container);
            }
        });

        // Update dropdown position on scroll
        const updateDropdownPosition = () => {
            const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
            if (dropdown && dropdown.classList.contains('show')) {
                const display = container.querySelector<HTMLElement>('.multiselect-display');
                if (display) {
                    const rect = display.getBoundingClientRect();
                    dropdown.style.top = `${rect.bottom}px`;
                    dropdown.style.left = `${rect.left}px`;
                    dropdown.style.width = `${rect.width}px`;
                }
            }
        };

        window.addEventListener('scroll', updateDropdownPosition);
        window.addEventListener('resize', updateDropdownPosition);
    }

    private toggleMultiselectDropdown(container: HTMLElement): void {
        const display = container.querySelector<HTMLElement>('.multiselect-display');
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        
        if (!display || !dropdown) return;

        const isOpen = dropdown.classList.contains('show');
        
        if (isOpen) {
            this.closeMultiselectDropdown(container);
        } else {
            this.openMultiselectDropdown(container);
        }
    }

    private openMultiselectDropdown(container: HTMLElement): void {
        const display = container.querySelector<HTMLElement>('.multiselect-display');
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        
        if (!display || !dropdown) return;

        // Calculate position for fixed positioning
        const rect = display.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.width = `${rect.width}px`;

        display.classList.add('active');
        dropdown.classList.add('show');
    }

    private closeMultiselectDropdown(container: HTMLElement): void {
        const display = container.querySelector<HTMLElement>('.multiselect-display');
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        
        if (!display || !dropdown) return;

        display.classList.remove('active');
        dropdown.classList.remove('show');
    }

    private handleMultiselectChange(container: HTMLElement): void {
        this.updateMultiselectDisplay(container);
        // Trigger validation if needed
        this.validateMultiselect(container);
    }

    private updateMultiselectDisplay(container: HTMLElement): void {
        const textElement = container.querySelector<HTMLElement>('.multiselect-text');
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        
        if (!textElement || !dropdown) return;

        const checkedOptions = dropdown.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
        const selectedValues: string[] = [];
        const selectedTexts: string[] = [];

        checkedOptions.forEach(checkbox => {
            const option = checkbox.closest<HTMLElement>('.multiselect-option');
            if (option) {
                const value = option.dataset.value ?? '';
                const label = option.querySelector<HTMLLabelElement>('label')?.textContent || '';
                selectedValues.push(value);
                selectedTexts.push(label);
            }
        });

        if (selectedTexts.length === 0) {
            const fieldName = container.dataset.name || 'zones';
            const placeholder = fieldName === 'service' ? 'Select services...' : 'Select zones...';
            textElement.textContent = placeholder;
            textElement.className = 'multiselect-text';
        } else if (selectedTexts.length === 1) {
            textElement.textContent = selectedTexts[0] || '';
            textElement.className = 'multiselect-text';
        } else {
            // Show multiple selection as tags
            textElement.innerHTML = '';
            textElement.className = 'multiselect-text multiple';
            
            selectedTexts.forEach((text, index) => {
                if (index < 2) { // Show max 2 tags
                    const tag = document.createElement('span');
                    tag.className = 'multiselect-tag';
                    tag.innerHTML = `
                        <span class="multiselect-tag-text">${text}</span>
                        <span class="multiselect-tag-remove" data-value="${selectedValues[index]}">×</span>
                    `;
                    textElement.appendChild(tag);
                    
                    // Add remove functionality
                    const removeBtn = tag.querySelector<HTMLElement>('.multiselect-tag-remove');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.removeMultiselectOption(container, removeBtn.dataset.value ?? '');
                        });
                    }
                }
            });
            
            if (selectedTexts.length > 2) {
                const moreTag = document.createElement('span');
                moreTag.className = 'multiselect-tag';
                moreTag.textContent = `+${selectedTexts.length - 2} more`;
                textElement.appendChild(moreTag);
            }
        }
    }

    private removeMultiselectOption(container: HTMLElement, value: string): void {
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        if (!dropdown) return;

        const option = dropdown.querySelector<HTMLElement>(`[data-value="${value}"]`);
        const checkbox = option?.querySelector<HTMLInputElement>('input[type="checkbox"]');
        
        if (checkbox) {
            checkbox.checked = false;
            this.handleMultiselectChange(container);
        }
    }

    private validateMultiselect(container: HTMLElement): boolean {
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        const errorDiv = container.parentElement?.querySelector<HTMLElement>('.error-message');
        
        if (!dropdown) return true;

        const checkedOptions = dropdown.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
        const isValid = checkedOptions.length > 0;

        if (isValid) {
            container.classList.remove('error');
            container.classList.add('valid');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        } else {
            container.classList.remove('valid');
            container.classList.add('error');
            if (errorDiv) {
                const fieldName = container.dataset.name || 'zones';
                const errorText = fieldName === 'service' ? 'Please select at least one service' : 'Please select at least one zone';
                errorDiv.textContent = errorText;
                errorDiv.style.display = 'block';
            }
        }

        return isValid;
    }

    private getMultiselectValues(container: HTMLElement): string[] {
        const dropdown = container.querySelector<HTMLElement>('.multiselect-dropdown');
        if (!dropdown) return [];

        const checkedOptions = dropdown.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
        const values: string[] = [];

        checkedOptions.forEach(checkbox => {
            const option = checkbox.closest<HTMLElement>('.multiselect-option');
            if (option && option.dataset.value) {
                values.push(option.dataset.value);
            }
        });

        return values;
    }

    private setupEventListeners(): void {
        // Add row button
        const addButton = document.querySelector<HTMLButtonElement>('.add-row-btn');
        if (addButton) {
            addButton.addEventListener('click', () => this.addRow());
        }

        // Save button
        const saveButton = document.querySelector<HTMLButtonElement>('.save-all-btn');
        if (saveButton) {
            saveButton.addEventListener('click', () => this.done());
        }
    }

    private initializeExistingRows(): void {
        const existingRows = document.querySelectorAll<FormRow>('[data-row-id]');
        existingRows.forEach(row => {
            this.setupRowEventListeners(row);
        });
    }

    public addRow(): void {
        const tableBody = document.querySelector<HTMLElement>('.property-table');
        if (!tableBody) {
            console.error('Table body not found');
            return;
        }

        const rowId = this.nextRowId++;
        const newRowHtml = this.generateRowTemplate(rowId);
        
        // Insert before the last row (which contains the buttons)
        const lastRow = tableBody.lastElementChild;
        if (lastRow) {
            lastRow.insertAdjacentHTML('beforebegin', newRowHtml);
        } else {
            tableBody.insertAdjacentHTML('beforeend', newRowHtml);
        }

        // Setup event listeners for the new row
        const newRow = document.querySelector<FormRow>(`[data-row-id="${rowId}"]`);
        if (newRow) {
            this.setupRowEventListeners(newRow);
            
            // Populate select options for the new row
            this.dataController.loadData().then(data => {
                this.populateNewRowSelects(newRow, data);
            }).catch(error => {
                console.error('Error loading data for new row:', error);
                const fallbackData = this.dataController.getFallbackData();
                this.populateNewRowSelects(newRow, fallbackData);
            });
        }
    }

    private populateNewRowSelects(row: FormRow, data: FormData): void {
        // Populate services multiselect
        const servicesContainer = row.querySelector<HTMLElement>('.services');
        if (servicesContainer) {
            this.populateMultiselect(servicesContainer, data.services);
        }

        // Populate applicable zones multiselect
        const applicableZonesContainer = row.querySelector<HTMLElement>('.applicable-zones');
        if (applicableZonesContainer) {
            this.populateMultiselect(applicableZonesContainer, data.applicableZones);
        }

        const triggerVariableSelect = row.querySelector<HTMLSelectElement>('.trigger-variable');
        const operatorSelect = row.querySelector<HTMLSelectElement>('.operator');
        const triggerValue = row.querySelector<HTMLInputElement>('.trigger-value');
        const calculationTypeSelect = row.querySelector<HTMLSelectElement>('select[name="calculation_type"]');
        const calculationBasisSelect = row.querySelector<HTMLSelectElement>('select[name="calculation_basis"]');

        if (triggerVariableSelect) {
            triggerVariableSelect.innerHTML = this.dataController.generateSelectOptions(data.triggerVariables);
            
            // Setup field dependencies for new row
            if (operatorSelect && triggerValue) {
                triggerVariableSelect.addEventListener('change', () => {
                    this.handleFieldDependencies(triggerVariableSelect, operatorSelect, triggerValue).catch(console.error);
                });
                
                // Trigger initial dependency setup
                this.handleFieldDependencies(triggerVariableSelect, operatorSelect, triggerValue).catch(console.error);
            }
        }
        if (operatorSelect) {
            operatorSelect.innerHTML = this.dataController.generateSelectOptions(data.operators);
        }
        if (calculationTypeSelect) {
            calculationTypeSelect.innerHTML = '<option value="">Select...</option>' + 
                                            this.dataController.generateSelectOptions(data.calculationTypes);
        }
        if (calculationBasisSelect) {
            calculationBasisSelect.innerHTML = '<option value="">Select...</option>' + 
                                             this.dataController.generateSelectOptions(data.calculationBasis);
        }
    }

    private generateRowTemplate(rowId: number): string {
        return this.rowTemplate.replace(/\{\{rowId\}\}/g, rowId.toString());
    }

    private getInlineRowTemplate(): string {
        return `
        <div class="row" data-row-id="{{rowId}}">
            <div class="multiselect-wrapper">
                <div class="multiselect-container services" data-name="service">
                    <div class="multiselect-display">
                        <span class="multiselect-text">Select services...</span>
                        <span class="multiselect-arrow">▼</span>
                    </div>
                    <div class="multiselect-dropdown">
                        <!-- Options will be populated by JavaScript -->
                    </div>
                </div>
                <div class="error-message">This field is required</div>
            </div>
            <div class="multiselect-wrapper">
                <div class="multiselect-container applicable-zones" data-name="zones">
                    <div class="multiselect-display">
                        <span class="multiselect-text">Select zones...</span>
                        <span class="multiselect-arrow">▼</span>
                    </div>
                    <div class="multiselect-dropdown">
                        <!-- Options will be populated by JavaScript -->
                    </div>
                </div>
                <div class="error-message"></div>
            </div>
            <div>
                <input type="text" class="form-control" name="surcharge_code" required>
                <div class="error-message">This field is required</div>
            </div>
            <div>
                <input type="text" class="form-control" name="surcharge_name" required>
                <div class="error-message">This field is required</div>
            </div>
            <div class="select-wrapper">
                <select class="form-control trigger-variable" name="trigger_variable">
                    <option value="None" selected>None</option>
                </select>
                <div class="error-message"></div>
            </div>
            <div class="select-wrapper">
                <select class="form-control operator" name="operator">
                    <option value="None" selected>None</option>
                </select>
                <div class="error-message"></div>
            </div>
            <div>
                <input type="text" class="form-control trigger-value" name="trigger_value" value="-" disabled>
                <div class="error-message"></div>
            </div>
            <div class="select-wrapper">
                <select class="form-control" name="calculation_type" required>
                    <option value="">Select...</option>
                </select>
                <div class="error-message">This field is required</div>
            </div>
            <div class="select-wrapper">
                <select class="form-control" name="calculation_basis" required>
                    <option value="">Select...</option>
                </select>
                <div class="error-message">This field is required</div>
            </div>
            <div>
                <input type="number" class="form-control" name="rate_base" step="0.01" min="0" required>
                <div class="error-message">Value must be greater than or equal to 0</div>
            </div>
            <div>
                <input type="number" class="form-control" name="offset" value="0" step="1">
                <div class="error-message"></div>
            </div>
            <div>
                <input type="number" class="form-control" name="multiplier" value="0" step="1">
                <div class="error-message"></div>
            </div>
            <div class="row-actions">
                <button type="button" class="remove-row-btn" onclick="formController.removeRow({{rowId}})">
                    ✕
                </button>
            </div>
        </div>
        `;
    }

    public removeRow(rowId: number): void {
        const row = document.querySelector<FormRow>(`[data-row-id="${rowId}"]`);
        if (row) {
            const allRows = document.querySelectorAll<FormRow>('[data-row-id]');
            if (allRows.length > 1) {
                row.remove();
                // Clean up validation state
                delete this.validationState[`row-${rowId}`];
            } else {
                alert('Cannot remove the last row!');
            }
        }
    }

    private setupRowEventListeners(row: FormRow): void {
        const triggerVariable = row.querySelector<HTMLSelectElement>('.trigger-variable');
        const operator = row.querySelector<HTMLSelectElement>('.operator');
        const triggerValue = row.querySelector<HTMLInputElement>('.trigger-value');
        
        // Event listener for trigger variable
        if (triggerVariable && operator && triggerValue) {
            // Remove existing listener if any to avoid duplicates
            const existingHandler = (triggerVariable as any)._dependencyHandler;
            if (existingHandler) {
                triggerVariable.removeEventListener('change', existingHandler);
            }
            
            // Create new handler and store reference
            const newHandler = () => {
                this.handleFieldDependencies(triggerVariable, operator, triggerValue).catch(console.error);
            };
            (triggerVariable as any)._dependencyHandler = newHandler;
            
            triggerVariable.addEventListener('change', newHandler);
            
            // Trigger initial setup
            this.handleFieldDependencies(triggerVariable, operator, triggerValue).catch(console.error);
        }
        
        // Event listeners for validation
        const fields = row.querySelectorAll<FormElement>('.form-control');
        fields.forEach(field => {
            // Skip if already has listeners
            if ((field as any)._hasValidationListeners) return;
            
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
            
            // Mark as having listeners
            (field as any)._hasValidationListeners = true;
        });
    }

    public async handleFieldDependencies(
        triggerVariable: HTMLSelectElement,
        operator: HTMLSelectElement,
        triggerValue: HTMLInputElement
    ): Promise<void> {
        const triggerVarValue = triggerVariable.value;
        
        if (triggerVarValue === 'None') {
            // Reset operator and disable trigger value
            operator.value = 'None';
            triggerValue.value = '-';
            triggerValue.disabled = true;
            operator.disabled = false;
            
            // Load default operators synchronously
            await this.loadOperatorsForTriggerVariable('default', operator);
        } else {
            // Enable operator selection
            operator.disabled = false;
            
            // Load appropriate operators based on trigger variable type
            const operatorType = await this.getOperatorTypeForTriggerVariable(triggerVarValue);
            await this.loadOperatorsForTriggerVariable(operatorType, operator);
            
            // Handle operator change
            const handleOperatorChange = () => {
                const operatorValue = operator.value;
                if (operatorValue === 'None') {
                    triggerValue.value = '-';
                    triggerValue.disabled = true;
                } else {
                    triggerValue.disabled = false;
                    if (triggerValue.value === '-') {
                        triggerValue.value = '';
                    }
                }
            };
            
            // Remove existing listener and add new one
            const existingHandler = (operator as any)._operatorChangeHandler;
            if (existingHandler) {
                operator.removeEventListener('change', existingHandler);
            }
            (operator as any)._operatorChangeHandler = handleOperatorChange;
            operator.addEventListener('change', handleOperatorChange);
            
            // Trigger initial operator change
            handleOperatorChange();
        }
    }

    private async getOperatorTypeForTriggerVariable(triggerVar: string): Promise<string> {
        try {
            const data = await this.dataController.loadData();
            
            if (data.triggerVariableTypes) {
                const typeMapping = data.triggerVariableTypes.typeMapping;
                const defaultType = data.triggerVariableTypes.defaultType;
                
                return typeMapping[triggerVar] || defaultType;
            }
            
            // Fallback to default if no type mapping is available
            return 'default';
        } catch (error) {
            console.error('Error loading trigger variable types:', error);
            return 'default';
        }
    }

    private async loadOperatorsForTriggerVariable(operatorType: string, operatorSelect: HTMLSelectElement): Promise<void> {
        try {
            const data = await this.dataController.loadData();
            
            // Debug log to see what we're getting
            console.log('Loading operators for type:', operatorType);
            console.log('Available operators data:', data.operators);
            
            // Get operators for the specific type from the JSON structure
            let operators: any[] = [];
            
            if (data.operators && typeof data.operators === 'object') {
                const operatorsData = data.operators as any;
                
                // Check if we have the nested structure with "operators" key
                if (operatorsData.operators && typeof operatorsData.operators === 'object') {
                    // Structure: { "operators": { "default": [...], "numeric": [...], ... } }
                    const operatorsByType = operatorsData.operators;
                    if (operatorsByType[operatorType] && Array.isArray(operatorsByType[operatorType])) {
                        operators = operatorsByType[operatorType];
                    } else if (operatorsByType.default && Array.isArray(operatorsByType.default)) {
                        operators = operatorsByType.default;
                    }
                }
                // Check if we have direct structure
                else if (operatorsData[operatorType] && Array.isArray(operatorsData[operatorType])) {
                    // Structure: { "default": [...], "numeric": [...], ... }
                    operators = operatorsData[operatorType];
                } else if (operatorsData.default && Array.isArray(operatorsData.default)) {
                    operators = operatorsData.default;
                }
            } else if (Array.isArray(data.operators)) {
                // If it's already an array, use it directly
                operators = data.operators;
            }
            
            console.log('Selected operators for', operatorType, ':', operators);
            
            if (operators.length === 0) {
                console.warn('No operators found for type:', operatorType, 'falling back to default');
                // Try to get default operators as fallback
                const operatorsData = data.operators as any;
                if (operatorsData?.operators?.default) {
                    operators = operatorsData.operators.default;
                } else if (operatorsData?.default) {
                    operators = operatorsData.default;
                }
            }
            
            const currentValue = operatorSelect.value;
            operatorSelect.innerHTML = this.dataController.generateSelectOptions(operators);
            
            // Try to restore previous value if it exists in new options
            if (currentValue && currentValue !== 'None' && operatorSelect.querySelector(`option[value="${currentValue}"]`)) {
                operatorSelect.value = currentValue;
            } else {
                // Default to 'None' if previous value doesn't exist
                operatorSelect.value = 'None';
            }
        } catch (error) {
            console.error('Error loading operators:', error);
            // Fallback to default operators
            const fallbackData = this.dataController.getFallbackData();
            const currentValue = operatorSelect.value;
            operatorSelect.innerHTML = this.dataController.generateSelectOptions(fallbackData.operators);
            if (currentValue) {
                operatorSelect.value = currentValue;
            }
        }
    }

    public validateField(field: FormElement): boolean {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const fieldType = field.type;
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (isRequired && !fieldValue) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Number field validation
        else if (fieldType === 'number' && fieldValue) {
            const numValue = parseFloat(fieldValue);
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            
            if (isNaN(numValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid number';
            } else if (min !== null && numValue < parseFloat(min)) {
                isValid = false;
                errorMessage = `Value must be greater than or equal to ${min}`;
            } else if (max !== null && numValue > parseFloat(max)) {
                isValid = false;
                errorMessage = `Value must be less than or equal to ${max}`;
            }
        }

        // Update field appearance
        const errorDiv = field.parentElement?.querySelector<HTMLElement>('.error-message');
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            if (errorDiv) {
                errorDiv.textContent = errorMessage;
                errorDiv.style.display = 'block';
            }
        }

        // Update validation state
        const rowElement = field.closest<FormRow>('[data-row-id]');
        const rowId = rowElement?.dataset.rowId || 'unknown';
        const stateKey = `${rowId}-${fieldName}`;
        
        this.validationState[stateKey] = {
            isValid,
            errorMessage
        };

        return isValid;
    }

    public validate(): ValidationResult {
        const errors: string[] = [];
        const allFields = document.querySelectorAll<FormElement>('.form-control');
        
        let allValid = true;
        allFields.forEach(field => {
            const fieldValid = this.validateField(field);
            if (!fieldValid) {
                allValid = false;
            }
        });

        // Validate multiselect components
        const multiselectContainers = document.querySelectorAll<HTMLElement>('.multiselect-container');
        multiselectContainers.forEach(container => {
            const multiselectValid = this.validateMultiselect(container);
            if (!multiselectValid) {
                allValid = false;
            }
        });

        // Collect all error messages
        Object.values(this.validationState).forEach(state => {
            if (!state.isValid && state.errorMessage) {
                errors.push(state.errorMessage);
            }
        });

        return {
            isValid: allValid,
            errors: [...new Set(errors)] // Remove duplicates
        };
    }

    public execute(): SurchargeRule[] {
        const rows = document.querySelectorAll<FormRow>('[data-row-id]');
        const rules: SurchargeRule[] = [];

        rows.forEach(row => {
            // Get services from multiselect
            const servicesContainer = row.querySelector<HTMLElement>('.services');
            const services = servicesContainer ? this.getMultiselectValues(servicesContainer) : [];
            
            // Get zones from multiselect
            const zonesContainer = row.querySelector<HTMLElement>('.applicable-zones');
            const zones = zonesContainer ? this.getMultiselectValues(zonesContainer) : [];
            
            const rule: SurchargeRule = {
                service: services.length > 0 ? services : ['all'], // Default to 'all' if none selected
                zones: zones.length > 0 ? zones : ['all'], // Default to 'all' if none selected
                surcharge_code: this.getFieldValue(row, 'surcharge_code'),
                surcharge_name: this.getFieldValue(row, 'surcharge_name'),
                trigger_variable: this.getFieldValue(row, 'trigger_variable'),
                operator: this.getFieldValue(row, 'operator'),
                trigger_value: this.getFieldValue(row, 'trigger_value'),
                calculation_type: this.getFieldValue(row, 'calculation_type'),
                calculation_basis: this.getFieldValue(row, 'calculation_basis'),
                rate_base: parseFloat(this.getFieldValue(row, 'rate_base')) || 0,
                offset: parseInt(this.getFieldValue(row, 'offset')) || 0,
                multiplier: parseInt(this.getFieldValue(row, 'multiplier')) || 0
            };
            
            rules.push(rule);
        });

        return rules;
    }

    private getFieldValue(row: FormRow, fieldName: string): string {
        const field = row.querySelector<FormElement>(`[name="${fieldName}"]`);
        return field?.value || '';
    }

    public convertToOutputFormat(rules: SurchargeRule[]): ServiceGroupedSurcharges {
        const serviceGroupedSurcharges: ServiceGroupedSurcharges = {};

        rules.forEach(rule => {
            // Handle services - convert to array if it's a string
            const services = Array.isArray(rule.service) ? rule.service : [rule.service];
            
            // Handle zones - convert to array if it's a string, filter out empty/dash values
            let zones: string[] = [];
            if (Array.isArray(rule.zones)) {
                zones = rule.zones.filter(zone => zone && zone !== '-' && zone.trim() !== '');
            } else if (rule.zones && rule.zones !== '-' && rule.zones.trim() !== '') {
                zones = [rule.zones];
            }

            // Build expression parts
            const expressionParts: string[] = [];
            
            // Add trigger condition if present
            if (rule.trigger_variable && rule.trigger_variable !== 'None' &&
                rule.operator && rule.operator !== 'None' &&
                rule.trigger_value && rule.trigger_value !== '-') {
                expressionParts.push(`IF ${rule.trigger_variable} ${rule.operator} '${rule.trigger_value}'`);
            }

            // Build calculation expression
            let calculationExpression = '';
            const calcType = rule.calculation_type;
            const calcBasis = rule.calculation_basis;
            const rateBase = rule.rate_base;
            const offset = rule.offset || 0;
            const multiplier = rule.multiplier || 0;

            if (calcType === 'Linear') {
                calculationExpression = `Linear(Basis=${calcBasis}, Base=${rateBase}, Offset=${offset}, Multiplier=${multiplier})`;
            } else if (calcType === 'Percentage') {
                calculationExpression = `Percentage(Basis=${calcBasis}, Rate=${rateBase})`;
            } else { // Fixed
                calculationExpression = `Fixed(Basis=${calcBasis}, Amount=${rateBase})`;
            }

            // Combine expression parts
            const fullExpression = expressionParts.length > 0
                ? `${expressionParts.join(' THEN ')} THEN ${calculationExpression}`
                : calculationExpression;

            // Create surcharge info
            const surchargeInfo: OutputSurcharge = {
                surcharge_key: rule.surcharge_code,
                name: rule.surcharge_name,
                expression: fullExpression,
                appliesTo_zones: zones
            };

            // Add this surcharge info to each applicable service
            services.forEach(service => {
                if (!serviceGroupedSurcharges[service]) {
                    serviceGroupedSurcharges[service] = [];
                }
                serviceGroupedSurcharges[service].push(surchargeInfo);
            });
        });

        return serviceGroupedSurcharges;
    }

    public done(): void {
        console.log('=== Form Validation ===');
        const validationResult = this.validate();
        
        if (validationResult.isValid) {
            console.log('✅ Form is valid');
            
            console.log('=== Form Data ===');
            const formData = this.execute();
            console.log('Collected form data:', formData);
            
            console.log('=== Converted Output Format ===');
            const outputFormat = this.convertToOutputFormat(formData);
            console.log('Output format:', JSON.stringify(outputFormat, null, 2));
            
            // Show JSON modal with the output
            this.showJsonModal(outputFormat);
            
            // Show success message
            this.showMessage('Form data collected successfully! Check console for details.', 'success');
        } else {
            console.log('❌ Form has validation errors:');
            validationResult.errors.forEach(error => console.log(`  - ${error}`));
            
            // Show error message
            this.showMessage('Please fix validation errors before submitting.', 'error');
        }
    }

    private showJsonModal(jsonData: ServiceGroupedSurcharges): void {
        const modal = document.getElementById('jsonModal');
        const jsonContent = document.getElementById('jsonContent');
        const closeBtn = document.getElementById('closeJsonModal');
        const copyBtn = document.getElementById('copyJsonBtn');
        const downloadBtn = document.getElementById('downloadJsonBtn');
        const selectAllBtn = document.getElementById('selectAllJsonBtn');

        if (!modal || !jsonContent) return;

        // Format and highlight JSON
        const formattedJson = JSON.stringify(jsonData, null, 2);
        const highlightedJson = this.highlightJson(formattedJson);
        jsonContent.innerHTML = highlightedJson;

        // Show modal
        modal.classList.add('show');

        // Setup event listeners
        const closeModal = () => {
            modal.classList.remove('show');
            // Clear validation highlights after closing modal
            this.clearValidationHighlights();
        };

        // Close button
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }

        // Close on backdrop click
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal();
            }
        };

        // Close on Escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Copy to clipboard
        if (copyBtn) {
            copyBtn.onclick = async () => {
                try {
                    await navigator.clipboard.writeText(formattedJson);
                    copyBtn.textContent = '✓ Copied';
                    copyBtn.classList.add('success');
                    setTimeout(() => {
                        copyBtn.textContent = '📄 Copy';
                        copyBtn.classList.remove('success');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy to clipboard:', err);
                    // Fallback for older browsers
                    this.fallbackCopyToClipboard(formattedJson);
                }
            };
        }

        // Download JSON file
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const blob = new Blob([formattedJson], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'surcharge-rules.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                downloadBtn.textContent = '✓ Downloaded';
                downloadBtn.classList.add('success');
                setTimeout(() => {
                    downloadBtn.textContent = '⬇ Download';
                    downloadBtn.classList.remove('success');
                }, 2000);
            };
        }

        // Select all text
        if (selectAllBtn) {
            selectAllBtn.onclick = () => {
                const range = document.createRange();
                range.selectNodeContents(jsonContent);
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
                
                selectAllBtn.textContent = '✓ Selected';
                selectAllBtn.classList.add('success');
                setTimeout(() => {
                    selectAllBtn.textContent = '☑ Select All';
                    selectAllBtn.classList.remove('success');
                }, 2000);
            };
        }
    }

    private highlightJson(json: string): string {
        return json
            .replace(/("([^"\\]|\\.)*")\s*:/g, '<span class="json-key">$1</span>:')
            .replace(/:\s*("([^"\\]|\\.)*")/g, ': <span class="json-string">$1</span>')
            .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
            .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
            .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
            .replace(/([{}[\]])/g, '<span class="json-bracket">$1</span>')
            .replace(/,$/gm, '<span class="json-comma">,</span>');
    }

    private fallbackCopyToClipboard(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            const copyBtn = document.getElementById('copyJsonBtn');
            if (copyBtn) {
                copyBtn.textContent = '✅ Copied!';
                copyBtn.classList.add('success');
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy to Clipboard';
                    copyBtn.classList.remove('success');
                }, 2000);
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    private showMessage(message: string, type: 'success' | 'error'): void {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            ${type === 'success' 
                ? 'background-color: #d4edda; border: 1px solid #c3e6cb; color: #155724;'
                : 'background-color: #f8d7da; border: 1px solid #f5c6cb; color: #721c24;'
            }
        `;

        // Insert message after form actions
        const formActions = document.querySelector('.form-actions');
        if (formActions) {
            formActions.insertAdjacentElement('afterend', messageDiv);
        }

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    private clearValidationHighlights(): void {
        // Clear validation state
        this.validationState = {};
        
        // Remove error/valid classes from all form fields
        const allFields = document.querySelectorAll<FormElement>('.form-control');
        allFields.forEach(field => {
            field.classList.remove('error', 'valid');
        });
        
        // Remove error/valid classes from multiselect containers
        const multiselectContainers = document.querySelectorAll<HTMLElement>('.multiselect-container');
        multiselectContainers.forEach(container => {
            container.classList.remove('error', 'valid');
        });
        
        // Hide all error messages
        const errorMessages = document.querySelectorAll<HTMLElement>('.error-message');
        errorMessages.forEach(errorDiv => {
            errorDiv.style.display = 'none';
        });
        
        // Remove any form-level success/error messages
        const formMessages = document.querySelectorAll('.form-message');
        formMessages.forEach(msg => msg.remove());
        
        console.log('Validation highlights cleared');
    }
}