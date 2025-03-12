import { useState } from "react";
import Select, { SelectProps } from "../components/Select";
import "../index.css";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    list: { control: "array" },
    maxSelections: { control: "number" },
    placeholder: { control: "text" },
    onChange: { action: "The state of values was changed" },
  },
};

const Template = (args: SelectProps) => {
  const [selected, setSelected] = useState<string[]>(args.value || []);
  return (
    <div className="p-4 w-md">
      <Select {...args} value={selected} onChange={setSelected} />
    </div>
  );
};

export const Default = Template.bind({}) as any;
Default.args = {
  list: [
    "pikachu",
    "raichu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "beedrill",
    "pidgey",
  ],
  maxSelections: 1,
  placeholder: "Search Pokémon...",
};

export const WithPreselectedValues = Template.bind({}) as any;
WithPreselectedValues.args = {
  list: ["pikachu", "raichu", "bulbasaur", "charmander", "squirtle"],
  value: ["pikachu"],
  maxSelections: 1,
  placeholder: "Search Pokémon...",
};

export const MultiSelect = Template.bind({}) as any;
MultiSelect.args = {
  list: [
    "pikachu",
    "raichu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
    "meowth",
  ],
  maxSelections: 3,
  placeholder: "Select up to 3 Pokémon...",
};

export const CustomPlaceHolder = Template.bind({}) as any;
CustomPlaceHolder.args = {
  list: [
    "pikachu",
    "raichu",
    "bulbasaur",
    "charmander",
    "squirtle",
    "jigglypuff",
    "meowth",
  ],
  maxSelections: 3,
  placeholder: "Custom Placeholder",
};
