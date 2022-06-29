describe('Reffering Provider Registration', () => {
    beforeEach(() => {
       cy.fixture('control').then((control) => {        
        cy.visit(control.baseUrl)
      });   
    })

    
//Description:  A referring provider user is able to sign-up and register successfully when all mandatory information is entered.
    it('000018 Sign Up- Referring Provider', () => {

      cy.on('uncaught:exception', (err, runnable) => {
        return false
      })
    
      cy.contains('Sign up').click().then(() =>{
          cy.location('pathname').should('eq', '/signup')
          cy.get('#provider').click({force: true})
          cy.fixture('control').then((control) => { 
              cy.get('#firstName').type(control.refferingProvider.provider.firstName)
              cy.get('#lastName').type(control.refferingProvider.provider.lastName)
              cy.get('#email').type(control.refferingProvider.provider.emailAddress)
              cy.get('#phone').type(control.refferingProvider.provider.mobileNumber)
              cy.get('#password').type(control.refferingProvider.provider.password)
              cy.get('#confirm_password').type(control.refferingProvider.provider.password)
              
              cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                cy.location('pathname').should('eq', '/terms-and-condition')
                cy.get('button').contains('Accept & Continue').click().then(() =>{
                        cy.location('pathname').should('eq', '/verify-email-and-phone')

                        //Verify Mobile
                        cy.get(`[aria-label="Please enter verification code. Digit 1"]`).first().type(1)
                        cy.get(`[aria-label="Digit 2"]`).first().type(2)
                        cy.get(`[aria-label="Digit 3"]`).first().type(3)
                        cy.get(`[aria-label="Digit 4"]`).first().type(4)
                        cy.get(`[aria-label="Digit 5"]`).first().type(5)
                        cy.get(`[aria-label="Digit 6"]`).first().type(6)

                        //verify email
                        cy.get(`[aria-label="Please enter verification code. Digit 1"]`).last().type(1)
                        cy.get(`[aria-label="Digit 2"]`).last().type(2)
                        cy.get(`[aria-label="Digit 3"]`).last().type(3)
                        cy.get(`[aria-label="Digit 4"]`).last().type(4)
                        cy.get(`[aria-label="Digit 5"]`).last().type(5)
                        cy.get(`[aria-label="Digit 6"]`).last().type(6)
                        cy.location('pathname').should('eq', '/physician/profile') 

                        //Build Profile

                        cy.contains("Referring").click()

                        cy.get('button').contains('Save & Next').click().then(() =>{
                          cy.location('pathname').should('eq', '/physician/choose-specialty') 
                          cy.get('input[type="checkbox"]')
                                .as('checkboxes')
                                .check()
                          cy.get('@checkboxes')
                            .each(checkbox => {
                               expect(checkbox[0].checked).to.equal(true)
                            })
                           cy.get('button').contains('Save & Next').click().then(() =>{
                            
                            //physician-credentials
                            cy.location('pathname').should('eq', '/physician/physician-credentials') 
                             
                           //CollegeDetails                     
                           cy.get('#name').click().then(()=>{
                            cy.get('#react-select-2-option-0').click()
                           })
                           cy.get("#licenseNumber").type(control.refferingProvider.provider.licenseNumber) 
                           cy.get('input[name="expiryDate"]').click().then(()=>{
                            cy.get('.rdrYearPicker > select').select('2025')
                            cy.get(':nth-child(25) > .rdrDayNumber > span').click()
                            })
        
                          //insurance details
                          cy.get('#insurerName').click().then(()=>{
                            cy.get('#react-select-3-option-0').click()
                          })
                          cy.get("#insuranceNumber").type(control.refferingProvider.provider.insuranceNumber) 
                          
                          //screen 5 Financial details 
                            cy.get('button').contains('Save & Next').click().then(() =>{

                                cy.location('pathname').should('eq', '/physician/physician-financial-details') 
                                cy.get("#billingNumber").type(control.refferingProvider.provider.billingNumber) 

                                cy.get('button').contains('Save & Next').click().then(() =>{
                                    cy.location('pathname').should('eq', '/physician/office-details')
                                    cy.get('#name').type(control.refferingProvider.provider.officeDetails.clinicName)
                                    cy.get('#phoneNumber').type(control.refferingProvider.provider.officeDetails.clinicMobileNumber)
                                    cy.get('#faxNumber').type(control.refferingProvider.provider.officeDetails.faxNumber)
                                    cy.get('input[name="addressLine1"]').type(control.refferingProvider.provider.officeDetails.officeAddress.addressline1)
                                    cy.get('input[name="addressLine2"]').type(control.refferingProvider.provider.officeDetails.officeAddress.addressline2)
                                    cy.get('#city').type(control.refferingProvider.provider.officeDetails.officeAddress.city)
                                    cy.get('#postalCode').type(control.refferingProvider.provider.officeDetails.officeAddress.province)
                                    cy.get('#province').type(control.refferingProvider.provider.officeDetails.officeAddress.postalCode)
                                    cy.get('#email').type(control.refferingProvider.provider.officeDetails.officeAddress.officeEmail)
                                    cy.get('button').contains('Save & Next').click().then(() =>{
                                        cy.location('pathname').should('eq', '/physician/physician-register-verification')
                                        
                                        cy.get('button').contains('Submit Now').click().then(() =>{
                                            //Registration Verification
                                            cy.location('pathname').should('eq', '/physician/dashboard')
                                            cy.contains("You are yet to be verified by WonderMD")
                                            
                                        })
                                    })
                                })                           
                            })                          
                          })
                        })                 
                })
             })    
         })
          
      })                   
  })
})