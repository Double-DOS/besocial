import React from "react";
import { SvgXml } from "react-native-svg";
export default function CreatePostButton() {
  const svgMarkup = `
<svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1H25C28.866 1 32 4.13401 32 8V17C32 20.866 28.866 24 25 24H8C4.13401 24 1 20.866 1 17V8C1 4.13401 4.13401 1 8 1Z" fill="white"/>
<path d="M8 1.5H25C28.5899 1.5 31.5 4.41015 31.5 8V17C31.5 20.5899 28.5899 23.5 25 23.5H8C4.41015 23.5 1.5 20.5899 1.5 17V8C1.5 4.41015 4.41015 1.5 8 1.5Z" stroke="white"/>
<path d="M7 0H24C27.866 0 31 3.13401 31 7V16C31 19.866 27.866 23 24 23H7C3.13401 23 0 19.866 0 16V7C0 3.13401 3.13401 0 7 0Z" fill="url(#paint0_linear_410_197)"/>
<path d="M7 0.5H24C27.5899 0.5 30.5 3.41015 30.5 7V16C30.5 19.5899 27.5899 22.5 24 22.5H7C3.41015 22.5 0.5 19.5899 0.5 16V7C0.5 3.41015 3.41015 0.5 7 0.5Z" stroke="white"/>
<path d="M11.396 11.6846H19.318H11.396Z" fill="#7650FF"/>
<path d="M11.396 11.6846H19.318" stroke="white" stroke-width="3" stroke-linecap="square"/>
<path d="M15.353 15.6465L15.353 7.72448L15.353 15.6465Z" fill="#7650FF"/>
<path d="M15.353 15.6465L15.353 7.72448" stroke="white" stroke-width="3" stroke-linecap="square"/>
<defs>
<linearGradient id="paint0_linear_410_197" x1="26.567" y1="2.07" x2="11.9966" y2="28.9091" gradientUnits="userSpaceOnUse">
<stop stop-color="#7650FF"/>
<stop offset="0.483" stop-color="#EF258A"/>
<stop offset="1" stop-color="#FFCE00"/>
</linearGradient>
</defs>
</svg>
`;

  return <SvgXml xml={svgMarkup} width="301px" />;
}
