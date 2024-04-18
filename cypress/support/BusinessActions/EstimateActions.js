import EstimateLocators from '../../Locators/EstimateLocators';
import Settings_data from '../../fixtures/Settings_data.json';
import { generateUUID, getEnvUrl, removeDollar, selectFromDropdown } from '../commands';

export function fillAndAssertLineTotal(data, index, type) {
  cy.get(EstimateLocators.lineItem.name)
    .clear()
    .should("not.be.disabled")
    .type(type + ' ' + index)
    .blur();
  let lineTotal = 0.0;
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', 0);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  // hours * rate
  if (type === "part") {
    cy.get(EstimateLocators.lineItem.name).parents(EstimateLocators.jobs).children().last().within(() => {
      cy.get(EstimateLocators.partDetail.partSupplyNo).clear().type("part_" + generateUUID())
      cy.get(EstimateLocators.partDetail.vendor).clear().type("Honda")
      selectFromDropdown(EstimateLocators.partDetail.partConditionDropdown, "New")
      cy.get(EstimateLocators.partDetail.binLocation).clear().type("Warehouse2")
      cy.get(EstimateLocators.partDetail.addTagsButton).click()
      cy.get(EstimateLocators.partDetail.addTag).clear().type("VIP{enter}")
      cy.get(EstimateLocators.partDetail.addTag).clear().type("Frient{enter}")
      cy.get(EstimateLocators.partDetail.addTag).clear().type("Internal{enter}")

      cy.get(EstimateLocators.applyTax.isTaxedCheck).parent().parent().invoke("attr", "class")
        .then((taxClasses) => {
          if (taxClasses.includes("Mui-checked")) {
            if (!data.isTaxed) {
              // Caclculation
              cy.get(EstimateLocators.applyTax.isTaxedCheck).click() // OFF
              cy.wait('@updateJob').its('response.statusCode').should('eq', 200);
            }

          } else {
            if (data.isTaxed) {
              cy.get(EstimateLocators.applyTax.isTaxedCheck).click() // ON
              cy.wait('@updateJob').its('response.statusCode').should('eq', 200);
              // Caclculation
            }
          }
        })

      // Calculate salePrice w.r.t cost and pricing matrix
      cy.get(EstimateLocators.partDetail.cost).clear()
        .should("not.be.disabled").type(data.rate)
      selectFromDropdown(EstimateLocators.partDetail.pricingMatrixDropdown, "cypress_matrix")
    })
    for (let i = 0; i < Settings_data.pricingMatrices[0].ranges.length; i++) {
      if (data.rate <= Settings_data.pricingMatrices[0].ranges[i].endRange) {
        lineTotal = data.rate + ((data.rate * Settings_data.pricingMatrices[0].ranges[i].markUp) / 100)
      }
      if (Settings_data.pricingMatrices[0].ranges[i].endRange === "beyond" && lineTotal == 0.0) {
        lineTotal = data.rate + ((data.rate * Settings_data.pricingMatrices[0].ranges[i].markUp) / 100)
      }
    }
    cy.get(EstimateLocators.lineItem.salePrice).should("have.value", lineTotal)
  } else {
    cy.get(EstimateLocators.lineItem.salePrice).clear()
      .should("not.be.disabled").type(data.rate);
    lineTotal = data.rate;
  }

  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);

  // hours
  cy.get(EstimateLocators.lineItem.hoursOrQty).clear()
    .should("not.be.disabled").type(data.hours);
  lineTotal = lineTotal * data.hours; // Should be dynamic, taken from the labor class added to the RO
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  // ( hours * (rate + markupValue) ) - discountedValue
  cy.get(EstimateLocators.lineItem.name).parents(EstimateLocators.jobs)
    .find(EstimateLocators.valueToggleBtn + ':contains(' + data.discountType + ')')
    .click();
  // cy.get(EstimateLocators.lineItem.discount).should("not.have.class", "Mui-disabled")
  cy.get(EstimateLocators.lineItem.discount).clear()
    .should("not.be.disabled").type(data.discount).blur();
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);
  let discountedValue =
    data.discountType == '%' ?
      (lineTotal * data.discount) / 100
      : data.discount;
  let cost = lineTotal
  lineTotal = lineTotal - discountedValue;
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  let taxTotal = 0.0
  if (type === "part") {
    if (data.isTaxed) { // parts case only
      taxTotal = (lineTotal * Cypress.env("gstTax")) / 100; // Cypress.env("gstTax") is fixed
    }
  } else if (type === "labor") {
    taxTotal = (lineTotal * Cypress.env("gstTax")) / 100; // Cypress.env("gstTax") is fixed
  } else {
    taxTotal = 0.0 // Do not calculate tax in case of misc
  }
  lineTotal = lineTotal + taxTotal
  // cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
  //   .should('have.value', Math.round(lineTotal * 100) / 100); // bug

  return [data.hours, discountedValue, taxTotal, lineTotal, cost];
}

export function assertLineTotal(data, index, type) {
  cy.get(EstimateLocators.lineItem.name)
    .clear()
    .should("not.be.disabled")
    .type(type + ' ' + index)
    .blur();
  let lineTotal = 0.0;
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', 0);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  // hours * rate
  if (type === "part") {
    cy.get(EstimateLocators.lineItem.name).parents(EstimateLocators.jobs).children().last().within(() => {
      cy.get(EstimateLocators.partDetail.partSupplyNo).clear().type("part_" + generateUUID())
      cy.get(EstimateLocators.partDetail.vendor).clear().type("Honda")
      selectFromDropdown(EstimateLocators.partDetail.partConditionDropdown, "New")
      cy.get(EstimateLocators.partDetail.binLocation).clear().type("Warehouse2")
      cy.get(EstimateLocators.partDetail.addTagsButton).click()
      cy.get(EstimateLocators.partDetail.addTag).clear().type("VIP{enter}")
      cy.get(EstimateLocators.partDetail.addTag).clear().type("Frient{enter}")
      cy.get(EstimateLocators.partDetail.addTag).clear().type("Internal{enter}")

      cy.get(EstimateLocators.applyTax.isTaxedCheck).parent().parent().invoke("attr", "class")
        .then((taxClasses) => {
          if (taxClasses.includes("Mui-checked")) {
            if (!data.isTaxed) {
              // Caclculation
              cy.get(EstimateLocators.applyTax.isTaxedCheck).click() // OFF
              cy.wait('@updateJob').its('response.statusCode').should('eq', 200);
            }

          } else {
            if (data.isTaxed) {
              cy.get(EstimateLocators.applyTax.isTaxedCheck).click() // ON
              cy.wait('@updateJob').its('response.statusCode').should('eq', 200);
              // Caclculation
            }
          }
        })

      // Calculate salePrice w.r.t cost and pricing matrix
      cy.get(EstimateLocators.partDetail.cost).clear()
        .should("not.be.disabled").type(data.rate)
      selectFromDropdown(EstimateLocators.partDetail.pricingMatrixDropdown, "cypress_matrix")
    })
    for (let i = 0; i < Settings_data.pricingMatrices[0].ranges.length; i++) {
      if (data.rate <= Settings_data.pricingMatrices[0].ranges[i].endRange) {
        lineTotal = data.rate + ((data.rate * Settings_data.pricingMatrices[0].ranges[i].markUp) / 100)
      }
      if (Settings_data.pricingMatrices[0].ranges[i].endRange === "beyond" && lineTotal == 0.0) {
        lineTotal = data.rate + ((data.rate * Settings_data.pricingMatrices[0].ranges[i].markUp) / 100)
      }
    }
    cy.get(EstimateLocators.lineItem.salePrice).should("have.value", lineTotal)
  } else {
    cy.get(EstimateLocators.lineItem.salePrice).clear()
      .should("not.be.disabled").type(data.rate);
    lineTotal = data.rate;
  }

  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);

  // hours
  cy.get(EstimateLocators.lineItem.hoursOrQty).clear()
    .should("not.be.disabled").type(data.hours);
  lineTotal = lineTotal * data.hours; // Should be dynamic, taken from the labor class added to the RO
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  // ( hours * (rate + markupValue) ) - discountedValue
  cy.get(EstimateLocators.lineItem.name).parents(EstimateLocators.jobs)
    .find(EstimateLocators.valueToggleBtn + ':contains(' + data.discountType + ')')
    .click();
  // cy.get(EstimateLocators.lineItem.discount).should("not.have.class", "Mui-disabled")
  cy.get(EstimateLocators.lineItem.discount).clear()
    .should("not.be.disabled").type(data.discount);
  let discountedValue =
    data.discountType == '%' ?
      (lineTotal * data.discount) / 100
      : data.discount;
  let cost = lineTotal
  lineTotal = lineTotal - discountedValue;
  cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
    .should('have.value', Math.round(lineTotal * 100) / 100);
  cy.wait('@updateJob').its('response.statusCode').should('eq', 200);

  let taxTotal = 0.0
  if (type === "part") {
    if (data.isTaxed) { // parts case only
      taxTotal = (lineTotal * Cypress.env("gstTax")) / 100; // Cypress.env("gstTax") is fixed
    }
  } else if (type === "labor") {
    taxTotal = (lineTotal * Cypress.env("gstTax")) / 100; // Cypress.env("gstTax") is fixed
  } else {
    taxTotal = 0.0 // Do not calculate tax in case of misc
  }
  lineTotal = lineTotal + taxTotal
  // cy.get(EstimateLocators.lineItem.lineItemTotalAssertValue)
  //   .should('have.value', Math.round(lineTotal * 100) / 100); // bug

  return [data.hours, discountedValue, taxTotal, lineTotal, cost];
}

function getJobSection(itemType) {
  switch (itemType) {
    case "labor":
      return 0
    case "part":
      return 1
    default:
      return 2
  }
}

export function addItems(itemType, calCase, lineItemsCount, hoursTotal, costTotal, discount, taxTotal, jobTotal) {
  cy.fixture('Estimate_data').then((data) => {
    let type = getJobSection(itemType)
    let discountedTotal = costTotal + discount
    let taxedValue = 0.0
    cy.get(EstimateLocators.jobTotals.hoursTotal).as('hoursTotal');
    cy.get(EstimateLocators.jobTotals[itemType + "Total"]).as('costTotal');
    cy.get(EstimateLocators.jobTotals.taxTotal).as('taxTotal');
    cy.get(EstimateLocators.jobTotals.discountTotal).as('discountTotal');
    cy.get(EstimateLocators.jobTotals.jobTotal).as('jobTotalCount');

    cy.log("hoursTotal =" + hoursTotal)
    cy.log("costTotal =" + costTotal)
    cy.log("discount =" + discount)
    cy.log("taxTotal =" + taxTotal)
    cy.log("jobTotal =" + jobTotal)

    for (let i = 0; i <= 3; i++) {
      // cy.get(EstimateLocators.jobSections)
      //   .eq(type)
      //   .within(() => {
      cy.intercept('PUT', getEnvUrl() + 'estimate/job/update').as('updateJob' + i);

      cy.log(lineItemsCount)
      cy.get(EstimateLocators.addItemBtn + ":contains(" + itemType.charAt(0).toUpperCase() + itemType.slice(1) + ")")
        .focus()
        .click();
      cy.wait('@updateJob' + i).its('response.statusCode').should('eq', 200);
      if (i === 0) {
        cy.get(EstimateLocators.laborRows).should("not.have.text", "No Items Found")
      }
      cy.get(EstimateLocators.laborRows).should('have.length', i + lineItemsCount + 1);
      cy.get(EstimateLocators.laborRows)
        .eq(i + lineItemsCount)
        .within(() => {
          // Markup type = $|%  ||  Discount type = $|% | Tax type = O(No Tax) | Tax Class
          let lineTotals = fillAndAssertLineTotal(
            data[calCase + i],
            i,
            itemType,
          );
          hoursTotal = hoursTotal + lineTotals[0]
          discount = discount + lineTotals[1]
          costTotal = costTotal + lineTotals[4]
          // discountedTotal = discountedTotal + lineTotals[3]
          taxTotal = taxTotal + lineTotals[2]
          jobTotal = jobTotal + lineTotals[3];
          cy.log("hoursTotal =" + hoursTotal)
          cy.log("costTotal =" + costTotal)
          cy.log("discount =" + discount)
          cy.log("taxTotal =" + taxTotal)
          cy.log("jobTotal =" + jobTotal)
          // if (i == count) {
          // Validate job Totals
          if (itemType === "labor") {
            cy.get('@hoursTotal').should('contain', (Math.round(hoursTotal * 100) / 100).toString());
          }
          cy.get('@costTotal').should('contain', (Math.round(costTotal * 100) / 100).toString());
          cy.get('@discountTotal').should('contain', (Math.round(discount * 100) / 100).toString());
          cy.get('@taxTotal').should('contain', (Math.round(taxTotal * 100) / 100).toString());
          cy.get('@jobTotalCount').should('contain', (Math.round(jobTotal * 100) / 100).toString());
          // }
        });
      // });
    }
  });
}

export function calculateGrossProfit(sellPrice, totalTax, discount) {
  // let itemType = type == 0 ? 'labor' : 'part';
  let totalCost = 0.0
  let qtyLocator = ""
  let rateCostLocator = ""
  cy.get(EstimateLocators.laborRows).each((row, index, list) => {
    // cy.wrap(row)
    //   .parents(EstimateLocators.jobSections)
    //   .find("p.heading")
    //   .invoke("text")
    //   .then(sectionHeading => {
    qtyLocator = EstimateLocators.lineItemView.hoursOrQty
    rateCostLocator = EstimateLocators.lineItemView.salePrice
    cy.wrap(row)
      .find(qtyLocator)
      .invoke("text")
      .then(qty => {
        cy.wrap(row)
          .find(rateCostLocator)
          .invoke("text")
          .then(itemCost => {
            totalCost = Math.round((totalCost + (parseFloat(qty) * parseFloat(itemCost))) * 100) / 100
            cy.log(totalCost)
            if (index + 1 === list.length) {
              cy.log("Total Cost: " + totalCost)
              // return totalCost
              // setTotalCost(totalCost)
              let revenue = sellPrice - totalTax + discount
              let grossProfit = Math.round((revenue - totalCost) * 100) / 100
              let grossProfitMargin = Math.round(((grossProfit / revenue) * 100) * 100) / 100
              cy.log("revenue: " + revenue)
              cy.log("grossProfit: " + grossProfit)
              cy.log("grossProfitMargin: " + grossProfitMargin)
              cy.contains("Gross Profit:")
                .find("span")
                .should("have.text", "Gross Profit: $" + grossProfit.toString() + " | " + grossProfitMargin + " %")
            }
          })
      })
    // })
  })
}

export function addRepairTimes(count, loc, data) {
  for (let i = 1; i <= count; i++) {
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.selectRepairTime).click()
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.laborRate).type(data.laborRate)
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.markup).type(data.markup)
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.time).invoke("text").then(repairTime => {
      let observedTotal = (Math.round((repairTime) * 100) / 100) * (Math.round((data.laborRate) * 100) / 100)
      let markup = observedTotal / 100 * Math.round((data.markup) * 100) / 100
      observedTotal = Math.round(((observedTotal + markup)) * 100) / 100
      cy.get(loc.row + ":nth-child(" + i + ")").find(loc.total).should("contain", observedTotal)

    })
  }
}

export function addAndAssertRepairTimes(count, loc, data, laborTimes) {
  for (let i = 1; i <= count; i++) {
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.selectRepairTime).click()
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.laborRate).type(data.laborRate)
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.markup).type(data.markup)
    cy.get(loc.row + ":nth-child(" + i + ")").find(loc.time).invoke("text").then(repairTime => {
      let observedTotal = (Math.round((repairTime) * 100) / 100) * (Math.round((data.laborRate) * 100) / 100)
      let markup = observedTotal / 100 * Math.round((data.markup) * 100) / 100
      observedTotal = Math.round(((observedTotal + markup)) * 100) / 100
      cy.get(loc.row + ":nth-child(" + i + ")").find(loc.total).should("contain", observedTotal)


    })
  }
}