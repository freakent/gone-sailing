---
category: boat-projects
tags: [batteries, solar]
title: Is your Victron battery monitor lying to you?
subtitle: "Default settings need to be changed for use with Solar"
content_baseurl: /studio
images:
    - ref: BMV712
      file: IMG_0636.jpeg
      title: Victron Energy Battery Monitor
    - ref: app100pct
      file: IMG_0333.jpeg
      title: "100% State of charge"
    - ref: appsync
      file: Frame-14-08-2022-11-21-26.jpg
      title: Automatic synchronisations in Victron Connect App
    - ref: appsettings
      file: Frame-14-08-2022-12-17-37.jpg
      title: Synchronisation settings in Victron Connect app
---
If you have a Victron Energy BMV battery monitor and you charge your batteries by solar, you should check your battery monitor’s automatic synchronisation settings. Otherwise, you may think your batteries are 100% charged when they are in fact much lower. 

### Automatic Synchronisations 
The Victron BMV uses a simple algorithm to decide whether your batteries are fully charged or not. If your battery voltage is "relatively high" and current "relatively low" for a few minutes then it assumes your batteries are fully charged and automatically synchronises the system to 100% State of charge (SOC).  

This is based on the basic electronic principle that battery voltage will increase whilst the charge current will reduce, as your batteries approach 100% SOC. 

However, in a Solar charged set up it is not uncommon for the MPPT to deliver periods of fluctuating voltage with less current due to cloud cover or shading of the panels. With the default battery monitor settings this can fool the battery monitor into thinking the battery has reached 100% SOC. 

Use the Victron Connect app to connect to your BMV and open the History tab. If the number of synchronisations is regularly increasing you should consider updating the synchronisation settings. Ideally your BMV should read 100% SOC when your Consumed Ah reaches zero.

![app100pct]{: .img-thumbnail}
![appsync]{: .img-thumbnail}

### Synchronisation Settings
The actual values of the “relatively high” battery voltage and “relatively low” current can be set in the Victron Connect app under Charged Voltage and Tail Current. The manual for the Victron BMV makes this helpful suggestion: 
<div class="card">
<div class="card-body">
In solar systems or other applications with fluctuating charge currents, the following measures can be taken to reduce the probability for the BMV to reset prematurely to 100 % state of charge:
<br>
a) Increase the “charged” voltage to only slightly below the absorption charge voltage (for example: 14.2 V in case of 14.4 V absorption voltage).
<br>
b) Increase the “charged” detection time and/or decrease the tail current to prevent an early reset due to to passing clouds.
</div></div><br>
By default, Charged Voltage is set to 13.2V, the Tail Current is set to 4% of Battery capacity and the charged detection time to 3 mins.  If you are charging with Solar and leave these settings set to their default values then it is likely that you will experience automatic synchronisations well before the batteries are actually at 100% SOC. I have seen automatic synchronisation occur while charging with solar at levels that actually would be under 90% SOC.  Your battery monitor will be telling you the batteries are fully charged when they are not. 

It’s important to remember these settings don’t affect the MPPT's actual charging of the batteries. If you have plenty of sunlight then the MPPT will keep charging the batteries through its bulk, absorption and float phases, even though your battery monitor already synchronised to 100% SOC. 

There is plenty of debate as to the best values to use for these Charged Voltage, Tail Current and Charged Detection Time settings. The general advice is to leave them as default unless you know what you are doing, but clearly that’s not good enough. The manual suggests changing the Charged voltage to 0.2v below absorption voltage. On the Victron forums they suggest using a value closer to the float voltage. The actual values you should use will depend on what type of batteries you have (lead acid, AGM or lithium), the battery manufacturers recommendations for charging voltage levels and your overall battery capacity. 


![appsettings]{: .img-thumbnail}


I personally think that the actual voltage and battery current seen whilst the MPPT is in float phase are the best indication of 100% SOC and a good guide to what you should set the charged voltage and tail current to (assuming your MPPT s are configured correctly that is). In my system I have Charged Voltage 0.2 above float voltage and tail current set to 2% of battery capacity. I also increased the Charged Detection Time to 5 mins. I don’t know if these values are perfect yet, but I am sure they are better than the default values. I will continue to monitor the monitor. 

What's your experience with battery monitors with solar? Feel free to send me a message on Instagram to discuss.

{% md_image_links %}


[Plymouth Yacht Haven]: https://www.yachthavens.com/plymouth-yacht-haven "go to Plymouth Yacht Haven's website"
[The Bridge]: http://www.bridgeatmountbatten.com/ "go to The Bridge's website"
[Brixham Marina]: https://www.mdlmarinas.co.uk/marinas/mdl-brixham-marina/ "go to MDL Brixham's website"
[Liberty]: https://www.libertybrixham.co.uk/ "go to Liberty Brixham's website"
