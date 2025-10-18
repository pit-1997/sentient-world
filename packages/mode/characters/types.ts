export interface ICharacterData {
  id: number;
  modelId: number;
  name: string;
  surname: string;
  spawn: {
    x: number;
    y: number;
    z: number;
    angle: number;
  };
}

export interface ICharacter {
  data: ICharacterData;
}
