import { DataController } from './controllers/data-controller.js';
import { FormController } from './controllers/form-controller.js';
declare global {
    interface Window {
        formController: FormController;
    }
}
export { DataController, FormController };
//# sourceMappingURL=main.d.ts.map