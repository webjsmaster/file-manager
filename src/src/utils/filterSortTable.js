export function filterSortTable (table, type) {
    return table.filter ( t => t.Type === type)
    .sort( function (a, b) {
        return a.Name.localeCompare(b.Name);
    })
}