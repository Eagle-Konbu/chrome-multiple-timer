import { useState } from "react";

import { Button, Card, ColorPicker, InputNumber } from "antd";
import { DownOutlined, CloseOutlined } from '@ant-design/icons';

import type { Timer } from "../types/Timer";

interface TimerConfigCardProps {
  timer: Timer;
  onClose?: () => void;
}

export function TimerConfigCard(props: TimerConfigCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      title={props.timer.title}
      style={{ width: 300 }}
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={props.onClose}
        />
      }
    >
      <InputNumber
        min={0}
        value={props.timer.min}
      />
      {" : "}
      <InputNumber
        min={0}
        max={59}
        value={props.timer.second}
      />
      <br /><br />
      <ColorPicker
        open={open}
        onOpenChange={setOpen}
        value={props.timer.color}
        showText={() => (
          <DownOutlined
            rotate={open ? 180 : 0}
            style={{
              color: 'rgba(0, 0, 0, 0.25)',
            }}
          />
        )}
      />
    </Card>
  )
}