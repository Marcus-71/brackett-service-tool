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
