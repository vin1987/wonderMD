
describe('visit WonderMD Login and Registration  ', () => {
    beforeEach(() => {
       cy.fixture('control').then((control) => {        
        cy.visit(control.baseUrl)
      });   
    })

   
    
    it('00001 login with unregistered user', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test01.email).should('have.value','unregistered@wondermd.ca')
            cy.get('#password').type(control.loginRegistration.test01.pwd).should('have.value','Incorrect123!')  

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.contains(`${control.loginRegistration.test01.errorMessage}`)
            })   
        
        });
        
                        
    }) 


    it('00006 login with Blank user Name and Password', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test06.email).should('have.value',' ')  
            cy.get('#password').type(control.loginRegistration.test06.pwd).should('have.value',' ')
            cy.contains(`${control.loginRegistration.test06.errorMessage}`)
          });
        
                        
    }) 


    it('00007 Login- Valid Email/Invalid Password', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test07.email).should('have.value','fam1@wondermd.ca')
            cy.get('#password').type(control.loginRegistration.test07.pwd).should('have.value','Fake123!')  

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.contains(`${control.loginRegistration.test07.errorMessage}`)
            })   
        
        });                              
    }) 


    it('00008 Login- Invalid Email/ Valid Password', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test08.email).should('have.value','unregistered@wondermd.ca')
            cy.get('#password').type(control.loginRegistration.test08.pwd).should('have.value','Test@123')  

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.contains(`${control.loginRegistration.test08.errorMessage}`)
            })   
        
        });                              
    })
    
    
    it('00009 Login- Case Sensitivity Email', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test09.email)
            cy.get('#password').type(control.loginRegistration.test09.pwd)

            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)

               cy. location('pathname').should('eq', '/physician/dashboard')
               
            })   
        
        });                              
    }) 

    it('000010 Login- Case Sensitivity Password', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test10.email)
            cy.get('#password').type(control.loginRegistration.test10.pwd)

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.contains(`${control.loginRegistration.test10.errorMessage}`)
            })   
        
        });                              
    }) 

    it('000011 Login- Lock Account', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test11.email)
            cy.get('#password').type(control.loginRegistration.test11.pwd)

            cy.get('button').contains('Sign In').click().then(() =>{
                cy.contains(`${control.loginRegistration.test11.errorMessage}`)
            })   
        
        });                              
    }) 

    //Validate Manually 

    // it('000012 Login- Copy/ Paste Password', () => {
    
    //     cy.fixture('control').then((control) => { 

    //         cy.get('#email').type(control.loginRegistration.test12.email)
    //         cy.get('#password').type(control.loginRegistration.test12.pwd)

    //         cy.get('#password').invoke('val', textToCopy)
    //        // cy.get('button').click()
    //         cy.task('getClipboard').should('eq', textToCopy) 
        
    //     });                              
    // })


    it('000013 Login Back Button', () => {

        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test13.email)
            cy.get('#password').type(control.loginRegistration.test13.pwd)


            //Patient Login 
            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)
                cy.location('pathname').should('eq', '/patient/dashboard')
                cy.contains('Mayuri Patil').click()
                cy.contains('Sign out').click({force: true})
               
            })          
        });                              
    }) 

    it('000014 Login- Copying Logged In URL', () => {

        cy.on('uncaught:exception', (err, runnable) => {
            return false
          })
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test14.email)
            cy.get('#password').type(control.loginRegistration.test14.pwd)
            //Patient Login 
            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)
                cy.location('pathname').should('eq', '/patient/dashboard')
                cy.contains('Mayuri Patil').click()
                cy.contains('Sign out').click({force: true})
               
            })          
        });                              
    }) 

    //Description:  A user attempts to log in with only putting one space (press spacebar) into Email field and Password field and submitting such that the login fails.
    it('000015 One Space for email & password', () => {
    
          cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test15.email).should('have.value',' ')  
            cy.get('#password').type(control.loginRegistration.test15.pwd).should('have.value',' ')
            cy.contains(`${control.loginRegistration.test15.errorMessage}`)
          });                       
    }) 
 
//A family user that is already registered is able to log in.
    it('000002 Login- Registered User: Family', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test02.email)
            cy.get('#password').type(control.loginRegistration.test02.pwd)
            //Patient Login 
            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)
                cy.location('pathname').should('eq', '/patient/dashboard')             
               
            })          
        });                          
    })

    //A referring provider user that is already registered is able to log in.
    it('000003 Login- Registered User: Referring Provider', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test03.email)
            cy.get('#password').type(control.loginRegistration.test03.pwd)
            //Patient Login 
            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)
                cy.location('pathname').should('eq', '/physician/dashboard')             
               
            })          
        });                          
    })

    //Description:  A consulting provider user that is already registered is able to log in.
    it('000004 Login Registered User: Consulting Provider', () => {
    
        cy.fixture('control').then((control) => { 

            cy.get('#email').type(control.loginRegistration.test04.email)
            cy.get('#password').type(control.loginRegistration.test04.pwd)
            //Patient Login 
            cy.get('button').contains('Sign In').click().then(() =>{
                
                //check path is verify login then enter verification code 
                cy.location('pathname').should('eq', '/verify-login')
                cy.get(`[aria-label="Please enter verification code. Digit 1"]`).type(1)
                cy.get(`[aria-label="Digit 2"]`).type(2)
                cy.get(`[aria-label="Digit 3"]`).type(3)
                cy.get(`[aria-label="Digit 4"]`).type(4)
                cy.get(`[aria-label="Digit 5"]`).type(5)
                cy.get(`[aria-label="Digit 6"]`).type(6)
                cy.location('pathname').should('eq', '/physician/dashboard')             
               
            })          
        });                          
    })
    
 //Description:  When a new user click the Sign-Up Link, it redirect them to the Sign-Up page.
    it('000016 Sign Up- Sign Up Link Functionality', () => {
    
        cy.contains('Sign up').click().then(() =>{
            cy.location('pathname').should('eq', '/signup')  
        })                   
    }) 

    //Description:  A user attempts to sign up by leaving all required fields blank such that sign-up is unsuccessful.
    //

    it('000022 Sign up- Blank Mandatory Fields', () => {
    
        cy.contains('Sign up').click().then(() =>{
            cy.location('pathname').should('eq', '/signup')  

            cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
               cy.contains('Please select type')
               cy.contains('Please enter first name.')
               cy.contains('Please enter last name.')
               cy.contains('Please enter email.')
               cy.contains('Please enter Mobile number.')
               cy.contains('Please enter password.')
               cy.contains('Please enter confirm password.')

            })
        })                   
    })
    
    //000021 Admin Notification of New Users

   // Description:  User attempts to sign up using varying incorrect email formats.
    

    it('000023 Sign up- Email Address Format Validation', () => {
    
        cy.contains('Sign up').click().then(() =>{
            cy.location('pathname').should('eq', '/signup')  
            
            cy.fixture('control').then((control) => { 
                cy.get('#firstName').type(control.loginRegistration.test23.firstName)
                cy.get('#lastName').type(control.loginRegistration.test23.lastName)
                cy.get('#phone').type(control.loginRegistration.test23.mobileNumber)
                cy.get('#password').type(control.loginRegistration.test23.password)
                cy.get('#confirm_password').type(control.loginRegistration.test23.confirm_password)
                
                cy.get('#email').type(control.loginRegistration.test23.email_1)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                    //cy.contains('Please select type')
                    cy.contains('Invalid email address')    
                 })

                 cy.get('#email').clear()
                 cy.get('#email').type(control.loginRegistration.test23.email_2)
                 cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                    //cy.contains('Please select type')
                    cy.contains('Invalid email address')    
                 })

                 cy.get('#email').clear()
                 cy.get('#email').type(control.loginRegistration.test23.email_3)
                 cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                     //cy.contains('Please select type')
                     cy.contains('Invalid email address')    
                  })

                  cy.get('#email').clear()
                  cy.get('#email').type(control.loginRegistration.test23.email_4)
                  cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                     // cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_6)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_7)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_8)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_9)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                     // cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_10)
                cy.get('button[type="submit"]') .contains('Sign up').click().then(() =>{
                     // cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_11)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_12)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_13)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_14)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                      //cy.contains('Please select type')
                      cy.contains('Invalid email address').should('not.exist');        
                })

                cy.get('#email').clear()
                cy.get('#email').type(control.loginRegistration.test23.email_5)
                cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                     // cy.contains('Please select type')
                      cy.contains('Invalid email address')    
                })
               
            })    

            
        })                   
    })

//Description:  User attempts to sign up using varying incorrect phone number formats.
        it('000024 Sign Up Phone Number Format Validation', () => {
    
            cy.contains('Sign up').click().then(() =>{
                cy.location('pathname').should('eq', '/signup')  
                
                cy.fixture('control').then((control) => { 
                    cy.get('#firstName').type(control.loginRegistration.test24.firstName)
                    cy.get('#lastName').type(control.loginRegistration.test24.lastName)
                   
                    cy.get('#email').type(control.loginRegistration.test24.emailAddress)
                    cy.get('#password').type(control.loginRegistration.test24.password)
                    cy.get('#confirm_password').type(control.loginRegistration.test24.confirm_password)
                    
                    cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_1)
                    cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                        //cy.contains('Please select type')
                        cy.contains('Invalid mobile number')    
                     })
    
                     cy.get('#phone').clear()
                     cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_1)
                     cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                         //cy.contains('Please select type')
                         cy.contains('Invalid mobile number')    
                      })
    
                     cy.get('#phone').clear()
                     cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_2)
                     cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                         //cy.contains('Please select type')
                         cy.contains('Invalid mobile number')    
                      })
    
                      cy.get('#phone').clear()
                      cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_3)
                      cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                          //cy.contains('Please select type')
                          cy.contains('Invalid mobile number')    
                       })
    
                    cy.get('#phone').clear()
                    cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_4)
                    cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                        //type 4- 1234567890
                        cy.contains('Invalid mobile number').should('not.exist');      
                     })

                    cy.get('#phone').clear()
                    cy.get('#phone').type(control.loginRegistration.test24.mobileNumber_5)
                    cy.get('button[type="submit"]').contains('Sign up').click().then(() =>{
                       //Valid phone
                        cy.contains('Invalid mobile number').should('not.exist');    
                     })                                       
                })                        
            })                   
        })

        //

 

})
  

