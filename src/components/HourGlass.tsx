interface HourGlassProps {
  color?: string;
  progress: number;
  width?: number;
}

export function HourGlass(props: HourGlassProps) {
  const sandHeightRate = 0.3;

  const ceilHeight = 15;
  const sandHeight = 434.66;
  const yOffset = ceilHeight;
  const clipPathY = `${sandHeight * (1-sandHeightRate) * props.progress + yOffset}`;
  const clipPathHeight = sandHeight * sandHeightRate - yOffset;

  return (
    <div style={{ width: props.width }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.02 434.66">
        <defs>
          <style>
            {`.cls-1{fill:${props.color};}.cls-1,.cls-2{stroke:#231815;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#b5b5b6;}.cls-3{fill:#231815;stroke-width:0px;}`}
          </style>
          <clipPath id="sandClip">
            {/* Dynamic clip path based on progress */}
            <rect x="0" y={clipPathY} width="237.02" height={clipPathHeight} />
          </clipPath>
        </defs>
        <g id="base">
          <path className="cls-2" d="M151.8,188.94L224.55,19.32H12.47l72.75,169.62c8.16,19.03,8.1,40.58-.16,59.56L12.47,415.34h212.07l-72.59-166.84c-8.26-18.98-8.32-40.53-.16-59.56Z" />
          <path className="cls-3" d="M227.36,0H9.66C4.32,0,0,4.32,0,9.66h0c0,5.33,4.32,9.66,9.66,9.66h217.7c5.33,0,9.66-4.32,9.66-9.66h0c0-5.33-4.32-9.66-9.66-9.66Z" />
          <path className="cls-3" d="M227.36,415.34H9.66c-5.33,0-9.66,4.32-9.66,9.66s4.32,9.66,9.66,9.66h217.7c5.33,0,9.66-4.32,9.66-9.66s-4.32-9.66-9.66-9.66Z" />
        </g>
        <g id="sand" clipPath="url(#sandClip)">
          <path className="cls-1" d="M151.8,188.94L224.55,19.32H12.47l72.75,169.62c8.16,19.03,8.1,40.58-.16,59.56L12.47,415.34h212.07l-72.59-166.84c-8.26-18.98-8.32-40.53-.16-59.56Z" />
        </g>
      </svg>
    </div>
  );
}
