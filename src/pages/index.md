---
title: Adobe Express Add-ons
description: Adobe Express is an all-in-one content creation app that makes it fast, easy and fun to design standout flyers, TikToks, resumes, Reels, banners, logos, invitations, webpages and so much more. Add-ons allow developers to extend the core functionality of Adobe Express, with a dedicated marketplace for them to be distributed for others to discover and enjoy.
keywords:
  - Adobe Express
  - Add-ons
  - API Documentation
  - JavaScript
  - TypeScript
  - SDK
  - Extensibility
  - Developer Tooling
---

import './styles/main.css'
import CreatorToolBox from "./add-ons/creatorToolBox.md"
import DeveloperToolBox from "./add-ons/developerTool.md"
import LearnMoreBtn from "./add-ons/learnmore.md"
import bgImg from "./images/Summary_BgImage.jpg"

<Hero slots="heading, text, buttons, assetsImg" customLayout variant="halfwidth" className="add-ones-hero"/>

## Make building add-ons your superpower.

[Adobe Express](https://adobe.com/express) is an all-in-one design, photo, and video tool to make content creation easy.  Build add-ons to extend the functionality of Adobe Express and unlock new creative workflows for users.

- [Get started](https://developer.adobe.com/express/add-ons/docs/guides)
- [Explore add-ons](https://new.express.adobe.com/new?category=addOns&addOnId=)

homeheroAssertImage

<TextBlock slots="heading" className="announcement" theme="light"/>

### Expand the creator toolbox.

<WrapperComponent slots="content" repeat="1" theme="light" className="wrapperforCreatorTool"/>

<CreatorToolBox />

<WrapperComponent slots="content" repeat="1" theme="light" className="learnMoreWrapper"/>

<LearnMoreBtn />

<TextBlock slots="heading" className="announcement exploreCapabilities" theme="lightest"/>

### Explore our capabilities.

<TextBlock slots="image, heading,text,buttons" theme="lightest" headerElementType="h2" variantsTypePrimary='secondary' variantStyleFill = "outline" homeZigZag className="explore" position="right"/>

![Abstract illustration of add-ons panel in Adobe Express](images/Explore_Image_1.png)

### Leverage familiar web technologies.

Use HTML, CSS, JavaScript/TypeScript, and [Spectrum](https://developer.adobe.com/express/add-ons/docs/guides/design/) to build native-feeling user experiences for your add-on.

- [Learn more](https://developer.adobe.com/express/add-ons/docs/guides/develop/frameworks-libraries-bundling/)

<TextBlock slots="heading,text,image,buttons" theme="lightest" headerElementType="h2" variantsTypePrimary='secondary' variantStyleFill = "outline" homeZigZag className="explore" position="left" />

### Connect to other services.

Tap into helper libraries to access secure API endpoints with OAuth 2.0.

![Abstract illustration of services being connected in a secure manner](images/Explore_Image_2.png)

- [Learn more](https://developer.adobe.com/express/add-ons/docs/guides/develop/#authorization-with-oauth-20)

<TextBlock slots="image, heading,text,buttons" theme="lightest" headerElementType="h2" variantsTypePrimary='secondary' variantStyleFill = "outline" homeZigZag className="explore" position="right" />

![Illustration of dragging and dropping an asset into Adobe Express](images/Explore_Image_3.png)

### Import from anywhere.

Enable users to drag and drop any image or video asset to a document.

- [Learn more](https://developer.adobe.com/express/add-ons/docs/guides/develop/#importing-content)

<TextBlock slots="heading,text,image,buttons" theme="lightest" headerElementType="h2" variantsTypePrimary='secondary' variantStyleFill = "outline" homeZigZag className="explore" position="left"/>

### Export to everywhere.

Export renditions of your users' work to a variety of formats.

![Illustration showing the ability to export assets to other surfaces from Adobe Express](images/Explore_Image_4.png)

- [Learn more](https://developer.adobe.com/express/add-ons/docs/guides/develop/#exporting-content)

<TextBlock slots="image, heading,text" theme="lightest" headerElementType="h2" variantsTypePrimary='secondary' variantStyleFill = "outline" homeZigZag className="explore" position="right" />

![Illustration showing that new APIs are coming soon.](images/Explore_Image_5.png)

### More in the works.

Powerful new APIs are right around the corner.

<TextBlock slots="heading,text" className="announcement exploreCapabilities" theme="light"/>

### Build and share your add-on in no time.

We’ve got a set of libraries and developer tools to make your job even easier.

<WrapperComponent slots="content" repeat="1" theme="light" className="wrapperforCreatorTool"/>

<DeveloperToolBox />

<TextBlock slots="heading" className="announcement resourceHeader" theme="lightest"/>

### We've got your resources covered.

<MiniResourceCard slots="image,heading,link" repeat="3" theme="lightest" inRow="3" className="mini-card" />

![Adobe Express logo over a gradient background](images/LogoSDK.jpg)

### Blog

[Link to blog post](https://adobe.ly/expressaddons)

![Icon showing a code block](images/code.jpg)

### Code samples

[Link to code samples](https://developer.adobe.com/express/add-ons/docs/samples/)

![Icon showing a changelog](images/change_log.jpg)

### Changelog

[Link to changelog](https://developer.adobe.com/express/add-ons/docs/references/changelog//)

<TeaserBlock  slots="heading,text,buttons" textColor="white" bgURL={bgImg} className="viewAddOn" variant="fullwidth"/>

<p className="teaserBlockCustomHeading">It's go time.</p>

View our developer quickstart guide to start building add-ons in Adobe Express.

- [View the guide](https://developer.adobe.com/express/add-ons/docs/guides/getting_started/quickstart/)
- [Try an add-on](https://new.express.adobe.com/new?category=addOns&addOnId=)
