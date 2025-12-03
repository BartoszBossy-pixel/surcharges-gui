class FormController {
    constructor(dataController) {
        this.dataController = dataController;
        this.rowCounter = 2;
        this.validationRules = {
            required: (value) => value.trim() !== '',
            number: (value) => !isNaN(parseFloat(value)),
            min: (value, min) => parseFloat(value) >= min
        };
    }

    // Metoda validate - waliduje cały formularz
    validate() {
        const fields = document.querySelectorAll('.form-control');
        let isFormValid = true;
        const errors = [];

        fields.forEach(field => {
            const fieldResult = this.validateField(field);
            if (!fieldResult.isValid) {
                isFormValid = false;
                errors.push({
                    field: field.name,
                    message: fieldResult.message,
                    element: field
                });
            }
        });

        return {
            isValid: isFormValid,
            errors: errors
        };
    }

    // Walidacja pojedynczego pola
    validateField(field) {
        const value = field.value.trim();
        const errorDiv = field.nextElementSibling;
        let isValid = true;
        let message = '';

        // Sprawdź czy pole jest wymagane
        if (field.hasAttribute('required') && !this.validationRules.required(value)) {
            message = 'This field is required';
            isValid = false;
        }
        // Check numeric values
        else if (field.type === 'number') {
            if (!this.validationRules.number(value)) {
                message = 'Enter a valid number';
                isValid = false;
            } else {
                const min = parseFloat(field.getAttribute('min'));
                if (min !== null && !this.validationRules.min(value, min)) {
                    message = `Value must be greater than or equal to ${min}`;
                    isValid = false;
                }
            }
        }

        // Aktualizuj UI
        this.updateFieldValidationUI(field, errorDiv, isValid, message);

        return { isValid, message };
    }

    // Aktualizacja UI walidacji pola
    updateFieldValidationUI(field, errorDiv, isValid, message) {
        if (isValid) {
            errorDiv.style.display = 'none';
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            field.classList.add('error');
            field.classList.remove('valid');
        }
    }

    // Metoda execute - zbiera dane z formularza
    execute() {
        const validationResult = this.validate();
        
        if (!validationResult.isValid) {
            return {
                success: false,
                message: 'Form contains validation errors',
                errors: validationResult.errors
            };
        }

        const rows = document.querySelectorAll('[data-row-id]');
        const rules = [];
        
        rows.forEach(row => {
            const rule = this.extractRuleFromRow(row);
            if (rule) {
                rules.push(rule);
            }
        });

        return {
            success: true,
            data: {
                rules: rules,
                timestamp: new Date().toISOString(),
                totalRules: rules.length
            }
        };
    }

    // Wyciąganie danych z wiersza
    extractRuleFromRow(row) {
        const rule = {};
        const inputs = row.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            if (input.name) {
                rule[input.name] = input.value;
            }
        });

        // Dodaj ID wiersza
        rule.rowId = row.getAttribute('data-row-id');
        
        return rule;
    }

    // Obsługa zależności między polami
    handleFieldDependencies(triggerVariable, operator, triggerValue) {
        const operatorSelect = operator;
        const triggerValueInput = triggerValue;
        const variableType = triggerVariable.value;

        // Pobierz operatory dla danego typu zmiennej
        const operators = this.dataController.getOperatorsForVariable(variableType);
        operatorSelect.innerHTML = this.dataController.generateSelectOptions(operators);

        // Ustaw placeholder
        const placeholder = this.dataController.getPlaceholderForVariable(variableType);
        triggerValueInput.placeholder = placeholder;

        // Jeśli wybrano "None", wyłącz pola
        if (variableType === 'None') {
            triggerValueInput.value = '-';
            triggerValueInput.disabled = true;
            operatorSelect.disabled = true;
        } else {
            triggerValueInput.disabled = false;
            operatorSelect.disabled = false;
        }
    }

    // Dodawanie nowego wiersza
    addNewRow() {
        this.rowCounter++;
        const newRow = document.createElement('div');
        newRow.className = 'row';
        newRow.setAttribute('data-row-id', this.rowCounter);
        
        // Generuj HTML dla nowego wiersza
        newRow.innerHTML = this.generateRowHTML(this.rowCounter);
        
        // Dodaj wiersz do tabeli
        const tableDiv = document.querySelector('.property-table');
        const lastRow = tableDiv.querySelector('.row:last-of-type');
        tableDiv.insertBefore(newRow, lastRow.nextSibling);
        
        // Skonfiguruj event listenery
        this.setupRowEventListeners(newRow);

        return newRow;
    }

    // Generowanie HTML dla wiersza
    generateRowHTML(rowId) {
        const triggerVariables = this.dataController.getTriggerVariables();
        const calculationTypes = this.dataController.getCalculationTypes();
        const calculationBasis = this.dataController.getCalculationBasis();

        return `
            <div>
                <input type="text" class="form-control" name="service" required>
                <div class="error-message">This field is required</div>
            </div>
            <div>
                <input type="text" class="form-control" name="zones">
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
                    ${this.dataController.generateSelectOptions(triggerVariables)}
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
                    ${this.dataController.generateSelectOptions(calculationTypes)}
                </select>
                <div class="error-message">This field is required</div>
            </div>
            <div class="select-wrapper">
                <select class="form-control" name="calculation_basis" required>
                    <option value="">Select...</option>
                    ${this.dataController.generateSelectOptions(calculationBasis)}
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
                <button type="button" class="remove-row-btn" onclick="formController.removeRow(${rowId})">
                    ✕
                </button>
            </div>
        `;
    }

    // Usuwanie wiersza
    removeRow(rowId) {
        const row = document.querySelector(`[data-row-id="${rowId}"]`);
        if (row) {
            const allRows = document.querySelectorAll('[data-row-id]');
            if (allRows.length > 1) {
                row.remove();
            } else {
                alert('Cannot remove the last row!');
            }
        }
    }

    // Konfiguracja event listenerów dla wiersza
    setupRowEventListeners(row) {
        const triggerVariable = row.querySelector('.trigger-variable');
        const operator = row.querySelector('.operator');
        const triggerValue = row.querySelector('.trigger-value');
        
        // Event listener dla trigger variable
        triggerVariable.addEventListener('change', () => {
            this.handleFieldDependencies(triggerVariable, operator, triggerValue);
        });
        
        // Event listenery dla walidacji
        const fields = row.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });
    }

    // Inicjalizacja formularza
    async initialize() {
        // Załaduj dane
        await this.dataController.loadData();
        
        // Skonfiguruj istniejące wiersze
        const existingRows = document.querySelectorAll('[data-row-id]');
        existingRows.forEach(row => {
            this.setupRowEventListeners(row);
            
            // Inicjalizuj zależności
            const triggerVariable = row.querySelector('.trigger-variable');
            const operator = row.querySelector('.operator');
            const triggerValue = row.querySelector('.trigger-value');
            this.handleFieldDependencies(triggerVariable, operator, triggerValue);
        });
    }

    // Metoda done - łączy validate i execute
    done() {
        const result = this.execute();
        
        if (result.success) {
            // Pokaż komunikat sukcesu
            this.showSuccessMessage('Rules have been successfully saved!');
            
            // Log data
            console.log('Saving rules:', result.data);
            
            // Tutaj można dodać kod do wysłania danych na serwer
            // return this.sendToServer(result.data);
        } else {
            // Pokaż komunikat błędu
            this.showErrorMessage('Please fix form errors before saving.');
        }
        
        return result;
    }

    // Pokazywanie komunikatu sukcesu
    showSuccessMessage(message) {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    }

    // Pokazywanie komunikatu błędu
    showErrorMessage(message) {
        alert(message); // Can be replaced with more elegant solution
    }
}

// Eksport dla użycia w innych plikach
window.FormController = FormController;