import { useState } from "react";
import * as Util from "./util"; 
import "./card.css";

const { Plus, Minus, AsPipRow, getAsPvBySkill } = Util;

class AsCardData implements AsCard {
  constructor(
    public name: string,
    public tp: string,
    public sz: number,
    public tmm: number,
    public mv: string,
    public role: string,
    public skill: number,
    public skill_base: number,
    public armor: PipValue,
    public structure: PipValue,
    public specials: AsCard['specials'],
    public criticals: AsCard['criticals'],
    public damages: AsCard['damages'],
    public pv: AsCard['pv'],
  ) {}
}

function AsCardComponent() {
  const specials = [
    { shortName: "Special 1", fullName: "Special 1 full name", description: "Special 1 description", source: "Special 1 source" },
    { shortName: "Special 2", fullName: "Special 2 full name", description: "Special 2 description", source: "Special 2 source" },
    { shortName: "Special 3", fullName: "Special 3 full name", description: "Special 3 description", source: "Special 3 source" },
  ];
  const initialCriticals = {
    engine: { max: 2, current: 0 },
    fireControl: { max: 4, current: 0 },
    weapons: { max: 4, current: 0 },
    motive: { max: 4, current: 0 },
  };
  const damages = { short: "5", medium: "4", long: "3", horizon: "1*" };
  const asCard = new AsCardData(
    "name", 
    "TYPE", 
    2, 
    2, 
    '5"t', 
    "Brawler",
    4, 
    4, 
    { max: 5, current: 3 }, 
    { max: 3, current: 1 }, 
    specials, 
    initialCriticals, 
    damages, 
    { base: 69, current: 69 }
  );

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
export default AsCardComponent;
