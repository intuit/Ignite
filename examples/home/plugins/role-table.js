import get from 'lodash.get';
import React from 'react';
import PropTypes from 'prop-types';

const getEnumVal = decl => get(decl, 'const') || get(decl, 'enum.0');

const roleRow = schema => (
  <tr>
    <td>{getEnumVal(schema)}</td>
    <td>{schema.description}</td>
  </tr>
);

const RoleTable = ({ oneOf }) => {
  console.log('loaded plugin to my plugin');
  if (!oneOf) return '';

  return (
    <div styles={{ marginTop: 40 }}>
      <h4>Role</h4>
      <table>
        <thead>
          <tr>
            <td>Role</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>{oneOf.map(roleRow)}</tbody>
      </table>
    </div>
  );
};

RoleTable.propTypes = {
  oneOf: PropTypes.array
};

RoleTable.defaultProps = {
  oneOf: null
};

export default RoleTable;
