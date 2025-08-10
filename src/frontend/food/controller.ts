import { SwuAlert } from "swu-core";
import foodModule from "./module";

export default class foodController {



    async init() {
        await this.refreshfoodList();
    }

    async refreshfoodList() {
        try {
            let foodList = await foodModule.service.getAllfood();
            foodModule.view.updateListView(foodList);
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


    async handlefoodEdit(foodId: string) {
        try {
            let foodData = foodModule.view.getModalFormData();
            foodData.id = foodId;
            const resp = await foodModule.service.updatefood(foodData);
            SwuAlert.alertResp(resp, "Saving food");
            foodModule.view.modal.hide(); //refresh food list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handlefoodCreate() {
        try {
            let foodData = foodModule.view.getModalFormData();
            const resp = await foodModule.service.createfood(foodData);
            SwuAlert.alertResp(resp, "Create food");
            foodModule.view.modal.hide(); //refresh food list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handlefoodDelete(foodId: string) {
        try {
            let confirmResp = await SwuAlert.deleteConfirm("Nutzeraccount löschen", "Soll der Nutzeraccount wirklich gelöscht werden?");
            let resp = await foodModule.service.deletefood(foodId);
            SwuAlert.alertResp(resp, "Nutzeraccount Löschen");
            await this.refreshfoodList();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showfoodModalForUpdate(foodId: string) {
        try {
            const foodData = await foodModule.service.getfood(foodId);
            foodModule.view.setModalFormData(foodData);
            foodModule.view.setModalSubmitEvent(() => {
                foodModule.controller.handlefoodEdit(foodId);
            });
            foodModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showfoodModalForCreate() {
        try {
            foodModule.view.setModalSubmitEvent(() => {
                foodModule.controller.handlefoodCreate();
            });
            foodModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


}




