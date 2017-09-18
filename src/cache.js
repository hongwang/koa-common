import redis from 'redis'
import co_wrapper from 'co-redis'
import Exception from './exceptions'

const TYPE_FLAGS = {
    'string': '0:',
    'number': '1:',
    'object': '2:',
    'buffer': '3:'
}

let app, client;

function init(app_name, config) {
    app = app_name
    const redis_client = redis.createClient(config.port, config.host, config.options || {});
    client = co_wrapper(redis_client);
}

async function set_raw(key, val, expire) {
    if (!client) {
        throw Exception.NotInitialized
    }

    expire && expire > 0
        ? await client.setex(key, expire, val)
        : await client.set(key, val);
}

async function get_raw(key) {
    if (!client) {
        throw Exception.NotInitialized
    }

    return await client.get(key);
}

async function set(key, val, expire) {

    const val_type = Buffer.isBuffer(val) ? 'buffer' : typeof (val);
    let real_val;
    if (val_type === 'object') {
        real_val = TYPE_FLAGS[val_type] + JSON.stringify(val);
    } else if (val_type === 'buffer') {
        real_val = TYPE_FLAGS[val_type] + val.toString('binary');
    } else {
        real_val = TYPE_FLAGS[val_type] + val.toString()
    }

    await set_raw(key, real_val, expire);
}

async function get(key) {

    const result = await get_raw(key);
    if (!result) {
        return null;
    }

    const flag = result.substr(0, 2);
    const raw_val = result.substr(2);

    if (flag === TYPE_FLAGS['object']) {
        return JSON.parse(raw_val);
        
    } else if (flag === TYPE_FLAGS['number']) {
        return +raw_val;

    } else if (flag === TYPE_FLAGS['buffer']) {
        const buf = Buffer.alloc(raw_val.length);
        buf.write(raw_val, 0, 'binary');
        return buf.toString();

    } else {
        return raw_val;
    }
}

function del(...keys) {
    client.del(keys)
}

function format_key_with_app(key) {
    return app + "::" + key;
}

export default { init, get: get, set: set, del, format_key_with_app }