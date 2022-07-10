
describe('visit WonderMD for ReferringProvider  ', () => {
    beforeEach(() => {
       cy.fixture('referral').then((referral) => {        
        cy.visit(referral.baseUrl)
      });   
    })

    it('000027 - Consulting Provider Opt-In for Scheduling (Referring Provider)', () =>{

        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          cy.fixture('referral').then((referral) => { 

            cy.get('#email').type(referral.referringProvider.email)
            cy.get('#password').type(referral.referringProvider.password)

            cy.get('button').contains('Sign In').click().then(() =>{ 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)

               cy. location('pathname').should('eq', '/physician/dashboard')
               const makeReferralData = referral.referringProvider.makeReferral
               for(var index in makeReferralData ){                  
                    //Refferal page
                    //react-select-23-input
                    cy.visit('https://quality.wondermd.ca/physician/refer-patient')
                    console.log('Entering OHIP number '+makeReferralData[index].OHIP)
                    cy.get('div').contains('Enter OHIP number to search').parent().click().type(makeReferralData[index].OHIP)
                    cy.get('input')
                    cy.get('#react-select-2-option-0').click({force:true})
                      cy.get('button').contains('Next').click().then(() =>{
                        cy. location('pathname').should('eq', '/physician/refer-patient/step2')
                          cy.get('button').contains('Save & Next').click().then(() =>{
                            //Close pop up  
                            cy.get('#confirmationModal').get('button').contains('Close').click().then(() =>{
                              //Close pop up 
                              cy. location('pathname').should('eq', '/physician/refer-patient/step3')
                              
                              cy.get('div').contains('Pediatrician').parent().click()
                              cy.get('#61666d23d6baa90a3e896eac').click({force:true})

                              cy.get('button').contains('Next').click().then(() =>{
                                cy. location('pathname').should('eq', '/physician/refer-patient/step4')
                                cy.get('textarea[name=reason]').type('refer patient')
                                cy.get('button').contains('Submit Referral').click().then(() =>{

                                  //Verify Referral 
                                  cy. location('pathname').should('eq', '/physician/refer-patient/review-referral')
                                  cy.get('button').contains('Submit Now').click().then(() =>{
                                    cy. location('pathname').should('eq', '/physician/dashboard')
                                    cy.contains('Referral has been created successfully.').should('be.visible') 
                                    
                                  })
                                })

                              })
    
                            })

                          })
                      })
                }
            })
         })
      })

})