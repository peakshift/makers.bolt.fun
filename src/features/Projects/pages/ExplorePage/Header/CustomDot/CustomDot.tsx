
const CustomDot = ({ onClick, active, ...rest }: any) => {

  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <div className={`
    rounded-full w-[8px] h-[8px]
    ${active ? "bg-white" : "bg-gray-400"}
    `}
      onClick={onClick}></div>
  );
};

export default CustomDot;