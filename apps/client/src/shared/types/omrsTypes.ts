export type TKeypadItem = {
  value: string;
  label?: string;
  colSpan?: 1 | 2 | 3;
  ariaLabel?: string;
  icon?: React.ReactNode;
};
