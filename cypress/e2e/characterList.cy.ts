/// <reference types="cypress" />

describe("Список персонажей", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /character(\?.*)?$/,
      },
      { fixture: "characters.json" }
    ).as("getCharacters");

    cy.visit("/");
  });

  it("Загрузка 5 карточек", () => {
    cy.wait("@getCharacters");
    cy.get(".character-card", { timeout: 10000 }).should("have.length", 5);
  });
  it("Отображаются имена", () => {
    cy.wait("@getCharacters");
    const names = [
      "Rick Smith",
      "Maikl Smith",
      "Goga Smith",
      "Riga Smith",
      "Jane Smith",
    ];
    names.forEach((name) => {
      cy.get(`input[value="${name}"]`).should("exist");
    });
  });
  it("Фильтрация по имени", () => {
    cy.intercept(
      {method: "GET", url: /character.*name=Rick/},
      {fixture: "filter.json"}
    ).as("filter");

    cy.get('input[placeholder="Filter by name"]').clear().type("Rick");

    cy.wait("@filter")
    cy.get(".character-card", {timeout: 5000}).should("have.length", 1)
    cy.get('input[value="Rick Smith"]').should('exist')
  })
});
