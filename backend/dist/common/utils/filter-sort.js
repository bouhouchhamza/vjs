"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByKey = sortByKey;
function sortByKey(items, key, direction = 'asc') {
    return [...items].sort((a, b) => {
        const left = String(a[key]).toLowerCase();
        const right = String(b[key]).toLowerCase();
        const result = left.localeCompare(right, undefined, { numeric: true });
        return direction === 'asc' ? result : -result;
    });
}
//# sourceMappingURL=filter-sort.js.map