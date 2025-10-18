Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Failed to load module script')) {
    return false;
  }
});
