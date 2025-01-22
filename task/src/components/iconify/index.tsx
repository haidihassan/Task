import React from "react";
import { Icon } from "@iconify/react";

interface IconifyProps {
  icon: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  className?: string;
}

const Iconify: React.FC<IconifyProps> = ({
  icon,
  width = 24,
  height = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <Icon
      icon={icon}
      width={width}
      height={height}
      color={color}
      className={className}
    />
  );
};

export default Iconify;
