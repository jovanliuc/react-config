import invariant from 'invariant';

import {
  configStringDescriptorPropTypes,
  configNumberDescriptorPropTypes,
  configBooleanDescriptorPropTypes,
  configArrayDescriptorPropTypes,
  configObjectDescriptorPropTypes,
  configFunctionDescriptorPropTypes,
} from './prop-type';

import { escape, filterProps } from './util';

const { keys } = Object;
const STRING_FORMAT_PROPS = keys(configStringDescriptorPropTypes);
const NUMBER_FORMAT_PROPS = keys(configNumberDescriptorPropTypes);
const BOOLEAN_FORMAT_PROPS = keys(configBooleanDescriptorPropTypes);
const ARRAY_FORMAT_PROPS = keys(configArrayDescriptorPropTypes);
const OBJECT_FORMAT_PROPS = keys(configObjectDescriptorPropTypes);
const FUNCTION_FORMAT_PROPS = keys(configFunctionDescriptorPropTypes);

/**

Get string config item.
@param {*} config
@param {*} state
@param {*} configStringDescriptor
*/
export function getString(
  config,
  state,
  configStringDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultString, mockString } = configStringDescriptor;
  // id is a required field of a Config String Descriptor.
  invariant(id, '[React Config] An id must be provided to config a string.');

  if (configMessages[id] && typeof configMessages[id] !== 'string')
    invariant(mockString,
      `
        [React Config] The retrieved value via getString must be provided to config a string.
      `
);

  if (!!defaultString && typeof defaultString !== 'string')
    invariant(mockString, '[React Config] An defaultString must be provided to config a string.');

  return configMessages[id] || defaultString || id;
}

/**

Get number config item.
@param {*} config
@param {*} state
@param {*} configNumberDescriptor
*/
export function getNumber(
  config,
  state,
  configNumberDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultNumber, mockNumber } = configNumberDescriptor;
  // id is a required field of a Config Number Descriptor.
  invariant(id, '[React Config] An id must be provided to config a number.');

  if (configMessages[id] && typeof configMessages[id] !== 'number')
    invariant(mockNumber,
      `
        [React Config] The retrieved value via getNumber must be provided to config a number.
      `
);

  if (!!defaultNumber && typeof defaultNumber !== 'number')
    invariant(mockNumber, '[React Config] An defaultNumber must be provided to config a number.');

  if (
    typeof configMessages[id] === 'undefined' &&
    Object.is(defaultNumber, 0)
  )
    return defaultNumber;

  return configMessages[id] || defaultNumber || id;
}

/**

Get boolean config item.
@param {*} config
@param {*} state
@param {*} configBooleanDescriptor
*/
export function getBoolean(
  config,
  state,
  configBooleanDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultBoolean, mockBoolean } = configBooleanDescriptor;
  // id is a required field of a Config Boolean Descriptor.
  invariant(id, '[React Config] An id must be provided to config a boolean.');

  if (configMessages[id] && typeof configMessages[id] !== 'boolean')
    invariant(mockBoolean,
      `
        [React Config] The retrieved value via getBoolean must be provided to config a boolean.
      `
);

  if (defaultBoolean && typeof defaultBoolean !== 'boolean')
    invariant(mockBoolean, '[React Config] An defaultBoolean must be provided to config a boolean.');

  const { is } = Object;

  if (typeof configMessages[id] !== 'undefined')
    return configMessages[id];

  if (
    typeof configMessages[id] === 'undefined' &&
    typeof defaultBoolean !== 'undefined'
  )
    return defaultBoolean;

  return id;
}

/**

Get array config item.
@param {*} config
@param {*} state
@param {*} configArrayDescriptor
*/
export function getArray(
  config,
  state,
  configArrayDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultArray, mockArray } = configArrayDescriptor;
  // id is a required field of a Config Array Descriptor.
  invariant(id, '[React Config] An id must be provided to config a array.');

  if (configMessages[id] && !Array.isArray(configMessages[id]))
    invariant(mockArray,
      `
        [React Config] The retrieved value via getArray must be provided to config a array.
      `
);

  if (!!defaultArray && !Array.isArray(defaultArray))
    invariant(mockArray, '[React Config] An defaultArray must be provided to config a array.');

  return configMessages[id] || defaultArray || id;;
}

/**

Get object config item.
@param {*} config
@param {*} state
@param {*} configObjectDescriptor
*/
export function getObject(
  config,
  state,
  configObjectDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultObject, mockObject } = configObjectDescriptor;
  // id is a required field of a Config Object Descriptor.
  invariant(id, '[React Config] An id must be provided to config a object.');

  if (configMessages[id] && typeof configMessages[id] !== 'object')
    invariant(mockObject,
      `
        [React Config] The retrieved value via getObject must be provided to config a object.
      `
);

  if (!!defaultObject && typeof defaultObject !== 'object')
    invariant(mockObject, '[React Config] An defaultObject must be provided to config a object.');

  return configMessages[id] || defaultObject || id;
}

/**

Get function config item.
@param {*} config
@param {*} state
@param {*} configFunctionDescriptor
*/
export function getFunction(
  config,
  state,
  configFunctionDescriptor = {},
) {
  const { configMessages } = config;
  const { id, defaultFunction, mockFunction } = configFunctionDescriptor;
  // id is a required field of a Config Function Descriptor.
  invariant(id, '[React Config] An id must be provided to config a function.');

  if (configMessages[id] && typeof configMessages[id] !== 'function')
    invariant(mockFunction,
      `
        [React Config] The retrieved value via getFunction must be provided to config a function.
      `
);

  if (!!defaultFunction && typeof defaultFunction !== 'function')
    invariant(mockFunction, '[React Config] An defaultFunction must be provided to config a function.');

  return configMessages[id] || defaultFunction || id;
}