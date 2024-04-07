import { useState } from "react";

import { Button, Card, ColorPicker, InputNumber } from "antd";
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Color } from "antd/es/color-picker";

interface TimerConfigCardProps {
  title: string;
  minutes: number;
  seconds: number;
  color: string;
  onClose?: () => void;
  onTitleChange?: (title: string | null) => void;
  onMinutesChange?: (minutes: number | null) => void;
  onSecondsChange?: (seconds: number | null) => void;
  onColorChange?: (color: Color, hex: string) => void;
}

export function TimerConfigCard(props: TimerConfigCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      title={props.title}
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
        value={props.minutes}
        onChange={props.onMinutesChange}
      />
      {" : "}
      <InputNumber
        min={0}
        max={59}
        value={props.seconds}
        onChange={props.onSecondsChange}
      />
      <br /><br />
      <ColorPicker
        open={open}
        onOpenChange={setOpen}
        value={props.color}
        onChange={props.onColorChange}
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
