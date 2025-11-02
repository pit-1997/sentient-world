import { describe, expect, it, jest } from '@jest/globals';
import { MockedEngine } from '@sentient-world/engine/mocks';

import type { CharacterData } from '../../character';

import {
  MockedCharacterFactory,
  MockedCharacterRepository,
  peetData,
  johnData,
} from '../../character/mocks';

import { constants } from '../constants';
import { getMockedWorldDeps } from '../mocks';
import { World } from '../world';

describe(`${World.name} - обновление персонажей`, () => {
  it('вызывает tick персонажей с состоянием мира', () => {
    const engine = new MockedEngine();
    const charactersData: CharacterData[] = [peetData, johnData];
    const characterRepository = new MockedCharacterRepository(charactersData);
    const characterFactory = new MockedCharacterFactory();

    const world = new World(getMockedWorldDeps({ engine, characterFactory, characterRepository }));
    const characters = characterFactory.getCreatedCharacters();
    const tickSpies = characters.map((character) => jest.spyOn(character, 'tick'));
    engine.resumeThreads(constants.CHARACTERS_TICK_INTERVAL);

    tickSpies.forEach((tickSpy) => {
      expect(tickSpy).toHaveBeenCalledWith({ world: world.getState() });
    });

    expect(tickSpies).toHaveLength(charactersData.length);
  });

  it(`вызывает tick персонажей раз в ${constants.CHARACTERS_TICK_INTERVAL} мс`, () => {
    const engine = new MockedEngine();
    const characterRepository = new MockedCharacterRepository([peetData]);
    const characterFactory = new MockedCharacterFactory();

    new World(getMockedWorldDeps({ engine, characterFactory, characterRepository }));
    const [character] = characterFactory.getCreatedCharacters();
    const tickSpy = jest.spyOn(character!, 'tick');

    engine.resumeThreads(constants.CHARACTERS_TICK_INTERVAL - 1);

    expect(tickSpy).not.toHaveBeenCalled();

    engine.resumeThreads(1);

    expect(tickSpy).toHaveBeenCalledTimes(1);

    engine.resumeThreads(constants.CHARACTERS_TICK_INTERVAL);

    expect(tickSpy).toHaveBeenCalledTimes(2);
  });
});
