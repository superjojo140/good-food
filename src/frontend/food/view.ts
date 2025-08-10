import { SwuDom, SwuTable } from "swu-core";
import { food } from "./model";
import foodModule from "./module";
import Modal from "bootstrap/js/dist/modal";

export default class foodView {

    dataTable: SwuTable;
    modalElem: HTMLElement;
    modal: Modal;
    modalForm: HTMLFormElement = SwuDom.querySelector("#swu_food_modal_form") as HTMLFormElement;

    constructor() {

        this.modalElem = SwuDom.querySelector('#swu_food_modal');
        this.modal = new Modal(this.modalElem);
        //Reset monitoring form if the modal is closed
        this.modalElem.addEventListener("hide.bs.modal", this.resetModalForm);
        this.modalElem.addEventListener("hide.bs.modal", foodModule.controller.refreshfoodList);


        let tableColumns = [
            { title: "Id", field: "id"},
            //xxxEntityPropertiesTablexxx //TODO:nicer replace selector
        ]
        //TODO: Make table filter fit with tabulator lib
        let searchInput = SwuDom.querySelectorAsInput("#swu_food_filter_input");
        let searchInputClear = SwuDom.querySelectorAsInput("#swu_food_filter_clear_button");
        this.dataTable = new SwuTable("#swu_food_table", tableColumns);

        SwuDom.addEventListener("#swu_food_create_button", "click", foodModule.controller.showfoodModalForCreate);

    }




    async updateListView(foodList: food[]) {
        let tableDataList: food[] = [];

        for (let foodId in foodList) {
            let food = foodList[foodId] as food;
            let editBtn = `<button type="button" class="btn btn-primary btn-sm swu-food-edit-btn" data-swu-food-id="${food.id}">
                                <i class="fas fa-pencil-alt"></i>&nbsp; Edit
                           </button>`;
            let deleteBtn = `&nbsp;<button class="btn btn-danger btn-sm swu-food-delete-btn" type="button" data-swu-food-id="${food.id}">
                                <i class="far fa-trash-alt"></i> Delete
                             </button>`;
            tableDataList.push(food);
        }

        this.dataTable.update(tableDataList);
        SwuDom.querySelectorAsInput("#swu_food_filter_input").value = "";
    }

    registerListItemButtons() {
        SwuDom.querySelectorAll(".swu-food-edit-btn").forEach(elem => {
            const foodId = elem.getAttribute("data-swu-food-id") as string;
            SwuDom.addEventListener(elem, "click", () => foodModule.controller.showfoodModalForUpdate(foodId));
        });

        SwuDom.querySelectorAll(".swu-food-delete-btn").forEach(elem => {
            const foodId = elem.getAttribute("data-swu-food-id") as string;
            SwuDom.addEventListener(elem, "click", () => foodModule.controller.handlefoodDelete(foodId));
        });
    }

    setModalSubmitEvent(callback: Function) {
        SwuDom.removeEventListener(this.modalForm, "submit");
        SwuDom.addEventListener(this.modalForm, "submit", (event) => {
            event.preventDefault();
            callback();
        });
    }


    /**
     * Sets form data 
     */
    setModalFormData(foodData: food) {
            SwuDom.querySelectorAsInput("#swu_food_modal_form_name").value = foodData.name;
    SwuDom.querySelectorAsInput("#swu_food_modal_form_cost").value = foodData.cost;

    }

    getModalFormData(): food {
        let foodData = {} as food;
            foodData.name = SwuDom.querySelectorAsInput("#swu_food_modal_form_name").value;
    foodData.cost = SwuDom.querySelectorAsInput("#swu_food_modal_form_cost").value;

        return foodData;
    }

    resetModalForm = () => {
        this.modalForm.reset();
    }


}