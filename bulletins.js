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
    priority: "info", source: "Kohler PB-156 (as cited in the app)" }
];

