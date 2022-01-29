import { ValueState } from "@ui5/webcomponents-react/dist/ValueState";

const Formatter = {
  stockState: (state) => {
    const stockTable = {
      "Plenty of Stock": ValueState.Success,
      Shortage: ValueState.Warning,
      "Out of Stock": ValueState.Error,
    };

    return stockTable[state];
  },

  localeNumber: (number) => {
    return Intl.NumberFormat().format(number);
  },
};

export default Formatter;
