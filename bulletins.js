/*
 * Bulletins - manufacturer service / product / technical bulletins the app
 * should surface when a tech scans or opens a model they apply to.
 *
 * Every entry is a short paraphrase of a dealer or distributor bulletin, the
 * way the existing tips in generators.js / data.js cite them. Nothing here
 * links to, copies or publishes the document itself; `confidential: true`
 * marks bulletins stamped confidential / "do not distribute" - the app may
 * show the paraphrase (Andy approved paraphrased dealer tips) but never the
 * PDF. Numbers, model ranges, serials and dates are only what the bulletin
 * states; where applicability is vague, appliesText says so and genFamilies
 * is the broadest honest list.
 *
 * Shape: { id, brand, number, docNo, rev, date, type, title,
 *   applies: { genFamilies[] (ids from GENERATORS / KOHLER_GENERATORS),
 *              modelRe[] (regex source strings, HVAC model prefixes),
 *              serialFrom, serialTo, builtFrom, builtTo, controllers[], codes[] },
 *   appliesText, summary, steps[], priority: high|normal|info, source, confidential? }
 *
 * Sources: Generac GenService (SIB/TIB/PIB, A00... doc numbers), Carrier/ICP
 * TIC/PTC, Daikin/Goodman TSB, Lennox S&A Notes, Kohler SB/PB - plus the
 * bulletins already cited in data.js, generators.js, kohler-gens.js, maint.js
 * and symptoms.js (summaries taken from the existing app text).
 */

// Generac family groups (ids from generators.js)
const BUL_GEN_EVO2 = ["gen-guardian-evo2-9-22", "gen-guardian-evo2-10-22-compact", "gen-guardian-evo2-10-26", "gen-guardian-evo2-response-16-22", "gen-guardian-evo2-dr-11-20", "gen-guardian-evo2-powermate-11", "gen-synergy-evo2-20", "gen-ecogen-evo2-15", "gen-guardian-evo2-20-3ph"];
const BUL_GEN_EVO1 = ["gen-guardian-evo1-8", "gen-guardian-evo1-11", "gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22", "gen-ecogen-evo1-15", "gen-synergy-vscf-20"];
const BUL_GEN_EVO_AC = BUL_GEN_EVO2.concat(BUL_GEN_EVO1);
const BUL_GEN_NEXTGEN = ["gen-generac-next-gen-10-28", "gen-guardian-next-gen-22-25-y32", "gen-generac-next-gen-20-3ph"];
const BUL_GEN_NEXUS = ["gen-guardian-nexus-8", "gen-guardian-nexus-10-11", "gen-guardian-nexus-12-17", "gen-guardian-nexus-20", "gen-ecogen-nexus-6"];
const BUL_GEN_PRE = ["gen-guardian-pre-nexus-legacy-7-18", "gen-guardian-pre-nexus-2008-8-20", "gen-corepower-7"];
const BUL_GEN_POWERPACT = ["gen-powerpact-7-75"];
const BUL_GEN_AC_ALL = BUL_GEN_EVO_AC.concat(BUL_GEN_NEXTGEN, BUL_GEN_NEXUS, BUL_GEN_PRE, BUL_GEN_POWERPACT);
const BUL_GEN_LC = ["gen-generac-protector-rg-evolution", "gen-generac-protector-rg-legacy-3600", "gen-generac-protector-qt-nexus", "gen-generac-protector-sg-h100"];
// 990/999 cc V-twin families (air filter 0J8478, hunting bulletins)
const BUL_GEN_990_999 = ["gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22", "gen-ecogen-evo1-15", "gen-synergy-vscf-20", "gen-guardian-evo2-9-22", "gen-guardian-evo2-response-16-22", "gen-guardian-evo2-20-3ph", "gen-synergy-evo2-20", "gen-ecogen-evo2-15"];
// GT-530 / GTH-530 families
const BUL_GEN_530 = ["gen-guardian-nexus-10-11", "gen-ecogen-nexus-6", "gen-guardian-evo1-11", "gen-guardian-evo2-9-22", "gen-guardian-evo2-dr-11-20", "gen-guardian-evo2-powermate-11", "gen-guardian-pre-nexus-2008-8-20"];

const BULLETINS = [

  // ===================== GENERAC - GenService bulletins =====================
  {
    id: "gen-sib25-12-ac", brand: "Generac", number: "SIB25-12-AC", docNo: "A0008846372", rev: "A", date: "2025-10", type: "Service",
    title: "Testing E-code 2800 (generator emergency shutdown)",
    applies: { genFamilies: BUL_GEN_EVO_AC, controllers: ["Evolution 1.0", "Evolution 2.0"], codes: ["2800"] },
    appliesText: "Guardian air-cooled home standby generators with Evolution 1 or Evolution 2 controllers.",
    summary: "Incomplete testing of the emergency shutdown circuit leads to parts swapped for nothing or a nuisance 2800 that keeps coming back. Test the switches, then the wiring, then the controller - in that order.",
    steps: [
      "Verify both emergency shutdown switches are CLOSED (I). Identify the controller as Evolution 1 or Evolution 2.",
      "Try to clear: OFF, then ENTER. Check the spade terminals on the back of both switches - pull, squeeze gently with pliers, reinstall. Try to clear again.",
      "DMM on ohms across the top and bottom terminals of each switch with it CLOSED: resistance = switch OK; OL / no reading = replace the switch.",
      "Wiring check, switch still CLOSED. Evolution 1: back-probe J2-10 and J2-9. Evolution 2: back-probe J2-9 and J2-1.",
      "Evolution 1 warning: do NOT mistake J2-1 for J2-10 - probing J2-9 and J2-1 shorts and permanently damages the controller.",
      "Resistance seen through the wiring = replace the controller. OL = repair or replace the wiring."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB25-12-AC (A0008846372) Rev A, Oct 2025"
  },
  {
    id: "gen-pib18-06-aac", brand: "Generac", number: "PIB18-06-AAC", docNo: "A0000024516", rev: "C", date: "2025-10", type: "Product",
    title: "Nuisance 2099 mis-wire alarms (EVO1, EVO2, PZ200)",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(BUL_GEN_NEXTGEN), controllers: ["Evolution 1.0", "Evolution 2.0", "Power Zone 200"], codes: ["2099"] },
    appliesText: "Guardian EVO1, Guardian EVO2 and PZ200 (Next Generation home standby) controllers.",
    summary: "Transfer wires 23 and 194 bundled with N1/N2/T1 pick up coupled AC voltage; the controller reads it as a mis-wire and alarms 2099. Prove the alarm is false first, then add resistors.",
    steps: [
      "Go through the diagnostic manual to decide whether the 2099 is valid (the app's 2099 steps: DMM on AC volts at the customer block, wire 194 to 0 and 23 to 0 - over 40 VAC means a real mis-wire at TB1/TB2 or in the transfer switch; 2-40 VAC is coupled voltage).",
      "De-energize the unit completely - no utility or battery power - before installing resistors.",
      "Verified nuisance: install a 120k ohm 1 W resistor (A0000069883) from wire 194 to 0 and a second one from wire 23 to 0 at the customer connection block; heat-shrink each resistor (A0009721078 or similar 3/16 in).",
      "Warranty: new claim in GenService, A0000069883 as primary failed part, 0.25 hr, PIB18-06-AAC in comments."
    ],
    priority: "high", confidential: true,
    source: "Generac PIB18-06-AAC (A0000024516) Rev C, Oct 2025"
  },
  {
    id: "gen-pib25-15-xg", brand: "Generac", number: "PIB25-15-XG", docNo: "A0010386799 (pages stamped A0010116364)", rev: "A", date: "2026-01", type: "Product",
    title: "Nuisance 2099 mis-wire alarms - Protector XG (Power Zone 410)",
    applies: { genFamilies: [], controllers: ["Power Zone 410"], codes: ["2099"] },
    appliesText: "Power Zone 410 controllers on Protector XG Series home generators. (No Protector XG family exists in the app yet - match on the PZ410 controller or the model.)",
    summary: "Same coupled-AC nuisance 2099 as the air-cooled units, but the fix on PZ410 is a resistor harness, not loose resistors.",
    steps: [
      "First verify customer connections are landed correctly and there are no shorts between wires; use the diagnostic manual to confirm the alarm is a nuisance.",
      "De-energize the unit (no utility or battery power) before installing the harness.",
      "Install resistor harness A0010070719 between wires 194, 23 and ground at TB3; on liquid-cooled units note the Wago block layout.",
      "Warranty: A0010070719 as primary failed part, 0.25 hr, PIB25-15-XG in comments."
    ],
    priority: "normal", confidential: true,
    source: "Generac PIB25-15-XG (A0010386799) Rev A, Jan 2026"
  },
  {
    id: "gen-30l-battery-transition", brand: "Generac", number: "Support article (30L battery)", docNo: "A0010137451 / A0010137452 battery, G00735230 tray kit", rev: "", date: "2026-07", type: "Product",
    title: "Next Gen battery change: BTX20L (310 CCA) replaced by AGM 30L (400 CCA)",
    applies: { genFamilies: BUL_GEN_NEXTGEN, controllers: ["Power Zone 200"], codes: ["2670"] },
    appliesText: "All Next Generation Series air-cooled home standby generators (Power Zone 200). Rolling change: units built from early May 2026 ship with the 30L tray; older units were built for the BTX20L.",
    summary: "Generac moved Next Gen from the AGM BTX20L (310 CCA, A0002359535) to the AGM 30L (400 CCA, A0010137452 or A0010137451) for more starting capacity in outages and cold starts. A 30L does not fit the original 20L tray - it needs tray kit G00735230.",
    steps: [
      "Replacing a Next Gen battery: use the AGM PowerSports Group 30L, 400 CCA minimum (A0010137452 or A0010137451). That is the current spec in the Rev E dealer manual and Generac's battery page.",
      "Unit built for the BTX20L (smaller tray): install tray kit G00735230 with the 30L - the 30L will not sit correctly in the original tray. Units that came with a 30L need no kit.",
      "Keeping a BTX20L is still allowed by Generac (no tray needed), but it is the 310 CCA battery the change was made to replace - on a hard-starting unit, cold climate, or battery / CANBus codes, upgrade to the 30L.",
      "Test before condemning: conductance tester, result must be at least 75 % of the battery's rated CCA, otherwise replace it and retest (A0004542981 Rev E).",
      "With several codes logged, work the battery, charging and CANBus (2670) codes first - a weak battery dipping on crank can set them (A0004542981 Rev E p.25)."
    ],
    priority: "high",
    source: "Generac support articles 'Do I need a different battery tray when using the AGM 30L battery' (Jul 2026) and 'What battery do I need'; Next Gen dealer manual A0004542981 Rev E (Aug 2026) p.17, p.25"
  },
  {
    id: "gen-air-filter-a0012860622", brand: "Generac", number: "New product announcement (air filter)", docNo: "A0012860622", rev: "", date: "2026-11", type: "Product",
    title: "New Guardian home standby air filter A0012860622 - 0J8478S still fits Next Gen",
    applies: { genFamilies: BUL_GEN_NEXTGEN },
    appliesText: "Generac says the new filter is for Guardian home standby generators in general, without listing models. The one fitment it confirms is that the current filter 0J8478S still works on Next Generation units.",
    summary: "Generac released a new home standby air filter, A0012860622, built for a wider range of climates. It is in service parts now and goes into Guardian service kits starting the week of Feb 15, 2027. The current 0J8478S filter is still OK on Next Gen units, because the Next Gen fuel and ignition control adjusts for conditions on its own.",
    steps: [
      "Either filter is fine on a Next Gen: 0J8478S (the current one in the parts lists) or the new A0012860622.",
      "Tune-up kits ordered from mid-Feb 2027 on will come with the new filter.",
      "Use genuine Generac filters."
    ],
    priority: "info",
    source: "Generac dealer email, New Product Announcement: New Guardian Home Standby Air Filter, Nov 2026"
  },
  {
    id: "gen-fw-v14901-2670", brand: "Generac", number: "Fleet alert: firmware v14901", docNo: "", rev: "", date: "2026-07", type: "Service",
    title: "Next Gen firmware v14901 (from 7/15/26) can set a 2670 CANBus alarm",
    applies: { genFamilies: BUL_GEN_NEXTGEN, controllers: ["Power Zone 200"], codes: ["2670"] },
    appliesText: "Next Gen air-cooled standby generators receiving the over-the-air firmware v14901 (rollout began 7/15/26). Guardian series models are not affected.",
    summary: "Some Next Gen units show a 2670 CANBus alarm while the v14901 update installs. Generac says that is expected and clears on its own within 24 hours.",
    steps: [
      "2670 on a Next Gen with no other symptoms: check whether it just took the v14901 update (Mobile Link / FLEET history). If so, it should clear on its own within 24 hours.",
      "Dealers with FLEET can clear it sooner with Clear Alarm remotely.",
      "Still there after a remote clear, or after 24 hours: diagnose it as a real 2670 with the dealer manual - battery and cranking voltage first, then CAN wiring 743/744, terminating resistance and the ECM enable wire.",
      "Release notes for v14901 are on GENservice."
    ],
    priority: "normal",
    source: "Mobile Link Fleet support alert 'FIRMWARE UPDATE ALERT - Rollout Beginning 7/15/26' (Generac)"
  },
  {
    id: "gen-pib-a0013232997-pz200-fw162", brand: "Generac", number: "A0013232997", docNo: "A0013232997", rev: "A", date: "2026-10", type: "Product",
    title: "PZ200 firmware 1.6.2 cuts phantom battery, sync and transfer warnings",
    applies: { genFamilies: BUL_GEN_NEXTGEN, controllers: ["Power Zone 200"], codes: ["2780", "2750", "2760", "2090", "2120", "2125", "2095", "2738"] },
    appliesText: "All air-cooled generators with Power Zone 200 controllers (Next Gen).",
    summary: "Firmware 1.6.2 changes the settings for 8 warnings so they fire less often as phantom / non-actionable alarms: Battery Charger AC Missing 2780, Battery Low Voltage 2750, Battery Problem 2760, Model ID Sync 2090, Serial Number Sync 2120, Run Hours Sync 2125, Fuel Type Sync 2095, Transfer Not Detected 2738.",
    steps: [
      "One of these warnings with no real fault found: check the controller firmware first. Below 1.6.2, update it before chasing the warning.",
      "Connected units (cellular or Wi-Fi) got 1.6.2 over the air from Oct 9, 2026; new units ship with it.",
      "Units not connected: load it with the Offline Mode instructions (PZ200 dealer manual).",
      "Information only - no warranty labor for the update."
    ],
    priority: "normal", confidential: true,
    source: "Generac PIB A0013232997 Rev A, Oct 2026"
  },
  {
    id: "gen-pib-a0012860447-18-22-alternators", brand: "Generac", number: "A0012860447", docNo: "A0012860447", rev: "A", date: "2026-10", type: "Product",
    title: "Next Gen 18 and 22 kW now ship with one of two alternators - order parts by serial",
    applies: { genFamilies: ["gen-generac-next-gen-10-28", "gen-guardian-next-gen-22-25-y32"], controllers: ["Power Zone 200"] },
    appliesText: "Next Gen air-cooled home standby, 18 kW and 22 kW only. Same four-digit model number and UPC for both builds.",
    summary: "Generac builds the 18 and 22 kW Next Gen with either of two alternator configurations. Performance is the same, but the alternators and their related parts are not interchangeable.",
    steps: [
      "Ordering an alternator or alternator part for an 18 / 22 kW Next Gen: look it up by the unit's serial number, not the model number - the model number does not tell you which build it is.",
      "Spec sheet or manual: search the serial on Generac's Product Information / support page for the documents for that build.",
      "Information only - no corrective action."
    ],
    priority: "normal", confidential: true,
    source: "Generac PIB A0012860447 Rev A, Oct 2026"
  },
  {
    id: "gen-sib-a0013257462-pz410-fw", brand: "Generac", number: "A0013257462", docNo: "A0013257462", rev: "B", date: "2026-10", type: "Service",
    title: "PZ410 firmware 1.17 / 1.18 key-switch fault breaks the cool-down timer - go back to 1.16.02",
    applies: { genFamilies: [], controllers: ["Power Zone 410"], serialFrom: "3019065163", serialTo: "3020155210" },
    appliesText: "Power Zone 410 units on the D2.2 line listed in the bulletin's Appendix A (115 serials, 3019065163 to 3020155210 - not every serial in that range; confirm the exact serial against the list).",
    summary: "On these units PZ410 firmware 1.17 and 1.18 set a false key-switch fault that upsets the cool-down timer. The fix is PZ410 firmware 1.16 (D2.2L 1.16.02) from a USB drive.",
    steps: [
      "Confirm the serial is on the Appendix A list in GENservice.",
      "Load PZ410 firmware D2.2L 1.16.02 from a USB flash drive (dealer menu > Settings > Firmware Update; laptop to prepare the drive).",
      "NOTE: the bulletin's step list says to download '1.18 or above' - that line is copied from the XG uptime bulletin and contradicts its own fix. Follow the corrective action: 1.16.02.",
      "Warranty: new claim, A0013257462 as primary failed part and in comments, 0.25 hr + standard travel."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB A0013257462 Rev B, Oct 2026"
  },
  {
    id: "gen-sib-a0011691554-xg-uptime", brand: "Generac", number: "A0011691554", docNo: "A0011691554", rev: "A", date: "2026-07", type: "Service",
    title: "Protector XG uptime fix: firmware, push-button shutdown switch, 2099 resistor harness",
    applies: { genFamilies: [], controllers: ["Power Zone 410"], codes: ["1902", "2099", "2101", "2670", "2801", "3401", "5100"], serialFrom: "3015915994", serialTo: "3019510564" },
    appliesText: "Protector XG Series units listed in the bulletin's appendix (61 serials, 3015915994 to 3019510564 - confirm the exact serial against the list) that have logged 1902, 2099, 2101, 2670, 2801, 3401 or 5100.",
    summary: "Listed XG units with uptime codes get three fixes in one visit: new ECM and PZ410 firmware, the rocker shutdown switch swapped for a push-button kit, and the 2099 resistor harness if the mis-wire alarm is a verified nuisance.",
    steps: [
      "Firmware from a USB drive: ECM first (G11AE30102 or newer, dealer menu > Edit Settings > ECU Firmware Update), then PZ410 (1.18 or newer, Settings > Firmware Update). If the serial is also on the A0013257462 list, that bulletin says to use PZ410 1.16.02 instead.",
      "Shutdown switch: test the old rocker shuts the unit down; MLCB locked OFF and battery negative off; drill a 1 in hole where the rocker was; fit kit G0099851 (bezel with o-ring, push button, non-polarized jumper harness); reconnect, test the new button, move the shutdown decal next to it.",
      "2099 mis-wire: check customer wiring is landed right and nothing is shorted. Verified nuisance only, with the unit fully de-energized: resistor harness A0010070719 between wires 194, 23 and ground at TB3.",
      "Warranty: new claim, A0011691554 as primary failed part, 'SIB XG Uptime' in comments, A0010070719 in purchased parts, 1.25 hr + one trip."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB A0011691554 Rev A, Jul 2026"
  },
  {
    id: "gen-sib-a0011009365-mixer", brand: "Generac", number: "A0011009365", docNo: "A0011009365", rev: "C", date: "2026-09", type: "Service",
    title: "Next Gen air-cooled mixer E-codes 3000, 3400s, 3500s",
    applies: { genFamilies: ["gen-generac-next-gen-10-28"], modelRe: ["^G00(72590|73240|72580|73230|72820|73270|73280|72600|73250|73260|73290|72610)$"], controllers: ["Power Zone 200"], codes: ["3000", "3400", "3500"] },
    appliesText: "Next Gen air-cooled HSB models G0072590, G0073240, G0072580, G0073230, G0072820, G0073270, G0073280, G0072600, G0073250, G0073260, G0073290, G0072610. Codes 3000, any 34xx, any 35xx.",
    summary: "Early-revision mixers cause nuisance mixer alarms on Next Gen units. Check grounds first; a mixer whose TTMAP sensor has no paint mark gets replaced.",
    steps: [
      "With a 3000 / 34xx / 35xx present, check every engine ground is tight: front engine foot 100 in-lb, back engine foot 100 in-lb, block near the back foot 14 ft-lb, grounds inside the controller box 40 in-lb.",
      "Any ground loose: torque it, check harness tightness, run the unit under load 5+ minutes. Code gone = done.",
      "Code returns or no loose ground: look at the TTMAP sensor on the mixer. White, green or purple paint dot = mixer is current, go to normal diagnostics in A0004542981 Rev E or newer. No dot = replace the mixer.",
      "Kits: A0007648329 ETC/mixer for 14-18 kW; A0007649028 ETC/mixer for 20-28 kW.",
      "Warranty: A0011009365 as primary failed part, 'Mixer Update' in comments, 0.75 hr + one trip; photo of the unmarked TTMAP sensor and a screenshot of the e-code or the claim is denied. Have the mixer on the truck - one trip is paid."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB A0011009365 Rev C, Sep 2026"
  },
  {
    id: "gen-sib25-22-h", brand: "Generac", number: "SIB25-22-H", docNo: "A0009577848", rev: "C", date: "2025-11", type: "Safety recall",
    title: "Inspect fuel shut-off valve (SOV) and sediment trap bolts - Next Gen",
    applies: { genFamilies: ["gen-generac-next-gen-10-28"], modelRe: ["^G00(72570|72580|72590|72600|72610|72820|73230|73240|73270|73280)$"], controllers: ["Power Zone 200"] },
    appliesText: "Next Gen models G0072570, G0072580, G0072590, G0072600, G0072610, G0072820, G0073230, G0073240, G0073270, G0073280 - only the serial numbers listed in the bulletin's Appendix A (about 3,600 serials). Check the serial against the list.",
    summary: "Cross-threaded bolts in the fuel shutoff assembly can leak fuel - fire risk. Torque-check the sediment trap bolts; if they will not hold 95 in-lb, replace the fuel system assembly.",
    steps: [
      "Already done? Carton sticker 'Whitewater' / 'Generac WW', or a green paint strip or gold bolts on the unit = inspected, install as normal (no reimbursement for re-inspecting).",
      "Unit OFF, fuel supply off, controller fuse out, battery disconnected, flex fuel line off the utility supply. Remove front and right intake panels and the intake baffle (one bolt, rotate to unlatch).",
      "Remove the two back-panel bolts to the sediment trap and the three bolts under the shutoff valves; swing the assembly out.",
      "Torque the sediment trap bolts to 95 in-lb holding the drip leg for even pressure. Either bolt will not reach 95 in-lb = replace the fuel shutoff assembly A0009578206 (hose must seat flush to the flange; hose clamp 78 in-lb).",
      "Torque reached: paint-mark both bolt heads, photograph the marks and the QR code for the claim. Reassemble: bracket bolts 84 in-lb, back-panel bolts 84 in-lb, baffle bolt 55 in-lb.",
      "Leak test with fuel on: flex connections, SOV-to-sediment-trap joint, then the hose connection with the unit running - one minute each with non-corrosive leak fluid. Any leak = replace the assembly and retest. Mark an X on the shutoff and photograph it with the serial.",
      "Warranty: A0009578206 primary part, 0.75 hr + one trip (installed) or 1.0 hr no trip (boxed), SIB25-22-H in comments, state passed or replaced, attach photos."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB25-22-H (A0009577848) Rev C, Nov 2025"
  },
  {
    id: "gen-sib-a0011065255-ats150", brand: "Generac", number: "A0011065255", docNo: "A0011065255", rev: "A", date: "2026-05", type: "Safety recall",
    title: "150A transfer switch G0099540 shipped with a 200A breaker",
    applies: { genFamilies: [], modelRe: ["^G0099540"], serialFrom: "3017695724", serialTo: "3017695923" },
    appliesText: "Transfer switch G0099540 only - the serials listed in Appendix A (they fall between 3017695724 and 3017695923; confirm the exact serial against the bulletin list). No Generac ATS family exists in the app - match on the model.",
    summary: "Some 150 A service-entrance transfer switches left the factory with a 200 A service-entrance breaker. Replace it with the 150 A breaker 0K0971.",
    steps: [
      "Remove utility and standby power. Open the cover, remove the deadfront, then the breaker cover 0K8414 (two screws).",
      "Remove the utility lugs from the breaker, the M8 contactor bus-bar screws from the bottom, and the two breaker mounting screws.",
      "Install the 150 A breaker 0K0971 on the subpanel; reinstall the bus bar and the lugs - M8 screws to 72 in-lb. Reinstall cover, deadfront, restore power.",
      "Tools: T20 star bit, 6 mm hex bit, torque wrench. Warranty: A0011065255 primary failed part, '150A circuit breaker' in comments, 2.0 hr."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB A0011065255 Rev A, May 2026"
  },
  {
    id: "gen-sib24-07-ac", brand: "Generac", number: "SIB24-07-AC", docNo: "A0005577521", rev: "A", date: "2024-02", type: "Service",
    title: "Generac spark plug A0002081582 causing running issues after install",
    applies: { genFamilies: BUL_GEN_AC_ALL },
    appliesText: "Any unit fitted with Generac spark plug A0002081582 (marked '2081582', 0.040 in gap) from shipments received up to 2/6/2024, or from maintenance kit G0064850 shipped 12/8/2023-2/6/2024. The bulletin names the plug, not engine models - check the plug / kit number.",
    summary: "A bad batch of Generac-branded plugs makes the engine harder to start after the first successful start and misfire periodically. If a unit runs worse right after a tune-up, suspect the plugs.",
    steps: [
      "Symptom right after a PM or plug change: harder restarts, periodic misfire. Pull the plugs and read the marking - '2081582'.",
      "Quarantine affected plugs 90 days; return stock via the GenService parts-return process; pull them out of PM kits and request no-charge replacements (Rescomdealerparts@generac.com with PM kit number, sales order and quantity).",
      "Field failure: new warranty claim on the generator serial, A0002081582 as primary causal part, 0.25 hr labor, 1 trip, reference SIB24-07-AC in comments."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB24-07-AC (A0005577521) Rev A, Feb 2024"
  },
  {
    id: "gen-sib14-11-all", brand: "Generac", number: "SIB14-11-ALL", docNo: "", rev: "B", date: "2017-02", type: "Service",
    title: "'Model Ident Problem' / 'Wiring Error' after a controller swap",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(BUL_GEN_POWERPACT), controllers: ["Evolution 1.0", "Evolution 2.0", "PowerPact"] },
    appliesText: "All Evolution and PowerPact air-cooled generators.",
    summary: "Replacing an Evolution or PowerPact controller without the right power-down / power-up order leaves a 'Model Ident Problem Fix Harness Resistor' (Evolution) or 'Wiring Error' (PowerPact) fault. The fix is the sequence, not a harness resistor.",
    steps: [
      "Pull the 7.5 A fuse. Turn off all utility voltage to the controller (N1, N2, T1). Disconnect battery negative, then positive, and remove the battery.",
      "Disconnect the whole harness from the old controller, fit the new controller, reconnect the whole harness.",
      "Clean the battery terminals and cable ends, reinstall the battery, positive then negative, snug - do not over-tighten.",
      "Install the 7.5 A fuse, restore N1/N2/T1, program the controller and verify generator and transfer switch operation."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB14-11-ALL Rev B, Feb 2017"
  },
  {
    id: "gen-sib17-01-aac", brand: "Generac", number: "SIB17-01-AAC", docNo: "", rev: "E", date: "", type: "Service",
    title: "Fuel plenum corrosion inspection at every maintenance (2008-2015 units)",
    applies: { genFamilies: ["gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22", "gen-ecogen-evo1-15", "gen-synergy-vscf-20", "gen-guardian-nexus-12-17", "gen-guardian-nexus-20", "gen-guardian-pre-nexus-2008-8-20"], builtFrom: "2008", builtTo: "2015" },
    appliesText: "13 kW and larger air-cooled units built 2008-2015 that have a fuel plenum (the box behind the regulator; Generac dropped it in 2015).",
    summary: "A corroded plenum can leak gas while the unit is starting and cause a fire. Inspect it at every scheduled maintenance; corrosion or any gas on the test = replace.",
    steps: [
      "Unit OFF, front panel and controller cover off, battery terminal covers on. Feel the plenum: rough, flaking or bubbled = replace it.",
      "Gas test: take wire 14 off the fuel solenoid, run a remote switch from the open solenoid terminal to battery +, hold a gas detector by the regulator and plenum and close the switch. Any gas = pull the fuel assembly and find the leak.",
      "An endoscope down the rear corners of the battery compartment and above the battery shows the plenum surface and weld seam without teardown - any corrosion = replace.",
      "Plenums: 0G7581 (1/2 in inlet, before MY2013), 0J8312 (3/4 in, 20/22 kW 2013+), 0J9045 (1/2 in, 2013+ under 20 kW).",
      "Corrosion is a site problem: debris around plenum/regulator, sprinklers, downspout within 36 in, eave with no gutter, plants within 18 in behind / 36 in at the sides, bad pad, poor drainage. Tell the homeowner."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB17-01-AAC Rev E (dealer bulletin; as cited in the app's generator tips)"
  },
  {
    id: "gen-sib17-20-aac", brand: "Generac", number: "SIB17-20-AAC", docNo: "", rev: "A", date: "", type: "Service",
    title: "Hunting / surging on 16-22 kW Evolution units (990/999 engine)",
    applies: { genFamilies: ["gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22", "gen-guardian-evo2-9-22", "gen-guardian-evo2-10-22-compact", "gen-guardian-evo2-10-26", "gen-guardian-evo2-response-16-22", "gen-guardian-evo2-dr-11-20"] },
    appliesText: "16 / 20 / 22 kW Evolution units with the 990 / 999 cc engine.",
    summary: "Idle hunting with no load that stays within 58-62 Hz is within design, worse in heat and humidity. Outside 58-62 Hz, or under load, it needs diagnosis - and never modify the air box.",
    steps: [
      "Within design: 58-62 Hz at no load; lid open, side panel off or a dirty air filter also makes it hunt. Low-speed exercise avoids it during exercise.",
      "Needs diagnosis: fuel pin set for the fuel in use; fuel pressure static / cranking / running with no more than 1 in H2O drop no-load to full-load and never above the manual's maximum; pipe size and flex line straight; throttle linkage free; no kinked internal fuel line regulator-to-mixer.",
      "Test 12 - stepper motor cycles on start; Test 60 - magnetos and the wire 18 signal; run on one cylinder at a time and compare; check valve lash.",
      "Never drill holes or break baffles out of the air box, and never fit an aftermarket air filter (see also SIB17-21-AAC date codes)."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB17-20-AAC Rev A (dealer bulletin; as cited in the app's generator tips)"
  },
  {
    id: "gen-sib17-21-aac", brand: "Generac", number: "SIB17-21-AAC", docNo: "10000023991", rev: "A", date: "2017-11", type: "Service",
    title: "Air filter 0J8478 date codes that cause hunting",
    applies: { genFamilies: BUL_GEN_990_999 },
    appliesText: "Guardian 16 / 20 / 22 kW, Guardian 10 / 13 / 20 kVA 50 Hz, Synergy 20 kW, EcoGen 15 kW, and Honeywell / Eaton / Siemens 16 / 20 / 22 kW product using air filter 0J8478.",
    summary: "Filters labeled C_6 through CC7 (Jan 2016-Mar 2017) can make the generator hunt loaded or unloaded. If hunting persists after SIB17-20-AAC diagnostics, read the filter date code.",
    steps: [
      "Work SIB17-20-AAC first. Hunting still there: read the date code on the 0J8478 filter - codes ending in 6, or CA7 / CB7 / CC7, get replaced with CD7 or later (month letter A=Jan, B=Feb, C=Mar, D=Apr; year 6=2016, 7=2017).",
      "Replacement filters are no charge from the Generac residential parts team; change at the next service interval - no warranty implied.",
      "Do not drill the air box or break baffles (emissions violation, legal exposure) and never use aftermarket filters - Generac will not cover damage from them."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB17-21-AAC (10000023991) Rev A, Nov 2017"
  },
  {
    id: "gen-pib14-06-8ac", brand: "Generac", number: "PIB14-06-8AC", docNo: "", rev: "C", date: "2014-03", type: "Product",
    title: "RPM sense loss alarms on 8 kW Evolution units",
    applies: { genFamilies: ["gen-guardian-evo1-8"], modelRe: ["^G00(62370|62450|62510|62630|62690|67720)"], controllers: ["Evolution 1.0"] },
    appliesText: "8 kW Evolution models 6237-0, 6245-0, 6251-0, 6263-0, 6269-0 and 6772-0 that show intermittent RPM sense loss on startup.",
    summary: "Certain 8 kW Evolution units drop RPM sense loss intermittently at startup. Fix is firmware 1.09+ plus a new regulator, fuel pin and grommets (kit 0K80950SRV) - only on units showing the symptom.",
    steps: [
      "Load firmware 1.09 or higher by flash drive (procedure PIB14-04-AG).",
      "Install the new fuel regulator and leak-check. Fit the new grommets on the new fuel pin; insert the pin with the jets facing the sides of the enclosure, press to the stop, turn 90 degrees, press again (~3/4 in) until flush with the mixer - wrong orientation shreds the grommets.",
      "NG: turn the conversion knob to LP and back to NG to seat it; LP: set to LP. Test in AUTO mode only - the programming change affects AUTO starts.",
      "Warranty 0.5 diag + 0.7 labor: photos of the data tag and the latest RPM sense loss in the alarm log, plus the alarm/run log sheet, 'Repairs performed per PIB14-06-8AC' in comments - or the claim is denied."
    ],
    priority: "normal", confidential: true,
    source: "Generac PIB14-06-8AC Rev C, Mar 2014"
  },
  {
    id: "gen-sib15-15-hfw1-09", brand: "Generac", number: "SIB15-15-HFW1.09", docNo: "", rev: "A", date: "2015-08", type: "Service",
    title: "8 kW Evolution firmware 1.09+ start and load-acceptance behavior",
    applies: { genFamilies: ["gen-guardian-evo1-8"], controllers: ["Evolution 1.0"], codes: ["1101", "1603", "2102", "2103"] },
    appliesText: "8 kW HSB air-cooled generators with Evolution control boards running firmware 1.09 or higher.",
    summary: "Firmware 1.09 changed how the 8 kW starts and takes load; the new behaviors and codes are not faults. Preventive firmware upgrades are not warranty - do them at the next maintenance.",
    steps: [
      "Normal: secondary throttle held until 3600 rpm (opens slowly for 10 s if not reached in 30 s); crank limited to 10 tries; 6-second transfer timer at speed; voltage/frequency checks after transfer.",
      "Loaded and low voltage/frequency: AVR disabled 30 s, then retry - 10 attempts then Overload 2103. Loaded and stalled: 5 recranks then Overload 2102.",
      "Codes: 1101 Overcrank (10 tries, protects the starter), 1603 Underspeed, 2102 / 2103 Overload Remove Load.",
      "SAFETY: after this firmware the unit can start with the fuse removed - disable it properly (fuse, T1, battery negative) before working on it."
    ],
    priority: "info", confidential: true,
    source: "Generac SIB15-15-HFW1.09 Rev A, Aug 2015"
  },
  {
    id: "gen-sib15-17-hac-bc", brand: "Generac", number: "SIB15-17-HAC BC", docNo: "", rev: "B", date: "2015-10", type: "Service",
    title: "Positive battery cable 0J9419B with the wrong terminal end",
    applies: { genFamilies: ["gen-guardian-evo1-8", "gen-guardian-evo1-11", "gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22"], modelRe: ["^G00(62370|62450|62573|62602|64371|64391|64401|64421|64592|64622|65512|65521|65532|65561|67011|67021)"], serialFrom: "9834301", serialTo: "9913321" },
    appliesText: "8-22 kW HSB, S/N 9834301-9913321, models 0062370, 0062450, 0062573, 0062602, 0064371, 0064391, 0064401, 0064421, 0064592, 0064622, 0065512, 0065521, 0065532, 0065561, 0067011, 0067021.",
    summary: "The RED positive cable may carry a negative-type terminal that will not clamp the positive post. Check before install.",
    steps: [
      "Look at the red cable's terminal end: a stamped + symbol = good. A stamped - symbol = STOP, do not use it; order 0J9419B and file a warranty claim (0.5 hr, done before install)."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB15-17-HAC BC Rev B, Oct 2015"
  },
  {
    id: "gen-sib10-13-hac", brand: "Generac", number: "SIB10-13-HAC", docNo: "10000010955", rev: "B", date: "2017-03", type: "Service",
    title: "7 / 8 kW 410cc intermittent low oil pressure alarm (camshaft wave washer)",
    applies: { genFamilies: ["gen-guardian-pre-nexus-2008-8-20"], modelRe: ["^G00(54720|55010|55180|55181|55260|55340|56100|55560|58320)"], serialFrom: "5262070", serialTo: "5860029" },
    appliesText: "7 and 8 kW 410cc single-cylinder generators 5472-0, 5501-0, 5518-0, 5518-1, 5526-0, 5534-0, 5610-0, 5556-0, 5832-0; S/N 5262070-5860029. Only model 5501-0 (G0055010) is in the app's lists; the others are not catalogued.",
    summary: "Repeated low-oil-pressure shutdowns on engines that actually have good oil pressure. Cause is the camshaft wave washer; fix is kit 0J09950SRV (gaskets, wave washer, rotor bolt) with engine teardown.",
    steps: [
      "Drain oil, remove the engine (0G9266 Major Disassembly p.156-162), pull spark plug, dipstick, valve cover, loosen rocker jam nut and pivot stud, remove pushrods.",
      "Remove the crankcase cover (8 bolts), align the timing marks, push the tappets in and remove the camshaft and the wave washer on the cam bore flange - find every piece (it may be in the sump or around the cam journal). Remove oil pump inner and outer rotors.",
      "New wave washer on the cam bore flange, cam in with timing marks aligned, new cover gasket, oil the journals, a dab of grease holds the inner rotor; cover drops on - DO NOT FORCE. Cover bolts 18 ft-lb in the sequence shown; crank must turn freely.",
      "Pushrods in, valve lash 0.002-0.004 in at TDC compression (0G9266 p.142-143), valve cover 4 ft-lb in pattern. Refit, refill oil."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB10-13-HAC (10000010955) Rev B, Mar 2017"
  },
  {
    id: "gen-pib15-06-acg", brand: "Generac", number: "PIB15-06-ACG", docNo: "", rev: "A", date: "2015-12", type: "Product",
    title: "Synergy / EcoGen (G-Flex) install steps: firmware, fuel hoses, AVR wire routing",
    applies: { genFamilies: ["gen-synergy-vscf-20", "gen-ecogen-evo1-15"], modelRe: ["^G00(60550|60980|61030)"] },
    appliesText: "Air-cooled Synergy and EcoGen generators with G-Flex. Fuel hose replacement only on model 0060550 S/N 9149769-9149864 and 9248192-9248335, model 0060980 S/N 9149865-9149960, model 0061030 S/N 9135362-9135369.",
    summary: "Three extra steps on these units: firmware 1.12 or higher, fuel hoses on the listed serials, and AVR wires routed away from the exhaust so they do not melt.",
    steps: [
      "Install firmware 1.12 or higher (download/flash-drive procedure in PIB14-04-AG).",
      "Listed serials: replace both fuel hoses with 0K8830 (qty 2) - slide the spring clamps, swap hoses on the barbed fittings (0K9138 Major Disassembly).",
      "Verify AVR wiring is routed away from the exhaust system.",
      "Warranty: 1 hr labor and diagnostics, 1 trip, parts."
    ],
    priority: "normal", confidential: true,
    source: "Generac PIB15-06-ACG Rev A, Dec 2015"
  },
  {
    id: "gen-sib23-39-h", brand: "Generac", number: "SIB23-39-H", docNo: "A0005389623", rev: "A", date: "2024-07", type: "Service",
    title: "Replacement harness with four customer terminals - add the charger neutral wire",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(BUL_GEN_NEXTGEN) },
    appliesText: "60 Hz Guardian series air-cooled home standby generators receiving a replacement wiring harness with four customer-connection terminals (N1, N2, T1 plus 00) in place of three.",
    summary: "New replacement harnesses carry a dedicated neutral terminal for the battery charger. On an older unit you have to add a wire from the neutral bar to the Neut/00 position or the charger circuit has no neutral.",
    steps: [
      "Generator MLCB OFF, unit OFF, utility MLCB OFF, 7.5 A fuse out, customer connections panel off.",
      "Make a ~16 in white 18 ga 300 V stranded wire, stripped one end, 1/4 in ring terminal the other. Ring terminal under the neutral bar lug nut, 27-33 in-lb.",
      "Route along the side of the connection panel and land the bare end in the Neut / 00 position; secure. Panel on, fuse in, generator MLCB ON, utility MLCB ON, AUTO."
    ],
    priority: "normal", confidential: true,
    source: "Generac SIB23-39-H (A0005389623) Rev A, Jul 2024"
  },
  {
    id: "gen-pib22-13-g", brand: "Generac", number: "PIB22-13-G", docNo: "A0003882716", rev: "A", date: "2023-03", type: "Product",
    title: "Alternative neutral (00) connections with 10- or 13-conductor tray cable",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(BUL_GEN_NEXTGEN) },
    appliesText: "60 Hz Guardian series air-cooled home standby generators (information only).",
    summary: "What to do when the AHJ wants the 00 neutral run separately from the generator neutral conductor, for units with 00 on the neutral bus bar or a 4-position terminal block.",
    steps: [
      "Default: wire per the installation manual. If the AHJ requires an independent 00 neutral, it must run in the same raceway / cable as the feeder and control conductors (NEC).",
      "10-conductor cable, 00 on the neutral bar: remove the white 00 wire from the generator neutral bar, butt-splice (18 AWG) or wire-nut it to the extra neutral wire, land that on top of the transfer switch neutral bar with a #8 ring terminal.",
      "13-conductor TC-ER-JP cable: splice the generator's white 00 wire to the cable's white-with-blue-stripe wire the same way, land it on the transfer switch neutral bar.",
      "4-position terminal block: land the white/blue-stripe wire on the block position marked NEU and bond the other end to the transfer switch neutral bar."
    ],
    priority: "info", confidential: true,
    source: "Generac PIB22-13-G (A0003882716) Rev A, Mar 2023"
  },
  {
    id: "gen-pib22-04-h", brand: "Generac", number: "PIB22-04-H", docNo: "A0003105081", rev: "A", date: "2022-08", type: "Product",
    title: "Air-cooled high altitude kits (over 2,000 ft)",
    applies: { genFamilies: BUL_GEN_EVO_AC },
    appliesText: "All air-cooled home standby units; the bulletin's table lists kits by model for 8-26 kW Guardian / Honeywell / Eaton / Siemens / Centurion / EcoGen / Response units (families 8 kW 410, 9 kW 426, 11 kW 530, 15-17 kW 990, 16-26 kW 999).",
    summary: "Above 2,000 ft (610 m) a high-altitude kit may be required by EPA rules; the wrong engine configuration raises emissions and hurts performance. Kits are matched to the model - look the model up in the bulletin table.",
    steps: [
      "Job site over 2,000 ft: check whether the unit has the kit. Kit model numbers in the table: G0072940 (A0002789944), G0072950 (0J4930A, 11 kW/530), G0072970 and G0072980 (0K3661), G0073010 (26 kW), G0073020 (16 kW/999), G0073030, G0073040 (22 kW/999), G0073050, G0073060 (Response 16 kW and 20 kW compact).",
      "Match the generator model number to the kit in the table - the mapping is by exact model, do not assume by kW."
    ],
    priority: "info", confidential: true,
    source: "Generac PIB22-04-H (A0003105081) Rev A, Aug 2022"
  },
  {
    id: "gen-pib21-05-hac", brand: "Generac", number: "PIB21-05-HAC", docNo: "A0001599811", rev: "A", date: "2021-08", type: "Product",
    title: "Use only Generac air filter elements (UL flammability rating)",
    applies: { genFamilies: BUL_GEN_AC_ALL },
    appliesText: "All air-cooled home standby units.",
    summary: "Non-Generac filter elements can void the unit's UL flammability rating - Generac filters carry flame retardant. Fit the exact replacement from the owner's / parts manual.",
    steps: ["At PM, use the Generac part listed for the model; do not substitute aftermarket elements."],
    priority: "info", confidential: true,
    source: "Generac PIB21-05-HAC (A0001599811) Rev A, Aug 2021"
  },
  {
    id: "gen-pib21-12-g", brand: "Generac", number: "PIB21-12-G", docNo: "A0002275775", rev: "A", date: "2022-01", type: "Product",
    title: "Generac 5W-20 Geo synthetic oil replaces 5W-30 for HSB",
    applies: { genFamilies: BUL_GEN_AC_ALL.concat(BUL_GEN_LC) },
    appliesText: "All residential and commercial products with air-cooled and liquid-cooled gaseous engines under 150 kW.",
    summary: "From early 2022 Generac's HSB oil is the 5W-20 Geo full synthetic; 5W-30 synthetic is no longer offered for home standby (it stays for portables). A milky, evenly emulsified look is the oil holding moisture as designed - beaded or pooled free water is the bad sign.",
    steps: [
      "Stock 5W-20 Geo for home standby PMs (1 qt, 5 qt, case, drum). 10W30 / SAE30 / 30W mineral SKUs were discontinued.",
      "Evenly milky oil on this blend = emulsion doing its job; free water beading or pooling = corrosion risk, address it."
    ],
    priority: "info", confidential: true,
    source: "Generac PIB21-12-G (A0002275775), Jan 2022"
  },
  {
    id: "gen-pib22-12-z", brand: "Generac", number: "PIB22-12-Z", docNo: "A0003851011", rev: "A", date: "2022-12", type: "Product",
    title: "HUIO board setup and diagnostics (H-Panel, G-Panel, Evolution)",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(["gen-generac-protector-rg-evolution", "gen-generac-protector-sg-h100"]), controllers: ["Evolution", "H-Panel", "G-Panel"] },
    appliesText: "All units using H-Panel, G-Panel or Evolution controllers with a HUIO (hardwired user I/O) board. Information only.",
    summary: "HUIO Modbus address comes from the two DIP switches; Evolution units need both switches OFF. Terminate the RS-485 bus at the last board.",
    steps: [
      "Evolution: both Modbus switches OFF. H-Panel / G-Panel: switches set the address - OFF/OFF=1, OFF/ON=2, ON/OFF=3, ON/ON=4 (HUIO 1-4); see manual 0G5354.",
      "If the HUIO is the last device on the 485 bus, jumper Jmp1 pins 2-3 to put the 120 ohm terminator in. Board has 4 inputs with grounds, 4 outputs, 12 V power, LEDs 1-4."
    ],
    priority: "info", confidential: true,
    source: "Generac PIB22-12-Z (A0003851011) Rev A, Dec 2022"
  },
  {
    id: "gen-tib24-01-aac", brand: "Generac", number: "TIB24-01-AAC", docNo: "A0007324237", rev: "A", date: "2025-02", type: "Training",
    title: "Stepper motor chatter / buzz during shutdown is normal (HW 1.04 / FW 1.18+)",
    applies: { genFamilies: BUL_GEN_EVO_AC, controllers: ["Evolution 1.0", "Evolution 2.0"] },
    appliesText: "Air-cooled home standby product with Evolution controllers at hardware 1.04 / firmware 1.18 or later.",
    summary: "On this firmware the stepper motor keeps chattering briefly after the unit is turned off. That is normal operation - not a stepper or controller fault.",
    steps: ["Customer complaint of a buzz after shutdown: check the controller firmware; 1.18 or later = no action."],
    priority: "info", confidential: true,
    source: "Generac TIB24-01-AAC (A0007324237) Rev A, Feb 2025"
  },
  {
    id: "gen-sib17-19-aac", brand: "Generac", number: "SIB17-19-AAC", docNo: "10000018829", rev: "A", date: "2017-10", type: "Service",
    title: "Check and update controller firmware before diagnosing or claiming",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(["gen-generac-protector-rg-evolution"]), controllers: ["Evolution 1.0", "Evolution 2.0", "Sync 2.0", "Sync 3.0"] },
    appliesText: "Air-cooled and commercial liquid-cooled product using Evolution, Evolution 2.0 and Sync 2.0 / 3.0 controllers.",
    summary: "Best practice: check the firmware and update if needed before diagnostics or a warranty claim, at install, and at every maintenance visit. The update itself is never a warranty item.",
    steps: ["Latest firmware and its change list are on GENservice (Service Documents > firmware folders). Do not claim the update as warranty labor."],
    priority: "info", confidential: true,
    source: "Generac SIB17-19-AAC (10000018829) Rev A, Oct 2017"
  },
  {
    id: "gen-pib14-04-ag", brand: "Generac", number: "PIB14-04-AG", docNo: "", rev: "C", date: "2023-12", type: "Product",
    title: "Firmware download and flash-drive procedure, Evolution bootloader LEDs",
    applies: { genFamilies: BUL_GEN_EVO_AC.concat(["gen-generac-protector-rg-evolution"]), controllers: ["Evolution 1.0", "Evolution 2.0", "Evolution (liquid-cooled)"] },
    appliesText: "All air-cooled Evolution and liquid-cooled Protector-controlled generators.",
    summary: "Only tested flash drives, FAT32, one firmware file in the root. The LED pattern at boot tells you whether the controller found, rejected or is loading the Evo.gen file.",
    steps: [
      "Drives: SanDisk Ultra Backup 32 GB or smaller, or Gorilla Drives 32 GB or smaller. Format FAT32 (exFAT will not work). Never double-click / open the firmware file - it corrupts.",
      "Copy the firmware file(s) to the root of the drive - no subfolders. Insert at the controller; blue Manual LED flashes, then green Auto flashes - once for firmware, twice for firmware plus hardware files.",
      "After the update run the Install Wizard (fuel, time, date) and simulate an outage.",
      "Bootloader: blue flashing with no app = put a valid Evo.gen in the root; blue then green then repeat = controller flash is bad, replace; blue + red = retry the drive / recopy / another drive; 'Invalid File' = renamed file; 'Corrupted File' = failed CRC; 'Unsupported Device' = wrong drive or over-current (resets in ~50 s). Only one file in root or the boot times out and runs the old code."
    ],
    priority: "info", confidential: true,
    source: "Generac PIB14-04-AG Rev C, Dec 2023"
  },
  {
    id: "gen-tib14-05-aacg", brand: "Generac", number: "TIB14-05-AACG", docNo: "", rev: "A", date: "2014-06", type: "Training",
    title: "Exercise features: weekly / bi-weekly / monthly, 5-minute low-speed exercise (FW 1.10+)",
    applies: { genFamilies: BUL_GEN_EVO1, controllers: ["Evolution 1.0"] },
    appliesText: "Evolution-controlled air-cooled generators with firmware 1.10 or higher.",
    summary: "Firmware 1.10 added weekly / bi-weekly / monthly exercise, put the choice in the install wizard, and cut exercise to 5 minutes at low speed on 16-22 kW. 8-11 kW and 50 Hz still exercise 12 minutes at 3600 rpm.",
    steps: [
      "16 / 20 kW: ~2400 rpm, 5 min. 22 kW: 1950 rpm, 5 min. 8 / 11 kW and 50 Hz 8 / 10 / 13 kVA: 3600 rpm, 12 min. No load transfer during exercise unless utility is lost.",
      "Exercise only runs in AUTO. Date/time must be reset any time battery + T1 power, or fuse + T1, were disconnected - or the exercise will not run."
    ],
    priority: "info", confidential: true,
    source: "Generac TIB14-05-AACG Rev A, Jun 2014"
  },
  {
    id: "gen-sib14-03-aall", brand: "Generac", number: "SIB14-03-AALL", docNo: "", rev: "A", date: "2014-02", type: "Service",
    title: "Field boost diode test - use the corrected procedure",
    applies: { genFamilies: BUL_GEN_EVO1.concat(BUL_GEN_NEXUS), controllers: ["Evolution 1.0", "Nexus"] },
    appliesText: "Nexus and Evolution air-cooled generators.",
    summary: "Some documentation printed the field boost diode test wrong. Use 0H9172 Rev G or higher: Test FB3 (Evolution) or Test FB4 (Nexus).",
    steps: ["Before condemning a field boost diode, run the test from 0H9172 Rev G+ (FB3 Evolution / FB4 Nexus), not an older manual."],
    priority: "info", confidential: true,
    source: "Generac SIB14-03-AALL Rev A, Feb 2014"
  },
  {
    id: "gen-sib13-06-aac", brand: "Generac", number: "SIB13-06-AAC", docNo: "", rev: "B", date: "2013-06", type: "Service",
    title: "How to find the source of an oil leak on air-cooled units",
    applies: { genFamilies: BUL_GEN_AC_ALL },
    appliesText: "All air-cooled home standby units.",
    summary: "Check for overfill first, clean everything, then run it and use dye / UV (new units ship with UV dye in the oil). Each leak source has a signature - running vs. off, seep vs. spray.",
    steps: [
      "Dipstick first - overfill leaks. Clean the engine with non-chlorinated brake cleaner, look for fresh oil; if dry when OFF, run in MANUAL with oil at the full mark and watch the direction it comes from. Inspection mirror and flashlight for tight spots.",
      "Crank seals: heavy, far worse running; front seal gets blown over the engine by the flywheel fan, rear seal fills the stator. Breather: running only (gasket, failed breather, backed-out screws). Case gasket: slow seep running and off - confirm with dye, check case bolt torque.",
      "Low oil switch, oil filter and filter adapter gasket (8/10 kW): slow off, heavier running under pressure. Oil cooler hoses / Oetiker clamps / brass fittings. Drain hose, fitting or cap. Rear drain plugs on pre-Nexus 410/990 engines.",
      "Head gasket: running only, may fail a leak-down test and leave oil at the exhaust. Valve cover gasket: running, small drips after. Dipstick tube O-ring: seeps at the tube base running.",
      "Oil blown everywhere = below the blower housing (housing and maybe flywheel off); oil in the alternator but not from the flywheel side = rotor/stator out."
    ],
    priority: "info", confidential: true,
    source: "Generac SIB13-06-AAC Rev B, Jun 2013"
  },
  {
    id: "gen-sib12-04-eacg", brand: "Generac", number: "SIB12-04-EACG", docNo: "", rev: "B", date: "2012-05", type: "Service",
    title: "GT530 crankcase breather installation - new screws and torque",
    applies: { genFamilies: BUL_GEN_530 },
    appliesText: "Any Generac product using the GT530 air-cooled engine.",
    summary: "When servicing or replacing the GT530 breather assembly, clean the bolt holes, use the new screws and torque them evenly.",
    steps: ["Spray-degrease the bolt holes and let dry. Replace screws 0C8566 (2) with 0J9667 (2). Tighten gradually, alternating, to 30 in-lb (3.39 Nm)."],
    priority: "info",
    source: "Generac SIB12-04-EACG Rev B, May 2012"
  },
  {
    id: "gen-sib11-09-aac", brand: "Generac", number: "SIB11-09-AAC", docNo: "", rev: "", date: "2011-05", type: "Service",
    title: "Magneto installation - still backfires after both magnetos replaced",
    applies: { genFamilies: ["gen-guardian-nexus-10-11", "gen-guardian-nexus-12-17", "gen-guardian-nexus-20", "gen-guardian-evo1-11", "gen-guardian-evo1-13-17", "gen-guardian-evo1-20-22", "gen-ecogen-evo1-15", "gen-synergy-vscf-20", "gen-guardian-pre-nexus-2008-8-20", "gen-guardian-pre-nexus-legacy-7-18"] },
    appliesText: "All air-cooled home standby units using magnetos 0G3224A (short lead) and 0G3224B (long lead) - the V-twin engines of that era. Check the magneto part number on later units.",
    summary: "Backfire after a magneto job usually means the two magnetos are swapped. Each has its own part number and goes on a specific cylinder.",
    steps: [
      "Cylinder 1 is the BACK cylinder, cylinder 2 the FRONT. Short plug wire (0G3224A) on cylinder 1 (back); long plug wire (0G3224B) on cylinder 2 (front).",
      "Both plug wires point to the back of the enclosure and the shutdown terminals sit nearest the cylinder head. Magneto-to-flywheel gap 0.010 in."
    ],
    priority: "info",
    source: "Generac SIB11-09-AAC, May 2011"
  },
  {
    id: "gen-sib11-19-acg", brand: "Generac", number: "SIB11-19-ACG", docNo: "", rev: "", date: "2011-08", type: "Service",
    title: "Shutting a home standby down and restarting it under load (extended outage)",
    applies: { genFamilies: BUL_GEN_AC_ALL },
    appliesText: "All air-cooled home standby product.",
    summary: "Stopping or starting a generator with load connected can damage the generator and the loads. Isolate the house panel first, cool down unloaded, and pull the 7.5 A fuse if it will sit more than an hour without utility.",
    steps: [
      "Stop: open the main service entrance breaker at the house panel; generator main breaker OFF (and the 15 A outlet breaker if used); run 1 minute unloaded to cool; switch to OFF. Off more than 1 hour with no utility: remove the 7.5 A main fuse so the panel does not drain the battery.",
      "Start: refit the fuse (startup wizard asks time/date, no activation code; 2008-mid 2010 units show 'Utility Not Present' - press Escape several times to skip the utility test); switch to AUTO; 15 s warm-up; main breaker ON; outlet breaker ON; then close the house main.",
      "This order keeps transfer correct if utility returns while the generator is off."
    ],
    priority: "info",
    source: "Generac SIB11-19-ACG, Aug 2011"
  },
  {
    id: "gen-sib11-25-mall", brand: "Generac", number: "SIB11-25-MALL", docNo: "", rev: "", date: "2012-01", type: "Service",
    title: "Milky oil (condensation) on turbocharged 2.4L gaseous units",
    applies: { genFamilies: ["gen-generac-protector-rg-evolution", "gen-generac-protector-qt-nexus", "gen-generac-protector-rg-legacy-3600"] },
    appliesText: "Turbocharged 2.4L gaseous units (the 32-60 kW turbo Protector / QT sizes; the naturally aspirated 2.4L units are not named).",
    summary: "Weekly no-load exercise never gets the oil hot enough to boil off moisture, so a tan / milky film shows up under the fill cap and in the breather. Not harmful if managed - run it under load periodically.",
    steps: [
      "Run at 50-75% of rated load for about an hour: open the service disconnect to simulate an outage so the ATS transfers and the building loads it; add lights / HVAC as needed without overloading; close the disconnect to retransfer and cool down.",
      "Frequency depends on climate - monthly in cool humid areas, quarterly or semi-annually elsewhere. Wipe the inside of the fill cap and dipstick when checking; that is where it shows first."
    ],
    priority: "info",
    source: "Generac SIB11-25-MALL, Jan 2012"
  },
  {
    id: "gen-sib18-18-ibatt", brand: "Generac", number: "SIB18-18-IBATT", docNo: "10000043127", rev: "A", date: "2018-09", type: "Service",
    title: "Battery charger 0F1740C - test before condemning it",
    applies: { genFamilies: ["gen-generac-protector-qt-nexus", "gen-generac-protector-sg-h100"] },
    appliesText: "All industrial liquid-cooled units with the 12 VDC 10 A battery charger 0F1740C.",
    summary: "Chargers get replaced for battery problems. Load the battery and watch charger current and battery recovery before blaming the charger.",
    steps: [
      "Load the battery with a battery load tester - bad battery = replace it first.",
      "With the battery loaded, the controller Engine screen should show 8-10 A charger output and the charger's yellow LED on. No current: check battery and charger connections; secure = replace the charger.",
      "Remove the load; battery should recover to 12.6-12.7 VDC on the Engine screen. If not, disconnect the cables and load-test the battery alone; still no recovery = replace the battery."
    ],
    priority: "info", confidential: true,
    source: "Generac SIB18-18-IBATT (10000043127) Rev A, Sep 2018"
  },
  {
    id: "gen-sib16-01-i90n", brand: "Generac", number: "SIB16-01-I90N", docNo: "10000002093", rev: "A", date: "2016-06", type: "Service",
    title: "Intermittent stuck throttle alarm - Bosch governor driver 0E3161 rev F",
    applies: { genFamilies: [], serialFrom: "9952357", serialTo: "300033742" },
    appliesText: "Certain 12 V generators with governor driver module 0E3161 rev F installed, S/N 9952357-300033742. The bulletin does not name models; the 'I90N' suffix points to industrial 9.0L units, so no app family is attached.",
    summary: "Low voltage at the driver during start-up can trip a stuck throttle alarm. Fix is a diode in series in wire 14 to the governor driver.",
    steps: [
      "Parts: GI756 6 A diode 049903, two 22-18 butt splices 051899, heat shrink 067553. Pull fuse F2, unplug the Deutsch connector from the Bosch driver, find wire 14 (GD-4).",
      "Cut wire 14 ~3 in from the connector, strip 1/4 in, butt-splice the diode in with the cathode (stripe) toward the connector, heat-shrink over the whole thing, reconnect, fuse F2 in, test run.",
      "Warranty: parts, 0.5 hr diagnostics, 0.25 hr labor, travel."
    ],
    priority: "info", confidential: true,
    source: "Generac SIB16-01-I90N (10000002093) Rev A, Jun 2016"
  },
  {
    id: "gen-sib-a0013147290", brand: "Generac", number: "SIB A0013147290", docNo: "A0013147290", rev: "B", date: "2026-11", type: "Service",
    title: "Rework pushrod guide plates and pushrods on the 817 cc engine (14 / 18 kW Next Gen)",
    applies: { genFamilies: ["gen-generac-next-gen-10-28"], modelRe: ["^G?00(7258|7259|7323|7324)0?$"],
      serialRanges: [
      ["3019604370", "3019604871"], ["3019677986", "3019677989"], ["3019677991", "3019678235"], ["3019949237", "3019949486"],
      ["3019949495", "3019949744"], ["3019653181", "3019653344"], ["3019653346", "3019653360"], ["3019653606", "3019653785"],
      ["3019653825", "3019654004"], ["3019655865", "3019655944"], ["3019655961", "3019655983"], ["3019655985", "3019656140"],
      ["3019678889", "3019679018"], ["3019679020", "3019679053"], ["3019679055", "3019679068"], ["3019679070", "3019679071"],
      ["3019679073", "3019679148"], ["3019679151", "3019679238"], ["3019679240", "3019679410"], ["3019600186", "3019600242"],
      ["3019600244", "3019600244"], ["3019600247", "3019600435"], ["3019609410", "3019609518"], ["3019609522", "3019609631"],
      ["3019609633", "3019609634"], ["3019609636", "3019609660"], ["3019953833", "3019953835"], ["3019953837", "3019953837"],
      ["3019953844", "3019953844"], ["3019953846", "3019953849"], ["3019953851", "3019953851"], ["3019953853", "3019953853"],
      ["3019953855", "3019953860"], ["3019953864", "3019953864"], ["3019953866", "3019953869"], ["3019953871", "3019953884"],
      ["3019953887", "3019953887"], ["3019953895", "3019953913"], ["3019953915", "3019953916"], ["3019953919", "3019953919"],
      ["3019953921", "3019954062"], ["3019954064", "3019954082"], ["3019954087", "3019954135"], ["3019954137", "3019954149"],
      ["3019954151", "3019954166"], ["3019954168", "3019954210"], ["3019954212", "3019954212"], ["3019954216", "3019954216"],
      ["3019954220", "3019954250"], ["3019954252", "3019954336"], ["3019653378", "3019653577"], ["3019682226", "3019682525"],
      ["3019682530", "3019682770"], ["3019682772", "3019682829"], ["3019682831", "3019682937"], ["3019682939", "3019682960"],
      ["3019682962", "3019683130"], ["3019683135", "3019683434"]
      ] },
    appliesText: "Only these Next Gen 817 cc units: G0072580 (14 kW), G0072590 (18 kW), G0073230 (14 kW with switch) and G0073240 (18 kW with switch), and only the serial numbers listed in the bulletin's Appendix A (the serial check here uses that list). Other 10-28 kW Next Gen units and serials outside the list are not covered.",
    summary: "Pushrods on some 817 cc engines can sit out of line and wear the valve train, causing abnormal engine noise and lost performance. Generac wants affected units fixed before they fail: replace both pushrod guide plates and all 4 pushrods with kit A0013156384.",
    steps: [
      "Parts / tools: kit A0013156384 (guide plate replacement, includes lubricant A0013178429), new rocker cover gaskets, an inch-pound torque wrench.",
      "Make safe: generator OFF at the controller, pull the fuse, disconnect the battery.",
      "Remove the air box: cover off, filter out, the 2 bolts inside the base that hold it to the mixer (the mixer is then loose - don't damage it), the base bolts at the head, and ease the breather hose off.",
      "Rocker covers off both sides (throw the gaskets away), plug boots and both spark plugs out.",
      "Remove all 4 rocker studs and rocker arms; set the old guide plates and pushrods aside. Mark each rocker arm and stud so it goes back in the same spot. Tag the old parts with the generator serial for return.",
      "Front cylinder to TDC on the intake stroke. Check all 4 valve stem tips and the rocker contact areas - they must be flat with no wear. Any wear: STOP and call Generac tech support from the site, 800-883-7535.",
      "Front cylinder: lube the pushrod bottoms, fit 2 new pushrods seated in their lifter cups, fit the new guide plate, apply the kit lubricant where pushrods meet the plate and at the rocker contact, fit the rocker arms, torque studs 70-80 in-lb (7.5-9.1 Nm).",
      "Back cylinder to TDC on the intake stroke and repeat the same way, studs 70-80 in-lb (7.5-9.1 Nm). (The bulletin's back-cylinder note says 'valve stems' seated in the lifter cup - it means the pushrods.)",
      "Flashlight check: all 4 pushrods seated in the lifters.",
      "Rocker covers back on with NEW gaskets. The bulletin prints the torque as '57.5 in-lb (6.5-7.5 Nm)' - those two numbers don't match (6.5-7.5 Nm is about 58-66 in-lb); call tech support if in doubt.",
      "Spark plugs 15-22 ft-lb (20-30 Nm), boots on. Air box back in reverse order: air box to mixer bolts 7.4-8.5 ft-lb (10-11.5 Nm), air box mounting bolts 4.8-5.5 ft-lb (6.5-7.5 Nm).",
      "Reconnect, start it and confirm it runs right.",
      "Warranty: new claim in GENService with A0013147290 as the primary failed part, comment 'SIB Guide Plate Replacement'. Pays 1 hr labor + 1 trip charge; list A0013156384 under purchased parts if bought. Return the old guide plates and pushrods bagged and tagged with the serial and a copy of the claim to Generac Warranty Parts Return, Waukesha WI.",
      "Do NOT charge the customer - it is a warranty field campaign. Order the kit (A0013156384) through Generac 360.",
      "Not installed yet? Check the serial against the list first. If it is listed, do this repair BEFORE installing the unit.",
      "Generac notifies affected owners on Mon Nov 16, 2026. Owners with a Fleet dealer are told to call that dealer; others are sent to a Generac.com service request or the dealer locator, so expect calls from owners we didn't sell. If we monitor an affected unit in Fleet, call that customer now to book it."
    ],
    priority: "high", confidential: true,
    source: "Generac SIB A0013147290 Rev B, Nov 2026 (GENservice); Generac dealer email on the field campaign, Nov 2026"
  },
  {
    id: "gen-fieldpro-offline", brand: "Generac", number: "Field Pro Offline Mode Preparation", docNo: "", rev: "", date: "", type: "Technical",
    title: "Field Pro: prepare offline access before a no-signal site visit",
    applies: { genFamilies: BUL_GEN_NEXTGEN, controllers: ["Power Zone 200"] },
    appliesText: "Generators serviced through the Field Pro app (Power Zone 200 Next Generation units) at sites with no cellular or Wi-Fi.",
    summary: "Field Pro can work a generator offline only if you prepared while online - per tech, per device, 48-hour maximum window. And always take the unit out of Service Mode and back to AUTO or it will not start on its own.",
    steps: [
      "Online beforehand: Field Pro > Work on a Home Standby Generator > Prepare for a Future Visit > search by serial, confirm the connectivity accessory (register the unit first if it is not). Each tech prepares separately.",
      "Note the access window (max 48 hours); refresh it closer to the visit. Preparation also downloads firmware updates that apply during commissioning.",
      "Before leaving: disable Service Mode and return the unit to AUTO."
    ],
    priority: "normal",
    source: "Generac Field Pro Offline Mode Preparation instructions (GenService)"
  },

  // ===================== CARRIER / BRYANT (TIC / PTC) =====================
  {
    id: "carrier-tic2021-0001", brand: "Carrier", number: "TIC2021-0001", docNo: "", rev: "", date: "2021-01-21", type: "Technical",
    title: "PCM software v6.0 release - Greenspeed 24VNA6 / 25VNA4",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["53-01", "53-02", "35-11", "31-11", "31-58", "61-13", "25-63", "17-06", "32-59", "39-15", "66-41", "66-42", "82-13", "88-15", "81-58", "86-06"] },
    appliesText: "Carrier Infinity 24VNA6 (AC) and 25VNA4 (HP); Bryant Evolution Extreme 186CNV and 284ANV.",
    summary: "v6.0 (OTA) added stator sump heat, Indoor Coil Freeze Protection and the OST sensor diagnostics, and fixed a long list of false codes. On a PCM below v6.0, update before replacing parts for the listed codes.",
    steps: [
      "False activations fixed in v6.0: 17-06, 32-59, 39-15, 66-41 / 66-42, 82-13, 88-15, 81-58, 86-06. Also fixed: status-code recall showing live codes instead of history, diagnostic record corrupted by abrupt power-down.",
      "Made less sensitive to 35-11; adjusted speed/airflow that caused 31-11 and 31-58 on some combinations; a 3T VFD with a 4/5T model plug now flags 25-63; reversing valve / defrost termination issues (61-13 timeout, 50 PSI DP-SP) fixed.",
      "Compatibility: PCM v6.0 goes with VFD A029 / A036, BTM 2.0 or 3.0 and wall control 3.40 / 3.60 (see the matrix). v5.0 (Nov 2020) fixed 25VNA4 / 284ANV locking in defrost with aux heat on through the 4-hour lockout."
    ],
    priority: "normal",
    source: "Carrier TIC2021-0001, 26/24 Condensing Unit PCM Software v6.0 Release, Jan 2021"
  },
  {
    id: "carrier-tic2021-0015", brand: "Carrier", number: "TIC2021-0015", docNo: "", rev: "", date: "2021-08-25", type: "Technical",
    title: "PCM software v9.00 - heating charge compensation (31-58), 64-41 threshold",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["31-58", "64-41", "41-13", "61-13", "61-53"] },
    appliesText: "Carrier 24VNA6 / 25VNA4; Bryant 186CNV / 284ANV.",
    summary: "v9.0 added heating-mode charge compensation to cut 31-58 on systems with mismatched coil sizes and short line sets, and raised the 64-41 (EXV-H Phase Open) threshold so a power dropout does not trip it. v7.0 earlier fixed 41-13 defrost timeout and 61-13 / 61-53 reversing valve timeout.",
    steps: [
      "Heat pump 31-58 in heating: check the PCM version before pulling charge.",
      "64-41 right after a power interruption on older software: update the PCM before replacing the EXV coil.",
      "v8.0 (Jul 2021): HP in Auto with System-in-Control, Overcool-to-Dehum ON, deadband 3 F or less and aux-during-defrost ON could run heating and cooling together (more likely zoned); the heat pump now shuts down when changing cooling to heating."
    ],
    priority: "normal",
    source: "Carrier TIC2021-0015, Software PCM V9.00 Release, Aug 2021"
  },
  {
    id: "carrier-tic2021-0021", brand: "Carrier", number: "TIC2021-0021", docNo: "", rev: "", date: "2021-12-17", type: "Technical",
    title: "PCM software v9.02 - 85-54 lockout removed, premature malfunctions fixed",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["85-54", "32-55", "33-55", "36-55", "61-53", "81-53", "81-54", "82-53", "82-55", "82-56", "82-57", "83-55", "83-56", "85-53", "86-46", "87-53", "88-55", "88-71", "88-73", "88-74", "88-75", "88-76", "88-78", "88-79"] },
    appliesText: "Carrier 24VNA6 / 25VNA4; Bryant 186CNV / 284ANV. Special-use release on HVACPartners, not OTA - carried into v10.0.",
    summary: "v9.02 removed the 2-hour lockout for 85-54 (VFD DC Over Volt, now a fault not a malfunction) and stopped the listed faults escalating to malfunction before their occurrence-count and timing rules were met.",
    steps: [
      "A single lockout on one of the listed codes on PCM software older than 9.02 / 10.0 may be premature - update (v10.0 or later includes the fix) and re-check before replacing parts.",
      "v9.01 (Sep 2021, special use) set maximum indoor airflow to 400 cfm/ton with 26/24VS outdoor units."
    ],
    priority: "normal",
    source: "Carrier TIC2021-0021, Software PCM V9.02 Release, Dec 2021"
  },
  {
    id: "carrier-tic2022-0010", brand: "Carrier", number: "TIC2022-0010", docNo: "", rev: "", date: "2022-06-13", type: "Technical",
    title: "PCM software v10.0 - 13-82 false with -C controls, 53-01 after PCM swap, coil freeze",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["13-82", "53-01", "18-11"] },
    appliesText: "Carrier 24VNA6 / 25VNA4; Bryant 186CNV / 284ANV. OTA and HVACPartners; includes 9.01 and 9.02.",
    summary: "v10.0 changed indoor airflow to stop coil freeze in dry climates, fixed a false 13-82 when paired with a SYSTXCCITC01-C / SYSTXBBECC01-C system control, and fixed 53-01 appearing after a PCM replacement on an AC unit built without an OST sensor.",
    steps: [
      "13-82 with a Series C system control on older PCM software may be false - update the PCM.",
      "53-01 'OST Open' after a PCM swap on an AC built without an OST sensor: a FIELD update to v10.0 (SD card or STA) does NOT clear it - add an OST sensor unless the replacement PCM was manufactured with v10.0.",
      "Repeated Indoor Coil Freeze Protection in cooling in arid conditions: confirm v10.0 or later."
    ],
    priority: "normal",
    source: "Carrier TIC2022-0010, Software PCM V10.0 Release, Jun 2022"
  },
  {
    id: "carrier-tic2024-0006", brand: "Carrier", number: "TIC2024-0006", docNo: "", rev: "", date: "2024-02-07", type: "Technical",
    title: "PCM software v11.0 - defrost, reversing valve, frosted start, false 81-58",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["81-58"] },
    appliesText: "Carrier 24VNA6 / 25VNA4; Bryant 186CNV / 284ANV. OTA and HVACPartners.",
    summary: "v11.0 defrosts less often in AUTO (COMFORT airflow only), changed defrost termination and reversing valve logic, fixed failed starts in frosted conditions, lets faults clear faster, keeps heating up to 77 F after startup, and again fixed 81-58 activating incorrectly.",
    steps: [
      "81-58 (VFD Wiring Error) with every compressor lead good at the VFD: update the PCM before replacing the VFD.",
      "5T model: lower compressor speed during defrost below 5 F OAT."
    ],
    priority: "normal",
    source: "Carrier TIC2024-0006, Software PCM V11.0 Release, Feb 2024"
  },
  {
    id: "carrier-tic2020-0011", brand: "Carrier", number: "TIC2020-0011", docNo: "", rev: "", date: "2020-08", type: "Technical",
    title: "PCM software v4.00 - false 83-57 fixed",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["83-57"] },
    appliesText: "Carrier 24VNA6 / 25VNA4; Bryant 186CNV / 284ANV (Greenspeed PCM/VFD platform).",
    summary: "v4.00 fixed 83-57 'VFD Compressor Lockout - Current 1' being set erroneously. Update the wall control to v3.40 before loading PCM v4.00.",
    steps: ["83-57 on PCM software below 4.0: update wall control to 3.40, then the PCM, before condemning the VFD or compressor."],
    priority: "info",
    source: "Carrier TIC2020-0011 (distributor copy), Software PCM V4.00 Release, Aug 2020 (as cited in the app)"
  },
  {
    id: "carrier-tic2021-0007", brand: "Carrier", number: "TIC2021-0007", docNo: "", rev: "", date: "2021-03", type: "Technical",
    title: "PCM software v7.0 - defrost timeout 41-13, reversing valve 61-13 / 61-53",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"], codes: ["41-13", "61-13", "61-53"] },
    appliesText: "Carrier 25VNA4 / 24VNA6; Bryant 284ANV / 186CNV heat pump models.",
    summary: "v7.0 improved defrost for 41-13 (timeout / overrun) and fixed the 61-13 / 61-53 reversing valve timeout fault and malfunction.",
    steps: ["Update the PCM before replacing a reversing valve for 61-13 / 61-53 or chasing 41-13."],
    priority: "info",
    source: "Carrier TIC2021-0007, 26/24 Condensing Unit PCM Software v7.0 Release, Mar 2021 (as cited in the app)"
  },
  {
    id: "carrier-tic2026-0012", brand: "Carrier", number: "TIC2026-0012", docNo: "", rev: "", date: "2026-04-29", type: "Technical",
    title: "Variable speed outdoor v3.0 software - 17-06 removed (R-454B units)",
    applies: { modelRe: ["^27VNA0", "^26VNA1", "^290VAN", "^191VAN"], codes: ["17-06"] },
    appliesText: "454B communicating variable speed outdoor units: Carrier 27VNA0, 26VNA1; Bryant 290VAN, 191VAN. OTA from the week of May 4, 2026.",
    summary: "v3.0 updated the cooling check-charge subcooling target, removed diagnostic 17-06 so the Bluetooth module can be removed without a fault, and modified Comfort-mode airflow for latent removal.",
    steps: ["17-06 on these units: update the outdoor software rather than replacing a BTM."],
    priority: "info",
    source: "Carrier TIC2026-0012, Variable Speed Outdoor Version 3.0 Software Update, Apr 2026"
  },
  {
    id: "carrier-tic2026-0024", brand: "Carrier", number: "TIC2026-0024 (catalogued as PTC2026-0024)", docNo: "", rev: "", date: "2026-11-04", type: "Technical",
    title: "Variable speed outdoor v3.01 software - new thermistor partial-short codes (R-454B 27VNA0 / 26VNA1)",
    applies: { modelRe: ["^27VNA0", "^26VNA1", "^290VAN", "^191VAN"], codes: ["51-12", "52-12", "53-12", "55-12"] },
    appliesText: "454B communicating variable speed outdoor units: Carrier 27VNA0, 26VNA1; Bryant 290VAN, 191VAN. Sent over the air the week of November 9, 2026.",
    summary: "v3.01 clears heat pump diagnostics when the unit is set up as an AC, and adds four codes that catch a thermistor that is partly shorted: 51-12 (OAT) and 55-12 (LLT), 52-12 (OCT) and 53-12 (OST/ALT).",
    steps: [
      "51-12, 52-12, 53-12 or 55-12 on these units means that sensor reads like it is partly shorted. Check the named thermistor and its wiring and plug for damage, rubbed insulation or water before replacing the control.",
      "51-12 / 55-12 = outdoor air temp (OAT) or liquid line temp (LLT) sensor. 52-12 / 53-12 = outdoor coil temp (OCT) or suction temp (OST/ALT) sensor.",
      "Heat pump codes showing on a unit configured as an AC: update to v3.01; they no longer show after the update.",
      "Same release for 27VNA3 / 293VAN is v4.01 (TIC2026-0025). Earlier v3.0 changes are in TIC2026-0012."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2026-0024, Variable Speed Outdoor V3.01 Software Update, Nov 2026"
  },
  {
    id: "carrier-tic2026-0025", brand: "Carrier", number: "TIC2026-0025 (catalogued as PTC2026-0025)", docNo: "", rev: "", date: "2026-11-04", type: "Technical",
    title: "Variable speed outdoor v4.01 software - new thermistor partial-short codes (R-454B 27VNA3)",
    applies: { modelRe: ["^27VNA3", "^293VAN"], codes: ["51-12", "52-12", "53-12", "55-12"] },
    appliesText: "454B communicating variable speed outdoor units: Carrier 27VNA3; Bryant 293VAN. Sent over the air the week of November 9, 2026.",
    summary: "v4.01 clears heat pump diagnostics when the unit is set up as an AC, and adds four codes that catch a thermistor that is partly shorted: 51-12 (OAT) and 55-12 (LLT), 52-12 (OCT) and 53-12 (OST/ALT).",
    steps: [
      "51-12, 52-12, 53-12 or 55-12 on these units means that sensor reads like it is partly shorted. Check the named thermistor and its wiring and plug for damage, rubbed insulation or water before replacing the control.",
      "51-12 / 55-12 = outdoor air temp (OAT) or liquid line temp (LLT) sensor. 52-12 / 53-12 = outdoor coil temp (OCT) or suction temp (OST/ALT) sensor.",
      "Heat pump codes showing on a unit configured as an AC: update to v4.01; they no longer show after the update.",
      "Same release for 27VNA0 / 26VNA1 / 290VAN / 191VAN is v3.01 (TIC2026-0024)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2026-0025, Variable Speed Outdoor V4.01 Software Update, Nov 2026"
  },
  {
    id: "carrier-tic2026-0016", brand: "Carrier", number: "TIC2026-0016 (catalogued as PTC2026-0016)", docNo: "", rev: "", date: "2026-07-14", type: "Technical",
    title: "27VPA9 / 249VAN IntelliSense software v4.00 - false fault codes eliminated",
    applies: { modelRe: ["^27VPA9", "^249VAN"] },
    appliesText: "Carrier 27VPA9 and Bryant 249VAN variable speed outdoor units with IntelliSense. Software v3.00 (Jun 2026) was the initial release; v4.00 (Jul 2026) eliminates false fault reporting.",
    summary: "If you are chasing a code on a v3.00 unit, the code itself may not be real. Update to v4.00 first.",
    steps: ["Check the outdoor software version; on v3.00, update to v4.00 and see whether the code returns before diagnosing it."],
    priority: "normal",
    source: "Carrier TIC2026-0016 / PTC2026-0016, Jul 2026 (as cited in the app's symptoms)"
  },
  {
    id: "carrier-tic2025-0010", brand: "Carrier", number: "TIC2025-0010", docNo: "", rev: "", date: "2025-04-03", type: "Technical",
    title: "Residential communicating systems master fault code list",
    applies: { modelRe: [] },
    appliesText: "All Carrier / Bryant residential communicating systems (dissipation board, indoor furnace/fan coil, outdoor, SAM, smart sensors, wall control, zone board).",
    summary: "Reference list of every communicating-system fault code by device. Note it lists the furnace flame-loss codes as 34.5 low/med lost before on-delay, 34.6 low/med lost after, 34.7 high lost before, 34.8 high lost after - which reverses the 34.6 / 34.7 meanings printed on some furnace labels; confirm against the unit's own label.",
    steps: ["Use it to decode a wall-control or board code; when it disagrees with the equipment's status label, the label on the unit wins."],
    priority: "info",
    source: "Carrier TIC2025-0010, Residential Fault Code List, Apr 2025"
  },
  {
    id: "carrier-tic2025-0035", brand: "Carrier", number: "TIC2025-0035", docNo: "", rev: "", date: "2025-12-12", type: "Technical",
    title: "A2L dissipation board runs the indoor fan with no call (sensor calibration)",
    applies: { modelRe: [] },
    appliesText: "All residential Puron Advance (R-454B) systems, communicating or not.",
    summary: "If the blower has not run 15 continuous minutes on any call within a week, the dissipation board runs its own 15-minute fan cycle so the A2L sensor sees fresh air. Normal, no code, more common in shoulder seasons.",
    steps: [
      "Fan running with no call and no code = calibration cycle; a heat or cool call during it is honored and the fan continues until the 15 minutes or the demand ends.",
      "Fan running because of a dissipation event = the board's LED flashes the active dissipation code; a sensor fault keeps the blower running with a fault code (shown on the wall control on communicating systems)."
    ],
    priority: "normal",
    source: "Carrier TIC2025-0035, A2L Dissipation Fan Operation, Dec 2025"
  },
  {
    id: "carrier-tic2025-0036", brand: "Carrier", number: "TIC2025-0036", docNo: "", rev: "", date: "2025-12-03", type: "Technical",
    title: "Series C modulating furnace nuisance limit trips - new limit switches",
    applies: { modelRe: ["^59MN7C", "^987MC"], serialTo: "4725A", serialToExclusive: true, codes: ["13.1", "33.1"] },
    appliesText: "59MN7C and 987MC Series C modulating furnaces. New switches in production from serial 4725A; earlier Series C units may be retrofitted. Do NOT use the new part numbers on Series A or B modulating furnaces. (Codes 13.1 limit lockout / 33.1 limit open are the app's board-display codes for the condition; the bulletin names the condition, not code numbers.)",
    summary: "Carrier recertified higher-rated limit switches to cut nuisance limit trips and lockouts on Series C modulating furnaces. Do the startup checks first, then fit the Table 1 switch for the model.",
    steps: [
      "Measure and set gas input; return-air temperature (including any bypass humidifier) within the install manual range; airflow set for proper temperature rise; load the updated control recipe (TIC 2025-0012 airflow updates); increase blower-off delay if the limit opens after the heat call ends.",
      "Then replace the limit with the newer switch: 060C17 165 F (338096-703) to 180 F (338096-701); 060C21 stays 160 F (338096-704); 080C17 165 F (338085-417) to 175 F (338096-714); 080C21 185 F (338096-713) to 190 F (348224-716); 100C21 170 F (338096-702) to 175 F (338096-714); 120C24 150 F (338096-712) to 155 F (338096-705)."
    ],
    priority: "normal",
    source: "Carrier TIC2025-0036, Modulating Furnace Limit Switch Change, Dec 2025"
  },
  {
    id: "carrier-tic2026-0007", brand: "Carrier", number: "TIC2026-0007", docNo: "", rev: "", date: "2026-03-24", type: "Technical",
    title: "Gas furnace Bluetooth module removed - 17.1 after a board replacement",
    applies: { modelRe: ["^59MN7C", "^59TN7A", "^59TN6C", "^59CU95B", "^58TN1B", "^58TN0B", "^58CU0B", "^987MC", "^987TA", "^986TD", "^935CB", "^881TB", "^880TB", "^830CB"], builtFrom: "2026-03-18", codes: ["17.1"] },
    appliesText: "Infinity 59MN7C, 59TN7A, 59TN6C, 59CU95B, 58TN1B, 58TN0B, 58CU0B; Evolution 987MC, 987TA, 986TD, 935CB, 881TB, 880TB, 830CB. Units built from March 18, 2026 have no Bluetooth module; Service Tech App Bluetooth support is also ending.",
    summary: "A replacement furnace control commissioned with an old Super Plug or the pre-April-2026 Service Tech App loads a recipe with Bluetooth enabled; with no module fitted the board shows 17.1 whenever powered. It does not affect operation - load the updated recipe.",
    steps: [
      "17.1 on a furnace built without a module: connect by NFC (or Bluetooth) with the updated Service Tech App, accept the recipe update (Bluetooth disabled). A new Super Plug with the updated recipes is due Q4 2026.",
      "Do not look for a missing module or replace the board for this code."
    ],
    priority: "info",
    source: "Carrier TIC2026-0007, Gas Furnace Bluetooth Module Removal, Mar 2026"
  },
  {
    id: "carrier-tic2021-0004", brand: "Carrier", number: "TIC2021-0004", docNo: "", rev: "", date: "2021-02-11", type: "Technical",
    title: "Modulating inducer power connector pushed under the housing edge",
    applies: { modelRe: ["^59MN7[AB](060|080|100|120)", "^987M[AB](42|60|66)(060|080|100|120)"] },
    appliesText: "59MN7A060V17--14, 59MN7A060V21--20, 59MN7A080V17--14, 59MN7A080V21--20, 59MN7A100V21--22, 59MN7A120V24--22, the matching 59MN7B...C models, and Bryant 987MA42060V17 / 987MB42060C17 through 987MA66120V24 / 987MB66120C24.",
    summary: "Inducers returned for noise had the power connector inside the housing pushed under the edge (shipping / handling), giving a noisy or dead inducer. Reposition the connector before replacing the inducer.",
    steps: ["Inducer noisy or not running: unplug, look at the motor power connector inside the assembly; if it sits partly under the housing edge, work it back out to the correct position, reconnect and verify. A redesigned connector mold is a running production change."],
    priority: "normal",
    source: "Carrier TIC2021-0004, Modulating Inducer Assembly Power Connector Plug Position, Feb 2021"
  },
  {
    id: "icp-tic2021-0004", brand: "ICP", number: "TIC2021-0004", docNo: "", rev: "", date: "2021-02", type: "Technical",
    title: "Modulating inducer noise or inoperable - connector position (ICP)",
    applies: { modelRe: ["^F97CMN", "^G97CMN", "^F9MAE", "^G9MAE"] },
    appliesText: "ICP F97CMN / G97CMN and F9MAE / G9MAE modulating furnaces (060-120, suffix A).",
    summary: "Same connector issue as the Carrier 59MN7 bulletin: the power connector inside the modulating inducer assembly can be pushed under the housing edge in shipping or handling.",
    steps: ["Before replacing a noisy or non-running inducer, unplug it, move the connector back out into position, reconnect and check operation."],
    priority: "normal",
    source: "ICP TIC2021-0004, Modulation Inducer Assembly Noise or Inoperable, Feb 2021 (as cited in the app)"
  },
  {
    id: "icp-tic2024-0002", brand: "ICP", number: "TIC2024-0002", docNo: "", rev: "", date: "2024-02", type: "Technical",
    title: "Condensing furnace pressure switches that stick closed after deep vacuum",
    applies: { modelRe: ["^F9MXT", "^G9MXT", "^N9MSB", "^N9MSE", "^F9MVE", "^G9MVE", "^F96VTN", "^G96VTN"], codes: ["2"] },
    appliesText: "ICP condensing furnaces with pressure switch part 1191550, 1191551 or 1191552 from supplier weeks 2123-3723 (F9MXT / G9MXT, N9MSB / N9MSE, F9MVE / G9MVE, F96VTN / G96VTN per the app's code tables).",
    summary: "The diaphragm can bind lightly to the housing edge after a deep vacuum (over 2.0 in negative) and stay closed; it may release on its own or with a light tap. Replacement stock was purged, so a new switch from stock is fine.",
    steps: ["Pressure switch stuck closed on one of these part numbers from the suspect weeks: replace the switch."],
    priority: "normal",
    source: "ICP TIC2024-0002, Pressure Switch update, Feb 2024 (as cited in the app)"
  },
  {
    id: "carrier-tic2024-0021", brand: "Carrier", number: "TIC2024-0021", docNo: "", rev: "", date: "2024-12", type: "Technical",
    title: "A2L dissipation board sequence of operation",
    applies: { modelRe: [] },
    appliesText: "Carrier / ICP residential R-454B systems with an A2L dissipation board.",
    summary: "At the alarm level the compressor stops at once and stays off 15 minutes while the blower dissipates refrigerant. Communicating systems bring on furnace or electric heat 5 minutes after the level drops below 20% LFL; if still above 20% LFL after 10 minutes the board treats the sensor as faulty but still allows heat. Non-communicating systems use 10 and 15 minutes.",
    steps: ["Blower running and compressor locked out with a dissipation code = the sequence working, not a blower fault; find the leak."],
    priority: "info",
    source: "Carrier TIC2024-0021 (ICP library), Sequence of Operation A2L Dissipation Board, Dec 2024 (as cited in the app)"
  },
  {
    id: "carrier-tic2014-0008", brand: "Carrier", number: "TIC2014-0008", docNo: "", rev: "", date: "2014-06", type: "Technical",
    title: "Variable speed heat pump fault 86 changed to 62 (Evolution Extreme 180CNV / 280ANV, 25VNA)",
    applies: { modelRe: ["^25VNA0(24|36|48|60)", "^280ANV0(24|36|48|60)", "^180CNV"], codes: ["86", "62"] },
    appliesText: "25VNA024-060 / 280ANV024-060 (and 180CNV) with outdoor boards HK38EA014, HK38EA017, HK38EA028.",
    summary: "What 86 means depends on the inverter software; on HK38EA028 boards with V06 or later the compressor no-start became code 62 with a 15-minute lockout and retry instead of a hard lockout and e-mail alert.",
    steps: [
      "Board software V01-V05: read the inverter software on the bar-code label next to DSP MAIN (digits before the first decimal). Version 19 (production 2411E-1712E): 86 = compressor temp sensor fault - ohm the scroll (10 kohm) and motor (5 kohm) thermistors at 77 F at the inverter plug and compressor terminals; open or shorted = replace the compressor.",
      "Versions 27 / 29: 86 = compressor failed to start ('lost rotor'). Boards HK38EA028 with V06+ (from week 2214E) report that as 62: contactor open 15 minutes, then retry on demand."
    ],
    priority: "normal",
    source: "Carrier TIC2014-0008 (distributor copy), Variable Speed Heat Pump Fault Code 86 change to 62, Jun 2014 (as cited in the app)"
  },
  {
    id: "carrier-tic2014-0012", brand: "Carrier", number: "TIC2014-0012", docNo: "", rev: "", date: "2014-10", type: "Technical",
    title: "Incorrect field wiring damages the AOC board (24VNA9 / 25VNA8)",
    applies: { modelRe: ["^24VNA9", "^25VNA8"], codes: ["179"] },
    appliesText: "Carrier Infinity 19VS 24VNA9 / 18VS 25VNA8 inverter units (wall control software 11 or higher).",
    summary: "Only green (A) and yellow (B) are needed between indoor and outdoor; white (C) is optional. 24 VAC landed on the ABC terminals damages the AOC board, which then must be replaced.",
    steps: ["Wall control cannot find the outdoor unit (179): check the ABC wiring for a stray 24 VAC connection before and after replacing a damaged AOC."],
    priority: "normal",
    source: "Carrier TIC2014-0012 (distributor copy), Incorrect Field Wiring of AOC Board, Oct 2014 (as cited in the app)"
  },
  {
    id: "carrier-tic2014-0013", brand: "Carrier", number: "TIC2014-0013", docNo: "", rev: "", date: "2014-12", type: "Technical",
    title: "Wall control asks for indoor-coil charge that is not needed (24VNA948 / 25VNA848)",
    applies: { modelRe: ["^24VNA948", "^189BNV048", "^25VNA848", "^288BNV048"], codes: ["71"] },
    appliesText: "24VNA948 / 189BNV048 and 25VNA848 / 288BNV048 with FE4AN(B,F)005 or CSPH*60 indoor coils on AOC software 1 or 2.",
    summary: "The charging screen asks for extra indoor-coil charge (1 lb 8 oz AC, 2 lb 3 oz HP) even when correctly charged; adding it overcharges and can cause fault 71. Fixed in AOC software 3.",
    steps: ["On AOC software 1 or 2 ignore the indoor-coil addition (should be 0) - charge by the method in the install instructions; update to software 3."],
    priority: "normal",
    source: "Carrier TIC2014-0013 (distributor copy), Incorrect Indoor Coil Charge Addition, Dec 2014 (as cited in the app)"
  },
  {
    id: "carrier-tic2015-0017", brand: "Carrier", number: "TIC2015-0017", docNo: "", rev: "", date: "2015-09", type: "Technical",
    title: "5-stage inverter (24VNA9 / 25VNA8) quality improvements - codes 31, 61, 65, 66, 67, 92",
    applies: { modelRe: ["^24VNA9", "^25VNA8"], codes: ["31", "61", "65", "66", "67", "71", "75", "79", "92"] },
    appliesText: "Carrier Infinity 19VS 24VNA9 and 18VS 25VNA8 compact 5-stage inverter units, AOC software V01-V05.",
    summary: "Several codes on these units are nuisance reports or symptoms of overcharge, not failed parts. Charge by subcooling and read the history before condemning the inverter or fan motor.",
    steps: [
      "31 (HPS open) is the usual sign of overcharge; on V01-V03 a 31 shutdown can also show 65, 71, 75, 79 or 92 and needs a high-voltage power cycle to clear; V4/V5 self-recover but limit max stage next cycle. Loose HPS Molex = nuisance 31 on V3-V5.",
      "61 fan inverter failed to start (misaligned rotor) - retries after 6 minutes and usually succeeds. 67 stator heat temporarily unavailable - retries after 6 minutes. 66 fan drop-out is reported whether or not the fan really stopped - verify before replacing.",
      "65 / 92 DC voltage low: comes with a power loss or another fast shutdown code - find the triggering event in history first."
    ],
    priority: "normal",
    source: "Carrier TIC2015-0017 (distributor copy), Inverter Unit (5 Stage) Quality Improvements, Sep 2015 (as cited in the app)"
  },
  {
    id: "carrier-tic2013-0007", brand: "Carrier", number: "TIC2013-0007", docNo: "", rev: "", date: "2013-10", type: "Technical",
    title: "35-inch condensing furnace condensate drain - shared coil drain trips the pressure switch",
    applies: { modelRe: ["^59TN6"], codes: ["31", "32"] },
    appliesText: "Carrier 35-inch condensing furnaces (59TN6B and related 35 in chassis per the app's code tables).",
    summary: "A drain shared with the evaporator coil and no open standpipe (air gap), or one in the wrong place, lets coil blower pressure push into the furnace condensate line and trip the pressure switch.",
    steps: ["Relieve coil-drain pressure with an open standpipe before the furnace drain joins it, or run separate drains with a standpipe on the furnace line; never seal the standpipe; a trap on the coil drain is not a substitute."],
    priority: "normal",
    source: "Carrier TIC2013-0007 (distributor copy), New 35\" Condensing Furnace Condensate Drain, Oct 2013 (as cited in the app)"
  },
  {
    id: "carrier-tic2017-0001", brand: "Carrier", number: "TIC2017-0001", docNo: "", rev: "", date: "2017-01", type: "Technical",
    title: "Code 31 inspection sheet - 35-inch condensing furnaces",
    applies: { modelRe: ["^59TN6"], codes: ["31"] },
    appliesText: "Carrier 35-inch condensing furnaces (59TN6B family per the app's code tables).",
    summary: "Checklist for a code 31: trap priming, trap and port cleaning, vent slope, separate drains, the inducer housing port drill-out (DSB 14-0002) and the revised code-31 board software.",
    steps: [
      "Prime both sides of the trap through the collector-box drain ports (it faults 31 until primed); clean the trap, its relief port and the collector-box switch port; vent slope at least 1/4 in per ft with no short horizontal offsets.",
      "Keep the coil drain separate from the furnace drain. Inducer housing with no embossed 'X': drill out the housing pressure-switch port per DSB 14-0002. Board should have the revised code-31 software (date code 4016, DSB16-0018)."
    ],
    priority: "normal",
    source: "Carrier TIC2017-0001 (distributor copy), Code 31 Inspection Sheet, Jan 2017 (as cited in the app)"
  },
  {
    id: "carrier-tic2020-0017", brand: "Carrier", number: "TIC2020-0017", docNo: "", rev: "", date: "2020-11", type: "Technical",
    title: "80% 110K BTU 21-inch furnace nuisance limit trip with an N coil",
    applies: { modelRe: ["^58S[BC][01]A110E21"], codes: ["33"] },
    appliesText: "58SB0A110E21 / 58SB1A110E21 / 58SC0A110E21 / 58SC1A110E21 (110K input, 21 in cabinet).",
    summary: "Upflow with an N-style coil sitting directly on the furnace and a left, left-plus-bottom or bottom return trips the limit; poor ductwork and high static make it worse.",
    steps: ["Fix with coil adapter KGADA0101ALL (4.75 in spacer, or a field-built equivalent) between furnace and N coil, a right-side return, or an A-style coil."],
    priority: "normal",
    source: "Carrier TIC2020-0017 (distributor copy), 80% 110K BTU (21\" cabinet) Furnace Nuisance Limit Trip, Nov 2020 (as cited in the app)"
  },
  {
    id: "carrier-tic2019-0016", brand: "Carrier", number: "TIC2019-0016", docNo: "", rev: "", date: "2019-08", type: "Technical",
    title: "ABB VFD (SAV option) parameter updates on packaged rooftops",
    applies: { modelRe: ["^4[08]TC", "^50TCQ", "^4[08]HC", "^50HCQ", "^40RU"] },
    appliesText: "ABB ACH550 / ACS320 (and newer ACH580 / ACH180) drives fitted as the factory SAV staged-air-volume indoor fan option on Carrier 48TC / 50TC, 50TCQ, 48HC / 50HC, 50HCQ and 40RU rooftops.",
    summary: "Nuisance drive shutdowns: set the listed parameters, and reprogram a drive with factory parameters before condemning it (RC replacement drives arrive blank).",
    steps: [
      "ACS320: 1611=3, 2603=0, 3102=300.0 s, 3103=6, 3104=1 (Enable), 2102=1 (coast). Before condemning a drive, turn the keypad off and reprogram with factory parameters.",
      "If someone used Assist: set 9902 to another macro, save, set back to HVAC Default, save, then program the rest. Do not use Assist or the drive to balance airflow."
    ],
    priority: "info",
    source: "Carrier TIC2019-0016 (distributor copy), ABB VFD Updates, Aug 2019 (as cited in the app)"
  },
  {
    id: "carrier-ptc2021-0002", brand: "Carrier", number: "PTC2021-0002", docNo: "", rev: "", date: "2021", type: "Technical",
    title: "Series B system control - 'Serial Number not valid' at warranty registration",
    applies: { modelRe: ["^SYSTXCCITC01-B", "^SYSTXBBECC01-B"] },
    appliesText: "Carrier Infinity / Bryant Evolution Series B system controls (SYSTXCCITC01-B / SYSTXBBECC01-B) with duplicated serial numbers.",
    summary: "The control works normally but registration returns 'Serial Number not valid' - only the FIRST control of a duplicate-serial pair can be registered; the second is refused.",
    steps: ["Confirm the control functions normally; the registration refusal is the duplicate-serial issue, not a bad control."],
    priority: "info",
    source: "Carrier PTC2021-0002 (as cited in the app's symptoms)"
  },
  {
    id: "carrier-ptc2022-0006", brand: "Carrier", number: "PTC2022-0006", docNo: "", rev: "", date: "2022-06", type: "Technical",
    title: "Series B system control v4.17 / v4.18 - version number trap",
    applies: { modelRe: ["^SYSTXCCITC01-B", "^SYSTXBBECC01-B"] },
    appliesText: "Carrier Infinity / Bryant Evolution Series B system controls (SYSTXCCITC01-B / SYSTXBBECC01-B).",
    summary: "v4.17 (6/6/2022, Bryant Evolution controls) overloaded Carrier's communication servers so app changes were not accepted; system operation was unaffected. The OTA was halted and v4.18 (6/11/2022) is a direct rename of v4.05 pushed to work around it - so a control showing 4.18 is functionally 4.05, not current.",
    steps: ["A Series B control reporting v4.18: treat as v4.05 and update. Sourcing caveat: the cumulative Series B release notes never list 4.17 or 4.18 (they jump 4.05 to 4.22) - the bulletin is the only source."],
    priority: "info",
    source: "Carrier PTC2022-0006 (as cited in the app's code table and symptoms)"
  },

  // --- HVACpartners weekly check 2026-11-03 (dashboard bulletins, TIC list, Dealer Service Bulletins) ---
  {
    id: "carrier-dsb26-0018", brand: "Carrier", number: "DSB26-0018", docNo: "", rev: "A", date: "2026-10-22", type: "Service",
    title: "R-454B two-stage AC: compressor noise / failure linked to 'YU' TXVs - check superheat first",
    applies: { modelRe: ["^26TPA8", "^148TAN", "^GA8TAN5", "^PA8TAN5"] },
    appliesText: "Two-stage R-454B air conditioners Carrier 26TPA8, Bryant 148TAN, GA8TAN5, PA8TAN5 and the matched R-454B fan coils and furnace coils. Investigation still open (bulletin expires 12/31/2027).",
    summary: "Carrier is investigating 2-stage R-454B AC compressor noise and failures. Low-stage running with a TXV whose part number contains 'YU' (for example EA66YU010) can leave little or no superheat for long periods, which can make noise or damage the compressor. 'YP' TXVs (for example EA66YP002) respond better. Units sent back for noise mostly tested normal in the lab.",
    steps: [
      "Do not condemn the compressor on noise alone - many returned outdoor units showed no abnormal noise in the lab.",
      "Measure superheat, subcooling and the charge amount. Do NOT add charge to hit target subcooling when superheat is below 8 F, and do not go over the calculated charge for the line-set length.",
      "Check the things that make it worse: oversized or short-cycling system, poor airflow / high static / dirty filter / zoning bypass, low return temperature, no crankcase heater on long or buried line sets, wrong airflow or thermostat setup, TXV bulb not fully insulated, over- or under-charge, moisture or non-condensables.",
      "You cannot tell YU from YP by the coil model or the RC kit number - look at the part number stamped on the TXV itself.",
      "Replacement TXV kits with YP valves: 340620-727 (2 ton), 340620-728 (3 ton), 340620-731 (4 and 5 ton). Factory: A-coils changed to YP from week 43 2026 (all sizes); V and slab coils 4-5 ton from week 43, 1.5-3.5 ton about week 48. Fan coil TXV change not decided yet.",
      "Compressors named in the policy: YAS49K1E-PFV-8A1, YAS40K1E-PFV-8A1, YAS30K1E-PFV-8A1, YAS20K1E-PFV-8A1. Claims within 2 years of start-up go against the 2-stage AC unit (TXV kit claimed against the indoor unit) - give the office the labor key: SMB260018A compressor + TXV, SMB260018B unit + TXV, SMB260018C TXV only.",
      "Report coil freezing, TXV or compressor concerns to Carrier tech support, send start-up sheets and field data, and return parts when asked."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB26-0018"
  },
  {
    id: "carrier-dsb25-0018", brand: "Carrier", number: "DSB25-0018", docNo: "", rev: "B", date: "2025-11-30", type: "Service",
    title: "90% furnace condensate leaks - gray gaskets, replace with green",
    applies: { modelRe: ["^59SC2", "^59SC5", "^59SC6", "^59SP6", "^59TN6", "^59TN7", "^59TP6", "^59TP7", "^59MN7", "^912S", "^915S", "^916S", "^926S", "^926T", "^927T", "^986T", "^987M", "^987T", "^PG92", "^PG95", "^PG96", "^PG97", "^GG96V"], serialFrom: "3622A", serialTo: "2125A" },
    appliesText: "90% furnaces Carrier 59SC2, 59SC5, 59SC6, 59SP6, 59TN6, 59TN7, 59TP6, 59TP7, 59MN7; Bryant 912S, 915S, 916S, 926S, 926T, 927T, 986T, 987M, 987T; Payne PG92, PG95, PG96, PG97 (also listed: GG96V). Serials 3622A00001 to 2125A99999. Green gaskets in production from week 22 of 2025.",
    summary: "The gray gasket material on the collector box, inducer drain and drain trap can start leaking condensate. Replace leaking gray gaskets with the green ones. Always fit a new trap gasket when you pull the trap for annual cleaning.",
    steps: [
      "Condensate leak at the collector box, inducer housing drain or trap on a furnace in the serial range: look for gray gaskets.",
      "Green gasket part numbers: collector box 339715-401 (14 in.), 339715-402 (17 in.), 339715-403 (21 in.), 339715-404 (24 in.); housing drain 339805-401; trap 339806-401.",
      "Replacing gray with green before they leak is recommended at maintenance but is not paid by the policy.",
      "Warranty only when a gray gasket is confirmed leaking (fix on fail): tell the office labor key SMB250018A."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB25-0018"
  },
  {
    id: "carrier-101-26-09", brand: "Carrier", number: "101-26-09", docNo: "", rev: "V4", date: "2026-10-20", type: "Product",
    title: "Next Gen A2L furnaces and Gen 2 furnace coils - mixed pairings need a dissipation kit",
    applies: { modelRe: ["^58SC[01]", "^58SB[01]", "^58SU0", "^58SP[01]", "^58TP[01]", "^58TN[01]", "^58CU0", "^59SC[256]", "^59SU5", "^59SP6", "^59TP[67]", "^59TN[67]", "^59MN7", "^59CU5"] },
    appliesText: "All Carrier gas furnaces and furnace coils. Gen 2 (Next Gen) furnaces have a new series letter (for example 58SC0B -> 58SC0C, 59SC6A -> 59SC6B, 59TP6C/59TP7 -> 59TP7B, 59TN7A -> 59TN7B, 59MN7C -> 59MN7D). Entry / mid tier ship from Jan 2027, deluxe and ULN later in 2027.",
    summary: "Gen 2 furnaces run the A2L leak dissipation from the furnace board, and Gen 2 furnace coils ship with only a sensor that plugs straight into that board - no separate dissipation board or harness on the coil. Gen 1 coils still come with the dissipation control kit in the box.",
    steps: [
      "Gen 2 coil (sensor only) on a Gen 1 or older furnace: the system has no dissipation control. Remove the Gen 2 sensor from the coil and install transition kit 350047-701 (Gen 1 sensor, enclosure, dissipation board, harness) per its instructions.",
      "Gen 1 coil on a Gen 2 furnace: install the dissipation kit that came in the Gen 1 coil box and plug the Gen 1 sensor into the Gen 1 port of that board.",
      "Permanent kit ACAENCDIS01A (takes either sensor, Gen 1 or Gen 2 port) is due January 2027.",
      "Gen 2 furnace boards also have an input for the A2L audible alarm accessory, RAT / SAT sensor terminals (sensors are an accessory on Comfort series), and Y1 / Y2 for 2-stage cooling on every Comfort series furnace.",
      "Check the coil and furnace generation on both rating plates before start-up - a mixed pair without the kit has no leak dissipation."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners 101-26-09"
  },
  {
    id: "carrier-tic2026-0020", brand: "Carrier", number: "TIC2026-0020", docNo: "", rev: "", date: "2026-09-17", type: "Technical",
    title: "Smart Thermostat (InteliSense): screen works but no heat, cool or fan after a power blip - firmware 1766.05.20.00",
    applies: { modelRe: ["^TSTATCCIEWF", "^TSTATBBIEWF"] },
    appliesText: "Carrier TSTATCCIEWF-01 and Bryant TSTATBBIEWF-01 Smart Thermostat with InteliSense. Fixed in firmware 1766.05.20.00 (released September 16, 2026), sent over Wi-Fi only.",
    summary: "After some short power dips the thermostat's relay chip goes into standby while the display keeps working, so it looks normal but never turns on heat, cool or the fan. Firmware 1766.05.20.00 fixes it; no hardware change.",
    steps: [
      "Thermostat display normal but the equipment gets no call: pull the thermostat off its wall plate, wait about 30 seconds, put it back, and confirm heat / cool / fan now runs.",
      "Check the firmware version; it needs 1766.05.20.00 or later. The update only arrives over Wi-Fi - a thermostat not on the internet keeps the problem.",
      "Do not replace the thermostat or chase the equipment for this - it is a firmware issue."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2026-0020"
  },
  {
    id: "carrier-tic2025-0032", brand: "Carrier", number: "TIC2025-0032", docNo: "", rev: "", date: "2025-11-12", type: "Technical",
    title: "Old step-modulating furnace (58MVC / 355CAV) seen as single-stage after wall control update",
    applies: { modelRe: ["^58MVC", "^355CAV"] },
    appliesText: "Carrier 58MVC and Bryant 355CAV step-modulating furnaces built before 2012, paired with a -B or -C system control. Systems with a -A control are not affected.",
    summary: "After the -B control's 4.74 or the -C control's 2.00 update, the wall control identifies the step-modulating furnace as single-stage, so it will not stage and the staging setting is greyed out.",
    steps: [
      "Furnace not staging and staging adjustment greyed out: check the wall control software version.",
      "Fix: roll the wall control software back by hand - 4.70 on a -B control, 1.59 on a -C control. That brings back staging and the staging adjustment.",
      "Carrier planned a permanent fix in the next update (-B 4.79 and the next -C release)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0032"
  },
  {
    id: "carrier-tic2026-0011", brand: "Carrier", number: "TIC2026-0011", docNo: "", rev: "", date: "2026-04-20", type: "Technical",
    title: "-C wall control software 2.10 (and 2.05) - what changed",
    applies: { modelRe: ["^SYSTXCCITC01-?C", "^SYSTXCCWIC01-?C", "^SYSTXBBECC01-?C", "^SYSTXBBWEC01-?C"] },
    appliesText: "Carrier SYSTXCCITC01-C, SYSTXCCWIC01-C; Bryant SYSTXBBECC01-C, SYSTXBBWEC01-C. 2.10 sent over the air from the week of April 27, 2026; 2.05 from the week of January 5, 2026 (TIC2025-0038).",
    summary: "2.10: the heat pump heating checkout was using the cooling checkout time (fixed); medium-heat checkout added for modulating furnaces; 6-ton geothermal discovery fixed; indoor / outdoor status display sync. 2.05: fixed an indoor blower surge, zone damper error detection improved, operating readings added to the charging and checkout screens, heat pump lockout shown on the status screen, maintenance reminder reset option.",
    steps: [
      "Blower surging on a -C control below 2.05, or heat pump checkout ending at the cooling checkout time on a control below 2.10: update the control software before chasing the equipment.",
      "Earlier: 2.00 (July 2025) fixed indoor dissipation fault 184 and added the 454B line-length charge note; 1.64 (May 2025) fixed nuisance 160 humidity sensor faults.",
      "Do not install 2.00 on a system with an old 58MVC / 355CAV step-modulating furnace without reading TIC2025-0032.",
      "Older releases: 1.59 (Jan 2025) better outdoor staging, fan coil heat kit learning and airflow verification; 1.55 (Nov 2024) heat pump max defrost 30 min on Next Gen Greenspeed / Evolution Extreme (15 min on others), indoor / outdoor compatibility check, pump down and checkout fixes; 1.50 (Apr 2024) dissipation handling improved, outdoor Quiet mode off by default; 1.43 (Nov 2023) added the new communicating furnaces and fan coil, fixed outdoor temperature reading below zero; 1.11 (Jul 2022) added over-the-air equipment firmware updates, System Monitor high / low temperature alerts, WPA3 Wi-Fi and corrected variable speed outdoor cooling airflow limits; 1.05 (Feb 2022) first release.",
      "Manual update or roll back with a USB-C stick (TIC2024-0019): software 1.50 and newer goes in a folder named TSTAT on the stick; older than 1.50 goes in a folder named FW. Plug it into the control's USB-C port and load it."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2026-0011 / TIC2025-0038 (history: TIC2025-0025, -0017, -0002, TIC2024-0028, -0019, -0012, TIC2023-0017, -0001, TIC2022-0024, -0012)"
  },
  {
    id: "carrier-tic2026-0023", brand: "Carrier", number: "TIC2026-0023 (catalogued as PTC2026-0023)", docNo: "", rev: "", date: "2026-11-09", type: "Technical",
    title: "-C wall control software 2.14 - fault 25 now a malfunction, blower checkout no longer forced",
    applies: { modelRe: ["^SYSTXCCITC01-?C", "^SYSTXCCWIC01-?C", "^SYSTXBBECC01-?C", "^SYSTXBBWEC01-?C"], codes: ["25"] },
    appliesText: "Carrier SYSTXCCITC01-C, SYSTXCCWIC01-C; Bryant SYSTXBBECC01-C, SYSTXBBWEC01-C (-C touch controls only). 2.14 is pushed over the air in stages starting the week of November 9, 2026.",
    summary: "2.14: fault code 25 is now listed as a malfunction; the forced 15 minutes a week of blower run is gone, so AC-only systems can be shut down for the season; charging, checkout and equipment status screens now show units with every value, and the cooling charge mode screens show live indoor airflow CFM; fixes for high humidity readings, duct assessment not finishing, schedule copy, and a crash when uploading a dealer logo; better variable speed staging and setpoint response.",
    steps: [
      "Check the control's software version first. Below 2.14 and the customer has a humidity reading that is too high, a duct assessment that will not finish, or a schedule copy problem: update the control before replacing parts.",
      "On 2.14 the blower no longer runs a weekly 15-minute checkout by itself. A blower that stays off all week on an AC-only system in the off season is normal.",
      "Use the indoor airflow CFM on the cooling charge mode screen to confirm airflow while charging.",
      "The control shows a QR code on screen that opens the release notes for the installed software.",
      "Earlier versions (2.10, 2.05 and older) are in TIC2026-0011."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2026-0023, Software 2.14 Release (-C Wall Control), Nov 2026"
  },
  {
    id: "carrier-tic2025-0034", brand: "Carrier", number: "TIC2025-0034", docNo: "", rev: "", date: "2025-11-11", type: "Technical",
    title: "-B wall control software 4.79 - what changed",
    applies: { modelRe: ["^SYSTXCCITC01-?B", "^SYSTXCCWIC01-?B", "^SYSTXCCICF01-?B", "^SYSTXCCWIF01-?B", "^SYSTXBBECC01-?B", "^SYSTXBBWEC01-?B", "^SYSTXBBECF01-?B", "^SYSTBXBWEF01-?B"] },
    appliesText: "Carrier Infinity SYSTXCCITC01-B, SYSTXCCWIC01-B, SYSTXCCICF01-B, SYSTXCCWIF01-B; Bryant Evolution Connex SYSTXBBECC01-B, SYSTXBBWEC01-B, SYSTXBBECF01-B, SYSTBXBWEF01-B. Over the air from the week of December 1, 2025, then on HVACpartners.",
    summary: "4.79 removed compressor demand response from the CFM calculation to stop fan surges, added per-zone airflow limits for hydronic heat zoning, a maintenance reminder reset button and better on-screen diagnostics. 4.74 (June 2025, limited) fixed hanging at 'Please Wait' during an update, geothermal freeze protection being overwritten, and refined high humidity fault 160.",
    steps: [
      "Fan surging on a -B control below 4.79: update the control software before replacing a motor.",
      "Old 58MVC / 355CAV step-modulating furnace stopped staging after 4.74: see TIC2025-0032 (roll back to 4.70).",
      "Older releases: 4.70 (Jan 2025) better outdoor staging, fan coil heat kit learning, airflow verification, SD card updates; 4.66 (Oct 2024) heater selection at setup, more geothermal / fan coil combinations, partial weigh-in in the charge calculator; 4.64 (Sep 2024) max defrost 30 min on 25VNA4 Greenspeed / 284ANV Extreme and 15 min on 2-stage, 25VNA0, 280A and 5-stage, fixed false 'incompatible motor' error and furnace re-learn after setting changes.",
      "4.56 (Apr 2024) added R-454B dissipation handling (checkout, charging and static tests are blocked while dissipation runs; new 454B dissipation board faults) and set variable speed outdoor quiet mode OFF by default; 4.47 (Aug 2023) first A2L mitigation response; 4.38 (Apr 2023) fixed System Monitor alerts 140-148 when the control is set to Celsius.",
      "2020-2022 releases: 4.31 (Nov 2022) System Monitor (off by default, can be turned on), clear stored Wi-Fi for a new owner, new V coils in the charging coil list; 4.22 (Jul 2022) temperature / humidity alert trip points (codes 187-191, 191 = low humidity), filter check from the pressure monitor; 4.18 = a renamed copy of 4.05 after the 4.17 app problem; 4.05 (Sep 2021) two limit 33 faults in a row now open the heating-call zone dampers fully (wall control shows 126 - Active Heat Cycle Active), a ULN 2-stage furnace fault 34 locks out high heat for one cycle, 18/19VS 5-stage with FER furnace boards runs continuous fan at least at minimum CFM.",
      "3.94 (Jul 2021) blower motor code 41 changed from malfunction to fault, fixed running in the wrong mode; 3.62 / 3.61 (late 2020) Wi-Fi fixes only (some 802.11n routers, some internet providers) - no need to load them without a Wi-Fi problem; 3.60 (Sep 2020) fixed a blank screen after the 3.40 update and false G-terminal alerts during learning; 3.40 (Jun 2020) fixed learning of 2-ton units with an FE4ANF002 fan coil and 24VNA624 with FE4ANB005, and stopped an SD card left in the control from re-loading the same outdoor software; 2.30 (Nov 2019) fixed FER furnace airflow in charging and in dual fuel heat pump heating (needs the furnace board replaced too) and the geothermal lake loop heat stage override.",
      "2017-2020: 2.40 (Feb 2020) added OpenADR 2.0b (utility demand response); 2.00 (Aug 2018) better Wi-Fi / server connection, a wired remote room sensor on zone 1 through the 4-zone control is now recognized, postal code fixes for the weather forecast; 1.32 (Apr 2018) better wireless connection and support for the variable capacity A/C outdoor unit (the older -A control got the same support in 14.02); 1.3 (Nov 2017) more robust Wi-Fi / server connection, occupancy hold changed to 2 hours with unoccupied override to Away, and the homeowner can force a reboot by holding a finger anywhere on the home screen for 10 seconds."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0034 (history: TIC2025-0020, -0001, TIC2024-0026, -0023, -0004, TIC2023-0011, -0004, TIC2022-0022, -0015, -0006, TIC2021-0017, -0003, TIC2020-0020, -0016, -0015, -0009, -0001, TIC2019-0023, TIC2018-0008, -0002, TIC2017-0008)"
  },
  {
    id: "carrier-tic2025-0033", brand: "Carrier", number: "TIC2025-0033", docNo: "", rev: "", date: "2025-11-12", type: "Technical",
    title: "Smart Thermostat update: aux heat and compressor lockout ranges, 45 F heat setpoint",
    applies: { modelRe: ["^TSTATCCEWF", "^TSTATBBEWF"] },
    appliesText: "Carrier TSTATCCEWF-01 and Bryant TSTATBBEWF-01 Smart Thermostat. Over-the-air update from November 12, 2025; needs firmware 1758.03.16.00 or later.",
    summary: "Lowest heat setpoint now 45 F (was 55). Aux heat lockout range now 10-60 F (default 35 F); compressor lockout range now 0-50 F (default 25 F). Adds a Fan Test in the Service Tech App installer setup, reverse logic for dehumidify, and a display dimming setting.",
    steps: [
      "The new settings only appear after the thermostat is on Wi-Fi and updated. To do it in the shop: press FAN 3 times after start-up, pair it to the Carrier SmartHome app (a generic account works), wait about 20 minutes, check Settings > Information shows 1758.03.16.00 or later.",
      "Then factory reset: hold MODE + FAN 10 seconds, arrow to Fr, press FAN twice. Reconnect with the Service Tech App by Bluetooth, do the normal setup, then set the aux heat lockout under Advanced Settings.",
      "At a home with the owner present: set up with the Service Tech App, the owner pairs it in the SmartHome app and shares data with the dealer, then change aux lockout in the Connected Portal."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0033"
  },
  {
    id: "carrier-tic2026-0001", brand: "Carrier", number: "TIC2026-0001", docNo: "", rev: "", date: "2026-02-06", type: "Technical",
    title: "R-454B ducted splits back to 15 ft factory charge (some shipped with 30 ft)",
    applies: { modelRe: [] },
    appliesText: "All Carrier R-454B residential ducted split system units. 30 ft pre-charge from June 1, 2025 (TIC2025-0018); back to 15 ft starting week 4 of 2026, mixed production through February 2, 2026 and mixed stock until warehouses empty.",
    summary: "Know which pre-charge the unit has before you calculate added charge for the line set. 15 ft units: yellow shipping label (2026), charging label and rating plate show the 15 ft charge, no Installer Notice label. 30 ft units: light gray shipping label and an Installer Notice label.",
    steps: [
      "Check the unit's charging label and rating plate - they state the line length the factory charge covers. An Installer Notice label means the increased (30 ft) pre-charge.",
      "Add refrigerant only for line length beyond what the factory charge covers; adding for 15-30 ft on a 30 ft unit overcharges it."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2026-0001"
  },
  {
    id: "carrier-tic2026-0005", brand: "Carrier", number: "TIC2026-0005", docNo: "", rev: "", date: "2026-03-02", type: "Technical",
    title: "New-style furnace door sight glass hides the status LED on older condensing furnaces",
    applies: { modelRe: ["^59(SC|SP|SU|TN|TP|MN|CU)"] },
    appliesText: "All Carrier / Bryant / Payne condensing gas furnaces. Replacement door kits now all come with the new sight glass made for the 3-digit display controls (product bulletins 101-24-19, BY-103-24-18, PA-103-24-13).",
    summary: "A new replacement blower door on an older condensing furnace (control with a status LED, no 3-digit display) may not let you see the status code LED.",
    steps: [
      "To see the LED again, fit the old-style sight glass, part 345272-401, into the new door by drilling a 3/8 in. hole at the spot shown in the bulletin's Fig. 1.",
      "Information only - no change to how the furnace runs."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2026-0005"
  },
  {
    id: "carrier-tic2026-0006", brand: "Carrier", number: "TIC2026-0006", docNo: "", rev: "", date: "2026-03-12", type: "Technical",
    title: "Light commercial ECM units: check the 3-phase power type before install",
    applies: { modelRe: [] },
    appliesText: "Carrier light commercial units with ECM motors up to 10 tons (the model list in our copy of the bulletin was not readable - confirm on HVACpartners).",
    summary: "ECM motors need the right kind of 3-phase supply. Measure each leg to ground to tell the supply type; corner-grounded delta and high-leg supplies may need extra parts.",
    steps: [
      "Wye: each leg about 120 V to ground on 240 V, or about 277 V on 480 V. No change needed.",
      "Corner-grounded delta: two legs read about 240 V (or 480 V) to ground and one leg (normally L2) reads 0 V. Noise problems may need line reactors or a delta-wye isolation transformer.",
      "High leg (wild / stinger leg): two legs about 120 V and one about 208 V to ground on 240 V (277 / 415 V on 480 V). A delta-wye transformer may be needed to run the ECM."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2026-0006"
  },
  {
    id: "carrier-tic2025-0037", brand: "Carrier", number: "TIC2025-0037", docNo: "", rev: "", date: "2025-12-10", type: "Technical",
    title: "Ductless ducted air handler + 15/20/25 kW heat kit on one supply circuit",
    applies: { modelRe: ["^45MUAA", "^45MUHA"] },
    appliesText: "Ductless communicating air handlers 45MUAA and 45MUHA with a 15, 20 or 25 kW heater kit (the outdoor unit size sets the rating because 45MUHA can be set to two capacities).",
    summary: "Wiring change that lets the 115 V air handler be fed from the heat kit's circuit instead of its own supply. Keep the bulletin's corrected electrical tables with the unit's paperwork.",
    steps: [
      "The air handler circuit needs a 15 A inline fuse (its MOP) wired to the load side of heat kit circuit breaker 1 (CB1); use certified parts and get the change approved by the local inspector.",
      "Each heat kit breaker still needs its own 208/230 V supply - this is not a single-point connection for the whole indoor unit.",
      "Indoor power connector: CN11 on the 45MUAA main board, CN1 on the 45MUHA main board. Follow the 15/20 kW or 25 kW wiring figure in the bulletin."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0037"
  },
  {
    id: "carrier-dsb24-0013", brand: "Carrier", number: "DSB24-0013", docNo: "", rev: "", date: "2024-09-06", type: "Service",
    title: "Infinity / Evolution controls with duplicate serial numbers lose cloud connection",
    applies: { modelRe: ["^SYSTXCCITC01-?[BC]", "^SYSTXCCWIC01-?B", "^SYSTXBBECC01-?[BC]"], serialFrom: "2424W200001", serialTo: "3124W204434" },
    appliesText: "SYSTXCCITC01-B / -C, SYSTXCCWIC01-B, SYSTXBBECC01-B / -C with serials 2424W200001-2424W202950, 3124W201501-3124W202025 or 3124W204001-3124W204434 (three separate ranges; the serial badge only checks the outer ends). The repair policy ended 12/31/2024.",
    summary: "A build error gave some controls the same serial number. When a second control with the same serial goes online, the first one loses its connection to the Carrier / Bryant app and the dealer tools.",
    steps: [
      "Do not install a control with a serial in those ranges.",
      "An installed control in the range that lost its cloud connection because its twin is online: replace it with one outside the ranges. If only one control with that serial is connected, it is not affected."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB24-0013"
  },

  // --- HVACpartners check 2026-11-03 afternoon run (TIC backlog, newest first) ---
  {
    id: "carrier-tic2025-0031", brand: "Carrier", number: "TIC2025-0031", docNo: "", rev: "", date: "2025-09-01", type: "Technical",
    title: "Ductless air handler + 5/8/10 kW heater on ONE power circuit - needs a 15 A inline fuse",
    applies: { modelRe: ["^45MUAAQ(18|24|30|36|48|60)", "^45MUHAQ(24|36|60)"] },
    appliesText: "Carrier ductless communicating air handlers 45MUAAQ18-60 and 45MUHAQ24-60 with a 5, 8 or 10 kW EHKM heater kit, when the air handler and heater share one supply circuit (single-point wiring).",
    summary: "The air handler and its electric heater may be fed from one combined circuit, but only with the wiring the bulletin shows. Combined MCA / MOP values for each air handler and heater size are in the bulletin table.",
    steps: [
      "Single-point wiring: the air handler circuit needs an inline 15 A fuse (matches the air handler's MOP) wired to the load side of the circuit 1 breaker. Use certified parts.",
      "Size the supply wire and breaker from the combined MCA / MOP table in TIC2025-0031 (ask the office for it), not from the air handler plate alone.",
      "Leave a copy of the bulletin with the unit's paperwork - the corrected electrical tables have to stay with the unit. The local inspector must approve the installation."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0031"
  },
  {
    id: "carrier-tic2025-0029", brand: "Bryant", number: "TIC2025-0029", docNo: "", rev: "", date: "2025-09-08", type: "Technical",
    title: "Bryant 986TA furnace does not work with the new variable-speed outdoor units",
    applies: { modelRe: ["^986TA", "^290VAN", "^291VAN", "^293VAN", "^191VAN"] },
    appliesText: "Bryant 986TA gas furnaces only, paired with the new variable speed outdoor units 290VAN, 291VAN, 293VAN or 191VAN.",
    summary: "A 986TA furnace is not compatible with the 290VAN, 291VAN, 293VAN or 191VAN outdoor units. The wall control shows an indoor / outdoor not compatible error; the furnace is found and runs normally, but the outdoor unit is ignored.",
    steps: [
      "Wall control says indoor and outdoor are not compatible on a 986TA job: check the outdoor model. A 290VAN / 291VAN / 293VAN / 191VAN will never run with that furnace.",
      "Do not quote or install one of those outdoor units with an existing 986TA - pick a compatible outdoor unit or replace the furnace."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0029"
  },
  {
    id: "carrier-tic2025-0027", brand: "Carrier", number: "TIC2025-0027", docNo: "", rev: "", date: "2025-07-31", type: "Technical",
    title: "EHK3 heater kits built before 2446V do not fit R-454B ceiling-mount fan coils",
    applies: { modelRe: ["^EHK3", "^FMC4[XZ]", "^FMU4[XZ]"], serialTo: "2446V" },
    appliesText: "EHK3 electric heaters for ceiling-mount multifamily fan coils. Heaters built from serial week 2446V on fit both R-410A and R-454B ceiling-mount fan coils (label on the box says so); older heaters fit only the R-410A fan coils FMC4X, FMU4X, FMC4Z, FMU4Z.",
    summary: "The heater back plate was changed for the R-454B ceiling-mount fan coils (the transformer was rotated and the mounting holes moved). New heaters fit old and new fan coils; old heaters do not fit the new R-454B fan coils.",
    steps: [
      "Before installing an EHK3 in an R-454B ceiling-mount fan coil, check the heater serial: it must be week 2446V or later (look for the R-410A & R-454B label on the box).",
      "A heater built before 2446V goes only in an R-410A FMC4X / FMU4X / FMC4Z / FMU4Z fan coil."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0027"
  },
  {
    id: "carrier-tic2025-0014", brand: "Carrier", number: "TIC2025-0014", docNo: "", rev: "", date: "2025-04-28", type: "Technical",
    title: "Small packaged units: TXV label says R410A but the valve is the correct R-454B one - no action",
    applies: { modelRe: ["^48NT-?B48(090|115)", "^50NT-?B48", "^605C[ENP]XB48", "^675CNWB48115", "^PH5GNAB48"], serialFrom: "4924F", serialTo: "1625F" },
    appliesText: "4-ton small packaged units, serials 4924F to 1625F: Carrier 48NT-B48090, 48NT-B48115, 50NT-B48---30/50/60; Bryant 605CEXB48000, 605CNXB48000, 605CPXB48000, 675CNWB48115; Payne PH5GNAB48000.",
    summary: "The TXV in these units may carry a label that says R410A. The valve is calibrated for R-454B and works as designed.",
    steps: [
      "TXV label reads R410A on one of these units: no action needed - do not replace the valve for the label alone."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0014"
  },
  {
    id: "carrier-tic2025-0012", brand: "Carrier", number: "TIC2025-0012", docNo: "", rev: "", date: "2025-04-24", type: "Technical",
    title: "Modulating furnace (series C) limit trips - load the higher intermediate airflow recipe",
    applies: { modelRe: ["^59MN7C", "^987MC"] },
    appliesText: "Carrier 59MN7 series C and Bryant 987M series C modulating gas furnaces. New recipe versions released April 23, 2025 in Service Technician App 6.133.7.",
    summary: "Series C modulating furnaces were getting nuisance limit trips and limit lockouts. The temperature rise is highest at middle firing rates (50-70%). Carrier raised the intermediate (65%) airflows; the new values load from the Service Technician App.",
    steps: [
      "Limit trips or limit lockout on a series C modulating furnace: update the furnace recipe before replacing parts.",
      "Use Carrier / Bryant Service Technician App version 6.133.7 or newer. Installer Setup > connect to the furnace by NFC or Bluetooth. If a newer recipe is offered, tap Update Now and scan it into the furnace control; wait for the success popup.",
      "New recipe versions: 60K 17 in. recipe 600 v7; 80K 3.5 ton 17 in. recipe 602 v7; 100K 21 in. recipe 604 v7; 120K 24 in. recipe 605 v8. (The 80K 5 ton 21 in. got higher airflows in Oct 2024 with recipe version 6.)",
      "Example new Eff2 intermediate airflow: 640 CFM (60K), 930 (80K), 1090 (100K), 1375 (120K)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0012"
  },
  {
    id: "carrier-tic2025-0007", brand: "Carrier", number: "TIC2025-0007", docNo: "", rev: "", date: "2025-04-03", type: "Technical",
    title: "R-454B multipoise V coils: horizontal dissipation-sensor label may be in the wrong place",
    applies: { modelRe: ["^CVAMA"], serialTo: "1025J00001" },
    appliesText: "Carrier / Bryant / Payne R-454B multipoise V furnace coils CVAMA2414XMA through CVAMA6124XMA built before March 3, 2025 (serials before 1025J00001).",
    summary: "The label that shows where to move the A2L dissipation sensor for a horizontal install may be in the wrong spot. The installation instructions and the pre-drilled holes in the aluminum coil extension are correct.",
    steps: [
      "Horizontal install: mount the dissipation sensor at the existing holes in the aluminum coil extension, as the installation instructions show - ignore the label position.",
      "Do not drill new holes for the sensor."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0007"
  },
  {
    id: "carrier-tic2023-0013", brand: "Carrier", number: "TIC2023-0013", docNo: "", rev: "", date: "2023-09-05", type: "Technical",
    title: "CVPMA multipoise furnace coil leaks where the two drain pans join",
    applies: { modelRe: ["^CVPMA"], serialTo: "2123J" },
    appliesText: "Vertex multipoise furnace coils CVPMA built before week 21 of 2023 (clean point June 5, 2023, serial 2123Jxxxxx).",
    summary: "An air gap between the two drain pans lets water get pulled out of the pan and leak through the coil casing. Factory added more silicone lines from week 21 of 2023; every reported leak was on coils built before that.",
    steps: [
      "Water leaking from the casing of a CVPMA coil built before 2123J: check the joint between the two pans.",
      "On older CVPMA coils, run a bead of ordinary high-temperature RTV on the base pan joints - before installation if you can."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2023-0013"
  },
  {
    id: "carrier-tic2023-0007", brand: "Carrier", number: "TIC2023-0007", docNo: "", rev: "", date: "2023-06-30", type: "Technical",
    title: "FJ4DNXA18 fan coil: no blower on a heat call (W) without G on units before week 24 2023",
    applies: { modelRe: ["^FJ4DNXA18"] },
    appliesText: "FJ4DNXA18 (018 size) fan coils. From week 24 of 2023 the harness has a white wire from W to motor tap 4 like the rest of the family.",
    summary: "Older 018 fan coils have no W-to-motor wire, so the blower only runs if the thermostat also energizes G. Heat strips can come on with no fan.",
    steps: [
      "Electric heat on but no blower on an FJ4DNXA18 built before week 24 2023: check whether the thermostat sends G with W.",
      "Fix: set the thermostat to energize G with Y or W, or add a wire from W to motor tap 4."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2023-0007"
  },
  {
    id: "carrier-tic2023-0005", brand: "Carrier", number: "TIC2023-0005", docNo: "", rev: "", date: "2023-05-19", type: "Technical",
    title: "Ductless 38MPRBQ09XA3 with old 40MPHAQ09XA3 high wall needs a line-set conversion joint",
    applies: { modelRe: ["^38MPRBQ09", "^40MPHAQ09"] },
    appliesText: "Carrier ductless high tier 9K: new outdoor 38MPRBQ09XA3 paired with the phased-out high wall 40MPHAQ09XA3.",
    summary: "The 38MPRBQ09XA3 has a 1/2 in. suction line; the old 40MPHAQ09XA3 has a 3/8 in. line, so they need a conversion joint.",
    steps: [
      "Order conversion joint RC part 15500303002544 for a 38MPRBQ09XA3 + 40MPHAQ09XA3 pair.",
      "40MPHBQ09XA3 with the earlier 38MPRAQ09XA3: no extra part - the adapter comes in the indoor unit box."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2023-0005"
  },
  {
    id: "carrier-tic2022-0013", brand: "Carrier", number: "TIC2022-0013", docNo: "", rev: "", date: "2022-07-01", type: "Technical",
    title: "80% ULN furnaces: remove the cardboard heat exchanger shipping brace before installing",
    applies: { modelRe: ["^58SU0", "^58CU0"] },
    appliesText: "All 80% Ultra Low NOx (ULN) furnaces, from week 20 of 2022 (Carrier 58SU0 / 58CU0 shown here; Bryant / Payne ULN 80% models are covered too).",
    summary: "Loose heat exchanger bundles led Carrier to add a removable cardboard shipping brace in the furnace packaging to stop the tubes shifting in transit.",
    steps: [
      "On a new ULN 80% furnace, find and remove the cardboard shipping brace before installation (the warning on the brace says so).",
      "A loose heat exchanger bundle found on an older unit is what this brace was added for - report it rather than run it."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0013"
  },
  {
    id: "carrier-tic2022-0011", brand: "Carrier", number: "TIC2022-0011", docNo: "", rev: "2023-04-17", date: "2022-06-13", type: "Technical",
    title: "Condensing furnace vent: no cellular / foam core ABS or PVC pipe on installs from Dec 1, 2022",
    applies: { modelRe: ["^59[A-Z]{2}", "^9(15|25|26|45|50|55|70|73|82|86|87)[A-Z]{2}", "^PG9"] },
    appliesText: "All Carrier / Bryant / Payne condensing gas furnaces (the TIC covers every condensing furnace; the model list here is the common 90%+ prefixes).",
    summary: "The furnace design standard (ANSI Z21.47 / CSA 2.3) no longer allows ABS or PVC cellular / foam core pipe in the VENT. It was removed from every condensing furnace installation manual. Installs done before December 1, 2022 with foam core vent pipe stay compliant where the local inspector allows it.",
    steps: [
      "Install or vent rework on or after December 1, 2022: use solid-wall pipe for the vent. Cellular / foam core ABS or PVC is NOT approved for the vent.",
      "Foam core pipe is still allowed for the combustion AIR INTAKE pipe where the local code allows it.",
      "Existing foam core vent on a furnace installed before December 1, 2022 is not a violation by itself - check local code."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0011"
  },
  {
    id: "carrier-tic2022-0007", brand: "Carrier", number: "TIC2022-0007", docNo: "", rev: "", date: "2022-05-10", type: "Technical",
    title: "Condensing furnace upflow, left-side drain: revised Z-pipe / drain elbow install (trap pulls loose)",
    applies: { modelRe: ["^59[A-Z]{2}", "^9(15|25|26|45|50|55|70|73|82|86|87)[A-Z]{2}", "^PG9"] },
    appliesText: "Title: modulating 4-way multipoise condensing gas furnace; the TIC lists all 90% condensing furnace models. Only the UPFLOW position with the drain out the LEFT side.",
    summary: "The joint between the condensate trap and the drain elbow was hard to keep secure in upflow with a left-side drain. The install steps changed: build the Z-pipe, rubber elbow and trap outside the furnace, use the formed grommet in the left casing knockout, and keep the Z-pipe level and off the sheet metal.",
    steps: [
      "Remove the inducer housing and the condensate trap. Cut the rubber drain elbow as shown in the install guide (Fig. 15) - keep the formed grommet and the elbow.",
      "Knock out the left side of the casing and fit the FORMED GROMMET. Assemble Z-pipe, rubber elbow and trap outside the unit; slide the spring clamp over the Z-tube.",
      "Set the Z-pipe as level as possible and NOT resting on any sheet metal, clamp the grommet to the Z-pipe, then refit the trap with the Z-pipe assembly.",
      "Prime the trap: take out the upper and middle collector box drain plugs opposite the trap, pour 1 quart of water through a 5/8 in. ID tube and funnel into each port in turn until water runs out the open drain, then refit the plugs.",
      "Inducer housing and trap screws: 17.5 +/- 2.5 in-lb, hand tools only, 20 in-lb maximum."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0007"
  },
  {
    id: "carrier-tic2022-0005", brand: "Carrier", number: "TIC2022-0005", docNo: "", rev: "", date: "2022-04-19", type: "Technical",
    title: "40MBAA ducted ductless: setting up DRY (dehumidify) mode with an ecobee thermostat",
    applies: { modelRe: ["^40MBAAQ"] },
    appliesText: "Carrier 40MBAAQ__XA3 ducted ductless air handler, sizes 24-36, all serials. ecobee thermostats only.",
    summary: "The ecobee drives DRY mode through its one-wire accessory terminal (Acc+) set up as a dehumidifier. DRY only works with the thermostat in cooling, and a cooling call always wins over dehumidify.",
    steps: [
      "ecobee: Settings > Installation Settings > Equipment > Wiring - confirm it sees a wire on Acc+.",
      "Reconfigure equipment: accessory = Dehumidifier, 1 wire (Acc+), relay state when dehumidifier is active = Closed. Under Equipment > Dehumidifier answer NO to 'dehumidify in heat mode'.",
      "Test: Installation Settings > Test Equipment > Dehumidifier ON. At the air handler the interface board should show mode 4 (dry). Turn the test off.",
      "Main menu > System > Dehumidifier ON, then set the humidity level wanted. The thermostat must be in COOL.",
      "Cooling calls run first; after cooling is satisfied the unit goes back to DRY if humidity is still high. With dry-mode DIP switch 3-1 ON, auxiliary heat will not run."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2022-0005"
  },
  {
    id: "carrier-tic2021-0014", brand: "Carrier", number: "TIC2021-0014", docNo: "", rev: "", date: "2022-01-11", type: "Technical",
    title: "Blower motor groan / harmonic noise at shut-down - HD44SE125 / HD52SE124 motors before date code K20V",
    applies: { modelRe: ["^58TN0A135", "^58TNA070", "^58TN1A070", "^58TN1A135", "^59CU5A080", "^59TN6B", "^880TA", "^881TA", "^935CA60080", "^986TC"] },
    appliesText: "Furnaces with variable speed blower motor HD44SE125 (1 hp) or HD52SE124 (1/2 hp). Models listed in the TIC: 58TN0A135C241122/1222, 58TNA070C171116/1216, 58TN1A070C171116/1216, 58TN1A135C241122, 59CU5A080C211120, 59TN6B060C171114, 59TN6B080C171114, 59TN6B120C241122, 880TA48070C17A-A/-B, 880TA66135C24A-A/-B, 881TA48070C17A-A/-B, 881TA66135C24A-A, 935CA60080C21A-A, 986TC42060C17A-A, 986TC42080C17A-A, 986TC66120C24A-A.",
    summary: "Some of these motors made a harmonic coast-down noise when the blower shut off (system resonance). The motor supplier fixed it in production; motors with date code K20V (November 2020) or later do not do it. RC replacement HD44SE125 motors older than K20V were reprogrammed with a stop brake and carry a GREEN DOT sticker.",
    steps: [
      "Noise only when the blower winds down: read the motor date code on its label. J20V or earlier = the known issue; K20V or later = this is not the cause.",
      "Fix: replace with a motor dated K20V or later (or an RC stock HD44SE125 with the green dot sticker).",
      "Same noise on a motor dated K20V or later: contact the field support engineer and file an FRS report."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2021-0014"
  },
  {
    id: "carrier-tic2021-0009", brand: "Carrier", number: "TIC2021-0009", docNo: "", rev: "", date: "2021-04-13", type: "Technical",
    title: "Gas packaged unit marked 'Unit not for conversion to propane' - LP needs a field tee for the low-pressure switch",
    applies: { modelRe: ["^48VL", "^48VT", "^577C", "^PY4G"], serialFrom: "1221F49697", serialTo: "1321F49849" },
    appliesText: "Carrier 48VL / 48VT, Bryant 577C, Payne PY4G small packaged gas units, serials 1221F49697 through 1321F49849.",
    summary: "A gas valve shortage put an alternate valve on these units. Its pressure tap cannot take the LP low-pressure switch, so the units were labeled natural gas only. They CAN still be converted to propane.",
    steps: [
      "Natural gas: no action.",
      "Propane conversion: use the normal LP conversion kit plus a field-supplied 3/4 in. NPT tee with a reducer to 1/8 in. NPT on the INLET side of the gas valve, and connect the low-pressure switch there. The tee and reducer are not in the kit."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2021-0009"
  },
  {
    id: "carrier-tic2021-0008", brand: "Carrier", number: "TIC2021-0008", docNo: "", rev: "", date: "2021-03-29", type: "Technical",
    title: "Electronic air purifier on an open (non-ducted) return needs the safety screen kit - shock hazard",
    applies: { modelRe: ["^DGAPAXX"] },
    appliesText: "Electronic air purifiers DGAPAXX1625, DGAPAXX2025, DGAPAXX1620, DGAPAXX2020, DGAPAXX2420 installed with an open return (no return duct).",
    summary: "Without the safety screen the Filter Enhancement Module (FEM) can be reached by the homeowner or pets and is a shock hazard. A screen kit is required wherever the FEM is reachable during operation or service.",
    steps: [
      "Open return install: fit the screen kit for that purifier - DGAPAXX1625 = KIT170000, DGAPAXX2025 = KIT171000, DGAPAXX1620 = KIT172000, DGAPAXX2020 = KIT173000, DGAPAXX2420 = KIT174000.",
      "Found one already installed on an open return with no screen: tell the homeowner it is unsafe and install the kit."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2021-0008"
  },
  {
    id: "carrier-tic2021-0006", brand: "Carrier", number: "TIC2021-0006", docNo: "", rev: "", date: "2021-03-29", type: "Technical",
    title: "Slime (biofilm) clogging coil pans and condensate drains - how Carrier says to clean it",
    applies: { modelRe: [] },
    appliesText: "Evaporator coils and fan coils (any brand - Carrier calls it an industry-wide issue), worst in areas with long cooling / dehumidifying seasons.",
    summary: "The white (or red, pink, gray) slime is a bacterial biofilm carried in with the condensate. It builds wherever water moves slowly and never dries: drain connections, the trap and the drain end. There is no cheap way to remove it for good, so the answer is cleaning before it blocks and regular checks.",
    steps: [
      "Vacuum the slime out of the pan and off the coil face. Optional: pour 2 quarts of Totaline Cooling Coil Treatment P902-1101 into the pan and let it sit 10 minutes.",
      "Drain end reachable: fill the pan with clean water, vacuum from the drain END to pull everything through, then flush with 5 gallons of water or a hose.",
      "Drain end not reachable: put a hose into the pan's drain outlet and let water pressure push the clog through; if it will not clear, run a long small wire brush through the line and repeat.",
      "Between visits a Totaline condensate pan strip (P902-38003 to P902-38007, by system size) near the pan outlet slows regrowth; replace it at each PM.",
      "Do NOT rely on UV lights in the drain, antimicrobial pipe or bleach - testing showed little effect, and bleach fumes corrode HVAC parts. Carrier does not recommend bleach near the equipment."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2021-0006"
  },
  {
    id: "carrier-tic2021-0005", brand: "Carrier", number: "TIC2021-0005", docNo: "", rev: "", date: "2021-02-17", type: "Technical",
    title: "Greenspeed / Extreme 26-24 variable speed: what the % on the wall control means, and capacity limiting",
    applies: { modelRe: ["^24VNA6", "^25VNA4", "^186CNV", "^284ANV"] },
    appliesText: "Carrier Infinity 24VNA6 / 25VNA4, Bryant Evolution Extreme 186CNV / 284ANV.",
    summary: "The system control picks one of 8 operating tables (by airflow setting, heat or cool, and outdoor temperature) and speeds the compressor up and down inside a safe operating envelope. The % shown is where it sits in THAT table's range, not % of the unit's rated capacity - 40% in one table is a different output than 40% in another.",
    steps: [
      "A low % on the status screen is not by itself a sign of low capacity - judge by temperatures and pressures.",
      "The unit also slows or speeds the compressor on its own to protect itself (pressures, temperatures, airflow, fan speed). That is normal.",
      "Capacity limiting is under Service > Setup > AC/Heat Pump Setup > Capacity Limiting (Cooling / Heating), 10% to 100% in steps of 10. Carrier recommends leaving it at default and letting the system adjust.",
      "Example from the TIC: minimum 900 rpm, maximum 3660 rpm, a 50% limit caps the compressor at the midpoint, 2280 rpm."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2021-0005"
  },
  {
    id: "carrier-tic2020-0007", brand: "Carrier", number: "TIC2020-0007", docNo: "", rev: "", date: "2020-05-13", type: "Technical",
    title: "Ultra Low NOx 80% furnace: new furnace control HK42FZ076 and 12 VDC transducer HK05ZZ006",
    applies: { modelRe: ["^58SU0A(040|060|080|100)", "^830SA", "^PG80ESUA"] },
    appliesText: "California Ultra Low NOx non-condensing furnaces: Carrier 58SU0A040E17-12, 58SU0A060E17-16, 58SU0A080E21-20, 58SU0A100E21-20; Bryant 830SA36040E17A, 830SA48060E17A, 830SA60080E21A, 830SA60100E21A; Payne PG80ESUA36040B, PG80ESUA48060B, PG80ESUA60080C, PG80ESUA60100C. Minor series change in 2020.",
    summary: "These models moved to a new furnace control with new model plugs, a revised wiring diagram and a fault code label with the more standard codes. The pressure transducer changed too.",
    steps: [
      "Furnace control: old HK42EB001, new HK42FZ076. Model plugs changed to match the new control.",
      "Transducer: old 5 VDC, 0-2 in. W.C. HK05ZZ003; new 12 VDC, 0-4 in. W.C. HK05ZZ006.",
      "Use the wiring diagram and fault code label on the unit in front of you - they differ between the old and new series. Revised install manuals and product data are on HVACpartners."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2020-0007"
  },
  {
    id: "carrier-tic2019-0001", brand: "Carrier", number: "TIC2019-0001", docNo: "", rev: "2019-07-16", date: "2019-01-28", type: "Technical",
    title: "GZ024 geothermal split with FE/FV4CN 003 fan coil: charge is 60 oz, not 80 oz",
    applies: { modelRe: ["^GZ024"] },
    appliesText: "Residential geothermal communicating split GZ024 (Cu, GZ024SXXC******1, and CuNi, GZ024SXXN******1) paired with the F(E/V)4CN(B/F)003 fan coil.",
    summary: "Testing showed the 024 size with this fan coil needs 60 oz, not the 80 oz nameplate charge - a 20 oz reduction, not the 7 oz reduction in the GZ install manual.",
    steps: [
      "GZ024 with an FE4CN / FV4CN 003 fan coil: charge to 60 oz total.",
      "Other GZ sizes: follow the current installation instructions; Carrier said more charge changes could follow."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2019-0001"
  },
  {
    id: "carrier-tic2025-0016", brand: "Carrier", number: "TIC2025-0016", docNo: "", rev: "", date: "2025-05-28", type: "Technical",
    title: "37MUHA / 37MURA crossover: new oil return software (oil recovery every 2 hours, not 30 min)",
    applies: { modelRe: ["^37MU[HR]AQ"] },
    appliesText: "Carrier DLS crossover 37MUHA and 37MURA condensing units paired with non-communicating Carrier residential fan coils and furnaces. Communicating systems are not affected. Built-in from 37MUHA serials 18: 1825V24120, 24: 1825V24129, 30: 1825V24174, 36: 1825V24186, 48: 1825V24210, 60: 1825V11225; 37MURA starting serials 18: 1825V11240, 24: 1825V11249, 30: 1825V11276, 36: 1825V11312, 48: 1825V11384, 60: 1825V11444 (37MURA software and PCB were still TBD).",
    summary: "Carrier changed the outdoor board software to fix the initial ratings and efficiency. With a non-communicating fan coil or furnace the oil recovery run now comes every 2 hours instead of every 30 minutes. Product number 37MUHAQxxAA302 has it from the factory; older 37MUHAQxxAA301 units can be flashed or get a new outdoor PCB (available from 6/25/2025).",
    steps: [
      "Older unit cycling into oil recovery every 30 minutes: it needs the software update. Flash kits go through the local DLS / VRF TSM - call them first.",
      "Flashing: power off, remove the top cover and the plastic PCB cover, find the 5 exposed pins on the left corner of the PCB (small chassis).",
      "Hold the programmer pins fully against the 5 pins and press and hold Write until the display shows C_S (success) or E_O (failed). On E_O, re-align and flash again.",
      "Each size (18, 24, 30, 36, 48, 60K) has its own chip - change the chip between outdoor unit sizes. Pin location changes with tonnage."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0016"
  },
  {
    id: "carrier-tic2025-0015", brand: "Carrier", number: "TIC2025-0015", docNo: "", rev: "", date: "2025-04-28", type: "Technical",
    title: "Light commercial R-454B units with R-410A TXV part numbers - not a problem",
    applies: { modelRe: ["^48FE", "^50FE"] },
    appliesText: "Current Carrier light commercial R-454B units. Most FE units use R-410A valve numbers; later tiers use R-454B valve numbers and / or have a dual refrigerant sticker.",
    summary: "Some R-454B light commercial units have TXVs with R-410A part numbers because the valves were developed before R-454B was available. Carrier says the valve works correctly with R-454B.",
    steps: [
      "Do not replace a TXV just because its number is an R-410A valve on an R-454B unit.",
      "Replace a TXV only for an actual metering fault, with the part listed for that unit."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2025-0015"
  },
  {
    id: "carrier-tic2025-0006", brand: "Carrier", number: "TIC2025-0006", docNo: "", rev: "", date: "2025-02-19", type: "Technical",
    title: "50FCQ / 50GCQ / 547K / 549K heat pump: defrost thermostat clamp is loose",
    applies: { modelRe: ["^50[FG]CQ", "^54[79]K"] },
    appliesText: "Light commercial 50FCQ / 50GCQ and Bryant 547K / 549K packaged heat pumps with a P in the serial number. Fixed from week 51 2024 (clean date).",
    summary: "The defrost thermostat (DFT) clamp was made for 3/8 in. pipe but used on 5/16 in. pipe, so the DFT sits loose. It still touches the pipe and works, but it can give poor defrost.",
    steps: [
      "Defrost complaint on one of these units with a P in the serial: check the DFT is tight on its pipe.",
      "Re-fit the clamp per the TIC drawing, or simply fasten the DFT to the pipe with a zip tie."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2025-0006"
  },
  {
    id: "carrier-tic2024-0017", brand: "Carrier", number: "TIC2024-0017", docNo: "", rev: "", date: "2024-05-10", type: "Technical",
    title: "40MBAA / 40MBAB / 40MUAA ducted air handler: move the T1 return air sensor if the system underperforms",
    applies: { modelRe: ["^40MBA[AB]", "^40MUAA"] },
    appliesText: "Carrier DLS and crossover air handlers 40MBAA, 40MBAB and 40MUAA. The sensor location drawing in the TIC is for downflow or horizontal right installs only.",
    summary: "The unit runs off the T1 return air sensor. Where a downflow or horizontal right install underperforms or short cycles, moving T1 to a spot that reads the true return air can fix comfort and cycling. It will not fix airflow, duct, charge or insulation problems.",
    steps: [
      "Check charge, airflow and duct design first.",
      "Downflow or horizontal right install still underperforming: relocate the T1 return air sensor to the position shown in TIC2024-0017 so it reads mixed return air."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2024-0017"
  },
  {
    id: "carrier-tic2024-0015", brand: "Carrier", number: "TIC2024-0015", docNo: "", rev: "", date: "2024-04-25", type: "Technical",
    title: "48JC / 50JC 5-ton: E-12 inverter overheat lockouts above 105 F - SystemVu settings",
    applies: { modelRe: ["^48JC[A-Z]{2}06", "^50JC[A-Z]{2}06"] },
    appliesText: "Carrier 48JC and 50JC rooftop units size 06 (5 ton). These settings are the default on current 5-ton production units.",
    summary: "In high ambient (above 105 F) the compressor inverter can overheat: E-12 on the inverter board shows on the analog board, and SystemVu shows compressor alerts / faults such as 310, 312, 317, 321.",
    steps: [
      "100-115 F areas: MAIN MENU > SETTINGS > UNIT CONFIGURATION > COOLING > COMPRESSOR CONFIGURATION = 5000 RPM; OUTDOOR FAN > ODF MAX SPEED = 1200 RPM; ODF FAN DELAY = 60 seconds; ODF OVR TEMP = 100 F.",
      "Areas that routinely see 115-120 F: compressor 4100 RPM, ODF MAX SPEED 1200 RPM, ODF FAN DELAY 60 seconds, ODF OVR TEMP 95 F.",
      "120 F or higher: an auxiliary cooling fan for the inverter heat sink may be needed - call the Carrier rep."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2024-0015"
  },
  {
    id: "carrier-tic2024-0001", brand: "Carrier", number: "TIC2024-0001", docNo: "", rev: "", date: "2024-01-23", type: "Technical",
    title: "Packaged unit pressure switch HK06WC061 failures - use HK06MB061",
    applies: { modelRe: ["^48TC", "^50TC", "^48HC", "^50HC", "^48KC", "^50KC", "^48LC", "^50LC", "^48VL", "^48VT", "^50VL", "^50VT", "^577C", "^PY4G"] },
    appliesText: "Carrier SRT, MRT and SPP packaged units using pressure switch HK06WC061 (the model list here is the common SRT / MRT / SPP prefixes).",
    summary: "More HK06WC061 pressure switches were failing - mostly stuck closed, some stuck open. Either way the unit shuts down safely. SRT / MRT moved to the new HK06MB061 from week 2 of 2024 and SPP from about week 5 of 2024.",
    steps: [
      "HK06WC061 and HK06MB061 are interchangeable for field replacement.",
      "Replacement Components supersedes HK06WC061 to HK06MB061 while the old part is short.",
      "Emergency only: pressure switch IS20224-5236 may be substituted."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2024-0001"
  },
  {
    id: "carrier-tic2023-0009", brand: "Carrier", number: "TIC2023-0009", docNo: "", rev: "", date: "2023-06-29", type: "Technical",
    title: "48JC / 50JC on a conventional thermostat: set THERMOSTAT TYPE to CONV 2C2H",
    applies: { modelRe: ["^48JC", "^50JC"] },
    appliesText: "Carrier JC rooftop units with SystemVu software version 3.0 controlled by a conventional thermostat.",
    summary: "A SystemVu 3.0 software glitch can stop high cooling with a conventional thermostat unless the thermostat type is set right.",
    steps: [
      "SETTINGS > UNIT CONFIGURATION > GENERAL: UNIT CONTROL TYPE = TSTAT and THERMOSTAT TYPE = CONV 2C2H.",
      "Use CONV 2C2H on every conventional thermostat install."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2023-0009"
  },
  {
    id: "carrier-tic2023-0006", brand: "Carrier", number: "TIC2023-0006", docNo: "", rev: "", date: "2023-07-06", type: "Technical",
    title: "48JC / 50JC variable speed (Copeland ZPV): check the power supply type before install",
    applies: { modelRe: ["^48JC", "^50JC"] },
    appliesText: "Carrier 48JC and 50JC ultra high efficiency rooftop units with the Copeland ZPV variable speed compressor.",
    summary: "The variable speed compressor drive needs the right power supply. Measure each leg to ground before installing. Wye supply is fine; a corner grounded delta should get an isolation delta-wye transformer; a high leg (wild leg) supply must have one or components fail early.",
    steps: [
      "3-phase wye (most common): 208 V system reads about 120 V on each leg to ground; 480 V system about 277 V. No change needed.",
      "Corner grounded delta: two legs read the same (240 V or 480 V) and one leg (normally L2) reads 0 V to ground. Carrier / Emerson recommend an isolation delta-wye transformer.",
      "High leg / wild leg: 240 V system reads about 120 / 208 / 120 V to ground; 480 V system about 277 / 415 / 277 V. A delta-wye transformer is REQUIRED."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2023-0006"
  },
  {
    id: "carrier-tic2022-0023", brand: "Carrier", number: "TIC2022-0023", docNo: "", rev: "", date: "2022-11-02", type: "Technical",
    title: "Ductless wired controller KSACN0801AAA: wire colours change between the whip and the extension cable",
    applies: { modelRe: ["^KSACN0801"] },
    appliesText: "Carrier DLS wired controller kit KSACN0801AAA, wired to CN41 / CN42 screw terminals on the multi-function board in the kit.",
    summary: "The four wires (X, Y, E, 12/5V) can come from the 33 in. factory whip or from the cut and stripped 17 ft extension cable, and the colours are different.",
    steps: [
      "33 in. whip: X = white, Y = yellow, E = brown, 12/5V = red.",
      "17 ft extension cable: X = brown, Y = yellow, E = black, 12/5V = red.",
      "The black wire's insulation is very short - stripping it leaves bare copper. Tape or heat shrink it."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0023"
  },
  {
    id: "carrier-tic2022-0021", brand: "Carrier", number: "TIC2022-0021", docNo: "", rev: "", date: "2022-10-11", type: "Technical",
    title: "40MBAB FL09 with a 24 V thermostat on older outdoor units",
    applies: { modelRe: ["^40MBABQ"], codes: ["FL09"] },
    appliesText: "40MBABQ18XB3 before serial 3522V10662, 40MBABQ24XB3 before 3522V10372, 40MBABQ30XB3 before 3522V10680, 40MBABQ36XA3 before 3322V24527, 40MBABQ48XA3 before 3322V24635, 40MBABQ60XA3 before 4122V10286 - with 38MAQ, 38MBRB or 38MGR outdoor units. Later serials have the fixed software.",
    summary: "FL09 is a platform compatibility error. It only happens with a 24 V thermostat setup on the 38MAQ, 38MBRB and 38MGR outdoor units. A corrected PCB was sent to Replacement Components.",
    steps: [
      "FL09 on an older 40MBAB with a 24 V thermostat: order the corrected PCB.",
      "Until then: run the KSACN1001AAA wired controller that ships with the unit, on an extra 2-core stranded / shielded cable run along with the thermostat cable. Set the DIP switches for the wired controller per the install manual.",
      "Check the compatibility chart CAR-DLSS-12CC on HVACpartners."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0021"
  },
  {
    id: "carrier-tic2022-0019", brand: "Carrier", number: "TIC2022-0019", docNo: "", rev: "", date: "2022-10-20", type: "Technical",
    title: "48/50 TC / HC rooftop: condensate overflow switch will not reset - miswired power",
    applies: { modelRe: ["^48TC", "^50TC", "^48HC", "^50HC"] },
    appliesText: "Carrier 48/50 TC and HC rooftop units with the factory installed condensate overflow switch (COFS).",
    summary: "The COFS logic was powered from the accessory terminal, which the switch itself kills through JMP-4 when it trips. With no power the COFS logic cannot reset.",
    steps: [
      "Unit stays off after a condensate trip even with the pan dry: move the COFS red power wire off the accessory terminal to the 24 VAC out terminal on the main terminal board."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2022-0019"
  },
  {
    id: "carrier-tic2021-0011", brand: "Carrier", number: "TIC2021-0011", docNo: "", rev: "2021-06-18", date: "2021-05-27", type: "Technical",
    title: "2021 Infinity / Evolution systems put in with a temporary 24 V thermostat",
    applies: { modelRe: ["^24VNA[069]", "^25VNA[048]", "^24ANB[167]", "^25HNB6", "^58TN[01]", "^59MN7", "^59TN6", "^186CNV", "^189BNV", "^18[067]B", "^284ANV", "^280A", "^286B", "^288BNV", "^880T", "^935CA", "^987M", "^986T"] },
    appliesText: "Infinity / Evolution 1-stage, 2-stage, 5-stage and 18/19VS systems with a gas furnace sold during the 2021 wall control shortage (system controls SYSTXCCITC01-B, SYSTXCCWIC01-B, SYSTXBBECC01-B, SYSTXBBWEC01-B). 26/24 variable speed systems and FE fan coils had to keep the communicating control.",
    summary: "During the 2021 chip shortage many communicating systems were installed with a temporary 24 V thermostat, meant to be swapped for the Infinity / Evolution control later. Until swapped they run only to their non-communicating ratings.",
    steps: [
      "Communicating system on a plain 24 V thermostat: zoning does not work (all dampers must be fully open), humidity and staging are limited, and fault history is empty. Ask whether the swap to the system control was ever done.",
      "2-stage thermostat: Y1 and Y2 at the outdoor unit, Y and Y/Y2 at the thermostat, Y1 and Y2 at the furnace.",
      "1-stage thermostat: jumper Y1 and Y2 together at the outdoor unit and at the furnace, use Y at the thermostat.",
      "Heat pump outdoor unit needs a heat pump thermostat. FE fan coil needs the communicating control or a 1-stage thermostat."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2021-0011"
  },
  {
    id: "carrier-tic2020-0012", brand: "Carrier", number: "TIC2020-0012", docNo: "", rev: "", date: "2020-08-20", type: "Technical",
    title: "59MN7 / 987M 060 and 080: lower maximum constant fan airflow (software V05)",
    applies: { modelRe: ["^59MN7B0(60|80)C17", "^987MB420(60|80)C17"] },
    appliesText: "Carrier 59MN7B060C171114 and 59MN7B080C171114; Bryant 987MB42060C17A-A and 987MB42080C17A-A. Software V05 from production week of August 17, 2020 (serial 3420A).",
    summary: "To meet the Fan Efficiency Rating, furnace control software went from V04 to V05 and caps constant fan airflow: 1050 CFM on the 60K units and 875 CFM on the 80K units. Part numbers did not change (production HK42FZ069, service HK42FZ090).",
    steps: [
      "060 size: constant fan switch settings that used to give 1225 or 1400 CFM now give 1050 CFM.",
      "080 size: settings that used to give 1050, 1225 or 1400 CFM now give 875 CFM.",
      "Lower constant fan than the old chart is normal on V05 - not a motor or board fault."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2020-0012"
  },
  {
    id: "carrier-tic2019-0006", brand: "Carrier", number: "TIC2019-0006", docNo: "", rev: "", date: "2019-04-23", type: "Technical",
    title: "Split AC factory charge not enough for 15 ft line set on some sizes",
    applies: { modelRe: ["^105A", "^113A", "^114CNA", "^123A", "^24AAA5", "^24ABB3", "^24ACB3", "^24ACC4", "^[BCP]A1[345]N[AC]"] },
    appliesText: "Carrier 24AAA5, 24ABB3, 24ACB3, 24ACC4; Bryant 105A, 113A, 114CNA, 123A; BA13NA / BA14NA / BA15NA, CA13NA / CA14NA / CA15NA, Payne PA13NA / PA14NC / PA15NC. Sizes not listed below ship with enough charge for 15 ft.",
    summary: "On some models the factory charge does not cover the rated coil match with 15 ft of line set. Listed as factory charge -> charge needed with 15 ft (lbs).",
    steps: [
      "24AAA5 / 105A: 018 3.83 -> 4.82. BA15NA / CA15NA / PA15NC: 018 3.70 -> 4.82.",
      "24ABB3 / 113A (single phase): 018 3.15 -> 4.20, 024 3.15 -> 4.17, 030 4.30 -> 4.90, 036 4.67 -> 5.36, 048 7.10 -> 8.20. BA13NA / CA13NA / PA13NA: the same five sizes and numbers.",
      "24ACB3 / 123A: 018 3.15 -> 4.20.",
      "24ACC4 / 114CNA: 018 3.72 -> 4.77, 024 3.87 -> 4.20. BA14NA / CA14NA / PA14NC: 018 3.18 -> 4.77, 024 3.73 -> 4.20, 036 4.67 -> 5.42.",
      "3-phase 24ABB3 and PA13NA also have sizes that need more charge - see the TIC table. Always finish charging by the method on the unit's charging label."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2019-0006"
  },
  {
    id: "carrier-tic2018-0009", brand: "Carrier", number: "TIC2018-0009", docNo: "", rev: "", date: "2018-10-25", type: "Safety",
    title: "Gas valve exposed to over-pressure (above 0.5 PSIG): replace the valve",
    applies: { modelRe: ["^58[A-Z]{2}", "^59[A-Z]{2}", "^(310|312|313|315|800|801|811|812|813|820|830|880|886|887)[A-Z]{2}", "^9(15|25|26|45|50|55|70|73|82|86|87)[A-Z]{2}", "^PG[89]", "^48VL", "^48VT", "^577C", "^PY4G"] },
    appliesText: "All Carrier / Bryant / Payne gas furnaces and gas small packaged (SPP) units (the model list here is the common prefixes).",
    summary: "Residential and light commercial gas valves are rated to 0.5 PSIG (14 in. w.c.) maximum. Even a short exposure above that can permanently damage the valve and lead to a gas leak.",
    steps: [
      "If there is reason to think the valve saw a high pressure event (utility over-pressure, gas line test left connected): replace the gas valve right away.",
      "Pressure testing gas piping above 0.5 PSIG: disconnect the furnace supply pipe and cap it before and during the test.",
      "Test at or below 0.5 PSIG: turn off the valve's switch and the manual shutoff before and during the test.",
      "After connecting: purge the lines and leak check at the furnace before running it."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2018-0009"
  },
  {
    id: "carrier-tic2018-0007", brand: "Carrier", number: "TIC2018-0007", docNo: "", rev: "", date: "2018-07-19", type: "Technical",
    title: "Geothermal open loop (well water): test the water, pick copper / cupronickel or a plate heat exchanger",
    applies: { modelRe: ["^G[BCPTZ]0[0-9]{2}"] },
    appliesText: "Carrier residential geothermal heat pumps on ground water / open loop systems.",
    summary: "Well water must be tested and compared with the water quality table in the unit install manual. Using a geothermal unit on water outside those limits is a misapplication and coax failures are not covered by warranty.",
    steps: [
      "Scaling check: pH under 7.5 and calcium hardness under 100 ppm = low scaling risk. Outside that, set up a monitoring plan.",
      "Also look for iron fouling, corrosion, erosion and clogging.",
      "Copper coax is fine for low-mineral water; use cupronickel for moderate scaling or brackish water.",
      "Bad water: isolate the unit with a serviceable brazed plate heat exchanger (sized from GPM both sides, entering water temps, antifreeze and total BTUH). Local code may require double-wall vented."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2018-0007"
  },
  {
    id: "carrier-tic2018-0005", brand: "Carrier", number: "TIC2018-0005", docNo: "", rev: "", date: "2018-05-02", type: "Technical",
    title: "Rooftop power exhaust harness too short on Economizer X (W7220) units",
    applies: { modelRe: ["^48KC", "^50KC", "^48TC", "^50TC", "^48HC", "^50HC", "^48LC", "^50LC"] },
    appliesText: "48/50KC(Q) 04-06, 48/50TC(Q) 07-30, 48/50HC(Q) 04-28 and 48/50LC 04-25 with Economizer X (JADE W7220 controller) and accessory power exhaust CRPWREXH0xx kits.",
    summary: "The 24 in. harness supplied with accessory power exhausts reaches where the old 7212 economizer controller sat, but the W7220 controller is in the control box, so it does not reach.",
    steps: [
      "Splice an extension into the power exhaust harness so it reaches the W7220 in the control box.",
      "Later kits were to include the extension or have a longer harness part number."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2018-0005"
  },
  {
    id: "carrier-tic2017-0009", brand: "Carrier", number: "TIC2017-0009", docNo: "", rev: "", date: "2017-12-14", type: "Technical",
    title: "CAPMP coil installed horizontal right: install the drain pan extension",
    applies: { modelRe: ["^CAPMP"] },
    appliesText: "Carrier CAPMP furnace A-coils, all sizes. Extra pan bracket and pan seal from week 3817; pan extension carton included from week 5017.",
    summary: "In horizontal right, CAPMP coils could blow water off the coil into the airstream at high CFM, or push water between the drain pans and out the cabinet corners.",
    steps: [
      "Horizontal right only: install the pan extension from the carton with the self-tapping screws, and put the cork tape strip under the extension in front of the vertical pan to seal it (install instructions IM-CAPM-09).",
      "Other positions: the extension can be discarded.",
      "Water blowing off an older CAPMP in horizontal right: replacement pan extension kit 343679-701."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2017-0009"
  },
  {
    id: "carrier-tic2017-0007", brand: "Carrier", number: "TIC2017-0007", docNo: "", rev: "", date: "2017-06-22", type: "Technical",
    title: "Geothermal: Geo-Prime tank with a two-pump pressurized variable speed flow center - pump cavitation",
    applies: { modelRe: ["^ACGP", "^G[BCPTZ]0[0-9]{2}"] },
    appliesText: "Variable speed two-pump pressurized flow centers used with the Geo-Prime tank (P/N ACGP). Single-pump flow centers are not affected.",
    summary: "When the constant-speed pump is off and the tank is near atmospheric pressure, the variable speed pump can see negative suction pressure and cavitate.",
    steps: [
      "Existing install: move the constant-speed pump power wiring off the UPC-GEO controller to the T (load) side of the compressor contactor, so it runs whenever the compressor runs.",
      "New install: do not pair the Geo-Prime tank with a two-pump pressurized variable speed flow center unless the second pump is wired that way or mounted below the flow center. Alternatives: Geo-Booster pressurization or an NP (non-pressurized) two-pump flow center."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2017-0007"
  },
  {
    id: "carrier-tic2017-0005", brand: "Carrier", number: "TIC2017-0005", docNo: "", rev: "", date: "2017-04-28", type: "Technical",
    title: "3-6 ton rooftop: remove the wood base pan protectors before setting the unit",
    applies: { modelRe: ["^48TC", "^50TC", "^48KC", "^50KC", "^48HC", "^50HC", "^48LC", "^50LC", "^5(58|80|48)J", "^5(59|82|47)J", "^5(51|81|49)J"] },
    appliesText: "Small rooftop chassis 1 and 2: 48/50TC(Q) 3-6 ton (558J / 580J / 548J), 48/50KC(Q) 3-5 ton (559J / 582J / 547J), 48/50HC(Q) 3-5 ton (551J / 581J / 549J), 48/50LC 3-5 ton, from serial 1417Cxxxxx.",
    summary: "Two wood pieces are bolted under the unit to protect the base pan from forklift damage. Left in place they block the ductwork.",
    steps: [
      "Remove the 12 screws (3 brackets per wood piece, 2 screws each) and throw away the wood and brackets before installing.",
      "Forking from the side: keep the forks level until fully engaged before tilting, or they can go between the wood and the base."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2017-0005"
  },
  {
    id: "carrier-tic2016-0004", brand: "Carrier", number: "TIC2016-0004", docNo: "", rev: "", date: "2016-06-21", type: "Technical",
    title: "GZ / GC communicating geothermal: thermostat, line set and heater tips",
    applies: { modelRe: ["^GZ0[0-9]{2}", "^GC0[0-9]{2}"] },
    appliesText: "Carrier GZ split and GC packaged communicating geothermal units.",
    summary: "GZ works with Infinity / Evolution (2 wires on AB) or a 24 V thermostat; GC is communicating only. Line set and lift limits apply to GZ splits.",
    steps: [
      "GZ with a 24 V thermostat and a gas furnace: the thermostat must be a 3-stage heat / 2-stage cool dual fuel heat pump type. An ABCD adaptor ships with the unit.",
      "The outdoor air sensor connects to the furnace or fan coil board, not the GZ.",
      "GZ line set: 75 ft total equivalent maximum. Up to 20 ft height difference is normal; 20-40 ft add a liquid line solenoid (and an inverted trap before the drop if the indoor unit is above the GZ). Never over 40 ft.",
      "GZ outdoors: the flow center must stay indoors, and protect the coax from freezing.",
      "GC will not run on a 24 V thermostat. If the communicating control fails, emergency heat gives electric heat only (if installed). Communicating heaters are KWCEH (5-20 kW); they do not fit GT / GP / GB units."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2016-0004"
  },
  {
    id: "carrier-tic2013-0009", brand: "Carrier", number: "TIC2013-0009", docNo: "", rev: "2014-05-14", date: "2013-10-02", type: "Technical",
    title: "Heat pump liquid service valve adapter breaking: hand tight plus 1/2 turn",
    applies: { modelRe: ["^25H[A-Z]{2}", "^25VNA", "^2(1[0-9]|2[0-9]|8[0-9])[A-Z]", "^PH1[3-6]"] },
    appliesText: "All Carrier / Bryant / Payne split heat pumps with the liquid line adapter. Thicker adapter wall from week 7, 2014 (serial 0714Exxxxx) - the same install steps still apply.",
    summary: "Heat pump liquid line adapter connectors were breaking off during install because the adapter nut was over-torqued.",
    steps: [
      "Tighten the adapter nut finger tight, then 1/2 turn more (180 degrees) with a wrench - no more.",
      "Remove the Teflon O-ring before brazing the liquid line sweat connection so it does not melt or deform.",
      "Always use a heat sink such as a wet rag while brazing."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2013-0009"
  },
  // --- HVACpartners hourly catch-up 2026-11-03 evening: Dealer Service Bulletins (DSB) ---
  {
    id: "carrier-dsb25-0013a", brand: "Carrier", number: "DSB25-0013A", docNo: "", rev: "02", date: "2025-10-20", type: "Service",
    title: "48/50GC-GE, 581K/551K 3-5 ton: Broad Ocean condenser fan motor loses high speed - add the diode harness",
    applies: { modelRe: ["^48GC", "^50GC", "^48GE", "^50GE", "^581K", "^551K"] },
    appliesText: "Light commercial 3-5 ton packaged units Carrier 48/50GC and 48/50GE, Bryant 581K / 551K with Broad Ocean ECM condenser fan motors HC42GQ462 or HC42GQ463. All 2024 and 2025 units built so far. Replaces DSB25-0013 and TIC2025-0028.",
    summary: "On units built from 2024 the condenser fan motor can fail in hot weather so it no longer runs on high speed. The earlier resistor fix did not save motors that were already damaged. Redesigned motors are now available from RC.",
    steps: [
      "Motor whose high-speed tap (yellow low-voltage wire) has failed: replace the motor. If someone moved the wiring to the medium tap (white wire) as a stopgap, put all wiring back to factory after the new motor is in.",
      "Original motor still working on high speed: do NOT replace it. Kill power, then fit the zener diode harness 48TCHSRSN--A00 in the control box between the yellow and brown wires going to the outdoor fan motor (cut both wires and rejoin with crimp connectors - 3 wires in each: two yellow or two brown plus one lead from the diode assembly).",
      "Interim only, until a motor arrives: running high-speed cooling on the medium tap (white wire) is acceptable - about 20% less fan RPM, and Carrier says head pressure stays OK."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB25-0013A"
  },
  {
    id: "carrier-dsb21-0010", brand: "Carrier", number: "DSB21-0010", docNo: "", rev: "", date: "2021-11-17", type: "Service",
    title: "ULN non-condensing furnace in an attic: BTS trips / burner noise from fiberglass - add a combustion air filter on the door",
    applies: { modelRe: ["^58SU0", "^58CU0"] },
    appliesText: "Non-condensing Ultra-Low NOx (ULN) gas furnaces, mainly attic installs. The bulletin's model table did not come through in the copy read: Carrier 58SU0 / 58CU0 are shown here; Bryant / Payne ULN 80% models are likely covered too.",
    summary: "Airborne fiberglass from attic insulation gets pulled into the ULN burner box and plugs the burner mesh and diffuser plate. That causes combustion noise, a hotter burner box and Burner Thermal Switch (BTS) trips. Carrier's approved fix is a pleated filter over the combustion air louvers on the outside of the furnace door.",
    steps: [
      "Use a 1 in. or 2 in. pleated MERV 5-8 filter with a UL mark, sized to cover the door louvers. Not for closet or similar enclosed installs. Keep 3 in. clear in front of the filter.",
      "Stick it to the door around the louvers with double-sided foam tape rated at least 50-200 F (acrylic, indoor/outdoor type), or seal all 4 edges with aluminum foil tape. Clean the surfaces with isopropyl alcohol first. Do not block the louvers or the door latch; remove the logo badge and foil-tape its holes if needed.",
      "Seal every casing penetration so air cannot bypass the filter: gas pipe (gasket KA56SL100 from the 90% furnaces may be used), wiring, thermostat wire, and around the flue opening (sheet metal, high-temp flue tape or silicone, stove gasket or fine steel wool). The door edge itself does not need sealing.",
      "Fix the notice label from the bulletin on the furnace so later techs know the filter is there. Check it every maintenance visit; vacuum the face if dirty. Expected life 5-15 years in most attics."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB21-0010"
  },
  {
    id: "carrier-dsb20-0006", brand: "Carrier", number: "DSB20-0006", docNo: "", rev: "", date: "2020-09-03", type: "Service",
    title: "Communicating furnace + heat pump (dual fuel): low airflow in HP heat / charging - replace V03 board with HK42FZ090 / HK42FZ092",
    applies: { modelRe: ["^58TN0A", "^58TN1A", "^59MN7B", "^59TN6B", "^880TA", "^881TA", "^986TC", "^987MB"] },
    appliesText: "Carrier 58TN0A, 58TN1A, 59MN7B, 59TN6B; Bryant 880TA, 881TA, 986TC, 987MB - only when run by a communicating wall control (UI) with a heat pump. Modulating boards HK42FZ069 built before week 8 of 2020; variable-speed boards HK42FZ070 built before week 47 of 2019.",
    summary: "Furnace software written for the Fan Efficiency Rating (FER) rules caps airflow at the highest constant-fan airflow during heat pump heating, charging mode and airflow verification. Fixed by furnace board software V04 or later plus wall control 2.4 or later.",
    steps: [
      "Dual fuel system with low airflow in heat pump heating or charging mode: check the furnace board part number and software label.",
      "Replace a V03 board with HK42FZ090 (modulating) or HK42FZ092 (standard variable speed) - these carry V04 or later. All RC stock has been exchanged.",
      "Update the wall control to 2.40 or later (over the air or with a microSD card).",
      "Policy labor key A: replace the V03 board in a field dual-fuel system and confirm UI 2.40 or higher - tell the office."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB20-0006"
  },
  {
    id: "carrier-dsb19-0022", brand: "Carrier", number: "DSB19-0022", docNo: "", rev: "", date: "2019-11-29", type: "Service",
    title: "40 in. tall 90% furnace (58M*, 340-355, PG9M/PG9U): secondary heat exchanger failure - $800 furnace replacement option",
    applies: { modelRe: ["^58MCA", "^58MCB", "^58MXA", "^58MXB", "^58MSA", "^58UVB", "^58MVP", "^58MVB", "^58MVC", "^58MTA", "^58MTB", "^58MEB", "^58MEC", "^340A", "^340M", "^345M", "^350A", "^350M", "^351D", "^352A", "^352M", "^353A", "^353B", "^355[ABCM]", "^490A", "^PG9M", "^PG9U"], serialFrom: "2993A", serialTo: "5211A" },
    appliesText: "Legacy 40 in. tall multipoise 90% furnaces: Carrier 58MCA, 58MCB, 58MXA, 58MXB, 58MSA, 58UVB, 58MVP, 58MVB, 58MVC, 58MTA, 58MTB, 58MEB, 58MEC; Bryant 340A, 340M, 345M, 350A, 350M, 351D, 352A, 352M, 353A, 353B, 355A, 355B, 355C, 355M; Payne 490A, PG9M, PG9U. Serials 2993A00001 - 5211A99999. Printed expiry June 2020 (to be reviewed for extension) - ask the distributor whether it is still open.",
    summary: "If the secondary heat exchanger fails within 15 years of service, the homeowner can choose a new comparable 90% furnace for an $800 buy-in plus the dealer's labor, instead of the SMB 09-0024 option or the trade-in allowance.",
    steps: [
      "Inspect the secondary heat exchanger per SMB / DSB 09-0022 (90% Furnace Heat Exchanger Inspection Procedure) and fill in the inspection certificate - it must go with the claim.",
      "The homeowner must also be offered the SMB 09-0024 options.",
      "Only the like-for-like replacement in the bulletin's Approved Furnace Replacement table is allowed (for example 58MCA1 -> 59SC2 / 59SP2, 58MXA -> 59SC5 / 59SP5; the replacements listed are 59SC2, 59SP2, 59SC5, 59SP5, 59TP6, 59TN6, 59MN7; Bryant 912S, 922S, 915S, 925S, 926T, 986T, 987M; Payne PG92E, PG92S, PG96V, PG95XAT). Get the exact match from the office. A size change within the table is allowed; an upgrade is not (use the trade-in program for that).",
      "Office files it as a unit exchange under SMB19-0022 with the certificate."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB19-0022"
  },
  {
    id: "carrier-dsb15-0028", brand: "Carrier", number: "DSB15-0028", docNo: "", rev: "", date: "2015-10-30", type: "Service",
    title: "40 in. 90% furnace primary HX replaced: gap at the inducer - shorten the inducer stand-off legs",
    applies: { modelRe: ["^58MCA", "^58MCB", "^58MXA", "^58MXB", "^58MSA", "^58UVB", "^58MVP", "^58MVB", "^58MVC", "^58MTA", "^58MTB", "^340A", "^340M", "^345M", "^350A", "^350M", "^351D", "^352A", "^352M", "^355[ABCM]", "^PG9M", "^PG9U"] },
    appliesText: "Legacy 40 in. tall condensing furnaces Carrier 58MCA, MCB, MXA, MXB, MSA, UVB, MVP, MVB, MVC, MTA, MTB; Bryant 340A, 340M, 345M, 350A, 350M, 351D, 352A, 352M, 355A, 355B, 355C, 355M; Payne PG9M, PG9U.",
    summary: "After a primary heat exchanger change the cell panel often ends up slightly bowed, leaving a gap between the condensing heat exchanger outlet and the inducer inlet. Shortening the inducer mounting stand-offs lets the inducer seal; Carrier says this is safe.",
    steps: [
      "Hold the inducer (legs removed) in its sealed position on the condensing HX outlet and measure from each leg socket to the cell panel.",
      "Mark that length on the stand-off and cut the extra off with a fine-tooth hacksaw - from the end opposite the taper and step.",
      "Refit the stand-off, mount the inducer with its screw and check the seal. Repeat as needed. Usually only the upper legs need cutting."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0028"
  },
  {
    id: "carrier-dsb19-0021", brand: "Carrier", number: "DSB19-0021", docNo: "", rev: "", date: "2019-11-18", type: "Service",
    title: "Fan coil heat kits KFCEH (week 27-45 of 2019): factory miswire blows fuses on first heat call",
    applies: { modelRe: ["^KFCEH3201F20B", "^KFCEH3301C20B", "^KFCEH2001318B", "^KFCEH3401F24B", "^KFCEH3501F30B"], serialFrom: "2719V", serialTo: "4519V" },
    appliesText: "Carrier / Bryant / Payne fan coil electric heat kits KFCEH3201F20B, KFCEH3301C20B, KFCEH2001318B, KFCEH3401F24B, KFCEH3501F30B, serials 2719V00000 - 4519V99999. Kits built before week 27 of 2019 are fine; reworked kits carry an orange dot on the label.",
    summary: "A factory wiring error in these heat kits can blow fuses, trip breakers or fail relays and other parts the first time the electric heat runs. Not a safety issue, and a kit that is installed and already heating is fine long term.",
    steps: [
      "Kit installed and heating normally: no action.",
      "New install or first heat call with blown fuses / tripped breakers / failed relays: check the kit serial. Uninstalled kits in the range go back through the distributor for reworked ones (orange dot).",
      "The 20 kW kits KFCEH3201F20B and KFCEH3301C20B only may be installed if L1, L2, L3 and L4 are wired exactly per the Appendix A sheet in the bulletin - get that sheet from the office before wiring."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB19-0021"
  },
  {
    id: "carrier-dsb19-0012", brand: "Carrier", number: "DSB19-0012", docNo: "", rev: "", date: "2019-06-20", type: "Service",
    title: "Rooftop / commercial split hail guard tabs bent out - sharp edge, wear gloves",
    applies: { modelRe: ["^48HC", "^50HC", "^48LC", "^50LC", "^48TC", "^50TC", "^50HCQ", "^50TCQ", "^38AU", "^548J", "^549J", "^551J", "^581J", "^558J", "^580J", "^569J", "^575J"] },
    appliesText: "Bryant 548J08-24, 549J07-12, 551J/581J07-28, 558J/580J08-30, 569J16 / 25, 575J16 / 25; Carrier 38AU**16 / 25, 48/50HC07-12 and 17-24, 48/50LC07 and 14-26, 48/50TC08-14 and 17-30, 50HCQ07-09, 50TCQ08-12 and 17-24. Serials 0110Gnnnnn - 1319Gnnnnn and 0110Pnnnnn - 1319Pnnnnn; tab redesigned from 1419P.",
    summary: "The shipping crate can bend the hail guard louver panel tabs outward, leaving an edge that can cut you while uncrating or servicing.",
    steps: [
      "Wear gloves and safety glasses when uncrating or servicing these units.",
      "Tabs sticking out above the top cover: remove the panel, bend the tabs flush with the panel (do not mar the paint) and refit it with every tab under the top cover."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB19-0012"
  },
  {
    id: "carrier-dsb19-0010", brand: "Carrier", number: "DSB19-0010", docNo: "", rev: "", date: "2019-06-14", type: "Service",
    title: "2015 fan coils with Digi-Motor: failed motor control module - test the motor before fitting a new module",
    applies: { modelRe: ["^F[BEVXY]4[A-Z]", "^PF[0-9]"], serialFrom: "0115A", serialTo: "5215A" },
    appliesText: "All Carrier, Bryant and Payne residential fan coils built in 2015 (serials 0115A00000 - 5215A99999) with a Digi-Motor blower motor. The bulletin's motor / module part number table did not come through in the copy read - check the motor label. Policy ended April 1, 2021; the motor checks still apply.",
    summary: "Some 2015 fan coils with Digi-Motor blowers lost the motor's control module. Replacing just the module is OK only if the motor section passes three checks - a new module on a bad motor will fail too.",
    steps: [
      "Power off. Blower wheel must spin freely.",
      "Ohmmeter from each pin of the motor's 3-pin power connector to the aluminum end plate: must be more than 100k ohms (no short to ground).",
      "Phase to phase across each pair of the 3 leads: each under 20 ohms and all three within +/-10% of each other.",
      "Any check fails: replace the whole motor, not the module."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB19-0010"
  },
  {
    id: "carrier-dsb19-0009", brand: "Carrier", number: "DSB19-0009", docNo: "", rev: "", date: "2019-06-14", type: "Service",
    title: "2015 fan coils with Endura Pro: failed motor control module - test the motor before fitting a new module",
    applies: { modelRe: ["^F[BEVXY]4[A-Z]", "^PF[0-9]"], serialFrom: "0115A", serialTo: "5215A" },
    appliesText: "All Carrier, Bryant and Payne residential fan coils built in 2015 (serials 0115A00000 - 5215A99999) with an Endura Pro blower motor. The bulletin's motor / module part number table did not come through in the copy read - check the motor label. Policy ended April 1, 2021; the motor checks still apply.",
    summary: "Same as the Digi-Motor bulletin DSB19-0010, for Endura Pro motors: replace only the control module if the motor section tests good.",
    steps: [
      "Blower wheel spins freely; each motor connector pin to the aluminum end plate more than 100k ohms; each lead-to-lead reading under 20 ohms and within +/-10% of the others.",
      "Any check fails: replace the whole motor - a new module will fail on a bad motor."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB19-0009"
  },
  {
    id: "carrier-dsb18-0010", brand: "Carrier", number: "DSB18-0010", docNo: "", rev: "", date: "2019-02-20", type: "Service",
    title: "5-stage 24VNA9 / 25VNA8 inverter (IGBT) failures - confirm before replacing, discharge before removing",
    applies: { modelRe: ["^24VNA9", "^25VNA8", "^189BNV", "^288BNV"], codes: ["179"], serialFrom: "0114E", serialTo: "5118E" },
    appliesText: "Carrier 24VNA9 / 25VNA8 and Bryant 189BNV / 288BNV, all sizes, serials 0114E00001 - 5118E99999. Hardware improved from early 2019. The 2T inverter in the 13 and 24B sizes did not get the IGBT changes.",
    summary: "Inverter IGBT failures ran higher than expected (worst on spring 2017 builds). A failed inverter shows as fault 179 ODU Communication Fault on the wall control, no LD1 / LED1 status lights, or a tripped breaker.",
    steps: [
      "Confirm correct supply voltage per the nameplate first. Replace the inverter only if it will not power up with correct power.",
      "After locking out power wait at least 5 minutes, then check DC+ to DC- on the inverter with a meter on DC volts - it must read zero before you pull wires.",
      "Big inrush when the capacitors charge: re-energize with the breaker at the panel when you can.",
      "Use the new inverter part numbers (see also TIC2015-0017 for the hardware changes)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB18-0010"
  },
  {
    id: "carrier-dsb18-0002", brand: "Carrier", number: "DSB18-0002", docNo: "", rev: "", date: "2018-02-09", type: "Service",
    title: "25VNA0 / 280ANV: discharge muffler stub leak - replace muffler LM10KH022 and remove the rubber shipping block",
    applies: { modelRe: ["^25VNA0", "^280ANV"], serialTo: "3517E" },
    appliesText: "Carrier 25VNA0 and Bryant 280ANV variable speed heat pumps, all sizes, serials before 3617E.",
    summary: "The discharge muffler copper stub can leak from vibration when the rubber mass dampener (really a shipping block) gets frozen into ice in the base pan.",
    steps: [
      "Recover charge. Cut the discharge tube 1 in. below and 1 in. above the muffler stubs; do not bend any tubes.",
      "Pull the tube that goes to the reversing valve up about 2 in. so it slopes back toward the valve; vertical legs stay vertical.",
      "Fit new muffler LM10KH022 and braze (no low-temp solder), with nitrogen flowing.",
      "Remove the rubber mass dampener for good - leaves 2 in. or more clearance to the base pan.",
      "Evacuate to 500 microns. Weigh in nameplate charge plus 0.60 oz per ft of line set; the bulletin's table also calls for an extra 2.0 lb for the indoor coil on listed sizes."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB18-0002"
  },
  {
    id: "carrier-dsb18-0001", brand: "Carrier", number: "DSB18-0001", docNo: "", rev: "", date: "2018-02-09", type: "Service",
    title: "25VNA813 / 824B, 288BNV013 / 024B: leak where the PEV joins the suction line - braze and add mass dampeners",
    applies: { modelRe: ["^25VNA813", "^25VNA824", "^288BNV013", "^288BNV024"], serialTo: "4917E" },
    appliesText: "Carrier 25VNA813A, 25VNA824B; Bryant 288BNV013, 288BNV024B; serials before 5017E.",
    summary: "Discharge line vibration can crack the joint where the PEV connects to the suction line.",
    steps: [
      "Recover charge, braze the leak with 5-15% silver phos-copper alloy under nitrogen (no low-temp solder).",
      "Wire-tie two mass dampeners on the discharge line: 60 g block 308421-202 near the PEV and 30 g block 308421-203 per the bulletin drawing.",
      "Evacuate to 500 microns and weigh in the charge using the wall control weigh-in method."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB18-0001"
  },
  {
    id: "carrier-dsb17-0011", brand: "Carrier", number: "DSB17-0011", docNo: "", rev: "", date: "2018-01-19", type: "Service",
    title: "5-stage 37 size stuck at about 1700 rpm on a communicating system - inverter kit 340481-783",
    applies: { modelRe: ["^24VNA937", "^25VNA837", "^189BNV037", "^288BNV037"] },
    appliesText: "24VNA937, 25VNA837, 189BNV037, 288BNV037 with the factory inverter (serials 1716E15893 - 3817E) or with replacement inverter kits 340481-777 / -781 (any serial). Communicating systems only.",
    summary: "A stage 1 request (1200 rpm) is below the inverter software's 1500 rpm minimum, so the compressor gets stuck near 1700 rpm and will not go up until the call ends.",
    steps: [
      "Fix: replacement inverter kit 340481-783 (corrected software).",
      "Until then: in the wall control service menu, AC / heat pump setup > stage / latch, set minimum stage to Stage 2, outdoor temperature 'always', for cooling (and heating on heat pumps)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB17-0011"
  },
  {
    id: "carrier-dsb17-0016", brand: "Carrier", number: "DSB17-0016", docNo: "", rev: "", date: "2017-11-15", type: "Service",
    title: "Screens on condensing furnace vent / intake terminations - allowed, but build them this way",
    applies: { modelRe: ["^59S", "^59T", "^59M", "^59C", "^58M[A-Z]{2}", "^91[2-6]S", "^92[5-7][ST]", "^98[67][TM]", "^PG9"] },
    appliesText: "All Carrier-built condensing gas furnaces (Category IV, 1-pipe or 2-pipe).",
    summary: "Code and Carrier do not require screens on the vent or intake termination. They are allowed as an option (SMB 87-17) but can cause intake frost, vent icing and nuisance pressure switch trips. If screens cause a problem, removing them is not paid by Carrier.",
    steps: [
      "Exhaust: round screen per the bulletin drawing; mesh no smaller than 1/2 in.; turn the mesh in a diamond pattern so water drips off.",
      "2-pipe intake: needs more screen area - a cylinder about 6 1/2 in. long on a 2 in. elbow or 10 in. long on a 3 in. elbow, same mesh. Do not make it shorter.",
      "Secure with the termination bracket, or drill two 1/8 in. holes on opposite sides of the elbow and tie with stainless wire.",
      "Frost-ups or pressure switch trips on a screened termination: remove the screens first."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB17-0016"
  },
  {
    id: "carrier-dsb17-0003", brand: "Carrier", number: "DSB17-0003", docNo: "", rev: "", date: "2017-05-11", type: "Service",
    title: "SAFETY RECALL 25VNA0 / 280ANV: inverter fuse board can overheat - mandatory rework kit 342830-751 / -752",
    applies: { modelRe: ["^25VNA0(24|36|48|60)", "^280ANV0(24|36|48|60)"] },
    appliesText: "Carrier 25VNA0 and Bryant 280ANV variable speed heat pumps in the serial list of the bulletin's Appendix A (mostly 2011-2014 builds, for example 25VNA024 1811E08513 - 2414E17187, 280ANV024 0412E99277 - 2014E17376). Check the HVACpartners recall database or the office for a specific serial.",
    summary: "A part in the inverter fuse board can overheat, melting an internal plastic cover and making the outside sheet metal hot enough to burn or ignite things touching it. Replacing the fuse board with the updated design prevents it.",
    steps: [
      "Any 25VNA0 / 280ANV from 2011-2014: ask the office to check the serial against the recall list, and look for a fuse board that has already been replaced.",
      "Signs: melted plastic inside the inverter area or a hot spot on the cabinet. Keep anything flammable away from the unit.",
      "Kit 342830-751 (2 and 3 ton) or 342830-752 (4 and 5 ton): fuse board, rework instructions, T10 and T20 Torx bits, 2 large and 3 small screws."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB17-0003"
  },
  {
    id: "carrier-dsb16-0019", brand: "Carrier", number: "DSB16-0019", docNo: "", rev: "", date: "2016-12-06", type: "Service",
    title: "GC geothermal packaged: high pressure codes 31 / 84 in Comfort heat - use Efficiency mode",
    applies: { modelRe: ["^GC0[0-9]{2}"], codes: ["31", "84"] },
    appliesText: "Carrier and Bryant GC communicating geothermal packaged units, all serials, with communicating thermostat software 13.",
    summary: "With heat set to Comfort, a big setpoint jump from standby sends the compressor straight to high stage while the 30-second cold-blow fan delay is still running, so the high pressure switch trips: code 31 (15-minute soft lock) or 84 (4-hour hard lock).",
    steps: [
      "Set heating to Efficiency mode instead of Comfort until the thermostat has software 14 or later.",
      "Web-capable thermostats prompt for the update; others update by flash drive with software from HVACpartners."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB16-0019"
  },
  {
    id: "carrier-dsb16-0018", brand: "Carrier", number: "DSB16-0018", docNo: "", rev: "", date: "2016-11-07", type: "Service",
    title: "35 in. single-stage condensing furnace nuisance code 31: V04 board software ignores pressure switch blips under 4 s",
    applies: { modelRe: ["^59SC[25]", "^912S", "^915S", "^PG92", "^PG95"], codes: ["31"] },
    appliesText: "35 in. tall single-stage condensing gas furnaces; boards with software V04 from week 40 of 2016 (serial 4016A). The bulletin's model / board table did not come through in the copy read - Carrier 59SC2 / 59SC5, Bryant 912S / 915S, Payne PG92 / PG95 are shown here as the 35 in. single-stage families.",
    summary: "Condensate droplets passing over the inducer housing pressure port can blip the housing pressure switch open (a magnehelic 'bounces'), giving status code 31. Board software V04 adds a 4-second delay so those blips are ignored; longer losses still run the normal code 31 routine.",
    steps: [
      "Code 31 nuisance trips: first fix sizing, venting and condensate piping / drainage.",
      "Still tripping: replace the control board with one that has the latest software. The version is on a label after the barcode and part number (for example V04 on HK42FZ061). RC stock was exchanged (boxes first marked with a colored dot).",
      "Not having code 31 problems: no action."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB16-0018"
  },
  {
    id: "carrier-dsb15-0022a", brand: "Carrier", number: "DSB15-0022A", docNo: "", rev: "A", date: "2016-08-10", type: "Service",
    title: "SAFETY REWORK small rooftops 460 V: blower motor P4/P5/P6 capped together bypasses the overload",
    applies: { modelRe: ["^48HC", "^50HC", "^48TC", "^50TC", "^50HT", "^581J", "^548J", "^558J", "^580J"], serialFrom: "0114P", serialTo: "1815P" },
    appliesText: "460 volt units only: Carrier 48/50HC, 48/50TC, 50HT; Bryant 581JE, 548J, 558J, 580J, 580JE, 558JE. Serials 0114Pxxxxx - 1815Pxxxxx.",
    summary: "On some 460 V units the blower motor's internal leads P4, P5 and P6 were capped together, bypassing the motor's internal overload. The motor can overheat, melt insulation and put smoke in the space.",
    steps: [
      "Lock out and tag out. Remove the blower access panel and the motor's electrical cover (an inspection mirror may save pulling the motor).",
      "If P4, P5 and P6 are under one wire nut: separate them and cap each one on its own. Tuck the wires back without pinching.",
      "Refit covers, restore power. Check belt tension and motor amps against the nameplate.",
      "Fill in the 460 Volt Miswire Rework Verification Sheet from the bulletin for the claim."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB15-0022A"
  },
  {
    id: "carrier-dsb16-0007", brand: "Carrier", number: "DSB16-0007", docNo: "", rev: "", date: "2016-05-16", type: "Service",
    title: "GC / GZ geothermal on Infinity / Evolution: no cooling and 'HP Defrost' if the UPM freeze dip switch is moved",
    applies: { modelRe: ["^GZ0[0-9]{2}", "^GC0[0-9]{2}"] },
    appliesText: "Carrier and Bryant GC and GZ communicating geothermal units, all serials.",
    summary: "With an Infinity / Evolution wall control, setting the UPM board freeze dip switch to 15 F / ON causes no cooling, shows 'HP Defrost' and may run backup electric heat. The wall control handles freeze protection, not the dip switch.",
    steps: [
      "Communicating wall control: leave the UPM freeze dip switch at the factory 26 F / OFF and set freeze protection in the wall control.",
      "26 F is for open loop / well water; 15 F is for closed loop.",
      "Non-communicating thermostat or NIM on a GZ: the dip switch works normally at either setting."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB16-0007"
  },
  {
    id: "carrier-dsb16-0003", brand: "Carrier", number: "DSB16-0003", docNo: "", rev: "", date: "2016-04-04", type: "Service",
    title: "40MKC18B / 22B ductless: never plug the blue 5-pin connector into CN11 - instant board failure",
    applies: { modelRe: ["^40MKC18", "^40MKC22"] },
    appliesText: "Carrier ductless 40MKC18B and 40MKC22B (40MKCB / MKQB high wall indoor units).",
    summary: "The blue 5-pin connector is for the display board when a wired controller is used. Plugged into CN11 it shorts the EPROM and kills the board at power-up. CN11 is only used on the 24K and 36K units (vertical swing motor).",
    steps: [
      "On 18K / 22K units leave CN11 empty.",
      "Newer connecting cables come without the yellow wire in the harness so the board survives start-up."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB16-0003"
  },
  {
    id: "carrier-dsb16-0001", brand: "Carrier", number: "DSB16-0001", docNo: "", rev: "", date: "2016-02-25", type: "Service",
    title: "Ductless ceiling cassette grille harness: match plug colours or the unit will not run",
    applies: { modelRe: ["^40MBQB", "^619REQ"] },
    appliesText: "Carrier 40MBQB*C---3 and Bryant 619REQ*CBMA ceiling cassettes.",
    summary: "If the white 5-pin female grille connector is plugged into the red male port, the cassette will not operate (no board damage).",
    steps: ["Match each grille plug to the port of the same colour."],
    priority: "info", confidential: true,
    source: "HVACpartners DSB16-0001"
  },
  {
    id: "carrier-dsb15-0026", brand: "Carrier", number: "DSB15-0026", docNo: "", rev: "", date: "2016-01-14", type: "Service",
    title: "24VNA9 / 25VNA8 AOC board: replace software V1-V3 boards with V5 / V7 (HK38EA032 / 033 / 036 / 037)",
    applies: { modelRe: ["^24VNA9", "^25VNA8", "^189BNV", "^288BNV"] },
    appliesText: "Carrier 24VNA9 / 25VNA8, Bryant 189BNV / 288BNV: 2 ton built before week 47 of 2014 (4714E), 3-5 ton built before week 3 of 2015 (0315E).",
    summary: "Later AOC software adds self-recovery and removes nuisance fault codes. Boards with software V1, V2 or V3 can be swapped for V4, V5 or V7 when a board fails or nuisance codes show up. V4 only needs changing on a non-communicating AC (see DSB15-0018).",
    steps: [
      "13 and 24B sizes: HK38EA032 (V5) or HK38EA036 (V7).",
      "24A, 25, 36, 37, 48, 49 and 60 sizes: HK38EA033 (V5) or HK38EA037 (V7)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0026"
  },
  {
    id: "carrier-dsb15-0027", brand: "Carrier", number: "DSB15-0027", docNo: "", rev: "", date: "2015-09-25", type: "Service",
    title: "Whole-house dehumidifier DEHXXCDA1070 / 1095: E4 shutdown with board firmware 1.1 - replace board 5478",
    applies: { modelRe: ["^DEHXXCDA1070", "^DEHXXCDA1095"], codes: ["E4"], serialTo: "2714V" },
    appliesText: "Carrier IAQ dehumidifiers DEHXXCDA1070 and DEHXXCDA1095 with serials earlier than week 28 of 2014 (2814V).",
    summary: "Internal control board firmware 1.1 can raise a false E4 'insufficient capacity' alert and shut the unit down.",
    steps: [
      "Open the unit and read the internal control board firmware revision.",
      "Revision 1.1: replace the internal control board, part number 5478 (same board for both models).",
      "Then troubleshoot any remaining E4 per the steps in the bulletin."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0027"
  },
  // --- HVACpartners hourly catch-up 2026-11-03 7 PM: Dealer Service Bulletins 2013-2017 ---
  {
    id: "carrier-dsb17-0013", brand: "Carrier", number: "DSB17-0013", docNo: "", rev: "", date: "2017-10-13", type: "Service",
    title: "Mobile home packaged units (SPP MH) 42AC, 36 and 42HP: beating 'wah-wah' fan noise - fit 4-blade fan LA01AB204",
    applies: { modelRe: [] },
    appliesText: "Carrier small packaged mobile home units (SPP MH) in the 42AC, 36HP and 42HP chassis sizes built before week 38 of 2017 (Sept 18, 2017). The bulletin gives no model numbers.",
    summary: "A beating or 'wah-wah' noise can come from resonance when the 3-blade condenser fan and the compressor run at matching frequencies. Production changed to a 4-blade fan from week 38 of 2017.",
    steps: [
      "Customer complains of a pulsing / beating fan noise on one of these units built before week 38 of 2017.",
      "Replace the original 3-blade fan LA01RA033 with the 4-blade fan LA01AB204 (stocked by RC)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB17-0013"
  },
  {
    id: "carrier-dsb16-0012", brand: "Carrier", number: "DSB16-0012", docNo: "", rev: "", date: "2016-08-17", type: "Service",
    title: "BWB gas water boiler: ERR62 ignition lockout from oxide on the pilot flame sensor - series B single-wire pilot",
    applies: { modelRe: ["^BWBAAN", "^BWBBAN"], codes: ["62", "ERR62"] },
    appliesText: "Natural draft gas-fired hot water boilers BWBAAN000045AAAA (series A, all serials). Series B boilers are BWBBAN.",
    summary: "A few series A boilers get repeated ignition failures and lock out on Error 62 because oxide builds up on the 2-wire pilot's flame sensor. Series B uses a single-wire pilot that senses flame through the pilot to ground, with a changed Honeywell control and harness.",
    steps: [
      "Check the pilot flame first: high inlet gas pressure can lift the flame off the pilot (intermittent ignition failures); a flame that is too low may not touch the pilot hood to complete the sensing circuit. Adjust per the boiler Installation Instructions.",
      "Series A boiler with repeated oxide build-up on the sensor: fit the Honeywell control conversion kit (single-wire pilot, ignition control, harness adapter, conversion label, instructions).",
      "Series B parts are not individually backward compatible with series A - use the kit, not single series B parts."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB16-0012"
  },
  {
    id: "carrier-dsb15-0023", brand: "Carrier", number: "DSB15-0023", docNo: "", rev: "", date: "2015-07-07", type: "Service",
    title: "Multi-zone 38MGQD27 / 538TEQ027 (27K 3-zone): rating plate MCA / MOP wrong - correct is 19 A / 25 A",
    applies: { modelRe: ["^38MGQD27", "^538TEQ027"] },
    appliesText: "Carrier 38MGQD27---3 serials 0415V10485-0415V10875, 1115V22592-1115V22715, 5214V16703-5214V16840; Bryant 538TEQ027RDMA serials 0415V13189-0415V13201, 1115V22159-1115V22183, 5214V15604-5214V15625.",
    summary: "The factory plate shows MCA 27 A and MOP 45 A. The correct values are MCA 19 A and MOP 25 A. Not a safety issue - the board has internal protection above 18.5 A.",
    steps: [
      "Size wire and breaker from MCA 19 A / MOP 25 A, not the plate values.",
      "Already-installed units need no correction. New installs: put the corrected label (shipped on the carton) over the plate values."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB15-0023"
  },
  {
    id: "carrier-dsb15-0019", brand: "Carrier", number: "DSB15-0019", docNo: "", rev: "", date: "2015-06-25", type: "Service",
    title: "Infinity / Evolution single-zone high wall on a multi-zone outdoor unit: communication fault - swap L1 and L2 at the indoor unit",
    applies: { modelRe: ["^40GRQB", "^619FB", "^619FEQ"], serialFrom: "5014V77178", serialTo: "1615V73262" },
    appliesText: "Carrier 40GRQB (Infinity) and Bryant 619FB / 619FEQ (Evolution) high wall indoor units, serials 5014V77178 - 1615V73262, connected to Infinity / Evolution multi-zone outdoor units (38GJQ etc.).",
    summary: "The first production run had the indoor wiring terminals labeled the wrong way round, so the high wall will not communicate with the multi-zone outdoor unit.",
    steps: [
      "Communication fault on this pairing: wire indoor L1 to outdoor L2 and indoor L2 to outdoor L1 (reverse the L1 / L2 wires at the indoor unit)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0019"
  },
  {
    id: "carrier-dsb15-0020", brand: "Carrier", number: "DSB15-0020", docNo: "", rev: "", date: "2015-06-23", type: "Safety",
    title: "MANDATORY SAFETY REWORK fan coil heater kits KFCEH: limit switch date code 1511-1518 may not open - replace",
    applies: { modelRe: ["^KFCEH0501N05", "^KFCEH0801N08", "^KFCEH0901N10", "^KFCEH2501C08", "^KFCEH2601C10", "^KFCEH3001F15", "^KFCEH3201F20", "^KFCEH3301C20", "^KFCEH16"] },
    appliesText: "Fan coil accessory electric heater kits installed in fan coils, 2015 builds - the bulletin's table includes KFCEH0501N05A, KFCEH0801N08A, KFCEH0901N10A, KFCEH2501C08A, KFCEH2601C10A, KFCEH3001F15A, KFCEH3201F20A, KFCEH3301C20A (heater serial ranges are in the bulletin table). Also covers DSB15-0017 (uninstalled kits returned to the factory by 7/31/2015).",
    summary: "The heater limit switch may not open with low or no airflow (failed blower), so the fan coil and nearby materials can overheat. Every installed kit must be checked; any switch with an affected date code is replaced.",
    steps: [
      "Power off and lock out. Remove the 4 screws (5/16 in.) holding the upper panel.",
      "Find the limit switch(es) in the heater control compartment and read the date code on the switch label.",
      "Date code 1511, 1513, 1514 or 1518: the switch MUST be replaced. Write down the date code with the model and serial.",
      "Pull the yellow wire, remove the 1/4 in. screw, take the switch out and destroy it. Fit the new switch for that kit (HH19ZA940, HH19ZA950 or HH19ZA965 - order by the switch part number and the quantity for the kit model). Do not over-tighten - a stripped hole leaves the switch without good contact with the panel.",
      "Refit the yellow wire and the upper panel."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB15-0020"
  },
  {
    id: "carrier-dsb15-0018", brand: "Carrier", number: "DSB15-0018", docNo: "", rev: "", date: "2015-06-18", type: "Service",
    title: "24VNA9 / 189BNV variable speed AC on a non-communicating thermostat: high stage only 75% capacity - replace AOC board",
    applies: { modelRe: ["^24VNA9", "^189BNV"], serialFrom: "2414E", serialTo: "2115E" },
    appliesText: "Carrier 24VNA9 and Bryant 189BNV variable speed air conditioners, serials 2414E to 2115E, installed with a non-communicating (24 V) thermostat. Communicating Infinity / Evolution systems and heat pumps are not affected.",
    summary: "An AOC control software setting limits high stage (Y1+Y2 or Y2 only) to 75% of full cooling capacity in non-communicating mode. Low stage is fine. Can cause comfort complaints in humid areas or where the unit is not oversized.",
    steps: [
      "Power off, lock out and wait 2 minutes for the capacitors to drain. Remove the control box door - the AOC board is at the bottom of the inverter (no need to remove the inverter cover).",
      "Unplug the 7 harnesses (PL10 RVS/PEV, PL20 MOC/AOC, PL19 SPT, PL17 OST, PL16 ODT, PL15 OCT/OAT, ST1 RCY1Y2) and remove the 4 corner screws.",
      "MOVE THE MODEL PLUG PL8 from the old board to the new one.",
      "New AOC board: HK38EA032 for sizes 13 and 24B; HK38EA033 for sizes 24A, 25, 36, 37, 48, 49 and 60. Corrected V5 boards are marked with green marker or a green dot.",
      "See DSB15-0026 for the later V7 boards."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0018"
  },
  {
    id: "carrier-dsb15-0011", brand: "Carrier", number: "DSB15-0011", docNo: "", rev: "", date: "2015-06-09", type: "Service",
    title: "Multi-zone 38MGQ / 538TEQ sizes 27 and 36 shipped without gas (suction) pipe size adapters",
    applies: { modelRe: ["^38MGQD27", "^38MGQF36", "^538TEQ"] },
    appliesText: "Carrier 38MGQD27 / 38MGQF36 and Bryant 538TEQ (RDMA / RFMA) multi-zone outdoor units in the 2014-2015 serial ranges listed in the bulletin (for example 0415V10485-0415V11133, 1115V22592-1115V22900, 5214V16703-5214V16947).",
    summary: "These outdoor units left the factory without the adapters needed to reduce the gas pipe connection to match some smaller indoor units (see the Product Data for line set sizes).",
    steps: [
      "Use a field-supplied reducer and braze it in with nitrogen flowing through the pipes.",
      "The TSM can have the reducers shipped (allow about two weeks)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB15-0011"
  },
  {
    id: "carrier-dsb15-0013", brand: "Carrier", number: "DSB15-0013", docNo: "", rev: "", date: "2015-06-01", type: "Safety",
    title: "MANDATORY SAFETY REWORK condensing furnaces 1815A-1915A: limit switch date code 1511-1518 may not open - replace",
    applies: { modelRe: ["^59MN7A", "^59TN6A", "^59TP6A", "^59TP5A", "^59SP5A", "^59SC5A", "^59SC2C", "^987MA", "^926TA", "^925TA", "^915SA", "^912SC", "^PG96VAT", "^PG92SCS"], serialFrom: "1815A46638", serialTo: "1915A45581" },
    appliesText: "Carrier / Bryant / Payne condensing gas furnaces with serials 1815A46638 to 1915A45581 - the bulletin's table lists 59MN7A, 59TN6A, 59TP6A, 59TP5A, 59SP5A, 59SC5A, 59SC2C, 987MA, 926TA, 925TA, 915SA, 912SC, PG96VAT, PG92SCS sizes.",
    summary: "The main limit switch may not open before the maximum leaving air temperature is reached. With a high temperature rise or a failed blower motor, the furnace and nearby materials can overheat. Replacement is mandatory when the switch date code is in the affected range.",
    steps: [
      "Power off and lock out. Remove the burner compartment door and find the limit switch.",
      "Read the switch date code: 1511 to 1518 = replace.",
      "Remove the two red wires and the two mounting screws (long 1/4 in. nut driver). Pull the tabs off the old switch with pliers so it can't be reused. Record the date code of BOTH old and new switches - the warranty claim needs them.",
      "Fit the new limit switch assembly (switch plus gasket) of the same part number for that furnace, reconnect the two red wires, and check continuity through the limit circuit.",
      "Run the furnace and check the temperature rise is within the rating plate range."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB15-0013"
  },
  {
    id: "carrier-dsb15-0015", brand: "Carrier", number: "DSB15-0015", docNo: "", rev: "", date: "2015-06-01", type: "Safety",
    title: "MANDATORY SAFETY REWORK gas packaged units 1115C-1915C: limit switch date code 1511 may not open - replace with HH18HA211",
    applies: { modelRe: ["^48ES", "^48EZ", "^48VG", "^48VL", "^48VR", "^48VT", "^574DP", "^577CN", "^577EN", "^677CN", "^PY3G", "^PY4G"], serialFrom: "1115C03520", serialTo: "1915C07810" },
    appliesText: "Carrier / Bryant / Payne small packaged gas units with serials 1115C03520 to 1915C07810 - the bulletin's table lists 48ES, 48EZ, 48VG, 48VL, 48VR, 48VT, 574DPW, 577CNW, 577ENW, 677CNW, PY3GPA, PY4GNA sizes.",
    summary: "The main limit switch may not open before the maximum leaving air temperature. With a high temperature rise or a failed blower, the unit and nearby materials can overheat. Switches with date code 1511 must be replaced.",
    steps: [
      "Power off and lock out. Remove the 7 screws (5/16 in.) on the blower access panel.",
      "Disconnect the purple and red wires from the limit, unplug the two blower motor harnesses, remove the capacitor bracket (2 screws) and slide the blower assembly out (3 screws).",
      "Read the limit date code; 1511 = replace. Remove the 2 Phillips screws, pull the tabs off the old switch, and record the date code of both old and new switches for the claim.",
      "Fit new limit HH18HA211 (do not over-tighten), then reassemble in reverse: blower, red and purple wires clear of moving parts and sharp edges, motor harnesses, capacitor and panel."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB15-0015"
  },
  {
    id: "carrier-dsb15-0014", brand: "Carrier", number: "DSB15-0014", docNo: "", rev: "", date: "2015-06-01", type: "Safety",
    title: "MANDATORY SAFETY REWORK FB4CNF fan coils with electric heat 1215A-1915A: limit switch date code 1511-1518 - replace",
    applies: { modelRe: ["^FB4CNF"], serialFrom: "1215A69926", serialTo: "1915A71040" },
    appliesText: "Carrier / Bryant / Payne FB4CNF fan coils with factory electric heat (for example FB4CNF018L05, 024L05/L10, 030L08/L10, 036L10, 042L10, 048L10/L15), serials 1215A69926 to 1915A71040.",
    summary: "The heater limit switch may not open with low or no airflow (failed blower), so the fan coil and nearby materials can overheat. Every affected unit must be checked and switches with an affected date code replaced.",
    steps: [
      "Power off and lock out. Remove the 4 screws (5/16 in.) on the upper panel and find the limit switch(es) in the heater control compartment.",
      "Date code 1511, 1512, 1513, 1514, 1515, 1516 or 1518: replace. Any other date code: no change.",
      "Pull the yellow wire, remove the 1/4 in. screw, take the switch out and destroy it. Record old and new date codes with model and serial for the claim.",
      "Fit the new switch (HH19ZA950 or HH19ZA965 - order the part number and quantity listed for the fan coil model), do not over-tighten, refit the yellow wire and the panel."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners DSB15-0014"
  },
  {
    id: "carrier-dsb15-0009", brand: "Carrier", number: "DSB15-0009", docNo: "", rev: "", date: "2015-05-12", type: "Service",
    title: "Packaged unit heaters CPHEATER050A02 / 051A02 / 054A02 / 066A02: dual point data tag shows 3-phase data - replace tag",
    applies: { modelRe: ["^CPHEATER05[014]A02", "^CPHEATER066A02"] },
    appliesText: "Small packaged unit accessory electric heaters CPHEATER050A02, CPHEATER051A02, CPHEATER054A02 and CPHEATER066A02 (single phase). Only dual point (separate heater supply) installs are affected.",
    summary: "The dual point wiring data tag on these single-phase heaters was printed with 3-phase data, which leads to wrong wire and breaker sizing if followed. Single point installs are not affected.",
    steps: [
      "On a dual point install of one of these heaters, do not size wire or breaker from the old tag - use the single-phase data from the installation instructions.",
      "Replace the tag with the corrected one (packets went to distributor service managers). The rework is mandatory on dual point sites."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB15-0009"
  },
  {
    id: "carrier-dsb14-0015", brand: "Carrier", number: "DSB14-0015", docNo: "", rev: "", date: "2014-12-24", type: "Service",
    title: "24VNA9 / 25VNA8 / 189BNV / 288BNV 2414E-0115E: stator heat not enabled (code 79 risk) - replace AOC board HK38EA029",
    applies: { modelRe: ["^24VNA9", "^25VNA8", "^189BNV", "^288BNV"], codes: ["79"], serialFrom: "2414E", serialTo: "0115E" },
    appliesText: "Carrier 24VNA9 / 25VNA8 and Bryant 189BNV / 288BNV variable speed units, serials 2414E to 0115E. Rework was due by March 31, 2015.",
    summary: "These units left the factory with the compressor stator heat turned off. Refrigerant can collect in the compressor during the off cycle, wash out the oil and damage the bearings; code 79 (compressor / inverter fault) can appear as the bearing loses oil.",
    steps: [
      "Power off, lock out and wait 2 minutes for the capacitors to drain. The AOC board is at the bottom of the inverter.",
      "Unplug the 8 harnesses (PL10 RVS/PEV, PL20 MOC/AOC, PL5 EXV on heat pumps, PL19 SPT, PL17 OST, PL16 ODT, PL15 OCT/OAT, PL18 ABCD) and remove the 4 corner screws.",
      "MOVE THE MODEL PLUG PL8 to the new board. Fit AOC board HK38EA029 (or a later board per DSB15-0026) and reconnect all 8 harnesses.",
      "Corrected inverters have a black check mark on the inverter rail rating plate and a blue dot on the inverter box label."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0015"
  },
  {
    id: "carrier-dsb14-0013", brand: "Carrier", number: "DSB14-0013", docNo: "", rev: "", date: "2014-10-30", type: "Service",
    title: "Electronic air purifiers GAPA: corroded filter contact springs - spring kit KIT191000",
    applies: { modelRe: ["^GAPAAXCC", "^GAPABXCC", "^GAPAAXBB", "^GAPABXBB"] },
    appliesText: "Air purifiers GAPAAXCC / GAPAAXBB (1625, 2025) and GAPABXCC / GAPABXBB (1620, 2020, 2420) built before serial 0114V. Most cases are installs downstream of a humidifier.",
    summary: "The springs in the filter status circuit can corrode, mostly from the environment (humidifier upstream). The spring coating was improved.",
    steps: [
      "Corroded springs: fit kit KIT191000 (two front screen ground springs, two filter ground springs, one FEM ground spring and hardware).",
      "Bent or damaged door latch springs (often from shutting a misaligned door): kit KIT190000."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB14-0013"
  },
  {
    id: "carrier-dsb14-0012", brand: "Carrier", number: "DSB14-0012", docNo: "", rev: "", date: "2014-10-23", type: "Service",
    title: "1.5-2.5 ton AC / HP 2013-2014: high superheat, low suction, frozen coil from TXV restriction - one-time additive 040232191046",
    applies: { modelRe: ["^113AN[ACW]0(18|24|30)", "^113APA030", "^116BNA0(18|24|30)", "^123ANA0(18|24|30)", "^126BNA0(18|24|30)", "^127ANA024", "^180BNA024", "^186BNA0(18|24|30)", "^187BN[AC]024", "^213ANC0(18|24|30)", "^213CNA0(18|24|30)", "^213CPA030", "^214CNA0(18|24|30)", "^215BNA0(18|24|30)", "^223ANA0(18|24|30)", "^225BNA0(18|24|30)", "^226ANA024", "^280ANV024", "^285BNA0(18|24|30)", "^286BN[AC]024", "^289BNA024", "^BA13NA0(18|24|30)", "^BA16NA0(18|24|30)", "^BH13NA0(18|24|30)", "^BH14NA0(18|24|30)", "^24ABB3(18|24|30)", "^24ABC6(18|24|30)", "^24ACB3(18|24|30)", "^24ACB724", "^24ACC6(18|24|30)", "^24ANB124", "^24ANB6(18|24|30)", "^24ANB724", "^25HBB3(18|24|30)", "^25HBC3(18|24|30)", "^25HBC5(18|24|30)", "^25HCB3(18|24|30)", "^25HCB624", "^25HCC5(18|24|30)", "^25HCD3(18|24|30)", "^25HCD4(18|24|30)", "^25HNB5(18|24|30)", "^25HNB624", "^25HNB924", "^25HNH5(24|30)", "^25VNA024", "^C4A3(18|24|30)", "^CA13NA0(18|24|30)", "^CA16NA0(18|24|30)", "^CH13NA0(18|19|24|25|30|31)", "^CH14NA0(18|24|30)", "^PA13NA0(18|24|30)", "^PA16NA0(18|24|30)", "^PA17NA024", "^PH13NB0(18|19|24|25|30|31)", "^PH15NB0(18|24|30)", "^PH16NA024"] },
    appliesText: "1.5, 2 and 2.5 ton Carrier, Bryant and Payne split AC / heat pump outdoor units with serials from week 44 of 2013 to week 38 of 2014 (4413X - 3814X and 4413E - 3814E). Also replaces the interim DSB14-0008 for 1.5-2.5 ton furnace coils (4813X - 3814X), which said to change the TXV and filter drier only at failure.",
    summary: "A supplier changed a rust inhibitor in one outdoor unit component. The substance collects at the indoor TXV and restricts it: high superheat, low suction pressure, poor cooling or a frozen coil. It is not a TXV or coil defect.",
    steps: [
      "First rule out the usual causes: refrigerant charge, static pressure, airflow, and correct coil size / orientation / alignment.",
      "Still high superheat and low suction: inject ONE 4 oz bottle of additive 040232191046 (the only approved additive, from the distributor) with a 4 oz oil/dye injection tool.",
      "Cycle the TXV, method 1 (furnace coil or heat pump): run heat 15 min to warm the indoor coil, then cooling 15 min, and recheck superheat and suction.",
      "Method 2 (or if method 1 did not help): pull the TXV bulb, run cooling, and move the bulb between an ice water bath and a hot water bath every 30 seconds for 5 minutes. Refit the bulb in its factory spot with an OEM clamp and insulation (no tape or tie wraps), run 15 min and recheck.",
      "No improvement: replace the TXV. NEVER inject a system twice. Write down the outdoor model, serial and injection date on the ticket."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0012"
  },
  {
    id: "carrier-dsb14-0011", brand: "Carrier", number: "DSB14-0011", docNo: "", rev: "", date: "2014-09-10", type: "Service",
    title: "35 in. condensing furnaces: revised vent tables and vent rules (wind, inside corners, exposed vent length)",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^912S", "^915S", "^925S", "^925T", "^986T", "^PG92S", "^PG95S", "^PG95X"], codes: ["31"] },
    appliesText: "All 35 in. tall condensing gas furnaces from serial 2711A. The model list is not printed in this bulletin; the families shown are the 35 in. families named in DSB14-0002 / DSB14-0003.",
    summary: "The original vent tables pushed the vent system to its limits in high-pressure zones, prevailing winds over 31 MPH or cold weather, causing pressure switch trips (code 31) or vent freezing. A safety factor was added: shorter maximum equivalent vent lengths, new maximum exposed (unheated) vent length and insulation tables, and prevailing wind guidance.",
    steps: [
      "Code 31 or a frozen vent on one of these furnaces: check the install against the CURRENT Installation Instructions vent tables, not the original 2011-2013 ones.",
      "No inside-corner sidewall terminations; account for prevailing wind when locating the termination.",
      "Long exposed vent runs in unheated space need the insulation shown in the exposed vent length table."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0011"
  },
  {
    id: "carrier-dsb14-0010", brand: "Carrier", number: "DSB14-0010", docNo: "", rev: "", date: "2014-08-12", type: "Service",
    title: "Single-stage 90% furnaces: 3-hour lockout after repeated code 31 - board with date code 2414 or later clears the count",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^912S", "^915S", "^925S", "^PG92S", "^PG95S"], codes: ["31"] },
    appliesText: "All single-stage 35 in. condensing (90%) gas furnaces. Boards with enhanced code 31 software have a date code of 2414 or later right after the part number; furnaces built after week 24 of 2014 have them.",
    summary: "Older boards remember every pressure switch trip, even after normal burner runs, and lock out for 3 hours after more than three code 31 faults - a no-heat call in gusty wind or with condensate slugging. Newer software clears the count after the burner runs more than one minute.",
    steps: [
      "First fix any install problems that cause code 31 (vent, condensate drain, pitch, wind - see DSB14-0002 / DSB14-0003 / DSB14-0004). A new board will not cure a non-compliant install.",
      "Then, if code 31 lockouts continue, replace the board with one dated 2414 or later (check the date code after the part number).",
      "Boards dated 2314 or earlier are fine for other failures, but not for wind / condensate code 31 lockouts."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0010"
  },
  {
    id: "carrier-dsb14-0009", brand: "Carrier", number: "DSB14-0009", docNo: "", rev: "", date: "2014-07-24", type: "Service",
    title: "Packaged units: oil on the coil fins of a new unit is usually fin processing oil, not a leak",
    applies: { modelRe: [] },
    appliesText: "All Carrier, Bryant and Payne small packaged products (SPP), all serials. Fin oil was cut by 53% from date code 0213.",
    summary: "Units were refused at delivery for oily fins that looked like a refrigerant leak, but the charge was there and no leak was found - it was leftover fin oil from manufacturing. Some residue is normal.",
    steps: [
      "Oil on the fins of a new packaged unit: put a gauge set on it and confirm refrigerant is present before calling it a leak."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB14-0009"
  },
  {
    id: "carrier-dsb14-0007", brand: "Carrier", number: "DSB14-0007", docNo: "", rev: "", date: "2014-04-28", type: "Service",
    title: "25HNH536 / 285BNH036 heat pump with FV4CN(F,B)005 fan coil: charge to nameplate subcooling (no +3 F)",
    applies: { modelRe: ["^25HNH536", "^285BNH036"] },
    appliesText: "Carrier 25HNH536A**31 and Bryant 285BNH036****B single-speed heat pumps matched with FV4CNF005 or FV4CNB005 fan coils.",
    summary: "SMB11-0016A and the installation instructions wrongly said to add 3 F to the nameplate subcooling for this combination. It is a tested combination, so the nameplate value is correct.",
    steps: [
      "With an FV4CN(F,B)005 fan coil, charge to the nameplate subcooling - do not add the +3."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0007"
  },
  {
    id: "carrier-dsb14-0005", brand: "Carrier", number: "DSB14-0005", docNo: "", rev: "", date: "2014-04-28", type: "Service",
    title: "Small rooftops 208/230 V 5113P-1514P: outdoor fan motor HD52AK002 jumper plug set to 460 V - slow fan, high head",
    applies: { modelRe: ["^580J", "^581J", "^48TC", "^48HC", "^50HC", "^50TC", "^50HT"], serialFrom: "5113P", serialTo: "1514P" },
    appliesText: "208/230 V small rooftops with dual-voltage outdoor fan motor HD52AK002, serials 5113P through 1514P (the bulletin lists sizes such as 580J 14, 581J 12, 48/50HC 12, 48/50TC 14, 50HCQ 09, 50TCQ 12, 50HTQ 12).",
    summary: "The motor's voltage jumper plug may be in the 460 V position on a 208/230 V unit. The fan then runs slow: low airflow over the condenser, reduced capacity, high head pressure and an overheating compressor.",
    steps: [
      "Power off and lock out. Remove the fan grille and the motor wiring cover.",
      "Check the voltage connector; move it to the 208/230 V position if needed (instructions are also on the motor).",
      "Refit the cover and grille. Factory-reworked units carry an identification mark."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0005"
  },
  {
    id: "carrier-dsb14-0004", brand: "Carrier", number: "DSB14-0004", docNo: "", rev: "", date: "2014-04-22", type: "Service",
    title: "35 in. condensing furnaces from 1514A: inducer housing pressure port enlarged to 3/16 in. (X mark, green gaskets)",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^912S", "^915S", "^925S", "^925T", "^986T", "^PG92S", "^PG95S", "^PG95X"], codes: ["31"] },
    appliesText: "Non-modulating 35 in. condensing furnaces from serial 1514A (modulating models have no inducer housing pressure tap and are not affected).",
    summary: "Condensed flue gas droplets can wick into the inducer housing pressure port and briefly block the signal, opening the housing pressure switch. Production inducers now have a 3/16 in. port - the same size as the field drill-out in DSB14-0002.",
    steps: [
      "New inducers are marked with a recessed 'X' on the triangular flange under the exhaust outlet and have green drain gaskets into the collector box.",
      "No need to replace an inducer in the field: nuisance trips are fixed per DSB14-0002 and TIC2013-0007 (install checks first, then the port drill-out)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB14-0004"
  },
  {
    id: "carrier-dsb14-0003", brand: "Carrier", number: "DSB14-0003", docNo: "", rev: "", date: "2014-03-21", type: "Service",
    title: "35 in. single-stage condensing furnaces: code 31 root causes and stricter vent rules (25% shorter, 1/4 in. per ft slope)",
    applies: { modelRe: ["^59SC2A", "^59SC2B", "^59SC5A", "^59SP5A", "^912SA", "^912SB", "^915SA", "^925SA", "^PG92SAS", "^PG92SBS", "^PG95SAS"], codes: ["31"] },
    appliesText: "Carrier 59SC2A, 59SC2B, 59SC5A, 59SP5A; Bryant 912SA, 912SB, 915SA, 925SA; Payne PG92SAS, PG92SBS, PG95SAS, from serial 2711A.",
    summary: "Code 31 (pressure switch open) sites had sagging vent pipe with less than 1/4 in. per foot slope, terminations in high-pressure zones (inside corners), terminations into strong prevailing wind (over 31 MPH), or the 40k inducer outlet choke used with more than 10 ft of vent.",
    steps: [
      "Check vent slope: at least 1/4 in. per foot (1 in. per 4 ft), no sags. Thin wall, double wall corrugated and foam / cellular core PVC need supports every 3 ft; Schedule 40 every 5 ft.",
      "Terminate through the roof where possible. No sidewall terminations in an inside corner.",
      "Maximum vent lengths are cut by 25%: if the equivalent length is over 75% of the old table maximum, go up one 1/2 in. pipe size (never more than 1 in. larger). Example: 80k, 62 ft of 2 in. vs 70 ft max -> new max 52 ft -> use 2 1/2 or 3 in.",
      "40k input: the inducer outlet choke is used ONLY when the total vent length is 10 ft or less.",
      "Use 45 degree elbows where possible to help drainage. Existing installs without code 31 trouble do not need changing; inside-corner or high-wind code 31 sites - call the distributor service manager."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0003"
  },
  {
    id: "carrier-dsb14-0002", brand: "Carrier", number: "DSB14-0002", docNo: "", rev: "", date: "2014-01-20", type: "Service",
    title: "35 in. condensing furnaces 2711A-5313: nuisance code 31 in the first minutes of heat - drill the inducer pressure port to 3/16 in.",
    applies: { modelRe: ["^59SC2A", "^59SC2B", "^59SC5A", "^59SP5A", "^59TP5A", "^59TN6A", "^912SA", "^912SB", "^915SA", "^925SA", "^925TA", "^986TA", "^PG92SAS", "^PG92SBS", "^PG95SAS", "^PG95XAT"], codes: ["31"] },
    appliesText: "All sizes EXCEPT 140k input of Carrier 59SC2A, 59SC2B, 59SC5A, 59SP5A, 59TP5A, 59TN6A; Bryant 912SA, 912SB, 915SA, 925SA, 925TA, 986TA; Payne PG92SAS, PG92SBS, PG95SAS, PG95XAT; serials 2711A to 5313. Modulating furnaces are not affected.",
    summary: "Cold combustion air chills the inducer housing during pre-purge; condensate droplets form and wick into the housing pressure tap, briefly opening the housing pressure switch in the first few minutes of a heat call. Single-stage models (and two-stage models that start on high) are affected.",
    steps: [
      "First make the install right per the Installation Instructions and TIC2013-0007: vent and combustion air piping, condensate drain, furnace pitch and cabinet seals, home ventilation. The drill-out will not fix those.",
      "Still tripping: remove the pressure switch assembly (label the two tubes) and the inducer assembly (vent, motor harness, 5 screws).",
      "Mark a 5/32 in. and a 3/16 in. drill bit with tape at 1 1/2 in. depth. Drill the port with the 5/32 in. bit FIRST, then the 3/16 in. bit - drill straight, lowest speed, following the existing hole, never deeper than 1 1/2 in. Starting with 3/16 in. can ruin the housing.",
      "Reassemble, prime the condensate trap and check operation. To read the switch with the door on, run the tube through a 7/8 in. knockout and plug the knockout afterwards."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB14-0002"
  },
  {
    id: "carrier-dsb13-0019", brand: "Carrier", number: "DSB13-0019", docNo: "", rev: "", date: "2013-10-18", type: "Service",
    title: "Light commercial rooftops and splits: liquid line filter drier plugging after start-up - use the new factory driers",
    applies: { modelRe: ["^580J", "^558J", "^569J", "^575J", "^48HC", "^50HC", "^48TC", "^50TC", "^48LC", "^50LC", "^38AUD", "^38AUQ", "^38AUZ"] },
    appliesText: "Bryant 580J, 558J, 569J, 575J; Carrier 48/50HC, HCQ, TC, TCQ, LC and 38AUD / AUQ / AUZ.",
    summary: "Liquid line filter driers were found restricted with debris soon after start-up, tripping the compressor on the pressure switch. Improved driers are now used in production.",
    steps: [
      "If the drier is restricted, or whenever the system is opened, replace it with the new factory-authorized drier. The bulletin's table names KH43LE102, KH43LE118, KH43LG093 and KH43LG085 - confirm the current-to-new match for the unit with the distributor."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0019"
  },
  {
    id: "carrier-dsb13-0029", brand: "Carrier", number: "DSB13-0029", docNo: "", rev: "", date: "2013-10-14", type: "Service",
    title: "1.5 ton heat pump CH13NA018 / 25HCD318 / PH13NB018 with CNPH*2417 coil: change heating piston from #42 to #38",
    applies: { modelRe: ["^CH13NA018", "^25HCD318", "^PH13NB018"] },
    appliesText: "Bryant CH13NA018****A, Carrier 25HCD318(A,W)**30, Payne PH13NB018****A matched with a CNPH*2417* furnace coil.",
    summary: "For best performance across more field conditions, this combination should use a #38 heating piston instead of the factory-suggested #42.",
    steps: [
      "New installs of this combination: fit heating piston #38 (EA52PH038). Existing installs need no change."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0029"
  },
  {
    id: "carrier-dsb13-0030", brand: "Carrier", number: "DSB13-0030", docNo: "", rev: "", date: "2013-10-14", type: "Service",
    title: "CNPV furnace coils: use the preferred transition from furnace to coil (adapter kits KGADA)",
    applies: { modelRe: ["^CNPV"] },
    appliesText: "All brands' CNPV* cased furnace coils, all serials.",
    summary: "Airflow, capacity and efficiency depend on how the furnace outlet transitions into the coil cabinet; the bulletin shows 'preferred' installations.",
    steps: [
      "On new installs, match the furnace outlet to the coil cabinet the preferred way; use furnace coil adapter kit KGADA0101ALL, KGADA0201ALL or KGADA0301ALL where the sizes differ. Existing installs need no action."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0030"
  },
  // --- HVACpartners hourly catch-up 2026-11-03 8 PM: dashboard 101-26-20 / 101-26-05, TICs 2013-2019, DSB13-0028 / 0024 ---
  {
    id: "carrier-101-26-20", brand: "Carrier", number: "101-26-20", docNo: "", rev: "v2", date: "2026-10-30", type: "Product",
    title: "Ductless multi-zone with 1-way cassettes: new max cassette counts, leave one port open (replaces the count-as-18K rule)",
    applies: { modelRe: ["^37MG[RH]AQ", "^45MCCAQ"] },
    appliesText: "Carrier 37MGRAQ / 37MGHAQ multi-zone outdoor units with 45MCCAQ 1-way cassette indoor units, in systems without an air handler (AHU). With an AHU in the system the limits may differ - see the current Quick Reference Guide.",
    summary: "Testing found incomplete outdoor defrost (and weaker oil return and pressure control) when a multi-zone ran many 1-way cassettes. Version 1 (June 1, 2026) said to count every 1-way cassette (6K, 9K, 12K, 18K) as 18K. Version 2 drops that: 6K, 9K and 12K cassettes count at their own size, but the number of cassettes is capped and one port should stay unused.",
    steps: [
      "Max 1-way cassettes (total ports): 37MG(R/H)AQ18CA3 (3 ports) - 2; 24DA3 (4) - 3; 30EA3 (5) - 4; 36EA3 (5) - 4; 48FA3 (6) - 5; 55FA3 (6) - 5.",
      "When any 1-way cassette is on the system, leave one connection port unused.",
      "Systems already installed under the old rule need no field action.",
      "Installed system with defrost, oil return or pressure problems: collect operating data and contact your Technical Service Manager (TSM) for an application review.",
      "Carrier said the combination charts, QRG and manuals would be updated by Nov 6, 2026."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners 101-26-20"
  },
  {
    id: "carrier-101-26-05", brand: "Carrier", number: "101-26-05", docNo: "", rev: "v3 2026-08-07", date: "2026-03-24", type: "Product",
    title: "GH5SAN5 heat pumps and GA5SAN5 / GA4SAN5 ACs: new models with factory high and low pressure switches (1 in the 10th digit)",
    applies: { modelRe: ["^GH5SAN5", "^GA[45]SAN5"] },
    appliesText: "Carrier G-series single-stage GH5SAN5 heat pumps (national) and GA5SAN5 (South) / GA4SAN5 (North) air conditioners. The new models have a 1 in the 10th digit, for example GH5SAN53610A, GA5SAN53610W, GA4SAN53610N. First shipments January 2027.",
    summary: "Current G-series units ship with only a low pressure switch (LPS) on the heat pumps and no pressure switches on the ACs. The new models with a 1 in the 10th digit leave the factory with both a high (HPS) and a low pressure switch. Electrical data, dimensions and AHRI ratings are the same, and the older models are not phased out.",
    steps: [
      "Read the 10th digit of the model: 0 = current build (heat pump: LPS only; AC: no pressure switches); 1 = factory LPS and HPS.",
      "On a 10th-digit-1 unit, expect both pressure switches in the control circuit when troubleshooting."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners 101-26-05"
  },
  {
    id: "carrier-tic2015-0019", brand: "Carrier", number: "TIC2015-0019", docNo: "", rev: "", date: "2015-10-23", type: "Technical",
    title: "FPMAN pancake ceiling fan coils (AC): piston not seating from debris - clean it and add neoprene O-ring C70104",
    applies: { modelRe: ["^FPMA"] },
    appliesText: "Multi-family horizontal (pancake) ceiling hung fan coils FPMAN(U,C), air conditioner systems only.",
    summary: "Debris in the piston body keeps the piston from seating. Signs: low head pressure, high suction pressure, little or no superheat, often heavy sweat off the compressor and water running out under the condenser pad. Carrier qualified a neoprene O-ring that holds the piston fully seated.",
    steps: [
      "O-ring: neoprene part C70104 (The O-ring Store, 208-413-6377). Do NOT substitute any other material.",
      "Gauges on the liquid and suction valves. Close the liquid valve and pump down, ready to close the suction valve fast. The scroll gets noisy as pressures equalize (suction about 20 PSIG) - that is normal. Never run the scroll into a vacuum.",
      "When it rattles, cut power and quickly close the suction valve. Recover what is left in the line set down to 5 PSIG.",
      "Open the piston body nut with two 8 in. adjustable wrenches (use the backup wrench). Clean the body with a Q-tip and the piston with a rag. Injecting Zerol Ice did not clean these pistons - clean them by hand.",
      "Put the piston back, place the O-ring behind it, nut finger tight then 1/4 turn with the backup wrench. Do not over-tighten.",
      "Nitrogen leak check, evacuate the line set, open both valves, check the charge by the superheat method in the outdoor unit instructions.",
      "Pistons: size 018 #50 (201600800978), 024 #56 (201600800873), 030 #67 (201600800874), 036 #70 (201600801081)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2015-0019"
  },
  {
    id: "carrier-tic2015-0014", brand: "Carrier", number: "TIC2015-0014", docNo: "", rev: "", date: "2015-08-04", type: "Technical",
    title: "Uncased pancake fan coils on a fiberboard plenum: supply air blows water out of the drain pan - add a sheet metal angle",
    applies: { modelRe: ["^FPMA"] },
    appliesText: "Uncased horizontal (pancake) ceiling fan coil units.",
    summary: "If the field-built fiberboard plenum is not sealed to the supply duct flange (opening cut crooked or misaligned), supply air blows back into the condensate drain pan and pushes water out.",
    steps: [
      "Parts: locally bought 1 1/2 x 1 1/2 in. sheet metal angle and self-tapping screws.",
      "Lay the fan coil ceiling-mount side down, drain pan on top. Cut one side of the angle at 6 3/8 in. (the supply flange can be used as a template).",
      "Bend the angle around the corner and screw it to the supply air flange; repeat on the other side. The angle must sit in front of the drain pan.",
      "Turn the unit back over and install the fiberboard plenum the normal way.",
      "Before bolting it to the ceiling, check the ceiling slope and shim so the pan drains toward the main drain line."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2015-0014"
  },
  {
    id: "carrier-tic2015-0018", brand: "Carrier", number: "TIC2015-0018", docNo: "", rev: "", date: "2015-11-05", type: "Technical",
    title: "Infinity Touch / Evolution Connex software Version 13: communicating geothermal, Bryant energy tracking, fixes",
    applies: { modelRe: ["^SYSTXCCIT[WCN]01", "^SYSTXBBEC[WCN]01"] },
    appliesText: "Carrier SYSTXCCITW01-A, SYSTXCCITC01-A, SYSTXCCITN01-A and Bryant SYSTXBBECW01-A, SYSTXBBECC01-A, SYSTXBBECN01-A.",
    summary: "V13 added Infinity geothermal split heat pumps (communicating) and energy tracking for Bryant, plus fixes: fewer faults during software updates, utility curtailment on 19VS AC systems, window protect, Super A coils in the coil list, humidity / fresh air menus greyed out when that equipment is not installed, and the status screen wrongly showing heat in Fan-Only or Off.",
    steps: [
      "Wi-Fi controls on V10 or later download updates themselves.",
      "Non-Wi-Fi controls or software older than V10: download from the Infinity / Evolution consumer download site (EULA link), or HVACpartners > Products > Thermostats and Controls > the control > Documents and Downloads > Firmware Installer.",
      "Details: marketing bulletins 101-15-72 (Carrier) and BY-103-15-62 (Bryant)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2015-0018"
  },
  {
    id: "carrier-tic2015-0004", brand: "Carrier", number: "TIC2015-0004", docNo: "", rev: "", date: "2015-02-27", type: "Technical",
    title: "Infinity Touch / Evolution Connex software Version 12: expanded CFM / static control, airflow verification, more dealer portal data",
    applies: { modelRe: ["^SYSTXCCIT[WCN]01", "^SYSTXBBEC[WCN]01"] },
    appliesText: "Carrier SYSTXCCITW01-A, SYSTXCCITC01-A, SYSTXCCITN01-A and Bryant SYSTXBBECW01-A, SYSTXBBECC01-A, SYSTXBBECN01-A.",
    summary: "V12 expanded CFM and static pressure control for the new indoor blowers, added Airflow Verification screens, Greenspeed / Evolution Extreme heat pump charging, more indoor coils, the 13k size for Infinity 18VS / Evolution V, and updated service and install screens. With V11 or later the HVACpartners dealer portal shows much more: indoor and outdoor status and faults, the last 10 system events, root cause and history data, and indoor / outdoor setup.",
    steps: [
      "Update the control to V12 or later to get the expanded remote dealer portal data.",
      "Details: marketing bulletins 101-15-13 (Carrier) and BY-103-15-11 (Bryant)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2015-0004"
  },
  {
    id: "carrier-tic2014-0003", brand: "Carrier", number: "TIC2014-0003", docNo: "", rev: "", date: "2014-04-25", type: "Technical",
    title: "Infinity / Evolution touch controls before V11: blower cutback (code 161) keeps the system at low capacity",
    applies: { modelRe: ["^SYSTXCCIT[WCN]01", "^SYSTXBBEC[WCN]01"], codes: ["161"] },
    appliesText: "Bryant SYSTXBBECN01, SYSTXBBECW01, SYSTXBBECC01 and Carrier SYSTXCCITN01, SYSTXCCITW01, SYSTXCCITC01 on software Version 10 or earlier.",
    summary: "Restrictive ductwork, or zone airflow limits set higher than the ducts can deliver, force a blower cutback (code 161). On V10 or earlier the cutback stays set until the call is satisfied or ended, so the system keeps running at reduced capacity and will not stage up.",
    steps: [
      "Find and fix the high static cause (ducts, filter, zone airflow limit settings).",
      "Update to Version 11 or later: it resets the cutback after 30 minutes so the system can deliver higher airflow / stages again.",
      "Update all Wi-Fi capable controls to V11 so later releases download automatically."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2014-0003"
  },
  {
    id: "carrier-tic2015-0016", brand: "Carrier", number: "TIC2015-0016", docNo: "", rev: "", date: "2015-09-10", type: "Technical",
    title: "48 / 50 series small and medium rooftops: tighten the red bottom drain plug before setting the unit",
    applies: { modelRe: ["^48TC", "^50TC", "^48HC", "^50HC", "^48FC", "^50FC", "^48GC", "^50GC"] },
    appliesText: "All Carrier 48 and 50 series small and medium rooftop units that use the standard side drain connection.",
    summary: "Field reports found the center drain plug loose, missing or installed wrong. The install instructions say: when using the side drain, make sure the red plug in the alternate bottom drain connection is tight before setting the unit on the curb.",
    steps: [
      "Water leaking into the curb or building on a rooftop that drains out the side: check the red bottom drain plug.",
      "Tighten it with a 1/2 in. square socket drive extension (easiest before the unit is set)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2015-0016"
  },
  {
    id: "carrier-tic2015-0010b", brand: "Carrier", number: "TIC2015-0010B", docNo: "", rev: "B 2015-08-17", date: "2015-08-17", type: "Technical",
    title: "Supplement to DSB14-0012 (1.5-2.5 ton TXV restriction, high superheat): Zerol Ice best practice and liquid line injection",
    applies: { modelRe: ["^113AN[ACW]0(18|24|30)", "^113APA030", "^116BNA0(18|24|30)", "^123ANA0(18|24|30)", "^126BNA0(18|24|30)", "^127ANA024", "^180BNA024", "^186BNA0(18|24|30)", "^187BN[AC]024", "^213ANC0(18|24|30)", "^213CNA0(18|24|30)", "^213CPA030", "^214CNA0(18|24|30)", "^215BNA0(18|24|30)", "^223ANA0(18|24|30)", "^225BNA0(18|24|30)", "^226ANA024", "^280ANV024", "^285BNA0(18|24|30)", "^286BN[AC]024", "^289BNA024", "^BA13NA0(18|24|30)", "^BA16NA0(18|24|30)", "^BH13NA0(18|24|30)", "^BH14NA0(18|24|30)", "^24ABB3(18|24|30)", "^24ABC6(18|24|30)", "^24ACB3(18|24|30)", "^24ACB724", "^24ACC6(18|24|30)", "^24ANB124", "^24ANB6(18|24|30)", "^24ANB724", "^25HBB3(18|24|30)", "^25HBC3(18|24|30)", "^25HBC5(18|24|30)", "^25HCB3(18|24|30)", "^25HCB624", "^25HCC5(18|24|30)", "^25HCD3(18|24|30)", "^25HCD4(18|24|30)", "^25HNB5(18|24|30)", "^25HNB624", "^25HNB924", "^25HNH5(24|30)", "^25VNA024", "^C4A3(18|24|30)", "^CA13NA0(18|24|30)", "^CA16NA0(18|24|30)", "^CH13NA0(18|19|24|25|30|31)", "^CH14NA0(18|24|30)", "^PA13NA0(18|24|30)", "^PA16NA0(18|24|30)", "^PA17NA024", "^PH13NB0(18|19|24|25|30|31)", "^PH15NB0(18|24|30)", "^PH16NA024"] },
    appliesText: "The 1.5, 2 and 2.5 ton Carrier / Bryant / Payne split ACs and heat pumps listed in DSB14-0012. DSB14-0012 was extended through 12/31/2015.",
    summary: "Suction pressure and superheat should improve soon after the additive goes in and the TXV is exercised, but full capacity can take up to 24 hours of run time - the tech does not need to stay. The additive travels with the oil, not the refrigerant, so recovering and recharging does not help, and longer line sets do not need more additive.",
    steps: [
      "Fastest way to exercise the TXV: DSB14-0012 method #2, ice water and hot tap water baths with the bulb removed from the coil. Do not warm the bulb on the coil with a MAP torch or heat gun - it is less effective and can damage the TXV.",
      "Do not adjust the charge for 24 hours after adding the additive (only exception: weighing the charge out and weighing the correct charge back in).",
      "Alternative for split systems, liquid line injection: gauges on the liquid and vapor valves, close the liquid valve and pump down. Never run the scroll into a vacuum.",
      "At about 50 psi on both sides, close the vapor valve and cut outdoor power. Put the injection tool between the liquid valve and the manifold, fill it with 4 oz of Zerol Ice and turn it so the additive gravity-feeds into the liquid line.",
      "Purge the hoses and tool from a virgin refrigerant cylinder, then push the additive in with refrigerant GAS (not liquid) until the tool feels empty (about a 10 psi rise).",
      "Remove the tool, reconnect the high side hose, open the tool to confirm all 4 oz went in. Open the vapor valve slowly, then the liquid valve. Restart and confirm pressures improved; you may still need to exercise the TXV per DSB14-0012.",
      "Make sure your injection tool is suitable for this method (ask its maker if unsure)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2015-0010B"
  },
  {
    id: "carrier-tic2015-0002", brand: "Carrier", number: "TIC2015-0002", docNo: "", rev: "", date: "2015-01-29", type: "Technical",
    title: "Dry R-22 Payne PA13 / PH13 (and export 38CKC / 38CKD): R-407C allowed only in units with a POE oil compressor",
    applies: { modelRe: ["^PA13[NP]R", "^PH13[NP]R", "^38CK[CD]"] },
    appliesText: "Payne PA13(N,P)R and PH13(N,P)R and Carrier 38CKC / 38CKD (export) dry R-22 units. POE units: serial digit 5 = E with date 4014 or 5114 (CVL built), or digit 5 = X from 0115 on (CMXA built).",
    summary: "R-22 is still the recommended refrigerant. If R-22 is not available, R-407C may be used for service only in a dry R-22 unit with a POE oil compressor. Expect a typical 3-8% loss of capacity and performance - tell the customer first.",
    steps: [
      "Confirm POE from the serial (digit 5 = E and 4014 / 5114, or digit 5 = X and 0115 or later). Not a POE unit = no R-407C.",
      "Never mix refrigerants.",
      "Install a 100% molecular sieve filter drier with XH-11 desiccant (the same drier as R-410A units). XH-6 (R-22 driers) absorbs the R-32 in R-407C.",
      "Charge with liquid only, using the R-407C charging charts (piston: superheat method; cooling TXV: subcooling method) from the TIC or installation instructions."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2015-0002"
  },
  {
    id: "carrier-tic2014-0010", brand: "Carrier", number: "TIC2014-0010", docNo: "", rev: "", date: "2014-09-02", type: "Technical",
    title: "Residential gas furnaces: size to the load (Manual J) - no gas furnace under a 20,000 BTU load; excessive oversizing voids the warranty",
    applies: { modelRe: ["^58[A-Z]{2}", "^59[A-Z]{2}", "^(310|312|313|315|800|801|811|812|813|820|830|880|886|887)[A-Z]{2}", "^9(15|25|26|45|50|55|70|73|82|86|87)[A-Z]{2}", "^PG[89]"] },
    appliesText: "All Carrier / Bryant / Payne residential gas furnaces.",
    summary: "Furnaces with twice the home's heat load short-cycle: temperature swings, frozen vent terminations and shorter life. The installation instructions now say the furnace should cover 100% of the design heating load plus only the margin from size steps, gas furnaces are not to be used if the heating load is below 20,000 BTU, and failing these guidelines voids the warranty.",
    steps: [
      "Do a load calculation (ACCA Manual J / S or another approved method) before choosing the furnace size.",
      "Short cycling, a frozen vent terminal or comfort complaints on a newer install: compare the furnace output with the load (see also TIC2014-0002)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2014-0010"
  },
  {
    id: "carrier-tic2014-0009", brand: "Carrier", number: "TIC2014-0009", docNo: "", rev: "", date: "2014-07-11", type: "Technical",
    title: "Condensing furnace run on propane while set up for natural gas: heavy soot, CO, cracked primary heat exchanger",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "Carrier / Bryant / Payne 35 in. condensing gas furnaces. Every furnace, condensing or not, must be converted before running on propane.",
    summary: "Furnaces ship set for natural gas. Running one on propane without the conversion can build heavy soot within 2 days (16 hours) of running - in the primary and secondary heat exchangers, collector box, inducer, trap and vent - with CO and aldehydes. The first pass of the primary heat exchanger overheats and can crack. Switching it to natural gas afterward does not fix it: the soot keeps choking the combustion air. Not covered by warranty.",
    steps: [
      "New install on propane: convert with the kit listed on the rating plate only - change the orifices, add spoiler screws to the burners and set line and manifold pressure per the kit.",
      "Found running on propane unconverted: clean the primary and secondary heat exchangers, collector box, inducer housing, condensate trap and vent pipe.",
      "Inspect the first pass of the primary heat exchanger; an open stress crack = replace the primary heat exchanger.",
      "Then convert with the rating plate kit. A furnace converted to propane and then put back on natural gas must be converted back with the listed propane-to-natural-gas kit."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2014-0009"
  },
  {
    id: "carrier-tic2014-0004", brand: "Carrier", number: "TIC2014-0004", docNo: "", rev: "", date: "2014-05-22", type: "Technical",
    title: "35 in. condensing furnaces: no holes in the blower shelf, no trap / drain on the vent pipe, only the model's own inducer",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "Carrier / Bryant / Payne 35 in. residential condensing gas furnaces.",
    summary: "Three practices are not approved and can create a hazard if the flue passage blocks: holes in the blower shelf (the blower pulls combustion air away from the burners and CO rises), a field vent drain or trap on the vent pipe, and an inducer assembly meant for another model (a stronger inducer). The pressure switches are meant to shut the furnace down before it reaches 400 ppm CO (air free) in the vent.",
    steps: [
      "Blower shelf holes are only allowed for the vent / combustion air pipes with Internal Vent Kit KGADC0101BVC. Seal any other hole with a sheet metal patch and RTV.",
      "Remove any unauthorized trap or drain from the vent pipe and seal the pipe. For a vent trap use External Vent Trap Kit KGAET0201ETK per its instructions.",
      "Wrong (stronger) inducer: replace it with the assembly listed for that furnace model. The single-stage replacement inducer uses a 2-stage motor; its high stage equals the single-stage motor.",
      "These must be corrected immediately."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2014-0004"
  },
  {
    id: "carrier-tic2014-0002", brand: "Carrier", number: "TIC2014-0002", docNo: "", rev: "", date: "2014-05-22", type: "Technical",
    title: "Condensing furnace oversized for the house: concentric vent freezing - heat tape, insulation, 5 minute minimum run",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "Carrier / Bryant / Payne 35 in. residential condensing gas furnaces.",
    summary: "Best operation is long, steady run times: output no more than 40% above the Manual J heat load. Vents froze where output was 2x the load (sometimes less, depending on outdoor temp and vent location). At -10 F a furnace at 2x the load needs at least an 8 minute run to keep a concentric vent from freezing.",
    steps: [
      "Existing install with outdoor temps of -10 F and above - all four of these are needed:",
      "1) 12 ft of self-regulating, roof-rated heat tape coiled on the vent pipe from the base of the concentric termination back toward the furnace (or starting 1 ft inside the roof / wall penetration). Max 130 F and it must allow insulation over it.",
      "2) R7 or better insulation on the vent pipe from the furnace to the base of the termination (not outside the structure).",
      "3) Combustion air from a properly ventilated space, or change to an indirect vent setup (make sure the space has enough air for combustion).",
      "4) Minimum 5 minute run time and no night setback (setback is OK when outdoor temps are 32 F or above). A timing relay can hold the minimum run; with setback a longer run is needed.",
      "Colder than -10 F may need more heat tape, insulation and run time."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2014-0002"
  },
  {
    id: "carrier-tic2014-0001", brand: "Carrier", number: "TIC2014-0001", docNo: "", rev: "", date: "2014-01-14", type: "Technical",
    title: "Condensate trap heater kit KGAHT0201CFP for 35 in. condensing furnaces in spaces that drop below freezing",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "Carrier / Bryant / Payne 35 in. condensing gas furnaces installed where it can get below 32 F (0 C).",
    summary: "The kit is a new condensate trap with a heat pad attached, a step-down transformer for the 24 V pad, and an in-line thermostat that turns the pad on at 35 F. Available from Jan 1, 2014.",
    steps: [
      "Furnace in an attic, garage or crawl space that can freeze: install KGAHT0201CFP so the trap does not freeze.",
      "Details: bulletins 101-14-01, BY-103-14-01, PY-103-14-01."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2014-0001"
  },
  {
    id: "carrier-tic2014-0007", brand: "Carrier", number: "TIC2014-0007", docNo: "", rev: "", date: "2014-04-07", type: "Technical",
    title: "Safety alert: never use R-22a or any propane / hydrocarbon refrigerant in an R-22 unit",
    applies: { modelRe: [] },
    appliesText: "All residential and commercial split and packaged air conditioners and heat pumps designed for R-22.",
    summary: "R-22a is a highly flammable hydrocarbon refrigerant - it is NOT R-22. Carrier had reports of property damage and personal injury from dry R-22 outdoor units charged with R-22a at installation. The EPA says using R-22a in R-22 systems is illegal and warns against any propane or hydrocarbon refrigerant in them.",
    steps: [
      "Use only R-22 in R-22 equipment; R-22a is not a substitute (see SMB 11-0005).",
      "Make sure every installer and tech knows only approved refrigerants go in these units."
    ],
    priority: "high", confidential: true,
    source: "HVACpartners TIC2014-0007"
  },
  {
    id: "carrier-tic2014-0006", brand: "Carrier", number: "TIC2014-0006", docNo: "", rev: "", date: "2014-03-24", type: "Technical",
    title: "R-22 replacement compressors and dry R-22 units with POE oil (E in the 7th position of the compressor model)",
    applies: { modelRe: [] },
    appliesText: "All service R-22 replacement compressors (RC from February 2014) and dry R-22 condensing units built from June 2014.",
    summary: "Copeland R-22 compressors now come with POE oil instead of mineral oil (MO). Identify them by an E in the 7th position of the compressor model (ZR34K5-PFV = MO, ZR34K5E-PFV = POE) and the oil type on the compressor plate. POE mixes with R-22 and works with leftover mineral oil at any percentage.",
    steps: [
      "No extra system cleaning is needed unless the system is dirty (for example after a burn-out).",
      "A liquid line filter drier is REQUIRED with POE oil (it soaks up moisture) - use the drier RC lists for the job.",
      "Only the nameplate refrigerants (R-22 or R-410A) were approved for residential AC / heat pumps (Copeland SB2013CC-1 R1)."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2014-0006"
  },
  {
    id: "carrier-tic2014-0005", brand: "Carrier", number: "TIC2014-0005", docNo: "", rev: "", date: "2014-03-14", type: "Technical",
    title: "Comfort Alert (CADM) flash code 3 on 38AU / 569J / 575J: usually not the module - check cycle times and wiring",
    applies: { modelRe: ["^38AU", "^569J", "^575J"] },
    appliesText: "Carrier 38AU and Bryant 569J / 575J split condensing units with the Comfort Alert Diagnostic Module.",
    summary: "Returned CADMs tested good. Flash code 3 (compressor short cycling) sets after four straight cycles under 3 minutes each on the Y terminal. Real causes: low or high pressure trips, oversized equipment, thermostat cycling, voltage drop from undersized wire, loose connections, or a miswired CADM / liquid line solenoid.",
    steps: [
      "Before replacing the CADM, time the compressor cycles when code 3 shows.",
      "Check the transformer voltage tap on 208/230 V systems and every low voltage connection.",
      "Thermostat wire: up to 50 ft use #18 AWG; 50-75 ft #16; over 75 ft #14 (35 C minimum insulation).",
      "Check the CADM and liquid line solenoid wiring against the unit wiring diagram."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2014-0005"
  },
  {
    id: "carrier-tic2013-0014", brand: "Carrier", number: "TIC2013-0014", docNo: "", rev: "2019-05-29", date: "2013-10-30", type: "Technical",
    title: "35 in. condensing furnaces: condensation dripping onto the gas valve / inducer (no heat) - add a drain or trap on the combustion air pipe",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "New 35 in. condensing gas furnaces. Also covers TIC2013-0010 (same subject, shorter).",
    summary: "Water getting into the cabinet drips on the gas valve or inducer (no heat), soaks the insulation and rusts parts. Two sources: the combustion air pipe and the evaporator coil / suction line. In cooling season a tight, depressurized house pulls hot humid outdoor air in through the combustion air pipe, and the pipe sweats inside.",
    steps: [
      "Carrier recommends a drain or External Trap Kit on the combustion air pipe, especially on upflow installs with the air pipe on the top plate.",
      "Check and correct: house depressurization / poor ventilation with an unsealed cabinet; vent and combustion air design or termination location; unapproved holes in the blower shelf or cabinet; unbalanced ducts.",
      "No holes in the blower shelf except with the Internal Vent Kit (KGAD0101BVC). Seal all cabinet openings on a direct vent install and use the combustion air pipe adapter with its gasket.",
      "Do not put a field-made shield between the combustion air opening and the burners - it upsets combustion and causes early part failures.",
      "Water dripping off the suction line: seal the suction line to the coil cabinet and insulate it."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2013-0014"
  },
  {
    id: "carrier-tic2013-0013", brand: "Carrier", number: "TIC2013-0013", docNo: "", rev: "", date: "2013-11-08", type: "Technical",
    title: "Residential split AC / heat pump run capacitors changed from 370 V to 440 V - retrofit notes",
    applies: { modelRe: [] },
    appliesText: "Carrier / Bryant / Payne residential split air conditioners and heat pumps: X-serial (CMX) units from Q4 2013, E-serial (CVL) units from Q1 2014.",
    summary: "440 V run capacitors are a reliability upgrade for areas with poor power and high outdoor temperatures. Existing working units need no rework.",
    steps: [
      "A failed 370 V capacitor can be replaced with a 440 V one - you can go up from 370 to 440 V, never down.",
      "The larger 440 V can may need a bigger capacitor strap.",
      "If the contactor's 24 V terminals sit close to the capacitor (angled terminals), change the 24 V leads on that side to insulated terminals."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2013-0013"
  },
  {
    id: "carrier-tic2013-0008", brand: "Carrier", number: "TIC2013-0008", docNo: "", rev: "", date: "2013-08-20", type: "Technical",
    title: "Fan coil cabinet sweating outside conditioned space: keep 300 CFM/ton, plus duct, gasket and insulation fixes",
    applies: { modelRe: ["^F[BEVXY]4[A-Z]", "^PF[0-9]"] },
    appliesText: "All Carrier / Bryant / Payne fan coils installed in a humid, unconditioned space.",
    summary: "Fan coils belong in conditioned space. Installed in a humid unconditioned space, the cabinet can sweat in three areas (zones 1-3 in the TIC).",
    steps: [
      "Keep airflow above 300 CFM per ton.",
      "Zone 1 (behind the discharge knockout): bring insulated duct, or a duct board false panel / wedge, forward to the knockout and gasket the duct to the cabinet.",
      "Zone 2: add a 2 in. wide x 1/8 in. thick door gasket.",
      "Zone 3: build an insulated partition / duct extension inside the discharge flange (1 in. UL duct insulation about 1/2 in. below the metal extension flange), gasket and screw it to the cabinet flange; caulk or gasket the insulation overhang."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2013-0008"
  },
  {
    id: "carrier-tic2013-0003", brand: "Carrier", number: "TIC2013-0003", docNo: "", rev: "", date: "2013-10-01", type: "Technical",
    title: "Gas furnace used as construction heat: drywall dust kills blower and inducer motors - no warranty without a sealed vent and filters",
    applies: { modelRe: ["^58[A-Z]{2}", "^59[A-Z]{2}", "^(310|312|313|315|800|801|811|812|813|820|830|880|886|887)[A-Z]{2}", "^9(15|25|26|45|50|55|70|73|82|86|87)[A-Z]{2}", "^PG[89]"] },
    appliesText: "All Carrier / Bryant / Payne gas furnaces.",
    summary: "40% of the failed blower and inducer motors returned through the SRP program failed from drywall or construction dust. A furnace used for temporary construction heat is not covered unless the permanent vent system is complete and sealed to the unit and filters are installed and kept up the whole time.",
    steps: [
      "Motor failure on a new-construction furnace: look for a dust coating on the motor - a sign it ran without a filter.",
      "Also: return air below the minimum temperature causes condensation and corrosion, and finishing work brings corrosive fumes. Some local codes forbid construction heat with the furnace no matter what."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2013-0003"
  },
  {
    id: "carrier-tic2013-0002", brand: "Carrier", number: "TIC2013-0002", docNo: "", rev: "", date: "2013-07-01", type: "Technical",
    title: "Condensing furnace condensate drain lines must be supported - a sagging line causes pressure switch trips and leaks",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "New Carrier / Bryant / Payne condensing gas furnaces.",
    summary: "Unsupported drain lines (especially in attics under insulation) get knocked: the slope reverses and water backs up to the trap (nuisance pressure switch trips), the line breaks and leaks, or the trap mounting post breaks and leaks at the collector box.",
    steps: [
      "Support the drain line per National Standard Plumbing Code 2009 section 8.7 (US) or the National Plumbing Code of Canada 2010, spaced so it cannot sag.",
      "Use plastic pipe hangers / clamps or perforated hanger strap. Avoid hand-cut sheet steel straps (sharp edges), wire or rope."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners TIC2013-0002"
  },
  {
    id: "carrier-tic2013-0001", brand: "Carrier", number: "TIC2013-0001", docNo: "", rev: "", date: "2013-07-01", type: "Technical",
    title: "Condensing furnace condensate trap screw: hand tools only, 20 in-lb max",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "New Carrier / Bryant / Payne condensing gas furnaces.",
    summary: "Power tools break the trap attachment screw or the plastic mounting post on the collector box, which leaks condensate where the trap seals to the collector box. The screw is made to bottom out in a brass insert so the foam gasket is not crushed; crushing it ruptures the foam cells and lets condensate seep through.",
    steps: [
      "When turning the trap to a new position, remove and install the screw with hand tools only.",
      "Max torque 20 in-lb - most power tools go past that."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2013-0001"
  },
  {
    id: "carrier-tic2019-0014", brand: "Carrier", number: "TIC2019-0014", docNo: "", rev: "", date: "2019-08-01", type: "Technical",
    title: "Ductless single zone heat pumps 38MPRA / 38MA*R / 38MHRQ: optional extended-defrost software for extreme weather",
    applies: { modelRe: ["^38MPRA", "^38MA.R", "^38MHRQ"] },
    appliesText: "Carrier ductless single zone heat pump outdoor units in the 38MPRA, 38MA*R and 38MHRQ families.",
    summary: "Carrier reviewed defrost complaints (mostly from Quebec) and says the standard defrost is right for all applications (tested 3 days at 32 F / 85% RH outdoors and 50 F indoors; coil at least 95% clear after each defrost). In some extreme weather an extended defrost may help heating and defrost; a software update tool is available through the distributor.",
    steps: [
      "Defrost / ice build-up complaint after the install and charge check out: call your distributor's technical support to judge whether the extended-defrost update fits.",
      "The update is optional and does not extend or change the warranty."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners TIC2019-0014"
  },
  {
    id: "carrier-dsb13-0028", brand: "Carrier", number: "DSB13-0028", docNo: "", rev: "", date: "2013-10-10", type: "Service",
    title: "New 35 in. condensing furnaces: odor / smoke on the first heat cycles - run the full 25 minute start-up, ventilate the home",
    applies: { modelRe: ["^59SC[25]", "^59SP5", "^59TP5", "^59TN6", "^59MN7", "^912S", "^915S", "^925S", "^925T", "^926T", "^986T", "^987M", "^PG92S", "^PG95S", "^PG95X", "^PG96V"] },
    appliesText: "All new 35 in. condensing (90%) gas furnace models. Factory improvements in units built week 38 of 2013 and later.",
    summary: "Leftover manufacturing oils and adhesives can give minor smoke or odor on the first cycles. From week 38 of 2013: less heat exchanger fin lubricant (cut 50% from week 11), 75% less gasket adhesive (week 17) and the process label removed. A new furnace with more airflow can also stir up dust and dirt in old ducts and filters.",
    steps: [
      "Run the full start-up from the install instructions - at least 25 minutes: set and check input rate (about 10 min), temperature rise (5-10 min), safety checks (about 10 min). Nearly all smoke and odor burns off during it.",
      "Open doors and windows during the first heating cycle.",
      "Dust or dirt blowing from the old duct system: the fix is duct cleaning and / or a new filter."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0028"
  },
  {
    id: "carrier-dsb13-0024", brand: "Carrier", number: "DSB13-0024", docNo: "", rev: "", date: "2013-10-08", type: "Service",
    title: "25VNA0 / 280ANV 24 and 36 size: board HK38EA017 version 04 loses heating capacity in EFFICIENCY mode - replace with HK38EA028 V5",
    applies: { modelRe: ["^25VNA0(24|36)", "^280ANV0(24|36)"], serialFrom: "4212E", serialTo: "3713E" },
    appliesText: "Carrier 25VNA0 and Bryant 280ANV variable speed heat pumps, 24 and 36 sizes, serials 4212E through 3713E, plus earlier units that got an HK38EA017 version 04 board as a service part. The 048 and 060 sizes are not affected (they can use HK38EA017 or HK38EA028).",
    summary: "A software coefficient error in the version 04 heat pump board (the first energy tracking board) cuts heating capacity and HSPF at low outdoor temperatures when the unit is set to EFFICIENCY mode. COMFORT mode (the factory default) is not affected.",
    steps: [
      "Check the heat pump board: HK38EA017 version 04 on a 24 or 36 size.",
      "For correct operation in EFFICIENCY mode, replace it with HK38EA028 version 5 (HK38EA017 is superseded to HK38EA028).",
      "Units 4212E to 0813E may also need the SMB 13-0007 field fix - do both in one visit (two separate claims)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0024"
  },
  // --- HVACpartners hourly catch-up 2026-11-03 9 PM: Dealer Service Bulletins 2011-2013 ---
  {
    id: "carrier-dsb13-0027", brand: "Carrier", number: "DSB13-0027", docNo: "", rev: "", date: "2013-10-03", type: "Service",
    title: "13 SEER 3 to 4 ton outdoor units: fan blade can come off the motor shaft at start-up",
    applies: { modelRe: ["^CA13NA0(36|42)", "^PA13NR036", "^PH13NR0(42|48)"], serialFrom: "0113X", serialTo: "2813X" },
    appliesText: "Carrier / Bryant CA13NA036 and 042, Payne PA13NR036, PH13NR042 and 048, serials 0113X through 2813X.",
    summary: "Some of these outdoor units were built with the fan blade not torqued tight enough to the motor shaft, so the blade can work loose and come off at start-up or soon after. The factory added a torque tool from week 2813X.",
    steps: [
      "On a unit in the serial range, check the fan blade set screw is tight on the motor shaft flat and the blade sits at the right height.",
      "Fan blade loose or off on a unit built after 2813X: tell the office so it can be reported to Carrier, and keep the motor and blade for return."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0027"
  },
  {
    id: "carrier-dsb13-0026", brand: "Carrier", number: "DSB13-0026", docNo: "", rev: "", date: "2013-10-02", type: "Installation",
    title: "CNPH furnace coils laid horizontal: horizontal RIGHT is OK for AC and heat pump, horizontal LEFT is AC only",
    applies: { modelRe: ["^CNPH"] },
    appliesText: "All brands, all CNPH* furnace coils, all serials.",
    summary: "How the coil sits on the furnace matters for airflow, capacity and efficiency. The bulletin has a table by furnace width and coil width that says which of 10 layouts are allowed. Horizontal-right layouts are allowed for air conditioners and heat pumps; horizontal-left layouts are allowed for air conditioners only.",
    steps: [
      "On a horizontal furnace with a CNPH coil, check which side the air leaves.",
      "Coil on a heat pump installed horizontal-left: not an approved layout - tell the office; the coil should be turned to a horizontal-right layout.",
      "Furnace width and coil width must be a combination the coil install instructions allow."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0026"
  },
  {
    id: "carrier-dsb13-0023", brand: "Carrier", number: "DSB13-0023", docNo: "", rev: "", date: "2013-08-27", type: "Service",
    title: "Hydronic heat kit KFAIF0101HWC shows up as a 255 kW heater - wrong identifier resistor",
    applies: { modelRe: ["^KFA[I1]F0101HWC", "^FE4A", "^FE5A"] },
    appliesText: "Carrier / Bryant hydronic heat interface kit KFAIF0101HWC (also printed KFA1F0101HWC) on Infinity / Evolution FE4A and FE5A fan coils, kits with quarterly code 132 and 133.",
    summary: "Some kits were built with a 270 ohm identifier resistor instead of 270,000 ohms. The fan coil then cannot identify the kit and the wall control may call it a 255 kW heater instead of hydronic heat.",
    steps: [
      "Wall control shows a 255 kW heater on an FE4A / FE5A with hydronic heat: check the kit's identifier resistor - it must be 270,000 ohms.",
      "Wrong resistor (about 270 ohms): replace the kit with a correct KFA1F0101HWC kit."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0023"
  },
  {
    id: "carrier-dsb13-0021", brand: "Carrier", number: "DSB13-0021", docNo: "", rev: "", date: "2013-06-19", type: "Product",
    title: "2013 limited-run aluminum coil condensing units ('L' in the 11th digit, blue label)",
    applies: { modelRe: ["^213CNA0(18|60)0L0", "^213C[PE]A0600L0", "^113AN[AW]0240L0", "^25HCD3(18|60)A0L", "^24ABB324[AW]0L3"] },
    appliesText: "Bryant 213CNA0180L0, 213CNA0600L0, 213CPA0600L0, 213CEA0600L0, 113ANA0240L0, 113ANW0240L0; Carrier 25HCD318A0L3, 25HCD360A0L3, 25HCD360A0L5, 25HCD360A0L6, 24ABB324A0L3, 24ABB324W0L3 (built 2013).",
    summary: "A small 2013 run of these models used all-aluminum outdoor coils with copper stub-outs. Same size, ratings and electrical data as the copper models. They are not coastal units.",
    steps: [
      "An 'L' in the 11th digit of the model number means the aluminum coil version.",
      "Aluminum replacement coils cannot go into the copper-tube models. For aluminum coil repairs the service part listed is 337748-751.",
      "Do not use them on the coast or within 5 miles of the seacoast - use coastal or copper units there.",
      "Any unit problem: tell the office; Carrier asks for a system check sheet."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0021"
  },
  {
    id: "carrier-dsb13-0020", brand: "Carrier", number: "DSB13-0020", docNo: "", rev: "", date: "2013-06-14", type: "Service",
    title: "Infinity Touch / Evolution Connex version 08: low high-stage cooling airflow with 2-stage outdoor units - update to V09",
    applies: { modelRe: ["^SYSTXCCIT[WN]01", "^SYSTXBBEC[WN]01"] },
    appliesText: "Carrier SYSTXCCITW01 / SYSTXCCITN01 and Bryant SYSTXBBECW01 / SYSTXBBECN01 controls with version 08 software, with 2-stage outdoor units.",
    summary: "With version 08 and the airflow set to Comfort (factory default), high-stage cooling may not get enough airflow, which can give a coil freezing notice and low capacity.",
    steps: [
      "Check the control's software version. Version 08 with a 2-stage outdoor unit: update to version 09 or later (instructions on HVACpartners under the control's Software / Firmware downloads).",
      "Until it is updated, set cooling airflow to Quiet, Efficiency or Maximum instead of Comfort."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0020"
  },
  {
    id: "carrier-dsb13-0016", brand: "Carrier", number: "DSB13-0016", docNo: "", rev: "", date: "2013-05-28", type: "Service",
    title: "Aluminum round-tube coils: most shelf coil cleaners attack them - use mild detergent or the two approved cleaners",
    applies: { modelRe: [] },
    appliesText: "All Carrier / Bryant / Payne residential aluminum round-tube, plate-fin coils, indoor and outdoor. Updates DSB12-0030 (indoor only) to cover outdoor coils too.",
    summary: "Testing found many common coil cleaners are highly aggressive to aluminum tube coils. Mild detergent stays the recommended way to clean both copper and aluminum residential coils.",
    steps: [
      "Clean with mild detergent and water.",
      "If a chemical cleaner is needed, only these are approved for aluminum round-tube coils (indoor and outdoor): Extreme Simple Green Aircraft & Precision Cleaner, and Environmentally Sound Coil Cleaner.",
      "Rinse the coil well after any cleaner, and check local code before letting rinse water reach storm drains."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0016 (and DSB12-0030)"
  },
  {
    id: "carrier-dsb13-0011", brand: "Carrier", number: "DSB13-0011", docNo: "", rev: "", date: "2013-04-09", type: "Service",
    title: "Edge / Totaline Premier thermostats wired straight to a supply fan contactor can overheat or smoke",
    applies: { modelRe: ["^(TP|T6)-(PAC|PHP|NAC|NHP)01", "^(TP|T6)-(PRH|NRH)01", "^P730-(11PAC|11NAC|32PHP|32NHP|32PRH|32NRH)"] },
    appliesText: "Carrier Edge TP-PAC01, TP-PHP01, TP-PRH01-A, TP-NAC01, TP-NHP01, TP-NRH01-A, T6-PAC01, T6-PHP01, T6-PRH01-A, T6-NAC01, T6-NHP01, T6-NRH01-A and Totaline P730-11PAC, P730-32PHP, P730-32PRH, P730-11NAC, P730-32NHP, P730-32NRH, shipped 2007-2013, only when G drives a supply fan contactor coil directly.",
    summary: "Driving a contactor coil straight from G can fatigue a capacitor on the thermostat's control module and make it overheat or smoke. Residential fan coils, furnaces, condensing units, heat pumps and small packaged units are NOT affected, nor are units with DDC controls, gas rooftops with an IGC, or units with a time delay relay in the fan circuit (rooftops 5 tons and under).",
    steps: [
      "On light commercial split or electromechanical equipment, check whether the thermostat G wire goes straight to a supply fan contactor coil.",
      "If it does, the thermostat's control module needs the mandatory rework - tell the office to contact the distributor (reference SMB 13-0010)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0011"
  },
  {
    id: "carrier-dsb13-0008", brand: "Carrier", number: "DSB13-0008", docNo: "", rev: "", date: "2013-03-18", type: "Service",
    title: "Small packaged units with X-13 blower motors: replace only the control module (after 3 motor tests)",
    applies: { modelRe: ["^48ES", "^48VL", "^48VT", "^48XL", "^50ES", "^50EZ", "^50GL", "^50JZ", "^50VL", "^50VT", "^50XL", "^50XT", "^50ZH", "^50ZP", "^574D", "^577[CD]", "^604D", "^607[CD]", "^674D", "^677[CD]", "^704D", "^707C", "^P[AHY]3G", "^PA3Z", "^PH3Z"] },
    appliesText: "Carrier, Bryant and Payne small packaged units with X-13 blower motors built before 3712. The bulletin lists by motor part number, not model; the families here are the small packaged lines of that era. Field units with 5 years of service or less and valid warranty.",
    summary: "X-13 blower motor control modules fail in some operating conditions. When a replacement module is available, replace only the module, not the whole motor - but only after the motor section passes three tests.",
    steps: [
      "Test the motor first: the blower wheel spins freely; more than 100k ohms from any connector pin to the motor end plate; less than 20 ohms between any two of the three motor leads, all three within 10% of each other.",
      "Fails any test: do not fit a module (a new module can fail on a bad motor) - replace the whole motor under normal warranty.",
      "Passes: replace the module. Motor -> module: HD42AR234 -> HK42ER210, HD42AR235 -> HK42ER211, HD44AE232 -> HK44ER220, HD44AE234 -> HK44ER221, HD44AE235 -> HK44ER222, HD44AR236 -> HK44ER223, HD44AR237 -> HK44ER224, HD44AR238 -> HK44ER225, HD46AE224 -> HK46ER230, HD46AR220 -> HK46ER231, HD46AR233 -> HK46ER232, HD46AR243 -> HK46ER233, HD52AE136 -> HK52ER240, HD52AE137 -> HK52ER241, HD52AE141 -> HK52ER242, HD52AR135 -> HK52ER243, HD52AR223 -> HK52ER244.",
      "The label on each module lists the motors it fits. Motor not on the list: replace the whole motor. The bulletin will not pay a whole motor when a module is listed."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0008"
  },
  {
    id: "carrier-dsb13-0007", brand: "Carrier", number: "DSB13-0007", docNo: "", rev: "", date: "2013-03-12", type: "Service",
    title: "25VNA / 280ANV variable speed heat pump: water in the control box gives false sensor readings or comm faults",
    applies: { modelRe: ["^25VNA", "^280ANV"], serialTo: "0713E" },
    appliesText: "Carrier 25VNA and Bryant 280ANV, all sizes, built before 0813E.",
    summary: "Water can run down the protective sleeves of the suction thermistor, suction pressure transducer and EXV wires into the control box and drip on the board, causing false readings or communication faults.",
    steps: [
      "Lift off the outlet grille with the fan motor still attached and rest it upside down on the top cover.",
      "Put a wire tie around the end of the protective sleeve at the suction temperature thermistor and at the suction pressure transducer to close them.",
      "Slide the suction thermistor down the suction tube (still in its factory wire tie) to about the level of the reversing valve body.",
      "In the control box: all unsleeved wires coming through the lower opening go in the highest wire tie above it. Pull the EXV sleeve toward the board plug so its end near the EXV lies flat.",
      "Tie the three sleeved wires to the other wires just above the opening so they form an upside-down drip loop."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0007"
  },
  {
    id: "carrier-dsb13-0001", brand: "Carrier", number: "DSB13-0001", docNo: "", rev: "", date: "2013-02-04", type: "Service",
    title: "Fan coils with X-13 blower motors: replace only the control module (after 3 motor tests)",
    applies: { modelRe: ["^FB4C", "^FC4D", "^FX4C", "^FX4D", "^FF1E(019|025|031|037)", "^PF1MNC", "^PF4MN[AB]"] },
    appliesText: "Carrier / Bryant FB4C, FC4D, FX4C, FX4D (all sizes), FF1E 019-037; Payne PF1MNC, PF4MNA / PF4MNB 019-061; built before 3712.",
    summary: "X-13 fan coil motor control modules fail in some conditions. Replace only the control module, after the motor section passes three tests.",
    steps: [
      "Test the motor first: the blower wheel spins freely; more than 100k ohms from any connector pin to the motor end plate; less than 20 ohms between any two of the three motor leads, all three within 10% of each other.",
      "Fails any test: do not fit a module - replace the whole motor under normal warranty.",
      "Passes: fit the module whose label lists your motor part number. Modules in the bulletin: HK42ER223 to HK42ER229 and HK42ER235 to HK42ER237 (HD42 motors), HK44ER155 / 156 and HK44ER232 to HK44ER242 (HD44 motors), HK46ER248 to HK46ER255 (HD46 motors)."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0001"
  },
  {
    id: "carrier-dsb13-0004", brand: "Carrier", number: "DSB13-0004", docNo: "", rev: "", date: "2013-02-01", type: "Service",
    title: "90% furnace collector box minor condensate leaks - replacement kit, tighten screws by hand",
    applies: { modelRe: [], serialFrom: "2711A", serialTo: "4012A" },
    appliesText: "Carrier 90% furnaces, serials 2711A to 4012A, with collector box 336850-701, -702, -703 or -704 (the model list is not readable in the bulletin copy).",
    summary: "Some collector boxes had defects that can cause minor condensate leaks - not a safety, performance or efficiency problem. The factory now uses lower screw torque, a set tightening order and rubber-backed washers.",
    steps: [
      "Leaking collector box: replace with kit 336850-751, -752, -753 or -754 (matches factory part 336850-701 to -704). The kit has screws with rubber-backed washers.",
      "Follow the kit's tightening sequence and tighten the screws BY HAND - a power screwdriver can crack the collector box."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0004"
  },
  {
    id: "carrier-dsb13-0002", brand: "Carrier", number: "DSB13-0002", docNo: "", rev: "", date: "2013-01-21", type: "Service",
    title: "CH13 heat pump rating plate wrongly says FIELD CHARGED - it is factory charged",
    applies: { modelRe: ["^CH13NA0(18|24|30|36|42|48|60)"], serialFrom: "1712X", serialTo: "5012X" },
    appliesText: "Carrier / Bryant CH13NA018 through 060, serials 1712X through 5012X.",
    summary: "The rating plate says FIELD CHARGED, but these units are factory charged with the refrigerant type and amount shown on the plate. Not a safety or agency issue.",
    steps: ["Ignore 'FIELD CHARGED' - treat the plate charge as the factory charge and adjust for line set length as the install instructions say."],
    priority: "info", confidential: true,
    source: "HVACpartners DSB13-0002"
  },
  {
    id: "carrier-dsb13-0003", brand: "Carrier", number: "DSB13-0003", docNo: "", rev: "", date: "2013-01-21", type: "Service",
    title: "2-stage heat pump board HK38EA016 on a standard thermostat: out-of-phase transformers can burn PTC1 in defrost",
    applies: { modelRe: ["^25HNB[69]", "^28[69]B"], serialFrom: "2912E" },
    appliesText: "Carrier 25HNB6 / 25HNB9 and Bryant 286B / 289B, 24 through 60 sizes, from serial 2912E, non-communicating (standard thermostat on ST1). Communicating Infinity / Evolution systems are not affected.",
    summary: "If the indoor and outdoor 24 V transformers are out of phase, PTC1 (above the W1 terminal on ST1) can fail during defrost when W1 calls for backup heat.",
    steps: [
      "Check phasing: take Y1 off ST1 and put one meter lead on it (AC volts). Call for cool or heat so Y1 has 24 V from the indoor unit. Put the other lead on SEC1 or UTIL of ST1.",
      "10 VAC or less = in phase, OK. 40 VAC or more = out of phase - reverse one transformer.",
      "If the thermostat turns on backup heat by itself when it sees O during defrost, do NOT connect W1 on the board's ST1. Thermostats that do this: TP-PHP, TP-NHP, TC-PHP, TC-NHP, TB-PHP, TB-NHP, T6-PHP, T6-NHP, T2-PHP, T2-NHP, T1-PHP, T1-NHP."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB13-0003"
  },
  {
    id: "carrier-dsb11-0016a", brand: "Carrier", number: "DSB11-0016A", docNo: "", rev: "A", date: "2012-10-15", type: "Service",
    title: "Single-speed heat pumps with larger indoor coils: add extra subcooling to the plate value",
    applies: { modelRe: ["^25HBC[35]", "^25HCB3", "^25HCC5", "^25HNB5", "^25HNH5", "^25HPA5", "^21[35]B", "^223A", "^225B", "^285B", "^CH13", "^PH1[35]"] },
    appliesText: "Single-speed heat pumps: Carrier 25HBC3, 25HBC5, 25HCB3, 25HCC5, 25HNB5, 25HNH5, 25HPA5H, CH13; Bryant 213B, 215B, 223A, 225B, 285B, CH13; Payne PH13, PH15.",
    summary: "With larger indoor coil matches these heat pumps may need more subcooling for best heating capacity. The bulletin has a table of extra subcooling for each outdoor unit + coil match (until the install instructions were updated).",
    steps: [
      "Target subcooling = rating plate subcooling + the table adjustment for that outdoor unit and coil match.",
      "Charge to within 3 F of that total.",
      "The adjustment table is in the bulletin (ask the office) or in the current install instructions for the unit."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0016A"
  },
  {
    id: "carrier-dsb12-0033", brand: "Carrier", number: "DSB12-0033", docNo: "", rev: "", date: "2012-10-03", type: "Service",
    title: "Small packaged units built 3112C-3612C may be undercharged (no green dot)",
    applies: { modelRe: ["^48ES", "^48VL", "^48VT", "^48XL", "^50ES", "^50EZ", "^50GL", "^50JZ", "^50VL", "^50VT", "^50XL", "^50XT", "^50ZH", "^50ZP", "^574D", "^577[CD]", "^604D", "^607[CD]", "^674D", "^677[CD]", "^704D", "^707C", "^P[AHY]3G", "^PA3Z", "^PH3Z"], serialFrom: "3112C", serialTo: "3612C" },
    appliesText: "Bryant 574D, 577C, 577D, 604D, 607C, 607D, 674D, 677C, 677D, 704D, 707C; Carrier 48ES, 48VL, 48VT, 48XL, 50ES, 50EZ, 50GL, 50JZ, 50VL, 50VT, 50XL, 50XT, 50ZH, 50ZP; Payne PA3G, PH3G, PY3G, PA3Z, PH3Z; serials 3112C through 3612C.",
    summary: "Units in this range may be short of refrigerant and underperform. Units with a green dot on the shipping label or rating plate were already reworked.",
    steps: [
      "Green dot on the label or plate: already fixed, nothing to do.",
      "No green dot, at start-up or when performance is poor - AC: adjust charge per the install instructions at 75 F outdoor or warmer.",
      "Heat pump, plate in kg: add the number after the comma - plate 4,35 kg means add 0,35 kg.",
      "Heat pump, plate in lb: add the amount from the bulletin's Table A for the plate charge (example: plate 3.2 lb = add 0.95 lb). Ask the office for Table A."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0033"
  },
  {
    id: "carrier-dsb12-0029", brand: "Carrier", number: "DSB12-0029", docNo: "", rev: "", date: "2012-08-24", type: "Service",
    title: "48/50LC 3-5 ton and 48/50HC-011: hot zener diodes trip the transformer breaker - kit 48LC660001",
    applies: { modelRe: ["^(48|50)LC[A-Z]{2}0[4-6]", "^(48|50)HC[A-Z]{2}11"], serialFrom: "0412G", serialTo: "2612G" },
    appliesText: "Carrier 48/50LC-004 to 006 and 48/50HC-011, serials 0412G00001-2612G99999 and 0412C00001-2612C99999.",
    summary: "The noise-suppression zener diodes run hot when the 24 V supply is on the high side, tripping the transformer circuit breaker / secondary fuse.",
    steps: [
      "Transformer breaker or secondary fuse trips: power off and feel the diodes. Warm = this problem.",
      "Replace them with kit 48LC660001 (higher rated diodes).",
      "Until the kit arrives the unit can run with the diodes taken out of the circuit."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0029"
  },
  {
    id: "carrier-dsb12-0025", brand: "Carrier", number: "DSB12-0025", docNo: "", rev: "", date: "2012-07-11", type: "Service",
    title: "Old FV4A / FV4B air handler with a new 2-stage outdoor unit: change the ECM module to get an AHRI match",
    applies: { modelRe: ["^FV4A", "^FV4B"] },
    appliesText: "Carrier / Bryant FV4A and FV4B air handlers, all sizes, when only the outdoor unit is replaced (for example under DSB11-0024 / DSB11-0025).",
    summary: "FV4A / B were built for the earlier 2-stage outdoor units, so with a new Copeland 2-stage unit they are not an AHRI listed match.",
    steps: ["Replace the ECM variable speed control module as DSB11-0024 describes - the FV4A / B then performs as an FV4C and meets the AHRI combination."],
    priority: "info", confidential: true,
    source: "HVACpartners DSB12-0025"
  },
  {
    id: "carrier-dsb12-0028", brand: "Carrier", number: "DSB12-0028", docNo: "", rev: "", date: "2012-07-02", type: "Service",
    title: "Infinity / Evolution UI version 18-23 will not restart cooling after code 71 or 72 - update to version 24",
    applies: { modelRe: ["^SYSTXCCUI[DZ]01", "^SYSTXBBUI[DZ]01"], codes: ["71", "72"] },
    appliesText: "Carrier SYSTXCCUID01-V / SYSTXCCUIZ01-V and Bryant SYSTXBBUID01-D / SYSTXBBUIZ01-D, versions 18 to 23, with 2-stage AC or heat pump.",
    summary: "After a code 71 (low stage thermal cutout) or 72 (high stage thermal cutout) at the 2-stage outdoor unit, these UIs end the cooling call and never restart it until power is cycled.",
    steps: [
      "Check the UI software version (back of the UI or service screen).",
      "Versions 18-23: install UI software version 24. A new outdoor board will NOT fix this.",
      "Still find out why the compressor tripped on code 71 / 72."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0028"
  },
  {
    id: "carrier-dsb12-0021", brand: "Carrier", number: "DSB12-0021", docNo: "", rev: "", date: "2012-06-21", type: "Service",
    title: "TB-PAC01 builder thermostat shipped with a jumper between Y and C - remove it",
    applies: { modelRe: ["^TB-PAC01"], serialFrom: "1712N037115", serialTo: "1712N061744" },
    appliesText: "Carrier TB-PAC01, serials 1712N037115 to 1712N037939 and 1712N061595 to 1712N061744.",
    summary: "A jumper wire was left between the Y and C terminals on the thermostat base plate.",
    steps: ["Look at the base plate. Jumper between Y and C: remove and throw it away."],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0021"
  },
  {
    id: "carrier-dsb12-0020", brand: "Carrier", number: "DSB12-0020", docNo: "", rev: "", date: "2012-06-13", type: "Service",
    title: "ECM 3.0 service motor modules HK44EA123 / HK52EA123 built 2/2011-8/2011 run too slow",
    applies: { modelRe: ["^59MN7A", "^59TN6A", "^FE4AN[BF]", "^FE5ANB", "^355[ABCM]AV", "^315[AJ]AV", "^PG9UAA"] },
    appliesText: "Service replacement modules HK44EA123 and HK52EA123 (1 hp) built February 21 to August 15, 2011 (box date code 0211-0911), on furnaces, fan coils and small packaged units that use them - Table 1 lists 59MN7A, 59TN6A, FE4ANB, FE4ANF, FE5ANB, 355CAV, 355BAV, 355AAV, 355MAV, 315AAV, 315JAV, PG9UAA among others. HK46EA123 is not affected; neither are factory motors or complete service motor assemblies.",
    summary: "About 1600 service modules were programmed wrong, so the motor runs below the needed speed - low airflow, high temperature rise, limit trips or a frozen coil.",
    steps: [
      "Low airflow on one of these units where the module was already replaced: pull the blower and check for a service module (it has an extra part number label).",
      "Read the group code (GC07 or GC08) and serial on the module and check it against the bulletin's serial list (serials start 005...). Ask the office for the list.",
      "Affected: replace the module. Not affected: check the setup, airflow selections and duct static instead.",
      "Good modules from stock after 2/27/2012 had a green dot on the carton until May 2012."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0020"
  },
  {
    id: "carrier-dsb12-0019", brand: "Carrier", number: "DSB12-0019", docNo: "", rev: "", date: "2012-06-05", type: "Service",
    title: "X-13 blower motors with control date codes March 5 - April 20, 2012 cycle on and off when hot",
    applies: { modelRe: ["^FB4C", "^FX4D", "^PF4MN[AB]", "^48ES", "^48VL", "^48VT", "^50ES", "^50EZ", "^50VL", "^50VT", "^50ZP", "^574D", "^577C", "^604D", "^607C", "^677C", "^704D", "^P[AHY]3G", "^PA3Z", "^PH3Z"] },
    appliesText: "Fan coils FB4C, FX4D, Payne PF4MNA / PF4MNB (serials 1212A-2012A) and small packaged units 48ES, 48VL, 48VT, 50ES, 50EZ, 50VL, 50VT (24, 36), 50ZP (30, 36), Bryant 574D, 577C, 604D, 607C, 677C, 704D, Payne PA3G, PH3G, PY3G, PA3Z, PH3Z (serials 1112C-2012C). Only the specific serials on the distributor's list.",
    summary: "Parts inside the X-13 motor control can make the motor cycle on and off, worse at higher temperatures. Affected motor controls have date codes between March 5 and April 20, 2012.",
    steps: [
      "Blower cycling on and off: read the date code on the motor control label.",
      "Packaged unit: replace the failed motor with one outside that date range. Fan coil: replace the failed control module with one outside that date range.",
      "Reworked stock has a black dot on the control and a green dot on the box.",
      "Return the failed part as the warranty system says."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0019"
  },
  {
    id: "carrier-dsb12-0015", brand: "Carrier", number: "DSB12-0015", docNo: "", rev: "", date: "2012-05-17", type: "Service",
    title: "Rooftop condenser fan motors built Dec 2011 - Mar 2012: brittle bearing clip screws break",
    applies: { modelRe: ["^48TC", "^50TC", "^48HC", "^50HC", "^50HT", "^580J[PE]", "^558JE"], serialFrom: "4411G", serialTo: "1312G" },
    appliesText: "Carrier 48/50TC, 48/50HC, 50HT and Bryant 580JP, 580JE, 558JE, serials 4411G to 1312G, condenser fan motors with serials starting L11J, A12J, B12J or C12J.",
    summary: "Screws holding the bearing clip on the end opposite the shaft can go brittle and break. If it is going to happen it usually happens at or soon after start-up.",
    steps: ["Failed condenser fan motor with a motor serial starting L11J, A12J, B12J or C12J: replace the motor (current stock is not affected)."],
    priority: "info", confidential: true,
    source: "HVACpartners DSB12-0015"
  },
  {
    id: "carrier-dsb12-0014", brand: "Carrier", number: "DSB12-0014", docNo: "", rev: "", date: "2012-05-16", type: "Service",
    title: "25VNA / 280ANV inverter faults on 'dirty' utility power - inverter with updated software",
    applies: { modelRe: ["^25VNA", "^280ANV"], serialTo: "1712E" },
    appliesText: "Carrier 25VNA and Bryant 280ANV, all sizes, built before 1812E.",
    summary: "Where the utility power has high harmonic content, the inverter can misread its voltage and log over-current or under-voltage faults (inverter over current, VDC-out under voltage, VDC under voltage lockout, 230 VAC under voltage).",
    steps: [
      "Repeated inverter over-current or under-voltage codes on a unit built before 1812E: check the software version on the inverter's label.",
      "Old software: replace the inverter with one from RC that has the updated software (see PMB12-034). The bulletin names 337737-751 for the 24 and 36 sizes."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0014"
  },
  {
    id: "carrier-dsb12-0007", brand: "Carrier", number: "DSB12-0007", docNo: "", rev: "", date: "2012-02-22", type: "Service",
    title: "2010 condensing furnaces: pressure switch HK06ZB104 fails - replace with HK06NB123 / HK06NB124",
    applies: { modelRe: ["^340AAV", "^350AAV", "^353AAV", "^PG9MAB"], serialFrom: "0110A", serialTo: "5210A" },
    appliesText: "Condensing furnaces built 2010 (serials 0110A to 5210A) with the HK06ZB104 single-stage pressure switch - Bryant 340AAV, 350AAV, 353AAV and Payne PG9MAB are listed. Not used on 80% furnaces.",
    summary: "The HK06ZB104 single-stage differential pressure switch fails more often than expected.",
    steps: ["Failed HK06ZB104 (complaint only): replace with HK06NB123, or HK06NB124 (same switch with a removable mounting bracket). Exact fit."],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0007"
  },
  {
    id: "carrier-dsb12-0002", brand: "Carrier", number: "DSB12-0002", docNo: "", rev: "", date: "2012-01-10", type: "Service",
    title: "326 fan coils with an early-failure blower motor (extended harness) - replace on failure",
    applies: { modelRe: ["^FB4CNF0(24|30|36)", "^FX4DN[FB]0(25|31|37|43|49)", "^PF4MNB0(25|31|37|43|49)"] },
    appliesText: "Carrier / Bryant FB4CNF024, 030, 036; FX4DNF025, 031, 037, 043, 049; FX4DNB049; Payne PF4MNB025-049 - only the 326 serials on the bulletin's list.",
    summary: "A small run of fan coils got a motor with an extended harness and connector that can fail early.",
    steps: [
      "Motor failed and has the extended harness: replace the motor (ask the office for the replacement part and serial list).",
      "On FB4CNF024 the replacement motor has a different horsepower - that is expected; the nameplate FLA already covers it."
    ],
    priority: "info", confidential: true,
    source: "HVACpartners DSB12-0002"
  },
  {
    id: "carrier-dsb12-0001", brand: "Carrier", number: "DSB12-0001", docNo: "", rev: "", date: "2012-01-05", type: "Service",
    title: "48TC 16 size high-fire rooftops: wrong limit switch HH18HA150 - change to HH18HA141",
    applies: { modelRe: ["^48TC[FT].16", "^580J[EP]16"], serialFrom: "0111G", serialTo: "4811G" },
    appliesText: "Carrier 48TCF*16, 48TCT*16 and Bryant 580JE16, 580JP16, serials 0111G00001-4811G99999 (high fire, ten-tube heat exchangers).",
    summary: "The factory fitted limit HH18HA150 (opens 150 F, closes 110 F) instead of HH18HA141 (opens 140 F, closes 100 F). Not a safety issue but it does not match the unit's certification.",
    steps: ["Check the limit. HH18HA150 fitted: replace it with HH18HA141."],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB12-0001"
  },
  {
    id: "carrier-dsb11-0046", brand: "Carrier", number: "DSB11-0046", docNo: "", rev: "", date: "2011-12-14", type: "Service",
    title: "48CE / 574C packaged units: no heat with Infinity / Evolution UI versions 18-21",
    applies: { modelRe: ["^48CE", "^574C"], codes: ["16"] },
    appliesText: "Carrier 48CE and Bryant 574C single-stage heating packaged units, all serials, with UI SYSTXBBUID01-D, SYSTXBBUIZ01-D, SYSTXCCUID01-D or SYSTXCCUIZ01-D version 18, 19, 20 or 21.",
    summary: "UI versions 18-21 do not recognise these as gas heat units, so they never start in heating.",
    steps: [
      "Use a UI with version 16 or earlier, or version 23 or later.",
      "A standard 24 V thermostat on the terminal strip will run it, but status code 16 (system communication fault) shows and no more diagnostics are available until communication is restored."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0046"
  },
  // --- HVACpartners hourly catch-up 2026-11-03 10 PM: last Dealer Service Bulletins 2011 ---
  {
    id: "carrier-dsb11-0038", brand: "Carrier", number: "DSB11-0038", docNo: "", rev: "", date: "2011-12-08", type: "Safety",
    title: "Infinity / Perfect Air purifiers: use only the factory filter cartridge, arrows with the airflow",
    applies: { modelRe: ["^GAPAAXCC", "^GAPABXCC", "^GAPAAXBB", "^GAPABXBB"] },
    appliesText: "All Carrier Infinity and Bryant Perfect Air electronic air purifiers (GAPAAXCC / GAPABXCC, GAPAAXBB / GAPABXBB, sizes 1625, 2025, 1620, 2020, 2420), all serials.",
    summary: "Warranty returns found purifier problems caused by non-factory filter cartridges and by factory cartridges put in the wrong way. The wrong cartridge upsets how the purifier works and can be a safety hazard.",
    steps: [
      "Only fit the factory replacement cartridge for that purifier. The bulletin's table lists Carrier cartridges GAPCCCAR1625, GAPCCCAR2025, GAPCCCAR1620, GAPCCCAR2020, GAPCCCAR2420 and Bryant cartridges GAPBBCAR1625, GAPBBCAR2025, GAPBBCAR1620, GAPBBCAR2020, GAPBBCAR2420 - match the size number on the purifier model.",
      "The arrows on the cartridge must point the same way as the airflow and match the arrows on the cabinet label.",
      "At install and after every maintenance visit, check the right cartridge is in and facing the right way, and tell the homeowner not to use other brands."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0038"
  },
  {
    id: "carrier-dsb11-0035", brand: "Carrier", number: "DSB11-0035", docNo: "", rev: "", date: "2011-11-22", type: "Service",
    title: "Modulating furnace 59MN7A / 987MA with UI version 21: heat keeps running when mode is switched to cool",
    applies: { modelRe: ["^59MN7A", "^987MA", "^SYSTXCCUI[DZ]01", "^SYSTXBBUI[DZ]01"] },
    appliesText: "Carrier 59MN7A and Bryant 987MA modulating furnaces (all sizes, all serials) with Infinity / Evolution UI SYSTXCCUID01-V, SYSTXCCUIZ01-V, SYSTXBBUID01-D or SYSTXBBUIZ01-D running version 21. Not the *9MAC furnaces or any other model.",
    summary: "With UI version 21, if the mode is changed from heat to cool while a heat call is still running, the furnace keeps heating and the AC runs at the same time. Replacing the furnace board does not fix it. Version 23 UI software fixes it.",
    steps: [
      "Check the UI software version. Version 21 on a 59MN7A or 987MA: update to version 23 or later.",
      "Until then: use Auto changeover, or switch the mode to Off and wait 10 seconds before changing modes.",
      "A version 16 or 18 UI also stops it, but the furnace then runs as a 3-stage furnace, not fully modulating. A plain single-stage thermostat also works.",
      "Do not change the furnace control board for this."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0035"
  },
  {
    id: "carrier-dsb11-0034", brand: "Carrier", number: "DSB11-0034", docNo: "", rev: "", date: "2011-11-18", type: "Service",
    title: "59TN6A furnace will not stage up to high heat - HK42FZ043 board needs version 19 software",
    applies: { modelRe: ["^59TN6A"], serialFrom: "2711A", serialTo: "4311A" },
    appliesText: "Carrier 59TN6A furnaces, serials 2711A to 4311A, with the HK42FZ043 control board. Other furnaces using HK42FZ043 are not affected.",
    summary: "The board software in these furnaces never stages up to high heat - not after 16 minutes on a single-stage thermostat, not with a version 21 Infinity UI, and not when the board controls staging. Version 19 (V19) board software is correct. V19 boards have a board serial starting 4411N; furnaces from serial 4411A have it.",
    steps: [
      "Look at the software version and board serial on the HK42FZ043 label (bottom of the board).",
      "Older software in a 2711A-4311A furnace: replace the board with an HK42FZ043 with V19 software from the distributor.",
      "Return the old board in the box the new one came in, and tell the office for the warranty labor claim."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0034"
  },
  {
    id: "carrier-dsb11-0033", brand: "Carrier", number: "DSB11-0033", docNo: "", rev: "", date: "2011-11-17", type: "Service",
    title: "Small packaged AC units: condensate drips on the outdoor board - insulated cover kit 50XL400065",
    applies: { modelRe: ["^50XL", "^50XT", "^48XL", "^48XT", "^707D", "^607D", "^577D", "^677D"], serialFrom: "1409C", serialTo: "2211C" },
    appliesText: "Carrier 50XL, 50XT, 48XL, 48XT and Bryant 707D, 607D, 577D, 677D, serials 1409C to 2211C.",
    summary: "The outdoor control board sits under the indoor blower. In high humidity, condensate can collect on the blower housing and drip onto the board, causing nuisance faults or a failed board. Not every unit sees it.",
    steps: [
      "Nuisance faults or a failed outdoor board with signs of water on it: fit kit 50XL400065 (insulated cover, insulated board bracket, label, grommet, wire ties).",
      "If you replace the outdoor board for water or nuisance faults, install the 50XL400065 kit with the new board."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0033"
  },
  {
    id: "carrier-dsb11-0031", brand: "Carrier", number: "DSB11-0031", docNo: "", rev: "", date: "2011-11-01", type: "Service",
    title: "5 ton mobile home packaged AC: filter drier installed backwards - replace with KH43LG074",
    applies: { modelRe: ["^50ZPB060", "^PA3ZNB060"], serialFrom: "0110A", serialTo: "4211A" },
    appliesText: "Carrier 50ZPB060, Bryant and Payne PA3ZNB060000, serials 0110A to 4211A. Reworked units have a green dot on the shipping label.",
    summary: "The one-way filter drier was put in backwards at the factory. It is not a safety problem, but it should flow the right way.",
    steps: [
      "On a unit in the range with no green dot, check the flow arrow on the filter drier.",
      "Backwards: recover, cut out the drier and fit a new one, p/n KH43LG074, with the arrow in the direction of refrigerant flow."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0031"
  },
  {
    id: "carrier-dsb11-0030", brand: "Carrier", number: "DSB11-0030", docNo: "", rev: "", date: "2011-10-19", type: "Wiring",
    title: "25VNA with a utility (load shed) relay: wire it across the two UTIL terminals only, not UTIL to C",
    applies: { modelRe: ["^25VNA0"] },
    appliesText: "Carrier 25VNA* variable speed heat pumps, all sizes, all serials (the bulletin is from 2011, so the 25VNA0 Infinity heat pumps of that time - not the later 25VNA4 / 25VNA8).",
    summary: "The 25VNA-3SI install instructions said to wire the utility interface relay between UTIL and C on the outdoor board. Wired that way it blows the fuse on the outdoor board.",
    steps: [
      "Utility saver / load shed relay on a 25VNA: it must connect between the UTIL connections only - no wire to C.",
      "Blown outdoor board fuse on a 25VNA with a utility relay: check this wiring first, correct it, then replace the fuse."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0030"
  },
  {
    id: "carrier-dsb11-0026", brand: "Carrier", number: "DSB11-0026", docNo: "", rev: "", date: "2011-09-09", type: "Service",
    title: "38AUZ / 38AUD / 541A / 569J: Comfort Alert fault code 6 nuisance trips - module software from week 25 2011",
    applies: { modelRe: ["^38AUZ", "^38AUD", "^541A", "^569J"], codes: ["6"] },
    appliesText: "Carrier 38AUZ / 38AUD and Bryant 541A / 569J light commercial split condensing units, serials 3211G and 3211U, with Comfort Alert module HK60EC002.",
    summary: "The Comfort Alert module was too sensitive to current imbalance from system operation or loose wiring, giving fault code 6 (missing phase or wrong compressor rotation), delayed starts and lockout - mostly now and then at start-up. Emerson changed the module software; the part number stays HK60EC002, and updated modules have a module serial of 1125xxxxx or later.",
    steps: [
      "Fault code 6: first check every power and compressor wire connection is tight and the phase voltages and currents are balanced.",
      "Module serial before 1125xxxxx: replace it with an updated HK60EC002 (serial 1125xxxxx or later).",
      "Open delta or center-tapped grounded open delta power can still cause code 6 with the new module - tell the office so it can call Carrier post-sale support."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0026"
  },
  {
    id: "carrier-dsb11-0024", brand: "Carrier", number: "DSB11-0024", docNo: "", rev: "", date: "2011-09-07", type: "Service",
    title: "Fan coil ECM module must be changed when a Bristol 2-stage outdoor unit is replaced with a Copeland one",
    applies: { modelRe: ["^FK4C", "^FK4D", "^FV4A", "^FV4B", "^40FKA", "^40FKB"] },
    appliesText: "Carrier 40FKA / 40FKB and Carrier / Bryant FK4C, FK4D, FV4A, FV4B fan coils, where a failed Bristol two-stage outdoor unit (failed on or after September 12, 2011) was replaced under Carrier's program with a unit that has a Copeland scroll.",
    summary: "With the Copeland replacement unit, the fan coil's low-speed airflow setting is wrong. The ECM 2.3 control module has to be replaced with one that has the right low-speed airflow. The new module part number is slightly different from the old one.",
    steps: [
      "Fan coil in the list, outdoor unit replaced under the Bristol program with a Copeland scroll unit: replace the ECM 2.3 control module (motor stays).",
      "Kits in the bulletin's table: HD44AE131 -> RMOD44AR131, HD44AE132 -> RMOD44AR132, HD44AE133 -> RMOD44AR133, HD46AE244 -> RMOD46AR244. Match the part number on the existing motor / module; ask the office if it is not one of these."
    ],
    priority: "normal", confidential: true,
    source: "HVACpartners DSB11-0024"
  },
  // ===================== DAIKIN / GOODMAN / AMANA (TSB) =====================
  {
    id: "daikin-tsb-ot-0011", brand: "Daikin", number: "TSB-OT-0011", docNo: "", rev: "", date: "2021-07-22", type: "Technical",
    title: "New inverter PCB kit numbers - DZ18VC, DX20VC, DZ20VC (shared data must be flashed)",
    applies: { modelRe: ["^DZ18VC0(24|36|48|60)1A", "^DX20VC0(24|36|48|60)1B", "^DZ20VC0(24|36|48)1B", "^DZ20VC0601[BC]"] },
    appliesText: "Daikin DZ18VC0241A / 0361A / 0481A / 0601A heat pumps; DX20VC0241B / 0361B / 0481B / 0601B air conditioners; DZ20VC0241B / 0361B / 0481B heat pumps; DZ20VC0601C (revision C and later) vs. DZ20VC0601B (revision B and earlier) use different kits.",
    summary: "Replacement inverter PCBs now ship unprogrammed: shared data must be flashed in the field with the BTSDL01-D Bluetooth shared data loader (no more shared-data chips). Kits still include gaskets and thermal paste. The 5-ton DZ20VC kit depends on the model revision.",
    steps: [
      "Bring the BTSDL01-D loader on any inverter PCB job; flash shared data per TSB-OT-0002.",
      "DZ18VC: 0241A 3P386786-1S-K, 0361A 3P386786-3S-K, 0481A and 0601A 3P386786-5S-K. DX20VC: 0241B 3P357336-4S-U, 0361B 3P357336-5S-U, 0481B 3P357343-4S-T, 0601B 2P361563-3S-M.",
      "DZ20VC: 0241B 3P357336-4S-U, 0361B and 0481B 3P357343-4S-T. DZ20VC0601: revision C and later 3P357343-5S-U; revision B and earlier 2P361563-3S-L - read the model revision letter first."
    ],
    priority: "normal", confidential: true,
    source: "Daikin TSB-OT-0011, New Inverter PCB Kit Numbers for DZ18VC / DX20VC / DZ20VC, Jul 2021 (distributor bulletin)"
  },
  {
    id: "daikin-tsb-c-gn-ot-0078", brand: "Daikin", number: "TSB C-GN-OT-0078", docNo: "", rev: "", date: "2025-07-16", type: "Technical",
    title: "Before replacing the furnace control board: EEE, EE5, EbL, EbU, IdL, 888, F02/F03",
    applies: { modelRe: ["^D[MC]9[26]", "^D[MC]80", "^[GD][MC]9[26]S", "^[GD][MC]80S", "^R9S9[26]", "^D9S9[26]"], codes: ["EEE", "EE5", "EbL", "EbU"] },
    appliesText: "Daikin / Goodman / Amana gas furnaces with the 3-digit 7-segment display integrated control (including the R-32 compliant R9S96 / D9S96 / R9S92 platform). The bulletin names codes, not models.",
    summary: "Most EEE / EE5 / EbL / EbU boards replaced under warranty were not bad. Check history, power, wiring and grounding first; several codes have one usual cause.",
    steps: [
      "EEE (internal fault / IRQ loss - a real hardware failure is very unlikely): read F10 (last 10 faults); power off at the breaker 3+ minutes; confirm 120 V L1, neutral and ground from the panel; look for overheated, damaged or loose wiring; ohm the limits; inspect the ignitor (37-68 ohms at room temperature).",
      "EE5 (open fuse): 24 V shorted or miswired, or the board back touching the mounting panel because the standoff plugs are missing. Trace low-voltage wiring, disconnect the thermostat wiring to split field wiring from thermostat, fix the short, replace standoffs, fit a 3 A automotive fuse, run heat and cool.",
      "EbL (blower current low after heat-on delay): the black 115 V motor wire is not on CIRC-H. EbU (blower current high during inducer pre-purge): blower power wiring reversed - black on CIRC-H, not the white neutral.",
      "IdL = idle, not an error (if the thermostat is calling, check the 24 V call reaches the board). 888 = segment test at power-up / after a reset, not an error. Display flipping F02/F03 in gas heat = power-stealing thermostat with no C wire.",
      "Grounding: a copper ground wire from the breaker panel to the furnace - not water lines, gas piping, conduit or BX strip; dedicated circuit; check the panel-to-ground-rod connection. Poor grounding causes assorted intermittent codes.",
      "R-32 furnaces: route the R-32 sensor wire clear of the blower, filter access, hot surfaces and sharp edges."
    ],
    priority: "normal",
    source: "Daikin TSB C-GN-OT-0078, Before Replacing the Furnace Control Board: Troubleshooting Error Codes, Jul 2025 (distributor bulletin)"
  },
  {
    id: "daikin-tsb-c-gn-ot-0076", brand: "Goodman", number: "TSB C-GN-OT-0076 / C-GN-OT-0077", docNo: "", rev: "", date: "2025-06", type: "Technical",
    title: "EAF error code - A2E (A2L function) setting on R-32 ready furnaces",
    applies: { modelRe: ["^R9S9[26]", "^D9S9[26]", "^GR9S9[26]", "^GD9S9[26]"], codes: ["EAF", "A2E", "A2u"] },
    appliesText: "Goodman GR9S96 / GD9S96 / GR9S92 (R9S96 / D9S96 / R9S92), Amana and Daikin badge equivalents - R-32 ready single-stage furnaces.",
    summary: "The R-32 function (A2E) is ON from the factory and must be set to 'no' when the furnace is paired with an R-410A outdoor unit or runs furnace-only; otherwise EAF. Never disable it with an R-32 outdoor unit.",
    steps: ["Press left/right until A2E shows, press center, select 'no', press center to confirm, then center again to lock in and exit. Replace the board only if EAF persists with A2E set correctly."],
    priority: "normal",
    source: "Daikin TSB C-GN-OT-0076 (re-issued as C-GN-OT-0077), Troubleshooting EAF Error Code, Jun 2025 (as cited in the app)"
  },
  {
    id: "daikin-tsb-c-gn-ot-0083", brand: "Daikin", number: "TSB C-GN-OT-0083", docNo: "", rev: "", date: "2025-08", type: "Technical",
    title: "R-32 refrigerant detection (RDS) board and sensor - LED flash troubleshooting",
    applies: { modelRe: ["^DC[345]S[QE][NA]", "^DH[45]S[QE]A", "^DH5SEA", "^CAPEA", "^CHPEA"], codes: ["2 flashes", "3 flashes", "4 flashes"] },
    appliesText: "Daikin R-32 single-stage systems (DC3SQN / DC3SEN / DC4SQA / DC4SEA / DC5SEA condensers, DH4SQA / DH4SEA / DH5SEA heat pumps) with R-32 air handlers, and the Dragonfly furnace-integration board with CAPEA / CHPEA cased coils.",
    summary: "Over 80% of RDS board and sensor warranty returns were No Fault Found. Slow flash, fast flash and steady-on all mean the board and sensor work; only 2 / 3 / 4 flashes that survive a re-seat and power cycle get parts.",
    steps: [
      "Slow flash (2 s on / 2 s off) = normal. Fast flash = R-32 really detected - find the leak. Steady on = 5-minute post-alarm delay; wait for the slow flash, then check performance, pressures and lines.",
      "2, 3 or 4 flashes: no thermostat call, wait 2 minutes for idle (blower cycling, relay clicks, LED flashing during the wait are normal), unplug and re-plug the R32 sensor, cycle power, wait 2 minutes. Slow flash or steady on = resolved.",
      "Still faulted: 2 flashes = replace the control board; 3 flashes = replace the SENSOR (board only if the sensor was already replaced); 4 flashes = replace the sensor."
    ],
    priority: "normal",
    source: "Daikin TSB C-GN-OT-0083, R32 Refrigerant Detection System (RDS) Control Board and Sensor Troubleshooting, Aug 2025 (as cited in the app)"
  },
  {
    id: "daikin-tsb-c-gn-sp-0023", brand: "Daikin", number: "TSB C-GN-SP-0023", docNo: "", rev: "2", date: "2024-11", type: "Technical",
    title: "DVFEC / AHVE air handler wiring harness corrosion - EEV and pressure-sensor codes",
    applies: { modelRe: ["^DVFEC", "^AHVE", "^DFVE", "^DMVE"], codes: ["70", "75"] },
    appliesText: "Daikin DVFEC (DFVE / DMVE EEV series) and Amana AHVE air handlers. Serial 2302 and later have improved connector grease; from serial 2406 the connection sits inside the control cabinet.",
    summary: "EEV error codes, indoor pressure-sensor codes or erratic EEV operation can be corrosion in the harness connectors rather than a bad EEV or board.",
    steps: ["Look for loose pins or corrosion. Minor: pack the connectors with dielectric grease. Severe: cut out the plugs and splice with 18-22 ga insulated butt splices and heat shrink as the TSB shows."],
    priority: "normal",
    source: "Daikin TSB C-GN-SP-0023 REV2, DVFEC and AHVE Air Handler Wiring Harness Corrosion, Nov 2024 (distributor bulletin; as cited in the app)"
  },
  {
    id: "daikin-tsb-c-sp-0043", brand: "Daikin", number: "TSB C-SP-0043", docNo: "", rev: "", date: "2024-03", type: "Technical",
    title: "FIT / Amana S-series / Goodman SD PCB software - nuisance E30 in brownouts",
    applies: { modelRe: ["^D[CHZ][679]VS", "^DH7VS"], codes: ["E30"] },
    appliesText: "Daikin FIT DC6VS / DZ6VS / DH6VS / DC9VS / DH9VS / DH7VS, Amana S-series and Goodman SD inverter outdoor units.",
    summary: "Daikin changed the under-voltage detection value in the PCB software to stop nuisance E30 during brownouts and power failures. An installed unit getting E30 needs the PCB changed - updated service PCBs carry part 2545136S (old 2545136).",
    steps: ["E30 that lines up with utility dips: replace the PCB with the 2545136S revision rather than chasing wiring."],
    priority: "normal",
    source: "Daikin TSB C-SP-0043, Daikin FIT, Amana Brand S-series, and Goodman SD PCB Software Improvement, Mar 2024 (as cited in the app)"
  },
  {
    id: "daikin-tsb-ot-0008", brand: "Daikin", number: "TSB-OT-0008", docNo: "", rev: "", date: "2021-02", type: "Technical",
    title: "19 Series 18k / 24k heat pumps - intermittent F3 in heating",
    applies: { modelRe: ["^RX(18|24)AXVJU", "^FTX(18|24)AXVJU"], codes: ["F3"] },
    appliesText: "Daikin 19 Series RX18AXVJU / FTX18AXVJU and RX24AXVJU / FTX24AXVJU. The 09 / 12 sizes and the RK / FTK models are not affected. Factory inventory shipped after 02/15/2021 has the updated software.",
    summary: "Intermittent F3 shuts the unit down in heating; cycling power clears it until next time. Permanent fix is a replacement outdoor PCB or re-flashed outdoor software.",
    steps: ["F3 that clears on a power cycle and returns: replace or re-flash the outdoor PCB rather than chasing sensors."],
    priority: "normal",
    source: "Daikin TSB-OT-0008, 19 Series (18,000 and 24,000 BTU Heat Pumps) - F3 Error Code, Feb 2021 (distributor bulletin; as cited in the app)"
  },
  {
    id: "daikin-tsb-ot-0014", brand: "Daikin", number: "TSB-OT-0014", docNo: "", rev: "", date: "2021-11", type: "Technical",
    title: "17 Series 18k heat pump - EEV oxidation, F3 / U0 not cooling",
    applies: { modelRe: ["^RXB18AXVJU"], codes: ["F3", "U0"] },
    appliesText: "Daikin 17 Series RXB18AXVJU. Units shipped from August 1, 2021 have the improved EEV (green dot on the bar-code label).",
    summary: "Moisture can oxidize the EEV: not cooling with F3 and U0.",
    steps: ["Check EEV coil resistance against spec; out of spec = replace the EEV (2539348). If IC12 or IC13 on the PCB is damaged, replace both the EEV and the PCB (4022326)."],
    priority: "normal",
    source: "Daikin TSB-OT-0014, Ductless 17 Series, 18,000 BTU Heat Pump - Potential EEV Malfunction, Nov 2021 (distributor bulletin; as cited in the app)"
  },
  {
    id: "daikin-tsb-d-vr-0047", brand: "Daikin", number: "TSB D-VR-0047", docNo: "", rev: "", date: "2024-04", type: "Technical",
    title: "FXTQ / FTQ multi-position air handler intermittent A6-20 manual-reset error",
    applies: { modelRe: ["^FTQ\\d{2}TAVJU", "^FXTQ\\d{2}TAVJU"], codes: ["A6-20"] },
    appliesText: "Daikin SkyAir FTQ**TAVJUA / FTQ**TAVJUD (e.g. FTQ36TAVJUD) and VRV FXTQ**TAVJUA / FXTQ**TAVJUD (e.g. FXTQ30TAVJUA); older FTQ**PAVJU / PBVJU are not named.",
    summary: "With all service-manual checks normal, an intermittent manual-reset A6-20 can be resolved by changing the fan setting at thermo-off; a PCB is only needed where continuous fan is required on a 1:1 system.",
    steps: ["Set Fan = OFF at Thermo = OFF (indoor field settings 12(22)-3 and 12(22)-6 set to 3) with a Navigation, MADOKA or Daikin ONE+ controller, or Fan = Auto on a third-party thermostat via DKN Plus on fallback logic. Continuous fan required on 1:1: replace the indoor PCB (FTQ 2P561243-3S-A, FXTQ 2P561243-1S-A, plus a capacity adapter)."],
    priority: "normal",
    source: "Daikin TSB D-VR-0047, VRV and SkyAir FXTQ/FTQ Multi-Position Air Handler Intermittent A6-20 Manual Reset Error, Apr 2024 (as cited in the app)"
  },
  {
    id: "daikin-tsb-d-gn-ms-0086", brand: "Daikin", number: "TSB D-GN-MS-0086", docNo: "", rev: "", date: "2025-09", type: "Technical",
    title: "Daikin ONE thermostats not compatible with certain ductless wall-mounts",
    applies: { modelRe: [] },
    appliesText: "Certain Daikin ductless wall-mount indoor units paired with a Daikin ONE thermostat through the KRP067A41E adapter (bulletin lists the units; the app's code table attaches it to the shared ductless LED-flash row).",
    summary: "If the indoor unit stops responding to the thermostat or its LED flashes with no error code, the Daikin ONE is the problem.",
    steps: ["Replace the Daikin ONE with a BRC073A6 or other compatible thermostat, keep the KRP067A41E adapter, and change the cable to BRCW901A03 (10 ft), BRCW901A08 (26 ft), DACA-BRCW901P10 or DACA-BRCW901P25 (plenum). If the thermostat communicates normally, no action."],
    priority: "info",
    source: "Daikin TSB D-GN-MS-0086 (update to D-GN-MS-0084), Incompatibility of Daikin ONE Thermostats with Certain Ductless Wall-Mount Units, Sep 2025 (as cited in the app)"
  },
  {
    id: "daikin-tsb-c-gn-fn-0053", brand: "Daikin", number: "TSB C-GN-FN-0053", docNo: "", rev: "", date: "2024-05-15", type: "Technical",
    title: "80% furnace high-altitude thresholds and kits",
    applies: { modelRe: ["^D[MC]80[SV][SENC]", "^D[MD]80H[SE]"] },
    appliesText: "Daikin 80% gas furnaces (DM80SS / DM80SE / DM80SN / DM80VC / DM80VE / DM80HS / DD80HS / DM80HE single- and two-stage families per the app's maintenance figures).",
    summary: "Newer than the install manuals: single-stage 80% furnaces count as high altitude at 4,500 ft or higher (kit HANG20 with a -0.60 in w.c. pressure switch); two-stage 80% units are high altitude from 2,000 to 7,800 ft (kit HA-04 with -0.35 / -0.55 switches or HA-05 with -0.35 / -0.50, both with #56 LP orifices) and are not recommended above 7,800 ft.",
    steps: ["When the install manual and this TSB disagree on the altitude threshold, the TSB is the newer document - confirm which one the job is held to."],
    priority: "info",
    source: "Daikin TSB C-GN-FN-0053, May 15, 2024 (as cited in the app's maintenance figures)"
  },
  {
    id: "goodman-sr-068", brand: "Goodman", number: "SR-068", docNo: "", rev: "1", date: "2020-10", type: "Service",
    title: "Inverter heat pumps - idle hum is the compressor sump heat; crankcase heater kit",
    applies: { modelRe: ["^AVZC(18|20)", "^GVZC20", "^GVXC20"] },
    appliesText: "Goodman GVZC20 / GVXC20 and Amana AVZC18 / AVZC20 inverter outdoor units (shared platform).",
    summary: "A high-pitched hum from the outdoor unit at standby is the inverter keeping the compressor oil warm with winding current - not a defect. An external crankcase heater retrofit kit exists if the homeowner objects.",
    steps: ["Kit INVCCHK01 (requires the BTSDL01 Bluetooth loader) if the hum is a complaint; otherwise no action."],
    priority: "info",
    source: "Goodman Service Bulletin SR-068 Rev.1, Crank Case Heater Kit for Inverter Split Systems, Oct 2020 (as cited in the app)"
  },

  // ===================== LENNOX (S&A Notes) =====================
  { id: "lennox-sa-100009", brand: "Lennox", number: "S&A Note 100009", docNo: "", rev: "", date: "2020-06-09", type: "Technical",
    title: "Shielded cable for communicating-system wiring (105 / 120 comm faults)",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^SL297", "^CBX32MV", "^CBX40UHV", "^CBA38MV"], codes: ["105", "120", "E105"] },
    appliesText: "Lennox residential communicating systems (iComfort furnaces, air handlers, outdoor units).",
    summary: "Induced voltage on plain 18 AWG 4-conductor thermostat cable causes intermittent or constant communication faults and good controls getting returned.",
    steps: ["Use 18-22 ga one-pair shielded cable with ground for i+/i- and A/B, ground wire on the indoor unit C terminal; standard 18/2 for R-C and the +/- power leads."],
    priority: "normal", source: "Lennox S&A Note 100009, Recommendation for Use of Shielded Cable for Communication Wiring in Residential Communicating Systems, Jun 2020 (as cited in the app)" },
  { id: "lennox-sa-acc-17-01", brand: "Lennox", number: "S&A Note ACC-17-01", docNo: "", rev: "", date: "2018-08-01", type: "Technical",
    title: "iComfort electrical troubleshooting - i+/i- DC voltages, bouncing transformer volts",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^CBX32MV", "^CBX40UHV", "^CBA38MV", "^17A30"], codes: ["105", "120"] },
    appliesText: "Lennox iComfort systems (S30 / Wi-Fi thermostats, furnaces, air handlers, iHarmony).",
    summary: "History of 105 / 120, dashes on in-zone sensors or a missing unit: measure DC from C to i+ and i- and compare with the note's tables; read transformer voltage to three decimals - tenths that bounce are almost always a float switch breaking R.",
    steps: ["Examples: air handler control 2.84 VDC naked, 2.615 loaded, 1.7 landed; Smart Hub i+ 3.5 / i- 1.5 VDC naked, 2.5 landed; damper control C to PWR 12.43 VDC. Thousandths may bounce, hundredths slightly, tenths never."],
    priority: "normal", source: "Lennox S&A Note ACC-17-01, iComfort Systems Electrical Troubleshooting, Aug 2018 (as cited in the app)" },
  { id: "lennox-sa-acc-15-01", brand: "Lennox", number: "S&A Note ACC-15-01", docNo: "", rev: "", date: "2015-08-28", type: "Technical",
    title: "iHarmony zoning wiring change - alert code 120",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^CBX32MV", "^CBX40UHV", "^CBA38MV", "^CBK4[78]MVT"], codes: ["120", "E120"] },
    appliesText: "Lennox iComfort systems with iHarmony zoning.",
    summary: "Lennox reproduced 120 with the original iHarmony wiring. Wire the thermostat / Smart Hub directly to the indoor unit and the damper control module (Indoor terminals) directly to the indoor unit - nothing from the damper control to the thermostat.",
    steps: ["Pigtail at the indoor unit if two wires will not fit a terminal."],
    priority: "normal", source: "Lennox S&A Note ACC-15-01, iHarmony Zoning System Wiring Change (Alert Code 120), May 2015 rev Aug 2015 (as cited in the app)" },
  { id: "lennox-sa-100201", brand: "Lennox", number: "S&A Note 100201", docNo: "", rev: "", date: "2025-04", type: "Technical",
    title: "Auxiliary transformer 27J32 (75 VA) with RDS plus accessories - code 115",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^ML19[37]UHEK", "^ML297UHV", "^EL1[89][056]UHN?EK", "^ML1[89][036]"], codes: ["115", "E115"] },
    appliesText: "All Lennox gas furnaces - with an RDS kit (27A02 / 27A03) or a K-series furnace's integrated RDS plus zoning, dual fuel or any other 24 V accessory.",
    summary: "The factory 40 VA transformer handles the furnace plus RDS alone; add zoning, dual fuel or other 24 V accessories and Lennox recommends auxiliary transformer kit 27J32 (75 VA) so it is not overloaded.",
    steps: ["115 (low voltage / transformer) on a furnace with RDS and accessories: fit 27J32 before condemning the transformer."],
    priority: "normal", source: "Lennox S&A Note 100201, Auxiliary Transformer 27J32 Used On All Gas Furnaces, Apr 2025 (as cited in the app)" },
  { id: "lennox-sa-h-17-02", brand: "Lennox", number: "S&A Note H-17-02", docNo: "", rev: "", date: "2020-10-23", type: "Technical",
    title: "E201 / E292 with communicating variable-speed motors",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^CBX32MV", "^CBX40UHV", "^CBA38MV"], codes: ["201", "292", "E201"] },
    appliesText: "Lennox communicating furnaces and air handlers with Regal Beloit / Nidec motors or the Lennox Blower Drive.",
    summary: "Check the motor module pins are fully extended (pushed back = replace the module, do not repair) and harness pins engaged; grease connectors per C-16-05 or use pre-greased harness 15T91 (furnace) / 15T89 (air handler). Board updates: SL280V / EL296V 15T94 (software 2.09+), SLP98V 19J95.",
    steps: ["Lennox Blower Drive: green LED 1 short flash = normal; ohm the motor before choosing motor vs drive - each lead to ground over 100k ohms, lead-to-lead within 10%; red LED on = capacitor still charged. Air handlers from serial 1617A07245 have a factory-greased harness."],
    priority: "normal", source: "Lennox S&A Note H-17-02, E201 and E292 Codes with Communicating Variable Speed Motors, re-issued Oct 2020 (as cited in the app)" },
  { id: "lennox-sa-c-16-05", brand: "Lennox", number: "S&A Note C-16-05", docNo: "", rev: "", date: "2016-08-18", type: "Technical",
    title: "Lubricate ECM 3.0 motor connectors - fretting corrosion causes 201",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^EL280", "^SL280", "^CBX32MV", "^CBX40UHV", "^CBA38MV", "^CBK4[78]MVT"], codes: ["E201", "201"] },
    appliesText: "Lennox communicating furnaces and air handlers with ECM 3.0 motors (4-pin communication connector).",
    summary: "Fretting corrosion on tin-lead contacts causes 201 loss-of-communication; re-plugging only clears it for a while.",
    steps: ["De-mate / re-mate / de-mate each connector, fill only the female (harness-side) terminals of the communication and high-voltage plugs with approved dielectric grease (Super Lube 91003, Dow Corning 4 or NyoGel 760G - Lennox 29K01), wipe the excess, reconnect. Nothing goes into the female contacts."],
    priority: "normal", source: "Lennox S&A Note C-16-05, Lubrication of ECM Motor Connectors, Aug 2016 (as cited in the app)" },
  { id: "lennox-sa-100228", brand: "Lennox", number: "S&A Note 100228", docNo: "", rev: "", date: "2026-04", type: "Technical",
    title: "90% pressure switch nuisance trips and the cold end header box",
    applies: { modelRe: ["^SLP9[89]", "^EL29[67]", "^ML19[37]UHEK", "^ML297UHV", "^EL19[56]UHN?EK", "^ML19[36]"], codes: ["223", "227", "E223"] },
    appliesText: "Lennox 90%+ gas furnaces (SLP99UHV and the R-454B K-series ML197UHEK / ML297UHV / EL195UHNEK / EL196UHEK families per the app's code tables).",
    summary: "Nuisance trips in heat - worse near maximum vent length or at altitude - can be a switch that closes but opens early, or molding flash blocking the CEHB flue channel. Never clear the flash yourself.",
    steps: ["Check intake, exhaust and trap for restriction, then a digital manometer across the switch: below set point, or above it with the switch not closing = replace the CEHB and pressure switch together. Altering the hole even slightly can push CO to unacceptable levels."],
    priority: "normal", source: "Lennox S&A Note 100228, 90% Pressure Switch and Cold End Header Box, Apr 2026 (as cited in the app)" },
  { id: "lennox-sa-h-13-04", brand: "Lennox", number: "S&A Note H-13-04", docNo: "", rev: "", date: "2013-09-23", type: "Technical",
    title: "SLP98 repeated pressure-switch faults - checks and repair parts",
    applies: { modelRe: ["^SLP98"], codes: ["E223", "E224", "E225"] },
    appliesText: "Lennox SLP98UH / SLP98DF.",
    summary: "Measure what the switch sees with a 2-port manometer and replace it only if it does not close at the right pressure; low operating pressure points at vent or drain. Verify the install before parts; if faults continue, replace the CEHB with the switch.",
    steps: ["Install checks: vent sized and sloped to the furnace, accelerator as required, Lennox trap with riser, drain sloped away, level and grounded, 102-132 VAC, 18-30 VAC transformer, accessories on an isolation relay, drain not touching the pump bottom. Parts: switch 93W76 (high altitude 93W75); CEHB 95W85 (070), 95W86 (090), 95W87 (110), 95W88 (135, UH only)."],
    priority: "normal", source: "Lennox S&A Note H-13-04, SLP98 Pressure Switch Repeated Faults and Associated Repair Parts, Sep 2013 (as cited in the app)" },
  { id: "lennox-sa-h-14-01", brand: "Lennox", number: "S&A Note H-14-01", docNo: "", rev: "", date: "2014-02-19", type: "Technical",
    title: "Abnormal pressure-switch fault rates on 33-inch condensing furnaces (2010-2012)",
    applies: { modelRe: ["^ML19[35]UH", "^ML19[35]DF", "^EL195UH", "^EL195DF", "^SLP98"], builtFrom: "2010-07", builtTo: "2012-09", codes: ["9 flashes", "10 flashes"] },
    appliesText: "Lennox ML193UH/DF, ML195UH/DF, EL195UH/DF and SLP98UH/DF 33-inch condensing furnaces built 07/2010-09/2012 (serial ranges by model in the note).",
    summary: "Install variation, the cold end header box and mainly the gold-contact switches used from June 2011 (Lennox went back to silver) interacted - a switch alone may not stop repeats. The Sep 2012 CEHB redesign brought failures back in line.",
    steps: ["Work through H-13-04 (SLP98) and H-13-07 rather than swapping the switch again."],
    priority: "info", source: "Lennox S&A Note H-14-01, Abnormal Pressure Switch Fault Codes with Lennox 33\" Condensing Furnaces, Feb 2014 (as cited in the app)" },
  { id: "lennox-sa-h-10-5", brand: "Lennox", number: "S&A Note H-10-5 / H-10-8", docNo: "", rev: "", date: "2010-12-06", type: "Technical",
    title: "SLP98 upflow condensate drain - leveling and left-hand drain trips",
    applies: { modelRe: ["^SLP98UH"], codes: ["E223", "E227", "E271"] },
    appliesText: "Lennox SLP98UH / SLP98UHV upflow. Units with the new cold end header box (after Oct 1, 2010) no longer need the side tilt.",
    summary: "Left-hand-drain upflows tripped the pressure switch at high fire because condensate was not draining.",
    steps: ["Tilt back-to-front no more than 1/2 in; original CEHB: level side to side then slope slightly (max 3/16 in) toward the drain side; new CEHB: level side to side, level to 1/2 in toward the front. PVC from CEHB to trap; never run the AC condensate into the furnace trap (it will not run); check the trap for a stray wire nut."],
    priority: "info", source: "Lennox S&A Note H-10-5 (Corp. 1039-L10) and H-10-8 (Corp. 1045-L11), SLP98 drain, Oct / Dec 2010 (as cited in the app)" },
  { id: "lennox-sa-100065", brand: "Lennox", number: "S&A Note 100065", docNo: "", rev: "", date: "2022-12", type: "Technical",
    title: "SL280DFV / EL280DFE exhaust channel - excess sealant blocks start-up",
    applies: { modelRe: ["^SL280DFV", "^EL280DFE"], serialFrom: "5922K07334", serialTo: "5922M06539", codes: ["E223", "E271"] },
    appliesText: "Lennox SL280DFV and EL280DFE serial 5922K07334 through 5922M06539.",
    summary: "Pressure-switch fault at start-up and will not start: excess factory sealant at the internal flue pipe-to-inducer joint.",
    steps: ["Remove the inducer, clear the sealant from the channel, run a new bead of high-temperature silicone around the edge, reinstall."],
    priority: "high", source: "Lennox S&A Note 100065, SL280DFV and EL280DFE Exhaust Channel, Dec 2022 (as cited in the app)" },
  { id: "lennox-sa-h-14-04", brand: "Lennox", number: "S&A Note H-14-04", docNo: "", rev: "", date: "2014-05-23", type: "Technical",
    title: "SLP98UHV / EL296UHV with a control programmed to the wrong size (three bars)",
    applies: { modelRe: ["^SLP98UHV", "^EL296UHV"], serialFrom: "5914B13342", serialTo: "5914D17455" },
    appliesText: "Lennox SLP98UHV and EL296UHV serial 5914B13342 through 5914D17455.",
    summary: "Some controls carry the wrong model / serial. Three horizontal bars at power-up means the board does not recognize the unit size code.",
    steps: ["Non-communicating: compare the power-up unit size code with the chart in the note and reprogram. Communicating: if the thermostat's model/serial does not match the nameplate, fit control 10G43 (SLP98) or 83W88 (EL296), program with i+ and i- disconnected, reconnect, answer No to Copy Settings."],
    priority: "info", source: "Lennox S&A Note H-14-04, SLP98UHV & EL296UHV With Possible Incorrect Unit Size Codes, May 2014 (as cited in the app)" },
  { id: "lennox-sa-h-14-06", brand: "Lennox", number: "S&A Note H-14-06", docNo: "", rev: "", date: "2014-08-27", type: "Technical",
    title: "Flame rectification in all gas furnaces - how to read and clean",
    applies: { modelRe: ["^G[456][01]", "^G51MP", "^G61MP", "^ML1[89][035]", "^EL1[89][056]", "^SLP9[89]", "^EL29[67]", "^SL280"], codes: ["240"] },
    appliesText: "All Lennox gas furnaces.",
    summary: "On controls with a seven-segment display read flame current in Field Test Mode - Flame Sense, do not meter it (control failure could occur); other controls: microamp meter or transducer 78H5401.",
    steps: ["Confirm the factory ground from control box to burner, a dedicated ground and correct polarity. Clean the sensor with very fine steel wool and the burner with a wire brush - never sandpaper. Chlorine, silicone and similar chemicals in the combustion air coat the sensor."],
    priority: "info", source: "Lennox S&A Note H-14-06, Flame Rectification In All Gas Furnaces, Aug 2014 (as cited in the app)" },
  { id: "lennox-sa-100052", brand: "Lennox", number: "S&A Note 100052", docNo: "", rev: "", date: "2024-01", type: "Technical",
    title: "Error 150 A2L on SL280 / EL280 / EL296 / EL297 in communicating mode",
    applies: { modelRe: ["^SL280", "^EL280", "^EL29[67]"], codes: ["E150", "150"] },
    appliesText: "Lennox SL280, EL280, EL296 and EL297 with an RDS / A2L input.",
    summary: "Normal with Refrigerant Leak Monitor Input disabled at the thermostat; enabled, de-energizing the A2L terminal starts the alarm and runs the blower on high until 5 minutes after A2L is re-energized. Board software was being updated to tolerate thermostats that delay G after Y.",
    steps: ["Check the thermostat's leak-monitor setting and board software before replacing the sensor or board."],
    priority: "info", source: "Lennox S&A Note 100052, Error Code 150 A2L on SL280, EL280, EL296 and EL297 Model, Aug 2022 re-issued Jan 2024 (as cited in the app)" },
  { id: "lennox-sa-100225", brand: "Lennox", number: "S&A Note 100225", docNo: "", rev: "", date: "2026-02", type: "Technical",
    title: "Twinning RDS-enabled (K-series) gas furnaces - code 106",
    applies: { modelRe: ["^ML19[37]UHEK", "^EL1[89][056]UHN?EK", "^ML1[89][06]UHEK"], codes: ["E106"] },
    appliesText: "Lennox K-series RDS-enabled single-stage constant-torque furnaces.",
    summary: "Twinning is approved only through the twinning terminals on the integrated control of single-stage constant-torque K furnaces - same model and size, both with a refrigerant detection sensor. No two-stage or modulating furnace may be twinned.",
    steps: ["106 on a twinned pair: confirm both are identical K-series single-stage units with RDS before troubleshooting the twinning link."],
    priority: "info", source: "Lennox S&A Note 100225, Twinning of New RDS Enabled Gas Furnaces, Feb 2026 (as cited in the app)" },
  { id: "lennox-sa-acc-14-01", brand: "Lennox", number: "S&A Note ACC-14-01", docNo: "", rev: "", date: "2015-03-25", type: "Technical",
    title: "iHarmony with SLP98 - insufficient zone heat and nuisance 250",
    applies: { modelRe: ["^SLP98"], codes: ["E250", "250"] },
    appliesText: "Lennox SLP98 with iHarmony zoning.",
    summary: "An erroneous 250 limit trip can lock out the furnace (heat stops, dampers open, blower cools). Installer settings drive it.",
    steps: ["iComfort installer setup (Equipment > System Devices > System): Zoning Target Supply Temp above its 110 F default gives more heat but too high causes 250; also Zoning Supply Air Temp Limit 140 to 160 F, Anticipated DAT Adjustment 60 to 0 s, Gas Heating DAT Cooldown Target 100 to 80 F (or as low as possible without cold air), more zone CFM, DATS further downstream and check its ohms / temperature."],
    priority: "info", source: "Lennox S&A Note ACC-14-01, iHarmony and SLP98 - Insufficient Zone Heating and Alarm Code 250 Issues, Jan 2014 rev Mar 2015 (as cited in the app)" },
  { id: "lennox-sa-c-12-12", brand: "Lennox", number: "S&A Note C-12-12", docNo: "", rev: "", date: "2012-12-19", type: "Technical",
    title: "iComfort Wi-Fi nuisance E224 e-mail notifications",
    applies: { modelRe: ["^SLP98", "^EL29[67]", "^EL280", "^SL280"], codes: ["E224"] },
    appliesText: "Lennox communicating furnaces on iComfort Wi-Fi thermostats.",
    summary: "E224 e-mails to dealer and homeowner were turned off; thermostat software 2.1 added a call-for-heat delay, auto-downloaded to registered thermostats with auto update on.",
    steps: ["A history of E224 notifications alone is not a service call - check the thermostat is on 2.1 or later."],
    priority: "info", source: "Lennox S&A Note C-12-12 (Corp. 1257-L12), iComfort Wi-Fi Thermostat Alarm Code E224 Email Notifications, Dec 2012 (as cited in the app)" },
  { id: "lennox-sa-c-11-05", brand: "Lennox", number: "S&A Note C-11-05", docNo: "", rev: "", date: "2011-04-25", type: "Technical",
    title: "iComfort furnace / air handler controls with Harmony III zoning",
    applies: { modelRe: ["^SLP98", "^EL29[67]", "^EL280", "^SL280", "^CBX32MV", "^CBX40UHV"] },
    appliesText: "Lennox iComfort-enabled integrated furnace and air handler controls used with Harmony III zoning.",
    summary: "With Harmony III, Y1 / Y2 / O are not connected at the furnace control, so compressor status codes (C with stage, H0) do not display while the compressor runs - not a fault. C on the indoor unit must also go to C on the Harmony III transformer or the blower never sees the DS signal and stays at minimum 250-500 CFM.",
    steps: ["Blower stuck at minimum with Harmony III: check the C-to-C connection."],
    priority: "info", source: "Lennox S&A Note C-11-05 (Corp. 1111-L2), Proper Configuration of iComfort enabled Integrated Furnace and Air Handler Controls when used with Harmony III Zoning System, Apr 2011 (as cited in the app)" },
  { id: "lennox-sa-hp-10-3", brand: "Lennox", number: "S&A Note HP-10-3", docNo: "", rev: "", date: "2010-12-15", type: "Technical",
    title: "False 346 - air handler R-O link for heat pump operation",
    applies: { modelRe: ["^CBX32MV", "^CBX40UHV", "^CBA38MV"], codes: ["346"] },
    appliesText: "Lennox iComfort-enabled air handler controls (CBA / CBX) with a non-communicating heat pump.",
    summary: "With the R-O link already cut, if the thermostat satisfies during defrost and the demand defrost control keeps O on with W off, heat pump operation stays locked out until 24 VAC to the AHC is cycled and the electric heat carries the load.",
    steps: ["Fix: 24 VAC isolation relay (69J79 / 69J7901) in the O circuit between AHC and defrost control, or an AHC with firmware 2.5 or higher (serial 1025 or later, or a Revision 2.5 sticker; replacement 65W70 / 605341)."],
    priority: "normal", source: "Lennox S&A Note HP-10-3 (Corp. 1027-L5), False Error 346 iComfort Enabled Air Handler Control R-O Link, May 2010 rev Dec 2010 (as cited in the app)" },
  { id: "lennox-sa-c-11-04", brand: "Lennox", number: "S&A Note C-11-04", docNo: "", rev: "", date: "2012-03-01", type: "Technical",
    title: "Nuisance 353 / 354 - third and fourth stage electric heat",
    applies: { modelRe: ["^CBX40UV", "^CBX32MV"], codes: ["353", "354"] },
    appliesText: "Lennox CBX40UV and CBX32MV with an iComfort-enabled control and ECB40 12.5 kW or larger heat.",
    summary: "Stages 3 and 4 actually ran; the control saw too little current from the 22 VDC heat relays. Controls 102305-02 date code 1209 or later have corrected firmware.",
    steps: ["Older control: add a second 22 VDC relay (49W91 / 102297-01) in parallel with the stage 3 or stage 4 relay."],
    priority: "info", source: "Lennox S&A Note C-11-04 (Corp. 1108-L1), iComfort Alert Codes 353 and 354, Feb 2011 rev Mar 2012 (as cited in the app)" },
  { id: "lennox-sa-acc-12-10", brand: "Lennox", number: "S&A Note ACC-12-10", docNo: "", rev: "", date: "2012-09-11", type: "Technical",
    title: "Nuisance 405 / 406 / 407 LSOM lockouts on early iComfort XC/XP17 and 21",
    applies: { modelRe: ["^XC17", "^XP17", "^XC21", "^XP21"], codes: ["405", "406", "407"] },
    appliesText: "Early iComfort XC17 (-1, -2, -3), XP17 (-4 to -7), XC21 (-2, -3) and XP21 (-4) with unitary controls 101796 / 101797 / 101798 / 101799.",
    summary: "The control's current-sensing relay does not sense compressor current. Field fix: loop the compressor wire through the relay a second time. Permanent: unitary control 103369-XX (no current-sensing relay; universal repair part, kit 96W55).",
    steps: ["Loop the compressor lead twice through the current-sensing relay, or fit 103369-XX."],
    priority: "normal", source: "Lennox S&A Note ACC-12-10 (Corp1240-L9), XC/XP17 & XC/XP21 LSOM Error Codes 405, 406 & 407, Sep 2012 (as cited in the app)" },
  { id: "lennox-sa-c-14-08", brand: "Lennox", number: "S&A Note C-14-08", docNo: "", rev: "", date: "2015-01-05", type: "Technical",
    title: "Sensor harness plugged in upside down - 414 / 415, no defrost, fan speed",
    applies: { modelRe: ["^XC17", "^XP17", "^XC21", "^XP21", "^XC25", "^XP25"], codes: ["414", "415"] },
    appliesText: "Lennox XC17 / XP17 and XC21 / XP21 (outdoor control 103369-xx), XC25 / XP25 (103686-xx).",
    summary: "A harness plugged in upside down swaps the sensor inputs: on 17/21 a cold coil sensor on the discharge input can set 415 just above 40 F while real 414/415 protection is lost, a reading stuck at 77 F is the 10K resistor (no defrost on the coil circuit); on the 25 no code but the fan may not run at design speed.",
    steps: ["Unplug the harness, rotate 180 degrees, plug back in with the tabs up."],
    priority: "normal", source: "Lennox S&A Note C-14-08, Sensor Harness Incorrectly Plugged into Outdoor Control, Nov 2014 rev Jan 2015 (as cited in the app)" },
  { id: "lennox-sa-c-14-02", brand: "Lennox", number: "S&A Note C-14-02", docNo: "", rev: "", date: "2014-06-05", type: "Technical",
    title: "Random alarm 431 on XP25 / XC25",
    applies: { modelRe: ["^XP25", "^XC25"], codes: ["431"] },
    appliesText: "Lennox XP25 / XC25 with outdoor control 103686-01 (98W64), software 1.2 or 1.6.",
    summary: "On XP25, 431 can be a nuisance trip when the reversing valve drops out immediately at the end of defrost - control 103686-03 (11F46) adds a 4-second delay. Rapidly cycling 24 VAC to the contactor coil or 240 VAC to the unit also sets 431.",
    steps: ["Wait 2-5 seconds before reapplying power; XP25 nuisance 431 after defrost = update to 103686-03."],
    priority: "normal", source: "Lennox S&A Note C-14-02, Outdoor Control Random Alarm Code 431, Jun 2014 (as cited in the app)" },
  { id: "lennox-sa-acc-13-03", brand: "Lennox", number: "S&A Note ACC-13-03", docNo: "", rev: "", date: "2013-06-26", type: "Technical",
    title: "434 during iComfort Wi-Fi setup with XC25 / XP25; thermostat software requirement",
    applies: { modelRe: ["^XC25", "^XP25"], codes: ["434"] },
    appliesText: "Lennox XC25 / XP25 or iHarmony with an iComfort Wi-Fi thermostat.",
    summary: "If outdoor main power is off while the comm wires feed 24 VAC to the outdoor control during thermostat activation, 434 sets; finish configuration, power the outdoor unit, and after 2 minutes the inverter contactor energizes and the code clears. Thermostat needs software 02.10.xxxx or later (10F81 ships with it; 88W58 must be updated).",
    steps: ["434 at commissioning: power up the outdoor unit, wait 2 minutes; check thermostat software."],
    priority: "info", source: "Lennox S&A Note ACC-13-03, iComfort Wi-Fi Room Thermostat Software Requirements with XC25, XP25, or iHarmony Zoning, May 2013 rev Jun 2013 (as cited in the app)" },
  { id: "lennox-sa-c-13-06", brand: "Lennox", number: "S&A Note C-13-06", docNo: "", rev: "", date: "2015-08-03", type: "Technical",
    title: "Utility load shedding shows as Lost Communication 31 (early XC/XP17 and 21)",
    applies: { modelRe: ["^XC17", "^XP17", "^XC21", "^XP21", "^XP17N", "^XP21N"], codes: ["31", "E600"] },
    appliesText: "Early XC17, XP17, XC21, XP21, XP17N / XP21N with outdoor controls 101796-xx to 101799-xx or 103369-01 / -02 on iComfort. Later controls (103369-03 / -04, 103686-xx) report E600 instead.",
    summary: "The preferred load-shed wiring opens the iComfort R wire between indoor and outdoor, so a shed event shows as code 31 and clears when the utility closes the circuit.",
    steps: ["Look for a utility load-control receiver before chasing wiring for 31."],
    priority: "info", source: "Lennox S&A Note C-13-06, Load Shedding for Outdoor Units with iComfort Control, Jun 2013 rev Aug 2015 (as cited in the app)" },
  { id: "lennox-sa-c-15-08", brand: "Lennox", number: "S&A Note C-15-08", docNo: "", rev: "", date: "2016-04-14", type: "Technical",
    title: "E600 standby / load shedding is not a fault",
    applies: { modelRe: ["^XC17", "^XP17", "^XP17N", "^SL18X[CP]", "^XC21", "^XP21", "^XP21N", "^XC20", "^XP20", "^XC25", "^XP25", "^SL25XPV", "^EL18XCV"], codes: ["600", "E600"] },
    appliesText: "Lennox XC17 / XP17, XP17N, SL18XC / SL18XP, XC21 / XP21, XP21N (outdoor control 103369-03 and later) and XC20 / XP20, XC25 / XP25 (103686-xx; also the SL25XPV / EL18XCV alert-code row in the app) with an iComfort thermostat.",
    summary: "24 VAC on L cycles the outdoor unit off and E600 clears when L is de-energized. Preferred wiring: the load-control receiver's NC contacts drive a field relay (69J79) feeding R to L, or use Standby / Load Shedding Relay Kit 10M34.",
    steps: ["E600: find the L-terminal source before diagnosing."],
    priority: "info", source: "Lennox S&A Note C-15-08, Standby Mode for Outdoor Units with iComfort Control, Apr 2016 (as cited in the app)" },
  { id: "lennox-sa-iaq-10-1", brand: "Lennox", number: "S&A Note IAQ-10-1", docNo: "", rev: "", date: "2013-04-09", type: "Technical",
    title: "iComfort alert 35 - look at the other units first",
    applies: { modelRe: ["^SLP98", "^EL29[67]", "^CBX32MV", "^CBX40UHV", "^XC17", "^XP17", "^XC21", "^XP21"], codes: ["35"] },
    appliesText: "Lennox iComfort communicating systems.",
    summary: "A unit disabled by its own fault sets 35 - clear that fault first. Intermittent 35 from contactor-coil noise: the transient voltage suppressor was the short-term fix; long-term protection was built into the boards.",
    steps: ["Check every other iComfort device for an active fault or lockout before chasing noise."],
    priority: "info", source: "Lennox S&A Note IAQ-10-1 (Corp. 1047-L11), iComfort Alert Code 35, Dec 2010 rev Apr 2013 (as cited in the app)" },
  { id: "lennox-sa-acc-12-11", brand: "Lennox", number: "S&A Note ACC-12-11", docNo: "", rev: "", date: "2015-05-26", type: "Technical",
    title: "Mini-split E6 from a field condensate pump overflow switch",
    applies: { modelRe: ["^MS[78]"], codes: ["E6"] },
    appliesText: "Lennox MS7 / MS8 single-zone and MS8 multi-zone with a field condensate pump.",
    summary: "The pump's overflow switch is wired so its NC contact opens the indoor-outdoor communication line: when it trips the unit shows E6 and stays off until the switch resets.",
    steps: ["On E6, check the condensate pump and drain for obstruction before chasing wiring or boards - a label under the front cover should say an overflow shut-off device is installed."],
    priority: "normal", source: "Lennox S&A Note ACC-12-11 (Corp. 1254-L12), Field Condensate Pump Wiring for Mini-Split Systems, Dec 2012 rev May 2015 (as cited in the app)" },
  { id: "lennox-sa-acc-13-01", brand: "Lennox", number: "S&A Note ACC-13-01", docNo: "", rev: "", date: "2013-01-21", type: "Technical",
    title: "Defrost control 100269-XX field TEST mode",
    applies: { modelRe: ["^13HPP", "^13CHP", "^15CHPX", "^LRP1[3456]", "^4SHP", "^2SH13"], codes: ["DS1 and DS2 alternating SLOW flash"] },
    appliesText: "Lennox / Allied heat pumps with time/temperature defrost control 100269-XX (-01 to -05).",
    summary: "With 24 VAC on the control, moving the jumper from the timing pins to TEST for two seconds clears a timed or pressure-switch lockout and forces defrost (low pressure input ignored in TEST). TEST is locked out if the jumper was on TEST before power-up or a jumper is on the 30 or 60 minute pins.",
    steps: ["Put the jumper back on the desired timing pins afterward."],
    priority: "info", source: "Lennox S&A Note ACC-13-01 (Corp. 1305-L1), Time / Temperature Defrost Control 100269-XX Field Test Mode, Jan 2013 (as cited in the app)" },
  { id: "lennox-sa-hp-07-01", brand: "Lennox", number: "S&A Note HP-07-01", docNo: "", rev: "", date: "2011-01-24", type: "Technical",
    title: "Defrost control 100269-01 false high-pressure lockout",
    applies: { modelRe: ["^13HPP", "^13CHP", "^15CHPX", "^LRP1[3456]", "^4SHP", "^2SH13"], codes: ["DS2 off / DS1 on", "Green off / red on solid"] },
    appliesText: "Lennox / Allied Air (Armstrong, AirEase 4SHP) heat pumps with defrost control 100269-01 (revision 259), high pressure switch jumpered and a low pressure switch.",
    summary: "A low-pressure lockout that then loses the thermostat Y signal turns into a false high-pressure lockout. Replacement 100269-02 (30W87, revision 285) fixes it.",
    steps: ["To prevent low-pressure nuisance lockouts use the 25 psig trip / 40 psig reset switch (23W26 / 100087-06) and, if needed, bypass thermostat 13W07 (closes 15 F, opens 30 F, +/- 5 F) in parallel with the switch."],
    priority: "normal", source: "Lennox S&A Note HP-07-01 (Corp. 0710-L3), Defrost Control Faulty High Pressure Switch Code, Mar 2007 rev Jan 2011 (as cited in the app)" },
  { id: "lennox-sa-hp-05-2", brand: "Lennox", number: "S&A Note HP-05-2", docNo: "", rev: "", date: "2005-07-26", type: "Technical",
    title: "HPXA15-030 / HPXB15-030 with CB29M-41 - high pressure trips in mild-weather heating",
    applies: { modelRe: ["^HPX[AB]15-030", "^CB29M-41"], codes: ["LED 1 Off, LED 2 On"] },
    appliesText: "Lennox HPXA15-030 or HPXB15-030 matched with a CB29M-41.",
    summary: "The match itself is the problem - indoor/outdoor coil volume ratio 2.10 against the recommended 1.2-1.8 - which also trips the compressor's internal pressure relief above 60 F. Lennox removed the matchup.",
    steps: ["Do not chase charge or switches on this combination; it is an unapproved match."],
    priority: "info", source: "Lennox S&A Note HP-05-2 (Corp. 0516-L7), HPXA15-030 / HPXB15-030 with CB29M-41 Heat Pump Matchups, Jul 2005 (as cited in the app)" },
  { id: "lennox-sa-hp-12-01", brand: "Lennox", number: "S&A Note HP-12-01", docNo: "", rev: "", date: "2012-03-16", type: "Technical",
    title: "15CHPXA packaged unit mild-weather high pressure trips on first start",
    applies: { modelRe: ["^15CHPXA"], codes: ["Green slow flash / red off"] },
    appliesText: "Lennox 15CHPXA packaged heat pump.",
    summary: "HPS trips on the first cooling start after a long off cycle (first call midday or later). Lennox's temporary fix bypasses the HPS for the first two minutes of compressor run.",
    steps: ["Field-provided ICM175 timer (Grainger 3UW85) set to 2 minutes, wired per the note."],
    priority: "info", source: "Lennox S&A Note HP-12-01 (Corp. 1212-L3), Mild Weather High Pressure Switch Tripping, Mar 2012 (as cited in the app)" },
  { id: "lennox-sa-rp-16-01", brand: "Lennox", number: "S&A Note RP-16-01", docNo: "", rev: "", date: "2016-07-07", type: "Technical",
    title: "LRP14HP nuisance low pressure trips in heating - defrost interval",
    applies: { modelRe: ["^LRP14HP"], codes: ["Green off / red slow flash"] },
    appliesText: "Lennox LRP14HP packaged heat pumps.",
    summary: "Low-pressure lockouts below 30 F near the end of long runs just before defrost, with correct charge, come from coil icing on the factory 90-minute defrost interval.",
    steps: ["Set the time/temp defrost interval to 60 (or 30) minutes in humid or icing climates."],
    priority: "normal", source: "Lennox S&A Note RP-16-01, Nuisance Low Pressure Switch Trips - LRP14HP, Jul 2016 (as cited in the app)" },
  { id: "lennox-sa-h-04-1", brand: "Lennox", number: "S&A Note H-04-1", docNo: "", rev: "", date: "2005-03-29", type: "Technical",
    title: "High-altitude pressure switches - G51MP / G61MP(V) 090 and 110",
    applies: { modelRe: ["^G51MP-?(36|48|60)?C?-?(090|110)", "^G61MPV?-?(48|60)?C?-?(090|110)"], codes: ["LED1 off / LED2 slow flash", "DS1 off / DS2 slow flash"] },
    appliesText: "Lennox G51MP-090/110 and G61MP(V)-090/110 at 4,501-10,000 ft.",
    summary: "The two pressure switches must never be removed, jumpered or rewired. At altitude the right-side operating pressure can run up to 0.25 in w.c. below the left; more than that with a correct install = change only the right-side switch.",
    steps: ["Right-side switch: G51MP 0.55 in (56M04); G61MP(V) 0.55 / 0.35 (56M93). Both sides equal and still tripping = the vent is outside the installation guidelines."],
    priority: "info", source: "Lennox S&A Note H-04-1 (Corp. 0401-L1), High Altitude Pressure Switch Applications for G51MP-090/110 & G61MP(V)-090/110, Jan 2004 re-issued Mar 2005 (as cited in the app)" },
  { id: "lennox-sa-h-07-4", brand: "Lennox", number: "S&A Note H-07-4", docNo: "", rev: "", date: "2007-04-17", type: "Technical",
    title: "Low ignitor voltage from SureLight board 100869-01 (G61MP-7, G60UH-7, G60DF-7)",
    applies: { modelRe: ["^G61MP", "^G60UH", "^G60DF"], serialFrom: "5906H", serialTo: "5906M", codes: ["DS1 + DS2 alternating slow flash", "4 + 3"] },
    appliesText: "Lennox G61MP-7, G60UH-7 and G60DF-7 serial 5906Hxxxxx through 5906Mxxxxx with SureLight board 100869-01.",
    summary: "Dim orange ignitor glow or poor / no ignition can be the board, not the ignitor.",
    steps: ["Power off, ohm the ignitor at the jackplug: 25-47 ohms (outside = replace ignitor). In range: true-RMS volts at the jackplug during trial for ignition should be 95 +/- 5 V; lower = replace the board (23W25)."],
    priority: "info", source: "Lennox S&A Note H-07-4 (Corp. 0712-L4), Low Voltage on SureLight Board 100869-01, Apr 2007 (as cited in the app)" },
  { id: "lennox-sa-h-12-10", brand: "Lennox", number: "S&A Note H-12-10", docNo: "", rev: "", date: "2012-08-21", type: "Technical",
    title: "New Merit ignition control 103085 - different codes, not backward compatible",
    applies: { modelRe: ["^ML180UHP?", "^ML193UHP?", "^ML193DFP?", "^ML195UHP?", "^ML195DFP?", "^ML180DFP?", "^G40", "^G41UF", "^G43UF"] },
    appliesText: "Merit furnaces from dash numbers ML180UHP-03, ML193UHP/DFP-04, ML195UH/DFP-03, ML180DFP-01 (new 103085 single-LED control); older G40UH/DF, G41UF, G43UF and early-dash ML180 / ML193 / ML195 use the two-LED 100973 control.",
    summary: "The 103085 control has a single red LED with different flash codes and stores the last 5 faults; it does not replace the older 100973 - use repair part 81W03 on the older furnaces.",
    steps: ["103085: press the button under 5 s to flash stored codes newest first (2-second pause between); hold over 5 s to clear history."],
    priority: "info", source: "Lennox S&A Note H-12-10 (Corp. 1237-L7), New Merit Series Ignition Control, Aug 2012 (as cited in the app)" },
  { id: "lennox-sa-h-97-7", brand: "Lennox", number: "S&A Note H-97-7", docNo: "", rev: "", date: "1997-10-20", type: "Technical",
    title: "G26 / G27M SureLight board terminal strip mislabeled",
    applies: { modelRe: ["^G26", "^G27M", "^GHR26"], codes: ["LED 1 and LED 2 simultaneous slow flash"] },
    appliesText: "Lennox G26 / GHR26 and G27M SureLight boards with a removable terminal strip; boards date coded 9744 and later are marked correctly.",
    summary: "LEDs only flash slowly and heat / cool calls do nothing (or continuous fan shorts the 24 V circuit): some strips were mislabeled C, Y, W, G, R.",
    steps: ["Correct order left to right is Y, G, W, R, C as printed on the board itself."],
    priority: "info", source: "Lennox S&A Note H-97-7 (Corp. 9719L10), G26/G27M SureLight Board Terminal Designations, Oct 1997 (as cited in the app)" },
  { id: "lennox-sa-h-97-6", brand: "Lennox", number: "S&A Note H-97-6", docNo: "", rev: "", date: "1997-10-20", type: "Technical",
    title: "G27M failure to light - ignitor alignment",
    applies: { modelRe: ["^G27M"], codes: ["LED 1 and LED 2 alternating slow flash"] },
    appliesText: "Lennox G27M; units produced after Nov 1, 1997 have the new ignitor mounting.",
    summary: "Failures to light were traced to ignitor alignment; a kit with a replacement ignitor mounting was released.",
    steps: ["Repeated ignition failure on an early G27M: check ignitor alignment / fit the mounting kit."],
    priority: "info", source: "Lennox S&A Note H-97-6 (Corp. 9718L10), G27M Ignitor Alignment, Oct 1997 (as cited in the app)" },
  { id: "lennox-sa-h-97-1", brand: "Lennox", number: "S&A Note H-97-1", docNo: "", rev: "", date: "1997-02-06", type: "Technical",
    title: "80MGF pressure switch in cold spaces - condensate and bleed fitting",
    applies: { modelRe: ["^80MGF"], codes: ["DIAG #2 flash / DIAG #1 off"] },
    appliesText: "Lennox 80MGF-45 through -120, -5 and -7, in non-conditioned spaces (bleed fitting in production from serial 6397A14616).",
    summary: "Cold-weather no heat: condensate in the switch tubing, or a switch that will not close (2.5 minute wait then 5 minute Pressure Switch Watchguard) or will not open after the cycle.",
    steps: ["Drain the switch and tubing, add barbed fitting 83K86 (1/64 in bleed hole) 1.5 in from the switch. 0-2 in w.c. gauge: under 0.15 in everything off; -0.80 to -1.20 in with inducer running before ignition (less negative = replace the inducer); running pressure must beat the switch break point by 0.10 in or replace the switch. Later half-metal / half-plastic switches have a built-in bleed - do not add the fitting."],
    priority: "info", source: "Lennox S&A Note H-97-1 (Corp. 9702-L2), 80MGF-45/120-5 and -7 Pressure Switch, Feb 1997 (as cited in the app)" },
  { id: "lennox-sa-h-96-4", brand: "Lennox", number: "S&A Note H-96-4", docNo: "", rev: "", date: "1996-02-23", type: "Technical",
    title: "G23 / G26 intermittent-pilot ignition control troubleshooting",
    applies: { modelRe: ["^G23", "^G26"], codes: ["LED flashing (1 second on, 5 seconds off)", "LED off"] },
    appliesText: "Lennox G23 and G26-1/-2 with Johnson G776 / Lennox 69J3601 (replaced by 41K8701, kit 48K99) ignition control.",
    summary: "The 69J3601's flame threshold is about 0.070 microamps, so a steady 0.15 or more on a cold pilot should work; flame loss is detected within 0.8 s, so an unstable pilot causes rectification trouble.",
    steps: ["Read to three decimals with transducer 78H54; check for high resistance between the control's 24 V common and the pilot hood. G26 only: pilot orifice 49K3601 (0.020 in holes)."],
    priority: "info", source: "Lennox S&A Note H-96-4 (Corp. 9605-L2), Troubleshooting G23 & G26 Ignition Controls, Feb 1996 (as cited in the app)" },
  { id: "lennox-sa-h-94-8", brand: "Lennox", number: "S&A Note H-94-8", docNo: "", rev: "", date: "1994-08-29", type: "Technical",
    title: "G23 ignition lockouts in mild weather - pilot assembly",
    applies: { modelRe: ["^G23"], codes: ["LED flashing (1 second on, 5 seconds off)", "LED off"] },
    appliesText: "Lennox G23.",
    summary: "Lockouts were more common in mild weather and with higher gas pressure: a cold pilot after a long off cycle lifts its flame and loses the microamp signal - the pilot, not the control.",
    steps: ["Improved pilot assembly kit 81J0501PR (stainless hood, air shield, flame sensor) raises the signal."],
    priority: "info", source: "Lennox S&A Note H-94-8 (Corp. 9416-L9), G23 Furnace Ignition Lockouts, Aug 1994 (as cited in the app)" },

  // ===================== KOHLER (SB / PB, from kohler-gens.js) =====================
  { id: "kohler-sb-813", brand: "Kohler", number: "SB-813", docNo: "", rev: "", date: "", type: "Service",
    title: "RDC2 and RXT RBUS connection - de-energize before landing wires",
    applies: { genFamilies: ["kohler-rca", "kohler-resv", "kohler-resa", "kohler-resb-resd", "kohler-rcl-24-38", "kohler-rcl-38-60", "kohler-rclb-48-60-kg6208", "kohler-ats-rxt"], controllers: ["RDC2", "DC2"], codes: ["Accy PwrOver", "ATS ComError"] },
    appliesText: "Kohler RDC2 / DC2 controlled sets and Model RXT transfer switches (RBUS A, B, PWR, COM).",
    summary: "Shorting RBUS PWR (about 13 VDC) to A or B while landing RBUS wires with the controller powered gives Accy PwrOver then ATS ComError and has killed RDC2 controllers - not covered by warranty.",
    steps: [
      "Before touching RBUS wiring: open the 120 VAC charger breaker, remove battery negative, unplug any SiteTech USB. Afterwards confirm the utility and building LEDs are lit on the RDC2.",
      "Voltage checks (RDC2 powered, RXT P10 unplugged): PWR to COM about +13.0 VDC, B to A about +4.6 VDC - correct at P10 = replace the RXT board. Wrong: repeat at the generator RBUS block with field wires off (TB3 on 8-12 kW, TB1 on 24-60 kW); right there = field wiring; wrong = P1 continuity A=P1-21 green, B=P1-22 blue, COM=P1-2, PWR=P1-15; all good = replace the RDC2."
    ],
    priority: "high", source: "Kohler SB-813, RDC2 and RXT RBUS Connection (as cited in the app)" },
  { id: "kohler-sb-846", brand: "Kohler", number: "SB-846", docNo: "", rev: "", date: "", type: "Service",
    title: "26RCA(L) cold-weather hard / no start - regulator GM121097-1-S",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^26RCAL?"], builtTo: "2025-06-26", codes: ["Over Crank", "Volts L1-L2 Low"] },
    appliesText: "Kohler 26RCA(L) built before S/N 34JYGHNJ0771 (before 6/26/2025).",
    summary: "Cold-weather hard or no start fixed by a new regulator. Verify pipe size first.",
    steps: ["Over Crank or Volts L1-L2 Low in the event history: export the event log and replace the regulator with GM121097-1-S (TP-7093 p.95-96)."],
    priority: "high", source: "Kohler SB-846, 26RCA(L) No Start (as cited in the app)" },
  { id: "kohler-sb-816", brand: "Kohler", number: "SB-816", docNo: "", rev: "", date: "", type: "Service",
    title: "20RCA(L) / 20RESC CH1000 intermittent loss of compression when cold",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd"], modelRe: ["^20RCAL?", "^20RESCL?"], codes: ["Over Crank"] },
    appliesText: "20RCA(L) / 20RESC(L) with CH1000 engine S/N 52154xxxxx-52224xxxxx.",
    summary: "Cold engine starts, stalls, then free-spins with no compression and may backfire; normal once the oil warms. Engine replacement campaign.",
    steps: ["Pre-authorize warranty; replace the engine with PA-CH1000-3031 and new rotor thru-bolt GM62982; no anti-seize on rotor or bolt; stator bolts 14.9 Nm (11 ft-lb) star pattern, twice."],
    priority: "high", source: "Kohler SB-816, 20RCA(L)/20RESC Intermittent Loss of Compression (as cited in the app)" },
  { id: "kohler-sb-809", brand: "Kohler", number: "SB-809", docNo: "", rev: "", date: "", type: "Service",
    title: "20RCA(L) / 20RESC(L) CH1000 engine failures - seal pushed out, seized, cracked block",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd"], modelRe: ["^20RCAL?", "^20RESCL?"] },
    appliesText: "20RCA(L) / 20RESC(L) with CH1000 engines below S/N 5132103303.",
    summary: "Flywheel-side oil seal pushed out / leaking, seized engine or cracked block.",
    steps: ["Engine will not turn by hand: check oil level and that the flywheel-side blower fan is not jammed; look for metal in the oil filter base - metal found = replace the engine."],
    priority: "high", source: "Kohler SB-809, 20RCA(L)/20RESC(L) CH1000 Engine Failures (as cited in the app)" },
  { id: "kohler-sb-819", brand: "Kohler", number: "SB-819", docNo: "", rev: "", date: "2023-10", type: "Service",
    title: "26RCA(L) fuel leak - cracked regulator housing",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^26RCAL?"] },
    appliesText: "Kohler 26RCA(L).",
    summary: "Cracked regulator housings leak fuel. Replace with GM118465-1-S and never wrench on the solenoid coil.",
    steps: ["Soapy-water leak test at startup; replace a cracked regulator with GM118465-1-S; tighten the inlet pipe hand-tight plus one turn holding the coupling, not the solenoid coil; do not bend the flex line to fix misalignment."],
    priority: "high", source: "Kohler SB-819, 26RCA(L) Fuel Leak, Cracked Regulator Housing (as cited in the app)" },
  { id: "kohler-sb-817", brand: "Kohler", number: "SB-817", docNo: "", rev: "", date: "2023-09", type: "Service",
    title: "26RCA(L) misfires at low or no load - spark plug gap",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^26RCAL?"] },
    appliesText: "Kohler 26RCA(L) engines below serial 5323701414 (left the factory gapped 0.015 in).",
    summary: "Early 26RCA plugs 62 132 13-S at 0.015 in misfire at low / no load; current plug is 62 132 04-S at 0.030 in.",
    steps: ["Regap to 0.030 in or fit 62 132 04-S; replace the QR label with decal GM118986 (TP-7093 p.85)."],
    priority: "normal", source: "Kohler SB-817, 26RCA(L) Misfires at Low or No Load (as cited in the app)" },
  { id: "kohler-sb-823", brand: "Kohler", number: "SB-823", docNo: "", rev: "", date: "", type: "Service",
    title: "26RCA revised mixer kit GM121581 - 26RCA-0 vs 26RCA-A",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^26RCAL?"], controllers: ["RDC2"] },
    appliesText: "Kohler 26RCA / 26RCAL. Nameplate base number ending in A (e.g. 26RCA-BASE01A) = 26RCA-A (revised mixer, firmware 3.4.5+); no A = 26RCA-0.",
    summary: "Two hardware / firmware builds that are not interchangeable; pick the matching model in SiteTech because speed-control gains differ.",
    steps: ["After normal troubleshooting of hunting / performance, contact Kohler service about mixer kit GM121581 (TT-1818) plus the firmware / model update to 26RCA-A."],
    priority: "normal", source: "Kohler SB-823, 26RCA/L Revised Mixer Kit GM121581 (as cited in the app)" },
  { id: "kohler-sb-795", brand: "Kohler", number: "SB-795", docNo: "", rev: "", date: "2020", type: "Service",
    title: "Hunting / surging - stepper linkage arm loose on its brass bushing",
    applies: { genFamilies: ["kohler-rca", "kohler-resv", "kohler-resa", "kohler-resb-resd", "kohler-vsg", "kohler-res-8-12-adc"], builtTo: "2020-08-29" },
    appliesText: "Kohler residential sets shipped before Aug 29, 2020 (14RESA, 20RESC, 14/20RCA, RESV and others listed).",
    summary: "A hunting set may have the plastic stepper linkage arm loose on its brass bushing.",
    steps: ["Take a before photo, center the arm, fill around the set screw with Loc-Tite 454 (sets 15 min, cures 24 h); reconnect the ATS and verify."],
    priority: "normal", source: "Kohler SB-795, Stepper Motor Linkage, Residential (as cited in the app)" },
  { id: "kohler-sb-787", brand: "Kohler", number: "SB-787", docNo: "", rev: "", date: "", type: "Service",
    title: "Breather tube heater shortens breather life - replacement kit",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd", "kohler-res-14-20-rdc"] },
    appliesText: "Kohler 14/20RCA and RESA / RESB models with the breather tube heater (cold-weather kits).",
    summary: "Breather tube heaters cut breather tube life; replace heater and tube at the next service.",
    steps: ["Service kit GM108014-S1 (120 V kits) or GM108014-S2 (240 V kits) per the SB table with a new breather tube, instructions TT-1773; no 240 V service kit on RCA - use the 120 V one."],
    priority: "normal", source: "Kohler SB-787, Breather Tube and Heater Kit Replacement (as cited in the app)" },
  { id: "kohler-sb-796", brand: "Kohler", number: "SB-796", docNo: "", rev: "", date: "2020-06", type: "Service",
    title: "14/20RCA rodent guard kit",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^14RCAL?", "^20RCAL?"], builtTo: "2020-06-26" },
    appliesText: "Kohler 14/20RCA shipped before June 26, 2020.",
    summary: "Early RCA enclosures let rodents in; rodent guard kit GM115434-S (TT-1800). The warranty update expired Jan 4, 2024.",
    steps: ["Rodent damage or nesting on an early RCA: fit GM115434-S."],
    priority: "info", source: "Kohler SB-796, 14/20RCA Rodent Guard Kit (as cited in the app)" },
  { id: "kohler-sb-805-pb-169", brand: "Kohler", number: "SB-805 / PB-169", docNo: "", rev: "", date: "2022", type: "Product",
    title: "20 kW CH1000 temporary oil filter substitution",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd"], builtFrom: "2022-02-25", builtTo: "2022-06" },
    appliesText: "Some 20 kW CH1000-3031 engines built Feb 25 to about June 2022.",
    summary: "They left the factory with the black 14 kW filter 12 050 01-S as a substitute for the yellow 20 kW filter 52 050 02-S. Same change procedure.",
    steps: ["At service fit the correct 20 kW filter; 20 kW maintenance kits GM62347 / GM62347-SKP1-QS."],
    priority: "info", source: "Kohler SB-805 / PB-169, CH1000 Temporary Oil Filter (as cited in the app)" },
  { id: "kohler-pb-167", brand: "Kohler", number: "PB-167", docNo: "", rev: "", date: "", type: "Product",
    title: "CH1000 front and rear main seals are no longer the same part",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd", "kohler-res-14-20-rdc"] },
    appliesText: "Kohler CH1000 engines (20 kW RCA / RESA / RESB / RES / 20RESL).",
    summary: "Kit GM114559-S: flywheel-side seal 25 032 23-S, PTO-side 25 032 22-S - not interchangeable (helix).",
    steps: ["Install dry or with water-based P80 (25 357 80-S), never oil."],
    priority: "info", source: "Kohler PB-167, CH1000 Front and Rear Main Seal Change (as cited in the app)" },
  { id: "kohler-pb-165", brand: "Kohler", number: "PB-165", docNo: "", rev: "", date: "2019-05", type: "Product",
    title: "14/20RCA stator mounting change",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^14RCAL?", "^20RCAL?"], builtTo: "2019-05-23" },
    appliesText: "Kohler 14RCA / 20RCA; mounting changed about 5/23/2019.",
    summary: "An early-style stator replacement needs extra hardware or a kit.",
    steps: ["Stators GC102909 (14 kW 1-ph), GC102908 (14 kW 3-ph), GC102818 (20 kW 1-ph), GC102911 (20 kW 3-ph) - check build date before ordering."],
    priority: "info", source: "Kohler PB-165, 14RCA/20RCA Stator Replacement (as cited in the app)" },
  { id: "kohler-pb-173", brand: "Kohler", number: "PB-173", docNo: "", rev: "", date: "2025", type: "Product",
    title: "20/26RCA revised oil reservoir - GM66090 adapter for the oil heater probe",
    applies: { genFamilies: ["kohler-rca"], modelRe: ["^20RCAL?", "^26RCAL?"], builtFrom: "2025-05-01" },
    appliesText: "Kohler 20/26RCA engines built on or after May 1, 2025 (revised oil reservoir with 3/8 in drain holes).",
    summary: "The oil heater probe needs adapter GM66090; it is now included in cold-weather and breather / oil heater kits.",
    steps: ["Fitting an oil heater to a 2025+ engine: make sure GM66090 is in the kit."],
    priority: "info", source: "Kohler PB-173, 20/26RCA(L) GM66090 Adapter (as cited in the app)" },
  { id: "kohler-sb-778", brand: "Kohler", number: "SB-778", docNo: "", rev: "", date: "", type: "Service",
    title: "LCM and power relay module - replace the relay, not the module",
    applies: { genFamilies: ["kohler-rca", "kohler-resa", "kohler-resb-resd"] },
    appliesText: "Kohler load control modules and power relay modules on RESA / RCA systems.",
    summary: "Replace only a failed relay (GM77178), not the whole module.",
    steps: ["Lug torque 1.2-1.7 Nm (11-15 in-lb)."],
    priority: "info", source: "Kohler SB-778, LCM and Power Relay Module Relay Replacement (as cited in the app)" },
  { id: "kohler-sb-749", brand: "Kohler", number: "SB-749", docNo: "", rev: "", date: "", type: "Service",
    title: "20RESA / RESAL / RESB CH1000 additional startup procedure (oil pressure switch)",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd"], modelRe: ["^20RESAL?", "^20RESB"] },
    appliesText: "Kohler 20RESA / 20RESAL / 20RESB with CH1000.",
    summary: "At startup, pre-oil the pressure switch passage and crank through an overcrank before the first start under load.",
    steps: ["Remove the oil pressure switch, add about 2 oz oil into the passage, reinstall with PST 592 sealant at 10.7 Nm (95 in-lb); shut off fuel (or lift lead 70A), press RUN and let it go through 3 crank cycles to overcrank, clear, restore fuel, start and run 1 full minute before load."],
    priority: "normal", source: "Kohler SB-749, 20RESA/RESAL/RESB CH1000 Additional Startup Procedure (as cited in the app)" },
  { id: "kohler-sb-751", brand: "Kohler", number: "SB-751", docNo: "", rev: "", date: "2015", type: "Safety recall",
    title: "Field terminal block replacement - 14/20RESA(L), 20RESB built 1/1/2015-7/9/2015",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd"], modelRe: ["^14RESAL?", "^20RESAL?", "^20RESB"], builtFrom: "2015-01-01", builtTo: "2015-07-09" },
    appliesText: "Kohler 14RESA, 14RESAL, 20RESA, 20RESAL and 20RESB built 1/1/2015-7/9/2015.",
    summary: "Replace the GND / L0 / load field terminal blocks before operating.",
    steps: ["Kits GM98597-KP (1-pole), GM98599-KP (2-pole single-phase), GM98598-KP (3-phase); mark the new GND block when done."],
    priority: "high", source: "Kohler SB-751, Terminal Block Replacement (as cited in the app)" },
  { id: "kohler-sb-752", brand: "Kohler", number: "SB-752", docNo: "", rev: "", date: "2014", type: "Service",
    title: "RDC2 / DC2 / VSC battery charging improvement - diode harness GM95500",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd", "kohler-vsg", "kohler-rcl-38-60"], controllers: ["RDC2", "DC2", "VSC"], builtTo: "2014-09-15" },
    appliesText: "RDC2 / DC2 / VSC controllers with a GREEN circuit board built before Sept 15, 2014 (build date MMDDYY on the bar-code label on the back); lists 6VSG, 14/20RESA(L), 20RESB and 38/48RCL. Red or blue boards are already updated; RESV is not listed.",
    summary: "Free battery charging diode harness kit GM95500 (TT-1647) - install at routine service.",
    steps: ["Green board, pre-9/15/2014: fit GM95500 at the next PM."],
    priority: "info", source: "Kohler SB-752, RDC2/DC2/VSC Battery Charging Improvement (as cited in the app)" },
  { id: "kohler-sb-743", brand: "Kohler", number: "SB-743", docNo: "", rev: "", date: "", type: "Service",
    title: "Stuck rotor - jacking bolt method",
    applies: { genFamilies: ["kohler-resv", "kohler-resa", "kohler-resb-resd", "kohler-res-8-12-adc"] },
    appliesText: "Kohler 8/10/12RESV(L), 12RES, 14/20RESA(L), 20RESB.",
    summary: "Loosen (do not remove) the thrubolt and rap the rotor sides with a soft hammer to break the taper - never hit the slip rings. For a stuck rotor make a jacking tool from a thrubolt.",
    steps: ["RESV: cut a GM88401 thrubolt to 21.6 cm (8-1/4 in), slot it, 3/8-24 UNF grade 8 jacking bolt with penetrant and impact. RESA / RESB: thrubolt GM76192 or GM62982 (7/16-14) cut to 29.2 cm (11-1/2 in) with a slot, 1/2-20 UNF grade 8 jacking bolt about 3 in; soak the crank nose."],
    priority: "info", source: "Kohler SB-743, Using a Jacking Bolt to Remove a Rotor (as cited in the app)" },
  { id: "kohler-sb-744", brand: "Kohler", number: "SB-744", docNo: "", rev: "", date: "2014-11", type: "Service",
    title: "8/10/12RESV(L) enclosure holes vs mounting pad inserts",
    applies: { genFamilies: ["kohler-resv"], modelRe: ["^(8|10|12)RESVL?"] },
    appliesText: "Kohler 8/10/12RESV(L) on pads GM92228-KP1-QS / -KP2-QS.",
    summary: "If the enclosure holes do not line up with the pad inserts, open them up and use the specified washers.",
    steps: ["Drill the holes with a 19/32 in bit, touch up the paint, use M125A-10-80 washers (10.5 mm ID x 20 mm OD x 2 mm)."],
    priority: "info", source: "Kohler SB-744, 8/10/12RESV(L) Enclosure Hole Alignment with Mounting Pad (as cited in the app)" },
  { id: "kohler-sb-745", brand: "Kohler", number: "SB-745", docNo: "", rev: "", date: "", type: "Service",
    title: "OnCue Plus will not connect",
    applies: { genFamilies: ["kohler-oncue-plus", "kohler-resv", "kohler-resa", "kohler-resb-resd", "kohler-rca", "kohler-rcl-24-38", "kohler-rcl-38-60", "kohler-rclb-48-60-kg6208"], controllers: ["RDC", "DC", "RDC2", "DC2"] },
    appliesText: "Kohler RDC / DC / RDC2 / DC2 sets with OnCue Plus.",
    summary: "Connection can take several minutes (up to 20 on wireless); firmware matters.",
    steps: ["Update to RDC2 / DC2 firmware 5.07 or later; check Telnet port 5253 is open; allow up to 20 minutes for Network Connection Established."],
    priority: "info", source: "Kohler SB-745, OnCue Plus Connection Troubleshooting (as cited in the app)" },
  { id: "kohler-sb-731", brand: "Kohler", number: "SB-731", docNo: "", rev: "", date: "", type: "Service",
    title: "Fuel solenoid valve - hold the body flats, never the coil",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd"] },
    appliesText: "Kohler RESA / RESB fuel solenoid valves.",
    summary: "Hold the valve on its body flats with a 1-7/8 in wrench when tightening the gas connection - wrenching on the coil breaks it and is not covered by warranty.",
    steps: ["Gas connection: wrench on the body flats only."],
    priority: "info", source: "Kohler SB-731 / TP-6803 (as cited in the app)" },
  { id: "kohler-sb-675", brand: "Kohler", number: "SB-675", docNo: "", rev: "", date: "", type: "Service",
    title: "14RESA(L) fuel-block metering valves are sealed - oxygen sensor setup",
    applies: { genFamilies: ["kohler-resa", "kohler-vsg"], modelRe: ["^14RESAL?"], builtTo: "2014-06-26" },
    appliesText: "Kohler 14RESA(L) fuel-block units built before 6/26/2014 (also listed for 6VSG).",
    summary: "Do not break the seals. If adjustment is needed, fit a new metering valve and set it at rated load with oxygen sensor kit GM58035; adjusting voids emission certification.",
    steps: ["Targets: lambda 0.923-0.944, UEGO about 2.60 +/- 0.05 VDC (TP-6805 p.116-117)."],
    priority: "info", source: "Kohler SB-675 (as cited in the app)" },
  { id: "kohler-sb-722", brand: "Kohler", number: "SB-722", docNo: "", rev: "", date: "2013-01", type: "Service",
    title: "14/20RESA(L) controller updates - 20 kW hunting / surging",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd", "kohler-res-14-20-rdc"], modelRe: ["^20RESAL?", "^14RESAL?"] },
    appliesText: "Kohler 14/20RESA(L); the app notes the SB-722 PDF in its library actually contained SB-721, so SB-722 content is used only as adapted inside TP-6805 section 5.10.",
    summary: "Engine hunting / surging on the 20 kW is handled per TP-6805 5.10 (from SB-722).",
    steps: ["Follow TP-6805 5.10 for 20 kW hunting; see SB-795 for the loose stepper linkage arm."],
    priority: "info", source: "Kohler SB-722 via TP-6805 5.10 (as cited in the app)" },
  { id: "kohler-sb-695", brand: "Kohler", number: "SB-695", docNo: "", rev: "", date: "2009-06", type: "Service",
    title: "17/18 kW fuel line damage at the bulkhead",
    applies: { genFamilies: ["kohler-res-17-18-adc", "kohler-resl-dc"], modelRe: ["^1[78]RESL?", "^18TRES"] },
    appliesText: "Kohler 17RES / 18RES / 18TRES / 17RESL / 18RESL.",
    summary: "Check the fuel line, protective sleeve and grommet where it passes through the bulkhead at every maintenance visit.",
    steps: ["Worn line: fuel line 24 353 37-S and sleeve 25 431 17-S, grommet X-634-27 (1.25 in) or X-634-28 (1.5 in); make sure sleeve and grommet are in place. Warranty flat rate code 4090, 0.5 hr."],
    priority: "high", source: "Kohler SB-695, 17/18 kW Fuel Line Damage (as cited in the app)" },
  { id: "kohler-sb-696", brand: "Kohler", number: "SB-696", docNo: "", rev: "", date: "2009-12", type: "Service",
    title: "17/18RES overcrank from loose stepper motor bracket nuts",
    applies: { genFamilies: ["kohler-res-17-18-adc", "kohler-resl-dc"], modelRe: ["^1[78]RESL?", "^18TRES"], codes: ["Overcrank"] },
    appliesText: "Kohler 17/18 kW RES / RESL; engines serial 3910300011 and later (built after 4/13/09) have Loctite from the factory.",
    summary: "Overcrank shutdowns can come from the four hex flange nuts on the stepper motor bracket / carburetor working loose.",
    steps: ["Loosen one nut at a time, apply Loctite 242, torque 7.5-9.1 Nm (66-81 in-lb)."],
    priority: "normal", source: "Kohler SB-696, 17/18RES Stepper Motor Fasteners (as cited in the app)" },
  { id: "kohler-sb-665", brand: "Kohler", number: "SB-665", docNo: "", rev: "", date: "", type: "Service",
    title: "8.5/12RES and 12RESM1 starter relay kit GM50772",
    applies: { genFamilies: ["kohler-res-8-12-adc", "kohler-resl-dc"], modelRe: ["^8\\.5RES", "^12RES", "^12RESM1"] },
    appliesText: "Kohler 8.5/12RES and 12RESM1 with the old-style starter relay 345079.",
    summary: "Replace relay 345079 with kit GM50772 (relay GM49746 with built-in diode). If GM49746 is already fitted, replace it directly.",
    steps: ["Cut off the diode push-on on lead 71A, fit new push-on terminals on 71A, 14S and 14P, drill the mount hole no larger than 9 mm (3/8 in), add lead N1 from terminal 85 to the engine block ground. Terminals: 30-14P, 85-N1, 86-71A, 87-14S, 87A unused."],
    priority: "info", source: "Kohler SB-665 (as cited in the app)" },
  { id: "kohler-sb-709", brand: "Kohler", number: "SB-709", docNo: "", rev: "", date: "2010-11", type: "Service",
    title: "RRT exercise runs once then never again - RDC/DC firmware 2.06",
    applies: { genFamilies: ["kohler-res-14-20-rdc", "kohler-ats-rrt"], controllers: ["RDC", "DC"] },
    appliesText: "Kohler 14/20RES(L) with RDC / DC controllers and Model RRT transfer switch.",
    summary: "An exercise that runs once and never again, or an old exercise time that will not clear, is a firmware bug.",
    steps: ["Load RDC/DC firmware 2.06 or higher with SiteTech 2.2 or higher; this also steadies the utility voltage display so it can be calibrated."],
    priority: "normal", source: "Kohler SB-709 (as cited in the app)" },
  { id: "kohler-sb-714", brand: "Kohler", number: "SB-714", docNo: "", rev: "", date: "2011-07", type: "Service",
    title: "NoEC is not a bad controller (RDC / DC)",
    applies: { genFamilies: ["kohler-res-14-20-rdc"], controllers: ["RDC", "DC"], codes: ["NoEC"] },
    appliesText: "Kohler 14/20RES(L) RDC / DC controllers.",
    summary: "NoEC means settings were lost - usually from making / breaking battery power with F3 in. Do NOT replace the controller.",
    steps: ["Re-enter Ec13 / Ec14 and Uu01 / Uu06; pull F3 before touching battery cables next time (TP-6735 p.45)."],
    priority: "normal", source: "Kohler SB-714 (as cited in the app)" },
  { id: "kohler-sb-690", brand: "Kohler", number: "SB-690", docNo: "", rev: "", date: "", type: "Service",
    title: "30RES / 30RYG low oil pressure switch kit GM69950",
    applies: { genFamilies: ["kohler-15-30res-adc"], modelRe: ["^30RES", "^30RYG"], builtTo: "2009-02-16" },
    appliesText: "Kohler 30RES / 30RYG built before Feb 16, 2009 (serial 2243791 or lower) with the original LOP switch.",
    summary: "The original switch may not shut the engine down before damage when oil runs low. LOP is not a low-level shutdown - the owner must check the dipstick.",
    steps: ["Install kit GM69950: switch 364345 (38 +/- 3 psi) and lead GM66559 to lead 13; reuse the copper washer; torque 30 Nm (22 ft-lb) with a 7/8 in crowfoot; apply oil-check decal GM66054."],
    priority: "normal", source: "Kohler SB-690 (as cited in the app)" },
  { id: "kohler-sb-703", brand: "Kohler", number: "SB-703", docNo: "", rev: "", date: "", type: "Service",
    title: "30RESA / 30REYG on LP hard start - intake resonator and ECM reflash",
    applies: { genFamilies: ["kohler-15-30resa-adc"], modelRe: ["^30RESA", "^30REYG"] },
    appliesText: "Kohler 30RESA / 30REYG running LP with spec numbers starting GM69190 (spec GM74628 units already have the resonator).",
    summary: "Hard starting on LP; fix is air intake resonator kit GM75873 plus an ECM reflash.",
    steps: ["Install GM75873 and reflash the ECM (tool GM42033; calibration from Kohler Generator Field Service by serial) per TT-1549."],
    priority: "normal", source: "Kohler SB-703 (as cited in the app)" },
  { id: "kohler-sb-652", brand: "Kohler", number: "SB-652", docNo: "", rev: "", date: "", type: "Service",
    title: "ADC 2100 program 1.18+ - P7 jumper dropped, OC after first crank on early units",
    applies: { genFamilies: ["kohler-15-30res-adc", "kohler-res-8-12-adc"], controllers: ["ADC 2100"], codes: ["OC"] },
    appliesText: "Kohler ADC 2100 controllers: serial 2051416 and up have no P7 continuous-power jumper (app 1.18+); 15/30RES and 15/30RYG before serial 2053692 with program 1.18 or later.",
    summary: "With Cn00 and no P7 jumper the controller sleeps 48 h after a run; a remote start must happen once after loading 1.18+ or it never powers down and drains the battery. Early 15/30RES/RYG on 1.18+ go to OC after the first crank cycle.",
    steps: ["Do not load pre-1.18 code on a P7-less board (version 2.00 is marine only). OC after the first crank on an early 15/30RES/RYG: cut out 1 in of the gray/orange lead at ECM connector pin 9 so the ADC runs the 3-cycle crank."],
    priority: "normal", source: "Kohler SB-652 (as cited in the app)" },
  { id: "kohler-sb-655", brand: "Kohler", number: "SB-655", docNo: "", rev: "", date: "", type: "Service",
    title: "Dropover sound enclosure exhaust pipe orientation",
    applies: { genFamilies: ["kohler-15-30res-adc"] },
    appliesText: "Kohler 15/30RES dropover sound enclosures (exhaust pipe ships loose).",
    summary: "Point the exhaust opening DOWN and angled toward the center of the set at 45 degrees.",
    steps: ["Set the pipe before start-up (TP-6341 p.18)."],
    priority: "info", source: "Kohler SB-655 (as cited in the app)" },
  { id: "kohler-sb-716", brand: "Kohler", number: "SB-716", docNo: "", rev: "", date: "", type: "Service",
    title: "ADC 2100 fault history - last 20 faults",
    applies: { genFamilies: ["kohler-15-30res-adc", "kohler-15-30resa-adc", "kohler-res-8-12-adc"], controllers: ["ADC 2100"] },
    appliesText: "Kohler ADC 2100 controlled sets.",
    summary: "Pull the last 20 faults with run hours before clearing anything.",
    steps: ["Hold Select and switch to RUN (engine will not start), release at the version number, press both arrows until F1 shows; up arrow shows the code, then run hours at the fault, then F2 ... OFF/RESET to exit."],
    priority: "info", source: "Kohler SB-716 (as cited in the app)" },
  { id: "kohler-sb-725", brand: "Kohler", number: "SB-725", docNo: "", rev: "", date: "", type: "Service",
    title: "ADC 2100 SCF0 - brief at power-up is normal, steady means call Field Service first",
    applies: { genFamilies: ["kohler-15-30res-adc", "kohler-15-30resa-adc", "kohler-res-8-12-adc"], controllers: ["ADC 2100"], codes: ["SCF0"] },
    appliesText: "Kohler ADC 2100 (15/30RES, 15/30RESA, 15/30REYG, 8.5/12RES listed).",
    summary: "SCF0 for 1-2 s when switching OFF to RUN/AUTO is the controller initializing. A steady SCF0 is display-to-processor comm failure - but contact Kohler Generator Field Service before replacing, since interference can cause it.",
    steps: ["Confirm it stays on, not just the 1-2 s power-up message, then call Field Service."],
    priority: "info", source: "Kohler SB-725 (as cited in the app)" },
  { id: "kohler-sb-767-777", brand: "Kohler", number: "SB-767 / SB-777", docNo: "", rev: "", date: "", type: "Service",
    title: "RDC2 found 'reset' (Not In Auto, exercise not scheduled, date/time not set)",
    applies: { genFamilies: ["kohler-rcl-24-38", "kohler-rcl-38-60", "kohler-rclb-48-60-kg6208"], controllers: ["RDC2"], codes: ["Not In Auto"] },
    appliesText: "Kohler 24-60RCL liquid-cooled sets with RDC2.",
    summary: "A reset controller is first a battery problem - supply must stay at 9 V or more while cranking. Only suspect EMI if the log has no battery warnings.",
    steps: ["Battery event in the log: fix battery / supply. No battery event: install shield kit GM104032-S1 (two L-shaped junction box shields with U-channel edging) per SB-767; SB-777 covers battery and EMI checks."],
    priority: "normal", source: "Kohler SB-767 / SB-777 (as cited in the app)" },
  { id: "kohler-sb-750", brand: "Kohler", number: "SB-750", docNo: "", rev: "", date: "", type: "Service",
    title: "E-Controls / PSI ECM diagnostic kit GM42033",
    applies: { genFamilies: ["kohler-rcl-38-60", "kohler-rclb-48-60-kg6208", "kohler-15-30resa-adc"] },
    appliesText: "Kohler sets with PSI / E-Controls ECM engines (GM 4.3 / 5.0 / 5.7 L, KG6208 6.2 L with harness GM105612 or update kit GM106069-S, 30RESA IEPR).",
    summary: "Kit GM42033 reads and clears active and historic DTCs, records plots and runs ignition cut-out tests; ECM manual TP-6724 is included.",
    steps: ["Connect to the DLC; GCP Display software, password from the CD; 6.2 L needs harness GM105612 (the 4G ECM label says '4G')."],
    priority: "info", source: "Kohler SB-750 (as cited in the app)" },
  { id: "kohler-sb-784", brand: "Kohler", number: "SB-784", docNo: "", rev: "", date: "", type: "Service",
    title: "24-38RCL ECM diagnostics - Spectrum Series IV and Kvaser cable",
    applies: { genFamilies: ["kohler-rcl-24-38"] },
    appliesText: "Kohler 24RCL / 30RCL / 38RCLB with the KG2204 engine ECM.",
    summary: "Read J1939 / P-codes with IMPCO Spectrum Series IV (free) and Kvaser cable GM95122 at the diagnostic port on the side of the connection box.",
    steps: ["Connect per TP-6903 p.21."],
    priority: "info", source: "Kohler SB-784 (as cited in the app)" },
  { id: "kohler-sb-799", brand: "Kohler", number: "SB-799", docNo: "", rev: "", date: "2021-10", type: "Service",
    title: "24RCLA harness change - HEGO lead moved (serial 34FGGMJM0049 and later)",
    applies: { genFamilies: ["kohler-rcl-24-38"], modelRe: ["^24RCLA"], serialFrom: "34FGGMJM0049" },
    appliesText: "Kohler 24RCLA from serial 34FGGMJM0049 (Oct 22, 2021).",
    summary: "HEGO lead moved from ECM P27-82 to P27-87 and the O2 connector P19 pin 2 lead was renumbered 87.",
    steps: ["Continuity check: P26-18 to HEGO pin 4, P27-82 (or P27-87 on the later harness) to pin 2, P26-51 to pin 3, P26-65 to pin 1."],
    priority: "info", source: "Kohler SB-799 (as cited in the app)" },
  { id: "kohler-sb-807", brand: "Kohler", number: "SB-807", docNo: "", rev: "", date: "2021", type: "Service",
    title: "Oil filter GM101269 leaks on 5.7 L / 6.2 L engines - replace, do not tighten",
    applies: { genFamilies: ["kohler-rcl-38-60", "kohler-rclb-48-60-kg6208"], builtTo: "2021-04-01" },
    appliesText: "Kohler 48RCLA / 60RCL (5.7 L) and 48/60RCLB (6.2 L) with oil filter GM101269 shipped before 4/1/2021.",
    summary: "The older filter design can leak; tightening does not fix it.",
    steps: ["Replace with the new design (wrench flats on the bottom)."],
    priority: "normal", source: "Kohler SB-807 (as cited in the app)" },
  { id: "kohler-pb-156", brand: "Kohler", number: "PB-156", docNo: "", rev: "", date: "", type: "Product",
    title: "Roof hinge kit GM100831-S",
    applies: { genFamilies: ["kohler-resa", "kohler-resb-resd"], modelRe: ["^14RESA", "^20RESA", "^20RESC"] },
    appliesText: "Kohler 14RESA, 20RESA, 20RESC.",
    summary: "Roof hinge kit GM100831-S replaces old hinge GM62980.",
    steps: ["Broken roof hinge: order GM100831-S."],
    priority: "info", source: "Kohler PB-156 (as cited in the app)" },
  // ===================== v371 GENservice bulletin sweep (2026-11-05, Andy: "check for all bulletins then post dont miss any air or water cooled") =====================
  {"id":"gen-tib20-02-i45","brand":"Generac","number":"TIB20-02-I45","docNo":"A0000683164","rev":"A","date":"2020-05","type":"Training","title":"4.5L gaseous industrial engine (Power Zone Pro): ECM, SPN/FMI faults and sensor tests","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Generac 4.5L gaseous (spark-ignited) industrial units with the engine ECM talking to a Power Zone Pro controller.","summary":"Training guide for the 4.5L gaseous engine. The ECM runs fuel, throttle and ignition and reports faults to the Power Zone Pro over CAN (J1939) as an SPN (which signal) plus an FMI (what kind of failure). An SPN does not prove the sensor is bad - check wires, terminals and harness first.","steps":["ECM power-up: Wire 172 above 6 VDC turns the ECM on. Starting needs both Wire 172 and the GC1 start message; either one can stop the engine. With no CAN comms, Wire 172 cycles on and off.","Read faults: Display Alarms > DTC shows SPN + FMI (FMI 0 and 1 severe high/low, 2 erratic, 3 shorted high, 4 shorted low or open, 7 mechanical, 15 and 17 warnings). DTCs are not listed in time order.","Back-probe only with needle probes or adapter leads P/N A0000683522. Never probe the ECM or EMC connectors.","3-wire sensors: Wire 820G must be grounded to the engine ground bar; 5 V supply (820A or 820B) 4.5-5 VDC with ECM active; signal 0.5-4.5 VDC. TMAP engine off: 2.4-2.6 VDC, 13.8-15.22 psi. AFPS engine off: 0 psi. Fuel pressure sensor (SPN 7469) Wire 797: 2.3-4.1 VDC = 5-14 in H2O.","Oil/coolant temp senders unplugged: 9,399 ohms at 32 F, 2,795 at 77 F, 980 at 122 F, 178 at 212 F (+/-10%). Harness Wire 523 (OTS) or Wire 68 (WTS) should show 4.5-5.0 VDC with ECM active.","Crank sensor (SPN 190): 330-390 ohms; about 1.7 VAC / 270 Hz cranking, 6.5 VAC / 1.7 kHz at 1800 RPM. Cam sensor (SPN 723 and 4204): output Wire 450 should read 4.5-5 VDC.","O2 sensor (SPN 724): heater terminals C to D 15-21 ohms cold (infinite = replace). Under a load bank above 25% load, A to B must swing 0.3-0.9 VDC or replace the sensor.","Ignition (SPN 1268 to 1271, firing order 1-3-4-2): check fuse F4, the ignition relay and 12 VDC on wire 14E; coil primary 1.0 ohm, secondary 9 k ohm. Mixer (SPN 1442 and 1765): stepper 605A to 605B and 605C to 605D 3.6 ohms each; EMC and TPS are replaced as one assembly. Throttle (SPN 51): motor 1.5 ohms at the internal terminals; check the plate moves freely using a wooden dowel. Poor load pickup or overspeed on load drop: check the ECM CT, 1-20 ohms (lethal voltage at CTs)."],"priority":"normal","confidential":true,"source":"Generac TIB20-02-I45 (A0000683164) Rev A, May 2020"},
  {"id":"gen-wib24-01-c","brand":"Generac","number":"WIB24-01-C","docNo":"A0006484437","rev":"B","date":"2026-03","type":"Warranty","title":"Power Zone controller warranty swap: submittal form required, plus swap steps","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph"],"modelRe":[],"controllers":["Power Zone 200","Power Zone 410","PZPS"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Residential, commercial and industrial generators with Power Zone 200, Power Zone 410 or PZPS controllers, whenever a controller is replaced under warranty.","summary":"A warranty claim that replaces a Power Zone controller must have the completed Controller Replacement Submittal Form (A0000138510) attached in GenService, or it is denied or charged back. Returned controllers found good or tampered with are not paid and Generac bills $50.00 for testing. The bulletin also gives the disconnect/reconnect steps.","steps":["Fill out form A0000138510: model, serial, application, controller part number, complaint, the first 10 alarms with dates, and every test you ran with results. If the controller goes back, pack copies of the claim and the form and put the form's return label on the box.","Power Zone 200 out: controller OFF, press service mode (blue LED on), record all settings with the Field Pro App, open the MLCB, pull the utility sense fuses and T1 charger fuse in the ATS, pull the 7.5 amp controller fuse and 15 amp ECM inline fuse, then the negative battery cable.","Remove the top plate (3 bolts) and the 2 controller bolts, unplug connectors by the housings (not the wires), lift off the pegs, then inspect pins and harness connectors.","Power Zone 200 in: plug the harness before mounting, bolt it in, battery, 15 amp and 7.5 amp fuses, then the ATS fuses. Let it power up 1 minute for updates. Service mode on, confirm settings in the Field Pro App, disconnect the app, service mode off (LED off), close the MLCB, AUTO.","Test: kill utility, confirm start and transfer; restore utility, confirm retransfer and the 60 second cooldown.","Power Zone 410: OFF, MLCB off, save the config to USB (Dealer menu > Save/Load Config) before powering down, pull the 7.5 amp fuse and battery negative, 4 bolts underneath. After install: update firmware, load the config from USB, set date/time, check RAP/RRP and I/O modules, AUTO, test a transfer.","PZPS: see owner's manual 10000041593."],"priority":"normal","confidential":true,"source":"Generac WIB24-01-C (A0006484437) Rev B, Mar 2026"},
  {"id":"gen-pib08-15-s","brand":"Generac","number":"PIB08-15-S","docNo":"10000013284","rev":"L","date":"2026-10","type":"Product","title":"Setting the magnetic pickup (RPM sensor) on liquid-cooled engines","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any Generac liquid-cooled engine-driven generator with a magnetic pickup speed sensor; separate settings for the D2.2L, G14.2L, G21.9L, G25.8L and G33.9L engines.","summary":"A pickup set too tight gets hit and destroyed by the flywheel; debris on the tip distorts the signal and can cause speed-related shutdowns. Standard setting: touch a tooth, back out one full turn, fine-tune for about 1.0 VAC while cranking, then Loctite and lock it.","steps":["Tools: DMM, breakout harness 0G41800SRV, Loctite 222MS (purple). D2.2L also needs adapter kit 10000029039.","Unit OFF, battery negative off, fuel OFF. Remove the pickup, clean filings off the tip and threads, and line a flywheel tooth up under the hole (turn the crank bolt - never turn the alternator by the fan blades).","Thread it in by hand until it touches the tooth, back out 1 full turn, connect the breakout harness in line; DMM on AC volts across Wire 79 (+) and Wire 0.","Crank with fuel off and adjust for about 1.0 VAC, then Loctite the base threads and tighten the locknut. Reconnect, fuel on, confirm it reaches rated speed and runs smooth.","No voltage: unplug and ohm it. 0D2244M, 0G3921, 0G3921A about 1,000 ohms (red 79 to black 0); D2.2L pickup 10000020914 about 1,500 ohms; Altronic 640 to 960 ohms; Motortech crank/flywheel 960 to 1440 ohms.","D2.2L Perkins: adapter 10000025533; light contact, back out 1/2 turn (about 0.030 in), Loctite, lock ring, torque 27.9 ft-lb (37 Nm). Expect 1.5 to 3 VAC cranking.","G21.9L: remove the timing cover (8 bolts, 13 mm), set 1/2 turn out from the cam gear (0.020 in), cover bolts 18 ft-lbs (25 Nm) in sequence. G25.8L: bottom on the cam gear, back out 1/2 turn. G14.2L: bottom on the flywheel, back out 1/3 to 1/2 turn - the CD1 won't read past 2/3 turn.","G33.9L (Motortech): inductive pickup 0.065 in (1.6 turns), magnetic pickup 0.02 in (0.5 turn), adaptor 0.04 in (0.75 turn); see the bulletin figures for locations."],"priority":"normal","confidential":true,"source":"Generac PIB08-15-S (10000013284) Rev L, Oct 2026"},
  {"id":"gen-pib20-06-m","brand":"Generac","number":"PIB20-06-M","docNo":"A0001217314","rev":"A","date":"2021-04","type":"Product","title":"Power Zone Pro Sync Load Capacity Management (LCM): how paralleled units start and stop","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All generators with a Power Zone Pro Sync controller in a Modular Power System (MPS).","summary":"Information only. LCM turns paralleled generators off and back on to follow load: units with the most run hours stop first and the fewest start first, with kWh as the tie-breaker. A Permissive and Load Shed module in Active/Passive mode stops LCM from shutting units off under high load.","steps":["Settings: Disable/Balance Run Hours turns LCM on or off; Minimum Number of Generators are always kept on the bus.","Deactivate Threshold (0-100% load): below it a unit drops off only if the rest can carry the load without going over the threshold; above it another unit is added if one is available. Deactivation Delay Time sets the wait before removal.","Rotation: Number of Days Between Rotation (0 turns auto rotation off) and Time of Day to Start Rotation. On Bus Cooldown Time holds the unloading unit at 0 kW and restarts if its load goes over 12.5%.","Status screen buttons: Enable/Disable LCM (one run cycle), Rotate Now, Add Generator Now, Remove This Generator (for maintenance - another unit must be available).","Status fields show next unit to start/stop (by name or MAC address), generators requested, on bus and available, percent system load, and each unit's running state."],"priority":"info","confidential":true,"source":"Generac PIB20-06-M (A0001217314) Rev A, Apr 2021"},
  {"id":"gen-pib17-07-co","brand":"Generac","number":"PIB17-07-CO","docNo":"10000022522","rev":"A","date":"2017-09","type":"Product","title":"Carbon monoxide safety and home standby clearances","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20","gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All combustion-engine products, portable and home standby.","summary":"Safety reminder: engine exhaust carbon monoxide can kill in minutes and can be present even when you can't see or smell exhaust. Standby units go outdoors only, with exhaust kept away from openings, AC units and soffit vents.","steps":["Recommend a battery-operated CO alarm indoors, installed per its maker's instructions.","No operable window, door or wall opening within 5 ft (1.52 m) of any point of the generator.","Clearances: 3 ft (0.91 m) at the ends and front, shrubs included; at least 18 in (457 mm) behind; at least 5 ft (1.52 m) above to any structure or overhang. Never under a deck without 5 ft overhead.","Removable fence service panels no closer than 18 in (457 mm) in front of the unit. Local codes may be stricter.","Don't aim exhaust at an AC condenser - its fan can push CO into the soffit vents. Face the air inlets into strong prevailing wind and keep vents clear of leaves, grass and snow.","Anyone weak, dizzy or sick near a running engine: get to fresh air and medical help right away."],"priority":"normal","confidential":true,"source":"Generac PIB17-07-CO (10000022522) Rev A, Sep 2017"},
  {"id":"gen-sib10-02-gall","brand":"Generac","number":"SIB10-02-GALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"Block heater not heating: test the internal thermostat and element","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generac TPS-series and tank-type engine block heaters.","summary":"A dead block heater can be a failed internal thermostat or a failed element, and misdiagnosis gets warranty claims denied. Ohm the element first, then the thermostat, to find which one failed.","steps":["Unplug the heater and let the coolant cool to a safe temperature.","Ohm the element: TPS heaters through the power cord (may read a little high), tank heaters at the power connections under the cover. Compare with the watts/volts chart in the bulletin (+/- 10%).","Element in spec: bleed the air out of the coolant system.","Element out of spec: ohm the thermostat across its spade terminals - should be 0.1 to 0.3 ohms. Higher: replace the thermostat. In range: the element failed, replace the heater.","Tank heaters can have a second thermostat under a separate housing - test that one too.","Thermostat ranges: 0H6523 on 100/off 120, 0H6524 on 80/off 100, 0H6525 on 120/off 140, 0H6526 on 80/off 100, 0H6527 on 100/off 120, 0H6528 on 140/off 160. The heater part-number rows did not extract cleanly - see the bulletin table for ohms by part number."],"priority":"normal","confidential":false,"source":"Generac SIB10-02-GALL, Mar 2010"},
  {"id":"gen-sib24-23-w","brand":"Generac","number":"SIB24-23-W","docNo":"A0006222760","rev":"A","date":"2024-08","type":"Service","title":"Meter-pedestal transfer switch: add meter and conduit-cover gaskets to stop leaks","applies":{"genFamilies":[],"modelRe":["^RBU(200|150)A3","^RXUW(200|150)A3"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":"2023-07-26"},"appliesText":"RBU200A3, RBU150A3, RXUW200A3 and RXUW150A3 meter pedestal switches (and their -01 versions) made before 7/26/2023 and shipped without gaskets.","summary":"Water can get in between the utility meter and the front cover, and between the top conduit cover and the enclosure, on pedestals shipped without gaskets. If no gasket is visible, order kit A0005700663 and seal it.","steps":["Look for a gasket around the meter and under the top conduit cover. If both are there, the bulletin does not apply.","No gasket: order kit A0005700663 (sealant, meter gasket, sealing ring, conduit cover). On a switch not yet installed, fit it at install.","Clean and dry around the meter opening and the top cover with isopropyl alcohol.","Slide the gasket ring over the meter and front-cover lip; run a bead of Dowsil 732 under the metal ring flange and press it on with the small drain hole pointing down.","Bead Dowsil 732 under the conduit cover, press it onto the top of the enclosure, and wipe off the excess.","Claim in GENService: Installed Unit (or Stock Unit if not installed), A0005700663 as primary failed part - pays 12 minutes (.2 hr) and one trip."],"priority":"normal","confidential":true,"source":"Generac SIB24-23-W (A0006222760) Rev A, Aug 2024"},
  {"id":"gen-a0011147787","brand":"Generac","number":"A0011147787","docNo":"A0011147787","rev":"A","date":"2026-06","type":"Product","title":"Power Zone Pro Sync: setting up the Modbus Gateway (one Ethernet link for all units)","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Power Zone Pro Sync Display and Power Zone Pro Gateway, firmware version 1.24 and later.","summary":"From firmware 1.24, one Ethernet connection to a Power Zone Pro Sync display can carry Modbus TCP to every generator in an MPS, using the Modbus unit ID to pick the target. Before 1.24 each generator needed its own Ethernet connection.","steps":["Communications menu > External Interfaces > Configure under Ethernet Built-In > Configure under Modbus Gateway; tick Enable.","Leave Ignore Unit ID unchecked unless the outside system can't send a unit ID - when checked, every command goes only to the controller on the display's Main Controller port.","Optional security: Read Only rejects all writes; Require Authentication needs a key (up to 20 characters) written starting at register 2485 on every new TCP connection.","Configure Gateway Targets: the Primary Controller is listed first; press Add Device to give other controllers a unit ID, picked by friendly name or MAC address (shown on the Device Manager screen)."],"priority":"info","confidential":true,"source":"Generac A0011147787 Rev A, Jun 2026"},
  {"id":"gen-sib25-01-w","brand":"Generac","number":"SIB25-01-W","docNo":"A0008066266","rev":"A","date":"2025-03","type":"Service","title":"TX/HX transfer switch: generator cooldown timer goes to infinite after firmware update","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX or HX transfer switches on firmware v1.31 or earlier with Source 1 (S1) set as a generator.","summary":"On these switches the S1 Cooldown timer defaults to infinite after a firmware update. Reset it by hand and save.","steps":["After any firmware update on a TX/HX switch with S1 = generator, check the S1 Cooldown timer.","Log in with the Dealer or Installer password (listed in TX Diagnostic Manual A0001157652).","Go to the S1 Cooldown setting (S1 Settings, shown when S1 is a generator - see the menu map in the bulletin), set the time and press Save.","Run a test transfer and confirm the generator cools down and stops."],"priority":"normal","confidential":true,"source":"Generac SIB25-01-W (A0008066266) Rev A, Mar 2025"},
  {"id":"gen-wib25-04-g","brand":"Generac","number":"WIB25-04-G","docNo":"A0009101363","rev":"A","date":"2025-08","type":"Warranty","title":"Warranty claims: choosing the right damage group and damage code","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Generac warranty claims.","summary":"Every claim must pick the damage group and damage code that fits the primary failed part. Parts called back and found with the wrong code can be rejected.","steps":["Electrical: Open (infinite/0L or above spec), Shorted / Poor Resistance (zero or below spec), Controller General (e-code on screen - type the e-code in the free text), Controller No Response / User Interface (blank or unresponsive screen, no e-code).","Mechanical: Alignment, Cracked, Excessive Smoking, Leaking (no visible crack), Loose or Missing Hardware, Overtightened / Seized, Excessive Wear.","Other: Water / Corrosion, Proactive Update (replaced because a bulletin said to - name that bulletin in the free text), Other (explain the failure and why no other code fits)."],"priority":"info","confidential":true,"source":"Generac WIB25-04-G (A0009101363) Rev A, Aug 2025"},
  {"id":"gen-sib10-07-call","brand":"Generac","number":"SIB10-07-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"R-200A board 0G3958 replacement: DIP switch setup and pickup voltage","applies":{"genFamilies":[],"modelRe":[],"controllers":["R-200A"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"0G3958-series R-200A control boards, which replace 0G1505 (A,B) and 0G1303 (A-F) boards on 1.6L, 2.4L and 4.2L liquid-cooled units.","summary":"A new 0G3958 board must have its DIP switches set for the engine, fuel and transfer switch, and the magnetic pickup voltage checked. The 18kw 1.6L 1800 RPM unit only works with 0G1303ESRV.","steps":["Grey J2 connector = 1800 RPM; white J2 connector = 3600 RPM.","DIP changes take effect only this way: AUTO/OFF/MANUAL to OFF, change the DIPs, hold Set Exercise for 5 seconds.","DIP 2: OFF for an HS/RTS switch (ATS mode), ON for GTS (2-wire start on terminals 178 and 183). DIP 3: exercise speed (OFF low, ON normal). DIP 4: OFF LP vapor, ON natural gas - set the regulator for the same fuel.","DIP 5 (used when DIP 7 is OFF): OFF 2.4L, ON 1.6L. DIP 6: kW for 2.4L 3600 rpm and 4.2L 1800 rpm (OFF 45kW, ON 35kW). DIP 7 ON = 4.2L. DIP 1 and 8 unused. S2 set to 1 and 2 for 1.6L.","Check the magnetic pickup at rated speed with breakout harness 0G41800SRV: 1.6L (3600 RPM) 14 VAC, 2.4L (all speeds) 14 VAC, 4.2L (1800 RPM) 6 VAC. See PIB08-15-S for pickup setup.","R-200A technical manual: 0G1341."],"priority":"normal","confidential":false,"source":"Generac SIB10-07-CALL, Mar 2010"},
  {"id":"gen-pib07-20-s","brand":"Generac","number":"PIB07-20-S","docNo":"","rev":"","date":"2007-09","type":"Product","title":"5.4L / 6.8L hard starting: add a primer fuel solenoid to the regulator","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Generac 5.4L and 6.8L engine units.","summary":"For hard starting, a kit adds a primer fuel solenoid to the demand regulator, powered on wire 56 during cranking. Use kit 0G5948ASRV for a single regulator and 0G5948BSRV for dual regulators.","steps":["Can be done with the regulators still mounted. Keep pipe sealant off the first two threads and wipe off any excess.","Remove the small hose between the regulator and the intake adapter plate below the throttle body; replace that barbed fitting with the 1/4 pipe plug.","Move the barbed fitting from the regulator 'out 1' port onto a 1/2 to 1/4 pipe tee reducer on a 1/2 NPT nipple in that port.","Fit a 1/4 NPT close nipple in the tee, then the fuel solenoid (arrow toward the tee; no arrow = deeper passage toward the tee) and a 1/4 NPT barbed 90 elbow.","Put a 1/8 NPT barbed 90 elbow in the lower side port of the regulator under the low fuel pressure switch; join both elbows with 5/16 ID hose and 2 clamps.","Wire the primer solenoid to wires 56 and 0 so it opens while cranking. Dual regulators: bring 0 and 56 over from the first solenoid and repeat for the second regulator.","Warranty: 45 minutes; reference PIB07-20-S on the claim."],"priority":"normal","confidential":false,"source":"Generac PIB07-20-S, Sep 2007"},
  {"id":"gen-pib10-07-g68g","brand":"Generac","number":"PIB10-07-G68G","docNo":"","rev":"","date":"2010-10","type":"Product","title":"6.8L LP-liquid units: move the fuel lock-off solenoid to the base frame","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"6.8L units with LP or NG/LP fuel systems.","summary":"To improve reliability, the LP-liquid fuel shut-off solenoid is relocated to the base frame. Kit 0J1956 is for direct-drive units and 0J1956A for gearbox units.","steps":["Caution: LP liquid supply is at 300 psi. Shut off and disconnect the fuel, wear PPE, and bleed the system down before opening hoses or fittings.","Remove the solenoid from its current spot and disconnect its hoses and fittings.","If needed, drill the bulletin's hole pattern in the frame (9/32 in and 25/32 in bits): about 3 in from the old spot on gearbox units, about 8 in on direct-drive units, or wherever the fuel hose still reaches the vaporizer.","Mount the solenoid per the exploded view (gearbox kit includes bracket 0J10600ST03), reconnect the fuel and leak-check.","Warranty: 30 minutes plus normal travel."],"priority":"normal","confidential":false,"source":"Generac PIB10-07-G68G, Oct 2010"},
  {"id":"gen-sib10-03-call","brand":"Generac","number":"SIB10-03-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"R-200B board 0G8455 replacement: DIP switch setup","applies":{"genFamilies":["gen-generac-protector-qt048-r200b","gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":["R-200B"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"0G8455 series R-200B control boards (2.4L and 4.2L; 22, 27 and 36 kW at 1800 rpm, 45 and 60 kW at 3600 rpm).","summary":"A new 0G8455 board must have its DIP switches set for frequency, transfer switch type, fuel, kW rating and engine before it runs right.","steps":["DIP changes take effect only this way: AUTO/OFF/MANUAL to OFF, change the DIPs, hold Set Exercise for 5 seconds.","DIP 1: OFF 60 Hz, ON 50 Hz (if the unit is capable). DIP 2: OFF for an HS/RTS switch (ATS mode), ON for GTS (2-wire start on terminals 178 and 183).","DIP 3: exercise speed (OFF low, ON normal). DIP 4: OFF LP vapor, ON natural gas.","DIP 6 kW: OFF = 22/27kW (1800 rpm) or 45kW (3600 rpm); ON = 36kW turbo (1800 rpm) or 60kW turbo (3600 rpm).","DIP 7 (1800 rpm only): OFF 2.4L, ON 4.2L. DIP 5 and 8 unused; switch S2 has no function.","R-200B technical manual: 0G9375."],"priority":"normal","confidential":false,"source":"Generac SIB10-03-CALL, Mar 2010"},
  {"id":"gen-pib24-01-w","brand":"Generac","number":"PIB24-01-W","docNo":"A0005457643","rev":"C","date":"2025-01","type":"Product","title":"TX/HX 600A transfer switches: Source 1 and Source 2 swapped on units built after 5/9/2024","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX and HX 600A service-entrance and non-service-entrance transfer switches; layout changed on units made after 5/9/2024.","summary":"On switches built after 5/9/2024 the Source 1 and Source 2 positions are reversed. No action is needed, but sensing wires, microswitches, motor wiring and factory source settings differ from older switches.","steps":["Check the build date before wiring or troubleshooting - sensing wire locations differ (see the bulletin figures).","Contactor microswitches: SW1 and SW2 swap places; SW3 and SW4 swap places.","Motor harness A0001724622, connector J2-8: motor polarity is reversed - wire 868 (red) in J2-2 and wire 869 (black) in J2-5.","Factory settings: newer switches have Source 1 = UTILITY and Source 2 = GENERATOR; early builds were the other way round."],"priority":"info","confidential":true,"source":"Generac PIB24-01-W (A0005457643) Rev C, Jan 2025"},
  {"id":"gen-pib15-12-vv120-240","brand":"Generac","number":"PIB15-12-VV120_240","docNo":"","rev":"A","date":"2015-11","type":"Product","title":"120/240V 3-phase delta (J or D code) alternators: 208V wild leg on B phase","applies":{"genFamilies":[],"modelRe":["^(QT|RG)[0-9]{5}[JD]"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Commercial and industrial liquid-cooled gensets with 120/240V 3-phase J or D coded alternators, and P code 50 Hz 100/200VAC alternators.","summary":"These delta alternators have a high (wild/stinger) leg: the B phase (E2 lug) reads about 208 VAC to neutral. Putting 120 volt-only loads on it can wreck appliances, damage the building or hurt someone.","steps":["Check utility voltage and phase rotation before connecting.","Confirm the alternator voltage code is right for the job.","Before applying load, measure all phase-to-phase and phase-to-neutral voltages; expect about 208 VAC from B phase (E2) to neutral.","Never connect 120 volt-only loads to the B phase; match generator phases to the building's utility phases.","The connection diagrams did not extract - see the bulletin."],"priority":"normal","confidential":true,"source":"Generac PIB15-12-VV120_240 Rev A, Nov 2015"},
  {"id":"gen-sib10-05-call","brand":"Generac","number":"SIB10-05-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"0E9704 2.5L control board replacement: DIP switch setup","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"0E9704-series control boards for 2.5L units (the DIP chart also covers 3.0L and 3.9L Bosch-governor engines).","summary":"A new 0E9704 board must have its DIP switches set for frequency, transfer switch, governor type, fuel, engine and stepper direction.","steps":["DIP changes take effect only this way: AUTO/OFF/MANUAL to OFF, change the DIPs, hold Set Exercise for 5 seconds.","2.5L defaults per the chart: 60 Hz, ATS, stepper governor, NG, 2.5L, 4 CYL, CCW stepper, normal governing.","DIP 1 frequency: the text says OFF = 60 Hz, ON = 50 Hz (the chart's OFF/ON labels read the other way - confirm on the board). DIP 2: OFF for HS/RTS switch (ATS mode), ON for GTS (2-wire start terminals 178 and 183).","DIP 3: governor type (Bosch on 3.0L, 3.9L; stepper on 2.5L). DIP 4: OFF LP vapor, ON natural gas. DIP 5: engine type. DIP 6: number of cylinders.","DIP 7: OFF (CCW) for the 2.5L stepper, judged looking at the shaft as it opens the throttle. DIP 8: ON (Normal) for fixed governor settings; Manual lets the board's pots control the governor."],"priority":"normal","confidential":false,"source":"Generac SIB10-05-CALL, Mar 2010"},
  {"id":"gen-sib23-08-y45d","brand":"Generac","number":"SIB23-08-Y45D","docNo":"A0004157995","rev":"A","date":"2023-04","type":"Service","title":"Fuel filter/separator 0H48930267 (date code Aug 10 2022) may leak right after install","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Cartridge fuel filter/separator 0H48930267 with date code Aug 10 2022 (bottom of the filter), loose or inside the listed 4.5L diesel PM kits; stock received after 02/22/2023 is tested and not affected.","summary":"Some of these filters can leak as soon as they're installed. Inspect stock and PM kits, return affected filters, and claim any that leak in the field.","steps":["Check the date code on the bottom of the filter.","Leaks right after install: file a defective-parts claim for 0H48930267 - 0.5 hr diagnosis plus 0.3 hr replacement; put the filter date code and SIB23-08-Y45D in the claim comments.","Loose filters in stock: return them through the GenService parts return process.","PM kits 0H4893ATCSM, 0H4893ATCSM1, 0H4893ATCSM2, 0H4893ATCSM3, 0H4893ATCSM6, 0H404800SM, 0H489300SM: pull the filter and email parts.technical@generac.com with the kit number, quantity, and box size and weight; you get a return label and free replacement filters."],"priority":"normal","confidential":true,"source":"Generac SIB23-08-Y45D (A0004157995) Rev A, Apr 2023"},
  {"id":"gen-sib16-06-aac","brand":"Generac","number":"SIB16-06-AAC","docNo":"10000009068","rev":"A","date":"2016-11","type":"Service","title":"Air-cooled home standby install: final fuel leak test and loaded pressure test","applies":{"genFamilies":["gen-powerpact-7-75","gen-guardian-evo2-9-22","gen-ecogen-evo2-15","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-synergy-evo2-20"],"modelRe":["^G00703[3567]"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generac air-cooled home standby (Guardian, PowerPact, EcoGen, Synergy), model numbers starting G006998 and G007029 through G007043.","summary":"The sediment trap is now installed at the factory inside the enclosure, but a final leak test is still needed. Test the whole fuel system from the supply to the regulator before the first start.","steps":["After install, leak-test every fuel connection from the supply to the regulator before starting the generator.","With the end panel off, do a loaded fuel pressure test (see 'Checking Gas Line Connections' in the installation manual).","Repeat the leak test at regular maintenance visits."],"priority":"normal","confidential":true,"source":"Generac SIB16-06-AAC (10000009068) Rev A, Nov 2016"},
  {"id":"gen-sib24-22-c","brand":"Generac","number":"SIB24-22-C","docNo":"A0006215598","rev":"A","date":"2024-07","type":"Service","title":"1.5L Evolution Protector: false 'Missing CAM Pulse' (2650) alarms","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":[],"controllers":["Evolution"],"codes":["2650"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"1.5L commercial Protector units with Evolution controller 0K2267C.","summary":"These units can throw random false Missing CAM Pulse alarms (E-code 2650). If all checks pass, Generac supplies a modified 1.5L controller.","steps":["Confirm the correct V code and parameter group, and up-to-date firmware. A controller restart may clear the alarm only for a while - keep checking.","Run Test 97 (flywheel sensor) and Test 110 (CAM sensor).","Check the CAM sensor harness pin by pin - CAM 3 (Wire 15H): COR3-9, COP 3-9, J2-2. CAM 2 (Wire 402): COR3-10, COP 3-10, J1-13. CAM 1 (Wire 0): ground.","All in spec and under warranty: call Generac service for a modified controller (sticker marked '1.5 L') and a control number.","Replace the controller, verify settings, test as normal; claim 0.5 hr labor with the control number."],"priority":"high","confidential":true,"source":"Generac SIB24-22-C (A0006215598) Rev A, Jul 2024"},
  {"id":"gen-pib25-16-xg","brand":"Generac","number":"PIB25-16-XG","docNo":"A0010116401","rev":"A","date":"2026-02","type":"Product","title":"XG liquid-cooled HSB: corroding enclosure U-clips - replace with 0H0412","applies":{"genFamilies":[],"modelRe":["^XG0(32|40|48)45"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":"2025-10"},"appliesText":"XG03245, XG04045 and XG04845 made before October 2025, mainly in humid coastal areas.","summary":"U-clips holding the enclosure panels can corrode near the coast, causing discoloration and hardware that is hard to remove or install. Generac covers the corrosion-resistant clips and shipping only.","steps":["At the next service or maintenance visit, replace the U-clips with P/N 0H0412 (item 23 on exploded view A0005458379).","Claim in GenService with A0000429292 as the primary failed part, PIB25-16-XG in the comments, and the purchased parts listed.","No labor, travel or diagnostic time is paid."],"priority":"normal","confidential":true,"source":"Generac PIB25-16-XG (A0010116401) Rev A, Feb 2026"},
  {"id":"gen-sib10-22-gall","brand":"Generac","number":"SIB10-22-GALL","docNo":"","rev":"","date":"2011-01","type":"Service","title":"Siemens circuit breaker recall - run by Siemens","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Some Generac products built with recalled Siemens circuit breakers; the bulletin does not list models.","summary":"A spring clip in the recalled Siemens breakers can break, causing a poor connection, high temperature, arcing or heat damage. Siemens runs the recall (mostly through Mr. Electric) and pays dealers; no Generac warranty applies.","steps":["If Siemens contacts you about a unit, follow their procedure; they pay for the work.","Watch for heat, arcing or thermal damage at the breaker connection on older units.","Recall details were posted by the CPSC (release 10354)."],"priority":"high","confidential":false,"source":"Generac SIB10-22-GALL, Jan 2011"},
  {"id":"gen-pib15-05-gall","brand":"Generac","number":"PIB15-05-GALL","docNo":"","rev":"A","date":"2015-05","type":"Product","title":"Mobile Link: replace the wrong-size ring terminal on the power wire","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Mobile Link remote monitoring units shipped with an incorrectly sized ring terminal on the power wire; fix before or during install.","summary":"The yellow power wire on some Mobile Link harnesses has the wrong ring terminal. Cut it off and crimp on a standard 8 mm insulated ring terminal.","steps":["Take the harness out of the box; on the yellow wire slide the '13' sleeve back and cut off the ring terminal.","Strip about 1/4 in using the stripper slot that matches the wire gauge.","Crimp on a standard 8 mm insulated ring terminal with the wire end just past the barrel."],"priority":"normal","confidential":true,"source":"Generac PIB15-05-GALL Rev A, May 2015"},
  {"id":"gen-sib11-28-nall","brand":"Generac","number":"SIB11-28-NALL","docNo":"A0000911888","rev":"C","date":"2020-09","type":"Service","title":"More than two transfer switches on one generator: add a relay or the controller is damaged","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20","gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":["^RTS"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air- and liquid-cooled residential/commercial generators running more than two transfer switches, or a long control wire run, from one generator.","summary":"With more than two switches on one generator, or a control run long enough that wire 194 drops below 10 VDC, a relay must be added in the control panel. Without it the generator controller will be permanently damaged.","steps":["Check DC voltage on wire 194; below 10 VDC (or more than two switches) requires the relay circuit.","Add the relay circuit per the bulletin's wiring diagram (parts list in its Notes) - the diagram did not extract, see the bulletin.","Up to 10 transfer switches can be used this way; works with single- or three-phase RTS-style switches."],"priority":"high","confidential":true,"source":"Generac SIB11-28-NALL (A0000911888) Rev C, Sep 2020"},
  {"id":"gen-sib24-33-i","brand":"Generac","number":"SIB24-33-I","docNo":"A0007352881","rev":"A","date":"2025-01","type":"Service","title":"G14.2L repeat coolant leaks: water tube gasket 0K41540122 replaced by A0007339847","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G14.2L engines; water tube to cylinder head gasket part 0K41540122.","summary":"Replacement gasket 0K41540122 doesn't seal the water tube to the cylinder head well, causing repeat coolant leaks. It is discontinued; use A0007339847.","steps":["Use A0007339847 for G14.2L water tube to head leaks; don't install 0K41540122.","Destroy any 0K41540122 in stock and email parts.technical@generac.com with subject 0K41540122 and the quantity; Generac ships the same number of A0007339847 at no charge."],"priority":"normal","confidential":true,"source":"Generac SIB24-33-I (A0007352881) Rev A, Jan 2025"},
  {"id":"gen-pib15-10-acstat","brand":"Generac","number":"PIB15-10-ACSTAT","docNo":"","rev":"A","date":"2015-10","type":"Product","title":"Air-cooled replacement stators: lead position varies - not a defect","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled replacement stator assemblies for current and obsolete products.","summary":"Stator leads can come out 2 inches (51 mm) to either side of the notch in the stator can; both are correct. Good stators are being called defective because of this.","steps":["Leads 2 inches (51 mm) from the notch on either side are both acceptable.","Don't reject or claim a new stator for lead position alone."],"priority":"info","confidential":true,"source":"Generac PIB15-10-ACSTAT Rev A, Oct 2015"},
  {"id":"gen-pib14-13-eacg","brand":"Generac","number":"PIB14-13-EACG","docNo":"","rev":"A","date":"2014-11","type":"Product","title":"Pre-cleaner 0C3040 discontinued on engines using air filter 0C8127","applies":{"genFamilies":["gen-guardian-nexus-12-17","gen-generac-protector-qt048-r200b"],"modelRe":["^G?00(55030|55040|55050|5523[01]|55310|55360|52430|52440|54160)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Generac engines that use air-cleaner element 0C8127.","summary":"Generac stopped using pre-cleaner 0C3040 on engines with the 0C8127 element; this does not affect engine performance. Stock will not be refilled and there is no replacement number.","steps":["Keep servicing the 0C8127 element; running without the pre-cleaner is fine.","Don't order 0C3040 - no superseding part."],"priority":"info","confidential":true,"source":"Generac PIB14-13-EACG Rev A, Nov 2014"},
  {"id":"gen-tib20-01-c45","brand":"Generac","number":"TIB20-01-C45","docNo":"A0000657429","rev":"C","date":"2024-01","type":"Training","title":"4.5L gaseous Protector engine: ECM sensor tests and fault code list","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Protector units with the 4.5L gaseous (spark-ignited) engine; the bulletin names no model numbers.","summary":"Training guide for the ECM-controlled 4.5L gaseous engine: how the ECM is switched on (Wire 172 plus the CAN start message), how to wake it for testing, and resistance/voltage values for each sensor, coil and relay, plus the full ECM fault code list. Both Wire 172 and the CAN start command are needed to run; losing either one stops the engine.","steps":["Inspect the harness for chafed or pinched wires first. Use needle back-probes only (adapter P/N A0000683522); standard probes damage the sealed connectors.","To wake the ECM for live readings: dealer code ESC Up Up Down Down ESC ESC, then DISPLAY and scroll to Engine Hours or ECM version. Readings show for only a few seconds.","Temp senders OTS/WTS (codes 3700-3717, 3900-3917): unplugged, about 9,399 ohms at 32 F, 2,795 ohms at 77 F, 980 ohms at 122 F, 178 ohms at 212 F (+/-10%). Wire 820G to ground near 0 ohms; Wire 523 (OTS) or Wire 68 (WTS) 4.5-5.0 VDC with ECM active.","Crank sender CRKS (4100-4104): coil 330-390 ohms; back-probe 753H and 753L for about 270 Hz and 1.7 VAC cranking, 1.7 kHz and 6.5 VAC running at 1800 RPM.","3-wire sensors (CAMS 4200-4204, AFPS 3600-3604, TMAP 3400-3417 and 3500-3517, FPS 3200-3204): 820G grounded, 820A or 820B supply 4.5-5 VDC with ECM active. Outputs: CAMS Wire 450 4.5-5 VDC; AFPS Wire 604 0.5-4.5 VDC (clean filter about 0.5 VDC); TMAP Wire 754 and Wire 752 0.5-4.5 VDC; FPS Wire 797 0.5-4.5 VDC.","Ignition codes 4502-4507, 4602-4607, 4702-4707, 4802-4807: check plug wires, 12 VDC on Wire 14E at each coil, fuse F4 and the IR relay (output on Wire 14D). Coil primary about 1.0 ohm (pins A-C), secondary about 9 k ohm.","O2 sensor (4300-4304, 4315-4317): heater terminals C-D 15-21 ohms cold (infinity = replace); signal A-B should swing 0.3-0.9 VDC running above 25% load. Mixer EMC stepper coils (4900-4904, 4907, 4915-4917): 605A to 605B and 605C to 605D 3.6 ohms each; EMC and TPS are one assembly. Throttle ETC (3100-3104, 3107, 3115-3117): motor 1.5 ohms at the internal terminals, check the plate moves freely.","Low oil pressure switch: closed when off, open above 10 PSI running; if still closed, check real oil pressure with a gauge. Poor load pickup or overspeed shutdown on load drop: suspect the ECM current transformer (CT) on an output lead."],"priority":"normal","confidential":true,"source":"Generac TIB20-01-C45 (A0000657429) Rev C, Jan 2024"},
  {"id":"gen-sib12-08-pall","brand":"Generac","number":"SIB12-08-PALL","docNo":"","rev":"B","date":"2012-12","type":"Service","title":"Portable 005932 GFCI breaker trips when fed through a 50A transfer switch","applies":{"genFamilies":[],"modelRe":["^005932"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Portable generator models 005932-0 and 005932-1 only (not a standby unit).","summary":"These portables ship with neutral bonded to the frame for OSHA jobsite use. When run into a home through a 50A transfer switch (which has its own neutral-ground bond), the GFCI main breaker trips right away with the red fault light. Fix is to remove the bonding jumper and relabel the unit; it then no longer meets OSHA jobsite rules. Not covered by warranty.","steps":["Confirm with a qualified electrician that removing the bond is allowed by local code.","Remove the alternator end panel and the black plastic back cover.","Take the green/yellow bonding wire off the ground terminal and reinstall the nut.","At the neutral terminal remove the first nut and black wires 22 and 33, then the second nut and the green/yellow bond wire; reinstall the second nut, wires 22 and 33, then the first nut.","Stick label 0J9710D (NEUTRAL NOT BONDED TO FRAME) over the old bonded text on the outlet panel.","Tell the owner the unit must not be used on an OSHA jobsite after this change."],"priority":"normal","confidential":false,"source":"Generac SIB12-08-PALL Rev B, Dec 2012"},
  {"id":"gen-a0011792587","brand":"Generac","number":"A0011792587","docNo":"A0011792587","rev":"A","date":"2026-08","type":"Warranty","title":"Power Zone 410 IO Extender: checks before replacing, plus required warranty form","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone 410"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Commercial/industrial generators with the IO Extender assembly A0000908079 (Power Zone 410 controller).","summary":"Warranty claims for IO Extender A0000908079 now need the Replacement Submittal Form attached in GENservice and the old part returned with the claim copy and form, or the claim is denied or charged back. Parts found not faulty are rejected and Generac bills $50.00 for testing. The bulletin gives a check list to run before replacing.","steps":["Put the generator in OFF. Check IO extender firmware on the Power Zone 410 Info screen or Service Tool: 1.03 or older, replace per WIB and stop; 1.04 or newer, keep going.","Remove power from the extender. Check J6 (battery feed): no insulation in the clamp, 5mm strip, power terminals 0.5-0.6 Nm. Reseat every other screw terminal (0.25 Nm).","Unplug and reseat J1 (RS-485) and J3 (CAN, if used); check pins are seated and not bent.","Note the DIP switch (Modbus address) positions, toggle each 3 times, return them as found. J5 CAN jumper normally across J5-1 and J5-2; J2 RS-485 jumper normally across J2-2 and J2-3.","Repower and test. If still bad, J6 should read 12-24V; if not, trace the harness back to the source.","On a Loss of Communications alarm, make sure the DIP address matches the extender enabled in settings. Check each of the 8 channels is mapped and inverted correctly (Dealer Menu > Edit Settings > IO Ext Config).","Trigger each input and watch it change state. Replace the extender only if the source signal is good and the extender does not respond; fill in the submittal form and return the part."],"priority":"normal","confidential":true,"source":"Generac A0011792587 Rev A, Aug 2026"},
  {"id":"gen-tib17-01-eng","brand":"Generac","number":"TIB17-01-ENG","docNo":"10000013902","rev":"D","date":"2023-04","type":"Training","title":"Industrial engine training, Perkins EST license and required service tools","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Industrial service dealers working on Perkins, MAN, FPT and Mitsubishi engines in Generac industrial generators.","summary":"Dealer process info, not a repair. Explains the Generac engine training course, that Perkins 2000 series warranty work needs the EST tool with a yearly per-tech license, and which special tools and stock levels go with maintenance vs Perkins-certified dealers.","steps":["Perkins 2000 series: Electronic Service Kit P/N 10000034418 is required (at least 1 per dealer); each tech needs an EST license, renewed yearly.","Buy the license under GENservice Training / Factory Service Classes, then send the Perkins EST License Registration form P/N 10000034491; the code takes 3 to 5 days.","Perkins 400 communication tool is P/N 10000034018 (software on GenService, no license needed).","Register for courses through Generac University; MAN and FPT are covered in the Engine Training course, Mitsubishi training is at Mitsubishi in Addison, IL."],"priority":"info","confidential":true,"source":"Generac TIB17-01-ENG (10000013902) Rev D, Apr 2023"},
  {"id":"gen-sib20-18-w","brand":"Generac","number":"SIB20-18-W","docNo":"A0001074063","rev":"A","date":"2020-11","type":"Service","title":"Power Zone Pro: setting up 2-wire or NEC 3-wire remote start","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro","Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All units with a Power Zone Pro or Power Zone Pro Sync main controller.","summary":"Some areas enforce the NEC 3-wire start, which uses a normally-open and a normally-closed input so a broken wire raises an alarm and the unit still starts. The bulletin shows the Power Zone menu settings for 2-wire and 3-wire start and the matching alarms. Extra wire is needed for 3-wire.","steps":["2-wire: Setup > Digital I/O > Digital Input Setup, channel 5 (use Show Null Functions if hidden). Source INPUT 05, function 2 OR 3 WIRE START NO. Invert checked for a NO contact, unchecked for NC. Apply Changes. To disable, trash channel 5.","3-wire: set up the NO input as above, then add the NC input: channel 14 / INPUT 14 on Power Zone Pro, channel 24 / INPUT 24 on Power Zone Pro Sync, function 3 WIRE START NC. Invert checked for NC contact. Apply Changes.","Setup > Digital I/O > Digital Output Functions Setup: on null channels add 3 WIRE START ENABLED and 3 WIRE START FAULT ACTIVE.","Setup > Protections > Alarm Setup > Digital Output Function Alarms: 3-wire enabled alarm triggers Low; fault active alarm triggers High and must not be set to Shutdown.","If a Permissive and Loadshed (P&L) module is used: 3-wire start needs P&L firmware P015 or later; tick 3 Wire Start Enable and set the polarity (3-wire gets the opposite polarity of 2-wire)."],"priority":"normal","confidential":true,"source":"Generac SIB20-18-W (A0001074063) Rev A, Nov 2020"},
  {"id":"gen-pib20-02-w","brand":"Generac","number":"PIB20-02-W","docNo":"A0000896261","rev":"B","date":"2020-07","type":"Product","title":"TX transfer switch: old manual shows manual-transfer handle turned the wrong way","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":"2020-06-14"},"appliesText":"All TX automatic transfer switches built before 6/15/2020 that came with a Rev A or B owner's manual.","summary":"The Rev A/B owner's manual for these TX switches gives the manual-operation rotation backwards, and turning the contactor the wrong way can damage it. Use the corrected directions below and get owner's manual A0000347502 Rev C or later from GenConnect or GenService.","steps":["Kill all power sources and put the switch control in MAINTENANCE MODE first. Never transfer manually under load.","Check the observing window: S1, S2 or White (White = Neutral Off, time-delay switches).","Leaving Source 1: handle in the lower receptacle, turn COUNTER-clockwise, about ten turns.","Leaving Source 2: handle in the lower receptacle, turn CLOCKWISE, about ten turns.","If the window shows White, put the handle in the upper receptacle and lift gently to release the neutral catch; repeat the first move if needed.","Finish a transfer once started; do not try to go back from neutral. Return the handle to its storage spot."],"priority":"high","confidential":true,"source":"Generac PIB20-02-W (A0000896261) Rev B, Jul 2020"},
  {"id":"gen-wib06-08-s","brand":"Generac","number":"WIB06-08-S","docNo":"","rev":"","date":"2006-09","type":"Warranty","title":"UL listed 12/24V battery charger troubleshooting form (required for charger claims)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generac 12/24 V, 2/10 A UL listed auxiliary battery chargers (C, E, F, G, R and H control panels).","summary":"Step-by-step check to prove a battery charger bad before a warranty claim; the filled-in form must go with every charger claim. 24 V / 10 A values are in brackets. A steady DC load over 1.5 (8) A will drain the battery no matter what the charger does. Replaces WIB03-2-S.","steps":["System is OK if the battery is over 11 (22) VDC with the charger putting out current, or over 14 (28) VDC with no charger current.","Below 11 (22) VDC: pull the charger output fuse and battery negative, wait 10 minutes, re-read.","If it recovers to 12 (24) VDC: pull the panel fuse and charger input fuse, reconnect negative, insert the input fuse, check the green power LED and 120 VAC (108 - 132) input, install the output fuse, and confirm charge current (ammeter on C/E/F/G panels, yellow LED on R/H panels). No current with good wiring and fuses = bad charger.","If it does not recover: hydrometer each cell; below 1.155 (corrected to 80 F, .004 per 10 F) replace the battery; above that let it sit open-circuit for several hours and replace if it will not reach 12 (24) VDC.","Battery between 11 (22) and 13 (26) VDC, good fuses, 120 VAC in, green LED on, but no output current = replace charger.","Charger and fuse part numbers for old and new style chargers are in the bulletin table; return all new style chargers with the claim."],"priority":"normal","confidential":false,"source":"Generac WIB06-08-S, Sep 2006"},
  {"id":"gen-pib12-05-h6-7-8-7d","brand":"Generac","number":"PIB12-05-H6.7/8.7D","docNo":"","rev":"B","date":"2012-12","type":"Product","title":"PM-DCP with FPT 6.7L and 8.7L diesel: firmware 4.0C and MProp valve replacement","applies":{"genFamilies":[],"modelRe":[],"controllers":["PM-DCP"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"PM-DCP units with G17 FPT diesel engines, 6.7L (high output) and 8.7L only; units built after November 2012 should already have 4.0C or higher.","summary":"These units need DCP firmware 4.0C or higher, and units started up before 1 May 2012 also need a new MProp regulating valve on the high pressure fuel pump. Do it at the next service visit; warranty pays 15 minutes for firmware and 30 minutes for the valve, no travel.","steps":["Check the panel firmware. Start-up before 1 May 2012: firmware plus MProp valve PN 0H21090224. Start-up after 1 May 2012: firmware only. 4.0C or higher already: nothing to do.","Firmware below 3.7D/3.8A also needs the current production .xml file; follow document 0192800GST-B on GENservice. Use only the latest GenLink-DCP. Level Two password needed; most config changes need a service dongle.","Bring the start-up .xml file, firmware and parts before going to site.","Valve swap: key OFF, charger OFF, negative cable off. Clean around the valve, unplug it, remove the three #25 Torx screws (third is top-back).","Catch fuel, clean the opening, lube new O-rings with clean diesel, fit the valve (one way only), torque screws evenly to 13 ft/lb (18 Nm).","Reconnect, run 5 minutes and check for leaks, then return to Auto."],"priority":"normal","confidential":false,"source":"Generac PIB12-05-H6.7/8.7D Rev B, Dec 2012"},
  {"id":"gen-sib10-08-call","brand":"Generac","number":"SIB10-08-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"R-100 control board 0F4245: DIP switch setup","applies":{"genFamilies":[],"modelRe":[],"controllers":["R-100"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators using the 0F4245 series R-100 control board (1.5L, 2.5L, 3.0L and 3.9L engines).","summary":"A replacement R-100 board must have its 8 DIP switches set to match the unit. Settings only take effect after you set them with the switch in OFF and hold Set Exercise for five seconds.","steps":["Put AUTO/OFF/MANUAL in OFF, set the DIP switches, then hold Set Exercise for five seconds.","Switch  frequency: OFF 50 Hz, ON 60 Hz (50 Hz option only on 2.5L units).","Switch  transfer switch: OFF for HS/RTS (ATS mode), ON for GTS (W) switch using 2-wire start terminals 178 and 183.","Switch  exercise: OFF low speed, ON normal speed. Switch  fuel: OFF LP vapor, ON natural gas (set the regulator to match).","Switch  engine: OFF 1.5L or 3.9L, ON 2.5L or 3.0L. Switch  cylinders: OFF 6, ON 4.","Switch  stepper rotation: OFF CCW (use on 2.5L), ON CW. Switch  does nothing. More detail in R-100 manual 0F6402."],"priority":"normal","confidential":false,"source":"Generac SIB10-08-CALL, Mar 2010"},
  {"id":"gen-pib08-14-s","brand":"Generac","number":"PIB08-14-S","docNo":"","rev":"B","date":"2011-10","type":"Product","title":"Voltage regulator 0G28850SRV / 0G2885A setup and adjustment","applies":{"genFamilies":["gen-generac-protector-qt048-r200b"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any generator fitted with voltage regulator P/N 0G28850SRV or 0G2885A.","summary":"The regulator has three pots: Voltage (V), Under Frequency (U/F, sets where volts start dropping with frequency, adjustable 50 to 70 Hz) and Gain (G, response speed). Set them at no load with a meter on the output, then check recovery under load.","steps":["Connect an accurate AC voltmeter and frequency meter to the output leads.","Start position: V centered, U/F fully clockwise, G centered. Turn off all loads.","Start and run 2 minutes. At 60Hz no load the green (excitation), yellow (sensing) and red (regulator) LEDs should all be on.","If the red LED flashes, turn G slowly CCW until it stops. Set V to rated line-to-line voltage +/- 2 VAC.","Turn U/F CCW until voltage just starts to drop, then back it to the point just before the drop.","Apply load, confirm voltage recovers, readjust G if the red LED flashes. Recheck LEDs at no load, run 2 minutes and shut down."],"priority":"normal","confidential":false,"source":"Generac PIB08-14-S Rev B, Oct 2011"},
  {"id":"gen-tib19-01-z","brand":"Generac","number":"TIB19-01-Z","docNo":"A0000215823","rev":"A","date":"2019-05","type":"Training","title":"Security dongle and challenge codes for Power Zone (PMDCP) and H-100 panels","applies":{"genFamilies":["gen-generac-protector-sg-h100"],"modelRe":[],"controllers":["Power Zone","H-100"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Certified technicians working on Power Zone PMDCP (G-Panel) and H-100 panel generators.","summary":"Protected field changes on Power Zone and H-100 panels need a security dongle or an access code. Dongles go to techs who passed an Industrial course (or the Protector Plus course for Protector Plus dongles) and have GENservice access; the dongle refreshes for 28 days each time the tech logs into GENservice.","steps":["Dongle: finish the service training class, fill in the information sheet; the instructor sends it to service training, who program and ship the dongle (typically within 2 days).","Log into GENservice regularly so the dongle stays active (28 day auto update).","No dongle or no GENservice access: call a factory tech or the Industrial call center for a code. Power Zone codes last 1 day or 30 days; an H-100 challenge code works one time."],"priority":"info","confidential":true,"source":"Generac TIB19-01-Z (A0000215823) Rev A, May 2019"},
  {"id":"gen-sib23-36-c1-5","brand":"Generac","number":"SIB23-36-C1.5","docNo":"A0005352644","rev":"A","date":"2024-03","type":"Service","title":"RG 1.5L Chery: charge alternator not charging in extreme cold, rewire Wire 14A","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":["Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All RG models with the 1.5L Chery engine (Evolution-based); check the engine before applying.","summary":"The DC charge alternator regulator (DCVR) senses voltage from the controller's temperature-based charge voltage instead of the battery, so in very low temperatures the alternator may not charge. Fix is to move Wire 14A (DCVR power/sense) from Splice E to fused battery Wire 14C. Warranty: 0.75 hr labor, 0.5 hr diagnostic, 1 trip, causal part 10000024401.","steps":["Parts: butt splice 10-12 AWG G031722, crimp nut 22-14 AWG G074029, 2 cable ties 029333A.","Switch to OFF and remove the negative battery cable. Remove the control box panel and find Wire 14A between COP3-1 and Splice E.","Cut 14A about 2 in (51 mm) from the splice. Cut Wire 14C about 2 in (51 mm) from the DB1 connector.","Strip about 1/4 in (6.4 mm) on both 14C ends and the 14A end from COP3-1; crimp all 3 together in the butt splice. Cap the 14A stub left on Splice E.","Reconnect the battery, clip a DMM to the battery (keep leads clear of the fan), start in MANUAL: voltage should climb to 14.2V but not above 14.7V.","Return the unit to Auto. On the claim add the 3 parts and put SIB23-36-C1.5 in the notes."],"priority":"high","confidential":true,"source":"Generac SIB23-36-C1.5 (A0005352644) Rev A, Mar 2024"},
  {"id":"gen-pib18-08-w","brand":"Generac","number":"PIB18-08-W","docNo":"A0000069686","rev":"A","date":"2018-12","type":"Product","title":"PSTS switches shipped Jul 2017 to Sep 2018: lock out manual operation until Eaton repair","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Power Frame (Magnum) breaker-based PSTS and 2000-3000A contactor-based PSTS shipped July 5, 2017 through September 30, 2018.","summary":"The manual-operation interlock on these PSTS switches may not stop an improper close. Automatic operation works fine. Dealers lock out the door handle and Eaton Field Service does the repair; Generac pays standard travel and 0.15 hours for the lockout only.","steps":["Notify the affected customer and collect site name, address, contact name, phone, email and how many switches are on site.","Lock out the PSTS exterior door handle so no manual operation is possible (lock goes through the handle as shown in the bulletin).","Get dealer, tech and site approval signatures and the lockout date on the PIB form.","Send General Order number, Product ID, serial number and site info to Eaton Field Service (ATSWarranty@Eaton.com) and Generac Service (service@generac.com), subject line Magnum Level Field Repair.","Scan and return the signed PIB to service@generac.com; Eaton schedules the site work."],"priority":"high","confidential":true,"source":"Generac PIB18-08-W (A0000069686) Rev A, Dec 2018"},
  {"id":"gen-sib22-03-z","brand":"Generac","number":"SIB22-03-Z","docNo":"A0002458801","rev":"A","date":"2022-04","type":"Service","title":"Power Zone Pro: replace failed Connectivity Server with Power Zone Gateway kit","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Power Zone Pro generators built before April 2022 whose Connectivity Server needs replacing.","summary":"Connectivity Server 10000039844 is discontinued. Order retrofit kit A0002495900, which has the new Power Zone Gateway (A0002163973, mounts inside the enclosure, no built-in Wi-Fi, uses USB for I/O options) and a plate to cover the old hole. In warranty: 0.3 hours labor, causal part 10000039844, replaced part A0002495900.","steps":["Disconnect all wiring and remove the old Connectivity Server from the top of the controller enclosure.","Use the kit's metal template to drill six 1/4 in. mounting holes; clean out all metal shavings.","Fit the gasket over the four corner holes and press the cover plate studs through.","Secure the plate with 4 M5 flat washers, lock washers and hex nuts; mount the Gateway on the two remaining studs with M4 flat washers, #8 lock washers and M4 nuts.","Reconnect all wiring to the Gateway and test full function."],"priority":"normal","confidential":true,"source":"Generac SIB22-03-Z (A0002458801) Rev A, Apr 2022"},
  {"id":"gen-sib14-12-31sn","brand":"Generac","number":"SIB14-12-31SN","docNo":"","rev":"B","date":"2015-08","type":"Service","title":"Converting an RTS 3-phase switch to single phase with switched neutral","applies":{"genFamilies":[],"modelRe":["^RTS"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RTS 100-800 Amp three phase transfer switches, when local code calls for a switched neutral.","summary":"Where the neutral must be isolated from utility during an outage, a 3-phase 120/240 or 120/208 RTS can be rewired so its third pole switches the neutral. The power monitor relay is rewired and the battery charger then needs its own 120VAC load-side feed.","steps":["Kill power: main breaker and battery disconnect OFF.","Remove wire N3 between the 3rd contactor pole and terminal 5 of the power monitor relay.","Pull the power monitor relay; on its socket move N1B from terminal 1 to terminal 8 (terminal 8 then has two N1B and one N1A).","The N3 pole is now the neutral pole: utility neutral to N3, generator neutral to E3, load neutral to T3.","Feed the generator's battery charger: 120VAC load-side source to T1 (Hot) on the three-position terminal block in the generator control panel, neutral to the panel neutral bar, on a 15A max breaker."],"priority":"normal","confidential":true,"source":"Generac SIB14-12-31SN Rev B, Aug 2015"},
  {"id":"gen-sib10-09-call","brand":"Generac","number":"SIB10-09-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"R-200 control board 0F8710: DIP switch setup","applies":{"genFamilies":[],"modelRe":[],"controllers":["R-200"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators using the 0F8710 series R-200 control board (2.4L 35 or 45 kW, and 3.0L engines).","summary":"A replacement R-200 board must have its DIP switches set to match the unit. Settings take effect after setting them with the switch in OFF and holding Set Exercise for five seconds.","steps":["Put AUTO/OFF/MANUAL in OFF, set the DIP switches, then hold Set Exercise for five seconds.","Switch : not used.","Switch  transfer switch: OFF for HS/RTS (ATS mode), ON for GTS using 2-wire start terminals 178 and 183.","Switch  exercise: OFF low speed, ON normal speed. Switch  fuel: OFF LP vapor, ON natural gas (set the regulator to match).","Switch  engine/kW: OFF 2.4L 35kW, ON 2.4L 45kW or 3.0L. Switch  cylinders: OFF 6, ON 4.","Switch  and Switch : not used. More detail in R-200 manual 0F9784."],"priority":"normal","confidential":false,"source":"Generac SIB10-09-CALL, Mar 2010"},
  {"id":"gen-a0010219979","brand":"Generac","number":"A0010219979","docNo":"A0010219979","rev":"A","date":"2026-01","type":"Service","title":"Generator shows Disconnected / cellular offline: set up Wi-Fi before replacing cell accessory","applies":{"genFamilies":[],"modelRe":["^A0004175681","^A0004175700","^G0072150"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Cellular connectivity accessories A0004175681, A0004175700 and G0072150.","summary":"Cellular connectivity accessories are being replaced when they simply cannot get a cell signal. If the unit shows Disconnected in Fleet, Field Pro shows Offline (Cellular) for over 30 minutes, or the accessory LED pulses or double-blinks for over 30 minutes, connect it to the customer's Wi-Fi instead.","steps":["Confirm the symptom has lasted more than 30 minutes (Fleet Disconnected, Field Pro Offline (Cellular), or LED pulsing / two-blink).","In the latest Field Pro: Work on a homestandby generator > Connect to a generator now > pick the serial number.","Tap Continue on the firmware update screen, then Configure Wi-Fi Now on the dashboard.","If Wi-Fi does not fix it, call Technical Service for a control number before replacing the accessory."],"priority":"normal","confidential":true,"source":"Generac A0010219979 Rev A, Jan 2026"},
  {"id":"gen-sib15-03-eacg","brand":"Generac","number":"SIB15-03-EACG","docNo":"","rev":"A","date":"2015-01","type":"Service","title":"Evolution air-cooled: undervoltage at start-up in cold and nuisance fuse alarms","applies":{"genFamilies":["gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22"],"modelRe":[],"controllers":["Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled generators with Evolution control boards; does not apply to Synergy or EcoGen with G-Flex.","summary":"In some cold conditions the brushes do not make good contact with the slip rings at start-up, causing an undervoltage shutdown, and a poor fuse connection can trip a fuse problem alarm. Firmware Rev 1.12 or higher gives up to four extra minutes before the undervoltage shutdown and removes the false fuse alarm.","steps":["Load Evolution air-cooled firmware Rev 1.12 or higher (Service Documents / Evolution Firmware AC on GenService).","Do it at the next maintenance visit; warranty only on fix-at-fail with the alarm log attached (0.2 hr labor, 0.5 hr diagnostic, one trip).","After this update the unit CAN start with the fuse pulled: always disable it the standard way (fuse, T1 and negative battery cable) before working on it."],"priority":"high","confidential":true,"source":"Generac SIB15-03-EACG Rev A, Jan 2015"},
  {"id":"gen-sib17-12-c15","brand":"Generac","number":"SIB17-12-C15","docNo":"10000014463","rev":"B","date":"2017-07","type":"Service","title":"RG025 and RG030 1.5L: undervoltage during low speed exercise, fit 10 ohm field boost resistor","applies":{"genFamilies":["gen-generac-protector-rg-legacy-3600"],"modelRe":["^RG(025|030)15ANAX"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"3001762684","serialToExclusive":true,"builtFrom":"","builtTo":""},"appliesText":"RG03015ANAX and RG02515ANAX built before 5/22/17 and below serial number 3001762684.","summary":"These units may drop into undervoltage during low speed exercise only. Fix is to replace the existing 15 ohm field boost resistor with a new 10 ohm 50 watt resistor at the next service. Standard warranty applies.","steps":["Parts: resistor 10000007082 (10R 50W), screw G052618, 2 flat washers G051713, lock washer G049226, nut G051716.","Remove the side panel and the old 15 ohm resistor.","Drill a 7/32 in. (5.5 mm) hole centered 0.6 in. (15 mm) above the old mounting stud.","Loosely mount the new resistor with the M5 bolt, mark the locating tab spot, remove it and drill a 5/32 in. (4 mm) clearance hole.","Mount the resistor with the tab in the clearance hole, tighten, connect the wires as in the bulletin figure, refit the side panel."],"priority":"normal","confidential":true,"source":"Generac SIB17-12-C15 (10000014463) Rev B, Jul 2017"},
  {"id":"gen-sib20-07-c","brand":"Generac","number":"SIB20-07-C","docNo":"A0000682627","rev":"A","date":"2020-05","type":"Service","title":"RG048 4.5L: code 3002 after LP start-up, update ECM firmware","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":["^RG04845"],"controllers":["Evolution"],"codes":["3002"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RG 48 kW units with the 4.5L engine (RG04845) and Evolution controller.","summary":"Fault 3002 shows after LP start-up because the ECM firmware does not handle the LPG fuel selection; the update also changes CAN message timing to the controller. Load the latest ECM firmware through the Evolution USB port. Done at start-up, not a warranty item.","steps":["From GenService (Documentation > Service Documents > Engine Control Module Firmware) get the latest RG48 ECM FIRMWARE (260.1 at release).","Save the .ecm file to the root of a FAT32 flash drive and plug it into the Evolution USB port.","Enter the dealer code ESC, ESC, UP, UP, DOWN, DOWN, ESC, ESC; in dealer edit pick Update ECM Firmware (last item - press up arrow at the start of the menu).","Compare the ECM and USB versions shown, press Enter for yes, and wait for success."],"priority":"normal","confidential":true,"source":"Generac SIB20-07-C (A0000682627) Rev A, May 2020"},
  {"id":"gen-sib24-03-w","brand":"Generac","number":"SIB24-03-W","docNo":"A0005486550","rev":"A","date":"2024-03","type":"Service","title":"RXSW100A3 built with 110A breaker instead of 100A: replace (fire risk)","applies":{"genFamilies":[],"modelRe":["^RXSW100A3"],"controllers":[],"codes":[],"serialFrom":"3013538240","serialTo":"3013538738","builtFrom":"","builtTo":""},"appliesText":"RXSW100A3 transfer switches, serial 3013538240 to 3013538738.","summary":"Some of these switches left the factory with a 110 amp service entrance breaker, which lets about 10% more current through on overload than the wire is sized for and can damage equipment or raise fire risk. Check new and installed units in the range and swap any 110 amp breaker for the 100 amp 0E7886H.","steps":["Check the service entrance breaker rating on every switch in the serial range, before install and on installed units.","If it is 110 amp, replace it with the 100 amp breaker 0E7886H.","Warranty: causal part A0001311299, 1 hour labor (plus travel if already installed in the field), 0E7886H as replaced part."],"priority":"high","confidential":true,"source":"Generac SIB24-03-W (A0005486550) Rev A, Mar 2024"},
  {"id":"gen-sib16-02-wac","brand":"Generac","number":"SIB16-02-WAC","docNo":"","rev":"A","date":"2016-04","type":"Service","title":"RTSW100A3: neutral-to-ground bond lug set screw not torqued","applies":{"genFamilies":[],"modelRe":["^RTSW100A3"],"controllers":[],"codes":[],"serialFrom":"3000094962","serialTo":"3000095021","builtFrom":"","builtTo":""},"appliesText":"RTSW100A3 transfer switches, serial 3000094962 to 3000095021.","summary":"The slotted set screw holding the neutral-to-ground bonding wire in the ground lug was not tightened at the factory. Tighten it to 50 in-lbs (5.6 Nm). Claim: 1 trip and 0.25 hr for installed switches, 0.25 hr only for switches in stock.","steps":["Turn the main breaker inside the switch OFF.","Remove the thumbscrew and outside cover, loosen the slotted release and remove the inside cover.","Tighten the slotted set screw on the ground bar lug (bonding wire) to 50 in-lbs (5.6 Nm).","Refit both covers and the thumbscrew."],"priority":"high","confidential":true,"source":"Generac SIB16-02-WAC Rev A, Apr 2016"},
  {"id":"gen-pib08-04-s","brand":"Generac","number":"PIB08-04-S","docNo":"","rev":"A","date":"2008-03","type":"Product","title":"Air-cooled stator bolt torque is 6 ft/lbs (not 12) - check for rotor drag","applies":{"genFamilies":["gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled home standby units when installing stator mounting bolts (bulletin dated 2008; it covers previous and then-current models).","summary":"Stator mounting bolts were once torqued to 12 ft/lbs; on all air-cooled units torque them to only 6 ft/lbs, as more can damage the stator can. A misaligned stator can side-loads the engine rear main bearing until it seizes.","steps":["Cross-tighten the stator bolts to 6 ft/lbs.","Turn the rotor and crank by hand using the plastic fan on the rotor shaft (not the starter) and feel for drag or binding.","If it binds, loosen the stator tie bolts and realign the stator can with the front and rear bearing carriers.","A buckled rib between the two vent cutouts on the engine end of the stator can also shows misalignment.","Rotor bolt torque: 30 ft/lbs."],"priority":"high","confidential":false,"source":"Generac PIB08-04-S Rev A, Mar 2008"},
  {"id":"gen-sib11-05-call","brand":"Generac","number":"SIB11-05-CALL","docNo":"","rev":"","date":"2011-09","type":"Service","title":"QT 22-48kW Nexus: change fuel type setting for NG/LP conversion","applies":{"genFamilies":["gen-generac-protector-qt-nexus"],"modelRe":[],"controllers":["Nexus"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All 22-48kW QT Series generators with the Nexus controller, including private labels.","summary":"After converting the fuel system per the owner's manual (NG to LP vapor or back), the Nexus controller's Fuel Type setting must also be changed. Information only, no warranty.","steps":["Convert the fuel system following the owner's manual first.","On the Nexus keypad enter the password (arrow/Escape sequence shown in the bulletin; the arrows did not extract here).","Scroll with the arrow keys to Fuel Type, press Enter, change NG to LP or LP to NG, press Enter.","Go back into the menu to confirm the new fuel type saved."],"priority":"normal","confidential":false,"source":"Generac SIB11-05-CALL, Sep 2011"},
  {"id":"gen-pib09-04-hacg","brand":"Generac","number":"PIB09-04-HACG","docNo":"","rev":"","date":"2009-09","type":"Product","title":"\"Wiring may be unsafe\" lockout: board found AC on the DC control wires","applies":{"genFamilies":["gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"10-20kW air-cooled home standby units with the PCB introduced in September 2009.","summary":"The board self-tests at power-up for utility AC on the DC control circuits. If found, it shows \"Wiring may be unsafe\" and locks out the generator to protect itself. Bypassing this can void warranty.","steps":["Power the board down.","Fix the wiring: the usual mistake is N1 or N2 landed on terminals 23, 15B or 194.","Utility voltage must be present on N1 and N2 at the generator for the self-test to run and pass; power back up and confirm the warning is gone."],"priority":"normal","confidential":false,"source":"Generac PIB09-04-HACG, Sep 2009"},
  {"id":"gen-pib15-07-lccp","brand":"Generac","number":"PIB15-07-LCCP","docNo":"10000013303","rev":"B","date":"2017-03","type":"Product","title":"Coolant refill on D2.4L, D3.4L, 5.4L and 6.8L engines: open bleed plugs to purge air","applies":{"genFamilies":[],"modelRe":["^QT[0-9]{3}68"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Commercial/industrial generators with D2.4L (G16), D3.4L (G16) diesel or 5.4L (G3), 6.8L (G3) gaseous engines.","summary":"The normal refill can trap air in these engines, creating hot spots and permanent engine damage. When changing coolant, open the engine coolant plugs so air can escape.","steps":["Remove the engine coolant plugs (locations for each engine are in the bulletin figures).","Fill until coolant comes out of the plug holes.","Reinstall the plugs and top the system up to the proper level."],"priority":"high","confidential":true,"source":"Generac PIB15-07-LCCP (10000013303) Rev B, Mar 2017"},
  {"id":"gen-pib07-11-s","brand":"Generac","number":"PIB07-11-S","docNo":"","rev":"","date":"2007-05","type":"Product","title":"Propylene glycol coolant: use the new valve part numbers","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All generators running propylene glycol coolant.","summary":"If a coolant valve leaks at the stem seal or will not work on a unit with propylene glycol coolant, replace it with the newer valve part number.","steps":["1/2\" NPT: old 099305A, use 0G5212A.","3/8\" NPT: old 099305B, use 0G5212B."],"priority":"info","confidential":false,"source":"Generac PIB07-11-S, May 2007"},
  {"id":"gen-sib09-05-hac","brand":"Generac","number":"SIB09-05-HAC","docNo":"","rev":"","date":"2010-01","type":"Service","title":"8kW air-cooled below serial 5678957: install airbox gasket 0H0883","applies":{"genFamilies":["gen-guardian-nexus-8","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"5678957","serialToExclusive":true,"builtFrom":"","builtTo":""},"appliesText":"8kW home standby generators below serial 5678957.","summary":"Shows where airbox gasket 0H0883 goes on these 8kW units and the order to tighten the fasteners. The bulletin is almost all picture; the text gives only part numbers.","steps":["Fit airbox gasket 0H0883 in the location shown in the bulletin drawing (part 0G6617 is also called out there).","Tighten the fasteners in the numbered sequence shown in the drawing (#1, #2, #3)."],"priority":"normal","confidential":false,"source":"Generac SIB09-05-HAC, Jan 2010"},
  {"id":"gen-sib14-14-eliq","brand":"Generac","number":"SIB14-14-ELIQ","docNo":"","rev":"B","date":"2021-07","type":"Service","title":"Replacing an Evolution panel on a liquid-cooled Protector: set V-Code and Parameter Group","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600"],"modelRe":["^RD\\d","^G00(71920|72000|71970|71940|72010|79600|79610)"],"controllers":["Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any liquid-cooled Protector (RG gaseous, RD diesel, ECM 4.5L, Demand Response, 50 Hz and Telecom units) with an Evolution controller, only when the Evolution panel is being replaced.","summary":"A new Evolution panel must be set to the exact Voltage Code and Parameter Group for the unit model before it is started; running it misconfigured can badly damage the unit and that damage is not covered by warranty. This is not a way to change a unit's voltage code.","steps":["Record kW, engine size and voltage from the data label. Model decode: RD = Protector diesel, RG = Protector gaseous; next 3 digits = kW, next 2 = litres (e.g. 24 = 2.4L), then voltage letter (A 120/240 1-ph, G 120/208 3-ph, J 120/240 3-ph, K 277/480 3-ph, M 110/220 1-ph 50 Hz), fuel (D/N/V), enclosure (A/S), last letter X = non-emissions, C = catalyst.","Look up the V-Code and Parameter Group in the bulletin table for that model (catalyst units use the Emissions V-Code). The table did not extract cleanly here - use the bulletin table.","Mount and power the panel; the Install Wizard asks for time, exerciser and Parameter Group. A CANBUS alarm on first power-up can be ignored - press ESC three times before entering the passcode.","Dealer menu: enter V-Code using every digit (code 11 = 00011; a blank 0 turns to X and is rejected), then set/verify Parameter Group. Check firmware/hardware versions on the Display screen and update if needed.","Set switch type, pickup volts, startup delay, fuel type (password protected) and other site settings, then ESC to main menu.","Power-cycle: pull the 7.5 A fuse, disconnect T1 (T2 if fitted) and the battery negative, wait 15 seconds, reconnect all.","Open the MLCB, run in MANUAL and check output with a calibrated meter: must be within +/-1% of rated. If not, use Calibrate Volts (raising the number lowers output voltage).","Test on building load if possible (QT TEST checks exercise), then close the MLCB and set unit and ATS to AUTO. Warranty: file WIB15-03-GALL with the claim; flat rate 0.3 hr."],"priority":"high","confidential":true,"source":"Generac SIB14-14-ELIQ Rev B, Jul 2021"},
  {"id":"gen-pib20-05-x","brand":"Generac","number":"PIB20-05-X","docNo":"A0000982622","rev":"A","date":"2020-11","type":"Product","title":"Power Zone Permissive & Load Shed (P&L) module: new Active Mode and how to set it","applies":{"genFamilies":[],"modelRe":["^G0071490","^G0071500"],"controllers":["Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Power Zone P&L Module G0071490 (NEMA 1) and G0071500 (NEMA 3R) with P&L firmware A0000507400 Rev H, controller firmware 10000008736 Rev L and display 10000045269 Rev 1.12.1803, used on Modular Power Systems (MPS).","summary":"New P&L firmware adds Active Mode, which adds or sheds loads from actual kW/load on each generator instead of predicted power (Passive Mode, the old behaviour). In Active Mode a permissive and its load shed are never active at the same time. Information only.","steps":["On a Power Zone Pro Sync display go to Setup > Modules > Permissive and Load Shed Setup.","Tick \"Include\" for each generator tied to the P&L, tick \"Pin Connected\" if the gen-ready hardware input is wired, tick \"3 Wire Start Enable\" only if used, and set 2/3 wire start polarity (3-wire is always opposite the 2-wire setting).","\"Special ATS Operation\" (if chosen) still controls only Permissive 1 and the 6 load sheds - unchanged from older firmware.","Pick Active or Passive under \"P&L Operation Mode Selection\". Active Mode needs three load percentages (1-99) with Load Percentage 3 > Load Percentage 2 > Load Percentage 1, plus critical load, activation delay and the load of each permissive.","Behaviour: below Load Percentage 1 permissives turn on one per activation delay; Load Percentage 1-Load Percentage 2 a permissive is added only if it keeps load under Load Percentage 2; Load Percentage 2-Load Percentage 3 permissives drop after the delay; above Load Percentage 3 they drop immediately, one every 2 seconds.","If the P&L alarms that a permissive is changing state too often, re-pick the load percentages.","If all generator communication is lost, P&L falls back to Passive Mode using the generator digital inputs. Base-station LCM support requires Active Mode."],"priority":"normal","confidential":true,"source":"Generac PIB20-05-X (A0000982622) Rev A, Nov 2020"},
  {"id":"gen-legacy-archived-bulletins-1987-2006","brand":"Generac","number":"Legacy Archived Bulletins 1987-2006","docNo":"","rev":"","date":"","type":"Product","title":"List of retired Generac bulletins (up to 2008) still available by email","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Older Generac products (portables, RV, pressure washers, legacy standby, early DCP/H-panel industrial); the list runs from PIB87 to 2008 WIBs.","summary":"An index of old PIB/PUB/WIB bulletins removed from GenService. Any of them can still be requested from Generac by document number. No repair content of its own.","steps":["Find the bulletin number in the list (e.g. PIB06-05-S H-100 Firmware Upgrade, PIB02-21-S,G Disabling Standby Generators for Maintenance).","Email service@generac.com with the document number to get a copy."],"priority":"info","confidential":false,"source":"Generac GenService \"Legacy Archived Bulletins\" list"},
  {"id":"gen-sib15-18-hac-eb","brand":"Generac","number":"SIB15-18-HAC EB","docNo":"","rev":"B","date":"2015-10","type":"Service","title":"PowerPact 5.6 kVA 50 Hz: engine mount brackets installed backwards","applies":{"genFamilies":[],"modelRe":["^G?0065200"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"PowerPact 5.6 kVA 50 Hz, model 0065200 only.","summary":"Engine mount brackets were fitted with the notch facing the alternator side. This can cause low power when hot, fan noise from a rotor bolt rubbing the end panel, and hard reassembly after major work. Flip the brackets so the notch faces the engine intake fan. Warranty: 1.0 hr plus 1 trip.","steps":["Pull the 7.5 A fuse, kill utility to the controller (N1, N2, T1, T2), disconnect battery negative, remove roof and side panels.","Remove the mixer access panel (carburetor side) and the bellows.","Loosen the 13 mm nuts on both bearing-carrier vibration mounts until flush with the stud tops, then remove the 13 mm vibration-mount nuts and the 15 mm engine-bracket nuts on both sides.","With wood cribbing (2x4x4) and an 18 in pry bar, lift the front of the engine, block it, and swap the brackets side to side so the notch faces the intake fan.","Refit the 15 mm nuts snug, lift and remove the cribbing, align the vibration-mount studs with the pry bar, refit the 13 mm nuts snug.","Torque the 13 mm and 15 mm nuts to 15-20 ft-lbs (20-27 Nm).","Refit bellows and mixer panel, reconnect battery, fit the 7.5 A fuse, restore N1/N2 and T1/T2, test run, refit panels and roof."],"priority":"normal","confidential":true,"source":"Generac SIB15-18-HAC EB Rev B, Oct 2015"},
  {"id":"gen-sib20-01-ci","brand":"Generac","number":"SIB20-01-CI","docNo":"A0000525092","rev":"B","date":"2020-01","type":"Service","title":"G4.5L / G9.0L engines: line up flex plate and flywheel bolt patterns at assembly","applies":{"genFamilies":[],"modelRe":["^[A-Z]G\\d{3}(45|90)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All generators with a Generac G4.5L or G9.0L engine.","summary":"If the crankshaft-to-flywheel bolts are not clocked correctly to the flex-plate-to-rotor-hub bolts, they can hit each other, making assembly hard or causing damage. Mark both bolt patterns and assemble with the marks at 90 degrees. Information only.","steps":["With a straight edge, find the hole set in the center of the flex plate that lines up with holes at its outer edge; mark a line across the whole flex plate on both sides.","On the engine flywheel, find the holes that line up with a pair of crank-to-flywheel bolts and mark a line across the flywheel face.","When fitting the flex plate to the alternator fan, make sure the bolt holes line up with the fan openings for tool clearance.","Install the alternator onto the flywheel with the flex-plate mark and the flywheel mark perpendicular to each other.","Confirm the flywheel bolts sit clear of the flex-plate bolts with no interference."],"priority":"normal","confidential":true,"source":"Generac SIB20-01-CI (A0000525092) Rev B, Jan 2020"},
  {"id":"gen-sib24-13-c","brand":"Generac","number":"SIB24-13-C","docNo":"A0005644069","rev":"C","date":"2026-01","type":"Service","title":"Warning 2680 Low Fuel Level (diesel): test the fuel level sender and harness first","applies":{"genFamilies":[],"modelRe":["^G00(72000|72010|79610|72001|71910|71920|71940|79600|71921)","^RD\\d"],"controllers":["Evolution","Power Zone 410"],"codes":["2680"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G0072000, G0072010, G0079610, G0072001, G0071910, G0071920, G0071940, G0079600, G0071921, RD units and D2.2, D2.3, D3.3, D4.5 and D6.7 units (Evolution or Power Zone 410 controller).","summary":"2680W Low Fuel Level warnings are often blamed on the fuel level sender; follow these checks before replacing it. The warning takes 60 s to set and 60 s to clear and cannot be cleared by hand. For warranty units, get a Control Number from technical support before claiming or ordering.","steps":["Take the unit out of auto and review all alarm and event logs in History. Check the plastic sender housing for cracks or water inside.","Evolution: check the small cable at the bottom of the controller (BCH, J11 & J12). Black = T-Mobile EVO (warning between 10% and 50% fuel); white = standard EVO (10% to 20%). Power Zone 410 limits are user-set.","With harness plugged in, back-probe J3-4 to J3-5 (Power Zone 410: PZ3-16 to PZ3-17) for DC volts; then unplug J3/PZ3 and measure ohms at the same points.","Sender out of tank, sweep the arm slowly and watch for OL: about 248-252 ohms at empty down to 26-27 ohms at full (Empty 230-252, 1/4 145-160, 1/2 95-105, 3/4 60-65, Full 25-30 ohms).","Plugged in, sweep for DC volts: Empty 1.6-1.7 V, 1/4 1.15-1.2 V, 1/2 0.83-0.85 V, 3/4 0.54-0.58 V, Full 0.25-0.3 V.","If readings are off, unplug J3/PZ3 and the FLS connector and check wires 591 and 575 for 0-5 ohms while jiggling the harness (use a needle probe on the FLS plug; pin numbers in the bulletin text are inconsistent - confirm on the wiring diagram). Some units have extension harness 0K4282.","Replace the sender if damaged or the logs are full of alarms; with no spare, swing the arm FULL to EMPTY 30 times. T-Mobile EVO (black T1 charger cable) or Power Zone 410 with a full-size TwinSite 240-30 ohm sender: order kit A0008903981 (hall-effect). The TwinSite Jr dial has no drop-in replacement.","Reinstall, plug everything in and return the unit to auto."],"priority":"normal","confidential":true,"source":"Generac SIB24-13-C (A0005644069) Rev C, Jan 2026"},
  {"id":"gen-sib19-02-cyd","brand":"Generac","number":"SIB19-02-CYD","docNo":"A0000104333","rev":"A","date":"2019-06","type":"Service","title":"D2.4 / D3.4 diesel: stainless fuel lines can rub battery cables and leak - wrap and reroute","applies":{"genFamilies":[],"modelRe":["^G00(71980|71940|72010)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"D2.4 configured generators with stainless steel fuel lines; G0071980, G0071940, G0072010; D3.4 modelized and configured generators with stainless steel fuel lines.","summary":"Stainless fuel lines may touch the battery cable at the starter, the battery terminal or the battery disconnect, which can damage the line and leak fuel. Wrap the lines in Mylar reflex wrap, reroute away from battery cables and harness, and hold with a P-clamp. Do it at the next service; claim parts plus 0.5 hr.","steps":["Photograph the fuel line routing, inspect the whole line and nearby harness, photograph any damage, and replace a damaged fuel line.","If routing already matches the corrected layout in the bulletin, no rework is needed. Otherwise disable the unit and disconnect the fuel return line(s) from the engine (have rags and a container ready).","Slide each line through reflex wrap, peel the white strip and squeeze the wrap onto the line.","D2.4L: route as shown in the bulletin and secure with P-clamp and hardware (055934D clamp, G022237, G022131; parts list also shows G051756, M10 flat washer and wrap 0F5512A - check the bulletin parts table).","D3.4L: use kit A0000104336; put the P-clamp around both wrapped lines and bolt it to the engine block; keep lines off battery contact points and clear of the throttle arm.","Reconnect, prime the fuel system, run and check for leaks.","Email SIB1902CYD@generac.com with before/after photos, damage photos, unit serial number and run hours."],"priority":"high","confidential":true,"source":"Generac SIB19-02-CYD (A0000104333) Rev A, Jun 2019"},
  {"id":"gen-pib10-05-hall","brand":"Generac","number":"PIB10-05-HALL","docNo":"","rev":"C","date":"2010-09","type":"Product","title":"H-Panel Rev E: pulling fuse F2 can crank/start the engine - add jumper wire","applies":{"genFamilies":["gen-generac-protector-sg-h100"],"modelRe":[],"controllers":["H-100"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"2010-02-01","builtTo":"2010-06-15"},"appliesText":"Generators built after Feb 1, 2010 and before June 15, 2010 with H-Panel part 0F2815 Rev E; also any field swap of a Rev D-or-earlier H-Panel PCB for Rev E or later (start at the battery step).","summary":"URGENT: on these H-Panels, removing or blowing fuse F2 can make the engine crank and possibly run. Add a red jumper wire as shown. Flat rate 20 minutes.","steps":["Switch to OFF. Check the build date, then open the H-Panel: if a red wire already comes out of the J1 connector, it was fixed at the factory - stop.","Disconnect battery negative and shut off fuel. Parts: 28 in red 18 AWG 300 V wire (064765S), pink 18-22 AWG butt splice (051899), blue 14-16 AWG butt splice (031723).","Cut the wire from fuse F2 to H-Panel J1-35 (15B on 12 V, 220B on 24 V) about 6 in from F2, strip 1/4 in, and join both cut ends plus one end of the red wire in the blue splice.","Remove the longer wire 15A/220A from relay board RB1 terminal 12 (Fiat: RB2 terminal 9 on 12 V or terminal 6 on 24 V), cut off the lug, strip 1/4 in and join it to the red wire with the pink splice.","Reconnect battery negative. Test: pull F2 - the engine should try to crank then stop immediately.","Put the supplied modified wiring diagram in the owner's manual or on the unit."],"priority":"high","confidential":false,"source":"Generac PIB10-05-HALL Rev C, Sep 2010"},
  {"id":"gen-sib11-08-wall","brand":"Generac","number":"SIB11-08-WALL","docNo":"","rev":"","date":"2011-06","type":"Service","title":"GenReady load center: slider bar binds and won't transfer (no power)","applies":{"genFamilies":[],"modelRe":["^G?005(4480|4490|4510|4520|4530|4540|4560)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"GenReady panelboards 0054480, 0054510 (Basic), 0054490, 0054520 (Advanced with operator), 0054530 (Basic NEMA 3R), 0054540, 0054560 (Advanced with operator NEMA 3R).","summary":"The slider bar can bind on the breaker operating handle, so the GenReady fails to transfer to or from standby and the house loses power. A badly mounted unit or bent deadfront strap can cause it. Replace with the new style slider bar 0G3296. Warranty (registered warranty only): 0.2 repair, 0.5 diagnostic, 1.0 trip.","steps":["Check the transfer mechanism is mounted solid, level and square and the deadfront strap is not bent.","Open all breakers feeding the GenReady, set the generator to OFF, remove the deadfront and verify no power.","Check the Utility and Standby breakers move smoothly both ways.","Remove the old slider bar (take off the breaker hold-down bracket and operator, lift the 125 A 2-pole switches in the middle).","Fit new slider bar 0G3296 (it is longer than the original - that is OK), reseat the 125 A switches, refit operator, bracket and deadfront.","Test: utility disconnect (200 A) and 125 A feeds ON, generator in AUTO with its breaker closed; turn utility OFF - unit starts and transfers; turn utility ON - it retransfers after the return delay and cools down. Leave set for auto."],"priority":"normal","confidential":false,"source":"Generac SIB11-08-WALL, Jun 2011"},
  {"id":"gen-sib20-15-c45","brand":"Generac","number":"SIB20-15-C45","docNo":"A0001004982","rev":"A","date":"2020-10","type":"Service","title":"Protector G4.5L (Evolution): blank serial number blocks activation - load firmware and enter SN","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":["^.G0(48|60|80)45"],"controllers":["Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Protector models with an Evolution panel and a G4.5L engine (natural or turbo): model numbers xG04845, xG06045 or xG08045. Do at start-up.","summary":"Some controllers show a blank serial number, so the activation code cannot be validated. Load the latest firmware by USB, then enter the unit serial number exactly as on the data decal.","steps":["Load file Sfevo.Gen (version 1.07 or later, from GenService) in the root of a USB stick - not in a folder.","Plug the USB into the controller and power it up. The LED by the USB port flashes; it takes over a minute. Don't touch it until the language screen shows, then remove the USB.","Go through the install wizard. If an SN screen shows XX's, enter the 10-digit serial from the generator decal with the up/down arrows (ESC backs up one digit).","Check every digit before pressing ENTER - once all 10 are saved it cannot be re-entered. If the controller SN does not match the data plate, the controller must be exchanged.","You will see \"Not Activated\"; press ENTER, confirm the serial on the activation screen matches the decal, then finish activation and installation.","If no SN screen appears with firmware 1.07+, the serial is already good - go on to activation. Wrong serial saved or mismatch: contact Generac service."],"priority":"normal","confidential":true,"source":"Generac SIB20-15-C45 (A0001004982) Rev A, Oct 2020"},
  {"id":"gen-pib15-01-acg","brand":"Generac","number":"PIB15-01-ACG","docNo":"","rev":"A","date":"2015-03","type":"Product","title":"GP 15 / 17.5 kW portable: how to bond neutral to frame for stand-alone use","applies":{"genFamilies":[],"modelRe":["^GP ?(15|17\\.?5)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All GP 17.5 kW and GP 15.0 kW portable generators (not home standby).","summary":"These portables ship with neutral NOT bonded to the frame. When used as a stand-alone source, bond neutral to ground as shown so it meets the NEC without needing a ground rod. Information only.","steps":["Unit OFF, battery cables off. Remove the customer connection panel fasteners and pull the panel forward.","Remove the three neutral conductors from the white neutral terminal of the 50 A 240 V receptacle and land them, one per terminal, on a fully insulated 5-position connector block (Polaris IPL 4-5). Gray = alternator neutral, white = jumpers.","Torque each terminal to 25 in-lbs (2.8 Nm).","Run a new #6 AWG stranded white copper wire from block position 4 back to the receptacle neutral terminal, 25 in-lbs.","Run a #8 AWG stranded green (or green/yellow) wire from the frame ground stud through the alternator-lead bushing; ring-terminal it on the stud and land it on the last block position, 25 in-lbs. Refit terminal covers and panel.","Label the connection box \"NEUTRAL BONDED TO GENERATOR FRAME\". A ground rod may still be needed - check local code."],"priority":"info","confidential":true,"source":"Generac PIB15-01-ACG Rev A, Mar 2015"},
  {"id":"gen-pib05-14-s","brand":"Generac","number":"PIB05-14-S","docNo":"","rev":"","date":"2005-09","type":"Product","title":"Removing/replacing wires in Deutsch and Amp connectors, and safe test probing","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"General tip for any Generac harness using Deutsch (e.g. 12-position housing 0C5146 with wedge 0C5148) or Amp style connectors.","summary":"How to take wires out of Deutsch and Amp connectors without damage and how to test without wrecking the pins. Never power a connector while it is apart.","steps":["Deutsch: pull the wedge with the hooked end of tool DT/RT1 (Ladd Industries) - hook the slot, turn 90 degrees, pull; or gently pry with the tool's flat end. Release the locking tab and pull the wire.","Deutsch refit: push the terminal in from the back until it locks, tug-test, refit the wedge and check the terminal sits just below the wedge face.","Amp: lift the end tabs carefully and slide the face forward to its stop only - do not remove it fully. Push, rotate and pull the wire to release it; push in until it locks, slide the face back, tug-test.","Testing: back-probe with slim leads; on live assembled harnesses use piercing probes (tape the insulation after) or a breakout box/test cable. Connectors must be assembled if testing with power."],"priority":"info","confidential":false,"source":"Generac PIB05-14-S, Sep 2005"},
  {"id":"gen-pib25-01-c","brand":"Generac","number":"PIB25-01-C","docNo":"A0008979614","rev":"A","date":"2025-07","type":"Product","title":"Power Zone firmware 1.24+: dealer login needs new 8-character V2 credentials","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro Sync","Power Zone Pro","Power Zone Gateway"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Power Zone Pro Sync, Power Zone Pro and Power Zone Gateway running firmware 1.24 or higher.","summary":"Firmware 1.24 uses new V2 credentials: 8 characters, upper-case letters and numbers only. Old 11-character credentials do not work on 1.24+, and V2 credentials do not work on 1.23 or older. Information only.","steps":["Update the Power Zone Credential Generator app on your laptop from GenService; Help > About must show version 2.0.0.0 or higher.","The app now produces both the V2 8-character credentials (light blue bordered box) and the old 11-character ones.","Power Zone 1.24+: plug in the Generac service USB dongle as usual and log in with the 8-character V2 credentials (login box also has a light blue border).","Power Zone 1.23 and older: keep using the 11-character credentials."],"priority":"normal","confidential":true,"source":"Generac PIB25-01-C (A0008979614) Rev A, Jul 2025"},
  {"id":"gen-sib25-18-c","brand":"Generac","number":"SIB25-18-C","docNo":"A0009265865","rev":"A","date":"2025-08","type":"Service","title":"Power Zone 410 replacement controller must be Rev E+ for over-the-air firmware updates","applies":{"genFamilies":[],"modelRe":["^XG\\d","^RG0\\d{2}"],"controllers":["Power Zone 410"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Liquid-cooled XG and RG Protector Series generators with a Power Zone 410 controller.","summary":"Power Zone 410 bootloader cannot be field-updated; over-the-air firmware updates through the cellular connectivity accessory (GGCAC) need bootloader 1.0, found on controller A0000660367 Rev E or higher. XG replacements must be Rev E+. RG units only need Rev E+ if the owner wants OTA updates; a swap just for that is not warrantable.","steps":["Read the part number decal on the bottom of the controller. Rev D or lower does not support OTA updates.","XG Series needing a controller: install A0000660367 Rev E or higher only.","RG Series: Rev E+ only if the customer wants OTA updates (not warranty unless the original controller failed in warranty; a warranty replacement can be Rev E+).","From Q3 2025, newer controllers also have an updated display decal: orange AUTO button symbol and written AUTO/OFF/MANUAL labels."],"priority":"normal","confidential":true,"source":"Generac SIB25-18-C (A0009265865) Rev A, Aug 2025"},
  {"id":"gen-a0012861179","brand":"Generac","number":"A0012861179","docNo":"A0012861179","rev":"A","date":"2026-08","type":"Service","title":"G25.8L industrial: rework harness 10000030919 to A0006882990 for 23-pin throttle body","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G25.8L and G30 industrial units with Power Zone Pro Sync, only when changing Woodward throttle body 0L3648 (14-pin) to A0005763006 (23-pin).","summary":"When the 14-pin Woodward throttle body is replaced by the 23-pin one, re-pin harness 10000030919 into the new 23-position connector so it becomes A0006882990. Information only.","steps":["Find the 14-position throttle body connector (GA) on harness 10000030919.","With a small flat screwdriver, push the red lock up and pull the black tab to remove it, then de-pin each wire by pressing the black locking tabs.","Take 23-position connector 0E5431C, make sure its red lock is open, and insert each wire in its pin location per the bulletin figure (pin map is in the picture - see the bulletin). Each should click.","Tug-test every wire, then press the red lock down.","Relabel the harness \"A0006882990 - Rev A\" at the original label by the PZC connector."],"priority":"normal","confidential":true,"source":"Generac A0012861179 Rev A, Aug 2026"},
  {"id":"gen-sib10-06-call","brand":"Generac","number":"SIB10-06-CALL","docNo":"","rev":"","date":"2010-07","type":"Service","title":"0E9668 control board (3.0L/3.9L): DIP switch setup and governor tuning","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators with an 0E9668 series control board on 3.0L or 3.9L engines.","summary":"Setup for a new 0E9668 board: DIP switches choose 50/60 Hz and ATS vs GTS transfer switch, and three pots (gain, stability, differential) tune the governor if the engine hunts. Information only.","steps":["Set DIP switches with the AUTO/OFF/MANUAL switch in OFF, then hold Set Exercise for 5 seconds to save.","DIP 1: text says OFF = 60 Hz, ON = 50 Hz (the small table in the bulletin reads the other way - confirm). DIP 2: OFF = HS/RTS switch (ATS mode); ON = GTS mode using 2-wire start terminals 178 and 183. DIP 3-4 unused.","Governor default: all three pots full CCW, then a fraction of a turn CW so the slot forms an \"X\" (fraction did not extract - see the bulletin).","If it hunts: move DIP switch 8 to test mode (OFF) as printed, set all three pots full CCW; at no load raise GAIN as far as stable; apply 1/4, 1/2, 3/4 and full load and back gain off if unstable.","At full load raise STABILITY until it returns to 60 Hz (50 Hz units: 50 Hz); step load back down and reduce stability if unstable.","Use DIFFERENTIAL to speed recovery and cut over/undershoot; too much causes oscillation - it can be left at zero (full CCW)."],"priority":"info","confidential":false,"source":"Generac SIB10-06-CALL, Jul 2010"},
  {"id":"gen-pib22-06-z","brand":"Generac","number":"PIB22-06-Z","docNo":"A0003345978","rev":"A","date":"2022-10","type":"Product","title":"Power Zone Pro / Pro Sync: built-in Wi-Fi and Bluetooth removed, Gateway added","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro","Power Zone Pro Sync","Power Zone 410"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Units with Power Zone Pro built after April 2022 and units with Power Zone Pro Sync built after June 2022.","summary":"The onboard Wi-Fi and Bluetooth chips were removed for security; use an approved USB plug-in device if wireless is needed. Power Zone Pro units now use the Power Zone Gateway instead of the Connectivity Server. Information only.","steps":["Do not expect built-in Wi-Fi/Bluetooth on these controllers; use a Generac-tested USB device if the site allows wireless.","Power Zone Gateway has an Ethernet port, an RS-485 port for building management and two USB ports for data downloads and firmware updates.","Gateway enables SNMP3 and Modbus TCP for the generator control and the TX transfer switch; TX integration first on the Power Zone 410 Gateway, Pro/Pro Sync to follow.","Updated submittals are in the GenConnect Submittal Book."],"priority":"info","confidential":true,"source":"Generac PIB22-06-Z (A0003345978) Rev A, Oct 2022"},
  {"id":"gen-sib10-10-l24g","brand":"Generac","number":"SIB10-10-L24G","docNo":"","rev":"","date":"2010-04","type":"Service","title":"How to read the engine oil dipstick correctly (avoid false high/low readings)","applies":{"genFamilies":[],"modelRe":["^QT0(22|27)24"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All CPL based product (bulletin example is a 2.4L 22/27 kW liquid-cooled unit).","summary":"The dipstick can read wrong if checked hot, read on the high side, or pulled too fast. Use this procedure for an accurate oil level.","steps":["Check cold if possible; if it was running, wait at least 10 minutes.","Pull the dipstick and wipe it with a clean lint-free cloth.","Insert it slowly and look to confirm it is fully seated (some need more effort).","Wait 10 seconds, pull it, and read both sides - the lower reading is the correct level.","After adding or changing oil, run 1 minute, wait the full 10 minutes, then recheck from the start."],"priority":"info","confidential":false,"source":"Generac SIB10-10-L24G, Apr 2010"},
  {"id":"gen-pib13-15-arm","brand":"Generac","number":"PIB13-15-ARM","docNo":"","rev":"A","date":"2013-10","type":"Product","title":"Wireless remote monitor: drill your own mounting holes on 2013+ air-cooled units","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-powerpact-7-75","gen-corepower-7"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"2013 and later air-cooled home standby generators.","summary":"Air-cooled units are no longer built with the holes and plate for the Basic/Advanced wireless monitor kits. Use the full-size template in the bulletin to drill them. Information only.","steps":["Print the template on the bulletin's page 3 at full scale (do not resize) and cut it out.","Tape it to the rear panel, aligned with the left and top edges of the back panel, as shown in the bulletin.","Check inside for clearance and move wiring away, then drill the 3/16 in (4.75 mm) holes and the 1 in hole (template notes a Greenlee 1 in conduit knockout).","Touch-up paint the hole edges to stop rust on steel enclosures, then install the monitor per its own instructions."],"priority":"info","confidential":true,"source":"Generac PIB13-15-ARM Rev A, Oct 2013"},
  {"id":"gen-wib25-01-a","brand":"Generac","number":"WIB25-01-A","docNo":"A0008225102","rev":"A","date":"2025-07","type":"Warranty","title":"Low oil pressure switch 0L2917D: test first, warranty claim needs this form","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":["1300"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled home standby generators fitted with low oil pressure switch 0L2917D (10 PSI, normally open).","summary":"Before replacing a 0L2917D low oil pressure switch, test it per the diagnostic manual. A warranty claim for this switch must include the completed bulletin form (and leak photos if leaking) or it will be denied.","steps":["Test using diagnostic manual 10000041488 Rev E or later: Test 61, wire 86, E-code 1300.","Record: oil level full (yes/no), measured oil pressure, the ohm/continuity readings, whether the control board input changes from 1 to 0, and the voltage reading called for.","If leaking, note where: spade terminal, the joint where plastic meets metal, or the threads - and photograph it.","Submit the claim in GENService, then attach the completed form and photos."],"priority":"normal","confidential":true,"source":"Generac WIB25-01-A (A0008225102) Rev A, Jul 2025"},
  {"id":"gen-pib17-06-wac","brand":"Generac","number":"PIB17-06-WAC","docNo":"10000019002","rev":"B","date":"2017-09","type":"Product","title":"RXSW200A3 Smart AC Module Rev A: load priorities run backwards - relabel and rewire","applies":{"genFamilies":[],"modelRe":["^RXSW200A3"],"controllers":[],"codes":[],"serialFrom":"3001590548","serialTo":"3001977704","builtFrom":"","builtTo":""},"appliesText":"RXSW200A3 transfer switches, serial 3001590548 to 3001977704, with a Revision A integrated Smart AC Module (SACM).","summary":"Rev A SACM firmware returns AC loads in the reverse of the label and manual - the load labeled #4 comes back first. Apply replacement label 10000019047 and wire loads to match it.","steps":["Confirm the SACM is Revision A from the revision label at its top left (shows 10000004183 Rev. A). Change nothing if it is not Rev A.","Order and apply replacement SACM label P/N 10000019047.","New installs: wire AC load priorities to the replacement label.","Existing installs: apply the label and rewire AC loads to the priorities it shows. Do it at the next service visit or before installation."],"priority":"normal","confidential":true,"source":"Generac PIB17-06-WAC (10000019002) Rev B, Sep 2017"},
  {"id":"gen-sib20-17-h","brand":"Generac","number":"SIB20-17-H","docNo":"A0001073531","rev":"A","date":"2021-08","type":"Service","title":"Ground star washer installed upside down: check and flip (models 7175/7176/7180)","applies":{"genFamilies":["gen-guardian-evo2-10-22-compact"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Model 7176-0 serial 3006673880-3006673927; model 7180-0 serial 3006636090-30066366137 (as printed); model 7175-0 serial 3006387412-3006636137.","summary":"Some units may have the grounding star washer upside down, giving a poor ground path that can cause intermittent or wrong operation and equipment damage. Inspect and flip it so the points bite through the paint. Flat rate 0.25 hr.","steps":["Inspect the grounding (star) washer against the bulletin pictures.","Correct: outer points face down onto the painted surface so they cut through paint into metal.","If wrong, remove the fastener, flip the washer and reinstall.","Torque the fastener to 43-45 ft-lbs (58.3-61.01 Nm) as printed."],"priority":"normal","confidential":false,"source":"Generac SIB20-17-H (A0001073531) Rev A, Aug 2021"},
  {"id":"gen-pib16-02-is","brand":"Generac","number":"PIB16-02-IS","docNo":"10000003449","rev":"B","date":"2016-11","type":"Product","title":"H-100 industrial remote E-Stop kit: updated wiring diagram 0F5764D Rev E","applies":{"genFamilies":["gen-generac-protector-sg-h100"],"modelRe":[],"controllers":["H-100"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"2015-02","builtTo":"2016-03-02"},"appliesText":"Configured H-100 industrial units with the optional remote E-Stop alarm kit, built February 2015 to March 2, 2016 (16 gas and diesel engine sizes, D2.4 through G21.9 - see the list in the bulletin).","summary":"Updated instructions for wiring the remote emergency stop switch on these units. Use wiring diagram 0F5764D Rev E. Information only.","steps":["Confirm the unit is an H-100 configured industrial unit in the build window with the remote E-Stop kit.","Rewire the remote E-Stop per drawing 0F5764D Rev E (the diagram did not extract - see the bulletin).","Test the E-Stop shuts the unit down after wiring."],"priority":"info","confidential":true,"source":"Generac PIB16-02-IS (10000003449) Rev B, Nov 2016"},
  {"id":"gen-pib23-13-g","brand":"Generac","number":"PIB23-13-G","docNo":"A0005432931","rev":"A","date":"2024-03","type":"Product","title":"Enclosure hinge assemblies 0C3594 series replaced by two-piece slip hinges","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Various models using hinge assemblies 0C3594, 0C3594A, 0C3594B or 0C3594C.","summary":"The old M6 hinge assemblies are no longer sold; each is replaced by a male and a female slip hinge that must both be ordered. Information only.","steps":["0C3594 (M6 hinge LH top): order A0002098076 (male LH) + A0002098077 (female LH).","0C3594A (M6 hinge RH top): order A0002098074 (male RH) + A0002098075 (female RH).","0C3594B (M6 hinge LH bottom short): order A0002098079 (male LH) + A0002098077 (female LH).","0C3594C (M6 hinge RH bottom short): order A0002098078 (male RH) + A0002098075 (female RH). Table extracted partly garbled - confirm against the bulletin."],"priority":"info","confidential":true,"source":"Generac PIB23-13-G (A0005432931) Rev A, Mar 2024"},
  {"id":"gen-pib19-07-a","brand":"Generac","number":"PIB19-07-A","docNo":"A0000467086","rev":"A","date":"2019-12","type":"Product","title":"Light ticking from top of engine at first start is normal (hydraulic lifters)","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled units with hydraulic valve lifters.","summary":"After long storage or at first start-up, a light clatter or tick from the top end is the hydraulic lash adjusters filling with oil. It should fade and not get louder within five minutes. Information only.","steps":["Run the engine for five minutes and confirm the noise goes away.","If it gets much louder, sounds like heavy knocking, or comes from the bottom end, shut down at once.","Then check oil level and condition and inspect for internal engine damage."],"priority":"info","confidential":true,"source":"Generac PIB19-07-A (A0000467086) Rev A, Dec 2019"},
  {"id":"gen-sib13-12-sr-rts","brand":"Generac","number":"SIB13-12-SR-RTS","docNo":"","rev":"A","date":"2013-10","type":"Service","title":"RTS 150/200 A switches: hold the lug while torquing utility wires","applies":{"genFamilies":[],"modelRe":["^RTS[YG](150|200)A3"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Transfer switches RTSY150A3, RTSG150A3, RTSY200A3 and RTSG200A3.","summary":"Torquing the utility lug screw can twist the lug in the breaker. Back the lug up with a wrench while torquing. Information only.","steps":["Cut, strip and insert the wire in the lug.","Hold the lug with a 6 in or 8 in adjustable wrench.","Set a torque wrench to the value for the wire size printed on the breaker and insert the hex bit.","Push the adjustable wrench counter-clockwise while torquing so the lug does not shift; repeat on the other lug."],"priority":"info","confidential":true,"source":"Generac SIB13-12-SR-RTS Rev A, Oct 2013"},
  {"id":"gen-wib13-09-mlw","brand":"Generac","number":"WIB13-09-MLW","docNo":"","rev":"A","date":"2013-10","type":"Warranty","title":"Mobile Link: 1-year warranty covers travel and 0.5 hr labor (control number first)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Mobile Link products.","summary":"During the 1-year warranty, Mobile Link replacement is covered: one travel allowance and 0.5 hr total for diagnosis, replacement and programming, claimed online against the generator serial number.","steps":["Get a control number from Technical Service before replacing the Mobile Link.","Replacement Mobile Link: call 855-GENVIEW (855-436-8439).","File the warranty claim online against the generator serial number."],"priority":"info","confidential":true,"source":"Generac WIB13-09-MLW Rev A, Oct 2013"},
  {"id":"gen-sib13-07-gall","brand":"Generac","number":"SIB13-07-GALL","docNo":"","rev":"A","date":"2013-07","type":"Service","title":"Printed manual missing pages: print them from GenService","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All products.","summary":"Some printed manuals may be missing pages. Print the missing pages from the manual on GenService. Information only.","steps":["In GenService open Documentation > Product Manuals.","Enter the serial or model number, open the right manual and print the missing pages.","Manuals you can see depend on your dealer product level alignment."],"priority":"info","confidential":true,"source":"Generac SIB13-07-GALL Rev A, Jul 2013"},
  {"id":"gen-pib17-08-acwk","brand":"Generac","number":"PIB17-08-ACWK","docNo":"10000024217","rev":"A","date":"2017-12","type":"Product","title":"Cold Weather Kit G007103-1 on 50 Hz 230 VAC: add a step-down transformer","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Cold Weather Kit G007103-1 installed on air-cooled units in 50 Hz markets with 230 VAC single-phase utility (2013-2015 and 2016-and-newer units shown).","summary":"The G007103-1 cold weather kit runs on 120 VAC. Where utility is 230 VAC 50 Hz, a step-down transformer must be wired in ahead of the kit heaters. Not needed on 120/240 VAC 60 Hz US installs.","steps":["Power down per the owner's manual and pull the T1, T2, N1 and N2 fuses in the transfer switch.","Disconnect the heater leads from the T1 and NEUTRAL terminals on the input sense terminal block.","Mount the transformer on the engine divider panel with #8 x 1/4\" sheet metal screws (or bolts and nuts).","Input side: jumper transformer terminals 5 to 2; run wires from the generator T1/T2 WAGO block to terminals 6 and 1.","Output side: breather heater lead to 12 with a jumper to 8; second heater lead to 7 with a jumper to 11. Center terminal is not used. Use 18 AWG wire and insulated 3/16 quick-connects.","Re-install the T1/T2/N1/N2 fuses, covers and 7.5A DC fuse, finish the install wizard, close the generator breaker and set AUTO."],"priority":"info","confidential":true,"source":"Generac PIB17-08-ACWK (10000024217) Rev A, Dec 2017"},
  {"id":"gen-tib14-01-gd","brand":"Generac","number":"TIB14-01-GD","docNo":"","rev":"B","date":"2014-03","type":"Training","title":"How to field-test a Bosch electronic governor actuator (liquid-cooled)","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":["H-Panel","G-Panel","Nexus","Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any liquid-cooled gaseous or diesel generator with an H, G, Nexus or Evolution panel that uses a Bosch electronic governor actuator.","summary":"Field test for the Bosch governor: check the throttle plate (or arm) moves freely, confirm supply voltage, then read the feedback voltage on pin 6 at the stops. Replace the governor if it binds or the feedback is out of tolerance.","steps":["Shut down, set the controller to OFF (not AUTO/MANUAL), shut off fuel and remove the air intake to expose the throttle plate or arm.","Unplug the governor and move the plate/arm by hand from lower stop (LMS) to upper stop (UMS); it must move smoothly and spring back to rest. Replace if not.","Reconnect. Supply between wire 765 (pin 3) and 767 (pin 2) should be 5 VDC on H/G panels or 3 VDC on Nexus/Evolution.","Back-probe wire 766 (pin 6) to ground (pin 2 / wire 767) and sweep LMS to UMS: no spikes or sudden drops allowed.","Pin 6 targets (+/-10%): H/G plate 1.00 / 1.50 / 5.28 V; H/G arm 1.54 / 1.57 / 5.21 V (LMS / rest / UMS).","Evolution/Nexus plate 0.355 / 0.482 / 2.965 V; Evolution arm 0.467 / 0.482 / 3.000 V (LMS / rest / UMS).","Out of tolerance: replace the governor per the diagnostic manual, reassemble and test run."],"priority":"normal","confidential":true,"source":"Generac TIB14-01-GD Rev B, Mar 2014"},
  {"id":"gen-pib19-04-aac","brand":"Generac","number":"PIB19-04-AAC","docNo":"A0000313143","rev":"A","date":"2019-07","type":"Product","title":"Air-cooled site selection: CO, clearances, pad and water rules","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled generators.","summary":"Updated owner/installation manual wording for picking and preparing an air-cooled generator site: CO entry points, fire clearances, airflow, water, utilities and the pad. Use it to check an install or plan a new one.","steps":["Clearances: 3 ft (0.91 m) front and ends (includes shrubs/trees); 18 in (457 mm) rear to a wall per SwRI testing unless local code says otherwise; 5 ft (1.52 m) overhead.","No operable windows, doors, vents or wall openings near the unit; HVAC fresh-air intakes at least 10 ft (3048 mm) horizontally from the enclosure.","Removable fence panels no closer than 3 ft (0.91 m) in front; keep room to service the battery and engine.","CO alarms are required in the structure; smoke alarms do not detect CO.","Pad: area about 5 in (127 mm) deep and about 3 in (76.2 mm) bigger than the unit on all sides; unit level within 0.5 in (13 mm).","High ground only; keep downspouts, sprinklers, sump discharge and drifting snow off the unit and its air openings.","Roof/platform installs: 18 in from combustible walls, 5 ft from operable openings, noncombustible surface at least 12 in (30.5 cm) beyond the unit.","Do not lift or move the unit by the louvers."],"priority":"normal","confidential":true,"source":"Generac PIB19-04-AAC (A0000313143) Rev A, Jul 2019"},
  {"id":"gen-tib15-02-lcp","brand":"Generac","number":"TIB15-02-LCP","docNo":"","rev":"B","date":"2015-08","type":"Training","title":"Wiring and schematic diagrams for gaseous Protector liquid-cooled units","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Gaseous Protector liquid-cooled generators with the G1.5L G11, G2.4L G2 or G5.4L G3 engine.","summary":"These diagrams did not come up in the GENservice Product Manuals search, so the bulletin carries them. Use it when you need the wiring or schematic for these Protector engines.","steps":["G1.5L G11 Protector: wiring 0K8579-B, schematic 0K8580-A.","G2.4L G2 Protector: wiring 0K7685-A, schematic 0K7686-A.","G5.4L G3 Protector: wiring 0K8088-A, schematic 0K8089-A.","Most diagram pages did not extract as text; open the bulletin PDF to read them."],"priority":"info","confidential":true,"source":"Generac TIB15-02-LCP Rev B, Aug 2015"},
  {"id":"gen-wib18-01wy10","brand":"Generac","number":"WIB18-01WY10","docNo":"10000042849","rev":"A","date":"2018-08","type":"Warranty","title":"Eaton ATS warranty: storage rules, NEMA 3R heater, return parts","applies":{"genFamilies":[],"modelRe":[],"controllers":["ATC-300+","ATC-900"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Eaton automatic transfer switches sold through Generac (ATC-300+ and ATC-900 controllers).","summary":"Warranty is void if there is evidence of outdoor storage, and improper-storage damage is not covered. Switches stored over two years have warranty dated from ship date. Most ATC-300+ display/controller failures come from debris or condensation in the controller.","steps":["Store indoors in packaging, -30 to 85 C (-22 to 185 F), 80% RH or less; never stack anything on the enclosure.","NEMA 3R is not waterproof: outdoors or in damp rooms, recommend the heater (option 41) mounted at the bottom of the door.","Check the door gasket (top and both sides) for gaps or damage; the bottom is open on purpose for drainage.","Keep drill chips, dust, rain and pests out of the ATC-300+ (open space behind the display); blocks, odd characters or a blank backlit display point to contamination.","Warranty returns: ATC-300+/ATC-900 controllers, MCCB ATS power panels, motor break board, motor and aux switch assemblies, transformer assemblies, contactor/bypass assemblies, Magnum breakers, cable interlocks and trip units."],"priority":"info","confidential":true,"source":"Generac WIB18-01WY10 (10000042849) Rev A, Aug 2018"},
  {"id":"gen-sib14-04-all","brand":"Generac","number":"SIB14-04-ALL","docNo":"","rev":"C","date":"2014-03","type":"Service","title":"Undervoltage shutdowns in extreme cold: frost on slip rings","applies":{"genFamilies":["gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph"],"modelRe":[],"controllers":["Nexus","Evolution","Sync 2.0"],"codes":["1902"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled units with an undervoltage alarm (Nexus, Evolution, Sync 2.0) in humid, very cold weather.","summary":"Frost on the slip rings can cause undervoltage shutdowns in cold, humid areas. Running the unit a few times usually clears it. If not, compare rotor resistance before and after a run and warm the brush area with a hair dryer.","steps":["Before a trip: have the customer start the unit 2-3 times, clearing alarms between; if it then runs, the frost has worn off.","OFF and clear alarm. Per diagnostic manual 0H9172 rev F or later, Test 8: read rotor resistance from the 4 wire at the controller to the ground post. Record it.","Run in MANUAL until it shuts down, return to OFF, clear, repeat Test 8 and record.","Both readings in spec: not frost, follow normal diagnostics. High, open, or far apart: likely brush/slip ring obstruction.","Remove the front panel; heat between the exhaust divider and bearing carrier with a hair dryer (NOT a heat gun) for 3-5 min. Brushes are under the carrier on Nexus and earlier, on the front on Evolution.","Run in MANUAL. Makes voltage = frost. Still no voltage after two tries = not frost; normal diagnostics (Test 9 brushes/slip rings).","Warranty: 0.5 h diagnostic; send pages 2-3 of the bulletin plus photos of each undervoltage alarm in the log."],"priority":"normal","confidential":true,"source":"Generac SIB14-04-ALL Rev C, Mar 2014"},
  {"id":"gen-a0013195462","brand":"Generac","number":"A0013195462","docNo":"A0013195462","rev":"C","date":"2026-11","type":"Product","title":"Power Zone 200 firmware 1.8: new warnings 2761, 2172, 2782 and fixes","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph"],"modelRe":[],"controllers":["Power Zone 200"],"codes":["2761","2172","2782","2780","3115","3117","3215","3217","3415","3417","3515","3517","3815","3817","4315","4317","4915","4917","5115","5117","5215","5217","5415","5417"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled generators with Power Zone 200 controllers.","summary":"Controller firmware 1.8 adds new warnings, blocks updates during a critical alarm, powers down the ECM when idle and cuts phantom warnings. ECM (G22AB14903, G22BB15018, G22CB14903) and radio 1.11.4 updates were released too. OTA rollout from Nov 4, 2026; production from Nov 17, 2026.","steps":["Update blocked? Clear the critical alarm first (hold OFF 3 seconds). With Field Pro, leave the unit in OFF during the update.","2761 Missing Fuse/Battery: reinsert the control panel fuse and check battery cables.","2172 Left in Service Mode: shows after 12 hours; turn Service Mode off.","2782 Generator Battery Charger Problem: check the generator charging circuit; battery should be 13.8-14.1 V while running.","Fewer false warnings on 2780 and the ECM codes 3115-5417 listed in the bulletin.","New: Maintenance Schedule C can be reset; loadshed events now show in the Run Log (only when the generator logic commands it).","Units without cell or Wi-Fi: use the Offline Mode instructions."],"priority":"normal","confidential":true,"source":"Generac A0013195462 Rev C, Nov 2026"},
  {"id":"gen-pib21-01-i","brand":"Generac","number":"PIB21-01-I","docNo":"A0001323681","rev":"B","date":"2021-09","type":"Product","title":"Arc Energy Reduction (arc flash maintenance) mode on Power Zone Pro","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone Pro","Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All units with a Power Zone Pro or Power Zone Pro Sync controller.","summary":"The controller has a maintenance mode that shuts the generator down and kills excitation instantly when any phase current passes a set threshold, to cut arc flash clearing time (NFPA 70E, NEC 240.87). It is usually tied to a breaker shunt trip.","steps":["Enable with the Activate checkbox on the Arc Energy Reduction Mode screen, or a digital input set to Activate_Arc_Flash_Protection (either works).","Set Current Threshold (%) between 10% and 350% of rated current, below the arcing current from the site arc flash study; about 2x rated is a starting point if no study exists.","Input active with checkbox off: controller uses the last threshold if over 50%, else 100% rated; never set = 100% rated.","Map the Arc Flash Shutdown digital output to trip the breaker shunt trip.","A warning shows whenever the mode is active; a trip shows an Arc Flash Shutdown alarm."],"priority":"normal","confidential":true,"source":"Generac PIB21-01-I (A0001323681) Rev B, Sep 2021"},
  {"id":"gen-pib21-11-g","brand":"Generac","number":"PIB21-11-G","docNo":"A0002275664","rev":"","date":"2022-01","type":"Product","title":"Bulk 15W40 CK-4 diesel oil program; some oil and coolant SKUs dropped","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All commercial and industrial stationary and mobile products with diesel engines.","summary":"Generac sells 15W40 CK-4 conventional diesel oil in bulk (200 gallon minimum, ships in 5 business days, order on GENservice). 10W30, SAE30 and other 30W mineral oil SKUs are being discontinued, and heavy-duty coolant 0J5164A is replaced by 0J5166A.","steps":["Bulk 15W40 CK-4 oil: material code 622615001, 200 gal minimum, contiguous 48 states and parts of Canada.","Bottled/drum 15W40 synthetic diesel oil is still available.","10W30, SAE30 and other 30W mineral oil SKUs end when sold out.","Coolant: order 0J5166A 50/50 EG (standard duty, 6 gal per case) in place of discontinued 0J5164A."],"priority":"info","confidential":true,"source":"Generac PIB21-11-G (A0002275664), Jan 2022"},
  {"id":"gen-pib22-01-t","brand":"Generac","number":"PIB22-01-T","docNo":"A0002423702","rev":"C","date":"2022-04","type":"Product","title":"Wire and program a remote relay panel (RRP/RAP) on Power Zone 410","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone 410"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any unit with the Power Zone 410 control.","summary":"How to wire an RRP/RAP to the Power Zone 410 over RS485 and set its relays (running, critical failure, major fault, low fuel, fuel leak/overfill) with the RAP/RRP Configuration Tool. Service kit A0002510817 (RRP mounting for D2.2L compact).","steps":["Harness to TB1/TB2 at the back of the enclosure: 391 to TB1-5 (RS485-), 390 to TB1-4 (RS485+), shield TB1-6, 15A TB2-1 (fused DC), 0 TB2-3 (ground).","To program: power off the RRP/RAP and unplug the RS485 wires; set the laptop Ethernet to obtain an IP automatically and connect it to the RRP/RAP.","Power the RRP/RAP (12 VDC); run the RAP/RRP Configuration Tool from GENservice (Service Documents > PowerZone 410).","Confirm the MAC address shows, assign an alarm and NO/NC to each relay, disable Spare, Write Config, then Read Config to verify; Save Template for reuse.","Power off, remove Ethernet, reconnect RS485: RRP/RAP J14 pin 3 to Power Zone 410 J6 RS485+, J14 pin 2 to J6 RS485-."],"priority":"normal","confidential":true,"source":"Generac PIB22-01-T (A0002423702) Rev C, Apr 2022"},
  {"id":"gen-wib15-03-gall","brand":"Generac","number":"WIB15-03-GALL","docNo":"","rev":"A","date":"2015-04","type":"Warranty","title":"Controller replacement claims need this troubleshooting sheet attached","applies":{"genFamilies":["gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-powerpact-7-75","gen-corepower-7","gen-generac-protector-rg-evolution","gen-generac-protector-qt-nexus"],"modelRe":[],"controllers":["Evolution","Nexus","CorePower","PowerPact"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All 2013-and-newer air-cooled units (incl. PowerPact, Synergy, EcoGen) and commercial units with Nexus or Evolution controllers.","summary":"Warranty claims for Evolution, Nexus (QT liquid-cooled) and CorePower/PowerPact controllers must include the bulletin form showing the troubleshooting done. Follow the correct diagnostic manual and record the flow chart and test results.","steps":["Use the right manual: 0H9172 (air-cooled Evolution/Nexus), 0H9174 (CorePower/PowerPact), 0J1195 (liquid-cooled Evolution/Nexus), 0K9138 (Synergy VSCF).","Record dealer number, serial, controller part number/rev and manual part number/rev.","List the first 5 fault alarms with dates and the customer complaint.","Record the flow chart problem number and each test number with its result.","Print, fill in, scan and attach to the online claim."],"priority":"info","confidential":false,"source":"Generac WIB15-03-GALL Rev A, Apr 2015"},
  {"id":"gen-a0011009379","brand":"Generac","number":"A0011009379","docNo":"A0011009379","rev":"A","date":"2026-05","type":"Product","title":"DC charge alternator wiring on 4.5L and 9.0L gas engines (3 alternator styles)","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"XG4.5L, RG4.5L, RG9.0L, Industrial G4.5L and Industrial G9.0L units.","summary":"Some harnesses on these units have a DC alternator ground that must not be used with certain alternators. Identify the alternator by its back cover and wire it the right way.","steps":["10000009735 (metal back cover): needs separate ground wire 0 plus field flash wire 49 on the spade nearest the power terminal, one wire 13 ring on the power terminal. Bracket 10000013935 (4.5L) or 10000004267 (9.0L).","A0000919006 (plastic cover, field boost on the back, power terminal near center): no separate ground; zip-tie any ground ring back. Wire 49 on the spade nearest power terminal, one wire 13 ring on power. Bracket A0002943099 (4.5L) or A0001379344 (9.0L).","A0005622962 (plastic cover, field boost on the side, power terminal near edge): no separate ground; zip-tie the ground ring back. Wire 49 connector to the 4-pin side port, one wire 13 ring on power. Only on gas 4.5L with electric fans, bracket A0005628391."],"priority":"normal","confidential":true,"source":"Generac A0011009379 Rev A, May 2026"},
  {"id":"gen-sib20-13-ci","brand":"Generac","number":"SIB20-13-CI","docNo":"A0000964484","rev":"B","date":"2021-01","type":"Service","title":"G4.5L NA engine: rework crankcase breather to stop blockage","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-sg-h100"],"modelRe":["^RG04845","^HG04845","^SG0?(35|45|50)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RG04845 and HG04845 (A/G/J/K, NAC and NAX) and SG35-SG50 with the 4.5L NA engine (engines A0000680943, 10000020453, A000081466).","summary":"The old crankcase breather can clog, raising crankcase pressure and leading to engine component failure. Replace the air intake assembly with the new design and fit the new breather hose. Labor allowance 0.7 h.","steps":["Parts: gasket 10000021237, intake air machined 10000040368, breather hose A0000641302.","Disable the unit; remove and keep the air pressure sensor (do not let it hang by its wires).","Loosen the band clamp and swing the intake hose aside with the air filter still on.","Remove and discard intake assembly 10000045547, gasket, hose 0F0425D, 048031J clamps, A0000210998 barb and A000070027 grommet.","Fit new gasket 10000021237 and intake 10000040368; torque M8 nuts to 27 +/- 2.7 Nm.","Install the new breather hose, refit the intake hose and sensor, then start and run to confirm."],"priority":"high","confidential":true,"source":"Generac SIB20-13-CI (A0000964484) Rev B, Jan 2021"},
  {"id":"gen-sib09-04-hac","brand":"Generac","number":"SIB09-04-HAC","docNo":"","rev":"","date":"2010-01","type":"Service","title":"Maintenance alerts on LCD air-cooled units are not alarms: how to reset","applies":{"genFamilies":["gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled home standby units with the LCD display (16-20 kW models).","summary":"A maintenance alert (yellow LED on 16-20 kW) is often mistaken for an alarm. Maintenance alerts are not covered by warranty; reset them with Enter.","steps":["Press Enter at the alert and confirm; this resets the counters for all alerts shown and logs it in history.","Alerts show one at a time; clear one and the next appears.","Intervals: Inspect Battery 1 yr; Change Oil & Filter 200 h or 2 yr (100 h or 2 yr on 20 kW); Inspect Air Filter 220 h or 2 yr; Change Air Filter 200 h or 2 yr; Inspect Spark Plugs 220 h or 2 yr; Change Spark Plugs 400 h or 10 yr.","Counters stop without battery power; set time/date when prompted after battery is restored."],"priority":"info","confidential":false,"source":"Generac SIB09-04-HAC, Jan 2010"},
  {"id":"gen-sib10-04-call","brand":"Generac","number":"SIB10-04-CALL","docNo":"","rev":"","date":"2010-03","type":"Service","title":"DIP switch setup for 0H1176 R-200C replacement control boards","applies":{"genFamilies":[],"modelRe":[],"controllers":["R-200C"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Liquid-cooled units using the 0H1176 series R-200C control board (22/27/36 kW at 1800 rpm, 45/60 kW at 3600 rpm).","summary":"A new R-200C board must have its DIP switches set to match the unit. Change them in OFF, then hold Set Exercise for 5 seconds to load them. Technical manual is 0H1374.","steps":["Switch to OFF, set the DIPs, then press and hold Set Exercise for 5 seconds.","Frequency: OFF = 60 Hz, ON = 50 Hz (if capable).","Transfer switch: OFF = ATS mode (HS or RTS switch); ON = GTS mode (W-type switch, 2-wire start on 178/183).","Exercise speed: OFF = low speed, ON = normal speed. Fuel: OFF = LP vapor, ON = natural gas (still change the regulator).","Alternator kW: OFF = 22/27 kW (1800 rpm) or 45 kW (3600 rpm); ON = 36 kW turbo (1800) or 60 kW turbo (3600).","The text and the figure number the positions differently; check the DIP table in the bulletin against the board before setting."],"priority":"normal","confidential":false,"source":"Generac SIB10-04-CALL, Mar 2010"},
  {"id":"gen-pib15-02-gall","brand":"Generac","number":"PIB15-02-GALL","docNo":"","rev":"A","date":"2015-04","type":"Product","title":"Generator main breaker lug specs (40-630 A)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators with 40-630 amp main breakers.","summary":"Lug specs were removed from the manuals; this bulletin lists them. Breakers are UL 489 for 208/240/480 V with thermal-magnetic trip.","steps":["Lug part by breaker: 40-200 A use OF8451; 225-400 A use OA7822; 450-630 A use OF9721.","Frames: 200 A frame (40-200 A) 18,000 A interrupt; 400 A frame (225-400 A) 25,000 A; 800 A frame (450-630 A) 35,000 A.","Wire ranges, lug torque and temperature derating did not extract cleanly; see the bulletin table."],"priority":"info","confidential":true,"source":"Generac PIB15-02-GALL Rev A, Apr 2015"},
  {"id":"gen-sib13-18-acmag","brand":"Generac","number":"SIB13-18-ACMAG","docNo":"","rev":"A","date":"2013-12","type":"Service","title":"990/999 engine magneto replacement (0G3224TA/TB): file mounts, set gap","applies":{"genFamilies":["gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All 990/999 engines when fitting magnetos 0G3224TA and 0G3224TB (not 0G3224ASRV/0G3224BSRV).","summary":"The newer replacement magnetos have a copper stud that hits the magneto mounts and prevents proper gapping. File the mounts and install each magneto on the right cylinder facing the right way, or there will be no spark.","steps":["Disconnect the battery first.","Remove the old magnetos; file a slight angle on the top edge of the two magneto mounts so the copper stud clears.","0G3224TA (short wire) on cylinder 1 (rear); 0G3224TB (long wire) on cylinder 2 (front).","Ground connector must face the outside of the engine; backwards = no spark.","Gap 0.008-0.012 in against the flywheel face opposite the magnet (180 degrees away); secure each ground wire."],"priority":"normal","confidential":true,"source":"Generac SIB13-18-ACMAG Rev A, Dec 2013"},
  {"id":"gen-pib24-06-w","brand":"Generac","number":"PIB24-06-W","docNo":"A0006925197","rev":"A","date":"2024-11","type":"Product","title":"TX/HX transfer switch firmware 1.31: keeps settings after power loss","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX and HX series transfer switches.","summary":"Before 1.31 the TX/HX controller could lose its typecode, contactor type and other settings when all power was lost. Update to 1.31 at maintenance visits or commissioning.","steps":["Update to firmware 1.31 while on site.","Fixes: settings kept through power cycles; both RS-485 ports work together (V2 controls); no corrupted USB logs.","Save button works first time (contactor type, Modbus name); cleaner readings in HTS Emulation.","Leap day handled so exercise clock/date need no readjusting."],"priority":"normal","confidential":true,"source":"Generac PIB24-06-W (A0006925197) Rev A, Nov 2024"},
  {"id":"gen-pib23-06-z","brand":"Generac","number":"PIB23-06-Z","docNo":"A0004317540","rev":"A","date":"2023-05","type":"Product","title":"TX switch replacing an HTS: turn on HTS Emulation for the H-Panel","applies":{"genFamilies":[],"modelRe":["^HTS"],"controllers":["H-Panel"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX transfer switches on firmware 1.27 or later installed in place of an HTS switch with an H-Panel generator.","summary":"HTS Emulation lets a TX switch talk to an H-Panel generator like the old HTS did. Set the Modbus name and RS485 port, then turn HTS Emu on.","steps":["Menu > Settings, enter the Dealer Level password.","Name (Modbus address): set 240-243 to match the switch you are configuring in GenLink.","RS485 Settings: Enable On, J13 = Bld Mgmt, baud and stop bits matching GenLink.","Set HTS Emu to On.","ATS Status screen shows a \"GC\" (Generator Connect) icon when the H-Panel is sending commands."],"priority":"normal","confidential":true,"source":"Generac PIB23-06-Z (A0004317540) Rev A, May 2023"},
  {"id":"gen-wib25-03-ci","brand":"Generac","number":"WIB25-03-CI","docNo":"A0008565996","rev":"A","date":"2025-07","type":"Warranty","title":"Removing magnetic pickup 0D2244M without voiding the warranty claim","applies":{"genFamilies":["gen-generac-protector-qt048-r200b"],"modelRe":["^QT06024"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any gaseous or diesel commercial/industrial unit using magnetic pickup sensor 0D2244M (alternator housing, engine front cover or cam position).","summary":"Returned 0D2244M pickups damaged on removal cannot be failure-analyzed. Crushed or damaged threads on the sensor body get the claim denied; tip damage does not.","steps":["Record the sensor resistance and voltage output from troubleshooting in the claim comments.","Loosen the jam nut with a 9/16 in (14 mm) open-end wrench.","Unscrew the sensor body by hand only; no adjustable wrench or pliers on the body or threads."],"priority":"normal","confidential":true,"source":"Generac WIB25-03-CI (A0008565996) Rev A, Jul 2025"},
  {"id":"gen-pib17-05-aac","brand":"Generac","number":"PIB17-05-AAC","docNo":"10000017956","rev":"A","date":"2017-07","type":"Product","title":"999 cc air box cover with holes: do not fit on units built without it","applies":{"genFamilies":["gen-synergy-evo2-20","gen-guardian-evo2-20-3ph"],"modelRe":["^G00(70350|70360|70370|70380|70390|70400|70410|70420|70421|70430|70431|70770|70780|70590|70600|70610|70620|70630|70640|70650|70651|70680|70690|70700|70701|70730|70740|70750|70751)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"2016 16-22 kW home standby, 15 kW EcoGen and 20 kW Synergy with the 999 cc engine: models G0070350-G0070751 listed in the bulletin.","summary":"These models came with a vented air box cover (small holes on the back) to tune air/fuel between cylinders. It is not an upgrade: never put a vented cover on a unit that came with a solid one.","steps":["Vented covers: 10000000253 and 10000000254. Old solid covers: 0K1735 and 0J6724.","Order a replacement cover by the part number in the unit's bill of material (Parts Manual).","Never swap a solid cover for a vented one."],"priority":"info","confidential":true,"source":"Generac PIB17-05-AAC (10000017956) Rev A, Jul 2017"},
  {"id":"gen-sib15-01-acg","brand":"Generac","number":"SIB15-01-ACG","docNo":"","rev":"B","date":"2015-08","type":"Service","title":"Long-term storage prep for air-cooled generators","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"New in-stock or already installed air-cooled product going into long-term storage.","summary":"Steps to keep stored air-cooled units from deteriorating. The bulletin table marks which steps apply to new vs installed units.","steps":["Cover and store clean, dry, ventilated; boxed new units indoors only.","Remove the plugs, add about 1 oz of engine oil (or fogging agent) per cylinder, refit plugs and crank slowly.","Gaseous units: plug the fuel inlet with a threaded pipe plug.","Clean the unit; remove and store the battery.","Drain and replace engine oil; tag the unit as prepped for long-term storage."],"priority":"info","confidential":true,"source":"Generac SIB15-01-ACG Rev B, Aug 2015"},
  {"id":"gen-sib11-26-nac","brand":"Generac","number":"SIB11-26-NAC","docNo":"","rev":"","date":"2012-02","type":"Service","title":"Air-cooled Nexus panel replacement: which 0H6680 panel to order","applies":{"genFamilies":["gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6"],"modelRe":[],"controllers":["Nexus"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled units with Nexus panels; check the -0 or -1 at the end of the model number on the data tag.","summary":"Cross-reference of the 0H6680 Nexus panel versions in the field to the correct replacement panel, with extra parts needed for some 8 kW units.","steps":["Field panel 0H6680A: replace with 0H6680B. 8 kW single-cylinder below serial 6239507 also need airbox 0H6669 (SIB11-02-HAC).","Field 0H6680B or 0H6680D: replace with 0H6680D. 8 kW needs software 0J3401 rev B or higher (sticker lower left of panel).","Field 0H6680C: 0H6680C. Field 0H6680E: 0H6680E.","Field 0H6680T: replace with 0H6680B plus harness adapter 0J7558."],"priority":"normal","confidential":false,"source":"Generac SIB11-26-NAC, Feb 2012"},
  {"id":"gen-pib09-07-hacg","brand":"Generac","number":"PIB09-07-HACG","docNo":"","rev":"","date":"2009-11","type":"Product","title":"RTSS200A3 load shed switch with a liquid-cooled R-panel generator","applies":{"genFamilies":[],"modelRe":["^RTSS200A3"],"controllers":["R-Panel"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any RTSS200A3 transfer switch used with a liquid-cooled R-panel generator.","summary":"The RTSS200A3 comes with a battery charger that must be removed when paired with an R-panel unit, and the interconnect wire numbers differ.","steps":["Remove the transfer switch battery charger: disconnect its AC input (J-3) and DC output (J6).","Generator wire 23 to switch terminal 23; generator wire 194 to switch terminal 15B.","Wire 0 from the generator ground lug to switch terminal 0."],"priority":"normal","confidential":false,"source":"Generac PIB09-07-HACG, Nov 2009"},
  {"id":"gen-pib10-08-wac","brand":"Generac","number":"PIB10-08-WAC","docNo":"","rev":"","date":"2010-08","type":"Product","title":"RTSN/RTSE switches with 2010 air-cooled HSB: add 120 VAC charger feed","applies":{"genFamilies":[],"modelRe":["^RTS[NE]"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RTSN and RTSE transfer switches connected to a 2010 air-cooled home standby generator.","summary":"The 2010 air-cooled control needs a 120 VAC supply from the switch for battery charging. Rework kit OH93030SRV adds a fused T1 feed.","steps":["Kill all power to the switch; open the outer cover and remove the inner cover.","Mount fuse holder 73591 left of the customer terminal strip with the supplied screws; clean out the chips.","Run the wire labeled T1 from the fuse block to the T1 lug.","Fit the 5A non-time-delay fuse 073590.","Connect to the generator T1 120 VAC load supply per the 2010 HSB interconnect diagrams."],"priority":"normal","confidential":false,"source":"Generac PIB10-08-WAC, Aug 2010"},
  {"id":"gen-pib13-17-vlme","brand":"Generac","number":"PIB13-17-VLME","docNo":"","rev":"A","date":"2013-10","type":"Product","title":"Weak Mobile Link cell signal: Verizon network extender option","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Mobile Link units in weak cellular coverage areas.","summary":"If a text message works from the generator location, signal is usually enough for Mobile Link. Where it is not, a Verizon Network Extender (needs internet service) can boost coverage. Warranty on the device is through Verizon.","steps":["Test: try sending and receiving a text at the generator.","If weak, the customer can buy a Verizon Network Extender (needs home internet)."],"priority":"info","confidential":true,"source":"Generac PIB13-17-VLME Rev A, Oct 2013"},
  {"id":"gen-pib09-1-wall","brand":"Generac","number":"PIB09-1-WALL","docNo":"","rev":"","date":"2009-01","type":"Product","title":"Load shed RTS switch: wire 15B, 0, 23 labels wrong in charger guide 0G7956","applies":{"genFamilies":[],"modelRe":["^RTS"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RTS \"HS\" type load shed transfer switches used with 2008 home standby generators.","summary":"Page 9 of the Battery Charger Installation Guidelines (0G7956 rev A, drawing 0G8774A) mislabels where wires 15B, 0 and 23 land. Use the corrected figure in the bulletin.","steps":["Do not follow the RTS diagram on page 9 of manual 0G7956 rev A for wires 15B, 0 and 23.","Use the corrected figure in the bulletin (figures did not extract as text)."],"priority":"normal","confidential":false,"source":"Generac PIB09-1-WALL, Jan 2009"},
  {"id":"gen-pib08-11-s","brand":"Generac","number":"PIB08-11-S","docNo":"","rev":"","date":"2008-04","type":"Product","title":"Ford 4.2L: green wear-in oil looks like coolant but is normal","applies":{"genFamilies":["gen-generac-protector-qt048-r200b"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All units with the Ford 4.2L engine.","summary":"Ford ships the 4.2L with green-tinted wear-in oil that looks like coolant mixed in. It is fine for the wear-in period; change it after 3 months or 30 hours.","steps":["Green oil during wear-in is normal; do not condemn the engine for it.","Change the oil after the wear-in period (3 months or 30 hours).","If coolant is leaking during wear-in, an oil sample is required before warranty; Generac pays for the test if it shows coolant in the oil during wear-in."],"priority":"normal","confidential":false,"source":"Generac PIB08-11-S, Apr 2008"},
  {"id":"gen-sib24-04-z","brand":"Generac","number":"SIB24-04-Z","docNo":"A0005493807","rev":"C","date":"2026-09","type":"Service","title":"Programming Deep Sea G8601 controllers (software, firmware, RAP, AVR, ECU)","applies":{"genFamilies":[],"modelRe":[],"controllers":["Deep Sea G8601"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Any Generac unit with a Deep Sea G8601 controller.","summary":"Start-up and commissioning of G8601-equipped units needs Deep Sea Configuration Suite and specific settings. The bulletin covers installing the software, updating controller firmware, converting configuration files, enabling remote annunciators, and loading Generac 3-phase AVR and STP dual ECU firmware.","steps":["Use a USB isolator (e.g. ADUM3160) with a USB 2.0 A-to-B cable on a Windows 7+ laptop - without isolation a ground loop can destroy components.","Install Deep Sea Configuration Suite before going to site; enter feature unlock code (unlock code - see the bulletin) for the G8601 (Help > Enter Feature Unlock Code), then check for updates.","Before any firmware update, config write or controller swap: Read from Module and run Backup Module - a firmware update erases the settings.","After a firmware update, convert a copy of the old config (File > Convert to, save as a new .dse), write it to the panel, restore the backup, verify operation. Going to v3.61+: note SCADA values first, use Tools > Batch Convert, enable Commissioning pages, update firmware to v3.61.3 or higher.","1800 rpm: set Governor Center (SW1) to 5.0 in Scada > Generator > Governor/AVR Interface, run in Manual and trim SW1 until the display reads 60 Hz.","Remote annunciator: Advanced > Generac RAP > Module Options, enable it (default 9600 baud); in Alarms enable it, set minimum RAP count and Communication Error; RAP 1 = Modbus 214, RAP 2 = 215. Enable at least one relay or all LEDs flash. Test: Comms Ok, Not in Auto, Ready to Run solid.","3-phase AVR firmware: pull the ECM and emissions ECM fuse(s) first; Tools > Update Firmware, G8601 as Gateway, Generac AVR, latest file from GenService; untick 'update without product reboot' only if the AVR is stuck in boot loader (fast-flashing LED).","ECU firmware: Firmware Update Wizard, 'G86xx as Gateway', Generac STP Dual ECU, browse to its firmware file, select the connected G8601."],"priority":"normal","confidential":true,"source":"Generac SIB24-04-Z (A0005493807) Rev C, Sep 2026"},
  {"id":"gen-pib08-05-s","brand":"Generac","number":"PIB08-05-S","docNo":"","rev":"","date":"2008-02","type":"Product","title":"Telecom units on propylene glycol: false low-coolant alarms from probe 0E2507","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Telecom units shipped with propylene glycol: 2.4L Mitsubishi gas serials 4508841-4887000, 4.2L Ford gas 4893437-4936119, 2.4L John Deere diesel 4353923-4946193, 3.0L John Deere diesel 4518455-4946668.","summary":"Coolant level probe 0E2507 gives false low-coolant alarms on telecom units filled with propylene glycol. The fix is a coolant service: drain, clean and reseal the probe, add a radiator ground strap, refill with ASTM 6211 propylene glycol and bring pH to 10.0-11.0.","steps":["Check maintenance records. If coolant was changed on schedule (yearly for gas, every 2 years for diesel) and pH tests 10.0-11.0, do not change it - just do the inspections.","Otherwise drain the coolant (never open the cap hot; never mix ethylene and propylene glycol).","Remove the coolant probe, wipe it clean, re-apply thread sealant and reinstall.","Install a ground strap from radiator to the engine ground bar (drawing 0G3897): P/N 0G7895 for 2.4L Mitsubishi and 4.2L Ford, 0G7895A for 2.4L and 3.0L John Deere.","Inspect ball valves, hose clamps and hoses (repair per PIB07-11-S Rev A); refill with propylene glycol meeting ASTM 6211.","Run to operating temperature, test pH with propylene-glycol strips; raise to 10-11 with P/N 0G7922 additive if needed. Then complete PIB08-6-S.","Warranty: 2.3 hr flat rate (2.8 hr if ball valve or hoses replaced); reference PIB08-5-S and PIB08-6-S on the claim."],"priority":"normal","confidential":false,"source":"Generac PIB08-05-S, Feb 2008"},
  {"id":"gen-sib10-11-nall","brand":"Generac","number":"SIB10-11-NALL","docNo":"10000009011","rev":"L","date":"2017-07","type":"Service","title":"Replacing a Nexus panel on a liquid-cooled unit - set V-Code and Parameter Group","applies":{"genFamilies":["gen-generac-protector-qt-nexus"],"modelRe":[],"controllers":["Nexus"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Liquid-cooled generators with a Nexus control panel, when a panel replacement is authorized by Generac Service with a control number.","summary":"A new Nexus panel must be set to the unit's Voltage Code and Engine Parameter Group before it runs, or the generator will be damaged (not warrantable). The panel must match the unit model; this procedure is not for changing a unit's voltage.","steps":["Before swapping: switch to OFF, pull the 7.5 A controller fuse, turn off the charger, remove battery negative then positive.","Read the data label. Model code example QT 02724A: 027 = 27 kW, 24 = 2.4L, letter = voltage (A 120/240 1ph, G 120/208 3ph, J 120/240 3ph, K 277/480 3ph, M 110/220 1ph 50 Hz); last letter X = non-catalyst, C = catalyst. Note NG or LP.","Look up V-Code and Parameter Group in the bulletin table (table does not extract cleanly - use the PDF).","Power the new panel with the switch in OFF; set time and exerciser. Ignore a CANBUS alarm on power-up (press ESC three times). Do not start the unit yet.","Edit menu from main menu: ESC, UP, UP, DOWN, DOWN, ESC, ESC. Set V-Code with a digit in every field (e.g. code 11 = 00011), then Parameter Group, Switch Type, Pickup Volts, Startup Delay, Fuel Type (password protected).","Power-cycle: pull the 7.5 A fuse, T1 charge lead and battery negative, wait 15 s, reconnect. Run in MANUAL and check output is within +/-1% of rated; if not, adjust Calibrate Volts (higher number = lower voltage).","Test under building load if possible (QT TEST in DEBUG menu for exercise); close MLCB and set unit and switch to AUTO. Warranty flat rate 0.3 hr."],"priority":"high","confidential":true,"source":"Generac SIB10-11-NALL (10000009011) Rev L, Jul 2017"},
  {"id":"gen-sib12-05-l15g","brand":"Generac","number":"SIB12-05-L15G","docNo":"","rev":"A","date":"2012-04","type":"Service","title":"QT 25/30 kW 1.5L: wrong oil drain banjo fitting and coil #4 harness miswire","applies":{"genFamilies":["gen-generac-protector-qt-nexus"],"modelRe":["^QT0(25|30)15"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Only the 71 listed 1.5L QT 25 kW and QT 30 kW units (QT02515/QT03015, serials in the bulletin table, roughly 6895076 to 6962803 but not every serial in between).","summary":"A small batch of 1.5L QT units shipped with a non-conforming oil drain banjo fitting and/or the orange and black wires swapped at ignition coil #4 (harness 0J4554). Replace the banjo fitting with 0J4694A and swap the coil #4 wires, at or before start-up.","steps":["Check the serial against the bulletin table: it shows whether the banjo fitting, the harness, or both need doing (the last 4 units need the harness only).","Disable the unit (OFF, battery negative off); removing the battery and tray helps.","Banjo: drain oil, loosen the right engine mount isolator bolt (block the frame up a few inches if needed), jack the engine gently under the cast aluminum pan with wood, remove the right mount.","Fit new banjo 0J4694A with the old hollow bolt and both copper washers, same nipple orientation; torque 10 ft-lbs (120 in-lbs). Refit mount, refill oil to full, check for leaks.","Harness: unplug coils #1 and #4; at coil #4 the black wire must be in position 1 and orange in position 2. Pop the yellow lock, release the pins, swap, reseat and relock.","Reconnect coils, battery positive then negative, test run, set to AUTO. Warranty: banjo 0.75 hr, harness 0.25 hr, one trip charge."],"priority":"high","confidential":false,"source":"Generac SIB12-05-L15G Rev A, Apr 2012"},
  {"id":"gen-sib12-07-w-rts","brand":"Generac","number":"SIB12-07-W-RTS","docNo":"","rev":"B","date":"2013-05","type":"Service","title":"RTS switch: add utility voltage monitor/timer to raise dropout and pickup levels","applies":{"genFamilies":[],"modelRe":["^RTS[XDN](100|150|200|400)A3","^RTSE(100|200)A3CSA","^RTS1[0246]EZA1"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RTS transfer switches RTSX/RTSD 100-400A3 (incl. RTSD150A3), RTSN100/200/400A3, RTSE100A3CSA, RTSE200A3CSA and RTS10/12/14/16EZA1.","summary":"The generator panel's utility sensing drops out at 60% and picks up at 80%. Where higher thresholds are wanted, kit 0K1628 adds a voltage monitor timer relay in the RTS switch so utility dropout and pickup can be set higher.","steps":["Order kit 0K1628 (timer relay 0C3211Z, socket 0C3211AA, wire, lugs, ties).","Generator OFF, generator breaker open, utility de-energized before opening the switch.","Mount socket 0C3211AA (two M3.6 holes, screws 0C2695, washers 043180) with the keyway toward the enclosure bottom.","Remove wire N1A (fuse F1 N1A side to ATS N1) and add 18 AWG blue wires: ATS N1 to VM terminal 2, VM 2 to VM 3, fuse F1 N1A to VM 1, fuse F2 N2 to VM 7. Use the wiring diagram for your model.","Plug in relay 0C3211Z and set: pick-up delay 10 s, drop-out delay 0.1 s, pick-up 90% of nominal, nominal 240 VAC, drop-out 95% of pick-up.","Test: breaker closed, AUTO - unit starts and transfers, relay LED off. Restore utility - LED goes steady red (may pass through green), switch retransfers, unit stops after cooldown. Refit cover."],"priority":"normal","confidential":true,"source":"Generac SIB12-07-W-RTS Rev B, May 2013"},
  {"id":"gen-pib08-16-s","brand":"Generac","number":"PIB08-16-S","docNo":"","rev":"","date":"2008-07","type":"Product","title":"2.4L gas engine: inspect, gap or replace the MPU2 magnetic pickup cam sensor","applies":{"genFamilies":["gen-generac-protector-qt-nexus"],"modelRe":["^QT[0-9]{3}24"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All units with the 2.4L (Mitsubishi) gaseous engine using a magnetic pickup cam sensor P/N 0D2244M, 0D2244F or 0G3921.","summary":"A loose cam pin/magnet or wrong gap at the MPU2 cam sensor, or a sensor wire cut by the fan, loses the cam signal and shuts the unit down. Inspect the cam pin, set the sensor gap to 0.015 in +/- 0.001, and tie the wire clear of the fan.","steps":["Prep: doors off, switch OFF, fuel OFF, battery cables off; remove fan guards (10mm), ignition bracket (brass bolts are different lengths - note sides) and the black timing belt cover.","Check cam pin 0G1472A and magnet on the cam pulley for looseness. If loose, replace; if good, just check the gap.","Turn the engine clockwise by the crank until the pin lines up with the sensor; gap with a brass/non-ferrous feeler: 0.015 in +/- 0.001.","Replacing: clean threads with non-oil solvent, blue removable Loctite (bulletin: 'blue 232') on the pin threads, hand tight plus one flat; check alignment with a mirror.","Sensor reads about 1000 ohms across wires 79A (+) and 0A (-) unplugged. Mark about 1 in from the tip, screw in to the mark, set the gap, tighten the lock nut.","Zip-tie the sensor wire away from the fan. Timing cover bolts 8 ft-lbs (11 N.m); ignition bracket bolts 17 ft-lbs (24 N.m). Reconnect and refit guards."],"priority":"normal","confidential":false,"source":"Generac PIB08-16-S, Jul 2008"},
  {"id":"gen-sib20-08-w","brand":"Generac","number":"SIB20-08-W","docNo":"A0000775683","rev":"B","date":"2020-08","type":"Service","title":"TX transfer switch controller: firmware update fixes Return Delay timer hang","applies":{"genFamilies":[],"modelRe":["^G00(49404|48776|48924|63103|63113|63123|63133)"],"controllers":["TX"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX controller switches G0049404, G0048776, G0048924, G0063103, G0063113, G0063123, G0063133 built before 6/22/2020; do it at start-up.","summary":"The controller never leaves the Return Delay timer if the timeout is set above five seconds. Load the latest ATS firmware from a FAT32 USB stick, then re-enter all settings and recalibrate.","steps":["Record all settings (Menu > Settings) and, if firmware is 1.05 or higher, the calibration values (Menu > Settings > Calibration). Review owner's manual Rev C for V1.18 changes.","Download the latest FW_ATS_vX_XX.bin from GenConnect to a FAT32 flash drive. Turn the generator OFF (the update may trigger two-wire start).","Insert the drive in the USB port by the battery, dealer menu code (see the bulletin), Menu > Info > Update, pick the file (six green lights during update), remove the drive at the ATS Status screen.","Re-enter all Settings and Program values (old ones are not kept).","Calibrate: with recorded values, use Z/S and up/down until the numbers match; without them, zero S2 then S1 with that source unpowered, per channel (S1A-C, S2A-C, IA-IC, IN), checking with a meter first. Upgrades from 1.04 need field calibration.","Turn off Maintenance/Test modes, set normal ATS mode, return the generator to AUTO."],"priority":"normal","confidential":true,"source":"Generac SIB20-08-W (A0000775683) Rev B, Aug 2020"},
  {"id":"gen-pib22-10-h","brand":"Generac","number":"PIB22-10-H","docNo":"A0003725776","rev":"A","date":"2022-11","type":"Product","title":"New composite GENPAD for air-cooled home standby units (FYI)","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"2016 and newer residential air-cooled Generac and Honeywell 10-26 kW home standby units and PWRGenerator units.","summary":"Information only: a composite GENPAD weighing 33 lbs (15 kg) replaces the 3 in concrete pad - 82% lighter with 20% more load capacity, mounting hardware included. Pad warranty runs for the generator's warranty period.","steps":["One person can carry it; mounting bolt score marks help line up the unit.","Fits all air-cooled Generac/Honeywell 10-26 kW HSB and PWRGenerator units.","Orderable on GENService from the week of November 18, 2022; bulk discounts. Part numbers are in the bulletin's comparison table (garbled in text - check the PDF)."],"priority":"info","confidential":true,"source":"Generac PIB22-10-H (A0003725776) Rev A, Nov 2022"},
  {"id":"gen-pib10-10-aac","brand":"Generac","number":"PIB10-10-AAC","docNo":"","rev":"","date":"2010-09","type":"Product","title":"20 kW GT-999: rough running in low-speed exercise - replace choke plate 0J0602","applies":{"genFamilies":["gen-guardian-nexus-20"],"modelRe":["^G00(5875|5887|5896|5913|5924|5907)"],"controllers":[],"codes":[],"serialFrom":"5867737","serialTo":"6056675","builtFrom":"","builtTo":""},"appliesText":"20 kW GT-999 home standby models 005875, 005887, 005896, 005913, 005924 and 005907, serials 5867737 to 6056675, only if they run rough in low-speed exercise.","summary":"Some of these units run rough during the low-speed exercise. Replace the choke plate assembly with 0J0602, but only on units reported with the symptom.","steps":["Switch OFF, pull the control panel fuse. Remove the air filter cover (two thumb screws) and filter.","Remove the two choke solenoid screws, lift the solenoid and unhook its wire rod from the choke arm.","Remove the shoulder screw (2.5 mm Allen), pop the spring leg out, lift the old choke plate assembly out.","Fit new 0J0602, spring leg fully into the first slot; Loctite 262 (red) on the shoulder screw threads, snug only - shoulder must pass through the slot so the plate does not bind.","Rehook the rod, refit the solenoid (do not overtighten, wires in their channel). Push the rod in and release: the plate must snap shut freely.","Refit filter and cover, fuse back, AUTO; reset date, time and exercise time. Run low-speed exercise and confirm no hunting or missing. Flat rate 30 min max."],"priority":"normal","confidential":false,"source":"Generac PIB10-10-AAC, Sep 2010"},
  {"id":"gen-pib20-03-w","brand":"Generac","number":"PIB20-03-W","docNo":"A0000909113","rev":"A","date":"2020-08","type":"Product","title":"Connecting a Power Zone remote annunciator over RS-485 (Power Zone Pro / Pro Sync)","applies":{"genFamilies":[],"modelRe":["^G00985[123]0"],"controllers":["Power Zone Pro","Power Zone Pro Sync"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators with Power Zone Pro or Power Zone Pro Sync controllers and remote annunciator/relay panel G0098510, G0098520 or G0098530.","summary":"How to wire and program a Power Zone remote annunciator (RAP) on RS-485. The comm port section of the controller's XML file must be edited and uploaded, and each annunciator needs a unique DIP-switch address.","steps":["Wire RS-485+ and RS-485- from the main controller to the RAP, plus power and ground from the low-voltage customer connection area.","Set a unique address on each RAP with DIP switches DS1-DS4 (binary, DS1 = 1, DS2 = 2, DS3 = 4, DS4 = 8); up to 16 per generator.","Generate an XML of the active settings; edit Comm_Port_Settings (Pro Sync: RS-485 port 3; Pro: RS-232 port 0 section) to match the bulletin figure, then upload it.","No comms on the right port: check port config; still none: swap RS-485+ and RS-485- at the Power Zone 485 port.","Only Generac devices on the main controller RS-485 port; third-party Modbus goes through the Power Zone Display or Connectivity Server.","RAPs with boot loader before P005 cannot do RS-485 (call Tech Service for a replacement); main controller firmware P017 or later gives full RS-485 support."],"priority":"normal","confidential":true,"source":"Generac PIB20-03-W (A0000909113) Rev A, Aug 2020"},
  {"id":"gen-a0011274124","brand":"Generac","number":"A0011274124","docNo":"A0011274124","rev":"A","date":"2026-05","type":"Service","title":"D30.6 diesel: add wire harness overlay to stop premature G8601 controller failure","applies":{"genFamilies":[],"modelRe":[],"controllers":["Deep Sea G8601"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"D30.6 units with the serial numbers in the bulletin's Appendix A only.","summary":"Wire 23A on D30.6 units can cause premature controller failure. Install overlay harness A0009885652 so the circuit runs through relay RB2 with fused 24V.","steps":["Listed serials: 3016586847, 3016749409, 3016749410, 3016749411, 3016990579, 3017015168, 3017117125, 3017135534, 3017135560, 3017260387, 3017310470, 3017310472, 3017346972, 3017346974, 3017346976, 3017462701, 3017522224, 3017577254, 3017637397, 3017654857, 3017701825, 3017701828, 3017815147, 3017833221, 3017887178, 3017985043, 3017994888, 3017995831, 3017996685, 3018047832, 3018047838, 3018191929, 3018250926, 3018286926, 3018324695, 3018549401, 3018616483.","Part: A0009885652 harness overlay (qty 1). Take the unit out of automatic.","Remove wire 23A from DS1-8, cut off its ferrule, strip 1/4 in, butt-splice it to the overlay harness; land the other overlay wire on DS1-8.","Move one spade from RB2-3 to RB2-4 and jumper RB2-4 to RB2-3 with the supplied jumper.","Overlay spade wire to RB2-6; overlay ferrule wire to RB2A-4.","Verify: 23A runs RB2-6 to CBC-5, 23 runs DS1-8 to RB2A-4, fused 24V (220C) on RB2-3 and RB2-4. Warranty: 0.75 hr, primary part A0011274124, comment 'D30.6 Wire Harness'."],"priority":"high","confidential":true,"source":"Generac A0011274124 (A0011274124) Rev A, May 2026"},
  {"id":"gen-wib25-02-g","brand":"Generac","number":"WIB25-02-G","docNo":"A0008565793","rev":"A","date":"2025-08","type":"Warranty","title":"Fuel shutoff solenoid 0J7137: test before replacing (resistance required on claim)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generators with gas regulator family P/N 0L6733 (shutoff solenoid 0J7137).","summary":"Warranty claims for shutoff solenoid 0J7137 are denied unless the measured coil resistance is written in the claim comments. Check wiring, resistance and a stuck plunger before replacing.","steps":["Confirm fuel supply and pressure first. Check continuity from controller to the solenoid lead and record controller output current while cranking.","Battery negative off, leads off the solenoid. Confirm it is 0J7137; an old 'short' solenoid 0F5022 gets replaced (note the P/N on the claim).","Measure coil resistance: 15 +/- 2 ohms is good. Out of range: replace and write the reading on the claim.","In range: shut the gas, remove the 4 base screws and check the plunger is not stuck to the regulator (condensation, especially on LP).","Bench-test that the energized solenoid holds the plunger. Works: thin graphite coat on the plunger and reassemble. Fails: replace."],"priority":"normal","confidential":true,"source":"Generac WIB25-02-G (A0008565793) Rev A, Aug 2025"},
  {"id":"gen-pib15-09-ulgl","brand":"Generac","number":"PIB15-09-ULGL","docNo":"","rev":"A","date":"2015-08","type":"Product","title":"No outside grounding lug on newer air-cooled units - ground terminal is inside","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled UL-listed home standby generators; the change concerns units with the connection shelf redesigned in 2014.","summary":"Information only: since the 2014 connection shelf redesign the grounding electrode terminal is inside the enclosure, so the external lug was dropped and the unit still meets UL 2200 18.1.6. Most installs are non-separately derived (solid-neutral switch) and are grounded through the feeder equipment ground.","steps":["Solid-neutral transfer switch (non-separately derived): no grounding electrode or bonding jumper at the generator; the feeder equipment ground bonds it.","Switched-neutral transfer switch (separately derived): install a grounding electrode conductor and system bonding jumper between the ground bar and neutral bar inside the generator.","Generac standby units are floating-neutral by design - see NEC 250.30 Informational Note No. 1."],"priority":"info","confidential":true,"source":"Generac PIB15-09-ULGL Rev A, Aug 2015"},
  {"id":"gen-pib08-02-s","brand":"Generac","number":"PIB08-02-S","docNo":"","rev":"","date":"2008-01","type":"Product","title":"Battery maintenance every 6 months, load test yearly","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"General guidance; the bulletin names no models (vented lead-acid starting batteries).","summary":"General battery care to do every 6 months: inspect, clean and top up vented lead-acid batteries, with full battery-acid PPE. Testing is yearly, per ANSI/IEEE 450.","steps":["PPE: rubber gloves, apron, eye protection and face shield; no flames, sparks, jewelry or metal tools near the battery.","Inspect for cracks, leaks and corrosion; replace leaking batteries and any suspect cables.","Remove negative clamp first, positive last; refit positive first, negative last.","Clean the top with baking soda and water, rinse and dry; clean posts and clamps, apply terminal protectant.","Electrolyte at least 1/8 in below the bottom of the fill well covering the plates; top up with distilled or deionized water only - never acid."],"priority":"info","confidential":false,"source":"Generac PIB08-02-S, Jan 2008"},
  {"id":"gen-sib13-03-hall","brand":"Generac","number":"SIB13-03-HALL","docNo":"","rev":"A","date":"2013-02","type":"Service","title":"Replacing an obsolete 120 VAC DLM board with the 24 VAC OPCB 0K0220A","applies":{"genFamilies":[],"modelRe":["^RTS"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Transfer switches with 120 VAC DLM load-management modules whose PCB 0H7376A needs replacement (RTS switch wiring described).","summary":"Board 0H7376A (120 VAC only) is obsolete; replace it with OPCB 0K0220A. In a 120 VAC DLM system the new board's load supply must be jumpered to 120 VAC and the 24 V transformer left out.","steps":["Do not install the transformer - 120 VAC DLM modules will not work on 24 VAC.","Make two ~3 in 16-gauge jumpers.","Existing T1 wire plus jumper 1 to OPCB T1; existing 00 wire plus jumper 2 to OPCB Neutral.","Jumper 1 to Load Supply 1, jumper 2 to Load Supply 2.","Never mix 120 VAC and 24 VAC DLM modules in one install: all 120 V with jumpers, or all 24 V with the transformer."],"priority":"normal","confidential":false,"source":"Generac SIB13-03-HALL Rev A, Feb 2013"},
  {"id":"gen-pib-2099","brand":"Generac","number":"PIB-2099","docNo":"A0010386799","rev":"A","date":"2026-01","type":"Product","title":"Protector XG / Power Zone 410: nuisance 2099 mis-wire alarm - add resistor harness","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone 410"],"codes":["2099"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Protector XG Series home generators with Power Zone 410 controllers.","summary":"When wires 23 and 194 share a bundle with N1, N2 and T1, AC can couple onto them and trip a false 2099 wiring-error alarm. After confirming the wiring is correct, install resistor harness A0010070719 between 194, 23 and ground.","steps":["Verify customer connections are landed correctly and no wires are shorted together.","De-energize: confirm no utility or battery power in the unit.","If it is a verified nuisance alarm, install resistor harness A0010070719 between wires 194, 23 and ground (see bulletin figure for TB3 layout; liquid-cooled Wago layout also shown).","Warranty: 0.25 hr, primary failed part A0010070719, enter PIB25-15-XG in the claim comments."],"priority":"high","confidential":true,"source":"Generac PIB-2099 (A0010386799) Rev A, Jan 2026"},
  {"id":"gen-pib09-09-call","brand":"Generac","number":"PIB09-09-CALL","docNo":"","rev":"","date":"2009-08","type":"Product","title":"R-200 panels: replace coolant probe 0E2507 with 0H1827 plus interface module 0H1851","applies":{"genFamilies":["gen-generac-protector-qt048-r200b","gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":["R-200"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Liquid-cooled units with R-panel R-200 and later series controllers whenever probe 0E2507 is replaced, has false low-coolant alarms, or has debris on its tip.","summary":"Whenever the 0E2507 coolant level probe must be replaced, or it gives false low-coolant alarms or has a fouled tip, fit probe 0H1827 with interface module 0H1851 (kit 0H50540SRV).","steps":["Disable the unit: OFF, MLCB open, battery negative off.","Drain coolant below the probe; unplug and remove 0E2507, install 0H1827.","Plug interface module 0H1851 onto the probe and the engine harness onto the module.","Run the module's orange wire along the harness to the fuel solenoid; move wire #14 onto the orange wire's piggyback lug and put that on the solenoid terminal.","Tie the module to the harness, refill coolant, reconnect battery, run in MANUAL - no low coolant alarm - then return to AUTO.","Flush and refill coolant yearly; inspect the probe for build-up at each change."],"priority":"normal","confidential":false,"source":"Generac PIB09-09-CALL, Aug 2009"},
  {"id":"gen-sib23-37-c2-4","brand":"Generac","number":"SIB23-37-C2.4","docNo":"A0005358316","rev":"A","date":"2024-01","type":"Service","title":"RG 2.4L 3600 rpm: harmonic balancer / fan drive bolt works loose - check 120 ft-lbs","applies":{"genFamilies":["gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All RG models with the 2.4L Mitsubishi engine at 3,600 rpm.","summary":"The bolt holding the harmonic balancer pulley and fan drive adapter can loosen over time, upsetting engine timing and damaging internals, flex plates and the weldment. Check its torque at every scheduled maintenance.","steps":["Tools: 12 mm internal hex (Allen) drive, torque wrench to 120 ft-lbs, medium-strength blue Loctite.","Remove item 24 bolts on the crankshaft side only, to get the flex plates out of the way.","Check mount bolt #4: it must be 120 ft-lbs. If not, remove it, add blue Loctite and torque to 120 ft-lbs.","Refit flex plates and item 24 bolts at 18 ft-lbs (bulletin also lists item 41 at 18 ft-lbs and #3 at 18.5 ft-lbs).","Warranty: inspection claim 0.5 hr, P/N 0G0149 as primary causal part."],"priority":"high","confidential":true,"source":"Generac SIB23-37-C2.4 (A0005358316) Rev A, Jan 2024"},
  {"id":"gen-pib18-07-c","brand":"Generac","number":"PIB18-07-C","docNo":"A0000032175","rev":"A","date":"2019-03","type":"Product","title":"Replacement Protector board 0K2267C (hw 1.05) reads utility at half - load firmware 1.42+","applies":{"genFamilies":["gen-generac-protector-rg-evolution"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Field replacement Protector controller boards 0K2267C with hardware version 1.05 running firmware 1.41 or earlier; older hardware and 2-wire-start setups are not affected.","summary":"Hardware 1.05 boards on firmware 1.41 or older read utility at about half its real value, so the unit starts and runs in AUTO with utility present and may throw overload or random alarms. Lowering the utility threshold does not help; load firmware 1.42 or later.","steps":["When installing any replacement 0K2267C board, check hardware and firmware versions.","Install Protector firmware 1.42 or later using the process in PIB14-09-EL.","Verify the controller now reads the correct utility voltage and stays off with utility present."],"priority":"high","confidential":true,"source":"Generac PIB18-07-C (A0000032175) Rev A, Mar 2019"},
  {"id":"gen-pib16-08-icgen","brand":"Generac","number":"PIB16-08-ICGEN","docNo":"10000007805","rev":"A","date":"2016-11","type":"Product","title":"H-100 replacement panel can be ordered pre-programmed (0F28150PSRV)","applies":{"genFamilies":["gen-generac-protector-sg-h100"],"modelRe":[],"controllers":["H-100"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Industrial and commercial generators using the H-100 control panel.","summary":"Information only: replacement H-100 panels can be ordered pre-programmed with the latest firmware and the unit's XML for an extra charge, or unprogrammed to set up in the field.","steps":["Pre-programmed panel part number: 0F28150PSRV; include the unit serial number on the order.","Pre-programming does not cover calibration, transfer switch configuration or site settings - do those on site.","Field programming cable: P/N 0F7707."],"priority":"info","confidential":true,"source":"Generac PIB16-08-ICGEN (10000007805) Rev A, Nov 2016"},
  {"id":"gen-sib11-04-hac","brand":"Generac","number":"SIB11-04-HAC","docNo":"","rev":"","date":"2011-03","type":"Service","title":"CorePower replacement engine: swap the fuel jet for LP vapor","applies":{"genFamilies":["gen-corepower-7"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"CorePower vertical home standby units receiving a replacement engine.","summary":"Replacement CorePower engines ship with the natural gas jet installed and an LP jet loose in the box. For LP vapor, swap the jet in the throttle-body fuel inlet.","steps":["Jets: 0J2002BSRV = natural gas (5.11, larger ID); 0J2002ASRV = LPV (4.38, smaller ID).","At the throttle assembly on the intake, remove the hose clamp and fuel hose.","Pull the NG jet out of the fuel inlet; fit the supplied O-ring in the LP jet's groove and insert it.","Refit hose and clamp, make sure the hose is not kinked."],"priority":"normal","confidential":false,"source":"Generac SIB11-04-HAC, Mar 2011"},
  {"id":"gen-sib21-01-c","brand":"Generac","number":"SIB21-01-C","docNo":"A0001376562","rev":"A","date":"2021-03","type":"Service","title":"Protector diesel: correct way to splice the Common Alarm Relay harness for the NOC kit","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Protector Series diesel units with D2.2L, D2.5L or D3.3L engines when installing the NOC Interface PCB Kit.","summary":"Modifying the Common Alarm Relay harness the wrong way causes problems with the NOC Interface PCB Kit. Splice it with quick-disconnects as below.","steps":["Cut the factory CAR loop wire 209/210 and put insulated quick-disconnects on both ends.","Cut the CAR1 connector off wires 209 and 210 of the NOC kit harness; fit the opposite-gender quick-disconnects.","Connect NOC 209 to one factory 209/210 wire and NOC 210 to the other."],"priority":"normal","confidential":true,"source":"Generac SIB21-01-C (A0001376562) Rev A, Mar 2021"},
  {"id":"gen-pib07-04-s","brand":"Generac","number":"PIB07-04-S","docNo":"","rev":"","date":"2007-03","type":"Product","title":"1.6L liquid-cooled units: 5W-30 synthetic and cold start kit below 32 F","applies":{"genFamilies":["gen-generac-protector-qt-nexus"],"modelRe":["^QT[0-9]{3}16"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Generac liquid-cooled generators with the 1.6 liter engine.","summary":"Information only: below 32 F (0 C) use 5W-30 synthetic oil in 1.6L liquid-cooled units. A cold weather start kit and a block heater are available.","steps":["Below 32 F / 0 C: 5W-30 synthetic oil.","Cold weather start kit 0F6148CSRV (battery warmer, junction box, 6 qt 5W-30 synthetic).","Block heater: P/N 0G3063."],"priority":"info","confidential":false,"source":"Generac PIB07-04-S, Mar 2007"},
  {"id":"gen-sib22-22-y","brand":"Generac","number":"SIB22-22-Y","docNo":"A0003850970","rev":"A","date":"2022-12","type":"Service","title":"False FDEP fuel leak alarm - replace leak detect switch 0G2807 with 10000031362","applies":{"genFamilies":[],"modelRe":["^G0071360"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G0071360 and units with the D2.2L engine and/or leak detect switch 0G2807.","summary":"Leak detect switch 0G2807 can alarm with no fuel in the rupture tank, or cycle on and off. Replace it with FDEP-compliant switch 10000031362 in the horizontal tank port and plug the top port.","steps":["Remove leak switch 0G2807.","Install new switch 10000031362 in the horizontal port on the tank.","Plug the top access port with pipe plug G024310 (1/2 in).","Warranty: 0.5 hr, 0G2807 as primary causal part, SIB22-22-Y in text field, 10000031362 under replaced parts."],"priority":"normal","confidential":true,"source":"Generac SIB22-22-Y (A0003850970) Rev A, Dec 2022"},
  {"id":"gen-pib03-06-s","brand":"Generac","number":"PIB03-06-S","docNo":"","rev":"","date":"2003-05","type":"Product","title":"Enclosure care: mild soap, no pressure washer, car wax in corrosive areas","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20","gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All enclosed units.","summary":"Information only: clean enclosures with mild detergent and water, then rinse. Never use a pressure washer or harsh cleaners; car wax helps, especially in salt air or chemical environments.","steps":["Wash with mild detergent and water, rinse with clean water.","Never pressure wash; avoid aggressive cleaners.","Quality car wax is fine; recommended at normal intervals in corrosive (salt air, chemical) locations."],"priority":"info","confidential":false,"source":"Generac PIB03-06-S, May 2003"},
  {"id":"gen-sib20-21-h","brand":"Generac","number":"SIB20-21-H","docNo":"A0001236470","rev":"A","date":"2021-05","type":"Service","title":"Exhaust leak from under-torqued manifold bolts - retorque to 18 ft-lbs","applies":{"genFamilies":["gen-guardian-evo2-10-26"],"modelRe":["^G00(70632|70432|70422|70391)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Models G007063-2, G007043-2, G007042-2 and G007039-1 only.","summary":"Exhaust manifold bolts may have been under-torqued at the factory, causing an exhaust leak. Retorque them in the bulletin's pattern.","steps":["Tighten the exhaust manifold screws to 18 ft-lbs (24.4 Nm).","Follow the tightening sequence shown in the bulletin figure."],"priority":"normal","confidential":true,"source":"Generac SIB20-21-H (A0001236470) Rev A, May 2021"},
  {"id":"gen-wib17-01-evo","brand":"Generac","number":"WIB17-01-EVO","docNo":"10000010749","rev":"F","date":"2018-07","type":"Warranty","title":"Before replacing an air-cooled Evolution controller: reseat, reflash, document tests","applies":{"genFamilies":["gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-guardian-evo2-20-3ph"],"modelRe":[],"controllers":["Evolution 1.0","Evolution 2.0"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All 2013 and newer air-cooled home standby units with Evolution controllers, except PowerPact, Synergy, and EcoGen with G-Flex.","summary":"Generac wants a reseat-and-reflash done and the diagnostic manual flow charts followed before any Evolution controller is replaced under warranty. The claim needs this bulletin's form filled in (fault history, flow chart problem and test numbers with results) and the old controller sent back; good or abused boards come back to the dealer with a $50 test and handling invoice.","steps":["Use Diagnostic Manual 0H9172 (Rev K or higher), or 10000014636 (Rev A or higher) for 3-phase units.","Controller OFF, open the utility main breaker (kills N1/N2/T1), open the generator MLCB, pull the 7.5 A fuse.","Remove the controller cover and mounting screw, slide the controller back and lift it out; release each connector tab and pull straight out (never by the wires), including the stepper motor and T1/Neutral plugs.","Inspect every pin; replace the harness if any pin is damaged.","Reconnect: 16-pin first, then 4-pin, then 20-pin until each clicks; then stepper motor (check alignment ridges) and T1/Neutral. Check the 7.5 A fuse for continuity and reinstall.","Load the latest firmware from GENservice onto a flash drive, plug it into the controller USB port, turn the controller ON, update per the Firmware Update procedure in the manual's Main Menu Map, then finish the Install Wizard.","Close utility breaker, set AUTO, close generator MLCB, test operation and confirm it is set for automatic.","If the controller still must be replaced: fill in the form (first 5 fault alarms with dates, complaint, flow chart and test results), attach to the claim, label the board and ship it with the return label."],"priority":"normal","confidential":true,"source":"Generac WIB17-01-EVO (10000010749) Rev F, Jul 2018"},
  {"id":"gen-pib14-09-el","brand":"Generac","number":"PIB14-09-EL","docNo":"","rev":"A","date":"2014-04","type":"Product","title":"Liquid-cooled Evolution firmware update and bootloader LED troubleshooting","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":["Evolution"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All liquid-cooled generators with the Evolution controller.","summary":"How to get the liquid-cooled Evolution firmware (LCEvo.gen) from GENservice onto a FAT32 flash drive and load it into the controller, plus a table of what the bootloader LEDs and messages mean when a load fails. The version shown in the bulletin (rev 1_25) is only an example.","steps":["Use only a SanDisk Ultra Backup 8GB or Verbatim Store 'n' Go 8GB drive (the only ones Generac tested); format it FAT32.","From GENservice Service Documents, open the \"Evolution Firmware LC\" folder, extract the zip to the desktop without opening the firmware file (opening it can corrupt it).","Copy only the LCEvo.gen file to the root of the drive - one file, not in a folder, not renamed.","Load it with the Firmware Update item in the menu map; it takes a few minutes and is done when the Install Wizard shows. Set fuel, time and date, then simulate an outage to check operation.","Flashing User Run LED, controller will not run: no valid application. Insert the drive with a good LCEvo.gen in the root and watch for the green LED flashing (download started).","Flashing red LED: the file or the drive is bad. Reinsert, recopy the file, or try another (recommended) drive.","Download loops (green flashing, then repeats) with a known-good file: controller flash memory is bad - replace the controller.","\"Invalid File\" = wrong or renamed file; \"Corrupted File\" = failed CRC, recopy; \"Unsupported Device\" or controller locks up = drive drew too much current, software fuse resets in about 50 seconds - remove the drive and use a supported one."],"priority":"normal","confidential":true,"source":"Generac PIB14-09-EL Rev A, Apr 2014"},
  {"id":"gen-sib20-12-w","brand":"Generac","number":"SIB20-12-W","docNo":"A0000961626","rev":"B","date":"2022-04","type":"Service","title":"TX transfer switch: how it works, manual transfer, passwords, firmware, calibration","applies":{"genFamilies":[],"modelRe":[],"controllers":["TX"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX-controlled transfer switches.","summary":"Overview of the TX transfer switch: motor-charged spring mechanism (2, 3 or 4 pole), time delay neutral latch, manual operation, menu passwords, firmware update, and meter calibration. Turn Maintenance ON before moving the contactor by hand or the controller will show \"Cont Pos Error\" until the contactor is back where it expects.","steps":["Never transfer by hand under load: remove all power first (owner's manual Section 3), then set Maintenance ON at the switch controller.","Check the observing window: S1, S2 or White (White = latched in neutral on time-delay-neutral units).","Out of Source 1: handle in the lower receptacle, about ten turns counter-clockwise. Out of Source 2: about ten turns clockwise.","If it stops on White, put the handle in the upper receptacle and lift gently to release the neutral latch; finish the transfer once started.","Passwords: Maintenance menu code (see the bulletin), Installer menu code (see the bulletin), Dealer menu code (see the bulletin); screens stay open for 25 minutes.","At 480 VAC the harness plug must be in J6; if it is in J5 the screen says \"Please move J5 to J6\" (shows when line-to-line is over 350 VAC).","Firmware: file on the root of a flash drive, panel powered from S1, S2 or a 12/24 VDC supply (not the internal battery alone), Dealer password, Info > Update, Yes. See SIB20-08-W.","After the generator is calibrated, calibrate the switch to a calibrated meter with the up/down arrows (left/right moves between phases/amps). TTS units with the W-style contactor need the I/O module; program the contactor style when replacing a TX controller."],"priority":"normal","confidential":true,"source":"Generac SIB20-12-W (A0000961626) Rev B, Apr 2022"},
  {"id":"gen-wib10-02-gall","brand":"Generac","number":"WIB10-02-GALL","docNo":"","rev":"","date":"2012-02","type":"Warranty","title":"Nexus controller must be activated before it will run in AUTO","applies":{"genFamilies":["gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-generac-protector-qt-nexus"],"modelRe":[],"controllers":["Nexus"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Nexus-controlled Generac standby units: 8-20 kW built April 19, 2010 or later, 22-60 kW built June 1, 2010 or later (70-150 kW were to follow by year end).","summary":"Nexus units need a one-time product activation code before AUTO works; without it the unit runs only in manual and shows NOT ACTIVATED. Get the code with the generator and transfer switch serial numbers at activategen.com or 1-888-9ACTIVATE (922-8482).","steps":["Have the generator AND transfer switch serial numbers ready.","Get the passcode at www.activategen.com or call 1-888-9ACTIVATE (922-8482).","At power-up pick the language, then press ENTER at \"Activate me (ENT) or ESC to run in manual\".","Enter the passcode one digit at a time with the arrow keys and ENTER (ESC backs up a digit). It is done when \"SELECT HOUR (0-23)\" shows; finish setting the time.","If ESC was pressed by mistake (NOT ACTIVATED): pull the control panel fuse AND unplug T1/N1/N2 in the connection box (or open the utility breaker to the switch) for 3-5 seconds, reconnect, and start over.","\"Wrong Passcode Try Again\" twice: check the code on activategen.com; if it is right and still refused, call 1-888-9ACTIVATE.","Give the homeowner a copy of the activation confirmation."],"priority":"normal","confidential":false,"source":"Generac WIB10-02-GALL, Feb 2012"},
  {"id":"gen-wib19-01-hac","brand":"Generac","number":"WIB19-01-HAC","docNo":"A0000138502","rev":"D","date":"2025-03","type":"Warranty","title":"Before replacing Evolution 2.0 controller (Rev R+): reseat, reflash, form A0000138510","applies":{"genFamilies":["gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-guardian-evo2-20-3ph"],"modelRe":[],"controllers":["Evolution 2.0"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled units with Evolution 2.0 controller P/N 10000003275 Rev R or later; generators with serial numbers above 3015006875 have these.","summary":"Before a warranty swap of an Evolution 2.0 (10000003275 Rev R+) controller, reseat all connectors, reflash the latest firmware, and work the diagnostic manual flow charts. The claim must include submittal form A0000138510 (up to 10 fault alarms with dates, test numbers and results) and the board goes back to Generac; good or abused boards draw a $50 test and handling invoice.","steps":["Confirm the controller label shows P/N 10000003275 Rev R or higher.","Use diagnostic manual 10000041488 (AC Evolution 1.0/2.0), or 10000014636 for 3-phase units - latest revision on GENservice.","Controller OFF, pull the N1/N2/T1 fuses (or unplug the SACM board connector), open the generator MLCB, pull the 7.5 A fuse.","Remove the controller; check connectors are locked, look for loose or damaged pins; release tabs and pull straight out (not by the wires), including the stepper motor and T1/Neutral (BCH) plugs. Replace the harness if any pin is damaged.","Reconnect 16-pin, then 4-pin, then 20-pin until they click; stepper motor (check ridges), T1/Neutral. Check and reinstall the 7.5 A fuse.","Load the latest GENservice firmware from a flash drive and follow the Firmware Update procedure in the manual's Main Menu Map and the Install Wizard.","Reinstall N1/N2/T1 fuses (or SACM connector), AUTO, close the MLCB, test, confirm automatic operation.","If replacement is still needed: complete form A0000138510, attach it and the claim, label the board and ship with the form's return label."],"priority":"normal","confidential":true,"source":"Generac WIB19-01-HAC (A0000138502) Rev D, Mar 2025"},
  {"id":"gen-sib14-01-all","brand":"Generac","number":"SIB14-01-ALL","docNo":"","rev":"B","date":"2014-02","type":"Service","title":"Official simulated power outage (transfer test) procedure with fuel pressure checks","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20","gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All air-cooled and liquid-cooled residential/commercial generators.","summary":"Generac's official way to transfer-test a standby unit: verify voltages and fuel pressure (static, cranking, running, full load) and simulate the outage by opening the utility main breaker - never by pulling the N1/N2 fuses. Fuel pressure must stay in the owner's manual spec and not vary by more than 1 inch water column.","steps":["Before testing: startup checks done (oil, activation, battery), torque all lugs in generator and switch, measure utility voltage and frequency L-L and L-N at each point.","Gauge on the regulator inlet port (before the solenoid). Record static pressure; generator breaker OFF, start in MANUAL and record cranking pressure, then running pressure (diesel: just check base tank level).","Running, check voltage/frequency at the generator breaker input; breaker ON, check at E1/E2 in the switch.","If any pressure is out of spec or drops more than 1 inch w.c., fix the fuel supply before transfer testing.","Generator breaker ON, AUTO; turn off all branch breakers in the protected panel; open the utility main to simulate the outage (do NOT pull N1/N2 fuses).","After transfer, check voltage/frequency at T1/T2 and in the protected panel; turn branch circuits on one at a time, recheck, and record full-load fuel pressure (within 1 inch w.c. of static).","Restore utility, let it retransfer and cool down. Repeat with all branch breakers left ON to prove it picks up the full load at once.","Remove the gauge and reinstall the test port plug securely (gaseous units)."],"priority":"normal","confidential":true,"source":"Generac SIB14-01-ALL Rev B, Feb 2014"},
  {"id":"gen-pib14-01-erpl","brand":"Generac","number":"PIB14-01-ERPL","docNo":"A0000315891","rev":"H","date":"2026-10","type":"Product","title":"How to order a replacement engine (EPA tracking, request form)","applies":{"genFamilies":["gen-generac-next-gen-10-28","gen-guardian-next-gen-22-25-y32","gen-generac-next-gen-20-3ph","gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22","gen-guardian-evo2-dr-11-20","gen-guardian-evo2-powermate-11","gen-synergy-evo2-20","gen-ecogen-evo2-15","gen-guardian-evo2-20-3ph","gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-ecogen-evo1-15","gen-synergy-vscf-20","gen-guardian-nexus-8","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20","gen-ecogen-nexus-6","gen-powerpact-7-75","gen-corepower-7","gen-guardian-pre-nexus-legacy-7-18","gen-guardian-pre-nexus-2008-8-20","gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All products with air-cooled gaseous or gasoline, liquid-cooled gaseous, or diesel engines, in or out of warranty.","summary":"Replacement engines are tracked for EPA compliance. Currently certified air-cooled engines can be ordered directly (D360 for residential, GENservice for industrial); liquid-cooled gaseous and diesel engines and no-longer-certified air-cooled engines need the replacement engine request form, and the old engine may have to be destroyed.","steps":["Look up the engine in GENservice: if it is priced (or points to a priced P/N) order it directly; if it has a note saying to use the form, fill out the form.","Form needs: dealer info, generator serial and model, running hours, failure description, fuel type, application (standby/prime/mobile), and photos of the generator data plate, engine data plate and emissions decal.","Liquid-cooled engines also need engine S/N, engine P/N or model, and emissions engine family; 3.0L and 6.8L gaseous engines need extra component P/Ns (block, head, valve cover, intake type, etc.).","Send air-cooled home standby and residential liquid-cooled requests to rescomdealerparts@generac.com; industrial to Parts.Technical@generac.com.","Generac Service approves and supplies a replacement engine kit P/N and quote; Parts then contacts you to confirm and arrange payment.","If told to, destroy the old engine and send written confirmation (Form GEP005-3). Falsifying the form can break EPA rules."],"priority":"info","confidential":true,"source":"Generac PIB14-01-ERPL (A0000315891) Rev H, Oct 2026"},
  {"id":"gen-sib18-08-rad","brand":"Generac","number":"SIB18-08-RAD","docNo":"10000039569","rev":"A","date":"2018-09","type":"Service","title":"Field repair methods for leaking aluminum radiators","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All industrial and mobile products with aluminum radiators.","summary":"Approved ways to try repairing small leaks in aluminum radiators: solder rods on thick tank areas, two-part epoxy for pinholes, heat-cured epoxy for tube-to-header leaks, and TIG welding for tank/header welds. Generac does not guarantee these repairs will hold.","steps":["Clean the area to bare aluminum with acetone and a clean wire brush, without making the damage worse.","Tank areas, tank-to-header and fitting-to-tank joints, pinholes up to about 1/8 in.: solder-torch repair with Dura-Fix repair rods.","Small pinholes in tanks or reachable tubes: two-part epoxy, using an evacuation pump to pull a little epoxy into the hole plus some on the outside.","Pinholes hidden by fins: carefully remove fins (needle nose pliers, Dremel with tiny brush), lightly brush the tube, clean with acetone, then epoxy as above - fins are brazed, so pulling can tear a bigger hole.","Tube-to-header leak: degrease (white spirit or Loctite 7063), heat to about 176 F (80 C), apply Daubond R-415-132M4, spread with heat gun, cure at 350-400 F (177-204 C) for 30-60 minutes, leak test.","Tank or header-to-tank weld leak: argon-arc weld with 2,4 OK Tigrot 4043 rod and 3,2 WL-20/WL-15/WP/WZ-8 tungsten, clean, leak test."],"priority":"info","confidential":true,"source":"Generac SIB18-08-RAD (10000039569) Rev A, Sep 2018"},
  {"id":"gen-sib09-1-g","brand":"Generac","number":"SIB09-1-G","docNo":"","rev":"","date":"2009-10","type":"Service","title":"Generator location and concrete pad sizing formula","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"General guidance for siting and pouring a concrete base for a generator set (example uses a 4.5L SD100).","summary":"Placement rules and a formula for sizing a concrete pad so the pad weighs about as much as the generator set. Pad depth = wet weight / (150 x width ft x length ft), never less than 6 inches.","steps":["Site: keep inlet/outlet clear of leaves, snow, etc.; high ground; level within 1/2 inch all around; about 5 ft service room on all sides (check the install drawing); face air inlets into strong prevailing wind; close to the transfer switch and fuel supply where codes allow.","Pad should extend at least 12 in. (0.305 m) past the generator on all sides.","Depth (ft) = wet weight (lb) / (150 x width ft x length ft). Example in bulletin: 3341 lb, 3.083 x 7.75 ft base = 0.932 ft (about 11.2 in.).","Minimum pad thickness 6 inches even if the formula gives less.","Concrete 1:2:3 cement/sand/aggregate, max 4 in. slump, 3000 psi at 28 days.","Reinforce with No. 8 gauge wire fabric on 6 in. centers, or No. 6 bars on 12 in. centers, at least 3 in. from the surface; anchor with masonry bolts."],"priority":"info","confidential":false,"source":"Generac SIB09-1-G, Oct 2009"},
  {"id":"gen-sib25-23-16","brand":"Generac","number":"SIB25-23-16","docNo":"","rev":"A","date":"2025-12","type":"Service","title":"D6.7L 150/175 kW: AVR Data Fail alarms or no crank - rewire starter control, DSE setting","applies":{"genFamilies":[],"modelRe":[],"controllers":["DSE G8601"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"D6.7L High Output 150 kW and 175 kW diesel units.","summary":"The battery voltage dip on initial crank pulls the DC bus too low for the ECU to keep cranking, causing a failure to crank or nuisance AVR Data Fail alarms. Fix: move two wires so the ECU no longer controls the starter, and set the AVR Data Fail arming to From Safety On in the DSE G8601. Warranty: 0.25 hr with D6.7L as primary failed part, SIB25-23-16 in comments.","steps":["Take the unit out of automatic.","Move wire 56 from RB1-7 to RB1-8.","Unplug RB1A and move wire 56P from RB1A-2 to RB1A-1 (K4 relay will then switch with nothing connected to it).","Connect a PC with DSE Configuration Suite (version compatible with the controller firmware) by Ethernet or USB; Read from module.","Go to Advanced > Generac AVR > Module Options; if AVR Data Fail arming is Always, change it to From Safety On.","Save the config to the PC as a site backup, Write to module, click Ignore on the warning, Yes, then OK when done; disconnect.","Run in manual, check voltage and speed, then return to automatic."],"priority":"high","confidential":true,"source":"Generac SIB25-23-16 Rev A, Dec 2025"},
  {"id":"gen-sib24-25-w","brand":"Generac","number":"SIB24-25-W","docNo":"A0006376179","rev":"A","date":"2024-09","type":"Service","title":"600A TX/HX built before 5/9/2024: fitting a replacement mechanism (S1/S2 swap)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"600A TX and HX transfer switches built before 5/9/2024.","summary":"Early 600A TX/HX switches used the front terminals as Source 1; switches built after 5/9/2024 and all replacement mechanisms use the REAR terminals as Source 1. When repairing an early switch with a new mechanism, relabel it, add the adapter plate, rewire per the bulletin, and check the controller source settings.","steps":["Watch the GENservice training video \"600A TX Switch - Contactor Replacement\" (Training Videos Industrial > Transfer Switch). Work on a de-energized assembly, before installing the mechanism.","Apply the included decals over the factory ones so the rear terminals read S2: manual operation A0000469825, position indicator A0000474083, and schematic A0002257001 (in-phase) or A0002271095 (TDN), model dependent.","Fasten adapter plate A0002036867 to the new mechanism with (4) M6 screws at 72 in-lb (8.1 Nm).","Line up the cassettes, insert the square shaft into the mechanism coupler, and tighten (6) 5/16-18 screws to 15 ft-lb (20.3 Nm).","Motor wiring: main harness 868 to motor harness 868, 869 to 869.","Microswitches: 0A and 147 to SW1; 0A and 148 to SW2; AUX3 NC/COM/NO to SW3; AUX4 NC/COM/NO to SW4.","In the TX controller, check the \"Source 1 is Generator\" / \"Source 2 is Generator\" settings match the previous setup."],"priority":"normal","confidential":true,"source":"Generac SIB24-25-W (A0006376179) Rev A, Sep 2024"},
  {"id":"gen-sib25-02-c","brand":"Generac","number":"SIB25-02-C","docNo":"A0008073499","rev":"A","date":"2025-06","type":"Service","title":"XG032/XG040: miswired harness at WAGO block TB3 - no transfer or no 2-wire start","applies":{"genFamilies":[],"modelRe":["^XG0(32|40)45"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"XG03245 and XG04045 with serial numbers before 3016418408.","summary":"The factory harness was landed in the wrong order on customer connection WAGO block TB3, so the generator may not command the transfer switch or the 2-wire start will not work. Re-land the five TB3 wires in the correct order. Warranty: harness A0005288390 as primary failed part, 0.5 hr, SIB25-02-C in comments.","steps":["Disconnect power and the battery negative cable (DC is present at the WAGO block).","Remove the 16 screws holding the right side panel and stub-up panel; take off the right side panel (corner caps can stay).","Find the terminal strip labeled TB3 near the neutral connection. Only TB3 is wrong; TB2 and TB4 are fine.","Remove all harness wires from the factory side of TB3.","Re-land: 183A in X5, 178 in X4, 183 in X3, 23 in X2, 194 in X1 (top to bottom reads 183A, 178, 183, 23, 194).","Reconnect battery, restore power, do a transfer test per Installation Manual A0005536699, reinstall the panel, leave in AUTO."],"priority":"high","confidential":true,"source":"Generac SIB25-02-C (A0008073499) Rev A, Jun 2025"},
  {"id":"gen-pib08-21-hall","brand":"Generac","number":"PIB08-21-HALL","docNo":"","rev":"A","date":"2008-07","type":"Product","title":"Wiring mismatched load center switches to 5000/5500 series gens; RTSS on liquid-cooled","applies":{"genFamilies":[],"modelRe":["^RTSS"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Pre-2008 load center switch with a 5500 series air-cooled generator, 2008+ load center switch with a 5000 series air-cooled generator, and an RTSS load shed switch with a liquid-cooled generator.","summary":"How to connect the control wires when the generator and transfer switch wire numbers do not match. The wiring diagrams did not extract from the bulletin - see the bulletin diagrams for the exact wire-to-wire connections.","steps":["Pre-2008 switch + 5500 series generator: junction box has 5 generator wires and 4 switch wires; join per the bulletin diagram with UL wire nuts; the 0 wire is not used. Battery charger is in the generator.","2008+ switch + 5000 series generator: 4 generator wires and 5 switch wires; join per the diagram; 0 wire not used. Remove the battery charger from the transfer switch (generator uses its 12 VDC trickle charger).","RTSS + liquid-cooled generator: only N1, N2, 23 and 194 are used at the generator terminal strip; the switch brings N1, N2, 15B and 23, and 15B lands on 194. No 0 wire needed.","RTSS + liquid-cooled: remove the battery charger from the transfer switch; the generator's 12 VDC charger is used."],"priority":"info","confidential":false,"source":"Generac PIB08-21-HALL Rev A, Jul 2008"},
  {"id":"gen-pib04-05-z","brand":"Generac","number":"PIB04-05-Z","docNo":"A0005516060","rev":"A","date":"2025-04","type":"Product","title":"Failed 1 A voltage sensing fuses can cause over-voltage: fit 5 A fuses, set shutdown","applies":{"genFamilies":[],"modelRe":[],"controllers":["Power Zone","PM-DCP","GEM750","Gemini"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All Power Manager Digital Control Platform (PM-DCP) and all Power Zone platform generators that have 1 A sensing fuses.","summary":"A failed 1 A sensing fuse can make the generator put out high voltage, with or without shutting down. Replace the 1 A sensing fuses with 5 A fuses and make sure over-voltage is set as a shutdown. Warranty (full coverage only): FU0057A04 as primary failed part, 0.5 hr plus 1 trip, PIB04-05-Z in comments, enter purchased parts.","steps":["GEM750/Gemini: order twelve fuses P/N 073590A. Power Zone units with 1 A sensing fuses: order six P/N 073590A (5 A).","GEM750/Gemini: all units OFF with E-stop pushed in, all transfer switches in MANUAL.","Remove the six screws on the left side of the bus contactor side to reach the fuse holder.","Remove the 1 A BBS fuses (P/N 073590C), install BBS-5 fuses (P/N 073590A), replace the cover.","Key switch to AUTO, twist the E-stop clockwise to pull it out, acknowledge the E-stop alarms, return all transfer switches to automatic.","Power Zone setup software: go to Analog Input Channels, enter 31 under Channel No., Go To, and make sure the GT (greater than) setting is checked as SHUTDOWN, then Apply. (The first setup steps and screenshots did not extract - see the bulletin.)"],"priority":"high","confidential":true,"source":"Generac PIB04-05-Z (A0005516060) Rev A, Apr 2025"},
  {"id":"gen-a0012861172","brand":"Generac","number":"A0012861172","docNo":"","rev":"A","date":"2026-08","type":"Service","title":"G21.9L COP: rework harness 0L1674 into A0006882985 for the 23-pin throttle body","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G21.9L G30 COP industrial units being switched from Woodward throttle body 0L3648 (14-pin) to A0005763006 (23-pin).","summary":"When a 14-pin Woodward throttle body 0L3648 is replaced with the 23-pin A0005763006, the 0L1674 harness must be repinned into a 0E5431C 23-position connector, making it harness A0006882985. Information only.","steps":["Find the 14-position throttle body connector (THR) on harness 0L1674.","With a small flat screwdriver, push up the red lock and pull the black tab to remove the red lock.","De-pin each wire by pushing down the black locking tab and pulling the wire out.","With the red lock disengaged on the new 0E5431C 23-position connector, insert each wire into its pin location per the bulletin pin chart (Figure 4) until it clicks.","Tug-test each wire, then press the red lock down.","Relabel the harness \"A0006882985 - Rev A\" (label is by the CO1 connector)."],"priority":"normal","confidential":true,"source":"Generac A0012861172 Rev A, Aug 2026"},
  {"id":"gen-pib19-06-w","brand":"Generac","number":"PIB19-06-W","docNo":"A0000316614","rev":"A","date":"2019-11","type":"Product","title":"Transfer switch neutral wire may be landed on the ground bar - move it to the neutral bar","applies":{"genFamilies":["gen-guardian-evo2-9-22","gen-guardian-evo2-10-22-compact"],"modelRe":["^RXG16EZA3H?$","^G00(70850|70361|71720)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Transfer switches RXG16EZA3 and RXG16EZA3H, and units G0070301, G0070850, G0070361, G0070321, G0071720, G0071740, G0071770.","summary":"The transfer switch neutral wire (BK/W 00) may have been landed on the equipment ground bar instead of the unbonded neutral bar. Check and move it if needed.","steps":["Disable the generator: OFF, pull the F2 10 A control panel fuse, turn off the battery charger (T1 fuse or charger breaker), then disconnect the negative battery cable - charger off first.","Turn the utility supply OFF and open the switch enclosure.","If the neutral wire (BK/W 00) is on the equipment ground bar, move it; if it is already on the unbonded neutral bar on the right, no change needed.","To move it: remove from the terminal, cut off any ring terminal and strip the end, insert into the unbonded neutral bar, tighten to 20 in-lbs.","Close the enclosure, reverse the disable steps, turn utility back ON."],"priority":"high","confidential":true,"source":"Generac PIB19-06-W (A0000316614) Rev A, Nov 2019"},
  {"id":"gen-pib09-10-c24","brand":"Generac","number":"PIB09-10-C24","docNo":"","rev":"","date":"2009-09","type":"Product","title":"2.4L turbo 36/60 kW: insulate crankcase vent tube so it will not freeze and push oil out","applies":{"genFamilies":["gen-generac-protector-qt-nexus","gen-generac-protector-rg-legacy-3600"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"5146319","serialTo":"5311276","builtFrom":"","builtTo":""},"appliesText":"36 and 60 kW turbocharged 2.4L generators between serial numbers 5146319 and 5311276.","summary":"Below about 40 F the crankcase vent tube can block (freeze), which can blow oil out the dipstick tube. Fix by replacing the vent hose and elbow and insulating them, and putting a thermal conduit over the dipstick tube.","steps":["Remove the vent tube and brass elbow at the air intake.","Install new hose P/N 059057 and elbow P/N 0H1712 with hose clamps (Figure 1 for 36 kW, Figure 2 for 60 kW).","Cover the elbow completely with pipe insulation elbow 0H1787A (trim to fit), and the rest of the hose with pipe insulation 0H1787.","Peel the release paper and press the seams closed; wrap the joint between the two pieces with insulation tape 0H1801.","36 kW only: cap the open insulation end at the valve cover with the leftover tape.","Make sure the brass fitting at the valve cover and the elbow at the intake are fully covered.","Install thermal conduit 0H2574 over the dipstick tube. Lengths per kW are in the bulletin parts table (it did not extract cleanly)."],"priority":"normal","confidential":false,"source":"Generac PIB09-10-C24, Sep 2009"},
  {"id":"gen-pib18-02-gen","brand":"Generac","number":"PIB18-02-GEN","docNo":"10000036442","rev":"A","date":"2018-05","type":"Product","title":"Look up engine parts on GENservice by serial number","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All products.","summary":"For correct engine part numbers, search GENservice by serial number and use the engine parts manual for that unit. Air-cooled home standby units have no engine parts manual; use the engine exploded view (EV) instead.","steps":["In GENservice Parts tab, enter the serial number in Serial/Model Search.","Open the Documents tab; the unit's service documents are listed at the bottom.","Open the Engine Parts Manual and pick parts from it.","Air-cooled home standby: use the engine EV (exploded view) - it is the most accurate source."],"priority":"info","confidential":true,"source":"Generac PIB18-02-GEN (10000036442) Rev A, May 2018"},
  {"id":"gen-pib14-11-aacg","brand":"Generac","number":"PIB14-11-AACG","docNo":"","rev":"A","date":"2014-08","type":"Product","title":"Canada: protected circuits must come out of the utility panel (CEC 2012 12-3030)","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Pre-wired transfer switches used in Canada.","summary":"Canadian Electrical Code (2012) Section 12-3030 does not allow conductors from different power sources in the same box, so the generator-protected circuits must be pulled completely out of the utility main panel and into the Generac panel board ATS.","steps":["Option 1: mount a junction box next to the lower part of the Generac panel board ATS, pull the protected circuit wires off their breakers in the main panel and run them to that box.","Option 1: pull the branch wires out of the pre-wired 2 ft conduit, run them to the junction box, and splice with the supplied wire nuts.","Option 2: remove and discard the branch wires in the 2 ft conduit; run the protected circuit wires straight into the lower ATS (punch extra holes as needed) and land them on matching ATS breakers.","Option 2: install neutral ground kit model 006612-0 in the panel board as a ground kit for the branch circuit grounds.","Either way, no protected circuit may remain in the main panel."],"priority":"normal","confidential":true,"source":"Generac PIB14-11-AACG Rev A, Aug 2014"},
  {"id":"gen-pib10-06-aac","brand":"Generac","number":"PIB10-06-AAC","docNo":"","rev":"B","date":"2010-12","type":"Product","title":"RTSS200A3 load shed switch with Nexus: no power to the Nexus battery charger - rework","applies":{"genFamilies":[],"modelRe":["^RTSS200A3"],"controllers":["Nexus"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"RTSS200A3 load shed transfer switch used with a Nexus control panel (2010 home standby).","summary":"The RTSS200A3 does not feed power to the Nexus generator battery charger. Remove the charger from the switch and add a fused T1 supply using rework kit 0H93030SRV. Warranty does not apply.","steps":["Kill all power to the switch; remove the outer and inner covers.","At the charger (upper right), disconnect its 4 leads from the load shed controller terminal strips and retighten the screws; remove the charger from its velcro.","Mount single fuse holder 073591 to the left of the 2-position fuse holder with the supplied self-drilling screw; clean out drill chips.","Install a 5 A non-time-delay fuse 073590.","Run the T1 wire from the new fuse holder to the bus bar under the screw holding the other T1 wires; route with the harness away from the bus bars.","Wire the RTSS to the generator per interconnect diagram 0H9304 in the kit."],"priority":"normal","confidential":false,"source":"Generac PIB10-06-AAC Rev B, Dec 2010"},
  {"id":"gen-sib13-09-ecogen","brand":"Generac","number":"SIB13-09-EcoGen","docNo":"","rev":"A","date":"2013-07","type":"Service","title":"EcoGen 5818-1: pulse pump hoses may be swapped - crankcase overfills with oil","applies":{"genFamilies":["gen-ecogen-nexus-6"],"modelRe":["^0*5818-?1$"],"controllers":[],"codes":[],"serialFrom":"7995894","serialTo":"8176897","builtFrom":"","builtTo":""},"appliesText":"EcoGen model 5818-1, serial numbers 7995894 to 8176897.","summary":"The hoses at the pulse pump may be connected backward, which can overfill the crankcase with oil. A yellow X on the pump means it was already checked. Warranty: 1/2 hr to diagnose and fix; trip charge only if the hoses were already correct.","steps":["Remove the 7.5 A fuse and disconnect the battery.","Find the pulse pump. A yellow X on top means factory inspected - no action.","No X: check the pulse hose goes to the P port per the bulletin photos.","If wrong, swap the hoses at the pump fittings to match the correct routing.","Reconnect the battery (positive red first) and reinstall the 7.5 A fuse."],"priority":"high","confidential":true,"source":"Generac SIB13-09-EcoGen Rev A, Jul 2013"},
  {"id":"gen-sib18-07-aac","brand":"Generac","number":"SIB18-07-AAC","docNo":"10000035632","rev":"A","date":"2018-05","type":"Service","title":"New 0E9323 starter has a wider base - bend the heat shield for clearance (530/990/999cc)","applies":{"genFamilies":["gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22","gen-guardian-nexus-10-11","gen-guardian-nexus-12-17","gen-guardian-nexus-20"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Air-cooled 530cc, 990cc and 999cc engines.","summary":"Current and replacement 0E9323 starters have a mounting base 4.5 mm (0.177 in.) wider than the original, which can hit the heat shield trim on the rear cylinder head. The new starter fits once clearance is made.","steps":["Remove the old starter.","Loosen the 10 mm bolt holding the heat shield at the rear cylinder head.","Gently pry the heat shield away from the starter mounting surface.","Retighten the 10 mm bolt, then install the 0E9323 starter."],"priority":"normal","confidential":true,"source":"Generac SIB18-07-AAC (10000035632) Rev A, May 2018"},
  {"id":"gen-pib16-03-gn","brand":"Generac","number":"PIB16-03-GN","docNo":"10000003676","rev":"A","date":"2016-05","type":"Product","title":"Spinning tric nut (rivnut) on enclosure panel - retrofit kit instead of a new panel","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Commercial or industrial products, as needed.","summary":"Enclosure panel tric nuts (rivet nuts) can spin from overtightening or repeated removal so the panel will not tighten. A retrofit bracket and tric nut kit fixes it without replacing the panel. Ask Generac Tech Support or Warranty whether it is warrantable.","steps":["Order parts: G047411, G022097 (M6-1.0 x 16 screw), G022473, 10000002917 (M6 lock washer), 0G6471 - descriptions and quantities in the bulletin table (did not extract cleanly; includes bracket and tric nut kit, flat washers and 3M 5952 VHB tape).","Install as shown in the bulletin Figure 1.","Do not overtighten the new fastener."],"priority":"info","confidential":true,"source":"Generac PIB16-03-GN (10000003676) Rev A, May 2016"},
  {"id":"gen-sib25-06-mp","brand":"Generac","number":"SIB25-06-MP","docNo":"A0008243910","rev":"A","date":"2025-04","type":"Service","title":"MDE330/MDE570: Eaton SBN breakers replaced by SPN - same fit, terminal labels differ","applies":{"genFamilies":[],"modelRe":["^MDE(330|570)"],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"MDE330 and MDE570 with manual or motorized breakers.","summary":"Eaton discontinued the Magnum SBN (SB) breaker; the Power Defense SPN (SP) is the same form, fit and function but the wiring terminal blocks on top are labeled differently. Use the bulletin wiring figure to match generator harness wires to the new labels.","steps":["MDE570: non-paralleling A0005692133, paralleling-capable A0004897130.","MDE330: non-paralleling A0004897122, paralleling-capable A0005692132.","When an SPN replaces an SBN, land each harness wire by the SB-to-SP label cross-reference in the bulletin Figure 1."],"priority":"info","confidential":true,"source":"Generac SIB25-06-MP (A0008243910) Rev A, Apr 2025"},
  {"id":"gen-sib21-06-hac","brand":"Generac","number":"SIB21-06-HAC","docNo":"A0001533064","rev":"A","date":"2021-05","type":"Service","title":"Undervoltage (1900 group) faults: tighten stator terminal block nuts","applies":{"genFamilies":["gen-guardian-evo2-10-22-compact","gen-guardian-evo2-10-26","gen-guardian-evo2-response-16-22"],"modelRe":["^G00(70643|72090|72100|72101|72130|72340|72350|72370)"],"controllers":[],"codes":["1900"],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"G0070383, G0070393, G0070423, G0070433, G0070623, G0070633, G0070643, G0070653, G0072090, G0072100, G0072101, G0072130, G0072180, G0072340, G0072350, G0072370, and later models with a terminal block (A0000029777) on the alternator leads.","summary":"A loose connection at the stator lead terminal block can cause undervoltage (1900 group) faults. Check and torque the terminal block nuts.","steps":["Remove the terminal block cover.","Check for loose connections at stator terminals 33/22, 11, 44, 2 and 6.","Torque all M5-0.8 nylock nuts to 40-50 in-lbs (4.5-5.6 Nm).","Recheck; call tech support if undervoltage faults continue."],"priority":"high","confidential":true,"source":"Generac SIB21-06-HAC (A0001533064) Rev A, May 2021"},
  {"id":"gen-pib23-05-w","brand":"Generac","number":"PIB23-05-W","docNo":"A0004271401","rev":"A","date":"2023-04","type":"Product","title":"Some TX switches shipped with copper-only neutral lugs - order G0048200 for aluminum","applies":{"genFamilies":[],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"TX transfer switches with serials 3013187973, 3013266145, 3013266146, 3013289308, 3013312955, 3013318774, 3013330160, 3013334568, 3013341020, 3013341021, 3013344655, 3013356677, 3013356678, 3013394306, 3013394759, 3013412527, 3013416881, 3013416891, 3013434119, 3013434126, 3013434131, 3013437227, 3013437975, 3013437976.","summary":"These switches shipped with neutral lugs that only take copper, although the switch is rated for copper or aluminum. Not a warranty repair.","steps":["Check the switch serial against the list.","If aluminum conductors are used, order lug assembly G0048200 (rated for aluminum and copper) and install it on the neutral."],"priority":"normal","confidential":true,"source":"Generac PIB23-05-W (A0004271401) Rev A, Apr 2023"},
  {"id":"gen-tib14-04-aall","brand":"Generac","number":"TIB14-04-AALL","docNo":"","rev":"A","date":"2014-04","type":"Training","title":"Correction to Test FB2 (wire 4A field flash) in diagnostic manual 0H9172 Rev G","applies":{"genFamilies":["gen-guardian-evo1-8","gen-guardian-evo1-11","gen-guardian-evo1-13-17","gen-guardian-evo1-20-22"],"modelRe":[],"controllers":["Evolution 1.0"],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"Diagnostic Manual 0H9172 Rev G (50/60 Hz air-cooled with Evolution or Nexus control).","summary":"Step 2 of Test FB2 (Test Wire 4A Evolution, page 66) in manual 0H9172 Rev G was wrong. Find wire 4A on the back of the control panel without removing the harness. Fixed in Rev H and later.","steps":["If using 0H9172 Rev G, Test FB2 step 2: locate wire 4A on the back of the control panel.","Do NOT remove the harness from the control panel for this test.","Use Rev H or later of the manual where this is corrected."],"priority":"info","confidential":true,"source":"Generac TIB14-04-AALL Rev A, Apr 2014"},
  {"id":"gen-sib21-11-g","brand":"Generac","number":"SIB21-11-G","docNo":"A0001977847","rev":"A","date":"2021-10","type":"Service","title":"Liquid-cooled fuel conversion kits no longer available","applies":{"genFamilies":["gen-generac-protector-rg-evolution","gen-generac-protector-rg-legacy-3600","gen-generac-protector-qt048-r200b","gen-generac-protector-qt-nexus","gen-generac-protector-sg-h100"],"modelRe":[],"controllers":[],"codes":[],"serialFrom":"","serialTo":"","builtFrom":"","builtTo":""},"appliesText":"All liquid-cooled generators.","summary":"As of September 15, 2021, fuel conversion kits for liquid-cooled generators are not available to the field until further notice.","steps":["Do not quote a liquid-cooled fuel conversion kit; none are available to the field.","Check with Generac for any later change before telling the customer."],"priority":"info","confidential":true,"source":"Generac SIB21-11-G (A0001977847) Rev A, Oct 2021"},
];

