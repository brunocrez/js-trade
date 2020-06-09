class ProxyFactory {

    static createProxy(obj, props, resolve) {

        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        return resolve(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    resolve(target);
                }

                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static isFunction(foo) {
        return typeof(foo) == typeof(Function);
    }
}