import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import charactersResponsePage1 from "../fixtures/characters-page-1.json";
import charactersResponsePage2 from "../fixtures/characters-page-2.json";
import charactersError500 from "../fixtures/characters-error-500.json";
import notificationBloc from "./notification.bloc.js";
import charactersBlocInstance from "./characters.bloc.js";

vi.mock("axios");

describe("Characters Bloc", () => {
  beforeEach(() => {
    charactersBlocInstance.setState({ characters: [], currentPage: 1 });
  });

  it("should error if error 500", async () => {
    try {
      vi.mocked(axios, true).get.mockRejectedValueOnce(charactersError500);
      await charactersBlocInstance.loadCharacters();
    } catch (error) {
      expect("Error en los characters").toEqual(
        notificationBloc.getState().notification
      );
    }
  });

  it("should manage characters", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(charactersResponsePage1);

    await charactersBlocInstance.loadCharacters();
    const characters = charactersBlocInstance.getCharacters();
    expect(characters.length).toBe(20);
  });

  it("should load characters with next and previous", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(charactersResponsePage2);

    await charactersBlocInstance.nextPage();
    const charactersPage2 = charactersBlocInstance.getCharacters();
    expect(charactersPage2[0].characterId).toBe(21);

    vi.mocked(axios, true).get.mockResolvedValueOnce(charactersResponsePage1);
    await charactersBlocInstance.previousPage();
    const charactersPage1 = charactersBlocInstance.getCharacters();
    expect(charactersPage1[0].characterId).toBe(1);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
