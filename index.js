const inquirer = require("inquirer");
const fs = require("fs");

const readme_info = {
  project: "",
  description: "",
  installation: "",
  usage: "",
  contribution: "",
  tests: "",
  github: "",
  email: "",
  license: "",
};

const license_badges = {
  ISC:
    "https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC",
  MIT:
    "https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT",
  BSD:
    "https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause",
};

// helper function to prompt user for info
const promptUser = (name, message) => {
  return inquirer.prompt([
    {
      type: "input",
      name,
      message,
    },
  ]);
};

// ask the user for all of the readme info
const getREADME_Info = async () => {
  // prompt the user for project title
  const projectQuestion = await promptUser(
    "name",
    "Enter Project Title \nMake sure the title describes the project: "
  );
  readme_info.project = projectQuestion.name;

  // prompt the user for project description
  const descriptionQuestion = await promptUser(
    "discription",
    `Enter Description
        Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:
            - What was your motivation?
            - Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
            - What problem does it solve?
            - What did you learn?\n
    `
  );
  readme_info.description = descriptionQuestion.discription;

  // prompt the user for installion instructions
  const installationtQuestion = await promptUser(
    "installation",
    ` What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

    `
  );
  readme_info.installation = installationtQuestion.installation;

  // prompt the user for usage instructions
  const usageQuestion = await promptUser(
    "usage",
    ` Provide instructions and examples for use. Include screenshots as needed.
            To add a screenshot, create an \`assets/images\` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:
                md
                ![alt text](assets/images/screenshot.png)
                
    `
  );
  readme_info.usage = usageQuestion.usage;

  // prompt the user for contribution instructions
  const contributionQuestion = await promptUser(
    "contribution",
    "If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.\n"
  );
  readme_info.contribution = contributionQuestion.contribution;

  // prompt the user for test instructions
  const testQuestion = await promptUser(
    "tests",
    "Go the extra mile and write tests for your application. Then provide examples on how to run them here.\n"
  );
  readme_info.tests = testQuestion.tests;

  // prompt the user for their github account name
  const githubQuestion = await promptUser(
    "github",
    "Enter your giuthub account username\n"
  );
  readme_info.github = githubQuestion.github;

  // prompt the user for email address
  const emailQuestion = await promptUser("email", "Enter your email\n");
  readme_info.email = emailQuestion.email;

  // prompt for the license
  const licenseQuestion = await inquirer.prompt([
    {
      type: "list",
      name: "license",
      message: "Choose your package license: ",
      choices: ["MIT", "BSD", "ISC"],
    },
  ]);
  readme_info.license = licenseQuestion.license;
};

// creates the readme file
const createREADME = () => {
  return `
  [![License: ${readme_info.license}](${license_badges[readme_info.license]})


  # ${readme_info.project}

  ## Description

  ${readme_info.description}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contribute](#contribute)
  - [Test](#test)
  - [Questions](#questions)

  ## Installation

  ${readme_info.installation}

  ## Usage

  ${readme_info.usage}

  ## License

  This package is governed by the ${readme_info.license} license.

  ## Contribute

  ${readme_info.contribution}

  ## Tests

  ${readme_info.tests}

  ## Questions

  [link to GitHub Account!](http://github.com/${readme_info.github})

  Any additonal questions, please hit me up at my email address: ${
    readme_info.email
  }
    `;
};

// prints readme to a file
const print_README_to_file = () => {
  const filename = "./README.md";
  const content = createREADME();
  fs.writeFileSync(filename, content);
  console.log("README.md file created! Thanks for using my program!\n");
};

getREADME_Info().then(() => print_README_to_file());
