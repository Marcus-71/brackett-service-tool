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
  },
{
    "brand": "Lennox",
    "model": "SL280V / SL280NV",
    "equip": "Gas Furnace",
    "summary": "Two-stage, variable-speed, communicating (iComfort/S40-capable) 80% gas furnace, SureLight integrated control. Covers SL280UHV, SL280DFV (dual fuel), SL280UHNV (Canada low-NOx).",
    "match": [
      "SL280V",
      "SL280NV",
      "SL280UHV",
      "SL280DFV",
      "SL280UHNV",
      "SL280UH",
      "two-stage",
      "variable speed",
      "communicating",
      "icomfort",
      "80%",
      "furnace"
    ],
    "source": "Lennox SL280UHV Installation Instructions, Corp. 508245-01 (02/2022); Lennox SL280UHNV Service Literature, Corp. 1601-L8 (2021), tech.lennoxintl.com",
    "flags": [
      {
        "title": "No fixed flame-sense µA pass/fail threshold published",
        "body": "This is a communicating (SureLight/iComfort) integrated control, not an older fixed-threshold board. The control's Flame Signal Mode (menu 'F') displays LIVE flame current on the 7-segment LED in microamps, but Corp. 1601-L8 does not publish a numeric normal/low/dropout table - diagnosis is by comparing the live reading before/after cleaning the sensor rather than to a fixed spec. Do not assume a generic µA cutoff for this board family."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "SureLight integrated control (communicating)",
            "value": "Live µA readout only via Flame Signal Mode (menu 'F') on 7-seg LED - no fixed normal/low/dropout numbers published",
            "key": true
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (low/high fire), 0-4500 ft",
            "value": "1.7 in. w.g. low fire / 3.5 in. w.g. high fire",
            "key": true
          },
          {
            "label": "Manifold pressure NG, 4500-7500 ft (derate)",
            "value": "~1.5-1.6 in. w.g. low fire / 2.8-3.4 in. w.g. high fire (size-dependent, see Table 19)",
            "key": false
          },
          {
            "label": "Manifold pressure LP/propane (low/high fire)",
            "value": "4.5 in. w.g. low fire / 10.0 in. w.g. high fire (LP changeover kit required)",
            "key": true
          },
          {
            "label": "Supply line pressure NG",
            "value": "4.5 in. w.g. min / 13.0 in. w.g. max"
          },
          {
            "label": "Supply line pressure LP",
            "value": "10.0-11.0 in. w.g. min / 13.0 in. w.g. max"
          },
          {
            "label": "Orifice, NG (070/090/110)",
            "value": ".063 / .055 (size-specific, high-altitude kit swaps this - see Table 21)"
          },
          {
            "label": "Orifice, LP/propane",
            "value": ".034 / .032"
          },
          {
            "label": "Gas valve",
            "value": "Two-stage redundant valve, factory-set, non-adjustable regulator; 1/8 NPT test ports at valve for manifold/supply pressure"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.8 in. w.g. heating / 1.0 in. w.g. cooling - do not exceed heating ESP, causes erratic limit operation",
            "key": true
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-size specific; not consolidated in Corp. 508245-01)"
          },
          {
            "label": "Blower",
            "value": "Variable-speed ECM, DIP-switch selectable heat/cool speeds (+24% to -18% of factory default)"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "SureLight silicon nitride hot-surface ignitor, 39-70 Ω across terminals 1-5 (5-pin plug), 120VAC ±10% regulated, 20-sec warm-up",
            "key": true
          },
          {
            "label": "Primary/secondary limits",
            "value": "Auto-reset, factory-set, no published trip temperature ('not published' in Corp. 508245-01/1601-L8)"
          },
          {
            "label": "Flame rollout switches (2)",
            "value": "Manual-reset, factory-set, no published trip temperature"
          },
          {
            "label": "Pressure switches",
            "value": "Factory-set, non-adjustable; high-altitude kits 69W56/73W33/73W34/73W35 swap switch per altitude band (see Table 20)"
          },
          {
            "label": "Altitude derate",
            "value": "No change 0-4500 ft; NG manifold pressure/orifice derate 4500-7500 ft; high-altitude NG orifice kit required 7500-10,000 ft"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Lennox",
    "model": "SL297NV",
    "equip": "Gas Furnace",
    "summary": "Two-stage, variable-speed, communicating (iComfort/S40-capable) 97% condensing gas furnace, SureLight integrated control. Natural gas only - no LP/propane conversion kit published.",
    "match": [
      "SL297NV",
      "SL297UHNV",
      "97%",
      "two-stage",
      "variable speed",
      "communicating",
      "icomfort",
      "condensing",
      "furnace"
    ],
    "source": "Lennox SL297UHNV Installation Instructions, Corp. 507760-02 (02/2018); Lennox SL297UHNV Service Literature, Corp. 1802-L1 (rev. 02/2021), lennox.com / tech.lennoxintl.com",
    "flags": [
      {
        "title": "Natural gas only - do not attempt an LP conversion",
        "body": "Corp. 507760-02 contains no LP/propane orifice or conversion-kit table for the SL297UHNV (unlike the SL280V family, which has one). The gas piping/CSA references to 'Natural Gas and Propane' in this literature are generic code citations, not a model-specific LP option. Confirm fuel type against the model/rating plate before ordering parts - do not substitute an SL280 LP kit."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "SureLight integrated control (communicating)",
            "value": "Live µA readout only via Flame Signal Mode push-button/menu - no fixed normal/low/dropout numbers published in Corp. 1802-L1",
            "key": true
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (low/high fire), all models",
            "value": "1.7 in. w.g. low fire / 3.5 in. w.g. high fire",
            "key": true
          },
          {
            "label": "Supply line pressure NG",
            "value": "4.5 in. w.g. min / 13.0 in. w.g. max"
          },
          {
            "label": "LP/propane",
            "value": "Not offered - see flag"
          },
          {
            "label": "Combustion CO2% (NG, low/high fire)",
            "value": "040: 6.3-7.8% | 060: 6.5-8.2% | 080: 7.2-8.4%"
          },
          {
            "label": "Gas valve",
            "value": "Redundant two-stage valve; 1/8 NPT manifold/supply test ports"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.8 in. w.g. heating / 1.0 in. w.g. cooling"
          },
          {
            "label": "Temperature rise range",
            "value": "45-75°F (-040 low-input) / 40-70°F (-040 high-input, -060, -080) per Corp. 1802-L1 spec tables - confirm against rating plate",
            "key": true
          },
          {
            "label": "Blower",
            "value": "Variable-speed ECM; continuous-fan selectable 28/38/70/100% of 2nd-stage cool speed, min 250 cfm"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "SureLight silicon nitride hot-surface ignitor, 39-70 Ω across terminals 1-5, 120VAC ±10%, 20-sec warm-up",
            "key": true
          },
          {
            "label": "Primary limit / rollout switches",
            "value": "Auto-reset limit, manual-reset flame rollout; factory-set, no published trip temperature"
          },
          {
            "label": "Pressure switch / inducer calibration",
            "value": "Control self-calibrates combustion-air-inducer prove switch each heat cycle; calibration-failure codes E229/watchguard calibration failure logged if it can't complete"
          },
          {
            "label": "Altitude derate",
            "value": "NOT approved for installations above 4500 ft (Corp. 507760-02) - no high-altitude kit published for this model"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Lennox",
    "model": "EL296V / EL296E",
    "equip": "Gas Furnace",
    "summary": "Two-stage 96% condensing gas furnace, SureLight integrated control. EL296UHV is variable-speed/communicating (iComfort); EL296UHE is constant-torque, non-communicating. Flame-sense µA thresholds below are keyed to the EL296UHE control (103699) - the UHV communicating control shows live µA only, no fixed thresholds published.",
    "match": [
      "EL296V",
      "EL296E",
      "EL296UHV",
      "EL296UHE",
      "EL296DFV",
      "96%",
      "two-stage",
      "condensing",
      "elite series",
      "furnace"
    ],
    "source": "Lennox EL296UHV(X) Service Literature, Corp. 1125-L5 (2021); Lennox EL296UHE Service Literature, Corp. 1246-L10 (2014), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Flame-sense µA table is EL296UHE (board 103699) only - EL296UHV communicating control has no fixed threshold",
        "body": "Corp. 1246-L10 (EL296UHE) publishes a fixed flame-signal table keyed to integrated control 103699: Normal 2.6 µA or greater, Low 2.5 µA or less, Drop Out ~0.6 µA. The EL296UHV/EL296DFV (iComfort communicating SureLight control) only displays a LIVE µA reading in Flame Signal Mode ('F' menu) per Corp. 1125-L5 - no numeric pass/fail table is published for that board. Confirm which control is installed before applying the EL296UHE numbers."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board 103699 (EL296UHE, non-communicating)",
            "value": "Normal 2.6 µA or greater / Low 2.5 µA or less / Drop Out ~0.6 µA",
            "key": true
          },
          {
            "label": "EL296UHV/DFV communicating SureLight control",
            "value": "Live µA readout only via Flame Signal Mode - no fixed thresholds published"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (low/high fire), 0-4500 ft",
            "value": "1.7 in. w.g. low fire / 3.5 in. w.g. high fire",
            "key": true
          },
          {
            "label": "Manifold pressure NG, derated bands to 7500 ft",
            "value": "As low as 1.5/3.1 in. w.g. depending on size - see Table 31, Corp. 1125-L5"
          },
          {
            "label": "Manifold pressure LP/propane (low/high fire)",
            "value": "4.5 in. w.g. low fire / 10.0 in. w.g. high fire (changeover kit required)",
            "key": true
          },
          {
            "label": "Supply line pressure NG",
            "value": "4.5 in. w.g. min / 13.0 in. w.g. max"
          },
          {
            "label": "Supply line pressure LP",
            "value": "11.0 in. w.g. min / 13.0 in. w.g. max"
          },
          {
            "label": "Gas valve",
            "value": "Two-stage redundant valve, internally regulated, 1/8 NPT test ports"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.8 in. w.g. heating / 1.0 in. w.g. cooling",
            "key": true
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (ranges from 20-50°F to 55-85°F across sizes per Corp. 1125-L5/1246-L10 spec tables)"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "SureLight silicon nitride hot-surface ignitor, 39-70 Ω across terminals, 20-sec warm-up",
            "key": true
          },
          {
            "label": "Flame rollout switch (S47)",
            "value": "N.C. SPST manual-reset, one per side of burner box, factory-set trip temp not published"
          },
          {
            "label": "Primary/secondary limits",
            "value": "Auto-reset, factory-set, no published trip temperature"
          },
          {
            "label": "Altitude derate",
            "value": "Approved 0-10,000 ft with manifold pressure/pressure-switch adjustment per Table 31/32 - no hard altitude ceiling like SL297NV"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Lennox",
    "model": "EL280",
    "equip": "Gas Furnace",
    "summary": "Two-stage 80% non-condensing gas furnace (upflow/horizontal EL280UH(X)(E), dual-fuel EL280DF(E)), SureLight integrated control 103699-XX/107048-XX family. Notably low max external static (0.5 in. w.g.) vs. the 90%+ Lennox lines.",
    "match": [
      "EL280",
      "EL280UH",
      "EL280UHX",
      "EL280UHE",
      "EL280DF",
      "EL280DFE",
      "80%",
      "two-stage",
      "non-condensing",
      "furnace"
    ],
    "source": "Lennox EL280UH(X)E Installation Instructions, Corp. 507908-02 (04/2024); Lennox EL280DF Service Literature, Corp. 1139-L11 (rev. 06/2016), tech.lennoxintl.com / lennox.com",
    "flags": [
      {
        "title": "Max external static is only 0.5 in. w.g. - notably lower than SL/EL condensing lines",
        "body": "Both EL280UH(X) and EL280DF spec tables (Corp. 507908-02, 1139-L11) list 0.5 in. w.g. as the high-static/max ESP rating for heating AND cooling - well below the 0.8/1.0 in. w.g. figures on the SL280V/EL296V condensing furnaces. On a duct system sized for a condensing replacement, verify actual static against this lower EL280 ceiling before assuming the blower can handle it."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board 103699-XX / 107048-XX",
            "value": "Normal 1.9 µA or greater / Low 1.4 µA or less / Drop Out ~0.20 µA (per Corp. 1139-L11 EL280DF service literature)",
            "key": true
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (low/high fire), 0-7500 ft",
            "value": "1.7 in. w.g. low fire / 3.5 in. w.g. high fire",
            "key": true
          },
          {
            "label": "Manifold pressure NG, 4500-7500 ft derate",
            "value": "As low as 1.5/2.8 in. w.g. depending on size"
          },
          {
            "label": "Manifold pressure LP/propane (low/high fire)",
            "value": "4.5 in. w.g. low fire / 10.0 in. w.g. high fire (changeover kit required)",
            "key": true
          },
          {
            "label": "Supply line pressure NG / LP",
            "value": "4.5-13.0 in. w.g. (NG) / 11.0-13.0 in. w.g. (LP)"
          },
          {
            "label": "Gas valve",
            "value": "Two-stage redundant valve, 1/8 NPT test ports"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.5 in. w.g. (heating and cooling) - see flag",
            "key": true
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (ranges 20-50°F to 40-70°F across sizes per Corp. 1139-L11 spec tables)"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "SureLight silicon nitride hot-surface ignitor, 39-70 Ω, 20-sec warm-up",
            "key": true
          },
          {
            "label": "Rollout/limit switches",
            "value": "Factory-set, auto/manual-reset per switch type; no published trip temperature"
          },
          {
            "label": "Altitude derate",
            "value": "NG orifice/manifold pressure adjustment 4500-7500 ft; high-altitude NG orifice kit required 7500-10,000 ft"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Lennox",
    "model": "ML195 / ML196E",
    "equip": "Gas Furnace",
    "summary": "Single-stage condensing gas furnaces (ML195UH 95% AFUE, ML196UHE 96% AFUE / constant-torque blower), SureLight integrated control. Same gas train figures across both; flame-sense µA thresholds differ by control and are listed per model below.",
    "match": [
      "ML195",
      "ML195UH",
      "ML195DF",
      "EL195UHNE",
      "ML196E",
      "ML196UHE",
      "ML196DFE",
      "95%",
      "96%",
      "single-stage",
      "condensing",
      "merit series",
      "furnace"
    ],
    "source": "Lennox EL195UHNE Service Literature, Corp. 1801-L1 (rev. 02/2021); Lennox ML195DF Installation Instructions, Corp. 507269-03f; Lennox ML196UHE Service Literature, Corp. 1911-L7 (07/2020), tech.lennoxintl.com / lennox.com",
    "flags": [
      {
        "title": "Flame-sense µA differs between the ML195 and ML196E control - do not cross-apply",
        "body": "The ML195/EL195UHNE literature (Corp. 1801-L1) publishes Normal 2.6 µA or greater / Low 2.5 µA or less / Drop Out 1.1 µA. The ML196UHE literature (Corp. 1911-L7) publishes a DIFFERENT table: Normal 1.5 µA or greater / Low 0.5-1.4 µA / Drop Out 0.4 µA. These are not interchangeable - confirm the model (and therefore the control board generation) before judging a flame-sense reading as good or marginal."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "ML195UH / EL195UHNE control",
            "value": "Normal 2.6 µA or greater / Low 2.5 µA or less / Drop Out ~1.1 µA",
            "key": true
          },
          {
            "label": "ML196UHE control",
            "value": "Normal 1.5 µA or greater / Low 0.5-1.4 µA / Drop Out ~0.4 µA",
            "key": true
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (single-stage, all sizes)",
            "value": "3.5 in. w.g.",
            "key": true
          },
          {
            "label": "Manifold pressure LP/propane",
            "value": "10.0 in. w.g. (changeover kit required)",
            "key": true
          },
          {
            "label": "Supply line pressure NG",
            "value": "4.5-10.5 in. w.g."
          },
          {
            "label": "Supply line pressure LP",
            "value": "11.0-13.0 in. w.g."
          },
          {
            "label": "Gas valve",
            "value": "Internally redundant single-stage valve, gas control switch and 24VAC terminals on valve top, 1/8 NPT test ports"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure (high static)",
            "value": "0.5 in. w.g.",
            "key": true
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (ranges 25-55°F to 50-80°F across sizes per spec tables)"
          },
          {
            "label": "Blower",
            "value": "ML195UH: DC brushless constant-torque; ML196UHE: constant-torque ECM"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "Nitride hot-surface ignitor, 39-70 Ω, 102-132VAC to ignitor",
            "key": true
          },
          {
            "label": "Rollout switch (S47)",
            "value": "Auto-reset, factory-set, breaks 24V to R on trip; trip temperature not published - see rating plate"
          },
          {
            "label": "Primary limit (S10)",
            "value": "Factory-set, auto-reset, no published trip temperature"
          },
          {
            "label": "Altitude derate",
            "value": "Approved 0-10,000 ft; NG manifold pressure steps down 4501-7500 ft, high-altitude orifice kit required above 7500 ft, pressure-switch kit required 4501-10,000 ft"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Lennox",
    "model": "ME180 / ML180",
    "equip": "Gas Furnace",
    "summary": "Single-stage 80% non-condensing gas furnace (ML180UH/UHE/UHV upflow-horizontal, ML180DF/DFE dual-fuel). SureLight integrated control shares the same flame-signal table as ML196UHE. 'ME180' commercial-brand/model-alias figures not independently found in Lennox literature - treat as ML180 platform and confirm off the rating plate.",
    "match": [
      "ME180",
      "ML180",
      "ML180UH",
      "ML180UHE",
      "ML180UHV",
      "ML180DF",
      "ML180DFE",
      "80%",
      "single-stage",
      "non-condensing",
      "merit series",
      "furnace"
    ],
    "source": "Lennox ML180DFE Service Literature, Corp. 1121-L4 (2017); Lennox ML180UHA Service Literature, Corp. 1218-L4 (2017), tech.lennoxintl.com / lennox.com",
    "flags": [
      {
        "title": "'ME180' not confirmed as a distinct Lennox literature model",
        "body": "No ME180-specific installation or service literature was located on tech.lennoxintl.com or lennox.com during this research - only ML180 family documents. If a unit is nameplated 'ME180', treat the figures below as a starting point only and verify every value (especially manifold pressure and temp rise) against that unit's own rating plate before servicing."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "ML180DFE / ML180UH(X)(E) SureLight control",
            "value": "Normal 1.5 µA or greater / Low 0.5-1.4 µA / Drop Out ~0.4 µA (per Corp. 1121-L4)",
            "key": true
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure NG (single-stage, all sizes, 0-10,000 ft)",
            "value": "3.5 in. w.g. - does not step down with altitude (pressure-switch kit swap used instead)",
            "key": true
          },
          {
            "label": "Manifold pressure LP/propane",
            "value": "10.0 in. w.g. (changeover kit required)",
            "key": true
          },
          {
            "label": "Supply line pressure NG",
            "value": "4.5-13.0 in. w.g."
          },
          {
            "label": "Supply line pressure LP",
            "value": "11.0-13.0 in. w.g."
          },
          {
            "label": "Gas valve",
            "value": "Single-stage redundant valve, 1/8 NPT test ports"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure (high static)",
            "value": "0.5 in. w.g.",
            "key": true
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-size specific per Corp. 1121-L4/1218-L4 spec tables)"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor",
            "value": "Nitride hot-surface ignitor, 39-70 Ω, 20-sec warm-up",
            "key": true
          },
          {
            "label": "Rollout/primary limit switches",
            "value": "Factory-set, auto/manual-reset per switch type; trip temperature not published"
          },
          {
            "label": "Altitude derate",
            "value": "Approved 0-10,000 ft; NG manifold pressure essentially unchanged by altitude, high-altitude pressure-switch kit required above 4500-7500 ft (size-dependent) - see Table 13, Corp. 1121-L4"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Lennox",
    "model": "XP21",
    "equip": "Heat Pump",
    "summary": "2-5 ton two-stage scroll heat pump (SilentComfort Technology), R-410A. Note: Lennox literature classifies XP21 as a TWO-STAGE compressor unit, not a variable-speed/inverter model - correcting a common assumption. Optional iComfort S30 communicating control; also runs as a conventional multi-stage unit.",
    "match": [
      "XP21"
    ],
    "source": "Lennox Product Specifications XP21 (ehb_xp21_2010.pdf) and Corp. 507217-02 Installation Instructions, tech.lennoxintl.com",
    "flags": [
      {
        "title": "Confirm compressor staging before quoting repairs",
        "body": "Lennox literature lists the XP21 as a Two-Stage Scroll Compressor (SilentComfortTM), not a fully variable-capacity/inverter unit. Don't assume inverter-drive board diagnostics apply - use the standard two-stage IFC/defrost board fault codes (Five-Strike lockout) instead."
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
            "value": "Factory TXV (field-matched via TXV Usage/Substitution tables to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - charge is line-set-length and indoor-coil dependent; do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost control",
            "value": "IntelliFrostTM Adaptive (demand) Defrost - outdoor temp, coil temp & compressor run-time inputs; field jumper selectable at 50°F/70°F/90°F/MAX, default 50°F",
            "key": "defrost_type"
          },
          {
            "label": "Reversing valve",
            "value": "Factory-installed 4-way valve, pressure-differential operated; energized state not specified in reviewed literature - verify against unit wiring diagram",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present, automatic reset, monitored by control board with 5-Strike lockout; exact cutout/cutin psig not published - see rating plate/switch part label",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "No specific °F threshold published; Compressor Low Ambient Cut-Off + Freezestat recommended when Low Ambient Kit (68M04) is installed",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Yes, factory-installed w/ thermostat (S40) - energize 24 hrs before startup",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "Optional iComfort S30 Wi-Fi communicating; also operates as a conventional 2-stage unit with standard thermostats",
            "key": "communicating"
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
    "model": "XP20 / EL22XPV / EL18XPV / SL25XPV / SL22XPV",
    "equip": "Heat Pump",
    "summary": "2-5 ton variable-capacity heat pumps (DC Inverter, Precise ComfortTM Technology), R-410A, spanning the Signature (SL), Elite (EL) and XP tiers. Share the same DC-inverter variable rotary/scroll compressor platform and control logic. iComfort Communicating Thermostat is REQUIRED (not furnished) - these are not compatible with conventional non-communicating thermostats.",
    "match": [
      "XP20",
      "EL22XPV",
      "EL18XPV",
      "SL25XPV",
      "SL22XPV"
    ],
    "source": "Lennox Product Specifications: XP20 (ehb_xp20_2010.pdf), EL18XPV (ehb_el18xpv_2104.pdf), SL25XPV (ehb_sl25xpv_2109.pdf), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Communicating thermostat is mandatory, not optional",
        "body": "Unlike XP21/XP17-class units, XP20/EL22XPV/EL18XPV/SL25XPV/SL22XPV literature explicitly states an iComfort Communicating Thermostat is required and is NOT furnished with the unit. A conventional stat will not run the outdoor unit correctly - confirm the correct iComfort stat is on the job before committing to a repair/replacement quote."
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
            "value": "Factory TXV/EEV per TXV Usage table (field-matched to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost control",
            "value": "Demand defrost using outdoor ambient, coil temp & compressor run-time; selectable termination temp 50°F/70°F/90°F, 14-minute maximum defrost time (XP20 literature)",
            "key": "defrost_type"
          },
          {
            "label": "Reversing valve",
            "value": "Factory-installed 4-way valve; energized state not specified in reviewed literature - verify against unit wiring diagram",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present with 5-Strike lockout protection; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Built-in low ambient control - cooling mode rated to operate down to 0°F outdoor air temp (no field kit required per EL18XPV/XP20 literature)",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Yes, factory-installed",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "iComfort S30 Communicating Thermostat REQUIRED - order separately, not furnished",
            "key": "communicating"
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
    "model": "XP17 / EL17XP1 / EL16XP1 / ML17XP1",
    "equip": "Heat Pump",
    "summary": "1.5-5 ton single-stage scroll heat pumps (SilentComfort Technology on XP17; Elite/Merit equivalents on EL17XP1, EL16XP1, ML17XP1), R-410A. Fixed-capacity PSC compressor, works with any standard or communicating thermostat.",
    "match": [
      "XP17",
      "EL17XP1",
      "EL16XP1",
      "ML17XP1"
    ],
    "source": "Lennox Product Specifications XP17 (ehb_xp17_1512.pdf), tech.lennoxintl.com (single-stage EL/ML platform siblings share the same IntelliFrost defrost control logic)",
    "flags": [
      {
        "title": "Single-stage - no inverter/EEV diagnostics apply",
        "body": "These are fixed-capacity scroll compressors (PSC motor, no VFD/inverter board). Don't chase variable-speed fault codes on this platform - use the standard IntelliFrost defrost board and 5-Strike HP/LP lockout diagnostics."
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
            "value": "Factory TXV per TXV Usage table (field-matched to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost control",
            "value": "IntelliFrostTM Adaptive (demand) Defrost - outdoor temp, coil temp & compressor run-time inputs; field jumper 50°F/70°F/90°F/MAX, default 50°F",
            "key": "defrost_type"
          },
          {
            "label": "Reversing valve",
            "value": "Factory-installed 4-way valve, pressure-differential operated; energized state not specified in reviewed literature - verify against unit wiring diagram",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present, automatic reset; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Cooling mode operates satisfactorily down to 45°F outdoor air without extra controls; optional field Low Ambient Kit extends to 30°F (add Freezestat + Compressor Low Ambient Cut-Off)",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Available/factory-installed depending on size - confirm on rating plate",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "Works with iComfort Communicating Control or conventional thermostats (not communicating-mandatory)",
            "key": "communicating"
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
    "model": "XC25 / XC20",
    "equip": "Condenser",
    "summary": "2-5 ton variable-capacity air conditioners (DC Inverter, Precise ComfortTM Technology), R-410A. Top-tier Signature/XC platform units - iComfort Communicating Thermostat is REQUIRED and not furnished.",
    "match": [
      "XC25",
      "XC20"
    ],
    "source": "Lennox Product Specifications: XC25 (ehb_xc25_1711.pdf), XC20 (ehb_xc20_2010.pdf), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Communicating thermostat is mandatory, not optional",
        "body": "Both XC25 and XC20 literature explicitly states an iComfort Communicating Thermostat is required (order separately - not furnished). These will not run correctly on a conventional non-communicating stat; verify equipment on the job before quoting a stat swap or condenser replacement."
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
            "value": "Factory TXV per TXV Usage table (field-matched to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present with monitoring & lockout provisions; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Built-in low ambient control (no field kit stated in reviewed literature); Freezestat recommended for extra low-ambient protection",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Yes, factory-installed - prevents refrigerant migration during low ambient",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "iComfort Communicating Thermostat REQUIRED - order separately, not furnished",
            "key": "communicating"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "XC21 / XC16",
    "equip": "Condenser",
    "summary": "2-5 ton two-stage air conditioners, R-410A. XC21 is iComfort-enabled (works communicating OR with ComfortSense 7500 / other conventional thermostats); XC16 (Elite tier) is the same two-stage-compressor class.",
    "match": [
      "XC21",
      "XC16"
    ],
    "source": "Lennox Installation & Service Literature XC21 (Corp. 1007-L2), XC16 Guide Specifications (guidespecs_XC16_1408.pdf), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Two-stage, communicating-optional - confirm thermostat compatibility",
        "body": "XC21 explicitly supports non-communicating operation (Lennox ComfortSense 7500 or other conventional stats) in addition to full iComfort communicating mode - unlike the XC25/XC20 tier. Don't assume a communicating stat swap is required for this platform."
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
            "value": "Factory TXV (metering valve device only per XC21 literature)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present with 5-Strike lockout on high/low pressure switches and discharge temp sensor; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "XC16: optional Low Ambient Kit extends operation down to 30°F, plus Compressor Low Ambient Cutoff; XC21 threshold not stated in reviewed literature",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "XC16: standard on 048-060 models, optional (field kit) on 024-036; XC21: crankcase thermostat (S40) present - confirm on rating plate",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "Compatible with iComfort Communicating Control or conventional/ComfortSense 7500 thermostats",
            "key": "communicating"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "XC17 / XC13 / XC14 / EL17XC1 / EL16XC1 / ML14XC1",
    "equip": "Condenser",
    "summary": "1.5-5 ton single-stage scroll air conditioners spanning Signature (XC17), base (XC13/XC14) and Elite/Merit (EL17XC1, EL16XC1, ML14XC1) tiers, R-410A. Fixed-capacity scroll compressor, works with any standard or communicating thermostat.",
    "match": [
      "XC17",
      "XC13",
      "XC14",
      "EL17XC1",
      "EL16XC1",
      "ML14XC1"
    ],
    "source": "Lennox Product Specifications: XC17 (ehb_xc17_1511.pdf), XC14 (ehb_xc14_1706.pdf), EL16XC1 (ehb_el16xc1_2010.pdf), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Single-stage, no inverter diagnostics",
        "body": "All models in this group use a fixed-capacity (single stage) scroll compressor per Lennox literature - not variable-speed. Use standard high/low pressure switch and crankcase-heater troubleshooting; don't chase DC-inverter-board fault codes on this platform."
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
            "value": "Factory TXV per TXV Usage table (field-matched to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart (EL16XC1 example: factory charge ranges ~4 lb 9 oz to 7 lb 1 oz by tonnage) - confirm actual unit charge on its own nameplate, do not reuse another size's figure",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present, automatic reset; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Standard cooling rated to ~45°F outdoor air without extra controls; optional Low Ambient Kit extends to 30°F w/ Freezestat + Compressor Low Ambient Cut-Off (platform convention per XC16/XP17-family literature)",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "EL16XC1: standard 018-048 models, add-on kit for larger; confirm presence/size on individual model's rating plate",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "Works with iComfort Communicating Control or conventional thermostats (not communicating-mandatory)",
            "key": "communicating"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "EL18XCV / SL28XCV",
    "equip": "Condenser",
    "summary": "2-5 ton variable-capacity air conditioners (DC Inverter Rotary/Scroll Compressor, Precise ComfortTM Technology), R-410A, Elite and Signature tiers. Same DC-inverter platform as EL18XPV/SL25XPV heat pumps.",
    "match": [
      "EL18XCV",
      "SL28XCV"
    ],
    "source": "Lennox Product Specifications EL18XCV (ehb_el18xcv_2109.pdf), tech.lennoxintl.com",
    "flags": [
      {
        "title": "Verify communicating-thermostat requirement before quoting",
        "body": "Unlike XC25/XC20, the EL18XCV bulletin does not carry an explicit 'iComfort Communicating Thermostat required' note - but variable-capacity Lennox platforms generally need a compatible iComfort communicating control to run properly. Confirm required thermostat model against the specific unit's spec sheet/nameplate before committing to a repair plan."
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
            "value": "Factory TXV per TXV Usage/Substitution table (field-matched to indoor coil)",
            "key": "metering"
          },
          {
            "label": "Charging method",
            "value": "See unit rating plate / factory charging chart - do not use a flat charge weight",
            "key": "charging"
          }
        ]
      },
      {
        "title": "Protection & Low Ambient",
        "rows": [
          {
            "label": "High/Low pressure switches",
            "value": "Both present with high/low pressure switch monitoring; exact cutout/cutin psig not published - see rating plate",
            "key": "pressure_switches"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Built-in low ambient operation control; specific °F threshold not stated in reviewed literature - Freezestat recommended for extra protection",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Yes, factory-installed - prevents refrigerant migration during low ambient",
            "key": "crankcase_heater"
          },
          {
            "label": "Communicating control",
            "value": "Pairs with iComfort Communicating Control - confirm exact thermostat requirement on unit's own spec sheet/nameplate",
            "key": "communicating"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Lennox",
    "model": "CBX40UHV",
    "equip": "Air Handler",
    "summary": "Dave Lennox Signature Collection variable-speed ECM air handler, 2-5 ton, multi-position (upflow/horizontal, downflow with kit), iComfort Communicating capable.",
    "match": [
      "CBX40UHV",
      "CBX40UHV-024",
      "CBX40UHV-030",
      "CBX40UHV-036",
      "CBX40UHV-042",
      "CBX40UHV-048",
      "CBX40UHV-060"
    ],
    "source": "Lennox Product Specifications Bulletin 210521 (Nov 2017), tech.lennoxintl.com/.../ehb_cbx40uhv_1711.pdf",
    "flags": [
      {
        "title": "Lennox note",
        "body": "Blower speeds (HEAT/COOL, 4 taps each) are set by jumper pins on the control board, not dip switches; an ADJUST jumper trims speed +/-10%. First-stage cooling airflow is auto-set to 70% of the selected COOL speed. Continuous fan (DELAY jumper) runs ~28/38/70/100% of COOL speed, min 380 cfm."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Motor type",
            "value": "ECM variable-speed, 1/2-1 hp depending on size",
            "key": "motor"
          },
          {
            "label": "Airflow setup",
            "value": "Jumper-selectable HEAT/COOL speed taps (1-4) + ADJUST trim jumper; no dip switches",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static (published)",
            "value": "0.80 in. w.g. (rated blower performance range, all sizes)",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Type/size",
            "value": "Disposable frame, MERV 16, 20x20x5 (-024/030/036) or 20x25x5 (-042/048/060)",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "2.5-25 kW field-installed ECB40 kits",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "2.5-6 kW kits are single-stage/single-breaker; 8 kW and larger are 2-stage, split across two circuit breakers (e.g. 12.5 kW = 30A+45A, 15 kW = 35A+60A) - staging sequenced by the control board, no separate field sequencer",
            "key": "heat_staging"
          }
        ]
      },
      {
        "title": "Metering / Coil",
        "rows": [
          {
            "label": "Metering",
            "value": "Factory wide-range R-410A check/expansion valve (TXV) standard; model-number digit also allows fixed orifice or outdoor-unit-side TXV - match device to outdoor unit per AHRI combination",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "3-row copper tube/aluminum fin twin 'A' coil",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Pan",
            "value": "Deep corrosion-resistant plastic dual-position drain pan (upflow/downflow/horizontal), dual (2x 3/4 in fpt) pipe drains",
            "key": "drain_pan"
          },
          {
            "label": "Trap / float switch",
            "value": "Not published as factory-standard in this bulletin - field-fabricated trap and any safety float switch per local code/install instructions; see rating plate/IOM for jurisdiction requirements",
            "key": "drain_trap"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Lennox",
    "model": "CBX32MV",
    "equip": "Air Handler",
    "summary": "Dave Lennox Signature Collection variable-speed ECM air handler, 1.5-5+ ton, multi-position, iComfort Communicating capable (Signature tier below CBX40UHV).",
    "match": [
      "CBX32MV",
      "CBX32MV-018/024",
      "CBX32MV-024/030",
      "CBX32MV-036",
      "CBX32MV-048",
      "CBX32MV-060",
      "CBX32MV-068"
    ],
    "source": "Lennox Product Specifications Bulletin 210352 (Feb 2018), tech.lennoxintl.com/.../ehb_cbx32mv_1802b.pdf",
    "flags": [
      {
        "title": "Lennox note",
        "body": "Same jumper-pin airflow architecture as CBX40UHV (HEAT/COOL taps 1-4 + ADJUST trim), but filters are 1 in. disposable (not the 5 in. MERV 16 media filter used on CBX40UHV) - do not cross-stock filters between the two lines."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Motor type",
            "value": "ECM variable-speed, 1/2 hp (-018/024 thru -036) or 1 hp (-048/060/068)",
            "key": "motor"
          },
          {
            "label": "Airflow setup",
            "value": "Jumper-selectable HEAT/COOL speed taps (1-4) + ADJUST trim jumper; no dip switches",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static (published)",
            "value": "0.80 in. w.g. (rated blower performance range)",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Type/size",
            "value": "Disposable frame, 1 in., size by tonnage: 15x20x1 (-018/024) up to 20x25x1 (-068)",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "2.5-25 kW field-installed kits (see Electric Heat Data tables)",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "Same pattern as CBX40UHV: lower-kW kits single-stage, 8 kW+ kits 2-stage across two breakers, sequenced by control board",
            "key": "heat_staging"
          }
        ]
      },
      {
        "title": "Metering / Coil",
        "rows": [
          {
            "label": "Metering",
            "value": "Factory wide-range R-410A check/expansion valve (TXV) standard; model number also codes fixed orifice or outdoor-unit-side TXV options - match to outdoor unit per AHRI combination",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "3-row copper tube/aluminum fin coil, 12 fins/in.",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Pan",
            "value": "Deep corrosion-resistant plastic dual-position drain pan (upflow/downflow/horizontal), dual (2x 3/4 in fpt) pipe drains",
            "key": "drain_pan"
          },
          {
            "label": "Trap / float switch",
            "value": "Not published as factory-standard in this bulletin - field-fabricated trap and any safety float switch per local code/install instructions; see rating plate/IOM for jurisdiction requirements",
            "key": "drain_trap"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Lennox",
    "model": "CBX27UH",
    "equip": "Air Handler",
    "summary": "Elite Series constant-torque, multi-tap blower air handler, 1.5-5 ton, upflow/horizontal, 5-speed 'high efficiency' motor (not variable-speed ECM).",
    "match": [
      "CBX27UH",
      "CBX27UH-018",
      "CBX27UH-024",
      "CBX27UH-030",
      "CBX27UH-036",
      "CBX27UH-042",
      "CBX27UH-048",
      "CBX27UH-060"
    ],
    "source": "Lennox Product Specifications Bulletin 210581 (Oct 2017), tech.lennoxintl.com/.../ehb_cbx27uh_1710.pdf",
    "flags": [
      {
        "title": "Lennox note",
        "body": "Airflow is set by choosing one of 5 fixed motor taps (Tap 1-5) wired at the board per the blower-performance table for the target CFM/ESP - there is no ECM jumper/dip-switch profile on this line. Published blower tables only go to 0.80 in. w.g. ESP; taps 1-2 drop out (N/A) above ~0.60-0.70 in. w.g. on smaller sizes."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Motor type",
            "value": "High-efficiency multi-tap PSC-type motor, 5 speed taps, 1/2 hp (-018 thru -036) or 1 hp (-042/048/060)",
            "key": "motor"
          },
          {
            "label": "Airflow setup",
            "value": "Field-selected motor tap (1-5) per blower-performance CFM table; no jumpers/dip switches",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static (published)",
            "value": "0.80 in. w.g. (table range; usable airflow narrows at high static on lower taps)",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Type/size",
            "value": "Disposable frame, 1 in., 20x20x1 (-018 thru -036) or 20x24x1 (-042/048/060)",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "2.5-20 kW (sizes -018/024/030/036) or 5-25 kW (-042/048/060) field-installed kits",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "Not captured in the pages reviewed - confirm stage count/sequencer per specific kW kit in the Electric Heat Data tables of this bulletin before quoting",
            "key": "heat_staging"
          }
        ]
      },
      {
        "title": "Metering / Coil",
        "rows": [
          {
            "label": "Metering",
            "value": "Model-number digit codes fixed orifice, indoor-side TXV, or outdoor-unit-side TXV - match metering device to outdoor unit per AHRI combination",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "3-row copper tube/aluminum fin coil, 12 fins/in.",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Pan",
            "value": "Deep corrosion-resistant plastic dual-position drain pan (upflow/downflow/horizontal), dual (2x 3/4 in fpt) pipe drains",
            "key": "drain_pan"
          },
          {
            "label": "Trap / float switch",
            "value": "Not published as factory-standard in this bulletin - field-fabricated trap and any safety float switch per local code/install instructions; see rating plate/IOM for jurisdiction requirements",
            "key": "drain_trap"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Lennox",
    "model": "CBX25UH",
    "equip": "Air Handler",
    "summary": "Merit Series entry-level multi-tap PSC air handler, 1.5-5 ton, upflow/horizontal (downflow with kit) - base offering below CBX27UH.",
    "match": [
      "CBX25UH",
      "CBX25UH-018",
      "CBX25UH-024",
      "CBX25UH-030",
      "CBX25UH-036",
      "CBX25UH-042",
      "CBX25UH-048",
      "CBX25UH-060"
    ],
    "source": "Lennox Product Specifications Bulletin 210770 (Dec 2018, -10 revision), tech.lennoxintl.com/.../ehb_cbx25uh-10_1812.pdf",
    "flags": [
      {
        "title": "Lennox note",
        "body": "3-speed PSC motor (High/Medium/Low) wired at the board per the blower table - no ECM jumpers/dip switches. Published blower-performance tables only extend to 0.50 in. w.g. ESP (lower static rating than CBX27UH/32MV/40UHV) - do not oversize ductwork static budget for this model."
      }
    ],
    "groups": [
      {
        "title": "Blower",
        "rows": [
          {
            "label": "Motor type",
            "value": "PSC, 3 fixed speed taps (High/Med/Low), 1/3 hp (-018 thru -036, -042) or 1/2 hp (-048/060)",
            "key": "motor"
          },
          {
            "label": "Airflow setup",
            "value": "Field-selected tap (High/Med/Low) wired per blower-performance CFM table; no jumpers/dip switches",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static (published)",
            "value": "0.50 in. w.g. (top of published blower-performance table, all sizes)",
            "key": "max_static"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Type/size",
            "value": "Disposable (non-pleated) frame, 1 in.; size by tonnage from 12x20x1 (-018) up to 18x24x1 (-042/048/060)",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "2.5-20 kW field-installed kits",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "Not captured in the pages reviewed - confirm stage count/sequencer per specific kW kit in the Electric Heat Data tables of this bulletin before quoting",
            "key": "heat_staging"
          }
        ]
      },
      {
        "title": "Metering / Coil",
        "rows": [
          {
            "label": "Metering",
            "value": "Factory wide-range R-410A check/expansion valve (TXV) standard for cooling; unlike CBX27UH/32MV/40UHV, model number carries no separate field-selectable metering-device digit - match orifice/piston needs to outdoor unit per AHRI combination",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "3-row copper tube/aluminum fin coil, 14 fins/in.",
            "key": "coil"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Pan",
            "value": "Factory-installed anti-microbial dual-position polymer drain pan (upflow/downflow/horizontal), dual pipe drains",
            "key": "drain_pan"
          },
          {
            "label": "Trap / float switch",
            "value": "Not published as factory-standard in this bulletin - field-fabricated trap and any safety float switch per local code/install instructions; see rating plate/IOM for jurisdiction requirements",
            "key": "drain_trap"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Carrier",
    "model": "59MN7",
    "equip": "Gas Furnace",
    "summary": "Infinity Modulating 4-Way Multipoise condensing gas furnace, up to 98.3% AFUE. Modulating gas valve set at two points (Max Heat / Min Heat); communicating Infinity control with Status Code LED. Bryant twin: 987M (Evolution Modulating).",
    "match": [
      "59MN7",
      "59MN7A",
      "59MN7B",
      "Bryant 987M",
      "987M"
    ],
    "source": "Carrier 59MN7B Installation, Start-Up, Operating and Service and Maintenance Instructions, Form 59MN7B-02SI — https://www.shareddocs.com/hvac/docs/1009/Public/0D/59MN7B-02SI.pdf",
    "flags": [
      {
        "title": "Two different manifold pressure tables — do not mix them up",
        "body": "Manual states verbatim: 'Use Table 18 for all models EXCEPT 59MN7B060C21--20. Use Table 19 for all models 59MN7B060C21--20 ONLY.' Grabbing the wrong table on that one 060 unit throws both Max Heat and Min Heat manifold pressure off. Confirm full model/suffix off the rating plate before pulling a table."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "Table (18 or 19 per model suffix — see flag), by input rate + altitude. Table basis: 20,000 BTUh Max-Heat/8,000 BTUh Min-Heat per burner (std.) or 20,200/8,000 per burner (060C21-20). Sea-level example: 3.4 in. w.c. max heat / 0.55 in. w.c. min heat, No. 44 orifice.",
            "key": "manifold_ng"
          },
          {
            "label": "Supply pressure NG",
            "value": "Min 4.5 in. w.c. / Max 13.6 in. w.c. at furnace inlet, checked with burners firing at max heat.",
            "key": "supply_ng"
          },
          {
            "label": "Supply pressure LP",
            "value": "Max 13.8 in. w.c. published; minimum not clearly resolved from this manual — see rating plate / gas pressure table.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "Factory No. 44 (example, 0-2000 ft, 1050 Btu/cu ft, 0.62 SG) — verify per Table 19/20 for actual altitude and gas heat value; never assume, always check.",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "Modulating 2-stage-setpoint gas valve; brand/model not stated in SI text — confirm on rating plate/parts list.",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "Blower performance (Table 7, Air Delivery CFM) published in 0.1 in. w.c. increments up to 1.0 in. w.c. ESP by unit size/cooling switch setting — no single max ESP figure stated.",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise",
            "value": "Varies by unit size — printed on furnace rating plate; verify with duct thermometers per 'Set Temperature Rise' section.",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Diagnostics/flame",
        "rows": [
          {
            "label": "Status LED",
            "value": "Amber Status Code LED on blower door: solid ON = normal, rapid flash = lockout, or 2-digit flash code (digit 1 = number of flashes group 1, pause, digit 2 = flashes group 2). Stores last 7 codes in memory, survives power loss.",
            "key": "led"
          },
          {
            "label": "Flame current",
            "value": "Normal 4.0-6.0 microamps DC (nominal); lockout/flame-sense fault if signal drops below 0.5 microamps DC.",
            "key": "flame_current"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset limit switch in burner assembly opens on flame rollout/overheat. Manual explicitly warns: correct the root cause (inadequate combustion air, gas pressure, orifice, or venting) before resetting — 'DO NOT jumper this switch.'",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Table 16 multiplier, ~2%/1000 ft above 2000 ft: 1.00 (0-2000 ft) down to 0.87 (6001-7000 ft), 0.85 (7001-8000 ft), 0.83 (8001-9000 ft), 0.81 (9001-10,000 ft). NG manifold pressure tables (18/19) already build in altitude + heating-value compensation — do not apply an additional derate on top of the table value.",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Carrier",
    "model": "59TN6",
    "equip": "Gas Furnace",
    "summary": "Infinity Two-Stage, Variable-Speed 4-Way Multipoise condensing gas furnace, up to 96%+ AFUE. Communicating Infinity control, Status Code LED. Bryant twin: 986T (Evolution Two-Stage).",
    "match": [
      "59TN6",
      "59TN6A",
      "59TN6B",
      "Bryant 986T",
      "986T"
    ],
    "source": "Carrier 59TN6B Installation, Start-up, Operating, Service and Maintenance Instructions, Form 59TN6B-01SI — https://www.shareddocs.com/hvac/docs/1009/Public/05/59TN6B-01SI.pdf",
    "flags": [
      {
        "title": "Flame-sense/limit lockout requires root-cause fix, not a reset",
        "body": "Manual: 'These furnaces are equipped with a manual reset limit switch...opens and shuts off power to the gas valve if an overheat condition (flame rollout) occurs.' Same as other 59-series: correct inadequate combustion air, gas pressure, orifice sizing, or venting before resetting — do not jumper."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "Table 20, by input rate + altitude (two-stage: separate high-fire/low-fire settings). BTUh-per-burner table basis not confirmed in this pass — verify against unit's Table 19/20 heading.",
            "key": "manifold_ng"
          },
          {
            "label": "Supply pressure NG",
            "value": "Min 4.5 in. w.c. / Max ~13.6 in. w.c. at furnace inlet (same inlet-pressure-check procedure as 59MN7/59SC2 platform).",
            "key": "supply_ng"
          },
          {
            "label": "Supply pressure LP",
            "value": "Max 13.8 in. w.c. published; minimum not clearly resolved from this manual — see rating plate.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "Factory-sized by model; verify per Table 20 for altitude/gas heat value — never assume, always check and verify.",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "Two-stage gas valve; brand/model not stated in SI text — confirm on rating plate/parts list.",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "Blower performance tables published in 0.1 in. w.c. increments to 1.0 in. w.c. ESP by unit size — no single max ESP figure stated.",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise",
            "value": "Varies by unit size — printed on furnace rating plate; verify with duct thermometers.",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Diagnostics/flame",
        "rows": [
          {
            "label": "Status LED",
            "value": "Amber Status Code LED, blower door: solid ON = normal, rapid flash = lockout, or 2-digit flash code; stores last 7 codes.",
            "key": "led"
          },
          {
            "label": "Flame current",
            "value": "Normal 4.0-6.0 microamps DC (nominal); lockout if signal drops below 0.5 microamps DC.",
            "key": "flame_current"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset limit switch + rollout switch(es) in burner assembly — see flag.",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Table 18 multiplier, ~2%/1000 ft above 2000 ft (same schedule as 59MN7: 1.00 at 0-2000 ft to 0.81 at 9001-10,000 ft). Manifold pressure table already compensates for altitude — do not double-derate.",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Carrier",
    "model": "59SC2 / 59SC5 / 59SP5 / 59SP2",
    "equip": "Gas Furnace",
    "summary": "Comfort/Performance single-stage 4-way multipoise condensing gas furnace platform, up to ~96.5% AFUE depending on size/series (59SP2 runs lower, to ~91.1% AFUE on some sizes). NOTE: 59SC5 is single-stage per its own product data ('59SC5B...Single-Stage'), not 2-stage — corrected from initial assumption. Bryant twins: 915S and 925S (Legacy single-stage family), per Carrier/Bryant cross-reference service bulletin.",
    "match": [
      "59SC2",
      "59SC2D",
      "59SC2E",
      "59SC5",
      "59SC5A",
      "59SC5B",
      "59SP5",
      "59SP5A",
      "59SP2",
      "Bryant 915S",
      "Bryant 925S",
      "915S",
      "925S"
    ],
    "source": "Carrier 59SC2D Installation, Start-up, Operating and Service and Maintenance Instructions, Form 59SC2D-03SI — https://www.shareddocs.com/hvac/docs/1009/Public/09/59SC2D-03SI.pdf",
    "flags": [
      {
        "title": "Check inlet pressure under firing load, not just static",
        "body": "Manual: confirm inlet gas pressure is between 4.5 in. w.c. and 13.6 in. w.c. WHILE the furnace is calling for max heat (burners firing) — 'if pressure is too low, you will not be able to adjust the manifold pressure to obtain the proper input rate.' A supply that reads fine at idle can sag below 4.5 in. w.c. once the burners and any other gas load pull simultaneously."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "Table 19, by input rate + altitude. Sea-level example given in manual: 0-2000 ft, 1050 Btu/cu ft, 0.62 SG => No. 44 orifice, 3.4 in. w.c. (847 Pa).",
            "key": "manifold_ng"
          },
          {
            "label": "Supply pressure NG",
            "value": "Min 4.5 in. w.c. / Max 13.6 in. w.c. (1125-3388 Pa), checked at max-heat call — see flag.",
            "key": "supply_ng"
          },
          {
            "label": "Supply pressure LP",
            "value": "Max 13.8 in. w.c. published; minimum not clearly resolved from this manual — see rating plate.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "Factory No. 44 at sea level (example); verify per Table 19 for actual altitude/gas heat value — never assume, always check.",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "Single-stage gas valve; brand/model not stated in SI text — confirm on rating plate/parts list.",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "Blower performance (Table 21, Air Delivery CFM) published in 0.1 in. w.c. increments to 1.0 in. w.c. ESP by unit size — no single max ESP figure stated.",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise",
            "value": "Must fall within range on furnace rating plate; verify per instructions using duct thermometers in supply/return.",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Diagnostics/flame",
        "rows": [
          {
            "label": "Status LED",
            "value": "Amber Status Code LED, blower door: solid ON = normal, rapid flash = lockout, or 2-digit flash code; stores last 7 codes in memory.",
            "key": "led"
          },
          {
            "label": "Flame current",
            "value": "Normal 4.0-6.0 microamps DC (nominal); lockout if signal drops below 0.5 microamps DC.",
            "key": "flame_current"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset limit switch in burner assembly opens on flame rollout/overheat; correct root cause before reset, do not jumper.",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Table 17 multiplier, ~2%/1000 ft above 2000 ft (same schedule as 59MN7/59TN6). Manifold pressure table (19) already compensates for altitude + gas heating value — do not double-derate.",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Carrier",
    "model": "58CTA / 58CTX / 58CTW / 58CTY",
    "equip": "Gas Furnace",
    "summary": "Performance 80 Two-Stage, induced-combustion, hot-surface-ignition, non-condensing 4-way multipoise gas furnace, 80% AFUE, 45,000-155,000 Btuh (Series 140). 58CTA/58CTX use a PSC blower; 58CTW/58CTY use an ECM variable-speed blower with ComfortHeat technology on the same gas train/combustion platform. 58CTX/58CTY are Low-NOx (40 ng/J) versions for AQMD areas.",
    "match": [
      "58CTA",
      "58CTX",
      "58CTW",
      "58CTY",
      "Bryant 820TB (variable-speed twin — Preferred 80 two-stage, size-matched; PSC-blower 58CTA/CTX twin unconfirmed)"
    ],
    "source": "Carrier 58CTW/58CTY Product Data, Form 58CTW-06PD — https://www.shareddocs.com/hvac/docs/1009/Public/0C/58CTW-06PD.pdf (58CTA/58CTX-specific installation/service manual, Form 58CT-12SI, could not be located at a direct shareddocs.com URL in this pass — same combustion platform, verify furnace-specific figures against rating plate)",
    "flags": [
      {
        "title": "Main limit switch is mounted behind the gas valve",
        "body": "Furnace-components diagram in the product data places the MAIN LIMIT SWITCH behind the gas valve, separate from the manual-reset limit switches on the burner box and the flame rollout switch. When troubleshooting a limit-related lockout, there are multiple limit/rollout switches on this platform — identify which one tripped from the wiring diagram/LED code before condemning a part."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG/LP)",
            "value": "Not obtained from Product Data (PD sheets on this platform don't carry the adjustment table) — see Table in Series 140 installation instructions (Form 58CT-12SI), by input rate + altitude; use value on furnace rating plate.",
            "key": "manifold"
          },
          {
            "label": "Supply pressure NG",
            "value": "Min 4.5 in. w.c. / Max 13.6 in. w.c. at furnace gas valve inlet.",
            "key": "supply_ng"
          },
          {
            "label": "Orifice",
            "value": "Factory-installed, sized by model/altitude/heat value — see Installation Instructions for usage table (part numbers e.g. LH32DB0xx series listed in PD, no single drill size published).",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers, redundant, slow-opening two-stage gas valve (reduces ignition noise, regulates gas flow, electric shutoff).",
            "key": "gas_valve"
          },
          {
            "label": "Ignition",
            "value": "Hot Surface Igniter, Size 43 (Power Heat igniter).",
            "key": "ignition"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "Blower performance tables published in 0.1 in. w.c. increments to 1.0 in. w.c. ESP by unit size — no single max ESP figure stated; guide-spec boilerplate references 0.50 in. w.c. as a nominal design point.",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise",
            "value": "Certified Temperature Rise Range published per unit size in PD table (High/Low columns by model) — pull the exact deg F range for the specific model/size off that table or the rating plate; values did not extract cleanly in this pass.",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Diagnostics/flame",
        "rows": [
          {
            "label": "Status LED",
            "value": "Enhanced diagnostics via LED and reflective sight glass; stores fault codes through power outages (per PD features list).",
            "key": "led"
          },
          {
            "label": "Flame current",
            "value": "Not published in the documents reviewed this pass — see rating plate/service label.",
            "key": "flame_current"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset limit switch(es) on burner box, separate MAIN LIMIT SWITCH behind gas valve, plus flame rollout switch — see flag.",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Not extracted from the documents reviewed this pass — see Series 140 installation instructions altitude derate table / rating plate.",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Carrier",
    "model": "58UVB / 58MVC",
    "equip": "Gas Furnace",
    "summary": "Variable-speed, variable-capacity (high/medium/low heat) condensing gas furnace. NOTE: corrected from the originally assumed 80% tier — 58UVB is documented as 'Performance 96, 95% AFUE Upflow-Only Variable-Speed'; 58MVC is the Infinity ICS 4-way-multipoise variable-speed sibling (up to ~96.6% AFUE on some sizes). Both are condensing units, not 80% non-condensing. Bryant twin not confirmed in this research pass — do not assume a specific Bryant model number without checking a parts cross-reference.",
    "match": [
      "58UVB",
      "58MVC",
      "58MVB"
    ],
    "source": "Carrier 58MVC Installation Instructions, Form 58MVC-4SI — https://www.shareddocs.com/hvac/docs/1009/Public/03/58MVC-4SI.pdf",
    "flags": [
      {
        "title": "Never redrill orifices, and hold medium-heat pressure to a narrow band",
        "body": "Manual, verbatim: 'DO NOT redrill orifices. Improper drilling (burrs, out-of-round holes, etc.) can cause excessive burner noise and misdirection of burner flames... resulting in heat exchanger failures.' Also: 'DO NOT set medium-heat manifold pressure less than 1.3 in. w.c. or more than 1.7 in. w.c. for natural gas' — a much tighter band than the high/low setpoints."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "3-point setpoint (High/Medium/Low heat), by input rate + altitude — worked example in manual for 80,000 Btuh high-heat input at sea level: 3.8 in. w.c. high heat / 1.6 in. w.c. medium heat / 0.6 in. w.c. low heat, No. 45 orifice. Medium-heat band restricted to 1.3-1.7 in. w.c. — see flag.",
            "key": "manifold_ng"
          },
          {
            "label": "Supply pressure",
            "value": "Not clearly extracted in this pass — see rating plate/gas piping section of manual.",
            "key": "supply"
          },
          {
            "label": "Orifice",
            "value": "Factory No. 45 (sea-level example); verify per installation-instructions usage table for altitude/gas heat value — never redrill (see flag).",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "3-stage (high/medium/low) gas valve; brand/model not stated in extracted text — confirm on rating plate/parts list.",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "Design guidance in manual: avoid duct configurations causing static pressure greater than 0.5 in. w.c.; full blower ESP table not isolated in this pass — see rating plate/blower table.",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise",
            "value": "Must fall within range on furnace rating plate; adjustable via setup switch SW1-4 (rise-range selection) and airflow speed taps.",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Diagnostics/flame",
        "rows": [
          {
            "label": "Status LED",
            "value": "Control status code indicator light: rapid flash = fault/no-run condition; flashes 2-digit codes (e.g., code 12 during 90-sec vent-RPM evaluation, code 24 = fuse needs replacement, codes 11/25/41/42 = component-test results). Stores up to 7 codes.",
            "key": "led"
          },
          {
            "label": "Flame current",
            "value": "Not published as a specific microamp figure in the sections reviewed — see rating plate/service label.",
            "key": "flame_current"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Flame rollout manual-reset switch (verify continuity before restart); de-energizes gas valve, throttling valve, and humidifier terminal when R-to-W circuit opens.",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "2% derate per 1000 ft above 2000 ft (US), per Table 11 multiplier — simpler flat-rate schedule than the 59-series table-per-range format.",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Carrier",
    "model": "25VNA0",
    "equip": "Heat Pump",
    "summary": "Infinity Series variable-speed (Greenspeed) heat pump, 1.5-5 tons. Variable-speed scroll compressor, communicating Infinity control, TXV for cooling / EXV for heating. Runs with adaptive (AUTO) or field-fixed defrost intervals.",
    "match": [
      "25VNA0",
      "Infinity 20",
      "Greenspeed",
      "Bryant 280A",
      "Evolution Extreme"
    ],
    "source": "Carrier Product Data 25VNA-05PD (shareddocs.com/hvac/docs/1009/Public/01/25VNA-05PD.pdf); Service Manual 24VNA0-25VNA0-1SM (shareddocs.com/hvac/docs/1009/Public/0B/24VNA0-25VNA0-1SM.pdf)",
    "flags": [
      {
        "title": "Low-pressure protection is software, not a discrete switch",
        "body": "This platform uses a suction pressure transducer (0-200 psig range) feeding the control board, not a mechanical low-pressure switch. When troubleshooting nuisance low-pressure trips, pull the reading from the Infinity Control diagnostics / abnormal system status screen rather than assuming a failed physical switch."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed scroll",
            "key": "compressorType"
          },
          {
            "label": "Metering - cooling",
            "value": "TXV (Puron hard shutoff)",
            "key": "meteringCool"
          },
          {
            "label": "Metering - heating",
            "value": "Electronic expansion valve (EXV)",
            "key": "meteringHeat"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch (mechanical)",
            "value": "Trips ~610 ±20 psig discharge; standard",
            "key": "hpsCutout"
          },
          {
            "label": "Low pressure cutout - cooling (3-min)",
            "value": "≤ 55 psig (software, via suction transducer)",
            "key": "lpCutoutCool3min"
          },
          {
            "label": "Low pressure cutout - heating (3-min)",
            "value": "< 23 psig (software)",
            "key": "lpCutoutHeat3min"
          },
          {
            "label": "Low pressure cutout - instantaneous (either mode)",
            "value": "< 13 psig (software)",
            "key": "lpCutoutInstant"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature with AUTO adaptive mode, selected via Infinity Control UI (no dip switches)",
            "key": "defrostType"
          },
          {
            "label": "Defrost intervals",
            "value": "AUTO (adaptive 30/60/90/120 min based on prior defrost duration), or field-fixed 30, 60, 90, or 120 min; factory default AUTO; first defrost after power-up defaults to 30 min",
            "key": "defrostInterval"
          },
          {
            "label": "Defrost enable condition",
            "value": "Only below 50°F outdoor coil temp",
            "key": "defrostEnableTemp"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling (O), de-energized in heating; outdoor fan turns on 15 sec before valve switches at defrost termination",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase / Communicating",
        "rows": [
          {
            "label": "Low-ambient cooling",
            "value": "Standard down to 0°F with Infinity Control (no field kit needed)",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard; energized during off-cycle below 75°F outdoor temp",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Full Greenspeed variable-capacity operation requires Infinity System Control",
            "key": "communicating"
          },
          {
            "label": "Charging",
            "value": "See rating plate / product data charge table by unit size - do not use a generic charge weight",
            "key": "charging"
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
    "model": "25HPB6",
    "equip": "Heat Pump",
    "summary": "Performance 16 heat pump, 1.5-5 tons, single-stage scroll compressor with hard-shutoff TXV. Time/temperature defrost, field-selectable interval. Non-communicating (standard 24V or Thermidistat).",
    "match": [
      "25HPB6",
      "Performance 16",
      "Bryant Preferred single-stage"
    ],
    "source": "Carrier Product Data 25HPB6-04PD (shareddocs.com/hvac/docs/1009/Public/07/25HPB6-04PD.pdf); Installation Instructions 25HCC-HPB-03SI (shareddocs.com/hvac/docs/1009/Public/09/25HCC-HPB-03SI.pdf)",
    "flags": [
      {
        "title": "This is a single-stage unit, not 2-stage",
        "body": "Carrier's own literature (25HPB6-04PD, 25HCC-HPB-03SI) documents 25HPB6 as a single scroll-compressor, single-stage heat pump. The true 2-stage 16 SEER Performance model is 25HCB6 (already covered separately) - don't confuse the two on a service call."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Single-stage scroll",
            "key": "compressorType"
          },
          {
            "label": "Metering",
            "value": "Hard-shutoff TXV, standard all sizes",
            "key": "metering"
          },
          {
            "label": "High/low pressure switch cutout",
            "value": "See rating plate - exact psig not published for this platform",
            "key": "pressureSwitchCutout"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature electronic defrost control",
            "key": "defrostType"
          },
          {
            "label": "Defrost intervals",
            "value": "Field-selectable 30, 60, 90, or 120 min; factory set to 90 min; defrost thermostat closes ~32°F, terminates on thermostat open or automatically after 10 min",
            "key": "defrostInterval"
          },
          {
            "label": "Reversing valve",
            "value": "O terminal, energized in cooling / de-energized in heating",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase",
        "rows": [
          {
            "label": "Max outdoor ambient - heating mode",
            "value": "66°F published operating ceiling (not a lockout switch setting)",
            "key": "maxHeatAmbient"
          },
          {
            "label": "Low-ambient cooling control",
            "value": "Accessory (Motormaster / low-ambient switch) - factory standard only on smallest size group; verify nameplate",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard on smaller size groups, not present on largest; confirm against nameplate",
            "key": "crankcaseHeater"
          },
          {
            "label": "Charging",
            "value": "Subcooling method (hard-shutoff TXV) - see charging chart in install instructions / rating plate",
            "key": "charging"
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
    "model": "25HCC5",
    "equip": "Heat Pump",
    "summary": "Comfort-series single-stage heat pumps, 1.5-5 tons: 25HCC5, 25HCE4 (and older 25HBC5), all sharing the same installation instructions. Piston metering on the outdoor heating circuit; TXV or piston indoor depending on coil match. Time/temperature defrost.",
    "match": [
      "25HCC5",
      "25HCE4",
      "25HBC5",
      "25HCC6",
      "25HBC6",
      "Comfort 14",
      "Comfort 15",
      "Bryant Legacy single-stage"
    ],
    "source": "Carrier Installation Instructions 25HBC-CC-CE-01SI, covering 25HBC5/25HCC5/25HCE4 (shareddocs.com/hvac/docs/1009/Public/0A/25HBC-CC-CE-01SI.pdf); Product Data 25HCE4-08PD (shareddocs.com/hvac/docs/1009/Public/03/25HCE4-08PD.pdf)",
    "flags": [
      {
        "title": "\"25HCC6\" and \"25HBC6\" were not found in Carrier's published lineup",
        "body": "No product data or install instructions exist under those exact model numbers. The current Comfort single-stage heat pump family is 25HCC5 paired with 25HCE4 (Comfort 14); the nearest older single-stage Comfort unit is 25HBC5 (Comfort 15). Use this entry for any of those - confirm the exact digit/letter suffix against the unit's rating plate."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Metering - outdoor (heating)",
            "value": "Piston, in the liquid service valve body",
            "key": "meteringHeat"
          },
          {
            "label": "Metering - indoor (cooling)",
            "value": "TXV or piston depending on indoor coil match - check which is installed before charging",
            "key": "meteringCool"
          },
          {
            "label": "High/low pressure switch cutout",
            "value": "See rating plate - exact psig not published for this platform",
            "key": "pressureSwitchCutout"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Time/temperature electronic defrost control",
            "key": "defrostType"
          },
          {
            "label": "Defrost intervals",
            "value": "Field-selectable 30, 60, or 90 min (quick-connect jumper); factory set to 60 or 90 min depending on size; defrost thermostat closes ~30°F liquid line, reopens ~65°F; max 10-min defrost cycle",
            "key": "defrostInterval"
          },
          {
            "label": "Reversing valve",
            "value": "O terminal, energized in cooling / de-energized in heating",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase",
        "rows": [
          {
            "label": "Max outdoor ambient - heating mode",
            "value": "66°F published operating ceiling",
            "key": "maxHeatAmbient"
          },
          {
            "label": "Low-ambient cooling control",
            "value": "Accessory - factory standard only on smallest size group",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard on smaller/mid size groups, not on largest; confirm against nameplate",
            "key": "crankcaseHeater"
          },
          {
            "label": "Charging",
            "value": "Superheat method for piston metering, subcooling method for TXV - see charging chart in install instructions / rating plate",
            "key": "charging"
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
    "model": "24VNA6",
    "equip": "Condenser",
    "summary": "Infinity Series variable-speed (Greenspeed) air conditioner, 2-5 tons, paired with 25VNA4/25VNA0-family heat pumps or matched fan coils. Variable-speed rotary/scroll compressor, TXV, communicating Infinity control. Covers 24VNA6 and 24VNA9 (19VS) platforms.",
    "match": [
      "24VNA6",
      "24VNA9",
      "Infinity 19VS",
      "Infinity 26",
      "Greenspeed AC",
      "Bryant 186CNV",
      "Bryant 187B",
      "Evolution Extreme AC"
    ],
    "source": "Carrier Product Data 24VNA6-02PD (shareddocs.com/hvac/docs/1009/Public/0F/24VNA6-02PD.pdf); Service Manual 24VNA6-25VNA4-1SM (shareddocs.com/hvac/docs/1009/Public/01/24VNA6-25VNA4-1SM.pdf)",
    "flags": [
      {
        "title": "Pressure cutout figures are for the 24VNA6/25VNA4 platform specifically",
        "body": "The 670/470 psig mechanical HPS trip/reset and 15 psig software low-pressure shutdown below come from the 24VNA6-25VNA4 service manual. The 24VNA9 (19VS) uses a related but separate control platform (own service manual: 25VNA8-24VNA9-4SM) - confirm exact figures there before using as a diagnostic threshold on a 24VNA9."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed rotary (smaller sizes) or variable-speed scroll (larger sizes)",
            "key": "compressorType"
          },
          {
            "label": "Metering",
            "value": "TXV (Puron hard shutoff)",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches (24VNA6/25VNA4 platform)",
        "rows": [
          {
            "label": "High pressure switch (mechanical)",
            "value": "Trips 670 psig discharge, resets/closes at 470 psig",
            "key": "hpsCutout"
          },
          {
            "label": "High pressure shutdown (software)",
            "value": "Immediate shutdown at 620 psig",
            "key": "hpShutdownSoftware"
          },
          {
            "label": "Low pressure shutdown (software)",
            "value": "Immediate shutdown at 15 psig",
            "key": "lpShutdownSoftware"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase / Communicating",
        "rows": [
          {
            "label": "Low-ambient cooling",
            "value": "Standard down to 0°F with Infinity Control",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Standard",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Full Greenspeed variable-capacity cooling requires Infinity System Control",
            "key": "communicating"
          },
          {
            "label": "Charging",
            "value": "Subcooling method (TXV) - see rating plate / product data charge table by unit size",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "24ANB1",
    "equip": "Condenser",
    "summary": "Two-stage scroll air conditioner, 2-5 tons, compatible with the Infinity System Control for 2-stage communicating operation (also runs on a standard non-communicating stat). Covers the 24ANB1/24ANB7/25HNB6/25HNB9 family sharing one application guideline.",
    "match": [
      "24ANB1",
      "24ANB7",
      "2-stage AC",
      "Infinity 21 AC"
    ],
    "source": "Carrier Application Guideline and Service Manual 24-25-9SM, covering 24ANB1/24ANB7/25HNB6/25HNB9 (shareddocs.com/hvac/docs/1009/Public/03/24-25-9SM.pdf)",
    "flags": [
      {
        "title": "This is Infinity-tier, not base Performance",
        "body": "In Carrier's own model-number legend (24-25-9SM), the 'N' position in 24ANB1 stands for Infinity, not Performance. This is the 2-stage, Infinity-System-Control-compatible AC line - verify the actual tier badge against the unit's nameplate/brochure rather than assuming Performance branding."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Two-stage scroll",
            "key": "compressorType"
          },
          {
            "label": "Metering",
            "value": "Hard-shutoff TXV, standard",
            "key": "metering"
          },
          {
            "label": "High pressure switch cutout",
            "value": "See rating plate - standard feature, exact psig not published in this excerpt",
            "key": "pressureSwitchCutout"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase / Communicating",
        "rows": [
          {
            "label": "Low-ambient cooling",
            "value": "MotorMaster low-ambient controller / low-ambient pressure switch REQUIRED for cooling operation below 55°F outdoor",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Accessory; standard on smaller size groups only (marked ‡ in spec table) - confirm nameplate",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Supports Infinity System Control (2-stage communicating) and standard non-communicating thermostats",
            "key": "communicating"
          },
          {
            "label": "Charging",
            "value": "See charging chart in application guideline / rating plate",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "24ACC6",
    "equip": "Condenser",
    "summary": "Single-stage scroll air conditioners, 1.5-5 tons, sharing the same TXV/R-410A platform across tier badges: 24ACC6 (Performance 16), 24ABC6 (Comfort 16), and 24AAA6 (Comfort baseline single-stage), all covered by a common installation instructions doc.",
    "match": [
      "24ACC6",
      "24ABC6",
      "24AAA6",
      "Performance 16 AC",
      "Comfort 16 AC"
    ],
    "source": "Carrier Product Data 24ACC6-9PD (shareddocs.com/hvac/docs/1009/Public/07/24ACC6-9PD.pdf) and 24ABC6-8PD (shareddocs.com/hvac/docs/1009/Public/01/24ABC6-8PD.pdf); Installation Instructions 24AAA-ACC-11SI, covering 24AAA/24ACC family (shareddocs.com/hvac/docs/1009/Public/02/24AAA-ACC-11SI.pdf)",
    "flags": [
      {
        "title": "Different tier badges, same platform",
        "body": "24ACC6 is badged 'Performance 16' and 24ABC6 is badged 'Comfort 16' in Carrier's own product data, but both list an identical scroll compressor / hard-shutoff TXV / R-410A physical data table - which is why they're grouped here. Don't assume a parts or refrigerant-circuit difference based on the tier name alone; confirm against the specific size/nameplate."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Single-stage scroll",
            "key": "compressorType"
          },
          {
            "label": "Metering",
            "value": "TXV (Puron hard shutoff)",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Standard; exact psig not published - see rating plate",
            "key": "hpsCutout"
          },
          {
            "label": "Low pressure switch",
            "value": "Standard; exact psig not published - see rating plate",
            "key": "lpsCutout"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase",
        "rows": [
          {
            "label": "Low-ambient cooling",
            "value": "Accessory kit required (not standard)",
            "key": "lowAmbient"
          },
          {
            "label": "Crankcase heater",
            "value": "Accessory; standard on smaller size groups only, absent on largest - confirm nameplate",
            "key": "crankcaseHeater"
          },
          {
            "label": "Charging",
            "value": "Subcooling method (TXV) - see charging chart in product data / rating plate",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "24AHA4",
    "equip": "Condenser",
    "summary": "Performance 14 Compact single-stage air conditioner, 1.5-5 tons, horizontal low-profile cabinet. Scroll compressor, TXV, R-410A.",
    "match": [
      "24AHA4",
      "Performance 14 Compact"
    ],
    "source": "Carrier Product Data 24AHA4-05PD (shareddocs.com/hvac/docs/1009/Public/0C/24AHA4-05PD.pdf)",
    "flags": [
      {
        "title": "Horizontal compact cabinet - not a drop-in for standard units",
        "body": "24AHA4 uses a low-profile horizontal cabinet, not the typical square condenser case. Confirm clearances and airflow/mounting requirements in its own installation instructions before treating it as a like-for-like swap with a standard-cabinet Performance 14 unit."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (Puron)",
            "key": "refrigerant"
          },
          {
            "label": "Compressor",
            "value": "Single-stage scroll",
            "key": "compressorType"
          },
          {
            "label": "Metering",
            "value": "TXV, sized per indoor coil match (subcooling charging method)",
            "key": "metering"
          },
          {
            "label": "High pressure switch cutout",
            "value": "See rating plate - standard feature, exact psig not published in this excerpt",
            "key": "pressureSwitchCutout"
          }
        ]
      },
      {
        "title": "Low Ambient / Crankcase",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "Accessory kit (KAACH series), size-dependent - not standard",
            "key": "crankcaseHeater"
          },
          {
            "label": "Evaporator freeze thermostat",
            "value": "Accessory",
            "key": "freezeStat"
          },
          {
            "label": "Charging",
            "value": "Subcooling method (TXV) - see charging chart in product data / rating plate",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Carrier",
    "model": "FV4C",
    "equip": "Air Handler",
    "summary": "Performance-tier variable-speed ECM fan coil (002-006, 1.5-5 ton). Non-communicating — configured entirely with 'Easy Select' jumpers/taps on the onboard PCB rather than a wall control link. Factory TXV, upflow/horizontal-left/downflow (kit).",
    "match": [
      "Bryant FV4C (Preferred Series Fan Coil)",
      "Payne FV4C",
      "Carrier Performance™ Fan Coil FV4C"
    ],
    "source": "Carrier IM-FV4C-04, FV4C 002,003,005,006 Installation Instructions, https://www.shareddocs.com/hvac/docs/1009/Public/02/IM-FV4C-04.pdf",
    "flags": [
      {
        "title": "Not the same platform as FE4A/FE5A",
        "body": "FV4C is the standard Performance-tier variable-speed fan coil, set up entirely with 'Easy Select' PCB jumpers/taps (AUX HEAT KW/CFM, AC/HP SIZE, SYSTEM TYPE, AC/HP CFM ADJUST, ON/OFF DELAY). It has no SystemVu/communicating link. Don't confuse with the Infinity FE4A/FE5A communicating fan coil (covered separately) — different control board, different setup procedure."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower/motor",
            "value": "Variable-speed ECM, factory-programmed airflow tables selected via PCB jumpers/taps (no simple speed switch)",
            "key": "blower_type"
          },
          {
            "label": "AC/HP SIZE tap",
            "value": "Set to match installed condenser/heat pump tonnage (018/024/030/036); factory-set to largest size fan coil supports",
            "key": "size_tap"
          },
          {
            "label": "SYSTEM TYPE tap",
            "value": "AC / HP-COMFORT (~315 CFM/ton heating, ~350 CFM/ton cooling) / HP-EFF (~350 CFM/ton both modes); factory set to AC",
            "key": "system_type"
          },
          {
            "label": "AC/HP CFM ADJUST tap",
            "value": "NOM (factory) / HI (+15% airflow) / LO (-10% airflow), all modes except non-heat-pump heating",
            "key": "cfm_adjust"
          },
          {
            "label": "Max external static",
            "value": "Not published in install instructions — see Product Data / rating plate",
            "key": "max_esp"
          },
          {
            "label": "Filter",
            "value": "Factory filter kit (internal) required unless field filter installed in return duct — see Table 1 filter kit chart for size by unit",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "Factory-authorized field-installed kits, 5-30 kW; exact kits approved listed on unit rating plate",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "Supports Intelligent Heat Staging with compatible kits (remove jumper J2 to enable); AUX HEAT KW/CFM tap must be set to narrowest range matching installed heater kW",
            "key": "heat_staging"
          },
          {
            "label": "Clearance",
            "value": "20-, 24-, 30-kW heaters: maintain 1 in. (25 mm) clearance to combustibles at discharge plenum/ductwork for 36 in. from unit; downflow needs accessory base for clearance",
            "key": "heat_clearance"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory hard-shutoff Puron (R-410A) TXV — all indoor coils must use hard-shutoff TXV, never an R-22 TXV or piston",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Primary and secondary condensate pan/trap; prime both traps after connecting, do not use shallow running traps",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Carrier",
    "model": "FMA4X",
    "equip": "Air Handler",
    "summary": "Multipoise apartment/multi-family fan coil, upflow only, 1.5-3 ton. FMA4X = TXV + 5-tap multi-tap ECM motor; sibling FMA4P = piston + 3-speed PSC motor. Same cabinet/platform, different metering and blower — verify suffix before parts substitution.",
    "match": [
      "Bryant FMA4X (apartment/multi-family fan coil)",
      "Payne / WeatherMaker FMA4X",
      "Carrier FMA4P (piston/PSC sibling of same platform)"
    ],
    "source": "Carrier SSG-FMA4-04, FMA4X/FMA4P Product Data, https://www.shareddocs.com/hvac/docs/1009/Public/04/SSG-FMA4-04.pdf",
    "flags": [
      {
        "title": "FMA4X piston/ECM taps are unit-specific",
        "body": "On the FMA4P (piston) variant, the factory piston is unique to the fan coil and CANNOT be replaced with the piston shipped with the outdoor unit — check AHRI match-up to see if the fan coil's piston works with the chosen condenser or if an accessory TXV kit is required. On FMA4X, the 5-tap ECM motor speed must be selected to land airflow within 300-450 CFM/ton per the performance tables."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "FMA4X blower/motor",
            "value": "ECM, 5 motor speed taps (Tap 1-5)",
            "key": "blower_x"
          },
          {
            "label": "FMA4P blower/motor",
            "value": "PSC, 3 motor speeds (Low/Med/High)",
            "key": "blower_p"
          },
          {
            "label": "Max external static (published)",
            "value": "Performance tables published through 0.8 in. wc for both FMA4X and FMA4P — see Tables 7 & 8",
            "key": "max_esp"
          },
          {
            "label": "Filter",
            "value": "16x20x1 in. (406x508x25 mm) on 18/24-size units, 20x20x1 in. (508x508x25 mm) on 30/36-size units, field-installed",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "Accessory field-installed EHK kits, 5, 7.5, or 10 kW (EHK model code: 05/08/10)",
            "key": "heat_kw"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "FMA4X: factory TXV, R-410A. FMA4P: factory piston (.057/.065/.070 orifice by size), R-410A",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Primary/auxiliary connections, both 3/4 in. FPT",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Carrier",
    "model": "FX4C / FH4C",
    "equip": "Air Handler",
    "summary": "Comfort/Legacy-line fixed-speed PSC fan coils, 018-060. FX4C is the standard slope-coil cabinet (upflow/horizontal); FH4C is the compact companion cabinet (sizes 001-004) built factory horizontal-left. Both use 3-tap PSC motor speed selection at the motor and factory Puron TXV.",
    "match": [
      "Bryant FX4C (Legacy Line Fan Coil)",
      "Payne FX4C",
      "Bryant / Payne FH4C",
      "FY4A (TXV coil shipped/installed alongside FX4C in split coil configurations, same IM)",
      "FA4C / FC4D (same installation manual family as FH4C)"
    ],
    "source": "Carrier IM-FX4C-03, FX4C/FY4A Installation Instructions, https://www.shareddocs.com/hvac/docs/1009/Public/0E/IM-FX4C-03.pdf ; Carrier FA4C/FC4D/FH4C Installation Instructions, https://www.carrierparts.com/?mdocs-file=130282",
    "flags": [
      {
        "title": "FH4C 003/004 horizontal restriction",
        "body": "FH4C is factory built for horizontal-left installation, but FH4C003 and FH4C004 units equipped with an accessory cooling coil are NOT approved for horizontal applications — verify size/coil combination before mounting. All other FX4C/FH4C sizes support upflow and horizontal-left."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower/motor",
            "value": "Fixed-speed PSC, typically 3 motor speed taps",
            "key": "blower_type"
          },
          {
            "label": "Speed selection",
            "value": "Done at the motor, not the board: disconnect fan lead from terminal 2 and move to desired tap — Low (1), Medium (2), High (3). Low static duct systems should use lower tap; high-static systems should use higher tap",
            "key": "speed_select"
          },
          {
            "label": "Max external static (published)",
            "value": "Performance tables published through 0.60 in. wc across sizes 018-060 (see Table 1)",
            "key": "max_esp"
          },
          {
            "label": "Filter",
            "value": "Factory filter kit required if filter is located inside unit; otherwise field-supplied filter required in return duct",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "Field-installed accessory electric heater packages, 5-30 kW; exact approved kits on rating plate",
            "key": "heat_kw"
          },
          {
            "label": "Clearance",
            "value": "20-30 kW heaters require 1 in. (25 mm) clearance to combustibles at discharge plenum for specified distance from unit",
            "key": "heat_clearance"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory hard-shutoff Puron (R-410A) TXV — do not use R-22 TXV or a piston metering device",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Primary and secondary drain pan connections with traps; prime all traps after hookup, do not use shallow running traps to avoid overflow",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Carrier",
    "model": "FB4C",
    "equip": "Air Handler",
    "summary": "Comfort/Legacy-line multipoise fan coil, 018-061, multi-tap ECM motor across all sizes. FB4CNF (018-048) ships with a factory piston; FB4CNP (018-061) ships with a factory TXV — check the model suffix before ordering metering parts or matching to the outdoor unit.",
    "match": [
      "Bryant FB4C (Legacy Line Fan Coil)",
      "Payne FB4C",
      "WeatherMaker FB4C"
    ],
    "source": "Carrier FB4CNF-P-13PD, FB4C Base Series Fan Coil Product Data, https://www.shareddocs.com/hvac/docs/1009/Public/04/FB4CNF-P-13PD.pdf",
    "flags": [
      {
        "title": "NF (piston) vs NP (TXV) suffix matters",
        "body": "FB4CNF (018-048) has a factory-installed Teflon-ring piston; FB4CNP (018-061) has a factory TXV. Confirm the suffix on the rating plate before selecting a replacement metering kit or checking AHRI match-up with the outdoor unit — the two are not interchangeable without the correct accessory kit (TXV kits KFAFR0301FRM / KSATX-series listed in accessories table)."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower/motor",
            "value": "Multi-tap ECM, all sizes, 5 speed taps (Tap 1-5)",
            "key": "blower_type"
          },
          {
            "label": "Speed selection note",
            "value": "Speed Tap 4 (white wire) is reserved for electric heat only — must remain on tap 4, do not reassign for cooling/heat-pump speed",
            "key": "speed_select"
          },
          {
            "label": "Max external static (published)",
            "value": "Performance tables published through 0.60 in. wc across sizes 018-061",
            "key": "max_esp"
          },
          {
            "label": "Filter",
            "value": "Field-supplied filter required (no factory filter included) — filter rack/cabinet accessory kits available (KFAFK0112SML, KFAFR0101FRM, etc.)",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Kit range",
            "value": "Factory-installed heater packages on select models (5-15 kW); accessory field-installed heaters 3-30 kW",
            "key": "heat_kw"
          },
          {
            "label": "Clearance",
            "value": "20-, 24-, 30-kW heaters require 1 in. (25 mm) clearance to combustibles at discharge plenum",
            "key": "heat_clearance"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "FB4CNF (018-048): factory Teflon-ring piston, Puron (R-410A). FB4CNP (018-061): factory TXV, Puron (R-410A)",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Primary/secondary drain connections; prime traps before use per condensate-blowing cautions at high CFM/ton on 048-061 sizes",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Daikin",
    "model": "DM97MC / DC97MC",
    "equip": "Gas Furnace",
    "summary": "97% AFUE modulating gas furnace, 34.5\" chassis. Gas valve modulates continuously (nominally 35-100% of high fire) via pneumatic linkage to the variable-speed inducer.",
    "match": [
      "DM97MC",
      "DC97MC"
    ],
    "source": "Daikin DM97MC/DC97MC Installation Instructions (IM/IOD-2007 series), daikincomfort.com/docs/default-source/dc97mc/im-iod-2007q.pdf; Daikin DM97MC/DC97MC Service Instructions, daikincity.com/document/Service%20Manual/129985",
    "flags": [
      {
        "title": "Do not chase microamps on modulating flame sensor",
        "body": "Daikin service literature states reading flame signal with a microamp meter will not provide reliable/consistent results on this platform and is not a recommended diagnostic practice. IFC posts warning code E6 when signal approaches the low threshold; clean the sensor with steel wool if signal is marginal instead of chasing a microamp number."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG, low stage (~50% firing)",
            "value": "3.5\" w.c. (#45 orifice)",
            "key": "manifold_ng_low"
          },
          {
            "label": "Manifold pressure, NG, high stage / full modulation",
            "value": "see rating plate",
            "key": "manifold_ng_high"
          },
          {
            "label": "Manifold pressure, LP",
            "value": "see rating plate",
            "key": "manifold_lp"
          },
          {
            "label": "Supply/inlet gas pressure, NG",
            "value": "4.5\" w.c. min - 10.0\" w.c. max",
            "key": "supply_ng"
          },
          {
            "label": "Supply/inlet gas pressure, LP",
            "value": "11.0\" w.c. min - 13.0\" w.c. max",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "Fixed, non-adjustable orifice (#45 shown for low stage on published model); do not peen or redrill; verify size on rating plate/LP kit for specific model",
            "key": "orifice"
          },
          {
            "label": "Altitude derate",
            "value": "Modulating furnaces approved for install up to 10,000 ft with no kit or changes required (NG); Canada certified only to 4500 ft; LP altitude kit LPM-09-1.25MM referenced for LP applications",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "Varies by model, e.g. 20-50°F to 35-65°F depending on chassis/tonnage - see rating plate for exact model",
            "key": "temp_rise"
          },
          {
            "label": "Return/entering air temperature requirement",
            "value": "see rating plate",
            "key": "return_air_temp"
          }
        ]
      },
      {
        "title": "Diagnostics/ignition",
        "rows": [
          {
            "label": "Ignitor",
            "value": "Hot surface ignitor (Daikin 0131F00008S), 37-68 ohms cold resistance, ~17 second warm-up",
            "key": "ignitor"
          },
          {
            "label": "Ground check",
            "value": "Measure resistance between neutral (white) connection and a burner (bare metal) - should read 10 ohms or less",
            "key": "ground_check"
          },
          {
            "label": "Status code display",
            "value": "IFC flash/alpha codes on furnace display, e.g. A=normal, H=% gas heat demand, P=% high heat, C=low indoor airflow, E1=low flame signal, E2=igniter fault/improper ground, E7=inducer overcurrent, E8=rollout open, b0-b9=blower faults",
            "key": "status_codes"
          },
          {
            "label": "Induced draft blower motor",
            "value": "ECM winding resistance 14-17 ohms room temp (+/-5% between windings), IFC drive voltage 15-110 VAC between windings",
            "key": "idb_motor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit control",
            "value": "Non-adjustable, automatic-reset, bi-metal, normally closed - no published numeric setpoint (rating plate/part only)",
            "key": "limit"
          },
          {
            "label": "Rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to manifold assembly; normally closed - check continuity with ohmmeter",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Daikin",
    "model": "DM92SN / DC92SN / DM96SN / DC96SN",
    "equip": "Gas Furnace",
    "summary": "R-32-era single-stage, multi-speed ECM gas furnace platform - 92% AFUE (DM92SN/DC92SN) and 96% AFUE (DM96SN/DC96SN) share the same install/service instructions and gas-train specs.",
    "match": [
      "DM92SN",
      "DC92SN",
      "DM96SN",
      "DC96SN"
    ],
    "source": "Daikin Installation Instructions for DM92SN, DM96SN & DC96SN Single-Stage Gas Furnace (IOD-2029), daikincomfort.com/docs/default-source/dm96sn/iod-2029.pdf; Daikin Service Instructions RSD6612021, DM92SN, DM96SN & DC96SN Models, daikincomfort.com/docs/default-source/dm96sn/291234817.pdf",
    "flags": [
      {
        "title": "Drain trap is dual-partitioned - prime both sides",
        "body": "Daikin installation instructions specify the drain trap must be primed prior to startup by filling BOTH sides of the trap with water, not just one - a single-side fill leaves one leg dry and can pull flue gas/nuisance-trip the pressure switch."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG",
            "value": "3.5\" w.c. nominal (3.2-3.8\" w.c. range, tolerance +/-0.3\" from setpoint)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure, LP",
            "value": "10.0\" w.c. nominal (9.7-10.3\" w.c. range, tolerance +0.5\" from setpoint)",
            "key": "manifold_lp"
          },
          {
            "label": "Supply/inlet gas pressure, NG",
            "value": "4.5\" w.c. min - 10.0\" w.c. max",
            "key": "supply_ng"
          },
          {
            "label": "Supply/inlet gas pressure, LP",
            "value": "11.0\" w.c. min - 13.0\" w.c. max",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "see rating plate (fixed orifice, size not published generically in install/service instructions)",
            "key": "orifice"
          },
          {
            "label": "Altitude derate",
            "value": "Install per Listed High Altitude Conversion Kit required above 7000 ft (2134 m); do not reduce manifold pressure below rating-plate spec at altitude - low air density + low manifold pressure starves burner orifice of air",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific table in Specification Sheet)",
            "key": "temp_rise"
          },
          {
            "label": "Return/entering air temperature requirement",
            "value": "see rating plate",
            "key": "return_air_temp"
          }
        ]
      },
      {
        "title": "Diagnostics/ignition",
        "rows": [
          {
            "label": "Ignitor",
            "value": "120V silicon nitride HSI, 37-68 ohms cold resistance, steady-state preheat current 0.37-0.68A at 120V, normal operating temp ~2156-2678°F",
            "key": "ignitor"
          },
          {
            "label": "Ground check",
            "value": "115VAC supply must be properly grounded with correct polarity; measure neutral-to-bare-metal resistance - 10 ohms or less (standard Daikin ground check)",
            "key": "ground_check"
          },
          {
            "label": "Status code display",
            "value": "IFC status menu shows mode codes (idle, continuous fan, cooling low/high stage, gas heat) - see rating plate/IFC menu for full code list",
            "key": "status_codes"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Auxiliary/primary limit control",
            "value": "see rating plate (S-301 checking procedure published; numeric setpoint not published generically)",
            "key": "limit"
          },
          {
            "label": "Rollout switch",
            "value": "Manual-reset flame rollout control, opens on flame rollout condition - check continuity with ohmmeter",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Daikin",
    "model": "DM80HE / DC80 (DM80HS / DD80HS / DM80SS platform)",
    "equip": "Gas Furnace",
    "summary": "80% AFUE two-stage, convertible multi-speed gas furnace platform. DM80HE shares its Installation Instructions with the DD80HS and DM80SS models (upflow/horizontal and downflow/horizontal variants of the same chassis).",
    "match": [
      "DM80HE",
      "DC80",
      "DD80HS",
      "DM80SS",
      "DM80HS"
    ],
    "source": "Daikin Installation Instructions for DM80(H,S)S/DD80(H,S)S/DM80HE Gas Furnace, daikincomfort.com (ManualsLib-hosted copy: manualslib.com/manual/3578174/Daikin-Dm80s.html); DM80HS0403A product literature (Durable Silicon Nitride igniter, self-diagnostic control board)",
    "flags": [
      {
        "title": "Manifold pressure is on the rating plate, not a single fixed number",
        "body": "This is a single-orifice, two-stage design - staging is done by the gas valve regulator, not a second orifice. Daikin's install instructions state gas manifold pressure MUST be as specified on the unit rating plate and that only minor adjustment should be made at the gas valve pressure regulator - do not set to a generic number without checking the plate for that specific model/BTU input."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG low/high stage",
            "value": "Typical two-stage table on this platform: low ~1.9\" w.c. (1.6-2.2\" range), high ~3.5\" w.c. (3.2-3.8\" range) - confirm exact stage values on rating plate",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure, LP low/high stage",
            "value": "Typical two-stage table on this platform: low ~6.0\" w.c. (5.7-6.3\" range), high ~10.0\" w.c. (9.7-10.3\" range) - confirm exact stage values on rating plate",
            "key": "manifold_lp"
          },
          {
            "label": "Supply/inlet gas pressure, NG",
            "value": "4.5\" w.c. min - 10.0\" w.c. max",
            "key": "supply_ng"
          },
          {
            "label": "Supply/inlet gas pressure, LP",
            "value": "11.0\" w.c. min - 13.0\" w.c. max",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "NG: #45; LP: #55 (requires LPT-03 kit single-stage / LPM-06 kit two-stage)",
            "key": "orifice"
          },
          {
            "label": "Altitude derate",
            "value": "No modification required 0-5,500 ft; above 5,500 ft a pressure switch change and orifice change kit are required (distributor-supplied kit)",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific chart in Quick Start/Specification Sheet)",
            "key": "temp_rise"
          },
          {
            "label": "Return/entering air temperature requirement",
            "value": "see rating plate",
            "key": "return_air_temp"
          }
        ]
      },
      {
        "title": "Diagnostics/ignition",
        "rows": [
          {
            "label": "Ignitor",
            "value": "Silicon Nitride HSI; generic Daikin HSI spec is 37-68 ohms cold resistance - confirm on this specific control if in doubt",
            "key": "ignitor"
          },
          {
            "label": "Ground check",
            "value": "Standard Daikin ground/polarity check: resistance between neutral (white) connection and a burner (bare metal) should be 10 ohms or less",
            "key": "ground_check"
          },
          {
            "label": "Status code display",
            "value": "Self-diagnostic control board with constant-memory fault code, shown via LED flash code - see control board legend/rating plate for full code list",
            "key": "status_codes"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit control",
            "value": "see rating plate (non-adjustable auto-reset control; numeric setpoint not published generically)",
            "key": "limit"
          },
          {
            "label": "Rollout switch",
            "value": "Manual-reset flame rollout control - check continuity with ohmmeter",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Daikin",
    "model": "DM80SN / DC80SN",
    "equip": "Gas Furnace",
    "summary": "80% AFUE single-stage gas furnace, its own service platform distinct from the DM80HE two-stage chassis. Ships with either a Carbide Mini or Silicon Nitride hot surface igniter depending on production run.",
    "match": [
      "DM80SN",
      "DC80SN"
    ],
    "source": "Daikin DM80SN/DC80SN Service Instructions, daikincomfort.com (ManualsLib-hosted copy: manualslib.com/manual/2583493/Daikin-Dm80sn.html)",
    "flags": [
      {
        "title": "Two different igniter types in the field - don't assume ohms range",
        "body": "This platform used either a Carbide Mini igniter (30-300 ohms cold, ~2550-2876°F operating temp, ~0.7A +/-0.3A steady-state draw) or a 120V Silicon Nitride igniter (part 0130F00008, 37-68 ohms cold, ~2156-2678°F operating temp). Confirm which is installed before condemning an igniter on a resistance reading - a Silicon Nitride unit reading 150 ohms is bad, but that same 150 ohms is normal on a Carbide Mini."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG",
            "value": "3.5\" w.c. (tolerance +/-0.3\" w.c. from setpoint)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure, LP",
            "value": "10.0\" w.c. (tolerance +/-0.3\" w.c. from setpoint)",
            "key": "manifold_lp"
          },
          {
            "label": "Supply/inlet gas pressure, NG",
            "value": "4.5\" w.c. min - 10.0\" w.c. max",
            "key": "supply_ng"
          },
          {
            "label": "Supply/inlet gas pressure, LP",
            "value": "11.0\" w.c. min - 13.0\" w.c. max",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "see rating plate (fixed orifice; per manual, resize only for altitude-related firing-rate reduction - never peen or redrill)",
            "key": "orifice"
          },
          {
            "label": "Altitude derate",
            "value": "see rating plate / distributor altitude kit (not published generically in this manual section)",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          },
          {
            "label": "Return/entering air temperature requirement",
            "value": "see rating plate",
            "key": "return_air_temp"
          }
        ]
      },
      {
        "title": "Diagnostics/ignition",
        "rows": [
          {
            "label": "Ignitor - Carbide Mini",
            "value": "30-300 ohms cold resistance, ~2550-2876°F operating temp, steady-state current ~0.7A +/-0.3A at 120V",
            "key": "ignitor_carbide"
          },
          {
            "label": "Ignitor - Silicon Nitride",
            "value": "Part 0130F00008, 37-68 ohms cold resistance, ~2156-2678°F operating temp",
            "key": "ignitor_sn"
          },
          {
            "label": "Ground check",
            "value": "Standard Daikin ground/polarity check: resistance between neutral (white) connection and a burner (bare metal) should be 10 ohms or less",
            "key": "ground_check"
          },
          {
            "label": "Status/config display",
            "value": "IFC main/option menu shows active alarm + last 6 faults by code number; also hosts blower-speed and heat/cool on/off delay config (e.g. gas heat on-delay default 30 sec, off-delay default 90 sec)",
            "key": "status_codes"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit control",
            "value": "see rating plate (S-300 checking procedure published; numeric setpoint not published generically)",
            "key": "limit"
          },
          {
            "label": "Rollout switch",
            "value": "Manual-reset flame rollout control (S-302) - check continuity with ohmmeter",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Daikin",
    "model": "DZ18TC / DX18TC",
    "equip": "Condenser/Heat Pump",
    "summary": "Shared-platform 2-stage (Low/High capacity) split-system heat pump (DZ18TC) and air conditioner (DX18TC), R-410A, factory-equipped with an outdoor air temperature (OAT) sensor and optional ComfortNet communicating control.",
    "match": [
      "DZ18TC",
      "DZ18VCA",
      "DX18TC",
      "Daikin 2-stage heat pump",
      "Daikin 2-stage condenser"
    ],
    "source": "SS-DZ18TC spec sheet, backend.daikincomfort.com/docs/default-source/product-documents/residential/specifications/ss-dz18tc.pdf; ComfortNet DX16TC & DX18TC Service Instructions",
    "flags": [
      {
        "title": "Model number check",
        "body": "User's original spec sheet listed 'DZ18VCA' for a 2-stage heat pump, but Daikin's published 2-stage platform is DZ18TC (paired AC: DX18TC) — DZ18VC/DZ18VCA is actually an inverter (variable-speed swing compressor) model, not 2-stage. Confirm the exact nameplate model/serial before servicing; this entry covers the DZ18TC/DX18TC 2-stage platform."
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
            "value": "TXV (thermostatic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "2-stage (Low/High capacity) scroll compressor",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Heat Pump Operation (DZ18TC)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand-defrost control board (time/temperature adaptive)",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling; de-energized in heating (standard Daikin residential convention)",
            "key": "reversingValve"
          },
          {
            "label": "Low-ambient heating lockout",
            "value": "See service manual / installation instructions for line-set-length-dependent lockout tables",
            "key": "lowAmbient"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — cutout/cutin PSIG varies by tonnage; not safe to generalize across the 1.5–5 ton range",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate / service manual for this tonnage (not confirmed factory-standard across all sizes)",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "ComfortNet-ready — factory OAT sensor installed; supports ComfortNet communicating thermostat, non-communicating (24V) operation also supported",
            "key": "communicating"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Standard superheat/subcooling charging per unit nameplate charging chart (non-inverter 2-stage compressor — standard gauge charging applies, unlike the inverter platforms)",
            "key": "charging"
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
    "model": "DZ17VSA / DX17VSS",
    "equip": "Condenser/Heat Pump",
    "summary": "Daikin FIT variable-speed, inverter-drive, side-discharge split system: DZ17VSA heat pump and DX17VSS air conditioner, R-410A, EEV metering, Intelligent Defrost, Daikin One+ compatible.",
    "match": [
      "DZ17VSA",
      "DX17VSA",
      "DX17VSS",
      "Daikin FIT 17 series",
      "Daikin FIT heat pump",
      "Daikin FIT air conditioner"
    ],
    "source": "SS-DZ17VSA spec sheet and SS-DX17VSS spec sheet, backend.daikincomfort.com/docs/default-source/product-documents/residential/specifications/ (ss-dz17vsa.pdf, ss-dx17vss.pdf); DX17VSS/DZ17VSA outdoor unit installation instructions",
    "flags": [
      {
        "title": "Model number check",
        "body": "User's original list gave 'DX17VSA' for the AC condenser; Daikin's published FIT AC partner to DZ17VSA is DX17VSS (no DX17VSA exists in current Daikin literature). Confirm nameplate model before ordering parts."
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
            "value": "EEV (electronic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed (inverter) swing compressor, side-discharge cabinet",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Heat Pump Operation (DZ17VSA)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Intelligent Defrost Mode (inverter demand-based, communicating control)",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling; de-energized in heating (standard Daikin residential convention)",
            "key": "reversingValve"
          },
          {
            "label": "Low-ambient heating lockout",
            "value": "Line-set-length dependent — installation instructions specify a 15°F heating lockout when the line set is 30 ft or longer; see manual for full lockout table by line length",
            "key": "lowAmbient"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — inverter-modulated; cutout/cutin not fixed across the operating range",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate / service manual for this tonnage",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Daikin One+ smart thermostat compatible; communicating (BACnet-style Daikin serial) control with algorithmic staging logic",
            "key": "communicating"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Inverter charge mode via control board / Daikin One app — do NOT charge to static gauge superheat/subcooling targets; charge to nameplate per installation instructions' final charge procedure",
            "key": "charging"
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
    "model": "DZ6VS / DX6VS",
    "equip": "Condenser/Heat Pump",
    "summary": "Daikin FIT entry-level R-32 (A2L) side-discharge inverter platform: DZ6VS heat pump and DX6VS air conditioner. Factory crankcase heater required per R-32 long-line-set guidance.",
    "match": [
      "DZ6VS",
      "DZ6VSA",
      "DX6VS",
      "Daikin FIT R-32",
      "Daikin R32 side discharge"
    ],
    "source": "SS-DZ6VS and SS-DX6VS spec sheets, backend.daikincomfort.com/docs/default-source/product-documents/residential/specifications/ (ss-dz6vs.pdf, ss-dx6vs.pdf); DZ6VS Service Instructions (SiUS612209EA), daikincomfort.com/docs/default-source/daikin-fit-heat-pump---dz6vs/; R-32 Long Line Set Application Technical Publication TP-110",
    "flags": [
      {
        "title": "R-32 (A2L) refrigerant — verify nameplate before service",
        "body": "This platform uses R-32, a mildly flammable (A2L) refrigerant. Use only EPA 608-certified, A2L-rated recovery/charging equipment and an A2L-approved (non-spark) leak detector; no open flame or halogen-torch leak testing. Confirm refrigerant type on the unit's own rating plate — do not assume from model family alone."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (A2L, mildly flammable) — verify on rating plate",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "EEV (electronic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed inverter, side-discharge cabinet",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Heat Pump Operation (DZ6VS)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Inverter demand-based defrost control",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling; de-energized in heating (standard Daikin residential convention)",
            "key": "reversingValve"
          },
          {
            "label": "Low-ambient heating range",
            "value": "Published heating operating range approximately -10°F to 70°F ambient; see spec sheet for exact lockout by capacity",
            "key": "lowAmbient"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — inverter-modulated, not fixed",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "Factory-installed on all heat pump models in this line per Daikin R-32 long-line-set guidance; a 40W crankcase heater is required on any compressor if not already factory-fitted",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Daikin One+ compatible communicating control",
            "key": "communicating"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Inverter charge mode — do NOT charge to static gauge superheat/subcooling targets; charge to nameplate per installation instructions' final charge procedure. A2L systems: pressure-test with dry nitrogen/helium only, never refrigerant, for leak checks",
            "key": "charging"
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
    "model": "DH9VS / DC9VS",
    "equip": "Condenser/Heat Pump",
    "summary": "Daikin FIT Aurora R-32 (A2L) higher-performance inverter platform: DH9VS side-discharge cold-climate heat pump (ENERGY STAR Cold Climate Heat Pump certified) and DC9VS air conditioner.",
    "match": [
      "DH9VS",
      "DZ9VSA",
      "DC9VS",
      "DX9VSA",
      "Daikin FIT Aurora",
      "Daikin cold climate heat pump R-32"
    ],
    "source": "SS-DH9VS-R32 spec sheet, daikincomfort.com/docs/default-source/fit-aurora-heat-pump-dh9vs/ss-dh9vs-r32.pdf; SS-DC9VS-R32 spec sheet; DH9VS/DH7VS/DC9VS Outdoor Unit Installation & Service Reference Manual",
    "flags": [
      {
        "title": "Model number check + R-32 (A2L) refrigerant",
        "body": "User's original list named 'DZ9VSA'/'DX9VSA' for the R-32 inverter platform; no such models appear in current Daikin literature. The closest published R-32 inverter platform above the entry-level DZ6VS/DX6VS line is DH9VS (heat pump, Aurora cold-climate) paired with DC9VS (AC). R-32 is a mildly flammable (A2L) refrigerant — use only EPA 608-certified, A2L-rated equipment and A2L-approved leak detection; confirm refrigerant on the rating plate."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (A2L, mildly flammable) — verify on rating plate",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "EEV (electronic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed inverter (swing compressor), side-discharge cabinet",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Heat Pump Operation (DH9VS)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Inverter demand-based defrost control",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling; de-energized in heating (standard Daikin residential convention)",
            "key": "reversingValve"
          },
          {
            "label": "Low-ambient / cold-climate rating",
            "value": "ENERGY STAR Cold Climate Heat Pump certified — engineered for high heating-capacity retention at low outdoor ambient; see spec sheet capacity-maintenance table for exact temperature points (not generalized here)",
            "key": "lowAmbient"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — inverter-modulated, not fixed",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "Factory-installed (standard on this R-32 heat pump line per Daikin long-line-set guidance)",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Daikin One+ compatible communicating control",
            "key": "communicating"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Inverter charge mode — do NOT charge to static gauge superheat/subcooling targets; charge to nameplate per installation instructions' final charge procedure. A2L systems: pressure-test with dry nitrogen/helium only, never refrigerant",
            "key": "charging"
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
    "model": "DX20VC",
    "equip": "Condenser",
    "summary": "High-efficiency inverter-technology split-system air conditioner (up to 24.5 SEER), R-410A, shares its inverter platform with the already-covered DZ20VC heat pump. Standalone AC-only equivalent — no matching DZ20VC 'AC-only' distinction needed since DZ20VC covers the heat pump side.",
    "match": [
      "DX20VC",
      "Daikin inverter condenser",
      "Daikin 20 SEER AC"
    ],
    "source": "SS-DX20VC spec sheet, backend.daikincomfort.com/docs/default-source/product-documents/residential/specifications/ss-dx20vc.pdf",
    "flags": [
      {
        "title": "AC-side companion to already-covered DZ20VC",
        "body": "DZ20VC (heat pump) is already documented elsewhere in this tool; DX20VC is its cooling-only counterpart and shares the same inverter compressor/EEV/communicating platform — heat-pump-specific fields (defrost, reversing valve) do not apply to this AC-only unit."
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
            "value": "EEV (electronic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed inverter (Swing/Scroll depending on tonnage)",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — inverter-modulated, not fixed across the 2–5 ton range",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate / service manual for this tonnage",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "ComfortNet/Daikin One+ compatible variable-speed communicating control",
            "key": "communicating"
          },
          {
            "label": "Cooling ambient operating range",
            "value": "See spec sheet for minimum/maximum outdoor ambient cooling operation by tonnage",
            "key": "ambientRange"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Inverter charge mode — do NOT charge to static gauge superheat/subcooling targets; charge to nameplate per installation instructions' final charge procedure",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Daikin",
    "model": "DX16SA",
    "equip": "Condenser",
    "summary": "High-efficiency single-stage split-system air conditioner, up to 16 SEER, R-410A, fixed-speed scroll compressor with single-speed condenser fan — the AC-only counterpart to the already-covered DZ16SA/DZ14SA standard heat pumps.",
    "match": [
      "DX16SA",
      "Daikin single stage condenser",
      "Daikin 16 SEER AC"
    ],
    "source": "SS-DX16SA spec sheet, backend.daikincomfort.com/docs/default-source/product-documents/residential/specifications/ss-dx16sa.pdf",
    "flags": [
      {
        "title": "AC-side companion to already-covered DZ16SA/DZ14SA",
        "body": "DZ16SA and DZ14SA (standard single/2-stage heat pumps) are already documented elsewhere in this tool. DX16SA is the fixed-speed AC-only condenser sharing this standard (non-inverter) platform — heat-pump-specific fields (defrost, reversing valve, low-ambient heating lockout) do not apply."
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
            "value": "TXV (thermostatic expansion valve)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Single-stage, single-speed scroll compressor",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Controls & Protection",
        "rows": [
          {
            "label": "High/low pressure switch setpoints",
            "value": "See service manual — cutout/cutin PSIG varies by tonnage (1.5–5 ton range)",
            "key": "pressureSwitch"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate / service manual for this tonnage (not standard on all sizes of this fixed-speed platform)",
            "key": "crankcaseHeater"
          },
          {
            "label": "Communicating status",
            "value": "Non-communicating, standard 24V single-stage control (no ComfortNet/Daikin One+ communicating capability on this platform)",
            "key": "communicating"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Standard superheat (fixed orifice-style TXV) charging per unit nameplate charging chart — conventional gauge charging applies (non-inverter, fixed-speed compressor)",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Daikin",
    "model": "DAR / DAT Series",
    "equip": "Air Handler",
    "summary": "Commercial multi-position air handler, 7.5-10 ton, belt-drive centrifugal blower (DAR = single-speed motor; DAT = two-speed motor, 3-phase only), factory-installed internal TXV. No factory electric heat -- AHKD accessory heater kits only.",
    "match": [
      "DAR09*",
      "DAR12*",
      "DAT09*",
      "DAT12*",
      "AR090*",
      "AR120*"
    ],
    "source": "Daikin Service Instructions RSD6200006R47 (DAR09, DAR12, DAT09, DAT12, DX11/13/14/15/16), daikincomfort.com",
    "flags": [
      {
        "title": "No factory electric heat",
        "body": "AR, DAR, and DAT series air handlers do not have factory-installed electric heat. AHKD accessory heater kits (15/20/30 kW nominal, 208-230V-3-60 or 460V-3-60) are the ONLY heater kits approved for these series -- confirm the electrical characteristics of the air handler, heater kit, and building power supply are compatible before install."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower drive",
            "value": "Belt-driven, draw-through centrifugal blower; heavy-gauge galvanized cabinet with fiberglass sound-blanket lining",
            "key": "blower"
          },
          {
            "label": "Speed",
            "value": "DAR = single-speed motor; DAT = two-speed motor (for use with two condenser stages, e.g. DX13/DZ13)",
            "key": "speed"
          },
          {
            "label": "Airflow setup / CFM per tap",
            "value": "Not published in the service literature reviewed -- confirm against the unit rating plate or IOM airflow table before adjusting",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static",
            "value": "See unit rating plate / IOM airflow table (not captured in service manual reviewed)",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Heat / Metering / Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed, internally mounted TXV (nomenclature position 'T')",
            "key": "metering"
          },
          {
            "label": "Electric heat",
            "value": "None factory-installed. AHKD accessory kits: 15 kW / 20 kW / 30 kW nominal, 208-230V-3-60 or 460V-3-60",
            "key": "heat_kit"
          },
          {
            "label": "Voltage config",
            "value": "DAR: 208/230V 3-phase. DAT: 208/230V or 460V 3-phase. Indoor applications field-convertible 208/230-3-60 to 460-3-60",
            "key": "voltage"
          },
          {
            "label": "Drain pan / filter",
            "value": "Not detailed in the service manual sections reviewed -- see rating plate / IOM for exact drain connection and filter size",
            "key": "drain_filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Daikin",
    "model": "ASPT / AMST Series",
    "equip": "Air Handler",
    "summary": "Residential multi-position, multi-speed ECM-based air handler with internal factory TXV, 1.5-5 ton (ASPT); companion AMST is the current 9-speed ECM update on the same cased-cabinet platform. NOTE: no Daikin model literally named 'DASH' exists in the literature reviewed -- this entry is mapped to the closest current multi-speed/high-efficiency ECM cased air handler family and should be verified against the unit's actual nameplate model.",
    "match": [
      "ASPT*",
      "AMST*"
    ],
    "source": "Daikin Spec Sheet SS-DASPT (ASPT Series, Multi-Position Multi-Speed ECM-Based Air Handler w/ Internal TXV, 1.5-5 Tons), daikincomfort.com",
    "flags": [
      {
        "title": "Confirm heater kit vs. minimum CFM",
        "body": "The blower speed tap selected must meet or exceed the minimum CFM required for the installed heater kit (see the Heat Kit Data / Minimum CFM Required table) -- an undersized tap on a heat-kit-equipped unit can trip the high-limit or damage the heater."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Direct-drive, multi-speed ECM, field speed-tap selectable",
            "key": "blower"
          },
          {
            "label": "Cabinet",
            "value": "SmartFrame cabinet, 21\" depth for attic access, DecaBDE-free thermoplastic drain pan w/ secondary drain connections",
            "key": "cabinet"
          },
          {
            "label": "Airflow example (ASPT25B14 @ 0.3\" ESP)",
            "value": "1,295 CFM (tap 1); full per-model, per-tap, per-static table published in SS-DASPT for all 13 cabinet sizes",
            "key": "airflow"
          },
          {
            "label": "Max external static",
            "value": "Table-driven per model/tap (0.1-1.0 in. w.c. range published in spec sheet); confirm exact max for installed model on rating plate",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Heat / Metering / Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Internal, factory-installed TXV for cooling and heat pump applications",
            "key": "metering"
          },
          {
            "label": "Electric heat",
            "value": "3 kW - 25 kW HKS heater kits, staged: 03=3.0kW, 05=4.5kW, 06=6.0kW, 08=8.0kW, 10=9.6kW, 15=14.4kW, 19=19.2kW (150F limit), 20=19.2kW (170F limit), 25=25.0kW",
            "key": "heat_kit"
          },
          {
            "label": "Coil drain connect",
            "value": "3/4\" FPT on most cabinet sizes",
            "key": "drain"
          },
          {
            "label": "Filter",
            "value": "Tool-less filter access; exact filter size not published in the spec-sheet pages captured -- confirm on rating plate/cabinet label",
            "key": "filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Daikin",
    "model": "MBVC Series",
    "equip": "Air Handler",
    "summary": "Multi-position, variable-speed ECM-based modular blower -- a blower-only chassis matched to a separately-ordered cased coil -- ComfortNet-communicating capable, with advanced airflow/tonnage auto-configuration in communicating mode.",
    "match": [
      "MBVC*"
    ],
    "source": "Daikin Spec Sheet SS-DMBVC (MBVC Series, Multi-Position Variable-Speed ECM-Based Modular Blower -- Communicating), daikincomfort.com",
    "flags": [
      {
        "title": "Blower-only chassis -- metering lives in the coil",
        "body": "MBVC is a modular blower section only; there is no factory metering device on the blower itself. TXV or piston selection is set by the matched cased coil ordered separately -- verify the coil's metering device matches the outdoor unit, not the MBVC nameplate."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Variable-speed ECM, direct drive",
            "key": "blower"
          },
          {
            "label": "Airflow delivered (nomenclature)",
            "value": "08 = 800 CFM, 12 = 1200 CFM, 16 = 1600 CFM, 20 = 2000 CFM",
            "key": "airflow"
          },
          {
            "label": "Airflow behavior",
            "value": "Constant CFM held across a wide static-pressure range independent of duct system; adjustable low CFM for fan-only operation; CFM indicator and fault recall (last 6 faults) on control",
            "key": "airflow_behavior"
          },
          {
            "label": "Max external static",
            "value": "Not present in the spec-sheet pages captured -- see rating plate / full airflow table",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Heat / Cabinet / Drain",
        "rows": [
          {
            "label": "Electric heat",
            "value": "3 kW - 21 kW heater kits (HKR/HKA/HKP families): 4.75 kW, 7.00 kW, 9.50 kW, 14.25-15.00 kW, 19.00-19.60 kW steps",
            "key": "heat_kit"
          },
          {
            "label": "Cabinet",
            "value": "21\" deep, foil-faced insulation, galvanized leather-grain finish; blower section itself is usable as the electric heater enclosure",
            "key": "cabinet"
          },
          {
            "label": "Metering device",
            "value": "None on the blower chassis -- set by the matched cased coil (TXV or piston per coil model)",
            "key": "metering"
          },
          {
            "label": "Drain pan / filter",
            "value": "Not present in the spec-sheet pages captured -- see rating plate / IOM",
            "key": "drain_filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Daikin",
    "model": "DHG Series",
    "equip": "Air Handler",
    "summary": "Packaged rooftop gas/electric unit, 3-12.5 ton (separate 3-6 ton and 7.5-12.5 ton platforms). NOTE: this is a self-contained packaged unit, not a matched indoor air handler section -- covered here for its integrated supply-air/blower section per request. 3-6 ton platform: direct-drive multi-speed blower (10 speed taps), two-stage gas heat, factory TXV.",
    "match": [
      "DHG*"
    ],
    "source": "Daikin Installation Instructions IM-IOD-1075 (DHG Series 3-6 Ton Packaged Gas/Electric Unit, Direct Drive), daikincomfort.com",
    "flags": [
      {
        "title": "Never operate without the condensate trap",
        "body": "Manual states explicitly: install the condensate drain trap (3/4\" drain line and fittings minimum, 4\" minimum trap depth recommended) before operating -- 'do not operate without trap.' Running the unit untrapped lets flue draft pull air backward through the drain pan."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Direct-drive, multi-speed motor -- 10 speed taps on standard/high-static gas 3-6 ton models; CFM set via low-voltage leads on terminal block TB1",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "Speed-tap selection at TB1 per the Appendix A blower-performance tables; standard-static and high-static gas versions have different allowable tap ranges",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static",
            "value": "Model/tap-dependent -- see Appendix A blower performance tables in IM-IOD-1075",
            "key": "max_esp"
          },
          {
            "label": "Filter",
            "value": "Filter section behind access panels -- note airflow-direction arrows on filter frames when replacing; exact size not published in pages captured, see rating plate",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Heat / Metering / Drain",
        "rows": [
          {
            "label": "Gas heat staging",
            "value": "Two-stage heating (low/high stage regulator); example unit natural-gas manifold pressure: low stage 1.7 in. w.c. minimum, high stage 2.7-3.3 in. w.c. -- verify exact figures against the specific model's rating plate",
            "key": "gas_stage"
          },
          {
            "label": "Metering device",
            "value": "TXV -- field superheat adjustment: clockwise (in) increases superheat, counterclockwise (out) decreases superheat",
            "key": "metering"
          },
          {
            "label": "Condensate drain",
            "value": "3/4\" drain line and fittings minimum; install trap per detail drawing (4\" minimum trap recommended); do not operate without trap",
            "key": "drain"
          },
          {
            "label": "Combustion air",
            "value": "Power venter supplies combustion air -- keep air passageways and unit clearances free of obstruction",
            "key": "combustion_air"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  }
,
{
    "brand": "Trane",
    "model": "S9X2 / S9X1",
    "equip": "Gas Furnace",
    "summary": "96% AFUE condensing furnace platform, upflow/horizontal/dedicated downflow, direct/non-direct vent, high-efficiency motor. S9X2 is two-stage, S9X1 is single-stage; both share the same IFC, gas valve and orifice spec. American Standard twins AUH2 (two-stage) / AUD2 (single-stage).",
    "match": [
      "S9X2",
      "S9X1",
      "AUH2",
      "AUD2"
    ],
    "source": "Trane Installer's Guide 18-CE12D1-1D-EN (Sep 2020) - https://elibrary.tranetechnologies.com/public/residential-hvac/Literature/Installation/18-CE12D1-1D-EN_09162020.pdf",
    "flags": [
      {
        "title": "Adjust 2nd stage before 1st stage",
        "body": "Per the Installer's Guide gas valve adjustment procedure: always set the 2nd stage (HI) manifold pressure first, then the 1st stage (LO). Setting ISD (Interstage Delay) to 000 via the IFC menu/option buttons will force 2nd stage immediately after the 1st-stage blower-on delay, shortening setup time."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure - NG (2nd Stg HI / 1st Stg LO)",
            "value": "3.5\" / 1.7\" W.C.",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure - LP (2nd Stg HI / 1st Stg LO)",
            "value": "10.0\" / 6.0\" W.C.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure - NG",
            "value": "min 5.0\" - max 13.8\" W.C.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure - LP",
            "value": "min 11.0\" - max 13.8\" W.C.",
            "key": "supply_lp"
          },
          {
            "label": "Main burner orifice (all models, all inputs)",
            "value": "NG drill #45, LP drill #56",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J (two-stage, toggle on/off)",
            "key": "gas_valve"
          },
          {
            "label": "High altitude derate",
            "value": "Reduce input 4% per 1,000 ft above 2,000 ft; re-check clocked input after orifice/pressure change",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see Service Facts (model-specific CFM vs. ESP tables in IOM)",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame sensing current",
            "value": "0.75 - 3.0 microamps DC (1 VDC = 1 microamp on IFC flame-sense test pads \"FP\")",
            "key": "flame_ua"
          },
          {
            "label": "Ignitor type",
            "value": "Hot surface ignitor; warm-up ~17 sec (resistance not published in this IOM - see rating plate/Service Facts)",
            "key": "ignitor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Limit switch",
            "value": "Main thermal limit, fixed, checked by blocking return air - see rating plate for max outlet temp setpoint",
            "key": "limit"
          },
          {
            "label": "Rollout switch(es)",
            "value": "Flame roll-out switches (FRS 1 & 2); trip = error code e11 \"Open Limit (Main Thermal, Rollout Switch, or Reverse Airflow Switch)\"",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Trane",
    "model": "S9B1",
    "equip": "Gas Furnace",
    "summary": "96% AFUE single-stage condensing furnace, upflow/horizontal/dedicated downflow, direct/non-direct vent, high-efficiency motor. Shares the same IFC, gas train and orifice spec as S9X1/S9X2 (documented together in the same Installer's Guide).",
    "match": [
      "S9B1"
    ],
    "source": "Trane Installer's Guide 18-CE12D1-1D-EN (Sep 2020) - https://elibrary.tranetechnologies.com/public/residential-hvac/Literature/Installation/18-CE12D1-1D-EN_09162020.pdf",
    "flags": [
      {
        "title": "Do not touch ignitor",
        "body": "Hot surface ignitor warning printed in the IOM: \"Do NOT touch igniter. It is extremely hot.\" Allow full cool-down before servicing the burner box."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure - NG",
            "value": "3.5\" W.C.",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure - LP",
            "value": "10.0\" W.C.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure - NG",
            "value": "min 5.0\" - max 13.8\" W.C.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure - LP",
            "value": "min 11.0\" - max 13.8\" W.C.",
            "key": "supply_lp"
          },
          {
            "label": "Main burner orifice (all inputs)",
            "value": "NG drill #45, LP drill #56",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J single-stage / redundant combination valve (per platform wiring diagrams)",
            "key": "gas_valve"
          },
          {
            "label": "High altitude derate",
            "value": "Reduce input 4% per 1,000 ft above 2,000 ft",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see Service Facts (model-specific CFM vs. ESP tables in IOM)",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame sensing current",
            "value": "0.75 - 3.0 microamps DC (1 VDC = 1 microamp on IFC flame-sense test pads \"FP\")",
            "key": "flame_ua"
          },
          {
            "label": "Ignitor type",
            "value": "Hot surface ignitor; warm-up ~17 sec (resistance not published in this IOM - see rating plate/Service Facts)",
            "key": "ignitor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Limit switch",
            "value": "Main thermal limit, fixed - see rating plate for max outlet temp setpoint",
            "key": "limit"
          },
          {
            "label": "Rollout switch(es)",
            "value": "Flame roll-out switches (FRS 1 & 2); trip = error code e11 \"Open Limit (Main Thermal, Rollout Switch, or Reverse Airflow Switch)\"",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Trane",
    "model": "S8V2 / S8X2",
    "equip": "Gas Furnace",
    "summary": "80% AFUE two-stage induced-draft furnace platform. S8X2 uses a high-efficiency fixed-speed motor; S8V2(-C) uses a variable-speed/communicating motor. Both share the same gas train, orifice spec and manifold pressure settings. American Standard twins ADH2 / AUH2.",
    "match": [
      "S8V2",
      "S8X2",
      "ADH2",
      "AUH2"
    ],
    "source": "Trane IOM S8XB-SVX001-1D-EN (Aug 2024, covers S8B1/S8X1/S8X2) - https://elibrary.tranetechnologies.com/public/residential-hvac/Literature/Installation%20Operation%20and%20Maintenance/S8XB-SVX001-1D-EN_08092024.pdf | Trane IOM FNR-SVX003A-EN (Oct 2025, S8V2-C) - https://elibrary.tranetechnologies.com/public/residential-hvac/Literature/Installation%20Operation%20and%20Maintenance/FNR-SVX003A-EN_10312025.pdf",
    "flags": [
      {
        "title": "Adjust 2nd stage before 1st stage",
        "body": "Gas valve adjustment procedure requires setting the 2nd stage (HI) manifold pressure first, then 1st stage (LO); confirm 2nd stage is active by verifying 24VAC between C and HI on the gas valve before adjusting."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure - NG (2nd Stg HI / 1st Stg LO)",
            "value": "3.5\" / 1.6\" W.C. (D120 models: 3.5\" / 1.8\" W.C.)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure - LP (2nd Stg HI / 1st Stg LO)",
            "value": "10.0\" / 6.0\" W.C. (D120 models: 10.0\" / 7.5\" W.C.)",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure - NG",
            "value": "min 5.0\" - max 13.8\" W.C.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure - LP",
            "value": "min 11.0\" - max 13.8\" W.C.",
            "key": "supply_lp"
          },
          {
            "label": "Main burner orifice (all models)",
            "value": "NG drill #45, LP drill #56",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J two-stage",
            "key": "gas_valve"
          },
          {
            "label": "High altitude derate",
            "value": "Reduce input 4% per 1,000 ft above 2,000 ft",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see Service Facts (model-specific CFM vs. ESP tables in IOM)",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame sensing current",
            "value": "0.75 - 3.0 microamps DC (1 VDC = 1 microamp)",
            "key": "flame_ua"
          },
          {
            "label": "Ignitor type / resistance",
            "value": "120V SiNi (silicon nitride) hot surface ignitor; 37-70 ohms cold resistance at ~75F",
            "key": "ignitor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Limit switch",
            "value": "Main thermal limit - error code E04 \"Open Thermal Limit, Rollout Switch, or Reverse Airflow Switch\"",
            "key": "limit"
          },
          {
            "label": "Rollout switch(es)",
            "value": "Flame rollout switch(es) (FRS), wired in series with main thermal limit - same E04 fault code",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Trane",
    "model": "XR95 / XV95 / XC95m",
    "equip": "Gas Furnace",
    "summary": "Older-generation 95% AFUE \"Fan Assisted Combustion System\" condensing furnace (pre-2012 platform, Trane model prefixes CUB1/CDB1). Still common in the field on 15+ year old installs; White-Rodgers gas valve, hot surface ignition, Category I fan-assisted venting.",
    "match": [
      "XR95",
      "XV95",
      "XC95m",
      "CUB1",
      "CDB1"
    ],
    "source": "Trane/American Standard Installation, Operation, and Maintenance Guide 41-5010-25 (2011) - https://elibrary.tranetechnologies.com/public/trane-history/Literature/Installation/41-5010-25_03012011",
    "flags": [
      {
        "title": "Not for use as a construction heater",
        "body": "IOM warns: low return-air temperatures during finishing phases of construction can cause condensate formation even though this is a non-condensing model, and chlorides/fluorides from paints, adhesives, and cleaning compounds create a corrosive condition that can rapidly deteriorate the heat exchanger."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure - NG",
            "value": "3.5\" W.C. (adjustable min 3.0\" - max 3.7\" W.C.)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure - LP",
            "value": "10.5\" W.C.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure - NG",
            "value": "min 5.0\" - max 13.8\" W.C.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure - LP",
            "value": "min 11.0\" - max 13.8\" W.C.",
            "key": "supply_lp"
          },
          {
            "label": "Main burner orifice (all inputs, 2-7 burners)",
            "value": "NG drill #45, LP drill #56",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers gas valve model 36G or 36J",
            "key": "gas_valve"
          },
          {
            "label": "High altitude derate",
            "value": "Ratings based on sea level, no change needed to 2,000 ft; above 2,000 ft see orifice correction Table 21; High Altitude Kit (BAYHALT***) required above 4,000 ft (pressure switch change)",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see Service Facts (model-specific CFM vs. ESP tables in IOM)",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific CFM vs. temp rise tables in IOM)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame sensing current",
            "value": "not published in this IOM - see rating plate/Service Facts",
            "key": "flame_ua"
          },
          {
            "label": "Ignitor type",
            "value": "Hot surface ignition; warm-up ~17 sec (resistance not published in this IOM)",
            "key": "ignitor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Limit switch",
            "value": "Closes gas valve on overheat; checked by blocking return air until burners shut off at rating-plate max outlet temp - not separately adjustable",
            "key": "limit"
          },
          {
            "label": "Rollout switch(es)",
            "value": "Not called out as a discrete switch in this IOM - see rating plate/Service Facts for this specific model/vintage",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Trane",
    "model": "TUD / AUD (legacy upflow, shared platform with TDD/TUH)",
    "equip": "Gas Furnace",
    "summary": "Legacy 80% AFUE non-condensing, fan-assisted-combustion, induced-draft furnace. Source document covers the upflow *UD chassis (Trane TUD / American Standard AUD, first letter A or T per nameplate); downflow (TDD) and horizontal (TUH) share the same generation gas train per Trane parts commonality but should be confirmed against the unit's own Service Facts/rating plate.",
    "match": [
      "TUD",
      "AUD",
      "TDD",
      "TUH"
    ],
    "source": "Trane/American Standard Installer's Guide 18-CD19D1-2 (Aug 1992, reposted 2011) - https://elibrary.tranetechnologies.com/public/trane-history/Literature/Installation/18-CD19D1-2_08012011",
    "flags": [
      {
        "title": "Flame roll-out fusible link is not resettable",
        "body": "All models are equipped with a fusible link on the burner cover. In case of flame roll-out, the link opens (melts) and cuts the circuit, shutting off all gas flow. Unlike a manual-reset rollout switch, this link must be replaced, not reset, before the furnace can run again."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure - NG (final setting)",
            "value": "3.0\" - 3.5\" W.C.",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure - LP (final setting)",
            "value": "10.0\" - 10.5\" W.C.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure - NG",
            "value": "min 5.0\" - max 10.5\" W.C.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure - LP",
            "value": "min 11.0\" - max 13.0\" W.C.",
            "key": "supply_lp"
          },
          {
            "label": "Main burner orifice (all inputs, 2-7 burners)",
            "value": "NAT GAS drill #44, LP drill #55",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "Automatic gas valve with manual shutoff (brand/model not specified in this IOM - see rating plate)",
            "key": "gas_valve"
          },
          {
            "label": "High altitude derate",
            "value": "Reduce input 4% per 1,000 ft above 2,000 ft; use Table 21 orifice correction; High Altitude Kit required above 4,000 ft (pressure switch change)",
            "key": "altitude"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see Service Facts (model-specific)",
            "key": "max_esp"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate (model-specific)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame sensing current",
            "value": "not published in this IOM - see rating plate/Service Facts",
            "key": "flame_ua"
          },
          {
            "label": "Ignitor type",
            "value": "Hot surface ignition; warm-up ~17 sec (resistance not published in this IOM)",
            "key": "ignitor"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Limit switch",
            "value": "Closes gas valve on overheat, checked by blocking return air until burners shut off at rating-plate max outlet temp",
            "key": "limit"
          },
          {
            "label": "Rollout switch(es)",
            "value": "Fusible link on burner cover (see flag above) - not a resettable switch on this platform",
            "key": "rollout"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Trane",
    "model": "XR17 / 4TWR7 & 4TTR7 (Two-Stage Heat Pump & AC Condenser)",
    "equip": "Condenser/Heat Pump",
    "summary": "Conventional 24V two-stage CLIMATUFF scroll platform (70-100% capacity modulation), non-communicating. TXV-Non-Bleed metering, Comfort \"R\" mode for better dehumidification, internal compressor high/low pressure protection with no published cutout/cutin PSIG. Low ambient cooling rated to 55°F as shipped.",
    "match": [
      "XR17",
      "4TWR7",
      "4TTR7",
      "American Standard 4A7H7 (HP)",
      "4A7A7 (AC)"
    ],
    "source": "Trane Product Data 22-1886-6C-EN, 'Split System Heat Pump XR17 4TWR7, 2-5 Tons' (June 2019); Trane Product Data 22-1942-1B-EN, 'Split System Cooling XR17 4TTR7048B' (May 2019)",
    "flags": [
      {
        "title": "Defrost logic and reversing-valve energized state not published",
        "body": "Unlike the XR14/XR16 literature, the XR17 4TWR7 Product Data sheet (22-1886-6C-EN) does not use the words 'defrost' or 'demand defrost' anywhere, and neither document states whether the reversing (switchover) valve is energized in heating or cooling. Confirm defrost behavior and SOV energized-state from the wiring diagram inside the control box or the unit's Service Facts before servicing."
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
            "value": "TXV - Non-Bleed (per Model Nomenclature, Refrigerant Control code 3)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF 2-stage scroll, 1-2 stages, 70-100% capacity modulation",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve (Heat Pump)",
        "rows": [
          {
            "label": "Defrost type/interval",
            "value": "Not stated in Product Data 22-1886-6C-EN — see rating plate / Service Facts / Installer's Guide",
            "key": "defrostType"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Not stated — see rating plate / wiring diagram in control box",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Pressure Protection & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch",
            "value": "\"Internal compressor high/low pressure & temperature protection\" — no cutout/cutin PSIG published; see rating plate",
            "key": "pressureSwitch"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "55°F as shipped; below 55°F requires Application Guide APP-APG013-EN (see also BAYLOAM103 Low Ambient Kit)",
            "key": "lowAmbientLockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Accessory — BAYCCHT301 (smaller tons) / BAYCCHT302 (larger tons) kit; not standard as shipped",
            "key": "crankcaseHeater"
          }
        ]
      },
      {
        "title": "ComfortLink / Charging",
        "rows": [
          {
            "label": "Communicating status",
            "value": "Conventional 24V staging — not ComfortLink II communicating",
            "key": "controlPlatform"
          },
          {
            "label": "Charge verification",
            "value": "Subcooling method against nameplate design subcooling + R-410A charging chart (standard Trane split-system method); exact target not printed in Product Data excerpt — see rating plate",
            "key": "chargeMethod"
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
    "model": "XR16 / 4TTR6 (Two-Stage AC Condenser)",
    "equip": "Condenser",
    "summary": "Cooling-only companion to the XR16 heat pump platform. CLIMATUFF 2-stage scroll, TXV-Non-Bleed metering, internal compressor high/low pressure protection, low ambient cooling to 55°F as shipped with staged accessory kits for lower ambients.",
    "match": [
      "XR16",
      "4TTR6",
      "American Standard 4A6A6"
    ],
    "source": "Trane Product Data 22-1916-1J-EN, 'Split System Cooling 4TTR6'",
    "flags": [
      {
        "title": "No published HP/LP cutout PSIG — internal to compressor",
        "body": "Like every other XR-series cooling sheet reviewed, 22-1916-1J-EN states only that high/low pressure controls are 'inherent to the compressor' — there is no field-serviceable pressure switch with a printed cutout/cutin PSIG. Do not assume a number; check the rating plate or Service Facts if a specific setpoint is needed for diagnostics."
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
            "value": "TXV - Non-Bleed (per Model Nomenclature, Refrigerant Control code 3)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF 2-stage scroll, 1-2 stages",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Pressure Protection & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch",
            "value": "Internal to compressor — no cutout/cutin PSIG published; see rating plate",
            "key": "pressureSwitch"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "55°F as shipped; see Application Guide APP-APG013-EN for operation below 55°F",
            "key": "lowAmbientLockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Accessory kit (BAYCCHT302 / BAYCCHT301 depending on tonnage) — not standard as shipped",
            "key": "crankcaseHeater"
          }
        ]
      },
      {
        "title": "ComfortLink / Charging",
        "rows": [
          {
            "label": "Communicating status",
            "value": "Conventional 24V staging — not ComfortLink II communicating",
            "key": "controlPlatform"
          },
          {
            "label": "Charge verification",
            "value": "Subcooling method against nameplate design subcooling + R-410A charging chart",
            "key": "chargeMethod"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Trane",
    "model": "XR15 / 4TWR5 (Single-Stage Heat Pump)",
    "equip": "Heat Pump",
    "summary": "Single-stage CLIMATUFF scroll heat pump, non-communicating. Metering device is model-dependent (TXV/EEV on some tonnages, fixed orifice on others) — the Product Data explicitly instructs verifying charge method (subcooling vs. superheat) per unit nameplate. Built-in demand defrost control is standard (accessory 'Evaporator Defrost Control' column reads N/A because it's not needed).",
    "match": [
      "XR15",
      "4TWR5",
      "American Standard 4A7H5",
      "XB14 (builder-tier furnace/air-handler pairing name — NOT a separate outdoor condensing model; XB14 systems use the same 4TWR5/4TTR5 outdoor units)"
    ],
    "source": "Trane Product Data 22-1832-14J-EN, 'Split System Heat Pump 4TWR5-H' (August 2020)",
    "flags": [
      {
        "title": "Metering device is not fixed across the model line — always check the nameplate",
        "body": "22-1832-14J-EN tells the tech to 'verify proper system charge via subcooling (TXV/EEV) or superheat (fixed orifice) per the unit nameplate' — meaning some 4TWR5 tonnages ship with fixed-orifice metering and require the superheat charging method instead of subcooling. Do not default to a TXV/subcooling assumption on this model line."
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
            "value": "Model-dependent: TXV/EEV or fixed orifice — confirm on nameplate before choosing subcooling vs. superheat charge method",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF single-stage scroll",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve",
        "rows": [
          {
            "label": "Defrost type/interval",
            "value": "Built-in demand defrost control standard (accessory 'Evaporator Defrost Control' listed N/A — not required); exact delta-T/interval logic not printed in this Product Data — see Service Facts",
            "key": "defrostType"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Not stated — see rating plate / wiring diagram",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Pressure Protection & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch",
            "value": "Not detailed in this excerpt — see rating plate / Service Facts",
            "key": "pressureSwitch"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "Not stated in this compact Product Data format — see rating plate / Application Guide APP-APG013-EN",
            "key": "lowAmbientLockout"
          },
          {
            "label": "Crankcase heater",
            "value": "Accessory kit BAYCCHT302 — not standard as shipped",
            "key": "crankcaseHeater"
          }
        ]
      },
      {
        "title": "ComfortLink / Charging",
        "rows": [
          {
            "label": "Communicating status",
            "value": "Conventional 24V staging — not ComfortLink II communicating",
            "key": "controlPlatform"
          },
          {
            "label": "Charge verification",
            "value": "Subcooling (TXV/EEV models) or superheat (fixed-orifice models) per nameplate — do not assume one method for the whole line",
            "key": "chargeMethod"
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
    "model": "XR13 / XR14 — 4TWR3 / 4TWR4 & 4TTR3 / 4TTR4 (Older Single-Stage HP & AC)",
    "equip": "Condenser/Heat Pump",
    "summary": "Older single-stage CLIMATUFF scroll tier, R-410A, non-communicating. XR14 heat pump (4TWR4) carries 'Demand Defrost with Diagnostics' as a stated feature and model/tonnage-dependent factory Compressor Sump Heat. XR14/XR13 AC condensers (4TTR4/4TTR3) use an SPST 'Evaporator Defrost Control' accessory purely for low-ambient cooling protection (not heat-pump defrost).",
    "match": [
      "XR14",
      "XR13",
      "4TWR4",
      "4TWR3",
      "4TTR4",
      "4TTR3",
      "American Standard 4A6H4/4A6H3 (HP)",
      "4A6A4/4A6A3 (AC)"
    ],
    "source": "Trane Product Data 22-1765-10, 'Split System Heat Pump XR14 4TWR4, 1½-5 Tons' (©2015 Trane); Trane Product Data 22-1904-1M-EN, 'Split System Cooling 4TTR4-L Models' (April 2020); Trane Product Data 22-1842-8R-EN, 'Split System Cooling XR13 4TTR3'",
    "flags": [
      {
        "title": "Compressor Sump Heat (crankcase heater) is model/tonnage-dependent — never assume it's standard",
        "body": "The XR14 heat pump electrical table shows 'Compressor Sump Heat' as YES on some tonnage columns and NO on others (not a blanket standard feature) — confirm per the specific model number's electrical data row or the nameplate before assuming crankcase heat is present. XR13 heat pump (4TWR3) specifics were not independently pulled this session — treat as same-generation platform to XR14 but verify defrost/reversing-valve/PSIG details from its own nameplate or Service Facts."
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
            "value": "TXV - Non-Bleed (per Model Nomenclature, Refrigerant Control code 3)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF single-stage scroll",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve (Heat Pump — XR14 4TWR4 confirmed)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand Defrost with Diagnostics (stated feature, 4TWR4); exact delta-T logic/interval not printed in Product Data — see Service Facts",
            "key": "defrostType"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Not stated — see rating plate / wiring diagram",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Pressure Protection & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch",
            "value": "High pressure switch present; \"internal compressor high/low pressure & temperature protection\" — no cutout/cutin PSIG published; see rating plate",
            "key": "pressureSwitch"
          },
          {
            "label": "Low ambient cooling (HP, as shipped)",
            "value": "55°F as shipped; 20°F with AY28X084 accessory (evaporator defrost control) added",
            "key": "lowAmbientCoolingHP"
          },
          {
            "label": "Low ambient cooling (AC, 4TTR4/4TTR3)",
            "value": "55°F as shipped → 40°F with evaporator defrost control accessory → 30°F with evaporator defrost control + TXV → 20°F with BAYLOAM107A low ambient kit",
            "key": "lowAmbientCoolingAC"
          },
          {
            "label": "Crankcase heater",
            "value": "Model/tonnage-dependent — YES on some 4TWR4 electrical-table columns, NO on others; accessory kit (BAYCCHT301/302) on units where not factory-installed",
            "key": "crankcaseHeater"
          }
        ]
      },
      {
        "title": "ComfortLink / Charging",
        "rows": [
          {
            "label": "Communicating status",
            "value": "Conventional 24V staging — not ComfortLink II communicating",
            "key": "controlPlatform"
          },
          {
            "label": "Charge verification",
            "value": "Subcooling method against nameplate design subcooling + R-410A charging chart",
            "key": "chargeMethod"
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
    "model": "XL18i / XL16i — 4TWX8 & 4TTX8 (Two-Stage HP & AC, older premium tier)",
    "equip": "Condenser/Heat Pump",
    "summary": "Two-stage CLIMATUFF scroll platform (predecessor to XR17), non-communicating 24V, WEATHERGUARD II top shields. AC condenser (4TTX8) uses TXV-Non-Bleed metering with internal compressor pressure protection. Heat pump (4TWX8, confirmed on the 060/5-ton via Service Facts) uses a demand-defrost board with outdoor-ambient + coil sensors and delta-T logic — the same board family later reused on XR16 (47°F termination as shipped, 70°F if Jumper J2 is cut below 30°F ambient).",
    "match": [
      "XL18i",
      "XL16i",
      "4TWX8",
      "4TTX8",
      "American Standard 4A7X8 (HP)",
      "4A7X8 (AC, cooling variant)"
    ],
    "source": "Trane Product Data 22-1885-2E-EN, 'Product Data 4TTX8024A/036A/048B/060A' (October 2020); Trane Service Facts 4TWX8060A-SF-1E-EN, 'Split System Heat Pump 4TWX8060A1000C'",
    "flags": [
      {
        "title": "Heat pump defrost/board details confirmed only on the 5-ton (060) model",
        "body": "The Demand Defrost details (delta-T logic, 47°F/70°F termination, Jumper J2) come from the Service Facts for the specific 4TWX8060A1000C (5-ton) unit. Other 4TWX8 tonnages are assumed to share the same board family but were not independently confirmed this session — verify against the Service Facts shipped with the specific unit. XL16i-specific literature was not pulled; treat as a related earlier-generation two-stage sibling and confirm specifics from its own nameplate/Service Facts."
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
            "value": "AC (4TTX8): TXV - Non-Bleed. HP (4TWX8, per Service Facts): outdoor EEV control board present (fault codes reference EEV/superheat/pressure-transducer faults) — confirm exact metering configuration on nameplate",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "CLIMATUFF 2-stage scroll, 1-2 stages",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost / Reversing Valve (Heat Pump)",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand defrost: outdoor ambient sensor + outdoor coil sensor, delta-T logic determines need for defrost; coil sensor also terminates the cycle",
            "key": "defrostType"
          },
          {
            "label": "Defrost termination — as shipped",
            "value": ">22°F ambient: 47°F | 10-22°F: ODT + 25°F (per table)",
            "key": "defrostTermAsShipped"
          },
          {
            "label": "Defrost termination — Jumper J2 cut",
            "value": "70°F termination when ambient is at or below 30°F",
            "key": "defrostTermJumperCut"
          },
          {
            "label": "Forced defrost test",
            "value": "Short TEST_COMMON to FRC_DFT pin for 2 seconds to initiate a forced defrost",
            "key": "forcedDefrost"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "Not stated in the Service Facts excerpt reviewed — see wiring diagram in control box",
            "key": "reversingValve"
          }
        ]
      },
      {
        "title": "Pressure Protection & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch",
            "value": "No cutout/cutin PSIG published; unit uses a suction-line pressure transducer (EEV control board) for diagnostics, not a simple switch with a fixed setpoint — see Service Facts pressure curves for expected PSIG by operating condition",
            "key": "pressureSwitch"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "55°F as shipped (AC, per 22-1885-2E-EN); see Application Guide APP-APG013-EN for lower",
            "key": "lowAmbientLockout"
          },
          {
            "label": "Crankcase heater",
            "value": "AC: accessory kit (BAYECMT023 / BAYCAKT001 depending on tonnage) — not standard. HP (060 model): 'Compressor Heat' row present in Service Facts electrical table but value not legible in the copy reviewed — see rating plate",
            "key": "crankcaseHeater"
          }
        ]
      },
      {
        "title": "ComfortLink / Charging",
        "rows": [
          {
            "label": "Communicating status",
            "value": "Conventional 24V staging — not ComfortLink II communicating",
            "key": "controlPlatform"
          },
          {
            "label": "Charge — cooling, 55-120°F OD ambient",
            "value": "Subcooling method (high stage only), target 10-15°F subcooling; use R-410A Refrigerant Charging Chart (liquid line temp vs. PSIG) in Service Facts",
            "key": "chargeCooling"
          },
          {
            "label": "Charge — below 55°F OD ambient",
            "value": "Weigh in nameplate charge plus line-length adders in heating mode; do NOT use the cooling subcooling method below 55°F",
            "key": "chargeBelow55"
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
    "model": "XV20i / 4TTV0 (Variable-Speed ComfortLink II AC Condenser)",
    "equip": "Condenser",
    "summary": "Cooling-only companion to the already-covered XV20i/4TWV0 variable-speed heat pump. Same Integrated Variable Speed Control (IVSC) board + Communicating Display Assembly (CDA) platform, EEV metering, ComfortLink II communicating control. Charging is via the 'Charging Mode-Cooling' subcooling test ONLY, with the indoor blower mandatorily set to 400 CFM/ton.",
    "match": [
      "XV20i",
      "4TTV0",
      "TTV0",
      "American Standard 4A7V0",
      "A7V0"
    ],
    "source": "Trane Installer's Guide 18-BC89D1-1H-EN, 'Variable Speed ComfortLink II Heat Pumps and Air Conditioners' (models incl. 4TTV0024/036B/048/060/061A1000B), June 2018 — same document already used for the companion XV20i/4TWV0 heat pump entry",
    "flags": [
      {
        "title": "High/low pressure cutout PSIG and other HP-only rows do not apply / are not published for this AC",
        "body": "This Installer's Guide states only 'internal compressor high/low pressure & temperature protection' for the platform — no numeric cutout/cutin PSIG values are given for the 4TTV0 AC any more than for its 4TWV0 heat pump sibling. See rating plate or the unit's Service Facts (shipped inside the outdoor unit control box) for actual setpoints. Defrost rows are not applicable — this is a cooling-only condenser."
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
        "title": "Operating Range & Pressure Protection",
        "rows": [
          {
            "label": "Cooling operating range",
            "value": "55°F to 120°F outdoor ambient",
            "key": "coolingRange"
          },
          {
            "label": "Low ambient cooling lockout",
            "value": "55°F (per Table 1 Operating Range)",
            "key": "lowAmbientLockout"
          },
          {
            "label": "High/low pressure switch",
            "value": "Internal compressor high/low pressure & temperature protection — no cutout/cutin PSIG published; see rating plate / Service Facts",
            "key": "pressureSwitch"
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
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Approved subcooling method",
            "value": "'Charging Mode-Cooling' test in comfort control Technician Menu ONLY — outdoor 55-120°F, indoor 70-80°F, indoor blower at 400 CFM/ton (mandatory)",
            "key": "chargingMethod"
          },
          {
            "label": "Design subcooling value",
            "value": "See rating plate or Service Facts (not a fixed figure in this guide) — used with the R-410A charging chart, 8-14°F subcooling columns, 55-125°F liquid temp rows",
            "key": "designSubcooling"
          },
          {
            "label": "Line length/lift limits",
            "value": "150 ft max length / 50 ft max lift on 5/8\"-7/8\" lines; larger 1-1/8\" vapor line models limited to 80 ft length / 10-25 ft lift depending on model",
            "key": "lineLimits"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Trane",
    "model": "TAM7 / 4TEC3",
    "equip": "Air Handler",
    "summary": "Convertible variable-speed communicating air handler (2-5 ton) with an Airflow Control (AFC) board driving an ECM blower, electronic expansion valve (EEV) metering, and dip-switch commissioning for tonnage/airflow. Cabinet accepts an optional hot-water (hydronic) coil accessory in place of electric heat.",
    "match": [
      "TAM7",
      "4TEC3",
      "TAM7A0A24H21SD",
      "TAM7A0A24H21EA",
      "TAM7A0B30H21SD",
      "TAM7A0B30H21EA",
      "TAM7A0C36H31SD",
      "TAM7A0C36H31EA",
      "TAM7A0C42H31SD",
      "TAM7A0C42H31EA",
      "TAM7A0C48H41SD",
      "TAM7A0C48H41EA",
      "TAM7B0C60H51SC",
      "TAM7B0C60H51EA"
    ],
    "source": "Trane Installer's Guide, Convertible Air Handlers 2-5 Ton TAM7, pub. 18-GJ06D2-2F-EN (trane.com/content/dam/.../Small Splits/Air Handlers/18-GJ06D2-2F-EN.pdf); hydronic coil accessory per Trane Installer's Guide, Hydronic Coil Accessory (Fits Hyperion/ForeFront air handlers), pub. 18-GJ21D1-2A-EN (elibrary.tranetechnologies.com/public/trane-history/Literature/Installation/18-GJ21D1-2A-EN_08052020.pdf)",
    "flags": [
      {
        "title": "Trane: dip switches must be set with power OFF",
        "body": "S1/S2 airflow-control (AFC) dip switches (tonnage/OD-multiplier, AC vs HP, stages, compressors, CFM/ton, blower-off delay, Torque vs Constant-CFM mode) only take effect after power is cycled off and re-applied. Changing switches with power on will not update the AFC."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower type",
            "value": "Variable-speed ECM, direct drive, controlled by the Airflow Control (AFC) board",
            "key": "blowerType"
          },
          {
            "label": "Airflow commissioning",
            "value": "Dip switch S1: OD tonnage multiplier (S1-1/S1-2), AC/HP (S1-3), OD stages (S1-4), # compressors (S1-5). Dip switch S2: cooling & heating CFM/ton (S2-1/S2-2), blower-off delay (S2-3/S2-4), Torque vs Constant-CFM airflow mode (S2-5)",
            "key": "airflowSetup"
          },
          {
            "label": "Torque mode static threshold",
            "value": "Torque mode starts reducing airflow above approx. 0.3\" w.c. (2-ton), 0.35\" w.c. (2.5-3.5 ton), 0.4\" w.c. (4-5 ton) static; cooling only, all heating modes default to Constant CFM",
            "key": "torqueThreshold"
          },
          {
            "label": "Max external static",
            "value": "See airflow performance tables for the specific model / rating plate (varies by tonnage and speed-tap/torque setting)",
            "key": "maxESP"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Electronic Expansion Valve (EEV) on the Electronic Expansion Valve Control (EVC) board, field-selectable R-410A/R-22 via J7 jumper (factory default R-410A)",
            "key": "metering"
          },
          {
            "label": "Match to outdoor unit",
            "value": "EEV is electronically controlled (not a fixed TXV) - confirm compatibility/charge per the matched outdoor unit's System Charge Adjustments (subcooling) table",
            "key": "meteringMatch"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "Integral filter channel at bottom of blower/filter compartment (no remote filter required); size set by cabinet letter (A=16x20, B=20x20, C=22x20, 1\" throwaway), per 7th digit of model number",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat / Hydronic Heat",
        "rows": [
          {
            "label": "Electric heat kits",
            "value": "Field-installed BAYHTR-series kW heater kits (wiring diagrams ship with the heater); see heater kit literature or rating plate for exact kW/staging by model",
            "key": "heatKit"
          },
          {
            "label": "Hydronic (hot water) coil option",
            "value": "Optional BAYWAxx/BAYWVxx hydronic coil accessory (pub. 18-GJ21D1-2A-EN) slides into the heater compartment in place of electric heat; 7/8\" OD x 3/4\" ID copper field water piping, max entering water temp 180F, two vertical or two horizontal pipe runs (entering-water pipe always farthest from blower); usable upflow, downflow, or horizontal",
            "key": "hydronicCoil"
          }
        ]
      },
      {
        "title": "Drain / Condensate",
        "rows": [
          {
            "label": "Drain pan/trap",
            "value": "Factory condensate connections; Trane states a P-trap is NOT required for drainage because the cabinet runs at positive pressure, but a trap is still recommended to prevent conditioned-air loss/efficiency loss. No factory float switch documented - see rating plate/accessory kit for float-switch option",
            "key": "drainPan"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Trane",
    "model": "TEM4 / 4TEM4 (incl. TEM8 platform)",
    "equip": "Air Handler",
    "summary": "Convertible multi-speed air handler (1.5-5 ton) sharing the same painted-steel cabinet, drain-pan, and heater-kit platform as TEM6/TEM8. Smaller tonnages use a multi-speed PSC/direct-drive blower; larger tonnages (and the higher-tier TEM8 communicating variant) use a constant-torque (basic ECM) motor. Factory bleed TXV metering; remote/external filter required.",
    "match": [
      "TEM4",
      "4TEM4",
      "TEM8",
      "TEM4A0B18S21SA",
      "TEM4A0B30S31SA",
      "TEM4A0C48S41SA",
      "TEM4A0C60S51SA"
    ],
    "source": "Trane Installer's Guide, Convertible Air Handlers 1-1/2-5 Ton TEM4, pub. 18-GF73D1-1C-EN (trane.com/content/dam/.../Small Splits/Air Handlers/18-GF73D1-1C-EN.pdf)",
    "flags": [
      {
        "title": "Trane: disconnect power before changing blower speed taps",
        "body": "Unit ships with factory-set cooling and heating speed taps (High/Med/Low). Always disconnect all power before moving a motor speed tap, then verify airflow and evaporator coil temperature drop after any change."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower type",
            "value": "Multi-speed, direct-drive blower - PSC on most models, constant-torque motor (basic ECM) on larger tonnages / TEM8 platform; confirm on rating plate",
            "key": "blowerType"
          },
          {
            "label": "Airflow setup",
            "value": "Factory-set High/Med/Low speed taps for cooling and heating (field-selectable at the motor plug); airflow performance tables give CFM at 0.1-0.7\" w.c. external static for 230V and 208V taps",
            "key": "airflowSetup"
          },
          {
            "label": "Max external static (tested)",
            "value": "Airflow tables published through 0.7\" w.c. external static (e.g., TEM4A0B30S31SA: High tap 1066 CFM @ 0.7\" w.c., 230V); downflow airflow must not exceed 1200 CFM due to condensate blow-off",
            "key": "maxESP"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed, internally-checked bleed TXV (R-410A) for AC or heat pump duty; pressures equalize after shutdown. Some outdoor units may require a start-assist kit - verify against the matched condensing unit",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "No integral filter rack - a remote/external filter must be field-installed ahead of the coil; optional Slim Fit Filter Box Kit accessories BAYSF1185AAA / BAYSF1235AAA",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heater kW range",
            "value": "4, 5, 8, 10, 15, 19, 20, 21 kW single-phase (BAYHTR15xx series); 10 & 15 kW three-phase (BAYHTR35xx, lug terminal); single-point power entry kit for 15/19/20/21 kW heaters",
            "key": "heatKit"
          },
          {
            "label": "Downflow heat requirement",
            "value": "Downflow condensate management kit BAYTEMDFKT1A required for 5-ton downflow applications; downflow sub-base kits TAYBASE185/TAYBASE235 available",
            "key": "downflowKit"
          }
        ]
      },
      {
        "title": "Drain / Condensate",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Factory-installed sturdy polycarbonate drain pan, shipped configured for upflow/horizontal-left; primary + auxiliary condensate connections are 3/4\" NPT. Primary drain must be trapped outside the unit and pitched 1/4\"/ft minimum. No factory float switch documented",
            "key": "drainPan"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Trane",
    "model": "GAM5",
    "equip": "Air Handler",
    "summary": "Modular multipoise convertible air handler with a Vortica direct-drive blower on a high-efficiency ECM motor (5 speed taps), factory R-410A TXV metering, and a molded 1\" integral filter rail (filter not furnished). Two-piece modular cabinet with integrated horizontal drain pans and a safety door switch.",
    "match": [
      "GAM5",
      "GAM5B0A18M11SB",
      "GAM5B0A24M21SB",
      "GAM5B0B30M21SB",
      "GAM5B0B36M31SB",
      "GAM5B0C42M31SB",
      "GAM5B0C48M41SB",
      "GAM5B0C60M51SB"
    ],
    "source": "Trane Product Data, Modular Multi-position Air Handlers GAM5B Models, pub. 22-1845-14 (trane.com/content/dam/.../Small Splits/Air Handlers/GAM5.pdf)",
    "flags": [
      {
        "title": "Trane: airflow speed-tap change required for 2-stage",
        "body": "On 2-stage AC/HP matches, the factory speed tap must be reset per the 2-Stage Airflow Adjustment tables (High tap for stage 2, Low tap for stage 1) - the unit does not auto-adjust airflow between stages."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower type",
            "value": "Vortica centrifugal blower, direct drive, High-Efficiency ECM motor, 5 speed taps, soft-start operation with built-in fan-delay modes",
            "key": "blowerType"
          },
          {
            "label": "Airflow setup",
            "value": "Field-selectable speed taps (low-voltage pigtail connections); 2-stage AC/HP applications require resetting the tap per the published High/Low CFM & ESP tables for the matched outdoor unit (e.g., GAM5B0C48M41 with 4TTR7048A: High tap 1475 CFM @ 0.449\" w.c., Low tap 1390 CFM @ 0.399\" w.c.)",
            "key": "airflowSetup"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory R-410A thermal expansion valve (TXV); R-22 conversion TXV kit sold as accessory",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "Not furnished - molded 1\" throwaway filter rail integral to cabinet; recommended size 1x throwaway per model (16x20 up to 22x20 depending on cabinet width) - see General Data table for the specific model",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Electric heat kits",
            "value": "Slide-in electric heaters sold as accessory with polarized plug connections; see the GAM5 air handler/heater allowable-combinations matrix or rating plate for exact kW-to-model pairing",
            "key": "heatKit"
          }
        ]
      },
      {
        "title": "Drain / Condensate",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Integrated horizontal drain pans (both orientations), 3/4\" NPT drain connection; safety door switch cuts power when a cabinet door is opened. No factory condensate float switch documented - see rating plate/accessory options",
            "key": "drainPan"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Trane",
    "model": "TEM3 / TWE",
    "equip": "Air Handler",
    "summary": "Standard-efficiency convertible air handler (1.5-5 ton) with a multi-speed direct-drive PSC blower (constant-torque motor optional per rating plate) and factory bleed TXV metering. Same cabinet/heater-kit template as TEM4/TEM6/TEM8; requires a remote/external filter.",
    "match": [
      "TEM3",
      "TWE",
      "ATEM3",
      "TEM3A0B18S21SA",
      "TEM3A0B30S21SA",
      "TEM3A0B30S31SA",
      "TEM3A0C36S31SA",
      "TEM3A0C48S41SA",
      "TEM3A0C60S51SA"
    ],
    "source": "Trane Installer's Guide, Convertible Air Handlers 1-1/2 to 5 Ton TEM3 Models, pub. 18-GJ65D1-1D-EN (trane.com/content/dam/.../Small Splits/Air Handlers/18-GJ65D1-1D-EN.pdf)",
    "flags": [
      {
        "title": "Trane: model-number nomenclature caveat",
        "body": "This Trane installer's guide documents the TEM3 (and American Standard ATEM3) family only; a distinct 'TWE-E' PSC single-phase air handler line (1.5-5 ton) is referenced in Trane product handbooks but was not independently confirmed in an elibrary.tranetechnologies.com or trane.com/content/dam document during this research. Confirm the exact TWE model's specs against its own rating plate before servicing."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow Setup",
        "rows": [
          {
            "label": "Blower type",
            "value": "Multi-speed, direct-drive blower; PSC standard, constant-torque motor version also referenced in sequence-of-operation - confirm on rating plate",
            "key": "blowerType"
          },
          {
            "label": "Airflow setup",
            "value": "Factory-set High/Med/Low speed taps (field-adjustable at the motor plug, power off); airflow tables published 0.1-0.7\" w.c. external static for 230V/208V taps",
            "key": "airflowSetup"
          },
          {
            "label": "Max external static (tested)",
            "value": "Airflow tables published through 0.7\" w.c. (e.g., TEM3A0B30S31SA/TEM3A0B36S31SA: High tap 1066/997 CFM @ 0.7\" w.c., 230V); downflow airflow must not exceed 1200 CFM due to condensate blow-off; TEM3A0B36S31SA recommended tap is Medium at 0.4\" w.c.",
            "key": "maxESP"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed, internally-checked bleed TXV (R-410A) for AC or heat pump duty; pressures equalize after shutdown - some outdoor units may need a start-assist kit",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "No integral filter rack - remote/external filter must be field-installed; optional Slim Fit Filter Box Kit BAYSF1185AAA / BAYSF1235AAA",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heater kW range",
            "value": "4, 5, 8, 10, 15, 19, 20 kW single-phase (BAYHTR15xx series); 10 & 15 kW three-phase lug-terminal heaters (BAYHTR35xx); single-point power entry kit for 15/19/20 kW heaters",
            "key": "heatKit"
          }
        ]
      },
      {
        "title": "Drain / Condensate",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Factory-installed polycarbonate drain pan shipped for upflow/horizontal-left; primary + auxiliary condensate 3/4\" NPT, primary trapped outside the unit, 1/4\"/ft minimum pitch. No factory float switch documented",
            "key": "drainPan"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "York",
    "model": "TM9V / TM9E / TM9M",
    "equip": "Gas Furnace",
    "summary": "95-96% AFUE ECM condensing platform: TM9V (2-stage variable-speed ECM), TM9E (single-stage standard ECM), TM9M (modulating). Same cabinet/heat-exchanger family, sold under the same model numbers across York and Fraser-Johnston nameplates (confirmed on york.com for TM8E/this platform); no distinct Coleman/Luxaire prefix could be verified in yorknow.com literature within this pass.",
    "match": [
      "TM9V",
      "TM9V*C",
      "TM9E",
      "TM9E*MP",
      "TM9M",
      "TM9M*MP"
    ],
    "source": "yorknow.com TM9V_Install.pdf (5402851-UIM-A-0917); yorknow.com tm9etech.pdf; yorknow.com tm9e_installguide.pdf / tm9v_installguide.pdf",
    "flags": [
      {
        "title": "Two-stage: set high fire before low fire",
        "body": "TM9V install manual: high-fire manifold pressure MUST be set/verified before adjusting low-fire pressure — low fire is a percentage of the high-fire tap."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board / control",
            "value": "York integrated furnace control (IFC), LED self-diagnostics",
            "key": "board"
          },
          {
            "label": "Flame-sense µA (normal/warning/lockout)",
            "value": "see rating plate — not published in TM9V/TM9E install literature reviewed",
            "key": "flame_ua"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure — NG (TM9V high/low fire)",
            "value": "3.5 in. w.c. high fire / 1.7 in. w.c. low fire (0-7,999 ft, 800-900 Btu/cu ft gas) — Table 5/6",
            "key": "manifold_ng_tm9v"
          },
          {
            "label": "Manifold pressure — LP (TM9V high/low fire)",
            "value": "9.8 in. w.c. high fire / 4.1 in. w.c. low fire (sea level)",
            "key": "manifold_lp_tm9v"
          },
          {
            "label": "Manifold pressure — NG (TM9E single-stage, nominal)",
            "value": "3.5 in. w.c. (0-7,999 ft) — Table 4",
            "key": "manifold_ng_tm9e"
          },
          {
            "label": "Manifold pressure — LP (TM9E)",
            "value": "9.8 in. w.c. (sea level-7,999 ft)",
            "key": "manifold_lp_tm9e"
          },
          {
            "label": "Modulating (TM9M) range + lock procedure",
            "value": "see rating plate / unit-specific commissioning sheet — modulating range and low-fire lockout procedure not found in literature reviewed",
            "key": "manifold_mod_tm9m"
          },
          {
            "label": "Supply pressure — NG/LP",
            "value": "Max downstream to gas valve 0.5 psig (14 in. w.c.); full min/max supply table not located — see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "see rating plate — manual states \"do not attempt to drill out any orifices\"",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "see rating plate — model/manufacturer not published in literature reviewed",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate (\"within the allowable range as specified on the furnace rating plate\")",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "30-65°F depending on model/tap (TM9V Table 7: 35-65°F; TM9E Table 5 varies by model)",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor type/ohms",
            "value": "Hot surface ignition (type per literature); resistance in ohms not published — see rating plate",
            "key": "ignitor"
          },
          {
            "label": "Limit switch (TM9E, per parts list)",
            "value": "250°F manual-reset limit switch",
            "key": "limit_switch"
          },
          {
            "label": "Rollout/limit fault code",
            "value": "5 RED FLASHES = limit circuit open (TM9V diagnostics)",
            "key": "rollout_limit_code"
          },
          {
            "label": "Altitude derate",
            "value": "see rating plate — not tabulated in literature reviewed for this platform",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "York",
    "model": "TG9S",
    "equip": "Gas Furnace",
    "summary": "95.5% AFUE single-stage PSC multi-position condensing furnace. Same platform sold as Coleman-network GG9S (confirmed by combined manual title \"TG9S-GG9S\").",
    "match": [
      "TG9S",
      "TG9S*MP",
      "GG9S"
    ],
    "source": "yorknow.com TG9S_Install.pdf (JCI doc 1083287-UIM-H-0817)",
    "flags": [
      {
        "title": "Verify altitude table before setting manifold pressure",
        "body": "Nominal NG manifold pressure varies 2.4-3.5 in. w.c. by altitude/gas heating value — confirm the correct column for the install altitude before final adjustment, not just sea-level spec."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board / control",
            "value": "York integrated furnace control (IFC), LED self-diagnostics",
            "key": "board"
          },
          {
            "label": "Flame-sense µA — normal",
            "value": "~3.7 µA DC typical",
            "key": "flame_ua_normal"
          },
          {
            "label": "Flame-sense µA — warning",
            "value": "Continuous amber flash below 1.5 µA — clean/inspect flame sensor",
            "key": "flame_ua_warning"
          },
          {
            "label": "Flame-sense µA — lockout",
            "value": "see rating plate — exact lockout threshold not confirmed from yorknow.com excerpt reviewed",
            "key": "flame_ua_lockout"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure — NG",
            "value": "2.4-3.5 in. w.c. (varies by altitude/gas Btu content, see rating plate for exact column)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure — LP",
            "value": "9.8 in. w.c. (sea level)",
            "key": "manifold_lp"
          },
          {
            "label": "Supply pressure — NG/LP",
            "value": "Max downstream to gas valve 0.5 psig (14 in. w.c.); full min/max table — see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "Sized for 1030 Btu/ft³ natural gas heating value; specific drill number — see rating plate",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "see rating plate — model/manufacturer not published in literature reviewed",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "30-60°F (smallest models) up to 45-75°F (130 MBH models) — model-specific table",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor type/ohms",
            "value": "Hot surface ignition; resistance in ohms not published — see rating plate",
            "key": "ignitor"
          },
          {
            "label": "Rollout switch fault code",
            "value": "5 RED FLASHES = rollout/limit circuit fault",
            "key": "rollout_code"
          },
          {
            "label": "Main limit switch fault code",
            "value": "4 RED FLASHES = main limit switch fault",
            "key": "limit_code"
          },
          {
            "label": "Altitude derate",
            "value": "Manifold pressure table adjusts above 5,000 ft (Table 5) — see rating plate for exact percentage",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "York",
    "model": "TG8S",
    "equip": "Gas Furnace",
    "summary": "80% AFUE single-stage PSC multi-position furnace, non-condensing. Confirmed twin standard/low-NOx variant TGLS.",
    "match": [
      "TG8S",
      "TG8S*MP",
      "TGLS",
      "TGLS*MP"
    ],
    "source": "yorknow.com TG8S_Install.pdf (JCI doc 998491-UIM-C-0616)",
    "flags": [
      {
        "title": "Confirm LP supply pressure floor before firing",
        "body": "Manual publishes a hard LP minimum supply of 8.0 in. w.c. (vs. 4.5 in. w.c. for NG) — a marginal LP regulator that would pass on natural gas can starve this furnace and cause nuisance ignition lockouts."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board / control",
            "value": "York integrated furnace control (IFC), LED self-diagnostics",
            "key": "board"
          },
          {
            "label": "Flame-sense µA thresholds",
            "value": "see rating plate — not published in TG8S install manual reviewed",
            "key": "flame_ua"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure — NG",
            "value": "3.5 in. w.c.",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure — LP",
            "value": "10.0 in. w.c.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply pressure — NG (min/max)",
            "value": "4.5 in. w.c. minimum / 10.5 in. w.c. maximum",
            "key": "supply_ng"
          },
          {
            "label": "Supply pressure — LP (min/max)",
            "value": "8.0 in. w.c. minimum / 13.0 in. w.c. maximum",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "see rating plate — drill size not published in excerpt reviewed",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "see rating plate — model/manufacturer not published in literature reviewed",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "25-55°F (smallest models) up to 40-70°F (largest models) — model-specific, Table 6",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor type/ohms",
            "value": "Hot surface ignition; resistance in ohms not published — see rating plate",
            "key": "ignitor"
          },
          {
            "label": "Rollout/limit switch",
            "value": "see rating plate — temperature ratings not published in excerpt reviewed",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Manifold pressure adjustment referenced above 5,000 ft (Table 5) — see rating plate for exact value",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "York",
    "model": "TM8E",
    "equip": "Gas Furnace",
    "summary": "80% AFUE single-stage ECM multi-position furnace (standard and Ultra-Low NOx TMLE variant). Same model number sold under the Fraser-Johnston nameplate per york.com product pages.",
    "match": [
      "TM8E",
      "TM8E*MP",
      "TMLE",
      "TMLE*MP"
    ],
    "source": "yorknow.com technical guide (JCI doc 5597956-YTG-C-1219)",
    "flags": [
      {
        "title": "Low-NOx TMLE variant may need altitude kit sooner",
        "body": "Tech guide flags separate altitude kits (S1-1PS3301 / S1-1PS3302) required above 5,000 ft — confirm the correct kit p/n for standard TM8E vs. low-NOx TMLE before ordering."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board / control",
            "value": "York integrated furnace control (IFC), LED self-diagnostics (per shared platform)",
            "key": "board"
          },
          {
            "label": "Flame-sense µA thresholds",
            "value": "see rating plate — not published in TM8E technical guide reviewed",
            "key": "flame_ua"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure — NG/LP",
            "value": "see rating plate — not published in technical guide reviewed (install manual not located on yorknow.com in this pass)",
            "key": "manifold"
          },
          {
            "label": "Supply pressure — NG/LP",
            "value": "see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "see rating plate",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "see rating plate",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.8 in. H₂O (from blower performance tables)",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "20-50°F (40 MBH model) up to 40-70°F (largest models) — model-specific table",
            "key": "temp_rise"
          },
          {
            "label": "Max outlet air temperature",
            "value": "190°F (all models)",
            "key": "max_outlet_temp"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor type/ohms",
            "value": "see rating plate — not published in technical guide reviewed",
            "key": "ignitor"
          },
          {
            "label": "Rollout/limit switch",
            "value": "see rating plate — not published in technical guide reviewed",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Altitude kit required above 5,000 ft (S1-1PS3301 std / S1-1PS3302 low-NOx); exact derate % — see rating plate",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "York",
    "model": "GY9S / GF9S / GM9S (legacy Stellar/Latitude platform, incl. Affinity PS9)",
    "equip": "Gas Furnace",
    "summary": "Legacy 90%+ single-stage condensing \"Stellar/Latitude\" tubular heat-exchanger platform (superseded by TG9S). GY9S=York, GF9S=Fraser-Johnston, GM9S=Coleman-network nameplate per upgnet.com archive folder structure; PS9 is the Affinity-branded version of the same generation. LED flash codes for this platform are already covered elsewhere — this entry is MAINT figures only.",
    "match": [
      "GY9S",
      "GF9S",
      "GM9S",
      "PS9"
    ],
    "source": "upgnet.com Source1 archive — York Affinity PS9 Technical Guide (doc 036-21578-002-b-0205)",
    "flags": [
      {
        "title": "Confirm capacity derate before altitude conversion",
        "body": "PS9 tech guide: reduce input capacity 4% for each 1,000 ft above 2,000 ft elevation — recompute BTU input before selecting a high-altitude orifice/pressure-switch kit on a replacement in the mountains."
      }
    ],
    "groups": [
      {
        "title": "Flame signal",
        "rows": [
          {
            "label": "Board / control",
            "value": "Legacy York integrated control — codes covered separately; MAINT figures only here",
            "key": "board"
          },
          {
            "label": "Flame-sense µA thresholds",
            "value": "see rating plate — not published in the PS9 technical guide reviewed",
            "key": "flame_ua"
          }
        ]
      },
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure — NG/LP",
            "value": "see rating plate — not published in PS9 technical guide reviewed (dimensional/performance guide only, no combustion table)",
            "key": "manifold"
          },
          {
            "label": "Supply pressure — NG/LP",
            "value": "see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "see rating plate",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "see rating plate",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "0.5 in. w.g. (per PS9 technical guide)",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "35-65°F (40 MBH model example) — model-specific table",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Ignitor type/ohms",
            "value": "see rating plate — not published in PS9 technical guide reviewed",
            "key": "ignitor"
          },
          {
            "label": "Rollout/limit switch",
            "value": "see rating plate — not published in PS9 technical guide reviewed",
            "key": "rollout_limit"
          },
          {
            "label": "Altitude derate",
            "value": "Reduce capacity 4% per 1,000 ft above 2,000 ft elevation",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "York",
    "model": "YZH018-060 (Affinity 2-Stage Heat Pump)",
    "equip": "Heat Pump",
    "summary": "18 SEER two-stage scroll-compressor heat pump (Affinity series); factory-matched to TXV-equipped indoor coils with on-demand microprocessor defrost control.",
    "match": [
      "York YZH024/036/048/060 (and 'C' communicating-ready suffix)",
      "Coleman/Luxaire 18 SEER 2-stage Affinity-platform twin — brand-specific model code not confirmed in reviewed literature, verify rating plate"
    ],
    "source": "York Technical Guide 561927-YTG-A-0410, 'Affinity Split-System Heat Pumps 18 SEER - R-410A', Models YZH024 thru 060(C) — JCI/York service literature distributed via upgnet.com Source1 / yorknow.com documentation library",
    "flags": [
      {
        "title": "No Factory Crankcase Heater on This Platform",
        "body": "All YZH024-060 models ship WITHOUT a crankcase heater per the Physical & Electrical Data table — don't assume one is present. Follow standard oil-return/soak precautions on cold-soaked startups and long off-cycles."
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
            "label": "Metering Device",
            "value": "TXV — system-matched (e.g. 1TVM4G1/4H1/4K1 by size); required, not field-selected",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "2-stage scroll (Multi-stage Compressor: Yes)",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost Type/Interval",
            "value": "On-demand microprocessor defrost (adaptive balance-point control); not a fixed timer — exact algorithm not detailed in this guide",
            "key": "defrost"
          },
          {
            "label": "Reversing Valve Energized Mode",
            "value": "Not stated in this guide. Standard York/JCI convention is energized-in-cooling / de-energized-in-heating — confirm against the unit wiring diagram before relying on it",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in Technical Guide — see rating plate or IFC/board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in Technical Guide — see rating plate or IFC/board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Lockout",
            "value": "No standard rating stated. Accessory kits extend cooling operation to +20°F (Standard Low Ambient Kit S1-2LA06700424) or -20°F (Advanced Low Ambient Kit S1-2LA04701024)",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "No (all sizes)",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / System Charge for Various Matched Systems table (base factory charge + evaporator adder + lineset adder) — do not invent a charge value",
            "key": "charge"
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
    "model": "YHM024-060 (LX Series Modulating Heat Pump)",
    "equip": "Heat Pump",
    "summary": "14-17.75 SEER inverter-driven modulating heat pump (50-100% capacity, operated from a conventional 2-stage thermostat, non-communicating); hybrid demand/time-temperature defrost control.",
    "match": [
      "York YHM",
      "Coleman CH16",
      "Luxaire TH16"
    ],
    "source": "Johnson Controls Unitary Products Installation Manual 5156631-UIM-G-0417, 'YHM, CH16, TH16 Series' 16 SEER Heat Pump, 2-5 Tons 1-Phase — yorknow.com/pub/media/documentationMatched/YHM48B21S_InstallGuide.pdf",
    "flags": [
      {
        "title": "LPS Is Intentionally Ignored Below 15°F Ambient",
        "body": "The control electronically ignores the Low Pressure Switch input during defrost, for 120 seconds after defrost ends, and whenever outdoor ambient is below 15°F. A low-suction condition without an LPS fault in cold weather is expected behavior on this platform, not a stuck or bypassed switch."
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
            "label": "Metering Device",
            "value": "TXV (bulb-mounted, R-410A TXV per install manual)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Inverter-driven, modulates 50-100% of nominal capacity in 10% steps from a conventional 2-stage thermostat signal",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost Type/Interval",
            "value": "Hybrid Time/Temperature + Demand Defrost — control auto-selects mode based on prior cycle outcome. Defrost Enable coil temp: 35°F. Forces a defrost check at 31 min accumulated compressor run time (6-hr ceiling); defrost cycle runs up to 12 min or terminates early on coil temp",
            "key": "defrost"
          },
          {
            "label": "Reversing Valve Energized Mode",
            "value": "Confirmed energized-in-cooling / de-energized-in-heating — control 'Energizes the reversing valve' to enter defrost (which runs the unit in cooling mode) and 'De-energizes the reversing valve' at defrost termination",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "No fixed psig published — HPS is an electronic soft-lockout; 4 soft lockouts (8 total HPS openings) escalates to a hard lockout requiring manual reset, see Owner's Guide",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "No fixed psig published — ignored during/just after defrost and below 15°F ambient (see flag); otherwise soft-lockout logic",
            "key": "lps"
          },
          {
            "label": "Low Ambient Lockout",
            "value": "Standard/built-in — approved for cooling operation down to 35°F (2°C) without an accessory kit",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "Yes — confirmed (dedicated CCH troubleshooting section in manual)",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / System Charge table — do not invent a charge value",
            "key": "charge"
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
    "model": "YHE018-060 / YHG018-060 (LX Series Single-Stage Heat Pump)",
    "equip": "Heat Pump",
    "summary": "Single-stage scroll-compressor heat pumps on the shared LX Series platform: YHE is the 14 SEER tier, YHG the 16 SEER tier. On-demand microprocessor defrost with a field-set jumper interval.",
    "match": [
      "York YHE",
      "York YHG",
      "Coleman/Luxaire TH4 (YHE 14 SEER twin)",
      "Coleman YHG / Luxaire TH6 (YHG 16 SEER twin)"
    ],
    "source": "York Technical Guide 5455359-YTG-A-1217 (YHE, 14 SEER R-410A 1-Phase, yorknow.com/pub/media/documentation/YHE_NEW_TECH.pdf) and York Technical Guide 5599017-YTG-F-0520 (YHG, 16 SEER R-410A 1-Phase, yorknow.com/pub/media/documentation/YHG_tech.pdf)",
    "flags": [
      {
        "title": "Crankcase Heater Presence Differs by Tier/Size",
        "body": "YHE (14 SEER) ships WITHOUT a crankcase heater on most sizes but WITH one on its two largest tonnage models, per the Physical & Electrical Data table. YHG (16 SEER) ships WITH a crankcase heater on every size. Don't assume either way — check the specific model's data table or rating plate."
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
            "label": "Metering Device",
            "value": "YHE: piston or TXV allowed depending on matched indoor coil (TXV + hard-start kit required on some matches). YHG: TXV required on all matches (S1-1TVM*** kit)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Single-stage scroll",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost Type/Interval",
            "value": "On-demand (microprocessor) defrost; field-set via a Defrost Jumper Pin position that varies by matched indoor coil (see System Charge for Various Matched Systems table for the pin setting per model — the pin-position-to-minutes mapping is printed on the defrost control board itself, not in this guide)",
            "key": "defrost"
          },
          {
            "label": "Reversing Valve Energized Mode",
            "value": "Not stated in this guide. Standard York/JCI convention is energized-in-cooling / de-energized-in-heating — confirm against the unit wiring diagram before relying on it",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in Technical Guide — see rating plate or IFC/board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in Technical Guide — see rating plate or IFC/board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Lockout",
            "value": "No standard rating below normal cooling operation stated. Accessory kits extend cooling to +20°F (Standard Kit S1-2LA06700424) or -20°F (Advanced Kit S1-2LA04701024); ambient ≤55°F for servicing calls for the Cold Weather Charging Tent (S1-CHGTENT01)",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "Model-dependent — see flag above; confirm on rating plate",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / System Charge table — do not invent a charge value",
            "key": "charge"
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
    "model": "HMH7 (Horizontal Discharge Modulating Heat Pump)",
    "equip": "Heat Pump",
    "summary": "17 SEER2 side/horizontal-discharge inverter-driven modulating heat pump (35-100% capacity), optionally communicating; ducted residential outdoor unit, not a mini-split/ductless system. HMCG2 is this platform's straight-cool AC companion.",
    "match": [
      "York HMH7",
      "Coleman HMH7",
      "Luxaire HMH7 (same model code used across all three brands)"
    ],
    "source": "YORK Technical Guide 6353669-YTG-C-0923, 'HMH7 Series - 17 SEER2 Horizontal Discharge Modulating Heat Pump', R-410A/R-454B, 2-5 nominal tons, dated 2023-09-12 — yorknow.com/pub/media/documentation/hmh7tech.pdf",
    "flags": [
      {
        "title": "Dual-Refrigerant Platform — Confirm Nameplate Before Connecting Gauges",
        "body": "HMH7 is built in both R-410A (model refrigerant code B) and R-454B (code D) versions. Using the wrong gauges, recovery equipment, or refrigerant on this platform is a real risk — always read the rating plate before connecting a manifold, never assume R-410A."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A (code B) or R-454B (code D) — see flag; confirm from model number/rating plate",
            "key": "refrigerant"
          },
          {
            "label": "Metering Device",
            "value": "TXV",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Inverter-driven, modulating; optionally Communicating (control strategy code C available) or standard non-communicating, per model number",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost Type/Interval",
            "value": "Demand-defrost, adaptive control on the same JCI modulating-platform control architecture as YHM. Board-specific timing values are not printed in this Technical Guide — see the HMH7 User's Guide / IFC board label for sequence detail",
            "key": "defrost"
          },
          {
            "label": "Reversing Valve Energized Mode",
            "value": "Not stated in this Technical Guide. Same JCI modulating-platform family as YHM, which confirms energized-in-cooling / de-energized-in-heating — verify against this unit's wiring diagram",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — related modulating platforms use an electronic soft-lockout (no fixed psig); see IFC board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see IFC board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Lockout",
            "value": "Standard/built-in — guide states units 'shall be approved for cooling operation between 35°F and 122°F without modification'",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "Yes (base heater) — all sizes",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / chart — do not invent a charge value",
            "key": "charge"
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
    "model": "YXV024-060 (Affinity Variable-Capacity Air Conditioner)",
    "equip": "Condenser",
    "summary": "Up to 21 SEER fully communicating variable-capacity air conditioner (inverter compressor); requires a compatible communicating thermostat and includes Charge Assurance refrigerant-charge monitoring.",
    "match": [
      "York YXV",
      "Coleman AC21",
      "Luxaire AL21"
    ],
    "source": "York Technical Guide 5331838-YTG-B-0517, 'Affinity Series 20 SEER - Modulating Split-System Air Conditioner', R-410A 1-Phase — yorknow.com/pub/media/documentation/YXVtech.pdf",
    "flags": [
      {
        "title": "Communicating Thermostat Is Required for Variable Operation",
        "body": "YXV needs a compatible Residential Touch Screen Communicating control (only 3 thermostat wires) to deliver true variable-capacity operation. On a conventional thermostat it falls back to fixed-stage operation — check the control type before troubleshooting a 'won't modulate' complaint."
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
            "label": "Metering Device",
            "value": "TXV (dealer-installed or factory on matched indoor coil)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Variable-speed/modulating, communicating",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Cooling Limit",
            "value": "Standard/built-in — Low Ambient Protection allows cooling operation down to 35°F (2°C), reducing capacity as needed; no accessory kit required",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "Yes (stator heat) — all sizes",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / Tabular Data Sheet — do not invent a charge value",
            "key": "charge"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "York",
    "model": "YXT024-060 (Affinity 2-Stage Air Conditioner)",
    "equip": "Condenser",
    "summary": "Up to 19 SEER / 18 SEER2 two-stage air conditioner. Communications-capable: operates as a conventionally-wired system or, with only 4 thermostat wires, as a communicating system.",
    "match": [
      "York YXT",
      "Coleman AC19",
      "Luxaire AL19"
    ],
    "source": "York Technical Guide 5493751-YTG-H-1022, 'Affinity Series Model: YXT - 18 SEER2 Split-System Air Conditioner - Single-Phase', dated 2022-10-01 — yorknow.com/pub/media/documentation/yxtseer2tech.pdf",
    "flags": [
      {
        "title": "No Built-In Low-Ambient Cooling — Kit Required",
        "body": "Unlike the fully-communicating YXV, YXT relies on the same accessory low-ambient kits as the conventional LX-series units (+20°F Standard Kit / -20°F Advanced Kit). Don't assume this model has YXV's built-in 35°F cold-weather cooling capability."
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
            "label": "Metering Device",
            "value": "TXV on all matched indoor coils (dealer-installed or factory, S1-1TVM*** kit)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "2-stage scroll",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Cooling Limit",
            "value": "No standard numeric rating printed in this guide. Accessory kits extend cooling operation to +20°F (Standard Kit) or -20°F (Advanced Kit); ambient ≤55°F for servicing calls for the Cold Weather Charging Tent",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "No (per Physical & Electrical Data table)",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / chart — do not invent a charge value",
            "key": "charge"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "York",
    "model": "YCG/YCE/YCJ/YFE018-060 (LX Series Single-Stage Air Conditioner)",
    "equip": "Condenser",
    "summary": "Single-stage scroll-compressor air conditioners on the shared LX Series outdoor-unit platform. YCG/YCE/YFE/YCJ are efficiency-tier variants (roughly 13-17 SEER depending on the matched indoor coil) of the same physical unit.",
    "match": [
      "York YCG",
      "York YCE",
      "York YCJ",
      "York YFE",
      "Luxaire TC-series (confirmed cross-reference: TC7B tier ≈ YCG, TC4B tier ≈ YCE)",
      "Coleman equivalent on the same LX platform — exact tier code not directly confirmed in reviewed literature, verify rating plate"
    ],
    "source": "York Technical Guide 5495509-YTG-F-1021, 'LX Series Split-System Air Conditioners' up to 17 SEER, R-410A 1-Phase — yorknow.com/pub/media/documentation/ycgtech.pdf (see also yorknow.com/pub/media/documentation/ycetech.pdf for the YCE-specific tier)",
    "flags": [
      {
        "title": "Refrigerant Varies by Vintage — Always Check the Nameplate",
        "body": "This LX outdoor-unit platform has produced both R-410A units (YCG/YCE/YCJ/YFE, covered here) and newer R-454B SEER2 successors on the same chassis family (e.g. YC4-tier). Never assume R-410A on a unit in this family — confirm refrigerant type from the rating plate before connecting gauges or recovery equipment."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-410A on YCG/YCE/YCJ/YFE (confirm on nameplate — see flag)",
            "key": "refrigerant"
          },
          {
            "label": "Metering Device",
            "value": "TXV required on all matched indoor coils (S1-1TVM*** kit)",
            "key": "metering"
          },
          {
            "label": "Compressor",
            "value": "Single-stage scroll",
            "key": "compressor"
          }
        ]
      },
      {
        "title": "Protections & Low Ambient",
        "rows": [
          {
            "label": "High Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "hps"
          },
          {
            "label": "Low Pressure Switch Cutout/Cutin",
            "value": "Not published in this Technical Guide — see rating plate/board label",
            "key": "lps"
          },
          {
            "label": "Low Ambient Cooling Limit",
            "value": "No standard numeric rating printed in this guide. Accessory kits extend cooling operation to +20°F (Standard Kit) or -20°F (Advanced Kit); ambient ≤55°F for servicing calls for the Cold Weather Charging Tent",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase Heater",
            "value": "No (per Physical & Electrical Data table)",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "System Charge",
            "value": "See nameplate / chart — do not invent a charge value",
            "key": "charge"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "match": [
      "York MVC",
      "York MV",
      "MVC08B",
      "MVC12B",
      "MVC12C",
      "MVC14D",
      "MVC16C",
      "MVC20D",
      "Coleman MVC (same model prefix)",
      "Luxaire MVC (same model prefix)"
    ],
    "brand": "York",
    "model": "MVC / MV",
    "equip": "Air Handler",
    "summary": "Modular, variable-speed ECM communicating air handler (constant-CFM). Direct-drive ECM blower is communicating-ready for smart-thermostat pairing; ships as a flex coil with no factory metering device, so a bolt-on TXV kit (or factory TXV on some models) must be added in the field to match the outdoor unit.",
    "source": "York Technical Manual 5151065-YTG-H-0118 (MVC Series, dated 01/18, supersedes 05/17) — yorknow.com; York Install Guide 5169038-UIM-D-0617 (Variable Speed ECM Modular Multi-Position Air Handlers) — yorknow.com",
    "flags": [
      {
        "title": "York flag: no factory metering device",
        "body": "MVC ships as a 'Flex-coil' with NO factory-installed metering device. A field bolt-on TXV kit (or factory TXV on select models) must be installed to match the outdoor condenser/heat pump — do not assume a piston is present."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Direct-drive, variable-speed ECM, communicating-capable",
            "key": "blower"
          },
          {
            "label": "Airflow verification",
            "value": "Onboard LED (LED2) flashes once per 100 CFM for field CFM check",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "see rating plate / install guide airflow tables (not confirmed for this line)",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter & Heat Kit",
        "rows": [
          {
            "label": "Filter",
            "value": "Field-supplied 1\" disposable/permanent, sizes incl. 16x20x1, 20x20x1, 22x20x1; optional bottom rack filter kit accessory",
            "key": "filter"
          },
          {
            "label": "Electric heat kit",
            "value": "6HK series, 208/230V-1-60 and 208/230V-3-60, staged on W1 / W1+W2 combinations — see kit-specific table for exact kW/staging",
            "key": "heat_kit"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "None factory-installed (flex coil); field bolt-on TXV kit required, match to outdoor unit — some models have factory TXV",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Thermoset drain pan, low-retention, positive slope to drain connection",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "match": [
      "York AE",
      "AE24BX21",
      "AE30BX21",
      "AE36BX21",
      "AE42CX21",
      "Coleman JHE",
      "Luxaire JHE (multi-speed ECM twin)"
    ],
    "brand": "York",
    "model": "AE (multi-speed ECM)",
    "equip": "Air Handler",
    "summary": "Single-piece, multi-position, multi-speed ECM (constant-torque) air handler. Five discrete motor speed taps are selected by energizing 24VAC leads at the motor terminal block; highest energized tap wins if more than one is powered simultaneously. No onboard metering device — piston or TXV is field-installed to match the outdoor unit.",
    "source": "York Installation Manual 5169032-UIM-C-0416 (AE Series) — yorknow.com; also listed as York Install Guide 5373254-UIM-B-0617 (Standard ECM Single Piece Multi-Position Air Handlers) — yorknow.com. Coleman/Luxaire JHE twin per official Luxaire residential air handler lineup page (luxaire.com).",
    "flags": [
      {
        "title": "York flag: multiple 24VAC taps energized = highest speed wins",
        "body": "If more than one motor speed tap receives 24VAC simultaneously (miswired stat/board), the AE blower runs at the HIGHEST energized speed tap, not an average — check for stray voltage on unused tap wires during callbacks for wrong-airflow complaints."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Direct-drive, 5-speed ECM (constant-torque, non-communicating)",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "5 speed taps at motor terminal block, selected via 24VAC control wiring (speed #1 low to #5 HI)",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "0.70 in. w.c. (per AE airflow data tables)",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter & Heat Kit",
        "rows": [
          {
            "label": "Filter",
            "value": "Standard 1\" permanent or disposable; permanent washable filter kits 1PF0601/0602/0603",
            "key": "filter"
          },
          {
            "label": "Electric heat kit",
            "value": "Single-phase kits 2.5-25 kW; 3-phase 208-230V kits 10-25 kW; minimum blower speed required varies by kit model — see heat kit table",
            "key": "heat_kit"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "None factory-installed — piston or TXV must be field-installed to match outdoor unit",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "Primary and secondary drain lines must both be field-trapped for proper drainage; fittings per ASTM D2466",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "match": [
      "York AP",
      "AP24BX21",
      "AP30BX21",
      "AP36BX21",
      "AP48CX21",
      "Coleman AP (same model prefix)",
      "Luxaire AP (same model prefix)",
      "Coleman JDP",
      "York AHE (related but ECM, not PSC - see flag)"
    ],
    "brand": "York",
    "model": "AP (standard PSC/fixed-speed) — also sold as AL / Coleman & Luxaire AP",
    "equip": "Air Handler",
    "summary": "Single-piece, multi-position, standard-efficiency multi-speed PSC air handler with MaxAlloy aluminum coil. Same 'AP' model-number prefix is used across York, Coleman, and Luxaire branded literature for this platform. Blower speed is field-selected at the motor terminal block; no factory metering device — piston or TXV is added per outdoor unit spec.",
    "source": "York Installation Guide 5373256-UIM-C-0717 (Standard PSC Single Piece, Multi-Position Air Handlers) — yorknow.com; York/Luxaire/Coleman AP product data sheets (york.com, luxaire.com, colemanac.com)",
    "flags": [
      {
        "title": "York flag: AHE is ECM, not PSC — do not treat as the same platform",
        "body": "The AHE series (York doc 697887-YTG-H-0514) is often assumed to be the PSC line but is actually a fixed-speed ECM/brushless-DC blower ('Flex-coil', field bolt-on TXV, no factory metering device) — confirm blower type off the rating plate before ordering a PSC-specific replacement motor for an AHE-tagged unit."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "Direct-drive, multi-speed PSC motor",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "Speed tap selection at motor terminal block (connect motor lead to desired speed tap per unit wiring label)",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "Tested to 0.50 in. w.c. per UL 1995/CSA 22.2 No.236; 0.2-0.5 in. w.c. recommended for optimal performance",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter & Heat Kit",
        "rows": [
          {
            "label": "Filter",
            "value": "Built-in filter rack, 1.0\" disposable or cleanable filter",
            "key": "filter"
          },
          {
            "label": "Electric heat kit",
            "value": "Field-installed single-phase kits available — see kit-specific kW/staging table (not itemized in this pass)",
            "key": "heat_kit"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "None factory-installed — field piston or TXV required, sized to match outdoor unit (see outdoor unit documentation)",
            "key": "metering"
          },
          {
            "label": "Drain pan",
            "value": "3/4\" PVC or threaded steel drain connections per ASTM D2466 Sch. 40 fittings (drains are non-pressurized)",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Goodman",
    "model": "GMVC96 / GCVC96",
    "equip": "Gas Furnace",
    "summary": "2-stage, 96% AFUE, ComfortNet-compatible condensing furnace on the 34.5\" chassis. This chassis/platform is shared with the Daikin-brand DM96VC/DC96VC twin, so the Daikin service manual is the authoritative source for adjustment and troubleshooting figures.",
    "match": [
      "GMVC96",
      "GCVC96",
      "AMVC96",
      "ACVC96",
      "DM96VC",
      "DC96VC"
    ],
    "source": "Daikin Service Instructions RSD6612010R5, \"34.5\\\" Chassis DC96VC/DM96VC Two-Stage Gas Furnace\" (daikincomfort.com/docs/default-source/dm96vc/sm-rsd6612010r5.pdf) — GMVC96/GCVC96 share this platform/chassis and figures",
    "flags": [
      {
        "title": "Front cover pressure switch blocks ignition on condensate backup",
        "body": "In addition to the high-fire/low-fire draft pressure switches, this platform adds a \"front cover pressure switch\" wired in series with the main (low-fire) gas valve solenoid. If condensate backs up in the secondary heat exchanger (plugged/misrouted drain), this switch opens and blocks the gas valve — a non-firing furnace with good draft-switch readings should point you here."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG — low stage",
            "value": "1.6–2.2\" w.c. (nominal 1.9\" w.c.)",
            "key": "manifold_ng_low"
          },
          {
            "label": "Manifold pressure, NG — high stage",
            "value": "3.2–3.8\" w.c. (nominal 3.5\" w.c.)",
            "key": "manifold_ng_high"
          },
          {
            "label": "Manifold pressure, LP — low stage",
            "value": "5.7–6.3\" w.c. (nominal 6.0\" w.c.)",
            "key": "manifold_lp_low"
          },
          {
            "label": "Manifold pressure, LP — high stage",
            "value": "9.7–10.3\" w.c. (nominal 10.0\" w.c.)",
            "key": "manifold_lp_high"
          },
          {
            "label": "Supply (inlet) pressure, NG",
            "value": "4.5\"–10.0\" w.c.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure, LP",
            "value": "11.0\"–13.0\" w.c.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice, NG (factory)",
            "value": "#45 drill",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J54, two-stage",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame-sense signal (Integrated Ignition control)",
            "value": "1–4 µA",
            "key": "flame_sense"
          },
          {
            "label": "Ignitor type",
            "value": "120V silicon nitride HSI (~2156–2678°F operating temp)",
            "key": "ignitor_type"
          },
          {
            "label": "Ignitor resistance, room temp",
            "value": "37–68 Ω",
            "key": "ignitor_ohms"
          },
          {
            "label": "Ignitor current draw",
            "value": "0.37–0.68 A @ 120V (steady state, preheat)",
            "key": "ignitor_amps"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit",
            "value": "Auto-reset bi-metal disc, non-adjustable",
            "key": "primary_limit"
          },
          {
            "label": "Auxiliary limit",
            "value": "Blower housing (both sides); required for horizontal/counterflow",
            "key": "aux_limit"
          },
          {
            "label": "Flame rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to manifold assembly",
            "key": "rollout"
          },
          {
            "label": "High-altitude derate",
            "value": "Orifice/pressure-switch kit required above 7,000 ft (USA); Canada certified to 4,500 ft max",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Goodman",
    "model": "GMVM97 / GCVM97",
    "equip": "Gas Furnace",
    "summary": "Modulating (35%–100% continuously variable), 97% AFUE condensing furnace on the 34.5\" chassis. The service manual labels the modulation-range endpoints \"Low Stage\" and \"High Stage\" — these are the low-fire and high-fire manifold pressure targets, not a 2-stage valve.",
    "match": [
      "GMVM97",
      "GCVM97",
      "AMVM97",
      "ACVM97"
    ],
    "source": "Goodman Service Instructions RS6612015R1, \"34.5\\\" Chassis ACVM97*BA/AMVM97*BA & GCVM97*BA/GMVM97*BA Modulating Gas Furnaces\" (mobile.goodmanmfg.com/mobileapp/stellent/pdf/infoPdf/Lit/RS6612015R1.pdf)",
    "flags": [
      {
        "title": "LP manifold-pressure tolerance is wider than NG",
        "body": "The manual states final manifold pressure must not vary more than ±0.3\" w.c. from spec on natural gas, but allows +0.5\" w.c. on propane. Don't hold an LP unit to the tighter NG tolerance when fine-tuning the regulator."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG — low fire (~35%)",
            "value": "1.6–2.2\" w.c. (nominal 1.9\" w.c.)",
            "key": "manifold_ng_low"
          },
          {
            "label": "Manifold pressure, NG — high fire (100%)",
            "value": "3.2–3.8\" w.c. (nominal 3.5\" w.c.)",
            "key": "manifold_ng_high"
          },
          {
            "label": "Manifold pressure, LP — low fire",
            "value": "5.7–6.3\" w.c. (nominal 6.0\" w.c.)",
            "key": "manifold_lp_low"
          },
          {
            "label": "Manifold pressure, LP — high fire",
            "value": "9.7–10.3\" w.c. (nominal 10.0\" w.c.)",
            "key": "manifold_lp_high"
          },
          {
            "label": "Supply (inlet) pressure, NG",
            "value": "4.5\"–10.0\" w.c.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure, LP",
            "value": "11.0\"–13.0\" w.c.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice, NG (factory)",
            "value": "#45 drill (LP conversion orifice: 1.25 mm)",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J54 (modulating control); Honeywell single/two-stage valves also fielded per manual",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame-sense signal (Integrated Ignition control)",
            "value": "1–4 µA",
            "key": "flame_sense"
          },
          {
            "label": "Ignitor type",
            "value": "120V silicon nitride HSI (~2156–2678°F operating temp)",
            "key": "ignitor_type"
          },
          {
            "label": "Ignitor resistance, room temp",
            "value": "37–68 Ω",
            "key": "ignitor_ohms"
          },
          {
            "label": "Ignitor current draw",
            "value": "0.37–0.68 A @ 120V (steady state, preheat)",
            "key": "ignitor_amps"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit",
            "value": "Auto-reset bi-metal disc, non-adjustable",
            "key": "primary_limit"
          },
          {
            "label": "Auxiliary limit",
            "value": "Blower housing (both sides); required for horizontal/counterflow",
            "key": "aux_limit"
          },
          {
            "label": "Flame rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to manifold assembly",
            "key": "rollout"
          },
          {
            "label": "High-altitude derate",
            "value": "0–7,000 ft ships as-is; above 7,000 ft requires altitude kit (orifice and/or pressure switch); Canada certified to 4,500 ft max",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Goodman",
    "model": "GMSS92 / GMSS96 / GCSS96",
    "equip": "Gas Furnace",
    "summary": "Single-stage, multi-speed ECM condensing furnaces (92% and 96% AFUE) on the shared single-stage 34.5\" chassis. This platform is shared with the Daikin-brand DM92SN/DM96SN/DC96SN twins; the AFUE difference between 92% and 96% is not called out separately for the figures below.",
    "match": [
      "GMSS92",
      "GMSS96",
      "GCSS96",
      "AMSS92",
      "AMSS96",
      "ACSS96",
      "DM92SN",
      "DM96SN",
      "DC96SN"
    ],
    "source": "Daikin Service Instructions RSD6612021, July 2021, \"DM92SN, DM96SN & DC96SN Models\" (daikincomfort.com/docs/default-source/dm96sn/291234817.pdf) — GMSS92/GMSS96/GCSS96 share this platform/chassis and figures",
    "flags": [
      {
        "title": "Two gas-valve suppliers fielded — check before ordering the pressure-tap adapter",
        "body": "Single-stage units ship with either a White-Rodgers 36J22 or a Honeywell VR8215 gas valve depending on production run. The White-Rodgers 36[G/J] pressure-check adapter kit (#0151K00000S) is needed to read pressure at the White-Rodgers valve's inlet tap; the Honeywell valve uses a plain 1/8\" NPT hose barb instead. Confirm which valve is installed before grabbing gauges."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG (single-stage)",
            "value": "3.5\" w.c. nominal, ±0.3\" w.c. tolerance",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure, LP (single-stage)",
            "value": "10.0\" w.c. nominal, ±0.3\" w.c. tolerance",
            "key": "manifold_lp"
          },
          {
            "label": "Supply (inlet) pressure, NG",
            "value": "4.5\"–10.0\" w.c.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure, LP",
            "value": "11.0\"–13.0\" w.c.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice, NG (factory)",
            "value": "#43 drill",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J22 or Honeywell VR8215, single-stage (production-dependent)",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame-sense signal (Integrated Ignition control)",
            "value": "1–4 µA",
            "key": "flame_sense"
          },
          {
            "label": "Ignitor type",
            "value": "115V silicon carbide igniter, p/n 0130F00008, 17-second warm-up",
            "key": "ignitor_type"
          },
          {
            "label": "Ignitor resistance, room temp",
            "value": "37–68 Ω",
            "key": "ignitor_ohms"
          },
          {
            "label": "Ignitor current draw",
            "value": "see rating plate (not separately published for the silicon-carbide igniter; nitride-equipped units on this platform run 0.37–0.68 A @ 120V)",
            "key": "ignitor_amps"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit",
            "value": "Auto-reset bi-metal disc, non-adjustable",
            "key": "primary_limit"
          },
          {
            "label": "Auxiliary limit",
            "value": "Blower housing (both sides); required for horizontal/counterflow",
            "key": "aux_limit"
          },
          {
            "label": "Flame rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to burner bracket",
            "key": "rollout"
          },
          {
            "label": "High-altitude derate",
            "value": "Kit required above 7,000 ft",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Goodman",
    "model": "GMEC96 / GCEC96",
    "equip": "Gas Furnace",
    "summary": "2-stage, 96% AFUE condensing furnace with multi-speed ECM motor — the older ECM-generation 2-stage platform (distinct chassis/control from the ComfortNet GMVC96 line).",
    "match": [
      "GMEC96",
      "GCEC96",
      "AMEC96",
      "ACEC96"
    ],
    "source": "Goodman Service and Troubleshooting RS6612013R10, \"Goodman GMEC96/GCEC96 & Amana AMEC96/ACEC96 Two Stage Furnace with multi-speed ECM Motor\" (mobile.goodmanmfg.com/mobileapp/stellent/pdf/infoPdf/Lit/RS6612013R10.pdf)",
    "flags": [
      {
        "title": "Smallest input size uses a different orifice",
        "body": "*MEC96/*CEC96 furnaces have factory-installed #45 natural-gas orifices across the line, except the 030 (30,000 BTU input) size, which uses #50. Confirm the input size on the rating plate before resizing for altitude or an LP conversion."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG — low stage",
            "value": "1.6–2.2\" w.c. (nominal 1.9\" w.c.)",
            "key": "manifold_ng_low"
          },
          {
            "label": "Manifold pressure, NG — high stage",
            "value": "3.2–3.8\" w.c. (nominal 3.5\" w.c.)",
            "key": "manifold_ng_high"
          },
          {
            "label": "Manifold pressure, LP — low stage",
            "value": "5.7–6.3\" w.c. (nominal 6.0\" w.c.)",
            "key": "manifold_lp_low"
          },
          {
            "label": "Manifold pressure, LP — high stage",
            "value": "9.7–10.3\" w.c. (nominal 10.0\" w.c.)",
            "key": "manifold_lp_high"
          },
          {
            "label": "Supply (inlet) pressure, NG",
            "value": "4.5\"–10.0\" w.c.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure, LP",
            "value": "11.0\"–13.0\" w.c.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice, NG (factory)",
            "value": "#45 drill (except 030 input size: #50)",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J54 or Honeywell VR9205, two-stage",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame-sense signal (Integrated Ignition control)",
            "value": "1–4 µA",
            "key": "flame_sense"
          },
          {
            "label": "Ignitor type",
            "value": "120V silicon nitride HSI (~2156–2678°F operating temp)",
            "key": "ignitor_type"
          },
          {
            "label": "Ignitor resistance, room temp",
            "value": "37–68 Ω",
            "key": "ignitor_ohms"
          },
          {
            "label": "Ignitor current draw",
            "value": "0.37–0.68 A @ 120V (steady state, preheat)",
            "key": "ignitor_amps"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit",
            "value": "Auto-reset bi-metal disc, non-adjustable",
            "key": "primary_limit"
          },
          {
            "label": "Auxiliary limit",
            "value": "Blower housing (both sides); required for horizontal/counterflow",
            "key": "aux_limit"
          },
          {
            "label": "Flame rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to manifold assembly",
            "key": "rollout"
          },
          {
            "label": "High-altitude derate",
            "value": "Orifice kit required above 7,000 ft",
            "key": "altitude"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Goodman",
    "model": "GR9S / GR9T (R-32 generation, 92%/96%)",
    "equip": "Gas Furnace",
    "summary": "Current-generation single-stage (S) and 2-stage (T) condensing furnaces built for pairing with R-32 cooling systems (control board includes an A2L refrigerant-leak monitoring function). Figures below are from the 92%/96% two-stage nine-speed-ECM condensing chassis (DR96TN/DD96TN); the 80% AFUE non-condensing GR9S80/GR9T80 models use a separate manual not covered here.",
    "match": [
      "GR9S92",
      "GR9S96",
      "GR9T96",
      "GD9S92",
      "GD9S96",
      "GD9T96",
      "AR9S92",
      "AR9S96",
      "AR9T96",
      "AD9S96",
      "AD9T96",
      "DR96TN",
      "DD96TN"
    ],
    "source": "Goodman Service Instructions RSD6612304, May 2024, \"DR96TN/DD96TN Two Stage Furnace with Nine Speed ECM Motor\" (mobile.goodmanmfg.com/mobileapp/stellent/pdf/infoPdf/Lit/RSD6612304.pdf) — Goodman/Amana brand model legend in this manual lists AR9T/GR9T for this platform",
    "flags": [
      {
        "title": "R-32 (A2L) monitoring is ON by default — must be disabled if the cooling system isn't R-32",
        "body": "The furnace control board ships with the R-32 leak-monitoring function enabled by default. If the paired outdoor/indoor cooling unit does not use R-32 refrigerant (e.g. a legacy R-410A system) or the R-32 sensor wire isn't connected, the function must be turned off in the \"A2L Function Enabled\" menu (display code A2E, select \"no\") or the furnace will not run properly."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure, NG — low stage",
            "value": "1.6–2.2\" w.c. (nominal 1.9\" w.c.)",
            "key": "manifold_ng_low"
          },
          {
            "label": "Manifold pressure, NG — high stage",
            "value": "3.2–3.8\" w.c. (nominal 3.5\" w.c.)",
            "key": "manifold_ng_high"
          },
          {
            "label": "Manifold pressure, LP — low stage",
            "value": "5.7–6.3\" w.c. (nominal 6.0\" w.c.)",
            "key": "manifold_lp_low"
          },
          {
            "label": "Manifold pressure, LP — high stage",
            "value": "9.7–10.3\" w.c. (nominal 10.0\" w.c.)",
            "key": "manifold_lp_high"
          },
          {
            "label": "Supply (inlet) pressure, NG",
            "value": "4.5\"–10.0\" w.c.",
            "key": "supply_ng"
          },
          {
            "label": "Supply (inlet) pressure, LP",
            "value": "11.0\"–13.0\" w.c.",
            "key": "supply_lp"
          },
          {
            "label": "Orifice, NG (factory)",
            "value": "#45 drill (except DM96TN0303AN chassis: #50)",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "White-Rodgers 36J54, two-stage",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static pressure",
            "value": "see rating plate (approx. 0.5\" w.c. typical range per manual)",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "see rating plate",
            "key": "temp_rise"
          }
        ]
      },
      {
        "title": "Flame signal / ignition",
        "rows": [
          {
            "label": "Flame-sense signal (Integrated Ignition control)",
            "value": "3–8 µA — higher minimum than the older Goodman platforms (1–4 µA); don't apply the old spec here",
            "key": "flame_sense"
          },
          {
            "label": "Ignitor type",
            "value": "120V silicon nitride HSI (~2156–2678°F operating temp)",
            "key": "ignitor_type"
          },
          {
            "label": "Ignitor resistance, room temp",
            "value": "37–68 Ω",
            "key": "ignitor_ohms"
          },
          {
            "label": "Ignitor current draw",
            "value": "0.37–0.68 A @ 120V (steady state, preheat)",
            "key": "ignitor_amps"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Primary limit",
            "value": "Auto-reset bi-metal disc, non-adjustable",
            "key": "primary_limit"
          },
          {
            "label": "Auxiliary limit",
            "value": "Blower housing (both sides); required for horizontal/counterflow",
            "key": "aux_limit"
          },
          {
            "label": "Flame rollout switch",
            "value": "Manual-reset, temperature-activated, mounted to burner bracket",
            "key": "rollout"
          },
          {
            "label": "High-altitude derate",
            "value": "0–7,000 ft ships as-is; above 7,000 ft requires pressure-switch and/or orifice kit",
            "key": "altitude"
          },
          {
            "label": "R-32 sensor wire",
            "value": "Inspect for tightness/damage during annual maintenance (control board input, indoor coil to furnace)",
            "key": "r32_sensor"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Goodman",
    "model": "GSZC18",
    "equip": "Heat Pump",
    "summary": "18 SEER two-stage split-system heat pump, R-410A, ComfortNet 4-wire communicating-capable with Copeland two-stage scroll compressor and Copeland Comfort Alert diagnostics.",
    "match": [
      "ASZC18"
    ],
    "source": "Daikin/Goodman \"Service and Troubleshooting: ASXC, DSXC, GSXC Condensing Units & ASZC, DSZC, GSZC Split System Heat Pumps w/ R-410A\" (RS6200007r23) - daikincomfort.com/docs/default-source/chpf/rs6200007r23.pdf",
    "flags": [
      {
        "title": "Two-stage compressor diagnostics",
        "body": "Units with a Copeland Comfort Alert module (UC control, 2-stage models) flash a status LED for locked rotor, open circuit, high/low pressure trip, or miswire before condemning the compressor - read the module's LED code first."
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
            "value": "Factory non-adjustable TXV standard on communicating (4-wire) coil pairings; flowrator/piston used on some non-communicating coil combinations - confirm indoor coil model",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand defrost: outdoor coil temp (OCT) sensor + accumulated compressor run time; interval selectable 30/60/90/120 min via UC board dip switch; terminates at ~75°F coil temp or 10 min max, whichever first",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling / de-energized in heating (standard Goodman/Amana convention; explicitly confirmed in the companion single-stage RS6200006r101 manual - this two-stage document does not restate it verbatim)",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "PTC type on applicable models, ~40W/265V; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "ComfortNet 4-wire ready",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart - superheat (piston-equipped) or subcooling (TXV-equipped), per nameplate; never invent a charge value",
            "key": "charging"
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
    "model": "GSXC18",
    "equip": "Condenser",
    "summary": "18 SEER two-stage split-system air conditioner, R-410A, ComfortBridge-compatible with Copeland two-stage scroll compressor and Copeland Comfort Alert diagnostics.",
    "match": [
      "ASXC18"
    ],
    "source": "Daikin/Goodman \"Service and Troubleshooting: ASXC, DSXC, GSXC Condensing Units & ASZC, DSZC, GSZC Split System Heat Pumps w/ R-410A\" (RS6200007r23) - daikincomfort.com/docs/default-source/chpf/rs6200007r23.pdf",
    "flags": [
      {
        "title": "ComfortBridge fault check first",
        "body": "ComfortBridge continuously monitors performance on communicating pairs - check the ComfortBridge/Comfort Alert fault code before condemning the compressor or control board on a two-stage complaint."
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
            "value": "Factory non-adjustable TXV standard on communicating (4-wire) coil pairings; flowrator/piston on some non-communicating coil combinations - confirm indoor coil model",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "PTC type on applicable models, ~40W/265V; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "ComfortBridge / ComfortNet 4-wire capable",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart - superheat (piston) or subcooling (TXV), per nameplate; never invent a charge value",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "GSZV20 / GVZC20",
    "equip": "Heat Pump",
    "summary": "Smart Speed inverter variable-speed heat pump, R-410A, up to 21 SEER/10 HSPF, sharing the Amana AVZC18/AVZC20 inverter platform and CoolCloud/ComfortNet controls per Goodman Service Bulletin SR-068.",
    "match": [
      "AVZC20",
      "AVZC18"
    ],
    "source": "Goodman \"Service and Troubleshooting: AVZC18 Inverter Heat Pump Condenser Units w/ R-410A\" (RS6215001r7) - partnerlinkmarketing.goodmanmfg.com/Lit/RS6215001r7.pdf; platform shared with GVZC20/GVXC20 confirmed by Goodman Service Bulletin SR-068 Rev.1 (Oct 2020, \"Crank Case Heater Kit for Inverter Split Systems\") - mobile.goodmanmfg.com",
    "flags": [
      {
        "title": "Idle high-pitched hum is normal",
        "body": "A high-pitched sound from the outdoor unit at standby is the inverter maintaining compressor oil temperature via winding current, not a defect (SR-068). An external crankcase heater retrofit kit (INVCCHK01, requires BTSDL01 Bluetooth loader) is available if the homeowner finds it objectionable."
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
            "value": "Electronic Expansion Valve (EEV) at indoor coil when matched with a communicating (AVPEC-type) air handler; inverter-tuned TXV-V kit required for non-matched/non-communicating air handlers",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "PCB + outdoor coil temp thermistor + dedicated defrost sensor (Tb); interval selectable 30/60/90/120 min; terminates when defrost sensor reads >43°F for 30 continuous seconds or max interval reached",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling / de-energized in heating (standard Goodman/Amana convention; explicitly stated for this shared platform in the companion R-32 manual RS6200301, not restated verbatim here)",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Pressure Monitoring",
        "rows": [
          {
            "label": "Pressure sensing",
            "value": "HI/LOW pressure SENSOR (transducer), not a fixed on/off switch - senses suction pressure in cooling, discharge pressure in heating",
            "key": "pressure_sensor"
          },
          {
            "label": "High-pressure control test point",
            "value": "Verified to cut out at approximately 605 PSIG during the charge-mode functional test procedure",
            "key": "hp_test"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "None standard - oil kept warm via compressor winding current in standby (SR-068); optional external CCH retrofit kit available",
            "key": "crankcase"
          },
          {
            "label": "Outdoor temp lockouts",
            "value": "Compressor lockout and backup-heat lockout temperatures are installer-configured at the thermostat - no fixed factory default published in this document",
            "key": "low_ambient"
          },
          {
            "label": "System test note",
            "value": "The outdoor unit's SYSTEM TEST self-check may not complete in ambient under 20°F due to low suction pressure - re-run once ambient exceeds 20°F; this is normal, not a fault",
            "key": "test_note"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Speed modulation",
            "value": "Compressor speed auto-adjusts with outdoor ambient - runs ~50% capacity below 70°F, ramps linearly to 100% above 95°F",
            "key": "controls"
          },
          {
            "label": "Communicating control",
            "value": "ComfortNet 4-wire ready; CoolCloud app + Bluetooth Shared Data Loader (BTSDL01) used for board data/firmware service",
            "key": "comfortnet"
          },
          {
            "label": "Charging method",
            "value": "Per unit nameplate/Expanded Performance Chart, subcooling method on EEV-equipped systems; never invent a charge value",
            "key": "charging"
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
    "model": "GSXV20 / GVXC20",
    "equip": "Condenser",
    "summary": "Smart Speed inverter variable-speed air conditioner, R-410A, up to 24.5 SEER/15 EER, sharing the Amana AVXC18/AVXC20 inverter platform per Goodman Service Bulletin SR-068.",
    "match": [
      "AVXC20",
      "AVXC18"
    ],
    "source": "Goodman \"Service and Troubleshooting: AVZC18 Inverter Heat Pump Condenser Units w/ R-410A\" (RS6215001r7) - partnerlinkmarketing.goodmanmfg.com/Lit/RS6215001r7.pdf (shared inverter platform/controls document); platform shared with GVXC20/GVZC20 confirmed by Goodman Service Bulletin SR-068 Rev.1 (Oct 2020) - mobile.goodmanmfg.com",
    "flags": [
      {
        "title": "Below-20°F system test",
        "body": "The outdoor unit's SYSTEM TEST self-check can fail to complete in ambient under 20°F due to low suction pressure - re-run the test once ambient exceeds 20°F rather than condemning the unit."
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
            "value": "Electronic Expansion Valve (EEV) when matched with a communicating air handler; inverter-tuned TXV-V kit for non-matched/non-communicating air handlers",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Monitoring",
        "rows": [
          {
            "label": "Pressure sensing",
            "value": "HI/LOW pressure SENSOR (transducer), not a fixed on/off switch",
            "key": "pressure_sensor"
          },
          {
            "label": "High-pressure control test point",
            "value": "Verified to cut out at approximately 605 PSIG during the charge-mode functional test procedure",
            "key": "hp_test"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "None standard - oil kept warm via compressor winding current in standby (SR-068); optional external CCH retrofit kit available",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient cooling lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Speed modulation",
            "value": "Compressor speed auto-adjusts with outdoor ambient - ~50% capacity below 70°F, ramping to 100% above 95°F",
            "key": "controls"
          },
          {
            "label": "Communicating control",
            "value": "ComfortNet 4-wire ready",
            "key": "comfortnet"
          },
          {
            "label": "Charging method",
            "value": "Per unit nameplate/Expanded Performance Chart, subcooling method on EEV-equipped systems; never invent a charge value",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "GSZB4 / GSZS4",
    "equip": "Heat Pump",
    "summary": "14.3+ SEER2 R-32 single-stage split-system heat pump platform (Goodman GSZB4/GSZS4, Amana ALZS4/ALZS5 twins) with a factory Refrigerant Detection System for A2L leak mitigation.",
    "match": [
      "ALZS4",
      "ALZS5"
    ],
    "source": "Goodman/Daikin \"Service and Troubleshooting: ALXS/GLXS Condensing Units, ALZS4/GLZS4/GLXS5 Heat Pumps w/ R-32 Refrigerant\" (RS6200301) - daikincomfort.com/docs/default-source/amst-(r-32)/sm-rs6200301.pdf. A model-specific manual revision naming GSZB4/GSZS4 directly was not located; this entry reflects Goodman's current-generation R-32 single-stage platform manual that the manufacturer groups these tiers under - verify exact coverage against the unit's rating plate.",
    "flags": [
      {
        "title": "R-32 leak alarm - do not open or de-power",
        "body": "If the Refrigerant Detection System (RDS) signals an R-32 leak alarm (LED flash pattern), do NOT open the unit or turn it off - the control automatically stops the thermostat call, runs the blower for air circulation, and shuts off electric heat. Read the A2L PCB fault-code label before servicing."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (mildly flammable, A2L classification)",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV or fixed orifice/flowrator depending on coil pairing - charge by subcooling (TXV) or superheat (piston/orifice) per nameplate",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Solid-state defrost control + outdoor coil defrost thermostat/sensor; timer interval selectable 30/60/90 min",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling / de-energized in heating - explicitly stated in this manual for R-32 heat pump models",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "PTC type on applicable models; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "Standard 24V staging with optional Copeland Comfort Alert compressor-protection module - not a full ComfortNet communicating platform",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart; never invent a charge value",
            "key": "charging"
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
    "model": "GSZH5",
    "equip": "Heat Pump",
    "summary": "Up to 15.2 SEER2 / 7.8 HSPF2 R-32 split-system heat pump (Goodman GSZH5, Amana twin ALZS5), the higher-tier version of the same R-32 single-stage platform as GSZB4/GSZS4.",
    "match": [
      "ALZS5"
    ],
    "source": "Goodman/Daikin \"Service and Troubleshooting: ALXS/GLXS Condensing Units, ALZS4/GLZS4/GLXS5 Heat Pumps w/ R-32 Refrigerant\" (RS6200301) - daikincomfort.com/docs/default-source/amst-(r-32)/sm-rs6200301.pdf. A model-specific manual revision naming GSZH5 directly was not located; this entry reflects the same R-32 platform manual as GSZB4/GSZS4 - verify exact coverage against the unit's rating plate.",
    "flags": [
      {
        "title": "A2L brazing/leak-test rules",
        "body": "Never use compressed air, oxygen, or a non-approved refrigerant to leak-test or pressurize an R-32 (A2L) system - use dry nitrogen only, and electrically isolate the unit before breaking into the sealed system, per this manual's A2L procedures."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (mildly flammable, A2L classification)",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV or fixed orifice/flowrator depending on coil pairing - charge by subcooling (TXV) or superheat (piston/orifice) per nameplate",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Solid-state defrost control + outdoor coil defrost thermostat/sensor; timer interval selectable 30/60/90 min",
            "key": "defrost"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in cooling / de-energized in heating - explicitly stated in this manual for R-32 heat pump models",
            "key": "reversing_valve"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "PTC type on applicable models; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "Standard 24V staging with optional Copeland Comfort Alert compressor-protection module - not a full ComfortNet communicating platform",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart; never invent a charge value",
            "key": "charging"
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
    "model": "GLXS4 / GSXB4 / GSXS4 / GSXH5",
    "equip": "Condenser",
    "summary": "13.4-17 SEER2 R-32 single-stage split-system air conditioner platform (Goodman GLXS4/GSXB4/GSXS4/GSXH5, Amana ALXS3/ALXS4/ALXS5 twins) with a factory Refrigerant Detection System for A2L leak mitigation.",
    "match": [
      "ALXS3",
      "ALXS4",
      "ALXS5"
    ],
    "source": "Goodman/Daikin \"Service and Troubleshooting: ALXS3, ALXS4, ALXS5, GLXS3, GLXS4, GLXS5 Condensing Units w/ R-32 Refrigerant\" (RS6200301) - daikincomfort.com/docs/default-source/amst-(r-32)/sm-rs6200301.pdf. GSXB4/GSXS4/GSXH5 model-specific manual revisions were not located; this entry reflects the same current-generation R-32 platform manual that explicitly names GLXS4 - verify exact tier coverage against the unit's rating plate.",
    "flags": [
      {
        "title": "R-32 leak alarm - do not open or de-power",
        "body": "If the Refrigerant Detection System (RDS) signals an R-32 leak alarm, do not open the unit or de-energize it - let the automatic sequence (thermostat off, blower on, heat off) run, then read the A2L PCB fault-code label before servicing."
      }
    ],
    "groups": [
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "R-32 (mildly flammable, A2L classification)",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "TXV or fixed orifice/flowrator depending on coil pairing - charge by subcooling (TXV) or superheat (piston/orifice) per nameplate",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "PTC type on applicable models; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient cooling lockout",
            "value": "Not published in this document - see unit rating plate / installation manual",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "Standard 24V staging with optional Copeland Comfort Alert compressor-protection module - not a full ComfortNet communicating platform",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart; never invent a charge value",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "GSX14 / GSXN4",
    "equip": "Condenser",
    "summary": "14-14.3 SEER(2) single-stage split-system air conditioner, R-410A (Goodman GSX14/GSXN4, Amana twin ASX14).",
    "match": [
      "ASX14"
    ],
    "source": "Goodman/Daikin \"Service and Troubleshooting: ANX, SSX, ASX, GSX, DSX, VSX Condensing Units & ANZ, SSZ, ASZ, GSZ, DSZ, VSZ Split System Heat Pumps w/ R-410A\" (RS6200006r101) - daikincomfort.com/docs/default-source/aspt/sm-rs6200006r101.pdf",
    "flags": [
      {
        "title": "Optional low-ambient cooling kit",
        "body": "Some models are factory- or field-equipped with a Low Ambient Thermostat (LAT) switch/kit to permit cooling operation below the normal outdoor temperature range - confirm its presence before assuming a fixed cooling lockout; no single factory lockout value is published for the base unit."
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
            "value": "Piston/fixed-orifice standard; TXV where the matched indoor coil specifies one - charge by superheat (piston) or subcooling (TXV) per nameplate",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Opens 610 PSIG ±10, closes (auto-reset) 420 PSIG ±25",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Opens 21 PSIG, auto-resets (closes) ~50 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Crankcase heater",
            "value": "\"Optional item\" on applicable models, PTC type; energize a minimum of 4 hours before compressor start",
            "key": "crankcase"
          },
          {
            "label": "Low-ambient (LAT) kit",
            "value": "Optional switch/kit permits cooling below normal ambient range on some models - no fixed lockout temp published, see rating plate",
            "key": "low_ambient"
          }
        ]
      },
      {
        "title": "Controls & Charging",
        "rows": [
          {
            "label": "Communicating control",
            "value": "Standard non-communicating 24V staging",
            "key": "controls"
          },
          {
            "label": "Charging method",
            "value": "Per unit's Expanded Performance Chart; never invent a charge value",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Goodman",
    "model": "AWST / AWUF",
    "equip": "Air Handler",
    "summary": "Wall-mount (closet/utility) air handler, 1.5-3 tons. Legacy AWUF/AWUT split blower type by model suffix (PSC on AWUF18/24/30/36, multi-speed ECM on AWUF19/25/31/32/37 and AWUT); the current AWST platform standardizes on a multi-speed ECM motor with Flowrater or TXV metering selectable by suffix.",
    "match": [
      "Amana AWST",
      "Amana AWUF",
      "Amana AWUT"
    ],
    "source": "Goodman SS-GAWUF (AWUF/AWUT Series product specifications, goodmanmfg.com, 11/19); Goodman SS-GAWST (AWST Series product specifications, goodmanmfg.com, 10/23)",
    "flags": [
      {
        "title": "Goodman: confirm blower type and metering from the model number, not the family name",
        "body": "\"AWUF\" is not automatically PSC — Goodman split the AWUF/AWUT nomenclature by model number: AWUF18/24/30/36 are multi-speed PSC, AWUF19/25/31/32/37 and all AWUT are multi-speed ECM. AWST's nomenclature (position 3) lists MS-ECM only. Expansion device is coded separately: F = Flowrater (fixed-orifice/piston), T = Thermal Expansion Valve. Always read the full model string off the rating plate before assuming motor or metering type."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Direct-drive, multi-speed — PSC on legacy AWUF18/24/30/36; multi-speed ECM on AWUF19/25/31/32/37, all AWUT, and all current AWST",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "Speed selected by motor lead/tap wired at the low-voltage board per airflow data table; no field CFM dial",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "Not published as a single figure — see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Cabinet air leakage",
            "value": "<2.0% at 1.0\" w.c. and <1.4% at 0.5\" w.c. per ASHRAE 193",
            "key": "leakage"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heat kit range",
            "value": "3, 5, 8, 10 kW sequence-controlled, rust-resistant nickel-chromium heating elements",
            "key": "heat_kw"
          },
          {
            "label": "Chassis note",
            "value": "Large chassis (2.5- and 3-ton) is front-return only; small chassis (1.5- and 2-ton) allows front or bottom return",
            "key": "chassis"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "AWUF/AWST \"F\" suffix = Check Flowrater (fixed-orifice/piston); AWUT/AWST \"T\" suffix = fully adjustable TXV — match to outdoor unit type per Goodman combination charts",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "Aluminum tubing coil on all models",
            "key": "coil"
          },
          {
            "label": "Drain pan",
            "value": "Thermoplastic drain pan with bottom primary and secondary drain connections; no factory float switch — field-installed per local code, see rating plate",
            "key": "drain"
          },
          {
            "label": "Filter",
            "value": "Built-in filter rack, filter included from factory",
            "key": "filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Goodman",
    "model": "AEPF",
    "equip": "Air Handler",
    "summary": "Multi-position variable-speed (constant-CFM DC/ECM) air handler, 1.5-5 tons, metered with a Check Flowrater. Companion AEPT (expansion-valve, R-22-only) model is covered separately; this entry is the AEPF/piston variant.",
    "match": [
      "Amana AEPF"
    ],
    "source": "Goodman SS-GAEPF (AEPF/AEPT Series product specifications, goodmanmfg.com, 2/06)",
    "flags": [
      {
        "title": "Goodman: airflow is set by dip switches, four modes x four levels",
        "body": "The variable-speed control board has dip switches that pre-program CFM independently for Cooling, Heat Pump Heating, Backup (electric) Heating, and Backup+Heat Pump Heating — four selectable levels per mode. Confirm dip-switch settings match the installed heat kit and outdoor unit capacity; a mis-set dip switch is a common cause of low delivered airflow complaints on this platform."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Variable-speed DC (ECM) motor; up to 14 field-selectable airflow settings",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "Dip switches on the control board — 4 levels each for Cooling, Heat Pump Heating, Backup Heat, and Backup+HP Heat",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "Not published as a single figure — see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Cabinet air leakage",
            "value": "Factory-sealed to <=2% leakage at 1.0\" w.c. external duct static",
            "key": "leakage"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heat kit range",
            "value": "3-21 kW field-installed electric heat kits",
            "key": "heat_kw"
          },
          {
            "label": "Staging",
            "value": "Low-voltage control circuit is arranged to permit staging of the heater elements",
            "key": "staging"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device (AEPF)",
            "value": "Check Flowrater (fixed-orifice/piston) for cooling and heat-pump applications",
            "key": "metering"
          },
          {
            "label": "Multi-position drain pans",
            "value": "Built-in coil has separate horizontal, vertical, and downflow drain pans with secondary drain connections",
            "key": "drain"
          },
          {
            "label": "Float switch",
            "value": "Not standard — no factory float switch called out; see rating plate/install manual for field kit",
            "key": "float_switch"
          },
          {
            "label": "Filter",
            "value": "Built-in filter rack for 1\" filter (filter not included); permanent washable filter offered as accessory",
            "key": "filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Goodman",
    "model": "AVPEC",
    "equip": "Air Handler",
    "summary": "Multi-position, variable-speed ECM air handler with an internal Electronic Expansion Valve (EEV), 2-5 tons. Communicating (ComfortBridge) and inverter-compatible — the matched indoor unit for Goodman/Amana variable-capacity communicating outdoor systems such as the AVXC20 condenser line.",
    "match": [
      "Amana AVPEC"
    ],
    "source": "Goodman SS-GAVPEC (AVPEC product specifications, goodmanmfg.com, 8/21)",
    "flags": [
      {
        "title": "Goodman: EEV units store their own fault history",
        "body": "AVPEC's ComfortBridge control keeps a fault recall log of the six most recent faults, and commissioning/diagnostics run over onboard Bluetooth via the CoolCloud app rather than DIP-switch airflow setup. Pull the fault-recall log first on a communicating-system callback instead of guessing from symptoms, and confirm the outdoor unit is a matched inverter/communicating model (e.g. AVXC-series) before troubleshooting as a standalone air handler."
      }
    ],
    "groups": [
      {
        "title": "Blower / Airflow",
        "rows": [
          {
            "label": "Blower motor",
            "value": "Variable-speed ECM, communicating (ComfortBridge); onboard CFM indicator",
            "key": "blower"
          },
          {
            "label": "Airflow setup",
            "value": "Set/commissioned via ComfortBridge communicating control (CoolCloud app over onboard Bluetooth), not field dip switches; provides adjustable low CFM for fan-only operation",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static pressure",
            "value": "Not published as a single figure — see rating plate",
            "key": "max_esp"
          },
          {
            "label": "Cabinet air leakage",
            "value": "<2.0% at 1.0\" w.c. and <1.4% at 0.5\" w.c. per ASHRAE 193",
            "key": "leakage"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heat kit range",
            "value": "3-25 kW electric heater kits (HKS)",
            "key": "heat_kw"
          }
        ]
      },
      {
        "title": "Metering & Drain",
        "rows": [
          {
            "label": "Metering device",
            "value": "Factory-installed Electronic Expansion Valve (EEV) — suitable for operation with inverter-driven/communicating outdoor products; match to AVXC-series or other ComfortBridge-communicating condensers/heat pumps",
            "key": "metering"
          },
          {
            "label": "Coil",
            "value": "All-aluminum evaporator coil, multi-position (horizontal or vertical)",
            "key": "coil"
          },
          {
            "label": "Drain pan",
            "value": "DecaBDE-free thermoplastic drain pan with secondary drain connection; no factory float switch called out — see rating plate/install manual for field kit",
            "key": "drain"
          },
          {
            "label": "Filter",
            "value": "Tool-less built-in filter rack, 1\" filter",
            "key": "filter"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Rheem",
    "model": "R95T / R95TA",
    "equip": "Gas Furnace",
    "summary": "95% AFUE SINGLE-stage condensing furnace, Constant Torque ECM blower, PlusOne Ignition (DSI) and PlusOne blocked-drain sensor. Same model-number platform is marketed by Ruud as \"Achiever Plus\" (identical R95TA model numbers, not a separate Ruud number) — do not confuse with the genuinely two-stage R96T.",
    "match": [
      "R95TA0401317MSA",
      "R95TA0601317MSA",
      "R95TA0701317MSA",
      "R95TA0851521MSA",
      "R95TA1001521MSA",
      "R95TA1151524MSA",
      "Ruud Achiever Plus R95T (identical R95TA model numbers, twin-branded)"
    ],
    "source": "Ruud Achiever Plus / Rheem Classic Plus R95T Series spec sheet, Form No. G22-538, pts.myrheem.com (Gas_Furnace/R95TA/R95TA_G22-538_Rev0-B.pdf)",
    "flags": [
      {
        "title": "Canadian-only altitude derate method",
        "body": "For Canadian installations only, an optional derate (manifold gas pressure reduction) method may be used to adjust the furnace for altitude. This optional method may NOT be used for U.S. installations — U.S. installs require the orifice change per the installation instructions."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "see rating plate — not published in this spec sheet; full install-instructions PDF (>30MB) not retrievable this session",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure (LP)",
            "value": "see rating plate",
            "key": "manifold_lp"
          },
          {
            "label": "Supply pressure (NG/LP)",
            "value": "see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "see rating plate",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "24V gas valve with integral pressure regulator and supply/manifold test ports (shown in equipment diagram); exact make/model not confirmed",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Min external static",
            "value": "0.18–0.28 in. W.C. (varies by size, 040–115)",
            "key": "min_static"
          },
          {
            "label": "Max external static",
            "value": "0.9 in. W.C. (all sizes)",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "25–55°F (040) up to 45–75°F (115) — size-specific, confirm exact range on rating plate",
            "key": "temp_rise"
          },
          {
            "label": "AFUE",
            "value": "95.00%",
            "key": "afue"
          }
        ]
      },
      {
        "title": "Ignition/diagnostics",
        "rows": [
          {
            "label": "Ignitor type",
            "value": "PlusOne Ignition System — Direct Spark Ignition (DSI), remote flame sensor; not a hot-surface ignitor, so no ohm spec applies",
            "key": "ignitor"
          },
          {
            "label": "Flame sense",
            "value": "Board carries flame-sense current diagnostics — read the 7-segment fault code; no fixed µA spec published",
            "key": "flame_sense"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset rollout switch(es) plus limit control; PlusOne patented Blocked Drain Sensor on condensate side",
            "key": "rollout"
          },
          {
            "label": "Altitude derate",
            "value": "10% high-altitude output derate published (Canadian installs); see installation instructions for required orifice change on U.S. installs above 2,000 ft",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Rheem",
    "model": "R92T / R92P",
    "equip": "Gas Furnace",
    "summary": "92% AFUE SINGLE-stage condensing furnace (not two-stage, despite some third-party listings). R92P uses a PSC blower motor; R92T is the Constant Torque ECM variant of the same platform — identical cabinet, AFUE, and airflow/temp-rise tables. Both are Rheem Classic(Plus) branded; Ruud markets the same platform under matching R92P/R92T model numbers.",
    "match": [
      "R92PA0401317MSA",
      "R92PA0601317MSA",
      "R92PA0701317MSA",
      "R92PA0851521MSA",
      "R92PA1001521MSA",
      "R92PA1151524MSA",
      "R92TA (Constant Torque ECM variant, same platform/model-number series)",
      "Ruud R92P/R92T (shared model numbers, twin-branded)"
    ],
    "source": "Rheem Classic Series R92P spec sheet, Form No. G11-536 Rev.1, pts.myrheem.com (Gas_Furnace/R92P/R92P_G11-536_Rev1.pdf)",
    "flags": [
      {
        "title": "California low-NOx compliance",
        "body": "Standard model complies with California low-NOx requirements per the spec sheet — confirm the CARB-compliant SKU is used when replacing equipment in a regulated region."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "see rating plate — not published in this spec sheet; full install-instructions PDF exceeded retrieval size limit this session",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure (LP)",
            "value": "see rating plate",
            "key": "manifold_lp"
          },
          {
            "label": "Supply pressure (NG/LP)",
            "value": "see rating plate",
            "key": "supply_pressure"
          },
          {
            "label": "Orifice",
            "value": "see rating plate",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "24V gas valve with integral pressure regulator and supply/manifold test ports (shown in equipment diagram); exact make/model not confirmed",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Min external static",
            "value": "0.18–0.28 in. W.C. (varies by size, 040–115)",
            "key": "min_static"
          },
          {
            "label": "Max external static",
            "value": "0.8 in. W.C. (all sizes)",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "25–55°F (040) up to 45–75°F (115) — size-specific, confirm exact range on rating plate",
            "key": "temp_rise"
          },
          {
            "label": "AFUE",
            "value": "92.00%",
            "key": "afue"
          }
        ]
      },
      {
        "title": "Ignition/diagnostics",
        "rows": [
          {
            "label": "Ignitor type",
            "value": "PlusOne Ignition System — Direct Spark Ignition (DSI), remote flame sensor; not a hot-surface ignitor, so no ohm spec applies",
            "key": "ignitor"
          },
          {
            "label": "Flame sense",
            "value": "Board carries flame-sense current diagnostics — read the 7-segment fault code; no fixed µA spec published",
            "key": "flame_sense"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "Manual-reset rollout switch(es) plus limit control; PlusOne patented Blocked Drain Sensor on condensate side",
            "key": "rollout"
          },
          {
            "label": "Altitude derate",
            "value": "10% high-altitude output derate published (Canadian installs); see installation instructions for required orifice change on U.S. installs above 2,000 ft",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace90"
  },
  {
    "brand": "Rheem",
    "model": "R801S / R801P",
    "equip": "Gas Furnace",
    "summary": "80% AFUE single-stage NON-condensing furnace on the older UT Electronic Controls (UTEC) platform — the pre-Bluetooth generation, distinct from the current R801/R802 Bluetooth-diagnostic lineup already covered. Upflow/Horizontal and Downflow variants (also badged 80DSS/80DSP) share the same installation instructions and gas/electrical specs; R801S and R801P are identical except cabinet width options.",
    "match": [
      "R801SA*MSA (upflow/horizontal & downflow)",
      "R801PA*MSA",
      "80DSS*/80DSP* (same platform, alternate badge)",
      "Ruud equivalent shares same R801S/R801P model numbers"
    ],
    "source": "Rheem Installation Instructions for Downflow Single Stage Gas Furnaces (-)801S/(-)801P/(-)(-)80DSS/(-)(-)80DSP, Form 92-24161-143-03 (Supersedes 92-24161-143-02), pts.rheem.com (Gas_Furnace/IO/92-24161-143-03_801S_801P.pdf) — confirms myrheem.com/myruud.com as the parts reference",
    "flags": [
      {
        "title": "Only ONE rollout switch on this platform",
        "body": "(-)801S/(-)801P require only ONE flame roll-out manual-reset switch, on the LEFT side of the burner cover plate — unlike larger Rheem platforms that use two. Confirm switch count/location before ordering a replacement part."
      }
    ],
    "groups": [
      {
        "title": "Gas",
        "rows": [
          {
            "label": "Manifold pressure (NG)",
            "value": "3.5 in. W.C. (±0.3 in.)",
            "key": "manifold_ng"
          },
          {
            "label": "Manifold pressure (LP)",
            "value": "10.0 in. W.C.",
            "key": "manifold_lp"
          },
          {
            "label": "Supply pressure (NG)",
            "value": "5.0–10.5 in. W.C. (5.0 min for input adjustment, 6–7 in. recommended)",
            "key": "supply_ng"
          },
          {
            "label": "Supply pressure (LP)",
            "value": "11.0–13.0 in. W.C. (min 11.0)",
            "key": "supply_lp"
          },
          {
            "label": "Orifice",
            "value": "Factory-default #42 (NG, sized for 1050 Btu/cu.ft. sea-level gas); altitude/heating-value reselection per Table 9 (NG) and Table 10 (LP, #54 0–7,000 ft / #55 7,000–10,000 ft)",
            "key": "orifice"
          },
          {
            "label": "Gas valve",
            "value": "24V slow-opening gas valve (Honeywell, per diagram) with integral pressure regulator and supply/manifold test ports; takes 2–3 sec to fully open",
            "key": "gas_valve"
          }
        ]
      },
      {
        "title": "Air",
        "rows": [
          {
            "label": "Max external static",
            "value": "see rating plate — total system static drop should not exceed 0.8 in. W.C. per install instructions; not populated on the sample nameplate in this doc",
            "key": "max_static"
          },
          {
            "label": "Temperature rise range",
            "value": "Example on sample rating plate (R801PA075417ZSA, 75,000 Btuh): 25–55°F — size-specific, confirm on the actual unit's rating plate",
            "key": "temp_rise"
          },
          {
            "label": "AFUE",
            "value": "80% (non-condensing, Category I)",
            "key": "afue"
          }
        ]
      },
      {
        "title": "Ignition/diagnostics",
        "rows": [
          {
            "label": "Ignitor type",
            "value": "Direct Spark Ignition (DSI) via UT Electronic Controls integrated board; not a hot-surface ignitor, so no ohm spec applies",
            "key": "ignitor"
          },
          {
            "label": "Flame sense",
            "value": "Flame proven by rectification 8 sec after gas valve opens; board reports fault code 12 (low flame sense) / 13 (flame lost) — no fixed µA spec published",
            "key": "flame_sense"
          }
        ]
      },
      {
        "title": "Safeties",
        "rows": [
          {
            "label": "Rollout/limit",
            "value": "MRLC (Manual Reset Limit Control, aka rollout) — fault code 33; single switch, left side of burner cover plate. Over-temperature limit and pressure switch also monitored (fault codes 22, 55/57)",
            "key": "rollout"
          },
          {
            "label": "Altitude derate",
            "value": "Ready for 0–4,999 ft as shipped; 5,000–10,000 ft requires manifold pressure/orifice change per Table 9 (NG) and Table 10 (LP) — pressure switch kit 903853 required above 5,000 ft",
            "key": "altitude_derate"
          }
        ]
      }
    ],
    "checklist": "furnace80"
  },
  {
    "brand": "Rheem",
    "model": "RP16 Series",
    "equip": "Heat Pump",
    "summary": "Classic Series two-stage split heat pump, R-410A, up to 16 SEER/13 EER, single-row 7mm condenser coil, scroll compressor. Ruud sells this identical platform under the same model number.",
    "match": [
      "Ruud RP16 Series (identical model number, Ruud-branded literature)",
      "2, 3, 4, 5 ton"
    ],
    "source": "files.myrheem.com Product Documents B5265097-4CA1-4CC8-AD6F-AB42CF320654.pdf (Rheem Classic Series Two-Stage Heat Pump spec sheet, Form P11-813 Rev.3); pts.rheem.com .../HP/RP16/92-105074-12-01_RP16_IO.pdf (RP16 Installation Instructions, Doc 92-105074-12 Rev.01)",
    "flags": [
      {
        "title": "Confirm refrigerant before connecting gauges",
        "body": "RP16 is an R-410A-only legacy platform. Confirm refrigerant type on the unit nameplate before attaching manifold gauges — do not assume compatibility with R-454B (A2L) service tools/recovery equipment used on newer Endeavor Line units."
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
            "value": "TXV (field/factory installed, model-dependent)",
            "key": "metering"
          },
          {
            "label": "Filter drier",
            "value": "Shipped loose for field installation",
            "key": "filter_drier"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand Defrost Control (coil temp + compressor run time)",
            "key": "defrost_type"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in heating mode (per shared platform wiring diagram notes)",
            "key": "rv_energized"
          }
        ]
      },
      {
        "title": "Pressure Switches (standard)",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Auto-reset: opens (cutout) ~610 PSIG, closes (cutin) ~420 PSIG",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Auto-reset: opens (cutout) ~15 PSIG, closes (cutin) ~40 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Cooling low-ambient (standard)",
            "value": "Rated to 55°F outdoor ambient without accessories",
            "key": "low_ambient_std"
          },
          {
            "label": "Low Ambient Kit (optional)",
            "value": "Extends cooling operation to 0°F; cycles outdoor fan off at ~250 PSIG head pressure; Rheem recommends use below 70°F ambient",
            "key": "low_ambient_kit"
          },
          {
            "label": "Crankcase heater",
            "value": "Optional accessory on some capacities; energize 12 hrs before startup after extended shutdown",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging & Diagnostics",
        "rows": [
          {
            "label": "Charging method",
            "value": "See unit nameplate / charging chart on service panel — do not invent a superheat/subcooling target",
            "key": "charging"
          },
          {
            "label": "EcoNet/VSODU",
            "value": "RP16 (plain, non-AZ) is not EcoNet-enabled; two-stage staged scroll only",
            "key": "econet_note"
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
    "model": "RP13 Series (shared platform with RP14/RP15)",
    "equip": "Heat Pump",
    "summary": "Classic Series single-stage split heat pump, R-410A, 13 SEER. Rheem publishes RP13, RP14 and RP15 under one shared installation/service manual — same controls, pressure switches and defrost logic across the tier.",
    "match": [
      "WeatherKing WP14 (confirmed shared-platform doc; WP13/WP15 not independently verified)",
      "1.5 to 5 ton"
    ],
    "source": "pts.rheem.com .../HP/IO/92-105074-04-10_RP13_RP14_RP15.pdf (R-410A Heat Pump Outdoor Units Installation Instructions (-)P14/(-)P15, Doc 92-105074-04 Rev.10, filename covers RP13_RP14_RP15); my.rheem.com/pts/HP/RP13/RP13_IO.asp (document index confirming RP13 uses this manual)",
    "flags": [
      {
        "title": "Demand defrost sensor failure behavior differs by sensor",
        "body": "If the outdoor coil sensor fails, the demand defrost control will NOT initiate defrost at all (silent no-heat-in-cold-weather complaint). If the ambient sensor fails instead, the control defaults to a fixed defrost every 34 minutes of compressor runtime with coil temp below 35°F. Check sensor resistance before condemning the defrost board."
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
            "value": "TXV or EEV at indoor unit (per matched indoor coil)",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost & Reversing Valve",
        "rows": [
          {
            "label": "Defrost type",
            "value": "Demand Defrost Control — initiates when outdoor coil temp is below 35°F AND compressor has run 34+ minutes at that coil temp AND the ambient/coil differential trips",
            "key": "defrost_type"
          },
          {
            "label": "Defrost termination",
            "value": "Terminates on time (14 minutes max) or on termination temperature, whichever occurs first",
            "key": "defrost_term"
          },
          {
            "label": "Reversing valve",
            "value": "Energized in heating mode (wiring diagram note: \"component energized in heating mode\")",
            "key": "rv_energized"
          }
        ]
      },
      {
        "title": "Pressure Switches (standard on (-)P14; confirm on P13/P15 nameplate)",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Auto-reset: opens (cutout) ~610 PSIG, closes (cutin) ~420 PSIG",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Auto-reset: opens (cutout) ~15 PSIG, closes (cutin) ~40 PSIG",
            "key": "lp_switch"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Low Ambient Control (LAC), P/N RXAD-A08",
            "value": "Senses compressor head pressure; cycles outdoor fan off at ~250 PSIG to hold head pressure at low ambient; rated to 0°F; Rheem recommends use below 70°F ambient",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "Some capacities factory-installed; add for units with a low ambient kit; energize 12 hrs before startup after extended shutdown",
            "key": "crankcase_heater"
          },
          {
            "label": "Anti-short-cycle",
            "value": "Time-guard keeps compressor off min. 5 minutes after a power interruption or thermostat cycle",
            "key": "anti_short_cycle"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Weigh-in to nameplate charge for 15 ft. line set; use charging chart on service panel for longer runs — see rating plate",
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
    "model": "RA13 Series (shared platform with RA14/RA16)",
    "equip": "Condenser",
    "summary": "Classic Series split air conditioner, R-410A, 13-16 SEER family. Rheem publishes RA13, RA14 and RA16 under one shared installation/service manual — identical controls, pressure switches and low-ambient accessory across the tier. Ruud markets the identical unit under the same RA13 model number.",
    "match": [
      "Ruud RA13 Series (identical model number, Ruud-branded literature confirmed)",
      "WeatherKing WA13 (confirmed shared-platform doc index page)",
      "1.5 to 5 ton"
    ],
    "source": "files.myrheem.com Product Documents 7DF54289-1B36-40E5-B20D-59C343AC1B0C.pdf (Ruud Achiever Series Air Conditioners RA13 spec sheet); pts.rheem.com .../AC/IO/92-104921-09-08_RA13_RA14_RA16.pdf (Air Cooled Condensing Units Installation Instructions (-)A13/(-)A14/(-)A16, Doc 92-104921-09 Rev.08)",
    "flags": [
      {
        "title": "Cooling below 55°F requires the low-ambient accessory",
        "body": "As shipped, this platform is only rated for cooling operation to 55°F outdoor ambient. Running the condenser below that without the factory Low Ambient Control kit (and crankcase heater) risks head-pressure collapse, compressor flooding, and nuisance low-pressure trips — don't assume every unit in the field has the kit installed."
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
            "value": "TXV or EEV on the indoor unit (per matched indoor coil)",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches (available factory or field-installed; confirm on SKU/nameplate)",
        "rows": [
          {
            "label": "High pressure switch",
            "value": "Auto-reset: opens (cutout) ~610 PSIG, closes (cutin) ~420 PSIG",
            "key": "hp_switch"
          },
          {
            "label": "Low pressure switch",
            "value": "Auto-reset: opens (cutout) ~15 PSIG, closes (cutin) ~40 PSIG",
            "key": "lp_switch"
          },
          {
            "label": "Diagnostic service window",
            "value": "Two-fastener opening gives access to install/read high and low pressure switches without full panel removal",
            "key": "diag_window"
          }
        ]
      },
      {
        "title": "Low Ambient & Crankcase Heater",
        "rows": [
          {
            "label": "Cooling low-ambient (standard)",
            "value": "Rated to 55°F outdoor ambient without accessories",
            "key": "low_ambient_std"
          },
          {
            "label": "Low Ambient Control (LAC), P/N RXAD-A08",
            "value": "Senses compressor head pressure; cycles outdoor fan off at ~250 PSIG; extends cooling to 0°F; Rheem recommends use below 70°F ambient",
            "key": "low_ambient_kit"
          },
          {
            "label": "Crankcase heater",
            "value": "Recommended whenever a Low Ambient Kit is installed; not required on most scroll-compressor RA13 units otherwise",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "Charging",
        "rows": [
          {
            "label": "Charging method",
            "value": "Factory charge covers 15 ft. line set; use line-length charge adjustment table for longer runs — see rating plate/charging chart",
            "key": "charging"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Rheem",
    "model": "RP18AZ / RP16AZ / RP15AZ / RP14AZ (Endeavor Line, current catalog)",
    "equip": "Heat Pump",
    "summary": "Current Rheem Endeavor Line heat pump tiers (Prestige/Classic Plus/Classic series) as listed live on rheem.com in Aug 2026. The RH20AZ/RH17AZ/RH15AZ model numbers requested were NOT found in any published Rheem literature — no \"RH\"-prefixed heat pump line exists. These RP-prefixed AZ models are the closest real, currently-published Endeavor Line equivalents (RP18AZ = top tier, RP16AZ = mid two-stage/inverter, RP15AZ/RP14AZ = entry tiers).",
    "match": [
      "Ruud UP16AZ (confirmed live on ruud.com for the AZ mid-tier)",
      "WeatherKing WP15AZ/WP14AZ platform naming pattern (not independently verified per-SKU)",
      "2 to 5 ton (RP14AZ/RP15AZ: 1.5 to 5 ton)"
    ],
    "source": "rheem.com/products/residential/heating-and-cooling/heat-pumps/ (live Rheem product catalog, accessed 2026-08-31) and individual model pages (e.g. rheem.com/product/... RP18AZ, RP16AZ, RP15AZ, RP14AZ)",
    "flags": [
      {
        "title": "Refrigerant type not consistently published per SKU — verify nameplate",
        "body": "Rheem's Endeavor Line sells parallel AY- and AZ-suffix SKUs per tier. The catalog explicitly labels the AY-suffix siblings (e.g. RD18AY, RA15AY, RA14AY) as \"R-454B Refrigerant,\" but the AZ-suffix cards reviewed do not state a refrigerant type. Do NOT assume R-410A or R-454B on an AZ-suffix unit — confirm on the nameplate/A2L placard before selecting recovery equipment, gauges, or leak-detection method."
      }
    ],
    "groups": [
      {
        "title": "Efficiency & Platform (as published)",
        "rows": [
          {
            "label": "RP18AZ (Prestige)",
            "value": "Up to 20 SEER2 / 12.5 EER2 / 8.5 HSPF2, EcoNet Enabled, 2-5 ton",
            "key": "rp18az"
          },
          {
            "label": "RP16AZ (Classic Plus)",
            "value": "Up to 17 SEER2 / 10.4 EER2 / 8.1 HSPF2, EcoNet Enabled, 1.5-5 ton",
            "key": "rp16az"
          },
          {
            "label": "RP15AZ (Classic Plus)",
            "value": "Up to 16 SEER2 / 11.7 EER2 / 8.1 HSPF2, not EcoNet-enabled, 1.5-5 ton",
            "key": "rp15az"
          },
          {
            "label": "RP14AZ (Classic)",
            "value": "Up to 14.3 SEER2 / 10.4 EER2 / 7.6 HSPF2, not EcoNet-enabled, 1.5-5 ton",
            "key": "rp14az"
          }
        ]
      },
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "See rating plate / A2L placard — not stated per-SKU in reviewed catalog copy",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "See rating plate / service manual — not stated in reviewed catalog copy",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Defrost, Reversing Valve & Pressure Switches",
        "rows": [
          {
            "label": "Defrost type/interval",
            "value": "See rating plate / service manual — not published in the marketing literature reviewed; not verified for this generation",
            "key": "defrost_type"
          },
          {
            "label": "Reversing valve energized mode",
            "value": "See service manual — not confirmed for this generation (legacy Rheem platforms energize in heating mode; not verified to carry over)",
            "key": "rv_energized"
          },
          {
            "label": "High/low pressure switch cutout/cutin",
            "value": "See rating plate — not published in reviewed literature",
            "key": "pressure_switches"
          }
        ]
      },
      {
        "title": "Low Ambient, Crankcase Heater & EcoNet",
        "rows": [
          {
            "label": "Low ambient lockout",
            "value": "See rating plate — not published in reviewed literature",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate — not published in reviewed literature",
            "key": "crankcase_heater"
          },
          {
            "label": "EcoNet/VSODU",
            "value": "RP18AZ and RP16AZ are EcoNet Enabled per catalog; RP15AZ and RP14AZ are not",
            "key": "econet_note"
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
    "model": "RA18AZ / RA16AZ / RA15AZ / RA14AZ / RA13NZ (Endeavor Line, current catalog)",
    "equip": "Condenser",
    "summary": "Current Rheem Endeavor Line air conditioner tiers (Prestige/Classic Plus/Classic series) as listed live on rheem.com in Aug 2026. RA15AZ and RA14AZ are exact matches to the requested Endeavor R-454B line; no RA17AZ exists — RA16AZ (17 SEER2) is the closest real, currently-published equivalent, with RA18AZ as the top inverter tier.",
    "match": [
      "1.5 to 5 ton (RA15AZ/RA16AZ/RA18AZ: 2 to 5 ton)"
    ],
    "source": "rheem.com/products/residential/heating-and-cooling/air-conditioners/ (live Rheem product catalog, accessed 2026-08-31) and individual model page rheem.com/product/rheem-ra14az-endeavor-line-classic-series-air-conditioner-ra14az30aj1nalhp/",
    "flags": [
      {
        "title": "Refrigerant type not consistently published per SKU — verify nameplate",
        "body": "As with the Endeavor heat pumps, the AY-suffix AC siblings (RA16AY, RA15AY, RA14AY) are explicitly labeled \"R-454B Refrigerant\" in Rheem's catalog, but the AZ-suffix cards (RA14AZ, RA15AZ, RA16AZ, RA18AZ) reviewed do not state a refrigerant type, and RA13NZ/RA13NY are only marked \"meets energy standards for Northern regions.\" Confirm refrigerant on the nameplate/A2L placard before servicing — do not assume R-410A or R-454B from the model number alone."
      }
    ],
    "groups": [
      {
        "title": "Efficiency & Platform (as published)",
        "rows": [
          {
            "label": "RA18AZ (Prestige)",
            "value": "Up to 20 SEER2 / 13 EER2, EcoNet Enabled, inverter-driven variable-speed compressor, 2-5 ton",
            "key": "ra18az"
          },
          {
            "label": "RA16AZ (Classic Plus)",
            "value": "Up to 17 SEER2 / 10.5 EER2, EcoNet Enabled, inverter-driven variable-speed twin-rotary compressor, 7mm coil, 2-5 ton",
            "key": "ra16az"
          },
          {
            "label": "RA15AZ (Classic Plus)",
            "value": "Up to 15.2 SEER2 / 9.8 EER2, EcoNet Enabled, inverter-driven variable-speed twin-rotary compressor, 7mm coil, 2-5 ton",
            "key": "ra15az"
          },
          {
            "label": "RA14AZ (Classic)",
            "value": "Up to 16 SEER2 / 13 EER2, not EcoNet-enabled, single-stage compressor, 7mm coil, 1.5-5 ton",
            "key": "ra14az"
          },
          {
            "label": "RA13NZ (Classic, Northern-region)",
            "value": "Up to 15.2 SEER2 / 12 EER2, single-stage, 1.5-5 ton",
            "key": "ra13nz"
          }
        ]
      },
      {
        "title": "Refrigerant & Metering",
        "rows": [
          {
            "label": "Refrigerant",
            "value": "See rating plate / A2L placard — not stated per-SKU in reviewed catalog copy",
            "key": "refrigerant"
          },
          {
            "label": "Metering device",
            "value": "See rating plate / service manual — not stated in reviewed catalog copy",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Pressure Switches & Low Ambient",
        "rows": [
          {
            "label": "High/low pressure switch cutout/cutin",
            "value": "See rating plate — not published in reviewed literature",
            "key": "pressure_switches"
          },
          {
            "label": "Low ambient cooling operation",
            "value": "See rating plate / service manual — not published in reviewed literature for this generation",
            "key": "low_ambient"
          },
          {
            "label": "Crankcase heater",
            "value": "See rating plate — not published in reviewed literature",
            "key": "crankcase_heater"
          }
        ]
      },
      {
        "title": "EcoNet",
        "rows": [
          {
            "label": "EcoNet/VSODU",
            "value": "RA18AZ, RA16AZ and RA15AZ are EcoNet Enabled per catalog; RA14AZ and RA13NZ are not",
            "key": "econet_note"
          }
        ]
      }
    ],
    "checklist": "heatpump"
  },
  {
    "brand": "Rheem",
    "model": "RBHP",
    "equip": "Air Handler",
    "summary": "RBHP-Series high-efficiency air handler, R-410A only. X-13 (ECM) constant-torque motor with 5 field-selectable speed taps, factory shipped connected on Tap 5 (high). Standard/optional electric heat kits built into the blower housing. 35\" tall, 4-way convertible (upflow/downflow/horizontal L or R). Ruud badges the identical platform under the same RBHP model code. Companion hydronic/electric variant RBHK was not independently located in Rheem/Ruud literature this pass - do not assume RBHP figures apply to it; confirm via rating plate.",
    "match": [
      "RBHP"
    ],
    "source": "Rheem RBHP-Series Air Handler Spec Sheet, FORM NO. H11-544 REV. 3, files.myrheem.com (Rheem Manufacturing Co.)",
    "flags": [
      {
        "title": "R-410A platform only",
        "body": "RBHP is built for R-410A systems (RCHL-series coils) and is NOT rated for R-454B/A2L outdoor units. Confirm refrigerant type on the rating plate before matching to an outdoor condenser - do not pair with an R-454B (Y-series) system."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "X-13 (ECM) constant-torque motor, 5 speeds",
            "key": "blower_type"
          },
          {
            "label": "Airflow setup",
            "value": "Field-selectable motor speed tap (2-5) wired at the control board per cabinet size/tonnage and heat kW - see Airflow Performance Data table for correct tap. Shipped from factory on Tap 5 (high).",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static",
            "value": "Optimum operating range 0.2\"-0.5\" W.C.; performance data published from 0.1\" to 1.0\" W.C.",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "Permanent washable filter, framed in unit filter rack. Sizes: 17\"cab 16-1/4x21\", 21\"cab 19-3/4x21\", 24\"/25\"cab 23-1/4x21\" (part nos. 54-23217-02/03/04).",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heat kit staging",
            "value": "Model-code heat kW: 06=4.9kW, 07=7.0kW, 11=10.0kW (single circuit, up to 3 elements). Circuit breaker standard on kits above 11kW for UL/cUL service-disconnect.",
            "key": "heat_kit"
          },
          {
            "label": "Max heat rise",
            "value": "85°F (17\" cab) down to 65°F (24\"/25\" cab) - see cabinet-size table for exact CFM/rise limits.",
            "key": "max_heat_rise"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Internal check TXV on the RCHL factory-matched indoor coil (R-410A only).",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Molded polymer corrosion-resistant condensate pan on all coils with PVC condensate elbow standard. External auxiliary horizontal drain pan (RXBM-AA06) fits all sizes as accessory. No factory float switch documented in this literature - verify against local code.",
            "key": "drain"
          }
        ]
      }
    ],
    "checklist": "airhandler"
  },
  {
    "brand": "Rheem",
    "model": "RH1PY",
    "equip": "Air Handler",
    "summary": "Endeavor-line PSC single-stage air handler for R-454B (A2L) systems only, form H22-589 Rev.2 (Ruud-badged; identical RH1PY model code used by Rheem). 4-way convertible, aluminum coil, TXV metering, field-installed RXBH- electric heat kits. Companion two-stage constant-torque RH2TY exists in the same Endeavor line, but no RH2P (PSC) model was found published - Rheem's Endeavor two-stage air handler is RH2TY, not RH2P; treat RH2P as not a real/current model number.",
    "match": [
      "RH1PY"
    ],
    "source": "Rheem/Ruud Endeavor Line Air Handlers RH1PY Spec Sheet, FORM NO. H22-589 REV. 2, files.myrheem.com (Rheem Manufacturing Co.)",
    "flags": [
      {
        "title": "R-454B / A2L refrigerant",
        "body": "RH1PY is R-454B (mildly flammable A2L) only - confirm the PlusOne refrigerant detection sensor (factory or field-installed) is present and functional before servicing, and never mix components with an R-410A system. Match indoor/outdoor units by refrigerant type stamped on the rating plate, not by cabinet appearance."
      }
    ],
    "groups": [
      {
        "title": "Blower & Airflow",
        "rows": [
          {
            "label": "Blower type",
            "value": "PSC motor, 2-speed (Low/High)",
            "key": "blower_type"
          },
          {
            "label": "Airflow setup",
            "value": "2-speed tap selection via low-voltage wiring at the control board (no dip switches). Airflow range is fixed per cabinet/tonnage - see Airflow Performance Data tables (e.g. 1817S: 517-711 CFM; 4821S/4824S: 1395-1824 CFM).",
            "key": "airflow_setup"
          },
          {
            "label": "Max external static",
            "value": "Optimum operating range 0.3\"-0.7\" W.C.; performance data published from 0.1\" to 1.0\" W.C. Coil-only units: minimum 0.1\" W.C.",
            "key": "max_esp"
          }
        ]
      },
      {
        "title": "Filter",
        "rows": [
          {
            "label": "Filter",
            "value": "Filter size/part number not published in this spec sheet - see rating plate or installation instructions.",
            "key": "filter"
          }
        ]
      },
      {
        "title": "Electric Heat",
        "rows": [
          {
            "label": "Heat kit staging",
            "value": "Field-installed RXBH- kits, single or multiple-circuit, ranging 2.25/3.0kW up to 18.0/24.0kW depending on cabinet size (jumper kits RXBJ-A21/A31 convert multi-circuit kits to a single supply circuit). Kits include UL/cUL service-disconnect circuit breakers.",
            "key": "heat_kit"
          }
        ]
      },
      {
        "title": "Metering & Refrigerant",
        "rows": [
          {
            "label": "Metering device",
            "value": "Thermal Expansion Valve (TXV), standard. R-454B only - must be matched to an R-454B (\"Y\") outdoor unit, not R-410A.",
            "key": "metering"
          }
        ]
      },
      {
        "title": "Drain",
        "rows": [
          {
            "label": "Drain pan",
            "value": "Vertical drain pan with primary drain plus auxiliary upflow/downflow and horizontal drain connections; double-coil cabinet variants available. No float switch documented in this spec sheet.",
            "key": "drain"
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
