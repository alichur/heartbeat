/// <reference types="cypress" />

describe("heartbeat app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  describe("Landing page", () => {
    it("Displays the heading of the app", () => {
      cy.contains("Heartbeat").should("be.visible");
    });
  });
});
