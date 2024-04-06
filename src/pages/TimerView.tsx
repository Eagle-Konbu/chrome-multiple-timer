import { Typography } from "antd";
import { useTimer } from "react-timer-hook";
import { Timer } from "../types/Timer";
import { useState, useEffect } from "react";

interface TimerViewProps {
  startAt: number;
  timers: Timer[];
}

export function TimerView(props: TimerViewProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [currentTimerIdx, setCurrentTimerIdx] = useState<number>(0);

  const timerToTotalSeconds = (timer: Timer) => {
    return timer.min * 60 + timer.second;
  }

  const secondToTimeFormat = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }

  const { seconds } = useTimer({
    expiryTimestamp: new Date((props.startAt + timerToTotalSeconds(props.timers[currentTimerIdx])) * 1000),
    onExpire: () => {
      if (currentTimerIdx + 1 < props.timers.length) {
        setCurrentTimerIdx(currentTimerIdx + 1);
        setRemainingSeconds(timerToTotalSeconds(props.timers[currentTimerIdx]));
      }
    }
  });

  useEffect(() => {
    setRemainingSeconds(seconds);
  }, [seconds]);

  return (
    <div>
      <Typography>{secondToTimeFormat(remainingSeconds)}</Typography>
    </div>
  );
}