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
}