'use client';
import React, {
  useMemo,
  forwardRef,
  cloneElement,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  CSSProperties,
} from "react";

// Import the IconType from react-icons
import { IconType } from "react-icons";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

const ICON_SIZE_MAP = {
  small: 32,
  medium: 36,
  large: 40,
  xl: 48,
  lg: 40,
} as const;

const ICON_TYPES = [
  "home",
  "search",
  "notification",
  "message",
  "bookmark",
  "list",
  "profile",
  "more",
  "settings",
  "lock",
  "unlock",
  "sun",
  "moon",
  "circle",
  "square",
  "triangle",
  "warning",
  "share",
  "refresh",
  "back",
  "forward",
  "download",
  "redirect",
] as const;

type BuiltInIconType = (typeof ICON_TYPES)[number];
type PresetSize = keyof typeof ICON_SIZE_MAP;
type Variant = "solid" | "outline" | "ghost" | "gradient";
type ActionType = "refresh" | "redirect" | "download" | "back" | "forward";
type Size = PresetSize | number | `${number}px` | `${number}rem` | `${number}em`;
type TextOverflow = "nowrap" | "wrap" | "scroll";

interface IconBtnProps {
  type?: BuiltInIconType;
  icon?: ReactElement | IconType | any; // Added any as fallback for react-icons
  children?: ReactNode;
  label?: ReactNode;
  noIcon?: boolean;

  action?: ActionType | null;
  actionValue?: string;

  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;

  color?: string;
  bgColor?: string;
  variant?: Variant;

  size?: Size;
  text?: string;
  textOverflow?: TextOverflow;
  maxTextWidth?: string | number;

  animation?: boolean;
  disabled?: boolean;

  wrapperRadius?: CSSProperties["borderRadius"];
  rounded?: boolean | CSSProperties["borderRadius"];

  className?: string;
  style?: CSSProperties;

  title?: string;
  tooltip?: string;
  ariaLabel?: string;

  fullWidth?: boolean;
  asChild?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

const parseSize = (size: Size = "medium"): number | string => {
  if (typeof size === "number") return size;
  if (/^\d+$/.test(size)) return Number(size);
  if (/^\d+(px|rem|em|%)$/.test(size)) return size;
  const normalized = size === "lg" ? "large" : size;
  return ICON_SIZE_MAP[normalized as PresetSize] || 36;
};

const isDarkColor = (color: string): boolean => {
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  let hex = color.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  }
  const darkNames = ["black", "#000", "#000000", "dark", "dimgray", "dimgrey"];
  return darkNames.includes(color.toLowerCase());
};

const getEffectiveStrokeColor = (customColor?: string, bgColor?: string, variant: Variant = "solid"): string => {
  if (customColor) return customColor;
  if (variant === "outline") return bgColor || "currentColor";
  if (!bgColor) return "black";
  return isDarkColor(bgColor) ? "white" : "black";
};

const executeAction = (action?: ActionType | null, value?: string) => {
  switch (action) {
    case "refresh": window.location.reload(); break;
    case "redirect": if (value) window.location.href = value; break;
    case "download":
      if (value) {
        const anchor = document.createElement("a");
        anchor.href = value;
        anchor.download = "";
        anchor.click();
      }
      break;
    case "back": window.history.back(); break;
    case "forward": window.history.forward(); break;
  }
};

/* -------------------------------------------------------------------------- */
/*                                ICONS                                       */
/* -------------------------------------------------------------------------- */

const createStrokeIcon = (path: string, baseProps: React.SVGProps<SVGSVGElement>) => (
  <svg {...baseProps}>
    <path d={path} />
  </svg>
);

const MoonIcon = ({ size, color }: { size: number | string; color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={size} height={size} fill={color}>
    <path d="M380-160q133 0 226.5-93.5T700-480q0-133-93.5-226.5T380-800h-21q-10 0-19 2 57 66 88.5 147.5T460-480q0 89-31.5 170.5T340-162q9 2 19 2h21Zm0 80q-53 0-103.5-13.5T180-134q93-54 146.5-146T380-480q0-108-53.5-200T180-826q46-27 96.5-40.5T380-880q83 0 156 31.5T663-763q54 54 85.5 127T780-480q0 83-31.5 156T663-197q-54 54-127 85.5T380-80Zm80-400Z" />
  </svg>
);

const ProfileIcon = ({ size, color }: { size: number | string; color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width={size} height={size} fill={color}>
    <path d="m480-114-98-98H232q-26 0-43-17t-17-43v-496q0-26 17-43t43-17h496q26 0 43 17t17 43v496q0 26-17 43t-43 17H578l-98 98ZM200-266q54-53 125.5-83.5T480-380q83 0 154.5 30.5T760-266v-502q0-12-10-22t-22-10H232q-12 0-22 10t-10 22v502Zm361-243q33-33 33-81t-33-81q-33-33-81-33t-81 33q-33 33-33 81t33 81q33 33 81 33t81-33ZM222-240h516v-6q-56-54-121.5-80T480-352q-69 0-135 25.5T222-248v8Zm197.5-289.5Q394-555 394-590t25.5-60.5Q445-676 480-676t60.5 25.5Q566-625 566-590t-25.5 60.5Q515-504 480-504t-60.5-25.5ZM480-533Z" />
  </svg>
);

const createIcons = (
  baseSvgProps: React.SVGProps<SVGSVGElement>,
  strokeColor: string,
  iconSize: number | string
): Record<BuiltInIconType, ReactElement> => ({
  home: createStrokeIcon("M240-200h156v-234h168v234h156v-360L480-742 240-560v360Z", baseSvgProps),
  search: createStrokeIcon("M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z", baseSvgProps),
  notification: createStrokeIcon("M212-212v-28h60v-328q0-77 49.5-135T446-774v-20q0-14 10-24t24-10q14 0 24 10t10 24v20q75 13 124.5 71T688-568v328h60v28H212Z", baseSvgProps),
  message: createStrokeIcon("M132-180v-588q0-26 17-43t43-17h576q26 0 43 17t17 43v416q0 26-17 43t-43 17H244L132-180Z", baseSvgProps),
  bookmark: createStrokeIcon("M252-198v-530q0-26 17-43t43-17h336q26 0 43 17t17 43v530l-228-98-228 98Z", baseSvgProps),
  list: createStrokeIcon("M347.54-299.39q10.15-10.15 10.15-25.23 0-15.07-10.15-25.23Q337.38-360 322.31-360q-15.08 0-25.23 10.15-10.16 10.16-10.16 25.23 0 15.08 10.16 25.23 10.15 10.16 25.23 10.16 15.07 0 25.23-10.16Zm0-155.38q10.15-10.15 10.15-25.23t-10.15-25.23q-10.16-10.15-25.23-10.15-15.08 0-25.23 10.15-10.16 10.15-10.16 25.23t10.16 25.23q10.15 10.15 25.23 10.15 15.07 0 25.23-10.15Zm0-155.38q10.15-10.16 10.15-25.23 0-15.08-10.15-25.23-10.16-10.16-25.23-10.16-15.08 0-25.23 10.16-10.16 10.15-10.16 25.23 0 15.07 10.16 25.23Q307.23-600 322.31-600q15.07 0 25.23-10.15Zm96.31 315.53h227.69v-59.99H443.85v59.99Zm0-155.38h227.69v-60H443.85v60Zm0-155.39h227.69v-59.99H443.85v59.99ZM212.31-140Q182-140 161-161q-21-21-21-51.31v-535.38Q140-778 161-799q21-21 51.31-21h535.38Q778-820 799-799q21 21 21 51.31v535.38Q820-182 799-161q-21 21-51.31 21H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Z", baseSvgProps),
  profile: <ProfileIcon size={baseSvgProps.width} color={strokeColor} />,
  more: createStrokeIcon("M249.23-420q-24.75 0-42.37-17.63-17.63-17.62-17.63-42.37 0-24.75 17.63-42.37Q224.48-540 249.23-540q24.75 0 42.38 17.63 17.62 17.62 17.62 42.37 0 24.75-17.62 42.37Q273.98-420 249.23-420ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm230.77 0q-24.75 0-42.38-17.63-17.62-17.62-17.62-42.37 0-24.75 17.62-42.37Q686.02-540 710.77-540q24.75 0 42.37 17.63 17.63 17.62 17.63 42.37 0 24.75-17.63 42.37Q735.52-420 710.77-420Z", baseSvgProps),
  settings: createStrokeIcon("m432-132-20-126q-23-8-43.5-20T328-304l-118 52-76-132 102-78q-4-23-4-46t4-46l-102-78 76-132 118 52q17-17 37.5-29t43.5-20l20-126h152l20 126q23 8 43.5 20t37.5 29l118-52 76 132-102 78q4 23 4 46t-4 46l102 78-76 132-118-52q-17 17-37.5 29T604-258l-20 126H432Z", baseSvgProps),
  lock: createStrokeIcon("M264-132q-26 0-43-17t-17-43v-336q0-26 17-43t43-17h36v-72q0-75 52.5-127.5T480-840q75 0 127.5 52.5T660-660v72h36q26 0 43 17t17 43v336q0 26-17 43t-43 17H264Zm0-60h432v-336H264v336Zm216-102q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM360-660h240v-72q0-50-35-85t-85-35q-50 0-85 35t-35 85v72ZM264-192v-336 336Z", baseSvgProps),
  unlock: createStrokeIcon("M264-132q-26 0-43-17t-17-43v-336q0-26 17-43t43-17h288v-72q0-50-35-85t-85-35q-38 0-67 20.5T354-674q-7 15-21 21t-29-2q-15-8-20.5-23t2.5-30q23-53 71.5-84.5T480-840q75 0 127.5 52.5T660-660v72h36q26 0 43 17t17 43v336q0 26-17 43t-43 17H264Zm0-60h432v-336H264v336Zm216-102q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM264-192v-336 336Z", baseSvgProps),
  sun: createStrokeIcon("M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-90-90 56-56 90 90-56 56Zm482 482-90-90 56-56 90 90-56 56Zm-56-482 90-90 56 56-90 90-56-56ZM198-168l-56-56 90-90 56 56-90 90Z", baseSvgProps),
  moon: <MoonIcon size={baseSvgProps.width} color={strokeColor} />,
  circle: createStrokeIcon("M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Z", baseSvgProps),
  square: createStrokeIcon("M212-212v-536h536v536H212Z", baseSvgProps),
  triangle: createStrokeIcon("M480-720 840-240H120l360-480Z", baseSvgProps),
  warning: createStrokeIcon("M40-120q-11 0-20-5.5T7-140q-4-9-4-19t5-20l440-760q5-10 14.5-15.5T480-960q10 0 19.5 5.5T514-939l440 760q5 10 5 20t-4 19q-4 9-13 14.5t-20 5.5H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-160h80v-240h-80v240Z", baseSvgProps),
  share: createStrokeIcon("M720-120q-50 0-85-35t-35-85q0-9 2-22.5t6-26.5L334-440q-20 18-44 29t-52 11q-52 0-88-36t-36-88q0-52 36-88t88-36q28 0 52 11t44 29l274-151q-4-12-6-25t-2-23q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-28 0-52-11t-44-29L334-520q4 13 6 26t2 22q0 9-2 22t-6 26l274 151q20-17 44-28.5t52-11.5q50 0 85 35t35 85q0 50-35 85t-85 35Z", baseSvgProps),
  refresh: createStrokeIcon("M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q77 0 143 34t109 94V-760h60v200H580v-60h102q-34-64-92.5-102T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q84 0 148-52t82-132h62q-20 110-105 182t-187 72Z", baseSvgProps),
  back: createStrokeIcon("M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z", baseSvgProps),
  forward: createStrokeIcon("M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z", baseSvgProps),
  download: createStrokeIcon("M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z", baseSvgProps),
  redirect: createStrokeIcon("M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm280-280-56-56 344-344H600v-80h280v280h-80v-168L480-400Z", baseSvgProps),
});

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const IconBtn = forwardRef<HTMLElement, IconBtnProps>(
  (
    {
      type = "home",
      icon,
      children,
      label,
      noIcon = false,
      action = null,
      actionValue = "",
      onClick,
      onKeyDown,
      color,
      bgColor = "#ccc",
      variant = "solid",
      size = "medium",
      text = "",
      textOverflow = "nowrap",
      maxTextWidth,
      animation = true,
      disabled = false,
      wrapperRadius,
      rounded,
      className = "",
      style,
      title,
      tooltip,
      ariaLabel,
      fullWidth = false,
      asChild = false,
    },
    ref
  ) => {
    const wrapperSize = useMemo(() => parseSize(size), [size]);

    const iconSize = useMemo(() => {
      if (typeof wrapperSize === "number") return wrapperSize * 0.5;
      return `calc(${wrapperSize} * 0.6)`;
    }, [wrapperSize]);

    // Handle gradient variant
    const isGradient = variant === "gradient";
    const finalBgColor = isGradient ? "transparent" : (variant === "outline" ? "transparent" : bgColor);
    const strokeColor = useMemo(
      () => getEffectiveStrokeColor(color, bgColor, variant === "outline" ? "outline" : "solid"),
      [color, bgColor, variant]
    );

    // Gradient style for gradient variant
    const gradientStyle = isGradient ? {
      background: `linear-gradient(135deg, #FFAA00 0%, #FFD700 100%)`,
      color: "#1a1a1a",
    } : {};

    const baseSvgProps = useMemo<React.SVGProps<SVGSVGElement>>(
      () => ({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 -960 960 960",
        width: iconSize,
        height: iconSize,
        fill: "none",
        stroke: isGradient ? "#1a1a1a" : strokeColor,
        strokeWidth: 48,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
      [iconSize, strokeColor, isGradient]
    );

    const icons = useMemo(
      () => createIcons(baseSvgProps, isGradient ? "#1a1a1a" : strokeColor, iconSize),
      [baseSvgProps, strokeColor, iconSize, isGradient]
    );

    const isSvgElement = (node: ReactNode): node is ReactElement => {
      if (!isValidElement(node)) return false;
      const element = node as ReactElement;
      return (
        element.type === 'svg' ||
        (element.props && ('viewBox' in element.props || 'xmlns' in element.props))
      );
    };

    // IMPROVED: Check if icon is a react-icons component
    // react-icons components are functions that return JSX
    const isReactIcon = (node: unknown): node is IconType => {
      if (typeof node !== 'function') return false;
      // Try to detect react-icons by checking if it's a function that looks like a react component
      const nodeFn = node as any;
      // Check for react-icons specific properties or the fact that it's a function that doesn't return a simple element
      return (
        nodeFn?.name?.startsWith('Fi') ||
        nodeFn?.name?.startsWith('Fa') ||
        nodeFn?.name?.startsWith('Md') ||
        nodeFn?.name?.startsWith('Ai') ||
        nodeFn?.name?.startsWith('Bs') ||
        nodeFn?.name?.startsWith('Cg') ||
        nodeFn?.name?.startsWith('Di') ||
        nodeFn?.name?.startsWith('Gi') ||
        nodeFn?.name?.startsWith('Go') ||
        nodeFn?.name?.startsWith('Gr') ||
        nodeFn?.name?.startsWith('Hi') ||
        nodeFn?.name?.startsWith('Io') ||
        nodeFn?.name?.startsWith('Im') ||
        nodeFn?.name?.startsWith('Io5') ||
        nodeFn?.name?.startsWith('Lu') ||
        nodeFn?.name?.startsWith('Pi') ||
        nodeFn?.name?.startsWith('Ri') ||
        nodeFn?.name?.startsWith('Si') ||
        nodeFn?.name?.startsWith('Sl') ||
        nodeFn?.name?.startsWith('Tb') ||
        nodeFn?.name?.startsWith('Ti') ||
        nodeFn?.name?.startsWith('Vsc') ||
        nodeFn?.name?.startsWith('Wi')
      );
    };

    // Render icon - IMPORTANT: icon prop takes priority over type
    const renderIcon = () => {
      if (noIcon) return null;
      
      // PRIORITY 1: Explicit icon prop (react-icons component or ReactElement)
      if (icon) {
        // Check if it's a react-icons component (function)
        if (typeof icon === 'function') {
          // It's a react-icons component - render it directly
          const IconComponent = icon;
          const finalSize = typeof iconSize === 'number' ? iconSize : 20;
          return <IconComponent size={finalSize} style={{ color: isGradient ? "#1a1a1a" : strokeColor }} />;
        }
        // Check if it's a React element
        if (isValidElement(icon)) {
          return cloneElement(icon, { width: iconSize, height: iconSize, style: { color: isGradient ? "#1a1a1a" : strokeColor } });
        }
      }
      
      // PRIORITY 2: Children as SVG (custom SVG)
      if (isSvgElement(children)) {
        return cloneElement(children as ReactElement, { width: iconSize, height: iconSize });
      }
      
      // PRIORITY 3: Default built-in type
      if (type && icons[type]) {
        return icons[type];
      }
      
      return null;
    };

    const renderedIcon = renderIcon();

    // Label: only if children is NOT used as icon AND not overridden by label/text
    const getLabelNode = () => {
      if (label !== undefined) return label;
      if (text !== undefined && text !== '') return text;
      // If children exists and is not an SVG, use it as label
      if (children !== undefined && children !== null && !isSvgElement(children)) {
        return children;
      }
      return null;
    };
    const labelNode = getLabelNode();
    const hasLabel = labelNode != null && labelNode !== '';

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      executeAction(action, actionValue);
      onClick?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick(event as unknown as MouseEvent<HTMLElement>);
      }
      onKeyDown?.(event);
    };

    let buttonWidth: string | number | undefined;
    if (fullWidth) {
      buttonWidth = "100%";
    } else if (hasLabel) {
      buttonWidth = "auto";
    } else {
      buttonWidth = wrapperSize;
    }

    const borderRadiusVal =
      rounded === true ? "9999px" : rounded || wrapperRadius || (hasLabel ? "12px" : "50%");

    const getTextStyles = (): CSSProperties => {
      const base: CSSProperties = {
        fontSize: "0.8rem",
        fontWeight: 500,
        lineHeight: 1,
      };
      
      if (isGradient) {
        base.color = "#1a1a1a";
      } else {
        base.color = strokeColor;
      }
      
      switch (textOverflow) {
        case "wrap":
          return { ...base, whiteSpace: "normal", wordBreak: "break-word" };
        case "scroll":
          return {
            ...base,
            whiteSpace: "nowrap",
            overflowX: "auto",
            maxWidth: maxTextWidth ?? "100%",
            display: "block",
          };
        default:
          return { ...base, whiteSpace: "nowrap" };
      }
    };

    const baseProps = {
      ref,
      title: tooltip || title,
      "aria-label": ariaLabel || type,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      role: "button",
      tabIndex: disabled ? -1 : 0,
      className: `
        inline-flex items-center justify-center gap-2
        outline-none select-none
        ${animation ? "transition-transform duration-200 hover:scale-105 active:scale-95" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `,
      style: {
        width: buttonWidth,
        height: wrapperSize,
        borderRadius: borderRadiusVal,
        backgroundColor: finalBgColor,
        boxShadow: variant === "solid" ? "0 2px 10px rgba(0,0,0,0.08)" : isGradient ? "0 2px 15px rgba(255, 170, 0, 0.3)" : "none",
        border: variant === "outline" ? `2px solid ${strokeColor}` : "none",
        padding: hasLabel ? "0 12px" : 0,
        ...gradientStyle,
        ...style,
      } as CSSProperties,
    };

    const content = (
      <>
        {renderedIcon}
        {hasLabel && typeof labelNode === "string" ? (
          <span style={getTextStyles()}>{labelNode}</span>
        ) : hasLabel ? (
          labelNode
        ) : null}
      </>
    );

    if (asChild) {
      if (!isValidElement(children)) {
        console.warn("IconBtn: asChild is true but no valid child element provided. Falling back to button.");
        return (
          <button type="button" disabled={disabled} {...baseProps}>
            {content}
          </button>
        );
      }

      const child = children as ReactElement;
      const mergedClassName = [child.props.className, baseProps.className].filter(Boolean).join(" ");
      const mergedStyle = { ...baseProps.style, ...child.props.style };

      return cloneElement(child, {
        ...baseProps,
        className: mergedClassName,
        style: mergedStyle,
        ref: (node: HTMLElement) => {
          const originalRef = (child as any).ref;
          if (typeof originalRef === "function") originalRef(node);
          else if (originalRef) originalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        },
        children: content,
      });
    }

    return (
      <button type="button" disabled={disabled} {...baseProps}>
        {content}
      </button>
    );
  }
);

IconBtn.displayName = "IconBtn";

export default IconBtn;