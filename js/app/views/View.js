class View {

    constructor(element) {
        this._element = element;
    }

    renderTemplate() {
        throw new Error('This method shoud be implemented!');
    }

    updateView(model) {
        this._element.innerHTML = this.renderTemplate(model)
    }
}