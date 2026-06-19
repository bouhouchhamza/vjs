"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonStore = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
class JsonStore {
    constructor(fileName) {
        this.filePath = (0, node_path_1.join)(process.cwd(), 'src', 'data', fileName);
    }
    read(fallback) {
        if (!(0, node_fs_1.existsSync)(this.filePath)) {
            return fallback;
        }
        return JSON.parse((0, node_fs_1.readFileSync)(this.filePath, 'utf8'));
    }
    write(value) {
        (0, node_fs_1.mkdirSync)((0, node_path_1.dirname)(this.filePath), { recursive: true });
        (0, node_fs_1.writeFileSync)(this.filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    }
}
exports.JsonStore = JsonStore;
//# sourceMappingURL=json-store.js.map