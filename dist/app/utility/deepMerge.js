"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge = (target, source) => {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    // Join `target` and modified `source`
    return Object.assign(target || {}, source);
};
exports.default = deepMerge;
