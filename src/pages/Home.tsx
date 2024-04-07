import { useState } from "react";

import { Button, FloatButton, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { TimerConfigCard } from "../components/TimerConfigCard";
import { Timer } from "../types/Timer";
import NewWindow from "react-new-window";
import { TimerView } from "./TimerView";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const defaultTimer: Timer = {
  min: 0,
  second: 0,
  color: getRandomColor(),
  title: "Timer 1",
}

export function Home() {
  const [timers, setTimers] = useState<Timer[]>([defaultTimer]);
  const [timerIsInProgess, setTimerIsInProgess] = useState<boolean>(false);

  const handleAddTimerConfig = () => {
    const newTimer: Timer = {
      min: 0,
      second: 0,
      color: getRandomColor(),
      title: `Timer ${timers.length + 1}`,
    };
    setTimers([...timers, newTimer]);
  };

  const handleDeleteTimerConfig = (idx: number) => {
    if (timers.length > 1) {
      const newTimers = [...timers];
      newTimers.splice(idx, 1);
      setTimers(newTimers);
    }
  };

  return (
    <>
      <Space direction="vertical" size={16}>
        <Button
          type="primary"
          onClick={() => setTimerIsInProgess(true)}
        >
          Start!
        </Button>
        {timers.map((timerConfig: Timer, idx: number) => (
          <TimerConfigCard
            title={timerConfig.title}
            minutes={timerConfig.min}
            seconds={timerConfig.second}
            color={timerConfig.color}
            onMinutesChange={(min) => {
              const newTimers = [...timers];
              newTimers[idx].min = min || 0;
              setTimers(newTimers);
            }}
            onSecondsChange={(sec) => {
              const newTimers = [...timers];
              newTimers[idx].second = sec || 0;
              setTimers(newTimers);
            }}
            onColorChange={(_, hex) => {
              const newTimers = [...timers];
              newTimers[idx].color = hex || getRandomColor();
              setTimers(newTimers);
            }}
            onClose={() => handleDeleteTimerConfig(idx)}
          />
        ))}
      </Space>
      <FloatButton icon={<PlusOutlined />} onClick={handleAddTimerConfig} />
      {timerIsInProgess &&
        <NewWindow
          onUnload={() => setTimerIsInProgess(false)}
        >
          <TimerView
            timers={timers}
          />
        </NewWindow>
      }
    </>
  );
}