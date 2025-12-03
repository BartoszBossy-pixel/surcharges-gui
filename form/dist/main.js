import { DataController } from './controllers/data-controller.js';
import { FormController } from './controllers/form-controller.js';
// Initialize the application
async function initializeApp() {
    try {
        console.log('Initializing TypeScript application...');
        // Create data controller
        const dataController = new DataController();
        // Create form controller
        const formController = new FormController({ dataController });
        // Make formController globally available for onclick handlers
        window.formController = formController;
        // Initialize the form
        await formController.init();
        console.log('TypeScript application initialized successfully!');
    }
    catch (error) {
        console.error('Failed to initialize application:', error);
        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.innerHTML = `
            <strong>Application Error</strong><br>
            Failed to initialize the form. Please refresh the page and try again.
        `;
        document.body.appendChild(errorDiv);
        // Auto-remove error message after 10 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 10000);
    }
}
// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else {
    initializeApp();
}
// Export for potential external use
export { DataController, FormController };
//# sourceMappingURL=main.js.map