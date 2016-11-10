import React from 'react';
import Select from '../../UI/Select';

const PackageStep = ({
  autoDetectedOperator, operator, altOperators, onChange
}) => {
  let finalOptions;
  let operators = altOperators ? altOperators.slice() : [];

  if (operator) {
    operators.push(operator);
  }

  if (autoDetectedOperator) {
    autoDetectedOperator = operators.find(o => o.slug === autoDetectedOperator);
    operators = operators.filter(o => o.slug !== autoDetectedOperator.slug);
  }

  operators = operators.sort((a, b) =>
    (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
  );

  const options = operators.map(o =>
    <option value={o.slug} key={o.slug}>
      {o.name}
    </option>
  );

  // Build operator options list
  if (autoDetectedOperator) {
    finalOptions = [
      <optgroup label="Auto detected" key="1">
        <option value={autoDetectedOperator.slug}>
          {autoDetectedOperator.name}
        </option>
      </optgroup>,
      <optgroup label="Other available operators" key="2">
        {options}
      </optgroup>
    ];
  } else {
    finalOptions = [
      <option key="0" disabled={true} value="">Select your operator...</option>,
      options
    ];
  }


  // Render final component
  return (
    <Select
      id="operator"
      name="operator"
      defaultValue={operator ? operator.slug : ''}
      onChange={(e) => {
        const value = e.target.value;
        onChange(value);
      }}
    >
      {finalOptions}
    </Select>
  );
};

export default PackageStep;

