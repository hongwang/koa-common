import os from 'os'

function healthcheck() {
    return {
        everything: 'is ok',
        time: new Date(),
        hostname: os.hostname(),
        datacenter: process.env.DATACENTER || 'local',
        application: {
            pid: process.pid,
            node_env: process.env.NODE_ENV || 'dev',
            uptime: process.uptime()
        }
    }
}

export default function (path = '/healthcheck') {
    return (ctx, next) => {
        if (path === ctx.path) {
            ctx.body = healthcheck()
        } else {
            return next()
        }
    }
}
