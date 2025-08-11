import { SwuDom, SwuTable } from "swu-core";
import { Post } from "./model";
import PostModule from "./module";
import Modal from "bootstrap/js/dist/modal";

export default class PostView {

    dataTable: SwuTable;
    modalElem: HTMLElement;
    modal: Modal;
    modalForm: HTMLFormElement = SwuDom.querySelector("#swu_post_modal_form") as HTMLFormElement;

    constructor() {

        this.modalElem = SwuDom.querySelector('#swu_post_modal');
        this.modal = new Modal(this.modalElem);
        //Reset monitoring form if the modal is closed
        this.modalElem.addEventListener("hide.bs.modal", this.resetModalForm);
        this.modalElem.addEventListener("hide.bs.modal", PostModule.controller.refreshPostList);


        let tableColumns = [
            { title: "Id", field: "id" },
            { title: "title", field: "title", headerFilter: "input" },
            { title: "body", field: "body", headerFilter:"input" },
            { title: "userId", field: "userId", headerFilter:"input" },

        ]
        //TODO: Make table filter fit with tabulator lib
        let searchInput = SwuDom.querySelectorAsInput("#swu_post_filter_input");
        let searchInputClear = SwuDom.querySelectorAsInput("#swu_post_filter_clear_button");
        this.dataTable = new SwuTable("#swu_post_table", tableColumns);

        SwuDom.addEventListener("#swu_post_create_button", "click", PostModule.controller.showPostModalForCreate);

    }




    async updateListView(postList: Post[]) {
        let tableDataList: Post[] = [];

        for (let postId in postList) {
            let post = postList[postId] as Post;
            let editBtn = `<button type="button" class="btn btn-primary btn-sm swu-post-edit-btn" data-swu-post-id="${post.id}">
                                <i class="fas fa-pencil-alt"></i>&nbsp; Edit
                           </button>`;
            let deleteBtn = `&nbsp;<button class="btn btn-danger btn-sm swu-post-delete-btn" type="button" data-swu-post-id="${post.id}">
                                <i class="far fa-trash-alt"></i> Delete
                             </button>`;
            tableDataList.push(post);
        }

        this.dataTable.update(tableDataList);
        SwuDom.querySelectorAsInput("#swu_post_filter_input").value = "";
    }

    registerListItemButtons() {
        SwuDom.querySelectorAll(".swu-post-edit-btn").forEach(elem => {
            const postId = elem.getAttribute("data-swu-post-id") as string;
            SwuDom.addEventListener(elem, "click", () => PostModule.controller.showPostModalForUpdate(postId));
        });

        SwuDom.querySelectorAll(".swu-post-delete-btn").forEach(elem => {
            const postId = elem.getAttribute("data-swu-post-id") as string;
            SwuDom.addEventListener(elem, "click", () => PostModule.controller.handlePostDelete(postId));
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
    setModalFormData(postData: Post) {
        SwuDom.querySelectorAsInput("#swu_post_modal_form_title").value = postData.title;
        SwuDom.querySelectorAsInput("#swu_post_modal_form_body").value = postData.body;
        SwuDom.querySelectorAsInput("#swu_post_modal_form_userId").value = postData.userId;

    }

    getModalFormData(): Post {
        let postData = {} as Post;
        postData.title = SwuDom.querySelectorAsInput("#swu_post_modal_form_title").value;
        postData.body = SwuDom.querySelectorAsInput("#swu_post_modal_form_body").value;
        postData.userId = SwuDom.querySelectorAsInput("#swu_post_modal_form_userId").value;

        return postData;
    }

    resetModalForm = () => {
        this.modalForm.reset();
    }


}