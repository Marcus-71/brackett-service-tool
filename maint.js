/*
 * Maintenance Figures — the numbers a tech needs mid clean-and-check, pulled
 * out of the manuals so nobody reads a 109-page PDF on a phone in a crawl
 * space. Same idea as CHARGING_CHARTS, heating side.
 *
 * Every figure here came out of manufacturer service literature. Sources are
 * on each entry. When a manual says "see the rating plate" or "see Table N",
 * this file says that too rather than inventing a number — the rating plate
 * wins over anything on a screen.
 *
 * match[] is what the search runs against, so put every model string a tech
 * might read off a tag in there.
 */

const MAINT_SPECS = [

  // ---------------------------------------------------------------- LENNOX
  {
    brand: "Lennox",
    model: "G51MP",
    equip: "Gas Furnace",
    summary: "90%+ single-stage, PSC blower, SureLight HSI",
    match: ["G51MP", "G51", "G51MP-24B-045", "G51MP-36B-045", "G51MP-36B-070",
            "G51MP-36C-090", "G51MP-48C-090", "G51MP-60C-090", "G51MP-48C-110",
            "G51MP-60C-110", "G51MP-60D-135"],
    source: "Lennox Service Literature Corp. 0307-L5, rev. 11-2006",
    flags: [
      {
        title: "Flame signal depends on the BOARD, not the model",
        body: "Identify the control board before you judge the number. A reading that is healthy on a 69M15 is a failing sensor on a 97L48. Nothing here is anywhere near the 1–5 µA you learned on generic training."
      }
    ],
    groups: [
      {
        title: "Flame signal",
        rows: [
          { label: "Board 97L48 (all -1 units, 090-2)", value: "Normal > 0.61 µA · Low 0.21–0.60 · Drop out ≤ 0.20", key: true },
          { label: "Board 69M15 (045-2, 070-2, 110-2, 135-2, 090-3 and later)", value: "Normal > 0.31 µA · Low 0.25–0.30 · Drop out ≤ 0.24", key: true },
          { label: "Transducer", value: "Lennox 78H5401 if your meter won't read that low. Converts µA to volts 1:1." },
          { label: "When to read", value: "After 2 minutes of burner operation" }
        ]
      },
      {
        title: "Gas",
        rows: [
          { label: "Manifold, natural", value: "3.5\" w.c. ± 0.3", key: true },
          { label: "Manifold, LP", value: "10.0\" w.c. ± 0.7" },
          { label: "Supply pressure, natural", value: "4.5 – 13.0\" w.c." },
          { label: "Supply pressure, LP", value: "10.5 – 13.0\" w.c." },
          { label: "Orifice, natural", value: ".089\"" },
          { label: "Max CO", value: "100 ppm", key: true },
          { label: "CO₂ %, natural", value: "-045: 6.3–7.3 · -070: 6.5–7.5 · -090/-110/-135: 7.0–8.0" },
          { label: "Run time before sampling", value: "15 minutes at correct manifold pressure and rate" }
        ]
      },
      {
        title: "Clocking the meter — seconds per revolution, natural",
        rows: [
          { label: "1 cu ft dial", value: "-045: 80 · -070: 51 · -090: 40 · -110: 33 · -135: 27", key: true },
          { label: "2 cu ft dial", value: "-045: 160 · -070: 102 · -090: 80 · -110: 66 · -135: 53" },
          { label: "Method", value: "Shut off every other gas appliance on the meter. Time two revolutions, divide by two." }
        ]
      },
      {
        title: "Air",
        rows: [
          { label: "Max external static", value: "0.5\" w.c.", key: true },
          { label: "Temperature rise", value: "Read the rating plate — ranges run 25–75°F depending on model" },
          { label: "Blower motor", value: "PSC 120V. Prelubricated — do not oil." },
          { label: "Blower-off delay target", value: "Supply air 90–110°F at the instant the blower drops out" },
          { label: "Ignitor resistance", value: "10.9 – 19.7 Ω (ohm it; voltage can't be measured on this board)" }
        ]
      },
      {
        title: "Safeties",
        rows: [
          { label: "Rollout S47", value: "Opens 250°F ± 12, manual reset, one each side of burner box" },
          { label: "Secondary limit S21", value: "125°F auto reset, behind blower housing" },
          { label: "Backup secondary S113", value: "090 / 110 / 135 only — on the inducer, opens at 142°F" },
          { label: "Prove switches", value: "Two identical switches, both must function. Never run with one bypassed." },
          { label: "Blocked drain", value: "Shows up as a prove-switch fault. Water backs into the header box and kills the differential. Check the drain before condemning a switch." }
        ]
      }
    ],
    checklist: "furnace90"
  },

  {
    brand: "Lennox",
    model: "G61MP / G61MPV",
    equip: "Gas Furnace",
    summary: "90%+ two-stage. MPV is the variable-speed variant.",
    match: ["G61MP", "G61MPV", "G61MPVT", "G61", "G61MP-36B-045", "G61MP-36B-070",
            "G61MP-48C-090", "G61MP-60C-090", "G61MP-48C-110", "G61MP-60C-110",
            "G61MP-60D-135"],
    source: "Lennox Service Literature Corp. 0308-L6, rev. 11-2006",
    flags: [
      {
        title: "It overfires while you measure manifold pressure",
        body: "The procedure has you disconnect the burner-box sensing hose from the gas valve — that's what makes the reading valid and also what makes it overfire. Get the number and shut it down. Do not clock the meter during this test; the rate will be wrong. Clock during normal operation."
      },
      {
        title: "Two stages means two readings",
        body: "Check manifold on low fire and again on high fire. Separate adjustment screws, both under caps."
      }
    ],
    groups: [
      {
        title: "Flame signal",
        rows: [
          { label: "Board 46M99", value: "Normal > 0.23 µA · Low < 0.22 · Drop out 0.16", key: true },
          { label: "Board 100869", value: "Normal > 1.50 µA · Low < 1.40 · Drop out 0.20", key: true },
          { label: "Ignitor, board 46M99", value: "10.9 – 19.7 Ω" },
          { label: "Ignitor, board 100869", value: "25 – 47 Ω — a good ignitor ohmed against the 46M99 spec gets condemned", key: true }
        ]
      },
      {
        title: "Gas",
        rows: [
          { label: "Manifold, natural", value: "Low fire 1.7\" w.c. · High fire 3.5\" w.c.", key: true },
          { label: "Manifold, LP", value: "Low fire 4.9\" w.c. · High fire 10.0\" w.c." },
          { label: "Supply pressure, natural", value: "4.5 – 10.5\" w.c.", key: true },
          { label: "Supply pressure, LP", value: "11.0 – 13.0\" w.c." },
          { label: "Orifice, natural", value: ".089\"" },
          { label: "Gas valve", value: "Honeywell VR8205 or White Rodgers 36E, two-stage" },
          { label: "Max CO", value: "100 ppm", key: true },
          { label: "CO₂ % high heat, natural", value: "045/070: 6.5–7.5 · 090: 6.9–7.9 · 110: 7.2–8.2 · 135: 7.4–8.4" },
          { label: "CO₂ % low heat, natural", value: "045/070: 4.8–5.8 · 090: 5.1–6.1 · 110: 5.3–6.3 · 135: 5.7–6.7" }
        ]
      },
      {
        title: "Clocking the meter — seconds per revolution, natural",
        rows: [
          { label: "1 cu ft dial", value: "-045: 82 · -070: 55 · -090: 41 · -110: 33 · -135: 27", key: true },
          { label: "2 cu ft dial", value: "-045: 164 · -070: 110 · -090: 82 · -110: 66 · -135: 54" }
        ]
      },
      {
        title: "Air",
        rows: [
          { label: "Max external static", value: "0.8\" w.c. — higher than the G51, don't carry the number over", key: true },
          { label: "Temperature rise", value: "Separate high-fire and low-fire ranges. Read the rating plate." },
          { label: "Blower-off delay target", value: "Supply air 90–110°F at dropout" },
          { label: "Speed taps", value: "HI HEAT / LO HEAT / COOL on the SureLight board; park the unused lead" }
        ]
      },
      {
        title: "Safeties",
        rows: [
          { label: "Rollout S47", value: "Opens 250°F, manual reset, two switches" },
          { label: "Secondary limits S21", value: "Two of them, 125°F auto reset, behind blower housing" },
          { label: "Backup secondary S113", value: "090 / 110 / 135 only — inducer mounted, 142°F" },
          { label: "Prove switches", value: "045/070 use two switches. 090/110/135 use dual assemblies with separate first- and second-stage setpoints." }
        ]
      }
    ],
    checklist: "furnace90"
  },

  // ---------------------------------------------------------------- DAIKIN
  {
    brand: "Daikin",
    model: "DM96VC / DC96VC",
    equip: "Gas Furnace",
    summary: "96% two-stage, communicating capable",
    match: ["DM96VC", "DC96VC", "DM96", "DC96", "DM96VC0403BN", "DM96VC0603BN",
            "DM96VC0803BN", "DM96VC0804CN", "DM96VC1005CN", "DM96VC1005DN",
            "DM96VC1205DN", "DC96VC0403BN", "DC96VC0603BN", "DC96VC0804CN",
            "DC96VC1005CN", "DC96VC1205DN"],
    source: "Daikin Installation Instructions IOD-2008N, 02/2022",
    flags: [
      {
        title: "Supply pressure max is 10.0\" w.c., not 13\"",
        body: "A house at 11\" w.c. is inside spec on a Lennox G51 and OVER MAX on this. If you carry the Lennox number over you will walk right past an overfire. Check it with every other gas appliance in the house running."
      },
      {
        title: "The drain trap is internally partitioned — prime BOTH sides",
        body: "Add water to both inlet ports until it shows at both sides of the outlet. Daikin says an unprimed trap hurts combustion quality and pressure switch action, so a half-primed trap comes back as a nuisance pressure switch fault that reads like a bad switch."
      },
      {
        title: "Don't chase microamps here",
        body: "On the Daikin modulating units the manual states outright that reading flame signal with a microamp meter isn't reliable or consistent and isn't recommended practice — the board carries its own low-flame warning. Read the status code instead. This is the opposite of the Lennox procedure."
      }
    ],
    groups: [
      {
        title: "Gas",
        rows: [
          { label: "Manifold, natural", value: "High stage 3.5\" w.c. · Low stage 1.9\" w.c.", key: true },
          { label: "Manifold, propane", value: "High stage 10.0\" w.c. · Low stage 6.0\" w.c." },
          { label: "Orifice, natural", value: "#45" },
          { label: "Orifice, propane", value: "1.25 mm (LPM-08 kit — supports both Honeywell and White-Rodgers 2-stage valves)" },
          { label: "Supply pressure, natural", value: "4.5 – 10.0\" w.c.", key: true },
          { label: "Supply pressure, propane", value: "11.0 – 13.0\" w.c." },
          { label: "Altitude", value: "Factory config good 0–7000 ft on natural. Above 7000 ft see the spec sheet — and use 3\" venting." }
        ]
      },
      {
        title: "Air and electrical",
        rows: [
          { label: "Return air temperature", value: "Must be 55–100°F entering the furnace while heating", key: true },
          { label: "Ground check", value: "Power off. Neutral (white) to any burner should read 10 Ω or less.", key: true },
          { label: "Confined space ventilation", value: "Two openings, 0.25 sq in free area per 1,000 BTU/hr input. One within 12\" of top, one within 12\" of bottom." },
          { label: "Single-stage t-stat step-up", value: "Fixed 5 min, or AUTO which averages the last three cycles and picks 1–12 min. Know which is set before you diagnose \"won't go to high fire.\"" }
        ]
      },
      {
        title: "Venting and drain",
        rows: [
          { label: "Vent slope", value: "1/4\" per foot back toward the furnace" },
          { label: "Vent support", value: "Every 3–5 ft on horizontal runs" },
          { label: "Vent insulation", value: "1/2\" closed cell foam anywhere it sees below 35°F for extended periods" },
          { label: "Drain trap clearance", value: "5-1/2\" below the furnace on horizontal installs" },
          { label: "Qualified-servicer items", value: "Condensate trap and drain system, flame sensor, flue passages" }
        ]
      }
    ],
    checklist: "furnace90"
  },

  // --------------------------------------------------------------- CARRIER
  {
    brand: "Carrier",
    model: "59TP6",
    equip: "Gas Furnace",
    summary: "Two-stage variable speed ECM multipoise condensing",
    match: ["59TP6", "59TP6A", "59TP6B", "59TP6C", "59TP", "59TN6", "59TN6C"],
    source: "Carrier 59TP6C Installation, Start-up, Operating and Service and Maintenance Instructions",
    flags: [
      {
        title: "There is no single manifold pressure number",
        body: "Lennox and Daikin publish one value. Carrier publishes a table — orifice size and manifold pressure keyed to gas input rate, and the natural gas figures already compensate for BOTH altitude and gas heating value. Look it up for this unit's input rate every time. Table 26."
      },
      {
        title: "A sooted heat exchanger gets replaced, not cleaned",
        body: "With heavy soot and carbon, Carrier calls for replacing both primary and secondary heat exchangers rather than cleaning, because of the intricate design. Different answer than the Lennox units, which have a documented cleaning procedure. And soot is a symptom — find the cause first or you'll soot the new one too."
      }
    ],
    groups: [
      {
        title: "Gas",
        rows: [
          { label: "Manifold pressure", value: "Table 26, by input rate + altitude + heating value. Not a fixed number.", key: true },
          { label: "Table basis", value: "20,000 BTUH high heat / 13,000 BTUH low heat per burner, derated 2% per 1,000 ft above sea level" },
          { label: "Adjustment", value: "Gas valve regulator adjustment screws, to the proper low and high fire input rates" },
          { label: "Clocking the meter", value: "Gas valve ON/OFF switch to OFF first, then loosen the set screw on the manifold tower pressure tap" }
        ]
      },
      {
        title: "Air",
        rows: [
          { label: "Temperature rise", value: "Furnace sets its own airflow to hold rise in range", key: true },
          { label: "If rise is out of range", value: "Check in this order: gas input · altitude derate · duct restrictions · setup switch SW1-3" },
          { label: "Blower off delay", value: "DIP switches SW-7 and SW-8, per Table 19" }
        ]
      },
      {
        title: "Diagnostics",
        rows: [
          { label: "Status code LED", value: "Amber, on the blower door. Two digits — short flashes give the first, long flashes the second.", key: true },
          { label: "Continuous ON", value: "Control has 24VAC" },
          { label: "Rapid flashing", value: "Reversed line voltage polarity, or the furnace isn't grounded", key: true },
          { label: "59TP6C only", value: "On-board 3-digit LCD with pushbutton navigation, plus NFC for reading and adjusting from a phone" },
          { label: "Safety controls", value: "Flame sensor, gas valve and pressure switch verify during start-up. Main limit switch is checked separately." }
        ]
      },
      {
        title: "Soot causes — check all of these before quoting a heat exchanger",
        rows: [
          { label: "1", value: "Improper manifold pressure adjustment" },
          { label: "2", value: "Insufficient or poor quality combustion air" },
          { label: "3", value: "Improper vent termination" },
          { label: "4", value: "Incorrect size or damaged manifold orifice" },
          { label: "5", value: "Improper gas" },
          { label: "6", value: "Restricted heat exchanger" }
        ]
      }
    ],
    checklist: "furnace90"
  },

  {
    brand: "Carrier",
    model: "58 series (80%)",
    equip: "Gas Furnace",
    summary: "80% AFUE non-condensing, 4-way multipoise. 58SB0B/58SB1B and 58SC0B/58SC1B current; 58STA/58STX older.",
    match: ["58SB0B", "58SB1B", "58SC0B", "58SC1B", "58SB0", "58SC0", "58STA",
            "58STX", "58SU0A", "58SU0B", "58SP0A", "58CVA", "58CU0", "58MVC", "58"],
    source: "Carrier 58STA/58STX and 58SB0B/58SC0B Installation, Start-up, Operating and Service and Maintenance Instructions",
    flags: [
      {
        title: "This is a different machine, not a smaller 59",
        body: "No condensate. No trap to prime, no drain hoses, no vent-drain elbow, no blocked-drain-masquerading-as-a-pressure-switch. Half the 90% checklist doesn't apply — and what replaces it is venting, which is where the danger is."
      },
      {
        title: "The spillage check is the job on an 80%",
        body: "When an 80% shares a flue with a gas water heater, anything that changes house pressure can leave the water heater orphaned in an oversized vent that won't draw. Run worst-case depressurization: close windows and doors, run the dryer and every exhaust fan on high, fire the water heater alone, check for spillage at the draft hood after 5 minutes. No equivalent on the 90% units."
      }
    ],
    groups: [
      {
        title: "vs the 59TP6 — don't carry numbers across",
        rows: [
          { label: "Vent", value: "Metal, Category I, natural draft up a flue (59TP6: sealed PVC, positive pressure)", key: true },
          { label: "Common vented with a water heater", value: "Possible and common — must be checked (59TP6: never)", key: true },
          { label: "Condensate", value: "None (59TP6: trap, hoses, drain, freeze protection)" },
          { label: "Altitude derate", value: "4% per 1,000 ft (59TP6: 2% per 1,000 ft)", key: true },
          { label: "Table basis, 58STA/STX", value: "22,000 BTUH per burner on Table 12 · 21,000 BTUH per burner on Table 13" }
        ]
      },
      {
        title: "Gas",
        rows: [
          { label: "Manifold pressure", value: "Off the table, indexed by input rate, altitude, gas heat value AND specific gravity (0.58 / 0.60 / 0.62 / 0.64). Don't eyeball it.", key: true },
          { label: "Igniter warm-up, 58STA", value: "17 seconds after prepurge, then trial for ignition" }
        ]
      }
    ],
    checklist: "furnace80"
  },

  // ---------------------------------------------------------------- TRANE
  {
  brand: "Trane",
  model: "S9V2-VS (also sold as American Standard Gold S9V2 — same model prefixes, no separate AS numbering on this platform)",
  equip: "Gas Furnace",
  summary: "96%+ AFUE 2-stage condensing furnace, variable-speed ECM blower + variable-speed inducer, sealed PVC direct/non-direct vent",
  match: ["S9V2", "S9V2B040U3VSAC", "S9V2B060U3VSAC", "S9V2B080U4VSAC", "S9V2C100U4VSAC", "S9V2D120U5VSAC", "American Standard Gold S9V2"],
  source: "Trane S9V2 Installer's Guide 18-CE19D1-1B-EN (Feb 2022). Flame-sense/ignitor values cross-verified against Trane S9X-series Service Facts and S8V2 IOM — same-generation IFC board and silicon-nitride ignitor.",
  flags: [
    { title: "Adjust 2nd stage BEFORE 1st stage", body: "The White-Rodgers 36J valve has separate HI (2nd stg) and LO (1st stg) regulator screws. Trane's procedure explicitly requires setting 2nd stage first, then 1st — reversing the order throws off the low-fire setting relative to high-fire." },
    { title: "Temp rise / external static are NOT in the Installer's Guide", body: "The guide states airflow-vs-static and temp-rise tables are in the Service Facts accompanying the furnace — model/tap-specific, not republished. Pull the Service Facts or rating plate for the exact unit; don't reuse a number from a similar model." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, natural (2nd stg / 1st stg)", value: "3.5\" w.c. / 1.7\" w.c.", key: true },
      { label: "Manifold, LP (2nd stg / 1st stg)", value: "10.0\" w.c. / 6.0\" w.c.", key: true },
      { label: "Supply pressure, natural", value: "5.0 – 13.8\" w.c." },
      { label: "Supply pressure, LP", value: "10.0 – 13.8\" w.c." },
      { label: "Orifice (sea level)", value: "Drill #45 natural, #56 propane — all inputs 40–120 MBH" },
      { label: "Gas valve", value: "White-Rodgers 36J, 2-stage" },
      { label: "High altitude derate", value: "Above 2,000 ft: reduce input 4% per 1,000 ft; NG manifold re-check 3.0–3.7\" w.c.; LP always needs an orifice change at altitude" },
      { label: "Max CO", value: "Not published by Trane — verify with a calibrated combustion analyzer against code limits; do not assume a fixed ppm number", key: true }
    ] },
    { title: "Air", rows: [
      { label: "Max external static", value: "see rating plate / Service Facts (model- and blower-tap-specific)" },
      { label: "Temperature rise", value: "see rating plate / Service Facts (model-specific range)" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Flame current", value: "0.75–3.0 µA DC normal (1 VDC = 1 µA across the two FP pads on the IFC); fault logged below 0.5 µA DC", key: true },
      { label: "Ignitor", value: "Silicon nitride HSI; 37–70 Ω cold resistance at ~75°F" },
      { label: "Status display", value: "7-segment LED on IFC; Menu+Option held 5s clears last 6 faults, 15s = factory reset" }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout", value: "Manual-reset (red button); fixed trip temperature not published — OEM part only" },
      { label: "Limit", value: "Auto-reset primary limit; trip setpoint stamped on the rating plate, not in the Installer's Guide" }
    ] }
  ],
  checklist: "furnace90"
  },
  {
  brand: "Trane",
  model: "S8B1 / S8X1 (also American Standard Silver S8B1/S8X1)",
  equip: "Gas Furnace",
  summary: "80% AFUE single-stage, Category I induced-draft non-condensing furnace",
  match: ["S8B1", "S8X1", "S8B1A040M3PSC", "S8X1A040M3PSC", "S8B1B060M4PSC", "S8B1B080M4PSC", "S8B1C100M5PSC", "S8B1D120M5PSC", "American Standard Silver S8B1", "American Standard Silver S8X1"],
  source: "Trane S8B1/S8X1/S8X2 Installer's Guide 18-CE16D1-1C-EN (Apr 2021). Flame-sense/ignitor cross-verified against Trane S8V2 IOM — same IFC board/ignitor family.",
  flags: [
    { title: "Single-stage models share the 2-stage valve table — don't use the low-fire column", body: "S8B1/S8X1 fire as a single stage but share this guide (and the White-Rodgers 36J valve) with the 2-stage S8X2. For standard S8B1/S8X1 sizes only the high (2nd-stg) pressure applies (3.5\" w.c. NG, 10.0\" LP) — ignore the low-fire numbers, they're for the S8X2. EXCEPTION: the largest D120 units are listed WITH a second pressure (3.5/1.8\" NG, 10/7.5\" LP) — verify against that unit's Service Facts." },
    { title: "Category I flue — not sealed, not positive pressure", body: "Fan-assisted-combustion furnace venting into a Type B vent or lined chimney sized per NFGC. Removing a companion appliance (old water heater/furnace) often leaves the chimney oversized for this furnace alone — a common flue-gas condensation/corrosion callback. Side-wall power venting needs a listed draft inducer at -0.02\" w.c. barometric relief." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, natural (single stage, non-D120)", value: "3.5\" w.c.", key: true },
      { label: "Manifold, LP (single stage, non-D120)", value: "10.0\" w.c.", key: true },
      { label: "Manifold, D120 (see flag)", value: "3.5\" / 1.8\" w.c. NG, 10\" / 7.5\" w.c. LP — confirm against Service Facts" },
      { label: "Supply pressure, natural", value: "5.0 – 13.8\" w.c." },
      { label: "Supply pressure, LP", value: "11.0 – 13.8\" w.c." },
      { label: "Orifice (sea level)", value: "Drill #45 natural, #56 propane — all models" },
      { label: "Gas valve", value: "White-Rodgers 36J" },
      { label: "High altitude derate", value: "Above 2,000 ft: reduce input 4% per 1,000 ft; NG manifold re-check 3.0–3.7\" w.c.; LP always needs an orifice change at altitude" },
      { label: "Max CO", value: "Not published by Trane — verify with a calibrated combustion analyzer against code limits; do not assume a fixed ppm number", key: true }
    ] },
    { title: "Air", rows: [
      { label: "Max external static", value: "see rating plate / Service Facts (guide defers to Service Facts)" },
      { label: "Temperature rise", value: "see rating plate / Service Facts (rise too high → raise the airflow tap, too low → lower it)" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Flame current", value: "0.75–3.0 µA DC normal; fault logged below 0.5 µA DC", key: true },
      { label: "Ignitor", value: "Silicon nitride HSI; 37–70 Ω cold resistance at ~75°F" },
      { label: "Status display", value: "7-segment LED on IFC (E#.# fault codes); Menu+Option held 5s clears last 6 faults" }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout", value: "Manual-reset (red button); fixed trip temperature not published — OEM part only" },
      { label: "Limit", value: "Auto-reset primary limit; trip setpoint stamped on the rating plate, not in the guide" }
    ] }
  ],
  checklist: "furnace80"
  },

  // ------------------------------------------------------------------ YORK
  {
  brand: "York",
  model: "YP9C / CP9C / LP9C / TP9C (Modulating ECM)",
  equip: "Gas Furnace",
  summary: "96–98% AFUE modulating condensing furnace, 60–120 MBH, continuously modulates 35%–100% firing rate.",
  match: ["York YP9C", "YP9C", "Coleman CP9C", "CP9C", "Luxaire LP9C", "LP9C", "TP9C", "modulating 96", "modulating 98"],
  source: "Johnson Controls Ducted Systems Installation Manual 5750151-UIM-G-0423 (2023); York Technical Guide 538513-YTG-F-1016 (2016)",
  flags: [
    { title: "Manifold pressure is NOT a fixed number — force TEST MODE first", body: "The valve modulates continuously 0.5–3.5\" w.c. (NG) as firing rate slides 35–100%. A snapshot reading means nothing. Hold the board TEST button 1 sec (rapid green LED), call for heat to lock 100% fire; press ERROR once for 35%, twice for 70%, three times back to 100% — set/verify pressure at each locked rate." },
    { title: "Category IV — sealed combustion only, cannot be common-vented", body: "Dedicated 2\" PVC/CPVC/ABS or polypropylene intake+vent. Must NOT tie into a B-vent, chimney, or share with an atmospheric appliance — unlike the 80% TM8Y below (Category I)." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, natural (max/min)", value: "3.5\" w.c. max / 0.5\" w.c. min (100%–35% modulation)", key: true },
      { label: "Manifold, LP", value: "10.0\" w.c. max / 1.6\" w.c. min", key: true },
      { label: "Supply pressure, natural", value: "4.5–10.5\" w.c.; 7\" w.c. minimum to reach rated input", key: true },
      { label: "Supply pressure, LP", value: "8.0–13.0\" w.c.; 11\" w.c. minimum to reach rated input" },
      { label: "Orifice", value: "Natural #45 factory (1030 Btu/cu ft); resize per altitude/rate table if needed" },
      { label: "Altitude derate", value: "Auto-derates via inducer pressure sensor; NFGC 4%/1,000 ft above 2,000 ft; factory orifice table covers to 10,000 ft" }
    ] },
    { title: "Air", rows: [
      { label: "Max external static", value: "1.0\" w.c.; constant CFM to 0.6\", then -2% CFM per 0.1\" from 0.6–1.0\"" },
      { label: "Temperature rise", value: "40–70°F (max input) / 20–50°F (min); 45–75°F / 25–55°F on 100C20 & 120D20 — confirm on rating plate" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Flame sense current", value: "Normal ~3.7 µA DC; low-signal warning < 1.5 µA; lockout at 0.1 µA DC", key: true },
      { label: "Ignitor", value: "HSI; York does not publish an ohm spec — verify by continuity / visible glow" }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout switch", value: "Manual-reset, burner assembly; numeric setpoint not published — OEM p/n only" },
      { label: "Limit switch", value: "High-temp limit + vestibule temperature sensor; setpoint not published" },
      { label: "Pressure sensing", value: "Pressure transducer (primary) + mechanical pressure switch (backup)" }
    ] }
  ],
  checklist: "furnace90"
  },
  {
  brand: "York",
  model: "TM8Y / TM8T / TM8V (Two-Stage 80%)",
  equip: "Gas Furnace",
  summary: "80% AFUE two-stage Category I furnace, 60–120 MBH, independently adjustable high/low-fire gas valve.",
  match: ["York TM8Y", "TM8Y", "TM8T", "TM8V", "TG8S", "80% two-stage York"],
  source: "Johnson Controls Unitary Products Installation Manual 5052632-UIM-D-0217 (2017). TM8Y figures; treat as representative of TM8T/TM8V — verify those against their own literature.",
  flags: [
    { title: "Set HIGH fire before LOW fire — order matters", body: "Genuine two-stage valve with independent HI/LO regulators. To force high fire, jumper W1 to W2 to R on the board; pull the W2 jumper to drop to low fire and set that pressure. Setting low fire first throws off both." },
    { title: "Flame-sense µA thresholds differ from the modulating YP9C board", body: "Normal is still ~3.7 µA DC, but the warning/lockout thresholds on THIS board are 0.28 µA / 0.16 µA — not the 1.5 µA / 0.1 µA figures on the YP9C-family modulating board. Don't cross-apply thresholds between the two platforms." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, natural (Hi/Lo fire)", value: "3.5\" w.c. high / 1.6\" w.c. low (sea level–7,999 ft, 1000 Btu/cu ft)", key: true },
      { label: "Manifold, LP (Hi/Lo fire)", value: "9.8\" w.c. high / 4.0\" w.c. low", key: true },
      { label: "Supply pressure, natural", value: "4.5–10.5\" w.c.; 7\" w.c. minimum to reach rated input", key: true },
      { label: "Supply pressure, LP", value: "8.0–13.0\" w.c.; 11\" w.c. minimum to reach rated input" },
      { label: "Orifice", value: "Natural #45 factory (1030 Btu/cu ft basis)" },
      { label: "Altitude derate", value: "Factory set 0–5,000 ft; above that reset manifold pressure per altitude/heating-value tables (to 9,999 ft); pressure switches unchanged below 5,000 ft unless low-pressure inversions" }
    ] },
    { title: "Air", rows: [
      { label: "Max external static", value: "blower data published to 1.0\" w.c.; do not exceed the rating-plate max" },
      { label: "Temperature rise", value: "High fire 30–60°F (35–65 on 120C20) / Low fire 20–50°F — confirm on rating plate" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Flame sense current", value: "Normal ~3.7 µA DC; low-signal warning 0.28 µA; lockout 0.16 µA DC", key: true },
      { label: "Ignitor", value: "HSI, ~17 sec warm-up (27 on retry); resistance not published — verify continuity / visible glow" }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout switch", value: "Manual-reset, burner assembly; numeric setpoint not published — OEM p/n only" },
      { label: "Limit switch", value: "Auto-reset high-temp limit near the gas valve; 5 trips in one call = 1-hr soft lockout (4 red flashes)" },
      { label: "Pressure switches", value: "Separate 1st- and 2nd-stage mechanical pressure switches (not a transducer)" }
    ] }
  ],
  checklist: "furnace80"
  },

  // --------------------------------------------------------------- GOODMAN
  {
  brand: "Goodman",
  model: "GMES80 / GCES80 (80% single-stage)",
  equip: "Gas Furnace",
  summary: "80% single-stage non-condensing furnace, HSI ignition, White-Rodgers 36J22 valve",
  match: ["GMES80", "GCES80", "AMES80", "ACES80", "VMES80", "VCES80", "GMS8", "GCS8", "GMEC80", "GCEC80"],
  source: "Goodman/Amana IOG-2021B (08/2019) — Installation Instructions for *MES80 & *CES80 Gas Furnace",
  flags: [
    { title: "GMVC/GCVC 96% is a different platform", body: "Goodman/Amana's 96% two-stage GMVC96/GCVC96 share the Daikin DM96VC platform and its figures — use the Daikin DM96VC entry for those, not this one." },
    { title: "HSI is fragile — 37-68 Ω is a room-temp check only", body: "Manual warns: touching the igniter element, rough handling, or vibration can damage it and cause premature failure. Qualified servicer only." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, natural", value: "3.5\" w.c. (range 3.2–3.8\")", key: true },
      { label: "Manifold, LP", value: "10.0\" w.c. (range 9.7–10.3\"), with LPT-03 kit", key: true },
      { label: "Supply pressure, natural", value: "4.5\" min / 10.0\" max w.c." },
      { label: "Supply pressure, LP", value: "11.0\" min / 13.0\" max w.c." },
      { label: "Orifice, natural (0–5500 ft)", value: "#45" },
      { label: "Orifice, LP (0–5500 ft)", value: "#55 (LPT-03 kit)" },
      { label: "Gas valve", value: "White-Rodgers 36J22, single-stage, slow-opening" },
      { label: "Altitude derate", value: "No change 0–5500 ft. Above 5500 ft requires distributor pressure-switch + orifice kit — do NOT increase manifold pressure or re-orifice on your own below 5500 ft" }
    ] },
    { title: "Air", rows: [
      { label: "Max external static", value: "see rating plate (model-specific)" },
      { label: "Temperature rise", value: "see rating plate / spec sheet (model-specific)" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Ignitor resistance (room temp)", value: "37–68 Ω", key: true },
      { label: "Flame sense current", value: "1–3 µA (published; clean with steel wool if signal drops too low)", key: true },
      { label: "Ignitor type", value: "Hot surface igniter (HSI)" }
    ] },
    { title: "Safeties", rows: [
      { label: "Primary limit", value: "Auto-reset temperature sensor, no published numeric cutout" },
      { label: "Rollout limit(s)", value: "Manual-reset temperature sensor, no published setpoint — do not jumper/reset without correcting the cause" },
      { label: "Status display", value: "Single red diagnostic LED, blink-count codes 1–8, plus continuous-flash and steady-on states" }
    ] }
  ],
  checklist: "furnace80"
  },

  // ----------------------------------------------------------------- RHEEM
  {
  brand: "Rheem",
  model: "R97V / R98V / R96V (Prestige EcoNet Modulating)",
  equip: "Gas Furnace",
  summary: "97-98% AFUE modulating condensing furnace, DSI ignition, White-Rodgers servo digital-click modulating valve",
  match: ["R97V", "R98V", "R96V", "U97V", "U98V", "U96V", "RGFG", "RGGE", "R98MV", "R97MV", "Prestige furnace"],
  source: "Rheem G11-555 Rev.6 (R98V spec sheet) + White-Rodgers servo valve instructions 60-102787-05 / 92-106703-01",
  flags: [
    { title: "Digital click-adjustment valve — one click at a time, min 5 sec", body: "Servo/digital valve, not a spring-loaded screw. More than one click before the control acknowledges (min 5 sec + a few to balance) and the valve will no longer adjust — return the wheel to where you started or power-cycle to re-home it." },
    { title: "HIGH fire must be adjusted BEFORE low fire", body: "The doc states this explicitly and in bold. Adjusting low fire first gives an invalid calibration." },
    { title: "Low-fire manifold is much lower than a two-stage — 0.56\" w.c.", body: "Modulating low-fire (40%) NG manifold is only 0.56\" w.c. — not the ~1.8\" you'd expect on a two-stage. Reading 0.56\" as 'underfired' here is a misdiagnosis." },
    { title: "Altitude derate is 2%/1000 ft, not 4%", body: "Modulating furnaces use a 2% derate above 2000 ft with dedicated kits (RXGY-F53…-F57, model-specific). Don't apply the 80%-furnace 4%/1000 ft table to this valve." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, high fire (100%) NG", value: "3.5\" w.c. (±.3)", key: true },
      { label: "Manifold, low fire (40%) NG", value: "0.56\" w.c. (±.1)", key: true },
      { label: "Manifold, high fire (100%) LP", value: "10.0\" w.c. (±.5)", key: true },
      { label: "Manifold, low fire (40%) LP", value: "1.60\" w.c. (±.2)" },
      { label: "Supply pressure, natural", value: "5\" min (6–7\" recommended) / 10.5\" max w.c." },
      { label: "Supply pressure, LP", value: "11\" min / 13\" max w.c." },
      { label: "Gas valve", value: "White-Rodgers servo modulating valve, digital click adjustment (64 clicks per direction)" },
      { label: "Altitude derate", value: "2% per 1000 ft above 2000 ft — use model-specific RXGY-F5x kit, NOT the 4%/1000 ft table" },
      { label: "Modulation range", value: "40–100% (2-stage tstat: 40/65/100%)" }
    ] },
    { title: "Air", rows: [
      { label: "Min/Max external static", value: "model-dependent (e.g. .20–1.0\" w.c. on the 060) — confirm on rating plate/spec sheet" },
      { label: "Temperature rise", value: "model-dependent (e.g. 40–70°F high fire on smaller models) — see rating plate" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Ignitor type", value: "PlusOne Direct Spark Ignition (DSI) — not a hot-surface igniter" },
      { label: "Ignitor resistance", value: "not published for DSI — verify spark output/behavior, not ohms" },
      { label: "Flame sense current", value: "board carries its own flame-sense diagnostics and reports via fault code — no fixed µA spec; read the code", key: true }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout switch(es)", value: "manual-reset — no published numeric setpoint" },
      { label: "Limit switch", value: "factory-set, non-adjustable — no published numeric cutout" },
      { label: "Status display", value: "PlusOne dual 7-segment LED, fault codes 10–99; full table via the Rheem/Ruud contractor Bluetooth app on EcoNet models" }
    ] }
  ],
  checklist: "furnace90"
  },
  {
  brand: "Rheem",
  model: "R801 / R802 (80+ Bluetooth Communicating)",
  equip: "Gas Furnace",
  summary: "80% single/two-stage non-condensing furnace, DSI ignition, White-Rodgers two-stage valve, Bluetooth diagnostics",
  match: ["R801", "R802", "R802V", "R802T", "R801T", "R801S", "R801P", "U801", "U802", "R80MP"],
  source: "Rheem 92-24161-173-05 — Installation Instructions, 80+ Two-Stage/Single-Stage Bluetooth Communicating Gas Furnaces",
  flags: [
    { title: "Two-stage valve numbers differ from the modulating R97V/R98V", body: "Conventional two-stage White-Rodgers valve: NG high fire 3.5\"/low fire 1.8\" w.c. Do not confuse with the R97V/R98V modulating valve's 0.56\" low-fire spec — not interchangeable." },
    { title: "0.8\" w.c. is TOTAL system static, not furnace-only max ESP", body: "The manual limits total static of the air distribution system (coil + filter + zoning + ductwork) to 0.8\" w.c. — that is not the same as a model-specific furnace max ESP rating." },
    { title: "Direct spark ignition, not hot-surface", body: "Spark transformer provides ≥12 kV at ~60 Hz. No ohms/resistance spec applies — testing for igniter resistance is the wrong diagnostic on this furnace." }
  ],
  groups: [
    { title: "Gas", rows: [
      { label: "Manifold, NG high fire / single-stage", value: "3.5\" w.c. (±.3)", key: true },
      { label: "Manifold, NG low fire (two-stage)", value: "1.8\" w.c. (±.1)", key: true },
      { label: "Manifold, LP high fire / single-stage", value: "10.0\" w.c. (±.5)", key: true },
      { label: "Manifold, LP low fire (two-stage)", value: "4.9\" w.c. (±.2)" },
      { label: "Supply pressure, natural", value: "5\" min (6–7\" recommended) / 10.5\" max w.c." },
      { label: "Supply pressure, LP", value: "11\" min / 13\" max w.c." },
      { label: "Orifice (sea level, 1050 Btu/ft³ NG)", value: "#42" },
      { label: "Orifice, LP (0–2000 ft)", value: "#54" },
      { label: "Gas valve", value: "White-Rodgers 24V two-stage, slow-opening (2–3 sec to fully open)" },
      { label: "Altitude derate", value: "4% per 1000 ft above 2000 ft — see the NFGC-derived table in the manual; do NOT use it for any 90+ modulating model" }
    ] },
    { title: "Air", rows: [
      { label: "Max total system static", value: "0.8\" w.c. (includes coil, filter, zoning, ductwork)" },
      { label: "Temperature rise", value: "per rating plate; field-adjustable ~+7°F or ~+12°F via dip switches/app" }
    ] },
    { title: "Flame signal / ignition", rows: [
      { label: "Ignitor type", value: "Direct Spark Ignition (DSI)" },
      { label: "Spark transformer output", value: "minimum 12 kV @ ~60 Hz" },
      { label: "Flame sense current", value: "board carries its own flame-sense diagnostics (fault code A126_F etc.) — no fixed µA spec; read the code", key: true }
    ] },
    { title: "Safeties", rows: [
      { label: "Rollout switch(es) (MRLC)", value: "manual-reset — no published numeric setpoint" },
      { label: "Limit control (HALC)", value: "factory-set, non-adjustable — no published numeric cutout" },
      { label: "Status display", value: "Red diagnostic LED, fault code flashed digit-by-digit; full descriptions via the Bluetooth contractor app" }
    ] }
  ],
  checklist: "furnace80"
  },
  // ---------------------------------------------- LENNOX (modulating add-on)
  {
  brand: "Lennox",
  model: "SLP98V (SLP98UHV, Signature modulating)",
  equip: "Gas Furnace",
  summary: "98%+ AFUE modulating (35-100%) variable-speed furnace, SureLight A92 control; manifold pressure sweeps a range by firing rate, not a fixed setpoint.",
  match: ["SLP98V","SLP98","SLP98UH","SLP98UHV","SLP98UH070XV36B","SLP98UH090XV48C","SLP98UH090XV60C","SLP98UH110XV60C","SLP98UH135XV60D","SLP98-070","SLP98-090","SLP98-110","SLP98-135"],
  source: "Lennox Corp. 1029-L7 SLP98UHV Service Literature (rev. 10-2020)",
  flags: [
    { title: "Lock the firing rate before reading manifold pressure", body: "Hold the diagnostic button until the LED shows a solid dash (Field Test Mode). Jumper R to W1 = low fire (35%), R to W1+W2 = high fire (100%), R to W2 = mid fire. All safeties stay live — it does not bypass them." },
    { title: "Manifold pressure is a DIFFERENTIAL reading, not single-port", body: "The burner box runs under negative pressure, so gas-valve output is referenced to burner-box pressure. Put the gauge '+' on the manifold tap and '-' into a tee on the gas-valve regulator vent hose (Lennox kit 10L34). A single-port reading against room air reads wrong on this valve." },
    { title: "Low-fire manifold is far lower than a two-stage's low fire", body: "NG low fire is only 0.4-0.95 in. w.c. (vs 3.0-3.8 at high fire). Techs used to G51/G61 two-stage low-fire won't recognize a healthy reading here." },
    { title: "Burner orifice size is not published", body: "Described only as factory-set, matched to burner input. Order the correct NG or LP kit (65W77 NG<->LP), don't guess a drill size." },
    { title: "Prime the condensate trap before first fire", body: "Pour 10 fl oz (300 mL) into the trap or run the 3-cycle purge. An unprimed trap makes the low-fire pressure switch fail to prove and reads like a bad switch." }
  ],
  groups: [
    { title: "Flame signal", rows: [
      { label: "Board A92 (SureLight variable-capacity)", value: "Normal >= 2.6 µA / Low <= 2.5 µA / Dropout 1.1 µA", key: true },
      { label: "How to read", value: "Field Test Mode shows live flame-signal µA on the 7-segment LED at a locked firing rate" }
    ]},
    { title: "Gas", rows: [
      { label: "Manifold, natural (low fire 35%)", value: "0.4 - 0.95 in. w.c.", key: true },
      { label: "Manifold, natural (high fire 100%)", value: "3.0 - 3.8 in. w.c.", key: true },
      { label: "Manifold, LP (low / high)", value: "1.2 - 2.8 in. w.c. / 9.1 - 10.5 in. w.c." },
      { label: "Supply pressure, natural", value: "4.5 - 10.5 in. w.c. at the gas connection, firing at max rate" },
      { label: "Supply pressure, LP", value: "11.0 - 13.0 in. w.c." },
      { label: "Orifice, burner", value: "see rating plate - not published; factory-matched, order the correct NG/LP kit" },
      { label: "Gas valve", value: "Variable-capacity modulating, internally redundant; brand/PN not published - replace with same type" }
    ]},
    { title: "Air", rows: [
      { label: "Max external static", value: "0.8 in. w.c. heating / 1.0 in. w.c. cooling", key: true },
      { label: "Temperature rise", value: "see rating plate - varies by model (e.g. 35-65°F low / 50-80°F high on most)" }
    ]},
    { title: "Safeties", rows: [
      { label: "Rollout (S47, x2)", value: "N.C. manual-reset, opens 210°F, not adjustable", key: true },
      { label: "Primary limit (S10)", value: "factory-set, not adjustable; trip temp not published - see rating plate" },
      { label: "Pressure switch (high / low fire)", value: "1.00 ± 0.05 / 0.25 ± 0.05 in. w.c. (0-7,500 ft)" },
      { label: "Ignitor", value: "SureLight silicon-nitride HSI, 39 - 70 Ω cold" },
      { label: "Altitude derate", value: "No manifold/orifice change to 10,000 ft. High-altitude pressure-switch kit 14T65 only at 7,501-10,000 ft. LP kit 65W77 at all altitudes." }
    ]}
  ],
  checklist: "furnace90"
  },
  {
  brand: "Lennox",
  model: "SLP99V (SLP99UHV, Signature modulating)",
  equip: "Gas Furnace",
  summary: "99% AFUE modulating variable-speed furnace, SLP98V's successor - same figures EXCEPT the -090-60C submodel has its own manifold/pressure-switch/altitude numbers.",
  match: ["SLP99V","SLP99","SLP99UH","SLP99UHV","SLP99UH070XV36B","SLP99UH090XV48C","SLP99UH090XV60C","SLP99UH110XV60C","SLP99UH135XV60D","SLP99-070","SLP99-090","SLP99-110","SLP99-135"],
  source: "Lennox Corp. 100001 SLP99UHV Service Literature (10/2020)",
  flags: [
    { title: "The -090-60C submodel is the outlier - do not apply the line's numbers to it", body: "SLP99UH090V60C has its own low-fire manifold (0.30-0.85 in. w.c. NG, not 0.4-0.95), its own low-fire pressure-switch setpoint (0.15 ± 0.05, not 0.25 ± 0.05), and its own CO2 targets. Confirm the full model number before comparing against a spec for a different 090." },
    { title: "-090-60C is the ONLY model in either line needing an altitude orifice change", value: "", body: "Every other SLP98V/SLP99V model needs no manifold/orifice change to 10,000 ft. The -09060C needs a burner-orifice change at 4,501-10,000 ft (kits 20A88/20A89) and its own high-altitude pressure-switch kit 20A87 (vs 14T65 for the rest)." },
    { title: "Lock the firing rate before reading manifold pressure", body: "Same Field Test Mode as SLP98V: hold the diagnostic button to a solid dash, then R-W1 (low), R-W1+W2 (high), R-W2 (mid). Safeties stay live." },
    { title: "Manifold pressure is a DIFFERENTIAL reading", body: "Same negative-pressure burner box - '+' on the manifold tap, '-' into the gas-valve regulator vent-hose tee (kit 10L34), not atmosphere." }
  ],
  groups: [
    { title: "Flame signal", rows: [
      { label: "Board A92 (SureLight variable-capacity)", value: "Normal >= 2.6 µA / Low <= 2.5 µA / Dropout 1.1 µA", key: true }
    ]},
    { title: "Gas", rows: [
      { label: "Manifold, natural low fire (all EXCEPT -09060C)", value: "0.4 - 0.95 in. w.c.", key: true },
      { label: "Manifold, natural low fire (-09060C only)", value: "0.30 - 0.85 in. w.c.", key: true },
      { label: "Manifold, natural high fire (all)", value: "3.0 - 3.8 in. w.c." },
      { label: "Manifold, LP (low / high)", value: "1.2 - 2.8 in. w.c. / 9.1 - 10.5 in. w.c." },
      { label: "Supply pressure, natural / LP", value: "4.5 - 10.5 / 11.0 - 13.0 in. w.c." },
      { label: "Orifice, burner", value: "see rating plate - not published; order the correct kit (65W77 general; 20A26/20A88/20A89 for -09060C)" },
      { label: "Gas valve", value: "Variable-capacity modulating, internally redundant; brand/PN not published" }
    ]},
    { title: "Air", rows: [
      { label: "Max external static", value: "0.8 in. w.c. heating / 1.0 in. w.c. cooling", key: true },
      { label: "Temperature rise", value: "see rating plate - model-specific (e.g. 25-55°F low on 090-60C, 35-65°F low on most others)" }
    ]},
    { title: "Safeties", rows: [
      { label: "Rollout (S47, x2)", value: "N.C. manual-reset, opens 210°F, not adjustable", key: true },
      { label: "Primary limit (S10)", value: "factory-set, not adjustable; trip temp not published - see rating plate" },
      { label: "Pressure switch high fire (all)", value: "1.00 ± 0.05 in. w.c. (0-7,500 ft)" },
      { label: "Pressure switch low fire (all / -09060C)", value: "0.25 ± 0.05 / 0.15 ± 0.05 in. w.c. (0-7,500 ft)" },
      { label: "Ignitor", value: "SureLight silicon-nitride HSI, 39 - 70 Ω cold" },
      { label: "Altitude derate", value: "No change to 10,000 ft for all EXCEPT -09060C (burner orifice change at 4,501-10,000 ft). HA pressure-switch kit: 14T65 all models except -09060C (20A87)." }
    ]}
  ],
  checklist: "furnace90"
  },
{
    "brand": "Carrier",
    "model": "25VNA4 (Infinity® 24 with Greenspeed® Intelligence)",
    "equip": "Condenser/Heat Pump",
    "summary": "Variable-speed inverter-driven heat pump, 2-5 tons, R-410A (Puron). Fully communicating (Infinity Control) with an electronic expansion valve for heating metering and UI-guided subcooling charging.",
    "match": [
      "25VNA4",
      "25VNA",
      "Infinity Greenspeed",
      "Infinity 24 heat pump",
      "280A",
      "280ANV",
      "Bryant Evolution Extreme"
    ],
    "source": "25VNA4 Installation Instructions, Carrier Corp. (shareddocs.com/hvac)",
    "flags": [
      {
        "title": "Never remove the inverter cover",
        "body": "Inverter/VFD components underneath are not field-serviceable. The manual explicitly warns the cover should NEVER be removed, and to verify zero voltage at the inverter connections shown on the cover before any nearby work."
      },
      {
        "title": "No low-pressure switch to hunt for",
        "body": "This unit has no physical low-pressure switch. Suction and discharge pressure transducers (P1/P2, 0-620 psig) feed the PCM instead. If low charge or restricted airflow is suspected, work the UI fault/diagnostic log rather than looking for an LPS lead to jump."
      },
      {
        "title": "EXV must be opened before evacuating for service",
        "body": "The heating EXV is a true metering device, not a fixed orifice — if it's closed you cannot pull an effective vacuum on the system. Use the User Interface's EXV-open service function first (per the manual's evacuation procedure)."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": true
          },
          {
            "label": "Metering device",
            "value": "Outdoor EXV-H for heating mode; indoor hard-shutoff Puron TXV, matched to outdoor unit, for cooling mode",
            "key": true
          },
          {
            "label": "Vapor injection EXV",
            "value": "Secondary EXV-VI on some sizes for the vapor-injection circuit, driven closed except in high-ambient cooling / low-ambient heating efficiency mode"
          },
          {
            "label": "Compressor type",
            "value": "Variable-speed inverter — rotary on some sizes, scroll on others (see rating plate); operates only on its factory-matched inverter"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature, UI-selected interval: 30/60/90/120 min or AUTO (default AUTO)"
          },
          {
            "label": "Defrost initiate",
            "value": "Compressor run-time accumulates only while outdoor coil temp is below 35°F; defrost begins once accumulated time reaches the selected interval"
          },
          {
            "label": "Defrost terminate",
            "value": "Outdoor coil temp reaches a model/OAT-dependent termination point, or max defrost time expires, whichever comes first"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling mode (standard Carrier/Bryant convention). On this communicating system the PCM drives it directly — there is no thermostat O terminal to check with a meter",
            "key": true
          }
        ]
      },
      {
        "title": "Pressure Protection & Low-Ambient",
        "rows": [
          {
            "label": "High-pressure switch",
            "value": "Opens at 670 ±10 psig, closes at 470 ±25 psig",
            "key": true
          },
          {
            "label": "Low-pressure switch",
            "value": "Not fitted — see suction/discharge transducer note above",
            "key": true
          },
          {
            "label": "Low-ambient cooling lockout",
            "value": "0°F with Low Ambient enabled in the Infinity Control UI; no accessory kit required"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard; intelligently controlled by the PCM and operates even without an indoor unit/UI installed"
          }
        ]
      },
      {
        "title": "Charging & Diagnostics",
        "rows": [
          {
            "label": "Charging method",
            "value": "UI-guided subcooling charge with target subcooling shown on-screen; do not use the subcooling method outside 65-105°F outdoor temperature"
          },
          {
            "label": "Min circuit ampacity",
            "value": "See rating plate"
          },
          {
            "label": "Status display",
            "value": "5x7 LED matrix plus amber/green status LEDs on the PCM. Active fault codes are stored and recallable from memory (survives a power loss) via the forced-defrost pins"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Standard demand-defrost boards (HK32EA/HK61EA-series, CEPL13xxxx — same family used on Bryant and ICP/Heil/Tempstar). Remove the small plastic cap over the 2-pin 'Forced Defrost' / 'Speed-Up' (TP1/TP2) test header and short the pins with a jumper wire. Momentarily short-and-release once first to clear any compressor anti-short-cycle delay, then re-short and HOLD 5+ seconds — board commands defrost. You should hear the reversing valve shift and see the outdoor fan stop; verify 24V C-to-W2 with a meter. Pull the jumper the instant the valve shifts or the board will hold in speed-up (60x) mode and cycle continuously — don't leave it shorted. If the valve doesn't shift within ~10 sec of the sustained short, board or valve is suspect. Bryant boards are identical; confirm exact pin silkscreen against the installed board revision, since older CEPL revisions label the header 'TEST' and only speed timing rather than instant-force. Source: Carrier/HVAC-Talk field discussion + HVAC Training Solutions defrost-board walkthrough (hvac-talk.com thread 993331; hvactrainingsolutions.net/heat-pump-defrost-control-boards-step-step)."
          },
          {
            "label": "Infinity communicating",
            "value": "On the Infinity touch thermostat, enter the installer 'Checkout' diagnostic (Menu > Setups > Advanced, press and hold Advanced ~10 sec until Install/Service menu appears), then step through the heat pump Checkout routine, which commands the outdoor unit into defrost as part of the sequence. NOT independently re-verified against a current Infinity outdoor-unit Installation Instructions manual for this session, so confirm the exact menu path on the specific control/thermostat model in front of you before relying on it — menu wording has changed across Infinity System Control generations. The physical 2-pin Forced Defrost header on the outdoor board (same as non-comm procedure above) also still works on Infinity outdoor units independent of the thermostat. Source: Carrier documentation as summarized by Hunker 'How To Enter Diagnostic Mode On A Carrier Infinity Thermostat' and JustAnswer HVAC Q&A — treat menu path as a starting point, not gospel."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Coil temperature sensor (DFT) must read cold — Carrier defrost boards generally need the coil sensor closed (roughly below freezing, board-dependent ~30±3°F) before a forced defrost will actually initiate/hold; forcing on a warm coil may not take. When defrost engages: reversing valve shifts to cooling, outdoor fan stops, aux/W2 heat may energize — a burst of cold air from supply registers is normal, not a fault. Warn occupants if testing with the system live."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "25HCB6 (Performance™ 16 2-Stage Heat Pump) / Bryant 286B, 289B (Evolution® Series 2-Stage)",
    "equip": "Condenser/Heat Pump",
    "summary": "Modulated 2-stage scroll heat pump, 2-5 tons, R-410A (Puron). Same compressor/board architecture is sold as Carrier 25HCB6 and as Bryant 286B (PSC outdoor fan) / 289B (ECM outdoor fan).",
    "match": [
      "25HCB6",
      "286B",
      "286BNA",
      "289B",
      "289BNA",
      "Performance 16 heat pump",
      "Evolution series 2-stage"
    ],
    "source": "25HCB6 Installation Instructions (Catalog No. 25HCB6-3SI, Ed. 03/13), Carrier Corp.; 286B/289B Evolution Series Installation Instructions, Bryant Heating & Cooling Systems",
    "flags": [
      {
        "title": "Two different defrost boards share these model names",
        "body": "The 25HCB6 manual (Ed. 03/13) documents an older bulb-type defrost thermostat clipped to a coil stub tube, with fixed dip-switch intervals only (no AUTO option). The Bryant 286B/289B manual documents a newer thermistor (OCT)-based board with an AUTO defrost option. Confirm which board is actually in the unit before assuming AUTO exists, or looking for a stub-tube thermostat that isn't there."
      },
      {
        "title": "Charge is set and checked in HIGH stage only",
        "body": "Both manuals specify the factory charge and rating-plate subcooling target apply to high-stage operation. Checking subcooling while the compressor is running low-stage will read falsely low — force high stage before trusting the number."
      },
      {
        "title": "Replacement control board needs the model plug moved over",
        "body": "On 286B/289B, a replacement (RCD) control board carries no model/serial data. If the board is swapped, the original model plug must be transferred to the new board or the unit will not identify/operate correctly."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": true
          },
          {
            "label": "Metering device",
            "value": "Hard-shutoff Puron TXV required on all indoor coils — do not use an R-22 TXV or a piston/cap-tube indoor coil",
            "key": true
          },
          {
            "label": "Compressor type",
            "value": "Modulated 2-stage scroll; single-speed 2-pole (3500 RPM) motor with internal DC-solenoid unloader — unloaded step is ~67% capacity (~75% cooling/heating capacity at the indoor coil), 100% when loaded"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type (25HCB6 board)",
            "value": "Time/temperature via a bulb-type defrost thermostat on a coil stub tube; field dip-switch interval 30/60/90/120 min, factory default 90 min; terminates on thermostat open or after 10 min max"
          },
          {
            "label": "Defrost type (286B/289B board)",
            "value": "Time/temperature via a coil thermistor (OCT); interval 30/60/90/120 min or AUTO, set by dip switch or Evolution UI; defrost demand = coil at or below 32°F for 4 min; terminates at 65°F coil temp or 10 min max"
          },
          {
            "label": "Quiet Shift-2",
            "value": "Field-selectable dip switch (factory OFF) that delays the compressor roughly 60-70 seconds around defrost start/end to reduce reversing-valve noise"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling mode — O terminal is powered on for a cooling call",
            "key": true
          }
        ]
      },
      {
        "title": "Pressure Protection & Low-Ambient",
        "rows": [
          {
            "label": "High/low pressure switches",
            "value": "Fitted in series with the Y signal to the contactor for protection; exact cutout/cutin psig values are not published in this service literature — see rating plate",
            "key": true
          },
          {
            "label": "Compressor internal relief (IPR)",
            "value": "Vents discharge gas to the compressor shell at a 550-625 psi suction/discharge differential — not a field-serviceable switch"
          },
          {
            "label": "Low-ambient cooling lockout",
            "value": "55°F standard; down to 0°F with a low-ambient accessory kit (25HCB6), or via Evolution Control low-ambient enable on 286B/289B (kit-free — see accessory usage table)"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard on all sizes. On 286B/289B: energized when compressor is off and ambient is below 42°F; 30-min delay before energizing between 42-65°F; stays de-energized above 65°F"
          }
        ]
      },
      {
        "title": "Charging & Diagnostics",
        "rows": [
          {
            "label": "Charging method",
            "value": "Subcooling method, high stage only; factory-charged for 15 ft of lineset, adjust 0.6 oz/ft of 3/8 in. liquid line above/below that; favorable conditions 70-100°F OAT / 70-80°F IAT"
          },
          {
            "label": "Min circuit ampacity",
            "value": "See rating plate"
          },
          {
            "label": "Status display",
            "value": "25HCB6 defrost board: no status LED, dip switches/forced-defrost pins only. 286B/289B: amber STATUS + green COMM LED, flash-code protocol (short flashes = 1st digit, long flashes = 2nd digit)"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Standard demand-defrost boards (HK32EA/HK61EA-series, CEPL13xxxx — same family used on Bryant and ICP/Heil/Tempstar). Remove the small plastic cap over the 2-pin 'Forced Defrost' / 'Speed-Up' (TP1/TP2) test header and short the pins with a jumper wire. Momentarily short-and-release once first to clear any compressor anti-short-cycle delay, then re-short and HOLD 5+ seconds — board commands defrost. You should hear the reversing valve shift and see the outdoor fan stop; verify 24V C-to-W2 with a meter. Pull the jumper the instant the valve shifts or the board will hold in speed-up (60x) mode and cycle continuously — don't leave it shorted. If the valve doesn't shift within ~10 sec of the sustained short, board or valve is suspect. Bryant boards are identical; confirm exact pin silkscreen against the installed board revision, since older CEPL revisions label the header 'TEST' and only speed timing rather than instant-force. Source: Carrier/HVAC-Talk field discussion + HVAC Training Solutions defrost-board walkthrough (hvac-talk.com thread 993331; hvactrainingsolutions.net/heat-pump-defrost-control-boards-step-step)."
          },
          {
            "label": "Infinity communicating",
            "value": "On the Infinity touch thermostat, enter the installer 'Checkout' diagnostic (Menu > Setups > Advanced, press and hold Advanced ~10 sec until Install/Service menu appears), then step through the heat pump Checkout routine, which commands the outdoor unit into defrost as part of the sequence. NOT independently re-verified against a current Infinity outdoor-unit Installation Instructions manual for this session, so confirm the exact menu path on the specific control/thermostat model in front of you before relying on it — menu wording has changed across Infinity System Control generations. The physical 2-pin Forced Defrost header on the outdoor board (same as non-comm procedure above) also still works on Infinity outdoor units independent of the thermostat. Source: Carrier documentation as summarized by Hunker 'How To Enter Diagnostic Mode On A Carrier Infinity Thermostat' and JustAnswer HVAC Q&A — treat menu path as a starting point, not gospel."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Coil temperature sensor (DFT) must read cold — Carrier defrost boards generally need the coil sensor closed (roughly below freezing, board-dependent ~30±3°F) before a forced defrost will actually initiate/hold; forcing on a warm coil may not take. When defrost engages: reversing valve shifts to cooling, outdoor fan stops, aux/W2 heat may energize — a burst of cold air from supply registers is normal, not a fault. Warn occupants if testing with the system live."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "FE4A / FE5A (Infinity® Communicating Fan Coil)",
    "equip": "Air Handler",
    "summary": "Communicating variable-speed fan coil for Puron systems, sizes 002-006 (roughly 1.5-5 ton). Airflow is commanded continuously by the Infinity/Evolution User Interface rather than set with field dip switches.",
    "match": [
      "FE4A",
      "FE5A",
      "FE4ANF",
      "FE4CNF",
      "Infinity fan coil",
      "communicating fan coil"
    ],
    "source": "FE4A/FE5A Communicating Fan Coil Installation Instructions, Form IM-FE4A-01, Catalog No. 63FE-4A0, Carrier Corp./CAC-BDP",
    "flags": [
      {
        "title": "Will not run on a common thermostat",
        "body": "This is a communicating-only fan coil. Wiring a standard R/Y/O/W/G thermostat to it directly does nothing except trigger emergency mode after the 2-minute communications timeout (Status Code 16). Don't troubleshoot it like a conventional non-communicating fan coil."
      },
      {
        "title": "Shallow traps are a documented callback generator",
        "body": "The install manual explicitly illustrates an insufficient shallow trap next to the correct deep trap, and calls out standard P-traps as inadequate. Both the primary AND secondary drain need a properly sized trap, not just the primary."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "ECM, communicating — speed is commanded continuously by the User Interface; no CFM dip switches in normal operation",
            "key": true
          },
          {
            "label": "Nominal airflow",
            "value": "350 CFM/ton nominal; the UI adjusts actual airflow from indoor/outdoor temperature and humidity data",
            "key": true
          },
          {
            "label": "Non-communicating fallback",
            "value": "If communications fail for more than 2 minutes (Status Code 16), the unit runs emergency heat/cool only, via common R, Y, O, W, C thermostat terminals"
          },
          {
            "label": "Max external static",
            "value": "See rating plate / Product Data — not published in this Installation Instructions document"
          }
        ]
      },
      {
        "title": "Metering & Electric Heat",
        "rows": [
          {
            "label": "Metering device",
            "value": "Indoor TXV; must be a Puron TXV — an existing R-22 TXV must be changed out",
            "key": true
          },
          {
            "label": "Electric heat kit range",
            "value": "Factory-authorized, field-installed kits from 5-30 kW; must match the rating-plate-approved kit list"
          },
          {
            "label": "Heat-stage airflow interlock",
            "value": "The fan coil overrides requested airflow up to the published minimum CFM for the installed heater kW whenever electric heat is commanded (see the unit's Airflow Delivery Chart)"
          }
        ]
      },
      {
        "title": "Drain & Filter",
        "rows": [
          {
            "label": "Drain connections",
            "value": "Primary + secondary 3/4 in. FPT — both must be trapped; shallow or standard P-traps are explicitly called out as insufficient",
            "key": true
          },
          {
            "label": "Filter",
            "value": "Factory filter kits (12-pack): KFAFK0212MED (size 002), KFAFK0312LRG (003/005), KFAFK0412XXL (006)"
          },
          {
            "label": "Float switch",
            "value": "Not fitted standard — a field-supplied secondary condensate pan/line is required by code where the unit sits above finished living space"
          }
        ]
      },
      {
        "title": "Diagnostics",
        "rows": [
          {
            "label": "Status LED",
            "value": "Amber STATUS + green COMM + amber MOTOR LED on the control board; same flash-code protocol as the outdoor unit (short flashes = 1st digit, long flashes = 2nd digit)"
          },
          {
            "label": "Common fault codes",
            "value": "16 = system communication fault, 25 = motor/model size mismatch, 26 = invalid heater ID resistor, 41 = blower motor fault, 46 = brownout (secondary voltage below 15 VAC for over 4 sec)"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Carrier",
    "model": "FX4D (Comfort™/Legacy™ Line Fan Coil) — same platform sold as Bryant FB4C / FX4DNF",
    "equip": "Air Handler",
    "summary": "Non-communicating, multi-speed ECM fan coil with tap/dip-switch airflow selection, sizes 019-061. The same physical unit is also sold under the Bryant FB4C and FX4DNF badges.",
    "match": [
      "FX4D",
      "FX4DNF",
      "FB4C",
      "FB4CNF",
      "PF4"
    ],
    "source": "FB4, FE4, FF1E, FH4, FV4, FX4, PF4, FFM Service and Maintenance Instructions, Carrier Corp.",
    "flags": [
      {
        "title": "\"ECM\" badge doesn't mean variable-speed here",
        "body": "The ECM2.3/ECM5.0 motors used in this platform are tap-selected multi-speed motors, not the continuously variable, UI-commanded ECM3.0 used in communicating fan coils like the FE4A. Don't expect Infinity-style auto-adjusting airflow behavior out of an FX4D/FB4C."
      },
      {
        "title": "Sequencer wiring uses first-on/last-off logic",
        "body": "On multi-stage electric heat, sequencer/relay No. 1 is deliberately wired to be first energized and last de-energized, specifically to guarantee the blower brackets every heater element. If the blower cuts out before the heaters do, suspect sequencer wiring before the fan control board."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Multi-speed ECM (ECM2.3 or ECM5.0) with Easy Select board — a fixed-tap motor, not a fully modulating one",
            "key": true
          },
          {
            "label": "Airflow setup",
            "value": "AC/HP SIZE + CFM ADJUST dip switches on the Easy Select board pick the tap: HI = 400 CFM/ton, NOM = 350 CFM/ton, LO = 315 CFM/ton (heat-pump comfort mode runs the LO/315 CFM/ton tap)",
            "key": true
          },
          {
            "label": "Electric-heat-only fallback",
            "value": "With electric heat and no heat pump/AC size selected, the motor slows to roughly 213 CFM/ton on a heat call"
          },
          {
            "label": "Max external static",
            "value": "See rating plate / Product Data — not published in this service manual"
          }
        ]
      },
      {
        "title": "Metering & Electric Heat",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory hard-shutoff (HSO) bi-flow TXV, matched to the outdoor unit; some sister models in this family ship with a piston — verify against the outdoor unit's Puron TXV requirement",
            "key": true
          },
          {
            "label": "Electric heat staging",
            "value": "Mechanical time-delay sequencers/relays staged off W2/W3; first-on/last-off logic keeps the blower running until the last heater element drops out"
          }
        ]
      },
      {
        "title": "Drain & Filter",
        "rows": [
          {
            "label": "Drain connections",
            "value": "Single condensate drain pan/tube; inspect and flush each cooling season, clear restrictions with high-pressure water"
          },
          {
            "label": "Filter",
            "value": "Washable factory filter — rinse with mild detergent, no oiling/coating; replace/clean monthly or as needed"
          },
          {
            "label": "Float switch",
            "value": "Not called out in this service manual — treat as not fitted standard; confirm local code requirement for a field-added float switch or secondary pan"
          }
        ]
      },
      {
        "title": "Coil",
        "rows": [
          {
            "label": "Coil material",
            "value": "Aluminum coil; field repair procedure is documented in the service manual. Do not use caustic drain cleaners near the coil — it will destroy it"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Lennox",
    "model": "XP25",
    "equip": "Condenser/Heat Pump",
    "summary": "Variable-capacity, iComfort Wi-Fi communicating heat pump (Dave Lennox Signature Collection), 2-5 tons, R-410A, check/expansion valve metering.",
    "match": [
      "XP25",
      "SL25XPV",
      "EL18XPV",
      "variable capacity",
      "variable speed",
      "inverter",
      "communicating",
      "icomfort",
      "dave lennox signature",
      "heat pump"
    ],
    "source": "Lennox XP25 Installation Instructions, Corp. 507005-01 (7/2018), LennoxPros.com",
    "flags": [
      {
        "title": "R-410A vs R-454B - verify the nameplate",
        "body": "This XP25 literature (Corp. 507005-01, 7/2018) covers HFC-410A units. Lennox's newer SL25XPV/SL25KCV variable-capacity platform (same iComfort/S40 communicating architecture and outdoor-control board family) has since moved to R-454B (mildly flammable A2L refrigerant) per SL25KCV Installation Instructions 508447-01 (6/2025). Always confirm refrigerant off the actual nameplate before connecting gauges - R-454B calls for A2L-rated hoses/gauges (0-800 psig high side), nitrogen-purge leak searching, and no open-flame leak detection."
      },
      {
        "title": "Fixed pressure-switch and low-ambient lockout figures not published here",
        "body": "The XP25 Installation Instructions do not list fixed HI-PS/LO-PS trip-reset psig values or a low-ambient cooling lockout temperature - the outdoor control reads pressure transducers rather than simple mechanical switches. For those figures, or for detailed alarm/fault codes, consult the XP25 Installation and Service Procedures manual (Corp. 1252-L11) or the unit's charging/alarm label."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "HFC-410A only",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Field-installed check/expansion valve (ordered separately per AHRI match-up)",
            "key": "metering"
          },
          {
            "label": "Factory charge basis",
            "value": "Charged for 15 ft. line set; weigh-in adjust per charging label",
            "key": "factory_charge"
          },
          {
            "label": "Max line set",
            "value": "150 ft. linear / 180 ft. equivalent length; over 150 ft. not recommended",
            "key": "max_line_set"
          },
          {
            "label": "Suction trap",
            "value": "Required at bottom of suction riser when outdoor unit is 5-60 ft. above indoor unit",
            "key": "suction_trap"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost trigger",
            "value": "Frost forms on outdoor coil below 45°F (7°C) ambient during heating",
            "key": "defrost_trigger"
          },
          {
            "label": "Defrost cycle length",
            "value": "Typically 5-15 minutes per cycle; control self-calibrates at start and after each defrost",
            "key": "defrost_length"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Energized = cooling; de-energized = heating (also energized briefly during defrost to run the cycle in cooling)",
            "key": "rv_energized_mode"
          },
          {
            "label": "Charge/100% capacity mode",
            "value": "Forced via S40/iComfort thermostat test mode (Cooling - Maximum Rate Test) or Lennox Dealer Setup App for charging and commissioning",
            "key": "charge_mode"
          }
        ]
      },
      {
        "title": "Pressures & Lockouts",
        "rows": [
          {
            "label": "High/Low pressure switch trip-reset psig",
            "value": "See rating plate / Corp. 1252-L11 Service Procedures (unit uses pressure transducers, not published fixed switch setpoints)",
            "key": "pressure_switch"
          },
          {
            "label": "Low ambient compressor lockout",
            "value": "See rating plate",
            "key": "low_ambient_lockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Present; if equipped and outdoor ambient is below 60°F, energize 24 hrs before startup to prevent compressor slugging",
            "key": "crankcase_heater"
          },
          {
            "label": "Compressor vacuum protector",
            "value": "Some scroll compressors unload (hiss) below 20 psig suction and reset above 40 psig - this is normal, do NOT replace the compressor for this",
            "key": "vacuum_protector"
          }
        ]
      },
      {
        "title": "Charging & Diagnostics",
        "rows": [
          {
            "label": "Charging method",
            "value": "Weigh-in for initial charge, then verify with subcooling method",
            "key": "charging_method"
          },
          {
            "label": "Thermostat offset for charging",
            "value": "Set back 5°F (cooling) or up 5°F (heating) from setpoint so system runs at 100% capacity",
            "key": "charging_offset"
          },
          {
            "label": "Target subcool/approach",
            "value": "See rating plate / unit charging label (coil-match-up specific, no single published number)",
            "key": "target_subcool"
          },
          {
            "label": "Diagnostics",
            "value": "7-segment display + push button on outdoor control shows running capacity and alarm codes; full code list in Corp. 1252-L11",
            "key": "diagnostics"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Lennox Demand Defrost Control boards have a 2-pin 'TEST' header. With the unit running a heating call, jumper the TEST pins for 2–5 seconds then remove — this forces one defrost event. If the jumper stays on TEST longer than 5 seconds, the control ignores it and reverts to normal operation (won't force). To repeat the test, remove the jumper for at least 1 second before reapplying. Source: Lennox heat pump unit service literature (tech.lennoxintl.com/.../507633-01.pdf, 'Demand Defrost Control' section) and corroborating field write-ups."
          },
          {
            "label": "iComfort communicating",
            "value": "From the iComfort Touch/S30 installer Tests screen (Installer program > Tests), select the test set and press Start; the built-in defrost test is a short, self-terminating routine (~30 seconds) distinct from the other 30-minute component tests, per the iComfort Touch Setup manual's troubleshooting/tests section. Exact on-screen menu wording for current S30 firmware not independently re-verified this session — confirm live on the thermostat before using with a customer present. Source: Lennox iComfort Touch Setup Manual, 'Troubleshooting Tips' (lennox.com/dA/3c5cd2b3e6/Lennox_icomfortTouch_Manual.pdf, p.31 via ManualsLib)."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Outdoor coil sensor must be cold enough to be below the board's defrost cut-in (near/below freezing) for the forced cycle to actually engage and hold — on a warm coil the TEST short may be ignored or terminate immediately. Expect the reversing valve to shift to cooling and the outdoor fan to stop when defrost engages; a cold-air burst from supply registers during the test is normal."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "XP16",
    "equip": "Condenser/Heat Pump",
    "summary": "Two-stage, non-communicating heat pump (Elite Series), R-410A, check/expansion valve metering, demand defrost board - figures below are BOARD-specific.",
    "match": [
      "XP16",
      "EL16XP1",
      "ML14XP1",
      "XP14",
      "XP15",
      "HPXA16",
      "two-stage",
      "non-communicating",
      "elite series",
      "heat pump"
    ],
    "source": "Lennox XP16 Series Installation Instructions, Corp. 506420-01 (12/09); Lennox Replacement Defrost Control, Corp. 507633-01 (7/2016), LennoxPros.com",
    "flags": [
      {
        "title": "Defrost termination temp is BOARD-specific",
        "body": "This unit (and related HPXA/XP/SPB families) can carry any of five demand-defrost control boards: 10M8901, 60L3901, 46M8201, 56M8501, or 100135. Factory-shunt defrost termination temperature differs by board family - 90°F on the four older boards, 50°F on the 100135 board. If the shunt is missing, the default also differs (100°F vs 90°F respectively). Confirm the board part number silkscreened on the board before reading the termination-temperature shunt position. Source: Corp. 507633-01."
      },
      {
        "title": "Diagnostic LED codes differ by board",
        "body": "LED fault patterns are NOT interchangeable across board families. The older 10M8901/60L3901/46M8201/56M8501 boards use two red LEDs with one fault-code table; the 100135 board uses a red+green pair with a different, more granular table (it adds discharge-line-temperature fault/lockout codes the older boards don't have). Match the LED behavior to the correct board before troubleshooting."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A only",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Field-installed check/expansion valve (approved for R-410A, ordered separately) - expansion-valve systems only, not for fixed-orifice",
            "key": "metering"
          },
          {
            "label": "Filter drier",
            "value": "Large-capacity biflow, HFC-410A rated only",
            "key": "filter_drier"
          }
        ]
      },
      {
        "title": "Defrost System (board-specific)",
        "rows": [
          {
            "label": "Defrost termination temp - 10M8901/60L3901/46M8201/56M8501 boards",
            "value": "Selectable 70/80/90/100°F; factory shunt set at 90°F; default 100°F if shunt missing",
            "key": "defrost_term_old_boards"
          },
          {
            "label": "Defrost termination temp - 100135 board",
            "value": "Selectable 50/70/90/100°F; factory shunt set at 50°F; default 90°F if shunt missing",
            "key": "defrost_term_100135"
          },
          {
            "label": "Max defrost time",
            "value": "14 minutes; if terminated by time without clearing coil (35°F for 4 min), unit falls back to 30-minute Time/Temp mode",
            "key": "max_defrost_time"
          },
          {
            "label": "Demand defrost trigger",
            "value": "Compressor run > 30 min AND coil-vs-ambient differential exceeds calibrated threshold, OR 6 hrs heating runtime with coil below 35°F (2°C)",
            "key": "demand_defrost_trigger"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Energized = cooling; de-energized = heating. Energized (and outdoor fan off) during the defrost cycle to run briefly in cooling",
            "key": "rv_energized_mode"
          }
        ]
      },
      {
        "title": "Pressure Switches & Lockouts",
        "rows": [
          {
            "label": "High pressure switch (auto reset)",
            "value": "Trip at 590 psig, reset at 418 psig",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch (auto reset)",
            "value": "Trip at 25 psig, reset at 40 psig",
            "key": "lp_switch"
          },
          {
            "label": "Pressure-switch lockout strikes",
            "value": "5-strike (56M8501, 100135 boards) or 3-strike (10M8901, 60L3901, 46M8201 boards) per single Y1 demand; reset by cycling 24V power or shorting TEST pins 1-2 sec",
            "key": "lockout_strikes"
          },
          {
            "label": "Second-stage heating lock-in ambient",
            "value": "Default 40°F (adjustable 40/45/50/55°F via P3 jumper); second stage drops out 5°F above selected lock-in temp",
            "key": "second_stage_lockin"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "See rating plate (not published in Corp. 506420-01)",
            "key": "low_ambient_lockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Present; energize 24 hrs before unit start-up if equipped, to prevent compressor slugging",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Weigh-in for initial charge (nameplate amount + line-set length adjustment + indoor-coil-match-up add charge), then verify with subcooling",
            "key": "charging_method"
          },
          {
            "label": "Target subcooling",
            "value": "See rating plate / unit charging sticker - coil-match-up specific (Tables 3-6, Corp. 506420-01), no single universal value",
            "key": "target_subcool"
          },
          {
            "label": "Charging condition",
            "value": "Second-stage (high-capacity) operation: cooling mode above 60°F ambient (70-80°F return air), heating mode below 60°F ambient (65-75°F return air)",
            "key": "charging_condition"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Lennox Demand Defrost Control boards have a 2-pin 'TEST' header. With the unit running a heating call, jumper the TEST pins for 2–5 seconds then remove — this forces one defrost event. If the jumper stays on TEST longer than 5 seconds, the control ignores it and reverts to normal operation (won't force). To repeat the test, remove the jumper for at least 1 second before reapplying. Source: Lennox heat pump unit service literature (tech.lennoxintl.com/.../507633-01.pdf, 'Demand Defrost Control' section) and corroborating field write-ups."
          },
          {
            "label": "iComfort communicating",
            "value": "From the iComfort Touch/S30 installer Tests screen (Installer program > Tests), select the test set and press Start; the built-in defrost test is a short, self-terminating routine (~30 seconds) distinct from the other 30-minute component tests, per the iComfort Touch Setup manual's troubleshooting/tests section. Exact on-screen menu wording for current S30 firmware not independently re-verified this session — confirm live on the thermostat before using with a customer present. Source: Lennox iComfort Touch Setup Manual, 'Troubleshooting Tips' (lennox.com/dA/3c5cd2b3e6/Lennox_icomfortTouch_Manual.pdf, p.31 via ManualsLib)."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Outdoor coil sensor must be cold enough to be below the board's defrost cut-in (near/below freezing) for the forced cycle to actually engage and hold — on a warm coil the TEST short may be ignored or terminate immediately. Expect the reversing valve to shift to cooling and the outdoor fan to stop when defrost engages; a cold-air burst from supply registers during the test is normal."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "CBA38MV",
    "equip": "Air Handler",
    "summary": "Multi-position variable-speed air handler (Dave Lennox Signature Collection), 1.5-5 tons, R-410A, ECM blower, iComfort communicating control, max 0.80 in. w.g. ESP.",
    "match": [
      "CBA38MV",
      "CBX40UHV",
      "variable speed air handler",
      "ECM",
      "icomfort communicating",
      "air handler"
    ],
    "source": "Lennox CBA38MV Product Specifications, Bulletin No. 210803 (10/2020), LennoxPros.com",
    "flags": [
      {
        "title": "Continuous-fan % and dehumid-ramp jumpers are field-configurable",
        "body": "The continuous-blower-speed DIP switch defaults to 38% of the 2nd-stage COOL speed but is field-selectable to 28/38/70/100%. Separately, the DELAY jumper picks one of four distinct dehumidification ramp profiles (Options 1-4), and blower behavior differs significantly between them. Check both jumper positions before calling a ramping/lag symptom a blower fault."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Motor type",
            "value": "ECM (Electronically Commutated Motor), variable-speed, ramps up/down gradually",
            "key": "motor_type"
          },
          {
            "label": "Speed selection",
            "value": "iComfort communicating control runs 2 of 8 available air volumes; HEAT and COOL speeds each set independently via jumper pins (4 discrete positions per mode)",
            "key": "speed_selection"
          },
          {
            "label": "ADJUST jumper",
            "value": "+10% / normal / -10% fine-tune within the selected HEAT/COOL jumper speed",
            "key": "adjust_jumper"
          },
          {
            "label": "Continuous (constant) fan",
            "value": "DIP-switch selectable at 28%, 38% (factory default), 70%, or 100% of 2nd-stage COOL speed; minimum 250 cfm (450 cfm on -042/048/060)",
            "key": "continuous_fan"
          },
          {
            "label": "Max external static pressure",
            "value": "0.80 in. w.g. (motor has built-in speed/torque limiters beyond this)",
            "key": "max_esp"
          },
          {
            "label": "First-stage cooling airflow",
            "value": "70% of the COOL speed setting",
            "key": "first_stage_airflow"
          },
          {
            "label": "Dehumidification ramp (DELAY jumper)",
            "value": "4 selectable profiles (Options 1-4) that vary blower % and timing during a cooling or heat-pump demand",
            "key": "dehumid_ramp"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Wide-range check/expansion valve, factory installed internal to cabinet, Chatleff-style fitting - 12J18 (018/024, 030), 12J19 (036), 12J20 (042, 048, 060)",
            "key": "metering"
          },
          {
            "label": "Line connections",
            "value": "Suction/vapor 3/4\" (018/024-036), 7/8\" (042-060); liquid 3/8\" all sizes",
            "key": "line_connections"
          }
        ]
      },
      {
        "title": "Filter & Drain",
        "rows": [
          {
            "label": "Filter",
            "value": "Disposable 1\" - (1) 20x20x1 (018/024-036), (1) 20x24x1 (042-060)",
            "key": "filter"
          },
          {
            "label": "Drain pans",
            "value": "Anti-microbial dual-position drain pans for upflow/downflow/horizontal",
            "key": "drain_pans"
          },
          {
            "label": "Condensate connections",
            "value": "(2) 3/4\" fpt",
            "key": "condensate"
          }
        ]
      },
      {
        "title": "Electric Heat (EvenHeater)",
        "rows": [
          {
            "label": "Stages",
            "value": "Up to 3 conventional stages standard, or up to 4 stages via EvenHeater control",
            "key": "heat_stages"
          },
          {
            "label": "EvenHeater target discharge temp",
            "value": "Jumper-selectable 85°F / 100°F / 115°F / 130°F; factory default 85°F",
            "key": "evenheater_target"
          },
          {
            "label": "EvenHeater sensor requirement",
            "value": "Requires optional Discharge Air Temperature Sensor (88K38)",
            "key": "evenheater_sensor"
          },
          {
            "label": "kW range",
            "value": "4-25 kW depending on model/circuit configuration",
            "key": "kw_range"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Lennox",
    "model": "CBA25UH",
    "equip": "Air Handler",
    "summary": "Multi-position air handler (MERIT Series), 1.5-5 tons, R-410A - PSC blower on 018-042, Constant Torque ECM on 048/060; max 0.50 in. w.g. ESP.",
    "match": [
      "CBA25UH",
      "CBX25UH",
      "PSC air handler",
      "fixed speed",
      "constant torque",
      "merit series",
      "air handler"
    ],
    "source": "Lennox CBA25UH MERIT Series Product Specifications, Bulletin No. 210814 (6/2020), LennoxPros.com",
    "flags": [
      {
        "title": "Blower motor type is size-specific",
        "body": "Only the -048 and -060 (4- and 5-ton) models use a programmable Constant Torque ECM blower with 5 speeds. Every smaller size (018 through 042) uses a plain multi-speed PSC motor with 3 fixed speeds (High/Medium/Low) changed by moving a wire tap, not electronically. A 'soft ramp' symptom on an 018-042 unit is not a blower fault - that behavior doesn't exist on PSC. Confirm size before troubleshooting."
      },
      {
        "title": "Lower max static than the variable-speed CBA38MV - don't reuse duct specs",
        "body": "Published blower performance data stops at 0.50 in. w.g. ESP on CBA25UH, versus 0.80 in. w.g. on the CBA38MV variable-speed platform. Don't carry over static-pressure design assumptions between the two lines."
      }
    ],
    "groups": [
      {
        "title": "Blower (motor type differs by size)",
        "rows": [
          {
            "label": "018-042 models",
            "value": "Multi-speed PSC (Permanent Split Capacitor) motor, 3 fixed speeds (High/Medium/Low); speed changed by wiring tap",
            "key": "blower_018_042"
          },
          {
            "label": "048 & 060 models",
            "value": "Constant Torque ECM blower motor, 5 programmable speeds (High/Med-High/Med/Med-Low/Low)",
            "key": "blower_048_060"
          },
          {
            "label": "Max external static pressure tested",
            "value": "0.50 in. w.g.",
            "key": "max_esp"
          },
          {
            "label": "Time-delay blower relay",
            "value": "1-second ON delay before cooling/continuous-fan start; 45-second OFF delay after",
            "key": "blower_relay_delay"
          },
          {
            "label": "Not present on this platform",
            "value": "No continuous-fan %, ADJUST jumper, or dehumidification-ramp jumper (those are CBA38MV/iComfort-only features)",
            "key": "missing_features"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Wide-range check/expansion valve, factory installed internal to cabinet, Chatleff-style fitting - same style as CBA38MV but a different catalog part number; confirm via AHRI match-up",
            "key": "metering"
          },
          {
            "label": "Line connections",
            "value": "Suction/vapor 3/4\" (018-030), 7/8\" (036-060); liquid 3/8\" all sizes",
            "key": "line_connections"
          }
        ]
      },
      {
        "title": "Filter & Drain",
        "rows": [
          {
            "label": "Filter",
            "value": "Disposable 1\" - 15x20x1 (018-030), 18x20x1 (036-060)",
            "key": "filter"
          },
          {
            "label": "Drain pans",
            "value": "Anti-microbial dual-position drain pans",
            "key": "drain_pans"
          },
          {
            "label": "Condensate connections",
            "value": "(2) 3/4\" fpt",
            "key": "condensate"
          },
          {
            "label": "Downflow",
            "value": "Requires optional Downflow Conversion Kit - not shipped downflow-ready (ships upflow/horizontal left-hand)",
            "key": "downflow"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "kW range",
            "value": "4-20 kW",
            "key": "kw_range"
          },
          {
            "label": "Elements",
            "value": "Standard nichrome helix elements with thermal sequencer relay; no EvenHeater discharge-temp targeting on this platform",
            "key": "elements"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Trane",
    "model": "XV20i / 4TWV0 (Variable-Speed ComfortLink II Heat Pump)",
    "equip": "Condenser/Heat Pump",
    "summary": "Communicating variable-speed heat pump (Integrated Variable Speed Control/IVSC board, EEV metering, demand defrost). Charge by weigh-in table or the 'Charging Mode-Cooling' subcooling test only — indoor blower MUST be set to 400 CFM/ton for either method. Crankcase-heater wait time is 3 hours (not the usual 1 hr) below 85°F ambient.",
    "match": [
      "XV20i",
      "4TWV0",
      "4TTV0",
      "TWV0",
      "TTV0",
      "4A7V0",
      "A7V0"
    ],
    "source": "Trane Installer's Guide 18-BC89D1-1H-EN, 'Variable Speed ComfortLink II Heat Pumps and Air Conditioners' (models 4TWV0024/036/048/060A1000B, 4TTV0024/036B/048/060/061A1000B), June 2018",
    "flags": [
      {
        "title": "High/low pressure cutout PSIG not published",
        "body": "This Installer's Guide states only 'internal compressor high/low pressure & temperature protection' — no numeric cutout/cutin PSIG values are given. See rating plate or the unit's Service Facts document (shipped inside the outdoor unit control box) for actual setpoints."
      },
      {
        "title": "Reversing valve energized-in state not stated",
        "body": "The guide does not state whether the reversing (SOV) valve is energized in heating or cooling. Verify from the wiring diagram inside the control box cover or the Service Facts document before assuming a default."
      },
      {
        "title": "400 CFM/ton is mandatory for charging",
        "body": "Both the weigh-in method and the subcooling ('Charging Mode-Cooling') method require the indoor blower configured to 400 CFM/ton — the guide flags this twice as 'IMPORTANT.' Charging at any other airflow setting will give an incorrect result."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (PVE oil — variable-speed compressor)",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Electronic Expansion Valve (EEV) — EEV Test available in CDA Control Menu",
            "key": "metering"
          },
          {
            "label": "Oil hygroscopic warning",
            "value": "If system open to atmosphere >4 hrs, compressor oil must be replaced",
            "key": "oilNote"
          }
        ]
      },
      {
        "title": "Operating Range",
        "rows": [
          {
            "label": "Cooling operating range",
            "value": "55°F to 120°F outdoor ambient",
            "key": "coolingRange"
          },
          {
            "label": "Heating operating range",
            "value": "-10°F to 66°F outdoor ambient",
            "key": "heatingRange"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "55°F (per Table 1 Operating Range)",
            "key": "lowAmbientLockout"
          }
        ]
      },
      {
        "title": "Defrost (Demand Defrost)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand defrost — outdoor ambient sensor (ODS-B) + coil sensor (CBS), delta-T logic",
            "key": "defrostType"
          },
          {
            "label": "Defrost enable conditions",
            "value": "Outdoor ambient ≤52°F AND coil temp ≤35°F AND heat/cool demand ≥2 minutes",
            "key": "defrostEnable"
          },
          {
            "label": "Defrost initiation",
            "value": "Occurs once measured Delta-T (ambient minus coil temp) exceeds an adaptive Delta-T initiate value",
            "key": "defrostInitiate"
          },
          {
            "label": "Defrost termination",
            "value": "Terminates on coil temperature per factory/medium/high termination profile (software-version dependent — see chart in guide); forced-defrost override caps at 15 minutes",
            "key": "defrostTermination"
          },
          {
            "label": "Forced defrost test",
            "value": "CDA Control Menu > FRC DFT — system must be running with demand, heat mode only, press ENTER",
            "key": "forcedDefrost"
          }
        ]
      },
      {
        "title": "Crankcase Heater / Startup",
        "rows": [
          {
            "label": "Crankcase heater wait",
            "value": "Wait 3 HOURS before starting unit if outdoor ambient is below 85°F",
            "key": "crankcaseWait"
          },
          {
            "label": "400VDC hazard",
            "value": "Wait 2 minutes after disconnecting power; verify <42VDC at +VDC/-VDC test points before servicing IVSC board",
            "key": "highVoltageHazard"
          }
        ]
      },
      {
        "title": "ComfortLink II / Communicating Status",
        "rows": [
          {
            "label": "Control platform",
            "value": "Integrated Variable Speed Control (IVSC) board + Communicating Display Assembly (CDA), pairs with 850/950/1050 comfort controls",
            "key": "controlPlatform"
          },
          {
            "label": "Status LED (green)",
            "value": "Slow=Standby/Idle, Medium=Call for Capacity, Fast=Power-up delay, Solid=Test Mode, 1 flash/4 sec=Hard Lockout",
            "key": "statusLed"
          },
          {
            "label": "COMM LED (amber)",
            "value": "Slow=device count, Fast (5x/sec)=loss of communication",
            "key": "commLed"
          },
          {
            "label": "Approved indoor matches",
            "value": "TCONT850/TZONE950/TZON1050 controls; TAM9, TAM8C, TEM8 air handlers; S9V2 (relay panel), XC80, XC95m furnaces — Trane coils/air handlers only",
            "key": "approvedMatches"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Approved subcooling method",
            "value": "'Charging Mode-Cooling' test in comfort control Technician Menu ONLY — outdoor 55–120°F, indoor 70–80°F, indoor blower at 400 CFM/ton",
            "key": "chargingMethod"
          },
          {
            "label": "Weigh-in factory charge (HP)",
            "value": "024: 7lb 6oz / 036: 9lb 8oz / 048: 10lb 12oz / 060: 11lb 14oz, plus indoor-coil adder and 0.6 oz/ft line-length multiplier",
            "key": "weighInCharge"
          },
          {
            "label": "Design subcooling value",
            "value": "See rating plate or Service Facts (not a fixed figure in this guide — used with the R-410A charging chart, 8–14°F subcooling columns, 55–125°F liquid temp rows)",
            "key": "designSubcooling"
          },
          {
            "label": "Line length/lift limits",
            "value": "150 ft max length / 50 ft max lift on 5/8\"–7/8\" lines; larger 1-1/8\" vapor line models limited to 80 ft length / 10–25 ft lift depending on model",
            "key": "lineLimits"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Trane/American Standard defrost boards use a TEST_COMMON pin plus separate FRC_DFT and TST pins. Short TEST_COMMON to FRC_DFT for 2 seconds and release to command a forced defrost (remove the short once defrost initiates). Shorting TEST_COMMON to TST instead speeds up all board timings rather than forcing an immediate defrost. Trane boards terminate defrost by their own coil/ambient sensor logic (not a fixed 30/60/90-min accumulator like some other brands), typically within a few minutes once coil temp recovers. Exact pin count/labeling should be confirmed against the board silkscreen for the model in hand. Source: field/trade synthesis of Trane installer manuals (corroborated pin function, not independently re-verified against a specific current PDF this session) — cross-check against the unit's own Installer's Manual defrost-control section before relying on it."
          },
          {
            "label": "ComfortLink II communicating",
            "value": "Verified directly from a Trane variable-speed heat pump Installer's Manual: on the CDA/communicating thermostat (XL824/XL850/XL1050 or ComfortLink II control), navigate CONFIG > CONTROL MENU > FRC DFT > ENTER. System must already be running with an active heat demand from the thermostat — 'FRC DFT TEST' can only be initiated in heat mode. The test has a maximum override/runtime of 15 minutes if it doesn't self-terminate sooner. Source: Trane 4TWV0024A1000A Installer's Manual (assets.unilogcorp.com service manual family), 'Defrost Control (Heat Pump Only)' section, p.26."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Per the same Trane manual, demand defrost is only enabled when the coil temperature sensor (CBS) reports coil temperature at or below 35°F — above that, a forced-defrost command may not actually engage the cycle. When defrost runs: reversing valve shifts to cooling, outdoor fan stops, and a burst of cold air from the supply registers is normal and expected, not a malfunction."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Trane",
    "model": "XR16 / 4TWR6 (Standard Two-Stage Heat Pump)",
    "equip": "Condenser/Heat Pump",
    "summary": "Conventional 24V two-stage (CLIMATUFF 2-stage scroll) heat pump with factory compressor sump heat, timed/temperature-based defrost control (jumper-selectable termination), and standard 15° superheat / subcooling charging methods depending on outdoor ambient. Requires a field jumper change on the air handler terminal strip for correct 2-stage airflow.",
    "match": [
      "XR16",
      "4TWR6",
      "4A6H6",
      "A6H6"
    ],
    "source": "Trane Installer's Guide 18-BC88D1-1, 'Heat Pumps 4TWR6' + Trane Product Data 22-1865-03, 'Split System Heat Pump XR16 4TWR6, 2-5 Tons' (©2011/2012 Trane)",
    "flags": [
      {
        "title": "High/low pressure cutout PSIG not published",
        "body": "Both the Installer's Guide and Product Data state only that 'high and low pressure controls are inherent to the compressor' — no numeric cutout/cutin PSIG figures are given in this literature. See rating plate or Service Facts shipped with the unit."
      },
      {
        "title": "Reversing valve energized-in state not stated",
        "body": "Neither document states whether the switchover (reversing) valve is energized in heating or cooling. Verify against the unit's wiring diagram (legend labels it 'SC' / switchover valve solenoid) before assuming."
      },
      {
        "title": "Required field jumper changes for VS air handler pairing",
        "body": "When matched with a variable-speed (TAM9/TAMG) air handler, the installer MUST remove the factory jumper between R and BK, and ADD a field jumper between R and O, on the air handler terminal strip — 4TWR6 requires 80% airflow on Y1 (low stage) and 100% on Y2 (high stage). Missing this step causes wrong-stage airflow."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV/EEV (indoor-coil side) — AHRI-rated only with TXV/EEV matched indoor coils",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF 2-stage scroll, 70–100% capacity modulation, 1-2 stages",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase Heater",
        "rows": [
          {
            "label": "Low ambient cooling",
            "value": "55°F as shipped (below 55°F requires Application Guide APP-APG013-EN)",
            "key": "lowAmbientCooling"
          },
          {
            "label": "Compressor sump heat",
            "value": "YES — standard factory-installed (per Product Data electrical table)",
            "key": "crankcaseHeater"
          },
          {
            "label": "Startup wait",
            "value": "Wait 1 hour before starting if crankcase heater accessory is used and outdoor ambient is below 70°F",
            "key": "startupWait"
          },
          {
            "label": "Max outdoor operating temp",
            "value": "115°F (cooling)",
            "key": "maxOutdoorTemp"
          }
        ]
      },
      {
        "title": "Defrost Control",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Timed/temperature-initiated defrost control board (DFC) with selectable termination via cuttable Jumper 2 — not explicitly labeled 'demand defrost' in this literature",
            "key": "defrostType"
          },
          {
            "label": "Termination — as shipped",
            "value": ">22°F ambient: terminates at 47°F | 10–22°F: terminates at ODT+25°F | 6–10°F: terminates at 35°F",
            "key": "defrostTermAsShipped"
          },
          {
            "label": "Termination — Jumper 2 cut",
            "value": ">30°F ambient: 47°F | 6–30°F: 70°F | <6°F: 12 min or 35°F, every 3 hrs",
            "key": "defrostTermJumperCut"
          },
          {
            "label": "Forced defrost test",
            "value": "Short FRC_DFT pin to TEST_COMMON pin on defrost board for 2 seconds to initiate",
            "key": "forcedDefrost"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Above 55°F outdoor (cooling)",
            "value": "Subcooling method — use design subcooling from nameplate/Service Facts + Subcool Charging Chart correction (by tonnage, line length, and lift)",
            "key": "chargeAbove55"
          },
          {
            "label": "Below 55°F outdoor (heating)",
            "value": "Superheat method — target 15°F superheat using true suction line temp/pressure (Table 14.3, 15° Superheat Chart)",
            "key": "chargeBelow55"
          },
          {
            "label": "Refrigerant charging chart",
            "value": "R-410A chart keyed to liquid line temp (55–125°F) vs. final subcooling (8–14°F) → target liquid gage PSI",
            "key": "chargingChart"
          },
          {
            "label": "Factory charge (15 ft line)",
            "value": "024: 10lb 3oz | 036: 10lb 8oz | 048: 12lb 9oz | 060: 13lb 3oz",
            "key": "factoryCharge"
          }
        ]
      },
      {
        "title": "Refrigerant Line Limits",
        "rows": [
          {
            "label": "Standard line set",
            "value": "60 ft max length, 25 ft max vertical lift",
            "key": "lineLimits"
          },
          {
            "label": "Leak check pressure",
            "value": "150 PSIG dry nitrogen",
            "key": "leakCheckPsig"
          },
          {
            "label": "Evacuation",
            "value": "≤350 microns, must not rise above 500 microns in 1 minute",
            "key": "evacuation"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Trane/American Standard defrost boards use a TEST_COMMON pin plus separate FRC_DFT and TST pins. Short TEST_COMMON to FRC_DFT for 2 seconds and release to command a forced defrost (remove the short once defrost initiates). Shorting TEST_COMMON to TST instead speeds up all board timings rather than forcing an immediate defrost. Trane boards terminate defrost by their own coil/ambient sensor logic (not a fixed 30/60/90-min accumulator like some other brands), typically within a few minutes once coil temp recovers. Exact pin count/labeling should be confirmed against the board silkscreen for the model in hand. Source: field/trade synthesis of Trane installer manuals (corroborated pin function, not independently re-verified against a specific current PDF this session) — cross-check against the unit's own Installer's Manual defrost-control section before relying on it."
          },
          {
            "label": "ComfortLink II communicating",
            "value": "Verified directly from a Trane variable-speed heat pump Installer's Manual: on the CDA/communicating thermostat (XL824/XL850/XL1050 or ComfortLink II control), navigate CONFIG > CONTROL MENU > FRC DFT > ENTER. System must already be running with an active heat demand from the thermostat — 'FRC DFT TEST' can only be initiated in heat mode. The test has a maximum override/runtime of 15 minutes if it doesn't self-terminate sooner. Source: Trane 4TWV0024A1000A Installer's Manual (assets.unilogcorp.com service manual family), 'Defrost Control (Heat Pump Only)' section, p.26."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Per the same Trane manual, demand defrost is only enabled when the coil temperature sensor (CBS) reports coil temperature at or below 35°F — above that, a forced-defrost command may not actually engage the cycle. When defrost runs: reversing valve shifts to cooling, outdoor fan stops, and a burst of cold air from the supply registers is normal and expected, not a malfunction."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Trane",
    "model": "TAM9 / 4TEE3 (Variable-Speed Modular Multi-Position Air Handler)",
    "equip": "Air Handler",
    "summary": "Variable-speed ECM (Vortica blower) air handler with EEV metering, dual-refrigerant-compatible coil, communicating or 24V control. Airflow is set as CFM/ton in either Constant CFM or Constant Torque mode — Torque mode silently reduces airflow above ~0.3-0.4\" static, a common source of under-delivered CFM if not checked.",
    "match": [
      "TAM9",
      "4TEE3",
      "TAM9A0",
      "AM9"
    ],
    "source": "Trane Product Data 22-1935-1C-EN, 'Variable Speed Modular Multi-position Air Handlers 2-5 Tons' (TAM9A0A24/B30/C36/C42/C48/C60V*1DA), February 2018",
    "flags": [
      {
        "title": "Constant CFM vs. Constant Torque mode changes real airflow",
        "body": "The airflow tables show two values above ~0.3-0.4\" ESP: Constant CFM (holds set point, higher watts) vs. Constant Torque (airflow sags as static rises). Confirm which mode is configured before trusting a nameplate CFM/ton number against measured static."
      },
      {
        "title": "Subcooling target depends on outdoor match, not just this air handler",
        "body": "Design subcooling (8-12°) is listed per specific single/two-compressor two-stage outdoor pairing in the doc's Subcooling Adjustment table — do not use one blanket number across all TAM9 + outdoor combinations without checking the match."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Vortica variable-speed ECM, direct drive, centrifugal, 1/2–1 HP depending on size",
            "key": "blowerType"
          },
          {
            "label": "Airflow setup",
            "value": "CFM/ton entered via Control Display Assembly (CDA); factory default cooling setting varies 400-430 CFM/ton by model",
            "key": "airflowSetup"
          },
          {
            "label": "Airflow modes",
            "value": "Constant CFM mode or Constant Torque mode — status LED blinks once per 100 CFM requested",
            "key": "airflowModes"
          },
          {
            "label": "Max ESP tested",
            "value": "Tables tested to 0.9\" w.g. external static; torque-mode roll-off begins ~0.3\" (smaller units) to ~0.4\" (larger units) w.g.",
            "key": "maxESP"
          },
          {
            "label": "Downflow/horizontal airflow cap",
            "value": "On C48/C60 models, airflow must not exceed 2000 CFM in downflow/horizontal to avoid water blow-off",
            "key": "airflowCap"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Electronic Expansion Valve (EEV), low-ambient and low-superheat compressor protection, dual-refrigerant compatible as shipped",
            "key": "metering"
          },
          {
            "label": "Refrigerant",
            "value": "R-410A, brazed connections",
            "key": "refrigerant"
          },
          {
            "label": "Coil",
            "value": "All-aluminum, patented enhanced fin, integrated slide deck",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Filter & Drain",
        "rows": [
          {
            "label": "Filter",
            "value": "Molded-in 1\" standard filter rail; not furnished — throwaway recommended, sizes 16x20 to 22x20 depending on cabinet width",
            "key": "filter"
          },
          {
            "label": "Drain connection",
            "value": "3/4\" NPT; integrated horizontal drain pans; optional internal condensate switch kit (BAYICSKIT01A)",
            "key": "drain"
          },
          {
            "label": "Freeze/overflow wiring note",
            "value": "Y1 and YO connections must be made as shown for freeze protection and internally-mounted condensate-overflow circuits to function",
            "key": "freezeProtection"
          }
        ]
      },
      {
        "title": "Electric Heat Staging",
        "rows": [
          {
            "label": "Heater range",
            "value": "BAYEAxx series, 4kW to 25kW, 1 to 3 circuits depending on kW (see Heater Attribute Data table for exact MCA/MOP)",
            "key": "heaterRange"
          },
          {
            "label": "Heater config",
            "value": "Heater size must be set in the CDA Configuration Menu",
            "key": "heaterConfig"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Trane",
    "model": "TEM6 (Convertible Air Handler, ECM 16-Speed)",
    "equip": "Air Handler",
    "summary": "Multi-position convertible air handler with a 16-speed (dip-switch selectable Low/Med-Lo/Med-Hi/High) ECM blower — NOT a modulating variable-speed unit like TAM9. Uses a fixed TXV, not an EEV, and requires a remote/external filter (no filter furnished or built-in rail).",
    "match": [
      "TEM6",
      "5TEM6",
      "TEM6A0"
    ],
    "source": "Trane Product Data 22-1907-1J-EN, 'Convertible Air Handlers 1-1/2 - 5 Ton' (TEM6A0B24/B30/C36/C42/C48/D48/C60/D60H*1SB), April 2020",
    "flags": [
      {
        "title": "TXV, not EEV — despite ECM motor",
        "body": "TEM6 uses a fixed Thermal Expansion Valve (Refrigerant Control = TXV in the product data), unlike TAM9's Electronic Expansion Valve. Don't assume EEV diagnostics or EEV test menus apply to this air handler."
      },
      {
        "title": "No furnished filter — remote filter required",
        "body": "Product Data explicitly notes 'Filter Furnished? No' with footnote 'Remote filter required' on every model — unlike TAM9's built-in 1\" filter rail. Confirm a remote filter box/grille is installed, not just the cabinet's own rail."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "ECM, direct drive, 16-speed, centrifugal — dip-switch selectable Low/Med-Lo/Med-Hi/High (SW1-SW4)",
            "key": "blowerType"
          },
          {
            "label": "Airflow setup",
            "value": "Dip switches SW1-SW4 set CFM/ton per outdoor tonnage; separate SW7/SW8 dip switches set auxiliary-heat airflow (Low/Med-Lo/Med-Hi/High nominal CFM)",
            "key": "airflowSetup"
          },
          {
            "label": "Max ESP tested",
            "value": "Airflow tables tested to 0.9\" w.g. external static pressure",
            "key": "maxESP"
          },
          {
            "label": "Minimum heater airflow",
            "value": "Model- and heater-size-specific CFM floor, with-heat-pump vs. without-heat-pump values differ — see Minimum Airflow CFM tables",
            "key": "minHeaterAirflow"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "R-410A Thermal Expansion Valve (TXV) — fixed, not electronic",
            "key": "metering"
          },
          {
            "label": "Refrigerant",
            "value": "R-410A, brazed connections",
            "key": "refrigerant"
          },
          {
            "label": "Coil",
            "value": "All-aluminum, enhanced patented coil fin, horizontal drain pan, draw-through design",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Filter & Drain",
        "rows": [
          {
            "label": "Filter",
            "value": "NOT furnished — remote filter required (no built-in filter rail); optional Slim Fit Filter Box accessory (BAYSF1185/1235/1265AAA)",
            "key": "filter"
          },
          {
            "label": "Drain connection",
            "value": "3/4\" NPT",
            "key": "drain"
          }
        ]
      },
      {
        "title": "Electric Heat Staging",
        "rows": [
          {
            "label": "Heater range",
            "value": "BAYHTR series, 4kW to 25kW, 1-4 circuits depending on kW (see Electrical Data heater tables for MCA/MOP)",
            "key": "heaterRange"
          },
          {
            "label": "Heater pressure drop",
            "value": "0.01-0.14 in. w.g. depending on airflow CFM and number of heater racks (1-4)",
            "key": "heaterPressureDrop"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Subcooling target",
            "value": "13-14° for confirmed 15/16 SEER matches listed in Subcooling Adjustment table; all other matches must be charged per outdoor unit (OD) nameplate",
            "key": "subcoolingTarget"
          },
          {
            "label": "C48/C60 downflow adder",
            "value": "For HP units ≤3.5 tons in downflow, add 4° to OD nameplate subcooling target; 4-5 ton HP and all AC use OD nameplate directly",
            "key": "downflowAdder"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "York",
    "model": "YZV / YZT Affinity Variable-Capacity Communicating Heat Pump (Coleman HC20, Luxaire HL20)",
    "equip": "Condenser/Heat Pump",
    "summary": "R-410A variable-capacity inverter heat pump, 4-wire communicating (HxTM t-stat), factory EEV metering, adaptive demand-defrost. Electronic suction-pressure monitoring in place of a fixed low-pressure switch; HPS is factory-set/non-adjustable.",
    "match": [
      "YZV",
      "YZT",
      "HC20",
      "HL20"
    ],
    "source": "Johnson Controls Unitary Products, York Affinity YZV R-410A Variable Capacity Outdoor Unit Installation Manual, 5284795-UIM-E-1117 (yorknow.com/pub/media/documentation/YZV_Install.pdf)",
    "flags": [
      {
        "title": "York trap: crankcase heater 2-hour wait",
        "body": "IOM CAUTION: if outdoor temp is below 55°F, do not attempt to start the compressor without at least 2 hours of crankcase/stator heat, or the compressor can be damaged. Heater energizes only during the OFF cycle — techs restarting right after a breaker trip or long shutdown commonly skip this wait."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Factory-installed Electronic Expansion Valve (EEV) — matched EEV also used in indoor coil/air handler; no TXV",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Adaptive/Demand Defrost algorithm (not fixed time/temp)",
            "key": "defrost_type"
          },
          {
            "label": "Defrost enable",
            "value": "Coil temp below 35°F while compressor runs begins accumulating defrost time",
            "key": "defrost_enable"
          },
          {
            "label": "Forced defrost interval",
            "value": "After 6 hrs accumulated compressor runtime with no defrost, a defrost is forced; if OD ambient <50°F at that point, forces a 6-min oil-return defrost regardless of coil temp",
            "key": "defrost_forced_interval"
          },
          {
            "label": "Defrost termination",
            "value": "Selectable coil-temp termination 50/60/70/80°F (default 50°F); defrost auto-terminates at 12 min regardless of coil sensor",
            "key": "defrost_termination"
          }
        ]
      },
      {
        "title": "Reversing Valve",
        "rows": [
          {
            "label": "Energized in",
            "value": "Cooling / Defrost (RV energized to enter defrost, since defrost = cooling-mode equivalent; de-energized to terminate defrost and return to heating)",
            "key": "rv_energized"
          }
        ]
      },
      {
        "title": "Pressure Switches / Limits",
        "rows": [
          {
            "label": "High-pressure switch (HPS)",
            "value": "Factory-set, non-adjustable — trip (open) setpoint not published as a numeric spec; IOM troubleshooting table states the control recognizes HPS reset once system pressure drops below 650 PSIG",
            "key": "hps"
          },
          {
            "label": "Low suction pressure (electronic, no discrete LP switch)",
            "value": "Cool: trending limit <90 psi, fault <5 psi. Heat: trending limit <20 psi, fault <5 psi. (Trending must persist 360 sec, or any reading <5 psi for >5 sec, to fault; bypassed 120 sec at startup and around defrost)",
            "key": "low_pressure"
          }
        ]
      },
      {
        "title": "Low-Ambient Operation",
        "rows": [
          {
            "label": "Cooling low-ambient limit",
            "value": "Automatically reduces capacity / cycles off at or below 35°F outdoor ambient",
            "key": "low_ambient_cool"
          },
          {
            "label": "Heating low-ambient limit",
            "value": "Compressor heat available down to -5°F outdoor ambient; size balance point / auxiliary heat accordingly as capacity fades approaching this point",
            "key": "low_ambient_lockout"
          }
        ]
      },
      {
        "title": "Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "Energized only during the OFF cycle to prevent refrigerant migration; see CAUTION flag above for the 2-hour pre-start requirement below 55°F",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charge method",
            "value": "see rating plate — use unit nameplate charge and the superheat/subcooling charge tables in the Product/Technical Guide for the matched indoor coil; do not use remembered figures",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "York/Coleman/Luxaire (Johnson Controls) Demand Defrost Control boards have a 'TEST' pin pair (P3 on some revisions). With a heating call active, jumper the TEST pins for 6+ seconds — defrost engages and continues for as long as the jumper stays in place. While TEST is jumpered, the control ignores actual coil (liquid-line) temperature and outdoor ambient — the coil does NOT need to be cold for the forced test to run. After removing the jumper, defrost terminates normally on its own logic: liquid-line temp reaches 80°F, or after 8 minutes of defrost run time, whichever comes first. Source: Johnson Controls Unitary Products 'Demand Defrost Control' Operation Instructions, part 031-09178-000 / doc 501062-UAI (cdn.master.ca and us-ac.com hosted copies), plus corroborating HVAC-Talk field posts."
          },
          {
            "label": "ComfortNet/Affinity communicating",
            "value": "NOT independently verified this session. The S1-TTSCC01/S1-TTSCC02 Affinity/ComfortNet touchscreen control has a service/diagnostics area, and York field literature references being able to force a defrost cycle through it, but no source located gave the exact on-screen menu path or button sequence. Do not guess the menu steps — pull the specific control's Installation/Operation guide or use the physical TEST-pin method above (works regardless of comm status) if the outdoor unit's board is accessible."
          },
          {
            "label": "Prerequisite / safety",
            "value": "On normal (non-forced) operation, coil temp must be below the board's frost/cut-in threshold before a defrost demand will latch; the TEST-pin forced method above deliberately bypasses that check. When defrost engages: reversing valve shifts to cooling, outdoor fan stops, aux heat may lock in — warn of a normal burst of cold supply air during the test."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "York",
    "model": "AVV Affinity Single-Piece Variable-Speed Communicating Air Handler (Coleman AVV, Luxaire AVV)",
    "equip": "Air Handler",
    "summary": "Single-piece ECM variable-speed, constant-CFM communicating air handler with factory-mounted EEV, matched to YZV/YXV outdoor units via 4-wire HxTM communicating system. Airflow/tonnage is set automatically by the outdoor unit's control, not by field dip switches.",
    "match": [
      "AVV",
      "MVC"
    ],
    "source": "Johnson Controls Unitary Products, York Affinity AVV Single Piece Variable Speed ECM Communicating Air Handler Technical Guide, 5322576-YTG-D-0617 (yorknow.com/pub/media/documentation/AVVtech.pdf); airflow-control note per York YZV Installation Manual 5284795-UIM-E-1117 (yorknow.com/pub/media/documentation/YZV_Install.pdf)",
    "flags": [
      {
        "title": "York trap: EEV harness must be connected before power-up",
        "body": "The indoor EEV ships factory-installed but CLOSED. On a coil/air-handler swap or first startup, the EEV harness must be plugged into the Comm port BEFORE applying power to the indoor unit, then allow 1 minute for the EEV to open before charging/nitrogen work. Powering up first can leave the valve closed and pressures locked out."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Blower motor",
            "value": "High-efficiency ECM, variable-speed, constant-CFM design",
            "key": "blower_motor"
          }
        ]
      },
      {
        "title": "Airflow / CFM Setup",
        "rows": [
          {
            "label": "CFM-per-ton setup",
            "value": "No field dip switches for tonnage — \"the proper airflow is determined by the main outdoor control in the outdoor unit\" over the 4-wire communicating link; unit self-adjusts to hold set CFM from 0.0\" to 0.4\" external static",
            "key": "cfm_setup"
          }
        ]
      },
      {
        "title": "External Static",
        "rows": [
          {
            "label": "Max external static",
            "value": "Not recommended above 0.8\" w.c. (CFM derates 2% per 0.1\" esp from 0.4\"–0.8\"); UL 1995/CSA 22.2 No.236 tested/rated to 0.50\" w.c., dry coil, no filter",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "1\" disposable or permanent, integrated internal filter rack; size varies by model, 16x20x1 up to 22x20x1 (field supplied) — see model chart",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Electric heat kits",
            "value": "Field-installed 208/230V single- or three-phase kits, 5 kW through 25 kW",
            "key": "electric_heat_kw"
          },
          {
            "label": "Staging",
            "value": "Staged via W1-only or W1+W2 per the kW staging table (stage assignment depends on kW size and airflow %)",
            "key": "electric_heat_staging"
          }
        ]
      },
      {
        "title": "Metering / EEV Match",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed EEV, matched to YZV/YXV outdoor units for the communicating system; see trap flag above for commissioning order",
            "key": "metering_match"
          }
        ]
      },
      {
        "title": "Drain / Float Switch",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Standard thermoset, corrosion/UV-resistant primary drain pan (factory)",
            "key": "drain_pan"
          },
          {
            "label": "Float switch",
            "value": "see rating plate — no York-published float-switch spec in this literature; auxiliary/secondary float switch is field-installed per local code, not a factory-published figure",
            "key": "float_switch"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Goodman",
    "model": "GLZS4B Series R-32 Heat Pump (incl. Inverter/variable-capacity models)",
    "equip": "Condenser/Heat Pump",
    "summary": "R-32 (A2L, mildly flammable) heat pump platform. Adjustable-TXV metering, time/temperature defrost with SmartShift compressor delay. Exact inverter model numbers (e.g. GVZC8, GSZV) were not itemized in the source manual reviewed — confirm platform/tier against the unit's own rating plate before servicing.",
    "match": [
      "GLZS4B*",
      "ALZS4B*",
      "GVZC*",
      "AVZC*",
      "GSZV*",
      "GSZC*"
    ],
    "source": "Daikin Comfort Technologies / Goodman \"Condensing Unit / Heat Pump Installation & Service Reference\" (R-32), P/N IOG-4047, Dec 2023 — goodmanmfg.com",
    "flags": [
      {
        "title": "R-32 is an A2L mildly-flammable refrigerant",
        "body": "Use leak detectors listed for A2L refrigerants (non-sparking, intrinsically safe or adequately sealed), recalibrated to 25% of R-32's LFL. No open flame/smoking in the work area; survey for ignition sources before opening the system. Sweep with dry nitrogen during brazing and recover refrigerant before any hot work. Never add anything other than R-32 to an R-32 recovery cylinder."
      },
      {
        "title": "Inverter model numbers not confirmed in this pass",
        "body": "The IOG-4047 reference manual covers the whole R-32 platform generically (\"Condenser / Heat Pump, including all Inverter\") without a model-number nomenclature table. Verify the exact inverter model prefix (GVZC8, GSZV, GSZC, etc.) and its specific service instructions against the unit's rating plate — do not assume it matches the GLZS4B figures below without checking."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (A2L, mildly flammable) — confirm on serial/rating plate",
            "key": "refrigerant"
          },
          {
            "label": "Standing pressure test",
            "value": "Pressurize with dry nitrogen to 450 PSIG, hold 15 min min. (system pressure relief valve must open at no more than 450 psig)",
            "key": "standingPressureTest"
          }
        ]
      },
      {
        "title": "Metering & Charging",
        "rows": [
          {
            "label": "Metering device",
            "value": "Adjustable TXV (indoor coil-dependent) — no field adjustment normally required; confirm with piston kit chart on mixed-match systems",
            "key": "metering"
          },
          {
            "label": "Charge method — TXV subcooling target",
            "value": "8°F ± 1°F subcooling (adjustable-TXV systems)",
            "key": "subcoolingTarget"
          },
          {
            "label": "Charge amount",
            "value": "See rating plate for factory charge; add per line-set length per TP-110 R-32 Long Line Set Application Guide",
            "key": "chargeAmount"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature defrost control, field-selectable intervals",
            "key": "defrostType"
          },
          {
            "label": "Defrost intervals",
            "value": "30 / 60 / 90 min (Region IV units set per interval table in manual)",
            "key": "defrostIntervals"
          },
          {
            "label": "SmartShift compressor delay",
            "value": "Jumper defaults to \"DLY\" (delays compressor at defrost initiation/termination); move to \"NORM\" to disable",
            "key": "smartShift"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "see rating plate / unit wiring diagram — not itemized in this reference manual",
            "key": "reversingValveMode"
          }
        ]
      },
      {
        "title": "Protection & Controls",
        "rows": [
          {
            "label": "High/low pressure cutout-cutin",
            "value": "see rating plate / Service Instructions — not itemized in this reference manual for the R-32 platform",
            "key": "pressureCutouts"
          },
          {
            "label": "Low-ambient cooling lockout",
            "value": "Cooling operation approved above 55°F outdoor ambient; below 55°F requires an approved low-ambient kit (LAKT01 kit cannot be used on ECM-motor outdoor units)",
            "key": "lowAmbientLockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Optional/model-dependent — if equipped, energize 24 hrs before startup",
            "key": "crankcaseHeater"
          },
          {
            "label": "ComfortNet / CoolCloud",
            "value": "Not referenced in this manual for this platform — check PCB/rating plate for communicating-control capability",
            "key": "communicatingControl"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Goodman/Amana/Janitrol PCBDM-series defrost boards (also used re-badged by other brands) commonly require two things at once: 24V present at the board's DFT (defrost thermostat/coil sensor) input — jump R to DFT if the coil isn't actually cold enough to close the sensor — AND a momentary jumper across the board's TEST/'speed-up' pins until you hear the relay click, then remove the TEST jumper. Once triggered, the unit stays in forced defrost (reversing valve to cooling, outdoor fan off, W2 aux heat and O reversing valve energized) until either 24V is removed from DFT or a built-in max defrost time (commonly ~10 minutes) elapses. Exact pin labels/layout vary by PCBDM revision — confirm against the board's own printed legend/wiring diagram before jumping anything; I could not pull a clean OEM PDF this session to confirm the precise pin silkscreen text, so treat pin names as trade-common convention, not a guaranteed exact label. Source: multi-source trade corroboration (HVAC Training Solutions defrost-board guide; JustAnswer and Fixya Goodman-specific Q&A threads) — recommend verifying against the physical board's legend."
          },
          {
            "label": "ComfortNet/ComfortBridge communicating",
            "value": "NOT verifiable this session. Goodman heat pumps are largely designed to run on a simple non-communicating thermostat (single Y/W inputs) even when ComfortBridge-equipped equipment is installed; where a CTK04 ComfortNet communicating control is used, no source located gave a documented force-defrost menu sequence. Do not invent a button sequence — use the non-communicating TEST-pin method on the outdoor board directly, which applies regardless of thermostat type, or consult Goodman's specific literature for the installed CTK04/ComfortNet control."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Normal operation requires the coil/defrost sensor to be closed (cold, roughly at/below freezing) AND accumulated compressor run time to exceed the board's 30/60/90-minute dial setting before defrost will initiate on its own; the forced method above is meant to bypass the run-time requirement but the coil sensor circuit (DFT) still needs 24V present (real cold coil, or a temporary jumper) for the relay to latch on some revisions. Expect reversing valve shift to cooling and outdoor fan shutdown when defrost runs — a cold air burst indoors is normal and temporary."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "GSZ140 (GSZ14) — standard single-stage R-410A heat pump",
    "equip": "Condenser/Heat Pump",
    "summary": "Standard R-410A single-stage heat pump. Piston (Flowrater) metering standard, adjustable TXV on matched TXV indoor coils. Time/temperature defrost with SmartShift. Low-pressure (loss-of-charge) switch was relocated from the liquid line to the suction line in current production — do not assume its location from an old wiring diagram.",
    "match": [
      "GSZ14*",
      "GSZ140*",
      "ASZ14*",
      "ASZ13*",
      "GSZB4*",
      "ANZ13*"
    ],
    "source": "Goodman/Amana \"Service and Troubleshooting: ANX, SSX, ASX, GSX, DSX, VSX Condensing Units, ANZ, SSZ, ASZ, GSZ, DSZ, VSZ Split System Heat Pumps (R-410A)\", RS6200006r103, July 2022 — goodmanmfg.com / amana-hac.com",
    "flags": [
      {
        "title": "GSZB4 not itemized in this manual",
        "body": "GSZB4 is Goodman's multifamily/light-commercial heat pump line and is not one of the model series listed on the cover of RS6200006r103. Its own Instruction Manual describes the same time/temperature defrost with 30/60/90-min field-selectable intervals and SmartShift technology, so the defrost figures below likely apply — but confirm pressure-switch and reversing-valve specifics against GSZB4-specific literature before relying on the numbers in this entry."
      },
      {
        "title": "Low pressure switch location changed across production",
        "body": "Per the manual's revision history, the low-pressure (loss-of-charge) switch was relocated from the liquid line to the suction line as a compressor safeguard on current units. Older units/wiring diagrams may show the liquid-line location — verify physical location on the unit rather than assuming from an old diagram."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Piston (\"Flowrater\") standard; adjustable TXV on matched TXV/ARPT-AEPT-style indoor coils",
            "key": "metering"
          },
          {
            "label": "Charge verification",
            "value": "Superheat/subcooling per Service Manual chart — check nameplate/manual for exact target (not reproduced in reviewed excerpt); see rating plate",
            "key": "chargeVerification"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Solid-state time/temperature defrost control",
            "key": "defrostType"
          },
          {
            "label": "Defrost intervals",
            "value": "Field-selectable 30 / 60 / 90 min",
            "key": "defrostIntervals"
          },
          {
            "label": "SmartShift compressor delay",
            "value": "~30-sec compressor delay at defrost initiation via defrost board jumper (\"DLY\"); move to \"NORM\" to disable",
            "key": "smartShift"
          },
          {
            "label": "Defrost termination override",
            "value": "10-minute maximum defrost override if defrost thermostat doesn't reopen",
            "key": "defrostOverride"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Energized in cooling mode (24V coil at \"O\"); de-energized in heating mode, except momentarily energized during a defrost cycle while in heating",
            "key": "reversingValveMode"
          }
        ]
      },
      {
        "title": "Protection & Controls",
        "rows": [
          {
            "label": "Low pressure (loss-of-charge) switch",
            "value": "Cut-out (open) ≈21 PSIG; auto cut-in (close) ≈50 PSIG — auto-reset",
            "key": "lowPressureSwitch"
          },
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ± 10; closes 420 PSIG ± 25 — auto-reset",
            "key": "highPressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "Factory-installed option on some models — if equipped, energize 24 hrs before startup",
            "key": "crankcaseHeater"
          },
          {
            "label": "ComfortNet / CoolCloud",
            "value": "Not applicable — standard non-communicating 24V R/C/Y/G/O/W2 staging",
            "key": "communicatingControl"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Goodman/Amana/Janitrol PCBDM-series defrost boards (also used re-badged by other brands) commonly require two things at once: 24V present at the board's DFT (defrost thermostat/coil sensor) input — jump R to DFT if the coil isn't actually cold enough to close the sensor — AND a momentary jumper across the board's TEST/'speed-up' pins until you hear the relay click, then remove the TEST jumper. Once triggered, the unit stays in forced defrost (reversing valve to cooling, outdoor fan off, W2 aux heat and O reversing valve energized) until either 24V is removed from DFT or a built-in max defrost time (commonly ~10 minutes) elapses. Exact pin labels/layout vary by PCBDM revision — confirm against the board's own printed legend/wiring diagram before jumping anything; I could not pull a clean OEM PDF this session to confirm the precise pin silkscreen text, so treat pin names as trade-common convention, not a guaranteed exact label. Source: multi-source trade corroboration (HVAC Training Solutions defrost-board guide; JustAnswer and Fixya Goodman-specific Q&A threads) — recommend verifying against the physical board's legend."
          },
          {
            "label": "ComfortNet/ComfortBridge communicating",
            "value": "NOT verifiable this session. Goodman heat pumps are largely designed to run on a simple non-communicating thermostat (single Y/W inputs) even when ComfortBridge-equipped equipment is installed; where a CTK04 ComfortNet communicating control is used, no source located gave a documented force-defrost menu sequence. Do not invent a button sequence — use the non-communicating TEST-pin method on the outdoor board directly, which applies regardless of thermostat type, or consult Goodman's specific literature for the installed CTK04/ComfortNet control."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Normal operation requires the coil/defrost sensor to be closed (cold, roughly at/below freezing) AND accumulated compressor run time to exceed the board's 30/60/90-minute dial setting before defrost will initiate on its own; the forced method above is meant to bypass the run-time requirement but the coil sensor circuit (DFT) still needs 24V present (real cold coil, or a temporary jumper) for the relay to latch on some revisions. Expect reversing valve shift to cooling and outdoor fan shutdown when defrost runs — a cold air burst indoors is normal and temporary."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "AVPTC (ComfortBridge variable-speed air handler)",
    "equip": "Air Handler",
    "summary": "Multi-position variable-speed ECM air handler with ComfortBridge communicating control (CoolCloud app / PCB \"ton\" menu). Airflow MUST be set for non-communicating outdoor units or the PCB will fault to \"IdL\" and the blower won't run for cooling calls.",
    "match": [
      "AVPTC*",
      "AAVPTC*"
    ],
    "source": "Daikin Comfort Technologies / Goodman \"AVPTC**14** Air Handlers Installation & Operating Instructions\", P/N IOA-4030H, April 2023 — goodmanmfg.com / amana-hac.com",
    "flags": [
      {
        "title": "\"IdL\" fault = airflow not configured (Goodman trap)",
        "body": "When pairing an AVPTC with a non-communicating outdoor unit, airflow must be set manually in the PCB \"ton\" menu or via the CoolCloud HVAC app. If this step is skipped, the PCB displays fault code \"IdL\" and the blower will not operate on a call for cooling. This does NOT mean the board is bad — set the airflow/tonnage first before replacing anything."
      },
      {
        "title": "Two-stage electric heat needs only a single W input",
        "body": "For two-stage electric heat kits, wire only a single W input to the air handler — internal ComfortBridge algorithms handle heat-kit staging automatically. Do not wire W1/W2 separately expecting external staging control."
      },
      {
        "title": "Motor orientation matters",
        "body": "The AVPTC has a dedicated motor-orientation procedure (Section 14 of the manual) that must be followed when converting cabinet orientation (upflow/downflow/horizontal) — the ECM motor must be reoriented per the manual's diagram, not just the cabinet."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "ECM (electronically commutated), ComfortBridge-controlled",
            "key": "blowerMotor"
          },
          {
            "label": "Airflow setup",
            "value": "PCB \"ton\" menu or CoolCloud HVAC app (non-communicating outdoor units); auto-negotiated with communicating outdoor units",
            "key": "airflowSetup"
          },
          {
            "label": "Duct design airflow",
            "value": "350–450 CFM per ton of cooling (default indoor-airflow basis = 400 CFM/ton)",
            "key": "designAirflow"
          },
          {
            "label": "Design total external static",
            "value": "0.5 in. w.c. (duct system should be sized not to exceed this); higher static may require a deeper field-built condensate trap",
            "key": "designStatic"
          },
          {
            "label": "Constant/circulator fan default speed",
            "value": "30% of maximum airflow (default, adjustable)",
            "key": "constantFanDefault"
          }
        ]
      },
      {
        "title": "Metering & Charging",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed TXV (TXV-specific tubing/brazing procedure in manual, Section 7.3)",
            "key": "metering"
          },
          {
            "label": "Charge verification prerequisite",
            "value": "Confirm total static pressure ≤0.5 in. w.c. and correct airflow BEFORE charging or adjusting the TXV",
            "key": "chargePrereq"
          }
        ]
      },
      {
        "title": "Electric Heat & Drain",
        "rows": [
          {
            "label": "Heat kit compatibility",
            "value": "HKS series only — no other accessory heat kit is approved for this air handler",
            "key": "heatKit"
          },
          {
            "label": "Heat kit staging",
            "value": "Two-stage kits use a single W input; ComfortBridge stages internally (percentage of high-stage airflow during low-stage default = 70%)",
            "key": "heatKitStaging"
          },
          {
            "label": "Condensate",
            "value": "Primary/secondary drain pan; float switch must not use foam/plastic components incompatible with condensate chemistry per manual note",
            "key": "condensate"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Goodman",
    "model": "ARUF / ARPF (PSC, piston) and ARPT / AEPT (ECM, TXV) standard air handlers",
    "equip": "Air Handler",
    "summary": "Standard multi-position air handler family. ARUF/ARPF use multi-speed PSC motors with a piston (\"Flowrater\") metering device; ARPT/AEPT use a General Electric ECM motor with factory TXV and an 8-position dip switch for airflow. Amana's PSC/Flowrater twin of ARUF is the AWUF series (not AWST — AWST is Amana's separate ECM-based line).",
    "match": [
      "ARUF*",
      "ARPF*",
      "ARPT*",
      "AEPT*",
      "AWUF*",
      "AWUT*"
    ],
    "source": "Goodman \"Installation & Operating Instructions for ARUF, ARPF, ARPT and AEPT Series Air Handler\", P/N IO-230H, 2004-2005 (Goodman/Amana shared platform; Amana equivalent published as SS-AAWUF) — goodmanmfg.com / amana-hac.com",
    "flags": [
      {
        "title": "AWST is NOT the ARUF twin — use AWUF",
        "body": "Amana's AWST series is a separate ECM-based air handler line, not the Amana equivalent of Goodman's PSC/piston ARUF. The correct Amana twin of ARUF (PSC motor, Flowrater/piston metering) is the AWUF series (wall-mount, 1.5–5 ton). Don't cross-reference AWST data onto an ARUF-family unit."
      },
      {
        "title": "Piston vs TXV — model suffix defines the metering device",
        "body": "ARUF/ARPF ship with a check piston (\"Flowrater\"); ARPT/AEPT ship with a factory-installed, field-adjustable TXV. In mix-matched tonnage installs (different condenser vs. air handler tonnage), the piston orifice size may need to change — check the Goodman piston kit chart before assuming the factory piston is correct."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "ARUF/ARPF motor",
            "value": "Multi-speed PSC motor",
            "key": "blowerMotorPSC"
          },
          {
            "label": "ARPT/AEPT motor",
            "value": "GE ECM motor, 4 airflow levels via 8-position dip switch (combos 1-2 and 5-6 set base CFM; 7-8 trims)",
            "key": "blowerMotorECM"
          }
        ]
      },
      {
        "title": "Metering & Charging",
        "rows": [
          {
            "label": "ARUF/ARPF metering",
            "value": "Check piston (\"Flowrater\") — no adjustment for matched-tonnage installs; see piston kit chart for mix-matched tonnage",
            "key": "meteringPiston"
          },
          {
            "label": "ARPT/AEPT metering",
            "value": "Factory-installed, field-adjustable TXV; sensing bulb is not permanently fixed — verify placement/insulation on any service",
            "key": "meteringTXV"
          },
          {
            "label": "TXV charging target",
            "value": "Charge to 15°F subcooling (ARPT/AEPT with TXV)",
            "key": "subcoolingTargetTXV"
          }
        ]
      },
      {
        "title": "Electric Heat & Filter",
        "rows": [
          {
            "label": "Heat kit series",
            "value": "HKR series only (HKR3 for 3-phase); factory does not install electric heat — accessory only",
            "key": "heatKit"
          },
          {
            "label": "Filter requirement",
            "value": "Return-air filter required at every install (at unit or externally via return grille); downflow orientation requires external filtering",
            "key": "filterRequirement"
          },
          {
            "label": "Condensate",
            "value": "Primary + secondary drain connections on horizontal pan; float switch must not use foam/plastic materials incompatible per manual caution",
            "key": "condensate"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Rheem",
    "model": "RP20 / RP17 EcoNet Inverter Heat Pump (VSODU)",
    "equip": "Condenser/Heat Pump",
    "summary": "EcoNet-enabled, inverter-driven variable-speed heat pump (Rheem Prestige / Ruud Ultra series). Uses electronic expansion valve metering, demand defrost, and a compressor stator heater instead of a conventional crankcase heater.",
    "match": [
      "RP20",
      "RP17",
      "UP20",
      "UP17"
    ],
    "source": "Rheem (-)P20 EcoNet Enabled Inverter-Driven Variable Speed R-410A Heat Pump Outdoor Units — Installation Instructions, Form 92-105074-09-00 (3/16), pts.myrheem.com. Ruud UP20/UP17 twin naming per ruud.com product pages (RHMV IOM notes RHMV is rated with UP17/UP20 heat pumps).",
    "flags": [
      {
        "title": "Reversing valve energized in HEATING (not cooling)",
        "body": "Confirmed in the defrost sequence: entering defrost (a cooling-cycle reversal) de-energizes the reversing valve; returning to heating re-energizes it. So the RV is energized in HEATING and relaxed in cooling — the opposite of the common 'O' convention (energized-in-cooling) used by many other brands. Verify at the B terminal before assuming O-type logic on this platform."
      },
      {
        "title": "No universal charging chart — do not use a generic R-410A table",
        "body": "Final charge is set per the Charging Chart printed on the unit's own access panel cover (weight + subcooling method), not a generic pressure/temperature chart. See rating plate / unit charging chart."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Electronic Expansion Valve (EXV) — factory-matched outdoor + indoor EXV pair",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand defrost (ICC — Integrated Compressor Control — algorithm), not a fixed timer",
            "key": "defrost_type"
          },
          {
            "label": "Initiation",
            "value": "Outdoor coil temp < 35°F AND compressor run-time ≥ 34 min (plus onboard differential calc)",
            "key": "defrost_init"
          },
          {
            "label": "Termination",
            "value": "14 min max, or coil reaches termination temp — factory 60°F, field-adjustable to 50/60/70/80°F via 2-position dip switch",
            "key": "defrost_term"
          }
        ]
      },
      {
        "title": "Reversing Valve & Pressure Controls",
        "rows": [
          {
            "label": "Reversing valve energized mode",
            "value": "HEATING (de-energized during defrost/cooling) — see flag",
            "key": "rv_mode"
          },
          {
            "label": "High pressure cutout / cut-in",
            "value": "Auto-reset: opens ≈610 psig / closes ≈420 psig",
            "key": "hpc"
          },
          {
            "label": "Low pressure cutout / cut-in (cooling)",
            "value": "Transducer-based: no-op <50 psig, resumes ≥95 psig",
            "key": "lpc_cool"
          },
          {
            "label": "Low pressure cutout / cut-in (heating)",
            "value": "Transducer-based: no-op <15 psig, resumes ≥40 psig",
            "key": "lpc_heat"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Protection",
        "rows": [
          {
            "label": "Compressor stator heat (crankcase heater equivalent)",
            "value": "Energizes when OAT <45°F; must be energized 12 hrs before initial start-up; keeps compressor shell >50°F before allowing a start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient cooling",
            "value": "Mechanical cooling below 55°F requires low-ambient operating mode (outdoor fan cycling to maintain head pressure)",
            "key": "low_ambient_cool"
          },
          {
            "label": "Heating soft lockout",
            "value": "Triggered after 3 low-pressure trips with OAT <-10°F; clears above -10°F",
            "key": "low_ambient_heat"
          }
        ]
      },
      {
        "title": "EcoNet / Inverter Status & Charging",
        "rows": [
          {
            "label": "Status/fault display",
            "value": "Dual 7-segment LED: operating codes c/C/h/H/d/0; fault codes include L8, L15, L16, L21, 27/28, L29, 31",
            "key": "econet_status"
          },
          {
            "label": "Communicating vs conventional",
            "value": "Runs EcoNet communicating (R/C/E1/E2) or with a conventional 24V thermostat",
            "key": "econet_wiring"
          },
          {
            "label": "Charging method",
            "value": "See charging chart on unit access panel — see rating plate",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Rheem/Ruud defrost control boards include a 2-pin TEST header. With a heating call active, short the TEST pins with an insulated screwdriver or jumper for 5–7 seconds — reversing valve shifts to cooling, outdoor fan turns off, and W (aux heat) energizes, confirming defrost engaged. Some board revisions require a short, momentary release (~1 sec), then a second short to actually trigger the test — if the first short doesn't take, remove and reapply. If 24V is present at the board but the TEST short still won't force defrost, the board is likely faulty. Source: Rheem heat pump service/troubleshooting literature (Rheem 15PJL series 92-20522-80-05 doc referenced in pts.myrheem.com) plus corroborating HVAC-Talk and JustAnswer field threads — the specific OEM PDF could not be parsed directly this session, so confirm pin layout against the installed board's printed legend."
          },
          {
            "label": "EcoNet communicating",
            "value": "NOT verifiable this session. EcoNet-enabled outdoor units add an outdoor-unit test screen in the EcoNet Control Center app (as of software v60) that can lock compressor speed for testing, but no source located documented a dedicated 'force defrost' command through the EcoNet app or wall control. Use the physical TEST-pin method on the outdoor board instead, or confirm current app capability directly with Rheem/EcoNet support before relying on an app-based method."
          },
          {
            "label": "Prerequisite / safety",
            "value": "As with other brands, the outdoor coil should be at/below the board's frost cut-in for a natural (non-forced) defrost to latch; the TEST-pin method is designed to bypass that. When forced defrost runs: reversing valve shifts to cooling, outdoor fan stops, aux heat may energize — warn of the normal cold-air burst from supply registers during the test, and don't leave the unit in forced defrost longer than necessary."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Rheem",
    "model": "RP15 / RP14 Standard Heat Pump",
    "equip": "Condenser/Heat Pump",
    "summary": "Standard single-stage R-410A heat pump condensing unit (Rheem Classic / Ruud Achiever series) with fixed-orifice or TXV-matched indoor coil and enhanced demand defrost.",
    "match": [
      "RP13",
      "RP14",
      "RP15",
      "WA14"
    ],
    "source": "Rheem R-410A Heat Pump Outdoor Units — Installation Instructions ((-)P13/(-)P14/(-)P15), Form 92-105074-04-08 (9/16), pts.myrheem.com.",
    "flags": [
      {
        "title": "Ruud sells this line under the SAME 'RP' prefix",
        "body": "Unlike some Rheem/Ruud pairs, Ruud markets this Achiever-series heat pump directly as RP13/RP14/RP15 (ruud.com product pages) rather than a separate 'UP' prefix — don't assume a UP13/14/15 twin exists."
      },
      {
        "title": "WeatherKing WA14 — brand mapping only, not from Rheem/Ruud service literature",
        "body": "WA14 is listed on weatherking.com as the comparable-tier WeatherKing heat pump. This is a brand/model mapping only; all technical figures in this entry come from the Rheem IOM above, not from WeatherKing literature."
      },
      {
        "title": "Reversing valve state not documented in this manual",
        "body": "This IOM does not state the RV energized mode explicitly. Rheem's inverter-series IOM (RP20) documents the B terminal as energized-in-HEATING for this brand family — verify at the unit wiring diagram/rating plate before assuming a different (O-type) convention."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "Matched indoor coil uses a flow-check piston (fixed orifice), sized to outdoor unit tonnage per the piston-size table in the IOM; some indoor coil matches use a TXV — confirm at rating plate/spec sheet",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Enhanced Feature Demand Defrost Control",
            "key": "defrost_type"
          },
          {
            "label": "Initiation",
            "value": "Outdoor coil temp <35°F AND compressor run-time ≥34 min, plus onboard differential calc",
            "key": "defrost_init"
          },
          {
            "label": "Termination",
            "value": "14 min max, or coil reaches termination temp — factory default 70°F, field-adjustable to 50/60/80°F via control-board jumper",
            "key": "defrost_term"
          }
        ]
      },
      {
        "title": "Pressure Controls & Crankcase Heat",
        "rows": [
          {
            "label": "High pressure cutout / cut-in",
            "value": "Auto-reset: opens ≈610 psig / closes ≈420 psig",
            "key": "hpc"
          },
          {
            "label": "Low pressure cutout / cut-in",
            "value": "Auto-reset: opens ≈15 psig / closes ≈40 psig",
            "key": "lpc"
          },
          {
            "label": "Crankcase heater",
            "value": "Not standard on all models — factory-installed only above certain system-charge thresholds per the compressor table in the IOM; add a field CCH kit if total charge exceeds that threshold",
            "key": "crankcase"
          }
        ]
      },
      {
        "title": "Low Ambient & Charging",
        "rows": [
          {
            "label": "Low-ambient cooling",
            "value": "Not rated for mechanical cooling below ≈70°F ambient without the Low Ambient Control accessory kit (RXAD-A08), which cycles the OD fan off at ≈250 psig head pressure and extends cooling operation down to 0°F",
            "key": "low_ambient"
          },
          {
            "label": "Charging method",
            "value": "See nameplate/charging chart — subcooling method — see rating plate",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Rheem/Ruud defrost control boards include a 2-pin TEST header. With a heating call active, short the TEST pins with an insulated screwdriver or jumper for 5–7 seconds — reversing valve shifts to cooling, outdoor fan turns off, and W (aux heat) energizes, confirming defrost engaged. Some board revisions require a short, momentary release (~1 sec), then a second short to actually trigger the test — if the first short doesn't take, remove and reapply. If 24V is present at the board but the TEST short still won't force defrost, the board is likely faulty. Source: Rheem heat pump service/troubleshooting literature (Rheem 15PJL series 92-20522-80-05 doc referenced in pts.myrheem.com) plus corroborating HVAC-Talk and JustAnswer field threads — the specific OEM PDF could not be parsed directly this session, so confirm pin layout against the installed board's printed legend."
          },
          {
            "label": "EcoNet communicating",
            "value": "NOT verifiable this session. EcoNet-enabled outdoor units add an outdoor-unit test screen in the EcoNet Control Center app (as of software v60) that can lock compressor speed for testing, but no source located documented a dedicated 'force defrost' command through the EcoNet app or wall control. Use the physical TEST-pin method on the outdoor board instead, or confirm current app capability directly with Rheem/EcoNet support before relying on an app-based method."
          },
          {
            "label": "Prerequisite / safety",
            "value": "As with other brands, the outdoor coil should be at/below the board's frost cut-in for a natural (non-forced) defrost to latch; the TEST-pin method is designed to bypass that. When forced defrost runs: reversing valve shifts to cooling, outdoor fan stops, aux heat may energize — warn of the normal cold-air burst from supply registers during the test, and don't leave the unit in forced defrost longer than necessary."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Rheem",
    "model": "RH2T / RHMV EcoNet Air Handler",
    "equip": "Air Handler",
    "summary": "EcoNet-enabled communicating air handler family: RH2T (two-stage constant-torque ECM) and RHMV (variable-speed communicating ECM), both using an electronic expansion valve.",
    "match": [
      "RH2T",
      "RHMV"
    ],
    "source": "Rheem (-)H2T / (-)HMV EcoNet Enabled Air Handlers — Installation and Operation Manual, Form 92-20521-102-05 (1/2017), pts.myrheem.com. Ruud markets this family under the same RH2T name (media.ruud.com air handler product-comparison brochure).",
    "flags": [
      {
        "title": "EXV thermistor placement — galvanic corrosion trap",
        "body": "The copper vapor-line thermistor/EXV sensing bulb must clamp at the 10-2 o'clock position on a horizontal section of COPPER vapor line, never on the aluminum tube — contact with aluminum causes galvanic corrosion and eventual tube failure."
      },
      {
        "title": "EXV step dip switch must stay at 500-step",
        "body": "The EXV control has a 500/1600-step dip switch. Rheem does not currently supply 1600-step EXVs — the switch must remain at 500-step. It exists only for forward compatibility."
      }
    ],
    "groups": [
      {
        "title": "Blower & Metering",
        "rows": [
          {
            "label": "Blower motor",
            "value": "RH2T: two-stage constant-torque ECM. RHMV: variable-speed communicating ECM",
            "key": "blower"
          },
          {
            "label": "Metering device",
            "value": "Electronic Expansion Valve (EEV/EXV), 500-step",
            "key": "metering"
          },
          {
            "label": "Factory-programmed superheat",
            "value": "6°F standard (8°F on select models, e.g. 3621ME) — verify on the specific model's dip-switch table",
            "key": "superheat"
          }
        ]
      },
      {
        "title": "Airflow Setup",
        "rows": [
          {
            "label": "Airflow trim",
            "value": "EcoNet Control Center, or onboard TRIM dip switches for ±10% trim",
            "key": "airflow_trim"
          },
          {
            "label": "Conventional (non-communicating) operation",
            "value": "CFM/PAF dip-switch selection when run with a conventional thermostat instead of EcoNet",
            "key": "airflow_conventional"
          },
          {
            "label": "Max external static",
            "value": "Optimal 0.3–0.7 in. W.C.; performance tables extend to 1.0 in. W.C.",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Electric Heat, Filter & Drain",
        "rows": [
          {
            "label": "Electric heat kits",
            "value": "RXBH kits, 3–30 kW — dip-switch HTR selection must match the airflow table to the installed heater kW",
            "key": "heat_kit"
          },
          {
            "label": "Filter",
            "value": "NOT factory installed — external filter/rack required, sized for max 300 ft/min face velocity",
            "key": "filter"
          },
          {
            "label": "Drain",
            "value": "Primary 3/4\" FPT + auxiliary; secondary overflow pan kit (RXBM) required for horizontal installs over finished/living space",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Rheem",
    "model": "RH1T / RH2T Standard Air Handler (non-communicating)",
    "equip": "Air Handler",
    "summary": "Standard, non-communicating constant-torque ECM air handler family with aluminum coil — RH1T (single stage) and RH2T (two stage), metered by TEV, EEV, or piston depending on model suffix.",
    "match": [
      "RH1T",
      "RH2T",
      "RHLL",
      "RHSL",
      "HLA",
      "HSA"
    ],
    "source": "Rheem (-)H1T High Efficiency / (-)H2T High Efficiency 2-Stage Air Handlers — Installation Instructions, Form 92-20521-66-09 (1/2017), pts.myrheem.com.",
    "flags": [
      {
        "title": "RHLL/HLA/HSA legacy PSC family not directly verified in this document",
        "body": "RHLL/HLA/HSA are older PSC-motor cabinets covered by a separate, older Rheem 'Indoor Air Handlers' manual (files.rheem.com Form 7081940), not the RH1T/RH2T constant-torque manual cited here. Cross-check figures for those specific prefixes against the unit rating plate — treat this entry's numbers as representative of the RH1T/RH2T constant-torque family only."
      },
      {
        "title": "Reversing valve energized in HEATING — confirmed for this platform",
        "body": "Directly stated in this manual's heat-pump sequence of operation: 'Circuit R and B energizes the reversing valve (RV) switching it to the heating position (remains energized as long as selector switch is in heat position).' This is opposite the 'O' (energized-in-cooling) convention common on many other brands."
      }
    ],
    "groups": [
      {
        "title": "Blower & Metering",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Constant Torque ECM, 5-speed tap selectable. Factory ships at speed tap 5 (except -4824 model, shipped at tap 3); low-static taps used below 0.5\" W.C., high-static taps above",
            "key": "blower"
          },
          {
            "label": "Metering device",
            "value": "Set by model-number suffix: T=TEV, E=EEV, P=Piston (see rating plate). Piston sizes range .049–.078 in. depending on tonnage match",
            "key": "metering"
          },
          {
            "label": "TEV bulb placement",
            "value": "Clamp at 10-2 o'clock on a horizontal section of COPPER vapor line — never on the aluminum tube (galvanic corrosion trap)",
            "key": "tev_bulb"
          }
        ]
      },
      {
        "title": "Airflow & Electric Heat",
        "rows": [
          {
            "label": "Max external static",
            "value": "Optimal 0.3–0.7 in. W.C.; minimum 0.1 in. W.C. with coil installed",
            "key": "max_static"
          },
          {
            "label": "Electric heat kits",
            "value": "RXBH kits, 2.25–30 kW depending on cabinet size. 13kW+ kits: jumper W1/W2 for max outlet temperature rise. Max heat rise limited per cabinet (51–80°F range depending on model)",
            "key": "heat_kit"
          }
        ]
      },
      {
        "title": "Reversing Valve, Drain & Filter",
        "rows": [
          {
            "label": "Reversing valve energized mode",
            "value": "HEATING (B terminal) — see flag",
            "key": "rv_mode"
          },
          {
            "label": "Drain",
            "value": "Primary + auxiliary 3/4\" FPT; secondary/auxiliary horizontal overflow pan (RXBM) recommended when coil is over living space",
            "key": "drain"
          },
          {
            "label": "Filter",
            "value": "NOT factory installed — external filter required, max 300 ft/min face velocity",
            "key": "filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Daikin",
    "model": "DZ20VC",
    "equip": "Condenser/Heat Pump",
    "summary": "Inverter (variable-speed) heat pump condenser, R-410A, on the *VZC20 communicating platform (ComfortBridge/ComfortNet). Charges via dedicated Charge Mode, not by gauging cold. No mechanical low-pressure switch — low side is transducer/software monitored.",
    "match": [
      "daikin",
      "dz20vc",
      "dz18vc",
      "vzc20",
      "inverter heat pump",
      "comfortbridge",
      "comfortnet",
      "daikin fit",
      "coolcloud"
    ],
    "source": "Daikin \"Service and Troubleshooting – *VZC20 Inverter Heat Pump Condenser Units with R-410A Refrigerant\" (doc RS6215002r9), Daikin document CDN: https://cdn.daikincloud.io/PIM/Assets/Documents/RS6215002r9.pdf (mirrors the same daikincomfort.com-issued service literature; the legacy daikincomfort.com/backend path for this doc is currently offline)",
    "flags": [
      {
        "title": "Charge Mode required — don't gauge-charge cold",
        "body": "This platform must be charged using the system's CHARGE MODE (thermostat CR9/SUt menu, outdoor PCB pushbuttons, or the CoolCloud HVAC app), which runs the compressor at 100% capacity for about 1 hour. Only adjust to the 8°F ± 1°F subcooling target while in Charge Mode, and only when outdoor ambient is between 65°F and 105°F. Outside that ambient range, weigh in the charge per the installation manual's line-length chart instead of using subcooling."
      },
      {
        "title": "No mechanical low-pressure switch on this platform",
        "body": "The low side is monitored by a HI/LOW pressure transducer read by the control board (fault code E26 = pressure sensor fault), not a fixed mechanical low-pressure cutout switch. There is no low-pressure switch cutout psig spec to test here — don't go looking for one."
      },
      {
        "title": "Compressor low-ambient lockout is set by line-set length",
        "body": "The recommended heating compressor lockout temperature is entered at the ComfortNet/CTK04 thermostat (Installer Options > Compressor Lockout/Balance Point) and depends on line-set length: 15°F for 0–100 ft runs, 20°F for 100–200 ft runs."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV (TXV-matched indoor coil) or factory electronic expansion valve (EEV) in a matched ComfortBridge communicating indoor unit; outdoor unit also carries an EEV that meters refrigerant to the outdoor coil during heating",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature (control-board managed), demand-assisted",
            "key": "defrost_type"
          },
          {
            "label": "Defrost interval",
            "value": "Selectable at thermostat: 30, 60, 90, or 120 minutes",
            "key": "defrost_interval"
          },
          {
            "label": "Defrost termination",
            "value": "Coil thermistor (Tm) at/above ~54°F AND defrost sensor (Tb) above 43°F held 30 seconds; coil & defrost temps checked every 5 sec in heating mode",
            "key": "defrost_termination"
          },
          {
            "label": "Manual defrost",
            "value": "\"Force Defrost\" selectable from thermostat",
            "key": "defrost_manual"
          }
        ]
      },
      {
        "title": "Reversing Valve",
        "rows": [
          {
            "label": "Energized mode",
            "value": "Energized in cooling; de-energized in heating (standard convention on this platform)",
            "key": "rv_energized"
          }
        ]
      },
      {
        "title": "Pressure Controls",
        "rows": [
          {
            "label": "High-pressure switch",
            "value": "Cuts out at approximately 605 PSIG per the manual's HPS check procedure; automatic reset (exact factory tolerance did not extract cleanly from the source PDF — confirm against your printed copy before relying on it)",
            "key": "hp_cutout"
          },
          {
            "label": "Low-pressure protection",
            "value": "No mechanical switch; monitored via HI/LOW pressure transducer + control board logic (see flag)",
            "key": "lp_cutout"
          }
        ]
      },
      {
        "title": "Low Ambient / Lockout",
        "rows": [
          {
            "label": "Compressor lockout (0–100 ft line set)",
            "value": "15°F, set at thermostat",
            "key": "lockout_short"
          },
          {
            "label": "Compressor lockout (100–200 ft line set)",
            "value": "20°F, set at thermostat",
            "key": "lockout_long"
          }
        ]
      },
      {
        "title": "Crankcase Heater",
        "rows": [
          {
            "label": "Type",
            "value": "Optional accessory, positive-temperature-coefficient (PTC), 33W @ 240V, ~1745 Ω cold resistance",
            "key": "cch_type"
          },
          {
            "label": "Pre-start soak time",
            "value": "Energize a minimum of 2 hours before operating the unit",
            "key": "cch_soak"
          }
        ]
      },
      {
        "title": "Inverter / Communicating",
        "rows": [
          {
            "label": "Communication",
            "value": "ComfortBridge™ and ComfortNet™ ready; diagnostics/setup via CoolCloud HVAC app or CTK04 communicating thermostat",
            "key": "comm_notes"
          },
          {
            "label": "Boost Mode",
            "value": "Adjustable activation 70–105°F, or \"Always ON\"; ON by default",
            "key": "boost_mode"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Method",
            "value": "Dedicated CHARGE MODE (thermostat CR9/SUt menu, outdoor PCB pushbuttons, or CoolCloud app) — not standard gauge charging",
            "key": "charge_method"
          },
          {
            "label": "Subcooling target (TXV, in Charge Mode, 65–105°F ambient)",
            "value": "8°F ± 1°F",
            "key": "charge_subcool"
          },
          {
            "label": "Outside 65–105°F ambient",
            "value": "Weigh in charge per installation manual's line-length chart",
            "key": "charge_weighin"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "PARTIALLY verifiable only. Daikin's DZ6VSA (Daikin Fit family) service reference lists a defrost-board configuration parameter literally named 'Force Defrost Cycle' with two states (0:ON / 1:OFF), indicating it's a field-configurable setting rather than a simple momentary-jumper test — but the exact DIP switch bank/pin location and how the ON state behaves (one-shot vs. persistent) could not be confirmed from the accessible manual excerpt this session. Do NOT guess the switch position or pin numbers — pull the full Daikin DZ6VSA (or applicable model) Installation & Service Reference and locate the 'Force Defrost Cycle' setting in the defrost-board configuration table before using it in the field. Source: Daikin DZ6VSA 1EA Series Installation & Service Reference (ManualsLib-hosted copy)."
          },
          {
            "label": "Daikin One+ communicating",
            "value": "NOT verifiable this session. The Daikin One+ thermostat has a 'System Test' function used for inverter calibration (5–15 minutes, must not be interrupted, master zone-1 thermostat only, all other zone stats set OFF) and a general service/diagnostics menu, but no source located confirmed a dedicated, documented 'force defrost' command distinct from that calibration test. Do not treat System Test as a defrost-force procedure without confirming with current Daikin service documentation for the specific communicating outdoor unit."
          },
          {
            "label": "Prerequisite / safety",
            "value": "As with other brands, expect any genuine forced-defrost test to require (or bypass) a cold coil condition, and to shift the reversing valve to cooling and stop the outdoor fan — a burst of cold supply air is normal during the test. Because the exact Daikin force-defrost mechanics aren't fully confirmed here, verify against the specific unit's Installation & Service Reference before performing a live test."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Daikin",
    "model": "DZ16SA / DZ14SA",
    "equip": "Condenser/Heat Pump",
    "summary": "Standard (non-inverter) single/two-capacity split-system heat pump, R-410A, TXV metering, legacy solid-state time/temperature defrost board. Crankcase heater soak time and low-pressure cutout figures differ from the newer inverter platform — don't cross-apply specs.",
    "match": [
      "daikin",
      "dz16sa",
      "dz14sa",
      "dz16",
      "dz14",
      "standard heat pump",
      "single stage heat pump",
      "solid state defrost"
    ],
    "source": "Daikin \"Service Instructions – DAR09, DAR12, DAT09, DAT12, DX11, DX13, DX14, DX15, DX16 Condensing Units, DZ11, DZ13, DZ14, DZ16 Split System Heat Pumps with R-410A Refrigerant\" (doc RSD6200006r47, Feb 2021): https://daikincomfort.com/docs/default-source/chpf/rsd6200006r47.pdf",
    "flags": [
      {
        "title": "LPCO cut points differ for heat pump vs. A/C-only",
        "body": "The Low Pressure Cut Out (LPCO) switch trips at approximately 21 PSIG on heat pump models but approximately 55 PSIG on cooling-only (A/C) models built on this same platform, and recloses at approximately 50 PSIG (heat pump) or approximately 95 PSIG (A/C). Confirm which unit type you're on before condemning the switch."
      },
      {
        "title": "Crankcase heater soak time is 4 hours here, not 2",
        "body": "This platform's optional PTC crankcase heater must be energized a minimum of 4 hours before start-up — longer than the 2-hour spec on the newer *VZC20/DZ20VC inverter platform. Don't apply the newer unit's timing to this one."
      },
      {
        "title": "Low-ambient heating needs an accessory kit",
        "body": "Standard DZ14/DZ16 units are not rated to run below 0°F outdoor ambient at 50% or higher relative humidity without the LAKT-01 Low Ambient Kit accessory installed — verify it's present before troubleshooting nuisance lockouts or icing in cold climates."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV (matched TXV-kit coil; nomenclature \"T\" suffix). Accessory TXV kits: TX2N4A, TX3N4x, TX5N4x",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Solid-state time/temperature defrost, jointly controlled by the defrost control board and a bimetal defrost thermostat",
            "key": "defrost_type"
          },
          {
            "label": "Defrost interval",
            "value": "Selectable via circuit-board jumper: 30, 60, or 90 minutes",
            "key": "defrost_interval"
          },
          {
            "label": "Defrost start/stop",
            "value": "Defrost sensor closes at approximately 31°F to begin timing; cycle initiates at end of selected interval if sensor still closed; terminates when sensor opens at approximately 75°F",
            "key": "defrost_termination"
          },
          {
            "label": "Defrost override",
            "value": "10-minute override interrupt on standard board; 12-minute override interrupt on the upgraded solid-state defrost control revision",
            "key": "defrost_override"
          }
        ]
      },
      {
        "title": "Reversing Valve",
        "rows": [
          {
            "label": "Energized mode",
            "value": "Energized in cooling (through the thermostat's \"O\" terminal), de-energized in heating",
            "key": "rv_energized"
          }
        ]
      },
      {
        "title": "Pressure Controls",
        "rows": [
          {
            "label": "High-pressure switch",
            "value": "Cuts out at 610 PSIG ± 10 PSIG; automatic reset",
            "key": "hp_cutout"
          },
          {
            "label": "Low-pressure cutout (LPCO) — heat pump",
            "value": "Cuts out ~21 PSIG, recloses (cuts in) ~50 PSIG",
            "key": "lp_cutout_hp"
          },
          {
            "label": "Low-pressure cutout (LPCO) — A/C-only variant",
            "value": "Cuts out ~55 PSIG, recloses (cuts in) ~95 PSIG",
            "key": "lp_cutout_ac"
          }
        ]
      },
      {
        "title": "Low Ambient",
        "rows": [
          {
            "label": "Below 0°F @ ≥50% RH",
            "value": "Requires LAKT-01 Low Ambient Kit accessory",
            "key": "low_ambient_kit"
          },
          {
            "label": "Compressor lockout control",
            "value": "Optional Outdoor Thermostat w/ Lockout Stat, accessory OT18-60A3",
            "key": "lockout_accessory"
          }
        ]
      },
      {
        "title": "Crankcase Heater",
        "rows": [
          {
            "label": "Type",
            "value": "Optional accessory, positive-temperature-coefficient (PTC)",
            "key": "cch_type"
          },
          {
            "label": "Pre-start soak time",
            "value": "Energize a minimum of 4 hours before operating the unit",
            "key": "cch_soak"
          }
        ]
      },
      {
        "title": "Compressor Notes",
        "rows": [
          {
            "label": "Two-capacity models",
            "value": "Some DZ16 \"Special High Feature\" models unload via a compressor solenoid: full (100%) capacity when solenoid is energized, reduced capacity when de-energized — confirm capacity type on the nameplate/model number before assuming single-stage behavior",
            "key": "compressor_capacity"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "PARTIALLY verifiable only. Daikin's DZ6VSA (Daikin Fit family) service reference lists a defrost-board configuration parameter literally named 'Force Defrost Cycle' with two states (0:ON / 1:OFF), indicating it's a field-configurable setting rather than a simple momentary-jumper test — but the exact DIP switch bank/pin location and how the ON state behaves (one-shot vs. persistent) could not be confirmed from the accessible manual excerpt this session. Do NOT guess the switch position or pin numbers — pull the full Daikin DZ6VSA (or applicable model) Installation & Service Reference and locate the 'Force Defrost Cycle' setting in the defrost-board configuration table before using it in the field. Source: Daikin DZ6VSA 1EA Series Installation & Service Reference (ManualsLib-hosted copy)."
          },
          {
            "label": "Daikin One+ communicating",
            "value": "NOT verifiable this session. The Daikin One+ thermostat has a 'System Test' function used for inverter calibration (5–15 minutes, must not be interrupted, master zone-1 thermostat only, all other zone stats set OFF) and a general service/diagnostics menu, but no source located confirmed a dedicated, documented 'force defrost' command distinct from that calibration test. Do not treat System Test as a defrost-force procedure without confirming with current Daikin service documentation for the specific communicating outdoor unit."
          },
          {
            "label": "Prerequisite / safety",
            "value": "As with other brands, expect any genuine forced-defrost test to require (or bypass) a cold coil condition, and to shift the reversing valve to cooling and stop the outdoor fan — a burst of cold supply air is normal during the test. Because the exact Daikin force-defrost mechanics aren't fully confirmed here, verify against the specific unit's Installation & Service Reference before performing a live test."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Daikin",
    "model": "DV*PEC / DV*FEC (EEV Series)",
    "equip": "Air Handler",
    "summary": "Multi-position, variable-speed ECM air handler with factory-installed EEV, built for full ComfortBridge communication with a matched Daikin inverter outdoor unit (e.g. DZ20VC-class). Airflow/CFM is NOT set with dip switches like a conventional air handler — it's requested digitally from the outdoor unit.",
    "match": [
      "daikin",
      "dvpec",
      "dvfec",
      "avpec",
      "eev air handler",
      "comfortbridge air handler",
      "variable speed air handler",
      "ecm air handler",
      "daikin fit air handler"
    ],
    "source": "Daikin \"Installation Instructions – DV**PEC / DV**FEC (EEV Series Air Handlers)\" (doc IOD-4018M): https://daikincomfort.com/docs/default-source/dvpec/iod-4018m.pdf",
    "flags": [
      {
        "title": "No CFM dip switches — airflow is set at the OUTDOOR unit",
        "body": "Unlike a conventional air handler, base airflow/CFM-per-ton on this ComfortBridge-communicating platform is not configured with dip switches on the air handler board — it's requested digitally by the matched outdoor unit. Field \"Airflow Trim\" up/down adjustment is made from the OUTDOOR unit's user menu, per the install manual, not on the air handler itself."
      },
      {
        "title": "Don't trust the displayed CFM for trim limits",
        "body": "The install manual explicitly warns: for the Maximum CFM airflow-trim limits (per model, listed by Up-Flow/Down-Flow/Horizontal), use the actual measured CFM at the install site — not the outdoor unit's spec-sheet value, the communicating thermostat's status-menu CFM, or the PCB LED display, since there can be a tolerance gap between displayed and actual measured airflow."
      },
      {
        "title": "Condensate/auxiliary alarm switch is normally closed, fails safe",
        "body": "The Auxiliary Alarm switch (terminals TB4/TB5 — typically a condensate float switch, though CO or fire-alarm contacts can also be wired here) is normally closed and opens on trip (e.g., high condensate level). On trip, the control shuts off the blower and outdoor unit and posts a fault; it auto-resumes only after the switch reads closed continuously for 30 seconds. A switch that reads open at rest is wired backwards or faulty — not \"safe.\""
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Motor type",
            "value": "ECM (electronically commutated), variable-speed, communicating",
            "key": "blower_motor"
          },
          {
            "label": "Airflow setup",
            "value": "Digital — requested by the matched outdoor unit over the communicating link; field trim adjustment is done from the OUTDOOR unit's user menu (see flag), not via air handler dip switches",
            "key": "airflow_setup"
          }
        ]
      },
      {
        "title": "Airflow Limits (example models)",
        "rows": [
          {
            "label": "DV24FECB14 max CFM (Up/Down/Horiz.)",
            "value": "910 / 870 / 870",
            "key": "cfm_24"
          },
          {
            "label": "DV36FECC14 / DV35FECC14 max CFM (Up/Down/Horiz.)",
            "value": "1450 / 1390 / 1390",
            "key": "cfm_36"
          },
          {
            "label": "DV48FECD14 / DV47FECD14 max CFM (Up/Down/Horiz.)",
            "value": "1590 / 1520 / 1520",
            "key": "cfm_48"
          },
          {
            "label": "DV60FECD14 / DV59FECD14 max CFM (Up/Down/Horiz.)",
            "value": "1890 / 1800 / 1800",
            "key": "cfm_60"
          }
        ]
      },
      {
        "title": "Static Pressure",
        "rows": [
          {
            "label": "Max external static (single published figure)",
            "value": "see install manual's model-specific blower performance tables",
            "key": "max_esp"
          },
          {
            "label": "Downflow Kit (DFK) requirement",
            "value": "Required in downflow applications where total external static exceeds 0.5\" e.s.p., to prevent coil-pan sweating",
            "key": "downflow_kit_esp"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Requirement",
            "value": "Return air filter mandatory (factory rail or external return-air grille)",
            "key": "filter_required"
          },
          {
            "label": "Factory filter rail sizes",
            "value": "Nominal 16x20x1\", 20x20x1\", or 24x20x1\" (actual filter dimension must be under 23-1/2\" x 20\")",
            "key": "filter_size"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Approved kits",
            "value": "Daikin-produced heat kits only",
            "key": "heat_kit_approved"
          },
          {
            "label": "Staging/sizing selection",
            "value": "Cabinet-specific DIP switches select which heater-kit sizes are \"valid\" for that air handler width (e.g., DV25PECB14 valid kit codes 3, 5, 6, 8, 10 kW positions) — see manual's per-model DIP table and the Heater Kit (HKS) Installation Instructions for breaker/circuit sizing",
            "key": "heat_kit_staging"
          }
        ]
      },
      {
        "title": "Metering",
        "rows": [
          {
            "label": "Device",
            "value": "Factory-installed electronic expansion valve (EEV) on the indoor coil, non-adjustable, factory set",
            "key": "metering_device"
          },
          {
            "label": "Matching",
            "value": "Must be paired with a compatible communicating (ComfortBridge) outdoor unit — e.g. DZ20VC-class *VZC20 inverter heat pump/condenser",
            "key": "metering_match"
          }
        ]
      },
      {
        "title": "Drain / Safety Switch",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Primary and secondary (auxiliary) drain ports on the coil drain pan; secondary/auxiliary drain line mandatory in locations where condensate overflow could cause damage",
            "key": "drain_config"
          },
          {
            "label": "Auxiliary Alarm switch",
            "value": "Terminals TB4/TB5, normally closed, opens on trip (see flag for behavior)",
            "key": "aux_alarm_switch"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "ICP",
    "model": "CVH8/HVH8/TVH8 (Ion, R-410A Variable-Speed, Observer-compatible)",
    "equip": "Condenser/Heat Pump",
    "summary": "ICP variable-speed inverter heat pump (Comfortmaker Ion, Heil Ion 18, Tempstar). AOC control board drives a variable-speed rotary compressor + EXV; runs full diagnostics only with the Observer Wall Control (2-wire communicating).",
    "match": [
      "HVH8",
      "CVH8",
      "TVH8",
      "HVA9",
      "CVA9",
      "TVA9",
      "Heil Ion",
      "Heil Ion 18",
      "Comfortmaker Ion",
      "Tempstar Ion",
      "Observer",
      "Observer Wall Control",
      "Arcoaire",
      "Day & Night",
      "KeepRite",
      "AirQuest"
    ],
    "source": "ICP Application Guideline & Service Manual, CVH8/HVH8/TVH8/CVA9/HVA9/TVA9, part# 421 08 5600 02, 1/18/2017 (shareddocs.com)",
    "flags": [
      {
        "title": "Confirmed brands only: C/H/T",
        "body": "This service manual documents Comfortmaker (C), Heil (H), and Tempstar (T) badges only (CVH8/HVH8/TVH8). No Arcoaire, Day & Night, KeepRite, or AirQuest variant of this Ion platform appears in this document - confirm the nameplate model prefix before assuming compatibility with the figures below."
      },
      {
        "title": "EXV in heating, TXV in cooling - two different metering devices",
        "body": "The outdoor AOC board drives an Electronic Expansion Valve (EXV) for metering in HEATING mode only. The matched indoor fan coil/furnace coil carries its own factory bi-flow, hard-shutoff TXV that meters in COOLING mode. Do not confuse the two when troubleshooting a metering fault."
      },
      {
        "title": "Reversing valve energized = cooling/defrost",
        "body": "Per Fig. 40/41 of the service manual: solenoid ENERGIZED = cooling mode or defrost mode; solenoid DE-ENERGIZED = heating mode. Defrost briefly puts the unit in the cooling flow path."
      },
      {
        "title": "Charging: nameplate + charts only, never invent a number",
        "body": "Cooling charge is checked against the unit-specific subcooling chart printed on the control-box door (service manual Fig. 9-21, one chart per tonnage/SEER). Heating charge is WEIGH-IN ONLY per rating plate +/-0.6 oz per ft of 3/8 in. liquid line vs. a 15 ft baseline - the manual explicitly says 'DO NOT USE CHART TO ADJUST REFRIGERANT CHARGE' for the heating pressure check chart (it is for verification only)."
      },
      {
        "title": "Full 2-digit fault code table in service manual",
        "body": "Amber STATUS LED flashes short-then-long digit pairs (e.g., 3 short + 2 long = code 32, Low Pressure Trip). Common codes: 25 wrong/missing model plug, 31/84 high pressure switch open/lockout, 32/83 low pressure trip/lockout, 46 brownout, 56 OAT-OCT thermistor out of range, 74 discharge temp lockout. Full cause/action list is service manual Table 6 (pages 14-21) - too long to reproduce here, reference the source doc."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering - heating (outdoor)",
            "value": "Electronic Expansion Valve (EXV), AOC-controlled",
            "key": "metering_heat"
          },
          {
            "label": "Metering - cooling (indoor)",
            "value": "Factory TXV, bi-flow, hard-shutoff, external equalizer (at matched fan coil/furnace coil)",
            "key": "metering_cool"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost control",
            "value": "AOC board + Outdoor Coil Thermistor (OCT); Observer Wall Control selectable 30/60/90 min or AUTO (default AUTO)",
            "key": "defrost_control"
          },
          {
            "label": "AUTO interval logic",
            "value": "Last defrost <5 min -> next 90 min (if OAT>37F); 5-7 min -> next 60 min; >7 min -> next 30 min; first interval after power-up defaults to 30 min",
            "key": "defrost_auto"
          },
          {
            "label": "Defrost demand",
            "value": "Coil temp <=32F (0C) for 4 continuous minutes during interval; defrost only permitted below 50F (10C) OAT",
            "key": "defrost_demand"
          },
          {
            "label": "Defrost termination",
            "value": "OAT >25F: OCT >60F & min 1 min run; OAT <=25F: OCT >45F & min 2 min run; or 10 min max",
            "key": "defrost_term"
          }
        ]
      },
      {
        "title": "Reversing Valve / Pressures",
        "rows": [
          {
            "label": "Reversing valve energized mode",
            "value": "Energized = COOLING or DEFROST; De-energized = HEATING",
            "key": "revvalve"
          },
          {
            "label": "High pressure switch",
            "value": "Open 600 +/-5 psig, Close 470 +/-10 psig @ 77F (fault 31, lockout 84 after repeated trips)",
            "key": "hp_cutout"
          },
          {
            "label": "Low pressure protection",
            "value": "Suction transducer trips <15 psig any time or <33 psig for 5 min; resumes >43 psig cooling / >35 psig heating (fault 32, lockout 83)",
            "key": "lp_cutout"
          },
          {
            "label": "Low-ambient note",
            "value": "No stated fixed compressor lockout temp in this manual; defrost itself is locked out above 50F OAT - see rating plate for any low-ambient kit requirement",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Crankcase Heater / Diagnostics / Charging",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "Internal, AOC-controlled; energizes intelligently during off-cycle (stator heat) whenever outdoor unit is powered - no fixed ambient threshold published",
            "key": "crankcase"
          },
          {
            "label": "Status/diagnostics",
            "value": "Amber STATUS LED = 2-digit flash fault codes (short=1st digit, long=2nd digit); Green COMM LED = communication with Observer Wall Control; codes recallable via 'force defrost' J2 short + power-on",
            "key": "diagnostics"
          },
          {
            "label": "Charging method",
            "value": "Nameplate factory charge for 15 ft line set +/-0.6 oz/ft of 3/8 liquid line; cooling via unit-specific subcooling chart (OAT 65-100F, IAT 70-80F); heating by weigh-in only, do not adjust from pressure chart",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "ICP (Heil/Tempstar/Comfortmaker/Arcoaire/Keeprite) has been part of the Carrier Corporation family since 1999, and its heat pump defrost boards are the same HK32EA/CEPL13xxxx board family used on Carrier/Bryant equipment (an ICP-specific 'Defrost Board Testing Sheet' technical bulletin exists confirming this board family, though it could not be fetched/parsed directly this session). Treat the Carrier/Bryant non-communicating procedure above (short the Forced Defrost/Speed-Up 2-pin header 5+ seconds, remove once the valve shifts) as applicable, but confirm against the exact board's printed pin legend, since ICP-branded boards sometimes carry different part-number silkscreens than Carrier-branded ones even when electrically identical. Source: ICP board part-number cross-reference commonly documented by HVAC parts suppliers (e.g. GSIstore/North America HVAC listings for HK32EA/CEPL-family ICP boards) plus the Carrier-family procedure above."
          },
          {
            "label": "Ion communicating",
            "value": "NOT verifiable this session. ICP's Ion Black/Ion Gray communicating thermostats and the associated System Control communicate with ICP equipment over a 4-wire bus, but no source located documented an exact menu path or button sequence for forcing a defrost cycle through the Ion control. Do not invent a menu sequence — consult the specific Ion System Control Installation Manual, or use the physical board-level test-pin method above if the outdoor unit is accessible."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Same as Carrier: coil sensor should be cold (near/below freezing) for a natural defrost to latch, though the forced test-pin method is designed to override timing (not necessarily the coil-temp check on every board revision). Reversing valve shifts to cooling and outdoor fan stops during defrost — a cold-air burst indoors is expected and normal."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "ICP",
    "model": "N4H3/N4H4/H4H4/T4H4/C4H4/NXH5-series (Standard Single-Stage Split Heat Pump)",
    "equip": "Condenser/Heat Pump",
    "summary": "ICP standard single-stage split-system heat pump (non-branded N-prefix base platform, rebadged as Heil/Tempstar/Comfortmaker H/T/C-prefix equivalents). Mechanical defrost thermostat + timer board; diagnostic module is a factory option, not standard.",
    "match": [
      "N4H3",
      "N4H4",
      "C4H3",
      "C4H4",
      "H4H3",
      "H4H4",
      "T4H3",
      "T4H4",
      "NXH5",
      "CXH5",
      "HXH5",
      "TXH5",
      "Heil",
      "Tempstar",
      "Comfortmaker",
      "Arcoaire",
      "Day & Night",
      "KeepRite",
      "AirQuest"
    ],
    "source": "ICP Installation Instructions, R-410A Split System Heat Pump N4H3/C4H3/H4H3/T4H3/N4H4/NXH5/CXH5/HXH5/TXH5, part# 428 01 5106 00, 12/13/12 (shareddocs.com); charging chart & wiring legend cross-ref: ICP Technical Support Manual, Split System Heat Pump N4H4, part# 428 04 5201 00, Aug 2009 (shareddocs.com)",
    "flags": [
      {
        "title": "No diagnostic board unless Comfort Alert is factory-installed",
        "body": "Per install instructions p.20/21: 'Some models are factory equipped with the Comfort Alert Diagnostics device.' It is NOT standard across this platform. If the control box has no Comfort Alert module (Green POWER / Red TRIP / Yellow ALERT LED cluster), there is no fault-code capability at all on this unit - troubleshoot from voltage, pressure, and amperage checks only, do not go hunting for a status LED that isn't there."
      },
      {
        "title": "HPS/LPS may not be present - no fixed psig published",
        "body": "The N4H4 Technical Support Manual wiring-diagram legend marks *HPS (High Pressure Switch) and *LPS (Low Pressure Switch) with an asterisk meaning 'MAY BE FACTORY OR FIELD INSTALLED' - i.e., not guaranteed present. Unlike the AOC variable-speed platform (which publishes 600/470 psig), no fixed HPS/LPS cut-out/cut-in psig is published for this standard platform - see rating plate or unit-specific spec sheet."
      },
      {
        "title": "Reversing valve energized in COOLING",
        "body": "Per Sequence of Operation (install instructions p.20): a call for cooling makes circuit R-O, which energizes the reversing valve to the cooling position. A call for heating does NOT make R-O, so the valve stays de-energized in the heating position - same convention as the variable-speed Ion platform above."
      },
      {
        "title": "Two different metering devices on one heat pump",
        "body": "Cooling metering is at the INDOOR coil (TXV or piston w/Teflon ring, per unit rating plate). Heating metering is a SEPARATE piston shipped inside the outdoor unit's liquid service valve body - it is used only in heating mode and is independent of whatever the indoor coil uses for cooling."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A",
            "key": "refrigerant"
          },
          {
            "label": "Metering - cooling (indoor)",
            "value": "TXV or piston w/ Teflon ring at indoor coil - must match unit rating plate; do not mix R-22 and R-410A TXVs",
            "key": "metering_cool"
          },
          {
            "label": "Metering - heating (outdoor)",
            "value": "Separate piston shipped in the liquid service valve body, sized per rating plate",
            "key": "metering_heat"
          }
        ]
      },
      {
        "title": "Defrost",
        "rows": [
          {
            "label": "Defrost control",
            "value": "Mechanical Defrost Thermostat (DFT, closes 32F/0C, opens 65F/18C) + time/temp defrost control board (not an electronic coil thermistor)",
            "key": "defrost_control"
          },
          {
            "label": "Defrost interval",
            "value": "Field-selectable jumper: 30, 60, or 90 minutes between cycles; factory set to 90 min; interval timer only runs during active heating calls",
            "key": "defrost_interval"
          },
          {
            "label": "Defrost cycle length",
            "value": "Fixed 10 minutes, not adjustable; ends early if DFT opens at 65F",
            "key": "defrost_length"
          }
        ]
      },
      {
        "title": "Reversing Valve / Pressures",
        "rows": [
          {
            "label": "Reversing valve energized mode",
            "value": "Energized = COOLING (R-O circuit); de-energized/at rest = HEATING",
            "key": "revvalve"
          },
          {
            "label": "High/low pressure switches",
            "value": "Not published as fixed psig in this literature - HPS/LPS are optional (factory or field installed) per wiring legend - see rating plate",
            "key": "hp_lp_cutout"
          },
          {
            "label": "Low-ambient lockout",
            "value": "No compressor low-ambient lockout temperature published in this document - see rating plate/accessories",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Crankcase Heater / Diagnostics / Charging",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "Optional (factory or field installed per wiring legend *CH/*CHS); required when refrigerant line length exceeds 80 ft (24.4 m); energize 24 hrs before start-up if present",
            "key": "crankcase"
          },
          {
            "label": "Diagnostics",
            "value": "Comfort Alert Diagnostics module on SOME models only: Green POWER / Red TRIP / Yellow ALERT LED with 9 flash codes (1=long run time, 2=system pressure trip, 3=short cycling, 4=locked rotor, 5=open circuit, 6=open start circuit, 7=open run circuit, 8=welded contactor, 9=low voltage)",
            "key": "diagnostics"
          },
          {
            "label": "Charging method",
            "value": "Nameplate base charge for 15 ft line set +/-0.6 oz/ft of 3/8 liquid line; TXV units use subcooling method (chart vs. liquid pressure); Piston units use superheat method (charts by OAT/entering wet-bulb, weigh-in if chart shows '--'); heating-mode Tech Label chart is for verification only, never used to adjust charge",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "ICP (Heil/Tempstar/Comfortmaker/Arcoaire/Keeprite) has been part of the Carrier Corporation family since 1999, and its heat pump defrost boards are the same HK32EA/CEPL13xxxx board family used on Carrier/Bryant equipment (an ICP-specific 'Defrost Board Testing Sheet' technical bulletin exists confirming this board family, though it could not be fetched/parsed directly this session). Treat the Carrier/Bryant non-communicating procedure above (short the Forced Defrost/Speed-Up 2-pin header 5+ seconds, remove once the valve shifts) as applicable, but confirm against the exact board's printed pin legend, since ICP-branded boards sometimes carry different part-number silkscreens than Carrier-branded ones even when electrically identical. Source: ICP board part-number cross-reference commonly documented by HVAC parts suppliers (e.g. GSIstore/North America HVAC listings for HK32EA/CEPL-family ICP boards) plus the Carrier-family procedure above."
          },
          {
            "label": "Ion communicating",
            "value": "NOT verifiable this session. ICP's Ion Black/Ion Gray communicating thermostats and the associated System Control communicate with ICP equipment over a 4-wire bus, but no source located documented an exact menu path or button sequence for forcing a defrost cycle through the Ion control. Do not invent a menu sequence — consult the specific Ion System Control Installation Manual, or use the physical board-level test-pin method above if the outdoor unit is accessible."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Same as Carrier: coil sensor should be cold (near/below freezing) for a natural defrost to latch, though the forced test-pin method is designed to override timing (not necessarily the coil-temp check on every board revision). Reversing valve shifts to cooling and outdoor fan stops during defrost — a cold-air burst indoors is expected and normal."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "ICP",
    "model": "FEM4X-B (Fan Coil / Air Handler, ECM blower, TXV)",
    "equip": "Air Handler",
    "summary": "ICP standard fan coil/air handler with high-efficiency ECM blower and factory TXV metering (X-suffix). Simple 24V cooling-control-only wiring - no diagnostic board on this line; only the separate communicating FCM fan-coil family carries fault codes.",
    "match": [
      "FEM4X",
      "FEM4X18",
      "FEM4X24",
      "FEM4X30",
      "FEM4X36",
      "FEM4X42",
      "FEM4X48",
      "FEM4X60",
      "FSM4X",
      "FXM4X",
      "FVM4X",
      "FCM4X",
      "FEM4P",
      "FSU4P",
      "Heil",
      "Tempstar",
      "Comfortmaker",
      "Arcoaire",
      "Day & Night",
      "KeepRite",
      "AirQuest"
    ],
    "source": "ICP Technical Support Manual, Fan Coils FEM4X (B series), part# 496 04 5501 00, Jan. 2013 (shareddocs.com)",
    "flags": [
      {
        "title": "No diagnostics on this platform - only communicating FCM has codes",
        "body": "This FEM4X-B fan coil has no status/fault LED or communicating board; wiring diagram (337519-101 Rev. B) is a simple 24V thermostat hookup, 'COOLING CONTROL ONLY' labeled on the print. ICP's separate communicating FCM fan-coil family (paired with Observer/Ion variable-speed systems) is what carries diagnostic/status codes - do not expect fault codes on a standard FEM4X-B."
      },
      {
        "title": "Speed Tap 4 is reserved for electric heat",
        "body": "Manual states verbatim: 'Speed Tap 4 (white wire) is used for electric heat only. White wire must remain on tap 4.' Moving it to boost cooling airflow will misconfigure the unit whenever an electric heat kit is installed."
      },
      {
        "title": "X = TXV, P = Piston - confirm nameplate suffix",
        "body": "Model suffix X denotes factory TXV (confirmed via parts list: Key 06 'VALVE EXPANSION'/TXV on every FEM4X-B size). A parallel P-suffix sibling line (FEM4P) ships with a piston instead. Always confirm the nameplate suffix matches the metering device physically installed before charging - do not assume from the general FEM4X family name alone."
      },
      {
        "title": "No float/overflow switch mentioned in this document",
        "body": "Parts list shows only a condensate pan (Key 09/10) and an optional PVC Condensate Trap Kit (CTK) accessory. No condensate float/overflow safety switch is referenced in this Technical Support Manual - see rating plate/install instructions or field-installed accessory kit list."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "High-efficiency ECM (E-suffix); 5 discrete speed taps (1-5) selected by moving a wire at the motor connector - not modulating/self-adjusting, not communicating",
            "key": "blower_type"
          },
          {
            "label": "Airflow setup",
            "value": "5 speed taps, CFM published per model/tap across 0.10-0.60 in. wc external static (Airflow Performance table, doc pg. 4)",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static tested",
            "value": "0.60 in. wc is the highest static column tested; return static must stay <0.40 in. wc to avoid condensate blow-out; horizontal 4200-6000 sizes need supply static >0.20 in. wc",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Filter / Electric Heat",
        "rows": [
          {
            "label": "Filter",
            "value": "Door-mounted filter; accessory Filter Kits FKS/FKM/FKL/FKX (small/medium/large/XL); FEM4X6000BT2 specifically uses a 21.5 x 19.875 x 1 in. filter - other exact sizes not published in this document, see rating plate/parts list",
            "key": "filter"
          },
          {
            "label": "Electric heat staging",
            "value": "EHK electric heater kits 5/7/9/10/15/18/20/25/30 kW; 2-element on 1800-3600 sizes, 3-element on 4200-6000 sizes; minimum CFM by heater kW published per model size (e.g. 3600B at 9 kW needs 970 CFM min)",
            "key": "elec_heat"
          }
        ]
      },
      {
        "title": "Metering / Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory TXV, all FEM4X-B sizes (parts list Key 06 = 'VALVE EXPANSION'/TXV); confirm it matches the matched condenser/heat pump's expected metering",
            "key": "metering"
          },
          {
            "label": "Drain / float switch",
            "value": "Condensate pan standard; optional PVC Condensate Trap Kit (CTK) accessory; no float/overflow switch referenced in this document",
            "key": "drain"
          }
        ]
      },
      {
        "title": "Diagnostics",
        "rows": [
          {
            "label": "Status/fault codes",
            "value": "None - simple 24V cooling-control-only wiring, no board or LED for diagnostics on this FEM4X-B family",
            "key": "diagnostics"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Bosch",
    "model": "IDS BOVB20 Inverter Ducted Split Heat Pump (R-410A)",
    "equip": "Condenser/Heat Pump",
    "summary": "Bosch inverter-driven variable-speed heat pump, R-410A refrigerant, EEV metering in the outdoor unit (heating mode), extended low-ambient heating operation down to -4F. Indoor coil uses a TXV, not an EEV.",
    "match": [
      "bosch",
      "ids",
      "bova",
      "bovb",
      "bovb20",
      "bova15",
      "inverter ducted split",
      "goliath"
    ],
    "source": "Bosch IDS BOVB20 Split System Heat Pump Installation Instructions, BTC 761701316 E (11.2023) - bosch-homecomfort.com/us; cross-checked against Bosch IDS BOVA15 Installation Instructions, BTC 761701317 E (11.2023)",
    "flags": [
      {
        "title": "Metering is EEV (ODU) + TXV (IDU) - do not treat as a TXV-only system",
        "body": "Manual states: 'The variable speed system... Electronic Expansion Valve (EEV) (ODU/heating mode only)' controls the outdoor metering device. The matched indoor coil/air handler instead requires a TXV: 'Indoor unit required! ...System TXV can be changed according to the system capacity.' Do not attempt to adjust an indoor TXV superheat setting expecting EEV behavior, and do not look for an indoor EEV board on these R-410A IDS systems."
      },
      {
        "title": "Same model designation covers both R-410A and R-454B - read the nameplate/date code",
        "body": "The BOVA15 designation is used on both an R-410A unit (BTC 761701317 E, 11.2023) and a later R-454B 'IDS Light Series' unit (BTC 762003308 D, 01.2025) with different low-pressure protection thresholds and low-ambient limits. Confirm refrigerant type from the unit nameplate/data plate before connecting gauges or charging - never assume from the model prefix alone."
      },
      {
        "title": "Charging method is app-assisted subcooling, not a fixed superheat/subcool number",
        "body": "Manual: 'Download and install the Bosch EasyAir app to assist in charging the unit. Subcooling (in cooling mode) is the only recommended method of charging above 55F outdoor ambient temperatures. For outdoor ambient temperatures below 55F use weigh-in charge method.' Design subcooling/superheat targets vary by tonnage (per-model Table 9/10 in the manual, e.g. approx. 4-8F subcool / 6-9F superheat) - pull the exact target for the specific tonnage from the manual/nameplate rather than using a single fleet-wide number."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (this document set) - verify on nameplate",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "EEV in outdoor unit (heating mode metering); TXV required in matched indoor coil/air handler",
            "key": "metering"
          },
          {
            "label": "Compressor oil",
            "value": "POE oil (VG74 or equivalent) - all R-410A variable-speed systems",
            "key": "oil"
          },
          {
            "label": "Charging method",
            "value": "Subcooling method (cooling, outdoor ambient above 55F) via Bosch EasyAir app; weigh-in method below 55F ambient or at initial install",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Pressures & Protection",
        "rows": [
          {
            "label": "High pressure cutout / cut-in",
            "value": "Opens > 580 PSIG (compressor + OD fan stop); closes < 435 PSIG (mechanical pressure switch)",
            "key": "hp_cutout"
          },
          {
            "label": "Low pressure cutout",
            "value": "< 43.5 PSIG for 5 minutes during cooling mode -> compressor + OD fan stop; system retries after 6 minutes",
            "key": "lp_cutout"
          },
          {
            "label": "Discharge temp protection (T5)",
            "value": "Compressor restarts if DT < 194F (cooling) / < 167F (heating); stops if DT > 221F (heating)",
            "key": "discharge_temp"
          },
          {
            "label": "Outdoor coil temp protection (T3)",
            "value": "Compressor de-energized if T3 > 141.8F; re-energized if T3 < 129.2F",
            "key": "coil_temp_protect"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand Defrost Control (DDC): coil thermistor T3 + outdoor ambient thermistor T4, run time, and pressure determine defrost initiation",
            "key": "defrost_type"
          },
          {
            "label": "Defrost termination",
            "value": "Outdoor coil (T3) reaches 64F for 1 minute, or defrost time exceeds 8 minutes",
            "key": "defrost_term"
          },
          {
            "label": "Manual/forced defrost",
            "value": "Call for heat running >=1 min, then hold FORCE button on inverter board 6 seconds; display shows 'dF' during test",
            "key": "manual_defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in heating mode; de-energized in cooling mode. Runs ~1 min in cooling on first heat call to build pressure before switching.",
            "key": "revvalve"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Cooling operating range",
            "value": "15F to 125F outdoor ambient (T4)",
            "key": "low_ambient_cool"
          },
          {
            "label": "Heating operating range",
            "value": "-4F to 86F outdoor ambient (T4)",
            "key": "low_ambient_heat"
          },
          {
            "label": "Backup/emergency heat lockout",
            "value": "Below -4F, unit provides 24V signal to indoor unit to energize electric heat (if installed) in place of compressor heating",
            "key": "backup_heat"
          },
          {
            "label": "Crankcase heater",
            "value": "Present; warms compressor during OFF cycle to prevent refrigerant migration/bearing washout. Wait 1 hour before start-up on initial install if ambient is below 70F.",
            "key": "crankcase"
          }
        ]
      },
      {
        "title": "Board / Fault Codes",
        "rows": [
          {
            "label": "Code format",
            "value": "2-character alphanumeric on inverter board display (H-, P-, E- prefixes); e.g. P1 = high pressure switch, P2 = low pressure, P4 = high discharge temp, H8 = pressure transducer fault, H5 = system lockout after 5x P2 in 100 min",
            "key": "fault_codes"
          },
          {
            "label": "'b'-prefix codes",
            "value": "Reserved for indoor-unit-side faults on Bosch IDS boards (e.g. sensor/communication faults reported at the indoor control) - see fault code table in matched indoor unit/air handler manual",
            "key": "b_codes"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Not applicable in the traditional sense — Bosch's current residential heat pump lineup (IDS 2.0 / BOVA / BVA outdoor units) is inverter-controlled with no separate legacy timer/demand defrost board; defrost logic lives on the inverter/outdoor control board itself. See the Force button procedure below, which is the manufacturer's documented method regardless of comm status."
          },
          {
            "label": "Inverter board Force button",
            "value": "On the outdoor unit's inverter control board, press and hold the 'Force' button for 6 seconds to begin a forced defrost test. Wait roughly 40 seconds for defrost to actually initiate — once it does, the board's display shows 'dF'. The test terminates automatically; afterward the display returns to showing running compressor speed. If a second forced-defrost test is needed, wait at least 5 minutes after the first before repeating. Source: Bosch IDS 2.0 / BOVA-BVA Service Manual, official Bosch Home Comfort technical documentation (bosch-homecomfort.com service manual, external rev.3) — page could not be parsed directly this session via automated fetch, so this is drawn from indexed manual text; confirm against the printed manual before a customer-facing test."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Bosch's Demand Defrost Control (DDC) normally triggers based on a calculated temperature difference between outdoor coil (T3) and outdoor ambient (T4) sustained for 3 minutes, or after a minimum run time keyed to ambient temp — a warm coil may prevent the forced test from actually completing even after the Force button is pressed. Expect the reversing valve to shift to cooling and the outdoor fan to stop during defrost; a burst of cold air from supply registers is normal, not a fault."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Bosch",
    "model": "IDS Light BOVA15 Inverter Ducted Split Heat Pump (R-454B)",
    "equip": "Condenser/Heat Pump",
    "summary": "Newer-generation Bosch inverter heat pump using mildly-flammable A2L refrigerant R-454B. Same BOVA15 model designation as an earlier R-410A unit, so refrigerant must be confirmed from the nameplate/red refrigerant-line tag, not the model number. Pressure protection setpoints differ meaningfully from the R-410A generation.",
    "match": [
      "bosch",
      "ids light",
      "bova15",
      "r454b",
      "r-454b",
      "a2l",
      "inverter ducted split"
    ],
    "source": "Bosch IDS Heat Pump Light Series Condensing Unit, Installation and Operating Instructions, BTC 762003308 D (01.2025) - bosch-homecomfort.com/us",
    "flags": [
      {
        "title": "A2L mildly flammable refrigerant - certification and handling rules apply",
        "body": "Manual: 'Mildly flammable refrigerant used. Follow handling instructions carefully in compliance with national regulations... Work on the refrigerant circuit with mild flammable refrigerant in safety group A2L may only be carried out by authorized heating contractors... trained in accordance with UL 60335-2-40.' All R-454B units ship with 'a red tag on the refrigerant lines to indicate the product is charged with A2L refrigerant. It should not be removed.'"
      },
      {
        "title": "Low-pressure cutout threshold is drastically different from the R-410A BOVA15/BOVB20 - do not reuse the old number",
        "body": "R-454B low pressure protection trips at < 22 PSIG for 3 seconds (cooling mode), vs. < 43.5 PSIG for 5 minutes on the R-410A generation of the same BOVA15/BOVB20 chassis. High pressure cutout/cut-in (580 PSIG open / 435 PSIG close) is unchanged between refrigerants. Confirm which refrigerant/manual revision applies before troubleshooting a low-pressure trip."
      },
      {
        "title": "Model number does not tell you the refrigerant - check the nameplate and manual revision/date",
        "body": "This R-454B unit is documented under the same 'BOVA15' designation used for the earlier R-410A unit (BTC 761701317, 11.2023). The R-454B version is documented separately as 'IDS Light Series' (BTC 762003308, 01.2025). Always verify refrigerant type from the data plate before connecting gauges, recovering, or charging."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-454B (A2L, mildly flammable) - verify on nameplate/red line tag",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "EEV in outdoor unit (heating mode metering); indoor coil requires an R-454B-rated TXV ('must be matched with R-454B TXV')",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "Subcooling method (cooling, outdoor ambient above 55F) via Bosch EasyAir app; weigh-in method below 55F ambient. Design subcool/superheat target varies by tonnage (manual table shows approx. 6-10F subcool / 8-10F superheat for larger tonnages)",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Pressures & Protection",
        "rows": [
          {
            "label": "High pressure cutout / cut-in",
            "value": "Opens > 580 PSIG (compressor + OD fan stop); closes < 435 PSIG",
            "key": "hp_cutout"
          },
          {
            "label": "Low pressure cutout",
            "value": "< 22 PSIG for 3 seconds during cooling mode -> compressor + OD fan stop; retries after 6 minutes",
            "key": "lp_cutout"
          },
          {
            "label": "Discharge temp protection (T5)",
            "value": "Compressor restarts if DT < 185F; stops if DT > 230F (cooling or heating)",
            "key": "discharge_temp"
          },
          {
            "label": "Low discharge superheat protection",
            "value": "Trips if head discharge superheat (HDSH) < 9F for last 40 minutes",
            "key": "low_dsh"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand Defrost Control (DDC) using coil thermistor T3 + outdoor ambient T4, run time, and pressure",
            "key": "defrost_type"
          },
          {
            "label": "Defrost termination",
            "value": "Outdoor coil (T3) reaches 64F for 1 minute, or defrost time exceeds 8 minutes",
            "key": "defrost_term"
          },
          {
            "label": "Manual/forced defrost",
            "value": "Call for heat running >=8 minutes, then hold FORCE button on control board 6 seconds; display shows 'dF'",
            "key": "manual_defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in heating mode; de-energized in cooling mode",
            "key": "revvalve"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Cooling operating range",
            "value": "40F to 120F outdoor ambient (T4)",
            "key": "low_ambient_cool"
          },
          {
            "label": "Heating operating range",
            "value": "3F to 86F outdoor ambient (T4)",
            "key": "low_ambient_heat"
          },
          {
            "label": "Backup/emergency heat lockout",
            "value": "Below 1.4F, unit provides 24V signal to indoor unit to energize electric heat (if installed)",
            "key": "backup_heat"
          },
          {
            "label": "Crankcase heater",
            "value": "Energizes on first power-up if compressor discharge T5 < 53.6F, or after compressor is off 3 hrs with T4 < 41F or T5 < 53.6F; de-energizes once T5 >= 60.8F and compressor runs. Recommend 12 hrs CCH energized before start-up after extended cold-weather shutdown.",
            "key": "crankcase"
          }
        ]
      },
      {
        "title": "Board / Fault Codes",
        "rows": [
          {
            "label": "Code format",
            "value": "2-character codes on control board display; e.g. E7 = compressor discharge sensor fault (T5), E81 = EEV coil fault, EA = program/drive mismatch",
            "key": "fault_codes"
          },
          {
            "label": "'b'-prefix codes",
            "value": "Indoor-unit-side faults, including A2L refrigerant sensor codes specific to this refrigerant: b3 = indoor A2L sensor fault, b4 = A2L sensor communication fault, b7 = R-454B refrigerant leakage fault (indoor), b8 = A2L sensor past service life",
            "key": "b_codes"
          }
        ]
      },
      {
        "title": "Force defrost",
        "rows": [
          {
            "label": "Non-communicating board",
            "value": "Not applicable in the traditional sense — Bosch's current residential heat pump lineup (IDS 2.0 / BOVA / BVA outdoor units) is inverter-controlled with no separate legacy timer/demand defrost board; defrost logic lives on the inverter/outdoor control board itself. See the Force button procedure below, which is the manufacturer's documented method regardless of comm status."
          },
          {
            "label": "Inverter board Force button",
            "value": "On the outdoor unit's inverter control board, press and hold the 'Force' button for 6 seconds to begin a forced defrost test. Wait roughly 40 seconds for defrost to actually initiate — once it does, the board's display shows 'dF'. The test terminates automatically; afterward the display returns to showing running compressor speed. If a second forced-defrost test is needed, wait at least 5 minutes after the first before repeating. Source: Bosch IDS 2.0 / BOVA-BVA Service Manual, official Bosch Home Comfort technical documentation (bosch-homecomfort.com service manual, external rev.3) — page could not be parsed directly this session via automated fetch, so this is drawn from indexed manual text; confirm against the printed manual before a customer-facing test."
          },
          {
            "label": "Prerequisite / safety",
            "value": "Bosch's Demand Defrost Control (DDC) normally triggers based on a calculated temperature difference between outdoor coil (T3) and outdoor ambient (T4) sustained for 3 minutes, or after a minimum run time keyed to ambient temp — a warm coil may prevent the forced test from actually completing even after the Force button is pressed. Expect the reversing valve to shift to cooling and the outdoor fan to stop during defrost; a burst of cold air from supply registers is normal, not a fault."
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Bosch",
    "model": "BVA Series Air Handler, 2-5 Ton (R-410A)",
    "equip": "Air Handler",
    "summary": "Bosch BVA-series air handler matched to IDS BOVA/BOVB condensers. Multi-tap constant-torque ECM blower (5 speed taps), TXV metering at the indoor coil (not EEV), field-supplied filter only, field-installed electric heat kits from 5-20 kW.",
    "match": [
      "bosch",
      "bva",
      "bva 2.0",
      "ids air handler",
      "bosch air handler"
    ],
    "source": "Bosch BVA Series Air Handler 2-3-4-5 Ton Capacity R410A, Installation Instructions, BTC 761701101 A (09.2015) - bosch-homecomfort.com/us",
    "flags": [
      {
        "title": "No factory filter and no factory float switch mentioned - verify field accessories are installed",
        "body": "Manual: 'External filter or other means of filtration is required. Units should be sized for a maximum of 300 feet/min. air velocity...' and filter is explicitly 'not factory-installed.' The base install manual does not document a factory condensate float/safety switch; it instead recommends field-installed 'Secondary drain pan kits... when the unit is [installed above finished space]' - confirm whether a safety switch was field-added before troubleshooting a nuisance shutdown blamed on 'float switch.'"
      },
      {
        "title": "Metering is TXV at the indoor coil, matched to outdoor unit tonnage - not an EEV",
        "body": "Unlike the outdoor IDS condenser (which uses an EEV for heating-mode metering), the BVA air handler's indoor coil uses a TXV: 'Use a wet rag or an approved heat paste to protect the TXV sensing [bulb]...' Do not look for EEV wiring/board at the air handler on this R-410A generation - if the job has an EEV-equipped indoor coil, it's a different (newer/IDS Ultra) air handler family, not the BVA."
      },
      {
        "title": "5-speed ECM is constant-torque, selected by dip/tap wiring, not auto-sensed",
        "body": "'The mult-tap ECM motor is a constant torque motor... Airflow at 208V is approximately the same as 230V.' Speed/tap selection is a field wiring choice (Tap 1-5) matched to tonnage and static pressure - verify tap wiring against the airflow table for the installed tonnage rather than assuming factory default."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Multi-tap constant-torque ECM, 5 field-selectable speed taps (Tap 1-5)",
            "key": "blower"
          },
          {
            "label": "Rated airflow",
            "value": "350-450 CFM per ton (400 CFM nominal) per manual airflow tables; shaded/excluded ranges in tables are outside 300-450 cfm/ton",
            "key": "airflow"
          },
          {
            "label": "Max external static (per airflow tables)",
            "value": "Performance tables list operation from 0 to 0.8 in. w.c. ESP depending on tonnage/tap - use the specific tonnage table, do not apply a single fleet-wide max",
            "key": "max_esp"
          },
          {
            "label": "Airflow test basis",
            "value": "Tables are 'based on cooling performance with a dry coil and no filter in place' - field ESP will typically run higher once filter/coil wet resistance is added",
            "key": "airflow_basis"
          }
        ]
      },
      {
        "title": "Filter & Condensate",
        "rows": [
          {
            "label": "Filter",
            "value": "Not factory installed - field-supplied external filter or filter grille required, sized for max 300 ft/min face velocity",
            "key": "filter"
          },
          {
            "label": "Filter cabinet size (24k model)",
            "value": "18 x 20 in. filter opening",
            "key": "filter_size_24k"
          },
          {
            "label": "Filter cabinet size (36/48/60k models)",
            "value": "20 x 22 in. filter opening",
            "key": "filter_size_big"
          },
          {
            "label": "Condensate drain",
            "value": "Primary + auxiliary drain connections; unit must be slightly inclined toward drain connection; trap must be field-formed and tested by pouring water into pan/line",
            "key": "drain"
          },
          {
            "label": "Secondary drain pan / safety switch",
            "value": "Secondary drain pan kit recommended (not always factory-installed) for installs where a leak could cause property damage - see rating plate/parts list for whether a float switch was ordered",
            "key": "float_switch"
          }
        ]
      },
      {
        "title": "Metering & Electric Heat",
        "rows": [
          {
            "label": "Metering device",
            "value": "TXV (thermostatic expansion valve) at indoor coil, matched to system tonnage",
            "key": "metering"
          },
          {
            "label": "Electric heat kits",
            "value": "Field-installed kits: EHK05A (5 kW), EHK08A (7.5 kW), EHK10A (10 kW), EHK15B (15 kW, 36/48/60 only), EHK20B (20 kW, 48/60 only) - double-pole breaker style, MCA/MOP per kit table in manual",
            "key": "heat_kits"
          },
          {
            "label": "Torque spec - drain connections",
            "value": "Do not exceed 15 ft-lbs on drain fitting connections",
            "key": "drain_torque"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  }
];

/* ------------------------------------------------------------------ *
 * Recommended clean-and-check lists. Referenced by checklist: above.
 * ------------------------------------------------------------------ */

const MAINT_CHECKLISTS = {

  furnace90: {
    title: "Clean & check — 90%+ condensing furnace",
    note: "Order matters. Combustion last, after the gas and air side are right — a combustion reading on a dirty burner and a restricted duct tells you nothing.",
    sections: [
      {
        title: "Before you open anything",
        items: [
          "Ask the homeowner what it's been doing. Write down the complaint even if there isn't one.",
          "Look at the filter before you touch it — its condition tells you what the blower wheel looks like.",
          "Read the status code / LED history before you cut power. Killing power erases what it was trying to tell you.",
          "Photograph the rating plate. Model, serial, input rate, temperature rise range, max static."
        ]
      },
      {
        title: "Power off",
        items: [
          "Filter: replace or clean. High-velocity rated only.",
          "Blower wheel: pull and inspect for debris, clean if loaded. Motors are prelubricated — do not oil.",
          "Burners: inspect and clean. Safety glasses and mask, every time.",
          "Flame sensor: clean, then reinstall. Don't sand it to bare metal.",
          "Ignitor: ohm it against the spec for THIS unit's board.",
          "Heat exchanger: inspect. Report what you see; call-out and write-up per shop policy.",
          "Condensate trap: pull the drain plug, empty into a pan, inspect, reinstall. Prime it before restart.",
          "Drain line and inducer drain: clear. A blocked drain reads as a pressure switch fault.",
          "Vent and intake pipe: every joint for tightness, whole run for blockage, correct slope back to the unit.",
          "Wiring: every connection for tightness and discoloration.",
          "Cabinet and door gasket: sealed. A leaking blower door pulls combustion products into the airstream."
        ]
      },
      {
        title: "Power on, running",
        items: [
          "Watch the full sequence of operation start to finish. Inducer, prove, warm-up, ignition, flame sense, blower on.",
          "Flame signal: read it and write the number down. Compare against the board spec, not a rule of thumb.",
          "Flame picture: stable, correct color, no lifting off the burner.",
          "Supply gas pressure with every other gas appliance in the house running.",
          "Manifold pressure. Both stages on a two-stage unit.",
          "Clock the meter during normal operation. All other gas appliances off.",
          "Temperature rise against the rating plate range.",
          "Total external static, supply and return. Compare to the unit's max.",
          "Blower amp draw against the motor nameplate.",
          "Blower-off delay: supply air 90–110°F at dropout.",
          "Combustion analysis after 15 minutes at correct rate. CO must not exceed 100 ppm.",
          "Verify every safety: rollout, limits, prove switches, door switch. Never bypass and leave."
        ]
      },
      {
        title: "Before you leave",
        items: [
          "CO test in the living space, not just at the flue.",
          "Thermostat back the way the customer had it.",
          "Every panel and door back on and secured.",
          "Write the actual numbers on the invoice — flame signal, manifold, rise, static, CO. Next year's tech needs a baseline.",
          "Tell the customer what you found and what you'd watch."
        ]
      }
    ]
  },

  furnace80: {
    title: "Clean & check — 80% non-condensing furnace",
    note: "Same bones as the 90% list, minus the condensate system, plus a venting check that carries real risk. Don't skip the last section because the furnace ran fine.",
    sections: [
      {
        title: "Before you open anything",
        items: [
          "Ask what it's been doing. Note the complaint.",
          "Filter condition before you touch it.",
          "Read the status code / LED history before cutting power.",
          "Photograph the rating plate — input rate, rise range, max static.",
          "Look at the vent connector from the furnace to the chimney before anything else. Rust, disconnected sections, backward slope, screws missing."
        ]
      },
      {
        title: "Power off",
        items: [
          "Filter: replace or clean.",
          "Blower wheel: inspect and clean. Do not oil the motor.",
          "Burners: inspect and clean. Safety glasses and mask.",
          "Flame sensor: clean and reinstall.",
          "Ignitor: ohm against spec.",
          "Heat exchanger: inspect. Report per shop policy.",
          "Inducer wheel and housing: clean, check for play in the bearing.",
          "Vent connector: correct rise, correct slope, properly sized, secured at every joint, no soft rusted spots.",
          "Wiring: connections tight, no discoloration.",
          "Cabinet and door gasket sealed."
        ]
      },
      {
        title: "Power on, running",
        items: [
          "Full sequence of operation, start to finish.",
          "Flame signal, written down.",
          "Flame picture: stable, no rollout, no lazy yellow tips.",
          "Supply gas pressure with the whole house's gas load running.",
          "Manifold pressure — off the correct table for this input rate, altitude and specific gravity.",
          "Clock the meter during normal operation.",
          "Temperature rise against the rating plate.",
          "Total external static, supply and return.",
          "Blower amp draw against nameplate.",
          "Combustion analysis after 15 minutes. CO not to exceed 100 ppm.",
          "Verify safeties: rollout, limit, pressure switch, door switch."
        ]
      },
      {
        title: "Venting — the part that matters most on an 80%",
        items: [
          "Draft: confirm the vent actually draws with the furnace at steady state.",
          "Check for spillage at the draft hood of every other appliance on that flue.",
          "WORST CASE DEPRESSURIZATION: close all windows and exterior doors, run the clothes dryer, run every exhaust fan and range hood on high, close fireplace dampers.",
          "With the house in that state, fire the water heater alone and check for spillage at the draft hood after 5 minutes.",
          "If it spills, the venting gets corrected or combustion air gets added before you leave. This is not a next-visit item.",
          "Restore doors, windows, fans and dampers to how you found them."
        ]
      },
      {
        title: "Before you leave",
        items: [
          "CO test in the living space.",
          "Thermostat restored.",
          "All panels on and secured.",
          "Write the numbers on the invoice.",
          "Tell the customer what you found."
        ]
      }
    ]
  },
  heatpump: {
    title: "Clean & check — heat pump / AC condenser",
    note: "A heat pump runs year round, so check it in the mode it'll be worked hardest in and don't skip the reversing valve and defrost. Charge is verified by the numbers (subcool/superheat), never by feel — use the Charging Calc.",
    sections: [
      {
        title: "Before you open anything",
        items: [
          "Ask what it's been doing; write down the complaint even if there isn't one.",
          "Read the fault/alarm history at the control or communicating thermostat before you cut power — killing power erases it.",
          "Photograph the rating plate: model, serial, refrigerant, RLA/LRA, MCA/MOCP, factory charge and line-length adder.",
          "Note the metering device (TXV/EEV or fixed piston) and whether it's communicating — it changes how you charge and diagnose."
        ]
      },
      {
        title: "Power off",
        items: [
          "Condenser coil: clean top-to-bottom with the correct cleaner, rinse it fully out, straighten fins. A dirty coil fakes an overcharge.",
          "Contactor: check points for pitting/burning; verify it pulls in and drops out.",
          "Run capacitor(s): measure µF against the nameplate (within about ±6%). A weak cap reads as a hard-starting or locked-rotor compressor.",
          "Fan motor: check bearings/end play and the blade; verify it's tight and balanced.",
          "Reversing valve: inspect the solenoid coil and connections (heat pumps).",
          "Crankcase heater: verify it's working if equipped — flooded start-ups kill compressors.",
          "Wiring and lugs: every connection for tightness and discoloration. Disconnect/whip intact.",
          "Base pan and defrost drain (heat pump): clear so melt water doesn't refreeze."
        ]
      },
      {
        title: "Power on, running",
        items: [
          "Watch the full sequence of operation; listen for the compressor and fan starting clean.",
          "Compressor and fan amps against the rating-plate RLA/FLA.",
          "Verify the charge by the numbers: subcooling on a TXV/EEV system, superheat on a fixed-orifice system, to the nameplate target — use the Charging Calc. On inverter/communicating units use the manufacturer's charge mode, not gauge targets.",
          "Head and suction pressures against the manufacturer chart for the outdoor temperature.",
          "Temperature split at the coil (expect a tighter split on a humid day — see Local Weather).",
          "Heating: confirm the reversing valve shifts fully and the unit makes heat; verify defrost initiates and terminates, and that backup/aux heat locks out per the balance point.",
          "Low-ambient behavior if the unit runs mechanical cooling in cold weather (head-pressure control)."
        ]
      },
      {
        title: "Before you leave",
        items: [
          "All panels and the disconnect cover back on and secured.",
          "Write the actual numbers on the invoice — subcool/superheat, compressor and fan amps, capacitor µF, head/suction. Next year's tech needs a baseline.",
          "Tell the customer what you found and what you'd watch."
        ]
      }
    ]
  },
  airhandler: {
    title: "Clean & check — air handler / fan coil",
    note: "This is where comfort and callbacks live: airflow, condensate, and the electric heat. Set airflow by the numbers (CFM per ton) and prove the drain and float switch before you leave.",
    sections: [
      {
        title: "Before you open anything",
        items: [
          "Ask what it's been doing; note the complaint.",
          "Look at the filter before you touch it — its condition tells you what the blower wheel and coil look like.",
          "Read any status codes at the control before cutting power.",
          "Photograph the rating plate and the electric-heat kit rating (kW / stages)."
        ]
      },
      {
        title: "Power off",
        items: [
          "Filter: replace or clean, correct MERV/size for the system.",
          "Blower wheel and housing: inspect and clean; a loaded wheel loses serious CFM. ECM motors are not oiled.",
          "Evaporator coil: inspect both faces and clean; check for bent fins and a clean drain slope.",
          "Condensate pan, trap and drain line: clear and flush; confirm the trap is correct for a draw-through coil and isn't dry or airbound.",
          "Float / safety switch: test that it actually opens the circuit before water reaches the ceiling.",
          "Metering device: confirm the piston or TXV/EEV matches the outdoor unit.",
          "Electric heat: inspect elements, sequencers/relays and the limit; check the whip and lug torque on the heat kit.",
          "Cabinet and door gasket sealed; check for coil sweating and intact insulation (see the humidity diagnostics if it's wet)."
        ]
      },
      {
        title: "Power on, running",
        items: [
          "Full sequence of operation; blower ramps and runs smooth.",
          "Blower amp draw against the motor nameplate.",
          "Set/verify airflow — CFM per ton via the dip switches / speed taps for this system (about 350–400 CFM/ton; lower end helps latent removal in humid weather).",
          "Total external static, supply and return, against the unit's maximum. High static is the hidden cause of most airflow complaints.",
          "Temperature split across the coil.",
          "Electric heat: verify each stage/sequencer energizes and the limit/one-shot resets; check amp draw per element.",
          "Condensate: confirm it flows to the drain and the float switch shuts the system down when lifted."
        ]
      },
      {
        title: "Before you leave",
        items: [
          "All panels on and secured; drain proven flowing.",
          "Write the numbers on the invoice — external static, CFM/airflow setting, delta-T, heat-kit amps.",
          "Tell the customer what you found."
        ]
      }
    ]
  }
};

/* ------------------------------------------------------------------ *
 * Rendering
 * ------------------------------------------------------------------ */

const maintState = { query: "", equip: "", open: null, tab: "figures" };

function maintNormalize(s) {
  return (s || "").toString().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function maintMatches(entry, q) {
  if (!q) return true;
  const n = maintNormalize(q);
  if (!n) return true;
  const hay = [entry.brand, entry.model, entry.summary, entry.equip]
    .concat(entry.match || [])
    .map(maintNormalize);
  return hay.some(h => h.includes(n) || (n.length >= 4 && h.startsWith(n.slice(0, 4)) && h.includes(n.slice(0, 4))));
}

function renderMaint() {
  const results = document.getElementById("maintResults");
  const empty = document.getElementById("maintEmptyState");
  const input = document.getElementById("maintSearchInput");
  const equipSel = document.getElementById("maintEquipChips");
  if (!results) return;

  // Populate the equipment filter once.
  if (equipSel && !equipSel.dataset.filled) {
    const kinds = [...new Set(MAINT_SPECS.map(e => e.equip))].sort();
    equipSel.innerHTML = '<option value="">All equipment</option>' +
      kinds.map(k => `<option value="${k}">${k}</option>`).join("");
    equipSel.dataset.filled = "1";
    equipSel.addEventListener("change", () => {
      maintState.equip = equipSel.value;
      renderMaint();
    });
  }

  if (input && !input.dataset.wired) {
    input.dataset.wired = "1";
    input.addEventListener("input", () => {
      maintState.query = input.value;
      maintState.open = null;
      renderMaint();
    });
  }

  const list = MAINT_SPECS.filter(e =>
    (!maintState.equip || e.equip === maintState.equip) &&
    maintMatches(e, maintState.query)
  );

  if (!list.length) {
    results.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  results.innerHTML = list.map((entry, i) => {
    const id = entry.brand + "|" + entry.model;
    const isOpen = maintState.open === id;
    return `
      <article class="card maint-card">
        <button class="maint-head" data-maint-toggle="${id}">
          <div>
            <div class="maint-title">${entry.brand} ${entry.model}</div>
            <div class="maint-sub">${entry.summary}</div>
          </div>
          <span class="maint-caret">${isOpen ? "▾" : "▸"}</span>
        </button>
        ${isOpen ? maintBody(entry) : ""}
      </article>`;
  }).join("");

  results.querySelectorAll("[data-maint-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.maintToggle;
      maintState.open = maintState.open === id ? null : id;
      maintState.tab = "figures";
      renderMaint();
      if (typeof trackEvent === "function" && maintState.open) {
        trackEvent("maint figures " + id);
      }
    });
  });

  results.querySelectorAll("[data-maint-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      maintState.tab = btn.dataset.maintTab;
      renderMaint();
    });
  });
}

function maintBody(entry) {
  const tabs = `
    <div class="maint-tabs">
      <button class="maint-tab ${maintState.tab === "figures" ? "on" : ""}" data-maint-tab="figures">Figures</button>
      <button class="maint-tab ${maintState.tab === "checklist" ? "on" : ""}" data-maint-tab="checklist">Recommended list</button>
    </div>`;

  if (maintState.tab === "checklist") {
    const cl = MAINT_CHECKLISTS[entry.checklist];
    if (!cl) return tabs + `<div class="maint-empty">No checklist mapped for this unit yet.</div>`;
    return tabs + `
      <div class="maint-body">
        <div class="maint-cl-title">${cl.title}</div>
        <div class="maint-note">${cl.note}</div>
        ${cl.sections.map(s => `
          <div class="maint-group">
            <div class="maint-group-title">${s.title}</div>
            <ul class="maint-cl">
              ${s.items.map(it => `<li>${it}</li>`).join("")}
            </ul>
          </div>`).join("")}
      </div>`;
  }

  return tabs + `
    <div class="maint-body">
      ${(entry.flags || []).map(f => `
        <div class="maint-flag">
          <div class="maint-flag-title">${f.title}</div>
          <div>${f.body}</div>
        </div>`).join("")}
      ${entry.groups.map(g => `
        <div class="maint-group">
          <div class="maint-group-title">${g.title}</div>
          <table class="maint-table">
            ${g.rows.map(r => `
              <tr class="${r.key ? "maint-key" : ""}">
                <td class="maint-label">${r.label}</td>
                <td class="maint-value">${r.value}</td>
              </tr>`).join("")}
          </table>
        </div>`).join("")}
      <div class="maint-source">${entry.source} · Always confirm against the rating plate on the unit in front of you.</div>
    </div>`;
}
