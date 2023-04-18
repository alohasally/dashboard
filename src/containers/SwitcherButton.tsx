import tw from "tailwind-styled-components";

const SwitcherBtton = tw.button<{ $isSelected: boolean }>`
    w-[292px]
    text-[18px] font-bold
    border
    py-[16px]
    ${({ $isSelected }) =>
      $isSelected
        ? "text-white border-[#0092A2] bg-[#0092A2]"
        : "text-black/40 border-black-40 bg-white"}`;

export default SwitcherBtton;
