import SVGIcon from "./SVGIcon";

interface Props {
  name: string;
  label: string;
}

const IconButton = ({ name, label }: Props) => {
  return (
    <button className="flex items-center space-x-2 px-4 gap-4 cursor-pointer ">
      {name === "createPlaylist" ? (
        <div className="relative icon flex justify-center">
          <div className="flex items-center justify-center bg-white text-black h-full w-full absolute opacity-70 hover:opacity-100">
            <SVGIcon name={name} width="12px" height="12px" fill="fill-black" />
          </div>
        </div>
      ) : name === "liked" ? (
        <div className="relative icon flex justify-center">
          <div className="flex items-center justify-center bg-[linear-gradient(135deg,#450af5,#c4efd9)] text-black h-full w-full absolute opacity-70 hover:opacity-100">
            <SVGIcon name={name} width="12px" height="12px" fill="fill-while" />
          </div>
        </div>
      ) : (
        <SVGIcon
          name={name}
          width="24px"
          height="24px"
          fill="fill-currentcolor"
          hover="hover:fill-white"
        />
      )}
      <span className="hover:text-white hover:ease-in duration-300">
        {label}
      </span>
    </button>
  );
};

export default IconButton;
