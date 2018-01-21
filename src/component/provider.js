import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';

import { shouldConfigComponentUpdate, filterProps } from '../util';
import { configCfgPropTypes, configFormatPropTypes, configShape } from '../prop-type';
import * as configFns from '../function';

const configCfgPropNames = Object.keys(configCfgPropTypes);
const configFormatPropNames = Object.keys(configFormatPropTypes);

// These are not a static property on the ConfigProvider class so the config
// cfg values can be inherited from an ancestor.
const defaultProps = {
  configMessages: {},
};

export default class ConfigProvider extends Component {
  static displayName = 'ConfigProvider';

  static contextTypes = {
    config: configShape,
  };

  static childContextTypes = {
    config: configShape.isRequired,
  };

  static propTypes = {
    ...configCfgPropTypes,
    children: PropTypes.element.isRequired,
    initialNow: PropTypes.any,
  };

  constructor(props, context = {}) {
    super(props, context);

    const { config: configContext } = context;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.
    let initialNow;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <ConfigProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = configContext ? configContext.now() : Date.now();
    }

    this.state = {
      // Wrapper to provide stable "now" time for initial render.
      now: () => {
        return this._didDisplay ? Date.now() : initialNow;
      },
    };
  }

  getConfig() {
    const { config: cofigContext } = this.context;

    // Build a whitelisted config object from `props`, defaults, and
    // `context.config`, if an <ConfigProvider> exists in the ancestry.
    let config = filterProps(this.props, configCfgPropNames, cofigContext);

    // Apply default props. This must be applied last after the props have
    // been resolved and inherited from any <ConfigProvider> in the ancestry.
    // This matches how React resolves `defaultProps`.
    for (let propName in defaultProps) {
      if (config[propName] === undefined) {
        config[propName] = defaultProps[propName];
      }
    }

    return config;
  }

  getBoundFormatFns(config, state) {
    return configFormatPropNames.reduce((boundFormatFns, name) => {
      boundFormatFns[name] = configFns[name].bind(null, config, state);
      return boundFormatFns;
    }, {});
  }

  getChildContext() {
    const config = this.getConfig();
    const boundFormatFns = this.getBoundFormatFns(config, this.state);
    const { now } = this.state;

    return {
      config: {
        ...config,
        ...boundFormatFns,
        now,
      },
    };
  }

  shouldComponentUpdate(...next) {
    return shouldConfigComponentUpdate(this, ...next);
  }

  componentDidMount() {
    this._didDisplay = true;
  }

  render() {
    return Children.only(this.props.children);
  }
}