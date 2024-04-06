import { useState } from "react";

import { FloatButton, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { TimerConfigCard } from "../components/TimerConfigCard";
import { Timer } from "../types/Timer";

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

export function TimerConfig() {
  const [timers, setTimers] = useState<Timer[]>([defaultTimer]);

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
        {timers.map((timerConfig: Timer, idx: number) => (
          <TimerConfigCard timer={timerConfig} onClose={() => handleDeleteTimerConfig(idx)} />
        ))}
      </Space>
      <FloatButton icon={<PlusOutlined />} onClick={handleAddTimerConfig} />
    </>
  );
}