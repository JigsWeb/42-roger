import { execSync } from 'child_process'

function arrayParser(query) {
    const output = execSync(query.data[query.shellType]).toString('ascii');
    const f = [];

    query.data.values.forEach(([, selector], a) =>
        execSync(`echo "${output}" | ${selector}`).toString('ascii').split('\n').forEach((v, i) => {
            if (!f[i])
                f[i] = Array.from({ length: query.data.values.length })
            f[i][a] = v;
        }))

    return f;
}

export default arrayParser;