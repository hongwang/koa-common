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

    app.context.success = function(data) {
        const result = {
            status_code: 200
        }

        if (data) {
            result.data = data
        }

        this.body = result
    }

    app.context.failure = function(err_code, message) {
        const result = {
            status_code: err_code
        }

        if (message) {
            result.message = message
        }

        this.body = result
    }

    app.context.done = function(success, err_code, message, data) {
        if (success) {
            this.success(data)
        } else {
            this.failure(err_code, message)
        }
    }
}