import { IconProps } from "../utils/types";

const Wallet: React.FC<IconProps> = ({ size = 24, className = "" }) => {

    const svgSize = `${size}px`;

    return (
      <svg
      className={className} height={svgSize} width={svgSize}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 0 1 0-2h13v2H5z" />
  </svg>
    );
};

export default Wallet;