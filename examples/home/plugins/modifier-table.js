import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const getEnumVal = decl => _.get(decl, 'const') || _.get(decl, 'enum.0');

const TableRow = props => {
  if (!props.id) {
    return;
  }

  const { type } = props.properties;
  const value =
    getEnumVal(_.get(props, 'properties.value')) || _.camelCase(props.title);

  const example = {
    type: getEnumVal(type),
    value
  };

  return (
    <tr>
      <td>{value}</td>
      <td>{type.enum}</td>
      <td>{props.description}</td>
      <td>
        <pre>{JSON.stringify(props.example || example, null, 2)}</pre>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  example: PropTypes.object,
  properties: PropTypes.object
};

TableRow.defaultProps = {
  id: null,
  description: null,
  title: null,
  example: null,
  properties: null
};

const ModifierTable = items => {
  if (!items || !items.items) return null;

  return (
    <div styles={{ marginTop: 40 }}>
      <h4>Modifiers</h4>
      <table>
        <thead>
          <tr>
            <td>Modifier</td>
            <td>Type</td>
            <td>Description</td>
            <td style={{ width: '40%' }}>Sample</td>
          </tr>
        </thead>
        <tbody>{_.map(items.items.anyOf, TableRow)}</tbody>
      </table>
    </div>
  );
};

export default ModifierTable;
