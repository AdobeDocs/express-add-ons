/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/express/add-ons/',
  // pathPrefix: process.env.PATH_PREFIX || '/express-add-ons/',
  siteMetadata: {
    "home": {
      "title": "Products",
      "path": "https://developer.adobe.com/apis"
    },
    pages: [
      {
        title: 'Adobe Express',
        path: 'https://developer-stage.adobe.com/express'
      },
      {
        title: 'Add-ons',
        path: '/'
      },
      {
        title: 'Embed SDK',
        path: 'https://developer-stage.adobe.com/express/embed-sdk'
      },
      {
        title: 'Documentation',
        menu: [
          {
            title: 'Add-ons',
            path: 'https://developer-stage.adobe.com/express/add-ons/docs/guides/'
          },
          {
            title: 'Embed SDK',
            path: 'https://developer-stage.adobe.com/express/embed-sdk/docs/'
          },
        ]
      }
    ],
    credentialsConfig: {
      signIn: {
        title: "Get credentials",
        description: "Create unique credentials that you will use to call the Adobe Express Embed SDK from your application.",
        buttons: [
          {
            label: "Sign in to create credentials",
            link: "https://account.adobe.com/",
            variant: "primary"
          }
        ]
      },
      betaProgram: {
        title: "Get credentials",
        description: `To create credentials, you need developer role permission for the <b>[Adobe Express Embed SDK].</b>`,
        link: "<a href>How do I get developer permissions for the [Adobe Express Embed SDK]?</a>",
        info: `You're currently signed in as <b>[samcook@orgname.com]</b>`,
        instruction: `Have a personal account? Try to log in with that account to access your personal developer organization.`,
        buttons: [
          {
            label: "Sign in as a different user",
            link: "https://account.adobe.com/",
            variant: "primary"
          }
        ]
      },
      createCredentials: {
        title: "Get credentials",
        description: "Create unique credentials that you will use to call the Adobe Express Embed SDK from your application.",
        fields: [
          {
            type: "textBox",
            label: "Credential name*",
            letters: 30,
            helperText: "Credential name must be unique and between 3 and 45 character long."
          },
          {
            type: "textArea",
            label: "Allowed domains(up to 5)*",
            letters: 30,
            helperText: "Use wildcards to enter multiple subdomains (*my-domains.com) or commas to separete multiple domains (www.domain-1.com,www.domain-2.com). During local development, you can include post greayer than 1023 with localhost (e.g. localhost:3000). Standard ports(80,443) will be used for non-localhost domains."
          },
          {
            type: "checkbox",
            label: "Download a personalized code sample "
          },
          {
            type: "selectbox",
            label: "Language*",
            options: ["Node Js", "Python"],
            placeholder: "Select language for your code sample"
          },
          {
            type: "checkbox",
            label: "By checking this box, you agree to <a href='https://www.adobe.com/'>Adobe Developer Terms of Use.</a>"
          },
          {
            type: "button",
            label: "Create credentials"
          },
        ]
      },
      apiKeyCredential: {
        title: "API key credential",
        description: "Submitting this form creates an API Key credential. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.",
        learnMore: {
          title: "Learn more",
          description: [
            {
              label: "Authentication documentation",
              link: "",
            },
            {
              label: "Adobe Express Embed SDK documentation",
              link: "",
            }
          ]
        }
      },
      myNewCredential: {
        title: "Your credential is ready to use",
        description: "Check the downloads section of your browser for the ZIP file, or find it where you save downloads on your machine.",
        nextStep: "Next Steps",
        developerConsole: "Manage on Developer Console",
        apiKeyCredential: {
          title: "API KEY CREDENTIAL",
          description: "An API Key credential was created. The API key credential identifies your application to Adobe servers and can help accept or reject requests originating from certain domains.",
          learnMore: {
            title: "LEARN MORE",
            description: [
              {
                label: "Authentication documentation",
                link: "",
              },
              {
                label: "Adobe Express Embed SDK documentation",
                link: "",
              }
            ]
          }
        }
      },
      error: {
        label: "Get Help",
        link: ""
      }
    }
  },
  plugins: [`@adobe/gatsby-theme-aio`],
};
