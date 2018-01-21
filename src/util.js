import invariant from 'invariant';
import { configCfgPropTypes } from './prop-type';

const configCfgPropNames = Object.keys(configCfgPropTypes);

const ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;',
};

const UNSAFE_CHARS_REGEX = /[&><"']/g;

export function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, match => ESCAPED_CHARS[match]);
}

export function filterProps(props, whitelist, defaults = {}) {
  return whitelist.reduce((filtered, name) => {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults.hasOwnProperty(name)) {
      filtered[name] = defaults[name];
    }

    return filtered;
  }, {});
}

export function invariantConfigContext({ config } = {}) {
  invariant(
    config,
    '[React Config] Could not find required config object. ' +
    ' needs to exist in the component ancestry.'
  );
}

export function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  let keysA = Object.keys(objA);
  let keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  let bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

export function shouldConfigComponentUpdate(
  { props, state, context = {} },
  nextProps,
  nextState,
  nextContext = {}
) {
  const { config = {} } = context;
  const { config: nextConfig = {} } = nextContext;

  return (
    !shallowEquals(nextProps, props) ||
    !shallowEquals(nextState, state) ||
    !(
      nextConfig === config ||
      shallowEquals(
        filterProps(nextConfig, configCfgPropNames),
        filterProps(config, configCfgPropNames)
      )
    )
  );
}