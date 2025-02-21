import "../styles/main.css";
import TrendingCards from "./trending-cards.md";
import DeveloperChampions from "./developer-champions";

<Hero slots="image, heading, text" variant="fullwidth" className="trending-hero"/>

![Trending banner](./images/trending-add-ons.jpg)

# Trending add-ons

See what add-ons others are using to get the most out of Adobe Express

<WrapperComponent slots="content" repeat="1" theme="light" />

<TrendingCards />

<TextBlock slots="heading,text" className="announcement exploreCapabilities" theme="light"/>

### Add-ons built by developer champions

Check out selected add-ons from our Adobe Developer Champions

<WrapperComponent slots="content" repeat="1" theme="light" />

<DeveloperChampions />
