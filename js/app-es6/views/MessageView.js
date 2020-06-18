class MessageView extends View {

    constructor(element) {
        super(element);
    }

    renderTemplate(messageModel) {
        if (messageModel.message) {
            return `<p class="alert alert-success text-center">${messageModel.message}</p>`
        }

        return `<p></p>`;
    }
}