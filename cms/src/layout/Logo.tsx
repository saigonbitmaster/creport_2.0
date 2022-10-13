import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "@mui/material/styles";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <svg width={234.532} height={30} viewBox="0 0 62.053 5.417" {...props}>
      <g
        aria-label="App demo"
        style={{
          lineHeight: 1.25,
        }}
        fontWeight={400}
        fontSize={7.056}
        fontFamily="Permanent Marker"
        letterSpacing={0}
        wordSpacing={0}
        strokeWidth={0.265}
        fill="#ff6d00"
      >
        <text y="5" fontSize="1em">
        CREPORT CMS
        </text>
      </g>
    </svg>
  );
};

export default Logo;
