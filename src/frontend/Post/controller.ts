import { SwuAlert } from "swu-core";
import PostModule from "./module";

export default class PostController {



    async init() {
        await this.refreshPostList();
    }

    async refreshPostList() {
        try {
            let postList = await PostModule.service.getAllPost();
            PostModule.view.updateListView(postList);
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


    async handlePostEdit(postId: string) {
        try {
            let postData = PostModule.view.getModalFormData();
            postData.id = postId;
            const resp = await PostModule.service.updatePost(postData);
            SwuAlert.alertResp(resp, "Saving Beitrag");
            PostModule.view.modal.hide(); //refresh post list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handlePostCreate() {
        try {
            let postData = PostModule.view.getModalFormData();
            const resp = await PostModule.service.createPost(postData);
            SwuAlert.alertResp(resp, "Create Beitrag");
            PostModule.view.modal.hide(); //refresh post list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handlePostDelete(postId: string) {
        try {
            let confirmResp = await SwuAlert.deleteConfirm("Nutzeraccount löschen", "Soll der Nutzeraccount wirklich gelöscht werden?");
            let resp = await PostModule.service.deletePost(postId);
            SwuAlert.alertResp(resp, "Nutzeraccount Löschen");
            await this.refreshPostList();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showPostModalForUpdate(postId: string) {
        try {
            const postData = await PostModule.service.getPost(postId);
            PostModule.view.setModalFormData(postData);
            PostModule.view.setModalSubmitEvent(() => {
                PostModule.controller.handlePostEdit(postId);
            });
            PostModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showPostModalForCreate() {
        try {
            PostModule.view.setModalSubmitEvent(() => {
                PostModule.controller.handlePostCreate();
            });
            PostModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


}




