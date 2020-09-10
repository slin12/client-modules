import {
  ThematicConfig,
  ThematicProps,
  Handler,
  AbstractTheme,
  StyleTemplate,
} from './types';

import { directional, responsiveProperty, standard } from './templateStyles';
import { css } from '@emotion/core';

const typeMap = {
  standard: standard,
  directional: directional,
};

export function createHandler<T extends Record<string, unknown>>(
  styleTemplate: StyleTemplate<T>,
  propName: keyof T
): Handler<T> {
  const propNames = [propName];
  const handler: Handler<T> = responsiveProperty<T>(styleTemplate, propNames);
  handler.propNames = propNames;
  handler.templateFn = styleTemplate;
  return handler;
}

export function compose<T extends Record<string, unknown>>(
  ...handlers: Handler<T>[]
) {
  let propNames: (keyof T)[] = [];
  handlers.forEach((handler) => {
    if (handler.propNames) {
      propNames = propNames.concat(handler.propNames);
    }
  });

  const composedHandler: Handler<T> = responsiveProperty<T>(
    (props: T) =>
      css`
        ${handlers.map((handler) => handler(props, true))}
      `,
    propNames
  );

  composedHandler.propNames = propNames;

  return composedHandler;
}

export const createSystem = <T extends AbstractTheme>(theme: T) => {
  return <K extends ThematicConfig<T>, P extends ThematicProps<T, K>>(
    config: K
  ) => {
    const { propName, computeValue, type = 'standard' } = config;
    const templateFunction = typeMap[type];
    let systemHandler;

    if (typeof propName === 'string') {
      const styleFunction = templateFunction<P, K>(propName, computeValue);
      systemHandler = createHandler<P>(styleFunction, propName);
    } else {
      const composite: Handler<P>[] = [];
      propName.forEach((propKey) => {
        const styleFunction = templateFunction<P, K>(propKey, computeValue);
        const propHandler = createHandler<P>(styleFunction, propKey);

        composite.push(propHandler);
      });

      systemHandler = compose<P>(...composite);
    }

    return systemHandler;
  };
};

export const registerHandler = createSystem({});