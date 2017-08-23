// import errorhandler from 'errorhandler'
// app.use(errorhandler);
//
// ctx => {
//    ctx.throw(500);
// };
//
// ctx => {
//    throw exception;
// }
//
// app.on('error', err => logger.error(err));

export default async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.type = 'html';
        ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
        ctx.app.emit('error', err, ctx);
    }
};