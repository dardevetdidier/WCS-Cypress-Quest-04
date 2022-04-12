/// <reference types="cypress" />

describe("Upload and Download File Suite tests", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    let filePath = "images/road.jpg";
    const url = Cypress.config("baseUrl")

    it("Upload file and Download it in Zip Format", () => {
        cy.get("#fileField").attachFile(filePath)
        cy.contains('It contains 1 uploaded file').should('be.visible');
        cy.contains("Download files").click();
        cy.contains("Zip").invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.log(Cypress.config("baseUrl"))
            cy.downloadFile(`${url}${downloadLink}`,'myDownloads/zipFiles','myImageFromCypress.zip');
            cy.readFile('myDownloads/zipFiles/myImageFromCypress.zip')
        })
    })

    it("Upload file and Download it in Tar Format", () => {
        cy.get("#fileField").attachFile(filePath)
        cy.contains('It contains 1 uploaded file').should('be.visible');
        cy.contains("Download files").click();
        cy.contains("Tar").invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.downloadFile(`${url}${downloadLink}`,'myDownloads/tarFiles','myImageFromCypress.tar');
            cy.readFile('myDownloads/tarFiles/myImageFromCypress.tar')
        })
    })
})