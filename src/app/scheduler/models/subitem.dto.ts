import { Container } from './container.dto';
import { SubItemContainerServer } from './server/preplanitem.servermodel';

export class SubItemContainer {
    idSubItemContainer: number;
    container: Container;
    isDefault: boolean;
    quantity: number;
    unitQuantity: string;
    executionNormative: number;
    // unitExecutionNormative: string;
    preparationNormative: number;
    // unitPreparationNormative: string;

    static fromServer(serverData: SubItemContainerServer) {
        const result = new SubItemContainer();
        result.idSubItemContainer = serverData.idSubItemContainer;
        result.container = Container.fromServer(serverData.container);
        result.isDefault = serverData.isDefault;
        result.quantity = serverData.quantity;
        result.unitQuantity = serverData.unitQuantity;
        result.executionNormative = serverData.executionNormativeInMinutes;
        // result.unitExecutionNormative = serverData.unitExecutionNormative;
        result.preparationNormative = serverData.preparationNormativeInMinutes;
        // result.unitPreparationNormative = serverData.unitPreparationNormative;

        return result;
    }

    static createSubItemContainer(container: Container) {
        const result = new SubItemContainer();
        result.idSubItemContainer = -1;
        result.container = container;
        result.isDefault = false;
        return result;
    }
}
