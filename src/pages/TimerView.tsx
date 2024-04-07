import { useState, useEffect } from "react";

import { Typography, Space } from "antd";
// import useSound from "use-sound";

import { Timer } from "../types/Timer";
// import Sound from "../sounds/bell.mp3";
import { HourGlass } from "../components/HourGlass";

const { Title } = Typography;

interface TimerViewProps {
  timers: Timer[];
}

export function TimerView(props: TimerViewProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentTimerIdx, setCurrentTimerIdx] = useState<number>(0);

  // const [play] = useSound(Sound, { volume: 1 });

  const timerToSeconds = (timer: Timer) => {
    return timer.min * 60 + timer.second;
  }

  const getTimeFormat = (remainingSeconds: number) => {
    if (remainingSeconds <= 0) {
      return "00:00";
    }

    const min = Math.floor(remainingSeconds / 60)
    const sec = Math.floor(remainingSeconds) % 60;
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (elapsedSeconds + 1 >= timerToSeconds(props.timers[currentTimerIdx])) {
        if (currentTimerIdx === props.timers.length - 1) {
          clearInterval(id);
          return;
        }
        setCurrentTimerIdx(currentTimerIdx => currentTimerIdx + 1);
        setElapsedSeconds(0);
      }
      setElapsedSeconds(totalSecs => totalSecs + 1);
    }, 1000);
    return () => clearInterval(id);
  })

  return (
    <Space direction="vertical" size={16}>
      <HourGlass 
        width={100}
        color={props.timers[currentTimerIdx].color}
        progress={elapsedSeconds / timerToSeconds(props.timers[currentTimerIdx])}
      />
      <Title>{getTimeFormat(timerToSeconds(props.timers[currentTimerIdx]) - elapsedSeconds)}</Title>
    </Space>
  );
}