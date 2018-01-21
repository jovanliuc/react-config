import PropTypes from 'prop-types';

const {
  string,
  number,
  bool,
  array,
  object,
  func,
  shape,
  any,
  oneOfType,
} = PropTypes;

const required = func.isRequired;

export const configCfgPropTypes = {
  configMessages: object,
};

export const configFormatPropTypes = {
  getString: required,
  getNumber: required,
  getBoolean: required,
  getArray: required,
  getObject: required,
  getFunction: required,
};

export const configShape = shape({
  ...configCfgPropTypes,
  ...configFormatPropTypes,
});

export const configStringDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultString: string,
};

export const configNumberDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultNumber: number,
};

export const configBooleanDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultBoolean: bool,
};

export const configArrayDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultArray: array,
};

export const configObjectDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultObject: object,
};

export const configFunctionDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultFunction: func,
};