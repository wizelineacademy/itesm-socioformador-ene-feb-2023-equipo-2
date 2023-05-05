describe('get-employees, component EmployeeSearch', () => {
  it('should visit the specified page and get the response from the API', () => {
    cy.visit('http://localhost:3000/employees')
    cy.request('/api/get-employees')
      .then((response) => {
        if (response.body.employees.length === 0) {
          cy.log('No employees in database')
        } else {
          cy.log(`${response.body.employees.length} employees registered`)
        }
        expect(response.status).to.equal(200)
      })
  })
})