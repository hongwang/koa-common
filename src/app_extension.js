export default function apply_extensions(app) {

    app.context.get_param = function (key) {
        let val = this.params[key];
        if (val) {
            return val;
        }

        val = this.request.body[key];
        if (val) {
            return val;
        }

        return null;
    }

    app.context.require = function(...keys) {
        const missing = []

        for (let key of keys) {
            if (!this.get_param(key)) {
                missing.push(key);
            }
        }

        if (missing.length) {
            this.throw(400, `${missing.join()} required`)
        }
    }
}