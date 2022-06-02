const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function Project(id, name, type, state, clientCUIT, resources) {
   this.id = id;
   this.name = name;
   this.type = type;
   this.state = state;
   this.client = clientCUIT;
   this.resources = resources;
   this.risk = "";
};

function addRiskTo(idRisk, aProject, currentProjectID) {
   if(currentProjectID == aProject.id){
      aProject.risk = idRisk;
   }
   return aProject;
};

var projects = [
   new Project("4E562GT567", "Diseño del Front-end", "Desarrollo", "Creado", 27456785438, []),
   new Project("4E562GT568", "Diseño del Back-end", "Desarrollo", "Iniciado", 27843246768, []),
   new Project("4E562GT569", "Diseño del logo", "Diseño", "Creado", 27656787658, []),
   new Project("4E562GT570", "Preparacion de la publicidad de la aplicacion de proyectos", "Marketing", "Iniciado", 27843246768, []),
];

Given('I have a bunch of projects to select one from', function () { 
});  

Given('I have a bunch of projects to filter by client', function () {
});

Given('I am on project {string}', function (idProject) {
   this.currentProjectID = idProject;
});

When('I ask for project {string}', function (requiredProject) {
   this.selectedProject = projects.find(project => project.id == requiredProject);   
});

When('I ask for the projects of client with CUIT {int}', function (CUITClient) {
   selectedProjectsByClient = projects.filter(project => project.client == CUITClient);
   this.selectedProjectsIDByClient = selectedProjectsByClient.map(project => project.id);
});

When('I add the risk {string}', function (idRisk) {
   projects = projects.map(project => addRiskTo(idRisk, project, this.currentProjectID));
});

When('I remove the risk', function () {
   projects = projects.map(project => addRiskTo("", project, this.currentProjectID));
});

Then('I shoud return project {string}', function (expectedProject) {
   assert.strictEqual(this.selectedProject.id, expectedProject);
});

Then('I shoud return the list of projects {string}', function (expectedListProjects) {
   if(expectedListProjects===""){
      assert.deepStrictEqual(this.selectedProjectsIDByClient, []);      
   }else{
      assert.deepStrictEqual(this.selectedProjectsIDByClient, expectedListProjects.split(','));
   }
});

Then('I shoud have the assosiation {string}', function (expectedAssosiation) {
   currentProject = projects.find(project => project.id == this.currentProjectID);
   association = "{project: "+ this.currentProjectID+", risk: "+currentProject.risk+"}"; 
   assert.strictEqual(association, expectedAssosiation);
});
