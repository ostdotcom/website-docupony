---
id: version-1.0.0-changelog
title: Changelog
sidebar_label: Changelog
original_id: changelog
---

### OST KIT⍺ - 19 March 2018

After reviewing the usage data from the initial public release of OST KIT⍺, we have implemented the following performance improvements:

- increased the number of database servers, augmenting IOPS;
- refactored certain database actions and optimized certain database queries;
- added additional application servers;
- enabled rate-limiting by public IP address to 100 transactions per second; and
- established a two-track system for API calls by API Key:
  	- a fast queue for rates at up to 2,000 transactions per two minutes; and
	- a slower queue to process transactions at higher rates, subject to the overall rate-limit of 100 transactions per second.

Additionally, [<u>OST VIEW</u>](https://view.ost.com/) was enhanced to reduce latency. OST VIEW, our custom-built block explorer for analyzing transactions on the OpenST network of side blockchains, is not a part of OST KIT⍺. However, OST VIEW is a powerful tool that will help you to leverage the strength of OST KIT⍺; even more so thanks to its recent user experience improvements.

**Thank you!**

Thanks to the OST community, the initial public release of OST KIT⍺ was super successful, with over 1,000 Branded Tokens deployed and over 2,000,000 token transfers executed. We learned a great deal in the initial public release, including from direct feedback. We hope these improvements underscore our commitment to enabling mainstream adoption of blockchain technology and to earning your confidence as the blockchain platform of choice for forward-thinking businesses.

We would love to know how these improvements impact your experience of OST KIT⍺, [<u>so be in touch</u>](https://help.ost.com/support/discussions)!

### OST KIT⍺ - 15 March 2018

Our initial public release of OST KIT⍺.
