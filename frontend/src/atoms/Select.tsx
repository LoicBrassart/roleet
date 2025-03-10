import ReactSelect from "react-select";
export const Select = (props) => <ReactSelect {...props} />;
export type Option = {
  value: string;
  label: string;
};
// TODO type props
