/*
 * Toolbox — board programming / data-loading procedures and the tools used
 * for them. Distinct from Error Codes (a specific fault) and Diagnostic Help
 * (a symptom with no code) — this is "how do I use this tool, and when."
 * Same starter/verify caveat as the rest of the app.
 */

const TOOLBOX = [
{ id:"tb-carrier-usb-upgrade", brand:"Carrier", family:"Bryant / Payne (Infinity / Evolution)", toolName:"USB Software Upgrade", equipment:"Thermostat/Control",
  title:"System Wall Control — USB software upgrade (older/non-Bluetooth method)",
  whenToUse:"For the System Wall Control (thermostat) itself — when Carrier releases a control software update and the control doesn't have Wi-Fi/OTA set up, or as a fallback if the OTA push fails. On Wi-Fi-connected Series B controls this usually happens automatically or via the homeowner's prompt instead. For updating an outdoor unit's own board (PCM/VFD), use the Bluetooth Service Technician App method instead.",
  requirements:["USB flash drive, formatted FAT32","Downloaded firmware .zip file from Carrier's software update site (requires accepting the end-user license agreement)","Physical access to the Infinity/Evolution touchscreen control"],
  steps:[
    "Extract the downloaded .zip file using an unzip tool",
    "Place all extracted files into a folder named \"TSTAT\" on the root of the USB flash drive",
    "Verify the files transferred successfully onto the drive",
    "At the thermostat, hold the \"Service\" button to enter Installation & Service mode",
    "Navigate to \"Software Upgrade\" in the menu",
    "Insert the USB flash drive when prompted",
    "Review the confirmation screen describing the upgrade, then select \"Yes\" to proceed",
    "Wait for the control to upload the software",
    "Select \"Done\" and allow the control to restart on its own",
  ],
  caution:"Don't remove the USB drive or interrupt power during the upload — let it finish and restart on its own.",
  confidence:"verify" },

{ id:"tb-carrier-bluetooth-app", brand:"Carrier", family:"Bryant / Payne — Infinity/Evolution Extreme 24/26 SEER communicating outdoor units", toolName:"Carrier®/Bryant®/Payne® Service Technician App (Bluetooth)", equipment:"Condenser/Heat Pump",
  title:"Pairing to an outdoor unit over Bluetooth and pushing a firmware update",
  whenToUse:"For newer communicating outdoor units (Infinity/Evolution Extreme 24/26 SEER and similar) that have an onboard Bluetooth module. Lets you pair directly to the outdoor unit's own board (PCM/VFD) without going through the indoor wall control — useful for diagnostics, live system data (pressures, voltage, compressor RPM, temps), and pushing firmware updates with fewer trips into the house. Download the brand-matched app: Carrier® Service Technician, Bryant® Service Technician, or Payne® Service Technician.",
  requirements:["Carrier/Bryant/Payne Service Technician app (iOS/Android), signed into your account","Outdoor unit with a built-in Bluetooth module (LED visible near the module)","Phone within Bluetooth range of the outdoor unit"],
  steps:[
    "Open the app and sign into your account",
    "Touch \"Connect to Outdoor Unit or Furnace\"",
    "Select \"Outdoor Unit (Bluetooth)\" — the app searches for nearby equipment",
    "Check the Bluetooth module on the unit: red LED = searching/not yet connected, green LED = connected",
    "The app lists the Serial Number and Model of any unit(s) found — if multiple units are nearby it lists all of them",
    "Select the correct unit (match serial/model to the job) and touch \"Pair\"",
    "Once paired, use the app's diagnostics/status screens to pull live data, or its software update option to check for and push a firmware update to the unit's PCM/VFD",
  ],
  caution:"Verify the serial number shown in the app matches the unit's data plate before pairing, especially at multi-unit properties — the app will list every nearby Bluetooth-capable unit, not just the one you're standing at. The exact wording of the in-app update menu isn't confirmed here — follow what the app itself shows.",
  confidence:"verify" },

{ id:"tb-goodman-coolcloud", brand:"Goodman/Amana", family:"Daikin — ComfortBridge-enabled boards", toolName:"CoolCloud HVAC App", equipment:"Gas Furnace",
  title:"ComfortBridge board — firmware/shared data update via CoolCloud",
  whenToUse:"When a ComfortBridge-enabled Goodman/Amana furnace or air handler needs a firmware or shared-data update for compatibility with a newly paired inverter AC/heat pump, or when Goodman/Amana releases a firmware update. Note: CoolCloud is a Goodman/Amana (Daikin family) tool, not a Carrier tool.",
  requirements:["CoolCloud HVAC app (iOS/Android), registered with contractor/business credentials","Strong cell signal or Wi-Fi at login — needed once to fetch the latest firmware before you lose signal at the equipment","Bluetooth range of the ComfortBridge-enabled control board"],
  steps:[
    "Open the CoolCloud HVAC app before heading to the job while you still have signal — it downloads the latest firmware in the background",
    "Log in with your registered contractor credentials",
    "At the unit, get within Bluetooth range of the ComfortBridge-enabled board",
    "Follow the app's pairing process to connect (matches the pairing steps in the unit's install manual)",
    "Once paired, use the app's update/configure option to push the firmware or shared data to the board",
    "Confirm the app shows a successful update status before leaving the job",
  ],
  caution:"Log in and let the app fetch firmware while you still have signal — pairing itself works over Bluetooth with no signal at the equipment, but the app needs connectivity first to have the update ready to push.",
  confidence:"verify" },

{ id:"tb-daikin-btsdl01", brand:"Daikin", family:"ComfortNet-compatible communicating equipment", toolName:"Bluetooth Shared Data Loader (BTSDL01-D)", equipment:"Condenser/Heat Pump",
  title:"BTSDL01-D — loading Shared Data onto a Daikin communicating board",
  whenToUse:"When a unit reports fault code Ed0, Ed1, or Ed2 (see Error Codes). This happens when \"Shared Data\" — chassis-specific data that keeps communicating components compatible with each other — is lost because multiple components (indoor board, indoor blower motor, and/or outdoor board on a communicating-wired system) were all replaced at the same time. Avoid needing this altogether by replacing components one at a time and power-cycling the system after each one.",
  requirements:["BTSDL01-D Bluetooth Shared Data Loader hardware (order through Daikin Parts Customer Service)","CR2032 3V coin cell battery (one ships with the loader)","Daikin Shared Data App (iOS/Android), registered account","The unit's model number, or its 2D barcode (usually inside the unit cabinet)"],
  steps:[
    "STEP 1 — Load the program onto the loader: switch the loader's power switch ON (blue status LED should flash every ~4 seconds)",
    "In the Shared Data app, connect to the \"SharedDataCard\" Bluetooth network it detects",
    "Scan the unit's 2D barcode with your phone camera (preferred) or enter the model number manually",
    "Review the Shared Data shown for accuracy, then tap \"Confirm and Continue\" to program it onto the loader card",
    "STEP 2 — Load Shared Data onto the equipment: power OFF the HVAC system first",
    "Insert the loader card into the Shared Data loading connector on the unit's control board",
    "Power the HVAC system back ON — the loader's blue LED flashing confirms it's working",
    "Wait 30 seconds for the Shared Data loading process to complete",
    "Power the equipment back OFF and remove the card",
    "Power the system back ON and confirm it's operating normally with no fault code",
  ],
  caution:"The battery gives 3 quick blinks when low — replace it before a job if you see that pattern. Always power off before inserting or removing the card from the control board.",
  confidence:"common" },
];
