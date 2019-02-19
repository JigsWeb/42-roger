import { execSync } from 'child_process'

function objectParser(query) {
    const output = execSync(query.data[query.shellType]).toString('ascii');

    return query.data.values.reduce((res, [field, selector]) => {
        res[field] = execSync(`echo "${output}" | ${selector}`).toString('ascii')
        return res;
    }, {});
}

export default objectParser;