import { ProxyFactory } from '../services/ProxyFactory';

export class Bind {

    constructor(model, view, ...props) {

        const proxy = ProxyFactory.createProxy(model, props, model => view.updateView(model));
        view.updateView(model);

        return proxy;
    }
}