import { Typography } from "antd";
import { Timer } from "../types/Timer";
import { useState, useEffect } from "react";

const { Title } = Typography;

interface TimerViewProps {
  timers: Timer[];
}

export function TimerView(props: TimerViewProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [currentTimerIdx, setCurrentTimerIdx] = useState<number>(0);

  const timerToSeconds = (timer: Timer) => {
    return timer.min * 60 + timer.second;
  }

  const getTimeFormat = (remainingSeconds: number) => {
    if (remainingSeconds <= 0) {
      return "00:00";
    }
    const floorSeconds = Math.floor(remainingSeconds);
    const min = Math.floor(floorSeconds / 60);
    const sec = floorSeconds % 60;
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  useEffect(() => {
    const id = setInterval(() => {
      if (elapsedSeconds + 0.1 >= timerToSeconds(props.timers[currentTimerIdx])) {
        if (currentTimerIdx === props.timers.length - 1) {
          clearInterval(id);
          return;
        }
        setCurrentTimerIdx(currentTimerIdx => currentTimerIdx + 1);
        setElapsedSeconds(0);
      }
      setElapsedSeconds(totalSecs => totalSecs + 0.1);
    }, 100);
    return () => clearInterval(id);
  })

  return (
    <div>
      <Title>{getTimeFormat(timerToSeconds(props.timers[currentTimerIdx]) - elapsedSeconds)}</Title>
    </div>
  );
}