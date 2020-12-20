import _ from 'lodash';

const treeToObject = (tree) => {
  const result = tree.reduce((acc, item) => {
    const { key, value, state, oldValue, children } = item;
    if (state === 'nested') {
      _.set(acc, key, treeToObject(children));
    }
    if (state === 'unchanged') {
      _.set(acc, key, value);
    }
    if (state === 'removed') {
      _.set(acc, `-${key}`, value);
    }
    if (state === 'added') {
      _.set(acc, `+${key}`, value);
    }
    if (state === 'updated') {
      _.set(acc, `-${key}`, oldValue);
      _.set(acc, `+${key}`, value);
    }

    return acc;
  }, {});

  return result;
};

export default (tree) =>
  JSON.stringify(treeToObject(tree), null, 4)
    .replace(/"|,/g, '')
    .replace(/[ ][ ][+]/g, '+ ')
    .replace(/[ ][ ][-]/g, '- ');
