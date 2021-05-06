describe("Visit LeBron", () => {
  it("Visits the NBA Player LeBron", () => {
    cy.visit("/?search=LeBron");
    cy.contains("LeBron");
  });
});
