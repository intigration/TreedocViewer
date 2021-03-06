import _ from 'lodash';
import { Query, Column } from './Vue2DataTable';

export default {
  filter(columns: Column[], data: any[], q: Query) {
    let result = data;
    columns.forEach((c) => {
      const f = c.field;
      const fq = q[c.field];
      if (!fq)
        return;
      if (_.isArray(fq))
        result = result.filter((row) => fq.includes(row[f]));
      else if (_.isString(fq))
        result = result.filter(row => row[f] && (`${row[f]}`).toLowerCase().includes(fq.toLowerCase()));
      else {
        console.log(`Unknown query: ${JSON.stringify(fq)}`);
      }
    });

    if (q.sort) {
      result = _.orderBy(result, q.sort, q.order);
    }
    const end = (q.offset === undefined || !q.limit) ? undefined : q.offset + q.limit;
    return result.slice(q.offset, end);
  },
};
