import { render } from "ink";
import SelectInput from "ink-select-input";
import type { Item } from "ink-select-input/build/SelectInput";
import React from "react";

const Demo = () => {
  const handleSelect = (item: Item<string>) => {
    console.log(item);
  };

  const items = [
    {
      label: "First",
      value: "first",
    },
    {
      label: "Second",
      value: "second",
    },
    {
      label: "Third",
      value: "third",
    },
  ];

  return <SelectInput items={items} onSelect={handleSelect} />;
};

render(<Demo />);
