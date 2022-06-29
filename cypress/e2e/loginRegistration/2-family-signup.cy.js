describe('Family Registration', () => {
  beforeEach(() => {
     cy.fixture('control').then((control) => {        
      cy.visit(control.baseUrl)
    });   
  })

  
//  A family user is able to sign-up and register successfully when all mandatory information is entered.
  it('000017 Sign Up- Family', () => {

    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
  
    cy.contains('Sign up').click().then(() =>{
        cy.location('pathname').should('eq', '/signup')
        cy.get('[type="radio"]').first().click({force: true})
        cy.fixture('control').then((control) => { 
            cy.get('#firstName').type(control.familySignUp.family.firstName)
            cy.get('#lastName').type(control.familySignUp.family.lastName)
            cy.get('#email').type(control.familySignUp.family.emailAddress)
            cy.get('#phone').type(control.familySignUp.family.mobileNumber)
            cy.get('#password').type(control.familySignUp.family.password)
            cy.get('#confirm_password').type(control.familySignUp.family.password)
            
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
                cy.location('pathname').should('eq', '/family-info') 
                
                //Alternate Caregiver
                cy.contains("Family Information")

                cy.get('input[name="firstName"]').type(control.familySignUp.alternateCareGiver.firstName)
                cy.get('input[name="lastName"]').type(control.familySignUp.alternateCareGiver.lastName)
                //cy.get('#react-select-2-input').type(control.familySignUp.alternateCareGiver.relationship,{force: true})
                cy.get('#relationShip').click().then(()=>{
                  cy.get('#react-select-2-option-3').click()
                })
                cy.get('#addressLine1').type(control.familySignUp.alternateCareGiver.address.addressline1)
                cy.get('#addressLine2').type(control.familySignUp.alternateCareGiver.address.addressline2)
                cy.get('#city').type(control.familySignUp.alternateCareGiver.address.city)
                cy.get('#province').type(control.familySignUp.alternateCareGiver.address.province)
                cy.get('#postalCode').type(control.familySignUp.alternateCareGiver.address.PostalCode)

                cy.get('button[type="submit"]').contains('Save & Next').click().then(() =>{
                  //Add Child Details
                 cy.location('pathname').should('eq', '/childrens-details') 
                 cy.get('input[name="firstName"]').type(control.familySignUp.child1.firstName)
                 cy.get('input[name="lastName"]').type(control.familySignUp.child1.firstName)
                
                 cy.get('#genderId').click().then(()=>{
                  cy.get('#react-select-6-option-0').click()
                })

                cy.get('#genderIdentification').click().then(()=>{
                  cy.get('#react-select-7-option-1').click()
                }) 

                cy.get('#insuranceId').click().then(()=>{
                  cy.get('#react-select-8-option-0').click()
                })
                
                cy.get('#insuranceNumber').type(control.familySignUp.child1.hcn)

                 //Dates
                 //cy.get("input").eq(3).type(control.familySignUp.child1.dob,{force: true})
                 //cy.get("input").eq(9).type(control.familySignUp.child1.expiryDate,{force: true})
                // cy.get('.custom-datepicker > .relative > .passwordInput').click()
                cy.get('.custom-datepicker').click().then(()=>{
                  cy.get('.rdrYearPicker > select').select('2020')
                  cy.get(':nth-child(25) > .rdrDayNumber > span').click()

                })

                cy.get("input").eq(9).click().then(()=>{
                  cy.get('.rdrYearPicker > select').select('2025')
                  cy.get(':nth-child(25) > .rdrDayNumber > span').click()
                })


                 cy.get('button[type="submit"]').contains('Save & Next').click({ force: true }).then(() =>{

                  cy.location('pathname').should('eq', '/intake-verification') 
                  cy.get('button').contains('Save and finish').click({ force: true }).then(() =>{
                    cy.location('pathname').should('eq', '/congratulations-msg') 
                    cy.contains('Congratulations!')

                    cy.get('button').contains('View Dashboard').click().then(() =>{
                      cy.location('pathname').should('eq', '/patient/dashboard') 
                      //cy.contains('Sign out').click({force: true})
                    })

                  })
                 

                 })
               

                })

              })
           })
        })    

        
    })     
})

//User has forgotten their password to their WonderMD account and requires it to be reset and chose a new one.
it('000025b Forgotten Password/ Password Reset', () => {   
  cy.contains('Forgot Password?').click().then(() =>{
      cy.location('pathname').should('eq', '/forget-password') 
      //enter invalid email 
      cy.fixture('control').then((control) => { 
          cy.get("email").type(control.loginRegistration.test25b.invalidEmail).then(() =>{
               cy.get('button').contains('Send').click().then(() =>{
                      cy.contains(control.loginRegistration.test25b.invalidErrorMsg)    

               })
          })
          cy.get("email").type(control.familySignUp.family.emailAddress).then(() =>{
              cy.get('button').contains('Send').click().then(() =>{
                  cy.location('pathname').should('eq', '/otp') 
                  cy.get(`[aria-label="Please enter verification code. Digit 1"]`).first().type(1)
                  cy.get(`[aria-label="Digit 2"]`).firt().type(2)
                  cy.get(`[aria-label="Digit 3"]`).first().type(3)
                  cy.get(`[aria-label="Digit 4"]`).first().type(4)
                  cy.get(`[aria-label="Digit 5"]`).first().type(5)
                  cy.get(`[aria-label="Digit 6"]`).first().type(6)
                   
                  cy.get('button').contains('Verify').click().then(() =>{                           
                      cy.location('pathname').should('eq', '/set-new-password')
                      cy.get("#password").type(control.familySignUp.test25b.resetPassword)
                      cy.get("#confirm_password").type(control.familySignUp.test25b.resetPassword)

                      cy.get('button').contains('Change Password').click.then(()=>{ 
                          cy.location('pathname').should('eq', '/reset-password-successfull')
                          cy.contains("Password Successfully Reset")
                          cy.get('button').contains('Sign in').click.then(()=>{ 
                            cy.location('pathname').should('eq', '/login')
                            cy.get("#email").type(control.familySignUp.family.emailAddress)
                            cy.get("#password").type(control.familySignUp.test25b.resetPassword)
                            cy.get('button').contains('Sign in').click.then(()=>{ 
                              cy.location('pathname').should('eq', '/verify-login') 
                                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).first().type(1)
                                cy.get(`[aria-label="Digit 2"]`).firt().type(2)
                                cy.get(`[aria-label="Digit 3"]`).first().type(3)
                                cy.get(`[aria-label="Digit 4"]`).first().type(4)
                                cy.get(`[aria-label="Digit 5"]`).first().type(5)
                                cy.get(`[aria-label="Digit 6"]`).first().type(6)
                                cy.location('pathname').should('eq', '/patient/dashboard') 
                                cy.visit('/patient/settings/change-password')
                                cy.contains('Reset Password')
                                cy.get('password').type(control.familySignUp.family.test25b.resetPassword)
                                cy.get('password').type(control.familySignUp.family.password)
                                cy.get('button').contains('Reset').click.then(()=>{
                                  cy.contains("Password has been changed successfully.")
                                  cy.location('pathname').should('eq', '/patient/dashboard') 
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