import React from "react";

type Color = "default" | "white" | "custom2" | "custom3" | "custom4";

type Variant = "solid" | "outline" | "ghost";
type BorderRadius = "none" | "small" | "medium" | "large" | "full";

type ButtonProps = {
  label?: string;
  color?: Color;
  outLineColor?: string;
  size?: "default" | "medium" | "large" | "custom";
  variant?: Variant;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  width?: string;
  height?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  borderRadius?: "none" | "small" | "medium" | "large" | "full";
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  label,
  color = "default",
  size = "default",
  variant = "solid",
  disabled = false,
  onClick,
  width = "auto",
  height = "32px",
  icon,
  iconPosition = "left",
  borderRadius = "small",
  className,
  outLineColor,
  type = "button",
  isLoading = false,
  style,
}) => {
  // Dynamic classes for color
  const colorClasses = {
    default: "bg-primary text-white hover:bg-background-hover",
    white: "bg-transparent text-black",
    custom2:
      "bg-green-100 text-black border border-border-gray-200 hover:bg-[#F5F5F5]",
    custom3: `bg-white text-primary ${
      outLineColor ? outLineColor : "border-primary"
    } border-[1px] hover:bg-transparent font-normal`,
    custom4: "bg-background-custom border border-border-custom",
  };

  // Dynamic classes for size
  const sizeClasses = {
    default: "py-2 px-4 text-sm font-normal",
    medium: "py-2 px-4 text-base font-normal",
    large: "py-3 px-6 text-lg font-normal",
    custom: "py-1 px-3 text-sm font-normal",
  };

  // Dynamic classes for variants
  const variantClasses = {
    solid: `${colorClasses[color]}`,
    outline: `border-[1px] ${colorClasses[color]} bg-transparent`,
    ghost: `text-${color}-500 bg-transparent hover:bg-${color}-100`,
  };

  const borderRadiusClasses: Record<BorderRadius, string> = {
    none: "rounded-none",
    small: "rounded-vm",
    medium: "rounded-lg",
    large: "rounded-2xl",
    full: "rounded-3xl",
  };

  // Disabled styles
  const disabledClasses = `
    opacity-50 cursor-not-allowed 
    border-border-default bg-[#F5F5F5] text-[#A0A0A0] font-normal
  `;

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center focus:outline-none transition duration-300 
        ${sizeClasses[size]} ${
        disabled || isLoading ? disabledClasses : variantClasses[variant]
      } 
        ${borderRadiusClasses[borderRadius]}
        flex items-center justify-center gap-2
        ${className}
      `}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      onClick={!disabled && !isLoading ? onClick : undefined}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="icon">{icon}</span>
          )}
          {label}
          {icon && iconPosition === "right" && (
            <span className="icon">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
