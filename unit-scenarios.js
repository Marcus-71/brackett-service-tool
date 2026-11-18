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
  "unit": "^[AD]MST[0-9]{2}[A-Z]U13",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strips cycling on limit or running too hot — speed tap below the M.B.S. — AMST / DMST",
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
  "unit": "^[AD]MST[0-9]{2}[A-Z]U13",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Strip heat feels weak or too hot — check airflow with a temperature rise — AMST / DMST",
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
  "unit": "^[AD]MST[0-9]{2}[A-Z]U13",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "All strips come on together, or the second bank never does — W1/W2 jumper and outdoor thermostats — AMST / DMST",
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
  "unit": "^[AD]MST[0-9]{2}[A-Z]U13",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Weak airflow in heat pump heat with a single-stage heat pump — Y not on Y2 — AMST / DMST",
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
  "unit": "^[AD]MST[0-9]{2}[A-Z]U13",
  "brand": "Daikin",
  "equipment": "Air Handler",
  "title": "Heat kit just installed and no strip heat — HKTS kit, EHK plug, transformer — AMST / DMST",
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
  "unit": "^AMVT[0-9]{2}[A-Z]P13",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Heat kit installed but strips never come on — EHt menu still at 0 — AMVT",
  "summary": "The AMVT control has to be told which heater kit is installed; the Electric Heating Wattage menu ships at 0 (no heat kit), and the app has a strip test for each stage.",
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
  "unit": "^AMVT[0-9]{2}[A-Z]P13",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Strips running all the time and the heat pump seems locked out — Comfort Setting logic — AMVT",
  "summary": "With a communicating heat pump, the AMVT decides when to add or stay on electric heat from a target runtime and strike counts; several long cycles in a row make the strips the temporary primary heat source.",
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
  "unit": "^AMVT[0-9]{2}[A-Z]P13",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "DFT on the display during an aux heat call, or strips/heat pump acting wrong — thermostat setup — AMVT",
  "summary": "The AMVT board has no O input and takes a single W for all heat, so the thermostat setup is different from a normal heat pump; on a legacy heat pump the display reads DFT any time Y and W are on together.",
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
  "unit": "^AMVT[0-9]{2}[A-Z]P13",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Low or wrong airflow in heat pump heat with a non-communicating heat pump — ton, HtF and delay menus — AMVT",
  "summary": "With a non-communicating heat pump, AMVT heat pump airflow comes from the ton menu (tonnage x 400) plus the heating trim, with its own low-stage percentage and on/off delays.",
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
  "unit": "^AMVT[0-9]{2}[A-Z]P13",
  "brand": "Goodman",
  "equipment": "Air Handler",
  "title": "Cool air during defrost or strips running on low airflow — electric heat menus and temp rise — AMVT",
  "summary": "The AMVT has separate menus for electric heat on/off delay, airflow trim, low-stage percentage, combined HP-plus-strip trim and which strip stage runs in defrost; the display tells you which stage the board is calling.",
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
 },
 {
  "id": "u-daikin-altherma-upra-error-screen",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading, clearing and finding past error codes - Altherma 3 H HT W (UPRA)",
  "summary": "On the Altherma user interface the error help text, the reset and the error history are all in the menus. Read the full description before you reset anything.",
  "steps": [
   "When there is an error, the home screen shows an error or malfunction symbol. Press the left dial to open the main menu and go to Error. It shows the error code and a short description.",
   "Press again in the error screen to get the long description of the error.",
   "To clear it: from that error help screen go to Reset and press the left dial.",
   "To see past errors, the user permission level must be set to advanced end user. Then go to [8.2] Information > Error history for the most recent errors.",
   "Running hours of each component are under [8.9] Information > Running hours.",
   "If the fix needs a power reset and the indoor unit has its own power supply, reset the indoor unit's power too, not just the outdoor unit."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   22,
   23,
   24
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.22, p.23, p.24",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-7h-water-flow",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "7H water flow error, unit stops - Altherma 3 H HT W (UPRA)",
  "summary": "7H means the unit saw too little water flow. Most causes are in the water piping (closed valve, air, low pressure, no bypass, dirty filter), so work the water side first.",
  "steps": [
   "7H-01 resets by itself. It trips when flow drops below 1.59 gal/min (6 l/min) in heating or hot water without the backup heater, 3.17 gal/min (12 l/min) with the backup heater, 3.96 gal/min (15 l/min) in cooling, 4.76 gal/min (18 l/min) in defrost above 14F (-10C) and 5.28 gal/min (20 l/min) in defrost below 14F.",
   "After 11 automatic resets of 7H-01 it becomes 7H-04 (mostly during hot water) or 7H-05 (mostly during space heating). After 2 resets it becomes 7H-06 (cooling or defrost). These need a manual reset at the user interface.",
   "First check that every stop valve in the water circuit is open. They are outside the unit; open means the handle is in line with the pipe.",
   "Purge the air out of the water circuit. Air purge valves belong at every high point of the system and nowhere else.",
   "Read the water pressure on the home screen of the user interface. It must be 14.5-29 PSI (1-2 bar). Add or drain water until it is.",
   "Check the flow: open the heat emitters, start the air purge from the user interface with pump speed High. Minimum flow is 6 gal/min (22 l/min) for heating/cooling start-up, defrost or backup heater, and 7.5 gal/min (28 l/min) for hot water.",
   "A bypass must be installed in the water circuit outside the unit so water still flows when every zone is shut. No bypass is a listed cause.",
   "Still tripping: clean the built-in filter of the shutoff valve and the magnetic filter / dirt separator, then check the water flow sensor, the 3-way valve and the water pump (component checks in the manual)."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   24,
   25,
   26,
   282,
   283,
   284
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.24, p.25, p.26, p.282, p.283, p.284",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-7h07-pump-blocked",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "7H-07 pump unblocking, or water pump stuck after a long shutdown - Altherma 3 H HT W (UPRA)",
  "summary": "7H-07 means the unit thinks the water pump may be blocked and is running its own unblocking routine. A pump left without power for a long time can be stuck with lime.",
  "steps": [
   "7H-07: the unit keeps running and runs a pump unblocking routine for up to about 30 minutes. The code shows the whole time. There is nothing to repair; wait for it to finish and the code clears itself.",
   "The pump has an anti-blockage routine that runs it briefly every 24 hours during long idle periods. It only works if the unit has power all year round.",
   "If the unit was powered off for a long time, lime can lock the pump rotor. Remove the screw of the stator housing and turn the ceramic rotor shaft back and forth with a screwdriver until it frees up. Do not force it.",
   "If the shaft will not free up that way, the pump has to be taken apart and the rotor turned by hand."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   26,
   98
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.26, p.98",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-aa01-backup-heater",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "AA-01 backup heater overheated - Altherma 3 H HT W (UPRA)",
  "summary": "AA-01 means the backup heater thermal protector opened because the water got too hot. Find out why the water overheated before you reset it.",
  "steps": [
   "The unit stops. To reset: power the unit OFF, manually reset the backup heater thermal protector, then power it back ON.",
   "Check the water pressure on the user interface home screen: it must be 14.5-29 PSI (1-2 bar).",
   "Check the water flow, then purge any air from the water circuit.",
   "Look for an outside heat source tied into the water circuit that could be pushing the water temperature up.",
   "If the water side is fine, check in this order: the backup heater thermal protector, the outlet water after backup heater thermistor, the backup heater itself, then the hydro PCB."
  ],
  "safety": "Power the unit off before resetting the thermal protector or touching the backup heater.",
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   34,
   282,
   283
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.34, p.282, p.283",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-u0-13-low-charge-heating",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "U0-13 refrigerant shortage in heating - Altherma 3 H HT W (UPRA)",
  "summary": "U0-13 means the outdoor unit detected a refrigerant shortage while heating. The manual checks valves and sensors before charge, so do not add refrigerant first.",
  "steps": [
   "The unit stops. It needs a power reset at the outdoor unit to clear.",
   "Check the expansion valves first.",
   "Check the suction pipe thermistor, then the discharge pipe thermistor, including their connectors.",
   "Check for non-condensables or moisture in the refrigerant circuit, then check that the charge is correct (this unit uses R-32).",
   "Check the refrigerant pressure sensor, then the compressor and its power wiring for a miswire.",
   "For a refrigerant shortage (U0-00) the manual's last step is a leak search: look for oil traces on the units, check the brazed joints on the field piping and do a pressure test."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   71
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-u4-u5-communication",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "U4-00 or U5-00 communication error - Altherma 3 H HT W (UPRA)",
  "summary": "U4-00 is lost communication between the outdoor unit and the indoor side; U5-00 is lost communication with the user interface. Start with power quality and wiring.",
  "steps": [
   "U4-00: the unit stops and needs a power reset at the outdoor unit. If the indoor unit has its own power supply, reset it too.",
   "Check the power supply is within +/-10% of the nominal voltage, with no power drops or shorts.",
   "Check power, connections and wiring between the outdoor unit, the indoor unit and the separate hot water tank (if there is one).",
   "Then check the outdoor unit fan motor, then the hydro PCB.",
   "U5-00: resets by itself. Check the communication wiring between the user interface and the unit PCB, then that the user interface has power, then the user interface itself, then the hydro PCB, then the power supply."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   24,
   74,
   75
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.24, p.74, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-no-start",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "No heat, system does not start - Altherma 3 H HT W (UPRA)",
  "summary": "With no error code, most no-start calls on this unit are settings: heating not turned on, the control method set wrong, or the clock and schedules wrong. Then check the PCB heartbeat LEDs.",
  "steps": [
   "Confirm space heating (and hot water) is turned on at the user interface.",
   "Check the unit control method, setting [C07]: 1 = external room thermostat (the contact starts and stops it), 2 = room thermostat control (compares the setpoint with the room temperature; the switching band is setting [90C]), 3 = leaving water temperature control. It must match how the job is wired. An external room thermostat with [C07] at 2 is wrong.",
   "Check the space heating OFF temperature, setting [402]: keep it at 95F (35C). The table lists outdoor temperature above 95F (35C) as out of the operating range.",
   "Wrong date or time stops schedules from running. It happens when the clock was never set after start-up, after more than 48 hours without power, or with daylight saving set wrong.",
   "If the job uses a reduced-tariff power supply, its settings must match the electrical connections.",
   "Look at the HAP LED on the hydro PCB and on the outdoor unit PCB: it should blink at regular intervals. Power and transformer OK but the LED not blinking = replace that PCB. Also check the reactor coil for continuity.",
   "Starts, then stops right away: the manual lists overcharge or air in the refrigerant. Recover, vacuum and weigh in the correct charge."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   92,
   96,
   97,
   98
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.92, p.96, p.97, p.98",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-heating-short",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Not enough heat - Altherma 3 H HT W (UPRA)",
  "summary": "Low heating output on this unit is often setpoints or settings that keep the backup heater off or keep the unit busy making hot water.",
  "steps": [
   "Check the leaving water setpoint and the room thermostat setpoint. If Outdoor Reset control is on, check the outdoor temperature to setpoint curve too.",
   "Confirm space heating is turned on.",
   "Check setting [C07] matches the control used (an external room thermostat with [C07] at 2 is wrong).",
   "Check backup heater operation, setting [400]. 0 = backup heater off and 2 = hot water only; change it to 1.",
   "Check hot water mode, setting [60D]. At 0 (reheat only) the unit spends too much time on hot water and too little on heating. The manual advises the factory setting (reheat + schedule) with the hot water schedule set for times when no space heating is needed.",
   "Check the 3-way valve is mounted correctly and switches between the space heating side and the hot water side."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   92
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.92",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-altherma-upra-ice-buildup",
  "unit": "^(UPRA0(36|43)D|UTBX040E)",
  "brand": "Daikin",
  "equipment": "Condenser/Heat Pump",
  "title": "Ice building up on the outdoor unit - Altherma 3 H HT W (UPRA)",
  "summary": "The manual separates ice from blocked drains or weather from ice caused by a refrigerant problem. Where the ice sits tells you which.",
  "steps": [
   "Ice on the casing or snow on the unit: unclog the drain holes, remove scraps that ice can build on, and remove the ice.",
   "General ice build-up or the unit cannot defrost in strong wind or snow: the outdoor unit must be protected from the weather as the installer reference guide shows.",
   "Defrost not clearing the coil, or ice at the spot where refrigerant enters the coil: the manual points to a refrigerant shortage. Check the charge and look for leaks.",
   "Only part of the coil icing: check for a partial blockage in the refrigerant circuit and for a dirty coil."
  ],
  "manual": "daikin-altherma-3-h-ht-w-upra-service",
  "pages": [
   87
  ],
  "source": "Altherma 3 H HT W air-to-water monobloc heat pump UPRA036DVK / UPRA043DVK with UTBX040E hot water tank (R-32) Service Manual - Daikin Altherma 3 H HT W, UPRA036+043D + UTBX040E (ESIE25-03, 2026.02) - error codes, symptom troubleshooting, component checks, water circuit, p.87",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9v2ps-no-heat-read-display",
  "unit": "^S9V2[A-D][0-9]{3}[UD][0-9]PSAA",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "No heat: read the display and the last 6 faults first — S9V2 PS",
  "summary": "The S9V2 PS guide has no troubleshooting chart - the 7-segment display, the fault list and the sequence of operation are what it gives you.",
  "steps": [
   "Read the 7-segment display on the IFC. IdL = idle (no thermostat demand); Ht1 / Ht2 = first / second stage heating; ArF = airflow times 10 (080 = 800 CFM). (p.96)",
   "Idle with the thermostat calling: check for 24 VAC from W1 to B/C at the furnace - the guide says a tech should read 24 VAC there on a 1st stage call. (p.98)",
   "Stored faults: press Menu until L6F shows, then press Option to enter the menu; the last 6 faults can be viewed. Err is the active alarm menu. (p.96, p.97)",
   "Write the codes down before clearing. To clear: in L6F hold Option at least 5 seconds; three dashes show 3 times. (p.97)",
   "E2.1 and E2.2 are one-hour lockouts (flame never sensed after 3 tries / flame lost after 10 recycles). (p.96)",
   "Resetting Factory Defaults is a separate procedure (display in Idle, Menu + Option together for 15 seconds, Fd flashes 3 times): it resets the unit to the factory defaults, it is not how faults are cleared. (p.97)"
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace (p.2). If operating checks must be performed with the unit operating, it is the technician's responsibility to recognize these hazards and proceed safely (p.4). Do NOT attempt to manually light the furnace (guide warning, p.63).",
  "manual": "trane-s9v2-ps-furnace-install",
  "pages": [
   96,
   98,
   97
  ],
  "source": "S9V2 PS (S9V2xxxxxPSAA, 2-stage inducer) Installer's Guide - Upflow/Horizontal and Downflow Gas-Fired, Direct/Non-Direct Vent, 2-Stage Condensing Variable Speed Furnaces (18-CE01D1-1E-EN, 11/2016), p.96, p.98, p.97",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9v2ps-inducer-no-ignition",
  "unit": "^S9V2[A-D][0-9]{3}[UD][0-9]PSAA",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Heat call, but the igniter never glows (E3.1 / E3.2 / E04 / E09) — S9V2 PS",
  "summary": "Follow the IFC's own pre-ignition checks in the order the S9V2 PS guide lists them.",
  "steps": [
   "Order of the self-check on a W1 call: (a) condensate pressure switch and inducer limit switch closed - 24 VAC out HLO, read back on ILI (pin 1); (b) rollout switches 1 and 2, main thermal limit and any reverse airflow switch closed - out HLO (pin 4), back on HLI (pin 11); (c) PS1 and PS2 proved OPEN on pins 3 and 7. (p.98)",
   "E09 = step (a) failed: open inducer limit switch or condensate pressure switch. (p.97)",
   "E04 = step (b) failed: main thermal limit, a rollout switch or the reverse airflow switch is open. (p.96)",
   "E3.1 / E3.3 = PS1 / PS2 read closed (shorted) at step (c), before the inducer runs. (p.96)",
   "Only after a, b and c pass does the inducer relay close for 1st stage inducer. PS1 must then close - if it does not, E3.2. The igniter relay closes only when PS1 closes. (p.98, p.96)",
   "No 24 VAC at either pressure switch does not condemn the switches: the guide notes that with a thermal limit open, 24 VAC will not be present at either pressure switch. Find the open limit first. (p.98)"
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace (p.2). If operating checks must be performed with the unit operating, it is the technician's responsibility to recognize these hazards and proceed safely (p.4). Do NOT touch igniter. It is extremely hot (p.6).",
  "manual": "trane-s9v2-ps-furnace-install",
  "pages": [
   98,
   97,
   96
  ],
  "source": "S9V2 PS (S9V2xxxxxPSAA, 2-stage inducer) Installer's Guide - Upflow/Horizontal and Downflow Gas-Fired, Direct/Non-Direct Vent, 2-Stage Condensing Variable Speed Furnaces (18-CE01D1-1E-EN, 11/2016), p.98, p.97, p.96",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9v2ps-ignition-lockout",
  "unit": "^S9V2[A-D][0-9]{3}[UD][0-9]PSAA",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Igniter glows, burners do not stay lit (E2.1 / E2.2 / E08) — S9V2 PS",
  "summary": "Timing and flame-current figures from the S9V2 PS sequence of operation.",
  "steps": [
   "Normal order: PS1 closes, the igniter relay closes and the igniter warms up about 20 seconds, then the 1st stage gas valve relay closes. The first burner lights, flame crosses over to the rest, and flame must be sensed within 4 seconds. (p.98)",
   "E2.1 = flame never sensed, one-hour lockout after 3 times. E2.2 = flame sensed then lost, one-hour lockout after 10 times. E08 = flame current low but still strong enough to run. (p.96, p.97)",
   "Flame current: meter on DC volts across the two pads marked FP on the IFC; 1 VDC = 1 microamp. Typical 0.75 to 3.0 microamps (0.75 to 3 VDC), and it varies with the meter used. (p.98)",
   "Never lit at all: confirm the gas valve switch inside the furnace and the outside shut-off are ON, and that supply pressure at the valve is 5.0 to 13.8 in. w.c. natural or 10.0 to 13.8 in. w.c. LP. (p.63, p.21)",
   "Manifold pressure on the White-Rodgers 36J valve: turn off all electrical power to the system before attaching the gauge to the OUT P boss; loosen (do NOT remove) the tap screw one turn with a 3/32 in. hex wrench; turn power on and energize the valve; adjust 1st stage (LO) then 2nd stage (HI); cycle the valve several times; turn off all electrical power, remove the gauge and tighten the pressure tap screw. Fuel Manifold Pressure Settings: natural gas 3.5 in. w.c. 2nd stage max / 1.7 in. w.c. 1st stage max; LP 10.0 max / 6.0 max. (p.23)",
   "After the manifold check, check the outlet boss and tap screw with leak detection solution or soap suds; then turn power on and check operation. (p.23)"
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace (p.2). If operating checks must be performed with the unit operating, it is the technician's responsibility to recognize these hazards and proceed safely (p.4). Do NOT touch igniter. It is extremely hot (p.6). Check gas connections with a soapy solution - DO NOT CHECK WITH AN OPEN FLAME. Do NOT attempt to manually light the furnace (p.21, p.63).",
  "manual": "trane-s9v2-ps-furnace-install",
  "pages": [
   98,
   96,
   97,
   63,
   21,
   23
  ],
  "source": "S9V2 PS (S9V2xxxxxPSAA, 2-stage inducer) Installer's Guide - Upflow/Horizontal and Downflow Gas-Fired, Direct/Non-Direct Vent, 2-Stage Condensing Variable Speed Furnaces (18-CE01D1-1E-EN, 11/2016), p.98, p.96, p.97, p.63, p.21, p.23",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9v2ps-no-second-stage",
  "unit": "^S9V2[A-D][0-9]{3}[UD][0-9]PSAA",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Runs, but never goes to (or drops out of) 2nd stage (E3.4) — S9V2 PS",
  "summary": "How the S9V2 PS brings on 2nd stage and when it gives up on it.",
  "steps": [
   "2nd stage cannot run without 1st stage. On a W2 call the tech should read 24 VAC from W2 to B/C and the display reads Ht2. (p.98, p.99)",
   "The display follows the thermostat inputs: with W1 and W2 called together it reads Ht2 even though the IFC brings on 1st stage first. (p.98)",
   "The IFC closes the 2nd stage inducer relay, the inducer goes to 2nd stage, the 2nd stage gas valve relay closes and the blower ramps to the 2nd stage heating airflow. (p.99)",
   "PS2 must close within 45 seconds. If not, the IFC declares the PS2 open error (E3.4) and the furnace keeps heating in 1st stage. (p.99, p.96)",
   "It waits 10 minutes and tries again. After the third failed try in the same heat call, 2nd stage is locked out until the heat call is removed or power is cycled. (p.99)",
   "The guide prints no check procedure for E3.4. Related page in it: Maximum Vent Length table. (p.29)",
   "2nd stage heating airflow is adjustable in the IFC menu (gHC); 1st stage is not adjustable. (p.96)"
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace (p.2). If operating checks must be performed with the unit operating, it is the technician's responsibility to recognize these hazards and proceed safely (p.4).",
  "manual": "trane-s9v2-ps-furnace-install",
  "pages": [
   98,
   99,
   96,
   29
  ],
  "source": "S9V2 PS (S9V2xxxxxPSAA, 2-stage inducer) Installer's Guide - Upflow/Horizontal and Downflow Gas-Fired, Direct/Non-Direct Vent, 2-Stage Condensing Variable Speed Furnaces (18-CE01D1-1E-EN, 11/2016), p.98, p.99, p.96, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9v2ps-cold-weather-shutdown",
  "unit": "^S9V2[A-D][0-9]{3}[UD][0-9]PSAA",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Shuts down in freezing weather / water at the furnace (E09) — S9V2 PS",
  "summary": "The S9V2 PS guide ties drain problems to furnace shutdown; E09 is the code for the condensate pressure switch.",
  "steps": [
   "E09 = open inducer limit switch or condensate pressure switch. The IFC checks both before every heat cycle. (p.97, p.98)",
   "The guide states frozen condensate will block drains, resulting in furnace shutdown. (p.58)",
   "The drain can be cleaned or inspected by removing the drain tube at the header. (p.58)",
   "The drain must connect to an OPEN / VENTED drain, and outside the cabinet all piping must be 1/2 in. minimum PVC. (p.58)",
   "A drain line in an unconditioned space or below freezing needs heat tape: 5 or 6 watts per foot at 120 volts, self-regulating (preferred) or thermostatically controlled. (p.58)",
   "When the furnace and coil drains are manifolded together, a primary drain vent stack must end below the outlet of the secondary heat exchanger drain connection, so a plugged drain does not put water on the furnace controls. (p.58)",
   "Horizontal installs: the condensate trap has to be repositioned and the inducer-housing drain tube may need moving to the lower connection. (p.58)"
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace (p.2). If operating checks must be performed with the unit operating, it is the technician's responsibility to recognize these hazards and proceed safely (p.4).",
  "manual": "trane-s9v2-ps-furnace-install",
  "pages": [
   97,
   98,
   58
  ],
  "source": "S9V2 PS (S9V2xxxxxPSAA, 2-stage inducer) Installer's Guide - Upflow/Horizontal and Downflow Gas-Fired, Direct/Non-Direct Vent, 2-Stage Condensing Variable Speed Furnaces (18-CE01D1-1E-EN, 11/2016), p.97, p.98, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-dead",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Entire unit does not run — FHP EC Series",
  "summary": "The first row of the EC Series trouble shooting table, plus the UPM power LED.",
  "steps": [
   "Power supply off: apply power, close the disconnect. Blown fuse: replace the fuse or reset the breaker and check for correct fuses. (p.51)",
   "Low supply voltage: if it is below the minimum on the unit data plate, contact the power company. (p.51)",
   "Green LED on the UPM board = 18 to 30 VAC at the board. The transformer primary is dual tapped 208 / 230 - the wrong tap gives low control voltage. 18 V minimum, 24 V ideal. (p.5, p.7)",
   "Thermostat test: fan ON - the fan should run. COOL at the lowest setting - the unit should cool (reversing valve energized). HEAT at the highest setting - the unit should heat. Nothing in all three = thermostat miswired or faulty. (p.51)",
   "Prove it at the unit low voltage terminal strip: 24 volts R to C, Y to C and O to C; blower not running, G to C. Replace the thermostat if it is defective. (p.51)",
   "Thermostat terminals on this unit: C common, R 24 VAC hot, G fan, Y compressor contactor, O reversing valve (energized in cooling). (p.4)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   51,
   5,
   7,
   4
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.51, p.5, p.7, p.4",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-blower-no-compressor",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Blower runs but the compressor does not — FHP EC Series",
  "summary": "Start at the UPM board's red LED, then the table's wiring and compressor checks.",
  "steps": [
   "Check the UPM board red LED for a blink code: 1 high pressure, 2 low pressure, 3 freeze sensor, 4 condensate overflow, 5 brownout. The blower keeps running during a lockout. (p.51, p.5, p.7)",
   "The UPM also holds the compressor off for its normal time delays: a 5-minute delay on break, and a random start delay of 270 to 300 seconds after initial power up or a power interruption. (p.5)",
   "To speed that up for testing, the TEST DIP switch drops all delays to 10 seconds. Put it back to NO when done - the IOM warns of accelerated wear in test mode. (p.5)",
   "A unit with no freeze sensor must have a jumper across the FREEZE terminals on the UPM or it will not start. (p.4)",
   "Thermostat: check setting, calibration and wiring. Wiring: loose or broken wires at the compressor, capacitor or contactor. (p.51)",
   "Compressor overload open: if the compressor is cool and the overload will not reset, replace the compressor. (p.51)",
   "Compressor grounded (winding to shell): replace it, and after a burnout install a suction filter drier. Windings open: let it cool, check winding continuity, replace if open. (p.51)",
   "Hard lockout reset: thermostat off then on (RESET DIP on Y, the factory setting) or unit power off at the breaker (RESET DIP on R). (p.5, p.7)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   51,
   5,
   7,
   4
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.51, p.5, p.7, p.4",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-high-pressure",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Off on high pressure (1 blink) — FHP EC Series",
  "summary": "Water side in cooling, air side in heating - straight from the EC Series trouble shooting table.",
  "steps": [
   "One blink on the red UPM LED = high pressure lockout; the switch is in the discharge line on the HPC terminals. (p.5, p.4)",
   "COOLING: lack of or inadequate water flow, entering water too warm, or a scaled or plugged water coil (condenser). (p.51)",
   "HEATING: lack of or inadequate air flow - blower not running, clogged filter or duct restrictions. (p.51)",
   "Water side limits: a boiler / tower loop should be 60 to 110F in cooling and 50 to 75F in heating; unit range is 50 to 100F entering (25 to 110F with the extended range option). (p.9, p.2)",
   "Set water flow by the pressure drop across the water coil at the P/T ports, against the unit specification sheet. (p.7)",
   "Compare pressures with the operating table for the size (EC030-042 on p.45). The table is a guide, not a charging chart. (p.51, p.45)",
   "Overcharge: reclaim, evacuate and recharge with the factory recommended charge. Also check for a defective or mis-calibrated high pressure switch. (p.51)",
   "It retries by itself after the 5-minute delay; a second trip inside 60 minutes (fourth if the LOCKOUT DIP is on 4) is a hard lockout. (p.5)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   5,
   4,
   51,
   9,
   2,
   7,
   45
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.5, p.4, p.51, p.9, p.2, p.7, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-low-pressure-freeze",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Off on low pressure or freeze sensor (2 or 3 blinks) — FHP EC Series",
  "summary": "Air side in cooling, water side in heating; the freeze sensor trips on lost water flow.",
  "steps": [
   "Two blinks = low pressure lockout (suction-line switch on LPC1 / LPC2). Three blinks = freeze sensor lockout. (p.5, p.4)",
   "The low pressure switch is ignored for 120 seconds after it opens; still open after 2 minutes = compressor off. (p.5)",
   "HEATING: lack of or inadequate water flow, entering water too cold, or a scaled or plugged water coil. (p.51)",
   "COOLING: lack of or inadequate air flow, entering air too cold, blower not running, clogged filter or duct restrictions. (p.51)",
   "Freeze sensor: trips after 30 seconds at or below the limit (factory 30F; 15F only with resistor R42 cut), and after 90 seconds of lost water flow. (p.4, p.5)",
   "No antifreeze in the water = the limit must stay at 30F. Well water 50F minimum; closed loops need antifreeze and the extended range option. (p.5, p.2, p.10)",
   "Low charge: find and repair the leak, evacuate, recharge with the factory recommended charge. Also check for a defective or mis-calibrated low pressure switch. (p.51)",
   "The IOM's own note: periodic lockouts are almost always air or water flow problems - check water flow, water temperature, air flow and air temperature. (p.11)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   5,
   4,
   51,
   2,
   10,
   11
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.5, p.4, p.51, p.2, p.10, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-condensate",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Locked out on condensate overflow (4 blinks) — FHP EC Series",
  "summary": "The one fault that hard-locks on the first trip.",
  "steps": [
   "Four blinks = condensate overflow. A single overflow fault is an immediate hard lockout that needs a manual reset. (p.5)",
   "The overflow sensor is in the drain pan and lands on the COND terminal of the UPM. The sensor is optional (standard on horizontal units). (p.4)",
   "Clear and flush the condensate drain - the IOM calls for this yearly. (p.11)",
   "Reset: thermostat off then on (RESET DIP on Y, the factory setting) or unit power off at the breaker (RESET DIP on R). (p.5, p.7)",
   "The blower keeps running while the unit is locked out. (p.7)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   5,
   4,
   11,
   7
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.5, p.4, p.11, p.7",
  "confidence": "manual"
 },
 {
  "id": "u-fhp-ec-poor-capacity",
  "unit": "^EC0(?:07|09|12|15|18|24|30|36|41|42|48|51|60|61|70)-?[0-9](?:[VH]|CF)",
  "brand": "FHP (Bosch)",
  "equipment": "Other",
  "title": "Short cycles, or not enough cooling or heating — FHP EC Series",
  "summary": "The last two rows of the EC Series trouble shooting table.",
  "steps": [
   "Short cycling: thermostat near a supply grille (relocate it; readjust the heat anticipator), loose wiring or a defective compressor contactor, or an oversized unit (recalculate the loads). (p.51)",
   "Not enough capacity, air side: dirty filter, lack of air flow or poor air distribution, duct leaks, or outside air getting in through doors and windows. (p.51)",
   "Compare operating pressures with the pressure / temperature chart for the size (EC041 is in the EC030-042 table). (p.51, p.45)",
   "Discharge too low with suction too high = compressor not pumping; replace the compressor. (p.51)",
   "Reversing valve bypassing discharge to suction: replace the reversing valve. (p.51)",
   "TXV / capillary tube: check for a restriction or defect, replace if necessary. (p.51)",
   "Low charge runs inefficiently. Moisture or non-condensables: reclaim, evacuate and recharge with the factory charge; a liquid line drier may be required. (p.51)",
   "Undersized unit: recalculate the loads; added insulation and shading may fix it. (p.51)"
  ],
  "safety": "Turn off main power before service (IOM p.2 warning). R-410A: do not use R-22 service equipment or components.",
  "manual": "fhp-ec-series-iom-970-289",
  "pages": [
   51,
   45
  ],
  "source": "EC Series EC007-EC070 water-to-air heat pump EC Series Installation, Operation and Maintenance Manual (form 970-289, rev 05-12), p.51, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-ignition-sequence",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "No heat — walking the ignition sequence (and why it can light on high fire) — ML297",
  "summary": "The ML297 runs a fixed two-stage sequence; knowing each timing and the high-fire fallback tells you where it is stopping.",
  "steps": [
   "On a call for heat the control runs a self-check, checks that the limit switches are closed and the pressure switches are open, then starts the inducer on low speed. The display shows H, blinking during ignition.",
   "When the low pressure switch closes, a 15-second pre-purge runs on low speed. If the low-fire switch does not close, the inducer switches to high; after a 15-second pre-purge the high-fire switch closes, the furnace lights on high fire and drops to low fire after 10 to 20 seconds. The control stores E229 (ignition on high fire) when it does this; the manual lists E229 as no action needed.",
   "After the pre-purge: a 20-second ignitor warm-up, inducer still on low.",
   "Then the gas valve opens on low fire and the burners light. A 30-second blower on-delay starts; when it ends the blower runs at low-fire heat speed, the HUM contacts close and the 120 V ACC terminal is powered.",
   "Second stage with a two-stage thermostat: W2 starts a 30-second recognition delay, then the inducer goes to high speed, the control checks that the high-fire pressure switch is closed, opens the high-fire valve and moves the blower to high-fire heat speed.",
   "Single-stage thermostat (SW1 switch 1 ON): the control brings on second stage by itself after 7 minutes (switch 2 OFF, factory) or 12 minutes (switch 2 ON).",
   "End of the call: gas valve off, 5-second post-purge, and the blower runs out the selected off delay (90, 120, 180 or 210 seconds).",
   "Lockout: the control has an internal Watchguard - after one hour of continuous thermostat demand it breaks and remakes the demand and resets itself to try again. The ML297 manuals do not print the trial-for-ignition time or the number of retries.",
   "Nothing at all happening: is the thermostat calling, are the access panels on, is the disconnect closed, is a fuse or breaker open, is the filter plugged, is the gas on at the meter, and are the manual main shut-off valve and the internal manual shut-off valve open? Is the ignition system in lockout?"
  ],
  "safety": "Do not try to light the burners by hand. Move the gas valve switch by hand only - never with tools; if it will not move by hand, replace the valve.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   12,
   14,
   17,
   50,
   62,
   63
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.12, p.14, p.17, p.50, p.62, p.63",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297uh-pressure-switch",
  "unit": "^ML297UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes E223-E227, low and high fire — set points and how to measure (ML297UH)",
  "summary": "The ML297UH has a dual pressure switch, one side for low fire and one for high fire; the codes tell you which side, and the manual gives a break point for each size and altitude.",
  "steps": [
   "Which switch: E223 = low switch failed open. E224 = low switch failed closed (stuck closed on the heat call). E225 = high switch failed open. E226 = high switch failed closed. E227 = low switch opened during trial for ignition or run. E271 / E272 = soft lockouts whose last retry or recycle was a pressure switch opening.",
   "Set points, low / high heat, 0-4500 ft: 045 0.50 / 0.80 · 070 0.55 / 0.95 · 090 0.50 / 0.90 · 110 0.60 / 1.15 · 135 0.45 / 0.85 in. w.c.",
   "4501-7500 ft: 045 0.41 / 0.74 · 070 0.50 / 0.85 · 090 0.45 / 0.75 · 110 0.55 / 0.95 · 135 0.40 / 0.80. 7501-10,000 ft: 045 0.40 / 0.70 · 070 0.45 / 0.75 · 090 0.40 / 0.70 · 110 0.50 / 0.90 · 135 0.35 / 0.75.",
   "Those are the break (open) points. The switch makes (closes) 0.15 in. higher.",
   "Measure it: with the call removed, pull the tubing off both sides of the switch (leave it on the cold end header box). Use the provided 2 in. and 10 in. square tubing and tees to tee the manometer into the positive (black) side and the negative (red and black, or red) side. Run the furnace: take one reading right after start-up and a second at steady state, about 5 minutes - that is the differential.",
   "Low reading: inspect the vent and the combustion air inducer for correct operation and restriction.",
   "Drain side: check the condensate hose screen at the cold end header box and the trap. If the furnace and coil drains are tied together, the A/C drain outlet must be vented or the furnace pressure switch will not operate properly.",
   "E229 with the furnace lighting on high fire means the low-fire switch did not close in time - same checks, low side.",
   "Above 4500 ft the switch is changed for a high-altitude kit; all models use the factory switch from 0-4500 ft. For the 110, Addendum 508934-01 gives kits 32L29 (4501-7500 ft) and 32L30 (7501-10,000 ft) in place of the numbers in the service manual table."
  ],
  "safety": "The pressure switch is a factory-set safety shut-down control: not field adjustable, and it must not be bypassed for any reason. If the switch is closed or bypassed the control will not start ignition.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   14,
   15,
   26,
   27,
   48,
   52,
   55,
   62
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.14, p.15, p.26, p.27, p.48, p.52, p.55, p.62",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297df-pressure-switch",
  "unit": "^ML297DF",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes E223-E227, low and high fire — set points and how to measure (ML297DF)",
  "summary": "The ML297DF has a dual pressure switch, one side for low fire and one for high fire; the codes tell you which side, and the manual gives a break point for each size.",
  "steps": [
   "Which switch: E223 = low switch failed open. E224 = low switch failed closed (stuck closed on the heat call). E225 = high switch failed open. E226 = high switch failed closed. E227 = low switch opened during trial for ignition or run. E271 / E272 = soft lockouts whose last retry or recycle was a pressure switch opening.",
   "Set points, low / high heat: 070 0.50 / 0.90 · 090 0.45 / 0.90 · 110 0.60 / 1.15 in. w.c. The downflow manual prints this one table with no altitude heading and no high-altitude set points.",
   "Those are the break (open) points. The switch makes (closes) 0.15 in. higher.",
   "Measure it: with the call removed, pull the tubing off both sides of the switch (leave it on the cold end header box). Use the provided 2 in. and 10 in. square tubing and tees to tee the manometer into the positive (black) side and the negative (red and black, or red) side. Run the furnace: take one reading right after start-up and a second at steady state, about 5 minutes - that is the differential.",
   "Low reading: inspect the vent and the combustion air inducer for correct operation and restriction.",
   "Drain side: check the condensate hose screen at the cold end header box and the trap. If the furnace and coil drains are tied together, the A/C drain outlet must be vented or the furnace pressure switch will not operate properly.",
   "E229 with the furnace lighting on high fire means the low-fire switch did not close in time - same checks, low side.",
   "Above 4500 ft the switch is changed for a high-altitude kit; all models use the factory switch from 0-4500 ft. Kits (4501-7500 / 7501-10,000 ft): 070 32C78 / 14A54 · 090 14A54 / 32C81. For the 110, Addendum 508934-01 gives 32L29 / 32L30 in place of the numbers in the service manual table."
  ],
  "safety": "The pressure switch is a factory-set safety shut-down control: not field adjustable, and it must not be bypassed for any reason. If the switch is closed or bypassed the control will not start ignition.",
  "manual": "lennox-ml297dfvk-service-100232",
  "pages": [
   13,
   14,
   25,
   26,
   48,
   52,
   55,
   61
  ],
  "source": "ML297DFVK(X) Downflow Service - Unit Information 100232, p.13, p.14, p.25, p.26, p.48, p.52, p.55, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-flame-sense",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Lights then drops out, E240 / E270 / E273 — reading flame microamps on the board (ML297)",
  "summary": "The control shows flame current on its own display; the ML297 figures are 1.5 or greater normal, 1.0 or less low, 0.5 drop out.",
  "steps": [
   "Read it without a meter: press and hold the diagnostic button beside the 7-segment display. A new menu item shows every five seconds; release on F. The display shows flame current in microamps. It leaves this mode on a power reset, when you hold the button until three horizontal lines show, or after 10 minutes.",
   "Flame signal: normal 1.5 µA or greater · low 1.0 µA or less · drop out 0.5 µA.",
   "E240 = low flame current in run mode (clears after the current heat call ends). E273 = soft lockout, last recycle due to flame failure. For both: clean or replace the sensor, and measure neutral to ground to make sure the unit ground is good.",
   "E270 = retries used up with no flame current sensed: check for proper gas flow, that the ignitor is lighting the burner, and the flame sensor current.",
   "The flame sensor is on the left side of the burner support with its tip in the flame of the left-most burner; it comes out without removing the burners.",
   "Ground check at the control, AC volts between a line neutral spade and the C terminal: furnace idle expected 0.3, maximum 2 · inducer / ignitor on 0.75, maximum 5 · indoor blower on less than 2, maximum 10. Above the maximum, repair the ground before running the furnace. Line hot to neutral should be 97 to 132 VAC.",
   "Not lighting at all with E207: ignitor should read 39 to 70 ohms across terminals 1 and 5 of the HSI/CAI 5-pin plug pulled off the control, and at the 2-pin jack-plug near the manifold. Voltage across 1 and 5 during the 20-second warm-up: 120 volts, plus or minus 10%.",
   "E241 or E275 (flame sensed out of sequence): shut off the gas and check for a gas valve leak."
  ],
  "safety": "The furnace has polarity-sensitive electronics: it must be wired correctly and properly grounded. A poorly grounded furnace can contribute to premature ignitor failure.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   10,
   14,
   15,
   23,
   25,
   53
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.10, p.14, p.15, p.23, p.25, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-limit-rollout",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Limit open E250 / E274 or rollout lockout E200 — what to check (ML297)",
  "summary": "E250 is the primary limit, usually airflow or firing rate; E200 is a manual-reset rollout switch and means something is blocked.",
  "steps": [
   "E250 = limit switch circuit open. If the limit has not closed within 3 minutes the furnace goes into a 1-hour soft lockout; E274 is that lockout.",
   "With the limit open the control runs the supply blower and closes the gas valve. The primary limit is in the heating vestibule panel, resets by itself, and is not adjustable. Its set point differs by model and is not printed in the manual - order by model from the repair parts list.",
   "Check the firing rate (manifold pressure, clock the meter), check for blockage, and check airflow. A dirty or plugged filter will cause the limit to shut the unit off.",
   "Temperature rise must be inside the TEMP. RISE range on the rating plate; the blower speed is set to get it there. Heating external static must not be more than 0.8 in. w.c. (cooling 1.0).",
   "Heat speed is SW2 switches 7 and 8: Medium High = OFF / OFF (factory), High = OFF / ON, Medium Low = ON / OFF, Low = ON / ON. SW2 switches 3 and 4 trim it: +10% = ON / OFF, -10% = OFF / ON. On the ML297UH070 the High heat speed is not allowed.",
   "E311 with it: the blower is in cutback for restricted airflow and the control has dropped the firing rate to first stage - check the filter and duct system.",
   "E200 = hard lockout, rollout circuit open or previously open. Two rollout switches sit on top of the burner box, one each side; they open at 210 °F and are manual reset.",
   "Rollout can be caused by a blocked heat exchanger, a blocked flue or a lack of combustion air. Correct the cause of the trip, or replace the rollout switch, then reset the switch with its button and test the furnace."
  ],
  "safety": "Correct the cause of a rollout trip before resetting the switch. Always run the furnace with the burner box front panel in place, and with the blower access panel securely in place.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   14,
   15,
   17,
   18,
   23,
   50,
   54,
   55
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.14, p.15, p.17, p.18, p.23, p.50, p.54, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-blower-motor",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Variable-speed blower will not start, E292, or airflow cutback E311 — ML297",
  "summary": "The blower is a GenTeq or Nidec variable-speed motor with two plugs; the manual gives the start-up behaviour, the plug pins and the Nidec LED table.",
  "steps": [
   "E292 = indoor blower motor unable to start (obstructed wheel or seized bearings per the manual). It is a 1-hour soft lockout that clears once the blower starts.",
   "Normal start: the motor rocks gently back and forth for a moment, then eases up to speed; it can take 10 to 15 seconds to reach full speed. If it does not reach 200 rpm within 13 seconds it shuts down and tries again, up to eight times, then the motor controller locks out. Reset it by momentarily turning off power to the furnace.",
   "Two plugs at the motor: J48 is power, J49 is control. J48 needs line voltage on pins 4 and 5; pins 1 and 2 are jumpered for 120 VAC; pin 3 is ground.",
   "J49 (16-pin) carries the control signals: pin 2 W/W1, pin 13 EM/W2, pin 6 Y1, pin 14 Y/Y2, pin 15 G, pin 12 R, pins 1 and 3 C1 / C2, pin 11 Heat, pin 5 Cool, pin 7 Adjust, pin 4 Delay, pin 9 O, pin 10 DS (PWM), pins 8 and 16 Out.",
   "Nidec motor with the 16X4W box (three LEDs PW / RX / TX; the box may be on the blower housing): PW off, RX and TX blinking, not rotating = normal. All three blinking, rotating = normal (PW blinks once per 100 cfm). PW blinking, RX off, TX blinking, not rotating = check that the 16X4W and motor control hp match and that the motor control has power, turn power off 1 minute and restart; still not rotating, replace the controller. All off = check power to the 16X4W, restart; still out, replace the controller.",
   "E311 = airflow cutback, warning only: restricted airflow has the blower cut back and the control reduces the firing rate to first stage. Check the filter and ducts. The blower holds its cfm only up to 0.8 in. external static; above that it may slow down to protect itself while the display still shows the desired cfm.",
   "Replacing the motor: centre the wheel in the housing and tighten the set screw on the flat of the shaft.",
   "Blower that never shuts off on a K furnace is usually not the motor - see the refrigerant detection scenario (Low GWP DIP switches)."
  ],
  "safety": "DANGER: disconnect power and wait at least five minutes for the motor capacitors to discharge before changing motor speed tap settings. Failure to wait may cause personal injury or death.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   11,
   15,
   20,
   21,
   22
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.11, p.15, p.20, p.21, p.22",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-refrigerant-detection",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Blower runs all the time, or E150-E164 / E390 — refrigerant detection on the ML297 K control",
  "summary": "The K control ships with both refrigerant-sensor positions enabled. With no sensor plugged in, or a sensor fault, the blower runs continuously until the DIP switches or the fault are put right.",
  "steps": [
   "Heat-only furnace, or a furnace on an R-410A (non-Low GWP) system with no sensor: move BOTH Low GWP DIP switches to DISABLE. Left at the factory ENABLE setting the blower operates continuously.",
   "The switches are the 2-switch bank marked LGWP (SW3), just below the four-switch bank SW1, marked DISABLE / ENABLE; DISABLE is the ON side.",
   "A2L system settings: one sensor, on the SENSOR 1 plug (LGWP1) = switch 1 enable, switch 2 disable. Two sensors (SENSOR 1 and SENSOR 2) = both enable. Switch 1 disable with switch 2 enable is invalid. Anything else gives a servicing fault, and a wrong setting faults on power-up.",
   "At power-up the control runs an initial five-minute purge sequence while it connects to the sensor. Let that finish before judging the blower.",
   "E150 = leak alarm. The control drops R (24 VAC) to the thermostat, so the compressor and the heat stop, and runs the blower on high. Once levels are below the threshold the blower finishes a seven-minute cycle and the system returns to normal. E150 cannot be cleared while the sensor still reports a leak - find the leak and verify the charge.",
   "A Low GWP fault holds the blower on at a constant airflow until it is cleared (the manual does not list which codes do this). Low GWP codes: E151 / E152 sensor #1 / #2 fault · E154 sensor #1 communication lost or invalid DIP setting · E155 sensor #2 communication lost · E160 / E161 wrong sensor type · E163 control board failure · E390 Low GWP relay stuck. For E154 / E155 check the harness, the connector and the sensor plug; after E154, E155, E160 or E161 clear the blower stays latched at least 5 minutes.",
   "LGWP TEST button: in normal mode it triggers a leak response (E164 shows; it clears by itself after 1 minute, or press again to end the test). In fault mode it re-checks the fault after a repair.",
   "Because R is dropped during a leak event, an early-generation digital thermostat may lose its mode and set points.",
   "At maintenance, inspect the sensors and the rubber sleeve."
  ],
  "safety": "Disabling the refrigerant detection function on an A2L system is prohibited by safety codes. For use with a Lennox approved evaporator coil and LGWP sensors only; with a non-Lennox approved coil use the original manufacturer recommended LGWP sensors.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   1,
   13,
   14,
   15,
   16,
   54,
   57,
   58,
   59
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.1, p.13, p.14, p.15, p.16, p.54, p.57, p.58, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-code-recall",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Reading, recalling and clearing codes on the 7-segment display — ML297",
  "summary": "One push button beside the display runs a small menu: E recalls the last 10 codes, c clears them, F shows flame microamps.",
  "steps": [
   "Normal displays, not faults: a blinking decimal point = idle. H = gas heat (1 or 2 for the stage, then the cfm setting; blinks during ignition). C = cooling stage. A = continuous fan. d = dehumidification. h = heat pump stage. dF = defrost.",
   "To recall codes: press and hold the diagnostic button next to the display. The menu steps to a new item every five seconds; release when E shows. The control gives the most recent 10 error codes.",
   "E000 = no error in memory.",
   "To clear: in the Error Code Recall menu select c, then press the button a second time while c is flashing to confirm.",
   "To exit recall: press the button until a solid three-bar symbol shows.",
   "F from the same menu shows flame current in microamps (normal 1.5 or greater, low 1.0 or less, drop out 0.5).",
   "How faults clear by themselves: line voltage faults E110 / E111 / E112 / E113 about 5 seconds after the fault recovers; E117 30 seconds; E125 300 seconds; soft lockouts E270-E274 when a heat call finishes successfully.",
   "The second button on the board, LGWP TEST, is for refrigerant detection only - it does not recall codes."
  ],
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   9,
   10,
   11,
   12,
   15,
   23
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.9, p.10, p.11, p.12, p.15, p.23",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml297-condensate",
  "unit": "^ML297(UH|DF)",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Water backing up, gurgling, or pressure switch faults from the drain — ML297",
  "summary": "The trap must be primed, the hose screen clear, and the drain vented at the right height; a drain problem shows up as pressure switch codes.",
  "steps": [
   "Prime the trap before start-up: pour 10 fl. oz. (300 ml) of water into it, or fire the burners about 3 minutes, end the call, wait for the inducer to stop, and repeat once.",
   "Condensate hose screen: power off, pull the hose off the cold end header box, twist and pull the screen out, rinse it with tap water, refit.",
   "Trap: remove the clean-out cap at the base of the trap to drain and inspect it. Inspect the traps and drain assembly, and disassemble and clean them, seasonally.",
   "The trap can sit up to 5 ft from the furnace on PVC pipe that slopes at least 1/4 in. per ft toward the trap; from the trap the line slopes down to an open drain. A drain higher than the trap needs a condensate pump.",
   "Drain vent height above the condensate drain connection: upflow and downflow 1 in. minimum to 2 in. maximum; horizontal 4 in. minimum to 5 in. maximum. The upflow/horizontal manual adds that anything taller can flood the heat exchanger if a combined drain line becomes restricted (downflow limits: downflow service manual 100232 p.47-48).",
   "Furnace and evaporator coil on a common drain: the A/C condensate drain outlet must be vented to relieve pressure, or the furnace pressure switch will not operate properly.",
   "Do not use copper tubing or existing copper condensate lines.",
   "ML297UH: check the unused cold end header box drain plug for tightness. Horizontal: the trap must extend below the unit, needs 8 in. of service clearance, and a secondary drain pan under the unit and trap is recommended.",
   "Freezing: route the drain inside conditioned space, or use Lennox heat cable kit 26K68 (6 ft), 26K69 (24 ft) or 26K70 (50 ft)."
  ],
  "safety": "Turn off power to the furnace before removing the condensate hose screen or emptying the trap.",
  "manual": "lennox-ml297uhvk-service-100231",
  "pages": [
   46,
   47,
   48,
   50,
   55
  ],
  "source": "ML297UHVK(X) Upflow/Horizontal Service - Unit Information 100231, p.46, p.47, p.48, p.50, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-ignition-sequence",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "No heat — walking the ignition sequence — ML197UHEK",
  "summary": "The ML197 runs one fixed single-stage sequence; knowing each timing tells you which step it is dying on.",
  "steps": [
   "At the call the control looks at the pressure switch first. It must be OPEN - if it is already closed (stuck or jumpered) the heat cycle will not start. Only then does the inducer come on.",
   "The pressure switch has 2.5 minutes to close. If it does not, the display shows E223, gas valve and inducer go off, and the control waits 5 minutes before trying again.",
   "Switch closed: 15-second pre-purge, then the ignitor warms up for 20 seconds.",
   "Gas valve opens for a 4-second trial for ignition; the ignitor stays on for the first 3 seconds. Flame has to be proven within those 4 seconds (0.5 microamps).",
   "No flame: it tries four more times (five trials in all), then goes into Watchguard flame failure - E270 - and retries by itself after 60 minutes. To skip the wait, move the thermostat from Heat to OFF and back to Heat.",
   "Flame proven: the indoor blower starts 30 seconds later on the HEAT tap. That 30 seconds is not adjustable.",
   "End of call: gas valve off, inducer post-purges 5 seconds, blower runs out the selected off delay (factory 120 seconds).",
   "If nothing happens at all: thermostat calling, access panels on (door switch), disconnect closed, fuse or breaker, filter, gas on at the meter, manual shut-off and the gas valve switch ON. Never light the burners by hand."
  ],
  "safety": "Do not try to light the burners by hand. Move the gas valve switch by hand only - never with tools.",
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   8,
   9,
   45,
   58,
   59
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.8, p.9, p.45, p.58, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-pressure-switch",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Pressure switch faults (E223, E224, E227, E271, E272) — measuring the differential — ML197UHEK",
  "summary": "One differential switch on the cold end header box; measure across it before you condemn it.",
  "steps": [
   "E224 = on a call for heat the pressure switch is already closed before the inducer starts, so the control will not begin the heating cycle. Check that the switch is open with the inducer off (and that nobody left a jumper); replace it if it is stuck.",
   "E223 = it did not close within 2.5 minutes. E227 = it opened during the trial for ignition or while running. Five openings in one heat call puts it in a 1-hour lockout (E271).",
   "Measure it: with the call off, tee into BOTH hoses at the switch - the red (or red and black) hose is negative, the black hose is positive. Manometer negative side to the negative line, positive side to the positive line.",
   "Run the furnace. Take one reading right after start-up and a second at steady state, about 5 minutes in. The steady reading is the differential and it must be greater than the set point.",
   "Set points, 0-4500 ft: 030 = 0.65, 060 and 080 = 0.90 in. w.c. At 4501-7500 ft: 0.65 / 0.80. At 7501-10,000 ft: 0.60 / 0.70. The switch is not adjustable, and above 4500 ft a high-altitude switch kit is called for.",
   "Low differential: look at the vent first - blocked or undersized intake or exhaust, or a run that is too long. Then hoses that are split, mis-routed or holding water, plugged taps, and the condensate side (blocked drain backs water up into the header box and lowers the differential).",
   "Also check the cabinet tilts slightly toward the front (0 to 1/2 in.) so the header box drains, and the gaskets at the inducer and the cold end header box are not leaking.",
   "Good differential and the switch still will not close: wrong or out-of-calibration switch, or wiring. If the cold end header box has to be replaced, the gaskets sealing the box to the vestibule panel and the inducer to the box must be replaced too."
  ],
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   13,
   18,
   19,
   20,
   48,
   58,
   59
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.13, p.18, p.19, p.20, p.48, p.58, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-flame-sense",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Lights then drops out, or E240 / E270 / E273 — flame signal — ML197UHEK",
  "summary": "Read the microamps on the board's own display, then clean, ground and check polarity.",
  "steps": [
   "Hold the diagnostic button beside the display until F shows, then let go. The display now reads flame current in microamps. It drops out of this mode after 10 minutes, on a power reset, or when you hold the button until three horizontal lines show.",
   "Normal is 1.5 microamps or more. 0.5 to 1.4 is low (E240 - the furnace keeps running). 0.4 or less and it drops out.",
   "By meter instead: power off, pull the sensor wire off the control, meter on DC microamps in series - negative lead to the sensor wire, positive lead to the FLAME SENSE terminal. Power on, call for heat, read after the burners have run two minutes.",
   "Low signal: pull the sensor (left side of the burner box; it comes out without removing the burners) and clean it with steel wool only.",
   "This furnace is polarity sensitive. Confirm hot and neutral are right and the ground is good: line neutral to the C terminal should read about 0.3 V idle (2 V max), 0.75 V with the inducer or ignitor on (5 V max), under 2 V with the blower on (10 V max). A reading that swings with load means a poor ground.",
   "E270 (five tries, no flame at all): check gas flow and that the ignitor is actually lighting the burner before blaming the sensor. E273 = repeated flame loss while running.",
   "Flame showing with the gas valve off is E241: shut off the gas and check the valve for leak-through."
  ],
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   11,
   13,
   14,
   15,
   49,
   59
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.11, p.13, p.14, p.15, p.49, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-limit-rollout",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Limit trips (E250, E274) or rollout lockout (E200) — ML197UHEK",
  "summary": "Limits reset themselves and point at airflow or firing rate; rollouts are manual reset and point at a blockage.",
  "steps": [
   "E250 = limit circuit open. The control shuts the gas valve and runs the blower. If the limit is not closed again within 3 minutes the furnace goes into a 1-hour soft lockout (E274).",
   "Primary limit is on the heating vestibule panel; the secondary limit is in the blower compartment on the back of the blower housing. Both reset by themselves and neither is adjustable.",
   "Check airflow first: filter, blower wheel, heat tap. Temperature rise must be 25-55 F on the 030 and 30-60 F on the 060 and 080. External static on heating speed should not be over 0.5 in. w.c.",
   "Heat tap: 030 ships on yellow, 060 and 080 on blue. The wiring diagram says do not use the red (low speed) lead for heating - the temperature rise will be outside the rise range - and marks the 060 against yellow as well. Check the speed chart and notes on the unit's wiring diagram.",
   "Then firing rate: manifold 3.5 in. w.c. natural / 10.0 LP, and clock the meter - 030 120 seconds, 060 60 seconds, 080 45 seconds per revolution of a 1 cu ft dial on natural gas.",
   "E200 = a flame rollout switch opened. There are two on the burner box and they are manual reset. The control holds with the inducer and blower running until the switch is closed AND power is interrupted or the thermostat is cycled off and on.",
   "A rollout trip indicates a blockage in the combustion passages. Find it before resetting - do not just reset and leave.",
   "To prove a limit, restrict the airflow; do not disconnect the indoor blower."
  ],
  "safety": "A tripped rollout switch indicates a blockage in the combustion passages. Correct the cause before resetting.",
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   2,
   10,
   13,
   14,
   17,
   21,
   46,
   48,
   50,
   57,
   59
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.2, p.10, p.13, p.14, p.17, p.21, p.46, p.48, p.50, p.57, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-blower-motor",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Blower will not run or runs the wrong speed — constant-torque motor checks — ML197UHEK",
  "summary": "The motor needs 120 V all the time and 24 V on one tap; the diagnostic code table lists no blower-motor fault code.",
  "steps": [
   "The motor is a constant torque ECM: line power on its 4-pin plug and five 24 V speed taps on its 5-pin plug. Each tap needs 24 V to run that speed (12 to 33 VAC, under 20 mA).",
   "Taps from high to low: black, brown, blue, yellow, red. Factory: COOL = black, HEAT = yellow (030) or blue (060, 080), FAN = red. Unused taps sit on the PARK terminals. Red is the only tap allowed for continuous fan.",
   "Test 1: power on, 120 V across L and N at the motor power plug. No voltage: check for 120 V between L1 and Neutrals at the control - there but not at the motor = harness.",
   "Test 2: set the thermostat to continuous fan. 24 V between C on the power plug and the fan tap on the speed plug. Missing: check 24 V between 24 COM and the active speed tap at the control - present = harness, absent = control.",
   "Both voltages present and the motor does not run right: replace the motor. It is not field repairable.",
   "Only motors with a 4-pin power and 5-pin signal connector may have a replaceable control module. Before fitting a module, test the motor: any pin to the aluminum end plate more than 100k ohms, and the three motor pins all within an ohm of each other. If the motor fails either test it must be replaced too - a new module can fail on a defective motor.",
   "Refit with the connectors facing down (between 4 and 8 o'clock) for a drip loop, module bolts to 22 inch-pounds, and the wheel centered in the housing with the set screw on the flat of the shaft.",
   "Blower running non-stop with nobody calling is usually not the motor on this furnace - check for a refrigerant-detection fault and the Low GWP DIP switches."
  ],
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   10,
   21,
   22,
   23,
   54,
   57
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.10, p.21, p.22, p.23, p.54, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-rds-blower-runs",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Blower runs continuously, no heat or cool — refrigerant leak detection and its DIP switches — ML197UHEK",
  "summary": "The control ships with both refrigerant-sensor switches enabled; with no sensor, or a sensor fault, it runs the blower and holds off heating and cooling.",
  "steps": [
   "Read the display first. E150 = refrigerant leak detected. E151 / E152 = sensor 1 / 2 fault. E154 / E155 = sensor 1 / 2 communication lost (E154 is also a wrong DIP setting). E160 / E161 = wrong sensor type. E163 = control board. E390 = Low GWP relay stuck.",
   "Heat-only furnace or an R-410A coil with no sensor: both Low GWP DIP switches must be moved to DISABLE. They ship ENABLED, and left that way the blower operates continuously.",
   "A2L (R-454B) system: one sensor goes on the SENSOR 1 plug (LGWP1) with switch 1 Enable and switch 2 Disable. Two sensors: both Enable. Switch 1 Disable with switch 2 Enable is invalid. Set them before powering up - a wrong setting faults at power-up.",
   "Every power-up starts with a five-minute purge: blower on, no heating or cooling yet. That is normal. A short press of the LGWP TEST button skips the rest once the sensors are recognized.",
   "On a real leak the control cuts R (24 V) to the thermostat, stops the compressor and the burners, and runs the blower on high. When levels are safe it finishes a seven-minute cycle and returns to normal. E150 will not clear while the sensor still sees refrigerant - find and fix the leak, then verify the charge.",
   "Communication faults: check the sensor harness and plug at the board and at the coil, look for damage or anything blocking the plug, and that the cable has a drip loop and is not pinched. After a fix the blower still latches for at least 5 minutes; press LGWP TEST to re-check.",
   "LGWP TEST in normal mode fakes a leak so you can prove the wiring: display shows E164, blower comes on, outdoor unit (and burners, on a heat call) shut down. Press again to end it; E164 clears by itself after 1 minute.",
   "Thermostats that lose their settings on a power loss may not come back to the right mode or setpoint after the control restores R."
  ],
  "safety": "Disabling the refrigerant detection function on an A2L refrigerant system is prohibited by safety codes. For use with Lennox approved evaporator coil and LGWP sensors only; with a non-Lennox-approved coil use the original manufacturer's recommended LGWP sensors.",
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   1,
   12,
   13,
   54,
   55,
   56
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.1, p.12, p.13, p.54, p.55, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-code-recall",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Reading and clearing stored codes on the 7-segment display — ML197UHEK",
  "summary": "One button beside the display reaches code history, clear, and live flame current.",
  "steps": [
   "Normal display: a blinking decimal point = idle. H = gas heat (blinks during ignition), C = cooling, A = continuous fan, d = dehumidification, h = heat pump stage, dF = defrost.",
   "Press and HOLD the diagnostic button beside the display. A new menu item shows every five seconds; let go on the one you want. The menu wraps around until you release.",
   "Release on E for Error Code Recall: the last 10 codes. E000 means nothing is stored.",
   "To clear: in the recall menu release on c, then press the button a second time while the c is flashing to confirm.",
   "To leave recall, hold the button until three solid horizontal lines show.",
   "Release on F for flame signal - the display reads microamps (1.5 or more is normal).",
   "Codes that are just information: E164 means someone pressed the LGWP TEST button (clears in 1 minute); E117 is a poor-ground warning only.",
   "Soft lockouts reset themselves: after one hour of continuous heat demand the Watchguard breaks and remakes the call. A rollout lockout (E200) does not - the rollout switch is manual reset, and the control then holds until power is interrupted or the thermostat is cycled off and on."
  ],
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   7,
   11,
   13,
   14,
   59
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.7, p.11, p.13, p.14, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-lennox-ml197-condensate",
  "unit": "^ML197UH",
  "brand": "Lennox",
  "equipment": "Gas Furnace",
  "title": "Water at the furnace, gurgling, or pressure switch trips from the drain — ML197UHEK",
  "summary": "A blocked or unprimed trap backs water into the cold end header box and opens the pressure switch.",
  "steps": [
   "If the condensate line is blocked, water backs up into the header box, the pressure differential drops and the pressure switch opens. So a drain problem often shows up as a pressure switch code.",
   "Power off. Pull the clean-out cap at the bottom of the trap, drain it into a pan, look inside, refit the cap.",
   "Pull the hoses off the cold end header box and check the hose screens: twist and pull them out, rinse under the tap, refit.",
   "Check the pressure switch tubing for water and for cracks; clear or replace it.",
   "Prime the trap before you leave: pour in 10 fl oz (300 ml) of water, or fire the burners about 3 minutes, stop, let the inducer stop, and do it once more.",
   "Check the install: the trap may be up to 5 ft from the furnace on PVC sloped 1/4 in. per foot toward the trap; the drain vent stub must be 1 to 2 in. above the drain connection on an upflow, 4 to 5 in. on a horizontal. Taller than that can flood the heat exchanger if the line restricts.",
   "If the furnace and the coil share a drain, the A/C condensate outlet has to be vented or the furnace pressure switch will not work properly. No copper drain lines.",
   "Drain in a cold space: it can freeze - heat cable kit 26K68 (6 ft) or 26K69 (24 ft). And check the cabinet tilts slightly to the front (0 to 1/2 in.) so the header box drains."
  ],
  "manual": "lennox-ml197uhek-service-100236",
  "pages": [
   18,
   20,
   41,
   42,
   43,
   45,
   52
  ],
  "source": "ML197UHEK Upflow/Horizontal - Unit Information / Service Literature (100236, posted 10/22/2026), p.18, p.20, p.41, p.42, p.43, p.45, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-ignition-sequence",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the ignition sequence (it always lights at about 75%) - S9VM",
  "summary": "The S9VM lights at ~75% firing rate, then modulates between 40% and 100%. Knowing each step and timing shows where it stops.",
  "steps": [
   "On a heat call the IFC checks that all thermal switches are closed.",
   "On the first call after power-up or a power cycle, and every 20 gas heating cycles, it first runs a drift check: it watches for the pressure switch to close and compares the pressure transducer voltage. After a good drift check the inducer shuts down for a moment and then the heating cycle starts. That stop-and-restart is normal.",
   "The inducer ramps up to the speed for the 75% firing rate. When it is up to speed and combustion pressure is within bounds, the hot surface igniter comes on.",
   "After the 20 second igniter warm-up the communicating gas valve is energized. Trial for ignition is about 4 seconds.",
   "Flame is proved by flame current. No flame: the sequence of operation says the IFC cycles the furnace three times, then locks out for one hour (E2.1). The wiring diagram prints RETRIES: 6 EACH - the two pages do not agree on the count.",
   "Flame proved: after about 30 seconds the blower starts at the programmed ignition sequence speed, then the inducer, gas valve and blower ramp up or down to the capacity the thermostat asks for (minimum 40%).",
   "24 V thermostat: it runs as a two-stage furnace - W1 holds 65%, W2 takes it to 100%.",
   "End of call: gas valve off, the inducer stops after a post purge of about 5 seconds per the sequence of operation (the wiring diagram prints POST PURGE: 30 SEC), and the blower runs the selected heat off delay.",
   "Stops before the igniter glows: look at combustion pressure - Monitor Group shows Inducer RPM and Combustion Press, and check Active Alarms for an E3.x or E10.x code."
  ],
  "safety": "Do NOT attempt to manually light the furnace. Do not touch the igniter - it is extremely hot.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   4,
   5,
   98,
   104,
   109,
   110
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.4, p.5, p.98, p.104, p.109, p.110",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-pressure-transducer-inducer",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "E3.x combustion pressure or E10.x inducer faults - checking the pressure transducer and inducer - S9VM",
  "summary": "The IFC reads combustion pressure from a pressure transducer and drives a variable-speed inducer. Trane's cause lists for E3.x / E10.2 / E10.3 are mostly vent, wind and pressure-hose items; the voltage table tells you whether the transducer is telling the truth.",
  "steps": [
   "Read the code and its meaning first: E3.0 alert, E3.5 pressure low, E3.6 pressure high, E3.7 transducer too low or no output, E3.8 transducer too high, E10.2 inducer at maximum speed, E10.3 inducer at minimum speed.",
   "Low pressure / max speed (E3.5, E3.7, E10.2): check the vent for restriction, length, size and termination (positive pressure zone, wind into the termination); E3.0 also lists bird or rodent nesting. High pressure / min speed (E3.6, E3.8, E10.3): wind across the termination causing suction, or a termination in a negative pressure zone.",
   "Check every pressure hose for leaks, the right port and a tight fit; confirm the condensate trap is connected and primed and the cold header plug / cap is in place.",
   "Transducer source: about 5 VDC between the green and red wires at the transducer plug.",
   "Transducer signal, green to black: 0.50 VDC at 0.00 in. w.c., rising 0.10 VDC for each 0.10 in. w.c. (1.00 in. = 1.50 VDC, 2.00 in. = 2.50 VDC). With the inducer off it should be 0.5 VDC or less. Compare with a manometer on the cold header and with Combustion Press in the Monitor Group.",
   "During the drift check the signal should be about 0.90 VDC when the 0.40 pressure switch closes.",
   "E10.1 (no communication with the inducer control) or E10.4 (inducer control or motor failed): check the harness between the IFC and the VSIM board, 12 VDC on Rx and Tx, and 98-132 VAC at the VSIM line input.",
   "If the inducer assembly has to come out, disconnect only the tubing to the cold header - do not alter any pressure switch or transducer tubing."
  ],
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   79,
   98,
   105,
   106,
   107,
   108
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.79, p.98, p.105, p.106, p.107, p.108",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-flame-faults",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Lights then drops out, or locks out for an hour (E2.1 / E2.2 / E8.x) - flame signal checks - S9VM",
  "summary": "E8.0 / E8.1 / E8.2 are flame alerts; E2.1 and E2.2 are the one-hour lockouts that follow. Flame current is read as DC volts on the IFC test pads.",
  "steps": [
   "E8.1 = retry, no flame detected; E2.1 = retries exceeded, 1 hour lockout. E8.2 = recycle, flame lost unexpectedly; E2.2 = recycles exceeded, 1 hour lockout. E8.0 = flame current low but still running.",
   "Measure flame current on the flame sense test pads on the IFC with a DC voltmeter: 1 VDC = 1 microamp. The wiring diagram gives the acceptable range as 0.75-3 microamps and E8.0 says to verify above 0.75; the E2.1 lockout row words its cause as flame current less than 1 microamp. The reading varies with the meter and the supply voltage.",
   "Low signal: check the sensor sits properly in the flame, the sensor wire for high resistance or a bad connection, then clean or replace the sensor.",
   "No flame at all: confirm the on/off toggle switch on the gas valve is ON, purge air from the gas line (then leak-check the connections with a soapy solution and allow 5 minutes for any escaped gas to dissipate), and check the igniter (35-70 ohms cold).",
   "Check inlet pressure: natural gas 5.0-13.8 in. w.c., propane 11.0-13.8 in. w.c. Watch for it dropping while the furnace runs (E2.2).",
   "Check manifold pressure in the heat test mode: natural gas about 3.5 in. w.c. at 100% and about 0.7 in. w.c. at 40%. Adjustment is electronic only.",
   "E2.1 also lists burner crossovers not aligned or restricted; E2.2 lists air impingement on the burners, debris in the gas valve screen, a supply blockage or a failing regulator or gas valve solenoid.",
   "E5.0 (flame sensed when there should be none): gas valve not fully closing or debris in it; otherwise the IFC has failed."
  ],
  "safety": "Never test for gas leaks with an open flame; use a soap solution made for leak detection.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   3,
   19,
   41,
   45,
   104,
   105,
   106
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.3, p.19, p.41, p.45, p.104, p.105, p.106",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-limits-rollout",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Limit or rollout codes (E4.0 / E4.1 / E4.2 / E9.1) - S9VM",
  "summary": "Four different switches report separately: high limit E4.0, reverse airflow E4.1, rollout E4.2 and inducer limit E9.1. Each has its own cause list.",
  "steps": [
   "E4.0 open high limit: low airflow across the heat exchanger - dirty filter, evaporator coil or blower wheel; manifold pressure set too high; return air above 80 F. Raise heating CFM if the duct system allows.",
   "Heating CFM: IFC Airflow Group, Gas Ht CFM (or switch Airflow Method to Temp Rise). The values are at 100% firing rate and scale down automatically.",
   "Check temperature rise against the rating plate. Printed ranges at 100%: 35-65 F for the 060 and 080; 30-60 F for the C100 upflow; 40-70 F for the D120 upflow; 35-65 F for the 100 and 120 downflow.",
   "E4.1 open reverse airflow limit: blower not operating correctly, airflow setting too low, or the blower off delay too short - raise heating CFM or lengthen the heat off delay (60, 100, 140 or 180 seconds).",
   "E4.2 open rollout limit: cold header plug or inducer caps missing, flame impingement, inducer not operating properly, restricted heat exchanger, low manifold pressure, or a gas valve not fully closing.",
   "E4.2 on a horizontal furnace: a blocked main drain with an overflow standpipe higher than the bottom of the condensate trap can cause it in extreme cases - check the drain.",
   "E9.1 open inducer limit switch: excessive temperature rise across the heat exchanger, or a restricted flue assembly.",
   "Switch trip temperatures and reset types are not printed in the manual."
  ],
  "safety": "Should overheating occur or the gas supply fail to shut off, shut off the gas valve to the furnace before shutting off the electrical supply.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   5,
   12,
   13,
   76,
   96,
   97,
   105,
   106
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.5, p.12, p.13, p.76, p.96, p.97, p.105, p.106",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-blower-ifc-config",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Blower will not run or E13 / E14 / E17 / E18 / E24.1 after a board or motor change - S9VM",
  "summary": "The blower talks to the IFC over a 4-pin serial plug, and a replacement IFC has to be told which furnace it is in.",
  "steps": [
   "E17 = the IFC is not receiving a signal from the motor on RX: verify the high and low voltage wiring from the IFC to the motor; if the wiring is correct, replace the motor.",
   "E18 = the IFC is not sensing a signal on its own TX: remove the 4-pin motor connector from the IFC. If the code changes to E17 (91.00), replace the motor. If it does not change, replace the IFC.",
   "E13 = blower HP or OEM ID does not match the furnace model: wrong motor horsepower for the unit, or the wrong model number programmed into a replacement IFC. If the motor and model are both correct, replace the blower motor.",
   "Printed motor sizes: 1/2 hp on S9VMB060U3 / B060D3; 3/4 hp on S9VMB060U4, B080U4 and B080D4; 1 hp on the C100 and D120.",
   "E14 (configuration file error) or E24.1 (Modbus communication error) = a replacement IFC installed and the model number not programmed. Connect the indoor unit to the hub and power cycle; if it persists, configure the indoor control with the correct model number in the Technician App.",
   "The wiring diagram also lists display numbers for 'Model Number Recovery - 24 Volt Operation ONLY' (1 = S9VMB060U4VC ... 9 = S9VMB060U3VC); the IOM does not give the steps, so confirm the procedure with Trane before using it.",
   "In normal heat the blower starts about 30 seconds after flame is proved and runs the heat off delay after the burners stop."
  ],
  "safety": "Disconnect power before removing the blower door and wait at least 10 seconds for the IFC power supply to discharge to 0 volts. Do not bypass the door switch or the panel loop permanently.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   4,
   12,
   14,
   19,
   106,
   107,
   109
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.4, p.12, p.14, p.19, p.106, p.107, p.109",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-condensate",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "E9.2 open condensate switch / E9.3 condensate lockout - S9VM",
  "summary": "The furnace has a condensate pressure switch (CSI input on the IFC). Three trips in one heat call locks the furnace out on E9.3.",
  "steps": [
   "E9.2 = open condensate switch. E9.3 = the switch opened three times during one call for heat (lockout).",
   "Causes Trane lists: a common AC / furnace drain where AC condensate pressure trips the switch (relieve the static pressure from the AC condensate), a double-trapped condensate line, or flue gas condensate backing up into the trap.",
   "Check the drain is open to an open / vented drain, 1/2 in. PVC minimum outside the furnace, and not frozen.",
   "Horizontal installs - overflow standpipe: its opening must be even with or slightly below the bottom of the condensate trap. A blocked main drain with a standpipe higher than that can give E9.2, or in extreme cases an E4.2 rollout trip.",
   "Horizontal installs: the condensate pressure switch hose must be trimmed to fit - an untrimmed hose can cause the same E9.2.",
   "Where the coil and furnace drains are manifolded, a primary drain vent stack must be installed and end below the outlet of the secondary heat exchanger drain connection.",
   "Check the trap is connected and primed (E3.0 lists a trap not connected or primed; the downward-venting notes say to prime it at initial start-up prior to heating season operation), and check the furnace is level (a slight tilt left / forward is the only allowed variation in upflow or downflow).",
   "Where the drain can freeze: heat tape rated 5 or 6 watts per foot at 120 V, self-regulating or thermostatically controlled."
  ],
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   16,
   60,
   73,
   76,
   106
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.16, p.60, p.73, p.76, p.106",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-fault-recall-clear",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Reading and clearing fault codes on the IFC, and what the two LEDs mean - S9VM",
  "summary": "The IFC has a two-line display with Menu and Option buttons. Faults are in the Alarm Group; live readings are in the Monitor Group.",
  "steps": [
   "Menu scrolls down through the groups (Alarm, Furnace, Airflow, Delay, Sensor, Misc, Monitor; 24 V mode adds Test). Option enters a group and scrolls across its choices.",
   "Alarm Group, press Option: Active Alarms. Press Menu for Last 6 Faults; Option steps through them.",
   "To clear: in the Alarm Group press Menu 2 times to reach Clear L6 Faults, press Option 2 times to reach the double 'Clear L6 Faults', then press Menu to clear. 'Clear L6 Faults' appears 3 times to confirm.",
   "Each code also has a Comm Code in Trane's table, for example E9.2 = ERR.026.06, and a priority (Normal, Major or Critical). The wiring diagram says to see the unit hang tag for error codes.",
   "Green STATUS LED: slow flash (1 s on, 1 s off) = active demand; 2 flashes then a 3 second pause = active error; 3 flashes then a 3 second pause = internal (Modbus) communication lost. In 24 V mode it is off at idle.",
   "Amber COMM LED: steady on in 24 V mode. In Link (CAN) mode it flashes the node count; fast flash = CAN communication lost.",
   "To change a setting, first remove any call and wait for the fan off delay to finish - the display must show IDLE. Press Menu again to save; [ ] marks the saved value.",
   "Monitor Group for live values: GH Demand, GV Setpoint, Inducer RPM, Combustion Press, Blower CFM, static pressures, return and supply air temperature, fuel type."
  ],
  "safety": "Do not touch any components other than the Menu and Option buttons on the IFC when setting up the system or during fault code recovery.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   4,
   19,
   95,
   98,
   99,
   106
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.4, p.19, p.95, p.98, p.99, p.106",
  "confidence": "manual"
 },
 {
  "id": "u-trane-s9vm-link-vs-24v-setup",
  "unit": "^S9VM",
  "brand": "Trane",
  "equipment": "Gas Furnace",
  "title": "Link communicating or 24 V thermostat - wiring, staging and setting gas pressure - S9VM",
  "summary": "On Link the furnace modulates 40-100%. On a 24 V thermostat it is a two-stage furnace (65% / 100%), and gas pressure is set through the Third Party Test.",
  "steps": [
   "Link: communicating terminals R, DH, DL, B join the thermostat / System Controller, the furnace and the outdoor unit. At the outdoor unit R is required only with an outdoor load shed device or a 24 VAC charging solenoid, and B is optional on 2-wire outdoor applications (recommended otherwise). Cooling and heat pump airflow is set automatically from the outdoor unit. The supply air sensor that ships with the Link thermostat and System Controller goes in the supply plenum and must be enabled.",
   "24 V: thermostat strip BK, W2, W1, R, G, B/C, Y2, Y1, O. Y1 and/or Y2 must be wired to the IFC for proper cooling airflow. Cooling only: leave the Y1-O jumper. Heat pump: remove the Y1-O jumper and wire O to O.",
   "24 V with a single-stage heat thermostat (or too few wires): jumper W1 to W2 at the IFC; second stage starts after the inter-stage delay (Delay Group: 0, 300, 600 default, or 900 seconds).",
   "24 V staging: W1 = 65% firing rate, W2 = 100%. Set ODU Type, ODU Ton, CFM per ton, continuous fan and BK Input Config in the 24V Airflow Group.",
   "Gas pressure on Link: Technician App > Test Modes > Test Indoor Heat > Start; slide to 40%, wait for the actual GV setpoint to read 40%, adjust Low Fire; slide to 100%, wait, adjust High Fire; cycle both again and recheck.",
   "Gas pressure on 24 V: Test Group > Third Party Test > Start. The Comm and Status LEDs blink alternately for about 30 seconds; when the WAIT message goes away, jumper R to W1 and W2 on the low voltage strip - it lights and goes to 100%. Adjust high fire in the 24V Furnace Group (press Menu after each offset change). Remove the W2 jumper: it goes to 40%; when the valve position reads 40%, adjust low fire. Re-apply W2 to verify 100%. Cycle power off to end the test. (The same page lists the test inputs as R-W1 = 40%, R-W1+W2 = 100%, remove W1 = 65%.)",
   "Targets: natural gas 3.5 in. w.c. at 100%, 1.6 at 65% (not adjustable), 0.7 at 40%. Propane 10.0 at 100%, 6.0 at 65%; 40% is printed as 2.1 in the IOM and ~1.4 in the LP kit guide - set per the nameplate.",
   "Accessories (ACC1 / ACC2) and external switches must be configured in the Technician App (or the UX360 thermostat on Link). Do not use the condensate cooling option in 24 V mode."
  ],
  "safety": "Turn off all electrical power before loosening the pressure tap screw (one turn only, 3/32 in. hex). Afterward tighten it and leak-test the outlet boss and screw with leak detection solution.",
  "manual": "trane-s9vm-iom-fnr-svx006b",
  "pages": [
   19,
   42,
   43,
   44,
   45,
   70,
   71,
   72,
   96,
   97,
   100,
   101,
   103,
   110
  ],
  "source": "S9VM (97% modulating; American Standard Platinum 97 Modulating) Installation, Operation, and Maintenance - Upflow/Horizontal and Dedicated Downflow Gas-Fired, Direct/Non-Direct Vent, Modulating Condensing Variable Speed Furnaces with Variable Speed Draft Inducer (FNR-SVX006B-EN, 10/2026), p.19, p.42, p.43, p.44, p.45, p.70, p.71, p.72, p.96, p.97, p.100, p.101, p.103, p.110",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-status-light-off",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Dead board - status light off, nothing on the display - Carrier / Bryant FT5BD air handler",
  "summary": "The manual's first troubleshooting branch: line voltage, then 24 V at the board, then the board.",
  "steps": [
   "Is the LED status light on? The status LED stays off for 1 minute whenever the MENU or NEXT button is pressed - wait before deciding it is dead.",
   "Light off: is there 115 / 230 V at L1 and L2? No = check the power supply.",
   "Line voltage present: is there 24 V at SEC-1 and SEC-2 on the board? No = replace the transformer.",
   "24 V present at SEC-1 and SEC-2 and the light is still off = replace the fan coil control. A replacement board must be programmed with the Model Program Number from the rating plate before the air handler will operate.",
   "LED blinking rapidly without a pause = check for correct line voltage polarity.",
   "Before blaming the transformer make sure its primary tap matches the supply: units ship ready for 230 V; for 115 V or 208 V the tap lead has to be moved (wiring diagram note 7).",
   "Code 24.1 is the fuse fault: inspect the low-voltage fuse on the board (the board drawing and the text say 3 amp; wiring diagram note 4 says replace with no greater than 5 amp) and look for a short in the 24 V wiring including the thermostat leads - disconnect the thermostat leads to isolate it."
  ],
  "safety": "Before installing or servicing, always turn off all power to the unit - there may be more than one disconnect switch. Field wires on the line side of a unit-mounted disconnect remain live even when the pull-out is removed.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   9,
   12,
   18,
   23,
   24,
   25
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.9, p.12, p.18, p.23, p.24, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-read-flash-code",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Reading the flash code and the last 7 faults - Carrier / Bryant FT5BD air handler",
  "summary": "Through the door you only get the major code on the LED. The 3-digit display on the board gives major and minor, and the Flt menu holds the last 7.",
  "steps": [
   "Door on: the LED blinks slowly in short and long flashes. Count them - the number of short flashes is the first digit, the number of long flashes is the second digit. Only the MAJOR code (first two digits) is seen through the sight glass.",
   "Door off: the 3-digit display shows the major code in the first two digits and the minor code in the third digit, for example 41.4.",
   "No code flashing now: press MENU until Flt shows, then press NEXT to step through the last 7 status codes, starting with the most recent. If there are none the display shows 'non'.",
   "Look the code up in Error Codes (or on the service label inside the unit).",
   "To clear the history, step to CLr at the end of the queue and press MENU/SELECT. Status codes are also erased by themselves after 72 hours.",
   "No previous code and the unit still does not respond: go to the thermostat-signal checks (W, Y and G at the board).",
   "The status display returns after no button has been pressed for 60 seconds."
  ],
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   14,
   15,
   23,
   24
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.14, p.15, p.23, p.24",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-no-response-thermostat",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Board is powered, no codes, but it ignores the thermostat - Carrier / Bryant FT5BD air handler",
  "summary": "The flowchart branch for a board that does not respond to W, Y or G.",
  "steps": [
   "Check the fault history first (MENU to Flt, NEXT). 'non' means no stored code.",
   "Does the control respond to W, Y (if present) and G 24 V thermostat signals? If yes, run the system through a heating or cooling cycle to check operation.",
   "No response: is 24 V present at the W, Y (if present) or G thermostat terminals on the fan coil control? No = check the room thermostat or the interconnecting cable.",
   "24 V is there: disconnect all the thermostat wires from the fan coil control.",
   "Jumper R to W, Y (if present) or G. Does the problem repeat with the jumper? Yes = replace the fan coil control.",
   "No (it runs on the jumper) = the thermostat is not compatible with the fan coil control: either install a ballast resistor, connect the Com 24 V thermostat terminal to the thermostat, or replace the thermostat.",
   "Wiring reminder: the thermostat Y goes on Y/Y1 TSTAT and the outdoor unit Y goes on Y/Y1 OUT. Code 56.7 (Y inverted) or 56.8 (Y OUT shorted to Y TSTAT) means verify the thermostat wiring and power cycle."
  ],
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   10,
   23,
   24,
   25
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.10, p.23, p.24, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-a2l-test",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "A2L leak dissipation test and code 56 - Carrier / Bryant FT5BD air handler",
  "summary": "How to run the built-in 60 second leak dissipation test, what the board does on a real leak, and what each 56 code wants.",
  "steps": [
   "The test only runs with no faults on the main control board.",
   "Put the system in a cooling operating mode - the Y signal needs to be energized. (The Installation Instructions also say the control must be in idle (idL) to initiate a test sequence.)",
   "Press MENU to tSt, choose A2L and select. The board runs 60 seconds of normal dissipation logic - LED 600 ms slow blink.",
   "During the 60 seconds verify the outdoor compressor is shut off and the indoor fan is running. Then the system returns to normal operation and the test is complete.",
   "Check that the air handler can meet the required minimum dissipation airflow for the total system charge: 5 lb 133 SCFM, 10 lb 266, 15 lb 399, 20 lb 532, 25 lb 665 (Table 7 lists every pound from 5 to 25).",
   "On a real leak (sensor at 20% LFL): fan runs at the preset dissipation RPM, W/W1 and W2 calls are ignored (electric heat off), Y/Y1 and Y2 calls are ignored and Y/Y1 OUT drops so the outdoor compressor stops. 56.3 = active dissipation, 15 minute lockout for the outdoor unit.",
   "56.1: check for refrigerant leaks with an independent A2L detector; if no leaks are present, replace the sensor. 56.2: check the sensor harness at the board and sensor ends, power cycle; if 56.2 repeats, replace the control. 56.5 / 56.6: power cycle; if it repeats, replace the A2L sensor.",
   "Also check for dust or obstruction in front of the sensor. With the sensor unplugged the system defaults into Dissipation Mode and cannot be overwritten. After changing orientation the sensor must be relocated, connector facing down or horizontal - never upward."
  ],
  "safety": "Risk of fire - flammable refrigerant used. Failure to follow proper R-454B dissipation system installation instructions can result in property damage, personal injury or death. If any fault codes are listed, troubleshoot to prevent system malfunction.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   2,
   4,
   13,
   14,
   23,
   25,
   26
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.2, p.4, p.13, p.14, p.23, p.25, p.26",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-no-blower",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "No blower - codes 41 and 44, and the component test - Carrier / Bryant FT5BD air handler",
  "summary": "The blower is an ECM run by a separate motor controller. Use the code, then the built-in component test.",
  "steps": [
   "Read the code. 41.1 no blower RPM at start-up; 41.2 no RPM while running; 41.4 locked rotor (motor not rotating with a demand); 41.5 motor short circuit; 41.6 motor controller phase loss.",
   "For any 41 code check for loose blower wire connections and a failed blower motor. 41.5: verify wiring and check for frayed or exposed leads. 41.6: replace the motor controller; if the issue repeats, replace the motor.",
   "44.1 motor controller not receiving demand from the fan coil control - check for loose blower wire connections. 44.2 internal fault - replace the motor controller. 44.3 over temperature - clear debris, check airflow around the controller, power cycle and let it cool; if it repeats replace the controller.",
   "44.4 DC bus over / under voltage - measure the supply voltage; it must be within 10% of the expected supply. 44.5 invalid motor selection - follow the Motor Replacement instructions to reprogram the control. 44.6 incompatible version - update the motor controller or main controller software via OTA update. 44.7 blower motor internal fault - reprogram per the Motor Replacement instructions; if it persists replace / return the motor.",
   "For code 44, cycle power; if code 44 repeats after the troubleshooting steps, replace the motor controller.",
   "Component test: with the board in idle (idL) and no W, Y or G call, MENU to tSt, choose Ct. The display confirms tSt, then Fn runs the fan motor (Table 20 says 90 seconds; the service label says 100 seconds), then EH1 and EH2 if electric heat is fitted, then End for 2 seconds and the fan stops.",
   "Err = the component test could not start: check for thermostat inputs or faults and that the status is idle.",
   "Blower runs but airflow is low: check the speed settings (CL1 / CL2 / Ht1 / Ht2 / CFn) against the airflow tables and add the electric heat kit pressure drop to the duct static."
  ],
  "safety": "When servicing the unit ensure it is disconnected from power - the rotating fan can cause severe injury. Let the motor controller dissipate for a minimum of two minutes or until all LEDs go out.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   3,
   9,
   11,
   15,
   22,
   23,
   25
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.3, p.9, p.11, p.15, p.22, p.23, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-electric-heat",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Electric heat will not come on - codes 36 and 25.8 - Carrier / Bryant FT5BD air handler",
  "summary": "Electric heat on this air handler only works on 208/230 V, needs an approved kit plugged into the unit harness, and reports through codes 36.x and 25.8.",
  "steps": [
   "Check the supply voltage first. Electric heat is only functional at 208/230 V; on 115 V it will not function, and a heater must not be installed on a 115 V unit.",
   "36.1 heater not sensed - auxiliary heat call but no heater sensed. 36.2 heater sense fault - heat sensed with no call. 36.3 variable heater fault. For all three: check for loose electric heat wire connections.",
   "With variable (modulating) electric heat two separate heater plugs connect to the main control: the 6-pin from the fan coil harness and the 7-pin from the electric heat kit.",
   "25.8 invalid heater: verify the heater kit attached is listed on the rating plate and is wired properly. No heating operation with this code.",
   "The heater plugs into the unit harness plug in place of the air handler's own power plug (the power plug is removed and discarded when a heater is fitted).",
   "Test the stages: board idle, no thermostat call, MENU to tSt, Ct. After the fan step EH1 energizes heat stage 1 for 10 seconds, then EH2 energizes stage 2 for 10 seconds (both steps are skipped with no electric heat).",
   "Menu settings that affect it: Htt heating thermostat type (1-stage option = high stage auxiliary heat only; 2-stage option = thermostat controlled auxiliary heat); Eht modulating heat setpoint 0 off / 1 = 92.5 F / 2 = 110 F default / 3 = 130 F supply air; Eod electric heat delay.",
   "During a leak dissipation event the board ignores W/W1 and W2 - a 56 code will hold the heat off. Modulating heat also needs the RAT and SAT sensors (codes 52 / 53)."
  ],
  "safety": "Do not install an electric heater in this unit when using 115 VAC. Installation of electric heat requires a heat deflection plate between the fan and the heating element - without it the fan and fan motor will be compromised. Turn off accessory heater power too before servicing.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   9,
   11,
   16,
   22,
   23,
   25,
   26
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.9, p.11, p.16, p.22, p.23, p.25, p.26",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-nfc-setup-board-replacement",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Set-up with the Service Tech app (NFC) and programming a new board - Carrier / Bryant FT5BD air handler",
  "summary": "The board has an NFC antenna: a phone with NFC and the Service Tech app can adjust parameters, run diagnostics and load the model program.",
  "steps": [
   "Remove 115 / 230 V power from the air handler control board before using NFC (printed electrical shock warning). Product Data: set-up works without the unit being powered on.",
   "Hold the phone at the NFC antenna - the phone symbol at the top left corner of the board (Fig. 26). The app is linked from the QR code on the front page of the Installation Instructions.",
   "The manual says NFC with the Service Tech app allows adjustment of operating parameters, diagnostics and service; the speed setting for each mode can be selected from the main control board or the service tech app. Additional instructions may be in the app itself.",
   "Replacing the control board: the new board must be programmed with the correct Model Program Number before the air handler will operate. The number is on the rating plate.",
   "Approved method 1: flash the model program onto the board with the app over NFC.",
   "Approved method 2: use the correct air handler Super Plug and the model program number to copy the model program onto the new board.",
   "Do NOT program a Model Program Number different from the rating plate - parameter options will not match design values.",
   "Power up and check: the display alternates PrG (program number) and vEr (software version). Code 25.1 / 25.2 / 25.6 = program missing, corrupted or wrong - reprogram; replace the control if the issue remains. Code 27.x = Super Plug program problem."
  ],
  "safety": "Remove 115/230V power from the air handler control board before using NFC. During any servicing procedure let the motor controller dissipate for a minimum of two minutes or until all LEDs go out.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   9,
   14,
   15,
   18,
   23,
   25
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.9, p.14, p.15, p.18, p.23, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5bd-menu-setup",
  "unit": "^FT5BD(24|36|48|60)(17|21)X",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Start-up set-up on the board: system type, voltage, outdoor size, fan speeds - Carrier / Bryant FT5BD air handler",
  "summary": "Two buttons and a 3-digit display. What to set at start-up and what the factory defaults are.",
  "steps": [
   "MENU/SELECT scrolls the main menu. NEXT/OPTION shows the current setting (it flashes); more presses step through the options. MENU/SELECT saves and returns - the display flashes three times to confirm.",
   "tYP system type: AC or HP. With AC selected, Ht2, Ht1 and HPd do not show in the menu options.",
   "voL transformer voltage: 230 or 115. Make sure the transformer tap and the supply leads match the incoming power (units ship ready for 230 V).",
   "odU outdoor unit size: 24, 36, 48 or 60.",
   "Fan speeds: CL2 / CL1 cooling, Ht2 / Ht1 heat pump heating, CFn continuous fan - settings 1 to 25. Factory defaults (high heat / low heat / high cool / low cool / continuous): 2T 18 / 13 / 17 / 12 / 15; 3T 25 / 17 / 22 / 17 / 17; 4T 21 / 14 / 20 / 14 / 17; 5T 25 / 20 / 25 / 19 / 20.",
   "Pick the setting from the airflow table for the measured static. Do not go below 250 SCFM per ton in cooling or heating (coil freezing); above 450 SCFM per ton expect noise and water management concerns. Unknown rated airflow: 400 SCFM per ton high stage, 320 low stage.",
   "dir orientation: UPF or dnF flips the display 180 degrees so the codes read the right way up after a downflow conversion.",
   "Others: t° temperature display oFF (default) / F / C; Cod and Hod fan off delays in seconds; Htt heating thermostat type; Aot airflow outdoor type (single stage, thermostat-controlled two stage, or adaptive); Eht modulating heat setpoint; inF program number and software version; rSt then YES resets all settings to factory default."
  ],
  "safety": "Do NOT program the control board with a Model Program Number different than what is specified on the rating plate.",
  "manual": "carrier-ft5bd-install-im-ft5bd-01",
  "pages": [
   9,
   15,
   16,
   17,
   23
  ],
  "source": "FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00 (Carrier Performance / Bryant Preferred Next Generation air handler) Next Generation Air Handler FT5BD2417X00 / FT5BD3617X00 / FT5BD4821X00 / FT5BD6021X00, Multipoise, 2 thru 5 Ton, for Puron Advance Refrigerant - Installation Instructions (IM-FT5BD-01, Edition 11/26), p.9, p.15, p.16, p.17, p.23",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-read-display",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the two-character display — which board, status or fault — Trane multi-speed 7",
  "summary": "These units come with one of two control boards, and each has its own code list. Work out which board it is before reading the code.",
  "steps": [
   "The display is two 7-segment LEDs on the drive's control board (AOC): SEG1 is the status LED, SEG2 the fault LED.",
   "Which board: the Installer's Guide's captions label one board and list 'A1000AA models' and the other 'A1000BA models'. That reads as the end of the model number on the nameplate, but the guide prints no sentence saying so - confirm on the board (next step).",
   "Check on the board itself: the A1000AA board has three sensor plugs along the bottom (J21 AMB, J22 Dis_T, J23 Coil_T) and jumpers marked J2-J3 FB and J40-J41 TEST. The A1000BA board adds J24 Suc_T and J26 Suc_P and has three jumpers marked J3 FB, J2 R and J41 FL.",
   "A1000AA board: the FIRST character is the status (0 standby, 1 starting, 2 low speed, 3 high speed, 4 boost speed, 5 limp mode, 6 preheating, 7 defrosting, 8 de-rate, 9 oil-return, E software error, F fault, H hard lock). The SECOND character is the fault; 0 = no fault. So 20 is low speed with no fault.",
   "A1000BA board: each two-character code is one message. Run group: 00 standby, Y.1 / Y.2 starting low / high, Y1 / Y2 running low / high, Y2. running boost, 50 limp mode, 60 preheating, 70 defrosting. bt = boot. F codes are faults, d codes are de-rates, L codes are lockouts, H codes are hard-locks.",
   "On the A1000BA board watch the dot: Y.1 (dot after the Y) is starting low, Y1 with no dot is running low; Y2. (dot after the 2) is running boost.",
   "If more than one status or fault code is present, the displays cycle through the codes every two seconds. Priority: 1 faults and lockouts, 2 derates, 3 special modes such as defrost and preheat, 4 AOC test mode jumpers, 5 limp modes.",
   "Stored codes: quickly double-click the forced defrost button. The display first shows the total number of stored codes, then the codes from the oldest (01) to the most recent; it shows 'no' if nothing is stored. Double-click again to exit. The board keeps the 20 most recent codes (faults, lockouts, derates, AOC test modes and limp modes).",
   "The guide prints the name of each code only - it gives no cause list, no reset procedure and no repair steps. The 5TWX7060B / 5TTX7060B are on the WeatherGuard guide's cover but under neither board caption - go by the board."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   4,
   25,
   26,
   27,
   28
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.4, p.25, p.26, p.27, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-derate-lockout-hardlock",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "De-rate, lockout or hard-lock on the display — what the first letter tells you — Trane multi-speed 7",
  "summary": "The later (A1000BA) board shows the same protection at three levels - d, L and H - and the first (A1000AA) board shows it as a status digit plus a fault digit.",
  "steps": [
   "A1000BA board: the second character names what tripped and the first names the level. C = compressor over current, F = outdoor fan over current, 5 = MOC AC input over current, 6 = high MOC IPM temperature, 7 = high MOC PFC temperature, 8 = high coil temperature, d = high discharge temperature.",
   "With a d in front (dC, dF, d5, d6, d7, d8, dd) it is a de-rate; with an L (LC, LF, L5, L6, L7, L8, Ld) a lockout; with an H (HC, HF, H5, H6, H7, H8, Hd) a hard-lock.",
   "Pressure has lockout and hard-lock codes only: LL / HL = LPCO low pressure, LH / HH = HPCO / DTC (the description column reads 'MOC HPS Circuit Open'). For HL the Status column says HardLock but the Description column says 'AOC Low Suction Pressure Soft-Lock'.",
   "F codes on the A1000BA board are faults: F0 AOC-MOC communication after boot, F1 compressor start up, F2 compressor (hardware) over current, F3 compressor control (software over current, lost synchronization, lost phase), F4 fan control (over current, start up or rotation, lost phase), F5 AC over current (or PFC IGBT over current, VDC hardware over voltage), F6 MOC high temperature, F7 AC input voltage low, F8 DC voltage low or high / AC input voltage high, F9 MOC fault (mismatching configs / MOC hardware), FA / FC / Fd sensor faults, Fr no 24 VAC R signal on a heat pump.",
   "Boot group: bt = boot, E0 = Personality Module error (PM invalid or UID storage failed), E1 = configuration error (communication fault, config mismatch), E2 = AOC application error (AOC software / config parameter mismatch).",
   "A1000AA board: first character 8 = de-rate, F = fault, H = hard lock, 5 = limp mode; the second character names the protection (3 compressor internal protection IOL/OLP, 4 compressor overcurrent, 5 outdoor fan overcurrent, 6 high preheat IPM temperature, 7 high coil temperature, 8 high discharge temperature, 9 high MOC compressor IPM temperature, E high MOC PFC temperature, F high MOC fan IPM temperature, P pressure high or low).",
   "The product data describes the idea: compressor protections reduce operating speed and current draw to maintain operation while protecting the compressor (product data ODR-PSD028B-EN p.12, library file trane-5ttr7-5twr7-multispeed-product-data.pdf).",
   "The guide does not print how many trips turn a de-rate into a lockout or a hard-lock, or how to clear one - it is silent on reset."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   4,
   25,
   27,
   28
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.4, p.25, p.27, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-defrost",
  "unit": "^5TW[RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost — how it decides, forcing one, raising the termination temperature — Trane multi-speed 7 heat pump",
  "summary": "Demand defrost on the 5TWR7 / 5TWX7 uses the ambient and coil sensors; a forced defrost is a button on the control board.",
  "steps": [
   "The control measures outdoor ambient with a sensor outside the outdoor coil and coil temperature with a second sensor on the coil. The difference (ambient minus the colder coil) is Delta-T.",
   "Demand defrost is enabled when the outdoor ambient sensor reports 50°F or below and there has been a heating demand from the thermostat for a specific time period (the guide does not print the time).",
   "Defrost can occur once the current Delta-T exceeds the Delta-T initiate value. The coil sensor also ends the defrost cycle.",
   "To force a defrost: heat mode only, with the system running on a demand from the thermostat, press and hold the forced defrost button (S6) on the control board for over 5 seconds.",
   "When forced defrost begins the display shows a 7 as the first digit (70 = Defrosting in the A1000BA list).",
   "Termination temperature: it can be increased by clipping the defrost termination jumper pin (JP1, 'Defrost Term Temp' on the board). The guide's Figure 47 draws a 'Factory Termination Temp' line at about 50°F and a 'High Termination Temp' line at about 65°F coil temperature - read off the graph, no figures are printed.",
   "A fault condition is indicated by the LED display on the control board: ambient sensor fault = second character A (A1000AA) or FA (A1000BA); coil sensor fault = second character C or FC.",
   "Thermostat wiring: do not wire X2 with select Trane thermostats - defrost is communicated to the thermostat via the O signal - and do not jump the W terminals together with them; high stage heat is automatically called during defrost.",
   "Cold-climate install: raise the unit 3 to 12 inches so melted snow and ice drain before refreezing, and keep the base pan drain holes clear."
  ],
  "safety": "Do not use any items other than those approved by the manufacturer for defrosting or cleaning. Do not pierce or burn. Be cautious that refrigerants may be odorless.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   12,
   22,
   25,
   26,
   27,
   32
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.12, p.22, p.25, p.26, p.27, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-sensor-faults",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Temperature sensor fault on the display — which plug — Trane multi-speed 7",
  "summary": "Three sensor faults are in both code lists; each sensor has its own plug along the bottom edge of the control board.",
  "steps": [
   "Outdoor ambient sensor: second character A on the A1000AA board, FA on the A1000BA board. Plug J21 AMB. The sensor sits outside the outdoor coil.",
   "Coil temperature sensor: second character C, or FC. Plug J23 Coil_T. The sensor is on the outdoor coil.",
   "Discharge temperature sensor: second character D (the American Standard twin guide prints it as lowercase d), or Fd. Plug J22 Dis_T.",
   "The A1000BA board also has J24 Suc_T (suction temperature) and J26 Suc_P; the code list has no sensor fault code for J24.",
   "Do not confuse a sensor FAULT with a high-temperature protection: on the A1000AA board second character 7 = high coil temperature and 8 = high discharge temperature; on the A1000BA board d8 / L8 / H8 = high coil temperature and dd / Ld / Hd = high discharge temperature (de-rate / lockout / hard-lock).",
   "Why it matters for defrost: the ambient and coil readings make the Delta-T that starts a defrost, and the coil sensor also ends the defrost cycle.",
   "The Installer's Guides print no resistance-versus-temperature table for these sensors and no test procedure - confirm the sensor values from the unit's Service Facts before condemning a sensor."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   4,
   25,
   26,
   27,
   32
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.4, p.25, p.26, p.27, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-pressure-protection",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Pressure protection code — P, LL, LH, HL or HH — Trane multi-speed 7",
  "summary": "The first board has one code for high or low pressure; the later board separates the low-pressure cut-out from the high-pressure switch circuit.",
  "steps": [
   "A1000AA board: second character P = Pressure Protection (High or Low) - one code for both.",
   "A1000BA board: LL = Lockout: LPCO Low Pressure (AOC Low Suction Pressure Lockout). HL = HardLock: LPCO Low Pressure (the description column words it 'AOC Low Suction Pressure Soft-Lock').",
   "A1000BA board: LH = Lockout: HPCO / DTC (MOC HPS Circuit Open Lockout). HH = HardLock: HPCO / DTC (MOC HPS Circuit Open Hard-Lock).",
   "Where they land: the A1000BA board drawing shows plug J26 Suc_P on the control board (AOC). The high-pressure code descriptions name the MOC ('MOC HPS Circuit Open').",
   "The refrigeration controls include high and low pressure switches (product data ODR-PSD028B-EN p.12). No cut-out or reset pressures are printed in the Installer's Guide or the product data.",
   "Related A1000BA codes that are not pressure switches: d8 / L8 / H8 high coil temperature and dd / Ld / Hd high discharge temperature.",
   "Cooling below 55°F outdoor: the product data says the system has built-in freeze protection that allows cooling below 55°F but will reduce capacity or shut down completely to prevent operation under adverse conditions.",
   "Charge is checked by subcooling in cooling between 55°F and 115°F outdoor (the guide's Figure 42 prints 120°F / 55°F) with the indoor at 70°F to 80°F, after 20 minutes at full speed; design subcooling 024 = 10°F, 036 = 12°F, 048 = 12°F, 060 = 10°F (product data ODR-PSD028B-EN p.4-5) or the nameplate value."
  ],
  "safety": "System contains oil and refrigerant under high pressure - recover refrigerant to relieve pressure before opening the system. Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   3,
   4,
   25,
   26,
   27,
   28,
   29
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.3, p.4, p.25, p.26, p.27, p.28, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-startup-preheat-oil",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Start-up waits, preheating, oil-return and the R wire — Trane multi-speed 7",
  "summary": "Several things on these inverter units look like a no-start but are printed as normal behaviour or wiring requirements.",
  "steps": [
   "After turning on the disconnects, wait three hours before starting the unit if the outdoor ambient temperature is below 85°F.",
   "Preheating is a status, not a fault: first character 6 on the A1000AA board, 60 on the A1000BA board. The product data lists 'Compressor Heat: Yes' (ODR-PSD028B-EN p.4-5).",
   "Oil-return is a status on the A1000AA board: first character 9. The A1000BA list prints no oil-return code. The guide does not describe the oil-return cycle.",
   "Starting: first character 1 (A1000AA), or Y.1 / Y.2 = starting low / high (A1000BA). Limp mode: first character 5, or 50.",
   "Low-voltage power: heat pump models require R and O at the outdoor unit. 1000AA air conditioner models require R at the outdoor unit; all other AC models do not require R or O at the outdoor.",
   "A1000BA code Fr = 24 VAC Control R-Signal Fault, 'AOC No 24 VAC Control R-Signal on Heat Pump'.",
   "Outdoor low-voltage pigtails: R red, GND blue (24 VAC common), Y1 yellow (1st stage), Y2 yellow/red (2nd stage), O orange (SOV), X2 white. Control wire 18 AWG, 500 ft combined maximum.",
   "Open the gas / vapor service valve first - the guide says this keeps the compressor oil in the compressor at start-up - then the liquid valve.",
   "The variable speed compressor oil absorbs moisture: keep the system sealed, and if it is exposed to air for over 4 hours, replace the compressor oil.",
   "Let the unit stabilise at full speed for 20 minutes before adjusting the refrigerant charge."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twr7-5ttr7-install-odr-svn002f",
  "pages": [
   3,
   4,
   21,
   22,
   23,
   25,
   27,
   28
  ],
  "source": "5TWR7 / 5TTR7 Installer's Guide - Multi-Speed Heat Pumps and Air Conditioners featuring ComfortSeek, 5TWR7024A-060A / 5TTR7024A-060A (ODR-SVN002F-EN, October 2026), p.3, p.4, p.21, p.22, p.23, p.25, p.27, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-trane-ms7-drive-replacement",
  "unit": "^5T[WT][RX]7",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Replacing the multi-speed control drive — label colour, LPCO kit, cold plate torque — Trane multi-speed 7",
  "summary": "Trane's drive replacement guide covers the integrated multi-speed control drive (AOC board plus MOC drive) as one assembly. It speaks of 'multi-speed' drives by tonnage and does not list unit model numbers.",
  "steps": [
   "Pick the drive by label colour and tonnage: 2 and 3-ton multi-speed = purple labelled drive only; 4 and 5-ton multi-speed = orange labelled drive only. (Green and pink labels are for other units.)",
   "Kit check: if the drive being replaced is a DRV01838 or DRV04015 (D162554G01 or D162556G01), kit BAYLPWD17A is required for installation.",
   "Shut down the unit, wait at least two minutes, remove the four control box cover screws and measure across the +DC / -DC inverter test points. Do not proceed until the DC voltage measures less than 42 Vdc.",
   "Remove the ground wire at the bottom of the drive and disconnect the compressor harness. Ferrite harnesses on the HPCO leads, fan motor or compressor harness of the original drive are discarded - they are no longer required with the new drive designs.",
   "Unplug from the AOC: LSOV J17, EEV J5, ambient J21, discharge J22, coil J23, 24 Vac thermostat control J4, Personality Module J16, and LPCO (Suc_P) J26 on G02 and later drives. Unplug the HPCO wires, fan harness and compressor harness from the MOC, then the high-voltage field connections. Depress latching tabs and pull by the connector, never the wires.",
   "Remove the three aluminum nuts and the cold plate - avoid direct contact with the thermal grease that is exposed when the plate is removed. Ease the liquid line one to two inches off the drive without bending or straining it, and wipe the old thermal grease off with a clean, dry cloth.",
   "Remove the drive screws, supporting the drive on the last screw so it cannot slip and damage the liquid line; slide the drive up and away.",
   "On the new drive apply a small 1/8-inch bead of thermal grease in the centre of the liquid-line cutout along its entire length. Fit the drive (top right screw first, hand-tight; then the remaining five screws with a 5/16-inch nut driver) and check no wire is pinched.",
   "Reconnect the plugs. If the old drive was a DRV01838 or DRV04015: its LPCO and HPCO were in series; the new drive has a dedicated LPCO connection on the AOC - use the jumper from kit BAYLPWD17A to connect the unit's LPCO wires to the AOC and attach both HPCO wires to the MOC terminals. Stick the kit's wiring diagram over the old one inside the control cover: it shows the updated wiring and fault code list.",
   "Align the liquid line with the cutout and seat the grommet, position the cold plate over the liquid line on the bolts and hand-tighten the three aluminum nuts two to three turns, then press the liquid line into the cutout and finger-tighten while pressing on the cold plate (repeat three to four times, until thermal grease begins to flow around the tube). Tighten the three aluminum nuts to 40 to 50 in-lb. They are designed to strip out at 80 in-lb - do not overtighten. Without a torque wrench: finger-tighten, mark the nut at 12 o'clock and turn it to 5 o'clock. Use only the original aluminum nuts or those shipped with the replacement kit.",
   "Plug in the compressor plug, reattach the shielded harness ground wire, check the line set cover, start the unit and verify operation."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC; then verify less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board. Properly connect the system's oversized protective earthing (grounding) terminal(s) - high leakage current. Do not touch the top of the compressor; it may be hot.",
  "manual": "trane-vs-drive-replacement-odr-svn009b",
  "pages": [
   4,
   7,
   8,
   9,
   11,
   12,
   14,
   15,
   16,
   17,
   18
  ],
  "source": "Variable / multi-speed outdoor units Installer's Guide - Integrated Variable or Multi-Speed Control Drive Replacement (ODR-SVN009B-EN, July 2026), p.4, p.7, p.8, p.9, p.11, p.12, p.14, p.15, p.16, p.17, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-ignition-sequence",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the ignition sequence (it lights on high fire) - Y92V",
  "summary": "Knowing each step and its timing shows where the Y92V stops. The displays show H1 or H2 during the call, and a red flash count with a two-digit number when it faults.",
  "steps": [
   "Before anything else the manual has you check: power to the furnace and the control is on, the manual gas shut-off valves are open, and all wiring connections are secure (p.85).",
   "Call for heat: the status LED goes to a slow amber flash (2 s on, 2 s off) and the displays show H1 (first stage) or H2 (second stage) (p.86-87).",
   "The board first confirms the pressure switch contacts are open; if they are closed it stops with 02 and does not continue (p.88).",
   "The induced draft blower starts and comes up to speed. Shortly after, the hot surface igniter glows for about 17 s (p.65).",
   "After that warm-up the ignition module opens the main gas valve. The furnace lights at the HIGH fire input rate; if the thermostat is calling for low fire, the rate drops to low fire after flame is established (p.65).",
   "About 30 s after flame is established the supply air blower starts (the heat fan-on delay is fixed at 30 s) (p.65, p.76).",
   "No flame: the ignition control makes three attempts to light before locking out - code 07, the furnace locks out for 1 h and then restarts (p.65, p.89).",
   "For 07 the manual lists: gas valve switch in the on position, low or no gas pressure, faulty gas valve, dirty or faulty flame sensor, faulty hot surface ignitor, loose wires or a burner problem (p.89).",
   "First start-up: ignition may not be satisfactory at first because of residual air in the gas line or until the manifold pressure is adjusted (p.65).",
   "Staging: with Stg set to OFF the furnace only runs low fire; 10 or 20 moves it to high fire after 10 or 20 min; Aut uses the recent heating duty cycle (p.76)."
  ],
  "safety": "Do not attempt to light this furnace by hand (with a match or any other means). There may be a potential shock hazard from the components of the hot surface ignition system. Never bypass any safety control to allow furnace operation.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   65,
   85,
   88,
   89,
   76
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.65, p.85, p.88, p.89, p.76",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-pressure-switch",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes 02, 03, 06 and 13 - Y92V",
  "summary": "Three pressure switches: PS1 low, PS2 high and PS3 condensate. 02 = closed when it should be open, 03 = open when it should be closed, 06 = opened four times during the call, 13 = high switch open on a high-fire call.",
  "steps": [
   "02 (2 red flashes): the pressure switch is closed when it should be open. The board checks this at the beginning of each heat cycle and will not continue the ignition sequence. Check for a faulty pressure switch or miswiring. Diagram wording: pressure switch closed with IDM off (p.88, p.96).",
   "03 (3 red flashes): the pressure switch contacts are open when they should be closed. Check for faulty inducer, blocked vent pipe, broken pressure switch hose, disconnected pressure switch or inducer wires or faulty pressure switch. Diagram wording: PS1 open with low speed IDM on (p.88, p.96).",
   "13 (13 red flashes): the second-stage (high) pressure switch is open with a call for high fire. Same list: inducer, blocked vent pipe, broken or disconnected hoses, disconnected switch or inducer wiring, faulty switch. Diagram wording: PS2 open with high speed IDM on (p.90, p.96).",
   "06 (6 red flashes): the pressure switch opened four times during the call for heat. Check for faulty inducer, blocked vent pipe or faulty pressure switch. The furnace locks out for 1 h and then restarts (p.89).",
   "Condensate: PS3 (pressure switch-condensate) is wired in the PS1 circuit, and the manual lists blockage of condensate drain piping with blocked combustion air and vent piping as what the switches act on. Check the drain and that the condensate hoses slope down everywhere - a sagging loop that holds condensate stops the unit operating (p.83, p.44, p.96).",
   "Check the vent against the maximum equivalent length table for the size and altitude, and the 5 ft minimum vent length (p.49-51). A loop is built into the pressure switch vacuum hose; route hoses so condensate cannot enter a switch (p.43).",
   "Above 5,000 ft (or where low pressure inversions occur) a high-altitude kit with a pressure switch may be needed: 040A10 and 080B12 S1-1PS3317, 080C16 S1-1PS3315; the other sizes are listed 'No kit required' (p.32).",
   "The make / break settings of the switches are not printed in the manual - do not judge a switch by a figure from another furnace."
  ],
  "safety": "Never adjust pressure switch to allow furnace operation. Never bypass any safety control. Replace defective controls - do not try to repair them.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   88,
   89,
   90,
   85,
   96,
   32,
   43,
   44,
   49,
   83
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.88, p.89, p.90, p.85, p.96, p.32, p.43, p.44, p.49, p.83",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-flame-signal",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Flame problems - amber flashing, 07, 08 or 01 - Y92V",
  "summary": "Continuous amber flash = flame current below 0.35 microamps. 07 = no flame in three trials. 08 = flame lost five times. 01 = flame sensed with no call for heat. Flame current can be read on the board's displays.",
  "steps": [
   "Read the flame current: with H1 or H2 on the displays press Select. The CFM scrolls right to left for 5 s, then after a 1 s pause the flame current shows; the cycle repeats once and returns to the call (p.91).",
   "Printed levels: normal approximately 3.7 microamps DC; low flame signal warning starts at 1.5 microamps; control lockout point 0.1 microamps DC (p.91).",
   "Continuous amber flash (diagram: rapid amber, low flame sense current): flame sense current is below 0.35 micro amps. Check and clean flame sensor. Check for proper gas flow. Verify that current is greater than 0.35 micro amps at the flame current test pad (p.87).",
   "07 - flame could not be established during three trials: check the gas valve switch is on, low or no gas pressure, faulty gas valve, dirty or faulty flame sensor, faulty hot surface ignitor, loose wires or a burner problem. 1 h lockout, then it restarts (p.89).",
   "08 - flame lost five times (four recycles) during the heating cycle: check for low gas pressure, dirty or faulty flame sensor or faulty gas valve. 1 h lockout, then it restarts (p.89).",
   "Gas pressure to check against: inlet natural 4.5-10.5 in. w.c., propane 8.0-13.0 in. w.c. (at least 7 natural / 11 propane to make nameplate input), read at IN P. Manifold at OUT P: NG 3.5 high / 1.6 low, LP 9.8 high / 4.0 low in. w.c. (p.70, p.72).",
   "09 - check that the flame probe is not shorted to chassis, along with polarity and grounding; the furnace will not start the ignition sequence until it is corrected (p.89).",
   "01 - flame sensed when there was not a call for heat; the control turns on both the inducer and the supply air blower. Check for a leaking or slow-closing gas valve (p.87).",
   "A brief LED flash at light-off is normal: when flame is detected the control flashes the LED for 1/8 of a second and then enters a flame stabilization period (p.91)."
  ],
  "safety": "Set high fire before low fire. Use a 3/32 in. hex wrench to loosen the IN P / OUT P set screw one turn only - do not remove it - with gas and power off, and leak-check the port afterwards with the burners in operation. Never test for gas leaks with an open flame.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   87,
   91,
   89,
   70,
   66,
   72
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.87, p.91, p.89, p.70, p.66, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-limit-rollout",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Limit and rollout - codes 04, 11 and 05 - Y92V",
  "summary": "04 = main limit open. If it stays open more than 5 min the board goes to 11 (hard lockout); more than 15 min, or an open rollout switch, is 05 (hard lockout).",
  "steps": [
   "04 (4 red flashes): the main limit switch has opened. The board runs the supply air blower and the inducer. Check for a dirty filter, duct sizing, incorrect blower speed setting, incorrect firing rate, loose limit switch wiring or faulty blower motor (p.88). The wiring diagram words these codes differently: 04 = LS / ROS SWITCH OPEN, 11 = LS/ROS OPEN FROM 5 TO 15 MIN., 05 = LS / ROS OPEN GREATER THAN 15 MIN. (LS = limit switch, ROS = rollout switch) (p.96).",
   "Limit not closed within 5 min: the board operates as if the blower is not functioning, starts a hard lockout and flashes 11. The manual says 11 is usually caused by a failed blower motor or blower wheel; check limit switch wiring, verify the limit is closed, check for a faulty blower motor (p.88, p.90).",
   "Limit still open after 15 min: the board operates as if a manual-reset rollout switch has opened and flashes 05 (p.88).",
   "05 (5 red flashes): the normally closed rollout switch is open, or the limit has been open longer than 15 min. The rollout control is manually reset. Check for proper combustion air, proper inducer operation, and primary heat exchanger failure or a burner problem (p.89).",
   "05 and 11 are hard lockouts: power must be cycled off and on to reset the control after the problem is corrected (p.89, p.90).",
   "The limit is an automatic reset control on the vestibule panel near the gas valve; the rollout switches are on the burner assembly. The board also locks out if the limit trips five consecutive times, and tries again after 1 h (p.83-84).",
   "Check the temperature rise after about 10 min of operation, measured about 6 ft from the furnace: high / low fire 040A10 30-60 / 25-55, 060B12 35-65 / 30-60, 080B12 40-70 / 30-60, 080C16 40-70 / 25-55, 100C16 40-70 / 30-60, 100C20 35-65 / 30-60, 120D20 45-75 / 30-60 F; maximum outlet air 190 F (p.79, p.35).",
   "Rise too high: increase the blower speed - CF2 menu > Ht (B is the highest airflow, A medium high, C medium, D the lowest). The printed defaults do not agree: the text gives the Ht default as A, the Default blower speeds table gives C on 040A10 and 060B12 and D on the other sizes. Read the setting on the board (p.74, p.77, p.79, p.83).",
   "Trip temperatures of the limit and rollout switches are not printed in the manual."
  ],
  "safety": "Never bypass any safety control to allow furnace operation. Under NO circumstances can the furnace be allowed to operate above the Maximum Supply Air Temperature - it will cause premature heat exchanger failure, high levels of carbon monoxide and a fire hazard.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   88,
   89,
   90,
   83,
   79,
   35,
   74,
   77,
   96
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.88, p.89, p.90, p.83, p.79, p.35, p.74, p.77, p.96",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-blower-airflow",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Blower / airflow setup in the 7-segment board menus (ECM blower) - Y92V",
  "summary": "Airflow is set in menus with the Back / Left / Right / Select buttons. The board must be unlocked first. Code 12 is a model ID configuration error (the model ID identifies the motor horsepower and airflow configuration).",
  "steps": [
   "Unlock: press and hold Left and Right for 5 s until the displays show UnL. In locked mode settings can be viewed but not changed. It re-locks when Left and Right are pressed again or after 10 min idle (p.75).",
   "Menu order with the Right button: call status > Fault history > Configuration (CFG) > Blower configuration (CF2) > Model ID (Id); Select enters a menu, Left and Back go back (p.74).",
   "Gas heat airflow: CF2 > Ht. A = medium high, B = highest, C = medium, D = lowest. Heat CFM for each setting and size is in the High and low heat CFM table (p.77, p.82).",
   "Cooling airflow: CF2 > CL (A highest to D lowest) with CF2 > Adj (A nominal, B +10%, C -10%, D nominal). Pick about 350 to 400 CFM per ton (p.78).",
   "Continuous fan: CFG > FSd. A = 40%, B = 70%, C = 100% of the selected high stage cooling speed (p.76).",
   "Heat blower off delay: CFG > bdy - 60, 90, 120 or 180 s (default 60 s). Blower delay profile: CF2 > dLy, A to D (p.76-77).",
   "Heat pump outdoor unit: CFG > HP must be On. Humidistat: CFG > HSt On - cooling CFM drops 15% when the humidistat indicates high humidity (p.75, p.84).",
   "See what the motor is being asked for: during any active call press Select - the CFM scrolls across the displays (p.91).",
   "Code 12 or a replaced board: Id menu > Select shows the model ID. 040A10 = 1, 060B12 = 2, 080B12 = 3, 080C16 = 4, 100C16 = 5, 100C20 = 6, 120D20 = 7; 0 = not configured. In unlocked mode navigate to the right number and press Select (p.79, p.93).",
   "Printed defaults do not agree: the text gives Ht default A, the Default blower speeds table gives C (040A10, 060B12) or D (other sizes). Read the board (p.74-75, p.83).",
   "44 (4 amber flashes) = Y from the thermostat without G: the furnace still runs, verify the G wire (p.91)."
  ],
  "safety": "Do not change the model ID unless it has been changed to an incorrect model or you are replacing the control board - incorrect configuration of the model ID could lead to equipment failure and damage. Blower and burner must never be operated without the blower panel in place.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   75,
   74,
   77,
   78,
   82,
   83,
   79,
   93,
   91
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.75, p.74, p.77, p.78, p.82, p.83, p.79, p.93, p.91",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-rl-refrigerant-leak",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "rL on the display - refrigerant leak detected near the furnace - Y92V",
  "summary": "Alternating red and amber flashes with rL: the furnace manual says a refrigerant leak has been detected near the unit. Its whole instruction is to check for a refrigerant leak; the refrigerant detection system (RDS) used with the add-on indoor coil has its own Installation Manual.",
  "steps": [
   "What the manual prints: status LED alternating red and amber flashes, displays rL - indicates that a refrigerant leak has been detected near the unit. Solution: check for refrigerant leak (p.87; diagram p.96).",
   "The furnace manual does not say what the furnace does while rL is showing (blower, burner, lockout) or how the code clears, and it is not one of the codes it describes as a lockout. Do not assume a behaviour - confirm it in the RDS / indoor coil manual.",
   "Why it appears: an add-on indoor coil paired with an outdoor unit using an A2L refrigerant must typically use a refrigerant detection system (RDS), depending on the refrigerant charge. The RDS is interfaced with the conventional or communicating wiring per the Installation Manual for the RDS or for the indoor coil with a factory-installed RDS (p.36, p.38, p.41, p.42).",
   "York's R-454B outdoor-unit manuals name this furnace: for Y82V, Z8VT, Y92V and Z9VT do not use the mitigation control's green G output wire - use the green/black A2L wire and connect it to the G terminal on the furnace; both mitigation DIP switches in the 1 / on position (YH4 / XH4 / RH4 manual 6694740-UIM-B-1025 p.14; YC3 / YC4 / YC6 manual 6411591-UIM-B-0824 p.13).",
   "The furnace wiring diagram shows no refrigerant sensor connector on the furnace board. York's YH9 / XH9 manual (6515371-UIM-B-0526 p.12) describes two refrigerant detection systems used with its indoor coils: one with a control board, a remote mounted sensor and a 10-pin connection cable, and one that is a sensor only with a 6-pin connection cable. Its Figure 16 (p.37) shows the 6-pin sensor wired to a communicating furnace's R, C and G terminals and does not name furnace models. Find out which system is on the coil - the leak check and the sensor check start there, and the mitigation control LED, DIP switch and field-test steps below apply only where the 10-pin control board is fitted.",
   "Look at the A2L mitigation control's red LED (drawing in the YH9 / XH9 manual 6515371-UIM-B-0526 p.13): on = control failure; 2 flashes = sensor detects refrigerant above alarm level; 3 flashes = sensor communicates failure; 4 flashes = loss of communication with sensor. A sensor or wiring fault is a different repair from a real leak.",
   "Wiring to confirm against those York manuals: the green/black A2L wire (not the green G wire) is the one on the furnace G terminal, and both mitigation DIP switches are on. On a YH9 / XH9 communicating system only C (blue), R (red) and A2L (green with black stripe) go to the equipment and the rest are capped (6515371-UIM-B-0526 p.13, p.36).",
   "After the repair, where the 10-pin mitigation control board is fitted, do its field test. YH4 / XH4 / RH4 manual 6694740-UIM-B-1025 p.15: give a Y call for cooling; disconnect the A2L sensor wire from the A2L control board or short the test pins with a screwdriver; after 15 s verify the call for the compressor is removed, the Y output pin has no voltage and the G output pin has 24 VAC; reinstall the sensor or stop shorting the pins and verify the system returns to cooling mode; with the system in standby repeat for a W call for heating; re-install the front cover on the control box. The YC3 / YC4 / YC6 manual 6411591-UIM-B-0824 p.14 differs: move the test jumper from NC to Test instead of shorting pins, return the jumper to NC once testing is complete, and after reinstalling the sensor wait 5 min before verifying that cooling returns.",
   "rL is listed with the other codes the board can show; whether it is stored in the L5F history is not stated."
  ],
  "safety": "Manual warning: technicians who maintain, service, repair, or dispose of equipment that could release refrigerants into the atmosphere must be certified (EPA Section 608) (p.9). Never bypass any safety control to allow furnace operation (p.85).",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   87,
   96,
   9,
   36,
   38,
   41,
   42,
   85
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.87, p.96, p.9, p.36, p.38, p.41, p.42, p.85",
  "confidence": "manual"
 },
 {
  "id": "u-york-y92v-fault-history",
  "unit": "^Y92V",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Recalling and clearing the last five faults (L5F), and resetting a lockout - Y92V",
  "summary": "The board keeps the five most recent fault codes even through a power loss. They are read in the L5F menu with the Left / Right / Select buttons.",
  "steps": [
   "Make sure that there are no active thermostat calls (p.92-93).",
   "Press Left until L5F is displayed, then press Select (wiring diagram, Fault Code Retrieval). From the standby display the Right button also reaches Fault history (p.96, p.74).",
   "The displays show the most recent stored fault - the diagram says it is shown with a dot in the bottom right corner of the display. Press Right to step to the next older fault (p.92-93, p.96).",
   "No stored faults: the displays show --- (p.92-93).",
   "Up to five codes are stored; if more than five have occurred since the last reset, only the five most recent are kept. Memory is retained if power is lost (p.92-93).",
   "To clear: first unlock the board - press and hold Left and Right for 5 s until UnL shows. Then in the L5F menu press and hold Select for 5 s. The displays show --- and the status LED gives 3 green flashes (p.75, p.92-93).",
   "Faults can only be cleared while the control is in unlocked mode; the board re-locks after 10 min idle (p.96, p.75).",
   "Lockouts: a soft lockout (06, 07, 08) resets by itself after 1 h. A hard lockout (05, 11) needs power to the control turned off and back on after the problem is corrected (p.85, p.93).",
   "Active code meanings are in Error Codes under this furnace: red flash count = the two-digit number on the displays (01-13, 17, 18), rapid red = FUS, 4 amber = 44, alternating red / amber = rL."
  ],
  "safety": "The manual says the fault history feature must be used only by a qualified service technician. Open all disconnects before servicing the unit.",
  "manual": "york-y92v-z9vt-furnace-install",
  "pages": [
   92,
   96,
   75,
   85,
   93,
   74
  ],
  "source": "Y92V / Z9VT (96% two-stage variable-speed ECM) Installation Manual: Y92V Series Two-Stage Variable Speed ECM Gas Furnace, Multi-Position (6553957-UIM-A-0626, 06/2026), p.92, p.96, p.75, p.85, p.93, p.74",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-ignition-sequence",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the ignition sequence (it lights on high fire) - Y82V / Z8VT",
  "summary": "Knowing each step and its timing shows where the Y82V / Z8VT stops. The displays show H1 or H2 during the call, and a red flash count with a two-digit number when it faults.",
  "steps": [
   "Before anything else the manual has you check: power to the furnace and the control is on, the manual gas shut-off valves are open, and all wiring connections are secure (p.63).",
   "Call for heat: the status LED goes to a slow amber flash (2 s on, 2 s off) and the displays show H1 (first stage) or H2 (second stage) (p.64).",
   "The board first confirms the pressure switch contacts are open; if they are closed it stops with 02 and does not continue (p.65).",
   "The induced draft blower starts and comes up to speed. Shortly after, the hot surface igniter glows for about 17 s (p.45).",
   "After that warm-up the ignition module opens the main gas valve. The furnace lights at the HIGH fire input rate; if the thermostat is calling for low fire, the rate drops to low fire after flame is established (p.45).",
   "About 30 s after flame is established the supply air blower starts (the heat fan-on delay is fixed at 30 s) (p.45, p.55).",
   "No flame: the ignition control makes three attempts to light before locking out - code 07, the furnace locks out for 1 h and then restarts (p.45, p.66).",
   "For 07 the manual lists: gas valve switch in the on position, low or no gas pressure, faulty gas valve, dirty or faulty flame sensor, faulty hot surface ignitor, loose wires or a burner problem (p.66).",
   "First start-up: ignition may not be satisfactory at first because of residual air in the gas line or until the manifold pressure is adjusted (p.45).",
   "Staging: with Stg set to OFF the furnace only runs low fire; 10 or 20 moves it to high fire after 10 or 20 min; Aut uses the recent heating duty cycle. The manual prints the Stg default two ways - off on p.53, auto on p.54 - so read the board (p.53, p.54)."
  ],
  "safety": "Do not attempt to light this furnace by hand (with a match or any other means). There may be a potential shock hazard from the components of the hot surface ignition system. Never bypass any safety control to allow furnace operation.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   45,
   53,
   54,
   55,
   62,
   63,
   64,
   65,
   66
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.45, p.53, p.54, p.55, p.62, p.63, p.64, p.65, p.66",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-pressure-switch",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Pressure switch codes 02, 03, 06 and 13 - Y82V / Z8VT",
  "summary": "Two pressure switches: PS1 low and PS2 high. 02 = closed when it should be open, 03 = open when it should be closed, 06 = opened four times during the call, 13 = high switch open on a high-fire call.",
  "steps": [
   "02 (2 red flashes): the pressure switch is closed when it should be open. The board checks this at the beginning of each heat cycle and will not continue the ignition sequence. Check for a faulty pressure switch or miswiring. Diagram wording: pressure switch closed with IDM off (p.65, p.72).",
   "03 (3 red flashes): the pressure switch contacts are open when they should be closed. Check for faulty inducer, blocked vent pipe, broken pressure switch hose, disconnected pressure switch or inducer wires or faulty pressure switch. Diagram wording: PS1 open with low speed IDM on (p.65, p.72).",
   "13 (13 red flashes): the second-stage (high) pressure switch is open with a call for high fire. Same list: inducer, blocked vent pipe, broken or disconnected hoses, disconnected switch or inducer wiring, faulty switch. Diagram wording: PS2 open with high speed IDM on (p.67, p.72).",
   "06 (6 red flashes): the pressure switch opened four times during the call for heat. Check for faulty inducer, blocked vent pipe or faulty pressure switch. The furnace locks out for 1 h and then restarts (p.66).",
   "What the switches watch on this furnace: blockage of vent piping or terminal, and failure of the combustion air blower motor (p.61).",
   "This is a Category I furnace with a 4 in. flue transition: check the vent connector and chimney, and after converting to horizontal or downflow check the inducer was rotated without damaging its gasket (p.38-39).",
   "Above 5,000 ft (or where low pressure inversions occur) a high-altitude kit with a pressure switch must be installed (p.27).",
   "The make / break settings of the switches are not printed in the manual - do not judge a switch by a figure from another furnace."
  ],
  "safety": "Never adjust pressure switch to allow furnace operation. Never bypass any safety control. Replace defective controls - do not try to repair them.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   65,
   66,
   67,
   63,
   72,
   27,
   38,
   61
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.65, p.66, p.67, p.63, p.72, p.27, p.38, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-flame-signal",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Flame problems - amber flashing, 07, 08 or 01 - Y82V / Z8VT",
  "summary": "Continuous amber flash = flame current below 0.35 microamps. 07 = no flame in three trials. 08 = flame lost five times. 01 = flame sensed with no call for heat. Flame current can be read on the board's displays.",
  "steps": [
   "Read the flame current: with H1 or H2 on the displays press Select. The CFM scrolls right to left for 5 s, then after a 1 s pause the flame current shows; the cycle repeats once and returns to the call (p.68).",
   "Printed levels: normal approximately 3.7 microamps DC; low flame signal warning starts at 1.5 microamps; control lockout point 0.1 microamps DC (p.68).",
   "Continuous amber flash (diagram: rapid amber, low flame sense current): flame sense current is below 0.35 micro amps. Check and clean flame sensor. Check for proper gas flow. Verify that current is greater than 0.35 micro amps at the flame current test pad (p.64).",
   "07 - flame could not be established during three trials: check the gas valve switch is on, low or no gas pressure, faulty gas valve, dirty or faulty flame sensor, faulty hot surface ignitor, loose wires or a burner problem. 1 h lockout, then it restarts (p.66).",
   "08 - flame lost five times (four recycles) during the heating cycle: check for low gas pressure, dirty or faulty flame sensor or faulty gas valve. 1 h lockout, then it restarts (p.66).",
   "Gas pressure to check against: inlet natural 4.5-10.5 in. w.c., propane 8.0-13.0 in. w.c. (at least 7 natural / 11 propane to make nameplate input), read at IN P. Manifold at OUT P: NG 3.5 high / 1.5 low, LP 10.0 high / 4.2 low in. w.c. in the nominal table. The altitude tables on p.28 (0-7999 ft column) go by gas heating value instead: NG high 3.5 for 800-1050 Btu/cu ft and 3.2 at 1100; NG low 1.7 for 800-950, 1.6 at 1000, 1.5 at 1050, 1.3 at 1100; LP 9.8 high / 4.1 low - go by the rating plate (p.49, p.50, p.28).",
   "09 - check that the flame probe is not shorted to chassis, along with polarity and grounding; the furnace will not start the ignition sequence until it is corrected (p.66).",
   "01 - flame sensed when there was not a call for heat; the control turns on both the inducer and the supply air blower. Check for a leaking or slow-closing gas valve (p.65).",
   "A brief LED flash at light-off is normal: when flame is detected the control flashes the LED for 1/8 of a second and then enters a flame stabilization period (p.68)."
  ],
  "safety": "Set high fire before low fire. Use a 3/32 in. hex wrench to loosen the IN P / OUT P set screw one turn only - do not remove it - with gas and power off, and leak-check the port afterwards with the burners in operation. Never test for gas leaks with an open flame.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   64,
   68,
   65,
   66,
   49,
   45,
   50,
   28,
   72
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.64, p.68, p.65, p.66, p.49, p.45, p.50, p.28, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-limit-rollout",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Limit and rollout - codes 04, 11 and 05 - Y82V / Z8VT",
  "summary": "04 = main limit open. If it stays open more than 5 min the board goes to 11 (hard lockout); more than 15 min, or an open rollout switch, is 05 (hard lockout).",
  "steps": [
   "04 (4 red flashes): the main limit switch has opened. The board runs the supply air blower and the inducer. Check for a dirty filter, duct sizing, incorrect blower speed setting, incorrect firing rate, loose limit switch wiring or faulty blower motor. The wiring diagram words these codes differently: 04 = LS / ROS switch open (limit switch / rollout switch), 11 = LS/ROS open from 5 to 15 min, 05 = LS / ROS open greater than 15 min (p.65, p.72).",
   "Limit not closed within 5 min: the board operates as if the blower is not functioning, starts a hard lockout and flashes 11. The manual says 11 is usually caused by a failed blower motor or blower wheel; check limit switch wiring, verify the limit is closed, check for a faulty blower motor (p.65, p.67).",
   "Limit still open after 15 min: the board operates as if a manual-reset rollout switch has opened and flashes 05 (p.65).",
   "05 (5 red flashes): the normally closed rollout switch is open, or the limit has been open longer than 15 min. The rollout control is manually reset. Check for proper combustion air, proper inducer operation, and primary heat exchanger failure or a burner problem (p.66).",
   "05 and 11 are hard lockouts: power must be cycled off and on to reset the control after the problem is corrected (p.66, p.67).",
   "The limit is an automatic reset control on the vestibule panel near the gas valve; the rollout switches are on the burner assembly. The board also locks out if the limit trips five consecutive times, and tries again after 1 h (p.61).",
   "Check the temperature rise after about 10 min of operation, measured about 6 ft from the furnace: high fire 30-60 F, low fire 20-50 F on every size; maximum outlet air 190 F (p.58, p.30).",
   "Rise too high: increase the blower speed - CF2 menu > Ht (B is the highest airflow, A medium high, C medium, D the lowest). The printed factory heat setting does not agree: the text gives default A, the Default blower speeds table gives D for every size - read the board (p.53, p.55, p.60).",
   "Trip temperatures of the limit and rollout switches are not printed in the manual."
  ],
  "safety": "Never bypass any safety control to allow furnace operation. Under NO circumstances can the furnace be allowed to operate above the Maximum Supply Air Temperature - it will cause premature heat exchanger failure, high levels of carbon monoxide and a fire hazard.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   65,
   66,
   67,
   61,
   58,
   30,
   53,
   55,
   60,
   63,
   72
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.65, p.66, p.67, p.61, p.58, p.30, p.53, p.55, p.60, p.63, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-blower-airflow",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Blower / airflow setup on the 7-segment board (ECM, set in menus with the push buttons) - Y82V / Z8VT",
  "summary": "Airflow is set in menus with the Back / Left / Right / Select buttons. The board must be unlocked first. Code 12 means the model ID (motor horsepower and airflow configuration) is wrong.",
  "steps": [
   "Unlock: press and hold Left and Right for 5 s until the displays show UnL. In locked mode settings can be viewed but not changed. It re-locks when Left and Right are pressed again or after 10 min idle (p.53).",
   "Menu order with the Right button: call status > Fault history > Configuration (CFG) > Blower configuration (CF2) > Model ID (Id); Select enters a menu, Left and Back go back (p.52).",
   "Gas heat airflow: CF2 > Ht. A = medium high, B = highest, C = medium, D = lowest. Heat CFM for each setting and size is in the High and low heat CFM table. In that table the 100C20 rows for C and D print a low heat CFM higher than the high heat CFM (C 1450 high / 1825 low, D 1300 high / 1625 low) - treat those four figures as doubtful (p.55, p.60).",
   "Cooling airflow: CF2 > CL (A highest to D lowest) with CF2 > Adj (A nominal, B +10%, C -10%, D nominal). Pick about 350 to 400 CFM per ton (p.56).",
   "Continuous fan: CFG > FSd. A = 40%, B = 70%, C = 100% of the selected high stage cooling speed (p.54).",
   "Heat blower off delay: CFG > bdy - 60, 90, 120 or 180 s (default 60 s). Blower delay profile: CF2 > dLy, A to D (p.55-56).",
   "Heat pump outdoor unit: CFG > HP must be On. Humidistat: CFG > HSt On - cooling CFM drops 15% when the humidistat indicates high humidity (p.53-54, p.62).",
   "See what the motor is being asked for: during any active call press Select - the CFM scrolls across the displays (p.68).",
   "Code 12 or a replaced board: Id menu > Select shows the model ID. 060A12 = 8, 080B12 = 9, 080C16 = 10, 100C16 = 11, 100C20 = 12, 120C20 = 13. In unlocked mode navigate to the right number and press Select (p.57, p.70).",
   "Printed defaults do not agree. Ht: the text gives default A, the Default blower speeds table gives D for every size. dLy: the text calls profile A the default, but the dLy settings table also calls D 'Default profile D'. Read the board (p.53, p.55, p.56, p.60).",
   "44 (4 amber flashes) = Y from the thermostat without G: the furnace still runs, verify the G wire (p.67)."
  ],
  "safety": "Do not change the model ID unless it has been changed to an incorrect model or you are replacing the control board - incorrect configuration of the model ID could lead to equipment failure and damage. Blower and burner must never be operated without the blower panel in place.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   52,
   53,
   54,
   55,
   56,
   57,
   60,
   61,
   62,
   67,
   68,
   70
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.52, p.53, p.54, p.55, p.56, p.57, p.60, p.61, p.62, p.67, p.68, p.70",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-rl-refrigerant-leak",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "rL on the display - refrigerant leak detected near the furnace - Y82V / Z8VT",
  "summary": "Alternating red and amber flashes with rL: the furnace manual says a refrigerant leak has been detected near the furnace. Its whole instruction is to check for a refrigerant leak; the refrigerant detection system (RDS) used with the add-on indoor coil has its own Installation Manual.",
  "steps": [
   "What the manual prints: status LED alternating red and amber flashes, displays rL - indicates that a refrigerant leak has been detected near the furnace. Solution: check for refrigerant leak (p.65; diagram p.72).",
   "The furnace manual does not say what the furnace does while rL is showing (blower, burner, lockout) or how the code clears, and it is not one of the codes it describes as a lockout. Do not assume a behaviour - confirm it in the RDS / indoor coil manual.",
   "Why it appears: an add-on indoor coil paired with an outdoor unit using an A2L refrigerant must use a refrigerant detection system (RDS). The RDS is interfaced with the conventional or communicating wiring per the Installation Manual for the RDS or for the indoor coil with a factory-installed RDS (p.31, p.34, p.37, p.38).",
   "York's R-454B outdoor-unit manuals name this furnace: for Y82V, Z8VT, Y92V and Z9VT do not use the mitigation control's green G output wire - use the green/black A2L wire and connect it to the G terminal on the furnace; both mitigation DIP switches in the 1 / on position (YH4 / XH4 / RH4 manual 6694740-UIM-B-1025 p.14; YC3 / YC4 / YC6 manual 6411591-UIM-B-0824 p.13).",
   "The furnace wiring diagram shows no refrigerant sensor connector on the furnace board. York's YH9 / XH9 manual (6515371-UIM-B-0526 p.12) describes two refrigerant detection systems used with its indoor coils: one with a control board, a remote mounted sensor and a 10-pin connection cable, and one that is a sensor only with a 6-pin connection cable. Its Figure 16 (p.37) shows the 6-pin sensor wired to a communicating furnace's R, C and G terminals and does not name furnace models. Find out which system is on the coil - the leak check and the sensor check start there, and the mitigation control LED, DIP switch and field-test steps below apply only where the 10-pin control board is fitted.",
   "Look at the A2L mitigation control's red LED (drawing in the YH9 / XH9 manual 6515371-UIM-B-0526 p.13): on = control failure; 2 flashes = sensor detects refrigerant above alarm level; 3 flashes = sensor communicates failure; 4 flashes = loss of communication with sensor. A sensor or wiring fault is a different repair from a real leak.",
   "Wiring to confirm against those York manuals: the green/black A2L wire (not the green G wire) is the one on the furnace G terminal, and both mitigation DIP switches are on. On a YH9 / XH9 communicating system only C (blue), R (red) and A2L (green with black stripe) go to the equipment and the rest are capped (6515371-UIM-B-0526 p.13, p.36).",
   "After the repair, where the 10-pin mitigation control board is fitted, do its field test. YH4 / XH4 / RH4 manual 6694740-UIM-B-1025 p.15: give a Y call for cooling; disconnect the A2L sensor wire from the A2L control board or short the test pins with a screwdriver; after 15 s verify the call for the compressor is removed, the Y output pin has no voltage and the G output pin has 24 VAC; reinstall the sensor or stop shorting the pins and verify the system returns to cooling mode; with the system in standby repeat for a W call for heating; re-install the front cover on the control box. The YC3 / YC4 / YC6 manual 6411591-UIM-B-0824 p.14 differs: move the test jumper from NC to Test instead of shorting pins, return the jumper to NC once testing is complete, and after reinstalling the sensor wait 5 min before verifying that cooling returns.",
   "rL is listed with the other codes the board can show; whether it is stored in the L5F history is not stated."
  ],
  "safety": "Never bypass any safety control to allow furnace operation (p.63). Follow the warnings in the RDS / indoor coil and outdoor unit manuals when working on the refrigerant side.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   65,
   72,
   31,
   34,
   37,
   38,
   63
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.65, p.72, p.31, p.34, p.37, p.38, p.63",
  "confidence": "manual"
 },
 {
  "id": "u-york-y82v-fault-history",
  "unit": "^(Y82V|Z8VT)",
  "brand": "York",
  "equipment": "Gas Furnace",
  "title": "Recalling and clearing the last five faults (L5F), and resetting a lockout - Y82V / Z8VT",
  "summary": "The board keeps the five most recent fault codes even through a power loss. They are read in the L5F menu with the Left / Right / Select buttons.",
  "steps": [
   "Make sure that there are no active thermostat calls (p.70).",
   "Press Left until L5F is displayed, then press Select (wiring diagram, Fault Code Retrieval). From the standby display the Right button also reaches Fault history (p.72, p.52).",
   "The displays show the most recent stored fault - the diagram says it is shown with a dot in the bottom right corner of the display. Press Right to step to the next older fault (p.70, p.72).",
   "No stored faults: the displays show --- (p.70).",
   "Up to five codes are stored; if more than five have occurred since the last reset, only the five most recent are kept. Memory is retained if power is lost (p.70).",
   "To clear: first unlock the board - press and hold Left and Right for 5 s until UnL shows. Then in the L5F menu press and hold Select for 5 s. The displays show --- and the status LED gives 3 green flashes (p.53, p.70).",
   "Faults can only be cleared while the control is in unlocked mode; the board re-locks after 10 min idle (p.72, p.53).",
   "Lockouts: a soft lockout (06, 07, 08) resets by itself after 1 h. A hard lockout (05, 11) needs power to the control turned off and back on after the problem is corrected (p.68).",
   "Active code meanings are in Error Codes under this furnace: red flash count = the two-digit number on the displays (01-13, 17, 18), rapid red = FUS, 4 amber = 44, alternating red / amber = rL."
  ],
  "safety": "The manual says the fault history feature must be used only by a qualified service technician. Open all disconnects before servicing the unit.",
  "manual": "york-y82v-z8vt-furnace-install",
  "pages": [
   70,
   72,
   53,
   68,
   52
  ],
  "source": "Y82V / Z8VT (80% two-stage variable-speed ECM) Installation Manual: Y82V and Z8VT Series Two-Stage Variable Speed ECM Gas Furnace, Non-Condensing, Multi-Position (6762470-UIM-A-0126, 01/2026), p.70, p.72, p.53, p.68, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-200-utility-back-still-on-generator",
  "unit": "^(?:G0|0)099(28|29|30|31|32|33|34|35)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Utility is back but the house is still on generator - Generac 100-200 A switch (G0099280-G0099350)",
  "summary": "Generac's manual gives a manual transfer back to utility for when grid power has returned but the switch has not moved. It prints no fault-finding chart for why.",
  "steps": [
   "First make the switch dead: generator main breaker OFF, and turn OFF both the utility supply (the service disconnect breaker in a service entrance model; the upstream disconnect on a non-service entrance model) and the generator supply to the switch.",
   "Look at the mechanism. Handle position UP = load terminals T1 / T2 are on utility N1 / N2. DOWN = on generator E1 / E2. On service entrance models the mechanism is behind the interior cover and is seen and reached through its narrow slot; the front of the moving part is yellow.",
   "Handle already UP: the contacts are closed on utility, nothing more to do at the mechanism.",
   "Handle DOWN: put the manual handle into the yellow movable contact carrier rocker and move it UP. Hold on to it - it moves quickly after passing the center of travel. Do not use excessive force.",
   "Take the handle out and put it back in its storage bracket in the switch.",
   "Turn ON the utility service disconnect breaker, then turn ON the generator main breaker.",
   "The manual's only direction on the cause: if automatic operation does not occur, have a Generac dealer investigate, diagnose and service the system."
  ],
  "safety": "DANGER (Generac): do not manually transfer under load. Disconnect the transfer switch from all power sources before a manual transfer - failure to do so will result in death or serious injury, and equipment damage.",
  "manual": "generac-ats-100-200a-fcm-owner-a0009313194",
  "pages": [
   22,
   21
  ],
  "source": "Transfer switch 100-200 A with Fuse Control Module (G0099280, G0099290, G0099300, G0099310, G0099320, G0099330, G0099340, G0099350) Generac Automatic Transfer Switch 100 - 200 Amp, Service Entrance and Non-Service Entrance - Owner's Manual (A0009313194 Rev. A 9/26/2025), p.22, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-200-spd-led-off",
  "unit": "^(?:G0|0)099(28|31|33)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Surge protector light is off - Generac 100-200 A service entrance switch with SPD (G0099280, G0099310, G0099330)",
  "summary": "The surge protection device has one LED. Lit means the protection elements are intact; off means protection is lost.",
  "steps": [
   "Check the LED after installation, after a surge event and after a major weather event.",
   "With system power applied the LED should be lit. With all phase voltages present it reports the protection elements: on when all are intact and protecting, OFF for any loss of protection.",
   "LED not lit: remove power, check the connections, and test again.",
   "Still not lit: Generac says to contact an IASD (Generac dealer). The surge device is not repairable and has no user serviceable parts - a failed one, shown by the unlit LED, is replaced.",
   "Do NOT use the LED to decide whether phase voltage is present or absent.",
   "Only the G0099280, G0099310 and G0099330 in this manual have the surge device; the manual prints no part number for it."
  ],
  "safety": "DANGER (Generac): high voltage is present at the transfer switch and terminals. Contact with live terminals will result in death or serious injury.",
  "manual": "generac-ats-100-200a-fcm-owner-a0009313194",
  "pages": [
   24,
   11,
   6
  ],
  "source": "Transfer switch 100-200 A with Fuse Control Module (G0099280, G0099290, G0099300, G0099310, G0099320, G0099330, G0099340, G0099350) Generac Automatic Transfer Switch 100 - 200 Amp, Service Entrance and Non-Service Entrance - Owner's Manual (A0009313194 Rev. A 9/26/2025), p.24, p.11, p.6",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-200-fcm-fuse",
  "unit": "^(?:G0|0)099(28|29|30|31|32|33|34|35)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "FCM (T1 / N1 / N2): which is which and how to change one - Generac 100-200 A transfer switch (G0099280-G0099350)",
  "summary": "Three 6.3 A fuses sit in the Fuse Control Module: T1 feeds the generator's battery charger, N1 and N2 are the utility sensing leads to the generator.",
  "steps": [
   "The three fuses are below the FCM terminal strip, marked T1, N1 and N2. T1 (fused) = battery charge. N1 (fused) and N2 (fused) = utility sense. All three are 240 VAC, 6.3A fuses.",
   "What they feed at the terminal strip: T1 = fused 120 VAC for the battery charger (required to supply utility or generator voltage to the generator's battery charger); N1 and N2 = fused 240 VAC sensing for utility dropout and pickup.",
   "A fuse removal and installation tool is stored in the FCM housing. Snap it free with an appropriate, electrically insulated tool such as diagonal pliers.",
   "Use that tool to pull and fit the fuse. Do NOT touch any part of the fuse with anything else until it is completely out of the FCM.",
   "Replacement: Generac says use only Generac fuse part number 10000005117, rated 240 VAC, 6.3 Amps, 10,000 AIC. The label drawn on the FCM in the manual's figures reads 'Replace with Littelfuse 021606.3XHP, Optifuse FCD-6.3A or Generac 10000005117 250 vac, 6.3A'.",
   "Put the tool back in the FCM housing retainer directly above the fuses, large thumb tab facing out.",
   "The manual does not say what blows these fuses or how to test the circuits behind them."
  ],
  "safety": "DANGER (Generac): high voltage is present at the transfer switch and terminals. Contact with live terminals will result in death or serious injury. Refer to NFPA 70E for PPE and safety equipment before work.",
  "manual": "generac-ats-100-200a-fcm-owner-a0009313194",
  "pages": [
   25,
   18,
   17
  ],
  "source": "Transfer switch 100-200 A with Fuse Control Module (G0099280, G0099290, G0099300, G0099310, G0099320, G0099330, G0099340, G0099350) Generac Automatic Transfer Switch 100 - 200 Amp, Service Entrance and Non-Service Entrance - Owner's Manual (A0009313194 Rev. A 9/26/2025), p.25, p.18, p.17",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-200-auto-test",
  "unit": "^(?:G0|0)099(28|29|30|31|32|33|34|35)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Testing automatic transfer and what should happen when - Generac 100-200 A switch (G0099280-G0099350)",
  "summary": "Generac's own automatic-operation check, with the timings the manual prints. The timers live in the generator controller.",
  "steps": [
   "Generac's order (CAUTION: do the functional tests in the exact order printed): manual operation check, voltage checks, generator test under load, then this automatic test.",
   "Voltage at the switch with the generator running at no load: 240-246 VAC across E1 to E2, 120-123 VAC from each to neutral, 60-62 Hz. Under full rated load: greater than 230 VAC and greater than 59 Hz. Do NOT proceed until the no-load voltage and frequency are within these limits.",
   "Use the meter's LowZ (low input impedance) setting so ghost voltages do not fool you.",
   "Generator OFF. Utility service disconnect breaker of the switch OFF. Verify the switch is de-energized and install the front cover.",
   "Utility service disconnect breaker ON, generator main breaker ON, generator panel in AUTO.",
   "Now turn the utility service disconnect breaker of the switch OFF. It is this breaker that simulates the outage - shutting off the main disconnect in a subpanel fed from the switch will NOT simulate an outage.",
   "The engine should crank and start after a five second delay (factory default setting). After starting, the switch should connect the load to the generator after a five second warm-up delay.",
   "With the generator carrying the load, turn the utility breaker back ON. After approximately 15 seconds the switch should transfer back to utility; approximately one minute after re-transfer the generator should shut down.",
   "Generac notes that timer durations may differ between generators and settings."
  ],
  "safety": "CAUTION (Generac): perform the functional tests in the exact order they are presented in the manual. DANGER: high voltage is present at the transfer switch and terminals.",
  "manual": "generac-ats-100-200a-fcm-owner-a0009313194",
  "pages": [
   24,
   23,
   22,
   21
  ],
  "source": "Transfer switch 100-200 A with Fuse Control Module (G0099280, G0099290, G0099300, G0099310, G0099320, G0099330, G0099340, G0099350) Generac Automatic Transfer Switch 100 - 200 Amp, Service Entrance and Non-Service Entrance - Owner's Manual (A0009313194 Rev. A 9/26/2025), p.24, p.23, p.22, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-200-shutdown-during-outage",
  "unit": "^(?:G0|0)099(28|29|30|31|32|33|34|35)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Shutting the generator down during an outage and bringing it back - Generac 100-200 A switch (G0099280-G0099350)",
  "summary": "Generac's order for shutting down under load (maintenance or to save fuel) and restarting, to avoid equipment damage.",
  "steps": [
   "To turn the generator OFF: set the utility main line circuit breaker to OFF (OPEN).",
   "Set the generator main line circuit breaker to OFF (OPEN).",
   "Let the generator run for cool-down for approximately five minutes.",
   "Set the generator to OFF at the controller, then remove the 7.5A fuse from the controller.",
   "To turn it back ON: install the 7.5A fuse in the controller and verify the generator main breaker is OFF (OPEN).",
   "Set the generator to AUTO at the controller. It will start and run - let it warm up for a few minutes.",
   "Set the generator main breaker to ON (CLOSED), then set the utility main line circuit breaker to ON (CLOSED). The system is back in automatic."
  ],
  "safety": "DANGER (Generac): automatic start-up. Disconnect utility power and render the unit inoperable before working on it. Follow the steps in order during utility outages.",
  "manual": "generac-ats-100-200a-fcm-owner-a0009313194",
  "pages": [
   24,
   25
  ],
  "source": "Transfer switch 100-200 A with Fuse Control Module (G0099280, G0099290, G0099300, G0099310, G0099320, G0099330, G0099340, G0099350) Generac Automatic Transfer Switch 100 - 200 Amp, Service Entrance and Non-Service Entrance - Owner's Manual (A0009313194 Rev. A 9/26/2025), p.24, p.25",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-300-400-position-windows",
  "unit": "^(?:G0|0)099(78|79)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Which side is it on, and moving it by hand - Generac 300 / 400 A service entrance switch (G0099780, G0099790)",
  "summary": "The 300 / 400 A mechanism shows its position in two windows, A and B, and is moved with a handle on the actuating shaft.",
  "steps": [
   "Verify the generator is OFF. Then turn OFF (OPEN) both the utility and emergency (generator) supplies to the switch, by whatever means is provided (such as the main line circuit breakers).",
   "Read the windows. Window A ON and window B OFF = load terminals T1 / T2 are on utility N1 / N2. Window A OFF and window B ON = load is on generator E1 / E2.",
   "To close to the utility (normal) side when window A reads OFF: attach the handle to the actuating shaft and move it in the direction of the arrow on the switch cover until it stops - DO NOT FORCE. Release the handle slowly so the spring in the switch box relaxes. Window A now shows ON and window B OFF.",
   "To close to the generator (standby) side when window B reads OFF: same motion, in the direction of the arrow on the switch cover until it stops, release slowly. Window A shows OFF and window B ON.",
   "Manual operation must be checked BEFORE the switch is operated electrically.",
   "If automatic operation does not occur, the manual's direction is to have a Generac dealer investigate."
  ],
  "safety": "DANGER (Generac): do not manually transfer under load. Disconnect the transfer switch from all power sources before a manual transfer. Do not use excessive force.",
  "manual": "generac-ats-300-400a-se-spd-owner-a0010615792",
  "pages": [
   19,
   20,
   21
  ],
  "source": "Transfer switch 300 / 400 A service entrance with surge protection device (G0099780, G0099790) Generac Automatic Transfer Switch 300-400 Amp, Service Entrance with Surge Protection Device (SPD) - Owner's Manual (A0010615792 Rev. A (Initial Release) 07/08/2026), p.19, p.20, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-200-ilc-ghost-voltage",
  "unit": "^(?:G0|0)099(39|43)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "Voltage showing on the utility side while on generator - Generac 200 A load center switch (G0099390, G0099430)",
  "summary": "A high-impedance meter can show a 'ghost' voltage on the dead utility side. Generac explains where it comes from and what meter setting to use.",
  "steps": [
   "Commissioning may require the inspector to verify that no voltage is present on the utility side of the switch while the generator is supplying the load.",
   "Only a meter with a low impedance (LoZ) setting can measure that accurately.",
   "'Ghost' voltages may appear on meters with high input impedance because the sensing wires N1 and N2 couple capacitively with the charging voltage from T1.",
   "The manual's note on simulating an outage (printed with its automatic-operation test): the Utility Power Circuit Breaker in the transfer switch must be turned OFF - shutting off the main disconnect in a subpanel connected to the switch will NOT simulate an outage.",
   "Contact the meter manufacturer for more about the LoZ setting."
  ],
  "safety": "DANGER (Generac): high voltage is present at the transfer switch and terminals. Contact with live terminals will result in death or serious injury.",
  "manual": "generac-ats-200a-se-load-center-owner-a0010615780",
  "pages": [
   22,
   20
  ],
  "source": "Transfer switch 200 A service entrance with integrated load center and surge protection device (G0099390, G0099430) Generac Automatic Transfer Switch Service Rated, 200 Amp, 20 Space 40 Circuit Outdoor Rated and 42 Circuit Indoor Rated Load Centers with Surge Protection Device (SPD) - Owner's Manual (A0010615780 Rev. A (Initial Release) 06/03/2026), p.22, p.20",
  "confidence": "manual"
 },
 {
  "id": "u-generac-ats-100-16ckt-fcm-fuse",
  "unit": "^(?:G0|0)099(47)-?0$",
  "brand": "Generac",
  "equipment": "Generator",
  "title": "FCM replacement and its alternates - Generac 100 A 16 circuit transfer switch (G0099470)",
  "summary": "Same three 6.3 A fuses as the other Generac switches; this manual also prints two alternate fuse numbers.",
  "steps": [
   "The integrated FCM holds the transfer relay, the sensing and battery charge fuses and the connection points for the start circuit wires.",
   "Fuses: T1 (fused) = battery charge, N1 (fused) and N2 (fused) = utility sense. 240 VAC, 6.3A fuses.",
   "A fuse removal and installation tool is included in the control housing. Snap it free with an appropriate tool such as diagonal pliers and use it to replace the fuse.",
   "Replacement: Generac part number 10000005117, rated 240 VAC, 6.3 Amps, 10,000 AIC. Alternative fuses printed in this manual: Littelfuse 021606.3MXHP or Optifuse FCD-6.3.",
   "Store the tool in the control housing retainer directly above the fuses, large thumb tab facing out."
  ],
  "safety": "DANGER (Generac): high voltage is present at the transfer switch and terminals. Contact with live terminals will result in death or serious injury. Refer to NFPA 70E for PPE and safety equipment before work.",
  "manual": "generac-ats-100a-16-circuit-owner-a0010615774",
  "pages": [
   20,
   13,
   9,
   6
  ],
  "source": "Transfer switch 100 A non-service entrance with 16 circuit load center (G0099470) Generac Automatic Transfer Switch 100 Amp Non-Service Entrance with 16 Circuit Load Center - Owner's Manual (A0010615774 Rev. A (Initial Release) 06/23/2026), p.20, p.13, p.9, p.6",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-blower-wont-stop",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Blower runs and will not shut off, compressor and heat locked out - FT5 / FG5",
  "summary": "Check the separate leak dissipation board first: in dissipation mode it runs the blower and opens W and Y (electric heat and compressor off). Read its yellow LED.",
  "steps": [
   "Find the leak dissipation board (separate from the fan coil control board) and look at its yellow LED. Solid = normal operation - the dissipation board is not the cause.",
   "Flashing: count the flashes. 1 = sensor at 20% LFL or more, 2 = sensor open, 3 = normal mitigation after a leak, 5 = fault with the A2L digital sensor, 6 = test button stuck - all of these run dissipation mode (blower on, W and Y opened so electric heat and the outdoor compressor are off). 4 = no power to G output: dissipation with no blower.",
   "For all flash codes, first try power cycling the system to remove the code.",
   "Flashing 1 or 3: check for refrigerant leaks using an independent R-454B detector. Flashing 1 with no leak present: replace the sensor.",
   "Flashing 2: check both ends of the sensor wire harness, power cycle; still there = replace the sensor.",
   "Flashing 4 or 6 that will not clear after a power cycle: replace the dissipation board (6: press the test button repeatedly first).",
   "Flashing 7 or 8 (Y or W wiring inverted / shorted) leave the unit in normal operation: verify all Y and W wires against the wiring diagram.",
   "Hold the Test button 5-29 seconds to display the flash code history; 3 rapid presses clear it."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   15,
   18
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.15, p.18",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-dissipation-self-test",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Leak dissipation self-test at start-up - FT5 / FG5",
  "summary": "One-second press of the Test button, then six checks.",
  "steps": [
   "Power on the unit. The yellow LED on the dissipation board should be steady. Test mode is only possible if no faults exist on the dissipation board.",
   "Press the Test button for roughly ONE second. The system enters Dissipation Mode for 60 seconds. Longer presses do other things: 5-29 s shows flash code history, 30 s or more sets flash code 6.",
   "Normal operation checks - no call: compressor off, indoor fan off, heat off. Cool call: compressor on, fan on, heat off. Heat call: compressor off, fan on, electric heat on.",
   "Dissipation activated - with no call, a cool call and a heat call: compressor off, indoor fan on, heat off each time.",
   "Make sure the fan coil can meet the minimum dissipation airflow for the total system charge: 5 lb 133 CFM, 10 lb 266, 15 lb 399, 20 lb 532, 25 lb 665 (Table 4 has every pound from 5 to 25).",
   "If flash codes are present, troubleshoot them before leaving."
  ],
  "safety": "Failure to follow proper R-454B mitigation system installation instructions can result in property damage, personal injury, or death.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   15
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.15",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-motor-wont-run",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "ECM blower motor does not run - FT5 / FG5",
  "summary": "The manual's order: fuse, 24 V, plugs, 230 V, then the control signals. Do not assume the motor or module is bad.",
  "steps": [
   "Turn off power. Check the 5 amp fuse on the board.",
   "Check for 24 VAC on SEC1 and SEC2. No voltage = check the transformer.",
   "Check all plugs and receptacles for deformation that could cause loose connections; be sure plugs are fully seated.",
   "Verify approximately 230 VAC is present at the motor.",
   "Thermostat check: remove all thermostat wires from the board and jumper, one at a time, R-G, R-Y/Y2, R-Y1, R-W1. Motor runs in all cases = thermostat mis-wired, configured incorrectly or defective. Runs in some but not others = go on to the harness and board.",
   "Harness check: shut off power and wait 5 min. Remove the 5-pin, 16-pin and 4-pin plugs from the motor, put the 5-pin plug back, turn power on and check the 16-pin connector with the screw terminals jumpered. Printed example: R to Y/Y2 gives (-)12 VDC between pin 14 and pin 1 (common).",
   "Signal correct and the motor still does not run: inspect the harness for loose pins; connections good = the control module or the motor is defective. Signal missing at the 16-pin plug: check the board 12-pin plug PL-1 (pin 2 to pin 9 for the same example) - present at the board but not at the 16-pin plug = wiring harness; not present at the board = replace the board.",
   "Before replacing the control module, check the windings with the module removed and unplugged: resistance between any 2 motor leads similar, and any lead to the unpainted motor end plate greater than 100K ohms. Fail either = the winding section must be replaced."
  ],
  "safety": "High voltage is always present at the motor. Disconnect power before removing or replacing connectors or servicing the motor. Wait at least 5 min after disconnecting power before opening the motor.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   19
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.19",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-set-select-taps",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Setting the six select taps for the system - FT5 / FG5",
  "summary": "Move the six select wires to the pins that match the equipment. Factory settings are the largest heater range, the largest outdoor size, AC, NOM, 0/90 and LO fan.",
  "steps": [
   "AUX HEAT KW/CFM (violet): pick the narrowest heater range that covers the heater installed (skip if no heater). Size 24: A 0-20 kW 1200 CFM, B 0-15 1050, C 0-10 750, D 0-5 700. Size 36: A 0-20 1225, B 0-15 1050, C 0-10 750, D 0-5 700. Size 48: A 0-30 1500, B 0-20 1350, C 0-15 1200, D 0-10 1000. Size 60: A 0-30 1750, B 0-20 1350, C 0-15 1250, D 0-10 1200.",
   "AC/HP SIZE (blue): set to the outdoor unit size. Size 24: A 036, B 030, C 024, D 018. Size 36: A 042, B 036, C 030, D 024. Size 48: A 048, B 042, C 036, D 030. Size 60: A 060, B 048, C 042, D 036.",
   "SYSTEM TYPE (orange): AC, HP-COMFORT (about 315 CFM per ton heating, about 350 cooling) or HP-EFF (about 350 CFM per ton both). Factory setting is AC; HP-EFF gives the rated heat pump performance.",
   "AC/HP CFM ADJUST (black): NOM, LO (10% below nominal) or HI (15% over).",
   "ON/OFF DELAY (white): 0/90 factory; 0/0 no delay; 30/90; ENH = 30-second on-delay, then 150 seconds at 70% airflow, no off-delay.",
   "CONTINUOUS FAN (yellow): LO 50%, MED 80%, HI 100% of cooling airflow. With a 2-speed outdoor unit do not select HI.",
   "2-stage outdoor unit: remove jumper J4 (as shipped it ties Y1 to Y/Y2). Heat staging with a staged heater: remove J2. Dehumidify with a humidistat or thermidistat: remove J1.",
   "The electric heat airflow must stay above the minimum CFM for the heater and system size (Table 12)."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   9,
   16,
   17,
   23
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.9, p.16, p.17, p.23",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-horizontal-sensor",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Converting to horizontal right or downflow - where the A2L sensor goes - FT5 / FG5",
  "summary": "The sensor harness comes off first, and on A-coil sizes the sensor moves from the delta plate to the drain pan clip.",
  "steps": [
   "Before moving any component, disconnect the sensor wiring harness and place the whole harness in the control box.",
   "Slope coil (size 36), horizontal right: disconnect the sensor on the drain pan and cut the wire tie holding the harness to the coil; remove the coil mounting screw and the coil assembly; lay the fan coil on its right side and reinstall the coil with the condensate pan down; refit the mounting screw; reconnect the sensor harness along the routing shown. A gasket kit is required for the slope coil conversion.",
   "A-coil (sizes 24, 48, 60), horizontal right: disconnect and remove the sensor from the delta plate and install it on the horizontal drain pan clip; move the horizontal drain pan support bracket to the right-side coil support rail; convert the air seal assembly (swap the filler plate and air splitter, move the condensate troughs to the opposite tube sheets); install the horizontal pan on the right side and slide the coil back in.",
   "A-coil units used horizontal LEFT also need the sensor moved from the delta plate to the drain pan clip.",
   "Sensor must be installed with the connector facing down or facing horizontally - never upward. Incorrect position could result in premature failure.",
   "Downflow: field conversion with the accessory downflow kit plus the base kit, per the kit instructions. Remove the plastic cap covering the vertical drains only, remove the plug from the overflow hole, and caulk the vertical pan fitting to door joint when finished.",
   "Make sure the liquid and suction tube grommets are in place (install them after brazing), and keep the unit within 1/8 in. of level along length and width for horizontal drainage."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   3,
   5,
   7,
   14
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.3, p.5, p.7, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-txv-replace",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Replacing the TXV - torque and reassembly - FT5 / FG5",
  "summary": "Mechanical-fitting TXV. Nuts 10-20 ft-lb, equalizer about 12 ft-lb, insulation between aluminum and copper.",
  "steps": [
   "The replacement TXV part number for each size is in the Product Data specification table (Maintenance Figures card).",
   "Loosen the TXV outlet brass nut with an adjustable wrench and a backup wrench, then the TXV inlet the same way. Loosen the equalizer line with a backup wrench.",
   "Cut the wire tie and remove the black insulation; remove the band from the TXV bulb. Cut the wire tie holding the equalizer line and bulb to the aluminum vapor header tube.",
   "Remove the 2 screws from the TXV bracket and lift the TXV out.",
   "Reassemble: mount the bracket and TXV with the 2 screws. Connect outlet and inlet and tighten each nut to between 10 and 20 ft-lb - do not exceed 20 ft-lb. Tighten the equalizer flare nut to approximately 12 ft-lb.",
   "Clamp the bulb back on and reinstall the insulation around the bulb and vapor tube. Wire-tie the 1/8 in. equalizer and bulb tubes to the vapor header with insulation between the aluminum vapor tube and the copper tube - without it galvanic corrosion will cause a refrigerant leak.",
   "Leak test the TXV fittings, then evacuate and charge the system to the required subcooling per the outdoor unit rating plate."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   12
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.12",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-ft5a-fg5a-208v-and-heat",
  "unit": "^FT5AN[XB][BCD](24|36|48|60)|^FG5AN[XB][BCD](24|36|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "208 volt supply, electric heat hook-up and the big heaters - FT5 / FG5",
  "summary": "Transformer tap, heater plug, and what 20-30 kW heaters need.",
  "steps": [
   "Transformer is factory wired for 230 V. For 208 V the Installation Instructions say: disconnect the black wire from the 230V terminal on the transformer and connect it to the 208V terminal. (The unit label words it: transformer primary leads, blue 208V, red 230V - go by the terminal markings.)",
   "The transformer secondary is protected by a 5-amp fuse on the printed-circuit board.",
   "Adding a heater: remove and discard the power plug from the fan coil and connect the heater plug to the plug from the unit wiring harness. Use only a heater listed on the unit rating plate.",
   "Some heater sizes need the two screws that hold the blower housing to the fan deck removed (it does not affect performance).",
   "24 kW and 30 kW heaters: the factory location of the dissipation board interferes - move the board into the enclosure supplied with the heater kit, on the outside of the unit, per the Electric Heat Instructions.",
   "20, 24 and 30 kW heaters: keep 1 in. clearance from combustibles to the discharge plenum and ductwork for 36 in. from the unit.",
   "Set the AUX HEAT KW/CFM tap to the range for the heater. A disconnect kit is available for single phase 3-10 kW heaters; with circuit breaker heaters the breaker can serve as the disconnect.",
   "Dual or multiple supply circuits: ground each circuit to the ground lugs on the unit and heaters."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable. The cabinet must have an uninterrupted or unbroken ground; if the conduit connection uses reducing washers, a separate ground wire must be used.",
  "manual": "carrier-ft5-fg5-install-im-ft5-fg5-02",
  "pages": [
   2,
   8,
   9,
   11
  ],
  "source": "FT5 / FG5 fan coils (R-454B) FT5, FG5 Fan Coil, 2-Stage, for R-454B Refrigerant, 2 thru 5 Ton - Installation Instructions (IM-FT5-FG5-02, Edition 10/24), p.2, p.8, p.9, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-blower-wont-stop",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Blower runs and will not shut off, compressor and heat locked out - FJ5",
  "summary": "The leak dissipation board is holding the unit in dissipation mode. Read its yellow LED.",
  "steps": [
   "Look at the yellow LED on the dissipation board. Solid = normal operation.",
   "Flashing: count the flashes. 1 = sensor at 20% LFL or more, 2 = sensor open, 3 = normal mitigation after a leak, 5 = fault with the A2L digital sensor, 6 = test button stuck - all of these run dissipation mode (the board energizes G for the blower and opens W and Y, so electric heat and the outdoor compressor are off). 4 = no power to G output: dissipation with no blower.",
   "For all flash codes, first try power cycling the system to remove the code.",
   "Flashing 1 or 3: check for refrigerant leaks using an independent R-454B detector. Flashing 1 with no leak present: replace the sensor.",
   "Flashing 2: check both ends of the sensor wire harness, power cycle; still there = replace the sensor. Flashing 5 that will not clear: replace the sensor.",
   "Flashing 4 or 6 that will not clear after a power cycle: replace the dissipation board (6: press the test button repeatedly first).",
   "Flashing 7 or 8 (Y or W wiring inverted / shorted): verify all Y and W wires against the wiring diagram.",
   "No power at the board (LED not lit): verify the wiring to / from pins 1 and 8 on the power harness plug and check the 24 V system wiring from the transformer. The low-voltage fuse is in-line on the wire harness - 3 A in the Installation Instructions; the unit wiring labels say replace it with no greater than a 5 amp fuse."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   6,
   12,
   14
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.6, p.12, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-dissipation-self-test",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Leak dissipation self-test at start-up - FJ5",
  "summary": "One-second press of the Test button, then six checks.",
  "steps": [
   "Power on the unit. The yellow LED on the dissipation board should be steady. Test mode only works if no faults exist on the board.",
   "Press the Test button for roughly ONE second: Dissipation Mode for 60 seconds. 5-29 s shows flash code history; 30 s or more sets flash code 6; 3 rapid presses clear the history.",
   "Normal operation checks - no call: compressor off, indoor fan off, heat off. Cool call: compressor on, fan on, heat off. Heat call: compressor off, fan on, electric / gas heat on.",
   "Dissipation activated - with no call, a cool call and a heat call: compressor off, indoor fan on, heat off each time.",
   "Make sure the fan coil can meet the minimum dissipation airflow for the total system charge: 5 lb 133 CFM, 10 lb 266, 15 lb 399, 20 lb 532, 25 lb 665 (Table 4 has every pound from 5 to 25).",
   "When charging, the conditioned space must be larger than the minimum floor area in Table 6 (for example 10 lb = 152 sq ft, 15 lb = 228 sq ft); outside the table use A_min = 15 x total charge in pounds."
  ],
  "safety": "Failure to follow proper R-454B mitigation system installation instructions can result in property damage, personal injury, or death.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   11,
   12,
   14
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.11, p.12, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-change-blower-speed",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Changing blower speed - FJ5",
  "summary": "Speed is chosen at the motor connector: move the blue lead. White stays on tap 4.",
  "steps": [
   "The speed taps are on the motor, or on a plug close to the motor.",
   "Tap 1 low, tap 2 medium, tap 3 high (90 second off delay on each). Tap 4 electric heat - same CFM as tap 3 with a 0 second off delay. Tap 5 max, for high static, 0 second off delay.",
   "Disconnect the BLUE fan lead from tap 2 (factory position) and move it to tap 1, 2, 3 or 5.",
   "Leave the WHITE wire on tap 4 - it is for electric heat only.",
   "Units with or without electric heaters require a minimum CFM: check the unit wiring label so the tap chosen is not lower than the minimum fan speed indicated (the minimum CFM table by heater size is in the Product Data - Maintenance Figures card).",
   "Check the result against the airflow table: size 36 wet coil at 0.5 in. w.c. - tap 1 881, tap 2 1051, tap 3 1207, tap 5 1282 CFM.",
   "Limits: return static under 0.40 in. w.c.; horizontal 42-60 sizes need supply static above 0.20 in. w.c.; above 400 CFM per ton on 48-60 can blow condensate off the coil. In low static applications use a lower tap."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   8,
   15,
   16
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.8, p.15, p.16",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-line-set-pressure-test",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Line set connection, pressure test and evacuation - FJ5",
  "summary": "The R-454B numbers the manual prints: 700 psig joints, about 200 psi nitrogen for 1 hour, 500 microns holding under 1500.",
  "steps": [
   "Make the suction tube connection first. Cut tubing to length and insert it into the sweat connection until it bottoms.",
   "All fittings need to withstand 700 PSIG (mechanical fittings or brazing). When brazing use silver bearing or non-silver bearing brazing material - no solder (nothing that melts below 800 F).",
   "A brazing shield MUST be used to protect the unit surface and condensate pan fitting caps; wrap a wet cloth around the rear of the fitting to protect the TXV and factory joints.",
   "Pressure check with a nitrogen charge of about 200 psi. The nitrogen holding charge must not decrease in pressure for 1 hour.",
   "Leak check, then vacuum to 500 microns. Isolated from the pump, the pressure shall not rise above 1500 microns in 10 minutes.",
   "ALWAYS evacuate the coil and field tubing to 500 microns before opening the outdoor unit service valves.",
   "Mechanical or crimp-type connections: follow the crimp tool manufacturer's instructions. A failure of the fittings or the equipment caused by mechanical fittings is not covered under the standard warranty.",
   "Charging and start-up: outdoor unit Installation Instructions. Do not vent refrigerant - recover it."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   8,
   9
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.8, p.9",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-horizontal-sensor",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Converting to horizontal right or downflow - where the A2L sensor goes - FJ5",
  "summary": "Slope coil sizes 18-24 keep the sensor on the drain pan clip; A-coil sizes 30-60 need it moved off the delta plate.",
  "steps": [
   "Before moving any component, disconnect the sensor wiring harness and place the whole harness in the control box.",
   "Slope coil (sizes 18, 24), horizontal right: disconnect the sensor on the drain pan and cut the wire tie holding the harness to the coil; remove the coil mounting screw and coil assembly; lay the fan coil on its right side and reinstall the coil with the condensate pan down; refit the screw; reconnect the harness along the routing shown; add the gaskets from the gasket kit (required).",
   "A-coil (sizes 30-60), horizontal right: disconnect and remove the sensor from the delta plate and install it on the horizontal drain pan clip; move the horizontal drain pan support bracket to the right-side coil support rail; convert the air seal assembly; install the horizontal pan on the right side and slide the coil back in.",
   "A-coil units used horizontal LEFT also need the sensor moved from the delta plate to the drain pan clip.",
   "Sensor connector facing down or facing horizontally - never upward.",
   "Never install the unit with the access panels facing up or down.",
   "Horizontal installations: level the unit along its length and width for condensate drainage (manufacturer caution - product or property damage).",
   "Downflow: accessory downflow kit, base kit and gasket kit. Remove the plastic cap covering the vertical drains only, remove the plug from the overflow hole, and caulk the vertical pan fitting to door joint when finished.",
   "High return static with humid return air in horizontal: the Water Management Kit may be needed."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   3,
   4,
   11
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.3, p.4, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-fj5a-float-switch-and-drain",
  "unit": "^FJ5AN[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Drain traps and where the float switch may be wired - FJ5",
  "summary": "Both drains trapped, no CPVC, and the float switch never breaks R at the transformer.",
  "steps": [
   "Units have primary and secondary 3/4 in. FPT drain connections. Remove the cap opening (knife at the tab, pull the disk with pliers) and caulk around the lines where they exit.",
   "Install BOTH primary and secondary drain lines with properly sized traps. Use only full size P-traps - shallow running traps do not drain properly.",
   "Do not use CPVC in field drain lines - potential reaction with POE oil.",
   "PVC fittings on the plastic pan: finger-tight plus 1-1/2 turns, pipe dope, do not over-tighten.",
   "Traps as close to the coil as possible, outlet below the pan connection; prime all traps and test for leaks; pitch the lines at least 1 in. per 10 ft.",
   "Float switch: one listed to UL508, wired in the field R circuit from the R field connection terminal leading to the thermostat.",
   "DO NOT wire a float switch to break the 24 V power directly from the transformer R circuit - this defeats the refrigerant leak dissipation and mitigation functions."
  ],
  "safety": "FIRE HAZARD as printed: a float switch wired to break 24 V directly at the transformer R circuit defeats the leak dissipation and mitigation functions.",
  "manual": "carrier-fj5-install-im-fj5-04",
  "pages": [
   10
  ],
  "source": "FJ5 fan coil (R-454B) FJ5 Fan Coil for Puron Advance Refrigerant - Installation Instructions (IM-FJ5-04, Edition 10/25), p.10",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-115v-no-electric-heat",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "115 volt hook-up - and why no heat strips - F55",
  "summary": "115 V fan coil. It cannot take an accessory electric heater.",
  "steps": [
   "Do not install electric heat in this unit. It is wired for 115 V operation and can not accommodate an accessory electric heater.",
   "Connect the 115 V power leads from the field disconnect to the white and black stripped leads; ground wire to the unit ground lug.",
   "The transformer is factory wired for 115 V operation.",
   "Leave the factory-supplied sheet metal block-off plate over the heater opening - it reduces air leakage and exterior condensation.",
   "Low voltage is protected by a 3 A automotive type fuse in-line on the wire harness.",
   "Make certain supply voltage, frequency, phase and ampacity are as specified on the unit rating plate; the unit needs its own branch circuit with a field-supplied disconnect within sight (MCA by size is in the Product Data - Maintenance Figures card).",
   "Heat from a hydronic coil is possible in single stage applications: a W call runs the blower and energizes the white/violet wire labeled \"W or Y/Y2\". The installer sources the interface parts; follow the hydronic coil instructions. (F55-01PD p.1; IM-F55-03 p.13)"
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   2,
   6,
   7,
   8,
   13,
   14
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.2, p.6, p.7, p.8, p.13, p.14",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-blower-wont-stop",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Blower runs and will not shut off, compressor locked out - F55",
  "summary": "The leak dissipation board is holding the unit in dissipation mode. Read its yellow LED.",
  "steps": [
   "Look at the yellow LED on the dissipation board. Solid = normal operation.",
   "Flashing: count the flashes. 1 = sensor at 20% LFL or more, 2 = sensor open, 3 = normal mitigation after a leak, 5 = fault with the A2L digital sensor, 6 = test button stuck - all of these run dissipation mode (the board energizes G for the blower and opens W and Y, so heat and the outdoor compressor are off). 4 = no power to G output: dissipation with no blower.",
   "For all flash codes, first try power cycling the system to remove the code.",
   "Flashing 1 or 3: check for refrigerant leaks using an independent R-454B detector. Flashing 1 with no leak present: replace the sensor.",
   "Flashing 2: check both ends of the sensor wire harness, power cycle; still there = replace the sensor. Flashing 5 that will not clear: replace the sensor.",
   "Flashing 4 or 6 that will not clear after a power cycle: replace the dissipation board (6: press the test button repeatedly first).",
   "Flashing 7 or 8 (Y or W wiring inverted / shorted): verify all Y and W wires against the wiring diagram.",
   "LED off: verify the wiring to / from pins 1 (R) and 8 (Common) on the power harness plug and the 24 V wiring from the transformer (3 A in-line fuse on the harness)."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   6,
   7,
   12,
   15
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.6, p.7, p.12, p.15",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-dissipation-self-test",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Leak dissipation self-test at start-up - F55",
  "summary": "One-second press of the Test button, then six checks.",
  "steps": [
   "Power on the unit. The yellow LED on the dissipation board should be steady. Test mode only works if no faults exist on the board.",
   "Press the Test button for roughly ONE second: Dissipation Mode for 60 seconds. 5-29 s shows flash code history; 30 s or more sets flash code 6; 3 rapid presses clear the history.",
   "Normal operation checks - no call: compressor off, indoor fan off, heat off. Cool call: compressor on, fan on, heat off. Heat call: compressor off, fan on, heat on.",
   "Dissipation activated - with no call, a cool call and a heat call: compressor off, indoor fan on, heat off each time.",
   "Make sure the fan coil can meet the minimum dissipation airflow for the total system charge: 5 lb 133 CFM, 10 lb 266, 15 lb 399, 20 lb 532, 25 lb 665 (Table 4 has every pound from 5 to 25).",
   "When charging, the conditioned space must be larger than the minimum floor area in Table 6 (for example 10 lb = 152 sq ft, 15 lb = 228 sq ft); outside the table use A_min = 15 x total charge in pounds."
  ],
  "safety": "Failure to follow proper R-454B mitigation system installation instructions can result in property damage, personal injury, or death.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   11,
   12,
   15
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.11, p.12, p.15",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-change-blower-speed",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Changing blower speed and 2-stage wiring - F55",
  "summary": "Blue lead ships on tap 2, white lead on tap 4. Move them at the motor connector.",
  "steps": [
   "The speed taps are on the motor, or on a plug close to the motor.",
   "Tap 1 low, tap 2 medium, tap 3 high (90 second off delay on each). Tap 4 high - same CFM as tap 3 with a 0 second off delay. Tap 5 max, for high static, 0 second off delay.",
   "Disconnect the BLUE and / or WHITE fan lead from tap 2 and / or tap 4 (factory positions) and move to the tap wanted for the application.",
   "Single stage: G runs the motor on the blue lead (tap 2). The wiring layouts show the W call on the white lead (tap 4).",
   "2-stage AC or heat pump without aux heat: the layouts show thermostat Y2 through the dissipation board to the white lead (Y2 on tap 4), with G on tap 2.",
   "Check the unit wiring label so the tap is not lower than the minimum fan speed. Check the result against the airflow table: size 36 wet coil at 0.5 in. w.c. - tap 1 881, tap 2 1051, tap 3 and 4 1207, tap 5 1282 CFM.",
   "Limits: return static under 0.40 in. w.c.; horizontal 42-60 sizes need supply static above 0.20 in. w.c.; above 400 CFM per ton on 48-60 can blow condensate off the coil. In low static applications use a lower tap."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   7,
   8,
   16,
   17
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.7, p.8, p.16, p.17",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-line-set-pressure-test",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Line set connection, pressure test and evacuation - F55",
  "summary": "The R-454B numbers the manual prints: 700 psig joints, about 200 psi nitrogen for 1 hour, 500 microns holding under 1500.",
  "steps": [
   "Make the suction tube connection first. Cut tubing to length and insert it into the sweat connection until it bottoms.",
   "All fittings need to withstand 700 PSIG (mechanical fittings or brazing). When brazing use silver bearing or non-silver bearing brazing material - no solder (nothing that melts below 800 F).",
   "A brazing shield MUST be used; wrap a wet cloth around the rear of the fitting to protect the TXV and factory joints.",
   "Pressure check with a nitrogen charge of about 200 psi. The nitrogen holding charge must not decrease in pressure for 1 hour.",
   "Leak check, then vacuum to 500 microns. Isolated from the pump, the pressure shall not rise above 1500 microns in 10 minutes.",
   "ALWAYS evacuate the coil and field tubing to 500 microns before opening the outdoor unit service valves.",
   "Charging and start-up: outdoor unit Installation Instructions. Do not vent refrigerant - recover it."
  ],
  "safety": "Flammable refrigerant (R-454B). To be repaired only by trained service personnel. Do not puncture refrigerant tubing. Do not service A2L refrigerant fan coils while the vapor header or vapor line is hot.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   8,
   9
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.8, p.9",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-f55a-horizontal-sensor-and-float",
  "unit": "^F55AA[XB][ABCD](18|24|30|36|42|48|60)",
  "brand": "Carrier",
  "equipment": "Air Handler",
  "title": "Horizontal right conversion, the A2L sensor and the float switch - F55",
  "summary": "A-coil sizes 30-60 need the sensor moved off the delta plate; a float switch never breaks R at the transformer.",
  "steps": [
   "Before moving any component, disconnect the sensor wiring harness and place the whole harness in the control box.",
   "Sizes 18-24 (slope coil): the sensor is always on the drain pan clip. Sizes 30-60 (A-coil): it ships on the delta plate and has to be moved to the drain pan clip for horizontal right and left.",
   "Sensor connector facing down or facing horizontally - never upward.",
   "Modular units (42, 48, 60): before splitting the cabinet disconnect the 4-pin sensor wire harness at the dissipation board and undo the wire routing.",
   "Downflow needs the accessory downflow kit, base kit and gasket kit; never install with the access panels facing up or down.",
   "Horizontal installations: level the unit along its length and width for condensate drainage (manufacturer caution - product or property damage).",
   "Float switch: one listed to UL508, wired in the field R circuit leading to the thermostat. DO NOT wire it to break 24 V directly from the transformer R circuit - this defeats the refrigerant leak dissipation and mitigation functions.",
   "Do not use CPVC in field drain lines - potential reaction with POE oil."
  ],
  "safety": "Before installing or servicing the unit, always turn off all power - there may be more than 1 disconnect switch. Turn off accessory heater power if applicable.",
  "manual": "carrier-f55-install-im-f55-03",
  "pages": [
   2,
   3,
   4,
   10,
   11
  ],
  "source": "F55 115 V fan coil (R-454B) F55 Fan Coil (115 V) for Puron Advance Refrigerant - Installation Instructions (IM-F55-03, Edition 10/25), p.2, p.3, p.4, p.10, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-read-display",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the board: status, fault codes and the push button - YH9 / XH9",
  "summary": "One LED, three 7-segment displays and one button. Status shows when nothing is wrong; a fault replaces it.",
  "steps": [
   "Green LED 2 s on / 2 s off with blank displays = standby. Fast green flash = anti-short-cycle delay in cooling, fast amber = in heating (5 min) (p.49-50).",
   "Running: C = cooling, qC = quick cool (green LED on); H = heating, qH = quick heat, AH = auxiliary heat, AL = auxiliary lockout, EH = emergency heat, dF = defrost (the same dF is printed for forced defrost), tt = time temp defrost, dd = demand defrost, Sd = sacrificial defrost (amber LED on) (p.50-51).",
   "A fault shows as a dash and two digits, repeated with a 2 second off period. Only the highest priority fault is displayed; the other active errors are reached with the push button (p.51).",
   "Solid red LED = fault; two red flashes = soft lockout; three red flashes = hard lockout (p.54).",
   "With no call, press the button 0.5-3 s: it displays current / stored fault codes. An active fault keeps showing until it is cleared; stored faults show only after that. 2 green flashes = no fault codes in memory (p.49-50).",
   "Hold 7-12 s to clear fault codes and lockouts (also resets the 6 hour defrost timer). 3 green flashes = fault code memory cleared (p.49-50).",
   "After a fault shutdown the unit retries by itself after 5 minutes if the fault is gone. A soft lockout retries after 1 hour, or sooner with the push button or a 24V power cycle. A hard lockout needs the push button or a 24V power cycle (p.54)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   49,
   50,
   51,
   54
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.49, p.50, p.51, p.54",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-charge-service-mode",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking or adjusting charge (service mode, subcooling) - YH9 / XH9",
  "summary": "The charts only work with the unit locked in service mode at the right tonnage.",
  "steps": [
   "Set the outdoor unit tonnage first (thermostat setup or S3 switches): the system must be set to the correct tonnage when charging (p.41).",
   "At the thermostat enter the service menu, scroll to SERVICE MODE and change it from OFF to ON, then call for heating or cooling (p.40). Or on the board: remove 24 V, set S1 position 4 ON (1-2-3 OFF), reapply power (p.41).",
   "Charge with the compressor at full capacity: all pressures and subcool values shown are with the compressor on high stage (p.41).",
   "Confirm gauges are accurate (Table 12 gives R-454B saturation pressures, for example 205 psig = 75°F liquid / 77°F vapor) (p.42).",
   "Read liquid pressure and subcooling at the liquid base valve and compare with the chart for the indoor match: Table 13 = 2 ton, Table 14 = 3 ton, Table 15 = 4 ton, Table 16 = 5 ton. Rows are outdoor dry bulb 55 to 125°F, columns indoor wet bulb 57 / 62 / 67 / 72°F at 80°F dry bulb (p.43-44).",
   "Add or subtract refrigerant to obtain the chart pressure, always in liquid form, and mark the total charge on the data plate (p.38-39).",
   "When done end the call and switch SERVICE MODE back to OFF (or S1 position 4 OFF with 24 V removed). It reverts on its own after 24 hours; code 24 / 25 points at a unit left in service or test mode (p.40-41, p.59).",
   "At 55°F outdoor or below the preferred method is to weigh in the charge (p.16)."
  ],
  "safety": "Always charge in liquid form. Take care not to slug the compressor. Do not attempt to pump total system charge into the outdoor unit for maintenance or service - recover and weigh the charge into a recovery cylinder.",
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   16,
   38,
   59
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.16, p.38, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-tonnage-setup",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Setting a 3 ton to run as 2 ton, or a 5 ton as 4 ton - YH9 / XH9",
  "summary": "No 2 ton or 4 ton outdoor unit is offered - the 3 and 5 ton are converted to lower capacity mode.",
  "steps": [
   "If the 5 ton outdoor unit is used in a 4 ton application with a 4 ton indoor unit match, or the 3 ton with a 2 ton indoor match, the outdoor unit must be converted to lower capacity mode (p.5).",
   "Preferred: at the thermostat during setup - outdoor unit tonnage must be selected (3 ton model as 2 or 3 ton; 5 ton model as 4 or 5 ton) (p.40). The manual recommends leaving the board dipswitches in their factory positions and making changes at the room thermostat (p.41).",
   "On the board: de-energize the 24V power to the controls and set the S3 bank. Positions 1-2-3: 2 ton = OFF ON OFF, 3 ton = OFF OFF OFF, 4 ton = OFF ON OFF, 5 ton = OFF OFF OFF (p.41).",
   "Use the charging chart for the tonnage it is set to: Table 13 (2 ton, JHC24*C or CT(F,M,U)30*C), Table 15 (4 ton, JHC48*G or CT(F,M,U)60*G) (p.43)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   5,
   40,
   41,
   43
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.5, p.40, p.41, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-defrost",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost: how it decides, termination setting and forcing one - YH9 / XH9",
  "summary": "Adaptive demand defrost. After a power-up it is un-calibrated and runs a sacrificial defrost first.",
  "steps": [
   "Defrost can only start with the coil below 32°F. Above 32°F the defrost run timer does not accumulate (p.64-65).",
   "After power is applied the system is un-calibrated: it starts a sacrificial defrost (Sd) after 31 min of accumulated heating run time with the coil below 32°F, then calibrates its frost-free temperature difference (ambient minus coil) (p.65).",
   "Normal: demand defrost (dd) - started by frost detection when ambient minus coil exceeds the learned value for 5 s, not sooner than 31 min of run time. If the last defrost ended on time with the coil not above 32°F for 4 min it uses time / temperature defrost (tt) at 31 min instead (p.65-67).",
   "Ends when the coil goes above the termination temperature for 2 s, or after 12 min (p.67).",
   "Termination temperature: 50°F default, 60, 70 or 80°F - thermostat service menu, or S2 positions 1-2-3: 50 = OFF OFF OFF, 60 = OFF ON OFF, 70 = ON OFF OFF, 80 = ON ON OFF (p.64, p.67).",
   "If 6 h of compressor run time pass in heating without a defrost, one is started unless the coil is above 32°F (p.64).",
   "To force one: with an active heating call, 4 minutes after start-up, hold the push button more than 12 s. Forced defrost continues as long as the button is pressed and energizes aux heat. Hold 3-7 s to display the current defrost mode (p.49).",
   "In defrost the outdoor fan is off, the reversing valve is energized, the outdoor EEV is fully open and aux heat is called. The suction pressure fault is ignored during defrost and for 300 s after (p.66-67)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   49,
   64,
   65,
   66,
   67
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.49, p.64, p.65, p.66, p.67",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-pressure-lockout",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Codes 01 to 04: pressure switch trips and lockouts - YH9 / XH9",
  "summary": "01 HPS OPEN, 02 HPS-NORMAL, 03 HPS-DEFROST, 04 LOW SUCTION PRESSURE.",
  "steps": [
   "High pressure switch input open more than 40 ms: the control de-energizes the compressor, then applies the 5 min anti-short-cycle delay once the switch is closed (p.68).",
   "Low pressure switch open for 5 s = low pressure switch fault. It is ignored during defrost, after system start up, for 300 s after a defrost and when outdoor ambient is below 20° (p.68).",
   "After a switch fault a 6 h compressor-runtime timer starts. Another opening longer than 160 ms before it expires = soft lockout (two red flashes). An opening between 40 ms and 160 ms stops the compressor without a lockout (p.68).",
   "01 causes in order: cooling - reduced or no outdoor airflow, motor limits, outdoor temperature out of range; heating - reduced or no indoor airflow (filter, blower, dirty coil, zoning minimum CFM, static), motor limits, indoor temperature out of range; defrost - reversing valve did not switch, coil sensor faulty; then switch unplugged, switch faulty, faulty EEV or restriction, system overcharged, wiring, board (p.55).",
   "Ohm out the high pressure switch: continuity when the system pressure is below 650 PSIG (p.55).",
   "04 adds: check that the switch is properly seated and torqued down and the schrader valve is depressed; system undercharged (p.56).",
   "Soft lockout clears by itself after 1 hour; push button or cycling 24V clears it sooner. Three red flashes = hard lockout, manual reset only (p.54)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   54,
   55,
   56,
   68
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.54, p.55, p.56, p.68",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-comm-wiring",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Code 08 / will not find the outdoor unit: communication wiring - YH9 / XH9",
  "summary": "A communicating system on a four-wire A-R-C-B bus with the Smart Home Control S1-TSHC510.",
  "steps": [
   "With communicating systems you must use the Smart Home Control (S1-TSHC510) with a variable speed air handler or furnace that has a fully communicating control (p.33).",
   "All A+ terminals together, all B- together, all C together, all R together - thermostat, indoor control and outdoor unit (p.36).",
   "Power up outdoor first, then indoor. The thermostat shows SETUP when it communicates with the indoor section, then searches for the outdoor section (p.40).",
   "08 COM ERROR TSTAT (shutdown after more than 60 sec): first check if the refrigerant mitigation system is in alarm - certain wiring configurations cut thermostat communication when A2L is detected (p.51, p.57).",
   "Then check all wiring between OD control, low voltage terminal strip, indoor system and thermostat, and that 24V is on the board. 05 = control voltage below 19 VAC, 06 = below 16 VAC (p.51, p.56-57).",
   "With Y82V, Z8VT, Y92V, Z9VT, Y9VV or Z9VV furnaces connect only C (blue), R (red) and A2L (green with black stripe) from the 10-pin mitigation harness to the equipment; there are no wires between the thermostat and the mitigation board (p.13).",
   "With YP9C, TP9C, LP9C, CP9C, YPLC, TPLC, TM9V, TM8V furnaces: A+ and B- do not connect to the mitigation control; harness W1 (white) to furnace R, harness G (green) to furnace G; do not connect the room thermostat R terminal to the furnace R terminal (p.37).",
   "Shielded cable is strongly recommended where interference is likely; ground the drain wire at the indoor unit chassis only (p.34)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   13,
   33,
   34,
   36,
   37,
   40,
   51,
   56,
   57
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.13, p.33, p.34, p.36, p.37, p.40, p.51, p.56, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-sensor-checks",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Codes 09 to 16: checking the sensors and the pressure transducer - YH9 / XH9",
  "summary": "Three thermistors (ambient, coil, discharge) and one pressure transducer plug into the outdoor control.",
  "steps": [
   "09 / 10 ambient sensor shorted / open, 11 / 12 coil sensor, 13 / 14 discharge line sensor: two red flashes, immediate shutdown (p.51).",
   "Check the sensor against the temperature vs. resistance curve (Table 22, p.63-64 - the troubleshooting table calls it Table 10): 32°F = 32654, 50°F = 19903, 68°F = 12493, 77°F = 10000, 86°F = 8056, 104°F = 5327.",
   "Then the wiring lead from sensor to board, and that the sensor is plugged in with secure terminations. If leads and sensor show no defects the board may be faulty (p.57).",
   "15 / 16 pressure transducer low / high voltage: measure the supply across BLK and RED/WHT - it must be 4.5 VDC to 5.5 VDC, otherwise replace the OD control board (p.57).",
   "With good supply, the signal across WHT and BLK must be between 0.5 VDC and 4.5 VDC, otherwise replace the sensor. If it is in range and the fault still exists, replace the OD control board (p.57).",
   "Verify the harness is plugged into the board and the transducer and that the rubber seals are properly seated (p.57).",
   "Plug names on the board: DIS, LPS, RV, COIL, AMB, PT, EEV (wiring diagram p.70)."
  ],
  "safety": "Disconnect and lock out power before servicing. Wait 5 min to ensure that drive capacitors are discharged (p.7). The wiring diagram on the unit prints: wait 2 minutes (p.70). The two figures differ.",
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   51,
   57,
   63,
   64,
   70
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.51, p.57, p.63, p.64, p.70",
  "confidence": "manual"
 },
 {
  "id": "u-york-yh9-low-ambient",
  "unit": "^[YX]H9(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Code 21 or no cooling on a cool day; cold-weather start - YH9 / XH9",
  "summary": "The unit will not cool below 55°F outdoor, and needs stator heat before a cold start.",
  "steps": [
   "21 = OD AMBIENT < 55°F (Cooling Mode): solid red, shutdown until the outdoor ambient is above 55°F (p.52).",
   "Do not operate the unit in cooling mode at outdoor temperatures below 55°F (p.17).",
   "If the ambient really is above 55°F (+/-2°F), check for a failed ambient sensor against the resistance curve (p.58).",
   "Heating works down to -10°F outdoor; make sure balance point and auxiliary heat are set and sized for it (p.18).",
   "Stator heat is used instead of a crankcase heater. It runs when outdoor ambient is below 55°F for 30 seconds and it has been more than 10 minutes since the compressor ran; thermostat OFF and the disconnect closed (p.40).",
   "An attempt to start the compressor at low ambient conditions without at least 8 h of stator heat may damage the compressor (p.40)."
  ],
  "manual": "york-yh9-xh9-install-6515371-uim-b-0526",
  "pages": [
   17,
   18,
   40,
   52,
   58
  ],
  "source": "YH9 / XH9 (variable-speed communicating heat pump, 3 and 5 ton) Installation Manual: R-454B Outdoor Split-System Single-Phase Variable Speed Heat Pump - YH9 and XH9 Series (6515371-UIM-B-0526, 2026-05-12), p.17, p.18, p.40, p.52, p.58",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-read-display",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the display and the Check button - YD5 / XD5",
  "summary": "A 3-digit display on the outdoor board shows ambient temperature in standby, compressor Hz when running, a letter code on a fault, and system values with the Check button.",
  "steps": [
   "Standby: the last two digits show outdoor ambient temperature. Running: compressor operating frequency (p.43).",
   "A letter in the first digit followed by two digits (the compressor Hz) is a protection status - the unit keeps running in a limited condition: L = T3 limited, A = oil return, C = current limited, d = T5 limited, F = IPM temperature limited, r = compressor ratio limited, U = low voltage limited; a bar at the top = high pressure, a bar at the bottom = low pressure; dF = defrost (p.42).",
   "Fault codes are letters and numbers such as E41, P21, b5 - see the unit code table. b9 and F2 need a hard restart (p.41).",
   "Press Check (SW2) to step through the point check list: the number shows first and the value after 1 second; after 20 seconds it returns to normal (p.43).",
   "Useful points: 0 = capacity (H5 = 5 ton, H3 = 3 ton), 1 = mode (0 standby, 2 cooling, 3 heating), 3 = last fault code, 4 = T3, 5 = T3L, 6 = T4, 7 = T5, 9 = evaporating pressure psig (cooling), 10 = condensing pressure psig (heating), 16 = discharge superheat, 17 = EEVA opening, 22 = input voltage, 23 = DC bus voltage (p.43).",
   "LED1 green solid = board powered. LED2 (compressor) / LED3 (fan) red: solid = running, 2 s on 2 s off = standby, 0.2 s on 0.2 s off = communication fault with main control chip, blink = driver fault (p.61)."
  ],
  "safety": "Electrical hazard 380 volts DC: wait 5 minutes after disconnecting power before touching electrical components, then verify DC voltage is less than 42 VDC at inverter test points P-N.",
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   41,
   42,
   43,
   61
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.41, p.42, p.43, p.61",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-charge-force-mode",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking or adjusting charge in Force mode - YD5 / XD5",
  "summary": "Weigh in on install or after a repair; subcooling in cooling Force mode is the only approved way to validate charge.",
  "steps": [
   "Weigh-in: the install guide prints the factory charge as covering 25 ft of line - 2 ton 5 lb 3 oz, 3 ton 6 lb 1 oz, 5 ton 8 lb 8 oz. The product specification prints 4-13 / 5-11 / 8-2 lb-oz \"for 15 feet of 3/8 in. liquid line\" (BTC 910508201 A p.6) - go by the unit nameplate. Add 0.59 oz per foot over 25 ft. Under 25 ft recover the difference; under 15 ft only recover 6 oz (p.35).",
   "Subcooling check needs outdoor 55 to 120°F and indoor 70 to 80°F. Below 55°F use weigh-in and return in warm weather (p.35-36).",
   "Start the system in cooling, short press the FORCE button - a symbol appears on the display. It may take 10 minutes to ramp up; run at least 20 minutes (p.36).",
   "It is at 100% when the compressor reaches: 2 ton 46 Hz, 3 ton 66 Hz, 4 ton 54 Hz, 5 ton 60 Hz (p.36).",
   "Measure suction line temperature and pressure for superheat (Table 15), liquid line temperature and pressure for subcooling (Table 16) (p.36-37).",
   "Design values (Table 17): 2/3 ton subcooling 6-10°F with superheat 6-8°F (optimized) or 8-12°F with 8-18°F; 4/5 ton 6-10°F with 8-10°F (optimized) or 10-12°F with 8-18°F. With a third party indoor unit keep superheat at 10-18°F (p.36-37).",
   "Add refrigerant if subcooling is below the design value, recover if above. Wait 5 minutes between adjustments (p.37).",
   "Record the charge on the outdoor unit label (p.38)."
  ],
  "safety": "Open the Suction Service Valve first, before the Liquid Service Valve. Leak check and evacuation must be completed before opening the service valves.",
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   35,
   36,
   37,
   38
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.35, p.36, p.37, p.38",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-capacity-j2",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Setting the tonnage with the J2 switch - YD5 / XD5",
  "summary": "One switch decides whether a 5 ton runs as 5 or 4 ton and a 3 ton as 3 or 2 ton.",
  "steps": [
   "If the intended capacity is 5 ton or 3 ton, no change is required. If it is 4 ton or 2 ton, the J2 DIP switch must be set to OFF (p.34).",
   "J2 ON = 5 Ton / 3 Ton (factory default). J2 OFF = 4 Ton / 2 Ton (p.34).",
   "Unit must be power cycled after a DIP switch change for it to take effect (p.34).",
   "Check it on the display: Check button point 0 shows the outdoor unit capacity, for example H5 = heat pump 5 ton, H3 = heat pump 3 ton (p.43).",
   "Force mode compressor frequency is listed by outdoor unit capacity: 2 ton 46 Hz, 3 ton 66 Hz, 4 ton 54 Hz, 5 ton 60 Hz (Table 14, p.36).",
   "Code Eb (dipswitch setting does not match machine type) is about SW4-1 and SW4-2, which must stay in the default OFF position (p.38, p.49)."
  ],
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   34,
   36,
   38,
   43,
   49
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.34, p.36, p.38, p.43, p.49",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-defrost",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost: when it starts, when it ends, forcing one - YD5 / XD5",
  "summary": "Demand defrost from the coil sensor (T3), the ambient sensor (T4), run time and high pressure.",
  "steps": [
   "Any one of three conditions starts a defrost (p.39).",
   "One: ambient minus coil temperature held for 3 minutes - 18°F when T4 is 39°F or more, 16°F at 30°F or more, 14°F at 19°F or more. Below 19°F ambient with the coil below 9°F: after 80 minutes of accumulated compressor run time.",
   "Two: minimum run time - 4 hours when T4 is below 23°F, 2 hours from 23°F to below 40°F, 50 minutes when the last defrost cycle lasted 8 minutes.",
   "Three: high pressure saturation temperature below 82°F for 20 minutes when T4 is 14°F to below 29°F.",
   "It ends when the coil (T3) reaches 64°F for 1 minute, or at 8 minutes.",
   "SW5-1 ON reduces heating time 10%; SW5-2 ON extends defrosting 120 seconds. Power cycle after changing a switch (p.34, p.39).",
   "Manual defrost: with a heat call that has run at least 8 minutes, press the Force button for 6 seconds. Defrost starts in about 40 seconds and the display shows dF; it ends by itself. Wait 5 minutes before a second test (p.39).",
   "Reversing valve energizes during heat mode and de-energizes in cool mode on this unit (p.40)."
  ],
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   34,
   39,
   40
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.34, p.39, p.40",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-comm-b5",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Code b5 or thermostat wiring: conventional and communicating hook-up - YD5 / XD5",
  "summary": "The unit takes ordinary 24 VAC heat pump wiring; P Q communication is used with the matched air handlers.",
  "steps": [
   "There is no low-voltage terminal block: splices are made with wire nuts (22-16 gauge) inside the control board access panel (p.25).",
   "B terminal goes to the thermostat O/B wire - the reversing valve energizes in heating. The outdoor W signal goes to the electric auxiliary heat or its first stage (p.25).",
   "Communicating (P Q) mode is the factory default: indoor DIP SW7-1 ON and outdoor DIP SW5-4 ON. It only functions with a JDE AHU, a JDP AHU, a T92V Furnace or a Communication Accessory Kit (p.26).",
   "P Q is non-polar, 16/18 AWG, 150 ft maximum. With two systems side by side make sure the low voltage wires go to the unit on the same refrigerant line (p.25-26).",
   "b5 flow chart: is P or Q incorrectly connected - correct wiring at CN12 on the ODU and CN30 on the IDU. Are ODU SW5-4 and IDU SW7-1 correct. Is P or Q shorted or touching sheet metal. Then replace the IDU control board; if the fault stays, the ODU control board (p.47).",
   "SHC350 is optional: when the system is controlled by an SHC350 the homeowner pairs the thermostat with the outdoor unit in the GoTemp Home app (p.35)."
  ],
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   25,
   26,
   35,
   47
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.25, p.26, p.35, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-york-yd5-sensor-checks",
  "unit": "^[YX]D5(24|36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking T3, T4, T3L and T5 sensors and the transducer - YD5 / XD5",
  "summary": "Four plug-in thermistors on two different curves, one pressure transducer and one high pressure switch.",
  "steps": [
   "Power off and wait 3 minutes before measuring resistance (p.46).",
   "T3 (coil, CN19), T3L (liquid line, CN20) and T4 (ambient, CN23) use Table 24: 32°F is not printed - 30°F = 36.71, 40°F = 27.39, 50°F = 20.61, 60°F = 15.65, 70°F = 11.99, 80°F = 9.27, 90°F = 7.23 kOhm (p.59).",
   "T5 (discharge, CN14) uses Table 25, a much higher curve: 50°F = 110.71, 70°F = 65.41, 80°F = 50.90, 100°F = 31.81, 150°F = 11.21, 200°F = 4.65 kOhm (p.60).",
   "E41 / E42 / E43 / E44 flow charts: wire connection at the board, sensor open or shorted, sensor failed - otherwise replace the control board (p.49-50).",
   "C3 (coil sensor not reading correctly in cooling): is T4 exposed to heat, is T3 in the wrong place or wired wrong, then both resistances against Table 24 (p.48).",
   "E7: is the T5 sensor in the wrong location, are T5 and Tf wired correctly, is T5 in the range of Table 25 (p.52).",
   "Pressure transducer (CN16): compare gauge pressure with Check button point 9 (cooling) or 10 (heating) - within 50 psi is good (p.43, p.56).",
   "High pressure switch (CN10): opens at 580 psig or more, closes below 435 psig (p.40)."
  ],
  "safety": "Electrical hazard 380 volts DC: wait 5 minutes after disconnecting power before touching electrical components, then verify DC voltage is less than 42 VDC at inverter test points P-N.",
  "manual": "york-yd5-xd5-install-btc910503201b",
  "pages": [
   40,
   43,
   46,
   48,
   49,
   50,
   52,
   56,
   59,
   60
  ],
  "source": "YD5 / XD5 (15.2 SEER2 inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YD5 and XD5 Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910503201 B, 07.2026), p.40, p.43, p.46, p.48, p.49, p.50, p.52, p.56, p.59, p.60",
  "confidence": "manual"
 },
 {
  "id": "u-york-ydv-charge-force-mode",
  "unit": "^[YX]DV(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking or adjusting charge in Force mode - YDV / XDV",
  "summary": "Same method as the YD5 but its own charge, frequency and target figures.",
  "steps": [
   "Weigh-in: the install guide prints the factory charge as covering 25 ft of line - 3 ton 7 lb 1 oz, 5 ton 10 lb 9 oz. The product specification prints 6-11 and 10-3 lb-oz \"for 15 feet of 3/8 in. liquid line\" (BTC 910108201 A p.6) - go by the unit nameplate. Add 0.59 oz per foot over 25 ft; under 15 ft only recover 6 oz (p.38).",
   "Subcooling check: cooling Force mode only, outdoor 55 to 120°F, indoor 70 to 80°F (p.38).",
   "Short press FORCE after starting in cooling; allow up to 10 minutes to ramp up and run at least 20 minutes (p.39).",
   "Force mode compressor frequency: 2 ton 52 Hz, 3 ton 75 Hz, 4 ton 58 Hz, 5 ton 66 Hz (p.39).",
   "Design values (Table 16): 2/3 ton subcooling 6-10°F with superheat 7-10°F (optimized) or 8-12°F with 10-18°F; 4 ton 4-8°F with 7-9°F (optimized) or 6-10°F with 9-18°F; 5 ton 4-8°F with 6-8°F (optimized) or 6-10°F with 8-18°F (p.40).",
   "Add if subcooling is below the design value, recover if above; wait 5 minutes between adjustments (p.40).",
   "Tonnage: J2 ON = 5 ton / 3 ton, OFF = 4 ton / 2 ton, power cycle after a change (p.36)."
  ],
  "safety": "Open the Suction Service Valve first, before the Liquid Service Valve.",
  "manual": "york-ydv-xdv-install-btc910103201b",
  "pages": [
   36,
   38,
   39,
   40
  ],
  "source": "YDV / XDV (inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YDV and XDV Series Condensing Unit, 2-3-4-5 Ton, R-454B (BTC 910103201 B, 07.2026), p.36, p.38, p.39, p.40",
  "confidence": "manual"
 },
 {
  "id": "u-york-ydc-cold-climate",
  "unit": "^YDC(36|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Charge, base pan heater and Hyper-Link on the cold climate unit - YDC",
  "summary": "The YDC has its own charge figures, a base pan heater (E49) and two possible communication plugs.",
  "steps": [
   "Weigh-in: factory charge covers 25 ft of line - 3 ton 8 lbs 6 oz, 4/5 ton 10 lbs 14 oz; 0.59 oz per foot over 25 ft (p.41).",
   "Subcooling check: cooling Force mode only, outdoor 50 to 120°F, indoor 70 to 80°F. Frequency in Force mode: 3 ton 46 Hz, 4 ton / 5 ton 60 Hz. Press Force again for 1 second to exit (p.41-42).",
   "Design values (Table 17): 3 ton subcooling 6-10°F with superheat 7-13°F (optimized) or 8-12°F with 10-18°F; 4/5 ton 4-8°F with 7-13°F (optimized) or 6-10°F with 10-18°F (p.43).",
   "In force cooling the display can show a refrigerant amount indication: o31 no result, o33 slightly overcharge, o34 normal, o35 slightly insufficient, o36 significantly insufficient (wiring diagram, p.68).",
   "Base pan heater: on when T4 is below 36°F in heating and it has been off 10 minutes; off at 39°F or more for over 1 minute, or in cooling (p.45).",
   "E49 base pan heater fault: plug at CN42; heater resistance 290-325 ohm; replace the current sensor at CN15; line voltage 187-253 V; below 35°F outdoor there should be 187-253 V at CN42, otherwise replace the outdoor control board (p.57).",
   "Communication: Hyper-Link (M1 M2) on CN10 with a matched indoor unit, or P Q on CN11 (for example a T92V furnace). Factory default DIP positions for communicating mode are indoor SW7-1 OFF and outdoor SW5-4 OFF (p.29).",
   "Do not cross-connect Hyper-Link (M1 M2) and P Q terminals - this can damage the control board (p.37). Pb1 = Hyper-Link over current protection (p.65)."
  ],
  "safety": "Electrical hazard 380 volts DC: wait 5 minutes after disconnecting power before touching electrical components, then verify DC voltage is less than 42 VDC at inverter test points P-N.",
  "manual": "york-ydc-install-btc910803201b",
  "pages": [
   29,
   37,
   41,
   42,
   43,
   45,
   57,
   65,
   68
  ],
  "source": "YDC (cold climate inverter heat pump) Installation and Operating Instructions: Split System Heat Pump YDC Series Condensing Unit, 3-5 Ton, R-454B (BTC 910803201 B, 07.2026), p.29, p.37, p.41, p.42, p.43, p.45, p.57, p.65, p.68",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-read-codes",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the fault code at the outdoor unit - B5A1V / B5H0V / B5H3V",
  "summary": "Codes are two numbers, base-expansion (for example 31-16). The outdoor board always shows the full code; the wall control can lose the second half.",
  "steps": [
   "Active codes scroll continuously on the 5x7 matrix display on the PCM board - up to four at a time, highest priority first, with a brief pause between sequences. A blank display means no code is active.",
   "If the Ion control lost communication with the outdoor unit after the code was set, it keeps the base code but shows the expansion as 00 - 38-18 shows as 38-00. Get the complete code from the Service Tech App or with Diagnostic Code Recall at the PCM.",
   "Amber STATUS light with PCM software 4.0: On = standby with nothing wrong; continuous slow flash = operation interrupted or limited; continuous fast flash = lockout (or recall mode); Off = no power to the PCM or a fundamental PCM fault.",
   "With PCM software older than 4.0 the same light is Off in standby and flashes the base code: short flashes = first digit, long flashes = second digit.",
   "To recall the last code: remove power, put a clip wire across the Forced Defrost header pins (the service manual calls them J3; the installation instructions say the connector is labeled J2 on the board), then apply power. The display scrolls RECALL and then the most recent, highest priority code if it happened within the last 240 hours of operation. Only RECALL scrolls if there is nothing to show.",
   "The unit will not run while in recall mode. Remove the short to leave it (it also ends by itself 15 minutes after power-up)."
  ],
  "safety": "Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   15,
   20
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.15, p.20",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-comm-lost-emergency",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Green COMM light off / running on a 24 V thermostat in emergency mode - B5A1V / B5H0V / B5H3V",
  "summary": "Lost communication with the Ion control turns the COMM light off; the manual says no diagnostic fault is set (printed under 'B5H0V, B5H3V Models Only'). The unit falls back to its 24 V inputs, with very limited function.",
  "steps": [
   "COMM light On = communication received from the Ion control within the last 2 minutes. Off = none for 2 minutes; the unit is in emergency communicating mode.",
   "After 2 minutes in that mode the unit looks for a non-communicating (24 V) control signal. If no signal is detected, the unit shuts off. The manual says there is no diagnostic fault for lost communication (printed under 'B5H0V, B5H3V Models Only').",
   "The Ion control uses a 2-wire connection (A and B). A third wire for ground is optional and recommended for long runs or if communication is not consistent on two wires.",
   "Non-communicating control is for emergency situations only and gives very limited function as a single or two stage unit. The PCM terminals are O, W, Y2, Y1, C (plus LLS and UTIL). O should be active in cooling; O and W are driven during defrost on heat pumps.",
   "In non-communicating mode set the PCM DIP switches: switches 1 and 2 = defrost interval (Up / Up Auto, Up / Down 30 minutes, Down / Up 60 minutes, Down / Down 90 minutes); switch 3 = performance mode (Up Efficiency, Down Comfort).",
   "The amber STATUS light shows the stage in emergency mode: 1 slow flash = low capacity, 2 slow flashes = high capacity."
  ],
  "safety": "Do not connect the outdoor unit's 24 VAC supply (Rc) to the indoor equipment's 24 VAC supply (Rh) - doing so may destroy one or both transformers.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   4,
   9,
   10,
   15,
   21
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.4, p.9, p.10, p.15, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-replace-pcm-model",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "New PCM board or code 25-61 / 25-62 / 25-63 - setting the model - B5A1V / B5H0V / B5H3V",
  "summary": "The PCM must hold the right model configuration (size and AC / HP). It can be set with DIP switch 4, the Ion control, the Service Tech App or a physical model plug.",
  "steps": [
   "Set PCM DIP switch #4 ON to enter the menu mode. The display scrolls the PCM models that are compatible with the VFD it detects - for a 5 ton VFD: 60K-AC, 60K-HP and NOCFG.",
   "Set the switch OFF while the right model is scrolling (for a 5 ton heat pump, when 60K-HP is scrolling). The selected model stays on the display for 2 minutes.",
   "Cycle power - a power cycle is required for the model configuration to be stored in the PCM memory.",
   "PCM models: B5A1V 24 / 36 / 48 / 60 = 24K-AC / 36K-AC / 48K-AC / 60K-AC. B5H0V and B5H3V 24 / 36 / 48 / 60 = 24K-HP / 36K-HP / 48K-HP / 60K-HP.",
   "A physical model plug set is available as a service component. A plug installed at power-up takes precedence over the stored value. Plug numbers: B5A1V HK70EZ009 / 021 / 033 / 045; B5H0V and B5H3V HK70EZ003 / 015 / 027 / 039 (24 / 36 / 48 / 60).",
   "If the models that scroll do not include the unit's model (code 25-63), the VFD does not match: check and install the correct VFD, then set the model again.",
   "25-62 (configuration missing) clears at power-down or when a model is selected electronically. 25-24 (configuration changed) after an intentional plug change needs no action - it clears on the next power cycle."
  ],
  "safety": "Do not attempt to operate the system with an incorrect model plug - this could cause equipment damage. An incorrect plug can make units operate incorrectly and fail prematurely.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   14,
   21,
   27
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.14, p.21, p.27",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-high-pressure",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "High pressure codes 31-11 / 31-58 / 31-16 / 31-19 - B5A1V / B5H0V / B5H3V",
  "summary": "The control first slows the compressor and speeds the fan on the transducer reading; the 670 psig switch is a backstop wired to the VFD.",
  "steps": [
   "31-11 (limit): the system shuts down and restarts after the 5 minute delay if demand remains. Each occurrence cuts the next cycle's capacity by 25%; each hour of running without the fault gives 25% back.",
   "31-58 (lockout): the limit was reached at minimum compressor speed - 2 hour lockout, then it tries again.",
   "For a high pressure trip or lockout: check the refrigerant for an overcharge. If the charge is correct, check for outdoor coil blockage in cooling; in heating check the indoor coil for blockage and the indoor fan for proper operation.",
   "Other causes the manual lists: dirty condenser, lack of airflow or recirculation at the condenser, extreme high temperature and sun loading, refrigerant circuit blockage, faulty EXV / TXV.",
   "31-16 (high pressure switch): the switch opens at 670 psig and cuts high voltage to the VFD, so VFD communication codes may come with it. It should not normally trip - a fast transient, or a break or short in the switch harness, sets it. Make sure the switch is closed and securely connected to the VFD. Three 31-16 trips give a 2 hour lockout.",
   "The unit will not try to run again until discharge pressure is below 425 psig (the component description on another page says the switch itself closes at 470 psig).",
   "31-19 (disable): discharge pressure is too high to start (620 psig) - extreme high ambient can set it; the unit stays off until pressure drops."
  ],
  "safety": "Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   8,
   21,
   22,
   28
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.8, p.21, p.22, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-low-pressure",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Low pressure codes 32-15 / 32-55 / 32-59 and coil freeze 18-11 - B5A1V / B5H0V / B5H3V",
  "summary": "The transducer on the suction side stands in for a low pressure switch. Limits depend on compressor and speed; 30 psi and 15 psi are typical.",
  "steps": [
   "32-15: suction went under the soft limit for 2 minutes, or under the hard limit at once. The control shuts the system down immediately if pressure drops to 15 psig. It waits 5 minutes and restarts if demand remains.",
   "Four low pressure trips within 2 hours give a 2 hour lockout (32-55).",
   "For a low pressure trip or lockout: check the refrigerant for an undercharge. If the charge is correct, check for low indoor airflow in cooling; in heating check the outdoor fan for proper operation and the outdoor coil for airflow restrictions.",
   "Other causes the manual lists: blockage in the liquid line, a stuck TXV or EXV, no airflow across the evaporator. Check the pressure drop of the liquid line at the condenser and the evaporator. Low ambient makes the code more sensitive to all of these.",
   "32-59 (disable): suction pressure is too low to start the compressor safely. The most likely cause is a leak in the refrigeration system.",
   "18-11 (indoor coil freeze protection): the unit is slowing the compressor because saturated suction is near freezing. Causes: dirty filter or restrictive ductwork, or low charge - check indoor static pressure and the charge."
  ],
  "safety": "Do not operate the unit in a vacuum or at negative pressure, and do not disable the low pressure transducer.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   18,
   22,
   26,
   28
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.18, p.22, p.26, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-wont-start-pev",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Compressor will not start - 38-18, 38-13 / 38-53, 44-13, 62-01 (pressure equalization valve) - B5A1V / B5H0V / B5H3V",
  "summary": "These units will not start the compressor with more than 100 psi across it. A pressure equalization valve (PEV) bleeds the difference down first.",
  "steps": [
   "38-18 (high differential pressure start disable): a call exists and the pressure difference is not under 100 psi. It clears and the unit starts once the difference is under 100 psi.",
   "On these models the most likely cause of 38-18 is a PEV that is not working - a mechanical failure, or the coil is not on the valve. Verify the PEV coil is attached to the PEV valve body. If it is, replace the PEV harness and coil first, and the PEV body if that does not fix it.",
   "44-13 (PEV timeout): the PEV was open 10 minutes and did not bring the difference under 40 psi - likely the valve or coil has failed. Replace the coil and harness first; if the fault persists open the refrigeration system and replace the PEV valve.",
   "62-01 (PEV solenoid open): remove the PEV connector from the PCM and measure continuity between pins 1 and 3. If open, inspect the wire for damage and repair; if no damage is found, replace the coil and harness.",
   "38-13 (start fail), three in a row = 38-53 lockout: the VFD cannot turn the rotor enough to finish the start. Check compressor wiring for secure connections, damage and wire order. If malfunctions continue and the difference across the compressor is confirmed under 40 psi, replace the compressor.",
   "38-54 (no pump): above 400 rpm the compressor has 30 seconds to build 20 psi of difference; if not it locks out 30 minutes. Most likely the compressor leads are wired wrong - check U, V, W colours against the wiring diagram.",
   "Winding check at 68 F between T1, T2 and T3: B5A1V 24 / 36 / 48 / 60 = 1.63 / 0.74 / 0.46 / 0.424 ohm; B5H0V = 1.63 / 0.46 / 0.424 / 0.424; B5H3V = 0.74 / 0.453 / 0.424 / 0.424. Terminal to ground more than 1 megohm."
  ],
  "safety": "Do not use a megger for measuring the winding resistance. Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   22,
   29,
   30,
   32
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.22, p.29, p.30, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-fan-faults",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor fan codes 39-13 / 39-53 / 39-14 / 39-15 / 39-55 / 39-58 - B5A1V / B5H0V / B5H3V",
  "summary": "The fan is a brushless motor with its own electronics, fed high-voltage DC and a 0-5 V speed signal from the VFD. Its windings cannot be ohmed.",
  "steps": [
   "39-13 / 39-53 (start failure): no speed feedback for 25 seconds; the PCM resets the VFD and retries - code after 3 resets, 1 hour lockout after 6. Inspect all wiring and connectors for damage and loose connections, check for blade blockage and free spin, and check the external fan fuse on the VFD.",
   "39-14 (speed error): actual speed is more than 20% off a command above 200 rpm. Most likely a partial blockage of the blade, ice on the blade, extreme coil blockage, or stiff bearings.",
   "39-15 / 39-55 (unexpected shutdown): commanded above 200 rpm but under 80 rpm for 10 seconds. An intermittent open on the fan feedback (FG) wire or a failing motor may cause it.",
   "39-58: no feedback for 30 seconds while a speed signal is sent; 30 minute lockout. Replace the fan motor first, then the VFD.",
   "To check the motor: remove the fan harness at the VFD and measure between connector pins. By motor part number (Vdc-GND / Vcc-GND / Vsp-GND / FG-GND): 1208502 = 1.04 megohm / 62.1k / 216k / open; 1192973 = 1.37 megohm / 43.7k / 119k / open; 1208504 = 1.22 megohm / 54.3k / 222k / open; 1192975 and 1208552 = 1.30 megohm / 45.9k / 119k / open.",
   "Resistances are approximate and move with temperature - only declare the motor bad if results differ greatly from the table.",
   "It is normal for the fan to stop during defrost and to cycle on and off (about a 40 second cycle) in low ambient cooling."
  ],
  "safety": "High voltage DC (240-373 VDC) is on the fan harness. Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   14,
   22,
   23,
   29,
   30
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.14, p.22, p.23, p.29, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-icp-b5vs-charging",
  "unit": "^B5(A1|H0|H3)V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking or adjusting charge - B5A1V / B5H0V / B5H3V",
  "summary": "The Ion Black System Control is the source for charge: it shows the factory charge, the target subcooling and how much to add for this coil and line set.",
  "steps": [
   "Conditions must suit subcooling charging in cooling mode: outdoor 65 F to 105 F and indoor 65 F to 80 F. Outside those ranges weigh in charge only, and come back to verify subcooling when temperatures are in range.",
   "The unit is factory charged for 15 ft of line set and the smallest internal volume AHRI-rated indoor coil. Enter the real indoor coil, line set dimensions, environment (Arid under 45% average annual relative humidity, Semi-Arid 45-65%, Humid 65% and over) and outdoor coil material at setup - the control calculates the target subcooling and the charge to add from them.",
   "The control indicates when conditions are acceptable; subcool charging mode is not available when they are not.",
   "Perform the final charge check only in cooling with the outdoor temperature between 65 F and 105 F.",
   "R-454B is charged as a liquid. Use bubble point (saturated liquid) for subcooling and dew point (saturated vapor) for superheat.",
   "To evacuate or recover on a heat pump, open the heating EXV first from the control: installation and service > refrigerant charging > evacuation, set the time (default 20 minutes), START, and wait for READY TO EVACUATE. The EXV keeps its open position with power off."
  ],
  "safety": "Do not overcharge the system. Do not operate the unit in a vacuum or at negative pressure. Do not disable the low pressure transducer, the discharge line thermistor or the high pressure switch. Do not use power tools to open and close service valves. Federal regulations require that you do not vent refrigerant - recover it.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   18,
   54,
   62
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.18, p.54, p.62",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-read-codes",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the fault code at the outdoor unit - N5H9V / Q5H9V",
  "summary": "This unit runs from a two-stage thermostat, so the code is read at the outdoor board: a 5x7 LED display scrolls two-part numbers such as 31-16.",
  "steps": [
   "Active codes scroll continuously on the 5x7 matrix display on the PCM board - up to four at a time, highest priority first. A blank display means no code is active.",
   "Amber STATUS light: On = standby with nothing wrong; 1 slow flash = running at low capacity; 2 slow flashes = high capacity; continuous slow flash = operation interrupted or limited; continuous fast flash = lockout (or recall mode); Off = no power to the PCM or a fundamental PCM fault.",
   "COMM light on the board is the PCM-to-VFD link: flashing green = communicating, flashing red = failed communication, off = no communication after multiple failures (a fault code will be set).",
   "A fault interrupts or limits operation but does not prevent it. A malfunction significantly limits or prevents operation and may be an escalation of a repeated fault.",
   "To recall the last code: remove power, put a clip wire across the Forced Defrost pins, then apply power. The display scrolls RECALL and then the most recent, highest priority code from the last 240 hours of operation. The unit will not run in recall mode; remove the short to leave it (it also ends 15 minutes after power-up).",
   "Toggle DIP switch #8 from low to high to scroll the PCM software version, VFD software version, unit tonnage and unit type (AC or HP)."
  ],
  "safety": "Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting. Toggling DIP switch #8 must only be performed by a trained technician with the required PPE.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   15,
   16,
   20,
   39
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.15, p.16, p.20, p.39",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-charge-modes",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Check charge with DIP switch 1 (CCC / HCC) - N5H9V / Q5H9V",
  "summary": "DIP switch 1 on the PCM runs the unit at fixed charge-check settings and scrolls its own subcooling reading.",
  "steps": [
   "Factory charge and target subcooling are on the unit rating plate; the charging method is on the information plate inside the unit. The unit is charged for 15 ft of line set - add or remove 0.6 oz per foot of 3/8 liquid line above or below 15 ft.",
   "Switch DIP switch 1 (Refrigerant Charging Modes) to HIGH. The display scrolls CCC, HCC, EVAC and PUMP (Cooling Check Charge, Heating Check Charge, Evacuation, Pumpdown).",
   "Switch it back to LOW while the mode you want is scrolling - that selects and enters the mode. If nothing is selected the scrolling times out after 60 seconds; then move the switch back to LOW.",
   "CCC runs at fixed charge-mode settings and scrolls the subcooling the unit's own sensors calculate. It can only be entered with the outdoor sensor at 60-105 F and the indoor sensor (if applicable) at 65-80 F. Before adjusting charge, verify subcooling at the liquid service valve.",
   "HCC is for heating and is used with the Heating Check Chart on the inside of the control box cover, to see if the system is significantly over or under charged from suction and discharge pressures and superheat at the vapor service valve. It can only be entered with the outdoor sensor at -8 to 75 F and the indoor sensor (if applicable) at 65-80 F.",
   "Outside those temperature ranges, weigh in charge only.",
   "To leave a charging mode switch DIP switch 1 from LOW to HIGH - the system returns to normal operation; after the 60 second timeout move the switch back to LOW."
  ],
  "safety": "DO NOT adjust charge using the Heating Check Chart - if the charge is suspect, recover the refrigerant and recharge with the full system charge / recharge method. Do not overcharge. Do not operate the unit in a vacuum or at negative pressure. Do not disable the low pressure transducer, discharge line thermistor or high pressure switch.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   18,
   19
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.18, p.19",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-pumpdown-evac",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Pump down and evacuation (PUMP / EVAC modes) - N5H9V / Q5H9V",
  "summary": "A conventional pump-down cannot be used on this VFD compressor, and the heating EXV must be opened before pulling a vacuum. The PCM has a mode for each.",
  "steps": [
   "PUMP: connect gauges to the liquid and vapor (or suction capillary) service ports. Set DIP switch 1 HIGH, and move it to LOW while PUMP is scrolling.",
   "The unit starts in cooling after a brief delay. Close the liquid service valve.",
   "The unit runs with the low pressure protection set to show pump down complete when suction drops below 20 psig. Compressor protections (high pressure, high current and so on) stay active.",
   "When it indicates pump down complete, or it fails to complete and shuts down, close the vapor service valve.",
   "A recovery system is still required to remove the final quantity of refrigerant from the indoor coil and line set. Follow the Service Manual's evacuation and purge steps after recovering the refrigerant and before making any repairs to the indoor unit or line set. Remove power from the indoor and outdoor units before servicing.",
   "EVAC: connect gauges and the recovery machine or vacuum pump; the service valves must be open to evacuate the unit through the line set ports. Select EVAC with DIP switch 1 (LOW while EVAC is scrolling) - the PCM opens the EXV. Begin evacuation or recovery.",
   "Remove power from the indoor and heat pump units before servicing - the EXV keeps its open position. If the EXV is not open, evacuation can take much longer or the vacuum can be inadequate."
  ],
  "safety": "Federal regulations require that you do not vent refrigerant to the atmosphere - recover during system repair. Wear safety glasses, protective clothing and gloves when handling refrigerant. Do not use power tools to open and close service valves.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   18,
   19,
   54
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.18, p.19, p.54",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-model-config",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "New PCM / VFD or code 25-62 / 25-63 - setting the model with DIP switch 2 - N5H9V / Q5H9V",
  "summary": "The PCM must hold the right model configuration. On these units it is set with DIP switch 2.",
  "steps": [
   "Set PCM DIP switch #2 ON to enter the menu mode. The display scrolls the PCM models that are compatible with the VFD it detects.",
   "Set the switch OFF while the right model is scrolling: 24K-HP, 36K-HP, 48K-HP or 60K-HP for the 24, 36, 48 or 60 size. The selected model stays on the display for 2 minutes.",
   "Cycle power - a power cycle is required for the model configuration to be stored in the PCM memory.",
   "A physical model plug at power-up takes precedence over the stored value: HK70EZ003 (24), HK70EZ015 (36), HK70EZ027 (48), HK70EZ039 (60).",
   "25-63 (VFD / PCM model mismatch): the models that scroll are the ones valid for the detected VFD. If they do not include the unit's model, check and install the correct VFD, then set the model again.",
   "25-62 (configuration missing): the equipment will not operate; it clears at power-down or when a model is selected electronically."
  ],
  "safety": "Do not attempt to operate the system with an incorrect model plug - this could cause equipment damage.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   21,
   27
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.21, p.27",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-plc-comm",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Codes 19-06 / 21-06 - lost SmartSense (power line) communication - N5H9V / Q5H9V",
  "summary": "With a SmartSense thermostat or indoor unit the outdoor unit talks over the power line (PLC). If that drops, the system keeps running on the 24 V wires.",
  "steps": [
   "With enhanced (PLC) control working, the 24 VAC control signals are ignored. If PLC communication is interrupted the system reverts to the 24 VAC control signals.",
   "19-06: communication with a PLC capable thermostat lost for more than 2 minutes. 21-06: communication with a PLC capable indoor unit lost for more than 2 minutes. Either way the system continues to run and satisfy cooling and heating demands on 24 VAC, and enhanced control resumes when communication returns.",
   "By default the outdoor unit does not display PLC communication faults, so systems without PLC equipment show no nuisance faults. DIP switches 3 and 4 turn the display on.",
   "The two ICP documents disagree on which switch is which: the service manual says switch #3 HIGH = thermostat faults and switch #4 HIGH = indoor unit faults; the installation instructions' DIP switch table says 3 = IDU and 4 = TSTAT. Set the one that matches what is installed, and try the other if nothing displays.",
   "If PLC communication is a persistent problem, the 24 VAC control wiring can be shielded with accessory EMI chokes - see the unit product data for compatible Accessory Choke Kits.",
   "After a software update on a SmartSense thermostat system, a SmartSense reset / relearn is required - see the thermostat documentation."
  ],
  "safety": "Do not connect the outdoor R (Rc) to the indoor transformer (Rh) - doing so may destroy one or both transformers.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   10,
   16,
   26
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.10, p.16, p.26",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-usb-update",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Software update by USB and codes 79-01 / 79-02 / 79-03 - N5H9V / Q5H9V",
  "summary": "PCM and VFD software can be updated from a USB memory device plugged into the PCM board.",
  "steps": [
   "Check the current versions first: toggle DIP switch #8 from low to high - the display scrolls PCM software version, VFD software version, tonnage and unit type.",
   "Use a USB memory device between 4 GB and 32 GB formatted FAT32. Any other formatting (NTFS, exFAT, etc.) may result in an error. The software is downloaded from the manufacturer's product page - follow the instructions provided with the software.",
   "Insert the USB device into the PCM board. The PCM begins the update automatically; the percentage of download scrolls, the PCM restarts and installs (the display gradually illuminates), then restarts once more.",
   "If VFD software is also on the USB device it downloads automatically after the PCM installation; when it finishes you can remove the USB device.",
   "79-01 (USB drive fault): remove and re-seat the drive; verify it is correctly formatted and contains the required files; retry with a good drive.",
   "79-02 (file not found): verify the USB directory structure, reload the correct software package from an approved source, replace the drive if corruption persists.",
   "79-03 (invalid update version): the version must be newer than the installed one - reload the correct update files and retry.",
   "With a SmartSense thermostat, do a SmartSense reset / relearn after the update."
  ],
  "safety": "Toggling DIP switch #8 must only be performed by a trained technician with the required PPE. Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   16,
   33
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.16, p.33",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-compressor-disconnect",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "Codes 38-14 / 38-55 compressor disconnect - N5H9V / Q5H9V",
  "summary": "The VFD has lost a phase to the compressor. Check the plug and harness before condemning the compressor or the drive.",
  "steps": [
   "38-14 sets when the VFD detects a loss of phase in one of the compressor windings. If it is intermittent, a loose compressor plug connection can cause it.",
   "Three 38-14 in 1 hour give a 4 hour lockout and code 38-55 (compressor physical malfunction).",
   "Inspect the compressor plug harness for any damage and verify continuity between the VFD side and the compressor side of the harness.",
   "If the harness appears undamaged, check the compressor windings: at 68 F between T1, T2 and T3 the 24 and 36 sizes read 0.61 ohm and the 48 and 60 sizes read 0.18 ohm; terminal to ground more than 1 megohm.",
   "If the compressor or the compressor plug harness is damaged, replace it. Otherwise the VFD should be replaced."
  ],
  "safety": "Do not use a megger for measuring the winding resistance. Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   22,
   29
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.22, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-icp-n5h9v-thermistor-failed",
  "unit": "^[NQ]5H9V",
  "brand": "ICP",
  "equipment": "Condenser/Heat Pump",
  "title": "A temperature sensor failed - what the unit does and how to check it - N5H9V / Q5H9V",
  "summary": "The unit keeps running on substitute values for most sensor failures, so the complaint can be poor performance rather than a dead unit.",
  "steps": [
   "All thermistors are 10K except the discharge (ODT), which is 50K. 10K: 77 F = 10.0 k, 32 F = 32.6 k, 0 F = 85.5 k. 50K ODT: 25 C = 50.15 k, 75 C = 7.565 k, 125 C = 1.7 k.",
   "Outdoor air sensor (OAT) failed, 51-01 / 51-02: the code text says the coil sensor (OCT) value is substituted and compressor speed is limited to 2700 rpm; the failed-sensor defaults page says the unit runs at a fixed speed with the suction sensor (OST) value substituted in heating and the OCT value when not running or in cooling.",
   "Coil sensor (OCT) failed, 52-01 / 52-02: every defrost runs for the maximum time allowed (the failed-sensor defaults page says defrost every 60 minutes for 10 minutes).",
   "OAT and OCT both failed, 51-43: the system cannot safely run and shuts down until they are fixed.",
   "Suction sensor (OST) failed, 53-01 / 53-02 and 53-41 / 53-42: heating is locked out (backup heat only); cooling still runs.",
   "Discharge sensor (ODT) failed, 54-01 / 54-02: the system only runs at startup speed until a valid reading returns.",
   "Liquid line sensor (LLT) failed: full operation continues but the subcooling reading in charge mode is not available.",
   "Check each at the PCM connector: a 10K sensor above 465 kohm is open and below 1 kohm is shorted; the ODT is open above 310 kohm and shorted below 670 ohm. Bad reading: look for a break or short in the wiring or connector, then replace the sensor. Reading within range: the manual calls for the PCM (PCM-VFD on these models for the LLT codes)."
  ],
  "safety": "Make sure each thermistor's curved surface hugs the pipe and is tied tight through the original slot; the ODT belongs inside the compressor sound blanket. Do NOT remove the control box cover for 2 minutes after power has been removed, and verify the voltage at the VFD connections shown on the cover before touching electrical components. Only trained service personnel should perform electrical troubleshooting.",
  "manual": "icp-vs-r454b-service-manual-smicpachpvsr454-02",
  "pages": [
   23,
   24,
   30,
   31
  ],
  "source": "B5A1V / B5H0V / B5H3V / N5H9V / Q5H9V Variable Speed Air Conditioners and Heat Pumps Using R-454B Refrigerant - Service Manual (file SMICPACHPVSR454-02; back page prints Catalog No. SMICPVSACHPR454-02, Edition 07/26), p.23, p.24, p.30, p.31",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg1e-which-control-board",
  "unit": "^MG1E",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Which control board to order (by build date) - MG1E",
  "summary": "Nordyne changed the MG1E control in 2025. The parts list splits the furnace by date of manufacture.",
  "steps": [
   "Units manufactured on or after 07/29/2025: Integrated Control 1046397R.",
   "Units manufactured on or before 07/28/2025: Integrated Control Kit 1050166.",
   "The same parts list shows Flame Sensor 632484R (not shown on the drawing), Ignitor 903110B, Gas Valve 1046626, Pressure Switch 1010775R and Transformer 621807R for all four sizes (056, 070, 077, 090).",
   "Order with the full model number and serial number, as the parts list asks."
  ],
  "manual": "nordyne-mg1e-parts-list-d315316a",
  "pages": [
   3
  ],
  "source": "MG1E (056 / 070 / 077 / 090) MG1E Series Direct Vent, Forced Air, Gas Furnaces - Replacement Parts List (D315316A, 09/25), p.3",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg2r-which-control-board",
  "unit": "^MG2R",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Which control board to order (by build date) - MG2R",
  "summary": "Nordyne changed the MG2R control in 2025. The parts list splits the furnace by date of manufacture.",
  "steps": [
   "Units manufactured on or after 07/08/2025: Control Board 1046397R.",
   "Units manufactured on or before 07/07/2025: Control Board kit 1050166.",
   "The same parts list shows Flame Sensor 903600, Ignitor 1046527S, Gas Valve 1046626, Fuse 632261R and Transformer 622341R for all six models (045F, 045T, 060F, 060T, 072F, 072T). The pressure switch is 632492R on the 045 and 072 and 632624R on the 060.",
   "Order with the full model number and serial number, as the parts list asks."
  ],
  "manual": "nordyne-mg2r-parts-list-d315317a",
  "pages": [
   2
  ],
  "source": "MG2R (045F / 045T / 060F / 060T / 072F / 072T) MG2R Series Gas Furnace 95% AFUE - Replacement Parts List (D315317A, 09/25), p.2",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg1e-channel-board-swap",
  "unit": "^MG1E",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Changing an Emerson or UTEC board to the Channel board - MG1E",
  "summary": "The MG1E kit replaces an Emerson board (printed as 1041648 on p.1 of the instructions and as 1048648 in step 8) or UTEC board 1021575 with Channel board 1046397. Most of the old harnesses come out, and the furnace may need a flame sensor added.",
  "steps": [
   "Old harnesses that are NOT reused: the blower harness (6-pin plugs in the blower compartment and at the blower deck), the inducer and igniter harnesses (cut the ends to remove) and the 12-pin (Emerson) or 9-pin (UTEC) board plug with its wires.",
   "Kept: the transformer wires, the thermostat wires, incoming L1 and N, the ground wire and any HUM or EAC accessory wires.",
   "The new board uses the same standoff holes. The 6-pin blower plug only goes on one way - green wire in the T1 position.",
   "Units that had the Emerson board need the 20 in. red and gray transformer wires from the kit. Wire everything to diagram 1051399 from the kit and put that diagram on the furnace in place of the old one.",
   "Board 1046397 has flame sense and needs a flame sensor. Some MG1E units had none from the factory: gas off, pull the burner assembly, fit the kit bracket and sensor, connect the 6 in. red 150 C wire, and join it to the #7 pin wire.",
   "The Y/Y2 terminal on the board must be connected to the thermostat for proper cooling mode operation.",
   "Start-up: review the blower configuration, cycle HEAT, COOL and FAN, and check the air temperature rise."
  ],
  "safety": "Shut off all electrical power to the unit before any maintenance or service. Label all wires before disconnecting them - wiring errors can cause improper and dangerous operation. Verify proper operation after servicing.",
  "manual": "nordyne-mg1e-channel-board-kit-install-10514360",
  "pages": [
   1,
   2,
   3,
   5
  ],
  "source": "MG1E - Channel board replacement control kit MG1E Channel Board Replacement Control Kit - Installation Instructions (10514360, 08/25), p.1, p.2, p.3, p.5",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg1e-channel-blower-speeds",
  "unit": "^MG1E",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Blower does not run or wrong speed after a board change - Channel board speed settings - MG1E",
  "summary": "The Channel board sets heat and cool speed with speed-select switches and fan speed with a jumper. On an MG1E converted with the kit, two of the five positions have no wire (kit instructions 10514360 Table 1); this is not confirmed for a furnace built with the Channel board.",
  "steps": [
   "Five settings exist: L, ML, M, MH, H. HEAT and COOL: move the speed select slide switch up or down. FAN: move the jumper so its centre lines up with the speed wanted - covering the last 2 pins (H and MH) gives HIGH.",
   "MG1E after the kit (10514360 Table 1): T1 L, T3 M and T5 H are Available. T2 ML and T4 MH are Do Not Use - no wire is connected, and if one is selected the blower motor will not operate.",
   "The speed selector switches can be changed while the unit is operating.",
   "Heating blower off delay jumper: 60, 90, 120 or 180 seconds, factory 120 (jumper on the 3rd and 4th pins from the bottom); the first 2 pins give 60 seconds.",
   "For the right speed, the instructions say to refer to the document provided with the unit; then check the air temperature rise."
  ],
  "safety": "Shut off all electrical power to the unit before any maintenance or service. Label all wires before disconnecting them - wiring errors can cause improper and dangerous operation. Verify proper operation after servicing.",
  "manual": "nordyne-mg1e-channel-board-kit-install-10514360",
  "pages": [
   2,
   3
  ],
  "source": "MG1E - Channel board replacement control kit MG1E Channel Board Replacement Control Kit - Installation Instructions (10514360, 08/25), p.2, p.3",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg2r-cmf95-channel-board-swap",
  "unit": "^(?:MG2R|CMF95)",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Changing an Emerson or UTEC board to the Channel board - MG2R / CMF95",
  "summary": "The Channel board kit replaces the Emerson board or UTEC board 1021573 with board 1046397. MG2R and CMF95 have their own wiring diagram and harness set in the kit.",
  "steps": [
   "The kit carries two wiring diagrams: 1049933 is for *G7S(A,K,C,D), MGC2 and MG3P; 1051377 is for CMF95 and MG2R. Use 1051377 and the Figure 5 harnesses.",
   "Old harnesses that are NOT reused: the blower harness (9-pin plugs), the inducer and igniter harnesses, the 12-pin (Emerson) or 9-pin (UTEC) board plug and the 4-pin transformer harness.",
   "Kept: thermostat wires, incoming L1 and N, ground, and any HUM or EAC wires.",
   "Same standoff holes. The 6-pin blower motor plug goes on one way - red wire in the T1 position. On MG2R and CMF95 the 9-pin blower-deck plug does NOT have wires in #7 and #8.",
   "The igniter and inducer plugs are not interchangeable and only attach one way - match pin and socket. Then the 9-pin plug harness and the 4-pin transformer plug.",
   "The Y/Y2 terminal on the board must be connected to the thermostat for proper cooling mode operation.",
   "Restore power, review the blower configuration, cycle HEAT, COOL and FAN, and check the air temperature rise."
  ],
  "safety": "Shut off all electrical power to the unit before any maintenance or service. Label all wires before disconnecting them - wiring errors can cause improper and dangerous operation. Verify proper operation after servicing.",
  "manual": "nordyne-channel-board-kit-install-10501530",
  "pages": [
   1,
   4,
   5,
   6
  ],
  "source": "MG2R / CMF95 / MG3P / MGC2 / *G7S(A,K,C,D) - Channel board replacement control kit Channel Board Replacement Control Kit - Installation Instructions (10501530, 08/25), p.1, p.4, p.5, p.6",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-mg2r-cmf95-channel-blower-speeds",
  "unit": "^(?:MG2R|CMF95)",
  "brand": "Nortek",
  "equipment": "Gas Furnace",
  "title": "Blower does not run or wrong speed after a board change - Channel board speed settings - MG2R / CMF95",
  "summary": "The Channel board can select five speeds. On an MG2R or CMF95 converted with the kit only four wires reach the blower (kit instructions 10501530 Table 2). The CMF95's own manual says the unit ships with four speeds pre-wired and the fifth needs wires changed at the motor connection (10501460 p.24).",
  "steps": [
   "HEAT and COOL: move the selector slide switch up or down to L, ML, M, MH or H. FAN: move the jumper - covering the last 2 pins (H and MH) gives HIGH.",
   "MG2R and CMF95 after the kit (10501530 Table 2): T1 L, T2 ML, T4 MH and T5 H are Available. T3 M (Medium) is Do Not Use - no wire is connected, and if it is selected the blower motor will not operate.",
   "The speed selector switches can be changed while the unit is operating.",
   "Heating blower off delay jumper: 60, 90, 120 or 180 seconds, factory 120; moving the jumper to the first 2 pins gives 60 seconds.",
   "For the right speed, the instructions say to refer to the blower document provided with the unit; then check the air temperature rise."
  ],
  "safety": "Shut off all electrical power to the unit before any maintenance or service. Label all wires before disconnecting them - wiring errors can cause improper and dangerous operation. Verify proper operation after servicing.",
  "manual": "nordyne-channel-board-kit-install-10501530",
  "pages": [
   4
  ],
  "source": "MG2R / CMF95 / MG3P / MGC2 / *G7S(A,K,C,D) - Channel board replacement control kit Channel Board Replacement Control Kit - Installation Instructions (10501530, 08/25), p.4",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4bf5m-defrost-board-display",
  "unit": "^[A-Z]?SH4BF5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the defrost board display and stored faults - SH4BF5M",
  "summary": "The R-454B heat pump manual and wiring diagrams show no CoreSense module. The defrost control board shows the status and keeps the last ten faults.",
  "steps": [
   "Check for 18-30 VAC between R and C on the board first - it needs that to operate.",
   "Status: C1 / C2 = cooling 1st / 2nd stage, H1 / H2 = heating 1st / 2nd stage, SC = anti short cycle timer, DF = defrost, _. = power on with no call.",
   "Faults: 01 low pressure switch, 02 high pressure switch, 03 ambient temperature sensor, 04 coil temperature sensor, 05 board.",
   "A code that stays on = the fault is still active. A flashing code = corrected, kept in memory. Faults list newest first, ten at most, and stay seven days after the last one is corrected.",
   "To clear the memory, short the test terminal momentarily with no call for heating or cooling.",
   "Waiting on SC: short the test terminals for less than 1 second during a call to bypass the anti-short-cycle timer."
  ],
  "safety": "Disconnect all electrical power before any maintenance or service; the unit may have more than one electrical supply.",
  "manual": "nordyne-sh4bf5m-install-1050098b",
  "pages": [
   8,
   9
  ],
  "source": "*SH4BF5M 15.2 SEER2 two-stage R-454B heat pump (2SX24K-2SX60K) *SH4BF5M2SX Split System Heat Pump, Single Phase Two-Stage Models - Installation Instructions (1050098B, 07/26, replaces 1050098A), p.8, p.9",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4bf5m-forced-defrost",
  "unit": "^[A-Z]?SH4BF5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Forcing a defrost with the test pins - SH4BF5M",
  "summary": "The test terminals on the defrost board start a defrost on demand.",
  "steps": [
   "With a call for heating or cooling present, short the test terminals for more than three seconds: forced defrost starts.",
   "Remove the short and the defrost ends when its normal conditions are met.",
   "Keep the short on and the defrost can be held for up to 11 minutes.",
   "Held for over 11 minutes the unit stops; Table 2 lists the code as OF (flashing), Input Error, while the text says a flashing 'dF'.",
   "Before blaming the board, the manual's pre-install check applies: the coil defrost sensor must be properly located or the defrost function will not work properly."
  ],
  "safety": "Disconnect all electrical power before any maintenance or service; the unit may have more than one electrical supply.",
  "manual": "nordyne-sh4bf5m-install-1050098b",
  "pages": [
   4,
   8,
   9
  ],
  "source": "*SH4BF5M 15.2 SEER2 two-stage R-454B heat pump (2SX24K-2SX60K) *SH4BF5M2SX Split System Heat Pump, Single Phase Two-Stage Models - Installation Instructions (1050098B, 07/26, replaces 1050098A), p.4, p.8, p.9",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4bf5m-pressure-switch-codes",
  "unit": "^[A-Z]?SH4BF5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Code 01 or 02 - what the pressure switches do - SH4BF5M",
  "summary": "The manual prints the switch settings and the delays, which tells you what the board is waiting for.",
  "steps": [
   "02, high pressure switch: the switch is on the discharge line after the compressor. It opens at 650 psig and drops the contactor coil; it closes again when liquid pressure falls to 460 psig.",
   "After the high-pressure switch closes the unit restarts after a 5 minute short cycle delay.",
   "01, low pressure switch: fitted on certain models, inside the unit on the suction line. It opens if suction falls below 20 psig and closes again above 35 psig.",
   "After the low-pressure switch opens and closes there is a 3 minute short cycling delay before the outdoor unit energizes. The manual says the switch is there to protect the compressor from a loss of charge.",
   "Operating range to keep in mind: cooling 60 to 115 °F and heating -10 to 70 °F outdoor. Heating above 70 °F may need a Heat Pump Mild Weather Control Kit or a change to emergency or auxiliary heat."
  ],
  "safety": "R-454B is mildly flammable. If the outdoor unit must be pressure tested never exceed 450 psig.",
  "manual": "nordyne-sh4bf5m-install-1050098b",
  "pages": [
   8,
   10
  ],
  "source": "*SH4BF5M 15.2 SEER2 two-stage R-454B heat pump (2SX24K-2SX60K) *SH4BF5M2SX Split System Heat Pump, Single Phase Two-Stage Models - Installation Instructions (1050098B, 07/26, replaces 1050098A), p.8, p.10",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4me5m-defrost-board-display",
  "unit": "^[A-Z]?SH4ME5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the defrost board display, test pins and pressure switches - SH4ME5M (manufactured housing)",
  "summary": "The manufactured-housing heat pump uses the same 2-character defrost board display.",
  "steps": [
   "Check for 18-30 VAC between R and C on the board.",
   "Status: C1 / C2 cooling, H1 / H2 heating, SC anti short cycle timer, DF defrost, _. power on with no call. Faults: 01 low pressure switch, 02 high pressure switch, 03 ambient sensor, 04 coil sensor, 05 board.",
   "Steady code = active fault; flashing = corrected but stored. Ten faults at most, newest first, kept seven days. Clear by shorting the test terminal momentarily with no call.",
   "Test terminals with a call present: under 1 second bypasses the anti-short-cycle timer; over three seconds forces a defrost, which can be held up to 11 minutes.",
   "High-pressure switch: opens 650 psig, closes 460 psig, 5 minute delay. Low-pressure switch (certain models): opens below 20 psig, closes above 35 psig, 3 minute delay."
  ],
  "safety": "Disconnect all electrical power before any maintenance or service; the unit may have more than one electrical supply.",
  "manual": "nordyne-sh4me5m-install-1050038a",
  "pages": [
   9,
   11
  ],
  "source": "*SH4ME5M 14.3 SEER2 R-454B heat pump for manufactured housing (1SP24K-1SP48K) *SH4ME5M Split System Heat Pump for Manufactured Housing - Installation Instructions (1050038A, 09/25, replaces 10500380), p.9, p.11",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4me5m-outdoor-restrictor",
  "unit": "^[A-Z]?SH4ME5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Changing the outdoor restrictor for the indoor coil match - SH4ME5M",
  "summary": "The outdoor orifice is sized for the most popular indoor match; some coils need a different one. The QRD says which.",
  "steps": [
   "Check the Quick Reference Data sheet supplied with the outdoor unit for the match.",
   "If the unit has the liquid valve shown in the manual's Figure 3, the restrictor is inside the swivel nut connection of the liquid valve, not in the distributor.",
   "Use two wrenches: loosen the nut and liquid valve, turning the assembly nut counter-clockwise until the orifice body halves separate.",
   "Lift the restrictor out with a light-gauge wire hook without scratching either part.",
   "Check the new orifice by the size stamped on its side - do not use pin gauges.",
   "Insert it with the rounded end facing into the valve, hand tighten, mark a line across both bodies and tighten a further 1/4 turn with two wrenches."
  ],
  "safety": "CAUTION from the manual: to prevent damage to the unit or internal components use two wrenches when loosening or tightening nuts, and do not over tighten.",
  "manual": "nordyne-sh4me5m-install-1050038a",
  "pages": [
   6
  ],
  "source": "*SH4ME5M 14.3 SEER2 R-454B heat pump for manufactured housing (1SP24K-1SP48K) *SH4ME5M Split System Heat Pump for Manufactured Housing - Installation Instructions (1050038A, 09/25, replaces 10500380), p.6",
  "confidence": "manual"
 },
 {
  "id": "u-nortek-sh4be5m-charging",
  "unit": "^[A-Z]?SH4BE5M",
  "brand": "Nortek",
  "equipment": "Condenser/Heat Pump",
  "title": "Charging by outdoor temperature - SH4BE5M",
  "summary": "The manual gives three procedures by outdoor temperature. The QRD charge is a starting point; the table inside the electrical box cover is the target.",
  "steps": [
   "Always first: weigh in the QRD charge addition for the indoor match, plus the allowance for the real lineset length.",
   "65 °F or higher: in cooling, adjust to the superheat (fixed orifice) or subcooling (TXV) target on the table inside the electrical box cover, within 1 degree F.",
   "35 to 65 °F: block off the outdoor fan discharge, one half of the unit covered corner to corner, then adjust in cooling using chargecalculator.com or the low ambient tables on the cover panel.",
   "Below 35 °F: weigh in only, and come back at 35 °F or higher to finish.",
   "Fixed orifice: superheat below target = remove refrigerant, above = add. TXV: subcooling below target = add, above = remove.",
   "Record the final system charge on the outdoor unit's rating plate."
  ],
  "safety": "R-454B is mildly flammable: keep hoses short, do not overfill, earth the system before charging, and leak test again before leaving. Never exceed 450 psig on the outdoor unit.",
  "manual": "nordyne-sh4be5m-install-1050012a",
  "pages": [
   10,
   11,
   12
  ],
  "source": "*SH4BE5M 14.3 SEER2 R-454B heat pump (1SP18K-1SP48K, 2SX60K) *SH4BE5M Split System Heat Pump - Installation Instructions (1050012A, 09/25, replaces 10500120), p.10, p.11, p.12",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-read-code",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Operation lamp blinking - reading the error code with the remote - Daikin OTERRA BVJU9",
  "summary": "The indoor operation lamp blinks on a protection trip, a thermistor fault or a transmission error. The code is read on the wireless remote; there are two methods.",
  "steps": [
   "The green operation lamp blinks when a protection device of the indoor or outdoor unit is activated, when a thermistor malfunctions, or on a signal transmission error between the indoor and outdoor units.",
   "Method 1 (ARC480A83 / A84): hold the TIMER CANCEL button down for 5 seconds - 00 shows on the temperature display. Press TIMER CANCEL repeatedly until a long beep sounds: that is the code. A short beep or two consecutive beeps mean the code shown does not correspond.",
   "To go back to normal mode hold TIMER CANCEL for 5 seconds, or leave the remote untouched for 60 seconds.",
   "Not all the error codes are displayed with method 1. When you cannot find the code, use method 2.",
   "Method 2: press the centre of the TEMP button and the OFF button at the same time - SC shows. Select SC (service check) with TEMP up or down and press FAN: 00 shows with the left-side number blinking.",
   "Change the number with TEMP up / down. Beep = left number wrong; two consecutive beeps = left number right, right number wrong; long beep = both right.",
   "Press FAN - the right-side number blinks. Change it with TEMP up / down until the long beep. The numbers shown at the long beep are the error code.",
   "Press FAN for 5 seconds to leave the service check mode.",
   "With the wired BRC073A6 controller: the error message or icon and the operation lamp blink; press the Menu/Enter button to show the error code.",
   "At the outdoor unit: one green LED A on the PCB blinks when the microcomputer is working. It is off while the standby electricity saving function is active and when the power is off."
  ],
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   79,
   80,
   81,
   82,
   84
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.79, p.80, p.81, p.82, p.84",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-u4",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "U4 - indoor and outdoor units not talking - Daikin OTERRA BVJU9",
  "summary": "U4 means the indoor unit cannot read the data from the outdoor unit. The manual's check runs power, wiring, the voltage on terminal 3, then LED A at the outdoor board.",
  "steps": [
   "Check the power supply voltage: the fluctuation must be within ±10% of the rated value. If not, correct the power supply.",
   "Check the indoor - outdoor connection wires for a wiring error (terminal numbers 1, 2, 3 must match) and correct it.",
   "Check the voltage of the connection wires on the indoor terminal board between No. 1 and No. 3, and between No. 2 and No. 3. If the wires are not properly insulated, replace the connection wires between the indoor unit and outdoor unit.",
   "Before checking LED A on the outdoor PCB, cancel the standby electricity saving function by starting fan operation with the remote controller, and wait at least 7 seconds after turning on the power.",
   "LED A continuously ON or OFF: replace the outdoor unit PCB (main PCB).",
   "LED A blinking: rotate the outdoor fan by hand. If it does not rotate smoothly, replace the outdoor fan motor and the outdoor unit PCB (main PCB).",
   "If the fan rotates smoothly: check the power supply waveform (Check No. 11). If it is disturbed, locate the cause of the disturbance and correct it. If it is not, replace the indoor unit PCB (control PCB).",
   "The outdoor installation manuals add: any splices in the wiring between the units can cause communication errors."
  ],
  "safety": "Be sure to turn off the power switch before connecting or disconnecting connectors, or parts may be damaged.",
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   94,
   95,
   127
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.94, p.95, p.127",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-low-ambient",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Cooling a server or equipment room in cold weather - the facility setting - Daikin OTERRA BVJU9",
  "summary": "Out of the box these units cool down to 50°F outdoor. A jumper on the outdoor PCB extends that - but only for equipment rooms.",
  "steps": [
   "The manual limits this function to facilities where the target of air conditioning is equipment such as computers. Never use it in a residence or office.",
   "RXF09 / RKF09: remove the top plate (4 screws) and the front plate (5 screws) of the outdoor unit, then cut jumper J6 on the PCB.",
   "RXF12 / RKF12: same covers, but cut jumper J7.",
   "RXF18 / 24 and RKF18 / 24: remove the top plate (6 screws), the front plate (10 screws) and the anti-drip cover, then cut jumper J7.",
   "With the jumper cut the operation range goes down to 14°F (-10°C). Installing an air direction adjustment grille (sold separately) extends it further to -4°F (-20°C).",
   "In these cases the unit stops if the outdoor temperature falls below -4°F (-20°C) and restarts once the temperature rises above this level.",
   "If the heat exchanger is exposed to direct wind, provide a windbreak wall.",
   "Tell the user: the facility setting puts the indoor fan on the highest tap, the indoor unit may make intermittent noises as the outdoor fan turns on and off, and no humidifier should be used in the room.",
   "Replace the PCB if you cut a jumper unintentionally."
  ],
  "safety": "Make sure to turn the power OFF before performing work.",
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   147,
   148
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.147, p.148",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-pump-down",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Pump-down and forced cooling - Daikin OTERRA BVJU9",
  "summary": "Pump-down uses forced cooling started from the indoor unit's ON/OFF switch.",
  "steps": [
   "Forced cooling is allowed only when the outdoor unit is not abnormal, not in the 3-minute standby mode, and not operating.",
   "Start: press the indoor unit ON/OFF switch for at least 5 seconds. Forced cooling stops automatically after about 15 minutes; to stop it sooner press the ON/OFF switch.",
   "Pump-down: remove the valve caps from the liquid stop valve and the gas stop valve.",
   "Carry out forced cooling operation.",
   "After 5 to 10 minutes, close the liquid stop valve with a hexagonal wrench.",
   "After 2 to 3 minutes, close the gas stop valve and stop the forced cooling operation.",
   "Attach the valve caps once procedures are complete.",
   "F8 (system shutdown due to temperature abnormality in the compressor) is set when the discharge pipe thermistor exceeds 261.5°F (127.5°C) during forced cooling operation; the manual lists air intrusion as a cause."
  ],
  "safety": "During pump down, stop the compressor before removing the refrigerant piping. If the compressor is still operating and the stop valve is open, air will be sucked in when the piping is removed, causing abnormal pressure in the refrigeration cycle (installation manual 3P740832-4K p.3). Do not open or close the stop valves when the outdoor temperature is -5°F (-21°C) or less.",
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   139,
   140,
   110
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.139, p.140, p.110",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-trial-operation",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Trial operation - testing COOL in winter or HEAT in summer - Daikin OTERRA BVJU9",
  "summary": "A trial operation mode on the wireless remote runs the unit regardless of room temperature for about 30 minutes.",
  "steps": [
   "Measure the supply voltage and make sure it is within the specified range.",
   "Normal test: in cooling select the lowest programmable temperature; in heating select the highest.",
   "To test COOL in winter or HEAT in summer use the trial operation mode: press the centre of the TEMP button and the OFF button on the remote controller at the same time.",
   "Select T (trial operation) with the TEMP up or down button.",
   "Press the FAN button to enter the trial operation mode.",
   "FTXF: press COOL or HEAT to start. FTKF: press COOL.",
   "Trial operation ends in about 30 minutes and switches into normal mode. To quit, press the OFF button.",
   "For protection, the system disables restart for 3 minutes after it has been turned off.",
   "When done, set the temperature to a normal level: 78 ~ 82°F in cooling, 68 ~ 75°F in heating."
  ],
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   141,
   142
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.141, p.142",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-two-units-one-room",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Two indoor units in one room - one remote runs both - Daikin OTERRA BVJU9",
  "summary": "Give one of the two units a different address so each wireless remote controls only its own unit.",
  "steps": [
   "Remove the battery cover of the remote controller and cut the address jumper (jumper present = address 1, cut = address 2).",
   "Press the centre of the TEMP button and the OFF button on the remote controller at the same time.",
   "Press TEMP up or down to select A (address setting).",
   "Press the FAN button to enter the address setting mode. The indoor unit OPERATION lamp blinks for about 1 minute.",
   "Press the indoor unit ON/OFF switch while the OPERATION lamp is blinking.",
   "Press the FAN button on the remote controller for 5 seconds to return to the previous display.",
   "If the setting was not completed while the lamp was blinking, start again from the beginning.",
   "Replace the remote controller if you cut a jumper unintentionally."
  ],
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   143
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.143",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-remote-field-settings",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "Fan keeps running with the thermostat off, no restart after a power cut, room reads warm or cool - remote field settings - Daikin OTERRA BVJU9",
  "summary": "The wireless remote's field settings mode holds the settings techs get asked about. After an indoor PCB change they all go back to factory.",
  "steps": [
   "Enter the service mode by pressing the centre of the TEMP button together with OFF, then pick the field settings mode; listen for the beep each time a button is pressed.",
   "Item 3, Suspend (standby electricity saving): 0 = power stays on the outdoor PCB after the unit stops; 1 = three minutes after the unit stops the power to the outdoor PCB is shut off (only on certain models).",
   "Item 4, Dry keep: 0 = the indoor fan keeps running when the thermostat is OFF; 1 = the fan stops when the thermostat is OFF, to prevent an increase of room humidity.",
   "Item 5, Preheating control: 0 = compressor preheating off; 1 = on.",
   "Item 6, Room temperature adjustment (cooling) and item 7 (heating, FTXF only): 0 = Low 2 (-2°C), 1 = Low 1 (-1°C), 2 = Standard, 3 = High 1 (+1°C), 4 = High 2 (+2°C).",
   "Item 10, Auto-restart: 0 = the unit stays stopped when power resumes; 1 = it resumes the operation it had before the power was shut down.",
   "Item 12, Warmer airflow setting (FTXF only): 0 = OFF, 1 = ON. It can also be enabled by cutting jumper J5 on the outdoor PCB; either one enables it.",
   "After replacing the indoor unit PCB all the values return to the factory settings - set them again with the remote. Replacing only the remote does not change the values stored in the PCB.",
   "The factory value of each item is printed in the manual's table - read it there before changing anything."
  ],
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   150,
   151,
   148
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.150, p.151, p.148",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-oterra-b-pcb-grease",
  "unit": "^(FT[XK]F|R[XK]F)(09|12|18|24)BVJU",
  "brand": "Daikin",
  "equipment": "Mini-Split",
  "title": "After an outdoor PCB change - L4, H7 or LA fin temperature codes - Daikin OTERRA BVJU9",
  "summary": "The manual lists badly applied silicone grease after a PCB replacement as a cause of the fin temperature codes.",
  "steps": [
   "L4 (radiation fin temperature rise), and on RXF18/24BVJU9 H7 (fan IPM temperature error) and LA (IGBT temperature error), all list: silicone grease not applied properly on the radiation fin after replacing the outdoor unit PCB.",
   "The chart for each of these codes starts with a power off / on restart. If the error is displayed again, it asks: has the PCB been replaced? If yes, check that silicone grease is applied properly on the radiation fin; if not, apply it.",
   "When replacing an outdoor unit PCB: wipe off the old silicone grease completely.",
   "Apply the specified silicone grease evenly to the heat generation part of the power transistor / diode bridge.",
   "Tighten the screws of the power transistor / diode bridge and make sure the heat generation parts are firmly contacted to the radiation fin.",
   "The manual warns that smoke emission may be caused by bad heat radiation when the silicone grease is not appropriately applied.",
   "If grease is not the cause, the charts go on to the outdoor fan check, a dirty radiation fin and the installation condition."
  ],
  "safety": "Be sure to turn off the power switch before connecting or disconnecting connectors, or parts may be damaged.",
  "manual": "daikin-ftkf-b-ftxf-b-service",
  "pages": [
   116,
   121,
   124,
   152
  ],
  "source": "FTKF-B / FTXF-B + RKF / RXF BVJU9 Service Manual, Inverter Pair Wall Mounted Type FTKF-B, FTXF-B Series (SiUS042425E), p.116, p.121, p.124, p.152",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvt96-a2l-fan-only",
  "unit": "^[GA][RD]VT96",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat, blower runs by itself, EAF or EA0 on the display - GRVT96 / ARVT96",
  "summary": "The board watches an R-32 leak sensor. With no sensor (coil is not R-32) or a leak signal it stops gas heat and runs the fan.",
  "steps": [
   "Read the display: EAF = lost communication with the R-32 sensor, EA0 = leak detected, EA1 = sensor fault, EA2 = A2L relay in the board.",
   "Coil is NOT R-32: the R-32 function is ON by default and must be turned off. Press left or right until A2E shows, press center, choose no, press center to confirm.",
   "Coil IS R-32 and EAF shows: check the sensor wire connection at the board is not loose and the wire is not damaged; the green LED by the connector blinks when the sensor is communicating and is off with no signal. Replace the R-32 sensor if necessary.",
   "EA0: investigate the indoor coil for a refrigerant leak. In mitigation the furnace shuts down gas, energizes the optional ventilation and alarm outputs and runs the fan at maximum CFM.",
   "After the sensor stops detecting a leak the fan keeps running 5 minutes, then the furnace goes back to the thermostat call.",
   "EA2: disconnect any wire on the ALARM terminal and cycle power. If the code clears the fault is in that wiring; if not, replace the integrated control board.",
   "To prove the function after a repair: menu A2u, select YES (5-minute test)."
  ],
  "safety": "EA0: the R-32 sensor has detected a refrigerant leak - investigate the indoor coil for a refrigerant leak (IOG-2044B p.52).",
  "manual": "goodman-amana-rvt96-dvt96-install-iog-2044b",
  "pages": [
   27,
   28,
   52
  ],
  "source": "GRVT96 / GDVT96 / ARVT96 / ADVT96 Installation Instructions for *DVT96* & *RVT96* Two-Stage Gas Furnace (IOG-2044B, 10/2026), p.27, p.28, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-daikin-dr96tc-a2l-fan-only",
  "unit": "^D[RD]96TC",
  "brand": "Daikin",
  "equipment": "Gas Furnace",
  "title": "No heat, blower runs by itself, R-32 code on the display - DR96TC / DD96TC",
  "summary": "The board watches an R-32 leak sensor. With no sensor (coil is not R-32) or a leak signal it stops gas heat and runs the fan.",
  "steps": [
   "Coil is NOT R-32: the R-32 function is ON by default and must be turned off. Press left or right until A2E shows, press center, choose no, press center to confirm.",
   "On a leak signal the furnace shows the A2L refrigerant leakage code (EA0), shuts down gas, energizes the optional ventilation and alarm outputs and runs the fan at maximum CFM.",
   "After the sensor stops detecting a leak the fan keeps running 5 minutes, then the furnace goes back to the thermostat call.",
   "To prove the function: menu A2u, select YES (5-minute test).",
   "The R-32 code rows (EAF, EA0, EA1, EA2) are on p.53 of this installation manual, where the codes are drawn as display graphics. The service manual RSD6612305r1 p.43 prints the newer EA2 action: disconnect any wire on the ALARM terminal, cycle power, and replace the integrated control board if the code does not clear."
  ],
  "safety": "EA0: the R-32 sensor has detected a refrigerant leak - investigate the indoor coil for a refrigerant leak (IOD-2044A p.53; RSD6612305r1 p.43).",
  "manual": "daikin-dr96tc-dd96tc-install-iod-2044a",
  "pages": [
   27,
   28,
   53
  ],
  "source": "DR96TC / DD96TC Installation Instructions for DR96TC* & DD96TC* Two-Stage Gas Furnace (IOD-2044A, 02/2025), p.27, p.28, p.53",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvt80-a2l-fan-only",
  "unit": "^[GA][RD]VT80",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat, blower runs by itself, EAF or EA0 on the display - GRVT80 / ARVT80",
  "summary": "The 80% furnace has the same R-32 leak function as the 96% one.",
  "steps": [
   "Coil is NOT R-32: turn the function off. Press left or right until A2E shows, press center, choose no, press center to confirm.",
   "EAF: check the R-32 sensor wire connection and the wire; replace the sensor if necessary.",
   "EA0: investigate the indoor coil for a refrigerant leak. The furnace shuts down gas, energizes the optional ventilation and alarm outputs and runs the fan at maximum CFM.",
   "After the sensor stops detecting a leak the fan keeps running 5 minutes.",
   "EA2: disconnect any wire on the ALARM terminal and cycle power. If the code clears, repair that wiring; if not, replace the integrated control board."
  ],
  "safety": "EA0 means the sensor reads R-32 at the coil - find the leak before putting the system back in service.",
  "manual": "goodman-amana-rvt80-dvt80-install-iog-2043b",
  "pages": [
   26,
   27,
   37
  ],
  "source": "GRVT80 / GDVT80 / ARVT80 / ADVT80 Installation Instructions for *RVT80* & *DVT80* Gas Furnace Category I (IOG-2043B, 10/2026), p.26, p.27, p.37",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvm97-a2l-off",
  "unit": "^[GA][RD]VM97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Modulating furnace will not heat with a non-R-32 coil (EAF) - GRVM97 / ARVM97",
  "summary": "The R-32 function is ON from the factory; with no R-32 sensor the furnace will not run properly.",
  "steps": [
   "If the cooling unit paired with the furnace does not use R-32, the R-32 functions must be turned off.",
   "Press left or right until the display shows A2E. Press center; the display shows the selected option (yes or no).",
   "Press left or right to pick no, press center to confirm. With the function disabled the control ignores all A2L functions.",
   "R-32 coil and EAF: verify the wire connection to the R-32 sensor is not loose and the wire is not damaged; replace the sensor if necessary.",
   "EA0: investigate the indoor coil for a refrigerant leak; normal operation resumes once no leak is detected and the 5 minute delay is over."
  ],
  "manual": "goodman-amana-rvm97-dvm97-install-iog-2045a",
  "pages": [
   24,
   52
  ],
  "source": "GRVM97 / GDVM97 / ARVM97 / ADVM97 Installation Instructions for *DVM97* & *RVM97* Modulating Gas Furnace (IOG-2045A, 08/2026), p.24, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvt96-gas-pressure",
  "unit": "^[GA][RD]VT96",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Checking and setting gas pressure - GRVT96 / ARVT96 (White-Rodgers 36J54)",
  "summary": "Inlet and manifold figures and where to connect on the two-stage valve.",
  "steps": [
   "Inlet: natural 4.5 to 10.0\" w.c., LP 11.0 to 13.0\" w.c., measured with the burners firing and the other gas appliances on the line running.",
   "Inlet tap on the 36J54 needs the 36G/J Valve Pressure Check Kit, part 0151K00000S; or use a fitting in the drip leg.",
   "Manifold: turn off gas and all electrical power, back the outlet pressure test screw out one turn (not more), attach the hose and manometer, turn the gas on.",
   "Natural gas: high 3.2 - 3.8\" (nominal 3.5\"), low 1.6 - 2.2\" (nominal 1.9\"). LP: high 9.7 - 10.3\" (nominal 10.0\"), low 5.7 - 6.3\" (nominal 6.0\").",
   "Use the high-fire test (CoolCloud app or the gas pressure test menu) to hold 100% firing rate while you read high stage.",
   "Final manifold pressure cannot vary by more than ± 0.3\" w.c. for natural and ± 0.5\" for LP from the specified setting.",
   "Only small changes are made at the valve regulator. If the input is still off, consult the gas supplier.",
   "When finished: turn OFF gas to the furnace at the manual shutoff valve and disconnect the manometer; reinstall the plug before turning the gas back on (IOG-2044B p.42). Turn on gas to the furnace and check for leaks (RS6612305r1 p.33). Neither manual prints a closing step for the outlet pressure test screw."
  ],
  "safety": "The gas manifold pressure must be as specified on the rating plate. Never exceed the rated input. Check for leaks with chloride-free soap solution or a gas detector.",
  "manual": "goodman-amana-rvt96-dvt96-install-iog-2044b",
  "pages": [
   41,
   42,
   43
  ],
  "source": "GRVT96 / GDVT96 / ARVT96 / ADVT96 Installation Instructions for *DVT96* & *RVT96* Two-Stage Gas Furnace (IOG-2044B, 10/2026), p.41, p.42, p.43",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvt96-heat-sequence",
  "unit": "^[GA][RD]VT96",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "No heat - walking the heat sequence - GRVT96 / ARVT96",
  "summary": "What the control does on a W call and where each step shows up as a code.",
  "steps": [
   "After power is applied the furnace sits in a three-minute power-up delay; thermostat calls are not recognized. IdL shows while it waits for a call.",
   "W closes: the control checks the safety circuits, then runs the inducer on HIGH for a 15-second prepurge.",
   "Inducer steps to LOW; the low-stage pressure switch must be closed (EE2 if it stays open, EE1 if it was already closed at the start).",
   "Igniter warm-up, then the gas valve opens and flame must be proven (EE0 after 3 tries; EE6 = weak flame signal).",
   "The control decides low or high stage by its own algorithm. The first heat call after a power cycle always runs high stage.",
   "Blower starts after the selected heat on delay and ramps up.",
   "End of call: gas valve closes, 15-second post purge, blower runs the heat off delay."
  ],
  "safety": "This furnace lights itself - do not try to light the burner by hand.",
  "manual": "goodman-amana-rvt96-dvt96-install-iog-2044b",
  "pages": [
   41,
   43,
   44,
   50
  ],
  "source": "GRVT96 / GDVT96 / ARVT96 / ADVT96 Installation Instructions for *DVT96* & *RVT96* Two-Stage Gas Furnace (IOG-2044B, 10/2026), p.41, p.43, p.44, p.50",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvm97-gas-pressure",
  "unit": "^[GA][RD]VM97",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Checking gas pressure on the modulating valve - GRVM97 / ARVM97 (White-Rodgers 36J27)",
  "summary": "The modulating furnace is checked at 100% firing rate; low fire is 50%.",
  "steps": [
   "Inlet: natural 4.5 to 10.0\" w.c., LP 11.0 to 13.0\" w.c.",
   "Outlet tap on the 36J27: remove the 1/8\" NPT plug with a 5/16\" Allen wrench and fit the proper adapter for the manometer.",
   "Run the high-fire test (CoolCloud app or the gas pressure test menu) so the valve holds 100% firing rate.",
   "Natural gas: 3.5\" w.c. at 100%, .9\" w.c. at 50%, range .6 - 3.8\". LP: 10.0\" at 100%, 2.5\" at 50%, range 2.2 - 10.3\".",
   "The LP / altitude table in the same manual lists natural low stage (50%) as 1\" w.c. - both figures are printed.",
   "Final manifold pressure cannot vary by more than ± 0.3\" w.c. for natural and ± 0.5\" for LP from the specified setting.",
   "LP conversion: kit LPM-35 with 1.25 mm orifices; an LPLP04 low-pressure kit is strongly recommended."
  ],
  "safety": "The inlet gas supply pressure must be as specified on the unit rating plate with all other household gas fired appliances operating. Only small variations in gas pressure should be made by adjusting the gas valve pressure regulator. Reinstall the plug before turning on gas to the furnace.",
  "manual": "goodman-amana-rvm97-dvm97-install-iog-2045a",
  "pages": [
   25,
   41,
   42,
   43,
   47
  ],
  "source": "GRVM97 / GDVM97 / ARVM97 / ADVM97 Installation Instructions for *DVM97* & *RVM97* Modulating Gas Furnace (IOG-2045A, 08/2026), p.25, p.41, p.42, p.43, p.47",
  "confidence": "manual"
 },
 {
  "id": "u-gad-rvt96-vent-length",
  "unit": "^[GA][RD]VT96",
  "brand": "Goodman",
  "equipment": "Gas Furnace",
  "title": "Pressure switch trips on a long 2-inch vent - checking allowed vent length - GRVT96 / ARVT96",
  "summary": "Several sizes allow little or no 2-inch pipe. Check the run against the table before changing parts.",
  "steps": [
   "Add up the equivalent length. 2\" pipe: long-radius 90 = 5 ft, 45 = 2.5 ft. 3\" pipe: long-radius 90 = 7 ft, 45 = 3.5 ft.",
   "Sea level, upflow *RVT96: 0403 = 200 ft on 2\" or 3\"; 0603 = 150 ft on 2\", 200 on 3\"; 0803 = 65 ft on 2\", 200 on 3\"; 0804C = 165 ft on 2\", 200 on 3\".",
   "Upflow 1005C, 1005D and 1205D: 2\" pipe is NOT allowed. 3\" pipe: 200 ft (1005C), 150 ft (1005D), 200 ft (1205D).",
   "Sea level, downflow *DVT96: 0403 and 0603 = 200 ft on 2\" or 3\"; 0804C = only 25 ft on 2\", 200 on 3\"; 1005C and 1205D = 2\" not allowed, 200 ft on 3\".",
   "EE2 / EE9 (pressure switch circuit open): the chart says to inspect the flue and / or inlet air piping for blockage, proper length, elbows and termination, and to check the drain system and the pressure switch hose - compare the run with the lengths above before anything else (IOG-2044B p.50-51)."
  ],
  "manual": "goodman-amana-rvt96-dvt96-install-iog-2044b",
  "pages": [
   13,
   50,
   51
  ],
  "source": "GRVT96 / GDVT96 / ARVT96 / ADVT96 Installation Instructions for *DVT96* & *RVT96* Two-Stage Gas Furnace (IOG-2044B, 10/2026), p.13, p.50, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh97-condensate-switch",
  "unit": "^BGH97M(060|080|100|120)[BCD][345]A",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "Checking the condensate overflow pressure switch - BGH97",
  "summary": "The BGH97 came with two kinds of overflow switch; the test depends on which one is fitted.",
  "steps": [
   "Units produced before August 2026 have a normally closed condensate overflow pressure switch. Check it before each heating season (p.73).",
   "The resistance of that switch should be 0 ohms (p.73).",
   "With the hose on the black (positive) pressure port disconnected, the unit should trigger a protection shut off immediately and show a fault code on the main control board (p.73).",
   "If either of the two is not met, the condensate overflow pressure switch must be replaced (p.73).",
   "The safety-circuit section describes the overflow switch as normally open, closing during the pre-purge time; the hose from the switch goes to the lower tap on the condensate collector box (p.67).",
   "Factory hose routing is for upflow and horizontal right only; horizontal left needs the hoses rerouted. Connecting hoses incorrectly will result in failure to protect condensate overflow (p.67).",
   "Codes: E9 = condensate overflow pressure switch failed (contacts stuck or a short in the circuit); the wiring diagram lists E5 / E6 as rollout switch or condensate switch open / open lockout (p.70, p.75)."
  ],
  "safety": "Before servicing, disconnect all electrical power to furnace.",
  "manual": "bosch_bgh97_furnace_iom_en_07.2026",
  "pages": [
   67,
   70,
   73,
   75
  ],
  "source": "BGH97 97% furnace Bosch 97% AFUE Condensing Gas Furnace Installation and Operating Instructions (BTC 772103301 B, 07.2026), p.67, p.70, p.73, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh97-inducer-blower-codes",
  "unit": "^BGH97M(060|080|100|120)[BCD][345]A",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "Reading the IPM module codes (blower or inducer) - BGH97",
  "summary": "The IPM module drives both motors; a decimal point after the code tells which motor.",
  "steps": [
   "Error code 1X-6X is for the circulating blower motor; 1X.-6X. (with a point) is for the induced draft blower motor (p.75).",
   "1X motor over-current; 2X IPM over-temperature (IPM above 203°F / 95°C); 3X DC bus voltage fault - check if the power supply is wired incorrectly; 4X IPM fault (p.71).",
   "5X motor startup fault - check whether there is blockage inside the blower housing; 6X motor phase loss - check the motor wiring (p.71).",
   "90 = communication fault with the air pressure sensor: check that the model is selected correctly and the sensor wiring is secure and undamaged (p.71).",
   "EC = machine type not set: check the SW2 switches against the 97% MACHINE TYPE table on the wiring diagram (p.71, p.75).",
   "Status on the IPM display: FF both blowers running; F- inducer running, circulating blower idle; -F inducer idle, circulating blower running (p.75)."
  ],
  "safety": "High voltage: disconnect all power before servicing. Multiple power sources may be present.",
  "manual": "bosch_bgh97_furnace_iom_en_07.2026",
  "pages": [
   71,
   75
  ],
  "source": "BGH97 97% furnace Bosch 97% AFUE Condensing Gas Furnace Installation and Operating Instructions (BTC 772103301 B, 07.2026), p.71, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh97-manifold",
  "unit": "^BGH97M(060|080|100|120)[BCD][345]A",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "Setting manifold pressure - BGH97",
  "summary": "Low and high fire figures differ by size on the BGH97.",
  "steps": [
   "Turn OFF all electrical power. With a 3/32 in. hex wrench loosen the outlet pressure tap screw one turn - do not remove it. Attach hose and manometer (p.64).",
   "Power on, call for heat, and leak-check the hose connection with leak detection solution. SHUT OFF GAS AND FIX ALL LEAKS IMMEDIATELY (p.64).",
   "Natural gas low / high: 60B 1.6 / 3.5; 80B and 80C 1.6 / 3.6; 100C, 100D and 120D 1.7 / 3.6 in. WC (p.65).",
   "Propane low / high: 4.1 / 9.4 in. WC, except 120D 4.1 / 9.9 in. WC (p.65).",
   "Remove the regulator cover screw; clockwise raises pressure, counter clockwise lowers it. Final pressure within ± 0.3 in. WC (p.64-65).",
   "To restore the factory setting: fully tighten the plastic adjustment screw clockwise, then back it out counterclockwise 2-3 turns until the reading matches the table (p.65).",
   "Power off, remove the manometer, tighten the tap clockwise 7 in-lbs minimum, then re-check for leaks with the furnace firing (p.65).",
   "Larger changes in gas flow are made by changing the burner orifice, not the regulator (p.65)."
  ],
  "safety": "Never test for gas leaks with an open flame. Gas input must never be greater than the rating plate.",
  "manual": "bosch_bgh97_furnace_iom_en_07.2026",
  "pages": [
   64,
   65
  ],
  "source": "BGH97 97% furnace Bosch 97% AFUE Condensing Gas Furnace Installation and Operating Instructions (BTC 772103301 B, 07.2026), p.64, p.65",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh97-refrigerant-sensor",
  "unit": "^BGH97M(060|080|100|120)[BCD][345]A",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "b-codes with an R-454B coil on the furnace - BGH97",
  "summary": "The refrigerant sensor plugs into the furnace and reports on the IPM display.",
  "steps": [
   "With a Bosch BMAC R-454B cased coil, the sensor cable goes into the CN3 port and DIP switch SW1-2 must be ON (p.54).",
   "b3 hardware fault (damaged sensor): replace the refrigerant sensor and restart (p.54).",
   "b4 communication with the sensor failed for 30 seconds: check the plug, then replace the sensor (p.54).",
   "b7 active refrigerant leak: check the refrigerant circuit for punctures and repair; check for a natural gas / propane leak, ventilate and avoid open flames; replace the sensor if no leak is found (p.54).",
   "b8 sensor past its 15 year service life: replace it (p.54). b9 sensor connected but SW1-2 OFF: set SW1-2 ON (p.54).",
   "b5 communication fault between furnace and outdoor unit: check the wiring against the diagram (p.71)."
  ],
  "safety": "A2L refrigerant: maintain ventilation and avoid open flames when a leak is indicated.",
  "manual": "bosch_bgh97_furnace_iom_en_07.2026",
  "pages": [
   54,
   71
  ],
  "source": "BGH97 97% furnace Bosch 97% AFUE Condensing Gas Furnace Installation and Operating Instructions (BTC 772103301 B, 07.2026), p.54, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh96c-no-ignition",
  "unit": "^BGH96M(060|080|100|120)[BCD][345]C",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "E7 / E8 ignition lockout - BGH96 Rev C",
  "summary": "Three tries, then a one hour lockout; the manual's own list of causes.",
  "steps": [
   "Sequence: inducer on high, low pressure switch closes, 15 second pre-purge, inducer to low, ignitor warm-up 17 seconds, low fire valve opens, flame must be proven within 4 seconds (p.63, p.64).",
   "Two retries with a 60 second inter-purge, then lockout. Auto reset after one hour, or interrupt 115 V power or the call for heat for 1 - 20 seconds (p.68); the sequence of operation says a momentary power interruption of 10 seconds or longer may reset it (p.63).",
   "Listed causes: gas valve switched off; ignitor failure; orifices blocked; flame sensor dirty or broken; furnace improperly grounded; manifold or inlet gas pressure out of range (p.70).",
   "Ignitor: not over 200 ohms at about 70°F with its wires disconnected (p.72).",
   "Flame sensor: clean with emery cloth or steel wool; signal should be 0.5 to 6 microamps at 115 volts (p.71).",
   "The control must be grounded or it will lock out - ground is the green/yellow wire to the gas valve and manifold bracket screw (p.63).",
   "Inlet gas 4.5 - 10.5 in. WC natural, 11.0 - 13.0 in. WC propane; manifold 1.6 low / 3.5 high natural (p.45, p.65)."
  ],
  "safety": "Never test for gas leaks with an open flame. Turn power OFF prior to repair.",
  "manual": "bosch-bgh96-revc-iom-btc772003301c",
  "pages": [
   45,
   63,
   64,
   65,
   68,
   70,
   71,
   72
  ],
  "source": "BGH96 Rev C 96% two-stage gas furnace (BGH96M060B3C ... BGH96M120D5C) Installation and Operating Instructions 96% AFUE Condensing Gas Furnace Bosch BGH96 Model RevC (BTC 772003301 C, 06.2025), p.45, p.63, p.64, p.65, p.68, p.70, p.71, p.72",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-bgh96c-pressure-switch",
  "unit": "^BGH96M(060|080|100|120)[BCD][345]C",
  "brand": "Bosch",
  "equipment": "Gas Furnace",
  "title": "E1 - E4 pressure switch codes - BGH96 Rev C",
  "summary": "Which code is which switch, and the manual's checks.",
  "steps": [
   "E1 pressure switch closed with inducer off: switch contacts stuck or a short in the circuit - replace the switch or repair the short (p.69).",
   "E2 low fire (1st stage) pressure switch open with inducer on; E3 high fire (2nd stage) switch open with high inducer on; E4 pressure switch cycle lockout (p.69, p.74).",
   "Check the pressure switch hose for blockage, pinching or wrong connection; check the flue for blockage, proper length, elbows and termination; weak induced draft blower (p.69).",
   "Then switch setpoint / contacts (replace the switch with the proper part) and loose wiring (p.69).",
   "Vent limits to check against: 60 input 40 ft of 2 in. or 90 ft of 3 in.; 80 input 3 in. only, 90 ft; 100 input 30 ft of 2 in. or 70 ft of 3 in.; 120 input 3 in. only, 50 ft - vent and intake each (p.31).",
   "The pressure switches are normally open, negative pressure switches reading taps on the induced draft blower (p.67)."
  ],
  "safety": "Turn power OFF prior to repair.",
  "manual": "bosch-bgh96-revc-iom-btc772003301c",
  "pages": [
   31,
   67,
   69,
   74
  ],
  "source": "BGH96 Rev C 96% two-stage gas furnace (BGH96M060B3C ... BGH96M120D5C) Installation and Operating Instructions 96% AFUE Condensing Gas Furnace Bosch BGH96 Model RevC (BTC 772003301 C, 06.2025), p.31, p.67, p.69, p.74",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-c21-comm",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "C21 - communication error between indoor and outdoor unit - IDS Edge / Edge Max",
  "summary": "All units stop and C21 shows only on the outdoor unit. The IOM flowchart goes power, wiring, short, board, shielding.",
  "steps": [
   "Abnormal power supply for all indoor units? Solve the power supply problem first. (p.69)",
   "Check that the communication wiring is correctly connected - connect it per the installation instructions and wiring diagram. Single-zone with an IDS Premium air handler uses the P Q terminals on both units; Edge Multi indoor units use M1 M2. (p.69, p.31, p.34)",
   "Check whether the communication wiring is in short circuit - replace the broken wiring. (p.69)",
   "Check the communication wiring between the main board and the communication board - replace broken wiring. (p.69)",
   "Still there: replace the main board; if the error stays, replace the communication board. (p.69)",
   "Still there: the communication wiring is not shielded or the outdoor unit is in electromagnetic noise - use shielded cable and other protection measures. For Hyper-Link (M1 M2) wires the IOM adds: when shielded wires are used, the shielding layers at both ends must be connected to earth. (p.69, p.30)",
   "Listed causes also include communication wiring that is too long (\"Over 3937ft.\"). Note 1 on the chart: make sure that the matched resistance has been connected in the last indoor unit. Keep power cords and communication wires more than 2 inches apart. (p.69, p.30)"
  ],
  "safety": "Do not connect the power cords (high voltage) to the Hyper-Link (M1 M2) / P Q communication wires - it will damage the control board (IOM p.30). Risk of electric shock - disconnect all remote power supplies before installing or servicing any portion of the system (IOM p.30). Operate the board switches and push buttons with an insulated stick (IOM p.51).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   69,
   30,
   31,
   34,
   51
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.69, p.30, p.31, p.34, p.51",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-p13-high-pressure-switch",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "P13 - high pressure switch protection - IDS Edge / Edge Max",
  "summary": "P13 = the detected high pressure is higher than 4.2 MPa; all units stop. (P12 is the high pressure protection at 3.9 MPa; P11 on this unit is the high pressure SENSOR error.)",
  "steps": [
   "Outdoor unit stop (cut-off) valve not open? Open it. (p.80)",
   "High pressure switch not connected to the module board? Connect it - the note says the high-pressure switch interface is connector CN29 on the outdoor unit's module board. (p.80)",
   "High pressure switch failed? Replace the switch. (p.80)",
   "Excessive refrigerant (lower discharge temperature, higher discharge and suction pressures)? Perform a partial refrigerant recovery; if the system is low on oil make sure the oil level is replenished. (p.80)",
   "Air or nitrogen in the system (higher discharge temperature and pressure, higher compressor current, abnormal compressor noise, unusual pressure fluctuations)? After vacuuming, recharge the refrigerant; replenish oil if low. (p.80)",
   "High pressure pipe side blockage - pipe bending, damage, expansion valve blockage? Check and troubleshoot the piping system. (p.80)",
   "Poor heat transfer? In cooling inspect the outdoor heat exchanger, fan and discharge opening for blockages; in heating inspect the indoor heat exchanger, fan and discharge opening. (p.80)",
   "None of these: replacement of the control board. (p.80)",
   "Related codes: P12 \"Discharge pipe high pressure protection\" and P14 (repeat lockout, manual re-start) are on p.79; P11 is the high pressure sensor error on p.78. (p.64, p.78, p.79)"
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant: if a leak is suspected remove / extinguish all naked flames and keep ventilation; if a leak needs brazing, recover all the refrigerant or isolate that part of the system first (IOM p.45). Disconnect all power before servicing (IOM p.30).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   80,
   64,
   78,
   79,
   45,
   30
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.80, p.64, p.78, p.79, p.45, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-p22-low-pressure",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "P22 / P25 - low pressure protection - IDS Edge / Edge Max",
  "summary": "P22 = detected low pressure lower than 0.12 MPa; P25 = repeated P22 and needs a manual re-start. (P21 on this unit is the low pressure SENSOR error.)",
  "steps": [
   "Heating with ambient lower than -13 F? Check the real ambient temperature. (p.82)",
   "Is the outdoor unit shutoff valve open? If not, open it. (p.82)",
   "Restart the outdoor unit to see whether too little refrigerant remains - adjust the refrigerant amount. (p.82)",
   "Compressor has abnormal sound or vibration? Check the cable from the compressor INV board to the compressor; replace a broken compressor after judging it correctly (e.g. measure the 3 phase resistance). (p.82)",
   "Does the expansion valve actually open according to control logic? If not, replace the winding or the expansion valve. (p.82)",
   "Put a pressure gauge on the low pressure stop valve: is the low pressure close to 0.12 MPa before protection? One exit, printed \"No\", goes to \"Check the low pressure sensor or pressure switch in failure\"; the other exit is also printed \"No\" and goes to \"Power off, and replace the ODU main board, then power on.\" (p.82)",
   "The chart also asks whether the high / low pressure difference is larger than 58 psi (0.5 MPa) over 5 minutes after the fault stop - if so, check which part of the indoor unit is blocked. (p.82)",
   "P25 count: the code tables print \"P22 error occurs 3 times in 100 minutes\"; this page prints \"3 times in 60 min\". Low pressure can be read on the display: spot check item 25 = low pressure in PSIG. (p.58, p.64, p.82, p.56)"
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant: if a leak is suspected remove / extinguish all naked flames and keep ventilation; if a leak needs brazing, recover all the refrigerant or isolate that part of the system first (IOM p.45). Disconnect all power before servicing (IOM p.30).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   82,
   58,
   64,
   56,
   45,
   30
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.82, p.58, p.64, p.56, p.45, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-f72-discharge-temp",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "F72 / F7A - discharge temperature protection - IDS Edge / Edge Max",
  "summary": "F72 = discharge temperature (T7C) at or above 115 C; F7A = F72 three times in 100 minutes and needs a manual re-start.",
  "steps": [
   "Check that the check valve is open - open it. (p.75)",
   "Check the discharge temperature sensor (T7C) is properly seated on top of the compressor and securely connected to the outdoor main board, and that the wiring from the compressor INV board goes to the right compressor. Fix the sensor location / connection or reconnect the compressor wiring. (p.75)",
   "Check the sensor resistance - replace a faulty sensor. (p.75)",
   "Restart the unit to see whether there is too little refrigerant - adjust the refrigerant amount. (p.75)",
   "Pump-down behaviour (too low suction pressure) in heating? Check for blockage in the expansion valve and solenoid valve of the outdoor and indoor units. (p.75)",
   "Abnormal sound or vibration from the compressor? Replace the broken compressor. Otherwise replace the outdoor main board. (p.75)",
   "Read it live: spot check item 15 = T7C1 discharge temperature, item 18 = discharge superheat (F). (p.56)"
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant: if a leak is suspected remove / extinguish all naked flames and keep ventilation; if a leak needs brazing, recover all the refrigerant or isolate that part of the system first (IOM p.45). Disconnect all power before servicing (IOM p.30).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   75,
   56,
   58,
   45,
   30
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.75, p.56, p.58, p.45, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-a11-refrigerant-leak",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "A11 - indoor unit refrigerant leakage - IDS Edge / Edge Max",
  "summary": "A leak was detected at an indoor unit: that unit's fan runs at the highest speed, its expansion valve closes and the buzzer sounds. Re-powering does not clear it; A11 needs a manual re-start.",
  "steps": [
   "Causes listed: an indoor-side R454B leak; a leak detection sensor that is damaged or contaminated (vapour, oil) - a new sensor is required if the fault will not lift; a damaged indoor unit main board. (p.67)",
   "Flowchart (p.67), in the order printed: R-454B refrigerant leak in the site piping? Yes: process according to the Note (steps 1-5 below).",
   "No leak in the site piping: is the fault cleared after replacing the indoor unit main board? Yes: fault cleared. (p.67)",
   "Still there: is the sensor damaged or contaminated with external foreign matter (e.g. vapor, oil) resulting in a fault? Yes: service required - see the refrigerant leak sensor installation and operating instructions and service manual. No: contact technical support for processing. (p.67)",
   "1. Recover the residual refrigerant. With a leak the refrigerant shut-off device is closed, so recover at both the outdoor unit check valve service valve and the shut-off device, and select the evacuation (vacuum) mode in the outdoor menu while recovering. (p.67; vacuum mode n1-5-0 p.52)",
   "2. Locate and repair the leaks in the piping. (p.67)",
   "3. Test the piping for airtightness as in the piping installation section; repeat the repair until it passes. Leak check pressure in this IOM: 250 PSIG dry nitrogen. (p.67, p.25)",
   "4. Replace the R454B leak detection sensor on the indoor unit that displayed the fault. (p.67)",
   "5. Re-vacuum and refill the refrigerant per the outdoor unit installation instructions. (p.67, p.26, p.27)",
   "Menu n3-3 decides the leak response: 0 = display A11 immediately (default), 4 = forced running refrigerant recovery mode 1 after leakage. A15 = \"Recover refrigerant after refrigerant leakage and shut down\". (p.53, p.64)"
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant: if a leak is suspected remove / extinguish all naked flames and keep ventilation; if a leak needs brazing, recover all the refrigerant or isolate that part of the system first (IOM p.45). Disconnect all power before servicing (IOM p.30).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   67,
   25,
   26,
   27,
   45,
   52,
   53,
   64,
   30
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.67, p.25, p.26, p.27, p.45, p.52, p.53, p.64, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-edge-charge-check-subcooling",
  "unit": "^BOHA-?(?:24|36|60)[RM]TB",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking the charge by subcooling (Cooling Test mode) - IDS Edge / Edge Max",
  "summary": "The only approved charge check is in cooling force / test mode with the outdoor temperature 55-120 F and indoor 70-80 F. Below 50 F outdoor, weigh in.",
  "steps": [
   "Outdoor below 50 F: use the weigh-in method (factory charge covers 25 ft of liquid line; add 0.59 oz/ft of 3/8\" liquid line beyond that) and come back in warm weather. (p.27)",
   "Start the Cooling Test: menu item n1-1-0 (hold MENU 5 seconds to enter menu mode). There is a 7 minute start up delay before the compressor runs. (p.27, p.50)",
   "Let it stabilize 20 minutes at 100% capacity - the compressor reaches 90 Hz (24), 80 Hz (36), 90 Hz (60). (p.28)",
   "Measure suction line temperature and pressure and work out superheat from Table 16; measure liquid line temperature and pressure and work out subcooling from Table 17. (p.28)",
   "Design values: 2 and 3 ton subcooling 5-12 F, superheat 2-7 F; 5 ton subcooling 6-14 F, superheat 2-7 F. With a third party indoor unit keep superheat at 10-18 F. (p.29, p.28)",
   "Subcooling low: add refrigerant. Subcooling high: recover refrigerant. Wait 5 minutes between adjustments. (p.29)",
   "When done: remove gauges, replace the service port caps finger tight plus 1/6 turn, and write the added charge on the outdoor unit label. (p.29)"
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant (IOM p.15): no sources of ignition shall be used in a manner that may lead to the risk of fire or explosion when working on the refrigerant system (IOM p.7); if a leak is suspected remove / extinguish all naked flames and keep ventilation (IOM p.45). Risk of electric shock - disconnect all remote power supplies before installing or servicing any portion of the system (IOM p.30). Operate the board switches and push buttons with an insulated stick (IOM p.51).",
  "manual": "bosch-ids-edge-condensing-iom-762003323b",
  "pages": [
   27,
   28,
   29,
   50,
   51,
   15,
   45,
   30
  ],
  "source": "IDS Edge (Edge Regular) BOHA-24RTB-M18S / 36RTB / 60RTB (R-454B) Installation and Operating Instructions - Bosch IDS Heat Pump Edge Regular Series Condensing Unit, 2 - 3 - 5 Ton Capacity, R454B (BTC 762003323 B, 04.2026), p.27, p.28, p.29, p.50, p.51, p.15, p.45, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-ultra-b5-communication",
  "unit": "^BOVB-?(?:36|60)MTB-?M19E|^BOVB19",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "b5 - communication fault between indoor and outdoor unit - IDS Ultra (R-454B)",
  "summary": "Service manual causes: wiring issue, mode collection error, control board in the outdoor or indoor unit failed.",
  "steps": [
   "Are the M1M2 or PQ wires incorrectly connected? Correct the outdoor-to-indoor communication wire connection. (p.48)",
   "Are outdoor DIP switch SW5-4 and indoor DIP switch SW7-1 correct? Correct the DIP switch settings. On the Ultra outdoor board SW5-4 OFF is the factory default = Communicating mode (ON is printed \"Reserved\"). Power must be off when adjusting DIP switches, and a change only takes effect after a power cycle. (p.48, p.26, p.22)",
   "Are the M1M2 or PQ wires shorted or touching sheet metal? Arrange the M1 and M2 wire so it is not touching other wires or any sheet metal. (p.48)",
   "Replace the indoor unit control board and restart. Fault not cleared: replace the outdoor unit control board and restart. (p.48)",
   "Voltage checks for the two buses are in the Advanced System Check section: M1 M2 Voltage Check and PQ Voltage Check. (p.78, p.79)"
  ],
  "safety": "Hazardous voltage - all electrical work by qualified personnel; when measuring resistance make sure the unit is powered off and wait 3 min before taking the measurement (service manual p.46). Power off when adjusting DIP switches (p.26).",
  "manual": "bosch-ids-ultra-service-manual-762002313a",
  "pages": [
   48,
   26,
   22,
   46,
   78,
   79
  ],
  "source": "IDS Ultra 2026 - BOVB19 (BOVB-36MTB-M19E, BOVB-60MTB-M19E, BIVB-36/48/60MCB-M19X) (R-454B); the nomenclature figure on p.12 and Bosch bulletins BTC 762002303 A / 762002309 A print BOVA-60MTB-M19E / BOVA-60k for the 5 ton Ultra Service Manual - Bosch IDS Heat Pump Ultra Series, 3-5 Ton Capacity, R454B (BTC 762002313 A, 09.2026), p.48, p.26, p.22, p.46, p.78, p.79",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-ultra-e49-baseplate-heater",
  "unit": "^BOVB-?(?:36|60)MTB-?M19E|^BOVB19",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "E49 - baseplate (base pan) heating fault - IDS Ultra (R-454B)",
  "summary": "Causes listed: baseplate wiring issue, current sensor failed, baseplate failed, outdoor control board failed.",
  "steps": [
   "Is the base pan heating coil correctly plugged into CN42? Make sure the base pan heater is properly plugged in. (p.54)",
   "Unplug the base pan heater and measure its resistance: it should fall in the range 290-325 ohm. If not, replace the faulty base pan heater. (p.54)",
   "In range: replace the current sensor connected to CN15. Code cleared - continue normal operation. (p.54)",
   "Not cleared: is the supplied line voltage at L1 and L2 between 187 and 253 V? If not, correct the line voltage. (p.54)",
   "With the outdoor temperature below 35 F (confirm with check point #6 on the board), is the voltage at CN42 between 187 and 253 V? If not, replace the outdoor control board. If yes, restart the system. (p.54)"
  ],
  "safety": "Hazardous voltage - when measuring resistance make sure the unit is powered off and wait 3 min before taking the measurement. When measuring high voltage follow proper safety precautions and wear appropriate PPE such as insulated gloves, safety glasses, flame-resistant clothing (service manual p.54).",
  "manual": "bosch-ids-ultra-service-manual-762002313a",
  "pages": [
   54,
   44
  ],
  "source": "IDS Ultra 2026 - BOVB19 (BOVB-36MTB-M19E, BOVB-60MTB-M19E, BIVB-36/48/60MCB-M19X) (R-454B); the nomenclature figure on p.12 and Bosch bulletins BTC 762002303 A / 762002309 A print BOVA-60MTB-M19E / BOVA-60k for the 5 ton Ultra Service Manual - Bosch IDS Heat Pump Ultra Series, 3-5 Ton Capacity, R454B (BTC 762002313 A, 09.2026), p.54, p.44",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-ultra-h14-power-sensor",
  "unit": "^BOVB-?(?:36|60)MTB-?M19E|^BOVB19",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "H14 - power consumption sensor fault in the outdoor unit - IDS Ultra (R-454B)",
  "summary": "Causes listed: wiring error, current sensor failure, outdoor control board failure. The current sensor reads the red input power cable only.",
  "steps": [
   "Is the red input power cable going through the current sensor? If not, correct it using the wiring diagram. (p.58)",
   "Are the red and black input power cables both going through the current sensor at the same time? Make sure only the red cable goes through it. (p.58)",
   "Check that the current sensor is correctly plugged into CN15 - the chart says to ensure the current sensor is properly connected to CN15. (p.58)",
   "With a clip-on ammeter, compare the input AC current with checkpoint 29 on the control board (within 1.5 A). The chart as printed sends a \"Yes\" (they match) to \"Replace outdoor control board\". (p.58)",
   "They do not match: replace the current sensor and wire it according to the wiring diagram. Fault cleared - resume normal operation; not cleared - replace the outdoor control board. (p.58)",
   "H04 (chip of the power consumption sensor communication fault) has a single action: replace the outdoor control board and restart the system. (p.58)"
  ],
  "safety": "Hazardous voltage - when measuring input voltage / current follow proper safety precautions and wear appropriate PPE such as insulated gloves, safety glasses, flame-resistant clothing (service manual p.58).",
  "manual": "bosch-ids-ultra-service-manual-762002313a",
  "pages": [
   58,
   44
  ],
  "source": "IDS Ultra 2026 - BOVB19 (BOVB-36MTB-M19E, BOVB-60MTB-M19E, BIVB-36/48/60MCB-M19X) (R-454B); the nomenclature figure on p.12 and Bosch bulletins BTC 762002303 A / 762002309 A print BOVA-60MTB-M19E / BOVA-60k for the 5 ton Ultra Service Manual - Bosch IDS Heat Pump Ultra Series, 3-5 Ton Capacity, R454B (BTC 762002313 A, 09.2026), p.58, p.44",
  "confidence": "manual"
 },
 {
  "id": "u-bosch-ultra-limited-condition-letters",
  "unit": "^BOVB-?(?:36|60)MTB-?M19E|^BOVB19",
  "brand": "Bosch",
  "equipment": "Condenser/Heat Pump",
  "title": "A letter or dashes followed by two digits on the outdoor display - IDS Ultra (R-454B)",
  "summary": "These are Limited Condition Status codes, not faults: the unit keeps running with the compressor frequency limited, and the two digits are the compressor frequency in Hz. The manual says no service is required for them.",
  "steps": [
   "U + two digits: input or DC bus voltage limited (goes with E51 / E52). E51 trips at 270 VAC or more, or from 65 VAC up to (but below) 172 VAC, for 5 seconds. (p.33, p.35)",
   "One low dash + two digits: low pressure limited (goes with P21). 3-5 ton cooling: limiting starts below 50.7 psig, P21 below 29 psig for 3 seconds, restart at 58 psig. Heating: 17.4 / 10.2 / 29 psig. Five P21 (cooling) or P22 (heating) trips in 100 minutes = F2 lockout. (p.33, p.36)",
   "Two dashes + two digits: high pressure limited (goes with P11). Limiting starts at 500.4 psig, P11 at 565.6 psig for 3 seconds, restart below 471.4 psig. (p.33, p.39)",
   "F + two digits: compressor IPM temperature limited (P0). L + two digits: high pressure switch (P1; opens at 580 psig, resets below 435 psig). (p.33, p.38)",
   "C + two digits: current limited (P31 input current / P32 compressor current). d + two digits: discharge temperature limited (P4): limiting from 198 F, P4 at 230 F for 3 seconds, restart below 189 F. (p.34, p.39, p.40)",
   "r + two digits: running under compressor ratio limited condition (low temperature and low load) - there is no fault code for it. (p.34, p.43)",
   "dF = defrost, A + digits = oil return, and the force (charge) mode has its own display. (p.22, p.33)",
   "If the condition worsens or persists a fault code replaces the letter and the compressor shuts off - then work that fault code. (p.33)"
  ],
  "safety": "Hazardous voltage - all electrical work must be carried out by competent and suitably qualified professionals; when measuring resistance make sure the unit is powered off and wait 3 min (service manual p.46).",
  "manual": "bosch-ids-ultra-service-manual-762002313a",
  "pages": [
   33,
   34,
   35,
   36,
   38,
   39,
   40,
   43,
   22,
   46
  ],
  "source": "IDS Ultra 2026 - BOVB19 (BOVB-36MTB-M19E, BOVB-60MTB-M19E, BIVB-36/48/60MCB-M19X) (R-454B); the nomenclature figure on p.12 and Bosch bulletins BTC 762002303 A / 762002309 A print BOVA-60MTB-M19E / BOVA-60k for the 5 ton Ultra Service Manual - Bosch IDS Heat Pump Ultra Series, 3-5 Ton Capacity, R454B (BTC 762002313 A, 09.2026), p.33, p.34, p.35, p.36, p.38, p.39, p.40, p.43, p.22, p.46",
  "confidence": "manual"
 },
 {
  "id": "u-york-vh4-read-codes",
  "unit": "^VH4(12|18|24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Reading the codes - VH4 7-segment board (P.0) and drive LEDs",
  "summary": "Outdoor fault / protection codes are read from the 7-segment display board with a parameter query; drive faults flash on LED1 / LED2 of the main control board.",
  "steps": [
   "Open the maintenance panel to reach the 7-segment display board: S1 = select, S2 = increase, S3 = decrease (p.47, p.55).",
   "Press S1 to show the outdoor parameters, step with S2 / S3 to P.0, wait 3 s: the display shows E and the code, for example E 13. Several codes display in sequence (p.48, p.60).",
   "Other useful values: P.1 compressor actual frequency, P.5 discharge temperature, P.6 suction temperature, P.7 ambient, P.8 coil, P.14 AC input current, P.15 AC input voltage, P.16 DC bus voltage, P.24 actual outdoor pressure (p.48).",
   "The display is factory set to °C and MPa. For °F and psig: disconnect line power, wait for the display to go blank, set S4-1 from OFF to ON, restore power (p.45).",
   "Drive faults: remove the system top cover to see LED1, LED2, LED3 on the main control board (Figure 41; the manual notes the board design is shown upside down there). LED3 on = drive fault; LED1 flashes the tens digit, LED2 the ones digit (23 = LED1 twice, LED2 three times); 5 s off between codes (p.60-61).",
   "LED3 flashing with LED1 and LED2 off = compressor preheating, not a fault. All three off = no drive fault and no preheating (p.61).",
   "Outdoor code E45 (IPM fault) means read the drive LEDs and use the drive fault table (p.66, p.69-70)."
  ],
  "safety": "This equipment uses an inverter drive that stores hazardous energy up to 5 min after power is removed. Wait for more than 5 min before performing electrical work after power is removed.",
  "manual": "york-vh4-install-6746765-uim-c-0526",
  "pages": [
   45,
   47,
   48,
   55,
   60,
   61,
   66
  ],
  "source": "VH4 horizontal-discharge heat pump (VH412E2S11 - VH460E2S11) Installation Manual: VH4 Series - 14.3 SEER2/7.5 HSPF2 Horizontal Discharge Heat Pump (6746765-UIM-C-0526, 2026-05-14), p.45, p.47, p.48, p.55, p.60, p.61, p.66",
  "confidence": "manual"
 },
 {
  "id": "u-york-vh4-pump-down",
  "unit": "^VH4(12|18|24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Pump down / recovery into the outdoor unit - VH4",
  "summary": "Pump down mode on the S4 DIP switch runs the compressor at a target frequency with the EEV open. Not for line sets over 40 ft.",
  "steps": [
   "Line sets over 40 ft: the refrigerant cannot be recovered into the outdoor unit - recover with external equipment (p.45).",
   "Remove the heating or cooling call so the outdoor unit is in standby (p.45).",
   "Close the liquid line service valve: hex wrench, stem fully clockwise until seated (p.45-46).",
   "Open the maintenance panel. With line voltage power applied, set the S4 DIP switch on the 7-segment display board to the pump down position shown in Figure 26 (p.44, p.46).",
   "The display shows the compressor frequency, then CLOS - wait while the unit keeps running (p.46).",
   "When the display shows GOOD, close the vapor line service valve fully clockwise (p.46).",
   "Set the S4 switches back to OFF and immediately remove line voltage power. If the switch is left on, the unit enters pump down mode again at the next power-up (p.45-46)."
  ],
  "safety": "In pump down mode the compressor runs without any protection when the frequency rises (p.45). Wait more than 5 min after power is removed before electrical work.",
  "manual": "york-vh4-install-6746765-uim-c-0526",
  "pages": [
   44,
   45,
   46
  ],
  "source": "VH4 horizontal-discharge heat pump (VH412E2S11 - VH460E2S11) Installation Manual: VH4 Series - 14.3 SEER2/7.5 HSPF2 Horizontal Discharge Heat Pump (6746765-UIM-C-0526, 2026-05-14), p.44, p.45, p.46",
  "confidence": "manual"
 },
 {
  "id": "u-york-vh4-dip-defrost",
  "unit": "^VH4(12|18|24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "DIP switches and forced defrost - VH4",
  "summary": "S4 and S5 banks on the 7-segment display board; factory setting all OFF.",
  "steps": [
   "Factory setting: S4 and S5 all OFF (0000) (p.44).",
   "S4-1 ON = °F and psig on the display; S4-2 = pump down; S4-3 = forced defrost; S5-1 = capacity Hi - Low (Figure 26, p.44).",
   "Set S4-2 and S4-3 with line power ON, dialling OFF to ON - without power the setting is not refreshed. Set S4-1, S5-1 and S5-2 with all power OFF (p.44).",
   "Forced defrost: open the maintenance panel, set S4-3 per Figure 26 with power on; the unit runs a forced defrost. Set the switch back to OFF to leave forced defrost (p.47).",
   "The four-way valve is de-energized in cooling and defrosting and energized in heating (p.55)."
  ],
  "manual": "york-vh4-install-6746765-uim-c-0526",
  "pages": [
   44,
   45,
   47,
   55
  ],
  "source": "VH4 horizontal-discharge heat pump (VH412E2S11 - VH460E2S11) Installation Manual: VH4 Series - 14.3 SEER2/7.5 HSPF2 Horizontal Discharge Heat Pump (6746765-UIM-C-0526, 2026-05-14), p.44, p.45, p.47, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-york-vh4-no-start",
  "unit": "^VH4(12|18|24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Outdoor unit does not start or short-cycles - VH4 (normal malfunction table)",
  "summary": "Checks the manual lists before the code tables, including the A2L sensor case.",
  "steps": [
   "Outdoor unit does not start: power supply failure - check the power supply circuit; breaker trip or open fuse - measure insulation resistance to ground for leakage; supply voltage too low - check for a defective contact or leakage current; thermostat set wrong - check and set it; no power to the thermostat - check the thermostat and wiring (p.62).",
   "Indoor unit running at high stage airflow and the outdoor unit does not start: defective A2L sensor or refrigerant leakage - identify which and fix it (p.62). On the VHE air handler a leak above 10% LFL drives the blower to maximum and turns the outdoor compressor off (VHE install manual 6746780-UIM-A-0326 p.32).",
   "The VH4 needs a multi-stage room thermostat and conventional 24 V wiring C, G, O, Y1, Y/Y2, W (p.36, p.41-42). Code E7 = 24 V low voltage communication problem (p.64).",
   "Compressor starts or stops frequently: the air inlet or air outlet is blocked or restricted - remove the blockage (p.62). A 3 min delay between cycles is normal start-up protection (p.56).",
   "Poor cooling or heating: outdoor heat exchanger dirty - clean it; air leakage into the conditioned space or excessive load - improve the air tightness; blockage of the outdoor heat exchanger - remove the blockage; incorrect temperature setting - check the thermostat and set it again (p.62).",
   "Before start-up, main power must have been on for more than 6 h ahead of unit operation (compressor and base heater) to avoid damage to the compressor (p.43)."
  ],
  "manual": "york-vh4-install-6746765-uim-c-0526",
  "pages": [
   36,
   41,
   42,
   43,
   56,
   62,
   64
  ],
  "source": "VH4 horizontal-discharge heat pump (VH412E2S11 - VH460E2S11) Installation Manual: VH4 Series - 14.3 SEER2/7.5 HSPF2 Horizontal Discharge Heat Pump (6746765-UIM-C-0526, 2026-05-14), p.36, p.41, p.42, p.43, p.56, p.62, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-york-vh4-pressures",
  "unit": "^VH4(12|18|24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Cooling pressures low or high - VH4 flow chart",
  "summary": "The manual's cooling mode flow chart (Figure 38) and the overload table.",
  "steps": [
   "Verify correct airflow for the indoor and outdoor sections first, then test system pressure at the service ports (p.58).",
   "Pressures low: charge is low - recharge per the manual (qualified technician). If pressure comes up to normal, charge is normal - check for possible leaks (p.58).",
   "If pressure does not come up: blockage in the refrigeration circuit - is there a restriction in the metering device circuit? Yes = remove the restriction or replace metering device components; No = check the reversing valve or check valve in the metering device circuit (p.58).",
   "Pressures high: recover refrigerant and evacuate to the level specified. If pressure then is normal, evacuation removed non-condensables. If not, are pressures equalized during operation? Yes = check the reversing valve or compressor for correct operation (p.58).",
   "Overload in cooling: excess refrigerant, high outdoor ambient, outdoor air short-circuit, dirty outdoor coil, outdoor fan slow / damaged / blocked, blocked inlet or outlet, failed TXV (p.71).",
   "Charge: the install manual (p.16, p.29, p.36) and the technical guide say the factory charge is for 25 ft - add 0.38 oz/ft beyond 25 ft; the install manual About section (p.5) says 15 ft. Go by the nameplate. See Table 8 and Adjusting refrigerant charge in the install manual, and the Tabular Data Sheet for precharge amount and indoor combinations (p.16, p.36).",
   "The heating mode flow chart is Figure 39 (p.59)."
  ],
  "manual": "york-vh4-install-6746765-uim-c-0526",
  "pages": [
   16,
   36,
   58,
   59,
   71
  ],
  "source": "VH4 horizontal-discharge heat pump (VH412E2S11 - VH460E2S11) Installation Manual: VH4 Series - 14.3 SEER2/7.5 HSPF2 Horizontal Discharge Heat Pump (6746765-UIM-C-0526, 2026-05-14), p.16, p.36, p.58, p.59, p.71",
  "confidence": "manual"
 },
 {
  "id": "u-york-vhe-airflow-leak-sensor",
  "unit": "^VHE(12|18|24|30)B",
  "brand": "York",
  "equipment": "Air Handler",
  "title": "VHE air handler: blower speed DIP and the A2L leak sensor",
  "summary": "Constant-torque blower set on DIP S2; leak sensor on the coil shuts down the outdoor unit and the heat.",
  "steps": [
   "Leak sensor: when the LFL concentration exceeds 10% the air handler runs at maximum airflow, the outdoor compressor is deactivated and the electric heat is turned off (p.32).",
   "Blower tap (18K-30K): tap 3 Medium 0.4 in. W.C. = S2-1 ON, S2-2 OFF; tap 4 Medium-high 0.58 in. W.C. (default) = S2-1 OFF, S2-2 ON (p.32).",
   "12K unit: Medium = switch 2 ON (1, 3, 4 OFF); Medium-high default = switch 3 ON (1, 2, 4 OFF) (p.33).",
   "Measure total external static: run fan only for a dry coil, tips 12 in. from the unit in supply and return before any elbows, return reading after the filter and before the coil; add the two as positive numbers (p.33-34).",
   "Recommended static 0.2-0.5 in.; tested to 0.60 in. W.C. Closed registers, clogged filters or duct restrictions make the motor speed up and can damage it (p.32, p.34).",
   "Converting to downflow / horizontal right (before brazing): disconnect the sensor wire at the adapter block and make a drip loop secured with a new cable tie, slide the coil out with the sensor attached, turn the cabinet, slide the coil back in, route the wire through the drain pan clip, reconnect at the adapter block (p.22-23)."
  ],
  "manual": "york-vhe-install-6746780-uim-a-0326",
  "pages": [
   22,
   23,
   32,
   33,
   34
  ],
  "source": "VHE air handler (VHE12B5YK2SS1, VHE18B5YK2SS1, VHE24B5YK2SS1, VHE30B5YK2SS1) Installation Manual: VHE Single-Piece Multi-Position Air Handlers (6746780-UIM-A-0326, 2026-03-04), p.22, p.23, p.32, p.33, p.34",
  "confidence": "manual"
 },
 {
  "id": "u-york-vc-charging",
  "unit": "^VC[34](18|19|24|25|30|36|42|48|60)E",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "Charging a VC3 / VC4 (R-454B, TXV, subcooling chart)",
  "summary": "Weigh in the adders first, then match the liquid pressure on the unit's charging chart.",
  "steps": [
   "Measure indoor airflow (manometer between filter and blower plus supply; add return and supply as positive numbers) - do not assume jumper tables and 0.5 in. W.C. (p.44).",
   "Total charge = base charge shipped + adder for the matched indoor unit + adder for piping over 15 ft (Tabular Data Sheet) (p.44).",
   "Run cooling with the thermostat at least 6°F below room temperature for 10-15 min; airflow must be 350-400 SCFM/ton (p.46).",
   "Read indoor wet bulb and outdoor dry bulb; the chart on the unit gives the target liquid pressure. Add charge if the liquid valve reads lower, recover if higher. Allow 10 min after each adjustment (p.45-46).",
   "At 55°F or below the preferred method is to weigh in the charge (p.19); to charge or check it, use the optional charging tent (70 x 70 x 70 in. minimum, no floor) held above 55°F, stabilize 15 min (p.47-48).",
   "Permanently stamp the total system charge on the data plate. Over 3.91 lb total requires a refrigerant detection system (p.6, p.45)."
  ],
  "safety": "Do not attempt to pump the total system charge into the outdoor unit for maintenance or service. Recover and weigh the charge into a recovery cylinder. R-454B: use 700 psig hoses and R-454B rated equipment.",
  "manual": "york-split-ac-r454b-install-6711478-uim-a-1025",
  "pages": [
   6,
   19,
   20,
   43,
   44,
   45,
   46,
   47,
   48
  ],
  "source": "VC3 / VC4 (also YC3, YC4, YC6, XC3, XC4, XC6, RC3, RC4) Installation Manual: R-454B Outdoor Split-System Air Conditioner - YC4, XC4, RC4, YC3, XC3, XC3 3phase, RC3, YC6, XC6, VC3, and VC4 (6711478-UIM-A-1025, 2025-10-16, supersedes 6650655-UIM-B-0725), p.6, p.19, p.20, p.43, p.44, p.45, p.46, p.47, p.48",
  "confidence": "manual"
 },
 {
  "id": "u-york-vc-no-diagnostics",
  "unit": "^VC[34](18|19|24|25|30|36|42|48|60)E",
  "brand": "York",
  "equipment": "Condenser/Heat Pump",
  "title": "VC3 / VC4 not cooling - what the unit has (no fault codes)",
  "summary": "Single-stage conventional AC: contactor, capacitor, high-pressure switch; no fault-code display is printed for this series.",
  "steps": [
   "Wiring diagram Figure 21 (single-phase 13.4 SEER2 and 14.3 SEER2, 6436388-UWD-A-0221): the HPS high pressure switch is in series with the contactor coil on the 24 VAC control circuit (20 VA minimum). Components shown in dashed lines are optional: LPS low pressure switch, CCH crankcase heater with its HS heater switch, and the SR start relay / SC start capacitor (p.52).",
   "Do not run cooling below 55°F outdoor without an approved low ambient kit (p.20).",
   "Rotary compressor sizes (VC318, VC324, VC418) need the factory hard start kit S1-2SA06722006 when the indoor metering device is not S1-1TVM5A1 (p.33).",
   "Microchannel coil: no coil cleaners containing HF, hydroxides, chlorides or sulfates; water rinse, no pressure washer (p.49-50).",
   "Gauges cost about 3/4 oz of charge each connection - connect only when trouble is suspected (p.29).",
   "Initial safety checks for electrical repairs: discharge capacitors, no live parts exposed while charging or recovering, earth bonding continuity (p.49)."
  ],
  "manual": "york-split-ac-r454b-install-6711478-uim-a-1025",
  "pages": [
   20,
   29,
   33,
   49,
   50,
   52
  ],
  "source": "VC3 / VC4 (also YC3, YC4, YC6, XC3, XC4, XC6, RC3, RC4) Installation Manual: R-454B Outdoor Split-System Air Conditioner - YC4, XC4, RC4, YC3, XC3, XC3 3phase, RC3, YC6, XC6, VC3, and VC4 (6711478-UIM-A-1025, 2025-10-16, supersedes 6650655-UIM-B-0725), p.20, p.29, p.33, p.49, p.50, p.52",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-where-faults",
  "unit": "^5T[TW]V[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "No code on the outdoor board — where the faults show — Trane Link variable speed 5TWV / 5TTV",
  "summary": "These units have no fault display outdoors; faults are read at the UX360 or in the Technician Mobile App.",
  "steps": [
   "This unit is Link communicating only. It must have the A/T HUI2360A200U thermostat (UX360) and the TSYS2C60A2VVU system controller (SC360), with software 8.0 or later on both.",
   "The guide's Fault Identification note says a fault condition is indicated by the UX360 User Interface or the Technician Mobile App, and that installation, servicing and troubleshooting are done in the Technician Access area of the thermostat and/or the Link Technician Mobile App (both printed in its Defrost Control - Heat Pump Only chapter).",
   "The guide's LED table for the outdoor control board lists one LED, the amber COMM LED (DS51, labelled 'Yellow - COMM' on the board drawing): slow, one blink per device = device count; fast, 5 times per second = loss of communication.",
   "The guide says the alert code meanings are in the Alert Code Tables of the Service Facts and Technical Service Manual (34-4301-01 or newer) - that manual is not in the library.",
   "The Diagnostics Mobile App is found by scanning the QR code inside the unit or searching for the Trane or American Standard Diagnostics App.",
   "The 5TWV8X / 5TTV8X guide (ODR-SVN004C-EN) prints the same on the same pages."
  ],
  "safety": "Wait two (2) minutes after disconnecting power before touching electrical components - they may hold a dangerous charge of 400 VDC - then verify DC voltage is less than 42 VDC at the inverter test points labelled +DC and -DC before servicing the board.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   6,
   26,
   31,
   32
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.6, p.26, p.31, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-comm-loss",
  "unit": "^5T[TW]V[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "COMM LED blinking fast — loss of communication — Trane Link variable speed 5TWV / 5TTV",
  "summary": "Fast amber COMM blinking (5 per second) means loss of communication on the Link bus. The guide gives the wiring rules to check.",
  "steps": [
   "Amber COMM LED: slow (1 time per device) = device count; fast (5 times per second) = loss of communication.",
   "Link wiring: DH and DL wires are required. Red and common are not required (common enhances communication), but red and common are required for load shed and SmartCharge.",
   "Wire colours on the connectors: R red, DH white, DL green, B blue. If you use other colours, make sure each lands on the correct terminal throughout all the communicating wiring.",
   "Connectors are one-time use: strip 1/4 inch, push each wire in until it releases, then pull back on each wire to check it is seated. If an 18-gauge wire breaks inside a connector, the connector needs replacing.",
   "Maximum total cable length for the whole communicating system: 500 ft of 18 AWG.",
   "The CAN connector plugs into the male coupling on the low-voltage harness at the outdoor unit; on the indoor board either CAN header can be used - both are in the loop."
  ],
  "safety": "Disconnect all electric power, including remote disconnects, before servicing; follow lockout/tagout and verify no power with a voltmeter.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   3,
   23,
   24,
   26
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.3, p.23, p.24, p.26",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-charge",
  "unit": "^5T[TW]V[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Checking or setting the charge — Charging Mode-Cooling — Trane Link variable speed 5TWV / 5TTV",
  "summary": "Subcooling in the Charging Mode-Cooling test is the only approved way to set the charge, between 55°F and 120°F outdoor.",
  "steps": [
   "Run the system in the 'Charging Mode-Cooling' test mode from the UX360 Technician menu or the Technician Mobile App - the guide calls this the only approved method for setting the system charge by subcooling. Follow the on-screen prompts.",
   "Conditions: outdoor 55°F to 120°F, indoor kept between 70°F and 80°F. If starting up in colder conditions, return when conditions are right to validate the charge.",
   "Final subcooling = the design subcooling from the nameplate (or Service Facts) plus the adder for total line length and lift from the guide's chart for the size (Maintenance Figures lists the design value per size).",
   "Use bubble point for subcooling. Add refrigerant if the liquid gauge pressure is lower than the chart value; recover refrigerant if it is higher.",
   "Wait 20 minutes for the system to stabilise between adjustments. The system is properly charged when liquid line temperature and gauge pressure approximately match the chart.",
   "SmartCharge tool BAYCAKT002 may be used as an optional method - confirm the charge afterward by verifying subcooling.",
   "Record the readings and fill in the 'Total System Charge' label on the unit with a permanent marker (factory charge + charge added)."
  ],
  "safety": "Use ONLY R-454B rated service equipment. R-454B is a blend - add it in liquid form only. Verify that the refrigeration system is earthed before charging and that refrigerants are not mixed.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   6,
   27,
   28,
   29
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.6, p.27, p.28, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-charge-cold",
  "unit": "^5T[TW]V[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Charging below 55°F outdoor — weigh-in, then 10° subcooling in heat — Trane Link variable speed 5TWV / 5TTV",
  "summary": "Below 55°F the subcooling method in cooling is not recommended; weigh in the charge and come back in warm weather.",
  "steps": [
   "The nameplate charge covers 10 feet of AHRI rated line and the smallest AHRI rated coil.",
   "Measure the line length from the service valve to the indoor unit and subtract 10 ft. Multiply by 0.47 oz per foot for 3/8-inch liquid line or 0.30 oz per foot for 5/16-inch. Weigh that in before opening the service valves.",
   "Run at least 20 minutes to stabilise - required at start-up and whenever charge is added or removed.",
   "Heat pump in heating mode: check liquid line temperature and liquid gauge pressure for a minimum of 10° subcooling. Add charge if 10° is not reached with the nameplate charge plus the added charge.",
   "Fill in the 'Total System Charge' label, then return in the spring or summer to charge accurately in cooling mode with outdoor ambient above 55°F."
  ],
  "safety": "Use ONLY R-454B rated service equipment. Never break a vacuum with air and always replace driers when opening the system.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   3,
   15,
   30
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.3, p.15, p.30",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-defrost",
  "unit": "^5TWV[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost — how it starts, forcing one, termination setting — Trane Link variable speed 5TWV / 5TTV",
  "summary": "Demand defrost uses the ambient (ODS) and coil (CBS) sensors; a forced defrost is started from the UX360 or the app.",
  "steps": [
   "The demand defrost control compares outdoor ambient (sensor outside the coil) with the coil temperature (sensor on the coil). The difference is Delta-T; the coil sensor also ends the defrost.",
   "The algorithm is enabled when the ambient sensor (ODS) is below 52°F and the coil sensor (CBS) is below 32°F (Trane June 2026 guide). Defrost starts when the difference reaches the initiation threshold. American Standard's 2024 5A6V8X / 5A7V8X guide prints ODS at or below 52°F, CBS at or below 35°F and a heat/cool demand for at least two minutes (11-BC49D1-1E-EN p.32).",
   "Forced defrost: the system must be running on a demand from the thermostat, heat mode only. Start FRC DFT TEST from the UX360 or the Technician Mobile App and press ENTER.",
   "The test shows TEST IN PROGRESS with the coil temperature; the UX360 home screen shows DEFROST. It ends on coil temperature or a 15-minute maximum; TEST COMPLETE shows for 10 seconds.",
   "If there is a defrost fault, the test stops and sends an alert to the alert menu.",
   "Termination temperature can be configured in the 'Environment' section of the configuration menu (Factory, Medium, High profiles - graph only, no figures printed).",
   "Snow areas: raise the unit 3 to 12 inches and keep the base pan drain holes clear so defrost water drains before it refreezes."
  ],
  "safety": "Do not use any items other than those approved by the manufacturer for defrosting or cleaning. Do not pierce or burn. Be cautious that refrigerants may be odorless.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   13,
   31,
   32
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.13, p.31, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-trane-linkvs-install-checks",
  "unit": "^5T[TW]V[08]X",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Leak test, evacuation and start-up — Trane Link variable speed 5TWV / 5TTV",
  "summary": "The guide's pressure-test limit, vacuum standard and start-up wait for these units.",
  "steps": [
   "Do not test the outdoor unit higher than 450 psig. Close the service valves and pressurize only the indoor unit and line set, to the maximum on the outdoor or indoor nameplate, for at least 60 minutes - no pressure loss allowed. An optional preliminary check is 150 psig dry nitrogen.",
   "Leak check every brazed joint with soapy solution; remove nitrogen pressure and repair leaks before continuing.",
   "Evacuate to 350 microns or lower, close the valve to the pump. Evacuation is complete if the gauge does not rise above 500 microns in 1 minute and 1,500 microns in 10 minutes (Trane June 2026 guide). American Standard's 2024 5A6V8X / 5A7V8X guide prints only 'does not rise above 1500 microns in ten (10) minute' (11-BC49D1-1E-EN p.21).",
   "Open the gas service valve first (1/4 turn), then the liquid valve with a 3/16-inch hex until the stem just touches the rolled edge (about five turns). Caps finger-tight plus 1/6 turn.",
   "Wait three hours before starting the unit if the outdoor ambient temperature is below 85°F.",
   "Select the correct line set size in the set-up app - the default is the alternate line size."
  ],
  "safety": "When opening the suction and liquid service valves, turn the stem counterclockwise only until it contacts the rolled edge - do not apply torque (abrupt release of system charge). Confirm the area is ventilated before breaking into the system or any hot work.",
  "manual": "trane-5twv0x-5ttv0x-install-odr-svn006c",
  "pages": [
   4,
   8,
   20,
   21,
   22,
   27
  ],
  "source": "5TWV0X / 5TTV0X Installer's Guide - Link Variable Speed Heat Pumps and Air Conditioners, 5TWV0X24A-60A / 5TTV0X24A-60A (ODR-SVN006C-EN, June 2026), p.4, p.8, p.20, p.21, p.22, p.27",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-pkgb-dissipation-fan",
  "unit": "^(50N[LT]-?B|48N[LT][-N]?B)",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Indoor fan runs and there is no cooling or heat - leak dissipation mode (R-454B packaged -B)",
  "summary": "These R-454B packaged units carry a refrigerant sensor and a dissipation board. When the sensor sees refrigerant the board removes every call and runs the fan - that looks like a dead unit with the blower on.",
  "steps": [
   "Remove the control access panel (48NT-B: the compressor access panel - its board is in the compressor compartment, 48NT-B-04SI p.14) and read the dissipation board LED (amber / yellow). Solid = normal; Flashing 1 = sensor >= 20% LFL; Flashing 3 = normal dissipation after a leak (label, p.34).",
   "In dissipation mode the board energizes G and de-energizes Y and W. It shows Flash Code 1 until the refrigerant level drops, then Flash Code 3 (p.32).",
   "Dissipation mode continues for at least 10 minutes, then a 5-minute ON delay, then normal operation (p.32). The Leak Dissipation System section words it differently: once the level drops the fan stays on 5 minutes, any call for cooling is still removed, and a call for electric resistance or gas heat (non-heat pump) is allowed; after the 5 minutes, if the level stays below the threshold, cooling and blower calls are restored (p.10).",
   "Flashing 1 or 3: check for refrigerant leaks with an independent R-454B detector. Flashing 1 with no leak found: replace the sensor (p.32).",
   "For all flash codes, first try power cycling the system to remove the code (p.32).",
   "The unit must stay powered at all times after installation, other than when servicing, for the safety measures to work (p.1)."
  ],
  "safety": "R-454B is an A2L (mildly flammable) refrigerant: non-sparking tools, a refrigerant detector when the system is opened, no open flames except brazing on tubes open to atmosphere or evacuated (p.1, p.21).",
  "manual": "carrier-50nt-b-install-50nt-04si",
  "pages": [
   1,
   10,
   21,
   32,
   34
  ],
  "source": "50NT-B (R-454B packaged heat pump) 50NT-B Comfort 13.4 SEER2 Single-Packaged Heat Pump (R-454B), 2-5 Tons - Installation Instruction (50NT-04SI, Ed. 12/24), p.1, p.10, p.21, p.32, p.34",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-pkgb-dsb-test",
  "unit": "^(50N[LRT]-?B|48N[GLRT][-N]?B)",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Checking the leak dissipation system after service (Test button and the six operational checks)",
  "summary": "The dissipation board has a Test button. A short press runs dissipation mode for 60 s so you can prove the fan comes on and the compressor and heat drop out.",
  "steps": [
   "Press the Test button for approximately ONE SECOND to enter Test Mode. Pressing it longer can clear all fault code history (p.11).",
   "Hold 1-4 s = dissipation mode for 60 s; 5-29 s = display flash code history; 30 s or more = flash code 6; 3 rapid presses = clear flash code history (Table 1, p.11).",
   "Normal operation checks: no call - compressor, indoor fan, heat off; Cool - compressor and fan on, heat off; Heat - fan and heat on, compressor off (Table 2, p.11).",
   "With dissipation activated: no call, Cool or Heat - compressor off, indoor fan on, electric / gas heat off (Table 2, p.11).",
   "Continuous fan must deliver at least the Required Minimum Dissipation Airflow for the size (Table 3, p.11-12)."
  ],
  "safety": "Required Minimum Dissipation Airflow must be met or exceeded with the continuous fan speed selected (warning, p.11).",
  "manual": "carrier-50nt-b-install-50nt-04si",
  "pages": [
   11,
   12
  ],
  "source": "50NT-B (R-454B packaged heat pump) 50NT-B Comfort 13.4 SEER2 Single-Packaged Heat Pump (R-454B), 2-5 Tons - Installation Instruction (50NT-04SI, Ed. 12/24), p.11, p.12",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48nb-igc-no-heat",
  "unit": "^48N[GLRT][-N]?B",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "No gas heat - read the IGC LED (48NT-B / 48NL-B / 48NR-B / 48NG-B)",
  "summary": "The integrated gas unit controller (IGC) LED is on steady in normal operation and flashes 1-9 for a fault. Read it before you chase parts.",
  "steps": [
   "Remove the control access panel; the IGC LED is continuously on in normal operation (p.26).",
   "LED off: check the 5-amp fuse on the IGC, power to the unit, the 24-v circuit breaker and transformer; a transformer without a breaker has an internal overload - allow 10 minutes for automatic reset (Table 18, p.45).",
   "2 flashes (limit) or 4 flashes (four limit trips): check the indoor fan motor and that the temperature rise is within the nameplate range; clean or replace filters (p.45).",
   "5 flashes (ignition lockout after 15 minutes): check igniter and flame sensor electrode spacing and gaps, wire terminations, and that the unit gets the proper amount of gas (p.45).",
   "6 flashes (pressure switch): check wiring to the pressure switch and inducer, the pressure switch hose at both ends, and that the inducer wheel is secured and the shaft turns (p.45).",
   "7 flashes (rollout): the switch resets itself but the IGC keeps the unit locked out - check the gas valve, the inducer wheel on its shaft, inspect the heat exchanger, reset at the unit disconnect (p.45).",
   "Burners will not ignite with no code: water in the gas line, no 24-v supply, misaligned spark electrodes, air in the gas line - after purging wait at least 5 minutes before trying to light (Table 16, p.44)."
  ],
  "safety": "If the IGC must be replaced, ground yourself first - the IGC is sensitive to static electricity (p.45).",
  "manual": "carrier-48nl-b-install-48nl-02si",
  "pages": [
   26,
   44,
   45
  ],
  "source": "48NL-B (R-454B packaged AC + gas furnace) 48NL-B Comfort 13.4 SEER2 Single-Packaged Air Conditioner and Gas Furnace (R-454B), 2-5 Tons - Installation Instructions (48NL-02SI, Ed. 07/24), p.26, p.44, p.45",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48ng-two-stage-manifold",
  "unit": "^48NG[-N]?B",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Setting high and low fire manifold pressure - 48NG-B two-stage gas",
  "summary": "208/230 V 48NG-B units have a two-stage gas valve: high stage is set first, then low stage. 460 V units have a single-stage valve.",
  "steps": [
   "Turn off gas, remove the manifold pipe plug, connect a manometer, turn the gas on (p.20).",
   "Remove the regulator cover screw(s) over the plastic adjustment screw(s) (Fig. 16 two-stage, Fig. 17 single-stage 460 V) (p.20).",
   "High stage (208/230 V) or single stage (460 V): clockwise increases input. Manifold must be between 3.2 and 3.8 in. w.c. (p.20).",
   "208/230 V only: then set low stage - 1.4 to 2.0 in. w.c. Low stage must be adjusted after high stage is already adjusted (p.21).",
   "At 0-2000 ft the table prints high / low: 40000 3.2 / 1.4, 60000 3.2 / 1.4, 90000 3.6 / 1.6, 115000 3.8 / 1.7, 127000 3.7 / 1.7 in. w.c. (Table 6, p.20).",
   "Replace the cover screws, turn off gas, remove the manometer, replace the plug, turn gas on and check for leaks (p.21). Propane: follow the propane kit instructions (p.21)."
  ],
  "safety": "WARNING - fire and unit damage hazard: unsafe operation of the unit may result if manifold pressure is outside this range (p.21).",
  "manual": "carrier-48ng-install-48ng-02si",
  "pages": [
   20,
   21
  ],
  "source": "48NG-B (R-454B 2-stage packaged AC + gas, standard and Low NOx) 48NG Performance 15.2+ SEER2 2-Stage Packaged Air Conditioner and Gas Furnace (R-454B), 2-5 Tons - Installation Instructions (48NG-02SI, Ed. 06/25), p.20, p.21",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48nr-two-stage-manifold",
  "unit": "^48NR[-N]?B",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Setting high and low fire manifold pressure - 48NR-B dual fuel",
  "summary": "48NR-B has a two-stage gas valve: high stage 3.2-3.8 in. w.c. first, then low stage 1.4-2.0 in. w.c.",
  "steps": [
   "Turn off gas, remove the manifold pipe plug, connect a manometer, turn the gas on (p.19).",
   "Turn the high stage plastic adjustment screw clockwise to increase input; manifold must be between 3.2 and 3.8 in. w.c. for high stage (p.19).",
   "Then turn the low stage screw - low stage manifold must be between 1.4 and 2.0 in. w.c. Low stage is adjusted after high stage (p.19).",
   "Table 6 at 0-2000 ft: 60000 3.2 / 1.4, 90000 3.6 / 1.6, 115000 3.8 / 1.7, 127000 3.7 / 1.7 in. w.c. (p.20).",
   "Replace the cover screws, remove the manometer, replace the plug, turn gas on and check for leaks (p.19)."
  ],
  "safety": "Unsafe operation may result if manifold pressure is outside the range.",
  "manual": "carrier-48nr-install-48nr-01si",
  "pages": [
   19,
   20
  ],
  "source": "48NR (R-454B 2-stage hybrid heat packaged) 48NR Performance 15.2+ SEER2 2-Stage Packaged HYBRID HEAT Dual Fuel (R-454B), 2-5 Tons - Installation Instructions (48NR-01SI, Ed. 03/25), p.19, p.20",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-48nt-48nl-manifold",
  "unit": "^48N[LT][-N]?B",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Checking gas input - 48NT-B / 48NL-B single-stage gas (clock the meter)",
  "summary": "Single-stage gas valve. Measuring gas flow at the meter is recommended for natural gas; manifold pressure must stay 3.2-3.8 in. w.c.",
  "steps": [
   "Turn off all other appliances on the same meter (p.19).",
   "Turn off gas, remove the manifold pipe plug, connect a manometer, turn on gas (p.19).",
   "Time one revolution of the test dial; 3600 / seconds x dial size (cu ft) = cu ft per hour; x heating value = input. Example: 32 s, 1 cu ft, 1050 Btu/ft3 = 118,125 Btuh (p.19).",
   "Compare with the Heating Inputs table (p.13). Turn the plastic screw clockwise to increase input; manifold must be between 3.2 and 3.8 in. w.c. (p.19).",
   "Larger changes: change main burner orifices; do not redrill an orifice (p.19).",
   "Propane: check input by manifold pressure per the propane kit instructions; 10.0-11.0 in. w.c. (p.13, p.19)."
  ],
  "safety": "WARNING - fire and unit damage hazard if manifold pressure is outside this range. CAUTION: do not redrill an orifice (p.19).",
  "manual": "carrier-48nt-b-install-48nt-b-04si",
  "pages": [
   13,
   19
  ],
  "source": "48NT-B (R-454B hybrid heat dual fuel packaged) 48NT-B Comfort 13.4 SEER2 Single-Packaged HYBRID HEAT Dual Fuel (R-454B), 2-5 Tons - Installation Instructions (48NT-B-04SI, Ed. 12/24), p.13, p.19",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-50nt-defrost",
  "unit": "^(50N[RT]-?B|48N[RT][-N]?B)",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Heat pump defrost on the R-454B packaged -B units - interval and defrost thermostat",
  "summary": "Demand defrost: the board starts at the selected interval and adjusts itself. The defrost thermostat on the outdoor coil tells it when to start and end.",
  "steps": [
   "Factory initial interval 60 minutes; may be set to 30, 90 or 120 minutes (p.24).",
   "Defrost shorter than 2 minutes twice in a row: interval lengthens by 15 minutes (up to 120, or 30 above the setpoint). Longer than 5 minutes twice: interval shortens by 15 minutes (p.24).",
   "Defrost ends when the condition is satisfied or after a maximum of 10 minutes (p.24).",
   "50NT-B / 50NR-B: in defrost the board energizes O (reversing valve) and W2 (electric heat) and turns off the outdoor fan (50NT-04SI p.12; 50NR-01SI p.16). The 48NT-B / 48NR-B instructions do not print this line.",
   "Defrost thermostat: closes at 32 F, opens at 65 F; usually on the lowest liquid-leaving circuit of the left condenser coil, on the liquid side, bottom circuit, as close to the coil as possible (p.32; 50NR-01SI p.32, 48NT-B-04SI p.36, 48NR-01SI p.49). 50NT-B / 48NT-B add that the factory location is the left/back coil."
  ],
  "manual": "carrier-50nt-b-install-50nt-04si",
  "pages": [
   12,
   24,
   32
  ],
  "source": "50NT-B (R-454B packaged heat pump) 50NT-B Comfort 13.4 SEER2 Single-Packaged Heat Pump (R-454B), 2-5 Tons - Installation Instruction (50NT-04SI, Ed. 12/24), p.12, p.24, p.32",
  "confidence": "manual"
 },
 {
  "id": "u-carrier-pkgb-charge-check",
  "unit": "^(50N[LRT]-?B|48N[GLRT][-N]?B)",
  "brand": "Carrier",
  "equipment": "Other",
  "title": "Checking the charge on an R-454B packaged -B unit",
  "summary": "The unit ships fully charged. Adjust only if the charge is suspected wrong, with an R-454B leak detector running.",
  "steps": [
   "Adjust charge only if the unit is suspected of not having the proper R-454B charge (p.21). 50NT-B / 50NL-B / 48NT-B / 48NL-B instructions add that an R-454B leak detector must be actively monitoring during the process (p.21).",
   "Use the charging label inside the compressor access panel: subcool chart for TXV units, superheat chart for fixed-orifice units (50NT-B / 50NL-B / 48NT-B / 48NL-B, p.21); 50NR-B, 48NR-B and 48NG-B print a subcooling chart only (50NR-01SI p.15, 48NR-01SI p.24, 48NG-02SI p.29). Cooling mode only.",
   "Do not run cooling below 40 F outdoor unless the low-ambient kit is installed (p.21).",
   "Three-phase scroll: check rotation - if not corrected within 5 minutes the internal protector shuts the compressor off; reverse the power leads (p.21).",
   "Recovering and recharging: evacuate to 500 microns, charge by scale to the rating plate, label the charge, leak test before leaving (p.21)."
  ],
  "safety": "CAUTION - unit damage hazard: when evaluating the refrigerant charge, an indicated adjustment to the specified factory charge must always be very minimal; if a substantial adjustment is indicated, an abnormal condition exists somewhere in the cooling system, such as insufficient airflow across either coil or both coils (p.21). Allow the system to operate a minimum of 15 minutes before checking or adjusting charge (p.21).",
  "manual": "carrier-50nt-b-install-50nt-04si",
  "pages": [
   21
  ],
  "source": "50NT-B (R-454B packaged heat pump) 50NT-B Comfort 13.4 SEER2 Single-Packaged Heat Pump (R-454B), 2-5 Tons - Installation Instruction (50NT-04SI, Ed. 12/24), p.21",
  "confidence": "manual"
 },
 {
  "id": "u-york-p5-a2l-blower-no-call",
  "unit": "^P[CG]5E(48|60)",
  "brand": "York",
  "equipment": "Other",
  "title": "Blower running with no call, no cooling or heat - A2L leak response (PC5 / PG5 4 and 5 ton)",
  "summary": "On the 4 and 5 ton PC5 / PG5 the board runs the blower at 95% and ignores every thermostat call while the A2L sensor reports a leak, then holds the blower 5 more minutes after it clears.",
  "steps": [
   "Look at both LEDs on the main control board. PG5: status rapid red + A2L solid red = leak (p.69). PC5: status solid red + A2L rapid red = leak (PC5 manual p.56).",
   "While the leak fault is active the board energizes the 95% blower speed and ignores all thermostat calls; the blower stays on 5 min after the leak signal is removed (p.22).",
   "Owner: keep power on and ventilate the space by opening windows if possible. Service: find and repair the leak, then adjust the charge (p.69).",
   "PG5 only: the sensor may also detect natural gas or propane - if no refrigerant leak is found, check the gas piping and gas heat components (p.69).",
   "Sensor problem, not a leak: PG5 - status LED 1 / 2 / 3 red flashes with the A2L LED solid red = sensor bypassed / communications lost / failure (p.69). PC5 - Table 35 prints these as status LED solid red with the A2L LED 1 / 2 / 3 red flashes (PC5 manual p.56), but the PC5 field test shows an unplugged sensor as status 2 red flashes + A2L solid red (PC5 manual p.22) - read both LEDs. Check the sensor plug and cable at the board's A2L terminal (p.69; PC5 manual p.56).",
   "The 2 and 3 ton (P*5E24 / P*5E36) have no sensor - this cause does not apply to them (p.22)."
  ],
  "safety": "WARNING: troubleshooting requires opening the control box with power connected - use extreme care with a live circuit (p.65). R-454B only; use R-454B rated equipment (p.64).",
  "manual": "york-pg5-install-6598649-uim-a-1225",
  "pages": [
   22,
   64,
   69,
   21,
   56
  ],
  "source": "PG5 15.2 SEER2 R-454B packaged AC with gas heat (PG5E24L05S21 - PG5E60L12S21) Installation Manual: PG5 Series - 208 V/230 V - 1 Phase, 15.2 SEER2 Packaged Air Conditioner with Gas Heat (6598649-UIM-A-1225, 2025-12-03), p.22, p.64, p.69, p.21, p.56",
  "confidence": "manual"
 },
 {
  "id": "u-york-pg5-no-heat-sequence",
  "unit": "^PG5E(24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Other",
  "title": "No gas heat - walking the PG5 ignition sequence",
  "summary": "The PG5 DSI board runs a fixed sequence; the step where it stops, plus the status LED, points to the part.",
  "steps": [
   "Call for heat (W): the board first checks the pressure switch is OPEN. If it is closed: 2 red flashes and it waits (p.60).",
   "Inducer on: the pressure switch must close - not within 5 s = 3 red flashes; not within 60 s = inducer 60 s off / 60 s on, repeating (p.61).",
   "15 s pre-purge, then a 5 s spark + gas valve trial. It lights on high fire and drops to low after 10 s if only W1 is calling (p.61).",
   "No flame in three trials = 7 red flashes, 1 h soft lockout. Check the gas valve switch is ON, gas pressure, flame sensor, ignitor, wiring, burners (p.68).",
   "Lights then drops out: flame lost five times in one call = 8 red flashes (p.61, p.68). Rapid amber = flame current below 1.5 µA - clean or replace the flame sensor (p.66).",
   "Blower comes on 30 s after the flame proving period starts; 15 s post-purge at the end; heat blower-off delay 60 / 90 / 120 / 180 s (p.61-62).",
   "Check gas pressures: natural gas inlet 4.5-10.5 in. W.C. (7 in. minimum for rated input), manifold 3.5 high / 1.6 low (p.45, p.47)."
  ],
  "safety": "DANGER: never run above the 180°F maximum supply air temperature - heat exchanger failure, carbon monoxide, fire (p.29, p.53). The manual reset rollout switch must be reset before allowing furnace operation (p.60); after a 5 or 11 red flash hard lockout, correct the problem, then cycle power to reset the board (p.67-68, p.70).",
  "manual": "york-pg5-install-6598649-uim-a-1225",
  "pages": [
   45,
   47,
   53,
   60,
   66
  ],
  "source": "PG5 15.2 SEER2 R-454B packaged AC with gas heat (PG5E24L05S21 - PG5E60L12S21) Installation Manual: PG5 Series - 208 V/230 V - 1 Phase, 15.2 SEER2 Packaged Air Conditioner with Gas Heat (6598649-UIM-A-1225, 2025-12-03), p.45, p.47, p.53, p.60, p.66",
  "confidence": "manual"
 },
 {
  "id": "u-york-p5-charge-check",
  "unit": "^P[CG]5E(24|30|36|42|48|60)",
  "brand": "York",
  "equipment": "Other",
  "title": "Checking the refrigerant charge - PC5 / PG5 (discharge superheat)",
  "summary": "These packaged units are checked by discharge superheat against the charging chart on the compressor barrier, not by suction superheat or subcooling.",
  "steps": [
   "Only connect gauges if you suspect a refrigerant circuit problem - the unit is critically charged and several ounces are lost each time a gauge is connected (p.71).",
   "Temperature probe on the compressor discharge line about 6 in. from the shell; high side gauge on the discharge pressure port (p.71).",
   "Convert discharge pressure to saturation temperature with an R-454B chart; the difference between discharge saturation temperature and discharge line temperature is discharge superheat (p.71).",
   "Read indoor entering wet bulb and outdoor dry bulb, and compare with the unit charging chart on the compressor barrier (p.19, p.71).",
   "After hot work or a refrigerant circuit repair, read the A2L safety guidance in full before charging; where applicable charge the rating-plate amount after a good vacuum (p.71). Factory charge: 2-8, 3-11, 4-7, 5-3 lb-oz for 2 / 3 / 4 / 5 ton (p.29)."
  ],
  "safety": "CAUTION: R-454B only - gauge sets, hoses, cylinders and recovery equipment must be R-454B rated. WARNING: wear safety glasses and gloves (p.64). CAUTION: POE oil can damage roofing - protect the roof (p.59).",
  "manual": "york-pg5-install-6598649-uim-a-1225",
  "pages": [
   19,
   29,
   59,
   64,
   71,
   18,
   28,
   57
  ],
  "source": "PG5 15.2 SEER2 R-454B packaged AC with gas heat (PG5E24L05S21 - PG5E60L12S21) Installation Manual: PG5 Series - 208 V/230 V - 1 Phase, 15.2 SEER2 Packaged Air Conditioner with Gas Heat (6598649-UIM-A-1225, 2025-12-03), p.19, p.29, p.59, p.64, p.71, p.18, p.28, p.57",
  "confidence": "manual"
 },
 {
  "id": "u-trane-n5hp4-defrost",
  "unit": "^N5HP4(?!036A)",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost - fault LED, forced defrost, termination jumper - Trane Advantage N5HP4 heat pump",
  "summary": "The N5HP4 demand defrost board reads an ambient and a coil sensor; faults flash on the FAULT LED (1-7), the STATUS LED shows it is alive.",
  "steps": [
   "The control measures outdoor ambient with a sensor outside the outdoor coil and coil temperature with a second sensor on the coil; the difference (delta-T) decides when to defrost, and the coil sensor ends the defrost.",
   "Normal: STATUS LED flashes once a second idle, twice a second with a call for heating or cooling. A fault flashes on the FAULT LED - 1 ambient sensor, 2 coil sensor, 3 low pressure switch open, 4 hard lockout, 5 soft lockout, 6 defrost cycles too close together, 7 low ambient soft lockout (Table 14). There is no 8 flash on this board.",
   "Checkout: 24 V AC between R and B; 24 V AC between Y, Y0 and B with the unit operating.",
   "Forced defrost: short TEST_COMMON to FRC_DFT for 2 seconds, remove the short after defrost starts. Shorting TEST_COMMON to TST speeds up all board timings.",
   "Termination is 47°F as shipped; clip resistor JPR2 for 70°F. Termination table: as shipped above 22°F outdoor = 47°F, 10-22°F = ODT + 25°F, 6-10°F = 35°F; JPR2 cut above 30°F = 47°F, 6-30°F = 70°F; below 6°F = 12 min. or 35°F every 3 hrs (Table 17).",
   "Sensor test: measure the temperature at the sensor, unplug it, read the ohms quickly and compare with the Defrost control thermistor table (19°F = about 46K ohms is good).",
   "The N5HP4 036A (guide ODR-SVX041A-EN) has a different 036-only defrost board with no fault table; this scenario does not apply to it."
  ],
  "safety": "When it is necessary to work with live electrical components, have a qualified licensed electrician or other individual who has been properly trained in handling live electrical components perform these tasks.",
  "manual": "trane-n5hp4-iom-odr-svx030b",
  "pages": [
   6,
   25,
   26,
   27,
   28
  ],
  "source": "N5HP4 (036B / 042B / 048B) Heat Pumps N5HP4018A, 024A, 030A, 036B, 042B, 048B, 060A - Installation, Operation, and Maintenance (ODR-SVX030B-EN, September 2026), p.6, p.25, p.26, p.27, p.28",
  "confidence": "manual"
 },
 {
  "id": "u-trane-n5hp5-defrost",
  "unit": "^N5HP5(?!036)",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Defrost - fault LED, forced defrost, termination jumper - Trane Advantage N5HP5 heat pump",
  "summary": "Same demand defrost board and 1-7 flash table as the N5HP4; the N5HP5 036 has its own board (see the last step).",
  "steps": [
   "Normal: STATUS LED flashes once a second idle, twice a second with a call. A fault flashes on the FAULT LED - 1 ambient sensor, 2 coil sensor, 3 low pressure switch open, 4 hard lockout, 5 soft lockout, 6 defrost cycles too close together, 7 low ambient soft lockout (Table 16).",
   "Checkout: 24 V AC between R and B; 24 V AC between Y, Y0 and B with the unit operating; defrost starts when FRC_DFT is shorted to TEST_COMMON.",
   "Forced defrost: short TEST_COMMON to FRC_DFT on J5 for 2 seconds, remove the short after defrost starts.",
   "Termination: 47°F as shipped; cut Jumper J2 for 70°F (termination table Table 6).",
   "Sensor test: measure the temperature at the sensor, unplug it, read the ohms quickly and compare with the Defrost control thermistor table (Table 14).",
   "N5HP5036A: the guide prints a separate 'Defrost Control - 036 Model Only' board - TST / FRC_DFT / TEST_COMMON pins, 'LED on board flashing 1 time/second', Jumper 2 for 70°F at or below 30°F ambient - and no fault table for it."
  ],
  "safety": "When it is necessary to work with live electrical components, have a qualified licensed electrician or other individual who has been properly trained in handling live electrical components perform these tasks.",
  "manual": "trane-n5hp5-iom-odr-svx031b",
  "pages": [
   6,
   19,
   20,
   27,
   28,
   29
  ],
  "source": "Heat Pumps N5HP5018A-060A - Installation, Operation, and Maintenance (ODR-SVX031B-EN, September 2026), p.6, p.19, p.20, p.27, p.28, p.29",
  "confidence": "manual"
 },
 {
  "id": "u-trane-n5hp4-charge-cold",
  "unit": "^N5HP4",
  "brand": "Trane",
  "equipment": "Condenser/Heat Pump",
  "title": "Charging below 55°F outdoor - weigh-in, then 10° subcooling in heating - Trane Advantage N5HP4",
  "summary": "Below 55°F the guide says weigh in the charge, check for at least 10° subcooling in heating, and come back in warm weather.",
  "steps": [
   "Subcooling in cooling is not recommended below 55°F outdoor; the recommended method below 55°F is weighing in the charge.",
   "The nameplate charge is the refrigerant shipped in the outdoor unit and is compatible with 10 ft of AHRI rated lines and the smallest AHRI rated coil (the same guide's Factory Charge section says 15 ft and the nominal rated coil).",
   "Measure the line from the service valve to the indoor unit and subtract 10 ft. Charge multiplier: 0.47 oz per foot for 3/8 in. liquid line, 0.30 oz per foot for 5/16 in.",
   "Wait 20 minutes for the system to stabilize between adjustments.",
   "In heating, check liquid line temperature and liquid gauge pressure for a minimum of 10° subcooling; add charge if it is not reached with the nameplate charge plus the charge already added.",
   "Write the factory, added and total charge on the Total System Charge label, and return in the spring or summer to charge in cooling with outdoor above 55°F."
  ],
  "safety": "Use only R-454B refrigerant and approved compressor oil. When opening the suction and liquid line service valve, turn the valve stem counterclockwise only until the stem contacts the rolled edge. Do not apply torque.",
  "manual": "trane-n5hp4-iom-odr-svx030b",
  "pages": [
   6,
   9,
   19,
   21,
   22,
   23
  ],
  "source": "N5HP4 (036B / 042B / 048B) Heat Pumps N5HP4018A, 024A, 030A, 036B, 042B, 048B, 060A - Installation, Operation, and Maintenance (ODR-SVX030B-EN, September 2026), p.6, p.9, p.19, p.21, p.22, p.23",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r96msn-read-status-codes",
  "unit": "^R96MSN",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Reading the 3-digit display and status light - R96MSN",
  "summary": "The R96MSN control shows a major.minor status code; the light through the door only flashes the major part.",
  "steps": [
   "Status light off: the status LED display stays off for 1 minute whenever MENU or NEXT is pressed - wait, then check 115V at L1 and L2, the door switch, the breaker, and 24V at SEC-1 / SEC-2 (no 24V = replace transformer; 24V present = replace furnace control).",
   "Rapid flash without a pause = check line voltage polarity; if twinned, check the 24V transformer phasing (code 10.1).",
   "Slow short / long flashes = the major code: short flashes are the first digit, long flashes the second. To see major and minor on the 3-digit display the door must be removed and the door switch closed.",
   "Last 7 faults: no thermostat call and all blower-off delays done, door off, hold the door switch in, press MENU/SELECT until FLt shows, then NEXT/OPTION to scroll. Faults stay 72 hours of powered operation; CLr clears them. 'non' = no stored faults.",
   "Do not tape the door switch or leave it bypassed - hold it in with one hand while pressing the buttons with the other, and do not touch uninsulated electrical components."
  ],
  "safety": "Blower access door switch removes 115V power to the control. Do not tape or permanently bypass the door switch. Do not touch uninsulated electrical components.",
  "manual": "icp-r96msn-install-r96msn-03si",
  "pages": [
   56,
   57,
   65,
   73
  ],
  "source": "R96MSN Installation, Start-up, Operating and Service and Maintenance Instructions (R96MSN-03SI, Edition 7/26, replaces R96MSN-02SI REV E), p.56, p.57, p.65, p.73",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r96msn-no-ignition-34",
  "unit": "^R96MSN",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "No heat - igniter / gas valve / flame sensor check (codes 34.1, 14.1) - R96MSN",
  "summary": "Uses the component test to split an ignition problem between igniter, gas valve and flame sensor.",
  "steps": [
   "Remove the R thermostat connection at the control and start the component test (Ct, idle mode, no W / Y / G). Does the igniter glow orange/white by the end of the 15 second warm-up?",
   "No glow: unplug the igniter harness from the control and start another component test. Check for 115V between pin 1 and NEUTRAL-L2 on the control for the 15 second period. No 115V = replace furnace control. 115V present = check for continuity in the harness and igniter; replace the defective component.",
   "Glows: reconnect the R thermostat lead and call for heat. Does the gas valve receive 24V across its connections? No = check connections; if OK, replace control.",
   "Does the gas valve open and allow gas to flow? No = check that all gas valves are turned on; replace valve.",
   "Do the main burners ignite? No = check for inadequate flame carryover or rough ignition, low inlet gas pressure, proper firing rate, blocked or incorrect carry-over gap (.045\" nominal).",
   "Burners stay on = allow the blower to come on and repeat the test to check for intermittent operation.",
   "Burners do not stay on: repeat the call for heat and check flame sensor current during the trial for ignition period. Below 0.5 DC microamps = clean the flame sensor with fine steel wool and recheck (nominal 4.0 to 6.0 microamps); still not near typical = replace electrode; burners still will not ignite and stay on = replace furnace control.",
   "Not below 0.5 microamps = check connections and retry. If current is near typical value (4.0-6.0 nominal) and burners will not stay on, replace control."
  ],
  "safety": "Temporarily depress the door switch with one hand; do not tape or bypass it; do not touch uninsulated electrical components.",
  "manual": "icp-r96msn-install-r96msn-03si",
  "pages": [
   57,
   75
  ],
  "source": "R96MSN Installation, Start-up, Operating and Service and Maintenance Instructions (R96MSN-03SI, Edition 7/26, replaces R96MSN-02SI REV E), p.57, p.75",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r96msn-replace-control",
  "unit": "^R96MSN",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Replacing the furnace control - programming the model number - R96MSN",
  "summary": "A new control must be programmed with the rating plate Model Program Number before the furnace will run.",
  "steps": [
   "Read the Model Program Number on the furnace rating plate.",
   "Program the new board by one of the two approved methods: the supported mobile app over NFC (QR code on the front of the manual), or the correct Super Plug for the control.",
   "Further details come with the replacement control board.",
   "On start-up the display alternates the Model Program Number (PRG) and software version (uEr) - check PRG matches the rating plate."
  ],
  "safety": "CAUTION - furnace overheating hazard: do NOT program the control board with a Model Program Number different than what is specified on the rating plate. Parameter options will not match design values.",
  "manual": "icp-r96msn-install-r96msn-03si",
  "pages": [
   54,
   55
  ],
  "source": "R96MSN Installation, Start-up, Operating and Service and Maintenance Instructions (R96MSN-03SI, Edition 7/26, replaces R96MSN-02SI REV E), p.54, p.55",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r92msn-read-status-codes",
  "unit": "^R92MSN",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Reading the status codes and fault history - R92MSN",
  "summary": "Same 3-digit display control and service label as the R96MSN.",
  "steps": [
   "The major status code is the first 2 digits of the display, the minor code the third digit; the LED through the door flashes only the major code (short flashes = first digit, long flashes = second).",
   "Improper 115V polarity = rapid flashing light and status code 10.1; the furnace will NOT operate.",
   "Last 7 faults: no thermostat call, door off, hold the door switch in, MENU/SELECT until FLt, NEXT/OPTION to scroll. Faults remain 72 hours of powered operation after the last fault.",
   "Codes and their checks are in Error Codes under ICP R-Series R96MSN / R92MSN."
  ],
  "safety": "Do not tape or permanently bypass the door switch; do not touch uninsulated electrical components.",
  "manual": "icp-r92msn2-install-r92msn2-03si",
  "pages": [
   51,
   59
  ],
  "source": "R92MSN Installation, Start-up, Operating and Service and Maintenance Instructions (R92MSN2-03SI, Edition 07/26, replaces R92MSN2-02SI), p.51, p.59",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r92msn-no-ignition-34",
  "unit": "^R92MSN",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "No heat - igniter / gas valve / flame sensor check (codes 34.1, 14.1) - R92MSN",
  "summary": "Same troubleshooting artwork as the R96MSN manual (drawing A221120).",
  "steps": [
   "Remove the R thermostat connection at the control and start the component test. Does the igniter glow orange/white by the end of the 15 second warm-up?",
   "No glow: unplug the igniter harness from the control and start another component test. Check for 115V between pin 1 and NEUTRAL-L2 on the control for the 15 second period. No 115V = replace furnace control. 115V present = check for continuity in the harness and igniter; replace the defective component.",
   "Glows: reconnect the R thermostat lead and call for heat. Does the gas valve receive 24V across its connections? No = check connections; if OK, replace control.",
   "Does the gas valve open and allow gas to flow? No = check that all gas valves are turned on; replace valve.",
   "Do the main burners ignite? No = check for inadequate flame carryover or rough ignition, low inlet gas pressure, proper firing rate, blocked or incorrect carry-over gap (.045\" nominal).",
   "Burners stay on = allow the blower to come on and repeat the test to check for intermittent operation.",
   "Burners do not stay on: repeat the call for heat and check flame sensor current during the trial for ignition period. Below 0.5 DC microamps = clean the flame sensor with fine steel wool and recheck (nominal 4.0 to 6.0 microamps); still not near typical = replace electrode; burners still will not ignite and stay on = replace furnace control.",
   "Not below 0.5 microamps = check connections and retry. If current is near typical value (4.0-6.0 nominal) and burners will not stay on, replace control."
  ],
  "safety": "Temporarily depress the door switch with one hand; do not tape or bypass it.",
  "manual": "icp-r92msn2-install-r92msn2-03si",
  "pages": [
   68
  ],
  "source": "R92MSN Installation, Start-up, Operating and Service and Maintenance Instructions (R92MSN2-03SI, Edition 07/26, replaces R92MSN2-02SI), p.68",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r95msu-pressure-transducer",
  "unit": "^R95MSU",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Codes 23.3 / 31.4 / 31.5 - pressure transducer - R95MSU",
  "summary": "The R95MSU proves draft with a pressure transducer: about 0.50 Vdc at 0 in. w.c.",
  "steps": [
   "23.3 over pressure at start-up: transducer output above 0.65 Vdc at the start of the heating sequence; ignition waits until the signal returns to range. Nominal output at 0 in. w.c. is about 0.50 Vdc.",
   "23.3 check for: proper vent sizing, obstruction in pressure tubing, defective transducer, defective transducer wiring, excessive wind.",
   "31.4 / 31.5 loss of pressure before / after the blower comes on: transducer does not sense target pressure or pressure is out of range of the operating stage.",
   "31.4 / 31.5 check for: proper vent sizing, low inducer voltage (115V), inadequate combustion air supply, disconnected or obstructed pressure tubing, defective inducer motor, defective pressure transducer, excessive wind, restricted vent system.",
   "Cleaning the collector box: disconnect the transducer tube from the transducer port and keep it higher than the collector box opening; clean the port with a small wire and shake water out of the tube; do NOT blow into the tube with it connected to the transducer."
  ],
  "safety": "Turn off gas and electrical supplies before cleaning. Do not bypass the pressure switch / pressure transducer or any other safety control.",
  "manual": "icp-r95msu-install-r95msu-03si",
  "pages": [
   4,
   48,
   58,
   63,
   64
  ],
  "source": "R95MSU Installation, Start-up, Operating and Service Maintenance Instructions (R95MSU-03SI, Edition 7/26, replaces R95MSU-02SI), p.4, p.48, p.58, p.63, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r95msu-bts-lockout",
  "unit": "^R95MSU",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Code 26.1 - burner thermal switch (BTS) permanent lockout - R95MSU",
  "summary": "An open BTS during a call for heat locks the furnace out until power is cycled.",
  "steps": [
   "Code 26.1: BTS open during a call for heat = permanent lockout. Cycle power to reset.",
   "At power-up with the BTS open, the inducer runs during the 90-second blower-on period; if the BTS does not reset in that time a permanent lockout results (power must be cycled).",
   "Check for a blocked burner inlet, a blocked burner mesh, a power loss during heating that made the BTS open, and correct manifold pressure and gas firing rate."
  ],
  "safety": "Do not bypass any safety control, including the rollout or burner thermal switch (WARNING p.4).",
  "manual": "icp-r95msu-install-r95msu-03si",
  "pages": [
   4,
   48,
   60,
   64
  ],
  "source": "R95MSU Installation, Start-up, Operating and Service Maintenance Instructions (R95MSU-03SI, Edition 7/26, replaces R95MSU-02SI), p.4, p.48, p.60, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r95msu-no-ignition",
  "unit": "^R95MSU",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "No heat - igniter at PL8 / gas valve / flame sensor (codes 34.x, 14.x) - R95MSU",
  "summary": "The R95MSU guide tests the igniter at PL8 and checks igniter resistance 40-70 ohms.",
  "steps": [
   "To find whether the problem is the gas valve, igniter or flame sensor, run the component test: first remove the R thermostat connection from the furnace control.",
   "Unplug the igniter at PL8 and start the component test. The inducer starts, and after 10 seconds the igniter output is energized for 15 seconds. Check for 115V between PL8-1 and NEUTRAL-L2 on the control. No 115V = replace furnace control.",
   "115V present: check for continuity in the igniter harness - is the resistance between 40 and 70 ohms? No = replace the defective component.",
   "Yes: reconnect the igniter harness, reconnect the R thermostat lead and call for heat. Does the gas valve receive 24V? No = check connections; if OK, replace control.",
   "Does the gas valve open and allow gas to flow? No = check that all gas valves are turned on; replace valve.",
   "Do the main burners ignite? No = check for rough ignition, low inlet gas pressure, proper firing rate.",
   "Burners stay on = allow the blower to come on and repeat the test to check for intermittent operation.",
   "Burners do not stay on: check flame sensor current during the trial for ignition. Below 0.5 DC microamps = clean the flame sensor with fine steel wool and recheck (nominal 4.0 to 6.0 microamps); not near typical = replace electrode; still will not ignite and stay on = replace furnace control. Not below 0.5 = check connections and retry; near typical (4.0-6.0) and burners will not stay on = replace control.",
   "When servicing the flame sensor use only the factory-provided 1/4-in. length screws - alternate screws will damage unit components (WARNING, p.57)."
  ],
  "safety": "Use only the factory-provided 1/4-in. screws on the flame sensor (WARNING p.57).",
  "manual": "icp-r95msu-install-r95msu-03si",
  "pages": [
   57,
   64
  ],
  "source": "R95MSU Installation, Start-up, Operating and Service Maintenance Instructions (R95MSU-03SI, Edition 7/26, replaces R95MSU-02SI), p.57, p.64",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r80msu-inducer-rpm",
  "unit": "^R80MSU",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "Codes 42.1 / 42.2 / 42.3 - inducer RPM feedback - R80MSU",
  "summary": "The control watches inducer RPM pulses; no pulses or too-high RPM sets a 42 code.",
  "steps": [
   "Inducer motor fault: RPM pulses not detected within 20 seconds after a heat request, inducer outside its valid range, RPM signal lost for 5 seconds during operation, or RPM above the model-specific limit.",
   "42.1 = no RPM feedback at start-up or before ignition proved; 42.2 = after ignition proved; 42.3 = exceeding the inducer RPM limit.",
   "Check for: proper vent sizing, restricted combustion air supply, failed inducer motor, improper or loose motor wiring or bad connection, frozen or blocked drain."
  ],
  "safety": "Do not bypass any of the safety controls, including the main limit switch, rollout or burner thermal switch and the pressure switch / pressure transducer (WARNING, R80MSU-03SI p.3).",
  "manual": "icp-r80msu-install-r80msu-03si",
  "pages": [
   24,
   39
  ],
  "source": "R80MSU Installation, Start-up, Operating and Service and Maintenance Instructions (R80MSU-03SI, Edition 11/25, replaces R80MSU-02SI), p.24, p.39",
  "confidence": "manual"
 },
 {
  "id": "u-icp-r80msu-no-ignition",
  "unit": "^R80MSU",
  "brand": "ICP",
  "equipment": "Gas Furnace",
  "title": "No heat - ignition fault 34.1 / lockout 14 - R80MSU",
  "summary": "Check list first, then the component-test flowchart.",
  "steps": [
   "Check for: Oxide buildup on flame sensor (clean with fine steel wool); Proper flame sense microamps (.5 microamps D.C. min., 4.0 - 6.0 nominal); Gas valve defective or turned off; Low inlet gas pressure; Control ground continuity; Manual shut-off valve; Green/Yellow wire MUST be connected to furnace sheet metal; Flame sensor must not be grounded or touching casing; Inadequate flame carryover or rough ignition.",
   "IGNITION PROVING FAILURE (guide): if flame is not sensed during the trial for ignition period, the control will repeat the ignition sequence 3 more times before lockout #14 occurs. If flame signal is lost during the blower on-delay period, the blower will come on for the selected blower off-delay.",
   "Component test check of the igniter: first remove the R thermostat connection from the control and start the component test sequence. Does the igniter glow orange/white by the end of the 15 second warm-up period?",
   "No glow: unplug the igniter harness from the control and start another component test. Check for 115V between pin 1 and NEUTRAL-L2 on the control for the 15 second period. No 115V = replace furnace control. 115V present = check for continuity in the harness and igniter; replace the defective component.",
   "Glows: reconnect the R thermostat lead and call for heat. Does the gas valve receive 24V? No = check connections; if OK, replace control.",
   "Does the gas valve open and allow gas to flow? No = check that all gas valves are turned on; replace valve.",
   "Do the main burners ignite? No = check for rough ignition, low inlet gas pressure, proper firing rate, blocked or incorrect carry-over gap (.045\" nominal).",
   "Burners stay on = allow the blower to come on and repeat the test to check for intermittent operation.",
   "Burners do not stay on: check flame sensor current during the trial for ignition. Below 0.5 DC microamps = clean the flame sensor with fine steel wool and recheck (nominal 4.0 to 6.0 microamps); not near typical = replace electrode; still will not ignite and stay on = replace furnace control. Not below 0.5 = check connections and retry; near typical (4.0-6.0) and burners will not stay on = replace control."
  ],
  "safety": "Do not bottom out the gas valve regulator adjusting screw; do not redrill orifices (p.26).",
  "manual": "icp-r80msu-install-r80msu-03si",
  "pages": [
   26,
   40
  ],
  "source": "R80MSU Installation, Start-up, Operating and Service and Maintenance Instructions (R80MSU-03SI, Edition 11/25, replaces R80MSU-02SI), p.26, p.40",
  "confidence": "manual"
 }
];
