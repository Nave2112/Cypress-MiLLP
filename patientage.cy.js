describe('data driven method',()=>{
    it('patient_details 1',()=>{

        let minAge = 32
        // #IF "%MODE%"=="headed" SET MODE_FLAG=--headed
        // #IF "%MODE%"=="headless" SET MODE_FLAG=--headless
        
        // # Run Cypress with parameters
        // #npx cypress run --spec "%SPEC_FILE%" --browser "%BROWSER%" %MODE_FLAG%


        let patientsData = [
                    {"name" : "ashok", "age" :35},
                    {"name" : "bala", "age" :37},
                    {"name" : "ashwin", "age" :32}]
        // cy.fixture('example').then((data)=>{
        //   let patientsData = data;
            const filteredPatients = patientsData.filter((patient) => patient.age > minAge);

      // Log the filtered patients
      cy.log('Filtered Patients:', filteredPatients);

      // Example: Asserting the filtered data
      
      expect(filteredPatients).to.have.length(2); // Adjust based on your data
      filteredPatients.forEach((patient) => {
        expect(patient.age).to.be.greaterThan(minAge);
        })
    })
})
//})
// let minAge = 30


// // High order function are applied here which included among the commands -- then, invoke, custom commands, map, filter, data driven test
//     it('Validates that a specific patient is in the filtered list', () => {
//       // Load the JSON data
//       cy.fixture('example').then((patients) => {
//         // Filter patients based on the age condition
//         const filteredPatients = patients.filter((patient) => patient.age > minAge);
  
//         // Log the filtered patients
//         cy.log('Filtered Patients:', filteredPatients);
  
//         // Validate that the filtered list contains a patient with the name "John Doe"
//         const patientNames = filteredPatients.map((patient) => patient.name);
//         cy.log(patientNames)
//          filteredPatients.forEach((patient)=>{
//             expect(patientNames).to.include.members(['Jane Smith','Alice Johnson']);
//             expect(patient.age).to.be.greaterThan(minAge);
//             expect(filteredPatients).to.have.length(2)
           
//             expect(patientNames).to.have.length(2)
//          })
//        // expect(patientNames).to.include('Jane Smith','Alice Johnson');
//         ;
//       //  expect(filteredPatients.patient.age).to.be.lengthn('2'); // Assertion for specific name
//       });
//     });
  
  