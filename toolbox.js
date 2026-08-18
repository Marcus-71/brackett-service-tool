/*
 * Toolbox - board programming / data-loading procedures and the manufacturers'
 * phone / Bluetooth service and setup apps (current and legacy), with when to
 * use each. Distinct from Error Codes (a specific fault) and Diagnostic Help
 * (a symptom with no code) - this is "how do I use this tool, and when."
 * Built from official manufacturer documentation only (71 entries).
 * Fields beyond the original schema: era current|legacy, platforms[], notes[],
 * links[{label,url}], manuals[{title,seedFile}], source. Same starter/verify
 * caveat as the rest of the app.
 */

const TOOLBOX = [
 {
  "id": "tb-carrier-usb-upgrade",
  "brand": "Carrier",
  "family": "Bryant / Payne - Infinity / Evolution System Control, Series C (SYSTXCCITC01-C, SYSTXCCWIC01-C)",
  "toolName": "MyInfinity software download + USB C software update",
  "equipment": "Thermostat/Control",
  "title": "System Wall Control - USB C software update (non-Wi-Fi / OTA-failed fallback)",
  "whenToUse": "The Infinity/Evolution System Control itself needs a software update and the control is not on Wi-Fi, or the over-the-air push failed. On a Wi-Fi-connected control use the OTA method instead. To update an outdoor unit's own board (PCM/VFD), use the Service Technician app over Bluetooth, not this.",
  "requirements": [
   "A USB C flash drive, 4 GB to 32 GB (Carrier states this size range gives best results)",
   "A PC or Mac to download and unzip the update package",
   "Access to www.MyInfinityTouch.Carrier.com/Infinity/Downloads",
   "Physical access to the wall control's USB C port (on the bottom of the control)"
  ],
  "steps": [
   "On a computer, open the downloads page at www.MyInfinityTouch.Carrier.com/Infinity/Downloads and click the link under Download Latest Software.",
   "Read the End User License Agreement and choose Yes at the bottom to accept it - the download is blocked if you decline.",
   "Use the Download link provided inside the EULA document to download the software update package (a .zip).",
   "In the unzip window, click the TSTAT folder icon ONCE to highlight it, then click EXTRACT.",
   "Choose the USB C device's root directory as the extract location. When it finishes, the TSTAT folder should be on the root of the drive - verify the files, including the .hex file, are inside it.",
   "At the wall control, select MENU, then the SERVICE icon, and choose the software update option for USB C.",
   "Insert the USB C drive into the port on the bottom of the Infinity System Control and press Yes to continue - the upload and installation take several minutes.",
   "When the \"successful\" message appears, touch DONE. The control restarts on its own.",
   "Once the control has fully restarted, remove the USB C drive."
  ],
  "caution": "Use a 4-32 GB USB C device. Do not pull the drive or interrupt power until the control has finished restarting. The TSTAT folder must sit at the root of the drive, not inside another folder.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "USB",
   "Windows",
   "web"
  ],
  "notes": [
   "Series C controls also take over-the-air updates over Wi-Fi - see tb-carrier-infinity-ota-update.",
   "Series A/B Infinity Touch controls use a similar but not identical plain-USB procedure from the Service menu; the Series A steps were not verified from a live official document, so they are not published here."
  ],
  "links": [
   {
    "label": "MyInfinity software downloads",
    "url": "https://www.myinfinitytouch.carrier.com/Infinity/Downloads"
   }
  ],
  "manuals": [
   {
    "title": "Infinity System Control Owner's Manual (OMSYSTXCCITC-VC-01, ed. 07/24)",
    "seedFile": "toolbox-carrier-infinity-system-control.pdf"
   }
  ],
  "source": "Carrier Owner's Manual OMSYSTXCCITC-VC-01 (07/24), sections 13.3 Software Update for Series C and 13.4 Updating Software Using USB C for Series C - https://www.shareddocs.com/hvac/docs/1009/Public/01/OMSYSTXCCITC-VC-01.pdf (PDF downloaded and read for this entry)"
 },
 {
  "id": "tb-carrier-infinity-ota-update",
  "brand": "Carrier",
  "family": "Bryant / Payne - Infinity / Evolution System Control, Series C",
  "toolName": "Infinity System Control - Updating Software Using Wi-Fi (OTA)",
  "equipment": "Thermostat/Control",
  "title": "Approve and install a pending over-the-air software update on a Wi-Fi-connected control",
  "whenToUse": "The control is on Wi-Fi and a \"software update available\" reminder banner is showing on the home screen. This is the normal path on connected systems - USB C is the fallback.",
  "requirements": [
   "Control connected to the home Wi-Fi network and to the MyInfinity server (check the Remote Access Status screen)"
  ],
  "steps": [
   "When an update is available, a software update reminder message appears on the home screen - touch anywhere inside that message.",
   "Review the current version vs. the update version shown. Touch DETAILS to read the release notes if you want them.",
   "Select YES to start the update. The control reboots to finish; all previously stored information and settings are kept.",
   "Selecting NO instead lets you set a later reminder or disable the reminder for that particular update."
  ],
  "caution": "Updates download automatically over Wi-Fi but only install when someone approves them on this screen - a customer who keeps pressing NO will sit on old software indefinitely.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Fallback when the control is not connected: tb-carrier-usb-upgrade."
  ],
  "links": [
   {
    "label": "MyInfinity software downloads",
    "url": "https://www.myinfinitytouch.carrier.com/Infinity/Downloads"
   }
  ],
  "manuals": [
   {
    "title": "Infinity System Control Owner's Manual (OMSYSTXCCITC-VC-01, ed. 07/24)",
    "seedFile": "toolbox-carrier-infinity-system-control.pdf"
   }
  ],
  "source": "Carrier Owner's Manual OMSYSTXCCITC-VC-01 (07/24), section 13.5 Updating Software Using Wi-Fi - https://www.shareddocs.com/hvac/docs/1009/Public/01/OMSYSTXCCITC-VC-01.pdf (PDF read for this entry)"
 },
 {
  "id": "tb-carrier-infinity-wifi-setup",
  "brand": "Carrier",
  "family": "Bryant / Payne - Infinity / Evolution System Control, Series C",
  "toolName": "Infinity System Control - Wireless setup and MyInfinity registration",
  "equipment": "Thermostat/Control",
  "title": "Put the wall control on the home Wi-Fi and register it to MyInfinity / the Carrier Home app",
  "whenToUse": "New Infinity System Control install, or a callback after the customer changed routers or Wi-Fi passwords and lost remote access.",
  "requirements": [
   "The home Wi-Fi SSID and security key, in hand before you start",
   "For registration: the control's MAC address and serial number (or the QR code on the registration screen)"
  ],
  "steps": [
   "Select WIRELESS from the menu screen.",
   "Make sure the Wi-Fi connection is enabled by touching ENABLED.",
   "Touch SETUP A WI-FI CONNECTION, then SCAN FOR AVAILABLE ACCESS POINTS.",
   "Find the router/access point SSID in the list and select it - it outlines in faint blue with a checkmark - then select NEXT.",
   "Choose the Wi-Fi security type (auto-detect usually identifies it correctly); if a security key is required, touch the white bar, enter the key on the on-screen keyboard, and select NEXT.",
   "The control reports whether the connection succeeded - touch DONE. If it failed, verify the entries and touch RETRY.",
   "Register the unit at www.MyInfinityTouch.com or in the Carrier Home mobile app. Registration needs the MAC address and serial number: on the control go to Menu > down arrow > Wireless > View MyInfinity Registration Info. In the mobile app you can photograph the QR code on that screen and the fields fill in for you.",
   "When the MyInfinity server connection is established, the status screen shows Connected for both Wi-Fi and the server."
  ],
  "caution": "On the home screen, a red X over the signal bars means no Wi-Fi connection; a triangle over the bars means Wi-Fi is fine but the MyInfinity server is unreachable. Carrier makes no warranty that a given phone, ISP, or carrier will stay compatible - do not promise a customer remote access will survive their ISP's changes.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "The 07/24 owner's manual calls the consumer app the \"Carrier Home mobile app\" throughout; Carrier's current web pages call it Carrier SmartHome - see tb-carrier-smarthome-app for the naming history."
  ],
  "links": [
   {
    "label": "MyInfinity / my.carrier.com",
    "url": "https://my.carrier.com/"
   },
   {
    "label": "Carrier SmartHome app",
    "url": "https://www.carrier.com/us/en/residential/smart-thermostats/smarthome-app/"
   }
  ],
  "manuals": [
   {
    "title": "Infinity System Control Owner's Manual (OMSYSTXCCITC-VC-01, ed. 07/24)",
    "seedFile": "toolbox-carrier-infinity-system-control.pdf"
   }
  ],
  "source": "Carrier Owner's Manual OMSYSTXCCITC-VC-01 (07/24), section 17 Wireless - https://www.shareddocs.com/hvac/docs/1009/Public/01/OMSYSTXCCITC-VC-01.pdf (PDF read for this entry)"
 },
 {
  "id": "tb-carrier-bluetooth-app",
  "brand": "Carrier",
  "family": "Bryant / Payne - Infinity/Evolution Extreme 24/26 SEER and similar communicating outdoor units with an onboard Bluetooth module",
  "toolName": "Carrier / Bryant / Payne Service Technician App (Bluetooth to outdoor unit)",
  "equipment": "Condenser/Heat Pump",
  "title": "Pair to an outdoor unit over Bluetooth and push a firmware update",
  "whenToUse": "Newer communicating outdoor units with a built-in Bluetooth module. Lets you talk to the outdoor board (PCM/VFD) directly instead of going through the indoor wall control - live pressures, voltage, compressor RPM, temps, and firmware pushes without extra trips into the house. Download the brand-matched app: Carrier Service Technician, Bryant Service Technician, or Payne Service Technician.",
  "requirements": [
   "The brand-matched Service Technician app, signed in with HVACpartners credentials",
   "Outdoor unit with a built-in Bluetooth module (LED visible near the module)",
   "Phone within Bluetooth range of the outdoor unit"
  ],
  "steps": [
   "Open the app and sign into your account.",
   "Touch \"Connect to Outdoor Unit or Furnace\".",
   "Select \"Outdoor Unit (Bluetooth)\" - the app searches for nearby equipment.",
   "Check the Bluetooth module LED on the unit: red = searching / not yet connected, green = connected.",
   "The app lists the serial number and model of every unit it finds - at multi-unit properties it lists all of them, not just the one you are standing at.",
   "Match serial/model to the data plate on the unit you are working on, select it, and touch Pair.",
   "Once paired, use the diagnostics/status screens for live data, or the app's software update option to check for and push firmware to the unit's PCM/VFD."
  ],
  "caution": "Verify the serial number in the app against the data plate before pairing, especially at multi-unit properties. The exact in-app update menu wording is not confirmed from a published Carrier document - follow what the app itself shows. Carrier does not publish this pairing walkthrough on a public page, so treat the step wording as a field summary, not verbatim manufacturer text.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Same app as tb-carrier-service-technician-app; this entry covers the Bluetooth-to-equipment procedure specifically.",
   "Trane's equivalent app is explicitly NOT Bluetooth-capable to ComfortLink II - do not assume cross-brand parity."
  ],
  "links": [
   {
    "label": "Carrier Service Technician - App Store",
    "url": "https://apps.apple.com/us/app/carrier-service-technician/id1123086541"
   },
   {
    "label": "Carrier Service Technician - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.carrier.caservicetech"
   },
   {
    "label": "HVACpartners Carrier mobile app page",
    "url": "https://hvacpartners.com/carriermobileapp/"
   }
  ],
  "manuals": [],
  "source": "Existing Brackett toolbox entry (field-sourced, retained); Carrier Service Technician App Store listing id1123086541 and Google Play com.carrier.caservicetech for app identity and login requirements. No public Carrier document with a numbered Bluetooth pairing procedure was found."
 },
 {
  "id": "tb-carrier-service-technician-app",
  "brand": "Carrier",
  "family": "All Carrier / Bryant / Payne residential and light-commercial equipment",
  "toolName": "Carrier Service Technician (also Bryant Service Technician, Payne Service Technician)",
  "equipment": "Other",
  "title": "Field app for equipment ID, parts cross-reference, alarm codes, warranty lookup and job reports",
  "whenToUse": "Standing at a unit and needing model/serial lookup, a parts cross-reference, alarm-code help, a warranty check, or a job report you can hand off as a PDF.",
  "requirements": [
   "An HVACpartners.com dealer account - the app signs in with those credentials, there is no separate app login",
   "iOS 15.1 or later per the App Store listing; an Android build is also published"
  ],
  "steps": [
   "Install the brand-matched app from the App Store (id1123086541) or Google Play (com.carrier.caservicetech).",
   "Launch it and sign in with your HVACpartners.com username and password.",
   "Identify equipment by scanning the barcode/serial or entering it manually.",
   "Use the in-app AI assistant for alarm codes and OEM manual searches, the parts cross-reference, and the GPS parts-center locator.",
   "Create job records, pre-job checklists, and post-job reports, exportable as PDF."
  ],
  "caution": "The app is public on the app stores but is functionally useless without HVACpartners dealer credentials.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Rolled what used to be separate residential and commercial service-tech tooling into one Carrier/Bryant/Payne app, per the app-store listing.",
   "A separate Carrier Sales app uses the same HVACpartners login but is for literature and sales, not field service.",
   "For the Bluetooth-to-equipment procedure see tb-carrier-bluetooth-app."
  ],
  "links": [
   {
    "label": "Carrier Service Technician - App Store",
    "url": "https://apps.apple.com/us/app/carrier-service-technician/id1123086541"
   },
   {
    "label": "Carrier Service Technician - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.carrier.caservicetech"
   },
   {
    "label": "HVACpartners Carrier mobile app page",
    "url": "https://hvacpartners.com/carriermobileapp/"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listing id1123086541; Google Play listing com.carrier.caservicetech; hvacpartners.com/carriermobileapp/"
 },
 {
  "id": "tb-carrier-smarthome-app",
  "brand": "Carrier",
  "family": "Infinity System Control and Carrier smart thermostats (homeowner side)",
  "toolName": "Carrier SmartHome app (was Carrier Home app, was MyInfinity app)",
  "equipment": "Thermostat/Control",
  "title": "Homeowner remote-control app for Infinity System Control and Carrier smart thermostats",
  "whenToUse": "Homeowner setup/registration of a Wi-Fi Infinity System Control, or day-to-day schedule and comfort-profile management from the phone instead of the wall control.",
  "requirements": [
   "iOS, Android, or a browser at my.carrier.com",
   "A Wi-Fi-connected, MyInfinity-registered thermostat"
  ],
  "steps": [
   "Install the Carrier SmartHome app and create or sign into an account.",
   "On the thermostat, open Wi-Fi settings and join the home network (see tb-carrier-infinity-wifi-setup).",
   "In the app, add a new device and scan the QR code shown on the thermostat's MyInfinity Registration Info screen.",
   "Once linked, the thermostat appears in the app for scheduling, comfort profiles, and remote management."
  ],
  "caution": "Carrier's naming is not reconciled across its own pages. The current SmartHome page calls it \"the official replacement for the legacy Carrier Infinity app (formerly known as the MyInfinity app),\" skipping over Carrier Home entirely, while Carrier's own July-2024 Infinity owner's manual still says \"Carrier Home mobile app\" throughout. Ask the customer which app icon they actually have before troubleshooting.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Rename history, best reconstruction from Carrier's own pages: MyInfinity app -> Carrier Home app -> Carrier SmartHome app. No single official page states that sequence with dates.",
   "Predecessor MyInfinity website: www.MyInfinityTouch.Carrier.com, which now redirects to my.carrier.com. The older legacy.myinfinitytouch.carrier.com host no longer resolves.",
   "Bryant's parallel homeowner app is Bryant Housewise - see tb-bryant-housewise-app."
  ],
  "links": [
   {
    "label": "Carrier SmartHome app page",
    "url": "https://www.carrier.com/us/en/residential/smart-thermostats/smarthome-app/"
   },
   {
    "label": "New Carrier Home App (Carrier news article)",
    "url": "https://www.carrier.com/residential/en/ca/news/news-article/new-carrier-home-app-provides-enhanced-user-experience-for--remote-connectivity-to-infinity-system.html"
   }
  ],
  "manuals": [],
  "source": "carrier.com SmartHome app page; Carrier news article \"New Carrier Home App...\"; Carrier Owner's Manual OMSYSTXCCITC-VC-01 (07/24) app naming"
 },
 {
  "id": "tb-bryant-housewise-app",
  "brand": "Carrier",
  "family": "Bryant Housewise Wi-Fi thermostats (Bryant badge of the Carrier smart-thermostat platform)",
  "toolName": "Bryant Housewise Thermostat app",
  "equipment": "Thermostat/Control",
  "title": "Bryant-branded homeowner app for Housewise Wi-Fi thermostats",
  "whenToUse": "Setting up or managing a Bryant Housewise Wi-Fi thermostat rather than Carrier-badged equipment.",
  "requirements": [
   "iOS 15.6 or later per the App Store listing; Android build published as ca.bryant.comfort",
   "An account created in-app and the thermostat registered to it"
  ],
  "steps": [
   "Install the app (App Store id941680328 or Google Play ca.bryant.comfort) and create an account.",
   "Register the thermostat within the app.",
   "Use Guided Scheduling (a series of questions) to build a schedule, or set comfort profiles and activities manually.",
   "Use Touch-N-Go for one-touch activity overrides; the web portal provides monthly energy performance reports."
  ],
  "caution": "The App Store listing carries a low rating with repeated user complaints about forced re-login / authentication failures. That is user feedback, not a Bryant statement - but expect it as a field gotcha.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Bryant's equivalent of the Carrier SmartHome / Carrier Home lineage on the same Infinity-style control platform."
  ],
  "links": [
   {
    "label": "Bryant Housewise Thermostat - App Store",
    "url": "https://apps.apple.com/us/app/bryant-housewise-thermostat/id941680328"
   },
   {
    "label": "Bryant Housewise Thermostat - Google Play",
    "url": "https://play.google.com/store/apps/details?id=ca.bryant.comfort"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listing id941680328; Google Play listing ca.bryant.comfort"
 },
 {
  "id": "tb-carrier-cor-app",
  "brand": "Carrier",
  "family": "Carrier Cor Wi-Fi thermostat (conventional RCWYG-terminal smart thermostat, roughly 2013 era - NOT an Infinity communicating control)",
  "toolName": "Carrier Cor Thermostat app / Cor Smart Home app",
  "equipment": "Thermostat/Control",
  "title": "Legacy app for the Carrier Cor Wi-Fi thermostat",
  "whenToUse": "You find an older Carrier Cor thermostat still on the wall. Know what it is, know it is not an Infinity control, and know Carrier's current conventional smart thermostat is ecobee-for-Carrier, not Cor.",
  "requirements": [
   "Original listing: Carrier Cor Thermostat (App Store id941486794); a separate listing exists as Cor Smart Home (App Store id1249434970)"
  ],
  "steps": [],
  "caution": "No official Carrier setup guide or sunset date for the Cor app was found. Treat app functionality on old Cor installs as unreliable and quote replacement rather than chasing it.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: ecobee Smart Thermostats powered by Carrier (Carrier-badged ecobee hardware and the ecobee app) as Carrier's conventional smart-thermostat line.",
   "Two app-store listings exist under the Cor name; Carrier does not explain the split.",
   "No public procedure exists - the entry documents identification, not a workflow."
  ],
  "links": [
   {
    "label": "Carrier Cor Thermostat - App Store",
    "url": "https://apps.apple.com/us/app/carrier-c%C3%B4r-thermostat/id941486794"
   },
   {
    "label": "Cor Smart Home - App Store",
    "url": "https://apps.apple.com/us/app/c%C3%B4r-smart-home/id1249434970"
   },
   {
    "label": "ecobee Smart Thermostats powered by Carrier",
    "url": "https://www.carrier.com/residential/en/us/products/thermostats/smart-thermostats/ecobee-smart-thermostats-powered-by-carrier/"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listings id941486794 and id1249434970 (existence/titles); carrier.com ecobee-for-Carrier product page"
 },
 {
  "id": "tb-carrier-hvacpartners-portal",
  "brand": "Carrier",
  "family": "All Carrier / Bryant / Payne dealer resources",
  "toolName": "HVACpartners.com dealer portal",
  "equipment": "Other",
  "title": "The dealer login that issues credentials for the Service Technician and Sales apps",
  "whenToUse": "A tech cannot sign into the Service Technician app - the credential source is HVACpartners, not a separate app account. Also the host for dealer-only Infinity service literature.",
  "requirements": [
   "Active HVACpartners.com dealer account"
  ],
  "steps": [],
  "caution": "Dealer-login-only. The portal's technical bulletins are not reproduced here.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "The procedure for anything inside HVACpartners is behind the dealer login; Brackett's techs already have accounts through the dealer relationship."
  ],
  "links": [
   {
    "label": "HVACpartners",
    "url": "https://hvacpartners.com/"
   }
  ],
  "manuals": [],
  "source": "hvacpartners.com public landing page"
 },
 {
  "id": "tb-trane-technician-app",
  "brand": "Trane",
  "family": "Trane / American Standard Link-communicating systems (ComfortLink II thermostats, Link Zoning, Link Relay Panels)",
  "toolName": "Trane Technician (formerly Trane Diagnostics)",
  "equipment": "Other",
  "title": "Installer/service app for Link-system guided install, warranty lookup, and Dealer Remote Configuration",
  "whenToUse": "Installing or servicing a Trane/American Standard Link-communicating system - guided wiring and dipswitch settings, warranty lookup by barcode, or remote configuration of an enrolled customer's thermostat.",
  "requirements": [
   "iOS 15.1 or later (visionOS 1.0+ also listed); Android build published as com.tranetechnologies.tranediagnostics",
   "Trane/American Standard dealer credentials for Dealer Remote Configuration"
  ],
  "steps": [
   "Install the app (App Store id1521293298 or Google Play com.tranetechnologies.tranediagnostics).",
   "Use Guided Installation for step-by-step wiring diagrams and dipswitch settings on Link Systems, Link Zoning, and Link Relay Panels.",
   "Use Dealer Remote Configuration (DRC) to remotely access and monitor an enrolled customer's Link or smart thermostat.",
   "Scan a barcode for warranty lookup; use the Tech Assistant chatbot for troubleshooting; Fieldpiece tool integration feeds PDF reporting."
  ],
  "caution": "Trane's own App Store text states the app is NOT compatible for onsite Bluetooth (BLE) connections with Trane ComfortLink II systems. Do not go to a job expecting Carrier-style Bluetooth-to-equipment pairing.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Rename history: Trane Diagnostics -> Trane Technician. Same underlying app; the Google Play package id (com.tranetechnologies.tranediagnostics) never changed.",
   "American Standard badge of the same app: tb-american-standard-technician-app.",
   "The dipswitch/commissioning detail for Link Zoning lives inside this app's dealer-gated Guided Installation flow, not on a public page."
  ],
  "links": [
   {
    "label": "Trane Technician - App Store",
    "url": "https://apps.apple.com/us/app/trane-technician/id1521293298"
   },
   {
    "label": "Trane Technician - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.tranetechnologies.tranediagnostics"
   },
   {
    "label": "Behind the Scenes of Trane HVAC Diagnostics (Trane)",
    "url": "https://www.trane.com/residential/en/resources/blog/behind-the-scenes-of-trane-hvac-diagnostics-the-technician-app/"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listing id1521293298 (full description); Google Play listing com.tranetechnologies.tranediagnostics; trane.com Technician app blog page"
 },
 {
  "id": "tb-american-standard-technician-app",
  "brand": "Trane",
  "family": "American Standard Link-communicating systems (Gold 824, Platinum 850/1050 and related)",
  "toolName": "American Standard Technician",
  "equipment": "Other",
  "title": "American Standard badge of the Trane Technician app",
  "whenToUse": "Same field use as Trane Technician, on American Standard-branded equipment.",
  "requirements": [
   "Same as Trane Technician - dealer credentials for Dealer Remote Configuration features"
  ],
  "steps": [],
  "caution": "Not independently verified beyond confirming the Google Play listing exists under the American Standard brand - work from the Trane Technician entry and expect the same flow.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Package name com.tranetechnologies.asdiagnostics mirrors Trane's com.tranetechnologies.tranediagnostics - same Trane Technologies platform, different badge.",
   "See tb-trane-technician-app for the documented workflow."
  ],
  "links": [
   {
    "label": "American Standard Technician - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.tranetechnologies.asdiagnostics"
   }
  ],
  "manuals": [],
  "source": "Google Play listing com.tranetechnologies.asdiagnostics (title/existence only)"
 },
 {
  "id": "tb-trane-home-app",
  "brand": "Trane",
  "family": "ComfortLink II XL1050 / XL850 / XL824 / XL724 smart thermostats and legacy Nexia-era devices",
  "toolName": "Trane Home app (formerly Nexia)",
  "equipment": "Thermostat/Control",
  "title": "Homeowner app, and the switch that turns on Trane Diagnostics dealer remote monitoring",
  "whenToUse": "New Trane smart-thermostat setup, homeowner schedule/zone management, or turning on dealer diagnostic access so Brackett can see the system before rolling a truck.",
  "requirements": [
   "Active broadband and adequate home Wi-Fi signal at the thermostat",
   "One of: ComfortLink II XL1050, XL850, XL824, XL724",
   "A Trane Home account (tranehome.com)"
  ],
  "steps": [
   "Download the Trane Home app and create an account at tranehome.com.",
   "To enroll dealer diagnostics: sign in, select the property if the customer has more than one, then open the menu > App Settings > Home Settings.",
   "Toggle on \"Enable my HVAC dealer to see diagnostic information about my HVAC system, as well as my name and home address,\" then select Save.",
   "The enrolled dealer can then see temperature/humidity stats, thermostat temperature history, scheduling programs, and system alerts.",
   "Remote troubleshooting access beyond viewing still requires separate per-incident homeowner approval."
  ],
  "caution": "Nexia to Trane Home was a pure rebrand per Trane's own FAQ - portal URL moved from mynexia.com to tranehome.com, app name and branding changed, nothing was removed and no reconnection was required. If a customer insists their Nexia account is \"gone,\" it is almost certainly a login problem, not a migration.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Rename history: Nexia / mynexia.com -> Trane Home / tranehome.com.",
   "Legacy Nexia-era hardware still supported under this app: tb-trane-nexia-legacy.",
   "American Standard equivalent: tb-american-standard-home-app (asairhome.com)."
  ],
  "links": [
   {
    "label": "Trane Home App - owner resources",
    "url": "https://www.trane.com/residential/en/resources/smart-home-app/"
   },
   {
    "label": "Trane Home Diagnostics enrollment",
    "url": "https://www.trane.com/residential/en/resources/smart-home-app/diagnostics/"
   },
   {
    "label": "Trane Home FAQ",
    "url": "https://support.tranehome.com/hc/en-us/articles/360046434131-Trane-Home-FAQ"
   },
   {
    "label": "Trane Home - App Store",
    "url": "https://apps.apple.com/us/app/trane-home/id431904233"
   }
  ],
  "manuals": [],
  "source": "trane.com/residential/en/resources/smart-home-app/diagnostics/ (full enrollment steps); support.tranehome.com Trane Home FAQ"
 },
 {
  "id": "tb-american-standard-home-app",
  "brand": "Trane",
  "family": "American Standard Gold 824 / Platinum 850 / Platinum 1050 wireless smart thermostats",
  "toolName": "American Standard Home app",
  "equipment": "Thermostat/Control",
  "title": "Enroll an American Standard 824 / 850 / 1050 thermostat into the American Standard Home app",
  "whenToUse": "New install or re-enrollment of an American Standard smart thermostat.",
  "requirements": [
   "An American Standard Home account (asairhome.com)",
   "The home Wi-Fi SSID and password"
  ],
  "steps": [
   "On the thermostat: press Menu > Settings > Network > Connect to WiFi Network, choose the network, enter the password, then press Home.",
   "On the thermostat: press Menu > Smart Home > Next and accept the License Agreement - the thermostat then asks for a 5-digit registration code.",
   "In the American Standard Home app: log in, select the home if there is more than one, tap the menu (upper left), scroll to the bottom, and select Connect New Device.",
   "Select the thermostat model (824, 850, or 1050) and tap Continue - a 5-digit activation code appears with a 10-minute window. Keep this screen open.",
   "On the thermostat, enter the 5-digit code and press Next, then follow the remaining prompts. The app confirms success and auto-names the device, which can be renamed afterward."
  ],
  "caution": "The activation code expires in 10 minutes - have the app screen up before you start the thermostat-side registration, not after. Logging into the old Nexia portal reroutes automatically to asairhome.com.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Trane-brand equivalent: tb-trane-home-app. Same Trane Technologies platform, different brand portal.",
   "Official support contact per the FAQ: help@asairhome.com, 1-877-374-0697."
  ],
  "links": [
   {
    "label": "American Standard Home app page",
    "url": "https://www.americanstandardair.com/resources/home-app/"
   },
   {
    "label": "American Standard Home FAQ",
    "url": "https://support.asairhome.com/hc/en-us/articles/360044572051-American-Standard-Home-FAQ"
   },
   {
    "label": "American Standard Home - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.tranetechnologies.asair"
   }
  ],
  "manuals": [],
  "source": "support.asairhome.com \"How To Enroll American Standard Gold 824 and Platinum 850/1050 Wireless Smart Thermostats\" (full steps read)"
 },
 {
  "id": "tb-trane-nexia-legacy",
  "brand": "Trane",
  "family": "Legacy Nexia-era bridges, controllers, and Z-Wave thermostats",
  "toolName": "Nexia legacy devices under Trane Home",
  "equipment": "Other",
  "title": "Older Nexia bridges and Z-Wave thermostats that Trane Home still supports",
  "whenToUse": "You find a Nexia Bridge or a pre-ComfortLink-II Z-Wave thermostat in service and need to know whether Trane Home still talks to it before quoting a replacement.",
  "requirements": [
   "A Trane Home account",
   "The device must be one of the models Trane still lists as supported (see notes)"
  ],
  "steps": [],
  "caution": "Trane's own support article states the functionality of discontinued products is not guaranteed and some features may not work as described in the user guides. No discontinuation dates are published.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Replaced by: current ComfortLink II XL824/850/1050 thermostats on the Trane Home app (tb-trane-home-app).",
   "Legacy bridges/controllers still listed as supported: Nexia Bridge BR100 (superseded by BR200), Andersen Verilock Translator (needs a Nexia Bridge or an XL824/850/1050), Pella Insynctive Bridge (dealer-only, same requirement).",
   "Legacy thermostats still listed as supported: Trane 400B Z-Wave, Trane/American Standard 500B Z-Wave, Trane XR524 Z-Wave, Trane XL624 / American Standard Silver 624 Z-Wave, Trane XL950 / American Standard Platinum 950 (Wi-Fi, no bridge), Radio Thermostat CT100, Radio Thermostat CT30.",
   "Most of these need a Nexia Bridge (BR100/BR200) or an XL824/850/1050 to reach Trane Home at all."
  ],
  "links": [
   {
    "label": "Supported Legacy Bridges and Controllers - Trane Home",
    "url": "https://support.tranehome.com/hc/en-us/articles/21217848772237-Supported-Legacy-Bridges-and-Controllers"
   },
   {
    "label": "Supported Legacy Thermostats - Trane Home",
    "url": "https://support.tranehome.com/hc/en-us/articles/21195063649165-Supported-Legacy-Thermostats"
   }
  ],
  "manuals": [],
  "source": "support.tranehome.com \"Supported Legacy Bridges and Controllers\" and \"Supported Legacy Thermostats\" (both read in full)"
 },
 {
  "id": "tb-trane-link-zoning",
  "brand": "Trane",
  "family": "Trane Link Zoning (ComfortLink II-based ducted zoning, up to 6 zones)",
  "toolName": "Trane Link Zoning (via Trane Technician + Trane Home)",
  "equipment": "Zoning",
  "title": "Ducted zoning run through a Trane Link Smart Thermostat and the Trane Home app",
  "whenToUse": "Homeowner or tech needs to view or change zone temperature/humidity targets on an installed Link Zoning system; installer needs guided wiring and dipswitch setup at install time.",
  "requirements": [
   "A Trane Link Smart Thermostat (ComfortLink II) as the zoning control point",
   "Trane Home app for remote zone management",
   "Trane Technician app for the installer's guided wiring/dipswitch flow"
  ],
  "steps": [
   "Installer places motorized modulating dampers per zone plus wired or wireless zone sensors, using the Trane Technician app's Guided Installation for wiring diagrams and dipswitch settings.",
   "Homeowner sets and monitors temperature/humidity per zone (up to 6 zones) at the Trane Link Smart Thermostat or remotely in the Trane Home app."
  ],
  "caution": "Trane's public product page does not publish the specific dipswitch/wiring values - that detail lives inside the Trane Technician app's dealer-gated Guided Installation flow. Do not go to the job expecting a public wiring table.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Commissioning specifics for TVZ/Link Zoning stayed behind the dealer-gated app flow and are not reproduced here."
  ],
  "links": [
   {
    "label": "Trane Link Zoning",
    "url": "https://www.trane.com/residential/en/products/thermostats-and-controls/zoning/trane-link-zoning/"
   }
  ],
  "manuals": [],
  "source": "trane.com Trane Link Zoning product page"
 },
 {
  "id": "tb-lennox-lennoxpros-app",
  "brand": "Lennox",
  "family": "All Lennox residential / light commercial equipment (parts, warranty, literature)",
  "toolName": "LennoxPros App",
  "equipment": "Other",
  "title": "Dealer job-site reference, warranty/parts lookup, and ordering",
  "whenToUse": "At the unit: scan the data plate for warranty coverage and matching repair parts, look up an error code, pull an install manual, or order parts without walking back to the truck laptop.",
  "requirements": [
   "A LennoxPros.com dealer account - desktop and mobile share one login, there is no separate mobile account",
   "Registration as an HVAC professional"
  ],
  "steps": [
   "Install the LennoxPros app from the App Store or Google Play, or browse m.lennoxpros.com in a mobile browser.",
   "Sign in with existing LennoxPros.com credentials.",
   "Scan the barcode on an equipment data plate to pull warranty coverage and matching repair parts.",
   "Use Error Code Lookup for troubleshooting steps on a displayed fault code.",
   "Use Quick Order (catalog numbers) or Product Search to build a cart and check out.",
   "Optionally text JOIN to LENNOX (536669) to opt into shipment/service SMS alerts."
  ],
  "caution": "The full Technical Service Catalog - unit controller software, ACCA calculator, CAD/Revit templates - is desktop-only. LennoxPros itself says \"This tool isn't currently available for mobile.\"",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Different tool from the iComfort Dealer Setup and Lennox Smart Tech apps, which are equipment-commissioning tools rather than the parts/ordering app."
  ],
  "links": [
   {
    "label": "Download the LennoxPros App",
    "url": "https://m.lennoxpros.com/mobile-app"
   },
   {
    "label": "Mobile FAQs",
    "url": "https://m.lennoxpros.com/partner-resources/support/mobile-faqs"
   },
   {
    "label": "Technical Service catalog",
    "url": "https://m.lennoxpros.com/partner-resources/app/technical-service"
   }
  ],
  "manuals": [],
  "source": "m.lennoxpros.com/mobile-app; m.lennoxpros.com/partner-resources/support/mobile-faqs; m.lennoxpros.com/partner-resources/app/technical-service"
 },
 {
  "id": "tb-lennox-service-dashboard",
  "brand": "Lennox",
  "family": "iComfort-enabled communicating systems (S30/E30/M30 and S40/E40/M40/L40)",
  "toolName": "Lennox Service Dashboard (formerly iComfort Dashboard)",
  "equipment": "Thermostat/Control",
  "title": "Remote fleet monitoring portal for registered customer systems",
  "whenToUse": "At the shop, to see which registered customers have active alerts, are due for maintenance/filter changes, or to review a customer's system history and performance charts before a callback.",
  "requirements": [
   "A LennoxPros dealer account",
   "The customer's iComfort thermostat must be Wi-Fi connected and registered to the dealer - registration only happens if the dealership's main phone number or company name was entered during thermostat commissioning"
  ],
  "steps": [
   "Log into LennoxPros.com with a dealer account.",
   "Open Service Dashboard.",
   "Filter customers by maintenance reminder, alert type, or zip code. Customers can be searched by first/last name, zip, city, email, equipment type, error code, serial number, or model number.",
   "Open a customer record for system overview, alert history, equipment purchased, and contact info, plus indoor/outdoor temperature and performance charts.",
   "Configure email notifications for system error alerts."
  ],
  "caution": "If a customer's thermostat never shows up, the dealer identity was probably not entered at commissioning - the thermostat is only visible in the dashboard once the dealership phone number or company name was added on the thermostat.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Rename history: iComfort Dashboard -> Lennox Service Dashboard. Service Dashboard launched 5/15/2020; the old iComfort Dashboard was removed from LennoxPros 11/30/2020.",
   "Equipment Profiles created here sync down into the Lennox Smart Tech app for S40-series commissioning.",
   "The map view color-codes customer pins: red critical alert, yellow moderate, green normal, black no system information sharing."
  ],
  "links": [
   {
    "label": "Service Dashboard announcement (LennoxPros)",
    "url": "https://www.lennoxpros.com/news/service-dashboard-2005"
   }
  ],
  "manuals": [
   {
    "title": "Lennox iComfort S30 Installation and Setup Guide",
    "seedFile": "toolbox-lennox-icomfort-s30-install.pdf"
   }
  ],
  "source": "lennoxpros.com/news/service-dashboard-2005; Lennox iComfort S30 Installation Manual and Setup Guide, section \"LennoxPros Dealer Dashboard\" (PDF downloaded and read for this entry)"
 },
 {
  "id": "tb-lennox-smart-tech-app",
  "brand": "Lennox",
  "family": "S40 / L40 / M40 / E40 Smart Thermostat communicating systems",
  "toolName": "Lennox Smart Technician App (Lennox Smart Tech)",
  "equipment": "Thermostat/Control",
  "title": "Commission an S40-series system from the phone instead of the thermostat screen",
  "whenToUse": "Installing an S40/L40/M40/E40 system, or adding Lennox Smart Sensors, the Smart Air Quality Monitor, or Wireless Extenders - those accessories can only be added initially through this app, not from the thermostat.",
  "requirements": [
   "iOS 16.0 or later, or Android (com.lennox.s40.installer)",
   "Bluetooth enabled on the mobile device - the app connects to the thermostat over Bluetooth",
   "A dealer ID number, or the phone number on the dealer account, to unlock advanced diagnostics and remote sharing",
   "LennoxPros dealer account if you want to pull an Equipment Profile built on Service Dashboard"
  ],
  "steps": [
   "The thermostat shows a welcome screen at first power-up (an error shows if it is not connected properly). Select the language.",
   "Select \"Continue setup process through the Technician App\".",
   "The next screen shows QR codes for iOS and Android - download the app now if you have not already.",
   "Start the Technician app. On its welcome screen, select the language.",
   "Select \"Configure new system\".",
   "Choose Connect with Thermostat, making sure the phone's Bluetooth is enabled.",
   "Go back to the thermostat and select Start - the thermostat displays an ID number.",
   "Return to the app and find that same ID in the list; select it.",
   "The app shows it is connecting, then confirms a successful connection.",
   "IMPORTANT: enter the dealer ID number - or, if you do not have it, the phone number associated with the dealer account. This is what enables advanced diagnostics and remote sharing if the homeowner permits it.",
   "Set time, date, language, and temperature unit.",
   "The app auto-detects communicating equipment and the equipment interface module (EIM). Non-communicating equipment is added on the next screen; Smart Zoning and airflow-per-zone screens appear here if zoning is installed.",
   "Specify reminder types and frequency (for example, change filter every 3 months).",
   "Continue with the on-screen prompts to finish setting up the system.",
   "To add Lennox Smart Sensors, the Smart Air Quality Monitor, or Wireless Extenders later, go to Menu > Settings > Advanced Settings > View Support Service Control Center > Equipment Settings > Add Sensors."
  ],
  "caution": "Skipping the dealer ID / dealer phone number step at commissioning is what kills advanced diagnostics and remote sharing later, and keeps the system off Service Dashboard. App Store reviews (user reports, not a Lennox statement) describe Bluetooth/Wi-Fi connect failures on brand-new S40 installs; carry a second phone if you can.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Separate from the homeowner-facing Lennox Home App - this is the dealer commissioning tool.",
   "Does not replace the S30-era iComfort Dealer Setup app for older equipment (tb-lennox-icomfort-dealer-setup).",
   "The alternative to this app is commissioning on the thermostat screen itself: select \"continue setup process through the thermostat\" and work through Welcome, General Information, Equipment Found, Dealer Info, Reminders."
  ],
  "links": [
   {
    "label": "Lennox Smart Tech - App Store",
    "url": "https://apps.apple.com/us/app/lennox-smart-tech/id6443907644"
   },
   {
    "label": "Lennox Smart Tech - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.lennox.s40.installer"
   }
  ],
  "manuals": [
   {
    "title": "Lennox S40 Smart Thermostat Installer Quick Start Guide (508295-01)",
    "seedFile": "toolbox-lennox-s40-installer-quickstart.pdf"
   }
  ],
  "source": "Lennox S40 Smart Thermostat Installer Quick Start Guide, 508295-01, October 2022, Step 4 \"Commissioning using the Lennox Smart Technician App\" - https://images.lennoxpros.com/is/content/LennoxIntl/web-dev/other/BigBend/S40-Smart-Thermostat-Installer-Quick-Start-Guide-English-Spanish.pdf (PDF downloaded and text extracted for this entry; the previous gather could not read it)"
 },
 {
  "id": "tb-lennox-s40-wifi-handoff",
  "brand": "Lennox",
  "family": "S40 / L40 / M40 / E40 Smart Thermostat",
  "toolName": "S40 Smart Thermostat - Wi-Fi connection (homeowner handoff)",
  "equipment": "Thermostat/Control",
  "title": "Put an S40-series thermostat on the customer's Wi-Fi at the end of the job",
  "whenToUse": "Step 5 of an S40 install - getting the thermostat online so the homeowner gets the app and the dealer gets diagnostics.",
  "requirements": [
   "Home Wi-Fi SSID and password (up to 63 characters; no blank spaces and no % symbol)"
  ],
  "steps": [
   "From the thermostat home screen, go to Menu > Settings > Wi-Fi.",
   "Slide the option to ON to enable Wi-Fi.",
   "Press \"Not Connected\" to display the list of available access points.",
   "Locate the home network and select the network name.",
   "Enter the home Wi-Fi password and press join. Check \"show password\" if you want to see what you are typing.",
   "Confirm the Thermostat Connectivity Status indicator shows checkmarks across all connections - a check mark appears above both the router and Internet icons when it worked."
  ],
  "caution": "The thermostat supports passwords up to 63 characters but they cannot contain blank spaces or a % symbol. For hidden networks, Lennox refers you to the S40 Homeowner Guide.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Lennox asks the installer to explain Advanced Diagnostics and Remote Sharing to the homeowner at this point and get them to accept the permissions - it is free, and it is what lets Brackett see problems remotely.",
   "Installer is also directed to leave the homeowner quick start guide behind."
  ],
  "links": [
   {
    "label": "Lennox dealer access (printed on the S40 quick start; now redirects to lennox.com support)",
    "url": "https://www.lennoxsmartertogether.com/dealer-access"
   }
  ],
  "manuals": [
   {
    "title": "Lennox S40 Smart Thermostat Installer Quick Start Guide (508295-01)",
    "seedFile": "toolbox-lennox-s40-installer-quickstart.pdf"
   }
  ],
  "source": "Lennox S40 Smart Thermostat Installer Quick Start Guide, 508295-01, October 2022, Step 5 \"Helping Homeowner Connect to Wi-Fi\" (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-lennox-icomfort-dealer-setup",
  "brand": "Lennox",
  "family": "iComfort S30 / E30 communicating systems (Smart Hub + HD Display)",
  "toolName": "iComfort Mobile Setup application (app store name: iComfort Dealer Setup)",
  "equipment": "Thermostat/Control",
  "title": "Commission or service an S30/E30 system over a direct Wi-Fi link to the Smart Hub",
  "whenToUse": "Commissioning or servicing an S30/E30 system without walking between the equipment and the thermostat. Also the way to work the system with the HD Display pulled off the subbase during commissioning.",
  "requirements": [
   "A Wi-Fi-capable mobile device, physically in the home near the Smart Hub",
   "iOS 6.0 or later, or Android 4.1 or later",
   "A router with Bonjour (Zeroconf) capability - check the router if the Smart Hub will not connect",
   "The app cannot reach the Smart Hub through the internet or the home Wi-Fi - it uses a temporary direct network from the hub"
  ],
  "steps": [
   "Download and install the iComfort Mobile Setup application.",
   "Apply power to the system. The first screen after boot-up is the Apple HomeKit commissioning screen - cancel it for now.",
   "Lennox recommends removing the HD Display from the subbase before starting when you intend to commission from the app; reattach it when you are done.",
   "At the Smart Hub, press the commissioning button on the side of the unit.",
   "The commissioning status LED blinks green for two minutes while the Smart Hub broadcasts its Wi-Fi SSID (for example DIRECT-XY12-3456).",
   "In the phone's Wi-Fi settings, find that SSID and connect using the last eight digits of the SSID as the password (XY123456 in that example).",
   "Once the phone is connected the commissioning status LED turns solid green.",
   "Start the iComfort Mobile Setup app and confirm you are on the right Smart Hub by checking the serial number.",
   "Touch the remote-in tab on the app's home screen to reach the commissioning screen. If the system has not been commissioned it goes to commissioning automatically; if it has, it goes to the dealer control center.",
   "Work through commissioning exactly as you would on the HD Display.",
   "When finished, exit the app, then manually disconnect the phone from the Smart Hub network in the phone's Wi-Fi settings.",
   "Once disconnected the Smart Hub commissioning LED changes to solid blue. Reinstall the HD Display on the subbase.",
   "Alternative entry path from the thermostat: home screen > menu > settings > advanced settings > \"pair smart hub to iComfort dealer mobile app\" - it auto-connects and drops you at the dealer control center."
  ],
  "caution": "If the app-to-hub connection sits idle for 3 minutes the Smart Hub auto-disconnects and you have to repeat the whole pairing. In service mode there is a fixed 30-minute session timer that cannot be adjusted. Removing the HD Display from the subbase shuts the display down - it will not communicate with the system while it is off.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: Lennox Smart Technician App for S40/L40/M40/E40-series systems (tb-lennox-smart-tech-app). This remains the commissioning tool for the large installed base of S30/E30 hardware.",
   "Not the same thing as the homeowner-facing iComfort S30/E30/M30 app (tb-lennox-icomfort-s30-app), which is being retired.",
   "App Store listing name is \"iComfort Dealer Setup\"; the Lennox installation manual calls it the \"iComfort Mobile Setup application.\""
  ],
  "links": [
   {
    "label": "iComfort Dealer Setup - App Store",
    "url": "https://apps.apple.com/us/app/icomfort-dealer-setup/id1027083656"
   }
  ],
  "manuals": [
   {
    "title": "Lennox iComfort S30 Installation and Setup Guide",
    "seedFile": "toolbox-lennox-icomfort-s30-install.pdf"
   }
  ],
  "source": "Lennox iComfort S30 Installation Manual and Setup Guide, sections \"Commissioning and Service (Using the Mobile Setup Application)\", \"Establishing a Direct Wireless Connection to the Smart Hub\", and \"Service\" - https://www.lennox.com/literature/Lennox_iComfortS30_Installation_Manual_Setup_Guide.pdf (PDF downloaded and text extracted for this entry; the previous gather could not read it)"
 },
 {
  "id": "tb-lennox-home-app",
  "brand": "Lennox",
  "family": "iComfort communicating systems, 3rd gen (S30/E30/M30) and 4th gen (S40/E40/M40/L40)",
  "toolName": "Lennox Home App",
  "equipment": "Thermostat/Control",
  "title": "Add a thermostat to the homeowner's account by PIN",
  "whenToUse": "Registering a thermostat to the homeowner after install, or any time the customer needs remote control on S30/E30/M30 or S40/E40/M40/L40.",
  "requirements": [
   "Thermostat connected to home Wi-Fi",
   "A PIN generated on the thermostat itself"
  ],
  "steps": [
   "On the thermostat: menu > settings > account, and follow the prompts to create an account the first time, or use \"Generate Pin\" to produce a pairing PIN.",
   "On S30/E30/M30 systems only - at the Smart Hub, press the center Lennox button once. The ring LED blinks green for 2 minutes while it broadcasts its Wi-Fi SSID (for example \"Direct E300-5200\").",
   "On the phone's Wi-Fi settings, connect to that Smart Hub SSID using the last 8 digits of the SSID as the password (E3005200 in that example). The Smart Hub ring LED turns solid green once connected.",
   "Open the Lennox Home App, tap the \"+\" thermostat icon to reach Add iComfort, enter the PIN generated on the thermostat, and tap Add.",
   "Select an existing home or create a new home for the thermostat."
  ],
  "caution": "Existing iComfort S30/E30/M30 app users should sign in with their old credentials - settings migrate automatically. A web portal at lennoxicomfort.com covers customers without a smartphone, as long as the thermostat stays on Wi-Fi.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Replaces the legacy iComfort S30/E30/M30 app (tb-lennox-icomfort-s30-app): migration pop-ups began 4/7/2025, mandatory transition prompts 6/1/2025, old app store listings started coming down August 2025, and old-app support ended Fall 2025 per Lennox's own announcement."
  ],
  "links": [
   {
    "label": "New Lennox Home App announcement",
    "url": "https://www.lennox.com/residential/support/news-updates/new-lennox-home-app"
   },
   {
    "label": "iComfort Support Center FAQ",
    "url": "https://www.support.lennoxicomfort.com/help/faq/faq.html"
   }
  ],
  "manuals": [],
  "source": "lennox.com/residential/support/news-updates/new-lennox-home-app; support.lennoxicomfort.com/help/faq/faq.html"
 },
 {
  "id": "tb-lennox-icomfort-s30-app",
  "brand": "Lennox",
  "family": "iComfort S30 / E30 / M30 (3rd generation communicating thermostats)",
  "toolName": "iComfort S30/E30/M30 App",
  "equipment": "Thermostat/Control",
  "title": "Retired homeowner app for S30/E30/M30 thermostats",
  "whenToUse": "Only when a customer has not migrated yet. Point them at the Lennox Home App instead - the old app is out of support.",
  "requirements": [
   "An existing iComfort S30/E30/M30 account"
  ],
  "steps": [],
  "caution": "Per Lennox: mandatory transition pop-ups began 6/1/2025, app store removal began August 2025, and support for this app ended Fall 2025. Existing accounts migrate automatically by signing into the Lennox Home App with the same credentials.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: Lennox Home App (tb-lennox-home-app), Fall 2025.",
   "Do not confuse with iComfort Dealer Setup, the S30 installer/commissioning app, which was not announced as sunset.",
   "App Store listing title is \"(S30/E30/M30) iComfort T-Stat\" (Lennox Industries, id1027192836); the listing itself now carries the migrate-to-Lennox-Home notice.",
   "Not the same product as the \"iComfort Home Companion App\" (App Store id1339825693) - that is a separate Apple HomeKit pairing/control utility for HomeKit-certified iComfort S30 Ultra / E30 thermostats, needs a HomeKit hub, and is still listed on its own."
  ],
  "links": [
   {
    "label": "New Lennox Home App announcement (sunset details)",
    "url": "https://www.lennox.com/residential/support/news-updates/new-lennox-home-app"
   },
   {
    "label": "(S30/E30/M30) iComfort T-Stat - App Store",
    "url": "https://apps.apple.com/us/app/s30-e30-m30-icomfort-t-stat/id1027192836"
   }
  ],
  "manuals": [],
  "source": "lennox.com/residential/support/news-updates/new-lennox-home-app; Apple App Store listings id1027192836 ((S30/E30/M30) iComfort T-Stat) and id1339825693 (iComfort Home Companion App), read for naming only"
 },
 {
  "id": "tb-lennox-icomfort-wifi-app",
  "brand": "Lennox",
  "family": "iComfort Wi-Fi 7-day programmable communicating thermostat (pre-S30, discontinued hardware)",
  "toolName": "Lennox iComfort Wi-Fi app + consumer portal registration",
  "equipment": "Thermostat/Control",
  "title": "Register a legacy iComfort Wi-Fi thermostat for online access",
  "whenToUse": "A home still has the older iComfort Wi-Fi thermostat and the customer wants remote access restored, or you need to re-register it after a change of email/ownership.",
  "requirements": [
   "The iComfort Wi-Fi thermostat already connected to the home network",
   "The homeowner's email address",
   "A computer - account creation finishes on the consumer portal, not on the thermostat"
  ],
  "steps": [
   "From the WI-FI SETTINGS screen on the thermostat, press either the \"thermostat not registered\" icon or the connection status icon, and select the server icon.",
   "Enter the homeowner's email address and a system description, then press the register button.",
   "A pop-up asks whether the email address is correct - verify it and press yes.",
   "A second pop-up tells the user to check their email. Delivery normally takes 5 to 15 minutes.",
   "On the homeowner's computer, open the email from the Lennox server and click the Register link.",
   "Fill in User Name and Password, check the terms and conditions box, and click Create User. Prompts then walk through profile and preference setup.",
   "Back at the thermostat, press the connection status icon to confirm registration took."
  ],
  "caution": "If the email was entered wrong, go back to the thermostat registered screen, re-enter it, and press register again - there is no fix from the portal side. Leave the thermostat's Firmware Update setting on Auto (the default); switching it from Off to Auto triggers an immediate check that can take up to an hour, and switching back to Off mid-download does not stop a download already in progress.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Replaced by: iComfort S30/E30/M30, and then S40/E40/M40/L40 with the Lennox Home App. Lennox's official reason for the S30/iComfort Wi-Fi replacement: \"As technology and homeowner expectations evolved, the S40 was developed to deliver a more modern, responsive, and integrated experience.\"",
   "No specific discontinuation date is published for the iComfort Wi-Fi thermostat. The app listing carries no migration notice to Lennox Home App.",
   "Firmware update behavior on this thermostat: Auto is the default and checks a few minutes after commissioning, then every 24 hours in the early morning; a completed download stops activity about 3 seconds, restarts for 5 seconds, and keeps all prior settings."
  ],
  "links": [
   {
    "label": "Lennox iComfort Wi-Fi - App Store",
    "url": "https://apps.apple.com/us/app/lennox-icomfort-wi-fi/id527608198"
   },
   {
    "label": "S30 and iComfort Wi-Fi replacement FAQ",
    "url": "https://www.lennox.com/residential/support/faqs/s30-icomfort-wifi-replacement"
   }
  ],
  "manuals": [
   {
    "title": "Lennox iComfort Wi-Fi Thermostat Installation Manual (507341-02)",
    "seedFile": "toolbox-lennox-icomfort-wifi-install.pdf"
   }
  ],
  "source": "Lennox iComfort Wi-Fi 7-Day Programmable Communicating Thermostat Installation Manual, 507341-02, sections \"Registering the iComfort Wi-Fi Thermostat\", \"User Account Registration for Lennox Server Access\", and \"Firmware Update\" - https://www.lennox.com/dA/c25982c30e/iComfort-WiFi-Installation-Manual.pdf (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-rheem-contractor-app",
  "brand": "Rheem",
  "family": "Ruud - Bluetooth / PlusOne-enabled Rheem and Ruud residential HVAC and water heating, including the Endeavor Line",
  "toolName": "Rheem Contractor App (app store name: Rheem)",
  "equipment": "Other",
  "title": "Contractor app for Bluetooth equipment setup, diagnostics, warranty, and product docs",
  "whenToUse": "Installing or servicing Bluetooth/PlusOne-enabled Rheem equipment. Rheem states Bluetooth-enabled equipment, including all of the Endeavor Line, needs to be set up via the Contractor App - this is not optional on that equipment.",
  "requirements": [
   "iOS 16.0 or later per the App Store listing, or Android",
   "Bluetooth-enabled Rheem equipment for the setup and diagnostics features"
  ],
  "steps": [
   "Download the app either by scanning the QR code on the equipment you are installing with the phone camera and following the instructions, or by searching \"Rheem\" in the Apple App Store or Google Play.",
   "Pair to the Bluetooth-enabled outdoor or indoor unit to run installation setup and verify operating status.",
   "Use Service mode to view active alarms with history and get step-by-step parts-replacement guidance.",
   "Scan or enter the model to confirm warranty ownership and share a warranty certificate.",
   "Use the built-in retailer/distributor locator and the rebate, financing, and AHRI lookup tools as needed."
  ],
  "caution": "Rheem publishes the Bluetooth setup only at a feature level (\"up to 54% faster installation, up to 62% faster diagnostics\" from a 2022 MIAT time study). The official Contractor App guide is a two-page overview, not a pairing walkthrough - the detailed screens are in the app itself. Do not go in expecting a printed step list.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "PlusOne Diagnostics and Bluetooth Connectivity is the equipment-side feature (7-segment LED plus Bluetooth) this app talks to - it is not a separate app.",
   "Homeowner counterpart is the EcoNet app (tb-rheem-econet-app).",
   "Rheem's \"Fix It\" plumber diagnostics feature requires membership in Rheem's MyRheem plumber database; HVAC-side gating was not confirmed."
  ],
  "links": [
   {
    "label": "Rheem Contractor App overview",
    "url": "https://www.rheem.com/rheem-contractor-app-splash/"
   },
   {
    "label": "Rheem app - App Store",
    "url": "https://apps.apple.com/us/app/id1604626837"
   },
   {
    "label": "Tap into everything Rheem (mobile apps overview)",
    "url": "https://www.rheem.com/mobile/"
   }
  ],
  "manuals": [
   {
    "title": "The Rheem Contractor App guide (RHM5626)",
    "seedFile": "toolbox-rheem-contractor-app-guide.pdf"
   }
  ],
  "source": "The Rheem Contractor App guide, RHM5626 - https://files.rheem.com/blobazrheem/wp-content/uploads/sites/2/RHM5626_Rheem_FeaturedInnovationLP_ContractorAppGuide_R1b.pdf (PDF downloaded and text extracted for this entry - it confirmed the Bluetooth-setup requirement and the two download paths but contains no numbered pairing procedure); rheem.com/rheem-contractor-app-splash/; App Store id1604626837"
 },
 {
  "id": "tb-rheem-econet-app",
  "brand": "Rheem",
  "family": "Ruud - EcoNet-enabled HVAC and water heating (Rheem, Ruud, Friedrich, Richmond, Sure Comfort, Russell by Rheem, Durastar)",
  "toolName": "Rheem EcoNet App (also listed simply as EcoNet)",
  "equipment": "Other",
  "title": "Homeowner smart-control app for EcoNet-enabled equipment",
  "whenToUse": "Handing a homeowner remote control and alerts after installing EcoNet-enabled equipment - thermostat, furnace, AC/heat pump, or water heater.",
  "requirements": [
   "EcoNet-enabled equipment",
   "iOS 16.0 or later per the App Store listing, or Android"
  ],
  "steps": [
   "Download \"Rheem EcoNet\" (or the near-identical \"EcoNet\" listing) from the App Store or Google Play.",
   "Create or sign into an account.",
   "Add the EcoNet-enabled equipment to set up Smart Control, custom schedules, and alerts and notifications.",
   "Optionally connect the homeowner's contractor so alerts are shared for faster service."
  ],
  "caution": "Apple's store carries two nearly identical Rheem-published apps - \"Rheem EcoNet\" (id1610093715) and \"EcoNet\" (id1610093590) - with the same UI. Rheem does not explain the duplication anywhere official. Pick one and tell the customer which icon to keep.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Homeowner counterpart to the Rheem Contractor App (tb-rheem-contractor-app)."
  ],
  "links": [
   {
    "label": "EcoNet overview",
    "url": "https://www.rheem.com/econet/"
   },
   {
    "label": "Rheem EcoNet - App Store",
    "url": "https://apps.apple.com/us/app/rheem-econet/id1610093715"
   },
   {
    "label": "EcoNet - App Store",
    "url": "https://apps.apple.com/us/app/econet/id1610093590"
   }
  ],
  "manuals": [],
  "source": "rheem.com/econet/; App Store listings id1610093715 and id1610093590"
 },
 {
  "id": "tb-rheem-econet-control-center",
  "brand": "Rheem",
  "family": "Ruud - EcoNet Control Center touchscreen thermostat (RETST600SYS / RETST800SYS)",
  "toolName": "EcoNet Control Center (controlled through the EcoNet app)",
  "equipment": "Thermostat/Control",
  "title": "Older integrated air-and-water touchscreen control - no app of its own",
  "whenToUse": "You meet an EcoNet Control Center touchscreen on the wall instead of the current EcoNet Smart Thermostat and need to know which app talks to it.",
  "requirements": [
   "A compatible Wi-Fi module",
   "The standard EcoNet app"
  ],
  "steps": [],
  "caution": "There is no dedicated app for this hardware. Rheem's product page positions it as the integrated air/water control paired with a compatible Wi-Fi module and the EcoNet app.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: the current EcoNet Smart Thermostat line. Listed here because the name shows up in the field and maps to the same EcoNet app, not to a separate tool."
  ],
  "links": [
   {
    "label": "Rheem EcoNet Smart Thermostat (the RETST600SYS product page now redirects here)",
    "url": "https://www.rheem.com/econet-smart-thermostat/"
   }
  ],
  "manuals": [],
  "source": "rheem.com/product/rheem-econet-control-center-retst600sys/"
 },
 {
  "id": "tb-goodman-coolcloud",
  "brand": "Goodman/Amana",
  "family": "Daikin family - furnaces and air handlers with integrated ComfortBridge controls",
  "toolName": "CoolCloud HVAC App (CoolCloud HVAC 2.0)",
  "equipment": "Gas Furnace",
  "title": "Register, connect, and pair to a ComfortBridge board over Bluetooth",
  "whenToUse": "Any Goodman or Amana furnace or air handler with integrated ComfortBridge controls - initial setup, changing device settings, running diagnostic run modes, or viewing fault history. This entry covers getting connected; Shared Data and non-communicating outdoor setup are separate procedures.",
  "requirements": [
   "A free CoolCloud account (username/password, verified by an SMS code sent to the phone number on the registration form)",
   "Bluetooth range of the indoor unit - it broadcasts a Bluetooth network named for its model number",
   "iOS or Android phone/tablet",
   "Internet at least once every 7 days: the login expires after 7 consecutive days with no connectivity, so open the app on a network before a job at a dead site"
  ],
  "steps": [
   "Open the app. Existing users log in with username and password. New users tap \"Register here,\" provide the registration information (first name, last name, company, email, cell phone number, username and password), agree to the terms, and tap Register - a text message with a verification code arrives, is entered to verify the account, and then you log in. Verify the password rules on the live registration screen; SA-033 does not print them.",
   "After login the app lists indoor Bluetooth devices in range by model number and Bluetooth board broadcast ID. Tap the unit you want to open the Security Verification screen.",
   "Pairing method 1, \"Pair Device by Code\": read the 3-digit code shown on the indoor circuit board's 7-segment display (the same display used to change board settings with the three push buttons). If the code is not visible, remove the front panel from the unit to see the code once the unit has been rebooted and the door switch is depressed - note that pulling the panel can reset currently active fault codes. Enter the 3 digits in the app and tap Authenticate. Up to three consecutive wrong attempts, then a new code is displayed.",
   "Pairing method 2, \"Pair Device by Thermostat\" (use when the board code is not visible without pulling the panel): select the method and tap Next to start the timer; within 5 minutes set the thermostat to OFF with fan AUTO so there are no calls - the app confirms Success, tap Next; within 8 minutes send any call, G / constant fan recommended - app confirms Success, tap Next; within 2 minutes remove all calls - app confirms; tap Authenticate to finish.",
   "If prompted, apply any mandatory Bluetooth module software (OTA) update before continuing. Optional updates can be skipped. The unit drops off Bluetooth when an update completes.",
   "The System Overview screen then shows work notes left by previous techs plus the available devices: System Settings, the indoor unit, and the outdoor unit. A communicating outdoor unit shows its model number; a non-communicating one shows \"Click to Setup Non-Comm Outdoor\" / \"24V Outdoor\".",
   "Tap a device for Device Overview. To run a test: pick a run mode, tap Run Mode, choose a capacity percentage on the slider, and tap Run Mode again to start (50% or less selects low stage, above 50% selects high stage on multi-stage units). Tap Stop Mode to end - modes also auto-expire after 5 minutes if the app disconnects.",
   "The unit-specific menus are Configuration Info (read-only: firmware and shared-data version, model/serial, max airflow), Device Settings (tap a value, pick a new one, tap Apply Changes to commit; Reset clears unsaved changes), Device Status (tap Refresh), Sensor Data (tap Refresh), Fault Code History (Active and History; tap How-to-fix on an active fault for causes and corrective actions), and Shared Data."
  ],
  "caution": "All fault codes, including shared-data faults, must be cleared and shared data populated before the board will accept an OTA update. A Bluetooth network broadcasting a generic name (\"Furnace or Air Handler\") or \"OTA Unknown\" means a blower communication error, a shared-data mismatch, or an interrupted prior OTA update that has to be completed immediately.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "ComfortBridge is the communicating control platform on the furnace/air-handler side; CoolCloud HVAC is the companion Bluetooth app. Same app and platform for Amana-branded equipment.",
   "App store now carries \"CoolCloud HVAC 2.0\" alongside the original listing; the SA-033 bulletin (2020) is the only full official walkthrough published.",
   "Unrelated to the Daikin BTSDL01 Shared Data Loader (tb-daikin-btsdl01) and to Daikin One+ / SkyportCare - three different systems that all use the words \"shared data\" or \"Bluetooth pairing.\""
  ],
  "links": [
   {
    "label": "CoolCloud HVAC - App Store",
    "url": "https://apps.apple.com/us/app/coolcloud-hvac/id1269645921"
   },
   {
    "label": "CoolCloud HVAC 2.0 - App Store",
    "url": "https://apps.apple.com/us/app/coolcloud-hvac-2-0/id6463789952"
   },
   {
    "label": "CoolCloud HVAC official site",
    "url": "https://www.coolcloudhvac.com/"
   }
  ],
  "manuals": [
   {
    "title": "SA-033 CoolCloud HVAC App Technical Guide (Goodman service bulletin)",
    "seedFile": "toolbox-goodman-coolcloud-sa033.pdf"
   }
  ],
  "source": "Goodman Service Bulletin SA-033, \"CoolCloud HVAC APP Technical Guide for Furnaces and Air Handlers with integrated ComfortBridge Controls\", Apr 2 2020, Parts 1-4 - https://mobile.goodmanmfg.com/mobileapp/stellent/Toolkit/TechServices/SB/goodman/SA-All/SA-033+CoolCloud+HVAC+APP+Technical+Guide.pdf (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-goodman-coolcloud-shared-data",
  "brand": "Goodman/Amana",
  "family": "Daikin family - ComfortBridge-equipped furnaces and air handlers",
  "toolName": "CoolCloud HVAC App - Shared Data update",
  "equipment": "Gas Furnace",
  "title": "Load or refresh Shared Data on a ComfortBridge board after a parts replacement",
  "whenToUse": "After replacing a control board or blower motor on a ComfortBridge unit, or when the app reports Shared Data is outdated or missing, or a d0/d1/d2-type fault is present.",
  "requirements": [
   "Already paired to the unit in CoolCloud (see tb-goodman-coolcloud)",
   "The unit's 2D barcode on the blower deck, or the exact model number"
  ],
  "steps": [
   "Open the Shared Data menu on the paired unit.",
   "If Shared Data is outdated or missing, choose \"Use Camera\" and scan the unit's 2D barcode on the blower deck. You may have to remove the front panel and depress the door switch, then wait for the board to reboot.",
   "If the barcode is unreadable, choose \"Manually Enter Unit Info\" and pick the model number from the searchable list instead.",
   "Review the confirmation screen - model, brand, flow direction, capacity, cabinet width, blower HP - and tap \"Confirm and Continue\".",
   "Allow up to 30 seconds for the process to complete.",
   "Reconfigure any non-communicating outdoor unit settings afterward, because the update wipes them (see tb-goodman-coolcloud-noncomm-outdoor)."
  ],
  "caution": "A Shared Data update resets ALL previous settings on the unit, including manual non-communicating outdoor configuration - plan to redo it. Loading invalid Shared Data, which is what a manual-entry mistake produces, can interfere with system performance and void the equipment's warranty. Goodman's recommended method is the camera barcode scan, not manual entry.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Goodman/Amana ComfortBridge equivalent of the Daikin-brand BTSDL01 hardware loader (tb-daikin-btsdl01) - same concept, different tool, do not mix them up."
  ],
  "links": [
   {
    "label": "CoolCloud HVAC official site",
    "url": "https://www.coolcloudhvac.com/"
   }
  ],
  "manuals": [
   {
    "title": "SA-033 CoolCloud HVAC App Technical Guide (Goodman service bulletin)",
    "seedFile": "toolbox-goodman-coolcloud-sa033.pdf"
   }
  ],
  "source": "Goodman Service Bulletin SA-033, Part 4 \"Shared Data\" (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-goodman-coolcloud-noncomm-outdoor",
  "brand": "Goodman/Amana",
  "family": "Daikin family - ComfortBridge indoor unit paired with a 24V non-communicating outdoor unit",
  "toolName": "CoolCloud HVAC App - non-communicating outdoor setup",
  "equipment": "Condenser/Heat Pump",
  "title": "Tell a ComfortBridge indoor unit what non-communicating outdoor unit it is matched to",
  "whenToUse": "A ComfortBridge furnace or air handler is paired with a plain 24V condenser or heat pump, or after a Shared Data update wiped the previous configuration.",
  "requirements": [
   "Already paired to the indoor unit in CoolCloud",
   "The outdoor unit's type and tonnage"
  ],
  "steps": [
   "From System Overview, tap \"Click to Setup Non-Comm Outdoor\", then Device Settings.",
   "Open the \"Set Outdoor Unit Type\" dropdown.",
   "Select Single Stage AC, Single Stage Heat Pump, 2 Stage AC, or 2 Stage Heat Pump.",
   "Tap Apply Changes and confirm the Success message.",
   "Open Device Settings again and set Unit Tonnage, adjustable in 0.1-ton increments."
  ],
  "caution": "Tonnage is what drives airflow - the indoor unit delivers 400 CFM per ton on high-stage calls, so a wrong tonnage entry is a wrong-airflow callback waiting to happen. Any Shared Data update clears this configuration and it must be redone.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [],
  "links": [
   {
    "label": "CoolCloud HVAC official site",
    "url": "https://www.coolcloudhvac.com/"
   }
  ],
  "manuals": [
   {
    "title": "SA-033 CoolCloud HVAC App Technical Guide (Goodman service bulletin)",
    "seedFile": "toolbox-goodman-coolcloud-sa033.pdf"
   }
  ],
  "source": "Goodman Service Bulletin SA-033, Part 5 \"Setting Up a Non-Communicating System\" (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-daikin-btsdl01",
  "brand": "Daikin",
  "family": "Daikin-brand ComfortNet-compatible communicating equipment",
  "toolName": "Bluetooth Shared Data Loader (BTSDL01-D) with the Daikin Shared Data App",
  "equipment": "Condenser/Heat Pump",
  "title": "BTSDL01-D - loading Shared Data onto a Daikin communicating board",
  "whenToUse": "When a unit reports fault code d0, d1, or d2 - Shared Data, the chassis-specific data that keeps communicating components compatible, has been lost because all of its storage locations were replaced at once. Avoid needing this at all by replacing components one at a time and powering the system up after each one.",
  "requirements": [
   "BTSDL01-D Bluetooth Shared Data Loader hardware, ordered through a Daikin Parts Customer Service Representative",
   "A CR2032 3V coin cell (one ships with the loader; positive side up)",
   "The Daikin Shared Data App (iOS or Android) with a registered account",
   "The unit's model number, or its 2D barcode - usually inside the unit cabinet"
  ],
  "steps": [
   "STEP 1 - load the program onto the loader: switch the loader's power switch ON. The blue status LED should begin flashing, roughly once every 4 seconds.",
   "In the Shared Data app, connect to the \"SharedDataCard\" Bluetooth network it detects. You can also review the in-app Pre-Programming Procedures from this page.",
   "Select the Shared Data by scanning the unit's 2D barcode with the phone camera - Daikin recommends this over manual entry for accuracy - or type/select the model number manually. Use the \"Need help finding your barcode?\" link if the barcode is hard to locate.",
   "Review the confirmation screen for accuracy, then tap \"Confirm and Continue\" to program the card. A success screen confirms the load.",
   "STEP 2 - load Shared Data onto the equipment: power OFF the HVAC system first.",
   "Insert the loader card into the Shared Data loading connector on the unit's control board. The card must be powered on - a flashing blue LED confirms it is working.",
   "Power the HVAC system back ON and allow 30 seconds for the loading process to complete.",
   "Power the equipment back OFF and remove the card.",
   "Power the system back ON and confirm the load succeeded and the system runs normally with no fault code."
  ],
  "caution": "Programming the card overwrites whatever data is already on it - re-scan and re-check the confirmation screen before you tap \"Confirm and Continue.\" Shared Data only has to be reloaded if every source of it was replaced at once: the indoor control board, the indoor blower motor, and, on a system wired communicating via 1-2-R-C, the outdoor control board. Three quick blinks of the status LED means the CR2032 is low - replace it before a job. Always power off before inserting or removing the card.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Reusable and field-reprogrammable, unlike the older single-use shared data chips it replaced.",
   "The loader's FCC statement reads \"This Device Contains Transmitter Module FCC ID: QOQB-GM111; IC: 5123A-BGM111\" - the FCC ID as printed does not match a standard format, so check the FCC ID database before using it for a lookup.",
   "The Goodman/Amana ComfortBridge equivalent is done in software through CoolCloud (tb-goodman-coolcloud-shared-data), with no hardware card."
  ],
  "links": [
   {
    "label": "Daikin Data Loader - App Store",
    "url": "https://apps.apple.com/us/app/daikin-data-loader/id1524304712"
   },
   {
    "label": "Daikin Data Loader - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.daikindataloader.app"
   }
  ],
  "manuals": [
   {
    "title": "Daikin Shared Data Loader User Manual",
    "seedFile": "toolbox-daikin-shared-data-loader.pdf"
   }
  ],
  "source": "Daikin Shared Data Loader User Manual (Daikin North America LLC) - https://daikinone.com/loadermanual/loadermanual.pdf (PDF downloaded and text extracted for this entry, confirming the existing Brackett entry verbatim)"
 },
 {
  "id": "tb-daikin-oneplus-commissioning",
  "brand": "Daikin",
  "family": "Daikin One+ Smart Thermostat, plus Amana- and Goodman-branded equivalents (unitary inverter/SD and two-stage communicating systems; S21 and P1/P2 ductless/VRV variants)",
  "toolName": "Daikin One+ installer setup - on-thermostat 5-step wizard",
  "equipment": "Thermostat/Control",
  "title": "Wire and commission a Daikin One+ thermostat from its own screen",
  "whenToUse": "Installing or replacing a Daikin One+ (or Amana/Goodman equivalent) on a communicating indoor unit paired with either a communicating outdoor unit or a 24V single-stage condenser through a D24V gateway.",
  "requirements": [
   "Interior wall, away from drafts, supply air, ceiling fans, sun or appliance radiant heat, concealed pipes/chimneys, and outside walls",
   "Mounted level, about 5 feet above the floor, using the included screws",
   "Maximum 125 ft of 18-gauge wire between thermostat and indoor unit; verify 0.6VDC between Data 1 and Data 2 before and after wiring",
   "A password-protected home Wi-Fi router; 5GHz routers work only if they also serve 2.4GHz",
   "For aux heat accessories: minimum 18-gauge wire, 125 ft max, isolation relay recommended"
  ],
  "steps": [
   "Wiring, communicating indoor to communicating outdoor: run 1, 2, C, R from the Daikin One+ to 1, 2, R, C at the indoor unit, then wires 1 and 2 from the indoor unit to 1 and 2 at the outdoor unit.",
   "Wiring, communicating indoor to non-communicating outdoor: run 1, 2, C, R from the thermostat to 1, 2, R, C at the indoor unit, then Y1 from the indoor unit to Y1 at the outdoor unit.",
   "Aux wiring for a humidifier, dehumidifier, or other 24V accessory: route the 24VAC control signal through one of the thermostat's Aux 1/Aux 1c or Aux 2/Aux 2c dry contacts to an SPST relay driving the field device. You pick the terminal later in the wizard's Add Equipment step.",
   "Power up the thermostat. On the welcome screen choose language and equipment type - unitary is the default; single/multi-split S21 and VRV/SkyAir P1/P2 are the alternatives - then continue to the setup screen.",
   "Tap \"begin setup\". Step 1 Communication: select the home Wi-Fi, choose the network, enter the password. Once connected the thermostat checks for and can auto-install a software update.",
   "Step 2 Personalization: language, large-font option, date and time (auto-set once Wi-Fi is up), thermostat name, degree units.",
   "Step 3 Equipment Setup: review the auto-detected communicating equipment, or use \"add equipment\" to add an air quality sensor, aux heat source, humidifier, dehumidifier, filter box/HEPA/standard filter, EWC zone board, or VRV IDU sensor. For an added aux heat source, set its Aux 1 or Aux 2 connection, whether the heat pump or the aux is primary heat, and lockout temperatures and T-on/T-off differential staging under \"control\".",
   "Step 4 System Optimization: run System Test on inverter systems - it must complete without errors, and the system test is complete only when code E11 clears from the 7-segment display on the heat pump or air conditioner (TRC-3 publishes no duration for the test). Optionally run Charge Verification Mode, which holds steady system operation for approximately 1-2 hours to allow refrigerant charging through the suction charge port. Run any Optional Tests the equipment supports. Review Error History (white is non-critical, yellow is critical). Run Calibration - Daikin highly recommends it for the temperature and humidity sensors. Use Status for live run data.",
   "Step 5 Preferences: Cool/Heat options, House settings, Dealer information (dealer contact details, displayed to the homeowner on the thermostat home screen if a system error develops - confirm the exact fields on-device), and Reminders at 1-24 month intervals per installed equipment and accessory.",
   "All five steps must show a green checkmark before \"complete setup\" will exit to normal operating mode."
  ],
  "caution": "The thermostat's 4-pin connector is labeled 1,2,C,R while the indoor and outdoor boards are labeled 1,2,R,C - wiring C and R straight across produces a communication error or equipment that never gets recognized. On inverter systems setup cannot be completed until the System Test finishes and E11 clears. The router must be password-protected, and 5GHz-only configurations are unsupported.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Dealer-only settings after commissioning: Settings > dealer edit (warning screen) > tap the (i) icon to reveal a rotating installer code (for example c0fe) > enter it under \"unlock thermostat\" to get back into the setup wizard.",
   "The same commissioning can be driven remotely from a phone through SkyportCare (tb-daikin-skyportcare); the homeowner app is SkyportHome (tb-daikin-skyporthome)."
  ],
  "links": [
   {
    "label": "Daikin One+ Installation Guide (daikincomfort.com)",
    "url": "https://daikincomfort.com/docs/default-source/daikin-one-/daikinoneplusinstallationguide.pdf"
   }
  ],
  "manuals": [
   {
    "title": "TRC-3 Daikin One+ Smart Thermostat Installation and Commissioning",
    "seedFile": "toolbox-daikin-oneplus-trc3.pdf"
   }
  ],
  "source": "TRC-3 Daikin One+ Smart Thermostat Installation and Commissioning training module (Daikin Comfort Technologies North America) - https://daikincomfort.com/docs/default-source/daikin-one-/daikinoneplusinstallationguide.pdf (PDF downloaded and text extracted for this entry)"
 },
 {
  "id": "tb-daikin-skyportcare",
  "brand": "Daikin",
  "family": "Daikin One+ / Amana / Goodman communicating smart thermostats",
  "toolName": "SkyportCare (was Daikin One Cloud Services, Amana brand Cloud Services, Goodman Installer App)",
  "equipment": "Thermostat/Control",
  "title": "Cloud commissioning (Quality Install) and remote monitoring from the dealer portal and app",
  "whenToUse": "Commissioning a job from the phone instead of the thermostat screen - profile push, system test, charge verification, commissioning report - or afterward to monitor a customer's connected system for critical errors and maintenance reminders.",
  "requirements": [
   "An active SkyportCare account; an Admin invites Team Members by email (Admin can add/edit/delete members and customers; Tech can only add customers)",
   "A Daikin SSO login - credentials carry over from Daikin One Cloud Services, Amana Cloud Services, and the Goodman Installer App",
   "Homeowner permission for remote access, granted on the thermostat's own screen when the app requests it - the training decks do not state how long the grant lasts, so verify in the app",
   "Wi-Fi connectivity at the thermostat"
  ],
  "steps": [
   "Team member invite (dealer admin, web): from the Dashboard's Team Members widget click Add Member, enter first name, last name, email, and role (Admin or Tech) - an invite email goes out.",
   "Accept the invite: click \"Accept Invitation\" in the email, note the password provided, go to https://skyportcare.daikincomfort.com, and sign in with that email and password on first login.",
   "In the mobile app: sign in, then from the thermostat's device screen tap \"Quality Install\". The app also offers System Profiles for pre-built settings templates.",
   "Create the job: tap \"+\" to add the job location by GPS or typed address, then continue.",
   "Add the thermostat: tap \"Add thermostat to job\", scan the 2D barcode on the box or terminal subbase, or enter the DKN(S) number manually. Toggle \"connected to a zone board\" if the unit is on zoning - equipment info is unavailable if it is not zone one.",
   "Get the thermostat online: selecting any task first checks connectivity (a grey Wi-Fi icon means not connected). On the thermostat's own setup, go to communication, check \"use Wi-Fi\", select the network, enter the password. Once SkyportCloud (or \"Daikin One Cloud\" on older units) shows connected, tap Continue in the app.",
   "Grant remote access: the app requests it automatically once the thermostat is on Wi-Fi - the user confirms the access on the thermostat UI and the app moves on to the selected task. If the thermostat starts a firmware update, let it finish first.",
   "Apply a System Profile: verify the connected equipment list, then select and/or modify any profile to send to the thermostat, make edits as needed, and tap \"Send to Thermostat\". Modifying a profile does not affect the saved default profile.",
   "Run System Test (required on inverter systems): calculate the refrigerant trim charge by measuring total line-set length and selecting liquid and suction line diameters, enter the charge actually weighed in, verify the service valves are open, then tap \"Run Test\". You can leave the screen while the test runs and return as needed; the decks publish no duration.",
   "Run Charge Verification (optional, inverter systems): once the system stabilizes and is running at full speed the app displays the calculated subcool - allow up to a 5-minute lag between the gauge reading and the app. Stopping the verification generates a report. (TRC-3 describes the thermostat-side Charge Verification Mode as approximately 1-2 hours of steady operation.)",
   "Tap \"Complete Setup\" - after all steps are complete you can share a commissioning report before completing the job, one to the homeowner and one to the contractor."
  ],
  "caution": "Remote thermostat access is temporary and has to be re-granted on the thermostat for a later remote session - the decks do not publish the expiry, so verify in the app. Editing a profile in the app does not change the saved default profile. System test and charge verification hold the system at full or steady speed for a long stretch - do not leave the site assuming it finished without checking the report. An incomplete system test leaves error code 11 showing until the test completes.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Rename history (fall 2025): Daikin ONE Cloud Services + Amana brand Cloud Services + Goodman Installer App were unified and renamed SkyportCare. Same Daikin SSO login. The exact announcement date is not published on daikincomfort.com - verify with Daikin if it matters.",
   "Legacy dealer URLs auto-redirect to https://skyportcare.daikincomfort.com.",
   "Whether a SkyportCare license now bundles with a Daikin One+ purchase, and for how long, is not stated on Daikin's public cloud-services pages - verify in the dealer portal.",
   "The homeowner-side rename at the same time was Daikin ONE Home / Amana brand Home / Goodman Home -> SkyportHome (tb-daikin-skyporthome)."
  ],
  "links": [
   {
    "label": "SkyportCare - remote cloud monitoring and care",
    "url": "https://daikincomfort.com/products/cloud-services-apps/cloud-services"
   },
   {
    "label": "SkyportCare / SkyportHome docs (daikinone.com)",
    "url": "https://daikinone.com/professionals/docs"
   }
  ],
  "manuals": [
   {
    "title": "Daikin One Cloud Services Commissioning (Quality Install)",
    "seedFile": "toolbox-daikin-cloud-services-commissioning.pdf"
   },
   {
    "title": "TRC-3 Daikin One+ Smart Thermostat Installation and Commissioning",
    "seedFile": "toolbox-daikin-oneplus-trc3.pdf"
   }
  ],
  "source": "Daikin One Cloud Services Commissioning (Quality Install) training deck - https://daikinone.com/files/docs/daikin-oneplus-cloud-services.pdf ; TRC-3 Daikin One+ Installation and Commissioning - https://daikincomfort.com/docs/default-source/daikin-one-/daikinoneplusinstallationguide.pdf (both PDFs downloaded and re-extracted with pdftotext -raw for this entry); daikincomfort.com cloud-services pages"
 },
 {
  "id": "tb-daikin-skyporthome",
  "brand": "Daikin",
  "family": "Daikin One+ / Amana / Goodman communicating smart thermostats and connected accessories",
  "toolName": "SkyportHome (was Daikin ONE Home, Amana brand Home, Goodman Home)",
  "equipment": "Thermostat/Control",
  "title": "Set up the homeowner's account and pair the app to the thermostat at handoff",
  "whenToUse": "After commissioning a Daikin One+ or Amana/Goodman equivalent, to create the homeowner's remote-control account and pair it to the installed thermostat.",
  "requirements": [
   "An iOS or Android device",
   "The thermostat on home Wi-Fi and wired to a communicating system",
   "A valid homeowner email address"
  ],
  "steps": [
   "Download SkyportHome from the App Store or Google Play.",
   "Tap \"Create Account\", review the Terms of Use, Privacy Statement, and End User License, tap \"I Agree\", enter first and last name, email (which becomes the user ID), and a password of 10+ characters with upper and lower case, a number, and a special character, then tap Next.",
   "Check the inbox for the Daikin Comfort Technologies welcome email with a 6-digit code, enter it, and tap \"Confirm Code\". It can be resent after 60 seconds.",
   "Tap \"Add Location\". Allow location access (Once or While Using the App) to auto-place the pin, or tap \"Don't Allow\" and type the street address. Drag the pin over the home and tap \"Save This Location\" - enabling geofencing here lets Away mode follow the phone.",
   "Tap \"Add Device\" and select the installed model from the dropdown (Daikin One+ Smart Thermostat, Daikin One Touch, Amana Smart Thermostat, Daikin One Lite, Goodman GTST, Daikin D2271, Daikin Mini-split Wall Mount, Daikin Altherma Hot Water Tank, and others).",
   "On the thermostat, with Wi-Fi enabled, open the settings/account menu to display a 6-digit pairing code. Enter that code in the app and tap Add/Next - the connected thermostat then appears."
  ],
  "caution": "Nothing beyond standard account and pairing steps is flagged in the official source.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Rename history (about Oct 15, 2025): Daikin ONE Home + Amana brand Home + Goodman Home -> SkyportHome. Same Daikin SSO login carries over.",
   "Naming collision: this is NOT the older standalone \"Daikin Skyport\" app - see tb-daikin-skyport-legacy."
  ],
  "links": [
   {
    "label": "SkyportHome - App Store",
    "url": "https://apps.apple.com/us/app/skyporthome/id1458663374"
   },
   {
    "label": "SkyportHome - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.daikincomfort.daikinonehome"
   },
   {
    "label": "Cloud services and apps - homeowner",
    "url": "https://daikincomfort.com/products/cloud-services-apps/cloud-services---apps-homeowner"
   }
  ],
  "manuals": [
   {
    "title": "TRC-3 Daikin One+ Smart Thermostat Installation and Commissioning",
    "seedFile": "toolbox-daikin-oneplus-trc3.pdf"
   }
  ],
  "source": "TRC-3 Daikin One+ Smart Thermostat Installation and Commissioning training module, SkyportHome Mobile App section (PDF downloaded for this entry)"
 },
 {
  "id": "tb-daikin-skyport-legacy",
  "brand": "Daikin",
  "family": "Older standalone Daikin Skyport consumer app (predates the Daikin One+ / Skyport-family rebrand)",
  "toolName": "Daikin Skyport (legacy app)",
  "equipment": "Thermostat/Control",
  "title": "Legacy Daikin Skyport app - not the same product as SkyportHome",
  "whenToUse": "A customer says they use \"the Daikin Skyport app.\" Confirm which one they mean before troubleshooting: App Store id1455933603 (legacy Skyport) is a different product from SkyportHome, id1458663374.",
  "requirements": [],
  "steps": [],
  "caution": "No official Daikin step-by-step setup guide for the legacy Skyport app was found. The app-store listing describes features - remote thermostat control, weather, runtime monitoring, alerts - but nothing procedural, so no procedure is published here.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: SkyportHome (tb-daikin-skyporthome), which is the Oct 2025 unification of Daikin ONE Home, Amana brand Home, and Goodman Home - a different app despite the shared word \"Skyport.\"",
   "Google Play package for the legacy app: com.skyportlabs.daikin.skyport.",
   "Legacy does not mean abandoned: the App Store listing (Skyport Labs, id1455933603) shows version 7.2.1 dated 06/23/2025 adding biometric authentication, two-factor authentication, and the ability to transfer thermostats."
  ],
  "links": [
   {
    "label": "Daikin Skyport (legacy) - App Store",
    "url": "https://apps.apple.com/us/app/daikin-skyport/id1455933603"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listing id1455933603 and Google Play com.skyportlabs.daikin.skyport (existence and naming only)"
 },
 {
  "id": "tb-mitsubishi-kumo-cloud",
  "brand": "Mitsubishi",
  "family": "Mitsubishi Electric ductless (M-Series/P-Series) and PAA ducted systems using a Wireless Interface (PAC-USWHS002-WF-1/-2)",
  "toolName": "kumo cloud - installer/technician mode",
  "equipment": "Ductless",
  "title": "Commission a site: install the Wireless Interface, add indoor units, and transfer to the owner",
  "whenToUse": "Commissioning any Mitsubishi indoor unit fitted with a Wireless Interface for app control, replacing an interface, or adjusting installer-level settings after install. Connecting a new site and adding indoor units must be done on site; transferring to the owner and adjusting advanced settings can be done remotely afterward.",
  "requirements": [
   "A PAC-USWHS002-WF-1 or -WF-2 Wireless Interface on the CN105 connector of each indoor unit - professional install only; WI 2 is required for PAA units and for humidifier/ERV/dual-speed-fan settings",
   "A 2.4GHz Wi-Fi network only (5GHz is not supported), channels 1-11, with live internet and WPA2-PSK (AES) security - unsecured networks are not supported",
   "A phone or tablet on iOS 13.0+ or Android 5.1+, with Wi-Fi and Bluetooth on",
   "A free kumo cloud account; a Diamond Contractor PIN is optional"
  ],
  "steps": [
   "Quick setup overview: install the outdoor and indoor units and connect a WI 2 to CN105 on each indoor unit; have the home Wi-Fi name and password ready; connect a new site in the app; add each indoor unit and adjust settings; email the owner and transfer ownership.",
   "Download kumo cloud from the links on kumocloud.com, create an account (email and password, agree to terms, optionally check \"I'm a Diamond Contractor\" and enter the PIN), verify through the confirmation email, and log in.",
   "Install the Wireless Interface: one end of the WI 2 cable to CN105 on the indoor unit, the other to the white \"To IDU\" port on the WI 2 (the red \"To ACCY\" port is for an external accessory). Four quick blue flashes means Bluetooth LE configuration mode is ready to pair; three slow repeating blue flashes means connected.",
   "Wireless Interface configuration button: hold 5 seconds to drop back to Bluetooth LE mode; hold until the amber LED turns on (about 5 seconds) for factory reset; hold until it begins blinking (about 8 seconds) to fully erase user settings.",
   "In the app, go to Settings > System Setup > Installer Settings.",
   "On the Installer screen tap Skip, or enter a Diamond Contractor PIN and Submit one time. Tap \"Connect New Site\", enter the site details, tap Next.",
   "Connect the site to the wireless network: type the local 2.4GHz network name and password exactly (case-sensitive) or tap \"Available Networks\" to scan and pick one, then Next.",
   "Add indoor units: tap Connect on the strongest-signal Wireless Interface found nearby, or match by the MAC address printed on the unit. Enter a zone name. If prompted, set airflow/static pressure per the indoor unit's DIP switches. Choose whether to enable Auto mode (dual-setpoint heat/cool auto-switching). Repeat for each unit.",
   "Optional System Changeover group on multi-zone systems sharing one outdoor unit: add the zone to a new or existing changeover group, name it, and set Priority zone(s), Standby max (30 min to 4 hr), and Run minimum (10-40 min) under Changeover Settings.",
   "Optional Prohibits: lock out homeowner control of Power, Mode, or Setpoint per zone, from the Connect screen or later in Installer Settings.",
   "Optional accessories: from the Site screen tap Accessories, then Add Wireless Sensor (PAC-USWHS003-TH-1 - commission it before mounting, activate by pulling the insulator tab, mount with the adhesive strip out of direct sun, vents, and drafts; allow 24-72 hours for a full bond), Add Backup Heater, Add Humidifier, Add Dehumidifier, Add Ventilation, or Add Hydronic Heater.",
   "Finish: on the Site screen tap \"Finish Setup\" to end the installer session while keeping control for a multi-visit job, or run Test Run first (Run Cooling / Run Heat per zone, up to 2 hours, End Test Run to stop).",
   "Transfer to Owner: tap \"Transfer to Owner\", enter the owner's email, tap \"Send Invite\". The site stays on the installer's account until the homeowner accepts and logs in; the invite can be re-sent from the job site name."
  ],
  "caution": "Wireless Interface 1 and 2 will NOT join a 5GHz network and only support Wi-Fi channels 1-11 - confirm a multiband router can actually serve a 2.4GHz-only device before you leave. kumo cloud will not connect to an unsecured network. Every Wireless Interface at a site must be on the same network or changeover and kumo station features misbehave. Test Run auto-ends after 2 hours if you do not stop it.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Renamed, not renaming: the App Store listing is now \"Comfort by Mitsubishi Electric\" with the subtitle \"Formerly kumo cloud\" and the description line \"Comfort is the new kumo!\" - the SAME listing/ID (998509713), renamed by update. The exact announcement date is not confirmed from an official page. The procedure here is from the last published official technician manual (app 2.22, 2023); on-screen labels may already differ.",
   "kumo cloud can be the sole controller, or run in series with an MHK1/MHK2 wired remote controller when a WI 2 is used.",
   "First-generation Wireless Interfaces (PAC-WHS01WF-E) use a different pairing flow documented separately in the same manual.",
   "kumo station is a separate hardware accessory for changeover coordination, not an app.",
   "MELCloud is Mitsubishi's European/international platform, not the US tool - do not send a US customer there."
  ],
  "links": [
   {
    "label": "kumo cloud (official site with download links)",
    "url": "https://kumocloud.com"
   },
   {
    "label": "Comfort by Mitsubishi Electric - App Store",
    "url": "https://apps.apple.com/us/app/comfort-by-mitsubishi-electric/id998509713"
   },
   {
    "label": "MyLinkDrive - Wireless Interface manuals and compatibility charts",
    "url": "https://www.mylinkdrive.com/USA/Controls"
   }
  ],
  "manuals": [
   {
    "title": "kumo cloud 2.22 Technician Manual for Installer",
    "seedFile": "toolbox-mitsubishi-kumo-cloud-technician.pdf"
   }
  ],
  "source": "kumo cloud 2.22 Technician Manual for Installer (Mitsubishi Electric US, Inc., 2023) - https://s3.amazonaws.com/enter.mehvac.com/DAMRoot/Original/10007/kumo_cloud_2.22_technician_manual_ver.13_FINAL-2-update.pdf (PDF downloaded for this entry); kumocloud.com"
 },
 {
  "id": "tb-mitsubishi-kumo-paa-setup",
  "brand": "Mitsubishi",
  "family": "Mitsubishi PAA ducted air handler / gas furnace systems on a Wireless Interface 2",
  "toolName": "kumo cloud - PAA unit settings",
  "equipment": "Air Handler",
  "title": "Configure a PAA ducted gas furnace or air handler in kumo cloud",
  "whenToUse": "Adding a PAA (ducted gas furnace or air handler) zone during kumo cloud commissioning, or revisiting balance point, humidifier, ERV, or furnace delay settings afterward.",
  "requirements": [
   "A Wireless Interface 2 (PAC-USWHS002-WF-2) - WI 1 will not do PAA settings",
   "For humidifier control: a Wireless Temperature/Humidity Sensor or an MHK2 controller",
   "The site already created in kumo cloud (see tb-mitsubishi-kumo-cloud)"
  ],
  "steps": [
   "After naming the PAA zone, set the Balance Point.",
   "Set High Speed Fan behavior - Y-on-with-G triggers for Fan mode, humidifier, and ERV.",
   "Open PAA Settings and enable or disable the Humidifier (requires a Wireless Temp/Humidity Sensor or MHK2).",
   "Set Humidifier Fan Control: Only When Actively Heating, or Any Time.",
   "Set the Balance Point in PAA Settings.",
   "Set Dual Speed Fan - single or dual fan speed. Single is recommended for Dry Mode Automation.",
   "Set ERV Control: On, Classic, Fan Interlock, Energy Savings, or Off.",
   "Set Furnace Delay - the first-stage furnace-on time delay."
  ],
  "caution": "Humidifier control simply is not available without a Wireless Temperature/Humidity Sensor or an MHK2 on the zone - confirm the accessory is on the truck before promising it. Choosing dual-speed fan will interfere with Dry Mode Automation.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Only reachable with a Wireless Interface 2 - a WI 1 site cannot be upgraded into these settings without swapping the interface."
  ],
  "links": [
   {
    "label": "kumo cloud (official site)",
    "url": "https://kumocloud.com"
   }
  ],
  "manuals": [
   {
    "title": "kumo cloud 2.22 Technician Manual for Installer",
    "seedFile": "toolbox-mitsubishi-kumo-cloud-technician.pdf"
   }
  ],
  "source": "kumo cloud 2.22 Technician Manual for Installer (2023), PAA settings section (PDF downloaded for this entry)"
 },
 {
  "id": "tb-bosch-connected-control-bcc100",
  "brand": "Bosch",
  "family": "Bosch 24V ducted/split systems using a BCC100 Wi-Fi thermostat",
  "toolName": "Bosch Connected Control app + BCC100 thermostat",
  "equipment": "Thermostat/Control",
  "title": "Pair a BCC100 thermostat to the Bosch Connected Control app and run initial setup",
  "whenToUse": "Servicing or reconfiguring an existing BCC100 install. The thermostat is not configured to the HVAC system at all until app setup is completed - a BCC100 that powers up and does nothing usually just never got through this. For a customer you are setting up today, put them on Bosch EasyAir, not Bosch Connected Control (see caution and tb-bosch-easyair).",
  "requirements": [
   "A smartphone with the Bosch Connected Control app and an account",
   "Home Wi-Fi with internet",
   "The thermostat's MAC ID and Temporary Verification Code, both found on the thermostat's Wi-Fi Settings screen under Registration (the MAC ID is also on the device label and packaging)"
  ],
  "steps": [
   "Power the thermostat on at the equipment switch or breaker. It shows a Bosch logo and loading bar, then a screen saying it is not yet configured to the home's HVAC system.",
   "Download the app: search \"Bosch Connected Control\" or \"BCC100\" in the App Store or Google Play, or scan the QR code on that screen.",
   "Open the app and click Register to create a new account.",
   "Read and accept the Terms and Conditions and Privacy policy, then press continue in the top right corner.",
   "Follow the on-screen instructions to create the account and press OK. A confirmation email from Bosch follows.",
   "Log in with the new user ID and password.",
   "Click the plus sign (+) in the top right corner to add a new device, then select BCC100.",
   "Return to the thermostat and click Ok to initiate the Initial Setup.",
   "Pair the device - recommended: scan the QR code found on the thermostat's Wi-Fi settings screen. Manual alternative: enter the MAC ID and the Temporary Verification Code from that same screen.",
   "Follow the prompts to name the thermostat and connect the phone to the device.",
   "Configure the system type: Fossil Fuel for a furnace (then choose Appliance or Thermostat fan control), Heat Pump (then configure the reversing valve for O or B), or Dual Fuel (then configure fossil-fuel fan control and heat-pump changeover settings). Advance with the Next arrow in the top right at each step."
  ],
  "caution": "Bosch is retiring this app. Per Bosch's Thermostats & Controls FAQ: \"we are discontinuing the Bosch Connected Control app in order to focus on expanding the product compatibility of the Bosch EasyAir app,\" and \"If you received an email advising you to download the EasyAir App, then you must download the app to continue using your mobile device with your Bosch Connected Control.\" That covers BOTH BCC100 and BCC110, so set a customer up on Bosch EasyAir (tb-bosch-easyair) and treat the steps below as the historical Connected Control procedure. If you skip the Initial Setup prompt on the thermostat, Bosch states you will have to repeat initial setup later before any thermostat settings can be changed. The BCC100 is also filed under Bosch's discontinued-product downloads and is superseded by the BCC110 - confirm which model is on the wall before quoting a replacement.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: Bosch Connected Control BCC110 on the hardware side, and by the Bosch EasyAir app on the software side. No app shutdown date is published - Bosch drives the migration by email plus a BCC100-to-EasyAir migration help guide linked from the Thermostats & Controls FAQ.",
   "Bosch's US residential HVAC site is bosch-homecomfort.com; the older bosch-climate.us and bosch-thermotechnology.us addresses redirect there.",
   "Bosch EasyControl, named in some tool lists, is a Worcester Bosch UK/EU gas-boiler control and is not part of the US HVAC lineup.",
   "The current BCC110 product page names Bosch EasyAir (not Bosch Connected Control) as the app for that thermostat; the older BCC100 product page still names Connected Control."
  ],
  "links": [
   {
    "label": "Bosch Connected Control BCC100 (product page)",
    "url": "https://www.bosch-homecomfort.com/us/en/ocs/residential/bosch-connected-control-bcc100-thermostat-1098980-p/"
   },
   {
    "label": "Bosch Connected Control BCC110 (current successor)",
    "url": "https://www.bosch-homecomfort.com/us/en/ocs/residential/bosch-connected-control-bcc110-thermostat-20554481-p/"
   },
   {
    "label": "Bosch Thermostats & Controls FAQ (Connected Control app discontinuation)",
    "url": "https://www.bosch-homecomfort.com/us/en/residential/service/technical-support/frequently-asked-questions/thermostats-controls-faq/"
   }
  ],
  "manuals": [
   {
    "title": "Bosch BCC100 Thermostat User Guide (76H993390F)",
    "seedFile": "toolbox-bosch-bcc100-user-guide.pdf"
   }
  ],
  "source": "Bosch BCC100 User Guide 76H993390F, sections Thermostat Installation, Initial Setup / User Account Setup, and Add Device - https://www.bosch-homecomfort.com/us/media/country_pool/documents/downloads-for-bosch-products/thermostats-controls-manuals/bcc100_user_guide_76h993390f.pdf (PDF downloaded and text extracted for this entry); bosch-homecomfort.com Thermostats & Controls FAQ (live, Aug 2026) for the Connected Control app discontinuation and EasyAir migration; bosch-homecomfort.com BCC100 and BCC110 product pages"
 },
 {
  "id": "tb-bosch-easyair",
  "brand": "Bosch",
  "family": "Bosch IDS Premium Connected inverter ducted split heat pump (BOVB20 outdoor unit + BVA20 air handler), and Bosch Connected Control BCC100/BCC110 thermostats being migrated off the Connected Control app",
  "toolName": "Bosch EasyAir app",
  "equipment": "Condenser/Heat Pump",
  "title": "Contractor and homeowner app for connected Bosch HVAC - and the replacement for the Bosch Connected Control thermostat app",
  "whenToUse": "On an IDS Premium Connected system - post-install remote monitoring, real-time fault alerts, pulling checkpoint values and calculated superheat/subcool, warranty registration, and homeowner energy tracking. Also the app to install for a BCC100/BCC110 thermostat customer now that Bosch is discontinuing Bosch Connected Control.",
  "requirements": [
   "A connected Bosch HVAC product: an IDS Premium Connected system (BOVB20 + BVA20) with its built-in wireless connectivity, or a Bosch Connected Control BCC100/BCC110 thermostat",
   "A Bosch EasyAir contractor company profile to manage technician access",
   "Homeowner must grant contractor access"
  ],
  "steps": [
   "Contractor side: create and manage a company profile in the app to control which technicians can reach which customer systems.",
   "Register the installed warranty through the app.",
   "Monitor connected units remotely - real-time error/warning alerts, fault codes, checkpoint values, and calculated superheat/subcool.",
   "Homeowner side: the homeowner downloads the same app to remotely manage and control the thermostat, track energy use, get notifications, and grant or revoke the contractor's remote access.",
   "BCC100/BCC110 migration: download Bosch EasyAir from the App Store or Google Play and follow Bosch's BCC100-to-EasyAir migration help guide, which is linked from the Thermostats & Controls FAQ."
  ],
  "caution": "EasyAir's scope is expanding: Bosch's Thermostats & Controls FAQ says it is discontinuing the Bosch Connected Control app \"in order to focus on expanding the product compatibility of the Bosch EasyAir app,\" and BCC100/BCC110 owners who get the migration email must move to EasyAir. Bosch does not publish a single model compatibility list for EasyAir, so confirm a specific unit is supported before promising it. No numbered setup procedure is published on the official pages - the flow above is a feature summary, not a manufacturer step list.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaces the Bosch Connected Control app for the BCC100/BCC110 thermostats (no sunset date published) and is also the app for the IDS Premium Connected outdoor unit and air handler - the older \"EasyAir is not a thermostat app\" distinction is stale.",
   "Bosch's US residential HVAC site is bosch-homecomfort.com; the older bosch-climate.us and bosch-thermotechnology.us addresses redirect there."
  ],
  "links": [
   {
    "label": "EasyAir App (official product page)",
    "url": "https://www.bosch-homecomfort.com/us/en/ocs/residential/easyair-app-20386966-p/"
   },
   {
    "label": "Bosch Thermostats & Controls FAQ (Connected Control app discontinuation)",
    "url": "https://www.bosch-homecomfort.com/us/en/residential/service/technical-support/frequently-asked-questions/thermostats-controls-faq/"
   },
   {
    "label": "IDS Premium Connected inverter ducted split heat pump",
    "url": "https://www.bosch-homecomfort.com/us/en/ocs/residential/ids-premium-connected-inverter-ducted-split-heat-pump-20150269-p/"
   }
  ],
  "manuals": [],
  "source": "bosch-homecomfort.com EasyAir App product page (contractor and homeowner feature lists); bosch-homecomfort.com Thermostats & Controls FAQ (live, Aug 2026) for the Connected Control discontinuation and the BCC100 migration help guide; bosch-homecomfort.com IDS Premium Connected product page. No dedicated step-by-step setup guide was located."
 },
 {
  "id": "tb-york-hx3-app",
  "brand": "York",
  "family": "Coleman / Luxaire / Champion - YORK Affinity Hx3 WiFi Touch Screen Thermostat, on communicating or conventional systems, including the Hx3 Communicating Zoning System",
  "toolName": "Hx Thermostat App",
  "equipment": "Thermostat/Control",
  "title": "Homeowner app for the Hx3 touchscreen thermostat, plus dealer remote access",
  "whenToUse": "After installing an Hx3 thermostat, to set the homeowner up with app control and, with their permission, enable dealer remote monitoring.",
  "requirements": [
   "Hx3 thermostat installed and on home Wi-Fi",
   "iOS or Android phone or tablet; Apple Watch supported; Alexa or Google Home optional for voice"
  ],
  "steps": [
   "Download the Hx Thermostat App from the App Store or Google Play.",
   "Create or sign into an account and pair it to the installed Hx3 thermostat - no official pairing walkthrough is published, so follow what the app shows.",
   "Use the app to adjust set points, cancel hold (schedule override), enable Max heat or Max cool, change fan and humidity settings, set up geo-fencing and Home/Away mode, select system modes, and build schedules.",
   "Enable push notifications for system faults and temperature/humidity alerts.",
   "On zoned systems, manage zones and Vacation mode from the app.",
   "For multi-location customers, monitor and control multiple locations from one account."
  ],
  "caution": "No numbered installer pairing procedure is published by the manufacturer - the feature list above comes from the official app-store listing, so treat wording as approximate. Dealer/contractor remote access is not documented in any current official source for this app; verify in the app before promising it to a homeowner. York is now under Bosch Home Comfort Group: york.com redirects to york.bosch-hcgroup.com and the old Hx3 product page no longer serves at its original URL. Expect legacy York/Coleman/Luxaire/Champion links to keep moving.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "The same thermostat and app are sold under Coleman, Luxaire, and Champion badges.",
   "York brand ownership moved to Bosch Home Comfort Group; the Hx Thermostat App Store listing (id1105092523) now shows Bosch Thermotechnik GmbH as the developer, and Hx is noted there as a Johnson Controls trademark."
  ],
  "links": [
   {
    "label": "Hx Thermostat - App Store",
    "url": "https://apps.apple.com/us/app/hx-thermostat/id1105092523"
   },
   {
    "label": "YORK - current residential/commercial site",
    "url": "https://york.bosch-hcgroup.com/"
   }
  ],
  "manuals": [],
  "source": "Archived york.com YORK Hx3 WiFi Touch Screen Thermostat product page (web.archive.org snapshot, read in full); Hx Thermostat App Store listing id1105092523"
 },
 {
  "id": "tb-jci-gotemp-pro",
  "brand": "York",
  "family": "Coleman / Luxaire / Champion / Evcon / Fraser-Johnston / Guardian / TempMaster / Bosch / Kenmore - Johnson Controls ducted systems",
  "toolName": "GoTemp Pro (formerly Ducted Systems Solutions / DS Solutions)",
  "equipment": "Other",
  "title": "Dealer field-reference app for equipment lookup, literature, warranty, and tech calculators",
  "whenToUse": "In the field needing nomenclature, fault codes, a parts list, an install manual or wiring diagram, or a performance report for a JCI-family ducted unit; registering or claiming warranty; or running quick calculators.",
  "requirements": [
   "iOS 15.6 or later, or Android",
   "Guest login gives limited access; full dealer features need Solution Navigator credentials, requestable in-app or via support@solutionnavigator.com"
  ],
  "steps": [
   "Download GoTemp Pro from the App Store or Google Play - it auto-updated from the earlier DS Solutions / Ducted Systems Solutions app.",
   "Open it and either continue as Guest for limited access, or log in with Solution Navigator credentials for full dealer features.",
   "Look up equipment by scanning the QR code on the unit's rating plate, or entering model/serial manually.",
   "Use the Equipment Tool for nomenclature, fault codes, parts list, and controls information.",
   "Open Literature for the technical guide, installation manual, wiring diagrams, and performance reports.",
   "Use Warranty features to register a product, file a claim, or purchase extended warranty.",
   "On commercial equipment, use the app's Bluetooth connectivity to connect directly to supported units.",
   "Use the Tech Calculators - refrigerant detection system requirements, refrigerant piping configurator, superheat/subcool, temperature-vs-resistance, quick conversions."
  ],
  "caution": "Guest mode is limited; full dealer features require a Solution Navigator account. Completing certain steps in the app is reported to unlock additional labor warranty coverage, so treat it as part of standard install documentation rather than optional.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Rename history: Ducted Systems Solutions (DS Solutions) -> GoTemp Pro. The Google Play package id (com.jci.btns.navigator.prod.internal) is unchanged across the rename, confirming it is the same app relabeled."
  ],
  "links": [
   {
    "label": "GoTemp Pro Mobile App (Johnson Controls)",
    "url": "https://www.johnsoncontrols.com/gotemp-pro-app"
   },
   {
    "label": "GoTemp Pro - App Store",
    "url": "https://apps.apple.com/us/app/gotemp-pro/id1495956404"
   },
   {
    "label": "GoTemp Pro - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.jci.btns.navigator.prod.internal"
   }
  ],
  "manuals": [],
  "source": "johnsoncontrols.com/gotemp-pro-app (read in full); App Store and Google Play listings"
 },
 {
  "id": "tb-york-upgnet",
  "brand": "York",
  "family": "York / Johnson Controls Unitary Products dealer and distributor ordering and support system",
  "toolName": "York UPGNET (UPGnet Mobile)",
  "equipment": "Other",
  "title": "Dealer/distributor mobile companion to the UPGNET portal",
  "whenToUse": "Ordering and account work against UPGNET, if Brackett holds an account. Not an equipment setup or commissioning tool.",
  "requirements": [
   "An active UPGNET account, obtained through the UPGNET help desk (1-800-201-YORK per York's own material)"
  ],
  "steps": [],
  "caution": "Everything past the sign-in screen is behind a dealer/distributor login and is not reproduced here.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced in practice by GoTemp Pro (tb-jci-gotemp-pro) for field equipment lookup and warranty work; UPGNET remains the ordering/account system.",
   "The app supports scanning a unit's QR code to reduce manual data entry into UPGNET.",
   "The York UPGNET App Store listing (id700873092) now returns 404 - the app is no longer listed in the US App Store. The entry is kept because legacy installs and dealer accounts still reference UPGNET."
  ],
  "links": [],
  "manuals": [],
  "source": "Official Coleman/York UPGnet Mobile technical bulletin (existence and dealer-account requirement only - no public procedure). The former App Store listing id700873092 was re-checked Aug 2026 and returns HTTP 404."
 },
 {
  "id": "tb-resideo-pro-app",
  "brand": "Honeywell/Resideo",
  "family": "T-Series (T5, T6 Pro, T9, T10 Pro, T10+ Pro), L-Series water products, VX1 doorbell, Pro Series panels",
  "toolName": "Resideo Pro App",
  "equipment": "Thermostat/Control",
  "title": "Configure and register a T-series thermostat from the installer app and hand off to the homeowner",
  "whenToUse": "Any new install or replacement of a T5/T6 Pro/T9/T10/T10+ Pro where you want app-guided setup instead of on-device menus, and want the customer registration email to go out automatically.",
  "requirements": [
   "A Resideo Pro company account, created by a company admin at pro.resideo.com",
   "The technician must be invited by the company admin and have linked their account before using the app",
   "iOS 15.0 or later (iPhone/iPad), macOS 12.0 or later per the App Store listing; Android also published",
   "Bluetooth, Wi-Fi, or QR code connection to the device"
  ],
  "steps": [
   "Power up the thermostat and follow the on-screen prompts until it asks whether to do setup on the device or using the app - choose \"Using the app\".",
   "Open the app (Resideo's manuals and the on-screen prompt call it the Resideo Technician app; the App Store and resideo.com list it as Resideo Pro). If you do not have it, download it and create your account.",
   "Select Customers. Choose an existing customer from the list, or select \"Add customer\" and enter their information.",
   "Optional - connect to the thermostat over Bluetooth at the setup prompt, select Templates in the dashboard, pick the template to apply, review the summary screen, and touch Apply. The app then shows \"Success, the thermostat is now configured\" - select OK.",
   "Modify individual ISU settings after applying a template if needed by touching Configuration in the app.",
   "Once the customer information is entered, the app emails the customer inviting them to download the homeowner app, or to connect the thermostat to Wi-Fi if they already have the app and the installer did not do it."
  ],
  "caution": "Only Pro Portal account owners/admins can create configuration Templates, though any invited technician can apply them; a company can save up to 50 templates. A tech who was never invited to the company account cannot use the app at all.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "This is the professional/installer app, distinct from the homeowner-facing First Alert App / Resideo App / Honeywell Home app lineage.",
   "No separate app named \"HVAC Pro\" or \"Contractor Pro\" could be confirmed as a current, distinct Resideo product - assume any such reference means this app.",
   "Naming: Resideo's ElitePRO and FocusPRO installation manuals and the thermostat's own setup prompt say \"Resideo Technician app\"; the App Store listing (id1470259201) and resideo.com/pro/proapp say \"Resideo Pro\". Same app - expect both names in the field."
  ],
  "links": [
   {
    "label": "Resideo Pro app product page",
    "url": "https://www.resideo.com/us/en/pro/proapp/"
   },
   {
    "label": "Resideo Pro Portal",
    "url": "https://pro.resideo.com/"
   },
   {
    "label": "Resideo Technician app (ElitePRO installation manual)",
    "url": "https://docs.honeywellhome.com/elitepro-im/Resideo-Technician-app.htm"
   }
  ],
  "manuals": [],
  "source": "docs.honeywellhome.com/elitepro-im/Resideo-Technician-app.htm (live page, full procedure read - the older /elitepro-im/Resideo Pro App.htm path now serves a 404); resideo.com/us/en/pro/proapp/; Apple App Store listing id1470259201"
 },
 {
  "id": "tb-resideo-first-alert-app",
  "brand": "Honeywell/Resideo",
  "family": "T5/T5+/T6 Pro, T9, T10/T10+ Pro thermostats, L-series leak devices, VX cameras and doorbells",
  "toolName": "First Alert App (was Resideo App, was Honeywell Home App, was Total Connect 2.0)",
  "equipment": "Thermostat/Control",
  "title": "Homeowner Wi-Fi onboarding and day-to-day control of a T-series thermostat",
  "whenToUse": "The final Wi-Fi connection and registration step after a T-series thermostat is wired and powered, or when a homeowner needs to reconnect one to Wi-Fi or to their account.",
  "requirements": [
   "New users without an existing Resideo account go straight to the First Alert App",
   "Existing Resideo App / Total Connect 2.0 / Honeywell Home App users stay on their current app until Resideo migrates their account",
   "Home Wi-Fi network"
  ],
  "steps": [
   "Open the app and tap the \"+\" icon or \"Add new Device\".",
   "Follow the product-specific on-screen steps - Resideo publishes per-model Wi-Fi connect videos (T10+, T9, and a combined T5/T6 Pro Smart video).",
   "The device registers to the account automatically once the add-new-device flow finishes."
  ],
  "caution": "Resideo is actively migrating users from the Resideo App / Honeywell Home App / Total Connect 2.0 to the First Alert App. Resideo's live support page says existing users can still control their devices via their current mobile app until they are migrated. No firm cutover date is published - ask the customer which icon they have before walking them through anything.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Rename history for this homeowner-app family: Lyric app -> Honeywell Home / Resideo App -> First Alert App.",
   "Total Connect Comfort (mytotalconnectcomfort.com) is a SEPARATE older platform for RedLINK-gateway thermostats, not just an older name for this app - see tb-resideo-total-connect-comfort."
  ],
  "links": [
   {
    "label": "Resideo app help and support (live app-status list)",
    "url": "https://www.resideo.com/us/en/support/apps/"
   },
   {
    "label": "How to register your Resideo product",
    "url": "https://www.honeywellhome.com/blogs/support/how-do-i-register-my-resideo-product"
   }
  ],
  "manuals": [],
  "source": "resideo.com/us/en/support/apps/ (live page, browser-verified); honeywellhome.com registration article"
 },
 {
  "id": "tb-resideo-total-connect-comfort",
  "brand": "Honeywell/Resideo",
  "family": "RedLINK internet-gateway thermostats: FocusPRO, VisionPRO, Prestige, WiFi Smart / WiFi 9000 Color Touchscreen, RTH8500WF",
  "toolName": "My Total Connect Comfort (mytotalconnectcomfort.com) / Total Connect Comfort app",
  "equipment": "Thermostat/Control",
  "title": "Legacy portal and app for RedLINK-gateway thermostats",
  "whenToUse": "Servicing an older RedLINK internet gateway install - FocusPRO, VisionPRO, Prestige, WiFi 9000 - that was never replaced with a T-series thermostat.",
  "requirements": [
   "A RedLINK thermostat plus a RedLINK Internet Gateway, or a native Wi-Fi thermostat with a C-wire",
   "An account at mytotalconnectcomfort.com, registered with the device MAC ID / CRC from the gateway or thermostat label",
   "A home router with a free Ethernet port for the gateway",
   "Supported browsers per the Resideo FAQ: Edge, Firefox 4+, Safari 5+, Chrome 9+ and later"
  ],
  "steps": [
   "Connect the RedLINK Internet Gateway: power cable to the gateway, power adapter to a wall socket, Ethernet cable from the gateway to an internet-connected home router.",
   "Enter WIRELESS SETUP MODE on the thermostat (per that thermostat's own instructions), then press and release the CONNECT button on the side of the RedLINK internet gateway.",
   "Go to mytotalconnectcomfort.com, create an account, validate it, then log in and register the gateway by entering the MAC ID and MAC CRC found on the bottom of the device.",
   "To reach Installer Options on a VisionPRO 8000-class thermostat the password is the thermostat's date code - it is on the back of the thermostat, or touch Menu, select Dealer Information, and scroll down to Date Code.",
   "One gateway supports up to 4 RedLINK thermostats or zone panels at the same address."
  ],
  "caution": "No shutdown or retirement date for Total Connect Comfort was found on Resideo's official pages, and its app tile still showed \"Online\" on Resideo's live status page during this research - treat it as still running for legacy installs, not as a confirmed sunset. Classified legacy here because it is a superseded platform, not because Resideo announced an end date.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Replaced in the product line by the T-series thermostats on the First Alert App (tb-resideo-first-alert-app), but not formally retired.",
   "Distinct platform from the Lyric / Honeywell Home / Resideo App / First Alert App lineage."
  ],
  "links": [
   {
    "label": "My Total Connect Comfort FAQs",
    "url": "https://mytotalconnectcomfort.com/portal/Home/FAQs"
   },
   {
    "label": "Total Connect Comfort App product page",
    "url": "https://www.resideo.com/us/en/total-connect-comfort-app/"
   },
   {
    "label": "THM6000R7001 RedLINK Internet Gateway installation instructions (33-00250EFS)",
    "url": "https://customer.resideo.com/resources/Techlit/TechLitDocuments/33-00000s/33-00250EFS.pdf"
   },
   {
    "label": "VisionPRO 8000 Smart Installation Guide (33-00065) - date-code password",
    "url": "https://digitalassets.resideo.com/damroot/Original/10015/33-00065.pdf"
   }
  ],
  "manuals": [],
  "source": "Resideo 33-00250EFS THM6000R7001 RedLINK Internet Gateway installation instructions (PDF, customer.resideo.com) for the gateway wiring and CONNECT-button pairing; Resideo 33-00065 VisionPRO 8000 Smart Installation Guide (PDF, digitalassets.resideo.com) for the date-code installer password; mytotalconnectcomfort.com/portal/Home/FAQs (live) for gateway capacity, browser support, and registration troubleshooting"
 },
 {
  "id": "tb-resideo-redlink3",
  "brand": "Honeywell/Resideo",
  "family": "T10/T10+ Pro Smart with RedLINK 3.0, ElitePRO S1000/S1100/S1200 Series",
  "toolName": "RedLINK 3.0 wireless accessories (and the WiFi + RedLINK 3.0 START HERE selection guide)",
  "equipment": "Thermostat/Control",
  "title": "Picking and pairing RedLINK 3.0 sensors without mixing generations",
  "whenToUse": "Specifying or installing wireless indoor/outdoor temperature, humidity, or PIR motion sensors on a T10-series or ElitePRO thermostat, or working out which thermostat and accessory kit a job actually needs.",
  "requirements": [
   "A RedLINK 3.0-compatible thermostat: T10+ Pro (THX321WFS3001W with sensor, THX321WF3003W without) or ElitePRO S1000/S1100/S1200",
   "RedLINK 3.0 sensor hardware - current models C7189R3002-2 (2-pack wireless indoor sensor) and C7189R3010-2",
   "A customer-supplied router - RedLINK 3.0 thermostats need one for app control, though the accessories themselves work without internet",
   "For T10+ only: wireless outdoor sensor C7089R3013 and Equipment Interface Module THM04R3000"
  ],
  "steps": [],
  "caution": "RedLINK 2.0 wireless sensors (for example C7189R1004) are NOT compatible with ElitePRO Series thermostats, and ElitePRO thermostats are not compatible with RedLINK 2.0 outdoor sensors. Do not mix generations on one system.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Resideo's official 03-00658 \"WiFi and RedLINK 3.0 START HERE\" literature was downloaded and read for this entry - it is a selection and compatibility chart, not a pairing procedure, so no numbered steps are published here. The pairing itself is done from the thermostat's installer menus.",
   "RedLINK 3.0 supports up to 20 wireless indoor sensors per thermostat (temperature, humidity, and PIR motion) per the ElitePRO installation manual. No wireless range figure is published in that manual, in the 03-00658 guide, or on resideo.com/us/en/pro/redlink/ - verify in the app / manual before quoting one.",
   "T10+ IAQ kits from the same guide: YTHM1004R3000 (EIM, wireless indoor sensor, 2 duct sensors) and YTHM1004R3001 (adds a wireless outdoor sensor), both rated 4H/2C heat pump, 3H/2C conventional, dual fuel.",
   "Predecessor generations covered by the same guide: RedLINK 1.0 and 2.0 with Prestige IAQ kits (YTHX9421R5085WW / R5127WW / R5101WW / R7001WW) and RedLINK VisionPRO 8000 (TH8321R1001, TH8320R1003, TH8110R1008), which need a THM6000R7001 gateway plus a customer router for app control.",
   "Missing common wire on a 1H/1C job: use the THP9045A2098 (or THP9045A1023) C-wire adapter with any Honeywell Home Wi-Fi thermostat."
  ],
  "links": [
   {
    "label": "RedLINK accessories (ElitePRO install manual)",
    "url": "https://docs.honeywellhome.com/elitepro-im/Redlink.htm"
   }
  ],
  "manuals": [
   {
    "title": "WiFi and RedLINK 3.0 START HERE - connected thermostat and accessory selection guide (03-00658)",
    "seedFile": "toolbox-resideo-wifi-redlink3-start-here.pdf"
   }
  ],
  "source": "Resideo 03-00658 \"WiFi and RedLINK 3.0 START HERE\" (2/24) - https://customer.resideo.com/resources/Techlit/TechLitDocuments/03-00000s/03-00658.pdf (PDF downloaded and text extracted for this entry; the previous gather could not read it); docs.honeywellhome.com/elitepro-im/Redlink.htm"
 },
 {
  "id": "tb-honeywell-installer-setup-isu",
  "brand": "Honeywell/Resideo",
  "family": "FocusPRO P200/S200, T5/T5+, T6 Pro, and Honeywell Home programmable/smart thermostats generally",
  "toolName": "Installer Setup Menu (ISU)",
  "equipment": "Thermostat/Control",
  "title": "Get into the installer setup menu (ISU) - the entry combo differs by model family",
  "whenToUse": "Any time you need the installer configuration menu during install or service, or want to choose app-based setup on an S200-class thermostat.",
  "requirements": [],
  "steps": [
   "FocusPRO P200 / S200: press and hold the bottom left button and the Up arrow button for 5 seconds to access INSTALLER MENU (FocusPRO P200/S200 installation manual, Configuration and Settings).",
   "T5 / T5+: press and hold MENU and + for approximately 5 seconds to enter the advanced menu, then press SELECT to enter the system setup (ISU) menu (honeywellhome.com \"How to Enter Setup Menu for T5 Thermostat\").",
   "T6 Pro: press Menu and + for 3 seconds to enter the installer setup menu, then press Select with ISU displayed (T6 Pro installation instructions, docs.honeywellhome.com).",
   "Other Honeywell Home programmable/smart models: press and hold the Menu key for five seconds until ISU appears, then press Select (honeywellhome.com's general installer-setup article, which does not name the models it covers - confirm against the thermostat's own manual).",
   "On S200 Smart-class thermostats, after first power-up the display asks whether to perform setup on the device or by using the app. The FocusPRO P200/S200 manual calls the app at that prompt the \"Resideo Technician app\" - the same app the App Store and resideo.com list as \"Resideo Pro\" (tb-resideo-pro-app).",
   "To revisit configuration later on a T5/T5+/T6 Pro WiFi, touch and hold MENU and touch SELECT when DEVICE SETUP is displayed."
  ],
  "caution": "There is no universal ISU button combo - it differs by model family, so use the one for the thermostat in front of you rather than the first one you remember. The generic \"hold Menu for five seconds\" article does not state which models it applies to, and it is NOT the FocusPRO P200/S200 procedure.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "A menu path rather than a standalone mobile tool, included because techs use it constantly alongside the Resideo Pro / Resideo Technician app.",
   "T10 / T10+ Pro ISU entry is not covered here: the docs.honeywellhome.com T10 Installer Setup pages would not render for extraction - verify in the app / manual. See the gaps list in NOTES.md."
  ],
  "links": [
   {
    "label": "FocusPRO P200/S200 configuration and settings",
    "url": "https://docs.honeywellhome.com/focuspro-p200-s200-im/en-us/Content/Installation-Manual/Configuration%20and%20Settings.htm"
   },
   {
    "label": "T6 Pro Installer Setup (ISU)",
    "url": "https://docs.honeywellhome.com/t6-pro-ii/en-us/Content/Installation-Instructions/5.%20Installer%20Setup%20(ISU).htm"
   },
   {
    "label": "How to enter the setup menu (T5)",
    "url": "https://www.honeywellhome.com/blogs/support/how-do-i-enter-the-setup-menu"
   },
   {
    "label": "How to access Honeywell thermostat installer setup (general)",
    "url": "https://www.honeywellhome.com/blogs/support/how-do-i-enter-the-installer-setup-menu"
   }
  ],
  "manuals": [],
  "source": "docs.honeywellhome.com FocusPRO P200/S200 Configuration and Settings; docs.honeywellhome.com T6 Pro II Installer Setup (ISU); honeywellhome.com \"How to Enter Setup Menu for T5 Thermostat\"; honeywellhome.com general installer-setup article (all live pages, read Aug 2026)"
 },
 {
  "id": "tb-ecobee-pro-pin",
  "brand": "ecobee",
  "family": "ecobee Smart Thermostat Premium / Enhanced / Lite / Essential, ecobee3 and ecobee3 lite",
  "toolName": "ecobee Pro PIN (contractor registration through the ecobee app)",
  "equipment": "Thermostat/Control",
  "title": "Link an installed ecobee to the installing company so your name is on the thermostat",
  "whenToUse": "Every ecobee install where Brackett wants to be the contractor of record for follow-up service contact and business alerts.",
  "requirements": [
   "An ecobee Pro PIN, obtained by contacting insidesales@ecobee.com - per ecobee.com/contractors this replaced the older Contractor Portal",
   "The ecobee app on the installing tech's phone"
  ],
  "steps": [
   "Contact insidesales@ecobee.com to get your company's ecobee Pro PIN.",
   "During thermostat setup, enter the Pro PIN when prompted.",
   "The thermostat registers to the contractor's business automatically - your contact info then shows on the thermostat itself and in the homeowner's ecobee app."
  ],
  "caution": "",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced ecobee's older web Contractor Portal login model - ecobee's own wording: \"Connect instantly. No wait time, no log in, no portal.\"",
   "ecobee Pro Tech Support: 1-866-518-6740, Mon-Fri 8am-10pm ET, Sat-Sun 9am-9pm ET.",
   "ecobee hardware badged for Carrier (\"ecobee for Carrier\") and for Generac uses this same app - see tb-carrier-cor-app and tb-generac-ecobee-load-management."
  ],
  "links": [
   {
    "label": "ecobee Contractor program",
    "url": "https://www.ecobee.com/en-us/contractors/"
   }
  ],
  "manuals": [],
  "source": "ecobee.com/en-us/contractors/ (live page)"
 },
 {
  "id": "tb-ecobee-app-registration",
  "brand": "ecobee",
  "family": "All current ecobee thermostats",
  "toolName": "ecobee app - device registration",
  "equipment": "Thermostat/Control",
  "title": "Register a new ecobee thermostat to the homeowner's account",
  "whenToUse": "Registering a new ecobee to a homeowner (the non Pro-PIN path), or walking a homeowner through it.",
  "requirements": [
   "An active internet connection",
   "The ecobee app on a smartphone",
   "An ecobee account"
  ],
  "steps": [
   "Download the ecobee app.",
   "Tap Create Account, fill in the form, and accept the Terms and Conditions.",
   "Once the account is created, follow the prompts to create an ecobee home.",
   "Get the registration code at the thermostat: Smart Thermostat Premium / Enhanced - Main Menu > General > Link to Mobile App. Smart Thermostat Lite / Essential - Main Menu > Link to Mobile App. ecobee3, ecobee3 lite, ecobee4, and SmartThermostat with voice control - Main Menu > General > Registration. Scan the QR code shown, or note the 4-character code.",
   "In the app tap the Plus in the top right > Add a device > Thermostat > select the thermostat model > Yes, It is Installed > enter the registration code > Next, and follow the prompts.",
   "A confirmation message appears on the thermostat screen once the app side is done - accept it to finalize registration."
  ],
  "caution": "The registration code expires after a short period - request a new one if it does. If the thermostat has no Registration or Link to Mobile App option, it is already registered to another user and has to be unregistered first.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Extra app users are added by inviting them as members of the ecobee home, not by registering the thermostat again."
  ],
  "links": [
   {
    "label": "How to register and unregister your ecobee devices",
    "url": "https://ecobee.my.site.com/s/articles/How-to-register-your-ecobee-devices?language=en_US"
   },
   {
    "label": "How to use the ecobee app",
    "url": "https://support.ecobee.com/s/articles/How-to-use-the-ecobee-app"
   }
  ],
  "manuals": [],
  "source": "ecobee.my.site.com \"How to register and unregister your ecobee devices\" (live page, thermostat section expanded and read); support.ecobee.com \"How to use the ecobee app\" (live page)"
 },
 {
  "id": "tb-ecobee-pro-first-run",
  "brand": "ecobee",
  "family": "Current ecobee Smart Thermostat line",
  "toolName": "ecobee Pro First-Run Setup",
  "equipment": "Thermostat/Control",
  "title": "Installer-facing first-run flow for wire and equipment configuration",
  "whenToUse": "First power-up of an ecobee where the installer needs HVAC accessory, wire configuration, and system-compatibility options beyond the homeowner default flow.",
  "requirements": [
   "The ecobee app"
  ],
  "steps": [],
  "caution": "ecobee describes the feature on its contractor page (\"configure and calibrate the thermostat as the job requires\") but publishes no numbered procedure - nothing is invented here.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Described on the same contractor page as the Pro PIN; seasoned installers opt into this instead of the standard homeowner first-run wizard."
  ],
  "links": [
   {
    "label": "ecobee Contractor program",
    "url": "https://www.ecobee.com/en-us/contractors/"
   }
  ],
  "manuals": [],
  "source": "ecobee.com/en-us/contractors/ (live page)"
 },
 {
  "id": "tb-ecobee-smartbuildings",
  "brand": "ecobee",
  "family": "Multi-site commercial and light-commercial ecobee deployments",
  "toolName": "ecobee SmartBuildings",
  "equipment": "Thermostat/Control",
  "title": "Portal and app for managing many ecobee thermostats across sites",
  "whenToUse": "A commercial customer with ecobee thermostats across multiple buildings, rather than a single-home install.",
  "requirements": [
   "Existing ecobee SmartBuildings account credentials",
   "iOS 13.4 or later for the iOS app"
  ],
  "steps": [],
  "caution": "No public step-by-step is published - the procedure lives behind the SmartBuildings account.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "SmartBuildings phone support: 1-833-285-1119.",
   "Large-scale commercial installs require an ecobee SmartBuildings certification/contractor relationship per ecobee's contractor materials."
  ],
  "links": [
   {
    "label": "ecobee SmartBuildings",
    "url": "https://sb.ecobee.com/"
   },
   {
    "label": "ecobee SmartBuildings - Google Play",
    "url": "https://play.google.com/store/apps/details?id=com.ecobee.sb"
   }
  ],
  "manuals": [],
  "source": "Apple App Store listing id1437536049; sb.ecobee.com"
 },
 {
  "id": "tb-nest-google-home-install",
  "brand": "Google Nest",
  "family": "Nest Thermostat, Nest Learning Thermostat (4th gen), Nest Thermostat E and earlier",
  "toolName": "Google Home app - Nest thermostat install",
  "equipment": "Thermostat/Control",
  "title": "App-guided Nest thermostat installation and wiring",
  "whenToUse": "Every new Nest thermostat install - the current models can only be set up in the Google Home app, and the app generates the wiring diagram for the specific system.",
  "requirements": [
   "A compatible system - Google states high-voltage (120V/240V) and stranded-wire systems are not compatible, so check before installing",
   "A Google/Nest account signed into the app",
   "Home Wi-Fi network"
  ],
  "steps": [
   "Download the latest Google Home app from the App Store or Google Play, create an account if needed, then go to Settings > Add product.",
   "Scan the QR code on the back of the display, or choose \"continue without scanning\" and select the thermostat model; answer the wiring-setup questions.",
   "Turn off all HVAC system breakers before touching wiring. Verify power is off by adjusting the temperature 5 or more degrees and waiting 5 minutes to confirm nothing activates.",
   "Photograph the existing wiring and connections before removing anything.",
   "Let the app generate a custom wiring diagram for the system after the base is mounted.",
   "Label the wires, disconnect the old thermostat, mount the Nest base level, connect the labeled wires to the connectors, and attach the display.",
   "After the thermostat finishes starting up, it guides you through on-device setup including Wi-Fi connection and system configuration."
  ],
  "caution": "Google Nest Thermostat and Nest Learning Thermostat (4th gen) can ONLY be set up in the Google Home app - the older standalone Nest app does not work for these models.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Older Nest thermostats (3rd gen or earlier, Nest Thermostat E) may still reference the legacy Nest app in some Google support articles, but current products push installers to the Google Home app."
  ],
  "links": [
   {
    "label": "Install your Nest thermostat",
    "url": "https://support.google.com/googlehome/answer/9274936?hl=en"
   },
   {
    "label": "Get started with Nest Thermostat and Nest Learning Thermostat (4th gen)",
    "url": "https://support.google.com/googlehome/answer/10125150?hl=en"
   }
  ],
  "manuals": [],
  "source": "support.google.com/googlehome/answer/9274936 (full procedure read)"
 },
 {
  "id": "tb-nest-pro-program",
  "brand": "Google Nest",
  "family": "All current Nest product lines sold through the Nest Pro channel",
  "toolName": "Nest Pro program / Nest Pro resource hub (pro.nest.com)",
  "equipment": "Thermostat/Control",
  "title": "Google's professional installer program and installer-only documentation",
  "whenToUse": "Joining Google's professional installer network, or pulling installer-only documentation - installation guides, fillable configuration PDFs, spec sheets, rep contacts - for a Nest job.",
  "requirements": [
   "A Nest Pro account, managed at pro.nest.com",
   "Google sign-in for the resource hub"
  ],
  "steps": [],
  "caution": "Nest Pros are independent contractors, not Google employees. Google separately partners with SafeStreets for consumer-booked \"Pro installation\" in the US - a different channel from the Nest Pro contractor program, and a common source of customer confusion.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Resource hub content is explicitly gated to professionals: \"These resources are meant to be used by professionals and not intended to be used by consumers.\""
  ],
  "links": [
   {
    "label": "Nest Pro resource hub",
    "url": "https://support.google.com/nestpro/answer/15335542?hl=en"
   },
   {
    "label": "pro.nest.com (Nest Pro sign-in)",
    "url": "https://pro.nest.com"
   },
   {
    "label": "Learn about Nest Pro installation services",
    "url": "https://support.google.com/googlenest/answer/9232427?hl=en"
   }
  ],
  "manuals": [],
  "source": "support.google.com/nestpro/answer/15335542 (live page)"
 },
 {
  "id": "tb-nest-app-legacy-migration",
  "brand": "Google Nest",
  "family": "Nest cameras and older Nest thermostats still tied to a legacy Nest Account",
  "toolName": "Legacy Nest app to Google Home app account migration",
  "equipment": "Thermostat/Control",
  "title": "Why a customer's device moved into Google Home, and whether they have to migrate",
  "whenToUse": "Explaining to a customer why their device now appears in Google Home, or why they are being prompted to migrate a Nest Account to a Google Account.",
  "requirements": [],
  "steps": [],
  "caution": "Per Google's own \"What's happening at Nest\" page, the Nest app will continue to be available and migrating to a Google Account is OPTIONAL for existing users - though new features only ship on Google Accounts and the Google Home app. No confirmed shutdown date for the legacy Nest app was found on an official page; press coverage describing an imminent shutdown is not a Google statement and was not used here.",
  "confidence": "verify",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Replaced by: the Google Home app (tb-nest-google-home-install). Google no longer sells any current Nest thermostat that requires the legacy Nest app."
  ],
  "links": [
   {
    "label": "What's happening at Nest",
    "url": "https://nest.com/whats-happening/"
   },
   {
    "label": "FAQs about accounts for the Nest app",
    "url": "https://support.google.com/googlehome/answer/9297676?hl=en"
   }
  ],
  "manuals": [],
  "source": "nest.com/whats-happening/"
 },
 {
  "id": "tb-sensi-contractor-mode",
  "brand": "White-Rodgers",
  "family": "Copeland Sensi - Sensi Touch 2, Sensi Smart, Sensi Lite and other Sensi thermostats",
  "toolName": "Sensi app - Contractor Mode",
  "equipment": "Thermostat/Control",
  "title": "Register a Sensi thermostat to your business without connecting it to Wi-Fi",
  "whenToUse": "During install, before or without Wi-Fi, to link the thermostat to Brackett so the homeowner sees your name, logo, and contact in their app and on the thermostat screen.",
  "requirements": [
   "An active Sensi app account (your personal account)",
   "A phone number registered in the Sensi Partner Program at sensiregistration.com - allow 24-48 hours for the confirmation email and locator listing",
   "Camera access enabled on the phone, to scan the thermostat QR code"
  ],
  "steps": [
   "Launch the Sensi app and sign into your personal account.",
   "Tap and hold the Sensi logo to bring up a popup menu.",
   "Select \"Become a Sensi Partner\" if you are not registered yet, or proceed with OK.",
   "Select Contractor Mode from the menu.",
   "Enter the phone number you registered during Sensi Partner Program enrollment.",
   "In Contractor Mode, tap \"Register Thermostat\".",
   "Grant camera permissions when prompted.",
   "Locate the QR code, model number, and MAC ID on the thermostat faceplate.",
   "Scan the QR code with the app camera - this links your phone number to that unit."
  ],
  "caution": "Partner Program enrollment takes 24-48 hours to confirm, so register before you need it on a job, not the morning of.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Sensi Partner registration also earns Contractor Rewards points - the Sensi Partner Program page states \"As a Sensi partner, now you can get 200 points through Contractor Rewards every time you link a Sensi thermostat.\" The Contractor Mode support page itself does not mention rewards.",
   "Sensi is filed under White-Rodgers in this app; the brand is now Copeland (formerly Emerson).",
   "\"Sensi Predict\" appears in some tool lists but no official Copeland/Sensi page describing a product by that name could be found - see the gaps list in NOTES.md."
  ],
  "links": [
   {
    "label": "Contractor Mode - Sensi support",
    "url": "https://sensi.copeland.com/en-us/support/contractor-mode"
   },
   {
    "label": "Sensi Partner Program",
    "url": "https://sensi.copeland.com/en-us/for-professionals/sensi-partner-program"
   }
  ],
  "manuals": [],
  "source": "sensi.copeland.com/en-us/support/contractor-mode (live page, full procedure read); sensi.copeland.com/en-us/for-professionals/sensi-partner-program (live page, Contractor Rewards points)"
 },
 {
  "id": "tb-sensi-multiple-thermostat-manager",
  "brand": "White-Rodgers",
  "family": "Copeland Sensi - multi-unit and light-commercial deployments",
  "toolName": "Sensi Multiple Thermostat Manager (MTM / MTM Pro)",
  "equipment": "Thermostat/Control",
  "title": "Web portal for monitoring and batch-controlling many Sensi thermostats",
  "whenToUse": "A commercial or multi-unit customer with Sensi thermostats - locking buttons, batch scheduling, alerts, and grouping across a building or portfolio.",
  "requirements": [
   "Compatible Sensi smart thermostats installed at each unit"
  ],
  "steps": [],
  "caution": "No public step-by-step is published for the portal itself.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Drag-and-drop remote portal: lock or unlock individual thermostat buttons, set allowed temperature ranges, batch-schedule, and get extreme temperature/humidity alerts per building."
  ],
  "links": [
   {
    "label": "Sensi Manager for multiple thermostat control",
    "url": "https://sensi.copeland.com/en-us/products/multiple-thermostat-manager"
   }
  ],
  "manuals": [],
  "source": "sensi.copeland.com/en-us/products/multiple-thermostat-manager"
 },
 {
  "id": "tb-nortek-iq-drive-no-app",
  "brand": "Nortek",
  "family": "iQ Drive variable-speed split systems (Maytag, Frigidaire, Westinghouse, Broan, NuTone, Reznor badges)",
  "toolName": "iQ Drive controller thermostat - no official mobile app exists",
  "equipment": "Thermostat/Control",
  "title": "There is no Nortek/Maytag phone app for the iQ Drive controller - stop looking",
  "whenToUse": "A customer or a tech asks for the Maytag/Frigidaire iQ Drive app. The correct answer is that no such app exists and the fix is a third-party smart thermostat, not more searching.",
  "requirements": [],
  "steps": [],
  "caution": "Maytag's own HVAC content states directly: \"we do not offer a thermostat that can be controlled from a smart device currently,\" adding that \"any smart thermostat on the market will work with your equipment\" and to consult a local heating and cooling contractor. Note the source: that is a Maytag HVAC reply in the comment thread of the \"Choosing a Thermostat\" blog post, dated January 26, 2017 - not a current policy page.",
  "confidence": "verify",
  "era": "current",
  "platforms": [],
  "notes": [
   "The on-device controller thermostat sets temperature scale, clock, language, contrast, and backlight timing locally - no networking or app layer appears in official Nortek materials.",
   "This entry documents a confirmed absence, not a research gap.",
   "The old nortekhvac.com/innovation/iq-drive/ page is now stuck in a redirect loop between nortekhvac.com and nordyne.com - the Maytag HVAC article is the reachable source for the no-app statement.",
   "Because the confirming quote is a 2017 blog-comment reply rather than an evergreen policy statement, re-confirm periodically that Nortek/Maytag still publishes no companion app for iQ Drive."
  ],
  "links": [
   {
    "label": "Choosing a thermostat (Maytag HVAC)",
    "url": "https://www.maytaghvac.com/blog/choosing-a-thermostat/"
   },
   {
    "label": "Nordyne (Nortek Global HVAC) manufacturer site",
    "url": "https://www.nordyne.com/"
   }
  ],
  "manuals": [],
  "source": "maytaghvac.com/blog/choosing-a-thermostat/; nortekhvac.com/innovation/iq-drive/"
 },
 {
  "id": "tb-generac-mobilelink-onboard-wifi",
  "brand": "Generac",
  "family": "Guardian 10-26 kW air-cooled home standby, Evolution 2.0 or Honeywell Sync 3.0 controller, built roughly June/July 2018 to 2024",
  "toolName": "Mobile Link Wi-Fi (onboard/factory module)",
  "equipment": "Generator",
  "title": "Connect or reconnect a factory Wi-Fi generator to the home network",
  "whenToUse": "The most common connectivity job on 2018-2024 Guardian air-cooled units - initial setup on a new install, or the reconnect call after a router swap or password change.",
  "requirements": [
   "A dedicated 2.4 GHz network, 802.11 b/g/n, with ports 80 and 443 open (default on most routers); 5 GHz-only networks are not supported",
   "The Mobile Link app (iOS/Android) or app.mobilelinkgen.com",
   "The unit already activated at www.ActivateGen.com",
   "Comfort with the generator control panel keypad and menus"
  ],
  "steps": [
   "Before the unit ships or sets: check home Wi-Fi signal strength with a phone at the planned generator location, and add a repeater if it is weak.",
   "On the controller, select WIFI at the lower-left of the display and press ENTER to open the Wi-Fi menu.",
   "For first-time setup or a reconnect, navigate to REDO WIFI SETUP? and select YES. The display shows SET TO AP, PLEASE WAIT... then SETUP WIFI NOW! with a 30-minute connection window.",
   "In the Mobile Link app tap Reconnect now (or Get Started > Connect a Generator) > Connect Now > Integrated Wi-Fi, and allow Bluetooth and Location permissions.",
   "Select \"Setup WIFI Now! Timer/SSID shown\", confirm the rotating timer and SSID (starting MLGxxxxx) match what the controller shows, and tap Yes, connect now.",
   "Approve the phone joining the generator's MLG network. Work through any captive-portal or \"no internet\" prompt rather than dismissing it - dismissing drops the phone off the MLG network and fails the setup.",
   "Select the home Wi-Fi network, enter the password, Submit, and wait for the app to confirm - it can take up to about 15 minutes.",
   "Finish registration in the app: Download Mobile Link > create account > enter the generator serial number > choose a service plan > Sign Up.",
   "On the controller, confirm CONNECTION: OK is displayed. Use the PING sub-item any time to re-verify the link."
  ],
  "caution": "Not compatible with 5.0 GHz-only networks or 802.11a/ac - park it on a 2.4 GHz SSID. Weak or fluctuating signal is the number one cause of failed firmware updates; Generac recommends 30% or better signal strength. Two different resets: resetting the Wi-Fi module to FACTORY DEFAULT settings can only be done by a dealer/IASD per Generac's Wi-Fi module manual, but a HARD RESET / power cycle is a homeowner-doable step - disconnect the wiring harness or unscrew the cable, wait about 1-2 minutes, reconnect; Generac only adds \"contact a local service dealer if you do not feel comfortable performing these steps.\"",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Part numbers A0000538695 then A0002197676. Not sold as an aftermarket accessory except during the 2021-2022 chip-shortage retrofit program (tb-generac-mobilelink-wifi-kit).",
   "Superseded as Generac's connectivity strategy by the Connectivity Cellular Accessory on Next Generation Series units (2025+), but onboard Wi-Fi stays standard and serviceable on the large 2018-2024 Guardian fleet.",
   "Wi-Fi can be disabled: per the Wi-Fi module manual, disabling Wi-Fi is a step in the Installation Wizard and is typically done during initial start-up, and the option remains available afterward in the controller's Edit menu (Sub Menus > Edit > WIFI ENABLE > No)."
  ],
  "links": [
   {
    "label": "How do I connect my generator to a home Wi-Fi network?",
    "url": "https://support.generac.com/s/article/How-Do-I-Connect-My-Generator-to-a-WI-FI-Network"
   },
   {
    "label": "Mobile Link Wi-Fi Reconnection Quick Guide",
    "url": "https://support.generac.com/s/article/Mobile-Link-Wi-Fi-Reconnection-Quick-Guide"
   },
   {
    "label": "Is my Wi-Fi network compatible with Mobile Link?",
    "url": "https://support.generac.com/s/article/Is-My-Wi-Fi-Network-Compatible-With-Mobile-Link"
   },
   {
    "label": "Wi-Fi, cellular, and LTE device compatibility guide",
    "url": "https://support.generac.com/s/article/Which-Generator-Controllers-Are-Compatible-with-Wi-Fi-Ethernet-or-4G-LTE"
   },
   {
    "label": "How do I hard reset or power cycle a Mobile Link device?",
    "url": "https://support.generac.com/s/article/How-Do-I-Hard-Reset-A-Mobile-link-Accessory-Device-When-There-Are-Communication-Issues"
   }
  ],
  "manuals": [
   {
    "title": "Mobile Link Wi-Fi Remote Monitoring Installation and User Manual (10000008140 Rev D)",
    "seedFile": "toolbox-generac-mobilelink-wifi-manual.pdf"
   },
   {
    "title": "Mobile Link Quick Start Guide (A0007205240)",
    "seedFile": "toolbox-generac-mobilelink-quickstart.pdf"
   }
  ],
  "source": "Mobile Link Wi-Fi Remote Monitoring Installation and User Manual, part 10000008140 Rev D 12/19/2022 (Disable Wi-Fi and Reset Wi-Fi to Factory Default Settings sections); Mobile Link Quick Start Guide, part A0007205240 (both on productmanuals.generac.com, PDFs held locally); support.generac.com Wi-Fi connect, reconnection, and hard reset / power cycle articles"
 },
 {
  "id": "tb-generac-connectivity-cellular",
  "brand": "Generac",
  "family": "All Wi-Fi/Ethernet/4G-LTE-compatible air-cooled and liquid-cooled generators, plus Next Generation Series and Power Zone 410 units",
  "toolName": "Generac Connectivity Cellular Accessory",
  "equipment": "Generator",
  "title": "The current dual-SIM multi-carrier cellular device that replaces every older Mobile Link accessory",
  "whenToUse": "The device to sell and install today for any new connectivity job, or when replacing a failed or discontinued Wi-Fi/Ethernet, 4G LTE, or CDMA device - especially where home Wi-Fi has been unreliable.",
  "requirements": [
   "A compatible controller (same list as the discontinued 4G LTE and Wi-Fi/Ethernet devices, plus Power Zone 410)",
   "Cellular coverage from any of Verizon, AT&T, US Cellular, T-Mobile, Sprint in the US, or Rogers, Bell, Telus in Canada",
   "Mobile Link app v3.14 or later if you are configuring Wi-Fi backup",
   "For liquid-cooled units built before November 2024: an additional wiring harness - A0005166075 for most RG/RD/QT models, A0005792571 for RG13090/RG15090 - beyond the A0005914366 harness in the kit"
  ],
  "steps": [
   "Confirm controller compatibility and whether an extra liquid-cooled harness is needed before ordering.",
   "Follow the Generac installation instructions linked from the install article - they are device-specific (air-cooled vs liquid-cooled, new install vs replacement).",
   "Power on the device and confirm the single status LED against Generac's LED-meaning article (it covers the Connectivity Cellular Accessory as well as the discontinued 4G/LTE device, despite its LTE-focused title).",
   "On a new install, add and enroll the device to the Mobile Link account. On a device swap, call Mobile Link Support at 855-436-8439 with the device and generator serial numbers to have them relink it.",
   "Optional Wi-Fi backup: Mobile Link app > generator card > Settings > Wi-Fi Configuration > \"No, stay connected\" when prompted about Bluetooth > select network > enter and confirm password > Save. Stay near the generator through this step."
  ],
  "caution": "Wi-Fi on this device is backup only - there is no way to force it to prefer Wi-Fi over an available cellular signal. Configuring Wi-Fi backup requires the phone to be near the generator and to stay connected through any captive-portal prompt.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Part number G0072150. Released February/March 2025. Cat-M1 with dual SIM cards for carrier redundancy.",
   "Replaces: the CDMA Mobile Link (2013), the 4G LTE Accessory (2019), and the Wi-Fi/Ethernet Accessory (2020) - Generac's official recommendation for any new connectivity install or persistent connectivity complaint regardless of what the old device was.",
   "The install PDF is a file attachment inside a JS-rendered support article, not a stable public URL, so it is not in the manuals list."
  ],
  "links": [
   {
    "label": "What is the Generac Connectivity Cellular Accessory?",
    "url": "https://support.generac.com/s/article/What-is-the-G3-Connectivity-Cellular-Accessory"
   },
   {
    "label": "How to install the Mobile Link Connectivity Cellular Accessory",
    "url": "https://support.generac.com/s/article/How-to-install-the-Mobile-Link-G3-cellular-device"
   },
   {
    "label": "How do I set up Wi-Fi as a backup for my Connectivity Cellular Accessory?",
    "url": "https://support.generac.com/s/article/How-do-I-set-up-Wi-Fi-for-my-Connectivity-Cellular-Accessory"
   },
   {
    "label": "Connectivity Cellular Accessory LED status meanings",
    "url": "https://support.generac.com/s/article/What-do-the-lights-on-the-front-of-the-Mobile-Link-Cellular-LTE-accessory-mean"
   }
  ],
  "manuals": [],
  "source": "support.generac.com articles: What is the Generac Connectivity Cellular Accessory; How to install the Mobile Link Connectivity Cellular Accessory; How do I set up Wi-Fi as a backup; Reading the 4G/LTE Mobile Link accessory LED status indicators (covers the Connectivity Cellular Accessory's single status LED); Mobile Link device history"
 },
 {
  "id": "tb-generac-mobilelink-account",
  "brand": "Generac",
  "family": "All Mobile Link-compatible home standby generators (account layer, any connectivity device)",
  "toolName": "Mobile Link app / app.mobilelinkgen.com - account setup and device enrollment",
  "equipment": "Generator",
  "title": "Create the homeowner Mobile Link account and enroll the generator",
  "whenToUse": "Every new install with connectivity, or whenever a homeowner asks a tech to walk them through signing up. A Mobile Link account is NOT required for the generator to run automatically - it is for remote status and alerts only.",
  "requirements": [
   "A reliable 2.4 GHz Wi-Fi or cellular connection confirmed BEFORE subscribing to a paid plan - there are no refunds for connectivity-caused dissatisfaction",
   "The owner's email address, which becomes the Mobile Link user ID, and a password of 12+ characters",
   "The generator serial number",
   "Note: Next Generation Series (2025+) units can only be monitored in the mobile app, not the website, though the website still manages the account and billing"
  ],
  "steps": [
   "App path: open Mobile Link > Get Started > \"I purchased a Generac Product and I need to create an account\" > enter email > Send Verification Code.",
   "Retrieve the 6-digit code emailed from noreply@mobilelinkgen.com, enter it, and tap Verify Code.",
   "Set a password of 12 or more characters and accept the EULA, Terms, and Privacy Statement.",
   "Enter owner name, phone, and address; the app then walks into device enrollment - generator serial number first, then the connectivity device serial number.",
   "Web path: go to https://app.mobilelinkgen.com, enter the email under Sign In Or Sign Up > Next > Send Verification Code > enter the 6-digit code > set password > continue through the same owner-info and enrollment prompts.",
   "Choose a subscription plan. Basic is free (up to 2 generators, no fuel monitors). Paid tiers add push/text/email alerts, remote Exercise Now, remote maintenance-reminder dismissal, fuel monitor support, and ecobee thermostat integration.",
   "To make Brackett the preferred service dealer: open the generator tile, choose Preferred Dealer, then LOCATE A DEALER to search by zip code or ADD MY INSTALLER to search by dealer name (in the app: \"+ Add my dealer\" or \"Find a dealer near me,\" then search by dealer name or by location/zip), pick the dealer, and tap SET AS PREFERRED DEALER. There is no dealer-number field. Alternatively use the dealer-managed plan sign-up (Request Service form) - on a dealer-managed plan the preferred dealer is set automatically to the managing dealer and the homeowner cannot change it."
  ],
  "caution": "In April 2026 Generac unified Mobile Link and ecobee sign-in under one authentication provider. Mobile Link-only accounts were forced to reset their password; accounts sharing an email with an ecobee account were merged automatically; accounts on different emails may still be split and need devices manually re-added. If a homeowner cannot log in, check this migration first. Deleting a unified account deletes BOTH Mobile Link and ecobee data and all paired products - never troubleshoot by account deletion.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "The April 21, 2026 sign-in unification is recent enough that Brackett should expect login calls from customers who have both a generator and an ecobee."
  ],
  "links": [
   {
    "label": "Full Mobile Link account setup and device enrollment",
    "url": "https://support.generac.com/s/article/How-Do-I-Set-up-a-Mobile-Link-Account-and-Enroll-Devices-for-Monitoring"
   },
   {
    "label": "Set up a Mobile Link account via the app",
    "url": "https://support.generac.com/s/article/How-to-Set-up-A-Mobile-Link-Account-via-the-App"
   },
   {
    "label": "Set up a Mobile Link account via the website",
    "url": "https://support.generac.com/s/article/How-to-Set-up-A-Mobile-Link-Account-via-the-Website"
   },
   {
    "label": "Available Mobile Link subscription plans",
    "url": "https://support.generac.com/s/article/What-Are-the-Available-Mobile-Link-Subscription-Plans"
   },
   {
    "label": "Mobile Link sign-in update (April 2026 migration)",
    "url": "https://support.generac.com/s/article/Mobile-Link-Migration"
   },
   {
    "label": "How do I select a preferred dealer in Mobile Link?",
    "url": "https://support.generac.com/s/article/How-I-do-select-a-preferred-dealer-in-Mobile-Link"
   }
  ],
  "manuals": [
   {
    "title": "Mobile Link Quick Start Guide (A0007205240)",
    "seedFile": "toolbox-generac-mobilelink-quickstart.pdf"
   }
  ],
  "source": "support.generac.com articles: How Do I Set up a Mobile Link Account and Enroll Devices for Monitoring; via the App; via the Website; subscription plans; How Do I Select a Preferred Dealer in Mobile Link; Mobile Link Migration and Migration Troubleshooting"
 },
 {
  "id": "tb-generac-mobilelink-dealer-plan",
  "brand": "Generac",
  "family": "All Mobile Link-compatible generators, dealer side of the customer account",
  "toolName": "Mobile Link Dealer-Managed Plan",
  "equipment": "Generator",
  "title": "Put a customer's generator on a dealer-managed plan so Brackett gets the alerts",
  "whenToUse": "Setting a maintenance-contract customer up for proactive monitoring, or when a customer wants the dealer to see faults and exercise status without forwarding alerts by hand.",
  "requirements": [
   "The generator already enrolled in a Mobile Link account",
   "The dealer completes the Request Service form for the customer",
   "The customer must manually cancel any existing self-managed paid subscription - it does not auto-cancel"
  ],
  "steps": [
   "Have the customer, or the dealer on their behalf, complete the Request Service form to sign up for a dealer-managed plan.",
   "Once active, the Preferred Dealer field on the account is set automatically and cannot be removed by the homeowner.",
   "If the customer had a personal paid subscription, they must cancel it themselves before renewal - watch for the in-app message \"This generator is being managed by a dealer. Please cancel your plan before the renewal date.\"",
   "Depending on the controller, the dealer can then remotely clear faults and warnings and run Exercise Now, and can monitor units beyond the personal-account device limits."
  ],
  "caution": "Dealer-managed plan pricing and inclusions are set by each dealer, not published by Generac - settle what Brackett bundles into its own maintenance contracts before quoting.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "This is the customer-account side; the dealer-side view of those customers lives in Mobile Link Fleet (tb-generac-mobilelink-fleet)."
  ],
  "links": [
   {
    "label": "How do I upgrade to a Dealer-Managed plan in Mobile Link?",
    "url": "https://support.generac.com/s/article/How-do-I-upgrade-to-a-Dealer-Managed-plan-in-Mobile-Link"
   },
   {
    "label": "How do I select a preferred dealer in Mobile Link?",
    "url": "https://support.generac.com/s/article/How-I-do-select-a-preferred-dealer-in-Mobile-Link"
   }
  ],
  "manuals": [],
  "source": "support.generac.com Dealer-Managed plan and Preferred Dealer articles; subscription plans article"
 },
 {
  "id": "tb-generac-mobilelink-fleet",
  "brand": "Generac",
  "family": "Dealer portal covering all customer generators and fuel monitors under Brackett's IASD account",
  "toolName": "Mobile Link FLEET",
  "equipment": "Generator",
  "title": "Dealer fleet dashboard - every customer unit's status in one view",
  "whenToUse": "At the shop, to triage which customers have faults or need maintenance, or to pull a customer's connectivity and device history before rolling a truck.",
  "requirements": [
   "A Generac360 (G360) login - Generac is retiring the older GenService login for Fleet in favor of single sign-on through Generac360",
   "Dealer-managed or otherwise-linked customer accounts, or nothing appears in the fleet view"
  ],
  "steps": [
   "Sign in at fleet.mobilelinkgen.com with a Generac360 account.",
   "If prompted to verify email on a first-time G360 sign-in: choose sign in with Generac360 > enter email > Continue > on the password screen select Forgot password? > follow the emailed reset instructions, which verifies the email.",
   "A tech without a Generac360 account needs their Fleet Administrator to request one; the tech then gets an email invite to set G360 credentials."
  ],
  "caution": "Everything past the login - customer records, device management, service opportunity leads - is dealer-gated and is not documented here. Brackett's own G360 access would be needed to write that up properly.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "web"
  ],
  "notes": [
   "Fleet support (Support@mobilelinkgen.com, 855-436-8439 US / 844-843-9436 Canada) is the same team as consumer Mobile Link support, on a different support site.",
   "Some dealers keep Fleet open on a shop monitor for at-a-glance status."
  ],
  "links": [
   {
    "label": "Mobile Link FLEET portal",
    "url": "https://fleet.mobilelinkgen.com/"
   },
   {
    "label": "New Fleet login process",
    "url": "https://fleetsupport.mobilelinkgen.com/hc/en-us/articles/34516445421069-New-Fleet-Login-Process"
   },
   {
    "label": "How do I contact FLEET support?",
    "url": "https://fleetsupport.mobilelinkgen.com/hc/en-us/articles/8358522143245-How-do-I-contact-FLEET-Support"
   }
  ],
  "manuals": [],
  "source": "fleet.mobilelinkgen.com; fleetsupport.mobilelinkgen.com articles (Generac's own Zendesk help center for Fleet)"
 },
 {
  "id": "tb-generac-fieldpro",
  "brand": "Generac",
  "family": "Next Generation Series air-cooled home standby with the Power Zone 200 controller (introduced April 2025); also the latest PWRcell 2 systems",
  "toolName": "Field Pro",
  "equipment": "Generator",
  "title": "Bluetooth commissioning, diagnostics, and maintenance on Power Zone 200 units",
  "whenToUse": "Required to commission any newly installed Next Generation Series (Power Zone 200) generator, and for on-site diagnostics, maintenance logging, or settings changes. Not a homeowner monitoring tool - that is Mobile Link.",
  "requirements": [
   "A generator with a Power Zone 200 controller (no digital display, unlike Evolution/Nexus panels)",
   "Login: a Generac360 (G360) technician account for IASD/certified techs, or PWRfleet credentials; a self-installer can sign up in-app, but the signup email cannot be changed later",
   "Bluetooth and Location Services enabled on the phone",
   "A Connectivity Cellular Accessory installed and powered for full commissioning",
   "Basic permission is open to any user; Advanced permission (2-wire start, calibration, aux emergency shutdown kit) requires an active Generac Air-Cooled Home Standby Service Certification"
  ],
  "steps": [
   "Download: search \"Generac Field Pro\" in the App Store or Google Play.",
   "Sign in with G360 credentials, PWRfleet login, or Sign Up for a new Field Pro account.",
   "Before connecting, place the generator into Service Mode.",
   "Connect: tap Connect to a Generator Now > allow Bluetooth > confirm or select the generator's serial number > wait for \"Connected to Serial Number\" > select fuel type if prompted.",
   "Commission a first-time setup: from the dashboard tap Setup and configure generator; if unregistered, tap Register the generator and enter site/customer info; Step 2 confirms or adjusts fuel type, Cold Smart Start, exercise settings, voltage, and optional Wi-Fi; Step 3 runs a system test.",
   "Adjust settings later: View generator details > Settings > Configuration (fuel type, cold smart start, exercise schedule) or Wi-Fi Configuration. Certified techs additionally get Calibration Settings, the 2-wire start toggle, and the aux emergency shutdown toggle.",
   "Maintenance: open Generator Details for a real-time health snapshot > Maintenance to see due and overdue items > do the work > clear/complete the item in-app > reset maintenance interval counters if needed > confirm it now shows in Maintenance History with a new due date.",
   "Offline site prep (no cellular or Wi-Fi on site): while still on a network, go to Work on a Home Standby Generator > Prepare for a Future Visit > + > search the generator by serial number and confirm the Connectivity Accessory serial number > register if needed > note the access window, which is 48 hours maximum. Refresh it before the visit if it is about to expire.",
   "Always disable Service Mode and return the unit to AUTO before leaving the site."
  ],
  "caution": "Leaving the generator in Service Mode is the most consequential mistake on this app - the unit will NOT auto-start on the next outage. Offline preparation is per user AND per device, so if two techs might visit, each has to prepare separately. Firmware cannot be force-pushed from Field Pro; it applies automatically over cellular/Wi-Fi, or is pushed when Field Pro connects by Bluetooth if not yet applied.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "Bluetooth"
  ],
  "notes": [
   "Field Pro is NOT PowerPlay. PowerPlay / PowerPlay CE is an iPad sales-and-quoting presentation tool and a clean-energy installer lead tool - not a diagnostic or commissioning app. Field Pro is the only current dealer diagnostic/commissioning app for Power Zone 200.",
   "Field Pro only works with Power Zone 200 generators (2025+ Next Generation Series) and the latest PWRcell 2 systems - it does not support Evolution, Sync, or Nexus controllers."
  ],
  "links": [
   {
    "label": "What is the Field Pro app?",
    "url": "https://support.generac.com/s/article/What-is-the-Field-Pro-app"
   },
   {
    "label": "How do I connect my generator in the Field Pro application?",
    "url": "https://support.generac.com/s/article/How-Do-I-Connect-my-Generator-in-the-Field-Pro-Application"
   },
   {
    "label": "How do I commission a generator in the Field Pro application?",
    "url": "https://support.generac.com/s/article/How-Do-I-Commission-a-Generator-in-the-Field-Pro-Application"
   },
   {
    "label": "Permission levels in Field Pro",
    "url": "https://support.generac.com/s/article/Permission-Levels-in-Field-Pro"
   },
   {
    "label": "How to use Field Pro in an offline environment",
    "url": "https://support.generac.com/s/article/How-to-register-a-generator-in-offline-mode-in-the-Field-Pro-app"
   },
   {
    "label": "generac.com/protools",
    "url": "https://www.generac.com/protools"
   }
  ],
  "manuals": [],
  "source": "Nine support.generac.com Field Pro articles (what it is, download, account setup, connect, commission, permission levels, offline mode, maintenance and service history, adjust settings)"
 },
 {
  "id": "tb-generac-firmware-updates",
  "brand": "Generac",
  "family": "All Generac/Honeywell home standby controllers: Evolution 1.0/2.0, Sync 2.0/3.0, Power Zone 200",
  "toolName": "Controller firmware updates (Mobile Link OTA, Field Pro, or dealer USB)",
  "equipment": "Generator",
  "title": "How generator firmware actually gets updated, and when a truck roll is required",
  "whenToUse": "Any time the shop or a customer asks whether firmware can just be updated - to know whether it is automatic, needs Field Pro on site, or needs the older USB dealer tool.",
  "requirements": [
   "Evolution 2.0 / Sync 3.0: a reliable Wi-Fi connection, Generac recommends 30% or better signal",
   "Power Zone 200: a Connectivity Cellular Accessory with an active network connection and Service Mode OFF, or Field Pro connected over Bluetooth on site",
   "Older controllers (Evolution 1.0, Sync 2.0, Nexus and earlier): a dealer visit with a USB tool"
  ],
  "steps": [
   "Evolution 2.0 / Sync 3.0 air-cooled units (roughly June 2018 onward): firmware downloads and applies automatically over Wi-Fi once the device has a good connection - no tech action unless the connection is unreliable.",
   "Power Zone 200 units: controller, ECU, and Connectivity Accessory firmware update automatically over cellular or Wi-Fi whenever the accessory has network and Service Mode is off.",
   "To check versions or push an update on site with Field Pro: connect over Bluetooth, then tap Hardware/firmware versions. If an update is pending and has not applied over the air, Field Pro prompts to apply it on connection - typically 5-10 minutes with good signal.",
   "For an offline site, use Field Pro's \"Prepare for a Future Visit\" beforehand - it downloads pending firmware to the phone so it can be applied without a live connection.",
   "All other/older controllers: firmware is not end-user downloadable. Schedule a dealer visit with a USB update tool - this normally carries a service charge and is treated as maintenance, not warranty."
  ],
  "caution": "If a Power Zone 200 unit shows \"Firmware Update In Progress\" in Field Pro for more than about 20 minutes, call Generac Customer Support (1-800-462-8352) rather than keep waiting. There is no way to force-push an update to a specific unit - it only updates once Generac's backend sees it online.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android",
   "USB"
  ],
  "notes": [
   "Documents the mechanism rather than a single app - the actual tools are Mobile Link (automatic OTA, no UI) and Field Pro (Power Zone 200 on-site verification)."
  ],
  "links": [
   {
    "label": "Home standby generator control panel firmware updates",
    "url": "https://support.generac.com/s/article/Can-I-Update-My-Control-Panel-Firmware-to-the-Latest-Version"
   },
   {
    "label": "Viewing PowerZone 200 controller, ECU, and accessory firmware information",
    "url": "https://support.generac.com/s/article/Viewing-PowerZone-200-ECU-and-Accessory-firmware-information"
   },
   {
    "label": "Why does Field Pro indicate 'Firmware Update In Progress'?",
    "url": "https://support.generac.com/s/article/Why-does-Field-Pro-indicate-Firmware-Update-In-Progress-when-connecting-to-the-generator"
   }
  ],
  "manuals": [],
  "source": "support.generac.com firmware update articles (control panel firmware; PowerZone 200 firmware information; Field Pro firmware-in-progress)"
 },
 {
  "id": "tb-generac-ecobee-load-management",
  "brand": "Generac",
  "family": "ecobee by Generac Smart Thermostat (Enhanced), used for HVAC load-shed paired with a Generac home standby generator",
  "toolName": "ecobee by Generac - HVAC Energy Manager and Mobile Link integration",
  "equipment": "Thermostat/Control",
  "title": "Enable HVAC load-shedding tied to generator status on the ecobee-by-Generac thermostat",
  "whenToUse": "An install where a Generac-branded ecobee Smart Thermostat is paired with a home standby generator and you want the thermostat to shed HVAC load automatically during a power event and show live generator status.",
  "requirements": [
   "An ecobee by Generac Smart Thermostat (Enhanced)",
   "The managed-load label affixed to the HVAC equipment or its breaker",
   "Mobile Link integration completed by QR-code scan from the thermostat; a Mobile Link account/subscription for full generator-status detail",
   "An ecobee mobile app account for the homeowner side"
  ],
  "steps": [
   "Place the Energy Manager load-management label on the HVAC equipment being managed (furnace, AC) or on its breaker at the load center, clearly noting the equipment type.",
   "On the thermostat, open the HVAC Energy Manager setup screen and select Active mode to enable the function.",
   "Select the required frequency-sensitivity setting. A load-shed event fires regardless of this setting - it only filters utility frequency variation.",
   "HVAC Energy Manager setup is complete once mode and sensitivity are set.",
   "Verify Mobile Link is linked: tap the stacked 4-box icon at the top right of the thermostat home screen and select Generator. If Mobile Link is not linked yet, the thermostat prompts to scan a QR code to complete the integration.",
   "Once linked, generator status (Ready to run, Exercising, Running, Warning, and so on) appears on the thermostat home screen and in the Generator sub-menu.",
   "Installers reach Energy Manager frequency settings later through the gear icon on the Generator screen - changing frequency requires confirming professional-installer status.",
   "Register the thermostat and set up the homeowner's ecobee app account per the standard ecobee registration flow."
  ],
  "caution": "Frequency-sensitivity cannot be changed while the home is currently running on generator backup power. Mobile Link's paid tier is what gives the dealer direct visibility into generator status for remote troubleshooting - the free tier only surfaces status to the homeowner on the thermostat.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "This procedure lives entirely inside the ecobee-by-Generac thermostat manual, not in a separate app and not on support.generac.com.",
   "Mobile Link's plan comparison lists ecobee smart-thermostat integration as a Premium-only feature.",
   "Not the same as Generac's Energy Management Solutions (EMS) guide, which covers Wallbox Level 2 Plus EV-charger load management."
  ],
  "links": [
   {
    "label": "Available Mobile Link subscription plans",
    "url": "https://support.generac.com/s/article/What-Are-the-Available-Mobile-Link-Subscription-Plans"
   }
  ],
  "manuals": [
   {
    "title": "ecobee by Generac Smart Thermostat Enhanced - Set-up, User Guide, Wiring Diagrams (A0008510183)",
    "seedFile": "toolbox-generac-ecobee-enhanced.pdf"
   }
  ],
  "source": "ecobee by Generac Smart Thermostat Enhanced Set-up/User Guide, part A0008510183 (productmanuals.generac.com; PDF held locally and text extracted for this entry), HVAC Energy Manager Set Up and Mobile Link integration sections"
 },
 {
  "id": "tb-generac-pwrview",
  "brand": "Generac",
  "family": "PWRcell battery storage and solar systems; also homes with a PWRview-compatible ATS or a standalone PWRview Home Energy Monitor",
  "toolName": "Generac PWRview (homeowner)",
  "equipment": "Other",
  "title": "Homeowner home-energy monitoring app for PWRcell systems",
  "whenToUse": "Any PWRcell battery/solar install, to give the homeowner visibility into power flow between solar, battery, grid, and the house. Not a generator connectivity tool - separate from Mobile Link.",
  "requirements": [
   "A PWRcell system, a PWRview-compatible ATS, or a PWRview Home Energy Monitor already installed",
   "An internet-connected system for historical data and graphs"
  ],
  "steps": [
   "Download PWRview from the App Store or Google Play.",
   "The app shows three power-flow bubbles - sun icon for solar production, green battery icon for PWRcell battery cabinets, purple utility tower for grid - all feeding a house icon the system prioritizes power to.",
   "Review daily, weekly, and monthly historical graphs for solar production, battery charge/discharge, and grid import/export.",
   "Use the bill-forecast feature, which estimates utility bills from grid-usage history and the homeowner's utility rate."
  ],
  "caution": "PWRview does not display system error or fault states - it is monitoring and visualization only. For faults, use the PWRview Installer app or the PWRcell tools in Field Pro.",
  "confidence": "common",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "A \"Neurio PWRView\" variant appears in Generac's own cross-links (older PWRcell hardware branding) but no official article content was found describing it separately."
  ],
  "links": [
   {
    "label": "What is the PWRview app for PWRcell systems?",
    "url": "https://cleanenergy.generac.com/s/article/What-Is-the-PWRView-App-for-PWRCell-Systems"
   }
  ],
  "manuals": [],
  "source": "cleanenergy.generac.com \"What Is the PWRView App for PWRCell Systems?\""
 },
 {
  "id": "tb-generac-pwrview-installer",
  "brand": "Generac",
  "family": "PWRcell battery storage and solar systems, installer side",
  "toolName": "PWRview Installer app",
  "equipment": "Other",
  "title": "Commission the PWRcell energy meter and current transformers",
  "whenToUse": "During PWRcell commissioning, to get the energy meter on Wi-Fi and configure the CTs before the homeowner's PWRview app goes live.",
  "requirements": [
   "A PWRcell system with the meter and CTs physically installed",
   "Wi-Fi at the site"
  ],
  "steps": [
   "Connect the meter to the home Wi-Fi network.",
   "Configure the CTs using basic settings.",
   "Configure the CTs using advanced settings as needed.",
   "Run the app's built-in error detection to confirm all readings are accurate before leaving the site."
  ],
  "caution": "No further procedural detail is published in the official article beyond this high-level flow - treat the step order as approximate and follow the in-app prompts.",
  "confidence": "verify",
  "era": "current",
  "platforms": [
   "iOS",
   "Android"
  ],
  "notes": [
   "Distinct from the homeowner PWRview app - installer-only, focused on meter and CT commissioning."
  ],
  "links": [
   {
    "label": "What is the PWRview Installer app?",
    "url": "https://cleanenergy.generac.com/s/article/What-Is-the-PWRView-Installer-App"
   }
  ],
  "manuals": [],
  "source": "cleanenergy.generac.com \"What Is the PWRView Installer App?\""
 },
 {
  "id": "tb-generac-mobilelink-cdma",
  "brand": "Generac",
  "family": "Home standby generators with Nexus, Evolution 1.0/2.0, or Sync controllers, roughly 2013-2019 installs",
  "toolName": "Mobile Link (original cellular / CDMA device, part G0064630)",
  "equipment": "Generator",
  "title": "The original 2G/CDMA cellular Mobile Link - dead network, identification only",
  "whenToUse": "Identifying legacy hardware: a grey box with a single antenna on the back of the enclosure, wired into an accessory port under the controller. It cannot be reactivated. Do not spend a truck roll troubleshooting its connectivity.",
  "requirements": [
   "Verizon 1x/2G CDMA network - shut down",
   "Enrollment originally needed the Mobile Directory Number (MDN) and Mobile Equipment ID (MEID); enrollment is no longer possible"
  ],
  "steps": [
   "Historical install (Generac manual 0K2289 Rev K, 2015): turn the generator OFF, remove the control panel fuse, open the home main breaker, remove fuse T1 from the transfer switch, and disconnect the battery negative then positive.",
   "Drill and position the Mobile Link unit per the supplied template so the antenna protrudes about 1 in. above the enclosure roof; route the 6-pin harness through the provided fittings and gaskets.",
   "Thread the antenna onto the unit hand-tight and plug in the 6-pin harness connector.",
   "Plug the 8-pin harness connector into accessory Port 1 under the controller. Nexus, Sync, Evolution, and PowerPact locations differ - PowerPact required removing the battery divider.",
   "Reconnect battery positive then negative, restore the fuses and main breaker, run the installation wizard, and place the unit in AUTO.",
   "Register at what was then www.StandbyStatus.com, later www.MobileLinkGen.com, using the MDN, MEID, and generator serial number. The top LED lit once enrollment completed."
  ],
  "caution": "Dead end. Verizon discontinued the CDMA/1x-2G data service this device used, and Generac ended support for it on December 31, 2022. There is no software fix - the only path is replacing the physical device with the current Connectivity Cellular Accessory, or a Wi-Fi device if the controller supports one.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Released roughly 2013/2014 on Verizon towers. Replaced by: the 4G LTE Accessory (2019), then the Connectivity Cellular Accessory (2025).",
   "A Verizon-branded network extender could be added for weak-signal sites - moot now.",
   "Its own manual revisions reference two different enrollment sites, www.StandbyStatus.com (older) and www.MobileLinkGen.com (newer) - useful for dating hardware."
  ],
  "links": [
   {
    "label": "Mobile Link device history",
    "url": "https://support.generac.com/s/article/History-of-Mobile-Link-Devices"
   },
   {
    "label": "How do I upgrade my CDMA device to the LTE device?",
    "url": "https://support.generac.com/s/article/How-Do-I-Upgrade-My-CDMA-Device-to-the-LTE-Device"
   }
  ],
  "manuals": [
   {
    "title": "Mobile Link Installation and User Manual (0K2289 Rev K)",
    "seedFile": "toolbox-generac-mobilelink-cdma-manual.pdf"
   }
  ],
  "source": "Mobile Link Installation and User Manual, part 0K2289 Rev K 04/24/15 (productmanuals.generac.com, PDF held locally); support.generac.com Mobile Link device history and CDMA-to-LTE upgrade articles"
 },
 {
  "id": "tb-generac-mobilelink-4g-lte",
  "brand": "Generac",
  "family": "Guardian air-cooled home standby and compatible liquid-cooled/commercial units, 2019-2023 connections",
  "toolName": "Mobile Link 4G LTE Accessory (G0071690)",
  "equipment": "Generator",
  "title": "Discontinued Verizon 4G LTE cellular accessory - still works if already installed",
  "whenToUse": "Reference for existing installs connected 2019-2023. Do not sell or install new - Generac discontinued it and directs upgrades to the Connectivity Cellular Accessory. It still functions where Verizon coverage is good.",
  "requirements": [
   "Verizon 4G LTE coverage at the site",
   "A Mobile Link account (Basic or Premium)",
   "Comfort disconnecting battery, fuses, and breakers"
  ],
  "steps": [
   "Disable onboard Wi-Fi first if the controller has it (WIFI menu > No) before installing a cellular device.",
   "Set the home main breaker OFF, open the enclosure, turn the generator OFF, pull the 7.5A control fuse, open the home utility disconnect, pull transfer-switch fuse T1, and disconnect the battery negative then positive.",
   "New install: remove the end panel/breaker cover and drill a 1-1/8 in (29 mm) hole at the pre-marked dimple on 2013+ models. Device swap: disconnect the existing harness from accessory Port 1 instead of drilling.",
   "Route the 6-pin harness through the plastic fitting and gasket, thread the antenna on hand-tight pointing up, and plug the 6-pin connector into the unit.",
   "Plug the 8-pin harness connector into accessory Port 1 on the underside of the controller, removing the Port 1 decal if present.",
   "Reconnect the battery positive then negative, reinstall panels and fasteners, restore the control fuse, T1 fuse, and main breaker, run the setup wizard, and place the unit in AUTO.",
   "In the Mobile Link app: Dashboard > Finish setup > select LTE Cellular device > Confirm > enter the device's 10-character serial number > Enroll this device > choose a subscription plan and billing frequency > enter payment.",
   "Verify the connection: the antenna-symbol LED on the front must be solid blue. Flashing means a weak or spotty connection."
  ],
  "caution": "Discontinued as a purchasable product - the original full-kit part G0071690 was discontinued May 26, 2023, and the whole 4G/LTE line has since been retired. It is Verizon-only, so at a site with weak Verizon signal recommend the multi-carrier Connectivity Cellular Accessory rather than chasing a marginal LTE signal.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Released April 16, 2019. Replaced by: the Connectivity Cellular Accessory (2025).",
   "Generac's Mobile Link device-history article lists the CDMA-to-LTE retrofit part as \"Retrofit (discontinued) G00702020\" and the updated full-kit part as G0072080 (from May 26, 2023). That retrofit number is not in Generac's usual part format and is not confirmed anywhere else - verify with Generac parts before ordering. The install and connect procedure itself is unambiguous."
  ],
  "links": [
   {
    "label": "How do I install the Mobile Link 4G LTE device?",
    "url": "https://support.generac.com/s/article/How-Do-I-Install-the-Mobile-Link-4G-LTE-Device-on-My-Home-Standby-Generator"
   },
   {
    "label": "How do I connect my generator to 4G LTE?",
    "url": "https://support.generac.com/s/article/How-do-I-connect-my-generator-to-4G-LTE"
   },
   {
    "label": "What do the lights on the Mobile Link cellular LTE accessory mean?",
    "url": "https://support.generac.com/s/article/What-do-the-lights-on-the-front-of-the-Mobile-Link-Cellular-LTE-accessory-mean"
   },
   {
    "label": "Mobile Link device history (part numbers and dates)",
    "url": "https://support.generac.com/s/article/History-of-Mobile-Link-Devices"
   }
  ],
  "manuals": [],
  "source": "support.generac.com 4G LTE install and connect articles; Mobile Link device history"
 },
 {
  "id": "tb-generac-mobilelink-wifi-ethernet",
  "brand": "Generac",
  "family": "Air-cooled and liquid-cooled generators without onboard Wi-Fi; became factory-standard on liquid-cooled units around November 2021",
  "toolName": "Mobile Link Wi-Fi/Ethernet Accessory (G0071700)",
  "equipment": "Generator",
  "title": "Discontinued external accessory that put a generator on Wi-Fi or hardwired Ethernet",
  "whenToUse": "Reference for 2020-2023-era installs. Telling it apart from onboard Wi-Fi: this one mounts externally with its own antenna and can be hardwired with Ethernet instead. It cannot run Wi-Fi and Ethernet at the same time.",
  "requirements": [
   "A dedicated 2.4 GHz network, 802.11 b/g/n (5 GHz and dual-band-only networks not supported), OR an Ethernet run to the generator",
   "The Mobile Link app on the setup phone or tablet",
   "The enclosure key"
  ],
  "steps": [
   "Disable onboard Wi-Fi if present, open the home main breaker, and de-energize the unit using the same battery/fuse/T1 sequence as the LTE accessory before installing the device.",
   "New install: drill the 1-1/8 in mounting hole at the dimple. Retrofit: disconnect the onboard Wi-Fi harness from Port 1 first.",
   "Push the device's threaded body through the panel from inside, secure it with the supplied PVC nut, thread the antenna on hand-tight pointing up, and plug in the 6-pin harness connector.",
   "Plug the 8-pin harness connector into accessory Port 1, reconnect the battery, restore fuses and breaker, run the setup wizard, and place the unit in AUTO.",
   "In the Mobile Link app: Get Started > I need to connect a Home Standby Generator to a home network > Connect Now > External Wi-Fi/Ethernet.",
   "Let the phone join the generator's own MLG_xxxxx Wi-Fi network - approve captive-portal or \"no internet\" prompts rather than backing out - then tap Join.",
   "Choose Wi-Fi (enter and confirm the home SSID password, Submit) or Ethernet (Standard for DHCP, Advanced for a static IP) and wait for \"Configuration sent\"."
  ],
  "caution": "Out of the box BOTH the Wi-Fi and Ethernet interfaces are disabled on this device - the app walkthrough is what enables one of them. Skip the app process and the device stays dark even though it is wired correctly. If the MLG network will not join, a hard reset of the device is usually required before retrying.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "iOS",
   "Android",
   "web"
  ],
  "notes": [
   "Released June 2020. Discontinued, but remains standard-issue on some liquid-cooled units built through about Nov 2021 before the onboard device took over.",
   "Replaced by: the Connectivity Cellular Accessory (2025)."
  ],
  "links": [
   {
    "label": "How do I install the Wi-Fi/Ethernet device on an air-cooled generator?",
    "url": "https://support.generac.com/s/article/How-Do-I-Install-the-Wi-Fi-Ethernet-Device-on-an-Air-Cooled-Generator"
   },
   {
    "label": "Connecting the Wi-Fi/Ethernet Mobile Link device to your home network",
    "url": "https://support.generac.com/s/article/Connecting-the-Wi-Fi-Ethernet-Mobile-Link-device-to-your-home-network"
   }
  ],
  "manuals": [],
  "source": "support.generac.com Wi-Fi/Ethernet install and connect articles; Mobile Link device history"
 },
 {
  "id": "tb-generac-mobilelink-wifi-kit",
  "brand": "Generac",
  "family": "Air-cooled Guardian 10-24 kW, Evolution 2.0 controller, built approximately May 2021-2022 and shipped WITHOUT the Wi-Fi module because of the microprocessor chip shortage",
  "toolName": "Mobile Link Wi-Fi Kit (chip-shortage retrofit)",
  "equipment": "Generator",
  "title": "Add the onboard Wi-Fi module to a unit that shipped without one",
  "whenToUse": "A customer's Guardian unit built around 2021-2022 has no Wi-Fi module, or there is paperwork in the enclosure referencing a chip shortage, or the owner never received the kit Generac promised to mail.",
  "requirements": [
   "Manufacture date after approximately May 2021",
   "Air-cooled only, Evolution 2.0 controller, 10-24 kW",
   "The generator serial number, to confirm eligibility and request the kit"
  ],
  "steps": [
   "Confirm eligibility - date, air-cooled, Evolution 2.0, 10-24 kW. If unsure, call Generac customer service at 855-436-8439.",
   "Request the kit at www.generac.com/wifikit with the owner's address and generator serial number.",
   "Remove the identification tag from the new Wi-Fi module and do NOT lose it - it is needed for Mobile Link account creation. Adhere it inside the front panel near the serial number label.",
   "Remove the grey plug on the back of the generator, using the supplied wedge if it is tight.",
   "Use the wedge to remove the clear plastic retainer holding the connector plug; discard the retainer and plug.",
   "Connect the Wi-Fi accessory to the generator's connector plug until it clicks.",
   "With the module's TOP facing up, feed the wiring into the opening and push the module in until both tabs click.",
   "Proceed to standard onboard Wi-Fi setup (tb-generac-mobilelink-onboard-wifi) to join the home network and the Mobile Link account."
  ],
  "caution": "This is not the same product as the discontinued Wi-Fi/Ethernet or 4G LTE aftermarket accessories - do not substitute those part numbers. Generac now steers new connectivity requests to the Connectivity Cellular Accessory instead of this kit.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [
   "web"
  ],
  "notes": [
   "A time-boxed program tied to a specific 2021-2022 supply shortage, not an ongoing accessory line. Narrow model/date window - confirm eligibility before ordering.",
   "There is no USB device or cable in this kit - the module snaps into a connector on the back of the generator, and the only online step is the eligibility/request form at generac.com/wifikit. Network setup afterward is the standard onboard Wi-Fi flow (tb-generac-mobilelink-onboard-wifi)."
  ],
  "links": [
   {
    "label": "Is the Wi-Fi Kit compatible with my generator?",
    "url": "https://support.generac.com/s/article/Is-the-Wi-Fi-Kit-Compatible-with-My-Generator"
   },
   {
    "label": "How do I install the Wi-Fi Kit for my generator?",
    "url": "https://support.generac.com/s/article/How-to-install-the-WIFI-Kit-for-my-generator"
   }
  ],
  "manuals": [
   {
    "title": "Addendum: Not Wi-Fi Equipped (chip-shortage notice, A0001539495 Rev A)",
    "seedFile": "toolbox-generac-wifi-kit-addendum.pdf"
   }
  ],
  "source": "support.generac.com Wi-Fi Kit compatibility and install articles; Addendum Not Wi-Fi Equipped, part A0001539495 Rev A 05/11/2021 (productmanuals.generac.com, PDF held locally)"
 },
 {
  "id": "tb-generac-powerpact-no-connectivity",
  "brand": "Generac",
  "family": "7.5 kW PowerPact home standby generator, all variants",
  "toolName": "No Mobile Link connectivity tool exists for PowerPact",
  "equipment": "Generator",
  "title": "PowerPact cannot be connected to Mobile Link by any device, past or present",
  "whenToUse": "A customer with a 7.5 kW PowerPact asks about adding Wi-Fi or cellular monitoring. The answer is that it is not possible with any Generac accessory - this is not a troubleshooting call.",
  "requirements": [],
  "steps": [],
  "caution": "Generac's compatibility table and its CDMA-upgrade article both state it plainly: no variation of the 7.5 kW PowerPact generators was ever compatible with any Mobile Link connectivity device - onboard Wi-Fi No, Wi-Fi/Ethernet No, Cellular No. Do not quote a Mobile Link accessory or attempt an install.",
  "confidence": "common",
  "era": "legacy",
  "platforms": [],
  "notes": [
   "Nexus and pre-Nexus controllers are NOT categorically excluded - Generac's compatibility table covers those generations by build year (HSB 2008, HSB 2010, HSB 2013) and shows them compatible with the legacy cellular device and, from 2010 on, the Wi-Fi/Ethernet accessory. Check the specific build year and panel rather than assuming Nexus means unsupported. Only PowerPact is a hard no.",
   "Replaced by: nothing - the only way to give a PowerPact customer monitoring is a different generator."
  ],
  "links": [
   {
    "label": "Wi-Fi, cellular, and LTE device compatibility guide",
    "url": "https://support.generac.com/s/article/Which-Generator-Controllers-Are-Compatible-with-Wi-Fi-Ethernet-or-4G-LTE"
   },
   {
    "label": "Core Power vs PowerPact control panel differences",
    "url": "https://support.generac.com/s/article/What-is-the-PowerPact-or-Core-Power-Control-Panel"
   }
  ],
  "manuals": [],
  "source": "support.generac.com Wi-Fi/cellular/LTE compatibility guide; How Do I Upgrade My CDMA Device to the LTE Device?"
 }
];
