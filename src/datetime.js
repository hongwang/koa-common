import moment from 'moment'
import cassandra from 'cassandra-driver'

const TimeUuid = cassandra.types.TimeUuid;

export function archive_date() {
    return moment().format('YYYYMMDD');
}

export function timeuuid(str) {
    return str ? TimeUuid.fromString(str)
        : TimeUuid.now();
}

export default { archive_date, timeuuid }