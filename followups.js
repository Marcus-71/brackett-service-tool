// Narrowing questions for Diagnostic Help.
//
// Keyed by scenario id. After a tech opens a scenario, these ask the
// discriminating checks one at a time and land on a plain-language verdict,
// so a symptom becomes an answer instead of a checklist to interpret.
//
// An option either ends the path with `verdict`, or points to a later
// question with `next` for a multi-step narrowing chain. Every number that
// appears here is grounded in the parent scenario's own text - nothing is
// invented, because a tech will measure against it in the field.
const SYMPTOM_FOLLOWUPS = {
  "s-24v-at-thermostat-and-heater-relays": [
    {
      ask: "With the thermostat calling for cooling, check for 24 volts at thermostat wires C and R in the indoor unit control panel.",
      options: [
        { label: "No 24 volts at C and R", verdict: "Trouble in the thermostat, the wiring, or the transformer source. Kill power, check continuity of the thermostat and its wiring, and repair or replace." },
        { label: "24 volts present at C and R", next: 1 },
      ],
    },
    {
      ask: "Set the room thermostat well above room temperature so both stages call for heat, then check for 24 volts at each heater relay in turn.",
      options: [
        { label: "No voltage at one or more heater relays", verdict: "That points back to the thermostat or wiring, not the heater. Account for how the heaters are wired - outdoor thermostat and similar controls - and check each safety device for continuity." },
        { label: "24 volts at every heater relay", verdict: "The low-voltage side is proven all the way through to the heaters. Move on to the elements and their safeties." },
      ],
    },
    {
      ask: "On this communicating install, measure the thermostat wire run length.",
      options: [
        { label: "18 AWG run longer than 250 feet", verdict: "That exceeds the limit for this platform. Correct the run before chasing intermittent low-voltage faults." },
        { label: "Run is under 250 feet", verdict: "Wire length is within spec, so it is not the cause of intermittent behavior here." },
      ],
    },
  ],
  "s-24v-collapses-under-load": [
    {
      ask: "With the coil connected and the system calling, read across the contactor coil and then across the transformer secondary. What do you see?",
      options: [
        { label: "The coil reads close to what the transformer reads", verdict: "The control circuit is delivering. If the contactor still is not pulling in, the coil is open or the armature is mechanically stuck - ohm the coil and try the armature by hand." },
        { label: "Transformer reads normal, coil reads well below it", verdict: "You have unwanted resistance in the control wiring. Read across each connection along the run - whichever one has voltage across it is the bad one." },
        { label: "The transformer secondary itself sags once the load is on", verdict: "Look at the transformer. It may be undersized or overloaded by accessories added after install, or its primary supply is sagging. Add up connected VA and check the primary voltage under load." },
      ],
    },
  ],
  "s-acid-test-after-compressor-failure": [
    {
      ask: "Pull a clean oil sample and run an acid test kit per its instructions. What does the color change show?",
      options: [
        { label: "Positive / high acid", verdict: "That confirms an electrical burnout. Do the full cleanup - suction line drier, fresh liquid line drier, and follow-up monitoring until the system tests clean." },
        { label: "Negative / low acid on a compressor that failed mechanically - rod knock, valve failure, locked rotor with no burn smell", verdict: "A standard drier change and evacuation is sufficient. The extended burnout cleanup protocol is not needed." },
        { label: "Ambiguous result", verdict: "Err toward treating it as a burnout and doing the full cleanup. Under-treating risks killing the replacement compressor, while over-treating just costs an extra drier change." },
        { label: "Strong burnt/acrid odor, dark or black oil, visible carbon or varnish deposits", verdict: "Those corroborating signs support a burnout diagnosis even alongside an unclear test result. Treat it as a burnout." },
      ],
    },
  ],
  "s-air-bypassing-around-the-coil": [
    {
      ask: "Take leaving air temperature at several points across the coil face. What do you see?",
      options: [
        { label: "Some spots are cold and others are near return air temperature", verdict: "Air is bypassing the coil at those spots. Seal the gaps, filler panels, and rack, then re-measure the split before evaluating charge." },
        { label: "Leaving air is uniformly warm across the whole face", verdict: "The whole coil is underperforming. Move on to airflow verification and the refrigerant side - superheat, subcooling, and metering device." },
        { label: "Leaving air is uniformly cold at the coil but the plenum reading is much warmer", verdict: "You are picking up leakage or bypass between the coil and your plenum probe. Check the plenum joints, the cabinet-to-plenum connection, and any unsealed penetration." },
      ],
    },
  ],
  "s-almost-no-air-after-a-blower-replacement": [
    {
      ask: "With the door on, what do static pressure and blower amps read compared to before the repair?",
      options: [
        { label: "Very low static and low airflow, motor spinning smoothly", verdict: "The wheel is moving very little air - check rotation direction and blade curvature first, then wheel seating in the housing inlet." },
        { label: "Low airflow with high amp draw", verdict: "Fans running backwards typically move little air and draw high current. Confirm rotation against the scroll and correct the motor wiring or wheel orientation." },
        { label: "Static is high and airflow is low", verdict: "This is not the blower swap - it is a restriction that was there before. Break the static down by component and work the restriction." },
      ],
    },
  ],
  "s-approach-liquid-line-ambient": [
    {
      ask: "Compare measured approach to the target you built. Which way is it off?",
      options: [
        { label: "Approach is high (liquid line much warmer than expected)", verdict: "The condenser is not doing its job. Inspect the coil from the entering-air face, verify condenser fan operation and blade depth, and check for recirculation before touching the charge." },
        { label: "Approach is low, with low suction and high superheat", verdict: "Points at a restriction. Liquid refrigerant is losing pressure and temperature before it should. Walk the liquid line and the drier with a clamp looking for the drop." },
        { label: "Approach is low, with high subcooling and normal to high suction", verdict: "Points at overcharge. Extra liquid is stacked in the condenser, so the liquid line leaves colder. Verify airflow first, then recover to the correct subcooling." },
      ],
    },
  ],
  "s-attic-airhandler-platform-vibration": [
    {
      ask: "With the unit running, feel the platform, the duct connections, and the cabinet to find where the vibration is actually being transmitted.",
      options: [
        { label: "Platform flexes, spanning between joists with no proper blocking", verdict: "That flex transmits vibration directly into the ceiling structure below. Add proper support and rigidity to the platform." },
        { label: "Unit sits directly on a rigid platform with no isolation pads or rubber/cork mounts", verdict: "With no isolation, motor and blower vibration transmits much more readily. Add isolation between the unit and the platform." },
        { label: "Rigid duct connects straight to the cabinet with no flexible connector", verdict: "Vibration travels through the ductwork into the structure at connection points far from the unit itself. Add canvas or similar flexible connectors at supply and return." },
        { label: "Vibration traces to the equipment itself, such as an unbalanced blower wheel or worn motor bearing", verdict: "Address that as the root cause instead of adding more isolation to compensate for it." },
      ],
    },
  ],
  "s-attic-secondary-pan-sensor": [
    {
      ask: "Confirm there is a secondary auxiliary pan beneath the unit, then look in it for actual standing water.",
      options: [
        { label: "Water standing in the secondary pan", verdict: "The sensor is doing its job of stopping the unit before a ceiling leak, so do not bypass it. Trace the water back to the primary drain system failure: a clogged primary drain, a cracked primary pan, or a unit that is not level." },
        { label: "Pan is dry but the sensor still reads tripped", verdict: "Check the sensor or float switch itself for a stuck or corroded contact, and inspect its wiring harness for damage from the attic environment, such as heat or rodents." },
        { label: "Primary drain issue already corrected and the pan is now dry", verdict: "Confirm the secondary pan is draining through its own independent drain, often routed to a visible location like above a window, before returning the system to service." },
      ],
    },
  ],
  "s-belt-drive-blower-not-moving-air": [
    {
      ask: "What did you find at the drive?",
      options: [
        { label: "Belt is glazed and deflects far more than the guideline", verdict: "Slipping belt - fan RPM and airflow are down even though the motor runs. Replace the belt, tension it at the motor mount, and re-measure RPM and amps." },
        { label: "Belt tension is right but the sheave is set for a lower speed than the job needs", verdict: "Adjust the sheave for airflow, re-tension the belt, then verify motor amps stay under FLA and re-measure static. If static climbs out of range, fix the duct system rather than driving the fan harder." },
        { label: "Belt and sheave check out, RPM is on target, but airflow is still low", verdict: "Move to the airside: loaded blower wheel, filter and coil pressure drops, and duct restrictions. The drive is not your problem." },
      ],
    },
  ],
  "s-blank-thermostat": [
    {
      ask: "Check the low-voltage fuse on the equipment control board (small automotive-style fuse).",
      options: [
        { label: "Fuse is blown", next: 1 },
        { label: "Fuse is good and 24V is present at the board", verdict: "Fuse is not the issue. Check the C-wire connection at both the thermostat and the board, and replace the batteries if it is battery powered." },
        { label: "No power at the equipment at all", verdict: "Check the furnace/air handler breaker and the unit switch. Most thermostats run off the equipment 24V, not a separate circuit." },
      ],
    },
    {
      ask: "Replace the fuse and power it back up. What happens?",
      options: [
        { label: "New fuse holds and the thermostat comes back", verdict: "One-time blown fuse. Recheck the C-wire terminations at both ends while you are in there." },
        { label: "New fuse blows again right away", verdict: "There is a short in the field thermostat wiring. Inspect the run for a nail through the wire or bare conductors touching." },
      ],
    },
  ],
  "s-blend-pt-chart-bubble-vs-dew-point": [
    {
      ask: "Confirm the refrigerant from the data plate, then check which saturation column each of your numbers came from. What did you use?",
      options: [
        { label: "Bubble point off liquid line pressure for subcooling, dew point off suction pressure for superheat", verdict: "That is correct - bubble-for-subcool, dew-for-superheat. Your numbers stand." },
        { label: "One saturation column used for both readings", verdict: "That is the error. Redo both numbers with the correct column before you add or remove any refrigerant." },
        { label: "Not sure - digital gauges or an app picked the refrigerant automatically", verdict: "Many gauges and apps let you pick the refrigerant but silently use one saturation column for both readings. Check what yours is actually doing and redo the numbers if needed." },
        { label: "Wrong column used on a higher-glide blend such as R-407C", verdict: "On high-glide blends this mistake throws you off by a meaningful amount, unlike R-410A or R-454B where the two columns nearly overlap. Redo the readings with the correct column." },
      ],
    },
  ],
  "s-blower-capacitor-weak-psc": [
    {
      ask: "Check the blower motor run capacitor's uF against its rated value.",
      options: [
        { label: "Out of tolerance, or the case is bulging or smells hot", verdict: "Most common cause on a PSC motor, and bulging or a hot smell means imminent failure. Discharge it safely and replace it." },
        { label: "Reads at its rating", next: 1 },
      ],
    },
    {
      ask: "Check the motor and its supply.",
      options: [
        { label: "Bearings drag when you turn the wheel with power off", verdict: "Bearing wear in the motor. Replace it." },
        { label: "Voltage at the motor terminals sags under load", verdict: "Voltage-drop issue upstream of the motor. Chase the wiring and connections." },
      ],
    },
  ],
  "s-blower-continues-after-satisfied": [
    {
      ask: "With the call satisfied, does the fan ever shut off?",
      options: [
        { label: "It stops after a consistent delay every time", verdict: "That is the blower off-delay setting on the control board - normal, adjustable behavior that may just be longer than the customer expects." },
        { label: "It never stops", next: 1 },
        { label: "Heat pump, and this happens during cold weather operation", verdict: "Check whether the unit is actually in a defrost cycle before assuming a fault." },
      ],
    },
    {
      ask: "Set the thermostat fan to Auto and confirm G is not being called. Does the fan stop?",
      options: [
        { label: "Fan stops once the fan mode is set to Auto", verdict: "The thermostat was calling continuous fan on G. Just a setting." },
        { label: "Fan keeps running with no G call present", verdict: "Suspect a stuck relay on the control board holding the fan circuit energized." },
      ],
    },
  ],
  "s-blower-ecm-erratic": [
    {
      ask: "Measure total external static pressure on the system.",
      options: [
        { label: "Static is high or you find a duct restriction", verdict: "ECM motors deliberately vary torque and speed to hold CFM against resistance, which the customer hears as surging. Address the airflow restriction, not the motor." },
        { label: "Static reads normal", next: 1 },
      ],
    },
    {
      ask: "Check the low-voltage control harness plug at the motor (commonly a 5-pin or 16-pin connector).",
      options: [
        { label: "Plug is loose or the connection is marginal", verdict: "That produces exactly this symptom. Reseat or repair the connector and retest." },
        { label: "Connector is solid", verdict: "Confirm the motor is programmed or tapped for the correct CFM for the installed equipment, and check the motor's own fault history or status LED before condemning it." },
      ],
    },
  ],
  "s-blower-runs-cool-only-not-heat": [
    {
      ask: "Start a heat call and stay with it for several minutes. What happens?",
      options: [
        { label: "Burners light and stay lit, but the blower never starts", next: 1 },
        { label: "Blower eventually starts after a long delay", verdict: "That is the heating blower on-delay. Check the delay setting or dip switch - set unusually long, it looks like the blower never starts if you do not wait." },
        { label: "The furnace faults out before it ever reaches the blower stage", verdict: "The board is not completing the heat sequence to the point it energizes the blower. Fix the earlier fault first." },
      ],
    },
    {
      ask: "Check the heat-specific fan control.",
      options: [
        { label: "The fan relay/output used for the heat call never energizes", verdict: "Many systems use a separate output or timing for heat versus cool. The heating fan circuit is your problem." },
        { label: "Smart/communicating thermostat with separate heat and cool fan logic", verdict: "Check the thermostat wiring and settings for the heat-call-specific fan control." },
      ],
    },
  ],
  "s-blower-watts-per-cfm-screen": [
    {
      ask: "What do the watt draw and the CFM look like together?",
      options: [
        { label: "High watts and the CFM is still where it should be", verdict: "Classic constant-airflow ECM holding CFM against high static. The motor is fine; find and remove the restriction. Check filter drop, coil drop, and duct pressures." },
        { label: "High watts and low CFM", verdict: "The blower is loaded and losing anyway. Check for a dirty blower wheel, restricted return, and static well beyond the equipment rating. Verify the wheel is clean and seated before touching the motor." },
        { label: "Low watts and low CFM", verdict: "The blower is not being asked to work. Check the speed tap or ECM programming for the mode you are in, the control signal, and rotation direction." },
      ],
    },
  ],
  "s-blower-wont-run-any-mode": [
    {
      ask: "With a call present, meter for line voltage at the blower motor connector.",
      options: [
        { label: "Line voltage present at the motor", next: 1 },
        { label: "No line voltage at the motor", next: 2 },
      ],
    },
    {
      ask: "The motor has power - check the motor side.",
      options: [
        { label: "Wheel will not spin freely by hand with power off", verdict: "Seized bearing. Replace the motor rather than chasing the control side." },
        { label: "Wheel spins free", verdict: "Check the run capacitor on a PSC motor, or the module and control connections on an ECM." },
      ],
    },
    {
      ask: "No power at the motor - work back toward the source.",
      options: [
        { label: "Blower door safety switch is not fully engaged", verdict: "Most units will not run at all with the door open or the switch not depressed. Correct it and retest." },
        { label: "No power at the air handler/furnace at all", verdict: "Check the disconnect and breaker feeding the unit." },
      ],
    },
  ],
  "s-breaker-trip": [
    {
      ask: "Do not keep resetting it. With power off, megger or ohm the compressor and motor windings to ground.",
      options: [
        { label: "A winding reads shorted to ground", verdict: "Ground fault in the motor or compressor - that is your trip. Replace the failed component and stop resetting the breaker." },
        { label: "Windings read clean to ground", next: 1 },
      ],
    },
    {
      ask: "Check the capacitor, look for an obvious short, and verify the breaker size.",
      options: [
        { label: "Capacitor tests shorted", verdict: "A shorted capacitor will trip the breaker. Replace it." },
        { label: "Burnt wiring, chewed insulation, or water intrusion found", verdict: "That is the short. Repair the wiring and clear the water intrusion before re-energizing." },
        { label: "All checks good but the breaker is smaller than the equipment MCA/MOCP", verdict: "Undersized breaker nuisance-tripping. Size it per the equipment MCA/MOCP rating." },
      ],
    },
  ],
  "s-burner-alignment-carryover-check": [
    {
      ask: "With gas pressure verified correct per the manual's procedure, pull the burner assembly area cover and look at the mechanical layout. What do you find?",
      options: [
        { label: "A burner not sitting in its locating slot, or the assembly not level front to rear or left to right", verdict: "Reseat the burners in their slots and level the assembly. Misalignment is a common cause of slow or uneven carryover." },
        { label: "Obstruction in the carryover - lighter tube or cross lighter", verdict: "Clean the carryover. That is what is stalling flame travel between burners." },
        { label: "A main burner orifice deformed or misaligned to the burner", verdict: "Replace the damaged orifice and confirm its alignment to the burner." },
        { label: "Everything mechanically correct", next: 1 },
      ],
    },
    {
      ask: "Check the orifice size against the fuel and application.",
      options: [
        { label: "Wrong size for the fuel or application, or obstructed", verdict: "A wrong or obstructed orifice shows up as poor light-off. Fit the correct orifice, reassemble, and watch a full light-off." },
        { label: "Correct size and clear", verdict: "Reassemble, restore gas and power, and watch a full light-off to confirm even, prompt carryover across all burners before suspecting the ignition control." },
      ],
    },
  ],
  "s-burners-cut-out-blower-keeps-running": [
    {
      ask: "Watch a full cycle with the panel off and the door switch held, and read the board's code or flash pattern immediately after the dropout. What is the order of events?",
      options: [
        { label: "Burners go out, the blower ramps up and holds, and the board reports a limit fault", next: 1 },
        { label: "Flame dies and the control re-tries, with the board reporting a flame fault", next: 2 },
      ],
    },
    {
      ask: "Put a meter across the primary limit and watch for voltage at the moment the burners drop, then measure temperature rise against the rating plate range. What do you get?",
      options: [
        { label: "Voltage appears across the limit and rise is above the rating plate range", verdict: "The limit opened on overtemp from low airflow. Check filter, coil, blower wheel, blower speed, and total external static pressure." },
        { label: "Voltage appears across the limit but rise is inside the rating plate range", verdict: "The limit opened with acceptable airflow - the limit itself is suspect." },
        { label: "No voltage across the limit at the dropout", verdict: "The limit did not open. Go work the flame path instead - put a meter in series with the flame sensor and watch the microamps through the cycle." },
      ],
    },
    {
      ask: "Put a meter in series with the flame sensor lead and watch the microamp reading through the whole cycle. What does it do?",
      options: [
        { label: "Signal starts acceptable and decays as the furnace heats", verdict: "That points at the sensor, its ceramic, or grounding. Check burner ground and equipment ground and verify line polarity - flame rectification uses the burner as its return path." },
        { label: "Signal holds at or above the minimum specified for that control right up to the dropout", verdict: "Flame sense is holding, so go back to the limit path - meter across the primary limit for voltage at the moment the burners drop. Note that a consistent elapsed time favors a thermal cause." },
      ],
    },
  ],
  "s-burningsmell": [
    {
      ask: "Power is off at the disconnect. What does the smell actually track with?",
      options: [
        { label: "Gas furnace on its first fire of the season, and it faded after a few minutes", verdict: "That is normal dust burn-off, which is different from an ongoing electrical smell. Verify nothing is scorched, then it can go back in service." },
        { label: "Ongoing electrical or hot-plastic smell any time the unit runs", next: 1 },
      ],
    },
    {
      ask: "With power still off, inspect the wiring, relays, contactor, and motors.",
      options: [
        { label: "Scorch marks or melted insulation at wiring, relay, or contactor", verdict: "You found the source. Repair or replace the burned component and do not re-energize until it is corrected." },
        { label: "Wiring looks clean but a motor is hot or its bearing is seized", verdict: "Overheating motor - a seized bearing is a common cause. Replace it before re-energizing." },
        { label: "Nothing found yet", verdict: "Do not re-energize - a burning smell means fire risk. Keep working the wiring, relays, contactor, and each motor (blower, inducer, condenser fan) until you find it." },
      ],
    },
  ],
  "s-burnout-electrical-vs-mechanical": [
    {
      ask: "Before opening the sealed system - smell at the service valves and fittings, and ohm the compressor windings.",
      options: [
        { label: "Sharp burnt/acrid smell, and windings grounded to the shell or reading open/shorted", verdict: "That confirms an electrical failure. Do the full burnout cleanup procedure with driers, acid test, and monitoring." },
        { label: "No burnt smell, normal winding readings, and a mechanical symptom beforehand such as knocking, grinding, or gradually declining capacity", verdict: "That points to a mechanical failure rather than electrical, so the extended burnout cleanup is not required." },
        { label: "Repeated breaker or internal overload trips before it finally failed, with a burning smell reported by the customer", verdict: "That trip history plus the smell points toward electrical burnout. Treat it as one." },
        { label: "Genuinely uncertain either way", verdict: "Treat it as a burnout and do the full cleanup - an extra suction drier and acid test costs far less than a second compressor failure. Document what you determined and why." },
      ],
    },
  ],
  "s-cabinet-air-leaks-affecting-combustion": [
    {
      ask: "Watch the flame through a full cycle. Does the combustion symptom show up only after the circulating blower starts?",
      options: [
        { label: "Flame disturbance appears or worsens only once the blower starts", verdict: "That points at cabinet air leaks letting pressurized supply air reach the combustion area. Inspect for panel gaps, missing grommets, unsealed wire and pipe penetrations, and a blower or burner door that does not seat and latch fully." },
        { label: "Combustion is unstable with the blower off as well", verdict: "Supply air through cabinet leaks is not the story. If the furnace is installed as a one pipe system, confirm the surrounding area and structure are adequate to provide combustion air." },
        { label: "Trouble shows up around the return plenum connection", verdict: "Check for cabinet air leaks on the return side, especially where the return plenum lands on the furnace, then re-take combustion readings with the blower running." },
      ],
    },
  ],
  "s-cap-tube-debris-clog": [
    {
      ask: "Is the restriction symptom - high subcooling with low suction - constant, or does it come and go?",
      options: [
        { label: "Constant and unchanging over time and across cycles", next: 1 },
        { label: "Clears partway through a run cycle as the tube warms, then returns on the next cold start", verdict: "That intermittent pattern is characteristic of moisture freezing at the tube's narrowest point. It points to inadequate evacuation last time the system was opened, or a saturated drier - replace the assembly and pull a proper deep vacuum." },
      ],
    },
    {
      ask: "For the solid-debris case, find the source before you replace anything.",
      options: [
        { label: "Filter drier desiccant breaking down internally", verdict: "That is your debris source. Replace the cap tube/drier assembly and address the drier situation so the new one does not clog." },
        { label: "Leftover contamination from a prior compressor burnout that was never fully cleaned up", verdict: "Address the contamination or the replacement assembly will just clog again." },
        { label: "Oil breakdown or sludging from age or overheating", verdict: "Same approach - replace the cap tube/drier assembly rather than trying to clear it in place, and deal with what caused the oil to break down." },
      ],
    },
  ],
  "s-cap-tube-restriction-vs-undercharge": [
    {
      ask: "You have low suction and high superheat. Read subcooling - that is the tiebreaker.",
      options: [
        { label: "Subcooling is low", verdict: "Low subcooling with low suction and high superheat points to undercharge or a leak. Leak search before adding refrigerant." },
        { label: "Subcooling is high", next: 1 },
      ],
    },
    {
      ask: "High subcooling points to a restriction in the cap tube or drier. Confirm it before opening anything.",
      options: [
        { label: "Frost line or cold spot partway along the tube on an otherwise room-temperature line", verdict: "That is a strong restriction indicator. Do not add refrigerant - it will worsen the imbalance and risk high head pressure." },
        { label: "Unusually high discharge line temperature along with those pressures", verdict: "The compressor is working against reduced flow, which supports the restriction diagnosis." },
        { label: "Still not certain either way", verdict: "Weigh out and recover the full charge, replace the drier/cap tube assembly if restriction is confirmed, evacuate, and weigh back in the full nameplate charge rather than guessing incrementally." },
      ],
    },
  ],
  "s-cap-tube-system-troubleshoot": [
    {
      ask: "Read subcooling and suction pressure, and feel along the cap tube.",
      options: [
        { label: "Abnormally high subcooling with very low suction, plus a sharp temperature drop across a short section of the tube", verdict: "That is a restricted cap tube from a kink, debris, or wax. It is typically not repairable in place - replace the cap tube assembly, often integrated with the drier on smaller systems." },
        { label: "Symptoms come and go without any charge being added", verdict: "Suspect moisture over debris - cap tube systems are especially sensitive, and moisture freezing at the narrowest point makes an intermittent restriction that clears and returns." },
        { label: "Noticeably higher superheat and reduced capacity with no restriction signature", verdict: "These systems are charge-critical with no adjustable metering, so even a small charge deviation shows up clearly. Recover and weigh in the full nameplate charge rather than trimming by pressure." },
      ],
    },
  ],
  "s-capacitor-in-circuit-false-reading": [
    {
      ask: "Read the capacitor with the leads on, then pull both leads and read it again. How do the two numbers compare?",
      options: [
        { label: "The reading dropped once the leads came off, and the isolated value is below rating", verdict: "The in-place reading was being propped up by the parallel path. The isolated value is the real one - replace the capacitor." },
        { label: "Both readings are the same and at rating", verdict: "The capacitor is good. Keep going - check the contactor contacts, line voltage under load, and the motor windings." },
        { label: "The isolated reading is open or near zero", verdict: "The capacitor has failed open. Replace it, then look for a cause such as overheating, a wrong voltage rating, or high running amps." },
      ],
    },
  ],
  "s-capacitor-ohmmeter-swing-test": [
    {
      ask: "With power off and the capacitor discharged through a 20 to 30 ohm resistor, which meter are you testing with?",
      options: [
        { label: "Digital ohmmeter", next: 1 },
        { label: "Analog ohmmeter", next: 2 },
      ],
    },
    {
      ask: "Set the digital meter to an ohm range of at least 1k ohm and connect the leads to the capacitor terminals.",
      options: [
        { label: "A momentary reading appears and the display returns immediately to OL, repeatably", verdict: "The capacitor still charges - good by this test." },
        { label: "No change on the display at all", verdict: "The capacitor is dead. Replace it." },
      ],
    },
    {
      ask: "Watch the analog needle when you connect the leads.",
      options: [
        { label: "Needle swings to zero and stops there", verdict: "Shorted - replace it." },
        { label: "Needle settles at a fixed resistance instead of returning to infinity on a start capacitor", verdict: "That is the bleed resistor, not a fault - a start capacitor with a bleed resistor settles at the resistor's resistance." },
      ],
    },
  ],
  "s-capea-a2l-sensor-wiring": [
    {
      ask: "Look at the furnace PCB for a port labeled A2L. What do you find?",
      options: [
        { label: "An A2L port is present on the furnace board", verdict: "Wire the sensor to the A2L port. Mitigation mode is ON by default, but verify the A2L function is ENABLED on the furnace board per the furnace install manual and complete the A2L verification step BEFORE commissioning." },
        { label: "No A2L port on the furnace board", verdict: "Use the Non-A2L Furnace Integration Kit board - the sensor wires to the kit, and the kit connects to the AUX port on the parent PCB. See kit manual IO-7021." },
        { label: "The sensor was left uninstalled or unpowered", verdict: "It is not optional. The R-32 sensor must be installed and powered for service, and a coil installed without it will fault the system." },
      ],
    },
    {
      ask: "Check the physical install details on the sensor run - these are the callback causes.",
      options: [
        { label: "Grommet through the knockout, strain-relief zip tie on the bracket, routing per the orientation diagram", verdict: "The physical install is right. Retest after any sensor or coil work and confirm mitigation behavior before commissioning." },
        { label: "Missing grommet, zip tie removed from the bracket, or wire against a sharp or field-cut edge", verdict: "Fit the grommet through the access-panel knockout, keep the strain-relief tie on the bracket, and deburr plus coat any field-cut hole before re-routing the wire." },
      ],
    },
  ],
  "s-carrier-24vna-defrost-interval-config": [
    {
      ask: "Find out what is actually controlling this system - that decides which defrost setting is in charge. Which is installed?",
      options: [
        { label: "A communicating user interface", verdict: "The UI setting supersedes the control board DIP switches whenever the two disagree. Read and change the defrost interval at the UI - the board switches are not in control here." },
        { label: "A non-communicating thermostat", verdict: "The DIP switches do govern. Set the defrost interval on the outdoor control board per the legend for that board - the manual shows separate figures for the 1 and 2 ton AOC board and the 3, 4 and 5 ton board." },
      ],
    },
    {
      ask: "Watch the actual intervals between defrost cycles. What do you see?",
      options: [
        { label: "The first interval after power up was 30 minutes, then it went to the selected time", verdict: "Normal. The first interval after any power up defaults to 30 minutes with the remaining intervals at the selected time - do not read that as a fault." },
        { label: "The interval keeps changing between 90, 60 and 30 minutes", verdict: "AUTO is selected and the interval is floating: a defrost shorter than 5 minutes gives a 90 minute next interval, 5 to 7 minutes gives 60 minutes, and longer than 7 minutes gives 30 minutes." },
        { label: "The unit never defrosts at all", verdict: "Confirm a defrost demand actually exists - coil temperature has to be at or below 32F for 4 minutes during the interval, and defrost is only allowed below 50F outdoor ambient. If the coil never reaches 32F the interval timer resets and starts over, which is normal control logic." },
      ],
    },
  ],
  "s-carrier-24vna-defrost-termination-criteria": [
    {
      ask: "Note the outdoor air temperature, put a thermometer or clamp probe on the outdoor coil, and watch a defrost through to termination. What happens?",
      options: [
        { label: "Outdoor air above 25F and defrost ends once coil temperature passes 60F", verdict: "That is the correct termination criterion for that ambient, with a 1 minute minimum defrost length. Termination is working - look elsewhere for the icing complaint." },
        { label: "Outdoor air at or below 25F and defrost ends once coil temperature passes 45F", verdict: "Correct criterion for that ambient, with a 2 minute minimum defrost length. The control is terminating properly." },
        { label: "Defrost runs the full 10 minutes every cycle", verdict: "Neither temperature criterion is being met so the control is timing out on the 10 minute backstop. That usually means the coil sensor reads low or the coil is not clearing - compare the coil sensor reading against your actual measurement before replacing the board." },
        { label: "Coil sensor reading and your thermometer disagree", verdict: "The control is terminating off a bad number. Compare the coil temperature sensor reading against the actual measurement and address the sensor before replacing the board." },
      ],
    },
  ],
  "s-carrier-59mn7c-manifold-two-tables": [
    {
      ask: "Read the exact model number off the rating plate before you touch the gas valve. What is it?",
      options: [
        { label: "59MN7C060C21--20", verdict: "That model uses a different manifold pressure table than every other model in the family. Look up its own values in the installation instructions - do not carry a number over from another Carrier furnace." },
        { label: "Any other 59MN7C model", verdict: "Use the family manifold pressure table, not the 59MN7C060C21--20 table. Look up the values for that specific model in the installation instructions." },
      ],
    },
    {
      ask: "With the manometer on the manifold/outlet pressure tap, which adjustment are you making first?",
      options: [
        { label: "Maximum Heat first, set so input is within plus or minus 2 percent of the rating plate input rate", verdict: "Correct order. Then drive the furnace to Minimum Heat and set Minimum Heat manifold pressure." },
        { label: "Minimum Heat first", verdict: "Wrong order. Maximum Heat has to be set first, then Minimum Heat second." },
        { label: "Trying to adjust Intermediate Heat", verdict: "Intermediate Heat manifold pressure is not adjustable. It is only checked as part of the temperature rise." },
      ],
    },
  ],
  "s-carrier-59tp6-code-12-after-power-blip": [
    {
      ask: "Ask whether power was interrupted during a heat call, then match what the furnace is doing.",
      options: [
        { label: "Blower runs alone for 90 seconds starting two seconds after power returns, with code 12 and 12.1 on the display", verdict: "That is the control's designed response to losing power during a heat call. Let the 90 seconds elapse and the furnace responds to the thermostat normally." },
        { label: "The 90 seconds ends but the LED does not go ON continuous", verdict: "After the blower-only period the LED should go ON continuous if no faults are detected. Read the fault rather than chasing the blower run." },
        { label: "Nothing runs at all", verdict: "Confirm the blower door is installed - power reaches the control CPU, transformer, inducer, blower motor, hot surface igniter, and gas valve only through the blower door interlock switch." },
      ],
    },
    {
      ask: "Customer says it runs on low heat a long time after the outage. Check the heating side.",
      options: [
        { label: "Low heat for up to 16 minutes, then it switches to high heat while the thermostat keeps calling", verdict: "The power interruption erased the stored cycle-time history, so the control selects low heat until it re-learns. That is the adaptive heating side effect, not a fault." },
        { label: "Heating Thermostat Type (Htt) is set to 1St", verdict: "In 1St the control uses adaptive mode and selects low or high heat from stored history. Energizing W2 always forces high heat regardless of the Htt setting." },
      ],
    },
  ],
  "s-carrier-59tp6-ctt-outdoor-staging-setting": [
    {
      ask: "Identify the outdoor equipment and how the thermostat is landed at the furnace control.",
      options: [
        { label: "Two-stage outdoor unit with a two-stage thermostat landed on both Y1 and Y/Y2", verdict: "Set Cooling Thermostat Type (Ctt) to 2St so the thermostat controls outdoor staging. The wiring has to match the setting." },
        { label: "Single-stage outdoor equipment", verdict: "Land the thermostat HP or AC output on Y/Y2 of the furnace control." },
        { label: "Single-stage AC or heat pump with InteliSense", verdict: "Confirm the required field-installed jumper is in place." },
      ],
    },
    {
      ask: "Re-test staging with a large setpoint differential.",
      options: [
        { label: "Outdoor unit actually changes stage", verdict: "Staging is proven. Do not judge it from indoor airflow." },
        { label: "Outdoor unit does not change stage", verdict: "Verify the terminal designations on the furnace control label itself - the manual notes the thermostat terminal connection order on the control may vary." },
        { label: "Complaint is about dehumidification instead", verdict: "Confirm the function removes 24 VAC from the Dehum terminal on a demand to dehumidify, and check the thermostat instructions for how that output is configured." },
      ],
    },
  ],
  "s-carrier-59tp6-inlet-gas-pressure": [
    {
      ask: "With the manometer on the inlet pressure tap and R jumpered to W/W1 and W2 to force maximum heat, read inlet gas pressure once the main burners ignite. What do you read?",
      options: [
        { label: "Between 4.5 and 13.6 in. w.c. and holding steady under load", verdict: "Supply is good at full fire on natural gas. The manifold pressure problem is not the supply - work the furnace regulator and orifice side." },
        { label: "Drops below 4.5 in. w.c. under load", verdict: "The supply piping or the meter/regulator is the problem, not the furnace regulator. You will never set the correct input rate until the supply holds up under full fire." },
        { label: "Above 13.6 in. w.c.", verdict: "Inlet pressure is outside the range for natural gas on this furnace. Correct the supply before attempting to set manifold pressure." },
      ],
    },
  ],
  "s-carrier-altitude-derate-us-canada": [
    {
      ask: "Establish the installed altitude of the home and whether the installation is in the USA or Canada. Which applies?",
      options: [
        { label: "USA installation above 2000 ft", verdict: "Reduce the input rating by 2 percent for each 1000 ft above sea level, using the altitude derate multiplier table in the manual." },
        { label: "Canadian installation at 2000 ft to 4500 ft", verdict: "Reduce the input rating by 5 percent, and use the USA 2001 to 3000 ft rows when reading the manifold pressure table." },
        { label: "At or below 2000 ft", verdict: "No altitude derate applies. Set manifold pressure from the table for the gas heating value at that altitude." },
      ],
    },
    {
      ask: "With the derate figured, what is your next move?",
      options: [
        { label: "Apply the derate again on top of the table manifold pressures", verdict: "Do not derate twice. The natural gas manifold pressures in the table already adjust for both altitude and gas heating value." },
        { label: "Check the orifice physically installed against what the table calls for at that altitude and gas quality", verdict: "Correct. Never assume the orifice size and never redrill an orifice. Then set low-heat and high-heat manifold pressure to the table values and clock the gas meter to confirm the derated input is actually being delivered." },
      ],
    },
  ],
  "s-carrier-hsi-resistance-and-replacement": [
    {
      ask: "With gas and electrical supplies off and the igniter wire disconnected, ohm across both igniter leads in the connector. What do you read?",
      options: [
        { label: "Between 40 and 70 ohms at room temperature", verdict: "Resistance is in spec - leave the igniter alone. Carrier states the igniter does not require annual inspection." },
        { label: "Reads high with the igniter still warm from a cycle", verdict: "Resistance increases as igniter temperature increases, so a hot igniter reads high and misleads you. Let it come to room temperature and check again." },
        { label: "Outside 40 to 70 ohms with the igniter at room temperature", verdict: "Replacement is required. Use a 1/4-in. driver on the two bracket screws and withdraw the igniter and bracket through the front of the burner assembly without striking it." },
      ],
    },
  ],
  "s-carrier-htt-left-locked": [
    {
      ask: "Pull the blower or control door, read the 3 digit display, and look at the furnace thermostat terminals. What do you find?",
      options: [
        { label: "Htt left on a stage lock selection that does not match the installed thermostat", verdict: "That pins the furnace at one firing rate regardless of the thermostat. Set Htt to match - 1St for single stage, or the appropriate 2St selection - then run a full heat call and confirm it stages normally." },
        { label: "A jumper still across R, W/W1, or W2 at the furnace thermostat terminals", verdict: "Left over from a rise or gas pressure check. Remove it, let the blower off delay complete, and re-run a full heat call." },
        { label: "Htt matches the installed thermostat and no jumpers left behind", verdict: "The setup parameters are not the cause. Re-verify temperature rise against the rating plate range before going further." },
      ],
    },
  ],
  "s-carrier-limit-blockoff-check": [
    {
      ask: "Run the furnace at least 5 minutes to reach normal operating temperature, then gradually block off the return air with cardboard or sheet metal. What happens?",
      options: [
        { label: "Limit trips, shuts off the combustion system, and energizes the circulating blower", verdict: "The safety works. Immediately unblock the return air and confirm the burners re-light on their own once the furnace cools down." },
        { label: "Limit does not trip and the furnace keeps firing", verdict: "Stop the test and unblock the return air. Determine and correct the cause before returning the unit to service." },
      ],
    },
  ],
  "s-carrier-orifice-by-heat-value-gravity": [
    {
      ask: "Get the average yearly heating value and specific gravity from the local gas supplier, read the required orifice size off the manifold pressure table at the installed altitude, then shut off gas and power and physically check the orifices in the furnace. What do you find?",
      options: [
        { label: "Installed orifices match the size the table calls for", verdict: "The orifice is correct for the gas actually being delivered. Set low-heat and high-heat manifold pressure to the values the table gave for this gas and altitude." },
        { label: "Installed orifices are a different size than the table calls for", verdict: "That is why the input is off. Replace with factory-supplied orifices in the size the table calls for, then set low-heat and high-heat manifold pressure to the table values." },
        { label: "An orifice hole looks damaged or may have been redrilled", verdict: "Gauge it with a numbered drill bit of the correct size. Never redrill an orifice - a burred or off-square hole ruins flame characteristics. Replace it with a factory-supplied orifice." },
      ],
    },
  ],
  "s-carrier-pressure-switch-proof-test": [
    {
      ask: "With 115-V off, disconnect the inducer motor lead wires from the harness, restore power, set the thermostat to call for heat, and wait 1 minute. What happens?",
      options: [
        { label: "Hot surface igniter does not glow and the diagnostic light flashes status code 32.2", verdict: "The low pressure switch is doing its job. Turn off 115-V power, reconnect the inducer wires, replace the door, and restore power - expect the blower to run about 90 seconds before the heat call resumes." },
        { label: "Igniter glows with the inducer disconnected", verdict: "Shut the furnace down immediately and find why the pressure switch did not open. It is not blocking ignition the way it must." },
      ],
    },
  ],
  "s-charge-check-conditions": [
    {
      ask: "Let it run and watch the readings. What are superheat and subcooling doing?",
      options: [
        { label: "Still drifting after several minutes of runtime", verdict: "Not stable yet. Keep running it. Adjusting now will overshoot in whichever direction the drift is going." },
        { label: "Stable, but the house is already at setpoint with almost no load", verdict: "The numbers are real but they do not represent design conditions. Charging here will leave you wrong when the load returns. Build load or weigh the charge in instead." },
        { label: "Stable, conditions inside the chart window", verdict: "Now the readings mean something. Compare against the OEM target and adjust in small amounts, re-stabilizing between each change." },
        { label: "Stable but airflow was never verified", verdict: "Stop. Charge decisions made on top of an airflow problem are wrong by definition. Fix the airflow, then come back to the charge." },
      ],
    },
  ],
  "s-checking-electric-heater-elements-continuity": [
    {
      ask: "With ALL power off, remove the heating elements and ohm each one for continuity. What do you get?",
      options: [
        { label: "One or more elements give no reading", verdict: "Those elements are open. Replace them rather than wiring around them." },
        { label: "Every element reads continuous", verdict: "The elements are not the problem. Look each one over for breaks in the wire and broken insulators, and verify the number of heaters installed does not exceed the quantity shown in the spec sheet for that model." },
      ],
    },
  ],
  "s-clocking-gas-meter-btu-input": [
    {
      ask: "With every other gas appliance shut off and the BTU content from the utility in hand, time one complete revolution of the smallest dial on the meter with the unit running. Which dial is it?",
      options: [
        { label: "2 cubic foot dial", verdict: "Divide the seconds by 2 to get seconds per cubic foot, then calculate input as gas heating value x 3600 divided by seconds per cubic foot." },
        { label: "1 cubic foot dial", verdict: "Use the seconds as measured for seconds per cubic foot, then calculate input as gas heating value x 3600 divided by seconds per cubic foot. Example: 1000 BTU/cu ft at 36 seconds gives 100,000 BTU per hour." },
      ],
    },
    {
      ask: "Compare the calculated input against the rating plate. What did you get?",
      options: [
        { label: "Measured input is at or below the rated input", verdict: "The unit is not overfired. Relight every other appliance you shut off and confirm each pilot burner is operating, then follow up with a temperature rise check and a combustion/CO analysis." },
        { label: "Measured input is greater than the rated input", verdict: "Overfired - measured input must not be greater than the rating plate input. Correct it, then relight the other appliances and confirm their pilots before leaving." },
      ],
    },
  ],
  "s-co-alarm-general": [
    {
      ask: "Before anything else, ask about occupant symptoms - headache, dizziness, nausea, confusion.",
      options: [
        { label: "Someone reports feeling unwell", verdict: "Advise evacuation to fresh air immediately, before troubleshooting anything." },
        { label: "Nobody reports symptoms", next: 1 },
      ],
    },
    {
      ask: "Test with a calibrated CO analyzer - ambient air near each appliance and in each flue or vent. Where does it show up?",
      options: [
        { label: "Elevated at one fuel-burning appliance", verdict: "Shut that appliance down until it is repaired. Do not assume it is the HVAC just because that is what you were called for." },
        { label: "Elevated near the attached garage, no appliance source found", verdict: "Vehicle exhaust infiltration from an attached garage is a real source. Keep checking systematically rather than stopping at the furnace." },
        { label: "Nothing elevated anywhere", verdict: "Do not disable or dismiss the alarm - leave it in place and keep working through every fuel-burning appliance in the home before calling it a nuisance." },
      ],
    },
  ],
  "s-co-climbs-instead-of-settling": [
    {
      ask: "Log CO air free from light-off until stack temperature stops changing. What is the trend?",
      options: [
        { label: "Spikes at light-off, then falls and levels off at a low number", verdict: "Normal. The furnace was still coming to steady state. Record the settled number and move on." },
        { label: "Rises steadily and never levels off", verdict: "Something is progressively degrading combustion as the furnace heats: flame impingement, a distorting heat exchanger or burner assembly, a restricting vent, or air being pulled into the combustion path. Shut it down and inspect." },
        { label: "Settles fine on low fire but climbs on high fire", verdict: "Check the high fire manifold pressure and clocked input, secondary air supply to the burner compartment, and vent sizing for the higher rate. Overfiring and a starved burner compartment both show up only at the high rate." },
      ],
    },
  ],
  "s-co-in-supply-duct-does-not-prove-a-crack": [
    {
      ask: "With the probe in the flue and the furnace at steady state, watch the CO air free number for several minutes. What does it do?",
      options: [
        { label: "Settles at a low number and stays flat", verdict: "Combustion itself is behaving. The supply-duct reading was noise or dilution. Move on to flame observation on blower start and a visual or borescope inspection before you say anything about the heat exchanger." },
        { label: "Climbs past the investigate threshold your reference uses, or keeps rising and never settles", verdict: "You have a real combustion problem to chase first: overfiring, restricted secondary air, burner or heat exchanger fouling, or a venting problem. Sort combustion out before you try to interpret anything about a crack." },
        { label: "Flue CO is low but you are picking up CO in the equipment room or the house", verdict: "Point at the vent, not the heat exchanger. Look for spillage at the draft hood, a disconnected or corroded vent joint, a plugged or recirculating termination, or another appliance in the space." },
      ],
    },
  ],
  "s-coastal-condenser-coil-corrosion": [
    {
      ask: "Walk the whole outdoor unit, not just the coil face.",
      options: [
        { label: "Visible white/gray corrosion buildup on fins and tube surfaces, but no leak yet", verdict: "Recommend a regular fresh-water coil rinse schedule as prevention - far more critical in coastal applications than inland." },
        { label: "Coil already leaking from corrosion", verdict: "Treat it like any confirmed coil leak - replacement, not patch repair - but discuss upgrading to a coastal-rated or coated replacement coil if one is available for that line." },
        { label: "Cabinet, screws and structural fasteners corroded along with the coil", verdict: "Salt attacks the whole outdoor unit. A corroded cabinet or base can be as much of a problem as the coil itself, so factor that into the repair-versus-replace conversation." },
        { label: "Corrosion concentrated on the windward side and worse than the unit's age suggests", verdict: "That is the classic salt-exposure pattern. If the equipment was never specified with a coastal coil coating, flag that before doing repeated leak repairs on the same unit." },
      ],
    },
  ],
  "s-coil-pressure-drop-to-get-cfm": [
    {
      ask: "Compare the CFM you read off the coil curve to the CFM the blower table says you should have at your measured total static.",
      options: [
        { label: "Coil curve CFM matches the blower table CFM and both are near design", verdict: "Airflow through the coil is fine. If the system still underperforms, chase duct leakage, distribution, or the refrigerant side." },
        { label: "Coil pressure drop is much higher than the table shows for your expected CFM", verdict: "The coil face is loaded or damaged. Pull it, inspect the entering side, and clean or replace. Cleaning from the leaving side accomplishes nothing." },
        { label: "Coil drop is below the table and the whole system moves less air than it should", verdict: "Less air is getting to the coil than you think. Look upstream: filter, return grille, return duct, or a blower not delivering rated CFM." },
      ],
    },
  ],
  "s-cold-air-start-of-heat-cycle": [
    {
      ask: "From the moment the burners light, count the seconds until the blower starts and compare that against the fan-on delay in the installation manual for that model. What do you get?",
      options: [
        { label: "Blower starts well before the manual's fan-on delay", next: 1 },
        { label: "Blower starts at about the manual's fan-on delay", verdict: "The delay is doing what it should. Measure temperature rise - if it is at the low end or below the rating plate range, airflow is too high for the input and a delay change alone will not fix the complaint." },
      ],
    },
    {
      ask: "Find out what is actually starting the blower - the board's fan-on delay, or something else. What did you find?",
      options: [
        { label: "Thermostat has G energized during the heat call, running the blower straight through", verdict: "The blower is being run externally, not by the furnace's own delay. On a communicating or smart thermostat, check the fan circulation or fan-with-heat setting." },
        { label: "Board DIP switch or configuration for heat blower-on delay differs from the factory setting in the manual", verdict: "Set the blower-on behavior back to the manufacturer's factory configuration and rerun a cycle with the customer present." },
        { label: "Blower running on the cooling speed tap during heat", verdict: "That moves too much air over a heat exchanger that has just started. Put it on the heat speed, and check whether an ECM heating profile or ramping setting was changed at a previous visit." },
      ],
    },
  ],
  "s-cold-header-not-draining": [
    {
      ask: "Water is backing up in the cold end header box. Work the listed mechanical causes - what did you find?",
      options: [
        { label: "Furnace not set with the slight tilt of 0 to 1/2 in. toward the front", verdict: "Shim it to the tilt called out in the furnace installation instructions." },
        { label: "Air leakage at the combustion air inducer gasket or the cold end header box gasket", verdict: "Replace the leaking gasket - air leakage there upsets drainage." },
        { label: "Damaged cold end header box tubing", verdict: "Replace the damaged tubing, then run two heating cycles and watch that condensate leaves the header box and reaches the trap." },
      ],
    },
  ],
  "s-combination-fan-limit-control": [
    {
      ask: "Pop the cover off the fan/limit control, run a heat call, and watch where the rotating dial pointer sits when the blower starts and stops. What happens?",
      options: [
        { label: "Pointer winds all the way up to the LIMIT setting before the blower ever starts", verdict: "The control is trying and the blower is not responding - focus on the blower motor, capacitor, and the fan circuit." },
        { label: "Pointer never gets past the FAN ON mark", verdict: "The furnace is short cycling on ignition or thermostat before it makes any heat." },
        { label: "Blower starts and stops near the FAN ON and FAN OFF pointers but runs too long or too short", verdict: "Measure temperature rise and check the filter, coil, and duct restriction before adjusting anything, and verify the bimetal element extends into the plenum and is not bent, coated, or blocked." },
      ],
    },
  ],
  "s-combustion-air-contamination-chlorides": [
    {
      ask: "Look at where the furnace actually gets its combustion air and what is stored in that room, then inspect the burners, burner box, inducer wheel and housing, and heat exchanger. What do you find?",
      options: [
        { label: "Pulls room air where bleach, pool or spa chemicals, softener salt, solvents, refrigerants, cat litter or salon products are used, and the flame path shows rust, pitting, white or greenish scale, or flaking metal", verdict: "That is halogenated contamination forming acids in the flame. The fix is combustion air - convert to sealed combustion with a dedicated outdoor intake, or relocate the chemical storage and the air source away from it." },
        { label: "Corrosion only on outside surfaces with the flame path clean", verdict: "Contamination shows up as corrosion in the flame path, not just on outside surfaces - keep looking for another cause." },
        { label: "Flame lifting, yellow tipping, or rough with correct gas pressure", verdict: "Changed flame quality with correct gas pressure supports the contamination theory. Run a combustion analysis, record CO air free, and inspect the heat exchanger - contamination can perforate it well before its normal service life." },
      ],
    },
  ],
  "s-comfortnet-oat-oct-sensor-ohm-check": [
    {
      ask: "Match the complaint to the right sensor before pulling anything. What is the unit actually doing wrong?",
      options: [
        { label: "Defrosting at the wrong times", verdict: "The outdoor coil temperature (OCT) sensor is what determines defrost cycles. Ohm that one." },
        { label: "Staging auxiliary heat incorrectly on a heat pump or dual fuel system", verdict: "The outdoor air temperature (OAT) sensor provides the balance point temperature. Ohm that one." },
        { label: "It is an air conditioner model, not a heat pump", verdict: "Air conditioner models carry the OAT sensor only - there is no OCT on that unit to check." },
      ],
    },
  ],
  "s-communicating-airflow-demand-source": [
    {
      ask: "Identify the current operating mode from the thermostat, then look up in the manual's table which unit calculates airflow demand in that mode for this system type.",
      options: [
        { label: "The indoor unit owns the demand", verdict: "It calculates and sends the demand straight to the ECM motor. Make setting changes there." },
        { label: "The outdoor unit owns the demand", verdict: "It transmits the demand plus a fan request to the indoor unit, which passes it to the motor. Change settings at the outdoor unit, not the air handler." },
        { label: "The thermostat owns the demand", verdict: "Same path - the thermostat transmits demand plus a fan request through the indoor unit. Change settings at the thermostat." },
      ],
    },
    {
      ask: "Before changing any setting, measure total external static pressure and inspect the communication wiring.",
      options: [
        { label: "Static pressure is high", verdict: "The airflow problem is a duct restriction, not a demand setting. Fix the duct before touching CFM settings." },
        { label: "Comm wiring shows damage or loose connections", verdict: "A comm fault changes which device is actually in charge. Repair the wiring first, then re-evaluate who owns the demand." },
        { label: "Static normal and comm wiring solid", verdict: "Make the change at the owning device, then recheck delivered airflow rather than trusting the configured value." },
      ],
    },
  ],
  "s-compression-ratio": [
    {
      ask: "Calculate the ratio and compare it to what the equipment should run. Which direction is it off?",
      options: [
        { label: "Ratio is low, amps are low, discharge line stays cool", verdict: "The compressor is not moving mass. This is the pattern for worn scroll flanks or a failed valve plate - confirm charge is correct first, then a pumping test." },
        { label: "Ratio is high", verdict: "The compressor is a victim, not the cause. Something is squeezing the low side down or pushing the high side up. Find and fix it or the replacement will fail the same way." },
        { label: "Ratio is reasonable but capacity is short", verdict: "The compressor is pumping. Move to airflow, distribution, load, or a bypassing reversing valve." },
      ],
    },
  ],
  "s-compressor-cycles-highpressure": [
    {
      ask: "Check the condenser coil cleanliness and airflow first.",
      options: [
        { label: "Coil is dirty or airflow is blocked", verdict: "By far the most common cause. Clean the coil, clear the airflow restriction, and retest." },
        { label: "Coil and airflow are fine", next: 1 },
      ],
    },
    {
      ask: "Now check charge and rule out non-condensables.",
      options: [
        { label: "Over the manufacturer's chart", verdict: "Overcharge. Recover to spec." },
        { label: "System was opened without a deep vacuum, air/moisture suspected", verdict: "Non-condensables in the system. Recover, evacuate properly, and recharge." },
        { label: "Charge checks out correct", verdict: "Ohm test the high-pressure switch against its rated trip point to see if it is simply failing. On a heat pump also check for a stuck or miswired reversing valve forcing hot gas the wrong direction." },
      ],
    },
  ],
  "s-compressor-cycles-lowpressure": [
    {
      ask: "Work the low side first - charge and evaporator airflow.",
      options: [
        { label: "Charge is low or you find a leak", verdict: "Low charge is the first thing to rule out here. Repair the leak and recharge." },
        { label: "Dirty filter, iced coil, or a slow/failed blower", verdict: "A starved evaporator will trip the low-pressure switch. Fix the airflow." },
        { label: "Charge and airflow both check out", next: 1 },
      ],
    },
    {
      ask: "Look at the metering device and the outdoor conditions.",
      options: [
        { label: "Metering device is restricted", verdict: "A restricted metering device starves the low side. Correct it." },
        { label: "Mild or cold day on an AC-only system", verdict: "Low outdoor ambient alone can cause nuisance low-pressure trips. Check whether the install needs a low-ambient kit or a hard-shutoff control." },
      ],
    },
  ],
  "s-compressor-efficiency-r32-check": [
    {
      ask: "Rule out the cheap causes first: indoor airflow and static pressure, outdoor coil cleanliness, air recirculation and clearances, and charge. What do you find?",
      options: [
        { label: "One of them is out - low airflow, high static, dirty coil, recirculation, or wrong charge", verdict: "Fix that before testing the compressor. Every one of those makes a good compressor look weak." },
        { label: "All four check out", next: 1 },
      ],
    },
    {
      ask: "Attach gauges high and low, start the system, run the Charge Verification Test, and give it 20 to 25 minutes to stabilize. What does the thermostat display say?",
      options: [
        { label: "'Comp speed out of range' is shown", verdict: "Work the Charge Verification troubleshooting section instead of condemning the compressor." },
        { label: "No such message and the test stabilized", next: 2 },
      ],
    },
    {
      ask: "Convert both pressures to saturation temperature on the R-32 chart - compare high side to ambient, and low side to indoor temperature measured about 12 inches from the inlet to the indoor unit.",
      options: [
        { label: "High side at least 10F above ambient (5F on a 1.5 ton) AND low side at least 15F below indoor temp", verdict: "The compressor is opening up the split, so it is pumping. Look elsewhere for the capacity complaint." },
        { label: "Either or both fail to make that split", verdict: "The compressor may be faulty. Confirm you tested between 65 and 115F ambient - this method is only advised inside that window." },
      ],
    },
  ],
  "s-compressor-ground-test-after-trip": [
    {
      ask: "Check that the protective device rating matches the maximum marked on the nameplate, then with the terminal protective cover in place reset the breaker or replace the fuse ONE TIME ONLY. What happens?",
      options: [
        { label: "It holds", verdict: "It may have been a nuisance opening. Confirm the device rating matches the nameplate maximum and monitor the unit." },
        { label: "It opens again", next: 1 },
      ],
    },
    {
      ask: "Stop resetting. Kill all power, confirm every leg is open, leave the terminal cover on, disconnect the three compressor leads nearest the compressor, and measure each lead separately to ground - an unpainted tube on the compressor - on the R x 10,000 or highest scale.",
      options: [
        { label: "Infinity on all three leads", verdict: "No ground in the leads. Keep looking elsewhere in the circuit rather than pulling the terminal cover." },
        { label: "A ground shows on one or more leads", next: 2 },
      ],
    },
    {
      ask: "Carefully remove the terminal protective cover and inspect for loose leads or insulation breaks in the lead wires.",
      options: [
        { label: "Loose lead or broken lead insulation found", verdict: "Repair the lead - the windings may be fine. Retest to infinity before returning the unit to service." },
        { label: "Nothing visible, and a retest directly from terminal to ground still shows a ground", verdict: "Replace the compressor - the reading should be infinity. Do not condemn on a megohmmeter value alone; there is no industry recognized megohm spec for small tonnage compressors and scroll winding end-turns sitting in oil read lower to ground." },
      ],
    },
  ],
  "s-compressor-grounded-only-when-hot": [
    {
      ask: "With the compressor leads disconnected and insulated, energize the unit and let it run. What does the breaker do?",
      options: [
        { label: "Breaker holds with the compressor isolated", verdict: "The ground fault is in the compressor. A cold insulation reading that looks fine does not clear it - replace the compressor and check the oil for acid before installing the new one." },
        { label: "Breaker still trips with the compressor out of the circuit", verdict: "The fault is elsewhere - fan motor, crankcase heater, a chafed line-voltage conductor in the cabinet, or the wiring in the whip. Isolate the remaining loads one at a time." },
        { label: "The insulation reading is clearly low even cold", verdict: "You already have the answer. Confirm the terminals and plug are not simply oil-fouled or corroded, then plan on a compressor change." },
      ],
    },
  ],
  "s-compressor-hums-no-start": [
    {
      ask: "Check the run capacitor with a meter against its rated uF.",
      options: [
        { label: "Reads out of tolerance or open", verdict: "A weak capacitor is the single most common cause here. Replace it and retest." },
        { label: "Reads within tolerance", next: 1 },
      ],
    },
    {
      ask: "With power off, ohm the compressor windings common-to-run, common-to-start, and each winding to ground.",
      options: [
        { label: "A winding reads open or shorted to ground", verdict: "Treat the compressor as failed. Do not keep cycling power trying to force a start." },
        { label: "Windings check out", next: 2 },
      ],
    },
    {
      ask: "Meter actual voltage right at the compressor terminals while it tries to start, and inspect the contactor.",
      options: [
        { label: "Voltage drops noticeably while it is trying to start", verdict: "That is undersized wiring or a loose connection upstream, not the compressor. Find the drop." },
        { label: "Contacts are pitted, burned, or not making good pressure", verdict: "Replace the contactor." },
        { label: "Voltage holds and the contactor is clean", verdict: "On a long line set or marginal voltage, consider a hard-start kit." },
      ],
    },
  ],
  "s-compressor-oil-mismatch": [
    {
      ask: "Compare the oil that was added against what the compressor label and OEM literature specify.",
      options: [
        { label: "Mineral oil added to an HFC or A2L system", verdict: "Incompatible. It will not return to the compressor and will collect in the low side. Plan on a full cleanup and a proper charge of the specified lubricant, not a top-off." },
        { label: "Right family but wrong viscosity grade", verdict: "Still a problem for oil return and bearing film. Confirm the required grade from the OEM and correct it rather than living with it." },
        { label: "Correct oil, but the system was open for a long time", verdict: "Moisture is the concern, not compatibility. Run an acid test, change the drier, and pull a proper deep vacuum with a micron gauge before charging." },
        { label: "Unknown oil, no container, no records", verdict: "Do not guess. Pull a sample, acid test it, and decide between cleanup and compressor replacement based on the result and the compressor's condition." },
      ],
    },
  ],
  "s-compressor-suction-head-equalized": [
    {
      ask: "Clamp the amps on a compressor lead while it runs, and read the RLA off the nameplate. Enter both and I'll tell you what it means.",
      type: "number",
      compare: "ratio",
      fields: [
        {"key":"amps","label":"Measured amp draw (A)","placeholder":"e.g. 6.2"},
        {"key":"rla","label":"Nameplate RLA (A)","placeholder":"e.g. 17.4"},
      ],
      bands: [
        {"under":0.5,"label":"well under half of RLA","next":1},
        {"under":2,"label":"in the normal running range","next":2},
        {"label":"far above RLA","verdict":"Drawing several times rated load amps before the overload or breaker trips is a seized or locked compressor. That is a mechanical or electrical lockup - a different failure than a compressor that spins without compressing. Check the start components and confirm the shaft is not locked before condemning it."},
      ],
    },
    {
      ask: "Amps well under RLA with pressures equalized means the compressor is spinning but not compressing. On a heat pump, before condemning it, feel or measure all four reversing valve line temperatures. What do you get?",
      options: [
        { label: "The two hot lines within a few degrees of each other and the two cold lines within a few degrees of each other", verdict: "The valve is not bypassing. That leaves a broken or leaking valve plate, a broken scroll set, or a sheared internal coupling - the compressor has failed internally. This one gets replaced." },
        { label: "More than about 2 F difference across the discharge-port pair", verdict: "The valve is leaking internally and mimicking a weak compressor. Weigh it together with the amp draw, since a hot discharge line from a genuinely damaged compressor can conduct heat into the valve body and fake this reading." },
        { label: "3-phase scroll with high suction line temp, low discharge line temp, and loud rattling", verdict: "The scroll is running backward. Confirm rotation direction and swap two legs - that is a wiring fix, not a replacement." },
      ],
    },
    {
      ask: "Amps are in the normal running range, so do not jump to the compressor. Check superheat and subcooling. What do you get?",
      options: [
        { label: "Both crashing toward zero", verdict: "That points at the metering device flooding the low side - stuck-open TXV, wrong or oversized orifice, or a failed EEV - not a dead compressor. Chase the metering device before you quote a compressor." },
        { label: "Superheat and subcooling are not both at zero", verdict: "Kill power, let the system sit until pressures fully equalize off-cycle, then restart and re-check. A stuck internal discharge bypass or safety looks exactly like a dead compressor until it is cycled." },
      ],
    },
  ],
  "s-compressor-terminal-plug-resistance": [
    {
      ask: "Measure winding resistance at the compressor terminals, then take the same measurement from the contactor load side.",
      options: [
        { label: "Both sets of readings agree closely", verdict: "The leads and plug are not adding resistance. Move on to the internal overload, the capacitor, and supply voltage under load." },
        { label: "Readings from the contactor side are noticeably higher than at the compressor terminals", verdict: "The extra resistance is in the leads, the plug, or a spade. Repair or replace the connection - that is what is heating up and dropping the compressor out." },
        { label: "Terminals are burned, or a spade is loose to the touch", verdict: "Repair it with the correct terminal parts before running the unit again. A failing terminal here can escalate to a blown terminal plate." },
        { label: "Oil or refrigerant is present at the terminal plate", verdict: "Stop. That is a leaking terminal plate, not a connection problem. Recover the charge and address the compressor." },
      ],
    },
  ],
  "s-compressor-terminal-venting": [
    {
      ask: "With power locked out, inspect the compressor terminal plate. What do you find?",
      options: [
        { label: "Oil or refrigerant residue around a terminal pin, or a pin that looks displaced", verdict: "Treat it as a venting hazard. Keep power off, recover the charge before further work, and replace the compressor. Do not attempt a start test." },
        { label: "Burn marks or melted insulation on the terminal block", verdict: "There has been arcing. Assume a compressor electrical fault, keep it locked out, and plan a compressor replacement with drier changes and an acid test." },
        { label: "Terminals look clean but a winding ohms open or grounded", verdict: "Electrical fault without visible terminal damage. Reinstall the cover before restoring any power, and let the internal overload have time to reset before condemning an open winding." },
        { label: "Terminals clean, windings good", verdict: "No terminal hazard indicated. Reinstall the cover and move on to contactor, capacitor, supply voltage, and mechanical checks." },
      ],
    },
  ],
  "s-compressor-trips-breaker-hot-days": [
    {
      ask: "On a hot day, clamp the compressor amps as head pressure builds and compare against RLA/LRA on the nameplate.",
      options: [
        { label: "Amps climb well over RLA or spike toward LRA before the trip", next: 1 },
        { label: "Amps stay near RLA and the breaker still trips", verdict: "Verify the breaker is correctly sized for the equipment MCA/MOCP and is not simply weakened or heat-soaked in a hot electrical panel." },
      ],
    },
    {
      ask: "High amp draw - work the things that push head pressure and starting current up.",
      options: [
        { label: "Condenser coil is dirty or airflow is restricted", verdict: "A coil that is marginal in mild weather pushes head pressure and amp draw over the edge on the hottest days. Clean it." },
        { label: "Run capacitor is weak against its rating", verdict: "A weak capacitor makes the compressor work harder to start, and that gets worse as head pressure rises with ambient. Replace it." },
        { label: "Coil and capacitor both check out but starting current is still marginal", verdict: "Consider a hard-start kit." },
      ],
    },
  ],
  "s-compressor-unloader-test": [
    {
      ask: "Operate the system with a clamp meter on the compressor and cycle the unloader on and off at ten second intervals by applying and removing Y2, waiting five seconds after Y2 is applied before reading. What does amperage do?",
      options: [
        { label: "Amps rise going part-load to full-load and drop going full-load to part-load", verdict: "The unloader is working. The percent change varies with operating conditions and voltage, so clear movement is a pass - look elsewhere for the capacity complaint." },
        { label: "Amps do not move with Y2", next: 1 },
      ],
    },
    {
      ask: "Remove the solenoid plug from the compressor and, with the unit running and Y2 energized, read DC voltage at the plug.",
      options: [
        { label: "4 to 18 VDC at the plug", next: 2 },
        { label: "No voltage at the plug", verdict: "Unplug the harness from the module and check voltage at the module's High pins. Remember the module will not power the unloader solenoid unless the compressor is running." },
      ],
    },
    {
      ask: "Shut off power, remove the plug from the compressor, and measure unloader solenoid coil resistance.",
      options: [
        { label: "Coil reads infinite, zero, or grounded", verdict: "The compressor must be replaced - that coil is internal to it." },
        { label: "Coil resistance reads normal", verdict: "Correct DC voltage reaches the molded plug and the coil is intact, so the unloader circuit itself checks out. Keep working the staging command side." },
      ],
    },
  ],
  "s-condensate-drain-frozen-outside": [
    {
      ask: "Pull the pressure switch hose and check for water, then trace the whole condensate drain from the trap to the discharge point, noting every unheated or outdoor section. What did you find?",
      options: [
        { label: "Water in the pressure switch hose or a blocked collector box port", verdict: "That explains the pressure switch fault directly. Thaw the line, pour water through the whole path, clean and reprime the trap, and clear the collector box drain and the pressure switch and relief ports." },
        { label: "Drain frozen at the outdoor termination", verdict: "A line dumping outside ices at the end and freezes backward up the pipe. Thaw it, then get the drain out of the freezing path - reroute to an indoor drain, add a condensate pump discharging indoors, insulate and heat trace, or increase the slope." },
        { label: "Drain frozen in an unheated interior run", verdict: "Thaw it and confirm free flow all the way to the discharge point, then insulate and heat trace that run or reroute it so nothing stands in the pipe." },
        { label: "Furnace has a factory condensate trap heat pad", verdict: "Verify the heat pad is present, wired, and actually warm - a dead pad freezes the trap in a cold snap." },
      ],
    },
  ],
  "s-condensate-drain-slope-and-pump": [
    {
      ask: "Put a level on the horizontal sections of the drain line. What do you find?",
      options: [
        { label: "A section that is level, back-pitched, or sagging between supports", verdict: "Correct it. Horizontal runs need at least 1/4-in. per foot of slope down and away from the furnace." },
        { label: "At least 1/4-in. per foot of fall the whole way and it still backs up", next: 1 },
      ],
    },
    {
      ask: "Look at what the drain is piped with and what it terminates into. What do you have?",
      options: [
        { label: "A condensate pump that is not rated for acidic furnace condensate", verdict: "Replace it with an approved pump rather than just cleaning it. It also has to be compatible with mineral and vegetable oils such as canola oil." },
        { label: "Wrong pipe material, or the 1/2-in. CPVC to 3/4-in. PVC transition made without the factory adapter", verdict: "Re-pipe with field-supplied 1/2-in. CPVC or 3/4-in. PVC in compliance with local building codes, and use the factory adapter at the transition." },
        { label: "Code-approved drain or an approved pump with correct piping", verdict: "Check the spring clamp connections at the rubber elbow and grommet for a tight, unkinked fit, then run two full heating cycles and confirm continuous drainage with no backup at the trap." },
      ],
    },
  ],
  "s-condensate-float-switch-shutdown": [
    {
      ask: "Thermostat calls but nothing runs, usually with no fault code. Check the float switches - has one tripped?",
      options: [
        { label: "A float switch is tripped", next: 1 },
        { label: "No float switch is tripped", verdict: "This is not a condensate shutdown. Chase the no-run issue elsewhere." },
      ],
    },
    {
      ask: "Trace which one tripped and why - units can have more than one (primary pan, secondary/emergency pan, or inline in the drain line).",
      options: [
        { label: "Water backed up from a clogged drain", verdict: "Clear the actual clog before resetting or bypassing anything. The switch is doing its job; the drain clog is the real problem." },
        { label: "Water level is normal but the switch is still open", verdict: "Test the switch itself - the float should move freely and the contacts should open and close correctly - so it will properly protect the system going forward." },
      ],
    },
  ],
  "s-condensate-pump-breaks-comm-run": [
    {
      ask: "Trace the F1 and F2 communication wiring end to end. What is in the path?",
      options: [
        { label: "A condensate pump safety switch, a splice, or a junction box in the F1/F2 run", verdict: "Communication on F1 and F2 must not be broken by any condensate pump. Remove it from the comm run, re-land the pump safety on the intended interlock, and restore a straight run from the condensing unit to the indoor unit." },
        { label: "Wire is not 16/2 stranded and shielded, or F1 and F2 are landed reversed", verdict: "These terminals are polarity sensitive. Correct the wire type and the polarity before chasing boards." },
        { label: "Straight unbroken run with the correct wire and polarity", next: 1 },
      ],
    },
    {
      ask: "Remove power for at least 15 minutes, disconnect both ends of F1 and F2 and keep them separated, ohm between F1 and F2 and to the shield, then reapply power and read DC voltage on F1 and F2 at both ends with a true RMS meter. What do you get?",
      options: [
        { label: "Any resistance between F1 and F2 or to the shield", verdict: "Replace the communication wires." },
        { label: "Wires ohm clean but one end reads outside 0.1 to 0.9 vdc", verdict: "Replace the corresponding PCB - indoor or outdoor, whichever end is out of range." },
        { label: "Wires ohm clean and both ends read between 0.1 and 0.9 vdc", verdict: "Wire and both boards test good. Remove power for at least 15 minutes, run a temporary wire between indoor and outdoor, and restore power to confirm the fault clears." },
      ],
    },
  ],
  "s-condenser-24v-transformer-source": [
    {
      ask: "On these systems the step-down transformer is supplied with the indoor unit. Measure across the transformer secondary, R to C, at the indoor unit.",
      options: [
        { label: "24V present at the secondary", verdict: "The transformer is delivering. Chase the loss between the indoor unit and the outdoor unit - wiring and splices." },
        { label: "No voltage at the secondary", next: 1 },
        { label: "ComfortNet-ready condensing unit with the optional 240VAC to 24VAC transformer fitted", verdict: "Then not all 24V has to arrive from indoors. Check that optional transformer as the source powering the UC control." },
      ],
    },
    {
      ask: "Check transformer primary voltage at the incoming line voltage connections and splices.",
      options: [
        { label: "Line voltage present at the primary, wiring and splices good", verdict: "The transformer is inoperative. Replace it." },
        { label: "No line voltage at the primary", verdict: "The problem is upstream of the transformer - bad wiring or bad splices feeding the primary." },
      ],
    },
  ],
  "s-condenser-contactor-chatter": [
    {
      ask: "Meter the 24V at the contactor coil while it is chattering.",
      options: [
        { label: "Voltage is low or fluctuating", next: 1 },
        { label: "Steady 24V at the coil and it still chatters", verdict: "Look at the contactor itself - a weak or partially failed coil, or pitted and burned contacts causing an unstable pull-in." },
      ],
    },
    {
      ask: "Find where the 24V is being lost.",
      options: [
        { label: "Loose connection at the contactor coil terminals", verdict: "Repair the low-voltage terminations and retest." },
        { label: "Transformer sags under load, and accessories were added later", verdict: "Marginal or undersized 24V transformer - common after UV lights or humidifiers get added to the load. Size the transformer to the total connected load." },
      ],
    },
  ],
  "s-condenser-crankcase-heater-check": [
    {
      ask: "Confirm the unit is actually equipped with a crankcase heater, then meter for voltage at it during the off-cycle.",
      options: [
        { label: "This unit has no crankcase heater", verdict: "Not all systems have one, so a cold shell is expected here. Nothing to chase." },
        { label: "No voltage at the heater during the off-cycle", verdict: "The heater is not being powered - trace the circuit. Without it, refrigerant migrates and condenses in the compressor oil in cold weather, setting up a flooded start." },
        { label: "Voltage present but the shell is still cold", verdict: "Check heater element continuity/resistance - the element is likely open. If it has been dead a while in cold weather, listen carefully on the next start-up and check oil condition if accessible." },
      ],
    },
  ],
  "s-condenser-fan-not-spinning-compressor-runs": [
    {
      ask: "Shut the unit down before head pressure climbs, then check the fan section of the dual run capacitor against its rated uF.",
      options: [
        { label: "Fan section reads out of tolerance or open", verdict: "Common cause - the compressor still runs off its own section while the fan does not. Replace the capacitor, discharging it safely first." },
        { label: "Fan section reads good against its rating", next: 1 },
      ],
    },
    {
      ask: "Check the motor itself and whether it is getting power.",
      options: [
        { label: "Blade will not spin freely by hand with power off, or feels gritty", verdict: "Seized fan motor. Replace it." },
        { label: "No 240V at the fan motor connector during a call", verdict: "Power is not reaching the motor. Inspect the fan motor wiring and connector for corrosion or damage." },
        { label: "240V present and the blade spins freely", verdict: "Check the fan motor winding resistance - the motor windings are the suspect." },
      ],
    },
  ],
  "s-condenser-fan-spins-slow": [
    {
      ask: "Check the fan section of the run capacitor against its rated uF.",
      options: [
        { label: "Reads low or out of tolerance", verdict: "A weak but not fully failed capacitor is the most common cause of a sluggish start. Replace it." },
        { label: "Reads at its rating", next: 1 },
      ],
    },
    {
      ask: "Check the motor and its supply.",
      options: [
        { label: "Blade drags or bearings feel rough with power off", verdict: "Bearing wear in the fan motor. Replace it." },
        { label: "Blade is bent, catching the shroud, or debris/ice is in the way", verdict: "Physical obstruction. Clear it or replace the blade." },
        { label: "Motor spins free but voltage at the motor sags under load", verdict: "Low voltage from a distant or undersized circuit can cause weak starts. Chase the voltage drop." },
      ],
    },
  ],
  "s-condenser-fan-wrong-rotation-after-swap": [
    {
      ask: "With the unit running, hold a light piece of paper just above the fan grille. What does it do?",
      options: [
        { label: "It gets pushed up and away", verdict: "Airflow direction is correct. Keep chasing head pressure elsewhere - dirty coil, recirculation, overcharge, or noncondensables." },
        { label: "It gets pulled down onto the grille", verdict: "The fan is running backwards. Either the motor rotation is wrong for the blade or the blade is on upside down. Correct it and recheck head pressure." },
        { label: "Very little air moves either way", verdict: "Check blade pitch, a hub set screw slipping on the shaft, and blade depth in the venturi. A slipping or wrong-pitch blade moves almost nothing." },
      ],
    },
  ],
  "s-condenser-low-ambient-nuisance": [
    {
      ask: "Check whether the installation includes a low-ambient kit - head pressure control or fan cycling control.",
      options: [
        { label: "No low-ambient kit installed", verdict: "Many standard AC systems are not rated to run cooling much below 55-65F outdoor without one. Head pressure cannot build enough on a cold day to stay in normal range, which is the low-pressure lockout you are seeing - explain this is an operating limitation as installed, not a fault." },
        { label: "A low-ambient kit is installed", verdict: "Check its actual operation - fan cycling on head pressure - rather than assuming a charge or component failure." },
      ],
    },
  ],
  "s-condenser-oil-stains-lineset": [
    {
      ask: "Wipe the oily area completely clean, run the system a while, then look again.",
      options: [
        { label: "Fresh oil reappears at the same spot", verdict: "Active leak right there - oil travels with the refrigerant and stays behind when the refrigerant evaporates. Confirm with an electronic leak detector or UV dye before repairing." },
        { label: "Area stays clean", verdict: "Old residue rather than an active leak at that spot. Check the rest of the system for supporting signs - low charge, high superheat, or a history of pressure-related fault codes." },
      ],
    },
  ],
  "s-condenser-split-ctoa": [
    {
      ask: "With the system stable, subtract outdoor ambient from condensing saturation. Where does the split land against the equipment class?",
      options: [
        { label: "Split is well wider than the class target", verdict: "The condenser is not rejecting heat. Look at coil cleanliness from the entering-air side, condenser fan speed and blade position, air recirculation, and non-condensables. Do not add or remove charge to chase this." },
        { label: "Split is well narrower than the class target", verdict: "Not enough heat is being pumped into the condenser. That points at low mass flow: undercharge, a weak compressor, or a bypassing reversing valve. Follow up with compression ratio and subcooling." },
        { label: "Split is in range but subcooling is off", verdict: "The condenser itself is fine. The problem is how much refrigerant is stacked in it, so work the charge and metering device side instead of the condenser." },
      ],
    },
  ],
  "s-condenser-tripping-ground-fault": [
    {
      ask: "Megger the compressor and fan motor windings to ground.",
      options: [
        { label: "A winding shows a developing ground fault", verdict: "Real fault, not a nuisance trip. GFCI trips on a small current imbalance to ground, which is exactly what it is seeing - replace the failed component." },
        { label: "Windings read clean to ground", next: 1 },
      ],
    },
    {
      ask: "Look for the other real causes before calling it a nuisance trip.",
      options: [
        { label: "Water in the disconnect, wiring compartment, or windings", verdict: "Moisture intrusion is a very common GFCI trip cause, especially after rain or irrigation spray. Dry it out and seal it up." },
        { label: "Discoloration or melted insulation at connections on an AFCI circuit", verdict: "Arcing at a loose connection - AFCI trips on detected arcing, not high amp draw. Repair the connection." },
        { label: "No fault found anywhere", verdict: "Confirm whether GFCI/AFCI protection is even required for this equipment per the applicable code cycle and install - some jurisdictions and equipment types are exempt, and a non-compliant breaker swap may be the actual fix." },
      ],
    },
  ],
  "s-condensing-furnace-hot-flue-little-condensate": [
    {
      ask: "Watch the condensate at the drain through a full cycle and note the flue temperature. Which pattern fits?",
      options: [
        { label: "Very little condensate and a hot vent, and there is standing water visible in the secondary", verdict: "The secondary is flooded and cannot transfer heat. Chase the drain path: trap, drain hose routing and slope, collector box ports, and any pump or shared drain downstream." },
        { label: "Very little condensate, hot vent, drain path is clear and the secondary is dry", verdict: "Look at the secondary passages themselves - coating separation, scale, or a restriction at the inducer or vent elbow. Combustion products are not spending enough time in the secondary." },
        { label: "Condensate flow is normal but the vent still reads hotter than expected", verdict: "Check airflow first. Low CFM raises both rise and flue temperature. Take total external static pressure and temperature rise and correct the airside before you open the furnace up." },
      ],
    },
  ],
  "s-condensing-vent-freeze-insulation": [
    {
      ask: "Trace the full vent run, identify every section passing through an attic, crawlspace, garage or other potentially freezing space, and apply the manual test for a heated space. Are the domestic water pipes in that space protected from freezing?",
      options: [
        { label: "Water pipes in that space are not protected from freezing", verdict: "By the manual test that space is not heated, so the vent must be insulated there. Use 1/2-inch thick Armaflex-type insulation or equivalent on those sections." },
        { label: "Water pipes in that space are protected from freezing", verdict: "The space counts as heated and the vent does not need insulation through it. Move on to slope and support." },
      ],
    },
    {
      ask: "Check the horizontal vent piping and the termination. What do you find?",
      options: [
        { label: "Horizontal piping is not sloped 1/4-inch per foot", verdict: "Re-slope it. The required 1/4-inch per foot is what lets condensate drain back instead of pooling." },
        { label: "Piping sags between supports even though the slope looks right", verdict: "A sag holds condensate even on a correctly sloped run. Add support so the pipe cannot sag." },
        { label: "The termination has ice buildup or partial blockage", verdict: "Clear it, then verify the condensate trap and drain are clear and correctly primed after any vent work." },
        { label: "Slope, support and termination all check out", verdict: "Run the furnace through a full cycle, confirm the pressure switch proves and holds, and perform a CO check in the space." },
      ],
    },
  ],
  "s-contactor-pole-voltage-drop": [
    {
      ask: "With the contactor closed and the unit calling, read across each pole line side to load side, then read T1 to T2. What do you get?",
      options: [
        { label: "Near zero across both poles and full line voltage T1 to T2", verdict: "The contactor is passing power. The problem is downstream - compressor windings, capacitor, internal overload, or a mechanically stuck compressor." },
        { label: "Near full line voltage across one pole and T1 to T2 is low or zero", verdict: "That pole is not making. The compressor is being fed one leg only, which is why it hums or trips out. Replace the contactor and inspect the lugs for heat damage." },
        { label: "A measurable partial voltage across a pole while the unit runs", verdict: "Pitted contacts are adding resistance and starving the compressor. Replace the contactor, then verify voltage at the compressor terminals under load." },
        { label: "Contacts are clean but voltage is already low on the line side", verdict: "The drop is upstream. Work back through the disconnect fuses, the whip, and the branch circuit while the unit is loaded." },
      ],
    },
  ],
  "s-contactor-welded-stuck": [
    {
      ask: "Check for the call signal at the equipment, not just the thermostat display.",
      options: [
        { label: "A call is actually present at the equipment", verdict: "The thermostat is not satisfied - the unit is running because it is being told to. Sort out the thermostat and call side first." },
        { label: "No call present but the compressor keeps running", next: 1 },
      ],
    },
    {
      ask: "Shut power off at the disconnect and inspect the contactor.",
      options: [
        { label: "Contacts are melted or fused and it will not open by hand", verdict: "Welded contactor from arcing and pitting, common after repeated hard starts or a marginal capacitor. Replace it - do not try to free it, it will fail again." },
        { label: "Contactor opens normally with power off", verdict: "Look for a shorted low-voltage wire holding the contactor coil energized without a real thermostat call." },
      ],
    },
  ],
  "s-control-fuse-overamp-stuck-coil": [
    {
      ask: "Clamp each 24V coil lead individually with the system calling. What does the comparison look like?",
      options: [
        { label: "One coil is pulling far more than the others", verdict: "Take that coil off its stem or armature. If the draw drops to normal once it is off the valve or contactor, the mechanical part is jammed - that is what is eating the fuse." },
        { label: "All coils look similar but total secondary draw is still high", verdict: "Add up the connected VA against the transformer rating. Accessories added after install can push the secondary past what the transformer and fuse will carry." },
        { label: "Total draw spikes hard the instant one specific conductor is landed", verdict: "That conductor has a short. Isolate that leg and ring it out - look at staples, chafe points at panel edges, and the whip at the outdoor unit." },
      ],
    },
  ],
  "s-control-relay-failure-modes": [
    {
      ask: "Energize and de-energize the coil and watch what the relay and its load actually do.",
      options: [
        { label: "No click at all and the relay never pulls in", verdict: "Ohm the coil and compare against a known-good spec or a fresh relay. An open coil fits this, while a shorted coil instead pulls in but sags the transformer or blows the fuse." },
        { label: "Relay clicks but the load does not actually transfer", verdict: "That is a mechanical failure: binding armature, broken return spring, or a cracked contact arm, all common in relays exposed to dust or moisture." },
        { label: "Load stays energized after the coil de-energizes", verdict: "Contacts are welded closed, usually from repeated high-inrush switching or a load oversized for the contact rating. Check for a chattering or arcing history before just replacing it." },
        { label: "Relay pulls in and drops out rapidly, chattering", verdict: "That is unstable coil voltage from a dirty or loose low-voltage connection, transformer overload, or marginal C-wire voltage. Fix the voltage stability, not just the relay." },
      ],
    },
    {
      ask: "If the load runs but runs weak, dim, or intermittently, measure voltage drop across the closed contacts under load.",
      options: [
        { label: "Noticeable voltage drop across the closed contacts", verdict: "Pitted, high-resistance contacts. A healthy relay should show near-zero drop, so replace it." },
        { label: "Near-zero drop across the closed contacts", verdict: "The contacts are passing current fine. Look elsewhere for the weak or intermittent load, and match contact form and coil voltage exactly on any replacement." },
      ],
    },
  ],
  "s-control-transformer-primary-secondary-check": [
    {
      ask: "With power restored and the control panel open, meter the secondary side of the transformer, R to C. What do you read?",
      options: [
        { label: "24 volts at the secondary, R to C", verdict: "The transformer is producing on the secondary side - look downstream of the transformer for the problem." },
        { label: "No voltage at the secondary", next: 1 },
        { label: "This is a ComfortNet ready condensing unit and there is no transformer to find", verdict: "The 240 VAC to 24 VAC transformer is optional on those units and only feeds the UC control in certain communicating installations - confirm the unit is supposed to have one at all." },
      ],
    },
    {
      ask: "Check the transformer primary voltage at the incoming line voltage connections and at any splices. What is there?",
      options: [
        { label: "Line voltage at the primary and the wiring and splices are good", verdict: "The transformer is inoperative - replace it." },
        { label: "No line voltage at the primary, or a bad splice or bad wiring feeding it", verdict: "The transformer is not being fed. Repair the wiring or the splices rather than replacing the transformer." },
      ],
    },
  ],
  "s-crankcase-heater-continuity": [
    {
      ask: "With power off and the heater lead-in wires disconnected, ohm the crankcase heater.",
      options: [
        { label: "Does not test continuous", verdict: "Replace the heater, then energize it a minimum of four hours before operating the condensing unit." },
        { label: "Continuous, reading roughly 1800 ohms on a cold shell", next: 1 },
        { label: "Continuous but reading well above 1800 ohms with a warm compressor shell", verdict: "Normal for this 40 watt, 265 volt PTC heater - resistance climbs as the shell warms. Read it cold if you want to compare against the number." },
      ],
    },
    {
      ask: "The heater tests good. What is the customer still reporting?",
      options: [
        { label: "Slugging continues", verdict: "The heater prevents migration and off-cycle accumulation, not compressor damage from floodback or an overcharge. Investigate charge level and the metering device." },
        { label: "No further complaint", verdict: "Reconnect the heater and energize it a minimum of four hours before operating the condensing unit." },
      ],
    },
  ],
  "s-crankcase-heater-thermostat-67-85": [
    {
      ask: "Measure the temperature at the crankcase heater thermostat. Where is it?",
      options: [
        { label: "Above 85 degrees", verdict: "The thermostat is open and the heater is off by design. Do not condemn the heater based on a check made in warm conditions." },
        { label: "Below 67 degrees and the heater is still cold", verdict: "The thermostat should be closed and the heater on. Confirm power is supplied to the unit and that the heater is connected to the contactor L1 and L2 terminals." },
        { label: "Between 67 and 85 degrees", verdict: "You are between the close point and the open point, so the check proves nothing. Re-check below 67 degrees, and remember the insert type heater is self regulating, so amp draw alone can be misleading." },
      ],
    },
  ],
  "s-crankcase-heater-warmup-before-start": [
    {
      ask: "Check the nameplate - does this DX20VC/DZ20VC actually carry a crankcase heater?",
      options: [
        { label: "5 ton - heater fitted", next: 1 },
        { label: "2, 3, or 4 ton - no crankcase heater on this platform", verdict: "There is nothing to wait on. Start the unit without the warm-up delay." },
      ],
    },
    {
      ask: "After the extended power-off, how long has the heater been energized before you start the compressor?",
      options: [
        { label: "Less than 2 hours", verdict: "Wait it out. This platform states 2 hours minimum energizing time before running the compressor." },
        { label: "2 hours or more, and the compressor sounds like it is slugging at start", next: 2 },
      ],
    },
    {
      ask: "Disconnect all power, disconnect the heater lead-in wires, and ohm the heater.",
      options: [
        { label: "Does not test continuous", verdict: "Replace the heater. This one is a 33 watt, 240 volt PTC with a cool resistance around 1745 ohms that rises as the shell warms." },
        { label: "Continuous, reading near 1745 ohms cool", verdict: "The heater is proven, and it does not protect the compressor from floodback or an overcharge. Move on to charge level and metering device checks." },
      ],
    },
  ],
  "s-crawlspace-airhandler-moisture": [
    {
      ask: "Look at where the moisture and damage are actually showing up around the crawlspace equipment.",
      options: [
        { label: "Water beading on the outside of supply ducts while cold air runs", verdict: "That is external condensation from humid crawlspace air, not an internal condensate drain problem. It points to inadequate duct insulation or vapor barrier for the space's conditions." },
        { label: "Rust and corrosion on the cabinet, contactors, and boards", verdict: "Chronic high humidity exposure accelerates wear on these components well beyond what the same equipment would see in a conditioned space. Expect shorter component life here." },
        { label: "Standing water or an exposed dirt floor with no vapor barrier and poor ventilation", verdict: "That is the source condition feeding corrosion and mold on and around the equipment. Raise it with the customer as a building-science issue, not just an equipment one, especially in a vented crawlspace in a humid climate." },
        { label: "Unit sitting low, close to the crawlspace floor", verdict: "It is exposed to more moisture and flooding risk than one properly elevated. Check elevation and support against code and manufacturer clearance requirements." },
      ],
    },
  ],
  "s-csst-gas-line-not-bonded": [
    {
      ask: "Look at the jacket and the manufacturer marking on the flexible gas tubing. What is it?",
      options: [
        { label: "Yellow jacket CSST", next: 1 },
        { label: "Black arc-resistant jacketed CSST", verdict: "The 2018 and later IFGC and IRC recognize black arc-resistant jacketed CSST as not requiring the same direct bonding - do not call it a defect on the jacket alone. Check with the authority having jurisdiction if you are unsure which code cycle applies." },
      ],
    },
    {
      ask: "Follow the yellow CSST back and look for a bonding clamp on a rigid pipe component downstream of the point of delivery - the gas meter, or the second-stage regulator on LP. What did you find?",
      options: [
        { label: "No bonding conductor anywhere on it", verdict: "Unbonded yellow CSST is a licensed electrician's correction, not a field improvisation. Document it and notify the homeowner in writing." },
        { label: "Bonding conductor smaller than 6 AWG copper, longer than 75 feet, or not landed on the grounding electrode system", verdict: "The bond does not meet the requirement. Refer the correction to a licensed electrician and document it." },
        { label: "Clamp squeezed onto the corrugated tubing itself", verdict: "The clamp has to be listed for the purpose and installed on rigid pipe or a CSST fitting, not on the corrugated tubing. Refer the correction to a licensed electrician." },
        { label: "Bond present, correct size, length and landing", verdict: "The CSST bonding checks out. While you are there, verify the furnace's own equipment ground is intact and check line polarity - loose grounding shows up as erratic flame sensing." },
      ],
    },
  ],
  "s-daikin-6vs-incomplete-defrost-causes": [
    {
      ask: "Start at the top of the manufacturer cause list: check the liquid stop valve and the gas stop valve. Are both fully open?",
      options: [
        { label: "One of them is only partially open", verdict: "That is first on the list for incomplete defrost. Open it fully and re-run a defrost before going any further." },
        { label: "Both fully open", next: 1 },
      ],
    },
    {
      ask: "With both valves open, work the refrigerant path, the sensors, and the airflow. What did you find?",
      options: [
        { label: "Restriction in the line set, a run longer than the limit, or a blocked filter-drier", verdict: "Correct the refrigerant path: replace a restricted filter-drier, clear the restriction, and change the outdoor unit position if the run is too long." },
        { label: "A defrost, coil, ambient, discharge, or suction temp sensor out of spec on resistance or with a bad connection", verdict: "Replace the failed sensor and recheck defrost operation." },
        { label: "Outdoor heat exchanger dirty, or outdoor air recirculating because of unit placement", verdict: "Clean the outdoor heat exchanger and correct the recirculation caused by the unit placement." },
        { label: "All of that checks clean", verdict: "Move to the outdoor and indoor EEV coils and their connections to the control board, the EEV bodies, and the check valve for leakage. If non-condensible gas is suspected, recover the refrigerant and evacuate the piping before recharging." },
      ],
    },
  ],
  "s-daikin-address-jumper-ja": [
    {
      ask: "With power off and the front grille, electrical box and shield plate removed, look at the address setting jumper JA on the indoor PCB. What state is it in?",
      options: [
        { label: "JA intact", verdict: "That head is address 1. To make it address 2, cut jumper JA only, and make the matching address change in the wireless remote controller - both the PCB and the remote need altering." },
        { label: "JA already cut", verdict: "That head is already address 2. If it still answers the wrong remote, the matching change was never made in the wireless remote controller." },
        { label: "A jumper other than JA has been cut", verdict: "The remaining jumpers are required by the circuit - if any other jumper was cut, the PCB must be replaced." },
      ],
    },
  ],
  "s-daikin-ah-board-leds": [
    {
      ask: "Count the green LED flashes on the air handler control and multiply by 100 for live CFM. How does that compare to what the system should be moving?",
      options: [
        { label: "Flash count matches the expected CFM", next: 1 },
        { label: "Flash count well under the expected CFM", next: 2 },
      ],
    },
    {
      ask: "Read the red diagnostic LED and consider whether the complaint is intermittent.",
      options: [
        { label: "Red LED flashing a code", verdict: "Look it up in Error Codes under Daikin air handlers - heater kit selection faults, open fuse, internal control fault, data errors, or blower motor faults." },
        { label: "No code now, but the customer reports an intermittent problem", verdict: "Know the recall gap: DATA ERRORS (d-codes) are NOT included in the fault recall list. An intermittent shared-data problem has to be caught live." },
      ],
    },
    {
      ask: "Measure DC voltage between pins 1 and 4 at the 4-wire motor connector.",
      options: [
        { label: "9 to 15 VDC", verdict: "The control is doing its job, so the motor or its harness owns the low airflow." },
        { label: "Outside 9 to 15 VDC", verdict: "The control is the problem. Replace it rather than the motor." },
      ],
    },
  ],
  "s-daikin-bp-unit-leds-and-terminals": [
    {
      ask: "Confirm power at X1M L1/L2 on the BP unit (60 Hz, 208 to 230 V) and then look at the board. What do you have?",
      options: [
        { label: "Power at X1M and the green H1P service monitor LED is lit", verdict: "The board has control power. Read H2P through H5P (LED 1 through LED 4), the red error indication LEDs, and verify the X6M F1/F2 transmission wiring to the outdoor unit or the next BP unit." },
        { label: "Power at X1M but no sign of control power on the board", verdict: "Check fuse F2U before condemning the board." },
        { label: "No power at X1M L1/L2", verdict: "The BP unit is not being fed. Work the power supply to X1M before reading anything into the LEDs." },
      ],
    },
  ],
  "s-daikin-c4-c9-thermistor-check": [
    {
      ask: "With the power switch off before touching connectors, check the connection of the thermistor connector the code names - C4 indoor heat exchanger, C9 room temperature. What did you find?",
      options: [
        { label: "Bad or loose connection at the thermistor connector", verdict: "Correct the connection first. The board declares this fault when the input goes to 4.96 V or more or 0.04 V or less, which a bad connection will do on its own." },
        { label: "Connections good", next: 1 },
      ],
    },
    {
      ask: "Disconnect the thermistor and measure its resistance against the manual's thermistor resistance table for the measured temperature. What do you get?",
      options: [
        { label: "Resistance is not normal for that temperature", verdict: "Replace the thermistor." },
        { label: "Resistance is normal", verdict: "Connection and resistance both normal - replace the indoor unit PCB, then confirm the code clears with the compressor running." },
      ],
    },
  ],
  "s-daikin-check-operation-outdoor-pcb": [
    {
      ask: "With the front panel mounted, hold TEST (BS4) on the outdoor PCB for 5 seconds and let it run without interrupting power. What do the outdoor PCB LEDs show?",
      options: [
        { label: "H3P on at completion", verdict: "Normal completion - the wiring and stop valve checks passed." },
        { label: "H2P and H3P both on at completion", verdict: "Abnormal completion. Read the error code at the indoor remote controller, correct the fault, and re-run check operation." },
        { label: "H2P still blinking and the remote still shows the test operation indication", verdict: "It is still running - do not interrupt power. Judgments come within 15 minutes and up to about 30 minutes maximum." },
      ],
    },
  ],
  "s-daikin-dfve-aux-alarm-and-heat-kit": [
    {
      ask: "Look at the aux alarm connection on the DFVE. Is the short red circuiting wire still there?",
      options: [
        { label: "Short red circuiting wire still in place with the alarm switch landed", verdict: "Leaving that jumper in defeats the switch. Remove the short red wire and land the aux alarm switch in its place." },
        { label: "Red wire removed and the switch landed in its place", next: 1 },
      ],
    },
    {
      ask: "On a unit with the optional heat kit, what happened to connector PL1?",
      options: [
        { label: "PL1 is still connected", verdict: "The wiring notes direct you to discard connector PL1 when the optional heat kit is installed." },
        { label: "PL1 was discarded and the heat kit still will not run", verdict: "Check selector switches DS1 through DS6 against the intended positions - the positions printed on the diagram are the factory settings." },
      ],
    },
  ],
  "s-daikin-dfve-e5-fuse-open": [
    {
      ask: "With power off and zero volts confirmed, check fuse F1U on the control board for continuity and check connector TB10. What do you find?",
      options: [
        { label: "F1U is open", next: 1 },
        { label: "F1U reads continuous but TB10 is open", verdict: "An open TB10 throws the same E5 code. Repair that connection - do not replace the fuse or the board for this." },
      ],
    },
    {
      ask: "Before replacing F1U, inspect the AUX alarm circuit wiring, the heater kit wiring, and the communication connection for shorts, pinches and miswiring. Then replace F1U with the same rating and restore power. What happens?",
      options: [
        { label: "Fuse holds and the codes clear on their own", verdict: "Normal recovery. Expect E5 to stay on the indoor PCB about 30 seconds and BLOWN FUSE at the thermostat up to 45 seconds, then both clear automatically." },
        { label: "The new fuse opens again immediately", verdict: "Something is still shorted. Isolate circuits one at a time, and replace the control board only after the external wiring is proven good." },
      ],
    },
  ],
  "s-daikin-dfve-ed-heater-kit-dip": [
    {
      ask: "With power off, read the rating off the installed heater kit nameplate and compare it to the heater kit DIP switch setting on the board. What do you find?",
      options: [
        { label: "The DIP setting does not match the installed kit", verdict: "That is the Ed. Set the switches to match that kit using the heater kit selection table in the installation instructions - valid selections depend on the unit configuration, so do not guess a position." },
        { label: "The DIP setting matches the kit and the table", next: 1 },
      ],
    },
    {
      ask: "Restore power with the switches confirmed correct. What does the PCB display do?",
      options: [
        { label: "Ed clears and each stage of electric heat energizes on a heat call", verdict: "Configuration was the whole problem. Nothing else to do." },
        { label: "Ed comes back with the switches confirmed correct", verdict: "Check the heater kit wiring and connections back to the control board before replacing the board." },
      ],
    },
  ],
  "s-daikin-dfve-ef-aux-switch-open": [
    {
      ask: "With the code confirmed as EF, check the drain pan and then, with power off, check continuity across auxiliary alarm terminals TB4 and TB5. What do you find?",
      options: [
        { label: "Pan is holding water and TB4 to TB5 reads open", verdict: "High water level opened the auxiliary circuit. Clear the condensate drain and get the water out of the pan, then let EF clear." },
        { label: "Pan is dry but an alarm device wired into the auxiliary circuit is tripped", verdict: "Reset that alarm device and confirm it stays reset. EF clears about 30 seconds after recovery at the PCB and up to 45 seconds at the thermostat." },
        { label: "No auxiliary device is used on this install and TB4/TB5 are open", verdict: "The terminals were left unjumpered. Close TB4 and TB5 as the manual directs." },
        { label: "TB4 and TB5 read closed but EF persists after power up", verdict: "Trace that wiring back to the board before condemning the board." },
      ],
    },
  ],
  "s-daikin-dfve-fault-recall": [
    {
      ask: "Put the unit in standby with no thermostat inputs active and hold the FAULT RECALL button for more than 2 seconds. What comes back?",
      options: [
        { label: "Faults play back in order, most recent first, up to the last 6", verdict: "Write every code down before doing anything that could clear the buffer, then cross-reference them against the unit's fault table before condemning any part." },
        { label: "Nothing stored, but the customer reports intermittent operation", verdict: "Do not assume the board is clean - move to live diagnostics." },
        { label: "Button does nothing", verdict: "Recall only works in standby with no thermostat inputs present - confirm there is no call in and try again." },
      ],
    },
  ],
  "s-daikin-dfve-network-leds": [
    {
      ask: "Find the red STATUS LED and the green RX LED on the air handler control and watch them. What do you see?",
      options: [
        { label: "Green RX LED is not indicating any network traffic", verdict: "No traffic means work the bus, not the application. Verify the communication wiring and terminations end to end before touching the LEARN button." },
        { label: "Green RX LED is showing traffic", verdict: "The board is seeing the network. Read the red STATUS LED for network status and work from there rather than pulling the control." },
      ],
    },
  ],
  "s-daikin-dm96se-cool-off-delay-complaint": [
    {
      ask: "Remove the cooling call and time how long the circulator blower keeps running.",
      options: [
        { label: "About 45 seconds, then it stops", verdict: "That is the fixed cool-off delay on this control - designed, not a stuck relay. Explain it to the customer." },
        { label: "Much longer than 45 seconds", verdict: "That points at a stuck control output or a jumped G. Check the G circuit and the control output." },
        { label: "Outdoor fan and compressor also keep running after the call is removed", verdict: "Those should de-energize immediately when the call drops. That is a separate problem from the blower delay - chase the cooling outputs." },
        { label: "Blower takes about 5 seconds to start at the beginning of the call", verdict: "Normal - the control starts the blower at cool speed after a fixed 5 second on delay." },
      ],
    },
  ],
  "s-daikin-dm96se-heat-sequence-timings": [
    {
      ask: "Watch a full heat cycle against the normal timings and note the step where the sequence actually fails. Where does it die?",
      options: [
        { label: "On R and W closing the induced draft blower never energizes or the pressure switch contacts never close", verdict: "The control runs safety circuit checks then energizes the induced draft blower. Work the inducer and the pressure switch circuit." },
        { label: "Igniter warm up runs but the gas valve never opens at the end of the 17 second warm up", verdict: "Warm up is completing but the valve is not opening. Work the gas valve circuit rather than the igniter." },
        { label: "Flame lights then gas flow stops within the short proving window", verdict: "The control is not seeing a flame signal from the sensor in its proving time. Clean the sensor, check microamps, and verify polarity and ground." },
        { label: "Burners run but the circulator never comes on after the fixed 30 second blower on delay", verdict: "The blower on delay is fixed at 30 seconds on this control. Work the circulator circuit, not the ignition side." },
      ],
    },
    {
      ask: "At the end of the call, time the shutdown. What do you see?",
      options: [
        { label: "Gas valve cycles off, induced draft blower de-energizes after a 15 second post purge, circulator runs out its heat off delay", verdict: "Normal shutdown for this control. Run a CO check before leaving." },
        { label: "Post purge or the heat off delay does not match those timings", verdict: "Note that step and troubleshoot that component rather than the symptom." },
      ],
    },
  ],
  "s-daikin-dm96sn-pressure-switch-must-prove-open": [
    {
      ask: "With the heat call in and before the inducer runs, read Pin 5 of the 12-pin connector.",
      options: [
        { label: "24 VAC on Pin 5 before the inducer runs", verdict: "The control requires the pressure switch circuit to read OPEN before it energizes the inducer, so it will not proceed. Find the stuck-closed switch or the shorted hose or wiring." },
        { label: "0 VAC on Pin 5", next: 1 },
      ],
    },
    {
      ask: "Check the other two gates on the call: 24 VAC at W and at Pin 8.",
      options: [
        { label: "No 24 VAC on W with the thermostat contacts closed", verdict: "The heat call is not reaching the board. Work the thermostat side." },
        { label: "24 VAC on W but no 24 VAC on Pin 8", verdict: "The limit switch is not proving closed. Fix the limit circuit - the control will not move on without it." },
        { label: "24 VAC on W and Pin 8 with Pin 5 open", verdict: "All three gates are satisfied. Let the control finish its gas valve circuitry check, then watch the inducer energize and Pin 5 change to 24 VAC as the pressure switch proves - that transition starts pre-purge." },
      ],
    },
  ],
  "s-daikin-dm96vc-two-stage-lo-hi-manifold": [
    {
      ask: "Identify the gas valve before you connect anything. Which valve is on this furnace?",
      options: [
        { label: "Honeywell VR9205", verdict: "Remove the outlet pressure tap plug and install an 1/8-in. NPT hose barb fitting. If you are reading at the Honeywell inlet tap, install the field-supplied hose barb first." },
        { label: "White-Rodgers 36J54", verdict: "Back the outlet pressure test screw out one turn counterclockwise, no more than one turn. For the inlet tap on this valve use the 36G/J Valve Pressure Check Kit, part 0151K00000S." },
      ],
    },
    {
      ask: "With gas and power restored and the manometer connected, which stage is firing wrong?",
      options: [
        { label: "Low stage", verdict: "Close thermostat R and W1 for a low stage heat call and set LOW at the LO regulator tower - cover screw off, clockwise to increase or counterclockwise to decrease, cover screw back on. Use only the pressure specified on the rating plate for this model and fuel." },
        { label: "High stage", verdict: "Close thermostat R and W2 for a high stage heat call and set HIGH at the separate HI regulator tower the same way. Set LOW first if you have not already." },
        { label: "Both stages", verdict: "Set LOW first under an R to W1 call at the LO tower, then HIGH under an R to W2 call at the separate HI tower. Make only small adjustments at each regulator." },
      ],
    },
  ],
  "s-daikin-dm97mc-dehum-enable": [
    {
      ask: "Check the dehumidistat itself before touching the furnace. Does its switch open or close on a rise in humidity?",
      options: [
        { label: "Opens on humidity rise, 24 VAC", next: 1 },
        { label: "Closes on humidity rise", verdict: "Wrong switch action - it will not work with this board. The humidity control has to be one that opens on humidity rise." },
      ],
    },
    {
      ask: "With power off, check where the dehumidistat leads land, then check the dehumidification ENABLE DIP switch. What do you find?",
      options: [
        { label: "The ENABLE DIP switch is still OFF", verdict: "That is why the blower never slows. Power back on and set the dehumidification ENABLE DIP switch from OFF to ON per the DIP switch chart in the back section of the manual, then test with a combined cooling and dehumidification call - the circulator should run about 85 percent of the desired speed." },
        { label: "ENABLE is ON but the leads are not on DEHUM and R", verdict: "Land the neutral lead (typically white) on the DEHUM terminal and the hot lead (typically black) on the R terminal of the integrated control module. Ground the green lead to the junction box ground screw if the dehumidistat has one." },
        { label: "ENABLE is ON, leads are correct, and the condenser is a straight cooling unit", verdict: "Install a jumper from Y1 to O on the furnace board for a straight cooling condenser, then retest with a combined cooling and dehumidification call." },
      ],
    },
  ],
  "s-daikin-dm97mc-heat-setup-dip-communicating": [
    {
      ask: "With a communicating thermostat confirmed and the Thermostat Heat Setup DIP switch on the 1-Stage heat selection, place a heat call and watch Heat Current Demand Status. What does it show?",
      options: [
        { label: "0 percent through the light off sequence", verdict: "Normal, not a dropped call. After a successful light off and the ignition stabilization period the control adjusts to the low firing rate, and about 2 minutes later it accepts the specific heat requested demand." },
        { label: "50 percent once it settles out", verdict: "That is what the status shows with a differential of 2 degrees or less. Nothing to fix - above 2 degrees it will track the requested demand." },
        { label: "It tracks the requested demand percentage", verdict: "That is correct operation with a differential above 2 degrees. The board is staging as designed." },
      ],
    },
    {
      ask: "Watch the circulator fan through the whole call. How does it run?",
      options: [
        { label: "Fan follows the heat airflow profile the whole time", verdict: "Setup is right. The staging complaint is a misread of the demand percentage, not a fault." },
        { label: "Fan does not follow the heat airflow profile", verdict: "Chase the airflow profile setting rather than the staging." },
      ],
    },
  ],
  "s-daikin-dozp-damper-not-connected-errors": [
    {
      ask: "Read the error number on the DOZP zone controller. Which range is it in?",
      options: [
        { label: "82 through 87", next: 1 },
        { label: "88 through 8C", verdict: "That is a wired zone temperature sensor that is enabled but short circuited. Verify that sensor is installed and wired correctly and measure resistance across that zone sensor pins." },
      ],
    },
    {
      ask: "Map the code to its zone (82 is zone 1, 83 zone 2, 84 zone 3, 85 zone 4, 86 zone 5, 87 zone 6). How does the error behave?",
      options: [
        { label: "The error is always on", verdict: "Go straight to that zone damper wiring connection at the panel and at the damper. Verify the C, PO and PC leads land on the correct green damper terminal block for that zone." },
        { label: "The error comes and goes", verdict: "Look for loose wiring in that zone damper connection rather than a failed damper." },
      ],
    },
    {
      ask: "Check that zone damper run end to end. What do you find?",
      options: [
        { label: "Open conductor or a short between conductors in the run", verdict: "Repair or replace the damper wiring for that zone - the controller detects dampers at power up and posts the error when it finds none." },
        { label: "Wiring checks continuous with no shorts", verdict: "Confirm the damper motor itself drives when powered before condemning the panel." },
      ],
    },
  ],
  "s-daikin-dozp-field-transformer": [
    {
      ask: "Look at the panel and determine how the zone controller is actually being powered. What is there?",
      options: [
        { label: "No dedicated 24VAC transformer - the panel is being fed off the equipment transformer", verdict: "The zone controller transformer is field supplied and is missing. Install a 24VAC transformer sized for the panel plus the connected dampers, landed on the POWER terminal block." },
        { label: "A dedicated 24VAC transformer is installed for the zone controller", next: 1 },
      ],
    },
    {
      ask: "Energize and measure 24VAC at the panel with all dampers driving at once, not just at rest. What do you read?",
      options: [
        { label: "Voltage holds steady with every damper driving", verdict: "The transformer is sized right. Verify the thermostat signal, outdoor unit, pressure transducer, and damper wiring each land on their own dedicated terminal blocks and not on the power block." },
        { label: "Voltage sags as soon as the dampers drive", verdict: "The transformer is undersized for the damper count. Replace it with one sized for the panel plus all connected dampers." },
      ],
    },
  ],
  "s-daikin-dx16tc-high-pressure-control-check": [
    {
      ask: "Reconnect the control wire, put a gauge on the base valve service port, start the system and block the condenser coil with cardboard. At what pressure does the control cut out?",
      options: [
        { label: "Cuts out at 610 PSIG, within plus or minus 10 PSIG", verdict: "The control is doing its job. Remove the cardboard immediately - the high head pressure is real, so work the causes of high head pressure instead of replacing the control." },
        { label: "Cuts out below the 610 PSIG plus or minus 10 PSIG range", verdict: "The control is tripping early and nuisance-tripping the unit. Replace the high pressure control." },
        { label: "Ohmmeter already showed no continuity across its terminals before the test", verdict: "The contacts are open with no pressure on them. Replace the control - it will not let the unit run." },
        { label: "Cuts out in range but never resets as pressure falls", verdict: "This control is supposed to reset automatically. Replace it if it will not reset once the cardboard is removed and pressure drops." },
      ],
    },
  ],
  "s-daikin-ecm-fan-relay-pin-voltages": [
    {
      ask: "With power restored, measure voltage between the black and brown motor leads. What do you read?",
      options: [
        { label: "208/230 volts depending on the power supply", next: 1 },
        { label: "No high voltage at the motor leads", verdict: "The motor is not getting line voltage. Work the high voltage supply to the motor leads before touching the low voltage side." },
      ],
    },
    {
      ask: "Disconnect the fan motor harness from its plug on the UC board. Energize LOW stage and check pin 5 (blue) to pin 3 (yellow), then HIGH stage for pin 5 to pin 3 and pin 5 (blue) to pin 1 (white). What do you get?",
      options: [
        { label: "24 VAC on all of those pins in their stages", next: 2 },
        { label: "24 VAC missing on one or more of those pins", verdict: "The stage command is not coming out of the board. The UC board side is the problem, not the motor." },
      ],
    },
    {
      ask: "Plug the harness back into the board and check the same voltages at the motor end. What do you get?",
      options: [
        { label: "Same voltages present at the motor end", verdict: "High voltage and both stage commands are reaching the motor - the motor is defective and needs to be replaced." },
        { label: "Voltage at the board pins but missing at the motor end", verdict: "There is a broken wire in the harness between the board and the motor. Repair the harness rather than replacing the motor." },
      ],
    },
  ],
  "s-daikin-eev-latch-sound-and-coil-continuity": [
    {
      ask: "With the EV connector confirmed correctly connected to the PCB, turn the power off and on and listen close to the valve body. What do you hear?",
      options: [
        { label: "A latching sound as the valve drives through its range", verdict: "The EV is driving. The sound varies by valve type, so listening close is the right call - look elsewhere for the fault." },
        { label: "No latching sound at the valve", next: 1 },
      ],
    },
    {
      ask: "Power down, disconnect the connector, and check continuity between pins 1-6, 2-6, 3-6 and 4-6. What do you get?",
      options: [
        { label: "No continuity between one or more of those pins", verdict: "The EV coil is faulty - replace the coil." },
        { label: "Continuity confirmed on all four pairs", verdict: "Coil checks good but the valve still does not drive - the outdoor unit PCB is faulty." },
      ],
    },
  ],
  "s-daikin-fit-208v-transformer-tap": [
    {
      ask: "Measure actual supply voltage at the unit, then look at where the red wires land on the transformer. What do you have?",
      options: [
        { label: "About 208 VAC service with the red wires on the 230 V terminal", verdict: "That is the miss. Kill power and move the red wires to the 208 V terminal of the transformer for 208 VAC operation, then measure secondary voltage to confirm it is back in range." },
        { label: "About 208 VAC with the red wires already on the 208 V terminal", verdict: "The tap is already correct. Measure secondary voltage to confirm it is in range and look elsewhere for the fault or dropout." },
        { label: "230 VAC service", verdict: "The 208 V tap change does not apply on a 230 VAC service. Leave the red wires where they are." },
      ],
    },
  ],
  "s-daikin-fit-a2l-dry-contact-check": [
    {
      ask: "With the unit powered, no error code on the 7-segment display, and the meter in continuity mode, check across TB11 and TB12 and across TB11 and TB13 in the normal condition. What do you read?",
      options: [
        { label: "Continuity across TB11-TB12 and no continuity across TB11-TB13", next: 1 },
        { label: "Any other combination", verdict: "That is a faulty PCB. Replace it." },
        { label: "An error code is showing on the 7-segment display", verdict: "Troubleshoot that code first - the leak detection error codes are A0, A1 and AF. Do not judge the contacts with a code active." },
      ],
    },
    {
      ask: "Start the Refrigerant Leak Test through the DK1+ thermostat and re-check both pairs during the test. What do you read now?",
      options: [
        { label: "No continuity across TB11-TB12 and continuity across TB11-TB13", verdict: "The board is switching the dry contacts correctly. Now confirm the connected damper, UV light and ventilator kits actually follow the contacts - the damper fully open and any ignition source shut down." },
        { label: "Any other combination during the test", verdict: "Faulty PCB - replace it as needed." },
      ],
    },
  ],
  "s-daikin-fit-airflow-and-shared-data-codes": [
    {
      ask: "Read the code off the system and note which family it falls in before pulling anything apart. Which is it?",
      options: [
        { label: "B0/Eb0 or B9/Eb9", next: 1 },
        { label: "D0/Ed0 or D1/Ed1", verdict: "The integrated control module has no shared data or invalid shared data on this communicating system. Replace the A2P control board if necessary." },
        { label: "D2/Ed2", verdict: "This one is flagged critical - the control has lost communication between outdoor and indoor. Check the communication wiring end to end before replacing any boards." },
      ],
    },
    {
      ask: "B0 is estimated indoor airflow near 0 CFM and B9 is airflow lower than the requirement. Work the indoor airflow side - what did you find?",
      options: [
        { label: "Indoor fan motor wiring or connector fault", verdict: "Repair or replace the wiring and connectors, then clear the code and re-run the system to confirm the fault does not return." },
        { label: "Indoor fan motor itself has failed", verdict: "Replace the motor, then clear the code and confirm the fault does not return." },
        { label: "Too much static pressure or an obstruction in the ductwork", verdict: "The motor is not the problem. Correct the static pressure and the duct obstruction." },
      ],
    },
  ],
  "s-daikin-fit-comm-dipswitch": [
    {
      ask: "With the wiring confirmed 1-to-1 and 2-to-2 and no more than two wires per terminal, look at the board comm LEDs. What are they doing?",
      options: [
        { label: "Red comm LED giving 1 flash", next: 1 },
        { label: "Green receive LED solid ON", verdict: "Data lines are miswired or shorted - 1 and 2 reversed, or shorted to R/C. Fix the wiring, then press LEARN about 5 seconds to reset the network." },
        { label: "Green LED flashing rapidly", verdict: "That is healthy bus traffic. The comm pair is passing data, so look elsewhere for the complaint." },
      ],
    },
    {
      ask: "Measure DC bias across the data pair. What do you read?",
      options: [
        { label: "0.6 to 0.9 VDC", verdict: "Bias is healthy, so work termination next. Run the four DS1 (outdoor) / DS7 (indoor) combinations one at a time per the manual's table, powering down between changes." },
        { label: "Outside 0.6 to 0.9 VDC", verdict: "With wiring, LEARN reset, and termination all worked, out-of-range bias points to a failed board on the bus." },
      ],
    },
  ],
  "s-daikin-fit-comm-fail": [
    {
      ask: "Read the Red Communications LED on the outdoor unit control board.",
      options: [
        { label: "Red LED is OFF", next: 1 },
        { label: "1 flash", verdict: "Communications failure. Verify the low-voltage wiring per the install instructions - watch for Terminal 1 and 2 reversed - then press the LEARN button." },
        { label: "2 flashes", verdict: "That is a normal out-of-box reset, not a fault. Move on to the Green Receive LED." },
      ],
    },
    {
      ask: "Now read the Green Receive LED on the same board.",
      options: [
        { label: "Green LED is OFF", verdict: "No power, open fuse, or comm error. Check breakers and fuses, press the LEARN button, and check terminal 1/2 wiring for shorts." },
        { label: "Steady flash", verdict: "No network found. Look for a broken communication wire, or a legacy non-communicating install." },
        { label: "Rapid flash", verdict: "That is normal traffic. Do a continuity check on the comm wires and try flipping both DS1 dip switches on the outdoor board to the opposite position before condemning a board." },
        { label: "Solid ON", verdict: "Terminal 1 and 2 are miswired or shorted to C or R. Recheck those terminations at both ends." },
      ],
    },
  ],
  "s-daikin-fit-early-warning-codes": [
    {
      ask: "Read the plain-number code on the thermostat - the outdoor board LED shows nothing for these. Which number is it?",
      options: [
        { label: "14 or 16", verdict: "14 is frequent high-pressure (E13's warning), 16 is frequent low-pressure (E15's). Work it as the refrigeration problem it names: stop valves fully open, coil cleanliness, charge level, line restrictions." },
        { label: "54 or 55", verdict: "54 is frequent low discharge-superheat (E21's warning), 55 is frequent high discharge-temp. Work charge, line restrictions, and the sensors involved rather than clearing it." },
        { label: "52 or 53", verdict: "52 is frequent compressor faults, 53 is frequent fan or board faults. These latch from repeated events, so pull the full history before deciding urgency." },
        { label: "33 or 57", next: 1 },
      ],
    },
    {
      ask: "Check the unit size to see whether this board is refrigerant-cooled.",
      options: [
        { label: "3.5-5.0 ton FIT, or 3.0-4.0 ton Enhanced Capacity", verdict: "The control board is refrigerant-cooled on these. 33 (board running hot) and 57 (board cooling loop sweating) point at the cooling bracket hardware - thermal grease, bracket screws, and flow through the board cooling circuit." },
        { label: "Smaller tonnage than that", verdict: "Still treat 33 and 57 as the board thermal condition they name rather than a nuisance alert, and pull the full fault history before deciding." },
      ],
    },
    {
      ask: "Check the outdoor unit's fault history for the matching E-code.",
      options: [
        { label: "The matching E-code is already in history", verdict: "The system has been hard-faulting, not just warning. That raises the urgency of the repair pitch considerably." },
        { label: "Only the plain-number code, no matching E-code", verdict: "You caught it before the E-code lockout, which is the cheapest point to repair. After fixing the cause, clear the fault history via the outdoor mode display so you can confirm the condition stopped recurring." },
      ],
    },
  ],
  "s-daikin-fit-learn-network-reset": [
    {
      ask: "Open the control area and read the red status LED and the green RX LED on the FIT indoor board. What do you see?",
      options: [
        { label: "No traffic on the green RX LED", verdict: "That points at the communication wiring or the other end of the bus, not at this board's logic. Confirm the comm wiring landing and polarity before forcing anything." },
        { label: "Green RX LED shows traffic but the red status LED reports the device is not on the network", verdict: "Wiring is passing traffic. Verify the landing and polarity, then use the LEARN button to reset the network and allow a few minutes for the devices to re-establish communication." },
      ],
    },
  ],
  "s-daikin-fit-mode-display": [
    {
      ask: "Read the code on the communicating thermostat. What is showing?",
      options: [
        { label: "E11", verdict: "Not a fault - it means the required SYSTEM START-UP TEST has never been run. Start it from the thermostat installer menu and the code clears on completion." },
        { label: "An E-code other than E11, such as E24", verdict: "A real fault. The outdoor board's 3-digit display shows the 2-digit version of the same code (thermostat E24 = display 24); both map in Error Codes." },
        { label: "Nothing showing now, but the customer reported a code", verdict: "Go to FAULT HISTORY on the outdoor board display before power-cycling. An intermittent E-code that cleared still lives there." },
      ],
    },
    {
      ask: "Put the outdoor board in MONITORING mode and compare its live temps and pressures against your own instruments. How do they line up?",
      options: [
        { label: "Board values track your instruments", verdict: "The board's own sensors are reading true. Work the fault from the codes and live values rather than suspecting thermistors." },
        { label: "One or more board values are off from your instruments", verdict: "That thermistor has drifted, and you found it without unplugging anything. Replace the drifted sensor." },
      ],
    },
  ],
  "s-daikin-fit-pl1-heat-kit": [
    {
      ask: "Command auxiliary or emergency heat and confirm the demand actually reaches the board. Does it?",
      options: [
        { label: "Demand reaches the board and still no electric heat", next: 1 },
        { label: "No demand reaching the board", verdict: "The problem is upstream of the heat kit. Chase the auxiliary or emergency heat call from the thermostat." },
      ],
    },
    {
      ask: "With all power off, look at the power/heater connector plugs PL1 and PL2 on this air handler that just had a heat kit added. What do you find?",
      options: [
        { label: "PL1 still in the circuit", verdict: "The instructions call for discarding connector PL1 when the optional heat kit is installed. Remove and discard PL1 per the wiring diagram note, restore power, and command auxiliary heat again." },
        { label: "PL1 already removed", verdict: "The connector is not the block. Verify the heat kit is landed per its own installation instructions with all connections tight, then confirm each heat stage energizes and the blower runs with the elements." },
      ],
    },
  ],
  "s-daikin-fit-refrigerant-leak-test-outputs": [
    {
      ask: "With power on and no error code on the 7-segment display, start the Refrigerant leak test from the thermostat and watch the outputs. What happens?",
      options: [
        { label: "Electric heater switches off, the zoning damper drives fully open, and the UV light switches off", verdict: "All three accessories are wired correctly. Change the Refrigerant leak test setting to Stop to finish - do not walk off relying on the 1 hour auto shutoff." },
        { label: "One or more of those accessories does not respond", verdict: "Correct the wiring at the leak detection terminals for whatever did not respond, then re-run the test." },
        { label: "The panel indicates the damper is open but it is not physically open", verdict: "Trust the physical check, not the panel indication. Correct the damper wiring at the leak detection terminals and re-run the test." },
      ],
    },
  ],
  "s-daikin-fit-reversing-valve-fault": [
    {
      ask: "With the reversing valve malfunction code confirmed and power off, check the reversing valve coil connectors and the coil wiring. What do you find?",
      options: [
        { label: "A coil connector not fully plugged in, or damaged or chafed wiring", verdict: "That is on the listed cause list for this code. Reseat or repair it, then run a heating and a cooling cycle and confirm the fault does not return." },
        { label: "Connectors fully seated and wiring undamaged", next: 1 },
      ],
    },
    {
      ask: "Check the reversing valve coil itself. How does it test?",
      options: [
        { label: "Coil fails", verdict: "Replace the coil, then run a heating and a cooling cycle and confirm the fault does not return." },
        { label: "Coil is good", verdict: "Move to the reversing valve body and replace it if needed." },
      ],
    },
  ],
  "s-daikin-ftxs-code-group-triage": [
    {
      ask: "Read the code from the remote controller display or the indoor unit LED indication. Which group does it fall into?",
      options: [
        { label: "Starts with A or C - A1, A5, A6, C4, C9", verdict: "Indoor unit faults: A1 indoor PCB, A5 freeze-up protection or heating peak-cut control, A6 fan motor, C4 indoor heat exchanger thermistor, C9 room temperature thermistor. Start at the indoor unit, then go to the manual page for that code." },
        { label: "E5, E6, E8 or L5", verdict: "Compressor or current faults - OL activation (compressor overload), compressor lock, input overcurrent detection, output overcurrent detection. Work the compressor and current side." },
        { label: "H9, J3, J6 or P4", verdict: "Outdoor thermistors - outdoor temperature, discharge pipe, outdoor heat exchanger, and radiation fin." },
        { label: "L3 or L4", verdict: "Temperature rise faults in the electrical box and on the radiation fin - check outdoor airflow and heat sink cleanliness first." },
      ],
    },
  ],
  "s-daikin-hall-ic-check-cdxs-fdxs": [
    {
      ask: "With power on, operation off, the connector connected and the connection confirmed secure, measure between pins 1 and 3. What do you read?",
      options: [
        { label: "About 5 V output", next: 1 },
        { label: "No 5 V output", verdict: "The PCB is defective - replace the control PCB." },
      ],
    },
    {
      ask: "Now run the fan motor and check for the generation of pulses between pins 2 and 3. What do you get?",
      options: [
        { label: "3 pulses generated", verdict: "Both readings are OK. If the fault persists, replace the control PCB." },
        { label: "No pulses generated", verdict: "The Hall IC is defective - replace the fan motor." },
      ],
    },
  ],
  "s-daikin-indoor-fan-hall-ic-check": [
    {
      ask: "With the power switch off before you touch any connector and then powered back up, check the Hall IC for an output. What do you get?",
      options: [
        { label: "No output from the Hall IC", verdict: "No Hall IC output points at the fan motor." },
        { label: "Hall IC output present", next: 1 },
      ],
    },
    {
      ask: "Check fan motor voltage - red to black on the FTXS series, black to white on RMXS series indoor units - immediately after restart, and compare the maximum against the rated voltage for that motor. What do you get?",
      options: [
        { label: "Voltage reaches rated and the motor still will not run", verdict: "Replace the fan motor." },
        { label: "Voltage does not reach rated", verdict: "Replace the indoor unit PCB (control PCB)." },
      ],
    },
  ],
  "s-daikin-indoor-fan-motor-connector-check": [
    {
      ask: "With the fan motor connector confirmed fully seated at the PCB, check the power supply output across pins 4 and 7 (310 to 340 VDC) and the control voltage across pins 4 and 3 (15 VDC). What do you have?",
      options: [
        { label: "Power supply voltage or control voltage is missing", verdict: "Missing power supply or control voltage points at the control PCB rather than the motor. Observe high-voltage precautions - those pins carry over 300 VDC." },
        { label: "Both present and in the listed range", next: 1 },
      ],
    },
    {
      ask: "Now check the rotation command output across pins 4 and 2 (1 to 5 VDC, varying with commanded speed) and the rotation pulse input across pins 4 and 1, and watch the motor. What happens?",
      options: [
        { label: "Outputs from the PCB are correct but the motor does not rotate", verdict: "Correct outputs from the PCB with no rotation points at the fan motor." },
        { label: "Rotation command voltage does not appear or does not vary with commanded speed", verdict: "The PCB is not commanding the motor - work the control PCB side." },
      ],
    },
  ],
  "s-daikin-indoor-fan-motor-vs-capacitor-vs-pcb": [
    {
      ask: "With power killed at the switch, turn the fan by hand. How does it rotate?",
      options: [
        { label: "Binds or has a rough spot", verdict: "A bind or rough spot is a motor replacement, not an electrical diagnosis - stop here." },
        { label: "Rotates smoothly", next: 1 },
      ],
    },
    {
      ask: "Check the capacitor's continuity. What do you get?",
      options: [
        { label: "No continuity, and the capacitor is a separate part on this model", verdict: "The capacitor is the fault - replace it." },
        { label: "No continuity, and the capacitor is integral to the control board", verdict: "Replace the indoor unit PCB to replace the capacitor." },
        { label: "Continuity good", next: 2 },
      ],
    },
    {
      ask: "Restore power and check the fan motor voltage immediately after restart against the rated voltage. What do you get?",
      options: [
        { label: "Voltage as rated and the fan still will not turn", verdict: "Replace the fan motor." },
        { label: "Voltage is not as rated", verdict: "Motor and capacitor check good but the voltage is wrong - replace the indoor unit PCB." },
      ],
    },
  ],
  "s-daikin-indoor-terminal-voltage-waveform": [
    {
      ask: "Check the indoor unit to outdoor unit connection wires for a wiring error and confirm they are properly insulated. What did you find?",
      options: [
        { label: "A wiring error, or damaged connection wires", verdict: "Correct the wiring error, or replace the connection wires between the indoor and outdoor units if they are damaged." },
        { label: "Wiring correct and properly insulated", next: 1 },
      ],
    },
    {
      ask: "Read the indoor terminal board between No. 1 and No. 3 and between No. 2 and No. 3 (No. 3/SIG on the 19 series), then look at the power supply waveform. What do you see?",
      options: [
        { label: "Power supply waveform is disturbed", verdict: "Locate and eliminate the cause of the disturbance instead of replacing boards - that is a site problem." },
        { label: "Waveform is clean and the wiring is correct", verdict: "Replace the indoor unit PCB (control PCB). Turn off the power switch before connecting or disconnecting any connector." },
      ],
    },
  ],
  "s-daikin-led-a-outdoor-pcb": [
    {
      ask: "Locate LED A on the outdoor unit PCB and observe it with the system powered. What is it doing?",
      options: [
        { label: "Blinking", next: 1 },
        { label: "Continuously on, or continuously off", verdict: "Work the outdoor side. Check the connection wires for a wiring error and proper insulation; if the wiring is correct and LED A still will not blink, replace the outdoor unit PCB (main PCB)." },
      ],
    },
    {
      ask: "LED A blinking means the outdoor board is transmitting. Check the connection wires between the indoor and outdoor units for wiring errors and damage. What did you find?",
      options: [
        { label: "A wiring error, or damaged connection wires", verdict: "Correct the wiring error, or replace the connection wires between the indoor and outdoor units." },
        { label: "Wiring correct but still no communication", verdict: "With LED A blinking and the wiring correct, replace the indoor unit PCB (control PCB)." },
      ],
    },
  ],
  "s-daikin-ms-remote-code-check": [
    {
      ask: "Hold TIMER CANCEL for 5 seconds until 00 shows, then press TIMER CANCEL repeatedly and listen. What do you hear?",
      options: [
        { label: "A single long beep at one of the codes", verdict: "That is the stored fault code. Note the number on the temperature display and cross-reference it in Error Codes, then hold TIMER CANCEL 5 seconds to exit." },
        { label: "Only short beeps or two consecutive beeps all the way through", verdict: "No match found this way. Use Check Method 2 - press TEMP up, TEMP down, and MODE at the same time to enter diagnosis mode, then step through the left-side and right-side digits by ear the same way." },
      ],
    },
  ],
  "s-daikin-ms-wont-start": [
    {
      ask: "Check outdoor ambient temperature against the mode the customer is asking for.",
      options: [
        { label: "Asking for heat with outdoor above 24C (75.2F)", verdict: "Heating is locked out above that outdoor temp. Normal operating-range behavior, not a fault." },
        { label: "Asking for cool with outdoor below 10C (50F)", verdict: "Cooling is locked out below that outdoor temp. Normal operating-range behavior, not a fault." },
        { label: "Outdoor temp is within range for the mode called", next: 1 },
      ],
    },
    {
      ask: "Check supply voltage at the unit and note how it fails.",
      options: [
        { label: "Rated line voltage is not present at the unit", verdict: "Power problem. Correct the supply before chasing the unit." },
        { label: "It runs, then stops with the operation lamp going off", verdict: "A brief 2-10 cycle power blip does exactly that. Look for a flaky power connection or an upstream electrical issue." },
        { label: "Rated voltage present and it simply will not start", verdict: "Confirm the indoor unit type is a compatible match with the outdoor unit and that the wired remote address matches the indoor unit, then run Check Method 1 on the remote to see if a fault code is stored." },
      ],
    },
  ],
  "s-daikin-one-status-live-data": [
    {
      ask: "On the Status page, compare current indoor CFM against the current or requested fan demand. How do they compare?",
      options: [
        { label: "Big gap - delivered CFM well under the demand", verdict: "That points at duct restriction or motor cutback before you ever drop a static probe. Work the airflow side." },
        { label: "CFM tracks the demand closely", next: 1 },
      ],
    },
    {
      ask: "Check the 'current critical error' and 'current minor error' slots on the same Status page.",
      options: [
        { label: "A minor error is listed", verdict: "The minor slot is where the early-warning codes (14/16/33/52-57) live. Work that condition rather than clearing it." },
        { label: "Both slots are clear", verdict: "Move to the live refrigeration values - OD EEV opening %, liquid EEV opening %, and indoor superheat in cooling give you circuit behavior before you connect a tool." },
      ],
    },
  ],
  "s-daikin-one-system-tests": [
    {
      ask: "Run Charge Verification Mode from System Optimization and watch the live status number. Where does it settle?",
      options: [
        { label: "6 or 7", verdict: "In range - 6 displays the SubCool value and 7 is subcool in range and confirming. You have the charge verdict without hooking gauges." },
        { label: "2, 3, or 4", verdict: "Still stabilizing (2), outdoor fan speed out of range (3), or compressor speed out of range (4). Let it settle, and if 3 or 4 persists work that before judging charge." },
      ],
    },
    {
      ask: "Check the System Test status under System Optimization on this inverter AC/HP.",
      options: [
        { label: "Status 0 - 'System test required'", verdict: "The test has never been run. A brand-new install sits here - run it." },
        { label: "Status 1 - 'Initial test successful'", verdict: "The test is done. Move on to Optional Tests to force-run and hold a mode for measurements, or pull Error History for date/time, code, equipment, and description." },
      ],
    },
  ],
  "s-daikin-power-supply-waveform-zero-cross": [
    {
      ask: "With a scope or power quality meter on terminals No. 1 and No. 2 of the terminal board, what does the incoming power supply waveform look like?",
      options: [
        { label: "Clean sine wave with nothing unusual at the zero cross", verdict: "The building supply is not the problem - the fault is in the unit rather than the power feeding it." },
        { label: "Distorted waveform, or disturbance right around the zero cross", verdict: "The problem is in the building supply or a nearby load, not the unit - that disturbance upsets the unit's zero-cross detection. Investigate generators, solar or backup inverters, and large switching loads on the same feed before replacing any PCB." },
      ],
    },
  ],
  "s-daikin-psc-fan-relay-contact-check": [
    {
      ask: "With the motor leads off the 6-circuit harness, meter circuit 3 to circuit 2 with low stage commanded, then circuit 3 to circuit 1 with high stage commanded. What do you get?",
      options: [
        { label: "Expected supply voltage present at the harness in both stages", next: 1 },
        { label: "Expected supply voltage does not appear at the harness in one or both stages", verdict: "The relay or the control feeding it is at fault - the motor is not the problem. Capture readings for both low and high speed before going further." },
      ],
    },
    {
      ask: "Reconnect the motor and take the same readings at the motor leads. What do you get?",
      options: [
        { label: "Same voltage present at the motor leads", verdict: "Both speed taps are reaching the motor, so the motor is where to look. Make sure you have both low and high speed readings before condemning it." },
        { label: "Voltage at the harness but not at the motor leads", verdict: "The harness has a break between the harness connection and the motor - repair the harness." },
      ],
    },
  ],
  "s-daikin-psc-fan-relay-contact-test": [
    {
      ask: "With the motor leads off the 6-circuit harness, meter between circuit 3 and circuit 2 for low speed or circuit 3 and circuit 1 for high speed, then restore power and energize that stage. What do you read?",
      options: [
        { label: "Approximately 0VAC across the contacts", verdict: "The relay contacts are closed and passing power, so the board relay is doing its job at that stage. Look at the motor and its wiring." },
        { label: "Approximately 115VAC across the contacts", verdict: "That means the relay is open. If it should be closed at the stage you energized, replace the control." },
      ],
    },
  ],
  "s-daikin-r32-coil-cleaning-maintenance": [
    {
      ask: "With power off to both the outdoor and indoor units, inspect the outdoor coil before you wash anything. What do you see?",
      options: [
        { label: "Oil deposits on the coil", verdict: "Oil deposits can indicate a refrigerant leak. Leak search before cleaning them away - once you wash them off the evidence is gone." },
        { label: "No oil deposits", verdict: "Spray the coil with ordinary household detergent and rinse with a garden hose vertically downward at moderate pressure, nozzle at a 15 to 20 degree angle about 3 inches from the coil face so debris is pushed out of the coil and base pan." },
      ],
    },
    {
      ask: "For the aluminum tube evaporator coil, what are you planning to clean it with?",
      options: [
        { label: "Flush with water", verdict: "That is the recommended method for both copper and aluminum residential coils. Nothing further needed on the coil itself." },
        { label: "A chemical coil cleaner", verdict: "Use only a product listed in technical publication TP-109 on a round-tube aluminum coil, and rinse thoroughly afterward. A generic coil cleaner can destroy the coil." },
      ],
    },
    {
      ask: "Check the electrical connections while you are in the unit. What do you find?",
      options: [
        { label: "Connections are tight and clean", verdict: "Tighten screws as you go and note that indoor and outdoor motors are permanently lubricated and do not need oiling. Reconnect power to both units and verify proper operation." },
        { label: "A connection is burned, smoky, or corroded", verdict: "Disassemble and clean anything burned or smoky, and replace burned or corroded wire connections with tight crimps so they do not overheat again." },
      ],
    },
  ],
  "s-daikin-r32-fan-relay-contact-test": [
    {
      ask: "With ALL power disconnected and verified dead, and the leads removed from terminals 2 and 4 of the Fan Relay Cooling and terminals 2, 4, 5 and 6 of the Fan Relay Heating, ohm the de-energized relay. What do you read?",
      options: [
        { label: "2 to 4 reads open and 5 to 6 reads continuous", next: 1 },
        { label: "Anything other than 2-4 open and 5-6 continuous", verdict: "The de-energized state is already wrong. Replace the relay." },
      ],
    },
    {
      ask: "Restore power and energize the relays, keeping clear of live terminals, then ohm the same pairs again. What do you read?",
      options: [
        { label: "2 to 4 now reads continuous and 5 to 6 now reads open", verdict: "The readings inverted correctly between the two states. The relay contacts are good." },
        { label: "Anything other than 2-4 continuous and 5-6 open", verdict: "The readings have to invert between de-energized and energized. Replace the relay." },
      ],
    },
  ],
  "s-daikin-r32-high-pressure-control-test": [
    {
      ask: "Kill the fan on whichever coil is the condenser for that mode, call for operation, and watch the gauges climb. Where does the high pressure switch open?",
      options: [
        { label: "Opens right around 610 PSIG (within 10 PSIG) and closes near 420 PSIG (within 25 PSIG)", verdict: "The high pressure control is operating within its published parameters for that mode. Reconnect the fan motor wire or plug and run the same test in the other mode before returning the unit to service." },
        { label: "Opens or closes well outside 610 PSIG plus or minus 10 and 420 PSIG plus or minus 25", verdict: "The switch does not operate within these parameters - replace the switch. Reconnect the fan motor wire or plug when you are done." },
        { label: "Pressure keeps climbing and the switch never opens", verdict: "The control is not opening at all, so it is not protecting the compressor. Replace the switch, then reconnect the fan motor wire or plug before returning the unit to service." },
      ],
    },
  ],
  "s-daikin-refrigerant-shortage-detection": [
    {
      ask: "Detection I: clamp the compressor input current and compare it against the compressor running frequency. What do you see?",
      options: [
        { label: "Input current lower than the normal value for that running frequency", verdict: "That is the detection I short-charge signature. Confirm with gauges and a leak search before adding refrigerant - a restriction or a stuck EEV produces a similar picture." },
        { label: "Input current about normal for the running frequency", next: 1 },
      ],
    },
    {
      ask: "Detections II and III: read discharge pipe temperature alongside the electronic expansion valve opening, and check the spread between suction and discharge temperature. What do you see?",
      options: [
        { label: "Discharge pipe temperature driven up for that EEV opening", verdict: "That is the detection II short-charge signature. Still confirm with gauges and a leak search first, since a restriction or stuck EEV looks the same." },
        { label: "Discharge pipe temperature and the suction-to-discharge spread both look normal", verdict: "None of the three detections is showing a shortage signature - do not add refrigerant. If a leak is later confirmed, repair it, evacuate, and weigh in the full charge rather than topping off." },
      ],
    },
  ],
  "s-daikin-sw1-field-test-mode": [
    {
      ask: "With the furnace powered and the thermostat satisfied, press and hold SW1 at least 10 seconds but not more than 15, until the LED blinks AMBER, then release and watch the sequence. What happens?",
      options: [
        { label: "The mode never starts", verdict: "Either a heat or cool call is present or SW1 was held past 15 seconds, which makes the control ignore the press. Satisfy the thermostat and repeat the 10 to 15 second hold." },
        { label: "A blower step does not energize or the wheel does not come up to speed", verdict: "That speed tap is the fault, proven without chasing thermostat calls. The sequence runs blower on Heat 15 seconds, Cool 15 seconds, Fan 15 seconds - note which tap failed and chase that circuit." },
        { label: "The hot surface igniter does not glow or draw current during its 17 second step", verdict: "Igniter circuit fault, confirmed without a gas call. Work the igniter and its wiring." },
        { label: "An inducer step fails or the pressure sensing circuit does not respond at the 1.0 in. w.c. point", verdict: "The inducer runs 15 seconds on its Run setting then 60 seconds at 1.0 in. w.c. Chase the inducer or the pressure sensing circuit depending on which of those two steps failed." },
      ],
    },
  ],
  "s-daikin-thermistor-error-mount-then-resistance": [
    {
      ask: "Pull the error code, identify which thermistor it points at, and look at how that sensor is mounted. What do you find?",
      options: [
        { label: "Thermistor has slipped out of its holder or off its tube", verdict: "A sensor reading ambient air trips a detection error even though the part is fine. Remount it securely and re-test before measuring anything." },
        { label: "Mounted securely, lead not chafed, connector fully seated at the PCB", next: 1 },
      ],
    },
    {
      ask: "Disconnect the thermistor from the PCB and measure its resistance, comparing against the sensor resistance table in that unit's service manual at the measured temperature. What do you get?",
      options: [
        { label: "Open or shorted reading", verdict: "That condemns the thermistor - replace it." },
        { label: "Reads correctly against the table", verdict: "Mounted properly and reading correctly means the fault is on the PCB side of the circuit." },
      ],
    },
  ],
  "s-daikin-u3-check-operation-not-run": [
    {
      ask: "U3 means the mandatory check operation was never executed - no part swap will clear it. With the install complete, hold TEST (BS4) on the outdoor PCB for 5 seconds and let it run. What do the LEDs show at completion?",
      options: [
        { label: "H3P on", verdict: "Normal completion. Confirm U3 no longer displays before leaving the job." },
        { label: "H2P and H3P both on", verdict: "Abnormal completion. Read the error code at the remote controller, correct the fault, and re-run check operation." },
        { label: "Check operation will not start at all", verdict: "Confirm the install is complete - stop valves open, all wiring landed, front panel mounted - and do not start replacing parts, since U3 is not a component failure." },
      ],
    },
  ],
  "s-daikin-uc-contactor-contact-voltage-test": [
    {
      ask: "With the meter on lugs (L2) and (C), a call for cool in, and the UC control's built-in short cycle delay waited out, measure voltage across the on-board compressor contactor contacts. What do you read?",
      options: [
        { label: "No voltage across the contacts", verdict: "The contacts are closed and the contactor/relay is functioning properly. Look elsewhere for the fault." },
        { label: "Roughly half of supply voltage, about 115 VAC on a 230 VAC unit", verdict: "The relay is open. If the relay does not close, replace the UC control." },
        { label: "You took the reading before the short cycle delay expired", verdict: "That is an idle relay, not a failed one. Wait out the built-in short cycle delay on the UC control and take the reading again." },
      ],
    },
  ],
  "s-daikin-uln-pressure-sensor-verification": [
    {
      ask: "Watch from the R and W contacts closing and time the inducer run while the control verifies pressure sensor null value and span. How long does it take?",
      options: [
        { label: "Only a few seconds, then the sequence continues", verdict: "Verification passed - the system is healthy on that check. Confirm the induced draft blower runs a 30 second prepurge before the igniter warm up begins." },
        { label: "It drags out to the 90 second maximum and the control times out with a fault code", verdict: "Read the displayed code and inspect the pressure sensing hose, ports, and inducer for water, soot, or a loose connection before condemning the control." },
      ],
    },
    {
      ask: "With verification passing, follow the rest of the cycle through to the end of the call. Where does it come apart?",
      options: [
        { label: "Gas valves open at the end of igniter warm up and stay open only while flame is detected", verdict: "Normal. Confirm the circulator blower energizes on high heat speed after the fixed 30 second blower on delay, with the electronic air cleaner terminals energized alongside it." },
        { label: "Shutdown timing does not match", verdict: "Confirm a 30 second inducer post purge and the heat off delay, which is factory set at 120 seconds and field adjustable. Adjust or repair whichever is off." },
        { label: "The whole cycle completes normally", verdict: "Nothing wrong with the sequence. Finish with a vent draft check and a CO check in the equipment space." },
      ],
    },
  ],
  "s-daikin-wireless-kit-ss1-ss2-switches": [
    {
      ask: "Power down and get to the A2P transmitter board in the indoor unit. Which complaint do you actually have?",
      options: [
        { label: "One remote operates the wrong indoor unit", verdict: "Addressing. Set SS2, the address setting switch, so each unit within remote range has a unique address per the manual table, and make the matching address selection on the wireless remote itself." },
        { label: "A second controller will not take command of the unit", verdict: "Main/sub. Set SS1, the MAIN/SUB setting switch, according to whether this controller is main or sub for the unit, using the setting table in the service manual." },
        { label: "Neither remote works and LED5 and LED6 on the board are dark", verdict: "A dark LED5 or LED6 is not a fault - those LEDs do not function on this board. Verify X1A to the receiver A3P and X2A to the control PCB A1P are fully seated." },
      ],
    },
  ],
  "s-defrost-cycle-time-measured-to-50f": [
    {
      ask: "You raised the defrost termination temperature setpoint. Run the system and see what actually changed.",
      options: [
        { label: "Defrost interval and accumulation time did not change at all", verdict: "Expected on these controls. The defrost cycle time the adaptive logic uses is counted from defrost initiation until coil temperature reaches 50 F, not until the termination setpoint is reached, so the setpoint jumper does not move it." },
        { label: "Coil still is not clearing after the change", verdict: "Stop moving the setpoint. Address charge, airflow, and coil cleanliness instead." },
        { label: "Outdoor coil sensor reads off when you check it", verdict: "Correct that first. The 50 F reference the cycle time is measured to depends entirely on that sensor." },
      ],
    },
  ],
  "s-defrost-sensor-mismatch-stuck": [
    {
      ask: "Which way is the defrost behavior actually wrong?",
      options: [
        { label: "Defrosting far more often than frost conditions justify", verdict: "Check the coil sensor for a reading biased cold - the control thinks the coil is colder and more frosted than it really is and keeps calling for defrost." },
        { label: "Heavy visible ice buildup and it never defrosts", verdict: "Check the coil sensor for a reading biased warm - the control thinks the coil is clearer than it is and never calls for defrost." },
        { label: "Not sure yet whether the sensor is actually wrong", next: 1 },
      ],
    },
    {
      ask: "Compare the sensor's actual reading against a separate accurate thermometer at the same point on the coil, and check how it is mounted.",
      options: [
        { label: "Sensor reading differs from the accurate thermometer at the same coil point", verdict: "Confirmed inaccurate - replace it and re-verify normal defrost cycling, full ice clearing, and prompt return to heating over at least one full cold-weather cycle." },
        { label: "Sensor has slipped position, is not clamped tight, or is reading air rather than coil surface", verdict: "Placement and contact quality will misreport coil temperature even when the sensor tests fine electrically. Remount it correctly." },
        { label: "Sensor reading matches the thermometer", verdict: "The sensor is not the fault. Rule in a genuine airflow or charge problem causing real, excessive icing instead." },
      ],
    },
  ],
  "s-defrost-test-short-removal-timing": [
    {
      ask: "Re-run the test and watch the clock. When did the short come off the test pins, and what did defrost do?",
      options: [
        { label: "Short was still on past the moment defrost initiated, and defrost lasted about 3 seconds", verdict: "That is the test timing, not the board. Holding the short past initiation gives you about a 3 second defrost. Re-run the test and pull the short instantly at initiation rather than condemning the board." },
        { label: "Short came off the instant defrost initiated and defrost ran on normally", verdict: "Clean timing gives a normal defrost, so the control is doing its job. The earlier 3 second cycle was the short being held too long." },
        { label: "Nothing initiated at all and the reversing valve never shifted", verdict: "Confirm the defrost thermostat is closed before starting - with it open the test will not initiate at all. Also give it time, the valve can take up to 22 seconds to shift depending on the timing period the control is set on." },
      ],
    },
  ],
  "s-defrost-thermostat-close-open-temp-check": [
    {
      ask: "With a thermocouple lead on the tube next to the control and the contact point insulated, lower the temperature and note where the contacts close. How does it compare to the spec for the part number stamped on the control?",
      options: [
        { label: "Closes near the listed value (roughly 34 F on 2 and 2.5 ton, roughly 31 F on 3 through 5 ton, roughly 30 F on 5 mm coil and package units)", next: 1 },
        { label: "Contacts never close, even well below the listed value", verdict: "The control does not close within the range listed for its part number - replace it." },
      ],
    },
    {
      ask: "Now raise the temperature and note where the contacts open - package units are specified to open at approximately 60 F. What happens?",
      options: [
        { label: "Contacts open at about the specified temperature", verdict: "The control closes and opens within the range for its part number - it is good. Remove any test jumpers and restore the original wiring." },
        { label: "Contacts stay closed well past the specified open temperature", verdict: "It does not open within the range listed for its part number in that unit's service manual - replace the control." },
      ],
    },
  ],
  "s-defrost-thermostat-vs-thermistor": [
    {
      ask: "Identify which coil sensor this system uses and test it the matching way.",
      options: [
        { label: "Two-wire bimetal switch clamped to a coil tube or fin", verdict: "Test it with a simple continuity check at the rated switching temperature. Failure is binary - stuck open so defrost never initiates or terminates as designed, or stuck closed." },
        { label: "Thermistor reporting a temperature value to the board", verdict: "Measure its resistance and compare against the manufacturer's resistance/temperature chart. It can drift to read consistently high or low without ever failing open or shorted, which is subtler than a stuck bimetal switch." },
        { label: "Sensor tests fine electrically, but the clamp is loose, corroded, or not on bare metal", verdict: "Poor thermal contact makes it lag or misread actual coil temperature regardless of sensor type. Remount it properly before replacing anything." },
        { label: "Replacing either type", verdict: "Match the exact switching temperature (bimetal) or resistance curve (thermistor) to the original. A wrong-rated part causes the premature or delayed defrost cycling that looks like a control board problem." },
      ],
    },
  ],
  "s-defrost-time-temp-vs-demand-control": [
    {
      ask: "Identify the defrost control type from the equipment documentation or board labeling first, then match the symptom to it.",
      options: [
        { label: "Time-temperature control with a selectable interval, and frost builds with no defrost cycle", verdict: "Check both the interval setting - too long for current conditions - and the defrost thermostat/sensor never satisfying its temperature threshold." },
        { label: "Demand defrost, and frost builds with no defrost cycle", verdict: "There is usually no simple interval to adjust on demand defrost. Suspect a failed or miscalibrated sensor input instead." },
        { label: "Demand defrost with cycles happening at irregular intervals", verdict: "That is normal, expected behavior for that control type - it defrosts only when the coil actually needs it. Explain it rather than troubleshoot it." },
        { label: "Defrost initiates fine but does not terminate properly", verdict: "That is a separate issue, typically the defrost termination sensor/thermostat, not the initiation logic." },
      ],
    },
  ],
  "s-dehumidifier-drainage": [
    {
      ask: "Trace the dehumidifier's own condensate path and find where the water is actually stopping.",
      options: [
        { label: "Drain line is coated with slime or fully clogged", verdict: "Algae and biofilm growth is just as common here as on a main AC coil and often overlooked, since these units are not always serviced with the main system. Clear and flush the line." },
        { label: "Unit has a dedicated condensate pump that is not running or is jammed", verdict: "These are common where there is no nearby gravity drain. Service or replace the pump." },
        { label: "Internal drain pan float switch is tripped", verdict: "A tripped internal safety float shuts the unit down exactly like an AC system's would and should not be bypassed. Clear the actual restriction instead." },
        { label: "Drain line runs through an unconditioned space and is frozen", verdict: "Treat it the same way as any condensate line freezing in an unconditioned run, and correct the routing or protection." },
      ],
    },
  ],
  "s-dehumidifier-hvac-integration-conflict": [
    {
      ask: "Run a dehumidification call and a cooling call at the same time and watch what the system actually does.",
      options: [
        { label: "Space overcools while the dehumidifier chases its humidity target", verdict: "The dehumidifier's reheat function is fighting the AC's cooling call, so the two are working against each other. Coordinate the calls rather than adjusting setpoints around the conflict." },
        { label: "Zone dampers end up in an unexpected position on a zoned system", verdict: "A dehumidifier call is competing with a zone call. Check the zone damper interaction against how the dehumidifier ties into the zoned duct system." },
        { label: "Both the main thermostat's dehumidification setting and the dehumidifier's own control are independently managing humidity", verdict: "Two controls independently chasing humidity with no coordination is a common source of these complaints. Set them up to work together." },
        { label: "Dehumidifier runs but the main blower never comes on to distribute it, or the reverse", verdict: "That points at the interlock wiring. Most designs need either fully independent duct connections or a proper interlock with the main blower and dampers; review the integration method against the manufacturer's diagram." },
      ],
    },
  ],
  "s-dehumidifier-standalone-icing": [
    {
      ask: "Shut the unit off and let the coil fully thaw, then check the temperature of the space it operates in against the unit's minimum rated operating temperature.",
      options: [
        { label: "Space temperature is below the unit's minimum rated operating range", verdict: "Running it in a cool basement or crawlspace below its rated range can ice the coil even with an otherwise healthy unit. Also check whether the model has a low-temperature cutoff or defrost feature and that it is enabled and working." },
        { label: "Space temperature is within the rated operating range", next: 1 },
      ],
    },
    {
      ask: "With low ambient ruled out, check airflow across the coil, then the charge.",
      options: [
        { label: "Dirty filter, loaded coil, or blower not moving air properly", verdict: "That is the first mechanical cause to correct once low ambient temperature is ruled out. Clean it up and see if the icing stops." },
        { label: "Airflow checks out normal", verdict: "Check refrigerant charge using the same gauge and superheat approach as a standard AC sealed refrigeration circuit." },
      ],
    },
  ],
  "s-dehumidifier-standalone-not-dehumidifying": [
    {
      ask: "With a call active, confirm whether the compressor and the fan are both actually running.",
      options: [
        { label: "Fan runs but the compressor never engages", verdict: "A unit running its fan without the compressor will not meaningfully dehumidify. Confirm the control call is actually reaching the unit and that it is not simply in a defrost or standby cycle before condemning the compressor." },
        { label: "Both compressor and fan run but indoor humidity does not drop", next: 1 },
      ],
    },
    {
      ask: "Check airflow across the unit's own coil, then its refrigerant pressures.",
      options: [
        { label: "Dirty filter or coil on the dehumidifier itself", verdict: "That restricts airflow and cuts moisture removal just like it would on a main AC coil. Clean it and recheck." },
        { label: "Airflow is good but pressures are off on its sealed system", verdict: "These units use a small compressor-based refrigeration circuit and are diagnosed the same way as an AC or heat pump. Correct the charge per standard gauge readings." },
        { label: "Airflow and charge both check out normal", verdict: "Look at the load it is serving. The unit can be working correctly but simply undersized for an unusually high moisture load, such as a leaky building envelope or a wet crawlspace." },
      ],
    },
  ],
  "s-delivered-capacity-enthalpy": [
    {
      ask: "With CFM verified, compare delivered capacity against the nameplate rating at the actual conditions.",
      options: [
        { label: "Delivered capacity close to rated", verdict: "The equipment is doing its job. The complaint is load, distribution, envelope, or duct losses - not the refrigerant circuit." },
        { label: "Delivered capacity well short, with correct refrigerant readings", verdict: "Something between the coil and the house is eating it. Look at duct leakage, gain in unconditioned space, air bypassing the coil, and return-side leakage." },
        { label: "Sensible looks acceptable but almost no latent removal", verdict: "The coil is running too warm or too much air is moving over it. Check CFM per ton and the blower profile before touching the charge." },
        { label: "Entering-air readings do not match the room conditions", verdict: "Your return is pulling air from somewhere it should not. Find the return-side leak before trusting any capacity calculation." },
      ],
    },
  ],
  "s-dirty-sock-syndrome": [
    {
      ask: "Run the system and note the timing of the smell, or have the customer describe it.",
      options: [
        { label: "Strongest right at startup, then fades as the coil wets", verdict: "That is the classic dirty sock signature. Check the evaporator coil for biological growth on the fins and recommend a proper coil cleaning, not just a filter change." },
        { label: "Musty all the time, not just at startup", verdict: "That points more toward standing water or drain issues. Check the drain pan and drain line for standing water and correct any slope or clog problems." },
      ],
    },
  ],
  "s-discharge-line-temperature": [
    {
      ask: "Read discharge line temperature 6 inches off the compressor with the system stable. What did you get?",
      options: [
        { label: "Over 225 F, with high superheat and low suction", verdict: "Compression ratio is too high and return gas is not cooling the motor. Chase undercharge or a restriction. Keep it off until corrected - this is how compressors die." },
        { label: "Over 225 F, with high head and normal superheat", verdict: "Heat rejection is the problem. Look at condenser coil, fan, recirculation, non-condensables, or a severe overcharge." },
        { label: "Unusually cool discharge line, low superheat", verdict: "Liquid is returning to the compressor. Find out whether it is flood back during running (metering device or low evaporator load) versus a flooded start after an off cycle, and fix the cause before the bearings wash out." },
        { label: "In the normal band with everything else in range", verdict: "The compressor is not being stressed thermally. Move your diagnosis to the air side, controls, or capacity against the load." },
      ],
    },
  ],
  "s-disconnect-whip-issues": [
    {
      ask: "With power off and the blade pulled, open the disconnect and inspect it.",
      options: [
        { label: "Green or white oxidation on aluminum, or discolored heat-damaged lugs", verdict: "That is a loose or corroded connection. Torque-check the lugs to a properly seated connection, since a lug never fully tightened at install is a very common cause of intermittent power loss or voltage drop under load." },
        { label: "Water in the box, cracked or missing weatherproof in-use cover, or an unsealed whip fitting", verdict: "Water tracks down onto the fuse block and blades and causes corrosion or nuisance trips. Replace corroded fuse pullout blocks entirely rather than just cleaning the contacts, since surface corrosion recurs quickly outdoors." },
        { label: "Pullout blade is pitted or fits loosely on one or both poles", verdict: "That causes single-phasing-like symptoms: the compressor hums, runs hot, or will not start even though the upstream breaker is fine." },
        { label: "Whip conduit is chafed where it passes through a knockout", verdict: "Years of vibration can wear through insulation there and cause an intermittent short or ground fault. Repair the conductors and protect the passage." },
      ],
    },
  ],
  "s-dm96sn-inlet-gas-pressure": [
    {
      ask: "With the manometer on the inlet tap or drip leg, the burners firing, and every other gas appliance on that supply line running, read supply pressure. What do you get?",
      options: [
        { label: "Natural gas between 3.2 and 3.8 in. w.c.", verdict: "Supply pressure is in range, nominal 3.5. The supply side is not what is dropping the furnace out." },
        { label: "Propane between 9.7 and 10.3 in. w.c.", verdict: "Supply pressure is in range, nominal 10.0. The supply side is not what is dropping the furnace out." },
        { label: "Outside those ranges with the other appliances running", verdict: "Address the pressure regulator or the gas pipe sizing, or consult the local gas utility." },
      ],
    },
  ],
  "s-do-not-oil-motors": [
    {
      ask: "For the noise complaint, kill power and manually rotate the outdoor fan and the indoor blower. What do you feel?",
      options: [
        { label: "Both turn freely with no play", verdict: "Do not add oil - these motors are permanently lubricated and oil leads to premature failure. Look for a loose or unbalanced wheel, a loose set screw, or wheel-to-housing interference, and check the fan blade balance weights and blade setscrew on the outdoor unit." },
        { label: "Real play in the shaft or grinding", verdict: "Replace the motor rather than trying to lubricate it." },
      ],
    },
  ],
  "s-dual-cap-one-section-dead": [
    {
      ask: "With both leads removed, read C to HERM and then C to FAN, and compare each to the rating stamped on the can. What do you get?",
      options: [
        { label: "C to FAN is at rating, C to HERM reads well below rating or open", verdict: "That is the fault. The compressor half of the capacitor is dead, which is exactly why the fan runs and the compressor only hums. Replace the dual capacitor." },
        { label: "Both sections read at their stamped ratings", verdict: "The capacitor is not the problem. Move to the compressor - check winding resistance, the internal overload, and whether the contactor is actually passing both line legs to it." },
        { label: "Both sections read low, or the can is bulged and weeping", verdict: "Replace the capacitor, then find what killed it. High head pressure, low line voltage under load, or a capacitor voltage rating below what the unit needs will do it again." },
      ],
    },
  ],
  "s-dualfuel-lockout-temp-misconfigured": [
    {
      ask: "Write down both lockout values - heat pump low-temperature lockout and furnace high-temperature lockout - and compare them against each other.",
      options: [
        { label: "There is an outdoor temperature band where neither source is allowed to run", verdict: "That is a real configuration error - the house gets no heat at all in that band. Correct the values so one source is always available, typically furnace lockout at or below the heat pump lockout." },
        { label: "The two lockouts overlap so one source is always available", verdict: "No gap exists. If a complaint remains, look at the balance point/switchover setting, which is a separate setting from lockout." },
        { label: "Heat pump locked out at a fairly mild temperature", verdict: "That forces more expensive backup heat sooner than necessary. Confirm the customer's cost priorities before leaving it, and verify behavior across the boundary temperature after any change rather than trusting the menu display." },
      ],
    },
  ],
  "s-dualfuel-switchover-logic-troubleshoot": [
    {
      ask: "Identify which switchover method the system uses, then verify that method's own inputs.",
      options: [
        { label: "Temperature-based, and the outdoor sensor reads off compared to a separate reference thermometer", verdict: "Switchover then happens at the wrong actual outdoor conditions even though the setpoint is configured correctly. Correct the sensor." },
        { label: "Cost-based, with stale or default placeholder utility rates entered", verdict: "Bad rate values make the control favor the wrong fuel across a wide range of conditions, not just at the margin. Enter current, accurate rates." },
        { label: "Logic and inputs look right, but one of the two heat sources will not run when commanded", verdict: "A furnace that will not ignite or a heat pump that will not run looks exactly like a switchover fault. Confirm each piece of equipment individually." },
        { label: "Both sources run individually and the logic checks out, but it still will not transition", verdict: "Suspect a stuck relay, a miswired outdoor temperature sensor, or a communication fault between the thermostat and one of the two units. Also confirm the expected staging behavior - overlap versus hard cutover - before treating it as a fault." },
      ],
    },
  ],
  "s-duct-attic-condensate-freeze": [
    {
      ask: "It is freezing during the heating season - trace which line is actually holding the water.",
      options: [
        { label: "Cooling condensate line running uninsulated through the cold attic, near a soffit or gable vent", verdict: "Cold air infiltrating directly onto an uninsulated line is a straightforward install oversight. Insulate or reroute that section rather than just clearing the ice, or it recurs on the next cold snap." },
        { label: "Humidifier drain, or a summer-leftover trap still full of water", verdict: "Cooling condensate should not normally be an issue in heating mode, but a humidifier drain or a trap still holding water can freeze and back up during the heating season. Address that line specifically." },
      ],
    },
  ],
  "s-duct-exterior-sweating-humid": [
    {
      ask: "Look at how the water is showing up on the surface. Which pattern is it?",
      options: [
        { label: "Uniform film or droplets across cold metal duct, boots, or cabinet panels", next: 1 },
        { label: "Water trailing from a single point", verdict: "That is a drain leak, not condensation. Work the condensate side instead of insulation." },
      ],
    },
    {
      ask: "Where is the sweating concentrated?",
      options: [
        { label: "On duct runs with missing, compressed, or unsealed insulation", verdict: "Repair with proper vapor-barrier-faced insulation and seal the facing seams tight. The vapor barrier matters more than the R-value." },
        { label: "At boots and registers, staining the ceiling drywall", verdict: "Room air leaking around the boot is the usual cause. Seal the boot-to-drywall gap and insulate the boot." },
        { label: "On the air handler cabinet itself", verdict: "Verify airflow first - low airflow means a colder coil and a colder cabinet. Consider raising blower CFM within spec before wrapping the cabinet." },
        { label: "Everywhere, in a vented crawlspace or open attic during a humid spell", verdict: "The space itself is carrying the humidity load. Address the space with vapor barrier and sealing as much as the duct." },
      ],
    },
  ],
  "s-duct-negative-pressure-backdraft": [
    {
      ask: "Put a manometer on house-to-outdoor pressure and run the air handler with the exhaust fans off.",
      options: [
        { label: "House goes noticeably negative with just the air handler running", verdict: "Suspect an oversized or leaky return duct system pulling air from a garage or attic and depressurizing the living space. Correct the return leakage." },
        { label: "Near neutral with the air handler alone, negative once bath fans, range hood, or dryer run", verdict: "Exhaust fans running alongside a marginal combustion appliance are contributing to the depressurization. Address the exhaust and makeup air balance." },
        { label: "Pressure looks fine either way but an appliance still spills", verdict: "Check that any atmospherically-vented appliance has adequate makeup air per code. Confirmed backdrafting has to be corrected, not just noted." },
      ],
    },
  ],
  "s-duct-plenum-undersized": [
    {
      ask: "Take static pressure right at the plenum, as close to the equipment as practical, and again further out in the duct system. Where is the drop concentrated?",
      options: [
        { label: "A large pressure drop is concentrated right at the plenum", verdict: "That points at the plenum rather than the branch ductwork. Measure its cross-sectional area against the equipment's rated CFM and the manufacturer's minimum plenum sizing guidance." },
        { label: "Plenum necks down immediately at the takeoffs", verdict: "That is a bottleneck right where multiple branches are trying to draw air. Correcting it usually has an outsized benefit, since all the air is forced through this one point." },
        { label: "Drop is spread through the duct system with little at the plenum", verdict: "The plenum is not the bottleneck. On a return plenum, still confirm it is sized for full return airflow plus the filter itself without added restriction." },
      ],
    },
  ],
  "s-duct-transition-fitting-turbulence": [
    {
      ask: "With the system running, measure static pressure at the equipment and compare against readings further out, then inspect the transitions and fittings right off the supply and return plenums.",
      options: [
        { label: "Straight duct runs are correctly sized but static is high, with abrupt transitions or sharp 90-degree turns close to the cabinet", verdict: "These are localized turbulence losses, not a duct-too-small problem. Correcting or replacing that fitting section is usually more effective than upsizing straight duct elsewhere." },
        { label: "A takeoff sits right next to another takeoff or right at a turn", verdict: "That disrupts airflow at both locations rather than just one. Treat that pairing as the spot to correct." },
        { label: "Fittings near the unit are gradual radius and the pressure drop spreads out along the duct runs", verdict: "Nothing points at a bad fitting here. Reference Manual D or the fitting equivalent-length tables before calling any single fitting's contribution excessive." },
      ],
    },
  ],
  "s-duct-whistling-noise": [
    {
      ask: "Walk the house with the system running. Where is the whistling loudest?",
      options: [
        { label: "At the return grille", verdict: "Almost always an airflow-velocity or restriction issue at the return. Check for an undersized or partially blocked return, and check the filter - a dirty one raises velocity through what is left open." },
        { label: "At one specific supply register", verdict: "Look for a register or damper that is mostly closed, forcing air through a small opening at high velocity." },
        { label: "Everywhere, with high static across the whole system", verdict: "If static is high across the board, the duct system may simply be undersized for the equipment's airflow." },
      ],
    },
  ],
  "s-ductblaster-building-pressure-test": [
    {
      ask: "Run a total duct leakage test with the registers sealed, then a duct leakage to outside test using the blower door with the duct tester, and compare the two numbers.",
      options: [
        { label: "Total leakage is high but leakage to outside is comparatively low", verdict: "Most of the leakage is ending up in conditioned space. The two tests answer different questions, and this tells you where the leaks are going." },
        { label: "Both numbers come back high", verdict: "Significant leakage to unconditioned or outdoor space. Compare against the applicable code or program threshold rather than judging the raw number alone, since acceptable limits vary by program and duct location." },
        { label: "Whole-house numbers look reasonable but room-to-room pressure differentials with doors closed are significant", verdict: "That is a room-level pressure imbalance, commonly from a single central return design, even when the whole-house numbers look fine." },
      ],
    },
  ],
  "s-ductboard-delamination": [
    {
      ask: "Inspect accessible duct board sections, especially at high-velocity spots near the equipment and at sharp turns.",
      options: [
        { label: "Water staining, or board that feels soft when pressed", verdict: "Wet board delaminates and can grow mold far faster than dry board simply aging. Identify and correct the water source, whether a roof leak, condensation, or a drain issue, before replacing, or the new material fails the same way." },
        { label: "Interior surface rough, pitted, or peeling with no sign of water", verdict: "That is surface delamination from years of airflow, which is an airstream contamination and structural issue." },
        { label: "Board surface is intact but seam tape or mastic is failing at the joints", verdict: "Seam failure is a leakage issue, separate from surface delamination. Address it as sealing work, not board replacement." },
      ],
    },
    {
      ask: "How far does the delamination extend?",
      options: [
        { label: "Isolated minor erosion at one fitting", verdict: "That can sometimes be sealed or coated using manufacturer-approved methods." },
        { label: "Widespread across the section", verdict: "Widespread delamination generally warrants replacing that section rather than trying to repair it." },
      ],
    },
  ],
  "s-ductliner-fiberglass-erosion": [
    {
      ask: "Open an accessible section and look at the inside surface of the duct, especially near the blower and at fittings.",
      options: [
        { label: "Visible fraying, bare exposed fiberglass, or a rough pitted liner surface inside", verdict: "The internal liner is eroding into the airstream. Where it is confirmed and significant, replace those sections with unlined duct using external insulation, or duct board, rather than patching or resealing the interior liner." },
        { label: "Interior is bare metal and the insulation is only on the outside of the duct", verdict: "That is external duct wrap, not liner. Wrap problems affect thermal performance and condensation risk, not airstream contamination." },
        { label: "Liner looks intact but occupants report respiratory irritation or fibrous debris at registers", verdict: "Those symptoms can appear before erosion is visually obvious. Check airflow velocity in the lined sections too, since higher-than-designed CFM wears the liner faster than intended." },
      ],
    },
  ],
  "s-ductmaterial-failure-modes": [
    {
      ask: "Identify what the duct is actually made of and inspect it for that material's own failure mode. What do you find?",
      options: [
        { label: "Sheet metal with separated seams or missing/failed mastic or tape at joints", verdict: "The metal itself is durable; seams and connections are the weak point and a major leakage source. Also check moisture-exposed sections for rust and corrosion." },
        { label: "Flex duct crushed, kinked, sagging between supports, or with excess uncoiled length", verdict: "Flex duct's flexibility is its main failure vector. Also check for the inner liner separating from the outer vapor barrier, which happens over time." },
        { label: "Duct board with an eroded or delaminated interior surface, or failed seam tape", verdict: "Check for water damage softening or sagging the board as well, since wet duct board can support mold growth." },
      ],
    },
    {
      ask: "Now weigh repair against replacement. How widespread is the degradation?",
      options: [
        { label: "Sheet metal system with good bones, leaks limited to seams and joints", verdict: "A reseal and re-mastic is usually all it needs." },
        { label: "Duct board or old flex showing widespread degradation", verdict: "That is generally more cost-effective to replace than to keep patching repeatedly." },
        { label: "Material looks sound but overall system leakage is high", verdict: "Treat leakage as its own category separate from any single material defect. It adds up across many small gaps and is not always tied to one obvious failure." },
      ],
    },
  ],
  "s-eac-not-cleaning": [
    {
      ask: "De-energize, pull the cells and look at them, and characterize the odor.",
      options: [
        { label: "Cells and plates are loaded with dirt", verdict: "A heavily loaded cell stops collecting well before it looks obviously dirty. Clean the cells and set up a regular schedule, typically every 1-3 months." },
        { label: "Strong, persistent ozone smell", verdict: "A mild ozone smell can be normal for this technology, but a strong one means the cell needs cleaning or the power supply is producing excess ionization. Do not dismiss the complaint as normal." },
        { label: "Cells look clean and the indicator light shows a fault", verdict: "Check the high-voltage power supply connections and the access door safety interlock switch, which shuts the cell off if the door is not fully closed and latched." },
      ],
    },
  ],
  "s-ebtdr-blower-delay-sequencer-timing": [
    {
      ask: "On a first stage heat call, time the blower from the moment 24VAC lands on G at the EBTDR board. What happens?",
      options: [
        { label: "Blower starts about 7 seconds after G", verdict: "That is the normal on-delay for this board, not a lagging blower." },
        { label: "Blower never starts and there is no 24VAC at G or at Y at the heat pump", verdict: "The demand is not getting to the board. Work the heat call path back from Y at the heat pump before suspecting the board or the motor." },
        { label: "Blower start is well outside the 7 second window", next: 1 },
      ],
    },
    {
      ask: "On a second stage (W2) call, confirm 24VAC reaches heat sequencer HR1 and time contacts M1 and M2. What do you get?",
      options: [
        { label: "Contacts close within 10 to 20 seconds", verdict: "Normal timing for HR1. Also time HR2 on a W3 dropout - 30 to 70 seconds to open is normal." },
        { label: "24VAC reaches HR1 but the contacts do not close anywhere near the 10 to 20 second window", verdict: "That is well outside the published window with the demand present. Suspect the sequencer." },
        { label: "No 24VAC reaching HR1 on the W2 call", verdict: "The sequencer never got its call. Chase the W2 demand to the heater assembly before condemning the sequencer." },
      ],
    },
  ],
  "s-ecm-16-pin-signal-check": [
    {
      ask: "Disconnect the 5-pin connector from the motor and check for line voltage at terminals 4 and 5 of the power connector. What do you get?",
      options: [
        { label: "No line voltage at terminals 4 and 5", verdict: "The power side is dead. Check incoming power to the unit and then the control board." },
        { label: "Line voltage present", next: 1 },
      ],
    },
    {
      ask: "Reinsert the 5-pin, remove the 16-pin control connector, and work the signal side. What do you find?",
      options: [
        { label: "24 volts at the transformer but nothing at pin 15 (G) with the thermostat set to Fan-On", verdict: "The fan demand is not reaching the motor. Work back from the G terminal to the board and thermostat." },
        { label: "Pins 1 and 3 do not ohm continuous to transformer neutral or the thermostat C terminal", verdict: "An open neutral here makes the motor run erratically. Repair the common before condemning the motor." },
        { label: "All power and signals present, including 24 volts at pin 6 and/or 14 on a cool call and pin 2 and/or 11 on a heat call", verdict: "Everything the motor needs is there and it still will not run. Condemn the motor." },
      ],
    },
  ],
  "s-ecm-cfm-verification-howto": [
    {
      ask: "Estimate delivered CFM from measured total external static pressure and the blower table for the current speed tap, then compare it against the CFM programmed on the ECM board. How do the two line up?",
      options: [
        { label: "Estimated delivered CFM is meaningfully below the programmed target", verdict: "The motor is most likely maxed out fighting excess static pressure rather than malfunctioning. Go after the duct, filter, or coil restriction instead of just programming a higher target." },
        { label: "Estimated CFM lines up with the programmed target", verdict: "Airflow is actually being delivered as programmed. Document the measured CFM against the equipment's rated requirement, such as CFM per ton, so any capacity or icing complaint ties back to a real number." },
        { label: "Flow hood totals summed at all registers come in below the static-pressure-table estimate", verdict: "Air is leaving the blower but not reaching the registers. That gap is duct leakage, which the static pressure table method cannot see, so chase the leakage rather than the motor." },
        { label: "The equipment reports actual CFM live on a diagnostic display or app and it matches the target", verdict: "That is a direct reading of what the motor is delivering, not just the programmed target. Record it against the rated requirement for the equipment." },
      ],
    },
  ],
  "s-ecm-isolate-module-motor-programming": [
    {
      ask: "Power off, spin the blower wheel and shaft by hand.",
      options: [
        { label: "Real drag, grinding, or a locked shaft", verdict: "That is the motor itself, not the module or the programming. Stop there." },
        { label: "Spins freely", next: 1 },
      ],
    },
    {
      ask: "Power back on and put it on a call. What does it do?",
      options: [
        { label: "Does not run at all, and the module is blinking a status/fault code", verdict: "The module thinks it has a fault - read that code before condemning it. Many ECM modules blink a code even without a wall display." },
        { label: "Does not run at all, no fault LED, and the low-voltage harness connector is corroded or not fully seated", verdict: "A marginal harness connection produces symptoms that look exactly like a bad module. Fix the connection and retest before ordering parts." },
        { label: "Runs, but delivers the wrong speed or airflow", verdict: "That is a programming issue, not a module or motor failure. Verify the dip switch or programmed CFM profile matches the installed equipment and duct system." },
        { label: "Runs correctly with a known-good module swapped in", verdict: "Windings and bearings are fine and the fault was control-side. Document that so the next tech does not re-diagnose the motor." },
      ],
    },
  ],
  "s-ecm-masks-airflow-loss-dirty-wheel": [
    {
      ask: "Do not go by feel at the register - read the motor's current draw/wattage at its programmed speed and compare against its baseline.",
      options: [
        { label: "Draw has climbed steadily at the same speed setting", verdict: "The ECM has been compensating for a worsening restriction. Inspect the blower wheel, filter loading, and duct even though airflow at the registers still feels fine." },
        { label: "Draw sits at its expected baseline for that speed", verdict: "No developing restriction is showing up in the numbers right now. The ECM is not masking anything at this point." },
        { label: "Draw dropped back toward baseline after cleaning the wheel or changing the filter", verdict: "That confirms the restriction was the cause and it is corrected. Explain to the customer that an ECM hides a slow decline right up until it cannot compensate, so filter and coil maintenance matters more on these systems, not less." },
      ],
    },
  ],
  "s-ecm-mechanical-checks": [
    {
      ask: "Before touching the motor, measure the power supply to the unit against the range specified on the rating plate. Where is it?",
      options: [
        { label: "Outside the range specified on the rating plate", verdict: "Correct the supply voltage before condemning the motor." },
        { label: "Within the range on the rating plate", next: 1 },
      ],
    },
    {
      ask: "Work the harness and mechanical checks the literature calls for. What did you find?",
      options: [
        { label: "Motor power harness or control harness with an open, or wires not fully seated in the connectors", verdict: "Repair or replace the harness rather than the motor." },
        { label: "Blower wheel not seated on the shaft, set screw loose or off the shaft flat, or broken blades", verdict: "Seat the wheel and torque the set screw on the shaft flat to 165 in-lbs minimum, and replace a wheel with broken blades." },
        { label: "Interference between wheel and housing or wheel and motor, a cracked or corroded housing, or a loose or cracked mounting bracket", verdict: "Correct the mechanical problem and secure the mounting bracket tightly to the housing before looking at the motor again." },
        { label: "Harness and mechanics all check good", verdict: "Check the thermostat and thermostat wiring to confirm proper cooling, heating, and continuous fan demands are actually reaching the unit." },
      ],
    },
  ],
  "s-ecm-mechanical-preflight-checks": [
    {
      ask: "With all power disconnected, turn the motor and blower wheel by hand.",
      options: [
        { label: "Binds or rubs - interference between wheel and housing, or wheel and motor", verdict: "Mechanical, not a motor fault. Correct the interference, and inspect the housing for cracks or corrosion and the motor mounting bracket for looseness or breaks." },
        { label: "Spins freely with no interference", next: 1 },
      ],
    },
    {
      ask: "Check the blower wheel seating and both harnesses.",
      options: [
        { label: "Wheel not fully seated, or the set screw off the shaft flat or under 165 in-lbs", verdict: "Seat the wheel fully with the set screw on the shaft flat and torque to at least 165 in-lbs. This is the one that gets missed on reassembly." },
        { label: "Power or control harness wires not continuous, or connectors not solidly seated", verdict: "Repair or replace the harness. These are serially communicating motors, so a marginal contact looks exactly like a motor fault." },
        { label: "Wheel, blades, harnesses, and connectors all check out", verdict: "Check the power supply to the air handler or modular blower against the rating plate range, and verify the thermostat and its wiring actually provide proper cooling, heating, and continuous fan demands before condemning the motor." },
      ],
    },
  ],
  "s-ecm-programming-torque-airflow-cfm-mismatch": [
    {
      ask: "Check the motor or board's configured control mode against the manufacturer's documentation for this specific install, then match it to the symptoms.",
      options: [
        { label: "Set for constant torque on a high-static, restrictive duct system, with weak registers, long run times and high temp rise", verdict: "A constant-torque motor holds a fixed effort, so delivered CFM drops as duct resistance rises. The motor is healthy - reprogram to the specified mode rather than replacing it, then measure actual CFM to confirm." },
        { label: "Set for constant airflow, with climbing motor watt draw while measured airflow still looks normal", verdict: "The motor is ramping effort to hold CFM against a developing restriction, and airflow will collapse all at once when it hits maximum effort. Find and fix the restriction now." },
        { label: "Configured mode matches the manufacturer's spec for this equipment and duct combination", verdict: "Programming is not the problem. Look elsewhere for the airflow complaint." },
      ],
    },
  ],
  "s-ecm-rough-shaft-is-normal-cogging": [
    {
      ask: "With power killed at the disconnect and the motor circuit verified dead, turn the shaft by hand. What does it feel like?",
      options: [
        { label: "Even, repeating detents through the rotation", next: 1 },
        { label: "Grinding, side-to-side shaft play, or a wobble in the rotation", verdict: "That is a genuine bearing problem, not cogging. The motor itself is the failure." },
      ],
    },
    {
      ask: "Even detents are normal magnet cogging from the permanent magnets in the stator, not a bearing failure. Confirm line voltage at the power connector and the 24 volt control signal, then drive the motor with an ECM tester or the manufacturer's diagnostic tool. What happens?",
      options: [
        { label: "Line voltage and the 24 volt signal both check good and the motor still will not run", verdict: "Both inputs are good and the motor will not run - that is the point at which replacing the motor is justified." },
        { label: "Line voltage or the 24 volt control signal is missing", verdict: "Do not condemn the motor. Correct the missing power or control input first, then re-test." },
      ],
    },
  ],
  "s-ecm-rough-shaft-normal": [
    {
      ask: "Kill all power, let the blower coast to a stop, and turn the wheel by hand. What do you actually feel?",
      options: [
        { label: "Rough, stepped, cogging resistance but no play in the shaft", verdict: "That is the permanent magnets in the ECM stator, not bad bearings. Do not condemn the motor for the cogging feel alone." },
        { label: "Side-to-side shaft play, grinding, or a wobble in the wheel", verdict: "Those are real bearing symptoms. Condemn the motor." },
        { label: "Wheel rubs the housing or the motor, or the set screw is off the shaft flat", verdict: "That is interference or a loose wheel, not the motor bearings. Seat the wheel with the set screw on the shaft flat and clear the interference." },
      ],
    },
  ],
  "s-ecm-thermal-shutdown-cycling": [
    {
      ask: "Watch it closely - is this a full stop and restart, or does it keep running?",
      options: [
        { label: "Full stop, a pause, then it restarts on its own", next: 1 },
        { label: "Speed surges up and down while it keeps running", verdict: "That is not thermal protection cycling. Diagnose it as a control or programming issue instead." },
      ],
    },
    {
      ask: "With thermal tripping confirmed, find what is heating the motor up.",
      options: [
        { label: "Airflow restriction forcing the motor to work at high effort continuously", verdict: "An ECM working hard against high static for long stretches runs hot enough to trip thermal protection while functioning as designed. Fix the restriction." },
        { label: "Something blocking the module's own cooling airflow inside the cabinet", verdict: "ECM modules have heat sinks that depend on airflow across them. Clear the obstruction and confirm the mounting/ventilation." },
        { label: "Hot attic or closet around the air handler, and this happens seasonally", verdict: "High ambient around the air handler reduces the module's thermal headroom. Address the space temperature or ventilation." },
        { label: "Airflow and ventilation both confirmed correct and it still thermal cycles", verdict: "That points to a genuine module fault rather than an environmental cause. Replace the module." },
      ],
    },
  ],
  "s-eev-fault-patterns-vs-txv": [
    {
      ask: "Pull codes from the board first - EEV systems usually log valve and driver faults specifically.",
      options: [
        { label: "A stepper motor open/shorted coil, position sensor, or driver IC fault code is stored", verdict: "Chase that code. Do not infer a mechanical problem from pressures alone when the board is telling you what failed." },
        { label: "No valve fault code, but a thermistor the board uses for superheat reads wrong or has poor thermal contact", verdict: "The valve may be fine - a bad thermistor input throws the control algorithm off. Fix the sensor or its mounting." },
        { label: "No fault code and the valve seems stuck at one position", next: 1 },
      ],
    },
    {
      ask: "Listen or feel for stepper movement as the board commands the valve during a call, and inspect the connector and harness.",
      options: [
        { label: "No faint clicking or stepping motion at all", verdict: "That points at the valve coil, connector, or driver circuit rather than a mechanical jam. Remember an EEV has no bulb - heating or cooling a bulb tells you nothing here." },
        { label: "Connector or harness pin damaged or not fully seated", verdict: "A stepper EEV with one winding open from a damaged harness pin behaves identically to a failed valve. Fix that before condemning the valve." },
      ],
    },
  ],
  "s-eev-stepper-motor-failure": [
    {
      ask: "Power off with the valve connector unplugged, ohm the stepper windings per the manufacturer's pinout.",
      options: [
        { label: "An open winding where a reading is expected, or continuity to the valve body/ground", verdict: "That confirms the valve itself has failed electrically. Replace it, and protect the valve body and wiring from torch heat during brazing." },
        { label: "Windings match the expected resistance pattern", next: 1 },
      ],
    },
    {
      ask: "With the windings good, look at the board side.",
      options: [
        { label: "Board logs an EEV driver fault", verdict: "The fault sits in the driver circuit on the control board, not the valve. Do not replace the valve." },
        { label: "Board confirms it is sending drive signals but the valve position never changes", verdict: "With good windings and confirmed drive signals, mechanical seizure of the valve is the remaining explanation. Rare, but possible from internal contamination." },
        { label: "New valve installed and the control does not seem to recognize or drive it", verdict: "Many controls run a valve calibration/homing routine at power-up. Verify that ran and the board can drive the valve before calling the repair complete." },
      ],
    },
  ],
  "s-efurnace-blower-not-syncing": [
    {
      ask: "Watch a heat call from the very start. What does the blower actually do?",
      options: [
        { label: "Blower never starts at all while strips are energized", verdict: "That is a limit-trip and fire-hazard combination. Treat it as urgent - do not leave the system running in this state while sourcing parts." },
        { label: "Blower starts but is slow to spin up", verdict: "Check the start capacitor on a PSC blower, or the module connections on an ECM. The sequencing logic may be fine." },
        { label: "A strip energizes briefly before the blower catches up, matching this unit's documented sequence of operation", verdict: "Some designs do exactly that. Know what is normal for this equipment before calling it a fault." },
        { label: "Blower runs but the sequence looks nothing like the documented sequence of operation", verdict: "Suspect a wiring fault bypassing the intended sequencing logic, typically a previous repair miswired around the interlock." },
      ],
    },
  ],
  "s-efurnace-breaker-trips": [
    {
      ask: "Power off, ohm each heating element to ground, not just across its terminals. What do you get?",
      options: [
        { label: "One element shows continuity to ground", verdict: "A grounded element will trip the breaker and can energize the cabinet, which is a shock hazard. Replace that element." },
        { label: "All elements read open to ground", next: 1 },
      ],
    },
    {
      ask: "Compare the breaker rating against the connected kW on the nameplate, and inspect the sequencer contacts and strip terminal connections.",
      options: [
        { label: "Breaker is smaller than the connected kW calls for (higher-kW strip kit installed without updating the breaker)", verdict: "A previous parts swap to a bigger strip kit without changing the breaker is a real-world cause. Correct the breaker sizing to the nameplate load." },
        { label: "Sequencer contacts welded, so multiple stages draw at once", verdict: "Stages drawing simultaneously that should not be will exceed the breaker rating. Replace the failed sequencer." },
        { label: "Loose or heat-damaged connections at the strip terminals", verdict: "That can cause an intermittent short and nuisance tripping. Repair or replace the damaged terminations." },
      ],
    },
  ],
  "s-efurnace-fusible-link-open": [
    {
      ask: "Check continuity across each fusible link in the heater circuit, remembering a link is one-time and cannot be reset.",
      options: [
        { label: "One link is open and that element bank makes no heat while others still work", next: 1 },
        { label: "All links have continuity", verdict: "The links are not your problem. A partial-heat complaint with intact links points at sequencer/relay staging or an individual strip circuit breaker instead." },
      ],
    },
    {
      ask: "Before replacing the link, find out why it opened - a link opens because that element circuit actually overheated.",
      options: [
        { label: "Dirty filter, closed or blocked registers, or undersized ductwork", verdict: "Airflow starvation cooked the element circuit. Correct the airflow, then replace the link with the correct manufacturer-specified part - never a generic thermal fuse with a different rating." },
        { label: "Blower failed or delayed, or a blower door/interlock issue let the elements energize without the blower running", verdict: "That is the overheat cause. Fix the blower or interlock and verify blower-to-heat-strip timing before returning to service, or the new link will open too." },
        { label: "Airflow and blower both check out fine", verdict: "Keep looking for the overheat cause before replacing the link - replacing it without correcting the cause invites another failure. Never jumper or bypass a link." },
      ],
    },
  ],
  "s-efurnace-kw-staging-mismatch-breaker": [
    {
      ask: "Compare the nameplate's total kW and number of heat strip banks against how many circuits and sequencer stages are actually wired and functional.",
      options: [
        { label: "Element assembly was replaced with a different kW rating than original", verdict: "Check that breaker sizing, wire gauge, and sequencer staging were all reconfirmed for the new rating instead of just bolting the assembly in. Verify amp draw per bank against the breaker rating during an actual full-heat call." },
        { label: "Control board or thermostat is configured for a different number of heat stages than physically exist", verdict: "That gives you either strips that never get called, or a thermostat waiting on a stage confirmation that will never come. Reconfigure to match the installed stages." },
        { label: "Outdoor-temperature staging thermostat controls a different number of stages than the sequencer has", verdict: "Match the staging thermostat's configured stage count to the sequencer stages physically installed." },
        { label: "kW, breakers, and stage counts all match the nameplate", verdict: "Electrical configuration is correct. Verify amperage draw per bank during a full-heat call rather than at idle, then look elsewhere for the partial-heat or nuisance-trip complaint." },
      ],
    },
  ],
  "s-efurnace-limit-trips": [
    {
      ask: "Check airflow across the strips first - pull the filter and look at the duct system. What do you find?",
      options: [
        { label: "Dirty filter, or an undersized/restricted duct system", verdict: "Electric elements have very little thermal mass and heat up fast without adequate airflow, which is exactly this symptom. Restore airflow before touching the limit." },
        { label: "Filter and ducts are clear", next: 1 },
      ],
    },
    {
      ask: "Compare the blower speed/CFM setting against the installed kW of strips, and watch the blower during the call.",
      options: [
        { label: "Blower CFM set lower than the installed kW of heat calls for", verdict: "Undersized airflow for the connected heat is a common mismatch after equipment changes. Set the blower to match the installed kW." },
        { label: "Blower lags behind the sequencer and is not up to speed when the strips come on", verdict: "The strips are heating before airflow is established. Chase why the blower is late rather than replacing the limit." },
        { label: "Blower is up to speed and CFM matches the installed kW", verdict: "With airflow checking out fine, look at the limit switch itself for correct calibration." },
      ],
    },
  ],
  "s-efurnace-no-heat-strips": [
    {
      ask: "Check the heat strip breaker and disconnect - these are usually a dedicated high-amp circuit separate from the air handler control breaker. What do you find?",
      options: [
        { label: "Heat strip breaker tripped or disconnect open", verdict: "That is why no strips energize. Verify breaker sizing matches the nameplate before resetting, and do not keep resetting it if it trips again." },
        { label: "Breaker on and power present at the heater assembly", next: 1 },
      ],
    },
    {
      ask: "With power confirmed, meter W at the air handler control board during a heat call. Is the call getting there?",
      options: [
        { label: "No W signal reaching the board", verdict: "The thermostat call is not making it to the air handler. Chase the thermostat and the wiring between it and the board before touching the heater assembly." },
        { label: "W present at the board but no strips energize", next: 2 },
      ],
    },
    {
      ask: "Watch the blower proving and sequencer side of the call. What happens?",
      options: [
        { label: "Blower never proves airflow, or the time delay never elapses, so the sequencer is never allowed to energize the strips", verdict: "Most designs require proven airflow or an elapsed delay before the sequencer closes. Check the fan/limit control and the sequencer." },
        { label: "Sequencer closes but one element reads open on continuity", verdict: "A single open element by itself would not kill all heat, the others would still work. Replace it, but keep looking for the sequencer or limit fault stopping the rest." },
        { label: "High limit switch on the heater assembly itself is open", verdict: "That heater-level high limit is separate from any furnace-level limit and will block the strips. Find out why it opened before resetting." },
      ],
    },
  ],
  "s-efurnace-one-stage-heat-only": [
    {
      ask: "Check each heat strip breaker individually and watch each sequencer during a full call. What do you find?",
      options: [
        { label: "One breaker in the multi-breaker heat strip panel is tripped", verdict: "It is common for only one breaker in the panel to trip, dropping just that stage. Find out why it tripped before resetting it." },
        { label: "All breakers on, but one sequencer never closes its stage while the others do", verdict: "A single failed sequencer silently drops just its stage while the rest of the system keeps running. Replace that specific sequencer." },
        { label: "All breakers on and every sequencer closing", next: 1 },
      ],
    },
    {
      ask: "Compare the thermostat's staging setup and the nameplate connected kW against what should actually be running for this call.",
      options: [
        { label: "Thermostat only brings on additional stages after a time delay or a wider temperature differential", verdict: "That is normal staging behavior, not a fault. Set the customer's expectations rather than chasing a nonexistent problem." },
        { label: "Stages that should be running for this call are not energizing", verdict: "Now you have a confirmed fault. Go back to that specific stage's own breaker and sequencer." },
      ],
    },
  ],
  "s-efurnace-outdoor-thermostat-lockout-stuck": [
    {
      ask: "Confirm what is actually controlling the electric heat lockout on this system.",
      options: [
        { label: "A separate temperature-sensing switch mounted outdoors", next: 1 },
        { label: "No outdoor device - the lockout is a software setting in the smart thermostat's equipment configuration", verdict: "There is no hardware to test. Check that outdoor lockout setting in the thermostat's equipment configuration instead of hunting for a field device." },
      ],
    },
    {
      ask: "Test the outdoor thermostat's contacts with a meter at the current outdoor temperature versus its rated setpoint, and check the wire run back to the furnace.",
      options: [
        { label: "Contacts do not do what the setpoint says they should at this outdoor temperature", verdict: "The control has drifted or failed - these fail without external signs. Replace it and set it to the outdoor temperature the design actually calls for." },
        { label: "Contacts behave correctly but the signal never reaches the furnace board or relay", verdict: "A broken or corroded wire in the outdoor run - a common failure point given the exposed location - mimics a stuck switch. Repair the run." },
        { label: "Switch and wiring both fine, but heat still locks out or runs at the wrong times", verdict: "A technically functioning switch set to the wrong temperature gives the same complaint as a failed one. Confirm the intended lockout temperature with the customer or design intent and set it there." },
      ],
    },
  ],
  "s-efurnace-sequencer-stuck": [
    {
      ask: "Watch one strip through a full call and after the call ends. Which way is the sequencer stuck?",
      options: [
        { label: "Strip never energizes on a call", next: 1 },
        { label: "Strip stays energized after the call ends or after power is cycled", verdict: "The contacts have likely welded closed. This is a fire risk with strips energized continuously - address it immediately, do not defer it." },
      ],
    },
    {
      ask: "Meter the sequencer's heater coil terminals during the call, and ohm its internal heater element.",
      options: [
        { label: "24V present at the coil terminals but the load contacts never close", verdict: "The sequencer is being commanded and is not responding. Replace that sequencer." },
        { label: "Internal heater element reads open", verdict: "The small internal heater is what warps the bimetal contact closed after the delay. Open means it will never close - replace it." },
        { label: "No 24V at the coil terminals during the call", verdict: "The sequencer is not being called at all, so the fault is on the control side feeding it. Do not swap the assembly on a guess - confirm which specific sequencer in the stack is at fault first." },
      ],
    },
  ],
  "s-efurnace-sequencer-types-electromech-vs-electronic": [
    {
      ask: "Identify which staging device is actually installed.",
      options: [
        { label: "Metal can with multiple terminals and an internal heater warming a bimetal strip", next: 1 },
        { label: "Solid-state time-delay relay or board-controlled staging with no internal heater", verdict: "Timing on this type is normally precise and consistent cycle to cycle. Inconsistent or drifting stage timing points at a marginal board or power supply rather than mechanical wear - this type usually fails from a shorted output driver or a control fault." },
      ],
    },
    {
      ask: "On the bimetal sequencer, check the internal heater coil and compare the staging timing to spec.",
      options: [
        { label: "Internal heater coil is open", verdict: "The contacts will never close. Replace the sequencer, matching both the heater coil's voltage/current rating and the contact configuration exactly." },
        { label: "Heater coil has continuity but the contacts still do not close", verdict: "The mechanical linkage itself has failed. Replace the sequencer." },
        { label: "It stages in and out over several seconds", verdict: "That slow staging is normal for bimetal action. Compare actual timing to spec before condemning the part." },
        { label: "Stages correctly but a bank runs weak or intermittently", verdict: "Bimetal sequencers wear primarily from contact pitting after many cycles of arcing across the load. Inspect the contacts and replace if pitted." },
      ],
    },
  ],
  "s-efurnace-single-point-multipoint-kit": [
    {
      ask: "Determine which electrical connection configuration is actually installed, checking the unit's wiring diagram rather than assuming from what is field-installed.",
      options: [
        { label: "One feed into a factory internal disconnect/breaker block that distributes to each strip bank", next: 1 },
        { label: "A separate breaker and feed from the panel to each heater circuit", verdict: "Multi-point. Confirm each heater circuit actually lands on its own dedicated breaker as labeled - two banks sharing one breaker nuisance-trip under combined load even though each breaker looks individually rated correctly." },
      ],
    },
    {
      ask: "On the single-point kit, check both the kit's internal protection and the main feed sizing.",
      options: [
        { label: "Kit's internal fuse or breaker for a bank has tripped or failed while the main panel breaker is fine", verdict: "That internal protection is sized per heater bank and trips independent of the main feed breaker - that is your partial-heat symptom." },
        { label: "Main feed conductor and upstream breaker are sized for one bank, not the combined total", verdict: "A common error when a multi-point furnace is field-converted to single-point without recalculating wire and breaker size. This is a fire risk - correct it before re-energizing." },
        { label: "Internal protection and main feed sizing both check out", verdict: "Inspect the connection kit's terminals for heat damage or discoloration - these high-current junctions are common failure points when not torqued to spec at installation." },
      ],
    },
  ],
  "s-efurnace-smell-burning-dust": [
    {
      ask: "Run the strips again and get the customer's description. What is the smell actually like?",
      options: [
        { label: "Mild dusty smell on the very first heat call of the season, fading within a few minutes and not coming back on later cycles", verdict: "That fits normal seasonal dust burn-off on the elements. No repair needed, just explain it." },
        { label: "Strong dusty smell, or it comes back every time the strips energize", verdict: "That does not fit normal burn-off - treat it as a real fault. Look for debris resting directly against an element, or an element beginning to fail." },
        { label: "Burning plastic or electrical smell rather than a dusty one", verdict: "That points to a wiring or connection issue, not dust. Shut it down and inspect immediately." },
      ],
    },
  ],
  "s-elec-capacitor-test-howto": [
    {
      ask: "Power off and discharged, at least one lead off the terminal, read it on the capacitance function. How does it compare to the rating on the label?",
      options: [
        { label: "Within the label's stated tolerance (commonly plus/minus 6 percent, but check the label)", verdict: "That capacitor is within spec. It does not need to read exactly its rated value." },
        { label: "Below its rated range but not zero", verdict: "A weak capacitor is a legitimate replacement candidate - do not wait for it to read zero." },
        { label: "Reads zero or open", verdict: "Outright failed. Replace it." },
        { label: "On a dual-run capacitor, one section good and the other out of range", verdict: "Each section (commonly HERM and FAN) is tested against its own rating. If either section is out of range the capacitor gets replaced." },
      ],
    },
  ],
  "s-elec-compressor-amp-draw-howto": [
    {
      ask: "Clamp a single conductor to the compressor (common lead is typical) while it runs under normal load. How does it compare to the RLA on the nameplate?",
      options: [
        { label: "Meaningfully above RLA under normal load and charge conditions", verdict: "The compressor is working harder than it should - think mechanical wear, high head pressure, or overcharge. Read it alongside actual operating pressures before deciding which." },
        { label: "Well below RLA for the apparent load", verdict: "That can point to worn internal valves not doing their job. Confirm against operating pressures rather than the amp number alone." },
        { label: "Right around RLA for the conditions", verdict: "Amp draw is normal for the load. A number without pressure and temperature context can mislead, so interpret it together with the rest of your readings." },
      ],
    },
  ],
  "s-elec-contactor-test-howto": [
    {
      ask: "Power off - inspect the contacts and ohm the coil.",
      options: [
        { label: "Coil reads open", verdict: "An open coil will never pull the contactor in. Replace it." },
        { label: "Contacts pitted, burned, or showing material transfer between them", verdict: "That is a strong sign of a marginal contactor even if it still functions. Replace it rather than waiting for total failure." },
        { label: "Contacts look clean and the coil reads good", next: 1 },
      ],
    },
    {
      ask: "Power on with the contactor pulled in, read voltage drop across each set of closed contacts, then watch it drop out.",
      options: [
        { label: "Very little voltage drop across each closed contact and it releases fully", verdict: "The contactor is healthy. Look elsewhere for the complaint." },
        { label: "Significant voltage drop across a closed contact", verdict: "That is resistance from pitting or wear even though the contactor is working. Replace it." },
        { label: "Contactor hangs up or releases slowly when de-energized", verdict: "Also a replacement candidate. A marginal contactor is a common cause of intermittent no-start complaints that are hard to catch on one visit." },
      ],
    },
  ],
  "s-elec-fuse-vs-breaker-selection": [
    {
      ask: "Determine which protective device is actually opening and what it is there to protect.",
      options: [
        { label: "Board-level low-voltage control fuse (glass, usually 3-5A) keeps blowing", verdict: "Treat it as a short in the low-voltage field wiring. Replacing it repeatedly with a higher-amp fuse just moves the failure point downstream to the transformer or board." },
        { label: "Line-voltage breaker trips on inrush at motor or compressor start but the equipment runs fine otherwise", verdict: "The correct fix is a slower-tripping HACR-rated breaker sized to spec, not a larger-than-spec breaker." },
        { label: "Installed line-voltage protection does not match the nameplate MCA and MOCP", verdict: "Size it to the equipment's rating plate. Undersized protection nuisance-trips, and oversized protection leaves the branch circuit wiring unprotected. Document any change from the rating plate." },
      ],
    },
  ],
  "s-elec-motor-winding-ohm-test": [
    {
      ask: "Power off and leads disconnected, ohm each pair of winding terminals and each terminal to the motor frame. What do you get?",
      options: [
        { label: "One pair reads infinite / OL", verdict: "Open winding - the motor has failed and needs replacement." },
        { label: "Any measurable resistance from a winding terminal to the frame/ground", verdict: "Grounded winding, which is also a failure. Replace the motor." },
        { label: "All three read real values, but the largest is not close to the sum of the other two", verdict: "That pattern suggests a partially shorted winding even though nothing reads open or grounded." },
        { label: "All three read real values, largest close to the sum of the other two, nothing to ground", verdict: "No obvious electrical failure. Keep in mind a motor that reads fine cold can still fail under running conditions from a thermal or mechanical issue." },
      ],
    },
  ],
  "s-elec-voltage-drop-wiring": [
    {
      ask: "Read voltage at the equipment at idle, then again while it runs under full load.",
      options: [
        { label: "Only a small, normal sag under load", verdict: "That is a healthy circuit. The complaint is not coming from the wiring." },
        { label: "Large drop once it is running under load", next: 1 },
      ],
    },
    {
      ask: "Check wire gauge against the run length and rated amp draw, and check every connection along the run.",
      options: [
        { label: "Wire gauge undersized for this run length and amp draw (sized for a shorter run or a smaller previous unit)", verdict: "This has to be corrected at the wiring level with a larger conductor. The equipment cannot compensate for it long term." },
        { label: "A loose or corroded connection at the disconnect, breaker lugs, or a splice", verdict: "One bad connection can cause a drop that looks exactly like an undersized wire. Repair the connection and re-measure under load." },
      ],
    },
  ],
  "s-electric-element-amp-draw-check": [
    {
      ask: "Calculate expected current per element from the rating plate kW and the measured supply voltage under load, then clamp each element's conductor as its stage sequences in. How do the readings compare?",
      options: [
        { label: "Every element near the calculated value", verdict: "The kit is producing what it should. Multiply measured volts by measured amps to confirm actual watts against the rated kW, and note the per-element readings on the ticket." },
        { label: "One element low with the others correct", verdict: "That points at that element or its connection." },
        { label: "An element reads zero with its stage energized", verdict: "Check that element's own limit and fuse link before condemning the element itself." },
        { label: "All elements reading low across the board", verdict: "Measure the actual supply voltage under load and use it in the calculation - a 208 V supply on 240 V elements produces meaningfully less heat and less current." },
      ],
    },
  ],
  "s-electric-heat-kit-burnt-lug": [
    {
      ask: "With power off at the disconnect and the breaker and zero volts verified, pull the heat kit panel and inspect every high-current connection - terminal block, element terminals, sequencer or contactor terminals, fuse holders, wire nuts. What do you see?",
      options: [
        { label: "Discoloration, melted insulation, a browned or blackened terminal block, or a bluish lug", verdict: "Replace the terminal, the lug, and the damaged wire section - not just retorque it. Heat-damaged copper stays high resistance." },
        { label: "Aluminum conductors landed on lugs rated for copper only", verdict: "Aluminum-to-copper at a heat kit is a classic runaway connection. Correct the terminations and torque to the specification on the heat kit or terminal block label." },
        { label: "Connections look clean", next: 1 },
      ],
    },
    {
      ask: "Restore power, energize each heat stage, clamp the current on each leg, and check the terminals with a thermal camera or IR thermometer after the strips have been running. What did you find?",
      options: [
        { label: "Current imbalance between legs", verdict: "That points at a remaining bad connection or an open element." },
        { label: "A hot spot at one terminal versus its neighbors", verdict: "That is the bad connection. Replace that terminal, lug, and wire section and torque to the label spec." },
        { label: "Balanced current and no hot spots", verdict: "Connections check out. Verify the breaker and wire size match the heat kit's minimum circuit ampacity and maximum overcurrent protection on its rating plate." },
      ],
    },
  ],
  "s-electric-heat-strips-glowing-red": [
    {
      ask: "Treat visible glow as an airflow failure until proven otherwise. Is the blower actually running whenever the strips are energized, and does it start before or with them?",
      options: [
        { label: "Blower starts after the strips, or is not running while they are energized", verdict: "The strips are being energized without air over them - that is the fault. Correct the blower sequencing before anything else, and do not just reset the limit and leave." },
        { label: "Blower runs before or with the strips", next: 1 },
      ],
    },
    {
      ask: "Work the restrictions: filter, return, evaporator coil above the heat kit, registers and zone dampers, blower wheel, and total external static against the air handler's data plate. What did you find?",
      options: [
        { label: "Loaded filter, blocked return, dirty coil, or closed supply registers or zone dampers", verdict: "That is the airflow failure. Correct it, then run a full heat call and confirm the elements no longer glow and the limits do not cycle." },
        { label: "Blower wheel packed with dirt", verdict: "A packed wheel spins at full speed while moving a fraction of the air - clean it. That is exactly how this happens with no obvious noise." },
        { label: "Static pressure above the air handler's maximum rated static", verdict: "The duct system is the restriction. Also verify the blower is on the correct speed tap or ECM profile for electric heat, which generally needs more airflow than cooling." },
        { label: "Airflow checks good at the rated setting", verdict: "Compare the installed heat kit kW against the maximum kW the air handler is rated for at its available airflow, on both rating plates, and check the automatic-reset limits and one-time fusible links - an opened link proves this has been happening." },
      ],
    },
  ],
  "s-electric-heat-time-delay-relay-150-ohm-test": [
    {
      ask: "With the relay off the unit and all wires tagged and disconnected from the male spade connections, ohm across coil terminals H1 and H2. What do you read?",
      options: [
        { label: "Approximately 150 ohms", next: 1 },
        { label: "Open, or far off 150 ohms", verdict: "The coil does not read as it should - replace the relay." },
      ],
    },
    {
      ask: "Apply 24 volts to H1 and H2 and watch the other terminals for continuity, allowing the full built-in delay. What happens?",
      options: [
        { label: "Contacts make within about 20 to 50 seconds", next: 2 },
        { label: "No continuity even after 50 seconds", verdict: "The contacts are not making with the coil energized - replace the relay." },
      ],
    },
    {
      ask: "De-energize the coil and watch the contacts, allowing the full opening delay. What happens?",
      options: [
        { label: "Contacts open within about 40 to 90 seconds", verdict: "Coil resistance and both the make and break timings are correct - the relay is good." },
        { label: "Contacts stay closed past 90 seconds", verdict: "The relay is not dropping out within its delay - replace it." },
      ],
    },
  ],
  "s-electrical-shock-hazard-reported": [
    {
      ask: "De-energize at the disconnect first, then check the equipment's grounding conductor and connection for continuity.",
      options: [
        { label: "Ground path is missing, broken, or reads open", verdict: "A reported shock is very often a missing or broken ground path rather than a true internal short. Repair the ground before anything else." },
        { label: "Ground path checks out", next: 1 },
      ],
    },
    {
      ask: "Look for the actual fault path.",
      options: [
        { label: "A motor winding megs low to ground", verdict: "Real ground fault. Replace the failed motor and do not return the equipment to service until it is corrected." },
        { label: "Damaged or chafed wiring insulation contacting the cabinet", verdict: "That is your fault path. Repair the wiring." },
        { label: "Water intrusion into an electrical compartment", verdict: "Dry it out and seal it - water in the compartment can put a live path on the cabinet." },
      ],
    },
  ],
  "s-emergency-heat-switch-functional-check": [
    {
      ask: "With the unit running in normal heating, move the emergency heat switch at the bottom of the thermostat to emergency heat. What happens?",
      options: [
        { label: "Heat pump stops, blower keeps running, all heaters come on, and the emergency heat light comes on", verdict: "That is everything emergency heat is supposed to do. Return the switch to normal heat and verify the heat pump restarts." },
        { label: "Heat pump stops and the blower runs, but the heaters do not come on", verdict: "Check the heater circuits and any outdoor thermostats before condemning the thermostat." },
        { label: "Heat pump keeps running in emergency heat", verdict: "The heat pump is supposed to stop when the switch is moved to emergency heat, so the emergency heat command is not getting through." },
      ],
    },
  ],
  "s-emerson-4-wire-serial-ecm": [
    {
      ask: "Count the wires at the motor control connector before you start probing. What is there?",
      options: [
        { label: "Four wires - +Vdc, Common, Receive, and Transmit", verdict: "This is the Emerson serially communicating variable speed motor. The +Vdc and Common only power the low voltage control circuits and the speed command arrives serially, so do not troubleshoot it by looking for 24V on individual demand pins. Work the harnesses and mechanical checks, then command it with the UltraCheck-EZ tool." },
        { label: "A 16-pin control connector", verdict: "That is the other family of motor. The 24V-per-demand-pin method belongs to those motors, not to the 4-wire serial motor." },
      ],
    },
  ],
  "s-ervhrv-condensation-freezing": [
    {
      ask: "Find out how this unit is supposed to defrost, then watch it through cold conditions. What happens?",
      options: [
        { label: "Unit has no defrost strategy, or the defrost cycle/preheater never runs", verdict: "Without a working defrost strategy the core will keep icing. Confirm what the unit is equipped with and get that function working." },
        { label: "Defrost is called but the damper or mechanism does not move", verdict: "A stuck or failed defrost damper stops defrost from actually happening even though it is being called for. Free or replace it." },
        { label: "Defrost runs correctly and the core still ices", next: 1 },
      ],
    },
    {
      ask: "Compare the outdoor temperature when icing starts against the manufacturer's defrost activation threshold, and check indoor humidity.",
      options: [
        { label: "Icing begins at outdoor temperatures above the manufacturer's defrost activation threshold", verdict: "Defrost is not being brought in early enough for these conditions. Compare the actual icing temperature against the published threshold and adjust or correct accordingly." },
        { label: "Indoor humidity is running unusually high", verdict: "A home with high indoor humidity feeds more moisture into the core and makes icing worse at any given outdoor temperature. Address the humidity, not just the unit." },
      ],
    },
  ],
  "s-ervhrv-imbalanced-airflow": [
    {
      ask: "Check the supply and exhaust sides independently - ducts and filters both. What do you find?",
      options: [
        { label: "Blockage or restriction on just one side, or one filter loaded up", verdict: "A restriction on only one side unbalances the whole unit. Clear that side and re-check the balance." },
        { label: "Both sides clear and both filters clean", next: 1 },
      ],
    },
    {
      ask: "Check the balancing dampers against the commissioning documentation, then measure actual CFM on both sides.",
      options: [
        { label: "Dampers still at default, never set per the commissioning/setup sheet", verdict: "These should have been set at install, not left at default. Set them per the setup sheet and re-measure." },
        { label: "Dampers set correctly but measured CFM still differs side to side", verdict: "Balancing dampers alone will not resolve it - duct static differences between the two sides need correcting." },
      ],
    },
  ],
  "s-ervhrv-musty-smell": [
    {
      ask: "Open the unit up and look inside. What do you find?",
      options: [
        { label: "Filters loaded up", verdict: "These units run continuously and the filters are easy to forget. Clean or replace per the manufacturer's schedule." },
        { label: "Buildup or mold growth on the core itself", verdict: "Core fouling is a common odor source, especially on units without an effective condensate drain. Clean or replace the core per the manufacturer." },
        { label: "Standing water inside the unit / drain not flowing", verdict: "Standing water in the unit feeds odor. Clear the condensate drain so it actually drains." },
        { label: "Unit clean inside", next: 1 },
      ],
    },
    {
      ask: "Go look at the exterior intake and exhaust hoods.",
      options: [
        { label: "Debris or an insect nest in the hood", verdict: "Clean the hood out - that is pulling odor and restriction into the airstream." },
        { label: "Hoods clear, but the intake sits close to a garbage area or another exhaust vent", verdict: "The unit is pulling that odor into the fresh air stream. Relocating the intake or removing the odor source is the fix, not cleaning the unit again." },
      ],
    },
  ],
  "s-ervhrv-not-running": [
    {
      ask: "Check power at the unit and what the wall control is actually doing right now.",
      options: [
        { label: "No power at the unit's dedicated breaker, or the wall switch/timer is off", verdict: "Restore power at the source. Many of these have their own breaker plus a wall control switch." },
        { label: "Powered, but the wall control is in a dehumidistat or timer mode that is not currently calling", verdict: "The unit only looks off - it is simply not being called. Explain the control's mode rather than chasing a fault." },
        { label: "Powered and the control is calling, but the unit does nothing", next: 1 },
      ],
    },
    {
      ask: "With the unit powered and called, check the fan motors and the low-voltage control wiring.",
      options: [
        { label: "An internal safety/overload on a fan motor is tripped", verdict: "That is what is holding the unit off. Find out why it tripped before simply resetting it." },
        { label: "Overloads fine, but no control signal arriving at the unit from the wall control", verdict: "Chase the low-voltage control wiring between the wall control and the unit." },
      ],
    },
  ],
  "s-estimate-cfm-from-firing-rate-and-rise": [
    {
      ask: "Compare the CFM you calculated to the blower table value at your measured static. How do they line up?",
      options: [
        { label: "Calculated CFM is close to the table value", verdict: "Airflow is roughly where it should be. If comfort or capacity is still off, move on to duct distribution, leakage, and the refrigerant side." },
        { label: "Calculated CFM is well below the table value and static is high", verdict: "Real restriction. Break the static down by component and fix the restriction before touching blower speed." },
        { label: "Calculated CFM is well below the table value but static is normal or low", verdict: "The blower is not delivering. Check the speed tap or ECM programming, the blower wheel for dirt or slippage on the shaft, rotation direction, and for duct leakage between the unit and your temperature probes." },
      ],
    },
  ],
  "s-evap-coil-corrosion-leak-vs-biofilm-smell": [
    {
      ask: "Sort out which of the two problems you actually have - they occur independently on the same coil.",
      options: [
        { label: "Musty/sour smell with visible biofilm or slime on the coil face and drain pan", verdict: "That is biological growth. Confirm the condensate drain is flowing freely, check filter condition and duct cleanliness - no gauge or leak-detection work needed for this." },
        { label: "Low charge symptoms, performance declining over time, or an oil residue trail", verdict: "That is a suspected leak. Use electronic leak detection or UV dye at the coil, independent of whatever the smell situation is." },
        { label: "Both a smell complaint and confirmed refrigerant loss", verdict: "Handle them as two separate line items - cleaning/sanitizing and drain service for the odor, leak repair or coil replacement for the refrigerant. Fixing one does not resolve the other." },
        { label: "Coil old or corroded enough that leak repair is not practical and replacement is already on the table", verdict: "A concurrent biofilm problem is a reasonable secondary justification for replacement rather than a stand-alone cleaning, but keep the two issues clearly distinguished for the customer." },
      ],
    },
  ],
  "s-evap-coil-fin-damage-airflow": [
    {
      ask: "Look closely at the coil face - is this damage or dirt?",
      options: [
        { label: "Dirt and dust coating the face fairly uniformly", verdict: "That is a dirty coil, and cleaning applies. Fin damage tends to be localized, not uniform." },
        { label: "Fins bent flat, crushed, or matted down over a localized area", next: 1 },
      ],
    },
    {
      ask: "How bad is the damaged area?",
      options: [
        { label: "Moderately bent fins over a limited area", verdict: "A fin comb matched to the fin spacing can restore airflow through moderately bent fins. Worth trying before condemning the coil, especially on a newer unit." },
        { label: "Large percentage of the face crushed flat, or fins torn and missing rather than bent", verdict: "A comb will not meaningfully restore airflow at that point - coil replacement is the realistic fix. Either way, re-measure static pressure and temperature split after the repair to confirm airflow actually came back." },
      ],
    },
  ],
  "s-evap-coil-formicary-corrosion": [
    {
      ask: "Leak search the coil. What does the leak pattern look like?",
      options: [
        { label: "Slow, hard-to-pin-down leak on a coil a few years old, with the detector picking up activity across the coil face instead of one exact spot", verdict: "That fits formicary corrosion - multiple micro-leaks active or forming across the coil. It is a distributed failure, so coil replacement is almost always the correct repair rather than brazing individual spots." },
        { label: "One obvious single failure point", verdict: "That is not the formicary pattern. Diagnose and address that specific failure." },
        { label: "A cut-open section shows a network of tiny interconnected tunnels through the copper wall", verdict: "That is the visual signature of formicary corrosion. Look for nearby VOC sources - new construction off-gassing, cleaners, adhesives, paints - and consider a coated replacement coil, or the new one faces the same conditions." },
      ],
    },
  ],
  "s-evap-vs-compressor-superheat": [
    {
      ask: "Take superheat at the evaporator outlet and again at the compressor. How do the two compare?",
      options: [
        { label: "Compressor superheat is a lot higher than evaporator superheat", verdict: "The suction line is picking up heat. Look for missing or degraded insulation, long attic or exterior runs, and sun exposure. This costs capacity and raises discharge temperature even when the metering device is doing its job." },
        { label: "Evaporator superheat is fine but compressor superheat is near zero", verdict: "Something between the coil and the compressor is putting liquid back in. Suspect a bypassing reversing valve on a heat pump, or a flooded accumulator dumping liquid." },
        { label: "Both are low", verdict: "The evaporator itself is being overfed or has no load. Work the metering device and indoor airflow, not the suction line." },
        { label: "Both are high and close together", verdict: "The evaporator is starving. Suction line heat gain is not the issue - go after undercharge or a restriction ahead of the coil." },
      ],
    },
  ],
  "s-evaporator-distributor-uneven": [
    {
      ask: "Scan the feeder tubes leaving the distributor with a clamp probe or thermal camera. What do they show?",
      options: [
        { label: "All feeder tubes within a few degrees of each other", verdict: "Distribution is fine. The uneven coil is something else - airflow across the face, a bent-fin section, or return air stratification." },
        { label: "One or two tubes noticeably warmer than the rest", verdict: "Those circuits are starved. Debris in a distributor tube or a partly blocked nozzle. This normally means replacing the distributor or the coil, not cleaning it in place." },
        { label: "All tubes warm and superheat is high across the board", verdict: "Not a distribution problem - the whole coil is starving. Go back upstream to the metering device, drier, and charge." },
      ],
    },
  ],
  "s-evaporator-ice-pattern": [
    {
      ask: "Look at the frozen coil before thawing. How is the ice distributed?",
      options: [
        { label: "Heavy ice covering most of the coil, often built up from the bottom", verdict: "That is the low airflow signature. Expect low suction saturation, normal to low subcooling, and a high delta T. Go after filter, blower wheel, coil face, and duct static, not the charge." },
        { label: "Light ice starting at the metering device and not spreading far", verdict: "That is the starved-coil signature. Expect low suction saturation, high superheat, low subcooling, and a low delta T. Chase undercharge or a restriction, and find the leak before adding refrigerant." },
        { label: "Ice on some circuits and dry metal on others", verdict: "Distribution problem, not a system-wide charge problem. Look at the distributor, the feeder tubes, and the metering device outlet." },
        { label: "Coil is clean of ice but the suction line frosts back toward the compressor", verdict: "The coil is being flooded, not starved. Work the metering device for overfeeding and check the indoor load before the compressor takes the liquid." },
      ],
    },
  ],
  "s-excess-airflow-condensate-blowoff": [
    {
      ask: "Look at where the water actually is before you touch the drain. Where is it?",
      options: [
        { label: "Condensate downstream of the coil rather than in the pan", next: 1 },
        { label: "Water standing in the pan and backing up", verdict: "That points at the drain, not at blow-off. Excess airflow carries water past the pan lip and puts it downstream of the coil." },
      ],
    },
    {
      ask: "Measure total external static pressure, convert to CFM on the model's airflow chart, and compare against the blower table for the installed equipment and coil. What do you get?",
      options: [
        { label: "Measured CFM above the blower table for the installed tonnage and coil", verdict: "Excess airflow. Select a lower blower speed for the installed tonnage, then re-verify CFM and re-check for carryover. Check blower motor amp draw against the nameplate too, since excess air can push the motor into overload." },
        { label: "Static abnormally low across the board", verdict: "Flag the duct system as part of the problem rather than only re-tapping the blower." },
        { label: "Measured CFM in line with the blower table", verdict: "Excess airflow is not the story. Inspect the coil face and drain pan for water being carried past the pan lip and re-check the humidity complaint." },
      ],
    },
  ],
  "s-filter-bypass-poor-seal": [
    {
      ask: "Pull the filter and look for dust staining and gaps around the filter edges and the rack opening.",
      options: [
        { label: "Dust tracking around the perimeter of the filter frame or rack opening", verdict: "That is a strong sign of ongoing bypass. Find the gap and correct the seal with proper gasketing or a correctly sized filter." },
        { label: "Filter is slightly undersized for the slot, warped, or sitting loosely", verdict: "Air takes the path of least resistance through that gap instead of through the media. Fit a correctly sized filter so all the return air is forced through it." },
        { label: "Filter rack door or cover is missing, damaged, or does not latch and seal tightly", verdict: "That is a very common bypass point independent of the filter itself. Repair or replace the door." },
        { label: "Filter is sitting loosely in front of the opening instead of seated in its track", verdict: "Reseat it in its designed track or slot. This happens more often than expected after a quick filter change." },
      ],
    },
  ],
  "s-filter-delta-p-clean-baseline": [
    {
      ask: "Compare the loaded filter drop to the clean baseline and to your total external static pressure.",
      options: [
        { label: "Loaded drop is roughly double the clean drop or worse", verdict: "The filter is spent. Replace it, then re-measure total static - if the total is still high, keep working the rest of the system." },
        { label: "Loaded and clean drops are nearly the same, but the clean drop is already a large share of total static", verdict: "The filter itself is wrong for this system - too restrictive a media, or too little face area for the CFM. Look at a larger filter cabinet or a lower pressure drop media, not a more frequent change interval." },
        { label: "Filter drop is small but total external static is still high", verdict: "Filter is not your problem. Move the probes and take coil pressure drop, then single-point supply and return duct pressures to find where the restriction actually lives." },
      ],
    },
  ],
  "s-filter-drier-change-after-burnout": [
    {
      ask: "After the initial run period, pull an oil sample and run an acid test per the drier manufacturer's guidance. What comes back?",
      options: [
        { label: "Acid levels dropped to an acceptable level", verdict: "Remove the temporary suction line drier from service and leave the standard liquid line drier in place going forward. Document the cleanup steps and dates in the service record." },
        { label: "Acid still present at the follow-up check", verdict: "Replace both driers again and keep monitoring. It is normal for a severe burnout to need more than one round of drier changes." },
        { label: "Suction line drier pressure drop climbing quickly in the first hours or days", verdict: "Burnout debris loads a drier much faster than normal moisture duty. Replace it sooner than a typical service interval rather than waiting." },
      ],
    },
  ],
  "s-filter-drier-direction": [
    {
      ask: "Clamp probes on both sides of the drier and check both modes on a heat pump. What do you see?",
      options: [
        { label: "Measurable temperature drop across the drier in one mode only", verdict: "Classic one-way drier in a heat pump, or a bi-flow drier with a failed check valve. Replace with the correct bi-flow part." },
        { label: "Temperature drop across the drier in both modes", verdict: "The drier is loaded or restricted regardless of direction. Replace it, and figure out what put the debris or moisture there - a past burnout or an open system." },
        { label: "Arrow points the wrong way but no measurable temperature drop yet", verdict: "Still wrong. It is not filtering properly and will wash captured debris downstream. Correct it at the next opening rather than waiting for a failure." },
        { label: "No drop, correct bi-flow part, arrow correct", verdict: "The drier is not your problem. Keep walking the liquid line for the temperature drop, and check service valve position." },
      ],
    },
  ],
  "s-filter-electrostatic-issues": [
    {
      ask: "Confirm this is a passive electrostatic filter that charges itself from airflow with no external power, then check the airflow arrows and the media condition.",
      options: [
        { label: "Installed backwards relative to the airflow arrows", verdict: "Installed backwards, the charge-generating layers do not work as designed even though air still passes through. Reinstall it in the correct direction." },
        { label: "Correct direction but the media is heavily loaded", verdict: "A loaded electrostatic filter both restricts airflow like any dirty filter and loses its static-charge collection efficiency. Wash it per the manufacturer's schedule and confirm it is completely dry before reinstalling." },
        { label: "Correct direction and clean media, but the customer complains about dust collection", verdict: "This may be a mismatch of filter type to expectation rather than a malfunction. Electrostatic filters trade some particulate efficiency for lower static pressure and washability compared to high-MERV mechanical filters." },
        { label: "It turns out to be a powered electronic air cleaner", verdict: "Troubleshooting and expectations differ between the two. Do not apply passive electrostatic checks to a powered unit." },
      ],
    },
  ],
  "s-filter-grille-undersized-cfm": [
    {
      ask: "Measure static pressure specifically across the filter and grille location, isolated from the rest of the return system.",
      options: [
        { label: "Most of the return-side pressure drop is right at the filter grille", verdict: "That confirms it is a meaningful contributor. Check the grille's actual dimensions and net free area against the equipment's rated CFM; many techs aim for roughly 300 fpm or less face velocity on a standard 1-inch filter, but confirm against the specific filter and equipment manufacturer's guidance." },
        { label: "The drop across the grille is small and pressure is being lost elsewhere in the return", verdict: "The grille is not a meaningful contributor here. Do not recommend grille changes on this system until something shows a real drop." },
      ],
    },
    {
      ask: "If the grille is the restriction, check its history and whether it can actually be enlarged.",
      options: [
        { label: "Grille size was carried over from a smaller previous system at an equipment upgrade", verdict: "That is one of the most common real-world causes of this issue. Size the grille to the current equipment's rated CFM." },
        { label: "The opening is fixed by framing or cosmetic constraints", verdict: "Consider adding a second return and filter location to spread airflow across more filter area rather than forcing it all through one undersized opening." },
        { label: "Customer wants to try a different filter brand or MERV at the same size", verdict: "Explain that this is a sizing issue independent of brand or MERV rating. Swapping filters at the same size will not resolve it." },
      ],
    },
  ],
  "s-filter-washable-vs-disposable": [
    {
      ask: "Confirm which filter type is installed and how the customer has been maintaining it.",
      options: [
        { label: "Washable filter", next: 1 },
        { label: "Disposable filter", verdict: "Compare the customer's actual replacement interval against the filter's rated life and the home's dust and pet load. Chronic low-airflow complaints often trace back to a filter left in far past its rated interval." },
      ],
    },
    {
      ask: "Pull the washable filter and look at the media, the frame, and whether it went back in dry.",
      options: [
        { label: "Filter is damp or was reinstalled before it dried", verdict: "A damp filter restricts airflow and can support mold growth. This is a common self-inflicted issue right after a well-intentioned cleaning, so make sure it is fully dry before it goes back in." },
        { label: "Media is thinning or has gaps, or the frame is warped or torn", verdict: "Repeated handling and cleaning cycles have degraded it beyond what cleaning can fix. Recommend replacing the filter itself rather than continuing to clean compromised media." },
        { label: "Looks clean and intact but is only ever rinsed with plain water", verdict: "Plain-water rinsing lets it retain a biofilm that cuts airflow without looking visibly dirty. Clean it by a proper method instead." },
      ],
    },
  ],
  "s-filter-wrong-merv-restriction": [
    {
      ask: "With the new filter in place, measure total external static pressure and compare it to the equipment's rated maximum.",
      options: [
        { label: "Static is over the equipment's rated maximum", verdict: "The filter change is your cause - check its MERV rating against what the system was designed for. If the customer wants high MERV, look at a larger filter or a media cabinet to keep static in range." },
        { label: "Static is within the rated maximum", verdict: "Do not pin it entirely on the filter. Rule out other new causes - the timing may be coincidental." },
      ],
    },
  ],
  "s-filterrack-bypass-gaps": [
    {
      ask: "Look at where the dust staining is: around the filter itself, or around the whole rack assembly where it meets the plenum or cabinet sheet metal?",
      options: [
        { label: "Staining around the perimeter of the entire rack assembly", verdict: "The whole rack is leaking air around itself into the surrounding cavity. Seal the rack's perimeter to the surrounding sheet metal or plenum with appropriate mastic or gasketing." },
        { label: "Access panel or door over the rack opening is missing or improperly fitted", verdict: "That is about the rack's installation into the duct system, separate from the filter compartment's own door and gasket. Fit and seal a proper panel." },
        { label: "Rack was field-modified, resized, or shimmed in during a filter upgrade", verdict: "A rack adapted from a different size opening without proper fastening and sealing on all sides is a common source of this bypass. Correct the installation, not just the filter fit." },
        { label: "Staining only around the filter's own edges", verdict: "That is filter-media bypass rather than the rack's installation into the duct system. Address the filter fit and its compartment door instead." },
      ],
    },
  ],
  "s-fit-r32-hps-manual-reset": [
    {
      ask: "With power off, remove the wire on the PCB side of the high pressure switch wiring and ohm across the PCB side terminals.",
      options: [
        { label: "Not continuous", verdict: "The circuit is open - replace the switch. Published points on this platform are cut off at 4.2 MPa (605 PSIG) and cut in at 3.2 MPa (465 PSIG)." },
        { label: "Continuous", next: 1 },
      ],
    },
    {
      ask: "The switch is good but the unit still will not restart even though pressures equalized long ago. What have you done about power?",
      options: [
        { label: "Only waited for pressures to equalize", verdict: "This control does not reset itself. Turn main power OFF and back ON to clear the lockout - but find and correct the cause of the high head pressure first." },
        { label: "Already cycled main power and it locked out again", verdict: "The high head pressure cause has not been corrected. Restart and watch head pressure through a full cycle to find it." },
      ],
    },
  ],
  "s-fit-supply-voltage-min-max": [
    {
      ask: "Measure supply voltage at the unit - L1 to L2 at the outdoor unit, or the field connections for the indoor unit or heaters. Which unit type is it and what did you read?",
      options: [
        { label: "208/230 volt air handler, modular blower, or outdoor unit inside 197 to 253 volts", verdict: "In range. Energize the unit and continue diagnosis elsewhere." },
        { label: "208/230 volt unit outside 197 to 253 volts", verdict: "Genuinely out of the published window. Correct the supply before chasing intermittent faults." },
        { label: "115 volt air handler or gas furnace outside 103 to 126 volts", verdict: "Out of the published window for a 115 volt unit. Correct the supply." },
        { label: "EEV cased coil 24 volt supply outside 22.6 to 25.5 volts", verdict: "Out of the published window for the coil's 24 volt supply. Correct it before continuing." },
      ],
    },
    {
      ask: "If you got no reading at all, work back toward the fused disconnect.",
      options: [
        { label: "No voltage anywhere from the unit back to the fused disconnect", verdict: "Open wiring, open fuses, or no power. Repair as needed." },
        { label: "Voltage present at the disconnect but not at the unit", verdict: "The break is between the disconnect and the unit - open wiring or an open fuse in that run." },
      ],
    },
  ],
  "s-fixed-orifice-wrong-size": [
    {
      ask: "Read superheat and suction pressure, then check the stamped or color-coded piston size against the manufacturer's chart for the actual indoor/outdoor tonnage combination.",
      options: [
        { label: "High superheat, low suction, reduced capacity, and the piston is smaller than the chart calls for", verdict: "The orifice is too small and is underfeeding the coil - it resembles a restriction or undercharge that charging to spec never quite resolves. Replace with the correct size before any further charge adjustment." },
        { label: "Low, unstable superheat with floodback risk, and the piston is larger than the chart calls for", verdict: "The orifice is too large and is overfeeding the coil - it resembles an overcharge that persists even after removing refrigerant. Replace with the correct size, then recharge to the chart." },
        { label: "Piston matches the chart for the installed combination", verdict: "Sizing is not the issue here. Leave the piston alone and look elsewhere." },
        { label: "Coil or outdoor unit was replaced without changing the piston, or units are mismatched from different systems", verdict: "That is exactly the situation this comes from. Confirm the piston against the chart for what is actually installed now, not what used to be there." },
      ],
    },
  ],
  "s-flame-moves-when-the-blower-starts": [
    {
      ask: "Seal the return plenum seams and the blower compartment leaks you can reach, then run the burners and start the blower again. What happens to the flame now?",
      options: [
        { label: "Flame is steady now, no change on blower start", verdict: "You were watching cabinet and return leakage, not a heat exchanger breach. Seal it properly and re-verify with combustion numbers. Still worth a visual inspection, but the flame test no longer points at the exchanger." },
        { label: "Flame still moves, and flue CO jumps when the blower starts", verdict: "That combination points hard at a breach in the heat exchanger. Confirm with the isolation pressure test and a borescope, then shut it down and red tag." },
        { label: "Flame still moves but flue CO and O2 do not change at all", verdict: "Do not condemn on flame movement alone. Verify with the isolation pressure test and a visual, and check that combustion air is not being disturbed by something else in the space, like a dryer or exhaust fan cycling." },
      ],
    },
  ],
  "s-flame-sensor-cleaning-method": [
    {
      ask: "With power off at the disconnect, pull the sensor and inspect the white ceramic insulator. What do you see?",
      options: [
        { label: "A crack or hairline chip in the ceramic", verdict: "A cracked insulator lets the rod leak to ground and no amount of polishing fixes it - replace the sensor." },
        { label: "Ceramic intact, rod coated", next: 1 },
      ],
    },
    {
      ask: "Clean the rod lightly with a fine abrasive pad, fine steel wool, or folded very fine paper, wipe off the grit, reinstall it in its original position, then read the flame signal in microamps with a meter in series. What do you get?",
      options: [
        { label: "Reading at or above the manufacturer's minimum for that control", verdict: "That is the fix for now. Note the flame signal on the invoice so the next tech can see whether it is dropping year over year." },
        { label: "Still marginal after cleaning", verdict: "Check the burner ground and the equipment ground before condemning the board - rectification depends on the burner being the ground path." },
      ],
    },
  ],
  "s-flash-gas-sight-glass": [
    {
      ask: "With the system running stable, not right at startup, read the liquid line sight glass alongside subcooling.",
      options: [
        { label: "Clear solid liquid, no bubbles, adequate subcooling", verdict: "That is a full column of liquid - the target condition. No flash gas problem." },
        { label: "Persistent bubbling with low subcooling and low suction pressure", verdict: "That points to genuine undercharge or a leak. Proceed to leak search." },
        { label: "Persistent bubbling but subcooling measures normal or high at the condenser outlet", verdict: "The flash gas is being generated by pressure drop between the condenser and the sight glass. Look for a restriction - partially plugged filter drier, undersized liquid line - between those two points." },
        { label: "Bubbling on a system with a substantial vertical lift in the liquid line", verdict: "Some pressure drop and flash gas risk is a normal design consideration on a tall riser. Compare against the line set design guidance for that lift height before calling it a fault." },
      ],
    },
  ],
  "s-flashback-vs-delayed-ignition": [
    {
      ask: "Restore operation and watch a cold start, a hot restart, and burner shutdown. When does the burning inside the venturi happen?",
      options: [
        { label: "Only after a lag at light-off", verdict: "Treat it as delayed ignition, not flashback. The two have different fixes, so do not start on gas pressure and burner alignment." },
        { label: "Immediately at ignition with the flame pulling back into the venturi, or at burner shutoff as an extinction pop", next: 1 },
      ],
    },
    {
      ask: "You have flashback - burning speed exceeding the gas-air velocity leaving the burner port. Work it in the manual order. What do you find?",
      options: [
        { label: "Gas pressure is off the value specified on the rating plate for this model and fuel", verdict: "Adjust to the rating plate pressure first - that is the first check for flashback. Then recheck flame appearance and stability through a full cycle." },
        { label: "A burner is out of alignment in the ports, or is distorted or damaged", verdict: "Realign the burners in the burner ports and replace any distorted or damaged burner." },
        { label: "Orifice is the wrong size for the fuel, or an orifice is obstructed", verdict: "Fit the correct orifice size for the fuel and clear the obstruction. Never redrill an orifice." },
        { label: "Pressure, alignment and orifices all check out", verdict: "Recheck flame appearance and stability through a full cycle, then run a combustion/CO analysis before returning the unit to service." },
      ],
    },
  ],
  "s-float-switch-types-testing": [
    {
      ask: "Identify the switch type and trip it by the correct method for that type, watching whether the circuit actually opens.",
      options: [
        { label: "Mechanical float lifts and tilts freely but the circuit does not open", verdict: "The internal switch has failed. This is not a float problem, so replace the switch." },
        { label: "Electronic conductivity probes bridged with water and nothing trips", verdict: "Probes that are corroded or coated in biofilm can fail to sense water even when submerged. Clean or replace them." },
        { label: "Optical sensor submerged or covered per the manufacturer's method and nothing trips", verdict: "A dirty or scaled lens is the common false-negative cause on this type." },
        { label: "Switch trips correctly when tested", verdict: "Confirm it is wired to actually interrupt the call for cooling or heating rather than just run an indicator light, and that it is mounted at the correct pan so it catches an overflow before water damage occurs." },
      ],
    },
  ],
  "s-force-defrost-test-recall": [
    {
      ask: "With power on, the unit not running, and the thermostat calling for heating, press TEST and RECALL together for about 3 seconds and release. What happens?",
      options: [
        { label: "System goes into defrost immediately", next: 1 },
        { label: "Nothing happens", verdict: "The board will not initiate on command. Replace the control board." },
      ],
    },
    {
      ask: "Meter the board outputs during the forced defrost - skip the C-to-O check on a fully communicating system.",
      options: [
        { label: "24 volts across C and O, 24 volts across W2 and C, frost melting and compressor running", verdict: "The board and its outputs are all good. Work the defrost complaint from the sensors and their placement instead." },
        { label: "One of those readings is missing, or frost is not melting", verdict: "Replace the control board. Set the thermostat to off and disconnect power before removing any jumpers or wires." },
      ],
    },
  ],
  "s-freeing-stuck-reversing-valve-head-pressure": [
    {
      ask: "Before anything mechanical, connect gauges and confirm the valve is actually receiving its 24V signal. Is it there?",
      options: [
        { label: "No 24V signal at the valve", verdict: "It is un-commanded, not stuck. Do not attempt the head pressure trick until the signal is there." },
        { label: "24V present and the valve still will not shift", next: 1 },
      ],
    },
    {
      ask: "In cooling, block the outdoor fan exhaust to raise head pressure, staying well inside the unit high side limits, then cycle between cooling and heating. What happens?",
      options: [
        { label: "Piston frees and the valve shifts", verdict: "Unblock the fan exhaust right away. The valve was mechanically stuck - treat it as suspect and plan for replacement." },
        { label: "Valve still will not move", verdict: "Unblock the fan exhaust and stop raising head pressure. Raising it did not free the piston, and you do not want to run it up to a trip." },
      ],
    },
  ],
  "s-freshair-damper-control-timer-issue": [
    {
      ask: "Identify the control strategy in use, whether a runtime-percentage timer, a dedicated ventilation controller, or a smart thermostat ventilation setting, then compare its clock and programmed settings against what was intended.",
      options: [
        { label: "Controller's clock or schedule is wrong, often after a power interruption", verdict: "A controller that lost its time setting runs on the wrong schedule without throwing any obvious fault. Reset the clock and schedule." },
        { label: "Programmed settings do not match the ventilation calculation done at install", verdict: "Factory defaults are rarely correct for a specific house. Program it to the values the home's size and occupancy actually call for." },
        { label: "Damper opens on schedule but no fresh air is actually delivered", verdict: "Check the interlock with the main system's blower call. A correctly timed damper opening with no blower running delivers fresh air nowhere." },
        { label: "A CO2 or humidity sensor drives the control and reads off against a reference instrument", verdict: "A drifted sensor makes the damper run far more or far less than the home actually needs. Verify against a reference and correct or replace it." },
      ],
    },
  ],
  "s-freshair-damper-stuck": [
    {
      ask: "Confirm this is a standalone motorized outdoor air damper rather than part of an ERV or HRV core, then determine which way it is stuck.",
      options: [
        { label: "Stuck closed with no power or control signal at the actuator during its intended call", verdict: "The call side is not driving it, whether that is a timer, CO2 sensor, or a run-time percentage on the thermostat or controller. Chase the control signal, not the damper." },
        { label: "Stuck closed with the control signal confirmed present at the actuator", verdict: "Look at the actuator itself and check the linkage for seizing." },
        { label: "Stuck open, pulling outdoor air continuously", verdict: "That drives high humidity intrusion in summer or excess heating and cooling load in extreme weather. Check the actuator's spring-return function if equipped and confirm it is not binding mechanically." },
        { label: "Blade and linkage corroded or packed with debris", verdict: "Outdoor-facing dampers see far more weather and dust than indoor components, and that buildup alone can hold the blade in position. Clean and free it." },
      ],
    },
  ],
  "s-fujitsu-terminal3-pulse-check": [
    {
      ask: "Read 1-2 on AC volts and 3-to-2 on DC volts at the outdoor unit, then take the same two readings at the indoor unit.",
      options: [
        { label: "AC good at both ends, and the DC on terminal 3 is moving at both ends", verdict: "Power and signal are both present. Pull the unit's fault code and work the indoor board, its sensors, and the protection functions instead." },
        { label: "AC good at both ends, DC on terminal 3 dead or completely unchanging", verdict: "One end is not talking. Lift terminal 3 at the indoor unit and re-read at the outdoor unit - if it comes alive, the indoor board or its run is loading the line." },
        { label: "AC missing at the indoor block", verdict: "The indoor unit has no supply. Check the run between the units, the outdoor unit's output, and the outdoor board's fuse before you look at communication at all." },
      ],
    },
  ],
  "s-furnace-13-volts-c-to-r-blown-fuse": [
    {
      ask: "With the thermostat calling, measure 24 volts right off the transformer secondary, then measure between the (C) and (R) terminals on the equipment terminal board. What pair of readings do you have?",
      options: [
        { label: "24 volts at the transformer, about 13 volts at C to R", verdict: "That is the published signature of a blown low-voltage fuse on the control board, not a failed transformer. Replace the fuse with the same rating - never larger, never a piece of wire - then find why it opened by checking the thermostat wiring for a short to ground." },
        { label: "24 volts at the transformer and a clean 24 volts at C to R", verdict: "The low-voltage supply is good at the terminal board. Look further downstream for the complaint." },
        { label: "No 24 volts off the transformer secondary", verdict: "The transformer itself is not producing - this is not the blown-fuse signature. Work the transformer and its feed." },
      ],
    },
  ],
  "s-furnace-40va-transformer-no-24v": [
    {
      ask: "Pull the thermostat low voltage wires off the control module terminals, restore power with the door interlock switch closed, and read across R and C.",
      options: [
        { label: "24 VAC present at R and C", verdict: "The 40 VA transformer and its supply are good. The loss is out in the thermostat wiring or at the thermostat itself." },
        { label: "No voltage at R and C", next: 1 },
      ],
    },
    {
      ask: "Check transformer primary voltage at the incoming line voltage connections, the fuse, the splices, and the blower door interlock switch.",
      options: [
        { label: "Line voltage present at the primary but nothing at the secondary", verdict: "The 120 volt primary to 24 volt secondary, 40 VA transformer is inoperative. Replace it." },
        { label: "No line voltage reaching the primary", verdict: "The kill is upstream: open fuse, bad wiring, bad splice, or an open blower door interlock switch. Work those before ordering a transformer." },
      ],
    },
  ],
  "s-furnace-bvent-corrosion-cati": [
    {
      ask: "Walk the visible vent run and inspect seams, joints, and the termination cap.",
      options: [
        { label: "Rust streaking at seams and joints", next: 1 },
        { label: "Sections not fully seated, loose, or missing the correct number of screws per section", verdict: "Separated or loosely fitted joints let flue gas leak and can eventually let a section fall apart. Re-secure per section, or replace sections that are corroded - treat separation as a priority safety repair." },
        { label: "Corrosion or blockage at the vent cap from rust flaking off inside", verdict: "Clear and inspect the full run. If corrosion is significant or joints have separated, replace the affected sections or the whole run - tape or sealant is not rated for flue gas service." },
      ],
    },
    {
      ask: "Check what is connected to this vent now versus what it was originally sized for.",
      options: [
        { label: "Furnace was downsized or replaced with a higher-efficiency unit and the vent was never resized", verdict: "The now-oversized B-vent runs cooler than designed, condenses inside, and corrodes. That is the root cause - resizing the vent for the actual connected load is the fix, not just replacing rusted sections." },
        { label: "Connected appliance load still matches what the vent was sized for", verdict: "Check where the vent passes through firestops, ceiling supports, roof jacks, and attic space for physical damage or gaps letting flue gas into unintended spaces." },
      ],
    },
  ],
  "s-furnace-co-detector-alarm": [
    {
      ask: "Before troubleshooting anything, ask the homeowner whether anyone feels unwell.",
      options: [
        { label: "Someone reports headache, dizziness, or nausea", verdict: "Advise evacuation to fresh air right now, before any troubleshooting. Shut down the furnace and any other fuel-burning appliances sharing the space or venting." },
        { label: "Nobody reports symptoms", next: 1 },
      ],
    },
    {
      ask: "Shut the appliances down, then test with a calibrated CO analyzer. Where do you find CO?",
      options: [
        { label: "Elevated in the supply air stream", verdict: "Points at a cracked heat exchanger. Keep the furnace shut down until it is confirmed and corrected." },
        { label: "Elevated in the flue gas or in ambient room air near the appliance", verdict: "Look at blocked or deteriorated venting, insufficient combustion air, or a backdrafting appliance as the source." },
        { label: "Nothing elevated anywhere yet", verdict: "Do not clear the alarm and walk away without a confirmed cause. Keep checking every fuel-burning appliance sharing the space - a nuisance-alarm assumption on a real CO event is a life-safety mistake." },
      ],
    },
  ],
  "s-furnace-communicating-control-fallback-mode": [
    {
      ask: "Before assuming a mechanical or gas-side fault, check the thermostat or board display for a fallback/non-communicating status indicator.",
      options: [
        { label: "Display shows a fallback or non-communicating status", next: 1 },
        { label: "System reports communicating normally but still will not stage or modulate", verdict: "Fallback is not the issue. Work the mechanical or gas-side fault for the staging complaint." },
      ],
    },
    {
      ask: "Find out why it dropped out of communicating mode.",
      options: [
        { label: "Generic thermostat wire was substituted for the specific conductor pair or count the system requires", verdict: "Many communicating systems will not fall back gracefully on substituted wire. Rewire with what the system requires, and inspect the comm run for damage or moisture separately from the power wiring." },
        { label: "Thermostat is compatible but not a matched communicating pair with the furnace board", verdict: "It will run the furnace in basic fallback indefinitely, which reads as an intermittent fault. Install the matched control." },
        { label: "Board was replaced and the firmware or model does not match the line", verdict: "Some communicating systems require the replacement board matched or reconfigured for the specific model - a generic or mismatched board defaults to fallback." },
        { label: "Customer deliberately replaced the proprietary thermostat with a generic one", verdict: "Fallback is expected here. Document that reduced staging and modulation performance is a consequence of that choice, not a defect to keep chasing." },
      ],
    },
  ],
  "s-furnace-concentric-vent-blockage": [
    {
      ask: "Inspect the concentric termination fitting closely and note the weather conditions when the faults happen.",
      options: [
        { label: "Asymmetric ice built up at the outer ring of the fitting, and faults track cold, calm-wind days", verdict: "Exhaust moisture freezes at the outer ring first and gradually restricts the intake path before fully blocking exhaust. Suspect termination icing rather than a switch or board fault." },
        { label: "Debris or insects packed into the opening", verdict: "Concentric kits have a smaller effective opening than two separate pipes, so partial blockage matters more. Clear it and reassemble exactly per the kit's instructions." },
        { label: "Termination mounted low and buried or half-buried by snow", verdict: "Minimum clearance from grade and expected snow accumulation was not followed at install. Raise or relocate the termination to spec." },
        { label: "Opening clear, but the internal baffle/divider inside the fitting is damaged or improperly assembled", verdict: "That divider is what separates intake from exhaust in a single housing - damage lets exhaust gas recirculate into the intake. Repair per the kit, do not improvise with generic pipe fittings." },
      ],
    },
  ],
  "s-furnace-condensate-trap-orientation-wrong": [
    {
      ask: "Confirm the furnace's actual installed orientation, then compare the trap setup against the install manual's configuration for that orientation.",
      options: [
        { label: "Furnace is downflow or horizontal but the trap is still in its factory upflow position", verdict: "Multi-poise traps are position-sensitive. It has to be reconfigured per the manual for the installed orientation - this is a common cause of intermittent drainage problems." },
        { label: "Trap left in the factory position and plumbed with extra fittings to make it work", verdict: "A common shortcut that causes intermittent drainage problems. Replace with a properly oriented trap kit rather than re-plumbing with more elbows - added fittings add blockage points and callbacks." },
        { label: "Trap is configured per the manual for this orientation", next: 1 },
      ],
    },
    {
      ask: "Check the trap's air-break/vent tube and verify condensate reaches the trap by gravity from every source point.",
      options: [
        { label: "Vent tube is oriented wrong for the installed position", verdict: "Inducer suction can pull the trap dry, letting flue gas escape through the drain or upsetting pressure switch operation. Reorient it per the manual." },
        { label: "A source - heat exchanger, or a cased coil in the same cabinet - does not drain to the trap by gravity in this orientation", verdict: "Some orientations require different port usage on the same trap body. Re-port it per the manual." },
        { label: "Everything drains, but there is a low point holding standing condensate", verdict: "A low point that cannot fully drain holds water even while it appears to be working. Look for signs of past freezing or blockage and correct the routing." },
      ],
    },
  ],
  "s-furnace-confined-space-combustion-air": [
    {
      ask: "Calculate the closet's volume and compare it against the combined input Btu/hr of every fuel-burning appliance in the space.",
      options: [
        { label: "Space is below the confined-space threshold with no dedicated combustion air openings", verdict: "It needs engineered openings, not incidental leakage. Determine whether the design uses the indoor-air method or the outdoor-air method, since required opening sizes differ significantly." },
        { label: "Openings exist but were never sized from a combustion air calculation", verdict: "Very common on retrofit closet conversions - laundry rooms, converted storage. Size the openings for the method used and the actual Btu load." },
        { label: "Openings are correctly sized on paper for the method used", next: 1 },
      ],
    },
    {
      ask: "Verify the openings in the field rather than on paper.",
      options: [
        { label: "Openings blocked by shelving, insulation, stored items, or a closed door", verdict: "A code-compliant opening that has been blocked effectively does not exist. Clear it and explain to the customer why it has to stay clear." },
        { label: "Outdoor-air ducts with excessive length, many turns, or a poor termination point", verdict: "Excess length, turns, or a termination too close to grade or prone to snow accumulation reduce effective air delivery. Correct the routing or termination." },
        { label: "Openings clear and correctly routed but the space still fails the calculation", verdict: "Consider recommending a sealed-combustion (direct vent) furnace as a retrofit solution instead of forcing adequate openings into a tight space." },
      ],
    },
  ],
  "s-furnace-control-board-relay-failure": [
    {
      ask: "During the call for the affected function, listen and feel for the relay while checking for output at the load side.",
      options: [
        { label: "Relay clicks but no output at the load side", verdict: "Failed contacts - pitted or burned. On boards where relays are not separately replaceable, the full board has to be replaced; never leave a relay bypassed as a fix." },
        { label: "Relay does not click at all", next: 1 },
        { label: "The function runs continuously and will not shut off", verdict: "Relay stuck closed - less common but more disruptive than stuck open. Replace the board rather than bypassing anything, since a bypass defeats safety interlocks tied to that circuit." },
      ],
    },
    {
      ask: "Check for correct control voltage at the relay's coil terminals during the call for that function.",
      options: [
        { label: "Voltage present at the coil and nothing happens", verdict: "Confirms a coil or driver-circuit failure on the board rather than an upstream signal problem. Inspect the board for scorching, bulging capacitors, or corrosion near that relay and replace it." },
        { label: "No voltage at the coil during the call", verdict: "Upstream signal problem, not the relay. Work back toward the call, and check the board's diagnostic LED or display for a corresponding fault." },
      ],
    },
  ],
  "s-furnace-door-interlock-switch-intermittent": [
    {
      ask: "Confirm this is the blower door interlock, then put a meter across the switch and work the door through its full range of motion.",
      options: [
        { label: "Continuity cuts in and out instead of switching cleanly once", next: 1 },
        { label: "Switches cleanly and holds through the full motion", verdict: "The switch itself is not the intermittent. Wiggle-test the wiring and spade terminals at the switch while monitoring continuity - a corroded or loose connection mimics a switch problem." },
      ],
    },
    {
      ask: "Find what is making the contact marginal.",
      options: [
        { label: "Contact is only made when the door is pressed in one specific spot", verdict: "A worn plunger or a slightly warped door. Replace the switch and correct the alignment - do not bend the plunger or force the door tighter as a workaround." },
        { label: "Plunger, strike area, or bracket is worn or bent, or debris keeps the door from seating flush", verdict: "Correct the door seating and replace the switch - uneven pressure on the plunger is what wore it out." },
      ],
    },
  ],
  "s-furnace-downflow-limit-nuisance": [
    {
      ask: "Compare the furnace against the install manual's downflow requirements. What is missing?",
      options: [
        { label: "Required downflow accessory kit - different limit control, added baffle, or vestibule panel - was never installed", verdict: "The furnace was set on a downflow plenum without the internal changes. That missed step is the classic cause of nuisance limit trips in this orientation." },
        { label: "Orientation-specific control board setting was never changed from the factory default", verdict: "Set it for downflow per the manual before chasing anything else." },
        { label: "Downflow configuration is complete per the manual", next: 1 },
      ],
    },
    {
      ask: "Note when in the cycle the limit trips, and check the discharge side below the unit.",
      options: [
        { label: "Trips shortly after the burners light, on most cycles", verdict: "Look at total airflow: a restricted return air/floor plenum below the unit, tight discharge transitions, or a blower speed tap too low for the higher static typical of downflow closet installs." },
        { label: "Trips only after the unit has run a while", verdict: "Points at heat concentrating in one area of the exchanger rather than total airflow being the sole cause. Also confirm the floor base/subbase is correct and is not restricting the discharge opening." },
      ],
    },
  ],
  "s-furnace-draft-hood-spillage": [
    {
      ask: "Smoke-test at the draft hood relief opening at cold start, then again after the furnace has run several minutes.",
      options: [
        { label: "Spills at cold start, then spillage stops once the flue warms and draft establishes", next: 1 },
        { label: "Spills continuously even after the flue is warmed up", verdict: "Confirm with a draft gauge, then go after the vent itself - a blocked, disconnected, or undersized vent connector or chimney is the most common root cause. Do not leave the furnace in service with confirmed spillage." },
        { label: "No spillage at either condition", verdict: "Confirm actual updraft with a draft gauge if spillage was reported but not obvious, and find out whether a competing exhaust device was running when the complaint happened." },
      ],
    },
    {
      ask: "Repeat the spillage test with the house exhaust devices running - range hood, bath fans, clothes dryer, or another combustion appliance.",
      options: [
        { label: "Spillage appears or gets worse with the exhaust devices running", verdict: "Competing depressurization is overcoming the flue's natural draft. That is a house-pressure problem, not a burner problem." },
        { label: "Behaves the same whether the exhausts run or not", verdict: "Inspect the chimney and vent for a blockage - bird nest, debris, collapsed liner - and confirm the vent connector has proper rise with no long horizontal or sagging runs trapping condensate." },
      ],
    },
  ],
  "s-furnace-dsi-electrode-gap-position": [
    {
      ask: "Confirm DSI - no glowing igniter and no pilot, direct spark at the main burner - then check the spark gap with a feeler gauge against the furnace's spec.",
      options: [
        { label: "Gap measures wider than spec", verdict: "Too wide will not spark reliably. Reset the gap to the furnace's spec." },
        { label: "Gap measures narrower than spec", verdict: "Too narrow gives a weak spark that will not reach the gas stream. Reset the gap to spec." },
        { label: "Gap is on spec", next: 1 },
      ],
    },
    {
      ask: "Look at where the electrode tip actually sits, at the ignition cable, and at how light-off behaves.",
      options: [
        { label: "Tip sits off to the side of the gas flow from the burner port", verdict: "Position drifts after burner removal and reinstall during service. Put the tip directly in the path of gas flow." },
        { label: "Ignition cable or boot is cracked or shows carbon tracking", verdict: "DSI cables run full spark voltage and degrade with heat cycling. Replace the cable and boot." },
        { label: "Spark looks fine but ignition is delayed and lights with a bang", verdict: "Check gas valve opening time against burner light-off - a valve that opens too slowly relative to spark timing causes delayed light-off. Correct it immediately; repeated delayed ignition can loosen heat exchanger joints." },
        { label: "Spark, position, and timing fine, but flame will not prove", verdict: "Most DSI systems use a separate flame sensor rod from the spark electrode - do not confuse the two. Check the sensor's microamp signal independently." },
      ],
    },
  ],
  "s-furnace-flame-rectification-theory": [
    {
      ask: "Put a microammeter in series with the sensor lead, set to DC, and run the burner. What do you read?",
      options: [
        { label: "Zero - no signal at all", verdict: "Check for a broken sensor lead or an open circuit before assuming a flame problem." },
        { label: "A signal is present but below that control's minimum cutoff", next: 1 },
        { label: "Comfortably above that control's minimum", verdict: "Rectification is working. Look elsewhere for the complaint." },
      ],
    },
    {
      ask: "A low-but-present signal is not automatically a dirty rod. Check the electrical side.",
      options: [
        { label: "Line hot and neutral are reversed at the furnace disconnect", verdict: "Reversed polarity degrades rectification even with a clean rod and a good flame. Correct polarity and re-read microamps." },
        { label: "Ground/neutral bond path back to the board is poor", verdict: "Rectification needs a solid path back to the board - a poor ground gives a normal-looking flame with an insufficient sensed signal. Fix the ground." },
        { label: "Polarity and ground both check out", verdict: "Then look at the rod itself - an oversized or misplaced rod produces the same low reading as a dirty one, since rod-to-burner surface area is what makes rectification work." },
      ],
    },
  ],
  "s-furnace-flame-sensor-microamp-reading-low-clean": [
    {
      ask: "Confirm you are reading DC microamps in series with the sensor lead, not continuity or voltage, then look at where the rod sits in the flame.",
      options: [
        { label: "Rod sits at the edge of, or above, the visible flame envelope", verdict: "It reads low even when clean - it has to sit within the flame itself. Reposition and re-read." },
        { label: "Rod is well immersed in the flame", next: 1 },
      ],
    },
    {
      ask: "Look closely at the rod, its ceramic insulator, and the burner flame itself.",
      options: [
        { label: "Thin gray/white oxide film on the rod rather than obvious carbon", verdict: "That light film still insulates the rod enough to drop the signal. A light abrasive cleaning usually restores it - not sandpaper, which can leave a conductive residue." },
        { label: "Ceramic insulator around the rod is cracked", verdict: "A cracked insulator leaks the signal to ground before it reaches the board. Replace the sensor." },
        { label: "Flame is lazy, yellow-tipped, or turbulent", verdict: "A poor flame rectifies less efficiently than a stable blue flame even against a perfectly clean rod. Fix combustion first." },
        { label: "Rod, insulator, and flame all look right", verdict: "Rule out a marginal equipment ground or reversed polarity before replacing the sensor." },
      ],
    },
  ],
  "s-furnace-gas-regulator-stuck": [
    {
      ask: "Confirm the burners light and extinguish normally, then turn the regulator adjustment screw and watch manifold pressure.",
      options: [
        { label: "Manifold pressure does not change after several turns", next: 1 },
        { label: "Pressure responds to the screw but drifts over time", verdict: "Inspect the regulator vent, if externally vented, for debris or moisture contamination - a blocked vent causes erratic or drifting pressure." },
        { label: "Burners do not light or extinguish correctly", verdict: "That is a flow/solenoid problem, not the built-in regulator. Diagnose the valve's on/off function instead." },
      ],
    },
    {
      ask: "Before condemning the regulator, check what is feeding it and how it is configured.",
      options: [
        { label: "Inlet pressure to the valve is outside spec", verdict: "A regulator cannot correctly regulate an inlet pressure that is already out of range. Fix the upstream supply first, then re-measure manifold pressure." },
        { label: "Inlet in spec, but the natural gas/LP conversion cap or spring is set for the wrong fuel", verdict: "Set the conversion regulator to match the fuel in use and re-measure before replacing anything." },
        { label: "Inlet in spec, conversion correct, still no response to adjustment", verdict: "Stuck or failed regulator diaphragm. Replace the valve - the regulator is not field-serviceable separately from the valve body on virtually all residential combination valves." },
      ],
    },
  ],
  "s-furnace-gas-smell-startup": [
    {
      ask: "Watch an actual ignition cycle from a safe distance. When exactly do you smell it?",
      options: [
        { label: "Only at the moment of light-off, briefly, then gone", verdict: "Consistent with a brief puff of unburned gas at normal ignition, or dust burn-off on the first fire of the season. Confirm ignition is prompt rather than assuming." },
        { label: "Light-off is delayed and the smell is stronger at ignition", verdict: "Delayed ignition burns a larger pocket of accumulated gas. See the delayed ignition entry and correct it." },
        { label: "Smell lingers after light-off, or happens on every cycle", verdict: "Treat it as an active problem, not normal. Check the gas valve for a slow-closing or leaking-by condition letting gas accumulate between cycles." },
        { label: "Cannot clearly tie it to light-off at all", verdict: "Treat it as a gas leak: stop, do not operate switches, ventilate, and follow standard gas leak procedure." },
      ],
    },
  ],
  "s-furnace-gas-valve-redundant-internal-leak": [
    {
      ask: "With the valve fully de-energized, check for a gas smell at the furnace and leak-check the external fittings.",
      options: [
        { label: "Faint gas smell at the furnace with the valve off, but no visible external leak at any fitting", next: 1 },
        { label: "Leak found at an external fitting", verdict: "Not an internal valve issue - repair the fitting and re-leak-check." },
      ],
    },
    {
      ask: "Isolate the upstream supply and run a proper leak-down/bubble test downstream of the valve with the valve off.",
      options: [
        { label: "Downstream holds - no leak-down", verdict: "Both seats are sealing. Look elsewhere for the odor source." },
        { label: "Downstream leaks down with the valve closed", verdict: "Confirmed internal seat leakage past one seat. These are sealed, non-serviceable assemblies - replace the valve as a unit, matching pressure rating, regulator type, and connection pattern, not just physical size." },
      ],
    },
  ],
  "s-furnace-ground-neutral-burner-resistance": [
    {
      ask: "With power disconnected, measure resistance between the neutral (white) connection and the burner closest to the flame sensor. What do you read?",
      options: [
        { label: "Less than 10 ohms", verdict: "The ground path is good, so the flame sense dropout is not a grounding problem on this measurement. Still confirm polarity and that the ground runs all the way to the panel before moving on." },
        { label: "More than 10 ohms", verdict: "That points to a poor ground path or a high-resistance neutral, and that is your fault. Correct the connection and re-measure before replacing any parts." },
      ],
    },
    {
      ask: "Check the line connection and the ground run at the furnace. What do you find?",
      options: [
        { label: "Hot and neutral are reversed at the line connection", verdict: "Reversed line polarity causes exactly this failure to sense flame. Correct the polarity and re-run a full heat cycle." },
        { label: "The ground only reaches the cabinet or a local point, not back to the electrical panel", verdict: "The ground wire has to run from the furnace all the way back to the panel. Correct it and re-measure the neutral-to-burner resistance." },
        { label: "Polarity is correct, the ground runs back to the panel, and resistance is under 10 ohms", verdict: "The grounding side is clean. Remember the ignition control is a combined electronic and electromechanical device and is not field repairable - if it is genuinely failed the complete control must be replaced." },
      ],
    },
  ],
  "s-furnace-ground-neutral-to-burner-resistance": [
    {
      ask: "With power locked out and verified dead, measure resistance between the neutral (white) connection and the burner closest to the flame sensor, then compare against the value in that specific unit's service manual. What do you get?",
      options: [
        { label: "Reading is inside the limit published for that model", verdict: "The ground path measures acceptable. Recheck the flame signal in microamps before condemning any component." },
        { label: "High reading, or open", verdict: "That means a bad ground. Clean and tighten the burner assembly, cabinet, and panel ground connections, retest, then recheck the flame signal in microamps." },
        { label: "You do not have the published limit for that model", verdict: "Do not assume a number - published limits differ by model, some specifying less than 2 ohms and others less than 10 ohms. Get the value for that specific unit before judging the reading." },
      ],
    },
  ],
  "s-furnace-heat-exchanger-clamshell-signature": [
    {
      ask: "On a clamshell exchanger, focus on the crossover area where sections connect and the base near the burner ports. What do you find?",
      options: [
        { label: "White or gray staining/efflorescence at a crossover or near the burner ports", verdict: "That staining often marks a crack before it is directly visible. Follow up with a mirror or borescope on the far sections and a CO/combustion analyzer comparing supply air to ambient." },
        { label: "One section rocks or moves relative to its neighbors when gently flexed with the furnace off", verdict: "Sound clamshell sections should feel rigid as an assembly. Movement is a strong failure sign - confirm with borescope and analyzer, and treat a confirmed or strongly suspected crack as a shutdown and red-tag." },
        { label: "No staining and every section feels rigid", verdict: "Nothing visual yet, but no single method is fully reliable alone. Run the analyzer supply-vs-ambient comparison and borescope the inner sections before clearing it." },
      ],
    },
  ],
  "s-furnace-heat-exchanger-crack-suspect": [
    {
      ask: "Block return air off from the burner compartment and check for CO in the supply air stream with a combustion analyzer.",
      options: [
        { label: "CO in the supply air is elevated", verdict: "Strong indicator of a compromised heat exchanger. Do not operate the furnace - shut it down and red-tag it. This is a replacement, not a patch." },
        { label: "Supply air CO is not elevated", next: 1 },
      ],
    },
    {
      ask: "Work the other red flags.",
      options: [
        { label: "Flame flickers or dances noticeably when the blower kicks on", verdict: "Classic red flag. Follow with a flashlight/borescope inspection, and remember many cracks are not visible without disassembly - do not return it to service if a crack is strongly suspected." },
        { label: "Rust or scaling patterns inside the exchanger", verdict: "Suggests long-term condensation damage, common on furnaces that have been oversized or short-cycling for years. Inspect further before returning it to service." },
        { label: "No odd smell, no soot, no CO alarm, steady flame", verdict: "Nothing confirming a crack right now. Document what you checked rather than condemning it." },
      ],
    },
  ],
  "s-furnace-heat-exchanger-tubular-serpentine-signature": [
    {
      ask: "Identify the exchanger design before you start inspecting.",
      options: [
        { label: "Multiple individual tubes per burner running to a common collector box", verdict: "Tubular. Focus on the tube-to-collector weld/joint area, which sees the most thermal cycling stress, and look for bulging or discoloration along the tube length." },
        { label: "One continuous tube folded back and forth", verdict: "Serpentine. Focus on the bend and fold areas rather than the straight runs - repeated flexing at the bends is where fatigue cracking concentrates." },
        { label: "High-efficiency unit with secondary condensing surfaces", verdict: "Look for rust-through or pinhole perforation on the secondary condensing surfaces - a different pattern than the cracks typical of non-condensing designs." },
      ],
    },
    {
      ask: "Listen during operation, then confirm with an analyzer.",
      options: [
        { label: "Whistling or fluttering sound during operation", verdict: "A more common audible symptom on tubular and serpentine designs than on clamshell, and worth chasing. Confirm with a combustion analyzer comparing supply-side CO to return/ambient." },
        { label: "No unusual sound during operation", verdict: "Do not rely on visual inspection alone - access to the full tube length is usually limited. Run the supply-versus-ambient CO comparison before clearing the exchanger." },
      ],
    },
  ],
  "s-furnace-high-temp-rise": [
    {
      ask: "Check the air side first - filter, registers, and blower wheel.",
      options: [
        { label: "Filter dirty, or supply/return registers closed or blocked", verdict: "Airflow restriction is the most common cause by far. Clear it and recheck the rise." },
        { label: "Blower wheel is caked with dirt", verdict: "The wheel is not delivering rated CFM even at the correct speed. Clean it and recheck." },
        { label: "Air side is clean and open", next: 1 },
      ],
    },
    {
      ask: "Now check the blower setting and the firing rate.",
      options: [
        { label: "Blower speed tap is set low for this equipment and duct static", verdict: "Set the tap correctly for the installed equipment and static, then recheck the rise." },
        { label: "Gas input rate is above spec (overfiring)", verdict: "Overfiring relative to the blower's airflow capacity drives the rise up. Set the input to spec." },
      ],
    },
  ],
  "s-furnace-horizontal-secondary-drain-pan": [
    {
      ask: "Look under the horizontal unit for secondary protection and check it against the code/manufacturer requirement for this location.",
      options: [
        { label: "No secondary drain pan under the unit at all", verdict: "Horizontal units above finished space, especially in attics, generally require a secondary pan under the entire unit independent of the primary drain. Flag it to the customer as a recommended upgrade even if it was not part of the original call." },
        { label: "Pan present but no float switch in it", verdict: "A secondary pan without a functioning float switch only delays damage, it does not prevent it. Add a float switch in the secondary pan wired to shut the system down on water detection." },
        { label: "Pan and float switch both present", next: 1 },
      ],
    },
    {
      ask: "Trace the secondary pan's drain line and check the primary drain's routing.",
      options: [
        { label: "Secondary line ties back into the primary drain", verdict: "It needs its own independent line routed to a conspicuous discharge point so a stoppage is visible to the homeowner rather than silently backing up. Re-route it." },
        { label: "Pan only sits partly under the unit and coil", verdict: "The pan has to cover the full footprint of the unit and coil. Resize or reposition it." },
        { label: "Both drains independent and the pan is correctly sized and positioned", verdict: "Check the primary drain's slope and trap in the horizontal position - long runs to an exterior wall or existing drain are especially prone to inadequate slope." },
      ],
    },
  ],
  "s-furnace-hsi-glows-dim-weak": [
    {
      ask: "Measure igniter resistance cold and compare it to the manufacturer's spec.",
      options: [
        { label: "Resistance has drifted upward, above spec", verdict: "Aged element - higher resistance drops current and dims the glow. Replace the igniter." },
        { label: "Resistance is within spec", next: 1 },
      ],
    },
    {
      ask: "Measure incoming voltage to the igniter circuit during the actual trial for ignition, not at idle.",
      options: [
        { label: "Voltage sags during the trial", verdict: "Points at a marginal transformer or a long/undersized wiring run under the igniter's load, or a failing board relay/triac limiting current - not the igniter itself." },
        { label: "Voltage holds up through the trial", verdict: "With power off, inspect the element closely for hairline cracks - a partially cracked igniter still glows but never reaches full temperature, causing delayed or missed ignition." },
      ],
    },
  ],
  "s-furnace-igniter-glows-no-ignition": [
    {
      ask: "Watch the sequence and meter the gas valve. Does it get 24V at the end of igniter warm-up?",
      options: [
        { label: "No 24V at the valve", verdict: "The board never energized the valve, so the problem is in the sequence or the board rather than the valve or igniter." },
        { label: "24V present, valve clicks, still no flame", next: 1 },
        { label: "24V present but no click from the valve", verdict: "Suspect a failed gas valve solenoid even though the igniter checks out fine." },
      ],
    },
    {
      ask: "Check gas availability and pressures.",
      options: [
        { label: "Manual shutoff closed, or other gas appliances are out too", verdict: "No gas available. Restore supply before chasing the furnace." },
        { label: "Inlet or manifold pressure is well off the rating plate", verdict: "Pressure far outside spec prevents reliable ignition even with a good ignition source. Correct it." },
        { label: "Gas and pressures both check out", verdict: "Verify the igniter is physically positioned correctly relative to the burner - a shifted or bent igniter can glow without being in the gas stream. If it is positioned right, suspect a failed gas valve solenoid." },
      ],
    },
  ],
  "s-furnace-igniter-wont-glow": [
    {
      ask: "Meter for 115VAC at the igniter connector during the trial-for-ignition window.",
      options: [
        { label: "No 115VAC at the connector", verdict: "Problem is upstream of the igniter - the control board or igniter relay." },
        { label: "115VAC present but the igniter never glows", next: 1 },
      ],
    },
    {
      ask: "Let it cool, pull the igniter, and check resistance and condition.",
      options: [
        { label: "Open circuit, no continuity", verdict: "Igniter has failed. Replace it with the correct part number - igniters are not universal and pull different current." },
        { label: "Reads roughly 40-90 ohms cold but there is a visible crack", verdict: "Even a hairline crack can open the circuit once hot. Replace it, and never touch the element with bare fingers." },
        { label: "Reads in range and looks intact", verdict: "Check the igniter connector and pins for corrosion or a loose crimp." },
      ],
    },
  ],
  "s-furnace-inducer-runs-no-heat": [
    {
      ask: "Meter the pressure switch during a call. Does it close within a few seconds of the inducer starting?",
      options: [
        { label: "Switch never closes", next: 1 },
        { label: "Switch closes and holds", verdict: "The pressure switch is not what is holding the sequence at the inducer-only stage. Recheck the rest of the sequence from that point." },
      ],
    },
    {
      ask: "Find out why it is not making. Check the tubing, the inducer, and the venting.",
      options: [
        { label: "Pressure switch tubing is blocked, kinked, or disconnected", verdict: "Correct the tubing and retest." },
        { label: "Vent or combustion air intake is blocked - nest, ice, or snow", verdict: "Clear the blockage. The inducer cannot generate proper vacuum through it." },
        { label: "Inducer speed or amp draw is off spec", verdict: "A weak inducer can run and still not pull enough vacuum to close the switch. Replace it." },
        { label: "Tubing, vent, and inducer all check out", verdict: "Test the switch itself with an ohmmeter and by applying vacuum directly to rule out a failed switch." },
      ],
    },
  ],
  "s-furnace-inducer-wont-start": [
    {
      ask: "Meter for 115VAC at the inducer motor connector during a call for heat.",
      options: [
        { label: "115VAC present but the motor does not run", verdict: "Check inducer motor winding resistance and confirm the wheel is not seized. The motor is the suspect." },
        { label: "No 115VAC at the inducer", next: 1 },
      ],
    },
    {
      ask: "Check the board and everything wired ahead of the inducer output.",
      options: [
        { label: "No status LED and no 24V at the board", verdict: "The board is not powered. Work back to the power supply feeding it." },
        { label: "Board is powered but never energizes the inducer", verdict: "Check the control board relay/triac output and the safety switches wired in series ahead of it - limit, rollout, and door switch." },
        { label: "Blower door is not fully depressing the door interlock switch", verdict: "Common, easy-to-miss no-start cause. Correct the door and switch engagement." },
      ],
    },
  ],
  "s-furnace-ipi-spark-sense-combo-electrode": [
    {
      ask: "Confirm IPI first - pilot lights only on a call for heat and shuts off with the main burners - then let it run a full trial for ignition. What happens?",
      options: [
        { label: "Pilot sparks and lights, but the module never releases gas to the main burners", next: 1 },
        { label: "Pilot sparks but never lights", verdict: "Look at the pilot burner orifice and the electrode gap to the pilot hood/ground - sparking needs proper gap, and a lazy or unstable pilot will also give you a marginal sense signal later." },
      ],
    },
    {
      ask: "Read the microamp flame signal from the same electrode that just sparked, and inspect the electrode itself.",
      options: [
        { label: "Carbon or oxide buildup on the electrode tip", verdict: "The single most common IPI complaint - the same rod has to spark cleanly and then rectify a weak pilot flame. Clean or replace the electrode." },
        { label: "Tip is clean but sits near the flame rather than inside it", verdict: "Sensing requires the tip in the flame, not just near it. Reposition it while keeping proper spark gap to the pilot hood/ground." },
        { label: "Electrode clean and in the flame, but the pilot flame is lazy or unstable", verdict: "An unstable pilot gives a marginal sense signal even with a clean electrode. Check the pilot burner orifice." },
        { label: "Steady flame signal present and the module still locks out", verdict: "Verify the module's lockout/retry count first so a normal retry sequence is not being read as a fault, then look at the module." },
      ],
    },
  ],
  "s-furnace-limit-trips-cold-weather": [
    {
      ask: "On a cold day with the unit running, measure actual temperature rise and compare to the range on the rating plate.",
      options: [
        { label: "Rise is at or above the top of the rated range", next: 1 },
        { label: "Rise is inside the rated range and it still trips the limit", verdict: "If the limit itself opens below its rated set point it is out of calibration. Verify with a temperature probe before condemning it, then replace it." },
      ],
    },
    {
      ask: "Rise is running high - check the air side and the equipment match.",
      options: [
        { label: "Blower speed tap is set low for the installed firing rate", verdict: "That gets worse as return air gets colder and denser, which is why it only shows up on extreme days. Raise the tap to suit the firing rate." },
        { label: "Filter or duct static is restrictive under real running conditions", verdict: "Check static under load, not at idle - some restrictions only show up as airflow demand increases." },
        { label: "Airflow checks out under load", verdict: "Consider whether the equipment is correctly sized and matched to the home's actual heat loss at design-day conditions." },
      ],
    },
  ],
  "s-furnace-line-voltage-door-switch": [
    {
      ask: "With the door interlock switch engaged and the junction box cover off, measure voltage across the hot and neutral connections.",
      options: [
        { label: "No reading at all", verdict: "That points to open wiring, an open fuse, no power, or a faulty door interlock switch between the unit and the fused disconnect. Work back toward the disconnect." },
        { label: "Voltage present", next: 1 },
      ],
    },
    {
      ask: "Jumper R to G at the integrated ignition control to run the blower and load the circuit, then re-read the voltage.",
      options: [
        { label: "Holds 115 volts plus or minus 10 percent with the blower running", verdict: "The supply holds up under load. Incoming power is not your problem." },
        { label: "Sags below the minimum once the blower starts", next: 2 },
      ],
    },
    {
      ask: "Check the line wire size feeding the furnace.",
      options: [
        { label: "Undersized wire on a long run", verdict: "That is the voltage drop. Correct the wire size for the run length." },
        { label: "Wire size is adequate for the run", verdict: "Report the low supply voltage condition to the local power company." },
      ],
    },
  ],
  "s-furnace-low-temp-rise": [
    {
      ask: "Clock the gas meter or check manifold pressure, and compare actual rise against the range on the rating plate.",
      options: [
        { label: "Gas input rate reads below spec", verdict: "Input is set too low. Correct the firing rate and recheck the rise." },
        { label: "Input is at spec", next: 1 },
      ],
    },
    {
      ask: "Check the air side and how the measurement was taken.",
      options: [
        { label: "Blower speed/CFM is set higher than this firing rate needs", verdict: "Airflow too high for the firing rate is the most common cause. Drop the blower speed tap and recheck." },
        { label: "Burner or heat exchanger is dirty and restricted", verdict: "Reduced heat transfer pulls the rise down. Clean it up and recheck." },
        { label: "Probes were taken right at the equipment", verdict: "Retake supply and return far enough from the equipment to avoid duct radiant effects, and compare against the rating plate range rather than a generic number." },
      ],
    },
  ],
  "s-furnace-lp-ng-conversion-errors": [
    {
      ask: "Inspect flame appearance and check manifold pressure against the correct spec for the fuel actually being supplied.",
      options: [
        { label: "Aggressive, noisy flames with manifold pressure high for the fuel in use", verdict: "Looks like a natural gas orifice left in an LP system - overfiring. Verify every conversion component: burner orifices, valve regulator spring/cap, and pilot orifice if equipped." },
        { label: "Small, weak flames with manifold pressure low for the fuel in use", verdict: "Looks like an LP orifice left in a natural gas system - underfiring. Check the same list: orifices, regulator spring/cap, and pilot orifice." },
        { label: "Flames look right and manifold pressure is on spec for the fuel in use", next: 1 },
      ],
    },
    {
      ask: "Check the rest of the conversion - documentation, valve rating, and the supply side.",
      options: [
        { label: "No conversion sticker or rating plate note documenting the change", verdict: "Undocumented conversions cannot be trusted at face value. Verify each component against the kit's requirements before firing - never fire on an incomplete conversion to see what happens." },
        { label: "Gas valve itself is not rated or convertible for the fuel in use", verdict: "Some valves require a specific regulator conversion kit rather than just a spring change. Convert or replace the valve properly before restoring gas." },
        { label: "Furnace side fully converted and documented, still misbehaving on LP", verdict: "Check the LP tank regulator sizing and setting - a correct furnace-side conversion still misbehaves if the tank regulator delivers the wrong pressure." },
      ],
    },
  ],
  "s-furnace-millivolt-thermostat-circuit-undervoltage": [
    {
      ask: "Confirm it is a true millivolt system - no 24V transformer - then measure thermopile output under load with a call for heat active.",
      options: [
        { label: "Output is weak under load even though the pilot lights fine", verdict: "That is your unresponsive or erratic thermostat and chattering relay - a millivolt stat needs adequate voltage to hold its internal relay in. Address the thermopile before suspecting the thermostat." },
        { label: "Thermopile output holds up under load", next: 1 },
      ],
    },
    {
      ask: "Measure voltage right at the thermostat terminals with a call active and look at the wire run.",
      options: [
        { label: "Voltage is noticeably lower at the stat than at the valve", verdict: "Millivolt circuits have very little margin - excessive thermostat wire length or undersized wire eats it. Correct the run, and clean and inspect every connection in the millivolt path, since corrosion that would be negligible on 24V matters here." },
        { label: "Voltage at the stat matches the source and the stat still will not work", verdict: "Confirm the thermostat is rated for millivolt operation - a standard 24V thermostat will not work correctly on this circuit." },
      ],
    },
  ],
  "s-furnace-negative-pressure-starving-combustion-air": [
    {
      ask: "Identify every exhaust device that can run with the furnace, then test draft/spillage with them off and again with them running.",
      options: [
        { label: "Vents cleanly with everything off, but spills or loses draft only when exhaust devices run", verdict: "Confirms a house-pressure issue rather than a furnace or venting defect. Make-up air is usually the fix - a dedicated duct or interlocked damper - not something correctable at the furnace." },
        { label: "Spills either way, exhausts running or not", verdict: "Rule out the simpler causes first - undersized vent, blocked chimney - before concluding whole-house depressurization, since both produce similar spillage symptoms." },
        { label: "No spillage under either condition", verdict: "No CO concern found under worst-case exhaust. If the complaint persists, use a manometer to check house or room pressure relative to outdoors under worst-case exhaust conditions." },
      ],
    },
  ],
  "s-furnace-orifice-altitude-derate": [
    {
      ask: "Check the rating plate and installation manual for the altitude derate requirement, then see how this installation was actually set up.",
      options: [
        { label: "Original low-elevation orifices still in place, no derate performed", verdict: "The furnace is overfiring for the elevation - expect sooting, yellow flame tips, elevated CO, or high temperature rise. Field conversion parts are needed; do not assume the derate was handled at manufacture." },
        { label: "High-altitude orifices installed but manifold pressure left at the low-elevation spec", verdict: "Orifice size and manifold pressure have to match. A correct high-altitude orifice with the wrong pressure still produces incorrect input - reset pressure to the derated spec." },
        { label: "Orifices, regulator spring, and any high-altitude dip switch or board setting all match the manual", verdict: "The derate looks correct. Clock the meter and compare actual input against the furnace's derated input rating, not the nameplate low-elevation rating, to confirm." },
      ],
    },
  ],
  "s-furnace-orphaned-water-heater-venting": [
    {
      ask: "Smoke-pencil the water heater's draft hood at startup and through the first few minutes of operation.",
      options: [
        { label: "Spillage on startup, or intermittent spillage in the first few minutes", next: 1 },
        { label: "Drafts cleanly from startup on", verdict: "No spillage found. Still check vent connector length and liner size against the water heater's Btu input if this flue was originally shared with a furnace that has since been converted." },
      ],
    },
    {
      ask: "Find out what happened to the shared vent when the furnace was converted.",
      options: [
        { label: "Furnace went to a high-efficiency unit with its own plastic vent, leaving the water heater alone in the old chimney or B-vent", verdict: "Classic orphaned water heater - the oversized flue cannot maintain adequate draft velocity for the water heater alone. Recommend relining or resizing for the smaller load, or converting the water heater to power-vent or electric. Flag it as a real safety issue even though it was not the original complaint." },
        { label: "Vent connector is excessively long or the liner is oversized for the water heater's input", verdict: "Same result. Resizing the connector or liner for the water heater's load is the standard correction - do not leave it on an oversized flue." },
        { label: "Furnace is venting correctly through its own dedicated system", verdict: "This is not a furnace-side issue at all. Keep the furnace out of it and raise the water heater venting with the customer as its own item." },
      ],
    },
  ],
  "s-furnace-pilot-wont-stay-lit": [
    {
      ask: "Light the pilot and look at the flame itself.",
      options: [
        { label: "Flame is small, weak, or being blown around", verdict: "Get the pilot flame stable and properly sized first. Check for a draft from a nearby door, window, or unsealed cabinet, and confirm the thermocouple sits in the hottest part of the flame." },
        { label: "Flame looks stable and correctly shaped", next: 1 },
      ],
    },
    {
      ask: "Meter the thermocouple/thermopile millivolt output against spec and check its connection at the gas valve.",
      options: [
        { label: "Connection at the gas valve is loose", verdict: "A loose connection reads as insufficient millivolt output. Tighten it and retest." },
        { label: "Millivolt output is low with a good flame and a clean thermocouple", verdict: "Replace the thermocouple/thermopile." },
        { label: "Millivolt output is at spec", verdict: "Clean the thermocouple and recheck its flame impingement position before replacing anything." },
      ],
    },
  ],
  "s-furnace-primary-air-adjustment-issues": [
    {
      ask: "With gas pressure already confirmed in spec, watch the burner flames with the burner compartment door in place. What do they look like?",
      options: [
        { label: "Soft, yellow-tipped, lazy flames", verdict: "Too little primary air - incomplete combustion with a sooting risk. Open the shutters incrementally with the door on and burners firing, then confirm flame supervision still reads correctly." },
        { label: "Flames lifting off the burner ports, burning too fast, or blowing out at ignition", verdict: "Too much primary air. Close the shutters incrementally with the door in place, then recheck flame supervision." },
        { label: "One burner looks different from its neighbors", verdict: "Shutters are not set consistently across the bank - a common comfort or soot complaint after burner service. Also confirm that shutter is not simply loose and vibrated out of position." },
        { label: "Gas pressure has not been verified yet", verdict: "Verify gas pressure first. Chasing flame appearance with air shutters while pressure is out of spec treats the wrong variable." },
      ],
    },
  ],
  "s-furnace-pvc-cpvc-vent-material-mismatch": [
    {
      ask: "Look up the approved vent materials for this exact furnace model, then read the markings on the pipe that is actually installed.",
      options: [
        { label: "Manual requires CPVC or a manufacturer stainless system, but PVC is installed", verdict: "A real defect. It usually is not an immediate failure but long-term softening and deformation from sustained higher flue gas temperature, which can lead to joint failure or sagging. Weigh full vent replacement against the furnace's remaining service life when advising the customer." },
        { label: "Mixed installation - a PVC transition on an otherwise CPVC-required system", verdict: "Same problem at that transition. Identify every section by its markings and replace the wrong material." },
        { label: "CPVC throughout, but the joints were made with PVC cement", verdict: "CPVC requires CPVC-rated cement - the wrong cement compromises the joint even when the pipe material is correct. Those joints have to be redone." },
        { label: "Manufacturer-specific stainless vent system installed", verdict: "These rely on proper seating and clamping rather than solvent welding. Verify gasket and seal condition at every mechanical joint." },
      ],
    },
  ],
  "s-furnace-quits-on-windy-days": [
    {
      ask: "Go outside and look at the terminations - which way they face, distance from inside corners, overhangs, soffits and adjacent walls, and the exhaust-to-intake relationship - and compare against the venting section of that furnace's installation manual. What do you see?",
      options: [
        { label: "Terminations outside the manual's clearances, or on a wind-loaded wall", verdict: "Relocating or re-terminating per the manual is the repair - not a different pressure switch." },
        { label: "Soot, staining, corrosion, or ice buildup on the intake", verdict: "That is recirculation - exhaust is being pulled back in. Check the required exhaust-above-intake relationship and separation for that model." },
        { label: "A field-fabricated elbow or a missing termination kit", verdict: "The correct manufacturer-supplied fittings change how the vent behaves in wind - install the proper termination kit." },
        { label: "Atmospheric or Category I furnace on a chimney", verdict: "Check the chimney cap and the termination height above the roofline, and look for spillage at the draft hood while the unit runs." },
      ],
    },
  ],
  "s-furnace-sealed-combustion-intake-blocked": [
    {
      ask: "Confirm this is a two-pipe or concentric sealed combustion system and verify per the install manual which pipe is intake and which is exhaust, then inspect BOTH terminations.",
      options: [
        { label: "Intake termination blocked by snow, ice, leaves, insect nest, or a clogged bird guard", verdict: "Very common seasonal complaint. Clear it and recheck - a blocked intake produces different symptoms than a blocked exhaust." },
        { label: "Exhaust termination blocked, intake clear", verdict: "Work the exhaust-side restriction. On models that monitor intake and exhaust pressure separately, the faults look identical without inspecting both pipes." },
        { label: "Both terminations clear", next: 1 },
      ],
    },
    {
      ask: "Check the intake piping run and how the two terminations sit relative to each other.",
      options: [
        { label: "Intake piping has a sagging low point that has collected water or debris", verdict: "That restricts airflow without any obvious external blockage. Re-support the run to remove the low point." },
        { label: "Terminations do not maintain required separation, or exhaust is being partly drawn into the intake", verdict: "Recirculation causes a slow performance decline rather than a hard fault. Correct the termination spacing per the install manual." },
        { label: "Piping and termination separation both correct", verdict: "Intake restriction is not your cause - move to the pressure switch and control side." },
      ],
    },
  ],
  "s-furnace-secondary-air-restriction": [
    {
      ask: "Watch the whole burner bank through a full run cycle and note the pattern.",
      options: [
        { label: "All burners affected evenly, and it gets worse the longer the furnace runs", next: 1 },
        { label: "Only one or a few burners look wrong", verdict: "That pattern points at primary air shutter settings on those burners rather than a compartment air restriction." },
      ],
    },
    {
      ask: "Look at where the burner compartment actually gets its air.",
      options: [
        { label: "Lint, dust, or debris blocking the compartment air intake openings", verdict: "Common in furnaces near laundry areas or dusty mechanical spaces. Clean it out, then confirm flame appearance and CO readings improve rather than assuming the burners need service." },
        { label: "Combustion air louvers or door gaps sealed or blocked by weatherization, insulation, or stored items", verdict: "Restore the intended airflow openings. The burners themselves are probably fine." },
        { label: "A door or panel that is not seated correctly", verdict: "It can restrict the intended airflow path or create an unintended draft that disturbs the burner flames. Seat it properly and recheck." },
        { label: "Compartment is clear but the furnace sits in a confined mechanical closet", verdict: "This is likely a room-level combustion air problem, not a furnace defect. Run the confined-space combustion air check on the closet." },
      ],
    },
  ],
  "s-furnace-thermocouple-vs-thermopile-diagnosis": [
    {
      ask: "Look at the pilot bracket and the lead running to the gas valve. What is there?",
      options: [
        { label: "A single small copper lead with one connection at the valve marked TC or PILOT", verdict: "Thermocouple. It only holds the pilot safety valve open and powers nothing else. Test open-circuit millivolts with the pilot lit and compare to the valve manufacturer's minimum hold-in spec." },
        { label: "A larger lead, sometimes two wires, often with a ceramic-insulated tip", next: 1 },
      ],
    },
    {
      ask: "On the thermopile, test both open-circuit voltage and voltage under load (in-circuit).",
      options: [
        { label: "Reads fine open-circuit but sags badly once it has to drive the load", verdict: "Classic weak thermopile - it can light the pilot fine and still fail to run the valve operator or the millivolt thermostat circuit. Swap in a known-good thermopile before condemning the valve." },
        { label: "Output is low both open-circuit and under load", verdict: "Check that the pilot flame envelops the full length of the sensing tip, and inspect the connection at the gas valve for corrosion or a loose fit - millivolt circuits are very sensitive to connection resistance." },
        { label: "Both readings are good", verdict: "The thermopile is not your problem. Look at the connections in the millivolt path and then the valve itself." },
      ],
    },
  ],
  "s-furnace-transformer-overload-undersized": [
    {
      ask: "Measure the transformer's output voltage with the highest-draw combination of accessories energized at once, not just at idle.",
      options: [
        { label: "Voltage looks normal at idle but sags with everything energized", verdict: "That is the real-world overload symptom. Add up the VA of the furnace board and relays, zone panel and dampers, humidifier, thermostat, and any add-ons, and compare against the transformer's rated VA." },
        { label: "Voltage holds up under the worst-case combination", next: 1 },
      ],
    },
    {
      ask: "Check the physical signs and how the accessories are actually fed.",
      options: [
        { label: "Transformer runs warm or hot to the touch in normal operation, or the board's low-voltage fuse blows on specific accessory combinations", verdict: "Signs of overload even if the sag was not caught. Upsize to a transformer matching total connected load with margin rather than replacing with an identical part number." },
        { label: "A separate add-on transformer was installed for zoning or an accessory", verdict: "A separate transformer needs its own correctly rated fuse and dedicated wiring, not a tap off the furnace circuit. Verify how it is fed." },
        { label: "No heat, no blown fuses, and voltage holds steady", verdict: "Transformer capacity is not your problem - look elsewhere. If a transformer is ever replaced here, recheck voltage under full accessory load, since a bigger transformer alone does not fix a wiring or grounding issue." },
      ],
    },
  ],
  "s-furnace-two-stage-pressure-switch-tap-wrong": [
    {
      ask: "Check the wiring diagram inside the panel to see whether this furnace uses two switches or one dual-tap switch, then trace each hose to its tap on the inducer housing.",
      options: [
        { label: "Hoses are on the wrong taps compared to the diagram", verdict: "Swapped hoses let the furnace prove draft for the wrong firing rate, or fail to prove a rate that is actually fine - it looks exactly like a lockout on a specific stage. Correct the tap assignments." },
        { label: "Taps match the diagram", next: 1 },
      ],
    },
    {
      ask: "Watch both switches with a meter through a full two-stage cycle, not just at rest, and inspect the tubing on each independently.",
      options: [
        { label: "One switch does not close at its point in the sequence", verdict: "Inspect that switch's tubing separately for cracks, kinks, or condensate blockage - one can be fine while the other fails - then test the switch itself." },
        { label: "Both switches close at the correct points in the sequence", verdict: "Draft proving is fine at both firing rates. The staging fault is elsewhere - look at the valve and the board." },
      ],
    },
  ],
  "s-furnace-two-stage-valve-stuck-high-fire": [
    {
      ask: "Put a manifold pressure gauge on and run the system. Does pressure actually change between low-fire and high-fire calls?",
      options: [
        { label: "Pressure changes correctly between low and high", next: 1 },
        { label: "Pressure never changes regardless of the signal", verdict: "Stuck internal stepper or solenoid mechanism. That is a valve failure, not a field adjustment - replace the valve." },
        { label: "Furnace starts in high fire briefly then steps down early in the cycle", verdict: "Some control boards start every cycle in high fire before stepping down by design. That is normal staging, not a stuck valve." },
      ],
    },
    {
      ask: "With pressure proven to change, verify the stage-1 call is actually stage-1 only.",
      options: [
        { label: "Thermostat is wired or configured to call both stages simultaneously", verdict: "It will never show low-fire-only operation, which mimics a stuck valve. Correct the stat wiring or configuration first." },
        { label: "Stat calls stage 1 only, but the high-fire solenoid stays energized", verdict: "Check the low-fire solenoid/coil for continuity and correct voltage during that call, and look for a wiring or jumper error bridging the low-fire path to always energize high fire - common after a board replacement." },
      ],
    },
  ],
  "s-furnace-two-stage-wont-highfire": [
    {
      ask: "With the house well below setpoint, check for a W2 call arriving at the furnace control board.",
      options: [
        { label: "No W2 call at the board", next: 1 },
        { label: "W2 present at the board and it still stays on low fire", next: 2 },
      ],
    },
    {
      ask: "Check the thermostat side.",
      options: [
        { label: "Thermostat is single-stage or not configured for two stages", verdict: "A single-stage thermostat wired to a two-stage furnace will never call for high fire. Reconfigure or replace it." },
        { label: "Thermostat is two-stage but W2 never gets to the board", verdict: "Check the W2 wiring and its terminal at the furnace control board." },
      ],
    },
    {
      ask: "Check the board's staging setup.",
      options: [
        { label: "Staging delay is set to hold low fire for a fixed time", verdict: "Some boards hold low fire for a set time before allowing a step up even with a call present. Adjust the staging delay." },
        { label: "A low-fire-only dip switch or jumper is set", verdict: "Left over from a prior service call or the install. Clear it and retest." },
        { label: "Staging settings look correct", verdict: "Suspect the control board's staging relay/output." },
      ],
    },
  ],
  "s-furnace-venting-category-mismatch": [
    {
      ask: "Get the furnace's vent category from its rating plate or manual, then compare it against the vent material actually installed.",
      options: [
        { label: "Category IV (condensing, positive pressure) furnace vented through an old metal B-vent or masonry chimney", verdict: "Serious defect - Category IV requires plastic pipe rated for condensate exposure and positive pressure, not repurposed venting. Treat this as a full venting re-evaluation, not a code technicality." },
        { label: "Category I furnace on traditional type B metal vent", verdict: "Material matches the category. Check termination clearances and vent condition as normal." },
        { label: "Positive-pressure (Category III/IV) system with friction-fit or poorly glued plastic joints", verdict: "Positive-pressure joints must be solvent-welded per code - improper joints can leak flue gas under pressure. Redo the joints." },
        { label: "An old atmospheric furnace was replaced with a 90%+ unit and the venting was left as-is", verdict: "Not a like-for-like swap. The venting has to be re-evaluated in full for the new category, including termination clearances, which differ from atmospheric metal vents." },
      ],
    },
  ],
  "s-furnace-venting-condensation-issues": [
    {
      ask: "Sight along the PVC vent and intake runs and check the slope.",
      options: [
        { label: "Vent slopes away from the furnace, or a horizontal run has sagged", verdict: "Condensing furnace venting has to slope back toward the furnace or a low-point drain. Reversed or lost slope traps condensate and causes gurgling, blockage, and pressure switch faults - re-support it per the install manual." },
        { label: "Slope is correct back toward the furnace", next: 1 },
      ],
    },
    {
      ask: "Check the condensate trap and the vent terminations.",
      options: [
        { label: "Condensate trap is partially clogged", verdict: "A partly clogged trap still passes some condensate while causing intermittent pressure switch nuisance trips. Clean it." },
        { label: "Terminations are spaced wrong from each other or from windows/soffits", verdict: "Correct the termination spacing per code and the manufacturer's requirements." },
        { label: "Ice built up at the vent termination", verdict: "Ice at the termination restricts flow on very cold days. Clear it and address why it is forming." },
      ],
    },
  ],
  "s-gas-valve-voltage-window-proves-flame": [
    {
      ask: "With the meter already on the gas valve terminals before the call, initiate heat and time how long 24 volts stays present. What happens?",
      options: [
        { label: "24 V appears and immediately drops with no flame at the burner", verdict: "Nothing lit. Look at the gas supply, the gas valve, and the ignitor position." },
        { label: "24 V appears, the burner lights, and voltage drops out at the end of the four or seven second window", verdict: "The control is not seeing flame current. Check the flame sensor, its gap to the burner, and the furnace ground." },
        { label: "Voltage never appears at the gas valve at all", verdict: "The control never completed its pre-ignition checks - back up to the pressure switch and ignitor circuits." },
        { label: "24 V comes on and holds past the window", verdict: "Proof of flame held. Confirm voltage is then provided to the circulating blower after the heat-on delay period." },
      ],
    },
  ],
  "s-gauges-high-head-high-suction": [
    {
      ask: "Confirm gauge readings against actual outdoor ambient and return air conditions, then read superheat. What do you have?",
      options: [
        { label: "Both pressures high and superheat is low", verdict: "Lean toward overcharge. Compare against the manufacturer's charge chart and subcooling target and recover to spec." },
        { label: "Both pressures high with normal-to-high superheat", next: 1 },
        { label: "Readings track a hot, humid day with a high return air load", verdict: "Both pressures naturally run higher under those conditions. Confirm against actual conditions before calling it a fault." },
      ],
    },
    {
      ask: "Work the condenser side and recent service history.",
      options: [
        { label: "Coil dirty, discharge air recirculating, or clearance around the unit blocked", verdict: "Condenser airflow restriction raises head pressure with suction riding along. Clean and clear it, then recheck." },
        { label: "Condenser fan is weak or not running", verdict: "Rule out a bad condenser fan capacitor or motor before condemning the coil as simply dirty." },
        { label: "Coil and fan fine, but the system was opened without a proper deep vacuum", verdict: "Suspect non-condensables (air/moisture). Head pressure reads abnormally high relative to outdoor temp on the P/T chart in that case." },
      ],
    },
  ],
  "s-gauges-high-head-low-suction": [
    {
      ask: "Feel or measure the temperature going into and out of the liquid line filter drier.",
      options: [
        { label: "Noticeable temperature drop across it, or a frost/sweat spot on the drier body", verdict: "The drier is restricted - replace it. Recheck subcooling and superheat afterward and do not add refrigerant to compensate for a restriction." },
        { label: "Same temperature in and out", next: 1 },
      ],
    },
    {
      ask: "Work down the liquid line toward the metering device.",
      options: [
        { label: "Line is kinked, crushed, or undersized", verdict: "That is your restriction. Repair or resize the liquid line." },
        { label: "Liquid line service valve is only cracked open, not fully open", verdict: "Open it fully - a partially closed service valve produces exactly this pattern." },
        { label: "Sharp temperature drop right at the metering device", verdict: "Liquid line should be close to condensing temperature there, so the restriction is right at that point. Confirm before opening anything." },
        { label: "Line and valves all check out", verdict: "Check a liquid line solenoid valve (if equipped) for being stuck partially closed, then recheck subcooling and superheat against spec before closing the call." },
      ],
    },
  ],
  "s-gauges-low-head-high-suction": [
    {
      ask: "Clamp the compressor amps while it runs. How do they compare to the RLA on the nameplate?",
      options: [
        { label: "Amps read low against RLA even with the load on it", verdict: "Points at worn or leaking internal compressor valves - it cannot build head pressure even with suction up. Confirm with sound before condemning; this is a compressor replacement, not a charge or airflow fix." },
        { label: "Amps read normal against RLA", next: 1 },
      ],
    },
    {
      ask: "Feel all four reversing valve line temperatures (heat pump) and check the metering device.",
      options: [
        { label: "Reversing valve is not fully shifting or hot gas is leaking across it", verdict: "Internal bypass in the reversing valve produces exactly this pattern. Replace the valve." },
        { label: "Reversing valve checks out, or this is not a heat pump", verdict: "Check the metering device (TXV/EEV) for a stuck-open or overfeeding condition - see the TXV testing entry for the bulb response test." },
        { label: "Metering device responds correctly to the bulb test", verdict: "Rule out an oversized or wrong orifice/TXV for the system's tonnage." },
      ],
    },
  ],
  "s-gauges-low-head-low-suction": [
    {
      ask: "Check the evaporator coil and filter first. What do you find?",
      options: [
        { label: "Dirty filter, iced-over coil, or the indoor blower is not running", verdict: "The system is starved of load, which drops both pressures together. This is more common in the field than an actual leak - fix the airflow and recheck." },
        { label: "Airflow checks out fine", next: 1 },
      ],
    },
    {
      ask: "Check subcooling and superheat against the charge chart, and note how far down suction actually pulls.",
      options: [
        { label: "Both readings off in the undercharge direction against the chart", verdict: "Suspect undercharge. Leak search before adding any refrigerant." },
        { label: "Suction pulls down near or into a vacuum", verdict: "That is well below what a simple undercharge produces. Suspect a mostly or fully plugged metering device - clogged TXV screen, kinked cap tube, or an orifice iced shut from moisture." },
        { label: "Readings are only modestly low and it is a cool day out", verdict: "Confirm outdoor ambient is not simply cold enough on its own to explain lower-than-summer pressures before chasing a fault." },
      ],
    },
  ],
  "s-goodman-avzc18-ds1-bus-bias-check": [
    {
      ask: "With the system powered and the bus DS1 dip switches ON at the outdoor control, measure Data 1 and Data 2. What do you read?",
      options: [
        { label: "About 2.8 VDC on Data 1 and 2.2 VDC on Data 2, a difference of about 0.6 VDC", verdict: "Bias is correct. The bus side is good, so move on to reading the communications LEDs rather than replacing the board." },
        { label: "The difference between Data 1 and Data 2 is not about 0.6 VDC", verdict: "Turn OFF the DS1 switches for Data 1 and Data 2, reset power, and check again for 0.6 VDC." },
        { label: "No reading at all on either line", verdict: "Check circuit breakers and fuses to the outdoor unit and inspect the data 1 and data 2 wires before replacing anything." },
      ],
    },
    {
      ask: "Read the red communications LED at the outdoor control. What is it doing?",
      options: [
        { label: "LED is off", verdict: "Off is nominal on this control. Use the green receive LED to confirm network traffic." },
        { label: "1 flash", verdict: "Communications failure from an unknown packet. Depress the learn button." },
        { label: "2 flashes", verdict: "Out-of-box reset. Press the LEARN button about 5 seconds to reset the network, and use the green receive LED to confirm traffic." },
        { label: "No LED at all", verdict: "No power or a communications error. Check circuit breakers and fuses to the outdoor unit and inspect the data 1 and data 2 wires before replacing anything." },
      ],
    },
  ],
  "s-goodman-control-on-display-power-proof": [
    {
      ask: "Look at the dual 7-segment display with the furnace powered and idle.",
      options: [
        { label: "Steady 'ON'", next: 1 },
        { label: "Display is dark", next: 2 },
      ],
    },
    {
      ask: "Give the control a call for heat and wait five seconds or until the furnace goes into lockout, then read the display.",
      options: [
        { label: "A diagnostic code is now shown", verdict: "Look it up in the Abnormal Operation section of the sequence of operation. The trial for ignition is only 4 seconds, so any live checks must land in that window." },
        { label: "It runs through and completes with no code", verdict: "Both 120V and 24V are present and the sequence completes. The complaint is elsewhere." },
      ],
    },
    {
      ask: "With a dark display, check the supply voltages at the control.",
      options: [
        { label: "No 120 volts from Line 1 (hot) to Line 2 (neutral)", verdict: "Check door switch connections and harness continuity." },
        { label: "120 volts present but no 24 volts from W1 to C on a heat call", verdict: "Check the transformer and its associated wiring." },
        { label: "Both voltages present and the display is still dark", verdict: "Do not attempt a board repair - this control is not field repairable and must be replaced as a unit." },
      ],
    },
  ],
  "s-goodman-ecm-16-pin-signal-walk": [
    {
      ask: "Disconnect the 5-pin connector from the motor and check for line voltage at terminals #4 and #5 at the power connector. What do you read?",
      options: [
        { label: "No voltage at #4 and #5", verdict: "Check the unit for incoming power and then check the control board - the motor is not being fed." },
        { label: "Line voltage present at #4 and #5", next: 1 },
      ],
    },
    {
      ask: "Reinsert the 5-pin, remove the 16-pin, and ohm from pins #1 and #3 (the common pins) to transformer neutral or the 'C' thermostat terminal. What do you get?",
      options: [
        { label: "No continuity from pins #1 and #3 to common", verdict: "An open low-voltage common makes the motor function erratically. Trace the common circuits and repair the open neutral." },
        { label: "Continuity good to common", next: 2 },
      ],
    },
    {
      ask: "Set the thermostat to 'Fan-On' and check for 24 volts between pin #15 (G) and common, then call for cooling and check pins #6 and/or #14. What do you find?",
      options: [
        { label: "24 volts at pin #15 on Fan-On and at #6 and/or #14 on the cooling call", verdict: "Line voltage and the 24 V commands are arriving. Check the heat call at pins #2 and/or #11 the same way before condemning the motor." },
        { label: "No 24 volts at pin #15 with the thermostat on Fan-On", verdict: "The 'G' signal is not reaching the 16-pin connector. Check for the 24 volt signal at the transformer and from the thermostat to the 'G' terminal." },
        { label: "24 volts at #15 but nothing at #6 and/or #14 on a cooling call", verdict: "The cooling command is not arriving at the connector. Work the thermostat call and wiring into the 16-pin connector rather than the motor." },
      ],
    },
  ],
  "s-goodman-flame-signal-microamp-measurement": [
    {
      ask: "With a micro-amp meter in series with the yellow flame sensor wire and the unit in a heating cycle, what does it read once flame is established?",
      options: [
        { label: "3 to 10 microamps", verdict: "That is the healthy range for these integrated ignition controls. Flame sense is not your problem." },
        { label: "1 to 3 microamps", verdict: "Low signal - the control flashes 1 amber light at this level. Check for high resistance wiring connections, the sensor-to-burner gap, a dirty flame sensor, and poor grounding." },
        { label: "Below 1 microamp", verdict: "The unit will shut down at this level. Work the same list - connections, sensor gap, dirty sensor, grounding - and clean the sensor with steel wool if a contamination coating is suspected." },
        { label: "Absolutely no reading at all", verdict: "Check continuity on all components in the sense circuit. If they are good, replace the ignition control module." },
      ],
    },
  ],
  "s-goodman-gaspack-lights-high-drops-to-low": [
    {
      ask: "On a W1-only call, watch the high stage gas valve after flame is detected.",
      options: [
        { label: "High stage valve drops out within five seconds of flame detection and the inducer goes to low speed", verdict: "That is the designed two-stage sequence - both valves fire the trial for ignition, then high stage drops for low fire. Not a failing gas valve." },
        { label: "High stage valve stays energized past five seconds and the inducer stays on high", verdict: "That is the real fault. The high stage valve should de-energize and the induced draft blower should switch to low speed within five seconds of flame detection." },
        { label: "Thermostat type is not set to two-stage on the control", verdict: "Set the thermostat type to two-stage before judging any staging behavior - nothing will read right until that matches." },
        { label: "Igniter stays energized after flame is detected", verdict: "The igniter should de-energize when flame is detected, which starts the flame stabilization period. Chase the flame sense side." },
      ],
    },
    {
      ask: "For a true high stage call, check W1 and W2 and watch whether the unit holds high fire.",
      options: [
        { label: "Both W1 and W2 present and the unit stays in high fire", verdict: "Correct behavior for a high stage call. Nothing to chase on the staging." },
        { label: "Both W1 and W2 present but the unit drops back to low", verdict: "Confirm the thermostat type is set to two-stage on the control - with W1 and W2 both present the unit should stay in high fire rather than dropping back." },
        { label: "On removal of W1 the inducer post purges at low speed and the blower holds low heat speed", verdict: "Expected shutdown behavior - post purge at low speed and the circulating blower holds low heat speed for the heat OFF delay before the control returns to standby." },
      ],
    },
  ],
  "s-goodman-gm9c96-no-high-fire-single-stage-stat": [
    {
      ask: "When the transition to second stage should happen, watch the inducer and the second stage pressure switch.",
      options: [
        { label: "No transition happens at all and the inducer never goes to high speed", verdict: "Check the installer menu selection for how second stage is reached with a single-stage thermostat - fixed time or auto mode. If it was never configured, the furnace may simply never transition." },
        { label: "Inducer goes to high speed but the second stage pressure switch never closes", verdict: "That closure is what energizes the high fire stage of the gas valve. Check the hose, tap, and switch." },
        { label: "High fire establishes but the blower stays on first stage heat speed", verdict: "The indoor blower should change to its second stage heat speed once high fire is established. Work the blower speed side." },
      ],
    },
    {
      ask: "If a two-stage thermostat is installed, check W2 during a second stage call.",
      options: [
        { label: "No 24 VAC on W2", verdict: "The second stage call is not arriving. Fix the thermostat side before working on the furnace." },
        { label: "24 VAC present on W2", verdict: "The call is good, so the fault is on the furnace side - inducer high speed and the second stage pressure switch." },
      ],
    },
    {
      ask: "If low fire is not right either, verify the low fire gates.",
      options: [
        { label: "No 24 VAC on W1, or no 24 VAC on Pin 8 of the 12-pin connector", verdict: "The call or the limit is not made. Both must be present before the control moves on." },
        { label: "Pin 5 reads 24 VAC before the inducer runs", verdict: "The pressure switch circuit must read open (0 VAC on Pin 5) before the inducer runs. Find the stuck switch or shorted hose or wiring." },
        { label: "Inducer runs and pre-purge starts once Pin 5 goes to 24 VAC", verdict: "Low fire is sequencing correctly - igniter, gas valve after warm-up, igniter off at flame sense, indoor blower 30 seconds later. Keep your work on the second stage transition." },
      ],
    },
  ],
  "s-goodman-gm9s80-powerup-standby-checks": [
    {
      ask: "Apply 115 VAC to the furnace and watch the integrated ignition control module. What does the LED do?",
      options: [
        { label: "LED never lights at all", verdict: "You never got past step one. Work back to line power, polarity, and the door interlock before touching the ignition sequence." },
        { label: "LED lights after the internal checks and stays on", next: 1 },
        { label: "LED lights but the control shows a stored fault instead of monitoring safeties", verdict: "Power, polarity, and interlock are good since the control woke up. Read and clear the stored fault before running the sequence." },
      ],
    },
    {
      ask: "With the LED lit, close R and W for a heat call. How far does the sequence get?",
      options: [
        { label: "Nothing moves - the induced draft blower never energizes", verdict: "The control runs its safety circuit checks before energizing the inducer. Prove the safety circuits are made before condemning the control." },
        { label: "Inducer runs but the burners never light", verdict: "The pressure switch contacts must close and the inducer hold through pre-purge, then ignitor warm-up and gas valve. Gas keeps flowing only if the control sees a flame signal in its proving window." },
        { label: "Burners light and run, but the customer complains about blower run time", verdict: "Blower comes on at heat speed after a fixed 30 second delay, and the off delay is selectable at 90, 120, 150, or 180 seconds. Confirm the selection before calling a long blower run a fault." },
      ],
    },
  ],
  "s-goodman-gpu14-manifold-leak-check": [
    {
      ask: "With the manometer connected to the White-Rodgers outlet tap, gas and power restored and R to W closed for a heat call, immediately check the outlet pressure tap screw with leak detection solution or soap suds. What do you see?",
      options: [
        { label: "Bubbles at the outlet pressure test screw", verdict: "Shut off the gas and repair before going any further. Do not take a pressure reading with the tap leaking." },
        { label: "No bubbles at the tap", next: 1 },
      ],
    },
    {
      ask: "Measure manifold pressure with the burners firing and compare it to the range specified for this unit and fuel (the manual lists 2.8 to 3.2 in. w.c. for natural gas on this model - confirm against the rating plate). What do you read?",
      options: [
        { label: "Within the specified range", verdict: "No adjustment needed. Turn off power and gas, remove the manometer hose, and turn the outlet pressure test screw back in to seal the port at 7 in-lb minimum, then re-leak-check under a live heat call." },
        { label: "Below the specified range", verdict: "Remove the regulator cover screw and turn the adjustment clockwise to increase, then replace the cover screw, reseal the tap, and re-leak-check under a live heat call." },
        { label: "Above the specified range", verdict: "Remove the regulator cover screw and turn the adjustment counterclockwise to decrease, then replace the cover screw, reseal the tap, and re-leak-check under a live heat call." },
      ],
    },
    {
      ask: "After resealing the outlet test screw, restore power and gas, call for heat again and retest the tap for leaks. What do you see?",
      options: [
        { label: "No bubbles at the resealed tap", verdict: "Sealed properly. Finish with a flame inspection and a combustion/CO check." },
        { label: "Bubbles at the resealed tap", verdict: "Shut off the gas and repair immediately. The outlet test screw is the leak point - do not leave it." },
      ],
    },
  ],
  "s-goodman-mbe-first-stage-heat-airflow": [
    {
      ask: "With a two-stage heat pump confirmed, place a Y1-only heating call and measure supply airflow or blower speed, then force a Y2 demand and measure again. What happens?",
      options: [
        { label: "About 60 percent of programmed high-speed heating CFM on Y1, full high-speed CFM on Y2", verdict: "That is by design on a two-stage heat pump with the MBE. Explain the weak-feeling airflow on mild days to the customer rather than chasing a fault." },
        { label: "Blower never increases when Y2 is forced", verdict: "Verify Y2 actually reaches Y/Y2 of the MBE before suspecting the motor." },
        { label: "Blower changes on Y2 but the high-speed value itself is wrong", verdict: "Verify the heating CFM selection on DIP switches 1 and 2 against the airflow table for the installed tonnage." },
      ],
    },
    {
      ask: "Watch the outdoor unit through the same test. What does it do?",
      options: [
        { label: "Compressor starts low stage with the outdoor fan on low on Y1, both go high on Y2, and both return to low when Y2 drops", verdict: "Outdoor staging matches the indoor blower behavior. The system is operating as designed." },
        { label: "Outdoor unit never shifts to high stage on Y2", verdict: "Confirm the VSTB supplies 24Vac to Y/Y2 at the heat pump - the staging signal is not getting outdoors." },
      ],
    },
  ],
  "s-goodman-mbe-heat-pump-aux-staging": [
    {
      ask: "With the electric strips running, check for 24Vac at Y at the heat pump. What do you find?",
      options: [
        { label: "Y is still energized while the strips run", verdict: "Normal. The heat pump keeps running with the strips - most digital thermostats hold the top stage energized until the first-stage demand is satisfied. Explain that to the customer." },
        { label: "Y is dead while the strips run", verdict: "The compressor is dropping out on the aux call. Verify the thermostat is staged for a heat pump with electric backup before chasing the air handler." },
      ],
    },
    {
      ask: "Step through the stages one at a time and note which one never energizes. What happens?",
      options: [
        { label: "First stage: no 24Vac at Y and the blower does not ramp to the DIP 1 and 2 speed", verdict: "The first-stage heat pump call is not landing. Verify voltage at that terminal before condemning the board." },
        { label: "Second stage: no 24Vac at E/W1 of the VSTB, HR1 never pulls in", verdict: "Verify voltage at E/W1 first. If 24Vac lands there, HR1 contacts M1 and M2 should close in 10 to 20 seconds for element 1 - if they do not, the sequencer is the failure." },
        { label: "Third stage: 24Vac lands at W/W2 but HR2 never energizes elements 3 and 4", verdict: "That stage requires the PJ4 jumper on the VSTB to be cut. Check PJ4 before condemning the sequencer or the board." },
        { label: "All stages energize in order", verdict: "Staging is correct. Confirm removing the second-stage call opens HR1 contacts 30 to 70 seconds later while the heat pump keeps running on Y." },
      ],
    },
  ],
  "s-goodman-mbe-pj4-jumper-heat-strips": [
    {
      ask: "Kill power, open the air handler, and count what is actually in the heater assembly. What is installed?",
      options: [
        { label: "More than two elements plus a second sequencer HR2", next: 1 },
        { label: "Only two elements and one sequencer", verdict: "There is no third and fourth element stage to configure. The capacity shortfall is not a PJ4 problem on this unit." },
      ],
    },
    {
      ask: "Look at the PJ4 jumper on the VSTB board. What do you find?",
      options: [
        { label: "PJ4 is still intact, not cut", verdict: "That is why elements 3 and 4 never come on - PJ4 must be cut for the higher heat stage. Understand the side effect first: with PJ4 cut the blower runs low speed on a W1-only demand and goes to high speed when the next stage calls. Cut it only if the application requires that stage." },
        { label: "PJ4 has already been cut", verdict: "Configuration is right, so chase the circuit. Force the higher stage call, confirm 24Vac reaches HR2 and elements 3 and 4 energize, and that HR2 contacts open 30 to 70 seconds after the call is removed." },
      ],
    },
    {
      ask: "On a W1-only heat call, does the VSTB supply 24Vac to sequencer HR1 and do contacts M1 and M2 close within 10 to 20 seconds?",
      options: [
        { label: "24Vac at HR1 and M1/M2 close within 10 to 20 seconds", verdict: "First element stage is working normally. The problem is confined to the HR2 stage and the PJ4 configuration." },
        { label: "24Vac at HR1 but M1 and M2 never close", verdict: "Voltage is landing on the sequencer and it is not responding. Condemn HR1 rather than the board." },
        { label: "No 24Vac at HR1 on a W1 call", verdict: "The board is not driving the first sequencer. Verify voltage at the terminal that stage lands on before condemning the sequencer or the VSTB." },
      ],
    },
  ],
  "s-goodman-mbe-two-stage-cooling-blower-speed": [
    {
      ask: "Restore power, place a Y1-only cooling call, add Y2, then drop Y2 while keeping Y1. How does the blower behave?",
      options: [
        { label: "Ramps to programmed speed, goes to high CFM on Y2, then falls back to about 60 percent on Y1 only", verdict: "That is designed behavior on the MBE/AEPF, not a fault. If airflow still feels wrong, go back to the temperature split and static pressure reading." },
        { label: "Blower never changes speed when Y2 is added", verdict: "The high-stage side is not working. Confirm the VSTB supplies 24Vac to Y/Y2 at the condenser and verify the Y2 call is reaching the board." },
        { label: "Blower changes on Y2 but the programmed speed looks wrong for the tonnage", verdict: "Check the cooling airflow selection on DIP switches 5 and 6 against the CFM table printed on the unit or in the installation instructions for the condenser tonnage." },
        { label: "Blower stops instantly when the call is satisfied", verdict: "The motor is supposed to ramp down to a complete stop on its programmed rate. Verify the VSTB configuration rather than the motor." },
      ],
    },
  ],
  "s-goodman-package-heating-performance-test": [
    {
      ask: "Get the caloric value of the local natural gas from the utility, clock the gas meter with the unit firing, and compare measured input to the rating plate. What did you get?",
      options: [
        { label: "Within 5 percent of the rated BTU input", next: 1 },
        { label: "More than 5 percent off the rated input", verdict: "The unit is not delivering its rating, and that alone throws codes that look electrical. Check gas inlet pressure and manifold pressure against the values on the rating plate for this model and adjust only if needed." },
      ],
    },
    {
      ask: "Inspect the burner flame and measure the flame sensor microamp signal. What do you find?",
      options: [
        { label: "Flame looks right and the microamp signal is good", next: 2 },
        { label: "Flame appearance or microamp signal is off", verdict: "Work the flame side before going back to the code. Burner and sensor problems throw heating faults that look electrical." },
      ],
    },
    {
      ask: "Verify the temperature rise falls in the range from the airflow data for this unit and check external static pressure (approximately 0.5 in. w.c. on this equipment). What do you find?",
      options: [
        { label: "Rise is in range and static is about 0.5 in. w.c.", verdict: "Input, pressures, flame and airflow all check out. Now move to the servicing sections for the specific fault code." },
        { label: "Rise is out of range or static is well off that value", verdict: "Airflow is the problem and it will keep throwing codes that look electrical. Correct airflow before troubleshooting the code." },
      ],
    },
  ],
  "s-goodman-package-high-stage-cooling-check": [
    {
      ask: "With low-stage cooling running and the board confirmed set for a 2-stage thermostat, check for 24 volts at thermostat terminals C and Y2 on the control board. What do you read?",
      options: [
        { label: "No voltage between C and Y2", verdict: "The staging call is not reaching the board. That points at the thermostat or the thermostat wiring, not the unit. Fix that before chasing the board." },
        { label: "24 volts present between C and Y2", next: 1 },
      ],
    },
    {
      ask: "With voltage at Y2 and the pressure switch circuit checked closed, check for 24 volts to the compressor unloader solenoid. What do you find?",
      options: [
        { label: "No 24 volts at the unloader solenoid", verdict: "Check the 6-pin connector and the wires from the solenoid back to the board. If the wires and connector are good, replace the control." },
        { label: "24 volts at the solenoid but the compressor still will not change stage", verdict: "Power is getting there and the compressor is not responding. Condemn the solenoid or the compressor per the manufacturer procedure." },
      ],
    },
  ],
  "s-goodman-package-hp-defrost-field-test": [
    {
      ask: "Run the unit in heating with the thermostat calling and look at the outdoor coil first. What does the frost look like?",
      options: [
        { label: "Bands of frost on the coil", verdict: "Bands of frost indicate a low refrigerant charge. Get the charge right before you test the defrost circuit." },
        { label: "Frost accumulating with the charge checking out", next: 1 },
      ],
    },
    {
      ask: "Shut off power, disconnect the outdoor fan motor wire from 'DF2', restart and let frost build. After a few minutes check for 24 volts between 'DFT' and 'C' on the board. What do you read?",
      options: [
        { label: "24 volts between DFT and C", next: 2 },
        { label: "No 24 volts and the temperature at the thermostat is less than 28 F", verdict: "The defrost thermostat is still open below 28 F - it is defective, replace it." },
      ],
    },
    {
      ask: "With the defrost thermostat closed, short the test pins until the reversing valve shifts (up to 22 seconds depending on the timing period) and remove the short instantly. What happens through the cycle?",
      options: [
        { label: "Defrost initiates and terminates when the sensor opens near 60 F", verdict: "The defrost circuit proves out end to end. Reconnect the outdoor fan motor wire to DF2 before you leave." },
        { label: "Defrost initiates but only lasts about 3 seconds", verdict: "The short was left on the test pins too long - it has to come off instantly after defrost initiates. Re-run the test." },
        { label: "Defrost runs until the twelve minute override interrupts it", verdict: "The sensor is not terminating defrost - it should open at approximately 60 F. The override is covering for a sensor that is not doing its job." },
      ],
    },
  ],
  "s-goodman-pcbdm133-defrost-delays-normal": [
    {
      ask: "With the control identified as a PCBDM133, check the compressor delay jumper and time what the compressor is actually doing. What did you find?",
      options: [
        { label: "Jumper on compressor delay (the factory position) and the contactor drops about 30 seconds at defrost initiation and again at termination", verdict: "That is designed behavior on this board with the compressor delay option selected, not a failure. Do not condemn the compressor, contactor, or control for it." },
        { label: "Compressor stays off about three minutes between runs", verdict: "That is the board's three minute compressor off-cycle delay - wait it out before condemning the compressor, contactor, or control." },
        { label: "Jumper set to Normal but the compressor still drops out at defrost initiation or termination", verdict: "On Normal the compressor should run straight through initiation and termination. The behavior does not match the jumper position, so this one is worth pursuing as a fault." },
        { label: "The complaint is a low pressure or low charge reading taken within 5 minutes of defrost initiation or termination", verdict: "The control ignores the low pressure switch on R-PS1 and PS2 for 5 minutes after defrost initiation and 5 minutes after termination. Do not chase a low-charge complaint using observations taken inside those windows." },
      ],
    },
  ],
  "s-goodman-silicon-nitride-igniter-ohms-amps": [
    {
      ask: "With all power off, the igniter cooled to room temperature (roughly 70 to 77 F) and disconnected from the ignition control, measure its resistance. What do you read?",
      options: [
        { label: "37 to 68 ohms", next: 1 },
        { label: "Outside 37 to 68 ohms", verdict: "Replace the igniter, then reinstall the burner compartment door and verify a full normal heat cycle." },
      ],
    },
    {
      ask: "Reconnect the igniter, restore power, place the unit in a heating cycle and clamp the igniter current during the preheat period. Keep hands and leads clear of the manifold. What do you read?",
      options: [
        { label: "0.37 to 0.68 amps steady state at 120V", verdict: "Both readings are in range - the igniter is good. Look elsewhere for the no-light." },
        { label: "Outside 0.37 to 0.68 amps", verdict: "Marginal igniter even though it ohmed in range and may still glow. Replace it, reinstall the burner compartment door, and verify a full normal heat cycle." },
      ],
    },
  ],
  "s-goodman-single-stage-ignition-voltage-walk": [
    {
      ask: "With your leads placed before the call, check 120 volts from Line 1 (Hot) to Line 2 (Neutral) at the ignition control, then 24 volts from W to C. What is missing?",
      options: [
        { label: "No 120 volts Line 1 to Line 2", verdict: "Check the door switch connections and the wire harness for continuity - the control is not being powered." },
        { label: "120 volts good but no 24 volts W to C", verdict: "Check the transformer, the room thermostat, and the wiring - the heat call is not reaching the control." },
        { label: "Both readings good", next: 1 },
      ],
    },
    {
      ask: "Measure between Pin 1 of the 2-pin connector and neutral on the circuit board. Is the induced draft blower being driven?",
      options: [
        { label: "No 120 volts at Pin 1", verdict: "That is a loose connection in the 2-pin connector or a failed ignition control." },
        { label: "120 volts at Pin 1 and the induced draft blower is running", next: 2 },
      ],
    },
    {
      ask: "During the preheat cycle, measure between Pin 2 of the 2-pin connector and neutral. What do you read?",
      options: [
        { label: "No 120 volts to the ignitor", verdict: "Check the pressure switch, or replace the ignition control board." },
        { label: "120 volts to the ignitor during preheat", verdict: "The control is sequencing correctly this far. After the ignitor warmup time, start checking for 24 volts at the gas valve - voltage goes to the air circulation blower after the heat-on delay only if proof of flame was established." },
      ],
    },
  ],
  "s-goodman-two-stage-furnace-heatpump-tstat": [
    {
      ask: "Pull up the thermostat configuration on this furnace-plus-heat-pump system. How is it set?",
      options: [
        { label: "Set up for heat pump control", verdict: "That is the fault. These furnace controls do not contain an O wire input, and setting the thermostat up for heat pump control results in incorrect performance. Change it to single stage heat / single stage cool." },
        { label: "Set up for multi stage", verdict: "Also wrong for this control. Set it to single stage heat / single stage cool and let the furnace board stage the indoor and outdoor units itself." },
        { label: "Already single stage heat / single stage cool", verdict: "The configuration is right. Verify 24VAC at Y on a cool call and at W on a heat call, and for a communicating two-stage or inverter outdoor unit confirm the 1 and 2 wires are connected between indoor and outdoor." },
      ],
    },
  ],
  "s-goodman-two-stage-inducer-ignitor-5-pin": [
    {
      ask: "Check 120 volts from Line 1 to Line 2 at the ignition control and 24 volts from W (or W1) to C with a heat call in. What is missing?",
      options: [
        { label: "No 120 volts Line 1 to Line 2", verdict: "Check the door switch connections and the wire harness for continuity." },
        { label: "No 24 volts W to C with the thermostat calling", verdict: "Check the transformer, the room thermostat, and the wiring." },
        { label: "Both readings good", next: 1 },
      ],
    },
    {
      ask: "Measure Pin 3 to Pin 4 of the 5-pin connector for the inducer in LOW stage, then Pin 2 to Pin 4 for HIGH stage. What do you read?",
      options: [
        { label: "No 120 volts on Pin 3 to Pin 4 in low stage", verdict: "That is a loose connection in the 5-pin connector or a failed ignition control." },
        { label: "Low stage good but nothing on Pin 2 to Pin 4", verdict: "That may simply mean there is no call for high stage heat - confirm a high stage call exists before condemning the control." },
        { label: "Both inducer stages read 120 volts", next: 2 },
      ],
    },
    {
      ask: "With the induced draft blower running, measure Pin 1 to Pin 5 of the 5-pin connector during the preheat cycle. What do you read?",
      options: [
        { label: "No 120 volts to the ignitor", verdict: "Check the low stage and high stage pressure switches, or replace the ignition control board." },
        { label: "120 volts to the ignitor", verdict: "The sequence is good to here. After the ignitor warmup, look for 24 volts at the gas valve - present for seven seconds only if proof of flame was established, then the blower follows the heat-on delay." },
      ],
    },
  ],
  "s-goodman-utt01-ecm-check-before-replacing": [
    {
      ask: "With power confirmed dead before disturbing connectors, hook the Goodman #UTT-01 UltraCheck-EZ to the motor per the tool's instructions and drive it. What happens?",
      options: [
        { label: "Motor runs with the diagnostic tool driving it", verdict: "The motor is good - stop and go back upstream to the control, the harness, and the programming. Verify 120 volts at the ignition control and 24 volts on the heat call." },
        { label: "Motor will not run with the tool driving it", verdict: "The motor assembly or end bell is the failure. Document the tool's test result before submitting any warranty claim on the motor." },
      ],
    },
  ],
  "s-gpu14-heat-fan-off-delay": [
    {
      ask: "Pin down the complaint first. Is it about blower off time or blower on time?",
      options: [
        { label: "Blower runs too long after the burner shuts off", next: 1 },
        { label: "Blower comes on too soon or too late after the burner lights", verdict: "There is nothing to adjust there. The HEAT FAN ON delay is fixed at 5 seconds after the main burner lights." },
      ],
    },
    {
      ask: "Run a heat call and time the blower from gas valve de-energize to blower stop. Where does it land?",
      options: [
        { label: "About 150 seconds", verdict: "That is the factory setting. Kill power and select a shorter HEAT FAN OFF delay, about 120 or 90 seconds, if the complaint stands - but the delay exists to remove residual heat from the heat exchanger, so do not go to the minimum just to satisfy a complaint." },
        { label: "About 180 seconds", verdict: "It is on the longest option. Kill power and select a shorter HEAT FAN OFF delay on the integrated control module, then re-time the blower off period to confirm the change took." },
        { label: "About 90 seconds and the customer still says it runs too long", verdict: "It is already on the shortest option, so the delay setting is not the cause. Re-check supply temperature and temperature rise instead." },
      ],
    },
  ],
  "s-grille-sizing-throw-comfort": [
    {
      ask: "Put a flow hood on the complaint register and compare measured CFM against what that room should be getting.",
      options: [
        { label: "Measured CFM at the register is correct", verdict: "The complaint is about how the air is being thrown into the space, not how much is arriving. Look at throw pattern, register free area, mounting height, and orientation before touching duct sizing." },
        { label: "Measured CFM is genuinely short", verdict: "This is an airflow delivery problem, not a throw-pattern issue. Chase the duct side before changing registers." },
      ],
    },
    {
      ask: "With CFM confirmed correct, look at the register itself and where it throws.",
      options: [
        { label: "Air is thrown directly onto a seating area, bed, or workstation", verdict: "That is a draft complaint that has nothing to do with the CFM being wrong. Change the pattern or redirect it." },
        { label: "Register face is undersized for the branch's CFM", verdict: "The same air through a smaller opening raises velocity, noise, and draft sensation even when total room CFM is correct." },
        { label: "Register is oversized and air dumps nearby", verdict: "It never throws across the room, leaving far corners feeling stagnant." },
        { label: "Pattern and size look right but the mounting height or orientation does not suit the room", verdict: "Floor, wall, and ceiling registers all throw differently. Consider changing the register type or pattern, or relocating within the same opening, before assuming duct sizing or system CFM must change." },
      ],
    },
  ],
  "s-grounding-bonding-verification": [
    {
      ask: "Meter continuity from the equipment cabinet or ground lug back to the electrical panel ground bus.",
      options: [
        { label: "Reads near 0 ohms", verdict: "The equipment ground path is intact. Now confirm cabinet panels, the compressor mount, and the transformer chassis are actually bonded to it and not just resting against painted metal, since paint is an insulator and defeats the bond." },
        { label: "Reads open or high resistance", verdict: "The ground is not doing anything. Check whether the grounding conductor is actually landed at both ends, since a wire that is present but pigtailed to nothing is a common finding on older installs." },
        { label: "Ground and neutral are bonded again at a subpanel or at the equipment disconnect", verdict: "That is an improper secondary bond creating parallel neutral current paths. Bonding belongs only at the main service panel or main bonding jumper location." },
        { label: "Customer reports shocks or tingling from touching the cabinet", verdict: "Treat that as a grounding and bonding failure until proven otherwise. Verify with a meter rather than dismissing it as static, and do not leave the equipment energized with a confirmed grounding fault." },
      ],
    },
  ],
  "s-heat-strip-element-continuity": [
    {
      ask: "With all power off and confirmed dead, remove the heating element from the cabinet, inspect it, and ohm it.",
      options: [
        { label: "Visible break in the wire or a broken insulator", verdict: "The visual check found it before the meter did. Replace the element rather than attempting a repair." },
        { label: "No reading on the ohmmeter", verdict: "The element is open. Replace it, reinstall, and verify each stage energizes." },
        { label: "Element reads continuous and looks intact", verdict: "The element itself is not the problem. With the control side already proved calling, move to the sequencer and the limit." },
      ],
    },
  ],
  "s-heater-limit-control-continuity-check": [
    {
      ask: "With ALL power off and the wiring removed from the control terminals, ohm across the normally closed contacts of the automatic reset limit wired in series with the dead element. What do you read?",
      options: [
        { label: "No reading, and the limit was cool when tested", verdict: "The control is open. Replace it - do not wire around it - then find and correct the low airflow condition that opened it." },
        { label: "Continuity across the contacts with the limit cool", verdict: "The limit is good, so the strip is dead for another reason. Recheck the element itself and the wiring in series with it." },
        { label: "Limit was still hot when you tested it", verdict: "That reading is not trustworthy. These controls open at approximately 150 F to 160 F and close at approximately 110 F, so let it cool and test again." },
      ],
    },
  ],
  "s-heating-test-hp-trip-mild-weather": [
    {
      ask: "Note the outdoor ambient at the moment the compressor stopped during the heating test. What was it?",
      options: [
        { label: "Above about 80 F", verdict: "Suspect the high pressure cutout rather than a control failure. Postpone the heating test to a day with more suitable conditions, but do not skip it." },
        { label: "Low outdoor ambient and the unit runs properly in heating", verdict: "Heating checks out. With low ambient you can verify pressure cutout operation by blocking off the indoor return air until the unit trips." },
      ],
    },
  ],
  "s-heatpump-piston-bypass": [
    {
      ask: "Run the unit in both modes and compare. Which mode is wrong, and what does it look like?",
      options: [
        { label: "One mode shows high suction, low superheat, low subcooling", verdict: "The piston in that mode is not seating - refrigerant is bypassing the orifice. Pull it and look for debris at the seal surface, and confirm bore size." },
        { label: "Low suction, high superheat, normal-to-high subcooling, plus a temp drop across the opposite piston", verdict: "The piston that should be bypassing is stuck in its seat and acting like a restriction. Frost on the liquid line side of that housing confirms it." },
        { label: "Both modes look the same and both are wrong", verdict: "Not a bypass problem. Go after charge, a liquid line restriction shared by both modes, or a reversing valve leaking internally." },
      ],
    },
  ],
  "s-high-co-in-flue-gas": [
    {
      ask: "Let the furnace fire steadily and stabilize, then read CO air free and watch what the number is doing. What do you have?",
      options: [
        { label: "Unstable and rising, even well under 100 ppm air free", verdict: "Shut the burner down and find the cause - CO that is unstable and rising at any level is a shutdown, not a note on the invoice." },
        { label: "Above 400 ppm air free", verdict: "Not permissible - shut the appliance down. Then work the cause list: dirty or misaligned burners, gas pressure and firing rate, combustion air, blocked or undersized flue, restricted secondary air, cracked or corroded heat exchanger." },
        { label: "Stable between 100 and 400 ppm air free", verdict: "The appliance can stay in service while you correct the cause, but it needs correcting - the working target is under 100 ppm air free. Verify firing rate by clocking the meter and by manifold pressure against the rating plate." },
        { label: "Stable and under 100 ppm air free", verdict: "That is the working target. Test the house for CO in the living space as well, and record the final stabilized CO air free number on the ticket." },
      ],
    },
  ],
  "s-high-o2-low-co2-on-the-analyzer": [
    {
      ask: "Reseal the port and move the probe further upstream toward the heat exchanger outlet. What happens to O2 and CO2?",
      options: [
        { label: "O2 drops and CO2 climbs noticeably", verdict: "You were sampling diluted flue gas. The furnace is not running as much excess air as it looked. Find and fix the leak or the draft hood dilution and retest before you touch the gas side." },
        { label: "Numbers barely change - O2 stays high everywhere in the flue", verdict: "This is real excess air at the burners. Check the clocked input against the rating plate, the manifold pressure, primary air shutter settings, and whether the burners or orifices match the furnace." },
        { label: "O2 is high and CO is also elevated at the same time", verdict: "High excess air with high CO usually means the flame is being disturbed rather than simply lean. Look at burner alignment and carryover, secondary air restriction, a fouled or breached heat exchanger, and vent recirculation." },
      ],
    },
  ],
  "s-high-pressure-switch-cardboard-test": [
    {
      ask: "With the wire removed, ohm across the high pressure control terminals.",
      options: [
        { label: "No continuity", verdict: "The contacts are open. If system pressure is normal, the control itself is the problem." },
        { label: "Continuous", next: 1 },
      ],
    },
    {
      ask: "Attach a gauge to the base valve service port, start the system in charge mode, place cardboard in front of the condenser coil to raise condensing pressure, stay with the unit, and watch the cut-out pressure.",
      options: [
        { label: "Cuts out below the specified range - the DX20VC lists a nominal cut-out near 605 PSIG", verdict: "It is nuisance-tripping early. Remove the cardboard as soon as it trips and replace the control." },
        { label: "Trips at the correct point", verdict: "The switch is telling the truth. Remove the cardboard and work the causes of high head pressure instead." },
      ],
    },
  ],
  "s-horizontal-furnace-drain-elbow": [
    {
      ask: "Look at the trap and drain connection on this horizontally installed furnace. What do you see?",
      options: [
        { label: "The rubber drain elbow was cut down to fit", verdict: "Use the entire rubber drain elbow instead. The full elbow cushions the trap against bumps and shocks transmitted from the drain line." },
        { label: "Drain pipe misaligned, kinking the elbow or grommet", verdict: "Correct the alignment. A kinked elbow or grommet puts stress straight into the plastic trap." },
        { label: "Not enough space between the furnace and its platform", verdict: "The condensate trap extends 2 in. below the furnace casing, so it needs that clearance. Raise the unit so the trap outlet is clear." },
        { label: "Elbow and clearance are fine but the drain line weight rests on the trap", verdict: "Support the drain line so its weight and any bumps are not carried by the plastic trap." },
      ],
    },
  ],
  "s-hot-pull-down-high-suction": [
    {
      ask: "Read return air temperature and subcooling along with the high suction pressure. What does the combination say?",
      options: [
        { label: "Return air very warm and subcooling in range", verdict: "That is load, not charge. Let it pull down and re-read. Do not recover refrigerant on this reading." },
        { label: "Return air normal and subcooling high", verdict: "That is a real overcharge. Verify airflow first, then recover slowly to the OEM subcooling target." },
        { label: "Return air normal, subcooling low, superheat low", verdict: "The metering device is overfeeding. Work the TXV or piston, and check the bulb mounting and insulation on a TXV system." },
        { label: "Return air very warm and discharge line temperature climbing hard", verdict: "The compressor is working at the edge under this load. Confirm condenser airflow and CTOA, and stay with it until the pull-down brings conditions back into range." },
      ],
    },
  ],
  "s-hp-aux-heat-always-on": [
    {
      ask: "Watch the outdoor unit during a heat call. Is it running at all?",
      options: [
        { label: "Outdoor unit never starts", next: 1 },
        { label: "Outdoor unit runs but backup heat still carries the load", next: 2 },
      ],
    },
    {
      ask: "Find out why the compressor is not running.",
      options: [
        { label: "A stored fault code or lockout is present", verdict: "A heat pump fault/lockout is preventing compressor operation, which is what is pushing everything onto backup heat. Correct the fault cause." },
        { label: "No fault code, but the compressor or contactor is dead", verdict: "A failed compressor or contactor forces the system onto backup heat as the only source. Repair that." },
      ],
    },
    {
      ask: "Check the settings and the refrigerant side.",
      options: [
        { label: "Balance point / lockout temperature is set high", verdict: "Set too high, the system defaults to backup heat well before it actually needs to. Correct the setting." },
        { label: "Charge is well below spec", verdict: "A badly undercharged heat pump cannot make capacity in cold weather and pushes the load onto backup heat. Correct the charge." },
        { label: "Line temperatures say it is still in cooling mode", verdict: "Check for a stuck reversing valve keeping the system in cooling - that would also explain backup heat carrying the full load." },
      ],
    },
  ],
  "s-hp-aux-heat-wont-engage": [
    {
      ask: "Manually force emergency heat mode at the thermostat. Do the strips or the furnace respond?",
      options: [
        { label: "Backup heat fires in emergency mode", verdict: "Wiring and heat source are fine, so this is thermostat logic. Check the staging/balance point configuration and any outdoor thermostat/lockout control blocking automatic aux calls." },
        { label: "Nothing happens in emergency mode either", next: 1 },
      ],
    },
    {
      ask: "Work the hardware side.",
      options: [
        { label: "No W/W2 or E signal reaching the air handler heat relay or the dual-fuel furnace", verdict: "Wiring problem between the thermostat and the backup heat. Trace and correct it." },
        { label: "Signal is present but the strips never energize", verdict: "Check the electric heat strip's own breaker/disconnect and its sequencer/contactor." },
      ],
    },
  ],
  "s-hp-balance-point-explained": [
    {
      ask: "On the cold day, verify the basics first: is the heat pump running, is the reversing valve in heating, is defrost cycling normally?",
      options: [
        { label: "All of that checks out and the house only runs cold on the coldest days", verdict: "That is capacity drop-off near the balance point - the heat pump is operating normally but cannot hold setpoint alone below it. Not a component failure." },
        { label: "Backup/supplemental heat is not energizing to make up the gap", verdict: "That is the real fault to chase, not the heat pump's reduced capacity." },
        { label: "Backup heat kicks in on only mildly cool days", verdict: "That balance point looks unreasonably high. Check equipment sizing against a proper heat loss calculation, and check for low charge, a dirty coil, or restricted airflow cutting heat pump capacity." },
        { label: "Heat pump is not running, or the reversing valve is not in heating position", verdict: "That is a component fault, not balance point behavior. Chase it directly." },
      ],
    },
  ],
  "s-hp-balance-point-field-adjustment": [
    {
      ask: "Find the balance point / changeover / aux heat lockout setting in the control, then match it against the actual complaint.",
      options: [
        { label: "Complaint is high bills with aux heat running a lot, and the setting is still at factory default", verdict: "Consider lowering the balance point so the heat pump works alone down to a colder temperature, if its capacity curve supports it there. Confirm the new value took and monitor a cold-weather cycle." },
        { label: "Complaint is the house running cold", verdict: "Investigate why capacity is falling short first - charge, airflow, defrost - rather than papering over it by bringing backup heat in sooner." },
        { label: "Dual-fuel system running the heat pump well past where the furnace would be more cost-effective, or the reverse", verdict: "That is a legitimate reason to adjust the setting even with everything mechanically healthy. Verify the change across an actual cold-weather cycle, not just on the menu display." },
      ],
    },
  ],
  "s-hp-cold-blow-normal-temps": [
    {
      ask: "Probe supply and return air with a real thermometer and figure the rise. What did you get?",
      options: [
        { label: "15 to 30 degrees F rise, for example 88 supply on a 70 return", verdict: "That is normal heat pump operation and it is still heating the house. 90 degree air is below skin temperature so it feels cool blowing on the hand - explain it rather than chase it." },
        { label: "Rise under about 12 degrees F", next: 1 },
      ],
    },
    {
      ask: "With a low rise, what do you find when you check mode, defrost, and staging?",
      options: [
        { label: "Unit is running in cooling mode on a heat call", verdict: "Reversing valve problem - the system is stuck in cooling. That explains cold supply air on a heating call." },
        { label: "Outdoor coil is in defrost right now with steam off the coil", verdict: "Normal - the system literally runs in cooling briefly during defrost. This is the moment homeowners report as cold air and smoke." },
        { label: "Running in heat, no defrost, aux heat never stages", verdict: "Check charge and whether aux heat should be staging, and compare the measured rise against the unit's performance table for today's outdoor temperature before condemning anything." },
      ],
    },
  ],
  "s-hp-compressor-sound-different-modes": [
    {
      ask: "Run both modes, check reversing valve operation, and take charge readings in the mode that sounds worse.",
      options: [
        { label: "Reversing valve is not fully shifting", verdict: "A valve that does not fully shift causes both a sound difference and reduced performance in that one mode. Address the valve first." },
        { label: "Valve shifts fully, but superheat/subcooling in the noisier mode shows the charge is marginal there", verdict: "A charge that is adequate for cooling can be marginal in heating (or the reverse) because of the different operating pressures each mode produces. Correct the charge." },
        { label: "Rougher only at startup, on heating-season starts", verdict: "That points to liquid refrigerant migration/flooding where the crankcase heater matters most. Check the crankcase heater situation." },
        { label: "Valve, charge and startup all check out and it still sounds a little different between modes", verdict: "Some compressors genuinely run with different sound and vibration characteristics between modes when healthy. Compare against a similar known-good unit before condemning it." },
      ],
    },
  ],
  "s-hp-defrost-board-force-test": [
    {
      ask: "With the unit running in heating, jump the defrost board TEST/SPEED-UP pins. What happens?",
      options: [
        { label: "Reversing valve shifts, outdoor fan stops, unit runs a defrost", verdict: "Board and initiation logic are working. If the customer still reports icing, check sensor placement and, on time-temperature boards, whether the 30/60/90 interval pin matches the climate." },
        { label: "Nothing happens with coil temp below the initiation point", next: 1 },
      ],
    },
    {
      ask: "Ohm the defrost/coil sensor and compare it against its temperature curve on the wiring diagram or service manual. What does it read?",
      options: [
        { label: "Reads warm while the coil is iced", verdict: "A sensor reading warm on an iced coil never initiates defrost. Replace it and confirm it clamps tight to the specified coil location." },
        { label: "Reads cold no matter what", verdict: "One reading cold forever never terminates - that is the unit blowing cold steam clouds every cycle. Replace the sensor." },
        { label: "Tracks the curve correctly", verdict: "Check placement first: a sensor hanging in air reads air temp and wrecks the whole defrost logic. If it is clamped where it belongs, suspect the board." },
      ],
    },
  ],
  "s-hp-defrost-issues": [
    {
      ask: "Watch or force a defrost cycle. What actually happens?",
      options: [
        { label: "Board calls for defrost but the line temperatures never change", verdict: "The reversing valve is not actually switching into defrost. Verify the valve, not just the board's call." },
        { label: "Defrost runs but the outdoor fan keeps running", verdict: "The coil will not clear with the fan running even though the board thinks it is defrosting. Fix the fan shutoff during defrost." },
        { label: "It always runs the full default timed cycle instead of terminating", verdict: "Always hitting max defrost time is a sign the termination sensor is bad. Check the defrost sensor/thermistor resistance and its mounting on the outdoor coil, and review the board's timing/initiation settings." },
        { label: "Defrost cycles look correct but icing comes right back afterward", verdict: "Suspect a charge or airflow problem rather than the defrost control." },
      ],
    },
  ],
  "s-hp-hot-gas-bypass-issue": [
    {
      ask: "First confirm the system actually has hot gas reheat/bypass, then compare supply air temperature and cooling performance with the compressor running.",
      options: [
        { label: "Supply air abnormally warm and cooling capacity down while the compressor runs normally", verdict: "That is the signature of a hot gas bypass/reheat valve stuck open. Check the valve's control signal against what is actually happening at the valve before condemning it." },
        { label: "Cooling capacity normal, but the dehumidification/reheat feature never engages when called", verdict: "That fits a valve stuck closed - normal cooling is unaffected but the feature will not engage. Verify the control signal at the valve." },
        { label: "System has no hot gas bypass or reheat at all", verdict: "Not the cause. This feature is not common on standard residential equipment, so stop troubleshooting something that is not installed." },
      ],
    },
  ],
  "s-hp-low-ambient-capacity-drop": [
    {
      ask: "Measure actual delivered capacity/temperature rise and compare it against the manufacturer's rated performance for today's outdoor temperature, not for a mild day.",
      options: [
        { label: "In line with the manufacturer's published curve for this outdoor temperature", verdict: "All air-source heat pumps lose capacity as it gets colder - this is expected, not a fault. Confirm backup heat is engaging to cover the gap and explain it to the customer." },
        { label: "Significantly worse than the published curve for this outdoor temperature", verdict: "That is a real fault, keep digging. Check charge first - a heat pump marginal on charge performs fine in mild weather and falls off a cliff in the cold." },
        { label: "Backup/auxiliary heat is not engaging at all on the coldest days", verdict: "That is the actual fault to chase. Backup heat covering the gap on design days is the system working as intended, not a heat pump failure." },
      ],
    },
  ],
  "s-hp-no-heat-runs-cold": [
    {
      ask: "Before assuming a fault, measure supply and return air with a thermometer.",
      options: [
        { label: "Supply is roughly 85-105F and clearly warmer than return", verdict: "That is normal for a heat pump - it only feels warm compared to a gas furnace's much hotter output. Explain the difference before chasing a fault." },
        { label: "Supply air is barely warmer than return, or cooler", next: 1 },
      ],
    },
    {
      ask: "Check the reversing valve position and the outdoor unit.",
      options: [
        { label: "Reversing valve is not energized or positioned for heat", verdict: "The system is not actually in heating. Correct the reversing valve signal and position." },
        { label: "Outdoor coil is iced up and not clearing", verdict: "Defrost problem - see the defrost entry in this list." },
        { label: "Reversing valve and outdoor coil both look right", verdict: "Check refrigerant charge, since undercharge is often more noticeable in heating than cooling, and confirm auxiliary/emergency heat is wired and staging in as expected on a cold day." },
      ],
    },
  ],
  "s-hp-reversing-valve-stuck-onemode": [
    {
      ask: "Call for a mode change and meter for 24V at the reversing valve solenoid.",
      options: [
        { label: "No 24V at the solenoid", verdict: "The thermostat or board is not sending the O/B signal. Chase the control side, not the valve." },
        { label: "24V present but the valve does not shift", next: 1 },
      ],
    },
    {
      ask: "With the coil energized, feel all four reversing valve line temperatures during the attempted mode change.",
      options: [
        { label: "Lines never show the expected temperature shift", verdict: "Mechanically stuck valve. Tapping the valve body gently while energized may free the slide, but treat that as diagnostic only - a stuck or internally leaking valve needs replacement." },
        { label: "No click and no temperature change at all when energized", verdict: "Check the solenoid coil resistance and continuity - the coil may be open." },
      ],
    },
  ],
  "s-hp-supplemental-heat-lockout-setting": [
    {
      ask: "Look in the thermostat or control system for a configured compressor lockout temperature, then find out whether it was set on purpose.",
      options: [
        { label: "Lockout is configured, and the customer or prior documentation confirms it was intentional (for example dual fuel favoring the furnace in cold weather)", verdict: "This is deliberate, correct operation. Explain clearly why the outdoor unit is not running in this weather - it is a very common complaint that turns out to be by design." },
        { label: "Lockout is set but nobody configured it that way", verdict: "Check for a stored fault, or a control default that reset after a power event, rather than assuming someone intended it." },
        { label: "No compressor lockout configured at all", verdict: "Then the compressor being off is not a lockout. Treat it as a real fault and keep digging." },
      ],
    },
  ],
  "s-hp-thermostat-lockout-balance-point-generic": [
    {
      ask: "In the installer or advanced settings menu, not the homeowner schedule, compare the compressor lockout temperature against the equipment's rated low-ambient operating range.",
      options: [
        { label: "Lockout is set higher than the temperature the equipment is actually rated to run at", verdict: "That wastes the heat pump's capacity by handing off to backup heat sooner than needed. Lower it to match the equipment's real capability." },
        { label: "Lockout is set below what the equipment can actually handle", verdict: "That leaves the house cold when the compressor cannot carry the load. Raise it to match the equipment's rated low-ambient range." },
        { label: "Settings are still at factory default", verdict: "Factory defaults are often too conservative or too aggressive for this specific climate and equipment pairing. Configure them deliberately against the equipment's performance data." },
      ],
    },
    {
      ask: "Check the balance point and the auxiliary or backup heat lockout settings.",
      options: [
        { label: "Aux heat is locked out above a temperature where it is actually needed", verdict: "The house falls behind on the coldest design days. Set the aux lockout so backup heat can assist when it is genuinely required." },
        { label: "Balance point and staging were never configured", verdict: "Set them against the equipment's capacity and performance data and what was agreed with the customer, rather than assuming the installer got it right." },
        { label: "Settings were correct before a thermostat replacement or reset", verdict: "Re-verify them now. This is one of the most common heat-pump-does-not-work-as-well-since-we-changed-thermostats callbacks." },
      ],
    },
  ],
  "s-hp-two-stage-stuck-low": [
    {
      ask: "Pull stored codes from the outdoor unit before assuming a control problem. What is there?",
      options: [
        { label: "Inverter or stage-up fault code stored", verdict: "Chase that code rather than the thermostat. The unit is telling you why it will not ramp." },
        { label: "No fault code, and the thermostat is configured for single-stage operation", verdict: "A thermostat set up single-stage on multi-stage equipment will never call for more capacity. Correct the staging configuration." },
        { label: "No fault code, staging configured correctly, but outdoor ambient is at an extreme", verdict: "Some systems intentionally limit staging at very high or very low ambient as part of normal control strategy. Verify against the equipment's staging logic before calling it a fault." },
        { label: "No fault code, configuration correct, on a communicating system", verdict: "Check communication between indoor and outdoor units - a degraded but not fully failed link can still run basic operation while blocking full-capacity coordination." },
      ],
    },
  ],
  "s-hpc-lpc-series-voltage-check": [
    {
      ask: "With the switches closed, check signal voltage at the output of both the HPC and the LPC - they are wired in series.",
      options: [
        { label: "6.5 VDC or 8.0 VAC and the same at both", verdict: "The series string is passing signal. Look past the pressure controls for the missing compressor call." },
        { label: "Input voltage at the HPC but no voltage at the HPC output or at the LPC", verdict: "Suspect the discharge thermostat wired in series with the HPC. That is the common miss in this string." },
        { label: "Voltage at the HPC output but nothing past the LPC", next: 1 },
      ],
    },
    {
      ask: "Remove the wire and ohm across the low pressure control terminals, then compare actual system pressures to the design points.",
      options: [
        { label: "Contacts open with pressures well above the cut-out points", verdict: "It has tripped or failed with no reason to. This control is intended to cut out around 21 PSIG on heat pumps and 55 PSIG on air conditioners - replace it." },
        { label: "Contacts open and pressures are down at the cut-out points", verdict: "The control is doing its job. Correct the underlying pressure problem before returning the system to service." },
        { label: "Contacts closed but it will not cut in near 50 PSIG on a heat pump or 95 PSIG on an air conditioner", verdict: "Cut-in behavior does not match the stated points. Replace the control." },
      ],
    },
  ],
  "s-humidifier-bypass-damper-backwards": [
    {
      ask: "Compare the bypass duct's actual physical connections against the manufacturer's install diagram.",
      options: [
        { label: "Bypass runs return-to-supply, the reverse of the diagram", verdict: "Connected backwards it fights the pressure differential instead of using it, so there is little or no real airflow across the pad. Correct the ductwork per the diagram rather than opening the damper further or changing water flow rate." },
        { label: "Connections are correct supply-to-return but humidity never measurably rises even though water flows and the damper opens", verdict: "That symptom fits a poorly connected or restricted bypass. Check that the bypass damper itself is oriented correctly and opens in the right direction for the intended airflow, not just that it moves." },
      ],
    },
  ],
  "s-humidifier-fanpowered-fan-not-running": [
    {
      ask: "Confirm the unit is the fan-powered type with its own motor, then check for voltage at the booster fan motor during an active humidification call.",
      options: [
        { label: "No voltage at the fan motor during the call", verdict: "That points to the humidifier control or the wiring, not the fan motor itself." },
        { label: "Voltage is present but the fan does not spin", next: 1 },
      ],
    },
    {
      ask: "With power off, turn the small fan wheel by hand and check its capacitor if it is a capacitor-start or capacitor-run design.",
      options: [
        { label: "Wheel is seized or jammed with debris", verdict: "A seized bearing or debris jam is common on units that do not get cleaned along with the pad. Free or replace the fan assembly." },
        { label: "Wheel turns freely but the capacitor tests bad", verdict: "Test and replace it using the same approach as any small PSC motor. After the fan is repaired, confirm the water solenoid and pad are still working, since a unit that ran with a dead fan can develop pad scaling or a stuck valve." },
      ],
    },
  ],
  "s-humidifier-not-humidifying": [
    {
      ask: "Turn the humidistat up to call during a heat call and watch the humidifier.",
      options: [
        { label: "No water reaching the pad", verdict: "Check the water supply - a closed saddle valve or a clogged supply line is a common cause." },
        { label: "Water flows but the pad is crusted with mineral buildup", verdict: "Hard-water scale is restricting water flow and evaporation. Replace the pad/media." },
        { label: "Damper does not open on the call", verdict: "A stuck bypass or fan-powered damper prevents airflow through the humidifier even with water flowing. Free or repair it." },
        { label: "Nothing happens at all - no call reaches the humidifier", verdict: "Check the humidistat setting and its wiring to the furnace/damper. On bypass units, no heat call means no airflow through it by design - that is not a fault." },
      ],
    },
  ],
  "s-humidifier-overhumidifying": [
    {
      ask: "Check the humidistat - what is it set to, and is it actually cycling off?",
      options: [
        { label: "Set to a fixed high number and left there year-round", verdict: "Indoor humidity targets have to come down as outdoor temperature drops or you get window condensation. Adjust it for the season and walk the customer through the relationship." },
        { label: "Humidistat is stuck calling continuously", verdict: "The humidistat is not functioning correctly. Replace it." },
        { label: "Humidistat is satisfied but moisture keeps being added", verdict: "Check for a stuck-open humidifier damper or water valve adding moisture outside of an actual call." },
      ],
    },
  ],
  "s-humidifier-steam-canister-scale": [
    {
      ask: "Check the unit's fault or status indicator and inspect the canister before assuming a control board problem.",
      options: [
        { label: "Indicator shows replace canister or high current draw, or the canister is visibly scaled", verdict: "That is normal wear, not a defect, especially in hard water areas where canisters can need replacement within a single season. Replace it per the manufacturer's part number." },
        { label: "No fault shown but steam output has declined against the unit's rated capacity", verdict: "Declining output with no error is usually scale reducing the electrodes' effective conductivity or the element's heat transfer, not a board issue." },
        { label: "The periodic drain and refill cycle is not running", verdict: "A failed drain cycle lets mineral concentration build, accelerating scale and shortening canister life significantly. Fix the drain cycle or the new canister goes the same way." },
      ],
    },
    {
      ask: "Confirm which canister design this unit uses before ordering parts.",
      options: [
        { label: "Disposable canister design", verdict: "Replace it per the manufacturer's part number rather than trying to descale it." },
        { label: "Cleanable canister design", verdict: "Clean it per the manufacturer's instructions instead of replacing. Also raise water quality with the customer, since a softener or lower-mineral source meaningfully extends canister life where canisters are failing fast." },
      ],
    },
  ],
  "s-humidifier-type-troubleshooting-approach": [
    {
      ask: "With the humidistat calling, check whether the call is actually reaching the humidifier.",
      options: [
        { label: "No call reaching the unit", verdict: "That is a control-side wiring or setting issue. It produces the same not-humidifying symptom across all three humidifier designs, so fix it before assuming a unit-level fault." },
        { label: "Call is reaching the unit and it still is not humidifying", next: 1 },
      ],
    },
    {
      ask: "Confirm which type of humidifier is actually installed.",
      options: [
        { label: "Bypass flow-through: wetted pad and bypass duct, no fan of its own", verdict: "Check that the bypass damper opens on a call and that there is adequate pressure differential between supply and return to actually drive airflow through the bypass." },
        { label: "Fan-powered: has its own dedicated fan across the pad", verdict: "Check the booster fan itself. Do not assume the unit is dead just because the main blower is not running, since it is not supposed to depend on it." },
        { label: "Steam: boils water in a canister using electric elements or electrodes", verdict: "Check power to the canister, water level and fill valve operation, and the canister's condition. Airflow and bypass damper checks do not apply to this type." },
      ],
    },
  ],
  "s-humidistat-vs-dewpoint-control": [
    {
      ask: "Confirm which humidity control is installed and when the window condensation actually shows up.",
      options: [
        { label: "Basic humidistat set to a fixed RH percentage, condensation appearing as outdoor temperature drops", verdict: "The control is doing exactly what it is set to do. A target that was fine in fall becomes too high once it gets cold, so lower the setpoint seasonally or move to a control with automatic compensation." },
        { label: "Dew point or outdoor-temperature-compensated control and still seeing condensation", next: 1 },
      ],
    },
    {
      ask: "On the compensated control, check the outdoor temperature sensor reading and the programmed compensation curve.",
      options: [
        { label: "Outdoor sensor reads wrong or is mounted in a poor location", verdict: "A bad or misplaced sensor makes the control use the wrong compensation curve. Correct the sensor before adjusting anything else." },
        { label: "Sensor reads correctly but the compensation curve is left at its default", verdict: "Some dew point controls have adjustable compensation aggressiveness. Older or single-pane windows condense at a lower indoor RH than modern double-pane, so one default curve does not fit every home." },
      ],
    },
  ],
  "s-iceonac": [
    {
      ask: "Shut the system off or to fan-only and let it fully thaw. Once thawed, check airflow across the indoor coil first. What did you find?",
      options: [
        { label: "Filter clogged, or the blower is not moving the air it should", verdict: "Airflow is the most common cause of a frozen coil. Correct the filter, blower speed, or dirty blower wheel and retest." },
        { label: "Filter and blower both check out fine", next: 1 },
      ],
    },
    {
      ask: "With airflow good, check the charge - subcooling and superheat against the manufacturer spec.",
      options: [
        { label: "Charge reads low against spec", verdict: "Low charge is the number two cause of freeze-ups. Correct the charge to the manufacturer spec." },
        { label: "Charge is correct but it still freezes", verdict: "Look for a restriction - a kinked line or a clogged filter drier." },
      ],
    },
  ],
  "s-igniter-keeps-burning-out": [
    {
      ask: "Measure line voltage at the furnace with the blower and inducer running. What do you read?",
      options: [
        { label: "Sustained above about 125 V", verdict: "High supply voltage shortens hot surface igniter life, and igniters can burn out around 132 V. The utility needs to correct the supply." },
        { label: "Normal supply voltage under load", next: 1 },
      ],
    },
    {
      ask: "Count how many times the furnace cycles per hour on a normal heat call. What do you get?",
      options: [
        { label: "Heavy short cycling", verdict: "Every cycle is another ignition event. Chase the short-cycling cause - limit trips, oversizing, thermostat - or the next igniter will fail too." },
        { label: "Normal cycle count", next: 2 },
      ],
    },
    {
      ask: "Look at the igniter itself: mounting position against the manufacturer's spec, the part number for that model, and any sign of water reaching it. What did you find?",
      options: [
        { label: "Igniter sitting too deep in the flame path", verdict: "It stays hot longer than designed and fails early. Set it to the position the manufacturer specifies." },
        { label: "Condensate dripping or blowing onto the igniter from the collector box, a leaking inducer gasket, or a cracked vent joint", verdict: "Thermal shock from water hitting a glowing element cracks it - fix the water path, not just the igniter." },
        { label: "A universal igniter with the wrong resistance or the wrong ceramic bracket", verdict: "Wrong part runs hotter or sits in the wrong place. Get the correct part number for the model, and handle the replacement by the ceramic holder without flexing the element." },
      ],
    },
  ],
  "s-ignition-control-board-power-and-ground": [
    {
      ask: "With power off, measure resistance between the neutral (white) connection and the burner closest to the flame sensor.",
      options: [
        { label: "Less than 2 ohms", next: 1 },
        { label: "More than 2 ohms", verdict: "A high-resistance neutral causes exactly this lockout on failure to sense flame. Confirm the ground wire runs from the furnace all the way back to the electrical panel and correct the bonding before ordering a board." },
      ],
    },
    {
      ask: "Check line polarity and the control's supply voltages.",
      options: [
        { label: "Hot and neutral reversed at the furnace", verdict: "Reversed line polarity will cause lockout on failure to sense flame even with a good flame sensor. Correct it before condemning anything." },
        { label: "No 120 volts from Line 1 (hot) to Line 2 (neutral) at the ignition control", verdict: "Check the door switch connections and harness continuity." },
        { label: "No 24 volts from W to C at the ignition control", verdict: "Go back to the transformer, thermostat, and wiring." },
        { label: "24 volts off the transformer but about 13 volts between C and R at the terminal board", verdict: "Check for a blown fuse." },
      ],
    },
    {
      ask: "Check for 120 volts to the induced draft blower between Pin 1 of the 2-pin connector and neutral on the board.",
      options: [
        { label: "120 volts present", verdict: "The board is driving the inducer. Keep working the sequence, and remember the trial for ignition is only 4 seconds so live checks must land inside that window." },
        { label: "No voltage at Pin 1 to neutral", verdict: "A loose 2-pin connection or a failed control. Prove the connection first - these boards are not field repairable and must be replaced as a unit." },
      ],
    },
  ],
  "s-ignition-lockout-before-you-reset": [
    {
      ask: "Before touching anything, read the board's LED or display and write down exactly what it shows, then determine from that model's manual what kind of lockout it is. Which is it?",
      options: [
        { label: "Hard lockout requiring a manual reset", verdict: "Pull the stored fault history first using that manufacturer's procedure - many controls lose it on a power interruption. Then reset by the manufacturer's method, thermostat cycle where that works, rather than pulling the disconnect." },
        { label: "Soft lockout or retry-delay that will attempt again on its own", verdict: "A retrying control means the fault is intermittent. Wait it out and watch the full sequence with a meter - inducer, pressure switch proving, igniter warmup, gas valve, flame signal - rather than forcing a reset." },
      ],
    },
  ],
  "s-import-minisplit-comm-code-new-install": [
    {
      ask: "With power off, ring out the run conductor by conductor and check each one to ground. What do you find?",
      options: [
        { label: "Conductors are continuous, correctly landed, and clear to ground", verdict: "The wire is good. Restore power, confirm supply voltage at the outdoor unit, then work the code toward the indoor or outdoor board." },
        { label: "A conductor is spliced, undersized, or a different cable type mid-run", verdict: "That is the likely cause. Replace the run with continuous cable of the specified type and size, then retest before touching a board." },
        { label: "A conductor is open or reads to ground", verdict: "The cable is damaged. Replace it - a marginal conductor here comes back as an intermittent comm code long after you leave." },
      ],
    },
  ],
  "s-inducer-noisy-rattle-hum-screech": [
    {
      ask: "Power the furnace down, let the inducer stop, then spin the wheel by hand and check the wheel on the shaft. What do you find?",
      options: [
        { label: "Roughness, grinding, or side-to-side play", verdict: "That is bearings - replace the assembly. Nuisance pressure switch trips are the next symptom if you leave it." },
        { label: "Wheel loose on the motor shaft or the set screw not secure", verdict: "A wheel creeping on the shaft rattles and drops draft - secure it and re-check draft." },
        { label: "Wheel tight and spins clean", next: 1 },
      ],
    },
    {
      ask: "Inspect the wheel, the housing, the mounting and the drains, then clamp the inducer amp draw against the motor nameplate. What did you find?",
      options: [
        { label: "Corrosion, missing or eroded blades, or condensate scale on the wheel", verdict: "On condensing furnaces the wheel lives in an acidic wet stream and thins out over time - replace the assembly." },
        { label: "Debris in the housing - insulation, rust flakes, or a piece of gasket", verdict: "That makes an intermittent rattle. Clear it, and check the mounting screws and gasket for a loose mount buzzing against the collector box." },
        { label: "Amp draw above the motor nameplate", verdict: "A motor pulling above nameplate is failing even if the noise seems tolerable. Verify the inducer housing and collector box drains are clear too, since standing water loads the motor." },
        { label: "Wheel, housing, mounting and amps all check good", verdict: "Put a manometer on the pressure switch port and confirm the draft the inducer is producing meets the switch setpoint with margin, not just barely." },
      ],
    },
  ],
  "s-inducer-pressure-switch-negative-pressure": [
    {
      ask: "Put a manometer on the switch port and read actual inducer housing pressure while the unit runs - do not jumper the switch out. What do you read?",
      options: [
        { label: "Solidly negative while the inducer runs", verdict: "That is the normal condition against a clear vent. The switch is seeing what it should, so look at the switch and its hose rather than the flue." },
        { label: "Weaker - less negative than expected", verdict: "A flue obstruction makes housing pressure less negative until the switch opens and integrated control A92 de-energizes the gas valve. Inspect the vent and intake terminations, the vent run, and the heat exchanger passages for restriction before suspecting the switch." },
      ],
    },
    {
      ask: "Check the sensing hose and the orifice plate while you are in there. What do you find?",
      options: [
        { label: "Hose has water, kinks, or soot in it", verdict: "Clear or replace the hose - that alone makes the switch read wrong. Re-verify proving through several cycles." },
        { label: "The wrong inducer orifice plate for the model is installed", verdict: "The switch reads through the orifice plate. Fit the correct plate for this model, then re-verify proving." },
        { label: "Hose and plate both check out", verdict: "Never jumper the pressure switch to keep a customer in heat - it is the safety that stops combustion into a blocked flue. Clear the restriction, verify the switch proves reliably through several cycles, and perform a CO check." },
      ],
    },
  ],
  "s-inlet-gas-pressure-sags-other-appliances": [
    {
      ask: "With a manometer on the gas valve inlet tap, fire the furnace alone, then start every other gas appliance in the house and watch inlet pressure. What does it do?",
      options: [
        { label: "Falls below the minimum on the furnace rating plate with everything running", verdict: "The problem is upstream - undersized pipe, a long run, too many fittings, a partially closed valve, or a meter and regulator undersized for the connected load. Add up total connected BTU load and compare against the capacity stamped on the meter and regulator." },
        { label: "Holds at or above the rating plate minimum with everything running", next: 1 },
      ],
    },
    {
      ask: "Check the pressure drop across the gas valve itself - inlet minus manifold. What do you get?",
      options: [
        { label: "More than about 1 in wc of drop across the valve", verdict: "That points at the valve, not the piping." },
        { label: "Less than about 1 in wc across the valve", verdict: "Neither the supply nor the valve is dropping out. Do not chase this by turning up the manifold pressure - that masks a sag and overfires the furnace when the other appliances are off." },
      ],
    },
  ],
  "s-inverter-board-heatsink-cooling": [
    {
      ask: "Find the drive board's heat sink and its cooling path, and check it while the compressor is under load.",
      options: [
        { label: "Dedicated heat sink cooling fan not running, or its airflow duct blocked", verdict: "On many designs that fan is separate from the main condenser fan. A dead cooling path here gets misdiagnosed as a compressor or refrigerant problem." },
        { label: "Heat sink fins packed with dust, debris, or an insect nest", verdict: "A clogged heat sink is a common, easily overlooked cause of inverter capacity reduction or shutdown. Clean it and retest under load." },
        { label: "Runs fine at mild ambient and low load, but reduces capacity or faults under sustained high load and high ambient", verdict: "That pattern points to thermal protection on the drive board rather than a compressor or charge issue." },
        { label: "Cooling airflow good and thermal paste/pad contact confirmed intact, and it still overheats or faults", verdict: "With cooling and thermal contact ruled out, treat it as a board/drive failure rather than a cooling problem." },
      ],
    },
  ],
  "s-inverter-compressor-fault-vs-mechanical": [
    {
      ask: "Pull the specific fault code from the outdoor board or thermostat, then ohm the compressor windings and check insulation to ground.",
      options: [
        { label: "Windings normal, but the drive consistently faults on start attempts (overcurrent, DC bus, IPM/drive module, phase loss)", verdict: "Suspect the drive/inverter board, DC bus capacitors, or the wiring between board and compressor - not the compressor. Inverter compressors are typically the more expensive part, so confirm before committing." },
        { label: "Winding failure confirmed - open, shorted, or grounded", verdict: "That is an actual electrical failure of the compressor, independent of the drive board." },
        { label: "Dramatically higher-than-normal current on a start attempt before the drive faults out, or the compressor will not turn freely", verdict: "That points to a locked rotor or mechanically seized condition." },
        { label: "Ran fine for a long time and then suddenly would not start with a drive fault code", verdict: "That history leans toward drive electronics. A unit that showed declining performance, unusual noise, or rising amps over time before failing leans mechanical instead." },
      ],
    },
  ],
  "s-inverter-compressor-soft-start-behavior": [
    {
      ask: "Watch the whole ramp from the start of a call, using the outdoor unit or thermostat speed/frequency display if it has one.",
      options: [
        { label: "Starts at low speed and steps up over seconds to a couple of minutes, then settles", verdict: "That is normal inverter soft-start behavior, intentional for mechanical protection and inrush limiting. Let the ramp finish before taking gauge readings for charge verification." },
        { label: "Never ramps past its minimum speed despite a big load or setpoint gap that should call for more", verdict: "That is a genuine fault. Check for a board-level capacity/speed fault code, refrigerant charge, or an airflow restriction limiting how hard it can safely ramp." },
        { label: "Ramps up, drops back down, and re-ramps repeatedly instead of settling", verdict: "Hunting at startup points to high head pressure, an airflow restriction, or a communication issue between the outdoor unit and the indoor/thermostat controlling capacity demand." },
        { label: "Pressures and amps look low, but you are only 30-60 seconds into the start cycle", verdict: "That is a mid-ramp snapshot, not a fault. Do not judge an inverter's startup against fixed-speed expectations." },
      ],
    },
  ],
  "s-inverter-compressor-speed-limits": [
    {
      ask: "Compare actual running frequency, if the unit displays it, against this model's published min/max range, and look at operating conditions.",
      options: [
        { label: "Running right at its rated maximum with very high or very low outdoor ambient", verdict: "It is behaving correctly even if it does not fully satisfy an extreme load. Extreme ambient often reduces allowable maximum frequency to protect the compressor and drive." },
        { label: "Speed clamped along with high discharge temperature, high condensing pressure, low suction, or a hot drive board/heat sink", verdict: "That is a board-imposed protective clamp - the compressor itself may be healthy. Fix the condition causing the clamp rather than the compressor." },
        { label: "Speed clamped low with moderate ambient, clean coils, good airflow and correct charge", verdict: "Check for a fault or warning code tied to drive current, DC bus voltage, or communication before accepting it as a real capacity limit." },
        { label: "Will not drop below minimum speed at very light load, overshooting setpoint or short cycling", verdict: "That is a design limit, not necessarily a fault, though it is worth checking the system is sized appropriately for a very light load space. Never force capacity by overcharging or bypassing a speed limit." },
      ],
    },
  ],
  "s-inverter-drive-protection-timing-fork": [
    {
      ask: "Clear the code and watch one full start attempt. When exactly does the unit trip?",
      options: [
        { label: "Trips immediately when the compressor is commanded, before it ramps", verdict: "Look at the drive and the compressor electrically. Check windings and insulation at the drive output, inspect the power module and its connectors, and verify the drive's own supply." },
        { label: "Ramps up and runs, then trips after several minutes", verdict: "This is a load problem. Check head pressure, outdoor coil cleanliness, the outdoor fan, and clearances, then verify charge before you touch the drive." },
        { label: "Trips only in heating, never in cooling", verdict: "Look at the indoor side in heating - indoor airflow, a dirty indoor coil, or a reversing valve that is not fully shifting will all drive the compressor into protection." },
        { label: "Trips at random and supply voltage dips at the same moment", verdict: "Chase the supply first. Undersized conductors, a loose lug at the disconnect, or a shared circuit can starve the drive and trip protection." },
      ],
    },
  ],
  "s-lennox-460v-dc-link-and-transformer-location": [
    {
      ask: "Confirm the supply power to this 460 V unit. What do you read?",
      options: [
        { label: "460 VAC within -10 percent", next: 1 },
        { label: "Outside 460 VAC within -10 percent", verdict: "Correct anything missing in the supply before diagnosing the inverter section." },
      ],
    },
    {
      ask: "You need the 460-to-230 step-down transformer. Where are you looking for it?",
      options: [
        { label: "In the control board cabinet", verdict: "It is not there on these units. Look in the lower left side of the unit near the compressor." },
        { label: "Lower left side of the unit near the compressor", verdict: "Right location. Now power the unit OFF for 15 to 20 minutes before opening the inverter compartment." },
      ],
    },
    {
      ask: "With the unit off 15 to 20 minutes, test the EMI PCB fuses, ohm the reactor with its wires removed, then disconnect the DC link connector from the FAN PCB (leave it on the Inverter PCB), restore power and read White to Yellow. What do you find?",
      options: [
        { label: "A fuse on the EMI PCB is open", verdict: "Replace the EMI PCB." },
        { label: "Reactor reads 5 ohms or more, or a leg is shorted to ground", verdict: "Replace the reactor - it must read less than 5 ohms and be open to ground on each leg." },
        { label: "Supply, fuses and reactor in range but DC link voltage is under 150 VDC", verdict: "Replace Inverter 1 and the Fan PCB, then power off 15 to 20 minutes before reconnecting harnesses." },
        { label: "Supply, fuses and reactor in range and DC link voltage is accurate", verdict: "Replace Inverter #1 PCB, then power off 15 to 20 minutes before reconnecting harnesses." },
      ],
    },
  ],
  "s-lennox-460v-e396-dc-link-sensor": [
    {
      ask: "On an E396, check incoming voltage first. What do you read?",
      options: [
        { label: "460 Vac within -10 percent", next: 1 },
        { label: "Below 460 Vac minus 10 percent", verdict: "Correct the supply first - do not measure the link or swap boards until incoming voltage is right. Check the transformer too, primary 460V and secondary 230V, in the lower left of the unit near compressor 1." },
      ],
    },
    {
      ask: "Power the unit off 15 to 20 minutes, then test the EMI PCB fuses and ohm the reactor coil with its wires removed. What did you find?",
      options: [
        { label: "A fuse on the EMI PCB is open", verdict: "Replace the EMI PCB." },
        { label: "Reactor open across the coil, or a leg shorted to ground", verdict: "Replace the reactor - it should read under 5 ohms across the coil and open to ground on each leg." },
        { label: "Fuses good, reactor under 5 ohms and open to ground on each leg", next: 2 },
      ],
    },
    {
      ask: "Disconnect the link voltage connector from the FAN PCB, leaving it on the inverter PCB, restore power and read white to yellow against the DC link voltage calculation on page 1. What do you get?",
      options: [
        { label: "Link voltage is accurate to the calculation", verdict: "The link voltage sensor lives in the Fan PCB - replace the Fan PCB." },
        { label: "DC link below 150 Vdc with supply, EMI fuses and reactor all in range", verdict: "Replace Inverter 1 and the Fan PCB." },
      ],
    },
  ],
  "s-lennox-a92-code-1-reversed-polarity": [
    {
      ask: "With power on, read the LED at the A92 control and note what the unit does on a call.",
      options: [
        { label: "LED is flashing code 1", verdict: "Code 1 is reversed line polarity - the first gate in the heating flow chart. Verify L1 and N are landed correctly at the furnace and check the branch circuit and any receptacle or junction upstream for swapped hot and neutral." },
        { label: "Polarity is right but 24V never leaves the control R terminal on a call", verdict: "Confirm the S47 rollout switch(es) are closed - the flow chart checks rollout next, and 24V does not leave R with a rollout open." },
        { label: "Control drops the gas valve and inducer and delays the blower off", verdict: "That is flame sensed with the gas valve de-energized. Reset the control by turning main power off, and find why flame is present with the valve off." },
        { label: "Polarity and rollout both good", next: 1 },
      ],
    },
    {
      ask: "Run a heat call and see how far the sequence gets.",
      options: [
        { label: "No 24VAC on W, or the S10 primary or S21 secondary limit is open", verdict: "The call or the limit string is stopping it. Prove 24VAC at W and both limits closed." },
        { label: "Inducer B6 runs but the S18 combustion air pressure switch never closes", verdict: "The 15 second pre-purge does not start until S18 closes. Chase the pressure switch circuit." },
        { label: "Ignitor R33 warms 20 seconds and GV1 opens for a 4 second trial", verdict: "That is the normal sequence. After flame proof the blower comes on at heat speed 30 seconds later, with a 5 second inducer post-purge and the selected blower off delay on satisfaction." },
      ],
    },
  ],
  "s-lennox-code-29-cooling-lockout": [
    {
      ask: "Read the thermostat display and measure the actual space temperature.",
      options: [
        { label: "Display shows '- -' for indoor temperature and the space is above 99F", next: 1 },
        { label: "Space is below 40F and cooling will not run", verdict: "That is code 30, the opposite end - no cooling is allowed until the space is above 40F. Check that cooling equipment is not stuck on and verify thermostat sensor accuracy." },
      ],
    },
    {
      ask: "Run the system in installer test mode, which bypasses the code 29 lockout while leaving mechanical safeties active, and stay on site. What happens?",
      options: [
        { label: "It runs and the space temperature starts dropping", verdict: "Working as intended - code 29 was blocking both heating and cooling. Stay on site until the space is back below the lockout point." },
        { label: "It stops again on a pressure trip or other mechanical safety alert", verdict: "Test mode still stops cooling on genuine mechanical safety alerts. That is a real fault - work the pressure trip." },
      ],
    },
  ],
  "s-lennox-code-35-contactor-transient": [
    {
      ask: "Code 35 means the thermostat asked a unit to start or stop and got no response for over 15 minutes. Confirm the unit actually responds to a call, then identify the system type.",
      options: [
        { label: "Communicating system", verdict: "Wire a transient voltage suppressor in parallel with the compressor contactor coil terminals at the outdoor unit. The part is a Littelfuse 5KP43CA bidirectional TVS diode; see Lennox note IAQ-10-01." },
        { label: "Non-communicating outdoor unit", verdict: "Wire suppressor 89W72 in parallel with the compressor contactor coil, or across Y1 and C on the indoor control board." },
        { label: "The unit does respond to the call but does the wrong thing", verdict: "Code 35 is about no response, not a wrong response. Chase that behavior separately rather than fitting a suppressor." },
      ],
    },
  ],
  "s-lennox-code-40-hp-lockout-balance-points": [
    {
      ask: "Check the low and high balance point settings. How far apart are they?",
      options: [
        { label: "Spread well over about 3 degrees F", verdict: "Set them as close together as practical - roughly a 3F spread, for example high 25F and low 22F. A wide spread nuisance-trips code 40 and finishes the job on expensive backup heat." },
        { label: "Already about a 3 degree spread", next: 1 },
      ],
    },
    {
      ask: "Code 40 means the zone did not move 0.5F toward setpoint in 30 minutes without defrosting. What do you find at the zone?",
      options: [
        { label: "Airflow to the zone or zones is starved", verdict: "Starved airflow keeps the zone from progressing toward setpoint, which is exactly what trips code 40. Correct the airflow." },
        { label: "Discharge air temperatures are low for the conditions", verdict: "The lockout is reporting a real inability to make progress. Work the heat pump capacity side." },
        { label: "Airflow and discharge air temperatures both check out", verdict: "Check room thermostat calibration - a mis-reading sensor produces a false 'not progressing' verdict. Also review the HP Heating Lockout Time under dealer control center > equipment > Smart Hub (default 120 minutes, range 60-240)." },
      ],
    },
  ],
  "s-lennox-comm-line-voltage-prechecks": [
    {
      ask: "Before touching the F1/F2 wiring, check the outdoor display and the red, green and yellow LEDs. What do you see?",
      options: [
        { label: "The outdoor PCBs are not lighting up at all", verdict: "Troubleshoot the outdoor unit before going any further. Do not chase the comm wire on a board with no power." },
        { label: "LEDs are lit and the display is showing errors", next: 1 },
      ],
    },
    {
      ask: "Verify incoming line voltage at L1 and 2N at the condensing unit. What do you read?",
      options: [
        { label: "208 VAC or 230 VAC, within -10 percent", next: 2 },
        { label: "Outside 208/230 VAC within -10 percent", verdict: "Correct the supply to the condensing unit before diagnosing anything on the communication side." },
      ],
    },
    {
      ask: "Check the fuses on the EMI PCB and verify voltage at the CN70 molex plug on the HUB PCB. What do you find?",
      options: [
        { label: "A fuse on the EMI PCB is open", verdict: "That is your dead power side. Address the EMI PCB before blaming the wire." },
        { label: "No 208/230 VAC within -10 percent at CN70 on the HUB PCB", verdict: "Power is not reaching the HUB PCB. Work back from CN70 rather than the comm wiring." },
        { label: "EMI fuses good and CN70 has proper voltage", verdict: "The power side checks good. Now verify the comm wires are landed on F1 and F2 with correct polarity, and that the cable is 16/2 stranded shielded with no breaks or splices." },
      ],
    },
  ],
  "s-lennox-constant-torque-ecm-taps": [
    {
      ask: "Shut off power, remove input connectors J48 and J49 from the motor, restore power, and check for tap voltage on the tap the system should be calling. What do you find?",
      options: [
        { label: "12 to 33VAC on the correct tap for the mode being called", verdict: "The board is energizing the right tap. If the manual's test 1 and test 2 both show correct voltage and the motor still does not operate properly, replace the motor - it is not field repairable." },
        { label: "The wrong tap is energized for the mode being called", verdict: "Chase the board output or the tap wiring rather than replacing the motor." },
        { label: "No tap voltage on any tap", verdict: "The motor is not being commanded at all. Work the board output and the tap wiring before condemning the motor." },
      ],
    },
  ],
  "s-lennox-cx35-txv-equalizer-bonnet": [
    {
      ask: "On this CX35 aluminum coil with a factory-installed TXV, back the flare nut off the male brass equalizer fitting at the suction line. What is under it?",
      options: [
        { label: "A copper flare seal bonnet - the shipping cap - still installed", verdict: "That is the fault. With the equalizer blocked the TXV diaphragm cannot sense evaporator outlet pressure, so it cannot control superheat. Remove and discard the bonnet, reconnect the equalizer line, then re-check superheat and subcooling after the system stabilizes." },
        { label: "No bonnet - the fitting is clear", verdict: "This service note does not apply here. Superheat that will not come down or stabilize on this coil needs a different cause." },
      ],
    },
  ],
  "s-lennox-e102-indoor-outdoor-comm": [
    {
      ask: "Go to the outdoor unit and look at the display and the red, green and yellow LEDs. What do you see?",
      options: [
        { label: "No lights on any outdoor PCB", verdict: "This is an outdoor power problem, not a comm problem. Stop and troubleshoot the outdoor unit - start by verifying L1 and 2N are 208vac/230vac within -10 percent." },
        { label: "Outdoor boards lit and showing their own error code", verdict: "Work that outdoor code first - the comm error is downstream of it." },
        { label: "Outdoor boards lit with no outdoor code", next: 1 },
      ],
    },
    {
      ask: "Check the F1/F2 run: landing and polarity, cable type, and anything spliced or wired into it. What did you find?",
      options: [
        { label: "F1 and F2 reversed or landed wrong", verdict: "Those terminals are polarity sensitive - land them correctly and re-test." },
        { label: "A break, a splice, or a condensate pump interrupting the run", verdict: "The run has to be a straight shot from the condensing unit to the indoor unit with no breaks or splices, and nothing - condensate pumps in particular - can interrupt it." },
        { label: "Correct 16/2 stranded shielded cable, straight run, correct polarity", verdict: "Remove power for at least 15 minutes, then disconnect and ohm out the F1/F2 pair and shield. If the wiring passes, run a temporary wire between indoor and outdoor and see whether the fault clears." },
      ],
    },
  ],
  "s-lennox-e190-pipe-check-failure": [
    {
      ask: "After an E190, walk every head and check the piping, the sensor locations, and the EEV coil connectors. What did you find?",
      options: [
        { label: "Gas and liquid pipes crossed between heads", verdict: "Correct the piping. Pipe check watches each indoor heat exchanger's temperature change, and crossed lines break that relationship." },
        { label: "An indoor sensor connected in the wrong location or on the wrong head", verdict: "A sensor on the wrong head or wrong pipe defeats the check. Land each unit's sensor in its proper location and re-run the pipe checking operation." },
        { label: "An EEV coil connector on the wrong valve, swapped, or detached", verdict: "Seat the EEV coil connectors on the correct valves and re-run the pipe checking operation." },
        { label: "Piping, sensors and coils all correct but one head showed no temperature change", verdict: "Check that head for an EEV malfunction, and check for a refrigerant leak or low charge - both prevent the expected temperature change." },
      ],
    },
  ],
  "s-lennox-e202-indoor-isolation": [
    {
      ask: "After the pipe check, land one indoor F1/F2 pair at a time on the condenser terminal block and power up each time. What happened as you worked through them?",
      options: [
        { label: "One pair produces E202 and the others do not", verdict: "Troubleshoot that indoor PCB." },
        { label: "Every pair produces E202 on its own", verdict: "Replace the outdoor main PCB." },
        { label: "No pair produces E202", verdict: "Go back to the basic checks: incoming line voltage on L1 and 2N at 208vac/230vac within -10 percent, F1/F2 landed with correct polarity, and the outdoor display or LEDs read for errors. Then restore all indoor pairs and confirm normal operation." },
      ],
    },
  ],
  "s-lennox-e202-outdoor-comm-circuit": [
    {
      ask: "With E202 confirmed at the outdoor display or wired remote, check connector CN31 on the outdoor main PCB and check the F1/F2 and 1(L)/2(N) landings against the electrical schematic. What did you find?",
      options: [
        { label: "CN31 loose or not fully seated", verdict: "Reseat the connector, power off 30 seconds and back on, and see whether the code clears." },
        { label: "Communication or power wires landed incorrectly at either end", verdict: "Correct them against the schematic - the F1/F2 pair and the 1(L)/2(N) power wires both have to be right at both ends." },
        { label: "Everything correct and E202 returns after a 30 second power cycle", verdict: "Inspect the outdoor main PCB communication circuit for a faulty communication IC or TVS diode, and replace the outdoor unit main PCB if the circuit is at fault." },
      ],
    },
  ],
  "s-lennox-e448-fan-locked-mechanical-first": [
    {
      ask: "Turn power off and wait 15 minutes, then check the fan blade mechanically before any electrical test. What do you find?",
      options: [
        { label: "Blade is obstructed by ice, debris, or contact with the shroud", verdict: "Clear it. A blade that cannot turn will keep tripping E448 no matter which board you replace." },
        { label: "Blade has drag, rough spots, or wobble when spun by hand", verdict: "It is not spinning freely, which is what E448 is reporting. Correct that before any electrical test." },
        { label: "Blade is loose on the motor shaft", verdict: "Secure the blade on the shaft - a loose blade will keep the locked code coming back." },
        { label: "Blade spins freely, is tight on the shaft, and the power and hall effect plugs are undamaged and secure", verdict: "The mechanical side is clean. Proceed to ohming the motor windings." },
      ],
    },
  ],
  "s-lennox-e469-dc-link-voltage-208-230": [
    {
      ask: "Check the incoming voltage to the unit first. What do you read?",
      options: [
        { label: "208 VAC or 230 VAC, within -10 percent", next: 1 },
        { label: "Outside 208/230 VAC within -10 percent", verdict: "Correct the supply before going any further into the inverter section." },
      ],
    },
    {
      ask: "Power the unit OFF for 15 to 20 minutes so the DC bus discharges - stored DC is lethal. Then check the EMI PCB fuses and ohm the reactor coil with its wires removed. What do you find?",
      options: [
        { label: "A fuse on the EMI PCB is open", verdict: "Replace the EMI PCB." },
        { label: "Reactor reads 5 ohms or more, or a leg is shorted to ground", verdict: "Replace the reactor - it should read less than 5 ohms and be open to ground on each leg." },
        { label: "EMI fuses good, reactor under 5 ohms and open to ground on each leg", next: 2 },
      ],
    },
    {
      ask: "Disconnect the DC link voltage connector from the FAN PCB, leaving it connected at the Inverter PCB, move the loose end somewhere safe, restore power and read White to Yellow. What do you read?",
      options: [
        { label: "Under 150 VDC, with supply, EMI fuses and reactor all in range", verdict: "Replace Inverter 1 and the Fan PCB. Leave the unit powered off 15 to 20 minutes before reconnecting any wire harness or the DC link connector." },
        { label: "DC link voltage reads accurate", verdict: "Replace Inverter #1 PCB. Power off 15 to 20 minutes again before reconnecting harnesses." },
      ],
    },
  ],
  "s-lennox-e5-voltage-protection": [
    {
      ask: "With the code confirmed as a voltage protection fault, measure the outdoor unit power supply between L1 and L2. What do you read?",
      options: [
        { label: "Inside 187 to 253 VAC", next: 1 },
        { label: "Outside 187 to 253 VAC", verdict: "Correct the supply problem before doing anything to the unit - the board is shutting down on an abnormal voltage rise or drop." },
      ],
    },
    {
      ask: "With supply confirmed good, measure DC at the IPM board P and N terminals - 277-356 VDC on 18-30 KBtu/h units, 277-410 VDC on 36 KBtu/h units. What do you read?",
      options: [
        { label: "Inside the window for that capacity", verdict: "Supply and DC bus both check good - the voltage protection is not coming from either of these." },
        { label: "Outside the window on a 4-zone MPA036 or MLA036", verdict: "On those units only, replace the bridge rectifiers and verify the system operates normally before going further." },
        { label: "Outside the window on any other model", verdict: "Replace the IPM board and re-check P to N." },
      ],
    },
  ],
  "s-lennox-el280-line-voltage-error-codes": [
    {
      ask: "Read the code off the seven-segment diagnostic LED before resetting anything. Which one is showing?",
      options: [
        { label: "E110", verdict: "Low line voltage, lower than the nameplate rating. Check and correct the power line voltage - the alarm clears 5 seconds after the fault recovers." },
        { label: "E111 or E112", next: 1 },
        { label: "E113 or E114", verdict: "E113 is high line voltage above the nameplate rating - bring supply voltage within the proper range. E114 is line voltage frequency out of range or no 60 Hertz power - check the voltage and line frequency, especially on a generator or inverter supply." },
        { label: "E115", verdict: "Low 24V, with a valid range of 18 to 30 volts. Measure 24V under load, look for power-robbing equipment on the system, and consider a larger VA transformer." },
      ],
    },
    {
      ask: "E111 and E112 are both wiring problems at the furnace. Which one is displayed?",
      options: [
        { label: "E111", verdict: "Reversed line power voltage wiring. Verify line and neutral are not swapped at the furnace - the system resumes 5 seconds after recovery." },
        { label: "E112", verdict: "Ground not detected and the system shuts down. Provide a proper earth ground, then the system resumes 5 seconds after recovery." },
      ],
    },
  ],
  "s-lennox-el280-second-stage-delay-dip": [
    {
      ask: "With the furnace confirmed configured for a single-stage thermostat, time an actual heat cycle from ignition to the step up in inducer and blower speed. What did you get, and what is the customer complaining about?",
      options: [
        { label: "Steps up at about 7 minutes and the customer says it takes too long to get warm", verdict: "7 minutes is the factory OFF position of DIP switch 2 and is already the shorter of the two settings. Leave it there - going to 12 minutes would make the complaint worse. Verify supply air temperature and that rise stays in the rating plate range at both stages." },
        { label: "Steps up at about 7 minutes and the house is overshooting or the cycles are too short", verdict: "Move DIP switch 2 to the ON position for a 12 minute recognition period, then re-time the cycle and re-check supply air temperature." },
        { label: "It never steps up at all", verdict: "Verify the thermostat stage selection switch before adjusting the delay - the recognition period only applies in single-stage thermostat mode." },
      ],
    },
  ],
  "s-lennox-el280-simultaneous-heat-call": [
    {
      ask: "With a two-stage thermostat and DIP switch 1 in the two-stage position, call for first and second stage heat at the same time and time the transition. What happens?",
      options: [
        { label: "Fires on first stage heat with the inducer on low and the blower on low heat speed, then switches to second stage after about 30 seconds", verdict: "Designed behavior. The EL280 always fires on first-stage heat and switches to second stage after 30 seconds of operation - nothing to repair." },
        { label: "Stays on low fire well past 30 seconds", verdict: "Check for a continuous second-stage call at the board terminal rather than only at the thermostat." },
        { label: "Steps up to second stage but the blower never changes to high heat speed", verdict: "Refer to the sequence of operation flow charts in the back of the manual for the exact step order before condemning the control." },
      ],
    },
  ],
  "s-lennox-el280-tstat-heat-stage-dip": [
    {
      ask: "Identify the thermostat actually installed, then with power off check DIP switch 1 (T STAT HEAT STAGE) on the integrated control. What do you have?",
      options: [
        { label: "Single-stage thermostat with DIP 1 still in the factory OFF position", verdict: "Wrong position for this application. Move DIP switch 1 to ON, which is the single stage thermostat setting." },
        { label: "Two-stage thermostat with DIP 1 OFF", verdict: "That is correct - OFF is the factory position for a two-stage thermostat. Confirm the unit fires low and steps up only on the second-stage call from the indoor thermostat." },
        { label: "Two-stage thermostat but DIP 1 has been switched ON", verdict: "Wrong position. ON is only for a single stage thermostat - put DIP 1 back to OFF." },
      ],
    },
    {
      ask: "With DIP 1 ON for a single stage thermostat, restore power, place a heat call and watch what the unit does.",
      options: [
        { label: "Fires on first-stage heat with the inducer on low speed and the blower on low heat speed, then steps up on its own", verdict: "Normal for single-stage thermostat mode - the burners always fire on first stage and the unit switches to second stage after the recognition period." },
        { label: "Fires low and never steps up to second stage", verdict: "The recognition period is not completing. Re-verify the thermostat stage selection and the DIP 1 position before chasing anything else." },
      ],
    },
  ],
  "s-lennox-el280dfek-ignition-error-codes": [
    {
      ask: "Read the two-part status error code during the failed trial for ignition.",
      options: [
        { label: "2 + 3", verdict: "The first-stage low fire pressure switch did not close within 2.5 minutes, so the gas valve, inducer, and blower shut off and the unit waits 5 minutes before retry. Chase the pressure switch circuit." },
        { label: "4 + 7", verdict: "The ignitor is open or disconnected - the inducer and ignitor shut off and the code holds until the ignitor is replaced or reconnected." },
        { label: "4 + 8", verdict: "Low line voltage. The control drops the inducer and ignitor when voltage falls below 90 volts and holds the signal until voltage rises above 95 volts. Fix the supply." },
        { label: "No error code - it lights but drops out", next: 1 },
      ],
    },
    {
      ask: "Watch the trial and the flame current after the gas valve opens.",
      options: [
        { label: "Flame is not proven within 4 seconds and the gas valve drops with the inducer still running", verdict: "Count the tries - five consecutive failures during a single heat demand is the flow chart's lockout branch." },
        { label: "Flame proves, then a 4 second stabilization and the rectification current check runs", verdict: "That is the normal sequence. Compare the measured flame current against the flow chart reference of 0.19 microamps and the diagnostic table in the manual for that unit before condemning the sensor." },
        { label: "Pressure switch closes and a 15 second pre-purge or inter-purge runs with a heartbeat on the status LED", verdict: "Normal - a 15 second combustion air inducer pre-purge, or a 15 second inter-purge on a retry. Keep watching the 20 second ignitor warm-up next." },
      ],
    },
  ],
  "s-lennox-el297dfvk-12pin-harness-pinout": [
    {
      ask: "Back-probe the 12-pin main harness with 24VAC hot at pin 5 referenced to 24VAC return at pin 9. Which circuit reads open?",
      options: [
        { label: "Pin 3 has voltage but pin 11 does not", verdict: "The rollout switch is not passing voltage - pin 3 is rollout input and pin 11 is rollout switch output. That is your open safety." },
        { label: "Pin 6 is dead", verdict: "The high limit string is not intact. Chase the limit circuit." },
        { label: "Pin 12 or pin 2 is dead", verdict: "Pin 12 is the low pressure switch and pin 2 is the high pressure switch - that tells you which stage is not proving." },
        { label: "All the safety pins read normal", next: 1 },
      ],
    },
    {
      ask: "Check the gas valve pins and the thermostat terminal strip.",
      options: [
        { label: "No voltage at pin 1, 7, or 8 when the stage should be commanded", verdict: "Pin 1 is main valve high, pin 7 main valve low, pin 8 main valve common. The control is not commanding the stage you expect." },
        { label: "The call is landed on the wrong thermostat terminal", verdict: "Confirm the call is on the right terminal: W1 low stage heat, W2 high stage heat, G fan, Y1 low stage cool, Y2 high stage cool, C common, R 24VAC to the thermostat, O reversing valve." },
        { label: "Unit is a low-GWP model with LGWP1/LGWP2 and ALARM wiring in the harness area", verdict: "Note the LGWP1 and LGWP2 sensor interfaces and the ALARM dry contact for the audible leak alarm before disturbing that wiring." },
      ],
    },
  ],
  "s-lennox-eleh-second-stage-electric-heat-chain": [
    {
      ask: "Apply W1, then W2, and note which element banks come on.",
      options: [
        { label: "Neither bank energizes on W1 or W2", verdict: "No element bank energizes with the primary limit S15 or secondary limit S20 open. Check both limits first. Disconnect all power before opening the electric heat section - this circuit is line voltage throughout." },
        { label: "HE1 and HE2 come on but HE3 and HE4 never do", next: 1 },
        { label: "On an ELKP heat pump, W2 brings on only one pair of elements", verdict: "On an ELKP, W2 should energize both K9 and K19 so HE1/HE2 and HE3/HE4 both come on. Verify W2 is reaching both relays." },
      ],
    },
    {
      ask: "With W2 applied, trace the second stage chain. Where does it stop?",
      options: [
        { label: "K19 contactor never energizes", verdict: "The W2 demand is not getting into the second stage chain. Prove W2 at the unit and the K19 coil circuit." },
        { label: "K19 energizes and K19-1 closes, but the K32 relay never picks up", verdict: "K19-1 energizes one side of contactor K16, which energizes one side of K32. Check that leg before touching the contactor." },
        { label: "K32-1 closes but the K16 contactor does not pull in", verdict: "K32-1 is what energizes K16 so K16-1 can close and feed HE3 and HE4. K16 is your suspect." },
      ],
    },
  ],
  "s-lennox-elka-vfd-blower-stuck-low-speed": [
    {
      ask: "Add a Y2 demand and check the K264 inverter speed switching relay. What do you find?",
      options: [
        { label: "No voltage on the K264 coil and K264-1 stays closed", verdict: "The A183 signal is still going to A96 RL, which is low speed. Chase the K264 coil circuit rather than the inverter." },
        { label: "K264 coil is energized but K264-1 does not open", verdict: "Bad K264-1 contacts are holding the RL low speed signal in place. Replace the relay before suspecting the A96 inverter." },
        { label: "K264 energizes, K264-1 opens, and the blower still stays low", verdict: "The signal should have moved to A96 RM for medium speed. With K264 proven, the A96 inverter side is next." },
        { label: "C1 or Y1 input to the A183 board is not energized on the Y1 demand", verdict: "The board never got a proper cooling demand. Fix the inputs before judging any speed switching." },
      ],
    },
    {
      ask: "If the thermostat looks completely dead on this unit, check the A96 for an alarm condition. What do you find?",
      options: [
        { label: "A96 is in alarm and K232-2 is open", verdict: "That alarm de-energizes the K232 inverter protection relay and K232-2 opens, cutting thermostat power. It reads as a dead thermostat - clear the A96 alarm." },
        { label: "No A96 alarm and K232-2 is closed", verdict: "Thermostat power is not being cut by the inverter protection relay. Work the thermostat circuit itself." },
      ],
    },
  ],
  "s-lennox-f1-f2-bus-voltage-pcb-decision": [
    {
      ask: "Remove power for at least 15 minutes, disconnect the F1 and F2 comm wires at both indoor and outdoor, reapply power with the wires still off, and measure DC voltage across F1/F2 at each unit with a true RMS meter. What do you read?",
      options: [
        { label: "Both the indoor and outdoor readings fall between 0.1 and 0.9 VDC", verdict: "Both boards are putting out proper bias, so neither PCB is the failure. Remove power 15 minutes, run a temporary wire between indoor and outdoor and restore power to confirm the fault clears before pulling permanent cable." },
        { label: "The INDOOR reading falls outside 0.1 to 0.9 VDC", verdict: "That indoor board is the failed PCB. Replace it." },
        { label: "The OUTDOOR reading falls outside 0.1 to 0.9 VDC", verdict: "That outdoor board is the failed PCB. Replace it." },
      ],
    },
  ],
  "s-lennox-f5-outdoor-fan-speed-error": [
    {
      ask: "Power off the outdoor unit, wait three minutes, restart, and watch. Does the code come back?",
      options: [
        { label: "Code does not return", verdict: "The board stopped the unit on fan speed too slow (300 RPM) or too fast (2400 RPM) for a predefined time and it did not repeat. Note it and move on." },
        { label: "Code returns", next: 1 },
      ],
    },
    {
      ask: "Shut off the power supply, inspect all components for damage, and rotate the fan by hand. How does it turn?",
      options: [
        { label: "Binds, drags, or the wheel and shaft do not spin evenly and balanced", verdict: "It should offer little resistance and spin evenly and balanced - this is mechanical. Replace the fan motor if the motor is at fault." },
        { label: "Spins freely, evenly and balanced", next: 2 },
      ],
    },
    {
      ask: "Check all wiring connections at the fan motor and the outdoor main control, then run the outdoor fan check from the E8 / EC 07 procedure. What happens?",
      options: [
        { label: "A faulty connection turned up", verdict: "Correct the connection and re-run the fan check to see whether the unit operates normally." },
        { label: "Motor and wiring both test good and the fan check still fails", verdict: "Replace the outdoor main control board." },
      ],
    },
  ],
  "s-lennox-fan-connector-swap-pcb-vs-motor": [
    {
      ask: "Remove power for at least 15 minutes, reverse BOTH the fan motor power plug and the hall effect plug between fan motor 1 and fan motor 2, restore power and read the code. What comes up?",
      options: [
        { label: "The original error returns unchanged (E447, E448, E478 or E487)", verdict: "The fault stayed with the board position, so it did not follow the motor. Replace the fan PCB." },
        { label: "The code changes to its 3-series counterpart (E447 to E347, E448 to E348, E478 to E378, E487 to E387)", verdict: "The fault followed the motor. Replace the fan motor." },
        { label: "Results are inconclusive", verdict: "If you have an inverter checker tool, continue on to the inverter fan PCB test. Remove power for 15 minutes before restoring the plugs to their original positions." },
      ],
    },
  ],
  "s-lennox-fan-pcb-inverter-checker-k2": [
    {
      ask: "Remove power for at least 15 minutes, remove the fan connections from the Fan PCB, connect the inverter checker tool, restore power and press the K2 button 11 times to run the fan motor 1 inverter test. What is the result?",
      options: [
        { label: "The inverter test fails", verdict: "Replace the Fan PCB. Remove power again before disconnecting the checker and restoring the fan harnesses." },
        { label: "The inverter test passes", verdict: "The board drives its output correctly, so replace the fan motor. Remove power again before disconnecting the checker and restoring the fan harnesses." },
      ],
    },
  ],
  "s-lennox-furnace-primary-limit-check": [
    {
      ask: "Before touching the limit, measure temperature rise across the heat exchanger and compare it to the range printed on the rating plate.",
      options: [
        { label: "Rise above the rating plate range", next: 1 },
        { label: "Rise within the rating plate range", verdict: "Airflow checks out, so now the limit itself is a fair suspect. Test it for correct opening temperature and reset per Lennox service note H-04-9 (document CORP0419L7)." },
      ],
    },
    {
      ask: "With a high rise, work the airflow side. What do you find?",
      options: [
        { label: "Dirty filter, dirty blower wheel, high duct static, or closed supply registers", verdict: "That is the overtemperature source and the limit is reporting a real condition. Correct the airflow and recheck the rise before replacing anything." },
        { label: "Filter, wheel, duct static, and registers all check out", verdict: "Check blower speed tap or ECM airflow setting against the rating plate for the installed capacity - a wrong airflow setting produces the same high rise." },
      ],
    },
  ],
  "s-lennox-g71mpp-blower-off-delay": [
    {
      ask: "Place a thermometer in the supply plenum, run a full heat cycle to satisfaction, and record supply air temperature at the exact moment the blower is de-energized. What did you get?",
      options: [
        { label: "Above 110F", verdict: "Blower is stopping too soon. Lengthen the off delay on switches 4 and 5 - longer settings give lower supply temperatures. On the G71MPP, 120 seconds is On/Off and 180 seconds is On/On. Verify against the table for your control revision, since these values differ from other Lennox models." },
        { label: "Below 90F", verdict: "Blower is running too long. Shorten the delay - 60 seconds is switch 4 Off / switch 5 On. Verify against the G71MPP table for your control revision." },
        { label: "Between 90 and 110F", verdict: "On target. Leave switches 4 and 5 at the 90 second factory Off/Off position, and leave the 45 second blower-on delay alone - it is not adjustable." },
      ],
    },
  ],
  "s-lennox-g71mpp-watchguard-reset": [
    {
      ask: "Pull the stored error codes from the integrated control before disturbing anything. What is in there?",
      options: [
        { label: "Ignition lockout codes stored even though the furnace is running now", verdict: "The watchguard reset the control on its own, which is why nothing shows at the unit. Treat it as a real intermittent lockout and work the ignition sequence instead of calling the system healthy." },
        { label: "No stored codes", verdict: "Ask the customer how long the outages last - a watchguard reset means the furnace returns on its own after a delay. Then safely observe a full ignition sequence: inducer start, pressure switch proving, igniter warm up, gas valve opening, and flame proving." },
      ],
    },
    {
      ask: "Measure the flame signal in microamps and compare against the minimum listed for this control. What do you read?",
      options: [
        { label: "Below the minimum listed for this control", verdict: "Weak flame sense is the likely intermittent dropout. Work the flame sense circuit before anything else." },
        { label: "At or above the minimum listed", verdict: "Flame sense is not the weak link. Inspect the pressure switch hoses, inducer wheel, and condensate drain for the intermittent causes of a proving failure." },
      ],
    },
    {
      ask: "Before leaving, check the control configuration against the installed equipment. What do you find?",
      options: [
        { label: "DIP switches and on-board links match the installed thermostat and outdoor equipment", verdict: "Configuration is right. The intermittent is in the ignition or proving circuit you have already narrowed down." },
        { label: "A DIP switch or on-board link does not match the installed thermostat or outdoor equipment", verdict: "Correct the configuration to match what is installed - a mismatch here can produce intermittent behavior the watchguard keeps hiding." },
      ],
    },
  ],
  "s-lennox-igniter-plug-pin-count": [
    {
      ask: "Identify the exact Lennox model (for example EL296UHV, EL297DFEK, ML296DFV, ML180UHE), then look up whether it uses the 4-pin or 5-pin igniter plug and which terminals to probe. What does the manual call for on your model?",
      options: [
        { label: "A model that reads across terminals 1 and 5", verdict: "Probe terminals 1 and 5 with power off. Reading anywhere else on this plug will give you nonsense numbers." },
        { label: "ML180UHE, which reads across terminals 2 and 4", verdict: "Probe terminals 2 and 4 on this model, not 1 and 5. That is the difference that produces the bad readings." },
      ],
    },
    {
      ask: "With power off, read resistance at the correct terminals for your model. What do you get?",
      options: [
        { label: "39 to 70 ohms", verdict: "The igniter circuit reads good at the control plug for these nitride igniters. Do not condemn a control board on an earlier reading taken at the wrong terminals." },
        { label: "0 or infinity", verdict: "Move to the 2-pin jack-plug near the manifold and read the igniter directly to separate a wiring fault from a failed igniter. Use small diameter probes for any voltage test so the plug contacts are not spread or damaged." },
      ],
    },
  ],
  "s-lennox-igniter-three-test-isolation": [
    {
      ask: "Test 1, power off: remove the igniter plug at the integrated control and read ohms across the two igniter terminals identified for your model. What do you read?",
      options: [
        { label: "39 to 70 ohms", next: 2 },
        { label: "0 or infinity", next: 1 },
      ],
    },
    {
      ask: "Test 2: separate the 2-pin jack-plug near the manifold and read the igniter itself. What do you read?",
      options: [
        { label: "39 to 70 ohms at the igniter", verdict: "The igniter is good and the fault is in the wiring between the jack-plug and the control. Chase that harness instead of replacing the igniter." },
        { label: "Still 0 or infinity at the igniter", verdict: "Replace the igniter." },
      ],
    },
    {
      ask: "Test 3: reassemble the igniter circuit, restore power and read AC voltage at the control plug during the 20-second igniter warm up, using small diameter probes so the plug is not damaged. What do you read?",
      options: [
        { label: "120 volts plus or minus 10 percent", verdict: "The whole circuit reads good. Reassemble, close the blower door interlock properly, and run a full heat cycle to confirm ignition and flame proving." },
        { label: "Below 120 volts minus 10 percent", verdict: "Check the supply voltage to the furnace rather than replacing parts." },
      ],
    },
  ],
  "s-lennox-igniter-voltage-warmup-check": [
    {
      ask: "With the igniter circuit connected and a heat call initiated, insert small diameter probes into the igniter terminals at the control plug and read AC volts during the 20 second warm up period. What do you read?",
      options: [
        { label: "120 volts plus or minus 10 percent", verdict: "Full voltage is reaching the igniter terminals, so the supply is not the problem. The igniter is not producing glow with correct voltage applied to it." },
        { label: "Below 120 volts minus 10 percent", verdict: "Do not replace the igniter. Check the supply voltage coming into the furnace and the line connections - look for loose terminations, a marginal disconnect, or undersized or long branch wiring feeding the furnace." },
      ],
    },
    {
      ask: "After correcting the supply, recheck igniter voltage during warm up and watch the igniter. What happens?",
      options: [
        { label: "Voltage now reads 120 volts plus or minus 10 percent and the igniter reaches full glow", verdict: "The supply was the fault. Confirm the burners light within the normal sequence." },
        { label: "Voltage is now correct but the igniter still does not reach full glow", verdict: "The supply is proven good, so the igniter is the failed part." },
      ],
    },
  ],
  "s-lennox-indoor-eeprom-e162-e163": [
    {
      ask: "Note exactly which code is present and which indoor unit it belongs to. Which is it?",
      options: [
        { label: "E163, indoor EEPROM option error", next: 1 },
        { label: "E162, indoor EEPROM error", verdict: "Replace the indoor unit PCB for the affected head. Inspect the EEPROM circuit components for missing, damaged or bad-solder parts while you are in there." },
      ],
    },
    {
      ask: "With all units off, do you have the correct indoor option code for that unit?",
      options: [
        { label: "Yes - the correct option code for that unit is known", verdict: "Reset the indoor option code for that unit; E163 often clears once the option code is re-entered. Restart and confirm the code clears before closing up." },
        { label: "No - the correct option code is not known", verdict: "Replace the indoor unit PCB." },
      ],
    },
  ],
  "s-lennox-indoor-sensor-e121-e123-e154": [
    {
      ask: "Read the code on the affected head, then inspect the indoor PCB and every sensor wire connection. Which code is it?",
      options: [
        { label: "E121, indoor room temperature sensor", verdict: "Open or short fault on that sensor. A detached or pinched connector reads the same as a failed sensor, so check the wiring first, then replace the sensor and confirm it is clipped in the correct location in the return path." },
        { label: "E122 or E123, indoor heat exchanger in or out temperature sensor", verdict: "Open or short fault on the sensor the code names. Check the wiring, then replace that sensor and confirm the replacement is clipped in the correct location on the coil." },
        { label: "E154, indoor fan error", verdict: "Work the indoor fan motor circuit rather than the sensors." },
      ],
    },
  ],
  "s-lennox-inducer-prepurge-postpurge-normal": [
    {
      ask: "Time the inducer run before ignition and after burner shutdown on this EL296/EL297/ML296. What do you get?",
      options: [
        { label: "About 15 seconds before ignition and about 5 seconds after the gas valve closes", verdict: "That is the control designed pre-purge and post-purge, not a fault. Explain it to the customer and move on." },
        { label: "Inducer runs far longer than the pre-purge with no ignition", verdict: "Stop treating it as normal. Troubleshoot pressure switch proving and the ignition sequence instead." },
        { label: "The inducer never stops", verdict: "Check for a stuck pressure switch, a shorted control output, or a miswired inducer circuit." },
      ],
    },
    {
      ask: "On a two-stage model, watch the inducer through both stages of heat. What does it do?",
      options: [
        { label: "Inducer speed changes between first and second stage heat", verdict: "Correct operation. Before leaving, verify the vent and intake terminations are clear and perform a CO check in the equipment space." },
        { label: "Inducer stays at one speed through both stages", verdict: "It is not following the stage change. Confirm the 120VAC combustion air inducer is being controlled by integrated control A92 on this model family and check for a miswired inducer circuit." },
      ],
    },
  ],
  "s-lennox-lrp-defrost-test-pin-window": [
    {
      ask: "Walk back exactly how the jumper was used on the TEST pins. Which one describes it?",
      options: [
        { label: "Jumper was already sitting in the TEST position when the unit was powered up", verdict: "The control ignores the test pins in that condition. Clear the jumper, power the unit up without it, then apply the jumper across the TEST pins for 2 seconds to enter defrost." },
        { label: "Jumper was left across the TEST pins past 7 seconds total", verdict: "Defrost terminates in that case and the test option will not function again until the jumper is removed and reapplied. Pull it, reapply it, and take it off before the additional 5 second period elapses." },
        { label: "Jumper applied for 2 seconds and removed before 7 seconds total, and it still will not enter defrost", next: 1 },
      ],
    },
    {
      ask: "With clean jumper timing it still will not enter test mode. Check the defrost thermostat and the defrost timing jumper. What do you find?",
      options: [
        { label: "Defrost thermostat is open and not jumpered", verdict: "Test mode only starts with the defrost thermostat closed or jumpered. Close or jumper it and repeat the test." },
        { label: "Early style defrost control with the timing jumper on something other than 90 minutes", verdict: "Move the defrost timing jumper to the 90 minute interval before testing. On early defrost controls the control will not enter defrost test mode otherwise." },
      ],
    },
  ],
  "s-lennox-lrp-two-stage-compressor-unloader": [
    {
      ask: "Apply a second stage cooling demand and meter rectifier plug D4.",
      options: [
        { label: "No AC voltage reaching D4", verdict: "The second stage signal is not getting to the rectifier. Chase the thermostat second stage circuit before touching the compressor." },
        { label: "AC in but no DC out of D4", verdict: "D4 has failed. Without DC output the L34 unloader solenoid cannot close the vent port, so the compressor stays at low capacity regardless of the thermostat." },
        { label: "Good DC out of D4 but L34 does not close the slider ring", verdict: "The solenoid is your suspect. With L34 not energized the slider ring stays open, venting gas from the first suction pocket and holding low capacity." },
      ],
    },
    {
      ask: "Watch how the unit behaves when it should step.",
      options: [
        { label: "Compressor stops and restarts between stages", verdict: "That is not how this compressor stages - stepping happens during a single thermostat demand with the motor running continuously. Find what is dropping the demand." },
        { label: "First stage works and the stages modulate back and forth with demand", verdict: "First and second stage are supposed to operate independently and modulate with thermostat demand - that is not erratic staging." },
        { label: "First stage never runs either", verdict: "Trace Y1 through the S4 high pressure switch to the K1 compressor contactor, then through the low pressure switch S87 back to the common side of the 24VAC power." },
      ],
    },
  ],
  "s-lennox-lrp14hp-nuisance-lps-trips": [
    {
      ask: "Before chasing the switch, confirm the charge and note the conditions when it trips.",
      options: [
        { label: "Charge is correct, and it trips below 30F outdoor with high humidity at the end of a long heating cycle just before defrost", next: 1 },
        { label: "Charge is actually low", verdict: "Then this is a genuine low-charge lockout, not the service-note nuisance trip. Find and repair the leak." },
      ],
    },
    {
      ask: "Find the field-selectable defrost timer setting on the control board. What is it set to?",
      options: [
        { label: "90 minutes - the factory default", verdict: "That is the cause: the coil ices enough to pull pressures down before defrost initiates. Change it to 60 minutes - Lennox reproduced the failure at 90 and corrected it at 60." },
        { label: "Already on 60 minutes and still tripping", verdict: "In consistently humid areas, near water, or where sleet and ice storms are common, 30 minutes may perform better." },
        { label: "Already on 30 minutes", verdict: "That is the shortest option and the right one for humid or icy locations. Look past the defrost timer for this trip." },
      ],
    },
  ],
  "s-lennox-minisplit-comm-f1f2": [
    {
      ask: "Start at the outdoor unit: 208/230 VAC +/-10% at L1 and 2N, and check the outdoor display and the red, green, and yellow LEDs. What do you have?",
      options: [
        { label: "Outdoor PCBs are not lighting up at all", verdict: "Troubleshoot the outdoor unit power and boards before going any further into the F1/F2 pair." },
        { label: "Line voltage in range and the outdoor board is lit", next: 1 },
      ],
    },
    {
      ask: "Remove power for a minimum of 15 minutes, disconnect both ends of F1/F2, keep the conductors separated, and ohm between F1 and F2 and to the shield. What do you read?",
      options: [
        { label: "Any resistance at all on any combination", verdict: "Replace the wire. It must be 16/2 stranded and shielded in a straight run from condenser to indoor unit with no breaks or splices - and confirm nothing like a condensate pump interrupts the run." },
        { label: "Open on every combination", next: 2 },
      ],
    },
    {
      ask: "With F1/F2 still disconnected, restore power and read DC voltage on F1/F2 at both indoor and outdoor with a true-RMS meter.",
      options: [
        { label: "0.1 to 0.9 VDC at both ends", verdict: "Both PCBs are producing correct bias. Prove the wire itself: remove power 15 minutes, run a temporary wire between indoor and outdoor, and re-power." },
        { label: "Out of the 0.1 to 0.9 VDC range at one end", verdict: "Replace the corresponding PCB - the board at the end reading out of range. Confirm the pair lands on F1 and F2 with correct polarity on reassembly." },
      ],
    },
  ],
  "s-lennox-minisplit-condensate-float-e153": [
    {
      ask: "Look at the drain pan and the float switch connector on the PCB. What do you find?",
      options: [
        { label: "Drain pan is full", verdict: "The float is being held up and the fault is being reported correctly. Troubleshoot the condensate pump and inspect the condensate lines for blockage." },
        { label: "Connector not fully seated, or the switch is damaged or binding", verdict: "Reseat the connector and replace a damaged or binding switch, then retest." },
        { label: "Pan is empty and the connector is fully seated", next: 1 },
      ],
    },
    {
      ask: "Power off, disconnect the float switch, and test continuity with the float DOWN.",
      options: [
        { label: "Reads open (OL) with the float down", verdict: "Replace the float switch - it should show continuity with the float down." },
        { label: "Shows continuity with the float down and the code still persists", verdict: "The float switch is good. Move on to troubleshooting the PCB." },
      ],
    },
  ],
  "s-lennox-minisplit-e203-single-fan-condenser": [
    {
      ask: "Power the unit off at the disconnect for at least 15 minutes, disconnect the fan motor connection plug at the outdoor PCB, restore power and watch for the error. What happens?",
      options: [
        { label: "E203 does not return with the fan motor unplugged", verdict: "Replace the fan motor - it is dragging the main-to-sub communication down." },
        { label: "E203 returns with the fan motor unplugged", next: 1 },
      ],
    },
    {
      ask: "Power the unit off again, disconnect the wire harness between the Inverter PCB and the Main PCB, and check continuity end to end. What do you find?",
      options: [
        { label: "No continuity through the harness", verdict: "Replace the harness." },
        { label: "Harness is continuous end to end", verdict: "Replace both the Inverter PCB and the Main PCB." },
      ],
    },
  ],
  "s-lennox-minisplit-e203-two-fan-condenser": [
    {
      ask: "Power the unit off for at least 15 minutes, disconnect BOTH fan motor connection plugs at the outdoor PCB, then restore power. Does E203 return?",
      options: [
        { label: "E203 does not return with both fans unplugged", next: 1 },
        { label: "E203 returns with both fans unplugged", next: 2 },
      ],
    },
    {
      ask: "Power off, plug fan motor 1 back into the Inverter PCB and restore power. If nothing, power off again and repeat with fan motor 2. Which one brings the error back?",
      options: [
        { label: "Error returns with fan motor 1 connected", verdict: "Replace fan motor 1." },
        { label: "Error returns with fan motor 2 connected", verdict: "Replace fan motor 2." },
        { label: "Error returns only with both fans connected", verdict: "Power the unit off and go to the wire harness between the Inverter and Main PCB - check continuity and replace the harness if it is not continuous." },
      ],
    },
    {
      ask: "Power the unit off and disconnect the wire harness between the Inverter and Main PCB, then check continuity. What do you find?",
      options: [
        { label: "No continuity through the harness", verdict: "Replace the harness." },
        { label: "Continuity is present", verdict: "Replace both the Inverter PCB and the Main PCB." },
      ],
    },
  ],
  "s-lennox-minisplit-point-check": [
    {
      ask: "Run the point check (spot check) function on the outdoor control board and compare each sensor value against the resistance tables in the service manual.",
      options: [
        { label: "One sensor reads wildly out of range and its connector is good", verdict: "That is your sensor. Sensor faults are the most common mini-split codes - replace it." },
        { label: "One sensor is out of range but its connector is loose or dirty", verdict: "Reseat and clean the connector, then re-read the point check before ordering a sensor." },
        { label: "All sensor values track the tables", verdict: "The sensors are good, so use the rest of the point check operating data instead of back-probing. On multi-zone outdoor units the manual documents a separate multi-zone spot check function." },
      ],
    },
  ],
  "s-lennox-ml-el-ignitor-resistance-isolation": [
    {
      ask: "TEST 1 - with power off, remove the HSI/CAI 4-pin plug from the integrated control and check the ohms across terminals 2 and 4. What do you read?",
      options: [
        { label: "Between 39 and 70 ohms", verdict: "That value is correct and this is the only test needed - the igniter and the wiring to the control are good." },
        { label: "0 or infinity", next: 1 },
      ],
    },
    {
      ask: "TEST 2 - separate the 2-pin jack-plug near the manifold and check the resistance of the igniter right there. What do you read?",
      options: [
        { label: "Between 39 and 70 ohms at the jack-plug", verdict: "The igniter is fine but the 4-pin reading was not - the problem is the wiring between the jack-plug and the control. Repair or replace that harness." },
        { label: "Also 0 or infinity at the jack-plug", verdict: "The igniter itself is the problem - replace the igniter." },
      ],
    },
  ],
  "s-lennox-ml-el-ignitor-supply-voltage": [
    {
      ask: "With the igniter already ohming 39 to 70 ohms, put small diameter probes into terminals 2 and 4, call for heat, and read AC volts during the 20 second warm up. What do you read?",
      options: [
        { label: "120 volts plus or minus 10 percent", verdict: "The control is delivering igniter voltage as it should - look elsewhere." },
        { label: "Below 120 volts minus 10 percent", next: 1 },
      ],
    },
    {
      ask: "Check the supply voltage to the furnace itself. What do you find?",
      options: [
        { label: "Furnace supply voltage is low too", verdict: "Correct the supply voltage to the furnace before condemning the control." },
        { label: "Supply voltage to the furnace is correct", verdict: "Supply is right but the control still will not deliver 120 volts to the igniter during warmup - the integrated control is at fault." },
      ],
    },
  ],
  "s-lennox-ml15kspv-defrost-never-initiates": [
    {
      ask: "Check the entry conditions before touching any DIP setting. Which one is not met?",
      options: [
        { label: "Compressor has not run continuously for at least 10 minutes", verdict: "That is the first entry condition - defrost will not start without it." },
        { label: "Accumulated runtime since the last defrost or power-up is under 55 minutes", verdict: "Defrost needs 55 minutes of accumulated runtime. Let it run and accumulate." },
        { label: "Power has been cycled at the disconnect during the visit", verdict: "Cycling high-voltage power resets that runtime timer and clears runtime memory, which alone can explain no defrost after a service visit. Leave power on and let runtime build." },
        { label: "Run times are met but nothing initiates", next: 1 },
      ],
    },
    {
      ask: "Read ambient temperature Tao and both defrost sensors Te and Tc.",
      options: [
        { label: "One of the three is open, shorted, or badly mounted", verdict: "The control compares Tao against the lower of Te and Tc. A bad sensor kills the comparison - replace or remount it." },
        { label: "All three read plausibly but the triggering condition comes and goes", verdict: "The condition has to persist 5 consecutive minutes. A condition that comes and goes will never trigger defrost." },
        { label: "All three read fine and the condition holds", verdict: "Confirm which mode the unit is configured for - thresholds differ between normal defrost and strong defrost, and strong defrost applies when the severe climate DIP setting is enabled. Compare against the defrost timing chart before adjusting DIPs." },
      ],
    },
  ],
  "s-lennox-ml16kp2-no-24v-at-outdoor-unit": [
    {
      ask: "There is no transformer in this condenser - the indoor unit transformer feeds it. Read 24 VAC at the indoor board first.",
      options: [
        { label: "No 24 VAC at the indoor board", verdict: "The outdoor unit is dead because its supply is dead. Chase a blown indoor fuse or a broken low-voltage conductor before opening the condenser." },
        { label: "24 VAC good at the indoor board", next: 1 },
      ],
    },
    {
      ask: "With a cooling demand at Y1, trace the outdoor low-voltage path.",
      options: [
        { label: "Voltage at terminal Y but nothing past the S4 high pressure switch", verdict: "S4 is open and stopping the call before the K1 compressor contactor coil." },
        { label: "Good voltage upstream but the contactor coil is dead", verdict: "Continue the trace through the low pressure switch S87 back to the common side of the 24VAC power - an open S87 leaves the contactor dead with good voltage upstream." },
        { label: "K1 closes and B1 and B4 run, but the unit will not reach high capacity", verdict: "For second stage, confirm voltage reaches rectifier plug D4, which converts AC to DC to energize the L34 unloader solenoid and close the slider ring." },
        { label: "Compressor and outdoor fan stop immediately at the end of the demand", verdict: "Normal - Y1 de-energizes, K1 drops out, K1-1 opens, and both stop. There is no fan-off delay here to mistake for a fault." },
      ],
    },
  ],
  "s-lennox-ml180-flame-signal-mode": [
    {
      ask: "Hold the diagnostic push button next to the seven-segment LED, release when F is displayed to select Flame Signal mode, then run a heat call and read microamps on the LED. How does it compare to the minimum flame signal for this control?",
      options: [
        { label: "Below the minimum flame signal listed for this control", verdict: "Weak flame signal confirmed without breaking into the sensor lead. Clean or replace the sensor, then re-read in flame signal mode to confirm the improvement." },
        { label: "At or above the minimum listed", verdict: "Flame sense is not your problem - do not clean or replace the sensor on assumption. Hold the button and release on E to pull the most recent 10 error codes and work from there." },
      ],
    },
  ],
  "s-lennox-ml180-w914-link-clip": [
    {
      ask: "With power off and zero volts confirmed, look at the W914 on-board link on the ML180 integrated control. What do you find?",
      options: [
        { label: "W914 is still intact", verdict: "That is why the DH/DS input does nothing. Clip W914 as the board legend directs so the DH/DS terminal functions - do not clip any other link without instructions." },
        { label: "W914 has already been clipped", verdict: "Configuration is right, so the fault is elsewhere. Restore power and force a dehumidification call or zone control signal, and do not confuse the neighboring interfaces - LGWP1/LGWP2 sensor inputs, the ALARM dry contact, and the ZONE dry contact." },
      ],
    },
    {
      ask: "Confirm what is actually landed on the DH/DS terminal.",
      options: [
        { label: "A dehumidification control or a Harmony III zone control", verdict: "Correct application for clipping W914. Restore power and test that the furnace responds to the call." },
        { label: "Something else, or nothing at the DH/DS terminal", verdict: "W914 only applies to a dehumidification control or a Harmony III zone control on DH/DS. Do not clip it for any other reason, and use the LGWP TEST push button only to test low GWP functionality, not as a reset." },
      ],
    },
  ],
  "s-lennox-ml180uhe-cai-orifice": [
    {
      ask: "With power and gas off, remove the inducer orifice plate and read its stamped size, then match it against the model on the rating plate (045E36A 1.063 in., 070E36B 1.316 in., 090E48B and 090E60C 1.531 in., 110E60C 1.690 in., 135E60D 1.940 in.). What do you find?",
      options: [
        { label: "The stamped size matches the model in the table", next: 1 },
        { label: "The stamped size does not match the model", verdict: "Wrong plate - that is your chronic proving fault. Install the correct orifice plate for this model. Do not compensate by changing the pressure switch." },
      ],
    },
    {
      ask: "With the correct plate installed, restore power and measure the pressure in the inducer housing during operation. What do you read?",
      options: [
        { label: "Negative pressure, and the switch closes and stays closed through a full heat cycle at the actual installed vent length", verdict: "Proving is good. Inspect the vent and intake terminations for blockage and run a combustion/CO check to close out the repair." },
        { label: "Pressure is not negative as expected, or the switch drops out during the cycle", verdict: "Inspect the pressure switch hose and port for water, soot, or cracks, and check the vent and intake terminations for blockage before calling the proving fault resolved." },
      ],
    },
  ],
  "s-lennox-ml180uhe-inducer-pressure-switch": [
    {
      ask: "Put in a heat call and watch the combustion air inducer (B6). What does it do?",
      options: [
        { label: "Inducer runs but the gas valve never opens", next: 1 },
        { label: "Inducer does not run at all", verdict: "The inducer is a 120VAC motor controlled by integrated control A92. Chase the 120VAC to the motor and the control output before looking at the pressure switch." },
      ],
    },
    {
      ask: "Check the vent system for obstruction and verify the combustion air inducer orifice against the manual table. What do you find?",
      options: [
        { label: "Obstruction found in the vent system", verdict: "An obstruction makes housing pressure less negative, which opens the pressure switch, and control A92 de-energizes the gas valve immediately. Clear the obstruction - the safety was doing its job." },
        { label: "Vent clear but the inducer orifice does not match the model in the manual table", verdict: "Install the orifice specified for that model. The orifice differs for each model." },
        { label: "Vent clear and the correct orifice installed", verdict: "Move to the ignition side: the nitride ignitor should measure 39 to 70 ohms and see 120VAC. Also verify the furnace is wired with correct polarity and properly grounded, since these units contain polarity sensitive electronic components." },
      ],
    },
  ],
  "s-lennox-ml196-ignitor-three-tests": [
    {
      ask: "Test 1: pull the HSI/CAI 4-pin plug from the control and read ohms across terminals 2 and 4. What do you get?",
      options: [
        { label: "Correct ohms value", next: 2 },
        { label: "Reads 0 or infinity", next: 1 },
      ],
    },
    {
      ask: "Test 2: separate the 2-pin jack-plug near the manifold and read the resistance of the ignitor right at the plug. What do you get?",
      options: [
        { label: "Between 39 and 70 ohms", verdict: "The ignitor is good. With test 1 wrong and test 2 right, the problem is the wiring between the jack-plug and the control." },
        { label: "Outside 39 to 70 ohms", verdict: "The ignitor is the issue. Replace it." },
      ],
    },
    {
      ask: "Test 3: insert small diameter meter probes into terminals 2 and 4 so you do not damage the plug, and read voltage during the 20 second ignitor warm up period. What do you measure?",
      options: [
        { label: "120 volts plus or minus 10 percent", verdict: "The control is delivering ignitor voltage as it should, and test 1 was correct, so the ignitor circuit checks out." },
        { label: "Below 120 volts minus 10 percent", verdict: "Check for correct supply voltage to the furnace rather than replacing the ignitor." },
      ],
    },
  ],
  "s-lennox-ml296-ground-and-e125-codes": [
    {
      ask: "Read the stored code from the seven-segment diagnostic display before clearing anything. Which is it?",
      options: [
        { label: "E112", verdict: "Ground not detected and the system shuts down. Provide proper earth ground to the unit - operation resumes 5 seconds after the fault recovers. Inspect the ground conductor at the junction box, at the disconnect, and back to the panel for loose lugs or paint under a screw." },
        { label: "E117", verdict: "Poor ground detected - treat it as a warning only. Improve the grounding path and the warning clears 30 seconds after the fault recovers." },
        { label: "E113", verdict: "Verify line voltage is not higher than the nameplate rating and correct the supply." },
        { label: "E125", next: 1 },
      ],
    },
    {
      ask: "E125 means the control failed its self check on an internal or hardware error, which covers flame sense circuit faults and pin shorts. Are any grounding or line voltage codes stored alongside it?",
      options: [
        { label: "E112 or E117 is also stored", verdict: "Fix the grounding first - a poor ground can drive flame sense faults. Do not replace the board yet." },
        { label: "E113 is also stored", verdict: "Correct the high line voltage first, then see whether E125 comes back." },
        { label: "E125 is the only code stored", verdict: "A genuine control self-check failure. The control will restart if the error recovers - replace it only with grounding and line voltage already proven good." },
      ],
    },
  ],
  "s-lennox-multizone-isolate-indoor-comm-fault": [
    {
      ask: "After 15 minutes with power off and the required pipe check complete, strip the condenser terminal block to ONE set of indoor F1/F2 wires, restore power and watch the display. Work through every pair one at a time. What did you find?",
      options: [
        { label: "Only one pair produces the comm error", verdict: "Troubleshoot that indoor unit PCB - the rest of the bus is clean." },
        { label: "Every pair produces the error on its own", verdict: "Replace the outdoor Main PCB." },
        { label: "No pair produces the error individually and you have not tested them all yet", verdict: "Keep going. Remove power from the condenser, disconnect that pair, land the next indoor pair, and repeat until every pair has been tested individually." },
      ],
    },
  ],
  "s-lennox-ohm-f1-f2-run-and-shield": [
    {
      ask: "Before ohming anything, walk the comm cable end to end. What do you find?",
      options: [
        { label: "16/2 stranded shielded, running unspliced from the condensing unit through the indoor units", next: 1 },
        { label: "Wrong cable type, or a break or splice somewhere in the run", verdict: "Lennox requires 16/2 stranded shielded cable in a straight run or true daisy chain with no breaks or splices. Replace the run." },
        { label: "A condensate pump interrupts F1 or F2 somewhere in the run", verdict: "Nothing may interrupt F1 or F2, including a condensate pump. Reroute so the pair runs unbroken." },
      ],
    },
    {
      ask: "With power off 15 minutes and both ends of F1 and F2 disconnected and kept separated from each other, ohm between F1 and F2 and from each conductor to the shield. What do you read?",
      options: [
        { label: "Any resistance on any of those readings", verdict: "The cable is compromised. Replace it." },
        { label: "No resistance on any of those readings", next: 2 },
      ],
    },
    {
      ask: "Wire nut one end of the pair together and ohm the pair again from the other end. What do you read?",
      options: [
        { label: "You now read continuity through the pair", verdict: "The run is intact. Land F1 and F2 observing polarity when reconnecting - these terminals are polarity sensitive." },
        { label: "Still no resistance with one end tied together", verdict: "The run is open. Replace it." },
      ],
    },
  ],
  "s-lennox-outdoor-fan-winding-and-hall-check": [
    {
      ask: "Remove power to the condensing unit for at least 15 minutes, then inspect the fan blade for obstructions and spin it by hand, and follow the wiring for damage to wires or plugs. What do you find?",
      options: [
        { label: "Blade is obstructed or does not spin freely", verdict: "Clear the obstruction and correct the drag before any electrical test - a blade that cannot turn keeps the code coming back no matter which board you replace." },
        { label: "Damage to a wire or plug, or a loose plug or spade connector", verdict: "Repair the wiring and make sure every plug and spade connector is secure and connected correctly before ohming anything." },
        { label: "Blade spins freely and all wiring and plugs are undamaged and secure", next: 1 },
      ],
    },
    {
      ask: "Unplug the fan motor power plug (fan motor 1 is on the left-hand side of the unit and uses the white plug) and ohm red to white, white to black, and red to black, then each lead to ground. What do you read?",
      options: [
        { label: "All three winding readings equal to each other and under 10 ohms, and every leg open to ground", verdict: "Windings are good. Move on to the connector swap test or the inverter checker test." },
        { label: "A winding reads unequal, open, or grounded", verdict: "Replace the fan motor." },
      ],
    },
  ],
  "s-lennox-outdoor-pcbs-dark-emi-hub": [
    {
      ask: "With no PCB lit at the outdoor unit, measure incoming line voltage on L1 and 2N at the condensing unit. What do you read?",
      options: [
        { label: "208vac/230vac within -10 percent", next: 1 },
        { label: "Outside 208vac/230vac within -10 percent", verdict: "Correct the supply to the condensing unit first - nothing downstream means anything until the unit is fed properly." },
      ],
    },
    {
      ask: "Test the fuses on the EMI PCB, then check for 208vac/230vac within -10 percent at the CN70 molex plug on the HUB PCB. What did you find?",
      options: [
        { label: "A fuse on the EMI PCB is open", verdict: "Replace the EMI PCB." },
        { label: "Line voltage good at the terminals but missing at CN70", verdict: "Trace and repair the harness feeding the HUB PCB." },
        { label: "Fuses good and correct voltage present at CN70", verdict: "The boards are being fed. Once they power up, go back to the indoor communication diagnosis." },
      ],
    },
  ],
  "s-lennox-outdoor-will-not-power-up": [
    {
      ask: "Measure outdoor power L to N at the terminal block and check whether the LEDs on the outdoor main PCB and inverter PCB are on. What do you have?",
      options: [
        { label: "220V at the terminal block but no LEDs lit on the PCBs", verdict: "Power is reaching the unit but not the boards - work the connection between the terminal block and the PCB." },
        { label: "No 220V at the terminal block", verdict: "Confirm the AC power is connected correctly at the terminal block and work the supply. Turn the main power switch or breaker off, wait 30 seconds, turn it back on and re-measure." },
        { label: "220V present and the PCB LEDs are on", verdict: "The outdoor unit is powered. Confirm the indoor unit input power is 220V and that the wired remote controller is connected correctly." },
      ],
    },
  ],
  "s-lennox-point-check-mode-and-exv": [
    {
      ask: "Read item 1, outdoor unit mode, on the point check display. What is it showing?",
      options: [
        { label: "oF (holding state), ol (return oil mode), or dE (defrost)", verdict: "Those are normal modes where the unit intentionally is not producing capacity - do not call it a failure." },
        { label: "Co (cooling) or He (heating) with nothing being produced", next: 1 },
      ],
    },
    {
      ask: "Read item 3, outdoor fan speed step, and item 4, opening of EXV, remembering item 4 is the actual value divided by 10 and rounded. What do you see?",
      options: [
        { label: "EXV pinned closed or wide open during a normal operating mode", verdict: "That is a metering problem - the valve position does not match the mode the board says it is in." },
        { label: "Fan speed step commanded and the EXV at a sensible opening", verdict: "The board is commanding the fan and the valve normally. Read item 0, outdoor unit capacity, and confirm the code matches the model you are working on." },
      ],
    },
  ],
  "s-lennox-point-check-refrigerant-temps": [
    {
      ask: "Read item 5, target refrigerant temperature, and item 6, current refrigerant temperature, both in F - ETS values in cooling, CTS in heating. How do they compare?",
      options: [
        { label: "Current temperature never approaches target", verdict: "That points at capacity, charge, or the EXV - not at the thermostat." },
        { label: "Current temperature works toward target", next: 1 },
      ],
    },
    {
      ask: "Compare the board's own sensors against your instruments - item 7 (Tao) against your thermometer, and items 8 (TC), 9 (Te), 10 (Ts) and 11 (Td) against your gauge and clamp readings. What do you see?",
      options: [
        { label: "One of the board's readings disagrees with your instrument", verdict: "That is a lying sensor - catch it here before you touch the charge or condemn anything else." },
        { label: "Board readings line up with your instruments", verdict: "The board is seeing the system correctly. Read item 12, compressor input current, together with item 2, compressor speed, and item 13 module temp if it has been tripping on inverter-related faults. Record the whole set in one pass, since the values are live." },
      ],
    },
  ],
  "s-lennox-r454b-leak-response": [
    {
      ask: "Watch what the blower is actually doing over a few minutes. Which pattern?",
      options: [
        { label: "Blower runs high to purge, finishes a 7-minute cycle, then normal operation resumes on its own", next: 1 },
        { label: "Blower runs constantly and never finishes a 7-minute cycle", verdict: "That is the Fault mode, not the leak sequence - a sensor or config problem. Look for E151/E152 (sensor fault), E154/E155 (sensor comm or DIP config), or E160/E161 (wrong sensor type)." },
      ],
    },
    {
      ask: "Check the furnace display and how many times the purge has run.",
      options: [
        { label: "E150 shown and it has purged more than once", verdict: "Repeated purge cycles mean an active leak. Ventilate, no ignition sources, leak-search the indoor coil and line connections, repair, then verify charge." },
        { label: "E150 shown once and the system has run normally since", verdict: "Treat it as a real A2L leak until proven otherwise and leak-search the indoor coil and line connections. The code cannot be cleared while a sensor still smells refrigerant." },
      ],
    },
  ],
  "s-lennox-r454b-sensor-dip-config": [
    {
      ask: "Count the leak sensors actually plugged into this furnace and compare against the LGWP1/LGWP2 DIP switch positions. What do you have?",
      options: [
        { label: "No sensor fitted - furnace-only, heat-only, or R-410A coil - but both DIPs still at the factory ENABLE", verdict: "That is exactly why the blower runs continuously. Set both to Disable, power-cycle, and press the Low GWP test button to verify." },
        { label: "One sensor fitted with LGWP1 Enable and LGWP2 Disable", next: 1 },
        { label: "One sensor fitted but both DIPs Enabled", verdict: "Mismatch between hardware and configuration. Set LGWP2 to Disable for a single-sensor job, power-cycle, then press the Low GWP test button." },
        { label: "DIPs set Disable/Enable - 1 off, 2 on", verdict: "That is an INVALID configuration. Set it to a valid combination for the number of sensors actually installed." },
      ],
    },
    {
      ask: "Check where that lone sensor is plugged in and the condition of the connection.",
      options: [
        { label: "Sensor is on the LGWP2 plug", verdict: "A lone sensor on LGWP2 faults. Move it to the LGWP1 (SENSOR 1) plug and retest." },
        { label: "On LGWP1 but the Molex clip is not locked, or there is dust, debris, or moisture", verdict: "Reseat and clean the connection, and route the wire through the grommet with a drip loop below the board on upflow so condensate cannot track onto the control." },
        { label: "On LGWP1, clean and locked, and it still throws E154", verdict: "E154 with good wiring usually means the DIP configuration is still wrong. Recheck it against the sensor count and confined-space requirement." },
      ],
    },
  ],
  "s-lennox-reactor-ohm-test": [
    {
      ask: "With the unit off 15 to 20 minutes and the wires removed from the reactor coil, ohm across the coil and check each leg to ground. What do you get?",
      options: [
        { label: "Less than 5 ohms across the coil and open to ground on each leg", verdict: "The reactor tests good. Continue with the EMI fuse and DC link voltage checks before condemning any inverter board." },
        { label: "Open across the coil", verdict: "Replace the reactor." },
        { label: "A leg reads shorted to ground", verdict: "Replace the reactor." },
      ],
    },
  ],
  "s-lennox-s40-comm-error": [
    {
      ask: "With only the R wire connected at the indoor board, meter every other disconnected wire back to 24V Common. What is the highest reading?",
      options: [
        { label: "All disconnected wires read 0.7 VAC or less", verdict: "No inductive bleed at that board. Repeat the same check at the outdoor unit and at the thermostat, then verify R to C reads normal 24VAC and check the I+/I- pair at all three points." },
        { label: "One or more wires read above 0.7 VAC", verdict: "That is inductive voltage bleeding onto the communication bus and it will cause comm errors. Re-run or re-bundle that conductor away from line-voltage wiring, or replace the run if damaged." },
      ],
    },
  ],
  "s-lennox-s40-defrost-dualfuel": [
    {
      ask: "Go to Menu > Settings > Advanced Settings > View Support Service Control Center > Equipment Settings > Heat Pump. What is the Defrost Termination Temp set to?",
      options: [
        { label: "Still at the 50F factory default", verdict: "Too low for most climates. Lennox recommends changing it to 90F, or 100F in cold climates, on every heat pump install." },
        { label: "Already set to 90F or higher", next: 1 },
      ],
    },
    {
      ask: "Check Equipment Settings > Thermostat > Balance Point Control.",
      options: [
        { label: "Still at the HBP 50F / LBP 25F defaults", verdict: "Defaults were never changed. Set them to the values agreed with the customer: above the High Balance Point the heat pump runs alone, between High and Low 1st stage is heat pump and 2nd stage switches to the furnace, below the Low Balance Point the furnace runs alone." },
        { label: "Balance points were set to the agreed values", verdict: "Settings are right. Note that Lennox does not recommend locking the heat pump out entirely at any outdoor temp when it is paired with an air handler with backup electric heat." },
        { label: "Not a dual-fuel system", verdict: "Balance Point Control does not apply here. The defrost termination temp is the setting that matters on this install." },
      ],
    },
  ],
  "s-lennox-s40-wifi": [
    {
      ask: "Go to Menu > Settings > Wi-Fi, select the network, and read the RSSI.",
      options: [
        { label: "Weaker than -70, for example -80", verdict: "Signal is too weak and the S40 will not hold a connection. Improve signal at the thermostat before chasing anything else." },
        { label: "Stronger than -70, for example -65", next: 1 },
      ],
    },
    {
      ask: "Look at which network it joined and check Thermostat Connectivity Status.",
      options: [
        { label: "It is joined to a Guest network", verdict: "Never use a Guest network - it will not maintain a reliable connection. Move it to the main network." },
        { label: "It is on 5.0 GHz while the router also broadcasts 2.4 GHz", verdict: "Put it on the 2.4 GHz band instead." },
        { label: "Fewer than three green checkmarks in Connectivity Status", verdict: "It has not reached the Lennox server. Re-check the network credentials and the signal strength." },
        { label: "Three green checkmarks showing", verdict: "It reached the Lennox server, so the cloud connection is good." },
      ],
    },
  ],
  "s-lennox-s40-zone-control-not-detected-2": [
    {
      ask: "Work through the commissioning screens to the Equipment Found screen. Is a Zone Control icon listed?",
      options: [
        { label: "Zone Control icon is present", verdict: "The system has detected the damper control module. Press continue and proceed with commissioning." },
        { label: "Zoning control is not listed", next: 1 },
      ],
    },
    {
      ask: "Verify the damper control module is actually installed and powered, check every wiring connection to it and correct anything wrong, then run Re-Configure System and recheck the Equipment Found screen. What now?",
      options: [
        { label: "Zone Control icon now appears", verdict: "Power or wiring was the problem. Continue commissioning from that screen." },
        { label: "Still no Zone Control icon", verdict: "Confirm the module has power and status indication before replacing it. This is a hardware or wiring issue, not a thermostat setting." },
      ],
    },
  ],
  "s-lennox-secondary-limit-blower-compartment": [
    {
      ask: "Kill power, pull the blower compartment door, and ohm the secondary limit on the back side of the blower housing with the furnace cool. What do you get?",
      options: [
        { label: "No continuity with the limit cool", verdict: "An open cold limit has already tripped or failed. Do not just reset or replace it - look for the cause of excess heat in the blower compartment." },
        { label: "Continuity with the limit cool", verdict: "The secondary limit is closed right now. Verify the blower runs at the correct speed on a heat call and the wheel is not slipping on the shaft, then measure total external static pressure and compare delivered CFM against the model's blower table." },
      ],
    },
  ],
  "s-lennox-shielded-comm-cable": [
    {
      ask: "On this S30/E30/S40, iHarmony, or PCO3S system, look at what the communication pair is actually wired with.",
      options: [
        { label: "Standard 18 AWG 4-conductor thermostat cable", verdict: "That is the known cause of intermittent or continuous comm faults - induced voltage couples between conductors or from nearby line voltage. Re-run the comm pair in 18-22 gauge one-pair shielded cable with ground before condemning any control." },
        { label: "One-pair shielded cable with ground", next: 1 },
      ],
    },
    {
      ask: "Check how the shield is landed and how the pair is routed.",
      options: [
        { label: "Shield landed at both ends", verdict: "Land the shield/drain wire on the indoor unit's C terminal only and cut it off at the other end so it is grounded at one point." },
        { label: "Comm pair bundled or in a raceway with line-voltage conductors", verdict: "Separate them physically. Running the communication pair alongside line voltage produces the same intermittent faults." },
        { label: "Shield landed at C only and the pair kept clear of line voltage", verdict: "The wiring is proven, which is exactly what Lennox asks for before a control is replaced. A good board on bad wire looks identical to a bad board, and you have ruled the wire out." },
      ],
    },
  ],
  "s-lennox-sl22klv-e410-e413-pressure-lockouts": [
    {
      ask: "Read the alert code at the outdoor control or the communicating thermostat. Which 41x code is it?",
      options: [
        { label: "E410 Service Soon", verdict: "The unit cycled off on low pressure protection - the suction pressure logic opens below 25 psig and closes above 80 psig. It clears when protection opens or on a power reset. Work the low pressure causes." },
        { label: "E411 Service Urgent", verdict: "Low pressure protection opened five times within one hour and the outdoor unit is locked out. It clears only after a power reset - then work the low pressure causes." },
        { label: "E412 Service Soon", verdict: "The high pressure switch opened - it opens at 590 psig and closes at 418 psig. It clears when the switch closes or on a power reset. Work the high pressure causes." },
        { label: "E413 Service Urgent", verdict: "The high pressure switch opened five times within one hour and the unit is locked out. Power reset it, then chase the high pressure cause." },
      ],
    },
    {
      ask: "On a low pressure code, work the low side. What turns up?",
      options: [
        { label: "Charge is off or the TXV has a restriction", verdict: "Correct the charge and check the TXV - both are listed causes on the low pressure codes." },
        { label: "Indoor blower or filters are blocked, or the evaporator coil is dirty", verdict: "Restore indoor airflow and clean the coil. Blockage at the blower or filters shows up as low pressure protection." },
        { label: "Refrigerant filter is clogged", verdict: "Replace the clogged refrigerant filter - it is on the low pressure cause list for these units." },
      ],
    },
    {
      ask: "On a high pressure code, what do you find?",
      options: [
        { label: "Outdoor unit is dirty or the charge is high", verdict: "Clean the outdoor unit and confirm the charge. Also check for a clogged TXV or refrigerant filter." },
        { label: "Blockage at the indoor blower", verdict: "Clear the blockage at the indoor blower - it is a listed high pressure cause." },
        { label: "Trips happen in heating with indoor or zone CFM set low", verdict: "Low indoor CFM, or low zone CFM on a zoned system, is a listed cause of high pressure trips on these units. Raise the airflow setting." },
      ],
    },
  ],
  "s-lennox-slp99-blower-off-delay": [
    {
      ask: "Put a thermometer in the supply plenum, run a full heat cycle to satisfaction, and read supply air temperature at the exact moment the blower is de-energized. What did you get?",
      options: [
        { label: "Above 110F", verdict: "The blower is stopping too soon. Lengthen the off delay on switches 4 and 5 - longer settings give lower supply temperatures. 180 seconds is On/Off and 210 seconds is On/On; confirm against the table for your control revision." },
        { label: "Below 90F", verdict: "The blower is running too long and the customer feels the cold draft. Shorten the delay - 90 seconds is switch 4 Off / switch 5 On. Confirm against the table for your control revision." },
        { label: "Between 90 and 110F", verdict: "You are on target. Leave switches 4 and 5 at the 120 second factory Off/Off setting, and leave the 45 second blower-on delay alone - it is not adjustable." },
      ],
    },
    {
      ask: "After changing switches 4 and 5, restore power and repeat the supply air measurement at blower shutdown. What do you read now?",
      options: [
        { label: "Now between 90 and 110F", verdict: "Done. Document the final switch positions for the next tech." },
        { label: "Still outside 90 to 110F", verdict: "Step to the next setting in the table in the same direction and re-measure - longer off delays give lower supply temperatures, shorter settings give higher." },
      ],
    },
  ],
  "s-lennox-slp99-condensate-shared-drain": [
    {
      ask: "On this shared furnace-and-coil drain, measure how far the field-provided vent rises above the condensate drain outlet connection - and note the orientation.",
      options: [
        { label: "Upflow, vent rises 1 to 2 inches above the outlet", next: 1 },
        { label: "Upflow, vent rises more than 2 inches above the outlet", verdict: "Above the max. If the combined primary drain restricts, that height lets water flood the heat exchanger. Bring it into the 1 to 2 inch range." },
        { label: "Horizontal, vent rises 4 to 5 inches above the outlet", next: 1 },
        { label: "Horizontal, vent rises more than 5 inches above the outlet", verdict: "Above the horizontal max. Bring it into the 4 to 5 inch range or a restricted primary drain will flood the heat exchanger." },
      ],
    },
    {
      ask: "With vent height correct, check the trap, the clean-out, and the line slope.",
      options: [
        { label: "Trap or clean-out is plugged", verdict: "That is the restriction that started the backup. Pull and clean the trap and clean-out, then prime the trap with water before startup." },
        { label: "Line slopes less than 1/4 inch per foot from furnace to trap", verdict: "Re-slope the line to a minimum of 1/4 inch per foot. The trap may sit up to 5 feet from the furnace on PVC." },
        { label: "Trap, clean-out, and slope all check out", verdict: "Check the shared line itself for the restriction - the combined primary drain is what backs water into the heat exchanger." },
      ],
    },
  ],
  "s-lennox-slp99-ignition-sequence": [
    {
      ask: "Watch a full heat call and note exactly where in the sequence it dies.",
      options: [
        { label: "Nothing runs at all at the start of the call", verdict: "Check that the low-fire pressure switch is OPEN at idle - a closed or bypassed switch blocks the heat cycle from ever starting, and jumping it out makes it worse." },
        { label: "Inducer runs but the switch never proves within 2-1/2 minutes", verdict: "The control drops into vent calibration. Work the vent-calibration scenario - venting, tubing, trap, and inducer pressure." },
        { label: "Switch proves, 15-second prepurge and 20-second warm-up happen, then the 4-second trial fails", next: 1 },
      ],
    },
    {
      ask: "During the failed trial, watch the ignitor and the burner closely. What do you see?",
      options: [
        { label: "No glow from the ignitor at all", verdict: "Ignitor circuit - the SureLight ignitor or its drive is not being powered." },
        { label: "Ignitor glows but there is no light-off", verdict: "Gas supply or gas valve. The heat is there and the fuel is not." },
        { label: "Burner lights then drops out", verdict: "Flame sensing. Flame is being made but not proven, so the control retries." },
        { label: "It has already gone quiet and restarts about an hour later", verdict: "After 5 failed trials the control enters Watchguard-Flame Failure and waits 60 minutes before restarting. Pull the stored error history with the diagnostic button on solid 'E' to see what the board actually logged." },
      ],
    },
  ],
  "s-lennox-slp99-three-stage-timed-mode": [
    {
      ask: "Confirm a single-stage thermostat is installed, then place a heat call and time the steps. What do you see?",
      options: [
        { label: "Inducer at 35 percent at light off, up to 70 percent after the 7 or 12 minute delay, up to 100 percent 10 minutes after that", verdict: "Normal three stage timed ramping, not a fault. Explain the changing sound and airflow to the customer as normal capacity modulation before chasing a noise complaint." },
        { label: "It ramps correctly but the customer wants the first step sooner or later", verdict: "Change only the field selectable 7 or 12 minute first step selection using the DIP switch table in the installation instructions. The second 10 minute delay is factory set and non-adjustable." },
        { label: "It never reaches the full rate on design days", verdict: "Verify the thermostat selection and the second stage delay settings before touching the gas valve." },
      ],
    },
  ],
  "s-lennox-slp99-variable-capacity-mode-switch": [
    {
      ask: "With a two-stage thermostat confirmed installed, watch a full heat cycle and note how the firing rate behaves. What do you see?",
      options: [
        { label: "It steps between two fixed rates only", verdict: "The control is in conventional two-stage mode, which is the factory default. Power down and select variable-capacity mode with switch 2 using the setting table in the installation instructions." },
        { label: "The rate varies continuously", verdict: "Already in variable-capacity mode. On a low fire call expect 35 percent held until satisfied; on a high fire call expect 70 percent if it was below 60 percent, or a 10 percent step if it was above 60 percent, then another 10 percent every 5 minutes." },
        { label: "The rate changes but the indoor blower does not adjust with it", verdict: "Chase the blower configuration rather than the firing rate - the blower is supposed to adjust automatically at each rate." },
      ],
    },
  ],
  "s-lennox-slp99-vent-calibration": [
    {
      ask: "Before touching the switch or control, check the intake and exhaust terminations and the vent run. What do you find?",
      options: [
        { label: "Blocked termination - snow, ice, debris, or a nest", verdict: "That is your failed calibration. Clear it, then force a manual calibration from Field Test mode and confirm 'CAL' runs through." },
        { label: "Vent length or elbow count over the sizing tables, or a sagging section holding condensate", verdict: "The venting cannot make the pressure switch differential in 2-1/2 minutes. Correct the vent before condemning the switch or the control." },
        { label: "Terminations clear and the vent matches the sizing tables", next: 1 },
      ],
    },
    {
      ask: "Check the pressure switch tubing, the cold-end header box ports, and the condensate trap. What do you find?",
      options: [
        { label: "Kinked or cracked tubing, or water in the tubing or header box ports", verdict: "Repair the tubing and clear the ports. E250 is a physical vent and tubing problem, not a board problem." },
        { label: "Plugged condensate trap", verdict: "A plugged trap backs water into the header box. Drain and clean the trap, then run a manual calibration." },
        { label: "Tubing, ports, and trap all clear", next: 2 },
      ],
    },
    {
      ask: "Put a manometer on the switch taps during a heat call. How does inducer pressure compare to the switch ratings printed on it?",
      options: [
        { label: "Pressure meets the printed rating but the switch never closes", verdict: "The switch itself is failing. Replace it, then force a manual calibration from Field Test mode." },
        { label: "Pressure falls short of the printed rating", verdict: "The inducer or vent system is not producing the differential. Keep working the physical side - four failed calibrations in a row is what puts it into the 1-hour soft lockout." },
      ],
    },
  ],
  "s-lennox-slp99-w951-dual-fuel-link": [
    {
      ask: "On a furnace installed with a heat pump and a dual fuel thermostat, check for 24V on the O terminal during a heat pump heating call. What do you read?",
      options: [
        { label: "O is energized during the heat pump heating call", verdict: "A constantly energized O holds the reversing valve in cooling and eliminates heat mode. Power down, confirm zero volts, and cut on-board link W951, the clippable connection between terminals R and O on the integrated control." },
        { label: "O is dead during the heat pump heating call", verdict: "W951 has already been cut and the reversing valve is being released. The no-heat is not this link - the heat pump should produce heat with O de-energized." },
      ],
    },
    {
      ask: "After cutting W951 and restoring power, recheck O during a heat pump heating call and watch the system. What happens?",
      options: [
        { label: "O is no longer energized and the heat pump produces heat", verdict: "Fixed. Confirm changeover to gas heat happens on the thermostat terms." },
        { label: "O is dead but the heat pump still does not heat", verdict: "The link is no longer the issue. The reversing valve is being released correctly, so the fault is outside this configuration." },
      ],
    },
  ],
  "s-lennox-slp99uhv-w915-two-stage-cooling": [
    {
      ask: "With a two-stage outdoor unit and a two-stage capable thermostat, place a first-stage-only cooling call and check whether Y2 is also energized at the furnace board. What do you find?",
      options: [
        { label: "Y2 is energized on a Y1-only call", verdict: "Link W915 between terminals Y1 and Y2 is still intact, so the outdoor unit operates in second-stage cooling only. Power down, confirm zero volts, and cut W915 so Y1 and Y2 operate independently." },
        { label: "Y2 is de-energized on a Y1-only call", verdict: "W915 is already cut and the stages are independent. Add the second-stage call and confirm the outdoor unit steps up and the indoor blower changes speed accordingly." },
      ],
    },
  ],
  "s-lennox-soft-disable-two-bars": [
    {
      ask: "Read what the Lennox control is actually displaying. Which is it?",
      options: [
        { label: "Two horizontal bars", next: 1 },
        { label: "Three horizontal bars with E203", verdict: "A different state entirely - a missing unit size code, not soft disable. Do not chase the device configuration reset for this one." },
      ],
    },
    {
      ask: "Confirm comm wiring between thermostat, damper control module, indoor unit and outdoor unit, cycle power to the control showing the code, and re-run thermostat setup. Does it clear?",
      options: [
        { label: "Two bars gone and the device is recognized", verdict: "The thermostat re-discovered the device and it is out of soft disable. Verify normal operation before leaving." },
        { label: "Still showing two horizontal bars", verdict: "On the thermostat go to Setup > System Devices > Thermostat > Edit and press 'reset'. If needed, repeat and press 'resetAll' to rebuild the whole device list." },
      ],
    },
  ],
  "s-lennox-whistling-indoor-low-fan": [
    {
      ask: "Run the unit through each fan speed, noting where the whistling starts and stops, and listen at the indoor fan and motor. Where is the noise coming from?",
      options: [
        { label: "The indoor fan or motor, showing up in low wind (low fan) mode", verdict: "The fan or motor is the source - replace the fan motor and check normal startup on all fan speeds." },
        { label: "The booster fan on a unit so equipped", verdict: "Replace that fan motor and check normal startup." },
        { label: "Airflow across a dirty filter or coil rather than the fan or motor", verdict: "The motor is not the source - clean the filter and coil before condemning the blower." },
      ],
    },
  ],
  "s-lennox-zcd-zgd-second-stage-cooling-k2": [
    {
      ask: "On a Y2 demand, trace 24VAC through TB1 on the A194 board and prove the normally closed high pressure switch S7.",
      options: [
        { label: "S7 is open", verdict: "Stage two stops right there - each stage is proved through its own high pressure switch. Prove S7 before condemning K2." },
        { label: "S7 is closed but contactor K2 never energizes", verdict: "With S7 proven, K2 is your suspect. No K2, no compressor B2." },
        { label: "K2 energizes and B2 runs, but the blower stays on low speed", verdict: "The K264 medium blower speed contacts should close and connect RD to RM on the A96 inverter for medium speed (55 Hz). If the compressor stages but the blower does not, look at K264." },
      ],
    },
    {
      ask: "If stage one is weak too, check the stage one path.",
      options: [
        { label: "No 24VAC at terminal strip TB1 on the A194 board", verdict: "Go back to power: line voltage from the unit disconnect energizes transformer T1, which feeds 24VAC to TB1." },
        { label: "24VAC at TB1 but the normally closed high pressure switch S4 is open", verdict: "S4 is stopping the stage one call before compressor contactor K1. S4 is the stage one prove." },
        { label: "K1 closes and compressor B1 runs in its lower capacity step", verdict: "Stage one is proven good - keep your work on the stage two path." },
        { label: "Blower never comes on with a G call", verdict: "Blower relay K117 should energize and its normally open contacts close, connecting SD to STF and RL on the A96 VFD inverter for low speed (40 Hz)." },
      ],
    },
  ],
  "s-lennox-zhd-defrost-termination": [
    {
      ask: "Watch a full defrost cycle and note how it ends.",
      options: [
        { label: "Always runs the full 15 minutes and S104 never opens", verdict: "Defrost terminates on the circuit pressure switch S104 opening or after 15 minutes, whichever comes first. Test S104 and its connection." },
        { label: "Defrost keeps running after the thermostat demand is satisfied", verdict: "Normal. The cycle is not terminated by loss of demand - do not read that as a stuck reversing valve." },
        { label: "Outdoor fans B4 and B5 keep turning during defrost", verdict: "Fan relay K10 should de-energize and the fans should stop when reversing valve L1 energizes. Fans still running point at K10 or its wiring." },
      ],
    },
    {
      ask: "Check how defrost is being initiated and whether supplemental heat comes on.",
      options: [
        { label: "Defrost thermostat S6 or S9 never closes", verdict: "It closes when outdoor coil temperature drops to its set point. Verify the coil is actually that cold and the thermostat closes." },
        { label: "Defrost seems too frequent or too rare", verdict: "Verify which minimum run time the unit is set for - 30, 60, or 90 minutes - before deciding the interval is wrong." },
        { label: "Defrost runs but supplemental electric heat never energizes", verdict: "Supplemental heat is energized through W2 during defrost. Check the electric heat sequence separately rather than the defrost control." },
      ],
    },
  ],
  "s-lennox-zone-missing-from-list": [
    {
      ask: "Note exactly which zone is missing, then go to that zone sensor and check both the wiring back to the damper control module and the zone number address on the sensor. What do you find?",
      options: [
        { label: "Wiring is wrong or a terminal is not landed tight", verdict: "Correct the wiring, then re-run Re-Configure System from Settings, Advanced Settings, View Support Service Control Center, Equipment Settings, Reset." },
        { label: "Wiring is correct but the zone number address on the sensor is wrong", verdict: "Set the correct zone address - it has to be set on both the 17A30 and 10C17 sensor types - then re-run Re-Configure System and confirm the zone appears." },
      ],
    },
    {
      ask: "After correcting it and re-running Re-Configure System, check the Lennox Smart Zoning screen. Is the zone there?",
      options: [
        { label: "The missing zone now appears in the list", verdict: "Name it, then complete the Verify Airflow Per Zone screen so the recovered zone gets a CFM value entered." },
        { label: "The zone is still missing", verdict: "Re-verify that sensor wiring and the zone number address again - those are the two things that keep a zone off the list." },
      ],
    },
  ],
  "s-lennox-zoning-central-mode": [
    {
      ask: "Pull the alert list on the thermostat and check the zone sensor addresses. What do you find?",
      options: [
        { label: "Alert 551 plus a matching 542/543/544/545 code", verdict: "That matching code names which zone sensor lost communication with the damper control module. Inspect the DCM-to-sensor wiring - loose or mis-wired connections are the listed cause." },
        { label: "Two wall sensors set to the same zone number", verdict: "That duplicate is what causes the double-dash condition. Each sensor must be a unique zone (2, 3, or 4 - the S30/S40 is always zone 1)." },
        { label: "Indoor temp shows '--' and a zone sensor was recently replaced", verdict: "A replacement sensor's address must MATCH the one it replaced. Set the address before expecting it to work." },
      ],
    },
    {
      ask: "After the fix, does the system come out of central mode?",
      options: [
        { label: "Zoning returns on its own", verdict: "Comm restoration alone returns it to zone operation. Verify each zone actually responds before leaving." },
        { label: "Still stuck in central mode with zoning disabled", verdict: "Re-addressing needs the re-configure procedure. Run it from Zone Control Settings on the thermostat so the system re-discovers the sensors." },
      ],
    },
  ],
  "s-lennox-zoning-dcm-leds": [
    {
      ask: "Read the damper control module LEDs before condemning anything. What is lit?",
      options: [
        { label: "Green status LED flashing at power-up", verdict: "The DCM is functioning normally, not faulting. Do not condemn the board on this." },
        { label: "Red Zoning Off LED lit with all dampers open", verdict: "A zoning alert put the system into Zoning Off mode with full airflow everywhere. Look for the alert on the thermostat, not at the dampers." },
        { label: "Red damper-closed or pressure-switch-open LED lit", verdict: "A lit red is a state indicator, not automatically a failure. Read it alongside the thermostat alert list before replacing anything." },
      ],
    },
    {
      ask: "How long has the control been powered up?",
      options: [
        { label: "Less than 5 minutes", verdict: "Expect the 5-minute minimum off-time delay when the control first powers on - only the fan output responds. Do not diagnose a no-cool or no-heat inside that window." },
        { label: "Well past 5 minutes with still no operation", verdict: "Past the delay, so pull the stored diagnostic codes from the S30/S40 Alerts screen. The DCM itself auto-resets after an operation error or power failure." },
      ],
    },
  ],
  "s-lennox-zoning-transformer-fuse": [
    {
      ask: "Look at the panel and the dampers together. Which symptom do you have?",
      options: [
        { label: "Panel completely dead", next: 1 },
        { label: "Panel and zone sensors alive but the dampers will not drive", next: 2 },
      ],
    },
    {
      ask: "Check the 3A slow-blow fuse and the 24VAC supply at the panel.",
      options: [
        { label: "Fuse is blown", verdict: "It protects against shorts in the thermostat and damper field wiring. If it re-blows after replacement, hunt the short in the field wiring first - see the low-voltage short-hunt scenario." },
        { label: "Fuse good but supply is outside 18-30VAC", verdict: "Correct the 24VAC supply before anything else - the panel needs 18 to 30VAC at the terminals." },
      ],
    },
    {
      ask: "Check the transformer jumper position on the DCM.",
      options: [
        { label: "Set to SYS XFMR", verdict: "On SYS XFMR the indoor unit transformer powers ONLY the DCM and zone sensors. The dampers must have their own separate external transformer - panel up, sensors up, dampers dead is the classic missing-damper-transformer symptom." },
        { label: "Set to DMPR XFMR, the factory default", verdict: "That external transformer should be powering DCM, zone sensors AND dampers. Confirm the external transformer is actually present and supplying 18-30VAC before suspecting the dampers themselves." },
      ],
    },
  ],
  "s-liquid-line-lift-pressure-drop": [
    {
      ask: "Compare liquid line temperature at the outdoor unit against liquid line temperature at the indoor unit before the metering device.",
      options: [
        { label: "Liquid line is much cooler at the indoor unit and superheat is high", verdict: "Pressure is being lost between the two points. Look for a restriction in the run, an undersized liquid line, or excessive lift, and check the OEM line set tables." },
        { label: "Both readings similar, subcooling good at both ends, superheat still high", verdict: "The liquid is arriving intact. The problem is at the metering device itself - inlet screen, powerhead, or piston." },
        { label: "Line set is well over the OEM length and no charge adjustment was documented", verdict: "The system was likely never charged correctly for this installation. Recover, evacuate, and weigh in factory charge plus the documented adjustment for the actual length." },
      ],
    },
  ],
  "s-liquid-vs-suction-line-drier": [
    {
      ask: "Which drier are you looking at, and what does the documented history say?",
      options: [
        { label: "Liquid line drier", verdict: "That is permanent, ongoing equipment. Check or replace it any time the system is opened for service, not just after a failure." },
        { label: "Suction line drier with a documented burnout", verdict: "That one is temporary. Remove or bypass it after a limited run time once oil/acid sampling confirms the system is clean, otherwise it is a permanent unnecessary suction-side pressure drop." },
        { label: "Suction line drier with no documented burnout history", verdict: "Do not assume it is standard equipment. Ask questions about what was done to this system before leaving it in place." },
        { label: "Suction line drier with a climbing pressure drop across it", verdict: "It is loading up with the debris it was installed to catch. Replace it if it restricts flow significantly before the burnout cleanup is complete - and never substitute a liquid line core into a suction application." },
      ],
    },
  ],
  "s-locate-liquid-line-restriction": [
    {
      ask: "Walk the liquid line with a clamp probe. Where does the temperature drop show up?",
      options: [
        { label: "Across the filter drier", verdict: "The drier is restricted. Recover, replace it, evacuate to a deep vacuum, and find out what loaded it - moisture, debris, or a past burnout." },
        { label: "Across a service valve", verdict: "The valve is not fully open, or the port/valve stem is restricting. Confirm the stem position and stroke it fully open before condemning anything else." },
        { label: "Right at the metering device with no drop before it", verdict: "The metering device or its inlet screen is the restriction. Plan to pull and inspect the piston, or check the TXV inlet strainer and powerhead." },
        { label: "No localized drop anywhere, just low charge indications", verdict: "Not a restriction. Low subcooling with the high superheat says undercharge. Leak search, repair, evacuate, and weigh in." },
      ],
    },
  ],
  "s-low-line-voltage-brownout": [
    {
      ask: "Measure incoming line voltage at the disconnect/panel while the equipment is actually running, and compare against the rated range (commonly 197-253V for 240V-nominal equipment).",
      options: [
        { label: "Low at the panel even before the equipment starts", verdict: "Utility-side low voltage, not a component-level HVAC fault. Document the actual readings and advise the customer to contact their utility." },
        { label: "Normal at idle but it sags once the equipment loads up", verdict: "Check for undersized wiring or a loose connection on the customer's side causing the drop. That is a fixable HVAC-side issue, distinct from a true utility brownout." },
        { label: "Voltage stays inside the rated range under load", verdict: "Voltage is not the cause here. Look elsewhere." },
      ],
    },
  ],
  "s-lowpressure-control-shortcycle": [
    {
      ask: "Catch suction pressure with gauges at the moment of shutdown and compare it against the low-pressure switch's actual cut-out setting.",
      options: [
        { label: "Suction pressure genuinely low when it trips", verdict: "The switch is doing its job. Chase the low charge or airflow restriction behind the low pressure instead of blaming the control." },
        { label: "Suction pressure normal for current conditions when it trips", verdict: "That is a switch or settings issue - cut-out set too close to normal suction for mild weather, or too tight a differential. It trips on completely normal pressure swings." },
        { label: "Switch trips at a pressure different from its marked setting when checked against a second known-good gauge", verdict: "The switch has drifted out of calibration. If adjustment does not correct it, replace it." },
        { label: "Trips turn out to be on the high-pressure control, not the low-pressure control", verdict: "Different control, different root causes. Confirm which one is actually tripping before troubleshooting further." },
      ],
    },
  ],
  "s-lp-furnace-loses-heat-coldest-days": [
    {
      ask: "Put a manometer on the gas valve inlet tap, fire the furnace, then start the other LP appliances and watch inlet pressure. What does it do?",
      options: [
        { label: "Sags below the LP minimum on the rating plate only under full load", verdict: "That points upstream. Check the tank gauge percentage and the tank size against the total connected BTU load - a small or nearly empty tank cannot vaporize enough on a cold night." },
        { label: "Holds at or above the LP minimum with everything running", next: 1 },
      ],
    },
    {
      ask: "Look at the first- and second-stage regulators and at the furnace setup. What did you find?",
      options: [
        { label: "Frost, ice, or water in a regulator vent, or a vent blocked by snow or debris", verdict: "Regulator vents must point down and stay clear. Document it and hand it to the propane supplier - regulator capacity is theirs." },
        { label: "Furnace still on natural gas orifices with no LP conversion kit installed", verdict: "A unit not set up for LP misbehaves in a way that looks just like this. Install the correct orifices and the LP conversion kit." },
        { label: "Regulators clear and the furnace is correctly converted to LP", verdict: "The furnace checks out. Hand the supplier your inlet pressure readings taken with and without the other appliances running - tank sizing, regulator capacity, and vaporization rate are theirs." },
      ],
    },
  ],
  "s-lrp-defrost-interval-cold-humid": [
    {
      ask: "Open the control panel and look at the defrost interval timing pins on the CMC1 defrost control. What do you find?",
      options: [
        { label: "No timing selector jumper installed at all", verdict: "With no jumper in place the control defaults to a 90 minute defrost interval, which is too long for this location. Set the timer pin to a 60 or 30 minute interval." },
        { label: "Jumper installed on the 90 minute interval", verdict: "Too long for an area that regularly sees below 32 F with humidity above 80 percent. Move it to a 60 or 30 minute interval, then confirm defrost initiates at the new interval with the defrost thermostat closed." },
        { label: "Jumper already on the 30 minute interval", verdict: "That is the factory setting and the shortest interval available. The maximum defrost period is 14 minutes and is not adjustable, so a longer defrost is not the fix - look at the coil and the defrost thermostat instead." },
      ],
    },
  ],
  "s-lv-short-hunt-method": [
    {
      ask: "With power off, replace the fuse once, pull all thermostat wires off the board except R and C, and power up. What does the fuse do?",
      options: [
        { label: "Fuse holds", next: 1 },
        { label: "Fuse blows again with all field wiring off the board", next: 2 },
      ],
    },
    {
      ask: "Reconnect one conductor at a time - Y, then W, then G, then O/B, then accessories - powering up between each. What happens?",
      options: [
        { label: "One specific conductor pops the fuse every time", verdict: "That wire names the circuit. Follow it to the usual suspects: staples through stat wire, wire rubbed bare at the condenser entry hole or under the air handler panel, a shorted damper or zone actuator, a failed contactor coil, or a pinch under the thermostat baseplate." },
        { label: "Everything reconnects with no pop", verdict: "It is intermittent. If it only blows in cooling or in wind, wiggle-test the outdoor wire run at the condenser while watching a meter across the fuse." },
      ],
    },
    {
      ask: "Unplug on-board loads and connectors one at a time - inducer, gas valve, transformer secondary legs. What happens?",
      options: [
        { label: "Fuse holds once one specific on-board load is unplugged", verdict: "That load or its harness is the short. Repair or replace it and re-test." },
        { label: "Fuse still blows with every on-board load unplugged", verdict: "The short is on the board itself or the transformer secondary wiring. Work back from there." },
      ],
    },
  ],
  "s-manifold-on-spec-but-clocked-input-wrong": [
    {
      ask: "With manifold pressure on spec, what does the clocked input tell you?",
      options: [
        { label: "Clocked input is low and inlet pressure sags when a second appliance fires", verdict: "Gas supply problem, not the furnace. Look at pipe sizing, a partly closed valve, a restricted flex connector, or a meter and regulator that cannot carry the total connected load." },
        { label: "Clocked input is off and the orifice stamp does not match the manual's table", verdict: "Wrong orifices. Order the correct set from the orifice table for that fuel and elevation. Large input corrections belong to the orifice, not the regulator." },
        { label: "Clocked input is high and the install is at altitude with no derate done", verdict: "The install skipped the elevation derate. Follow the manual's altitude table - it may call for different orifices, a different manifold pressure, or both, and the rules differ by country." },
      ],
    },
  ],
  "s-manifold-pressure-rating-plate-authority": [
    {
      ask: "Read the manifold pressure specified on the rating plate for this model and fuel, then measure manifold pressure with the burners actually operating. How does it compare?",
      options: [
        { label: "Measured pressure is already at the rating plate value", verdict: "Stop - do not turn the regulator up. The low heat complaint is an airflow, duct, sizing, or distribution problem, not a gas pressure problem." },
        { label: "Slightly off, correctable with a small variation at the regulator", verdict: "Make only small variations at the gas valve pressure regulator to bring pressure to the specified value, then clock the gas meter to confirm the measured input is not greater than the rating plate." },
        { label: "A large correction would be needed to reach the specified value", verdict: "That means the wrong orifice, wrong fuel setup, or an inlet supply problem - not a regulator adjustment. Check inlet pressure under full fire, since a sagging supply cannot be fixed at the outlet regulator." },
      ],
    },
  ],
  "s-mediacabinet-door-seal-bypass": [
    {
      ask: "Open and close the cabinet door and inspect the gasket, the latch, and the perimeter.",
      options: [
        { label: "Gasket is torn, missing sections, or flattened with compression set", verdict: "Gaskets lose their seal over years of opening and closing for filter changes. Replace the gasket rather than relying on latch pressure to compensate." },
        { label: "Door closes but the latch is not drawing it fully tight against the gasket", verdict: "A worn or bent latch lets the door sit closed but not sealed. Correct the latch so it actually compresses the gasket." },
        { label: "Dust staining or streaking around the door perimeter", verdict: "That shows air has been bypassing through that gap over time instead of going through the media." },
        { label: "Door and gasket seal fine but the media panel is shifted in its internal frame", verdict: "A media panel that is not fully seated creates an internal bypass even with a well-sealed door. Reseat it in its track." },
      ],
    },
  ],
  "s-mediacabinet-vs-1inch": [
    {
      ask: "Confirm which filter setup is installed and when the media was last changed.",
      options: [
        { label: "4-5 inch media cabinet, last changed within roughly 6-12 months", verdict: "That is a normal interval for a media cabinet. Judge its static pressure impact against the media cabinet manufacturer's own pressure-drop chart, not typical 1-inch filter figures, since they are not directly comparable even at the same nominal MERV." },
        { label: "Media cabinet left in far longer than 6-12 months on the assumption it lasts indefinitely", verdict: "That is the mistake to look for on these cabinets. Change it and recheck static pressure before chasing anything else." },
        { label: "Standard 1-inch filter", verdict: "Expect a much shorter interval, commonly 1-3 months. Check the actual change interval against the home's dust and pet load." },
      ],
    },
    {
      ask: "On a media cabinet, check how it seals and how it was tied into the return.",
      options: [
        { label: "Door gasket or latch is not sealing tightly", verdict: "Media cabinets depend on a properly sealing door in a way a simple 1-inch slot filter does not. Address the gasket and latch." },
        { label: "System was recently converted from a 1-inch slot to this cabinet", verdict: "Confirm the cabinet was actually plumbed into the full return airflow path correctly and is not just added awkwardly alongside the old opening." },
      ],
    },
  ],
  "s-methodology-nocooling-topdown": [
    {
      ask: "Start at the thermostat: mode and setpoint correct, and is it actually generating a call for cooling? Check for a Y signal at the equipment if there is any doubt.",
      options: [
        { label: "No Y signal reaching the equipment", verdict: "Stop at the thermostat and stat wiring - the equipment was never asked to run. Do not move to the unit until the call is real." },
        { label: "Y is present at the equipment", next: 1 },
      ],
    },
    {
      ask: "Move to power: indoor and outdoor disconnects and breakers on, and 24V present at the indoor board and the outdoor contactor coil circuit?",
      options: [
        { label: "Missing 24V at the indoor board or the outdoor contactor coil circuit", verdict: "Power or control problem. Work that before anything on the refrigerant side." },
        { label: "Power and 24V confirmed at both ends", next: 2 },
      ],
    },
    {
      ask: "Now check the indoor and outdoor sides in order. What do you see?",
      options: [
        { label: "Blower not running, or airflow restricted - dirty filter, iced coil, wrong blower speed", verdict: "This is an airflow problem showing up as a cooling complaint. Fix airflow before touching gauges - it will mislead refrigerant diagnostics." },
        { label: "Contactor pulls in but the compressor and/or condenser fan do not run", verdict: "Electrical or component problem - capacitor, motor windings - rather than a refrigerant issue. Diagnose there." },
        { label: "Blower, airflow, contactor, compressor, and condenser fan all normal", verdict: "Power, controls, and airflow are confirmed. Now connect gauges and check charge by subcooling/superheat against the appropriate pattern." },
      ],
    },
  ],
  "s-methodology-noheating-topdown": [
    {
      ask: "Confirm the call and power first: correct mode and setpoint with W present (or the correct O/B state on a heat pump), and 24V at the control board?",
      options: [
        { label: "No call reaching the board, or no 24V present", verdict: "Stop here - thermostat, wiring, or a breaker/disconnect. Do not assume an equipment fault until the call and 24V are both confirmed." },
        { label: "Call and 24V both confirmed at the board", next: 1 },
      ],
    },
    {
      ask: "Identify what type of heat you are actually dealing with, because the next step is completely different for each.",
      options: [
        { label: "Gas furnace", verdict: "Work the ignition sequence in order - inducer starts, pressure switch closes, igniter warms, gas valve opens, flame proves - and find exactly where it stops instead of guessing at a component." },
        { label: "Electric furnace or strip heat", verdict: "Confirm the sequencer/relay stages actually energize the heat strips in order, and check each strip circuit's breaker individually - a partial-heat complaint usually means only some stages are energizing." },
        { label: "Heat pump", verdict: "Confirm the reversing valve is positioned for heat, check charge, and confirm aux/backup heat stages in when the heat pump cannot keep up. Heat pump supply air normally feels only warm, not furnace-hot - calibrate the complaint against that first." },
      ],
    },
  ],
  "s-microchannel-coil-repair-limitations": [
    {
      ask: "Pinpoint exactly where the leak is before condemning the coil.",
      options: [
        { label: "Leak is at a brazed transition joint or fitting just outside the coil body", verdict: "That may be repairable with proper technique even when the coil core would not be. Confirm the leak is truly outside the coil before replacing." },
        { label: "Leak is within the coil itself", verdict: "Treat it as a coil replacement. A single leak can involve several internal channels, the thin aluminum walls burn through or crack under torch heat, and stop-leak additives are not a professional repair here." },
        { label: "Leak confirmed in the coil and the equipment is still under warranty", verdict: "Check whether the manufacturer requires the failure documented or reported a specific way before replacement, since microchannel failures are sometimes tracked separately. Also factor lead time into the customer conversation early - the coil may only come as part of a larger assembly." },
      ],
    },
  ],
  "s-microchannel-condenser-coil-failure": [
    {
      ask: "Look at the coil construction before you plan any repair.",
      options: [
        { label: "Flat aluminum tubes with louvered aluminum fins", next: 1 },
        { label: "Round tubes with separate fin material", verdict: "That is a conventional fin-and-tube coil. The microchannel-specific diagnosis and repair limits do not apply here." },
      ],
    },
    {
      ask: "On the microchannel coil, where is the damage or leak?",
      options: [
        { label: "At the joint between the aluminum tube and a dissimilar metal (fitting or brazed joint to the copper line set)", verdict: "Galvanic corrosion at dissimilar-metal joints is the typical microchannel leak, not pinhole corrosion through the tube wall. On replacement, use proper transition technique or a factory transition fitting so it does not repeat." },
        { label: "Cracked or crushed flat tube from impact - hail, debris, a ladder or tool strike", verdict: "Thin flat tube walls crack or crush far more readily than round copper dents. Plan on coil or full condenser coil assembly replacement rather than a field braze repair." },
        { label: "Fins crushed over an area with no leak", verdict: "Microchannel is more airflow-sensitive to fin damage because the flat tube and fin geometry has less open area to start with. Even moderate crushing meaningfully restricts airflow." },
      ],
    },
  ],
  "s-minisplit-branch-box-troubleshoot": [
    {
      ask: "Confirm the system actually uses a branch box or distributor with active components, then compare how the zones are performing.",
      options: [
        { label: "One zone performs poorly while the others are fine", verdict: "Look at the branch box solenoid valve serving that specific indoor unit's circuit. A solenoid not fully opening or closing on command starves or floods just that zone regardless of the indoor head's own condition." },
        { label: "All zones underperform together", verdict: "A single-zone solenoid does not explain that. Cross-reference any branch-box-specific fault code against the manufacturer's list, since branch box faults are often coded separately from unit faults." },
        { label: "System uses simple line-set branching with no active components", verdict: "There is no branch box to troubleshoot here, and diagnosis differs significantly. Work the indoor and outdoor units instead." },
      ],
    },
    {
      ask: "When that zone calls, listen and feel at the branch box.",
      options: [
        { label: "Solenoid clicks and the corresponding line gets hot or cold as expected", verdict: "The valve is responding. Check the branch box wiring harness connections back to the outdoor unit, since these see thermal cycling and vibration and are a common source of intermittent single-zone faults." },
        { label: "Solenoid does not respond to the command at all", verdict: "That usually means a coil failure or a control signal issue from the outdoor unit, not a refrigerant problem." },
        { label: "Insulation at the branch box fittings is missing or compressed", verdict: "Condensation and heat loss at an uninsulated branch box connection can mimic a refrigerant charge or performance problem. Restore the insulation before chasing charge." },
      ],
    },
  ],
  "s-minisplit-breaker-trips-at-compressor-start": [
    {
      ask: "With the compressor leads disconnected at the drive and insulated, energize the unit. What happens?",
      options: [
        { label: "The breaker holds and the unit powers up normally", verdict: "The fault is in the compressor or its leads. Check insulation resistance to the housing and the balance between windings before ordering anything." },
        { label: "The breaker still trips with the compressor isolated", verdict: "The fault is in the outdoor unit's electrical section. Look at the drive board, the fan motor, and any chafed line-voltage conductor in the cabinet." },
        { label: "It holds until the outdoor fan is commanded", verdict: "Isolate the fan motor next. A grounded outdoor fan motor or its harness trips the same breaker at the same point every time." },
        { label: "Windings read balanced and insulation to housing is high", verdict: "Look harder at the drive output and the wiring between it and the compressor. A shorted output device or a pinched lead produces this without a bad compressor." },
      ],
    },
  ],
  "s-minisplit-dry-contacts-onoff-alarm": [
    {
      ask: "A head will not run at all. Look at the two dry contacts used for remote on/off on the indoor unit main board - what is landed there and what state is it in?",
      options: [
        { label: "An external device such as a float switch or fire alarm interlock, with its contact open", verdict: "That device is holding the head off - it is not an equipment fault. Work the external device." },
        { label: "Nothing landed on the remote on/off contacts", verdict: "Nothing external is holding it off. Do not confuse those contacts with the separate alarm dry contacts or the XYE central control ports on the same board." },
        { label: "An alarm light or buzzer is on", verdict: "Trace it back to the alarm dry contact - a separate pair from the remote on/off contacts - before assuming an equipment fault." },
        { label: "A powered output was landed on the contacts", verdict: "Anything landed there has to be a true dry contact, not a powered output. Correct that before chasing anything else." },
      ],
    },
  ],
  "s-minisplit-f1-f2-cable-ohm-test": [
    {
      ask: "With power off at least 15 minutes and both ends of F1 and F2 disconnected and kept apart, ohm between the two conductors and from each conductor to the shield. What do you read?",
      options: [
        { label: "Any resistance between the conductors or to the shield", verdict: "The pair is shorted or leaking to the shield - replace the wires." },
        { label: "No resistance on any of those readings", next: 1 },
      ],
    },
    {
      ask: "Wire nut one end of the pair together and ohm the pair again from the other end. What do you get?",
      options: [
        { label: "Still no resistance with the far end wire nutted", verdict: "The run is open - replace the wires." },
        { label: "The pair reads through with the far end wire nutted", verdict: "The cable checks good. Confirm the run is 16/2 stranded shielded, a straight run with no splices, and landed on F1 and F2 with correct polarity." },
      ],
    },
  ],
  "s-minisplit-f1-f2-dc-signal-voltage": [
    {
      ask: "With power off 15 minutes, the field comm wires off F1 and F2 at both ends, and power then restored, read DC volts across F1 and F2 at the indoor unit and at the outdoor unit with a true RMS meter. What do you get?",
      options: [
        { label: "Both boards read between 0.1 and 0.9 vdc", verdict: "Both boards are producing their own signal. Remove power 15 minutes, run a temporary wire between indoor and outdoor, restore power, and confirm the comm error clears." },
        { label: "Indoor board reads outside 0.1 to 0.9 vdc", verdict: "Replace the indoor board - it is not putting out its DC signal." },
        { label: "Outdoor board reads outside 0.1 to 0.9 vdc", verdict: "Replace the outdoor board - it is not putting out its DC signal." },
      ],
    },
  ],
  "s-minisplit-forced-cool-test": [
    {
      ask: "Start forced/test cooling from the indoor unit's manual button (or the remote key combo for the brand). How does the unit behave compared to normal thermostat-driven mode?",
      options: [
        { label: "Forced cooling runs fine, but normal mode still will not start", verdict: "That separates control from mechanical: the issue is sensors, remote, or settings, not the sealed system. Leave the refrigerant circuit alone and work the control side." },
        { label: "Forced cooling runs the same poor way normal mode does", verdict: "Now the compressor is at a defined fixed speed, so gauge readings mean something. Check operating pressures and charge inside the 30-minute forced window before it auto-exits." },
        { label: "Unit will not enter forced mode at all", verdict: "Confirm the brand's entry method before calling it a control failure - Daikin ON/OFF button 5 seconds, Mitsubishi emergency operation button, others per the manual." },
      ],
    },
  ],
  "s-minisplit-indoor-head-dead-power-path": [
    {
      ask: "Read the power pair on AC volts at the indoor terminal block, then read the incoming supply at the outdoor unit.",
      options: [
        { label: "No voltage indoors, proper supply at the outdoor unit", verdict: "The outdoor unit is not passing power through. Check the outdoor board's fuse, its output terminals, and the interconnecting run before condemning the indoor unit." },
        { label: "No voltage at either place", verdict: "The problem is upstream. Check the breaker, the disconnect and its fuses, and confirm both legs are present at the outdoor unit." },
        { label: "Proper voltage at the indoor terminal block and the head is still dark", verdict: "Power is arriving. Look at the indoor board's own fuse, its supply connector, and the display or control ribbon connector." },
        { label: "The head turns out to have a separate circuit of its own", verdict: "Treat it as its own supply problem - breaker, receptacle or disconnect, and the indoor board fuse - and stop chasing the outdoor unit for this." },
      ],
    },
  ],
  "s-minisplit-interface-kit-vs-remote": [
    {
      ask: "With the thermostat calling, read each of its outputs to C at the interface kit's input terminals.",
      options: [
        { label: "No 24V at the kit's R and C", verdict: "The kit has no power. Check its supply transformer or whatever source it is fed from before looking at anything else." },
        { label: "24V arrives at the kit's inputs but the head does nothing", verdict: "The kit is receiving the call and not passing it on. Check the kit's configuration settings and its connector at the indoor unit, and confirm the head is set for external control." },
        { label: "The head runs, but in the wrong mode", verdict: "Mode mapping is wrong. Recheck how the kit expects heating and cooling calls and how the reversing valve output is handled - mini-splits generally do not follow the ducted O/B convention." },
        { label: "The head runs but holds the wrong temperature", verdict: "Confirm which sensor is in control. With an interface kit the wall thermostat should be the sensing point - if the head is still using its own return air sensor, the setting is wrong." },
      ],
    },
  ],
  "s-minisplit-leaking-indoor": [
    {
      ask: "Look at the indoor coil and the drain line before anything else.",
      options: [
        { label: "Ice on the indoor coil melting off", verdict: "Meltwater is overwhelming the drain. Trace back to the freeze-up cause - airflow or charge - rather than just clearing the drain." },
        { label: "Drain line is clogged, algae growth visible", verdict: "Clear the drain. Common on units that have run a long time without cleaning." },
        { label: "Drain is clear but has lost slope under the lineset cover", verdict: "Ductless drain lines often lose slope over time or were never sloped right. Re-slope the run." },
        { label: "Drain and coil fine, but the head looks tilted", verdict: "Even a mini-split will overflow its internal pan if mounted slightly off level. Also confirm the built-in condensate pump, if equipped, is running and not jammed." },
      ],
    },
  ],
  "s-minisplit-multizone-one-head-dead": [
    {
      ask: "Look at the dead head. Does it show any LED or blink pattern?",
      options: [
        { label: "It shows an LED blink pattern", verdict: "Look that pattern up in that manufacturer's error code system for that zone - do not assume it matches single-zone codes." },
        { label: "Completely dark, no LEDs", next: 1 },
      ],
    },
    {
      ask: "Check that zone's own supply path.",
      options: [
        { label: "Power or communication connection is loose at the branch box or wiring junction", verdict: "That is the zone's feed. Repair the connection." },
        { label: "Branch provider/distributor unit shows a fault on that port", verdict: "The fault is at that port of the branch box, not the head itself." },
        { label: "Individual fuse or breaker for that head is open", verdict: "Replace it and find out what opened it." },
        { label: "All of the above check out", verdict: "Swap the remote or control input source if possible, to rule out a remote-specific issue rather than the indoor unit." },
      ],
    },
  ],
  "s-minisplit-outdoor-not-running": [
    {
      ask: "Check for line voltage at the outdoor unit and inspect the communication wiring between indoor and outdoor.",
      options: [
        { label: "No line voltage at the outdoor unit", verdict: "Check the outdoor breaker and disconnect - power is not getting there." },
        { label: "Line voltage present, comm wiring loose or miswired", verdict: "A loose or miswired communication connection is the most common cause. Correct it and retest." },
        { label: "Line voltage present and comm wiring looks right", next: 1 },
      ],
    },
    {
      ask: "Check the outdoor board and what the indoor unit is actually set to.",
      options: [
        { label: "Blown fuse on the outdoor board", verdict: "Replace the fuse and find out what blew it." },
        { label: "Indoor unit is set to fan-only", verdict: "No call is being made. Set it to cooling or heating and retest." },
        { label: "Fuse good and the unit is genuinely calling", verdict: "On a Daikin, go to the Daikin mini-split communication-failure entry in this list for LED-based diagnosis." },
      ],
    },
  ],
  "s-minisplit-remote-unresponsive": [
    {
      ask: "Operate the unit directly from the manual/auto switch on the indoor unit itself.",
      options: [
        { label: "Unit responds to the manual switch", next: 1 },
        { label: "Unit does not respond to the manual switch either", verdict: "That points to the indoor unit's receiver or control board rather than the remote." },
      ],
    },
    {
      ask: "The unit works, so focus on the remote path.",
      options: [
        { label: "Fresh batteries fix it", verdict: "Dead remote batteries are the most common cause by far." },
        { label: "Something is blocking the line of sight to the receiver window", verdict: "Clear the obstruction between the remote and the indoor unit's receiver." },
        { label: "There is another wireless remote or a wired controller on the same unit", verdict: "The second controller may be overriding or conflicting with commands. Sort out which one has control." },
      ],
    },
  ],
  "s-minisplit-scope-comm-at-outdoor-pcb": [
    {
      ask: "Remove the communication cable between the outdoor and indoor units and scope the signal on LINE 2 at the outdoor unit. What do you see?",
      options: [
        { label: "No signal", verdict: "Check the communication cable connection at the outdoor unit PCB, then replace the outdoor PCB." },
        { label: "Good signal present", next: 1 },
      ],
    },
    {
      ask: "Reconnect the cable between the outdoor and indoor units and restart the unit. What happens?",
      options: [
        { label: "Communication still does not work", verdict: "With a good outdoor signal present, replace the indoor unit PCB. Recheck LED01 on the board afterward and confirm the indication is normal." },
        { label: "Communication comes up", verdict: "The cable connection was the issue. Recheck LED01 on the board and confirm the indication is normal before leaving." },
      ],
    },
  ],
  "s-minisplit-thermistor-swap-test": [
    {
      ask: "Swap the suspect thermistor with an identical one on the same board, clear the code, and run the unit again.",
      options: [
        { label: "The code moves to the input the suspect sensor is now plugged into", verdict: "The thermistor is bad. Replace it with the correct part number - resistance curves differ between sensor types, so a generic substitute will read wrong." },
        { label: "The code stays on the original input even with a known-good sensor in it", verdict: "The board's input circuit is the problem. Check the connector and its pins first, then plan on the board." },
        { label: "The code clears entirely after simply reseating the connectors", verdict: "You had a connection problem, not a component failure. Clean and reseat, then look for the cause - moisture, vibration, or a spread pin." },
        { label: "Resistance is far off the table but the sensor is lying loose off its pipe or out of its well", verdict: "Mount it correctly and retest. A displaced sensor reads air temperature and generates sensor and protection codes without being defective." },
      ],
    },
  ],
  "s-minisplit-xye-central-control-wiring": [
    {
      ask: "One head is missing from the central controller. Does that head respond to local control?",
      options: [
        { label: "Yes, it runs normally on local control", verdict: "Check its XYE landing on the indoor main board before its indoor-to-outdoor communication. Verify X to X, Y to Y and E to E on every unit on the bus." },
        { label: "No, it does not respond to local control either", verdict: "Confirm each head responds to local control before blaming the central controller - this is not a central control problem yet." },
        { label: "Its bus wires are landed on the remote on/off dry contact ports", verdict: "Those are different connection points from the XYE central control ports on the same board. Move the centralized controller or gateway onto X, Y and E." },
      ],
    },
  ],
  "s-mitsubishi-mszfs-emergency-operation": [
    {
      ask: "Before pulling panels, sort out what the unit is actually doing. Which fits?",
      options: [
        { label: "Runs from the emergency operation switch on the indoor unit but the remote does nothing", verdict: "The unit runs, so the remote is the problem. Replace the batteries and press the RESET button gently with a fine-tipped object." },
        { label: "Will not restart right after being shut off", verdict: "That is the 3 minute time delay holding the compressor off after every shutdown to protect it from overload. Wait it out." },
        { label: "OPERATION INDICATOR lamp on the indoor unit is blinking on and off", verdict: "Count the blinks before starting any service work." },
        { label: "Dead in every mode", verdict: "Check the power supply voltage and check the indoor/outdoor connecting wire for miswiring before troubleshooting anything else." },
      ],
    },
  ],
  "s-mitsubishi-multizone-isolate-head": [
    {
      ask: "Lift one head's S3 at the outdoor block, cycle power, and see whether the rest of the system comes up. Repeat until something changes.",
      options: [
        { label: "The system comes up normally with one specific head's S3 lifted", verdict: "That branch is loading the bus. Read S2-S3 at that indoor unit - signal present at the head points at the indoor board, signal missing points at the run." },
        { label: "The fault stays no matter which single head is lifted", verdict: "The problem is on the outdoor side. Verify the outdoor unit's own supply, then suspect the outdoor control board." },
        { label: "It only comes up with every head lifted, and faults again as soon as any one is landed", verdict: "Look for something common to all the runs - a shared junction box, a damaged multi-conductor cable, or comm conductors bundled with line-voltage wiring." },
      ],
    },
  ],
  "s-mitsubishi-s1-s2-s3-comm-readings": [
    {
      ask: "Take S1-S2 on AC volts and S2-S3 on DC volts at the outdoor block, then take the same two readings at the indoor block.",
      options: [
        { label: "AC present at both ends, and the DC on S2-S3 is moving at both ends", verdict: "The wiring and supply are doing their job. Work the specific fault code from the indoor LED or the remote, look at the boards, and check for a noise source running alongside the cable." },
        { label: "AC and DC both present outdoors, nothing at the indoor block", verdict: "The run between the units is open or landed wrong. Ring out each conductor end to end and open every splice and junction box in the run." },
        { label: "AC present outdoors but no DC on S2-S3 anywhere", verdict: "The outdoor unit is not putting a signal out. Confirm the outdoor board has its own supply and is not already in a fault state, then suspect the outdoor control board." },
        { label: "S2-S3 sits at a steady DC value and never moves", verdict: "The outdoor side is talking and getting nothing back. Lift S3 at the indoor unit and re-read - if the value still does not move, work toward the indoor board." },
      ],
    },
  ],
  "s-mitsubishi-s1-s3-crossed": [
    {
      ask: "With the power off, ring out each conductor from the outdoor terminal number to the indoor terminal number. What do you find?",
      options: [
        { label: "Each number goes to the same number at both ends", verdict: "Conductor identification is correct. Move on to voltage readings at the terminal blocks and to the unit's actual fault code." },
        { label: "Two conductors are swapped at a junction or at one terminal block", verdict: "Correct the landings before anything else. If the system was energized this way, plan on inspecting or replacing boards at both ends." },
        { label: "A conductor is open, or shows continuity to ground", verdict: "The cable is damaged. Replace the run rather than splicing it - a marginal conductor here produces intermittent comm faults for years." },
      ],
    },
  ],
  "s-ml16kp2-cold-climate-defrost": [
    {
      ask: "Record the outdoor ambient temperature at the time of the complaint. What was it?",
      options: [
        { label: "Below 10 F", next: 1 },
        { label: "Between 10 F and 15 F", next: 1 },
        { label: "Above 15 F", verdict: "Frost accumulation time should have reset to 90 minutes above 15 F, so the cold climate 360 minute setting does not explain it. Look at the coil and the defrost cycles themselves." },
      ],
    },
    {
      ask: "Inspect the outdoor coil. How much frost is actually on it?",
      options: [
        { label: "Light frost and the unit is heating normally", verdict: "Expected. Below 10 F the frost accumulation time is set to 360 minutes on purpose, because there is less moisture in the air at those temperatures. Explain that to the customer." },
        { label: "Coil is genuinely loading up with frost", verdict: "The coil is not being adequately cleared during the defrosts that do occur. Consider a higher defrost termination temperature setting, which colder climates may require, and explain that reduced heating capacity is the result of a coil that is not cleared." },
      ],
    },
  ],
  "s-ml16kp2-demand-defrost-jumpers": [
    {
      ask: "Find the termination temperature shunt pin on the ML16KP2 demand defrost control. Where is it?",
      options: [
        { label: "Shunt installed on 50 F, the factory setting", next: 1 },
        { label: "No shunt installed on the termination temperature pin", verdict: "With the temperature shunt not installed the default termination temperature becomes 90 F. Install the shunt on the setting you actually want before changing anything else." },
        { label: "Shunt installed on 70, 90, or 100 F", verdict: "Someone moved it off the 50 F factory setting. Note where it sits and set it deliberately for this install rather than leaving it as found." },
      ],
    },
    {
      ask: "Look at the P3 header for nominal defrost time. Which option is it on?",
      options: [
        { label: "P3 on 60 or 100 seconds", verdict: "Shorter than the 140 second default, which fits a defrost that feels too short. Move it toward 140 or 165 seconds if the coil is not clearing." },
        { label: "P3 on 165 seconds", verdict: "That is the longest option available and fits a defrost that feels too long. The default setting is 140 seconds." },
        { label: "P3 on 140 seconds, the default", verdict: "Defrost time is at default, so look elsewhere. Check the P5 DELAY jumper, the outdoor coil and ambient sensor connections at the P4 header, and read the DS1 red LED against the manual diagnostic table." },
      ],
    },
  ],
  "s-ml16kp2-frost-accumulation-adaptive": [
    {
      ask: "With the unit running in heating, read the outdoor coil temperature. Where is it?",
      options: [
        { label: "Below 37 F", next: 1 },
        { label: "At or above 37 F", verdict: "No frost accumulation time is being counted. This control only accumulates while the heat pump is in heating mode with the outdoor coil temperature below 37 F, so the missing defrost is expected." },
      ],
    },
    {
      ask: "Time the last defrost cycle and compare it to the target defrost cycle time. Where did it land?",
      options: [
        { label: "70 percent or less of target - a short cycle", verdict: "The control increases the accumulation time by 30 minutes after a short cycle. The longer interval you are seeing is normal operation." },
        { label: "130 percent or more of target - a long cycle", verdict: "The control decreases the accumulation time by 30 minutes after a long cycle. The shorter interval is normal operation." },
        { label: "200 percent or more of target, or defrost terminated at the 14 minute maximum", verdict: "The control sets the accumulation time to 30 minutes in that case. Expect frequent defrosts until the cycle times come back in line." },
        { label: "Between 70 and 130 percent of target", verdict: "No change to the accumulation time. A varying interval on this demand defrost control is normal, not an erratic timer." },
      ],
    },
  ],
  "s-multiple-thermostats-conflict": [
    {
      ask: "Trace the wiring. Is there a zone panel with dampers, or are the thermostats landed together on one piece of equipment?",
      options: [
        { label: "Zone panel with dampers present", verdict: "This is a proper zoning system. Troubleshoot it as zoning rather than as thermostats fighting each other." },
        { label: "Multiple thermostats wired in parallel straight to one piece of equipment, no zone panel", verdict: "Whichever thermostat's contacts close first or last can override or fight the other, so behavior is unpredictable. The correct fix is a proper zone control system with dampers or removing all but one thermostat - explain it to the customer as a design issue, often something a previous owner or handyman set up." },
      ],
    },
  ],
  "s-multistage-thermostat-miswire": [
    {
      ask: "Compare the actual staging capability of the thermostat against the staging of the equipment.",
      options: [
        { label: "Single-stage thermostat on two-stage equipment", verdict: "It will never call for stage 2, which is why it never reaches full capacity. Reconfigure or replace the thermostat." },
        { label: "Two-stage thermostat on single-stage equipment", verdict: "That can cause erratic behavior if miswired. Verify the Y1/Y2 and W1/W2 terminations match what each device expects." },
        { label: "Staging matches on both ends", verdict: "Check the thermostat's equipment-type configuration menu - many need to be told what is actually connected, and a wrong setting causes this even with correct wiring." },
      ],
    },
  ],
  "s-new-install-static-too-high": [
    {
      ask: "Put a manometer on the supply and return and read total external static pressure. How does it compare to the equipment's rated maximum?",
      options: [
        { label: "Above the equipment's rated maximum", next: 1 },
        { label: "At or below the rated maximum", verdict: "Static is not the limiting factor here, so do not rebuild duct based on it. Recheck the airflow complaint against the equipment's actual rated CFM before making duct changes." },
      ],
    },
    {
      ask: "With static confirmed high, compare the duct and filter against the equipment's actual rated CFM. What stands out?",
      options: [
        { label: "Trunk or branch duct smaller than the rated CFM needs (equipment was upsized, ductwork was not)", verdict: "Undersized ductwork is a common new-install cause, especially when the equipment was upsized without touching the duct. Correcting the duct is the real fix." },
        { label: "Sharp turns and transitions right off the plenum", verdict: "Excessive fittings close to the equipment are adding unnecessary resistance. Rework those transitions rather than accepting the static." },
        { label: "Filter grille undersized for the equipment", verdict: "An undersized filter grille on an otherwise correct system can single-handedly cause high static. Upsize the filter grille and re-measure." },
        { label: "Duct sizing, fittings and filter grille all check out", verdict: "Nothing in the duct layout accounts for it. If duct modification is not immediately possible, walk the customer through the tradeoff of reducing blower CFM to protect the equipment versus the reduced capacity that comes with it." },
      ],
    },
  ],
  "s-no-aux-heat-during-defrost": [
    {
      ask: "Force a defrost with the board test procedure and read across W (or W2) and C on the board. What do you measure?",
      options: [
        { label: "24 volts at W (or W2) to C but no auxiliary heat runs", verdict: "The board is calling auxiliary heat. Follow the W2 wire to the indoor unit and check the sequencer or heat relay there." },
        { label: "No voltage at W (or W2) during defrost", next: 1 },
        { label: "Not sure the unit is really in defrost", next: 1 },
      ],
    },
    {
      ask: "Prove the unit is actually in defrost by reading across C and O on the board. What do you get?",
      options: [
        { label: "24 volts across C and O, so it is in defrost, and still nothing at W (or W2)", verdict: "The board is in defrost and not calling auxiliary heat. Replace the defrost control board." },
        { label: "No 24 volts across C and O", verdict: "The unit is not actually in defrost, so a missing W call proves nothing. Re-run the board test procedure, confirm defrost, then read W again." },
      ],
    },
  ],
  "s-nocool": [
    {
      ask: "With the thermostat calling for cool, watch and listen at the condenser. Does the contactor pull in?",
      options: [
        { label: "Contactor does not pull in", next: 1 },
        { label: "Contactor pulls in but the compressor does not run at all", next: 2 },
        { label: "Contactor pulls in and the compressor hums but will not start", verdict: "Suspect a bad run capacitor or a locked rotor. Check the capacitor first, then ohm the windings." },
      ],
    },
    {
      ask: "Check the 24V control signal at the contactor coil, plus the outdoor disconnect and breaker.",
      options: [
        { label: "No 24V at the coil", verdict: "Control signal is not getting there. Work back to the thermostat call and the low-voltage wiring." },
        { label: "24V at the coil but the contactor still will not pull in", verdict: "Problem is the contactor/coil itself. Also check whether a high or low pressure switch has tripped and locked the unit out - see the Condenser/Heat Pump lockout codes in Error Codes." },
        { label: "No line voltage at the outdoor disconnect", verdict: "Power problem, not a control problem. Check the disconnect and breaker feeding the condenser." },
      ],
    },
    {
      ask: "Check the run capacitor against its rating and ohm the compressor common/run/start windings.",
      options: [
        { label: "Capacitor reads out of tolerance or open", verdict: "Bad run capacitor. Replace it and retest the compressor." },
        { label: "Capacitor good but a winding reads open or shorted to ground", verdict: "Compressor windings are bad. Confirm your readings before condemning it - this is not a capacitor fix." },
        { label: "Capacitor and windings both check out", verdict: "Look at whether a high or low pressure switch has tripped. Check the Condenser/Heat Pump lockout codes in Error Codes." },
      ],
    },
  ],
  "s-noheat-furnace": [
    {
      ask: "Pull the panel and look at the control board LED. What do you see?",
      options: [
        { label: "LED is flashing a repeating pattern", verdict: "Board is alive and telling you what it sees. Count the flashes and look the code up in Error Codes before changing parts." },
        { label: "No LED at all, board is dark", next: 1 },
        { label: "Panel/door switch was not engaged until I pushed it in", verdict: "The door panel has to fully engage the safety switch. Confirm the furnace switch is on too, then retry the heat call." },
      ],
    },
    {
      ask: "With power on at the furnace, check 24V transformer output and the board fuse.",
      options: [
        { label: "No 24V out of the transformer", verdict: "Transformer or its line-voltage feed is the problem. Confirm the breaker/disconnect, the furnace switch, and the door safety switch are all making before condemning the transformer." },
        { label: "24V present but the board fuse is blown", verdict: "Replace the board fuse. A blown low-voltage fuse is what is keeping the board dark." },
        { label: "24V present, fuse good, board still dark", verdict: "Power is getting there and nothing lights up. Recheck the furnace switch and that the door panel fully engages the safety switch, then treat the board as the suspect." },
      ],
    },
  ],
  "s-noise": [
    {
      ask: "Listen to the unit. What does the noise actually sound like?",
      options: [
        { label: "Squealing or grinding while running", verdict: "Check the blower motor bearings, and check the blower wheel for wear if it is grinding." },
        { label: "Banging at startup", verdict: "Check for a loose panel. On a compressor this can be a flooded start or liquid refrigerant migration." },
        { label: "Rattling", verdict: "Check for loose panels and screws, and for debris in the blower wheel or outdoor fan." },
        { label: "Clicking but the unit never starts", verdict: "Check the contactor/relay for chattering or a worn contact." },
      ],
    },
  ],
  "s-noise-bearing-squeal-specific": [
    {
      ask: "Listen while it runs, then kill power and turn each suspect component by hand.",
      options: [
        { label: "Steady pitch, worse under load, motor housing hot or shaft play when off and cool", verdict: "That fits a motor bearing. Confirm by feel before ordering parts." },
        { label: "Pitch changes with wheel speed, and the wheel visibly wobbles", verdict: "That fits the blower wheel's own bearing/bushing rather than the motor." },
        { label: "One component feels rough or binding when turned by hand", verdict: "That is your source. Isolate it that way before disassembly rather than guessing at parts." },
      ],
    },
  ],
  "s-noise-compressor-knocking": [
    {
      ask: "Listen through a full cycle. When exactly is the knock present?",
      options: [
        { label: "Only during the first moments after startup", verdict: "That points to a flooded start - liquid refrigerant in the compressor at startup. Chase charge, metering device, or crankcase heater rather than the compressor itself." },
        { label: "Present at all times while running", verdict: "That points to a genuine internal mechanical fault such as worn bearings or damaged valves, which typically means compressor replacement." },
        { label: "Knock with the compressor visibly loose on its mounts", verdict: "A compressor loose from its internal or external mounts can knock against the shell or base pan. Check mounting and isolation before condemning it." },
        { label: "Knock along with persistently low superheat", verdict: "That is flooding during normal running, not just at startup. Fix the underlying cause or it will keep damaging a replacement compressor too." },
      ],
    },
  ],
  "s-noise-ductwork-ticking-popping": [
    {
      ask: "Find out when the ticking happens and whether it has always done it.",
      options: [
        { label: "Only at startup/shutdown as duct temperature changes, and it has always done it", verdict: "That is normal thermal expansion and contraction of sheet metal duct, most noticeable when hot supply air hits cool metal on furnace startup." },
        { label: "New and pronounced compared to how it used to sound", verdict: "Check whether something has physically shifted or come loose - a strap, a duct board seam - rather than assuming it is the same normal noise as always." },
        { label: "Traced to duct touching framing, a loose section, or an unsupported span", verdict: "Metal-on-metal contact and loose sections amplify normal expansion noise into something annoying. Isolate and support those spots." },
        { label: "Duct is undersized/restrictive with dramatic surface temperature swings", verdict: "An overly restrictive duct system produces bigger temperature swings at the duct surface than a properly sized one, which makes the expansion noise worse." },
      ],
    },
  ],
  "s-noise-refrigerant-hissing": [
    {
      ask: "Pin down exactly when and where you hear the hiss.",
      options: [
        { label: "Brief hiss right after the compressor stops", verdict: "That is pressure equalizing through the metering device and is normal on many systems. Not a fault." },
        { label: "Continuous hiss during operation at one specific point in the line", verdict: "That can indicate a restriction at that point - a partial blockage causing pressure drop and flash gas noise." },
        { label: "Hiss at a fitting or valve, with an oil stain there", verdict: "Hiss plus oil stain points strongly to an active leak rather than normal flow noise." },
        { label: "Loud continuous hiss right at the metering device", verdict: "Some hiss during normal TXV modulation is expected, but loud and continuous can mean the valve is not seating or modulating correctly." },
      ],
    },
  ],
  "s-odor-sewer-gas-ptrap": [
    {
      ask: "Ask when the smell shows up, then run the blower. Does the odor track with air movement or stay in one spot?",
      options: [
        { label: "Odor tracks with the blower running and shows up at registers", verdict: "Behaves like a true HVAC-circulated odor rather than a dry trap. Keep the diagnosis on the equipment and duct side." },
        { label: "Odor stays localized to one area near a drain or fixture, blower or not", next: 1 },
      ],
    },
    {
      ask: "Run water down the suspect drain for a minute to refill the trap, then recheck the odor after it clears.",
      options: [
        { label: "Smell goes away after the trap is refilled", verdict: "Confirms a dried-out P-trap pulling sewer gas into the space, not an HVAC fault. Tell the customer this is a plumbing item - a trap primer or more frequent use of that fixture." },
        { label: "Smell is still there after refilling that trap", verdict: "That drain is not the source. Check the equipment's own condensate drain trap, which dries out and acts the same way when the system has been off for an extended period." },
      ],
    },
  ],
  "s-odor-tobacco-residue-ductwork": [
    {
      ask: "Run the blower and check the odor at the supply registers. What do you find?",
      options: [
        { label: "Odor gets noticeably stronger with the blower running and is strongest at the supply registers", next: 1 },
        { label: "Odor is the same whether the blower runs or not, and no stronger at the registers", verdict: "This does not point at the duct system or equipment. The odor is coming from room surfaces, so carpet and drywall cleaning is the customer's path, not an HVAC cleaning." },
      ],
    },
    {
      ask: "Pull the filter and look at the evaporator coil and blower housing. What do you see?",
      options: [
        { label: "Visible brownish or yellow film on the filter, coil, and blower housing", verdict: "Consistent with tobacco residue on the equipment side. Quote coil cleaning along with professional duct cleaning as its own job, not a routine cleaning." },
        { label: "Filter and coil look clean, no brown or yellow film", verdict: "Equipment side looks light, but if the odor still tracks with the blower the residue is in the duct runs. Recommend professional duct cleaning, and set expectations that severe years-long buildup may need sealing/encapsulating or duct replacement." },
      ],
    },
  ],
  "s-offcycle-equalization-hardstart": [
    {
      ask: "Pin down exactly when the compressor struggles to start.",
      options: [
        { label: "Hums, trips on overload, or struggles only when restarted soon after shutting off - starts fine after sitting a few minutes", verdict: "That points to an equalization/timing issue. Confirm the anti-short-cycle delay is present and functioning, and find what is short-cycling it." },
        { label: "Struggles on every start regardless of how long it sat", verdict: "That is not equalization. Rule out a marginal capacitor and the windings instead." },
        { label: "Short cycling traced to a flaky thermostat call, power fluctuations, or an over-sensitive control setting", verdict: "Fix that root cause rather than adding a hard-start kit to mask the symptom." },
        { label: "TXV or EEV system being restarted quickly", verdict: "These equalize slower than piston or cap tube systems because the valve holds back flow. Expected equalization time varies by metering device, so do not assume one universal wait time." },
      ],
    },
  ],
  "s-open-common-24v-to-chassis": [
    {
      ask: "Read R to C and R to chassis at the equipment, then repeat both at the thermostat. What is the pattern?",
      options: [
        { label: "24V R to C at the equipment, nothing R to C at the thermostat", verdict: "The break is in the wall run or at a splice between the two points. Ring out the common conductor end to end." },
        { label: "Nothing R to C at either point, but 24V R to chassis at both", verdict: "The common is open on the equipment side. Check the transformer secondary lead and the board's common terminal." },
        { label: "R to chassis reads roughly half of normal at both R and C", verdict: "The secondary is floating rather than bonded, so your ground reference is meaningless here. Bond the secondary common the way the manufacturer specifies, then retest R to C directly." },
      ],
    },
  ],
  "s-outdoor-coil-wash-technique": [
    {
      ask: "Before you wet the coil, look it over for oil deposits. What do you see?",
      options: [
        { label: "Oily film or deposits on the coil", verdict: "Oil on the coil can indicate a refrigerant leak. Find and address the leak before washing the evidence away." },
        { label: "Dirt and debris but no oil", verdict: "Go ahead and wash it: household detergent, then a garden hose with a constant stream at moderate pressure sprayed vertically downward, nozzle at a 15 to 20 degree angle about 3 in. from the coil face, driving debris out of the coil and base pan rather than deeper into the fins." },
      ],
    },
  ],
  "s-outdoor-fan-runs-during-defrost": [
    {
      ask: "Force the unit into defrost with the board test procedure, then put the VOM across fan terminals DF1 and DF2 on the board. What do you read?",
      options: [
        { label: "Line voltage, 208-230 VAC, across DF1 and DF2", verdict: "The board fan relay is opening in defrost the way it should. Remove any jumpers used for the test and return the unit to service." },
        { label: "No line voltage across DF1 and DF2 and the fan is still spinning", verdict: "The board fan relay is not opening. Replace the control board." },
        { label: "Fan keeps running no matter what the board does", verdict: "Confirm the fan lead is actually landed on DF2 and has not been wired around the board." },
      ],
    },
  ],
  "s-outdoor-thermostat-blocks-supplemental-heat": [
    {
      ask: "Raise the setpoint until the heating second stage makes contact, then confirm whether outdoor thermostats are installed and note the outdoor ambient. What do you have?",
      options: [
        { label: "Outdoor thermostats installed and outdoor ambient is above their setpoint", verdict: "The supplemental heaters are not allowed to operate until outdoor ambient is below that setpoint. To verify heater operation in mild weather it may be necessary to jumper the outdoor thermostats temporarily." },
        { label: "Outdoor thermostats jumpered and the heaters now run", verdict: "The heaters and their circuits are good, and the outdoor thermostat setpoint was the block. Remove the jumper and document the setpoint so it can be compared against the intended balance point." },
        { label: "No outdoor thermostats installed and the heaters still will not run on a second stage call", verdict: "Outdoor thermostats are not blocking anything here, so the problem is in the heater circuits themselves." },
      ],
    },
  ],
  "s-outdoor-unit-off-during-emergency-heat": [
    {
      ask: "Check what mode the thermostat is actually in before diagnosing the outdoor unit.",
      options: [
        { label: "Emergency heat", verdict: "Both the compressor and the condenser fan motor are off in emergency heat by design. Confirm the indoor blower is running and the electric heaters are energized, and the system is doing what it should." },
        { label: "Normal heat and the outdoor unit is still dead", verdict: "Check for 24V at the contactor coil and work the heat call path. In normal heat the contactor should pull in and the compressor and condenser fan should start." },
        { label: "Unit is in defrost", verdict: "The condenser fan motor is off during defrost as well as during emergency heat. Let defrost terminate and check again." },
        { label: "Normal heat, contactor pulls in, but a hot compressor stays off", verdict: "The compressor is protected by an internal overload, so a hot compressor may be off temporarily. Let it cool and re-check." },
      ],
    },
  ],
  "s-package-gaselectric-led-codes": [
    {
      ask: "Identify the ignition control before you trust any flash count. Which board is in this package unit?",
      options: [
        { label: "PCBAG123 - single-stage, spark ignition, one status LED", next: 1 },
        { label: "PCBAG127 - two-stage, RED status LED plus AMBER flame LED and a fault recall button", next: 2 },
      ],
    },
    {
      ask: "Count the status LED flashes on the PCBAG123.",
      options: [
        { label: "2 flashes", verdict: "On PCBAG123, 2 flashes means pressure switch stuck CLOSED. Do not read this off the PCBAG127 table - the two boards are reversed." },
        { label: "3 flashes", verdict: "On PCBAG123, 3 flashes means pressure switch stuck OPEN." },
        { label: "6 flashes", verdict: "That is the 3-minute compressor short-cycle delay, not a fault. Wait it out before diagnosing." },
      ],
    },
    {
      ask: "On the PCBAG127, read the red status flash count and the amber flame LED.",
      options: [
        { label: "Red 2 flashes", verdict: "On PCBAG127 it is reversed from the 123 board: 2 flashes means pressure switch stuck OPEN." },
        { label: "Red 3 flashes", verdict: "On PCBAG127, 3 flashes means pressure switch stuck CLOSED." },
        { label: "Amber LED giving 1 flash", verdict: "Low flame current - clean the flame sensor. Hold the FAULT RECALL button 2-4 seconds to play back the last 5 codes, and record them before holding 5+ seconds clears the memory." },
        { label: "Amber LED giving 2 flashes", verdict: "Flame present with the valve off. Do not clear that one without finding the cause." },
      ],
    },
  ],
  "s-package-heating-sequence-reference": [
    {
      ask: "Put in a heat call and watch the sequence against the published timings. Where does it stop?",
      options: [
        { label: "Nothing happens - the induced draft blower never energizes", verdict: "Confirm the R and W thermostat contacts close and that the control begins its safety circuit checks." },
        { label: "Inducer runs the 30 second pre-purge but never transitions to light-off", verdict: "The pre-purge should close the pressure sensor contacts, and only then does the control transition the inducer to its light-off setting. Work the pressure sensor side." },
        { label: "Spark igniter and gas valve energize for 4 seconds but the burner does not stay lit", verdict: "The gas valve stays open only if flame is detected, so work the flame proving side. Note this control uses a spark igniter - do not look for a glowing hot surface igniter." },
        { label: "Burners light and stay lit but the blower timing looks wrong", verdict: "Compare against the published timings: blower starts after a 5 second HEAT FAN ON delay following light-off, then at the end of the call a 30 second inducer post purge and the HEAT FAN OFF delay of approximately 90/120/150/180 seconds, factory set at 150." },
      ],
    },
  ],
  "s-package-unit-electric-heater-limit-controls": [
    {
      ask: "With power off, the limits cool, and the wiring removed from the limit terminals, ohm across the normally closed contacts. What do you read?",
      options: [
        { label: "Continuity across the contacts with the limit cool", verdict: "That limit is closed and good. Move on to the next element's limit." },
        { label: "No reading with the limit cool", verdict: "The control is open - replace it, and do NOT wire around it. Then find why it tripped: these open at approximately 150 F to 160 F, so investigate airflow, filter, and blower operation." },
        { label: "The limit was still hot when you tested it", verdict: "A still-hot limit reads open and will fool you - these close at approximately 110 F. Let it cool and re-test before condemning it." },
      ],
    },
  ],
  "s-package-unit-external-trap": [
    {
      ask: "Find the 3/4 in. NPT condensate drain connection on the unit and look at what is piped to it. What do you find?",
      options: [
        { label: "No external trap installed at all", verdict: "This unit provides the drain connection but no internal trap, so an external trap has to be field installed for proper condensate drainage. Build it to the drawing on the unit and prime it with water." },
        { label: "Trap installed but it does not meet the 2 in. minimum and 3 in. minimum leg dimensions on the unit drawing", verdict: "Rebuild the trap to those dimensions so it can hold a positive liquid seal." },
        { label: "Trap installed to size but dry", verdict: "A dry trap lets the blower pull air and stop drainage. Prime it with water before running the unit." },
        { label: "Trap correct but the tubing sags or is kinked", verdict: "Support the flexible tubing, hose, or pipe so it cannot sag or kink, then run the unit in cooling and confirm condensate flows continuously with no rise in the pan." },
      ],
    },
  ],
  "s-package-unit-heat-exchanger-defrost": [
    {
      ask: "Read the gas-electric board flash count and pin down the complaint. What do you have?",
      options: [
        { label: "Red 9 flashes", next: 1 },
        { label: "Outdoor coil icing with no 9 flashes", verdict: "Work the defrost side: verify defrost thermostat placement and defrost board operation before condemning a compressor for icing." },
        { label: "Customer reports no aux heat", verdict: "Confirm the approved heat kit is installed and check whether outdoor thermostats (OT18-class accessories) are holding the stages back. The ODT setpoint alone explains many of these calls." },
      ],
    },
    {
      ask: "Nine flashes means the pressure/loss-of-charge switch is open. Put gauges on and watch the switch.",
      options: [
        { label: "Charge is low", verdict: "That switch opening usually means a leak, not a bad switch. Find and repair the leak before replacing anything." },
        { label: "Charge is correct and the switch does not open at 21 PSIG or auto-reset around 50 PSIG", verdict: "It is not operating within its published parameters. Replace the switch." },
      ],
    },
  ],
  "s-package-unit-thermostat-circuit-24v-walk": [
    {
      ask: "With power on and the thermostat calling for cooling, meter thermostat wires C and R at the equipment. What do you read?",
      options: [
        { label: "No voltage at C and R", verdict: "Check the transformer and its wiring before going any further - nothing downstream means anything without 24 volts here." },
        { label: "24 volts at C and R", next: 1 },
      ],
    },
    {
      ask: "With 24 volts confirmed at C and R, check for 24 volts at thermostat wires C and Y. What do you read?",
      options: [
        { label: "No voltage at C and Y", verdict: "That indicates trouble in the thermostat, the wiring, or an external transformer source. Check continuity of the thermostat and wiring and repair or replace." },
        { label: "24 volts at C and Y", next: 2 },
      ],
    },
    {
      ask: "Set the fan selector switch at the thermostat to 'ON' and check for 24 volts at wires C and G. What do you read?",
      options: [
        { label: "No voltage at C and G", verdict: "The trouble is in the thermostat or the wiring - check continuity and repair or replace as necessary." },
        { label: "24 volts at C and G", verdict: "Transformer, thermostat, and low-voltage wiring all check good at the equipment end. Note that 18 AWG thermostat wire is limited to 100 feet - a longer run needs heavier wire." },
      ],
    },
  ],
  "s-packageunit-blower-common-fault": [
    {
      ask: "Put the failing mode on a call and watch the board output dedicated to that mode (heat relay versus cool relay). What happens?",
      options: [
        { label: "The relay/output for the failing mode never energizes", verdict: "That specific relay or output is the suspect, not the whole board. Do not condemn the board because one mode is dead." },
        { label: "Relay energizes and voltage goes out to that mode's components", verdict: "The shared control side is proving out, so move to the mode-specific components - burner and ignition for heat, compressor and contactor for cool - the same as you would on standalone equipment." },
        { label: "No call reaching the unit on that mode's terminal (W or Y)", verdict: "Check the thermostat wiring terminals for the failing mode at both the thermostat and the unit." },
      ],
    },
  ],
  "s-packageunit-noheat-nocool": [
    {
      ask: "Work the power path at the unit itself. Where does it stop?",
      options: [
        { label: "Service disconnect near the unit is open, or the breaker is tripped", verdict: "Package units are self-contained but usually still have their own service disconnect. That is your dead unit." },
        { label: "An access panel is ajar and its safety switch is open", verdict: "Package units have multiple compartments, and a panel left slightly ajar prevents operation. Secure the panel and retest." },
        { label: "Power to the unit but no low-voltage transformer output at the control board", verdict: "Check the transformer and control board power before assuming a bigger fault." },
        { label: "Transformer output good and a fault code stored on the board", verdict: "Heating and cooling share one control board here, so a single board-level fault takes out both. Read the code rather than assuming two separate simultaneous failures." },
      ],
    },
  ],
  "s-packageunit-roof-curb-leak": [
    {
      ask: "Pin down when the water actually shows up inside.",
      options: [
        { label: "During or right after rain", next: 1 },
        { label: "During cooling operation in dry weather", verdict: "That is condensate, not rainwater. Check the condensate drain routing off the roof for a clog or bad routing letting it overflow into the curb area." },
        { label: "Both wet weather and dry-weather cooling", verdict: "You likely have two paths at once. Check the condensate drain and the curb/duct seals as separate items." },
      ],
    },
    {
      ask: "Get up on the roof and find the entry point.",
      options: [
        { label: "Curb gasket or flashing around the unit base is deteriorated", verdict: "This is as much a roofing/building-envelope issue as an HVAC one. Coordinate with a roofer rather than trying to resolve failed curb flashing as an HVAC-only repair." },
        { label: "Gaps at the ductwork connections at the curb transition", verdict: "Rainwater is entering through the duct connections, which is distinct from any condensate issue. Seal the duct-to-curb transition." },
      ],
    },
  ],
  "s-pan-overflows-with-a-clear-drain": [
    {
      ask: "Put water in the pan, shut the blower off, and watch the pan.",
      options: [
        { label: "Pan drains right down with the blower off, backs up with the blower on", verdict: "Pressure problem, not a clog. The trap is too shallow or dry for the negative pressure the blower is producing. Retrap to the manufacturer's depth, prime it, and address why the static is that high." },
        { label: "Pan does not drain even with the blower off", verdict: "Real restriction. Clear the pan outlet, trap, and line, and check for a sag or a downstream blockage such as a shared drain or a pump that is not keeping up." },
        { label: "Blow-through unit with water blowing out of the drain or the pan opening", verdict: "Positive pressure at the pan needs a trap that holds a liquid seal against being pushed out. Verify the trap arrangement matches the manufacturer's blow-through detail rather than a draw-through detail." },
      ],
    },
  ],
  "s-pest-birds-nesting-vent-termination-combustion": [
    {
      ask: "Before assuming a control fault, inspect the vent termination and the combustion air intake termination from outside.",
      options: [
        { label: "Nesting material in or on the vent or the intake pipe", next: 1 },
        { label: "Both terminations clear", verdict: "Blockage is not your cause. Go back to the pressure switch or ignition fault tree on the equipment side." },
      ],
    },
    {
      ask: "Remove all the nesting material - not just enough to clear the obvious blockage - then check the termination hardware.",
      options: [
        { label: "No bird guard or screen on the termination", verdict: "Recommend adding a code-compliant screen sized to the manufacturer's specification - too fine a screen restricts airflow or ices over. Verify normal draft and pressure switch operation before leaving." },
        { label: "Screen was in place and the nest built on or beside it", verdict: "A screen does not fully prevent this - tell the customer the termination still needs periodic visual inspection. Verify draft and pressure switch operation, and if the furnace may have run restricted, do a combustion analysis check." },
      ],
    },
  ],
  "s-pest-insects-outdoor-electrical-compartment": [
    {
      ask: "Watching for stinging insects, open the contactor and control compartment and look before condemning anything.",
      options: [
        { label: "Nesting material or insect bodies bridging or physically blocking the contactor", verdict: "Very likely your short, nuisance trip, or chattering - not a failed contactor. Clear the compartment carefully and retest before replacing the part." },
        { label: "Insects present but the contactor is clear and operating normally", verdict: "No fault caused yet, but nesting material holds moisture against components and accelerates corrosion. Clean it out and note the weep holes and cabinet openings for the customer." },
        { label: "Compartment is clean and the contactor still faults", verdict: "Insects are not the cause here - diagnose the contactor and control circuit on their own merits." },
      ],
    },
  ],
  "s-pest-rodents-ductwork-wiring": [
    {
      ask: "With droppings or nesting material present, inspect all accessible wiring - low-voltage thermostat wire, line-voltage connections, and control board wiring - for chew marks.",
      options: [
        { label: "Chew marks found on one or more wiring runs", verdict: "That is your intermittent short, blown fuse, or erratic operation. Repair or replace the damaged wiring - do not tape over chewed sections - and inspect the ductwork they accessed for other damage." },
        { label: "No chew marks anywhere accessible", verdict: "Rodent damage is not confirmed as the electrical cause - keep working the fault normally. Still point out entry points and recommend pest control, since the nesting will come back." },
      ],
    },
  ],
  "s-piston-metering-device-plugged": [
    {
      ask: "Read suction pressure and subcooling together.",
      options: [
        { label: "Suction pulled well below what a simple undercharge would produce, with abnormally high subcooling", next: 1 },
        { label: "Low suction with low subcooling", verdict: "That is not the plugged-piston pattern. A plugged piston backs refrigerant up and drives subcooling high - treat this as a charge problem instead." },
      ],
    },
    {
      ask: "Feel or measure liquid line temperature right at the piston housing, then recover and pull the piston.",
      options: [
        { label: "Sharp temperature drop across a very short distance at the piston housing", verdict: "That confirms the restriction is at that exact point rather than elsewhere in the liquid line. Recover and pull the piston." },
        { label: "Piston has physical debris in it", verdict: "Check upstream for the source - a filter drier breaking down internally, or leftover contamination from a prior burnout. Replace the drier and evacuate before recharging." },
        { label: "Piston clears when warmed, then re-plugs after running", verdict: "That is moisture ice, not debris. Address the moisture contamination, replace the drier, and evacuate properly." },
      ],
    },
  ],
  "s-pressure-switch-drops-out-mid-cycle": [
    {
      ask: "Back-probe across the pressure switch with the meter on volts and watch a full cycle, noting the elapsed time to dropout. What happens at the moment the burners quit?",
      options: [
        { label: "Voltage appears across the switch at dropout", next: 1 },
        { label: "No voltage appears across the switch at dropout", verdict: "The switch did not open - the board dropped the call. Work the control side rather than the draft side." },
      ],
    },
    {
      ask: "On a condensing furnace, pull the pressure switch hose and look for water, then pour water down the condensate drain. What did you find?",
      options: [
        { label: "Water in the hose, or a slow or blocked condensate drain", verdict: "Condensate backing up in the collector box blocks the port so the switch cannot feel the draft once the unit is up to temperature. Clear the trap, the collector box drain, and the pressure switch and relief ports." },
        { label: "Hose dry and the drain flows freely", next: 2 },
      ],
    },
    {
      ask: "Measure inducer draft with the manometer during the cycle and watch what it does as the furnace heats up. What happens?",
      options: [
        { label: "Draft falls off as the unit heats up", verdict: "That is a weak inducer wheel or a leaking gasket showing up under heat. Inspect the inducer and collector box gaskets and vent joints for leaks that open with thermal expansion, and check the outside terminations for partial blockage." },
        { label: "Draft holds steady all the way through the cycle and the switch still opens", verdict: "The switch itself has drifted - replace it with the exact part number and setpoint." },
      ],
    },
  ],
  "s-psc-internal-overload-cycling": [
    {
      ask: "Confirm the motor runs, gets warm, shuts off, sits several minutes, then restarts on its own with no thermostat input. Now check the run capacitor's microfarad value against its rating. What does it read?",
      options: [
        { label: "Reads weak or out of tolerance versus its rating", verdict: "A weak capacitor forces the motor to work harder and draw more current, heating it faster than normal and tripping the internal overload sooner. Replace the capacitor and recheck the cycling." },
        { label: "Reads within tolerance", next: 1 },
      ],
    },
    {
      ask: "With the motor running under load, measure actual voltage right at the motor terminals. What do you see?",
      options: [
        { label: "Voltage stays noticeably low the whole time it runs", verdict: "Sustained low voltage forces higher current draw for the same output and can trip a healthy overload protector repeatedly. Correct the voltage problem before condemning the motor." },
        { label: "Voltage holds steady and normal under load", next: 2 },
      ],
    },
    {
      ask: "With power off, spin the blower wheel by hand and check the filter, coil, and duct for restriction.",
      options: [
        { label: "Wheel drags, bearing feels rough, or debris is in the blower wheel", verdict: "Mechanical drag raises the motor's running load and heat, which is enough on its own to trip the overload. Free or replace the dragging component." },
        { label: "Wheel spins free but the filter, coil, or duct is restricted", verdict: "The motor is working against more resistance than it is rated for. Clear the airflow restriction and see if the cycling stops." },
        { label: "Wheel spins free and the airflow path is clear", verdict: "With capacitor, voltage, mechanical drag, and airflow all checking out normal, the windings are likely degrading. Replace the motor rather than repeatedly letting it reset on overload." },
      ],
    },
  ],
  "s-psc-multispeed-tap-troubleshooting": [
    {
      ask: "Trace which speed tap wire lands on which control board terminal (heat speed, cool speed, common) and compare against the furnace or air handler wiring diagram.",
      options: [
        { label: "Taps are swapped versus the diagram, for example heat and cool speeds reversed", verdict: "That is a system that runs fine, just at the wrong speed for the mode, usually from a previous repair. Rewire per the diagram, then verify actual airflow and static pressure at the corrected speed rather than trusting the tap label." },
        { label: "Wiring matches the diagram but one speed will not run or runs erratically", next: 1 },
      ],
    },
    {
      ask: "Check that tap's spade connector at the motor, then compare that tap's resistance against the other taps.",
      options: [
        { label: "Spade connector is loose or corroded on that one tap", verdict: "A poor connection on a single tap makes that speed not run at all or run erratically while the other speeds work fine. Repair the connection." },
        { label: "That tap reads open or shows abnormal resistance compared to the others", verdict: "That section of the motor winding has failed. An individual tap can fail without taking out the whole motor, but the motor still needs replacement." },
        { label: "Connector is tight and all taps read comparable", verdict: "Wiring and motor windings check out. Verify actual airflow and static pressure at the selected speed, since the tap label alone does not guarantee the right CFM for this equipment." },
      ],
    },
  ],
  "s-readings-change-with-the-blower-door-off": [
    {
      ask: "How much did total external static pressure change between door on and door off?",
      options: [
        { label: "Dropped substantially with the door off", verdict: "The return side is starving the blower. Measure filter drop and return duct pressure separately, and check return grille free area and duct sizing." },
        { label: "Barely changed", verdict: "The return is not the bottleneck. Take a single-point supply duct pressure and coil pressure drop to find the restriction downstream of the blower." },
        { label: "Static changed and blower amps or watts moved a lot too", verdict: "Confirms the motor is loading and unloading with system resistance. Take all future readings door on, and use the watt draw per CFM as a second check on how hard the blower is working." },
      ],
    },
  ],
  "s-recip-compressor-rod-knock": [
    {
      ask: "Listen through the first 30 seconds of a cycle and then under steady running.",
      options: [
        { label: "Steady rhythmic knock synced to compressor speed, present under all loads, does not settle down", verdict: "That is rod knock. Internal wear will progress - this is not a monitor-and-revisit condition, plan on compressor replacement." },
        { label: "Bang at startup that settles down within the first 10-30 seconds", verdict: "That points to liquid slugging/flooding rather than rod knock. Check superheat at the compressor inlet, crankcase heater, and TXV/EEV condition." },
        { label: "Continuous rattle rather than a rhythmic knock", verdict: "That points more toward a loose internal part than a worn rod bearing." },
        { label: "Knock present and oil level low at the sight glass", verdict: "Chronic low oil accelerates bearing wear and can itself contribute to knock developing. Note it as part of the failure story." },
      ],
    },
  ],
  "s-recip-compressor-valve-plate-failure": [
    {
      ask: "Take amp draw against RLA and read head and suction pressures at the same time.",
      options: [
        { label: "Amps noticeably lower than the load suggests, low head pressure, suction staying higher than it should", verdict: "That is the classic leaking reed valve pattern - refrigerant slipping back past the valve instead of being pushed to the high side. On a welded hermetic, diagnose on this pattern and plan on replacement." },
        { label: "Same low-head/high-suction pattern, but amps are normal or high", verdict: "A reversing valve internal bypass or a stuck-open metering device can mimic that pressure pattern. The amp draw is what separates them, so rule those out first." },
        { label: "Sound has a hissing/blowing quality mixed into the normal running sound rather than a mechanical knock", verdict: "That supports a valve plate failure. Confirm with the amp and pressure pattern, then treat it as a compressor replacement rather than a charge or metering problem." },
      ],
    },
  ],
  "s-refrig-evacuation-vacuum": [
    {
      ask: "Pull down with a micron gauge (not the pump's own gauge), then valve off the pump and watch the reading.",
      options: [
        { label: "Holds steady at or below the manufacturer's target (commonly 500 microns or lower on residential)", verdict: "That is a proper deep vacuum with no meaningful decay. Proceed to charging." },
        { label: "Rises rapidly after isolating from the pump", verdict: "A rapid rise means a leak or moisture still present, not normal equalization. Do not charge - find the leak or keep pulling on the moisture." },
        { label: "Never reached the target even after extended pumping", verdict: "Suspect moisture in the system rather than just running the pump longer. Pull the schrader cores with core removal tools too - they restrict enough to make a system look like it will not come down." },
      ],
    },
  ],
  "s-refrig-lineset-undersized-oversized": [
    {
      ask: "Measure the actual liquid and suction line diameters plus the run length and vertical rise, then compare against the manufacturer's sizing chart for this tonnage.",
      options: [
        { label: "Suction line smaller than the chart calls for", verdict: "Undersized suction gives excessive pressure drop, reduced capacity, and possible compressor overheating from low suction at the compressor even with adequate charge. Correcting the line set is the fix, not charge adjustment." },
        { label: "Suction line larger than the chart calls for", verdict: "Oversized suction hurts oil return, especially on long runs or significant vertical rise, and over time starves the compressor of lubrication. This is a design issue that needs the line set corrected." },
        { label: "Both lines match the chart for the tonnage and length", next: 1 },
      ],
    },
    {
      ask: "Look at the base of any significant vertical suction riser.",
      options: [
        { label: "No P-trap at the base of the riser where the install called for one", verdict: "Add the P-trap to assist oil return on that long/tall line set." },
        { label: "P-trap present and line sizes match the chart", verdict: "Line set sizing is not your problem here. Look elsewhere for the capacity or oil-return complaint." },
      ],
    },
  ],
  "s-refrig-nitrogen-pressure-test": [
    {
      ask: "Pressurize with dry nitrogen to an appropriate test pressure for the equipment, then monitor pressure over time along with ambient temperature.",
      options: [
        { label: "Pressure holds once you account for the ambient temperature swing", verdict: "No leak indicated. Proceed to evacuation." },
        { label: "Pressure drops more than the temperature change explains", verdict: "You have a leak. Use soap bubbles or an electronic leak detector at the accessible joints to pinpoint it rather than waiting on pressure decay alone." },
        { label: "Pressure rose through the day and fell overnight, tracking temperature", verdict: "That is normal temperature response, not a leak or proof of a good seal. Judge the test across a full temperature cycle before deciding." },
      ],
    },
  ],
  "s-refrig-noncondensables-purge": [
    {
      ask: "Shut the system off long enough to equalize, then compare standing pressure against outdoor ambient on a P/T chart.",
      options: [
        { label: "Standing pressure noticeably higher than the chart predicts for that ambient temperature", verdict: "That strongly suggests non-condensables. The only reliable fix is recovery, evacuation to a deep vacuum, and recharge - they cannot be bled off reliably from the high side." },
        { label: "Standing pressure matches the chart for that ambient temperature", verdict: "Non-condensables are not indicated. Look elsewhere for the high head pressure." },
        { label: "Head pressure runs higher than the P/T chart predicts for the actual liquid line temperature while running", verdict: "That is the classic running sign of non-condensables. Confirm with an equalized standing pressure check, and investigate how air got in - almost always a service done without pulling a proper vacuum." },
      ],
    },
  ],
  "s-refrig-weighing-in-charge": [
    {
      ask: "What state is this system actually in right now?",
      options: [
        { label: "Fully recovered and evacuated after a repair", verdict: "Weigh in the nameplate charge, base charge plus any line-length adjustment, with a refrigerant scale. Use superheat and subcooling afterward only to fine-tune and confirm." },
        { label: "Never evacuated - still holding a partial charge and running, just low", verdict: "With no clean starting point to weigh in from, charging by superheat/subcooling target is the appropriate method here. Document the weight added either way for future leak tracking." },
      ],
    },
  ],
  "s-refrigerant-id-no-mixing": [
    {
      ask: "Read the refrigerant off the data plate, then take a static pressure reading at ambient. How do the two agree?",
      options: [
        { label: "Plate says R-410A and static reads about 200+ psig at 70F", verdict: "Label and pressure agree. Service it as R-410A with POE oil and keep the gauge set dedicated." },
        { label: "Plate says R-22 and static reads about 121 psig at 70F", verdict: "Label and pressure agree - R-22 with mineral oil. Never top it with 410A; that creates an unrateable mixture." },
        { label: "Static pressure is wildly off from what the plate refrigerant calls for", verdict: "Suspect a mixed or mislabeled system. A contaminated system must be recovered completely into a dedicated cylinder, not topped off." },
        { label: "Plate says R-32 or R-454B", verdict: "A2L mildly flammable refrigerant. Verify your recovery machine, hoses, detector, and cylinders are A2L rated before opening the system, and keep open flame away from a charged circuit." },
      ],
    },
  ],
  "s-refrigerant-migration-offcycle-flooded-start": [
    {
      ask: "After a long cold off-cycle, listen at the next startup and watch startup amp draw.",
      options: [
        { label: "Banging/gurgling for the first several seconds with elevated startup amps, clearing as the cycle continues", next: 1 },
        { label: "Starts clean after a long cold off-cycle", verdict: "No flooded-start signature from migration on this system. Look elsewhere for the complaint." },
      ],
    },
    {
      ask: "Check how this system is supposed to manage off-cycle migration.",
      options: [
        { label: "Crankcase heater open, or not powered during the off-cycle - only energized when the compressor runs", verdict: "That is the fault. Without it, the outdoor compressor becomes the coldest point and refrigerant vapor migrates there and condenses. Correct the heater and its wiring." },
        { label: "Compressor was replaced and the new crankcase heater was never properly installed, wired, or verified", verdict: "Common cause after a compressor change. Install and verify it rather than tolerating the flooded starts." },
        { label: "No crankcase heater by design, and the system's pump-down cycle does not appear to be executing at shutdown", verdict: "On a pump-down system that is the actual fault to chase - do not assume a crankcase heater should be there. Chronic flooded starts cause cumulative oil washout and bearing wear." },
      ],
    },
  ],
  "s-refrigerant-type-mismatch-retrofit": [
    {
      ask: "Before you trust any gauge reading, find out what is actually in this system - check service tags and stickers from previous work.",
      options: [
        { label: "Tag shows an R22 replacement blend was added", verdict: "Stop using an R22 P/T chart. Blends have different pressure/temperature relationships and an R22 chart will lead to incorrect charging decisions." },
        { label: "No tags, unclear service history, possibly several products added over the years", verdict: "Mixed refrigerants are a real possibility on an older system with a long history. Use a refrigerant identifier before connecting recovery equipment, both for charging and to protect your tank and machine." },
        { label: "Documented as still straight R22", verdict: "The R22 P/T chart applies. Proceed with normal R22 diagnosis and charging." },
      ],
    },
  ],
  "s-register-throw-pattern-mismatch": [
    {
      ask: "Flow hood the room's total CFM and ask when the complaint started relative to any furniture, renovation, or room-use changes.",
      options: [
        { label: "CFM is still correct and the complaint started after a room change", verdict: "This is a comfort and layout issue rather than an equipment repair. Document it that way so expectations are set if the customer rearranges again later." },
        { label: "CFM has actually dropped from what that room should get", verdict: "That is a genuine airflow reduction, such as a developing duct leak or damper drift, that happens to coincide with the room change. Rule it out before blaming layout." },
        { label: "CFM is correct but furniture, curtains, or a later-added partial wall blocks the throw path", verdict: "Air is being redirected in an unintended direction. Where the register cannot be relocated, an adjustable-louver or directional diffuser can steer airflow away from the problem area." },
      ],
    },
  ],
  "s-registers-add-up-to-less-than-blower-cfm": [
    {
      ask: "Compare the summed register CFM to the blower table CFM at your measured static.",
      options: [
        { label: "Sum is well short and pressure pan readings are high on several runs", verdict: "Supply duct leakage into unconditioned space. Seal the plenum, takeoffs, and boots. In an attic or crawl this is also a comfort and energy loss you can quantify for the customer." },
        { label: "Sum is short but pressure pan readings are low everywhere", verdict: "The blower is probably not producing rated CFM. Verify speed tap or ECM programming, check the wheel and rotation, and re-verify static with the door on." },
        { label: "Sum is close to the blower table number but rooms are still uncomfortable", verdict: "Airflow quantity is fine - the problem is distribution. Compare each room's measured CFM to its load, then balance at the takeoff dampers rather than at the register louvers." },
      ],
    },
  ],
  "s-return-air-insufficient": [
    {
      ask: "Measure static pressure with the interior doors open, then again with them closed.",
      options: [
        { label: "Static jumps noticeably with the doors closed", verdict: "The return path is the limitation - a single central return with closed doors. The fix is added return capacity: transfer grilles, jump ducts, or bigger door undercuts, not more supply air." },
        { label: "Static barely changes with the doors closed", verdict: "Return path from those rooms is adequate. This is not the closed-door return problem - look elsewhere." },
      ],
    },
  ],
  "s-return-air-temp-does-not-match-the-house": [
    {
      ask: "Compare room temperature, return grille temperature, and return plenum temperature at the unit.",
      options: [
        { label: "Grille matches the room, but the plenum at the unit has shifted toward attic or crawl temperature", verdict: "Return duct or plenum leakage between the grille and the unit. Seal the return drop, plenum seams, and cabinet joints, then re-take your temperature readings." },
        { label: "Grille air is already off from the room temperature", verdict: "The leak is upstream of the grille - a panned joist or wall cavity return, or a leaky return boot pulling from a wall or floor cavity. Seal the cavity or convert it to real duct." },
        { label: "All three readings agree but the thermostat disagrees with all of them", verdict: "The equipment is seeing correct air. Look at thermostat placement, sensor calibration, and drafts through the thermostat's own wire hole." },
      ],
    },
  ],
  "s-return-plenum-transition-issues": [
    {
      ask: "With the system running, work a smoke pencil or your hand along the return plenum seams and its transition to the equipment cabinet.",
      options: [
        { label: "Air pulling in at plenum seams or the cabinet transition", verdict: "Return-side leaks pull unconditioned or contaminated air from the attic, garage, or crawlspace, which is easy to miss without this specific check. Prioritize sealing them, since they can bring combustion byproducts, insulation particles, or humidity into the airstream." },
        { label: "Seams tight, but the transition necks down or has a sharp offset right at the equipment", verdict: "That adds avoidable turbulence and static pressure right where it is hardest to fix later. Correct the transition geometry." },
        { label: "Seams tight and transition smooth, but the plenum was built only to match the cabinet opening", verdict: "Check that it is actually sized for the full return airflow plus the filter location, not just the cabinet dimensions." },
      ],
    },
  ],
  "s-reversing-valve-coil-24v-and-tap-test": [
    {
      ask: "Put the system on the COOLING cycle and measure at the reversing valve coil terminals. What do you read?",
      options: [
        { label: "No voltage at the coil terminals", verdict: "The coil is not being commanded. Check the operation of the thermostat and the continuity of the wiring from the thermostat 'O' terminal to the unit." },
        { label: "24 V present at the coil terminals", next: 1 },
      ],
    },
    {
      ask: "With 24 V confirmed, tap the valve body lightly while switching the system from HEATING to COOLING and back. What happens?",
      options: [
        { label: "The valve switches positions when you tap it", verdict: "The valve was stuck and freed up with the tap. Confirm it shifts on a mode change on its own before leaving." },
        { label: "Tapping does not cause the valve to switch positions", next: 2 },
      ],
    },
    {
      ask: "Remove the coil connector cap and test the continuity of the reversing valve solenoid coil. What do you get?",
      options: [
        { label: "Coil does not test continuous", verdict: "The coil is open - replace the coil. Reinstall the connector cap and confirm the valve shifts on a mode change." },
        { label: "Coil tests continuous", verdict: "Coil continuous with 24 volts present at the coil terminals means the valve is inoperative - replace the valve." },
      ],
    },
  ],
  "s-reversing-valve-coil-pull-and-click": [
    {
      ask: "With the unit in cooling and 24 volts confirmed at the solenoid, loosen the nut on top of the coil and begin sliding it off. What do you feel and hear?",
      options: [
        { label: "Slight resistance from the magnetic field and an audible click as the coil comes off", verdict: "The coil is magnetized and the click is the pilot valve plunger moving. Reinstall the coil and retighten the nut." },
        { label: "Resistance but no clicking sound at all", verdict: "The absence of a click indicates the pilot valve plunger is stuck." },
        { label: "No voltage present at the coil to begin with", verdict: "Do not judge the coil yet. Check the control voltage first." },
      ],
    },
  ],
  "s-reversing-valve-leak-mimics-bad-compressor": [
    {
      ask: "Measure true suction temperature and the suction line temperature after the reversing valve. What is the difference?",
      options: [
        { label: "Greater than 4 degrees", verdict: "The valve is leaking internally. Confirm with pressures - internal leakage shows up as excessively high suction pressure - and rule the valve in before condemning the compressor." },
        { label: "4 degrees or less", verdict: "The valve is not leaking internally by this check, so the compressor stays the suspect." },
      ],
    },
    {
      ask: "Compare discharge line temperature before and after the reversing valve. What do you read?",
      options: [
        { label: "Same temperature after the valve", verdict: "That is what the discharge line should read through the valve." },
        { label: "Noticeably different after the valve", verdict: "The discharge line should be the same temperature after the valve. Take that alongside the suction temperature check as support for internal leakage rather than a failed compressor." },
      ],
    },
  ],
  "s-reversing-valve-no-24v-at-coil": [
    {
      ask: "Put the system on the COOLING cycle and test for 24V at the reversing valve coil terminals. What do you read?",
      options: [
        { label: "No voltage registered at the coil terminals", verdict: "The valve is not being commanded. Check the operation of the thermostat and the continuity of the wiring from the thermostat O terminal all the way to the unit. On a communicating heat pump also check for 24VAC between the non-insulated E22 terminal on the UC board, marked RVS on the silkscreen, and C at the 7-pin or 4-pin connector." },
        { label: "24V present at the coil but the valve does not move", verdict: "It is being commanded and not moving. Continue with the mechanical and coil continuity checks." },
      ],
    },
  ],
  "s-reversing-valve-solenoid-test": [
    {
      ask: "Start the system and switch operation from COOLING to HEATING. What does the valve do?",
      options: [
        { label: "Does not shift, and suction pressure is excessively high with suction line temperature rising through the valve", next: 1 },
        { label: "Valve shifts normally on the changeover", verdict: "The valve is changing over, so the stick is not your problem. Chase the complaint elsewhere." },
      ],
    },
    {
      ask: "With the system running on the COOLING cycle, measure for 24V at the reversing valve coil terminals.",
      options: [
        { label: "No voltage, legacy-wired heat pump", verdict: "Check thermostat operation and the continuity of the wiring from the thermostat O terminal to the unit." },
        { label: "No voltage, ComfortNet heat pump", verdict: "Check for 24VAC at the non-insulated E22 terminal (RVS on the silkscreen) on the UC control and at the C terminal on the 7-pin or 4-pin connector." },
        { label: "24V confirmed at the coil terminals", next: 2 },
      ],
    },
    {
      ask: "Tap the valve body lightly while switching the system between HEATING and COOLING, then check the coil.",
      options: [
        { label: "It shifts once tapped", verdict: "The valve was stuck in mid-position. Watch it through several changeovers before calling it good." },
        { label: "Still will not shift, and the solenoid coil does not test continuous", verdict: "Replace the coil - it fails the continuity check." },
        { label: "Still will not shift, coil is continuous, and 24 volts is present at its terminals", verdict: "The valve is inoperative. Replace it." },
      ],
    },
  ],
  "s-reversing-valve-stuck-mid-position-2": [
    {
      ask: "Connect gauges and measure suction line temperature entering and leaving the reversing valve. What do you see?",
      options: [
        { label: "Excessively high suction pressure with a temperature increase through the valve", next: 1 },
        { label: "Suction pressure normal with no temperature rise through the valve", verdict: "That is not the mid-position signature. Discharge gas is not being routed back to the suction side here, so look elsewhere for the capacity complaint." },
      ],
    },
    {
      ask: "Switch the system from COOLING to HEATING, test for 24V at the coil terminals on the cooling cycle, and tap the valve body lightly while switching. What happens?",
      options: [
        { label: "No 24V at the valve coil terminals", verdict: "The valve is not being commanded. Work the control side before condemning the valve." },
        { label: "Tapping the body frees it and it shifts", verdict: "The valve is sticking mechanically rather than being un-commanded - it is not holding position on its own." },
        { label: "Coil tests continuous, 24 volts present, and the valve stays put", verdict: "The valve is inoperative. Replace it." },
      ],
    },
  ],
  "s-rollout-switch-open-blower-runs": [
    {
      ask: "Press the manual reset on the rollout switch, then remove the wires and ohm across it.",
      options: [
        { label: "It closes and shows continuity", next: 1 },
        { label: "It will not close after a manual reset", verdict: "Replace the switch - and still find out why it tripped before you leave." },
      ],
    },
    {
      ask: "With the switch back in circuit, measure voltage between each side of the rollout control and ground during an ignition attempt, and look for the cause of the trip.",
      options: [
        { label: "Flame impingement, orifice plate out of position, or burners with excessive crossover slot dimension", verdict: "That is your rollout cause. Correct it - resetting alone is not the repair on a safety-critical trip." },
        { label: "Over-firing, improper orifices, or improper gas pressure", verdict: "Correct the firing rate and gas side. Those drive rollout just as surely as mechanical misalignment." },
        { label: "Air leaking around the heat exchanger into the burner compartment, or through the heat exchanger itself", verdict: "That leak is your rollout cause and it is the serious one. Address it before returning the furnace to service." },
      ],
    },
  ],
  "s-rotary-compressor-failure-signs": [
    {
      ask: "Clamp amps against RLA and watch whether it builds any real pressure difference.",
      options: [
        { label: "Amps lower than the load suggests, with the unit failing to build pressure difference", verdict: "That fits worn vane/roller clearances leaking internally. These are sealed with no serviceable internals, so it means compressor or often full outdoor unit replacement." },
        { label: "Starts but immediately trips its internal overload, repeatedly", verdict: "Rotary compressors have relatively low locked-rotor tolerance. Check the start capacitor and supply voltage before condemning the compressor." },
        { label: "High-pitched whine or grinding that increases with speed", verdict: "Rotary wear noise tends to be higher-pitched because they run at higher RPM. Confirm with amps and pressures before calling it." },
        { label: "Inverter-driven mini-split compressor", verdict: "Check drive board output and DC bus voltage first - a bad drive produces symptoms that look identical to a failing compressor." },
      ],
    },
  ],
  "s-runscontinuously": [
    {
      ask: "Put a separate thermometer next to the thermostat and compare readings after a few minutes.",
      options: [
        { label: "Thermostat reads several degrees off the reference thermometer", verdict: "Thermostat is mis-calibrated so it never sees setpoint. Correct or replace it before chasing capacity." },
        { label: "Thermostat matches the reference thermometer", next: 1 },
      ],
    },
    {
      ask: "In cooling check charge and airflow; in heating look at the load. What do you find?",
      options: [
        { label: "Cooling: charge or airflow is off spec", verdict: "Low capacity from either one will make it run nonstop. Correct it and recheck." },
        { label: "Heating: open windows/doors or poor insulation, or a small furnace for the house", verdict: "Excessive heat loss or an undersized furnace. The equipment may be doing all it can." },
        { label: "Everything checks out but it is an extreme outdoor day", verdict: "May simply be undersized for the load on extreme days. Verify sizing rather than chasing a component." },
        { label: "Zoned system with a damper stuck open to outdoor or unconditioned air", verdict: "A stuck-open damper mixing in unconditioned air will keep it running. Check the damper." },
      ],
    },
  ],
  "s-rust-in-a-furnace-with-no-condensate-system": [
    {
      ask: "Where does the rust and staining actually start?",
      options: [
        { label: "On top of the heat exchanger or cabinet, running down from the coil or humidifier", verdict: "Water from above. Fix the pan, drain, coil seal, or humidifier connection. The heat exchanger is a victim, but inspect it anyway - long term wetting causes real damage." },
        { label: "At the vent connector or the inducer outlet, running back into the furnace", verdict: "Flue gas is condensing in the vent and draining back. Check vent slope, length, sizing for the actual category, cold runs through unconditioned space, and whether the furnace is orphaned on an oversized common flue." },
        { label: "On the heat exchanger surfaces themselves, with cold return air at the furnace", verdict: "Combustion products are condensing on heat exchanger surfaces because return air is too cold. Check the manual's minimum return air temperature, look for return ducts in unconditioned space, and address deep setback operation. Inspect the exchanger for through-wall damage." },
      ],
    },
  ],
  "s-safety-illegal-unpermitted-install-found": [
    {
      ask: "Sort what you found into the two buckets before doing anything else. Which is it?",
      options: [
        { label: "Improper venting, missing or undersized combustion air, or a gas leak", verdict: "Safety-critical. Follow the safety procedure for that hazard - shut off the gas or CO source, red-tag as needed - before you worry about permit history at all." },
        { label: "Missing disconnect or an electrical connection that is not code-compliant", verdict: "Treat an electrical safety concern like any other hazard - it has to be addressed regardless of permit status, not filed as a paperwork item." },
        { label: "Work appears correct but no permit was ever pulled", verdict: "Documentation matter, not a shutdown. Tell the customer plainly what you found and recommend a permitted correction and inspection rather than a quick fix." },
      ],
    },
  ],
  "s-safety-knob-tube-aluminum-wiring": [
    {
      ask: "Look at the conductors at the thermostat or equipment connection. What are you actually looking at?",
      options: [
        { label: "Individual insulated conductors run through ceramic knobs and tubes, no ground", verdict: "Knob-and-tube. Treat the insulation as brittle no matter how it looks, disturb it as little as possible, and do not splice modern equipment onto it without evaluating whether the circuit is even adequate for the load." },
        { label: "Solid dull-gray conductor, clearly not copper", next: 1 },
        { label: "Standard modern copper conductors", verdict: "Neither of the older wiring methods applies here. Make the connection as standard HVAC electrical work." },
      ],
    },
    {
      ask: "Open and inspect the existing aluminum connections at the device terminals. What do you see?",
      options: [
        { label: "Discoloration, heat damage, or loose terminals at the aluminum connections", verdict: "Known failure point on aluminum branch wiring. The circuit needs electrical attention beyond HVAC scope - document it and get a licensed electrician involved rather than making a new connection." },
        { label: "Connections look clean and tight, no discoloration or heat damage", verdict: "Only proceed with connectors and anti-oxidant compound specifically listed for copper-aluminum, never copper-only devices. If the circuit is not clearly adequate for the equipment load, have an electrician make the transition." },
      ],
    },
  ],
  "s-safety-mold-discovered-ductwork-equipment": [
    {
      ask: "Note how far the growth extends before deciding anything. What is the extent?",
      options: [
        { label: "One isolated spot, right where there is a condensate problem", next: 1 },
        { label: "Widespread through the duct system", verdict: "Beyond a routine cleaning. Recommend the customer have it professionally assessed by an indoor air quality/remediation specialist, especially if anyone in the home reports respiratory symptoms, and correct the moisture cause as part of your scope." },
      ],
    },
    {
      ask: "Check what the growth is actually sitting on.",
      options: [
        { label: "Duct insulation or fiberglass duct board (porous)", verdict: "Porous material with growth generally has to be removed and replaced, not wiped down. Find and fix the moisture source - condensate leak, chronically wet coil, humid crawlspace duct, or a roof/plumbing leak - as part of the HVAC work." },
        { label: "Sheet metal duct, coil, or drain pan (non-porous)", verdict: "Can usually be cleaned with an appropriate antimicrobial product, but address the moisture source first or it comes right back. Document it with photos." },
      ],
    },
  ],
  "s-safety-refrigerant-sensitivity-reaction": [
    {
      ask: "Sweep the indoor coil, line set connections, and accessible fittings with an electronic leak detector. What do you get?",
      options: [
        { label: "Detector confirms a leak at the indoor coil or a fitting", verdict: "Treat it as a genuine indoor air quality issue: increase ventilation, recommend the occupant stay out of the area until it is addressed, and repair per standard refrigerant leak procedure. Note the refrigerant type in your documentation." },
        { label: "No response anywhere, but the indoor unit sits in a small, poorly ventilated closet or room", verdict: "Even a minor leak concentrates in a confined space, so keep looking and treat the exposure concern as real. Ventilate the space while you work." },
        { label: "No response anywhere and the space is open and well ventilated", verdict: "Document that no leak was detected. Do not argue with the customer about their symptoms - suggest they mention it to a physician if it persists, since ruling out the HVAC side does not rule out another cause." },
      ],
    },
  ],
  "s-safety-switch-found-jumpered": [
    {
      ask: "Photograph what you found, shut the furnace down, and remove the jumper. Which safety was bypassed?",
      options: [
        { label: "Primary thermal limit", verdict: "That switch protects against overtemp. Ohm it out of circuit, then diagnose airflow - dirty filter, blocked coil, ducts - before replacing it. Never restore the jumper." },
        { label: "Rollout switch", verdict: "Rollout means flame was escaping the heat exchanger. Inspect the heat exchanger carefully and check the venting; a manual-reset switch that tripped means the protected condition actually occurred." },
        { label: "Pressure switch", verdict: "That switch proves draft. Work the vent and condensate restrictions as the underlying cause before replacing the switch." },
      ],
    },
  ],
  "s-scroll-compressor-flooded-start-damage": [
    {
      ask: "Listen right at startup after a long off-cycle in cool weather.",
      options: [
        { label: "Loud bang, gurgle, or several seconds of rough labored sound that smooths out after a few seconds", next: 1 },
        { label: "Starts smoothly with no bang or gurgle", verdict: "No flooded-start signature on this cycle. Look elsewhere for the complaint." },
      ],
    },
    {
      ask: "With a flooded start confirmed, check the crankcase heater, the metering device, and running superheat.",
      options: [
        { label: "Crankcase heater open, or not powered during the off-cycle", verdict: "With no working crankcase heater, refrigerant migrates to the compressor as the coldest point during a long cool-weather off-cycle. Correct the heater." },
        { label: "TXV/EEV oversized or a metering device stuck open", verdict: "That dumps liquid into the suction line during the off-cycle or at startup. Fix the metering device, not just the compressor." },
        { label: "Low superheat during normal running", verdict: "That is chronic overfeeding setting up repeated flooded starts rather than a one-time event. Correct the overfeeding condition." },
        { label: "Heater and superheat fine, but a known history of flooded starts with declining capacity or rising amp draw", verdict: "Repeated flooded starts cause cumulative wear on a scroll. Factor that history into the diagnosis instead of treating it as unrelated." },
      ],
    },
  ],
  "s-scroll-compressor-reverse-rotation": [
    {
      ask: "On a 3-phase unit, watch suction and discharge pressure within the first 5-10 seconds of a call.",
      options: [
        { label: "Suction pulls down and head pushes up almost immediately", verdict: "Rotation is correct. Reverse rotation is not your problem - look elsewhere." },
        { label: "Suction barely drops and head barely rises, with loud rattling/growling and amps close to or above RLA", verdict: "That is reverse rotation - it is running but not compressing. Shut it down immediately, lock out the disconnect, swap any two of the three line legs, then re-verify pressures on restart." },
        { label: "Unit is single-phase", verdict: "Single-phase scrolls have a fixed rotation and cannot run backward. This is not reverse rotation." },
        { label: "Compressor, motor, or 3-phase feeder work was just done on this job", verdict: "Always verify rotation direction before leaving after 3-phase service - this is a common callback. Check the first 5-10 seconds of pressures now." },
      ],
    },
  ],
  "s-scroll-compressor-tipping-noise": [
    {
      ask: "Note when the rattling/clacking shows up and whether it is constant.",
      options: [
        { label: "Intermittent, only at very low outdoor ambient in cooling, at startup, or other low compression ratio conditions", verdict: "That load-dependent pattern fits scroll tipping, not a mechanical failure. Verify against the manufacturer's minimum operating conditions before condemning the compressor." },
        { label: "Present continuously, worsening over time, with rising amp draw or falling capacity", verdict: "Treat that as a mechanical failure rather than tipping and proceed to compressor replacement." },
        { label: "Intermittent, with low superheat at the compressor inlet or a dead crankcase heater", verdict: "Liquid reaching the compressor lowers the effective compression ratio and is a common trigger for tipping. Fix the flooding condition." },
        { label: "Intermittent, on a unit running at low ambient with no head pressure control", verdict: "Very low condensing pressure with no fan cycling or flooded condenser control sets up tipping-prone conditions. Address head pressure control." },
      ],
    },
  ],
  "s-scroll-internal-check-valve-backspin": [
    {
      ask: "Confirm exactly when the whooshing/rattling happens.",
      options: [
        { label: "Only in the few seconds right after the compressor shuts off", next: 1 },
        { label: "During normal running", verdict: "That is not backspin - backspin's signature is specifically after shutdown. Diagnose it as a running-noise complaint instead." },
      ],
    },
    {
      ask: "How long does the after-shutdown noise last, and has it changed over time?",
      options: [
        { label: "Brief, about a second, and unchanged over time", verdict: "That is the normal moment of reverse spin before the check valve seats. No action needed." },
        { label: "Loud, more than a couple of seconds, or noticeably worse than it used to be", verdict: "Suspect the internal/discharge check valve has failed. It is typically not separately serviceable, so this points toward compressor replacement." },
        { label: "System is short-cycling frequently", verdict: "Frequent stop/starts give the system more chances to build the pressure differential that drives backspin. Rule out an oversized system or a very short off-cycle equalization time before condemning the compressor." },
      ],
    },
  ],
  "s-scroll-vs-recip-noise-comparison": [
    {
      ask: "Identify the compressor type from the nameplate or physical shape first, then characterize the noise against what is normal for that type.",
      options: [
        { label: "Scroll producing a pronounced knock or clatter", verdict: "Scrolls normally run a fairly smooth, higher-pitched whirring sound with little mechanical clatter, so a knock is more likely signaling a real problem - tipping, backspin, or bearing wear." },
        { label: "Reciprocating with steady, consistent clatter or valve-tap sound that has not changed", verdict: "Some mechanical noise is inherent to pistons and valves and can be within normal range. The concerning signs are a clear knock, rising noise level, or a change in character." },
        { label: "One-time bang at startup followed by smooth running, either compressor type", verdict: "That points toward a flooded start - a shared failure mode across both designs, distinguishable from steady-state running noise." },
        { label: "Continuous, load-independent knock or grinding throughout the run cycle, either type", verdict: "That is a stronger indicator of true mechanical wear - bearing, rod, or scroll flank damage depending on type. Compare against a known-good same-model unit when uncertain." },
      ],
    },
  ],
  "s-setting-defrost-interval-jumper": [
    {
      ask: "Run the unit in heating and watch the outdoor coil through a full timing period. Which one are you seeing?",
      options: [
        { label: "Coil ices up between defrosts at the current setting", verdict: "Move the timing jumper on the circuit board to a shorter interval, 60 or 30. Then run heating and observe at least one complete defrost." },
        { label: "Unit defrosts more often than the coil condition warrants", verdict: "Move the timing jumper to a longer interval. Then run heating and observe at least one complete defrost." },
        { label: "Temperature sensor on the feeder tube is loose or not insulated", verdict: "Fix that before touching the jumper. Accumulation only starts when that sensor closes, at about 34 F plus or minus 5 F, with the wall thermostat calling for heat." },
      ],
    },
  ],
  "s-sh-sc-high-high": [
    {
      ask: "Do not add refrigerant on the high subcooling reading - this pattern is a restriction. Check the temperature across the liquid line filter drier.",
      options: [
        { label: "Noticeable temperature drop across the drier", verdict: "The drier is restricted. Replace it, then recheck superheat and subcooling - both should normalize toward spec without touching the charge." },
        { label: "Same temperature in and out of the drier", verdict: "Keep working downstream: a kinked or crushed liquid line, a partially closed liquid line service valve, or debris on the TXV inlet screen." },
      ],
    },
  ],
  "s-sh-sc-low-high": [
    {
      ask: "What metering device does this system have?",
      options: [
        { label: "Fixed-orifice or piston", verdict: "At high-load conditions, low superheat with high subcooling can be a normal characteristic on a piston system. Compare against that system's own charging chart rather than TXV-style targets." },
        { label: "TXV or EEV", next: 1 },
      ],
    },
    {
      ask: "Compare subcooling against the manufacturer's target for current conditions and recover to spec if it is over.",
      options: [
        { label: "Subcooling was over target and both readings came back in line after recovering", verdict: "It was a genuine overcharge. Done." },
        { label: "Subcooling is at spec now but superheat is still low", verdict: "Stop pulling charge. Check for an overfeeding or stuck-open metering device instead." },
      ],
    },
  ],
  "s-sh-sc-low-low": [
    {
      ask: "Check the metering device for a stuck-open or overfeeding condition (see the TXV testing entry) before assuming overcharge. What did it show?",
      options: [
        { label: "Metering device is overfeeding or stuck open", verdict: "That is what is flooding both ends. Correct the valve rather than pulling charge out." },
        { label: "Metering device checks out and the system was recently serviced without a proper deep vacuum", verdict: "Suspect non-condensables - air or moisture left in the system." },
        { label: "Metering device fine and no recent service work", verdict: "Now suspect true overcharge. Recover down to the correct charge per the manufacturer's chart." },
        { label: "Compressor sounds or runs rough along with the low superheat", verdict: "Liquid may be migrating back to the compressor. Check crankcase heater operation if equipped, and do not leave it running in that state while you diagnose." },
      ],
    },
  ],
  "s-shortcycle": [
    {
      ask: "Watch a full heat cycle from the burner compartment. How does it shut down?",
      options: [
        { label: "Flame lights, then drops out after a few seconds and the board retries", verdict: "Points at the flame sensor. A weak or dirty sensor drops the flame mid-cycle then retries - clean and check it." },
        { label: "Burners run several minutes, unit gets hot, then shuts off on the limit", verdict: "Restricted airflow tripping the high limit. Check the filter and overall airflow, and confirm the blower starts promptly and runs at the correct speed on a heat call." },
        { label: "Flame is unstable or lazy the whole time it runs", verdict: "Verify gas pressure is within spec. Low pressure causes flame instability." },
        { label: "Burners run fine and the thermostat simply satisfies early", verdict: "Look at thermostat location. Sunlight or a supply vent blowing on it makes it satisfy before the house does." },
      ],
    },
  ],
  "s-silicon-nitride-igniter-resistance-amps": [
    {
      ask: "With power off, the igniter cooled to room temperature (about 70 to 77F) and disconnected from the ignition control, ohm the 120V silicon nitride igniter.",
      options: [
        { label: "37 to 68 ohms", next: 1 },
        { label: "Outside 37 to 68 ohms", verdict: "Replace the igniter - it is out of the published cold resistance range." },
      ],
    },
    {
      ask: "Reconnect, restore power, place the unit in a heating cycle, and clamp the igniter lead during the preheat cycle.",
      options: [
        { label: "0.37 to 0.68 amps steady state at 120V", verdict: "The igniter passes both published numbers. Look elsewhere for the no-ignition cause." },
        { label: "Outside 0.37 to 0.68 amps", verdict: "Replace the igniter - current draw is out of the published range even though resistance passed." },
      ],
    },
  ],
  "s-single-point-supply-and-return-duct-pressures": [
    {
      ask: "Which single-point reading is carrying most of the total?",
      options: [
        { label: "Return duct pressure is the larger of the two", verdict: "Work the return: undersized or single central return, undersized return drop, restrictive filter grille, panned joist or wall cavity returns, and crushed flex." },
        { label: "Supply duct pressure is the larger of the two", verdict: "Supply-side design or install problem: undersized trunk, too many branches off a small plenum, sharp transitions right off the blower, closed balancing dampers, or crushed flex runs." },
        { label: "Both sides are modest but total static is still high", verdict: "The restriction is inside the cabinet, not the ducts. Take filter and coil pressure drops separately - those live between your two probes." },
      ],
    },
  ],
  "s-sl22klv-defrost-accumulation-logic": [
    {
      ask: "With the unit running in heating, read the outdoor coil temperature. Where is it?",
      options: [
        { label: "Below 35 F", next: 1 },
        { label: "At or above 35 F", verdict: "No frost accumulation time is being counted above 35 F outdoor coil temperature. Before adjusting anything, verify the outdoor coil temperature sensor reads correctly, since all of this logic depends on it." },
      ],
    },
    {
      ask: "Compare the last defrost cycle against the target defrost cycle time. Where did it land?",
      options: [
        { label: "80 percent or less of target", verdict: "The control increases the frost accumulation time by 30 minutes. The longer interval is by design." },
        { label: "120 percent or more of target", verdict: "The control decreases the frost accumulation time by 30 minutes. The shorter interval is by design." },
        { label: "200 percent or more of target, or defrost terminated at the 14 minute maximum", verdict: "The control sets the accumulation time to 30 minutes. Expect frequent defrosts until the cycle times come back in line." },
        { label: "Between 80 and 120 percent of target", verdict: "No change to the accumulation time. This is the design of the control, not a fault." },
      ],
    },
  ],
  "s-sl22klv-fan-motor-voltage": [
    {
      ask: "With the unit running, check for 230VAC at the red outdoor fan motor wires at the contactor. What do you get?",
      options: [
        { label: "No voltage at the red fan motor wires", verdict: "Check main power at the contactor before going any further. The motor is not proven bad." },
        { label: "230VAC present", next: 1 },
      ],
    },
    {
      ask: "Use field test fan mode to hold the fan output on, then do a DC voltage check between the FPWM terminal and the Fan C terminal on the control. What do you read?",
      options: [
        { label: "A PWM command is present and the fan still does not turn", verdict: "The motor is the suspect. Before condemning it, confirm the fan blade turns freely and nothing is jammed in the fan grille." },
        { label: "No PWM command coming out of the control", verdict: "The control is not producing a speed command, so the motor is not proven bad. Chase the control side." },
      ],
    },
  ],
  "s-smart-thermostat-app-offline": [
    {
      ask: "At the thermostat itself, not in the app, check the Wi-Fi connection status and signal strength.",
      options: [
        { label: "Thermostat shows not connected, and signal at that wall location is weak", verdict: "Many thermostats drop off below a certain signal level even if they connected fine during setup somewhere else. Address signal at the actual install location." },
        { label: "Thermostat shows not connected, and the home changed router, password, or had an ISP outage recently", verdict: "The network changed underneath it. Rejoin it to the current network rather than power cycling." },
        { label: "Thermostat shows connected to Wi-Fi but the app still shows offline", verdict: "Check for a manufacturer cloud service outage before blaming the thermostat. This is common and easy to mistake for local hardware trouble." },
        { label: "Connected, network unchanged, no cloud outage", verdict: "As a last step, forget and rejoin the network directly at the thermostat rather than power cycling it repeatedly." },
      ],
    },
  ],
  "s-smart-thermostat-common-wire-missing": [
    {
      ask: "At the thermostat, check whether a true C-wire is actually present and connected, and check the existing cable for spare conductors.",
      options: [
        { label: "No C-wire, but there is an unused conductor in the existing thermostat cable", verdict: "Land that spare conductor as the C-wire. Running an actual C-wire is the best fix and it is already in the wall." },
        { label: "No C-wire and no spare conductor in the cable", verdict: "Power-stealing explains the relay chatter, brief unexplained equipment activation, and frequent battery charging. If pulling new wire is not feasible, use a compatible common-wire-generating adapter." },
        { label: "A true C-wire is present and connected", verdict: "Power-stealing is not the issue here. Check the thermostat manufacturer's specific guidance for that model and look for another cause." },
      ],
    },
  ],
  "s-stack-temperature-high-non-condensing": [
    {
      ask: "Clock the meter and take the temperature rise. Which combination do you have?",
      options: [
        { label: "Clocked input is above the rating plate and rise is at or above the top of the range", verdict: "Overfired. Correct the input at the regulator if the correction is small, or change to the correct orifice if it is not. Recheck combustion and stack after." },
        { label: "Input is on spec, rise is above the range, and static pressure is high", verdict: "This is an airflow problem, not a gas problem. Break the static down by component - filter, coil, supply duct, return duct - and fix the restriction. Stack temperature will come down with the rise." },
        { label: "Input is on spec and rise is inside the range, but stack is still high", verdict: "Suspect fouled heat exchanger surfaces or soot restricting heat transfer. Inspect the airside and fireside surfaces, and check combustion for the reason it sooted in the first place before you just clean it." },
      ],
    },
  ],
  "s-standing-pressure-ambient": [
    {
      ask: "With the system off and settled, compare standing pressure to the PT chart at the measured surrounding temperature.",
      options: [
        { label: "Standing pressure matches the PT chart", verdict: "There is liquid and vapor in the system at the expected relationship. It does not prove the charge is correct, but it rules out an empty system and gross contamination. Start it and take running readings." },
        { label: "Standing pressure is well below the PT chart value", verdict: "There may be no liquid left in the system - vapor only. Treat it as severely low or empty, find the leak, and do not just add refrigerant and leave." },
        { label: "Standing pressure is well above the PT chart value", verdict: "Something in there is not condensing. Non-condensables (air) or a cross-contaminated or wrong refrigerant charge. Use a refrigerant identifier before you recover into your good cylinder." },
        { label: "System has not been off long enough to settle", verdict: "The reading is not valid yet. Either wait it out or take running readings instead and come back to the standing check on the next visit." },
      ],
    },
  ],
  "s-static-high-in-cooling-normal-in-heating": [
    {
      ask: "Compare your measured dry and wet coil pressure drops to the coil's published table at the expected CFM.",
      options: [
        { label: "Dry drop matches the table, wet drop is a bit higher, and both are in line with the published wet column", verdict: "The coil is behaving normally - a wet coil just costs more static. If total static is still above the equipment rating, the extra is coming from ducts, filter, or grilles, not the coil." },
        { label: "Dry coil drop is already above the table at the expected CFM", verdict: "The coil is loaded or damaged. Pull it and inspect the entering face and the fins. Cleaning through the access panel usually does not reach where the dirt actually is." },
        { label: "Coil drop is fine both ways but cooling CFM is set much higher than heating CFM", verdict: "You are seeing the blower running more air through the same duct system. Verify the CFM per ton the system is programmed for and whether the ductwork can carry it before changing anything." },
      ],
    },
  ],
  "s-static-pressure-methodology": [
    {
      ask: "Take manometer readings immediately downstream of the equipment on the supply side and immediately upstream on the return side after the filter, add them (return reads negative, so add its absolute value), and compare the total against the equipment's rated maximum for the speed in use.",
      options: [
        { label: "Total external static is above the equipment's rated maximum", verdict: "The blower is being asked to work harder than designed, regardless of whether airflow still feels adequate. Treat this as a real restriction problem to find." },
        { label: "Total external static is at or below the rated maximum", verdict: "Cross-reference the number against the manufacturer's blower performance table for the installed motor and speed tap to estimate actual delivered CFM." },
        { label: "Readings look erratic or implausible", verdict: "Check the test port location. A port drilled right at a turn, takeoff, or transition gives a falsely turbulent reading, so re-drill in a straight section close to the cabinet." },
      ],
    },
    {
      ask: "Move the probes to both sides of individual components to see where the resistance actually is.",
      options: [
        { label: "One component such as the filter, coil, or a specific duct section shows most of the drop", verdict: "That is the section to correct, rather than treating a high total as one undifferentiated problem." },
        { label: "The drop is spread fairly evenly across components", verdict: "No single restriction stands out. Retest after any correction to confirm the number actually moved rather than assuming a visual improvement resolved it." },
      ],
    },
  ],
  "s-static-reading-unstable-or-backwards": [
    {
      ask: "After zeroing and repositioning the probe, is the reading stable?",
      options: [
        { label: "Steady now, and the sign makes sense on each side", verdict: "Good reading. Record it door-on and go to work on the actual restriction." },
        { label: "Still bouncing, and the blower is a variable speed unit still ramping", verdict: "Wait for the blower to settle at its target airflow. If it never settles, that is a separate problem - the motor is hunting, which points at programming, a control signal issue, or a system it cannot satisfy." },
        { label: "Still bouncing on a fixed speed blower", verdict: "The probe is in turbulence or too close to a fitting. Relocate it further from transitions and the blower discharge, and re-read." },
      ],
    },
  ],
  "s-subcooling-high-overcharge-vs-restriction-nuance": [
    {
      ask: "Subcooling is high. Read superheat at the same time - that direction is the differentiator.",
      options: [
        { label: "Superheat low or normal-low, with suction pressure running a bit higher than normal", verdict: "That leans true overcharge - more total refrigerant mass than the system needs, showing on both sides. Recover excess to the chart target." },
        { label: "Superheat high, with suction pressure running lower than normal", verdict: "That leans a restriction trapping liquid in the condenser - plugged drier, kinked line, restricted TXV inlet. Do not pull charge, or you will leave it undercharged once the restriction is cleared." },
        { label: "Genuinely uncertain between the two", verdict: "Check for a temperature drop across the filter drier and confirm the liquid line service valve is fully open before touching the charge. Those cheap checks rule out the restriction case first." },
      ],
    },
  ],
  "s-suction-accumulator-function-failure": [
    {
      ask: "Confirm the unit actually has an accumulator, then look at what it is doing during operation.",
      options: [
        { label: "No accumulator on this system", verdict: "Do not troubleshoot one that is not there. Common on heat pumps and some AC systems with floodback history, but not universal." },
        { label: "Compressor slugging - banging at startup, flooded operation - even with a properly sized accumulator installed", verdict: "Check the internal bleed orifice/U-tube for a plug. A plugged bleed passage stops oil and trapped liquid from returning, starving the compressor of oil while appearing to protect it." },
        { label: "Compressor bearing noise or running low on oil with no external leak", verdict: "That points to the accumulator's oil return path having failed rather than its liquid trapping function." },
        { label: "Accumulator staying unusually cold or frosted during normal running, not defrost", verdict: "It is holding more liquid than it should be metering back, which points to an overfeeding metering device upstream rather than the accumulator itself. Accumulators rarely fail outright." },
      ],
    },
  ],
  "s-suction-accumulator-undersized-retrofit": [
    {
      ask: "Check the service history for retrofit work before calling this an accumulator failure.",
      options: [
        { label: "Compressor replaced with a different displacement, coil replaced, or refrigerant changed", verdict: "The original accumulator may not have enough liquid-holding capacity for the new operating conditions. Check the manufacturer's sizing guidance against the current compressor displacement and tonnage." },
        { label: "Recurring floodback or oil-return symptoms that started right after retrofit work, even though the accumulator tests mechanically fine", verdict: "That points to a sizing mismatch rather than a defective part. Replacing with a correctly sized accumulator, not the same part again, is the durable fix." },
        { label: "System is still in its original factory configuration", verdict: "A retrofit sizing mismatch is not the explanation. Look at the accumulator itself and the upstream floodback causes instead." },
      ],
    },
  ],
  "s-suction-line-sweating-condensation": [
    {
      ask: "Trace the water back to where it is actually coming from before assuming anything.",
      options: [
        { label: "Water forming on bare suction line or uninsulated fittings", verdict: "Re-insulate with properly sized closed-cell foam, sealing seams and joints including flare fittings and valve stems, not just the straight runs. Charge and system operation are unaffected, so do not chase a charge problem over this." },
        { label: "Water dripping from the coil drain pan", verdict: "That is a separate condensate issue, not insulation. Do not re-insulate over a drain problem." },
        { label: "Sweating shows up only in humid weather on marginal insulation", verdict: "It is humidity-dependent, which makes it look intermittent. Consider thicker-wall insulation for high-humidity applications or long runs through hot attics." },
      ],
    },
  ],
  "s-surge-damage-after-storm": [
    {
      ask: "Check the control board fuse first.",
      options: [
        { label: "Fuse was blown, replaced it, and the system runs", verdict: "The fuse sacrificed itself in the surge. Verify nothing else was damaged before closing out." },
        { label: "Fuse blown and there is scorching on the board, transformer, or wiring", verdict: "Real surge damage. Replace the damaged components and treat the equipment as an electrical hazard until fully inspected." },
        { label: "Fuse is good", next: 1 },
      ],
    },
    {
      ask: "Check the rest of the system, indoor and outdoor separately.",
      options: [
        { label: "Outdoor components dead but indoor fine, or the reverse", verdict: "A nearby strike can take out one and not the other. Diagnose them separately." },
        { label: "Communicating system acting erratic", verdict: "Check the communication boards and modules - they are especially surge-sensitive." },
        { label: "This has happened before at this property", verdict: "Discuss surge protection options with the customer rather than replacing the same part again." },
      ],
    },
  ],
  "s-temperature-rise-thermometer-placement": [
    {
      ask: "Look at how the reading was actually taken before trusting the number. Which of these is true?",
      options: [
        { label: "The supply probe can see the heat exchangers directly", verdict: "Radiant line of sight gives a falsely high reading. Reposition the supply probe so it cannot sample temperature directly from the heat exchangers, then re-measure." },
        { label: "Registers or dampers were not in their final position, or the filter and access panels were off", verdict: "The duct system was not in its real operating condition. Open all registers, set every damper to its final fully or partially open position, install the intended filter, close all access panels, then re-measure." },
        { label: "The unit ran less than 15 minutes before the reading was taken", verdict: "Temperatures had not stabilized. Run the unit at least 15 minutes before taking readings." },
        { label: "Placement and setup are correct and rise is still outside the rating plate range", verdict: "The number is real. Investigate airflow and firing rate rather than adjusting the gas valve on assumption." },
      ],
    },
  ],
  "s-temperature-sensor-resistance-check": [
    {
      ask: "Identify the sensor named by the fault - outdoor air (Ta), outdoor coil (Tm), outdoor liquid (Tl), discharge (Td), indoor gas (Tgi), or indoor liquid (Tli). With power off, disconnect it at the board, ohm across its terminals, and note the actual temperature at the sensor location.",
      options: [
        { label: "Reads outside the valid range for that temperature on the thermistor resistance and temperature characteristics table", verdict: "The sensor has drifted. Replace it." },
        { label: "Reading matches the table for the measured temperature", verdict: "The sensor is good. Reconnect, restore power, and look past the sensor for the fault source." },
      ],
    },
  ],
  "s-thermostat-communicating-vs-conventional-swap": [
    {
      ask: "Look at what actually lands on the thermostat before quoting any swap. What wiring do you find?",
      options: [
        { label: "Two data wires - A/B, 1/2, or RS-bus - with a brand-matched thermostat", next: 1 },
        { label: "Conventional R/G/Y/W wiring", verdict: "Conventional system, so a Nest or ecobee swap is fine here. None of the communicating limitations apply." },
      ],
    },
    {
      ask: "Check the indoor unit's manual in Manuals for a legacy or 24V fallback mode. What does it say?",
      options: [
        { label: "A legacy/24V mode exists via jumpers or settings", verdict: "It will run reduced staging off a conventional stat, but you lose modulation and communication features. Confirm staging, defrost, and airflow behavior before leaving - 'it runs' is not 'it runs right'." },
        { label: "No fallback mode listed for this equipment", verdict: "Do not promise the swap. The brand's own smart stat - S40, Infinity/Evolution touch, Daikin One+ - is the answer, with app control and full system function." },
      ],
    },
  ],
  "s-thermostat-geofencing-erratic": [
    {
      ask: "Check location services and app permissions on each household member's phone.",
      options: [
        { label: "Disabled or restricted on one or more phones", verdict: "That is the single most common cause. Enable location permission for the thermostat app on every phone that is part of the geofence." },
        { label: "Enabled on all phones", next: 1 },
      ],
    },
    {
      ask: "Look at the configured geofence radius and each phone's current presence status.",
      options: [
        { label: "Radius set small", verdict: "A small radius fails to trigger reliably depending on GPS accuracy, especially in dense urban areas. Widen it." },
        { label: "One phone shows home while another shows away", verdict: "Conflicting presence between household members breaks combined presence logic. Sort out which phones should be included." },
        { label: "Permissions, radius and presence all look right and it still misfires", verdict: "Recommend a traditional time-based schedule as a fallback rather than chasing phone-side GPS and permission issues indefinitely." },
      ],
    },
  ],
  "s-thermostat-heatcool-reversed": [
    {
      ask: "At the equipment board, verify which terminal actually energizes the reversing valve, then compare that to the thermostat's O/B setting.",
      options: [
        { label: "Board energizes the valve on the opposite call from the thermostat's O/B setting", verdict: "That is the O/B configuration in the thermostat setup menu - a software setting, not just a wiring choice. Match it to what the board actually does; do not assume based on brand." },
        { label: "O/B matches the board, but Y and O are landed on the wrong terminals at one end", verdict: "Wiring error. A swapped Y/O wire or a reversed color convention between old and new equipment is the most common cause - correct the terminations at both ends." },
      ],
    },
  ],
  "s-thermostat-isolation-jumper-test": [
    {
      ask: "Pull the thermostat wires off the furnace terminal board, jumper R to W (W1 and W2 on two-stage), restore power with the door interlock closed, and watch the sequence.",
      options: [
        { label: "Inducer runs, pressure switch pulls in, igniter heats, gas valve opens, burners light", verdict: "The furnace runs fine on its own, so the trouble is in the thermostat or its wiring. Kill power and check their continuity, then repair or replace." },
        { label: "Induced draft motor never runs or the pressure switch never pulls in", verdict: "The problem is on the equipment side. Work the inducer and pressure switch circuit - the thermostat is cleared." },
        { label: "Igniter heats but the gas valve never opens or the burners do not light", verdict: "Equipment side again. Work the gas valve and ignition circuit rather than the thermostat." },
      ],
    },
    {
      ask: "For the cooling side, kill power and jumper R to Y (Y1 or Y2 on two-stage) and to G, then restore power.",
      options: [
        { label: "Blower starts and the condensing unit runs", verdict: "The trouble is again in the thermostat or wiring. Check continuity with power off, repair or replace, then reinstall the blower door." },
        { label: "Blower or condensing unit does not run on the jumper", verdict: "The equipment side owns this one - the thermostat and its wiring are cleared." },
      ],
    },
  ],
  "s-thermostat-loses-programming": [
    {
      ask: "Check whether a proper C-wire is landed at the thermostat, and whether it uses batteries to hold settings.",
      options: [
        { label: "No C-wire - it is power stealing", verdict: "A thermostat power-stealing without a proper C-wire can lose settings or reset during brief power interruptions. Land a C-wire." },
        { label: "C-wire present but the backup batteries are weak or dead", verdict: "The backup battery is not holding settings through interruptions. Replace the batteries." },
        { label: "C-wire present and batteries good", next: 1 },
      ],
    },
    {
      ask: "Look at what is happening around the thermostat.",
      options: [
        { label: "The property has frequent brief power outages", verdict: "A utility issue can reset it even with otherwise correct wiring. The thermostat may not be at fault." },
        { label: "Smart thermostat with a firmware update pending", verdict: "A pending firmware update can cause periodic resets. Let it complete the update." },
        { label: "Thermostat is old", verdict: "Its internal backup capacitor or battery may simply be at end of life. Replace the thermostat." },
      ],
    },
  ],
  "s-thermostat-schedule-occupancy-conflict": [
    {
      ask: "Take one specific complaint about the temperature changing on its own and line the time up against the programmed schedule and the occupancy sensor activity log if the thermostat stores one.",
      options: [
        { label: "The change matched a scheduled setback or recovery time", verdict: "The programmed schedule did it. Walk the customer through their actual program rather than chasing a fault." },
        { label: "The change lined up with occupancy sensor activity", verdict: "Occupancy-based setback is acting on top of the schedule. Check which feature the thermostat gives priority, since many let occupancy temporarily override the schedule." },
        { label: "Occupancy activity showed up when nobody was home", verdict: "A pet, HVAC airflow, or a pass-through hallway is falsely triggering the sensor. Check its placement and sensitivity." },
        { label: "Both features are active and producing results the customer does not want", verdict: "Simplify by disabling one, usually the occupancy-based setback, and relying on the fixed schedule, rather than trying to tune both at once. Document what was changed." },
      ],
    },
  ],
  "s-thermostat-sensor-calibration-procedure": [
    {
      ask: "Set a calibrated reference thermometer next to the thermostat, out of sun and drafts, let both stabilize 15-20 minutes, then compare readings.",
      options: [
        { label: "Within about a degree F of the reference", verdict: "That is inside the typical factory accuracy spec for most thermostats. No offset is needed." },
        { label: "Off by a small but consistent amount", verdict: "Apply the smallest offset needed in the calibration or offset menu, usually under installer or advanced settings, then re-verify after another 15-20 minutes rather than guessing and moving on." },
        { label: "Off by several degrees, or drifting inconsistently over time", verdict: "Suspect a failing internal sensor rather than a simple offset. On most models the sensor is not separately serviceable, so this means replacing the thermostat." },
        { label: "Thermostat is on an exterior wall, near a supply register, in direct sun, or above a heat-producing appliance", verdict: "That is a placement problem mimicking a calibration issue. No offset setting will fully fix a genuinely bad location." },
      ],
    },
  ],
  "s-thermostat-short-cycles-anticipator": [
    {
      ask: "Confirm this is a mechanical anticipator-equipped thermostat (mercury bulb or bimetal), then measure the actual amp draw of the heating control circuit and compare it to the anticipator setting.",
      options: [
        { label: "Setting is lower than the measured amp draw", verdict: "Too low relative to actual amp draw causes short cycling. Set the anticipator to the measured value." },
        { label: "Setting is higher than the measured amp draw", verdict: "Too high causes long cycling and overshoot. Set it to the measured value." },
        { label: "It is an electronic or smart thermostat with no anticipator", verdict: "Most electronic and smart thermostats do not have this component. Do not spend time here - the short cycling is coming from somewhere else." },
      ],
    },
  ],
  "s-thermostat-shows-wrong-temp": [
    {
      ask: "Compare the thermostat against a calibrated reference thermometer at the same height and location, and look at where it is mounted.",
      options: [
        { label: "It is near a supply vent, in direct sunlight, on an exterior wall, or above a TV or lamp", verdict: "Placement is skewing the reading, not a hardware fault. Relocate it or remove the influence." },
        { label: "Placement is clean but there is a draft from the wall penetration behind it", verdict: "Wall-cavity temperature is influencing the sensor. Seal the penetration behind the thermostat." },
        { label: "Placement is fine but the calibration/offset setting was set wrong", verdict: "Correct the offset rather than assuming a hardware fault." },
        { label: "Placement and calibration both check out and it is still consistently off", verdict: "Replace the thermostat." },
      ],
    },
  ],
  "s-thermostat-wrong-swing-setting": [
    {
      ask: "Watch several cycles against setpoint. Which way is it off?",
      options: [
        { label: "Turns on and off frequently, short cycling", verdict: "That is a very tight differential/swing setting. Widen it, but set expectations with the customer about the comfort and cycling tradeoff first." },
        { label: "Long temperature swings and the customer says it is not keeping up", verdict: "That is a wide differential. Tightening it will cycle more often - explain the tradeoff before changing the number." },
        { label: "Cycling does not track the differential setting at all", verdict: "Check for a minimum on-time/off-time or compressor short-cycle protection setting interacting with the differential in ways the customer would not expect." },
      ],
    },
  ],
  "s-time-delay-relay-testing": [
    {
      ask: "Confirm which delay type the application expects (delay-on-make, delay-on-break, or interval), then power the relay and time the actual delay with a stopwatch against its rated setting.",
      options: [
        { label: "Closes instantly with no delay at all", verdict: "That is a failure pointing toward stuck contacts rather than the timing circuit." },
        { label: "Never closes at all", verdict: "That is a failure pointing toward a failed timing circuit rather than the contacts." },
        { label: "Delay is consistent but does not match the rated or expected time", verdict: "Check whether the timing potentiometer or dip switches were bumped or set wrong on a prior service call. An unexpectedly long or short delay is often a setting, not a failed relay." },
        { label: "Delay drifts and is inconsistent between cycles", verdict: "That points to a failing timing circuit, common on electromechanical and RC-timer designs, rather than a simple contact failure." },
      ],
    },
    {
      ask: "On a compressor short-cycle protection relay specifically, check the delay length and the relay type against the application.",
      options: [
        { label: "Delay is too short to prevent a restart against high head pressure", verdict: "It defeats the purpose of the device even though it technically works. Several minutes is typical for this application." },
        { label: "Installed relay is the wrong delay type, for example delay-on-break where delay-on-make is required", verdict: "It will pass a basic continuity test but behave wrong in the actual application. Replace it with a matching delay type and timing range." },
      ],
    },
  ],
  "s-too-much-airflow-symptoms": [
    {
      ask: "Measure total external static pressure at the unit and compare it against BOTH the minimum and maximum allowable duct static in the specifications.",
      options: [
        { label: "Static above the maximum", verdict: "Read that as insufficient air, which causes coil icing - the opposite complaint. Work restriction: closed dampers, dirty filters, undersized or poorly laid out ductwork." },
        { label: "Static below the minimum, with high airflow off the CFM versus static pressure drop table", next: 1 },
        { label: "Static inside the allowable range", verdict: "Airflow is not the story here. Use the coil's CFM versus static pressure drop table to confirm actual airflow before looking elsewhere." },
      ],
    },
    {
      ask: "With low static and high airflow, check blower motor amp draw against the nameplate.",
      options: [
        { label: "Amps above the nameplate value", verdict: "Too much air is overloading the motor on top of the condensate blow-off and poor humidity control. Correct the blower speed or CFM setting to the design value and re-measure." },
        { label: "Amps within the nameplate value", verdict: "Still the blow-off and humidity case - excess airflow pulls condensate off the coil. Correct the blower speed or CFM setting to design and re-measure before leaving." },
      ],
    },
  ],
  "s-trane-condenser-no-diagnostics": [
    {
      ask: "With a cooling call in, read 24V between Y and C at the condenser low-voltage connections. What do you have?",
      options: [
        { label: "No 24V at Y", verdict: "The problem is upstream - thermostat, wiring, or indoor board. Nothing in the condenser is at fault yet." },
        { label: "24V present at Y", next: 1 },
      ],
    },
    {
      ask: "Work the contactor: 24V at the coil, does it pull in, and what happens to voltage through the contacts under load?",
      options: [
        { label: "No 24V at the coil, or it will not pull in", verdict: "Contactor coil or its circuit. Replace the contactor and recheck the call." },
        { label: "Pulls in but voltage drops through the contacts under load", verdict: "Pitted contacts. That starts fans but stalls compressors - replace the contactor." },
        { label: "Pulls in and holds voltage through the contacts under load", next: 2 },
      ],
    },
    {
      ask: "Test the dual run cap against its labeled MFD, both HERM and FAN sections. How does it measure?",
      options: [
        { label: "One or both sections outside +/-6% of the label", verdict: "Bad run cap - the single most common failure on these. Replace it and recheck motor operation." },
        { label: "Both sections within +/-6% of the label", verdict: "Move to compressor and fan amp draws against nameplate RLA/FLA, and only then to pressures and superheat/subcooling per the charging chart in the service panel." },
      ],
    },
  ],
  "s-trane-e61-e62-polarity-and-grounding": [
    {
      ask: "Read the fault code from the furnace control display. Which one is it?",
      options: [
        { label: "e6.1, voltage reversed polarity", verdict: "Hot and neutral are landed backward somewhere. Check the LINE and Neutral connections at the furnace against the wiring diagram, and verify polarity at the receptacle or junction feeding the furnace, since the reversal is often upstream." },
        { label: "e6.2, bad grounding", verdict: "Verify the equipment ground conductor is present, landed, and tight at the cabinet and back at the panel, and check ground continuity from the burner assembly to the panel ground, cleaning any painted, corroded, or loose point." },
      ],
    },
  ],
  "s-trane-flame-and-gas-valve-fault-codes": [
    {
      ask: "Pull the code from the furnace control display before doing anything else. Which one is it?",
      options: [
        { label: "e2.2, recycles exceeded", verdict: "Flame was sensed then lost, with a one hour lockout after 10 occurrences. Look at flame stability, the flame sensor, and combustion air." },
        { label: "e08, flame current low but still allowing operation", verdict: "Treat it as an early warning - clean the flame sensor and verify the ground before it becomes a no-heat call." },
        { label: "e05, flame detected when it should not be present", verdict: "Suspect a leaking gas valve or a control seeing a false signal." },
        { label: "e7.1, gas valve (MVL) energized when it should be off", verdict: "Shutdown-worthy, same as the related gas valve relay stuck closed code. Shut off the gas at the valve until it is corrected." },
      ],
    },
  ],
  "s-trane-s9v2-vent-equivalent-length": [
    {
      ask: "Measure the straight pipe on the vent and the inlet separately, count every elbow including the termination tee or bend, add the equivalent lengths and the termination kit allowance (5 ft for BAYAIR30AVENTA or BAYAIR30CNVENT, 0 ft for BAYVENT200B or BAYVENTCN200B). How does each pipe compare to the Table 31 maximum for this model, pipe size and altitude?",
      options: [
        { label: "Both pipes are at or under the table maximum and at or above the 15 ft equivalent minimum", verdict: "Vent length is not the cause of the nuisance trip - the maximum is per pipe, not combined, and you are inside it. Look elsewhere for the pressure switch problem." },
        { label: "One pipe is over the table maximum for its size", verdict: "That run is overlength. Shorten it, reduce elbows, or upsize the pipe within what the table allows, then verify draft and combustion after the repair." },
        { label: "A run is below the 15 ft equivalent minimum", verdict: "All models require a 15 ft equivalent minimum vent length. Correct the run before returning the furnace to service." },
      ],
    },
    {
      ask: "What vent material is actually installed?",
      options: [
        { label: "Pipe using the manual fitting equivalents", verdict: "Use the manual numbers: one short radius 90 equals 10 ft of 4-inch, 10 ft of 3-inch, or 8 ft of 2-inch; one long radius 90 equals 6 ft of 4-inch, 7 ft of 3-inch, or 5 ft of 2-inch; two 45s equal one long radius 90; one mitered elbow equals 12 ft of 3-inch or 2-inch." },
        { label: "A listed polypropylene system - PolyPro, Z-DENS, InnoFlue, ECCO or Polyflue", verdict: "Use that vent manufacturer fitting equivalents instead, since they differ from the manual numbers. Your total will be wrong if you use the Trane table." },
      ],
    },
  ],
  "s-trane-s9v2-vent-length-altitude": [
    {
      ask: "Get the exact S9V2 model number and the installed altitude, find the altitude band in Table 31 (0-2,000 ft, 2,001-5,400 ft, 5,401-7,800 ft, 7,801-10,100 ft) and read the cell for your model and pipe size. What does it say?",
      options: [
        { label: "The cell is marked as not allowed", verdict: "Hard stop. That pipe size cannot be used on that model at that altitude - the vent must be resized, not just shortened." },
        { label: "A maximum length is listed and both pipes come in under it", verdict: "Vent length is legal for this altitude. Confirm each pipe is also at or above the 15 ft equivalent minimum before moving on." },
        { label: "A maximum is listed and the existing vent exceeds it", verdict: "Shorten the run, reduce elbows, or upsize the pipe within what the table allows for this model. Do not return the furnace to service on an overlength vent." },
      ],
    },
  ],
  "s-trane-s9v2vs-ht2-w1-w2-jumper": [
    {
      ask: "Open the furnace, look at the W1 and W2 terminals on the low voltage terminal strip, and confirm what thermostat is installed. What do you have?",
      options: [
        { label: "Jumper between W1 and W2 with a single stage heating thermostat", verdict: "That jumper is required with a single stage heating thermostat, and HT2 will be displayed at all times with it in. Nothing to fix - second stage still begins only after the interstage delay has completed." },
        { label: "No jumper between W1 and W2 with a single stage heating thermostat", verdict: "A single stage heating thermostat requires that jumper at the low voltage terminal strip. Install it." },
        { label: "Outdoor unit is variable speed", verdict: "Refer to the relay panel instructions. Variable speed outdoor systems require different connections for correct LED readout and defrost operation." },
      ],
    },
  ],
  "s-trane-s9v2vs-inducer-learning-routine": [
    {
      ask: "Before you connect a manometer, find out whether a learning routine is due. Which applies?",
      options: [
        { label: "Unit was just commissioned, or power to the furnace was interrupted", verdict: "A learning routine is due. Hold off on any gas manifold measurement or adjustment until the routine for that stage has completed." },
        { label: "Unit has run 150 first stage cycles or 100 second stage cycles since the last one", verdict: "The routine runs again at those cycle counts. Wait it out before taking manifold readings." },
        { label: "Both first and second stage routines have already completed", verdict: "Now you can take manifold pressure readings or make adjustments. Use the LED readout of IDL to confirm the furnace is idle with no thermostat demand between tests." },
      ],
    },
    {
      ask: "Start a first stage heat call and watch the inducer after the ignition process and blower-on delay complete.",
      options: [
        { label: "Speed drops every 2 seconds until PS1 opens, then rises every 3 seconds until PS1 re-closes", verdict: "That is the learning routine finding the point - PS1 re-closing marks the learned speed. Let it finish before touching gas." },
        { label: "Speed climbs from the default until PS1 closes", verdict: "PS1 did not close at the default speed, so the IFC raises RPM until PS1 closes or the maximum RPM for that stage is reached. Once PS1 closes the routine runs as normal." },
        { label: "Nothing changes - the inducer holds the factory default speed the whole cycle", verdict: "The routine begins after the ignition process and blower-on delay complete, not at the start of the call. Give it the full cycle before deciding it never ran." },
      ],
    },
  ],
  "s-trane-safety-switch-fault-code-map": [
    {
      ask: "Read the code at the furnace control display. Which one is it?",
      options: [
        { label: "e04, open limit", verdict: "That one code covers the main thermal limit, the rollout switch, or the reverse airflow switch - identify which is actually open before resetting anything. Check airflow if the main limit opened, and look for physical evidence of flame rollout before resetting a rollout switch." },
        { label: "e3.1, shorted pressure switch stuck closed", verdict: "Check the switch itself and whether its hose is disconnected or its contacts are welded." },
        { label: "e3.2, open pressure switch that will not prove", verdict: "Check the vent, the condensate/drain path, the hose for water or cracks, and the inducer." },
        { label: "e09, open inducer limit switch or condensate pressure switch", verdict: "Look for a blocked or full condensate path on a condensing model." },
      ],
    },
  ],
  "s-transformer-va-overload": [
    {
      ask: "With the transformer running and all accessories energized, measure loaded secondary voltage.",
      options: [
        { label: "Voltage sags well below 24V under load", verdict: "That confirms an overloaded transformer even if it reads fine unloaded. Add up the connected VA of every 24V device (thermostat, gas valve, zone panel and dampers, humidifier solenoid, UV ballast, add-on relays) against the transformer's nameplate rating." },
        { label: "Voltage holds near 24V with everything energized", next: 1 },
      ],
    },
    {
      ask: "Check when the control fuse actually blows and whether the transformer runs hot.",
      options: [
        { label: "Fuse blows only when a specific accessory such as a zone panel or humidifier cycles on, or the transformer is hot to the touch", verdict: "That is the overloaded circuit, not a wiring short. Install a properly sized dedicated transformer for the added load or move the heavy accessory to its own, rather than upsizing the fuse." },
        { label: "Total connected VA is well inside the nameplate rating and nothing runs hot", verdict: "The transformer is not oversubscribed. Re-verify total VA any time a new accessory gets added later, since this is a common callback months after an unrelated install." },
      ],
    },
  ],
  "s-triac-leakage-phantom-call": [
    {
      ask: "Pull the thermostat wire off the terminal that is falsely calling, cap it, and run the system. What happens?",
      options: [
        { label: "The false operation stops completely with the wire off", verdict: "The signal is coming from the thermostat side. Off-state leakage or a stuck output is the likely cause - try a different thermostat, or add an isolation relay on that input." },
        { label: "The equipment still misbehaves with the wire removed", verdict: "The call is being generated inside the equipment. Look at the board relay, a jumper left in from a prior repair, or a shorted conductor inside the cabinet." },
        { label: "It runs erratically and a small relay chatters", verdict: "Leakage is holding the relay part way in. An isolation relay with a proper coil load, or a manufacturer-approved bleed resistor, is the usual fix." },
      ],
    },
  ],
  "s-two-low-pressure-trips-force-defrost": [
    {
      ask: "Ask what the weather was doing when the odd defrost happened, and confirm what mode the unit was in.",
      options: [
        { label: "Freezing rain or a similar icing event, unit running in heat pump heating", verdict: "Two consecutive low pressure switch trips in heat pump heating mode initiate a defrost cycle by design on this control. Inspect the outdoor coil and fan guard for ice from the weather event rather than from a defrost failure." },
        { label: "Normal weather and the low pressure trips keep repeating", verdict: "That is outside the weather-related behavior. Investigate the low pressure switch itself." },
        { label: "Unit was not in heat pump heating mode at the time", verdict: "The two-trip defrost behavior applies to heat pump heating mode. Confirm what the system was actually doing before tying the defrost to the low pressure switch." },
      ],
    },
  ],
  "s-twostage-furnace-stuck-low": [
    {
      ask: "Read the wiring diagram and determine how staging is actually commanded on this furnace. Which scheme is it?",
      options: [
        { label: "Two-stage stat wired W1 + W2", next: 1 },
        { label: "Single-stage stat with the board's timer jumper", verdict: "Confirm the jumper or dip stage-delay setting and wait it out on a test call. Many 'stuck in low' furnaces are just set to a long delay and satisfy small calls on low, which is correct behavior." },
        { label: "Communicating - the algorithm decides", verdict: "Staging is not thermostat-wired here, so there is no W2 to chase. Work it from the communicating side." },
      ],
    },
    {
      ask: "Call for a big temperature rise and check whether 24V lands on W2 at the board. What do you find?",
      options: [
        { label: "No 24V at W2", verdict: "Thermostat settings or wiring. The furnace never received the high-fire command." },
        { label: "24V present at W2 but the furnace stays in low fire", next: 2 },
      ],
    },
    {
      ask: "At the gas valve, check the second-stage solenoid for voltage on a high-fire command and watch manifold pressure against the rating plate. What happens?",
      options: [
        { label: "Voltage at the solenoid but manifold pressure never steps up to the high-fire spec", verdict: "The gas valve is the problem - it is being commanded and not responding." },
        { label: "No voltage at the second-stage solenoid", verdict: "The board is not driving the valve. Replace the control." },
        { label: "It reaches high fire, then bounces back to low", verdict: "Watch the high-fire pressure switch through a full cycle. A marginal vent or starved combustion air causes dropout only at high fire." },
      ],
    },
  ],
  "s-txv-equalizer-schrader": [
    {
      ask: "Inspect the equalizer connection at the suction line. What did you find?",
      options: [
        { label: "Schrader core still in the port, no depressor on the equalizer fitting", verdict: "That is your fault. The valve is blind to suction pressure. Recover, remove the core, and reassemble. Expect the symptom to have been either flooding at very low superheat or a valve that shuts down once the system starts." },
        { label: "Equalizer line is clean and open, bulb is downstream, superheat still wrong", verdict: "Equalizer is not the problem. Move to the powerhead: check bulb charge by warming the bulb in your hand and watching suction pressure, and press the diaphragm for give." },
        { label: "Equalizer line is kinked, crimped, or landed upstream of the bulb", verdict: "Same effect, different cause. The valve is reading the wrong pressure. Reroute or replace the equalizer line and land it downstream of the bulb per the valve literature." },
      ],
    },
  ],
  "s-txv-mop-charge": [
    {
      ask: "Watch suction pressure through the whole pull-down instead of one reading. What does it do?",
      options: [
        { label: "Sits at a ceiling early, then comes down and normalizes as the space cools", verdict: "That is MOP behavior. The valve is limiting evaporator pressure on purpose. Leave it alone and check charge once the load is normal." },
        { label: "Stays low the whole time with high superheat and a temperature drop somewhere in the liquid line", verdict: "Real restriction. Locate the temperature drop - drier, service valve, or metering device inlet - and correct it." },
        { label: "Stays low with high superheat and low subcooling, no localized temperature drop", verdict: "Undercharge. Find the leak, repair it, evacuate, and weigh in the charge rather than topping off." },
        { label: "Erratic, and the valve body is noticeably colder than the bulb", verdict: "The bulb charge has migrated to the cold valve body and the bulb has lost control. Correct the condition making the body cold, or replace the powerhead if the migration has already ruined it." },
      ],
    },
  ],
  "s-txv-overfeed-vs-underfeed": [
    {
      ask: "With airflow and charge already checked, run the system at least 10 minutes to stabilize and read suction pressure and suction line condition. Which signature do you have?",
      options: [
        { label: "High suction pressure, cold suction line, possible liquid slugging of the compressor", next: 1 },
        { label: "Low suction pressure and low system capacity", next: 2 },
      ],
    },
    {
      ask: "Overfeeding signature. Check the charge against the cooling performance charts, the valve power element, and the equalizer tube.",
      options: [
        { label: "Unit is overcharged against the cooling performance charts", verdict: "Correct the charge first - an overcharge produces the overfeeding signature without a bad valve." },
        { label: "Equalizer tube restricted or plugged", verdict: "That is your valve control problem. Clear or replace the equalizer tube." },
        { label: "Charge and equalizer both check out", verdict: "The power element is the remaining suspect. Install thermometers at the liquid line service valve and 4 to 6 inches from the compressor on the suction line and compare superheat against the 7 to 9 degree factory setting." },
      ],
    },
    {
      ask: "Underfeeding signature. Check for a restricted liquid line or drier by looking for a temperature drop across the drier.",
      options: [
        { label: "Clear temperature drop across the drier", verdict: "That is the restriction. Replace the drier and clear the liquid line before suspecting the valve." },
        { label: "No temperature drop across the drier", verdict: "Move to the power element. Install insulated, well-contacted thermometers at the liquid line service valve and 4 to 6 inches from the compressor on the suction line and compare superheat against the 7 to 9 degree factory setting." },
      ],
    },
  ],
  "s-txv-testing": [
    {
      ask: "Check subcooling at the condenser/liquid line and compare it against superheat.",
      options: [
        { label: "Subcooling is off spec too", verdict: "Rule the charge out first. Deal with the charge problem before condemning the valve." },
        { label: "Subcooling is normal but superheat is way off", next: 1 },
      ],
    },
    {
      ask: "Inspect the bulb mounting, then run the response test - warm the bulb by hand or with gentle heat while the system runs steady.",
      options: [
        { label: "Bulb is loose, swinging free, uninsulated, or clamped to the bottom of the line", verdict: "Reclamp it tight to a clean bare section of suction line, insulate it from ambient, and mount it per the manufacturer clock position (commonly 4 or 8 o'clock on horizontal lines), then retest before condemning the valve." },
        { label: "Suction pressure rises and superheat drops within a minute or two when warmed", next: 2 },
        { label: "No response to warming, and none to cooling the bulb with ice either", verdict: "Points to a lost charge in the valve's power element (replace the valve) or a bulb not making good thermal contact - reclamp and reinsulate and retest before condemning it." },
      ],
    },
    {
      ask: "The bulb responds. Check the external equalizer and for a restriction ahead of the valve.",
      options: [
        { label: "External equalizer line is kinked, plugged, or miswired", verdict: "A plugged equalizer causes exactly the same erratic overfeeding symptoms as a bad valve. Correct it and retest." },
        { label: "Pressure drop across the valve is far beyond normal at that load", verdict: "That points to a physical restriction - a partially clogged filter drier or moisture/wax buildup at the valve inlet - rather than a valve response problem." },
        { label: "Equalizer and pressure drop both check out but superheat will not settle in range", verdict: "Suspect an undersized or oversized valve for the application, a non-adjustable valve with the wrong factory superheat setting, or a mismatched orifice for the tonnage - not a bad valve." },
      ],
    },
  ],
  "s-txv-vs-eev-hunting-comparison": [
    {
      ask: "Superheat is oscillating instead of settling. Which metering device is on this system?",
      options: [
        { label: "Mechanical TXV with a sensing bulb", next: 1 },
        { label: "Electronic expansion valve driven by a stepper motor", next: 2 },
      ],
    },
    {
      ask: "On the TXV, check bulb contact and the external equalizer, and watch the valve's response when you heat and cool the bulb.",
      options: [
        { label: "Bulb not making good thermal contact, or a plugged/kinked external equalizer", verdict: "That is a straightforward mechanical fix - reclamp and reinsulate the bulb, or clear the equalizer." },
        { label: "Bulb and equalizer both check out and hunting persists", verdict: "Suspect the valve failing internally or being oversized/mismatched for the load." },
      ],
    },
    {
      ask: "On the EEV, check the thermistor inputs and, where the board allows, the valve position and step commands.",
      options: [
        { label: "A thermistor with poor thermal contact or a slow, delayed reading", verdict: "Bad data into the control algorithm makes it overshoot and correct repeatedly. Fix the sensor mounting or replace the sensor - note a physical bulb test does nothing here, an EEV has no bulb." },
        { label: "Thermistors both check out and hunting persists", verdict: "Suspect the driver board or a control loop poorly tuned for this application, or less commonly a valve position feedback problem." },
      ],
    },
  ],
  "s-uc-board-fan-relay-contacts": [
    {
      ask: "Identify the fan motor type before setting up the meter - the procedure is different for each.",
      options: [
        { label: "ECM motor", next: 1 },
        { label: "PSC motor", next: 2 },
      ],
    },
    {
      ask: "Measure between the black and brown motor leads, then disconnect the fan motor harness at the UC board and check the relay drive pins by stage.",
      options: [
        { label: "Not 208/230 volts between black and brown", verdict: "The motor is not getting high voltage. Work the supply side before touching the relay drive." },
        { label: "High voltage good, but no 24VAC Pin 5 (blue) to Pin 3 (yellow) in low stage, or Pin 5 to Pin 1 (white) in high stage", verdict: "The board is not driving the motor on that stage. Replace the control." },
        { label: "Voltages present at the board and still present at the motor with the harness plugged back in", verdict: "All voltages reach the motor, so the motor is defective." },
        { label: "Voltages present at the board but missing at the motor with the harness plugged in", verdict: "Broken wires in the harness. Repair or replace it rather than the motor or the board." },
      ],
    },
    {
      ask: "Disconnect the PSC motor leads from the 6-circuit harness, meter between circuit 3 (tied directly to L2) and circuit 2 (low speed) or circuit 1 (high speed), and energize at the matching stage.",
      options: [
        { label: "About 0VAC", verdict: "The relay contacts are closed and the board is doing its job. Move to the motor and its capacitor." },
        { label: "About 115VAC", verdict: "The relay is open. Replace the control." },
      ],
    },
  ],
  "s-uc-control-compressor-relay-contacts": [
    {
      ask: "Connect the meter to lugs L2 and C, restore power, provide a call, let the UC control's built-in short cycle delay elapse, and measure across the on-board compressor relay contacts. What do you read?",
      options: [
        { label: "No voltage", verdict: "The contacts are closed and the relay is working. Move on to the compressor, capacitor, and wiring." },
        { label: "About half of supply voltage - roughly 115VAC on a 230VAC unit", verdict: "The relay is open. If it will not close on a valid call, replace the UC control." },
        { label: "You took the reading before the short cycle delay elapsed", verdict: "That built-in delay will fool you. Wait it out and take the measurement again before judging the relay." },
      ],
    },
  ],
  "s-ultracheck-ez-ecm-test": [
    {
      ask: "With the tool's 4-circuit connector in the motor control connector and the clips on a ground source and a 24VAC source, press the orange power button and allow up to 5 seconds. What happens?",
      options: [
        { label: "Orange button lights and the motor starts", verdict: "The motor runs on the tool's own signal, so the motor is not dead. The board or thermostat side is not commanding it." },
        { label: "Orange button lights but the motor does not start", verdict: "Watch the green LED - a blink indicates communication between tool and motor. Compare the tool indicators and motor action against the table in the service manual before repairing or replacing." },
        { label: "Orange button does not illuminate at all", verdict: "The tool has an open fuse or is not properly connected to 24VAC. Fix the tool connection before judging the motor, and do not connect the tool to anything other than 24VAC." },
      ],
    },
  ],
  "s-ut3000-bias-switches-data-voltage": [
    {
      ask: "With BIAS switches 1 and 2 on the UT3000 set to ON and the system powered, measure Data 1 to C and Data 2 to C at the panel. What do you read?",
      options: [
        { label: "2.8 volts and 2.2 volts", verdict: "Valid reading. Bus bias is good - clear all fault codes in the outdoor and indoor unit diagnostic menu folders and run the System Startup Test from the Zone 1 thermostat." },
        { label: "1.9 volts and 1.3 volts", verdict: "Also a valid reading depending on the system. Bus bias is good - move on to clearing fault codes and running the System Startup Test from Zone 1." },
        { label: "2.3 volts and 1.7 volts with a CAPE coil and a 2 stage furnace installed", verdict: "That is the expected pairing for that equipment combination - do not call it a fault." },
        { label: "Something other than those combinations", verdict: "Test all wires for continuity, shorts to 24v common, and shorts to earth ground, and check the HVAC and UT3000 system transformer supply voltage, fuses and breakers on both sides before condemning the panel." },
      ],
    },
  ],
  "s-ut3000-lcd-messages": [
    {
      ask: "Read the message showing on the UT3000 LCD.",
      options: [
        { label: "! SAS Sensor Bad ! (Supply Air Sensor)", verdict: "Supply air sensor is disconnected or failed. The panel falls back to Timed Mode staging until zone demands are satisfied - reconnect or replace the sensor." },
        { label: "! OAS Sensor Bad ! (Outside Air Sensor)", verdict: "Outside air sensor disconnected or failed, so the panel defaults to emergency/high heat on all heating demands. This is also a reliable sign the UT3000 has lost communication with the outdoor unit - check that first." },
        { label: "R32 Call Service", verdict: "A real alarm passed through from the Daikin FIT communicating equipment. The panel shuts the equipment off, opens all zones, and runs the fan to ventilate - diagnose or get service on it now rather than resetting and moving on." },
        { label: "Something else on the display", next: 1 },
      ],
    },
    {
      ask: "Which of these is on the screen?",
      options: [
        { label: "System TOO HOT or System TOO COLD", verdict: "Actual supply air temperature is past the target setpoint by more than the configured OT/UT offset. Check the HVAC system's actual output, not just the UT3000 settings." },
        { label: "System HC Change or System CH Change with a zone number", verdict: "Zones are calling for opposite modes at the same time. The panel honors whichever mode was called first and holds the opposite-mode zone's damper closed for up to 20 minutes before switching - normal behavior, not a fault." },
      ],
    },
  ],
  "s-ut3000-twinned-panel-setup": [
    {
      ask: "Read the code level on both UT3000 control panels. What do you have?",
      options: [
        { label: "Both panels read the same code level - 1.86, 1.87 or 1.88", verdict: "Code levels are compatible for twinning. Move on to power: one dedicated 24v 60va listed transformer feeding both panels, not separate transformers." },
        { label: "The two panels are at different code levels", verdict: "Twinning requires both panels at the same code level, either 1.86, 1.87 or 1.88. Get them matched before going any further." },
      ],
    },
    {
      ask: "Check how the panels are powered. What is installed?",
      options: [
        { label: "One dedicated 24v 60va listed transformer feeding both panels", verdict: "Correct. Both UT3000 panels must share one transformer." },
        { label: "Separate transformers feeding each panel", verdict: "Not allowed on a twinned install. Install a single dedicated 24v 60va listed transformer and run 24v power to both panels." },
      ],
    },
    {
      ask: "Which thermostat are you doing the system setup from?",
      options: [
        { label: "Zone 1 on Panel A, which is a communicating thermostat", verdict: "Correct - only that thermostat can reach the communicating HVAC system menus and activate maintenance functions." },
        { label: "A thermostat on Panel B or another zone", verdict: "That is why the menus are not there. All system setup has to be done from Zone 1 on Panel A." },
      ],
    },
  ],
  "s-ut3000-wiring-troubleshoot": [
    {
      ask: "Look at the UT3000 panel itself. What is dead?",
      options: [
        { label: "LCD and LEDs both dark - the whole panel", verdict: "The main 2.5A (F1) breaker has likely tripped from a short and will feel warm or hot. Pull each hot wire off the panel one at a time until it comes back - the wire you removed when it recovered is the shorted one. Repair it before reconnecting." },
        { label: "One zone or a group of devices dead, rest of the panel fine", verdict: "A 140mA, 350mA, or 100mA breaker protecting that thermostat or damper motor field wiring block has tripped. Remove each hot wire on that block one at a time to isolate the short." },
        { label: "Panel and LCD fine but dampers will not respond", verdict: "Check damper motor wiring for correct connections and output voltage, and confirm you have not got too many or incompatible dampers on a single zone block." },
        { label: "Panel fine but a thermostat shows a fault or will not power up", next: 1 },
      ],
    },
    {
      ask: "What exactly is the thermostat doing, and what do the BIAS DC voltages read?",
      options: [
        { label: "Communicating stat shows Call for Service", verdict: "Points to a short on that zone's Data 1/Data 2 wires, or those wires shorted to 24V or ground. Ohm out that run." },
        { label: "Non-communicating stat simply will not power up", verdict: "That is a shorted 24V circuit to that stat. Check the HVAC system transformer and the UT3000 transformer, fuses, and breakers separately, then ohm the field wiring for continuity, shorts to 24V common, and shorts to ground." },
        { label: "BIAS voltages do not match any of the normal pairs", verdict: "Normal is Data 1 to C 2.8V with Data 2 to C 2.2V, or 1.9V with 1.3V, and a CAPE coil plus 2-stage furnace reads 2.3V with 1.7V. Outside those, you have a wiring or bias dip-switch problem - confirm BIAS dip switches 1 and 2 on the bottom of the panel are ON." },
        { label: "Cooling will not run and the zone stat shows E11", verdict: "Disconnect the wires from the R terminals on the thermostat blocks and the C/PO/PC terminals on the damper motor blocks, restore power, and see if the short clears. If it does, ohm out that field wiring and repair it, then clear fault codes and re-run the System Startup Test." },
      ],
    },
  ],
  "s-uvlight-not-working": [
    {
      ask: "With the blower running, check for voltage at the UV lamp connector and take a brief glance at the lamp.",
      options: [
        { label: "No voltage at the connector while the blower runs", verdict: "Power/wiring problem. Many are wired to run only when the blower runs, so confirm how it is wired before condemning the lamp." },
        { label: "Voltage present but no faint bluish-purple glow at all", verdict: "Lamp has failed - replace it. Brief glance only, never look directly at an energized UV-C lamp." },
        { label: "Lamp is lit", verdict: "Check its rated service life - UV output degrades well before the bulb visibly fails, typically an annual replacement - and confirm the lamp position relative to the coil and airstream matches the install instructions." },
      ],
    },
  ],
  "s-vapor-injection-heat-pump": [
    {
      ask: "At low outdoor temperature, what is the discharge line temperature and what does the control report for the injection circuit?",
      options: [
        { label: "Discharge line temperature climbing high and injection reported inactive", verdict: "The injection circuit is not doing its job. Look at the injection expansion device, its coil or driver, and the control's enabling conditions per the OEM literature." },
        { label: "Injection reported active and discharge line temperature reasonable, but capacity is short", verdict: "The injection circuit is working. Move to the conventional causes - charge by OEM method, defrost performance, airflow, and outdoor coil condition." },
        { label: "No OEM service mode available on this unit", verdict: "Do not guess at injection circuit behavior. Get the model-specific service manual before opening the system or replacing parts." },
      ],
    },
  ],
  "s-variable-capacity-comm-staging-issues": [
    {
      ask: "Before touching charge or airflow, check the thermostat and outdoor board for a communication fault code.",
      options: [
        { label: "Comm-loss or comm-error code displayed, distinct from a capacity/performance code", verdict: "Troubleshoot the communication path, not the mechanical system. Chasing a mechanical cause here wastes time and leads to unnecessary part replacement." },
        { label: "System intermittently drops to a fixed low-capacity or limp-home stage instead of modulating", verdict: "That points to marginal or intermittent communication - many controls default to a safe fixed stage when comm is unreliable." },
        { label: "No comm code, but generic thermostat wire used on a long run, or loose/damaged connections", verdict: "Many communicating systems require a specific wire type or minimum gauge between thermostat, indoor and outdoor units. Correct the wiring before going further." },
        { label: "Comm conductors bundled in the same run as line voltage or other low-voltage wiring", verdict: "Voltage bleeding onto the data line causes exactly this kind of intermittent, hard-to-reproduce staging fault. Separate the runs, and only move to charge/airflow once comm is confirmed solid." },
      ],
    },
  ],
  "s-variable-capacity-fallback-mode": [
    {
      ask: "Capacity seems stuck at one level. Check the thermostat and board for a comm indication.",
      options: [
        { label: "Comm-loss fault or warning shown while the system keeps running and producing heating/cooling", verdict: "That is designed fallback behavior, not a capacity defect. Troubleshoot the communication path - wiring, connections, voltage bleed, firmware compatibility - since the mechanical system is doing what it should." },
        { label: "No comm indication, and the unit is sitting at its published minimum or maximum speed for these conditions", verdict: "That is a speed limit rather than comm fallback. Same look from a capacity standpoint, different root cause and different fix." },
        { label: "Communication restored but capacity still does not change with load", verdict: "Either the comm fix did not fully resolve it, or the fallback condition is intermittent and recurring. Keep digging on the comm path." },
      ],
    },
  ],
  "s-vent-inlet-pipe-diameter-mismatch": [
    {
      ask: "Walk the full vent run and the full inlet run outside the furnace cabinet and note every diameter. What do you find?",
      options: [
        { label: "A diameter change partway along one run outside the cabinet", verdict: "That is a defect - diameters must not be mixed within a single run outside the cabinet. Only adapters at the top of the furnace are allowed. Correct it before returning the unit to service." },
        { label: "Inlet is larger than the vent", verdict: "Permitted. Hold the vent pipe to the maximum length limit for its own size at the installed altitude." },
        { label: "Inlet is smaller than the vent", verdict: "Not permitted. The inlet can be larger than the vent but never smaller - resize the inlet." },
        { label: "Inlet and vent are the same size with no changes in either run", verdict: "Sizing is correct. Move on to the one-pipe and horizontal venting requirements for this model." },
      ],
    },
    {
      ask: "Check the rest of the vent install against the model requirements. Which applies?",
      options: [
        { label: "One-pipe system", verdict: "Confirm the inlet air has at least one 90-degree elbow so dust and debris cannot drop straight into the furnace." },
        { label: "Horizontal venting on this model", verdict: "Confirm the required 2-inch by 3-inch offset reducing coupling is used." },
        { label: "Vertical venting", verdict: "Vertical applications do not need the coupling offset. Verify pressure switch proving and run a combustion/CO analysis after any vent change." },
      ],
    },
  ],
  "s-vent-plume-dripping-normal-or-not": [
    {
      ask: "Confirm the equipment type first, then look at the plume and the termination. What do you have?",
      options: [
        { label: "White plume off a 90%+ condensing furnace, worst in cold weather", verdict: "That is normal - cool saturated flue gas condensing in cold air means the furnace is doing what it should. Explain that it largely disappears on mild days." },
        { label: "Plume looks unusually dark, or you smell exhaust", verdict: "Treat it as a combustion problem and run an analysis rather than dismissing it as a normal plume." },
        { label: "Staining, corrosion or icing on the adjacent wall or siding, or dripping onto a walkway, step or driveway", verdict: "Condensate is acidic and damages surfaces, and drips onto a walkway freeze into an ice hazard. Correct the termination even though the plume itself is normal." },
        { label: "Exhaust too close to the combustion air intake, or frost and scale on the intake", verdict: "That is recirculation. Verify the exhaust terminates the required distance above and away from the intake per the installation manual, and check clearances to windows, doors, soffit vents, meters, and grade." },
      ],
    },
  ],
  "s-vent-termination-blocked-snow-ice": [
    {
      ask: "Before opening the furnace, go outside and look directly at both the exhaust and the combustion air terminations. What do you see?",
      options: [
        { label: "Snow drift, plowed snow bank, or ice packed around the pipes or over the openings", verdict: "Clear the snow and the openings. Then compare termination height against the actual snow depth at this property - if they sit below the snow line this will repeat, and extending them to the manufacturer's required height is the permanent fix." },
        { label: "Frost or rime built up on the intake screen", verdict: "That commonly builds from the exhaust plume. Clear it, and check the manual for whether that model allows the screen to be removed or a different termination kit used - do not remove it on your own judgment." },
        { label: "Ice forming on the wall or ground below the termination", verdict: "The plume is condensing on a surface and freezing back toward the pipe. Clear it and check termination height and location against the installation manual." },
        { label: "Terminations clear and well above the snow", verdict: "Reset the furnace and watch a full cycle, verifying the pressure switch proves and stays proved, and check the condensate drain - a cold snap that ices a vent often ices a condensate line in an unconditioned space." },
      ],
    },
  ],
  "s-warmair-ac": [
    {
      ask: "Go outside while the thermostat is calling for cool. Is the outdoor unit running?",
      options: [
        { label: "Fan and compressor are both running", next: 1 },
        { label: "Outdoor unit is dead - no fan, no compressor sound", verdict: "Nothing is happening to the refrigerant, so the air cannot get cold. Confirm the thermostat is really calling for cooling and not fan-only, then chase why the outdoor unit will not start." },
        { label: "Only the fan runs, no compressor sound", verdict: "Same result, no cooling at the coil. Confirm the call is for cooling, then diagnose why the compressor is not running." },
      ],
    },
    {
      ask: "With the unit running, look at the condenser coil and gauge the system.",
      options: [
        { label: "Condenser coil is dirty or blocked", verdict: "Dirty coil is restricting heat rejection. Clean it and recheck pressures." },
        { label: "Coil is clean but pressures are off against spec", verdict: "Charge problem. Check pressures and charge against spec and correct." },
        { label: "It is a heat pump and the lines feel backwards for the season", verdict: "Confirm the reversing valve is in the correct position for the season." },
      ],
    },
  ],
  "s-warranty-escalate-vs-paid-repair": [
    {
      ask: "With the part confirmed inside an active warranty window, look for an outside cause of the failure. What do you find?",
      options: [
        { label: "Physical damage, evidence of a lightning/surge event, incorrect installation such as undersized wiring or wrong charge, or no basic maintenance", verdict: "Manufacturers typically exclude these even inside the window. Document it with photos and readings and set the customer up for a paid repair." },
        { label: "Nothing external - looks like a straightforward component defect", verdict: "Clearest case for a standard warranty claim. Submit it as one." },
        { label: "The failure may trace back to your own company's recent install or service work", verdict: "Be transparent with the customer and handle it as a callback rather than pushing it through the manufacturer's claim process." },
        { label: "Cause is genuinely ambiguous", verdict: "Document your findings thoroughly first, then escalate to a supervisor or the distributor's warranty desk instead of making a unilateral call in the field." },
      ],
    },
  ],
  "s-warranty-part-coverage-datecode": [
    {
      ask: "Check whether the unit was registered with the manufacturer after installation.",
      options: [
        { label: "Registered within the manufacturer's stated window", verdict: "The longer registered parts warranty applies. Confirm the actual term with the manufacturer's serial number lookup rather than a rule of thumb before quoting." },
        { label: "Never registered", verdict: "Falls back to the shorter base parts warranty. Run the serial through the manufacturer's lookup tool for the real term on this product line before telling the customer either way." },
      ],
    },
    {
      ask: "Look at the failed component itself for its own date code, separate from the unit's.",
      options: [
        { label: "Part carries a later date code than the unit - it was replaced at some point", verdict: "That component's warranty clock may have been reset independent of the unit's original date, which happens with compressors replaced under warranty. Verify with the manufacturer or distributor before quoting." },
        { label: "Part's date code matches the original unit", verdict: "Coverage rides on the unit's own manufacture/install date and the stated terms. Make clear to the customer that even a covered part often does not include labor." },
      ],
    },
  ],
  "s-water-condensate-ceiling-damage-below": [
    {
      ask: "Shut the system down if it is actively leaking, then look under the air handler for secondary protection.",
      options: [
        { label: "No secondary drain pan and no float safety switch under the unit", verdict: "That is the gap that let the overflow reach the ceiling. Correct the condensate cause and add secondary protection as part of the fix - it should not go back the way it was." },
        { label: "Secondary pan and/or float switch are present", verdict: "Then work the condensate leak itself with the standard approach: clogged primary drain, failed pump, cracked or overflowing pan, unlevel unit, failed float switch." },
      ],
    },
    {
      ask: "Assess the ceiling damage itself and communicate it as a separate problem from the HVAC repair.",
      options: [
        { label: "Staining only, nothing sagging or dripping", verdict: "Flag it as its own problem and recommend the customer contact homeowner's insurance and/or a water damage restoration or drywall contractor. Photograph it." },
        { label: "Drywall sagging, or water still actively dripping", verdict: "Well past a stain - standing moisture can lead to mold if left. Recommend restoration and insurance promptly and document both the condensate source and the damage with photos." },
      ],
    },
  ],
  "s-water-sumppump-crawlspace-moisture-equipment": [
    {
      ask: "Add water to the sump pit and watch. What happens?",
      options: [
        { label: "Pump never activates, or runs and does not clear the pit", verdict: "The sump pump is the moisture source to fix first. Also verify the discharge line routes water well away from the foundation rather than recirculating it nearby." },
        { label: "Pump activates, clears the pit, and discharge routes well away", next: 1 },
        { label: "No sump pump present at all", verdict: "Nothing is controlling water in this space. Recommend addressing the moisture source - pump, vapor barrier, or encapsulation - since cleaning and protecting the equipment alone is temporary at best." },
      ],
    },
    {
      ask: "Check how the crawlspace itself is built and inspect the equipment in it.",
      options: [
        { label: "Vented crawlspace in a humid climate, still damp", verdict: "A vented crawlspace can pull in more moisture than it releases - a building-science issue distinct from the sump pump. Recommend vapor barrier or encapsulation as the actual fix." },
        { label: "Sealed or conditioned crawlspace but still showing dampness or a musty smell", verdict: "Look for another water path, and flag any equipment already showing rust on the cabinet, drain pan, or duct straps and hangers - accelerated corrosion shortens equipment life even while it still runs." },
      ],
    },
  ],
  "s-water-waterheater-flue-shared-chimney-spillage": [
    {
      ask: "Fire both appliances together and spillage-test each draft hood with a mirror, smoke match, or draft gauge.",
      options: [
        { label: "Spillage at one or both draft hoods with both firing", next: 1 },
        { label: "No spillage at either hood with both appliances firing", verdict: "No draft interference showing under the worst-case condition. Still check chimney sizing against combined input and inspect the liner if the complaint is intermittent." },
      ],
    },
    {
      ask: "Look at what has changed on this chimney over the years.",
      options: [
        { label: "A second or larger-input appliance was added or replaced, so combined input now exceeds what the vent was sized for", verdict: "Common vent is undersized for the combined load. It needs correction - relining, resizing, or converting one appliance to power/direct vent - before both go back to unsupervised operation." },
        { label: "A high-efficiency water heater was added while the furnace stayed atmospheric, leaving the chimney oversized", verdict: "Classic mismatch after a partial upgrade. The vent system has to be corrected for the actual load, not left as is - confirmed spillage here is a CO risk." },
        { label: "Chimney liner is blocked or deteriorated", verdict: "Blocked or failed liner is your draft problem. Correct the vent before returning both appliances to service, and recommend a CO detector if there is not one." },
      ],
    },
  ],
  "s-waterleak": [
    {
      ask: "Pour water into the drain pan and watch the primary condensate drain line.",
      options: [
        { label: "Water backs up, the drain line does not flow", verdict: "Clogged primary drain - algae is common. Clear it with a wet/dry vac or a cleaner made for condensate lines." },
        { label: "Drain flows fine but the pan still overflows on one side", verdict: "Check that the unit is level - a tilted pan overflows even with a working drain - and inspect the pan for cracks or rust-through." },
        { label: "Unit has a condensate pump and it is jammed or not running", verdict: "The pump is the problem. Free or replace it; the drain itself may be fine." },
        { label: "Drain and pan fine, and a float switch is wired in", verdict: "A float switch should shut the system down before an overflow, not cause one. Confirm it is wired and functioning correctly." },
      ],
    },
  ],
  "s-wire-splice-failure-thermal-cycling": [
    {
      ask: "With power off, wiggle-test the suspect splices while watching continuity, and look them over closely.",
      options: [
        { label: "Continuity changes when the splice is flexed", verdict: "That connection is failing mechanically, not just resistively. Remake it properly rather than re-capping it the same way." },
        { label: "Wire nut spins loosely on the conductors, or you find discoloration, melted or brittle insulation", verdict: "That splice has been arcing or resistively heating. Replace it, and check for the underlying cause rather than just the symptom." },
        { label: "Continuity is steady and the splice looks clean, but the fault is intermittent, worse in temperature extremes, or shows up only after the system has run a while", verdict: "That is the thermal cycling pattern: the splice heats, expands, and opens slightly. Look for an undersized wire nut for the gauge and conductor count, stranded wire not twisted before capping, or aluminum-to-copper at that joint." },
      ],
    },
    {
      ask: "Where is the failing splice located?",
      options: [
        { label: "Outdoor whip, condenser fan leads, or another weather- or vibration-exposed spot", verdict: "Use a sealed weatherproof connector, or a crimped and heat-shrunk butt splice, instead of a standard interior wire nut." },
        { label: "Indoor, low-vibration location", verdict: "Repair with a properly sized connector for the gauge and conductor count." },
      ],
    },
  ],
  "s-wrong-replacement-limit-switch": [
    {
      ask: "Measure the temperature rise across the furnace and compare it against the range on the rating plate. Where does it land?",
      options: [
        { label: "Above the rating plate range", verdict: "Do not chase the limit - fix airflow first: filter, coil, ducts, blower speed, static pressure." },
        { label: "Inside the rating plate range and the limit still trips", next: 1 },
      ],
    },
    {
      ask: "Compare the installed limit against the one called out in the parts list or on the wiring diagram - stamped temperature, stem or capillary length, and where it is mounted. What did you find?",
      options: [
        { label: "Stem or capillary shorter than the original", verdict: "A short stem sits out of the airstream and reads low - it will not trip when the heat exchanger actually overheats. Order the correct part by furnace model and serial number." },
        { label: "Stem longer than the original, or a setpoint lower than the one called out", verdict: "That produces nuisance trips on a furnace with adequate airflow. Get the correct part in - never substitute a higher-temperature limit to stop the trips." },
        { label: "Correct part but relocated to a different opening, wrong orientation, or missing its gasket", verdict: "The limit has to be in its original opening and orientation with the original gasket - put it back where it belongs." },
        { label: "Limit matches the parts list and is mounted correctly", verdict: "With rise inside the plate range and the correct limit installed, the limit has failed - replace it with the same part number and run a full heat cycle." },
      ],
    },
  ],
  "s-x13-tap-swap-proof": [
    {
      ask: "In the failing mode, read motor common to the tap the diagram calls for, then move a known-live 24V to a different tap and watch the motor.",
      options: [
        { label: "No 24V on the tap the diagram calls for", verdict: "The motor is not being asked to run. Chase the board output, the thermostat call, or the low-voltage wiring for that mode. This is not the motor's fault." },
        { label: "24V is present on the tap, and the motor also does nothing on a known-good tap", verdict: "The call is arriving and the motor is not responding. Verify line voltage at the motor and that the wheel spins free, then condemn the motor or its module." },
        { label: "The motor runs when you move 24V to a different tap", verdict: "The motor and module are good. The original tap input or the wiring to it is the problem - recheck the connector pins and the board output for that mode." },
      ],
    },
  ],
  "s-york-tm9v-continuous-amber-flame-current": [
    {
      ask: "Watch the LED on the control. What exactly is it doing?",
      options: [
        { label: "Amber flashing continuously with no pause", verdict: "That is the control warning that flame sense current dropped below 1.5 microamps, not a lockout. Clean the flame sensor, check gas flow to the burners, then measure at the flame current test pad during a firing cycle and verify it is above 1.5 microamps." },
        { label: "No flash at all", verdict: "Check for power to the board and for a blown fuse on the board. If power and fuse are good, the board may need replacement." },
        { label: "Steady on in any color", verdict: "Cycle power to the furnace off and back on. If the fault returns, the control board must be replaced - it is not field-repairable." },
        { label: "Flashes on and off 1/3 second each with a two second pause between repeats", next: 1 },
      ],
    },
    {
      ask: "That is a numbered code. Count the flashes and note the color.",
      options: [
        { label: "1 red flash", verdict: "Flame was sensed with no call for heat. Check for a leaking or slow-closing gas valve." },
        { label: "2 red flashes", verdict: "The pressure switch is closed when it should be open. Find the stuck switch or shorted circuit." },
        { label: "Slow green with no calls, or slow amber with a call for heat", verdict: "Those are the normal states for this control. Look elsewhere for the complaint." },
      ],
    },
  ],
  "s-zone-board-relay-failure": [
    {
      ask: "With that zone calling, check for 24V output at the zone's relay terminal on the board.",
      options: [
        { label: "Voltage present at the terminal but the damper does not move", verdict: "The problem is downstream of the board. Test the damper or actuator by jumping 24V directly to it." },
        { label: "No voltage output at the terminal during the call", verdict: "That points at the board relay itself or its output circuit rather than the damper or thermostat." },
        { label: "Damper stays open or equipment stays energized with no active call", verdict: "That is a relay welded closed. It looks like a stuck damper complaint but is actually a board problem." },
      ],
    },
    {
      ask: "Listen and feel for that relay on the board as the zone call starts and stops, and inspect the board around it.",
      options: [
        { label: "No audible or tactile click at all", verdict: "The relay has likely failed mechanically, or the board is not receiving the call in the first place." },
        { label: "Heat discoloration or a burnt smell at that specific relay position", verdict: "That relay was overloaded, often by driving more damper motors than it is rated for, while the rest of the board works fine. When replacing the board, verify total connected damper load against the new board's per-zone and total ratings." },
        { label: "Relay clicks normally and only this one zone misbehaves while the actuator tests good jumped directly", verdict: "The failure is very likely that board relay's output circuit rather than the whole panel." },
      ],
    },
  ],
  "s-zone-damper-stuck": [
    {
      ask: "Call that zone and check the damper motor's low-voltage connection. Is it getting a signal to open?",
      options: [
        { label: "No signal reaching the damper motor", verdict: "Check the zone control board's fuse and relay for that specific zone, and confirm the panel is not stuck in a bypass/emergency mode holding all dampers in one position." },
        { label: "Signal is there but the damper does not move", next: 1 },
      ],
    },
    {
      ask: "With the damper unpowered, check that the actuator moves freely, then check duct static.",
      options: [
        { label: "Actuator is seized and will not move freely", verdict: "Many are spring-return and seize over time. Replace the actuator." },
        { label: "Actuator moves freely but static is very high with the other zones closed", verdict: "Static may be too high for the damper motor to overcome. That often points to an undersized or missing bypass duct." },
      ],
    },
  ],
  "s-zone-damper-types-butterfly-opposed": [
    {
      ask: "Disconnect the actuator linkage and move the damper blade through its full range by hand with power off.",
      options: [
        { label: "Blade binds or will not move through its full range", verdict: "The problem is mechanical: binding, corrosion, or warping. A bound damper stalls a good actuator and looks like an actuator failure." },
        { label: "Blade moves freely through its range by hand", verdict: "The fault is on the actuator side. Look at the coupling or crank arm, which can strip or slip so the actuator runs while the blade barely moves." },
      ],
    },
    {
      ask: "Identify the damper type and match the symptom to that type's failure modes.",
      options: [
        { label: "Round butterfly damper binding partway through rotation", verdict: "That fits shaft seal or bushing wear, or a blade warped from heat binding at one end of travel." },
        { label: "Rectangular opposed-blade damper with blades out of sync, some open and some shut", verdict: "The linkage arm has disconnected or bent, giving partial and uneven airflow rather than a clean full open or closed." },
        { label: "Zone stays a little warm or cool even with the damper commanded closed", verdict: "Blade edge seals are degrading and leaking air in the closed position, especially on opposed-blade dampers, even though the actuator works correctly." },
        { label: "Actuator was recently replaced and the coupling keeps failing", verdict: "Check its rotation direction and end-stop settings. An actuator installed rotated 90 degrees or with the stops set wrong drives against a mechanical stop and strains the coupling." },
      ],
    },
  ],
  "s-zone-sensor-remote-placement": [
    {
      ask: "Confirm which sensor is actually controlling that zone, then temporarily place a reference thermometer next to it.",
      options: [
        { label: "Sensor reads accurately against the reference", verdict: "It is reporting its location correctly, so the location itself is the issue. Check for direct sun, a nearby supply or return register, an exterior wall, or a heat-producing appliance, using the same rules as a thermostat." },
        { label: "Sensor reads noticeably off the reference", verdict: "The sensor itself is the problem. Confirm that before relocating anything." },
        { label: "The zone is actually controlled by a different sensor than intended, such as the thermostat's built-in or an averaged set", verdict: "Verify the intended configuration matches what is actually assigned on the zoning system before chasing the damper or equipment." },
        { label: "Wireless sensor with weak signal or a dead or low battery", verdict: "The zone can fall back to a default or last-known reading instead of live data. Restore the signal or battery and re-verify." },
      ],
    },
  ],
  "s-zoning-bypass-oversized": [
    {
      ask: "Force the worst case - only the smallest zone calling by itself - and measure static pressure.",
      options: [
        { label: "High static with noise and reduced airflow when only that one zone calls", verdict: "That points to an undersized or missing bypass, with evaporator icing risk and nuisance high-limit trips as the follow-on problems." },
        { label: "Static fine, but calling zones never quite reach setpoint and return temp drifts toward supply on a long cycle", verdict: "That is the oversized bypass pattern - too much conditioned air recirculating back to the return instead of reaching the calling zones." },
        { label: "Static and zone performance both acceptable at worst case", next: 1 },
      ],
    },
    {
      ask: "If the bypass damper is adjustable or motorized, watch it during a call.",
      options: [
        { label: "Damper is stuck or not modulating", verdict: "Fix the damper before assuming the bypass duct itself is sized wrong." },
        { label: "Damper modulating correctly and problems keep coming back", verdict: "For chronic issues, consider whether a variable-speed blower with pressure-based airflow control would serve this system better than a fixed bypass duct." },
      ],
    },
  ],
  "s-zoning-bypass-static-relief-adjustment": [
    {
      ask: "Run the system with only the smallest zone open, measure static pressure at the unit, and note what you hear and feel.",
      options: [
        { label: "Loud rushing or whistling air, static above the rated range, or the coil starting to freeze on that one small zone", verdict: "The bypass is undersized, stuck shut, or set to open too late. Free it or adjust it to open sooner within the acceptable range." },
        { label: "Warm or cool air noticeably mixing back into the return, reduced capacity in the calling zone, or short-cycling on temperature-limit safeties", verdict: "The bypass is oversized or set to open too early, bleeding supply air back constantly and cutting delivered airflow to the calling zone." },
        { label: "Static is within the equipment's rated range with no noise and normal delivery to the calling zone", verdict: "The bypass is set about right. Leave it alone and look elsewhere for the complaint." },
      ],
    },
    {
      ask: "Adjust according to the bypass type installed.",
      options: [
        { label: "Barometric weighted self-adjusting bypass", verdict: "Set the counterweight so the damper only begins to open as static approaches the upper end of the acceptable range. One that opens too early bypasses air constantly and reduces capacity to the calling zone." },
        { label: "Motorized bypass tied to a duct static pressure sensor", verdict: "Set the sensor's setpoint against the equipment's rated external static pressure, not an arbitrary guess." },
        { label: "Bypass is being used to make up for undersized zone ductwork", verdict: "It is meant as a static-pressure relief path, not a substitute for correctly sized duct on every zone. Address the duct sizing rather than the bypass." },
      ],
    },
  ],
  "s-zoning-panel-conflicting-calls": [
    {
      ask: "Time how long the losing zone is actually held off after the opposing call started, and compare that against the panel's documented conflict delay.",
      options: [
        { label: "Held off within the documented delay (commonly up to 20-30 minutes)", verdict: "That is normal, expected zoning behavior, not a fault. This is an education conversation with the customer, not a repair." },
        { label: "Held off far longer than the panel's documented conflict delay", verdict: "Now treat it as an actual fault - look at a stuck damper or a panel logic problem." },
        { label: "Panel's conflict-resolution setting is configurable and set differently than the customer expects", verdict: "Check the panel manual's logic and settings, since this varies by manufacturer. Adjust if appropriate and explain the behavior." },
      ],
    },
  ],
};
