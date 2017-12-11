import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  colors,
  gamutColors,
  editorColors
} from '@codecademy/gamut-styles/variables';
import { Container } from '@codecademy/gamut/FlexBox';
import s from './Color-story.scss';

const infoOptions = {
  inline: true,
  source: false,
  propTables: false
};

const parseCamelCase = (string) => {
  return string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();
};

const getSassVariableName = (variablePrefix, variableSuffix) => {
  if (variablePrefix) {
    return `$${parseCamelCase(variablePrefix)}-${parseCamelCase(
      variableSuffix
    )}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const renderSwatch = (data, variablePrefix) => {
  return Object.keys(data).map((variableSuffix) => {
    const sassVariableName = getSassVariableName(
      variablePrefix,
      variableSuffix
    );
    return (
      <Container
        align="center"
        className={s.swatchContainer}
        key={sassVariableName}
      >
        <div
          className={s.swatch}
          style={{ backgroundColor: data[variableSuffix] }}
        />
        <div>
          <span className={s.name}>{sassVariableName}</span>
          <br />
          <span className={s.hexcode}>{data[variableSuffix]}</span>
        </div>
      </Container>
    );
  });
};

const stories = storiesOf('Visuals/Colors', module);

stories.add(
  'Portal (Current)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>portal base colors</h2>
        {renderSwatch(colors.portal)}
      </div>
      {Object.keys(colors.swatches).map((color) => {
        return (
          <div key={color}>
            <h2 className={s.heading}>{parseCamelCase(color)}</h2>
            {renderSwatch(colors.swatches[color], `swatches-${color}`)}
          </div>
        );
      })}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Gamut (New)',
  () => (
    <Container>
      <div>
        <h2 className={s.heading}>gamut base colors</h2>
        {renderSwatch(gamutColors.base, 'gamut')}
      </div>
      {Object.keys(gamutColors.swatches).map((color) => {
        return (
          <div key={color}>
            <h2 className={s.heading}>{parseCamelCase(`gamut-${color}`)}</h2>
            {renderSwatch(gamutColors.swatches[color], `gamut-${color}`)}
          </div>
        );
      })}
    </Container>
  ),
  infoOptions
);

stories.add(
  'Editor (Not in Use)',
  () => {
    const { white, black, ...platformRest } = editorColors;
    return (
      <div>
        <h2 className={s.heading}>editor colors</h2>
        {renderSwatch(
          {
            white,
            black
          },
          'swatches-basic'
        )}
        {renderSwatch(platformRest, 'swatches-code')}
      </div>
    );
  },
  infoOptions
);
