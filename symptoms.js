/*
 * Symptom-based diagnostic help — for problems with no error code showing,
 * or as a first pass before digging into a specific board fault.
 * Same "starter, verify in field" caveat as data.js.
 */

const SYMPTOMS = [
{ id:"s-noheat-furnace", equipment:"Gas Furnace", title:"No heat — gas furnace", summary:"Thermostat calls for heat but furnace does not fire.", steps:[
  "Confirm thermostat is set to Heat, setpoint above room temp, and has power/batteries",
  "Confirm furnace switch (looks like a light switch near unit) and door panel are fully engaging the safety switch",
  "Check breaker/disconnect for the furnace",
  "Check gas supply valve is open and other gas appliances work",
  "Pull the panel and read the control board LED — look up the flash code in Error Codes",
  "If no LED at all, check 24V transformer output and board fuse",
], safety:"If you smell gas, stop — do not flip switches. Evacuate and follow gas leak procedure.", confidence:"common" },

{ id:"s-nocool", equipment:"Condenser/Heat Pump", title:"No cooling — AC not running", summary:"Thermostat calls for cool, indoor blower may run, but outdoor unit doesn't start.", steps:[
  "Confirm thermostat calling for cool and set below room temp",
  "Check outdoor disconnect and breaker",
  "Listen/look for contactor pulling in at the condenser — if not, check 24V control signal at contactor coil",
  "If contactor pulls in but compressor doesn't run, check capacitor and compressor windings (ohm out common/run/start)",
  "If compressor hums but doesn't start, suspect a bad run capacitor or locked rotor",
  "Check for tripped high/low pressure switch — see Condenser/Heat Pump lockout codes in Error Codes",
], safety:"Discharge capacitors safely before handling — they hold a charge after power is off.", confidence:"common" },

{ id:"s-weakairflow", equipment:"Air Handler", title:"Weak or low airflow at registers", summary:"System runs but airflow feels weak throughout the house.", steps:[
  "Check and replace air filter if dirty/clogged",
  "Confirm all supply/return registers and dampers are open",
  "Check blower speed tap/setting matches system requirements",
  "Inspect blower wheel for dirt buildup",
  "Check evaporator coil for ice or heavy dirt buildup (restricts airflow)",
  "Check ductwork for collapsed/disconnected sections, especially flex duct in attics/crawlspaces",
], confidence:"common" },

{ id:"s-blank-thermostat", equipment:"Other", title:"Thermostat blank / unresponsive", summary:"Thermostat display is off or not responding to input.", steps:[
  "Check/replace batteries if battery powered",
  "Check furnace/air handler breaker and switch — most thermostats are powered off the equipment's 24V, not a separate circuit",
  "Check the C-wire connection at both thermostat and equipment board",
  "Check the low-voltage fuse on the control board (often a small automotive-style fuse) — a short in field wiring blows this",
  "If fuse keeps blowing, check thermostat wire for a short (nail through wire, bare wires touching) along its run",
], confidence:"common" },

{ id:"s-shortcycle", equipment:"Gas Furnace", title:"Furnace short cycling", summary:"Furnace fires, runs briefly, shuts off, then repeats.", steps:[
  "Check filter and overall airflow — restricted airflow trips the high limit repeatedly",
  "Confirm blower is running at correct speed and starting promptly on a heat call",
  "Check flame sensor — weak/dirty sensor can cause flame to drop out mid-cycle then retry",
  "Check thermostat location for a heat source (sunlight, supply vent) causing it to satisfy early",
  "Verify gas pressure is within spec — low pressure can cause flame instability",
], confidence:"common" },

{ id:"s-iceonac", equipment:"Condenser/Heat Pump", title:"AC/evaporator coil freezing up", summary:"Ice visible on the indoor coil, refrigerant lines, or outdoor unit.", steps:[
  "Turn system to Off / fan-only and let it fully thaw before diagnosing further",
  "Check filter and airflow across the indoor coil first — the most common cause",
  "Check blower operation, speed, and wheel condition",
  "Once thawed, check refrigerant charge (subcooling/superheat) against manufacturer spec — low charge is the #2 cause",
  "Inspect for a restriction (kinked line, clogged filter drier) if charge is correct but still freezes",
], confidence:"common" },

{ id:"s-warmair-ac", equipment:"Condenser/Heat Pump", title:"AC blowing warm air", summary:"System runs continuously but air at the register isn't cold.", steps:[
  "Confirm thermostat is actually calling for cooling, not fan-only",
  "Check outdoor unit is running — fan spinning, compressor audible",
  "Check refrigerant charge and pressures against gauges",
  "Check for a dirty/blocked outdoor condenser coil restricting heat rejection",
  "On a heat pump, confirm reversing valve is in the correct position for the season",
], confidence:"common" },

{ id:"s-runscontinuously", equipment:"Other", title:"System runs constantly, never satisfies", summary:"Equipment runs nonstop without reaching setpoint or cycling off.", steps:[
  "Verify thermostat setpoint and confirm it isn't mis-calibrated (compare to a separate thermometer)",
  "Check system is properly sized/not drastically undersized for the load on extreme days",
  "For cooling: check refrigerant charge and airflow — low capacity from either will cause this",
  "For heating: check for excessive heat loss (open windows/doors, poor insulation) or undersized furnace",
  "Check for a stuck-open damper mixing in outdoor/unconditioned air if it's a zoned system",
], confidence:"common" },

{ id:"s-waterleak", equipment:"Air Handler", title:"Water leaking from indoor unit", summary:"Water pooling or dripping near the air handler/furnace coil.", steps:[
  "Check primary condensate drain line for clogs (algae is common) — clear with wet/dry vac or drain cleaner made for condensate lines",
  "Check condensate pump (if present) is running and not jammed",
  "Check drain pan for cracks or rust-through",
  "Confirm unit is level — a tilted pan can overflow even with a working drain",
  "Check float switch (if equipped) is wired and functioning — it should shut the system down before an overflow, not cause one",
], confidence:"common" },

{ id:"s-burningsmell", equipment:"Other", title:"Burning smell from equipment", summary:"Tech or homeowner reports an electrical or burning odor.", steps:[
  "Shut the unit off at the disconnect/breaker immediately before further diagnosis",
  "Inspect wiring, relays, and contactor for scorch marks or melted insulation",
  "Check motor windings (blower/inducer/condenser fan) for overheating — a seized bearing is a common cause",
  "A brief odor on first fire of the season from a gas furnace can be normal dust burn-off — this is different from an ongoing electrical smell",
], safety:"Do not re-energize until the source is found. A burning smell can indicate a fire risk.", confidence:"common" },

{ id:"s-noise", equipment:"Other", title:"Loud or unusual noise from unit", summary:"Grinding, squealing, banging, or rattling noise.", steps:[
  "Squealing: check blower motor bearings",
  "Grinding: check blower wheel or motor bearings for wear",
  "Banging at startup: check for a loose panel, or on a compressor, possible flooded start / liquid refrigerant migration",
  "Rattling: check for loose panels, screws, or debris in the blower wheel/outdoor fan",
  "Clicking with no start: check contactor/relay for a chattering or worn contact",
], confidence:"common" },

{ id:"s-breaker-trip", equipment:"Other", title:"Breaker trips or fuse blows repeatedly", summary:"Equipment disconnect breaker/fuse fails shortly after reset.", steps:[
  "Do not just keep resetting — repeated trips indicate a real fault, not a nuisance trip",
  "Inspect for an obvious short: burnt wiring, chewed wire insulation, water intrusion",
  "Megger or ohm out the compressor/motor windings to ground for a ground fault",
  "Check capacitor for a shorted condition",
  "Verify the breaker/fuse is correctly sized for the equipment's MCA/MOCP rating — undersized breakers nuisance-trip"
], safety:"Treat repeated trips as a potential short to ground — verify before re-energizing.", confidence:"common" },

{ id:"s-daikin-fit-comm-fail", equipment:"Condenser/Heat Pump", title:"Daikin FIT — indoor/outdoor communication failure (no fault code)", summary:"System won't communicate between indoor and outdoor units — use this before assuming a board is bad. From Daikin's official FIT troubleshooting guide.", steps:[
  "Confirm low-voltage wiring is correct per install instructions — check for miswiring (e.g. Terminal 1 and 2 reversed)",
  "Check communication wires for physical damage (broken wire at terminal, damaged cable between units)",
  "Perform a continuity check on the communication wires; replace the cable if it fails",
  "Flip both DS1 dip switches on the outdoor unit control board to the opposite position, then re-check",
  "Read the board's Red Communications LED: OFF = normal; 1 flash = communications failure (verify wiring, press LEARN button); 2 flashes = normal out-of-box reset",
  "Read the board's Green Receive LED: OFF = no power/open fuse/comm error (check breakers/fuses, press LEARN button, check terminal 1/2 wiring for shorts); steady flash = no network found (check for broken wire or legacy non-communicating install); rapid flash = normal traffic; solid ON = Terminal 1/2 miswired or shorted to C/R",
], confidence:"common" },

{ id:"s-lennox-s40-comm-error", equipment:"Other", title:"Lennox S40 thermostat — communication errors with indoor/outdoor units", summary:"S40 reports communication errors between the thermostat and equipment boards. Inductive voltage bleeding onto the communication bus is a common, easy-to-miss cause.", steps:[
  "With only the R wire connected at the indoor board, check voltage on every other disconnected wire back to 24V Common (C) — repeat the same check at the outdoor unit and at the thermostat",
  "Each disconnected wire should read no more than 0.7 VAC — anything higher indicates inductive voltage bleed onto the communication bus, which will cause communication errors",
  "If a wire is bleeding voltage, re-run or re-bundle that conductor away from line-voltage wiring, or replace the run if damaged",
  "Verify voltage at R-C (should read normal 24VAC) and at the I+/I- communication pair at the thermostat, indoor board, and outdoor board",
], confidence:"common" },

{ id:"s-lennox-s40-defrost-dualfuel", equipment:"Condenser/Heat Pump", title:"Lennox S40 — heat pump not defrosting properly, or dual-fuel not switching over correctly", summary:"Two S40 commissioning settings that are easy to leave at default and cause real field complaints.", steps:[
  "Check the Heat Pump Defrost Termination Temp (Menu > Settings > Advanced Settings > View Support Service Control Center > Equipment Settings > Heat Pump): factory default is 50°F, which is too low for most climates — Lennox recommends changing to 90°F (or 100°F in cold climates) on every heat pump install",
  "For dual-fuel systems (communicating heat pump + gas furnace), check Balance Point Control (Equipment Settings > Thermostat > Balance Point Control): above the High Balance Point the heat pump runs alone; between High and Low, 1st stage is heat pump and 2nd stage switches to furnace; below the Low Balance Point the furnace runs alone",
  "Defaults for balance points are HBP 50°F / LBP 25°F — confirm these were actually set to the values agreed with the customer, not left at default",
  "Lennox does not recommend locking out the heat pump entirely at any outdoor temp when paired with an air handler that has backup electric heat",
], confidence:"common" },

{ id:"s-lennox-s40-wifi", equipment:"Other", title:"Lennox S40 — won't connect to Wi-Fi / no cloud connection", summary:"Thermostat won't join the customer's network or won't show connected to the Lennox server.", steps:[
  "Check signal strength: Menu > Settings > Wi-Fi > select the network > check RSSI — it must be stronger than -70 (e.g. -65 is fine, -80 is not) or the S40 won't hold a connection",
  "Never connect to a \"Guest\" network — it will not maintain a reliable connection",
  "Prefer the 2.4 GHz band over 5.0 GHz if the router broadcasts both",
  "After joining, check \"Thermostat Connectivity Status\" for three green checkmarks confirming it reached the Lennox server — if any are missing, re-check the network credentials and signal strength",
], confidence:"common" },

{ id:"s-daikin-ms-wont-start", equipment:"Mini-Split", title:"Daikin mini-split — won't start, or operation stops intermittently", summary:"No error code showing, but the unit won't run or keeps dropping out. From Daikin's official single-zone service manual.", steps:[
  "Check that rated line voltage is actually being supplied to the unit",
  "Confirm the indoor unit type is a compatible match with the outdoor unit",
  "Check outdoor ambient temperature — heating is locked out above 24°C (75.2°F) outdoor, and cooling is locked out below 10°C (50°F) outdoor; this is normal operating-range behavior, not a fault",
  "For intermittent stops: a brief 2-10 cycle power blip will stop the unit with the operation lamp going off — check for a flaky power connection or upstream electrical issue",
  "Check the wired remote's address setting matches the indoor unit if using multiple zones/remotes",
  "Use Check Method 1 on the remote (see the other Daikin mini-split entry in this list) to see if a fault code is actually stored even though nothing shows on the unit itself",
], confidence:"common" },

{ id:"s-daikin-ms-no-cool-heat", equipment:"Mini-Split", title:"Daikin mini-split — runs but doesn't cool or heat (or is noisy)", summary:"Unit operates normally but capacity is poor, or you hear abnormal noise/vibration. From Daikin's official single-zone service manual.", steps:[
  "Check wiring and refrigerant piping connections between the indoor and outdoor unit for errors",
  "Check that thermistors are securely mounted — a loose thermistor reads incorrectly without necessarily throwing a fault code",
  "Set the unit to cooling and check the liquid line temperature to confirm the electronic expansion valve (EEV) is actually modulating",
  "Check refrigerant charge via service port pressures and operating current — compare against the charge chart for signs of shortage",
  "For noise/vibration: check the power module output voltage, and confirm the unit has the manufacturer-specified installation clearances",
], confidence:"common" },

{ id:"s-daikin-ms-remote-code-check", equipment:"Mini-Split", title:"Daikin mini-split — reading the error code from the wired remote (no code shown)", summary:"Pulls a stored fault code off a Daikin wired remote (ARC452 series) even when the indoor unit itself isn't displaying one. From Daikin's official single-zone service manual, \"Check Method 1.\"", steps:[
  "Hold the TIMER CANCEL button on the remote for 5 seconds — \"00\" appears on the temperature display",
  "Press TIMER CANCEL repeatedly, listening for the beep pattern: a short beep or two consecutive beeps means that code doesn't match; a single long beep means you've found the stored code",
  "Note the code number shown when you hear the long beep — that's the stored fault code (cross-reference it in Error Codes)",
  "To exit, hold TIMER CANCEL for 5 seconds again, or just leave the remote untouched for 60 seconds and it returns to normal mode on its own",
  "If the code isn't found this way, use Check Method 2 instead: press TEMP▲, TEMP▼, and MODE simultaneously to enter diagnosis mode, then use TEMP▲/▼ and MODE to step through left-side then right-side digits by ear the same way",
], confidence:"common" },

{ id:"s-txv-testing", equipment:"Air Handler", title:"Suspected TXV problem — how to test it", summary:"A mechanical thermostatic expansion valve (TXV) that's stuck, hunting, or lost its bulb charge causes symptoms that look like a refrigerant charge problem. This walks through telling the two apart and confirming the valve itself. Applies to standard mechanical TXVs — not Daikin's electronic EEV, which doesn't apply here.", steps:[
  "Recognize the pattern first: abnormally HIGH, steady superheat with low suction pressure usually means the valve is underfeeding/starving the coil (stuck closed, clogged, lost charge, or restricted). Abnormally LOW or wildly fluctuating (\"hunting\") superheat usually means the valve is overfeeding (stuck open, oversized, or bulb not sensing correctly)",
  "Rule out a charge problem first — check subcooling at the condenser/liquid line; if subcooling is normal but superheat is way off, the problem is downstream of the valve (the TXV or the coil), not the charge itself",
  "Check the sensing bulb: it must be clamped tightly (not loose or swinging free) directly to a clean, bare section of the suction line, insulated from ambient air, and mounted per the manufacturer's clock-position spec (commonly 4 or 8 o'clock on horizontal lines, not on the bottom)",
  "Bulb response test: with the system running steady, warm the bulb by hand or with a heat gun (careful, gentle heat) — the valve should open further, suction pressure should rise and superheat should drop within a minute or two",
  "Then cool the bulb — pack it in ice or chill it with refrigerant-safe canned air upside down — the valve should throttle down, suction pressure should drop and superheat should rise. No response in either direction points to a lost charge in the valve's power element (replace the valve) or a bulb that isn't making good thermal contact (reclamp/reinsulate and retest before condemning the valve)",
  "Check the external equalizer line (if equipped) isn't kinked, plugged, or miswired — a plugged equalizer causes exactly the same erratic/overfeeding symptoms as a bad valve",
  "Check for a restriction ahead of the valve: a partially clogged filter drier or moisture/wax buildup at the valve inlet mimics a stuck-closed TXV — if you have gauge access on both sides of the valve, a pressure drop far beyond normal across the valve at a given load points to a physical restriction rather than a valve response issue",
  "If bulb response is confirmed working (pressure/superheat clearly react to heating and cooling the bulb) but superheat still won't settle in range, suspect an undersized/oversized valve for the application, a non-adjustable valve with the wrong factory superheat setting, or a mismatched orifice size for the tonnage — not a \"bad\" valve",
], confidence:"common" },

{ id:"s-ut3000-lcd-messages", equipment:"Other", title:"UT3000 zone controller (Daikin FIT) — LCD status/alert screens explained", summary:"The EWC UT3000 zone panel shows plain-language status screens instead of numeric codes for most conditions. From EWC's official Technical Bulletin.", steps:[
  "\"! SAS Sensor Bad !\" (Supply Air Sensor): sensor disconnected or failed — UT3000 defaults to Timed Mode staging until zone demands are satisfied",
  "\"! OAS Sensor Bad !\" (Outside Air Sensor): sensor disconnected or failed — UT3000 defaults to emergency/high heat for all heating demands. Note: this is also a reliable sign the UT3000 has lost communication with the outdoor unit — check that first",
  "\"System TOO HOT\" / \"System TOO COLD\": actual supply air temperature has exceeded the target setpoint by more than the configured OT/UT offset — check the HVAC system's actual output, not just the UT3000 settings",
  "\"R32 Call Service\": the UT3000 received an alarm signal passed through from Daikin FIT communicating equipment (via the system wiring, no separate device needed). The panel will shut off the equipment, open all zones, and run the fan to ventilate. Treat this as a real equipment alarm — contact for service/diagnose immediately rather than resetting and moving on",
  "\"System HC Change\" / \"System CH Change\" (with a zone number, e.g. Z1/Z3): shown when zones have opposing heat/cool demands at the same time — the panel is honoring whichever mode was called first and will hold the opposite-mode zone's damper closed for up to 20 minutes before switching over",
], confidence:"common" },

{ id:"s-ut3000-wiring-troubleshoot", equipment:"Other", title:"UT3000 zone controller (Daikin FIT) — dead panel/zone, thermostats won't power, or dampers won't respond", summary:"Wiring/breaker-level troubleshooting for the EWC UT3000 zone panel. From EWC's official Technical Bulletin.", steps:[
  "Entire panel dead (LCD and LEDs both dark): the main 2.5A (F1) breaker has likely tripped from a short — it will feel warm/hot to the touch. Remove each hot wire connected to the panel one at a time until the panel comes back; the wire you removed when it recovered is the shorted one — repair or replace it before reconnecting",
  "Single zone or a group of devices dead, rest of panel fine: a 140mA, 350mA, or 100mA breaker tripped — these protect individual thermostat/damper motor field wiring blocks. Remove each hot wire on that block one at a time the same way to isolate the short",
  "If a communicating thermostat's zone has a short on the Data 1/Data 2 wires (or those wires are shorted to 24V or ground), that thermostat will show \"Call for Service\" — a non-communicating thermostat on a shorted 24V circuit simply won't power up at all",
  "Check BIAS DC voltage between the data wires and C: normal is Data 1 to C = 2.8V & Data 2 to C = 2.2V, or Data 1 to C = 1.9V & Data 2 to C = 1.3V (a CAPE coil + 2-stage furnace combo reads Data 1 to C = 2.3V & Data 2 to C = 1.7V instead) — voltages outside these pairs point to a wiring or bias dip-switch problem",
  "Confirm BIAS dip switches #1 and #2 on the bottom of the UT3000 are set to ON",
  "Thermostats won't power up / system doesn't respond at all: check the HVAC system's own transformer and the UT3000's transformer voltage, fuses, and breakers separately — then ohm out all field wiring for continuity, shorts to 24V common, and shorts to earth ground",
  "Dampers don't respond but LCD/LEDs and the HVAC system otherwise work fine: check damper motor wiring for correct connections and output voltage, and confirm you haven't connected too many or incompatible dampers to a single zone block",
  "Cooling won't run at all and the zone thermostat shows an E11 fault code: disconnect the wires from the \"R\" terminals on the UT3000 thermostat blocks and the \"C/PO/PC\" terminals on the damper motor blocks, restore power, and see if the short clears — if so, ohm out that field wiring for shorts/continuity and repair before reconnecting",
  "After any wiring repair: clear all fault codes in both the outdoor and indoor unit diagnostic menu folders (accessible from the Zone 1 thermostat, or directly from the UT3000 panel via the Equipment Menu Access procedure), then re-run the System Startup Test — some Daikin systems require this before they'll operate normally again",
  "Stuck on a time delay that's blocking heat/cool: press and hold the Back and Forward buttons on the panel simultaneously for 1 second to bypass an active time delay while troubleshooting",
], confidence:"common" },

// ---------------- GAUGE READING DIAGNOSTICS — head/suction pressure quadrant chart ----------------
{ id:"s-gauges-high-head-high-suction", equipment:"Condenser/Heat Pump", title:"High head pressure + high suction pressure", summary:"Both gauges read higher than normal for the outdoor temp/return air conditions.", steps:[
  "Confirm gauge readings against actual outdoor ambient and return air conditions before assuming a fault — both naturally run higher on a hot/humid day or with a high return air temperature load",
  "Check for refrigerant overcharge — compare against the manufacturer's charge chart/subcooling target",
  "Check the condenser coil and airflow — a dirty coil, weak/failed condenser fan motor, recirculating discharge air, or blocked outdoor unit clearance all raise head pressure while suction rides along with it",
  "Check for non-condensables (air/moisture) in the system — a system that's been opened without pulling a proper deep vacuum shows both pressures elevated, with head pressure abnormally high relative to outdoor temp on the P/T chart",
  "Rule out a bad condenser fan capacitor/motor before condemning the coil as simply dirty",
  "If both pressures are high and superheat is low, lean toward overcharge; if both are high with normal-to-high superheat, lean toward airflow restriction or non-condensables first",
], confidence:"common" },
{ id:"s-gauges-high-head-low-suction", equipment:"Condenser/Heat Pump", title:"High head pressure + low suction pressure", summary:"The classic sign of a restriction between the condenser outlet and the metering device — refrigerant is backing up ahead of the blockage and starving everything downstream.", steps:[
  "Check the liquid line filter drier for a temperature drop across it (it should read the same temp in and out) — a noticeable drop, or a frost/sweat spot on the drier body, means it's restricted; replace it",
  "Check for a kinked, crushed, or undersized liquid line",
  "Confirm the liquid line service valve is fully open, not just cracked",
  "Check for a solenoid valve (if equipped) stuck partially closed in the liquid line",
  "Feel or measure the liquid line temperature just ahead of the metering device — it should be close to the condensing temperature; a sharp drop confirms the restriction is right at that point",
  "Once the restriction is cleared, recheck subcooling and superheat against spec before closing out the call — don't add refrigerant to compensate for a restriction",
], safety:"If pressures are extreme, treat as a possible severe restriction — recover and depressurize properly before opening any fitting, don't force a stuck valve under pressure.", confidence:"common" },
{ id:"s-gauges-low-head-high-suction", equipment:"Condenser/Heat Pump", title:"Low head pressure + high suction pressure", summary:"Points to the compressor not compressing properly, or a metering device/reversing valve overfeeding or bypassing refrigerant.", steps:[
  "Check compressor amp draw against RLA on the nameplate — a compressor with worn or leaking internal valves draws lower amps than the load would suggest and simply can't build head pressure, even though suction stays up",
  "On a heat pump, check the reversing valve for internal bypass (hot gas leaking across the valve instead of fully switching) — feel all four reversing valve line temperatures; a valve that isn't fully shifting or is leaking internally produces exactly this pattern",
  "Check the metering device (TXV/EEV) for a stuck-open or overfeeding condition — see the TXV testing entry in this list for the bulb response test",
  "Rule out an oversized or wrong orifice/TXV for the system's tonnage",
  "If compressor amps and sound both point to internal wear, confirm before condemning it — this is a compressor replacement, not a charge or airflow fix",
], safety:"A compressor with internal valve damage can still run and draw current while failing to pump properly — don't assume it's simply 'weak' without verifying amp draw against RLA first.", confidence:"common" },
{ id:"s-gauges-low-head-low-suction", equipment:"Condenser/Heat Pump", title:"Low head pressure + low suction pressure", summary:"Usually a charge problem (undercharge/leak) or the system is starved of airflow/load across the evaporator.", steps:[
  "Check the evaporator coil and filter first — a dirty filter, iced-over coil, or failed indoor blower starves the whole system of load and drops both pressures together; this is more common in the field than an actual leak",
  "If airflow checks out fine, suspect undercharge — check subcooling and superheat against the charge chart, then leak search before adding refrigerant",
  "Check for a mostly or fully plugged metering device (clogged TXV screen, kinked capillary tube, or an orifice iced shut from moisture in the system) — suction can pull into a near-vacuum in this case, well below what a simple undercharge would produce",
  "Confirm outdoor ambient conditions aren't simply cold enough on their own to explain lower-than-summer pressures before chasing a fault",
  "Leak search with an electronic leak detector or UV dye at all fittings, the evaporator coil, and any brazed joints before condemning a component",
], safety:"Recover refrigerant per EPA 608 regs before opening the system — never vent to atmosphere.", confidence:"common" },

// ---------------- SUPERHEAT / SUBCOOLING DIAGNOSTICS — where the charge actually is ----------------
{ id:"s-sh-sc-high-high", equipment:"Condenser/Heat Pump", title:"High superheat + high subcooling", summary:"Refrigerant is backing up in the condenser (high subcooling) while the evaporator is starved (high superheat) — a restriction between the two, not a charge problem.", steps:[
  "Do not add refrigerant based on the high subcooling reading alone — this pattern is a restriction, not a true overcharge, and adding charge makes it worse",
  "Check the liquid line filter drier for a temperature drop across it and replace if restricted",
  "Check for a kinked or crushed liquid line, or a partially closed liquid line service valve",
  "Check the metering device inlet screen (TXV) for debris blocking flow",
  "Once the restriction is cleared, recheck superheat and subcooling — both should normalize toward spec without touching the charge",
], confidence:"common" },
{ id:"s-sh-sc-low-low", equipment:"Condenser/Heat Pump", title:"Low superheat + low subcooling", summary:"Refrigerant is flooding through the system on both ends — usually an overfeeding metering device or non-condensables, not a simple overcharge.", steps:[
  "Check the metering device for a stuck-open or overfeeding condition (see the TXV testing entry) before assuming overcharge",
  "Check for non-condensables (air/moisture) in the system, especially after recent service work where a proper deep vacuum wasn't pulled",
  "If the metering device checks out fine, then suspect true overcharge — recover down to the correct charge per the manufacturer's chart",
  "Low superheat with a compressor that sounds or runs rough can mean liquid refrigerant is migrating back to the compressor (flooding) — check crankcase heater operation on systems equipped with one",
], safety:"Liquid refrigerant returning to the compressor (flooding) can cause slugging and permanent compressor damage — don't leave the system running indefinitely in this state while diagnosing.", confidence:"common" },
{ id:"s-sh-sc-high-low", equipment:"Condenser/Heat Pump", title:"High superheat + low subcooling", summary:"The classic undercharge/refrigerant leak signature — there simply isn't enough refrigerant in the system.", steps:[
  "Confirm with a second data point — head and suction pressures should also read low for a true undercharge",
  "Leak search before adding refrigerant — topping off a leaking system is a temporary fix and a compliance issue, not a repair",
  "Check all flare fittings, schrader cores, braze joints, and the evaporator coil (a common slow-leak point) with an electronic leak detector or UV dye",
  "Once the leak is repaired, evacuate to a proper vacuum and weigh in the full charge per the nameplate rather than just adding refrigerant to a number",
], safety:"Recover refrigerant per EPA 608 regs — never vent to atmosphere. Repair leaks before recharging; charging a known leak is a repeat-trip guarantee and a regulatory issue.", confidence:"common" },
{ id:"s-sh-sc-low-high", equipment:"Condenser/Heat Pump", title:"Low superheat + high subcooling", summary:"Refrigerant is overcharged, or a downstream restriction is trapping liquid in the condenser while still overfeeding the evaporator.", steps:[
  "Check if this is a genuine overcharge first — compare against the manufacturer's subcooling target for current conditions and recover refrigerant to spec if actually over",
  "If low superheat persists even after correcting subcooling to spec, check for an overfeeding/stuck-open metering device rather than continuing to pull charge",
  "On a system with a fixed-orifice/piston metering device rather than a TXV, low superheat with high subcooling at high-load conditions can be a normal characteristic — compare against that specific system's own charging chart rather than TXV-style targets",
], confidence:"common" },

// ---------------- ADDITIONAL FIELD SCENARIOS ----------------
{ id:"s-compressor-hums-no-start", equipment:"Condenser/Heat Pump", title:"Compressor hums but won't start (trips on overload)", summary:"Contactor pulls in, compressor hums, then trips off on its internal overload without running.", steps:[
  "Check the run capacitor with a meter against its rated µF — a weak/out-of-tolerance capacitor is the single most common cause",
  "Check the contactor contacts for pitting, burning, or poor contact pressure",
  "If the line set is long or voltage is marginal, consider a hard-start kit",
  "Ohm the compressor windings common-to-run, common-to-start, and each winding to ground to rule out a locked rotor or a grounded winding",
  "Verify actual voltage at the compressor terminals while it's trying to start — a voltage drop under load points to undersized wiring or a loose connection upstream, not the compressor itself",
], safety:"Discharge capacitors safely before handling. If windings test grounded or open, treat the compressor as failed — don't keep cycling power trying to force a start.", confidence:"common" },
{ id:"s-compressor-cycles-highpressure", equipment:"Condenser/Heat Pump", title:"Compressor short-cycles on high-pressure lockout", summary:"System runs briefly then trips off on high head pressure, repeatedly.", steps:[
  "Check condenser coil cleanliness and airflow first — this is the most common cause by far",
  "Check for overcharge against the manufacturer's chart",
  "Check for non-condensables (air/moisture) in the system",
  "If airflow and charge both check out, verify the high-pressure switch itself isn't simply failing — ohm test it against its rated trip point",
  "On a heat pump, check for a stuck or miswired reversing valve forcing hot gas the wrong direction",
], confidence:"common" },
{ id:"s-compressor-cycles-lowpressure", equipment:"Condenser/Heat Pump", title:"Compressor short-cycles on low-pressure lockout", summary:"System runs briefly then trips off on low suction pressure, repeatedly.", steps:[
  "Check for low charge/refrigerant leak first",
  "Check evaporator airflow — dirty filter, iced coil, or a failed/slow blower all starve the low side",
  "Check for a restricted metering device",
  "On a mild or cold day with an AC-only system, low outdoor ambient alone can cause nuisance low-pressure trips — check whether a low-ambient kit or hard-shutoff control is needed for the install",
], confidence:"common" },
{ id:"s-hp-no-heat-runs-cold", equipment:"Condenser/Heat Pump", title:"Heat pump runs but blows cold/cool air in heating mode", summary:"System is running in heat mode but the air doesn't feel hot.", steps:[
  "First confirm what 'normal' actually is — heat pump supply air normally feels only warm to the touch (roughly 85-105°F) compared to a gas furnace's much hotter output; measure at the register vs. the return with a thermometer before assuming a fault at all",
  "Confirm the reversing valve is actually energized/positioned correctly for heat mode",
  "Check refrigerant charge — undercharge is often more noticeable in heating mode than cooling",
  "Check the outdoor coil for ice buildup that isn't clearing (see the defrost entry in this list)",
  "Confirm auxiliary/emergency heat is wired and staging in as expected if the heat pump alone can't keep up on a cold day",
], confidence:"common" },
{ id:"s-hp-defrost-issues", equipment:"Condenser/Heat Pump", title:"Heat pump won't defrost / stuck in defrost / ices up repeatedly", summary:"Outdoor coil ices over and doesn't clear on its own, or the unit gets stuck running a defrost cycle.", steps:[
  "Check the defrost sensor/thermistor on the outdoor coil for correct resistance and secure mounting",
  "Check the defrost control board's timing/initiation settings",
  "Verify the reversing valve actually switches into defrost (feel the lines change) rather than just the board calling for it",
  "Check that the outdoor fan stops during defrost — if it keeps running, the coil won't clear even though the board thinks it's defrosting",
  "Confirm defrost terminates on time/temperature rather than always running a full default timed cycle — always hitting max defrost time is a sign the termination sensor is bad",
  "If defrost cycles themselves look correct but icing keeps coming back afterward, suspect a charge or airflow problem rather than the defrost control",
], confidence:"common" },
{ id:"s-blower-ecm-erratic", equipment:"Air Handler", title:"ECM/variable-speed blower motor ramps, hunts, or runs at the wrong speed", summary:"Motor surges up and down, or doesn't match the speed/CFM it should be delivering.", steps:[
  "Measure static pressure and check for a duct restriction — ECM motors deliberately vary torque/speed to hold CFM against changing resistance, which the customer perceives as the blower 'surging'; address the airflow restriction, not the motor",
  "Check the low-voltage control harness plug at the motor (commonly a 5-pin or 16-pin connector) for a loose or marginal connection — this produces exactly this symptom",
  "Confirm the motor is programmed/tapped for the correct CFM for the installed equipment",
  "Check the motor's own fault history/status LED (if equipped) before condemning it outright",
], confidence:"common" },
{ id:"s-thermostat-heatcool-reversed", equipment:"Other", title:"Heat and cool are backwards, or system won't switch modes", summary:"Calling for heat runs cooling (or vice versa), or the system won't change modes at all.", steps:[
  "Check thermostat wiring at both ends first — a swapped Y/O wire, or a reversed color convention between the old and new equipment, is the most common cause",
  "Check the O/B configuration setting in the thermostat's setup menu — whether the reversing valve is energized in cooling (O) or in heating (B) differs by manufacturer, and this is a software setting, not just a wiring choice",
  "At the equipment board, verify which terminal actually energizes the reversing valve, then match the thermostat's O/B setting to that — don't assume based on brand alone",
], confidence:"common" },
{ id:"s-zone-damper-stuck", equipment:"Other", title:"Zoning system — one zone gets no airflow / damper won't open", summary:"A single zone isn't getting air while others work fine.", steps:[
  "Check the damper motor's low-voltage connection and confirm it's receiving a signal to open on a call from that zone",
  "Manually check that the damper actuator moves freely — many are spring-return and can seize over time",
  "Check the zone control board's fuse/relay for that specific zone",
  "Verify the zone panel isn't stuck in a bypass/emergency mode holding all dampers in one position",
  "Check duct static pressure isn't so high (from other zones being closed) that the damper motor can't overcome it — often points to an undersized or missing bypass duct",
], confidence:"common" },
{ id:"s-refrigerant-leak-search", equipment:"Condenser/Heat Pump", title:"Refrigerant leak search — where to look and how", summary:"General approach for finding a refrigerant leak before recharging a system.", steps:[
  "Start with schrader valve cores and their caps — probably the single most common leak point industry-wide, and the easiest to check first",
  "Check all flare and flange fittings, especially at the service valves and any field-brazed joints",
  "Check the evaporator coil — a common slow pinhole-leak point from formicary/ant-nest corrosion, especially in copper coils; bubble test or check with UV dye if accessible",
  "Check the condenser coil the same way",
  "Work an electronic leak detector slowly across each suspect area in still air (temporarily kill nearby fans), or check for UV dye that's had at least one full run cycle to circulate",
  "Document what you find before repairing — regulatory rules generally require repairing leaks above the applicable threshold rather than just topping off refrigerant repeatedly",
], safety:"Recover refrigerant per EPA 608 regs before opening any fitting. Use proper PPE when working with UV dye and leak-detection chemicals.", confidence:"common" },
{ id:"s-minisplit-outdoor-not-running", equipment:"Mini-Split", title:"Mini-split — indoor unit runs, outdoor unit does nothing", summary:"Indoor head powers on and calls for cooling/heating, but the outdoor unit never starts.", steps:[
  "Check communication wiring between the indoor and outdoor units — a loose or miswired connection is the most common cause",
  "Check the outdoor unit's breaker/disconnect and confirm incoming line voltage is actually present",
  "Check the outdoor board for a blown fuse",
  "Confirm the indoor unit isn't simply set to fan-only mode by mistake",
  "For a Daikin unit specifically, see the Daikin mini-split communication-failure entry in this list for LED-based diagnosis",
], confidence:"common" },

// ---------------- GAS FURNACE — ignition, flame, and combustion ----------------
{ id:"s-furnace-igniter-wont-glow", equipment:"Gas Furnace", title:"Hot surface igniter doesn't glow at all", summary:"Furnace goes through its sequence but the igniter never lights up.", steps:[
  "Check for 115VAC at the igniter connector during the trial-for-ignition window — no voltage points upstream to the control board/igniter relay",
  "If voltage is present at the connector but the igniter still doesn't glow, check igniter resistance/continuity — most silicon nitride igniters read roughly 40-90 ohms cold; open circuit means it's failed",
  "Inspect the igniter visually for a visible crack — even a hairline crack can open the circuit once hot",
  "Check the igniter connector and pins for corrosion or a loose crimp",
  "Confirm the correct replacement igniter part number — igniters are not universal and pull different current",
], safety:"Let the igniter cool before handling. Never touch the element with bare fingers even when replacing — oils cause premature failure.", confidence:"common" },
{ id:"s-furnace-igniter-glows-no-ignition", equipment:"Gas Furnace", title:"Igniter glows but gas doesn't ignite", summary:"Igniter clearly heats up but the burners never light.", steps:[
  "Confirm gas is actually available — manual shutoff valve open, no other gas appliance issues, adequate supply pressure",
  "Check the gas valve is receiving 24V at the correct time in the sequence — igniter should warm up, then the valve energizes at the end of warm-up",
  "Verify the igniter is physically positioned correctly relative to the burner — a shifted or bent igniter can glow without actually being in the gas stream",
  "Check inlet gas pressure and manifold pressure against the rating plate — pressure far outside spec can prevent reliable ignition even with a good spark path",
  "If the valve clicks/energizes but still no flame, suspect a failed gas valve solenoid even though the igniter checks out fine",
], safety:"If you smell gas after a failed ignition attempt, ventilate and wait before retrying — unburned gas can accumulate in the burner box.", confidence:"common" },
{ id:"s-furnace-delayed-ignition-boom", equipment:"Gas Furnace", title:"Delayed ignition / \"boom\" sound on startup", summary:"Furnace lights with a noticeable bang or delay instead of a smooth light-off.", steps:[
  "Check for excess gas accumulating before ignition — inspect gas pressure (too high causes a larger flame front to ignite all at once)",
  "Check burner alignment and cleanliness — dirty or misaligned burners delay flame propagation across all burners evenly",
  "Check the igniter's position and glow pattern — a weak or off-position igniter delays the actual light-off point after gas has already been flowing",
  "Inspect burner orifices for partial blockage causing uneven gas delivery across burners",
  "Treat this as a real safety/combustion issue, not just an annoying noise — repeated small gas explosions inside the burner box stress the heat exchanger over time",
], safety:"A delayed ignition/boom is a combustion safety concern, not cosmetic — diagnose and correct it, don't just note it and move on.", confidence:"common" },
{ id:"s-furnace-pilot-wont-stay-lit", equipment:"Gas Furnace", title:"Standing pilot won't stay lit (older furnaces)", summary:"Pilot lights but goes out shortly after releasing the gas control knob — older non-electronic-ignition furnaces.", steps:[
  "Check the thermocouple/thermopile — clean it, check flame impingement position (should be in the hottest part of the pilot flame), and verify millivolt output against spec with a meter",
  "Confirm the pilot flame itself is stable and properly sized/shaped, not too small or being blown around by a draft",
  "Check the thermocouple connection at the gas valve is tight — a loose connection reads as insufficient millivolt output",
  "If millivolt output is low even with a good flame and clean thermocouple, replace the thermocouple/thermopile",
  "Check for a draft at the pilot area from a nearby door, window, or improperly sealed cabinet",
], confidence:"common" },
{ id:"s-furnace-inducer-wont-start", equipment:"Gas Furnace", title:"Inducer motor won't start / furnace does nothing on a heat call", summary:"Thermostat calls for heat but the furnace shows no sign of starting the ignition sequence at all.", steps:[
  "Confirm the control board is powered — check for an LED status light and 24V at the board",
  "Check for 115VAC at the inducer motor connector during a call for heat",
  "If voltage is present but the motor doesn't run, check inducer motor winding resistance and confirm the wheel isn't seized",
  "If no voltage reaches the inducer, check the control board relay/triac output and any safety switches wired in series ahead of it (limit, rollout, door switch)",
  "Check the door interlock switch is being fully depressed by the blower door — a common, easy-to-miss no-start cause",
], confidence:"common" },
{ id:"s-furnace-inducer-runs-no-heat", equipment:"Gas Furnace", title:"Inducer runs continuously but ignition sequence never starts", summary:"Inducer motor runs, but the furnace never proceeds to igniter warm-up.", steps:[
  "Check the pressure switch — it must close within a few seconds of the inducer starting; if it never closes, the board holds the sequence at the inducer-only stage",
  "Verify pressure switch tubing isn't blocked, kinked, or disconnected",
  "Check inducer motor speed/amp draw against spec — a weak inducer may run but not generate enough vacuum to close the switch",
  "Inspect the vent and combustion air intake for blockage (bird nests, ice, snow are common seasonal causes)",
  "Check the pressure switch itself with an ohmmeter and by applying vacuum directly, to rule out a failed switch",
], confidence:"common" },
{ id:"s-furnace-flame-rollout-trips", equipment:"Gas Furnace", title:"Flame rollout switch keeps tripping", summary:"Manual-reset rollout switch trips repeatedly, shutting the furnace down.", steps:[
  "Do not just reset it repeatedly — this is a fire safety device responding to flame coming out of the burner compartment instead of up through the heat exchanger",
  "Check for a blocked or restricted heat exchanger/flue causing flame to roll out instead of drawing up normally",
  "Check burner alignment and that the orifice/manifold assembly is correctly seated",
  "Check for insufficient combustion air supply to the furnace compartment",
  "Inspect for excess dirt/lint/debris in the burner compartment that could be igniting or disrupting normal flame pattern",
], safety:"Never bypass or jump out a rollout switch. Find and correct the actual cause before putting the furnace back in service.", confidence:"common" },
{ id:"s-furnace-heat-exchanger-crack-suspect", equipment:"Gas Furnace", title:"Suspected cracked heat exchanger", summary:"Signs point to a compromised heat exchanger — this is a safety condemnation call, not a routine repair.", steps:[
  "Common red flags: flame that flickers/dances noticeably when the blower kicks on, a persistent odd smell during heat calls, soot, or a CO detector alarming",
  "Use a combustion analyzer to check for CO in the supply air stream (with return air blocked off from the burner compartment) — elevated CO in supply air is a strong indicator",
  "Visually inspect the exchanger with a flashlight/borescope for visible cracks, though many cracks aren't visible without disassembly",
  "Check for rust/scaling patterns suggesting long-term condensation damage inside the exchanger, especially on furnaces that have been oversized or short-cycling for years",
  "If a crack is confirmed or strongly suspected, do not operate the furnace — this is a customer safety issue requiring shutdown and replacement, not a patch",
], safety:"A cracked heat exchanger can introduce combustion byproducts (including CO) into the breathing air supply. Shut the furnace down and red-tag it if confirmed or strongly suspected — do not leave it running to \"confirm later.\"", confidence:"common" },
{ id:"s-furnace-yellow-flame", equipment:"Gas Furnace", title:"Burner flame is yellow/orange instead of blue", summary:"Flame color indicates incomplete combustion.", steps:[
  "Check for insufficient combustion air — a dirty burner compartment, blocked air shutter, or inadequate room air supply are the most common causes",
  "Check burner ports for dirt/lint/rust/spider webs (a very common real-world cause) partially blocking gas flow",
  "Check gas pressure — pressure too high can also produce a yellow-tipped, lazy flame",
  "Confirm the primary air shutter (if adjustable) is set correctly, not closed down",
  "Run a combustion analysis (O2/CO) to confirm actual combustion quality rather than judging by eye alone",
], safety:"Yellow flame often correlates with elevated CO production — treat it as a real combustion problem, not a cosmetic one.", confidence:"common" },
{ id:"s-furnace-low-temp-rise", equipment:"Gas Furnace", title:"Temperature rise too low", summary:"Supply air temperature minus return air temperature reads below the furnace's rated range.", steps:[
  "Check blower speed/CFM setting — airflow set too high for the current firing rate is the most common cause",
  "Confirm gas input rate (clock the meter or check manifold pressure) isn't set too low",
  "Check for a dirty/restricted burner or heat exchanger reducing actual heat transfer",
  "Verify the temperature rise measurement itself is taken correctly — supply and return readings taken far enough from the equipment to avoid duct radiant effects",
  "Compare the actual rise against the range printed on the furnace rating plate, not a generic number",
], confidence:"common" },
{ id:"s-furnace-high-temp-rise", equipment:"Gas Furnace", title:"Temperature rise too high", summary:"Supply air temperature minus return air temperature reads above the furnace's rated range — a precursor to limit trips.", steps:[
  "Check filter and overall airflow restriction first — this is the most common cause by far",
  "Check blower speed tap/setting is correct for the installed equipment and duct static",
  "Check for closed/blocked supply or return registers reducing total system airflow",
  "Check gas input rate isn't set too high (overfiring) relative to the blower's airflow capacity",
  "Check the blower wheel for dirt buildup reducing its actual delivered CFM despite running at the correct speed",
], confidence:"common" },
{ id:"s-furnace-venting-condensation-issues", equipment:"Gas Furnace", title:"90%+ furnace — condensate/venting issues (gurgling, blocked drain, PVC vent problems)", summary:"High-efficiency condensing furnace showing venting or condensate symptoms beyond a simple pressure switch fault.", steps:[
  "Check PVC vent/intake pipe slope — condensing furnace venting must slope back toward the furnace (or to a low-point drain) per the install manual; reversed slope traps condensate and causes gurgling, blockage, or pressure switch faults",
  "Check for sagging horizontal vent runs that have lost their slope over time",
  "Inspect the condensate trap for clogs — a partially clogged trap can still pass some condensate while still causing intermittent pressure switch nuisance trips",
  "Check vent terminations are correctly spaced from each other and from windows/soffits per code and manufacturer requirements",
  "In cold climates, check for ice buildup at the vent termination restricting flow on very cold days",
], confidence:"common" },
{ id:"s-furnace-two-stage-wont-highfire", equipment:"Gas Furnace", title:"Two-stage furnace stuck on low fire / won't step up to high fire", summary:"Furnace runs but never transitions to second-stage/high-fire operation.", steps:[
  "Check the thermostat is actually a two-stage-capable thermostat/configuration calling for W2 — a single-stage thermostat wired to a two-stage furnace will never call for high fire",
  "Check W2 wiring and the corresponding terminal at the furnace control board",
  "Check the staging delay setting on the board — some boards hold low fire for a fixed time before allowing a step up even with a call present",
  "Check for a low-fire-only dip switch or jumper accidentally left set from a prior service call or installation",
  "If W2 is present and wiring checks out, suspect the control board's staging relay/output",
], confidence:"common" },
{ id:"s-furnace-modulating-hunting", equipment:"Gas Furnace", title:"Modulating furnace hunts / can't hold steady output", summary:"Fully modulating furnace's flame/firing rate oscillates instead of settling at a steady output.", steps:[
  "Check the discharge air temperature sensor (if equipped) for accuracy — modulating controls often target a fixed supply air temperature and hunt if that sensor reads incorrectly",
  "Check gas supply pressure stability under load — a supply that sags as firing rate increases will cause the modulation algorithm to hunt trying to compensate",
  "Check for duct static pressure issues affecting airflow at partial firing rates, since airflow and firing rate are linked on a modulating system",
  "Confirm the outdoor air temperature sensor (used for staging logic on many modulating systems) is reading correctly, since a bad reading skews the target firing rate",
  "Review the installer/dealer setup menu for an incorrect min/max firing rate or CFM configuration for the installed ductwork",
], confidence:"common" },
{ id:"s-furnace-gas-smell-startup", equipment:"Gas Furnace", title:"Brief gas smell at furnace startup (not a continuous leak)", summary:"Homeowner or tech notices a gas odor specifically when the furnace fires, not at other times — different from a continuous leak.", steps:[
  "This is often normal on the very first fire of the heating season as dust burns off, or from a very brief puff of unburned gas during normal ignition — but confirm that's actually what's happening rather than assuming it",
  "Watch (safely, from a distance) an actual ignition cycle and note whether the smell coincides with the moment of light-off only, briefly, versus lingering",
  "Check for delayed ignition (see that entry) — a delayed light-off burns a larger pocket of accumulated gas and produces a stronger smell at startup",
  "Check gas valve for a slow-closing or slightly leaking-by condition between cycles, allowing a small amount of gas to accumulate before the next ignition",
  "If the smell is more than brief/faint, or happens on every cycle, treat it as an active problem requiring the same response as a continuous leak below — don't wave it off as normal",
], safety:"If you cannot clearly explain the smell as a brief, normal light-off puff, treat it as a gas leak: stop, do not operate switches, ventilate, and follow standard gas leak procedure.", confidence:"common" },
{ id:"s-furnace-co-detector-alarm", equipment:"Gas Furnace", title:"Carbon monoxide detector alarming near the furnace", summary:"A CO alarm has gone off in a home served by this furnace (or another fuel-burning appliance).", steps:[
  "This is a safety call, not a routine diagnostic — confirm with the homeowner whether anyone is experiencing symptoms (headache, dizziness, nausea) and advise evacuation/fresh air if so, before troubleshooting anything",
  "Shut down the furnace (and any other fuel-burning appliances sharing the space/venting) until the source is identified",
  "Test actual CO levels with a calibrated CO analyzer — in the flue gas, in the supply air stream, and in ambient room air near the appliance",
  "Check for a cracked heat exchanger, blocked/deteriorated venting, insufficient combustion air, or a backdrafting appliance as the likely source",
  "Do not clear the alarm and walk away without a confirmed cause and correction — a nuisance-alarm assumption on a real CO event is a life-safety mistake",
], safety:"Treat every CO alarm call as a potential life-safety emergency until proven otherwise. When in doubt, advise the homeowner to call the gas utility or fire department in addition to your own diagnosis.", confidence:"common" },
{ id:"s-furnace-limit-trips-cold-weather", equipment:"Gas Furnace", title:"High limit nuisance-trips only in extremely cold weather", summary:"Furnace runs fine most of the winter but trips the high limit specifically on the coldest days.", steps:[
  "Check actual temperature rise on a cold day against the furnace's rated range — a furnace running near the top of its rise range in mild weather can push over the limit once return air temperature drops further on extreme days",
  "Check for a blower speed/tap set too low for the installed firing rate, which becomes more noticeable as return air gets colder and denser",
  "Check filter and duct static under real conditions, not just at idle — some restrictions only show up as airflow demand increases",
  "Consider whether the equipment is correctly sized/matched for the home's actual heat loss on design-day conditions",
  "If the limit itself is simply out of calibration (opens below its rated set point), replace it — verify with a temperature probe before condemning it",
], confidence:"common" },

// ---------------- CONDENSER / HEAT PUMP — mechanical, electrical, and control ----------------
{ id:"s-condenser-fan-not-spinning-compressor-runs", equipment:"Condenser/Heat Pump", title:"Condenser fan not spinning but compressor runs", summary:"Compressor is audibly running, but the outdoor fan isn't turning.", steps:[
  "Check the run capacitor's fan terminal (dual-run caps have separate herm/fan sections) with a meter against its rated µF — a common cause where the compressor still runs off its own section but the fan doesn't",
  "Check fan motor winding resistance and confirm the motor isn't simply seized (try spinning the blade by hand, power off, and feel for excess resistance/grinding)",
  "Check for 240V present at the fan motor connector during a call",
  "Inspect fan motor wiring and connector for corrosion/damage",
], safety:"With head pressure rising rapidly with the compressor running and no condenser airflow, shut the unit down quickly to avoid a high-pressure trip or compressor damage — don't let it run while you go get parts.", confidence:"common" },
{ id:"s-condenser-fan-spins-slow", equipment:"Condenser/Heat Pump", title:"Condenser fan spins slowly / struggles to start", summary:"Fan turns but noticeably slower than normal, or needs a push to start.", steps:[
  "Check the run capacitor's fan section µF against its rated value — a weak (not fully failed) capacitor is the most common cause of a sluggish start",
  "Check for bearing wear/drag in the fan motor",
  "Check for physical obstruction of the fan blade (debris, ice, bent blade catching the shroud)",
  "Check actual voltage at the motor under load — low voltage from a distant/undersized circuit can also cause weak starts",
], confidence:"common" },
{ id:"s-compressor-trips-breaker-hot-days", equipment:"Condenser/Heat Pump", title:"Unit trips the breaker only on hot days", summary:"System runs fine in mild weather but the breaker trips specifically during high-heat conditions.", steps:[
  "Check compressor amp draw against RLA/LRA at the time of the trip if possible — locked rotor amps spike hardest when head pressure is already elevated from high ambient temperature",
  "Check condenser coil cleanliness and airflow — a coil that's marginal in mild weather can push head pressure (and amp draw) over the edge on the hottest days",
  "Check the run capacitor — a weak capacitor makes the compressor work harder to start, and that effect gets worse as head pressure rises with ambient temperature",
  "Verify the breaker itself is correctly sized for the equipment's MCA/MOCP and not simply weakened/nuisance-tripping from age and heat-soak in a hot electrical panel",
  "Check for a hard-start kit if the compressor and capacitor otherwise check out fine but starting current is still marginal",
], confidence:"common" },
{ id:"s-hp-aux-heat-wont-engage", equipment:"Condenser/Heat Pump", title:"Emergency/auxiliary heat won't engage on a heat pump system", summary:"Heat pump can't keep up (or is in emergency heat mode) but backup electric/gas heat doesn't come on.", steps:[
  "Check the W/W2 (or E) wiring from the thermostat to the air handler's electric heat relay or dual-fuel furnace",
  "Check the electric heat strip's own breaker/disconnect and sequencer/contactor",
  "Check the thermostat's staging/balance point configuration — some systems require specific settings before aux heat will ever call in automatically (see the balance point entry for dual-fuel systems)",
  "Check the outdoor thermostat/lockout control (if equipped) that some systems use to enable or block aux heat based on outdoor temperature — a bad sensor can block calls it shouldn't",
  "Verify by manually forcing emergency heat mode at the thermostat whether the strips/furnace respond at all, to isolate a thermostat logic issue from a wiring/component issue",
], confidence:"common" },
{ id:"s-hp-aux-heat-always-on", equipment:"Condenser/Heat Pump", title:"Aux/backup heat runs constantly, heat pump seems locked out", summary:"System relies heavily or entirely on backup heat even when the heat pump should be able to handle the load.", steps:[
  "Check for a heat pump fault/lockout condition preventing compressor operation — look for a stored fault code first",
  "Check the outdoor unit is actually running at all during a heat call — a failed compressor or contactor forces the system onto backup heat as the only source",
  "Check balance point / lockout temperature settings — if set too high, the system defaults to backup heat well before it actually needs to",
  "Check refrigerant charge — a badly undercharged heat pump can't produce enough capacity in cold weather and effectively pushes the load onto backup heat",
  "Check for a stuck reversing valve keeping the system in cooling mode, which would also explain backup heat carrying the full load",
], confidence:"common" },
{ id:"s-condenser-contactor-chatter", equipment:"Condenser/Heat Pump", title:"Contactor chattering or buzzing", summary:"Contactor makes a rapid chattering or buzzing noise instead of pulling in cleanly.", steps:[
  "Check for low or fluctuating 24V control voltage — a marginal transformer or a voltage drop under load is a common cause",
  "Check the contactor coil itself for a partially failed/weak coil",
  "Check for a loose low-voltage connection at the contactor coil terminals",
  "Inspect the contactor contacts for pitting/burning — badly worn contacts can also cause an unstable pull-in",
  "Check for a marginal 24V transformer that's undersized for the total connected load (common after accessories like UV lights or humidifiers are added later)",
], confidence:"common" },
{ id:"s-condenser-unit-vibration-noise", equipment:"Condenser/Heat Pump", title:"Excessive vibration from the outdoor unit", summary:"Unit shakes noticeably or transmits vibration/noise into the structure.", steps:[
  "Check the compressor's rubber isolation grommets/mounts for wear or missing mounts",
  "Check the fan blade for a bent condition or imbalance",
  "Check that the unit is sitting level on its pad and the pad hasn't settled/cracked",
  "Check refrigerant line set isolation — lines rigidly clamped to the structure transmit compressor vibration into the house",
  "If vibration is new and recent, check for a developing internal compressor mechanical issue rather than assuming it's just mounting-related",
], confidence:"common" },
{ id:"s-condenser-oil-stains-lineset", equipment:"Condenser/Heat Pump", title:"Oily residue at fittings or along the line set", summary:"Visible oil staining is one of the most reliable visual signs of a refrigerant leak.", steps:[
  "Refrigerant oil travels with the refrigerant, so an oil stain at a fitting or braze joint is a strong sign that's the leak point — refrigerant evaporates away but the oil residue stays behind",
  "Wipe the area clean and recheck after the system has run a while — a fresh stain reappearing confirms an active leak at that spot rather than old residue",
  "Confirm with an electronic leak detector or UV dye at the stained location rather than repairing based on the stain alone",
  "Check for accompanying signs — a system low on charge, high superheat, or a fault code history showing pressure-related faults",
], confidence:"common" },
{ id:"s-condenser-crankcase-heater-check", equipment:"Condenser/Heat Pump", title:"Compressor housing cold to the touch after a long off-cycle", summary:"On systems equipped with a crankcase heater, the compressor shell should feel warm even when off — cold means it's not doing its job.", steps:[
  "Confirm the unit is actually equipped with a crankcase heater — not all systems have one",
  "Check for 24V (or line voltage, depending on design) at the crankcase heater during the off-cycle",
  "Check heater element continuity/resistance if voltage is present but it's still not warming the shell",
  "Understand why this matters: without heater function, refrigerant can migrate into and condense in the compressor oil during cold weather, causing a flooded/slugged start when the compressor next energizes",
  "If the heater has been non-functional for a while in cold weather, listen carefully for compressor noise on the next start-up and check oil condition/level if accessible",
], safety:"A flooded start from cold refrigerant-diluted oil can cause immediate, serious compressor damage — don't dismiss a cold shell as a minor issue in heating-season climates.", confidence:"common" },
{ id:"s-condenser-low-ambient-nuisance", equipment:"Condenser/Heat Pump", title:"AC won't run properly on a cool/mild day", summary:"Cooling system that works fine in summer heat misbehaves (short cycles, trips low pressure, or won't start) on a cool day.", steps:[
  "Check for a low-pressure lockout tripping simply because head pressure can't build enough on a cold day to maintain normal operating range without a low-ambient control",
  "Check whether the installation includes a low-ambient kit (head pressure control, fan cycling control) — many standard AC systems aren't rated to run cooling much below 55-65°F outdoor without one",
  "If a low-ambient kit is installed, check its operation (fan cycling on head pressure) rather than assuming charge or component failure",
  "Explain to the customer that running AC on a cold day isn't always supported by the equipment as installed — this may be a normal operating limitation, not a fault, unless the system is specifically rated/equipped for it",
], confidence:"common" },
{ id:"s-hp-reversing-valve-stuck-onemode", equipment:"Condenser/Heat Pump", title:"Heat pump stuck in one mode — won't switch between heat and cool", summary:"System stays in cooling (or heating) regardless of thermostat mode changes.", steps:[
  "Check for 24V at the reversing valve solenoid when a mode change is called for — confirm the thermostat/board is actually sending the O/B signal correctly",
  "If voltage is present at the solenoid but the valve doesn't shift, feel all four valve line temperatures during an attempted mode change — a valve that's mechanically stuck won't show the expected temperature shift even with the coil energized",
  "Tap the valve body gently while energized (common field technique) to see if a stuck slide frees up — treat this as diagnostic only, not a permanent fix",
  "Check solenoid coil resistance/continuity if there's no click or temperature change at all when energized",
  "A valve that's stuck or leaking internally typically needs replacement — this isn't a chemical or charge fix",
], confidence:"common" },
{ id:"s-condenser-tripping-ground-fault", equipment:"Condenser/Heat Pump", title:"Outdoor unit trips a GFCI/AFCI breaker specifically", summary:"Unit trips a ground-fault or arc-fault protected breaker/outlet rather than a standard breaker.", steps:[
  "Understand this is different from a standard overcurrent trip — GFCI trips on a small current imbalance to ground, AFCI trips on detected arcing, not simply high amp draw",
  "Check for moisture intrusion in the disconnect, wiring compartment, or motor windings — a very common GFCI trip cause, especially after rain or irrigation spray",
  "Megger the compressor and fan motor windings to ground to check for a developing ground fault before assuming it's a nuisance trip",
  "Check wiring connections for looseness/arcing signs (discoloration, melted insulation) if the breaker is AFCI-protected",
  "Confirm whether GFCI/AFCI protection is even required for this equipment per the applicable code cycle and installation — some jurisdictions/equipment types are exempt, and a non-compliant breaker swap may be the actual fix if there's no real fault present",
], safety:"Don't just reset a GFCI/AFCI breaker repeatedly — it's detecting something real. Verify no genuine ground fault or arcing condition exists before concluding it's a nuisance trip.", confidence:"common" },

// ---------------- AIR HANDLER / DUCTWORK / BLOWER ----------------
{ id:"s-blower-wont-run-any-mode", equipment:"Air Handler", title:"Blower motor doesn't run in any mode (heat, cool, or fan-only)", summary:"Indoor blower is completely dead regardless of what the system calls for.", steps:[
  "Check power to the air handler/furnace at the disconnect and breaker",
  "Check the blower door safety switch is fully engaged — most units won't run at all with the door open or the switch not depressed",
  "Check for line voltage at the blower motor connector when a call is present",
  "Check the blower motor run capacitor (PSC motors) or the motor's module/control connections (ECM motors)",
  "Check the motor itself for a seized bearing (try spinning the wheel by hand with power off) before condemning the control side",
], confidence:"common" },
{ id:"s-blower-runs-cool-only-not-heat", equipment:"Air Handler", title:"Blower runs for cooling and fan-only, but not for a heat call", summary:"System otherwise works, but the blower stays off during heating specifically.", steps:[
  "Check the fan relay/circuit specific to the heating call — many systems use a separate output or timing (fan-on delay) for heat versus cool",
  "Check the heating blower on-delay setting/dip switch — if set unusually long, it can look like the blower \"never\" starts if you don't wait long enough",
  "Check thermostat wiring for the heat-call-specific fan control if the system uses a smart/communicating thermostat with separate heat and cool fan logic",
  "Verify furnace control board is actually completing the heat call sequence up to the point it should energize the blower (check for a fault earlier in the sequence)",
], confidence:"common" },
{ id:"s-blower-continues-after-satisfied", equipment:"Air Handler", title:"Blower keeps running well after the thermostat call is satisfied", summary:"Fan doesn't shut off in a reasonable time after heating or cooling ends.", steps:[
  "Check the blower off-delay setting on the furnace/air handler control board — this is normal, adjustable behavior, and may simply be set longer than the customer expects",
  "Confirm the thermostat isn't itself calling continuous fan (G) by mistake — check the fan mode setting",
  "Check for a stuck relay on the control board holding the fan circuit energized after the call ends",
  "On a heat pump, check whether this is actually a defrost cycle in progress before assuming a fault",
], confidence:"common" },
{ id:"s-blower-capacitor-weak-psc", equipment:"Air Handler", title:"PSC blower motor slow to start or humming (non-ECM system)", summary:"Older-style single-speed blower motor struggles to start or runs weak — separate from the ECM-specific entry in this list.", steps:[
  "Check the blower motor run capacitor's µF against its rated value — this is the most common cause on PSC (non-ECM) motors",
  "Check for a burning/hot smell or visible bulging on the capacitor case, both signs of imminent failure",
  "Check motor bearing condition/drag with power off",
  "Check actual voltage at the motor terminals under load for a voltage-drop issue upstream",
], safety:"Discharge capacitors safely before handling.", confidence:"common" },
{ id:"s-duct-whistling-noise", equipment:"Air Handler", title:"Whistling or hissing sound from vents/returns", summary:"Audible whistling noise, usually most noticeable at the return grille or a specific supply register.", steps:[
  "Check for an undersized or partially blocked return — whistling at the return is almost always an airflow-velocity/restriction issue, not a mechanical fault",
  "Check filter condition — a dirty filter increases air velocity through the remaining open area, which can create or worsen whistling",
  "Check for a register/damper that's mostly closed, forcing air through a small opening at high velocity",
  "Check overall system static pressure — if it's running high across the board, consider whether the duct system is simply undersized for the equipment's airflow",
], confidence:"common" },
{ id:"s-duct-negative-pressure-backdraft", equipment:"Other", title:"Suspected combustion appliance backdrafting from duct/building pressure imbalance", summary:"A furnace, water heater, or fireplace is spilling combustion gases into the home instead of venting properly — often caused by the HVAC system itself depressurizing the house.", steps:[
  "Check for an oversized or leaky return duct system pulling air from an unintended space (garage, attic) and depressurizing the living space relative to outdoors",
  "Check for exhaust fans (bath fans, range hoods, clothes dryers) running simultaneously with a marginal combustion appliance and contributing to depressurization",
  "Test actual house-to-outdoor pressure differential with a manometer if backdrafting is suspected, rather than guessing",
  "Check that any atmospherically-vented appliance (natural draft water heater, older furnace) has adequate makeup air per code",
  "Treat confirmed backdrafting of a combustion appliance as a safety issue requiring correction, not something to note and leave",
], safety:"A backdrafting combustion appliance can introduce carbon monoxide into the living space. Treat this with the same urgency as a CO alarm call.", confidence:"common" },
{ id:"s-filter-wrong-merv-restriction", equipment:"Air Handler", title:"High-MERV filter causing airflow or freezing problems", summary:"System was working fine, then started showing low-airflow symptoms (weak air, icing, high temp rise) after a filter change.", steps:[
  "Check the filter's MERV rating against what the system was designed for — a customer or previous tech upgrading to a much higher MERV filter without accounting for the added static pressure is a very common, easy-to-miss cause",
  "Compare total external static pressure against the equipment's rated maximum with the new filter in place",
  "If a higher-MERV filter is desired for air quality reasons, check whether a larger filter (more surface area) or a media cabinet is needed to keep static pressure in range rather than reverting to a lower MERV",
  "Confirm this wasn't simply coincidental timing — rule out other new causes before pinning it entirely on the filter",
], confidence:"common" },
{ id:"s-return-air-insufficient", equipment:"Air Handler", title:"Insufficient return air (single central return, doors closed)", summary:"Rooms with doors closed feel starved for airflow, or the system seems weak overall despite good equipment performance at the air handler.", steps:[
  "Check whether the home relies on a single central return with closed interior doors — this is a very common builder-grade design flaw, not a system malfunction",
  "Check for transfer grilles, jump ducts, or sufficient door undercuts allowing air to return from closed-door rooms",
  "Measure static pressure with doors open vs. closed to quantify the actual impact",
  "Explain the distinction clearly to the customer: this is a duct design limitation, not a failure of the furnace/AC itself, and the fix is adding return path capacity, not just more supply air",
], confidence:"common" },

// ---------------- THERMOSTAT / CONTROLS ----------------
{ id:"s-thermostat-shows-wrong-temp", equipment:"Other", title:"Thermostat displays an inaccurate temperature", summary:"Thermostat's reading doesn't match a separate thermometer at the same location.", steps:[
  "Check thermostat placement — near a supply vent, in direct sunlight, on an exterior wall, or above a heat-generating device (TV, lamp) all skew readings",
  "Check for a drafty wall penetration behind the thermostat allowing wall-cavity temperature to influence the sensor",
  "If the thermostat has a calibration/offset setting, verify it hasn't been set incorrectly rather than assuming a hardware fault",
  "Compare against a calibrated reference thermometer at the same height and location, not just \"by feel\"",
  "If placement and calibration both check out and the reading is still consistently off, replace the thermostat",
], confidence:"common" },
{ id:"s-thermostat-loses-programming", equipment:"Other", title:"Thermostat keeps losing its schedule/settings", summary:"Programming, schedule, or settings reset unexpectedly.", steps:[
  "Check backup battery condition if the thermostat uses batteries to hold settings through a power interruption",
  "Check for a C-wire (common) connection — a thermostat \"power stealing\" without a proper C-wire can lose settings or reset during brief power interruptions",
  "Check for frequent brief power outages at the property (a utility issue) causing resets even with otherwise correct wiring",
  "Check for a firmware update pending on smart thermostats that may be causing periodic resets",
  "If the thermostat is old, consider whether its internal backup capacitor/battery has simply reached end of life",
], confidence:"common" },
{ id:"s-thermostat-short-cycles-anticipator", equipment:"Other", title:"Short cycling caused by a mechanical thermostat's heat anticipator setting", summary:"Older non-electronic thermostat with a heat anticipator dial causing short cycling or long cycling.", steps:[
  "Check the heat anticipator setting against the actual amp draw of the connected heating system's control circuit (measure it, don't guess) — this is a genuinely adjustable calibration on older thermostats, not a fixed setting",
  "A setting too low relative to actual amp draw causes short cycling; too high causes long cycling and overshoot",
  "Confirm this is actually a mechanical anticipator-equipped thermostat (mercury bulb or bimetal style) before spending time on this — most electronic and smart thermostats don't have this component",
  "If the thermostat is old enough to still have this design, consider recommending an upgrade rather than fine-tuning a legacy component indefinitely",
], confidence:"common" },
{ id:"s-smart-thermostat-common-wire-missing", equipment:"Other", title:"Smart thermostat installed without a C-wire — battery drains or relay chatter", summary:"A smart/Wi-Fi thermostat installed on a system without a dedicated common wire, power-stealing to stay charged.", steps:[
  "Check whether a true C-wire is actually present and connected — many installs skip it and rely on power-stealing instead",
  "Symptoms of power-stealing without a C-wire include intermittent relay chatter, brief unexplained equipment activation, or the thermostat needing frequent battery changes/recharges",
  "Best fix is running an actual C-wire if at all possible — check for an unused conductor in the existing thermostat cable, or use a compatible add-on adapter (e.g., a common-wire-generating accessory) if pulling new wire isn't feasible",
  "Check the thermostat manufacturer's specific guidance — some models handle power-stealing more gracefully than others, but none of them handle it perfectly",
], confidence:"common" },
{ id:"s-multistage-thermostat-miswire", equipment:"Other", title:"Multi-stage thermostat/equipment mismatch (staging wired wrong)", summary:"A multi-stage thermostat paired with different-staged equipment (or vice versa) produces confusing symptoms — stuck on one stage, or never reaching full capacity.", steps:[
  "Confirm the actual staging capability of both the thermostat and the equipment match — a single-stage thermostat on two-stage equipment will never call for stage 2, and a two-stage thermostat on single-stage equipment can cause erratic behavior if miswired",
  "Check Y1/Y2 (cooling) and W1/W2 (heating) wiring terminations match what each device expects",
  "Check the thermostat's own equipment-type configuration menu — many thermostats need to be told what's actually connected, and a wrong setting here causes exactly this kind of mismatch even with correct wiring",
  "Review both the thermostat and equipment installation manuals together rather than assuming standard terminal meanings apply universally",
], confidence:"common" },

// ---------------- ELECTRICAL / GENERAL ----------------
{ id:"s-low-line-voltage-brownout", equipment:"Other", title:"Whole system underperforms during a brownout / low utility voltage", summary:"Equipment runs weak, trips, or behaves oddly and it correlates with low incoming utility voltage rather than any single component.", steps:[
  "Measure actual incoming line voltage at the disconnect/panel during the problem — compare against the equipment's rated voltage range (commonly 197-253V for 240V-nominal equipment)",
  "If voltage is genuinely low from the utility side, this isn't a component-level HVAC fault — document actual readings and advise the customer to contact their utility",
  "Check for undersized wiring or a loose connection on the customer's own side causing an additional voltage drop under load, which is a fixable HVAC-side issue distinct from a true utility brownout",
  "Recheck voltage under load (equipment actually running, ideally at peak demand) rather than only at idle, since voltage sag often only shows up under load",
], confidence:"common" },
{ id:"s-surge-damage-after-storm", equipment:"Other", title:"Equipment dead or erratic after a lightning storm / power surge", summary:"System stopped working or started behaving strangely following a known storm or power event.", steps:[
  "Check the control board fuse first — often the first thing to sacrifice itself in a surge event",
  "Check for visible scorching/damage on the control board, transformer, or any exposed wiring",
  "Check outdoor unit components separately from indoor — a nearby strike can take out one and not the other",
  "Check communication boards/modules on communicating systems, which are especially surge-sensitive",
  "If this is a repeat occurrence for the property, discuss surge protection options with the customer rather than just replacing the same part again",
], safety:"Treat storm-damaged equipment as a potential electrical hazard until inspected — don't assume it's safe to re-energize just because it looks intact.", confidence:"common" },
{ id:"s-condensate-float-switch-shutdown", equipment:"Air Handler", title:"System won't run because a condensate safety float switch has tripped", summary:"Distinct from an active water leak — the float switch is doing its job and shutting the system down before it overflows.", steps:[
  "Confirm this is actually a float switch shutdown (thermostat calls but nothing runs, often with no fault code) rather than a different no-run issue",
  "Trace to whichever float switch tripped — primary pan, secondary/emergency pan, or an inline switch in the drain line — units can have more than one",
  "Clear the actual clog or condensate issue causing the water level to rise before resetting/bypassing anything",
  "Test the switch itself (float moves freely, contacts open/close correctly) once the water issue is resolved, to confirm it will properly protect the system going forward",
  "Explain to the customer that this shutdown, while inconvenient, is the system correctly preventing water damage — the drain clog is the real problem to fix",
], confidence:"common" },

// ---------------- MINI-SPLIT (additional) ----------------
{ id:"s-minisplit-leaking-indoor", equipment:"Mini-Split", title:"Mini-split indoor unit leaking water", summary:"Water dripping or pooling from a ductless indoor head.", steps:[
  "Check the condensate drain line for clogs — algae growth is common, especially in units that have run a long time without cleaning",
  "Check the drain line slope — ductless lineset covers often hide a drain line that's lost proper slope over time or was never sloped correctly",
  "Check the built-in condensate pump (if equipped) is running and not jammed/failed",
  "Check that the indoor unit is mounted level — even a mini-split can overflow its internal pan if installed slightly tilted",
  "Check for ice on the indoor coil melting and overwhelming the drain — trace back to the freeze-up cause (airflow or charge) rather than just clearing the drain",
], confidence:"common" },
{ id:"s-minisplit-remote-unresponsive", equipment:"Mini-Split", title:"Wireless remote doesn't control the indoor unit", summary:"Remote appears to work (buttons respond, display lights) but the indoor unit doesn't react.", steps:[
  "Check remote batteries first — the most common cause by far",
  "Check for a physical obstruction between the remote and the indoor unit's receiver window",
  "Check for another nearby wireless remote or a wired controller (if both are present on the same unit) potentially overriding or conflicting with commands",
  "Try operating the unit directly from any manual/auto switch on the indoor unit itself to isolate whether the problem is the remote or the unit's receiver",
  "If direct manual operation also fails, this points to the indoor unit's receiver/control board rather than the remote",
], confidence:"common" },
{ id:"s-minisplit-smell-musty", equipment:"Mini-Split", title:"Musty smell from a ductless indoor unit", summary:"Customer reports a stale or musty odor when the unit runs, especially in cooling/dehumidify mode.", steps:[
  "Check the indoor coil and drain pan for mold/mildew growth — very common on ductless units that cycle between cooling (wet coil) and off (coil sits damp) without adequate drying",
  "Check the drain line and pan for standing water or slow drainage contributing to microbial growth",
  "Check the washable filter for buildup and clean per manufacturer instructions",
  "Recommend a proper coil cleaning (not just a filter rinse) if buildup is visible on the coil fins themselves",
  "For a recurring issue, discuss a post-cooling fan-only drying cycle (available on some models) to help the coil dry out between cycles",
], confidence:"common" },
{ id:"s-minisplit-multizone-one-head-dead", equipment:"Mini-Split", title:"Multi-zone mini-split — one indoor head doesn't respond, others work fine", summary:"On a multi-zone system, a single head is unresponsive while the rest of the zones operate normally.", steps:[
  "Check that specific indoor unit's own power/communication connection at the branch box or wiring junction serving it",
  "Check the branch provider/distributor unit (on systems that use one) for a fault specific to that port/zone",
  "Swap remote or control input source if possible to rule out a remote-specific issue rather than the indoor unit itself",
  "Check indoor unit fuse/breaker if individually fused",
  "Refer to the specific manufacturer's error code system for that zone if the dead head does show any LED blink pattern, rather than assuming it's identical to single-zone codes",
], confidence:"common" },

// ---------------- INDOOR AIR QUALITY / ACCESSORIES ----------------
{ id:"s-humidifier-not-humidifying", equipment:"Other", title:"Whole-home humidifier not adding humidity", summary:"Furnace-mounted humidifier runs (or should run) but indoor humidity doesn't rise.", steps:[
  "Check the humidistat setting and confirm it's actually calling for humidity, and that its wiring to the furnace/damper is intact",
  "Check water supply to the humidifier — a closed saddle valve or clogged supply line is a common cause",
  "Check the humidifier pad/media for mineral buildup (very common in hard-water areas) restricting water flow and evaporation",
  "Check the damper (bypass or fan-powered) actually opens during a call — a stuck damper prevents airflow through the humidifier even if water is flowing",
  "Confirm the humidifier is only expected to run during a heat call on bypass-style units — no heat call means no airflow through it by design, not a fault",
], confidence:"common" },
{ id:"s-humidifier-overhumidifying", equipment:"Other", title:"Overhumidifying / condensation on windows", summary:"Indoor humidity climbs too high, causing window condensation or a clammy feeling.", steps:[
  "Check the humidistat setting against outdoor temperature — indoor humidity targets should be lowered as outdoor temperature drops to avoid window condensation; a fixed high setting used year-round is a common cause",
  "Check that the humidistat is actually functioning and not stuck calling continuously",
  "Check for a stuck-open humidifier damper/water valve continuing to add moisture outside of an actual call",
  "Walk the customer through the relationship between outdoor temperature and appropriate indoor humidity target so the setting can be adjusted seasonally, not just once",
], confidence:"common" },
{ id:"s-uvlight-not-working", equipment:"Other", title:"UV air treatment light suspected not working", summary:"Customer wants confirmation their installed UV germicidal light is actually functioning.", steps:[
  "Check for voltage at the UV lamp connector during equipment operation (many are wired to run only when the blower runs)",
  "Visually confirm the lamp is lit — most UV-C light isn't very visible to the eye, but a faint bluish-purple glow should be visible if you look directly and briefly at the lamp (avoid prolonged direct viewing)",
  "Check the lamp's rated service life — UV bulbs typically need replacement annually even if they still appear lit, since UV output degrades well before the bulb visibly fails",
  "Check the lamp position relative to the coil/airstream matches the installation instructions — a misaligned lamp reduces effectiveness even when otherwise functional",
], safety:"Never look directly at an energized UV-C lamp for more than a brief glance — it can cause eye and skin damage similar to sunburn.", confidence:"common" },
{ id:"s-eac-not-cleaning", equipment:"Other", title:"Electronic air cleaner not collecting dust / smells like ozone", summary:"Electronic (ionizing plate-type) air cleaner isn't performing well, or produces a noticeable ozone smell.", steps:[
  "Check that the cells/plates are actually clean — a heavily loaded cell stops collecting effectively well before it looks obviously dirty",
  "Check the indicator light (if equipped) for a fault or \"clean me\" signal",
  "A mild ozone smell can be normal for this technology, but a strong/persistent smell suggests the cell needs cleaning or the power supply is producing excess ionization — don't dismiss a strong complaint as \"normal\"",
  "Check high-voltage power supply connections and the access door safety interlock switch, which shuts the cell off if the door isn't fully closed/latched",
  "Recommend a regular cleaning schedule (typically every 1-3 months) if the customer hasn't been maintaining it, since these systems perform poorly when neglected",
], safety:"De-energize before servicing — these carry high voltage internally even though the unit is low-voltage on the control side.", confidence:"common" },

// ---------------- SEASONAL STARTUP / POST-SERVICE ----------------
{ id:"s-first-startup-heat-season", equipment:"Gas Furnace", title:"First heat call of the season — nothing happens", summary:"A seasonal-startup checklist for a furnace that sat idle all summer and now won't respond to the first heat call.", steps:[
  "Confirm the thermostat is actually set to Heat mode, not still left on Cool/Off from summer",
  "Check the furnace switch and breaker weren't left off from summer service/cleaning",
  "Check the filter — a filter that sat unchanged since spring is often severely loaded by fall",
  "Pull the panel and check for signs of nesting/debris in the burner or inducer area from a summer of disuse",
  "Expect a somewhat rougher-than-normal first ignition (dust burn-off smell, brief hesitation) and distinguish that from an actual fault before condemning anything",
], confidence:"common" },
{ id:"s-first-startup-cool-season", equipment:"Condenser/Heat Pump", title:"First cool call of the season — nothing happens", summary:"A seasonal-startup checklist for an AC/heat pump that's been idle over winter.", steps:[
  "Confirm the thermostat is set to Cool and the setpoint is actually below current room temperature",
  "Check the outdoor disconnect wasn't left pulled from winter service",
  "Check for debris (leaves, dirt, ice remnants) around/inside the outdoor unit after a season of disuse",
  "On a heat pump, run it in cooling specifically rather than assuming heating-mode function during winter meant the whole system was fine",
  "If the compressor has sat off for an extended period in cold weather, allow the crankcase heater (if equipped) time to warm the compressor before a demanding first start, per manufacturer guidance",
], confidence:"common" },
{ id:"s-afterservice-worse-than-before", equipment:"Other", title:"System runs worse right after a service visit", summary:"A self-check list for ruling out something the service call itself introduced, before assuming an unrelated new failure.", steps:[
  "Check that all panels/doors were correctly reinstalled and are fully engaging safety interlock switches",
  "Check that any disconnects, service valves, or shutoffs used during the visit were fully restored to their normal operating position",
  "Check thermostat settings/mode weren't left in a diagnostic or test mode from troubleshooting",
  "If refrigerant was recovered/recharged, recheck subcooling/superheat once the system has had time to stabilize rather than judging immediately",
  "Review exactly what was touched during the visit and verify each item specifically, rather than assuming the new symptom is unrelated coincidence",
], confidence:"common" },

// ---------------- SAFETY-CRITICAL ----------------
{ id:"s-gas-smell-strong", equipment:"Other", title:"Strong or persistent gas odor in the home", summary:"A clear, ongoing gas smell — treat this as an emergency response, not a routine diagnostic call.", steps:[
  "Do not operate any electrical switches, thermostats, or appliances, and do not use a phone inside the structure",
  "Evacuate the structure and get everyone to fresh air/a safe distance immediately",
  "From a safe location, call the gas utility emergency line and/or 911 per your company's standard procedure",
  "Do not attempt to locate or repair the leak yourself in this situation — this is beyond a routine service diagnostic once a strong/persistent odor is confirmed",
  "Only re-enter and begin actual diagnosis once utility/fire personnel have confirmed the space is safe",
], safety:"This is a life-safety emergency. Follow your company's gas leak emergency procedure exactly — do not treat it as a normal service call.", confidence:"common" },
{ id:"s-co-alarm-general", equipment:"Other", title:"Carbon monoxide alarm sounding in the home (any fuel-burning appliance)", summary:"General CO alarm response — not limited to the furnace, since water heaters, fireplaces, and attached garages are also common sources.", steps:[
  "Ask about occupant symptoms (headache, dizziness, nausea, confusion) first and advise evacuation to fresh air immediately if anyone reports feeling unwell",
  "Do not assume the HVAC system is the source — systematically check every fuel-burning appliance in the home (furnace, water heater, fireplace, range) plus any attached garage as a source of vehicle exhaust infiltration",
  "Test with a calibrated CO analyzer rather than relying on the alarm alone — check ambient room air near each suspect appliance and in the flue/vent gas of each",
  "Shut down any appliance found to be producing/spilling CO until it's repaired",
  "Advise the homeowner to keep the CO alarm itself in place and not disable it, even after you believe you've found and corrected the source",
], safety:"Treat every CO alarm as a potential life-safety emergency until proven otherwise, regardless of which appliance you were originally called out for.", confidence:"common" },
{ id:"s-electrical-shock-hazard-reported", equipment:"Other", title:"Customer reports feeling a shock touching the unit or panel", summary:"A reported electrical shock is a serious, immediate safety issue requiring de-energization before any other diagnosis.", steps:[
  "De-energize the equipment at the disconnect/breaker immediately, before doing anything else",
  "Check for a ground fault — megger motor windings to ground and inspect for damaged/chafed wiring insulation contacting the cabinet",
  "Check the equipment's grounding conductor and connection for continuity — a shock hazard is very often actually a missing or broken ground path rather than a true internal short",
  "Check for water intrusion into an electrical compartment as a possible cause",
  "Do not return the equipment to service until the cause is found and corrected — do not tell the customer to \"just avoid touching it there\" as a resolution",
], safety:"A reported shock means a real fault path to ground exists somewhere. Treat this with the same seriousness as a reported fire or gas smell — verify and correct before re-energizing.", confidence:"common" },
{ id:"s-contactor-welded-stuck", equipment:"Condenser/Heat Pump", title:"Compressor won't shut off, even after the thermostat is satisfied", summary:"Outdoor unit keeps running continuously regardless of thermostat calls — different from the general 'runs constantly, never satisfies' entry, which assumes the system is legitimately trying to keep up.", steps:[
  "Confirm the thermostat is actually satisfied and not calling — check the call signal at the equipment, not just the thermostat display",
  "If there's genuinely no call present but the compressor still runs, check the contactor contacts — they can weld shut from arcing/pitting over time, especially after repeated hard starts or a marginal capacitor",
  "With power off, inspect the contactor visually for melted/fused contacts, and manually try to open it — a welded contactor won't release",
  "Check for a shorted low-voltage wire holding the contactor coil energized even without a real thermostat call",
  "Replace a welded contactor rather than attempting to free it — it will fail again",
], safety:"Shut power off at the disconnect before inspecting a suspected welded contactor — don't try to pry it open while energized.", confidence:"common" },
{ id:"s-dirty-sock-syndrome", equipment:"Condenser/Heat Pump", title:"\"Dirty sock syndrome\" — musty smell from central AC only at startup", summary:"A sour, musty odor noticeable specifically when cooling first kicks on, then fading — common on heat pumps and AC systems with certain evaporator coil coatings/conditions.", steps:[
  "Confirm the pattern: smell is strongest right at startup and fades as the coil gets fully wetted — this pattern is the classic signature, distinct from a constant musty smell (which points more to standing water/drain issues)",
  "Check the evaporator coil for biological growth (bacteria/mold) on the coil fins, often related to the coil sitting damp between cycles, especially overnight setback schedules",
  "Recommend a proper coil cleaning with an appropriate coil cleaner rather than just a filter change",
  "Check drain pan and drain line for standing water contributing to the growth, and correct any slope/clog issues found",
  "For a recurring issue, discuss options like a UV light aimed at the coil, or adjusting thermostat setback habits that let the coil sit damp for long periods",
], confidence:"common" },
{ id:"s-new-install-static-too-high", equipment:"Air Handler", title:"New install — airflow complaints from excessive duct static pressure", summary:"A newly installed system underperforms on airflow, and the root cause traces back to the duct system rather than the equipment.", steps:[
  "Measure total external static pressure and compare against the equipment's rated maximum — this is the definitive check, not guessing from symptoms alone",
  "Check duct sizing against the equipment's actual rated CFM — undersized trunk or branch ductwork is a common cause on new installs, especially when equipment was upsized but ductwork wasn't",
  "Check for excessive fittings/transitions close to the equipment (sharp turns right off the plenum) adding unnecessary resistance",
  "Check filter size and type relative to the equipment — an undersized filter grille on an otherwise correct system can single-handedly cause high static",
  "If static is confirmed high and duct modification isn't immediately possible, discuss the tradeoff of reducing blower CFM (protects the equipment) versus the resulting reduced capacity with the customer, rather than leaving it to nuisance-trip or wear prematurely",
], confidence:"common" },

// ---------------- ELECTRIC FURNACE / HEAT STRIPS ----------------
{ id:"s-efurnace-no-heat-strips", equipment:"Electric Furnace", title:"Electric furnace/air handler — no heat at all", summary:"Blower may run, but none of the electric heat strips energize on a heat call.", steps:[
  "Check the heat strip breaker(s)/disconnect — electric furnaces are often on their own dedicated high-amp breaker separate from the air handler's control breaker",
  "Confirm the thermostat is actually calling for heat (W terminal) and that call reaches the air handler's control board",
  "Check the fan/limit control and sequencer — most designs require the blower to prove airflow (or a time delay to elapse) before the sequencer allows the strips to energize",
  "Check each heating element's continuity/resistance individually — a single open element won't stop the others, but a failed sequencer or limit will",
  "Check for a tripped high-limit switch on the heater assembly itself, separate from any furnace-level limit",
], safety:"Electric heat strips draw significant current — verify breaker sizing matches the nameplate before resetting a tripped breaker repeatedly.", confidence:"common" },
{ id:"s-efurnace-one-stage-heat-only", equipment:"Electric Furnace", title:"Only some heat strips energize (partial heat, house runs cold on design days)", summary:"System produces some heat but clearly not full capacity — one or more stages aren't coming on.", steps:[
  "Check the thermostat's staging configuration — many thermostats only call for additional electric heat stages after a time delay or a widening temperature differential, which can look like a fault but is normal staging behavior",
  "Check each sequencer/relay individually — a single failed sequencer will silently drop just its stage while the rest of the system keeps running",
  "Check each stage's breaker individually — it's common for only one breaker in a multi-breaker heat strip panel to have tripped",
  "Verify total connected kW against the nameplate and confirm which stages should be running for the current call before assuming a fault exists at all",
], confidence:"common" },
{ id:"s-efurnace-sequencer-stuck", equipment:"Electric Furnace", title:"Heat sequencer stuck open or closed", summary:"The time-delay relay (sequencer) that staggers heat strip energization is malfunctioning.", steps:[
  "Stuck open (won't close): check for 24V at the sequencer's heater coil terminals during a call; if present but the sequencer never closes its load contacts, replace it",
  "Stuck closed (won't open): if a strip stays energized after the call ends or after power is cycled, this is a safety concern — the sequencer's contacts have likely welded",
  "Check the sequencer's internal heater element for continuity — many sequencers work by using a small internal heater to warp a bimetal contact closed after a delay; an open internal heater means it will never close",
  "Don't just swap the whole assembly on a guess — confirm which specific sequencer in a multi-stage stack is at fault before ordering parts",
], safety:"A sequencer stuck closed can keep heat strips energized continuously — this is a fire risk if left uncorrected. Address immediately, don't defer.", confidence:"common" },
{ id:"s-efurnace-breaker-trips", equipment:"Electric Furnace", title:"Heat strip breaker trips repeatedly", summary:"The dedicated electric heat breaker(s) won't stay reset.", steps:[
  "Check for a shorted or grounded heating element — ohm each element to ground, not just across its terminals",
  "Check for a failed sequencer with welded contacts causing multiple stages to draw simultaneously when they shouldn't, exceeding the breaker's rating",
  "Verify the breaker is actually sized correctly for the connected kW load per the nameplate — a previous parts swap to a higher-kW strip kit without updating the breaker is a real-world cause",
  "Check wiring connections at the strip terminals for looseness/heat damage, which can cause an intermittent short",
], safety:"Don't keep resetting a tripping breaker — verify the cause first. A grounded element energizing the cabinet is a shock hazard.", confidence:"common" },
{ id:"s-efurnace-limit-trips", equipment:"Electric Furnace", title:"Electric furnace high limit trips repeatedly", summary:"The heater assembly's own limit switch (separate from any furnace-level limit) keeps opening.", steps:[
  "Check airflow across the heat strips first — a dirty filter or undersized/restricted duct system causes exactly this, since electric elements have very little thermal mass and heat up fast without adequate airflow",
  "Check blower speed/CFM setting matches the installed kW of heat strips — undersized airflow for the connected heat is a common mismatch after equipment changes",
  "Check that the blower is actually running and up to speed before/during the heat call, not lagging behind the sequencer",
  "Check the limit switch itself for correct calibration if airflow checks out fine",
], confidence:"common" },
{ id:"s-efurnace-blower-not-syncing", equipment:"Electric Furnace", title:"Blower doesn't start with heat strips, or starts late", summary:"Heat strips energize before or without adequate blower airflow — a real safety and limit-trip risk, not just an inconvenience.", steps:[
  "Check the sequence of operation for this specific control — some designs start the blower first and delay the strips, others energize a strip briefly before the blower catches up; know what's normal for this equipment before calling it a fault",
  "Check blower motor start capacitor (PSC) or module connections (ECM) if the blower is simply slow to spin up",
  "Check for a wiring fault bypassing the intended sequencing logic (a previous repair that miswired around the interlock)",
  "If the blower fails to start at all with strips energized, this is a limit-trip and potential fire-hazard combination — treat as urgent, not routine",
], safety:"Heat strips energizing without proper airflow is a fire safety issue — don't leave a system running in this state while sourcing parts.", confidence:"common" },
{ id:"s-efurnace-smell-burning-dust", equipment:"Electric Furnace", title:"Burning/dust smell specifically at first seasonal use of electric heat", summary:"Distinguishing a normal seasonal dust burn-off from an actual problem on electric heat strips.", steps:[
  "A brief, mild dust smell on the very first heat call of the season is common and normal as accumulated dust burns off the elements — it should fade within a few minutes and not recur on subsequent cycles",
  "If the smell is strong, persists beyond the first cycle, or recurs every time the strips energize, treat it as a real fault — check for debris resting directly against an element, or an element beginning to fail",
  "Check for a burning-plastic or electrical smell specifically (versus dusty smell) — that points to a wiring/connection issue, not just dust, and warrants immediate shutdown and inspection",
], safety:"Don't wave off a persistent or non-dust burning smell as \"normal seasonal burn-off\" — verify it actually fits that pattern before dismissing it.", confidence:"common" },

// ---------------- PACKAGE UNITS (gas pack / heat pump package) ----------------
{ id:"s-packageunit-noheat-nocool", equipment:"Gas Furnace", title:"Package unit (gas pack / heat pump package) — completely dead, no heat or cool", summary:"A single outdoor package unit provides no response in either mode.", steps:[
  "Check the unit's own disconnect and breaker — package units are single self-contained units but often still have a separate service disconnect near the unit",
  "Check for a tripped door/access panel safety switch — package units have multiple compartments, and a panel left slightly ajar can prevent operation",
  "Check low-voltage transformer output and control board power before assuming a bigger fault",
  "Since heating and cooling share one control board on a package unit, a single board-level fault can take out both functions at once — check for a stored fault code before assuming two separate simultaneous failures",
], confidence:"common" },
{ id:"s-packageunit-roof-curb-leak", equipment:"Gas Furnace", title:"Roof-mounted package unit — water intrusion through curb/ductwork", summary:"Water stains or active leaking inside the building below a roof-mounted package unit.", steps:[
  "Check the roof curb gasket/flashing seal around the unit's base for deterioration",
  "Check condensate drain routing off the roof — a clogged or improperly routed condensate line can overflow and find its way into the curb area",
  "Check ductwork connections at the curb transition for gaps allowing rainwater entry, distinct from a condensate issue",
  "This is often a roofing/building-envelope issue as much as an HVAC one — coordinate with a roofer if the curb flashing itself has failed rather than trying to fully resolve it as an HVAC-only repair",
], confidence:"common" },
{ id:"s-packageunit-blower-common-fault", equipment:"Gas Furnace", title:"Package unit — one function works, the other doesn't (shared blower/board)", summary:"E.g., cooling works fine but heating doesn't (or vice versa) on a package unit sharing a single blower and control board.", steps:[
  "Since blower and low-voltage control are shared, first isolate whether the working mode actually proves the shared components are fine, or whether it's coincidentally not exercising the same relay/output that's failed",
  "Check the specific relay/output on the board dedicated to the non-working mode (e.g., the heat relay vs. the cool relay) rather than assuming the whole board is bad",
  "Check mode-specific components separately — burner/ignition components for heat, compressor/contactor for cool — using the same diagnostic approach as a standalone furnace or condenser",
  "Check thermostat wiring terminals specific to the failing mode (W vs. Y) at both the thermostat and the unit",
], confidence:"common" },

// ---------------- ERV / HRV VENTILATION ----------------
{ id:"s-ervhrv-not-running", equipment:"Other", title:"ERV/HRV not running at all", summary:"Energy or heat recovery ventilator shows no sign of operation.", steps:[
  "Check the unit's dedicated power source/breaker and any wall control switch/timer",
  "Check the wall control's settings — many ERV/HRV controls have a dehumidistat or timer mode that can leave the unit appearing off when it's actually just not currently called for",
  "Check for a tripped internal safety/overload on the unit's fan motors",
  "Check low-voltage control wiring between the wall control and the unit if the unit has power but won't respond to the control",
], confidence:"common" },
{ id:"s-ervhrv-condensation-freezing", equipment:"Other", title:"ERV/HRV core icing up in winter", summary:"The heat exchange core freezes during cold weather, restricting or stopping airflow.", steps:[
  "Check whether the unit has a defrost cycle/strategy (exhaust-air-only defrost, recirculation defrost, or a preheater) and confirm it's actually functioning",
  "Check outdoor temperature at which icing occurs against the manufacturer's defrost activation threshold",
  "Check indoor humidity levels — a home running unusually high indoor humidity feeds more moisture into the core, making icing worse at a given outdoor temperature",
  "Check the defrost damper/mechanism (if equipped) for a stuck or failed component preventing defrost from actually occurring even though it's being called for",
], confidence:"common" },
{ id:"s-ervhrv-imbalanced-airflow", equipment:"Other", title:"ERV/HRV supply and exhaust airflow imbalanced", summary:"Unit is pressurizing or depressurizing the house instead of running balanced, which can cause condensation and comfort issues.", steps:[
  "Check both supply and exhaust duct systems for blockage/restriction independently — a restriction on just one side unbalances the whole unit",
  "Check both filters (supply-side and, if equipped, exhaust-side) for buildup",
  "Check the unit's balancing dampers (if equipped) against its commissioning documentation/setup sheet — these should have been set at install, not left at default",
  "Measure actual CFM on both sides with a flow hood or the manufacturer's specified method if balancing dampers alone don't resolve it, since duct static differences between the two sides may need correcting instead",
], confidence:"common" },
{ id:"s-ervhrv-musty-smell", equipment:"Other", title:"Musty smell from ERV/HRV", summary:"Stale or musty odor traced to the ventilation unit rather than the main HVAC system.", steps:[
  "Check both filters for buildup and clean/replace per the manufacturer's schedule — often neglected since these units run continuously and are easy to forget",
  "Check the core itself for buildup or mold growth, especially on units without a very effective condensate drain",
  "Check the condensate drain (if equipped) for proper drainage rather than standing water inside the unit",
  "Check exterior intake/exhaust hoods for debris, insect nests, or being mounted too close to a source of odor (garbage area, exhaust vent) pulling smells into the fresh air stream",
], confidence:"common" },

// ---------------- REFRIGERANT — PRACTICAL PROCEDURES ----------------
{ id:"s-refrig-recovery-procedure", equipment:"Condenser/Heat Pump", title:"Recovering refrigerant safely before opening a system", summary:"Reference checklist for the recovery step itself, separate from any specific fault diagnosis.", steps:[
  "Confirm refrigerant type first — recovery equipment/tanks must be appropriate for that specific refrigerant, and mixing refrigerants in a recovery tank is a serious contamination issue",
  "Use a recovery tank that isn't overfilled — follow the tank's rated fill limit (by weight, using a scale), never fill by feel or by volume alone",
  "Follow proper liquid vs. vapor recovery procedure per your recovery machine's instructions for the fastest, most complete recovery",
  "Confirm system pressure reaches 0 psig (or the applicable EPA-required vacuum level for the equipment size) before considering recovery complete",
  "Log the recovery per your company's and EPA 608 recordkeeping requirements",
], safety:"Never vent refrigerant to atmosphere. Use only EPA-certified recovery equipment and follow EPA 608 regulations.", confidence:"common" },
{ id:"s-refrig-evacuation-vacuum", equipment:"Condenser/Heat Pump", title:"Proper evacuation procedure and reading a micron gauge", summary:"Getting a system to a proper deep vacuum before charging — a step that's often rushed and causes callbacks.", steps:[
  "Use a micron gauge, not just the vacuum pump's built-in gauge (if any) — pump gauges are not accurate enough to confirm a proper deep vacuum",
  "Pull to the target microns specified by the equipment manufacturer (commonly 500 microns or lower for most residential systems, but check the specific unit's requirement)",
  "Perform a standing vacuum/decay test: isolate the system from the pump and watch the micron gauge for a period — a rapid rise indicates a leak or moisture still present, not just normal minor equalization",
  "Use core removal tools when possible — schrader cores are a major restriction that can make a system look like it's holding vacuum when the pump just can't pull through them fast enough",
  "If evacuation is unusually slow or won't hold, suspect moisture in the system (especially after any repair involving an open system) rather than just running the pump longer indefinitely",
], confidence:"common" },
{ id:"s-refrig-nitrogen-pressure-test", equipment:"Condenser/Heat Pump", title:"Nitrogen standing pressure test before charging", summary:"Confirming there's no leak before investing time in evacuation and charging.", steps:[
  "Pressurize the system with dry nitrogen (never use oxygen or compressed air — oxygen is a serious explosion risk in an oil-contaminated system, and compressed air introduces moisture) to an appropriate test pressure for the equipment",
  "Never exceed the equipment's rated test pressure or the lowest-rated component's limit",
  "Let the system sit and monitor pressure over time, accounting for ambient temperature swings (pressure naturally rises/falls with temperature, which can be mistaken for a leak or a good seal)",
  "Use soap bubbles or an electronic leak detector at all accessible joints during the hold period to help pinpoint any leak rather than waiting on pressure decay alone",
  "Only proceed to evacuation once the standing pressure test confirms no leak",
], safety:"Never use oxygen, compressed air, or any flammable gas to pressure-test a refrigerant system. Use only dry nitrogen with a proper regulator, and never exceed rated test pressures.", confidence:"common" },
{ id:"s-refrig-noncondensables-purge", equipment:"Condenser/Heat Pump", title:"Suspected non-condensables in the system — confirming and correcting", summary:"Air or other non-condensable gas trapped in the refrigerant circuit, distinct from a simple overcharge.", steps:[
  "Classic sign: head pressure reads higher than the pressure/temperature chart would predict for the actual liquid line temperature, even after accounting for normal charge",
  "Let the system sit off long enough to equalize, then compare standing pressure against the outdoor ambient temperature on a P/T chart — a standing pressure noticeably higher than the chart predicts for that temperature strongly suggests non-condensables",
  "The only real fix is proper recovery, evacuation to a deep vacuum, and recharge — non-condensables can't be \"bled off\" reliably from the high side while leaving the refrigerant charge intact without significant refrigerant loss and imprecision",
  "Investigate how air got in to begin with — almost always a service performed without pulling a proper vacuum afterward — so the same mistake isn't repeated",
], confidence:"common" },
{ id:"s-refrig-lineset-undersized-oversized", equipment:"Condenser/Heat Pump", title:"Line set sized wrong for the equipment", summary:"An undersized or oversized line set (often from a mismatched replacement or long-run install) causing capacity or oil-return problems.", steps:[
  "Check actual line set diameter (liquid and suction) against the manufacturer's sizing chart for the equipment's tonnage and the actual line set length/vertical rise",
  "Undersized suction line: excessive pressure drop, reduced capacity, and possible compressor overheating from low suction pressure at the compressor despite adequate charge",
  "Oversized suction line: poor oil return, especially on long runs or with significant vertical rise, which over time can starve the compressor of lubrication",
  "Check for a P-trap at the base of any significant vertical suction riser to assist oil return on long/tall line sets, if not already present and required by the install",
  "This is a design/installation issue, not something charge adjustment can fix — correcting it means correcting the actual line set, not compensating with more or less refrigerant",
], confidence:"common" },
{ id:"s-refrig-a2l-handling", equipment:"Condenser/Heat Pump", title:"Handling A2L (mildly flammable) refrigerants like R32/R454B safely", summary:"Newer residential refrigerants are mildly flammable (A2L classification) and require different handling than R410A/R22.", steps:[
  "Use only tools, gauges, and recovery equipment rated for A2L refrigerants — standard R410A-only equipment may not be rated for A2L flammability requirements",
  "Ensure proper ventilation when recovering, evacuating, or charging — A2L refrigerants require more attention to avoiding buildup of concentrated vapor in an enclosed space",
  "Check for and eliminate ignition sources (open flame, sparking equipment) in the immediate work area more rigorously than with A1 (non-flammable) refrigerants",
  "Confirm the specific equipment's leak-detection/mitigation features (some A2L systems have a required refrigerant leak sensor and automatic response) are functioning as designed, not just checking refrigerant levels",
  "Follow the specific manufacturer's A2L service bulletin/manual for that equipment rather than assuming standard R410A procedures apply unchanged",
], safety:"A2L refrigerants are mildly flammable under specific conditions. Follow manufacturer-specific handling requirements and use only properly rated tools and equipment.", confidence:"common" },
{ id:"s-refrig-brazing-nitrogen-purge", equipment:"Condenser/Heat Pump", title:"Purging with nitrogen while brazing", summary:"Why an internal nitrogen purge during brazing matters, and what happens when it's skipped.", steps:[
  "Flowing a small amount of dry nitrogen through the piping while brazing prevents oxidation (black/dark scale) from forming on the inside of the copper",
  "Skipping this step allows oxide scale to form inside the line, which later breaks loose and circulates through the system — a common cause of clogged filter driers, TXV screens, and even compressor damage well after a repair was completed",
  "Use a low, steady flow — just enough to prevent oxidation, not high-pressure flow that could blow molten filler material through the joint",
  "Cap or restrict the open end of the piping during the purge so nitrogen actually flows through the joint area rather than escaping the nearest opening",
  "If you discover internal oxidation from someone else's earlier work (visible black scale when a component is opened up), treat that as a warning that debris may already be circulating elsewhere in the system, and consider a filter drier change and screen check even at points not directly worked on",
], confidence:"common" },
{ id:"s-refrig-weighing-in-charge", equipment:"Condenser/Heat Pump", title:"Weighing in a full charge vs. \"charging to a number\"", summary:"Best practice for charging after a full recovery/evacuation, versus topping off an existing partial charge.", steps:[
  "After a full recovery and evacuation, always weigh in the nameplate charge (base charge plus any line-length adjustment) using a refrigerant scale, rather than just charging by pressure/temperature alone",
  "Use subcooling/superheat readings afterward to fine-tune and confirm the charge is correct for actual operating conditions, not as the primary charging method when starting from a fully evacuated system",
  "For a system that was never fully evacuated (simple top-off of an undercharged but still-functioning system), charging by superheat/subcooling target is appropriate since you don't have a clean starting point to weigh in from",
  "Document the actual weight charged in your service records — this matters for future service calls and for tracking whether a system has an ongoing slow leak over time",
], confidence:"common" },

// ---------------- ELECTRICAL — PRACTICAL TEST PROCEDURES ----------------
{ id:"s-elec-capacitor-test-howto", equipment:"Other", title:"How to properly test a run/start capacitor", summary:"Reference procedure for capacitor testing, referenced by several other entries in this list.", steps:[
  "Power off the equipment and discharge the capacitor safely before touching its terminals — even a \"dead\" system can leave a capacitor holding a charge",
  "Disconnect at least one lead from each terminal being tested so you're reading the capacitor in isolation, not through the connected circuit",
  "Use a meter with a capacitance (µF) function, and compare the reading against the rated value printed on the capacitor's label — most capacitors have an acceptable tolerance range (commonly ±6%, but check the label) rather than needing to be exact",
  "For a dual-run capacitor, test each section (commonly labeled HERM and FAN) separately against its own rated value",
  "A capacitor reading below its rated range (even if not zero) is weak and a legitimate replacement candidate, not just an outright failure — don't only look for a capacitor that reads zero",
], safety:"Discharge capacitors with an insulated tool or a proper discharge resistor before handling — never short the terminals directly with a bare screwdriver.", confidence:"common" },
{ id:"s-elec-contactor-test-howto", equipment:"Other", title:"How to test a contactor for a bad/pitted condition", summary:"Reference procedure for contactor testing.", steps:[
  "Visually inspect the contacts first with power off — pitting, burning, or visible material transfer between contacts is a strong sign of a marginal contactor even if it currently still functions",
  "With power off, check the coil's resistance/continuity to confirm it's not open",
  "With power on and the contactor pulled in, check voltage drop across each set of closed contacts — a healthy contact should show very little voltage drop; significant drop across a closed contact indicates resistance from pitting/wear even though it's \"working\"",
  "Check that the contactor releases fully when de-energized — a contact that hangs up or releases slowly is also a replacement candidate",
  "Don't wait for total failure to replace a contactor showing these warning signs — a marginal contactor is a common cause of intermittent no-start complaints that are hard to catch on a single visit",
], safety:"Use extreme caution measuring voltage drop across live contacts — this requires the equipment energized. Use proper meter leads and technique, and be mindful of the live 240V circuit.", confidence:"common" },
{ id:"s-elec-compressor-amp-draw-howto", equipment:"Condenser/Heat Pump", title:"How to check compressor amp draw against RLA/LRA", summary:"Reference procedure for amp-draw testing, referenced by several compressor-related entries in this list.", steps:[
  "Locate the compressor's rated load amps (RLA) and locked rotor amps (LRA) on the compressor or unit nameplate — these are the actual reference numbers, not a generic rule of thumb",
  "Use a clamp meter on a single conductor to the compressor (common lead is typical) while it's running under normal load conditions",
  "Compare running amp draw against RLA — running meaningfully above RLA under normal load/charge conditions suggests the compressor is working harder than it should (mechanical wear, high head pressure, or overcharge); running well below RLA for the apparent load can suggest worn internal valves not doing their job",
  "For a hard-start diagnosis, a clamp meter with inrush/peak-hold capability can help capture the brief locked-rotor spike and compare it against LRA",
  "Always interpret amp draw together with actual operating pressures and conditions — a number alone without pressure/temperature context can be misleading",
], confidence:"common" },
{ id:"s-elec-voltage-drop-wiring", equipment:"Other", title:"Diagnosing voltage drop from undersized or long wire runs", summary:"Equipment reads correct voltage at idle but sags noticeably once running.", steps:[
  "Measure voltage at the equipment both at idle (or off) and again while running under full load — a healthy circuit shows only a small, normal sag; a large drop under load points to wiring, not the equipment",
  "Check wire gauge against the run length and the equipment's rated amp draw — a wire that was correctly sized for a shorter run or smaller predecessor unit can be undersized after equipment changes",
  "Check all connections along the run (disconnect, breaker lugs, wire nuts/splices) for looseness or corrosion — a single bad connection can cause a voltage drop that looks like a wire-gauge problem",
  "If voltage drop is confirmed as a wiring issue, this needs to be corrected at the wiring level (larger conductor, or address the bad connection) — it isn't something the equipment itself can compensate for long-term",
], confidence:"common" },
{ id:"s-elec-motor-winding-ohm-test", equipment:"Other", title:"Ohming out a motor (compressor/blower/fan) for open, shorted, or grounded windings", summary:"Reference procedure for motor winding testing, applicable to compressors, blower motors, and fan motors alike.", steps:[
  "With power off and the motor isolated (leads disconnected), measure resistance between each pair of winding terminals (commonly Common-Run, Common-Start, Run-Start on single-phase motors) and confirm each reads a real, non-infinite value",
  "An open winding reads infinite resistance (OL on most meters) between that pair — the motor has failed and needs replacement",
  "Check each winding terminal to the motor's frame/ground — this should read infinite (no continuity); any measurable resistance to ground indicates a grounded winding, which is also a failure",
  "For a three-terminal single-phase motor, the three winding readings should roughly relate to each other in a predictable way (the largest reading should be close to the sum of the other two) — a reading that doesn't fit this pattern suggests a partially shorted winding even if none of the three read infinite or grounded",
  "A motor that reads fine cold can still fail under running conditions from a thermal/mechanical issue — a good ohm test rules out an obvious electrical failure but doesn't guarantee the motor is otherwise healthy",
], safety:"Always fully de-energize and lock out the circuit before testing winding resistance — this test must be done with the motor completely isolated from power.", confidence:"common" },

// ---------------- ZONING (additional) ----------------
{ id:"s-zoning-bypass-oversized", equipment:"Other", title:"Zoning bypass duct oversized or undersized", summary:"A zoning system's bypass duct (used to relieve excess static pressure when few zones are calling) is sized wrong, causing temperature or noise complaints.", steps:[
  "Oversized bypass: too much conditioned air recirculates back to the return, causing the system to undersatisfy actively-calling zones (they never quite reach setpoint) and can cause the return air temperature to drift toward the supply temperature over a long cycle",
  "Undersized (or missing) bypass: high static pressure when only one or two zones call, causing noise, reduced airflow, evaporator icing risk, or nuisance high-limit trips",
  "Measure static pressure with only the smallest zone calling alone (worst-case scenario) to properly evaluate whether the bypass is adequately sized",
  "Check the bypass damper (if adjustable/motorized) is actually modulating correctly rather than assuming a fixed-position bypass is the issue",
  "Consider whether a variable-speed blower with pressure-based airflow control would serve this system better than a fixed bypass duct, if chronic problems persist",
], confidence:"common" },
{ id:"s-zoning-panel-conflicting-calls", equipment:"Other", title:"Zone panel receiving conflicting heat/cool calls from different zones", summary:"Different zone thermostats calling for opposite modes at the same time, causing the panel to make a judgment call the customer doesn't understand.", steps:[
  "This is often normal, expected zoning behavior, not a fault — most panels pick whichever mode was called first and hold the opposing zone's damper closed for a period (commonly up to 20-30 minutes) before allowing a switch",
  "Check the panel's specific conflict-resolution logic/settings in its manual, since this varies by manufacturer and is sometimes configurable",
  "Explain the behavior clearly to the customer, since \"my other zone won't do what I set it to\" is frequently a normal-operation education issue rather than an equipment problem",
  "If a zone is held off far longer than the panel's documented conflict-delay, then investigate as an actual fault (stuck damper, panel logic issue) rather than normal conflict handling",
], confidence:"common" },

// ---------------- THERMOSTAT / SMART HOME (additional) ----------------
{ id:"s-smart-thermostat-app-offline", equipment:"Other", title:"Smart thermostat shows offline in the app but still works locally at the wall", summary:"The physical thermostat operates fine, but remote app control/monitoring doesn't work.", steps:[
  "Check the thermostat's Wi-Fi connection status directly at the thermostat, not just in the app",
  "Check Wi-Fi signal strength at the thermostat's location — many thermostats disconnect below a certain signal threshold even if they briefly connected during setup in a different spot (see the Lennox S40 Wi-Fi entry in this list for specific numbers)",
  "Check whether the home's router/network changed recently (new router, changed password, ISP outage) since the thermostat was last connected",
  "Check for a manufacturer cloud service outage before assuming the thermostat itself is at fault — this is genuinely common and easy to mistake for a local hardware problem",
  "As a last step, forget/rejoin the network directly at the thermostat rather than just power-cycling it repeatedly",
], confidence:"common" },
{ id:"s-thermostat-geofencing-erratic", equipment:"Other", title:"Geofencing-based scheduling behaving unpredictably", summary:"A smart thermostat's location-based (geofence) automation triggers at the wrong times or not at all.", steps:[
  "Check that location services/permissions are actually enabled for the thermostat's app on each household member's phone — this is the single most common cause",
  "Check the configured geofence radius — a radius set too small can fail to trigger reliably depending on GPS accuracy, especially in dense urban areas",
  "Check for multiple household members' phones with conflicting geofence status (one still \"home,\" one \"away\") if the system uses combined presence logic",
  "Recommend a traditional time-based schedule as a fallback for customers who find geofencing unreliable, rather than continuing to chase phone-side GPS/permission issues indefinitely",
], confidence:"common" },
{ id:"s-multiple-thermostats-conflict", equipment:"Other", title:"Multiple thermostats on one system conflicting with each other", summary:"A home with more than one thermostat wired to the same single-zone equipment (not a proper zoning system) causing erratic operation.", steps:[
  "Confirm whether this is actually a proper zoning system (with a zone panel and dampers) or just multiple thermostats improperly wired in parallel to one piece of equipment — the latter is a real, if incorrect, installation you'll sometimes find in the field",
  "Wiring multiple thermostats in parallel without a zone panel causes unpredictable behavior since whichever thermostat's contacts close first/last can override or fight the other",
  "The correct fix is a proper zone control system with dampers, or removing all but one thermostat — not attempting to make parallel-wired thermostats behave predictably long-term",
  "Explain this clearly to the customer as a design issue if found, since it's often something a previous owner or handyman set up without understanding the implications",
], confidence:"common" },
{ id:"s-thermostat-wrong-swing-setting", equipment:"Other", title:"System cycles too tight or too loose (differential/swing setting)", summary:"Equipment turns on/off far more or less often than expected relative to the setpoint.", steps:[
  "Check the thermostat's temperature differential/swing setting — many thermostats let you adjust how far above/below setpoint the system must drift before cycling, and this is a genuine adjustable comfort/efficiency tradeoff, not always a fault",
  "A very tight differential causes frequent short cycling; a wide differential causes long temperature swings customers may perceive as the system \"not keeping up\"",
  "Check for a minimum on-time/off-time or compressor short-cycle protection setting interacting with the differential in ways that surprise the customer",
  "Set expectations with the customer about the comfort/cycling tradeoff rather than just changing the number without explanation, since they may want it changed back",
], confidence:"common" },

// ---------------- NOISE — component-specific breakdown ----------------
{ id:"s-noise-bearing-squeal-specific", equipment:"Other", title:"High-pitched squeal — narrowing down which bearing", summary:"A squeal could be a motor bearing or a blower wheel bearing — telling them apart before ordering parts.", steps:[
  "Motor bearing squeal is typically a steadier pitch, worse when the motor is under load, and may be accompanied by the motor housing feeling hot or by visible shaft play when off and cool",
  "Blower wheel bearing (the wheel itself sometimes has its own bearing/bushing) squeal often changes character with wheel speed and may be accompanied by visible wheel wobble",
  "With power off, try turning each suspect component by hand to feel for roughness/binding, which helps isolate the actual source before disassembly",
], confidence:"common" },
{ id:"s-noise-refrigerant-hissing", equipment:"Condenser/Heat Pump", title:"Hissing sound specifically from refrigerant lines or a valve", summary:"A hissing/whistling sound that's clearly refrigerant-related, not airflow-related.", steps:[
  "A brief hiss right after the compressor stops (pressure equalizing through the metering device) is normal on many systems — distinguish this from a continuous hiss during operation",
  "A continuous hiss during operation can indicate a restriction (partial blockage causing a pressure drop and flash gas noise) at that specific point in the line",
  "Check for a leak at that location — a hissing sound at a fitting or valve, especially combined with an oil stain, points strongly to an active leak rather than normal flow noise",
  "Check TXV operation if the hiss seems to originate right at the metering device — some hiss during normal modulation is expected, but a loud continuous hiss can indicate the valve is not seating/modulating correctly",
], confidence:"common" },
{ id:"s-noise-ductwork-ticking-popping", equipment:"Air Handler", title:"Ticking or popping sound from ductwork as it heats or cools", summary:"Metallic ticking/popping noise from the duct system, usually during startup/shutdown or shortly after.", steps:[
  "This is very commonly normal thermal expansion/contraction of sheet metal ductwork as temperature changes rapidly — especially noticeable on furnace startup with hot supply air hitting cool metal duct",
  "Check for ductwork that's undersized/overly restrictive causing more dramatic temperature swings at the duct surface than a properly sized system would produce",
  "Check for loose duct sections, unsupported spans, or metal-on-metal contact points (duct touching framing) that amplify normal expansion noise into something more noticeable/annoying",
  "If the noise is new and pronounced, check nothing has physically shifted or come loose (a strap, a duct board seam) rather than assuming it's the same normal noise as always",
], confidence:"common" },
{ id:"s-noise-compressor-knocking", equipment:"Condenser/Heat Pump", title:"Knocking sound specifically from the compressor", summary:"A mechanical knocking noise traced to the compressor itself, distinct from general unit vibration/rattling.", steps:[
  "Check for a flooded start condition (liquid refrigerant in the compressor at startup) — this often produces a knocking sound specifically during the first moments after startup, and points back to a charge, metering device, or crankcase heater issue rather than the compressor itself being at fault",
  "Check compressor mounting/isolation — a compressor that's come loose from its internal or external mounts can knock against the shell or base pan",
  "Check for a genuine internal mechanical fault (worn bearings, damaged valves) if knocking is present at all times during running, not just at startup — this typically means compressor replacement",
  "Check refrigerant charge and superheat, since persistent low superheat (flooding during normal running, not just startup) can cause an ongoing knock and will keep damaging a replacement compressor if the underlying cause isn't fixed first",
], safety:"A knocking compressor is often already being damaged as it runs — don't let it run indefinitely while sourcing parts if the noise is severe or worsening.", confidence:"common" },

// ---------------- AIRFLOW / DUCT (additional) ----------------
{ id:"s-duct-flexduct-crushed-kinked", equipment:"Air Handler", title:"Flex duct crushed or kinked in an attic/crawlspace", summary:"One specific room or area gets poor airflow while the rest of the house is fine.", steps:[
  "Physically inspect the flex duct run to that specific room in the attic/crawlspace — a crushed or sharply kinked section is a very common, easy-to-find cause once you actually look",
  "Check for the duct being compressed under other stored items, insulation, or foot traffic in an accessible attic",
  "Check for excessive sag between supports causing an effective kink even without external crushing",
  "Correct the physical routing/support rather than just noting reduced airflow at the register — a strapped, properly supported, gently-curved run resolves this permanently",
], confidence:"common" },
{ id:"s-duct-leakage-conditioned-vs-unconditioned", equipment:"Air Handler", title:"Significant duct leakage into an unconditioned space", summary:"Ductwork running through an attic, crawlspace, or garage is leaking conditioned air before it reaches the living space.", steps:[
  "Check accessible duct joints, boots, and plenum connections for disconnected or poorly sealed sections — a common finding especially on older mastic/tape-sealed systems where the sealant has failed over time",
  "Check for a noticeable difference between measured supply CFM at the equipment versus at the registers, which quantifies how much is being lost in between",
  "Reseal accessible leaks with mastic or proper foil tape (not standard cloth-backed \"duct tape,\" which fails over time) rather than a quick temporary patch",
  "For extensive leakage, discuss a proper duct blaster test and comprehensive sealing with the customer rather than just patching the few leaks you happen to find accessible",
], confidence:"common" },
{ id:"s-duct-attic-condensate-freeze", equipment:"Air Handler", title:"Condensate line freezing in an unconditioned attic", summary:"Condensate drain line freezes solid during cold weather where it runs through an unconditioned attic space, causing a backup.", steps:[
  "Check the drain line's route for exposure to attic temperatures at or below freezing, especially near soffit vents or gable vents where cold air infiltrates directly onto the line",
  "Check whether the line is insulated where it passes through the cold zone — an uninsulated line in a cold attic is a straightforward, correctable install oversight",
  "In heating mode, cooling condensate shouldn't normally be an issue, but a humidifier drain or a summer-leftover trap full of water can still freeze and cause problems even during the heating season",
  "Insulate or reroute the exposed section rather than just clearing the immediate ice blockage, since it will recur on the next cold snap otherwise",
], confidence:"common" },

// ---------------- HEAT PUMP (additional) ----------------
{ id:"s-hp-low-ambient-capacity-drop", equipment:"Condenser/Heat Pump", title:"Heat pump loses capacity / can't keep up as outdoor temperature drops", summary:"Customer reports the heat pump \"isn't working\" on cold days — often normal physics rather than a fault, but needs verification either way.", steps:[
  "Understand and explain the baseline: all air-source heat pumps lose heating capacity as outdoor temperature drops, and most have a manufacturer-published capacity curve showing this — some capacity loss on a cold day is expected, not automatically a fault",
  "Check actual delivered capacity/temperature rise against the manufacturer's rated performance for the current outdoor temperature, not against how it performs on a mild day",
  "Check refrigerant charge — a heat pump that's marginal on charge often performs adequately in mild weather but falls off a cliff in cold weather, making this the right time to catch an undercharge that was masked most of the year",
  "Check that backup/auxiliary heat is engaging appropriately to cover the gap on the coldest days — that's the system working as designed, not a failure of the heat pump itself",
  "If capacity is significantly worse than the manufacturer's own published curve for that outdoor temperature (not just \"less than summer\"), then treat it as a real fault and keep digging",
], confidence:"common" },
{ id:"s-hp-two-stage-stuck-low", equipment:"Condenser/Heat Pump", title:"Two-stage/variable-capacity heat pump stuck on low stage, can't reach full capacity", summary:"System runs but never ramps up to handle higher demand, even on a cold or hot design day.", steps:[
  "Check the thermostat's staging configuration and confirm it's actually capable of and configured to call for higher stages/capacity — a thermostat set up for single-stage operation on multi-stage equipment will never call for more",
  "Check for a stored fault code related to inverter/stage-up faults on the outdoor unit before assuming a control/thermostat issue",
  "Check outdoor ambient conditions against the equipment's staging logic — some systems intentionally limit staging under certain conditions (e.g., very high or very low ambient) as part of their normal control strategy",
  "Check communication between indoor and outdoor units on a communicating system, since a degraded (not fully failed) communication link can sometimes still run basic operation while blocking full-capacity coordination",
], confidence:"common" },
{ id:"s-hp-hot-gas-bypass-issue", equipment:"Condenser/Heat Pump", title:"Hot gas bypass/reheat malfunction (if equipped)", summary:"On systems equipped with hot gas reheat (for humidity control) or bypass (for capacity control), a stuck or malfunctioning valve causes unusual symptoms.", steps:[
  "Confirm the system is actually equipped with this feature before troubleshooting it as the cause — not common on standard residential equipment, but present on some higher-end/dehumidification-focused systems",
  "A hot gas bypass/reheat valve stuck open causes reduced cooling capacity and abnormally warm supply air even though the compressor is running normally",
  "A valve stuck closed means the dehumidification/reheat feature simply won't engage when called for, though normal cooling capacity is unaffected",
  "Check the valve's control signal (electronic or pressure-actuated, depending on design) against what's actually happening at the valve before condemning it",
], confidence:"common" },
{ id:"s-hp-compressor-sound-different-modes", equipment:"Condenser/Heat Pump", title:"Compressor sounds different or rougher specifically in heating vs. cooling mode", summary:"A heat pump that sounds fine in one mode but noticeably different in the other.", steps:[
  "Since heating mode reverses refrigerant flow, check reversing valve operation first — a valve that isn't fully shifting can cause both a sound difference and reduced performance specifically in one mode",
  "Check charge and superheat/subcooling specifically in the noisier mode, since a charge that's adequate for cooling can reveal itself as marginal in heating mode (or vice versa) due to the different operating pressures each mode produces",
  "Check for liquid refrigerant migration/flooding specifically in the mode where the crankcase heater or a lack thereof matters more (typically heating-season starts), producing a rougher sound at startup",
  "Don't assume a sound difference between modes is automatically abnormal — some compressors do run at slightly different sound/vibration characteristics between modes even when healthy; compare against a similar known-good unit if possible",
], confidence:"common" },
{ id:"s-hp-supplemental-heat-lockout-setting", equipment:"Condenser/Heat Pump", title:"Heat pump won't run the compressor at all below a certain outdoor temperature", summary:"Distinguishing an intentional compressor lockout setting from an actual fault.", steps:[
  "Check the thermostat/control system for a configured compressor lockout temperature — many dual-fuel and even straight heat-pump-with-backup systems have this as an intentional, configurable setting to favor backup heat below a certain point",
  "Confirm with the customer or prior documentation whether this was intentionally set (e.g., for a dual-fuel system favoring gas furnace heat in very cold weather) versus something that appears to have changed unexpectedly",
  "If the setting appears to have changed unexpectedly or wasn't intentionally configured, check for a stored fault or a control default that reset after a power event",
  "Once confirmed intentional, explain clearly to the customer why the outdoor unit isn't running at all in this weather — this is a very common source of \"my heat pump doesn't work\" complaints that are actually correct, deliberate operation",
], confidence:"common" },
{ id:"s-refrigerant-type-mismatch-retrofit", equipment:"Condenser/Heat Pump", title:"Older R22 system topped off or retrofitted with a replacement blend refrigerant", summary:"A legacy R22 system serviced with an R22 replacement/blend refrigerant (common as R22 became unavailable/expensive) showing charge or performance confusion.", steps:[
  "Confirm exactly what refrigerant is actually in the system — check service tags/stickers from previous work rather than assuming it's still R22, especially on an older system that's had multiple service visits over the years",
  "Understand that R22 replacement blends have different pressure/temperature relationships than R22 itself — using an R22 P/T chart on a system actually charged with a blend will lead to incorrect charging decisions",
  "Check for mixed refrigerants if service history is unclear or multiple different products may have been added over time — this is a real possibility on an older system with a long service history and is very difficult to correct without full recovery and proper identification",
  "If in doubt about what's actually in the system, use a refrigerant identifier before connecting recovery equipment, both for proper charging and to avoid contaminating your recovery tank/machine",
], confidence:"common" },

// ---------------- COMPRESSOR / REFRIGERATION CIRCUIT — deep dive ----------------
{ id:"s-scroll-compressor-reverse-rotation", equipment:"Condenser/Heat Pump", title:"Scroll compressor running backward (reverse rotation)", summary:"A 3-phase scroll compressor wired with any two legs swapped runs backward — it draws current and makes noise but pumps almost no refrigerant.", steps:[
  "Recognize the pattern: loud rattling/growling noise, high amp draw close to or above RLA, suction pressure barely drops and head pressure barely rises after startup — the compressor is 'running' but not compressing",
  "This only happens on 3-phase scroll compressors — single-phase scrolls have a fixed rotation and can't run backward",
  "Confirm by checking suction and discharge pressure within the first 5-10 seconds of a call — a correctly rotating scroll pulls suction down and pushes head up almost immediately; a reverse-rotating one won't",
  "Shut the unit down immediately once reverse rotation is confirmed — running it backward for more than a few minutes can damage the scroll flanks and drive bearing",
  "Swap any two of the three line-voltage legs at the disconnect or contactor to correct rotation direction, then re-verify pressures on restart",
  "On a job with a newly replaced compressor, motor, or after any 3-phase panel/feeder work, always verify rotation direction before leaving — this is a common callback after 3-phase service",
], safety:"Lock out and tag the disconnect before swapping any line-voltage leads. Verify phases are actually de-energized with a meter before touching terminals.", confidence:"common" },

{ id:"s-scroll-compressor-tipping-noise", equipment:"Condenser/Heat Pump", title:"Scroll compressor scroll set tipping/rattling under low-load conditions", summary:"Some scroll designs allow the orbiting scroll to momentarily separate (\"tip\") from the fixed scroll under very low compression ratio or flooded conditions, producing a rattling or clacking noise that can sound like a mechanical failure but isn't.", steps:[
  "Note when the noise occurs — tipping is most common at very low outdoor ambient in cooling, at startup, or any time compression ratio is unusually low",
  "Distinguish from a true mechanical failure: tipping noise tends to be intermittent and load/condition-dependent, while bearing or thrust-plate failure noise is present continuously and usually worsens over time",
  "Check for flooding as a root cause — liquid refrigerant reaching the compressor lowers effective compression ratio and is a common trigger for tipping; verify superheat at the compressor inlet and crankcase heater operation",
  "Check for low-ambient operation without proper head pressure control (no fan cycling, no flooded condenser control) — very low condensing pressure combined with tipping-prone conditions",
  "If tipping is occurring on a system that's charged and controlled correctly, this may simply be a characteristic of that specific compressor design at the extreme edge of its operating envelope — verify against the manufacturer's minimum operating conditions before condemning the compressor",
  "If noise is constant, worsens under normal load, or is accompanied by rising amp draw or falling capacity, treat it as a mechanical failure rather than tipping and proceed to compressor replacement",
], confidence:"common" },

{ id:"s-scroll-internal-check-valve-backspin", equipment:"Condenser/Heat Pump", title:"Scroll compressor backspin / internal check valve chatter at shutdown", summary:"Most scroll compressors have an internal (or line-set) check valve to prevent high-side pressure from spinning the scroll backward at shutdown — a failed valve produces a loud whooshing/rattling sound for a few seconds after the unit stops.", steps:[
  "Confirm the timing: this noise happens specifically in the few seconds right after the compressor shuts off, not during normal running — that's the signature of backspin, not a running-noise complaint",
  "Backspin happens when high-side pressure pushes back through the compressor and spins the scroll set in reverse for a moment before the check valve should seat and stop it",
  "A failed or missing internal/discharge check valve lets this reverse spin continue longer and louder than normal, and over time can accelerate wear on the scroll flanks and bearing",
  "Check for excessive short-cycling as a contributing factor — frequent stop/start cycles give the system more opportunities to build the pressure differential that drives backspin",
  "If backspin noise is loud, prolonged (more than a couple seconds), or has gotten noticeably worse over time, suspect the check valve itself has failed — this is typically not a separately serviceable part and points toward compressor replacement",
  "Rule out a genuinely oversized system or a very short off-cycle equalization time as an underlying contributor before condemning the compressor",
], confidence:"common" },

{ id:"s-scroll-compressor-flooded-start-damage", equipment:"Condenser/Heat Pump", title:"Scroll compressor damage from repeated flooded starts", summary:"Liquid refrigerant present in the compressor shell at startup (flooded start) doesn't compress — it washes oil off the scroll flanks and bearings and can cause immediate mechanical damage on a scroll, which has tighter tolerances than a reciprocating design.", steps:[
  "Suspect flooded starts on any system with an undersized or non-functioning crankcase heater, especially after a long off-cycle in cool weather when refrigerant migrates to the coldest point (often the compressor)",
  "Listen at startup specifically: a loud bang, gurgle, or several seconds of rough/labored sound right as the compressor kicks on — smoothing out after a few seconds — is a classic flooded-start signature",
  "Check crankcase heater operation (continuity, and that it's actually powered during the off-cycle, not just when the compressor runs) on any system equipped with one",
  "Check for an oversized TXV/EEV or a metering device stuck open, which can dump liquid into the suction line during the off-cycle or at startup",
  "Check for low superheat readings during normal running, which points to a chronic overfeeding condition that sets up repeated flooded starts rather than a one-time event",
  "Repeated flooded starts cause cumulative wear — if a scroll compressor shows declining capacity or rising amp draw after a known history of flooded starts, factor that history into the diagnosis rather than treating it as unrelated",
], safety:"A severely flooded start can hydraulic-lock the compressor and trip the breaker or overload — don't force repeated restart attempts without finding the root cause first.", confidence:"common" },

{ id:"s-recip-compressor-valve-plate-failure", equipment:"Condenser/Heat Pump", title:"Reciprocating compressor valve plate failure signature", summary:"A cracked, broken, or leaking reed valve in a reciprocating compressor's valve plate lets refrigerant slip past on the compression stroke — the compressor runs and draws current but capacity drops.", steps:[
  "Check amp draw against RLA: a compressor with a leaking valve plate typically draws noticeably lower amps than the load would suggest, because it's doing less actual compression work",
  "Check head and suction pressures together: low head pressure with suction pressure that stays higher than it should (doesn't pull down properly) is the classic reed valve leak pattern — refrigerant is slipping back past the valve instead of being pushed to the high side",
  "Listen for the compressor sound changing character — a valve plate failure often sounds different (more of a hissing/blowing quality mixed with the normal running sound) rather than a mechanical knock",
  "Rule out a reversing valve internal bypass or a stuck-open metering device first, since both can mimic the same low-head/high-suction pressure pattern — the amp draw check is what separates a bad valve plate from those",
  "A visual/mechanical confirmation (pulling the valve plate) is only possible on serviceable/semi-hermetic compressors — on a fully welded hermetic, base the diagnosis on the pressure and amp pattern since the compressor can't be opened in the field",
  "Once confirmed, this is a compressor replacement (or valve plate replacement on serviceable semi-hermetic units only) — don't chase it as a charge or metering device problem",
], safety:"Recover refrigerant per EPA 608 regulations before opening the system for compressor replacement.", confidence:"common" },

{ id:"s-recip-compressor-rod-knock", equipment:"Condenser/Heat Pump", title:"Reciprocating compressor rod knock", summary:"A worn connecting rod bearing or wrist pin in a reciprocating compressor produces a distinct mechanical knocking sound tied to compressor speed, separate from liquid slugging noise.", steps:[
  "Listen for a steady, rhythmic knock synced to the compressor's running speed — this is different from an occasional bang at startup (which points toward liquid slugging/flooding) or a continuous rattle (which points toward a loose internal part)",
  "Check that the knock is present under all load conditions and doesn't go away as the system stabilizes — flooding-related noise typically settles down within the first 10-30 seconds of a cycle, while rod knock persists",
  "Rule out liquid floodback as the cause first: check superheat at the compressor inlet, crankcase heater operation, and TXV/EEV condition — correcting a flooding condition sometimes reduces but won't eliminate true mechanical rod knock",
  "Check oil level/sight glass if accessible — chronic low oil level accelerates bearing wear and can itself contribute to knock developing over time",
  "Rod knock indicates internal mechanical wear that will progress — this is not a condition to monitor and revisit; plan for compressor replacement once confirmed",
  "On a semi-hermetic/serviceable compressor, a qualified shop can sometimes replace the affected connecting rod/bearing, but on the sealed hermetic compressors used in most residential/light commercial equipment, replacement of the whole compressor is the only option",
], safety:"A compressor with a failing rod can seize or throw a rod through the shell — don't continue running the system indefinitely once rod knock is confirmed.", confidence:"common" },

{ id:"s-rotary-compressor-failure-signs", equipment:"Condenser/Heat Pump", title:"Rotary compressor specific failure signs (small equipment/mini-splits)", summary:"Rotary (rolling piston or single-vane) compressors are common in smaller mini-split and window/PTAC equipment and fail differently than scroll or reciprocating designs.", steps:[
  "Check for a distinctive high-pitched whine or grinding noise that increases with speed — rotary compressors run at higher RPM than reciprocating designs and wear noise tends to be higher-pitched",
  "Check amp draw against RLA — a rotary compressor with worn vane/roller clearances leaks refrigerant internally and, like other worn compressors, often draws lower amps than the load suggests while failing to build pressure difference",
  "Rotary compressors are especially sensitive to liquid floodback because of tight rotor-to-cylinder clearances — check superheat and crankcase heater/base pan heater operation on any rotary-compressor system with a history of rough starts",
  "Check for a compressor that starts but immediately trips on internal overload repeatedly — rotary compressors have relatively low locked-rotor tolerance and a marginal start capacitor or low voltage condition affects them more noticeably than larger reciprocating units",
  "On inverter-driven rotary compressors (common in mini-splits), also check the drive board output and DC bus voltage before condemning the compressor itself — a bad drive can produce symptoms that look identical to a failing compressor",
  "Because most rotary compressors in this equipment class are fully sealed with no serviceable internals, any confirmed internal mechanical failure means compressor (or often full outdoor unit) replacement",
], safety:"Discharge capacitors and verify power is locked out before handling compressor terminals or drive board components.", confidence:"common" },

{ id:"s-fixed-orifice-charging-method", equipment:"Condenser/Heat Pump", title:"Charging a fixed-orifice (piston) system by pressure/temperature chart", summary:"A fixed-orifice or piston metering device doesn't hold superheat constant the way a TXV does, so it's charged to a manufacturer pressure/temperature target rather than a fixed superheat number.", steps:[
  "Confirm the system actually uses a fixed orifice/piston, not a TXV — charging method is different and using TXV-style superheat targets on a piston system leads to a wrong charge",
  "Get the manufacturer's specific charging chart for that piston system — it typically gives a target suction pressure or superheat based on outdoor temperature and indoor wet bulb (return air) temperature, not a single fixed number",
  "Measure both outdoor ambient dry bulb and indoor return air wet bulb before charging — piston system charging is far more sensitive to these two inputs than a TXV system is",
  "Expect superheat on a properly charged piston system to vary meaningfully with load and outdoor conditions — this is normal behavior, not a sign of a problem, unlike a TXV system where superheat should hold fairly steady",
  "Charge to the chart's target using suction pressure/superheat as the primary reference, then confirm subcooling falls in a reasonable range as a secondary check — don't charge to a subcooling target on a piston system the way you would on a TXV system",
  "If actual conditions fall outside the chart's range (very low or very high outdoor temp, or extreme humidity), use the closest chart values and rely on overall system performance (temperature split, amp draw) to sanity-check the charge rather than forcing an exact chart match",
], confidence:"common" },

{ id:"s-piston-metering-device-plugged", equipment:"Condenser/Heat Pump", title:"Fixed-orifice piston metering device plugged or stuck", summary:"Debris, wax, or moisture ice can partially or fully block a fixed-orifice piston, starving the evaporator in a way that looks like a severe undercharge.", steps:[
  "Check suction pressure: a plugged piston pulls suction into a deep vacuum-like reading well below what a simple undercharge would produce, since the restriction is fixed and fully blocks flow rather than just reducing charge",
  "Check subcooling at the condenser — subcooling will be abnormally high because refrigerant is backing up ahead of the blockage, similar to the high-subcooling-with-restriction pattern seen with a plugged filter drier",
  "Feel or measure liquid line temperature right at the piston housing — a sharp temperature drop across a very short distance confirms a restriction at that exact point rather than somewhere else in the liquid line",
  "Recover, remove, and inspect the piston for physical debris, or for ice if moisture contamination is suspected (moisture will show as a piston that clears when warmed, then re-plugs after running)",
  "If debris is found, check upstream for the source — a filter drier that's breaking down internally, or contamination left over from a prior compressor burnout, are common causes of debris reaching the piston",
  "After clearing or replacing the piston, replace the filter drier and evacuate properly before recharging — don't just clear the piston and put the old, possibly-contaminated drier back in service",
], safety:"Recover refrigerant per EPA 608 regulations before opening the liquid line to access the piston.", confidence:"common" },

{ id:"s-fixed-orifice-wrong-size", equipment:"Condenser/Heat Pump", title:"Wrong-sized piston/orifice for the system's tonnage", summary:"An orifice sized for the wrong tonnage — common after a coil or condenser swap where the piston wasn't updated — causes chronic over- or underfeeding that no amount of charge adjustment will fully correct.", steps:[
  "Suspect this specifically after any mismatched-component situation: a coil replaced with a different tonnage, an indoor and outdoor unit from different systems paired together, or a piston that wasn't changed when the outdoor unit was upgraded",
  "An orifice too small for the tonnage underfeeds the coil — high superheat, low suction pressure, and reduced capacity, resembling a restriction or undercharge that charging to spec never quite resolves",
  "An orifice too large for the tonnage overfeeds the coil — low, unstable superheat and a risk of liquid floodback to the compressor, resembling an overcharge that persists even after removing refrigerant to correct subcooling",
  "Confirm the installed piston size against the manufacturer's piston sizing chart for the actual matched indoor/outdoor tonnage combination — piston size is usually stamped or color-coded on the piston itself",
  "If the piston size doesn't match the chart for the equipment actually installed, replace it with the correct size before doing any further charge adjustment — charging around a wrong-sized piston is not a durable fix",
  "After correcting the piston size, recharge to the pressure/temperature chart for that system rather than reusing readings taken with the wrong piston installed",
], confidence:"common" },

{ id:"s-eev-fault-patterns-vs-txv", equipment:"Condenser/Heat Pump", title:"EEV-specific fault patterns that differ from a mechanical TXV", summary:"An electronic expansion valve (EEV) is driven by a stepper motor and controlled by a board reading thermistors, so its failure modes and diagnostic approach are different from a mechanical TXV's bulb-and-spring operation.", steps:[
  "Recognize that an EEV has no sensing bulb and no mechanical superheat spring — heating/cooling a bulb by hand (the standard TXV test) does nothing on an EEV; diagnosis has to go through the board and its thermistor inputs instead",
  "Check the two thermistors the board uses to calculate superheat/subcooling for the EEV algorithm (typically at the coil and at the suction or liquid line) — a thermistor that's failed, reading incorrectly, or making poor thermal contact throws the valve's control off even though the valve itself is fine",
  "Check for an EEV fault code on the board first — most EEV-equipped systems log a specific valve or driver fault (stepper motor open/shorted coil, position sensor fault, driver IC fault) rather than leaving you to infer a mechanical problem from pressures alone",
  "If no fault code is present but the valve seems stuck at one position, check for actual stepper motor movement — you may be able to hear or feel a faint clicking/stepping motion as the board commands the valve open or closed during a call; no movement at all points to the valve coil, connector, or driver circuit rather than a mechanical jam",
  "EEVs fail open, closed, or partially stuck in a fixed position — unlike a mechanical TXV, they don't respond to bulb temperature changes at all when the stepper motor or its driver has failed, which is the key test that distinguishes an EEV failure from a control/thermistor input problem",
  "Confirm the valve's connector and wiring harness are fully seated and undamaged before condemning the valve itself — a stepper motor EEV with one winding open from a damaged harness pin behaves identically to a failed valve",
], confidence:"common" },

{ id:"s-eev-stepper-motor-failure", equipment:"Condenser/Heat Pump", title:"EEV stepper motor/coil failure diagnosis", summary:"The EEV's stepper motor has multiple windings that can be individually checked with an ohmmeter, similar to checking a blower ECM's windings, to confirm the valve itself versus its driver circuit.", steps:[
  "With power off and the valve connector disconnected, ohm out the stepper motor windings per the manufacturer's pinout — most EEV stepper motors have 4 (sometimes 5-6) wires with a specific resistance pattern between winding pairs",
  "An open winding (infinite resistance where a reading is expected) or a shorted/grounded winding (continuity to the valve body/ground) confirms the valve itself has failed electrically",
  "If windings test normal, the fault likely sits in the driver circuit on the control board rather than the valve — check for board-level EEV driver fault codes before replacing the valve",
  "A valve that tests electrically fine but doesn't move can still be mechanically seized (rare, but possible from internal contamination) — if the board confirms it's sending drive signals and windings test good but the valve position never changes, mechanical seizure is the remaining explanation",
  "Replacing an EEV requires the same recovery, evacuation, and proper brazing/torch control as any other metering device replacement — take extra care with heat near the valve body's plastic/electronic components",
  "After replacement, verify the board recognizes and can drive the new valve (many controls run a valve calibration/homing routine automatically at power-up) before calling the repair complete",
], safety:"Recover refrigerant per EPA 608 regulations before removing the valve; protect the valve body and any wiring from direct torch heat during brazing.", confidence:"common" },

{ id:"s-cap-tube-system-troubleshoot", equipment:"Condenser/Heat Pump", title:"Capillary tube metering system troubleshooting", summary:"Capillary tube systems have no moving parts in the metering device and are charge-critical — there's no way to trim the charge for changing conditions the way a TXV compensates, so exact charge matters more.", steps:[
  "Confirm the system uses a cap tube (common on small package units, some window/PTAC units, and older or smaller residential equipment) rather than a piston or TXV — cap tube systems are charged by weight to the nameplate, not adjusted after the fact by superheat",
  "Because there's no adjustable metering, even a small charge deviation shows up clearly in performance — slightly low charge causes noticeably higher superheat and reduced capacity, slightly high charge causes flooding risk, more so than on a TXV system with the same charge error",
  "Check for a restricted cap tube (kinked, or blocked by debris/wax) the same way as a plugged piston: abnormally high subcooling with very low suction pressure, and a sharp temperature drop across a short section of the tube",
  "Cap tube systems are especially sensitive to moisture — even a small amount of moisture can freeze right at the tube's narrowest point and cause an intermittent restriction that seems to clear and return; if symptoms come and go without any charge added, suspect moisture over debris",
  "If the tube is confirmed restricted or contaminated, it's typically not repairable in place — replace the cap tube assembly (often integrated with the drier on smaller systems) rather than trying to clear it",
  "After any repair, evacuate deeply given the system's higher sensitivity to moisture, and weigh in the full nameplate charge rather than charging to pressure on a cap tube system",
], safety:"Recover refrigerant per EPA 608 regulations before cutting into a cap tube or drier assembly.", confidence:"common" },

{ id:"s-cap-tube-restriction-vs-undercharge", equipment:"Condenser/Heat Pump", title:"Cap tube system: telling a restricted tube from a genuine undercharge", summary:"Both a restricted capillary tube and a true undercharge produce low suction pressure and high superheat on a cap tube system, but the subcooling reading tells them apart.", steps:[
  "Check subcooling first — a genuine undercharge produces LOW subcooling along with the low suction pressure and high superheat; a restricted cap tube produces HIGH subcooling because refrigerant is backing up in the condenser ahead of the blockage",
  "If subcooling is low along with low suction/high superheat, this points to undercharge/leak — leak search before adding refrigerant",
  "If subcooling is high along with low suction/high superheat, this points to a restriction in the cap tube or drier — do not add refrigerant, since that will worsen the imbalance and risk high head pressure",
  "Feel the cap tube (or drier body just ahead of it) for a cold spot or frost line at an unusual point along its length — a visible frost line partway down the tube on an otherwise room-temperature line is a strong restriction indicator",
  "Confirm with amp draw and discharge line temperature — a restricted system often shows unusually high discharge temperature since the compressor is working against reduced flow",
  "When in doubt, weigh out and recover the full charge, replace the drier/cap tube assembly if restriction is confirmed, evacuate, and weigh back in the full nameplate charge rather than incrementally guessing",
], safety:"Recover refrigerant per EPA 608 regulations before opening the system.", confidence:"common" },

{ id:"s-evap-coil-formicary-corrosion", equipment:"Condenser/Heat Pump", title:"Formicary (ant-nest) corrosion pinhole leaks on an evaporator coil", summary:"Formicary corrosion is a distinct pattern of many tiny pinhole leaks tunneling through copper tubing, caused by volatile organic acids (from building materials, cleaners, adhesives) reacting with moisture on the coil surface — not from ants themselves.", steps:[
  "Suspect this pattern specifically on coils that are a few years old (not brand new, not decades old) with a slow, hard-to-pin-down leak rather than one obvious failure point",
  "Look for the visual signature if the tube can be cut open or a failed section examined: a network of tiny interconnected tunnels through the copper wall that resembles ant tunneling — this is where the name comes from, though it has nothing to do with actual ants",
  "Electronic leak detection often struggles to pinpoint one exact spot because there can be multiple micro-leaks active or forming across the coil face rather than a single failure point",
  "Consider likely VOC sources nearby: new construction/renovation off-gassing, certain cleaning products, adhesives, paints, or building materials stored near the indoor unit — formicary corrosion is driven by these organic acids combined with the condensation that naturally forms on a cold coil",
  "Because it's a distributed failure mode across the coil rather than one repairable spot, coil replacement is almost always the correct repair rather than attempting to braze/patch individual leaks",
  "If replacing the coil, consider recommending a protective coating on the replacement coil and identifying/removing the VOC source if possible — otherwise the replacement coil is exposed to the same conditions that caused the original failure",
], safety:"Recover refrigerant per EPA 608 regulations before cutting into a leaking coil.", confidence:"common" },

{ id:"s-evap-coil-fin-damage-airflow", equipment:"Condenser/Heat Pump", title:"Evaporator coil fin damage restricting airflow (distinct from a dirty coil)", summary:"Crushed, bent-over, or physically damaged fins reduce airflow across the coil the same way dirt buildup does, but cleaning won't fix it — the fin structure itself needs to be restored or the coil replaced.", steps:[
  "Visually inspect the coil face for fins that are bent flat, crushed, or matted down over an area, as opposed to fins that are simply coated in dirt/dust — damage is usually localized (from a filter that was jammed in wrong, shipping damage, or a rough previous service) while dirt buildup tends to be more uniform",
  "Check whether the damage happened during installation or shipping (common on a still-new system) versus developing over time from repeated impact (a filter edge rubbing, an object stored against the coil, a pet or pest getting into the cabinet)",
  "A fin comb (fin straightening tool) matched to the fin spacing can restore airflow through moderately bent fins — this is worth trying before condemning the coil, especially on a newer unit",
  "If damage is extensive (a large percentage of the face area crushed flat) or the fins are torn/missing rather than just bent, a comb won't meaningfully restore airflow and coil replacement is the more realistic fix",
  "After straightening or replacing, verify the underlying cause is corrected (filter sized/installed properly, nothing stored against the coil, access panel reinstalled correctly) so the damage doesn't recur",
  "Re-measure static pressure and temperature split after the repair to confirm airflow is actually restored, not just visually improved",
], confidence:"common" },

{ id:"s-suction-line-sweating-condensation", equipment:"Condenser/Heat Pump", title:"Suction line or evaporator coil sweating from missing/damaged insulation", summary:"A bare or poorly insulated suction line runs colder than the surrounding air's dew point and sweats, which can be mistaken for a refrigerant or drain problem.", steps:[
  "Inspect the full accessible length of the suction line insulation — gaps at fittings, insulation pulled back during a prior repair and not replaced, sun-degraded/cracked foam in an attic or on a roof, or missing insulation where the line passes through a wall are all common failure points",
  "Confirm the sweating is on the suction line/uninsulated fittings specifically, not dripping from the coil drain pan or a separate condensate issue — trace any water back to its actual source before assuming insulation is the cause",
  "Check indoor humidity levels — sweating from marginal insulation is worse in high-humidity conditions and may only show up seasonally, which can make it look like an intermittent problem when it's really a humidity-dependent one",
  "Re-insulate any bare sections with properly sized closed-cell foam insulation, sealing seams and joints (including at flare fittings and valve stems, which are common overlooked spots) rather than just wrapping the straight runs",
  "In high-humidity or long-run applications, consider whether the standard-thickness insulation is adequate or whether a thicker-wall insulation is warranted, particularly on lines passing through hot attics",
  "This is a comfort/property-damage issue (dripping, staining, potential mold) rather than a performance issue — the refrigerant charge and system operation are unaffected, so don't chase a charge problem based on sweating alone",
], confidence:"common" },

{ id:"s-microchannel-condenser-coil-failure", equipment:"Condenser/Heat Pump", title:"Microchannel condenser coil failure differs from fin-and-tube", summary:"Microchannel (flat aluminum tube) condenser coils fail differently than traditional round-tube fin-and-tube coils, and that difference changes both diagnosis and repair options.", steps:[
  "Identify the coil type visually — microchannel coils use flat aluminum tubes with tiny internal channels and louvered aluminum fins, versus round copper (or aluminum) tubes with a separate fin material in a fin-and-tube coil",
  "Microchannel coils are more airflow-sensitive to fin damage because the flat tube/fin geometry has less open area to begin with — even moderate fin crushing can meaningfully restrict airflow compared to the same damage on a round-tube coil",
  "Leaks on a microchannel coil are often from galvanic corrosion at the joint between the aluminum tube and any dissimilar metal (fittings, brazed joints to copper line sets) rather than from pinhole corrosion through the tube wall itself the way formicary corrosion attacks copper",
  "Physical impact damage (hail, debris, a ladder or tool striking the coil) tends to crack or crush the flat tubes more readily than it would dent a round copper tube, since the flat tube walls are thinner",
  "Microchannel coils are generally not economical or reliable to braze-repair in the field the way a copper fin-and-tube coil sometimes can be — confirm with the manufacturer's guidance, but plan on coil (or full condenser coil assembly) replacement for a confirmed leak",
  "When replacing, confirm the replacement coil's connections are compatible with the existing copper line set — microchannel-to-copper transition joints need proper technique (and sometimes a factory transition fitting) to avoid setting up the same galvanic corrosion that may have caused the original failure",
], safety:"Recover refrigerant per EPA 608 regulations before cutting into any coil.", confidence:"common" },

{ id:"s-microchannel-coil-repair-limitations", equipment:"Condenser/Heat Pump", title:"Why a leaking microchannel coil usually can't be field-repaired", summary:"The flat, multi-channel aluminum tube construction that makes microchannel coils efficient also makes conventional brazing repairs impractical in most field situations.", steps:[
  "Understand the construction: each flat tube contains multiple small parallel internal channels, so a single leak point can involve several channels at once, and there's very little wall thickness to work with compared to round copper tubing",
  "Recognize that standard brazing repair techniques developed for round copper tube don't transfer well — the thin aluminum tube walls are prone to burning through or further cracking under torch heat, and aluminum brazing requires different technique, flux, and filler material than copper-to-copper work",
  "Sealants/leak-stop products are not a professional repair for a microchannel coil and shouldn't be presented as one — treat a confirmed microchannel leak as a coil replacement, not a candidate for a stop-leak additive",
  "Before condemning the coil, confirm the leak is actually within the coil itself and not at a brazed transition joint or fitting just outside the coil body — a leak right at a transition joint may be repairable using proper technique even when the coil core itself would not be",
  "Factor coil replacement cost/lead time into the conversation with the customer early — microchannel coils are sometimes only available as part of a larger condenser coil assembly, not as a standalone core, depending on the equipment",
  "If the equipment is still under warranty, check whether the manufacturer requires the failure to be documented/reported in a specific way before replacement, since microchannel failures are sometimes tracked separately by manufacturers",
], safety:"Recover refrigerant per EPA 608 regulations before removing a failed coil.", confidence:"common" },

{ id:"s-coastal-condenser-coil-corrosion", equipment:"Condenser/Heat Pump", title:"Condenser coil corrosion in coastal/salt-air environments", summary:"Salt-laden air accelerates corrosion on outdoor condenser coils, cabinets, and fasteners well beyond what's typical inland, and changes both the failure pattern and the maintenance recommendation.", steps:[
  "Look for a corrosion pattern concentrated on the windward side of the unit (the side facing prevailing wind/ocean exposure) and worse than the unit's age would otherwise suggest",
  "Check both the coil (fin and tube/microchannel surface) and the cabinet, screws, and structural fasteners — salt corrosion attacks the whole outdoor unit, not just the coil, and a corroded cabinet or base can be as much of a problem as a corroded coil",
  "On a coil that isn't leaking yet but shows visible white/gray corrosion buildup on fins or tube surfaces, recommend a coil rinse-down schedule (fresh water rinse at a regular interval) as a preventive measure — this is far more critical in coastal applications than inland ones",
  "If the equipment wasn't originally specified with a coastal-rated coil coating (factory e-coat, epoxy, or similar corrosion-resistant treatment), flag this to the customer — standard bare aluminum/copper coils have a shorter expected life in heavy salt exposure and this is worth knowing before doing repeated leak repairs on the same equipment",
  "For a coil already leaking from corrosion, treat it the same as any other confirmed coil leak (replacement, not patch repair) but discuss upgrading to a coastal-rated or coated replacement coil if available for that equipment line",
  "Set expectations with the customer that in heavy coastal exposure, corrosion-related coil and cabinet issues may recur on a shorter cycle than typical inland service life, regardless of the specific repair done this visit",
], safety:"Recover refrigerant per EPA 608 regulations before cutting into a corroded, leaking coil.", confidence:"common" },

{ id:"s-suction-accumulator-function-failure", equipment:"Condenser/Heat Pump", title:"Suction line accumulator function and failure signs", summary:"A suction accumulator (common on heat pumps and some AC systems) traps liquid refrigerant and oil before it reaches the compressor, metering it back in slowly through a small bleed orifice — a failed one either won't trap liquid at all or won't return oil properly.", steps:[
  "Confirm the equipment actually has an accumulator (common on heat pumps to protect the compressor during defrost and low-ambient/low-load heating operation, and on some AC-only systems with a history of floodback) before troubleshooting one that isn't there",
  "If the compressor shows signs of liquid slugging (banging at startup, flooded operation) even with an accumulator installed and properly sized, check the accumulator's internal bleed orifice/U-tube for a plug — a plugged bleed passage stops oil (and any trapped liquid) from ever making it back to the compressor, which starves the compressor of oil even while looking like it's protecting against liquid",
  "Check for oil-starvation symptoms specifically — compressor bearing noise, or a compressor running low on oil despite no external leak — as a sign the accumulator's oil return path (not the liquid trapping function) has failed",
  "Physically feel/check accumulator surface temperature during operation — one that's staying unusually cold or frosted over during normal running (not defrost) may indicate it's holding more liquid than it should be metering back, pointing to an overfeeding metering device upstream rather than the accumulator itself being at fault",
  "An accumulator itself rarely fails outright — it's more common to find the bleed orifice plugged with debris or oil sludge, or the unit undersized/oversized for the application, than to find the accumulator vessel itself physically damaged",
  "If accumulator replacement is warranted (from a confirmed plug that can't be cleared, or physical damage), also address whatever upstream condition (chronic floodback, metering device fault) caused the accumulator to be overwhelmed in the first place — otherwise the replacement accumulator faces the same fate",
], safety:"Recover refrigerant per EPA 608 regulations before opening the accumulator or suction line.", confidence:"common" },

{ id:"s-suction-accumulator-undersized-retrofit", equipment:"Condenser/Heat Pump", title:"Accumulator sizing after a compressor replacement or system retrofit", summary:"Swapping in a different compressor, a larger indoor coil, or a different refrigerant during a retrofit can leave the original accumulator undersized for the new operating conditions.", steps:[
  "Check whether any retrofit work (compressor replacement with a different displacement, coil replacement, refrigerant change/retrofit) has been done on this system before assuming an accumulator failure is a standalone issue",
  "An accumulator sized for the original equipment may not have adequate liquid-holding capacity for a system that now runs with different charge levels or different floodback characteristics after a retrofit",
  "Check manufacturer guidance for accumulator sizing relative to compressor displacement/tonnage if this system has been modified from its original factory configuration",
  "Watch for recurring floodback or oil-return symptoms that show up specifically after retrofit work was performed, even if the accumulator itself tests mechanically fine — this points to a sizing mismatch rather than a defective part",
  "If sizing is confirmed inadequate for the current configuration, replacing with a correctly sized accumulator (rather than reinstalling the same part) is the durable fix",
  "Document any refrigerant type change clearly, since accumulator and other component compatibility can vary by refrigerant — don't assume a component rated for the original refrigerant is automatically fine with a replacement blend",
], confidence:"common" },

{ id:"s-liquid-vs-suction-line-drier", equipment:"Condenser/Heat Pump", title:"Liquid line vs suction line filter drier — when each is used", summary:"Liquid line driers are standard equipment on virtually every system, while suction line driers are a temporary tool used specifically after a compressor burnout to catch acid and debris before it reaches the new compressor.", steps:[
  "A liquid line drier is a permanent, ongoing part of the system — it removes moisture and traps debris continuously and should be checked/replaced any time the system is opened for service, not just after a failure",
  "A suction line drier is typically added temporarily, specifically after a compressor burnout, and installed between the compressor's suction connection and the accumulator (or directly in the suction line) to catch acid, sludge, and burnout debris before it can circulate through and damage the new compressor",
  "Suction line driers have a coarser core than liquid line driers by design — they're built to handle higher vapor volume and flag as restricted differently, so don't substitute a liquid line drier core into a suction line application",
  "A suction line drier used after a burnout is meant to be removed (or bypassed/removed from the flow path) after a limited run time once the system has been confirmed clean via oil/acid sampling — leaving one in permanently causes an ongoing, unnecessary suction-side pressure drop",
  "Check pressure drop across a suction line drier periodically during its temporary service life the same way you'd check a liquid line drier — a suction drier loading up with the debris it's designed to catch will show an increasing pressure drop and needs replacement if it restricts flow significantly before the burnout cleanup is complete",
  "Never mistake a suction line drier for the system's normal permanent filtration — if you find one installed on a system with no documented burnout history, ask questions before assuming it's just standard equipment",
], safety:"Recover refrigerant per EPA 608 regulations before installing or removing any drier.", confidence:"common" },

{ id:"s-filter-drier-change-after-burnout", equipment:"Condenser/Heat Pump", title:"How many filter driers to change, and when, after a burnout", summary:"A single drier change usually isn't enough to fully clean up a burnout — the standard approach uses a suction line drier plus a fresh liquid line drier, with follow-up drier changes as the system runs clean.", steps:[
  "Immediately after a confirmed burnout and compressor replacement, install both a suction line drier (temporary, sized for burnout cleanup) and a new, properly sized liquid line drier — don't rely on the liquid line drier alone to catch acid and debris circulating from a burnout",
  "Run the system and monitor the suction line drier's pressure drop closely in the first several hours/days of operation — burnout debris loads a drier faster than normal moisture removal duty, so it may need replacement sooner than a typical service interval",
  "Pull an oil sample and/or run an acid test after an initial run period (commonly in the range of a few days to a couple weeks, per the drier manufacturer's guidance) to check whether acid levels have dropped to an acceptable level",
  "If acid is still present at a follow-up check, replace both driers again and continue monitoring — it's normal for a severe burnout to require more than one round of drier changes before the system runs clean",
  "Once oil/acid sampling confirms the system is clean, remove the temporary suction line drier from service and leave only the standard liquid line drier in place going forward",
  "Document the burnout cleanup steps taken (driers installed/replaced, dates, acid test results) in the service record — this protects against a comeback being misread as a new, unrelated failure",
], safety:"Recover refrigerant per EPA 608 regulations for every drier change; burnout oil/refrigerant can be acidic — avoid skin contact and follow proper PPE and disposal procedures.", confidence:"common" },

{ id:"s-acid-test-after-compressor-failure", equipment:"Condenser/Heat Pump", title:"Running an acid test on refrigerant oil after a suspected burnout", summary:"An acid test kit gives a quick pass/fail read on oil acidity, which confirms whether a compressor failure was an electrical burnout (requiring full cleanup procedure) versus a purely mechanical failure that doesn't contaminate the system the same way.", steps:[
  "Pull an oil sample from the failed compressor (or from the system if the compressor itself isn't accessible) using a clean sampling method — avoid introducing outside contamination that could produce a false result",
  "Use a refrigerant oil acid test kit per its instructions — most give a simple color-change result indicating acid level within a few minutes",
  "A positive/high acid result confirms an electrical burnout occurred and calls for the full cleanup procedure: suction line drier, fresh liquid line drier, and follow-up monitoring until the system tests clean",
  "A negative/low acid result on a compressor that failed mechanically (rod knock, valve failure, locked rotor with no electrical burn smell) suggests a standard drier change and evacuation is sufficient without the extended burnout cleanup protocol",
  "Look for corroborating signs alongside the test: a strong burnt/acrid odor from the oil or refrigerant, dark/black oil color, and visible carbon or varnish deposits all support a burnout diagnosis even before or alongside the test result",
  "When in doubt or when the test result is ambiguous, err toward treating it as a burnout and doing the full cleanup — under-treating a burnout risks killing the replacement compressor, while over-treating just costs an extra drier change",
], safety:"Burnout-contaminated oil and refrigerant can be acidic and corrosive — wear appropriate PPE, avoid skin/eye contact, and dispose of contaminated oil per local regulations.", confidence:"common" },

{ id:"s-burnout-cleanup-procedure", equipment:"Condenser/Heat Pump", title:"Compressor burnout cleanup procedure overview", summary:"A confirmed motor burnout contaminates the whole refrigerant circuit with acid, moisture, and combustion byproducts — the replacement compressor needs a systematic cleanup, not just a straight swap.", steps:[
  "Recover the contaminated refrigerant per EPA 608 regulations — never reuse refrigerant recovered from a confirmed burnout in this or any other system without proper reclamation",
  "Remove the failed compressor and inspect/clean accessible components — a strong burnt odor, dark oil, and soot-like residue at the compressor fitting confirm burnout contamination has spread into the line set and coils to some degree",
  "Install a new, correctly sized suction line drier and a fresh liquid line drier as part of the reassembly — see the dedicated filter drier entries in this list for sizing and follow-up details",
  "Braze in the new compressor and evacuate the system to a proper deep vacuum, holding to confirm no leaks and adequate moisture removal before charging",
  "Weigh in refrigerant per the nameplate charge, then run the system and monitor closely over the following days — check drier pressure drop, listen for any abnormal compressor sound, and pull an oil/acid sample per the burnout drier-change schedule",
  "Plan on a follow-up visit specifically to check acid levels and drier condition rather than considering the job complete at initial startup — burnout cleanup is a process over the following days to weeks, not a single visit",
], safety:"Recover refrigerant per EPA 608 regulations. Burnout residue and oil can be acidic and toxic — use proper PPE, ventilate the work area, and avoid inhaling vapors from the failed compressor or old oil.", confidence:"common" },

{ id:"s-burnout-electrical-vs-mechanical", equipment:"Condenser/Heat Pump", title:"Telling an electrical burnout from a mechanical failure before opening the system", summary:"Whether a failed compressor was an electrical burnout or a purely mechanical failure determines whether the full burnout cleanup procedure (driers, acid test, monitoring) is needed — some signs are visible before you ever open the sealed system.", steps:[
  "Check for a strong burnt/acrid smell at the compressor's service valves or fittings before opening anything — a genuine electrical burnout usually announces itself with a distinctive sharp odor, sometimes noticeable even from outside the unit",
  "Check breaker/overload trip history — a compressor that tripped a breaker or its internal overload repeatedly before finally failing, especially with a burning smell reported by the customer, points toward electrical burnout",
  "Ohm the compressor windings to ground and between terminals — a grounded winding (continuity to the compressor shell) or an open/shorted winding confirms an electrical failure, though a mechanical failure can also eventually show winding damage if it progressed far enough",
  "A compressor that simply stopped running with normal winding readings, no burnt smell, and a mechanical symptom beforehand (knocking, grinding, gradually declining capacity) points toward a mechanical failure (bearing, valve, rod) rather than electrical",
  "When genuinely uncertain, treat it as a burnout and do the full cleanup — the cost of an unnecessary suction line drier and acid test is much lower than the cost of a second compressor failure from skipped cleanup on an actual burnout",
  "Document whichever way you determine it and why (oil color, smell, winding readings, trip history) in the service record to support the diagnosis if the customer or a warranty reviewer asks",
], safety:"Treat any suspected burnout compressor and its oil as potentially acidic/toxic until proven otherwise — use PPE when handling.", confidence:"common" },

{ id:"s-inverter-compressor-soft-start-behavior", equipment:"Condenser/Heat Pump", title:"Inverter/variable-speed compressor soft-start behavior (normal vs fault)", summary:"Inverter-driven compressors ramp speed gradually over several seconds to a couple minutes at startup instead of jumping straight to full speed — knowing what's normal here prevents chasing a non-issue.", steps:[
  "Expect a gradual ramp-up: inverter compressors typically start at a low frequency/speed and step up over a period of seconds to a couple minutes rather than starting at full capacity immediately the way a fixed-speed compressor does — this is intentional, both for mechanical protection and to limit inrush current",
  "Don't judge amp draw or pressures against a fixed-speed system's startup expectations — checking pressures/amps in the first 30-60 seconds of an inverter system's start cycle will look 'low' compared to steady-state and isn't a fault",
  "Check the outdoor unit's display or the indoor thermostat/board for a live compressor speed or frequency reading if available — this lets you confirm the unit is actually ramping rather than guessing from sound and pressure alone",
  "If the compressor never ramps past its minimum speed despite a large load/setpoint gap that should call for more capacity, that's a genuine fault — check for a board-level capacity/speed fault code, refrigerant charge, or airflow restriction limiting how hard the system can safely ramp",
  "If the compressor ramps up but then drops back down and re-ramps repeatedly (hunting at startup) rather than settling into steady operation, suspect high head pressure, airflow restriction, or a communication issue between the outdoor unit and indoor/thermostat controlling capacity demand",
  "Let the system complete a full startup ramp cycle (per the manufacturer's typical timing) before taking final gauge readings for charge verification — checking too early captures a mid-ramp snapshot, not steady-state operation",
], confidence:"common" },

{ id:"s-inverter-compressor-speed-limits", equipment:"Condenser/Heat Pump", title:"Inverter compressor minimum/maximum speed limits and capacity clamping", summary:"Inverter compressors have a manufacturer-set minimum and maximum operating frequency, and the board will clamp speed within that range even when load conditions would otherwise call for more or less capacity.", steps:[
  "Understand that a system 'stuck' at what looks like low capacity may actually be running at its correct maximum speed for current conditions — very high or very low outdoor ambient temperatures often reduce the allowable maximum frequency to protect the compressor and drive electronics",
  "Check for board-imposed speed clamps tied to specific conditions: high discharge temperature, high condensing pressure, low suction pressure, or elevated drive board/heat sink temperature can all cause the control to limit maximum speed even though the compressor itself is healthy",
  "A compressor that won't drop below its minimum speed even at very low load (mild weather, small temperature differential) will short-cycle or overshoot setpoint — this is a design limit, not necessarily a fault, though it's worth checking that the system is sized appropriately for spaces with very light loads",
  "If speed seems clamped low with no obvious environmental cause (moderate outdoor temp, clean coils, good airflow, correct charge), check for a fault or warning code related to drive current, DC bus voltage, or communication before assuming it's a real capacity limitation",
  "Compare actual running frequency (if displayed) against the specific model's published min/max range — a compressor running right at its rated maximum is behaving correctly even if it doesn't fully satisfy an extreme load",
  "Don't attempt to force higher capacity by overcharging or bypassing a speed limit — these limits exist to protect the compressor and drive electronics, and working around them risks equipment damage",
], confidence:"common" },

{ id:"s-inverter-board-heatsink-cooling", equipment:"Condenser/Heat Pump", title:"Inverter drive board heat sink/cooling failure", summary:"The inverter/drive board that controls a variable-speed compressor generates significant heat and relies on a heat sink (often with a dedicated fan or airflow path) — inadequate cooling causes the board to reduce compressor speed or shut down protectively.", steps:[
  "Check for a dedicated cooling fan or airflow duct feeding the inverter board's heat sink, separate from the main condenser fan on many designs — confirm it's actually running when the compressor is under load",
  "Inspect the heat sink fins for dust, debris, or insect nest buildup blocking airflow — a clogged heat sink is a common, easily overlooked cause of inverter-related capacity reduction or shutdown that gets misdiagnosed as a compressor or refrigerant problem",
  "Watch for a pattern where the system runs fine at low load/mild ambient but reduces capacity or faults specifically under sustained high-load, high-ambient conditions — this points toward thermal protection kicking in on the drive board rather than a compressor or charge issue",
  "Check for a board-level over-temperature fault code specific to the inverter/drive module if the unit has faulted rather than just reduced capacity — this confirms the thermal protection triggered, which then means the root cause is airflow/cooling to the board, not the board itself necessarily being defective",
  "Verify the board's thermal paste/pad contact with its heat sink is intact if the board has been previously serviced or replaced — a board reinstalled without proper thermal contact overheats even with otherwise normal cooling",
  "If cooling airflow and thermal contact both check out fine and the board still overheats or faults, then treat it as a board/drive failure rather than a cooling problem",
], safety:"De-energize and discharge any capacitors on the drive board before servicing — inverter/drive boards can retain hazardous voltage after power is removed; follow the manufacturer's specific wait time and discharge procedure.", confidence:"common" },

{ id:"s-inverter-compressor-fault-vs-mechanical", equipment:"Condenser/Heat Pump", title:"Inverter compressor fault code vs an actual mechanical compressor failure", summary:"Most inverter compressor 'failures' reported by the system are actually drive/control faults (overcurrent, DC bus, communication) rather than a mechanically failed compressor — confirming which one you're dealing with avoids an unnecessary compressor replacement.", steps:[
  "Pull the specific fault code from the outdoor unit board or thermostat rather than assuming 'compressor fault' means the compressor itself is bad — inverter systems typically log much more specific codes (overcurrent, phase loss, DC bus over/under-voltage, IPM/drive module fault, communication loss) that point at the drive electronics",
  "Check compressor winding resistance and insulation-to-ground the same way you would on any compressor — this is still valid on an inverter compressor and rules out (or confirms) an actual electrical winding failure independent of the drive board",
  "If windings test normal but the drive consistently faults on start attempts, suspect the drive/inverter board, the DC bus capacitors, or wiring between the board and compressor rather than the compressor itself",
  "Check for a locked rotor or mechanically seized condition by attempting to verify free rotation if the compressor design and access allow it, or by checking for a dramatically higher-than-normal current draw on a start attempt before the drive faults out",
  "Review recent history: a compressor that ran fine for a long time and then suddenly won't start with a drive fault code is more likely a drive electronics issue; one that showed declining performance, unusual noise, or rising amp draw over time before failing is more likely a genuine mechanical failure",
  "Don't replace an inverter compressor based on a fault code alone — confirm with winding tests and, where possible, drive board diagnostics before committing to compressor replacement, since inverter compressors are typically a more expensive part than the drive board",
], safety:"Inverter drive boards can retain hazardous voltage after power is removed — follow the manufacturer's discharge procedure and wait time before servicing.", confidence:"common" },

{ id:"s-hp-balance-point-explained", equipment:"Condenser/Heat Pump", title:"Heat pump balance point concept and why capacity drops before lockout", summary:"The balance point is the outdoor temperature where a heat pump's heating capacity exactly equals the building's heat loss — below it, the heat pump alone can't keep up even though it's running correctly, which is different from a lockout or fault.", steps:[
  "Explain the core concept when troubleshooting a 'not keeping up' complaint in cold weather: a heat pump's heating capacity decreases as outdoor temperature drops, while the building's heat loss increases as it gets colder outside — the balance point is where those two lines cross",
  "Below the balance point, the heat pump is operating normally but simply can't produce enough heat on its own to hold setpoint — this is expected system behavior, not a malfunction, and is why supplemental/backup heat (electric strips or a furnace in dual-fuel) exists",
  "Distinguish this from an actual fault: check that the heat pump is still running, reversing valve is in heating position, and defrost is cycling normally — if all of that is happening and the house still runs cold only on the coldest days, capacity drop-off near the balance point is the likely explanation rather than a component failure",
  "Confirm supplemental heat is actually engaging when needed — if backup heat isn't energizing to make up the gap below the balance point, that's the real fault to chase, not the heat pump's reduced capacity itself",
  "Balance point is specific to each home/equipment combination — it depends on the heat pump's capacity curve, the building's heat loss at design conditions, and duct/airflow factors, so there's no single universal temperature that applies to every job",
  "If the balance point seems unreasonably high (backup heat kicking in on only mildly cool days), check equipment sizing against a proper heat loss calculation, and check for reduced heat pump capacity from a low charge, dirty coil, or restricted airflow before assuming the balance point itself is simply high for this equipment",
], confidence:"common" },

{ id:"s-hp-balance-point-field-adjustment", equipment:"Condenser/Heat Pump", title:"Adjusting/verifying balance point settings in the field", summary:"Most communicating and many conventional heat pump control systems let you set an outdoor temperature threshold where supplemental heat is allowed to engage — verifying this is set appropriately (not just left at default) resolves a lot of 'heat pump isn't keeping up' or 'aux heat runs too much' complaints.", steps:[
  "Locate the balance point / outdoor air changeover setting in the thermostat or control board menu — naming varies by manufacturer and system (balance point, changeover temperature, aux heat lockout, staging setpoint) but the underlying function is similar: pick the outdoor temperature where backup heat is allowed to assist or take over",
  "Check whether the setting is still at its factory default — many complaints of aux heat running too much (high utility bills) or too little (house runs cold) trace back to a default that was never actually reviewed for this specific home and equipment",
  "For a complaint of excessive aux/backup heat use, consider lowering the balance point (allowing the heat pump to work alone down to a colder temperature) if the heat pump's capacity curve supports it at that temperature — this reduces reliance on more expensive backup heat",
  "For a complaint of the house running cold, consider raising the balance point (bringing in backup heat sooner) if the heat pump's real-world capacity is falling short before its rated capacity curve would suggest — but investigate why capacity is falling short first (charge, airflow, defrost) rather than just papering over it with earlier backup heat",
  "On dual-fuel systems specifically, balance point setting also has an efficiency/cost dimension — running the heat pump too far into cold weather where the furnace would be more cost-effective (or vice versa) is a legitimate reason to adjust the setting even with everything mechanically healthy",
  "After changing the setting, confirm the new value took effect and monitor at least one cold-weather cycle to verify the system now brings in supplemental heat at the intended point rather than just trusting the menu display",
], confidence:"common" },

{ id:"s-dualfuel-switchover-logic-troubleshoot", equipment:"Condenser/Heat Pump", title:"Dual-fuel switchover logic troubleshooting (brand-generic)", summary:"A dual-fuel system (heat pump paired with a gas or oil furnace) decides which heat source runs based on outdoor temperature and/or a cost-comparison setting — when switchover doesn't happen as expected, the logic itself is usually the first thing to check, not the equipment.", steps:[
  "Identify which switchover method the system uses: a simple outdoor temperature threshold, or a cost-based comparison that factors in local electric and gas/fuel pricing to decide which source is cheaper to run at a given outdoor temperature",
  "For temperature-based switchover, verify the actual outdoor temperature sensor reading against a separate reference thermometer — a sensor reading incorrectly (too high or too low) causes switchover to happen at the wrong actual outdoor conditions even though the setpoint itself is correctly configured",
  "For cost-based switchover, verify the utility rate values entered in the control are current and roughly accurate — stale or default placeholder rate values can cause the system to favor the wrong fuel source across a wide range of conditions, not just at the margin",
  "Check that both the heat pump and the furnace are individually confirmed operational before assuming a switchover logic problem — a furnace that won't ignite, or a heat pump that won't run, can look exactly like a switchover fault if the system quietly tries to call the failed equipment and gets nothing",
  "Check the staging behavior expected for this system: some dual-fuel setups run the heat pump alone above the balance point, both sources briefly overlapping during transition, or a hard cutover from one to the other — confirm which behavior is actually expected before treating an overlap or gap as a fault",
  "If switchover logic and both heat sources individually check out fine but the system still won't transition, suspect a stuck relay, a miswired outdoor temperature sensor, or a communication fault between the thermostat and one of the two pieces of equipment",
], confidence:"common" },

{ id:"s-dualfuel-lockout-temp-misconfigured", equipment:"Condenser/Heat Pump", title:"Dual-fuel outdoor lockout temperature set wrong", summary:"Dual-fuel systems typically have separate lockout temperatures for the heat pump (below which it stops running) and the furnace (above which it won't fire) — if these are set incorrectly relative to each other, there can be a gap with no heat source running, or unnecessary overlap.", steps:[
  "Identify both lockout values in the control: the heat pump low-temperature lockout (compressor won't run below this outdoor temp) and the furnace high-temperature lockout (furnace won't fire above this outdoor temp, if the system has one)",
  "Check for a dangerous gap: if the heat pump lockout temperature is set colder than the furnace lockout temperature is set warm (i.e., there's a temperature range where neither is allowed to run), the house will get no heat at all in that outdoor temperature band — this is a real, sometimes overlooked configuration error worth specifically checking for",
  "If a gap is found, correct the lockout values so there's no temperature range where both sources are locked out simultaneously — typically the furnace lockout should be at or below the heat pump lockout, ensuring one source is always available",
  "Distinguish a lockout temperature (below/above which a source simply won't run at all) from a balance point/switchover setting (which determines which source is preferred) — these are related but separate settings, and both need to be checked",
  "Confirm the customer's expectations and cost priorities were factored into how these were originally set — a heat pump locked out too early (mild cold) forces more expensive backup heat sooner than necessary, while one that never locks out in genuinely extreme cold risks poor comfort recovery and excessive heat pump runtime at very low efficiency",
  "After any change, verify behavior across at least the boundary temperature to confirm the system actually behaves as configured, not just that the menu displays the intended values",
], confidence:"common" },

{ id:"s-defrost-time-temp-vs-demand-control", equipment:"Condenser/Heat Pump", title:"Time-temperature vs demand-defrost control logic differences", summary:"Time-temperature defrost initiates on a fixed timer (checking a coil temperature sensor only at those set intervals), while demand defrost continuously monitors coil conditions and initiates only when actual frost buildup is detected — the two behave very differently and troubleshoot differently.", steps:[
  "Identify which type of defrost control the system uses before troubleshooting — time-temperature systems have a selectable timer interval (commonly a choice of fixed intervals like 30/60/90 minutes) while demand-defrost systems use continuous sensing (often comparing coil temperature against outdoor temperature, or measuring pressure drop across the coil) and don't have a simple fixed interval to check",
  "On a time-temperature system, a defrost cycle that never initiates despite visible frost buildup often traces to the timer interval being set too long for current conditions, or the defrost thermostat/sensor never satisfying its temperature threshold even with real frost present — check both the interval setting and the sensor",
  "On a demand-defrost system, initiation depends on the control's ongoing sensing rather than a fixed clock — a system that won't defrost despite obvious frost buildup more often points to a failed or miscalibrated sensor input than a timer setting, since there usually isn't a simple interval to adjust",
  "Demand defrost is generally more efficient in the field because it only defrosts when actually needed, rather than on a fixed schedule that can trigger defrost cycles the coil doesn't need yet (wasting energy and heating capacity) or wait too long past when frost has already built up — keep this in mind when a customer with a demand-defrost system asks why cycles seem to happen at irregular intervals, since that's normal, expected behavior for that control type",
  "Don't apply a time-temperature system's troubleshooting steps (checking/adjusting the timer interval) to a demand-defrost system, and vice versa — confirm the control type first from the equipment documentation or board labeling rather than assuming",
  "If defrost cycles are initiating appropriately for the control type but not terminating properly, that's a separate issue (typically the defrost termination sensor/thermostat) rather than an initiation logic problem — see the defrost thermostat vs thermistor entry in this list",
], confidence:"common" },

{ id:"s-defrost-thermostat-vs-thermistor", equipment:"Condenser/Heat Pump", title:"Defrost thermostat (bimetal) vs thermistor sensor differences", summary:"Older heat pump defrost controls use a mechanical bimetal defrost thermostat clamped to the coil, while newer electronic controls use a thermistor reporting a continuous temperature value to the board — they fail differently and are tested differently.", steps:[
  "Identify which type is installed: a bimetal defrost thermostat is a simple two-wire switch (clamped to a coil tube or fin) that closes/opens at a fixed temperature and can be checked with a simple continuity test at known hot/cold conditions; a thermistor is a variable-resistance sensor that reports a temperature reading to the control board, tested by measuring resistance and comparing against the manufacturer's resistance/temperature chart",
  "For a bimetal thermostat, a failure mode is typically binary — it's either stuck open (never allows defrost to initiate or terminate as designed) or stuck closed (defrost initiates or won't terminate) — testing is a simple pass/fail continuity check at the rated switching temperature",
  "For a thermistor, failure modes are more varied — it can drift to read consistently high or low (causing defrost to initiate too early/late or terminate too early/late) without ever fully failing open or shorted, which makes an in-range but inaccurate thermistor a subtler problem than a stuck bimetal switch",
  "Check thermistor mounting the same way you'd check a TXV bulb — poor thermal contact with the coil (loose clamp, corrosion at the mounting point, not making contact with bare metal) causes it to lag or misread actual coil temperature even when the sensor itself is electrically fine",
  "When replacing either type, confirm the exact switching temperature (bimetal) or resistance curve (thermistor) matches the original part — a defrost thermostat/thermistor rated for the wrong temperature causes exactly the kind of premature or delayed defrost cycling that looks like a control board problem",
  "Don't assume a system with electronic demand-defrost has done away with physical coil sensors entirely — most still use a thermistor (or sometimes still a bimetal switch as a backup/safety) mounted on the coil as one of their sensing inputs, so this is still a real component to check on modern systems, not just older ones",
], confidence:"common" },

{ id:"s-defrost-sensor-mismatch-stuck", equipment:"Condenser/Heat Pump", title:"Defrost sensor reading wrong causes stuck-in-defrost or defrost never triggers", summary:"A coil temperature sensor (thermostat or thermistor) that reads inaccurately — even if it's not fully failed — can leave a heat pump stuck cycling in defrost repeatedly, or never triggering defrost at all despite heavy ice buildup.", steps:[
  "For a system stuck cycling into defrost repeatedly (defrost light/indicator triggering far more often than frost conditions would justify): check the coil sensor for a reading that's biased cold — the control thinks the coil is colder/more frosted than it actually is and keeps calling for defrost",
  "For a system that won't defrost despite visible heavy ice buildup: check the coil sensor for a reading that's biased warm — the control thinks the coil is warmer/clearer than it actually is and never calls for defrost",
  "In both cases, compare the sensor's actual reading (via resistance chart for a thermistor, or direct temperature measurement near the sensor location) against a separate accurate thermometer reading of the coil itself at the same point, rather than trusting the board's displayed value alone",
  "Check physical sensor placement and contact quality — a sensor that's slipped to a different location on the coil, isn't making good contact, or is reading ambient air temperature instead of coil surface temperature due to poor clamping will misreport even when electrically it tests fine",
  "Rule out a genuine airflow or charge problem causing real, excessive icing before blaming the sensor — a sensor accurately reporting a genuinely icing coil isn't the fault; confirm the sensor reading is actually wrong relative to real coil conditions, not just reacting to a real problem",
  "Replace the sensor if confirmed inaccurate, and re-verify normal defrost cycling (reasonable interval, full ice clearing, prompt return to heating) over at least one full cold-weather cycle after the fix",
], confidence:"common" },

{ id:"s-flash-gas-sight-glass", equipment:"Condenser/Heat Pump", title:"Flash gas visible at the liquid line sight glass", summary:"Bubbles or a milky/cloudy appearance in a liquid line sight glass mean vapor is present in what should be a solid column of subcooled liquid — this points to low charge, a restriction upstream, or excessive pressure drop, not necessarily the same thing every time.", steps:[
  "Confirm the sight glass is actually installed in the liquid line (not the suction line, where seeing 'bubbles' would be meaningless) and that you're reading it under stable, representative running conditions rather than right at startup",
  "Solid, clear liquid with no bubbles and adequate subcooling confirms a full column of liquid — this is the target condition; persistent bubbling means vapor is present in the liquid line at that point",
  "If bubbling is present along with low subcooling and low suction pressure, this points toward genuine undercharge/leak — proceed to leak search",
  "If bubbling is present but subcooling actually measures normal or high at the condenser outlet, the flash gas is being generated by a pressure drop between the condenser and the sight glass — check for a restriction (partially plugged filter drier, a long vertical liquid line riser without adequate subcooling margin, an undersized liquid line) between those two points",
  "On a system with a long vertical lift in the liquid line, some pressure drop (and resulting flash gas risk) is a normal design consideration — compare against the line set design guidance for that lift height rather than assuming a fault if the vertical rise is substantial",
  "A sight glass with a built-in moisture indicator (color-change element) also tells you about moisture content at the same time — check that reading alongside the bubble/clarity observation rather than treating them as unrelated",
], safety:"Recover refrigerant per EPA 608 regulations before servicing any part of the liquid line.", confidence:"common" },

{ id:"s-subcooling-high-overcharge-vs-restriction-nuance", equipment:"Condenser/Heat Pump", title:"High subcooling: telling overcharge from a downstream restriction", summary:"High subcooling reads the same whether the system is genuinely overcharged or has a restriction trapping liquid in the condenser — the accompanying superheat and suction pressure pattern is what separates the two before you pull any refrigerant.", steps:[
  "On a true overcharge, expect subcooling high AND superheat low (or normal-low), with suction pressure often running a bit higher than normal too — the system has more total refrigerant mass than it needs, so both the condenser and evaporator sides show the effect",
  "On a restriction trapping liquid in the condenser (plugged drier, kinked line, restricted TXV inlet), expect subcooling high but superheat HIGH as well (not low) — the evaporator is being starved by the restriction even while the condenser backs up with excess liquid; suction pressure often runs lower than normal in this case, not higher",
  "This superheat direction is the key differentiator: low superheat with high subcooling leans overcharge; high superheat with high subcooling leans restriction — don't rely on subcooling alone to decide whether to recover refrigerant",
  "Before pulling charge based on a high subcooling reading, always check superheat at the same time — removing refrigerant from a system that's actually restricted (not overcharged) will not fix the problem and can leave the system undercharged once the real restriction is eventually found and cleared",
  "If genuinely uncertain, check for a temperature drop across the filter drier and confirm the liquid line service valve is fully open before touching the charge — ruling out the cheap, quick restriction checks first avoids an unnecessary and counterproductive charge adjustment",
  "Once the correct root cause is identified, address it directly: recover excess refrigerant to the chart target for true overcharge, or clear/replace the restricted component and leave the charge alone (recheck after clearing) for a true restriction",
], safety:"Recover refrigerant per EPA 608 regulations before adjusting charge or opening any fitting.", confidence:"common" },

{ id:"s-variable-capacity-comm-staging-issues", equipment:"Condenser/Heat Pump", title:"Variable-capacity/high-efficiency system communication and staging faults (brand-generic)", summary:"Communicating variable-capacity systems coordinate staging/capacity between the thermostat, indoor unit, and outdoor unit over a digital communication bus — a comm fault here causes staging problems that look mechanical but usually aren't.", steps:[
  "Check for a communication fault code on the thermostat or outdoor unit board before assuming a staging problem is caused by a mechanical or refrigerant issue — most communicating systems display a specific comm-loss or comm-error code distinct from a capacity/performance code",
  "Inspect the communication wiring itself for damage, loose connections, or incorrect wire type/gauge — many communicating systems require a specific wire type (sometimes shielded, sometimes a minimum gauge) between the thermostat, indoor unit, and outdoor unit, and using generic thermostat wire for a long run can cause intermittent comm errors",
  "Check for voltage bleeding onto the communication conductors from adjacent line-voltage or other low-voltage wiring bundled in the same run — inductive coupling onto a data line causes exactly the kind of intermittent, hard-to-reproduce staging fault that gets misdiagnosed as an equipment problem",
  "If the system intermittently drops to a fixed low-capacity or 'limp home' stage rather than modulating normally, check for marginal/intermittent communication rather than assuming a compressor or metering device fault — many controls default to a safe fixed stage specifically when communication is unreliable",
  "Verify all three components (thermostat, indoor unit board, outdoor unit board) are running compatible firmware/software versions if the system and manufacturer support checking this — a mismatch after a partial equipment replacement or board swap can cause staging communication to fail even with perfect wiring",
  "Only move on to mechanical/refrigerant-side troubleshooting (charge, airflow, compressor) once communication has been confirmed solid — chasing a mechanical cause for what's actually an intermittent comm fault wastes time and can lead to unnecessary part replacement",
], confidence:"common" },

{ id:"s-variable-capacity-fallback-mode", equipment:"Condenser/Heat Pump", title:"Variable-capacity system running in fallback/default staging after comm loss", summary:"Most variable-capacity systems are designed to keep running at a fixed, conservative capacity stage if digital communication is lost, rather than shutting down entirely — recognizing this fallback behavior prevents mistaking it for a capacity/performance fault.", steps:[
  "Recognize the pattern: the system still runs and produces heating/cooling, but capacity seems 'stuck' at one level and doesn't respond to changing load or setpoint the way a fully communicating variable system should",
  "Check for a comm-loss indication on the thermostat or board — many systems will show a fault or warning even while continuing to run in fallback mode, so the system isn't necessarily silent about the underlying issue",
  "Confirm this isn't simply the system's normal minimum or maximum speed limit (see the inverter compressor speed limits entry) before concluding it's specifically a communication fallback — the two can look similar from a capacity standpoint but have different root causes and different fixes",
  "Once comm loss is confirmed as the cause, troubleshoot the communication path itself (wiring, connections, voltage bleed, firmware compatibility) rather than the mechanical system — the mechanical system is functioning correctly in its designed-for fallback behavior",
  "After restoring communication, confirm the system returns to full modulating behavior (capacity actually changing in response to load) rather than staying stuck in fallback, which would indicate the comm fix didn't fully resolve the issue or that the fallback condition is intermittent and recurring",
  "Explain to the customer that fallback mode is a deliberate safety/reliability feature (keeping some heating or cooling running rather than shutting down completely on a comm fault) rather than a defect in itself — the actual defect is whatever caused the communication to drop",
], confidence:"common" },

{ id:"s-lowpressure-control-shortcycle", equipment:"Condenser/Heat Pump", title:"Compressor short-cycling from a bad or miscalibrated low-pressure control", summary:"A low-pressure switch that's set too tight, has drifted out of calibration, or has a failing contact can trip on completely normal suction pressure swings, short-cycling a compressor that has nothing actually wrong with its charge or components.", steps:[
  "Confirm the pattern first: compressor runs briefly, shuts off, sits for a short period, then restarts and repeats — check whether this correlates with a low-pressure trip specifically (versus a high-pressure trip, which is a different control and different root causes)",
  "Check actual suction pressure with gauges at the moment of shutdown if possible (or immediately after) — compare against the low-pressure switch's actual cut-out setting rather than assuming the switch is simply 'bad'",
  "A switch set with too tight a differential, or a cut-out setting too close to normal operating suction pressure for current conditions (especially in mild/cool weather with naturally lower suction pressure), will trip on completely normal pressure swings — this is a settings issue, not a component failure",
  "Check the switch's calibration against a second, known-good gauge reading at the same point in time — pressure switches can drift out of calibration over time and trip earlier than their marked setting indicates",
  "Rule out a genuine low-charge or airflow-restriction cause of the low pressure before concluding the switch itself is the problem — if suction pressure really is abnormally low when the trip occurs, the switch is doing its job correctly and the underlying charge/airflow issue is the real fault to chase",
  "If the switch is confirmed to be tripping on pressures that should be normal for current conditions, and calibration/adjustment doesn't correct it, replace the switch — but always verify actual system pressures first so a bad low-pressure control isn't used as an explanation for what's really a charge or restriction problem",
], safety:"Recover refrigerant per EPA 608 regulations if the low-pressure switch needs to be replaced and requires opening the refrigerant circuit.", confidence:"common" },

{ id:"s-refrigerant-migration-offcycle-flooded-start", equipment:"Condenser/Heat Pump", title:"Refrigerant migration during the off-cycle causing a flooded start", summary:"During an extended off-cycle, especially in cool weather, refrigerant vapor naturally migrates to and condenses in the coldest part of the system — often the compressor crankcase — setting up a flooded (liquid-laden) start when the system next cycles on.", steps:[
  "Recognize the underlying mechanism: refrigerant seeks out the coldest surface in the system during an off-cycle, and an outdoor compressor sitting in cold ambient air (colder than the indoor coil or the compressor's own crankcase heater can compensate for) can become that coldest point, drawing refrigerant vapor to it where it condenses into liquid",
  "This is most common on systems without a working crankcase heater, on systems in genuinely cold climates, or after a compressor replacement where the new crankcase heater wasn't properly installed, wired, or verified functional",
  "Check for the classic flooded-start symptoms at the next startup after a cold off-cycle: banging/gurgling for the first several seconds, elevated startup amp draw, and sound that clears up as the cycle continues",
  "Verify crankcase heater operation directly — confirm it's wired to stay powered during the off-cycle (not just when the compressor runs), and check its resistance/continuity if it can be isolated for testing",
  "On systems without a crankcase heater by design, migration risk is usually managed instead by a pump-down cycle (a solenoid valve that pumps the low side down to a near-empty condition at shutdown) — if the system is supposed to have pump-down control and doesn't seem to be executing it, that's the actual fault to chase rather than assuming a crankcase heater should be present",
  "Chronic flooded starts from migration accelerate compressor wear (oil washout, bearing damage) over time even if no single start causes an obvious failure — treat a confirmed pattern of migration-related flooded starts as worth fixing, not just tolerating",
], safety:"A severely flooded start can hydraulic-lock a compressor — avoid forcing repeated restart attempts without addressing the migration cause.", confidence:"common" },

{ id:"s-offcycle-equalization-hardstart", equipment:"Condenser/Heat Pump", title:"Off-cycle pressure equalization issues causing hard starting", summary:"Most residential systems need a brief off-cycle delay to let high-side and low-side pressures equalize before restarting, so the compressor doesn't have to start against a large pressure differential — a system that restarts too quickly can struggle to start or trip on overload.", steps:[
  "Check for a short-cycle situation (rapid on/off/on, whether from a thermostat/control issue or a power blip) that doesn't give the system enough time to equalize before the compressor is asked to restart",
  "Confirm the control system's built-in anti-short-cycle delay (a timer that holds the compressor off for a set period, commonly a few minutes, after any shutdown) is actually present and functioning — a bypassed, disabled, or failed anti-short-cycle timer removes this protection entirely",
  "A compressor that hums, trips on overload, or struggles to start specifically when restarted very soon after shutting off — but starts fine after sitting for a few minutes — points toward an equalization/timing issue rather than a capacitor or winding problem, though it's worth ruling those out too since a marginal capacitor makes a hard-start situation worse",
  "Piston/fixed-orifice and cap tube systems generally equalize faster than TXV/EEV systems because they don't have a valve holding back flow the same way, so expected equalization time can vary by metering device type — factor this in before assuming a specific wait time is universal across all systems",
  "If short-cycling is being caused by something upstream (a flaky thermostat call, power fluctuations, an overly sensitive control setting), fix that root cause rather than just adding a hard-start kit to mask the symptom",
  "A hard-start kit (start capacitor and relay) can help a compressor overcome a genuine equalization-related start difficulty, but treat it as help for a specific known-cause situation, not a default fix for every hard-start complaint without understanding why it's happening",
], safety:"Discharge capacitors safely before handling any hard-start kit components.", confidence:"common" },

{ id:"s-txv-vs-eev-hunting-comparison", equipment:"Condenser/Heat Pump", title:"Comparing hunting behavior between a mechanical TXV and an EEV", summary:"Both a TXV and an EEV can \"hunt\" (superheat oscillating instead of settling), but the underlying cause and the fix are different because one is a mechanical feedback loop and the other is a digital control loop.", steps:[
  "On a mechanical TXV, hunting is usually a physical/mechanical problem: a bulb not making good thermal contact, an oversized valve for the load, a plugged/kinked external equalizer, or a valve with worn/damaged internals no longer responding smoothly",
  "On an EEV, hunting is more often a control tuning or sensor input problem: a thermistor with poor thermal contact or a slow/delayed reading feeding bad data to the algorithm, or (less commonly) a control loop that's poorly tuned for this specific application, causing it to overshoot and correct repeatedly",
  "Test each differently: a TXV's response is tested by physically heating/cooling the bulb and watching for a smooth, proportional pressure/superheat change (see the TXV testing entry); an EEV's response is tested by checking its thermistor inputs and, where the board allows it, observing valve position/step commands rather than a physical bulb test",
  "A TXV that hunts because of a bad equalizer line or bulb contact issue is a straightforward mechanical fix (reclamp/reinsulate the bulb, clear the equalizer) — an EEV that hunts because of a marginal thermistor connection is an equally straightforward fix once you identify the sensor, but harder to spot without checking the specific sensor inputs the algorithm relies on",
  "If a TXV's bulb and equalizer both check out fine and hunting persists, suspect the valve itself is failing internally or mismatched for the application; if an EEV's thermistors both check out fine and hunting persists, suspect the driver board/algorithm or, less commonly, a valve position feedback problem",
  "Don't apply TXV logic to an EEV system or vice versa when explaining hunting to a less experienced tech on the job — the diagnostic path genuinely diverges past the initial symptom recognition",
], confidence:"common" },

{ id:"s-scroll-vs-recip-noise-comparison", equipment:"Condenser/Heat Pump", title:"Distinguishing scroll compressor noise from reciprocating compressor noise", summary:"Scroll and reciprocating compressors have fundamentally different internal mechanisms, so their normal running sound and their failure sounds are different — using the wrong mental model for the compressor type in front of you leads to misdiagnosis.", steps:[
  "Identify the compressor type first (scroll or reciprocating) from the nameplate or physical shape before interpreting any noise — a sound that's abnormal for one type can be closer to normal for the other",
  "Normal scroll compressors run with a fairly smooth, higher-pitched whirring/humming sound with less mechanical clatter than a reciprocating compressor, since there are no reciprocating pistons or valves banging — a scroll producing a pronounced knock or clatter is more likely signaling a real problem (tipping, backspin, or bearing wear) than the same sound would necessarily indicate on a reciprocating unit",
  "Normal reciprocating compressors have more inherent mechanical noise from the pistons and valves, so some clatter/valve-tap sound at a consistent, steady level can be within normal range for that specific compressor — the concerning signs are a clear knock, an increase in noise level over time, or a sound that changes character rather than just any audible mechanical noise",
  "A one-time bang at startup followed by smooth running points toward a flooded start on either compressor type — this is a shared failure mode across both designs, distinguishable from steady-state running noise",
  "A continuous, load-independent knock or grinding present throughout the run cycle is a stronger indicator of true mechanical wear (bearing, rod, or scroll flank damage depending on type) on either compressor type, versus noise that's tied to specific transient conditions (startup, low-load, defrost transition)",
  "When uncertain, compare against a baseline if possible — the same model/type of compressor running normally elsewhere, or documented normal-sound characteristics from the manufacturer, rather than relying purely on general expectations that may not fit the specific compressor design in front of you",
], confidence:"common" },

{ id:"s-evap-coil-corrosion-leak-vs-biofilm-smell", equipment:"Condenser/Heat Pump", title:"Distinguishing a corrosion leak from biofilm/smell buildup on an evaporator coil", summary:"A musty smell and an actual refrigerant leak from coil corrosion are two different coil problems that can occur on the same coil independently — treating one as evidence of the other leads to an incomplete diagnosis.", steps:[
  "Recognize these as separate mechanisms: a musty/sour smell is typically biological growth (mold, bacteria, biofilm) on the coil and drain pan surface feeding on moisture and organic debris, while a refrigerant leak from the coil is a physical breach of the tube wall, most often from corrosion (including formicary corrosion) or a fatigue crack",
  "A coil can smell bad with zero refrigerant leak, and a coil can be leaking refrigerant with no notable odor at all — don't assume a customer's smell complaint means there's also a leak, or that a confirmed leak explains a smell complaint",
  "For a smell complaint, check for visible biofilm/slime on the coil face and drain pan, confirm the condensate drain is flowing freely (standing water in the pan feeds growth), and check filter condition and duct cleanliness as contributing factors — this doesn't require gauge or leak-detection work",
  "For a suspected leak (low charge symptoms, declining subcooling/superheat performance over time, or an actual oil residue trail), use electronic leak detection or UV dye specifically at the coil, independent of whatever the smell situation is",
  "If both issues are present on the same coil, address them as two separate line items: a coil cleaning/sanitizing (and drain service) for the odor, and a leak repair or coil replacement for the refrigerant loss — don't assume fixing one resolves the other",
  "When a coil is old enough or corroded enough that leak repair isn't practical and replacement is being discussed anyway, a concurrent smell/biofilm problem is a reasonable secondary justification for replacement rather than a stand-alone cleaning, but keep the two issues clearly distinguished when explaining the diagnosis to the customer",
], confidence:"common" },

{ id:"s-cap-tube-debris-clog", equipment:"Condenser/Heat Pump", title:"Capillary tube clogged with debris/wax vs moisture freeze-up", summary:"A capillary tube can plug from solid debris or oil/wax buildup (a persistent restriction) or from moisture freezing at its narrowest point (an intermittent restriction that can clear and return) — telling them apart changes the repair approach.", steps:[
  "Check whether the restriction symptom (high subcooling, low suction pressure) is constant and unchanging, or intermittent — coming and going, sometimes clearing up temporarily during a cycle or across cycles without any service being performed",
  "A constant, unchanging restriction with no improvement over time or across cycles points toward solid debris or wax/sludge buildup physically narrowing or blocking the tube",
  "An intermittent restriction that seems to clear partway through a run cycle (as the tube warms slightly) and then return on the next cold start is more characteristic of moisture freezing at the tube's narrowest point, then thawing and reforming",
  "For suspected moisture freeze-up, this points strongly toward inadequate evacuation during the last time the system was opened, or a failed/saturated filter drier no longer holding moisture — check drier condition and service history",
  "For suspected debris/wax, check for a source: breakdown of the filter drier's desiccant material, leftover contamination from a prior compressor burnout that wasn't fully cleaned up, or oil breakdown/sludging from age or overheating",
  "Either cause typically means replacing the cap tube/drier assembly rather than attempting to clear it in place, but the moisture case additionally requires a proper deep vacuum evacuation afterward, and the debris case additionally requires identifying and addressing the contamination source so the replacement doesn't just clog again",
], safety:"Recover refrigerant per EPA 608 regulations before opening the cap tube or drier assembly.", confidence:"common" },

// ---------------- AIR HANDLER / DUCT / IAQ — deep dive ----------------
// ---------------- ECM BLOWER MOTORS — deep dive ----------------
{ id:"s-ecm-isolate-module-motor-programming", equipment:"Air Handler", title:"ECM blower problem — isolating whether it's the module, the motor, or the programming", summary:"A structured approach for narrowing down an ECM fault instead of swapping the whole motor/module assembly on a guess.", steps:[
  "Start by separating electrical vs. mechanical vs. logical: with power off, spin the blower wheel/shaft by hand — real drag, grinding, or a locked shaft points to the motor itself, not the module or programming",
  "Check incoming line voltage and the low-voltage control harness connector (the 5-pin or similar plug carrying the call signals) for corrosion, a loose pin, or a partially seated connector — a marginal harness connection produces symptoms that look exactly like a bad module",
  "If the motor won't run at all, check for a status/fault LED on the module (many ECM modules blink a code even without a wall display) before condemning it — this tells you if the module thinks it has a fault versus simply not receiving a call",
  "If the motor runs but delivers the wrong speed/airflow, that's a programming issue, not a module or motor failure — verify the dip switch or programmed CFM profile matches the installed equipment and duct system rather than replacing parts",
  "On motor/module combo units, the module is field-replaceable separately from the motor on many platforms — confirm which part is actually available/serviceable for this model before ordering the wrong one",
  "If swapping to a known-good module resolves it, the motor windings and bearings are fine and the fault was control-side — document this so the next tech doesn't re-diagnose the motor",
], confidence:"common" },
{ id:"s-ecm-programming-torque-airflow-cfm-mismatch", equipment:"Air Handler", title:"ECM blower programmed for the wrong control mode (constant torque vs. constant airflow vs. constant CFM)", summary:"ECM motors can be configured to hold different targets — torque, airflow, or a fixed CFM number — and the wrong mode for the installed duct system causes symptoms that look like a bad motor.", steps:[
  "Understand the difference before diagnosing: a constant-torque motor holds a fixed effort/output regardless of static pressure, so delivered CFM actually drops as duct resistance rises — a constant-airflow (true constant-CFM) motor instead ramps up effort to hold the same CFM even as static pressure climbs",
  "A system programmed for constant torque on a high-static, restrictive duct system will show chronically low delivered airflow (weak registers, long run times, high temp rise) even though the motor itself is healthy and not faulted",
  "A system programmed for constant airflow on a duct system with a developing restriction will instead show climbing motor watt draw and effort while airflow stays deceptively normal — until the motor hits its maximum effort and airflow finally collapses all at once",
  "Check the motor/board's actual configured mode and CFM/torque profile against the equipment manufacturer's documentation for this specific install, not just against a generic ECM datasheet",
  "If the wrong mode was set at install or during a parts swap, reprogram to the mode and target the manufacturer specifies for this equipment and duct combination rather than replacing the motor",
  "Measure actual delivered CFM (via static pressure and the blower's airflow table, or a flow hood) to confirm the reprogrammed setting actually corrects the real-world airflow, not just the setpoint",
], confidence:"common" },
{ id:"s-ecm-replacement-motor-generic-programming", equipment:"Air Handler", title:"Universal/aftermarket ECM replacement motor delivers wrong airflow after installation", summary:"A generic or universal ECM replacement motor was installed but never programmed to match the original equipment's airflow profile.", steps:[
  "Confirm whether the replacement is a true OEM motor or a universal/aftermarket ECM replacement — universal motors ship with generic default programming that must be set to match the application",
  "Check the replacement motor's programming module/dip switches against the equipment manufacturer's required CFM-per-speed-tap or profile chart for this specific model — don't assume the installer matched it correctly",
  "Symptoms of incorrect programming include noticeably weak or excessive airflow, high or low temperature rise out of spec, or short-cycling on limit that didn't happen with the original motor",
  "Reprogram to the correct profile using the replacement manufacturer's cross-reference/setup procedure for that furnace or air handler model",
  "After reprogramming, verify with an actual static pressure and temperature rise check rather than assuming the new setting is correct just because it matches a chart",
], confidence:"common" },
{ id:"s-ecm-masks-airflow-loss-dirty-wheel", equipment:"Air Handler", title:"ECM blower hides a developing airflow restriction until it suddenly gets bad", summary:"Because a constant-airflow ECM motor automatically increases effort to hold CFM, a slowly worsening restriction (dirty wheel, loading filter, collapsing duct) can go unnoticed by the customer until the motor finally maxes out.", steps:[
  "Don't rely on \"the airflow feels fine\" as proof nothing is wrong on an ECM system — check the motor's actual current draw/wattage against its baseline for the programmed speed; steadily climbing draw at the same setting is an early warning sign a PSC system wouldn't show this clearly",
  "Inspect the blower wheel for dirt buildup even when airflow at the registers still feels normal — the ECM has likely been compensating by working harder, not by delivering unrestricted airflow",
  "Check filter loading and static pressure trend if any history/logging is available on the equipment or a smart thermostat, since a slow climb over months is easy to miss without a data point",
  "Once the true cause (dirty wheel, loading filter, duct restriction) is corrected, confirm motor watt draw drops back toward its expected baseline for that speed setting",
  "Explain to the customer that an ECM system can mask a slowly worsening problem right up until it can't compensate anymore — regular filter/coil maintenance matters more, not less, on these systems",
], confidence:"common" },
{ id:"s-ecm-thermal-shutdown-cycling", equipment:"Air Handler", title:"ECM blower motor shuts down and restarts repeatedly (thermal protection cycling)", summary:"Motor runs for a while, drops out, pauses, then restarts on its own — distinct from erratic speed hunting.", steps:[
  "Confirm the pattern first: a full stop-and-restart cycle (versus speed surging while continuing to run) points toward the motor's internal thermal protection tripping, not a control/programming issue",
  "Check for airflow restriction forcing the motor to work at high effort continuously — an ECM working hard against high static for extended periods can run hot enough to trip thermal protection even though it's functioning as designed",
  "Check the motor's physical mounting/ventilation — ECM modules have heat sinks that rely on airflow across them; confirm nothing is blocking the module's own cooling airflow inside the cabinet",
  "Check ambient temperature around the air handler itself (a hot attic or closet) if this happens seasonally, since high ambient reduces the module's thermal headroom",
  "If thermal cycling continues after airflow and ventilation are confirmed correct, this points to a genuine module fault rather than an environmental cause, and the module should be replaced",
], confidence:"common" },
{ id:"s-ecm-cfm-verification-howto", equipment:"Air Handler", title:"Verifying actual ECM-delivered CFM in the field (don't trust the programmed setpoint alone)", summary:"A programmed CFM number on an ECM board is a target, not proof of what the system is actually delivering — here's how to confirm it.", steps:[
  "Measure total external static pressure across the equipment (see the static pressure methodology entry in this list) and cross-reference it against the manufacturer's blower performance table for the current speed/tap setting to estimate actual delivered CFM",
  "Where available, read the motor's actual CFM output directly from a diagnostic display or app on equipment that reports it live, rather than relying on the programmed target alone",
  "Use a flow hood at each register (summed across all registers) for a direct, independent measurement when available — this cross-checks the static-pressure-table method and catches duct leakage the table method can't see",
  "If measured CFM is meaningfully below the programmed target, the motor is likely maxed out fighting excess static pressure rather than malfunctioning — address the duct/filter/coil restriction, don't just reprogram a higher target",
  "Document the measured CFM against the equipment's rated requirement (e.g., CFM per ton for cooling capacity) so airflow-related capacity or icing complaints can be tied back to an actual number instead of a guess",
], confidence:"common" },

// ---------------- PSC BLOWER MOTORS — deep dive ----------------
{ id:"s-psc-internal-overload-cycling", equipment:"Air Handler", title:"PSC blower motor cycles on and off on its own (internal thermal overload tripping)", summary:"A single-speed PSC motor runs for a while, stops, cools down, then restarts by itself — the motor's built-in thermal overload protector doing its job in response to an underlying stress.", steps:[
  "Confirm the pattern: motor runs, gets noticeably warm, shuts off, sits for several minutes, then restarts on its own without any thermostat or control input — this is the internal overload protector resetting itself, not a control fault",
  "Check the run capacitor's µF value first — a weak or out-of-tolerance capacitor forces the motor to work harder and draw more current, heating it up faster than normal and triggering the overload sooner",
  "Check for a mechanical drag — a bearing starting to fail, or debris in the blower wheel — that raises the motor's running load and heat",
  "Check actual voltage at the motor terminals under load; a sustained low voltage forces higher current draw for the same output and can trip a healthy overload protector repeatedly",
  "Check airflow restriction (filter, coil, duct) forcing the motor to work against more resistance than it's rated for",
  "If capacitor, voltage, mechanical drag, and airflow all check out normal and the motor still cycles on overload, the motor's windings are likely degrading and it should be replaced rather than repeatedly reset",
], safety:"Discharge capacitors safely before handling. A motor that's hot enough to trip its overload repeatedly can be a burn hazard — let it cool before handling.", confidence:"common" },
{ id:"s-psc-multispeed-tap-troubleshooting", equipment:"Air Handler", title:"Multi-speed PSC blower motor — wrong speed running, or speed tap wiring troubleshooting", summary:"Older multi-speed PSC motors select speed via separate tap wires (often color-coded) to the control board — a miswired or mis-selected tap causes the blower to run at the wrong speed for the mode it's in.", steps:[
  "Identify the motor's speed taps at the wiring harness (commonly labeled or color-coded for low/med-low/med-high/high) and trace which tap is actually connected to which control board terminal (heat speed, cool speed, common)",
  "Compare the current wiring against the furnace/air handler's wiring diagram — a tap swapped during a previous repair (e.g., heat and cool speeds reversed) produces a system that runs, just at the wrong speed for the mode",
  "Check for a loose or corroded spade connector at the tap wire itself — a poor connection on a single tap can cause that speed to not run at all, or run erratically, while other speeds work fine",
  "If a specific tap reads open or shows abnormal resistance compared to the others, that section of the motor winding has failed and the motor needs replacement — an individual tap can fail without taking out the whole motor immediately",
  "After correcting wiring, verify actual airflow/static pressure at the corrected speed rather than assuming the tap label alone guarantees the right CFM for this equipment",
], confidence:"common" },

// ---------------- DUCT SYSTEM DESIGN ----------------
{ id:"s-ductsizing-manuald-field-mismatch", equipment:"Air Handler", title:"Duct sizing doesn't match Manual D — field performance issues traced back to duct design", summary:"Airflow/comfort complaints that persist despite healthy equipment often trace back to duct trunks and branches sized off a rule of thumb instead of an actual Manual D calculation.", steps:[
  "Check whether the ductwork was actually designed (Manual D, or equivalent duct sizing software) or sized by rule of thumb/experience — many older or budget installs skip a real duct design entirely",
  "Compare trunk and branch duct sizes against the equipment's rated CFM and the room-by-room loads (Manual J) it's meant to serve — undersized trunks are a very common root cause of chronic high static pressure",
  "Check for a duct system originally sized for a smaller/older piece of equipment that was later replaced with higher-capacity equipment without re-sizing the ducts",
  "Measure actual static pressure and room-by-room airflow to quantify the mismatch (see the static pressure methodology entry) rather than relying on a visual size estimate alone",
  "Where a full redesign isn't practical, identify the specific undersized runs causing the worst symptoms and prioritize those for correction rather than treating the whole system as a single problem",
], confidence:"common" },
{ id:"s-duct-transition-fitting-turbulence", equipment:"Air Handler", title:"Turbulence losses from duct transitions and fittings near the equipment", summary:"Sharp, abrupt, or poorly designed transitions and fittings close to the air handler add resistance well beyond their straight-line size would suggest, even when overall duct sizing looks adequate.", steps:[
  "Inspect transitions right off the equipment plenum (supply and return) for abrupt size changes, sharp 90-degree turns close to the cabinet, or fittings installed with tight radius bends instead of gradual ones",
  "Check for a duct takeoff placed too close to another takeoff or to a turn, which disrupts airflow at both locations rather than just one",
  "Recognize that these localized turbulence losses don't show up as a simple duct-too-small problem — a system can have correctly sized straight duct runs and still show high static pressure from just a few bad fittings near the unit",
  "Where a poor fitting is contributing significantly to static pressure, correcting or replacing that section is often more effective than upsizing straight duct runs elsewhere",
  "Reference ACCA Manual D or the fitting equivalent-length tables when evaluating whether a specific fitting's contribution to total static pressure is normal or excessive for its type",
], confidence:"common" },
{ id:"s-duct-plenum-undersized", equipment:"Air Handler", title:"Supply or return plenum undersized for the equipment's airflow", summary:"The plenum box directly off the equipment is a common bottleneck that gets overlooked because it's short and close to the unit, not a long duct run.", steps:[
  "Measure the plenum's cross-sectional area and compare against the equipment's rated CFM and the manufacturer's minimum plenum sizing guidance — plenums are easy to undersize because they're often built to fit an opening rather than calculated",
  "Check for a plenum that necks down immediately at the takeoffs, creating a bottleneck right where multiple branch ducts are trying to draw air",
  "Check static pressure specifically at the plenum (as close to the equipment as practical) versus further out in the duct system — a large pressure drop concentrated right at the plenum points here rather than the branch ductwork",
  "On a return plenum specifically, check that it's sized to accommodate the full return airflow plus the filter itself without significant additional restriction",
  "If the plenum is confirmed undersized, correcting or resizing it usually has an outsized benefit on overall static pressure since it's the single point all the air is forced through",
], confidence:"common" },
{ id:"s-ductmaterial-failure-modes", equipment:"Air Handler", title:"Duct material differences — sheet metal vs. flex duct vs. duct board failure modes", summary:"Each duct material fails in a different way, and recognizing which one you're dealing with changes what to inspect for.", steps:[
  "Sheet metal: check for seam separation, missing/failed mastic or tape at joints (a major leakage point), and rust/corrosion at moisture-exposed sections; sheet metal itself is durable but seams and connections are the weak point",
  "Flex duct: check for crushed or kinked sections, sagging between supports, excess uncoiled length adding friction loss, and inner liner separation from the outer vapor barrier over time — flex duct's flexibility is also its main failure vector",
  "Duct board (rigid fiberglass board): check for interior surface erosion/delamination from years of airflow, water damage causing the board to soften or sag, and seam tape failure at joints — duct board can also support mold growth if it stays wet",
  "Regardless of material, check overall duct system leakage as a category separate from any single failure — leakage adds up across many small gaps and isn't always tied to one obvious material defect",
  "When recommending repair vs. replacement, factor in which material is installed — a sheet metal system with good bones may only need reseal/re-mastic, while duct board or old flex showing widespread degradation is often more cost-effective to replace than patch repeatedly",
], confidence:"common" },
{ id:"s-ductliner-fiberglass-erosion", equipment:"Air Handler", title:"Internal fiberglass duct liner eroding or shedding into the airstream", summary:"Sheet metal ducts lined internally with fiberglass insulation can erode over time, sending fibers directly into the conditioned airstream — a distinct failure mode from external duct wrap insulation.", steps:[
  "Check for visible fraying, bare/exposed fiberglass, or a rough/pitted liner surface inside accessible sections of internally lined ductwork, especially near high-velocity areas like close to the blower or at fittings",
  "Ask about occupant symptoms — persistent respiratory irritation or visible fibrous debris at registers can point to liner erosion even before it's visually obvious inside the duct",
  "Check airflow velocity at the affected sections — liner erosion accelerates at higher velocities, so a system running higher-than-designed CFM through lined duct wears the liner faster than intended",
  "Distinguish this from external duct wrap (insulation on the outside of the duct, not exposed to the airstream) — external wrap issues affect thermal performance and condensation risk, not airstream contamination",
  "Where erosion is confirmed and significant, recommend replacing the affected sections with unlined duct (using external insulation instead) or duct board rather than attempting to patch or reseal the interior liner",
], confidence:"common" },
{ id:"s-ductboard-delamination", equipment:"Air Handler", title:"Duct board interior delamination or erosion", summary:"Rigid fiberglass duct board can delaminate or erode on its interior airstream-facing surface over years of service, similar in effect to lined sheet metal but with different repair options.", steps:[
  "Inspect accessible sections of duct board for a rough, pitted, or peeling interior surface, especially at high-velocity locations near the equipment or at sharp turns",
  "Check for water staining or softening of the board itself — duct board that has been wet (roof leak, condensation, high humidity) delaminates and can develop mold much faster than dry board simply aging",
  "Check seam tape and mastic at duct board joints separately from the board surface itself — seam failure is a leakage issue, while surface delamination is an airstream-contamination and structural issue",
  "Assess the extent of delamination before deciding on repair vs. replacement — isolated minor erosion at one fitting can sometimes be sealed/coated per manufacturer-approved methods, while widespread delamination generally warrants replacing that section",
  "If water intrusion caused the delamination, identify and correct the water source (roof leak, condensation, drain issue) before replacing the duct board, or the new material will fail the same way",
], confidence:"common" },
{ id:"s-flexduct-excess-length-uncompressed", equipment:"Air Handler", title:"Flex duct not pulled tight — excess coiled/sagging length restricting airflow", summary:"Distinct from a crushed or kinked run — flex duct that's simply left longer than needed, or not fully extended and supported, adds significant friction loss from the accordion-like inner core even with no physical damage.", steps:[
  "Inspect each flex run for excess length beyond what's needed to reach its destination — coiled or bunched extra flex left in an attic or crawlspace acts like extra equivalent length of highly restrictive duct",
  "Check that flex duct is pulled reasonably taut and properly supported at intervals per the manufacturer's installation instructions — sagging between supports creates low points that both restrict airflow and can trap condensate",
  "Compare the installed length against the straight-line distance needed — flex duct's friction loss per foot is meaningfully higher than smooth sheet metal, so unnecessary extra length has an outsized impact on static pressure",
  "Where excess length is found, cut back and properly re-terminate the run rather than just re-coiling it more neatly — a shorter, properly tensioned run measurably improves airflow",
  "Recheck static pressure/airflow at that branch after correcting length and support to confirm the fix, since this issue is easy to under- or over-estimate by eye alone",
], confidence:"common" },

// ---------------- FILTERS — deep dive beyond MERV ----------------
{ id:"s-filter-washable-vs-disposable", equipment:"Air Handler", title:"Washable vs. disposable filters — different troubleshooting approach", summary:"Washable filters fail and get diagnosed differently than disposable ones — a customer's cleaning habits matter as much as the filter itself.", steps:[
  "Confirm which type is installed and how the customer has been maintaining it — a washable filter that's simply being rinsed with plain water without a proper cleaning method can retain a biofilm that reduces airflow without looking visibly dirty",
  "Check for physical damage to a washable filter's frame or media — repeated handling and cleaning cycles can warp the frame or tear the media over its service life, which a disposable filter simply doesn't experience",
  "Check that a washable filter is fully dry before being reinstalled — a damp filter restricts airflow and can support mold growth, and this is a common self-inflicted issue after a well-intentioned cleaning",
  "For disposable filters, confirm the customer's actual replacement interval against the filter's rated life and the home's dust/pet load — chronic low-airflow complaints often trace back to a filter left in far past its rated interval",
  "If a washable filter's media has degraded (thinning, gaps, frame damage) beyond what cleaning can fix, recommend replacement of the filter itself rather than continuing to clean a compromised media",
], confidence:"common" },
{ id:"s-filter-electrostatic-issues", equipment:"Air Handler", title:"Electrostatic filter not performing — charge buildup and washing issues", summary:"Passive electrostatic (self-charging, non-powered) filters rely on airflow generating a static charge in the media — different failure mode from both mechanical MERV filters and powered electronic air cleaners.", steps:[
  "Confirm this is a passive electrostatic filter (charges itself from airflow moving through the polypropylene media, no external power) rather than a powered electronic air cleaner, since troubleshooting and expectations differ between the two",
  "Check the filter's cleaning history — electrostatic media needs periodic washing per the manufacturer's schedule; a heavily loaded electrostatic filter both restricts airflow like any dirty filter and loses its static-charge collection efficiency",
  "Confirm the filter is oriented correctly (arrows indicating airflow direction) — installed backwards, an electrostatic filter's charge-generating layers don't work as designed even though air still passes through",
  "After washing, confirm the filter is completely dry before reinstalling, same as a washable mechanical filter, since residual moisture affects both airflow and the electrostatic effect",
  "Set realistic expectations with the customer — electrostatic filters generally trade some particulate efficiency for lower static pressure and washability compared to high-MERV mechanical filters; a complaint about dust collection may be a mismatch of filter type to expectation, not a malfunction",
], confidence:"common" },
{ id:"s-filter-grille-undersized-cfm", equipment:"Air Handler", title:"Filter grille too small for the equipment's rated CFM", summary:"An undersized return filter grille can single-handedly cause high static pressure and airflow complaints even when the rest of the duct system and filter media are correctly chosen.", steps:[
  "Check the filter grille's actual dimensions and net free area against the equipment's rated CFM — a common rule of thumb many techs use is keeping face velocity through the filter area in a reasonable range (roughly 300 fpm or less for a standard 1-inch filter), but always confirm against the specific filter/equipment manufacturer's sizing guidance",
  "Check whether the filter grille size was carried over from a smaller previous system during an equipment upgrade — this is one of the most common real-world causes of this issue",
  "Measure static pressure specifically across the filter/grille location, isolating it from the rest of the return system, to confirm it's a meaningful contributor before recommending changes",
  "Where the grille itself can't be enlarged (fixed opening, cosmetic constraints), consider adding a second return/filter location to spread the airflow across more filter area rather than forcing it all through one undersized opening",
  "Explain to the customer that this is a sizing issue independent of filter brand or MERV rating — swapping filter brands at the same size won't resolve it",
], confidence:"common" },
{ id:"s-filter-bypass-poor-seal", equipment:"Air Handler", title:"Air bypassing the filter instead of passing through it (poor seal at the rack/frame)", summary:"A filter can be the correct size and MERV rating and still fail to actually filter the air if unsealed gaps let air take the path of least resistance around it.", steps:[
  "Inspect the filter rack/frame for gaps around the filter's edges — a filter that's slightly undersized for its slot, warped, or sitting loosely allows air to bypass through the gap rather than through the media",
  "Check for a missing or damaged filter rack door/cover, or one that doesn't latch/seal tightly, which is a very common bypass point independent of the filter itself",
  "Look for dust staining patterns around the edges of the filter frame or rack opening — visible dust tracking around the perimeter of the filter is a strong sign of ongoing bypass",
  "Confirm the filter is actually seated in its designed track/slot and not just loosely placed in front of the opening, which happens more often than expected after a quick filter change",
  "Correct the seal with proper gasketing, a correctly sized filter, or a repaired/replaced rack door — a filter can only do its job if all the return air is actually forced through it",
], confidence:"common" },
{ id:"s-mediacabinet-vs-1inch", equipment:"Air Handler", title:"4-5 inch media filter cabinet vs. 1-inch filter — different service intervals and failure signs", summary:"Deep pleated media cabinets behave differently from standard 1-inch filters in both normal operation and how they fail — don't apply 1-inch filter expectations to a media cabinet.", steps:[
  "Confirm which is installed — a media cabinet has significantly more surface area than a 1-inch filter of the same face dimensions, which is why it can hold a higher MERV rating at comparable or lower static pressure",
  "Expect a much longer service interval on a media cabinet (commonly 6-12 months depending on conditions) compared to a 1-inch filter (commonly 1-3 months) — a customer or previous tech applying a 1-inch-filter change schedule to a media cabinet isn't the cause of a problem, but check whether the reverse mistake (leaving a media filter in far too long, assuming it lasts indefinitely) has occurred",
  "When checking static pressure impact, compare against the media cabinet manufacturer's own pressure-drop chart for its media type and MERV rating, not a 1-inch filter's typical figures — they're not directly comparable even at the same nominal MERV",
  "Inspect the media cabinet's door gasket and latch mechanism specifically (see the related bypass entry) since these cabinets rely on a properly sealing door in a way a simple 1-inch slot filter doesn't",
  "If a system was recently converted from a 1-inch slot to a new media cabinet, confirm the cabinet was actually plumbed into the full return airflow path correctly and isn't just added awkwardly alongside the old opening",
], confidence:"common" },
{ id:"s-mediacabinet-door-seal-bypass", equipment:"Air Handler", title:"Media filter cabinet door/gasket not sealing — air bypassing the media", summary:"A specific, common failure point on 4-5 inch media cabinets distinct from general filter bypass — the access door itself.", steps:[
  "Check the door gasket for compression set, tears, or missing sections — gaskets on media cabinet doors lose their seal over years of opening/closing for filter changes",
  "Check that the door latch mechanism is actually drawing the door fully tight against the gasket, not just closed — a worn or bent latch can let the door sit closed but not sealed",
  "Look for dust staining or streaking around the door perimeter, which indicates air has been bypassing through that gap over time rather than through the media",
  "Check that the filter media itself is correctly seated in its internal frame/track inside the cabinet, since a media panel that's shifted or not fully seated creates an internal bypass even with a well-sealed door",
  "Replace a compromised gasket rather than relying on latch pressure alone to compensate — a proper gasket is a low-cost fix relative to the filtration and efficiency loss from ongoing bypass",
], confidence:"common" },

// ---------------- HUMIDIFIERS — deep dive beyond basics ----------------
{ id:"s-humidifier-type-troubleshooting-approach", equipment:"Other", title:"Bypass flow-through vs. fan-powered vs. steam humidifier — different troubleshooting approach for each", summary:"All three add humidity, but they fail differently and require checking different components first.", steps:[
  "Bypass flow-through: relies entirely on furnace blower airflow and a bypass duct to pull air across a wetted pad — check that the bypass damper opens on a call and that there's adequate pressure differential between supply and return to actually drive airflow through the bypass",
  "Fan-powered: has its own dedicated fan pulling air across the pad independent of the furnace blower — check the booster fan itself for operation, and don't assume a fan-powered unit is dead just because the main blower isn't running, since it isn't supposed to depend on it",
  "Steam: generates humidity by boiling water in a canister using electric elements/electrodes, independent of duct airflow driving evaporation — check power to the canister, water level/fill valve operation, and the canister's condition (see the steam canister entry) rather than airflow or bypass damper issues, which don't apply to this type",
  "Confirm which type is installed before troubleshooting — applying a bypass-style checklist (damper, pressure differential) to a steam unit, or expecting a bypass unit to run independent of the furnace blower like a fan-powered unit, wastes time chasing the wrong components",
  "For all three types, confirm the humidistat call is actually reaching the unit before assuming a unit-level fault, since a control-side wiring or setting issue produces the same \"not humidifying\" symptom across all three designs",
], confidence:"common" },
{ id:"s-humidifier-steam-canister-scale", equipment:"Other", title:"Steam humidifier canister/cylinder scaling and replacement", summary:"Steam humidifiers boil water using electrodes or elements inside a replaceable canister, and mineral scale buildup is the dominant failure mode — distinct from pad-style humidifier maintenance.", steps:[
  "Check output/steam production against the unit's rated capacity — declining output over time with no error present is often simply scale buildup reducing the electrodes' effective conductivity or the element's heat transfer",
  "Inspect the canister for visible scale accumulation — in hard water areas, canisters can require replacement on a schedule measured in a single season rather than years, and this is normal wear, not a defect",
  "Check the unit's fault/status indicator (many steam humidifiers have a dedicated light or code for \"replace canister\" or high current draw from scale) before assuming a control board issue",
  "Check the drain cycle (many steam humidifiers periodically drain and refill to manage mineral concentration) is actually functioning — a failed drain cycle accelerates scale buildup and shortens canister life significantly",
  "Discuss water quality with the customer — a whole-home water softener or a lower-mineral water source meaningfully extends canister life in hard water areas, which is worth raising if canisters are failing unusually fast",
  "Replace the canister per the manufacturer's part number rather than attempting to descale most disposable-canister designs — some steam humidifiers use a cleanable canister instead, so confirm which type this unit uses before deciding",
], safety:"Steam humidifier canisters carry line voltage to internal electrodes/elements and contain hot water — de-energize and allow to cool before servicing.", confidence:"common" },
{ id:"s-humidistat-vs-dewpoint-control", equipment:"Other", title:"Humidistat vs. dew point control — different behavior and settings", summary:"A simple relative-humidity humidistat and a dew-point-based control respond differently to changing indoor/outdoor conditions, and mixing up expectations between the two causes confusing complaints.", steps:[
  "Confirm which control type is installed — a basic humidistat targets a fixed relative humidity percentage regardless of outdoor temperature, while a dew point (or outdoor-temperature-compensated) control automatically lowers its target as outdoor temperature drops to help prevent window condensation",
  "If window condensation complaints occur in cold weather with a basic humidistat, this is often the control doing exactly what it's set to do — a fixed RH target that was fine in fall becomes too high once outdoor temperature drops, and the fix is manually lowering the setpoint seasonally (see the related overhumidifying entry) or upgrading to a control with automatic compensation",
  "If a dew-point-style control is installed but the customer still sees condensation, check that its outdoor temperature sensor is reading correctly, since a bad or misplaced sensor causes the control to use the wrong compensation curve",
  "Check the control's actual programmed curve/table (some dew point controls have adjustable compensation aggressiveness) against the home's actual window performance — older or single-pane windows condense at a lower indoor RH than modern double-pane windows, so a single default curve doesn't fit every home",
  "Set clear expectations with the customer about which type of control they have and what behavior to expect from it before troubleshooting further, since a lot of these calls are really an education gap rather than a fault",
], confidence:"common" },
{ id:"s-humidifier-fanpowered-fan-not-running", equipment:"Other", title:"Fan-powered humidifier — booster fan not running", summary:"A specific, common fault on fan-powered humidifiers: the pad may be wetting correctly, but the dedicated booster fan that's supposed to drive air across it isn't operating.", steps:[
  "Confirm the unit is actually the fan-powered type (has its own small motor/fan assembly separate from the furnace blower) before troubleshooting this specific component",
  "Check for line/low voltage at the booster fan motor during an active humidification call — no voltage points to the humidifier control or wiring, not the fan motor itself",
  "If voltage is present but the fan doesn't spin, check for a seized bearing or debris jam in the small fan wheel, which is common on units that don't get cleaned regularly along with the pad",
  "Check the fan motor's capacitor if it's a capacitor-start/run design, using the same approach as any small PSC motor",
  "Confirm the water solenoid/valve and pad are still functioning correctly even after the fan is repaired — a unit that's been running with a dead fan for a while can develop pad scaling or a stuck valve from lack of proper airflow drying it between cycles",
], safety:"De-energize before servicing the fan assembly — some fan-powered humidifiers are wired to line voltage, not just low voltage.", confidence:"common" },
{ id:"s-humidifier-bypass-damper-backwards", equipment:"Other", title:"Bypass flow-through humidifier installed backwards — supply and return connections reversed", summary:"A bypass humidifier's duct connections have a specific intended airflow direction, and a reversed install can short-circuit conditioned air instead of properly humidifying it.", steps:[
  "Confirm the correct intended airflow path for this specific unit's design — most bypass humidifiers are meant to pull air from the supply plenum (high pressure), route it across the wetted pad, and discharge into the return plenum (low pressure), using the furnace blower's own pressure differential to drive flow",
  "Check the actual physical connections against the manufacturer's install diagram — a bypass duct connected backwards (return-to-supply instead of supply-to-return) can result in little to no actual airflow through the pad, since it's fighting the pressure differential instead of using it",
  "Symptoms of a reversed or poorly connected bypass include a humidifier that seems to run (water flowing, damper opening) but never actually raises measurable indoor humidity",
  "Check that the bypass damper itself is correctly oriented and opens in the correct direction for the intended airflow, not just that it opens at all",
  "If reversed, correct the ductwork connections per the manufacturer's diagram rather than trying to compensate with a larger damper opening or a different water flow rate",
], confidence:"common" },

// ---------------- DEHUMIDIFIERS — standalone / ducted ----------------
{ id:"s-dehumidifier-standalone-not-dehumidifying", equipment:"Other", title:"Standalone/ducted whole-home dehumidifier not removing moisture", summary:"A compressor-based whole-home dehumidifier (distinct from the main AC system) runs but indoor humidity doesn't drop.", steps:[
  "Confirm the unit's compressor and fan are both actually running during a call — a unit that only runs its fan without the compressor engaging won't meaningfully dehumidify, similar in concept to an AC blower running without the compressor",
  "Check the humidistat/control setpoint and confirm it's actually calling for dehumidification and that the call reaches the unit",
  "Check airflow across the unit's coil — a dirty filter or coil on the dehumidifier itself restricts airflow and reduces moisture removal just like it would on a main AC coil",
  "Check refrigerant charge and pressures on the dehumidifier's own sealed system using the same gauge-reading approach as a standard AC/heat pump — these units use a small compressor-based refrigeration circuit and are diagnosed the same way",
  "Check the space/duct conditions it's serving — a whole-home dehumidifier can be correctly functioning but simply undersized for an unusually high moisture load (e.g., an unusually leaky building envelope or a wet crawlspace feeding excess moisture)",
  "Confirm the unit isn't in a defrost or standby cycle when checked — some units cycle off periodically by design and can appear \"not running\" if checked during that window",
], confidence:"common" },
{ id:"s-dehumidifier-drainage", equipment:"Other", title:"Whole-home dehumidifier drainage/condensate issues", summary:"A compressor-based dehumidifier produces meaningful condensate volume and has its own drain path that needs the same attention as an AC evaporator coil.", steps:[
  "Check the condensate drain line for clogs — algae/biofilm growth is just as common here as on a main AC coil, and often overlooked since these units aren't always on the same maintenance visit as the main system",
  "Check for a dedicated condensate pump (common when the unit is installed somewhere without a nearby gravity drain) and confirm it's running and not jammed",
  "Check the unit's internal drain pan and float switch (if equipped) for proper function — a tripped internal safety float will shut the unit down exactly like an AC system's, and should not be bypassed",
  "Confirm the drain line has adequate slope and, where required, a proper trap sized for this unit — a trap borrowed from AC condensate practices may need adjustment for a dehumidifier's different production rate",
  "Check for the drain line freezing if it's routed through an unconditioned space, using the same approach as the attic condensate freeze entry elsewhere in this list",
], confidence:"common" },
{ id:"s-dehumidifier-hvac-integration-conflict", equipment:"Other", title:"Ducted dehumidifier conflicting with the main HVAC system's control", summary:"A whole-home dehumidifier integrated into the main duct system can fight the primary thermostat/AC control if the interlock wiring or control logic isn't set up correctly.", steps:[
  "Check how the dehumidifier is wired into the system — most designs need to either run independently through its own duct connections or interlock with the main system's blower/damper, and a wiring error here causes conflicting operation",
  "Check for simultaneous calls causing the AC and dehumidifier to work against each other — e.g., the dehumidifier's reheat function (if equipped) fighting the AC's cooling call, causing the space to overcool while chasing a humidity target",
  "Check the main thermostat's dehumidification settings/overcooling allowance (many modern thermostats have a specific setting for this) against how the standalone dehumidifier's own control is configured — both trying to independently manage humidity without coordination is a common source of complaints",
  "Check zone damper interaction if the dehumidifier ties into a zoned duct system, since a dehumidifier call competing with a zone call can leave dampers in an unexpected position",
  "Review the specific integration method used (interlocked relay, dedicated thermostat input, fully independent operation) against the manufacturer's recommended wiring diagram rather than assuming a generic interlock will work correctly for this combination",
], confidence:"common" },
{ id:"s-dehumidifier-standalone-icing", equipment:"Other", title:"Standalone dehumidifier coil icing up", summary:"A compressor-based dehumidifier's coil can ice over in cool/mild conditions, stopping effective moisture removal — similar mechanism to a frozen AC coil but with a lower typical trigger temperature.", steps:[
  "Turn the unit off and allow the coil to fully thaw before further diagnosis, same as any iced evaporator coil",
  "Check the space temperature the unit is operating in — most whole-home dehumidifiers have a minimum rated operating temperature, and running one in a cool basement or crawlspace below that range can cause icing even with the unit otherwise healthy",
  "Check airflow across the coil (filter, coil cleanliness, blower operation) as the first mechanical cause once low ambient temperature is ruled out",
  "Check refrigerant charge if airflow and ambient temperature both check out normal, using the same gauge/superheat approach as a standard AC system's sealed refrigeration circuit",
  "Check whether the unit has a built-in low-temperature cutoff or defrost feature and confirm it's actually enabled/functioning, since some models include this specifically to prevent icing in marginal spaces",
], confidence:"common" },

// ---------------- FRESH AIR / VENTILATION DAMPER (motorized OAD, distinct from ERV/HRV) ----------------
{ id:"s-freshair-damper-stuck", equipment:"Other", title:"Motorized fresh air/outdoor air damper stuck open or closed", summary:"A simple motorized outdoor air damper (not an ERV/HRV) that introduces fresh air into the return duct — distinct troubleshooting from the ERV/HRV entries elsewhere in this list.", steps:[
  "Confirm this is a standalone motorized OA damper tied into the return duct or equipment cabinet, not part of an ERV/HRV core system, since the fault points and fix differ",
  "Stuck closed: check for power/control signal actually reaching the damper actuator during its intended call (often tied to a timer, CO2 sensor, or a simple run-time percentage on the thermostat/controller), and check the actuator itself for a seized linkage",
  "Stuck open: a damper that won't close can pull in excessive outdoor air continuously, causing high humidity intrusion in summer or excess heating/cooling load in extreme weather — check the actuator's spring-return function (if equipped) and confirm it isn't binding mechanically",
  "Check the damper blade and linkage for corrosion or debris buildup, especially on units that have been in service for years without inspection, since outdoor-facing dampers are exposed to more weather and dust than indoor components",
  "Confirm the controller's programmed open-time/schedule matches what the customer and code requirements actually call for — a damper that's technically functioning correctly but programmed for far more or less run time than intended isn't a hardware fault",
], confidence:"common" },
{ id:"s-freshair-damper-control-timer-issue", equipment:"Other", title:"Fresh air damper control/timer not opening on the correct schedule", summary:"The damper hardware itself may be fine, but its controller isn't calling for it at the right times or duration.", steps:[
  "Identify the control strategy in use — simple percentage-of-runtime timers, dedicated ventilation controllers, or integration through a smart thermostat's ventilation settings all behave differently and need to be checked on their own terms",
  "Check the controller's actual programmed settings against what was intended at install (often based on a ventilation calculation for the home's size/occupancy) rather than assuming factory defaults are correct for this house",
  "Check that the controller's clock/schedule is set correctly — a controller that lost its time setting after a power interruption can run on the wrong schedule without throwing any obvious fault",
  "Check interlocking with the main system's blower call, if the design requires the blower to be running for outdoor air to actually be distributed — a correctly timed damper opening with no blower running won't deliver fresh air anywhere",
  "If a CO2 or humidity sensor drives the control instead of a simple timer, check that sensor's reading against a reference instrument, since a drifted sensor causes the damper to run far more or less than the home actually needs",
], confidence:"common" },

// ---------------- ATTIC / CRAWLSPACE INSTALLATION-SPECIFIC ----------------
{ id:"s-attic-airhandler-platform-vibration", equipment:"Air Handler", title:"Attic-installed air handler — platform/stand and vibration isolation issues", summary:"Vibration and noise complaints heard in the living space below an attic air handler often trace back to the platform and isolation, not the equipment itself.", steps:[
  "Check the platform/stand the unit sits on for adequate support and rigidity — a platform spanning between joists without proper blocking can flex and transmit vibration directly into the ceiling structure below",
  "Check for vibration isolation pads or rubber/cork mounts between the unit and the platform — a unit sitting directly on a rigid platform with no isolation transmits motor and blower vibration much more readily",
  "Check flexible duct connectors (canvas or similar) at the supply and return connections to the unit — rigid duct connected directly to the cabinet transmits vibration through the ductwork into the structure at connection points far from the unit itself",
  "Check that the platform and unit are actually level and that nothing is contacting the ceiling drywall or joists directly (even a single point of rigid contact can transmit noticeable vibration/noise)",
  "If vibration is confirmed to originate at the equipment itself (unbalanced blower wheel, worn motor bearing) rather than the platform/isolation, address that as the root cause instead of just adding more isolation to compensate",
], confidence:"common" },
{ id:"s-attic-secondary-pan-sensor", equipment:"Air Handler", title:"Attic-installed air handler — secondary condensate overflow pan sensor issues", summary:"Attic installs commonly require a secondary drain pan with its own float/water sensor beneath the unit, specifically to prevent ceiling damage — a distinct component from the primary pan's own switch.", steps:[
  "Confirm the system actually has a secondary (auxiliary) pan installed beneath the unit, separate from the unit's own internal/primary drain pan — code in many areas requires this for attic installs specifically because of the damage risk below",
  "If the system won't run and this is traced to the secondary pan's sensor, first check for actual standing water in the secondary pan — this sensor doing its job (stopping the unit before a ceiling leak) is not a nuisance fault and shouldn't be bypassed",
  "If water is present in the secondary pan, trace it back to the primary drain system's failure (clogged primary drain, cracked primary pan, or unit not level) rather than just clearing the secondary pan and resetting",
  "If no water is present but the sensor still reads tripped, check the sensor/float switch itself for a stuck or corroded contact, and check its wiring harness for damage from the attic environment (heat, rodents)",
  "After resolving the primary drain issue, confirm the secondary pan is dry and draining (many have their own independent drain routed to a visible location, like above a window, specifically so a future overflow is noticed early) before returning the system to service",
], safety:"Never bypass or disconnect a secondary/auxiliary pan safety switch to get a system running — its entire purpose is preventing water damage to the structure below.", confidence:"common" },
{ id:"s-crawlspace-airhandler-moisture", equipment:"Air Handler", title:"Crawlspace-installed air handler — moisture/humidity-related issues specific to the location", summary:"Air handlers installed in vented or unconditioned crawlspaces face a distinct set of moisture-related issues beyond a normal condensate leak.", steps:[
  "Check overall crawlspace humidity and moisture conditions (standing water, exposed dirt floor without a vapor barrier, poor ventilation) as a contributing factor to corrosion, electrical issues, and mold growth on and around the equipment",
  "Check the unit's cabinet and electrical components for corrosion or rust consistent with chronic high humidity exposure, which accelerates wear on contactors, boards, and sheet metal well beyond what the same equipment would see in a conditioned space",
  "Check ductwork in the crawlspace for external condensation (sweating) forming on duct exteriors when cold supply air runs through humid crawlspace air — this is a distinct issue from an internal condensate drain problem and points to inadequate duct insulation/vapor barrier for the space's conditions",
  "Check whether the crawlspace itself is vented (outside air) or sealed/conditioned (encapsulated) — a vented crawlspace in a humid climate can create conditions the equipment wasn't really designed to sit in long-term, which is worth discussing with the customer as a building-science issue, not just an equipment one",
  "Check elevation/support of the unit off the crawlspace floor — a unit sitting too close to the ground in a damp crawlspace is exposed to more moisture and potential flooding than one properly elevated per code/manufacturer clearance requirements",
], confidence:"common" },

// ---------------- RETURN PLENUM / FILTER RACK ----------------
{ id:"s-return-plenum-transition-issues", equipment:"Air Handler", title:"Return air plenum/transition leaks or undersizing", summary:"The return-side plenum and its transition to the equipment is a common, often-overlooked leak and restriction point distinct from the branch return ductwork feeding into it.", steps:[
  "Inspect the return plenum's seams and its transition/connection to the equipment cabinet for gaps, missing mastic/tape, or panels that were never fully sealed during install — return-side leaks pull in unconditioned or contaminated air (attic, crawlspace, garage) rather than pushing conditioned air out, which makes them easy to miss without a specific check",
  "Check for a return plenum transition that necks down or has a sharp offset right at the equipment connection, adding avoidable turbulence and static pressure right where it's hardest to fix later",
  "Check that the plenum is sized appropriately for the full return airflow plus filter location, not just built to match the cabinet opening dimensions",
  "Use a smoke pencil or a hand near return-side seams during system operation to feel/see for infiltration at plenum joints, since return leaks often aren't as immediately obvious as supply-side leaks that make a room feel warm/cool",
  "Prioritize sealing return plenum leaks pulling from an attic, garage, or crawlspace — these can introduce combustion byproducts, insulation particles, or excess humidity directly into the airstream, beyond just an efficiency loss",
], confidence:"common" },
{ id:"s-filterrack-bypass-gaps", equipment:"Air Handler", title:"Air bypassing around the filter rack itself (frame gaps, missing panel)", summary:"Distinct from air bypassing around the filter media — this is air bypassing the entire filter rack assembly through gaps in its installation into the return plenum/cabinet.", steps:[
  "Inspect where the filter rack itself meets the surrounding plenum or cabinet sheet metal for gaps, unsealed seams, or a rack that was cut in without being properly fastened and sealed on all sides",
  "Check for a missing or improperly fitted access panel/door covering the filter rack opening, distinct from the filter's own door/gasket (see the media cabinet entry) — this is about the rack's installation into the duct system, not the filter compartment door",
  "Look for dust staining around the perimeter of the entire rack assembly (not just the filter edges), which indicates the whole rack is leaking air around itself into the surrounding cavity",
  "Check whether the rack was field-modified or adapted from a different size opening during a filter upgrade — a rack that was resized or shimmed in without proper sealing is a common source of this kind of bypass",
  "Correct by properly sealing the rack's perimeter to the surrounding sheet metal/plenum with appropriate mastic or gasketing, rather than only addressing the filter media fit",
], confidence:"common" },

// ---------------- STATIC PRESSURE & DUCT DIAGNOSTIC METHODOLOGY (reference entries) ----------------
{ id:"s-static-pressure-methodology", equipment:"Air Handler", title:"How to properly take and interpret total external static pressure readings", summary:"A reference walkthrough for taking accurate TESP readings and understanding what the number actually tells you, rather than a single symptom-specific entry.", steps:[
  "Take readings with a manometer at two points: immediately downstream of the equipment on the supply side (before any takeoffs), and immediately upstream of the equipment on the return side (after the filter, right at the cabinet) — total external static pressure is the sum of the supply reading and the return reading (return is typically negative, so add its absolute value)",
  "Drill test ports close to the equipment cabinet in a straight section of duct, avoiding locations right at a turn, takeoff, or transition, which give a falsely turbulent/inaccurate reading",
  "Compare the measured TESP against the equipment's rated maximum (found on the nameplate or in the installation manual) for the blower speed currently in use — a reading above the rated max means the blower is being asked to work harder than designed, regardless of whether airflow still feels adequate",
  "Take supplemental readings across individual components (filter, coil, each major duct section) by placing probes on both sides of that component — this isolates which specific section is contributing the most resistance rather than just knowing the total is high",
  "Cross-reference the final TESP number against the manufacturer's blower performance table for the installed motor and speed tap to estimate actual delivered CFM, since a high-static system delivers less airflow than its speed setting alone would suggest",
  "Retest after any correction (filter change, duct repair, coil cleaning) to confirm the fix actually moved the number, rather than assuming a visual improvement means the pressure problem is resolved",
], confidence:"common" },
{ id:"s-ductblaster-building-pressure-test", equipment:"Air Handler", title:"Duct blaster / building pressure diagnostic testing — reference", summary:"A reference overview of duct leakage and building pressure testing methodology, distinct from a simple static pressure check, for quantifying duct leakage and pressure imbalance rather than just airflow resistance.", steps:[
  "Understand the two main duct leakage tests: \"total duct leakage\" (measured with the system's registers sealed off, testing the whole duct system including leaks to both conditioned and unconditioned space) versus \"duct leakage to outside\" (uses a blower door in combination with the duct tester to isolate specifically how much leaks to unconditioned/outdoor space) — these give different numbers for the same duct system and answer different questions",
  "Set up the duct tester (duct blaster) per its manufacturer's procedure: seal all registers and grilles, connect the calibrated fan to a return or a dedicated test port, and pressurize the duct system to a standard reference pressure (commonly 25 Pa) while reading the resulting airflow needed to maintain that pressure — that airflow reading is the leakage rate",
  "Compare the measured leakage against applicable code/program thresholds (e.g., a percentage of the system's rated airflow or conditioned floor area) rather than judging by a raw number alone, since acceptable thresholds vary by program and duct location",
  "For building/house pressure testing (distinct from duct leakage testing), use a blower door to measure whole-house pressure differential relative to outdoors, and use it in combination with a duct blaster to assess how much of a home's air leakage is actually duct-related versus envelope-related",
  "Use room-to-room or zone pressure differential readings (with interior doors closed) to diagnose the negative/positive pressure imbalance issues referenced elsewhere in this list — a single central return design is a common source of significant room-level pressure imbalance even when whole-house numbers look reasonable",
  "Document results with actual readings rather than a pass/fail impression alone — duct leakage numbers are often required for code compliance, utility rebate programs, or diagnosing a comfort complaint that isn't resolving with equipment-side fixes",
], confidence:"common" },

// ---------------- GRILLE / REGISTER SIZING AND THROW ----------------
{ id:"s-grille-sizing-throw-comfort", equipment:"Air Handler", title:"Register/grille sizing and throw pattern affecting comfort vs. actual performance", summary:"A room can be receiving correct, properly balanced CFM and still generate a comfort complaint if the register's throw pattern doesn't match the room's layout and use.", steps:[
  "Before assuming an airflow problem, confirm actual CFM at the complaint register with a flow hood — a room receiving correct airflow can still feel drafty, stuffy, or uneven purely due to how that air is being thrown into the space",
  "Check the register's throw pattern (1-way, 2-way, 4-way) against its location and the room's layout — a register throwing air directly onto a seating area, bed, or workstation causes a draft complaint that has nothing to do with the CFM being wrong",
  "Check register sizing (free area) against the branch duct's CFM — an undersized register face forces the same air through a smaller opening, raising velocity and noise/draft sensation even when total room CFM is correct; an oversized register can cause air to dump nearby instead of throwing across the room, leaving far corners feeling stagnant",
  "Check mounting height and orientation (floor, wall, ceiling registers all throw differently) against what the room actually needs — a ceiling register in a room with high ceilings may need a different throw pattern than the same register would in a room with standard ceiling height",
  "When correcting a throw-pattern complaint, consider changing the register type/pattern or relocating within the same opening before assuming the duct sizing or system CFM itself needs to change — this is often a much simpler and cheaper fix",
], confidence:"common" },
{ id:"s-register-throw-pattern-mismatch", equipment:"Air Handler", title:"Register throw pattern mismatched to room layout — comfort complaints despite correct airflow", summary:"A companion issue to general throw-pattern sizing — specifically when furniture, renovations, or room-use changes have made a previously fine register placement/pattern now feel wrong.", steps:[
  "Ask when the complaint started relative to any room changes — new furniture blocking a register's throw path, a renovation that changed room layout, or a change in how the room is used (e.g., a home office added where airflow wasn't previously noticed) are common non-mechanical causes",
  "Check for physical obstructions in the register's throw path (furniture, curtains, partial walls added later) redirecting air in an unintended direction rather than a change in the equipment or duct system",
  "Confirm total room CFM is still correct with a flow hood before spending time on throw pattern alone, since a genuine airflow reduction (developing duct leak, damper drift) happening around the same time as a room change is a coincidence worth ruling out",
  "Where the register itself can't be relocated, consider a different throw-pattern register (e.g., switching to an adjustable-louver or directional diffuser) to redirect airflow away from the newly problematic area",
  "Document the change and resolution so it's clear this was a comfort/layout issue rather than an equipment repair, which helps set expectations if the customer rearranges furniture again in the future",
], confidence:"common" },

// ---------------- ELECTRICAL / CONTROLS / MINI-SPLIT — deep dive ----------------
{ id:"s-transformer-va-overload", equipment:"Other", title:"Control transformer overloaded after adding accessories (VA load calculation)", summary:"A 24V transformer that was fine for years starts nuisance-tripping its fuse or sagging voltage after a zone panel, UV light, humidifier, or extra relays get added to the circuit.", steps:[
  "Add up the VA draw of every 24V-powered device on the transformer: thermostat, gas valve, zone panel/zone dampers, humidifier solenoid, UV light ballast, any add-on relays — most residential furnace/air handler transformers are rated 40VA (sometimes 50-75VA); commercial and zoned systems often need a dedicated larger transformer",
  "Compare total connected VA against the transformer's nameplate VA rating, not just against what the original equipment alone required",
  "Measure loaded secondary voltage (transformer running, all accessories energized) — voltage sagging well below 24V under load confirms an overloaded transformer even if it reads fine unloaded",
  "Check for a hot-to-the-touch transformer or a control fuse that blows only when a specific accessory (zone panel, humidifier) cycles on — that's the overloaded circuit, not a wiring short",
  "If overloaded, don't just upsize the fuse — install a properly sized dedicated transformer for the added load, or move heavy accessories (zone panel, humidifier) to their own transformer",
  "Re-verify total VA any time a new accessory gets added later — this is a common callback months after an unrelated install",
], safety:"Disconnect power before working in the transformer/control circuit; low voltage still presents a burn/short risk at the secondary terminals.", confidence:"common" },

{ id:"s-elec-fuse-vs-breaker-selection", equipment:"Other", title:"Choosing a fuse vs. a breaker for equipment protection", summary:"Reference for why control circuits use fuses and main power uses breakers, and how to size each correctly rather than just matching what was there before.", steps:[
  "Understand the roles are different: a control-circuit fuse (glass automotive-style, usually 3-5A) protects the transformer/board from a low-voltage short; the line-voltage breaker/fuse disconnect protects the branch circuit conductors and is sized off the equipment's nameplate MCA/MOCP",
  "Never substitute a breaker for the board-level low-voltage fuse or vice versa — they protect different things at different current levels",
  "Size the line-voltage disconnect fuse/breaker to the equipment nameplate Minimum Circuit Ampacity (MCA) and Maximum Overcurrent Protection (MOCP), not to \"whatever was in stock\"",
  "If a control fuse keeps blowing, treat it as a short in the low-voltage field wiring — replacing it repeatedly with a higher-amp fuse just moves the failure point downstream to the transformer or board",
  "If a breaker trips on inrush (motor/compressor start) but the equipment runs fine otherwise, a slower-tripping HACR-rated breaker sized to spec is the correct fix, not a larger-than-spec breaker",
  "Document any fuse/breaker size change from the equipment's rating plate — undersized protection nuisance-trips, oversized protection leaves wiring unprotected",
], safety:"Never install overcurrent protection larger than the equipment's rated MOCP — this removes protection for the branch circuit wiring and is a fire hazard.", confidence:"common" },

{ id:"s-wire-splice-failure-thermal-cycling", equipment:"Other", title:"Wire nut / butt-splice connections failing over time (thermal cycling)", summary:"A connection that tested fine at install starts causing intermittent faults years later, often traced to a splice that has mechanically loosened from repeated heating and cooling.", steps:[
  "Suspect thermal cycling failure when a fault is intermittent, worse in extreme heat or cold, or appears only after the system has been running a while (splice heats up, expands, and the connection opens slightly)",
  "Visually inspect wire nuts and butt splices for discoloration, melted/brittle insulation, or a wire nut that spins loosely on the conductors — these all indicate a connection that has been arcing or resistively heating",
  "Wiggle-test suspect splices with power off — a connection that shows continuity change when flexed is failing mechanically, not just resistively",
  "Check for the underlying cause, not just the symptom: undersized wire nut for the gauge/conductor count, stranded wire not twisted before capping, or dissimilar metals (aluminum whip to copper equipment lead) accelerating loosening",
  "Repair with a properly sized connector for the gauge/count, or better, replace wire nuts with a crimped and heat-shrunk butt splice at high-vibration/high-cycle locations like compressor whips and outdoor disconnects",
  "On splices exposed to weather or vibration (outdoor whip, condenser fan leads), use a sealed/weatherproof connector rather than a standard interior wire nut",
], safety:"De-energize and verify with a meter before disturbing any splice — a loose, heat-damaged connection can be live even with insulation that looks intact.", confidence:"common" },

{ id:"s-disconnect-whip-issues", equipment:"Other", title:"Disconnect box and whip problems (corrosion, loose lugs, chafing)", summary:"Outdoor disconnect boxes and their flexible whips take weather and vibration abuse that indoor electrical rarely sees, causing failures that look like equipment problems.", steps:[
  "Open the disconnect (power off, blade pulled) and inspect lugs for corrosion, green/white oxidation on aluminum, or discoloration/heat damage indicating a loose connection",
  "Torque-check lugs to a properly seated connection — a lug that was never fully tightened at install is a very common cause of intermittent power loss or voltage drop under load",
  "Inspect the whip (flexible conduit and conductors) for chafing where it passes through the disconnect box or unit cabinet knockout — vibration over years can wear through insulation and cause an intermittent short or ground fault",
  "Check for water intrusion in the disconnect box — a cracked or missing weatherproof \"in-use\" cover, or a whip fitting that isn't sealed, lets water track down onto the fuse block/blades and causes corrosion or nuisance trips",
  "Verify the disconnect blade/pullout makes firm, even contact on both poles — a pitted or loosely-fitting blade causes single-phasing-like symptoms (compressor hums, runs hot, or won't start) even though the breaker upstream is fine",
  "Replace corroded fuse pullout blocks entirely rather than just cleaning them — surface corrosion on the contact points recurs quickly outdoors",
], safety:"Confirm the disconnect is actually de-energized with a meter before opening — pulling a blade does not always guarantee both poles are dead if it's miswired.", confidence:"common" },

{ id:"s-grounding-bonding-verification", equipment:"Other", title:"Verifying proper equipment grounding and bonding", summary:"A step-by-step check to confirm HVAC equipment is actually grounded and bonded correctly, rather than assuming it is because a ground wire is present.", steps:[
  "Confirm an equipment grounding conductor actually runs from the unit's ground lug back to the panel ground bus — a ground wire that's present but not landed on anything (\"pigtailed to nothing\") is a common finding on older installs",
  "Check continuity from the equipment cabinet/ground lug to the electrical panel ground bus with a meter — should read near 0 ohms",
  "Verify the ground and neutral are bonded only at the main service panel (or main bonding jumper location), not re-bonded at a subpanel or at the equipment disconnect — an improper secondary bond can create parallel neutral current paths",
  "Check that all cabinet panels, the compressor mount, and any low-voltage transformer chassis are actually bonded to the equipment ground, not just resting in contact with painted metal (paint is an insulator and defeats the bond)",
  "For gas equipment, confirm gas piping bonding per local code where required, and don't assume gas pipe serves as an electrical ground",
  "If a customer reports shocks or tingling from touching the cabinet, treat this as a grounding/bonding failure until proven otherwise — verify with a meter before dismissing it as static",
], safety:"A missing or broken equipment ground is a shock and fire hazard — do not leave equipment energized with a confirmed grounding fault.", confidence:"common" },

{ id:"s-control-relay-failure-modes", equipment:"Other", title:"General-purpose control relay failure modes", summary:"How to recognize the different ways a 24V control relay (fan relay, accessory relay, interposing relay) fails, beyond just \"replace it and see.\"", steps:[
  "Contacts welded/stuck closed: load stays energized even after the coil de-energizes — usually caused by repeated high-inrush switching or an oversized load for the contact rating; check for a chattering/arcing history before replacing",
  "Contacts pitted/high resistance: load runs weak, dim, or intermittently — check voltage drop across the closed contacts under load; a healthy relay should show near-zero drop",
  "Coil open or shorted: relay never pulls in (open coil, no click) or pulls in but the transformer sags/fuse blows (shorted coil) — ohm the coil and compare to a known-good spec or a fresh relay",
  "Mechanical failure: relay clicks (coil energizes audibly) but contacts don't actually transfer — armature binding, broken return spring, or a cracked contact arm are common causes, especially in relays exposed to dust or moisture",
  "Chattering: unstable coil voltage (dirty/loose low-voltage connection, transformer overload, or marginal C-wire voltage) causing the relay to pull in and drop out rapidly — fix the voltage stability, not just the relay",
  "When replacing, match contact form (NO/NC/SPDT/DPDT) and coil voltage exactly — a relay with the wrong contact arrangement can appear to work initially but fail to perform the interlock/safety function it was installed for",
], safety:"Verify a relay is de-energized before probing contacts directly — some circuits keep contacts live even with the coil unpowered depending on wiring.", confidence:"common" },

{ id:"s-time-delay-relay-testing", equipment:"Other", title:"Testing a time-delay relay", summary:"Confirming whether a time-delay relay (used for compressor short-cycle protection, fan-off delay, or staged starts) is actually timing correctly rather than just passing or failing power.", steps:[
  "Identify the delay type: delay-on-make (waits after power applied before closing), delay-on-break (stays closed for a period after power is removed), or interval timers — confirm which behavior the application expects before testing",
  "Power the relay and time the actual delay with a stopwatch against its rated/adjustable setting — a relay that closes instantly (no delay) or never closes are both failures, but point to different problems (stuck contacts vs. failed timing circuit)",
  "If the relay is adjustable, confirm the timing potentiometer/dip switches weren't bumped or set incorrectly during a prior service call — an unexpectedly long or short delay is often a setting, not a failed relay",
  "Check for a delay that drifts or is inconsistent between cycles — this points to a failing timing circuit (common on electromechanical/RC-timer designs) rather than a simple contact failure",
  "On compressor short-cycle protection relays specifically, verify the delay is long enough to prevent restart against high head pressure (several minutes is typical) — a delay that's too short defeats the purpose of the device even though it \"works\"",
  "Replace with a matching delay type and timing range — substituting a delay-on-break relay where delay-on-make is required (or vice versa) will pass a basic continuity test but behave wrong in the actual application",
], confidence:"common" },

{ id:"s-float-switch-types-testing", equipment:"Air Handler", title:"Float switch types — mechanical vs. electronic — and how to test them", summary:"Condensate safety switches come in different designs with different failure and test methods; testing the wrong way gives a false pass.", steps:[
  "Identify the type: mechanical float switches use a physical float ball/arm that tilts a mercury or snap-action contact; electronic switches use conductivity probes or an optical sensor to detect water presence",
  "Mechanical float test: manually lift/tilt the float to its trip position and confirm the circuit opens (normally-closed safety design) — a float that moves freely but doesn't break the circuit has a failed internal switch, not a float problem",
  "Electronic/conductivity probe test: introduce water (or a wet finger/rag) to bridge the probes and confirm the board or module registers the trip — a probe that's corroded or coated in biofilm can fail to sense water even when submerged",
  "Optical sensor test: submerge or cover the sensor per manufacturer method and confirm it trips — a dirty/scaled lens is a common false-negative cause on this type",
  "Check that the switch is wired to actually interrupt the call for cooling/heating (not just an indicator light) — some installs miswire the float as informational only, defeating the safety function",
  "After confirming the switch itself works, verify it's mounted at the correct point (primary pan, secondary pan, or auxiliary drain pan per local code) so it actually catches an overflow before water damage occurs, not after",
], safety:"A float switch is a safety device against water damage, not a nuisance — never bypass/jumper a tripped float switch without first clearing the actual drain restriction.", confidence:"common" },

{ id:"s-hp-thermostat-lockout-balance-point-generic", equipment:"Condenser/Heat Pump", title:"Heat pump thermostat compressor lockout and balance point settings (generic reference)", summary:"Most heat pump-capable thermostats have configurable compressor lockout and balance point/backup-heat settings that are easy to leave at a default that doesn't match the installed equipment or climate.", steps:[
  "Locate the installer/equipment settings menu (not the homeowner schedule menu) — compressor lockout and balance point settings are typically buried under an installer or advanced settings section",
  "Confirm compressor lockout temperature (the outdoor temp below which the thermostat stops calling for the compressor and shifts to backup heat only) matches the equipment's actual rated low-ambient operating range — a lockout set too high wastes the heat pump's capacity; set too low without matching equipment capability leaves the house cold",
  "Confirm balance point / staging settings (the outdoor temp where backup heat is allowed to assist or take over) are actually configured, not left at factory default — factory defaults are often too conservative or too aggressive for the specific climate and equipment pairing",
  "Verify the auxiliary/backup heat lockout temperature (if separately configurable) is set so backup heat isn't locked out below a point where it's actually needed on the coldest design days",
  "Cross-check these settings against the equipment's actual capacity/performance data if available, and against what was agreed with the customer, rather than assuming the installer set it correctly",
  "Re-verify these settings any time a thermostat is replaced or reset — this is one of the most common \"heat pump doesn't work as well after we changed thermostats\" callbacks",
], confidence:"common" },

{ id:"s-thermostat-schedule-occupancy-conflict", equipment:"Other", title:"Programmable schedule conflicting with an occupancy/motion sensor", summary:"A thermostat with both a programmed schedule and occupancy-based smart setback can produce confusing, seemingly random temperature swings when the two features fight each other.", steps:[
  "Confirm the thermostat actually has an occupancy/smart-setback feature enabled (built-in motion sensor, or linked to a separate occupancy/geofencing sensor) in addition to the programmed schedule",
  "Check which feature has priority in the thermostat's logic — many units let occupancy override the schedule temporarily (or vice versa), and the customer may not realize both are active",
  "Walk through a specific complaint (\"it changed temperature when nobody touched it\") against the actual schedule times and occupancy sensor activity log if the thermostat stores one",
  "Check occupancy sensor placement and sensitivity — a sensor that's triggered by a pet, HVAC airflow, or a hallway with no real occupancy causes false \"someone's home\" overrides",
  "If the two features are producing conflicting results the customer doesn't want, simplify: disable one (usually occupancy-based setback) and rely on the fixed schedule alone, or vice versa, rather than trying to tune both simultaneously",
  "Document what was changed — a customer that reports \"it used to work fine\" often had one feature enabled by an app update or a helpful family member without realizing the interaction",
], confidence:"common" },

{ id:"s-thermostat-sensor-calibration-procedure", equipment:"Other", title:"Thermostat temperature sensor calibration procedure (reference)", summary:"General procedure for checking and correcting a thermostat's internal temperature reading against a known-accurate reference, applicable across most thermostat brands.", steps:[
  "Place a calibrated reference thermometer (or a second known-accurate thermometer) next to the thermostat, out of direct sun/drafts, and let both stabilize for at least 15-20 minutes",
  "Compare the thermostat's displayed temperature to the reference — most thermostats have an accuracy spec of roughly ±1°F from the factory; a larger deviation suggests either a real calibration offset or a placement issue (draft, sun, nearby heat source) rather than a broken sensor",
  "Look for a calibration/offset menu (often under installer or advanced settings) — most thermostats allow a manual offset adjustment rather than true recalibration of the sensor itself",
  "Apply the smallest offset needed to match the reference, and re-verify after 15-20 minutes rather than guessing and moving on",
  "If the deviation is large (several degrees) or drifts inconsistently over time, suspect a failing internal sensor rather than a simple offset issue — this generally means thermostat replacement, since the sensor isn't a separately serviceable part on most models",
  "Rule out placement problems first (thermostat on an exterior wall, near a supply register, in direct sun, above a heat-generating appliance) — these mimic a calibration problem but no offset setting will fully fix a genuinely bad location",
], confidence:"common" },

{ id:"s-zone-board-relay-failure", equipment:"Other", title:"Zone control board relay failures", summary:"The zone board's onboard relays (one per zone, controlling dampers and/or staging equipment) fail independently of the dampers or thermostats they control.", steps:[
  "Isolate whether the fault is the zone board relay or the damper/equipment it controls by checking for 24V output at the relay's terminal when that zone calls — voltage present but the damper doesn't move points downstream; no voltage output points to the board relay itself",
  "Listen/feel for the relay clicking on the board when a zone call starts and stops — a relay that doesn't click at all (no audible/tactile transfer) has likely failed mechanically or the board isn't receiving the call",
  "Check for a relay that's welded closed — that zone's damper stays open (or equipment stays energized) even with no active call, which can look like a \"stuck damper\" complaint that's actually a board problem",
  "Inspect for heat discoloration or a burnt smell at individual relay positions on the board — overloading a single zone relay (e.g., driving more damper motors than it's rated for) causes localized relay failure while the rest of the board works fine",
  "If only one zone out of several is misbehaving and the damper/actuator tests good in isolation (jump 24V directly to it), the failure is very likely the corresponding board relay or its output circuit, not the whole panel",
  "When replacing a zone board, verify total connected damper motor load against the new board's per-zone and total VA/current rating — undersized boards fail the same way the transformer does when oversubscribed",
], safety:"De-energize the zone panel before probing relay terminals directly; some boards have line-voltage equipment relays on the same panel as low-voltage zone relays.", confidence:"common" },

{ id:"s-zone-damper-types-butterfly-opposed", equipment:"Other", title:"Damper types — butterfly vs. opposed-blade — and their typical failure modes", summary:"Round butterfly dampers and rectangular opposed-blade dampers used in residential/light-commercial zoning fail in different, recognizable ways.", steps:[
  "Identify the damper type in the duct: butterfly dampers are a single round plate on a shaft inside round duct; opposed-blade dampers are a set of parallel blades in a rectangular frame, usually in a plenum or larger rectangular trunk",
  "Butterfly damper failure modes: shaft seal/bushing wear causing the blade to bind partway through rotation; actuator coupling (the plastic/metal clip connecting motor to shaft) stripping or slipping so the actuator runs but the blade doesn't fully move; blade warping from heat causing it to bind at one end of travel",
  "Opposed-blade damper failure modes: linkage arm disconnecting or bending so blades move out of sync with each other (some open while others stay shut, causing partial/uneven airflow rather than fully open or closed); actuator crank arm loosening on the shaft so it slips without moving the blades; blade edge seals degrading over time causing air leakage in the \"closed\" position even when the actuator is functioning correctly",
  "For either type, distinguish an actuator problem from a damper problem by disconnecting the actuator linkage and manually checking that the blade/plate itself moves freely through its full range — if it doesn't, the problem is mechanical (binding, corrosion, warping), not the motor",
  "Check actuator rotation direction and end-stop settings after any replacement — a butterfly or opposed-blade actuator installed rotated 90° or with end stops set wrong will drive against a mechanical stop, straining the coupling and causing a repeat failure",
  "On older systems, check for a damper that's mechanically fine but leaking excessive air in the closed position (opposed-blade especially) — this shows up as a zone that's \"a little warm/cool even when closed\" rather than a hard failure",
], confidence:"common" },

{ id:"s-zone-sensor-remote-placement", equipment:"Other", title:"Zone/remote sensor placement issues causing bad zoning performance", summary:"Zoning system remote temperature sensors that are physically well-installed but placed badly are a very common source of complaints that look like a control or damper problem.", steps:[
  "Confirm which sensor is actually controlling each zone — some zoning systems let you choose between the zone thermostat's built-in sensor and a separate remote sensor, or average multiple sensors; verify the intended configuration matches what's actually assigned",
  "Check remote sensor location against the same rules as a thermostat: not in direct sun, not near a supply/return register, not on an exterior wall, not near a heat-generating appliance or electronics",
  "For zones with unusually high ceilings, open floor plans, or a sensor placed in an infrequently-used room, consider whether the sensor location represents the space the customer actually cares about — a technically correct install can still produce a complaint if the sensed area isn't representative",
  "If a zone consistently overshoots or undershoots setpoint while the damper/equipment tests fine, temporarily place a reference thermometer next to the remote sensor to confirm the sensor is reading accurately for its actual location before relocating anything",
  "Check for interference/range issues on wireless remote sensors — weak signal or a dead/low battery can cause a zone to fall back to a default/last-known reading instead of live data",
  "When relocating a sensor, re-verify zoning calibration/offset settings for that zone afterward — a sensor move can require the same offset re-check as a thermostat relocation",
], confidence:"common" },

{ id:"s-zoning-bypass-static-relief-adjustment", equipment:"Other", title:"Static-pressure-relief bypass damper adjustment procedure", summary:"Step-by-step approach to correctly setting a barometric/motorized bypass damper on a zoning system, since an incorrectly adjusted bypass is a common cause of both noise and equipment problems even on a properly sized system.", steps:[
  "Confirm the bypass is intended as a static-pressure relief path (routes excess supply air back to return when only a small zone is calling) and not being used as a substitute for correctly sized ductwork on every zone",
  "With the system running and only the smallest zone open, measure static pressure at the unit (or at a point specified by the manufacturer) and compare to the equipment's rated operating range",
  "On a barometric (weighted, self-adjusting) bypass, adjust the counterweight so the damper begins to open only as static pressure approaches the upper end of the acceptable range — a damper that opens too early bypasses excess air constantly and reduces delivered airflow/capacity to the calling zone",
  "On a motorized bypass tied to a duct static pressure sensor, verify the sensor's setpoint against the equipment's rated external static pressure, not an arbitrary guess",
  "Check for symptoms of a bypass that's undersized, stuck shut, or set to open too late: loud rushing/whistling air noise, high static pressure trips, or coil freezing when only one small zone is calling",
  "Check for symptoms of a bypass set to open too early or oversized: warm/cool air noticeably mixing back into the return, reduced capacity/comfort in the calling zone, and short-cycling on temperature-limit safeties from reduced airflow across the coil",
], confidence:"common" },

{ id:"s-minisplit-branch-box-troubleshoot", equipment:"Mini-Split", title:"Multi-zone branch box / distributor unit troubleshooting", summary:"Larger multi-zone mini-split and VRF-style systems route refrigerant through a branch box (refnet joint/distributor) between the outdoor unit and each indoor head — this box has its own solenoids and sensors that can fail independently of either unit.", steps:[
  "Identify whether the system uses a branch box/distributor at all (common on 3+ zone systems and light commercial multi-zone) versus simple line-set branching with no active components — troubleshooting differs significantly between the two",
  "If one zone has poor performance while others are fine, check the branch box solenoid valve serving that specific indoor unit's circuit — a solenoid that isn't fully opening/closing on command will starve or flood just that one zone regardless of the indoor head's own condition",
  "Listen/feel for the solenoid actually clicking and the corresponding line getting hot/cold appropriately when that zone calls — a solenoid that doesn't respond to command usually means a coil failure or a control signal issue from the outdoor unit, not a refrigerant problem",
  "Check branch box wiring harness connections to the outdoor unit — these harnesses see thermal cycling and vibration over years and are a common source of intermittent single-zone faults",
  "Verify branch box insulation is intact and not compressed/missing at fittings — condensation and heat loss at an uninsulated branch box connection can mimic a refrigerant charge or performance problem",
  "Cross-reference any branch-box-specific fault code against the manufacturer's code list before assuming the fault is at the indoor or outdoor unit — branch box faults are often coded separately from unit faults",
], confidence:"common" },

{ id:"s-minisplit-builtin-condensate-pump-fail", equipment:"Mini-Split", title:"Mini-split built-in condensate pump failure", summary:"Many wall-mount and ducted mini-split indoor units have a small built-in condensate lift pump rather than a gravity drain, and its failure modes are different from a standalone external pump.", steps:[
  "Confirm the unit actually has a built-in pump (common where the drain must lift up and over to an exterior wall penetration) versus a gravity-only drain — check the install/service manual if unsure",
  "Listen for the pump cycling on a call for cooling/dehumidification — a built-in pump that never runs when water is present in the pan usually means a failed pump motor or a tripped internal float safety",
  "Check for the unit shutting down on a float-switch fault code specifically tied to the condensate pump/pan, which points to the pump (or its float) rather than a drain line clog",
  "If the pump runs but doesn't move water, check the small-diameter discharge tubing for a kink, clog, or a high point that traps air and airlocks the pump — these pumps move very little water and are sensitive to tubing routing",
  "Check the pan and pump intake screen (if equipped) for algae/debris buildup — these pumps have small passages that clog more easily than a standard condensate pump",
  "When testing, pour water into the pan slowly and confirm the pump activates at the correct level and fully empties the pan — a pump that runs constantly at low water level, or never shuts off, usually indicates a failed internal float/level sensor",
], confidence:"common" },

{ id:"s-minisplit-lineset-insulation-condensation", equipment:"Mini-Split", title:"Refrigerant line set insulation/vapor barrier failure causing condensation damage", summary:"Sweating line sets and resulting drywall, insulation, or exterior wall damage on a mini-split are almost always an insulation or vapor barrier defect, not a refrigerant charge problem.", steps:[
  "Inspect the full accessible length of line set insulation for gaps, especially at the flare connections near both indoor and outdoor units, where installers often leave the fittings uninsulated for future service access",
  "Check for insulation that has slid, shrunk, or split open over time (UV exposure on outdoor sections, or age-related shrinkage) exposing bare copper — this causes condensation at exactly that spot even if the rest of the line set is fine",
  "Where the line set passes through a wall, attic, or other unconditioned space, confirm a proper vapor barrier/seal was used at the penetration — moist indoor or attic air reaching bare or poorly-sealed cold line set condenses and can migrate into wall cavities or ceilings, showing up as a stain far from the actual defect",
  "Check for insulation that's the wrong wall thickness for the climate/application — thin foam insulation adequate in a dry climate can still sweat in high-humidity conditions",
  "Confirm insulation is continuous through any line set cover/channel system, not just at the exposed sections — covers can hide a gap that's actively condensing and causing hidden damage",
  "Repair by fully re-insulating with correctly sized, sealed (taped or glued seams) closed-cell insulation rather than just patching the visible section — an isolated patch often just relocates where the sweating shows up next",
], confidence:"common" },

{ id:"s-minisplit-wall-sleeve-sealing", equipment:"Mini-Split", title:"Wall sleeve / penetration sealing issues on a mini-split", summary:"The wall sleeve that carries line set, condensate, and wiring through the exterior wall is a common source of water intrusion, insect entry, and energy loss complaints unrelated to the mini-split's actual performance.", steps:[
  "Inspect the exterior wall sleeve/penetration for a proper weatherproof seal around its full circumference — a sleeve that's just pushed through a hole without sealant or a proper escutcheon plate lets wind-driven rain track inside along the line set",
  "Check that the sleeve is angled slightly downward toward the exterior (or the penetration is otherwise designed to shed water outward) — a level or inward-sloping penetration lets water pool and migrate indoors",
  "Confirm the line set, condensate tubing, and control wiring inside the sleeve are bundled/sealed where they exit, since gaps around individual conductors/tubes inside an otherwise-sealed sleeve are a common overlooked leak path",
  "Check for insect/rodent entry at the sleeve, especially if it's an older foam or unsealed type — pests following the warm line set into the wall cavity is a recurring complaint that traces back to sleeve sealing",
  "For complaints of a draft or energy loss near the indoor unit, check whether the wall sleeve/penetration itself is the source rather than the indoor unit's fit against the wall",
  "Reseal with an exterior-rated sealant compatible with the sleeve material, and verify the escutcheon/cover plate on both interior and exterior sides is fully seated, not just cosmetically placed over a gap",
], confidence:"common" },

{ id:"s-minisplit-short-lineset-shortcycle", equipment:"Mini-Split", title:"Outdoor unit short-cycles on a very short line set", summary:"Mini-splits installed with an unusually short line set (indoor and outdoor units close together) can short-cycle or trip on pressure faults due to insufficient refrigerant volume/line length for the system's control logic to stabilize.", steps:[
  "Check the line set length against the manufacturer's minimum length spec, not just the maximum — most mini-splits have a published minimum line set length, and running shorter than that is a real, if less commonly checked, install defect",
  "If below minimum length, confirm whether the manufacturer requires an additional charge adjustment, an accessory (like extra line length coiled to meet minimum), or explicitly does not support the shorter run for that model",
  "Watch the actual fault pattern: rapid pressure swings, short-cycling shortly after startup, or EEV/expansion valve hunting are consistent with a line set too short for the system's charge and control algorithm to settle",
  "Rule out a simple overcharge first (an overly short line set with factory pre-charge intended for a longer run is functionally similar to overcharging) — check subcooling/superheat and compare against an adjusted charge for the actual shorter length if the manufacturer provides a de-rate table",
  "If no official minimum-length guidance exists for the model, consult the manufacturer's technical support rather than guessing at a charge adjustment — undercharging a mini-split on a short run is also a real risk if refrigerant is arbitrarily removed",
  "Where practical on future installs, plan line set routing to stay above the published minimum, even if it means adding a small amount of unnecessary length, rather than running the shortest physically possible path",
], confidence:"verify" },

{ id:"s-minisplit-swing-louver-motor", equipment:"Mini-Split", title:"Indoor unit swing louver won't move or motor failure", summary:"The horizontal/vertical swing louver on a ductless indoor head is a small stepper motor and linkage that fails independently of the main blower and refrigerant system.", steps:[
  "Confirm the complaint is specifically the louver (airflow direction won't change/swing) and not the blower itself — the unit can blow air normally with a completely dead louver motor, so don't assume a bigger fault",
  "Power cycle the unit and watch the louver's homing routine at startup — most units drive the louver to a reference/home position on power-up; a louver that doesn't move at all during this routine points to the motor or its linkage rather than a settings issue",
  "Check for a louver that's physically obstructed or bent, or a linkage arm/clip that has popped off the motor shaft — manually (power off) move the louver through its range checking for binding or a disconnected link",
  "If the motor hums or twitches but doesn't move the louver, suspect a stripped gear in the small stepper motor gearbox — this is a wear item on units with heavy cycling and is typically a motor assembly replacement, not a repair",
  "Check for a fault code specific to the swing/louver motor before condemning it — some units flag this as a distinct, non-critical fault that still allows normal heating/cooling operation",
  "When replacing, confirm the correct motor/linkage part for that specific louver (horizontal vs. vertical, left vs. right on dual-louver models) since they are frequently not interchangeable between positions",
], confidence:"common" },

{ id:"s-vrf-system-basics", equipment:"Other", title:"VRF (variable refrigerant flow) system basics — how it differs from a standard multi-zone mini-split", summary:"Reference for understanding what makes a true VRF system distinct from a residential multi-zone mini-split before troubleshooting it the same way.", steps:[
  "Recognize scale and control differences: VRF systems are typically light-commercial/commercial, support many more indoor units per outdoor unit (often dozens), and use more sophisticated variable-speed compressor and EEV control to modulate refrigerant flow to each zone independently based on real-time load",
  "Understand simultaneous heating and cooling: heat-recovery VRF systems can have some indoor units heating while others cool at the same time by routing refrigerant through a dedicated branch selector/BS unit per zone — a standard residential multi-zone mini-split cannot do this, it's all-heat or all-cool system-wide",
  "Identify the branch selector (BS) unit if present — this is the component that determines whether a given indoor unit gets high-pressure (heating) or low-pressure (cooling) refrigerant in a heat-recovery system, and it has its own solenoids/sensors that can fault independently of any indoor or outdoor unit",
  "Expect a more complex communication network — VRF systems typically use a dedicated proprietary bus (sometimes with centralized controllers, gateways, and building automation integration) rather than the simpler point-to-point communication on a residential multi-zone system",
  "Recognize that VRF diagnostic and service procedures are significantly more manufacturer/model-specific than residential mini-splits due to the added components (branch selectors, oil recovery cycles, more complex refrigerant piping design rules) — treat this entry as orientation only and refer to the specific manufacturer's VRF service documentation for actual fault diagnosis",
  "Before troubleshooting, confirm with the customer/plans whether the installed system is genuinely VRF or simply a larger residential multi-zone mini-split marketed with similar terminology — this changes which manual and which failure patterns actually apply",
], confidence:"verify" },

{ id:"s-surge-protector-hvac-interaction", equipment:"Other", title:"Whole-home surge protector interaction with HVAC equipment", summary:"A whole-home surge protective device (SPD) at the main panel can occasionally interact with HVAC equipment in ways worth checking before assuming the SPD is unrelated to a new electrical complaint.", steps:[
  "Confirm whether a whole-home SPD was recently installed or replaced around the time an HVAC electrical issue started — timing correlation is the first clue",
  "Check that the SPD is correctly installed on a dedicated breaker of the correct rating and properly bonded to ground — an improperly grounded or loose SPD connection can itself introduce voltage noise onto the panel rather than suppressing it",
  "If the SPD has a failure indicator light/status, check it — a surge protector that has absorbed a significant event and is now degraded or failed-open no longer protects downstream equipment and should be reported to the customer/electrician",
  "Rule out the SPD as an unrelated coincidence by checking equipment supply voltage quality directly at the HVAC disconnect with a meter (or recording meter for intermittent issues) — a genuinely faulty SPD is a less common cause than normal utility voltage variation or an equipment-side problem",
  "For equipment with its own dedicated surge protection device (sold separately for the condenser/air handler), confirm it isn't in a failed/sacrificed state itself after a surge event — these are typically wired in series with the equipment and can fail open, cutting power entirely",
  "This is primarily an electrical/panel-level component — coordinate with a licensed electrician for SPD installation, wiring, or grounding issues outside the HVAC scope",
], safety:"Do not open or service a panel-mounted SPD unless qualified and the panel is properly de-energized — these devices can retain a hazardous charge.", confidence:"verify" },

{ id:"s-static-shock-sensation-vs-real-fault", equipment:"Other", title:"Customer reports static shock sensation — distinguishing static discharge from a real electrical fault", summary:"A \"shock\" complaint touching a thermostat, register, or metal duct is often ordinary static discharge from low indoor humidity, not an electrical fault — but it must be ruled out with a meter, not assumed.", steps:[
  "Get specifics from the customer: does the shock happen only after walking across carpet, only in dry winter conditions, and only as a brief single spark on first touch — these are hallmarks of ordinary static discharge, not an electrical fault",
  "Regardless of how it sounds, verify with a meter before dismissing it — check for voltage between the suspect metal surface (register, duct, unit cabinet, thermostat plate) and a known good ground; any measurable voltage under load-off conditions warrants full grounding/bonding investigation, not a static explanation",
  "If confirmed as static: check indoor relative humidity (very low humidity in winter heating season dramatically increases static buildup) and note that this is a comfort/humidity issue, not an HVAC electrical fault — a whole-home humidifier or portable humidification can reduce the effect",
  "Check for ungrounded/unbonded metal ductwork or unit cabinets, since poor bonding lets static charge accumulate on isolated metal sections and discharge more noticeably when touched — this is a bonding fix even though the underlying cause is static, not a live fault",
  "If the shock sensation happens repeatedly, is stronger than a typical static spark, or happens without the carpet/dry-air pattern, treat it as a genuine electrical safety complaint and perform the full ground/bonding verification procedure rather than assuming static",
  "Document which explanation applies for the customer — conflating ordinary static shock with a wiring fault (or vice versa) either causes unnecessary alarm or misses a real hazard",
], safety:"Never assume a shock complaint is \"just static\" without confirming with a meter first — treat every report as a potential real fault until ruled out.", confidence:"common" },

{ id:"s-commbus-shielded-vs-unshielded", equipment:"Other", title:"Shielded vs. unshielded communication cable issues (generic reference)", summary:"Communicating thermostats and zoning systems often specify shielded cable for the data bus; using unshielded thermostat wire, or shielded cable with the shield mishandled, causes intermittent communication faults.", steps:[
  "Confirm what the specific communicating system actually requires — many call for a shielded twisted pair specifically for the communication conductors, even when the rest of the low-voltage wiring (R, C, power) can be standard unshielded thermostat cable",
  "If unshielded standard thermostat cable was used for the communication pair where shielded was required, this is a likely root cause of intermittent, hard-to-reproduce comm errors, especially in homes with nearby line-voltage wiring, dimmers, or other EMI sources",
  "Check that the cable shield (drain wire) is landed correctly if shielded cable is used — shields are almost always grounded at one end only per the manufacturer's instructions; grounding both ends can create a ground loop that induces noise rather than rejecting it",
  "Inspect for a shield that was cut back and taped off but never actually connected anywhere — this provides no EMI protection even though the correct cable was used",
  "Where communication wiring runs parallel to line-voltage wiring for any distance, maintain separation per code/manufacturer guidance, or use shielded cable for that section regardless of the rest of the run",
  "When in doubt on a specific communicating system's requirement, replace with an appropriately rated shielded cable for the communication pair rather than assuming standard thermostat wire will work reliably long-term",
], confidence:"common" },

{ id:"s-commbus-termination-polarity", equipment:"Other", title:"Proper termination and polarity on 2-wire communicating systems (generic reference)", summary:"Two-wire communicating HVAC systems are polarity-sensitive and sometimes require end-of-line termination; getting either wrong causes communication faults that look like a bad board or bad wire.", steps:[
  "Verify wiring polarity at every connection point (indoor unit, outdoor unit, thermostat/zone panel) — reversed polarity on a 2-wire comm pair is one of the most common causes of \"no communication\" faults on a system that otherwise wired and installed correctly",
  "Check whether the specific system requires end-of-line termination (a resistor or dip switch setting at the last device on the bus) — systems that do and are left unterminated, or that have termination enabled at more than one point, both cause communication instability",
  "If multiple devices are daisy-chained on the same 2-wire bus, confirm the wiring is genuinely a chain (each device's terminals passed through to the next) and not accidentally a star/home-run topology if the system doesn't support that configuration",
  "Check for any splice or additional connection point in the run — many communicating systems are sensitive to added junctions/splices on the bus and specify a maximum number of connection points or total wire length",
  "Use a meter to confirm actual DC bias or signal levels on the bus match the manufacturer's expected range where documented, rather than only checking for physical continuity — a bus can be continuous and still be malfunctioning due to bad bias/termination",
  "After correcting polarity or termination, power-cycle the full system (not just the thermostat) since some communicating boards latch a fault status until a full reset",
], confidence:"common" },

{ id:"s-commbus-emi-rfi-interference", equipment:"Other", title:"EMI/RFI interference sources near communication wiring (VFDs, generators, solar inverters)", summary:"Intermittent, unexplained communication faults on a system that tests fine wire-by-wire are sometimes caused by electromagnetic interference from nearby electrical equipment rather than a wiring or component defect.", steps:[
  "Identify potential EMI/RFI sources near the communication wire run or equipment location: variable frequency drives (VFDs) on other equipment, standby generators, solar inverters, large motors, dimmer switches, or fluorescent/LED drivers with poor power quality",
  "Note the timing pattern of the complaint — faults that correlate with a specific nearby device turning on/off (a well pump VFD cycling, a generator running, solar inverter operating at peak sun) point strongly to EMI rather than a wiring defect",
  "Check the physical routing of communication wiring relative to suspected EMI sources — wiring run parallel to and close to VFD output leads, inverter conductors, or generator wiring is especially susceptible; even a properly shielded cable has limits if routed too close",
  "Where possible, increase physical separation between communication wiring and the suspected EMI source, or reroute away from parallel runs with line-voltage/VFD/inverter cabling",
  "If rerouting isn't practical, confirm shielded cable is used with correct single-end grounding (see the shielded cable entry) as this specifically helps reject EMI that unshielded cable will not",
  "For solar inverters and VFDs specifically, note that some units have adjustable switching frequency or built-in EMI filtering — coordinating with the installer of that equipment on filtering or output reactor options may resolve the interference at the source when re-routing/shielding alone isn't enough",
], confidence:"common" },

{ id:"s-generator-power-hvac-issues", equipment:"Other", title:"HVAC equipment behaves oddly running on a home backup generator", summary:"Standby and portable generators can produce lower-quality power (frequency and voltage variation) than utility service, causing HVAC symptoms that don't occur on normal grid power.", steps:[
  "Confirm the complaint specifically correlates with generator operation (during an outage or generator test) versus happening on normal utility power as well — this distinguishes a generator power quality issue from an unrelated equipment fault",
  "Check that the generator is properly sized for the HVAC equipment's starting (LRA) and running load, in addition to the rest of the home's connected load — an undersized generator sags voltage and/or frequency hard on compressor or motor startup, which can trip protective controls or prevent starting altogether",
  "Note that motor speed and some control timing is frequency-dependent — a generator running off-frequency (not held tightly at 60Hz, common on lower-quality or aging portable units) can cause ECM/variable-speed motors, communicating boards, or soft-start/inverter-driven compressors to behave erratically even with voltage in range",
  "Check actual voltage and, if a meter capable of it is available, frequency at the equipment while running on generator power, and compare against the equipment's rated tolerance",
  "For equipment with a soft-start device or inverter-driven (variable-speed) compressor, be aware these are often more sensitive to generator power quality than a standard PSC compressor system — confirm with the manufacturer whether the specific equipment is generator-compatible and if any restrictions apply",
  "If problems only occur on generator power and the generator itself checks out per its own specifications, the practical fix is often ensuring adequate generator sizing/quality for the connected HVAC load, or sequencing so the HVAC equipment isn't trying to start simultaneously with other large loads on transfer",
], confidence:"common" },

{ id:"s-solar-inverter-hvac-interaction", equipment:"Other", title:"HVAC equipment behaving oddly with a home solar inverter system", summary:"A less common but real electrical power-quality interaction — grid-tied or hybrid solar inverters can introduce harmonic distortion or switching noise that affects sensitive HVAC electronics, especially variable-speed/inverter-driven equipment.", steps:[
  "Confirm the correlation: does the HVAC symptom happen specifically during active solar production hours (mid-day, sunny conditions) or change when the inverter is switched off/isolated for a test, versus happening at night or on cloudy days as well",
  "Check whether the HVAC equipment is inverter-driven/variable-speed or has sensitive communicating electronics — this type of equipment is more susceptible to power quality issues from a solar inverter than a simple PSC/single-speed system",
  "Measure voltage at the HVAC equipment during active solar production and compare to nominal/rated tolerance — some inverter installations, especially with long wire runs back to the panel or undersized conductors, can push voltage toward the high end of utility tolerance during peak production",
  "If a power quality meter capable of harmonic analysis is available, check for excessive total harmonic distortion (THD) on the circuit feeding the HVAC equipment during solar production versus during non-production hours",
  "Check physical proximity and wiring routing between solar inverter conductors/communication wiring and any HVAC communication or control wiring, since inverter switching noise can couple onto nearby low-voltage wiring similar to a VFD (see the EMI/RFI entry)",
  "This is a specialized interaction — if confirmed, coordinate with the solar installer, since inverter settings, filtering, or wiring changes are outside standard HVAC scope; document specific measured evidence (not just timing correlation) before pursuing this as the cause",
], confidence:"verify" },

{ id:"s-transformer-parallel-backfeed-48v", equipment:"Other", title:"Two 24V transformers paralleled/backfeeding — creating an unintended ~48V condition", summary:"On systems with more than one 24V transformer (e.g., furnace/air handler plus a separate zoning or accessory transformer), miswiring that ties both secondaries together in series rather than in parallel produces roughly double voltage and damages connected controls.", steps:[
  "Suspect this specifically on multi-transformer systems (zone panel, humidifier, or accessory transformer in addition to the main equipment transformer) where a board, thermostat, or relay has failed shortly after a new accessory or transformer was added",
  "Check for a wiring mistake where the common (C) of one transformer isn't actually tied to the common of the other, or where a component's isolated secondary got bridged into the main system's common circuit — this can put the two transformers' secondaries in series rather than parallel, adding their voltages",
  "Measure actual voltage at suspect terminal blocks before assuming a fixed 24V — a reading noticeably higher than 24V (approaching double) with two transformers involved confirms a backfeed/series condition rather than a simple overvoltage from the utility side",
  "Verify manufacturer guidance on whether the equipment's transformer is isolated or must remain isolated from any additional accessory transformer — some accessory devices (certain zone panels, some humidifier controls) require their own isolated, non-common-referenced transformer specifically to prevent this kind of interaction",
  "Correct by ensuring all transformer commons that are supposed to be shared are properly tied together at one point, and that any transformer meant to be isolated is actually kept isolated per its documentation — don't simply add jumpers to make voltage readings look normal without understanding the circuit",
  "After correcting the wiring, check every 24V-powered component (thermostat, relays, valves, sensors) that was in circuit during the overvoltage condition — components exposed to roughly double voltage may have been damaged even if they appear to still function",
], safety:"An unintended ~48V condition on control wiring rated for 24V can damage components and, in some wiring configurations, create an unexpected shock hazard on what techs normally treat as low-risk low-voltage wiring — verify voltage with a meter before touching bare terminals.", confidence:"common" },

{ id:"s-terminal-block-corrosion-intermittent", equipment:"Other", title:"Low-voltage terminal block corrosion causing intermittent faults", summary:"Green/white corrosion buildup at thermostat or board terminal blocks creates high-resistance connections that cause faults which come and go with temperature, humidity, or vibration.", steps:[
  "Inspect all low-voltage terminal connections (thermostat back-plate, board terminal strips, wire nuts at splices) for green/white corrosion (copper oxide/verdigris) on the wire or terminal screw, especially in humid basements, crawlspaces, or coastal environments",
  "Recognize the symptom pattern: corrosion causes a high-resistance connection that can pass a basic continuity/voltage check while under no load, but fails intermittently under actual current draw or as resistance changes with temperature and humidity",
  "Check for a terminal that's discolored, or a wire that pulls out of its terminal with unusually little force — corrosion weakens the mechanical grip in addition to adding resistance",
  "Clean corroded terminals and conductors thoroughly (wire brush or fine sandpaper on the conductor, contact cleaner on terminal screws) and re-torque, rather than just re-landing the wire as-is on top of corrosion",
  "If corrosion recurs quickly in a known-damp location, address the moisture source (sealing a crawlspace, correcting a drain leak dripping near the board) rather than just re-cleaning terminals repeatedly on future visits",
  "For chronic damp environments, consider corrosion-inhibiting terminal treatment or relocating the board/terminal block to a drier location if feasible, since repeated cleaning is only a temporary fix",
], confidence:"common" },

{ id:"s-disconnect-aluminum-copper-connection", equipment:"Other", title:"Aluminum-to-copper connections at the disconnect overheating", summary:"Where aluminum feeder or whip conductors land directly on a copper lug or splice to copper equipment leads without proper preparation, galvanic corrosion and thermal expansion mismatch cause overheating and eventual failure.", steps:[
  "Identify aluminum conductors by their dull gray color and larger diameter for a given ampacity compared to copper — common on some disconnect whips and older service feeders",
  "Confirm any aluminum-to-copper connection uses a connector/lug that is specifically rated for dissimilar metals (marked AL/CU or CO/ALR) — a connector rated copper-only is not sufficient for a direct aluminum landing and will fail prematurely",
  "Check for the presence of an appropriate antioxidant joint compound on aluminum connections where required by the connector/manufacturer instructions — its absence accelerates oxidation and resistive heating at the joint",
  "Look for discoloration, pitting, or a lug that shows heat damage/melted insulation specifically at an aluminum termination — this is the classic sign of a connection that has been resistively heating over time from oxidation or an under-torqued/improperly rated splice",
  "Re-torque aluminum connections to the connector manufacturer's spec — aluminum cold-flows under pressure over time and connections that were correctly torqued at install can loosen years later even without any error, requiring periodic re-torque as routine maintenance in some jurisdictions",
  "If a direct AL-CU connection wasn't made with a properly rated connector, correct it rather than just cleaning and re-landing — repeated overheating at an improperly rated joint will recur regardless of how well it's cleaned",
], safety:"Aluminum connection failures are a recognized fire risk — treat any heat-damaged aluminum termination as needing correction, not just cosmetic cleanup, and de-energize before servicing.", confidence:"common" },

{ id:"s-linevoltage-phase-polarity-240v", equipment:"Condenser/Heat Pump", title:"Verifying L1/L2 line voltage and connections on 240V single-phase equipment", summary:"Reference procedure for confirming correct line voltage supply and connections on standard 240V single-phase residential HVAC equipment (most compressors, most electric heat strips).", steps:[
  "Measure L1 to L2 at the disconnect — should read approximately 240V (or 208V on some multifamily/commercial services); confirm this matches the equipment's rated voltage window before proceeding further",
  "Measure L1 to ground and L2 to ground separately — on a standard split-phase 240V single-phase service, each leg should read roughly half of the L1-L2 reading; a reading that's badly unbalanced between the two legs relative to ground can indicate a service-side or grounding problem worth flagging to an electrician",
  "Confirm both legs are actually present and loaded — a single blown fuse, a partially open disconnect blade, or one failed pole on a contactor can leave the equipment \"single-phased\" (only one of the two legs energized), which often lets a compressor hum and try to start without actually running",
  "Check voltage under load (equipment actually trying to run) as well as with it idle — a connection that reads fine unloaded but sags significantly under load points to a loose or corroded connection somewhere upstream, not a supply problem",
  "Verify polarity/leg identification only matters for equipment that specifically requires it (some control transformers reference one leg) — most straight 240V single-phase compressor and heat strip loads are not polarity-sensitive between L1 and L2 themselves",
  "If voltage is present and balanced at the disconnect but wrong or missing at the equipment's own terminals, trace the whip/internal wiring between the two points rather than assuming the supply itself is at fault",
], safety:"Line voltage measurements involve exposed energized conductors — use properly rated meter leads and PPE, and treat every measurement as live until confirmed otherwise.", confidence:"common" },

{ id:"s-elec-megger-insulation-resistance-test", equipment:"Other", title:"Megohmmeter (insulation resistance) test for suspect grounded wiring or windings", summary:"A megger test checks the quality of insulation itself (resistance to ground under a higher test voltage) which catches early-stage insulation breakdown that a standard ohmmeter continuity check on windings can miss.", steps:[
  "Understand the difference from a standard ohm-out: a normal meter checks winding-to-winding resistance and continuity; a megohmmeter applies a higher DC test voltage between a winding/conductor and ground to measure insulation resistance in megohms, revealing insulation that's degraded but not yet fully shorted",
  "Disconnect the component being tested from the rest of the circuit (motor leads, compressor terminals, or a length of wiring) — a megger test must isolate the item under test or it will give a false/misleading reading through parallel paths",
  "Select an appropriate test voltage for the equipment being tested per the megger's and equipment manufacturer's guidance — using too high a test voltage on delicate electronics or low-voltage-rated wiring can damage it",
  "Test each winding/conductor to ground and record the reading — insulation resistance in the very low megohm range (or near zero) indicates degraded/failing insulation even if a standard ohmmeter still shows the winding itself as intact and not fully grounded",
  "On a motor or compressor, a reading that's dropped significantly compared to a known baseline (if available from a prior test) indicates progressive insulation breakdown, often from moisture intrusion or overheating, even before it causes an outright ground fault trip",
  "Use this test especially on equipment with a history of repeated breaker trips or intermittent ground faults where a standard ohm check came back inconclusive, and on motors suspected of moisture damage (flooded equipment, roof units with water intrusion)",
], safety:"Megohmmeters output higher test voltages than a standard multimeter — never touch test leads or the equipment under test while a megger test is in progress, and discharge the equipment after testing before handling.", confidence:"common" },

{ id:"s-relay-contact-form-mismatch", equipment:"Other", title:"Wrong relay contact form (NO/NC/SPDT/DPDT) installed during replacement", summary:"A replacement relay that looks physically similar but has the wrong contact arrangement can appear to work in a quick bench test while failing to perform its actual safety or control function in the installed circuit.", steps:[
  "Before removing the old relay, identify and record its exact contact configuration: normally-open (NO) vs. normally-closed (NC), and single-pole vs. double-pole (SPDT/DPDT), along with coil voltage",
  "Understand why this matters beyond \"does it click\": a relay wired for a fail-safe function (e.g., a safety that should de-energize equipment on loss of control power) needs the correct NO/NC arrangement to actually fail safely — a mismatched contact form can fail in the wrong direction under a real fault",
  "When sourcing a replacement, match contact form and coil voltage/current rating exactly, not just physical socket/base compatibility — many relay bases accept multiple internal contact configurations that look identical from outside the socket",
  "After installing a replacement, verify actual behavior in the real circuit (not just a bench click test): confirm the controlled load energizes and de-energizes at the correct point in the sequence, and specifically test that any safety interlock function still fails to the safe state when the coil is de-energized",
  "If the original relay's markings are unreadable or missing, use a meter to determine contact state via continuity with the coil de-energized before ordering a replacement, rather than guessing from what \"seems right\"",
  "Flag and correct any relay found in the field with an incorrect contact form for its application, even if it's \"been working\" — a fail-unsafe configuration on a safety interlock is a real risk even if it hasn't caused a problem yet",
], safety:"An incorrectly configured safety interlock relay may fail to shut equipment down during an actual fault condition — verify fail-safe behavior explicitly, don't assume it from normal operation.", confidence:"common" },

{ id:"s-solidstate-vs-electromechanical-relay", equipment:"Other", title:"Solid-state relay vs. electromechanical relay — different failure signatures", summary:"Solid-state relays (SSRs) and traditional electromechanical relays fail in recognizably different ways, and misidentifying which type is installed leads to the wrong diagnostic approach.", steps:[
  "Identify the type: electromechanical relays have visible/audible mechanical contacts that click; solid-state relays use a semiconductor switching device (typically a triac or similar) with no moving parts and no click, often in a small sealed module with an LED status indicator",
  "Electromechanical relay failures are typically mechanical/contact-related: welded contacts, pitted/high-resistance contacts, or a coil failure — these often show physical evidence (arcing marks, a stuck armature) on inspection",
  "Solid-state relay failures are typically electrical/thermal: a shorted output (load stays energized even with the control signal removed, similar in symptom to a welded contact but with no mechanical cause) or an open output (load never energizes despite a good control signal) — there's usually no visible mechanical evidence, so diagnosis relies on signal and voltage measurement rather than inspection",
  "Check for adequate heat sinking on SSRs carrying significant current — unlike electromechanical relays, solid-state relays generate meaningful heat across their output junction and are prone to premature failure if under-heat-sinked or mounted in a high-ambient location, which won't be obvious just from looking at the part",
  "When a load stays energized with no apparent control signal present, check whether the relay is solid-state before condemning it as \"stuck\" — a shorted SSR output produces the identical symptom to a welded electromechanical contact but is diagnosed and replaced differently (no cleaning/freeing a stuck contact is possible on an SSR)",
  "When replacing, match not just voltage/current rating but also load type (resistive vs. inductive) if specified — SSRs in particular can be rated differently for these and an undersized SSR for an inductive load (like a solenoid or small motor) fails prematurely",
], confidence:"common" },

{ id:"s-hp-outdoor-temp-sensor-staging", equipment:"Condenser/Heat Pump", title:"Outdoor air temperature sensor failure causing incorrect heat pump/aux staging", summary:"Many heat pump systems use a dedicated outdoor air temperature sensor (separate from the thermostat) to drive staging, defrost, and aux-heat lockout decisions — a failed or miswired sensor causes staging that looks wrong even though the thermostat settings themselves are correct.", steps:[
  "Locate the outdoor air temperature sensor (often mounted on the outdoor unit itself or on an exterior wall) and confirm it's the component actually feeding the staging/lockout logic, separate from any temperature setting programmed into the thermostat",
  "Check the sensor's actual reading against a real outdoor thermometer at the same location — a sensor reading significantly off (exposed to direct sun, mounted too close to the condenser's own heat/cold discharge, or simply failed) will drive incorrect staging decisions even with correct thermostat settings",
  "Ohm-check or otherwise verify the sensor against manufacturer resistance-vs-temperature spec if a table is available, rather than relying on the displayed reading alone, since a board can sometimes still display a plausible-but-wrong value from a degraded sensor",
  "Inspect the sensor's wiring and connector for corrosion or a poor connection — an intermittent connection here causes staging that seems to work sometimes and not others, which is easy to misattribute to a \"flaky board\"",
  "Confirm sensor mounting location is representative of actual outdoor conditions (not in direct sun, not shielded in a way that traps heat, not right next to the condenser discharge air) since a mechanically fine sensor in a bad location produces the same practical symptom as a failed one",
  "After replacing or relocating a faulty sensor, re-verify that balance point/lockout settings driven by it now produce the expected staging behavior across a range of actual outdoor conditions, not just a single spot check",
], confidence:"common" },

{ id:"s-thermostat-firmware-update-stuck", equipment:"Other", title:"Thermostat stuck mid firmware update or lost configuration after an update", summary:"Smart thermostats that auto-update firmware can occasionally hang mid-update or reset installer/equipment configuration settings afterward, producing symptoms that look like a hardware failure or a wiring problem.", steps:[
  "Check the thermostat display for an explicit update-in-progress indicator (progress bar, update icon, or a message) before assuming a blank/frozen screen is a hardware fault",
  "If genuinely stuck (no progress for an extended period, well beyond the update's normal expected duration), follow the manufacturer's recommended recovery method — this is often a specific button-hold reset or a power cycle at the equipment breaker, not a generic hard reset that could wipe programming",
  "After any firmware update completes, re-verify installer/equipment-side settings (equipment type, staging configuration, C-wire/power settings, heat pump balance point and lockout settings) — some updates have been known to reset or alter these rather than only updating user-facing features",
  "Check the schedule and any smart/occupancy features specifically, since these are commonly reported as reset or reconfigured after an update even when the core heating/cooling function keeps working",
  "If the thermostat lost network connectivity during the update, it may need to be manually reconnected to Wi-Fi/the cloud account afterward rather than resuming automatically",
  "Document the firmware version before and after if the issue recurs, and check the manufacturer's release notes/known issues for that specific version before spending significant time re-diagnosing what may be a known update bug",
], confidence:"common" },

{ id:"s-zoning-panel-zone-count-config", equipment:"Other", title:"Zone panel configured for the wrong number of zones after a board replacement", summary:"A replacement zone control board that isn't configured for the actual number of installed zones will misbehave in ways that look like wiring or damper problems on the zones beyond the configured count.", steps:[
  "After any zone board replacement, explicitly check/set the number of zones configuration (dip switches, jumper, or menu setting depending on the panel) against the actual number of physical zones installed — boards often default to a different zone count out of the box",
  "If zones beyond the configured count are unresponsive while the first N zones work fine, check zone count configuration before troubleshooting those \"extra\" zones as a wiring or damper fault — this is a very common oversight after a board swap",
  "Verify each physical zone's thermostat/sensor is actually mapped to the correct zone number on the new board — a zone that's wired correctly but assigned to the wrong zone number on the panel will control the wrong damper or appear completely unresponsive for its intended zone",
  "Re-check any equipment-type or staging configuration on the zone board itself (not just zone count) since a full board replacement resets all configuration to factory default, not just the zone count setting",
  "Run through a full functional test of every zone individually after reconfiguring — confirm each zone's damper actually opens/closes and each zone's thermostat actually generates a call recognized by the correct zone input",
  "Label or document the final zone number-to-physical-location mapping for future service visits, since this is easy to lose track of on multi-zone systems, especially after a board replacement changes default numbering",
], confidence:"common" },

{ id:"s-minisplit-multizone-oversubscribed", equipment:"Mini-Split", title:"Multi-zone mini-split connected capacity exceeds the outdoor unit's combination ratio", summary:"Multi-zone outdoor units have a maximum combined indoor unit capacity (combination ratio), and a system with indoor units added or upsized beyond that ratio will underperform across all zones, not just the newest one.", steps:[
  "Add up the total rated capacity of all connected indoor units and compare against the outdoor unit's rated maximum combination capacity (often expressed as a percentage, e.g., total indoor capacity can exceed 100% of outdoor rated capacity up to a specified limit, but not without limit)",
  "Suspect oversubscription specifically when a system that performed fine originally starts showing reduced capacity across multiple/all zones after an indoor unit was added, replaced with a larger size, or a previously unused zone started being used regularly",
  "Check that the number of connected indoor units doesn't exceed the outdoor unit's maximum supported branch count, separate from the capacity/VA calculation — some systems limit by port count independent of total capacity",
  "Confirm this is a system-wide capacity problem (all zones somewhat under-delivering, especially when several run simultaneously) rather than a single-zone fault, which points toward a different cause (indoor unit or branch-specific issue)",
  "If oversubscribed, the practical fix is right-sizing: removing/relocating a zone to a different outdoor unit, or replacing the outdoor unit with one rated for the actual total connected indoor capacity — there generally isn't a control setting that resolves genuine oversubscription",
  "When quoting or planning any addition of an indoor unit to an existing multi-zone outdoor unit, verify the combination ratio math before installation, not after the customer complains of reduced performance",
], confidence:"common" },

{ id:"s-minisplit-wallsleeve-drain-slope", equipment:"Mini-Split", title:"Indoor unit drain pan overflow from improper wall sleeve or line set slope", summary:"A gravity-drained mini-split indoor unit relies on correct slope through the wall sleeve and line set run to the exterior; a level or reverse-sloped run causes condensate to back up into the unit even with a completely clear drain line.", steps:[
  "Confirm the drain method is gravity (no built-in pump) before assuming a slope problem — pumped units have different failure modes (see the built-in condensate pump entry)",
  "Check the slope of the condensate line from the indoor unit, through the wall sleeve, to its exterior termination — it needs continuous downward pitch with no level or uphill sections; even a short flat or reverse-pitched section can trap water and back the pan up over time",
  "Inspect specifically at the wall sleeve penetration itself, since this is a common point where the drain line gets kinked or pushed slightly uphill during installation, especially if the sleeve angle wasn't set correctly to begin with",
  "Rule out a simple clog first (clear and flush the line) since this is more common than a slope defect, but if the pan refills and overflows again shortly after clearing with no clog found, suspect slope rather than repeatedly re-clearing a line that isn't actually blocked",
  "Confirm exterior termination height is actually below the indoor unit's drain outlet — a termination point that's too high relative to the indoor pan can prevent gravity drainage even with correct pitch along the visible run",
  "If slope can't be corrected within the existing sleeve/routing, the fix is usually adding a condensate pump rather than fighting an unworkable gravity slope — don't repeatedly re-service a fundamentally mis-sloped gravity run",
], confidence:"common" },

{ id:"s-minisplit-branchbox-distribution-imbalance", equipment:"Mini-Split", title:"Branch box refrigerant distribution imbalance between zones", summary:"On multi-zone systems with a refrigerant branch box, uneven performance between zones that all test individually fine can be caused by distribution imbalance at the branch box itself rather than any single indoor or outdoor unit component.", steps:[
  "Confirm each individual indoor unit tests acceptably on its own (airflow, EEV operation, sensors) before suspecting the branch box — distribution imbalance specifically shows up as inconsistent performance across zones despite each zone checking out individually",
  "Check operating pressures and line temperatures leaving the branch box toward each zone under a simultaneous multi-zone call — a branch box not distributing refrigerant evenly will show one or more circuits running notably different subcooling/superheat than the others under the same overall system charge",
  "Inspect the branch box's internal distributor/orifice components (where accessible per manufacturer service documentation) for one circuit that's restricted compared to the others — debris or a manufacturing defect in one specific branch is possible even when the rest of the system is clean",
  "Verify the branch box is mounted level and per the manufacturer's orientation requirements — some distributor designs are orientation-sensitive and an improperly mounted box can distribute unevenly by design, not by defect",
  "Confirm overall system charge is correct before chasing an imbalance — an incorrect total charge can produce distribution-like symptoms across zones that resolve once the base charge is corrected",
  "If imbalance persists with confirmed correct charge, level mounting, and clean individual indoor units, treat the branch box itself as the suspect component and consult manufacturer service procedures specific to that box rather than continuing to service the indoor/outdoor units individually",
], confidence:"verify" },

{ id:"s-neutral-ground-bond-subpanel", equipment:"Other", title:"Neutral-ground bonding errors at a sub-panel feeding HVAC equipment", summary:"A sub-panel with neutral and ground incorrectly bonded together (rather than only at the main service panel) can cause nuisance GFCI/AFCI trips, stray voltage on equipment cabinets, and confusing intermittent electrical faults on HVAC equipment fed from it.", steps:[
  "Identify whether the panel feeding the HVAC equipment is the main service panel or a sub-panel — this determines whether neutral and ground should be bonded together (main panel, at the main bonding jumper) or kept separate (sub-panel, with an isolated neutral bus and separate ground bus)",
  "Check for a bonding screw/strap installed in a sub-panel where it shouldn't be — this incorrectly ties neutral and ground together downstream of the main bond, creating a parallel path for neutral current to flow on the grounding system",
  "Recognize the symptom pattern this causes: nuisance GFCI/AFCI trips on circuits sharing that panel, measurable voltage between neutral and ground that shouldn't be there, or a customer reporting mild tingling from equipment cabinets fed from the sub-panel",
  "Measure voltage between the neutral bus and ground bus in the sub-panel with the main breaker on and normal loads running — any significant reading in a properly isolated sub-panel points to this bonding error or a shared/miswired neutral",
  "This is fundamentally an electrical panel issue outside typical HVAC scope — flag it clearly for a licensed electrician rather than attempting to correct panel bonding as part of HVAC service, but recognize it as a possible root cause when HVAC-side troubleshooting keeps coming up clean",
  "After the panel bonding is corrected by a qualified electrician, re-verify the HVAC equipment's own grounding/bonding is intact, since equipment exposed to a period of improper neutral-ground bonding is worth a full ground/bonding recheck",
], safety:"Improper neutral-ground bonding is a shock hazard and is outside standard HVAC service scope — do not attempt to add or remove bonding jumpers in an electrical panel; refer to a licensed electrician.", confidence:"common" },

{ id:"s-commbus-daisychain-homerun-topology", equipment:"Other", title:"Daisy-chain vs. home-run wiring topology mistakes on communicating systems (generic reference)", summary:"Communicating HVAC systems specify a required wiring topology (daisy-chain vs. home-run/star) for the data bus, and using the wrong one — even with correct polarity and wire gauge — causes unreliable communication.", steps:[
  "Determine which topology the specific communicating system requires: daisy-chain (each device wired in series to the next, passing the bus straight through) or home-run/star (each device wired individually back to a central hub/panel) — check the manufacturer's install documentation rather than assuming",
  "Inspect the actual as-built wiring against the required topology — a common install error is wiring a system designed for daisy-chain as a star (multiple devices home-run back to one point) or vice versa, which can pass a basic continuity check but cause bus reflection/signal integrity problems",
  "Watch for symptoms consistent with a topology mismatch: communication that works with fewer devices active but degrades or drops out as more zones/thermostats are added to the bus, since signal integrity problems often get worse with more branch points or longer combined wire length",
  "Check total bus length and number of connection points against the manufacturer's maximum specification for the required topology — even correctly topology-matched wiring can fail communication if it exceeds documented length or device-count limits",
  "If a mid-bus splice or junction was added for convenience during installation (rather than routing through each device's pass-through terminals as designed), treat this as a likely topology violation even if wired with good intentions",
  "Correct by rewiring to match the required topology exactly rather than trying to compensate with cable quality or termination changes — topology mismatches are a wiring architecture problem, not something termination or shielding alone will fix",
], confidence:"common" },

{ id:"s-zone-damper-actuator-spring-vs-powered", equipment:"Other", title:"Zone damper actuator types — spring-return vs. powered-open/powered-closed — failure differences", summary:"Zone damper actuators use different failure-position designs (spring-return to a fail-safe position vs. powered in both directions), and misdiagnosing which type is installed leads to wrong conclusions about what a \"stuck\" damper failure means.", steps:[
  "Identify the actuator type before diagnosing a stuck damper: spring-return actuators are powered to drive one direction (commonly open) and use an internal spring to return to the other position when power is removed; powered-open/powered-closed (two-position or modulating) actuators are driven electrically in both directions with no spring return",
  "On a spring-return actuator, a damper stuck in its spring position with no power applied is normal/expected behavior — confirm actual power is present at the actuator during a call before concluding the actuator itself has failed",
  "On a spring-return actuator, a damper that won't move to the powered position despite confirmed voltage at the actuator points to a failed motor or a mechanically bound spring/gear train, not a wiring issue",
  "On a powered-open/powered-closed actuator, a damper stuck in one position regardless of which direction is called points to the actuator itself (motor or internal switch failure) rather than a control wiring problem, since there's no spring to explain a directional bias",
  "For either type, manually (power off) work the damper through its full range checking for mechanical binding at the blade/shaft level, separate from the actuator — a mechanically bound damper will stall a good actuator and can look like an actuator failure",
  "When replacing an actuator, match the fail-safe behavior intentionally, not just torque/voltage rating — swapping a spring-return actuator for a powered-both-directions type (or vice versa) changes what happens to that zone during a power loss or safety shutdown, which can matter for freeze protection or smoke/fire damper applications",
], confidence:"common" },

// ---------------- MAINTENANCE / COMMISSIONING / FIELD PRACTICE ----------------
// ---------------- PREVENTIVE MAINTENANCE FINDINGS ----------------
{ id:"s-maint-capacity-loss-seasonal-dirt", equipment:"Condenser/Heat Pump", title:"Annual maintenance finds reduced cooling capacity from a season's dirt buildup", summary:"Customer reports the system 'isn't as cold as it used to be' — often just accumulated dirt on the coil and airflow path since last service, not a new failure.", steps:[
  "Compare current temperature split/subcooling against what a clean, correctly charged system should produce before assuming a component failure",
  "Check the outdoor condenser coil for a season's worth of grass clippings, cottonwood fluff, or dust matted into the fins — wash from the inside out with a coil cleaner rated for the fin material",
  "Check the indoor filter and evaporator coil for the same gradual buildup, especially if the customer has been running a low-quality filter that lets dust through slowly over time",
  "Check the blower wheel for a light film of dust reducing delivered CFM even though the motor runs at the correct speed",
  "Recheck charge and airflow numbers after cleaning before concluding a refrigerant or component issue — most 'lost capacity' resolves with cleaning alone",
  "Document before/after readings for the customer — this shows the value of the maintenance visit rather than just saying it's fine",
], confidence:"common" },

{ id:"s-maint-condensate-algae-preventive", equipment:"Air Handler", title:"Condensate line algae buildup found before it becomes a full clog", summary:"Routine maintenance turns up slow-forming algae/biofilm in the condensate line that hasn't caused a leak yet but will if left alone.", steps:[
  "Look for a darkened, slimy coating inside the drain line or trap even though water is still draining — this is the early stage of what eventually becomes a full blockage",
  "Flush the line with a wet/dry vac from the outside termination and/or a condensate line cleaning tablet or diluted solution appropriate for the drain material",
  "Check the trap itself (if present) for a buildup collar right at the low point — this is usually where a future clog will actually form",
  "Recommend the customer treat the line with tablets or a mild solution on a schedule to slow regrowth",
  "Check that the float switch (if equipped) tests correctly so a future full clog trips the system off before it overflows instead of silently causing water damage",
  "Note the finding on the service ticket even though no active leak was present — this is a catch-it-before-it's-a-problem item worth documenting for the customer",
], confidence:"common" },

{ id:"s-maint-refrigerant-slow-leak-drift", equipment:"Condenser/Heat Pump", title:"Refrigerant charge has drifted low over several years from a very slow leak", summary:"System has no acute fault, but subcooling/superheat readings show the charge gradually trending down year over year — a slow leak rather than a sudden failure.", steps:[
  "Compare this year's charge readings against prior service records if available — a gradual downward trend across multiple visits is the signature of a slow leak, not measurement noise",
  "Leak search all fittings, the coil, and braze joints with an electronic leak detector even though there's no obvious oil staining — very slow leaks often show no visible residue",
  "Discuss the cost-benefit with the customer: topping off a slow leak is a temporary, repeat-need fix, while finding and repairing it (or replacing an old, corroded coil) is the actual repair",
  "If no leak point can be found despite a real charge deficit, consider that formicary/ant-nest corrosion in the evaporator coil produces pinhole leaks too small to detect without specialized methods and may require coil replacement",
  "Explain to the customer that a pound low over several years is a real leak, not refrigerant 'wearing out' — refrigerant does not degrade or get consumed by normal operation",
  "Evacuate and weigh in a full charge per the nameplate after any repair rather than just adding refrigerant to bring pressures back to where they were",
], safety:"Recover refrigerant per EPA 608 regs before opening the system.", confidence:"common" },

{ id:"s-maint-contactor-pitting-found", equipment:"Condenser/Heat Pump", title:"Maintenance visit finds a pitted/worn contactor that hasn't failed yet", summary:"Contactor is still functioning but shows visible pitting or burn marks — a proactive-replacement decision, not an active complaint.", steps:[
  "Inspect contact faces for pitting, carbon buildup, or a blackened/rough surface compared to a smooth new contact",
  "Check for a slight buzz, chatter, or hesitation on pull-in even if the unit ultimately starts fine — an early sign the contacts are starting to go",
  "Measure voltage drop across the closed contacts under load if possible — a noticeable drop indicates a failing contact even when the unit still runs",
  "Weigh proactive replacement against run-to-failure with the customer: a pitted contactor that welds shut can leave a compressor running with no way to shut off, while one that fails open just causes a no-run — this asymmetry is worth explaining when recommending replacement",
  "Check the coil voltage and confirm it's not a control-side issue (weak 24V, marginal transformer) causing the pull-in hesitation rather than the contacts themselves",
], confidence:"common" },

{ id:"s-maint-drain-pan-rust-preventive", equipment:"Air Handler", title:"Early rust or corrosion found on a drain pan before it's actually leaking", summary:"Maintenance inspection finds a pan with surface rust or a soft spot forming, with no active leak yet — worth flagging before it becomes a water-damage call.", steps:[
  "Inspect the primary (and secondary, if equipped) drain pan for rust spots, especially at seams, screw penetrations, and the low point around the drain fitting",
  "Press gently on any visibly rusted area to check for softness/give in the metal — a pan close to perforating often feels slightly spongy before it actually leaks",
  "Check that the pan is fully draining after each cycle and not holding standing water, which accelerates corrosion",
  "If a secondary drain pan or float switch isn't present under an attic or upper-floor unit, recommend adding one — the real liability if this pan fails is ceiling/floor damage, not just an HVAC repair",
  "Document the finding with a photo for the customer's records — a pan that's a year or two from failing is a legitimate proactive-replacement conversation, not upselling",
], confidence:"common" },

{ id:"s-maint-evap-coil-fin-damage-preventive", equipment:"Air Handler", title:"Evaporator coil fins found bent/matted, reducing capacity before airflow symptoms are obvious", summary:"Coil fins are crushed or matted with debris enough to measurably restrict airflow, even though the system still runs and cools to some degree.", steps:[
  "Inspect the coil face for bent-over fins (from a rough filter change or coil cleaning in the past) or a felted layer of dust/pet hair matting the fins together",
  "Comb bent fins back into alignment with a fin comb sized to the fin spacing — don't force it, damaged fins can tear",
  "Clean the coil per manufacturer guidance rather than just brushing the surface — matted debris is often deeper in the fin pack than it looks from the face",
  "Measure static pressure and/or temperature split before and after to quantify the improvement for the customer",
  "Recommend a filter/maintenance interval that actually matches the home's dust/pet load if this is a repeat finding, since fin matting is usually a filtration or interval problem, not a one-time event",
], confidence:"common" },

// ---------------- NEW CONSTRUCTION / COMMISSIONING ----------------
{ id:"s-newconstruction-load-mismatch-actual-vs-design", equipment:"Other", title:"New home — equipment feels undersized or oversized compared to the design load calc", summary:"System was sized off a Manual J load calculation but real-world performance doesn't match, either running constantly or short-cycling.", steps:[
  "Pull the original load calculation if available and check what assumptions were used (insulation levels, window specs, infiltration rate, occupancy) against how the home was actually built and is actually used",
  "If the system runs nearly constantly on design days, check for a true undersize: envelope changes during construction (upgraded windows removed, insulation substitutions), or a load calc that used unrealistic assumptions",
  "If the system short-cycles and struggles with humidity, check for oversizing — a common result of contractors rounding up 'to be safe' rather than sizing to the actual calculated load",
  "Verify duct design (CFM per room) actually matches the equipment's rated airflow — a correctly sized system paired with an undersized duct system will look like an equipment sizing problem",
  "Distinguish an equipment-sizing problem (requires replacement/redesign) from a duct or airflow problem (often correctable) before recommending anything to the customer or builder",
], confidence:"common" },

{ id:"s-newconstruction-duct-never-balanced", equipment:"Air Handler", title:"New construction — duct system installed but dampers/registers never balanced", summary:"Ductwork was installed and connected but no one adjusted balancing dampers or registers to even out airflow room to room before turnover.", steps:[
  "Check whether any balancing dampers exist in the duct system at all — some installs skip them entirely, which limits how much can be corrected without adding some",
  "If dampers exist, check their position — many are found still fully open or in the as-installed default rather than adjusted for actual room-by-room airflow",
  "Measure supply CFM at each register with a flow hood or the traverse method and compare against the design CFM for that room",
  "Adjust balancing dampers incrementally, starting from the rooms furthest from the air handler, and recheck after each adjustment since duct systems interact",
  "Set expectations with the customer that balancing is a normal post-occupancy step, not a defect — but confirm it was actually included in their contract/commissioning scope before treating it as free follow-up work",
], confidence:"common" },

{ id:"s-newconstruction-thermostat-installer-defaults", equipment:"Other", title:"New construction — thermostat still on installer/factory default settings", summary:"Thermostat was never configured for the actual equipment or the customer's preferences — still running factory defaults from the box.", steps:[
  "Check the equipment type configuration (single-stage vs. two-stage, heat pump vs. straight AC, aux heat setup) against what's actually installed — a mismatched setup is a common commissioning miss",
  "Check heat pump-specific defaults like defrost termination temperature, balance points, and aux heat lockout — these are almost always left at factory default unless someone specifically changes them, and defaults are rarely correct for every climate",
  "Check the swing/differential and fan settings against what actually suits the home rather than the factory default",
  "Check that the C-wire/power source and any humidity control settings were actually configured rather than left blank",
  "Walk the customer through their actual settings and preferences and set the thermostat to match, then document what was changed from default for future reference",
], confidence:"common" },

{ id:"s-newconstruction-startup-checklist-skipped", equipment:"Other", title:"New construction — startup/commissioning checklist items were skipped", summary:"A quick-reference of the commissioning steps that commonly get skipped under schedule pressure on new builds, causing 'random' problems down the road.", steps:[
  "Refrigerant charge verification: factory-precharged for a standard line set length, but rarely re-verified against actual measured line set length and subcooling/superheat after installation — check this first on any new system with unexplained performance issues",
  "Static pressure check: total external static pressure against the equipment's rated maximum is often never measured at startup — measure it now if it wasn't documented, since high static causes early-life airflow and comfort complaints",
  "Combustion analysis (gas equipment): initial CO/O2 readings and gas pressure are supposed to be checked at startup but are often skipped — perform this now if there's no record of it",
  "Duct leakage/balancing: confirm whether the duct system was pressure-tested and balanced, or only visually inspected",
  "Thermostat configuration: confirm equipment type, staging, and heat pump-specific settings were actually configured rather than left on default",
  "When multiple checklist items were skipped, treat the whole system as uncommissioned and work through a full startup checklist rather than chasing symptoms one at a time",
], confidence:"common" },

{ id:"s-newconstruction-combustion-analysis-skipped", equipment:"Gas Furnace", title:"New furnace never had an initial combustion analysis performed", summary:"No record exists of CO/O2 readings being taken at startup — a commissioning gap worth closing even if the furnace seems to run fine.", steps:[
  "Check for any startup documentation/sticker showing combustion readings — many installers skip this step or only do a visual flame check",
  "Perform a combustion analysis now: CO, O2, and stack temperature at high fire (and low fire on a two-stage/modulating unit), with the analyzer probe placed per the manufacturer's test port location",
  "Compare readings against the manufacturer's acceptable range, not generic numbers — every furnace model has its own spec",
  "Check gas manifold pressure against the rating plate at the same time, since incorrect pressure is a common root cause of readings landing out of range",
  "If readings are outside acceptable range, treat it as a real combustion problem to correct (burner adjustment, gas pressure, venting) rather than just documenting it and moving on",
], safety:"Elevated CO readings on an otherwise 'working' furnace are still a real hazard — don't dismiss them because the furnace seems to run normally.", confidence:"common" },

{ id:"s-newconstruction-refrigerant-charge-not-verified-startup", equipment:"Condenser/Heat Pump", title:"New install — refrigerant charge was never verified against actual line set length", summary:"Outdoor unit shipped factory-precharged for a standard line set, but the actual installed line set length/elevation was never used to adjust the charge at startup.", steps:[
  "Check the actual installed line set length and elevation change against the length the factory charge accounts for (commonly a fixed length printed on the unit or in the install manual)",
  "If the line set is longer or shorter than the factory-charged length, or has a significant elevation change, the charge needs to be adjusted accordingly per the manufacturer's charging chart — this is a standard step that's easy to skip when the crew is moving fast",
  "Verify actual subcooling/superheat against target rather than assuming the factory charge is correct just because the system runs and cools somewhat",
  "Check for signs of a rushed startup: no gauges ever connected, no vacuum documentation, charge added or removed without weighing — all suggest the charge was never actually verified",
  "Correct the charge properly (recover, evacuate, weigh in per the chart) rather than just topping off toward better-looking gauge numbers",
], confidence:"common" },

{ id:"s-newconstruction-duct-leakage-not-tested", equipment:"Air Handler", title:"New construction — duct system was never pressure-tested for leakage", summary:"Ductwork was installed and passed a rough visual inspection but was never actually tested for leakage before drywall/insulation covered it up.", steps:[
  "Check for any duct leakage test documentation (required in many jurisdictions for new construction) — if none exists, the system's actual leakage rate is unknown",
  "Look for accessible signs of leakage even without a formal test: disconnected boots at the register, unsealed can-lights or chases used as return paths, visible gaps at plenum connections",
  "If leakage is suspected and rooms are now inaccessible behind finished surfaces, focus on what's still reachable — attic and crawlspace runs, the equipment closet, and any exposed trunk line",
  "Seal accessible leaks with mastic or UL-181 rated tape rather than standard cloth duct tape, which fails over time",
  "If leakage into an unconditioned space is significant and can't be fully corrected after the fact, document it for the builder/customer as an ongoing efficiency and comfort issue rather than something the HVAC contractor can fully resolve post-drywall",
], confidence:"common" },

// ---------------- COMFORT COMPLAINTS THAT AREN'T EQUIPMENT FAULTS ----------------
{ id:"s-comfort-stratification-twostory", equipment:"Other", title:"Upstairs hot, downstairs cold (or vice versa) in a two-story home", summary:"A common comfort complaint in two-story homes that's usually a physics/design issue, not an equipment malfunction.", steps:[
  "Confirm this is a temperature-difference-between-floors complaint rather than one specific room, which points toward stratification/zoning rather than a duct balancing issue in a single area",
  "Explain the basic cause to the customer if appropriate: warm air naturally rises (stack effect), so upstairs runs warmer in cooling season and can run cooler in heating season if heat rises away from a single return",
  "Check whether the system is zoned or single-zone with one thermostat — a single thermostat (usually on the main floor) can only satisfy the level it's located on, leaving the other floor over- or under-conditioned",
  "Check return air distribution — a home with only main-floor returns and no upstairs return exaggerates stratification significantly",
  "If not already zoned, discuss realistic options with the customer: a zoning system, a ceiling fan strategy, supply damper adjustments, or accepting some difference as normal for the home's design — this is often not something duct balancing alone fully solves",
], confidence:"common" },

{ id:"s-comfort-roomtoroom-duct-design", equipment:"Air Handler", title:"One or two rooms are consistently warmer/cooler than the rest of the house", summary:"A persistent room-to-room temperature difference that traces back to duct sizing/layout rather than an equipment fault.", steps:[
  "Measure supply CFM at the problem room's register(s) and compare against a well-performing room of similar size — a real shortfall points to duct design, not the equipment",
  "Check duct run length and number of fittings/turns to that room — a long run with several 90-degree turns delivers less CFM than the same-size duct run straight to a nearer room, even with an identical register",
  "Check for undersized duct or flex duct that's been pulled taut vs. properly supported, or that's overly long for its diameter",
  "Check the room's exposure (west-facing with lots of glass, over a garage, end of the house) — some rooms need more capacity than a standard duct design gives them regardless of airflow being 'correct' on paper",
  "If duct modification isn't practical, discuss a booster fan, a dedicated small zone, or a mini-split for that specific room as realistic options rather than implying the main system is broken",
], confidence:"common" },

{ id:"s-comfort-humidity-oversized-shortcycle", equipment:"Condenser/Heat Pump", title:"Home feels humid/clammy even though the AC is correctly cooling to setpoint", summary:"An oversized (or borderline-oversized) system satisfies the thermostat quickly but doesn't run long enough per cycle to remove much moisture — a sizing/runtime issue, not a malfunction.", steps:[
  "Confirm the complaint is humidity/clamminess rather than temperature — the thermostat is satisfying normally and the space reads at setpoint",
  "Check cycle length — short run times (a few minutes on, satisfied, off again) mean the coil never gets cold and wet long enough to condense much moisture, even though it's cooling the air fine",
  "Check equipment sizing against the actual cooling load — an oversized system is the most common cause of this exact pattern, especially after a 'bigger is safer' replacement",
  "Rule out an actual equipment problem first: verify charge and airflow are correct, since low airflow can look similar but is a different fix",
  "Discuss realistic options with the customer: a lower cooling setpoint won't fix it (short cycling gets worse, not better), so the real options are a dehumidification-capable/variable-speed system, a standalone dehumidifier, or in some cases a smaller replacement system sized closer to the actual load",
], confidence:"common" },

{ id:"s-comfort-single-zone-multistory-thermostat-limitation", equipment:"Other", title:"Single thermostat can't keep the whole multi-story house comfortable", summary:"Customer expects even comfort throughout a multi-level home from one thermostat, but a single unzoned system with one sensor can only respond to conditions where the thermostat is located.", steps:[
  "Confirm there's only one thermostat/sensor controlling the whole system — this by itself explains most 'some rooms are always off' complaints in larger or multi-story homes",
  "Check where the thermostat is physically located relative to the complaint areas — a thermostat on a shaded wall behaves very differently than one near a sunny stairwell",
  "Explain that this is a fundamental limitation of single-zone control, not a fault to repair — the system does exactly what a single sensor tells it to do",
  "Present realistic options: a ducted zoning system with additional dampers and sensors, a thermostat with remote sensor averaging (many smart thermostats support this), or supplemental equipment (mini-split, additional zone) for problem areas",
  "Avoid implying a simple thermostat swap or airflow tweak will solve what is really a system-design limitation — set expectations before any work is proposed",
], confidence:"common" },

{ id:"s-comfort-drafts-perceived-as-temp-problem", equipment:"Other", title:"Customer reports a room is 'cold' but the thermostat and duct readings check out fine", summary:"A perceived temperature complaint that's actually air movement/drafts from the building envelope, not an HVAC delivery problem.", steps:[
  "Measure actual room temperature with a separate thermometer at multiple points (including near exterior walls/windows) — a room that's genuinely at setpoint but still 'feels cold' points away from an airflow issue",
  "Check for drafts at windows, exterior doors, electrical outlets on exterior walls, and recessed lighting — air movement makes a room feel colder than its actual temperature",
  "Check supply register location — a register blowing directly across a seating area or bed can make occupants feel a draft even when the air itself is at a normal temperature",
  "Confirm duct CFM and supply air temperature at that room's register are actually within normal range before ruling out an HVAC-side cause entirely",
  "If the envelope is the real cause, explain this clearly to the customer — sealing/insulation work, not HVAC adjustment, is the actual fix, and recommend they follow up with a qualified insulation/weatherization contractor",
], confidence:"common" },

// ---------------- ODOR COMPLAINTS ----------------
{ id:"s-odor-newequipment-chemical-smell", equipment:"Other", title:"New equipment has a chemical/plastic smell on first run", summary:"Brand-new furnace, air handler, or condenser gives off a noticeable chemical/plastic odor for the first several hours to days of operation — normal off-gassing, not a fault.", steps:[
  "Confirm the equipment is genuinely new/recently installed and this is the first run, not an established system suddenly developing a new smell",
  "Explain to the customer that manufacturing residues (protective coatings, adhesives, insulation materials, paint) commonly off-gas during the first hours of operation as components heat up for the first time — this is normal and typically fades within a few days of run time",
  "Increase ventilation during this period if the customer is sensitive to it — running the fan with a window cracked helps it dissipate faster",
  "Distinguish this from a genuine burning/electrical smell: the new-equipment odor is a mild plastic/chemical smell that gradually fades, not an acrid burning smell that persists or worsens — if it worsens or smells electrical, treat it as a burning-smell complaint instead",
  "Follow up with the customer after a few days of run time to confirm it has faded as expected before closing out any related concern",
], confidence:"common" },

{ id:"s-odor-pet-circulating", equipment:"Air Handler", title:"Pet odor circulating through the house whenever the system runs", summary:"Household pet odor gets picked up by the return air and distributed through supply registers, making it seem worse or more widespread than it actually is at the source.", steps:[
  "Confirm the odor is noticeably stronger at supply registers or right when the blower kicks on — this points to the system circulating/redistributing the odor rather than causing it",
  "Check the filter and return grille for embedded pet hair and dander buildup — this is often the actual source being blown back into the airspace rather than filtered out",
  "Check the evaporator coil for pet hair/dander accumulation, since a damp coil with organic material on it can develop its own musty smell",
  "Recommend a filter upgrade appropriate for pet households (higher dander-rated filter, changed more frequently) rather than assuming a duct or equipment problem",
  "If odor is severe and long-standing, discuss duct cleaning as a possibility, but set expectations that duct cleaning addresses accumulated material, not the ongoing source — the odor will return without a filtration/cleaning routine",
], confidence:"common" },

{ id:"s-odor-tobacco-residue-ductwork", equipment:"Air Handler", title:"Tobacco smoke odor persists from ductwork in a previously smoked-in home", summary:"A now smoke-free home (new owners, former smoker quit) still has a lingering tobacco odor that gets worse when the system runs, from residue coated inside the ductwork and on the coil.", steps:[
  "Confirm the odor intensifies when the blower runs and is present at supply registers — this points to contamination inside the duct system/equipment rather than surfaces in the room",
  "Explain to the customer that tobacco residue coats interior duct surfaces, the coil, and the blower housing over years and continues off-gassing odor long after smoking has stopped — carpet and drywall cleaning alone won't resolve an HVAC-circulated odor",
  "Check the filter and evaporator coil for a visible brownish/yellow film consistent with tobacco residue",
  "Recommend professional duct cleaning as the realistic fix for ductwork, and coil cleaning for the equipment side — this is a more involved job than a routine cleaning given the extent of residue in long-term smoking situations",
  "Set expectations that severe, years-long buildup may require sealing/encapsulating duct interiors or in some cases duct replacement if cleaning doesn't fully resolve it — scope and quote this as its own job, not bundled into a service call",
], confidence:"common" },

{ id:"s-odor-sewer-gas-ptrap", equipment:"Other", title:"Sewer gas smell blamed on the HVAC system — often a dry P-trap, not an HVAC issue", summary:"A rotten-egg/sewer odor near a supply register or return is frequently a dried-out plumbing P-trap pulling sewer gas into the space, not an HVAC fault at all.", steps:[
  "Ask when the odor is noticed and whether it correlates with the blower running, or is just generally present in one area of the house — a true HVAC-circulated odor tends to track with air movement, while a P-trap issue is usually localized to one drain/fixture",
  "Check for infrequently used fixtures nearby (floor drains, guest bathroom sinks/tubs, a laundry standpipe, a condensate drain with its own trap) — a P-trap that hasn't had water run through it in a while dries out and stops blocking sewer gas",
  "Run water down any suspect drain for a minute to refill the trap and recheck the odor after it clears — this confirms a dry trap rather than an HVAC source",
  "Check the equipment's own condensate drain trap too, since it's plumbing-adjacent and can dry out and act the same way if the system has been off for an extended period",
  "If refilling the trap resolves the smell, explain to the customer this is a plumbing item (may need a trap primer or more frequent use of that fixture) rather than something to keep chasing on the HVAC side",
], confidence:"common" },

// ---------------- ADDITIONAL SAFETY-CRITICAL SCENARIOS ----------------
{ id:"s-safety-asbestos-suspect-material", equipment:"Other", title:"Suspected asbestos-containing material found during a duct or furnace job", summary:"Older home (commonly pre-1980s) turns up material that looks like it could be asbestos — old duct wrap, tape, floor tile near equipment, or vermiculite insulation — during a service or install call.", steps:[
  "Stop work in that area immediately — do not cut, drill, sand, or otherwise disturb material you suspect may contain asbestos",
  "Common suspect locations on HVAC jobs: old furnace duct wrap/tape, panel gaskets on older equipment, floor tile or mastic near the equipment, and vermiculite attic insulation near ductwork",
  "Do not attempt to test, remove, or dispose of the material yourself — this generally requires licensed abatement testing and handling, not a standard HVAC service call",
  "Inform the customer of what was found and why work is being paused, and recommend they contact a licensed asbestos testing/abatement professional before the job proceeds",
  "Document what was found (photos, location) for the customer's records and for your own file before leaving the job paused",
  "Resume HVAC work only in areas confirmed clear of the material, or after professional abatement has cleared the specific work area",
], safety:"Asbestos fibers are a serious inhalation hazard when disturbed. When in doubt, treat the material as suspect and stop — the cost of a false alarm is far lower than the cost of disturbing actual asbestos.", confidence:"common" },

{ id:"s-safety-knob-tube-aluminum-wiring", equipment:"Other", title:"Knob-and-tube or aluminum wiring encountered at a thermostat or equipment electrical connection", summary:"Older home wiring methods that require extra care and sometimes a different repair path than modern copper/NM wiring.", steps:[
  "Identify what you're looking at: knob-and-tube is individual insulated conductors run through ceramic knobs/tubes with no ground; aluminum branch wiring (common in some 1960s-70s homes) is a solid dull-gray conductor, distinct from copper",
  "For knob-and-tube feeding an HVAC circuit: treat the insulation as brittle and fragile regardless of apparent condition — avoid flexing or disturbing it more than necessary, and don't simply splice modern equipment onto it without evaluating whether the circuit is even adequate for the load",
  "For aluminum wiring: do not directly splice or terminate aluminum conductors with devices/connectors rated for copper only — use connectors and anti-oxidant compound specifically listed for copper-aluminum connections, or recommend a qualified electrician make the transition",
  "Check for prior signs of trouble at existing aluminum connections — discoloration, heat damage, or loose terminals are common failure points and a sign the circuit needs electrical attention beyond the HVAC scope",
  "If the existing wiring/circuit isn't adequate or safe for the new equipment's load, don't proceed with a marginal connection — recommend the customer have an electrician upgrade the circuit first",
  "Document what was found and communicate clearly to the customer that this is beyond standard HVAC electrical work and needs a licensed electrician's involvement",
], safety:"Aluminum branch wiring and knob-and-tube systems have known fire-risk histories when improperly connected or overloaded. When the wiring itself is in question, don't make the connection — refer out.", confidence:"common" },

{ id:"s-safety-illegal-unpermitted-install-found", equipment:"Other", title:"Discovering an apparent illegal/unpermitted prior HVAC installation", summary:"A service call turns up equipment or ductwork installed in a way that looks unpermitted or doesn't meet basic code (improper venting, missing disconnect, gas piping without permit signs, equipment in a non-permitted space).", steps:[
  "Identify specifically what looks wrong — common examples include a furnace vented improperly, missing/undersized combustion air, gas piping without visible permit/inspection markings, equipment installed in an unapproved space, or a disconnect/electrical connection that isn't code-compliant",
  "Distinguish between a safety-critical finding (improper venting, missing combustion air, gas leaks) and a paperwork-only issue (installed correctly but no permit was pulled) — the first needs to be addressed regardless of permit status, the second is a documentation matter",
  "For anything safety-critical, follow the appropriate safety procedure for that hazard (shut off the gas/CO source, red-tag as needed) before worrying about permit history at all",
  "Inform the customer of what you found in plain terms — what it is, why it matters, and that it appears not to have been done to current standards, without speculating about who did it or why",
  "Recommend the customer address it properly (permitted correction, inspection) rather than performing a quick fix that would leave the underlying non-compliant installation in place",
  "Document findings (photos, description) for your own records, since this protects you if the condition is later linked back to your visit",
], safety:"Treat any combustion, venting, or electrical safety concern found this way exactly as you would any other safety hazard — the fact that it stems from a past unpermitted install doesn't lower the urgency.", confidence:"common" },

{ id:"s-safety-mold-discovered-ductwork-equipment", equipment:"Other", title:"Mold discovered in ductwork or on equipment during a service call", summary:"Visible mold-like growth found inside ducts, on a coil, in a drain pan, or on insulation during an otherwise routine service visit.", steps:[
  "Note the location and extent (isolated spot near a condensate issue vs. widespread through the duct system) — this changes both the urgency and the likely cause",
  "Look for the moisture source first — mold needs sustained moisture, so check for a condensate leak, oversized/short-cycling equipment leaving the coil chronically wet, high duct humidity from a duct running through a humid crawlspace, or a roof/plumbing leak dripping into the system",
  "Do not attempt to simply wipe/clean visible mold on porous materials (duct insulation, fiberglass duct board) and call it resolved — porous material with mold growth generally needs to be removed and replaced, not cleaned",
  "Non-porous surfaces (sheet metal duct, coil, drain pan) can often be cleaned with an appropriate antimicrobial product, but address the moisture source first or it will return",
  "For anything beyond a small, isolated spot, recommend the customer have it professionally assessed by an indoor air quality/remediation specialist rather than treating it as a routine cleaning — especially if anyone in the home reports respiratory symptoms",
  "Document what was found with photos and correct the underlying moisture cause as part of the HVAC scope of work",
], safety:"Avoid disturbing/aerosolizing visible mold growth more than necessary while inspecting — this can spread spores through the duct system. Recommend professional remediation for anything beyond a small, easily contained spot.", confidence:"common" },

{ id:"s-safety-refrigerant-sensitivity-reaction", equipment:"Other", title:"Occupant reports a reaction/sensitivity they attribute to refrigerant exposure", summary:"A customer reports symptoms (headache, dizziness, respiratory irritation) they believe are related to a refrigerant leak or exposure — take the report seriously and investigate rather than dismissing it.", steps:[
  "Take the report seriously regardless of whether you can immediately confirm a leak — symptoms like headache, dizziness, nausea, or irritation can have several causes and deserve a real check, not a reassurance without investigation",
  "Check for an actual refrigerant leak with an electronic leak detector at the indoor coil, line set connections, and any accessible fittings, especially if the complaint is worse near the indoor equipment or in a specific room",
  "Check whether the space is poorly ventilated or unusually small relative to the equipment (a mechanical closet or small room housing an indoor unit) — even a minor leak can concentrate more in a confined, poorly ventilated space",
  "If a leak is confirmed, treat it as a genuine indoor air quality issue: increase ventilation, recommend the occupant stay out of the area until it's addressed, and repair the leak per standard refrigerant leak procedure",
  "If no leak is found, don't argue with the customer about their symptoms — document that no leak was detected, and suggest they mention it to a physician if symptoms persist, since ruling out HVAC doesn't rule out another cause",
  "Note the specific refrigerant type in your documentation, since occupants sometimes ask about a specific refrigerant's properties — answer factually within what you know and don't speculate beyond it",
], safety:"Certain refrigerants displace oxygen in a confined, poorly ventilated space and can cause symptoms independent of any inherent toxicity — treat a reported reaction near equipment in a small enclosed space as a real ventilation/exposure concern.", confidence:"common" },

// ---------------- WARRANTY AND DOCUMENTATION ----------------
{ id:"s-warranty-reading-nameplate-rating-plate", equipment:"Other", title:"How to correctly read an equipment nameplate/rating plate", summary:"Reference for pulling the information a nameplate actually gives you — model number, serial number, and manufacture date — since misreading these leads to wrong warranty and parts decisions.", steps:[
  "Locate the nameplate/rating plate — typically inside the front panel or on the side of the cabinet; for outdoor units, check inside the service panel, not just an exterior sticker that may only show basic specs",
  "Separate the model number from the serial number — they're easily confused, especially when both are long alphanumeric strings; the model number identifies what the unit is, the serial number identifies that specific unit",
  "Decode the manufacture date from the serial number — most manufacturers encode a week/year or month/year directly in the first several characters, but the exact position and format is manufacturer-specific, so check that manufacturer's serial number decoding reference rather than guessing from a general rule",
  "Note that a nameplate manufacture date is not the same as the install date — a unit can sit in distribution for months before installation, which matters for warranty start-date calculations that use install date vs. manufacture date",
  "Record electrical ratings (voltage, MCA, MOCP, RLA/LRA) and refrigerant charge/type directly from the nameplate rather than from memory or a general spec sheet — these are unit-specific and matter for correct breaker sizing and charging",
  "When the nameplate is faded, painted over, or missing, check the manufacturer's model/serial lookup tools before assuming the information is unrecoverable",
], confidence:"common" },

{ id:"s-warranty-part-coverage-datecode", equipment:"Other", title:"Determining whether a failed part is still under manufacturer warranty", summary:"Practical approach to figuring out warranty status on a specific component using date codes and registration records before quoting a repair as paid work.", steps:[
  "Start with the equipment's own manufacture/install date and the manufacturer's stated warranty terms (parts warranty length often differs from labor and from extended/registered warranty length)",
  "Check whether the unit was registered with the manufacturer — many manufacturers give a longer parts warranty only if registered within a set window after installation, and default to a shorter base warranty if not",
  "For a specific failed component, check whether it has its own separate date code — some parts (compressors in particular) are sometimes replaced under warranty themselves, which can reset that specific component's warranty clock independent of the overall unit's original warranty date",
  "Use the manufacturer's warranty lookup tool by serial number where available, rather than relying on a general rule of thumb — actual terms vary by product line and sometimes by when the unit was purchased",
  "If warranty status is genuinely unclear or borderline, document the situation and check with the manufacturer or distributor before telling the customer definitively either way",
  "Keep in mind that even when a part is covered, labor to replace it often is not unless separately covered — distinguish part cost vs. labor cost with the customer up front",
], confidence:"common" },

{ id:"s-warranty-escalate-vs-paid-repair", equipment:"Other", title:"Deciding whether a repair should be a warranty claim or a paid repair", summary:"Practical judgment call for borderline cases — component clearly within a warranty window but the failure cause is ambiguous (installation defect, misuse, normal wear, or a genuine manufacturing failure).", steps:[
  "Confirm the part is actually within an active warranty window first — this determines whether the question is even relevant",
  "Check for signs the failure was caused by something outside normal operation — physical damage, evidence of a lightning/surge event, incorrect installation (undersized wiring, wrong refrigerant charge), or lack of basic maintenance — manufacturers typically exclude these from warranty coverage even within the window",
  "If the failure looks like a straightforward component defect with no external cause, this is the clearest case for a standard warranty claim",
  "When the cause is ambiguous, document your findings thoroughly (photos, readings, what you observed) before deciding — this documentation is often what the manufacturer or distributor will want if the claim is questioned",
  "For a failure your company may have contributed to (your own recent install or service work), be transparent with the customer and handle it as a callback situation rather than pushing it through the manufacturer's claim process",
  "When genuinely unsure, escalate the question to a supervisor or the distributor's warranty desk rather than making a unilateral call in the field",
], confidence:"common" },

{ id:"s-documentation-preexisting-conditions-photos", equipment:"Other", title:"Documenting pre-existing conditions before starting work", summary:"Practical habit for protecting both the customer and the company — photographing the site/equipment condition before beginning work, especially in finished spaces or on older systems.", steps:[
  "Photograph the equipment and immediate surroundings before starting any work that involves moving, cutting into, or disturbing existing material — this includes ceilings/walls near an air handler, existing duct connections, and the condition of adjacent finishes",
  "Note and photograph any pre-existing damage, wear, or non-standard conditions (stains, cracks, prior patched areas, existing code deviations) you didn't cause, before you're anywhere near them",
  "For attic, crawlspace, or closet installs, photograph the access path and immediate work area condition, since these are common locations for later disputes about who caused what damage",
  "Keep photos organized and attached to the job/customer record rather than just on a personal phone, so they're retrievable later if a dispute or warranty question comes up",
  "If you find something notably wrong that isn't part of your scope, document it the same way and communicate it to the customer in writing",
  "Treat this as standard practice on any job involving finished spaces or older equipment, not just ones where you expect trouble — it's much less useful if only done reactively after a concern is raised",
], confidence:"common" },

// ---------------- WATER-ADJACENT SCENARIOS ----------------
{ id:"s-water-condensate-ceiling-damage-below", equipment:"Air Handler", title:"Condensate has damaged a finished ceiling below an upstairs air handler", summary:"Water stain or active dripping shows up on a ceiling below an attic or upper-floor air handler closet — treat this as both an HVAC repair and a water-damage situation.", steps:[
  "Shut down the system if actively leaking to stop further water damage while you diagnose",
  "Diagnose the condensate leak itself using the standard approach (clogged primary drain, failed pump, cracked/overflowing pan, unlevel unit, failed float switch)",
  "Check specifically whether a secondary drain pan and/or float safety switch were installed under the unit — if the primary pan overflowed with no secondary protection, that's the gap that allowed damage to reach the ceiling, and it should be corrected as part of the fix",
  "Assess the extent of ceiling damage (staining only vs. sagging drywall vs. active dripping) and communicate this clearly to the customer — this is a distinct problem from the HVAC fix itself",
  "Recommend the customer contact their homeowner's insurance and/or a water damage restoration/drywall contractor for the ceiling repair — this is generally outside HVAC scope, but flagging it promptly matters since standing moisture can lead to mold if left",
  "Document the condensate source and the ceiling damage with photos, since this is often relevant for an insurance claim or a dispute about installation adequacy",
], confidence:"common" },

{ id:"s-water-waterheater-flue-shared-chimney-spillage", equipment:"Gas Furnace", title:"Water heater and atmospheric furnace share a chimney — spillage/backdraft complaint", summary:"Two atmospherically-vented appliances sharing a common chimney can interfere with each other's draft, causing spillage at one or both draft hoods — a combustion safety issue, not routine noise/smell.", steps:[
  "Check whether the furnace and water heater are both atmospherically (naturally) vented into the same chimney or common vent connector, which is a known source of draft interference between the two appliances",
  "Perform a spillage test at each draft hood using a mirror, smoke match, or draft gauge per standard practice, with both appliances firing together since that's when interference is most likely to show up",
  "Check chimney sizing against the combined appliance input — a common vent sized for one appliance's original input can be inadequate once a second or larger-input appliance was added or replaced over the years",
  "Check for a blocked or deteriorated chimney liner, or a chimney that's now oversized relative to a newer high-efficiency water heater that was added while the furnace remained atmospheric — a common mismatch after a partial equipment upgrade",
  "If spillage is confirmed, do not just note it and leave — this is a CO safety issue; the vent system needs correction (relining, resizing, or converting one appliance to power/direct vent) before returning both appliances to unsupervised operation",
], safety:"Confirmed spillage from a shared atmospheric vent is a carbon monoxide risk — do not leave both appliances in operation if spillage is confirmed and uncorrected. Recommend a CO detector if one isn't already present.", confidence:"common" },

{ id:"s-water-sumppump-crawlspace-moisture-equipment", equipment:"Air Handler", title:"Crawlspace moisture or a failed sump pump affecting equipment installed there", summary:"Air handler, ductwork, or refrigerant lines located in a crawlspace show corrosion, rust, or performance issues traced back to chronic moisture or a sump pump that isn't keeping up.", steps:[
  "Check general crawlspace conditions — standing water, visible dampness on framing/insulation, or a musty smell all point to a moisture problem that will affect anything installed down there",
  "Check whether a sump pump is present and actually functioning — test it by adding water to the pit and confirming it activates and pumps out, and check the discharge line routes water well away from the foundation rather than recirculating nearby",
  "Inspect equipment and ductwork in the space for rust on the cabinet, drain pan, or duct straps/hangers, and for wet or sagging duct insulation — chronic humidity accelerates corrosion on components not really designed for that environment",
  "Check whether the crawlspace is vented or sealed/conditioned — a vented crawlspace in a humid climate can actually pull in more moisture than it releases, a building-science issue distinct from the sump pump itself",
  "Recommend addressing the moisture source (sump pump repair, vapor barrier, crawlspace encapsulation) as the actual fix — cleaning/protecting the equipment without addressing ongoing moisture is a temporary measure at best",
  "Flag any equipment that's already significantly corroded as a result for the customer's awareness, even if it's still functioning, since accelerated corrosion in a chronically damp crawlspace shortens equipment life",
], confidence:"common" },

// ---------------- PEST/ANIMAL-RELATED ISSUES ----------------
{ id:"s-pest-rodents-ductwork-wiring", equipment:"Other", title:"Rodents found in ductwork or equipment — chewed wiring, nesting material, droppings", summary:"Evidence of mice, rats, or similar rodents living in or accessing the duct system or equipment cabinet, sometimes discovered only after an electrical fault it caused.", steps:[
  "Look for the telltale signs: droppings, nesting material (shredded insulation, fiberglass, fabric) inside the cabinet or duct runs, and a distinct odor, in addition to any obvious chewed wiring",
  "If troubleshooting an electrical fault (intermittent short, blown fuse, erratic operation) in a system with any of these signs, specifically inspect all accessible wiring for chew marks — rodent damage is a common and easy-to-miss cause of exactly this kind of intermittent fault",
  "Check low-voltage thermostat wiring, line-voltage connections, and control board wiring separately, since rodents can access and damage any of them depending on entry point",
  "Identify and point out likely entry points to the customer (gaps around duct penetrations, an unsealed equipment closet, an accessible crawlspace or attic) — repairing the wiring without addressing entry points invites a repeat problem",
  "Repair or replace only the damaged wiring/insulation, don't just tape over exposed chewed sections, and inspect ductwork the rodents accessed for other damage (chewed flex duct, displaced insulation)",
  "Recommend the customer address the rodent issue itself (pest control, sealing entry points) as a separate but related next step, since HVAC repair alone won't stop it from recurring",
], safety:"Rodent droppings/nesting material can carry disease risk in some regions — avoid stirring up dust from an affected area and consider a mask when working directly in heavily contaminated ductwork or cabinets.", confidence:"common" },

{ id:"s-pest-insects-outdoor-electrical-compartment", equipment:"Condenser/Heat Pump", title:"Insects (ants, wasps, etc.) found in the outdoor unit's electrical compartment", summary:"Insect nesting inside the contactor/control compartment of a condenser or heat pump causing electrical faults or just discovered during service.", steps:[
  "Check the contactor and control compartment for nesting material, insect bodies, or a mud/wasp nest — this is a common cause of contactor problems (shorts, blocked contacts, chattering) that can look like a component failure at first glance",
  "If a fault was present (nuisance trips, failure to start, chattering), check whether insects or nesting material caused a direct short or physically obstructed the contactor before condemning the contactor itself",
  "Clear the compartment carefully — nesting material can hold moisture against components and accelerate corrosion even after the insects themselves are gone",
  "Check weep holes and cabinet openings that gave access, and note them for the customer, though completely insect-proofing an outdoor unit isn't realistic — recommend routine inspection instead",
  "If ants specifically are the issue, mention to the customer that certain ant species are known to be drawn to the electromagnetic field of an energized contactor, which explains why they target this compartment over other parts of the unit",
], safety:"Be alert for stinging insects (wasps, bees) before reaching into an outdoor unit's compartment, especially units that have sat unused for a while.", confidence:"common" },

{ id:"s-pest-birds-nesting-vent-termination-combustion", equipment:"Gas Furnace", title:"Bird nesting material found blocking a combustion vent or intake termination", summary:"Birds building nests in or on a furnace's vent or combustion air intake termination — a combustion safety issue, not just an airflow nuisance, especially heading into the first cold snap of the season.", steps:[
  "Inspect the vent termination and combustion air intake termination (for 90%+ furnaces, usually a separate PVC pipe from the vent) from outside for nesting material, especially if the furnace hasn't run since last spring/summer when birds are most active",
  "If the furnace was already showing a pressure-switch fault or an inducer-runs-but-won't-ignite symptom, check this before assuming a control fault — a partially or fully blocked termination is a common seasonal cause",
  "Remove nesting material completely, not just enough to clear an obvious blockage — partial material left in the pipe can shift and re-block later",
  "Check for a bird guard/screen on the termination; if none is installed, recommend adding a code-compliant screen sized to the manufacturer's specification, since a screen that's too fine can itself restrict airflow or ice over",
  "After clearing, verify normal draft/pressure switch operation and, if there's any reason to suspect it ran restricted before being caught, consider a combustion analysis check to confirm normal combustion now that the blockage is cleared",
  "Advise the customer that a screened vent termination still needs periodic visual inspection — it doesn't fully eliminate the possibility of a nest starting on top of or beside the screen",
], safety:"A blocked combustion vent or intake affects how the furnace draws air and exhausts combustion byproducts — if there's any chance the furnace operated with a partial blockage, don't just clear it and move on without confirming normal draft/combustion.", confidence:"common" },

// ---------------- TROUBLESHOOTING METHODOLOGY REFERENCE ----------------
{ id:"s-methodology-nocooling-topdown", equipment:"Other", title:"Systematic top-down diagnostic approach for 'no cooling' calls", summary:"A methodology reference for working a no-cooling complaint in a consistent order, rather than jumping straight to gauges — useful as a mental checklist on any unfamiliar system.", steps:[
  "Start at the thermostat: confirm mode, setpoint, and that it's actually generating a call for cooling (check for a Y signal at the equipment if there's any doubt) before touching anything at the equipment itself",
  "Move to power: confirm both indoor and outdoor disconnects/breakers are on, and that low-voltage (24V) power is present at both the indoor board and the outdoor contactor coil circuit",
  "Check the indoor side next: is the blower running? Is airflow adequate (filter, coil icing, blower speed)? A cooling complaint that's actually an airflow problem will mislead you if you jump straight to refrigerant diagnostics",
  "Check the outdoor side: does the contactor pull in? Do the compressor and condenser fan actually run? If the contactor pulls in but nothing runs, that's an electrical/component problem (capacitor, motor windings) rather than a refrigerant issue",
  "Only once power, controls, and airflow are confirmed normal move to refrigerant-side diagnostics: connect gauges, check charge via subcooling/superheat against the appropriate pattern",
  "Work in this order every time rather than skipping to the step that matches your first guess — it's slower on the calls where your first guess was right, but far faster overall across a career's worth of calls where it wasn't",
], confidence:"common" },

{ id:"s-methodology-noheating-topdown", equipment:"Other", title:"Systematic top-down diagnostic approach for 'no heating' calls", summary:"A methodology reference for working a no-heat complaint in a consistent order across furnace, heat pump, or electric heat, before diving into equipment-specific fault trees.", steps:[
  "Start at the thermostat: confirm mode, setpoint, and an actual call for heat (W signal, or O/B state correct on a heat pump) before assuming an equipment fault",
  "Confirm power: breakers/disconnects on, and 24V present at the equipment control board",
  "Identify what type of heat you're actually dealing with before proceeding — gas furnace, electric furnace/strip heat, or heat pump each have a completely different next step, and treating one like another wastes time",
  "For a gas furnace: work the ignition sequence in order (inducer starts, pressure switch closes, igniter warms, gas valve opens, flame proves) and find exactly where the sequence stops rather than guessing at a component",
  "For electric heat: confirm the sequencer/relay stages are actually energizing the heat strips in order, and check breakers for each strip circuit individually since a partial-heat complaint often means only some stages are energizing",
  "For a heat pump: confirm the reversing valve is correctly positioned for heat mode, refrigerant charge, and that aux/backup heat is staging in appropriately if the heat pump alone can't keep up — remember that heat pump supply air normally feels only warm, not furnace-hot, so calibrate the complaint against that expectation first",
  "Once you've localized where in the specific sequence things stop, move to the targeted fault-tree entry for that condition rather than continuing to troubleshoot generically",
], confidence:"common" },

// ---------------- GAS/ELECTRIC FURNACE — ignition, combustion, venting deep dive ----------------
{ id:"s-furnace-thermocouple-vs-thermopile-diagnosis", equipment:"Gas Furnace", title:"Standing pilot system — thermocouple vs. thermopile: which one you have and how they fail differently", summary:"Identifying whether a millivolt standing-pilot furnace uses a thermocouple or a thermopile changes what you test and what it powers.", steps:[
  "Look at the pilot bracket: a thermocouple is a single small copper lead with one connection at the gas valve (usually marked TC or PILOT); a thermopile has a larger lead, sometimes two wires, and often a ceramic-insulated tip",
  "Thermocouple only holds the pilot safety valve open — it does not power anything else; test open-circuit millivolts with the pilot lit and compare to the valve manufacturer's minimum hold-in spec",
  "Thermopile can power the main gas valve operator and, on some older furnaces, the entire millivolt thermostat circuit — test both open-circuit voltage and voltage under load (in-circuit), since a thermopile can read fine open-circuit but sag badly once it has to drive a load",
  "On either type, check the pilot flame is enveloping the full length of the sensing tip — a short or lazy pilot flame under-heats the junction and produces a weak reading even with good wiring",
  "Check the connection at the gas valve for corrosion or a loose fit — millivolt circuits are very sensitive to connection resistance",
  "If output is low on a thermopile feeding a powered valve, don't assume the valve is bad — swap in a known-good thermopile first since it's the far more common failure point",
], confidence:"common" },

{ id:"s-furnace-ipi-spark-sense-combo-electrode", equipment:"Gas Furnace", title:"IPI (intermittent pilot) system — spark and flame-sense sharing a single electrode", summary:"Many intermittent pilot ignition systems use one electrode for both sparking the pilot and sensing the pilot flame, which creates failure modes distinct from HSI or DSI.", steps:[
  "Confirm this is an IPI system, not standing pilot: the pilot lights only on a call for heat and shuts off with the main burners, rather than staying lit continuously",
  "If the pilot sparks but the module won't release gas to the main burners, let it complete a trial for ignition and check for a steady microamp flame signal from the same electrode that just sparked",
  "Inspect the electrode tip for carbon or oxide buildup — this is the single most common IPI complaint, since the same rod has to spark cleanly and then rectify a weak pilot flame",
  "Check the electrode's position in the pilot flame — sensing requires the tip to sit in the flame, not just near it, while sparking requires proper gap to the pilot hood/ground",
  "Verify the ignition module's lockout/retry count (usually a fixed number of trials before hard lockout) so a normal retry sequence isn't mistaken for a fault",
  "Check the pilot burner orifice for a lazy or unstable flame — an unstable pilot flame gives a marginal sense signal even with a clean electrode",
], confidence:"common" },

{ id:"s-furnace-dsi-electrode-gap-position", equipment:"Gas Furnace", title:"Direct spark ignition (DSI) — electrode gap and position problems", summary:"DSI sparks directly into the main burner flame stream with no pilot, so electrode gap and placement matter more than on other ignition types.", steps:[
  "Confirm this is DSI: no glowing igniter and no standing/intermittent pilot — the board sends a direct high-voltage spark at the main burner on every call for heat",
  "Check the spark gap between electrode and ground with a feeler gauge against the furnace's spec — too wide won't spark reliably, too narrow gives a weak spark that won't reach the gas stream",
  "Confirm the electrode tip sits directly in the path of gas flow from the burner port, not off to the side — position drifts after burner removal/reinstall during service",
  "Most DSI systems use a separate flame sensor rod from the spark electrode — don't confuse the two, and check each independently (spark gap on one, microamp signal on the other)",
  "Check the ignition cable and boot for cracking or carbon tracking — DSI ignition cables run full spark voltage and degrade with heat cycling",
  "If sparking looks fine but ignition is delayed, check gas valve opening time against burner light-off — a valve that opens too slowly relative to spark timing causes delayed light-off/boom",
], safety:"Delayed ignition that produces a bang should be corrected immediately — repeated delayed ignition can loosen heat exchanger joints over time.", confidence:"common" },

{ id:"s-furnace-hsi-glows-dim-weak", equipment:"Gas Furnace", title:"Hot surface igniter glows but dim orange instead of bright white — weak or aging igniter", summary:"A visibly glowing igniter isn't automatically a good one — a dim or uneven glow points to a different failure than a fully dead element.", steps:[
  "Compare glow color to a known-good igniter if possible — a properly functioning silicon carbide or silicon nitride igniter should glow bright white/orange, not a dull red-orange",
  "Measure igniter resistance cold and compare to the manufacturer's spec — resistance drifts upward as the element ages, which drops current and dims the glow",
  "Check incoming voltage to the igniter circuit during the actual trial for ignition, not just at idle — a marginal transformer or long/undersized wiring run causes voltage sag under the igniter's load",
  "Inspect the element closely (with power off) for hairline cracks — a partially cracked igniter can still glow but not reach full temperature, causing delayed or missed ignition",
  "Check the board's igniter control (relay or triac) for degradation — a failing triac can limit current to the igniter even when the igniter itself tests within spec",
  "If the igniter dims progressively over a heating season, plan replacement proactively rather than waiting for a full no-glow failure",
], confidence:"common" },

{ id:"s-furnace-flame-rectification-theory", equipment:"Gas Furnace", title:"Flame rectification circuit — how flame sensing actually works and why it fails silently", summary:"Understanding that flame sensing relies on rectifying AC into a small DC signal explains failures that look fine on a simple continuity check.", steps:[
  "Understand the principle: the sensor rod is a small-surface-area electrode and the grounded burner is large-surface-area, so a flame conducting current between them passes it more easily in one direction than the other — that asymmetry (rectification) produces a small DC signal the board reads as flame proof",
  "Because it relies on AC being converted to DC, the circuit needs a solid path back to the board through the equipment ground/neutral bond — a poor ground can produce a normal-looking flame with an insufficient sensed signal",
  "Test in series with a microammeter set to DC — a healthy signal is comfortably above the board's minimum cutoff, but always check the specific minimum for that control since it varies by manufacturer",
  "A signal that's present but low doesn't always mean a dirty rod — sensor rod size relative to the burner is what makes rectification work, so an oversized/misplaced rod, poor grounding, or reversed line polarity can all produce the same low reading as a dirty one",
  "If the reading is zero rather than low, check for a broken sensor lead or an open circuit before assuming a flame problem",
  "Reversed hot/neutral polarity at the furnace disconnect can degrade rectification even with a clean rod and good flame — check polarity if microamps are marginal despite an otherwise clean, well-positioned sensor",
], confidence:"common" },

{ id:"s-furnace-flame-sensor-microamp-reading-low-clean", equipment:"Gas Furnace", title:"Flame sensor reads low microamps despite looking physically clean", summary:"A visually clean flame sensor rod can still produce a marginal signal — don't stop at 'it looks fine.'", steps:[
  "Confirm you're actually measuring DC microamps in series with the sensor lead, not just checking for continuity or voltage",
  "Check sensor rod immersion/position in the flame — a rod positioned at the edge or above the visible flame envelope reads low even when clean, since it needs to sit within the flame itself",
  "Check for a thin, hard-to-see oxide film rather than obvious carbon buildup — very light gray/white oxide coating can still insulate the rod enough to drop the signal; a light abrasive cleaning (not sandpaper, which can leave a conductive residue) often restores it",
  "Verify the ceramic insulator around the rod isn't cracked — a cracked insulator can leak the signal to ground before it reaches the board",
  "Check burner flame quality itself — a lazy, yellow-tipped, or turbulent flame rectifies less efficiently than a stable blue flame even against a perfectly clean rod",
  "Rule out a marginal equipment ground or reversed polarity (see the flame rectification theory entry) before replacing the sensor",
], confidence:"common" },

{ id:"s-furnace-millivolt-thermostat-circuit-undervoltage", equipment:"Gas Furnace", title:"Older millivolt-system furnace — thermostat won't call or cycles erratically due to thermopile undervoltage", summary:"On furnaces where the thermopile powers the thermostat circuit directly (no transformer), a weak thermopile causes thermostat-side symptoms that look unrelated to the pilot.", steps:[
  "Confirm this is a true millivolt system — no 24V transformer, the thermostat and gas valve are powered entirely by the pilot's thermopile",
  "If the thermostat is unresponsive, erratic, or the internal relay chatters, check thermopile output under load before suspecting the thermostat itself",
  "Measure voltage at the thermostat terminals with a call for heat active — millivolt thermostats need adequate voltage to hold their internal relay in, and a weak thermopile can light the pilot fine but fail to run the thermostat reliably",
  "Check for excessive thermostat wire length or undersized wire — millivolt circuits have very little voltage margin and are far more sensitive to wire resistance than a 24V system",
  "Clean and inspect all connections in the millivolt path (valve, thermopile leads, thermostat terminals) — corrosion that would be negligible on a 24V circuit can be significant here",
  "If replacing the thermostat, confirm it's rated for millivolt operation — a standard 24V thermostat will not work correctly on this circuit",
], confidence:"common" },

{ id:"s-furnace-primary-air-adjustment-issues", equipment:"Gas Furnace", title:"Primary air shutter adjustment — too much or too little air at the burners", summary:"Primary air shutter setting affects flame shape and completeness of combustion independent of gas pressure.", steps:[
  "Recognize the symptom pattern: too little primary air gives a soft, yellow-tipped, lazy flame (incomplete combustion, sooting risk); too much primary air gives a flame that lifts off the burner ports, burns too fast, or blows out at ignition",
  "Locate the primary air shutter(s) on each burner (adjustable band or plate near the orifice/venturi) — confirm they're not simply loose and vibrated out of position",
  "Adjust incrementally with the burner compartment door in place and burners actually firing — shutter position interacts with draft, and readings taken with the door off don't reflect running conditions",
  "Verify gas pressure is correct before adjusting air — chasing flame appearance with air shutters while pressure is out of spec treats the wrong variable",
  "Check that all burners in a bank are set consistently — one burner with a different air setting than its neighbors is a common comfort/soot complaint after burner service",
  "Confirm flame supervision (pilot or flame sensor) still reads correctly after adjustment, since shutter position changes flame shape and can shift the sensor's position relative to the flame",
], confidence:"common" },

{ id:"s-furnace-orifice-altitude-derate", equipment:"Gas Furnace", title:"Burner orifice sizing at altitude — furnace not derated for elevation", summary:"Furnaces installed at higher elevation need an input derate, and the wrong orifice size for the altitude causes rich or lean combustion.", steps:[
  "Check the rating plate and installation manual for the altitude derate requirement — most manufacturers specify a percentage input reduction per elevation band above a stated threshold",
  "Confirm whether the derate was accomplished correctly for this installation: smaller orifices, a different regulator spring, or (on some furnaces) a dip switch/board setting for high-altitude firing rate",
  "If the furnace was never derated for elevation, expect symptoms of overfiring: sooting, yellow flame tips, elevated CO, or high temperature rise",
  "Verify manifold pressure separately from orifice size — a correctly sized high-altitude orifice with pressure left at low-elevation spec (or vice versa) still produces incorrect input",
  "Measure actual gas input via clocking the meter (if accessible) against the furnace's derated input rating, not the nameplate low-elevation rating",
  "Don't assume altitude derate was handled at manufacture — many furnaces ship for standard elevation and require field conversion parts",
], confidence:"common" },

{ id:"s-furnace-lp-ng-conversion-errors", equipment:"Gas Furnace", title:"LP-to-natural gas (or NG-to-LP) conversion done incorrectly", summary:"A fuel conversion that leaves any one component at the wrong spec produces combustion problems that don't match a simple single-cause fault.", steps:[
  "Verify every component that a proper conversion kit changes: burner orifices, gas valve regulator spring/cap, and (on some furnaces) a pilot orifice — a partial conversion is a common finding after a change of fuel supply",
  "Check the rating plate or a conversion sticker for documentation that the change was actually performed and by whom — undocumented conversions are harder to trust at face value",
  "Confirm manifold pressure against the correct fuel's spec — LP runs at meaningfully higher manifold pressure than natural gas, and a valve left at the wrong regulator setting under- or over-fires the furnace",
  "Inspect flame appearance: an NG orifice left in an LP system tends to overfire with aggressive, noisy flames; an LP orifice left in an NG system tends to underfire with small, weak flames",
  "Check that the gas valve itself is rated/convertible for the fuel in use — some valves require a specific regulator conversion kit rather than just a spring change",
  "Confirm the LP tank regulator (if applicable) is also correctly sized and set — a furnace-side conversion done correctly can still misbehave if the tank regulator delivers the wrong pressure",
], safety:"Never fire a furnace on an incomplete fuel conversion to 'see what happens' — confirm conversion completeness before restoring gas.", confidence:"common" },

{ id:"s-furnace-draft-hood-spillage", equipment:"Gas Furnace", title:"Draft hood spillage on a Category I furnace", summary:"Combustion products spilling out of the draft hood instead of venting up the flue indicates a draft problem, not a burner problem.", steps:[
  "Test for spillage at the draft hood relief opening using a smoke pencil/match after the furnace has run for several minutes (spillage often stops once the flue warms and draft establishes) — check both cold-start and warmed-up conditions",
  "Confirm actual updraft in the vent connector with a draft gauge if spillage is suspected but not obvious",
  "Check for a blocked, disconnected, or undersized vent connector or chimney — this is the most common root cause of hood spillage",
  "Check for competing depressurization: exhaust fans, a clothes dryer, or another combustion appliance pulling house pressure negative enough to overcome the flue's natural draft",
  "Inspect the chimney/vent for a blockage (bird nest, debris, collapsed liner) if draft is weak even with no competing exhaust running",
  "Confirm the vent connector has proper rise and doesn't have long horizontal runs or sagging sections that trap condensate or restrict flow",
], safety:"Spillage is a carbon monoxide hazard — do not leave the furnace in service with confirmed spillage. Verify with a CO analyzer before returning to service.", confidence:"common" },

{ id:"s-furnace-secondary-air-restriction", equipment:"Gas Furnace", title:"Secondary (combustion chamber) air restriction — burner compartment starved for air", summary:"Even with correct primary air shutter settings, restricted secondary air into the burner compartment itself causes incomplete combustion.", steps:[
  "Distinguish from a primary air problem: secondary air restriction affects the whole burner bank evenly and often gets worse the longer the furnace runs, as the compartment heats and airflow patterns shift",
  "Check the burner compartment/vestibule for accumulated lint, dust, or debris blocking air intake openings — common in furnaces near laundry areas or in dusty mechanical spaces",
  "Confirm the furnace's combustion air openings (louvers, door gaps designed for airflow) haven't been sealed or blocked by weatherization work, insulation, or stored items pushed against the unit",
  "Check for a door or panel that isn't seated correctly, which can either restrict intended airflow paths or create an unintended draft that disturbs the burner flames",
  "If in a confined mechanical closet, verify the space itself has adequate combustion air per the confined-space entry in this list — secondary air restriction is often a room-level problem, not a furnace defect",
  "Confirm flame appearance and CO readings improve once compartment airflow is restored, rather than assuming the burners themselves need service",
], confidence:"common" },

{ id:"s-furnace-gas-valve-redundant-internal-leak", equipment:"Gas Furnace", title:"Redundant combination gas valve — internal seat leakage between the two valves", summary:"Modern gas valves contain two independent shutoff seats in series for safety redundancy, and one can leak internally while the other still holds.", steps:[
  "Understand the design: a redundant valve has two separate solenoid-operated seats in one body so a single failure can't allow gas flow — a leak past one seat with the other still sealing may not be obvious from outside symptoms alone",
  "Suspect internal leakage if there's a faint gas smell at the furnace with the valve fully de-energized and both seats supposedly closed, but no visible external leak at fittings",
  "Perform a proper leak-down/bubble test downstream of the valve with the valve off and upstream supply isolated per a safe test procedure, rather than relying on smell alone",
  "Check valve age and service history — internal seat leakage is more common in older valves and after exposure to condensate, debris, or contamination in the gas stream",
  "Do not attempt to repair a leaking redundant valve internally — these are sealed, non-serviceable assemblies and must be replaced as a unit",
  "Confirm replacement valve matches the original's pressure rating, regulator type, and connection pattern, not just physical size",
], safety:"Suspected internal valve leakage is a gas safety issue — isolate gas supply and do not restore service until confirmed sealed.", confidence:"common" },

{ id:"s-furnace-gas-regulator-stuck", equipment:"Gas Furnace", title:"Gas valve regulator stuck — manifold pressure won't adjust or drifts", summary:"The built-in regulator inside the gas valve can stick or fail independent of the valve's on/off solenoid function.", steps:[
  "Confirm the complaint is pressure-related, not flow-related: the valve opens and closes normally (burners light/extinguish correctly) but manifold pressure reads wrong, won't respond to adjustment, or drifts over time",
  "Check whether the regulator adjustment screw actually changes manifold pressure when turned — no response after several turns indicates a stuck or failed regulator diaphragm, not just a setting issue",
  "Rule out an upstream cause first: confirm inlet pressure to the valve is within spec, since a regulator can't correctly regulate an inlet pressure that's already out of range",
  "Check for a regulator left in the wrong mode if the valve has a natural gas/LP conversion regulator with a flip cap or spring change — confirm it matches the fuel in use",
  "Inspect for debris or moisture contamination in the regulator vent (if externally vented) — a blocked regulator vent can cause erratic or drifting pressure",
  "If the regulator diaphragm has failed, replace the valve — regulators are not field-serviceable separately from the valve body on virtually all residential combination valves",
], confidence:"common" },

{ id:"s-furnace-two-stage-valve-stuck-high-fire", equipment:"Gas Furnace", title:"Two-stage gas valve stuck on high fire — won't drop back to low stage", summary:"The opposite failure from the common stuck-on-low-fire complaint — furnace runs high fire continuously and never steps down.", steps:[
  "Confirm the thermostat is actually calling for stage 1 (low fire) at some point in the cycle — a stat wired or configured to call both stages simultaneously will never show low-fire-only operation, which mimics a stuck valve",
  "Check the low-fire solenoid/coil on the two-stage valve for continuity and correct voltage during a stage-1-only call — a valve that never receives a de-energize signal to the high-fire solenoid will stay in high fire",
  "Inspect the board's staging logic/timing — some control boards start every cycle in high fire briefly before stepping down, which is normal and shouldn't be mistaken for stuck operation",
  "Check for a wiring or jumper error where the low-fire signal path was bridged to always energize high fire (common after board replacement if staging wires aren't landed correctly)",
  "Confirm with a manifold pressure gauge that pressure actually changes between calls — a valve that shows correct low/high pressure on a bench test but not in the field points back to control wiring rather than the valve itself",
  "If pressures never change regardless of signal, replace the valve — a stuck internal stepper/solenoid mechanism is a valve failure, not adjustable in the field",
], confidence:"common" },

{ id:"s-furnace-two-stage-pressure-switch-tap-wrong", equipment:"Gas Furnace", title:"Two-stage furnace with two pressure switches — hoses or taps swapped or misidentified", summary:"Two-stage induced-draft furnaces often use two pressure switches (or one dual-tap switch) to confirm draft at each firing rate, and a swapped connection causes staging faults that look like a valve or board problem.", steps:[
  "Identify whether the furnace uses two separate pressure switches (low-fire and high-fire) or one switch with two tap pressures, per the wiring diagram inside the panel — don't assume based on furnace size alone",
  "Confirm each switch's hose is connected to its correct pressure tap on the inducer housing — swapped hoses can allow the furnace to prove draft for the wrong firing rate or fail to prove a rate that's actually fine",
  "Check that a switch rated for low-fire draft pressure isn't being asked to close against high-fire pressure (or vice versa) due to a tubing mix-up — this can look exactly like a lockout on a specific stage",
  "Verify both switches close (continuity) at the correct point in the sequence by watching them with a meter through a full two-stage cycle, not just checking resting-state continuity",
  "Inspect tubing for cracks, kinks, or condensate blockage on both switches independently, since one can be fine while the other fails",
  "After any board or switch replacement, re-verify tap assignments against the wiring diagram rather than trusting hose routing left by the previous tech",
], confidence:"common" },

{ id:"s-furnace-heat-exchanger-clamshell-signature", equipment:"Gas Furnace", title:"Clamshell heat exchanger — where cracks and failure signs typically show up", summary:"Clamshell (individual sectional) heat exchangers fail differently than tubular designs, and knowing the pattern speeds up inspection.", steps:[
  "Identify a clamshell exchanger by its shape — individual curved sections, roughly resembling stacked shells, each corresponding to one burner",
  "Focus inspection at the crossover area where adjacent sections connect and at the base near the burner ports — these high-thermal-cycling areas are the most common crack locations",
  "Look for white/gray staining or efflorescence, which often marks a crack location even before it's directly visible",
  "Check for physical rocking or movement of one section relative to its neighbors when gently flexed by hand with the furnace off — sound clamshell sections should feel rigid as an assembly",
  "Use a combination of visual inspection, a mirror/borescope for the far/inner sections, and a CO/combustion analyzer comparing supply air CO to ambient — no single method is fully reliable alone",
  "Because clamshell sections can be replaced individually on some designs, confirm with the manufacturer whether a single-section failure allows a sectional repair or requires full exchanger replacement",
], safety:"A confirmed or strongly suspected crack is a condemnation call — shut the furnace down and red-tag it per your company's cracked heat exchanger policy.", confidence:"common" },

{ id:"s-furnace-heat-exchanger-tubular-serpentine-signature", equipment:"Gas Furnace", title:"Tubular and serpentine heat exchangers — where cracks and failure signs typically show up", summary:"Tubular (multiple tubes) and serpentine (single continuous folded tube) exchangers concentrate stress differently than clamshell designs.", steps:[
  "Identify the type — tubular designs use multiple individual tubes per burner running to a common collector box; serpentine designs use one continuous tube folded back and forth",
  "On tubular exchangers, focus on the tube-to-collector box weld/joint area, which sees the most thermal cycling stress, and on any visible bulging or discoloration along tube length",
  "On serpentine exchangers, focus on the bend/fold areas rather than the straight runs — repeated flexing at bends is where fatigue cracking concentrates over the exchanger's life",
  "Check for a whistling or fluttering sound during operation, which is a more common audible symptom on tubular/serpentine designs than on clamshell",
  "Look for rust-through or pinhole perforation on the secondary (condensing) surfaces of high-efficiency serpentine coils, distinct from the crack patterns typical of non-condensing designs",
  "As with any suspected heat exchanger issue, confirm with a combustion analyzer comparing supply-side CO to return/ambient, and don't rely on visual inspection alone since access to the full tube length is often limited",
], safety:"A confirmed or strongly suspected crack is a condemnation call — shut the furnace down and red-tag it per your company's cracked heat exchanger policy.", confidence:"common" },

{ id:"s-furnace-condensate-trap-orientation-wrong", equipment:"Gas Furnace", title:"Condensing furnace condensate trap installed for the wrong orientation (upflow/downflow/horizontal)", summary:"Multi-poise furnace condensate traps are position-sensitive, and a trap left in its factory (usually upflow) configuration after a downflow or horizontal install won't drain correctly.", steps:[
  "Confirm the furnace's actual installed orientation (upflow, downflow, or horizontal left/right) and check the install manual for that orientation's specific trap configuration — many multi-poise furnaces ship set up for upflow and require field reconfiguration",
  "Inspect whether the trap was physically rotated/relocated per the manual, or simply left in the factory position and plumbed with extra fittings to 'make it work' — the latter is a common shortcut that causes intermittent drainage problems",
  "Check that the trap's air-break/vent tube (if equipped) is oriented correctly for the installed position — an incorrectly oriented vent tube can let the trap be pulled dry by inducer suction, allowing flue gas to escape through the drain or upsetting pressure switch operation",
  "Verify condensate actually flows to the trap by gravity from every source point (heat exchanger, and coil if a cased coil is combined in the same cabinet) given the installed orientation — some orientations require different port usage on the same trap body",
  "Look for signs of past freezing or blockage specific to a poor-orientation trap: a low point that can't fully drain will hold standing condensate even when 'working'",
  "When in doubt, replace with a properly oriented trap kit rather than re-plumbing the existing one with extra elbows — added fittings increase blockage points and are a common callback source",
], confidence:"common" },

{ id:"s-furnace-downflow-limit-nuisance", equipment:"Gas Furnace", title:"Downflow furnace — high limit nuisance trips tied to orientation-specific airflow", summary:"Downflow furnaces have a different internal airflow path than upflow, and limit issues in this orientation often point to orientation-specific causes rather than a generic airflow restriction.", steps:[
  "Confirm the furnace is actually configured for downflow per its install manual — some models need an orientation-specific limit switch, control board setting, or physical baffle change when converted from the factory default, and a missed step causes nuisance trips",
  "Check that any required downflow accessory kit (different limit control, additional baffle, or vestibule panel) was actually installed rather than the furnace simply being set on a downflow plenum without the internal changes",
  "Verify the return air/floor plenum below the furnace isn't restricted — downflow units are more sensitive to restrictions on the discharge side sitting directly above ductwork with tighter transitions",
  "Check for a blower that's undersized or set to too low a speed tap for a downflow application, since duct static tends to run higher in typical downflow closet installations",
  "Confirm combustible clearances and any required floor base/subbase are correct — an improperly installed floor base can restrict the discharge opening",
  "If limit trips only happen after the unit has run a while, check for a distribution issue (heat concentrating in one area of the exchanger) rather than assuming total airflow is the sole cause",
], confidence:"common" },

{ id:"s-furnace-horizontal-secondary-drain-pan", equipment:"Gas Furnace", title:"Horizontal furnace/coil installation — missing or improperly installed secondary drain pan", summary:"Horizontal installations in attics or crawlspaces need a secondary (auxiliary) drain pan and float switch that upflow/downflow closet installs typically don't require.", steps:[
  "Confirm code/manufacturer requirement for this installation location — horizontal units above finished space, especially in attics, generally require a secondary drain pan under the entire unit independent of the primary condensate drain",
  "Check that the secondary pan has its own independent drain line (not tied back into the primary) routed to a conspicuous discharge point, so a stoppage is visible to the homeowner rather than silently backing up",
  "Verify a float switch is installed in the secondary pan (not just the primary drain) wired to shut the system down on water detection — a secondary pan without a functioning float switch only delays damage, it doesn't prevent it",
  "Inspect that the pan is correctly sized and positioned under the full footprint of the unit and coil, not just partially underneath",
  "Check the primary drain's slope and trap in the horizontal position — horizontal installs are especially prone to inadequate slope since the drain often has to run a long distance to reach an exterior wall or existing drain",
  "If no secondary pan exists on an existing horizontal install with an accessible attic, flag it to the customer as a recommended upgrade even if it wasn't part of the original service call",
], confidence:"common" },

{ id:"s-furnace-transformer-overload-undersized", equipment:"Gas Furnace", title:"24V transformer overloaded or undersized for accessories added after install", summary:"A transformer sized correctly for the furnace alone can be pushed into overload once zoning, a smart thermostat, humidifier, or other accessories are added to the same 24V circuit.", steps:[
  "Add up the VA draw of everything on the 24V circuit — furnace board/relays, zone panel and dampers, humidifier solenoid, smart thermostat, and any other add-on — and compare to the transformer's rated VA",
  "Check the transformer's actual output voltage under load (with the highest-draw combination of accessories energized simultaneously), not just at idle — voltage sags under load are the real-world symptom even if idle voltage looks normal",
  "Look for a transformer running warm/hot to the touch during normal operation, or a control board's low-voltage fuse blowing during specific accessory combinations, as signs of overload",
  "Confirm whether the transformer is furnace-integrated or a separate add-on unit installed for a zoning system or accessory — a separate transformer needs its own correctly rated fuse and dedicated wiring, not a tap off the furnace circuit",
  "If overloaded, upsize to a correctly rated transformer (matching VA to total connected load with margin) rather than just replacing with an identical part number",
  "Recheck voltage under full accessory load after replacement to confirm the fix, since a bigger transformer alone doesn't fix a wiring or grounding issue contributing to the sag",
], confidence:"common" },

{ id:"s-furnace-control-board-relay-failure", equipment:"Gas Furnace", title:"Control board relay failure — one output stuck on, stuck off, or chattering", summary:"Individual relays on the integrated control board can fail independently while the rest of the board's functions work normally.", steps:[
  "Identify which specific function is affected (inducer, igniter, gas valve, blower) and check whether the board's diagnostic LED/display shows a corresponding fault or just silently fails to energize that output",
  "Check for correct control voltage at the relay's coil terminals during the call for that function — voltage present at the coil but no output at the load side confirms a failed relay/contact rather than an upstream signal problem",
  "Listen and feel for a relay physically clicking when it should energize — a relay that clicks but doesn't pass load current has failed contacts (pitted/burned), while one that doesn't click at all has a coil or driver circuit failure",
  "Check for a relay stuck closed causing a function to run continuously (e.g., blower or inducer won't shut off) — this is a less common but more disruptive failure mode than stuck-open",
  "Inspect the board visually for scorching, bulging capacitors, or corrosion near the suspect relay, which often confirms the diagnosis and explains why",
  "On boards where relays aren't separately replaceable, the full board must be replaced — don't attempt to bypass a stuck relay as a repair, only as a very short-term diagnostic test",
], safety:"Never leave a relay bypassed as a permanent fix — this defeats safety interlocks tied to that circuit.", confidence:"common" },

{ id:"s-furnace-door-interlock-switch-intermittent", equipment:"Gas Furnace", title:"Blower door interlock switch — intermittent contact instead of a clean open/closed fault", summary:"A worn or misaligned door switch can make marginal, position-dependent contact that's harder to catch than a fully failed switch.", steps:[
  "Confirm this is the door interlock switch and not a separate safety circuit — most furnaces won't run at all with the blower door removed, by design",
  "Check for intermittent operation correlated with the door's exact seating — a switch plunger that's slightly worn or a door that's slightly warped can make contact only when pressed in one specific spot",
  "Inspect the switch plunger and door strike area for wear, bent brackets, or a door that doesn't seat flush due to a bent edge or debris behind it",
  "Test continuity across the switch while manually working the door/panel through its full range of motion, watching for a reading that cuts in and out rather than switching cleanly once",
  "Check wiring at the switch for a marginal connection (corrosion, loose spade terminal) that mimics a switch problem — wiggle-test the connector while monitoring continuity",
  "Replace the switch (and correct any door alignment issue causing uneven pressure on it) rather than bending the plunger or forcing the door tighter as a workaround",
], confidence:"common" },

{ id:"s-furnace-confined-space-combustion-air", equipment:"Gas Furnace", title:"Confined space combustion air — furnace closet undersized for required air volume", summary:"A mechanical closet below the minimum volume-per-input-Btu threshold needs engineered combustion air openings, not just incidental leakage.", steps:[
  "Calculate the closet's volume and compare against the combined input Btu/hr of all fuel-burning appliances in the space — spaces below the standard confined-space threshold need dedicated combustion air openings",
  "Determine whether the installation uses the indoor-air method (openings to adjacent indoor space) or outdoor-air method (direct openings/ducts to outside), since required opening sizes differ significantly between the two",
  "Check that openings are sized correctly for the method used and Btu load — undersized openings are a very common finding on retrofit closet conversions (laundry rooms, converted storage spaces) done without a combustion air calculation",
  "Verify openings are actually unobstructed in the field — a code-compliant opening that's since been blocked by shelving, insulation, or a closed door effectively doesn't exist",
  "For outdoor-air duct methods, check duct routing for excessive length, too many turns, or termination point issues (too close to grade, snow accumulation risk) that reduce effective air delivery",
  "If the space fails calculation and can't be easily corrected with openings, consider recommending a sealed-combustion (direct vent) furnace as a retrofit solution instead of forcing adequate openings into a tight space",
], confidence:"common" },

{ id:"s-furnace-negative-pressure-starving-combustion-air", equipment:"Gas Furnace", title:"Negative house pressure starving furnace combustion air (competing exhaust devices)", summary:"Exhaust fans, dryers, or other exhaust devices can depressurize a house enough to affect a non-sealed-combustion furnace's air supply or draft.", steps:[
  "Identify all exhaust devices that could run simultaneously with the furnace: kitchen exhaust, bath fans, clothes dryer, whole-house fan, or a second combustion appliance drawing air from the same space",
  "Test furnace draft/spillage behavior with the suspected competing device(s) running vs. off — a furnace that vents cleanly with everything else off but spills or has draft problems only when exhaust devices run confirms a house-pressure issue rather than a furnace/venting defect",
  "Use a manometer to check whole-house or room pressure relative to outdoors under worst-case exhaust conditions if available, comparing against reasonable depressurization limits for the venting category involved",
  "Consider whether make-up air is needed — this is more often a design/ventilation-system fix (dedicated make-up air duct, interlocked damper) than something correctable at the furnace",
  "Rule out simpler causes first (undersized vent, blocked chimney) before concluding the issue is whole-house depressurization, since both can produce similar spillage symptoms",
  "If a sealed-combustion (direct vent, Category IV) furnace is a realistic option for this location, note it as a long-term fix that removes the house-pressure dependency entirely",
], safety:"Confirmed spillage or backdrafting under any condition is a CO hazard — do not leave the system in that state; verify with a CO analyzer.", confidence:"common" },

{ id:"s-furnace-sealed-combustion-intake-blocked", equipment:"Gas Furnace", title:"Sealed combustion furnace — outdoor combustion air intake pipe blocked or restricted", summary:"Direct-vent/sealed combustion furnaces draw outside air through a dedicated intake pipe, and a blocked intake causes different symptoms than a blocked exhaust vent.", steps:[
  "Confirm this is a sealed combustion (two-pipe or concentric) system — one pipe brings in outdoor combustion air, the other exhausts flue gas, and the burner compartment is sealed from indoor air",
  "Inspect the outdoor intake termination for blockage: snow, ice, leaves/debris, insect nests, or a bird guard that's become clogged — this is a very common seasonal complaint",
  "Check for a pressure switch fault specifically tied to intake restriction on models that monitor intake pressure separately from exhaust — symptoms can look identical to an exhaust-side pressure switch fault without inspecting both pipes",
  "Verify intake and exhaust terminations maintain required separation and aren't positioned so exhaust gas is being partially recirculated into the intake, which causes a slow performance decline rather than a hard fault",
  "Check intake piping for a sagging low point that's collected water or debris internally, restricting airflow without an obvious external blockage",
  "Confirm both pipes are correctly identified during any service — connecting to the wrong pipe during a repair is a real and dangerous field mistake on two-pipe systems",
], safety:"Never assume which pipe is intake vs. exhaust — verify per the install manual before doing anything that could cross-connect them.", confidence:"common" },

{ id:"s-furnace-venting-category-mismatch", equipment:"Gas Furnace", title:"Venting category mismatch — furnace's actual vent category vs. what's installed", summary:"Category I through IV describe combinations of positive/negative pressure and condensing/non-condensing venting, and installing the wrong vent material or configuration for the furnace's category is a serious defect.", steps:[
  "Determine the furnace's vent category from its rating plate/manual: Category I (non-condensing, negative pressure — standard atmospheric or induced-draft furnace), Category II (condensing, negative pressure — uncommon), Category III (non-condensing, positive pressure), or Category IV (condensing, positive pressure — typical 90%+ furnace)",
  "Confirm the installed vent material matches what the category requires — Category I typically uses traditional metal vent (type B), while Category IV requires plastic pipe (PVC/CPVC/polypropylene) rated for condensate exposure and positive pressure",
  "Check for a Category IV furnace vented incorrectly through an old Category I metal chimney/B-vent — plastic Category IV vent pipe should not simply be run through repurposed masonry or metal venting not designed for condensing, positive-pressure service",
  "Verify joints and fittings are appropriate and sealed for positive-pressure categories (III/IV) — solvent-welded PVC/CPVC joints per code, not friction-fit or improperly glued sections that can leak flue gas under positive pressure",
  "Check termination clearances specific to the category — positive-pressure plastic vents commonly have different minimum clearances from windows, doors, and air intakes than atmospheric metal vents",
  "If a furnace was replaced with a different category unit (e.g., an old atmospheric furnace replaced with a new 90%+ unit) without also replacing the venting appropriately, treat this as a full venting re-evaluation, not a simple like-for-like swap",
], safety:"A category mismatch can allow flue gas leakage or venting failure — this is a safety issue, not just a code technicality.", confidence:"common" },

{ id:"s-furnace-vent-slope-length-mistakes", equipment:"Gas Furnace", title:"Common venting installation mistakes — slope, length, and support", summary:"Several routine installation errors on both metal and plastic venting cause intermittent problems that show up well after installation.", steps:[
  "Check vent slope back toward the furnace (for condensing/plastic vent) or continuously upward toward termination (for atmospheric metal vent) — reversed or sagging sections trap condensate and restrict flow over time even if they passed a quick visual check at install",
  "Verify total equivalent vent length (including fitting equivalents for elbows) is within the manufacturer's maximum for the pipe diameter used — exceeding max length is a common cause of pressure switch faults that only appear intermittently or in certain weather",
  "Check for adequate support/hangers along horizontal runs — unsupported plastic pipe sags over time, creating new low points that weren't present at initial installation",
  "Confirm elbow count doesn't exceed the manufacturer's maximum, since each elbow adds equivalent length and additional flow resistance beyond straight pipe",
  "Inspect for cheater fittings, bushings, or field modifications used to make the vent fit the termination location rather than using kit components as designed",
  "Check termination location itself for correct clearance from grade, windows, doors, soffits, and property lines — a technically airtight, well-sloped vent can still cause complaints (odor, condensate icing at termination) if terminated too close to living space or foot traffic",
], confidence:"common" },

{ id:"s-furnace-pvc-cpvc-vent-material-mismatch", equipment:"Gas Furnace", title:"PVC used where CPVC (or stainless) is required — vent pipe material mismatch", summary:"Not every condensing furnace is approved for standard PVC — some require CPVC or stainless steel for higher flue gas temperature tolerance, and substituting the wrong material is a hidden defect.", steps:[
  "Check the installation manual for the specific vent material(s) approved for this furnace model — many condensing furnaces allow PVC, but some (especially higher-efficiency or certain firing-rate models) require CPVC or a manufacturer-specific stainless vent system due to higher flue gas temperatures",
  "Inspect installed pipe markings — PVC, CPVC, and stainless components are marked, and a mixed installation (e.g., PVC transition on a CPVC-required system) is identifiable if you know what to look for",
  "Understand the failure mode of using PVC where CPVC is required: it isn't usually an immediate failure but a long-term softening/deformation of the pipe from sustained higher flue gas temperature, which can eventually cause joint failure or sagging",
  "Check primer and cement compatibility if CPVC is used — CPVC requires CPVC-rated cement, and using PVC cement on CPVC joints (or vice versa) compromises the joint even if the pipe material itself is correct",
  "For stainless vent systems, verify gasket/seal condition at mechanical joints, since these systems typically don't use solvent welding and rely on proper seating and clamping instead",
  "If a material mismatch is found on an older install, weigh full vent replacement against the furnace's remaining service life when advising the customer, since this is a real defect but not always an emergency depending on severity",
], confidence:"common" },

{ id:"s-furnace-bvent-corrosion-cati", equipment:"Gas Furnace", title:"Category I metal B-vent showing corrosion, rust streaks, or joint separation", summary:"Traditional double-wall B-vent on an atmospheric or induced-draft furnace has its own characteristic aging failures distinct from plastic venting.", steps:[
  "Inspect visible vent sections for rust streaking, especially at seams and joints, which often indicates condensate forming inside a vent that's operating cooler than designed (commonly from an oversized vent relative to a smaller replacement furnace)",
  "Check that vent sections are fully seated and secured with the correct number of sheet metal screws per section — separated or loosely fitted joints allow flue gas leakage and can eventually let a section fall apart",
  "If the furnace was downsized or replaced with a higher-efficiency unit without resizing the vent, recognize this as a likely root cause — an oversized B-vent for the connected appliance load runs cooler, causing condensation and accelerated corrosion in a vent not designed for it",
  "Check for physical damage or gaps where the vent passes through a firestop/ceiling support, roof jack, or attic space, which can also let flue gas escape into unintended spaces",
  "Inspect the vent cap/termination for corrosion or blockage from rust flaking off internally and accumulating at the top",
  "If corrosion is significant or joints have separated, replace the affected sections (or the full run) rather than attempting field repair with tape or sealant, which isn't rated for flue gas service",
], safety:"A corroded or separated flue vent can leak combustion products into living space — treat visible corrosion or separation as a priority safety repair.", confidence:"common" },

{ id:"s-furnace-concentric-vent-blockage", equipment:"Gas Furnace", title:"Concentric (coaxial) vent termination — partial blockage causing recirculation or pressure switch faults", summary:"Concentric vent kits combine intake and exhaust in one termination fitting, and their compact geometry makes them more sensitive to blockage than two-pipe systems.", steps:[
  "Inspect the termination fitting closely — concentric kits have a smaller effective opening area than two separate pipes and are more prone to full or partial blockage from debris, insects, or ice",
  "Check for asymmetric icing at the termination in cold weather — exhaust gas moisture can freeze at the outer ring of the fitting first, gradually restricting the intake air path before fully blocking exhaust",
  "Confirm minimum clearance from grade/expected snow accumulation was followed at install — concentric terminations mounted too low are especially vulnerable to being buried or half-buried",
  "Check the internal baffle/divider inside the fitting (where intake and exhaust are separated in a single housing) for damage or improper assembly, which can allow exhaust gas to recirculate into the intake side",
  "If pressure switch faults correlate with cold, calm-wind days, suspect termination icing before assuming a switch or board fault",
  "When clearing a blocked termination, reassemble per the kit's instructions exactly — these fittings are engineered assemblies, not something to improvise with generic pipe fittings",
], confidence:"common" },

{ id:"s-furnace-orphaned-water-heater-venting", equipment:"Gas Furnace", title:"Orphaned water heater — furnace replacement left an atmospheric water heater venting alone into an oversized flue", summary:"Replacing an atmospheric furnace with a high-efficiency unit that vents through plastic pipe often leaves a naturally-drafting water heater venting alone through a chimney or B-vent that's now oversized for its load.", steps:[
  "Check whether the furnace being serviced was previously vented into a shared chimney/B-vent along with a natural-draft water heater, and confirm what happened to that shared vent when the furnace was converted to a high-efficiency, separately-vented model",
  "If the water heater is now venting alone into a flue originally sized for both appliances, recognize this as a classic orphaned water heater condition — the oversized flue often can't maintain adequate draft velocity for the water heater alone",
  "Test the water heater's draft independently using a smoke pencil at the draft hood, particularly on startup and during the first few minutes of operation, since orphaned water heaters commonly show delayed or intermittent spillage",
  "Check for excessive vent connector length or an oversized chimney liner relative to the water heater's Btu input — resizing (typically lining the chimney or connector for the smaller load) is the standard correction",
  "Don't treat this as a furnace-side issue at all if the furnace itself is venting correctly through its own dedicated system — flag the water heater venting to the customer as a separate, real safety issue even if it wasn't the original complaint",
  "Recommend a proper fix: resize/reline the shared vent for the water heater alone, or convert the water heater to a power-vented or electric model, rather than leaving it on an oversized orphaned flue",
], safety:"An orphaned water heater with confirmed spillage is a CO hazard — this should not be left in service without correction.", confidence:"common" },

{ id:"s-efurnace-fusible-link-open", equipment:"Electric Furnace", title:"Electric furnace fusible link open — one-time thermal safety has already tripped", summary:"Unlike a resettable limit switch, a fusible link is a one-time sacrificial safety device wired in series with the heating element circuit, and an open link means it already did its job once.", steps:[
  "Distinguish a fusible link from a resettable limit switch — a link is a small in-line device that permanently opens (like a fuse) when it reaches its rated temperature, and cannot be reset; it must be replaced",
  "Check for continuity across each fusible link in the heater circuit — an open link on one element bank will disable heat from that bank while others may still function, matching a partial-heat complaint",
  "Before replacing an open link, find out why it opened — a link doesn't fail randomly, it opens because that heating element circuit actually overheated, almost always due to inadequate airflow across the element",
  "Check airflow root causes first: dirty filter, failed or delayed blower, closed/blocked registers, undersized ductwork, or a blower door/interlock issue that let the elements energize without the blower running",
  "Replace the fusible link with the correct manufacturer-specified part — do not substitute a generic thermal fuse with a different trip temperature or current rating",
  "After replacement, verify normal airflow and correct blower-to-heat-strip timing before returning to service, since replacing the link without correcting the airflow cause invites another failure",
], safety:"A fusible link is not resettable and not a wear item to bypass or jumper — bypassing it removes the last line of defense against an overheating element.", confidence:"common" },

{ id:"s-efurnace-sequencer-types-electromech-vs-electronic", equipment:"Electric Furnace", title:"Electromechanical bimetal sequencer vs. electronic time-delay relay — different failure patterns", summary:"Older electric furnaces use bimetal heater-actuated sequencers; many newer ones use solid-state time-delay relays or board-controlled staging, and each fails differently.", steps:[
  "Identify which type is installed: a bimetal sequencer has a small internal heater element that warms a bimetal strip to close contacts after a delay (visibly a metal can with multiple terminals); an electronic time-delay relay or board-controlled staging has no internal heater and uses solid-state timing",
  "On a bimetal sequencer, check the internal heater coil for continuity — if the heater coil is open, the contacts never close, but if the coil works and contacts still don't close, the mechanical linkage itself has failed",
  "Bimetal sequencers stage in and out relatively slowly (multiple seconds) by nature of the heating/cooling bimetal action — don't mistake this normal staged delay for a fault; compare actual timing to spec before condemning the part",
  "On electronic time-delay/board-controlled staging, timing is typically much more precise and consistent cycle to cycle — inconsistent or drifting stage timing on this type points more toward a marginal board or power supply issue than mechanical wear",
  "Electromechanical sequencers wear out primarily from contact pitting after many cycles (arcing across the load), while electronic staging more commonly fails from a shorted output driver or a firmware/control fault — let the failure symptom guide which is more likely",
  "When replacing a bimetal sequencer, match both the heater coil's voltage/current rating and the contact configuration exactly — a mismatched replacement can either fail to stage correctly or overheat",
], confidence:"common" },

{ id:"s-efurnace-single-point-multipoint-kit", equipment:"Electric Furnace", title:"Single-point vs. multi-point electrical connection kit — wrong kit or miswired disconnect", summary:"Electric furnaces/air handlers can be field-configured for a single main power feed with internal branch circuits, or multiple separate feeds directly to each heater bank — mixing up the configuration causes breaker and wiring problems.", steps:[
  "Determine which configuration is actually installed: a single-point kit brings one properly sized feed into a factory-installed internal disconnect/breaker block that then distributes to each heat strip bank; a multi-point (or standard multi-circuit) setup runs a separate breaker and feed from the panel to each heater circuit individually",
  "If a single-point kit is installed, verify the kit's internal fuses or breakers (not just the upstream panel breaker) — this internal protection is sized per heater bank and can trip or fail independent of the main feed breaker",
  "Check that the single main feed conductor and upstream breaker are sized for the total combined amperage of all heat strip banks, not just one bank — undersizing the main feed is a common error when a multi-point furnace is field-converted to single-point without recalculating wire/breaker size",
  "On a multi-point setup, confirm each heater circuit actually lands on its own dedicated breaker as labeled — a miswired panel where two banks share one breaker will nuisance-trip under combined load even though each breaker looks individually rated correctly",
  "Inspect the connection kit's terminals for heat damage or discoloration, since these high-current junctions are common failure points if not torqued to spec during installation",
  "When in doubt about which configuration is correct for a given furnace, check the unit's wiring diagram/nameplate rather than assuming based on what's already field-installed, since incorrect prior conversions do happen",
], safety:"Verify total connected load against feed/breaker sizing before re-energizing after any connection kit work — this is a fire risk if undersized.", confidence:"common" },

{ id:"s-efurnace-outdoor-thermostat-lockout-stuck", equipment:"Electric Furnace", title:"Outdoor thermostat / lockout control for electric backup heat stuck open or closed", summary:"Some electric furnace and dual-fuel installations use an outdoor-mounted thermostat to stage or lock out electric heat by outdoor temperature, and a stuck or misadjusted unit causes heat that won't run when needed or runs when it shouldn't.", steps:[
  "Confirm whether an outdoor thermostat (a separate temperature-sensing switch mounted outside, distinct from a smart thermostat's built-in outdoor sensor logic) is actually part of this system, since not all electric backup heat setups use one",
  "Check the outdoor thermostat's setpoint against the current outdoor temperature and the behavior expected — if it's supposed to prevent electric heat above a certain outdoor temp but heat is locked out even in cold weather, suspect a stuck-open contact or a setpoint left far out of range",
  "Test the switch's contacts directly with a meter at the current outdoor temperature versus its rated setpoint, rather than relying on the dial markings alone, since these controls can drift or fail without external signs",
  "Check wiring continuity from the outdoor thermostat back to the furnace board/relay it controls — a broken or corroded wire run outdoors (a common failure point given the exposed location) mimics a stuck switch",
  "If the control is integrated into a smart thermostat's software-based outdoor lockout rather than a physical field device, check that setting in the thermostat's equipment configuration instead of looking for hardware",
  "Confirm with the customer/design intent what outdoor temperature the lockout should actually be set to — a technically functioning switch set to the wrong temperature produces the same complaint as a failed one",
], confidence:"common" },

{ id:"s-efurnace-kw-staging-mismatch-breaker", equipment:"Electric Furnace", title:"Electric furnace kW/stage count mismatch against installed breakers or control configuration", summary:"A heater assembly's total kW and stage count must match both the connected breakers and the control board/sequencer configuration — a mismatch after parts replacement causes partial heat or nuisance trips.", steps:[
  "Confirm the total kW rating and number of heat strip banks on the nameplate, and compare against how many breakers/circuits and sequencer stages are actually wired and functional",
  "If a heater element assembly was replaced with a different kW rating than original (common when an exact replacement part isn't available and a tech substitutes a close match), check that the breaker sizing, wire gauge, and sequencer staging were all reconfirmed for the new rating rather than just bolting in the new assembly",
  "Check for a control board or thermostat configured for a different number of heat stages than are physically present — this produces either heat strips that never get called, or a thermostat waiting on a stage confirmation that will never come",
  "Verify amperage draw per bank against the breaker rating during an actual full-heat call, not just at idle, to confirm the electrical sizing is appropriate for the installed kW",
  "On systems with an outdoor-temperature-based staging thermostat, confirm the number of stages it's configured to control matches the number of sequencer stages physically installed",
  "Document any deviation from factory kW rating clearly, since a future technician troubleshooting this system will otherwise assume standard nameplate values",
], confidence:"common" },

{ id:"s-furnace-communicating-control-fallback-mode", equipment:"Gas Furnace", title:"Communicating/proprietary furnace control dropped into fallback (non-communicating) mode", summary:"Many two-stage and variable-speed furnaces paired with a matching communicating thermostat will fall back to basic single-stage operation on a wiring fault, which can look like a performance problem rather than a communication problem.", steps:[
  "Recognize the symptom pattern: a furnace that should modulate or run two stages instead runs only low fire, only high fire, or basic on/off operation with no apparent staging — check the thermostat or board display for a fallback/non-communicating status indicator before assuming a mechanical or gas-side fault",
  "Check the communication wiring between thermostat and furnace board for the specific wire type/count the system requires — many communicating systems need a specific conductor pair or count and won't fall back gracefully if generic thermostat wire was substituted during a repair",
  "Verify the thermostat and furnace board are actually a matched communicating pair — a compatible-but-non-communicating thermostat installed as a replacement will run the furnace in basic fallback mode indefinitely, which can be mistaken for an intermittent fault",
  "Check for firmware/model mismatches after a board replacement — some communicating systems require the replacement board to be matched or reconfigured for the specific model line, and a generic or mismatched board defaults to fallback",
  "Inspect for physical damage or moisture intrusion on the communication wiring run specifically, distinct from the power wiring, since a compromised comm pair doesn't necessarily kill 24V power to the system",
  "If fallback mode is confirmed and intentional (customer replaced a proprietary thermostat with a generic one on purpose), document that reduced staging/modulation performance is an expected consequence, not a defect to keep chasing",
], confidence:"common" },

{ id:"s-furnace-dipswitch-staging-misconfigured", equipment:"Gas Furnace", title:"Control board dip switches/jumpers for staging or blower profile set incorrectly", summary:"Two-stage and variable-speed furnace boards are often configured in the field via dip switches or jumpers for furnace size, staging behavior, and blower CFM profile — a wrong setting causes performance complaints with no fault code.", steps:[
  "Locate the dip switch bank or jumper set on the board and compare current positions against the installation manual's table for this specific furnace model and size — settings are frequently model/size-specific, not universal across a product line",
  "Check the furnace size/input setting specifically, since a board set for a different Btu size than actually installed will misjudge blower CFM and staging timing even though every other component is correct",
  "Verify the blower speed/CFM profile selection matches the ductwork design (matched to a specific static pressure/CFM target) — a profile set for a different airflow than the duct system was designed for causes either comfort complaints or nuisance limit trips",
  "Check second-stage timing/delay settings if adjustable — some boards allow field adjustment of how long the furnace runs on low fire before stepping to high, and a setting left at a default not suited to the home's load causes long low-fire runs perceived as weak heat",
  "After any board replacement, explicitly re-set dip switches/jumpers to match the original furnace configuration — a replacement board often ships at default settings that don't match the prior board's field configuration",
  "Take a photo of dip switch positions before changing anything, so the original configuration can be restored if a change doesn't resolve the complaint",
], confidence:"common" },

{ id:"s-furnace-continuous-fan-comfort-setting", equipment:"Gas Furnace", title:"Variable-speed furnace continuous low-speed circulation setting mistaken for a fault", summary:"Many variable-speed furnace/thermostat combinations offer a low-speed continuous circulation mode between heating/cooling calls, which can be mistaken for the blower not shutting off or running for no reason.", steps:[
  "Check the thermostat's fan settings for a continuous or low-speed circulation option (sometimes called constant circulation, intelligent airflow, or similar) separate from the basic Auto/On fan switch — this is a comfort feature, not a fault, when enabled intentionally",
  "Confirm blower speed during this mode is noticeably lower than an actual heating or cooling call — a very low, quiet airflow between calls is expected behavior for this feature, while full-speed running between calls is not and should be treated as a real fault",
  "Ask whether the homeowner or a previous tech intentionally enabled this setting, since it's sometimes turned on for filtration/air mixing purposes and the homeowner may not remember or connect it to the blower behavior they're now describing as a problem",
  "If continuous low-speed circulation isn't wanted, locate and disable it at the thermostat or board configuration rather than treating it as a wiring or relay fault",
  "Distinguish this from a genuine blower-won't-shut-off relay fault by checking whether the blower ever returns to fully off, or only ever drops to the low circulation speed — true relay/control faults typically hold the blower at a heating or cooling speed, not the distinct low circulation speed",
  "Document the setting status when resolved, since this is a very common callback source if not clearly explained to the customer",
], confidence:"common" },

{ id:"s-furnace-oversized-shortcycling-install-defect", equipment:"Gas Furnace", title:"Furnace oversized for the home's heat loss — short cycling that's a sizing defect, not a component fault", summary:"A furnace significantly larger than the calculated heat loss will satisfy the thermostat quickly and short cycle even with every component functioning perfectly.", steps:[
  "Rule out standard short-cycle causes first (airflow restriction, flame sensor, thermostat location/anticipator) using the general short-cycling entry in this list, since sizing is a diagnosis of exclusion after normal causes check out fine",
  "Compare the furnace's output capacity against a proper heat loss calculation for the home if available — a furnace sized well above calculated load is a common finding on replacements where the installer matched the old furnace's size rather than calculating for the actual home",
  "Check cycle length and frequency on a moderately cold day (not the coldest day of the year) — an oversized furnace's short-cycling pattern is often most obvious in mild-to-moderate weather, since it reaches setpoint almost immediately even on low fire",
  "On a two-stage furnace, check whether the furnace ever reaches high fire at all, or satisfies almost entirely on low fire — a furnace that virtually never needs high fire even in cold weather is a sizing indicator",
  "Consider whether staging/modulation settings can partially compensate (running more time on low fire, longer minimum run timers) as a lower-cost interim step before recommending replacement with correctly sized equipment",
  "Document the sizing mismatch clearly for the customer, since correcting this is a replacement/redesign conversation, not a warranty repair — sizing wasn't caused by an existing component's failure",
], confidence:"common" },

{ id:"s-furnace-plenum-transition-defect", equipment:"Gas Furnace", title:"Poor supply plenum transition causing turbulence, limit trips, or uneven heat that mimics a control fault", summary:"An abrupt or undersized transition from the furnace outlet to the supply trunk creates airflow problems that show up as intermittent limit trips or comfort complaints rather than an obvious duct defect.", steps:[
  "Inspect the transition piece immediately above/beside the furnace outlet for an abrupt size reduction, sharp offset, or undersized opening relative to the furnace's rated outlet area — this is a common installer shortcut when the existing trunk duct doesn't match the new furnace's outlet dimensions",
  "Check for turning vanes or a properly radiused transition where the airflow direction changes sharply, since a hard 90-degree turn immediately at the furnace outlet creates turbulence and effective airflow restriction beyond what static pressure alone might suggest",
  "Measure external static pressure at both supply and return, and compare total to the furnace's rated maximum — a transition defect often shows up as unexpectedly high supply-side static even when the rest of the duct system seems reasonably sized",
  "Correlate limit trips or short cycling with duct system geometry rather than assuming a component fault if airflow measurements are marginal but not clearly failing any single component test",
  "Check for physical evidence of the transition being an afterthought — mismatched materials, excess sealant/tape trying to bridge a size gap, or visible crimping to force a fit",
  "Recommend a properly fabricated transition sized to the furnace's actual outlet, rather than patching the existing mismatched piece, when this is identified as the root cause",
], confidence:"common" },

{ id:"s-furnace-undersized-return-negative-pressure-heat-exchanger", equipment:"Gas Furnace", title:"Undersized return duct pulling the heat exchanger cabinet into excessive negative pressure", summary:"A restrictive return can pull enough negative pressure inside the furnace cabinet to affect burner flame characteristics and draft, beyond the more obvious airflow/temperature-rise symptoms.", steps:[
  "Measure static pressure on the return side specifically, not just total external static — an undersized or excessively restrictive return can dominate total static even when the supply side is reasonably designed",
  "Check cabinet pressure relative to the burner compartment if accessible — an unusually restrictive return can pull enough negative pressure to disturb flame shape or draft at the burners, distinct from the more commonly checked temperature-rise symptom",
  "Inspect for a single undersized return grille/duct serving a furnace that needs significantly more return area, particularly common in additions or converted spaces where a return was never properly extended",
  "Check whether closed interior doors are compounding an already-marginal return design, effectively starving the system further during normal use even though the return duct itself might be adequate with doors open",
  "Correlate any draft/spillage complaints (if this is a non-sealed-combustion furnace) with return-side static specifically, since house/cabinet depressurization from an undersized return can contribute to the same spillage symptoms as an outdoor competing-exhaust issue",
  "Recommend enlarging the return (additional grille, larger duct, or a dedicated return added) as the actual fix rather than only adjusting blower speed to compensate for restriction",
], confidence:"common" },

{ id:"s-furnace-clearance-violation-overheating", equipment:"Gas Furnace", title:"Combustible clearance violation causing cabinet overheating or nuisance limit trips", summary:"Reduced clearance to combustibles around the furnace cabinet restricts case cooling airflow and radiates heat differently than designed, sometimes tripping limits without any internal airflow problem.", steps:[
  "Check actual installed clearances on all sides (including top and front service clearance) against the furnace's rating plate/manual — clearances vary meaningfully between models and are easy to assume rather than verify",
  "Look for stored items, shelving, or building materials placed against or very close to the cabinet after installation, since clearance violations often develop after the original install rather than being present on day one",
  "Feel cabinet surface temperature during a run cycle near any tight-clearance area and compare to areas with proper clearance — noticeably hotter cabinet skin near a violation supports this as a contributing cause",
  "Check whether limit trips correlate with longer run times (more heat soak into a poorly-clearanced cabinet) rather than occurring immediately at startup, which points toward a clearance/cooling issue rather than a sensor or airflow-through-the-coil problem",
  "Verify closet or alcove installations still meet required service clearance in front of the unit, not just side/back clearances, since inadequate front clearance can also restrict air movement around the cabinet in tighter mechanical closets",
  "Correct the violation (relocate stored items, rebuild an enclosure to spec) and recheck limit behavior across a full cycle before concluding the fix worked, since heat-soak-related trips may not show up on a single short test run",
], confidence:"common" },

// ================= ZONING DEEP DIVE — dampers, panels, comfort, DOZP-specific =================
// ---- Damper mechanics ----
{ id:"s-zone-damper-stuck-open", equipment:"Other", title:"Zoning system — damper stuck open, zone gets air when it shouldn't", summary:"A zone keeps receiving supply air even when it isn't calling — overcooling/overheating that room while other zones run.", steps:[
  "Confirm the complaint is a real damper issue: with only another zone calling, feel for airflow at the problem zone's registers — steady full airflow points at a stuck-open or leaking damper",
  "Check whether the actuator is being told to close: measure voltage at the damper terminals during another zone's call — if the panel is powering it correctly and it isn't moving, the actuator or linkage is at fault",
  "Check for a stuck zone relay on the panel — if the panel keeps 24V on a power-open damper (or drops it on a power-closed one) at the wrong time, the board is the problem, not the damper",
  "Inspect the blade and linkage: a slipped set screw on the damper shaft lets the actuator turn while the blade stays put — mark the shaft and watch whether blade and actuator move together",
  "Remember many dampers are power-closed/spring-open: a dead actuator or blown fuse on that zone fails OPEN by design — a 'stuck open' zone may really be a no-power-to-actuator problem",
], confidence:"common" },
{ id:"s-zone-damper-actuator-slip", equipment:"Other", title:"Damper actuator runs but the blade doesn't move (shaft slip / stripped linkage)", summary:"You can hear or see the actuator motor operate, but zone airflow never changes — the motion isn't reaching the blade.", steps:[
  "Mark the damper shaft and actuator hub with a pen line, run the zone through open/close, and check if the marks move together — a slipping set screw or worn hub shows immediately",
  "Tighten the set screw against the shaft flat (if the shaft has one) — round-shaft dampers with no flat are prone to re-slipping and may need the screw seated harder or the shaft filed flat",
  "Check for a stripped gear train: motor hums and hub doesn't turn at all, or turns with no resistance — replace the actuator",
  "On jackshaft/linkage-driven dampers, check every linkage joint for a loose ball joint or bent rod between actuator and blade",
  "After fixing, verify full travel in both directions — a blade that only travels halfway leaves the zone airflow wrong in one mode",
], confidence:"common" },
{ id:"s-zone-damper-bench-test", equipment:"Other", title:"Bench-testing a zone damper actuator with direct 24V", summary:"Fastest way to split 'bad damper' from 'bad panel/wiring' — drive the actuator directly and watch it.", steps:[
  "Disconnect the damper from the zone panel and apply 24VAC directly across the actuator terminals per its wiring type (2-wire spring-return: power = drive one way, remove = spring back; 3-wire: common + power-open + power-close)",
  "Watch for full smooth travel to the end stop and back — hesitation, buzzing, or stopping partway means a failing motor or binding blade",
  "If the damper works perfectly on direct power, the problem is upstream: zone panel relay, fuse, or the field wiring run — check voltage at the panel's zone terminals during a call next",
  "If it fails on direct power too, pull the actuator and check whether the blade itself turns freely by hand — a binding blade (duct crushed, screw through the blade path) kills actuators and will kill the replacement too",
  "Count the VA draw when testing multiple dampers on one zone — actuators in parallel add up and can exceed the panel's per-zone rating or the transformer",
], confidence:"common" },
{ id:"s-zone-damper-wiring-2wire-3wire", equipment:"Other", title:"Zone damper wiring — 2-wire vs 3-wire hookup mistakes", summary:"Power-open/spring-close, power-close/spring-open, and 3-wire power-both-ways dampers wire differently — mixing them up makes zones behave backwards or not at all.", steps:[
  "Identify the damper type from its label before touching wiring: 2-wire spring-return (one hot + common) vs 3-wire (common, power-open, power-close)",
  "On 3-wire dampers, swapped open/close conductors make every zone call do the opposite — verify which terminal drives which direction with the blade visible",
  "Confirm the panel's zone output type matches the damper: a panel output designed for power-closed dampers holding constant 24V will hold a power-open damper open forever",
  "Check the common: 3-wire actuators need a solid common back to the panel/transformer — a floating common gives erratic, partial, or no movement",
  "After wiring, run each zone individually and physically verify its damper's blade position in both the calling and non-calling state",
], confidence:"common" },
{ id:"s-zone-damper-leakage-closed", equipment:"Other", title:"Closed zone damper still leaking air into the zone", summary:"Damper closes fully but the zone still gets noticeable airflow — blade seal, damper fit, or duct paths that bypass the damper.", steps:[
  "Verify the blade actually reaches its stop: many round retrofit dampers seal poorly by design and pass 5-10% when 'closed' — some leakage is normal and intentional on some brands to relieve pressure",
  "Check the damper-to-duct fit: a damper a size small, or installed in oval-crushed flex, leaks around the frame no matter what the blade does",
  "Look for duct paths that bypass the damper entirely — a branch teed off upstream of the damper feeding the same zone is a common retrofit mistake",
  "Check static pressure: an undersized or missing bypass drives very high pressure across closed dampers and forces air past any blade seal — fix the pressure problem, not the damper",
  "If leakage overconditions a small zone, consider whether the system design intends it (constant bleed to protect equipment) before 'fixing' it — check the zone panel's setup notes",
], confidence:"common" },
{ id:"s-zone-damper-noise-slam", equipment:"Other", title:"Zone dampers banging, chattering, or slamming on open/close", summary:"Mechanical noise from the duct every time zones change over — usually pressure, actuator control, or loose blades.", steps:[
  "Identify when it happens: a single thump at changeover is the blade hitting its stop under high duct pressure; chattering during operation is usually a failing actuator or unstable control signal",
  "Check static pressure with one zone calling — high pressure slams blades; verify the bypass (or equipment airflow reduction) is working",
  "Check for a loose blade on its shaft rattling in the airstream — tighten or replace",
  "Chattering actuator: measure the 24V at the actuator during the noise — sagging/unstable voltage from an overloaded transformer makes actuators hunt; check total VA load",
  "Barometric bypass dampers flutter when the weight arm is set wrong — adjust per the panel's static setup procedure",
], confidence:"common" },
{ id:"s-zone-damper-no-vs-nc-choice", equipment:"Other", title:"Normally-open vs normally-closed dampers — wrong choice causes failure-mode surprises", summary:"What the dampers do when power or the panel dies is a design decision — the wrong type strands the system in a bad state during a failure.", steps:[
  "Determine the installed type: kill power to the panel and watch what every damper does — spring-open (fail to full airflow everywhere) vs spring-closed (fail to no airflow) vs stay-in-place (3-wire)",
  "Failure behavior matters: power-closed/spring-open is the common residential choice so a dead panel still heats/cools the whole house; power-open/spring-closed can choke airflow completely on a panel failure — flag it if found",
  "If dampers were replaced over the years with mixed types, zones will behave inconsistently during faults — standardize or document which zone is which",
  "Any time a zone system 'fails weird' during a power event, check the damper fail positions before condemning boards",
], confidence:"common" },
// ---- Zone panel behavior ----
{ id:"s-zone-panel-purge-delay", equipment:"Other", title:"Zone panel purge/blower-off delay mistaken for a fault", summary:"Blower keeps running and dampers stay open after a zone satisfies — often normal purge behavior, not a stuck relay.", steps:[
  "Check the panel's documentation for a purge cycle: most panels run the blower 30 seconds to a few minutes after a call ends to move residual heat/cool out of the duct, often with all dampers open",
  "Time the behavior: a purge ends on its own; a stuck relay or stuck fan call doesn't — if the blower never stops, then diagnose the panel's fan relay and the thermostat's fan setting",
  "Check whether the equipment's own blower-off delay (furnace board heat-off delay, air handler delay tap) is stacking on top of the panel's purge — two delays back-to-back can look like a 10-minute runaway",
  "Explain the purge to the homeowner if they report 'it keeps running after it should stop' — this call is often a no-fault visit",
], confidence:"common" },
{ id:"s-zone-panel-call-passthrough-check", equipment:"Other", title:"Zone panel not passing a heat/cool call through to the equipment — systematic checkout", summary:"A zone thermostat calls but the equipment never starts. Work the signal path in order: stat → panel input → panel logic → panel output → equipment.", steps:[
  "At the panel, confirm the zone's input: thermostat call should light that zone's call LED and read 24V between the zone's Y (or W) input and common — no signal means thermostat or stat wiring",
  "Confirm the panel accepts the call: check for lockout/short-cycle timers, changeover conflicts (another zone holding the opposite mode), or a priority setting suppressing this zone",
  "Check the panel's equipment output terminals for 24V out on Y/W when the call is active — an input with no output means panel logic/relay failure (or a blown panel fuse)",
  "Check the wiring from panel output to the equipment's low-voltage terminals — verify the same call arrives at the furnace/air-handler board",
  "If the equipment gets the call and still doesn't run, leave zoning and diagnose the equipment itself — the zone system has done its job",
], confidence:"common" },
{ id:"s-zone-panel-led-diagnostics", equipment:"Other", title:"Reading zone panel status LEDs before doing anything else", summary:"Most zone panels tell you the whole story on their LEDs — call inputs, damper outputs, equipment outputs, and fault states — worth 60 seconds before pulling a meter.", steps:[
  "Identify the LED groups from the panel's legend (usually printed on the board or door): per-zone call LEDs, per-zone damper LEDs, equipment output LEDs (Y1/Y2/W1/W2/G/O-B), and status/fault LEDs",
  "Compare 'what's calling' against 'what's being output' — the mismatch localizes the fault instantly (calls present but no equipment output = panel logic/limits; output present but no equipment = downstream wiring)",
  "Note any blink patterns and look them up in the panel manual — many boards blink codes for high supply temp cutout, low temp cutout, comm loss, or staging lockout",
  "Take a photo of the LED state while the problem is live — panels reset when power is cycled and the evidence disappears",
], confidence:"common" },
{ id:"s-zone-panel-transformer-sizing", equipment:"Other", title:"Zone panel and dampers overloading the system transformer", summary:"Zoning retrofits add a panel plus several damper motors to a 40VA transformer that was already feeding the equipment — brownouts cause maddening intermittent faults.", steps:[
  "Add up the VA: equipment board + thermostat(s) + zone panel + every damper actuator (get real numbers from labels — actuators run 3-10VA each, more while driving)",
  "Measure 24V under worst load (all dampers driving + equipment call): below ~22V expect relay chatter, comm dropouts, and random resets",
  "Most zone panels are designed for their own dedicated transformer — check the manual; if it calls for a separate transformer, install one rather than sharing the equipment's",
  "Never parallel two transformers onto one common without following the panel's isolation instructions — out-of-phase paralleling makes ~48V and burns boards",
  "After adding a transformer, verify commons are landed exactly per the panel manual — shared vs isolated commons is the #1 wiring mistake in two-transformer zone jobs",
], safety:"Kill power before transformer work. Mis-phased paralleled transformers can put ~48V on the control circuit and destroy every board connected to it.", confidence:"common" },
{ id:"s-zone-smallzone-limit-trip", equipment:"Other", title:"Equipment tripping limits or freezing when only a small zone calls", summary:"One small zone can't move the equipment's full airflow — furnaces trip high limit, AC coils freeze, and techs chase 'equipment problems' that are really zoning airflow problems.", steps:[
  "Reproduce it: run only the smallest zone and measure supply temp and static pressure — rising supply temp toward limit (heat) or falling coil temp (cool) confirms airflow starvation",
  "Check the bypass: is there one, is it sized right, is it actually opening? A failed-closed bypass damper turns every small-zone call into a limit trip",
  "Check whether the panel supports capacity control instead of/alongside bypass — staging the equipment down (low fire / low stage / reduced CFM) on single-zone calls is the modern fix, especially on communicating systems",
  "Check the panel's supply-air temperature sensor and its cutout settings — many panels shed the equipment or open more dampers on high/low supply temp; a mis-set or failed LAT sensor disables that protection",
  "Long-term fixes if design is wrong: enlarge the smallest zone (combine rooms), add a dump zone, or lower equipment capacity — repeated limit trips crack heat exchangers",
], confidence:"common" },
{ id:"s-zone-lat-sensor-cutout", equipment:"Other", title:"Zone panel leaving-air temperature (LAT) sensor cutouts — how they protect and how they fail", summary:"The supply-duct sensor most panels require is what keeps zoned equipment alive — know its cutout behavior before condemning a panel that 'randomly stops the equipment.'", steps:[
  "Find the LAT/supply sensor (in the supply plenum after the equipment) and its configured limits in the panel setup — typical defaults: heat cutout ~140-160°F, cool cutout ~40-45°F",
  "'Equipment shuts off mid-call but blower keeps going' on a zoned system is very often a LAT cutout doing its job — the real problem is airflow (small zone, closed bypass), not the panel",
  "Test the sensor: compare its reading (many panels display it) against a probe thermometer in the same duct — a drifted sensor cuts equipment out early or never",
  "Check sensor placement: too close to the heat exchanger/coil reads hot/cold spikes and false-trips; relocate downstream per the panel manual",
  "If cutouts recur, log which zones were calling — the pattern almost always points at the starved-airflow zone combination to fix",
], confidence:"common" },
{ id:"s-zone-dump-zone-nobypass", equipment:"Other", title:"No-bypass zoning designs — dump zones and oversized ducts instead of a bypass", summary:"Modern zoning guidance often skips the bypass entirely — recognize these designs so you don't 'add the missing bypass' to a system designed without one.", steps:[
  "Identify the design intent: modulating/multi-stage equipment with capacity control, oversized zone ducts (each zone sized for ~70%+ of full airflow), or a designated dump zone means the designer intentionally omitted a bypass",
  "A dump zone (usually the largest/least-occupied area) opens automatically when few zones call — verify its damper logic works rather than assuming it's 'stuck open'",
  "Bypass air recirculating across the coil/exchanger hurts efficiency and capacity — that's why modern designs avoid it; adding a bypass to an inverter/communicating system can actually fight the equipment's own airflow management",
  "If retrofitting zoning onto single-stage equipment with tight ducts, a bypass (or generous damper leakage settings) may genuinely be needed — the right answer depends on equipment turndown, not habit",
  "When inheriting an unfamiliar zoned system, find the panel manual in this app's Manuals section and check its bypass/capacity-control philosophy before changing anything",
], confidence:"common" },
{ id:"s-zone-heatpump-ob-misconfig", equipment:"Other", title:"Heat pump O/B reversing valve misconfigured through a zone panel", summary:"Zoned heat pump blows cold in heat mode or warm in cool mode for some or all calls — the O/B logic between thermostats, panel, and equipment doesn't agree.", steps:[
  "Confirm the chain: thermostats send O or B per their setting, the panel consolidates changeover, and one O/B output feeds the equipment — every link must use the same convention (O = energize in cool is the common default)",
  "Check the panel's heat pump configuration (dip switch/menu): set for O when the equipment expects O-energized-in-cool (most brands) or B only for B-energized-in-heat equipment",
  "Watch for mixed thermostat settings across zones — one stat set to B on an O system flips the valve wrong whenever that zone leads the call",
  "Verify at the equipment: in cooling, measure whether the reversing valve solenoid is energized and compare against what the equipment brand expects",
  "After correcting, test heat and cool from EVERY zone thermostat — changeover bugs hide in whichever zone wasn't tested",
], confidence:"common" },
// ---- Comfort/airflow symptoms on zoned systems ----
{ id:"s-zone-overshoot-one-zone", equipment:"Other", title:"One zone consistently overshoots its setpoint", summary:"Zone reaches setpoint then keeps getting warmer/cooler — leakage, sensor placement, or adjacent-zone airflow is conditioning it beyond its call.", steps:[
  "Watch the zone after it satisfies: if supply air still comes from its registers during other zones' calls, chase damper leakage or a stuck/miswired damper",
  "Check thermostat/sensor location — a stat near a supply register or in a sun-load wall satisfies early then the room mass keeps drifting; relocation or a remote sensor fixes it",
  "Check duct crossover: shared trunks feeding two zones downstream of the dampers let one zone's air spill into another — trace the actual duct layout against the zone map",
  "Check panel settings for intentional bleed (some panels crack all dampers a percentage) and whether it's set higher than the design needs",
  "Consider thermal coupling — open stairwells and big return paths move air between zones no damper can stop; set expectations accordingly",
], confidence:"common" },
{ id:"s-zone-retrofit-uneven-rooms", equipment:"Other", title:"Rooms within one zone uneven after a zoning retrofit", summary:"Zoning fixed the floor-to-floor fight but rooms inside a zone still vary — zone dampers can't balance individual runs.", steps:[
  "Explain the scope: zone dampers control the zone as a unit; room-to-room balance inside a zone still comes from branch dampers/registers, exactly like a non-zoned system",
  "Balance within the zone: with only that zone calling, measure or assess per-register airflow and adjust branch/register dampers",
  "Check whether the retrofit moved the thermostat to a room that doesn't represent the zone — the stat's room always wins",
  "Watch static pressure with the zone calling alone — retrofit zones on old duct sometimes need more supply than their branches can deliver, and the worst run shows it first",
], confidence:"common" },
{ id:"s-zone-onezone-whistle", equipment:"Other", title:"Loud whistling/rushing noise when only one zone is calling", summary:"System is quiet with everything open but howls when a single zone runs — classic high-velocity symptom on zoned duct.", steps:[
  "Confirm with static pressure: measure with all zones open vs one zone — a big jump means the relief strategy (bypass, capacity reduction, damper bleed) isn't doing its job",
  "Check the bypass damper operation and sizing (or the equipment's low-stage airflow settings on capacity-controlled systems)",
  "Listen at the dampers themselves: a barely-cracked damper is a whistle machine — panels with adjustable minimum-open settings can trade a little bleed for silence",
  "Check register selection in the small zone — high-throw registers at high velocity are the loudest point; larger registers/grilles in that zone drop noise fast",
  "On communicating inverter systems (Daikin FIT + DOZP, etc.), verify the zoning airflow settings/auto-weight completed properly so the equipment actually reduces CFM for small calls",
], confidence:"common" },
// ---- Daikin DOZP-6-A specific ----
{ id:"s-dozp-autoweight-fails", equipment:"Other", title:"Daikin DOZP zone panel — auto-weight won't start or complete", summary:"The DOZP's auto-weight airflow calibration aborts or hangs — work the status messages, they name the cause.", steps:[
  "Read the auto-weight status on the One+ thermostat: 'Pressure sensor not connected' = enable the sensor in the thermostat menu and check its wiring at the zone board",
  "Stuck at 'Waiting for system fan to stop' over 5 minutes = communication issue — power cycle the thermostat",
  "'Auto-weight stop due to fan fault' = the indoor blower isn't operational; diagnose the fan before retrying",
  "'Less than 2 zones enabled' = enable more zones (or confirm dampers are detected) on the enable-zones screen",
  "'May be inaccurate due to large zone size' = check for an open IDU door or duct leak; 'cannot complete due to small duct size' = check zone sizing or a stuck damper",
  "The differential pressure sensor must read correctly: at 0 Pa it outputs 1.0 VDC between SIGNAL and GND — verify with a meter if auto-weight keeps aborting",
], confidence:"common" },
{ id:"s-dozp-damper-click-normal", equipment:"Other", title:"Daikin DOZP zone panel — periodic clicking from dampers is normal detection", summary:"Homeowner or tech reports a click from the zone panel/ducts every so often — the DOZP checks all zones for dampers every 10 minutes by design.", steps:[
  "The zone controller runs damper detection every 10 minutes, clicking for about 1 second — the green status LED lights for each zone where a damper is detected; this is normal, not a fault",
  "Use it as a diagnostic: during detection, a zone whose green LED does NOT light has a damper wiring problem (matches error codes 82-87)",
  "Constant clicking or a zone LED that flickers in and out points at a loose damper connection — check that zone's wiring",
  "If the customer finds the click objectionable, explain it's the panel supervising the dampers — it cannot be disabled without losing damper fault detection",
], confidence:"common" },
{ id:"s-dozp-pressure-sensor-install", equipment:"Other", title:"Daikin DOZP — differential pressure sensor and pitot tube installation problems", summary:"Bad pressure sensor placement or tubing kills auto-weight and static readings on the DOZP — check the physical install before condemning parts.", steps:[
  "Verify the pitot tubes are installed per the quick-start guide (supply duct placement, facing correctly into/perpendicular to flow) and the silicone tubing runs to the correct sensor ports without kinks or condensation traps",
  "Check the sensor's green power LED: off with 5VDC present at the connector means open 5V wiring or a failed sensor",
  "Verify output: 1.0 VDC between SIGNAL and GND at zero flow (system off) — a different zero reading means tubing connected wrong or a drifted sensor",
  "Error 90 on the One+ dealer screen = sensor input open/short — check the three-wire connection (5V, SIGNAL, C) at the zone board end too",
  "Conversion reference: in. WC = Pa ÷ 248.84 — useful when comparing the sensor's Pa readings against your manometer",
], confidence:"common" },
{ id:"s-dozp-zone-merge-behavior", equipment:"Other", title:"Daikin DOZP — zone follows zone 1 after a thermostat drops (merge behavior)", summary:"A zone seems to have lost its mind and just does whatever zone 1 does — that's the DOZP's designed fallback when its thermostat leaves the bus.", steps:[
  "When an additional zone thermostat disconnects from the ClimateTalk bus (errors 31-35), the DOZP automatically merges its zone into the primary zone (zone 1) so the space still gets conditioned",
  "So 'zone 3 runs whenever zone 1 runs' usually means zone 3's thermostat is offline — check the One+ dealer error list before touching dampers",
  "Restore the thermostat: check its power, then Data 1/Data 2 polarity and wiring, then bus bias voltage (0.6-0.9 VDC) — the merge clears on its own once communication returns",
  "After restoring, verify the zone responds to its own thermostat again and the error is gone from the dealer menu",
], confidence:"common" },
{ id:"s-dozp-bus-bias-check", equipment:"Other", title:"Daikin DOZP / One+ — ClimateTalk bus health check (Data 1/Data 2 bias voltage)", summary:"The go-to electrical check for any communication complaint on the DOZP zoning bus: polarity, continuity, and 0.6-0.9 VDC bias.", steps:[
  "Check the BUS LED on the zone panel first: alternating fast/slow flashing = normal traffic; solid ON, solid OFF, or fixed-rate flashing = not communicating",
  "Verify Data 1 and Data 2 aren't swapped anywhere in the chain (zone board, thermostats, indoor unit) — polarity matters on this bus",
  "Measure DC bias voltage across the data pair: 0.6-0.9 VDC is healthy; near 0 or rail voltage means a short, open, or dead node",
  "Check for loose, broken, or shorted conductors run-by-run — wiring is 18 AWG and doesn't require shield, but splices and backstabs are the usual culprits",
  "Remember the indoor unit reports E77 (no thermostat found) when the bus is down — an E77 on the equipment plus zone errors 25/36 on the stat all point at the same wire",
], confidence:"common" },
{ id:"s-dozp-a2l-all-dampers", equipment:"Other", title:"Daikin DOZP — A2L alarm behavior: what the zoning system does during a refrigerant alert", summary:"On R-32 systems the DOZP participates in leak mitigation — expect abnormal damper/blower behavior during an A2L event and don't fight it.", steps:[
  "When the indoor unit signals an A2L refrigerant alarm, the zone board (error 81) and system enter mitigation — the blower runs and dampers open to disperse refrigerant regardless of thermostat calls",
  "Treat it as a real leak first: ventilate, avoid ignition sources, and follow the indoor unit's A2L troubleshooting before assuming a false alarm",
  "For a suspected false alarm, check the alarm wiring path: furnace — voltage at the Alarm pin on the furnace board; air handler — conductivity between CTL_COM and CTL_NO and 24VAC at the refrigerant detector connector",
  "A shorted alarm wire between indoor unit and zone board mimics a leak alarm — inspect that run before replacing sensors",
  "Only after wiring and detector check out: power cycle, and if error 81 persists with no system alert, replace the zone board",
], safety:"A2L (R-32) refrigerant alarm — ventilate the space and eliminate ignition sources before working. Follow R-32 service procedures and local code.", confidence:"common" },
{ id:"s-dozp-wireless-rht-sensor", equipment:"Other", title:"Daikin One+ wireless RHT sensor — pairing and placement on zoned systems", summary:"The wireless temperature/humidity sensor extends the One+ into rooms or zones — most 'sensor not working' calls are placement and battery, not defects.", steps:[
  "Pair through the One+ thermostat's sensor menu and confirm it shows in the sensor list with a reading before leaving the wall",
  "Placement rules are the same as any stat: interior wall, away from supply registers, sunlight, lamps, and kitchen/bath humidity spikes",
  "Wireless range drops through metal duct chases and multiple walls — if the sensor drops offline intermittently, relocate closer or remove the obstruction path",
  "Check battery level in the thermostat's sensor screen during any service visit — a dying battery reads as an intermittent/ghost sensor",
  "When a zone averages multiple sensors, verify the averaging configuration matches the comfort complaint — a sensor in an unused room dragging the average is a settings fix, not a hardware fix",
], confidence:"common" },

// ================= BRAND-SPECIFIC DIAGNOSTIC FLOWS =================
{ id:"s-goodman-7seg-reading", equipment:"Gas Furnace", title:"Goodman/Amana/Daikin — reading the dual 7-segment display correctly", summary:"The two-character display on ComfortNet-era boards shows status AND fault codes — misreading b/6, 0/d, or the display orientation sends techs down the wrong table.", steps:[
  "Confirm orientation first: an arrow printed next to the display shows which way is up — boards mount in different positions and an upside-down '9b' reads as 'q6'",
  "Learn the display logic: during normal operation it shows operating status (like C2 for high-stage cool, H for heat); a fault alternates or replaces the status — don't treat a status display as an error",
  "Distinguish look-alike characters: lowercase b (blower codes b0-b9) vs 6, d (data codes d0-d4) vs 0, E vs F — compare against the code list printed on the unit's wiring diagram or in this app's Error Codes",
  "Major vs minor faults behave differently: a major error shows continuously; minor errors alternate with the status display — an intermittently-appearing code is still a real code",
  "Retrieve stored faults from the board's fault-recall function (varies by board — furnaces use the pushbutton sequence, see the unit's service manual in Manuals) before cycling power, because a power cycle erases the story",
], confidence:"common" },
{ id:"s-goodman-sharedata-memorycard", equipment:"Gas Furnace", title:"Goodman/Amana/Daikin — shared data and the memory card after a board replacement", summary:"A replacement ComfortNet board without the right shared data throws d0/d1/d4 codes and refuses to run the equipment properly — the memory card workflow fixes it.", steps:[
  "Recognize the symptom: fresh board, system won't run right or shows d0 (no data), d1 (invalid data), or d4 (invalid memory card) — this is a data problem, not a wiring problem",
  "Get the correct yellow memory card for the EXACT model (the data set is model-specific) — from the old board's card slot, the unit's literature bag, or ordered by model number",
  "Power OFF, insert the memory card into the new board's slot, then power ON — the board loads shared data automatically and the code clears when done",
  "Power OFF again before removing the card (it can stay in permanently too — many techs leave it)",
  "Verify after loading: run a full cycle and confirm airflow/staging behaves per the model — wrong-model data runs the blower at wrong CFMs even without an error code",
], safety:"Always kill power before inserting or removing the memory card — hot-plugging corrupts the data load.", confidence:"common" },
{ id:"s-goodman-coolcloud-inverter", equipment:"Condenser/Heat Pump", title:"Goodman/Amana side-discharge inverter — using CoolCloud instead of guessing", summary:"On GSXV/GSZV/AVZC inverter units, the CoolCloud phone app talks to the board over Bluetooth and shows live data no meter can — use it before condemning parts.", steps:[
  "Download CoolCloud HVAC (Goodman/Amana app) and connect to the unit's control board via Bluetooth — see Toolbox in this app for the connection steps",
  "Read active and stored fault codes with full descriptions instead of counting LED flashes",
  "Watch live operating data: compressor Hz, EEV position, inverter bus voltage, thermistor readings — compare suspect sensor readings against your gauges/thermometer to catch drifted sensors",
  "Use the app's forced-operation modes to command specific compressor speeds when diagnosing intermittent issues or verifying a repair",
  "Update board firmware through the app when Goodman releases fixes — several nuisance-fault issues on early inverter boards were resolved by firmware",
], confidence:"common" },
{ id:"s-carrier-infinity-ui-codes", equipment:"Gas Furnace", title:"Carrier Infinity — pulling status codes and history from the wall control", summary:"On communicating Infinity systems the wall control stores every event with a timestamp — check it before opening the furnace.", steps:[
  "On the Infinity/Evolution wall control, enter the service menus (typically press and hold the service/wrench icon ~10 seconds) — you get model info, status, and fault history for every connected communicating component",
  "Read the event list newest-first and note timestamps — a 3 AM high-limit event during a cold snap tells a different story than one every cycle",
  "Match major.minor codes (like 31.4 or 41.2) against the Carrier Infinity table in this app's Error Codes",
  "Remember codes live in two places: the wall control's history AND the furnace board's amber/green status LEDs — the board also flashes the code if the display board itself is suspect",
  "After the repair, clear the history so the next tech starts clean, and run a full heat cycle to confirm no new events log",
], confidence:"common" },
{ id:"s-carrier-flash-led-reading", equipment:"Gas Furnace", title:"Carrier/Bryant/Payne — reading flash codes through the door sight glass", summary:"Non-communicating Carrier-family furnaces flash amber and red LEDs in patterns — count them right and the table in Error Codes does the rest.", steps:[
  "Watch through the blower door sight glass with the door ON — removing the door opens the door switch and kills the board mid-code",
  "Count the pattern: short amber flashes = first digit, then red flashes = second digit (e.g., 3 amber + 1 red = code 31); the pattern repeats with a pause between cycles",
  "A rapid continuous flash isn't a countable code — it means line voltage polarity reversed or no ground; fix the power problem first",
  "Codes clear when the fault clears, but the board stores the last code — briefly cycling the door switch (or the recall procedure on newer boards) replays stored codes",
  "Steady ON with no flashing plus no operation = board has power but no call or a failed board — verify thermostat call reaches the board before condemning it",
], confidence:"common" },
{ id:"s-lennox-unit-size-code-e203", equipment:"Gas Furnace", title:"Lennox SLP98/SLP99 — configuring the unit size code after a control replacement (three bars / E203)", summary:"A new SurePlus control doesn't know which furnace it's in — three horizontal bars followed by E203 means it's waiting for the unit size code.", steps:[
  "Recognize the display: three horizontal bars then E203 on power-up = control does not recognize the unit size code and won't run until configured",
  "Enter configuration: follow the unit-size-code procedure on the furnace wiring diagram/install manual (in Manuals → Lennox) — it's a pushbutton sequence on the control that scrolls available size codes on the 7-segment display",
  "Select the code matching THIS furnace's model/capacity from the table in the install manual — a wrong size code runs wrong airflow and firing rates even though the furnace 'works'",
  "On communicating (S40/iComfort) systems, also verify the thermostat re-discovers the furnace after configuration and shows the right model in its About/dealer screens",
  "Run a full heat cycle and verify staging and CFM behavior against spec before leaving",
], confidence:"common" },
{ id:"s-lennox-s40-dealer-diagnostics", equipment:"Other", title:"Lennox S40/iComfort — using the dealer control center before touching the equipment", summary:"On Lennox communicating systems the thermostat is the diagnostic hub: alerts, live data, and tests for every connected unit live in the dealer menus.", steps:[
  "Open the dealer control center on the S40 (menu → settings → advanced settings → view dealer control center) — no login needed on-site",
  "Check Notifications for active and cleared alert codes with timestamps; match code numbers against the Lennox alert tables in this app's Error Codes (E-prefixed on furnace displays, plain numbers on the stat)",
  "Use Diagnostics to view live data per unit — compressor Hz, coil/discharge temps, CFM targets — and compare against measured reality to find lying sensors",
  "Run built-in tests from the dealer menu to force stages/functions instead of jumpering — the system logs results and respects safeties",
  "Check each device's About screen for model, serial, and firmware — mismatched or outdated firmware after a board swap causes phantom communication alerts (auto-update fixes most)",
], confidence:"common" },
{ id:"s-lennox-inverter-led-flash", equipment:"Condenser/Heat Pump", title:"Lennox variable-capacity outdoor unit — reading the inverter's red/green LED flash codes", summary:"When the thermostat shows a 400-series inverter alert, the inverter board's own two-LED flash pattern confirms which internal fault it is.", steps:[
  "Find the inverter's status LEDs (red and green) inside the outdoor control panel — normal operation is red ON solid, green OFF",
  "Read the pattern as red-count then green-count: e.g., 2 red + 3 green = inverter code 23 (DC link low voltage); the alert-code guide in Manuals → Lennox maps every combination",
  "Cross-reference with the thermostat alert: alert 429 pairs with inverter flash 23, 427 with 21, 433 with 29, 434 with 53 — matching both confirms the diagnosis; mismatch means look again",
  "Most inverter faults are 'service soon' (auto-retry) until they hit strike counts within an hour, then lock out as 'service urgent' — a lockout clears by removing power to the outdoor unit, not just the stat",
  "Before replacing an inverter for voltage codes: check U/V/W connections, compressor winding resistance, compressor-to-ground, and incoming line voltage — most 'inverter faults' are compressor or supply problems",
], safety:"Inverter capacitors hold lethal charge after power-off — wait the labeled discharge time and verify with a meter before touching drive components.", confidence:"common" },
{ id:"s-trane-ifc-code-retrieval", equipment:"Gas Furnace", title:"Trane/American Standard — A951X IFC display and stored-code retrieval", summary:"Current Trane furnace boards show e-codes on a small display and store recent faults — pull the history before cycling power erases your evidence.", steps:[
  "Read the current display: operating status shows during normal run; fault codes (e01-e12 style, some with sub-digits like e2.2) display when active — table is in this app's Error Codes under Trane",
  "Note the code exactly including sub-digits — e2.2 (pressure switch stuck open) and e2.3 (stuck closed) are opposite problems",
  "Use the board's recall function to view stored recent faults (button sequence per the installer's guide in Manuals → Trane) before killing power",
  "Remember the display shows 'e0s' style characters on its segments — a '5' can render like 'S'; compare against the code list, not intuition",
  "After repair, clear stored codes and watch one full cycle so the history you leave behind is clean",
], confidence:"common" },
{ id:"s-york-flash-code-reading", equipment:"Gas Furnace", title:"York/Luxaire/Coleman — reading furnace flash codes (single LED)", summary:"JCI-family furnace boards use one LED with counted flashes, rapid flash, and steady states — each means something different.", steps:[
  "Watch the LED through the sight glass with the door on and count flashes between pauses — the count is the code (see York DGAA/DGAH table in Error Codes for that family; other models' tables are on the wiring diagram)",
  "Distinguish the special states: steady ON, steady OFF, rapid continuous flash, and a heartbeat flash are all distinct conditions — rapid flash commonly means reversed line polarity or flame sensed out of sequence",
  "A code that stops flashing when you pull the door means you opened the door switch — always read with the door in place",
  "On twinned or older units, verify which board revision you have — the same flash count can differ across generations; trust the label on the unit's own wiring diagram over memory",
  "Persistent no-LED with 24V present at the board = check the board's fuse, then the door switch, then the board itself",
], confidence:"common" },
{ id:"s-rheem-plusone-display", equipment:"Gas Furnace", title:"Rheem/Ruud R9x — PlusOne 7-segment diagnostics and blocked-drain sensor", summary:"Rheem's condensing furnaces carry a 7-segment diagnostic display and a patented blocked-drain sensor that shuts the furnace down on condensate backup — know both before diagnosing no-heat.", steps:[
  "Read the 7-segment display on the control board — it shows operational status and fault codes; the code legend is printed on the blower door/wiring diagram of the unit",
  "A water-related lockout is a Rheem signature: the blocked drain sensor stops the furnace BEFORE water damages the secondary heat exchanger — check the condensate trap, drain slope, and termination for blockage on any drain-related code",
  "On EcoNet-equipped systems, codes and alerts also appear on the EcoNet thermostat/app with plain-text descriptions — check there for history",
  "After clearing a drain issue, prime the trap per the install manual before restart — a dry trap causes pressure-switch faults that mimic venting problems",
  "For recurring pressure-switch codes on these units, verify vent/intake length and slope against the install manual tables (manual in Manuals → Rheem)",
], confidence:"common" },
{ id:"s-mitsubishi-led-selfdiagnosis", equipment:"Mini-Split", title:"Mitsubishi mini-split — indoor LED blink self-diagnosis and remote check mode", summary:"Mitsubishi units report faults by blinking the indoor operation/indicator LEDs and through a remote-control check function — get the real check code instead of guessing.", steps:[
  "Count the indoor unit's OPERATION INDICATOR blink pattern — repeated N-blink cycles map to fault groups (per the model's service manual; MXZ outdoor service manual is in Manuals → Mitsubishi)",
  "Use the remote's check/self-diagnosis mode (varies by remote: hold CHECK, point at unit) — the unit beeps when the displayed code matches the stored fault, giving an exact check code like P8, U6, E6",
  "On MXZ multi-zone systems, check the outdoor board LEDs too — outdoor faults report per-port and the indoor blink alone won't tell you which branch",
  "Power-cycle only AFTER recording codes — a restart clears the active display and can temporarily 'fix' inverter faults, guaranteeing a callback",
  "Compare refrigerant-side symptoms against the check code family: P codes = protection trips (pressure/temp), U codes = system/communication, E/F codes = board-level — it focuses the physical inspection",
], confidence:"common" },
{ id:"s-minisplit-forced-cool-test", equipment:"Mini-Split", title:"Mini-split forced/test cooling mode — commissioning and diagnosis without waiting on setpoints", summary:"Every major mini-split brand has a forced-operation mode that runs the system at fixed output regardless of room temperature — the right way to test charge and operation.", steps:[
  "Find the brand's entry method: typically holding the indoor unit's manual emergency button (Daikin: ON/OFF button 5s; Mitsubishi: emergency operation button; others per manual) or a remote key combo starts forced cooling",
  "Forced cooling runs the compressor at a defined fixed speed — this is the ONLY valid condition for checking operating pressures/charge on most inverter mini-splits; normal operation modulates and makes gauge readings meaningless",
  "Use it to separate control problems from mechanical: if forced mode runs perfectly but normal mode won't, the issue is sensors/remote/settings, not the sealed system",
  "Time-limit awareness: most brands auto-exit forced mode after 30 minutes — plan measurements inside the window",
  "Exit deliberately (button press or remote command) and confirm the unit returns to normal thermostat-driven operation before leaving",
], confidence:"common" },
{ id:"s-daikin-fit-mode-display", equipment:"Condenser/Heat Pump", title:"Daikin FIT outdoor unit — using the 3-digit mode display for fault history and monitoring", summary:"The FIT outdoor board's 3-digit display isn't just for showing faults — it has menus for fault history, live monitoring, and setup that most techs never open.", steps:[
  "Find the display and its three buttons (TEST/RECALL/LEARN area) on the outdoor control board — modes available: FAULT CODE, FAULT HISTORY, MONITORING, SETTING MODE 1 and 2",
  "FAULT HISTORY stores past codes — read it before power-cycling; an intermittent E-code that cleared still lives here",
  "MONITORING mode shows live values (temps, pressures, compressor status) — compare the board's own sensor readings against your instruments to find drifted thermistors without unplugging anything",
  "The same codes show as E-codes on the communicating thermostat — the board display shows the 2-digit version (e.g., thermostat E24 = display 24); both map in this app's Error Codes",
  "E11 on the thermostat isn't a fault — it means the required SYSTEM START-UP TEST hasn't been run; start it from the thermostat installer menu and the code clears on completion",
], confidence:"common" },
{ id:"s-daikin-fit-comm-dipswitch", equipment:"Condenser/Heat Pump", title:"Daikin FIT — communication errors and the DS1/DS7 termination dip switches", summary:"Persistent FIT communication faults after wiring checks out often come down to bus termination — the dip switches change termination resistance and there are only 4 combinations.", steps:[
  "Do the wiring basics first: 1-to-1 and 2-to-2 everywhere (never reversed), no more than two wires per terminal, solid connections — communication errors are wiring until proven otherwise",
  "Check the board LEDs: red comm LED 1-flash = communication failure; green receive LED solid ON = data lines miswired/shorted (1-2 reversed or shorted to R/C); rapid green flashing = healthy traffic",
  "Press the LEARN button ~5 seconds to reset the network after any wiring correction",
  "If errors persist, work the four DS1 (outdoor) / DS7 (indoor) termination combinations one at a time per the manual's table, powering down between changes — long or unusual wire runs sometimes need non-default termination",
  "Measure DC bias across the data pair: 0.6-0.9 VDC is healthy; outside that after all the above points to a failed board on the bus",
], confidence:"common" },
{ id:"s-trane-condenser-no-diagnostics", equipment:"Condenser/Heat Pump", title:"Trane XR-series condenser — diagnosing with no fault codes to lean on", summary:"Standard single-stage Trane/AmStd condensers have no diagnostic board — the discipline is a fixed electrical-then-refrigerant sequence so nothing gets skipped.", steps:[
  "Verify the call: 24V between Y and C at the condenser low-voltage connections — no Y means the problem is upstream (stat, wiring, indoor board), not the condenser",
  "Contactor: 24V at the coil? Pulled in? Voltage through the contacts under load? A pitted contactor that drops voltage under load starts fans but stalls compressors",
  "Capacitor: test the dual run cap against its labeled MFD (±6%) — the single most common failure; check both HERM and FAN sections",
  "Motors: compressor and fan amp draws against RLA/FLA on the nameplate — use the Tag Scanner tab to decode the nameplate if it's faded",
  "Only then refrigerant: pressures, superheat/subcooling per the charging chart inside the service panel — jumping to gauges first wastes the visit on electrical failures",
], confidence:"common" },

// ================= GENERAL FIELD FLOWS =================
{ id:"s-hp-defrost-board-force-test", equipment:"Condenser/Heat Pump", title:"Force-testing a heat pump defrost board and termination sensor", summary:"Don't wait 30-90 minutes to see a defrost problem — force the cycle and ohm the sensor, and you'll know in five minutes whether the board, sensor, or conditions are at fault.", steps:[
  "Find the defrost test pins/speed-up terminals on the defrost board (labeled TEST/SPEED-UP on most brands) — shorting them accelerates the defrost timer many times over so a full interval passes in seconds",
  "With the unit running in heating, jump the test pins: a healthy system shifts the reversing valve, stops the outdoor fan, and runs a defrost — if nothing happens with coil temp below the initiation point, suspect board or sensor",
  "Ohm the defrost/coil sensor against its temperature curve (chart on the wiring diagram or service manual) — a sensor reading warm when the coil is iced never initiates; one reading cold forever never terminates and the unit blows cold steam clouds every cycle",
  "Check sensor placement: it must be clamped tight to the specified coil location — a sensor hanging in air reads air temp and wrecks the whole defrost logic",
  "Distinguish demand-defrost boards (initiate on temperature/pressure logic) from time-temperature boards (30/60/90 pin setting) — on time-temp boards also verify the interval pin matches the climate",
], confidence:"common" },
{ id:"s-hp-cold-blow-normal-temps", equipment:"Condenser/Heat Pump", title:"Heat pump 'blowing cold air' complaint — what supply temps are actually normal", summary:"Heat pump supply air at 85-95°F feels cool to a hand that expects a gas furnace's 120°F+ — separate normal heat pump physics from a real capacity problem before touching anything.", steps:[
  "Measure real numbers first: supply and return temp with a probe — a heat pump in heating typically delivers 15-30°F rise; 88°F supply on a 70°F return is NORMAL and still heats the house",
  "Body context: 90°F air is below skin temperature (~93°F), so it feels cool blowing on skin even while adding heat to the room — this explains most 'it blows cold' calls on working systems",
  "Check against conditions: capacity and supply temp drop as outdoor temp drops — compare measured rise against the unit's performance table for today's outdoor temp before condemning",
  "Real problems separate out fast: rise under ~12°F warrants checking charge, defrost behavior (is it stuck in cooling mode — reversing valve?), and whether aux heat is staging when it should",
  "During defrost the system literally runs in cooling briefly and supply goes cold with steam off the outdoor coil — a homeowner catching this moment reports 'cold air and smoke'; it's normal",
], confidence:"common" },
{ id:"s-refrigerant-id-no-mixing", equipment:"Condenser/Heat Pump", title:"Identifying the refrigerant before connecting anything — R-22 / R-410A / R-32 / R-454B", summary:"The nameplate tells you the refrigerant, and the A2L era makes guessing dangerous: different pressures, different oils, different service rules, and mixing is never acceptable.", steps:[
  "Read the refrigerant off the data plate every time (use the Tag Scanner tab) — R-22 (older, phased out), R-410A (the last 15+ years), R-32 and R-454B (current A2L mildly-flammable blends) all look identical from the outside",
  "Never mix: topping an R-22 system with 410A (or 410A with 32) creates an unrateable mixture with wrong pressures — a contaminated system must be recovered completely into a dedicated cylinder",
  "A2L units (R-32/R-454B) carry flammable-refrigerant markings and require A2L-rated recovery machines, hoses, detectors, and cylinders — verify your equipment rating before opening the system",
  "Pressure sanity check confirms the label: at rest, saturated pressure at ambient differs by refrigerant (R-410A ~ 200+ psig at 70°F, R-22 ~ 121, R-32 slightly above 410A) — a wildly-off static reading suggests a mixed or mislabeled system",
  "Each refrigerant pairs with its oil (R-22/mineral, 410A-32-454B/POE) — cross-contamination sludges systems; keep gauge sets dedicated where practical",
], safety:"R-32 and R-454B are A2L (mildly flammable): no open flame near a charged circuit, ventilate before brazing, use A2L-rated service equipment. Never braze on a system containing refrigerant.", confidence:"common" },
{ id:"s-lv-short-hunt-method", equipment:"Other", title:"Hunting a low-voltage short methodically (3A/5A fuse keeps blowing)", summary:"The board fuse pops the moment power lands — divide the 24V circuit instead of throwing fuses at it.", steps:[
  "Confirm it's a real short: replace the fuse once with power off, disconnect the thermostat wires at the board (leave R/C only) and power up — fuse holds = the short is out in the field wiring or a connected device, not the board",
  "Divide and conquer: reconnect one conductor at a time (Y, then W, then G, then O/B, then accessories) powering between each — the wire that pops the fuse names the circuit",
  "Follow that circuit to the usual suspects: staples cutting stat wire, wire rubbed bare at the condenser entry hole or under the air handler panel, a shorted damper/zone actuator, a failed contactor coil, or a pinched wire under the thermostat baseplate",
  "If the fuse blows with ALL field wiring off the board, the short is on the equipment side: unplug on-board loads/connectors one at a time (inducer, gas valve, transformer secondary legs) to isolate",
  "Intermittent blowing that only happens in cooling or in wind points at the outdoor wire run moving against metal — wiggle-test the run at the condenser while watching a meter across the fuse",
], confidence:"common" },
{ id:"s-thermostat-communicating-vs-conventional-swap", equipment:"Other", title:"Why a Nest/ecobee can't replace a communicating thermostat (and what to do instead)", summary:"On two-wire communicating systems (Infinity, Evolution, iComfort, ComfortNet, Daikin One) the thermostat is the system's brain — swapping in a conventional stat either fails outright or cripples the equipment.", steps:[
  "Identify the system first: two data wires (A/B, 1/2, RS-bus) instead of R/G/Y/W conventional wiring, and brand-matched thermostat = communicating — check before quoting any thermostat swap",
  "Understand the tradeoff: communicating stats carry staging logic, airflow settings, fault display, and dealer diagnostics; replacing one with a conventional stat loses modulation/communication features even when a '24V compatibility mode' exists",
  "Some equipment offers a legacy/24V fallback mode (jumpers or settings per the install manual) that runs reduced staging from a conventional stat — check the indoor unit's manual in Manuals before promising anything",
  "Homeowner wants a smart stat on a communicating system: the brand's own smart stat (S40, Infinity/Evolution touch, Daikin One+) IS the answer — same features, app control, and full system function",
  "Never leave a communicating outdoor unit paired with a conventional stat without confirming staging, defrost, and airflow behavior — 'it runs' is not 'it runs right'",
], confidence:"common" },
{ id:"s-duct-exterior-sweating-humid", equipment:"Air Handler", title:"Ducts and equipment sweating in humid weather — condensation on the outside", summary:"Water dripping from duct exteriors, plenums, or the air handler cabinet in humid conditions isn't a refrigerant problem — it's surface temperature below dew point.", steps:[
  "Confirm the source is condensation, not a leak: sweating is uniform film/droplets on cold surfaces (metal duct, boots, cabinet panels), while drain leaks trail from a point",
  "Check insulation integrity: missing, compressed, or unsealed duct insulation lets humid air reach cold metal — repair with proper vapor-barrier-faced insulation and seal the facing seams tight (the vapor barrier matters more than the R-value)",
  "Check the space's humidity load: sweating ducts in a vented crawlspace or open-to-outside attic during humid spells may need the space addressed (vapor barrier, sealing) as much as the duct",
  "Boots and registers sweating into ceiling drywall: seal the boot-to-drywall gap and insulate the boot — leaking room air around the boot is the usual cause",
  "Persistent cabinet sweating: verify airflow is right (low airflow = colder coil = colder cabinet) and consider raising blower CFM within spec before wrapping the cabinet",
], confidence:"common" },
{ id:"s-nameplate-model-decode", equipment:"Other", title:"Decoding capacity and details from a model number in the field", summary:"Most residential model numbers embed capacity: AC/HP digits are thousands of BTU (divide by 12 for tons), furnace digits are input BTU — plus the Tag Scanner tab does this automatically from a photo.", steps:[
  "Cooling equipment: find the 2-3 digit group divisible by 6 — 018=1.5 ton, 024=2, 030=2.5, 036=3, 042=3.5, 048=4, 060=5 (BTU thousands ÷ 12 = tons)",
  "Furnaces: the embedded number is INPUT BTU in thousands (040, 060, 080, 100, 115...) — output = input × AFUE, which is what actually heats the house",
  "Furnace model letters usually encode AFUE and staging too (e.g., 9=90%+, S=single-stage, C/T=two-stage, V=variable) — brand conventions differ; when in doubt use the Tag Scanner or the spec sheet in Manuals",
  "Air handler numbers embed nominal tonnage the same way as AC (024-060); coil widths ride along in many models (e.g., 17/21/24.5 inch cabinets)",
  "Take the photo anyway: snap every data plate into the Tag Scanner tab — it extracts model/serial, identifies the unit, and links you straight to its codes and manuals",
], confidence:"common" },
{ id:"s-twostage-furnace-stuck-low", equipment:"Gas Furnace", title:"Two-stage furnace never reaches high fire (or starts in high and never drops)", summary:"Staging problems hide behind 'it heats, just slowly' — how staging is commanded decides where to look: thermostat, board timer, or gas valve.", steps:[
  "Determine the staging scheme first: two-stage stat wired with W1+W2 (stat commands stages), single-stage stat with the board's timer jumper (furnace self-stages after X minutes), or communicating (algorithm decides) — the wiring diagram tells you",
  "Stat-controlled: call for a big temperature rise and verify 24V lands on W2 at the board — no W2 means stat settings/wiring; W2 present with no high fire means board or gas valve",
  "Timer-based: confirm the jumper/dip setting for stage delay and wait it out on a test call — many 'stuck in low' furnaces are just set to a long delay and satisfy small calls on low (which is correct behavior)",
  "At the gas valve: verify the second-stage solenoid gets voltage on high-fire command and that manifold pressure steps up to the high-fire spec (both pressures are on the rating plate) — voltage without pressure rise = valve; no voltage = board",
  "Verify combustion/venting supports high fire: a marginal vent or starved combustion air can cause pressure-switch dropout only at high fire, bouncing the furnace back to low — watch the high-fire pressure switch through a full cycle",
], confidence:"common" },
{ id:"s-lennox-slp99-vent-calibration", equipment:"Gas Furnace", title:"Lennox SLP99/SLP98 — pressure switch won't prove, furnace keeps running 'vent calibration' or locks out", summary:"These furnaces self-calibrate their pressure switch trip points. If the switch doesn't prove within 2-1/2 minutes the control automatically runs a vent calibration; four failed calibrations in a row means a 1-hour soft lockout — usually a venting problem, not a board problem.", steps:[
  "Understand the sequence: at heat call the inducer runs, and if the pressure switch differential doesn't close the switch within 2-1/2 minutes, the inducer stops and the control initiates a vent calibration; it retries calibration up to 3 more times, then goes into a 1-hour soft lockout",
  "Check the actual venting first: intake/exhaust terminations for blockage (snow, ice, debris, nests), total vent length and elbow count vs. the sizing tables, and sagging/flooded sections holding condensate",
  "Check the pressure switch tubing and cold-end header box ports for kinks, cracks, or water; drain and inspect the condensate trap — a plugged trap backs water into the header box",
  "Measure inducer pressure at the switch taps with a manometer during a heat call and compare to the switch ratings printed on it",
  "To force a manual calibration: enter Field Test mode (hold the diagnostic button until a flashing '-' is shown), then press and hold until a solid 'C' displays and release — the furnace runs high-fire and low-fire pressure switch calibrations and displays 'CAL' while doing it",
  "E250 = unable to complete a successful pressure switch calibration; fix the physical vent/tubing problem before condemning the switch or the control",
], confidence:"common" },
{ id:"s-lennox-surelight-error-recall", equipment:"Gas Furnace", title:"Lennox SLP99/SLP98/G71MPP — pulling and clearing the stored error history from the diagnostic button", summary:"The board stores the last 10 error codes. On intermittent no-heat calls, pull the history before doing anything else — it tells you what actually happened at 2 AM.", steps:[
  "Find the diagnostic push button next to the 7-segment LED on the integrated control",
  "Press and HOLD the button — the menu cycles to a new item every 5 seconds; release when the item you want is displayed",
  "Release on solid 'E' to enter Error Code Recall mode: the display plays back the 10 most recent stored codes — write them down and look each one up in Error Codes → Lennox",
  "To clear the history: from the recall menu, release the button on solid 'c', then press and release ONE more time while the 'c' is flashing (within ~10 seconds) to confirm — a cleared history cannot be recovered, so only clear after recording it and finishing the repair",
  "To exit recall mode, hold the button until the solid three-horizontal-bars symbol displays, then release",
  "Same button/menu system on SLP98, SLP99 and the older G71MPP — on power-up these controls display the unit size code, and three bars + E203 instead means the size code needs configuring (separate scenario)",
], confidence:"common" },
{ id:"s-lennox-slp99-field-test-mode", equipment:"Gas Furnace", title:"Lennox SLP99/SLP98/G71MPP — using Field Test mode to hold a firing rate for combustion testing", summary:"Field Test mode lets you force and hold low, mid, or high fire with simple R jumpers — the right way to set gas pressures and run combustion analysis on a modulating furnace that otherwise won't sit still.", steps:[
  "Enter: press and hold the diagnostic button, release when the LED flashes '-' (menu changes every 5 seconds)",
  "Jumper R to W1 = ignite and hold LOW fire; jumper R to W1+W2 = ignite and hold HIGH fire; jumper R to W2 = ignite and hold MID fire",
  "Apply then remove the R-to-W1+W2 jumper to step the rate low → mid → high",
  "While in Field Test the display shows current firing rate, blower CFM, and flame signal — use it to verify flame current instead of breaking into the sensor circuit",
  "All safety switches stay live in this mode (nothing is bypassed) and blower behavior follows the DIP settings, so readings reflect real operation",
  "Exit: hold the button until the menu resumes, or cycle main power; the control also auto-exits after 45 minutes",
], confidence:"common" },
{ id:"s-lennox-soft-disable-two-bars", equipment:"Gas Furnace", title:"Lennox communicating system — control displays two horizontal bars (soft disable)", summary:"Two horizontal bars on a Lennox board means the thermostat found a device on the communication bus it doesn't recognize and parked it in 'soft disable' until it's configured — common after swapping a board or adding a damper control module.", steps:[
  "Two bars = soft disabled, waiting on configuration; three bars + E203 is a different state (missing unit size code)",
  "Confirm proper communication wiring between ALL devices — thermostat, damper control module, indoor unit, outdoor unit",
  "Cycle power to the control that is displaying the soft disable code",
  "Run the room thermostat through its setup/commissioning again so it re-discovers the device",
  "If it still won't clear: on the thermostat go to Setup → System Devices → Thermostat → Edit → press 'reset'; if needed repeat and press 'resetAll' to rebuild the whole device list",
], confidence:"common" },
{ id:"s-lennox-r454b-leak-response", equipment:"Gas Furnace", title:"Lennox R-454B (K models) — 'system shut down by itself and the blower took off on high' / E150 leak response", summary:"On SLP99UHV-K and other R-454B systems, the furnace board runs the A2L leak-mitigation sequence: it kills the R output to the thermostat (no heat, no cool), purges on high-speed blower, and resumes on its own. Know the sequence so you don't chase it as a blower or board fault.", steps:[
  "Leak-detected sequence per Lennox: board shuts off 24VAC (R) to the thermostat — compressor, gas heat, and strip heat all drop out; blower runs HIGH to purge refrigerant from cabinet, plenum, and ductwork; once levels are below threshold the blower finishes a 7-minute cycle, then normal operation resumes automatically",
  "Check the furnace display for E150 (leak detected) — the code cannot be cleared while a sensor still smells refrigerant",
  "Treat it as a real A2L leak until proven otherwise: ventilate, no ignition sources, leak-search the indoor coil and line connections with an appropriate detector",
  "Repeated purge cycles = an active leak; a leak left alone will eventually take the system down on a low-pressure limit — find and repair it, then verify charge",
  "If the blower runs CONSTANTLY (not 7-minute cycles), that's the Fault mode — a sensor or config problem, not necessarily a leak: look for E151/E152 (sensor fault), E154/E155 (sensor comm/DIP config), E160/E161 (wrong sensor type)",
  "After any sensor/coil work, press the Low GWP test button on the furnace control to retest and confirm the system returns to Normal mode",
], confidence:"common" },
{ id:"s-lennox-r454b-sensor-dip-config", equipment:"Gas Furnace", title:"Lennox R-454B furnace — blower runs continuously after install/board swap (LGWP sensor DIP switches)", summary:"The K-model furnace control ships with both leak-sensor DIP switches ENABLED. If the actual sensor count doesn't match the DIP settings — furnace-only jobs, R-410A coils, or a missed sensor plug — you get faults on power-up and a blower that never shuts off.", steps:[
  "Match the DIP switches to the hardware: one sensor = LGWP1 Enable / LGWP2 Disable; two sensors = both Enable; no sensor (furnace-only, heat-only, or R-410A coil) = both Disable; Disable/Enable (1 off, 2 on) is an INVALID configuration",
  "Single-sensor jobs: the sensor must be plugged into the LGWP1 (SENSOR 1) plug — a lone sensor on LGWP2 faults",
  "Factory default is both switches ENABLE — on a non-R-454B application the sensors must be disabled or the blower will run continuously",
  "Check the physical connection: Molex clip locked into the plug, no dust/debris/moisture, wire routed through the grommet with a drip loop below the board (upflow) so condensate can't track onto the control",
  "Confined-space applications take a second sensor on LGWP2 — see the evaporator coil install instructions for when it's required",
  "After correcting, power-cycle and press the Low GWP test button to verify; E154 with good wiring usually means the DIP configuration is still wrong",
], confidence:"common" },
{ id:"s-lennox-slp99-ignition-sequence", equipment:"Gas Furnace", title:"Lennox SLP99/SLP98 — no heat: where in the ignition sequence does it die?", summary:"Knowing the exact factory sequence lets you catch the failure point live instead of guessing: pressure switch proof → 15-s prepurge → 20-s ignitor warmup → 4-s trial × 5 → Watchguard lockout.", steps:[
  "Before anything runs, the control checks the low-fire pressure switch is OPEN — a closed/bypassed switch at idle blocks the heat cycle from ever starting (and jumping the switch out makes it worse, not better)",
  "Inducer starts on ignition speed; switch must prove within 2-1/2 minutes or the control drops into vent calibration (see the vent-calibration scenario)",
  "Switch proves → 15-second prepurge → SureLight ignitor warms 20 seconds → gas valve opens for a 4-second trial, ignitor stays hot until flame is sensed",
  "No flame in the 4-second trial: the control retries up to 4 more times (5 total) with a 35-second interpurge/warm-up between trials — watch which trial fails and how (no glow = ignitor circuit; glow but no light-off = gas supply/valve; lights then drops = flame sensing)",
  "After 5 failed trials the control enters Watchguard–Flame Failure and waits 60 minutes before automatically restarting the sequence — a furnace that 'fixes itself every hour' is riding this cycle",
  "Pull the stored error history (diagnostic button, solid 'E') to see which fault the board actually logged rather than inferring it",
], confidence:"common" },
{ id:"s-lennox-slp99-condensate-shared-drain", equipment:"Gas Furnace", title:"Lennox SLP99 — water in the heat exchanger / condensate backing up on shared furnace+coil drains", summary:"When the furnace and evaporator coil share one condensate drain, Lennox specs a vent at an exact height. Too tall a vent and one plugged drain line can flood the heat exchanger.", steps:[
  "On a shared drain, the field-provided vent must rise 1\" minimum to 2\" maximum above the condensate drain outlet connection in UPFLOW, and 4\" minimum to 5\" maximum in HORIZONTAL — anything above the max can flood the heat exchanger if the combined primary drain restricts",
  "Slope the condensate line a minimum of 1/4\" per foot from furnace to trap/drain; the trap can be installed up to 5 feet from the furnace on PVC",
  "In horizontal installs the trap must extend below the unit (8\" service clearance) and a secondary drain pan under unit and trap is recommended",
  "On a water-in-furnace call: pull and clean the trap and clean-out, verify the vent height against the numbers above, and check the shared line for the restriction that started it",
  "Prime the trap with water before startup so flue gases don't blow through a dry trap",
], confidence:"common" },
{ id:"s-lennox-zoning-central-mode", equipment:"Other", title:"Lennox Smart Zoning/iHarmony — system stuck in 'central mode', zones not working, '--' on the display", summary:"When any zone sensor drops off the bus or two sensors share a zone number, the whole system falls back to central mode (one big zone). The fix is usually addressing, wiring, or a re-configure — not a new panel.", steps:[
  "Central mode = zoning disabled, thermostat runs everything as one zone, indoor temp may show '--' — triggered by any zone sensor losing communication with the damper control module (DCM)",
  "Check zone numbering first: each wall sensor must be set to a unique zone (2, 3, or 4 — the S30/S40 thermostat itself is always zone 1); two sensors on the same number causes the double-dash condition",
  "Check the alert list on the thermostat: 551 = lost comm, and the matching 542/543/544/545 code identifies WHICH zone sensor dropped",
  "Inspect the wiring between the DCM and the reporting sensor — loose or mis-wired connections are the listed cause; tie unused conductors together to cut electrical interference",
  "When replacing a zone sensor, set the new sensor's address to MATCH the one it replaces before expecting it to work",
  "After any fix, run the re-configure procedure from the thermostat (Zone Control Settings after initial commissioning) so the system re-discovers the sensors — comm restoration alone returns it to zone operation, but re-addressing needs the re-configure",
], confidence:"common" },
{ id:"s-lennox-zoning-dcm-leds", equipment:"Other", title:"Lennox Smart Zoning/iHarmony — reading the damper control module LEDs before condemning anything", summary:"The DCM board tells you its state directly: three green LEDs for comms/status and three red LEDs for damper closed, Zoning Off, and pressure switch open.", steps:[
  "Green LEDs: RSBus communication, board status, and Zone Sensor communication — a FLASHING green status LED at power-up means the DCM is functioning normally, not faulting",
  "Red LEDs: damper closed operation, Zoning Off operation, and pressure switch open — a lit red isn't automatically a failure, it's a state indicator",
  "Expect a 5-minute minimum off-time delay when the control first powers on — only the fan output responds during it; don't diagnose a no-cool/no-heat inside that window",
  "If a zoning-related alert occurs, the system defaults to Zoning Off mode with ALL DAMPERS OPEN — full airflow everywhere plus a red Zoning Off LED means look for the alert on the thermostat, not at the dampers",
  "Diagnostic codes are stored on the S30/S40 thermostat's Alerts screen — pull them there; the DCM itself auto-resets after an operation error or power failure",
], confidence:"common" },
{ id:"s-lennox-zoning-changeover-timing", equipment:"Other", title:"Lennox Smart Zoning/iHarmony — 'system keeps flip-flopping between heating and cooling zones' (normal changeover logic)", summary:"With opposing heat and cool demands in different zones, the system runs a 20-minute changeover cycle by design. Know the timings before calling it a fault.", steps:[
  "When one zone wants heat and another wants cool, the current demand gets a 20-minute window; if it isn't satisfied in time, the equipment shuts off, waits 5 minutes for pressures/temps to stabilize, then serves the opposing demand",
  "This cycle repeats as long as simultaneous opposing demands exist — alternating operation on a hot-upstairs/cold-downstairs day is normal behavior, not short-cycling",
  "Every terminated demand starts a 5-minute minimum off-time delay — factor it in when watching the system respond",
  "Second-stage cooling stages up when discharge air runs 7°F above the cooling-stage setpoint; second-stage heat when discharge air runs below the heating-stage setpoint (set on the S40)",
  "If customers complain about the alternation, address the load imbalance (setpoints, duct balance, zone layout) — the timing itself isn't adjustable at the panel",
], confidence:"common" },
{ id:"s-lennox-zoning-transformer-fuse", equipment:"Other", title:"Lennox Smart Zoning/iHarmony — dead panel or dampers not driving (transformer jumper + 3A fuse)", summary:"The DCM's transformer jumper decides what gets powered from where — set it wrong and the dampers have no power even though the panel looks alive. A 3A slow-blow fuse protects against field-wiring shorts.", steps:[
  "Check the transformer jumper: DMPR XFMR (external transformer — the factory default) powers the DCM, zone sensors AND zone dampers; SYS XFMR (indoor unit transformer) powers ONLY the DCM and zone sensors",
  "On SYS XFMR, the zone dampers MUST have their own separate external transformer — panel up, sensors up, dampers dead is the classic symptom of a missing damper transformer",
  "Confirm 24VAC supply is in the 18-30VAC range at the panel",
  "Dead panel: check the 3A slow-blow fuse — it protects against shorts in the thermostat and damper field wiring; if it re-blows, hunt the short in the field wiring before replacing it again (see the low-voltage short-hunt scenario)",
  "Terminal G drives continuous IAQ blower operation; the panel automatically shifts the blower from continuous speed to the proper zone heat/cool speed when a demand starts",
], confidence:"common" },
{ id:"s-lennox-zone-sensor-placement", equipment:"Other", title:"Lennox zone sensor (17A30) — zone reads wrong temperature after install (placement and sealing gotchas)", summary:"Straight from the installer checklist: most 'bad zone sensor' temperature complaints are drafts through the wall hole or bad mounting locations, not electronics.", steps:[
  "Seal the wire hole in the wall behind the sensor with suitable material — drafts entering the sensor case skew the internal temperature sensor (top checklist item for a zone reading cold/hot)",
  "Never mount on an exterior wall, near ventilation outputs, doorways, or anywhere direct sunlight can hit the sensor",
  "Mount solidly to a stud or wall; verify all terminal wiring is connected and tight, using proper thermostat wire gauge",
  "Wire unused conductors together to minimize electrical interference with the sensor electronics",
  "Verify the zone address was set correctly at first power-up (2, 3, or 4), and on a replacement, that the new sensor matches the old sensor's address",
], confidence:"common" },
{ id:"s-daikin-fit-early-warning-codes", equipment:"Condenser/Heat Pump", title:"Daikin FIT — thermostat shows a plain number code (14, 16, 33, 52-57) but the unit keeps running", summary:"FIT inverters run paired fault codes: the E-code (E13, E15, E21...) is the critical shutdown, and a plain-number twin (14, 16, 54...) means the same condition is happening 'frequently' but the control decided it can keep running. Those numbers are your early warning — the cheapest repair happens before the E-code lockout.", steps:[
  "Know the pairs: 14 = frequent high-pressure (E13's warning), 16 = frequent low-pressure (E15), 52 = frequent compressor faults, 53 = frequent fan/board faults, 54 = frequent low discharge-superheat (E21), 55 = frequent high discharge-temp, 33 = board running hot, 57 = board cooling loop sweating",
  "These plain-number codes show on the thermostat ONLY — the outdoor board LED shows nothing, so don't rule out the complaint just because the board display is clean",
  "Treat each one as the underlying refrigeration problem it names: check stop valves fully open, coil cleanliness, charge level, line restrictions, and the sensors involved — not as a nuisance alert to clear",
  "On 3.5-5.0 ton FIT (and 3.0-4.0 ton Enhanced Capacity), the control board is refrigerant-cooled: codes 33 and 57 point at the cooling bracket hardware — thermal grease, bracket screws, and flow through the board cooling circuit",
  "Frequent-fault codes latch from repeated events — after fixing the cause, clear the fault history via the outdoor unit's mode display so you can confirm the condition stopped recurring",
  "If the matching E-code is already in history, the system has been hard-faulting too — pull the full history before deciding how urgent the repair pitch is",
], confidence:"common" },
{ id:"s-daikin-one-system-tests", equipment:"Condenser/Heat Pump", title:"Daikin One+ / One Touch — running system tests, charge verification, and error history from the thermostat (v3.9 menus)", summary:"On unitary Daikin systems the thermostat's System Optimization menu is the test bench: System Test, Charge Verification Mode with live status codes, forced-run Optional Tests, and the stored Error History. Know the paths before opening a panel.", steps:[
  "System Optimization (setup step 4) holds: System Test, Charge Verification Mode, Optional Tests, Error History, Calibration, Status, and Remote Sensors",
  "System Test (inverter AC/HP only): status 0 = 'System test required', 1 = 'Initial test successful' — a brand-new install that never ran the test will sit at 0",
  "Charge Verification Mode (separate R-410A and R-32 versions): watch the live status — 1 = outdoor temp out of range (use gauges instead), 2 = system stabilizing, 3 = outdoor fan speed not in range, 4 = compressor speed not in range, 5 = indoor superheat not in range, 6 = in range with the SubCool value displayed, 7 = subcool in range/confirming — it tells you the charge verdict without hooking gauges when conditions allow",
  "Refrigerant Leak Test lives under Optional Tests on R-32 EEV air handlers only — run it after any A2L sensor or coil work",
  "Optional Tests also force-run Cooling, Fan, Heat Pump Heat, Gas Heat, and Electric Heat — each runs until you press Stop (or setup completes), which is the clean way to hold a mode for measurements",
  "Pump Down test appears on all-climate heat pumps, Enhanced 5-ton, and some older inverter models — use it instead of trying to pump down an inverter manually",
  "Error History shows date/time, code, equipment, and description for each stored fault, with a clear option — pull it before clearing anything; menu availability varies by equipment and software version (this outline is v3.9)",
], confidence:"common" },
{ id:"s-daikin-one-status-live-data", equipment:"Condenser/Heat Pump", title:"Daikin One+ / One Touch — using the Status pages as live gauges (EEV %, superheat, CFM, current errors)", summary:"The thermostat's Status pages stream live equipment data — often enough to diagnose airflow, EEV, and charge behavior before connecting a single tool.", steps:[
  "Status shows 'current critical error' and 'current minor error' directly — check these first; the minor-error slot is where the early-warning codes (14/16/33/52-57) live",
  "Airflow: compare current indoor CFM against current/requested fan demand — a big gap points at duct restriction or motor cutback before you ever drop a static probe",
  "Refrigeration: OD EEV opening % (FIT / 20-SEER models), liquid EEV opening %, and indoor superheat (EEV air handlers, in cooling) give you live circuit behavior; refrigerant type and a 'refrigerant leak detected' flag show on R-32 EEV air handlers",
  "Heat side: requested vs current heat demand, electric heat stages (R-32 EEV air handlers), and powerful-heating status (R-32 inverters)",
  "Cold-climate hardware states are visible too: crankcase heater, drain pan heater, preheat and preheat wattage, ID coil freeze protection (FIT / late-'22 20-SEER models)",
  "Fields appear only when the equipment supports them — a missing field usually means that model/software doesn't report it, not a fault; this outline is v3.9 software",
], confidence:"common" },
];
