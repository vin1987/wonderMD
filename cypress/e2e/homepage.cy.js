

describe('visit Homepage', () => {
  before(() => {
     cy.fixture('control').then((control) => {        
      cy.visit(control.controlEndPointUrl)
    });

    cy.wait(time)
  
  })

    it('displays header promo section', () => {
      cy.get('header').should('have.class', 'coto_header')
      cy.get('li.ga-promo').should('have.length', 2)
  })   

  it('displays navigation bar', () => {   
    cy.get('header').should('have.class','main-header')
  })  


  it('displays intro section with image', () => {   
    cy.get('section').should('have.class','ctpx-intro-sec ctpx-intro-sec--evergreen')
  }) 


  it('displays info section ', () => {   
    cy.get('section').should('have.class','ctpx-sec ctpx-sec--evergreen')
  }) 

  it('displays info tabs ', () => {   
    cy.get('section').should('have.class','ctpx-tab-nav ctpx-tab-nav--evergreen')
  }) 
  
  it('footer is loaded', () => {   
    cy.get('footer').should('have.class','footer-main')
  }) 
  

  it('subscribe section displayed', () => {     
    cy.contains('Subscribe')
    .parents('div')
    .should('have.class', 'newsletter-section')
  })


  it('subscribe with blank input to news letter and should see error message', () => { 
  
    cy.get('#footer-email-capture').submit()
    cy.contains('An error occurred. Please try again!').should('be.visible')
    cy.contains('Welcome to Cotopaxi!').should('not.be.visible')

  })
  

  it('closes when clicking the backdrop', () => {
    cy.get('[data-attn-element-id=ttnK]')
      .click({force: true})
      .then(() => {
        cy.expect(closed).to.equal(true);
      });
  });


  it('subscribe with blank input to news letter and should sucess message', () => { 

    cy.get('#inputFirstName').scrollIntoView()
    cy.get("#inputFirstName").type("Automation");
    cy.get("#inputLastName").type("Bro");
    cy.get("#inputEmail").type("Automation@Bro.com");
    cy.get("#inputBirthday").click();
    cy.get(".dayContainer span:nth-child(15)").click();

    cy.get('#footer-email-capture').submit()

    cy.contains('An error occurred. Please try again!').should('not.be.visible')
    cy.contains('Welcome to Cotopaxi!').should('be.visible')

  })

    
})
