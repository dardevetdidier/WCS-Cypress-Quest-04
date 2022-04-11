/// <reference types="cypress" />

describe("Upload and Download File Suite tests", () => {
    beforeEach(() => {
        cy.visit("https://filebin.net/")
    })

    let filePath = "images/road.jpg";

    it("Upload file and Download it in Zip Format", () => {
        cy.get("#fileField").attachFile(filePath)
        cy.contains('It contains 1 uploaded file').should('be.visible');
        cy.contains("Download files").click();
        cy.contains("Zip").invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.downloadFile(`https://filebin.net${downloadLink}`,'myDownloads/zipFiles','myImageFromCypress.zip');
            cy.readFile('myDownloads/zipFiles/myImageFromCypress.zip')
        })
    })

    it("Upload file and Download it in Tar Format", () => {
        cy.get("#fileField").attachFile(filePath)
        cy.contains('It contains 1 uploaded file').should('be.visible');
        cy.contains("Download files").click();
        cy.contains("Tar").invoke('attr', 'href').then(downloadLink => {
            cy.log(downloadLink)
            cy.downloadFile(`https://filebin.net${downloadLink}`,'myDownloads/tarFiles','myImageFromCypress.tar');
            cy.readFile('myDownloads/tarFiles/myImageFromCypress.tar')
        })
    })
})