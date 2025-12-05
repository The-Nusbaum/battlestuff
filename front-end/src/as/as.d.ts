type PipValue = {
  max: number,
  current: number,
}

type AsCard = {
  name: string,
  tp: string,
  sz: number,
  tmm: number,
  mv: string,
  role: string,
  skill: number,
  skill_base: number,
  armor: PipValue,
  structure: PipValue,
  specials: {
    shortName: string,
    fullName: string,
    description: string,
    source: string,
  }[],
  criticals: {
    engine: PipValue,
    fireControl: PipValue,
    weapons: PipValue,
    motive: PipValue,
  },
  damages: {
    short: string,
    medium: string,
    long: string,
    horizon: string,
  },
  pv: {
    base: number,
    current: number,
  },
}
