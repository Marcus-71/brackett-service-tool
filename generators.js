/*
 * Generators tab data - Generac air-cooled home standby, one entry per family
 * (27 families). Built from Generac's own owner's / install manuals, spec
 * sheets and support.generac.com articles only. Confirm on the unit's data
 * label and controller - code tables shift between controller generations.
 * Shape: see openGenDetail() in app.js.
 */

const GENERATORS = [
 {
  "id": "gen-generac-next-gen-10-28",
  "series": "Generac (Next Generation)",
  "family": "Generac Next Generation 10-28 kW (Power Zone 200)",
  "controller": "Power Zone 200 (Next Generation Series air-cooled, 10-28 kW)",
  "kw": [
   "10",
   "14",
   "18",
   "22",
   "24",
   "26",
   "28"
  ],
  "engine": "G-Force 400 459cc (10 kW); G-Force 800 817cc (14/18); G-Force 1000 997cc (22-28)",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa). If converting to LP, minimum tank size is 250 US gal (946 L) (A0004332575).",
  "years": "2025-present",
  "sort": 10,
  "models": [
   {
    "g": "G0072570",
    "digits": "7257",
    "desc": "10KW/459 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0072580",
    "digits": "7258",
    "desc": "14KW/817 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0072590",
    "digits": "7259",
    "desc": "18KW/817 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0072600",
    "digits": "7260",
    "desc": "22KW/997 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0072610",
    "digits": "7261",
    "desc": "24KW/997 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0072820",
    "digits": "7282",
    "desc": "28KW/997 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0073210",
    "digits": "7321",
    "desc": "10KW/459 GENERAC 240V 1PH 16C T/SW"
   },
   {
    "g": "G0073230",
    "digits": "7323",
    "desc": "14KW/817 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073240",
    "digits": "7324",
    "desc": "18KW/817 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073241",
    "digits": "7324",
    "desc": "18KW/817 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073250",
    "digits": "7325",
    "desc": "22KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073251",
    "digits": "7325",
    "desc": "22KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073260",
    "digits": "7326",
    "desc": "24KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073261",
    "digits": "7326",
    "desc": "24KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073270",
    "digits": "7327",
    "desc": "26KW/997 GENERAC 240V 1PH NO T/SW"
   },
   {
    "g": "G0073280",
    "digits": "7328",
    "desc": "26KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073281",
    "digits": "7328",
    "desc": "26KW/997 GENERAC 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0073290",
    "digits": "7329",
    "desc": "28KW/997 GENERAC 240V 200A SE T/SW TSTAT"
   },
   {
    "g": "G0073291",
    "digits": "7329",
    "desc": "28KW/997 GENERAC 240V 200A SE T/SW TSTAT"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives. After the 25 hour break-in period and at every interval thereafter Generac recommends its proprietary 5W-20 Gaseous Engine Oil (GEO), formulated for gaseous-fuel Generac generators (A0004332577 p.28). This is NOT the Synthetic 5W-30 used on the Evolution units.",
   "oilCapacity": "10kW approx. 1.4 qt (1.3 L); 14/18kW approx. 2.5 qt (2.4 L); 22-28kW approx. 2.2 qt (2.1 L) - confirmed unchanged for the 28kW row in A0004332577",
   "sparkPlug": "P/N A0003637864; gap 0.020 in (0.508 mm)",
   "plugGap": "0.020 in (0.508 mm), single value for all kW 10-28 (A0004332577 engine spec table)",
   "valveClearance": "Hydraulic lifters on every kW in this family (10 kW 459 cc, 14/18 kW 817 cc, 22-28 kW 997 cc) - no valve-lash adjustment (Spec Sheets A0005151077 and A0005151081 'Lifter type: Hydraulic'; Owner's Manual A0004332577 'Hydraulic lifters: Yes')",
   "battery": "12V AGM Powersport battery, field supplied. CONFLICTING DOCS - verify on the unit before ordering: Owner's Manual A0004332577 prints Group BTX30L 400 CCA minimum (P/N A0010137451 / A0010137452) for all 10-28 kW; Spec Sheet A0005151081 (10/14/18 kW) prints Group BTX20L 310 CCA minimum, while Spec Sheet A0005151077 (22-28 kW) agrees with BTX30L 400 CCA. Not the Group 26R / Group 35 AGM used on Evolution-era units.",
   "airFilter": "0E9371AS (10kW) or 0J8478S (14-28kW); recommended oil filter 070185ES",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Configured through the Generac Field Pro app, not from the unit - there is no menu on the panel. Frequency Weekly / Biweekly / Monthly (day 1-28 if monthly); duration adjustable 5-20 minutes, default 5; Transfer on Scheduled Exercise default Disabled; Quiet-Test low-speed profile drops to reduced speed about 40 seconds in. Exercise only runs in AUTO. If the unit is not internet-connected, date/time must be reset over Field Pro every time the 12V battery, the 120VAC T1 feed or the fuse is disconnected (A0004332577 p.22)."
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously / before each use",
    "task": "Inspect louvers, fuel/oil lines, engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Inspect for water intrusion; perform fuel system leak test"
   },
   {
    "interval": "Schedule A - 2 yrs/200 hrs (app calls this oil, oil filter, battery check)",
    "task": "Check battery condition"
   },
   {
    "interval": "Schedule B - 4 yrs/400 hrs (adds air cleaner and spark plugs)",
    "task": "Replace engine oil/oil filter, air filter, spark plug(s); inspect/adjust valve clearance where applicable"
   },
   {
    "interval": "Schedule C - first 25-hour break-in",
    "task": "Oil and oil-filter change after first 25 hours of engine run-time"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller (Evolution) or Field Pro app (Power Zone 200)",
     "Air filter issue",
     "Improper installation",
     "Low battery",
     "(not exhaustive per Generac)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30% (some text says 35%); for NG, check with the gas utility for supply issues.",
     "Check the air filter for blockage/ice (cold weather).",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection (Evolution controller menu / Field Pro app) and, for Evolution units, correct fuel-jet orientation.",
     "The generator has experienced an overcrank alarm. Please contact a dealer. (per dealer-call table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, flashing RED external LED",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor/signal loss",
     "Governor failure",
     "Sticking throttle/mechanical binding",
     "Incorrect frequency/voltage feedback",
     "Faulty control board/logic",
     "Improper wiring",
     "Backfeeding from another power source",
     "Wrong fuel pressure/type",
     "Firmware/config bug"
    ],
    "steps": [
     "Verify fuel shutoff valve is ON.",
     "Verify correct fuel selection (controller menu for Evolution; Field Pro for Power Zone 200) and, for Evolution, jet orientation.",
     "If on LP, verify level is above 30%.",
     "Check for sudden large load changes (AC units etc.) and any Load Manager/SACM function.",
     "Check air filter for blockage/ice.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an overspeed alarm. Please contact a dealer. Guardian table: E-code 1200-1207 ALARM; Next Gen dealer table: 1200-1208 ALARM."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, flashing RED external LED",
    "meaning": "Engine oil pressure alarm.",
    "causes": [
     "Low oil level",
     "Oil pressure sensor/system issue"
    ],
    "steps": [
     "Check oil level.",
     "Do not overfill oil - can cause engine damage.",
     "If oil level is correct, contact a Generac Service Dealer.",
     "Listed as ALARM code 1300 in the Guardian-series table; referenced as a possible-low-oil-level scenario in the outage troubleshooting guide."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1400-1401",
    "name": "High Temp",
    "display": "HIGH TEMPERATURE, flashing RED external LED; unit shuts down during operation",
    "meaning": "The generator has overheated.",
    "causes": [
     "Obstructed intake/exhaust ventilation",
     "Inadequate fuel pressure",
     "Extended continuous operation without required 24-hr shutdown/cooldown",
     "Ambient temperature outside UL2200 rated range (-20F/-29C to 122F/50C)",
     "Snow/debris/vegetation blocking clearance (min. 3 ft clearance required)",
     "Frozen/blocked air filter in cold weather"
    ],
    "steps": [
     "Allow minimum 30-minute cooling period before restart.",
     "Inspect and clear 3 ft of clearance around the unit; remove debris/snow/vegetation from louvers, intake, exhaust.",
     "Check air filter for ice buildup in cold weather.",
     "Verify maintenance items are current per the maintenance schedule.",
     "Clear the alarm and restart (never under load).",
     "The generator has experienced a [operational] alarm - dealer contact recommended if issue persists after cooling/clearance checks. (dealer-call table lists High Temperature/1400 as ALARM)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sensor Loss / RPM Sensor",
    "display": "RPM SENSE LOSS, flashing RED external LED",
    "meaning": "Controller does not detect a valid RPM signal at startup, or loses a valid RPM signal while running. Includes sub-codes 1501, 1505, 1511, 1515 among others.",
    "causes": [
     "Weak/bad battery",
     "Fuel system issues (valve, selection, jet orientation, LP <30%, low pressure)",
     "Overload condition or sudden load change",
     "Lack of routine maintenance (air filter)"
    ],
    "steps": [
     "Check battery voltage/health (>12.6V full charge) and cable/terminal condition.",
     "Verify fuel shutoff valve ON and correct fuel selection/jet orientation.",
     "If LP, verify level above 30%.",
     "Check air filter.",
     "If it shuts down mid-run rather than failing to start, suspect overload/sudden load change rather than battery.",
     "Clear the alarm and attempt a MANUAL restart with no load.",
     "The generator has experienced a no crank RPM Sensor alarm. Please contact a dealer. (dealer-call table: E-code 1522 in Next Gen table, 1500-1521 in Guardian table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, flashing RED external LED",
    "meaning": "Engine speed (RPM) is too slow.",
    "causes": [
     "Overload condition",
     "Fuel supply issues"
    ],
    "steps": [
     "Check for overload / sudden load change; identify and remove non-essential loads.",
     "Verify fuel supply (shutoff valve ON, correct fuel selection, LP level >30%).",
     "Check airflow (intake/exhaust) and scheduled maintenance items.",
     "Clear the alarm and restart in MANUAL with no load.",
     "The generator has experienced an underspeed alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, flashing RED external LED",
    "meaning": "Generator output voltage detected above normal range.",
    "causes": [
     "Not detailed beyond dealer-call table entry."
    ],
    "steps": [
     "No dedicated homeowner troubleshooting article among the harvested pages; per dealer-call table this requires a dealer.",
     "The generator has experienced an overvoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, flashing RED external LED",
    "meaning": "Generator is not producing proper voltage; can result from prolonged undervoltage or sudden voltage loss.",
    "causes": [
     "Fuel supply/selection issues",
     "Circuitry, firmware, or voltage-production faults (often needs IASD)"
    ],
    "steps": [
     "Verify correct fuel source selected in controller (NG/LP) - Guardian only; Power Zone 200 sets fuel in Field Pro at install.",
     "Verify fuel jet position correct (Guardian units, mainly a new-install concern).",
     "If LP, verify fuel level above 30%.",
     "During widespread NG outages, check with the gas utility for grid issues.",
     "Cold weather: check air filter for ice, clear snow around unit.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an undervoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2070",
    "name": "Keypad Missing",
    "display": "Keypad Missing",
    "meaning": "The controller board does not recognize the keypad.",
    "causes": [],
    "steps": [
     "The controller board is not recognizing the keypad. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warn(ing)",
    "display": "WIRING ERROR, flashing RED external LED; check the app for more information",
    "meaning": "Sensing-wire miswiring: wires crossed, e.g. N1 to 194, or 23 to T1, or an AC wire (N1/N2/T1) crossed with a DC wire (194/23/0). May show as AC voltage detected on a DC input; does not identify exactly which wires are crossed.",
    "causes": [
     "Miswired remote emergency-shutdown sensing wires",
     "Miswired transfer-switch sensing wires"
    ],
    "steps": [
     "This is an internal-wiring fault; Generac support does NOT recommend end users open or modify generator/transfer-switch wiring.",
     "A certified installer/IASD should inspect the customer connections panel for crossed wires.",
     "The generator sensing-wire connections to a remote emergency shutdown switch / to the transfer switch have been miswired. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "LOW VOLTS REMOVE LOAD / OVERLOAD REMOVE LOAD, flashing RED external LED",
    "meaning": "Generator is overloaded - electrical demand exceeds its rated capacity.",
    "causes": [
     "Large new loads added since installation",
     "Load-management device malfunction/misconfiguration",
     "Multiple large loads starting simultaneously (startup/surge wattage 3-4x running wattage)",
     "Unit undersized for current demand"
    ],
    "steps": [
     "Identify and remove/disconnect non-essential loads (whole-home or priority panel as applicable).",
     "Verify Generac Load Manager / SACM function and lockout configuration if installed.",
     "Turn generator MLCB OFF, turn utility MLCB OFF, clear the alarm, restart, then restore loads one at a time.",
     "Never start the generator under load.",
     "The generator has experienced an overload alarm. Please contact a dealer."
    ],
    "clear": "Guardian series: press OFF then ENTER. Next Generation series: hold OFF at least 3 seconds. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2115",
    "name": "AVR PWM Overload",
    "display": "AVR PWM Overload",
    "meaning": "AVR (automatic voltage regulator) PWM alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an AVR PWM alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, flashing RED external LED",
    "meaning": "The 7.5-amp controller fuse is missing or blown.",
    "causes": [
     "Improperly seated or blown 7.5A fuse",
     "Generator battery or battery-cable problem"
    ],
    "steps": [
     "Turn generator OFF, set main utility disconnect OFF, turn off the generator's main line circuit breaker, wait several minutes.",
     "Locate the fuse on the control panel under the rubber flap; inspect for blown/loose fuse; replace with a standard 7.5A automotive fuse if blown.",
     "If fuse is good and seated, inspect the battery and battery cables.",
     "If the error persists after replacing the fuse and checking the battery, a dealer visit is needed so a technician can test the starter circuit for continuity (why the fuse keeps blowing)."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2670",
    "name": "CANBus Error",
    "display": "CANBus Error",
    "meaning": "CANBus communication alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced a CANBus alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2751",
    "name": "Very Low Battery (a.k.a. Battery voltage is very low)",
    "display": "Battery voltage very low, flashing YELLOW / RED external LED",
    "meaning": "Battery voltage is below 9 VDC for 60 seconds or more.",
    "causes": [
     "Partially discharged ('stale') battery installed before the onboard charger completes its initial cycle (common on new installs)",
     "Control/battery connections not fully landed"
    ],
    "steps": [
     "Have the installer verify control wires and battery cables are correctly landed, tight, and free of corrosion.",
     "On new installs, allow the onboard charger at least 18 hours to complete its initial charge cycle - alarm may clear automatically once charging completes.",
     "Clear the alarm: hold OFF >=3 seconds, then press AUTO.",
     "If the alarm persists, replace the battery per the model's spec.",
     "If the battery fails a load test or the fault returns after the above steps, contact an IASD."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary Shutdown",
    "display": "SHUTDOWN SWITCH (2800) = on-unit E-stop, SHUTDOWN SWITCH (2801) = remote E-stop; flashing RED external LED",
    "meaning": "One or more Auxiliary/Emergency-Stop shutdown switches are in the OFF ('O'/open) position. Required by NFPA fire code since 2017 on air-cooled units for quick emergency shutdown.",
    "causes": [
     "Switch bumped/brushed against accidentally",
     "Not reset after maintenance",
     "Animal (e.g. squirrel) contact",
     "Sometimes intentionally tripped by a service provider awaiting service on the unit"
    ],
    "steps": [
     "Locate the switch(es): single-cylinder Guardian units have one on the back of the unit; two-cylinder units add a second inside on the firewall panel near the control panel. A secondary switch (G0073620) may be installed near the transfer switch on Next Gen units if local code requires it, giving code 2801.",
     "Set switch(es) to the I/Closed (up) position - both must be Closed to clear.",
     "50 Hz models: pull out the e-stop, then clear at the panel.",
     "Clear the alarm at the control panel, then return to AUTO.",
     "If the 2800 code fails to clear after resetting the switch, or returns repeatedly without anyone touching it, there may be a wiring issue - contact a Generac IASD."
    ],
    "clear": "Guardian: press OFF then ENTER, then AUTO. Next Gen (Power Zone 200): hold OFF 3 seconds, then AUTO."
   },
   {
    "code": "3000",
    "name": "ECU Faulted",
    "display": "ECU Faulted",
    "meaning": "Engine ECU alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3100-3117",
    "name": "Engine Throttle Valve 1 Position",
    "display": "Engine Throttle Valve 1 Position",
    "meaning": "Engine throttle-valve-position alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm/warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3200-3217",
    "name": "Engine Fuel Delivery Pressure",
    "display": "Engine Fuel Delivery Pressure",
    "meaning": "Engine high or low fuel-delivery-pressure alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine high/low fuel pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3301-3304",
    "name": "Engine Oil Pressure",
    "display": "Engine Oil Pressure",
    "meaning": "Engine low oil pressure / oil pressure alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine low oil pressure/oil pressure alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3400-3417",
    "name": "Engine Intake Manifold #1 Pressure",
    "display": "Engine Intake Manifold #1 Pressure",
    "meaning": "High/low intake-manifold-pressure alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a high/low intake manifold pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3500-3517",
    "name": "Engine Intake Manifold 1 Temperature",
    "display": "Engine Intake Manifold 1 Temperature",
    "meaning": "Low intake-manifold-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a low intake manifold temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3803-3817",
    "name": "Battery Potential / Power Input 1",
    "display": "Battery Potential / Power Input 1",
    "meaning": "Battery-voltage alarm or warning (engine-ECU side). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a battery voltage alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4101",
    "name": "Engine Position Sensor",
    "display": "Engine Position Sensor",
    "meaning": "Engine primary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine primary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4201",
    "name": "Engine Timing Sensor",
    "display": "Engine Timing Sensor",
    "meaning": "Engine secondary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine secondary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4300-4317",
    "name": "O2 Sensor",
    "display": "O2 Sensor",
    "meaning": "Oxygen-sensor alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an O2 sensor alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4503-4507",
    "name": "Engine Ignition Coil #1",
    "display": "Engine Ignition Coil #1",
    "meaning": "Ignition-coil #1 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4603-4607",
    "name": "Engine Ignition Coil #2",
    "display": "Engine Ignition Coil #2",
    "meaning": "Ignition-coil #2 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4900-4917",
    "name": "Engine Fuel Valve 1 Position",
    "display": "Engine Fuel Valve 1 Position",
    "meaning": "Fuel-valve-position alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel valve alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5100-5117",
    "name": "Engine Speed",
    "display": "Engine Speed",
    "meaning": "Engine-speed alarm or warning (ECU side, distinct from 1200/1600 controller-level speed alarms). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine speed alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5200-5217",
    "name": "Cylinder Head Temperature 1",
    "display": "Cylinder Head Temperature 1",
    "meaning": "Cylinder-head-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a cylinder head temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5303-5304",
    "name": "Engine Fuel Shutoff 2 Control",
    "display": "Engine Fuel Shutoff 2 Control",
    "meaning": "Fuel-shutoff-control alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel shutoff control alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "502",
    "name": "Missing Config - Parameter Group",
    "display": "Missing Config - Parameter Group",
    "meaning": "A critical configuration parameter has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "504",
    "name": "Missing Config - Fuel Type",
    "display": "Missing Config - Fuel Type",
    "meaning": "A critical configuration parameter (fuel type) has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "505",
    "name": "Invalid Serial Number",
    "display": "Invalid Serial Number",
    "meaning": "A critical configuration parameter (serial number) has not been set/is invalid.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "1000-1006",
    "name": "Controller Fault",
    "display": "Controller Fault - no LCD; read the code in Mobile Link or Field Pro",
    "meaning": "Internal alarm on the controller.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "Stepper Overcurrent",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current. Listed as a RED-LED alarm in the Power Zone 200 Quick Reference Guide LED table (A0004332577, A0010224539, A0005171487). On Evolution 1.0/2.0 the same alarm carries E-code 2399.",
    "causes": [],
    "steps": [
     "Check the external LEDs and the Mobile Link / Field Pro app for alarms.",
     "Contact an IASD - the manual gives no field procedure for this alarm."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; the red LED goes solid when the alarm clears, then press AUTO."
   }
  ],
  "warnings": [
   {
    "code": "2075",
    "name": "Quadclops Missing",
    "display": "Quadclops Missing",
    "meaning": "The generator does not recognize the external LED lights connection.",
    "causes": [],
    "steps": [
     "The generator does not recognize the external LED lights connection. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2090",
    "name": "Model ID Sync Failed",
    "display": "Model ID Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2095",
    "name": "Fuel Type Sync Failed",
    "display": "Fuel Type Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2120",
    "name": "Serial Num Sync Failed",
    "display": "Serial Num Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2125",
    "name": "Run Hours Sync Failed",
    "display": "Run Hours Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, flashing YELLOW external LED",
    "meaning": "Battery charge level has fallen below the acceptable level. Per the battery-alarms article, triggered when battery voltage falls below 12.1 VDC.",
    "causes": [
     "Aging/defective battery",
     "Charging-system issue",
     "Missing neutral wire on battery-charger circuit (new installs)"
    ],
    "steps": [
     "Compare DC voltage on the battery vs. controller reading; if under 12.5 VDC, give the battery a 24-hour charge cycle.",
     "If still low after 24 hours, battery likely needs replacement.",
     "If over 12.5 VDC, check the battery charger for proper operation.",
     "A hard reset may also clear this error.",
     "The battery charge level has fallen below the acceptable level. Please inspect or replace the battery. If necessary, please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice. Also see hard reset procedure."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, flashing YELLOW external LED",
    "meaning": "At the end of a charge cycle the battery is above 16 volts, or is providing more than the recommended charge current. Per the battery-alarms article: battery voltage exceeds 16V OR charger current exceeds 600 mA at the end of an 18-hour charge cycle.",
    "causes": [
     "Battery-charging-circuit issue"
    ],
    "steps": [
     "Options are limited for a homeowner beyond basic checks; can attempt to clear the alarm and manually restart.",
     "Generac does NOT recommend end users service internal generator wiring.",
     "The battery is not charging properly. Please replace the battery or contact a dealer. (New installs: also check for a missing Neutral/00 customer-connection wire and loose/mixed-up N1/N2 wiring at generator and transfer switch - a dealer task.)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, flashing YELLOW external LED",
    "meaning": "Battery voltage is below 12.5 volts at the end of an 18-hour charge cycle, indicating the battery is not charging properly.",
    "causes": [
     "Battery-charging-circuit issue",
     "Missing neutral wire for the battery-charger circuit on new installs"
    ],
    "steps": [
     "No numbered stand-alone troubleshooting article was captured for 2770 specifically; per the battery-alarms and PowerPact-LED articles this is generally a dealer diagnostic item (check charger connections/circuit voltage, assess battery health).",
     "The battery is not charging properly. Please replace the battery or contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, flashing YELLOW external LED",
    "meaning": "The unit is not charging the battery properly - the charger's AC power source (T1 circuit, 120VAC) is interrupted.",
    "causes": [
     "Common/expected during a utility outage (charging is powered from utility during an outage; not a fault in that scenario)",
     "New-install wiring issue (missing/incorrect Neutral customer connection)",
     "Blown T1 fuse"
    ],
    "steps": [
     "If seen during a utility outage, this is expected and not necessarily a fault.",
     "If seen with utility power present, or persisting after an outage, the T1 fuse in the transfer switch may be blown.",
     "T1 circuit is live at 120V even with the generator off - Generac does not recommend end users inspect/replace the T1 fuse; this is a dealer task.",
     "The unit is not charging the battery properly. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2790",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM Abuse",
    "meaning": "Internal controller warning (SEEPROM abuse).",
    "causes": [],
    "steps": [
     "The generator has experienced an internal warning on the controller. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5415-5417",
    "name": "Engine Oil Level",
    "display": "Engine Oil Level",
    "meaning": "High or low engine-oil-level warning.",
    "causes": [
     "Overfilled oil (high) or low oil (low)"
    ],
    "steps": [
     "High: remove loads, let the generator cool, check oil level, drain oil if necessary before restarting.",
     "Low: remove loads, let the generator cool, check oil level, add oil if necessary before restarting.",
     "If the alarm reappears after correcting oil level, please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "7000",
    "name": "Overload Cooldown",
    "display": "Overload Cooldown",
    "meaning": "The generator has experienced an overload and is in cool-down mode.",
    "causes": [],
    "steps": [
     "Allow the cool-down mode to complete.",
     "If the condition persists, contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE A maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE A maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE B maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE B maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE C",
    "name": "Service C Due",
    "display": "SERVICE C, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE C maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE C maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Inspect the battery.",
     "Check the app for additional information."
    ],
    "clear": "Inspect the battery. Select 'Clear Maintenance' in the app to clear."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   },
   {
    "symptom": "App shows 'battery condition' check prompt",
    "causes": [
     "Weak/failing battery flagged during automatic self-test"
    ],
    "fixes": [
     "Check battery condition in Mobile Link or Field Pro app; contact an IASD if it shows good but the unit still won't crank"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator.",
   "Uses AGM Powersport batteries (BTX20L / BTX30L), not the Group 26R or Group 35 AGM used on Evolution-era units - do not cross-install without checking fit and CCA."
  ],
  "tips": [
   "No LCD on this generation - alarm and warning codes are read in the Mobile Link app (homeowner) or Generac Field Pro (dealer, over Bluetooth). The external LED only tells you red/yellow/green.",
   "Clear an alarm by holding OFF for at least 3 seconds; the red LED goes solid when it clears, then press AUTO.",
   "Battery is an AGM Powersport type. The owner's manual says Group BTX30L 400 CCA for all kW, but the 10/14/18 kW spec sheet says Group BTX20L 310 CCA - read the unit's own data label / spec sheet before ordering.",
   "Every engine in this family has hydraulic lifters - there is no valve-lash adjustment on any kW.",
   "28 kW shares the 26 kW chassis and spec row (524 lb) but has its own uprated alternator; the exploded views are titled 'ALT COMN PRTS 26-28KW' and 'ALTERNATOR 28KW'.",
   "G0073290 and G0073291 bundle a 200A service-entrance ATS with SPD plus a Generac-branded ecobee Smart Thermostat Enhanced (manual A0008510183) for HVAC load management via Mobile Link. The thermostat is an accessory - it has no part in the generator's alarm system.",
   "Blue LED on the controller = Service Mode is ON (SERVICE button toggles it). Notifications are silenced and firmware updates pause while it is on."
  ],
  "manuals": [
   {
    "title": "60 Hz Air-Cooled Generators Owner's Manual, 10-28 kW (item A0004332577)",
    "docType": "owner",
    "seedFile": "generac-next-gen-10-28kw-owners.pdf"
   },
   {
    "title": "60 Hz Air-Cooled Generators Installation Manual, 10-28 kW (item A0004332575)",
    "docType": "install",
    "seedFile": "generac-next-gen-10-28kw-install.pdf"
   },
   {
    "title": "Install Generator HSB - siting and set drawing (item A0005736586)",
    "docType": "install",
    "seedFile": "generac-next-gen-install-generator-hsb.pdf"
   },
   {
    "title": "Specification Sheet, 22-28 kW Y20 HSB (item A0005151077)",
    "docType": "spec",
    "seedFile": "generac-next-gen-22-28kw-spec.pdf"
   },
   {
    "title": "Specification Sheet, 10-18 kW Y20 HSB (item A0005151081)",
    "docType": "spec",
    "seedFile": "generac-next-gen-10-18kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, HSB PZ200 SSI 60 Hz 817/997 cc (item A0005639538)",
    "docType": "wiring",
    "seedFile": "generac-next-gen-pz200-817-997-wiring.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, HSB PZ200 SSI 60 Hz 459 cc (item A0005639540)",
    "docType": "wiring",
    "seedFile": "generac-next-gen-pz200-459-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual A0004332577 and Install Manual A0004332575 (Generac, Rev C 04/24/2026), Spec Sheets A0005151077 / A0005151081, wiring diagrams A0005639538 / A0005639540 ('PZ200' in Generac's own doc titles), plus Generac Help Center code articles. Lifter type confirmed hydraulic in Spec Sheets A0005151077 (22-28 kW) and A0005151081 (10/14/18 kW). Stepper Overcurrent alarm per A0004332577 Quick Reference Guide LED table. Owner's Manual A0004332577 / Install Manual A0004332575 (doc revision Y20); the Power Zone 200 controller was introduced in April 2025 per Generac's own article, and the badge dropped 'Guardian' for plain GENERAC. The 22/24/26/28 kW ratings share the same 997 cc block and spec row; the 28 kW uses an uprated alternator (exploded views 'ALT COMN PRTS 26-28KW' and 'ALTERNATOR 28KW')."
 },
 {
  "id": "gen-guardian-next-gen-22-25-y32",
  "series": "Guardian by Generac",
  "family": "Guardian by Generac 22-25 kW, Y32 revision (Power Zone 200)",
  "controller": "Power Zone 200 (Next Generation Series air-cooled, 10-28 kW)",
  "kw": [
   "22",
   "25"
  ],
  "engine": "G-Force 1000 Series 2-cyl 997cc, hydraulic lifters",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2025-present",
  "sort": 10,
  "models": [
   {
    "g": "G0072680",
    "digits": "7268",
    "desc": "22KW/997 GUARDBG 240V 1PH 200A SE T/SW"
   },
   {
    "g": "G0072690",
    "digits": "7269",
    "desc": "25KW/997 GUARDBG 240V 1PH 200A CUL T/SW"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives. After the 25 hour break-in period and at every interval thereafter Generac recommends its proprietary 5W-20 Gaseous Engine Oil (GEO), formulated for gaseous-fuel Generac generators (A0004332577 p.28). This is NOT the Synthetic 5W-30 used on the Evolution units.",
   "oilCapacity": "Approx. 2.2 qt (2.1 L) including filter",
   "sparkPlug": "P/N A0003637864; gap 0.020 in (0.508 mm)",
   "plugGap": "0.020 in (0.508 mm) (A0010224539 engine spec table)",
   "valveClearance": "Hydraulic lifters - no adjustment",
   "battery": "12V AGM Powersport battery, field supplied. CONFLICTING DOCS - verify on the unit before ordering: Owner's Manual A0010224539 prints Group BTX30L 400 CCA minimum (P/N A0010137451 / A0010137452); the family's own Y32 Spec Sheet A0010224535 prints Group BTX20L 310 CCA minimum. Not the Group 26R / Group 35 AGM used on Evolution-era units.",
   "airFilter": "0J8478S (A0010224539 Replacement Parts); oil filter 070185ES",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Configured through the Generac Field Pro app, not from the unit - there is no menu on the panel. Frequency Weekly / Biweekly / Monthly (day 1-28 if monthly); duration adjustable 5-20 minutes, default 5; Transfer on Scheduled Exercise default Disabled; Quiet-Test low-speed profile drops to reduced speed about 40 seconds in. Exercise only runs in AUTO. If the unit is not internet-connected, date/time must be reset over Field Pro every time the 12V battery, the 120VAC T1 feed or the fuse is disconnected (A0004332577 p.22)."
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously / before each use",
    "task": "Inspect louvers, fuel/oil lines, engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Inspect for water intrusion; perform fuel system leak test"
   },
   {
    "interval": "Schedule A - 2 yrs/200 hrs (app calls this oil, oil filter, battery check)",
    "task": "Check battery condition"
   },
   {
    "interval": "Schedule B - 4 yrs/400 hrs (adds air cleaner and spark plugs)",
    "task": "Replace engine oil/oil filter, air filter, spark plug(s); inspect/adjust valve clearance where applicable"
   },
   {
    "interval": "Schedule C - first 25-hour break-in",
    "task": "Oil and oil-filter change after first 25 hours of engine run-time"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller (Evolution) or Field Pro app (Power Zone 200)",
     "Air filter issue",
     "Improper installation",
     "Low battery",
     "(not exhaustive per Generac)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30% (some text says 35%); for NG, check with the gas utility for supply issues.",
     "Check the air filter for blockage/ice (cold weather).",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection (Evolution controller menu / Field Pro app) and, for Evolution units, correct fuel-jet orientation.",
     "The generator has experienced an overcrank alarm. Please contact a dealer. (per dealer-call table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, flashing RED external LED",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor/signal loss",
     "Governor failure",
     "Sticking throttle/mechanical binding",
     "Incorrect frequency/voltage feedback",
     "Faulty control board/logic",
     "Improper wiring",
     "Backfeeding from another power source",
     "Wrong fuel pressure/type",
     "Firmware/config bug"
    ],
    "steps": [
     "Verify fuel shutoff valve is ON.",
     "Verify correct fuel selection (controller menu for Evolution; Field Pro for Power Zone 200) and, for Evolution, jet orientation.",
     "If on LP, verify level is above 30%.",
     "Check for sudden large load changes (AC units etc.) and any Load Manager/SACM function.",
     "Check air filter for blockage/ice.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an overspeed alarm. Please contact a dealer. Guardian table: E-code 1200-1207 ALARM; Next Gen dealer table: 1200-1208 ALARM."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, flashing RED external LED",
    "meaning": "Engine oil pressure alarm.",
    "causes": [
     "Low oil level",
     "Oil pressure sensor/system issue"
    ],
    "steps": [
     "Check oil level.",
     "Do not overfill oil - can cause engine damage.",
     "If oil level is correct, contact a Generac Service Dealer.",
     "Listed as ALARM code 1300 in the Guardian-series table; referenced as a possible-low-oil-level scenario in the outage troubleshooting guide."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1400-1401",
    "name": "High Temp",
    "display": "HIGH TEMPERATURE, flashing RED external LED; unit shuts down during operation",
    "meaning": "The generator has overheated.",
    "causes": [
     "Obstructed intake/exhaust ventilation",
     "Inadequate fuel pressure",
     "Extended continuous operation without required 24-hr shutdown/cooldown",
     "Ambient temperature outside UL2200 rated range (-20F/-29C to 122F/50C)",
     "Snow/debris/vegetation blocking clearance (min. 3 ft clearance required)",
     "Frozen/blocked air filter in cold weather"
    ],
    "steps": [
     "Allow minimum 30-minute cooling period before restart.",
     "Inspect and clear 3 ft of clearance around the unit; remove debris/snow/vegetation from louvers, intake, exhaust.",
     "Check air filter for ice buildup in cold weather.",
     "Verify maintenance items are current per the maintenance schedule.",
     "Clear the alarm and restart (never under load).",
     "The generator has experienced a [operational] alarm - dealer contact recommended if issue persists after cooling/clearance checks. (dealer-call table lists High Temperature/1400 as ALARM)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sensor Loss / RPM Sensor",
    "display": "RPM SENSE LOSS, flashing RED external LED",
    "meaning": "Controller does not detect a valid RPM signal at startup, or loses a valid RPM signal while running. Includes sub-codes 1501, 1505, 1511, 1515 among others.",
    "causes": [
     "Weak/bad battery",
     "Fuel system issues (valve, selection, jet orientation, LP <30%, low pressure)",
     "Overload condition or sudden load change",
     "Lack of routine maintenance (air filter)"
    ],
    "steps": [
     "Check battery voltage/health (>12.6V full charge) and cable/terminal condition.",
     "Verify fuel shutoff valve ON and correct fuel selection/jet orientation.",
     "If LP, verify level above 30%.",
     "Check air filter.",
     "If it shuts down mid-run rather than failing to start, suspect overload/sudden load change rather than battery.",
     "Clear the alarm and attempt a MANUAL restart with no load.",
     "The generator has experienced a no crank RPM Sensor alarm. Please contact a dealer. (dealer-call table: E-code 1522 in Next Gen table, 1500-1521 in Guardian table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, flashing RED external LED",
    "meaning": "Engine speed (RPM) is too slow.",
    "causes": [
     "Overload condition",
     "Fuel supply issues"
    ],
    "steps": [
     "Check for overload / sudden load change; identify and remove non-essential loads.",
     "Verify fuel supply (shutoff valve ON, correct fuel selection, LP level >30%).",
     "Check airflow (intake/exhaust) and scheduled maintenance items.",
     "Clear the alarm and restart in MANUAL with no load.",
     "The generator has experienced an underspeed alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, flashing RED external LED",
    "meaning": "Generator output voltage detected above normal range.",
    "causes": [
     "Not detailed beyond dealer-call table entry."
    ],
    "steps": [
     "No dedicated homeowner troubleshooting article among the harvested pages; per dealer-call table this requires a dealer.",
     "The generator has experienced an overvoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, flashing RED external LED",
    "meaning": "Generator is not producing proper voltage; can result from prolonged undervoltage or sudden voltage loss.",
    "causes": [
     "Fuel supply/selection issues",
     "Circuitry, firmware, or voltage-production faults (often needs IASD)"
    ],
    "steps": [
     "Verify correct fuel source selected in controller (NG/LP) - Guardian only; Power Zone 200 sets fuel in Field Pro at install.",
     "Verify fuel jet position correct (Guardian units, mainly a new-install concern).",
     "If LP, verify fuel level above 30%.",
     "During widespread NG outages, check with the gas utility for grid issues.",
     "Cold weather: check air filter for ice, clear snow around unit.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an undervoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2070",
    "name": "Keypad Missing",
    "display": "Keypad Missing",
    "meaning": "The controller board does not recognize the keypad.",
    "causes": [],
    "steps": [
     "The controller board is not recognizing the keypad. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warn(ing)",
    "display": "WIRING ERROR, flashing RED external LED; check the app for more information",
    "meaning": "Sensing-wire miswiring: wires crossed, e.g. N1 to 194, or 23 to T1, or an AC wire (N1/N2/T1) crossed with a DC wire (194/23/0). May show as AC voltage detected on a DC input; does not identify exactly which wires are crossed.",
    "causes": [
     "Miswired remote emergency-shutdown sensing wires",
     "Miswired transfer-switch sensing wires"
    ],
    "steps": [
     "This is an internal-wiring fault; Generac support does NOT recommend end users open or modify generator/transfer-switch wiring.",
     "A certified installer/IASD should inspect the customer connections panel for crossed wires.",
     "The generator sensing-wire connections to a remote emergency shutdown switch / to the transfer switch have been miswired. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "LOW VOLTS REMOVE LOAD / OVERLOAD REMOVE LOAD, flashing RED external LED",
    "meaning": "Generator is overloaded - electrical demand exceeds its rated capacity.",
    "causes": [
     "Large new loads added since installation",
     "Load-management device malfunction/misconfiguration",
     "Multiple large loads starting simultaneously (startup/surge wattage 3-4x running wattage)",
     "Unit undersized for current demand"
    ],
    "steps": [
     "Identify and remove/disconnect non-essential loads (whole-home or priority panel as applicable).",
     "Verify Generac Load Manager / SACM function and lockout configuration if installed.",
     "Turn generator MLCB OFF, turn utility MLCB OFF, clear the alarm, restart, then restore loads one at a time.",
     "Never start the generator under load.",
     "The generator has experienced an overload alarm. Please contact a dealer."
    ],
    "clear": "Guardian series: press OFF then ENTER. Next Generation series: hold OFF at least 3 seconds. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2115",
    "name": "AVR PWM Overload",
    "display": "AVR PWM Overload",
    "meaning": "AVR (automatic voltage regulator) PWM alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an AVR PWM alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, flashing RED external LED",
    "meaning": "The 7.5-amp controller fuse is missing or blown.",
    "causes": [
     "Improperly seated or blown 7.5A fuse",
     "Generator battery or battery-cable problem"
    ],
    "steps": [
     "Turn generator OFF, set main utility disconnect OFF, turn off the generator's main line circuit breaker, wait several minutes.",
     "Locate the fuse on the control panel under the rubber flap; inspect for blown/loose fuse; replace with a standard 7.5A automotive fuse if blown.",
     "If fuse is good and seated, inspect the battery and battery cables.",
     "If the error persists after replacing the fuse and checking the battery, a dealer visit is needed so a technician can test the starter circuit for continuity (why the fuse keeps blowing)."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2670",
    "name": "CANBus Error",
    "display": "CANBus Error",
    "meaning": "CANBus communication alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced a CANBus alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2751",
    "name": "Very Low Battery (a.k.a. Battery voltage is very low)",
    "display": "Battery voltage very low, flashing YELLOW / RED external LED",
    "meaning": "Battery voltage is below 9 VDC for 60 seconds or more.",
    "causes": [
     "Partially discharged ('stale') battery installed before the onboard charger completes its initial cycle (common on new installs)",
     "Control/battery connections not fully landed"
    ],
    "steps": [
     "Have the installer verify control wires and battery cables are correctly landed, tight, and free of corrosion.",
     "On new installs, allow the onboard charger at least 18 hours to complete its initial charge cycle - alarm may clear automatically once charging completes.",
     "Clear the alarm: hold OFF >=3 seconds, then press AUTO.",
     "If the alarm persists, replace the battery per the model's spec.",
     "If the battery fails a load test or the fault returns after the above steps, contact an IASD."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary Shutdown",
    "display": "SHUTDOWN SWITCH (2800) = on-unit E-stop, SHUTDOWN SWITCH (2801) = remote E-stop; flashing RED external LED",
    "meaning": "One or more Auxiliary/Emergency-Stop shutdown switches are in the OFF ('O'/open) position. Required by NFPA fire code since 2017 on air-cooled units for quick emergency shutdown.",
    "causes": [
     "Switch bumped/brushed against accidentally",
     "Not reset after maintenance",
     "Animal (e.g. squirrel) contact",
     "Sometimes intentionally tripped by a service provider awaiting service on the unit"
    ],
    "steps": [
     "Locate the switch(es): single-cylinder Guardian units have one on the back of the unit; two-cylinder units add a second inside on the firewall panel near the control panel. A secondary switch (G0073620) may be installed near the transfer switch on Next Gen units if local code requires it, giving code 2801.",
     "Set switch(es) to the I/Closed (up) position - both must be Closed to clear.",
     "50 Hz models: pull out the e-stop, then clear at the panel.",
     "Clear the alarm at the control panel, then return to AUTO.",
     "If the 2800 code fails to clear after resetting the switch, or returns repeatedly without anyone touching it, there may be a wiring issue - contact a Generac IASD."
    ],
    "clear": "Guardian: press OFF then ENTER, then AUTO. Next Gen (Power Zone 200): hold OFF 3 seconds, then AUTO."
   },
   {
    "code": "3000",
    "name": "ECU Faulted",
    "display": "ECU Faulted",
    "meaning": "Engine ECU alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3100-3117",
    "name": "Engine Throttle Valve 1 Position",
    "display": "Engine Throttle Valve 1 Position",
    "meaning": "Engine throttle-valve-position alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm/warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3200-3217",
    "name": "Engine Fuel Delivery Pressure",
    "display": "Engine Fuel Delivery Pressure",
    "meaning": "Engine high or low fuel-delivery-pressure alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine high/low fuel pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3301-3304",
    "name": "Engine Oil Pressure",
    "display": "Engine Oil Pressure",
    "meaning": "Engine low oil pressure / oil pressure alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine low oil pressure/oil pressure alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3400-3417",
    "name": "Engine Intake Manifold #1 Pressure",
    "display": "Engine Intake Manifold #1 Pressure",
    "meaning": "High/low intake-manifold-pressure alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a high/low intake manifold pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3500-3517",
    "name": "Engine Intake Manifold 1 Temperature",
    "display": "Engine Intake Manifold 1 Temperature",
    "meaning": "Low intake-manifold-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a low intake manifold temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3803-3817",
    "name": "Battery Potential / Power Input 1",
    "display": "Battery Potential / Power Input 1",
    "meaning": "Battery-voltage alarm or warning (engine-ECU side). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a battery voltage alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4101",
    "name": "Engine Position Sensor",
    "display": "Engine Position Sensor",
    "meaning": "Engine primary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine primary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4201",
    "name": "Engine Timing Sensor",
    "display": "Engine Timing Sensor",
    "meaning": "Engine secondary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine secondary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4300-4317",
    "name": "O2 Sensor",
    "display": "O2 Sensor",
    "meaning": "Oxygen-sensor alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an O2 sensor alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4503-4507",
    "name": "Engine Ignition Coil #1",
    "display": "Engine Ignition Coil #1",
    "meaning": "Ignition-coil #1 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4603-4607",
    "name": "Engine Ignition Coil #2",
    "display": "Engine Ignition Coil #2",
    "meaning": "Ignition-coil #2 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4900-4917",
    "name": "Engine Fuel Valve 1 Position",
    "display": "Engine Fuel Valve 1 Position",
    "meaning": "Fuel-valve-position alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel valve alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5100-5117",
    "name": "Engine Speed",
    "display": "Engine Speed",
    "meaning": "Engine-speed alarm or warning (ECU side, distinct from 1200/1600 controller-level speed alarms). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine speed alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5200-5217",
    "name": "Cylinder Head Temperature 1",
    "display": "Cylinder Head Temperature 1",
    "meaning": "Cylinder-head-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a cylinder head temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5303-5304",
    "name": "Engine Fuel Shutoff 2 Control",
    "display": "Engine Fuel Shutoff 2 Control",
    "meaning": "Fuel-shutoff-control alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel shutoff control alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "502",
    "name": "Missing Config - Parameter Group",
    "display": "Missing Config - Parameter Group",
    "meaning": "A critical configuration parameter has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "504",
    "name": "Missing Config - Fuel Type",
    "display": "Missing Config - Fuel Type",
    "meaning": "A critical configuration parameter (fuel type) has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "505",
    "name": "Invalid Serial Number",
    "display": "Invalid Serial Number",
    "meaning": "A critical configuration parameter (serial number) has not been set/is invalid.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "1000-1006",
    "name": "Controller Fault",
    "display": "Controller Fault - no LCD; read the code in Mobile Link or Field Pro",
    "meaning": "Internal alarm on the controller.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "Stepper Overcurrent",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current. Listed as a RED-LED alarm in the Power Zone 200 Quick Reference Guide LED table (A0004332577, A0010224539, A0005171487). On Evolution 1.0/2.0 the same alarm carries E-code 2399.",
    "causes": [],
    "steps": [
     "Check the external LEDs and the Mobile Link / Field Pro app for alarms.",
     "Contact an IASD - the manual gives no field procedure for this alarm."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; the red LED goes solid when the alarm clears, then press AUTO."
   }
  ],
  "warnings": [
   {
    "code": "2075",
    "name": "Quadclops Missing",
    "display": "Quadclops Missing",
    "meaning": "The generator does not recognize the external LED lights connection.",
    "causes": [],
    "steps": [
     "The generator does not recognize the external LED lights connection. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2090",
    "name": "Model ID Sync Failed",
    "display": "Model ID Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2095",
    "name": "Fuel Type Sync Failed",
    "display": "Fuel Type Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2120",
    "name": "Serial Num Sync Failed",
    "display": "Serial Num Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2125",
    "name": "Run Hours Sync Failed",
    "display": "Run Hours Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, flashing YELLOW external LED",
    "meaning": "Battery charge level has fallen below the acceptable level. Per the battery-alarms article, triggered when battery voltage falls below 12.1 VDC.",
    "causes": [
     "Aging/defective battery",
     "Charging-system issue",
     "Missing neutral wire on battery-charger circuit (new installs)"
    ],
    "steps": [
     "Compare DC voltage on the battery vs. controller reading; if under 12.5 VDC, give the battery a 24-hour charge cycle.",
     "If still low after 24 hours, battery likely needs replacement.",
     "If over 12.5 VDC, check the battery charger for proper operation.",
     "A hard reset may also clear this error.",
     "The battery charge level has fallen below the acceptable level. Please inspect or replace the battery. If necessary, please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice. Also see hard reset procedure."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, flashing YELLOW external LED",
    "meaning": "At the end of a charge cycle the battery is above 16 volts, or is providing more than the recommended charge current. Per the battery-alarms article: battery voltage exceeds 16V OR charger current exceeds 600 mA at the end of an 18-hour charge cycle.",
    "causes": [
     "Battery-charging-circuit issue"
    ],
    "steps": [
     "Options are limited for a homeowner beyond basic checks; can attempt to clear the alarm and manually restart.",
     "Generac does NOT recommend end users service internal generator wiring.",
     "The battery is not charging properly. Please replace the battery or contact a dealer. (New installs: also check for a missing Neutral/00 customer-connection wire and loose/mixed-up N1/N2 wiring at generator and transfer switch - a dealer task.)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, flashing YELLOW external LED",
    "meaning": "Battery voltage is below 12.5 volts at the end of an 18-hour charge cycle, indicating the battery is not charging properly.",
    "causes": [
     "Battery-charging-circuit issue",
     "Missing neutral wire for the battery-charger circuit on new installs"
    ],
    "steps": [
     "No numbered stand-alone troubleshooting article was captured for 2770 specifically; per the battery-alarms and PowerPact-LED articles this is generally a dealer diagnostic item (check charger connections/circuit voltage, assess battery health).",
     "The battery is not charging properly. Please replace the battery or contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, flashing YELLOW external LED",
    "meaning": "The unit is not charging the battery properly - the charger's AC power source (T1 circuit, 120VAC) is interrupted.",
    "causes": [
     "Common/expected during a utility outage (charging is powered from utility during an outage; not a fault in that scenario)",
     "New-install wiring issue (missing/incorrect Neutral customer connection)",
     "Blown T1 fuse"
    ],
    "steps": [
     "If seen during a utility outage, this is expected and not necessarily a fault.",
     "If seen with utility power present, or persisting after an outage, the T1 fuse in the transfer switch may be blown.",
     "T1 circuit is live at 120V even with the generator off - Generac does not recommend end users inspect/replace the T1 fuse; this is a dealer task.",
     "The unit is not charging the battery properly. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2790",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM Abuse",
    "meaning": "Internal controller warning (SEEPROM abuse).",
    "causes": [],
    "steps": [
     "The generator has experienced an internal warning on the controller. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5415-5417",
    "name": "Engine Oil Level",
    "display": "Engine Oil Level",
    "meaning": "High or low engine-oil-level warning.",
    "causes": [
     "Overfilled oil (high) or low oil (low)"
    ],
    "steps": [
     "High: remove loads, let the generator cool, check oil level, drain oil if necessary before restarting.",
     "Low: remove loads, let the generator cool, check oil level, add oil if necessary before restarting.",
     "If the alarm reappears after correcting oil level, please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "7000",
    "name": "Overload Cooldown",
    "display": "Overload Cooldown",
    "meaning": "The generator has experienced an overload and is in cool-down mode.",
    "causes": [],
    "steps": [
     "Allow the cool-down mode to complete.",
     "If the condition persists, contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE A maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE A maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE B maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE B maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE C",
    "name": "Service C Due",
    "display": "SERVICE C, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE C maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE C maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Inspect the battery.",
     "Check the app for additional information."
    ],
    "clear": "Inspect the battery. Select 'Clear Maintenance' in the app to clear."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   },
   {
    "symptom": "App shows 'battery condition' check prompt",
    "causes": [
     "Weak/failing battery flagged during automatic self-test"
    ],
    "fixes": [
     "Check battery condition in Mobile Link or Field Pro app; contact an IASD if it shows good but the unit still won't crank"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator.",
   "Uses AGM Powersport batteries (BTX20L / BTX30L), not the Group 26R or Group 35 AGM used on Evolution-era units - do not cross-install without checking fit and CCA."
  ],
  "tips": [
   "Battery: the owner's manual says Group BTX30L 400 CCA, the Y32 spec sheet says Group BTX20L 310 CCA - verify on the unit before ordering.",
   "Same G-Force 1000 Series 997 cc engine, same AGM Powersport BTX30L battery and the same Power Zone 200 wiring diagram (A0005639538) as the Next Generation 22-28 kW row - treat it as the same service platform under a different retail badge and doc revision.",
   "Hydraulic lifters - no valve-lash adjustment.",
   "G0072690 is the 25 kW cUL/CSA build with a 200A CUL transfer switch; G0072680 is the 22 kW with a 200A service-entrance switch plus SPD."
  ],
  "manuals": [
   {
    "title": "Guardian by Generac Owner's Manual, 22-25 kW 60 Hz Y32 (item A0010224539)",
    "docType": "owner",
    "seedFile": "generac-guardian-22-25kw-y32-owners.pdf"
   },
   {
    "title": "Guardian by Generac Installation Manual, 22-25 kW 60 Hz Y32 (item A0010224537)",
    "docType": "install",
    "seedFile": "generac-guardian-22-25kw-y32-install.pdf"
   },
   {
    "title": "Specification Sheet, 22-25 kW Y32 HSB (item A0010224535)",
    "docType": "spec",
    "seedFile": "generac-guardian-22-25kw-y32-spec.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual A0010224539, Install Manual A0010224537, Spec Sheet A0010224535 (Y32 revision), wiring diagram A0005639538. Battery conflict between Owner's Manual A0010224539 (BTX30L 400 CCA) and Spec Sheet A0010224535 (BTX20L 310 CCA). Stepper Overcurrent alarm per A0010224539 Quick Reference Guide LED table. Owner's Manual A0010224539 / Install Manual A0010224537 (doc revision Y32, the newest revision found); Power Zone 200 introduced April 2025 per Generac's controller article."
 },
 {
  "id": "gen-generac-next-gen-20-3ph",
  "series": "Generac (Next Generation)",
  "family": "Generac Next Generation 20 kW 208V 3-Phase (Power Zone 200)",
  "controller": "Power Zone 200 (Next Generation Series air-cooled, 10-28 kW)",
  "kw": [
   "20"
  ],
  "engine": "G-Force 1000 Series 2-cyl 997 cc, hydraulic lifters",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2025-present",
  "sort": 10,
  "models": [
   {
    "g": "G0072710",
    "digits": "7271",
    "desc": "20KW/997 GENERAC 208V 3PH NO T/SW"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives. After the 25 hour break-in period and at every interval thereafter Generac recommends its proprietary 5W-20 Gaseous Engine Oil (GEO), formulated for gaseous-fuel Generac generators (A0004332577 p.28). This is NOT the Synthetic 5W-30 used on the Evolution units.",
   "oilCapacity": "Approx. 2.2 qt (2.1 L) including filter (A0005171487)",
   "sparkPlug": "P/N A0003637864; gap 0.020 in (0.508 mm); recommended oil filter 070185ES",
   "plugGap": "0.020 in (0.508 mm) (A0005171487 engine spec table)",
   "valveClearance": "Hydraulic lifters - no valve clearance adjustment (A0005171487)",
   "battery": "12V AGM Powersport Battery Group BTX30L, 400 CCA minimum (P/N A0010137451 / A0010137452)",
   "airFilter": "0J8478S; oil filter 070185ES; control panel fuse 0D7178T; harness fuse 0E7403C",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Configured through the Generac Field Pro app, not from the unit - there is no menu on the panel. Frequency Weekly / Biweekly / Monthly (day 1-28 if monthly); duration adjustable 5-20 minutes, default 5; Transfer on Scheduled Exercise default Disabled; Quiet-Test low-speed profile drops to reduced speed about 40 seconds in. Exercise only runs in AUTO. If the unit is not internet-connected, date/time must be reset over Field Pro every time the 12V battery, the 120VAC T1 feed or the fuse is disconnected (A0004332577 p.22)."
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously / before each use",
    "task": "Inspect louvers, fuel/oil lines, engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Inspect for water intrusion; perform fuel system leak test"
   },
   {
    "interval": "Schedule A - 2 yrs/200 hrs (app calls this oil, oil filter, battery check)",
    "task": "Check battery condition"
   },
   {
    "interval": "Schedule B - 4 yrs/400 hrs (adds air cleaner and spark plugs)",
    "task": "Replace engine oil/oil filter, air filter, spark plug(s); inspect/adjust valve clearance where applicable"
   },
   {
    "interval": "Schedule C - first 25-hour break-in",
    "task": "Oil and oil-filter change after first 25 hours of engine run-time"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller (Evolution) or Field Pro app (Power Zone 200)",
     "Air filter issue",
     "Improper installation",
     "Low battery",
     "(not exhaustive per Generac)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30% (some text says 35%); for NG, check with the gas utility for supply issues.",
     "Check the air filter for blockage/ice (cold weather).",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection (Evolution controller menu / Field Pro app) and, for Evolution units, correct fuel-jet orientation.",
     "The generator has experienced an overcrank alarm. Please contact a dealer. (per dealer-call table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, flashing RED external LED",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor/signal loss",
     "Governor failure",
     "Sticking throttle/mechanical binding",
     "Incorrect frequency/voltage feedback",
     "Faulty control board/logic",
     "Improper wiring",
     "Backfeeding from another power source",
     "Wrong fuel pressure/type",
     "Firmware/config bug"
    ],
    "steps": [
     "Verify fuel shutoff valve is ON.",
     "Verify correct fuel selection (controller menu for Evolution; Field Pro for Power Zone 200) and, for Evolution, jet orientation.",
     "If on LP, verify level is above 30%.",
     "Check for sudden large load changes (AC units etc.) and any Load Manager/SACM function.",
     "Check air filter for blockage/ice.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an overspeed alarm. Please contact a dealer. Guardian table: E-code 1200-1207 ALARM; Next Gen dealer table: 1200-1208 ALARM."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, flashing RED external LED",
    "meaning": "Engine oil pressure alarm.",
    "causes": [
     "Low oil level",
     "Oil pressure sensor/system issue"
    ],
    "steps": [
     "Check oil level.",
     "Do not overfill oil - can cause engine damage.",
     "If oil level is correct, contact a Generac Service Dealer.",
     "Listed as ALARM code 1300 in the Guardian-series table; referenced as a possible-low-oil-level scenario in the outage troubleshooting guide."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1400-1401",
    "name": "High Temp",
    "display": "HIGH TEMPERATURE, flashing RED external LED; unit shuts down during operation",
    "meaning": "The generator has overheated.",
    "causes": [
     "Obstructed intake/exhaust ventilation",
     "Inadequate fuel pressure",
     "Extended continuous operation without required 24-hr shutdown/cooldown",
     "Ambient temperature outside UL2200 rated range (-20F/-29C to 122F/50C)",
     "Snow/debris/vegetation blocking clearance (min. 3 ft clearance required)",
     "Frozen/blocked air filter in cold weather"
    ],
    "steps": [
     "Allow minimum 30-minute cooling period before restart.",
     "Inspect and clear 3 ft of clearance around the unit; remove debris/snow/vegetation from louvers, intake, exhaust.",
     "Check air filter for ice buildup in cold weather.",
     "Verify maintenance items are current per the maintenance schedule.",
     "Clear the alarm and restart (never under load).",
     "The generator has experienced a [operational] alarm - dealer contact recommended if issue persists after cooling/clearance checks. (dealer-call table lists High Temperature/1400 as ALARM)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sensor Loss / RPM Sensor",
    "display": "RPM SENSE LOSS, flashing RED external LED",
    "meaning": "Controller does not detect a valid RPM signal at startup, or loses a valid RPM signal while running. Includes sub-codes 1501, 1505, 1511, 1515 among others.",
    "causes": [
     "Weak/bad battery",
     "Fuel system issues (valve, selection, jet orientation, LP <30%, low pressure)",
     "Overload condition or sudden load change",
     "Lack of routine maintenance (air filter)"
    ],
    "steps": [
     "Check battery voltage/health (>12.6V full charge) and cable/terminal condition.",
     "Verify fuel shutoff valve ON and correct fuel selection/jet orientation.",
     "If LP, verify level above 30%.",
     "Check air filter.",
     "If it shuts down mid-run rather than failing to start, suspect overload/sudden load change rather than battery.",
     "Clear the alarm and attempt a MANUAL restart with no load.",
     "The generator has experienced a no crank RPM Sensor alarm. Please contact a dealer. (dealer-call table: E-code 1522 in Next Gen table, 1500-1521 in Guardian table)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, flashing RED external LED",
    "meaning": "Engine speed (RPM) is too slow.",
    "causes": [
     "Overload condition",
     "Fuel supply issues"
    ],
    "steps": [
     "Check for overload / sudden load change; identify and remove non-essential loads.",
     "Verify fuel supply (shutoff valve ON, correct fuel selection, LP level >30%).",
     "Check airflow (intake/exhaust) and scheduled maintenance items.",
     "Clear the alarm and restart in MANUAL with no load.",
     "The generator has experienced an underspeed alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, flashing RED external LED",
    "meaning": "Generator output voltage detected above normal range.",
    "causes": [
     "Not detailed beyond dealer-call table entry."
    ],
    "steps": [
     "No dedicated homeowner troubleshooting article among the harvested pages; per dealer-call table this requires a dealer.",
     "The generator has experienced an overvoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, flashing RED external LED",
    "meaning": "Generator is not producing proper voltage; can result from prolonged undervoltage or sudden voltage loss.",
    "causes": [
     "Fuel supply/selection issues",
     "Circuitry, firmware, or voltage-production faults (often needs IASD)"
    ],
    "steps": [
     "Verify correct fuel source selected in controller (NG/LP) - Guardian only; Power Zone 200 sets fuel in Field Pro at install.",
     "Verify fuel jet position correct (Guardian units, mainly a new-install concern).",
     "If LP, verify fuel level above 30%.",
     "During widespread NG outages, check with the gas utility for grid issues.",
     "Cold weather: check air filter for ice, clear snow around unit.",
     "Clear the alarm and attempt MANUAL restart with no load.",
     "The generator has experienced an undervoltage alarm. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2070",
    "name": "Keypad Missing",
    "display": "Keypad Missing",
    "meaning": "The controller board does not recognize the keypad.",
    "causes": [],
    "steps": [
     "The controller board is not recognizing the keypad. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warn(ing)",
    "display": "WIRING ERROR, flashing RED external LED; check the app for more information",
    "meaning": "Sensing-wire miswiring: wires crossed, e.g. N1 to 194, or 23 to T1, or an AC wire (N1/N2/T1) crossed with a DC wire (194/23/0). May show as AC voltage detected on a DC input; does not identify exactly which wires are crossed.",
    "causes": [
     "Miswired remote emergency-shutdown sensing wires",
     "Miswired transfer-switch sensing wires"
    ],
    "steps": [
     "This is an internal-wiring fault; Generac support does NOT recommend end users open or modify generator/transfer-switch wiring.",
     "A certified installer/IASD should inspect the customer connections panel for crossed wires.",
     "The generator sensing-wire connections to a remote emergency shutdown switch / to the transfer switch have been miswired. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "LOW VOLTS REMOVE LOAD / OVERLOAD REMOVE LOAD, flashing RED external LED",
    "meaning": "Generator is overloaded - electrical demand exceeds its rated capacity.",
    "causes": [
     "Large new loads added since installation",
     "Load-management device malfunction/misconfiguration",
     "Multiple large loads starting simultaneously (startup/surge wattage 3-4x running wattage)",
     "Unit undersized for current demand"
    ],
    "steps": [
     "Identify and remove/disconnect non-essential loads (whole-home or priority panel as applicable).",
     "Verify Generac Load Manager / SACM function and lockout configuration if installed.",
     "Turn generator MLCB OFF, turn utility MLCB OFF, clear the alarm, restart, then restore loads one at a time.",
     "Never start the generator under load.",
     "The generator has experienced an overload alarm. Please contact a dealer."
    ],
    "clear": "Guardian series: press OFF then ENTER. Next Generation series: hold OFF at least 3 seconds. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2115",
    "name": "AVR PWM Overload",
    "display": "AVR PWM Overload",
    "meaning": "AVR (automatic voltage regulator) PWM alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an AVR PWM alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, flashing RED external LED",
    "meaning": "The 7.5-amp controller fuse is missing or blown.",
    "causes": [
     "Improperly seated or blown 7.5A fuse",
     "Generator battery or battery-cable problem"
    ],
    "steps": [
     "Turn generator OFF, set main utility disconnect OFF, turn off the generator's main line circuit breaker, wait several minutes.",
     "Locate the fuse on the control panel under the rubber flap; inspect for blown/loose fuse; replace with a standard 7.5A automotive fuse if blown.",
     "If fuse is good and seated, inspect the battery and battery cables.",
     "If the error persists after replacing the fuse and checking the battery, a dealer visit is needed so a technician can test the starter circuit for continuity (why the fuse keeps blowing)."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2670",
    "name": "CANBus Error",
    "display": "CANBus Error",
    "meaning": "CANBus communication alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced a CANBus alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2751",
    "name": "Very Low Battery (a.k.a. Battery voltage is very low)",
    "display": "Battery voltage very low, flashing YELLOW / RED external LED",
    "meaning": "Battery voltage is below 9 VDC for 60 seconds or more.",
    "causes": [
     "Partially discharged ('stale') battery installed before the onboard charger completes its initial cycle (common on new installs)",
     "Control/battery connections not fully landed"
    ],
    "steps": [
     "Have the installer verify control wires and battery cables are correctly landed, tight, and free of corrosion.",
     "On new installs, allow the onboard charger at least 18 hours to complete its initial charge cycle - alarm may clear automatically once charging completes.",
     "Clear the alarm: hold OFF >=3 seconds, then press AUTO.",
     "If the alarm persists, replace the battery per the model's spec.",
     "If the battery fails a load test or the fault returns after the above steps, contact an IASD."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary Shutdown",
    "display": "SHUTDOWN SWITCH (2800) = on-unit E-stop, SHUTDOWN SWITCH (2801) = remote E-stop; flashing RED external LED",
    "meaning": "One or more Auxiliary/Emergency-Stop shutdown switches are in the OFF ('O'/open) position. Required by NFPA fire code since 2017 on air-cooled units for quick emergency shutdown.",
    "causes": [
     "Switch bumped/brushed against accidentally",
     "Not reset after maintenance",
     "Animal (e.g. squirrel) contact",
     "Sometimes intentionally tripped by a service provider awaiting service on the unit"
    ],
    "steps": [
     "Locate the switch(es): single-cylinder Guardian units have one on the back of the unit; two-cylinder units add a second inside on the firewall panel near the control panel. A secondary switch (G0073620) may be installed near the transfer switch on Next Gen units if local code requires it, giving code 2801.",
     "Set switch(es) to the I/Closed (up) position - both must be Closed to clear.",
     "50 Hz models: pull out the e-stop, then clear at the panel.",
     "Clear the alarm at the control panel, then return to AUTO.",
     "If the 2800 code fails to clear after resetting the switch, or returns repeatedly without anyone touching it, there may be a wiring issue - contact a Generac IASD."
    ],
    "clear": "Guardian: press OFF then ENTER, then AUTO. Next Gen (Power Zone 200): hold OFF 3 seconds, then AUTO."
   },
   {
    "code": "3000",
    "name": "ECU Faulted",
    "display": "ECU Faulted",
    "meaning": "Engine ECU alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3100-3117",
    "name": "Engine Throttle Valve 1 Position",
    "display": "Engine Throttle Valve 1 Position",
    "meaning": "Engine throttle-valve-position alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine alarm/warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3200-3217",
    "name": "Engine Fuel Delivery Pressure",
    "display": "Engine Fuel Delivery Pressure",
    "meaning": "Engine high or low fuel-delivery-pressure alarm/warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine high/low fuel pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3301-3304",
    "name": "Engine Oil Pressure",
    "display": "Engine Oil Pressure",
    "meaning": "Engine low oil pressure / oil pressure alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine low oil pressure/oil pressure alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3400-3417",
    "name": "Engine Intake Manifold #1 Pressure",
    "display": "Engine Intake Manifold #1 Pressure",
    "meaning": "High/low intake-manifold-pressure alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a high/low intake manifold pressure alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3500-3517",
    "name": "Engine Intake Manifold 1 Temperature",
    "display": "Engine Intake Manifold 1 Temperature",
    "meaning": "Low intake-manifold-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a low intake manifold temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "3803-3817",
    "name": "Battery Potential / Power Input 1",
    "display": "Battery Potential / Power Input 1",
    "meaning": "Battery-voltage alarm or warning (engine-ECU side). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a battery voltage alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4101",
    "name": "Engine Position Sensor",
    "display": "Engine Position Sensor",
    "meaning": "Engine primary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine primary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4201",
    "name": "Engine Timing Sensor",
    "display": "Engine Timing Sensor",
    "meaning": "Engine secondary sync loss.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine secondary sync loss. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4300-4317",
    "name": "O2 Sensor",
    "display": "O2 Sensor",
    "meaning": "Oxygen-sensor alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an O2 sensor alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4503-4507",
    "name": "Engine Ignition Coil #1",
    "display": "Engine Ignition Coil #1",
    "meaning": "Ignition-coil #1 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4603-4607",
    "name": "Engine Ignition Coil #2",
    "display": "Engine Ignition Coil #2",
    "meaning": "Ignition-coil #2 alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine ignition coil alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "4900-4917",
    "name": "Engine Fuel Valve 1 Position",
    "display": "Engine Fuel Valve 1 Position",
    "meaning": "Fuel-valve-position alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel valve alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5100-5117",
    "name": "Engine Speed",
    "display": "Engine Speed",
    "meaning": "Engine-speed alarm or warning (ECU side, distinct from 1200/1600 controller-level speed alarms). Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine speed alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5200-5217",
    "name": "Cylinder Head Temperature 1",
    "display": "Cylinder Head Temperature 1",
    "meaning": "Cylinder-head-temperature alarm or warning. Generac lists this code range as ALARM/WARNING - the exact sub-code decides whether the unit shuts down.",
    "causes": [],
    "steps": [
     "The generator has experienced a cylinder head temperature alarm or warning. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5303-5304",
    "name": "Engine Fuel Shutoff 2 Control",
    "display": "Engine Fuel Shutoff 2 Control",
    "meaning": "Fuel-shutoff-control alarm.",
    "causes": [],
    "steps": [
     "The generator has experienced an engine fuel shutoff control alarm. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "502",
    "name": "Missing Config - Parameter Group",
    "display": "Missing Config - Parameter Group",
    "meaning": "A critical configuration parameter has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "504",
    "name": "Missing Config - Fuel Type",
    "display": "Missing Config - Fuel Type",
    "meaning": "A critical configuration parameter (fuel type) has not been set.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "505",
    "name": "Invalid Serial Number",
    "display": "Invalid Serial Number",
    "meaning": "A critical configuration parameter (serial number) has not been set/is invalid.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "1000-1006",
    "name": "Controller Fault",
    "display": "Controller Fault - no LCD; read the code in Mobile Link or Field Pro",
    "meaning": "Internal alarm on the controller.",
    "causes": [],
    "steps": [
     "Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "Stepper Overcurrent",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, flashing RED external LED; unit will not start in AUTO with utility loss",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current. Listed as a RED-LED alarm in the Power Zone 200 Quick Reference Guide LED table (A0004332577, A0010224539, A0005171487). On Evolution 1.0/2.0 the same alarm carries E-code 2399.",
    "causes": [],
    "steps": [
     "Check the external LEDs and the Mobile Link / Field Pro app for alarms.",
     "Contact an IASD - the manual gives no field procedure for this alarm."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; the red LED goes solid when the alarm clears, then press AUTO."
   }
  ],
  "warnings": [
   {
    "code": "2075",
    "name": "Quadclops Missing",
    "display": "Quadclops Missing",
    "meaning": "The generator does not recognize the external LED lights connection.",
    "causes": [],
    "steps": [
     "The generator does not recognize the external LED lights connection. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2090",
    "name": "Model ID Sync Failed",
    "display": "Model ID Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2095",
    "name": "Fuel Type Sync Failed",
    "display": "Fuel Type Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2120",
    "name": "Serial Num Sync Failed",
    "display": "Serial Num Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2125",
    "name": "Run Hours Sync Failed",
    "display": "Run Hours Sync Failed",
    "meaning": "A model configuration setting has failed to sync with the controller.",
    "causes": [],
    "steps": [
     "A model configuration setting has failed to sync with controller."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, flashing YELLOW external LED",
    "meaning": "Battery charge level has fallen below the acceptable level. Per the battery-alarms article, triggered when battery voltage falls below 12.1 VDC.",
    "causes": [
     "Aging/defective battery",
     "Charging-system issue",
     "Missing neutral wire on battery-charger circuit (new installs)"
    ],
    "steps": [
     "Compare DC voltage on the battery vs. controller reading; if under 12.5 VDC, give the battery a 24-hour charge cycle.",
     "If still low after 24 hours, battery likely needs replacement.",
     "If over 12.5 VDC, check the battery charger for proper operation.",
     "A hard reset may also clear this error.",
     "The battery charge level has fallen below the acceptable level. Please inspect or replace the battery. If necessary, please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice. Also see hard reset procedure."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, flashing YELLOW external LED",
    "meaning": "At the end of a charge cycle the battery is above 16 volts, or is providing more than the recommended charge current. Per the battery-alarms article: battery voltage exceeds 16V OR charger current exceeds 600 mA at the end of an 18-hour charge cycle.",
    "causes": [
     "Battery-charging-circuit issue"
    ],
    "steps": [
     "Options are limited for a homeowner beyond basic checks; can attempt to clear the alarm and manually restart.",
     "Generac does NOT recommend end users service internal generator wiring.",
     "The battery is not charging properly. Please replace the battery or contact a dealer. (New installs: also check for a missing Neutral/00 customer-connection wire and loose/mixed-up N1/N2 wiring at generator and transfer switch - a dealer task.)"
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, flashing YELLOW external LED",
    "meaning": "Battery voltage is below 12.5 volts at the end of an 18-hour charge cycle, indicating the battery is not charging properly.",
    "causes": [
     "Battery-charging-circuit issue",
     "Missing neutral wire for the battery-charger circuit on new installs"
    ],
    "steps": [
     "No numbered stand-alone troubleshooting article was captured for 2770 specifically; per the battery-alarms and PowerPact-LED articles this is generally a dealer diagnostic item (check charger connections/circuit voltage, assess battery health).",
     "The battery is not charging properly. Please replace the battery or contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, flashing YELLOW external LED",
    "meaning": "The unit is not charging the battery properly - the charger's AC power source (T1 circuit, 120VAC) is interrupted.",
    "causes": [
     "Common/expected during a utility outage (charging is powered from utility during an outage; not a fault in that scenario)",
     "New-install wiring issue (missing/incorrect Neutral customer connection)",
     "Blown T1 fuse"
    ],
    "steps": [
     "If seen during a utility outage, this is expected and not necessarily a fault.",
     "If seen with utility power present, or persisting after an outage, the T1 fuse in the transfer switch may be blown.",
     "T1 circuit is live at 120V even with the generator off - Generac does not recommend end users inspect/replace the T1 fuse; this is a dealer task.",
     "The unit is not charging the battery properly. Please contact a dealer."
    ],
    "clear": "Evolution 1/2: press OFF, then ENTER twice, then AUTO. (7.5kW PowerPact: press OFF twice for a single active alarm/warning, or 3 times if an alarm and a warning are both active.) Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO. Nexus (rocker switch): move rocker to OFF, press ENTER twice, move rocker back to AUTO. Nexus without rocker: press OFF, then press ENTER twice."
   },
   {
    "code": "2790",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM Abuse",
    "meaning": "Internal controller warning (SEEPROM abuse).",
    "causes": [],
    "steps": [
     "The generator has experienced an internal warning on the controller. Please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "5415-5417",
    "name": "Engine Oil Level",
    "display": "Engine Oil Level",
    "meaning": "High or low engine-oil-level warning.",
    "causes": [
     "Overfilled oil (high) or low oil (low)"
    ],
    "steps": [
     "High: remove loads, let the generator cool, check oil level, drain oil if necessary before restarting.",
     "Low: remove loads, let the generator cool, check oil level, add oil if necessary before restarting.",
     "If the alarm reappears after correcting oil level, please contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "7000",
    "name": "Overload Cooldown",
    "display": "Overload Cooldown",
    "meaning": "The generator has experienced an overload and is in cool-down mode.",
    "causes": [],
    "steps": [
     "Allow the cool-down mode to complete.",
     "If the condition persists, contact a dealer."
    ],
    "clear": "Next Generation Series (Power Zone 200): hold OFF for at least 3 seconds; red LED goes solid when cleared, then press AUTO."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE A maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE A maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE B maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE B maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "SERVICE C",
    "name": "Service C Due",
    "display": "SERVICE C, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform SERVICE C maintenance.",
     "Check the app for additional information."
    ],
    "clear": "Perform SERVICE C maintenance. Select 'Clear Maintenance' in the app to clear."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, flashing YELLOW external LED in any state",
    "meaning": "Scheduled maintenance reminder shown on the external LED and in the Mobile Link / Field Pro app (A0004332577 p.39).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Inspect the battery.",
     "Check the app for additional information."
    ],
    "clear": "Inspect the battery. Select 'Clear Maintenance' in the app to clear."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   },
   {
    "symptom": "App shows 'battery condition' check prompt",
    "causes": [
     "Weak/failing battery flagged during automatic self-test"
    ],
    "fixes": [
     "Check battery condition in Mobile Link or Field Pro app; contact an IASD if it shows good but the unit still won't crank"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator.",
   "208V 3-phase output (not 240V 1-phase); rated current per phase differs - see spec sheet 10000003872.",
   "Uses AGM Powersport batteries (BTX20L / BTX30L), not the Group 26R or Group 35 AGM used on Evolution-era units - do not cross-install without checking fit and CCA."
  ],
  "tips": [
   "208V 3-phase output - light commercial, not the usual residential 240V 1-phase.",
   "Its own wiring diagram A0005639541 is titled 'WD/SD HSB PZ200 SSI 60HZ 3P 817/997' - a Power Zone 200 unit, not Evolution 2.0. Generac's own Next Generation model-number article also lists G0072710 as the 20 kW 3-phase Next Generation model.",
   "No LCD - codes are read in Mobile Link / Field Pro."
  ],
  "manuals": [
   {
    "title": "3-Phase 60 Hz Air-Cooled Generator Owner's Manual, 20 kW (item A0005171487)",
    "docType": "owner",
    "seedFile": "generac-next-gen-20kw-3ph-owners.pdf"
   },
   {
    "title": "3-Phase 60 Hz Air-Cooled Generator Installation Manual, 20 kW (item A0005171486)",
    "docType": "install",
    "seedFile": "generac-next-gen-20kw-3ph-install.pdf"
   },
   {
    "title": "Specification Sheet, 20 kW 3-Phase Y20 HSB (item A0005171494)",
    "docType": "spec",
    "seedFile": "generac-next-gen-20kw-3ph-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, HSB PZ200 SSI 60 Hz 3-Phase 817/997 cc (item A0005639541)",
    "docType": "wiring",
    "seedFile": "generac-next-gen-20kw-3ph-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual A0005171487, Install Manual A0005171486, Spec Sheet A0005171494, wiring diagram A0005639541; Generac support article 'What are the model numbers for Next Generation series generators?'. Stepper Overcurrent alarm per A0005171487 Quick Reference Guide LED table. Owner's Manual A0005171487 / Install Manual A0005171486 (997 cc Generac-badge 3-phase); Power Zone 200 introduced April 2025 per Generac's controller article. A0005171487 spec table: aluminium enclosure, 472 lb / 214 kg without battery."
 },
 {
  "id": "gen-guardian-evo2-9-22",
  "series": "Guardian",
  "family": "Guardian 9-22 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "9",
   "11",
   "16",
   "17",
   "20",
   "22"
  ],
  "engine": "GH-426 426cc (9 kW); GTH-530 530cc (11 kW); GT-999 999cc (16/17/20/22 kW)",
  "fuel": "Dual-fuel NG/LP carburetor; factory set to NG. Conversion valve rotates 180 degrees to switch to LP - see Install Manual 0L6630 'Converting to LP Vapor', p.~19-20 (also A0001846478 p.~20 for the reprint IM).",
  "years": "verify",
  "sort": 20,
  "models": [
   {
    "g": "G0070290",
    "digits": "7029",
    "desc": "9KW/426 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070291",
    "digits": "7029",
    "desc": "9KW/426 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070300",
    "digits": "7030",
    "desc": "9KW/426 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070301",
    "digits": "7030",
    "desc": "9KW/426 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070310",
    "digits": "7031",
    "desc": "11KW/530 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070311",
    "digits": "7031",
    "desc": "11KW/530 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070320",
    "digits": "7032",
    "desc": "11KW/530 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070321",
    "digits": "7032",
    "desc": "11KW/530 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070330",
    "digits": "7033",
    "desc": "11KW/530 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070331",
    "digits": "7033",
    "desc": "11KW/530 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070350",
    "digits": "7035",
    "desc": "16KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070351",
    "digits": "7035",
    "desc": "16KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070360",
    "digits": "7036",
    "desc": "16KW/999 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070361",
    "digits": "7036",
    "desc": "16KW/999 GUARD+16C T/SW AL"
   },
   {
    "g": "G0070370",
    "digits": "7037",
    "desc": "16KW/999 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070371",
    "digits": "7037",
    "desc": "16KW/999 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070380",
    "digits": "7038",
    "desc": "20KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070381",
    "digits": "7038",
    "desc": "20KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070390",
    "digits": "7039",
    "desc": "20KW/999 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070391",
    "digits": "7039",
    "desc": "20KW/999 GRD+200A SE T/SW AL"
   },
   {
    "g": "G0070420",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070421",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070422",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070428",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0070430",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0070431",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0070432",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0070438",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW WI-FI CAP AL"
   },
   {
    "g": "G0070570",
    "digits": "7057",
    "desc": "9KW/426 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070571",
    "digits": "7057",
    "desc": "9KW/426 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070580",
    "digits": "7058",
    "desc": "11KW/530 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070581",
    "digits": "7058",
    "desc": "11KW/530 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070590",
    "digits": "7059",
    "desc": "16KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070591",
    "digits": "7059",
    "desc": "16KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070600",
    "digits": "7060",
    "desc": "17KW/999 HNYWL+200A SE T/S STL"
   },
   {
    "g": "G0070610",
    "digits": "7061",
    "desc": "17KW/999 HNYWL+200 CSA T/S STL"
   },
   {
    "g": "G0070620",
    "digits": "7062",
    "desc": "20KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070621",
    "digits": "7062",
    "desc": "20KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070630",
    "digits": "7063",
    "desc": "20KW/999 HNYWL+200A SE T/S STL"
   },
   {
    "g": "G0070631",
    "digits": "7063",
    "desc": "20KW/999 HNYWL+200A SE T/S AL"
   },
   {
    "g": "G0070632",
    "digits": "7063",
    "desc": "20KW/999 HNYWL+200A SE T/S AL"
   },
   {
    "g": "G0070650",
    "digits": "7065",
    "desc": "22KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070651",
    "digits": "7065",
    "desc": "22KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070652",
    "digits": "7065",
    "desc": "22KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070658",
    "digits": "7065",
    "desc": "22KW/999 HNYW-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0070660",
    "digits": "7066",
    "desc": "9KW/426 EATON-NO T/SW AL"
   },
   {
    "g": "G0070670",
    "digits": "7067",
    "desc": "11KW/530 EATON-NO T/SW AL"
   },
   {
    "g": "G0070680",
    "digits": "7068",
    "desc": "16KW/999 EATON-NO T/SW AL"
   },
   {
    "g": "G0070690",
    "digits": "7069",
    "desc": "20KW/999 EATON-NO T/SW AL"
   },
   {
    "g": "G0070700",
    "digits": "7070",
    "desc": "22KW/999 EATON-NO T/SW AL"
   },
   {
    "g": "G0070701",
    "digits": "7070",
    "desc": "22KW/999 EATON-NO T/SW AL"
   },
   {
    "g": "G0070710",
    "digits": "7071",
    "desc": "9KW/426 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070711",
    "digits": "7071",
    "desc": "9KW/426 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070720",
    "digits": "7072",
    "desc": "11KW/530 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070721",
    "digits": "7072",
    "desc": "11KW/530 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070730",
    "digits": "7073",
    "desc": "16KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070731",
    "digits": "7073",
    "desc": "16KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070740",
    "digits": "7074",
    "desc": "20KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070741",
    "digits": "7074",
    "desc": "20KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070750",
    "digits": "7075",
    "desc": "22KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070751",
    "digits": "7075",
    "desc": "22KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0070752",
    "digits": "7075",
    "desc": "22KW/999 SIEMENS-NO T/SW AL"
   },
   {
    "g": "G0071400",
    "digits": "7140",
    "desc": "11KW/530 HNYWL+16C T/SW AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30 for all temperature ranges (API SJ, SL, or better; no special additives)",
   "oilCapacity": "9 kW approx. 1.1 qt (1.03 L); 11 kW approx. 1.7 qt (1.6 L); 16-22 kW approx. 1.9 qt (1.8 L), including filter",
   "sparkPlug": "RC12YC or equivalent (see Replacement Parts for exact P/N by kW); gap 9 kW 0.020 in (0.508 mm), 11 kW 0.030 in (0.76 mm), 16-22 kW 0.040 in (1.02 mm); torque to 18-18.4 ft-lbs (25 Nm)",
   "plugGap": "9 kW 0.020 in (0.508 mm); 11 kW 0.030 in (0.76 mm); 16/20/22 kW 0.040 in (1.02 mm) (0L6629 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold, all displacements. Rocker-arm jam-nut torque after adjustment: 9 kW 53 in-lbs (6.0 Nm), 11 kW 72 in-lbs (8.2 Nm), 16-22 kW 174 in-lbs (19.68 Nm). Check/adjust after first 25 hrs, then per Schedule B.",
   "battery": "12V, Group 26R Wet Cell 540 CCA minimum (P/N 0H3421S) or Group 35 AGM 650 CCA minimum, field supplied",
   "airFilter": "See Replacement Parts by kW (e.g. 0E9371A for 9-16kW range)",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Selectable Weekly / Biweekly / Monthly from the control panel; factory default weekly self-test"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "Controller check: this family's own manual (0L6629) heads its menu map EVOLUTION/SYNC2.0 while later 2018+ manuals read EVOLUTION 2.0 / SYNC 3.0 - read the controller label on the unit before relying on a numeric code table; the text alarm list here is from this family's own manual either way.",
   "Badge twins on identical hardware: Honeywell (Y12), Siemens (Y13), Eaton (Y10). Alarm text, LED behaviour and torque specs are the same - only the nameplate and warranty card differ.",
   "17 kW (G0070600 / G0070610) is a Costco-exclusive Honeywell-badged uprate of the 16 kW block.",
   "WI-FI CAP models add the Mobile Link / Wi-Fi module; nothing else changes.",
   "Spark plug gap varies by kW: 9 kW 0.020 in, 11 kW 0.030 in, 16-22 kW 0.040 in. Do not use one gap across the family."
  ],
  "manuals": [
   {
    "title": "Guardian Owner's Manual, 9-22 kW 60 Hz Y20 (item 0L6629)",
    "docType": "owner",
    "seedFile": "generac-guardian-9-22kw-evo2-owners.pdf"
   },
   {
    "title": "Guardian Installation Manual, 9-22 kW 60 Hz Y20 (item 0L6630)",
    "docType": "install",
    "seedFile": "generac-guardian-9-22kw-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 16-22 kW Guardian HSB (item 10000000194)",
    "docType": "spec",
    "seedFile": "generac-guardian-16-22kw-spec.pdf"
   },
   {
    "title": "Specification Sheet, 9-11 kW Guardian HSB (item 10000000191)",
    "docType": "spec",
    "seedFile": "generac-guardian-9-11kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, Air-Cooled HSB 60 Hz (item 0L6823)",
    "docType": "wiring",
    "seedFile": "generac-guardian-evo2-aircooled-wiring.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, Air-Cooled HSB 9 kW (item 0L6822)",
    "docType": "wiring",
    "seedFile": "generac-guardian-evo2-9kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0L6629 (Rev A 07/12/16) p.31-33, Install Manual 0L6630, Spec Sheets 10000000191 / 10000000194, wiring 0L6822 / 0L6823, plus Generac Help Center code articles for the numeric code IDs. Owner's Manual 0L6629 Rev. A 07/12/16 with badge reprints 0L6629Y12 / 10000006567 (Honeywell), 0L6629Y13 / 10000006674 (Siemens), 0L6629Y10 (Eaton) and the Y20 reprint 10000006551 / 10000006541. NOTE: 0L6629's own menu map is headed 'EVOLUTION/SYNC2.0', not 'EVOLUTION 2.0 / SYNC 3.0' like the other manuals in this group - confirm the controller sticker on the unit (white = Evolution 1.0, orange/green = Evolution 2.0) before relying on the code table. Aluminium block with cast-iron sleeve, air-cooled single / V-twin (0L6629 engine spec table). Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-10-22-compact",
  "series": "Guardian",
  "family": "Guardian 10-22 kW compact re-rate, 13/16/20 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "13",
   "16",
   "20"
  ],
  "engine": "G-Force 400 460cc (10); G-Force 800 816cc (13/16, hydraulic); G-Force 1000 999cc (20)",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa). Conversion valve procedure per Install Manual 10000024925.",
  "years": "2018-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0070383",
    "digits": "7038",
    "desc": "20KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0071730",
    "digits": "7173",
    "desc": "13KW GUARDIAN-NO T/SW AL"
   },
   {
    "g": "G0071740",
    "digits": "7174",
    "desc": "13KW GUARDIAN+16C T/SW AL"
   },
   {
    "g": "G0071750",
    "digits": "7175",
    "desc": "13KW GUARDIAN+200A SE T/SW AL"
   },
   {
    "g": "G0071760",
    "digits": "7176",
    "desc": "16KW GUARDIAN-NO T/SW AL"
   },
   {
    "g": "G0071770",
    "digits": "7177",
    "desc": "16KW GUARDIAN+16C T/SW AL"
   },
   {
    "g": "G0071780",
    "digits": "7178",
    "desc": "16KW GUARDIAN+200A SE T/SW AL"
   },
   {
    "g": "G0071800",
    "digits": "7180",
    "desc": "13KW HONEYWELL-NO T/SW AL"
   },
   {
    "g": "G0071810",
    "digits": "7181",
    "desc": "16KW HONEYWELL-NO T/SW AL"
   },
   {
    "g": "G0071820",
    "digits": "7182",
    "desc": "13KW HONEYWELL+16C T/SW AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "10 kW approx. 1.1 qt (1.03 L); 13/16 kW approx. 2.2 qt (2.1 L); 20 kW approx. 1.9 qt (1.8 L)",
   "sparkPlug": "See Replacement Parts; gap 0.020 in (0.508 mm) for 10kW/13-16kW G-Force 400/800 engines, 0.040 in (1.02 mm) for 20kW G-Force 1000",
   "plugGap": "10 kW and 13/16 kW 0.020 in (0.508 mm); 20/22 kW 0.040 in (1.02 mm) (10000024942 engine spec table)",
   "valveClearance": "10 kW and 20 kW: 0.002-0.004 in (0.05-0.1 mm), cold. 13/16 kW (G-Force 800, hydraulic lifters): N/A - no adjustment.",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously / before each use",
    "task": "Inspect louvers, fuel/oil lines, engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Water intrusion check, battery condition check"
   },
   {
    "interval": "Schedule A - 2 yrs/200 hrs",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - 4 yrs/400 hrs",
    "task": "Replace air filter, spark plug(s); inspect/adjust valve clearance where applicable (excludes hydraulic-lifter 13/16kW)"
   },
   {
    "interval": "First 25 hours",
    "task": "Oil/filter change; valve clearance check (excludes hydraulic-lifter engines)"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "Mechanically the same G-Force generation as the Guardian 10-26 kW family - just an earlier/parallel kW naming (10/13/16 vs 10/14/18). A tech may see either kW number on the plate for what is the same 816 cc or 999 cc engine.",
   "13 and 16 kW use G-Force 800 Series engines with HYDRAULIC LIFTERS - do not attempt a valve-lash procedure on those.",
   "G0070383 (20 kW) is cataloged against this manual family (A0000221257 / A0000221256) even though it otherwise matches the 9-22 kW family's 20 kW row."
  ],
  "manuals": [
   {
    "title": "Guardian Owner's Manual, 10-22 kW 60 Hz Y20 (item 10000024942)",
    "docType": "owner",
    "seedFile": "generac-guardian-10-22kw-evo2-owners.pdf"
   },
   {
    "title": "Guardian Installation Manual, 10-22 kW 60 Hz Y20 (item 10000024925)",
    "docType": "install",
    "seedFile": "generac-guardian-10-22kw-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 10-16 kW Guardian HSB (item 10000033190)",
    "docType": "spec",
    "seedFile": "generac-guardian-10-16kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, AC HSB EVO2 60 Hz 999 cc (item 10000017243)",
    "docType": "wiring",
    "seedFile": "generac-evo2-999-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000024942, Install Manual 10000024925, Spec Sheet 10000033190, wiring 10000017243; badge reprints A0000024474 / A0000024352. Owner's Manual 10000024942 Rev. B 10/02/19 ('EVOLUTION 2.0 / SYNC 3.0' menu map) / Install Manual 10000024925; Honeywell reprint A0000024474 / A0000024352; A0000221257 / A0000221256 covers G0070383. Evolution 2.0 introduced 2018 and replaced by Power Zone 200 in April 2025 per Generac's controller articles. The 10 kW / 460 cc rating in this manual is not represented among the catalog models placed in this family. Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-10-26",
  "series": "Guardian",
  "family": "Guardian 10-26 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "10",
   "14",
   "18",
   "20",
   "22",
   "24",
   "26"
  ],
  "engine": "G-Force 400 460cc (10); G-Force 800 816cc (14/18, hydraulic); G-Force 1000 999cc (20-26)",
  "fuel": "Dual-fuel NG/LP, factory set to NG; conversion valve procedure per Install Manual (e.g. A0001846478)",
  "years": "2018-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0070393",
    "digits": "7039",
    "desc": "20KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0070423",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0070429",
    "digits": "7042",
    "desc": "22KW/999 GUARD-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0070433",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0070439",
    "digits": "7043",
    "desc": "22KW/999 GUARD+200A SE T/SW WI-FI CAP AL"
   },
   {
    "g": "G0070623",
    "digits": "7062",
    "desc": "20KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070633",
    "digits": "7063",
    "desc": "20KW/999 HNYWL+200A SE T/S AL"
   },
   {
    "g": "G0070653",
    "digits": "7065",
    "desc": "22KW/999 HNYWL-NO T/SW AL"
   },
   {
    "g": "G0070659",
    "digits": "7065",
    "desc": "22KW/999 HNYW-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0071710",
    "digits": "7171",
    "desc": "10KW GUARDIAN-NO T/SW AL"
   },
   {
    "g": "G0071719",
    "digits": "7171",
    "desc": "10KW GUARDIAN-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0071720",
    "digits": "7172",
    "desc": "10KW GUARDIAN+16C T/SW AL"
   },
   {
    "g": "G0071729",
    "digits": "7172",
    "desc": "10KW GUARDIAN+16C T/SW WI-FI CAP AL"
   },
   {
    "g": "G0071790",
    "digits": "7179",
    "desc": "10KW HONEYWELL-NO T/SW AL"
   },
   {
    "g": "G0071799",
    "digits": "7179",
    "desc": "10KW HONEYWELL-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072090",
    "digits": "7209",
    "desc": "24KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0072099",
    "digits": "7209",
    "desc": "24KW/999 GUARD-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072100",
    "digits": "7210",
    "desc": "24KW/999 GUARD+200A SE PWRVIEW T/SW AL"
   },
   {
    "g": "G0072101",
    "digits": "7210",
    "desc": "24KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0072109",
    "digits": "7210",
    "desc": "24KW/999 GUARD+200A SE T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072130",
    "digits": "7213",
    "desc": "24KW/999 HNYW-NO T/SW AL"
   },
   {
    "g": "G0072139",
    "digits": "7213",
    "desc": "24KW/999 HNYW-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072230",
    "digits": "7223",
    "desc": "14KW GUARDIAN-NO T/SW AL"
   },
   {
    "g": "G0072239",
    "digits": "7223",
    "desc": "14KW GUARDIAN-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072240",
    "digits": "7224",
    "desc": "14KW GUARDIAN+16C T/SW AL"
   },
   {
    "g": "G0072249",
    "digits": "7224",
    "desc": "14KW GUARDIAN+16C T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072250",
    "digits": "7225",
    "desc": "14KW GUARDIAN+200A SET/SW AL"
   },
   {
    "g": "G0072259",
    "digits": "7225",
    "desc": "14KW GUARDIAN+200A SET/SW WI-FI CAP AL"
   },
   {
    "g": "G0072260",
    "digits": "7226",
    "desc": "18KW GUARDIAN-NO T/SW AL"
   },
   {
    "g": "G0072269",
    "digits": "7226",
    "desc": "18KW GUARDIAN-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072280",
    "digits": "7228",
    "desc": "18KW GUARDIAN+200A SET/SW AL"
   },
   {
    "g": "G0072289",
    "digits": "7228",
    "desc": "18KW GUARDIAN+200A SET/SW WI-FI CAP AL"
   },
   {
    "g": "G0072290",
    "digits": "7229",
    "desc": "14KW HONEYWELL-NO T/SW AL"
   },
   {
    "g": "G0072299",
    "digits": "7229",
    "desc": "14KW HONEYWELL-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072300",
    "digits": "7230",
    "desc": "18KW HONEYWELL-NO T/SW AL"
   },
   {
    "g": "G0072309",
    "digits": "7230",
    "desc": "18KW HONEYWELL-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072310",
    "digits": "7231",
    "desc": "14KW HONEYWELL+16C T/SW AL"
   },
   {
    "g": "G0072319",
    "digits": "7231",
    "desc": "14KW HONEYWELL+16C T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072350",
    "digits": "7235",
    "desc": "22KW/999 HNYWL+200A SE T/S AL"
   },
   {
    "g": "G0072359",
    "digits": "7235",
    "desc": "22KW/999 HNYWL+200A SE T/S WI-FI CAP AL"
   },
   {
    "g": "G0072360",
    "digits": "7236",
    "desc": "18KW/816 HNYWL+200A CUL AL"
   },
   {
    "g": "G0072369",
    "digits": "7236",
    "desc": "18KW/816 HNYWL+200A CUL WI-FI CAP AL"
   },
   {
    "g": "G0072900",
    "digits": "7290",
    "desc": "26KW/999 GUARD-NO T/SW AL"
   },
   {
    "g": "G0072909",
    "digits": "7290",
    "desc": "26KW/999 GUARD-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072910",
    "digits": "7291",
    "desc": "26KW/999 GUARD+200A SE T/SW AL"
   },
   {
    "g": "G0072919",
    "digits": "7291",
    "desc": "26KW/999 GUARD+200A SE T/SW WI-FI CAP AL"
   },
   {
    "g": "G0072920",
    "digits": "7292",
    "desc": "26KW/999 HNYW-NO T/SW AL"
   },
   {
    "g": "G0072929",
    "digits": "7292",
    "desc": "26KW/999 HNYW-NO T/SW WI-FI CAP AL"
   },
   {
    "g": "G0073120",
    "digits": "7312",
    "desc": "22KW/999 HNYWL+200A CUL AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "10 kW approx. 1.1 qt (1.03 L); 14/18 kW approx. 2.2 qt (2.1 L); 20-26 kW approx. 1.9 qt (1.8 L)",
   "sparkPlug": "P/N 0G0767B, gap 0.020 in (0.508 mm) for 10 kW and 14/18 kW; P/N 0G0767A, gap 0.040 in (1.02 mm) for 20-26 kW (A0001846499 engine spec table - the 0G0767B / 0.020 in cells span both the 460 cc and 816 cc columns). Spark plug torque 18.4 ft-lbs (25 Nm).",
   "plugGap": "10 kW and 14/18 kW 0.020 in (0.508 mm); 20-26 kW 0.040 in (1.02 mm) (A0001846499 engine spec table)",
   "valveClearance": "10 kW and 20-26 kW: 0.002-0.004 in (0.05-0.1 mm), cold. 14/18 kW (G-Force 800, hydraulic lifters): N/A.",
   "battery": "12V, Group 26R Wet Cell 540 CCA minimum (P/N 0H3421S) or Group 35 AGM 650 CCA minimum, field supplied",
   "airFilter": "0E9371AS (10kW) or 0J8478S (14-26kW); recommended oil filter 070185ES",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable from control panel"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously / before each use",
    "task": "Inspect louvers for dirt/debris; inspect fuel/oil lines; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Inspect for water intrusion; perform fuel system leak test"
   },
   {
    "interval": "Schedule A - 2 yrs/200 hrs",
    "task": "Check battery condition"
   },
   {
    "interval": "Schedule B - 4 yrs/400 hrs",
    "task": "Replace engine oil and oil filter, engine air filter, spark plug(s); inspect/adjust valve clearance where applicable"
   },
   {
    "interval": "First 25 hours",
    "task": "Oil/filter change; valve clearance check (excludes hydraulic-lifter 14/18kW engines)"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent",
    "causes": [
     "Various - see Wi-Fi module manual"
    ],
    "fixes": [
     "Consult the Wi-Fi module/Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator.",
   "10-24kW and 10-26kW printings of the owner/install manual are functionally the same document at different points of the kW range expansion; many 22kW/24kW catalog rows cite both."
  ],
  "tips": [
   "Several 20-24 kW catalog rows cite BOTH the 10-24 kW and the 10-26 kW printing of the owner/install manual - both are genuine Generac documents for the same G-number, from the transition as the range grew.",
   "14 and 18 kW use hydraulic lifters - no valve lash procedure.",
   "G0072100 (24 kW +200A SE PWRVIEW) adds a PWRVIEW home energy management transfer switch; the generator itself is unchanged.",
   "WI-FI CAP variants add the Mobile Link / Wi-Fi module only."
  ],
  "manuals": [
   {
    "title": "Guardian Owner's Manual, 10-26 kW 60 Hz Y20 (item A0001846499)",
    "docType": "owner",
    "seedFile": "generac-guardian-10-26kw-evo2-owners.pdf"
   },
   {
    "title": "Guardian Installation Manual, 10-26 kW 60 Hz Y20 (item A0001846478)",
    "docType": "install",
    "seedFile": "generac-guardian-10-26kw-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 10-18 kW Guardian HSB (item A0000973374)",
    "docType": "spec",
    "seedFile": "generac-guardian-10-18kw-spec.pdf"
   },
   {
    "title": "Specification Sheet, 20-24 kW Guardian HSB (item A0000937814)",
    "docType": "spec",
    "seedFile": "generac-guardian-20-24kw-spec.pdf"
   },
   {
    "title": "Specification Sheet, 26 kW Guardian HSB (item A0002026894)",
    "docType": "spec",
    "seedFile": "generac-guardian-26kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, AC HSB EVO2 60 Hz 1-Phase with STB (item A0000189156)",
    "docType": "wiring",
    "seedFile": "generac-evo2-1ph-stb-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual A0001846499 p.33-34, Install Manual A0001846478, Spec Sheets A0000973374 / A0000937814 / A0002026894, wiring A0000189156 / 10000017243; earlier 10-24 kW printing A0000973303 / A0000973297. Owner's Manual A0001846499 Rev. C 05/12/2023 / Install Manual A0001846478 (10-26 kW) and A0000973303 / A0000973297 (earlier 10-24 kW printing); Honeywell reprints A0001873070 / A0001873069 and A0000973579 / A0000973578. Evolution 2.0 introduced 2018, replaced April 2025. Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-response-16-22",
  "series": "Guardian (Response badge)",
  "family": "Response Series 16/22 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "16",
   "22"
  ],
  "engine": "G-Force 1000 Series 2-cyl 999 cc (same GT-999 block as the Guardian 16-22 kW)",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2017-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0071410",
    "digits": "7141",
    "desc": "16KW/999 RESPONSE+200A SE T/S AL"
   },
   {
    "g": "G0071411",
    "digits": "7141",
    "desc": "16KW/999 RESPONSE+200A SE T/S AL"
   },
   {
    "g": "G0071420",
    "digits": "7142",
    "desc": "22KW/999 RESPONSE+200A SE T/S AL"
   },
   {
    "g": "G0071421",
    "digits": "7142",
    "desc": "22KW/999 RESPONSE+200A SE T/S AL"
   },
   {
    "g": "G0072170",
    "digits": "7217",
    "desc": "16KW/816 RESPONSE-NO T/SW AL"
   },
   {
    "g": "G0072180",
    "digits": "7218",
    "desc": "22KW/999 RESPONSE-NO T/SW AL"
   },
   {
    "g": "G0072189",
    "digits": "7218",
    "desc": "22KW/999 RESPONSE-NO T/SW WI-FI CAP AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "Approx. 1.9 qt (1.8 L) including filter (both kW)",
   "sparkPlug": "See Replacement Parts; gap 0.040 in (1.02 mm) (999 cc engine, 10000018942 spec table)",
   "plugGap": "0.040 in (1.02 mm) (10000018942 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "'Response' is Generac's Costco retail badge; mechanically identical to the equivalent-kW Guardian 999 cc unit.",
   "G0072170 (16KW/816 RESPONSE) has NO owner's or install manual anywhere in Generac's catalog for that G-number. It is placed here on the strength of the Response badge and its own wiring diagram (10000017243, 'WD/SD AC HSB EVO2 60HZ 999') plus engine parts manual A0000347484 ('EV GH816 HSB 2019'). Its 816 cc engine is the G-Force 800 Series with hydraulic lifters, so treat the 14/18 kW rows of the Guardian 10-26 kW family as its mechanical reference, NOT the 999 cc spec column here."
  ],
  "manuals": [
   {
    "title": "Response Series Owner's Manual, 16/22 kW 60 Hz Y20 (item 10000018942)",
    "docType": "owner",
    "seedFile": "generac-response-16-22kw-owners.pdf"
   },
   {
    "title": "Response Series Installation Manual, 16/22 kW 60 Hz Y20 (item 10000018917)",
    "docType": "install",
    "seedFile": "generac-response-16-22kw-install.pdf"
   },
   {
    "title": "Specification Sheet, 16/22 kW Response HSB (item 10000017245)",
    "docType": "spec",
    "seedFile": "generac-response-16-22kw-spec.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000018942, Install Manual 10000018917, Spec Sheet 10000017245; 22 kW standalone printing A0000253003 / A0000253002. Owner's Manual 10000018942 Rev. A 09/01/17 / Install Manual 10000018917 (16/22 kW combined); A0000253003 / A0000253002 is the 22 kW standalone printing. Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-dr-11-20",
  "series": "Guardian (DR badge)",
  "family": "DR badge 11/20 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "11",
   "20"
  ],
  "engine": "GTH-530 2-cyl 530cc (11kW); G-Force 1000 Series 2-cyl 999cc (20kW)",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2018-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0071640",
    "digits": "7164",
    "desc": "11KW/530 DR-NO T/SW AL"
   },
   {
    "g": "G0071650",
    "digits": "7165",
    "desc": "20KW/999 DR-NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "11kW approx. 1.7 qt (1.6 L); 20kW approx. 1.9 qt (1.8 L)",
   "sparkPlug": "See Replacement Parts; gap 11kW 0.030 in (0.76 mm), 20kW 0.040 in (1.02 mm)",
   "plugGap": "11 kW 0.030 in (0.76 mm); 20 kW 0.040 in (1.02 mm) (10000027504 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold, both kW",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "'DR' is a rebadge on the same 530 cc / 999 cc Guardian hardware; alarms and specs match the Guardian 9-22 kW family's 11 kW and 20 kW rows."
  ],
  "manuals": [
   {
    "title": "Owner's Manual, 11/20 kW 60 Hz Y25 (DR badge) (item 10000027504)",
    "docType": "owner",
    "seedFile": "generac-dr-11-20kw-owners.pdf"
   },
   {
    "title": "Installation Manual, 11/20 kW 60 Hz Y25 (DR badge) (item 10000027522)",
    "docType": "install",
    "seedFile": "generac-dr-11-20kw-install.pdf"
   },
   {
    "title": "Specification Sheet, 11/20 kW HSB Y25 (item 10000036821)",
    "docType": "spec",
    "seedFile": "generac-dr-11-20kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, AC HSB EVO2 60 Hz 530 cc (item 10000018465)",
    "docType": "wiring",
    "seedFile": "generac-evo2-530-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000027504, Install Manual 10000027522, Spec Sheet 10000036821 (Y25 revision). Owner's Manual 10000027504 Rev. A 05/18/18 / Install Manual 10000027522 (doc revision Y25). Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-powermate-11",
  "series": "Guardian (Powermate badge)",
  "family": "Powermate badge 11 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "11"
  ],
  "engine": "GTH-530 2-cyl 530 cc (11 kW row of a manual that also covers a 20 kW / 999 cc row)",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2018-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0071660",
    "digits": "7166",
    "desc": "11KW/530 POWERMATE+16C T/SW AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "11kW approx. 1.7 qt (1.6 L)",
   "sparkPlug": "See Replacement Parts; gap 0.030 in (0.76 mm) for the 530cc engine",
   "plugGap": "0.030 in (0.76 mm), 530 cc row (10000027540 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "Only one Powermate G-number appears in Generac's catalog, though its manual covers an 11-20 kW range."
  ],
  "manuals": [
   {
    "title": "Owner's Manual, 11-20 kW 60 Hz Y19 (Powermate badge) (item 10000027540)",
    "docType": "owner",
    "seedFile": "generac-powermate-11-20kw-owners.pdf"
   },
   {
    "title": "Installation Manual, 11-20 kW 60 Hz Y19 (Powermate badge) (item 10000027550)",
    "docType": "install",
    "seedFile": "generac-powermate-11-20kw-install.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000027540, Install Manual 10000027550 (Y19 revision). Owner's Manual 10000027540 Rev. A 05/03/18 / Install Manual 10000027550 (doc revision Y19). Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-synergy-evo2-20",
  "series": "Synergy",
  "family": "Synergy 20 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "20"
  ],
  "engine": "G-Force 1000 Series 2-cyl 999 cc - the same GT-999 engine as the Guardian 20 kW",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2016-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0070400",
    "digits": "7040",
    "desc": "20KW/999 SYNERGY+200A T/SW AL"
   },
   {
    "g": "G0070410",
    "digits": "7041",
    "desc": "20KW/999 SYNERGY+200A CSA AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "Approx. 1.9 qt (1.8 L) including filter",
   "sparkPlug": "See Replacement Parts; gap 0.040 in (1.02 mm)",
   "plugGap": "0.040 in (1.02 mm) (0L6631 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "The manual title says 'VSCF' but the specification tables and alarm list inside 0L6631 / 0L6632 are identical to the standard 999 cc GT-999 Guardian 20 kW - no inverter-specific fault codes or VSCF Ecodes appear in this generation's owner/install manuals. The numeric VSCF Ecodes (1048-1070) belong to the earlier Synergy VSCF 20 kW family (0K2502)."
  ],
  "manuals": [
   {
    "title": "Synergy Owner's Manual, 20 kW VSCF Y20 (item 0L6631)",
    "docType": "owner",
    "seedFile": "generac-synergy-20kw-evo2-owners.pdf"
   },
   {
    "title": "Synergy Installation Manual, 20 kW VSCF Y20 (item 0L6632)",
    "docType": "install",
    "seedFile": "generac-synergy-20kw-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 20 kW Synergy HSB (item 10000000197)",
    "docType": "spec",
    "seedFile": "generac-synergy-20kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, Air-Cooled HSB 20 kW Synergy (item 0L6825)",
    "docType": "wiring",
    "seedFile": "generac-synergy-20kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0L6631, Install Manual 0L6632, Spec Sheet 10000000197, wiring 0L6825. Owner's Manual 0L6631 Rev. A 09/01/16 / Install Manual 0L6632. Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-ecogen-evo2-15",
  "series": "EcoGen",
  "family": "EcoGen 15 kW (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "15"
  ],
  "engine": "G-Force 1000 Series 2-cyl 999cc",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2016-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0070340",
    "digits": "7034",
    "desc": "15KW/999 ECOGEN-NO T/SW AL"
   },
   {
    "g": "G0071630",
    "digits": "7163",
    "desc": "15KW/999 ECOGEN-NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "Approx. 3.75 qt (3.55 L) including filter (10000032217 engine spec table)",
   "sparkPlug": "P/N A0002081582; gap 0.040 in (1.02 mm) (10000032217)",
   "plugGap": "0.040 in (1.02 mm) (10000032217 engine spec table)",
   "valveClearance": "Cold valve clearance 0.002-0.004 in (0.05-0.1 mm)",
   "battery": "12V, Group 26R 540 CCA minimum or Group 35 AGM 650 CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator."
  ],
  "tips": [
   "Off-grid / battery-bank charging unit. Manual title says 'VSCF' but the spec and alarm content matches the standard 999 cc platform in these printings.",
   "Extended-run oil system - check the oil capacity against the unit's own manual before an oil change."
  ],
  "manuals": [
   {
    "title": "EcoGen Owner's Manual, 15 kW 60 Hz Y20 (item 10000032217)",
    "docType": "owner",
    "seedFile": "generac-ecogen-15kw-evo2-owners.pdf"
   },
   {
    "title": "EcoGen Installation Manual, 15 kW 60 Hz Y20 (item 10000032205)",
    "docType": "install",
    "seedFile": "generac-ecogen-15kw-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 15 kW EcoGen HSB (item 10000032973)",
    "docType": "spec",
    "seedFile": "generac-ecogen-15kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, AC HSB EVO2 60 Hz 999 cc EcoGen NEC2023 (item A0003423405)",
    "docType": "wiring",
    "seedFile": "generac-ecogen-15kw-evo2-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000032217, Install Manual 10000032205, Spec Sheet 10000032973, wiring A0003423405; original printing 0L6633 / 0L6634. Oil capacity, spark plug P/N and gap read from Owner's Manual 10000032217 engine spec table. Owner's Manual 0L6633 Rev. A 09/13/16 / Install Manual 0L6634 (original printing) and 10000032217 Rev. D 06/12/2023 / 10000032205 (Y20 reprint). Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo2-20-3ph",
  "series": "Guardian",
  "family": "Guardian 20 kW 208V 3-Phase (Evolution 2.0)",
  "controller": "Evolution 2.0",
  "kw": [
   "20"
  ],
  "engine": "G-Force 1000 Series 2-cyl 999 cc (G0070770 / G0070771); G0072710 lists 997 cc",
  "fuel": "Dual-fuel NG/LP, factory set to natural gas. Required pressure at the fuel inlet: NG 3.5-7.0 in water column (0.87-1.74 kPa), LP vapor 10-12 in water column (2.49-2.99 kPa).",
  "years": "2016-2025",
  "sort": 20,
  "models": [
   {
    "g": "G0070770",
    "digits": "7077",
    "desc": "20KW/999 GUARD 208V 3P AL"
   },
   {
    "g": "G0070771",
    "digits": "7077",
    "desc": "20KW/999 GUARD 208V 3P AL"
   }
  ],
  "specs": {
   "oil": "Synthetic SAE 5W-30",
   "oilCapacity": "Approx. 1.9 qt (1.8 L) including filter",
   "sparkPlug": "See Replacement Parts; gap 0.040 in (1.02 mm)",
   "plugGap": "0.040 in (1.02 mm) (10000014077 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm), cold",
   "battery": "12V, Group 26R-540CCA minimum or Group 35 AGM-650CCA minimum, field supplied",
   "airFilter": "See Replacement Parts",
   "fuelPressure": "Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa), measured at the generator fuel inlet.",
   "exercise": "Weekly / Biweekly / Monthly, selectable"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers for dirt/debris; check lines/connections for fuel or oil leaks; check engine oil level"
   },
   {
    "interval": "Every year",
    "task": "Check for water intrusion; check battery condition, electrolyte level, and state of charge"
   },
   {
    "interval": "Schedule A - every 2 years or 200 hours",
    "task": "Replace engine oil and oil filter"
   },
   {
    "interval": "Schedule B - every 4 years or 400 hours",
    "task": "Replace engine air filter; clean/check gap/replace spark plugs; inspect/adjust valve clearance"
   },
   {
    "interval": "First 25 hours of operation (break-in)",
    "task": "Change engine oil and filter; check/adjust valve clearance"
   },
   {
    "interval": "As needed / per local code",
    "task": "Inspect/clean sediment trap"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Listed among the protection systems in the Evolution 2.0 owner's manuals (e.g. 10000024942, A0001846499, 10000032217). Generac's dealer-call table lists it for the Guardian series with no E-code - the 1000-1006 range belongs to the Next Generation / Power Zone 200 controller, not to Evolution 2.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse"
    ],
    "fixes": [
     "Correct short circuit condition and replace 7.5 amp fuse in control panel; contact an IASD if fuse keeps blowing"
    ]
   },
   {
    "symptom": "Engine cranks but will not start / starts hard and runs rough",
    "causes": [
     "Loose, corroded, or defective battery cables",
     "Defective starter contact or starter motor",
     "Discharged battery",
     "No fuel / fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open Wire 14 from controller",
     "Defective spark plug(s)",
     "Valve clearance out of adjustment",
     "Plugged/damaged air cleaner",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Internal engine issue"
    ],
    "fixes": [
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Replenish fuel / open fuel valve",
     "Clean, check gap, or replace spark plug(s)",
     "Reset valve clearance",
     "Clean/replace air cleaner",
     "Confirm fuel pressure to regulator is 3.5-7.0 in WC (NG) / 10-12 in WC (LP)",
     "Turn fuel conversion valve to correct position"
    ]
   },
   {
    "symptom": "Generator is set to OFF but engine continues to run",
    "causes": [
     "Controller wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact an IASD"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker (MLCB / generator disconnect) is OFF (OPEN)",
     "Generator internal failure",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Check the controller screen to verify status"
    ]
   },
   {
    "symptom": "No transfer to standby after utility source failure",
    "causes": [
     "MLCB (generator disconnect) OFF (OPEN)",
     "Defective transfer switch coil, transfer relay, or open transfer relay circuit",
     "Defective control logic board",
     "Engine may be warming up (Cold Smart Start)"
    ],
    "fixes": [
     "Reset generator disconnect to ON (CLOSED)",
     "Contact an IASD",
     "Check controller screen to verify status"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Excessive engine oil level",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket, seal, or hose",
     "Restricted air filter"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use specified oil (synthetic 5W-30)",
     "Check for oil leaks",
     "Replace air filter"
    ]
   },
   {
    "symptom": "Wi-Fi network connection broken or intermittent (WI-FI CAP / Mobile Link models)",
    "causes": [
     "Various - router/signal/module issues"
    ],
    "fixes": [
     "See the Wi-Fi module / Mobile Link owner's manual"
    ]
   }
  ],
  "installNotes": [
   "Clearances: 3 ft (0.91 m) minimum front and ends; 18 in (457 mm) minimum rear; 5 ft (1.52 m) minimum overhead from any structure/overhang; 5 ft (1.52 m) minimum from operable windows, doors, or openings.",
   "Required fuel pressure at the generator's fuel inlet: Natural gas 3.5-7.0 in water column (0.87-1.74 kPa); LP vapor 10-12 in water column (2.49-2.99 kPa).",
   "Mounted on a Generac composite pad or a code-compliant concrete pad; unit must be installed on a level surface.",
   "Battery is field-supplied, not included with the unit; verify polarity, connect positive cable first, disconnect negative first.",
   "Removable service fence panels cannot be placed within 3 ft (0.91 m) of the generator.",
   "208V 3-phase output (not 240V 1-phase); rated current per phase differs - see spec sheet 10000003872."
  ],
  "tips": [
   "208V 3-phase output, not 240V 1-phase - rated current per phase differs, see spec sheet 10000003872.",
   "This is the earlier 999 cc Evolution 2.0 3-phase build (G0070770 / G0070771). The newer 997 cc G0072710 is a Power Zone 200 unit and is in its own family."
  ],
  "manuals": [
   {
    "title": "Owner's Manual, 20 kW 208V 3-Phase 60 Hz Y20 (item 10000014077)",
    "docType": "owner",
    "seedFile": "generac-guardian-20kw-3ph-evo2-owners.pdf"
   },
   {
    "title": "Installation Manual, 20 kW 208V 3-Phase 60 Hz Y20 (item 10000014113)",
    "docType": "install",
    "seedFile": "generac-guardian-20kw-3ph-evo2-install.pdf"
   },
   {
    "title": "Specification Sheet, 60 Hz 3-Phase Guardian HSB (item 10000003872)",
    "docType": "spec",
    "seedFile": "generac-guardian-3ph-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, AC HSB EVO2 60 Hz 3-Phase (item 10000014079)",
    "docType": "wiring",
    "seedFile": "generac-evo2-3ph-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 10000014077 / 10000003882, Install Manual 10000014113 / 10000003886, Spec Sheet 10000003872, wiring 10000014079 / 10000003828. Owner's Manuals 10000003882 and 10000014077 with install manuals 10000003886 / 10000014113 (999 cc Guardian 208V 3-phase). Controller Fault alarm added from the owner's manual protection-system list."
 },
 {
  "id": "gen-guardian-evo1-8",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion 8 kW, GH-410 (Evolution 1.0)",
  "controller": "Evolution 1.0 (also badged Sync 1.0 / Sync 2.0)",
  "kw": [
   "8"
  ],
  "engine": "GH-410, 410 cc, 1 cylinder OHV",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2011-2016",
  "sort": 20,
  "models": [
   {
    "g": "G0062370",
    "digits": "6237",
    "desc": "8KW/410 GUARD+10C T/SW"
   },
   {
    "g": "G0062371",
    "digits": "6237",
    "desc": "8KW/410 GUARD+10C T/SW STL"
   },
   {
    "g": "G0062450",
    "digits": "6245",
    "desc": "8KW/410 GRD/GENANO T/SW STL"
   },
   {
    "g": "G0062510",
    "digits": "6251",
    "desc": "8KW/410 CENT+10C T/SW STL"
   },
   {
    "g": "G0062630",
    "digits": "6263",
    "desc": "8KW/410 SMNSANO T/SW STL"
   },
   {
    "g": "G0062720",
    "digits": "6272",
    "desc": "8KW/410 EATON NO T/SW STL"
   },
   {
    "g": "G0067030",
    "digits": "6703",
    "desc": "8KW/410 HNYWL NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "SAE 30 above 32F; 10W-30 between 40F and -10F; synthetic 5W-30 at 10F and below",
   "oilCapacity": "Approx. 1.5 qt / 1.4 L including filter",
   "sparkPlug": "P/N 0G0767B, gap 0.020 in (0.508 mm) per 0K5801 Replacement Parts (through Rev G); earlier 0J9943 production (2011-2013) lists RC14YC, gap 0.030 in (0.76 mm) - verify against the plug fitted",
   "plugGap": "0.020 in (0.508 mm) per 0K5801; earlier 0J9943 production 0.030 in (0.76 mm) - verify against the plug fitted",
   "valveClearance": "0.05-0.1 mm (0.002-0.004 in)",
   "battery": "Group 26R, 12V, 540 CCA minimum (0K5801); 525 CCA minimum per 0J9943 (earlier issue)",
   "airFilter": "P/N 0E9371A per the 0K5801 and 0J9943 Replacement Parts tables",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K5804).",
   "exercise": "Configurable Weekly/Biweekly/Monthly, 5 or 12 min run, default Wednesday per menu example"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "Physically the same 8 kW GH-410 unit as the Nexus-era 8 kW family - the split is the control-panel generation.",
   "0K5801's own menu diagram is labeled 'EVOLUTION/SYNC2.0 HSB MENU MAP', so Sync 2.0 units read exactly the same way.",
   "Badge reprints exist as Y10 (Eaton) / Y12 (Honeywell) / Y13 (Siemens) of 0K5801 / 0K5804 - same alarm list."
  ],
  "manuals": [
   {
    "title": "Home Standby Owner's Manual, 8-22 kW Evolution / Sync 2.0 (item 0K5801)",
    "docType": "owner",
    "seedFile": "generac-evo1-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, 8-22 kW Evolution (item 0K5804)",
    "docType": "install",
    "seedFile": "generac-evo1-home-standby-install.pdf"
   },
   {
    "title": "Home Standby Owner's Manual, earlier Evolution 1.0 printing (item 0J9943)",
    "docType": "owner",
    "seedFile": "generac-evo1-2013-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, earlier Evolution 1.0 printing (item 0J9944)",
    "docType": "install",
    "seedFile": "generac-evo1-2013-home-standby-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 Air-Cooled HSB 60 Hz (item 0J9961)",
    "docType": "wiring",
    "seedFile": "generac-evo1-aircooled-wiring.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 Air-Cooled HSB 8 kW (item 0K2945)",
    "docType": "wiring",
    "seedFile": "generac-evo1-8kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K5801 Table 6-1 (through Rev G 11/02/16), Install Manual 0K5804, earlier printing 0J9943 / 0J9944, wiring 0K2945; numeric code IDs from Generac Help Center articles. Spark plug / air filter part numbers read from the 0K5801 Replacement Parts table; NG fuel pressure conversion (7-13 mm Hg) per 0K5804."
 },
 {
  "id": "gen-guardian-evo1-11",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion 11 kW, GT/GTH-530 (Evolution 1.0)",
  "controller": "Evolution 1.0 (also badged Sync 1.0 / Sync 2.0)",
  "kw": [
   "11"
  ],
  "engine": "GTH-530 (0K5801) / GT-530 (0J9943), 530 cc V-twin",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2011-2016",
  "sort": 20,
  "models": [
   {
    "g": "G0064370",
    "digits": "6437",
    "desc": "11KW/530 GUARD+12C T/SW"
   },
   {
    "g": "G0064371",
    "digits": "6437",
    "desc": "11KW/530 GUARD+12C T/SW"
   },
   {
    "g": "G0064380",
    "digits": "6438",
    "desc": "11KW/530 GRD+200A SE T/SW"
   },
   {
    "g": "G0064381",
    "digits": "6438",
    "desc": "11KW/530 GRD+200A SE T/SW"
   },
   {
    "g": "G0064382",
    "digits": "6438",
    "desc": "11KW/530 GRD+200A SE T/SW"
   },
   {
    "g": "G0064383",
    "digits": "6438",
    "desc": "11KW/530 GRD+200A SE T/SW STL"
   },
   {
    "g": "G0064390",
    "digits": "6439",
    "desc": "11KW/530 GRD/GENANO T/SW"
   },
   {
    "g": "G0064391",
    "digits": "6439",
    "desc": "11KW/530 GRD/GENANO T/SW"
   },
   {
    "g": "G0064400",
    "digits": "6440",
    "desc": "11KW/530 CENT+12C T/SW"
   },
   {
    "g": "G0064401",
    "digits": "6440",
    "desc": "11KW/530 CENT+12C T/SW"
   },
   {
    "g": "G0064410",
    "digits": "6441",
    "desc": "11KW/530 CENT+200A SE T/SW"
   },
   {
    "g": "G0064412",
    "digits": "6441",
    "desc": "11KW/530 CENT+200A SE T/SW"
   },
   {
    "g": "G0064413",
    "digits": "6441",
    "desc": "11KW/530 CENT+200A SE T/SW STL"
   },
   {
    "g": "G0064420",
    "digits": "6442",
    "desc": "11KW/530 HNYWL NO T/SW AL"
   },
   {
    "g": "G0064421",
    "digits": "6442",
    "desc": "11KW/530 HNYWL NO T/SW AL"
   },
   {
    "g": "G0064430",
    "digits": "6443",
    "desc": "11KW/530 SMNS-NO T/SW"
   },
   {
    "g": "G0064431",
    "digits": "6443",
    "desc": "11KW/530 SMNS-NO T/SW"
   },
   {
    "g": "G0067240",
    "digits": "6724",
    "desc": "11KW/530 SIEMENS NO T/SW AL"
   },
   {
    "g": "G0067241",
    "digits": "6724",
    "desc": "11KW/530 SIEMENS NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "SAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart",
   "oilCapacity": "Approx. 1.7 qt / 1.6 L including filter",
   "sparkPlug": "P/N 0E9368, gap 0.030 in (0.76 mm) per 0K5801 Replacement Parts; 0J9943 lists BPR6HS at the same gap",
   "plugGap": "0.030 in (0.76 mm) (0K5801 and 0J9943 engine spec tables)",
   "valveClearance": "0.05-0.1 mm (0.002-0.004 in)",
   "battery": "Group 26R, 12V, 540 CCA minimum (0K5801); 525 CCA per 0J9943",
   "airFilter": "P/N 0E9371A per the 0K5801 and 0J9943 Replacement Parts tables",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K5804).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "11kW added a catalytic converter noted in the Emission Control System component list (0J9943 Sec 2.3): 'Catalyst (11kW generator only)'",
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "11 kW is the only kW in this generation whose emission control system explicitly lists a catalyst (0J9943 Sec 2.3: 'Catalyst (11kW generator only)')."
  ],
  "manuals": [
   {
    "title": "Home Standby Owner's Manual, 8-22 kW Evolution / Sync 2.0 (item 0K5801)",
    "docType": "owner",
    "seedFile": "generac-evo1-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, 8-22 kW Evolution (item 0K5804)",
    "docType": "install",
    "seedFile": "generac-evo1-home-standby-install.pdf"
   },
   {
    "title": "Home Standby Owner's Manual, earlier Evolution 1.0 printing (item 0J9943)",
    "docType": "owner",
    "seedFile": "generac-evo1-2013-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, earlier Evolution 1.0 printing (item 0J9944)",
    "docType": "install",
    "seedFile": "generac-evo1-2013-home-standby-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 Air-Cooled HSB 60 Hz (item 0J9961)",
    "docType": "wiring",
    "seedFile": "generac-evo1-aircooled-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K5801, Install Manual 0K5804, wiring 0J9961. Spark plug / air filter part numbers read from the 0K5801 Replacement Parts table; NG fuel pressure conversion (7-13 mm Hg) per 0K5804."
 },
 {
  "id": "gen-guardian-evo1-13-17",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion 13-17 kW, GT-990 (Evolution 1.0)",
  "controller": "Evolution 1.0 (also badged Sync 1.0 / Sync 2.0)",
  "kw": [
   "12",
   "13",
   "14",
   "15",
   "16",
   "17"
  ],
  "engine": "GT-990, 992 cc V-twin",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2011-2016",
  "sort": 20,
  "models": [
   {
    "g": "G0062410",
    "digits": "6241",
    "desc": "14KW/990 GRD+200A SE T/SW"
   },
   {
    "g": "G0062420",
    "digits": "6242",
    "desc": "17KW/990 GUARD+16C T/SW"
   },
   {
    "g": "G0062430",
    "digits": "6243",
    "desc": "17KW/990 GRD+200A SE T/SW"
   },
   {
    "g": "G0062480",
    "digits": "6248",
    "desc": "17KW/990 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0062490",
    "digits": "6249",
    "desc": "17KW/990 GRD/GEN-NO T/S AL"
   },
   {
    "g": "G0062540",
    "digits": "6254",
    "desc": "13KW/990 CENT+14C T/SW"
   },
   {
    "g": "G0062550",
    "digits": "6255",
    "desc": "13KW/990 CENT+200A SE T/SW"
   },
   {
    "g": "G0062560",
    "digits": "6256",
    "desc": "16KW/990 CENT+16C T/SW STL"
   },
   {
    "g": "G0062561",
    "digits": "6256",
    "desc": "16KW/990 CENT+16C T/SW STL"
   },
   {
    "g": "G0062600",
    "digits": "6260",
    "desc": "17KW/990 HNYWL+200A SE"
   },
   {
    "g": "G0062601",
    "digits": "6260",
    "desc": "17KW/990 HNYWL+200A SE"
   },
   {
    "g": "G0062602",
    "digits": "6260",
    "desc": "17KW/990 HNYWL+200A SE STL"
   },
   {
    "g": "G0062610",
    "digits": "6261",
    "desc": "15KW/990 HNYWL NO T/SW AL"
   },
   {
    "g": "G0062670",
    "digits": "6267",
    "desc": "17KW/990 SMNS-NO T/SW AL"
   },
   {
    "g": "G0062740",
    "digits": "6274",
    "desc": "14KW/990 EATON NO T/SW STL"
   },
   {
    "g": "G0062750",
    "digits": "6275",
    "desc": "17KW/990 EATON NO T/SW STL"
   },
   {
    "g": "G0062760",
    "digits": "6276",
    "desc": "17KW/990 EATON NO T/SW AL"
   },
   {
    "g": "G0062810",
    "digits": "6281",
    "desc": "15KW/990 CENT+200A SE T/S STL"
   },
   {
    "g": "G0062820",
    "digits": "6282",
    "desc": "17KW/990 HNYWL+200 CSA T/S STL"
   },
   {
    "g": "G0062821",
    "digits": "6282",
    "desc": "17KW/990 HNYWL+200 CSA T/S STL"
   },
   {
    "g": "G0064610",
    "digits": "6461",
    "desc": "16KW/990 GUARD+16C T/SW STL"
   },
   {
    "g": "G0064611",
    "digits": "6461",
    "desc": "16KW/990 GUARD+16C T/SW STL"
   },
   {
    "g": "G0064620",
    "digits": "6462",
    "desc": "16KW/990 GRD +200A SE T/SW STL"
   },
   {
    "g": "G0064621",
    "digits": "6462",
    "desc": "16KW/990 GRD +200A SE T/SW STL"
   },
   {
    "g": "G0064622",
    "digits": "6462",
    "desc": "16KW/990 GRD +200A SE T/SW STL"
   },
   {
    "g": "G0067000",
    "digits": "6700",
    "desc": "16KW/990 SMNS NO T/SW STL"
   },
   {
    "g": "G0067001",
    "digits": "6700",
    "desc": "16KW/990 SMNS NO T/SW STL"
   },
   {
    "g": "G0067210",
    "digits": "6721",
    "desc": "16KW/990 GRD/GEN NO T/SW AL"
   },
   {
    "g": "G0067211",
    "digits": "6721",
    "desc": "16KW/990 GRD/GEN NO T/SW AL"
   },
   {
    "g": "G0067250",
    "digits": "6725",
    "desc": "16KW/990 SIEMENS NO T/SW AL"
   },
   {
    "g": "G0067251",
    "digits": "6725",
    "desc": "16KW/990 SIEMENS NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "SAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart",
   "oilCapacity": "Approx. 1.9 qt / 1.8 L including filter",
   "sparkPlug": "P/N 0E7585A (992 cc GT-990 column), gap 0.040 in (1.02 mm) per 0K5801 Replacement Parts; 0J9943 lists RC14YC",
   "plugGap": "0.040 in (1.02 mm) (0K5801 16 kW column; 0J9943 13/14/15/16/17 kW column)",
   "valveClearance": "0.05-0.1 mm (0.002-0.004 in)",
   "battery": "Group 26R, 12V, 540 CCA minimum (0K5801, 16kW column); 525 CCA per 0J9943",
   "airFilter": "P/N 0J8478 per the 0K5801 and 0J9943 Replacement Parts tables",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K5804).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "15kW appears only via Honeywell (G0062610) and Centurion (G0062810) SKUs sharing the 0J9943/0J9944 manual generation - no dedicated 15kW spec column found; treated as a GT-990 variant between 14 and 16kW",
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "15 kW appears only as Honeywell (G0062610) and Centurion (G0062810) SKUs and has no dedicated spec column in 0K5801 (which jumps 11 to 16 kW) or 0J9943 - treat it as a GT-990 mid-range variant and confirm against a spec sheet.",
   "G0060541 (Honeywell 12 kW) is grouped here by controller generation; neither 0K5801 nor 0J9943 carries a 12 kW spec column, so its true figures sit between the Nexus-era 12 kW numbers and the 13 kW Evolution numbers."
  ],
  "manuals": [
   {
    "title": "Home Standby Owner's Manual, 8-22 kW Evolution / Sync 2.0 (item 0K5801)",
    "docType": "owner",
    "seedFile": "generac-evo1-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, 8-22 kW Evolution (item 0K5804)",
    "docType": "install",
    "seedFile": "generac-evo1-home-standby-install.pdf"
   },
   {
    "title": "Home Standby Owner's Manual, earlier Evolution 1.0 printing (item 0J9943)",
    "docType": "owner",
    "seedFile": "generac-evo1-2013-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, earlier Evolution 1.0 printing (item 0J9944)",
    "docType": "install",
    "seedFile": "generac-evo1-2013-home-standby-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 Air-Cooled HSB 60 Hz (item 0J9961)",
    "docType": "wiring",
    "seedFile": "generac-evo1-aircooled-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K5801 Table 6-1, Install Manual 0K5804, earlier printing 0J9943 / 0J9944, wiring 0J9961. G0060541 removed - catalog ties it to Nexus-era Honeywell manual 0J4784, not 0K5801/0J9943. Spark plug / air filter part numbers read from the 0K5801 Replacement Parts table; NG fuel pressure conversion (7-13 mm Hg) per 0K5804."
 },
 {
  "id": "gen-guardian-evo1-20-22",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion 20-22 kW, GT-999 (Evolution 1.0)",
  "controller": "Evolution 1.0 (also badged Sync 1.0 / Sync 2.0)",
  "kw": [
   "20",
   "22"
  ],
  "engine": "GT-999, 999 cc V-twin",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2011-2016",
  "sort": 20,
  "models": [
   {
    "g": "G0062440",
    "digits": "6244",
    "desc": "20KW/999 GUARD+ 200A SE AL"
   },
   {
    "g": "G0062500",
    "digits": "6250",
    "desc": "20KW/999 GRD/GEN-NO T/S AL"
   },
   {
    "g": "G0062580",
    "digits": "6258",
    "desc": "20KW/999 CENT+200A SE"
   },
   {
    "g": "G0062581",
    "digits": "6258",
    "desc": "20KW/999 CENT+200A SE STL"
   },
   {
    "g": "G0062582",
    "digits": "6258",
    "desc": "20KW/999 CENT+200A SE STL"
   },
   {
    "g": "G0062583",
    "digits": "6258",
    "desc": "20KW/999 CENT+200A SE STL"
   },
   {
    "g": "G0062620",
    "digits": "6262",
    "desc": "20KW/999 HNYWL NO T/SW AL"
   },
   {
    "g": "G0062621",
    "digits": "6262",
    "desc": "20KW/999 HNYWL NO T/SW AL"
   },
   {
    "g": "G0062770",
    "digits": "6277",
    "desc": "20KW/999 EATON NO T/SW AL"
   },
   {
    "g": "G0062771",
    "digits": "6277",
    "desc": "20KW/999 EATON NO T/SW AL"
   },
   {
    "g": "G0065510",
    "digits": "6551",
    "desc": "22KW/999 GUARD+ 200A SE AL"
   },
   {
    "g": "G0065511",
    "digits": "6551",
    "desc": "22KW/999 GUARD+200A SE AL"
   },
   {
    "g": "G0065512",
    "digits": "6551",
    "desc": "22KW/999 GUARD+ 200A SE AL"
   },
   {
    "g": "G0065520",
    "digits": "6552",
    "desc": "22KW/999 GRD/GEN-NO T/S AL"
   },
   {
    "g": "G0065521",
    "digits": "6552",
    "desc": "22KW/999 GRD/GENANO T/S AL"
   },
   {
    "g": "G0065530",
    "digits": "6553",
    "desc": "22KW/999 CENT+200A SE AL"
   },
   {
    "g": "G0065531",
    "digits": "6553",
    "desc": "22KW/999 CENT+200A SE AL"
   },
   {
    "g": "G0065532",
    "digits": "6553",
    "desc": "22KW/999 CENT+ 200A SE AL"
   },
   {
    "g": "G0065540",
    "digits": "6554",
    "desc": "22KW/999 HNYWL NO T/SW AL"
   },
   {
    "g": "G0065541",
    "digits": "6554",
    "desc": "22KW/999 HNYWL NO T/SW AL"
   },
   {
    "g": "G0065550",
    "digits": "6555",
    "desc": "22KW/999 SMNS-NO T/SW AL"
   },
   {
    "g": "G0065551",
    "digits": "6555",
    "desc": "22KW/999 SMNS-NO T/SW AL"
   },
   {
    "g": "G0067270",
    "digits": "6727",
    "desc": "20KW/999 HNYWL+200A CSA STL"
   },
   {
    "g": "G0067290",
    "digits": "6729",
    "desc": "20KW/999 GUARD+200A SE STL"
   },
   {
    "g": "G0067291",
    "digits": "6729",
    "desc": "20KW/999 GUARD+200A SE STL"
   },
   {
    "g": "G0067292",
    "digits": "6729",
    "desc": "20KW/999 GUARD+ 200A SE STL"
   },
   {
    "g": "G0067300",
    "digits": "6730",
    "desc": "20KW/999 GRD/GEN-NO T/S STL"
   },
   {
    "g": "G0067301",
    "digits": "6730",
    "desc": "20KW/999 GRD/GEN-NO T/S STL"
   },
   {
    "g": "G0067320",
    "digits": "6732",
    "desc": "20KW/999 SMNS-NO T/SW STL"
   },
   {
    "g": "G0067330",
    "digits": "6733",
    "desc": "20KW/999 EATON NO T/SW STL"
   }
  ],
  "specs": {
   "oil": "SAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart",
   "oilCapacity": "Approx. 1.9 qt / 1.8 L including filter",
   "sparkPlug": "P/N 0G0767A, gap 0.040 in (1.02 mm) per 0K5801 Replacement Parts (20/22 kW, through Rev G); earlier 0J9943 20 kW production lists RC12YC, gap 0.030 in (0.76 mm) - verify against the plug fitted (22 kW is not offered under 0J9943)",
   "plugGap": "0.040 in (1.02 mm) per 0K5801 (20/22 kW); earlier 0J9943 20 kW production 0.030 in (0.76 mm) - verify against the plug fitted",
   "valveClearance": "0.05-0.1 mm (0.002-0.004 in)",
   "battery": "Group 26R, 12V, 540 CCA minimum",
   "airFilter": "P/N 0J8478 per the 0K5801 and 0J9943 Replacement Parts tables",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K5804).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "90A main breaker at 20kW, 100A at 22kW (0K5801 spec table)",
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "22 kW is new to this generation - it was not offered in the Nexus-era lineup.",
   "Main breaker is 90A at 20 kW and 100A at 22 kW (0K5801 spec table)."
  ],
  "manuals": [
   {
    "title": "Home Standby Owner's Manual, 8-22 kW Evolution / Sync 2.0 (item 0K5801)",
    "docType": "owner",
    "seedFile": "generac-evo1-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, 8-22 kW Evolution (item 0K5804)",
    "docType": "install",
    "seedFile": "generac-evo1-home-standby-install.pdf"
   },
   {
    "title": "Home Standby Owner's Manual, earlier Evolution 1.0 printing (item 0J9943)",
    "docType": "owner",
    "seedFile": "generac-evo1-2013-home-standby-owners.pdf"
   },
   {
    "title": "Home Standby Installation Manual, earlier Evolution 1.0 printing (item 0J9944)",
    "docType": "install",
    "seedFile": "generac-evo1-2013-home-standby-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 Air-Cooled HSB 60 Hz (item 0J9961)",
    "docType": "wiring",
    "seedFile": "generac-evo1-aircooled-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K5801 Table 6-1, Install Manual 0K5804, earlier printing 0J9943 / 0J9944, wiring 0J9961. Spark plug / air filter part numbers read from the 0K5801 Replacement Parts table; NG fuel pressure conversion (7-13 mm Hg) per 0K5804. 22 kW is new to this generation - it is not offered in the 2008-2011 Nexus lineup found in this catalog."
 },
 {
  "id": "gen-ecogen-evo1-15",
  "series": "EcoGen",
  "family": "EcoGen 15 kW, extended run (Evolution 1.0)",
  "controller": "Evolution 1.0 (also badged Sync 1.0 / Sync 2.0) plus a G-Flex VSCF alternator/AVR system (Ecodes 1048-1070)",
  "kw": [
   "15"
  ],
  "engine": "GT-999, 999 cc V-twin",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP (rated same current at LP and NG per spec table, unlike standard Guardian line)",
  "years": "2012-2013",
  "sort": 20,
  "models": [
   {
    "g": "G0061030",
    "digits": "6103",
    "desc": "15KW/999 ECOGEN"
   },
   {
    "g": "G0061031",
    "digits": "6103",
    "desc": "15KW/999 ECOGEN AL"
   }
  ],
  "specs": {
   "oil": "SAE 30 above 32F; 10W-30 between 40F and -10F; synthetic 5W-30 at 10F and below (same viscosity chart as other Evolution 1.0 GT-engines)",
   "oilCapacity": "Approx. 3.75 qt / 3.55 L including filter (larger than the standard 20kW GT-999 1.9 qt - extended-run oil system)",
   "sparkPlug": "RC12YC, gap 0.040 in (1.02 mm)",
   "plugGap": "0.040 in (1.02 mm) (0K6046 engine spec table)",
   "valveClearance": "0K6046 does not print a valve-clearance figure in its Specifications section; its maintenance section says to check after the first 25 hours and then every 500 hours and to compare against Section 2. The rest of the GT-999 line specifies 0.002-0.004 in (0.05-0.1 mm) (0K5801 / 0K2502) - verify on the unit's own manual before adjusting.",
   "battery": "Group 26R, 12V, 525 CCA minimum (Generac P/N 0H3421S)",
   "airFilter": "Part #0J8478",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K6047).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Same Evolution 1.0 Service Schedule A/B structure",
    "task": "Oil/filter/air filter/spark plug/valve clearance per 0K6046 Sec 4.12"
   },
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   },
   {
    "interval": "Every three months",
    "task": "Check the AVR and engine filter (0K6046 Service Schedule)"
   },
   {
    "interval": "Schedule A - every 2 years or 500 hours",
    "task": "Replace the AVR filter (more often in dusty conditions) (0K6046 Service Schedule)"
   },
   {
    "interval": "Schedule B - every 4 years or 1000 hours",
    "task": "Replace rotor brushes - IASD only (0K6046 Service Schedule)"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   },
   {
    "code": "1048",
    "name": "VSCF Overload",
    "display": "1048 VSCF OVERLOAD",
    "meaning": "Alternator, AVR or wiring damage detected as an overload condition.",
    "causes": [
     "Damaged alternator, AVR or wiring"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1049",
    "name": "VSCF Overload",
    "display": "1049 VSCF OVERLOAD",
    "meaning": "Generator output shorted or severely overloaded.",
    "causes": [
     "Shorted output",
     "Severe overload"
    ],
    "steps": [
     "Identify and clear the overload, then restart."
    ],
    "clear": "Clear the overload, restart"
   },
   {
    "code": "1052",
    "name": "VSCF DC Overvoltage",
    "display": "1052 VSCF DC OVERVOLTAGE",
    "meaning": "Temporary overload or output short.",
    "causes": [
     "Temporary overload",
     "Temporary output short"
    ],
    "steps": [
     "Try to restart the unit."
    ],
    "clear": "Restart"
   },
   {
    "code": "1053",
    "name": "VSCF Gate Fault",
    "display": "1053 VSCF GATE FAULT",
    "meaning": "The AVR is damaged.",
    "causes": [
     "AVR failure"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1054",
    "name": "VSCF IGBT Overtemp.",
    "display": "1054 VSCF IGBT OVERTEMP.",
    "meaning": "AVR IGBT electronics over temperature.",
    "causes": [
     "Dirty AVR filter",
     "Blocked intake / exhaust air path",
     "BIG fan not running",
     "Air leak in the AVR enclosure",
     "Engine running hot",
     "Ambient above 60 F (15.5 C) - derate needed"
    ],
    "steps": [
     "Replace the AVR filter and inspect the fan.",
     "Check the intake and exhaust for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING.",
     "Check the AVR enclosure for air leaks.",
     "Inspect the air intake / exhaust for a hot-running engine.",
     "Derate output per specifications if ambient is high.",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1055",
    "name": "VSCF Phase Error",
    "display": "1055 VSCF PHASE ERROR",
    "meaning": "Incorrect voltage or frequency detected during starting.",
    "causes": [
     "Alternator damage",
     "Generator started into a severe load",
     "Engine not reaching prescribed speed (stepper motor / linkage / gas pressure)"
    ],
    "steps": [
     "Manually transfer back to utility and retry the start.",
     "Remove load and retry.",
     "Verify the stepper motor moves freely and is plugged in.",
     "Verify gas pressure is within specified limits.",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1056",
    "name": "VSCF Undervoltage",
    "display": "1056 VSCF UNDERVOLTAGE",
    "meaning": "Generator output voltage too low.",
    "causes": [
     "Load too large",
     "Alternator or AVR damage"
    ],
    "steps": [
     "Remove load and restart.",
     "Contact a dealer if damage is suspected."
    ],
    "clear": "Remove load / dealer"
   },
   {
    "code": "1057",
    "name": "VSCF Overvoltage",
    "display": "1057 VSCF OVERVOLTAGE",
    "meaning": "Generator overloaded or started into a severe load.",
    "causes": [
     "Overload",
     "Severe starting load"
    ],
    "steps": [
     "Remove load and restart.",
     "Manually transfer to utility and retry if needed."
    ],
    "clear": "Remove load, restart"
   },
   {
    "code": "1058",
    "name": "VSCF DC Undervoltage",
    "display": "1058 VSCF DC UNDERVOLTAGE",
    "meaning": "DPE winding supply voltage too low.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1059",
    "name": "VSCF Field Loss",
    "display": "1059 VSCF FIELD LOSS",
    "meaning": "No output voltage detected while starting.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1060",
    "name": "Big Fan Failure",
    "display": "1060 BIG FAN FAILURE",
    "meaning": "AVR electronics temperature exceeds 158 F (70 C).",
    "causes": [
     "Faulty AVR filter",
     "Blocked intake / exhaust",
     "Big fan not running",
     "Air leak in the AVR enclosure",
     "Engine running hot",
     "High ambient (over 60 F / 15.6 C) needing derate"
    ],
    "steps": [
     "Replace the AVR filter.",
     "Check the intake and exhaust for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING.",
     "Check the small fan too if the message shows while stopped (the small fan runs 60 min after stop for heat soak).",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1061",
    "name": "VSCF Field Loss",
    "display": "1061 VSCF FIELD LOSS",
    "meaning": "Output voltage lost while running.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1065",
    "name": "Overfrequency",
    "display": "1065 OVERFREQUENCY",
    "meaning": "Output frequency exceeded the limit while running.",
    "causes": [
     "Overload",
     "Failed RPM sensor",
     "Stepper motor problem"
    ],
    "steps": [
     "Remove load and restart.",
     "Contact a dealer if the RPM sensor or stepper motor is suspected."
    ],
    "clear": "Remove load / dealer"
   },
   {
    "code": "1066",
    "name": "VSCF Speed Mismatch",
    "display": "1066 VSCF SPEED MISMATCH",
    "meaning": "Engine speed does not match the commanded output during operation or starting.",
    "causes": [
     "Fuel pressure loss",
     "Large load not wired through the load-shed module",
     "Large overload",
     "Throttle or engine problem"
    ],
    "steps": [
     "Check the fuel supply and restart.",
     "Contact the installing dealer to correct the load-shed wiring.",
     "Remove load and restart.",
     "Contact a dealer for a throttle or engine issue."
    ],
    "clear": "Corrective action per cause"
   },
   {
    "code": "1063",
    "name": "VSCF Mismatch (Error Code 1063)",
    "display": "1063",
    "meaning": "Generac's support article states code 1063 indicates a Variable Speed Constant Frequency (VSCF) mismatch. The article does not name a controller generation; the VSCF alternator system in this catalog is the Synergy / CorePower VSCF platform.",
    "causes": [],
    "steps": [
     "A hard reset can be attempted.",
     "If the issue persists, a certified service technician must inspect the system."
    ],
    "clear": "Hard reset procedure."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   },
   {
    "code": "1051",
    "name": "VSCF High Battery",
    "display": "1051 VSCF HIGH BATTERY",
    "meaning": "Voltage supply to the AVR is high.",
    "causes": [
     "External battery charger mis-installed"
    ],
    "steps": [
     "If an external charger is in use, contact the installing dealer to correct the installation.",
     "If not, contact a servicing dealer."
    ],
    "clear": "Dealer / installer correction"
   },
   {
    "code": "1070",
    "name": "Small Fan Failure",
    "display": "1070 SMALL FAN FAILURE",
    "meaning": "Small (heat-soak) fan current incorrect. If the unit was running in AUTO and utility returns, it continues running up to 1 hour to cool the electronics without the fan.",
    "causes": [
     "Fan wiring or mechanical fault",
     "Blocked air path / dirty AVR filter"
    ],
    "steps": [
     "Contact a dealer for a wiring or mechanical fault.",
     "Check the AVR filter for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING."
    ],
    "clear": "Dealer after corrective action"
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "Aluminum enclosure, 65A main breaker, 536 lb unit weight (0K6046 spec table)",
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "Extended-run oil system: approx. 3.75 qt / 3.55 L including filter, far more than the 1.9 qt of a standard 20 kW GT-999. Do not fill to the standard Guardian figure.",
   "Aluminum enclosure, 65A main breaker, 536 lb unit weight (0K6046 spec table).",
   "Rated the same current on LP and NG, unlike the standard Guardian line."
  ],
  "manuals": [
   {
    "title": "EcoGen Owner's Manual, 15 kW Evolution 1.0 (item 0K6046)",
    "docType": "owner",
    "seedFile": "generac-ecogen-15kw-evo1-owners.pdf"
   },
   {
    "title": "EcoGen Installation Manual, 15 kW Evolution 1.0 (item 0K6047)",
    "docType": "install",
    "seedFile": "generac-ecogen-15kw-evo1-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 15 kW HSB VSCF EcoGen (item 0K7382)",
    "docType": "wiring",
    "seedFile": "generac-ecogen-15kw-vscf-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K6046, Install Manual 0K6047 / 0K9689, wiring 0K7382. Valve-clearance value is not printed in 0K6046; interval (first 25 hrs, then every 500 hrs) is from 0K6046 Valve Clearance Adjustment. VSCF / G-Flex Ecodes 1048-1070 added from 0K6046 Table 5-3 'G-Flex Troubleshooting' (same code set and meanings as the Synergy 20 kW VSCF unit); AVR filter maintenance from 0K6046 Service Schedule."
 },
 {
  "id": "gen-synergy-vscf-20",
  "series": "Synergy",
  "family": "Synergy 20 kW VSCF (Evolution 1.0 with VSCF Ecodes)",
  "controller": "Synergy / CorePower VSCF controller (Evolution 1.0 base plus numeric VSCF Ecodes)",
  "kw": [
   "20"
  ],
  "engine": "GT-999, 999 cc V-twin driving a VSCF (variable-speed constant-frequency) alternator",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2011-2012",
  "sort": 30,
  "models": [
   {
    "g": "G0060550",
    "digits": "6055",
    "desc": "20KW/999 SYNERGY T/SW"
   },
   {
    "g": "G0060551",
    "digits": "6055",
    "desc": "20KW/999 SYNERGY T/SW AL"
   },
   {
    "g": "G0060980",
    "digits": "6098",
    "desc": "20KW/999 SYNERGY T/SW CSA"
   },
   {
    "g": "G0060981",
    "digits": "6098",
    "desc": "20KW/999 SYNERGY T/SW CSA AL"
   }
  ],
  "specs": {
   "oil": "SAE 30 above 32F; 10W-30 between 40F and -10F; synthetic 5W-30 at 10F and below (same viscosity chart as other GT-999 units)",
   "oilCapacity": "Approx. 1.9 qt (1.8 L) including filter",
   "sparkPlug": "P/N 0G0767A, gap 0.040 in (1.02 mm) (0K2502 Replacement Parts and engine spec table)",
   "plugGap": "0.040 in (1.02 mm) (0K2502 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm) (0K2502 engine spec table)",
   "battery": "Group 26R, 12V, 540 CCA minimum",
   "airFilter": "P/N 0J8478 (0K2502 Replacement Parts table)",
   "fuelPressure": "Natural gas 3.5-7 in water column (7-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg) at the regulator (0K2503).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Same Evolution-style Service Schedule structure",
    "task": "Oil/filter, air filter, spark plugs; AVR filter also needs periodic replacement (see 1054/1060 Ecode causes)"
   },
   {
    "interval": "Daily if running continuously, or before each use",
    "task": "Check enclosure louvers, fuel/oil lines and connections, engine oil level, water intrusion"
   },
   {
    "interval": "Every year (Schedule A)",
    "task": "Check battery condition/electrolyte/charge; replace engine oil & filter (first service at 25 hrs)"
   },
   {
    "interval": "Every 2 years or 200 hrs (Schedule B)",
    "task": "Replace engine oil & filter, air filter, spark plug(s); inspect/adjust valve clearance"
   },
   {
    "interval": "Every 4 years or 400 hrs",
    "task": "Full Schedule B service repeated per table markers"
   },
   {
    "interval": "First 25 hrs",
    "task": "Change initial break-in oil & filter; check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "Controller Fault",
    "name": "Controller Fault",
    "display": "CONTROLLER FAULT, red LED",
    "meaning": "Internal controller fault. Generac's dealer-call table lists this alarm for the Guardian series with no E-code - the numeric range 1000-1006 belongs to the Next Generation / Power Zone 200 controller, not to Evolution 1.0.",
    "causes": [],
    "steps": [
     "Contact an IASD - no field procedure is published for this alarm on this controller generation."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO. Dealer diagnosis required if it returns."
   },
   {
    "code": "1100-1101",
    "name": "Overcrank",
    "display": "OVERCRANK, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Unit turns over but will not start. The engine attempts to crank 5 times; if it cannot start, OVERCRANK is triggered.",
    "causes": [
     "Inadequate fuel pressure",
     "Fuel shutoff valve OFF",
     "Improper fuel selection in the controller",
     "Air filter blocked or iced",
     "Improper installation",
     "Low battery",
     "Fouled or worn spark plug(s)"
    ],
    "steps": [
     "Verify the fuel line shutoff valve is ON.",
     "Check LP tank level is above 30 percent; for NG check with the gas utility for supply issues.",
     "Check the air filter for blockage or ice (cold weather).",
     "Check battery condition via the BATTERY MENU on the control panel.",
     "Clear the alarm and restart in MANUAL (never start under load).",
     "Confirm correct fuel selection in the controller menu and correct fuel-jet orientation.",
     "If it will not start or runs rough, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1200-1208",
    "name": "Overspeed",
    "display": "OVERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Controller detects abnormally high engine RPM.",
    "causes": [
     "Lean fuel condition",
     "Sudden change in load",
     "Faulty RPM sensor / signal loss",
     "Governor failure",
     "Sticking throttle or mechanical binding",
     "Stepper motor fault"
    ],
    "steps": [
     "Do not attempt a field governor adjustment - Generac routes this alarm to a dealer.",
     "Contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO (fault re-latches until repaired)."
   },
   {
    "code": "1300",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Oil pressure switch / sender indicates insufficient oil pressure and the engine was shut down.",
    "causes": [
     "Low or no engine oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check the engine oil level and add oil per the owner's manual before restarting.",
     "If the level is correct, contact an IASD.",
     "If the unit was never activated, refer to the Activation section of the installation manual."
    ],
    "clear": "Correct oil level, then press OFF, ENTER twice, AUTO."
   },
   {
    "code": "1400-1401",
    "name": "High Temperature",
    "display": "HIGH TEMPERATURE, red LED; unit shuts down during operation",
    "meaning": "Engine or alternator over-temperature shutdown.",
    "causes": [
     "Blocked or obstructed intake, exhaust, or rear of the generator",
     "Excessive ambient heat",
     "Excessive load on the generator"
    ],
    "steps": [
     "Inspect ventilation around the generator, intake, exhaust, and rear of the unit.",
     "Clear any obstruction (grass, leaves, snow, stored items).",
     "Verify the enclosure roof and doors are in place while running.",
     "If no obstructions are found, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO once the unit has cooled."
   },
   {
    "code": "1500-1522",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS, red LED; unit shut down while running, or would not restart",
    "meaning": "Controller lost the engine RPM signal (magnetic pickup / flywheel signal) during a run, or saw no valid RPM signal during cranking.",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring fault",
     "Fuel or ignition fault during the start attempt"
    ],
    "steps": [
     "If it ran and shut down: clear the alarm, remove household loads, put in AUTO and restart.",
     "If it will not start: check the BATTERY MENU - GOOD means call a dealer, CHECK BATTERY means replace the battery.",
     "If it will not restart after clearing, contact an IASD."
    ],
    "clear": "Press OFF, then ENTER twice, then AUTO."
   },
   {
    "code": "1600-1603",
    "name": "Underspeed",
    "display": "UNDERSPEED, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Engine speed below the governed setpoint while running.",
    "causes": [
     "Governor or throttle fault",
     "Stepper motor fault",
     "Fuel pressure / carburetion fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1800-1801",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Output voltage rose above the regulation limit.",
    "causes": [
     "AVR / voltage regulator fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact an IASD. Generac's dealer-call table gives no homeowner step for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "1900-1916",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE, red LED; unit will not start in AUTO with utility loss",
    "meaning": "Sustained generator output undervoltage.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault",
     "Wiring fault"
    ],
    "steps": [
     "Contact an IASD."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2094-2099 / 2098",
    "name": "Wiring Error / Transfer Wire Warning",
    "display": "WIRING ERROR or MISWIRE, red LED",
    "meaning": "The controller detects an incorrect line/neutral, sensing or transfer-switch wiring configuration.",
    "causes": [
     "Incorrect field wiring at the generator or transfer switch",
     "Miswired control or sensing harness"
    ],
    "steps": [
     "Do not attempt to rewire without the install manual's interconnect diagram.",
     "Contact an IASD or the installing dealer."
    ],
    "clear": "Dealer / installer correction required."
   },
   {
    "code": "2100-2103",
    "name": "Overload Remove Load",
    "display": "OVERLOAD REMOVE LOAD or LOW VOLTS REMOVE LOAD, red LED",
    "meaning": "Generator output overloaded during operation; the unit shut down to protect itself.",
    "causes": [
     "Household load exceeds the generator rating",
     "Excessive connected load at start"
    ],
    "steps": [
     "Clear the alarm and remove household loads from the generator.",
     "Put the unit back in AUTO and restart.",
     "If it recurs at normal load, contact an IASD."
    ],
    "clear": "Press OFF, ENTER twice, AUTO after shedding load."
   },
   {
    "code": "2299",
    "name": "Undervoltage Overload",
    "display": "UNDERVOLTAGE OVERLOAD, red LED (Guardian/Evolution table only)",
    "meaning": "Output collapsed under load - listed on Generac's dealer-call table for the Guardian series.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code - only a one-line contact-a-dealer table entry."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2399",
    "name": "Stepper Overcurrent",
    "display": "STEPPER OVERCURRENT, red LED",
    "meaning": "The stepper motor (governor / fuel mixer actuator) drew excess current.",
    "causes": [
     "Cause not detailed in Generac's published documentation - this code appears only as a one-line entry in the Guardian-series dealer-call table"
    ],
    "steps": [
     "Contact an IASD. No dedicated troubleshooting article exists for this code."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "2400",
    "name": "Fuse Problem",
    "display": "FUSE PROBLEM, red LED; unit will not start in AUTO with utility loss",
    "meaning": "The control panel 7.5A ATO fuse is blown or missing.",
    "causes": [
     "Blown or missing 7.5 amp ATO control fuse",
     "Short circuit in the control/cranking circuit"
    ],
    "steps": [
     "Check the 7.5 amp ATO fuse in the control panel.",
     "Replace it with an identical ATO 7.5 amp fuse.",
     "If the fuse keeps blowing, correct the short - contact an IASD.",
     "If the fuse is intact, contact an IASD."
    ],
    "clear": "Replace the fuse, then OFF, ENTER twice, AUTO."
   },
   {
    "code": "2800-2801",
    "name": "Auxiliary / Emergency Shutdown Switch",
    "display": "SHUTDOWN SWITCH, red LED (2800 = on-unit E-stop, 2801 = remote E-stop)",
    "meaning": "A generator emergency (or remote) shutdown switch is open / tripped.",
    "causes": [
     "Emergency shutdown switch left in the OFF / open position",
     "Remote E-stop activated"
    ],
    "steps": [
     "Check the generator emergency shutdown switch(es).",
     "Set the emergency shutdown switch to CLOSED (I)."
    ],
    "clear": "With the switch closed, press OFF, ENTER twice, AUTO."
   },
   {
    "code": "Model Ident Problem - Fix Harness Resistor",
    "name": "Model Ident / Fix Harness Resistor",
    "display": "MODEL IDENT PROBLEM - FIX HARNESS RESISTOR (no numeric code shown)",
    "meaning": "Appears after replacing or installing an Evolution controller if it is powered up in the wrong sequence, or if harness connectors (especially the 20-pin connector under the control panel) are not fully seated.",
    "causes": [
     "Controller powered up out of sequence after replacement",
     "Harness connectors not fully seated"
    ],
    "steps": [
     "Perform a hard reset on the controller.",
     "If the message returns, verify the 20-pin connector on the underside of the control panel is fully seated.",
     "Unplug and firmly reseat harness connectors (do not force); stop and call a dealer if pins are bent, damaged or corroded.",
     "If the controller was just replaced: after the hard-reset power-down steps connect the smaller harness connector (the one with the ID resistor) FIRST, restore power, then connect the larger harness connector."
    ],
    "clear": "Hard reset plus harness reseat procedure - no simple OFF/ENTER/AUTO clear."
   },
   {
    "code": "1048",
    "name": "VSCF Overload",
    "display": "1048 VSCF OVERLOAD",
    "meaning": "Alternator, AVR or wiring damage detected as an overload condition.",
    "causes": [
     "Damaged alternator, AVR or wiring"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1049",
    "name": "VSCF Overload",
    "display": "1049 VSCF OVERLOAD",
    "meaning": "Generator output shorted or severely overloaded.",
    "causes": [
     "Shorted output",
     "Severe overload"
    ],
    "steps": [
     "Identify and clear the overload, then restart."
    ],
    "clear": "Clear the overload, restart"
   },
   {
    "code": "1052",
    "name": "VSCF DC Overvoltage",
    "display": "1052 VSCF DC OVERVOLTAGE",
    "meaning": "Temporary overload or output short.",
    "causes": [
     "Temporary overload",
     "Temporary output short"
    ],
    "steps": [
     "Try to restart the unit."
    ],
    "clear": "Restart"
   },
   {
    "code": "1053",
    "name": "VSCF Gate Fault",
    "display": "1053 VSCF GATE FAULT",
    "meaning": "The AVR is damaged.",
    "causes": [
     "AVR failure"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1054",
    "name": "VSCF IGBT Overtemp.",
    "display": "1054 VSCF IGBT OVERTEMP.",
    "meaning": "AVR IGBT electronics over temperature.",
    "causes": [
     "Dirty AVR filter",
     "Blocked intake / exhaust air path",
     "BIG fan not running",
     "Air leak in the AVR enclosure",
     "Engine running hot",
     "Ambient above 60 F (15.5 C) - derate needed"
    ],
    "steps": [
     "Replace the AVR filter and inspect the fan.",
     "Check the intake and exhaust for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING.",
     "Check the AVR enclosure for air leaks.",
     "Inspect the air intake / exhaust for a hot-running engine.",
     "Derate output per specifications if ambient is high.",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1055",
    "name": "VSCF Phase Error",
    "display": "1055 VSCF PHASE ERROR",
    "meaning": "Incorrect voltage or frequency detected during starting.",
    "causes": [
     "Alternator damage",
     "Generator started into a severe load",
     "Engine not reaching prescribed speed (stepper motor / linkage / gas pressure)"
    ],
    "steps": [
     "Manually transfer back to utility and retry the start.",
     "Remove load and retry.",
     "Verify the stepper motor moves freely and is plugged in.",
     "Verify gas pressure is within specified limits.",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1056",
    "name": "VSCF Undervoltage",
    "display": "1056 VSCF UNDERVOLTAGE",
    "meaning": "Generator output voltage too low.",
    "causes": [
     "Load too large",
     "Alternator or AVR damage"
    ],
    "steps": [
     "Remove load and restart.",
     "Contact a dealer if damage is suspected."
    ],
    "clear": "Remove load / dealer"
   },
   {
    "code": "1057",
    "name": "VSCF Overvoltage",
    "display": "1057 VSCF OVERVOLTAGE",
    "meaning": "Generator overloaded or started into a severe load.",
    "causes": [
     "Overload",
     "Severe starting load"
    ],
    "steps": [
     "Remove load and restart.",
     "Manually transfer to utility and retry if needed."
    ],
    "clear": "Remove load, restart"
   },
   {
    "code": "1058",
    "name": "VSCF DC Undervoltage",
    "display": "1058 VSCF DC UNDERVOLTAGE",
    "meaning": "DPE winding supply voltage too low.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact an Independent Authorized Servicing Dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1059",
    "name": "VSCF Field Loss",
    "display": "1059 VSCF FIELD LOSS",
    "meaning": "No output voltage detected while starting.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1060",
    "name": "Big Fan Failure",
    "display": "1060 BIG FAN FAILURE",
    "meaning": "AVR electronics temperature exceeds 158 F (70 C).",
    "causes": [
     "Faulty AVR filter",
     "Blocked intake / exhaust",
     "Big fan not running",
     "Air leak in the AVR enclosure",
     "Engine running hot",
     "High ambient (over 60 F / 15.6 C) needing derate"
    ],
    "steps": [
     "Replace the AVR filter.",
     "Check the intake and exhaust for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING.",
     "Check the small fan too if the message shows while stopped (the small fan runs 60 min after stop for heat soak).",
     "Contact a dealer if unresolved."
    ],
    "clear": "Dealer after corrective action"
   },
   {
    "code": "1061",
    "name": "VSCF Field Loss",
    "display": "1061 VSCF FIELD LOSS",
    "meaning": "Output voltage lost while running.",
    "causes": [
     "Alternator damage"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "Dealer"
   },
   {
    "code": "1065",
    "name": "Overfrequency",
    "display": "1065 OVERFREQUENCY",
    "meaning": "Output frequency exceeded the limit while running.",
    "causes": [
     "Overload",
     "Failed RPM sensor",
     "Stepper motor problem"
    ],
    "steps": [
     "Remove load and restart.",
     "Contact a dealer if the RPM sensor or stepper motor is suspected."
    ],
    "clear": "Remove load / dealer"
   },
   {
    "code": "1066",
    "name": "VSCF Speed Mismatch",
    "display": "1066 VSCF SPEED MISMATCH",
    "meaning": "Engine speed does not match the commanded output during operation or starting.",
    "causes": [
     "Fuel pressure loss",
     "Large load not wired through the load-shed module",
     "Large overload",
     "Throttle or engine problem"
    ],
    "steps": [
     "Check the fuel supply and restart.",
     "Contact the installing dealer to correct the load-shed wiring.",
     "Remove load and restart.",
     "Contact a dealer for a throttle or engine issue."
    ],
    "clear": "Corrective action per cause"
   },
   {
    "code": "1063",
    "name": "VSCF Mismatch (Error Code 1063)",
    "display": "1063",
    "meaning": "Generac's support article states code 1063 indicates a Variable Speed Constant Frequency (VSCF) mismatch. The article does not name a controller generation; the VSCF alternator system in this catalog is the Synergy / CorePower VSCF platform.",
    "causes": [],
    "steps": [
     "A hard reset can be attempted.",
     "If the issue persists, a certified service technician must inspect the system."
    ],
    "clear": "Hard reset procedure."
   }
  ],
  "warnings": [
   {
    "code": "2750",
    "name": "Low Battery",
    "display": "LOW BATTERY, yellow LED, illuminated in any state",
    "meaning": "Battery voltage below the level needed to reliably crank the engine.",
    "causes": [
     "Weak, sulfated or discharged start battery",
     "Failed battery charger",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU on the control panel.",
     "If it reads CHECK BATTERY, replace the battery.",
     "If it reads GOOD, contact an IASD."
    ],
    "clear": "Resolves once the battery is charged or replaced."
   },
   {
    "code": "2760",
    "name": "Battery Problem",
    "display": "BATTERY PROBLEM, yellow LED",
    "meaning": "The controller cannot properly read or charge the battery.",
    "causes": [
     "Bad battery",
     "Loose or corroded battery cable",
     "Battery sense wiring fault"
    ],
    "steps": [
     "Check the battery via the BATTERY MENU.",
     "Inspect and clean battery terminals and cables.",
     "If the battery reads GOOD, contact an IASD."
    ],
    "clear": "Dealer diagnosis if it persists after a good battery is confirmed."
   },
   {
    "code": "2770",
    "name": "Charger Warning",
    "display": "CHARGER WARNING, yellow LED",
    "meaning": "The integrated smart battery charger reports a fault.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors were not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit neutral and required conductors are landed per the install manual.",
     "Otherwise contact an IASD."
    ],
    "clear": "Corrective wiring or dealer repair."
   },
   {
    "code": "2780",
    "name": "Charger Missing AC",
    "display": "CHARGER MISSING AC, yellow LED",
    "meaning": "The battery charger is not receiving its 120 VAC feed.",
    "causes": [
     "Utility power absent at the charger input",
     "Loose charger AC input wire (T1 / neutral, white sleeve)",
     "On a new install, charger circuit not landed per the install manual"
    ],
    "steps": [
     "Verify utility power is present at the transfer switch.",
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "If utility power is present and wiring is correct, contact an IASD."
    ],
    "clear": "Clears automatically once AC is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR, yellow LED",
    "meaning": "Exercise timer / schedule data became corrupted or was never set.",
    "causes": [
     "Date and time not re-entered after a battery disconnect",
     "Control board memory fault"
    ],
    "steps": [
     "Re-enter the date and time, then re-set the exercise timer from the MAIN MENU."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "USB WARNING",
    "name": "USB Warning",
    "display": "USB WARNING, yellow LED",
    "meaning": "The USB firmware-update port or drive was not recognized.",
    "causes": [
     "Bad USB drive or firmware file"
    ],
    "steps": [
     "Retry the firmware update with a known-good USB drive.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once a valid update completes."
   },
   {
    "code": "DOWNLOAD FAILURE",
    "name": "Download Failure",
    "display": "DOWNLOAD FAILURE, yellow LED",
    "meaning": "A controller firmware / configuration download did not complete.",
    "causes": [
     "Interrupted firmware update",
     "USB or firmware file problem"
    ],
    "steps": [
     "Retry the firmware update.",
     "If it persists, contact an IASD."
    ],
    "clear": "Clears automatically once the update completes."
   },
   {
    "code": "SERVICE A",
    "name": "Service A Due",
    "display": "SERVICE A, yellow LED",
    "meaning": "Scheduled Service A maintenance interval reached.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service A maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "SERVICE B",
    "name": "Service B Due",
    "display": "SERVICE B, yellow LED",
    "meaning": "Scheduled Service B maintenance interval reached (adds air filter and spark plugs).",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform Service B maintenance per the family's service schedule.",
     "Press ENTER to clear once the service is done."
    ],
    "clear": "Press ENTER after the service is performed."
   },
   {
    "code": "INSPECT BATTERY",
    "name": "Inspect Battery",
    "display": "INSPECT BATTERY, yellow LED",
    "meaning": "Periodic battery inspection reminder.",
    "causes": [
     "Inspection interval elapsed"
    ],
    "steps": [
     "Inspect the battery condition, terminals, electrolyte and state of charge.",
     "Press ENTER to clear."
    ],
    "clear": "Press ENTER after the inspection."
   },
   {
    "code": "SEEPROM ABUSE",
    "name": "SEEPROM Abuse",
    "display": "SEEPROM ABUSE (0J9943)",
    "meaning": "Control-board EEPROM write-count / health warning.",
    "causes": [
     "Excessive setting changes / memory wear"
    ],
    "steps": [
     "Contact an IASD if it persists."
    ],
    "clear": "Dealer diagnosis if persistent."
   },
   {
    "code": "FUEL PRESSURE",
    "name": "Fuel Pressure",
    "display": "FUEL PRESSURE (0J9943)",
    "meaning": "Fuel pressure sensor warning.",
    "causes": [
     "Low incoming NG or LP pressure"
    ],
    "steps": [
     "Verify regulator output is 3.5-7 in water column NG / 10-12 in water column LP at the generator inlet.",
     "Contact the gas utility or LP supplier if out of range."
    ],
    "clear": "Clears automatically once pressure is restored."
   },
   {
    "code": "OVERLOAD WARNING / OVERLOAD COOLDOWN",
    "name": "Overload Warning / Overload Cooldown",
    "display": "OVERLOAD WARNING / OVERLOAD COOLDOWN (0J9943)",
    "meaning": "Load is approaching the overload trip point; the unit sheds or cools down before a full Overload alarm.",
    "causes": [
     "Connected load near generator capacity"
    ],
    "steps": [
     "Reduce the connected load."
    ],
    "clear": "Clears automatically once load drops."
   },
   {
    "code": "1051",
    "name": "VSCF High Battery",
    "display": "1051 VSCF HIGH BATTERY",
    "meaning": "Voltage supply to the AVR is high.",
    "causes": [
     "External battery charger mis-installed"
    ],
    "steps": [
     "If an external charger is in use, contact the installing dealer to correct the installation.",
     "If not, contact a servicing dealer."
    ],
    "clear": "Dealer / installer correction"
   },
   {
    "code": "1070",
    "name": "Small Fan Failure",
    "display": "1070 SMALL FAN FAILURE",
    "meaning": "Small (heat-soak) fan current incorrect. If the unit was running in AUTO and utility returns, it continues running up to 1 hour to cool the electronics without the fan.",
    "causes": [
     "Fan wiring or mechanical fault",
     "Blocked air path / dirty AVR filter"
    ],
    "steps": [
     "Contact a dealer for a wiring or mechanical fault.",
     "Check the AVR filter for blockage. KEEP FINGERS AWAY FROM THE FAN HOUSING."
    ],
    "clear": "Dealer after corrective action"
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Generator stalls when large load is supplied",
    "causes": [
     "Total load too big for generator/fuel type",
     "Large load not wired through load-shed module"
    ],
    "fixes": [
     "Contact installing dealer to correct installation/load-shed wiring"
    ]
   },
   {
    "symptom": "Large loads keep getting shed and locked out (Load LED off 30 min)",
    "causes": [
     "Total load too big for generator",
     "Output voltage miscalibrated",
     "Current calibration incorrect"
    ],
    "fixes": [
     "Contact installing dealer for load review",
     "Contact servicing dealer for voltage/current calibration"
    ]
   },
   {
    "symptom": "Generator does not pull full power",
    "causes": [
     "Current calibration incorrect"
    ],
    "fixes": [
     "Contact an Independent Authorized Servicing Dealer"
    ]
   },
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check/reset MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit will not start in AUTO, screen says Not Activated",
    "causes": [
     "Generator never activated by dealer/owner"
    ],
    "fixes": [
     "Refer to Activation section of Owner's Manual"
    ]
   },
   {
    "symptom": "Start delay longer than expected",
    "causes": [
     "Start delay parameter set high (2-1500 sec range)"
    ],
    "fixes": [
     "Contact dealer to adjust start delay"
    ]
   }
  ],
  "installNotes": [
   "VSCF design targets cleaner sine-wave output than a standard brushless alternator; note-for-note fuel pressure/clearance requirements match the standard 20kW Guardian install",
   "Requires functioning BIG fan (engine-driven, cools AVR while running) and SMALL fan (runs up to 60 min after stop for heat-soak cooldown) - do not block airflow",
   "Load-shed module required for large connected loads; installer must wire large loads through it",
   "Clearance: 3 ft (0.91 m) ends/front, 18 in (457 mm) back, 5 ft (1.52 m) top and from operable windows/doors (0K5804)",
   "Required fuel pressure at regulator: 3.5-7 in WC (9-13 mm Hg) NG, 10-12 in WC (19-22 mm Hg) LP (0K5804 p.23 and connection diagram callout)",
   "Ships on composite pad; concrete pad optional per local code",
   "Battery charger integrated into control panel (Smart Charger)"
  ],
  "tips": [
   "The one air-cooled controller in this catalog that shows a NUMERIC code next to the alarm text on the panel ('1048 VSCF Overload'). Ecodes 1048-1070 are transcribed from 0K2502 Table 5-2 p.32-34.",
   "Needs a working BIG fan (engine-driven, cools the AVR while running) and SMALL fan (runs up to 60 minutes after stop for heat soak). Do not block airflow, and replace the AVR filter on schedule - a dirty filter is the listed cause for both 1054 and 1060.",
   "Large connected loads must be wired through the load-shed module or the unit will trip 1066 VSCF Speed Mismatch.",
   "Generac's separate support article for code 1063 also calls it a VSCF mismatch, which points at this platform, but the article does not name a controller - verify before quoting it."
  ],
  "manuals": [
   {
    "title": "Home Standby VSCF Owner's Manual, 20 kW Synergy (item 0K2502)",
    "docType": "owner",
    "seedFile": "generac-synergy-20kw-vscf-owners.pdf"
   },
   {
    "title": "Home Standby VSCF Installation Manual, 20 kW Synergy (item 0K2503)",
    "docType": "install",
    "seedFile": "generac-synergy-20kw-vscf-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2013 20 kW AC HSB VSCF (item 0K3218)",
    "docType": "wiring",
    "seedFile": "generac-synergy-20kw-vscf-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K2502 Table 5-2 p.32-34, Install Manual 0K2503 / 0K9041, wiring 0K3218; base Evolution 1.0 alarm list from 0K5801 Table 6-1. Valve clearance, air filter and spark plug read directly from the 0K2502 spec / Replacement Parts tables; NG fuel pressure conversion (7-13 mm Hg) per 0K2503. Base Evolution 1.0 alarm/warning table added from 0K5801 (0K2502 lists the same protection systems: Controller Fault, Wiring Error, Fuse Problem, Stepper Overcurrent and the rest). The VSCF system uses a large cooling fan plus a small heat-soak fan that runs for 60 minutes after shutdown (0K2502)."
 },
 {
  "id": "gen-guardian-nexus-8",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion / Siemens 8 kW, GH-410 (Nexus)",
  "controller": "Nexus",
  "kw": [
   "8"
  ],
  "engine": "GH-410, 410 cc, 1-cyl OHV, 14.8 HP at 3600 RPM, 8.6:1 compression",
  "fuel": "Dual-fuel carburetor, factory-set to NG, field-convertible to LP vapor per Install Manual",
  "years": "2010-2013",
  "sort": 30,
  "models": [
   {
    "g": "G0058700",
    "digits": "5870",
    "desc": "8KW GH410 GUARD+10C T/SW"
   },
   {
    "g": "G0058701",
    "digits": "5870",
    "desc": "8KW/410 GUARD+10C T/SW"
   },
   {
    "g": "G0058702",
    "digits": "5870",
    "desc": "8KW/410 GUARD+10C T/SW"
   },
   {
    "g": "G0058820",
    "digits": "5882",
    "desc": "8KW GH410 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0058821",
    "digits": "5882",
    "desc": "8KW/410 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0058822",
    "digits": "5882",
    "desc": "8KW/410 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0059080",
    "digits": "5908",
    "desc": "8KW GH410 SMNS-NO T/SW 2010STL"
   },
   {
    "g": "G0059081",
    "digits": "5908",
    "desc": "8KW/410 SMNS-NO T/SW STL"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; sAE 30 above 32F; 10W-30 between 40F and -10F; synthetic 5W-30 at 10F and below (0H8358 Sec 4.3.2)",
   "oilCapacity": "Approx. 1.5 qt including filter",
   "sparkPlug": "RC14YC, gap 0.76 mm (0.030 in)",
   "plugGap": "0.030 in (0.76 mm), GH-410 (0H8358 / 0G8334 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm); rocker jam nut torque 174 in-lb (0H8358 p.26)",
   "battery": "Group 26R, 12V, 350 CCA minimum (8kW-specific; other kW in this era use 525 CCA min)",
   "airFilter": "Generac P/N 0G3332 (2008); 0E9581 shown as 10kW filter in same table - confirm by kW column in doc",
   "fuelPressure": "Natural gas 5-7 in water column; LP vapor 10-12 in water column (0H8358 Sec 5.1).",
   "exercise": "Configurable Weekly/Biweekly/Monthly, runs 5 or 12 minutes depending on model"
  },
  "maintenance": [
   {
    "interval": "Weekly",
    "task": "Inspect enclosure louvers for dirt/debris"
   },
   {
    "interval": "Monthly or 24 hrs continuous run",
    "task": "Check engine oil level"
   },
   {
    "interval": "Monthly",
    "task": "Inspect/clean/tighten battery terminals, remove corrosion"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level"
   },
   {
    "interval": "2 years or 200 hrs (sooner under heavy load/dust/heat)",
    "task": "Change engine oil and oil filter"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Replace air cleaner and spark plug(s)"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Complete tune-up by a Dealer"
   },
   {
    "interval": "After first 6 months",
    "task": "Check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101 / OVERCRANK",
    "name": "Overcrank",
    "display": "OVERCRANK (text on LCD; red LED on V-twin models)",
    "meaning": "Engine failed to start within the specified crank cycle (multiple crank attempts with rest periods).",
    "causes": [
     "Fuel shutoff valve closed",
     "Fuel pressure incorrect",
     "Fouled spark plug(s)",
     "Choke not operating"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "If it does not start or runs rough, contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER twice; rocker-switch panels: rocker to OFF, ENTER twice, rocker back to AUTO."
   },
   {
    "code": "LOW OIL PRESSURE",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE (text; red LED on V-twins)",
    "meaning": "Oil pressure switch (normally-closed contacts held open by oil pressure) closes when pressure drops below approx. 5 PSI. 5 sec delay on start-up, 7 sec delay once running.",
    "causes": [
     "Low or no oil level",
     "Oil pump or switch failure"
    ],
    "steps": [
     "Verify the oil level and top off per the Engine Oil Requirements chart.",
     "Do not restart until the oil level is verified.",
     "If the level is correct, contact an IASD."
    ],
    "clear": "Set AUTO/OFF/MANUAL to OFF (8 kW) or OFF then ENTER (10-20 kW) to unlatch."
   },
   {
    "code": "HIGH TEMPERATURE",
    "name": "High Engine Temperature",
    "display": "HIGH TEMPERATURE (text; auto-reset, red LED)",
    "meaning": "Temperature switch closes at approx. 144 C (293 F). 10 sec start-up delay, 1 sec shutdown delay. Auto-resets and restarts once cool if the start signal is still present.",
    "causes": [
     "Blocked enclosure louvers / ventilation",
     "Excessive ambient heat",
     "Intake or exhaust obstruction"
    ],
    "steps": [
     "Check ventilation around the intake, exhaust and rear of the generator.",
     "Clear any obstruction.",
     "If none is found, contact a dealer."
    ],
    "clear": "Automatic once the temperature drops (Auto Reset)."
   },
   {
    "code": "OVERSPEED",
    "name": "Overspeed",
    "display": "OVERSPEED (text; red LED)",
    "meaning": "Engine exceeds 4320 RPM for 3 seconds or 4500 RPM immediately; protects the generator and appliances from an overspeed output.",
    "causes": [
     "Governor / throttle linkage fault",
     "Stepper motor fault"
    ],
    "steps": [
     "Contact the nearest dealer - no field adjustment is given."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "RPM SENSE LOSS",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS (text; red LED)",
    "meaning": "No valid RPM signal within 3 sec of cranking (locks out), or RPM signal lost for 1 sec while running (re-cranks once after a 15 sec wait, then latches if lost again).",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring"
    ],
    "steps": [
     "Clear the alarm, then check the BATTERY MENU on the control panel.",
     "If it states the battery is GOOD, contact a dealer; if CHECK BATTERY, replace the battery."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "UNDER-FREQUENCY (text; red LED, 2008-2010 Nexus)",
    "meaning": "Generator runs below the 50 Hz setpoint for more than 30 seconds after starting and shuts down.",
    "causes": [
     "Overload",
     "Governor or carburetor fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDERVOLTAGE",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Generator output voltage falls below 60 percent of nominal for more than 5 seconds.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "OVERVOLTAGE",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Output rises above 110 percent of rating for more than 3 sec, or above 130 percent for more than 0.2 sec.",
    "causes": [
     "AVR fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "INTERNAL FAULT (text; red LED)",
    "meaning": "The control board self-detected an internal failure.",
    "causes": [
     "Control board fault"
    ],
    "steps": [
     "Cannot be cleared by the owner - call a service dealer."
    ],
    "clear": "Dealer only."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY (yellow LED on V-twins)",
    "meaning": "Battery voltage below 11.0 V (2008 doc) / 11.9 V (2010 doc) for 1 minute; not monitored during crank.",
    "causes": [
     "Weak or failing battery",
     "Charger not maintaining the battery"
    ],
    "steps": [
     "Inspect and clean battery terminals and cables.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once voltage rises above 11.0-12.4 V (doc-dependent)."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR",
    "meaning": "Exercise period / schedule data became corrupted.",
    "causes": [
     "Battery disconnected while setting the timer",
     "Control board memory fault"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Maintenance due (yellow LED on 16-20 kW)",
    "meaning": "A maintenance interval counter has expired.",
    "causes": [
     "Scheduled maintenance interval reached"
    ],
    "steps": [
     "Perform the due maintenance, then press ENTER to confirm the reset."
    ],
    "clear": "ENTER after confirming the maintenance was performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Contact dealer for contactor/starter"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid",
     "Open wire #14 from engine control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Clean, re-gap or replace plugs",
     "Reset valve lash",
     "Verify choke plate moves freely",
     "Contact dealer for solenoid/wiring"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plugs",
     "Confirm fuel pressure to regulator is 10-12 in WC (0.36-0.43 psi) LP / 5-7 in WC (0.18-0.25 psi) NG",
     "Move fuel selector to correct position",
     "Free the choke plate"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set OFF but engine keeps running",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Contact dealer if internal failure"
    ]
   },
   {
    "symptom": "No transfer to standby after utility loss",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Open transfer relay circuit",
     "Defective control logic board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use correct oil per Engine Oil Requirements",
     "Check for oil leaks",
     "Contact dealer for breather"
    ]
   }
  ],
  "installNotes": [
   "Clearance from ends/front of generator: 3 ft (0.91 m) minimum, including shrubs/trees; back of generator: 18 in (457 mm) minimum; top clearance to any structure/overhang: 5 ft (1.52 m) minimum (0K5804, same layout used across era)",
   "No operable windows/door openings within 5 ft (1.52 m) of the unit",
   "Ships on a composite pad; concrete pad may be substituted per local code",
   "Fuel pressure to regulator per Owner's Manual: 5-7 in WC NG, 10-12 in WC LP (0H8358 Sec 5.1)",
   "Battery charger integrated into control panel as a Smart Charger",
   "8kW alarm/warning presentation is text-only on the LCD, red/yellow external LEDs on V-twin (10kW+) models; the 8kW single-cylinder panel has no external LED"
  ],
  "tips": [
   "The 8 kW single-cylinder panel has NO external LED - you have to open the lid and read the LCD.",
   "G0058701, G0058702, G0058821, G0058822 and G0059081 have no owner's or install manual of their own in Generac's catalog; their specs are inherited from G0058700 / G0058820 / G0059080.",
   "G0059080 / G0059081 are the Siemens-badged builds of the same GH-410 platform."
  ],
  "manuals": [
   {
    "title": "2010 HSB Air-Cooled Owner's Manual, 8-20 kW Nexus (item 0H8358)",
    "docType": "owner",
    "seedFile": "generac-nexus-2010-aircooled-owners.pdf"
   },
   {
    "title": "2010 HSB Installation Guide (item 0H8538)",
    "docType": "install",
    "seedFile": "generac-nexus-2010-install-guide.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 8 kW 2010 Air-Cooled HSB (item 0H6912)",
    "docType": "wiring",
    "seedFile": "generac-nexus-8kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0H8358 p.21-22, Install Manual 0H8538 / 0G8280, Owner's Manual 0G8334 Sec 3.6, wiring 0H6912. Owner's Manual 0H8358 (2010) with 2011 continuation SKUs G0058701/702/821/822/059081 that have no dedicated owner or install manual in the catalog. Generac's own article dates the Nexus panel to units manufactured 2010-2013 and calls anything before 2010 pre-Nexus."
 },
 {
  "id": "gen-guardian-nexus-10-11",
  "series": "Guardian / Centurion",
  "family": "Centurion / Guardian 10 kW, GT-530 (Nexus)",
  "controller": "Nexus",
  "kw": [
   "10"
  ],
  "engine": "GT-530, 530 cc, 2 cylinder V-twin, 18 HP @3600 RPM, 9.5:1 compression",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2010-2013",
  "sort": 30,
  "models": [
   {
    "g": "G0058920",
    "digits": "5892",
    "desc": "10KW GT530 CENT+12C T/SW"
   },
   {
    "g": "G0058921",
    "digits": "5892",
    "desc": "10KW/530 CENT+12C T/SW"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; sAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart (same as 8kW) (0H8358 Sec 4.3.2)",
   "oilCapacity": "Approx. 1.7 qt including filter",
   "sparkPlug": "BPR6HS, gap 0.76 mm (0.030 in)",
   "plugGap": "0.030 in (0.76 mm), GT-530 (0H8358 / 0G8334 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm); jam nut torque 174 in-lb",
   "battery": "Group 26R, 12V, 525 CCA minimum",
   "airFilter": "Generac P/N 0E9581 (2008 table)",
   "fuelPressure": "Natural gas 5-7 in water column; LP vapor 10-12 in water column (0H8358 Sec 5.1).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "2 years or 200 hrs",
    "task": "Change oil/filter, replace air cleaner and spark plugs"
   },
   {
    "interval": "Monthly/Weekly/6-monthly",
    "task": "Same schedule as 8kW Nexus family (louvers, oil level, battery checks)"
   },
   {
    "interval": "Weekly",
    "task": "Inspect enclosure louvers for dirt/debris"
   },
   {
    "interval": "Monthly or 24 hrs continuous run",
    "task": "Check engine oil level"
   },
   {
    "interval": "Monthly",
    "task": "Inspect/clean/tighten battery terminals, remove corrosion"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level"
   },
   {
    "interval": "2 years or 200 hrs (sooner under heavy load/dust/heat)",
    "task": "Change engine oil and oil filter"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Replace air cleaner and spark plug(s)"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Complete tune-up by a Dealer"
   },
   {
    "interval": "After first 6 months",
    "task": "Check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101 / OVERCRANK",
    "name": "Overcrank",
    "display": "OVERCRANK (text on LCD; red LED on V-twin models)",
    "meaning": "Engine failed to start within the specified crank cycle (multiple crank attempts with rest periods).",
    "causes": [
     "Fuel shutoff valve closed",
     "Fuel pressure incorrect",
     "Fouled spark plug(s)",
     "Choke not operating"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "If it does not start or runs rough, contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER twice; rocker-switch panels: rocker to OFF, ENTER twice, rocker back to AUTO."
   },
   {
    "code": "LOW OIL PRESSURE",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE (text; red LED on V-twins)",
    "meaning": "Oil pressure switch (normally-closed contacts held open by oil pressure) closes when pressure drops below approx. 5 PSI. 5 sec delay on start-up, 7 sec delay once running.",
    "causes": [
     "Low or no oil level",
     "Oil pump or switch failure"
    ],
    "steps": [
     "Verify the oil level and top off per the Engine Oil Requirements chart.",
     "Do not restart until the oil level is verified.",
     "If the level is correct, contact an IASD."
    ],
    "clear": "Set AUTO/OFF/MANUAL to OFF (8 kW) or OFF then ENTER (10-20 kW) to unlatch."
   },
   {
    "code": "HIGH TEMPERATURE",
    "name": "High Engine Temperature",
    "display": "HIGH TEMPERATURE (text; auto-reset, red LED)",
    "meaning": "Temperature switch closes at approx. 144 C (293 F). 10 sec start-up delay, 1 sec shutdown delay. Auto-resets and restarts once cool if the start signal is still present.",
    "causes": [
     "Blocked enclosure louvers / ventilation",
     "Excessive ambient heat",
     "Intake or exhaust obstruction"
    ],
    "steps": [
     "Check ventilation around the intake, exhaust and rear of the generator.",
     "Clear any obstruction.",
     "If none is found, contact a dealer."
    ],
    "clear": "Automatic once the temperature drops (Auto Reset)."
   },
   {
    "code": "OVERSPEED",
    "name": "Overspeed",
    "display": "OVERSPEED (text; red LED)",
    "meaning": "Engine exceeds 4320 RPM for 3 seconds or 4500 RPM immediately; protects the generator and appliances from an overspeed output.",
    "causes": [
     "Governor / throttle linkage fault",
     "Stepper motor fault"
    ],
    "steps": [
     "Contact the nearest dealer - no field adjustment is given."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "RPM SENSE LOSS",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS (text; red LED)",
    "meaning": "No valid RPM signal within 3 sec of cranking (locks out), or RPM signal lost for 1 sec while running (re-cranks once after a 15 sec wait, then latches if lost again).",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring"
    ],
    "steps": [
     "Clear the alarm, then check the BATTERY MENU on the control panel.",
     "If it states the battery is GOOD, contact a dealer; if CHECK BATTERY, replace the battery."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "UNDER-FREQUENCY (text; red LED, 2008-2010 Nexus)",
    "meaning": "Generator runs below the 50 Hz setpoint for more than 30 seconds after starting and shuts down.",
    "causes": [
     "Overload",
     "Governor or carburetor fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDERVOLTAGE",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Generator output voltage falls below 60 percent of nominal for more than 5 seconds.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "OVERVOLTAGE",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Output rises above 110 percent of rating for more than 3 sec, or above 130 percent for more than 0.2 sec.",
    "causes": [
     "AVR fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "INTERNAL FAULT (text; red LED)",
    "meaning": "The control board self-detected an internal failure.",
    "causes": [
     "Control board fault"
    ],
    "steps": [
     "Cannot be cleared by the owner - call a service dealer."
    ],
    "clear": "Dealer only."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY (yellow LED on V-twins)",
    "meaning": "Battery voltage below 11.0 V (2008 doc) / 11.9 V (2010 doc) for 1 minute; not monitored during crank.",
    "causes": [
     "Weak or failing battery",
     "Charger not maintaining the battery"
    ],
    "steps": [
     "Inspect and clean battery terminals and cables.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once voltage rises above 11.0-12.4 V (doc-dependent)."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR",
    "meaning": "Exercise period / schedule data became corrupted.",
    "causes": [
     "Battery disconnected while setting the timer",
     "Control board memory fault"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Maintenance due (yellow LED on 16-20 kW)",
    "meaning": "A maintenance interval counter has expired.",
    "causes": [
     "Scheduled maintenance interval reached"
    ],
    "steps": [
     "Perform the due maintenance, then press ENTER to confirm the reset."
    ],
    "clear": "ENTER after confirming the maintenance was performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Contact dealer for contactor/starter"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid",
     "Open wire #14 from engine control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Clean, re-gap or replace plugs",
     "Reset valve lash",
     "Verify choke plate moves freely",
     "Contact dealer for solenoid/wiring"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plugs",
     "Confirm fuel pressure to regulator is 10-12 in WC (0.36-0.43 psi) LP / 5-7 in WC (0.18-0.25 psi) NG",
     "Move fuel selector to correct position",
     "Free the choke plate"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set OFF but engine keeps running",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Contact dealer if internal failure"
    ]
   },
   {
    "symptom": "No transfer to standby after utility loss",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Open transfer relay circuit",
     "Defective control logic board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use correct oil per Engine Oil Requirements",
     "Check for oil leaks",
     "Contact dealer for breather"
    ]
   }
  ],
  "installNotes": [
   "V-twin models (10kW+) have external red/yellow Alarm/Warning LEDs; 8kW single-cylinder does not",
   "Clearance from ends/front of generator: 3 ft (0.91 m) minimum, including shrubs/trees; back of generator: 18 in (457 mm) minimum; top clearance to any structure/overhang: 5 ft (1.52 m) minimum (0K5804, same layout used across era)",
   "No operable windows/door openings within 5 ft (1.52 m) of the unit",
   "Ships on a composite pad; concrete pad may be substituted per local code",
   "Fuel pressure to regulator per Owner's Manual: 5-7 in WC NG, 10-12 in WC LP (0H8358 Sec 5.1)",
   "Battery charger integrated into control panel as a Smart Charger",
   "8kW alarm/warning presentation is text-only on the LCD, red/yellow external LEDs on V-twin (10kW+) models; the 8kW single-cylinder panel has no external LED"
  ],
  "tips": [
   "V-twin models (10 kW and up) have external red Alarm / yellow Warning LEDs visible without opening the lid.",
   "G0058921 has no owner's or install manual of its own; grouped with G0058920."
  ],
  "manuals": [
   {
    "title": "2010 HSB Air-Cooled Owner's Manual, 8-20 kW Nexus (item 0H8358)",
    "docType": "owner",
    "seedFile": "generac-nexus-2010-aircooled-owners.pdf"
   },
   {
    "title": "2010 HSB Installation Guide (item 0H8538)",
    "docType": "install",
    "seedFile": "generac-nexus-2010-install-guide.pdf"
   },
   {
    "title": "Wiring Diagram, 10 kW 2008 Air-Cooled (item 0G7946)",
    "docType": "wiring",
    "seedFile": "generac-2008-10kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0H8358 p.21-22, Install Manual 0H8538 / 0G8280, wiring 0G7946. G0058260 removed - 2008-series docs only (0G8334 / 0G8280 / 0G7946). Generac dates the Nexus panel to units manufactured 2010-2013; anything before 2010 is pre-Nexus."
 },
 {
  "id": "gen-guardian-nexus-12-17",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion / Honeywell 12-17 kW, GT-990 (Nexus)",
  "controller": "Nexus",
  "kw": [
   "12",
   "13",
   "16",
   "17"
  ],
  "engine": "GT-990, 992 cc, 2 cylinder V-twin, 32 HP @3600 RPM, 9.5:1 compression",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2010-2013",
  "sort": 30,
  "models": [
   {
    "g": "G0058730",
    "digits": "5873",
    "desc": "17KW GT990 GUARD+16C T/SW"
   },
   {
    "g": "G0058731",
    "digits": "5873",
    "desc": "17KW/990 GUARD+16C T/SW"
   },
   {
    "g": "G0058740",
    "digits": "5874",
    "desc": "17KW GT990 GUARD+16C T/SW AL"
   },
   {
    "g": "G0058850",
    "digits": "5885",
    "desc": "17KW GT990 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0058851",
    "digits": "5885",
    "desc": "17KW/990 GRD/GEN-NO T/SW"
   },
   {
    "g": "G0058930",
    "digits": "5893",
    "desc": "13KW GT990 CENT+14C T/SW"
   },
   {
    "g": "G0058931",
    "digits": "5893",
    "desc": "13KW/990 CENT+14C T/SW"
   },
   {
    "g": "G0058950",
    "digits": "5895",
    "desc": "16KW GT990 CENT+16C T/SW AL"
   },
   {
    "g": "G0060540",
    "digits": "6054",
    "desc": "12KW GT990 HNYWL + 100A NSE"
   },
   {
    "g": "G0060541",
    "digits": "6054",
    "desc": "12KW/990 HNYWL+100A NSE"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; sAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart (0H8358 Sec 4.3.2)",
   "oilCapacity": "Approx. 1.7-1.9 qt including filter (1.7 qt per 0G8334 2008 table; 1.9 qt per 0H8358 2010 table)",
   "sparkPlug": "RC14YC, gap 1.02 mm (0.040 in)",
   "plugGap": "0.040 in (1.02 mm), GT-990 (0H8358 / 0G8334 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm); jam nut torque 174 in-lb",
   "battery": "Group 26R, 12V, 525 CCA minimum",
   "airFilter": "Generac P/N 0C8127 (2008 table)",
   "fuelPressure": "Natural gas 5-7 in water column; LP vapor 10-12 in water column (0H8358 Sec 5.1).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "2 years or 200 hrs",
    "task": "Change oil/filter, replace air cleaner and spark plugs, dealer tune-up"
   },
   {
    "interval": "Weekly",
    "task": "Inspect enclosure louvers for dirt/debris"
   },
   {
    "interval": "Monthly or 24 hrs continuous run",
    "task": "Check engine oil level"
   },
   {
    "interval": "Monthly",
    "task": "Inspect/clean/tighten battery terminals, remove corrosion"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level"
   },
   {
    "interval": "2 years or 200 hrs (sooner under heavy load/dust/heat)",
    "task": "Change engine oil and oil filter"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Replace air cleaner and spark plug(s)"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Complete tune-up by a Dealer"
   },
   {
    "interval": "After first 6 months",
    "task": "Check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101 / OVERCRANK",
    "name": "Overcrank",
    "display": "OVERCRANK (text on LCD; red LED on V-twin models)",
    "meaning": "Engine failed to start within the specified crank cycle (multiple crank attempts with rest periods).",
    "causes": [
     "Fuel shutoff valve closed",
     "Fuel pressure incorrect",
     "Fouled spark plug(s)",
     "Choke not operating"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "If it does not start or runs rough, contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER twice; rocker-switch panels: rocker to OFF, ENTER twice, rocker back to AUTO."
   },
   {
    "code": "LOW OIL PRESSURE",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE (text; red LED on V-twins)",
    "meaning": "Oil pressure switch (normally-closed contacts held open by oil pressure) closes when pressure drops below approx. 5 PSI. 5 sec delay on start-up, 7 sec delay once running.",
    "causes": [
     "Low or no oil level",
     "Oil pump or switch failure"
    ],
    "steps": [
     "Verify the oil level and top off per the Engine Oil Requirements chart.",
     "Do not restart until the oil level is verified.",
     "If the level is correct, contact an IASD."
    ],
    "clear": "Set AUTO/OFF/MANUAL to OFF (8 kW) or OFF then ENTER (10-20 kW) to unlatch."
   },
   {
    "code": "HIGH TEMPERATURE",
    "name": "High Engine Temperature",
    "display": "HIGH TEMPERATURE (text; auto-reset, red LED)",
    "meaning": "Temperature switch closes at approx. 144 C (293 F). 10 sec start-up delay, 1 sec shutdown delay. Auto-resets and restarts once cool if the start signal is still present.",
    "causes": [
     "Blocked enclosure louvers / ventilation",
     "Excessive ambient heat",
     "Intake or exhaust obstruction"
    ],
    "steps": [
     "Check ventilation around the intake, exhaust and rear of the generator.",
     "Clear any obstruction.",
     "If none is found, contact a dealer."
    ],
    "clear": "Automatic once the temperature drops (Auto Reset)."
   },
   {
    "code": "OVERSPEED",
    "name": "Overspeed",
    "display": "OVERSPEED (text; red LED)",
    "meaning": "Engine exceeds 4320 RPM for 3 seconds or 4500 RPM immediately; protects the generator and appliances from an overspeed output.",
    "causes": [
     "Governor / throttle linkage fault",
     "Stepper motor fault"
    ],
    "steps": [
     "Contact the nearest dealer - no field adjustment is given."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "RPM SENSE LOSS",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS (text; red LED)",
    "meaning": "No valid RPM signal within 3 sec of cranking (locks out), or RPM signal lost for 1 sec while running (re-cranks once after a 15 sec wait, then latches if lost again).",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring"
    ],
    "steps": [
     "Clear the alarm, then check the BATTERY MENU on the control panel.",
     "If it states the battery is GOOD, contact a dealer; if CHECK BATTERY, replace the battery."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "UNDER-FREQUENCY (text; red LED, 2008-2010 Nexus)",
    "meaning": "Generator runs below the 50 Hz setpoint for more than 30 seconds after starting and shuts down.",
    "causes": [
     "Overload",
     "Governor or carburetor fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDERVOLTAGE",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Generator output voltage falls below 60 percent of nominal for more than 5 seconds.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "OVERVOLTAGE",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Output rises above 110 percent of rating for more than 3 sec, or above 130 percent for more than 0.2 sec.",
    "causes": [
     "AVR fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "INTERNAL FAULT (text; red LED)",
    "meaning": "The control board self-detected an internal failure.",
    "causes": [
     "Control board fault"
    ],
    "steps": [
     "Cannot be cleared by the owner - call a service dealer."
    ],
    "clear": "Dealer only."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY (yellow LED on V-twins)",
    "meaning": "Battery voltage below 11.0 V (2008 doc) / 11.9 V (2010 doc) for 1 minute; not monitored during crank.",
    "causes": [
     "Weak or failing battery",
     "Charger not maintaining the battery"
    ],
    "steps": [
     "Inspect and clean battery terminals and cables.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once voltage rises above 11.0-12.4 V (doc-dependent)."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR",
    "meaning": "Exercise period / schedule data became corrupted.",
    "causes": [
     "Battery disconnected while setting the timer",
     "Control board memory fault"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Maintenance due (yellow LED on 16-20 kW)",
    "meaning": "A maintenance interval counter has expired.",
    "causes": [
     "Scheduled maintenance interval reached"
    ],
    "steps": [
     "Perform the due maintenance, then press ENTER to confirm the reset."
    ],
    "clear": "ENTER after confirming the maintenance was performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Contact dealer for contactor/starter"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid",
     "Open wire #14 from engine control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Clean, re-gap or replace plugs",
     "Reset valve lash",
     "Verify choke plate moves freely",
     "Contact dealer for solenoid/wiring"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plugs",
     "Confirm fuel pressure to regulator is 10-12 in WC (0.36-0.43 psi) LP / 5-7 in WC (0.18-0.25 psi) NG",
     "Move fuel selector to correct position",
     "Free the choke plate"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set OFF but engine keeps running",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Contact dealer if internal failure"
    ]
   },
   {
    "symptom": "No transfer to standby after utility loss",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Open transfer relay circuit",
     "Defective control logic board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use correct oil per Engine Oil Requirements",
     "Check for oil leaks",
     "Contact dealer for breather"
    ]
   }
  ],
  "installNotes": [
   "Circuits: main breaker sized 50-65A depending on kW (0H8358 spec table)",
   "Clearance from ends/front of generator: 3 ft (0.91 m) minimum, including shrubs/trees; back of generator: 18 in (457 mm) minimum; top clearance to any structure/overhang: 5 ft (1.52 m) minimum (0K5804, same layout used across era)",
   "No operable windows/door openings within 5 ft (1.52 m) of the unit",
   "Ships on a composite pad; concrete pad may be substituted per local code",
   "Fuel pressure to regulator per Owner's Manual: 5-7 in WC NG, 10-12 in WC LP (0H8358 Sec 5.1)",
   "Battery charger integrated into control panel as a Smart Charger",
   "8kW alarm/warning presentation is text-only on the LCD, red/yellow external LEDs on V-twin (10kW+) models; the 8kW single-cylinder panel has no external LED"
  ],
  "tips": [
   "The 2008 lineup was 12/14/16/17 kW (0G8334); by 2010 13 kW replaced 12 kW (0H8358), except the Honeywell 12 kW (G0060540 / G0060541) which stayed in the catalog.",
   "Oil capacity is quoted differently between printings: 1.7 qt in the 2008 table (0G8334), 1.9 qt in the 2010 table (0H8358).",
   "G0058731, G0058851 and G0058931 have no owner's or install manual of their own; grouped with their siblings.",
   "Main breaker is sized 50-65A depending on kW (0H8358 spec table)."
  ],
  "manuals": [
   {
    "title": "2010 HSB Air-Cooled Owner's Manual, 8-20 kW Nexus (item 0H8358)",
    "docType": "owner",
    "seedFile": "generac-nexus-2010-aircooled-owners.pdf"
   },
   {
    "title": "2010 HSB Installation Guide (item 0H8538)",
    "docType": "install",
    "seedFile": "generac-nexus-2010-install-guide.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 10-12/14 kW Air-Cooled HSB (item 0H7358)",
    "docType": "wiring",
    "seedFile": "generac-nexus-10-14kw-wiring.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 15/17 kW 2010 Air-Cooled HSB (item 0H6198)",
    "docType": "wiring",
    "seedFile": "generac-nexus-15-17kw-wiring.pdf"
   },
   {
    "title": "HSB Owner's Manual, Honeywell badge (item 0J5181)",
    "docType": "owner",
    "seedFile": "generac-nexus-honeywell-owners.pdf"
   },
   {
    "title": "2011 HSB Owner's Manual, Honeywell badge (item 0J4784)",
    "docType": "owner",
    "seedFile": "generac-nexus-2011-honeywell-owners.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0H8358 p.21-22 and 0G8334 Sec 3.6, Install Manual 0H8538, Honeywell badge 0J5181 / 0J5180, wiring 0H7358 / 0H6198. G0060541 moved here from the Evolution 1.0 13-17 kW family: its only owner manuals are 0J4784 'MANUAL 2011 HSB HONEYWELL' (a Nexus-controller document) and 0J3075, with install guide 0J4875. The 2008 lineup was 12/14/16/17 kW per 0G8334; 13 kW replaced 12 kW by 2010 per 0H8358, except the Honeywell 12 kW G0060540 / G0060541, which persisted. Generac dates the Nexus panel to units manufactured 2010-2013."
 },
 {
  "id": "gen-guardian-nexus-20",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion / Eaton 20 kW, GT-999 (Nexus)",
  "controller": "Nexus",
  "kw": [
   "20"
  ],
  "engine": "GT-999, 999 cc, 2 cylinder V-twin, 36 HP @3600 RPM, 9.5:1 compression",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2010-2013",
  "sort": 30,
  "models": [
   {
    "g": "G0058750",
    "digits": "5875",
    "desc": "20KW GT999 GUARD+ 200A SE"
   },
   {
    "g": "G0058751",
    "digits": "5875",
    "desc": "20KW/999 GUARD+ 200A SE AL"
   },
   {
    "g": "G0058870",
    "digits": "5887",
    "desc": "20KW GT999 GRD/GEN-NO T/SW AL"
   },
   {
    "g": "G0058871",
    "digits": "5887",
    "desc": "20KW/999 GRD/GEN-NO T/S AL"
   },
   {
    "g": "G0058960",
    "digits": "5896",
    "desc": "20KW GT999 CENT+200A SE"
   },
   {
    "g": "G0058961",
    "digits": "5896",
    "desc": "20KW/999 CENT+200A SE"
   },
   {
    "g": "G0059240",
    "digits": "5924",
    "desc": "20KW GT999 EATON NO T/SW AL"
   },
   {
    "g": "G0059241",
    "digits": "5924",
    "desc": "20KW/999 EATON NO T/SW AL"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; sAE 30 / 10W-30 / synthetic 5W-30 per ambient temp chart (0H8358 Sec 4.3.2)",
   "oilCapacity": "Approx. 1.9 qt including filter",
   "sparkPlug": "RC12YC, gap 0.76 mm (0.030 in)",
   "plugGap": "0.030 in (0.76 mm), GT-999 (0H8358 / 0G8334 engine spec table)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm); jam nut torque 174 in-lb",
   "battery": "Group 26R, 12V, 525 CCA minimum",
   "airFilter": "Generac P/N 0G5894 (2008 table)",
   "fuelPressure": "Natural gas 5-7 in water column; LP vapor 10-12 in water column (0H8358 Sec 5.1).",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "2 years or 200 hrs",
    "task": "Change oil/filter, replace air cleaner and spark plugs, dealer tune-up"
   },
   {
    "interval": "Weekly",
    "task": "Inspect enclosure louvers for dirt/debris"
   },
   {
    "interval": "Monthly or 24 hrs continuous run",
    "task": "Check engine oil level"
   },
   {
    "interval": "Monthly",
    "task": "Inspect/clean/tighten battery terminals, remove corrosion"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level"
   },
   {
    "interval": "2 years or 200 hrs (sooner under heavy load/dust/heat)",
    "task": "Change engine oil and oil filter"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Replace air cleaner and spark plug(s)"
   },
   {
    "interval": "2 years or 200 hrs",
    "task": "Complete tune-up by a Dealer"
   },
   {
    "interval": "After first 6 months",
    "task": "Check/adjust valve clearance"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101 / OVERCRANK",
    "name": "Overcrank",
    "display": "OVERCRANK (text on LCD; red LED on V-twin models)",
    "meaning": "Engine failed to start within the specified crank cycle (multiple crank attempts with rest periods).",
    "causes": [
     "Fuel shutoff valve closed",
     "Fuel pressure incorrect",
     "Fouled spark plug(s)",
     "Choke not operating"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "If it does not start or runs rough, contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER twice; rocker-switch panels: rocker to OFF, ENTER twice, rocker back to AUTO."
   },
   {
    "code": "LOW OIL PRESSURE",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE (text; red LED on V-twins)",
    "meaning": "Oil pressure switch (normally-closed contacts held open by oil pressure) closes when pressure drops below approx. 5 PSI. 5 sec delay on start-up, 7 sec delay once running.",
    "causes": [
     "Low or no oil level",
     "Oil pump or switch failure"
    ],
    "steps": [
     "Verify the oil level and top off per the Engine Oil Requirements chart.",
     "Do not restart until the oil level is verified.",
     "If the level is correct, contact an IASD."
    ],
    "clear": "Set AUTO/OFF/MANUAL to OFF (8 kW) or OFF then ENTER (10-20 kW) to unlatch."
   },
   {
    "code": "HIGH TEMPERATURE",
    "name": "High Engine Temperature",
    "display": "HIGH TEMPERATURE (text; auto-reset, red LED)",
    "meaning": "Temperature switch closes at approx. 144 C (293 F). 10 sec start-up delay, 1 sec shutdown delay. Auto-resets and restarts once cool if the start signal is still present.",
    "causes": [
     "Blocked enclosure louvers / ventilation",
     "Excessive ambient heat",
     "Intake or exhaust obstruction"
    ],
    "steps": [
     "Check ventilation around the intake, exhaust and rear of the generator.",
     "Clear any obstruction.",
     "If none is found, contact a dealer."
    ],
    "clear": "Automatic once the temperature drops (Auto Reset)."
   },
   {
    "code": "OVERSPEED",
    "name": "Overspeed",
    "display": "OVERSPEED (text; red LED)",
    "meaning": "Engine exceeds 4320 RPM for 3 seconds or 4500 RPM immediately; protects the generator and appliances from an overspeed output.",
    "causes": [
     "Governor / throttle linkage fault",
     "Stepper motor fault"
    ],
    "steps": [
     "Contact the nearest dealer - no field adjustment is given."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "RPM SENSE LOSS",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS (text; red LED)",
    "meaning": "No valid RPM signal within 3 sec of cranking (locks out), or RPM signal lost for 1 sec while running (re-cranks once after a 15 sec wait, then latches if lost again).",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring"
    ],
    "steps": [
     "Clear the alarm, then check the BATTERY MENU on the control panel.",
     "If it states the battery is GOOD, contact a dealer; if CHECK BATTERY, replace the battery."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "UNDER-FREQUENCY (text; red LED, 2008-2010 Nexus)",
    "meaning": "Generator runs below the 50 Hz setpoint for more than 30 seconds after starting and shuts down.",
    "causes": [
     "Overload",
     "Governor or carburetor fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDERVOLTAGE",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Generator output voltage falls below 60 percent of nominal for more than 5 seconds.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "OVERVOLTAGE",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Output rises above 110 percent of rating for more than 3 sec, or above 130 percent for more than 0.2 sec.",
    "causes": [
     "AVR fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "INTERNAL FAULT (text; red LED)",
    "meaning": "The control board self-detected an internal failure.",
    "causes": [
     "Control board fault"
    ],
    "steps": [
     "Cannot be cleared by the owner - call a service dealer."
    ],
    "clear": "Dealer only."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY (yellow LED on V-twins)",
    "meaning": "Battery voltage below 11.0 V (2008 doc) / 11.9 V (2010 doc) for 1 minute; not monitored during crank.",
    "causes": [
     "Weak or failing battery",
     "Charger not maintaining the battery"
    ],
    "steps": [
     "Inspect and clean battery terminals and cables.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once voltage rises above 11.0-12.4 V (doc-dependent)."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR",
    "meaning": "Exercise period / schedule data became corrupted.",
    "causes": [
     "Battery disconnected while setting the timer",
     "Control board memory fault"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Maintenance due (yellow LED on 16-20 kW)",
    "meaning": "A maintenance interval counter has expired.",
    "causes": [
     "Scheduled maintenance interval reached"
    ],
    "steps": [
     "Perform the due maintenance, then press ENTER to confirm the reset."
    ],
    "clear": "ENTER after confirming the maintenance was performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Contact dealer for contactor/starter"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid",
     "Open wire #14 from engine control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Clean, re-gap or replace plugs",
     "Reset valve lash",
     "Verify choke plate moves freely",
     "Contact dealer for solenoid/wiring"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plugs",
     "Confirm fuel pressure to regulator is 10-12 in WC (0.36-0.43 psi) LP / 5-7 in WC (0.18-0.25 psi) NG",
     "Move fuel selector to correct position",
     "Free the choke plate"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set OFF but engine keeps running",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Contact dealer if internal failure"
    ]
   },
   {
    "symptom": "No transfer to standby after utility loss",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Open transfer relay circuit",
     "Defective control logic board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use correct oil per Engine Oil Requirements",
     "Check for oil leaks",
     "Contact dealer for breather"
    ]
   }
  ],
  "installNotes": [
   "100A main circuit breaker, largest breaker in the Nexus-era air-cooled line",
   "Clearance from ends/front of generator: 3 ft (0.91 m) minimum, including shrubs/trees; back of generator: 18 in (457 mm) minimum; top clearance to any structure/overhang: 5 ft (1.52 m) minimum (0K5804, same layout used across era)",
   "No operable windows/door openings within 5 ft (1.52 m) of the unit",
   "Ships on a composite pad; concrete pad may be substituted per local code",
   "Fuel pressure to regulator per Owner's Manual: 5-7 in WC NG, 10-12 in WC LP (0H8358 Sec 5.1)",
   "Battery charger integrated into control panel as a Smart Charger",
   "8kW alarm/warning presentation is text-only on the LCD, red/yellow external LEDs on V-twin (10kW+) models; the 8kW single-cylinder panel has no external LED"
  ],
  "tips": [
   "100A main circuit breaker - the largest in the Nexus-era air-cooled line.",
   "G0058751, G0058961, G0058871 and G0059241 have no owner's or install manual of their own. G0059241 (Eaton) carries only an ATS connections manual (0J4362) in Generac's catalog."
  ],
  "manuals": [
   {
    "title": "2010 HSB Air-Cooled Owner's Manual, 8-20 kW Nexus (item 0H8358)",
    "docType": "owner",
    "seedFile": "generac-nexus-2010-aircooled-owners.pdf"
   },
   {
    "title": "2010 HSB Installation Guide (item 0H8538)",
    "docType": "install",
    "seedFile": "generac-nexus-2010-install-guide.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 20 kW 2010 Air-Cooled (item 0H7570)",
    "docType": "wiring",
    "seedFile": "generac-nexus-20kw-wiring.pdf"
   },
   {
    "title": "2010 HSB Owner's Manual, Eaton badge (item 0H8537)",
    "docType": "owner",
    "seedFile": "generac-nexus-eaton-owners.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0H8358 p.21-22 and 0G8334 Sec 3.6, Install Manual 0H8538, Eaton badge 0H8537 / 0H8539, wiring 0H7570. G0058130 removed - 2008-series docs only (0G8334 / 0G8280 / 0G8186). Generac dates the Nexus panel to units manufactured 2010-2013; anything before 2010 is pre-Nexus."
 },
 {
  "id": "gen-ecogen-nexus-6",
  "series": "EcoGen",
  "family": "EcoGen 6 kW, extended run (Nexus)",
  "controller": "Nexus",
  "kw": [
   "6"
  ],
  "engine": "GTV-530 (0J0984 calls it GT-530), 530 cc V-twin, external oil tank system",
  "fuel": "LP vapor withdrawal system only - this unit is NOT dual-fuel and has no NG mode (0J0984 Sec 1.5.1 / 1.7). The primary LP regulator is NOT included with the generator.",
  "years": "2010-2011",
  "sort": 30,
  "models": [
   {
    "g": "G0058180",
    "digits": "5818",
    "desc": "ECO GEN 6KW GTV530 EXT OIL NTS"
   },
   {
    "g": "G0058181",
    "digits": "5818",
    "desc": "6KW/530 ECOGEN EXT OIL NTS"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; Synthetic 5W-30 under ALL ambient conditions (0J0984 Sec 4.3.2) - a single year-round grade, not the temperature-tiered chart used on the other Nexus GT-engine units.",
   "oilCapacity": "Approx. 1.7 qt (engine sump; external tank adds reserve capacity for extended run)",
   "sparkPlug": "BPR6HS, gap 0.76 mm (0.030 in) (0J0984 Sec 1.5.2)",
   "plugGap": "0.030 in (0.76 mm) (0J0984 Sec 1.5.2)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm) cold; rocker jam nut torque 174 in-lb. Check after the first 6 months or 500 hours, then every 500 hours (0J0984 Sec 4.7).",
   "battery": "Group 26R, 12V, 525 CCA minimum (Generac P/N 0H3421S) (0J0984 Sec 1.5.1)",
   "airFilter": "Generac P/N 0E9371 (0J0984 Sec 1.5.2)",
   "fuelPressure": "LP vapor only: 10-12 in water column (0.36-0.43 psi); verify it never drops below 10 in wc. The primary LP regulator is NOT included with the unit (0J0984 Sec 1.7). No natural-gas rating exists for this model.",
   "exercise": "Configurable Weekly/Biweekly/Monthly"
  },
  "maintenance": [
   {
    "interval": "Weekly",
    "task": "Check engine oil level; check enclosure louvers for dirt and debris"
   },
   {
    "interval": "Monthly",
    "task": "Inspect fuel lines and connections; remove battery corrosion, clean and tighten battery terminals; check for vibration, noise, leakage and temperature"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level (replace as necessary)"
   },
   {
    "interval": "Every 6 months or 500 hours",
    "task": "Check valve clearance, then continue to check every 500 hours"
   },
   {
    "interval": "Every 2 years or 500 hours",
    "task": "Change engine oil and oil filter"
   },
   {
    "interval": "Every 2 years or 500 hours",
    "task": "Inspect and replace the air cleaner and spark plugs as necessary"
   },
   {
    "interval": "Every 2 years or 500 hours",
    "task": "Complete tune-up by a Dealer"
   },
   {
    "interval": "Every 2,500 hours",
    "task": "Replace the alternator rotor brushes"
   }
  ],
  "alarms": [
   {
    "code": "1100-1101 / OVERCRANK",
    "name": "Overcrank",
    "display": "OVERCRANK (text on LCD; red LED on V-twin models)",
    "meaning": "Engine failed to start within the specified crank cycle (multiple crank attempts with rest periods).",
    "causes": [
     "Fuel shutoff valve closed",
     "Fuel pressure incorrect",
     "Fouled spark plug(s)",
     "Choke not operating"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "If it does not start or runs rough, contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER twice; rocker-switch panels: rocker to OFF, ENTER twice, rocker back to AUTO."
   },
   {
    "code": "LOW OIL PRESSURE",
    "name": "Low Oil Pressure",
    "display": "LOW OIL PRESSURE (text; red LED on V-twins)",
    "meaning": "Oil pressure switch (normally-closed contacts held open by oil pressure) closes when pressure drops below approx. 5 PSI. 5 sec delay on start-up, 7 sec delay once running.",
    "causes": [
     "Low or no oil level",
     "Oil pump or switch failure"
    ],
    "steps": [
     "Verify the oil level and top off per the Engine Oil Requirements chart.",
     "Do not restart until the oil level is verified.",
     "If the level is correct, contact an IASD."
    ],
    "clear": "Set AUTO/OFF/MANUAL to OFF (8 kW) or OFF then ENTER (10-20 kW) to unlatch."
   },
   {
    "code": "HIGH TEMPERATURE",
    "name": "High Engine Temperature",
    "display": "HIGH TEMPERATURE (text; auto-reset, red LED)",
    "meaning": "Temperature switch closes at approx. 144 C (293 F). 10 sec start-up delay, 1 sec shutdown delay. Auto-resets and restarts once cool if the start signal is still present.",
    "causes": [
     "Blocked enclosure louvers / ventilation",
     "Excessive ambient heat",
     "Intake or exhaust obstruction"
    ],
    "steps": [
     "Check ventilation around the intake, exhaust and rear of the generator.",
     "Clear any obstruction.",
     "If none is found, contact a dealer."
    ],
    "clear": "Automatic once the temperature drops (Auto Reset)."
   },
   {
    "code": "OVERSPEED",
    "name": "Overspeed",
    "display": "OVERSPEED (text; red LED)",
    "meaning": "Engine exceeds 4320 RPM for 3 seconds or 4500 RPM immediately; protects the generator and appliances from an overspeed output.",
    "causes": [
     "Governor / throttle linkage fault",
     "Stepper motor fault"
    ],
    "steps": [
     "Contact the nearest dealer - no field adjustment is given."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "RPM SENSE LOSS",
    "name": "RPM Sense Loss",
    "display": "RPM SENSE LOSS (text; red LED)",
    "meaning": "No valid RPM signal within 3 sec of cranking (locks out), or RPM signal lost for 1 sec while running (re-cranks once after a 15 sec wait, then latches if lost again).",
    "causes": [
     "Weak or discharged battery",
     "Failed RPM / ignition pickup",
     "Loose flywheel or wiring"
    ],
    "steps": [
     "Clear the alarm, then check the BATTERY MENU on the control panel.",
     "If it states the battery is GOOD, contact a dealer; if CHECK BATTERY, replace the battery."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "UNDER-FREQUENCY (text; red LED, 2008-2010 Nexus)",
    "meaning": "Generator runs below the 50 Hz setpoint for more than 30 seconds after starting and shuts down.",
    "causes": [
     "Overload",
     "Governor or carburetor fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "UNDERVOLTAGE",
    "name": "Undervoltage",
    "display": "UNDERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Generator output voltage falls below 60 percent of nominal for more than 5 seconds.",
    "causes": [
     "Severe overload",
     "Alternator or AVR fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "OVERVOLTAGE",
    "name": "Overvoltage",
    "display": "OVERVOLTAGE (text; red LED, 2010+ Nexus)",
    "meaning": "Output rises above 110 percent of rating for more than 3 sec, or above 130 percent for more than 0.2 sec.",
    "causes": [
     "AVR fault",
     "Sensing wiring fault"
    ],
    "steps": [
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL to OFF, then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "INTERNAL FAULT (text; red LED)",
    "meaning": "The control board self-detected an internal failure.",
    "causes": [
     "Control board fault"
    ],
    "steps": [
     "Cannot be cleared by the owner - call a service dealer."
    ],
    "clear": "Dealer only."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY (yellow LED on V-twins)",
    "meaning": "Battery voltage below 11.0 V (2008 doc) / 11.9 V (2010 doc) for 1 minute; not monitored during crank.",
    "causes": [
     "Weak or failing battery",
     "Charger not maintaining the battery"
    ],
    "steps": [
     "Inspect and clean battery terminals and cables.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once voltage rises above 11.0-12.4 V (doc-dependent)."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "EXERCISE SET ERROR",
    "meaning": "Exercise period / schedule data became corrupted.",
    "causes": [
     "Battery disconnected while setting the timer",
     "Control board memory fault"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only once the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Maintenance due (yellow LED on 16-20 kW)",
    "meaning": "A maintenance interval counter has expired.",
    "causes": [
     "Scheduled maintenance interval reached"
    ],
    "steps": [
     "Perform the due maintenance, then press ENTER to confirm the reset."
    ],
    "clear": "ENTER after confirming the maintenance was performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A control fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace battery cables",
     "Charge or replace battery",
     "Contact dealer for contactor/starter"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid",
     "Open wire #14 from engine control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Clean, re-gap or replace plugs",
     "Reset valve lash",
     "Verify choke plate moves freely",
     "Contact dealer for solenoid/wiring"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Incorrect fuel pressure",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plugs",
     "Confirm fuel pressure to regulator is 10-12 in WC (0.36-0.43 psi) LP / 5-7 in WC (0.18-0.25 psi) NG",
     "Move fuel selector to correct position",
     "Free the choke plate"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set OFF but engine keeps running",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "No AC output from generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Contact dealer if internal failure"
    ]
   },
   {
    "symptom": "No transfer to standby after utility loss",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Open transfer relay circuit",
     "Defective control logic board"
    ],
    "fixes": [
     "Contact dealer"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Use correct oil per Engine Oil Requirements",
     "Check for oil leaks",
     "Contact dealer for breather"
    ]
   }
  ],
  "installNotes": [
   "Extended-run external oil tank (EXT OIL NTS) is the distinguishing feature vs a standard 10 kW GT-530 Centurion - verify tank capacity and plumbing in install manual 0J1322",
   "LP vapor withdrawal only; required fuel pressure 10-12 in water column (0.36-0.43 psi), and the primary LP regulator is NOT supplied with the generator (0J0984 Sec 1.7)",
   "All pipe sizing, construction and layout must comply with NFPA 58 for liquid propane (0J0984 Sec 1.7)",
   "Battery: Group 26R, 12V, 525 CCA minimum (P/N 0H3421S); set AUTO/OFF/MANUAL to OFF before connecting cables",
   "Battery charger is integrated into the control panel as a Smart Charger"
  ],
  "tips": [
   "LP VAPOR ONLY - there is no natural-gas mode on this unit (0J0984 Sec 1.5.1 / 1.7). Do not try to convert it.",
   "Oil is Synthetic 5W-30 year round, not the SAE 30 / 10W-30 temperature chart used on the other Nexus units.",
   "Service intervals are 500 hours, not the 200 hours used on the standard Nexus air-cooled line.",
   "The alternator rotor brushes are a scheduled 2,500-hour item on this model - nothing equivalent exists on the standard Nexus schedule.",
   "Extended-run external oil tank (catalog desc 'EXT OIL NTS') is what distinguishes this from a standard 10 kW GT-530 Centurion - verify tank capacity and plumbing in install manual 0J1322."
  ],
  "manuals": [
   {
    "title": "EcoGen Owner's Manual, 6 kW LP (item 0J0984)",
    "docType": "owner",
    "seedFile": "generac-ecogen-6kw-owners.pdf"
   },
   {
    "title": "EcoGen Installation Manual, 6 kW (item 0J1322)",
    "docType": "install",
    "seedFile": "generac-ecogen-6kw-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 2011 EcoGen (item 0J2998)",
    "docType": "wiring",
    "seedFile": "generac-ecogen-6kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0J0984, Install Manual 0J1322, wiring 0J2998; Nexus alarm table from 0H8358 p.21-22. Fuel type, fuel pressure, oil grade, air filter, spark plug, battery, valve clearance and the full service schedule read from 0J0984 Sec 1.5.1/1.5.2/1.7, 4.3.2, 4.7 and 4.12 (the EcoGen's own schedule, not the base Nexus one)."
 },
 {
  "id": "gen-powerpact-7-75",
  "series": "PowerPact",
  "family": "PowerPact 7 / 7.5 kW",
  "controller": "PowerPact controller (7 / 7.5 kW)",
  "kw": [
   "7",
   "7.5"
  ],
  "engine": "GA-420 (0K6020 spec table); LH-420 / LH-720 / LV-432 on other SKU vintages, 420 cc 1-cyl",
  "fuel": "Dual-fuel carburetor, factory-set NG, field-convertible to LP",
  "years": "2013-2024",
  "sort": 20,
  "models": [
   {
    "g": "G0065180",
    "digits": "6518",
    "desc": "7KW/LH420 GEN+8C 50A T/SW"
   },
   {
    "g": "G0065181",
    "digits": "6518",
    "desc": "7KW/LH420 GEN+8C 50A T/SW-1"
   },
   {
    "g": "G0065190",
    "digits": "6519",
    "desc": "7KW/LH420 GEN+8C 50A T/S NO WP"
   },
   {
    "g": "G0065191",
    "digits": "6519",
    "desc": "7KW/LH420 GEN+8C 50A T/S NO WP"
   },
   {
    "g": "G0065610",
    "digits": "6561",
    "desc": "7KW/LH720 GEN UNBUNDLED"
   },
   {
    "g": "G0065611",
    "digits": "6561",
    "desc": "7KW/LH420 GEN UNBUNDLEDA1"
   },
   {
    "g": "G0069980",
    "digits": "6998",
    "desc": "7.5KW/LH420 GEN+8C 50AT/S NO W"
   },
   {
    "g": "G0069981",
    "digits": "6998",
    "desc": "7.5KW/LH420 GEN+8C 50AT/S NO W"
   }
  ],
  "specs": {
   "oil": "SAE 30 above 32 F; 10W-30 between 40 F and -10 F; synthetic 5W-30 at 10 F and below. API Service Class SJ, SL or better, no special additives (0K6020).",
   "oilCapacity": "Approx. 1.2 qt / 1.1 L including filter",
   "sparkPlug": "F7TC / Champion N9YC, gap 0.76 mm (0.030 in) (0K6020 Sec 2.4.2)",
   "plugGap": "0.030 in (0.76 mm) (0K6020 Sec 2.4.2)",
   "valveClearance": "0.002-0.004 in (0.05-0.1 mm) cold, engine at 60-80 F; rocker jam nut torque 174 in-lb (19.68 Nm). Check after the first 20 hours, then every 300 hours (0K6020 Sec 4.6).",
   "battery": "Group U1, 12V, 300 CCA minimum (Generac P/N OD4575) - smaller than the Group 26R used on 8kW+ Guardian units",
   "airFilter": "Generac P/N 0E9371A (0K6020 Sec 2.4.2)",
   "fuelPressure": "Natural gas 5-7 in water column (9-13 mm Hg); LP vapor 10-12 in water column (19-22 mm Hg). The primary LP regulator is not included with the generator (Install Manual 0K6022).",
   "exercise": "Not a programmable menu schedule - this controller has no LCD menu. Hold SET EXERCISE for 3 seconds at the day and time you want it to run; the unit then exercises every 7 days for about 12 minutes and does not transfer load unless utility is lost. The setting is lost whenever the 12V battery or T1 power is disconnected or the fuse is pulled (0K6020 Sec 3.10)."
  },
  "maintenance": [
   {
    "interval": "Monthly",
    "task": "Inspect fuel lines and connections; check for vibration, noise and leakage"
   },
   {
    "interval": "Monthly or 24 hours of continuous operation",
    "task": "Check engine oil level"
   },
   {
    "interval": "Weekly",
    "task": "Inspect and clean the enclosure louvers"
   },
   {
    "interval": "After the first 20 hours (break-in)",
    "task": "Change engine oil; check valve clearance; complete tune-up (Maintenance Due LED flashes)"
   },
   {
    "interval": "Every 6 months or 100 hours",
    "task": "Change engine oil; inspect the spark plug"
   },
   {
    "interval": "Every 3 months or 50 hours",
    "task": "Clean the engine air cleaner"
   },
   {
    "interval": "Every 1 year or 300 hours",
    "task": "Replace the engine air cleaner; change the spark plug; check valve clearance"
   },
   {
    "interval": "Yearly",
    "task": "Inspect the battery, remove corrosion, tighten terminals and check charge state"
   },
   {
    "interval": "Every 6 months",
    "task": "Check electrolyte level (unsealed batteries only)"
   }
  ],
  "alarms": [
   {
    "code": "OVERCRANK LED",
    "name": "Overcrank",
    "display": "Overcrank Alarm LED solid",
    "meaning": "Engine failed to start within the crank cycle.",
    "causes": [
     "Fuel shutoff valve OFF",
     "Fuel or ignition fault"
    ],
    "steps": [
     "Check that the fuel line shutoff valve is ON.",
     "Clear the alarm and attempt a start in MANUAL.",
     "Contact a dealer if it will not start or runs rough."
    ],
    "clear": "Press OFF to clear the condition, then OFF again to turn off the LED (3 presses if an alarm and a warning are both active)."
   },
   {
    "code": "RPM SENSOR LED",
    "name": "RPM Sense Loss",
    "display": "RPM Sensor Alarm LED solid",
    "meaning": "Loss of the RPM signal - the unit shuts down or will not restart.",
    "causes": [
     "Weak or bad battery",
     "Fuel issue",
     "RPM sensor / wiring fault"
    ],
    "steps": [
     "Clear the alarm, remove household loads and restart in AUTO.",
     "Contact a dealer to investigate a fuel issue if it recurs.",
     "Replace the battery if it tests bad; contact a dealer if the battery is GOOD."
    ],
    "clear": "Press OFF to clear, then OFF again to turn off the LED."
   },
   {
    "code": "TEMP/OIL LED SOLID",
    "name": "Low Oil Level",
    "display": "Temperature / Low Oil Level LED SOLID",
    "meaning": "Engine oil level is insufficient; the unit will not start in AUTO.",
    "causes": [
     "Low oil"
    ],
    "steps": [
     "Check the oil level and add oil per the owner's manual.",
     "Contact a dealer if the level is correct."
    ],
    "clear": "Correct the oil level, press OFF to clear, then OFF again."
   },
   {
    "code": "TEMP/OIL LED FLASHING",
    "name": "High Temperature",
    "display": "Temperature / Low Oil Level LED FLASHING",
    "meaning": "Excessive temperature shutdown.",
    "causes": [
     "Blocked ventilation around the intake, exhaust or rear of the unit",
     "On 2018+ PowerPact units, the auxiliary shutdown switch left in the OFF position"
    ],
    "steps": [
     "Check ventilation and clear any obstruction.",
     "On 2018 and newer PowerPact units, verify the auxiliary shutdown switch is not in the OFF position (pre-2018 PowerPact has no aux shutoff switch).",
     "Contact a dealer if no obstruction is found."
    ],
    "clear": "Press OFF to clear, then OFF again."
   },
   {
    "code": "SPEED LED",
    "name": "Overspeed / Underspeed",
    "display": "Speed Alarm LED - FLASHING = overspeed, SOLID = underspeed",
    "meaning": "Engine RPM outside the governed range.",
    "causes": [
     "Governor or throttle fault"
    ],
    "steps": [
     "Contact a servicing dealer."
    ],
    "clear": "Dealer diagnosis required."
   },
   {
    "code": "WIRING ERROR",
    "name": "Wiring Error",
    "display": "WIRING ERROR (no dedicated LED is documented for this condition)",
    "meaning": "Wiring Error Detection is one of the controller's listed protection systems (0K6020 Sec 2.2). The Quick Reference Guide lists WIRING ERROR against 'unit will not start in AUTO with utility loss' but gives no LED behaviour and no clearing procedure, and Generac's PowerPact LED-reference article has no Wiring Error row.",
    "causes": [
     "Miswired customer connections (not detailed in the manual)"
    ],
    "steps": [
     "Contact a servicing dealer - 0K6020 gives no field procedure for this alarm."
    ],
    "clear": "Not documented for this controller - dealer / installer correction required."
   },
   {
    "code": "NO LEDs LIT",
    "name": "No LEDs Lit (control fuse)",
    "display": "All control-panel LEDs dark; unit will not start in AUTO",
    "meaning": "The 7.5A ATO control fuse is open or missing - the engine will not start.",
    "causes": [
     "Blown or missing ATO 7.5A fuse"
    ],
    "steps": [
     "Remove and inspect the 7.5A ATO fuse; replace with the same type if bad (the controller then runs an LED self-test).",
     "Contact a dealer if the fuse is good."
    ],
    "clear": "Replace the fuse."
   }
  ],
  "warnings": [
   {
    "code": "CHARGER/BATTERY LED FLASHING",
    "name": "Charger Warning",
    "display": "Charger Warning / Battery Problem LED FLASHING",
    "meaning": "A battery charging problem exists.",
    "causes": [
     "Charger circuit fault",
     "On a new install, the battery-charging-circuit conductors not landed per the install manual"
    ],
    "steps": [
     "On a newly installed unit, verify the battery-charging-circuit conductors per the install manual.",
     "Otherwise contact a servicing dealer."
    ],
    "clear": "Press OFF to clear, then OFF again to turn off the LED."
   },
   {
    "code": "CHARGER/BATTERY LED SOLID",
    "name": "Battery Problem",
    "display": "Charger Warning / Battery Problem LED SOLID",
    "meaning": "A battery problem exists.",
    "causes": [
     "Weak or failed battery"
    ],
    "steps": [
     "Contact a servicing dealer."
    ],
    "clear": "Press OFF to clear, then OFF again to turn off the LED."
   },
   {
    "code": "MAINTENANCE DUE LED",
    "name": "Maintenance Due",
    "display": "Maintenance Due LED - FLASHING = 20-hour break-in maintenance due, SOLID = 1 year / 100 hour maintenance due",
    "meaning": "A scheduled maintenance interval has been reached.",
    "causes": [
     "Break-in or annual maintenance interval elapsed"
    ],
    "steps": [
     "Perform the due maintenance.",
     "Reset the indicator per the panel procedure."
    ],
    "clear": "Press OFF to clear the light after the maintenance is performed."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Unit running in AUTO but no power in house",
    "causes": [
     "MLCB open"
    ],
    "fixes": [
     "Check MLCB; contact dealer if already ON"
    ]
   },
   {
    "symptom": "Unit shuts down during operation, HIGH TEMPERATURE",
    "causes": [
     "Blocked ventilation around intake/exhaust/rear"
    ],
    "fixes": [
     "Check ventilation, clear obstruction, contact dealer if none found"
    ]
   },
   {
    "symptom": "Utility is present but the active mode LED (AUTO / MANUAL / OFF) is flashing",
    "causes": [
     "Utility sense lines or the utility disconnect (0K6020 Quick Reference Guide lists no alarm for this - the alarm column reads NONE)"
    ],
    "fixes": [
     "Check the utility sense lines and the utility disconnect; close the disconnect if it is open.",
     "Contact a servicing dealer if the disconnect is closed and the LED still flashes.",
     "Note: a flashing active-mode LED is the NORMAL indication of a utility outage (0K6020 Sec 3.3.2) - it is only a symptom when utility really is present."
    ]
   }
  ],
  "installNotes": [
   "PowerPact controller uses simpler LED + small display panel rather than the full LCD menu system on 8kW+ Guardian units",
   "Smaller Group U1 battery reflects the smaller single-cylinder GA/LH-420 starter load",
   "50A transfer switch platform typical for this class (per '+8C 50A T/SW' desc naming)"
  ],
  "tips": [
   "Smaller Group U1 12V 300 CCA battery (P/N OD4575), not the Group 26R used on 8 kW and larger Guardians.",
   "No LCD - every fault is an LED under the lid, and the same LED means different things flashing vs solid. Read the alarm/warning tables here before condemning a part.",
   "If ALL panel LEDs are dark, check the 7.5A ATO control fuse first - the engine will not start without it.",
   "A flashing High-Temperature alarm on a 2018-or-newer PowerPact can simply be the auxiliary shutdown switch left OFF. Pre-2018 PowerPact has no aux shutoff switch.",
   "A flashing AUTO / MANUAL / OFF LED normally just means utility is out. It is only a symptom if utility really is present - then check the sense lines and the utility disconnect.",
   "Exercise is not in a menu - there is no menu. Hold SET EXERCISE for 3 seconds at the day and time you want, and reset it after any battery, T1 or fuse disconnect."
  ],
  "manuals": [
   {
    "title": "PowerPact Owner's Manual, 7.5 kW 60 Hz Y20 (item 10000021790)",
    "docType": "owner",
    "seedFile": "generac-powerpact-7.5kw-owners.pdf"
   },
   {
    "title": "PowerPact Installation Manual, 7.5 kW 60 Hz Y20 (item 10000021782)",
    "docType": "install",
    "seedFile": "generac-powerpact-7.5kw-install.pdf"
   },
   {
    "title": "PowerPact Owner's Manual, 2014 printing (item 0K6020)",
    "docType": "owner",
    "seedFile": "generac-powerpact-2014-owners.pdf"
   },
   {
    "title": "PowerPact Installation Manual, 2014 printing (item 0K6022)",
    "docType": "install",
    "seedFile": "generac-powerpact-2014-install.pdf"
   },
   {
    "title": "Specification Sheet, 7.5 kW PowerPact (item 0L6848)",
    "docType": "spec",
    "seedFile": "generac-powerpact-7.5kw-spec.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, 7.5 kW AC PowerPact 60 Hz with aux switch (item 10000021282)",
    "docType": "wiring",
    "seedFile": "generac-powerpact-7.5kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0K6020 Table Sec 6 and 10000021790, Install Manual 0K6022 / 10000021782, Spec Sheet 0L6848, wiring 10000021282; LED meanings cross-checked against Generac's 'What do the LED lights mean on the PowerPact control panel?' article. Spark plug, air filter, valve lash (0.002-0.004 in, 174 in-lb, first 20 hrs then every 300 hrs), the itemized Service Schedule and the SET EXERCISE procedure all read from 0K6020 Sec 2.4.2, 4.2, 4.6 and 3.10; fuel pressure from Install Manual 0K6022. 0K6020 / 0K6022 dated 2014; 0L4805 / 0L4806 and 0L6457 / 0L6458 are later revisions; G0069980 / G0069981 carry Y20-dated 10000021xxx docs. Generac's Core Power vs PowerPact article dates PowerPact production to approximately 2013-2024."
 },
 {
  "id": "gen-corepower-7",
  "series": "CorePower",
  "family": "CorePower 7 kW (LED control board)",
  "controller": "CorePower controller (7 kW)",
  "kw": [
   "7"
  ],
  "engine": "Not stated in any Generac document for this model; the catalog reads '7KW LV432'",
  "fuel": "NG (factory default) or LP vapor - not documented for this SKU.",
  "years": "2007-2013",
  "sort": 30,
  "models": [
   {
    "g": "G0058370",
    "digits": "5837",
    "desc": "7KW LV432 GEN+8C 50A T/SW"
   }
  ],
  "specs": {
   "oil": "",
   "oilCapacity": "",
   "sparkPlug": "",
   "plugGap": "Verify on the data label / manual - Generac publishes no spec sheet for this model number",
   "valveClearance": "",
   "battery": "",
   "airFilter": "",
   "fuelPressure": "",
   "exercise": "Weekly, set by holding SET EXERCISE on the desired day and time; runs about 12 minutes."
  },
  "maintenance": [],
  "alarms": [],
  "warnings": [
   {
    "code": "ALL RED LEDs FLASHING",
    "name": "All LED lights flashing (exercise time not set)",
    "display": "All red LEDs on the control board flashing simultaneously",
    "meaning": "NOT a fault by default - it indicates the exercise time has not been set. The Core Power panel has LED lights only; it has no LCD screen.",
    "causes": [
     "Exercise time never set (or lost after a battery / fuse disconnect)",
     "If it persists after setting exercise time, a battery issue"
    ],
    "steps": [
     "With utility power present, set the AUTO/OFF/MANUAL rocker to AUTO.",
     "Press and hold SET EXERCISE for several seconds - the LEDs stop flashing immediately and the generator starts, runs about 12 minutes, then shuts down.",
     "The exerciser is now set to run weekly at that day and time.",
     "If the lights continue to flash after setting exercise time, treat it as a possible battery issue and contact a service dealer."
    ],
    "clear": "Set the exercise time as above; otherwise contact a dealer."
   }
  ],
  "troubleshooting": [],
  "installNotes": [
   "No Generac installation manual exists in the catalog for this G-number. The only install document is 0J1064 'INSTALL VERT HSB 50A CONN.DIAG', which is an image-only PDF with no extractable text.",
   "The bundled transfer switch is an 8-circuit 50A unit (catalog desc '+8C 50A T/SW'); its owner's manual is 0H7451."
  ],
  "tips": [
   "Generac states Core Power generators were 7 kW air-cooled units manufactured approximately 2007-2013, replaced by the 7.5 kW PowerPact.",
   "Mode is a toggle-style ROCKER switch (AUTO / MANUAL / OFF), unlike PowerPact's dedicated buttons.",
   "Exercise is not a menu schedule: hold SET EXERCISE on the desired day and time; the unit starts, runs about 12 minutes, then repeats every 7 days.",
   "All red LEDs flashing together is normally just 'exercise time not set', NOT a fault. If they keep flashing after you set exercise time, suspect the battery.",
   "7.5A automotive-style fuse protects the cranking and running circuits - the engine will not start if it is blown or missing.",
   "IMPORTANT: Generac's catalog lists no owner's or install manual for G0058370 - only an image-only vertical-HSB 50A connection diagram (0J1064) and a transfer-switch owner's manual (0H7451). The CorePower identification is inferred from kW, era and the 8-circuit 50A transfer switch, not stated by a unit manual. Confirm on site before ordering parts."
  ],
  "manuals": [
   {
    "title": "7/10 kW Transfer Switch Owner's Manual - the only readable document Generac lists for this SKU (item 0H7451)",
    "docType": "other",
    "seedFile": "generac-corepower-7-10kw-transfer-switch-owners.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "support.generac.com articles 'Core Power VS PowerPact: control panel differences' and 'Why Are All the LED Lights Flashing on the Core Power's Control Board?'; catalog docs 0J1064 (image-only) and 0H7451 for G0058370. Generac's Core Power vs PowerPact article dates Core Power production to approximately 2007-2013; this G-number sits in the 2010-2011 block of Generac's catalog."
 },
 {
  "id": "gen-guardian-pre-nexus-legacy-7-18",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion legacy 7-18 kW, LED bezel (Pre-Nexus)",
  "controller": "Pre-Nexus (LED bezel and 2008-series LCD panels)",
  "kw": [
   "7",
   "16",
   "18"
  ],
  "engine": "GH-410 410cc 1-cyl (7 kW); GT-990 992cc V-twin (16/18 kW), per 0F9421 / 0G4869",
  "fuel": "NG (factory default) or LP vapor-withdrawal; fuel system reconfiguration procedure is referenced in 0F9421/0G4869 Sec 1.7/1.8 'Fuel Requirements and Recommendations' but the reconfiguration steps themselves are not reproduced in the extracted text (figures/diagrams). Regulator fuel pressure: NG 5-7 in. water column (0.18-0.25 psi), LP 10-12 in. water column (0.36-0.43 psi); NG supply pressure must never drop below 4 in. w.c., LP never below 10 in. w.c.; max inlet pressure 14 in. w.c. (0G4869 pp.15-16, troubleshooting table p.28).",
  "years": "verify",
  "sort": 30,
  "models": [
   {
    "g": "G0052430",
    "digits": "5243",
    "desc": "16KW GT990 GUARD+16C L/CTR"
   },
   {
    "g": "G0052440",
    "digits": "5244",
    "desc": "16KW 990 GUARD+16C L/CTR ALUM"
   },
   {
    "g": "G0052470",
    "digits": "5247",
    "desc": "7KW GH410 CENTURION+8C L/CNTR"
   },
   {
    "g": "G0054160",
    "digits": "5416",
    "desc": "18KW GT990 GUARD ALUM+200A SW"
   }
  ],
  "specs": {
   "oil": "API Service Class SJ, SL or better, no special additives; 10W-30 (or Synthetic 5W-30) general use, SAE 30 in hot climates - per viscosity chart (0F9421 p.20/0G4869 equivalent)",
   "oilCapacity": "7kW (GH-410): approx. 1.5 qts incl. filter. 16/18kW (GT-990): approx. 1.7 qts incl. filter. Oil filter part # 070185F all models. (0F9421 p.8, 0G4869 p.8)",
   "sparkPlug": "7kW: RC14YC, gap 0.76mm (0.030in). 16/18kW (GT-990): RC14YC, gap 1.02mm (0.040in). (0F9421/0G4869 Sec 1.5.2)",
   "plugGap": "7 kW 0.030 in (0.76 mm); 16/18 kW 0.040 in (1.02 mm) (0F9421 / 0G4869 engine spec table)",
   "valveClearance": "0.002-0.004in (0.05-0.1mm) cold (60-80F), checked at TDC compression stroke; rocker jam nut torque 174 in-lbs after adjustment. Check after first 6 months of operation. (0F9421/0G4869 Sec 4.7 'Adjusting GH-410/GT-530/990 Valve Clearance')",
   "battery": "Group 26, 12V, 350 CCA minimum (7kW) or 525 CCA minimum (16/18kW). Optional battery warming blanket part # 0F6148DSRV. (0F9421/0G4869 Sec 1.5.1)",
   "airFilter": "7 kW: P/N 0C8127 per 0F9421, P/N 0G3332 per the later 0G4869 revision - the two manuals disagree, verify against the unit's own manual. 16/18 kW: P/N 0C8127.",
   "fuelPressure": "Natural gas 5-7 in water column (0.18-0.25 psi); LP vapor 10-12 in water column (0.36-0.43 psi). NG supply must never drop below 4 in wc, LP never below 10 in wc; maximum inlet pressure 14 in wc.",
   "exercise": "Weekly (every 7 days), user-selected day/time set by holding the EXERCISE SET TIME switch; runs approx. 12 minutes then shuts down; does not transfer load unless utility is also out. 16kW has an optional low-speed (2400 RPM, quieter) exercise mode via control-board DIP switch 1 (factory OFF). Timer resets whenever the battery or 15A fuse is disconnected. (0F9421 Sec 3.5)"
  },
  "maintenance": [
   {
    "interval": "Monthly",
    "task": "Inspect fuel lines/connections; check oil level; check enclosure louvers; remove battery corrosion and ensure dryness; clean/tighten battery terminals; check general condition (vibration, noise, leakage, temperature)"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state; check electrolyte level (unsealed batteries only)"
   },
   {
    "interval": "Every 200 hrs or 2 years (whichever first)",
    "task": "Change oil and oil filter (first oil/filter change at 8 hrs); replace air cleaner; replace spark plug(s); complete dealer tune-up"
   },
   {
    "interval": "Weekly",
    "task": "Clean/inspect enclosure louvers"
   }
  ],
  "alarms": [
   {
    "code": "OVER CRANK",
    "name": "Overcrank",
    "display": "OVER CRANK red LED (LED panel) / OVER CRANK alarm message on the 2008 10-20 kW LCD",
    "meaning": "Engine failed to start within the crank-cycle attempts (7 kW: one 15-sec crank then five 7-sec crank/rest cycles; 10-20 kW: two 16-sec crank/7-sec-rest cycles then three 7-sec crank/rest cycles).",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid (FS)",
     "Fouled or worn spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "steps": [
     "Verify the fuel supply and open the shutoff valve.",
     "Clean, re-gap or replace the spark plug(s).",
     "Reset valve lash to 0.002-0.004 in cold.",
     "Verify the choke plate moves freely."
    ],
    "clear": "LED panel: AUTO/OFF/MANUAL to OFF then back to AUTO. 2008 LCD: OFF then ENTER to unlatch. Repairs must be made or the fault re-latches."
   },
   {
    "code": "OVER SPEED",
    "name": "Overspeed",
    "display": "OVER SPEED red LED (shares the LED with RPM sense loss on the pre-2008 bezel) / alarm message on the 2008 LCD",
    "meaning": "Engine ran faster than the preset limit (2008 series: 4320 RPM for 3 sec, or immediately at 4500 RPM); protects the generator and connected appliances.",
    "causes": [
     "Governor or control board malfunction"
    ],
    "steps": [
     "Contact the nearest authorized dealer - no field-adjustable procedure is given in these manuals."
    ],
    "clear": "AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "RPM SENSOR LOSS",
    "name": "RPM Sensor Failure / No RPM Sense",
    "display": "'NO RPM SENSE IF FLASHING' - overspeed LED flashes (pre-2008); dedicated RPM SENSOR LOSS red LED on the 2008 8 kW panel; 'RPM sensor failure' message on the 2008 LCD",
    "meaning": "During cranking, no valid RPM signal within 3 seconds causes an immediate lockout. While running, an RPM signal lost for 1 full second shuts the engine down, waits 15 sec and re-cranks once; a second loss latches out.",
    "causes": [
     "Magneto / RPM sensor wiring fault",
     "Flywheel sensor gap"
    ],
    "steps": [
     "Treat as a sensor or wiring fault - no field procedure beyond the flash pattern is given in these manuals.",
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "HIGH TEMP",
    "name": "High Temperature",
    "display": "HIGH TEMP red LED / alarm message on the 2008 LCD (auto-reset)",
    "meaning": "Engine temperature switch contacts closed at approx. 144 C (293 F) and the engine shut down. 2008 series: 10-sec start-up delay, 1-sec delay before shutdown.",
    "causes": [
     "Blocked or obstructed cooling air inlet or outlet",
     "Roof or doors removed during operation",
     "Ambient temperature above the 40 C (104 F) max rating"
    ],
    "steps": [
     "Clear grass, weeds, brush, leaves and snow from the vents.",
     "Ensure the doors and roof are in place while running."
    ],
    "clear": "Auto-resets once the temperature drops to a safe level and a valid start signal is present."
   },
   {
    "code": "LOW OIL",
    "name": "Low Oil Pressure",
    "display": "LOW OIL red LED / alarm message on the 2008 LCD",
    "meaning": "Oil pressure switch contacts closed (pre-2008 doc: pressure below approx. 8 psi; 2008 doc: below approx. 5 PSI, 5-sec start delay / 7-sec running delay) and the engine shut down.",
    "causes": [
     "Low or no oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check and correct the oil level before restarting."
    ],
    "clear": "Unit will not restart until oil is verified; then AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "Alarm message on the 2008-series 10-20 kW LCD only (not an 8 kW LED)",
    "meaning": "If the generator stays under 50 Hz for more than 30 seconds after starting, it shuts down.",
    "causes": [
     "Governor or load fault"
    ],
    "steps": [
     "Dealer diagnosis."
    ],
    "clear": "OFF then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "Alarm message on the 2008-series 10-20 kW LCD only",
    "meaning": "Control board internal failure - cannot be cleared by the user.",
    "causes": [
     "Control board internal failure"
    ],
    "steps": [
     "Call a service dealer."
    ],
    "clear": "Not user-clearable per the manual."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY red LED (non-latching) / warning message on the 2008 LCD, external yellow LED on 16-20 kW",
    "meaning": "Non-latching warning; the microprocessor lights this when battery voltage falls below 11.0 V for one full minute. Battery voltage is NOT monitored during the crank cycle.",
    "causes": [
     "Weak or failing battery",
     "Charging circuit fault",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Inspect posts and cables for corrosion and tightness.",
     "Check state of charge with a hydrometer.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once battery voltage rises back above 11.0 V."
   },
   {
    "code": "NO UTILITY SENSE / EXERCISER NOT SET",
    "name": "No Utility Sense / Exerciser Not Set",
    "display": "Pre-2008 bezel prints 'NO UTILITY SENSE' and '5 FLASHING RED LEDs = EXERCISER NOT SET'; the System Set green LED flashes rapidly instead of steady-on",
    "meaning": "The unit will still start in AUTO if needed, but the exercise timer has not been programmed, or utility voltage is not being sensed at the control board (below approx. 150-160 VAC).",
    "causes": [
     "Exercise timer never set, or reset after a battery / fuse disconnect",
     "Utility sense wiring not connected"
    ],
    "steps": [
     "Set the exercise timer (hold the EXERCISE SET TIME switch on the desired day and time).",
     "Verify utility sense wiring back to the transfer switch."
    ],
    "clear": "Informational - resolves once the exercise timer is set and utility sense is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "Warning message on the 2008-series 10-20 kW LCD",
    "meaning": "Non-latching; exercise period data became corrupted.",
    "causes": [
     "Battery or fuse disconnect corrupting the stored exercise schedule"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only when the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Warning message on the 2008-series 10-20 kW LCD; external yellow LED on 16-20 kW",
    "meaning": "Third-priority alert when a maintenance interval (most are 2-year) expires. Maintenance counters stop accumulating without battery power and require a set-time prompt on power restore.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform the due maintenance.",
     "Press ENTER and confirm - this resets all maintenance counters at once (only one alert is shown at a time even if several are due)."
    ],
    "clear": "ENTER, then confirm."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 15A fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (7kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short and replace 15A fuse",
     "Tighten/clean/replace cables",
     "Dealer diagnosis for contactor/motor",
     "Charge or replace battery"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel/fuel valve off",
     "Defective fuel solenoid (FS)",
     "Open #14 wire from engine control board",
     "Defective spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Dealer diagnosis for FS/wiring",
     "Clean/re-gap/replace plug(s)",
     "Reset valve lash",
     "Verify choke plate moves freely"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Air cleaner plugged/damaged",
     "Defective spark plug(s)",
     "Fuel regulator not set",
     "Fuel pressure incorrect (should be 10-12in wc / 0.36-0.43psi LP, 5-7in wc / 0.18-0.25psi NG)",
     "Fuel selector in wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plug(s)",
     "Set fuel regulator",
     "Confirm fuel pressure to regulator",
     "Move selector to correct position",
     "Verify choke plate moves freely"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL switch set to OFF but engine continues to run",
    "causes": [
     "Defective switch",
     "Switch wired incorrectly",
     "Defective control board"
    ],
    "fixes": [
     "Dealer diagnosis (all *)"
    ]
   },
   {
    "symptom": "No AC output from the generator",
    "causes": [
     "Main line circuit breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker to ON/CLOSED",
     "Dealer diagnosis"
    ]
   },
   {
    "symptom": "No transfer to standby after utility failure",
    "causes": [
     "Defective transfer switch coil",
     "Defective transfer relay",
     "Transfer relay circuit open",
     "Defective control logic board"
    ],
    "fixes": [
     "Dealer diagnosis (all *)"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Engine overfilled with oil",
     "Defective engine breather",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose"
    ],
    "fixes": [
     "Adjust oil to proper level",
     "Dealer diagnosis for breather",
     "Use recommended oil",
     "Check for leaks"
    ]
   }
  ],
  "installNotes": [
   "Genset must sit on a level surface, base frame level within 2in all around; typically pea gravel/crushed stone pad, or a concrete slab per local code exceeding the unit's footprint by 6in minimum on all sides. (0F9421 Sec 1.11-ish / mounting drawing 0F9424-D referenced on p.31 - the install manual 0F9424 itself is image-only/no extractable text, see gaps)",
   "Steel enclosure on smaller units, steel/aluminum on larger - per model (0F9421/0G4869 spec table, Sec 1.5.1)",
   "Normal operating range -20F (-28.8C) to 104F (40C)",
   "Arc Fault Circuit Interrupter (AFCI) requirements for bedroom circuits are discussed at length in Sec 1.3 (NEC 210.12) - relevant to transfer-switch-fed branch circuits, not the generator itself",
   "12-16kW low-speed exercise DIP switch (DIP1 on control board, factory OFF) - position is only read at board power-up; must cycle power to the board after changing it",
   "G0054160 (18kW) ships with 200A service-entrance-rated options (install docs 0G6788 'INSTALL 200 SERVICE ENT' and 0G6828 'INSTALL 200A SERV ENT ENCL' are local but image-only/no extractable text - see gaps) and its own 100A/200A transfer switch owner's manual 0G6503"
  ],
  "tips": [
   "No display of any kind - the whole diagnosis is which LED is lit and whether it is flashing. Overspeed and RPM-sense-loss share one LED ('NO RPM SENSE IF FLASHING' is printed on the bezel).",
   "System fuse is 15A on this generation (not the 7.5A used from 2008 onward).",
   "Air filter part number for the 7 kW disagrees between printings: 0F9421 says 0C8127, 0G4869 says 0G3332. Verify against the unit before ordering.",
   "12-16 kW have a low-speed (2400 RPM, quieter) exercise DIP switch (DIP1) on the control board, factory OFF - the position is only read at board power-up, so cycle power after changing it.",
   "Exercise timer resets whenever the battery or the 15A fuse is disconnected."
  ],
  "manuals": [
   {
    "title": "Guardian HSB Owner's Manual, legacy LED-panel generation (item 0F9421)",
    "docType": "owner",
    "seedFile": "generac-legacy-guardian-hsb-owners.pdf"
   },
   {
    "title": "HSB Air-Cooled Universal Owner's Manual, legacy generation (item 0G4869)",
    "docType": "owner",
    "seedFile": "generac-legacy-aircooled-universal-owners.pdf"
   },
   {
    "title": "HSB Generator Installation Manual, legacy generation - image-only PDF, no text layer (item 0F9424)",
    "docType": "install",
    "seedFile": "generac-legacy-hsb-install.pdf"
   },
   {
    "title": "Wiring Diagram / Schematic, transfer switch (item 0F9775)",
    "docType": "wiring",
    "seedFile": "generac-legacy-transfer-switch-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manuals 0F9421 Sec 3.6 p.19-20 and 0G4869; Install Manual 0F9424 (image-only PDF); wiring 0F9775. No model year is stated in any document reviewed. These G-numbers (G0052xxx-G0054xxx) sit below the 'G0055xxx ... 2008 HSB' doc series, so they are the older sub-generation; Generac calls any panel before 2010 pre-Nexus. 0G4869 also documents 10 kW (GT-530) and 13 kW (GT-990) versions of this platform, but no catalog G-number for a 10 or 13 kW unit exists at this doc/panel generation."
 },
 {
  "id": "gen-guardian-pre-nexus-2008-8-20",
  "series": "Guardian / Centurion",
  "family": "Guardian / Centurion / Carrier 2008 series 8-20 kW (Pre-Nexus)",
  "controller": "Pre-Nexus (LED bezel and 2008-series LCD panels)",
  "kw": [
   "8",
   "10",
   "12",
   "14",
   "17",
   "20"
  ],
  "engine": "GH-410 410cc (8); GT-530 530cc (10); GT-990 992cc (12-17); GT-999 999cc (20)",
  "fuel": "NG (factory default) or LP vapor-withdrawal, reconfigurable. Regulator fuel pressure: NG 5-7in wc (0.18-0.25psi), LP 10-12in wc (0.36-0.43psi); local gas supplier must keep supply pressure at or below 14in wc or contact them (0G8334 troubleshooting p.32, install guide 0G8679 p.7-8).",
  "years": "2008-2009",
  "sort": 30,
  "models": [
   {
    "g": "G0055010",
    "digits": "5501",
    "desc": "8KW GH410 GUARD+8C L/CTR"
   },
   {
    "g": "G0055020",
    "digits": "5502",
    "desc": "10KW GT530 GUARD+10C L/CTR"
   },
   {
    "g": "G0055030",
    "digits": "5503",
    "desc": "14KW GT990 GUARD+14C L/CNTR"
   },
   {
    "g": "G0055040",
    "digits": "5504",
    "desc": "17KW GT990 GUARD+16C L/CNTR"
   },
   {
    "g": "G0055050",
    "digits": "5505",
    "desc": "17KW GT990 GUARDN+16C L/CT AL"
   },
   {
    "g": "G0055060",
    "digits": "5506",
    "desc": "20KW GT999 GUARDN +200A LS AL"
   },
   {
    "g": "G0055230",
    "digits": "5523",
    "desc": "17KW GT990 GUARD-NO SWITCH"
   },
   {
    "g": "G0055231",
    "digits": "5523",
    "desc": "17KW GT990 GUARD/GEN-NO SWITCH"
   },
   {
    "g": "G0055250",
    "digits": "5525",
    "desc": "20KW GT999 GUARDN-NO SWTCH AL"
   },
   {
    "g": "G0055251",
    "digits": "5525",
    "desc": "20KW GT999 GUARD/GEN-NO SW AL"
   },
   {
    "g": "G0055310",
    "digits": "5531",
    "desc": "17KW GT990 G26-NO SWITCH"
   },
   {
    "g": "G0055330",
    "digits": "5533",
    "desc": "20KW GT999 G26-NO SW. AL"
   },
   {
    "g": "G0055360",
    "digits": "5536",
    "desc": "12KW GT990 CENT+12C L/CTR"
   },
   {
    "g": "G0055390",
    "digits": "5539",
    "desc": "20KW GT999 CENT+200A LS AL"
   },
   {
    "g": "G0055470",
    "digits": "5547",
    "desc": "20KW GT999 CAR+200A L/SHED SW"
   },
   {
    "g": "G0057440",
    "digits": "5744",
    "desc": "20KW GT999 GUARD + 200A SE SW"
   },
   {
    "g": "G0058130",
    "digits": "5813",
    "desc": "20 KW GT999 CENT. W/ 200A NSE"
   },
   {
    "g": "G0058260",
    "digits": "5826",
    "desc": "10KW GT530 CENT W/100A NSE"
   }
  ],
  "specs": {
   "oil": "API SJ/SL or better, no special additives; viscosity by ambient temp (10W-30 general, SAE30 hot, synthetic 5W-30 cold) - same chart pattern as the legacy family",
   "oilCapacity": "8kW: approx. 1.5qts incl. filter. 10-20kW: approx. 1.7qts incl. filter. Oil filter part # 070185F all models. (0G8334 Sec 1.6.2, p.9)",
   "sparkPlug": "8kW (GH-410): RC14YC, 0.76mm (0.030in). 10kW (GT-530): BPR6HS, 0.76mm (0.030in). 12/14/16/17kW (GT-990): RC14YC, 1.02mm (0.040in). 20kW (GT-999): RC12YC, 0.76mm (0.030in). (0G8334 Sec 1.6.2, p.9)",
   "plugGap": "8 kW 0.030 in (0.76 mm); 10 kW 0.030 in (0.76 mm); 12/14/16/17 kW 0.040 in (1.02 mm); 20 kW 0.030 in (0.76 mm) (0G8334 Sec 1.6.2)",
   "valveClearance": "0.002-0.004in (0.05-0.1mm) cold, same GH-410/GT-530/990/999 procedure as legacy family, rocker jam nut torque 174 in-lbs (0G8334 Sec 4.7)",
   "battery": "8kW: Group 26R, 12V, 350CCA minimum. 10-20kW: Group 26R, 12V, 525CCA minimum. (0G8334 Sec 1.6.1, p.9)",
   "airFilter": "8kW: part # 0G3332. 10kW: part # 0E9581. 12/14/16/17kW: part # 0C8127. 20kW: part # 0G5894. (0G8334 Sec 1.6.2, p.9)",
   "fuelPressure": "Natural gas 5-7 in water column (0.18-0.25 psi); LP vapor 10-12 in water column (0.36-0.43 psi). NG supply must never drop below 4 in wc, LP never below 10 in wc; maximum inlet pressure 14 in wc.",
   "exercise": "Weekly (every 7 days), user-set day/time, runs approx. 12 minutes then shuts down; resets after any battery/fuse disconnect. (0G8334 Sec 3.1.2, p.19-20)"
  },
  "maintenance": [
   {
    "interval": "Monthly (or 24 hrs continuous run)",
    "task": "Check oil level; inspect fuel lines/connections; inspect enclosure louvers; battery corrosion/dryness/terminal check; general condition check"
   },
   {
    "interval": "Every 6 months",
    "task": "Check battery charge state and electrolyte level"
   },
   {
    "interval": "Every 200 hrs or 2 years",
    "task": "Change oil and filter (first change at 8 hrs); replace air cleaner; replace spark plug(s); complete dealer tune-up"
   },
   {
    "interval": "Weekly",
    "task": "Clean enclosure louvers"
   }
  ],
  "alarms": [
   {
    "code": "OVER CRANK",
    "name": "Overcrank",
    "display": "OVER CRANK red LED (LED panel) / OVER CRANK alarm message on the 2008 10-20 kW LCD",
    "meaning": "Engine failed to start within the crank-cycle attempts (7 kW: one 15-sec crank then five 7-sec crank/rest cycles; 10-20 kW: two 16-sec crank/7-sec-rest cycles then three 7-sec crank/rest cycles).",
    "causes": [
     "Out of fuel / fuel valve closed",
     "Defective fuel solenoid (FS)",
     "Fouled or worn spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "steps": [
     "Verify the fuel supply and open the shutoff valve.",
     "Clean, re-gap or replace the spark plug(s).",
     "Reset valve lash to 0.002-0.004 in cold.",
     "Verify the choke plate moves freely."
    ],
    "clear": "LED panel: AUTO/OFF/MANUAL to OFF then back to AUTO. 2008 LCD: OFF then ENTER to unlatch. Repairs must be made or the fault re-latches."
   },
   {
    "code": "OVER SPEED",
    "name": "Overspeed",
    "display": "OVER SPEED red LED (shares the LED with RPM sense loss on the pre-2008 bezel) / alarm message on the 2008 LCD",
    "meaning": "Engine ran faster than the preset limit (2008 series: 4320 RPM for 3 sec, or immediately at 4500 RPM); protects the generator and connected appliances.",
    "causes": [
     "Governor or control board malfunction"
    ],
    "steps": [
     "Contact the nearest authorized dealer - no field-adjustable procedure is given in these manuals."
    ],
    "clear": "AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "RPM SENSOR LOSS",
    "name": "RPM Sensor Failure / No RPM Sense",
    "display": "'NO RPM SENSE IF FLASHING' - overspeed LED flashes (pre-2008); dedicated RPM SENSOR LOSS red LED on the 2008 8 kW panel; 'RPM sensor failure' message on the 2008 LCD",
    "meaning": "During cranking, no valid RPM signal within 3 seconds causes an immediate lockout. While running, an RPM signal lost for 1 full second shuts the engine down, waits 15 sec and re-cranks once; a second loss latches out.",
    "causes": [
     "Magneto / RPM sensor wiring fault",
     "Flywheel sensor gap"
    ],
    "steps": [
     "Treat as a sensor or wiring fault - no field procedure beyond the flash pattern is given in these manuals.",
     "Contact a dealer."
    ],
    "clear": "AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "HIGH TEMP",
    "name": "High Temperature",
    "display": "HIGH TEMP red LED / alarm message on the 2008 LCD (auto-reset)",
    "meaning": "Engine temperature switch contacts closed at approx. 144 C (293 F) and the engine shut down. 2008 series: 10-sec start-up delay, 1-sec delay before shutdown.",
    "causes": [
     "Blocked or obstructed cooling air inlet or outlet",
     "Roof or doors removed during operation",
     "Ambient temperature above the 40 C (104 F) max rating"
    ],
    "steps": [
     "Clear grass, weeds, brush, leaves and snow from the vents.",
     "Ensure the doors and roof are in place while running."
    ],
    "clear": "Auto-resets once the temperature drops to a safe level and a valid start signal is present."
   },
   {
    "code": "LOW OIL",
    "name": "Low Oil Pressure",
    "display": "LOW OIL red LED / alarm message on the 2008 LCD",
    "meaning": "Oil pressure switch contacts closed (pre-2008 doc: pressure below approx. 8 psi; 2008 doc: below approx. 5 PSI, 5-sec start delay / 7-sec running delay) and the engine shut down.",
    "causes": [
     "Low or no oil",
     "Failed oil pressure switch"
    ],
    "steps": [
     "Check and correct the oil level before restarting."
    ],
    "clear": "Unit will not restart until oil is verified; then AUTO/OFF/MANUAL OFF then AUTO (LED panel) / OFF then ENTER (2008 LCD)."
   },
   {
    "code": "UNDER-FREQUENCY",
    "name": "Under-frequency",
    "display": "Alarm message on the 2008-series 10-20 kW LCD only (not an 8 kW LED)",
    "meaning": "If the generator stays under 50 Hz for more than 30 seconds after starting, it shuts down.",
    "causes": [
     "Governor or load fault"
    ],
    "steps": [
     "Dealer diagnosis."
    ],
    "clear": "OFF then ENTER."
   },
   {
    "code": "INTERNAL FAULT",
    "name": "Internal Fault",
    "display": "Alarm message on the 2008-series 10-20 kW LCD only",
    "meaning": "Control board internal failure - cannot be cleared by the user.",
    "causes": [
     "Control board internal failure"
    ],
    "steps": [
     "Call a service dealer."
    ],
    "clear": "Not user-clearable per the manual."
   }
  ],
  "warnings": [
   {
    "code": "LOW BATTERY",
    "name": "Low Battery",
    "display": "LOW BATTERY red LED (non-latching) / warning message on the 2008 LCD, external yellow LED on 16-20 kW",
    "meaning": "Non-latching warning; the microprocessor lights this when battery voltage falls below 11.0 V for one full minute. Battery voltage is NOT monitored during the crank cycle.",
    "causes": [
     "Weak or failing battery",
     "Charging circuit fault",
     "Loose or corroded battery cables"
    ],
    "steps": [
     "Inspect posts and cables for corrosion and tightness.",
     "Check state of charge with a hydrometer.",
     "Charge or replace the battery."
    ],
    "clear": "Clears automatically once battery voltage rises back above 11.0 V."
   },
   {
    "code": "NO UTILITY SENSE / EXERCISER NOT SET",
    "name": "No Utility Sense / Exerciser Not Set",
    "display": "Pre-2008 bezel prints 'NO UTILITY SENSE' and '5 FLASHING RED LEDs = EXERCISER NOT SET'; the System Set green LED flashes rapidly instead of steady-on",
    "meaning": "The unit will still start in AUTO if needed, but the exercise timer has not been programmed, or utility voltage is not being sensed at the control board (below approx. 150-160 VAC).",
    "causes": [
     "Exercise timer never set, or reset after a battery / fuse disconnect",
     "Utility sense wiring not connected"
    ],
    "steps": [
     "Set the exercise timer (hold the EXERCISE SET TIME switch on the desired day and time).",
     "Verify utility sense wiring back to the transfer switch."
    ],
    "clear": "Informational - resolves once the exercise timer is set and utility sense is restored."
   },
   {
    "code": "EXERCISE SET ERROR",
    "name": "Exercise Set Error",
    "display": "Warning message on the 2008-series 10-20 kW LCD",
    "meaning": "Non-latching; exercise period data became corrupted.",
    "causes": [
     "Battery or fuse disconnect corrupting the stored exercise schedule"
    ],
    "steps": [
     "Re-set the exercise timer."
    ],
    "clear": "Clears only when the exercise period is re-set."
   },
   {
    "code": "MAINTENANCE MESSAGE",
    "name": "Maintenance Message",
    "display": "Warning message on the 2008-series 10-20 kW LCD; external yellow LED on 16-20 kW",
    "meaning": "Third-priority alert when a maintenance interval (most are 2-year) expires. Maintenance counters stop accumulating without battery power and require a set-time prompt on power restore.",
    "causes": [
     "Scheduled maintenance interval elapsed"
    ],
    "steps": [
     "Perform the due maintenance.",
     "Press ENTER and confirm - this resets all maintenance counters at once (only one alert is shown at a time even if several are due)."
    ],
    "clear": "ENTER, then confirm."
   }
  ],
  "troubleshooting": [
   {
    "symptom": "Engine will not crank",
    "causes": [
     "Blown 7.5A fuse",
     "Loose/corroded/defective battery cables",
     "Defective starter contactor (8kW)",
     "Defective starter motor",
     "Dead battery"
    ],
    "fixes": [
     "Correct short, replace 7.5A fuse",
     "Tighten/clean/replace cables",
     "Dealer diagnosis",
     "Charge/replace battery"
    ]
   },
   {
    "symptom": "Engine cranks but will not start",
    "causes": [
     "Out of fuel",
     "Defective fuel solenoid (FS)",
     "Open #14 wire from control board",
     "Fouled spark plug(s)",
     "Valve lash out of adjustment",
     "Choke not operating"
    ],
    "fixes": [
     "Replenish fuel/open valve",
     "Dealer diagnosis",
     "Clean/re-gap/replace plug(s)",
     "Reset valve lash",
     "Verify choke plate movement"
    ]
   },
   {
    "symptom": "Engine starts hard and runs rough",
    "causes": [
     "Plugged/damaged air cleaner",
     "Fouled spark plug(s)",
     "Fuel pressure incorrect (10-12in wc LP / 5-7in wc NG)",
     "Fuel selector wrong position",
     "Choke remains closed"
    ],
    "fixes": [
     "Replace air cleaner",
     "Clean/re-gap/replace plug(s)",
     "Confirm fuel pressure to regulator",
     "Move fuel selector",
     "Verify choke plate movement"
    ]
   },
   {
    "symptom": "AUTO/OFF/MANUAL set to OFF but engine keeps running",
    "causes": [
     "Defective switch/wiring/control board"
    ],
    "fixes": [
     "Dealer diagnosis"
    ]
   },
   {
    "symptom": "No AC output",
    "causes": [
     "Main breaker OFF/OPEN",
     "Generator internal failure"
    ],
    "fixes": [
     "Reset breaker",
     "Dealer diagnosis"
    ]
   },
   {
    "symptom": "No transfer to standby",
    "causes": [
     "Defective transfer switch coil/relay/circuit/control board"
    ],
    "fixes": [
     "Dealer diagnosis"
    ]
   },
   {
    "symptom": "Unit consumes large amounts of oil",
    "causes": [
     "Overfilled with oil",
     "Improper oil type/viscosity",
     "Damaged gasket/seal/hose",
     "Defective engine breather"
    ],
    "fixes": [
     "Adjust oil level",
     "Use recommended oil",
     "Check for leaks",
     "Dealer diagnosis for breather"
    ]
   }
  ],
  "installNotes": [
   "NFPA 37 clearance: standard rule requires 5ft from wall openings/combustible walls; but per independent fire testing cited in the manual, Generac's own enclosure for the 8-20kW units is approved for 18in minimum clearance from the back of the unit to a wall/structure, 3ft (36in) at front and ends, 4ft (48in) minimum / 5ft (60in) recommended clearance above, and no windows/openings/vegetation over 12in within 5ft radially (0G8334 Sec 1.11.2, p.13, Fig 1.10).",
   "DO NOT install under wooden decks/structures unless at least 4ft clearance above, 3ft sides/front, 18in at back (0G8334 p.11-12).",
   "Base frame must be level within 2in all around; typically set on pea gravel/crushed stone, or a concrete slab (if required by local code) exceeding the unit footprint by 6in minimum on all sides.",
   "Transfer switch shipped with 8-17kW units is NEMA 1 (indoor only); the 20kW unit's switch is NEMA 3R (indoor/outdoor rated). (0G8334 Sec 1.11.3, p.12)",
   "Battery charger: for RTSN/RTSE/GenReady transfer switches the charger must be mounted in the generator; for RTS Load Center and RTSS Load Shed transfer switches the charger ships pre-installed in the transfer switch and the separately packaged charger should be discarded (0G8679 Install Guide Book, 'Battery Charger Installation').",
   "Badge variants share this exact doc/controller set: plain Guardian, Centurion (G0055360 12kW, G0055390 20kW), 'G26' no-switch variant, a Siemens co-brand ('GEN-SIE' per warranty card item 0G8676 on G0055310/G0055330), and Carrier co-brand ('CAR' in desc, warranty card 0G8676C on G0055470/via 0H1900 xfer sw manual). Badge only changes the printed warranty card and cosmetic labeling, not service procedure.",
   "G0057440 (20kW +200A SE switch) additionally uses a dedicated 200A home-standby transfer switch install manual (0H4905, local file present but 0 lines extracted - image-only) and 100A/200A owner's manual 0H1900 (local, text-extracted)."
  ],
  "tips": [
   "The transitional design: it already has an ALARM LOG and named Alarm vs Warning messages on the 10-20 kW LCD, but still no numeric fault codes. Numeric codes start with the Nexus generation.",
   "The 8 kW keeps a plain 7-LED panel; 10-20 kW get the alphanumeric LCD; 16-20 kW add external red/yellow LEDs.",
   "Clearances per the manual's own fire testing: 18 in minimum behind the unit, 3 ft at front and ends, 4 ft minimum / 5 ft recommended above, and no windows, openings or vegetation over 12 in within a 5 ft radius (0G8334 Sec 1.11.2 Fig 1.10).",
   "Do NOT install under a wooden deck unless there is at least 4 ft clearance above, 3 ft at the sides/front and 18 in at the back.",
   "Transfer switch shipped with 8-17 kW units is NEMA 1 (indoor only); the 20 kW ships a NEMA 3R.",
   "Badge co-branding (Guardian / Centurion / Siemens / Carrier / 'G26') is cosmetic - same engine, same controller, same doc set apart from the warranty card."
  ],
  "manuals": [
   {
    "title": "2008 HSB Air-Cooled Owner's Manual, 8-20 kW (item 0G8334)",
    "docType": "owner",
    "seedFile": "generac-2008-hsb-aircooled-owners.pdf"
   },
   {
    "title": "HSB Generator Installation Manual - 2008 (item 0G8280)",
    "docType": "install",
    "seedFile": "generac-2008-hsb-install.pdf"
   },
   {
    "title": "2008 HSB Installation Guide Book (item 0G8679)",
    "docType": "install",
    "seedFile": "generac-2008-hsb-install-guide-book.pdf"
   },
   {
    "title": "Wiring Diagram, 8 kW 2008 Air-Cooled (item 0G7945)",
    "docType": "wiring",
    "seedFile": "generac-2008-8kw-wiring.pdf"
   },
   {
    "title": "Generac product support lookup - every document Generac publishes for this model number",
    "docType": "other",
    "url": "https://www.generac.com/service-support/product-support-lookup/"
   }
  ],
  "sourceNotes": "Owner's Manual 0G8334 Sec 3.6 p.23-24 (Rev F 03/19/10), Install Manuals 0G8280 / 0G8679, wiring 0G7945 / 0G7946. G0058130 and G0058260 moved here from the Nexus families: their only owner manual is 0G8334 'MANUAL 08 HSB AIR-COOLED' with 2008-series install/wiring docs, no Nexus (0H8358) document. Explicit in the doc titles: 'EV CONTROL PANEL 2008 HSB' (0G7538), 'INSTALL HSB GENERATOR - 2008' (0G8280), 'MANUAL 08 HSB AIR-COOLED' (0G8334, Revision F, 03/19/10 print date)."
 }
];
