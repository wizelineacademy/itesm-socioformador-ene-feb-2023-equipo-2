describe('Healthcheck', () => {
  it("see if it works", () => {
    cy.intercept('GET', '/api/healthcheck', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          status: "ok"
        }
      })
    })
  });
});