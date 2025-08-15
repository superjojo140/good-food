import { SwuDom, SwuTable } from "swu-core";
import { Project } from "../../model/model";
import ProjectModule from "./module";
import Modal from "bootstrap/js/dist/modal.js";

export default class ProjectView {

    dataTable: SwuTable;
    modalElem: HTMLElement;
    modal: Modal;
    modalForm: HTMLFormElement = SwuDom.querySelector("#swu_project_modal_form") as HTMLFormElement;

    constructor() {

        this.modalElem = SwuDom.querySelector('#swu_project_modal');
        this.modal = new Modal(this.modalElem);
        //Reset monitoring form if the modal is closed
        this.modalElem.addEventListener("hide.bs.modal", this.resetModalForm);
        this.modalElem.addEventListener("hide.bs.modal", ProjectModule.controller.refreshProjectList);


        let tableColumns = [
            { title: "", field: "swuTableActionButtons", formatter: "html", headerSort: false, headerFilter: false },
            { title: "Id", field: "id", formatter: "html", sorter: "number", headerFilter: "input" },
                { title: "title", field: "title", headerFilter:"input"},
    { title: "description", field: "description", headerFilter:"input"},
    { title: "notes", field: "notes", headerFilter:"input"},

        ]
        this.dataTable = new SwuTable("#swu_project_table", tableColumns);

        SwuDom.addEventListener("#swu_project_create_button", "click", ProjectModule.controller.showProjectModalForCreate);

    }




    async updateListView(projectList: Project[]) {
        interface projectTableDataset extends Project { swuTableActionButtons: string };
        let tableDataList: projectTableDataset[] = [];

        for (let projectId in projectList) {
            let project = projectList[projectId] as projectTableDataset;
            let editBtn = `<button type="button" class="btn btn-primary btn-sm swu-project-edit-btn" data-swu-project-id="${project.id}">
                                <i class="fas fa-pencil-alt"></i>&nbsp; Edit
                           </button>`;
            let deleteBtn = `&nbsp;<button class="btn btn-danger btn-sm swu-project-delete-btn" type="button" data-swu-project-id="${project.id}">
                                <i class="far fa-trash-alt"></i> Delete
                             </button>`;
            project.swuTableActionButtons = editBtn + deleteBtn;
            tableDataList.push(project);
        }

        this.dataTable.update(tableDataList);
        this.registerListItemButtons();
    }

    registerListItemButtons() {
        SwuDom.querySelectorAll(".swu-project-edit-btn").forEach(elem => {
            const projectId = elem.getAttribute("data-swu-project-id") as string;
            SwuDom.addEventListener(elem, "click", () => ProjectModule.controller.showProjectModalForUpdate(projectId));
        });

        SwuDom.querySelectorAll(".swu-project-delete-btn").forEach(elem => {
            const projectId = elem.getAttribute("data-swu-project-id") as string;
            SwuDom.addEventListener(elem, "click", () => ProjectModule.controller.handleProjectDelete(projectId));
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
    setModalFormData(projectData: Project) {
            SwuDom.querySelectorAsInput("#swu_project_modal_form_title").value = projectData.title;
    SwuDom.querySelectorAsInput("#swu_project_modal_form_description").value = projectData.description;
    SwuDom.querySelectorAsInput("#swu_project_modal_form_notes").value = projectData.notes;

    }

    getModalFormData(): Project {
        let projectData = {} as Project;
            projectData.title = SwuDom.querySelectorAsInput("#swu_project_modal_form_title").value;
    projectData.description = SwuDom.querySelectorAsInput("#swu_project_modal_form_description").value;
    projectData.notes = SwuDom.querySelectorAsInput("#swu_project_modal_form_notes").value;

        return projectData;
    }

    resetModalForm = () => {
        this.modalForm.reset();
    }


}