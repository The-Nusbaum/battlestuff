import { useState, JSX } from "react";
import * as Util from "./util"; 
import "./card.css";

const { Plus, Minus, AsPipRow, getAsPvBySkill } = Util;

export class AsCard {
  name: string;
  tp: string;
  sz: number;
  tmm: number;
  mv: string;
  role: string;
  skill: number;
  skill_base: number;
  armor: PipValue;
  structure: PipValue;
  specials: { shortName: string; fullName: string; description: string; source: string }[];
  criticals: { engine: PipValue; fireControl: PipValue; weapons: PipValue; motive: PipValue };
  damages: { short: string; medium: string; long: string; horizon: string };
  pv: { base: number; current: number };

  constructor(data: AsCard) {
    this.name = data.name;
    this.tp = data.tp;
    this.sz = data.sz;
    this.tmm = data.tmm;
    this.mv = data.mv;
    this.role = data.role;
    this.skill = data.skill;
    this.skill_base = data.skill_base;
    this.armor = data.armor;
    this.structure = data.structure;
    this.specials = data.specials;
    this.criticals = data.criticals;
    this.damages = data.damages;
    this.pv = data.pv;
  }
}

export function AsCardComponent({ asCard }: { asCard: AsCard }): JSX.Element {
  console.log(asCard);
  const [armor, setArmor] = useState(asCard.armor.current);
  const [structure, setStructure] = useState(asCard.structure.current);
  const [skill, setSkill] = useState(asCard.skill);
  const [currentPv, setCurrentPv] = useState(asCard.pv.current);
  const [criticals, setCriticals] = useState({
    engine: asCard.criticals.engine.current,
    fireControl: asCard.criticals.fireControl.current,
    weapons: asCard.criticals.weapons.current,
    motive: asCard.criticals.motive.current,
  });

  const updateCritical = (key: keyof typeof criticals) => (value: number) => {
    setCriticals(prev => ({ ...prev, [key]: value }));
  };

  const handleSkillChange = (delta: number) => {
    const newSkill = skill + delta;
    if (newSkill >= 0 && newSkill < 8) {
      setSkill(newSkill);
      setCurrentPv(getAsPvBySkill(newSkill, asCard.pv.base));
    }
  };

  return (
    <div className="AsCardContainer w-full md:w-1/2 md:basis-1/2 flex justify-center">
      <div className="AsCard bg-red-500 justify-between flex-col p-2 rounded-lg shadow-xl shadow-black border border-black w-fit gap-1 m-2">
        <header className="text-2xl font-bold flex justify-between">
          {asCard.name}
          <span className="text-sm" data-base_pv={asCard.pv.base}>PV: {currentPv}</span>
        </header>
        <section className="details bg-gray-200 border border-black p-2 rounded-lg">
          <div className="details-1 flex justify-between">
            <span>TP: <span className="font-bold">{asCard.tp}</span></span>
            <span>SZ: <span className="font-bold">{asCard.sz}</span></span>
            <span>TMM: <span className="font-bold">{asCard.tmm}</span></span>
            <span>MV: <span className="font-bold">{asCard.mv}</span></span>
          </div>
          <div className="details-2 flex justify-between">
            <span>ROLE: <span className="font-bold">{asCard.role}</span></span>
            <span className="skill flex items-center gap-2">
              <button className="upSkill cursor-pointer" onClick={() => handleSkillChange(-1)}><Minus /></button>
              <span className="skillValue" data-skill_base={asCard.skill_base}>SKILL: <span className="font-bold">{skill}</span></span>
              <button className="downSkill cursor-pointer" onClick={() => handleSkillChange(1)}><Plus /></button>
            </span>
          </div>
        </section>
        <section className="Damage relative bg-gray-200 border border-black p-2 rounded-lg pl-6 pt-0">
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs">Damages</span>
          <header className="flex justify-around ml-4 pl-4 bg-fade-red text-white font-bold capitalize">
            <span>S (+0)</span>
            <span>M (+2)</span>
            <span>L (+4)</span>
            <span>E (+6)</span>
          </header>
          <div className="damageValues flex justify-around ml-4 font-bold">
            <span>{asCard.damages.short}</span>
            <span>{asCard.damages.medium}</span>
            <span>{asCard.damages.long}</span>
            <span>{asCard.damages.horizon}</span>
          </div>
        </section>
        <section className="columns flex gap-1">
          <section className="text-xs grow flex flex-col gap-1">
            <section className="armor flex flex-col bg-gray-200 border border-black p-2 rounded-lg">
              <div className="flex items-center gap-2 ">
                <span>A:</span> <AsPipRow pips={asCard.armor.max} filled={armor} onChange={setArmor} />
              </div>
              <div className="flex items-center gap-2">
                <span>S:</span> <AsPipRow pips={asCard.structure.max} filled={structure} onChange={setStructure} />
              </div>
            </section>
            <section className="specials bg-gray-200 border border-black p-2 rounded-lg flex flex-wrap gap-2 grow content-start">
              <span className="font-bold">Specials:</span>
                {asCard.specials.map((special) => (      
                  <span className="tooltip"
                    title={special.fullName}
                    data-tooltip-content="{special.source} + '-' + {special.description}"
                    data-tooltip-place="top"
                  >
                    {special.shortName}
                </span>
              ))}
            </section>
          </section>
          <section className=""></section>
            <section className="criticals bg-gray-200 border border-black p-2 rounded-lg pt-0">
              <header className="bg-fade-red text-white font-bold capitalize text-center text-sm mb-2 mt-0">Critical Hits:</header>
              <span className="flex flex-wrap gap-1 text-xs">Engine: <AsPipRow pips={asCard.criticals.engine.max} filled={criticals.engine} onChange={updateCritical('engine')} /> 1/2 MV and Damage</span>
              <span className="flex items-center gap-1 text-xs">Fire Control: <AsPipRow pips={asCard.criticals.fireControl.max} filled={criticals.fireControl} onChange={updateCritical('fireControl')} /> +2 To-Hit Each</span>
              <span className="flex items-center gap-1 text-xs">Weapons: <AsPipRow pips={asCard.criticals.weapons.max} filled={criticals.weapons} onChange={updateCritical('weapons')} /> -1 Damage Each</span>
            </section>
        </section>
      </div>
    </div>
  );
}

export async function getAsCard(): Promise<AsCard> {
  const response = await fetch('http://localhost:8080/api/v1/stubs/as-card');
  const data = await response.json();
  return new AsCard(data);
}
