const deepMerge = (target: { [x: string]: any; }, source: { [x: string]: any; }) => {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], deepMerge(target[key], source[key]));
      }
    }
    // Join `target` and modified `source`
    return Object.assign(target || {}, source);
  };

export default deepMerge;