import React, { Component } from 'react';
import invariant from 'invariant';

import { configShape } from './prop-type';
import { invariantConfigContext } from './util';

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export default function injectConfig(WrappedComponent, options = {}) {
  const { configPropName = 'config', withRef = false } = options;

  class InjectConfig extends Component {
    static displayName = injectConfig(${getDisplayName(WrappedComponent) });

    static contextTypes = {
      config: configShape,
    };

    static WrappedComponent = WrappedComponent;

    constructor(props, context) {
      super(props, context);
      invariantConfigContext(context);
    }

    getWrappedInstance() {
      invariant(
        withRef,
        '[React Config] To access the wrapped instance, ' +
        'the `{withRef: true}` option must be set when calling: ' +
        '`injectConfig()`'
      );

      return this.refs.wrappedInstance;
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...{ [configPropName]: this.context.config }}
          ref={withRef ? 'wrappedInstance' : null}
        />
      );
    }
  }

  return InjectConfig;
}