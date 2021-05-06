const getUrl = ({ view, page, search }) => {
  let params = `${search ? `search=${search}` : ""}`;
  params = `${params}${page ? `${params !== "" ? "&" : ""}page=${page}` : ""}`;
  return `http://localhost:3000/${view}${params && "?"}${params}`;
};

describe("Full Navigation", () => {
  it("Ensure history stack and url are functioning properly", () => {
    cy.visit(`/`);
    cy.contains(`Ike`);
    cy.url().should(`include`, `/card`);

    cy.reload();
    cy.url().should(`include`, `/card`);

    cy.get(`[value="/card"]`).click();
    cy.url().should(`include`, `/card`);

    cy.get(`[value="/list"]`).click();
    cy.url().should(`include`, `/list`);
    cy.contains(`Ike`);

    cy.reload();
    cy.url().should(`include`, `/list`);

    cy.get(`[href="/list"]`).should(`not.exist`);
    cy.get(`[href="/list?page=0"]`)
      .invoke(`attr`, `aria-disabled`)
      .should(`eq`, `true`);

    cy.get(`[href="/list?page=144"]`).first().click();
    cy.contains(`Trae`);
    cy.url().should(`eq`, getUrl({ view: "list", page: 144 }));
    cy.get(`[href="/list?page=145"]`)
      .invoke(`attr`, `aria-disabled`)
      .should(`eq`, `true`);

    cy.reload();
    cy.url().should(`eq`, getUrl({ view: "list", page: 144 }));
    cy.contains(`Trae`);

    cy.get(`[value="/card"]`).click();
    cy.url().should(`eq`, getUrl({ view: "card", page: 144 }));
    cy.contains(`Trae`);

    cy.reload();
    cy.url().should(`eq`, getUrl({ view: "card", page: 144 }));
    cy.contains(`Trae`);

    cy.go(`back`);
    cy.url().should(`eq`, getUrl({ view: "list", page: 144 }));
    cy.contains(`Trae`);

    cy.go(`back`);
    cy.url().should(`eq`, getUrl({ view: "list" }));
    cy.contains(`Ike`);

    cy.go(`forward`);
    cy.url().should(`eq`, getUrl({ view: "list", page: 144 }));

    cy.go(`forward`);
    cy.url().should(`eq`, getUrl({ view: "card", page: 144 }));

    cy.get(`input`).invoke(`attr`, `placeholder`).should(`eq`, `Search`);
    cy.get(`input`).type(`Baker`);
    cy.get(`input`).type(`{enter}`);

    cy.url().should(`eq`, getUrl({ view: "card", search: "Baker" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Baker`);
    cy.contains(`Mark Baker`);

    cy.reload();
    cy.url().should(`eq`, getUrl({ view: "card", search: "Baker" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Baker`);
    cy.contains(`Mark Baker`);

    cy.get(`[value="/list"]`).click();
    cy.url().should(`eq`, getUrl({ view: "list", search: "Baker" }));
    cy.contains(`Mark Baker`);

    cy.go(`back`);
    cy.url().should(`eq`, getUrl({ view: "card", search: "Baker" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Baker`);
    cy.contains(`Mark Baker`);

    cy.get(`input`).clear();
    cy.reload();
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Baker`);

    cy.get(`input`).clear().type(`Ba`);
    cy.get(`input`).type(`{enter}`);
    cy.url().should(`eq`, getUrl({ view: "card", search: "Ba" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Ba`);
    cy.contains(`Kenny Battle`);

    cy.go(`back`);
    cy.url().should(`eq`, getUrl({ view: "card", search: "Baker" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Baker`);
    cy.contains(`Mark Baker`);

    cy.go(`forward`);
    cy.url().should(`eq`, getUrl({ view: "card", search: "Ba" }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Ba`);
    cy.contains(`Kenny Battle`);

    cy.get(`[href="/card?search=Ba&page=2"]`).first().click();
    cy.url().should(`eq`, getUrl({ view: "card", search: "Ba", page: 2 }));
    cy.get(`input`).invoke(`attr`, `value`).should(`eq`, `Ba`);
    cy.contains(`Erick Barkley`);

    cy.get(`[href="/card?search=Ba&page=5"]`).click();
    cy.get(`[value="/list"]`).click();
    cy.url().should(`eq`, getUrl({ view: "list", search: "Ba", page: 5 }));
    cy.contains(`Aron Baynes`);

    cy.reload();
    cy.url().should(`eq`, getUrl({ view: "list", search: "Ba", page: 5 }));
    cy.contains(`Aron Baynes`);

    cy.go(`back`);
    cy.url().should(`eq`, getUrl({ view: "card", search: "Ba", page: 5 }));
    cy.contains(`Aron Baynes`);
  });
});
