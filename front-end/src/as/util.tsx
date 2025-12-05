import React from "react";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import { LiaPlusSolid , LiaMinusSolid } from "react-icons/lia";

export const Plus = LiaPlusSolid as unknown as React.FC;
export const Minus = LiaMinusSolid as unknown as React.FC;

export const RadioChecked = ImRadioChecked as unknown as React.FC;
export const RadioUnchecked = ImRadioUnchecked as unknown as React.FC;

type AsPipRowProps = {
  pips: number;
  filled: number;
  onChange?: (newValue: number) => void;
};

export function AsPipRow({ pips, filled, onChange }: AsPipRowProps) {
  const handleDecrement = () => {
    if (onChange && filled > 0) {
      onChange(filled - 1);
    }
  };

  const handleIncrement = () => {
    if (onChange && filled < pips) {
      onChange(filled + 1);
    }
  };

  return (
    <span className="PipRow relative flex items-center gap-0.5">
      {onChange && <span className="text-xs opacity-50 pointer-events-none"><Minus /></span>}
      {Array.from({ length: pips }, (_, index) => (
        <span key={index} className={`Pip ${index < filled ? 'filled' : 'empty'}`}>
          {index < filled ? <RadioChecked /> : <RadioUnchecked />}
        </span>
      ))}
      {onChange && <span className="text-xs opacity-50 pointer-events-none"><Plus /></span>}
      {onChange && (
        <>
          <button
            onClick={handleDecrement}
            className="absolute left-0 top-0 w-1/2 h-full opacity-0 cursor-pointer"
            aria-label="Decrement"
          />
          <button
            onClick={handleIncrement}
            className="absolute right-0 top-0 w-1/2 h-full opacity-0 hover:opacity-20 hover:bg-white cursor-pointer"
            aria-label="Increment"
          />
        </>
      )}
    </span>
  );
}

export function getAsPvBySkill(skill: number, base: number) {
  console.log(skill, base);
  const delta = Math.abs(skill - 4);
  if (skill < 4) {
    let newPv = base + Math.ceil(base/5) * delta;
    console.log(newPv);
    return newPv;
  } else if (skill > 4) {
    let newPv = base - Math.ceil(base/10) * delta;
    console.log(newPv);
    return newPv;
  } else {
    return base;
  }
}