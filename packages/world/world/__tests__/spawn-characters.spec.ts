import { describe, expect, it, jest } from '@jest/globals';

import {
  MockedCharacterFactory,
  MockedCharacterRepository,
  peetData,
  johnData,
} from '../../character/__tests__/mocks';

import { World } from '../world';

import { getMockedWorldDeps } from './mocks';

describe(`${World.name} - спавн персонажей`, () => {
  it('загружает из charactersRepository всех персонажей и спавнит их', () => {
    const characterRepository = new MockedCharacterRepository([peetData, johnData]);
    const characterFactory = new MockedCharacterFactory();
    const createCharacterSpy = jest.spyOn(characterFactory, 'create');

    new World(getMockedWorldDeps({ characterFactory, characterRepository }));

    expect(createCharacterSpy).toHaveBeenCalledWith(peetData);
    expect(createCharacterSpy).toHaveBeenCalledWith(johnData);
  });
});
