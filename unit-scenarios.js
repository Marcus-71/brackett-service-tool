/*
 * Unit-specific troubleshooting (v285): heating problems written for one
 * equipment family from its own service / installation manual, with the page.
 * `unit` is the Tag Scanner library pattern (MODEL_PATTERNS) for that family,
 * so a scanned model gets its own scenarios. Built by tools/build-unit-scenarios.js
 * - edit the research JSON and rebuild rather than editing this file.
 */
const UNIT_SCENARIOS = [
 {
  "id": "u-carrier-59mn7-no-heat-led",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "No heat, status light dark or flashing fast — 59MN7C",
  "summary": "Work the 59MN7C troubleshooting chart from the amber status light before you buy parts.",
  "steps": [
   "Pull the door and read the amber status LED. The manual notes it stays dark for 1 minute after anyone presses MENU or NEXT, so wait before calling it dead.",
   "LED off: check 115V at L1 and L2. If 115V is there, check 24V at SEC-1 and SEC-2. 115V in but no 24V means replace the transformer; 24V present with a dark LED means replace the furnace control.",
   "No 115V at L1/L2: check the blower door switch is closed, then 115V going to the switch (replace the switch if power reaches it but not the board), then the breaker and the wire from the breaker to the furnace.",
   "LED blinking rapidly with no pause: line voltage polarity is reversed and the display shows 10.1 — the furnace will not run. On twinned furnaces also check 24V transformer phasing.",
   "Display 24.1: the 3-amp automotive fuse on the control is blown from a short in the 24V wiring. Disconnect the thermostat leads to isolate the short and replace it ONLY with a 3-amp fuse.",
   "Slow short/long flashes: the sight-glass LED shows only the major code (first two digits). To read the full major.minor code the door must be off and the door switch held closed.",
   "Fault history: MENU to FLt, then NEXT steps through the last 7 codes, newest first ('non' = none). Faults stay for 72 hours of powered operation after the last one and survive a 115V or 24V power loss; clear with CLr.",
   "No stored code and no response: check 24V at W, Y, G on the furnace control. No 24V there = thermostat or cable. 24V present but no response: disconnect all thermostat wires and jumper. Works on a jumper = thermostat not compatible (ballast resistor, connect Com24V, or replace the thermostat); still dead on a jumper = replace the control."
  ],
  "safety": "The blower door switch removes 115V. The manual says to hold it closed with one hand while using the buttons — never tape or bypass it.",
  "manual": "carrier-59mn7c-04si",
  "pages": [
   73,
   63,
   53,
   50
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.73, p.63, p.53, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59mn7-ignition-lockout",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Inducer and igniter run, burners never light (14.1 / 34.1) — 59MN7C",
  "summary": "Follow the 59MN7C ignition sequence and the 34.1 check order to split igniter, gas valve and control faults.",
  "steps": [
   "Know the normal order: on a heat call the control checks that the LPS, MPS and HPS are all open, ramps the inducer until LPS then MPS close, runs a 25-second prepurge, then heats the igniter for a 17-second warm-up before opening the gas valve.",
   "Flame must be proved in a 2-second window that starts 5 seconds after the gas valve opens. If not, the valve closes and the control retries up to 3 more times, then goes to Ignition Lockout (14.1).",
   "Lockout resets by itself after 3 hours, or by briefly cutting 115V, or by breaking 24V at SEC1 or SEC2 on the board — not at W, G or R.",
   "Before parts (code 34.1 list): gas valve switch on, manual shut-off open, green/yellow wire connected to the furnace sheet metal, flame sensor not grounded.",
   "Pull the R wire, make sure the display reads iDl, and run Component Test (Ct). The igniter step runs for 15 seconds — it should glow orange/white by the end of it.",
   "No glow: unplug the igniter harness from the control and run Ct again, checking for 115V between pin 1 and NEUTRAL-L2 for the 15 seconds. No 115V = replace the control; 115V present = check harness and igniter continuity and replace the bad part.",
   "Glows: reconnect R and call for heat. No 24V at the gas valve = check connections, then replace the control. 24V but no gas flow = confirm every gas valve is on, then replace the valve.",
   "Gas flows but burners will not light: check flame carryover, low inlet gas pressure (supply must be over 4.5 in. w.c. and not over 14 in. w.c.), firing rate, and the carry-over gap (.045 in. nominal).",
   "Code 35.1 is the modulating gas valve not communicating; the Ct sequence includes a 15-second gas valve communication check (shown as 5i9)."
  ],
  "safety": "If you smell gas, stop. Do not cycle power repeatedly to force more trials with gas in the heat exchanger.",
  "manual": "carrier-59mn7c-04si",
  "pages": [
   70,
   75,
   54,
   53
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.70, p.75, p.54, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59mn7-flame-dropout",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Lights, then drops out (14.2 / 14.3 / 34.5–34.8) — 59MN7C",
  "summary": "The 59MN7C logs where in the cycle flame was lost; use that and the flame-current check order.",
  "steps": [
   "Read the minor code: 34.5 = low-heat flame loss before the heating blower on-delay; 34.6 = high-heat flame loss before the on-delay; 34.7 and 34.8 = flame loss after the on-delay.",
   "Repeat events escalate: 14.2 = flame lost 3 times after 70 seconds of heating; 14.3 = lockout after 7 loss-of-flame events during one heat request.",
   "If flame drops during the blower on-delay, the blower comes on for the selected blower off-delay — that is the control's response, not a blower fault.",
   "Note the inducer changes speed right after flame sense (slightly slower if the cycle started in intermediate heat, faster if it started in maximum) — watch whether the dropout lines up with that change.",
   "Check flame current during the trial for ignition. Below 0.5 DC microamps: clean the sensor with fine steel wool and recheck. Nominal is 4.0 to 6.0 microamps.",
   "Still not near 4.0–6.0 after cleaning: replace the electrode. Near typical but burners still won't stay lit: check connections and retry, then replace the control.",
   "If it runs fine with the blower off, let the blower come on and repeat the test to catch intermittent operation."
  ],
  "manual": "carrier-59mn7c-04si",
  "pages": [
   74,
   75,
   70
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.74, p.75, p.70",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59mn7-limit-trips",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Short-cycling on the limit (33.1, then 13.1 lockout) — 59MN7C",
  "summary": "On the 59MN7C a limit trip runs the blower, then locks out if the switch stays open over 3 minutes.",
  "steps": [
   "33.1 = the main limit or flame rollout has opened. The blower runs 4 minutes or until the switch remakes, whichever is longer.",
   "Open longer than 3 minutes = 13.1 limit circuit lockout (limit, draft safeguard, flame rollout or blocked vent switch if used). It auto-resets after 3 hours. The rollout switch and BVSS need a manual reset.",
   "Work the manual's list: dirty filter or restricted ducts, loose blower wheel, bad switch or connections, bad blower motor, wrong gas input.",
   "Measure rise. It must be inside the rating-plate range; Carrier recommends the midpoint or slightly above. If it is out of range check input at minimum, intermediate and maximum heat, the altitude derate, and duct static over 0.5 in. w.c.",
   "Heating airflow is the Ht menu: set it higher to lower the rise, lower to raise it. The factory heating default is Com2, which decreases heating airflow; Eff1 is the setting that gives midpoint rise.",
   "Prove the limit: run at least 5 minutes, then slowly block the return with cardboard or sheet metal until it trips. Burners relight once it cools.",
   "Bryant twin: the app's bulletin library pairs the 59MN7C with the Bryant 987MC for the Series C limit-switch bulletin — check Bulletins for the serial break before replacing switches."
  ],
  "manual": "carrier-59mn7c-04si",
  "pages": [
   74,
   61,
   62,
   51,
   47
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.74, p.61, p.62, p.51, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59mn7-blower-heat",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Blower stops when burners light / runs on after the call — 59MN7C",
  "summary": "Most 59MN7C blower complaints in heat are its designed delays; the 41.x/15.x codes are the real faults.",
  "steps": [
   "Blower on-delay: 45 seconds after the gas valve opens when the cycle starts in intermediate heat (modulating airflow), 25 seconds when it starts in maximum heat.",
   "With continuous fan on, the blower keeps running until the burners light, then shuts off for the on-delay (45 seconds low heat, 25 seconds high heat) so the heat exchanger warms up. That is normal.",
   "After a high-heat cycle with continuous fan, it drops to low-heat airflow for the off-delay before returning to continuous fan airflow.",
   "Off-delay: the inducer post-purges 15 seconds; the blower stays at minimum-heat airflow for 90, 120, 150 or 180 seconds. Factory setting is 120. The HoD menu sets it — shorter can leave heat in the ducts, longer can blow cold air at the end.",
   "Power blip during a heat call: the control runs the blower alone for 90 seconds and shows 12.1, then answers the thermostat normally.",
   "Real blower faults: 41.1 no blower rpm at startup, 41.2 no rpm while running, 41.3 failed to reach 500 rpm at startup, 15.1 blower rpm lockout. Check loose blower wire connections, then the motor."
  ],
  "manual": "carrier-59mn7c-04si",
  "pages": [
   70,
   72,
   69,
   74,
   51
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.70, p.72, p.69, p.74, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59mn7-condensate-freeze",
  "unit": "^59MN7C",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Furnace in a cold attic/garage: frozen trap or drain — 59MN7C",
  "summary": "What the 59MN7C manual requires for freeze protection, and how to winterize one that will sit off below 32°F.",
  "steps": [
   "Where the space can drop below 32°F, the trap and drain line must be protected. For the 59MN7C a Condensate Freeze Protection kit is 'strongly recommended'.",
   "Without the kit, the factory trap must be fully covered with self-regulating, shielded, waterproof heat tape rated 3 to 6 W/ft at 115V, 40°F. Poorly secured tape can let the trap freeze and crack.",
   "The drain line must end at an inside drain and should not run where it can freeze. Do not add a trap anywhere except the furnace's own trap.",
   "With a condensate pump, a plugged drain or failed pump can shut the furnace down — check the pump on a no-heat call.",
   "The pressure-switch codes (31.6, 32.2) list restricted or blocked condensate drainage as a cause — clear the trap and drain before condemning switches.",
   "If a heat pad is used it wraps around the condensate trap (no heat tape needed inside the casing); confirm it will actually operate when it is cold.",
   "Furnace left off below 32°F must be winterized: propylene glycol (RV/pool antifreeze), never ethylene glycol. Pour 1 quart through the top, then the middle unused collector-box port opposite the trap. Flush a condensate pump with clear water on restart; the glycol does not need to be removed.",
   "Oversized vent pipe can cause excessive vent terminal icing or freeze-up; exposed vent in unconditioned space is limited by Table 16 using the winter design temperature."
  ],
  "manual": "carrier-59mn7c-04si",
  "pages": [
   12,
   68,
   69,
   74,
   40
  ],
  "source": "Carrier 59MN7C - Modulating, High Efficiency Condensing Gas Furnace, 4-Way Multipoise (59MN7C-04SI), p.12, p.68, p.69, p.74, p.40",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-ignition-lockout",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Inducer and igniter run, no flame (14.1 / 34.1) — 59TN6",
  "summary": "59TN6C (3-digit display) ignition sequence and the troubleshooting-guide check order; 59TN6A/6B use two-digit flash codes instead.",
  "steps": [
   "This is the 59TN6C board (3-digit display). 59TN6A/6B flash two-digit codes — see Error Codes for those.",
   "Normal order: control checks LPS and HPS are open, starts the inducer on high speed, the low-heat pressure switch closes, then a 15-second prepurge and a 17-second igniter warm-up.",
   "The gas valve opens; 5 seconds later a 2-second flame-proving period starts. No flame = valve closes and up to 3 more trials, then Ignition Lockout (14.1).",
   "Lockout clears by itself after 3 hours, or by briefly cutting 115V, or by breaking 24V at SEC1 or SEC2 (not at W, G or R).",
   "34.1 check list first: gas valve switch on, manual shut-off open, green/yellow wire on furnace sheet metal, flame sensor not grounded.",
   "Remove the R wire and run Component Test: the igniter should glow orange/white by the end of its 15-second warm-up. No glow: unplug the igniter harness, rerun, and look for 115V between pin 1 and NEUTRAL-L2. No 115V = control; 115V = harness or igniter.",
   "Igniter good: reconnect R, call for heat. No 24V at the valve = connections, then control. 24V but no gas = all gas valves on, then the valve. Gas but no light = flame carryover, low inlet pressure, firing rate, carry-over gap (.045 in. nominal).",
   "Inlet gas supply must be over 4.5 in. w.c. and not over 14 in. w.c."
  ],
  "safety": "If you smell gas, stop and ventilate before any more ignition trials.",
  "manual": "carrier-59tn6c-04si",
  "pages": [
   72,
   77,
   58
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.72, p.77, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-flame-dropout",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Lights, then drops out (14.2 / 14.3 / 34.5–34.8) — 59TN6",
  "summary": "Read where the 59TN6C lost flame, then run the flame-current branch of its troubleshooting guide.",
  "steps": [
   "34.5 = low-heat flame loss before the heating blower on-delay; 34.6 = high-heat flame loss before the on-delay; 34.7 / 34.8 = flame loss after the on-delay.",
   "14.2 = flame lost 3 times after 70 seconds of heating. 14.3 = lockout after 7 loss-of-flame events during one heat request.",
   "Flame lost during the blower on-delay makes the blower run for the selected off-delay — expected behavior.",
   "Read DC microamps during the trial for ignition. Below 0.5: clean the sensor with fine steel wool and recheck. Nominal is 4.0 to 6.0 microamps.",
   "Still low after cleaning: replace the electrode. Current near 4.0–6.0 but burners still drop out: check connections and retry, then replace the control.",
   "Check burner side too: inadequate flame carryover or rough ignition, low inlet gas pressure, firing rate."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   76,
   77
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.76, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-pressure-switch",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes in heat (31.6 / 31.7 / 32.2 / 23.x / 43.1) — 59TN6",
  "summary": "How the two-stage 59TN6C handles its low-heat and high-heat pressure switches, and the printed check list.",
  "steps": [
   "On every heat call the inducer starts on high speed. Low-heat starts begin the 15-second prepurge once the low-heat switch (LPS) closes; if LPS won't stay closed, the inducer just keeps running on high.",
   "If the high-heat switch (HPS) fails to close but LPS is closed, the furnace runs at the low-heat gas rate until HPS closes — for a maximum of 2 minutes after ignition.",
   "31.6 = HPS did not close for one minute after the gas valve closed, or reopened. 31.7 = HPS failed to close within 75 seconds going from low to high heat (the table labels it 'high heat only for next cycle').",
   "32.2 = LPS open longer than 5 minutes or reopened: the inducer shuts off for 15 minutes before it retries. If LPS opens within 5 minutes of the gas valve coming on, the next cycle is forced to high heat only, and 32.2 keeps showing during it.",
   "23.4 (LPS) / 23.5 (HPS) = switch did not open — obstructed pressure tube or switch stuck closed. 43.1 = HPS closed before LPS.",
   "Printed causes to check: excessive wind, restricted vent, bad inducer motor, low inlet gas pressure (if an LGPS is used), poor combustion air, vent sizing, disconnected or blocked pressure tubing, restricted or blocked condensate drainage.",
   "Prove the low switch: power off, disconnect the inducer leads, power on, call for heat and wait 1 minute. The igniter must NOT glow and the control should flash 32.2. If the igniter glows, shut it down and find out why. After reconnecting, the blower runs 90 seconds before the next heat call."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   72,
   76,
   77,
   65
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.72, p.76, p.77, p.65",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-limit-trips",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Cycling on the limit (33.1 → 13.1) — 59TN6",
  "summary": "59TN6C limit behavior plus the manual's way to lock low and high fire to set rise.",
  "steps": [
   "33.1 = limit or flame rollout open; the blower runs 4 minutes or until the switch remakes, whichever is longer. Open more than 3 minutes = 13.1 limit lockout, auto-reset after 3 hours. The rollout switch needs a manual reset.",
   "Check list: dirty filter or restricted ducts, loose blower wheel, bad switch or connections, bad blower motor, wrong gas input.",
   "Rise must be in the rating-plate range, ideally at the midpoint or slightly above. Out of range: check low and high input, altitude derate, and duct static over 0.5 in. w.c.",
   "Lock low heat: set Htt to 2St and jumper R to W/W1. Lock high heat: jumper R to W/W1 and W2. Change heating airflow with the Ht menu (higher setting lowers rise). Put Htt back to the thermostat type when done.",
   "Prove the limit: run 5 minutes, slowly block the return until it trips, unblock, and let the burners relight."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   76,
   64,
   55
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.76, p.64, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-low-fire-adaptive",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Sits on low fire up to 16 minutes before high — 59TN6",
  "summary": "With a single-stage thermostat the 59TN6C picks low/high from its own cycle history; that delay is normal.",
  "steps": [
   "Htt = 1St (single-stage thermostat) puts the furnace in adaptive mode: it starts in low or high, and on a low start it chooses a low-heat run time from 0 to 16 minutes before going to high, based on past cycle lengths.",
   "After a power interruption the history is erased: it runs low heat for up to 16 minutes, then high, as long as the call continues.",
   "With a single-stage thermostat it will not drop from high back to low while R–W stays closed.",
   "Energizing W2 always forces high heat, whatever Htt is set to. A two-stage thermostat needs Htt = 2St so W1 gives low heat only.",
   "When it steps from low to high, the blower moves to high-heat airflow 5 seconds later."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   72,
   73
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.72, p.73",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-blower-heat",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Blower quits at ignition / runs after the call — 59TN6",
  "summary": "59TN6C blower on/off delays, continuous-fan behavior in heat, and the blower rpm codes.",
  "steps": [
   "Blower comes on 45 seconds after the gas valve opens in low heat, 25 seconds in high heat.",
   "Continuous fan in heat: the blower runs until the burners light, then shuts off for that on-delay so the heat exchanger warms, then restarts at heating airflow. Normal.",
   "Off-delay: inducer post-purges 15 seconds; blower stays at low-heat airflow for 90, 120, 150 or 180 seconds (Hod setting). Factory 120.",
   "After a power interruption during a heat call the blower runs 90 seconds by itself with code 12.1, then the furnace answers the thermostat normally.",
   "Blower faults: 41.1 / 41.2 no blower rpm, 41.3 and 15.2 failed to reach 500 rpm at startup, 15.1 rpm lockout — check loose blower wire connections, then the motor."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   72,
   73,
   74,
   76
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.72, p.73, p.74, p.76",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tn-condensate-freeze",
  "unit": "^59TN(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Frozen trap or drain in a cold space — 59TN6",
  "summary": "On the 59TN6C the freeze kit is required below 32°F, not optional.",
  "steps": [
   "Where the furnace space can drop below 32°F, the 59TN6C manual says a Condensate Freeze Protection kit is REQUIRED. The kit is a trap with a heat pad that replaces the factory trap.",
   "The rest of the drain line can be protected with self-regulating, shielded, waterproof heat tape rated 3 to 6 W/ft at 115V, 40°F. Prime the trap before running the furnace.",
   "Drain line must end at an inside drain; no extra traps. A plugged drain or failed condensate pump can shut the furnace down.",
   "Restricted or blocked condensate drainage is on the printed cause list for the pressure-switch codes — clear it before replacing switches.",
   "Shut down below 32°F for a while? Winterize with propylene glycol (not ethylene glycol): 1 quart through each of the top and middle unused collector-box ports opposite the trap, flush any condensate pump with clear water at restart."
  ],
  "manual": "carrier-59tn6c-04si",
  "pages": [
   15,
   71,
   72,
   76
  ],
  "source": "Carrier 59TN6C - Two-Stage, Variable-Speed, Multipoise 35 in. (889 mm) Tall, Condensing Gas Furnace (59TN6C-04SI), p.15, p.71, p.72, p.76",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-ignition-flame",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "No flame or flame drops out (14.x / 34.1–34.3) — 59TP6/59TP7",
  "summary": "The 59TP6C ignition sequence and its own flame-loss codes (34.2 / 34.3), which differ from the 59TN6 and 59MN7 lists.",
  "steps": [
   "Sequence: inducer starts on high, low-heat pressure switch closes, 15-second prepurge, 17-second igniter warm-up, gas valve opens, and a 2-second flame-proving period starts 5 seconds later.",
   "No flame: up to 3 more trials, then 14.1 Ignition Lockout — auto-reset after 3 hours, or cut 115V, or break 24V at SEC1/SEC2 (not at W, G or R).",
   "59TP6C board: flame-loss codes are 34.2 (flame lost after ignition, before the heating blower on-delay) and 34.3 (flame lost after the on-delay). 59TP7A board instead uses 34.5/34.6 (heat flame lost before/after the on-delay) and 34.7/34.8 (high heat before/after) — see Error Codes. On both: 14.2 = flame lost 3 times after 70 seconds of heating; 14.3 = lockout after 7 loss-of-flame events in one request.",
   "34.1 check list: gas valve off? manual shut-off? green/yellow wire to sheet metal? flame sensor grounded?",
   "Remove the R wire and run Component Test: igniter should glow orange/white within its 15-second warm-up; if not, look for 115V between pin 1 and NEUTRAL-L2 with the igniter unplugged.",
   "Flame current under 0.5 DC microamps: clean the sensor with fine steel wool; nominal is 4.0 to 6.0. Still low = replace the electrode. Normal current but burners won't stay on = connections, then control.",
   "Burners won't light with gas flowing: flame carryover, low inlet pressure, firing rate, carry-over gap (.045 in. nominal)."
  ],
  "safety": "If you smell gas, stop. Do not keep forcing ignition trials.",
  "manual": "carrier-59tp6c-03si",
  "pages": [
   72,
   76,
   77
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.72, p.76, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-pressure-switch",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes in heat (31.6 / 31.7 / 32.2 / 23.x) — 59TP6/59TP7",
  "summary": "Two-stage pressure switch logic on the 59TP6C and its printed cause list.",
  "steps": [
   "Low-heat start: inducer runs high until the low-heat switch closes, then 15-second prepurge. If the high-heat switch won't close but the low switch is closed, it fires at the low-heat gas rate until HPS closes — maximum 2 minutes after ignition.",
   "31.6 = open secondary pressure switch: HPS did not close for one minute after the gas valve closed, or reopened. 31.7 = HPS failed to close within 75 seconds going from low to high (labeled 'high heat only for next cycle').",
   "32.2 = main (low) pressure switch open longer than 5 minutes or reopened: inducer off 15 minutes, then retry. If it opens within 5 minutes after the gas valve comes on, the next cycle is high heat only.",
   "On this board the stuck-closed codes are 23.4 (LPS) and 23.2 (HPS) — obstructed pressure tube or switch stuck closed. (The 59TN6C uses 23.5 for HPS.)",
   "Printed causes: switch failed to close after three trials, excessive wind, restricted vent, bad inducer, low inlet pressure (if LGPS used), combustion air, vent sizing, disconnected/blocked tubing, restricted condensate drainage.",
   "Prove the low switch: inducer leads off, call for heat, wait 1 minute — the igniter must not glow and the control should flash 32.2."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   72,
   76,
   77,
   64
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.72, p.76, p.77, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-limit-trips",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Limit trips (33.1 / 33.2 / 13.1) — 59TP6/59TP7",
  "summary": "The 59TP6C adds a 33.2 'high heat only' limit response that the other two-stage list does not show.",
  "steps": [
   "33.1 = main limit or flame rollout open; blower runs 4 minutes or until the switch remakes. Open over 3 minutes = 13.1 lockout (limit, flame rollout, or blocked vent switch if used), auto-reset after 3 hours. Rollout switch and BVSS are manual reset.",
   "33.2 on this board = 'LOCKOUT - High Heat Only for current cycle'. The manual prints nothing more for it; it sits in the limit block, so run the same check list.",
   "Check list: dirty filter or restricted ducts, loose blower wheel, bad switch/connections, bad blower motor, wrong gas input.",
   "Rise must be inside the rating plate, best at midpoint or slightly above. Check input, altitude derate and duct static over 0.5 in. w.c.; change heating airflow with the Ht1 / Ht2 heating blower speed settings (higher lowers rise).",
   "Prove the limit by running 5 minutes and slowly blocking the return until it trips."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   76,
   63,
   64,
   54
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.76, p.63, p.64, p.54",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-twinned",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Twinned pair: one won't run or LED flashes fast (25.3) — 59TP6/59TP7",
  "summary": "Twinning setup checks on the 59TP6C: matching programs, Pri/SEC role, transformer phasing.",
  "steps": [
   "Only two furnaces may be twinned, with a factory twinning kit, on one common supply AND common return duct system.",
   "Set the role in the tnn menu: Pri (primary) or SEC (secondary). Change it only on a twinned system with the kit installed.",
   "bLr on the display means this is the secondary furnace running its blower because the primary is active — normal.",
   "25.3 = twinned units not identical: the program numbers don't match. Both controls must carry the same program number; the main unit will not operate until they do.",
   "LED blinking rapidly with no pause on a twinned pair: check line voltage polarity and 24V transformer phasing."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   4,
   53,
   54,
   77,
   75
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.4, p.53, p.54, p.77, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-power-loss",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Heat stops and restarts with flickering power (46.1 / 12.1) — 59TP6/59TP7",
  "summary": "Two 59TP6C codes explain a furnace that quits and restarts on its own during unstable power.",
  "steps": [
   "46.1 = momentary loss of power: heating stops and restarts once the power fluctuation is resolved. It is a supply problem, not a furnace part.",
   "If power drops during a heat call, the control runs the blower alone for 90 seconds (code 12 / 12.1) before answering the thermostat again — expect a short blast of cooler air.",
   "Check 115V at the furnace and the polarity — reversed polarity gives a rapid-flash LED and 10.1 and the furnace won't run at all.",
   "Code 45.x (control failure): cycle power; if 45 repeats, replace the control."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   76,
   71,
   25
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.76, p.71, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-blower-heat",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Blower off at ignition / runs after the call — 59TP6/59TP7",
  "summary": "59TP6C blower delays in heat, with and without continuous fan.",
  "steps": [
   "Blower on 45 seconds after the gas valve opens in low heat, 25 seconds in high heat.",
   "Continuous fan on: the blower runs until the burners light, then stops for that on-delay, then restarts at heating airflow — normal.",
   "Off-delay after the call: inducer post-purge 15 seconds, blower at low-heat airflow for 90, 120, 150 or 180 seconds — factory 120.",
   "Blower faults: 41.1 no rpm at startup, 41.2 no rpm while running, 15.1 rpm lockout — check blower wire connections, then the motor."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   72,
   73,
   76
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.72, p.73, p.76",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp-condensate-freeze",
  "unit": "^59TP(6C|7A)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Frozen trap or drain in a cold space — 59TP6/59TP7",
  "summary": "59TP6C freeze-protection requirements and winterizing.",
  "steps": [
   "Below 32°F a Condensate Freeze Protection kit is required (a trap with heat pad that replaces the factory trap).",
   "Heat tape on the remaining drain line: self-regulating, shielded, waterproof, 3 to 6 W/ft at 115V, 40°F.",
   "A plugged drain or failed condensate pump can shut the furnace down; restricted condensate drainage is also on the pressure-switch cause list.",
   "Winterize with propylene glycol (never ethylene glycol): 1 quart through each unused collector-box port opposite the trap; flush any pump at restart."
  ],
  "manual": "carrier-59tp6c-03si",
  "pages": [
   13,
   71,
   76
  ],
  "source": "59TP6C Two-Stage, Non-Communicating, Variable 25-Speed, ECM Multipoise, Condensing Gas Furnace with InteliSense Technology (59TP6C-03SI), p.13, p.71, p.76",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp5-flame-low-heat",
  "unit": "^59TP5[A-Z]\\d{3}E",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "No flame, or drops out in low heat (codes 14 / 34) — 59TP5A",
  "summary": "59TP5A two-digit codes and the manual's extra step when burners only stay lit in high heat.",
  "steps": [
   "Sequence: inducer starts on high, LPS closes, 15-second prepurge, 17-second igniter warm-up, gas valve opens, 2-second flame proving starts 5 seconds later. No flame = up to 3 more trials, then code 14 lockout (auto-reset after 3 hours, or cut 115V, or break 24V at SEC1/SEC2).",
   "Code 34 check first: gas valve on, manual shut-off open, green/yellow wire on the sheet metal, flame sensor not grounded.",
   "Remove R and run the component test: igniter should glow orange/white by the end of the 15-second warm-up; if not, check 115V between pin 1 and NEUTRAL-L2 with the igniter unplugged.",
   "Flame current below 0.5 DC microamps: clean with fine steel wool; nominal is 4.0 to 6.0.",
   "Current is normal but burners won't stay lit: repeat the check in high heat. Still won't stay lit in high = replace the control.",
   "If it runs in high heat and drops when it switches to low, check manifold pressure; if that is OK, check burner carryover and the flame sensor location.",
   "Code 45 (control circuitry lockout) auto-resets after 1 hour; reset power, replace the control if it repeats."
  ],
  "manual": "carrier-59tp5a-install-service",
  "pages": [
   78,
   82
  ],
  "source": "59TP5A Two-Stage, 4-Way Multipoise Condensing Gas Furnace, Series 100, p.78, p.82",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp5-pressure-switch",
  "unit": "^59TP5[A-Z]\\d{3}E",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes 31 / 32 / 43 / 23 in heat — 59TP5A",
  "summary": "The 59TP5A's two-digit pressure-switch codes and the longer printed cause list for code 32.",
  "steps": [
   "If the high-heat switch fails to close but the low switch is closed, the furnace fires at low-heat rate until HPS closes — maximum 2 minutes after ignition.",
   "Code 32 = low-heat pressure switch did not close or reopened. Open over 5 minutes = inducer off 15 minutes before retry.",
   "Code 32 causes printed for this model: vent sizing, air leak between vestibule and blower compartment, low inlet gas pressure (if LGPS used), disconnected/obstructed tubing, defective or miswired switches, wind, plugged condensate drain, water in the vent (possible sagging pipe), restricted vent, bad inducer, low inducer voltage (115 VAC).",
   "Code 31 = high-heat switch or relay did not close or reopened: control relay may be bad, gas valve miswired, then see code 32.",
   "Code 43 = low-heat switch open while high-heat switch closed: low switch stuck open, tubing, miswired switches, low inlet gas pressure (if LGPS used). Code 23 = a switch did not open (tube obstructed or switch stuck closed).",
   "Prove it: inducer leads off, call for heat, wait 1 minute — the igniter must not glow and the LED should flash code 32."
  ],
  "manual": "carrier-59tp5a-install-service",
  "pages": [
   78,
   82,
   64
  ],
  "source": "59TP5A Two-Stage, 4-Way Multipoise Condensing Gas Furnace, Series 100, p.78, p.82, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp5-limit-speed-taps",
  "unit": "^59TP5[A-Z]\\d{3}E",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Limit trips (33 → 13) and setting rise with speed taps — 59TP5A",
  "summary": "The 59TP5A has a 5-tap ECM, so heating airflow is set by moving motor leads, not a menu.",
  "steps": [
   "Code 33 = limit or flame rollout open; blower runs 4 minutes or until it remakes. Open over 3 minutes = code 13 lockout, auto-reset after 3 hours. Rollout needs a manual reset.",
   "Code 33 check list on this model includes 'improper limit switch or no limit gasket' besides filter/ducts, loose blower wheel, switch/connections and gas input.",
   "Check rise at both stages: set SW-1 (LHT) ON, jumper R to W/W1 and W2 for high; remove the W2 jumper for low. Rise must be in the plate range, ideally midpoint or slightly above; static over 0.50 in. w.c. is excessive.",
   "Faster blower speed lowers rise, slower raises it. Kill 115V before moving a lead. LO HT takes the red lead from the factory (orange is the other allowed low-heat lead); HI HT is the high-heat tap.",
   "Do not use the shaded airflow-table settings for high-stage heat — they are for low-stage heat and cooling only.",
   "Put SW-1 back (OFF for a single-stage thermostat) when finished."
  ],
  "manual": "carrier-59tp5a-install-service",
  "pages": [
   82,
   63,
   64
  ],
  "source": "59TP5A Two-Stage, 4-Way Multipoise Condensing Gas Furnace, Series 100, p.82, p.63, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59tp5-blower-delays",
  "unit": "^59TP5[A-Z]\\d{3}E",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Blower delays and code 12 after a power blip — 59TP5A",
  "summary": "On the 59TP5A the off-delay is set by setup switches SW-2/SW-3, and code 12 runs that off-delay, not a fixed 90 seconds.",
  "steps": [
   "Blower on-delay: 45 seconds after the gas valve opens in low heat (LO HEAT speed), 25 seconds in high heat (HI HEAT speed).",
   "Off-delay by SW-2 / SW-3: OFF/OFF = 90 s, OFF/ON = 120 s, ON/OFF = 150 s, ON/ON = 180 s. Factory set 120 seconds.",
   "Power interruption during a heat call: the blower runs for the selected off-delay and the LED flashes code 12, then normal operation resumes.",
   "Code 11 = no previous code; stored codes are erased after 72 hours.",
   "Low to high switch: the blower goes to HI HEAT speed 5 seconds after the change."
  ],
  "manual": "carrier-59tp5a-install-service",
  "pages": [
   78,
   79,
   67,
   82
  ],
  "source": "59TP5A Two-Stage, 4-Way Multipoise Condensing Gas Furnace, Series 100, p.78, p.79, p.67, p.82",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-no-heat-led",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "No heat, LED dark or fast flash — 59SC6A / 59SC2E / 59SP6B",
  "summary": "The single-stage 3-digit-display board's troubleshooting start; 59SC5B/59SC2D/59SP5A/59SP6A use two-digit flash codes instead.",
  "steps": [
   "This applies to the 3-digit display boards (59SC6A shown). Older 59SC5B / 59SC2D / 59SP5A / 59SP6A flash two-digit codes — see Error Codes.",
   "LED off: 115V at L1/L2? Then 24V at SEC-1/SEC-2 — no 24V = transformer, 24V present = control. No 115V = door switch, power to the switch, breaker and wiring.",
   "Rapid flash, no pause = 10.1 reversed 115V polarity; the furnace won't run. On twinned units also check 24V transformer phasing.",
   "24.1 = blown 24V fuse from a short in the 24V wiring including thermostat leads — disconnect them to find it.",
   "46.1 = momentary loss of power: heat stops and restarts when the power settles.",
   "25.3 (twinned): program numbers don't match — both furnaces need the same program number or the main unit won't run.",
   "Codes: MENU to FLt, NEXT through the last 7 ('non' = none). Codes erase after 72 hours; CLr clears them. The sight glass shows only the major code."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   75,
   76,
   77,
   67
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.75, p.76, p.77, p.67",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-ignition",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Inducer runs, no flame (14.1 / 34.1) — 59SC6A / 59SC2E / 59SP6B",
  "summary": "Single-stage sequence timings and the 59SC6A's 34.1 check list.",
  "steps": [
   "Sequence: control confirms LPS and HPS are open, starts the inducer; when the collector-box switch (LPS) closes, HUM gets 24V and a 15-second prepurge starts. Then the igniter heats for 17 seconds.",
   "Gas valve opens; 5 seconds later a 2-second flame-proving window starts. No flame = up to 3 more trials, then 14.1 lockout (auto-reset after 3 hours, or cut 115V, or break 24V at SEC1/SEC2 — not W, G or R).",
   "34.1 check list on this model: low inlet gas pressure, control ground continuity, manual shut-off valve, green/yellow wire connected to the burner box screw, flame sensor not grounded or touching the casing.",
   "Inlet supply pressure must be over 4.5 in. w.c. and not over 14 in. w.c.",
   "Pull R and run the component test: igniter should glow orange/white by the end of its 15-second warm-up. No glow: igniter harness unplugged, check 115V pin 1 to NEUTRAL-L2; no 115V = control, 115V = harness/igniter.",
   "Igniter good: call for heat; no 24V at the valve = connections then control; 24V but no gas = all valves on, then the gas valve; gas but no light = carryover, inlet pressure, firing rate, .045 in. nominal carry-over gap."
  ],
  "safety": "If you smell gas, stop before any more trials.",
  "manual": "carrier-59sc6a-03si",
  "pages": [
   73,
   74,
   77,
   58
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.73, p.74, p.77, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-flame-loss",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Lights, then drops out (14.2 / 14.3 / 34.2 / 34.3) — 59SC6A / 59SC2E / 59SP6B",
  "summary": "The 59SC6A flame-loss codes and the flame-current branch.",
  "steps": [
   "34.2 = flame lost after successful ignition, before the heating blower on-delay. 34.3 = flame lost after the on-delay.",
   "14.2 = flame lost 3 times after the heating blower on-delay — lockout, auto-reset after 3 hours. 14.3 = flame lost 7 times during a single heat request.",
   "Codes 14.x printed checks: correct manifold pressure and gas firing rate, gas inlet pressure fluctuations.",
   "Read DC microamps during trial for ignition: below 0.5, clean the sensor with fine steel wool; nominal 4.0 to 6.0. Still low = replace the electrode; normal but still dropping = connections, then control."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   76,
   77
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.76, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-pressure-switch",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes (31.2 / 31.3 / 32.1 / 23.1) — 59SC6A / 59SC2E / 59SP6B",
  "summary": "The single-stage 59SC6A uses two switches: a collector-box main switch and an inducer-housing secondary switch that is ignored until after the burn.",
  "steps": [
   "LPS (collector box) must close for the 15-second prepurge to start. HPS (inducer housing) is ignored until one minute after the gas valve closes.",
   "31.2 = open secondary pressure switch: HPS did not close within one minute after the gas valve closed, or reopened. 31.3 = secondary pressure switch lockout.",
   "32.1 = open main pressure switch: LPS open over 5 minutes or reopened — inducer off 15 minutes before retry.",
   "23.1 = stuck main pressure switch: obstructed pressure tube or switch stuck closed.",
   "Printed causes for 31/32: switch failed to close after three trials, wind, restricted vent, bad inducer, low inlet pressure (if LGPS used), combustion air, vent sizing, tubing, restricted condensate drainage.",
   "Prove the main switch: inducer leads off, call for heat, wait 1 minute — the igniter must not glow. Note: the start-up text says the light flashes 31.1 here, but the service label and the troubleshooting table both list the open main switch as 32.1 (there is no 31.1) — expect 32.1."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   73,
   76,
   66,
   58
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.73, p.76, p.66, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-limit",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Cycling on the limit (33.1 → 13.1) — 59SC6A / 59SC2E / 59SP6B",
  "summary": "Single-stage limit response and how the 59SC6A manual says to correct rise.",
  "steps": [
   "33.1 = limit or flame rollout open; blower runs 4 minutes or until it remakes. Open over 3 minutes = 13.1 lockout, auto-reset after 3 hours. Rollout and BVSS are manual reset.",
   "Check: dirty filter or restricted duct, loose blower wheel, switch or connections, blower motor, gas input.",
   "Rise must be in the plate range, recommended midpoint or slightly above. Out of range: gas input, altitude derate, duct static over 0.50 in. w.c. (125 Pa).",
   "Increase blower speed to lower rise, decrease to raise it (Ht menu). Take the reading with the blower door on — the manual warns readings are wrong with it off.",
   "Prove the limit by blocking the return after 5 minutes of run time."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   76,
   66,
   65,
   56
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.76, p.66, p.65, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-blower-heat",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Blower stops at ignition / heat-pump add-on timing — 59SC6A / 59SC2E / 59SP6B",
  "summary": "The single-stage blower timings, including the changed sequence when a heat pump is attached.",
  "steps": [
   "Blower comes on at HEAT speed 25 seconds after the gas valve opens.",
   "Continuous fan on: the blower stops for the 17-second igniter warm-up, 7 seconds of ignition and the 25-second on-delay, then restarts at HEAT speed. That is designed.",
   "Off-delay: inducer post-purges 15 seconds; blower stays at heat airflow 90, 120, 150 or 180 seconds — factory 120.",
   "With a heat pump (W with Y): the blower stays on at HEAT speed through prepurge, shuts off for 24 seconds, then comes back at HEAT speed. When W drops, it switches to COOL speed after 3 seconds.",
   "Power loss during a heat call: 90-second blower-only run with code 12 / 12.1, then normal."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   74,
   73
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.74, p.73",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-59sc-condensate-freeze",
  "unit": "^59(SC6A|SC2E|SP6B)",
  "brand": "Carrier",
  "equipment": "Gas Furnace",
  "title": "Frozen trap or drain in a cold space — 59SC6A / 59SC2E / 59SP6B",
  "summary": "Freeze-protection rules in the 59SC6A manual (kit required below 32°F) and winterizing.",
  "steps": [
   "Below 32°F a Condensate Freeze Protection kit is required; it is a trap with heat pad that replaces the factory trap.",
   "Protect the rest of the drain with self-regulating, shielded, waterproof heat tape rated 3 to 6 W/ft at 115V, 40°F.",
   "A plugged drain or failed condensate pump can shut the furnace down; restricted condensate drainage is on the pressure-switch cause list.",
   "Winterize a furnace left off below 32°F with propylene glycol (never ethylene glycol): one quart through each of the top and middle unused collector-box ports opposite the trap, flush the pump with clear water at restart."
  ],
  "manual": "carrier-59sc6a-03si",
  "pages": [
   13,
   73
  ],
  "source": "59SC6A Comfort Series Multi 18-Speed ECM Single-Stage 4-Way Multipoise Condensing Gas Furnace (59SC6A-03SI), p.13, p.73",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna4-defrost",
  "unit": "^25VNA4",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Iced outdoor coil / defrost questions — 25VNA4 Greenspeed",
  "summary": "How the 25VNA4 PCM times, runs and ends defrost, how to force one, and what 41-13 and 52-xx mean.",
  "steps": [
   "Applies to the 25VNA4 (Greenspeed, PCM + VFD). Other 25-series units use different boards.",
   "Interval: set in the Infinity Control when communicating. Non-communicating: PCM DIP switches 1 and 2 — Up/Up = Auto, Up/Down = 30 min, Down/Up = 60 min, Down/Down = 90 min. 120 min is only available from the Infinity Control. Auto is recommended.",
   "Auto picks the next interval from the last defrost length: under 3 min → 120 min; 3–5 min → 90; 5–7 min → 60; over 7 min → 30.",
   "Interval time only counts in frost conditions (coil below 35°F). Defrost ends when the coil reaches a threshold, usually 60°F, or on a time limit, usually 10 minutes.",
   "Normal sequence: compressor ramps to reversing-valve transition speed, RVS shifts (fan still on), compressor goes to defrost speed, fan stops when coil temp reaches ambient. Ending: compressor back to transition speed, RVS shifts to heat (fan stays off), compressor to heating speed, fan restarts when coil falls to ambient.",
   "Force a defrost: short the Forced Defrost pins (J3) for 5 seconds while it is heating with the compressor running. A forced defrost runs at least 30 seconds and may stop at 30 seconds if it is well above freezing.",
   "41-13 Defrost Timeout = defrost ended on max time without reaching target coil temp: heavy ice, the OCT not securely attached to the butterfly tube, or high wind cooling the coil.",
   "52-01 / 52-02 = OCT open (over 465 kohm) or shorted (under 1 kohm). While active, every defrost runs the maximum time. Measure at the PCM connector before replacing anything."
  ],
  "manual": "carrier-24vna6-25vna4-service",
  "pages": [
   6,
   10,
   11,
   18
  ],
  "source": "24VNA6 / 25VNA4 24VNA6/25VNA4 Infinity Variable-Speed Heat Pump Service Manual (24VNA6-25VNA4-1SM, Ed. 06/20), p.6, p.10, p.11, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna4-no-hp-heat",
  "unit": "^25VNA4",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "No heat pump heat, backup heat only — 25VNA4 Greenspeed",
  "summary": "Conditions on the 25VNA4 that stop compressor heating while cooling or backup heat still work.",
  "steps": [
   "Check outdoor temperature first. The 25VNA4 heats up to 75°F outdoor and will START heating down to 0°F. Below 0°F it keeps running only if it was already running, until it hits a limit.",
   "53-41 / 53-42 'OST Open/Shorted - Backup Heat Only': the suction thermistor is needed for the heating EXV, so heat pump heating is locked out (cooling still allowed). The OST reads 47 on the status/checkout screen. Open = over 465 kohm, shorted = under 1 kohm, measured at the PCM connector.",
   "64-41 EXV-H phase open lockout: heat pump units will not operate at all while it is active.",
   "61-41 RVS open lockout: the coil is only checked while the valve is de-energized, so a coil that failed in cooling season may not flag — the valve just sits in the heating position. Unplug RVS at the PCM and check continuity pins 1 to 3; repair wiring or replace coil and harness.",
   "5-minute compressor protect delay after power-up or after the last run. To skip it, short the J3 forced-defrost pins for 1 second with the compressor off — OVERRIDE scrolls on the display.",
   "Comm light off = no Infinity communication in the last 2 minutes. There is no fault code for that; the unit falls back to its discrete inputs.",
   "Read the code history: remove power, clip the J3 pins together, restore power. The display scrolls RECALL and the latest highest-priority code from the last 240 hours of run time. The unit won't run in recall; it exits when the clip is removed or 15 minutes after power-up."
  ],
  "manual": "carrier-24vna6-25vna4-service",
  "pages": [
   9,
   10,
   11,
   19,
   20
  ],
  "source": "24VNA6 / 25VNA4 24VNA6/25VNA4 Infinity Variable-Speed Heat Pump Service Manual (24VNA6-25VNA4-1SM, Ed. 06/20), p.9, p.10, p.11, p.19, p.20",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna4-pressure-trips-heat",
  "unit": "^25VNA4",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Low suction or high pressure trips in heat (32-xx / 31-xx / 33-15) — 25VNA4",
  "summary": "The 25VNA4 runs on transducer limits that derate before they lock out; read the code family first.",
  "steps": [
   "32-15 low suction shutdown: a soft low-pressure limit can be exceeded for up to 2 minutes; the hard limit trips at once. Limits depend on compressor and rpm (typical 30 psi soft, 15 psi hard). One trip = 5-minute delay and restart; 4 trips = 32-55 two-hour lockout.",
   "Low ambient makes the low-pressure check more sensitive. Printed causes: liquid line blockage, stuck TXV or EXV, no airflow across the evaporator (in heat that is the outdoor coil), low charge. Check liquid-line pressure drop, airflow and charge.",
   "32-59 low pressure lockout = suction too low to start the compressor at all. Most likely a refrigerant leak.",
   "31-11 high pressure limiting: each trip cuts maximum compressor speed by 25%; each trouble-free run hour gives 25% back. At minimum speed it becomes 31-58 with a 2-hour lockout.",
   "31-16 = the 670 psi high pressure switch opened (it is wired to the VFD); the unit won't restart until discharge is below 425 psig. 31-19 = discharge above 620 psig, too high to start.",
   "35-11 / 35-58 high compression ratio: overcharge or a blocked coil / lost airflow across a heat exchanger. 34-11 discharge over 230°F: low charge or very high superheat; 34-58 = 2-hour lockout.",
   "33-15 low discharge (5-ton only): a malfunctioning reversing valve, low charge, missing or stuck TXV/EXV, or a compressor not pumping. 6 in 2 hours = 33-55 two-hour lockout."
  ],
  "manual": "carrier-24vna6-25vna4-service",
  "pages": [
   16,
   17
  ],
  "source": "24VNA6 / 25VNA4 24VNA6/25VNA4 Infinity Variable-Speed Heat Pump Service Manual (24VNA6-25VNA4-1SM, Ed. 06/20), p.16, p.17",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna4-outdoor-fan-heat",
  "unit": "^25VNA4",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor fan not running in heat / iced fan (39-xx) — 25VNA4",
  "summary": "When a stopped 25VNA4 fan is normal, and how its fan fault codes escalate.",
  "steps": [
   "Normal: the fan starts before the compressor. During defrost the fan is off while the compressor runs.",
   "If the unit shut down mid-defrost, the next start resumes defrost: the fan runs briefly at power-up, then stops until that defrost finishes.",
   "After a shutdown on discharge pressure or high discharge temperature, the fan keeps running a while to cool things down — also normal.",
   "39-13 fan start failure: after 25 seconds with no fan speed feedback (FG) the PCM resets the VFD; after 3 resets it sets 39-13, and after 6 it locks out 1 hour (39-53). Check wiring/connectors, blade blockage and free spin, the external fan fuse, then ohm the motor.",
   "39-14 fan speed error (commanded over 200 rpm, actual off by more than 20%): partial blade blockage, ice on the blade, a heavily blocked coil, or tight bearings.",
   "39-15 unexpected fan shutdown (actual under 80 rpm for 10 seconds): intermittent FG wire or failing motor. 39-58 (30-minute lockout): replace the fan motor first, then the VFD."
  ],
  "manual": "carrier-24vna6-25vna4-service",
  "pages": [
   9,
   18
  ],
  "source": "24VNA6 / 25VNA4 24VNA6/25VNA4 Infinity Variable-Speed Heat Pump Service Manual (24VNA6-25VNA4-1SM, Ed. 06/20), p.9, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna4-heating-charge",
  "unit": "^25VNA4",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking charge in winter — 25VNA4 Greenspeed",
  "summary": "On the 25VNA4 the heating-season charge method is weigh-in; the heating check chart only confirms operation.",
  "steps": [
   "In heating mode the required charging method is weigh-in. On a new install or full recharge, the Infinity UI refrigerant charging screen gives the added charge or total charge.",
   "Weigh per the rating plate, plus or minus 0.6 oz per foot of 3/8 in. liquid line above or below 15 ft.",
   "To sanity-check operation: indoor 60–80°F, outdoor coil dry and free of ice/frost, and no rain, mist or snow. Clear any frost first with a forced defrost (short the J9 pins more than 5 seconds).",
   "UI: Installation and Service → Refrigerant Charging → Heating Check Charge Method. It only appears when conditions are right, and it runs the system at set compressor speed, fan speed and indoor airflow.",
   "Gauges: high pressure is at the vapor service valve; low side goes on the suction service port. Compare to the Heating Check Chart inside the control box cover.",
   "Do NOT adjust charge from the chart. If the charge is in doubt, recover it and weigh in the calculated charge.",
   "Subcooling checks are only valid with outdoor 65–105°F and indoor 65–80°F; outside that, weigh in only."
  ],
  "manual": "carrier-25vna4-03si",
  "pages": [
   10,
   8
  ],
  "source": "25VNA4 Infinity Variable Speed Heat Pump with Greenspeed Intelligence 2 to 5 Nominal Tons (25VNA4-03SI), p.10, p.8",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna0-defrost",
  "unit": "^25VNA0",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Coil icing / defrost timing — 25VNA0 Greenspeed",
  "summary": "The 25VNA0 defrost demand, termination temperatures and forced-defrost behavior.",
  "steps": [
   "Applies to the 25VNA0. Interval is chosen in the Infinity UI (no DIP switches): 30, 60, 90, 120 minutes or AUTO (default). AUTO: last defrost under 3 min → 120; 3–5 → 90; 5–7 → 60; over 7 → 30.",
   "A defrost demand needs the coil at or below 32°F for 4 minutes during the interval; if the coil never gets to 32°F, the interval timer starts over. The first interval after power-up is 30 minutes. No defrost above 50°F outdoor.",
   "Termination: outdoor air above 25°F → coil over 60°F (minimum 4.5 minutes); outdoor air 25°F or below → coil over 45°F (minimum 3.25 minutes); or 10 minutes max.",
   "The outdoor fan is off during defrost and comes back on 15 seconds before the reversing valve switches back. Auxiliary heat stays on 15 seconds after defrost ends.",
   "Force a defrost: jumper the Forced Defrost pins 5 seconds or longer, then remove. If the coil is above 32°F or outdoor air above 50°F, it ends after 30 seconds. A 1-second short bypasses the 5-minute compressor delay.",
   "Failed OCT: defrost runs at every interval but ends after 5 minutes. The OCT must be secured on the tube between the EXV and the distributor — a loose sensor fools termination.",
   "Note: the unit's printed wiring-label notes give slightly different numbers (factory interval 90 min, terminate 65/50/45°F ±5) than the manual text above."
  ],
  "manual": "carrier-24vna0-25vna0-service",
  "pages": [
   6,
   5,
   8,
   9,
   10
  ],
  "source": "24VNA0 / 25VNA0 24VNA0, 25VNA0 Infinity Variable Speed Air Conditioner and Heat Pump with Greenspeed Intelligence - Service Manual (24VNA0-25VNA0-1SM, Ed. 01/18), p.6, p.5, p.8, p.9, p.10",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25vna0-pressure-heat",
  "unit": "^25VNA0",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Low-pressure or high-pressure trips in heat (32 / 83 / 31) — 25VNA0",
  "summary": "The 25VNA0 uses a suction transducer with separate heating thresholds; check the outdoor side first in heat.",
  "steps": [
   "Heating low pressure: under 23 psig for 3 minutes. Any mode: under 13 psig trips instantly. Either shows code 32.",
   "After the 15-minute delay it restarts if pressure has recovered; if not, the outdoor fan is turned off until it does. Three instantaneous trips in a row = 4-hour lockout, code 83. The counter resets after 15 minutes of good running.",
   "In heating, after a low-pressure trip check charge, outdoor fan operation and the outdoor coil for airflow restrictions. The manual warns the fan motor may run normally until it heats up — watch it under load.",
   "Verify the suction transducer: 5 VDC supply at the board, then pressure (psig) = 50 × (output volts − 0.5). Example: 3.0 V = 125 psig. Compare to your gauge at the suction service port.",
   "High pressure switch open: contactor drops, outdoor fan keeps running 15 minutes, code shows. If the switch has reset after 15 minutes it restarts; 3 consecutive trips = 4-hour lockout. In heating, check charge and indoor airflow."
  ],
  "manual": "carrier-24vna0-25vna0-service",
  "pages": [
   9,
   11
  ],
  "source": "24VNA0 / 25VNA0 24VNA0, 25VNA0 Infinity Variable Speed Air Conditioner and Heat Pump with Greenspeed Intelligence - Service Manual (24VNA0-25VNA0-1SM, Ed. 01/18), p.9, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25hbc-hce-iced-coil",
  "unit": "^25H(BC5|CE4)",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil stays iced / defrost test — 25HBC5, 25HCE4",
  "summary": "Checking the defrost thermostat and testing a non-Quiet-Shift defrost board on the fixed-speed 25HBC5/25HCE4, plus how aux heat comes on.",
  "steps": [
   "Heating operating limit for these models: 66°F maximum outdoor ambient.",
   "Defrost thermostat location: on a 3/8 in. OD stub tube about 2 in. long at the end of one feeder tube from the liquid header — on most units the bottom circuit. Make sure it is there and tight.",
   "Time/temperature control: the defrost thermostat closes at about 32°F coil temperature and energizes DFT; the timer only runs while DFT is closed and the contactor is on. Defrost = cooling mode with the outdoor fan stopped and second-stage heat on.",
   "Non-Quiet-Shift-2 board test: power off, disconnect the fan lead from OF2 and tape it. Restart in heat and let frost build until the liquid line drops below the DFT closing point (about 30°F).",
   "Short the speedup terminals — timing runs at 1/25 speed (30-min cycle ≈ 7 s, 50-min ≈ 12 s, 90-min ≈ 21 s). Pull the screwdriver the moment the reversing valve shifts, or the 10-minute defrost ends in about 2 seconds.",
   "It then stays in defrost for the rest of the cycle or until the defrost thermostat opens at about 65°F liquid-line temperature. Power off and reconnect OF2.",
   "Quiet Shift-2 boards force defrost by shorting J1 for 5 seconds instead (see the existing defrost-board scenario).",
   "Aux heat: on a heating call R–Y and R–G run the compressor and blower; if it keeps falling, R–W2 brings on the first bank of electric heat; a field outdoor thermostat, if installed, adds the second bank."
  ],
  "manual": "carrier-25hbc-hce-04si",
  "pages": [
   2,
   7,
   8
  ],
  "source": "25HBC5, 25HCE4 Single Stage Split-System Heat Pumps with Puron Refrigerant 1-1/2 - 5 Nominal Tons (25HBC-HCE-04SI), p.2, p.7, p.8",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25hbc-hce-winter-charge",
  "unit": "^25H(BC5|CE4)",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Charge questions in heating season — 25HBC5, 25HCE4",
  "summary": "Fixed-speed 25HBC5/25HCE4: when you can and cannot check charge in winter, and the heating piston.",
  "steps": [
   "These heat pumps need the heating piston in the liquid service valve. It ships in the valve's piston body under a plastic cap — confirm it is there on any no-heat/low-capacity call after an install.",
   "Charge checks (subcooling for TXV, superheat for piston) are only valid with outdoor 70–100°F and indoor 70–80°F.",
   "Outside those conditions, only adjust for line length: add or remove 0.6 oz per foot of 3/8 in. liquid line above or below 15 ft, then come back to verify in better weather.",
   "Some indoor units need extra subcooling for best heating — see the manual's additional-subcooling tables.",
   "Use the Heating Check Chart on the unit only to confirm the pressure/temperature relationship in heat. The manual says not to adjust charge from it."
  ],
  "manual": "carrier-25hbc-hce-04si",
  "pages": [
   3,
   9
  ],
  "source": "25HBC5, 25HCE4 Single Stage Split-System Heat Pumps with Puron Refrigerant 1-1/2 - 5 Nominal Tons (25HBC-HCE-04SI), p.3, p.9",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-25-loc-rv-heat",
  "unit": "^25(?!VNA)[A-Z]{3}",
  "brand": "Carrier",
  "equipment": "Condenser/Heat Pump",
  "title": "Trips on loss-of-charge or high pressure, reversing valve suspect in heat — fixed-speed 25-series",
  "summary": "Switch set points and reversing-valve checks from Carrier's residential AC/HP service manual for Puron fixed-speed heat pumps.",
  "steps": [
   "Heat pumps use a loss-of-charge switch on the LIQUID line, because the liquid line is the low side in heating. Puron: opens at 23 ±5 psig, closes at 55 ±5 psig.",
   "Two-stage models: the loss-of-charge switch is on the suction line on 25HNB6/25HNB9 and on the liquid line on 25HCB6. The two-stage board can ignore low-pressure trips during defrost transitions.",
   "High pressure switch (Puron): opens around 610 or 670 psig, closes at 420 or 470 psig. Causes listed: dirty coil, failed fan motor, air recirculation.",
   "Check a switch with power off and leads removed — a good closed switch shows continuity. Don't pull one off the system unless you're sure; it is under pressure.",
   "Defrost thermostat (Base/Comfort models): closed at 32 ±3°F, open at 65 ±5°F. It belongs on the liquid side of the bottom circuit, as close to the coil as possible; copper cup on copper stub, aluminum on aluminum.",
   "Reversing valve: ohm the solenoid for continuity and shorts to ground with power off; with 24V on, check voltage at the coil and look for an overheated solenoid. Listen for the 'whoosh' when defrost starts and ends.",
   "Use a remote multi-probe thermometer on the valve's test points — inlet and outlet line temperatures should be close. In heating the solenoid is de-energized."
  ],
  "manual": "carrier-24-25-9sm",
  "pages": [
   14,
   15,
   28,
   57
  ],
  "source": "24ANB7 Application Guideline and Service Manual for Residential Air Conditioners and Heat Pumps Using R-22 and Puron Refrigerant (24-25-9SM), p.14, p.15, p.28, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-hp-gas-switchover",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Runs gas when it should run heat pump (or never switches) — 48XZ",
  "summary": "On the 48XZ the thermostat, not the unit, picks heat pump or gas from its balance-point setting.",
  "steps": [
   "The switch-over is made by the Thermidistat or dual-fuel (hybrid) thermostat using a field-set balance point, range 5–55°F.",
   "Outdoor above the balance point: the heat pump runs first. If it doesn't make enough progress in about 15 minutes, the gas furnace comes on.",
   "Outdoor below the balance point: the heat pump is locked out and only gas heats. So 'heat pump never runs in cold weather' may just be the setting — check the balance point and the thermostat's outdoor reading before diagnosing the heat pump.",
   "Heat pump heat: thermostat Y and G energize; Y goes to the defrost board, which has a 5-minute anti-short-cycle timer. The board's T2 output pulls in the contactor through the high and low pressure switches; G goes to the IGC to run the blower.",
   "Gas heat: thermostat W starts the inducer; when its hall-effect sensor proves speed, the IGC starts the burner sequence.",
   "Pick the balance point from capacity (heat pump can't keep up), economics (gas vs electric cost) and comfort (supply air feels cool) — the manual gives a worksheet.",
   "Thermostat wiring: no power-stealing thermostats; 18 AWG, or 16 AWG beyond 100 ft.",
   "Note: this 48XZ manual (48XZ-03SI) describes a conventional 24V thermostat hookup with an IGC flash-code LED; it does not mention Infinity communicating control."
  ],
  "manual": "carrier-48xz-install",
  "pages": [
   12,
   13,
   16,
   17
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.12, p.13, p.16, p.17",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-gas-no-ignition",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Gas heat won't light (LED 5 / 6 / 9 flashes) — 48XZ",
  "summary": "The 48XZ uses direct spark ignition with retries for 15 minutes before lockout.",
  "steps": [
   "Sequence: inducer starts; burners should light within 5 seconds. If not, there is a 22-second wait, then another 5-second try, repeating. No flame within 15 minutes of the heat call = lockout (5 flashes).",
   "Reset: break 24V to W, or briefly interrupt unit power, or turn the thermostat to OFF.",
   "5 flashes (ignition lockout): check igniter and flame-sensor electrode spacing and gaps, that ignition and sensor wires are properly terminated, and that the unit is getting the right amount of gas.",
   "Also from the gas-heating table: water in the gas line, no 24V, misaligned spark electrodes, air in the gas line (purge, then wait at least 5 minutes before lighting), gas valve.",
   "6 flashes (inducer fault): the IGC doesn't see the inducer running. Check voltage; if the motor runs, check the speed sensor plug at IGC J2 — pin 1 white, pin 2 red, pin 3 black.",
   "9 flashes (safety-critical fault): IGC locks out and clears after 1 hour. Check that flame-sensor and spark wires are not touching or close together and that the IGC has a good ground.",
   "3 flashes = IGC sensed flame that shouldn't be there: reset; if it persists, replace the control board."
  ],
  "safety": "If you smell gas, stop. The manual says never purge a gas line into the combustion chamber.",
  "manual": "carrier-48xz-install",
  "pages": [
   17,
   25,
   32
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.17, p.25, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-limit-rollout",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Burners cycle on limit or rollout trips (LED 1 / 2 / 4 / 7) — 48XZ",
  "summary": "How the 48XZ limit and rollout switches act and what each IGC flash count is telling you.",
  "steps": [
   "The main limit is in the R circuit: when it opens, the gas valve closes immediately and the blower keeps running until the limit resets, then the spark ignition cycles again.",
   "1 flash = fan on/off delay modified: the limit opened during warm-up before the fan-on delay, or within 3 minutes after the blower-off delay. Make sure it's fired on rate, rise is correct and external static is within guidelines.",
   "2 flashes = limit open; 4 flashes = 4 consecutive limit faults (inadequate airflow). Check the indoor fan motor and that rise matches the nameplate range.",
   "Natural gas manifold pressure must be held between 3.4 and 3.6 in. w.c.; check input by clocking the meter. Above 2000 ft reduce input 4% per 1000 ft.",
   "7 flashes = rollout (auxiliary limit above the burners) opened: gas off, indoor fan and inducer keep running. The switch resets itself but the IGC stays locked out — reset at the unit disconnect. Check gas valve operation and that the inducer wheel is tight on its shaft.",
   "Blower in gas heat: IGC brings the indoor fan on 45 seconds after flame and off 45 seconds after the call ends."
  ],
  "manual": "carrier-48xz-install",
  "pages": [
   18,
   32,
   17
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.18, p.32, p.17",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-igc-led-off",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "No gas heat, IGC LED dark or 8 flashes — 48XZ",
  "summary": "Reading the 48XZ IGC LED and the 24V supply chain behind it.",
  "steps": [
   "LED steady on = normal. LED off = hardware failure / no power to the IGC.",
   "Check the 5-amp automotive fuse on the board (it sits in series with transformer SEC2 and the R circuit), unit power, the 24V circuit breaker if fitted, and the transformer.",
   "Units without a 24V breaker have an internal overload in the transformer; if it tripped, give it 10 minutes to reset by itself.",
   "Codes are flash counts with a 3-second pause between codes; if more than one is active they show in numerical order. The chart is also on the wiring diagram inside the burner access panel.",
   "8 flashes = the microprocessor sensed a software or hardware error. If a power reset doesn't clear it, replace the IGC (ground yourself first — it is static sensitive)."
  ],
  "manual": "carrier-48xz-install",
  "pages": [
   32,
   14,
   19
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.32, p.14, p.19",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-hp-frost",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Heat pump side frosted up or outdoor fan stopped — 48XZ",
  "summary": "The 48XZ manual's own remedies for frost and outdoor-fan problems in heat pump heating.",
  "steps": [
   "Defrost thermostat location: a 3/8 in. OD stub about 3 in. long at the end of one feeder tube off the brass distributor — on most units the bottom circuit. Confirm it's there and making contact.",
   "Compressor runs nonstop with a frosted coil: the manual says check the defrost time settings and the defrost temperature switch (replace if needed), and clean a dirty or restricted outdoor coil.",
   "Low suction in heat with the outdoor coil frosted: move the defrost board timer to 30 minutes between defrost cycles.",
   "Compressor runs but outdoor fan doesn't: the defrost board's normally-closed contacts are open — check the relay on the board and replace if needed.",
   "The manual shows the defrost board (speedup pins J1, interval DIP switches, Quiet Shift switch) but gives no test procedure for it."
  ],
  "manual": "carrier-48xz-install",
  "pages": [
   27,
   31
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.27, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48xz-hp-pressure",
  "unit": "^48XZ",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Heat pump trips on pressure switch in heat — 48XZ",
  "summary": "48XZ pressure switch settings and the manual's cause list for low suction and high head in heat pump mode.",
  "steps": [
   "Both switches are in the contactor circuit: the defrost board's T2 feeds the contactor through the high and low pressure switches. The board's 5-minute anti-short-cycle delay follows any trip.",
   "Loss-of-charge switch: on the liquid line, opens at about 20 psig (this manual's figure).",
   "High-pressure switch: in the discharge line, opens at 650 psig. Causes: dirty outdoor coil, failed fan motor, outdoor air recirculation.",
   "Check either switch with power off and leads off — continuity on a good closed switch. Don't remove it unless you're sure; the system is under pressure.",
   "Low suction causes listed: dirty filter, low charge, restricted metering device or low side, low indoor airflow, restricted field filter-drier, and in heat a frosted outdoor coil.",
   "High head causes: dirty filter, dirty indoor or outdoor coil, overcharge, air in system, restricted or recirculating air. Excessive suction pressure can be a reversing valve hung up or leaking internally."
  ],
  "manual": "carrier-48xz-install",
  "pages": [
   16,
   28,
   31
  ],
  "source": "48XZ(N) 13 SEER Performance Single Packaged HYBRID HEAT Dual Fuel System with Puron Refrigerant, p.16, p.28, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-heat-sequence-lockout",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Furnace tries to light, then quits with E0 — DM97MC heat sequence timings and lockout",
  "summary": "The DM97MC runs a fixed light-off order (15 second high-speed prepurge, step to low inducer speed, igniter, gas, 30 second blower delay), and three failed tries in one call end in an E0 lockout, so knowing the order tells you which step is failing.",
  "steps": [
   "Before calling for heat, confirm the board is in standby with the display showing On (the sequence page prints it as O) while it waits for a thermostat call.",
   "Start a heat call and time it. The inducer runs on HIGH speed for a 15 second prepurge, then steps down to LOW speed.",
   "The igniter only starts warming after the inducer has stepped to low speed AND the low stage pressure switch is closed. If the inducer runs and the igniter never glows, go to the pressure switch checks (E1/E2).",
   "At the end of igniter warm-up the gas valve opens. It stays open only if the board sees flame.",
   "The circulator comes on at heat speed after a 30 second blower-on delay. A blower that starts on time means ignition and flame proving worked.",
   "Three failed ignition retries or flame recycles in one call lock the board out with E0. The chart lists these causes: no gas, front cover pressure switch stuck open, bad or misaligned igniter, wrong orifices, or a coated or loose flame sensor. If flame is lost after lighting, check for an interrupted gas supply, lazy flame, the front cover switch opening, or poor inducer performance.",
   "To reset the lockout: wait out the one-hour auto reset, cut 115 V power, or remove the thermostat call for 1-20 seconds and then restore it. If the cause is still there, it will lock out again.",
   "When the call ends, the gas valve closes and the inducer runs a 15 second post purge before shutting off."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   47,
   49,
   51
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.47, p.49, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-conventional-stat-firing-rate",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Stays on low fire for the first part of every call on a regular thermostat — DM97MC firing-rate timers",
  "summary": "With a conventional 24 V thermostat the DM97MC does not go straight to full fire; it ramps on fixed timers chosen by the Thermostat Heat Setup DIP switch, so a slow climb to 100% is normal operation, not a fault.",
  "steps": [
   "Check the Thermostat Heat Setup DIP switch. The board ramps differently on the 1-Stage Heat setting and the 2-Stage Heat setting.",
   "On the 1-Stage Heat setting, only W1 starts the call. W2 is ignored, so a W2 wire does nothing.",
   "1-Stage ramp after light-off and stabilization: 35% (low fire), 57% after 2 minutes, 78% at 10 total minutes, then 100% at 20 total minutes for the rest of the call. Each change ramps at 1% per second.",
   "2-Stage setting with W1 only: low fire, then 50% after 2 minutes for the next 8 minutes, then +10% every 10 minutes for the rest of the call.",
   "2-Stage setting with W1 and W2 together from the start: 35% low fire, then 80% after 2 minutes, then +10% every 10 minutes.",
   "If W2 arrives while a W1 call is running, the board ramps to 100% (1% per second) for the rest of the W2 call. When W2 drops and W1 stays on, it holds the current firing rate until W1 is satisfied.",
   "The circulator CFM is adjusted to match the current firing rate, so airflow climbing along with the ramp is normal."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   35,
   36
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.35, p.36",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-pressure-switch-vfd-inducer",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Inducer runs but no ignition, or never gets past low fire — DM97MC pressure switches and VFD inducer",
  "summary": "On the DM97MC the board drives a 3-phase inducer at variable speed, and the gas valve modulates off the same negative pressure the switches see; tubing, venting and drain problems therefore show up as E1/E2 (low stage) or E8/E9 (high stage).",
  "steps": [
   "Know the setup: the board controls the RPM of the 3-phase inducer (variable frequency drive). The inducer, pressure switches and gas valve are linked by tubing, and the valve modulates based on that negative pressure.",
   "After every power off/on, the next heat call runs a calibration routine. The inducer ramps up and down before ignition. This is normal, not a hunting inducer.",
   "Normal start: 15 second high-speed prepurge, then low speed with the low stage pressure switch contacts closed before the igniter is allowed on.",
   "E1 = the low stage pressure switch circuit is closed at the start of the heating cycle. Look for sticking switch contacts or a short in the switch wiring.",
   "E2 = the inducer runs continuously and nothing else happens because the low stage switch never closes. Check the hose (blocked, pinched or misconnected), flue and intake blockage, a blocked drain system, a weak inducer, the switch set point and contacts, loose wiring, and the H fitting atmospheric port.",
   "If you take the H fitting apart, reassemble it in the factory configuration.",
   "Runs normally on low stage but will not go to high stage: E8 = high stage switch circuit closed at the start of the cycle (sticking contacts or shorted wiring). E9 = high stage switch circuit not closed with the inducer running. Do the same hose, vent, drain and inducer checks.",
   "The start-up checklist calls for checking for kinked pressure switch tubing. Do that before condemning a switch. The manual does not publish switch set points in inches W.C."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   5,
   39,
   47,
   51,
   53,
   59
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.5, p.39, p.47, p.51, p.53, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-limit-rollout-aux-trips",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower runs or furnace dead with E3, Ed or EF — DM97MC limit, rollout and auxiliary input trips",
  "summary": "On the DM97MC, E3 means the auto-reset primary limit is open, Ed means a manual-reset rollout switch is open, and EF means the AUX input (jumper or float switch) is open; each code has its own causes and its own reset.",
  "steps": [
   "E3 = primary limit open. The circulator runs continuously with no burner operation. The primary limit sits on the partition panel and is a normally closed, automatic-reset sensor.",
   "For E3, look for low airflow first: blocked filters, restrictive ductwork, wrong circulator speed, or a failed blower motor. Measure the temperature rise and compare it to the model's HI / LO range in the manual (example: DM97MC0803BN** is 30-60 / 25-55).",
   "The auxiliary limits sit on or near the circulator blower and watch blower compartment temperature. On this model they are auto-reset sensors that trip for the same low-airflow reasons.",
   "Ed = a manual-reset rollout switch is open. The rollout switches are mounted on the burner/manifold assembly. The chart lists these causes: orifice plate out of position, blocked heat exchanger, burners out of alignment, defective heat exchanger.",
   "After you reset a rollout and refire, watch for flame disturbance when the blower comes on. The chart lists that check under a defective heat exchanger.",
   "EF = open auxiliary input. Check for an open between AUX IN and AUX OUT, a missing jumper, or an open float switch.",
   "Pull the fault history before clearing anything. In standby, hold the fault recall button 2-5 seconds. The board keeps the last ten faults, and a repeating fault is logged at most three times in a row."
  ],
  "safety": "Do not bypass limit or rollout switches. Find out why a manual-reset rollout opened before you reset it.",
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   40,
   46,
   48,
   51,
   52
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.40, p.46, p.48, p.51, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-heat-blower-delays",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower starts late or keeps running after the flame is out — DM97MC heat blower timings",
  "summary": "The DM97MC delays the circulator 30 seconds after ignition and runs it for a DIP-selected 90-180 second heat off delay (150 seconds factory), with an extra high-speed step after a high heat call and a 30 second ramp-down, so a late start or long run-on is usually by design.",
  "steps": [
   "Blower on: the circulator starts on heat speed after a 30 second blower-on delay. Do not chase a blower that comes on 30 seconds after the burners light.",
   "While running, the circulator CFM rises and falls with gas valve modulation, so changing airflow during a long call is normal.",
   "Heat off delay: 90, 120, 150 or 180 seconds, set on the heat off delay DIP switches. Factory setting is 150 seconds. Check the DIP switch chart in the back of the manual before calling a long run-on a fault.",
   "If the last call was for high heat, the blower runs on the high heating speed for 30 seconds, then low heating speed for the rest of the off delay.",
   "After the off delay ends, the blower ramps down to OFF over the next 30 seconds.",
   "Heating speed tap ships at B and is set with DIP switches 3 and 4. Choose the tap that puts the temperature rise inside the model's range, and confirm CFM on the 7-segment display, which reads to the nearest 100 CFM.",
   "Rise too high: increase blower speed. Rise too low: decrease blower speed."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   40,
   42,
   47
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.40, p.42, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-manifold-pressure-check",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Checking manifold pressure at light-off and high fire — DM97MC (valve is factory set)",
  "summary": "The DM97MC lights at 80% of max input and has published manifold ranges at ignition and at high stage; the gas valve is factory set and is not to be adjusted, so a reading out of range points you upstream, not at the regulator.",
  "steps": [
   "Check inlet pressure first with the burners firing and all other gas appliances running. Natural gas: 4.5\" to 10.0\" w.c. Propane: 11.0\" to 13.0\" w.c.",
   "Power and gas off. Remove the outlet pressure tap plug, install a 1/8\" NPT hose barb, and connect the manometer. Restore gas and power, then call R to W1.",
   "If power was just cycled, the first call runs the calibration routine (the inducer ramps up and down) before ignition. Wait it out.",
   "The furnace lights at 80% of max input. Expected manifold at ignition: natural gas 1.8\" to 2.5\" W.C.; propane 5.8\" to 6.8\" W.C.",
   "For high fire, use Field Test Mode: during a heat cycle press Fault Recall twice within 5 seconds (display shows Ft), then hold it 3 seconds. It fires at 100% for 5 minutes or until the call ends, and the display shows Hi.",
   "High stage targets: natural gas 3.2\" to 3.8\" w.c. (3.5\" nominal); propane 9.5\" to 10.5\" w.c. (10.0\" nominal). The gas table lists low stage (50% firing rate) as 1\" w.c. natural and 2.6\" w.c. propane.",
   "Do not adjust the valve. The manual says it is factory set and needs no field adjustment. If readings are off, recheck inlet pressure, orifices and the LP conversion. Final manifold may not vary more than ±0.3\" w.c. on natural gas or +0.5\" on LP.",
   "Remove the barb, reinstall the tap plug with thread sealer, and leak-test the plug with the burners running."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   29,
   38,
   39
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.29, p.38, p.39",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-condensate-freeze",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes or E0 lockouts in cold weather — DM97MC condensate drain and vent freezing",
  "summary": "On the DM97MC the pressure switches also guard against a blocked condensate drain; a frozen or trapped drain line, a misrouted front cover switch tube, or frozen vent piping therefore shows up as switch faults or ignition lockouts in cold weather.",
  "steps": [
   "Treat drain problems as a possible cause of pressure switch and E0 faults. The switches guard against blocked condensate drain conditions, and the E0 chart says to make sure the furnace is draining properly.",
   "Confirm both sides of the drain trap were primed. The drain line must slope down 1/4 inch per foot to the drain and must not be trapped anywhere except the furnace's own trap.",
   "Any drain line that runs through an area near or below freezing needs freeze protection.",
   "Horizontal installs: the trap hangs below the furnace and needs at least 5 1/2 inches of clearance. Protect it from freezing if that space gets cold.",
   "Horizontal with the LEFT side down: the front cover pressure switch tube must be moved to the lower port of the collector box cover (24 inch x 1/4 inch tube from the bag assembly). If it was left on the upper port, the switch can misread.",
   "Vent and intake piping exposed below 35°F for extended periods should be insulated with 1/2\" thick closed cell foam. Check for sags that hold water.",
   "On a horizontal install, check that the furnace is level end to end and tilted 1/2 to 3/4 inch toward the front, so recuperator condensate runs forward to the front cover."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   10,
   12,
   19,
   48,
   51
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.10, p.12, p.19, p.48, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm97mc-comfortnet-network-heat",
  "unit": "^D[MC]97MC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Communicating thermostat shows Check Furnace or will not run heat — DM97MC network checks",
  "summary": "On a communicating DM97MC the thermostat only relays furnace faults, and heat calls ride on the data 1/data 2 pair; read the furnace display code first, then use the board's red and green network LEDs, the bias DIP switches and the learn button to clear wiring problems.",
  "steps": [
   "When the thermostat scrolls \"Check Furnace\" or lights Call for Service, read the code on the furnace's 7-segment display and work that code.",
   "Confirm the thermostat is an approved communicating model: Daikin One+ Smart Thermostat or CTK04. Any other setup must be wired as a conventional system.",
   "Wiring: data 1 and data 2 plus R and C between furnace and thermostat, and data 1 and 2 between furnace and outdoor unit. Use 18 AWG, and put no more than two wires in any terminal of the plug.",
   "Use the board's network tools. A rapidly flashing green receive LED means normal network traffic. The table pairs a green receive LED on solid with a data 1/data 2 miswire. Two red flashes means an out-of-box reset.",
   "Typical wiring faults: data 1 and data 2 reversed at the furnace, thermostat or outdoor unit; a short between data 1 and data 2; data 1 or 2 shorted to R or C. Twist stranded wire securely before inserting it in the terminal block.",
   "The bias and pull-up/pull-down DIP switches on the furnace board must be ON for communications to work.",
   "After fixing the wiring, press the learn button about 2 seconds to reset the network."
  ],
  "manual": "daikin-dm97mc-dc97mc-install",
  "pages": [
   42,
   43,
   46,
   51
  ],
  "source": "DM97MC / DC97MC Modulating Gas Furnace, p.42, p.43, p.46, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-heat-sequence-checkpoints",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "No heat, need to see where the call dies — DM96VC",
  "summary": "The DM96VC runs the same steps on every heat call, and the E1, E2 and E0 codes each line up with one of those steps, so watch which step it stops on.",
  "steps": [
   "Before calling for heat, confirm the display shows On in standby. If the display is blank, check 115 V, 24 V and the 3 A automotive fuse on the control.",
   "Close R to W1. The inducer should start on HIGH speed for a 15-second prepurge.",
   "If the furnace won't start at all and the display shows E1, the low stage pressure switch was already closed when the call started. Look for sticking contacts or a short in the switch wiring.",
   "After prepurge the inducer drops to LOW speed, and igniter warm-up starts only once the low stage pressure switch is closed. If the inducer keeps running and nothing else happens (E2), check the switch hose, the flue and intake pipe, the drain system and the inducer itself.",
   "At the end of igniter warm-up the gas valve opens. It stays open only if the board proves flame.",
   "The circulator comes on at heat speed after a 30-second on delay and needs another 30 seconds to ramp up to full speed, so getting little air for the first minute is normal.",
   "Three failed ignitions in one call put it in lockout (E0). To reset, kill 115 V or drop the thermostat call for 1-20 seconds. It also resets itself after one hour. If the cause is still there, it goes straight back into lockout.",
   "For E0, the chart's causes are: no gas, the front cover pressure switch stuck open, a bad or misaligned igniter, wrong orifices, or a coated flame sensor (clean it with emery cloth)."
  ],
  "safety": "Turn power off before repairing switches or wiring. Do not bypass safety devices to get it to fire.",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   46,
   48,
   49,
   56,
   57
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.46, p.48, p.49, p.56, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-single-stage-stat-staging",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Stays on low fire with a single-stage thermostat — DM96VC",
  "summary": "With a one-stage heat thermostat, the DM96VC moves itself from low to high fire on a timer; S1 DIP switches set that timer to a fixed 5 minutes or to AUTO (1-12 minutes).",
  "steps": [
   "Check the thermostat type. A single-stage heat thermostat only sends W1, so the furnace runs low stage for a set time and then steps up to high on its own.",
   "Find S1 switch 3 (thermostat select): ON means two-stage thermostat, OFF means single-stage thermostat.",
   "S1 switch 4 sets the delay: OFF gives a fixed 5-minute delay before high fire, ON gives AUTO. In AUTO the delay varies with load, from 1 to 12 minutes.",
   "In AUTO the control averages the last three cycle times to pick the delay. Don't judge it from one short cycle right after a power-up or a switch change.",
   "If switch 3 is ON, switch 4 is ignored. Setting the delay does nothing until switch 3 is OFF.",
   "Turn off power to the furnace before you move S1 switches, then turn power back on.",
   "To confirm the step-up, watch the dual 7-segment status display. Low stage gas heat and high stage gas heat show as separate status codes.",
   "If it shows E8 or E9, the board is holding it on low stage only because of the high stage pressure switch. Fix that first. The staging DIPs won't help."
  ],
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   26,
   51,
   54,
   58
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.26, p.51, p.54, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-heat-off-delay-blower",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower keeps running long after the burners shut off — DM96VC",
  "summary": "After a heat call the DM96VC holds the circulator for a DIP-selected heat off delay; the speed during that delay depends on whether the last call was low or high heat.",
  "steps": [
   "Time the shutdown. When the call ends the gas valve closes, the inducer runs a 15-second post purge, and the circulator keeps going for the heat off delay.",
   "Read S1 switches 1 and 2. OFF/OFF = 90 s, ON/OFF = 120 s, OFF/ON = 150 s (factory setting), ON/ON = 180 s.",
   "If the last call was low heat, the blower runs low heat speed for the whole delay.",
   "If the last call was high heat, the blower runs high heat speed for 30 seconds, then drops to low heat speed for the rest of the delay.",
   "When the delay ends, the blower takes another 30 seconds to ramp down to off. Count that in before calling it a stuck relay.",
   "If a two-stage thermostat drops from high to low during a call, the inducer and gas valve go to low right away, but the blower stays on high heat speed for 30 seconds. That is normal.",
   "The delay can be changed to suit the installation and the homeowner, for example shorter if they complain about cool air at the end of the cycle. Turn power off before you change the switches."
  ],
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   43,
   47
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.43, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-heat-speed-temp-rise",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Temperature rise too high or too low in heat — DM96VC heat speed tap",
  "summary": "DM96VC heat airflow is set with S4 switches 3 and 4, picking from the speed set the ADJUST taps allow; the measured rise has to land inside the rating-plate range.",
  "steps": [
   "Fire the burners for about ten minutes with all registers open and the duct dampers in their final position.",
   "Put thermometers in the supply and return ducts as close to the furnace as you can, but not where they can 'see' the heat exchanger. Rise = supply minus return.",
   "Compare the rise to the range on the unit rating plate. A rise outside that range can cause condensing in the heat exchanger or overheat it.",
   "Read the heat speed at S4 switches 3 and 4: A = OFF/OFF, B = ON/OFF (factory setting), C = OFF/ON, D = ON/ON.",
   "The ADJUST setting (already set during cooling setup) decides which set of four heat speeds you can choose from. Changing ADJUST later also shifts heat airflow.",
   "If the rise is too high, go to a higher speed. If it's too low, go to a lower speed.",
   "Example from the manual: a DM96VC0804CN** with ADJUST at plus, on heat speed A, gives a 46°F rise on both stages, inside its 30-60°F range. Use the heating speed chart in your model's Specification Sheet.",
   "After any change, confirm CFM on the dual 7-segment display, then measure the rise again."
  ],
  "safety": "Turn off power to the furnace before changing speed taps.",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   40,
   41,
   43
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.40, p.41, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-e3-limit-rollout",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "E3 with the blower running nonstop — limit or rollout open on a DM96VC",
  "summary": "On the DM96VC, E3 covers three different switches: an auto-reset primary limit, manual-reset auxiliary limits at the blower and manual-reset rollout switches at the burners; find which one is open before you reset anything.",
  "steps": [
   "E3 looks like this: the circulator runs nonstop and the furnace won't fire. The code covers the primary limit circuit, the auxiliary limit circuit and the rollout circuit.",
   "Power off. Check the rollout switches on the burner/manifold assembly first. They are manual reset, and a tripped one means flame was not drawn into the heat exchanger.",
   "For a rollout trip, check burner alignment, look for a blocked flue or air intake pipe, and check inducer performance before you put it back in service.",
   "Next check the auxiliary limits on or near the circulator blower. These are also manual reset and sense blower compartment temperature.",
   "The primary limit is on the partition panel. It resets itself when it cools, so a furnace that comes back on its own after an E3 points to the primary limit and an airflow problem.",
   "For a limit trip, look for low airflow over the heat exchanger: blocked filters, restrictive ductwork, wrong circulator speed, or a failed blower motor. Also check for loose limit-circuit wiring.",
   "Check the heat speed and the temperature rise against the model's rise range before you leave."
  ],
  "safety": "Do not bypass any limit or rollout switch. Find why it opened before resetting it.",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   48,
   57
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.48, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-e8-e9-high-stage-switch",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Heats on low fire only, display shows E8 or E9 — DM96VC high stage pressure switch",
  "summary": "On the DM96VC, a high stage pressure switch fault doesn't shut the furnace down; it keeps running on low stage only and shows E8 or E9.",
  "steps": [
   "Symptom: the furnace won't run high stage but runs normally on low, with E8 or E9 on the display.",
   "E8 means the high stage pressure switch was already closed at the start of the heat cycle. Look for sticking contacts or a short in the switch wiring. Replace the high stage switch or repair the short.",
   "E9 means the high stage switch did not close with the inducer running. On a high call, the inducer and gas valve should both change to high stage.",
   "Both pressure switches sense negative pressure through taps on the inducer and the coil front cover, so a blocked condensate drain can hold them open.",
   "For E9, check in this order: hose blocked, pinched or on the wrong port; blocked flue or intake pipe; blocked drain system; weak inducer; wrong switch set point or bad contacts; loose wiring.",
   "On a high-altitude install, confirm the correct pressure switch is fitted. A different switch may be required at altitude (see the Specification Sheet).",
   "Replace a switch only with the proper replacement part."
  ],
  "safety": "Turn power off before repairing switches or wiring.",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   30,
   46,
   48,
   58
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.30, p.46, p.48, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-condensate-freeze",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Drain trap or drain line freezing in a cold space — DM96VC",
  "summary": "A frozen trap or drain line on a DM96VC shows up as pressure switch trouble in heat; the manual calls for freeze protection on the trap and drain line, plus correct slope and priming.",
  "steps": [
   "If the furnace or its drain runs through space that can freeze, protect the trap and drain line. The manual recommends accessory drain trap heaters, electric heat tape and/or RV antifreeze.",
   "A frozen or plugged drain usually shows up as a pressure switch fault. E2 and E9 both list a blocked drain system as a cause.",
   "Check that the drain line slopes 1/4 inch per foot down toward the drain, with no trap anywhere except the furnace's own trap.",
   "After you thaw or clean it, prime both sides of the drain trap before restarting.",
   "If an AC coil drains into the same line, it needs an open tee near the coil, set no higher than the bottom of the furnace collector box, so the coil can't back water into the furnace.",
   "On horizontal installs the trap hangs below the furnace and needs at least 5 1/2 inches of clearance.",
   "While you're there, check the vent. Vent pipe exposed below 35°F for long periods, or run outdoors or through unheated space, must be wrapped in 1/2 inch closed-cell foam."
  ],
  "safety": "Failing to protect the trap and drain against freezing can cause property damage (frozen and burst pipe hazard).",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   3,
   10,
   14,
   20,
   21,
   57
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.3, p.10, p.14, p.20, p.21, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dm96vc-comm-heat-faults",
  "unit": "^D[MC]96VC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Intermittent no heat on a communicating DM96VC — pulling fault history and checking the network",
  "summary": "The DM96VC keeps a fault history you can read at the board or at a CTK04 thermostat, and two network LEDs tell you whether a communicating no-heat is a wiring problem.",
  "steps": [
   "At the board: in standby with On showing, hold the fault recall button 2-5 seconds until the display goes blank. Faults then show from newest to oldest, 2 seconds each.",
   "The same fault is logged at most 3 times in a row, so a history full of one code means it keeps coming back.",
   "To clear history after the repair, hold the button 5-10 seconds until the display flashes '_'. If you hold it longer than 10 seconds, nothing is cleared.",
   "With a CTK04 thermostat, the furnace diagnostics menu shows the last six faults (FAULT #1 to #6) and a CLEAR option.",
   "Red communications LED: 1 flash means communications failure. Press the learn button and check that the bus BIAS and TERM DIP switches are ON.",
   "Green receive LED: rapid flashing is normal traffic. One steady flash means no network found (broken data wire, or the furnace is set up as a legacy system). On solid means data 1 and data 2 are miswired or shorted to each other or to R/C.",
   "To reset the network, press the learn button once quickly for a power-up reset, or hold it about 2 seconds for an out-of-box reset.",
   "On a CTK04 system, heat blower settings live in the thermostat menu: HT TRM (-10% to +10% in 2% steps), HT ON (5-30 s, default 30) and HT OFF (30-180 s, default 150)."
  ],
  "safety": "Turn power off before repairing data or thermostat wiring.",
  "manual": "daikin-dm96vc-furnace-install",
  "pages": [
   45,
   46,
   52,
   55
  ],
  "source": "DM96VC / DC96VC Two-Stage Variable-Speed Gas Furnace, p.45, p.46, p.52, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-heat-sequence-walk",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "No heat — walking the two-stage heat sequence step by step — DR96TN/DD96TN",
  "summary": "The DR96TN/DD96TN board checks the limit and pressure switch at the 12-pin connector before it starts the inducer, then runs a fixed igniter warm-up, trial for ignition and blower delay, so you can pin a no-heat to the exact step that fails.",
  "steps": [
   "Confirm 24 VAC between W (W1) and C at the board during the call. No voltage there means the thermostat circuit is open, not a furnace fault.",
   "Before anything moves, the board checks the limit circuit: it wants 24 VAC on pin 8 of the 12-pin connector. No voltage on pin 8 means an open limit circuit.",
   "It also needs the pressure switch circuit OPEN at the start (0 VAC on pin 5). Voltage on pin 5 before the inducer runs means a stuck-closed switch or a short.",
   "The inducer starts. If it doesn't, check for 115 VAC at the draft inducer. Pre-purge only begins once the low-fire pressure switch closes (24 VAC on pin 5).",
   "After pre-purge the igniter is powered and should glow for the whole 17-second warm-up. If it drops out early, check whether the pressure switch is opening during warm-up.",
   "At the end of warm-up the gas valve opens. The trial for ignition is 4 seconds, and the igniter shuts off as soon as flame is sensed. Prove the valve opened by seeing correct manifold pressure for at least 4 seconds.",
   "With flame proven, the blower should start on heat speed 30 seconds later. If it doesn't, go to the blower checks.",
   "When the thermostat is satisfied, the gas valve closes, the inducer runs a 15-second post-purge, and the blower runs the off delay (90 seconds by default)."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   7,
   8,
   25,
   33,
   34
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.7, p.8, p.25, p.33, p.34",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-single-stage-stat-staging",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Never goes to high fire with a single-stage thermostat — DR96TN/DD96TN",
  "summary": "The DR96TN/DD96TN ships set up for a two-stage heating thermostat, so on a W1-only thermostat it stays on low fire unless the AHS menu is set to a fixed time or to AUt.",
  "steps": [
   "Check the thermostat and its wiring. The factory setup expects a two-stage heating thermostat (AHS set to no), and in that mode only a W2 signal brings on high fire.",
   "With a single-stage thermostat on W1 only, press Left or Right until AHS shows, then press center. The choices are no, 10, 20, 30, 60 and AUt.",
   "10, 20, 30 and 60 are fixed minutes on low fire before the board stages up. AUt works out the delay from how long the previous heating cycles ran.",
   "In AUt the delay runs from 1 to 12 minutes: a light duty cycle (0-38%) waits 12 minutes, and a heavy one (89-100%) waits 1 minute. A long low-fire run in mild weather can be normal.",
   "Press the center switch to save the selection.",
   "When the board stages up, the inducer goes to high speed. The 2nd-stage pressure switch has to close before the high-fire side of the valve opens and the blower moves to 2nd-stage heat speed.",
   "If the inducer goes to high but the valve stays on low fire, look for E9 (high pressure switch circuit not closed; the furnace runs low stage only). Check that switch's hose, its negative pressure and the venting.",
   "On a high-fire call, the valve's M-to-C and HI-to-C voltages should match the board's W1-to-C and W2-to-C voltages."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   5,
   8,
   34,
   36
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.5, p.8, p.34, p.36",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-heat-blower-speed",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "High temperature rise or wrong heat airflow — setting heat speeds on the nine-speed ECM — DR96TN/DD96TN",
  "summary": "Low-fire and high-fire blower speeds are set separately in the gA1 and gA2 menus; each stage offers only three taps, and the heating airflow chart marks some of them as not recommended for heating.",
  "steps": [
   "Measure the rise. Fire the burners for about ten minutes with every register open, put thermometers in the return and supply where they can't see the heat exchanger, and subtract.",
   "Too much external static cuts airflow and drives the rise up until the limit trips. Check filters and static before you change speeds.",
   "Low-fire heat speed is the gA1 menu and high-fire heat speed is gA2. Press Left or Right until it shows, then press center to see the current Fxx.",
   "W/W1 can use F01 (default), F03 or F04. W2 can use F02 (default), F04 or F05.",
   "Before you pick a tap, check the heating airflow chart for the exact model. Some taps the menu offers are marked not recommended for heating on certain sizes.",
   "Raise the blower speed to lower the rise, or lower it to raise the rise. Check motor current while you adjust.",
   "Press the center switch to save, then re-measure the rise on both stages."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   8,
   18,
   26,
   32
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.8, p.18, p.26, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-heat-blower-delays",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower slow to start in heat, or runs long after the burners shut off — DR96TN/DD96TN",
  "summary": "Heat blower on and off delays live in the gnd and gFd menus, each with a fixed range and step size; know the defaults before you treat a delay as a fault.",
  "steps": [
   "Normal operation: the blower starts on heat speed 30 seconds after ignition and runs 90 seconds after the thermostat is satisfied (the default).",
   "Heat on delay is the gnd menu: 30 seconds by default, adjustable from 5 to 30 seconds in 5-second steps. It can't be set longer than 30.",
   "Heat off delay is the gFd menu: 90 seconds by default, adjustable from 30 to 180 seconds in 30-second steps.",
   "To change either one, press Left or Right to the menu, press center, step to the value you want, and press center to save.",
   "If the blower never starts after the 30-second delay, check for 115 VAC from the board to the motor, then for 24 volts between motor common (C) and one of the T speed terminals.",
   "If the circulator runs nonstop with no burners and the display shows EE3, it's a limit problem, not a delay setting. See the limit and rollout checks."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   8,
   26,
   28,
   34
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.8, p.26, p.28, p.34",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-r32-mitigation-in-heat",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Furnace stops heating and only the fan runs (EAL, EAF, EAS, Ear) — DR96TN/DD96TN R-32 mitigation",
  "summary": "This board monitors an R-32 leak sensor on the indoor coil, and any A2L alarm puts it in mitigation mode (gas heat off, blower at maximum airflow), which looks like a no-heat call.",
  "steps": [
   "Read the display. EAL means the sensor has detected a leak. EAF means the board lost communication with the sensor. EAS means a sensor fault. Ear means a fault in the board's A2L relay. Every one of these puts the furnace in mitigation mode.",
   "In mitigation the board shuts down the gas, runs the fan at maximum CFM, and energizes the optional ventilation dry contact (VT IN/VT OUT) and the 24 VAC A2L alarm output.",
   "EAL: look for a refrigerant leak at the indoor coil. Once the sensor stops detecting a leak, the fan keeps running for 5 minutes, then the furnace goes back to normal operation.",
   "EAF on a system whose coil isn't R-32: the A2L function is ON from the factory. Go to the A2E menu (A2L Function Enabled) and set it to no.",
   "EAF on an R-32 system: check that the sensor wire is plugged into the board, isn't loose or damaged, and isn't routed near the flue pipe. Replace the sensor if needed.",
   "EAS: check the sensor, and replace it if needed. Ear: cycle power to the furnace. If it comes back, replace the control board.",
   "After a repair, run the A2u menu (A2L Function Verification). It only works when no alarms or faults are active. The board should show EAL, shut off the gas and run the fan at max, then exit after the 5-minute timeout."
  ],
  "safety": "Only set A2E to no when the paired indoor coil does not use R-32. With an R-32 coil the sensor must be connected and the function left on.",
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   7,
   10,
   26,
   29
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.7, p.10, p.26, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-lo-hi-manifold-36j54",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Weak heat or rollout trips — checking low- and high-fire manifold pressure on the 36J54 valve — DR96TN/DD96TN",
  "summary": "The DR96TN/DD96TN uses a White-Rodgers 36J54 two-stage valve with separate LO and HI regulator towers; each is set on its own thermostat call, against this manual's natural gas and LP ranges.",
  "steps": [
   "Check inlet pressure first, with the burners firing and every other gas appliance on the line running. Natural gas should be 4.5 to 10.0 in. w.c. and LP 11.0 to 13.0 in. w.c.",
   "Shut off the gas and power. Back the outlet pressure test screw out one turn (no more) and connect the manometer.",
   "Turn the gas and power back on and close R and W1 for low fire. Natural gas should read 1.6 to 2.2 in. w.c. (nominal 1.9). LP should read 5.7 to 6.3 (nominal 6.0). Adjust at the LO tower: clockwise raises pressure.",
   "Close R, W1 and W2 for high fire. Natural gas should read 3.2 to 3.8 in. w.c. (nominal 3.5). LP should read 9.7 to 10.3 (nominal 10.0). Adjust at the HI tower.",
   "When you're done, turn the outlet test screw back in to seal it (7 in-lb minimum), then soap-test the screw for leaks.",
   "If the valve won't open at all, remember it needs 24 volts between common and low fire, and the front cover pressure switch is wired in series with the low (main) solenoid.",
   "From 0 to 7000 feet the furnace needs no change. Do not raise manifold pressure or change orifices below 7000 feet to get more output."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   21,
   22,
   23,
   24
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.21, p.22, p.23, p.24",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-limit-rollout-trips",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower runs nonstop with no burners — primary limit, auxiliary limit or rollout trip — DR96TN/DD96TN",
  "summary": "An open primary limit (EE3) or an open rollout (E11) both leave the circulator running with no burner, but the primary limit resets itself and the rollout has to be reset by hand.",
  "steps": [
   "Read the code. EE3 means the primary limit circuit is open (circulator runs, no furnace operation). E11 means an open rollout switch.",
   "Primary limit: it's a nonadjustable, auto-reset bi-metal. Remove the burner door and the low-voltage wires and ohm across it. It should read continuous unless the heat exchanger is above its setting.",
   "There are two auxiliary limits on the blower housing, one on each side. They protect against blower failure in horizontal installs and can also open if power drops out while the furnace is firing. Pull the wires and check continuity.",
   "For limit trips, check filters and ductwork for blockage and check blower speed and performance. High static means high rise, which means limit trips.",
   "Rollout: it's a manual-reset switch on the burner/manifold assembly, and the circulator runs continuously while it's open. Reset it, pull the wires and ohm it. Replace it if it won't close after the reset.",
   "Find out why it tripped before you leave. Possible causes are flame impingement, the orifice plate out of position, over-firing, wrong orifices or gas pressure, and air leaking around or through the heat exchanger.",
   "Re-check manifold pressure against the manual's ranges and watch the burners through a full cycle before you close up."
  ],
  "safety": "Do not bypass the primary or auxiliary limit circuit. Repeated rollout trips point to a combustion or heat exchanger problem.",
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   18,
   19,
   20,
   28,
   29
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.18, p.19, p.20, p.28, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tn-pressure-switch-e1-e2-e8-e9",
  "unit": "^D[RD]9[0-9]TN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Inducer runs but no ignition, or stuck on low fire — low, high and front cover pressure switches — DR96TN/DD96TN",
  "summary": "This two-stage furnace has a low-fire switch, a high-fire switch, and a front cover switch in series with the gas valve; the manual's E1/E2/E8/E9 flowchart tells you which one to chase.",
  "steps": [
   "Read the code. E1: low switch closed at the start of the heat cycle. E2: low switch not closed. E8: high switch closed at the start. E9: high switch not closed (the furnace runs low stage only).",
   "E1 or E8: pull the wires and ohm the switch with the inducer off. If the contacts are stuck closed, replace the switch. If not, look for a short in that wiring, either to another wire or to ground.",
   "E2 or E9: make sure the inducer is running. Check that the switch hose isn't blocked, kinked or pinched and is on the right port. Check the flue and intake for blockage, length, number of elbows and termination.",
   "Tee a manometer into the hose and compare the negative pressure to the closing point specified for that switch. With the inducer running, an ohmmeter across the switch should read closed.",
   "Check inducer voltage, and check its amperage while it runs.",
   "Look for condensate in the inducer or a plugged switch port on the inducer, and make sure the drain trap is primed and clear.",
   "Inducer runs, igniter glows, but no gas: check the front cover pressure switch. It's wired in series with the gas valve, so a backed-up drain opens it and blocks the valve."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   21,
   24,
   33,
   35,
   36
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.21, p.24, p.33, p.35, p.36",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-heat-sequence-walk",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "No heat — walking the single-stage heat sequence and its timings — DR96SN",
  "summary": "The DR96SN control has a fixed order of checks and delays on a W call; knowing the pin voltages, the 30-second blower delay and the 15-second post-purge lets you name the step where the heat call stops.",
  "steps": [
   "On a call for heat the board should get 24 VAC on W. Then it runs its self-check.",
   "Limit check: the board wants 24 VAC on pin 8 of the 12-pin connector.",
   "Pressure switch check: the circuit must be OPEN at the start (0 VAC on pin 5). The board also checks that there is no voltage at the gas valve before it starts.",
   "The inducer starts. Pre-purge begins once the pressure switch closes (24 VAC on pin 5), and then the igniter is powered.",
   "After the igniter warm-up the gas valve opens, and the igniter shuts off as soon as flame is sensed. After 3 failed ignition retries the furnace locks out on EE0.",
   "The blower starts on heat speed 30 seconds later. While the furnace is in gas heat, the display shows gH.",
   "When the thermostat is satisfied, the gas valve closes, the inducer stops after a 15-second delay, and the blower runs its off delay (90 seconds by default).",
   "The delays can be changed. gnd (heat on delay) defaults to 30 seconds, adjustable 5 to 30 in 5-second steps. gFd (heat off delay) defaults to 90 seconds, adjustable 30 to 180 in 30-second steps."
  ],
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   36,
   37,
   42,
   43
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.36, p.37, p.42, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-heat-blower-speed",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Wrong temperature rise in heat — choosing the heat blower speed (and avoiding F01) — DR96SN",
  "summary": "The DR96SN heat menu offers F01, F02, F03 and F04, but the DR96SN heating airflow chart marks F01 as not recommended for heating; F02 is the default and recommended tap.",
  "steps": [
   "Measure the rise. Fire the burners for about ten minutes with all registers open, put thermometers in the return and supply out of sight of the heat exchanger, and subtract. The rise must fall within the range on the rating plate.",
   "To change the heat speed, press Left or Right until gA1 shows, then press center to see the current Fxx. (The manual's menu chart lists this item as gAF.)",
   "The heat call can use F01, F03, F04 or F02 (default).",
   "Check the DR96SN heating airflow chart before you choose. F01 is marked not recommended for heating on every DR96SN size, and on at least one size F04 is too. F02 is the default and recommended tap.",
   "Raise the blower speed to lower the rise, or lower it to raise the rise.",
   "Press center to save. The new speed takes effect on the next heating call, so cycle the thermostat before you re-measure.",
   "Don't leave the rise outside the rating plate range. The manual warns that a wrong rise can cause condensing in, or overheating of, the heat exchanger."
  ],
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   36,
   39,
   42,
   51
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.36, p.39, p.42, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-r32-mitigation-in-heat",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Furnace stops heating and only the fan runs — R-32 sensor and mitigation mode (EAL, EAF, EAS, Ear) — DR96SN",
  "summary": "The DR96SN board polls an R-32 leak sensor on the indoor coil; an A2L alarm shuts down gas heat and runs the blower at maximum, and a green LED by the sensor plug tells you whether the board can talk to the sensor.",
  "steps": [
   "Look at the green LED next to the sensor connector on the board. It stays on during startup, then blinks if the sensor is communicating or goes OFF if there's no signal. The board checks the sensor once per second.",
   "Read the code. EAL means the sensor detected a leak. EAF means communication with the sensor was lost. EAS means a sensor fault. Ear means a fault in the board's A2L relay. Each one puts the furnace in mitigation mode.",
   "In mitigation the board shuts down the gas, runs the fan at maximum CFM, and energizes the optional ventilation and A2L alarm outputs.",
   "EAL: check the indoor coil for a leak. Once the sensor stops detecting a leak, the fan runs another 5 minutes, then the furnace goes back to normal operation.",
   "EAF: check that the sensor wire isn't loose or damaged, and replace the sensor if needed. If the coil isn't R-32, set A2E to no. The function is ON from the factory. On this board you press center twice to confirm.",
   "If the coil was changed (for example from an R-410A coil to an R-32 coil), A2E has to be enabled and the sensor wire connected to the board.",
   "EAS: replace the sensor. Ear: cycle power to the furnace, and replace the board if it comes back.",
   "To prove the function, start a call for heat first, then select YES in A2u (verification). Gas heat should shut down with EAL showing, and the test ends at the 5-minute timeout."
  ],
  "safety": "With an R-32 indoor coil, keep the sensor connected and the A2L function enabled.",
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   26,
   32,
   45
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.26, p.32, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-manifold-clock-36j22",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Short on heat or overfiring — setting manifold pressure and clocking the meter on the 36J22 valve — DR96SN",
  "summary": "The DR96SN has a single-stage White-Rodgers 36J22 valve with one regulator; this manual gives the manifold range, a tolerance for the final setting, and a meter-clocking method to confirm input.",
  "steps": [
   "Check inlet pressure with every other gas appliance running. Natural gas should be 4.5 to 10.0 in. w.c. and LP 11.0 to 13.0 in. w.c.",
   "Shut off the gas and power. Back the outlet pressure test screw out one turn (no more) and connect the manometer.",
   "Turn the gas and power back on and close R and W. Natural gas should read 3.2 to 3.8 in. w.c. (nominal 3.5). LP should read 9.7 to 10.3 (nominal 10.0). Turn the regulator screw clockwise to raise pressure.",
   "The final manifold setting can't be more than 0.3 in. w.c. off spec on natural gas, or 0.5 on LP.",
   "Clock the meter with every other gas appliance off: time one revolution of the smallest dial (double it for the 1/2 cu ft dial), divide 3600 by that time, and multiply by the gas heat content. Input must never be more than the rating plate.",
   "When you're done, turn the outlet test screw back in to seal it (7 in-lb minimum), then soap-test it for leaks.",
   "At altitude, do not derate by turning the manifold pressure down. Above 7000 ft the listed high altitude kit is required."
  ],
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   28,
   38,
   39
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.28, p.38, p.39",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-condensate-freeze",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "No heat in a cold attic or crawlspace — frozen condensate drain or vent — DR96SN",
  "summary": "On a DR96SN a frozen or backed-up drain shows up as a pressure switch fault, because the switches sense through the inducer and the coil front cover and are designed to catch a blocked condensate drain.",
  "steps": [
   "Typical symptom: the inducer runs nonstop with no furnace operation (EE2). The manual lists a blocked drain system as a cause.",
   "The pressure switches read through taps on the inducer and on the coil front cover, so water backed up in the collector or trap will hold them open.",
   "Thaw and clear the trap and drain line, then re-prime the trap by filling both sides with water.",
   "Check that the drain line slopes down at least 1/4 inch per foot toward the drain, with no trap anywhere except the furnace's own.",
   "On a horizontal install with the left side down, make sure the front cover pressure switch tube was moved to the lower port of the collector box cover.",
   "Where the trap and drain line can freeze, the manual recommends electric heat tape and/or pipe insulation.",
   "Check the vent and intake terminations for ice. Pipe exposed below 35°F for long periods should be insulated with 1/2 inch closed cell foam."
  ],
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   2,
   10,
   12,
   19,
   35,
   40,
   43
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.2, p.10, p.12, p.19, p.35, p.40, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-limit-rollout-trips",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Blower runs, no burners — primary limit, auxiliary limit or rollout trip (EE3, E11) — DR96SN",
  "summary": "The DR96SN has an auto-reset primary limit, auto-reset auxiliary limits at the blower, and manual-reset rollouts at the burners; the code and where the switch sits tell you whether you have an airflow problem or a flame problem.",
  "steps": [
   "EE3: the circulator runs continuously with no furnace operation, which means the primary limit circuit is open.",
   "The primary limit sits on the partition panel. It's normally closed and resets itself, and it trips when not enough air crosses the heat exchanger.",
   "The auxiliary limits sit on or near the circulator blower and also reset themselves. They also trip on low airflow.",
   "For either limit, check filters and ductwork for blockage, check blower speed and performance, and rule out a failed blower motor.",
   "E11: open rollout switch. The rollouts are on the burner/manifold assembly and must be reset by hand. They trip when flames aren't being drawn into the heat exchanger.",
   "Before you reset a rollout, check gas pressure, burner alignment, and the burners for restriction.",
   "Watch the flames with the burner door on. They should be stable, soft and blue, and must not hit the sides of the heat exchanger tubes."
  ],
  "safety": "Do not bypass safety devices.",
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   39,
   40,
   43,
   45
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.39, p.40, p.43, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96sn-ebl-ebu-blower-lockout",
  "unit": "^DR96SN",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "Hard lockout on EbL or EbU at the start of a heat call — DR96SN",
  "summary": "The DR96SN board watches circulator current during the heat sequence; too little current after the heat on delay (EbL), or more current than expected during inducer pre-purge (EbU), sends it into hard lockout.",
  "steps": [
   "Read the code, or pull the history from the Last 10 Faults menu (F10). EbL means low circulator current. EbU means circulator current where none was expected.",
   "EbL: the blower motor is drawing very little current after the heat on delay. The normal delay is 30 seconds after ignition.",
   "For EbL, check for loose motor wiring, then check motor voltage, amps and the selected speed. Replace the motor if it isn't running correctly.",
   "EbU: the blower motor is drawing more current than expected during inducer pre-purge.",
   "For EbU, check that the wiring to and from the motor is tight, and that the line-voltage wires to the control and to the blower motor aren't swapped at the control.",
   "After the repair, run a full heat call and confirm the blower starts on its delay with no new code."
  ],
  "manual": "daikin-dr96sn-furnace-install",
  "pages": [
   36,
   42,
   45,
   52
  ],
  "source": "Installation Instructions for DR92SN, DR96SN, & DD96SN Single-Stage Gas Furnace (IOD-2037B), p.36, p.42, p.45, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-defrost-interval-termination",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil loads up with ice between defrosts, or defrost won't end — Daikin FIT R-410A (DZ6VS)",
  "summary": "The FIT board starts defrost on a selectable maximum interval and ends it on the coil thermistors, so check the interval setting and the Tm/Tb sensors on the monitor screens before chasing refrigerant problems.",
  "steps": [
   "Find the two defrost sensors: Tm (outdoor coil) is clamped to a return bend entering the outdoor coil; Tb (defrost) is on the bottom flowrator leg at the coil outlet. Make sure both are tight on the pipe.",
   "Know the logic: in heat the board reads Tm and Tb every 5 seconds, starts a timed defrost at the selected interval, and ends it when the coil is warm enough (approximately 54°F) and Tb meets its criteria. The timer then resets.",
   "Check the interval: outdoor board Screen 4 (Setting mode 2), setting 1 Maximum Defrost Interval — 0 = 30 min, 1 = 60, 2 = 90, 3 = 120 (also selectable at the thermostat). If the coil is loading up between defrosts, shorten it.",
   "Watch it live on Screen 2 (Monitoring): setting 2 is the operation code (4 = heating operation, 5 = defrost operation); setting 11 is Tm and setting 12 is Tb, both in °F.",
   "Force a defrost to prove it out: Screen 4 setting 7 Force Defrost Cycle (0 = ON), or 'force defrost' from the thermostat. Confirm the code goes to 5 and Tm climbs toward about 54°F before it terminates.",
   "If Tm or Tb reads wrong against a clamp-on probe, unplug and ohm it: the table lists about 65.8 kΩ (3.33 VDC) at 32°F and about 51.1 kΩ at 41°F. E27 = defrost thermistor out of range; E28 = coil thermistor out of range."
  ],
  "manual": "daikin-fit-r410a-system-service",
  "pages": [
   7,
   42,
   44,
   46,
   72
  ],
  "source": "FIT system (R-410A) FIT System Service Instructions (SiUS612209EB, 2023), p.7, p.42, p.44, p.46, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-defrost-heat-cold-blow",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Cold air from the registers during defrost, or the blower stops in defrost — Daikin FIT",
  "summary": "Whether the indoor blower runs and backup heat comes on during defrost is set by the outdoor DEFROST HEAT setting, and setting it wrong for the indoor unit causes an Eb code.",
  "steps": [
   "Confirm it is defrost: the EEV indoor board 2-digit display shows dF (DEFROST MODE), and the outdoor Screen 2 operation code shows 5 (Defrost Operation).",
   "Know the design: during defrost the indoor fan runs at 0 CFM if defrost heating demand is 0%; otherwise it runs at heater CFM. With no defrost heat the blower stops; with defrost heat on, the blower runs with the second heat source.",
   "Check outdoor Screen 4 setting 22 DEFROST HEAT (HP only): 0 = Always ON, 1 to 8 = 30°F to 65°F in 5°F steps, 9 = OFF.",
   "If a heat kit or furnace is installed and the customer complains of cold air during defrost, set DEFROST HEAT to Always ON or to an outdoor temperature.",
   "On a 115 V air handler this function isn't supported; set it to OFF.",
   "If the indoor board shows Eb with no heater kit, check the outdoor DEFROST HEAT setting and the thermostat 'Backup Defrost Heat' setting. Either one set to anything other than OFF calls for heater operation the indoor unit can't deliver."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   11,
   25,
   29,
   41,
   43
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.11, p.25, p.29, p.41, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-e44-heat-ambient-limit",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Heat pump quits in deep cold (or on a warm day) with E44 — Daikin FIT R-32",
  "summary": "E44 means the outdoor air thermistor reads outside the heating window, so prove whether it is truly that cold or warm before you replace anything.",
  "steps": [
   "E44 = outdoor temperature outside of range, detected by the outdoor air thermistor (Ta).",
   "Heating mode limits: the unit stops above 81°F (27°C) or below -26°F (-32°C) outdoor air. Cooling limits are different (above 131°F or below -6°F).",
   "Measure the real outdoor temperature and compare it with the Ta reading in the D-checker data.",
   "If it really is outside the heating range, nothing is broken. The system cannot run in that condition.",
   "If Ta is clearly wrong, look for discharge air recirculating back to the sensor, the thermistor touching the outdoor coil, or sun on the sensor. Fix the cause.",
   "Ohm Ta against the table: about 65.8 kΩ at 32°F and about 148 kΩ at 5°F. Replace the thermistor if it's off. If the thermistor is good and the reading is still wrong, replace the outdoor PCB."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   55,
   71
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.55, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-e41-e57-cold-liquid-line-heat",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "E41 or E57 in heat with a liquid line colder than outdoor air — Daikin FIT R-32",
  "summary": "In heat, the FIT board flags refrigerant shortage (E41) and liquid line sweat (E57) from the outdoor liquid thermistor running below outdoor air, so check charge, the indoor EEV, the sensors and exposed liquid line insulation in that order.",
  "steps": [
   "E41 in heating is decided by high discharge superheat or a low liquid pipe temperature. It uses the OD discharge, OD liquid and OD air thermistors plus the indoor pressure sensor.",
   "E57 (refrigerant cooling sweat error) is heating only, on HP 3.5 to 5.0 ton and Enhanced HP 3.0 to 4.0 ton. It sets when the liquid pipe is below outdoor temp minus 3.6°F for 420 seconds straight, or below outdoor temp minus 9°F for 100 seconds.",
   "Check the charge per the installation manual first, and leak check if it's short.",
   "For E41, check the compressor wiring for an open circuit or a wrong terminal. If discharge temp minus condensing temp is over 135°F, look for a clogged refrigerant circuit.",
   "Compare your own outdoor air, discharge temperature, high pressure and liquid tube readings (taken beside the OD liquid thermistor) with the D-checker data. Replace any sensor that's clearly off.",
   "On 3.5 to 5.0 ton and 3.0 to 4.0 ton Enhanced units: if outdoor air minus 4°F is still above the liquid pipe temp, insulate the liquid tubing that's exposed outdoors.",
   "For E57, check that the indoor EEV coil is plugged into the PCB. Read 40 to 50 Ω between each color pin and the gray COM pin. Then check the outdoor liquid thermistor connection and its characteristic, and replace the PCB last."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   19,
   54,
   56
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.19, p.54, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-heat-eev-e21",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Low discharge superheat or E21 in heat — checking the EEVs — Daikin FIT R-32",
  "summary": "In heat, the FIT indoor EEV sits wide open and the outdoor EEV does the metering, so an E21 low-superheat fault in heat points at charge, outdoor EEV coil seating and the sensors.",
  "steps": [
   "Know the heat-mode valve positions: the indoor EEV is fully open (480 pulses). The outdoor EEV meters to a target superheat of 4°C (7°F), where SH = suction temp minus outdoor coil middle temp.",
   "E21 (EEV control error) sets when discharge pipe superheat drops below 9°F (5°C) and the EEV pulse is at minimum.",
   "Check the charge first. An overcharge is a listed cause.",
   "Confirm both EEV coils are plugged into the PCB and seated on the valve bodies. The protrusion on the coil has to click into the dimple on the EEV body.",
   "Unplug each EEV cable and read 40 to 50 Ω from each color pin to the gray COM pin. Replace the coil if it's out of range.",
   "Check the thermistor connections and characteristics, then the pressure sensor. Replace the PCB only after all of those pass."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   7,
   19,
   50
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.7, p.19, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-base-pan-ice-snow",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Ice building in the base pan, or the unit is buried in snow — Daikin FIT",
  "summary": "Defrost water freezing in the bottom frame and snow blocking the coil are install problems on the FIT outdoor unit, and the manual gives specific heights, drain rules and a drain pan heater recommendation.",
  "steps": [
   "Check the height: on a stand, the bottom frame should be more than 19 3/4 in. (500 mm) above the expected snowfall. Avoid spots where snow drifts.",
   "Where the outdoor temperature stays below 32°F (0°C) for more than 12 hours, the optional drain pan heater is highly recommended to keep defrost water from freezing in the bottom frame. The outdoor board has a connector for it.",
   "Don't use a concentrated or centralized drain pipe in cold climates; it freezes and ice builds on the bottom frame. Use only the existing drain holes.",
   "Where a drain plug is used, keep at least 4 in. of space under the bottom frame.",
   "Add a snow hood and snow visor. Remove the rear inlet grille so snow can't pack on the rear fins.",
   "For wind: face the suction side toward a wall and never into the wind, and consider a baffle plate on the discharge side. In heavy snow areas, build a canopy and a pedestal."
  ],
  "manual": "daikin-fit-r32-outdoor-install",
  "pages": [
   4,
   10,
   39
  ],
  "source": "FIT system (R-32) R-32 Outdoor Unit Installation & Service Reference, p.4, p.10, p.39",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-fit-lukewarm-heat-settings",
  "unit": "^D[HZ][679]VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Customer says the heat feels lukewarm at the registers — Daikin FIT heat settings",
  "summary": "A FIT system that's working normally can feel cool at the registers because of its heat airflow and compressor settings, and several of them can be changed at the outdoor board or the thermostat.",
  "steps": [
   "Check Powerful Heating: it raises supply air temperature at low demand by lowering indoor CFM, and may raise compressor speed. It's OFF by default and is turned on in the thermostat user menu.",
   "Check HEATING BOOST MODE (outdoor Screen 4 setting 28, HP only; 0 = OFF, 1 = ON). It lets the compressor run faster in heat regardless of outdoor temperature.",
   "Check Maximum Compressor RPS for Heating (Screen 4 setting 11, HP only). It adjusts in 0.5 RPS steps; make sure nobody has capped it.",
   "Check Heat Airflow Trim High, Int and Low (Screen 3 settings 8, 9 and 10; -15% to +15%). Trim that was raised means more CFM and cooler supply air.",
   "For cold air at the start of a call, check Heat Airflow ON Delay (Screen 3 setting 11: 5, 10 or 15 sec). Heat Airflow OFF Delay is setting 12 (30, 50, 70 or 90 sec).",
   "Setting items can differ by outdoor unit model revision. Confirm against the thermostat or that unit's own installation manual before changing anything."
  ],
  "manual": "daikin-fit-r32-outdoor-install",
  "pages": [
   32,
   55,
   56
  ],
  "source": "FIT system (R-32) R-32 Outdoor Unit Installation & Service Reference, p.32, p.55, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz20vc-defrost-check-force",
  "unit": "^D[HZ]20VC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil iced up, not sure it's defrosting — DZ20VC",
  "summary": "Use the outdoor board's 3-digit display to see whether the unit is heating or defrosting, read the coil and defrost sensor temperatures, force a defrost, and check the timed defrost interval.",
  "steps": [
   "At the outdoor board display, hold RECALL 5 seconds at Screen 0 to get Screen 1, then hold RECALL 5 seconds at Screen 1 to get Screen 2 (Monitor mode).",
   "Read item 2, Operation code: 2 = Heating Start-up, 4 = Heating Operation, 5 = Defrost Operation.",
   "Read item 9 Ta (outdoor air), item 11 Tm (outdoor coil) and item 12 Tb (defrost sensor), all in °F. A Tm or Tb reading that doesn't fit Ta and the frost you can see points at that sensor.",
   "If you have E27 (outdoor defrost sensor out of range) or E28 (outdoor coil temperature sensor out of range), check that thermistor's connection and repair or replace it before chasing defrost.",
   "To force a defrost: from Screen 2 hold RECALL and TEST together 5 seconds for Screen 4, go to setting 7 Force Defrost Cycle and set 0 (ON). On a CTK04 thermostat use EQUIP TEST > FORCE DF CYCLE.",
   "Watch item 2 change to 5 (Defrost Operation) and confirm the coil clears.",
   "Check Screen 4 setting 1, Maximum Defrost Interval: 0 = 30 min, 1 = 60 min, 2 = 90 min, 3 = 120 min. The same interval is in the thermostat's Heat Setting menu; set it to suit the local weather.",
   "Press LEARN to return the display to Screen 0 when you're done."
  ],
  "manual": "daikin-dz20vc-install",
  "pages": [
   12,
   22,
   27,
   29,
   49,
   52
  ],
  "source": "DX20VC / DZ20VC DZ20VC Heat Pump, p.12, p.22, p.27, p.29, p.49, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz20vc-compressor-lockout-cold",
  "unit": "^D[HZ]20VC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Heat pump quits in cold weather and only backup heat runs — DZ20VC",
  "summary": "Before you condemn the outdoor unit, compare the thermostat's compressor lockout setting with the line set length, and check what the unit reads as the outdoor temperature.",
  "steps": [
   "Know the limit: the DZ20VC is approved for heating down to -20°F (RH10%) with no added kit.",
   "Find the line set length. The manual's compressor lockout temperature is 15°F for a 0 to 100 ft line set and 20°F for 100 to 200 ft.",
   "Check the thermostat's compressor (heat pump) lockout. Below that outdoor temperature the compressor is turned off and heat switches to auxiliary/secondary heat. That is normal operation, not a fault.",
   "Daikin One+ thermostat: the lockout settings are in the installer setup (procedure at daikinone.com). CTK04: MENU > INSTALLER OPTIONS > enter the date code > VIEW / EDIT CURRENT SETUP > HEAT / COOL CONTROL OPTIONS > COMPRESSOR LOCKOUT / BALANCE POINT.",
   "Check the backup (auxiliary) heat lockout too. The manual recommends setting both lockouts during the first thermostat setup.",
   "Read the unit's own outdoor temperature: Screen 2, item 9 Ta (°F). If it's far from the real outdoor temperature, inspect and test the outdoor air sensor (AIR SENSOR FLT is its fault).",
   "E44 OP TEMP RANGE means the control sees the outdoor temperature outside the recommended range. The unit may keep operating normally; retry when the outdoor temperature is back in range."
  ],
  "manual": "daikin-dz20vc-install",
  "pages": [
   2,
   10,
   27,
   41,
   52,
   53
  ],
  "source": "DX20VC / DZ20VC DZ20VC Heat Pump, p.2, p.10, p.27, p.41, p.52, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz20vc-weak-heat-analysis",
  "unit": "^D[HZ]20VC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Weak heat, house not keeping up — DZ20VC",
  "summary": "Compare what the system is asked for with what it delivers on the outdoor display, then check the readings against the limits in the manual's heating analysis chart.",
  "steps": [
   "The heating analysis chart assumes 17-62°F outdoor and 65-85°F indoor. Outside that range, readings won't line up with the chart.",
   "On outdoor display Screen 2, compare item 4 (% demand) with item 5 (act % demand). At steady state they should match.",
   "Item 3, Compressor Reduction Mode: 1 (ON) means the compressor is running slower than requested.",
   "Compare item 6 Requested ID CFM with item 7 Reported ID CFM (both multiplied by 10). Low ID CFM and a dirty indoor coil are both possible causes on the chart. Check the filter, duct and blower, and the Heat Airflow Trim settings (Screen 3 settings 8-10, -15% to +15%).",
   "Read item 10 Td (discharge temperature) and item 14 pressure sensor (PSI). The heating chart flags discharge temp over 200F or under 105F, discharge superheat over 70F or under 20F, high pressure over 490 psi or under 270 psi, and low pressure under 40 psi.",
   "Measure liquid subcooling at the liquid stop valve. The chart flags over 12F or under 4F.",
   "For any reading that's out of range, go through the causes the heating analysis chart marks for that symptom (stop valves not fully open, line set restriction, sensors, check valve leakage, dirty coils, recirculation, charge, EEV/TXV).",
   "Check that Screen 4 setting 11, Maximum Compressor RPS for Heating, hasn't been turned down."
  ],
  "manual": "daikin-dz20vc-install",
  "pages": [
   17,
   27,
   28,
   29,
   45
  ],
  "source": "DX20VC / DZ20VC DZ20VC Heat Pump, p.17, p.27, p.28, p.29, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz20vc-pressure-trips-heat",
  "unit": "^D[HZ]20VC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Tripping on high or low pressure in heat (E13 / E15 / E24 / E41) — DZ20VC",
  "summary": "Use the fault history and the manual's cause lists to work a high or low pressure trip in heating mode; don't adjust the charge from subcooling in cold weather.",
  "steps": [
   "Pull the fault history on outdoor display Screen 1 (the six most recent faults). E13 = frequent high pressure faults (critical) and 14 = the minor version. E15 = frequent low pressure faults. E24 = high pressure switch open. E41 = low refrigerant.",
   "The thermostat stores a repeated fault a maximum of three times, so a short history can still mean a trip that keeps coming back.",
   "E13: check that both stop valves are fully open, check for overcharge, check the outdoor fan, and check the EEV or TXV and the indoor EEV coil. In heat the indoor coil is the condenser, so also compare Requested and Reported ID CFM (Screen 2 items 6 and 7).",
   "E24: check the resistance across the HPS to verify it, and replace the switch if it fails.",
   "E15 / E41: check that the stop valves are fully open, then look for line restrictions, low charge or a leak, the low pressure sensor connection, the indoor fan motor, the indoor EEV or TXV, and the EEV coil.",
   "Compare Screen 2 item 14 (pressure sensor, PSI) with your gauges. The heating chart flags high pressure over 490 psi and low pressure under 40 psi.",
   "Cold weather: below 65°F outdoor the charging table says weigh in the charge. Subcooling targets apply only from 65°F to 105°F.",
   "If Charge Mode won't start (E49), indoor heat is on. Turn the heater off at the thermostat first."
  ],
  "manual": "daikin-dz20vc-install",
  "pages": [
   9,
   17,
   23,
   27,
   45,
   51,
   52,
   53
  ],
  "source": "DX20VC / DZ20VC DZ20VC Heat Pump, p.9, p.17, p.23, p.27, p.45, p.51, p.52, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz20vc-emergency-heat-no-comms",
  "unit": "^D[HZ]20VC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "No heat, communication is down — emergency heat on the DV**PEC air handler — DZ20VC",
  "summary": "When a broken communication wire or a dead thermostat can't be fixed right away, the matched DV**PEC indoor board can run the electric strips on its own using DIP switches; the heat pump stays off.",
  "steps": [
   "Use emergency mode only for a communication wiring or thermostat failure that can't be fixed right away. It's acceptable when the outdoor unit shows E51, Eb0, Eb9 or Ed2, or the indoor unit shows E77.",
   "Cycling power may clear the codes for a while but doesn't fix the cause. Keep looking for the wiring or thermostat problem.",
   "On the indoor control, confirm DS-3 switches S-9 to S-12 are set for the installed heat kit size. An Ed code at startup in emergency mode means those switches don't match the Electric Heating Airflow Table.",
   "Set DS-6: S-21 ON and S-22 ON = Low Heat Level. S-21 OFF and S-22 ON = High Heat Level.",
   "The blower and strips cycle on and off at fixed intervals with no room setpoint. Two-stage kits run on stage 2. The outdoor unit must stop; it doesn't heat in this mode.",
   "The indoor 7-segment display shows EE. Operating status won't show on the thermostat or the outdoor display.",
   "Emergency heating isn't available with TXV-type indoor units. If the indoor unit and thermostat still communicate, use the thermostat for heat calls.",
   "After the repair, set S-21 and S-22 back to OFF so the system returns to normal mode."
  ],
  "safety": "Disconnect all power before servicing the air handler; multiple power sources may be present. Emergency mode is a temporary fix with no setpoint control.",
  "manual": "daikin-dx20vc-dz20vc-service",
  "pages": [
   54,
   55,
   58
  ],
  "source": "DX20VC / DZ20VC DX20VC/DZ20VC Inverter Condensing Units, p.54, p.55, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz17vsa-defrost-heat-settings",
  "unit": "^D[HZ]17VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Cold air during defrost, or defrost not clearing the coil — DZ17VSA",
  "summary": "The DZ17VSA has its own backup defrost (DEFROST HEAT) setting that brings on the furnace or strips during defrost; check it, then confirm defrost with the display and the coil sensors.",
  "steps": [
   "DEFROST HEAT (backup defrost) turns the 2nd heat source (electric heater or gas furnace) on during defrost. It starts when the outdoor unit's outdoor temperature sensor reaches the set point.",
   "To reach Screen 4, hold RECALL and TEST together for 5 seconds.",
   "Check Screen 4 setting 22, DEFROST HEAT: 0 = Always ON, 1 to 8 = 30F to 65F in 5F steps, 9 = OFF. If customers feel cold air during defrost, make sure it isn't OFF or set below the outdoor temperatures you're seeing.",
   "On Screen 2, item 2 is the operation code: 4 = Heating Operation, 5 = Defrost Operation. Read item 9 Ta, item 11 Tm (outdoor coil) and item 12 Tb (defrost sensor).",
   "E27 = outdoor coil defrost temperature sensor out of range. E28 = outdoor coil temperature sensor out of range. Check the connection and repair or replace.",
   "To force a defrost, use Screen 4 setting 7, Force Defrost Cycle (0 = ON). Maximum Defrost Interval is setting 1: 30, 60, 90 or 120 minutes.",
   "If defrost still doesn't finish, go through the causes the heating analysis chart marks for 'Incomplete defrost operation'."
  ],
  "manual": "daikin-dz17vsa-dx17vss-install",
  "pages": [
   23,
   33,
   35,
   40,
   45,
   47
  ],
  "source": "DZ17VSA / DX17VSS Installation Instructions, Outdoor Unit DX17VSS/DZ17VSA, p.23, p.33, p.35, p.40, p.45, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz17vsa-reversing-valve-e59-e56",
  "unit": "^D[HZ]17VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "E59 or E56 in heat, reversing valve suspected — DZ17VSA",
  "summary": "The DZ17VSA flags reversing valve faults directly (E59) and lists the reversing valve as a cause of a suction sensor fault (E56); rule out the sensors and the charge before you replace the valve.",
  "steps": [
   "E59 means the equipment is having reversing valve faults. Listed causes: faulty reversing valve body or coil, low refrigerant charge, faulty pressure sensor, faulty control board.",
   "E56 means the outdoor suction temperature sensor is out of range. Causes: the suction thermistor (bad or not properly connected) or a faulty reversing valve.",
   "On outdoor display Screen 2, watch item 2 (operation code: 4 = Heating Operation, 5 = Defrost Operation), item 14 (pressure sensor, PSI) and item 15 Ts (suction temperature).",
   "For E56, check the suction thermistor connection first. For E59, check the pressure sensor.",
   "Check the refrigerant charge level. Low charge is a listed E59 cause.",
   "Check the reversing valve coil, then the valve body. The heating analysis chart gives separate remedies for RV coil failure and RV failure.",
   "Replace the control board only if the checks above pass."
  ],
  "manual": "daikin-dz17vsa-dx17vss-install",
  "pages": [
   33,
   36,
   37,
   45
  ],
  "source": "DZ17VSA / DX17VSS Installation Instructions, Outdoor Unit DX17VSS/DZ17VSA, p.33, p.36, p.37, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz17vsa-cold-climate-icing",
  "unit": "^D[HZ]17VS",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Ice building up under the outdoor unit, drain freezing — DZ17VSA",
  "summary": "Water from defrost refreezes in the base and snow packs the coil; the DZ17VSA manual gives specific cold-climate mounting and drain rules to fix this.",
  "steps": [
   "The unit is approved for heating down to -10°F (RH10%) with no added kit, so ice buildup is an installation problem to correct.",
   "Mount the unit on a stand so the bottom frame is more than 19 3/4 in. (500 mm) above the expected snowfall. Avoid spots where snow drifts.",
   "Water from defrost can freeze. In cold climates, don't use a concentrated (centralized) drain pipe; use only the existing drain holes. Drain treatment needs at least 4 in. of space under the bottom frame.",
   "Add the optional drain pan heater where the outdoor temperature stays below 32°F (0°C) for more than 12 hours at a time. It's also recommended in high-humidity or heavy-snow areas.",
   "Remove the rear inlet grille to keep snow from building up on the rear fins. Fit a snow hood and snow visor (field supply).",
   "Face the suction side toward a wall, never directly into the wind, and add a baffle plate on the discharge side.",
   "Tell the homeowner not to cover the unit. The outdoor fan may start on its own regardless of demand."
  ],
  "manual": "daikin-dz17vsa-dx17vss-install",
  "pages": [
   2,
   3,
   6,
   48
  ],
  "source": "DZ17VSA / DX17VSS Installation Instructions, Outdoor Unit DX17VSS/DZ17VSA, p.2, p.3, p.6, p.48",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-defrost-interval-logic",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil ices up between defrosts or defrost ends too soon — DZ16TC/DZ18TC",
  "summary": "The UC board only counts compressor run time toward a defrost while the outdoor coil sensor reads cold, so icing complaints come down to the interval setting, the OCT sensor mounting, and how the last defrost ended.",
  "steps": [
   "Know the rule: the UC board banks compressor run time only while the outdoor coil temperature (OCT) sensor reads about 31°F or colder, and starts defrost when the banked time hits the selected interval and there is a call for heat.",
   "Check the interval: 30, 60, 90 or 120 minutes, set by the dipswitches on the UC board. On a fully communicating system it can also be set from the communicating thermostat's user menu, so check both before changing anything.",
   "Heavy ice building between defrosts on a long interval: shorten the interval one step and watch a full cycle.",
   "Check the OCT sensor is clamped tight to the feeder tube going into the outdoor coil. The board banks defrost time only off this sensor, so it has to be tight on the tube.",
   "Termination: defrost ends when the coil reaches about 75°F or after 10 minutes of defrost, whichever comes first, then the interval timer starts over.",
   "If the UC display shows Max Defrost Time, that cycle hit the 10-minute cap before the coil reached about 75°F. Watch whether ice is left on the coil after the next cycle.",
   "If the UC display shows Outdoor Coil Temp Sensor Fault, ohm-check the OCT sensor before going further.",
   "To check the whole sequence without waiting out an interval, force a defrost with TEST + RECALL (separate procedure)."
  ],
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   29,
   55
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.29, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-defrost-sequence-what-runs",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor fan stops and compressor pauses during defrost, is that normal? — DZ16TC/DZ18TC ComfortNet",
  "summary": "On a communicating DZ16TC/DZ18TC system a defrost stops the outdoor fan, shifts the reversing valve, may pause the compressor briefly, runs the compressor on high stage and brings on the air handler's electric heat.",
  "steps": [
   "At defrost start the UC board turns off the outdoor fan motor and energizes the reversing valve. A stopped fan with steam off the coil is normal.",
   "The compressor may shut off for a short delay while the reversing valve shifts. This delay is set from the CTK0* thermostat and is there to cut valve-shift noise. Do not condemn the compressor for it.",
   "After the shift the compressor should run (or restart) on high stage for the defrost.",
   "Indoors, the UC sends a defrost request to the air handler. The air handler should bring on its electric heat sequencer outputs and run the ECM blower at electric heat speed.",
   "Read the air handler 7-segment display: dF means defrost on a communicating setup. On a legacy (24V) setup defrost shows as H1.",
   "Cold air indoors during defrost: check that the air handler actually energized the heat outputs. A missing defrost request points to the network or the outdoor UC board, not the heaters.",
   "When defrost ends, the system should go back to the same heat pump heating mode it was in before the defrost."
  ],
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   87,
   38
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.87, p.38",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-heat-staging-low-high-aux",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Heat pump stays on low stage or goes to strips too early — DZ16TC/DZ18TC ComfortNet",
  "summary": "In a communicating system the thermostat steps the heat pump from low stage to high stage and only then to auxiliary heat, so a unit stuck on low stage or jumping to strips points to what is blocking each step.",
  "steps": [
   "Normal order: the thermostat asks the UC board for low stage heat pump heat. The UC handles its compressor and fan delays first, then runs the compressor and outdoor fan at low stage.",
   "If low stage can't hold the setpoint, the thermostat asks for high stage. The UC should energize the high stage compressor solenoid and switch the outdoor fan to high speed, and the air handler should raise the blower to high stage heat pump speed.",
   "Only after high stage can't keep up does the thermostat ask the air handler for auxiliary heat. The air handler then runs the blower at whichever airflow demand is greatest.",
   "On UC boards with the 7-segment display (PCBHR104/105) the display shows P1 for low heat and P2 for high heat, so you can see which stage the board thinks it is in.",
   "Stuck on low stage with a b9 code (LOW ID AIRFLOW): indoor airflow is lower than demanded. Check the indoor blower motor, restrictive or undersized ductwork, and that the indoor and outdoor units are an approved match.",
   "Equipment dropping out on its own in a communicating system: each unit stops running if its operating request isn't refreshed after 5 minutes, so look at network communication before the refrigerant side."
  ],
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   86,
   85,
   55,
   56
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.86, p.85, p.55, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-balance-point-strips-only",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Cold out and only the strips are running, compressor off — DZ16TC/DZ18TC ComfortNet",
  "summary": "A communicating DZ16TC/DZ18TC system shuts off heat pump heating below the balance point set in the thermostat, and a bad outdoor air or coil sensor can also stop heat pump heating.",
  "steps": [
   "Check the outdoor temperature against the balance point. Below the balance point the heat pump is disabled by design and only electric heat is available.",
   "Find the balance point in the CTK0* thermostat's advanced installer's configuration menu. A balance point set too high keeps the compressor off on mild cold days.",
   "Opposite complaint (strips never come on): the same thermostat can lock out the air handler's electric heat when the outdoor temperature is above its set point.",
   "The outdoor temperature used for this decision comes from the heat pump's outdoor air temperature (OAT) sensor, and the manual warns that sensor faults affect heating. Code A2 (AIR FLT) is an OAT sensor fault: shorted, open, disconnected or out of range. The thermostat may show '---' where the outdoor temperature should be.",
   "Code A3 (COIL FLT) is an outdoor coil sensor fault, listed with the symptom that the heat pump fails to operate in heating mode. Check the sensor connection, then ohm-check and replace an open or shorted sensor.",
   "Legacy (24V, non-communicating) installs have no thermostat balance point. The manual lists the OT18-60A outdoor/lockout thermostat accessory for legacy mode only (the function is built in when communicating), and calls for it on heat pump jobs where it drops below 0°F at 50% or higher relative humidity."
  ],
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   85,
   86,
   56,
   18
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.85, p.86, p.56, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-low-pressure-trip-heat",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Shuts off on low pressure in heat, then locks out — DZ16TC/DZ18TC",
  "summary": "The heat pump low pressure control opens at about 21 PSIG and recloses at about 50 PSIG, and three trips on one thermostat call lock the UC board out until 24VAC is cycled.",
  "steps": [
   "Read the code: with PCBHR101-103 boards a ComfortNet thermostat shows LPS OPEN (message code 01) for a single trip and LPS LOCKOUT (01) after 3 trips on the same thermostat call. On PCBHR104/105 boards, 01 is Low Pressure CO Trip and L1 is LPCO Lockout (3 Trips).",
   "Put gauges on and run heat. The low pressure control reads suction pressure. On heat pumps it opens at about 21 PSIG and closes again by itself at about 50 PSIG.",
   "Work the manual's causes: low refrigerant charge or a restriction in the liquid line. Fix the cause before resetting.",
   "Check the switch itself: power off, then check continuity with a VOM. If it doesn't open and close near those pressures, replace it.",
   "With power on, check switch voltage. The high and low pressure controls are wired in series, so with both closed you should read the same 6.5 VDC or 8.0 VAC at both switches.",
   "The discharge thermostat is also wired in series with the high pressure control. If it is open you will see input voltage at the HPC but no voltage on the HPC or LPC outputs, so don't blame the low pressure switch for that.",
   "A lockout must be cleared by cycling 24VAC to the UC control."
  ],
  "safety": "Line voltage is present in the unit during the voltage checks. Turn power off before replacing a switch.",
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   70,
   50,
   55
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.70, p.50, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dz16-18tc-heat-mode-charging",
  "unit": "^DZ1[68]TC",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Need to check or set charge in the middle of winter — DZ16TC/DZ18TC",
  "summary": "The manual's heat-mode method is charging by weight, with a superheat check on TXV outdoor units and final adjustments made later in cooling.",
  "steps": [
   "In heat mode, set the charge by weight, adding the extra charge for line size, line length and other system components.",
   "On outdoor units with TXVs, check superheat 4-6 in. from the compressor. The manual targets 2-5°F.",
   "Let pressures settle before reading. The manual's superheat checks call for at least 10 minutes of run time.",
   "Don't fine-tune the charge in heat. Make the final charge adjustments in the cooling cycle when the weather allows."
  ],
  "manual": "daikin-dx16tc-dz18tc-service",
  "pages": [
   91
  ],
  "source": "DX16TC / DX18TC / DZ16TC / DZ18TC ComfortNet Condensing Units & Heat Pumps, p.91",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dh5s-defrost-timing-sensor",
  "unit": "^DH[345]S[QE]",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil stays iced up between defrosts — DH4S/DH5S defrost timer and sensor",
  "summary": "The time/temperature defrost board only counts time while its coil sensor is closed and there is a heat call, so a loose or misplaced sensor or the wrong timer jumper lets ice build or cuts defrost short.",
  "steps": [
   "Find the defrost sensor. It should be clamped to a return bend on 3/8 in. coils, or to a feeder tube entering the coil on 5 mm coils. If it has slipped, clamp it back on tight.",
   "Check the timer jumper on the defrost board. It sets the defrost interval: 30, 60 or 90 minutes.",
   "Know when the clock runs: time only builds while the sensor is closed (about 31°F) AND the thermostat is calling for heat. At the end of the period the board starts defrost only if the sensor is still closed.",
   "Defrost should end when the sensor opens, which also resets the timer. The manual's defrost description says about 75°F, but the sensor test spec is by part: 3 to 5 ton units open at 75°F ± 6°F; 2 and 2.5 ton units and 5 mm-coil units open at 60°F ± 5°F.",
   "If defrost keeps ending on time instead of on temperature, the override is cutting it off: 10 minutes on the original board, 12 minutes on the upgraded board. Look for a sensor that reads warm (loose or in the wrong spot) or a coil that cannot clear in that time.",
   "If the sensor checks out, bench it with the Testing Defrost Thermostat procedure (close at 34°F ± 5°F on 2-2.5 ton, 31°F ± 3°F on 3-5 ton, 30°F ± 5°F on 5 mm coils), then prove the board with the Testing Defrost Control procedure (jumper DFT to R and the test pins; defrost within 21 seconds; remove the jumpers and put the timer jumper back when done)."
  ],
  "manual": "daikin-r32-singlestage-service",
  "pages": [
   12,
   31,
   32
  ],
  "source": "R-32 single-stage AC (DC4SEA / ALXS4 family) Service and Troubleshooting, p.12, p.31, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dh5s-low-pressure-heat",
  "unit": "^DH[345]S[QE]",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Compressor short-cycles on a cold day — DH4S/DH5S low pressure control in heat",
  "summary": "The suction-line low pressure control opens at 21 PSIG and resets on its own at about 50 PSIG, a starved outdoor coil in heat can pull suction down to that point, and on CoreSense units the module logs it as pressure switch cycling.",
  "steps": [
   "Put gauges on. The low pressure control senses suction line pressure, opens on a drop and resets itself when pressure rises.",
   "Spec: it should open at 21 PSIG and close again at about 50 PSIG. If it doesn't, replace the switch.",
   "To prove it in heating, use the manual's Test 2 (Testing Low Pressure Control in Heating Mode): disconnect power to the outdoor unit, remove the control panel cover, disconnect the black wire from the condenser fan motor and tape it off, then restore power, run the unit on a heat call and watch suction. The printed step 5 still says to set the thermostat to cool; that is carried over from the cooling Test 1.",
   "Don't run it long at very low suction. Below 20 psig for more than 5 seconds overheats the scrolls and damages them for good.",
   "On CoreSense units (DC4SEA, DC5SEA, DH4SEA, DH5SEA), yellow flash 3 means pressure switch cycling: the compressor runs 12 sec to 15 min, then trips for 35 sec to 7 min. Repeats lock it out on red flash 3. The quick-reference table says after 4 in a row or 10 total; the diagnostics table says after 10 in a row.",
   "If the switch is good, find out why suction is low. A restricted liquid line looks like an undercharge (low suction and head pressure), but subcooling stays normal to high, and frost may form at the restriction."
  ],
  "manual": "daikin-r32-singlestage-service",
  "pages": [
   18,
   21,
   22,
   35,
   41
  ],
  "source": "R-32 single-stage AC (DC4SEA / ALXS4 family) Service and Troubleshooting, p.18, p.21, p.22, p.35, p.41",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dh5s-heat-mode-charging",
  "unit": "^DH[345]S[QE]",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Charge looks off but it's below 60°F outside — DH4S/DH5S charging in heat mode",
  "summary": "Subcooling and superheat charging on these units is a cooling-mode job that needs 60°F or warmer outside; in heat mode the manual's method is charging by weight, plus one outdoor-TXV superheat check.",
  "steps": [
   "Don't trim charge off the gauges in cold weather. The subcooling and superheat methods need an outdoor temperature of 60°F or higher, with the unit running in cooling.",
   "In heat mode, charge by weight: nameplate charge plus adjustments for line size, line length and other system components.",
   "Factory charge covers the matched coil and 15 ft of line set. Beyond 15 ft, the per-foot table gives: 1/4 in. liquid with 5/8 suction, 0.23 oz; 3/8 in. liquid, 0.53 (5/8 suction), 0.55 (3/4), 0.58 (7/8) or 0.64 (1-1/8). The same page also gives an older flat figure of .6 oz per foot of liquid line, so use the table.",
   "On outdoor units with a TXV, superheat in heat should be 8°F +/- 1°F, measured 4-6 in. from the compressor.",
   "Fill in the charge label on the lower access panel: FACTORY CHARGE, FIELD CHARGE and TOTAL CHARGE.",
   "Make the final charge adjustment in the cooling cycle once the weather allows.",
   "Never go over the maximum charge printed on the evaporator serial plate."
  ],
  "manual": "daikin-r32-singlestage-service",
  "pages": [
   36,
   37,
   40
  ],
  "source": "R-32 single-stage AC (DC4SEA / ALXS4 family) Service and Troubleshooting, p.36, p.37, p.40",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dh5s-cold-air-in-heat",
  "unit": "^DH[345]S[QE]",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Blowing cold air on a heat call — DH4S/DH5S reversing valve should be de-energized in heat",
  "summary": "These heat pumps power the 24 V reversing valve coil from O for cooling only, so a unit cooling on a heat call either has O powered when it shouldn't, or has a valve that won't return.",
  "steps": [
   "Know the logic: the 24 V reversing valve coil is powered through the thermostat's O terminal in cooling. In heating the valve is de-energized, and the heat call is R to Y and G.",
   "If the valve is in the cooling position during a heat call, check for 24 V at the reversing valve coil.",
   "Voltage present: check for 24 V on O from the thermostat. If the thermostat is actually in cool mode, switch it to heat. Otherwise check the thermostat and its wires.",
   "No voltage at the valve and it's still in the cooling position: check the valve is piped correctly. If it isn't, install it correctly. If it is, replace the reversing valve.",
   "Confirm with temperatures. The center tube is always the suction line and should be cold. True suction and the suction line after the valve should be no more than 4 degrees apart; a bigger split means the valve leaks internally."
  ],
  "manual": "daikin-r32-singlestage-service",
  "pages": [
   12,
   13,
   30,
   51,
   52
  ],
  "source": "R-32 single-stage AC (DC4SEA / ALXS4 family) Service and Troubleshooting, p.12, p.13, p.30, p.51, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dh5s-aux-heat-strips",
  "unit": "^DH[345]S[QE]",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Aux or emergency heat not putting out — DH4S/DH5S system electric heat strips, limits and fuse links",
  "summary": "On the matched R-32 air handler, each heater element has its own series limit and a one-time fuse link; when one opens, prove the airflow with a temperature-rise CFM check before you replace parts.",
  "steps": [
   "Follow the auxiliary heat chart: 240 V at the breakers or contactors, then 24 V on W at the contactor. No 24 V on W: check the thermostat and wiring.",
   "Contactor closed but no heat: check each element's limit. It is wired in series with the element and opens at about 150°F. Ohm across the normally closed contacts; no reading means it's open. Replace it, and never wire around it.",
   "Check the one-time fuse link. It is also in series and opens at about 333°F. Don't bypass it; find out why it overheated.",
   "Ohm each element. No continuity means an open element. Also look for broken wire or broken insulators.",
   "Check airflow: run the strips and indoor blower WITHOUT the compressor, and measure the temperature rise as close to the blower inlet and outlet as you can.",
   "CFM = kW x 3413 / (1.08 x rise). The rise table is for 240 V; correct for actual voltage: 230 V x .92, 220 V x .84, 208 V x .75.",
   "Never install more heaters than the spec sheet allows for the model."
  ],
  "safety": "Disconnect all power before servicing; multiple power sources may be present.",
  "manual": "daikin-r32-singlestage-service",
  "pages": [
   32,
   33,
   47
  ],
  "source": "R-32 single-stage AC (DC4SEA / ALXS4 family) Service and Troubleshooting, p.32, p.33, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmst-strips-limit-mbs",
  "unit": "^DMST",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strips cycling on limit or running too hot — speed tap below the M.B.S. — DMST",
  "summary": "On a DMST (same unit as the Goodman AMST) the blower speed tap has to meet or beat the Minimum Blower Setting (M.B.S.) on the serial plate for that air handler and heat kit, and a tap left too low starves the strips of air.",
  "steps": [
   "Read the serial plate. Find the heat kit box marked with an X and the Minimum Blower Setting (M.B.S.) for that air handler and heat kit. No X means nobody recorded a kit.",
   "Check the IO's Minimum CFM table (Table 10). Those numbers are the absolute minimum for the air handler and kit, not the recommended airflow. Example: the 24 B-cabinet (AMST24BU13 in the table) needs 715 CFM with 3 to 8 kW and 850 CFM with 10 kW.",
   "Check the tap on the PCB. Per the wiring diagram label, the tap must equal or exceed the M.B.S. Factory default program tap is 8. Taps 1-9 are set with the PCB DIP switches per Table 14, which is also printed on the 1.5-4 ton wiring diagram.",
   "On the 5-ton cabinet (AMST60DU size) the speed tap can't be adjusted. Airflow is set by how the motor leads are wired (Figures 20A, 20B, 20C).",
   "Measure total external static. It must not exceed the value on the rating plate, or the tap will not deliver the table CFM.",
   "Raise the tap to at least the M.B.S., then run full heat and confirm the temperature rise (see the temp-rise check for this unit)."
  ],
  "safety": "Disconnect all power before changing taps or DIP switches; multiple power sources may be present.",
  "manual": "goodman-amst-r32-air-handler-install",
  "pages": [
   16,
   18,
   20,
   28
  ],
  "source": "AMST**U1300** / DMST (R-32 multi-position air handler) AMST***U1300** R-32 Air Handlers Installation and Operating Instructions (IO-4011H, April 2026), p.16, p.18, p.20, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmst-temp-rise-airflow-check",
  "unit": "^DMST",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strip heat feels weak or too hot — check airflow with a temperature rise — DMST",
  "summary": "The DMST/AMST IO gives a temperature-rise formula with voltage correction factors, so you can back-calculate real airflow on electric heat and tell a low-airflow problem from a strip that isn't energized.",
  "steps": [
   "Set the thermostat to maximum heat so the strips run, and let the system reach steady state.",
   "Put one thermometer in the return and one in the supply. Temperature rise = supply minus return.",
   "Measure line voltage at the unit. The 208/230 V nameplate range is 197 to 253 V.",
   "Use the IO formula: TR = (kW x 3412) x VC / (1.08 x CFM). VC is .96 at 230 V, .92 at 220 V and .87 at 208 V. Rearranged: CFM = (kW x 3412 x VC) / (1.08 x TR).",
   "Sanity check from the 230 V table (Table 7): 10 kW at 1000 CFM is about a 30°F rise.",
   "A rise well above the table for the kW and CFM you expect means low airflow, so go to the speed tap/M.B.S., filter and static checks. A rise well below it means part of the heat isn't on, so read amps on Heat Strip 1 and Heat Strip 2 (start-up checklist items)."
  ],
  "safety": "Line voltage is present in the heater compartment while taking amp readings.",
  "manual": "goodman-amst-r32-air-handler-install",
  "pages": [
   15,
   16,
   19,
   31
  ],
  "source": "AMST**U1300** / DMST (R-32 multi-position air handler) AMST***U1300** R-32 Air Handlers Installation and Operating Instructions (IO-4011H, April 2026), p.15, p.16, p.19, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmst-strip-staging-w1-w2",
  "unit": "^DMST",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "All strips come on together, or the second bank never does — W1/W2 jumper and outdoor thermostats — DMST",
  "summary": "On the DMST, kits of 15 kW and above are wired for two heat stages, and the IO's wiring notes say to jumper W1 and W2 together when OT-2 isn't used; whether that jumper or the outdoor thermostats are in place decides how the strips stage.",
  "steps": [
   "Identify the kit size from the serial plate. The IO has separate low-voltage diagrams for kits of 10 kW and below and for 15 kW and above, for both cooling-only and heat pump systems.",
   "On 15 kW and above, W1 and W2 are separate stages. Second-stage heat comes from a multi-stage heating thermostat or an added outdoor thermostat.",
   "If no second outdoor thermostat (OT-2) is used, W1 and W2 are jumpered together per the diagram. Both stages then come on with the W call, and that is by design.",
   "If outdoor thermostats are used, OT-1 must be the first to close and the last to open. Remove the wire noted in the diagram when an outdoor thermostat is installed.",
   "On heat pump diagrams, check the thermostat's E terminal wiring (it may not apply to some thermostats) and the optional emergency heat relay (EHR) if one is installed.",
   "Prove each stage by reading amps on each strip circuit while you energize the first stage alone and then the second stage."
  ],
  "safety": "Disconnect all power before re-landing low-voltage jumpers; multiple power sources may be present.",
  "manual": "goodman-amst-r32-air-handler-install",
  "pages": [
   19,
   24,
   25
  ],
  "source": "AMST**U1300** / DMST (R-32 multi-position air handler) AMST***U1300** R-32 Air Handlers Installation and Operating Instructions (IO-4011H, April 2026), p.19, p.24, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmst-hp-heat-weak-airflow",
  "unit": "^DMST",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Weak airflow in heat pump heat with a single-stage heat pump — Y not on Y2 — DMST",
  "summary": "With a single-speed heat pump on a DMST, thermostat Y must land on Y2 at the air handler, and the heat pump tap must give the AHRI airflow or at least 350 CFM per ton; on the 5-ton cabinet, airflow is set by how the motor leads are wired.",
  "steps": [
   "Look at the low-voltage terminal board. With a single-speed cooling or heat pump unit, thermostat Y must connect to Y2 on the air handler, not Y1.",
   "Y1 and Y2 drive different motor inputs (see the motor lead table, Table 15, and the wiring diagram). Y on the wrong terminal gives the wrong airflow in heat pump heat.",
   "Select the cooling/heat pump tap from the AHRI rating. If you don't have one, pick a tap that gives at least 350 CFM per outdoor ton.",
   "When reading the airflow table, apply the CFM factors: 0.98 for horizontal left, 0.96 for horizontal right and downflow.",
   "5-ton cabinet (AMST60DU size): no DIP tap adjustment. Factory wiring is for a 2-stage outdoor unit (Figure 20A). For a 1-stage heat pump, rewire the motor leads per Figure 20B or 20C to get the airflow you need.",
   "The blower is programmed with a 60-second off delay, so air moving for a minute after the call ends is normal."
  ],
  "manual": "goodman-amst-r32-air-handler-install",
  "pages": [
   18,
   20,
   21
  ],
  "source": "AMST**U1300** / DMST (R-32 multi-position air handler) AMST***U1300** R-32 Air Handlers Installation and Operating Instructions (IO-4011H, April 2026), p.18, p.20, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmst-new-heat-kit-no-heat",
  "unit": "^DMST",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Heat kit just installed and no strip heat — HKTS kit, EHK plug, transformer — DMST",
  "summary": "The DMST only accepts HKTS-series kits; the install takes the transformer off and calls for discarding the factory EHK PLF connector, so an incomplete kit install shows up as no strip heat.",
  "steps": [
   "Confirm the kit is HKTS series. It is the only heat kit permitted in this air handler. Check compatibility on the serial/rating plate or the HKTS spec sheet.",
   "The transformer is detached during kit installation. Confirm it was remounted and wired, and check for 24 V at R-C.",
   "On a 208 V supply, both red transformer wires must be moved from the 240V tap to the 208V tap (wiring diagram note).",
   "The wiring diagram says to discard connector EHK PLF when the kit goes in. Confirm the kit harness is connected to the air handler per the unit diagram.",
   "Check the power side. Non-breaker kits land supply power on the terminal block that comes with the HKTS kit. Two-circuit kits need separate knockouts unless the SPW-01 single point wiring kit is used.",
   "Confirm the speed tap meets the M.B.S. for this kit, and mark the X on the serial plate.",
   "If the A2L board is in leak mitigation, it switches off the electric heater on purpose, so read the A2L PCB LED before blaming the kit."
  ],
  "safety": "Disconnect all power before servicing; multiple power sources may be present, especially with two-circuit heat kits.",
  "manual": "goodman-amst-r32-air-handler-install",
  "pages": [
   15,
   19,
   21,
   26,
   28
  ],
  "source": "AMST**U1300** / DMST (R-32 multi-position air handler) AMST***U1300** R-32 Air Handlers Installation and Operating Instructions (IO-4011H, April 2026), p.15, p.19, p.21, p.26, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmvt-heat-kit-not-selected",
  "unit": "^DMVT",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Heat kit installed but strips never come on — EHt menu still at 0 — DMVT",
  "summary": "The DMVT (same unit as the AMVT) control has to be told which heater kit is installed; the Electric Heating Wattage menu ships at 0 (no heat kit), and the app has a strip test for each stage.",
  "steps": [
   "On the board's push buttons or in the CoolCloud HVAC app, open the Electric Heating Wattage menu (EHt). Default is 0 (No Heat Kit). Select the kit actually installed.",
   "Confirm connector EHK PLM was discarded when the kit was installed (wiring diagram note).",
   "Confirm it is an HKTS-series kit, the only kit permitted, and that the transformer detached for the install was put back.",
   "Test the strips from the app. Under the air handler menus pick the electric heat icon: any value under 50% runs low stage, any value over 50% runs high stage.",
   "Then confirm a real thermostat heat call brings the strips on at high stage.",
   "Check airflow against the minimum for the kit (Table 9). Examples: the 24 B-cabinet needs 550 CFM at 3 kW up to 875 at 15 kW. The 60 D-cabinet needs 1135 CFM at 5 kW up to 1925 at 25 kW."
  ],
  "safety": "Disconnect all power before working in the heater compartment; multiple power sources may be present.",
  "manual": "goodman-amana-amvt-install",
  "pages": [
   14,
   15,
   21,
   31,
   32
  ],
  "source": "AMVT (R-32) AMVT***P1300** Air Handlers Installation & Operating Instructions (IOG-4053B, November 2025), p.14, p.15, p.21, p.31, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmvt-strips-primary-hp-lockout",
  "unit": "^DMVT",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strips running all the time and the heat pump seems locked out — Comfort Setting logic — DMVT",
  "summary": "With a communicating heat pump, the DMVT decides when to add or stay on electric heat from a target runtime and strike counts; several long cycles in a row make the strips the temporary primary heat source.",
  "steps": [
   "Confirm a communicating heat pump is installed. The electric heat adjustments only apply in that case.",
   "Read the Comfort Setting menu (CFS). Options 1-5 set target runtimes of 10, 15, 20, 25 and 30 minutes. Option 6 unlocks the individual menus (t9t, SUP, SdP, Ott, Utt).",
   "Stage Up Percent (SUP) sets how long past the target the heat pump runs alone before strips come on. At 20% on a 20-minute target, strips come on at 24 minutes, and each time that happens it counts as a strike against the heat pump.",
   "Over Target Threshold (Ott): after that many strikes in a row, the heat pump is temporarily locked out and electric heat becomes primary. Defaults run from 2 strikes (option 1) to 10 (option 5).",
   "Stage Down Percent (SdP) and Under Target Threshold (Utt) bring the heat pump back. Example: at 15% on a 20-minute target, HP plus strips satisfying in under 17 minutes counts as a strike. After Utt such strikes in a row, the strips are dropped and the heat pump runs alone again.",
   "Check the balance point setting. The compressor will not run below it (default 0°F).",
   "After a power cycle or a mode change, the first call runs at full capacity. If the heat pump keeps missing the target, look at the heat pump itself (charge, defrost, sizing) before changing these settings."
  ],
  "manual": "goodman-amana-amvt-install",
  "pages": [
   15,
   16,
   29
  ],
  "source": "AMVT (R-32) AMVT***P1300** Air Handlers Installation & Operating Instructions (IOG-4053B, November 2025), p.15, p.16, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmvt-thermostat-single-w-dft",
  "unit": "^DMVT",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "DFT on the display during an aux heat call, or strips/heat pump acting wrong — thermostat setup — DMVT",
  "summary": "The DMVT board has no O input and takes a single W for all heat, so the thermostat setup is different from a normal heat pump; on a legacy heat pump the display reads DFT any time Y and W are on together.",
  "steps": [
   "Communicating outdoor unit: the air handler needs one Y for cooling and one W for all heat, backup strips included. Set the thermostat up as single-stage AC with single-stage electric heat.",
   "The board has no O wire input. Setting the thermostat up for heat pump or multistage control may cause incorrect operation.",
   "Non-communicating heat pump: run O directly to the O terminal on the heat pump (Figures 21/22). In the OdS menu, set 1HP for a single-stage heat pump or 2HP for a two-stage one.",
   "Two-stage electric heat kits still need only a single W. The board stages them on its own.",
   "Legacy heat pump: the display shows DFT whenever Y and W are energized together. That happens on a defrost call and also on an auxiliary heat call, and it is normal.",
   "On non-comm installs, confirm the ton menu has been set. If it hasn't, the board shows IdL and the blower won't run on a cooling call. The board itself is fine."
  ],
  "manual": "goodman-amana-amvt-install",
  "pages": [
   19,
   30,
   31
  ],
  "source": "AMVT (R-32) AMVT***P1300** Air Handlers Installation & Operating Instructions (IOG-4053B, November 2025), p.19, p.30, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmvt-hp-heat-airflow-setup",
  "unit": "^DMVT",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Low or wrong airflow in heat pump heat with a non-communicating heat pump — ton, HtF and delay menus — DMVT",
  "summary": "With a non-communicating heat pump, DMVT heat pump airflow comes from the ton menu (tonnage x 400) plus the heating trim, with its own low-stage percentage and on/off delays.",
  "steps": [
   "Set OdS to the outdoor unit type: 1HP for a single-stage heat pump, 2HP for a two-stage one.",
   "Set the ton menu. Airflow = tonnage selection x 400, so 3.0 gives 1200 CFM. Use the AHRI airflow, or at least 350 CFM per outdoor ton. External static must not exceed 0.5 in. WC.",
   "Use HtF (heating trim) to move heat pump airflow from -10% to +10% in 2% steps.",
   "Two-stage non-comm heat pump: the board stages airflow for low stage automatically. Low-stage heat pump airflow defaults to 70% of high stage.",
   "Check the delays. Heat pump heating airflow on delay defaults to 5 seconds and off delay to 60 seconds.",
   "A ton setting above the model's maximum gets capped at the maximum (e.g. 1275 CFM on the 24 B-cabinet, 2200 CFM on the 60 D-cabinet).",
   "IO example: a 2-ton outdoor unit on the 24 B-cabinet bottoms out at 1.6T with 10% trim (704 SCFM at 0.5 in. WC)."
  ],
  "manual": "goodman-amana-amvt-install",
  "pages": [
   20,
   29,
   31
  ],
  "source": "AMVT (R-32) AMVT***P1300** Air Handlers Installation & Operating Instructions (IOG-4053B, November 2025), p.20, p.29, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmvt-strip-airflow-defrost-heat",
  "unit": "^DMVT",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Cool air during defrost or strips running on low airflow — electric heat menus and temp rise — DMVT",
  "summary": "The DMVT has separate menus for electric heat on/off delay, airflow trim, low-stage percentage, combined HP-plus-strip trim and which strip stage runs in defrost; the display tells you which stage the board is calling.",
  "steps": [
   "Check the electric heat during defrost menu: 1 = low stage, 2 (default) = high stage. A unit set to 1 puts out less heat during defrost.",
   "Watch the status display during the complaint. It has separate states for Electric Heat low and high stage and for Defrost with low or high stage electric heat.",
   "Check the Electric Heat On Delay and Off Delay (seconds) and the Electric Heat Airflow Trim (percentage).",
   "Low-stage strip airflow is set as a percentage of high-stage electric heat airflow in its own menu. Another percentage menu adds trim when the heat pump and strips run together.",
   "Compare airflow to the minimum for the installed kit (Table 9). That minimum is not the recommended airflow. Follow the nameplate Minimum Blower Setting (M.B.S.).",
   "Confirm with a temperature rise: TR = (kW x 3412) x VC / (1.08 x CFM), where VC is .96 at 230 V and .87 at 208 V."
  ],
  "manual": "goodman-amana-amvt-install",
  "pages": [
   14,
   15,
   29,
   30
  ],
  "source": "AMVT (R-32) AMVT***P1300** Air Handlers Installation & Operating Instructions (IOG-4053B, November 2025), p.14, p.15, p.29, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-eb-no-heater-selected",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Code Eb on an aux heat call — no heater kit selected at the thermostat — DMVE/DFVE",
  "summary": "Eb means the air handler is getting an electric heat demand while it's set for no heater kit; on the DMVE/DFVE the kit has to be set in two places: the communicating thermostat and DIP switches S9-S12.",
  "steps": [
   "Read the board. Eb means \"no heater kit\" is selected while an electric heat demand is coming in. It is a minor code and is not the same as Ed (DIP selection invalid).",
   "In the communicating thermostat's installer menus, select the installed heater kit. That setting covers normal heating mode.",
   "Set DIP S9-S12 to the same kit using Tables 9 and 10. The DIPs drive heater kit selection in emergency mode. Factory default is all four OFF, which means no heater kit.",
   "Change only S9 to S12. Other DIP switches cause their own errors.",
   "Confirm the selected kit is valid for the model in Table 9 (first through seventh valid kit for each cabinet).",
   "Confirm heat-kit airflow in the thermostat STATUS menu or on the board's 7-segment display."
  ],
  "manual": "daikin-dfve-airhandler-install",
  "pages": [
   10,
   14,
   15,
   20,
   22
  ],
  "source": "DFVE / DMVE (FIT air handler) EEV-Series Multi-Position Variable-Speed Air Handler, p.10, p.14, p.15, p.20, p.22",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-blower-in-defrost",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Blower stops during defrost, customer says the air quit — defrost heat setting — DMVE/DFVE",
  "summary": "On the FIT EEV air handler the indoor fan runs 0 CFM in defrost unless there is a defrost heating demand (then it runs at heater CFM), and that depends on the outdoor unit's Defrost Heat setting or the thermostat's Backup Defrost Heat setting.",
  "steps": [
   "Confirm the system is actually in defrost. The indoor board's 7-segment display shows dF in defrost mode.",
   "Per the heating operation flow, the indoor fan runs 0 CFM in defrost when defrost heating demand is 0%. Otherwise it runs at heater CFM.",
   "A blower that stops through defrost with defrost heat off is normal operation, not a motor fault.",
   "If the customer wants heat during defrost, look at the outdoor unit's \"Defrost Heat\" setting or the thermostat's \"Backup Defrost Heat\" setting. Either one set to something other than OFF puts the heater into defrost.",
   "If defrost heat is on, a heater kit has to be installed and selected. Defrost heat on with no kit selected gives code Eb.",
   "If the blower runs in defrost but the air is cold, read amps on the strips during defrost to confirm they are actually energized."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   11,
   25,
   29
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.11, p.25, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-9b-low-airflow-strips",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Code 9b with the strips on — low indoor airflow in electric heat mode — DMVE/DFVE",
  "summary": "9b is the EEV air handler's low-airflow code that only sets while an electric heat demand is active; it trips on low blower rpm feedback, and the manual's check ends with an external static limit of 0.9 in. W.C.",
  "steps": [
   "9b only sets when an EH demand is active. The same check without EH demand shows as b9.",
   "The board trips it from blower rpm feedback: 50 rpm < feedback ≤ 150 rpm (min rpm) seen 10 times in a row, or 360 times out of 720 checks.",
   "Check for anything touching the blower wheel or motor, and for blocked filters. Clear them.",
   "Check the ductwork for blockages and make sure all registers are open.",
   "Measure external static pressure. If it is more than 0.9 in. W.C. (224 Pa), the ducts are undersized and need to be redesigned to get below 0.9.",
   "If the airflow path is clear and static is under 0.9, replace the control board or motor."
  ],
  "safety": "Turn off the power switch before connecting or disconnecting connectors, or parts may be damaged.",
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   60
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.60",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-temp-rise-check",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strip heat seems weak — temperature rise check with this unit's voltage factors — DMVE/DFVE",
  "summary": "The DMVE/DFVE IO uses its own voltage correction factors in the temperature-rise formula (1.0 at 240 V down to .75 at 208 V), so you can back-calculate electric heat airflow and compare it to what the board reports.",
  "steps": [
   "Set the thermostat to maximum heat with the strips on and let the system reach steady state.",
   "Put thermometers in the return and the supply. Temperature rise = supply air minus return air.",
   "Measure supply voltage with the strips running.",
   "Apply TR = (kW x 3412) x VC / (1.08 x CFM) with this IO's factors: VC 1.0 at 240 V, .92 at 230 V, .84 at 220 V, .77 at 210 V, .75 at 208 V. Solve for CFM.",
   "Compare to the airflow the board reports in the thermostat STATUS menu or on the 7-segment display.",
   "Confirm the kit is a Daikin HKS or HKTS series kit, the only ones allowed. A rise well below expected means some heat isn't on, so read Heat Strip 1 and Heat Strip 2 amps (start-up checklist)."
  ],
  "safety": "Line voltage is present at the heater kit while taking amp readings.",
  "manual": "daikin-dfve-airhandler-install",
  "pages": [
   10,
   11,
   15,
   27
  ],
  "source": "DFVE / DMVE (FIT air handler) EEV-Series Multi-Position Variable-Speed Air Handler, p.10, p.11, p.15, p.27",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-state-display-heat",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Which heat is actually running? Reading h1/h2/h3, FH, dF and EE on the board — DMVE/DFVE",
  "summary": "The EEV air handler's 2-digit display shows its current state, so you can tell heat-pump-only fan heat from each electric heat stage, defrost, and emergency mode without relying on the thermostat.",
  "steps": [
   "Watch the 2-digit display on the indoor board. It alternates between the state code and any error code.",
   "Heat pump system: h1, h2 and h3 are electric heat stages 1, 2 and 3, not counting emergency heating. FH is fan heat, meaning heat pump heating (communicating mode only).",
   "Air conditioner with strips: H1, H2 and H3 are electric heat stages 1, 2 and 3.",
   "dF = defrost mode. EE = emergency mode, which is set by DIP switch. In emergency operation the thermostat status menu and the outdoor display won't show the operating status.",
   "If the thermostat says aux is on but the board only shows FH, the system isn't calling the strips. Check the heater kit selection (Eb) and the thermostat aux settings.",
   "If the board shows h1-h3 but the supply air is cool, the call is there and the problem is in the heat kit itself. Read amps on each strip circuit."
  ],
  "manual": "daikin-fit-r32-system-service",
  "pages": [
   25,
   31
  ],
  "source": "FIT system (R-32) FIT System Service Instructions (2024, R-32), p.25, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dmve-hp-heat-airflow-source",
  "unit": "^D[FM]VE",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Airflow wrong in heat pump heat — the outdoor unit sets it, trim at the outdoor menu — DMVE/DFVE",
  "summary": "In a fully communicating DMVE/DFVE system the heat pump sets airflow in heat pump heating and indoor trim is changed from the outdoor unit menu within a maximum measured CFM, so the air handler DIPs don't control heat pump airflow.",
  "steps": [
   "Know who sets airflow in each mode. Heat pump heating only: the heat pump. Heat pump plus strips: the greater of the heat pump or air handler demand. Strips only: the air handler.",
   "Low airflow in heat pump heat is therefore not fixed with air handler DIPs. Indoor airflow is trimmed up or down from the outdoor unit's user menu (see the outdoor unit IO).",
   "Positive trim is only allowed up to the maximum measured CFM, to prevent condensate blow-off. Examples: DFVE24BP1400 is 910 CFM upflow and 870 downflow/horizontal, DFVE60DP1400 is 1890 and 1800.",
   "Judge it by CFM measured on site. The IO warns not to go by the outdoor spec sheet, the thermostat status menu or the board LEDs, because displayed and actual airflow can differ.",
   "With strips on, airflow only rises above heat pump airflow if the air handler's demand is the greater one."
  ],
  "manual": "daikin-dfve-airhandler-install",
  "pages": [
   13,
   18
  ],
  "source": "DFVE / DMVE (FIT air handler) EEV-Series Multi-Position Variable-Speed Air Handler, p.13, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-startup-defrost-settings",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Compressor pauses at the start and end of every defrost — GLZS4 SmartShift, defrost interval and cold start-up",
  "summary": "The GLZS4 defrost control has a SmartShift delay that holds the compressor off at defrost start and finish, plus a 30/60/90 minute interval that has a recommended setting by tonnage in Region IV.",
  "steps": [
   "A short compressor pause when defrost starts and again when it ends is SmartShift doing its job. It is not a fault.",
   "If the customer or the application needs it off, move the jumper on the defrost control from DLY to NORM.",
   "Check the defrost interval jumper. It can be set to 30, 60 or 90 minutes.",
   "In Region IV, set it by tonnage: 3 ton at 60 minutes; 1.5, 2, 2.5, 3.5, 4 and 5 ton at 90 minutes.",
   "On a unit with a crankcase heater, high voltage should be on for 24 hours before start-up.",
   "Heat pumps need at least a 40 VA low-voltage supply (cooling-only units need 25 VA)."
  ],
  "manual": "goodman-glzs4b-install",
  "pages": [
   8
  ],
  "source": "Condensing Unit / Heat Pump Installation & Service Reference, R-32 GLZS4BA (IOG-4047, December 2023), p.8",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-ice-base-drainage",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Ice building up in the base and bottom rows of the coil — GLZS4 drainage and elevation",
  "summary": "Defrost water has to leave through the cutouts in the GLZS4 base; on a pad that's too low, or one buried in snow, the meltwater refreezes into the coil, so check elevation against the local design temperature.",
  "steps": [
   "Look under the coil. The base has cutouts under the outdoor coil so defrost water and ice can drain. They must be free and unobstructed.",
   "Check the unit's height against the local design temperature: +15°F and above, 2 1/2 in.; -5° to +14°, 8 in.; below -5°, 12 in.",
   "In heavy snow areas or places with long stretches below freezing, the location itself needs special consideration. Raise or move the unit if snow or ice blocks drainage or airflow.",
   "Don't hack ice off or use heat or other methods to speed up defrost. The manual bans any means of speeding defrost that the manufacturer doesn't recommend.",
   "Once drainage is fixed, check the defrost interval setting and the defrost thermostat if ice keeps coming back."
  ],
  "manual": "goodman-glzs4b-install",
  "pages": [
   1,
   4
  ],
  "source": "Condensing Unit / Heat Pump Installation & Service Reference, R-32 GLZS4BA (IOG-4047, December 2023), p.1, p.4",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-defrost-thermostat",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Coil freezes solid or defrost ends on time instead of temperature — GLZS4 defrost sensor logic and override",
  "summary": "The GLZS4 defrost board and its coil-mounted defrost thermostat run defrost together, so check how the sensor is mounted and whether defrost is ending on temperature or on the override before you replace the board.",
  "steps": [
   "Know the logic: defrost is controlled jointly by the defrost board and the defrost thermostat. Time only counts while the thermostat is closed (about 31°F) and there is a heat call. Defrost ends when it opens (about 75°F).",
   "Check the mounting: the defrost thermostat is clamped to a return bend on 3/8 in. coils, or to a feeder tube on 5 mm coils. Re-clamp it tight if it has slipped.",
   "If the thermostat never opens, a ten minute override ends defrost; the upgraded board uses a 12 minute override. Defrost that always runs to the override points at the sensor or its mounting.",
   "If the mounting is right, bench-test the defrost thermostat close and open points for its part number (separate procedure), then prove the board with the forced-defrost test."
  ],
  "manual": "goodman-r32-glxs-glzs-service",
  "pages": [
   13
  ],
  "source": "GLXS3 / GLXS4 / GLXS5 condensers, GLZS4 heat pumps (Amana ALXS / ALZS) Service and Troubleshooting - R-32 Condensing Units and Heat Pumps with Blowers, Coils & Accessories (RS6200301, July 2024), p.13",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-low-pressure-heat",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Heat pump drops out on low pressure in cold weather — GLZS4 low pressure control test",
  "summary": "The low pressure control on the suction line opens at 21 PSIG and resets itself at about 50 PSIG, so prove the switch first, then go after whatever is starving the outdoor coil.",
  "steps": [
   "Connect gauges. The low pressure control is on the suction line, opens on a pressure drop and resets automatically.",
   "The switch should open at 21 PSIG and reset (close) at about 50 PSIG. Outside those numbers, replace it.",
   "Heating-mode test (Test 2): disconnect power to the outdoor unit, remove the control panel cover, unhook the black wire at the condenser fan motor and tape it off, restore power and watch the suction gauge. The printed step 5 still says to set the thermostat to cool.",
   "Keep it short. Suction below 20 psig for more than 5 seconds overheats the scrolls and causes permanent damage.",
   "Amana ALZS units carry the CoreSense module. There, yellow flash 3 is pressure switch cycling, and repeats lock out to red flash 3. The quick-reference table says after 4 in a row or 10 in total; the diagnostics table says after 10 in a row.",
   "Switch good but suction low: check for a liquid line restriction. You'll see a temperature drop (or frost) at the restriction, with low pressures but normal to high subcooling."
  ],
  "manual": "goodman-r32-glxs-glzs-service",
  "pages": [
   19,
   22,
   23,
   36,
   42
  ],
  "source": "GLXS3 / GLXS4 / GLXS5 condensers, GLZS4 heat pumps (Amana ALXS / ALZS) Service and Troubleshooting - R-32 Condensing Units and Heat Pumps with Blowers, Coils & Accessories (RS6200301, July 2024), p.19, p.22, p.23, p.36, p.42",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-heat-mode-charging",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Topping off charge in winter — GLZS4 heat-mode charging by weight",
  "summary": "The GLZS4B install manual makes heat-mode charging a weigh-in job, with one 8°F superheat check on outdoor TXV units; subcooling trim is saved for cooling at 60°F or warmer outside.",
  "steps": [
   "Charge by weight in heat mode, adjusting for line size, line length and other system components.",
   "The unit ships with enough charge for the matched (DTC) coil and 15 ft of line set. Add per foot past 15 ft: 1/4 liquid / 5/8 suction 0.23 oz; 3/8 liquid with 5/8, 3/4, 7/8 or 1-1/8 suction 0.53, 0.55, 0.58 or 0.64 oz.",
   "Outdoor units with a TXV: superheat should be 8°F +/- 1°F at 4-6 in. from the compressor in heating.",
   "Subcooling and superheat trimming need 60°F or higher outdoors with the thermostat on COOL. Let the system stabilize 20 minutes before reading.",
   "Make final charge adjustments in the cooling cycle.",
   "Record FACTORY, FIELD and TOTAL CHARGE on the label on the lower access panel.",
   "Never exceed the maximum charge printed on the evaporator serial plate."
  ],
  "manual": "goodman-glzs4b-install",
  "pages": [
   8,
   9,
   11,
   12
  ],
  "source": "Condensing Unit / Heat Pump Installation & Service Reference, R-32 GLZS4BA (IOG-4047, December 2023), p.8, p.9, p.11, p.12",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-compressor-cold-start",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Compressor won't start or trips on a cold morning — GLZS4 crankcase heater and internal overload",
  "summary": "On a cold start, a crankcase heater that has failed (or was only just powered) lets liquid migrate into the compressor, and a compressor that has tripped its internal overload can take hours to reset; check both before you condemn it.",
  "steps": [
   "If power was off, the crankcase heater has to be on for at least four hours before the unit runs.",
   "With ALL power off, check the heater for continuity and replace it if it is open. It is a 40 W, 265 V PTC heater, about 1800 ohms on a cool shell and higher as the shell warms.",
   "Remember its limits: it does not prevent compressor damage from floodback or an overcharge.",
   "If the compressor is hot and won't run, the line-break internal overload (it senses motor amps and winding temperature) may be open. Give it at least three to four hours to cool and reset, then retest.",
   "Allow ample time for the overload to reset before you call the compressor bad and replace it."
  ],
  "safety": "Disconnect ALL power before servicing.",
  "manual": "goodman-r32-glxs-glzs-service",
  "pages": [
   29,
   30,
   31
  ],
  "source": "GLXS3 / GLXS4 / GLXS5 condensers, GLZS4 heat pumps (Amana ALXS / ALZS) Service and Troubleshooting - R-32 Condensing Units and Heat Pumps with Blowers, Coils & Accessories (RS6200301, July 2024), p.29, p.30, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-cold-air-in-heat",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Unit cools when it should heat — GLZS4 reversing valve stuck in cool",
  "summary": "On the GLZS4, the reversing valve is powered only by O in cooling and sits de-energized in heat; work the heating chart from the thermostat to the valve.",
  "steps": [
   "Confirm the thermostat is really in heat. If it's in cool mode, switch it to heat mode.",
   "In heat the 24 V reversing valve coil should be dead. O is only powered when the thermostat is in the cooling position.",
   "If the valve is in cool mode, measure for 24 V at the reversing valve. If it's there, trace it back: 24 V on O from the thermostat means a thermostat or thermostat wiring problem.",
   "No 24 V at the valve but it's still cooling: check the valve is piped correctly. Install it correctly if it isn't; replace it if it is.",
   "Before you condemn it, feel the lines. The center tube is always suction and should be cold, and true suction should be within 4 degrees of the suction line after the valve."
  ],
  "manual": "goodman-r32-glxs-glzs-service",
  "pages": [
   13,
   14,
   31,
   52,
   53
  ],
  "source": "GLXS3 / GLXS4 / GLXS5 condensers, GLZS4 heat pumps (Amana ALXS / ALZS) Service and Troubleshooting - R-32 Condensing Units and Heat Pumps with Blowers, Coils & Accessories (RS6200301, July 2024), p.13, p.14, p.31, p.52, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-glzs4-aux-heat-strips",
  "unit": "^(GLZS4|ALZS4)",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Backup heat dead or weak — GLZS4 system electric heat, limit and fuse link checks",
  "summary": "Electric heat on the matched R-32 air handler is protected element by element with a 150°F limit and a 333°F one-time fuse link, and the manual gives a temperature-rise method to prove airflow.",
  "steps": [
   "Start at power: 240 V at the breakers and heat contactors, then 24 V on W at the contactor. If W is dead, check the thermostat and wiring.",
   "With the contactor pulled in and no heat, ohm each element's limit across its normally closed contacts. It opens at about 150°F. If it's open, replace it. Do not wire around it.",
   "Ohm the fuse link. It's one-time and opens at about 333°F. If it's open, replace it and find the cause.",
   "Pull the element and look for breaks in the wire or broken insulators, then check continuity.",
   "Prove CFM: run the heaters and blower with the compressor off and measure the rise at the blower inlet and outlet. CFM = kW x 3413 / (1.08 x rise).",
   "The table is at 240 V. Multiply by .92 at 230 V, .84 at 220 V, .75 at 208 V.",
   "Don't add heaters beyond the quantity listed for the model."
  ],
  "safety": "Disconnect all power before servicing; multiple power sources may be present.",
  "manual": "goodman-r32-glxs-glzs-service",
  "pages": [
   33,
   34,
   48
  ],
  "source": "GLXS3 / GLXS4 / GLXS5 condensers, GLZS4 heat pumps (Amana ALXS / ALZS) Service and Troubleshooting - R-32 Condensing Units and Heat Pumps with Blowers, Coils & Accessories (RS6200301, July 2024), p.33, p.34, p.48",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-defrost-check-force",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil iced up, not sure it's going into defrost — Goodman GZV7S/GZV9S",
  "summary": "On the GZV heat pump the outdoor board runs defrost on a selectable maximum interval plus a low-coil-temperature trigger, and you can watch it, force it and check its defrost sensor right from the outdoor 3-digit display.",
  "steps": [
   "Know the logic before you judge it: the board defrosts at the Maximum Defrost Interval set from the thermostat (2, 6, 12 or 24 hours; older outdoor software shows 30, 60, 90 or 120 minutes), starts early if it sees abnormally low coil temperature, and ends defrost when the coil temperature is high enough, then resets the timer.",
   "Open monitor mode on the outdoor board: from Screen 0 hold RECALL 5 seconds for Screen 1, then hold RECALL 5 seconds again for Screen 2. Press LEARN to get back to Screen 0 when done.",
   "On Screen 2 read item 2 (operation code: 4 = heating operation, 5 = defrost operation), item 12 (Tb defrost sensor temperature, °F) and item 9 (Ta outdoor air, °F). The EEV air handler's 2-digit display shows dF during defrost (an EEV cased coil does not show states).",
   "To force a defrost, pick force defrost at the thermostat, or hold RECALL and TEST together 5 seconds for Screen 4 and set item 7 Force Defrost Cycle to 0 (ON).",
   "If it never enters defrost or E27 is stored, the board is saying the outdoor coil defrost temperature sensor is out of range: check the Tb connector at the board first.",
   "Test Tb per S-26: kill power to all equipment, unplug the thermistor from the control board and ohm it against the thermistor resistance and temperature table. Replace it if open, shorted or out of range.",
   "If the complaint is refrigerant rushing noise at the indoor unit during defrost, the manual's fix is putty ASSY part No. 2565250 applied to the indoor unit piping and field piping."
  ],
  "safety": "Disconnect all power before unplugging thermistors; multiple power sources may be present.",
  "manual": "",
  "pages": [
   9,
   20,
   26,
   32,
   38,
   43,
   45,
   47
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.9, p.20, p.26, p.32, p.38, p.43, p.45, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-defrost-heat-setting",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Cold air (or no air) from the vents during defrost — Goodman GZV7S/GZV9S",
  "summary": "What the indoor blower does during a GZV defrost depends on the outdoor DEFROST HEAT setting, and setting it on a system with no heater kit throws an indoor Eb code.",
  "steps": [
   "Confirm the complaint lines up with defrost: the EEV air handler display shows dF, or outdoor Screen 2 item 2 reads 5.",
   "Know what is normal: during defrost the indoor fan runs 0 CFM if defrost heat mode is OFF; otherwise it runs heater CFM and the heater gets a defrost heating demand.",
   "Check DEFROST HEAT on the outdoor board: hold RECALL and TEST 5 seconds for Screen 4, item 22. Choices are 0 Always ON, 1-8 = 30F through 65F in 5 degree steps, 9 OFF (heat pump only).",
   "Only turn Defrost Heat on when a heater kit is actually installed. With an air handler that has no heater kit the manual says this must stay OFF (factory setting).",
   "If the indoor board shows Eb ('no heater kit' selected while receiving electric heat demand), a heater-kit function is configured without a kit, such as Defrost Heat at the outdoor unit or Backup Defrost Heat at the thermostat. Select the valid heater kit at the thermostat or turn those functions OFF.",
   "If it shows Ed, the heater kit dip switches are not set properly; set the correct dip switches for the kit installed.",
   "115 V air handlers and 115 V MBVK**CH modular blowers cannot take a heater kit at all; disable every heater-kit function on those systems."
  ],
  "manual": "",
  "pages": [
   12,
   26,
   30,
   31,
   38,
   45
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.12, p.26, p.30, p.31, p.38, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-cold-blow-powerful-heating",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Customer says the heat feels cool coming out of the vents — Goodman GZV7S/GZV9S",
  "summary": "The service manual's answer to a cold-blow complaint in normal heating is the POWERFUL HEATING setting plus the heat airflow trim and delay settings, but trimming airflow up too far on the 5 ton throws Ed2.",
  "steps": [
   "Rule out defrost first (dF on the indoor display or operation code 5 on outdoor Screen 2 item 2); defrost air is a separate setting.",
   "Turn on POWERFUL HEATING from the communicating user menu. It is OFF by default.",
   "Explain what it does: it raises supply air temperature when demand is low by lowering indoor CFM at restricted compressor speed.",
   "If the heat pump runs with a non-communicating furnace through the D24 Gateway (DTA119A73), Powerful Heating fixes the compressor at 100%. It gets hotter air, but the customer loses the inverter's modulation, so tell them first.",
   "Check the heat airflow settings: from Screen 2 hold RECALL 5 seconds for Screen 3. Items 8-10 are Heat Airflow Trim High/Int/Low (-15% to +15%), item 11 Heat Airflow ON Delay (5, 10 or 15 sec) and item 12 Heat Airflow OFF Delay (30, 50, 70 or 90 sec).",
   "Do not fix it by trimming airflow up past the limit. On the 5 ton outdoor units (GZV7S*601, GZV9S*601, GXV9S*601) with furnace G*VT960804C, G*VM970804C or G*VT800804C, trim settings above 5% are invalid; on GZV9S*361 with the 0403B/0603B furnaces listed, trim above 10% is invalid. Trimmed-up CFM throws an Ed2 mismatch."
  ],
  "manual": "",
  "pages": [
   38,
   43,
   44,
   59,
   71
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.38, p.43, p.44, p.59, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-e44-heat-ambient-limit",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "E44 on a cold (or warm) day, heat pump won't run in heat — Goodman GZV7S/GZV9S",
  "summary": "E44 means the outdoor air thermistor reading is outside the heating range of 81°F high or -26°F low, so check whether the cold is real or the sensor is being fooled.",
  "steps": [
   "Read the limits: in heating mode E44 sets when outdoor temperature is above 27°C (81°F) or below -32°C (-26°F). The code table says the unit may continue to operate normally; the fix listed is to cycle power and retry inside the usable range.",
   "Read what the board sees on Screen 2 item 9 (Ta outdoor air, °F) or with the D-checker, and compare it to your own outdoor temperature measurement.",
   "If the real outdoor temperature is beyond the limit, the system cannot run in that condition.",
   "If the board reading and your reading are obviously different, look for what is fooling the outdoor air thermistor: discharge air recirculating, the thermistor touching the outdoor coil, or direct sunlight. Remove the cause.",
   "If nothing is fooling it, inspect the outdoor air thermistor and replace it if necessary. If the readings match but the code makes no sense for the real temperature, the flowchart ends at replacing the outdoor PCB (A1P).",
   "If the code is E25 instead, the outdoor air temperature sensor is open or shorted: inspect and test it (S-26 resistance check) and replace it if needed."
  ],
  "manual": "",
  "pages": [
   20,
   43,
   47,
   56
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.20, p.43, p.47, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-low-charge-heat-e41-57",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "E41 refrigerant shortage or code 57 in heating mode — Goodman GZV7S/GZV9S",
  "summary": "In heat the GZV board judges low charge from discharge superheat and the outdoor liquid pipe temperature, and the flowchart has a heating branch that separates a real leak from a sensor or an exposed liquid line.",
  "steps": [
   "Know what tripped it. In heating, E41 sets when discharge superheat is high or liquid pipe temperature is low. Code 57 (refrigerant cooling sweat, shown as 57 with no E) sets in heating when the liquid pipe is below outdoor temperature minus 2°C (3.6°F) for 420 seconds straight, or minus 5°C (9°F) for 100 seconds.",
   "Check the charge first and leak-test it. In cold weather you cannot use the Charge Verification Test to adjust subcooling: below 65°F the thermostat says to weigh in charge, so weigh it per the installation manual's line set calculation.",
   "If the charge is right, look for a clogged refrigerant circuit.",
   "Pull D-checker data (or outdoor Screen 2: item 9 Ta, item 10 Td, item 13 Tl, item 17 high pressure). If discharge temperature minus condensing temperature is over 85°C (153°F), measure discharge temperature and high pressure yourself and replace the sensor that is obviously off; if both agree, replace the outdoor PCB (A1P).",
   "If outdoor air temperature minus 2°C (3.6°F) is higher than the liquid pipe temperature, measure outdoor air temperature, then the liquid tubing right beside the OD liquid thermistor, and compare each to the D-checker. Replace a sensor that is obviously off.",
   "If the sensors read true, insulate any liquid tubing exposed outdoors to keep it warm. If that clears it, keep running; if not, replace the outdoor PCB (A1P).",
   "For code 57 also check that the indoor EEV coil is plugged in, clicked onto the EEV body and has normal coil resistance, and that the outdoor air and liquid thermistors are connected and in spec."
  ],
  "manual": "",
  "pages": [
   43,
   55,
   57,
   71
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.43, p.55, p.57, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-e13-e15-heating-branch",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "High (E13) or low (E15) pressure trip while heating — Goodman GZV7S/GZV9S",
  "summary": "The GZV pressure flowcharts have separate heating-mode branches: in heat, high pressure points at indoor airflow, and low pressure points at the liquid thermistors, the EEVs and the two outdoor fans.",
  "steps": [
   "E13 = high pressure switch opened above 4.2 MPa (605 PSIG). The switch cuts back in at 465 PSIG but does not reset itself; turn main power off to reset it.",
   "Compare your gauge with the board's high pressure sensor (Screen 2 item 17, PSIG) or the D-checker. If they disagree, check the high pressure sensor per S-13 (voltage across the black and white wires against the voltage-pressure chart), then the A1P board.",
   "E13 heating branch: after the stop valve and overcharge checks, the indoor coil is your condenser, so check for high static (clean filters, check duct work) and an indoor blower failure (obstruction, motor wiring, motor).",
   "E15 = outdoor low pressure sensor under 0.08 MPa (11 PSIG) for 5 minutes. Compare your gauge with Screen 2 item 14. Then check the stop valve and undercharge (adjust subcooling, find the leak).",
   "E15 heating branch: check the indoor liquid and outdoor liquid thermistors, then look for a temperature difference across the indoor EEV and across the outdoor EEV (Y1E). Check the EEV coil first and replace the valve body only if the coil is good.",
   "EEV coil test: unplug the EEV cable from the board and read from each of drive pins 1-4 (orange, red, yellow, black) to the gray COM[+] pin. Every pair should read 40 to 50 ohms.",
   "Check the refrigerant filters and dryer for clogging and the piping for kinks. Then, in heating, check the outdoor fans. This double-fan unit has an upper fan M1F (code 53) and a lower fan M2F (E61/62); fan RPM shows on Screen 2 items 8 and 16. Clean debris out of the grille and check motor wiring."
  ],
  "manual": "",
  "pages": [
   15,
   16,
   20,
   43,
   48,
   50,
   51
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.15, p.16, p.20, p.43, p.48, p.50, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-ahve-9b-low-airflow-heat-strips",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "9b low indoor airflow with the heat strips on — Goodman GZV7S/GZV9S with AHVE air handler",
  "summary": "On the AHVE air handler and MBVK modular blower paired with a GZV, 9b is low blower RPM while electric heat demand is active (b9 is the same check without electric heat), with a hard 0.9 inH2O static limit in the flowchart.",
  "steps": [
   "Know the code: 9b is low indoor airflow with electric heat demand active. The same fault without electric heat demand shows as b9. While the strips run normally, the display shows h1/h2/h3 for heat pump electric heat stages.",
   "Trip logic: blower feedback above 50 rpm but at or below the 150 rpm minimum, seen 10 times in a row, or 360 times out of 720 checks.",
   "Kill power, then look for anything touching the blower wheel or motor and for blocked filters.",
   "Check the duct work for blockage and make sure all registers are fully open.",
   "Measure external static. Above 0.9 inH2O (224 Pa) the manual says the duct has to be redesigned to bring it under that.",
   "9b also lists a mismatched outdoor/indoor combination as a cause; confirm the pairing is a rated combination.",
   "Check motor connections, rotation and input voltage, then replace the control board or motor."
  ],
  "safety": "Turn off the power switch before connecting or disconnecting connectors, or parts may be damaged.",
  "manual": "",
  "pages": [
   26,
   31,
   61
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.26, p.31, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gzv7s-snow-ice-drain-pan-heater",
  "unit": "^GZV[79]S",
  "brand": "Goodman",
  "equipment": "Condenser/Heat Pump",
  "title": "Ice building in the base pan or snow packing the fans — Goodman GZV7S/GZV9S",
  "summary": "The GZV outdoor board has a drain pan heater setting for the optional heater and an intermittent outdoor fan setting meant to stop snow piling up inside the unit, and both are easy to find left off.",
  "steps": [
   "Check whether the optional drain pan heater is installed. The outdoor wiring diagram shows a dedicated connector on the board for it.",
   "Open Screen 4 (hold RECALL and TEST 5 seconds) and read item 24, Drain pan heater temperature. Settings 0-2 (5°F, 30°F, 38°F) run the heater only in heating mode with the compressor running. Setting 3 means it never turns on. Settings 4-6 (5°F, 30°F, 38°F) may run it regardless of mode or compressor.",
   "If a heater is installed and ice still builds, make sure item 24 is not on 3 (Always OFF).",
   "For snow piling up inside the unit, set item 30, Outdoor Fan Intermittent Operation, to 1 (ON). At low ambient the outdoor fan then cycles ON/OFF every 6 minutes to keep snow from accumulating.",
   "If code 53 (upper fan M1F) or E61/62 (lower fan M2F) is logged, check for an obstruction in fan rotation, clean the grille of debris, then check fan motor wiring and the motor. Screen 2 items 8 and 16 show each fan's RPM (x10).",
   "Clear ice only by letting the unit defrost. Do not use any other means to speed up defrosting."
  ],
  "safety": "The manual warns not to use means to accelerate the defrosting process other than those recommended by the manufacturer.",
  "manual": "",
  "pages": [
   3,
   38,
   43,
   45,
   48,
   75
  ],
  "source": "SIUS612417EA (not in the app's manual library), p.3, p.38, p.43, p.45, p.48, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvm97-ignition-retries-lockout",
  "unit": "^(GMVM|GCVM|AMVM|ACVM)97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Tries to light three times, then locks out — GMVM97 ignition trial, retries and E0 reset",
  "summary": "RS6612015 gives this furnace a 4 second trial for ignition, a 30 second purge between tries and a three-try limit before an E0 lockout; knowing that pattern separates a no-gas or no-flame-sense problem from an inducer or pressure switch problem.",
  "steps": [
   "Normal start: the inducer runs on high speed for a 15 second prepurge, then steps to low speed. The igniter warms only after the low stage pressure switch is closed.",
   "The trial for ignition is only 4 seconds. Have your meter connected before you start the heat call.",
   "If no flame is sensed, the board shuts the gas, runs the inducer for a 30 second purge, reheats the igniter and tries again.",
   "After the gas valve has cycled three times without proven flame, the board locks out and shows E0.",
   "E0 causes from the chart: no gas, front cover pressure switch stuck open, bad igniter or alignment, wrong orifices, or a coated or loose flame sensor. If flame is lost after lighting: an interrupted gas supply, lazy flame, the front cover switch opening, or poor inducer performance.",
   "Also check grounding and polarity. A missing earth ground, reversed hot and neutral, or a high-resistance neutral can make the control lock out because it cannot sense flame.",
   "To reset: turn the thermostat off for more than 5 and less than 20 seconds, then back on, or open the disconnect for at least 5 seconds. The board also self-resets one hour after lockout.",
   "When the call ends, the inducer shuts off after a 15 second post purge."
  ],
  "manual": "goodman-modulating-97-furnace-service",
  "pages": [
   55,
   64,
   69,
   88
  ],
  "source": "GMVM97 / AMVM97 / ACVM97 / GCVM97 (= Daikin DM97MC/DC97MC) Service & Troubleshooting, p.55, p.64, p.69, p.88",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvm97-limit-trips",
  "unit": "^(GMVM|GCVM|AMVM|ACVM)97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Both blowers running, no flame (E3) — GMVM97 primary and auxiliary limit trips",
  "summary": "On this furnace an open primary, auxiliary or rollout limit gives E3 and runs both the circulator and the inducer until the limit closes; the primary limit is auto-reset, but the two blower-housing auxiliary limits may only be reset once before you find the cause.",
  "steps": [
   "E3 = an open primary, auxiliary or rollout limit. The circulator and the inducer both stay on until the limit closes.",
   "Causes the manual lists: low airflow (dirty filter, duct restriction), a bad limit or blower, blower speed set too low, misaligned burners, a bad inducer, or a blocked flue.",
   "Run the furnace with burners firing for about ten minutes, then measure the temperature rise. Compare it to the model's range (example: *MVM970803BNB* is 30-60, mid 45). Check that the input does not exceed the rating plate.",
   "Primary limit: non-adjustable and automatic reset. With power off, remove the wires and ohm the limit. It should read continuous unless the heat exchanger is above the limit setting; otherwise replace it.",
   "Auxiliary limits: there are two on the blower housing, one on each side. They open on main blower failure in horizontal or counterflow installs, and can also open if power is interrupted while the furnace is firing.",
   "Ohm an auxiliary limit only at room temperature. The safety section calls these manual-reset sensors; the servicing figure shows manual or automatic reset, so check the part on the unit for a reset button.",
   "Reset an auxiliary limit only once. If it opens a second time, find out why before resetting it again."
  ],
  "safety": "To avoid possible fire, reset the auxiliary limit only once. If it opens again, find the cause before resetting it. Never jumper a limit.",
  "manual": "goodman-modulating-97-furnace-service",
  "pages": [
   37,
   55,
   69,
   81,
   82
  ],
  "source": "GMVM97 / AMVM97 / ACVM97 / GCVM97 (= Daikin DM97MC/DC97MC) Service & Troubleshooting, p.37, p.55, p.69, p.81, p.82",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvm97-rollout-trip",
  "unit": "^(GMVM|GCVM|AMVM|ACVM)97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat, circulator running, rollout switch open — GMVM97 rollout reset and cause hunt",
  "summary": "The manual-reset rollout switches on the manifold open on flame rollout, overfiring or flame hitting the heat shield, and the circulator then runs continuously; RS6612015 gives the reset-and-ohm test and a specific list of causes to rule out before you leave.",
  "steps": [
   "Symptom: the circulator runs continuously with no burner operation. The manual's abnormal-operation list groups an open rollout with the limits under E3.",
   "The rollout switches are temperature-activated manual-reset controls mounted to the manifold assembly. They open on flame rollout, overfiring, or flame hitting the heat shield.",
   "Remove the burner compartment door and reset the rollout switch. Then remove its wires and check it for continuity with an ohmmeter.",
   "If the switch will not close after a manual reset, replace it.",
   "Find out why it tripped before you leave. Possible causes: flame impingement, orifice plate out of position, burners with oversized cross-over slots, overfiring, wrong orifices, wrong gas pressure, air leaking from around the heat exchanger into the burner compartment, or air leaking through the heat exchanger itself.",
   "The troubleshooting chart adds: gas pressure too high, burners misaligned, or a restricted heat exchanger or vent. Correct each one you find.",
   "Reinstall the burner door and watch a full heat cycle to confirm normal operation."
  ],
  "safety": "Never jumper a rollout switch. A repeat trip can mean a cracked or restricted heat exchanger, so find the cause before returning the furnace to service.",
  "manual": "goodman-modulating-97-furnace-service",
  "pages": [
   66,
   69,
   82,
   83
  ],
  "source": "GMVM97 / AMVM97 / ACVM97 / GCVM97 (= Daikin DM97MC/DC97MC) Service & Troubleshooting, p.66, p.69, p.82, p.83",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvm97-heat-blower-delays-airflow",
  "unit": "^(GMVM|GCVM|AMVM|ACVM)97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Blower late, runs long, or temperature rise off — GMVM97 gas heat blower menus",
  "summary": "This furnace sets its heat blower on/off delays and heat airflow through 7-segment menus, not DIP switches; knowing the defaults and the 30 second high-speed hold explains most blower timing complaints, and the airflow display lets you set rise without a traverse.",
  "steps": [
   "Gas Heat Fan On Delay: default 30 seconds, adjustable 5 to 30 seconds in 5 second steps. The blower starts after this delay and then ramps up.",
   "Gas Heat Fan Off Delay: default 90 seconds, adjustable 30 to 180 seconds in 30 second steps. The p.62 menu table lists the on and off delay defaults swapped, so read the actual setting off the board.",
   "After a high heat call, the blower runs the high heating speed for 30 seconds, then low heating speed for the rest of the off delay. After a low heat call, it stays on low speed for the whole delay.",
   "If the board drops from high to low fire during a call, the blower stays on high heating speed for 30 seconds before slowing. This is not a stuck speed.",
   "Heat airflow is set as a percentage of the furnace's max CFM: 1400 for 3 ton, 1760 for 4 ton, 2200 for 5 ton, and 1650 for the *MVM970803. Gas Heat Trim adjusts it -10% to +10% in 2% steps. Low fire airflow defaults to 70% of high fire.",
   "Read actual airflow on the display while the blower runs. It shows A plus CFM/100; for example, A12 means 1150 to 1249 CFM.",
   "After about ten minutes of firing, measure the temperature rise and compare it to the model range (example: *MVM970603BNB* 25-55, mid 40). Raise airflow to lower the rise, or lower airflow to raise it."
  ],
  "manual": "goodman-modulating-97-furnace-service",
  "pages": [
   37,
   44,
   45,
   54,
   55
  ],
  "source": "GMVM97 / AMVM97 / ACVM97 / GCVM97 (= Daikin DM97MC/DC97MC) Service & Troubleshooting, p.37, p.44, p.45, p.54, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvm97-condensate-freeze",
  "unit": "^(GMVM|GCVM|AMVM|ACVM)97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Lockouts or pressure switch faults when it gets cold — GMVM97 condensate drain and vent freezing",
  "summary": "The pressure switches on this furnace also guard against a blocked condensate drain; a frozen drain, a misrouted front cover switch tube, frozen vent piping, or a tripped AUX condensate switch therefore show up as lockouts and switch faults in cold weather.",
  "steps": [
   "Treat the drain as a suspect on any pressure switch or E0 fault. The switches guard against blocked condensate drain conditions. On E0, check the front cover pressure switch hose, wiring and contact operation.",
   "Do not locate the furnace or its drain system where it can freeze unless it has proper freeze protection.",
   "Confirm both sides of the trap were primed. The drain line must slope down 1/4 inch per foot and must not have a second trap. Protect any drain line that runs through an area near or below freezing.",
   "Horizontal installs: the trap hangs below the furnace with at least 5 1/2 inches of clearance. Protect it if that space gets cold.",
   "Horizontal with the LEFT side down: the front cover pressure switch tube must be moved to the lower port of the collector box cover.",
   "Vent piping exposed below 35°F for extended periods must be insulated with 1/2 inch closed cell foam. Horizontal vent runs must slope 1/4 inch per foot back toward the furnace.",
   "Check that the furnace is level end to end and tilted 1/2 to 3/4 inch toward the front, so recuperator condensate flows to the front cover.",
   "If the AUX (condensate) switch is open, the chart points to high water in the evaporator coil. Check the evaporator drain pan, trap and piping."
  ],
  "manual": "goodman-modulating-97-furnace-service",
  "pages": [
   17,
   19,
   20,
   22,
   29,
   56,
   64,
   66
  ],
  "source": "GMVM97 / AMVM97 / ACVM97 / GCVM97 (= Daikin DM97MC/DC97MC) Service & Troubleshooting, p.17, p.19, p.20, p.22, p.29, p.56, p.64, p.66",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-heat-sequence-lockout",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat, furnace tries and quits — GMVC96/GCVC96 heat sequence and lockout",
  "summary": "Knowing this control's 15-second prepurge, 4-second trial for ignition and three-try lockout tells you how far a failed call got and how to clear it.",
  "steps": [
   "With no call, the control shows Id L (idle). Give it a W call. It checks the safety circuits, then runs the inducer on HIGH speed for a 15-second prepurge.",
   "The inducer then drops to LOW. Igniter warm-up starts only after that step down, with the low stage pressure switch closed.",
   "If the inducer keeps running and nothing else happens, the low stage pressure switch circuit is not closed. Go to the pressure switch checks.",
   "At the end of igniter warm-up the gas valve opens. The trial for ignition is only 4 seconds, so have meters connected before you make the call.",
   "Once flame is proven, the circulator starts after the selected heat on delay. When the call ends, the inducer runs a 15-second post purge.",
   "Three failed ignition attempts in one call put it in lockout. It resets itself after one hour, or reset it by interrupting 115 V or dropping the thermostat call for 1-20 seconds.",
   "If it locks out on flame sense, check grounding and polarity before blaming the sensor. A missing earth ground, reversed hot and neutral, or a high-resistance neutral can all cause a flame-sense lockout.",
   "Clean a coated flame sensor with steel wool."
  ],
  "safety": "Line voltage is present during these checks. Turn power off before repairing.",
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   33,
   36,
   37,
   54,
   55,
   60
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.33, p.36, p.37, p.54, p.55, p.60",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-staging-target-runtime",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Never goes to high fire (or always starts on high) — GMVC96 staging algorithm",
  "summary": "This furnace has no W2; it decides low or high fire itself from a single W call, aiming at a target runtime set in the Comfort Setting menu, and the first call after a power cycle always runs high stage.",
  "steps": [
   "Check the thermostat setup: single stage heat / single stage cool. Do not use heat pump mode or multi-stage mode. The one exception is a non-communicating single-stage heat pump wired per its diagram.",
   "The board's internal algorithm decides how to run the two gas stages from W alone. A missing W2 wire is not the problem.",
   "After a power cycle (or a change between heating and cooling), the first heat call always runs high stage. High fire right after you cycle power doesn't show you normal staging.",
   "On later calls the board adjusts the stage times based on how long the last cycle took compared with the target runtime.",
   "Check the Comfort Setting (CFS) menu. Options 1-5 set target runtimes of 10, 15, 20, 25 and 30 minutes. Option 1 is the default and tries to satisfy fastest.",
   "If the customer complains of slow recovery, pick a lower option number. A shorter target runtime makes the board try to satisfy the thermostat faster.",
   "Option 6 opens custom settings, including target time (t9t) from 1 to 240 minutes. If you use it, set the other comfort menus deliberately. The manual warns these must be set properly.",
   "Change menus with the board's Left/Center/Right buttons or the CoolCloudHVAC app. A flashing option is not selected yet, and if no button is pressed for 30 seconds the display times out and the change is dropped.",
   "Run times change with the load through the day, so judge staging over several cycles."
  ],
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   25,
   26,
   27,
   29,
   34,
   36,
   58
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.25, p.26, p.27, p.29, p.34, p.36, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-dual-fuel-gas-not-firing",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Heat pump keeps running and the gas never comes on — GMVC96 dual fuel",
  "summary": "With a communicating heat pump on this furnace, a W call goes to the heat pump first; gas takes over only on the target-runtime and strike-count rules, not on a W2 call.",
  "steps": [
   "Know the priority. With a heat pump installed, the heat pump gets the W call first.",
   "To prove the gas side alone, disconnect communications between the indoor and outdoor units, then run the heating test.",
   "Stage Up Percent (SUP) sets how far past the target runtime the heat pump runs before gas takes over. Manual example: a 20-minute target with SUP at 20% switches to gas at 24 minutes if the call is still on.",
   "Each of those handoffs counts as a strike against the heat pump. After the Over Target Threshold (Ott) number of strikes in a row, the heat pump is temporarily locked out and the furnace becomes the primary heat source.",
   "The heat pump comes back on the Stage Down Percent (SdP) and Under Target Threshold (Utt) rules. Manual example: with a 20-minute target and SdP at 15%, a low-stage-gas cycle that satisfies in under 17 minutes counts a strike against the furnace.",
   "Comfort Settings 1-5 use preset values (SUP and SdP 20%; Ott runs from 2 at option 1 up to 10 at option 5). Only option 6 lets you adjust each one.",
   "The first call after the system switches from heat pump to backup gas runs gas at full capacity. Later calls are trimmed toward the target runtime.",
   "The furnace's Backup Heat Balance Points menu only appears when a communicating heat pump is detected. If it's missing, the furnace isn't seeing the outdoor unit.",
   "Defrost Gas Heat Stage (1 or 2) sets which gas stage runs during heat pump defrost."
  ],
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   26,
   27,
   32,
   58
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.26, p.27, p.32, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-heat-airflow-rise-delays",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Temperature rise off or cold blow at start of heat — GMVC96 gas heat airflow and fan delays",
  "summary": "On this furnace, gas heat airflow is set as a percentage of the cabinet's max CFM in the gAF menu, with separate menus for trim and the heat fan on and off delays.",
  "steps": [
   "Fire about ten minutes with registers open, and check the input isn't over the rating plate. Read supply and return as close to the furnace as possible, out of sight of the heat exchanger.",
   "Compare the rise to the model's range in the airflow table. Ranges run from 20-50°F (for example *MVC960603BNB*) up to 35-65°F (for example *MVC961205DNB*).",
   "Set heat airflow in the Gas Heating Airflow menu (gAF) as a percentage of max CFM: 1400 for 3-ton, 1760 for 4-ton (1650 on 0803 models), 2200 for 5-ton cabinets. High stage CFM = max CFM x the selected percentage.",
   "Low fire airflow defaults to 70% of high fire, and the low fire rise should come out within about ±5% of the high fire rise.",
   "For fine changes, use Gas Heat Trim: -10% to +10% in 2% steps. More airflow lowers the rise, less airflow raises it. Watch motor amps while you adjust.",
   "Cold blow at the start of the cycle: check the gas heat fan on delay. The default is 30 seconds, adjustable 5-30 seconds in 5-second steps.",
   "Blower running long after shutdown: the gas heat fan off delay defaults to 90 seconds, adjustable 30-180 seconds in 30-second steps (p.35). The p.58 menu table lists different defaults and steps, so read the actual setting off the board.",
   "Too much external static also drives the rise up and causes limit trips. Measure static if the airflow changes don't move the rise as expected."
  ],
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   27,
   28,
   35,
   46,
   47,
   58
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.27, p.28, p.35, p.46, p.47, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-primary-aux-limit",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Limit trips in heat — primary and auxiliary limits on the GMVC96/GCVC96",
  "summary": "This furnace has an auto-reset primary limit on the partition panel and two manual-reset auxiliary limits on the blower housing; the auxiliary limits can also trip from a power loss during a burn.",
  "steps": [
   "Primary limit open: the circulator runs nonstop and the furnace won't fire. The primary limit is nonadjustable, auto reset and bimetal, so it may have reset itself by the time you arrive. Check the Last 6 Faults menu (L6F).",
   "A repeating fault is stored at most three times in a row, so a history full of limit trips means a real airflow problem.",
   "To test the primary limit: power off, remove the burner door, pull the low-voltage wires and ohm across the terminals. It should read continuous unless the heat exchanger is above the limit setting.",
   "The auxiliary limits are two switches on the blower housing, one on each side, with red manual reset buttons. They protect against blower failure in horizontal and counterflow installs.",
   "An auxiliary limit can also open if the power is cut while the furnace is firing. Ask about outages or someone flipping the furnace switch mid-cycle.",
   "Test an auxiliary limit for continuity only when it is at room temperature.",
   "Usual cause for either limit: not enough air over the heat exchanger. Check for blocked filters, restrictive ductwork, wrong blower speed or a failed blower motor, and for loose wiring in the limit circuit.",
   "Too much external static pressure also causes high rise and limit trips. Measure it and compare to the spec tables."
  ],
  "safety": "Reset an auxiliary limit only once. If it opens a second time, find out why before resetting it again.",
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   34,
   36,
   37,
   46,
   47,
   48,
   49,
   60
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.34, p.36, p.37, p.46, p.47, p.48, p.49, p.60",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-rollout-switch",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Rollout switch tripped — GMVC96/GCVC96",
  "summary": "The manual-reset rollout switch on the manifold opens on flame rollout, over-firing or flame hitting the heat shield; the manual lists specific causes to rule out before the furnace goes back in service.",
  "steps": [
   "When the rollout switch opens, the circulator runs nonstop and the furnace won't fire.",
   "The rollout control is a temperature-activated, manual-reset switch on the manifold assembly (burner bracket).",
   "Power off and remove the burner door. Reset the switch, pull its wires and ohm across it. If it won't close after a manual reset, replace it.",
   "Find why it tripped. Look for flame impingement, an orifice plate out of position, burners with oversized cross-over slots, over-firing, wrong orifices, or wrong gas pressure.",
   "Check for air leaking around the heat exchanger into the burner compartment, or through the heat exchanger itself. The fault chart also lists a restricted heat exchanger or vent.",
   "Check manifold pressure. On natural gas, high stage is 3.2 to 3.8 in. w.c. (3.5 nominal) and low stage is 1.6 to 2.2 in. w.c. (1.9 nominal). The factory orifices are #45 for natural gas.",
   "Check the burners: seated in their locating slots and level front to back and side to side. Delayed ignition can also roll flame out of the burners.",
   "After the repair, put the burner door back on and watch a full heat cycle."
  ],
  "safety": "Never jumper a rollout switch. Find the cause before you reset it.",
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   49,
   50,
   52,
   54,
   62
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.49, p.50, p.52, p.54, p.62",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-pressure-switch-test",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Inducer runs but no ignition, or stuck on low fire — testing GMVC96 low and high stage pressure switches",
  "summary": "The low stage pressure switch must close before the igniter is powered, and the high stage switch must close before high fire; the manual's test is a manometer tee plus an ohmmeter with the inducer running.",
  "steps": [
   "Read the symptom. Inducer running with no further action means the low stage switch circuit is not closed. Furnace failing on high stage but normal on low means a high stage switch fault.",
   "A switch that is already closed when the heat call starts means sticking contacts or a short in the switch wiring. Replace the switch, or repair the short.",
   "To test: power off, remove the burner door and pull the wires off the switch. Remove the switch hose and tee it into an inclined manometer.",
   "Put an ohmmeter across the switch terminals and run the inducer. The switch should close and show a complete circuit.",
   "If it doesn't close, compare the manometer reading to the closing point for that particular switch. Either the switch is bad or the inducer or venting is inadequate.",
   "Work the chart's cause list: hose blocked, pinched or on the wrong port; blocked flue or intake pipe; blocked drain system; weak inducer; wrong set point; loose wiring.",
   "Check the inducer motor. Its windings should show continuity with no reading to ground, and it should have 115 V at its terminals during the trial for ignition.",
   "On a high-altitude job, confirm the right high altitude pressure switch or orifice kit is installed."
  ],
  "safety": "Line voltage is present with the inducer running. Turn power off before repairing.",
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   50,
   53,
   60,
   61
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.50, p.53, p.60, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gmvc96-vent-condensate-freeze",
  "unit": "^(GMVC|GCVC|AMVC|ACVC)9[67]",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Vent or drain freezing in a cold snap — GMVC96/GCVC96 condensate checks",
  "summary": "On these 96% furnaces, condensate that can't drain back, or that freezes in the vent or trap, shows up as pressure switch and gas valve problems; the manual sets insulation, slope and leveling rules.",
  "steps": [
   "Walk the vent. Any vent pipe exposed below 35°F for long periods, run outdoors past the standard terminations, or run through unheated space must be wrapped in 1/2 inch closed-cell foam. Check for leaks before insulating.",
   "Horizontal vent runs must be supported every three to five feet and slope 1/4 inch per foot back toward the furnace so condensate drains back to the trap.",
   "Check the cabinet. It must be level end to end, with the access doors about 1/2 to 3/4 inch lower than the back so recuperator condensate runs forward to the front cover.",
   "If the horizontal alternate vent configuration is used, the RF000142 vent drain kit is required.",
   "On horizontal installs the trap hangs below the furnace and needs at least 5 1/2 inches of clearance and a downhill drain line. Protect trap and line wherever they can freeze.",
   "The drain line needs 1/4 inch per foot fall toward the drain and no second trap. Prime both sides of the furnace trap after any thaw or cleaning.",
   "Backed-up condensate in the secondary heat exchanger opens the front cover pressure switch, which keeps the gas valve shut. A blocked drain is also a listed cause of pressure switch faults."
  ],
  "manual": "goodman-two-stage-96-furnace-service",
  "pages": [
   9,
   10,
   13,
   20,
   53,
   61
  ],
  "source": "GMVC96 / AMVC96 / GCVC96 / ACVC96 (= Daikin DM96VC/DC96VC) Service and Troubleshooting, p.9, p.10, p.13, p.20, p.53, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-heat-sequence-pin-checks",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the heat sequence at the 12-pin connector — GR9S",
  "summary": "The R9S96 control checks the limit on Pin 8 and the pressure switch on Pin 5 of the 12-pin connector before it starts the inducer, so a meter on those pins tells you exactly where the sequence stopped.",
  "steps": [
   "With the thermostat calling, confirm the control board has 24 VAC on the W terminal.",
   "Check for 24 VAC on Pin 8 of the 12-pin connector. That is the limit circuit; no voltage there means chase the limit string, not the board.",
   "Before the inducer starts, Pin 5 (pressure switch circuit) must read 0 VAC. Voltage there at the start of the call is a stuck-closed switch or shorted wiring (EE1, pressure switch stuck closed).",
   "The control then checks the gas valve circuit (relay state and voltage at the valve) and energizes the induced draft blower.",
   "Pre-purge only starts once Pin 5 reads 24 VAC. Inducer running with no 24 VAC on Pin 5 is an open pressure switch (EE2).",
   "After pre-purge the igniter energizes; after warm-up the gas valve opens and the igniter drops out as soon as flame is sensed.",
   "The indoor blower should start on heating speed 30 seconds after that.",
   "When the call ends: gas valve off, inducer runs a 15 second post purge, and the blower runs its off delay (90 seconds by default, adjustable 30-180 seconds)."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   34,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.34, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-heat-blower-speed-delays",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Temperature rise out of range, cold air at start, or blower runs long after the burners shut off — GR9S",
  "summary": "On the single-stage R9S96 board the heat blower speed, heat on delay and heat off delay are all set from the push-button menu, and the heat speed is limited to four taps.",
  "steps": [
   "Run the burners about ten minutes with all registers open. Put thermometers in the return and supply as close to the furnace as possible, out of sight of the heat exchanger, and subtract return from supply.",
   "Compare the rise to the range on the rating plate. Increase blower speed to lower the rise; decrease it to raise the rise.",
   "To change heat speed, press left or right until the heat speed menu shows (gAF in the menu table; the speed-selection text calls it gA1), then press center to see the current Fxx.",
   "Only F01 through F04 are available for W/W1 on this single-stage board; F02 is the default. The new speed is applied on the next heating call.",
   "Cold blow at the start of the cycle: check the gas heat on delay (gnd). Default is 30 seconds, adjustable 5 to 30 seconds in 5 second steps.",
   "Blower running long after the burners shut off: check the gas heat off delay (gFd). Default is 90 seconds, adjustable 30 to 180 seconds in 30 second steps.",
   "Re-measure the rise after any speed change."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   34,
   37,
   40
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.34, p.37, p.40",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-a2l-mitigation-fan-only",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Furnace quit heating and only the blower runs (EAL, EAF, EAS, EAr) — GR9S",
  "summary": "The R9S96 board has a built-in R-32 leak function that shuts off gas heat and runs the blower at max airflow; four A2L codes put it in this mitigation mode, and only one of them is an actual refrigerant leak.",
  "steps": [
   "Read the display. EAL = sensor detected a refrigerant leak. EAF = furnace lost communication with the R-32 sensor. EAS = the sensor detected a fault. EAr = the A2L relay on the control board has a fault.",
   "In mitigation mode the control shuts down gas operation, energizes the optional ventilation and alarm outputs, and runs the fan at max CFM. No heat plus full blower is expected with any of these codes.",
   "Look at the green LED next to the sensor connection: blinking means the board is talking to the R-32 sensor; off means no signal.",
   "EAF: check the sensor wire connection for looseness and the wire for damage, then replace the sensor if needed. EAS: investigate and replace the R-32 sensor.",
   "EAL: leak-check the indoor coil. Once the sensor stops detecting a leak the fan keeps running 5 more minutes before the furnace goes back to normal operation.",
   "EAr: cycle power to the furnace; if it stays, replace the integrated control board. The manual notes this furnace may not be paired with an R-32 cooling unit.",
   "If the paired cooling unit does not use R-32, the A2L function (ON by default) must be turned off: press left or right until the display shows A2E, press center, select no, and press center to confirm.",
   "After the repair, prove the function with the A2u menu set to yes. It only runs with no active alarms or faults and exits on its own after a 5 minute timeout."
  ],
  "safety": "Only set A2E to no when the paired cooling equipment truly does not use R-32. With A2E off the control ignores all A2L functions.",
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   26,
   43
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.26, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-rollout-limit-trips",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat with E11 (rollout) or EE3 (high limit) — GR9S",
  "summary": "On the R9S96 the rollout switches are manual reset and point at gas pressure or burners, while the primary limit is automatic reset and points at airflow; the code tells you which way to go.",
  "steps": [
   "Read the code. E11 = open rollout switch. EE3 = open high limit switch (circulator blower runs continuously, no furnace operation).",
   "E11: the rollout limits are mounted on the burner/manifold assembly and are manual reset, so they will not come back on their own. Find the cause before resetting.",
   "For E11 the manual's checks are correct gas pressure, correct burner alignment, and burner restriction. Manifold pressure should be 3.2-3.8 in. w.c. on natural gas (3.5 nominal) and 9.7-10.3 on propane (10.0 nominal).",
   "Watch the flames with the burner door on: they should be stable, quiet, soft and blue, and must not curl, float, lift off, or hit the sides of the firing tubes.",
   "EE3: the primary limit is on the partition panel and is automatic reset. Check for blocked filters, restrictive ductwork, wrong circulator speed, a failed blower motor, or loose wiring in the high limit circuit.",
   "Measure total external static: return (negative) and supply (positive) at the furnace, add them, and compare to the rating plate maximum. If it is high, look for closed dampers or registers and bad duct layout.",
   "After the fix, confirm temperature rise is inside the rating plate range."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   31,
   36,
   37,
   38,
   41,
   43,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.31, p.36, p.37, p.38, p.41, p.43, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-manifold-gas-pressure",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Lazy flame, rollout or overfire - checking inlet and manifold pressure on the 36J22 valve — GR9S",
  "summary": "The R9S96 uses a White-Rodgers 36J22 valve with its own pressure taps; the manual gives the inlet range, the manifold range and how far the final setting may drift.",
  "steps": [
   "Inlet first: with the furnace and every other gas appliance on the line running, natural gas must be 4.5-10.0 in. w.c. and propane 11.0-13.0 in. w.c. Use the 36G/J pressure check kit 0151K00000S on the 36J22 inlet tap, or a hose fitting in the drip leg.",
   "For manifold: gas off at the external shutoff, power off. Back the outlet pressure test screw out one turn (counterclockwise, not more than one turn) and attach the manometer.",
   "Gas and power on, close R and W for a heat call, and read with the burners firing.",
   "Natural gas: 3.2-3.8 in. w.c., 3.5 nominal. Propane: 9.7-10.3 in. w.c., 10.0 nominal.",
   "Adjust only small amounts: remove the regulator cover screw, turn clockwise to increase or counterclockwise to decrease, then replace the cover screw.",
   "The final manifold setting cannot vary more than plus or minus 0.3 in. w.c. on natural gas or 0.5 on LP from the specified setting.",
   "Power and gas off, remove the hose, turn the outlet test screw back in (7 in-lb minimum), restore gas and power, and leak-check the screw with soap.",
   "Do not lower manifold pressure to derate at altitude; that causes incomplete combustion, flashback and yellow tipping. Use the listed high altitude kit (orifices and pressure switch)."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   26,
   27,
   36,
   37
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.26, p.27, p.36, p.37",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-ebl-ebu-blower-current",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Hard lockout with EbL or EbU on a heat call — GR9S",
  "summary": "The R9S96 board watches circulator blower current during the heat sequence and goes to hard lockout if it is too high during pre-purge (EbU) or too low after the heat on delay (EbL).",
  "steps": [
   "Note when the lockout happens. EbU (circulator current unexpected) is set during inducer pre-purge, when the main blower is drawing too much current. EbL (low circulator current) is set after the heat on delay, when the blower draws very little current.",
   "EbU: verify the wiring connections to and from the blower motor are not loose.",
   "EbU: verify the line voltage wires to the control and to the main blower motor are not reversed at the control.",
   "EbL: check for loose motor wiring connections.",
   "EbL with good wiring: check whether the blower motor is burnt and replace it if so."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   43,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.43, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-ee2-drain-freeze",
  "unit": "^(GR9S|AR9S)(?!\\d{6}[A-D]U)",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Inducer runs but nothing lights, EE2 on a cold day - condensate drain and freezing — GR9S",
  "summary": "The R9S96 pressure switches read through taps on the inducer and the coil front cover, so a backed-up or frozen condensate drain shows up as an open pressure switch.",
  "steps": [
   "Confirm EE2: pressure switch open, inducer runs continuously with no furnace operation.",
   "Remember what the switches watch: taps on the induced draft blower and the coil front cover. They guard against blocked condensate drain conditions as well as blocked venting.",
   "Inspect the pressure switch hoses for blockage, pinching or wrong connection.",
   "Make sure both sides of the drain trap are primed and the hoses do not sag or trap water.",
   "Check the field drain: 1/4 inch per foot downward slope toward the drain and no trap anywhere except the furnace trap.",
   "If the drain line runs through a space that sees temperatures near or below freezing, look for ice in the line; the manual requires protection there to keep condensate from freezing.",
   "If an AC coil shares the drain, there must be an open tee near the coil, no higher than the bottom of the furnace collector box.",
   "On a unit installed horizontal left side down, the front cover pressure switch tube must be moved to the lower port of the collector box cover.",
   "Then check flue and inlet piping for blockage and the inducer's performance."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   10,
   18,
   38,
   41
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.10, p.18, p.38, p.41",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-u-inducer-vfd-ebf",
  "unit": "^(GR9S|AR9S)96\\d{4}[A-D]U",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Inducer won't run or EbF - checking the three-phase VFD inducer on the GR9S96-U / AR9S96-U ultra-low NOx — GR9S",
  "summary": "On the 96% ultra-low NOx (-U) models the inducer is a three-phase motor driven by a VFD section of the furnace control, so the usual 120 V inducer check does not apply.",
  "steps": [
   "Confirm the model ends in -U. On R9S96*U the inducer is a three-phase motor driven at varying speeds by the VFD section of the integrated furnace control.",
   "The board test procedure's 120 V inducer check does not apply here; the manual sends R9S96*U models to the induced draft blower motor section instead.",
   "EbF (inducer communication alarm): check the red, black and white harness and its connections at the inducer and at the control board.",
   "Power off and ohm the motor across each pair of the three power wires (red, white, black). Windings should be equal within plus or minus 5 percent, 14-17 ohms at room temperature.",
   "Running, the IFC supplies 15-110 VAC between any two windings. The reading varies by model and with the firing percentage being called for, so a low reading alone does not fail it.",
   "The green wire is the ground; confirm it is connected."
  ],
  "manual": "goodman-amana-ar9s96u-service",
  "pages": [
   26,
   30,
   35
  ],
  "source": "AR9S96-U / GR9S96-U / VR9S96-U (Ultra-Low NOx) Service and Troubleshooting - 96% Single Stage Ultra-Low NOx Gas Furnaces GR9S96-U, AR9S96-U, VR9S96-U (RS6612302r2, March 2026), p.26, p.30, p.35",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-u-transducer-e1-codes",
  "unit": "^(GR9S|AR9S)96\\d{4}[A-D]U",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "E1b, E1C, E1d, E1E or E1F - pressure transducer checks on the GR9S96-U / AR9S96-U ultra-low NOx — GR9S",
  "summary": "The 96% ultra-low NOx (-U) models use a pressure transducer to set inducer speed for air-fuel ratio, and the E1x codes each point at a specific voltage or pressure check.",
  "steps": [
   "Know the part: 96% ULN models use a pressure transducer in place of a pressure switch, regulating inducer speed during the heat call. Sensing range is 0 to -2.0 in. w.c.",
   "Reference voltage: 5.0 VDC from red to green at the transducer harness input. E1b means the 5 VDC reference was out of 5.0 +/- 0.2 VDC for 5 seconds.",
   "Inducer off: output should be 0.25 VDC from black to green. If the board does not see it, you get E1C (null error). Check the red, black, white harness and the pressure hoses.",
   "Inducer running: output should move within 0.25-4.0 VDC. If it does not change, you get E1d (span error). Check the hoses to the pressure sensor and pressure switch; replace the pressure switch if the error continues.",
   "E1E means inducer RPM has reached its limit. Check the flue for blockage, length, elbows and termination before replacing the pressure sensor.",
   "E1F means the wrong pressure sensor is installed. Replace it with the proper part."
  ],
  "manual": "goodman-amana-ar9s96u-service",
  "pages": [
   29,
   35
  ],
  "source": "AR9S96-U / GR9S96-U / VR9S96-U (Ultra-Low NOx) Service and Troubleshooting - 96% Single Stage Ultra-Low NOx Gas Furnaces GR9S96-U, AR9S96-U, VR9S96-U (RS6612302r2, March 2026), p.29, p.35",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-u-sequence-lockout",
  "unit": "^(GR9S|AR9S)96\\d{4}[A-D]U",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Slow to light, then locks out - heat sequence, flame signal and lockout reset on the GR9S96-U / AR9S96-U ultra-low NOx — GR9S",
  "summary": "The -U ultra-low NOx service manual gives its own pre-purge, post-purge, flame current and igniter numbers, plus a one-hour automatic lockout reset.",
  "steps": [
   "Power up: all segments show 888, then IdL (idle). A heat call shows gh.",
   "On the call the control runs safety checks, then runs the inducer for a 30 second pre-purge. Igniter warm-up begins after that.",
   "The gas valve opens at the end of warm-up and stays open only if flame is detected. The circulator starts on heat speed after a thirty second on delay.",
   "When the call ends the gas valve closes and the inducer runs a thirty second post purge.",
   "Flame signal: put a microamp meter in series with the yellow sensor wire. Expect 3 to 8 microamps. Under 1 means check for high-resistance connections, sensor-to-burner gap, a dirty sensor or poor grounding. Clean with steel wool.",
   "Igniter: ULN furnaces use a 120V silicon nitride igniter, part 0130F00717, reading 20-100 ohms at room temperature.",
   "Lockout follows three failed ignition attempts. The control resets itself after one hour, or you can interrupt 120 V power. If the cause is still there it locks out again.",
   "Review stored faults in F10 (last ten faults); hold the option button 5 seconds there to clear them."
  ],
  "manual": "goodman-amana-ar9s96u-service",
  "pages": [
   7,
   8,
   14,
   29,
   30
  ],
  "source": "AR9S96-U / GR9S96-U / VR9S96-U (Ultra-Low NOx) Service and Troubleshooting - 96% Single Stage Ultra-Low NOx Gas Furnaces GR9S96-U, AR9S96-U, VR9S96-U (RS6612302r2, March 2026), p.7, p.8, p.14, p.29, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-u-gas-pressure-e11",
  "unit": "^(GR9S|AR9S)96\\d{4}[A-D]U",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "E11 burner box limit or weak fire - gas pressure on the GR9S96-U / AR9S96-U ultra-low NOx — GR9S",
  "summary": "The -U ultra-low NOx models are natural gas only, run a lower manifold pressure than other models, and use an auto-reset burner temperature switch that reports as E11.",
  "steps": [
   "These -U models are designed for natural gas only.",
   "Inlet pressure with all other gas appliances running: 4.5-10.0 in. w.c. Use adapter kit 0151K00000S on the White-Rodgers 36J22 valve.",
   "Manifold pressure with burners firing: 2.8-3.2 in. w.c. Bigger changes in gas flow are made with the burner orifice, not the regulator.",
   "E11 is an open burner box limit switch circuit. The manual's causes are gas pressure too high, misaligned burners, or a restricted heat exchanger or vent.",
   "The burner temperature switch on the burner assembly is normally closed and auto-reset. It opens when flames are not being drawn into the heat exchanger.",
   "Above 4500 ft, manifold adjustment and combustion analysis are required. Run at least 15 minutes before sampling and take the sample beyond the furnace exhaust."
  ],
  "manual": "goodman-amana-ar9s96u-service",
  "pages": [
   4,
   5,
   14,
   27,
   28,
   35
  ],
  "source": "AR9S96-U / GR9S96-U / VR9S96-U (Ultra-Low NOx) Service and Troubleshooting - 96% Single Stage Ultra-Low NOx Gas Furnaces GR9S96-U, AR9S96-U, VR9S96-U (RS6612302r2, March 2026), p.4, p.5, p.14, p.27, p.28, p.35",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gr9s-u-dual-fuel-ods",
  "unit": "^(GR9S|AR9S)96\\d{4}[A-D]U",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Dual fuel: Ed8, wrong blower speed or no defrost tempering on the GR9S96-U / AR9S96-U ultra-low NOx — GR9S",
  "summary": "The -U board must be told what outdoor unit it has through the OdS menu; heat pump fan speeds, HP delays and the defrost call all depend on it.",
  "steps": [
   "Fossil fuel installs need a heat pump thermostat with two stages of heat; follow the fossil fuel kit wiring.",
   "Set the equipment type in the OdS menu (AC1, AC2, HP1, HP2). Ed8 (invalid call) means the OdS setting does not match the outdoor unit. Put the system in IdL before setting OdS and TON.",
   "A defrost call is only generated when the heat pump is properly configured in OdS. During defrost the display shows dFt.",
   "Defrost with Y, O and W: blower starts at cooling speed after the cool on delay, then goes to the greater of cooling or gas heat speed after the gas heat on delay.",
   "Defrost with Y and W but no O: blower starts at HP heat speed after the HP heat on delay, then goes to the greater of HP heat or gas heat speed.",
   "Heat pump heating shows 1HP or 2HP. A Y2 call is ignored unless Y1 is also present.",
   "HP heat on delay (Hnd) defaults to 5 seconds; HP heat off delay (HFd) defaults to 60 seconds, adjustable 30 to 120."
  ],
  "manual": "goodman-amana-ar9s96u-service",
  "pages": [
   7,
   8,
   9,
   10,
   33
  ],
  "source": "AR9S96-U / GR9S96-U / VR9S96-U (Ultra-Low NOx) Service and Troubleshooting - 96% Single Stage Ultra-Low NOx Gas Furnaces GR9S96-U, AR9S96-U, VR9S96-U (RS6612302r2, March 2026), p.7, p.8, p.9, p.10, p.33",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-heat-sequence-pin-checks",
  "unit": "^GD9S",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the heat sequence at the 12-pin connector — GD9S downflow",
  "summary": "The R9S96 installation manual also covers the D9S96 downflow, and its control checks the limit on Pin 8 and the pressure switch on Pin 5 of the 12-pin connector before starting the inducer.",
  "steps": [
   "With the thermostat calling, confirm 24 VAC on the W terminal of the control board.",
   "Check for 24 VAC on Pin 8 of the 12-pin connector (limit circuit). No voltage means an open limit string.",
   "Before the inducer starts, Pin 5 must read 0 VAC (pressure switch open). Voltage there at the start is EE1, pressure switch stuck closed.",
   "The control checks the gas valve circuit and energizes the inducer. Pre-purge only begins once Pin 5 reads 24 VAC; no 24 VAC with the inducer running is EE2, pressure switch open.",
   "After pre-purge the igniter energizes; after warm-up the gas valve opens and the igniter drops out once flame is sensed.",
   "The indoor blower starts on heating speed 30 seconds later.",
   "When the call ends the inducer post-purges 15 seconds and the blower runs its off delay (90 seconds by default, 30-180 adjustable)."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   1,
   34,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.1, p.34, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-a2l-mitigation-fan-only",
  "unit": "^GD9S",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat and the blower is running hard (EAL, EAF, EAS, EAr) — GD9S downflow",
  "summary": "The D9S96 control shares the R-32 mitigation function in the R9S96/D9S96 manual: four A2L codes shut off gas heat and run the fan at max airflow.",
  "steps": [
   "Read the code: EAL = refrigerant leak detected; EAF = lost communication with the R-32 sensor; EAS = sensor fault; EAr = A2L relay fault on the control board.",
   "In mitigation the control shuts down gas, energizes the optional ventilation and alarm outputs and runs the fan at max CFM.",
   "Check the green LED by the sensor connection: blinking = talking to the sensor; off = no signal.",
   "EAF: check the sensor wire and connection, then the sensor. EAS: investigate or replace the sensor.",
   "EAL: leak-check the indoor coil. Normal operation returns once the leak is no longer detected and the 5 minute run-on ends.",
   "EAr: cycle power; replace the board if it stays.",
   "If the cooling unit does not use R-32, turn the A2L function off in the A2E menu (select no). It is ON by default."
  ],
  "safety": "Only set A2E to no when the paired cooling equipment truly does not use R-32.",
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   26,
   43
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.26, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-counterflow-trap-ee2",
  "unit": "^GD9S",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Inducer runs, no ignition, EE2 - checking the counterflow drain trap — GD9S downflow",
  "summary": "On the D9S96 counterflow the drain trap stays inside only for a left-side drain; a right-side drain relocates the trap and re-routes hoses, which is where condensate backups that open the pressure switch start.",
  "steps": [
   "Confirm EE2 (pressure switch open). The switches read through taps on the inducer and coil front cover and guard against a blocked condensate drain.",
   "Note which side the drain exits. Left side (preferred) keeps the factory trap and hoses as shipped; a right-side exit requires the trap relocated outside the cabinet.",
   "On a right-side setup, removing the gas manifold (four screws to the bracket) gives better access to the trap and hoses.",
   "Check the vent elbow drain hose (#10) on the vent-drain elbow barb and the collector box hose (#9) on the collector box drain port, both clamped.",
   "Pull the trap through its rubber coupling, clean it, and prime both sides before restart.",
   "Field drain: 1/4 inch per foot downward slope, no other trap, and protection from freezing if it passes through a cold space.",
   "If an AC coil drains into it, the open tee must be no higher than the bottom of the furnace collector box."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   18,
   20,
   21,
   38,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.18, p.20, p.21, p.38, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-horizontal-left-tube",
  "unit": "^GD9S",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Laid down left side down, keeps tripping or locking out - front cover tube and drain — GD9S downflow",
  "summary": "A D9S96 counterflow installed horizontal left side down needs the front cover pressure switch tube moved to the lower collector box port and the drain ports swapped; if it was left as shipped, condensate defeats the front cover switch.",
  "steps": [
   "Confirm the unit is a counterflow installed horizontal with left side down.",
   "Front cover pressure switch tube: it must run to the lower port of the collector box cover. The rubber plug moves from the bottom port to the top port, using the 24 in. x 1/4 in. tube from the bag.",
   "Collector box drain: the cap comes off the left-side drain port (bottom in this position) and goes on the right-side port; hose #4 goes on the collector box drain port with a clamp.",
   "Vent-drain elbow: the unused drip leg port must be plugged so flue gases cannot escape.",
   "Check for the 5 1/2 in. minimum clearance under the furnace for the drain trap.",
   "For a lockout after repeated ignition retries, the chart's checks include front cover pressure switch operation and proper drainage (hose, wiring, contacts)."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   10,
   22,
   41
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.10, p.22, p.41",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-top-return-filter-limit",
  "unit": "^GD9S",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Tripping the high limit (EE3) - top return filter size and static — GD9S downflow",
  "summary": "The D9S96 downflow takes its return through the top, and the manual lists a minimum top-return filter size per model; an undersized or restrictive filter is the first suspect for EE3.",
  "steps": [
   "EE3 = open high limit switch. The primary limit is on the partition panel, automatic reset, and trips when not enough air crosses the heat exchanger.",
   "Check the top-return filter against the minimum for the model: D9S960403 and D9S960603 take 2 - 10 x 20 or 1 - 14 x 25; D9S960804 takes 2 - 14 x 20 or 1 - 16 x 25; D9S961005 takes 2 - 14 x 20 or 1 - 20 x 25; D9S961205 takes 2 - 14 x 20 or 1 - 24 x 24.",
   "Avoid highly restrictive 1 in. filters with more than .25 in. w.c. pressure loss.",
   "With clean filters, measure return (negative) and supply (positive) static at the furnace and compare the total to the rating plate maximum.",
   "During heating, return air entering the furnace must be between 55 F and 100 F.",
   "After the fix, confirm temperature rise is within the rating plate range."
  ],
  "manual": "goodman-r9s96-furnace-install",
  "pages": [
   31,
   32,
   37,
   50
  ],
  "source": "R9S96 / D9S96 / R9S92 Single-Stage Furnace (R-32 ready) Installation Instructions - R9S96/D9S96/R9S92 Single-Stage Gas Furnace (IOG-2037A, 09/2023): R-32 sensor wiring, EAL/EAF/EAS/EAr codes, A2E/A2u menus, p.31, p.32, p.37, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-gd9s-gr9t-pressure-switch-e1-e9",
  "unit": "^GR9T",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Stuck on low fire or no heat with E1, E2, E8 or E9 - two-stage pressure switch checks — GR9T only",
  "summary": "The Daikin DR96TN/DD96TN service manual lists GR9T and AR9T as applicable models for its two-stage pressure switch flowchart; this does not apply to the single-stage GD9S.",
  "steps": [
   "Read the code. E1 = low pressure switch closed at start of the heat cycle; E2 = low pressure switch not closed. E8 = high pressure switch closed at start; E9 = high pressure switch not closed. With E8 or E9 the furnace runs low stage only.",
   "Stuck-closed codes (E1, E8): remove the wires and ohm the pressure switch terminals. Contacts stuck closed means replace the switch.",
   "If the switch is good, check the pressure switch circuit wiring for shorts to other wires or to ground.",
   "Not-closed codes (E2, E9): is the inducer running? If not, check its wiring, then voltage and amperage against the furnace and motor specs.",
   "Check the pressure switch hose for blockage, kinks, pinching or wrong connection.",
   "Check flue and inlet air for blockage, and pipe length, elbow count and termination against furnace specs.",
   "With a manometer, check the negative pressure at the switch to see if it is enough to close it.",
   "On a 90% furnace, check the drain system and the front cover pressure switch."
  ],
  "manual": "daikin-dr96tn-dd96tn-service",
  "pages": [
   36
  ],
  "source": "Service Instructions - DR96TN / DD96TN Two Stage Furnace with Nine Speed ECM Motor (RSD6612304, May 2024), p.36",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-mbvc-ec-heater-kit-mismatch",
  "unit": "^MBVC",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Strips won't come on and the board shows Ec — heater kit DIPs vs shared data — MBVC",
  "summary": "On the MBVC modular blower, Ec means the heater kit chosen on DIP switches 9-11 is too large, too small, or doesn't match the model's shared data; each version has its own symptom in heat.",
  "steps": [
   "Read the 7-segment display. Ec = heater kit too large, too small, or no match. A ComfortNet thermostat shows HTR TOO LARGE, HTR TOO SMALL or NO HTR MATCH.",
   "Too large: the strips fail to energize on a W1 or auxiliary/emergency heat call. Too small or no match: electric heat airflow is higher than expected.",
   "Set DIP switches 9, 10 and 11 to the installed heater's kW per the Electric Heating Air Flow table. The factory setting is 21 kW.",
   "No heater kit installed? Set 9, 10 and 11 to any valid heater setting anyway. That prevents Ec.",
   "Check the nameplate or spec sheet to confirm the installed heater is valid for this modular blower.",
   "If the DIPs are right, check that the shared data set matches the model. Re-populate it with the correct memory card: insert the card before turning power on, and turn power off before removing it.",
   "After setting the DIPs, reset power to clear an Ec shown at communicating-mode start-up."
  ],
  "safety": "Turn power off before changing DIP switches or handling the memory card.",
  "manual": "daikin-mbvc-blowercabinet-install",
  "pages": [
   8,
   9,
   14,
   18
  ],
  "source": "MBVC Series modular blower cabinet MBVC Blower Cabinet Installation Instructions (IO-438E, Dec 2017), p.8, p.9, p.14, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-mbvc-heat-airflow-dip-trim",
  "unit": "^MBVC",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Electric heat airflow too high or too low — heating speed left at 21 kW, trim taps — MBVC",
  "summary": "The MBVC heating blower speed ships set for 21 kW and has to be matched to the kit installed; the cooling trim setting also shifts electric heat airflow, and the green CFM LED lets you check the result at the unit.",
  "steps": [
   "The heating blower speed ships set at \"21 kW\". The installer has to change it to match the kit actually installed.",
   "Set S9, S10 and S11 to the installed kW on the Electric Heating Air Flow table (positions for 3, 5, 6, 8, 10, 15, 20 and 21 kW).",
   "Remember that the Adjust (trim) setting chosen for cooling also applies to electric heat airflow. With Trim Enable S8 ON, S3/S4 select Tap A +5%, B -5%, C +10% or D -10%. S8 OFF = 0% trim.",
   "Count the green CFM LED to check airflow: one blink per 100 CFM (8 flashes = 800 CFM).",
   "If airflow is lower than demanded (b9) or the motor is limiting (b3), check filters, restrictive or undersized ductwork, and that all registers are open before changing settings."
  ],
  "safety": "Disconnect electrical power before changing DIP switches.",
  "manual": "daikin-mbvc-blowercabinet-install",
  "pages": [
   6,
   8,
   9,
   17,
   18
  ],
  "source": "MBVC Series modular blower cabinet MBVC Blower Cabinet Installation Instructions (IO-438E, Dec 2017), p.6, p.8, p.9, p.17, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-mbvc-comfortnet-hp-airflow",
  "unit": "^MBVC",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Heat pump heat airflow doesn't follow the blower DIPs — ComfortNet airflow source and HT TRM — MBVC",
  "summary": "In a ComfortNet MBVC system the heat pump sets airflow in heat pump heating; the strips only take over airflow when their demand is greater, and heating airflow is trimmed from the thermostat menu.",
  "steps": [
   "Confirm it is a valid ComfortNet system: a ComfortNet modular blower, a ComfortNet AC or heat pump, and a CTK04 thermostat. Any other combination must be wired as a legacy system.",
   "Know who sets airflow. Heat pump heating only: the heat pump. HP plus strips: the greater of heat pump or air handler demand. Strips only: the air handler.",
   "So heat pump heat airflow comes from the outdoor unit's settings (see its IO), not from the MBVC cooling DIPs.",
   "Use Heat Airflow Trim (HT TRM) in the thermostat's modular blower menu: -10% to +10% in 2% steps, default 0%. The STATUS menu shows MODE and the CFM for the current mode.",
   "Check the wiring. Only data lines 1 and 2 run between the indoor and outdoor units, with a recommended maximum of 150 feet. The included 40VA transformer must be installed in the outdoor unit to power its control.",
   "In legacy mode the board shows P1/P2 for low/high stage heat pump heat. In ComfortNet it shows FH (fan heat)."
  ],
  "manual": "daikin-mbvc-blowercabinet-install",
  "pages": [
   10,
   11,
   12,
   18
  ],
  "source": "MBVC Series modular blower cabinet MBVC Blower Cabinet Installation Instructions (IO-438E, Dec 2017), p.10, p.11, p.12, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-goodman-mbvc-display-heat-modes",
  "unit": "^MBVC",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Board shows H1 when only the heat pump should be running — reading heat-mode display codes — MBVC",
  "summary": "The MBVC 7-segment display has separate codes for heat pump heat, electric heat, emergency heat, fan heat and defrost; on a legacy setup, defrost shows as H1, which looks like a stuck aux call.",
  "steps": [
   "Read the 7-segment display; the printed arrow points to the top of the display.",
   "Heat codes: P1/P2 = low/high stage heat pump heat (legacy only). H1/H2 = electric heat low/high. h1/h2 = emergency heat low/high (communicating only). FH = fan heat and dF = defrost (communicating only).",
   "In a legacy setup, defrost is displayed as H1. So H1 during a heat pump call on a legacy system can just be the defrost strips.",
   "Watch a full cycle. H1 that clears when the outdoor unit comes out of defrost is normal.",
   "If H1/H2 stays up with no defrost going on, the board is seeing an electric heat call. Check the thermostat W1/W2 wiring at the board.",
   "Solid On = standby, waiting for inputs. No display = internal control fault or no power."
  ],
  "manual": "daikin-mbvc-blowercabinet-install",
  "pages": [
   10,
   18
  ],
  "source": "MBVC Series modular blower cabinet MBVC Blower Cabinet Installation Instructions (IO-438E, Dec 2017), p.10, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-ps-wont-prove",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Inducer runs but the pressure switch won't close (E223/E227) — SLP99UHV",
  "summary": "Check the variable-speed inducer and the dual pressure switch against this furnace's own numbers before you blame vent calibration or the board.",
  "steps": [
   "Read the code first: E223 = low-fire switch failed open, E224 = low-fire switch failed closed, E225 / E226 = high-fire switch failed open / closed, E227 = low-fire switch opened during trial for ignition or run, E294 = inducer amp draw too high.",
   "Know the start check: the control will not start a heat cycle if the low-fire switch is already closed at idle, and will not go to high fire if the high-fire switch is already closed (it stays on low fire).",
   "Inducer (B6) specs: three-phase AC motor run by the furnace board's VFD, 60-180 Hz, 33-110 VAC, 0.75-1.0 A, 1000-5400 RPM. Check it is mounted right, the wheel turns freely, no air or condensate leaks, no missing or broken mounting screws.",
   "Power off and ohm the inducer windings: Lennox lists 16.74 / 14.26 ohms and says the readings should be within about 10% of each other. Then check each winding to ground - any continuity means a grounded motor.",
   "Measure the differential at the switch: with the stat off, tee into the negative line (red-and-black or red tubing) and the positive line (black tubing) between the switch and the cold end header box. Take one reading right after start-up and a second at steady state (about 5 minutes) - the second one is the differential. Both sides read negative; the + port just reads less negative.",
   "Compare to the switch set points (0-7500 ft): high fire 1.00 ±0.05 in. w.c. on every size; low fire 0.25 ±0.05, except the -090 60C at 0.15 ±0.05. Units installed above 7500 ft need the high-altitude pressure switch from Table 32 (14T65 on all sizes except the 090XV60C, which takes 20A87).",
   "Low differential points at the intake or exhaust piping first, but Lennox also lists the heat exchanger, condensing coil, header boxes and the inducer. The cold end header box orifice is size-specific (070 0.775, 090 36C/48C 0.890, 090 60C 0.840, 110 1.000, 135 1.100) - if the box was ever swapped, confirm it matches and that new gaskets went in with it.",
   "The switch is one assembly with both switches on a bracket - replace the whole assembly, not one switch. A jumper is for troubleshooting only and only after the inducer is already running; the unit won't fire with the switch jumped at the start."
  ],
  "safety": "The pressure switch is a safety shut-down control - never leave it jumpered.",
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   21,
   31,
   32,
   41,
   42,
   43,
   67
  ],
  "source": "SLP99UHV Unit Information, p.21, p.31, p.32, p.41, p.42, p.43, p.67",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-stuck-low-fire",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Lights fine but never gets to high fire — SLP99UHV",
  "summary": "On this variable-capacity furnace a high-fire pressure switch that won't prove, a closed high-fire switch at start, or airflow cutback will each hold the firing rate down.",
  "steps": [
   "Expect it to light at the 70% rate even when a second-stage call is already there - Lennox's flow chart says the system always lights at 70%.",
   "Two-stage thermostat mode: W2 has to stay on through the 30-second recognition delay. The inducer then goes to 100% speed and the high-fire pressure switch has to close within 10 seconds.",
   "On each miss the control raises inducer speed if it isn't already at 100%, flashes a code, waits 5 minutes and tries again. If the high-fire switch doesn't close within 5 attempts, the furnace runs low fire for the rest of that heat call. That is a switch or vent problem, not a thermostat problem - measure the differential at the switch (high-fire set point 1.00 ±0.05 in. w.c.).",
   "If the high-fire switch is already closed when the heat cycle starts, the control holds low fire. A stuck-closed high switch logs E226.",
   "Restricted airflow also holds the rate down: the control cuts firing rate and blower airflow 10% at a time until airflow is sustainable. E311 = heat rate reduced to match blower airflow; E291 = airflow lower than the minimum firing rate needs. Check the filter and duct - the blower is built for 0 to 0.8 in. w.c. total external static.",
   "On a conventional thermostat confirm DIP switch 1 (thermostat type) and switch 2 (variable capacity vs. conventional two-stage; factory is two-stage). On a communicating thermostat the DIP switches are ignored and the stat makes these settings.",
   "To watch it at a fixed rate, use Field Test mode with an R to W1 and W2 jumper to hold high fire - the display shows the firing rate, blower CFM and flame signal while all safeties stay in circuit."
  ],
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   21,
   24,
   27,
   32,
   40,
   78
  ],
  "source": "SLP99UHV Unit Information, p.21, p.24, p.27, p.32, p.40, p.78",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-limit-cutback",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Limit trips or the furnace keeps backing off its rate (E250/E274/E291) — SLP99UHV",
  "summary": "The SLP99UHV cuts its own rate on low airflow before the limit opens; read which code it logged, then check static, rise and the heating blower DIPs.",
  "steps": [
   "The primary limit (S10) is on the heating vestibule panel. It auto-resets and isn't adjustable. When it opens, the control runs the blower and shuts the gas valve.",
   "Before the limit, the board protects itself: on restricted airflow it drops the firing rate and blower airflow in 10% steps until airflow is sustainable. If it gets down to 35% and still can't get enough air, it shuts down into a one-hour Watchguard.",
   "Codes: E250 = limit circuit open; E274 = soft lockout, last recycle failed on the limit or the limit stayed open longer than 3 minutes; E291 = airflow below what the minimum rate needs; E311 = rate reduced to match blower airflow; E252 = discharge air temperature too high (gas heat).",
   "Measure external static with only the blower running and the coil dry: no more than 0.8 in. w.c. in heating.",
   "Check temperature rise on second-stage heat (with a single-stage stat let it fire at least 10 minutes first). Put the supply thermometer in the first horizontal run, out of sight of the heat exchanger. If the rise is over the rating plate range, check the firing rate first, then raise blower speed.",
   "Heating blower DIPs: 14-16 trim the low-fire speed, 17-19 trim the high-fire speed, each by ±7.5% or ±15% (table 9 / 10). All OFF (factory) gives 100% of normal speed on high heat, 70% on mid-range and 40% on low heat. On a communicating stat these are set at the thermostat.",
   "Blower-side codes that look like a limit problem: E292 = blower can't start (seized bearing, stuck wheel), E295 = blower motor over temperature, E201 = can't talk to the blower motor.",
   "Soft lockouts reset after one hour with a heat call present, by cycling the heat call, or by cycling power."
  ],
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   24,
   26,
   31,
   32,
   40,
   69,
   77
  ],
  "source": "SLP99UHV Unit Information, p.24, p.26, p.31, p.32, p.40, p.69, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-flame-ignitor",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Lights then drops out, or the ignitor won't glow (E240/E290/E207) — SLP99UHV",
  "summary": "Use the board's own flame readout, the 39-70 ohm ignitor spec and the neutral-to-C ground check before you replace parts.",
  "steps": [
   "Read flame signal without a meter: go to Field Test mode and the display shows it. SLP99UHV normal is 2.6 microamps or more, 2.5 or less is low, and drop-out is 1.1. Lennox notes a much higher reading (15, for example) can show up when you check it.",
   "The flame sensor sits on the left side of the burner support, on the rollout plate, with its tip in the left-most burner's flame. It comes out without pulling the burners. E240 = low flame current in run mode: clean or replace the sensor and check neutral to ground.",
   "Ignitor: silicon nitride. The board controls the 120 V it feeds the ignitor, so a regular digital meter reads a little low - use a true-RMS meter, or power off and ohm it: 39 to 70 ohms.",
   "E207 = ignitor sensed open (measure its resistance). E290 = ignitor circuit fault (failed ignitor or the triggering circuit). E270 = soft lockout after max retries with no flame (check gas flow, that the ignitor lights the burner, and flame current). E241 = flame sensed out of sequence: shut off the gas and check the valve for leak-through.",
   "Ground and voltage check (a poor ground shortens ignitor life): read AC volts from line neutral (spade terminal) to C on the low-voltage strip. Furnace idle: 0.3 expected, 2 max. Inducer and ignitor on: 0.75 expected, 5 max. Blower on: under 2 expected, 10 max. Over the max, fix the ground before you run the furnace.",
   "Line hot to line neutral at the control should be 97 to 132 VAC."
  ],
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   31,
   32,
   38,
   68
  ],
  "source": "SLP99UHV Unit Information, p.31, p.32, p.38, p.68",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-rollout-e200",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Dead furnace showing E200 hard lockout (flame rollout) — SLP99UHV",
  "summary": "E200 means a rollout switch opened. It only clears by cycling power, and the switch is manual reset - find the cause first.",
  "steps": [
   "E200 = hard lockout, rollout circuit open or previously open. A hard lockout clears only by cycling power to the control.",
   "There are two identical rollout switches (S47) inside the burner box. They are normally closed, manual reset, and wired in series with the primary limit S10. They trip at 210°F, fixed.",
   "When either one opens, the control stops ignition and closes the gas valve; if the furnace was running, the gas valve closes and the control is disabled.",
   "Lennox lists three causes: a blocked heat exchanger, a blocked flue, or lack of combustion air. Check the exhaust and intake runs and terminations before you reset anything.",
   "Reset by pushing the button in the center of the switch, then watch a full heat cycle. Always run the furnace with the burner box front cover in place.",
   "If it trips again, pull and inspect the burner assembly: on reassembly each burner has to be centered on its clamshell."
  ],
  "safety": "A rollout trip means flame left the burner area. Don't reset and leave until you've found the blockage or combustion air problem.",
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   31,
   38,
   77
  ],
  "source": "SLP99UHV Unit Information, p.31, p.38, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-freeze-drain-vent",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Pressure switch faults on the first hard freeze — frozen drain or exhaust (SLP99UHV)",
  "summary": "A frozen condensate line or an over-length uninsulated exhaust shuts this furnace down on the pressure switch; Lennox gives the drain protection and the uninsulated vent limits.",
  "steps": [
   "The pressure switch also shuts the burners down when condensate backs up into the cold end header box, secondary coil or vent, so a frozen or plugged drain shows up as pressure switch codes (for example E227, low-fire switch open during run).",
   "The condensate line has to run in conditioned space. If it can't, Lennox heat cable kits go on the trap and line: 26K68 (6 ft) or 26K69 (24 ft). Slope the line 1/4 in. per foot; the trap can sit up to 5 ft from the furnace on PVC.",
   "Exhaust in unconditioned space: Table 26 limits the uninsulated length by winter design temperature. Example, 090 on 2-in. PVC: 14 ft at 32 to 21°F, 6 ft at 20 to 1°F, 1 ft at 0 to -20°F. Count each elbow as 5 ft and a concentric termination as 5 ft.",
   "Over that length, insulate the exhaust with 1/2-in. Armaflex or equal (3/4-in. in extreme cold), protect the insulation from deterioration, and put it on the pipe closest to the furnace.",
   "No screens or perforated metal in the intake or exhaust terminations - Lennox says they cause freeze-ups.",
   "Winterizing and trap care: power off, pull the trap's drain plug into a shallow pan, inspect the trap, put the plug back and refill the trap.",
   "Prime the trap before restart: pour in 10 fl oz (300 ml), or run the burners about 3 minutes, let the inducer stop, and repeat once."
  ],
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   41,
   54,
   59,
   63,
   72
  ],
  "source": "SLP99UHV Unit Information, p.41, p.54, p.59, p.63, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-underfire",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Not enough heat or short of rated input — clocking and pressures (SLP99UHV)",
  "summary": "Prove supply pressure, meter clocking and the manifold/delta-P readings; on this furnace the gas valve is measured, not adjusted.",
  "steps": [
   "Supply pressure at the valve's supply tap with the furnace at maximum rate: natural 4.5-10.5 in. w.c., LP 11.0-13.0. Low pressure gives erratic operation or underfire. On multi-unit jobs check each furnace with the others on and off. The piping shouldn't drop more than 0.5 in. w.c. from meter to unit.",
   "Clock the meter after at least 5 minutes of run time with every other gas appliance off: time two revolutions and divide by two. Seconds per revolution on a 1 cu ft dial, natural: 070 = 55, 090 = 41, 110 = 33, 135 = 27 (2 cu ft dial: 110, 82, 66, 54). LP on a 1 cu ft dial: 136, 102, 82, 68.",
   "Manifold pressure is a differential reading: gauge + to the manifold tap, gauge - teed into the regulator vent hose (Lennox kit 10L34). Run low fire (35%) 5 minutes and read, then repeat on high fire.",
   "Natural: low fire 0.40-0.95, high fire 3.0-3.8 in. w.c. LP: low 1.2-2.8, high 9.1-10.5. The -090 60C natural low fire is 0.30-0.85.",
   "Operating signal (delta P) between the gas-valve and pressure-switch lines: low fire 0.20-0.40, high fire 0.95-1.25 (090 60C natural low fire 0.15-0.35).",
   "These are measurements only - Lennox says the SLP99 gas valve is not to be adjusted. If manifold pressure is right and the rate is still off, check the orifices for size and restriction.",
   "The burner box runs under negative pressure and the valve references it, so the vent configuration changes the rate. A restricted vent can look like a gas problem."
  ],
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   40,
   64,
   65,
   67
  ],
  "source": "SLP99UHV Unit Information, p.40, p.64, p.65, p.67",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-slp99-blower-heat",
  "unit": "^SLP99UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "No blower in heat, or the blower tries and quits (E292/E201) — SLP99UHV",
  "summary": "Prove the serial-link blower motor with Lennox's own plug tests before you swap the motor or the board.",
  "steps": [
   "The heating blower-on delay is fixed and not adjustable - the service manual says 45 seconds, the install manual says 30. Don't condemn the blower before it has had that long.",
   "The furnace won't run at all unless the blower harness is connected to the integrated control; the motor gets all its settings from the board over a serial link.",
   "Normal start: the motor rocks briefly, then soft-starts and can take 10-15 seconds to reach speed. If it doesn't reach 200 rpm within 13 seconds it shuts down and retries, up to eight tries, then locks out. Reset by turning power off for a moment.",
   "Line-voltage check: pull J48 (5-pin) off the motor. With power on and the door switch held in, read 120 V between pins 4 and 5.",
   "Run test: put J48 back, pull J49 (4-pin), and jumper 24 V to P49 pins 3 and 4 - the motor should run at 75%. Never put 24 V on pins 2 and 4; that permanently damages the motor. A TECMate PRO with the 16-to-4 pin adaptor also works; if the motor runs, don't replace it.",
   "Winding tests (power off, wait 5 minutes): each of the 3 motor leads to the unpainted end shield - under 100k ohms, replace the motor and control module. Lead to lead must be under 20 ohms and all three equal; over 20 ohms, replace.",
   "Some units have a separate blower drive in the control box with LEDs: 1 short blink = normal, 2-5 short blinks = drive fault, 1 long plus 1-3 short = temporary fault."
  ],
  "safety": "After power off, wait at least 5 minutes before touching the motor - its DC capacitors hold a charge.",
  "manual": "lennox-slp99uhv-service-unit-info",
  "pages": [
   24,
   35,
   36,
   37,
   38,
   64
  ],
  "source": "SLP99UHV Unit Information, p.24, p.35, p.36, p.37, p.38, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-ignition-sequence",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "No heat — walking the ignition sequence (and why it lights on high fire) — EL296UHV",
  "summary": "The EL296UHV runs a fixed two-stage sequence; knowing each timing and the high-fire fallback tells you where it is failing.",
  "steps": [
   "On a heat call the board checks that the limits are closed and the pressure switches are open, then starts the inducer on low speed.",
   "Low-fire pressure switch closes, then a 15-second prepurge on low speed. If the low-fire switch doesn't close, the inducer goes to high, the high-fire switch closes after a 15-second prepurge, and the furnace lights on high fire, then drops to low after 10-20 seconds. A furnace that always lights on high is telling you the low-fire switch isn't closing - find out why.",
   "After prepurge: 20-second ignitor warm-up, then the low-fire gas valve opens for a 4-second trial for ignition.",
   "No flame: it repeats the warm-up and trial four more times, then locks out the gas valve in Watchguard and retries by itself after 60 minutes. To skip the wait, move the thermostat from Heat to Off and back to Heat.",
   "Flame proven: the blower starts on low-heat speed after the on-delay (30 seconds on a conventional stat; a communicating stat can set 15-45 seconds), the HUM contacts close and the 120 V ACC terminal powers up.",
   "End of call: gas valve off, the selected blower-off delay starts and the inducer post-purges 5 seconds; the blower finishes the off delay at low-heat speed.",
   "If nothing happens at all, run the failure-to-operate list: access panels on, disconnect closed, fuse or breaker, filter, gas on at the meter, the manual main shut-off and the internal manual shut-off valve open."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   60,
   63,
   64
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.60, p.63, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-no-second-stage",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Never goes to second-stage heat — EL296UHV",
  "summary": "Second stage depends on DIP 1/2 with a conventional stat, a held W2, and the high-fire pressure switch proving.",
  "steps": [
   "DIP switch 1: OFF = two-stage thermostat (factory); ON = single-stage thermostat, and the board brings on second stage by itself after a delay.",
   "DIP switch 2 sets that delay: OFF = 7 minutes (factory), ON = 12 minutes. It only does anything when DIP 1 is ON.",
   "Two-stage stat: W2 must stay on for the 30-second recognition period. Then the inducer goes to high speed, the board checks that the high-fire (second stage) pressure switch is closed, and only then opens the high-fire valve and goes to high-heat blower speed.",
   "So if it never stages: confirm 24 V on W2 at the board, then confirm the high-fire pressure switch closes once the inducer is on high.",
   "When W2 is satisfied the inducer drops to low, the high-fire valve closes, low fire keeps going and the blower goes to low-heat speed. That step-down is normal.",
   "On a communicating system all DIP switch and clippable-link settings are ignored; staging is set at the thermostat.",
   "To confirm the valve is really on high, compare manifold pressure to Table 21: natural at 0-4500 ft is 1.7 in. w.c. low fire and 3.5 high fire."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   51,
   61,
   63,
   64
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.51, p.61, p.63, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-gas-pressure",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Short of heat — clocking and setting manifold pressure by altitude (EL296UHV)",
  "summary": "Unlike the modulating SLP99, the EL296UHV's White-Rodgers valve has high and low fire adjusters; set them to Table 21 for the altitude.",
  "steps": [
   "Clock the meter after at least 5 minutes of run time with other gas appliances off: time two revolutions and divide by two. Seconds per revolution on a 1 cu ft dial, natural: 045 = 80, 070 = 55, 090 = 41, 110 = 33, 135 = 27. LP: 200, 136, 102, 82, 68.",
   "Supply pressure: at the inlet post on the valve, back the 3/32 hex screw out one turn and connect 5/16 tubing to a manometer. Natural 4.5-13.0 in. w.c., LP 11.0-13.0 (0-10,000 ft). On multi-unit jobs check each furnace with the others on and off. The piping shouldn't drop more than 0.5 in. w.c. from meter to unit.",
   "Manifold pressure is a differential: gauge + to the manifold post (same 3/32 screw method), gauge - teed into the regulator vent hose (kit 10L34). Run low fire 5 minutes and read, then high fire.",
   "Natural, low / high fire: 0-4500 ft 1.7 / 3.5; 4501-5500 ft 1.6 / 3.3; 5501-6500 ft 1.5 / 3.2; 6501-7500 ft 1.5 / 3.1; 7501-10,000 ft 1.7 / 3.5. LP: 4.5 / 10.0; 4.2 / 9.4; 4.0 / 9.1; 3.9 / 8.9; 4.5 / 10.0.",
   "Adjust with the high-fire and low-fire screws under the caps on the valve. When done, turn both 3/32 screws back in one revolution and leak-check.",
   "Altitude: 7501-10,000 ft needs an orifice change; 4501-10,000 ft needs a pressure switch change (example 070: 14A54 for 4501-7500 ft, 14A53 for 7501-10,000 ft).",
   "If manifold pressure is right and the rate is still off, check the orifices for size and restriction.",
   "Combustion after 15 minutes at correct pressure: CO no more than 100 ppm; CO2 per Table 20 (example 070 natural: low fire 5.3-6.3%, high fire 7.4-8.4%)."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   36,
   59,
   60,
   61
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.36, p.59, p.60, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-vent-freeze",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Pressure switch trips on cold nights — exhaust freezing in an attic or crawlspace (EL296UHV)",
  "summary": "Table 7 limits how much uninsulated exhaust this furnace can have in unconditioned space, by size, pipe and design temperature.",
  "steps": [
   "Look up the winter design temperature (ASHRAE 99% table), then Table 7. Example, 070 on 2-in. PVC: 33 ft at 32 to 21°F, 19 ft at 20 to 1°F, 12 ft at 0 to -20°F. 090 on 2-in. PVC: 46, 28, 19 ft.",
   "Lengths are equivalent feet: each elbow counts as 5 ft and a concentric termination as 5 ft. The listed length can include the pipe outside the house; Lennox caps that outside piece at 5 linear feet (or the Table 5/6 maximum, whichever is less).",
   "Over the limit: insulate the exhaust with 1/2-in. Armaflex or equal (3/4-in. in extreme cold), protect it from deterioration (UV-rated Armaflex is OK), and put it on the pipe closest to the furnace.",
   "No screens or perforated metal in the intake or exhaust terminations - they cause freeze-ups and can block the terminations.",
   "Inspect the runs: pipes in place, sound, no holes, blockage or leaks, exhaust sloped back toward the furnace, terminations clear.",
   "An obstructed pipe or termination can also open the rollout switches - they are manual reset, on the burner box."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   24,
   25,
   63,
   65
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.24, p.25, p.63, p.65",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-condensate",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Water backing up, or pressure switch faults from the drain — EL296UHV",
  "summary": "Shared drains, trap vent height, freezing and dirty switch hoses all show up on the EL296UHV as pressure switch trouble.",
  "steps": [
   "On a common drain with the A/C coil, the A/C drain outlet has to be vented to relieve pressure or the furnace pressure switch won't operate properly.",
   "Field vent height above the drain outlet: upflow 1 in. minimum to 2 in. maximum; horizontal 4 in. minimum to 5 in. maximum. Any taller can flood the heat exchanger if the combined drain restricts.",
   "Slope 1/4 in. per foot toward the trap; the trap can be up to 5 ft away on PVC only. Horizontal: the trap must hang below the unit with 8 in. service clearance. No copper tubing or old copper drain lines.",
   "Freezing: keep the line in conditioned space, or add a Lennox heat cable kit to the trap and line - 26K68 (6 ft), 26K69 (24 ft) or 26K70 (50 ft).",
   "Check the unused cold end header box drain plug is tight so it can't leak.",
   "Service check: inspect the drain and trap for leaks or cracks, clean, and prime. Inspect the pressure switch hoses for cracks or loose ends; pull them off the cold end header box, clear any blockage, and clean any strainers in the hoses.",
   "Winterizing: power off, open the trap clean-out cap into a shallow pan, inspect, reinstall. Prime with 10 fl oz (300 ml), or run the burners about 3 minutes twice, letting the inducer stop in between."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   32,
   33,
   34,
   59,
   65,
   66
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.32, p.33, p.34, p.59, p.65, p.66",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-temp-rise-limit",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Limit trips or erratic limit — temperature rise and heat speed DIPs (EL296UHV)",
  "summary": "Lennox ties erratic limit operation on this furnace to an unadjusted temperature rise; set it with DIP 11-13 within the allowed steps.",
  "steps": [
   "Check temperature rise on a second-stage heat call after supply and return have stabilized, and compare it to the nameplate range. Lennox says an unadjusted rise can cause erratic limit operation.",
   "Raise blower speed to lower the rise, lower it to raise the rise, using DIP 11 / 12 / 13 (all OFF = factory). +6% = 11 on; +12% = 11 and 13 on; +18% = 11 and 12 on; +24% = all on; -6% = 13 on; -12% = 12 on; -18% = 12 and 13 on. The change applies to both high and low heat.",
   "Not every step is allowed: Table 23 says +18% and +24% are not allowed on the 110XV48C and 135XV60D.",
   "The heating blower tables are rated from 0 through 0.8 in. w.g. external static.",
   "Electrical: 120 VAC ±10% with the furnace running; blower amps with the blower access panel on, compared to the nameplate.",
   "The primary limit is on the heating vestibule panel (factory set). The two flame rollout switches are manual reset, on the front of the burner box.",
   "Test the limits by restricting airflow, not by unplugging the blower (Lennox Service and Application Note H049). A dirty or plugged filter will shut the furnace off on the limit."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   52,
   53,
   60,
   63,
   65,
   70
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.52, p.53, p.60, p.63, p.65, p.70",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-el296-blower-off-delay",
  "unit": "^EL296UH(V|\\d{3}XV)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Cold air at the end of the heat cycle, or the blower runs too long — EL296UHV",
  "summary": "The EL296UHV's blower-off delay is set on DIP 3 and 4; set it by supply temperature at shutoff.",
  "steps": [
   "The blower-on delay is fixed at 30 seconds on a conventional thermostat.",
   "Blower-off delay on DIP 3 / 4: 60 s = 3 on, 4 off; 90 s (factory) = both off; 120 s = 3 off, 4 on; 180 s = both on.",
   "Set it so supply air is 90 to 110°F at the moment the blower shuts off. Longer delays give cooler supply air; shorter ones give warmer.",
   "At the end of the call the inducer post-purges 5 seconds; the blower finishes its off delay at low-heat speed.",
   "On a communicating system the DIP switches are ignored - change the delays at the thermostat."
  ],
  "manual": "lennox-el296uhv-furnace-install",
  "pages": [
   51,
   63,
   64
  ],
  "source": "EL296UHV Two-Stage Variable-Speed Gas Furnace, p.51, p.63, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp20-heat-charge",
  "unit": "^XP20",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking charge in heating mode when it's below 60°F out — XP20",
  "summary": "The XP20 manual gives a heating-mode subcooling method with its own return-air and setpoint conditions; the targets are on the unit's charging sticker.",
  "steps": [
   "The unit has to run at 100%: raise the heat setpoint 5°F and confirm the outdoor control's 7-segment display reads 100% capacity.",
   "Below 60°F outdoor, check charge in heating mode; at 60°F and above, use cooling mode.",
   "Heating targets assume 65-75°F return air. If needed, run cooling to bring the house into that range, then set heat to 77°F to call for high-stage heat and let pressures settle.",
   "Gauges: low side on the suction service port, high side on the liquid line port; clamp a temperature sensor on the liquid line near the liquid port.",
   "Compare liquid and vapor pressures to the heating normal operating pressures on the unit's charging sticker (a general guide - big differences mean a charge or system problem).",
   "Subcooling = saturation temperature for the liquid pressure minus liquid line temperature. Compare to the sticker's heating target, including any line set or match-up adders: higher than the target, remove refrigerant; lower, add; then recheck.",
   "Lennox uses weigh-in for the initial charge and subcooling to verify it. Factory charge covers 15 ft of 3/8-in. liquid line (0.60 oz/ft; 5/16 = 0.40, 1/2 = 1.00 oz/ft)."
  ],
  "manual": "lennox-xp20-unit-info",
  "pages": [
   75,
   76,
   77
  ],
  "source": "XP20, p.75, p.76, p.77",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp20-hp-trip-heat",
  "unit": "^XP20",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "High pressure trips in heat (E412, then E413 lockout) — XP20",
  "summary": "In heating the indoor coil is the condenser; the XP20 manual points to low indoor or zone CFM along with the usual causes.",
  "steps": [
   "The high pressure switch (S4) opens at 590 psig and resets at 418 psig. E412 (moderate) = it opened; it clears when the switch closes or on a power reset.",
   "Each opening is a strike. Five within a single Y1 demand (the code table says within one hour) = E413 critical lockout. Fix the cause, then reset by cycling power to the outdoor control's R terminal. A demand that ends with no active alarm resets the counter.",
   "Heating-specific: Lennox says the indoor CFM may be set too low, and on zoned systems the zone CFM may be too low. Check the airflow settings first.",
   "Other causes Lennox lists for E413: charge, condenser fan motor, clogged TXV, blocked indoor blower, a stuck reversing valve, a clogged refrigerant filter, and a dirty outdoor unit.",
   "Prove the switch: disconnect its two wires from the control and ohm it - 0 ohms means closed.",
   "The thermostat diagnostics show high pressure switch status, compressor Hz and outdoor fan RPM - watch them while it runs."
  ],
  "manual": "lennox-xp20-unit-info",
  "pages": [
   43,
   52,
   53,
   56
  ],
  "source": "XP20, p.43, p.52, p.53, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp20-lp-trip-cold",
  "unit": "^XP20",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Low pressure trips in cold weather (E410 / E411) — XP20",
  "summary": "Know when the XP20 ignores its low pressure switch, and don't condemn a compressor that's just unloading on its vacuum protector.",
  "steps": [
   "The low pressure switch (S87) opens at 40 psig and closes at 90 psig.",
   "The control ignores the switch for the first 90 seconds of a demand, and ignores it completely when the outdoor temperature is below 15°F.",
   "E410 (moderate) = the switch opened. E411 (critical) = it opened 5 times within one hour and the unit is locked out; fix the cause, then cycle power to the outdoor control's R terminal.",
   "Lennox's checks for these codes: refrigerant charge, the TXV, the indoor blower, dirty filters, a clogged refrigerant filter, and coil cleanliness.",
   "Prove the switch: wires off the control, ohm it - 0 ohms means closed.",
   "Some scroll compressors have an internal vacuum protector: a hissing compressor with suction under 20 psig is the scrolls unloading. It resets once low side pressure is back above 40 psig. Don't replace the compressor for it."
  ],
  "manual": "lennox-xp20-unit-info",
  "pages": [
   43,
   51,
   53,
   56
  ],
  "source": "XP20, p.43, p.51, p.53, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp20-no-defrost-sensors",
  "unit": "^XP20",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor coil iced and not defrosting — sensor harness and E416 / E180 checks (XP20)",
  "summary": "On the XP20 a bad sensor, or a damaged resistor in the sensor harness, changes or stops defrost while the unit keeps heating.",
  "steps": [
   "Codes: E180 = outdoor ambient sensor problem; E416 = coil sensor open, shorted or out of range, so no demand or time/temperature defrost at all (the unit still heats); E424 = liquid line sensor.",
   "If the ambient sensor is open, shorted, or reads outside -35 to 120°F, the control drops back to time/temperature defrost. Heating is still allowed.",
   "Sensor harness pins: ambient on 4 and 3 (black sleeve), liquid line on 2 and 1 (yellow sleeve). The manual's harness drawing shows no sensor on pins 6 and 5, only a 10K resistor (listed range 314,669 to 3,779 ohms) that makes the display read a constant 77°F coil temperature - Lennox says that resistor is there because air conditioners don't need a coil sensor. If it is damaged or missing the control throws a false coil-sensor error; the replacement harness is 101334-05.",
   "Ohm the sensors at the harness pins and compare to Table 15: 77.0°F = 10,001 ohms, 32.4°F = 32,273 ohms, 0.0°F = 85,302 ohms. Lennox notes a reading outside the range can still be normal; an open or short means replace the harness.",
   "The push button gives access to a Defrost mode (display shows dF). Lennox's conditions for entering defrost: unit running in heat, outdoor ambient below 65°F, and coil temperature below the defrost termination temperature.",
   "Use the display's A option to show ambient, coil and liquid temperatures on the 7-segment during a demand (it goes back to default after a power cycle).",
   "After replacing an outdoor sensor, reconfigure the system at the thermostat. In heavy snow or freezing rain areas Lennox recommends snow guard top cover X8782."
  ],
  "manual": "lennox-xp20-unit-info",
  "pages": [
   38,
   39,
   40,
   41,
   43,
   44,
   67,
   68,
   69,
   70
  ],
  "source": "XP20, p.38, p.39, p.40, p.41, p.43, p.44, p.67, p.68, p.69, p.70",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp21-defrost-jumpers",
  "unit": "^XP21",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Coil not clearing in defrost, or the fan iced up after an off cycle — XP21 defrost jumpers",
  "summary": "The XP21's A175 control sets defrost termination with J1 and can auto-raise it with J3; MAX defrost exists for fan-icing weather.",
  "steps": [
   "Non-communicating: the unit runs on the A175 jumpers. Communicating: the jumpers are only defaults, used when the iComfort thermostat settings aren't available.",
   "Demand defrost watches ambient, coil temperature and total run time, and recalibrates at startup and after every defrost. Longer run times between defrosts as frost builds are normal. The coil sensor clips onto the outside coil tubing, and its location matters.",
   "J1 termination temperature: 50°F (factory), 70, 90, 100°F, or MAX. No jumper = MAX. Lennox notes colder climates may need a higher setting. A normal defrost (reversing valve in cooling, outdoor fan off) ends when the coil sensor reaches the J1 temperature or at 14 minutes, whichever comes first.",
   "J3 Defrost Auto: OFF from the factory (and if the jumper is missing) - defrost ends on the J1 setting. ON: the first defrost after power-up or after a cooling call uses J1. If heating runs less than 50 minutes between defrosts, the next termination goes up (under 70°F goes to 90°F; 70°F and up, or MAX, goes to MAX). If heating runs more than 1 hour between defrosts twice in a row, it comes back down (to the J1 setting, or 90°F if J1 is MAX).",
   "MAX defrost runs longer, to melt ice off the fan: it starts with the fan off; when the coil sensor reaches 90°F the outdoor fan cycles on at low speed (about 100 rpm); it ends after 5 minutes of fan-on time, a 110°F coil, or 19 minutes total. With J1 on MAX: when the compressor has been off more than 30 minutes and it's below 35°F outside, the next defrost is always MAX. Above 40°F ambient, MAX becomes a 90°F termination.",
   "Why MAX exists: Lennox's testing found ice on the fan blade and orifice ring most likely below 35°F after the unit had been off more than 30 minutes."
  ],
  "manual": "lennox-xp21-install",
  "pages": [
   7,
   8,
   9,
   10,
   11,
   21
  ],
  "source": "XP21, p.7, p.8, p.9, p.10, p.11, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-xp21-two-stage-heat-check",
  "unit": "^XP21",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Weak heat — is the compressor really shifting to high capacity? (XP21)",
  "summary": "Lennox's toggle-switch test on Y2 proves whether the XP21 two-stage compressor is moving from low to high capacity in heating.",
  "steps": [
   "Only valid with clean indoor and outdoor coils, proper airflow and correct charge.",
   "Main power off to the outdoor unit. Set the thermostat 5°F above room temperature (heat).",
   "Gauges on; amp clamp on the compressor harness common (black) wire; thermometer on the discharge line close to the compressor.",
   "Wire a toggle switch (open) in series with the Y2 out terminal on the outdoor control. Power up, let it settle (up to 10 minutes) and record the Y1 readings.",
   "Close the switch for Y2, confirm power reaches the compressor solenoid, let it settle up to 10 minutes and record again. In heating, hold at least 375 psig by blocking the indoor coil.",
   "Expected on Y2 vs Y1 in heating: compressor amps higher; outdoor fan amps same or higher; outdoor coil discharge air lower; discharge line hotter; indoor coil discharge air higher; liquid pressure higher; suction lower.",
   "If amps, pressures and temperatures don't change, the compressor isn't switching capacity - Lennox says replacement is necessary. A low-ambient or second-stage lock-in control may need a wire pulled for the test (the A175 has J2 second-stage lock-in temp: 40, 45, 50 or 55°F, factory 40°F, off if the jumper is missing).",
   "Put the unit back to its original setup when done."
  ],
  "manual": "lennox-xp21-install",
  "pages": [
   7,
   24,
   25
  ],
  "source": "XP21, p.7, p.24, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-sl25xpv-frost-defrost",
  "unit": "^SL25XPV",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Customer says the heat pump is frosted or steaming — normal SL25XPV defrost or a problem?",
  "summary": "What the SL25XPV install manual says is normal in heat, and the few things to check before you go deeper.",
  "steps": [
   "Frost on the outdoor coil below 45°F is normal. The control runs a 5-15 minute defrost at intervals; steam off the unit is normal, and the thermostat may bring on auxiliary heat during defrost.",
   "Defrost is demand-based: the control watches ambient, outdoor coil temperature and total run time, and recalibrates when defrost starts and after each defrost. Longer run times between defrosts as frost builds are expected, not a fault.",
   "The coil temperature sensor is held on the outside coil tubing by a spring clip. Lennox says its location matters - make sure it's clipped on securely.",
   "Keep snow below the louvered panels.",
   "All outdoor unit configuration is done at the iComfort S30 thermostat. Alarm lists are on the outdoor access panel and in the S30 setup guide.",
   "The full defrost description isn't in this manual - it sends you to the detailed Installation and Service Procedures manual on LennoxPros (the text names Corp. 1252-L11, the XP25 document)."
  ],
  "manual": "lennox-sl25xpv-ac-install",
  "pages": [
   19,
   21
  ],
  "source": "SL25XPV Heat Pump, p.19, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml16xp1-defrost-a108",
  "unit": "^ML16XP1",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Iced coil or defrost not working — A108 demand defrost board (ML16XP1)",
  "summary": "Read the A108 LEDs for a sensor fault, then check the termination shunt, TEST pins and DELAY jumper.",
  "steps": [
   "DS1 (red) and DS2 (green) both fast flashing at the same time = ambient sensor problem: the board falls back to time/temperature defrost and still heats.",
   "Alternating fast flash = coil sensor problem: the board does no demand or time/temperature defrost at all, but still heats and cools.",
   "The control watches ambient, coil temperature and total run time. The coil probe clips onto the outside coil tubing and its location matters. Longer run times between defrosts as frost builds are normal.",
   "Termination temperature (P1 shunt): 50, 70, 90 or 100°F. Factory is 50°F. No shunt = 90°F.",
   "TEST pins (P1): a jumper lets you cycle the unit into and out of defrost, force a defrost to clear the coil, and clear the short-cycle and 5-strike lockouts.",
   "DELAY pins (P5), jumper on from the factory: the compressor shuts off for 30 seconds going into and out of defrost to cut noise. That 30-second off doesn't happen when you're using the TEST pins.",
   "Normal for the customer: frost forms below 45°F and defrost runs 5-15 minutes."
  ],
  "manual": "lennox-ml16xp1-install",
  "pages": [
   13,
   14
  ],
  "source": "ML16XP1, p.13, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml16xp1-pressure-lockout",
  "unit": "^ML16XP1",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Stops in heat with pressure fault LEDs or locks out — ML16XP1",
  "summary": "The A108 LEDs tell you which pressure switch and whether it's a strike or a lockout.",
  "steps": [
   "Low pressure: DS2 off with DS1 slow flash = fault (a strike); DS2 off with DS1 on = lockout. High pressure: DS2 slow flash with DS1 off = fault; DS2 on with DS1 off = lockout. Five strikes on one code = lockout.",
   "The high pressure switch (S4) on the liquid line opens above 590 ±15 psig and resets at 418 ±15 psig.",
   "Lennox's causes and fixes: restricted airflow over the indoor or outdoor coil (clear the coils and fans, check both fan motors' current draw), wrong charge (check by subcooling), wrong or misbehaving metering device (compare pressures to the subcooling tables on the access panel), and loose sensor or switch connections.",
   "Not faults: both LEDs slow flashing together = normal operation; alternating slow flash = 5-minute anti-short-cycle delay (jumper TEST to skip it).",
   "Both LEDs on = board failure: cycle 24 VAC to it, and replace if it doesn't clear. Both off = no 24 V at R and C, or a dead board.",
   "After fixing the cause, jumper the TEST pins to clear the lockout."
  ],
  "manual": "lennox-ml16xp1-install",
  "pages": [
   13,
   14
  ],
  "source": "ML16XP1, p.13, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml16xp1-emergency-heat-restart",
  "unit": "^ML16XP1",
  "brand": "Lennox",
  "equipment": "Condenser/Heat Pump",
  "title": "Bringing the heat pump back after a long winter power outage — ML16XP1",
  "summary": "Lennox says to run on emergency heat for hours before the compressor restarts after a cold outage, to protect it from slugging.",
  "steps": [
   "If power was off more than an hour and it's below 50°F outside, put the thermostat in emergency heat and leave it there at least six hours so the crankcase heater can protect the compressor from slugging.",
   "Emergency heat (amber light on the stat) cuts power to the outdoor unit's control circuit; field-provided relays bypass any outdoor thermostats so the backup heat can run.",
   "Use the same emergency heat position whenever the outdoor unit has to be shut down for service.",
   "On a new start-up, a unit with a crankcase heater should have it energized 24 hours before start-up.",
   "Low-voltage wiring with auxiliary heat per the manual: R, C, W1 (first-stage aux heat), G, O (reversing valve), Y1 (compressor); the emergency heat version adds E and an emergency heat relay, with an outdoor thermostat on the aux heat."
  ],
  "manual": "lennox-ml16xp1-install",
  "pages": [
   11,
   13
  ],
  "source": "ML16XP1, p.11, p.13",
  "confidence": "manual"
 }
];
