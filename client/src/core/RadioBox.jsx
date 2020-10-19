import React, { memo } from "react";

const fixedRange = [
  { id: 0, array: [], name: "Any" },
  { id: 1, array: [0, 9], name: "$0 to $9" },
  { id: 2, array: [10, 19], name: "$10 to $19" },
  { id: 3, array: [20, 29], name: "$20 to $29" },
  { id: 4, array: [30, 39], name: "$30 to $39" },
];

function RadioBox({ handleFilter }) {
  const handleChange =
    ((id) => {
      const result = fixedRange.find((i) => i.id === id);
      handleFilter(result.array, "price");
    });

  return (
    <>
      {fixedRange.map((p) => (
        <li key={p.id}>
          <label className="form-check-label">
            <input
              onChange={() => handleChange(p.id)}
              type="radio"
              name="price"
              className="form-check-input"
            />
            {p.name}
          </label>
        </li>
      ))}
    </>
  );
}

export default memo(RadioBox);
