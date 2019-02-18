import { Queries } from '../models';
import * as parsers from './parsers';

function createQueryInterval(q, io) {
    return setInterval(() => {
        const values = parsers[q.outputType](q);
        Queries.findOneAndUpdate({ _id: q._id }, { 'data.last_values': values }).then(() =>
            io.to(q.page).emit('queries', { queryId: q._id, values }));
    }, q.interval)
}

export default createQueryInterval;