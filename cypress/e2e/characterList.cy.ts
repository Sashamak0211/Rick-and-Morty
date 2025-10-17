describe("Список персонажей", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/character*", { fixture: "characters.json" }).as(
      "getCharacters"
    );
    cy.visit("/");
  });

  it("Загрузка 5 карточек", () => {
    cy.wait("@getCharacters");
    cy.get("character-card", { timeout: 10000 }).should("have.length", 5);
  });
});
