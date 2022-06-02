Feature: User wants administrate his projects

  Scenario: User requests to open a project
    Given I have a bunch of projects to select one from
    When I ask for project "4E562GT567"
    Then I shoud return project "4E562GT567"

  Scenario: User filters projects by client
    Given I have a bunch of projects to filter by client
    When I ask for the projects of client with CUIT 27843246768
    Then I shoud return the list of projects "4E562GT568,4E562GT570"

  Scenario: User filters projects by client who does not exists
    Given I have a bunch of projects to filter by client
    When I ask for the projects of client with CUIT 27843246666
    Then I shoud return the list of projects ""

  Scenario: User wants to add a risk to a projects
    Given I am on project "4E562GT567"
    When I add the risk "ABCDEFGHIJ"
    Then I shoud have the assosiation "{project: 4E562GT567, risk: ABCDEFGHIJ}"

  Scenario: User wants to delete a risk from a projects
    Given I am on project "4E562GT567"
    When I remove the risk
    Then I shoud have the assosiation "{project: 4E562GT567, risk: }"
