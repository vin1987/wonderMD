
describe('visit WonderMD for Referral  ', () => {
    beforeEach(() => {
       cy.fixture('referral').then((referral) => {        
        cy.visit(referral.baseUrl)
      });   
    })

    it('000026 - Consulting Provider Opt-In for Scheduling (Family)', () =>{

        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })

          cy.fixture('referral').then((referral) => { 

            cy.get('#email').type(referral.family.email)
            cy.get('#password').type(referral.family.password)

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)

               cy. location('pathname').should('eq', '/patient/dashboard')
               const refrralData = referral.family.referralAppointment
               for(var index in refrralData ){
                 //Refferal page
               cy.visit('https://quality.wondermd.ca/patient/dashboard/referral')
               cy.get("#accept").check()
                cy.get('button').contains('Continue').click().then(() =>{
                  //Select child
                  cy. location('pathname').should('eq', '/patient/dashboard/select-child')               
                  cy.get('#childList').click().then(()=>{
                  cy.get('#react-select-2-option-'+index).click()                
                    //select specialization
                    cy.get('button').contains('Next').click().then(() =>{
                      cy. location('pathname').should('eq', '/patient/dashboard/specialization')
                      cy.get('input[name='+refrralData[index].specialization+']').check().then(() =>{
                        cy.get('input[name='+refrralData[index].issue+']').check()
                        cy.get('button').contains('Next').click().then(() =>{
                          cy. location('pathname').should('eq', '/patient/dashboard/referring-provider')
                          cy.get('input[placeholder="Search Referring Provider"]').type('bharat')
                          cy.get('p').contains('Bharat Parat').parent().click()
                          cy.get('button').contains('Next').click().then(() =>{
                            cy. location('pathname').should('eq', '/patient/dashboard/reason-for-referral')
                            cy.get('#reasonForReferralByFamilies').type(refrralData[index].issue)
                            cy.get('button').contains('Next').click().then(() =>{
                              cy. location('pathname').should('eq',  '/patient/dashboard/referral-verification')                            
                              cy.get('button').contains('Save & Verify').click().then(() =>{
                                cy. location('pathname').should('eq',  '/patient/dashboard/success')
                                cy.contains('Success!')
                              })
                            })
                          })
                          
                        })
                      })                    
                    })
                  })
                })
               }                 
             });
          })
       })

})