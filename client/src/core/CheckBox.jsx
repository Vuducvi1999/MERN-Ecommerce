import React, { memo, useState } from "react";

function CheckBox({ categories, handleFilter }) {
  const [checked, setChecked] = useState([]);

  const handleChange =
    ((id) => {
      const newChecked = [...checked];
      const index = checked.indexOf(id);
      if (index !== -1) newChecked.splice(index, 1);
      else newChecked.push(id);
      setChecked(newChecked);
      handleFilter(newChecked, "category");
    });

  return (
    <>
      {categories &&
        categories.map((v) => (
          <li key={v._id}>
            <label className="form-check-label">
              <input
                onChange={() => handleChange(v._id)}
                type="checkbox"
                className="form-check-input"
              />
              {v.name}
            </label>
          </li>
        ))}
    </>
  );
}

export default memo(CheckBox);
