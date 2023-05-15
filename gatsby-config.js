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
  siteMetadata: {
    pages: [
      // {
      //   title: 'Docs',
      //   path: 'docs'
      // },
      // {
      //   title: 'Adobe Express',
      //   path: 'docs'
      // },
      {
        title: 'Add-ons',
        path: '/add-ons'
      },
      {
        title: 'Embed SDK',
        path: 'https://developer.adobe.com/embed-sdk'
      },
      {
        title: 'Documentation',
        menu: [
          {
            title: 'Embed SDK',
            path: 'https://developer.adobe.com/embed-sdk'
          },
          {
            title: 'Quick actions'
          },
        ]
      }
    ],
    // subPages: [
    //   {
    //     title: 'Docs',
    //     path: '/docs/',
    //     pages: [
    //       {
    //         title: 'Overview',
    //         path: '/docs/index.md'
    //       }
    //     ]
    //   },
    // ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
