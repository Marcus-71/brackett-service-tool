// Manufacturer charging charts, transcribed from the service literature in
// our own manual library. These are the published tables a tech should charge
// to when the unit in front of them is covered - they beat the generic rules
// of thumb the calculator falls back on.
//
// Every table was re-extracted from its page three ways (-layout, -raw and
// -table) and accepted only when all three agreed, because column-scrambled
// PDF text silently pairs a number with the wrong row. Tables that could not
// be read unambiguously were left out rather than guessed at.
const CHARGING_CHARTS = [
 {
  "id": "cc-goodman-amana-r410a-required-liquid-line-temperature",
  "brand": "Goodman / Amana (Daikin Comfort Technologies)",
  "refrigerant": "R-410A",
  "meteringDevice": "both",
  "models": "ANX, SSX, ASX, GSX, DSX, VSX condensing units and ANZ, SSZ, ASZ, GSZ, DSZ, VSZ split system heat pumps with R-410A refrigerant",
  "chartType": "pressure-table",
  "rowAxis": "liquid pressure at service valve (PSIG)",
  "colAxis": "required subcooling temperature (F)",
  "units": "rows PSIG; columns F of subcooling; cell values F (required liquid line temperature)",
  "rows": [
   {
    "row": "189",
    "values": {
     "8": "58",
     "10": "56",
     "12": "54",
     "14": "52",
     "16": "50",
     "18": "48"
    }
   },
   {
    "row": "195",
    "values": {
     "8": "60",
     "10": "58",
     "12": "56",
     "14": "54",
     "16": "52",
     "18": "50"
    }
   },
   {
    "row": "202",
    "values": {
     "8": "62",
     "10": "60",
     "12": "58",
     "14": "56",
     "16": "54",
     "18": "52"
    }
   },
   {
    "row": "208",
    "values": {
     "8": "64",
     "10": "62",
     "12": "60",
     "14": "58",
     "16": "56",
     "18": "54"
    }
   },
   {
    "row": "215",
    "values": {
     "8": "66",
     "10": "64",
     "12": "62",
     "14": "60",
     "16": "58",
     "18": "56"
    }
   },
   {
    "row": "222",
    "values": {
     "8": "68",
     "10": "66",
     "12": "64",
     "14": "62",
     "16": "60",
     "18": "58"
    }
   },
   {
    "row": "229",
    "values": {
     "8": "70",
     "10": "68",
     "12": "66",
     "14": "64",
     "16": "62",
     "18": "60"
    }
   },
   {
    "row": "236",
    "values": {
     "8": "72",
     "10": "70",
     "12": "68",
     "14": "66",
     "16": "64",
     "18": "62"
    }
   },
   {
    "row": "243",
    "values": {
     "8": "74",
     "10": "72",
     "12": "70",
     "14": "68",
     "16": "66",
     "18": "64"
    }
   },
   {
    "row": "251",
    "values": {
     "8": "76",
     "10": "74",
     "12": "72",
     "14": "70",
     "16": "68",
     "18": "66"
    }
   },
   {
    "row": "259",
    "values": {
     "8": "78",
     "10": "76",
     "12": "74",
     "14": "72",
     "16": "70",
     "18": "68"
    }
   },
   {
    "row": "266",
    "values": {
     "8": "80",
     "10": "78",
     "12": "76",
     "14": "74",
     "16": "72",
     "18": "70"
    }
   },
   {
    "row": "274",
    "values": {
     "8": "82",
     "10": "80",
     "12": "78",
     "14": "76",
     "16": "74",
     "18": "72"
    }
   },
   {
    "row": "283",
    "values": {
     "8": "84",
     "10": "82",
     "12": "80",
     "14": "78",
     "16": "76",
     "18": "74"
    }
   },
   {
    "row": "291",
    "values": {
     "8": "86",
     "10": "84",
     "12": "82",
     "14": "80",
     "16": "78",
     "18": "76"
    }
   },
   {
    "row": "299",
    "values": {
     "8": "88",
     "10": "86",
     "12": "84",
     "14": "82",
     "16": "80",
     "18": "78"
    }
   },
   {
    "row": "308",
    "values": {
     "8": "90",
     "10": "88",
     "12": "86",
     "14": "84",
     "16": "82",
     "18": "80"
    }
   },
   {
    "row": "317",
    "values": {
     "8": "92",
     "10": "90",
     "12": "88",
     "14": "86",
     "16": "84",
     "18": "82"
    }
   },
   {
    "row": "326",
    "values": {
     "8": "94",
     "10": "92",
     "12": "90",
     "14": "88",
     "16": "86",
     "18": "84"
    }
   },
   {
    "row": "335",
    "values": {
     "8": "96",
     "10": "94",
     "12": "92",
     "14": "90",
     "16": "88",
     "18": "86"
    }
   },
   {
    "row": "345",
    "values": {
     "8": "98",
     "10": "96",
     "12": "94",
     "14": "92",
     "16": "90",
     "18": "88"
    }
   },
   {
    "row": "354",
    "values": {
     "8": "100",
     "10": "98",
     "12": "96",
     "14": "94",
     "16": "92",
     "18": "90"
    }
   },
   {
    "row": "364",
    "values": {
     "8": "102",
     "10": "100",
     "12": "98",
     "14": "96",
     "16": "94",
     "18": "92"
    }
   },
   {
    "row": "374",
    "values": {
     "8": "104",
     "10": "102",
     "12": "100",
     "14": "98",
     "16": "96",
     "18": "94"
    }
   },
   {
    "row": "384",
    "values": {
     "8": "106",
     "10": "104",
     "12": "102",
     "14": "100",
     "16": "98",
     "18": "96"
    }
   },
   {
    "row": "395",
    "values": {
     "8": "108",
     "10": "106",
     "12": "104",
     "14": "102",
     "16": "100",
     "18": "98"
    }
   },
   {
    "row": "406",
    "values": {
     "8": "110",
     "10": "108",
     "12": "106",
     "14": "104",
     "16": "102",
     "18": "100"
    }
   },
   {
    "row": "416",
    "values": {
     "8": "112",
     "10": "110",
     "12": "108",
     "14": "106",
     "16": "104",
     "18": "102"
    }
   },
   {
    "row": "427",
    "values": {
     "8": "114",
     "10": "112",
     "12": "110",
     "14": "108",
     "16": "106",
     "18": "104"
    }
   },
   {
    "row": "439",
    "values": {
     "8": "116",
     "10": "114",
     "12": "112",
     "14": "110",
     "16": "108",
     "18": "106"
    }
   },
   {
    "row": "450",
    "values": {
     "8": "118",
     "10": "116",
     "12": "114",
     "14": "112",
     "16": "110",
     "18": "108"
    }
   },
   {
    "row": "462",
    "values": {
     "8": "120",
     "10": "118",
     "12": "116",
     "14": "114",
     "16": "112",
     "18": "110"
    }
   },
   {
    "row": "474",
    "values": {
     "8": "122",
     "10": "120",
     "12": "118",
     "14": "116",
     "16": "114",
     "18": "112"
    }
   },
   {
    "row": "486",
    "values": {
     "8": "124",
     "10": "122",
     "12": "120",
     "14": "118",
     "16": "116",
     "18": "114"
    }
   },
   {
    "row": "499",
    "values": {
     "8": "126",
     "10": "124",
     "12": "122",
     "14": "120",
     "16": "118",
     "18": "116"
    }
   },
   {
    "row": "511",
    "values": {
     "8": "128",
     "10": "126",
     "12": "124",
     "14": "122",
     "16": "120",
     "18": "118"
    }
   }
  ],
  "notes": "Chart title as printed: REQUIRED LIQUID LINE TEMPERATURE. Find the measured liquid pressure in the left column, follow that line right to the column under the design subcooling value for the unit; the intersection is the required liquid line temperature. Design subcooling comes from the unit spec sheet / technical information manual, not from this chart. Manual instructs running the system at least 10 minutes to let pressures stabilize, with the thermometer on the liquid line at the liquid line service valve, in good contact and insulated. Subcooling formula printed as SAT. LIQUID TEMP. minus LIQUID LINE TEMP.",
  "source": "goodman-gsx-gsz-condenser-service.pdf, SERVICING section, printed page 99 (PDF page 99). Identical chart also appears in goodman-package-ac-hp-service.pdf PDF page 31 and goodman-package-gas-electric-service.pdf PDF page 29."
 },
 {
  "id": "cc-trane-4ttx8-r410a-charging-chart",
  "brand": "Trane",
  "refrigerant": "R-410A",
  "meteringDevice": "TXV",
  "models": "4TTX8 condensing units (Installer's Guide covers Trane split system condensing units; systems are AHRI rated only with TXV/EEV indoor systems)",
  "chartType": "pressure-table",
  "rowAxis": "liquid line temperature (F)",
  "colAxis": "final subcooling (F)",
  "units": "rows F; columns F of subcooling; cell values PSI (liquid gage pressure)",
  "rows": [
   {
    "row": "55",
    "values": {
     "8": "179",
     "9": "182",
     "10": "185",
     "11": "188",
     "12": "191",
     "13": "195",
     "14": "198"
    }
   },
   {
    "row": "60",
    "values": {
     "8": "195",
     "9": "198",
     "10": "201",
     "11": "204",
     "12": "208",
     "13": "211",
     "14": "215"
    }
   },
   {
    "row": "65",
    "values": {
     "8": "211",
     "9": "215",
     "10": "218",
     "11": "222",
     "12": "225",
     "13": "229",
     "14": "232"
    }
   },
   {
    "row": "70",
    "values": {
     "8": "229",
     "9": "232",
     "10": "236",
     "11": "240",
     "12": "243",
     "13": "247",
     "14": "251"
    }
   },
   {
    "row": "75",
    "values": {
     "8": "247",
     "9": "251",
     "10": "255",
     "11": "259",
     "12": "263",
     "13": "267",
     "14": "271"
    }
   },
   {
    "row": "80",
    "values": {
     "8": "267",
     "9": "271",
     "10": "275",
     "11": "279",
     "12": "283",
     "13": "287",
     "14": "291"
    }
   },
   {
    "row": "85",
    "values": {
     "8": "287",
     "9": "291",
     "10": "296",
     "11": "300",
     "12": "304",
     "13": "309",
     "14": "313"
    }
   },
   {
    "row": "90",
    "values": {
     "8": "309",
     "9": "313",
     "10": "318",
     "11": "322",
     "12": "327",
     "13": "331",
     "14": "336"
    }
   },
   {
    "row": "95",
    "values": {
     "8": "331",
     "9": "336",
     "10": "341",
     "11": "346",
     "12": "351",
     "13": "355",
     "14": "360"
    }
   },
   {
    "row": "100",
    "values": {
     "8": "355",
     "9": "360",
     "10": "365",
     "11": "370",
     "12": "376",
     "13": "381",
     "14": "386"
    }
   },
   {
    "row": "105",
    "values": {
     "8": "381",
     "9": "386",
     "10": "391",
     "11": "396",
     "12": "402",
     "13": "407",
     "14": "413"
    }
   },
   {
    "row": "110",
    "values": {
     "8": "407",
     "9": "413",
     "10": "418",
     "11": "424",
     "12": "429",
     "13": "435",
     "14": "441"
    }
   },
   {
    "row": "115",
    "values": {
     "8": "435",
     "9": "441",
     "10": "446",
     "11": "452",
     "12": "458",
     "13": "464",
     "14": "470"
    }
   },
   {
    "row": "120",
    "values": {
     "8": "464",
     "9": "470",
     "10": "476",
     "11": "482",
     "12": "488",
     "13": "495",
     "14": "501"
    }
   },
   {
    "row": "125",
    "values": {
     "8": "495",
     "9": "501",
     "10": "507",
     "11": "514",
     "12": "520",
     "13": "527",
     "14": "533"
    }
   }
  ],
  "notes": "Table 14.2, titled R-410A REFRIGERANT CHARGING CHART. Procedure as printed: determine the Final Subcooling Value = design subcooling from the nameplate or Service Facts plus the correction from the SUBCOOL CHARGING CHART CORRECTIONS TABLE for line length and lift; stabilize the system a minimum of 20 minutes; measure liquid line temperature and pressure at the outdoor unit service valve; look up the row for the measured liquid temperature and the column for the final subcooling to get the target liquid gage pressure. Manual's own worked example: 12 F final subcooling and 90 F liquid temp gives approximately 327 PSIG. Subcooling charging in cooling is not recommended below 55 F outdoor ambient; below 55 F the manual directs weighing in the charge and returning for verification, with a minimum of 10 F subcooling in heating mode.",
  "source": "trane-condensing-unit-install.pdf, document 18-AC95D1-5C-EN, Table 14.2, printed page 19 (PDF page 19); table drawing reference From Dwg. D154557P01 Rev. 3"
 },
 {
  "id": "cc-daikin-r32-piston-superheat-targets",
  "brand": "Daikin",
  "refrigerant": "R-32",
  "meteringDevice": "fixed orifice",
  "models": "R-32 condensing units / single stage air conditioners covered by this installation and service reference, when matched to a piston (fixed orifice) indoor coil",
  "chartType": "superheat-grid",
  "rowAxis": "outdoor dry bulb temperature (F)",
  "colAxis": "indoor wet bulb temperature (F)",
  "units": "F (target superheat)",
  "rows": [
   {
    "row": "60",
    "values": {
     "55": "10",
     "57": "13",
     "59": "17",
     "61": "20",
     "63": "23",
     "65": "26",
     "67": "29",
     "69": "30",
     "71": "31"
    }
   },
   {
    "row": "65",
    "values": {
     "55": "8",
     "57": "11",
     "59": "14",
     "61": "16",
     "63": "19",
     "65": "22",
     "67": "26",
     "69": "27",
     "71": "29"
    }
   },
   {
    "row": "70",
    "values": {
     "55": "5",
     "57": "8",
     "59": "10",
     "61": "13",
     "63": "15",
     "65": "19",
     "67": "23",
     "69": "24",
     "71": "25"
    }
   },
   {
    "row": "75",
    "values": {
     "55": "---",
     "57": "---",
     "59": "6",
     "61": "9",
     "63": "11",
     "65": "15",
     "67": "20",
     "69": "21",
     "71": "23"
    }
   },
   {
    "row": "80",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "7",
     "65": "12",
     "67": "17",
     "69": "18",
     "71": "20"
    }
   },
   {
    "row": "85",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "8",
     "67": "13",
     "69": "15",
     "71": "16"
    }
   },
   {
    "row": "90",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "7",
     "67": "10",
     "69": "11",
     "71": "13"
    }
   },
   {
    "row": "95",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "---",
     "67": "7",
     "69": "8",
     "71": "10"
    }
   },
   {
    "row": "100",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "---",
     "67": "---",
     "69": "7",
     "71": "8"
    }
   },
   {
    "row": "105",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "---",
     "67": "---",
     "69": "---",
     "71": "7"
    }
   },
   {
    "row": "110",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "---",
     "67": "---",
     "69": "---",
     "71": "---"
    }
   },
   {
    "row": "115",
    "values": {
     "55": "---",
     "57": "---",
     "59": "---",
     "61": "---",
     "63": "---",
     "65": "---",
     "67": "---",
     "69": "---",
     "71": "---"
    }
   }
  ],
  "notes": "Table title as printed: System Superheat Targets for Piston Match-ups (+/- 1.0 F). Dashes are printed in the source; the manual gives no superheat target for those combinations. Outdoor temperature must be 60 F or higher; set thermostat to COOL, fan to AUTO, set point well below room temperature, and run the unit in cooling 10-15 minutes or until pressures stabilize. Thermometer 4-6 in. from the compressor on the suction line, in good contact and insulated. Superheat Formula printed as Suct. Line Temp. minus Sat. Suct. Temp. Units matched to a non-adjustable TXV coil are to be charged by subcooling only, not with this table.",
  "source": "daikin-r32-ac-install.pdf, printed page 9 (PDF page 9). Same table also appears in daikin-r32-singlestage-service.pdf, PDF page 37 (printed page 38)."
 },
 {
  "id": "cc-daikin-fit-r410a-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-410A",
  "meteringDevice": "as printed: not stated (charge by subcooling in CHARGE MODE)",
  "models": "DX6VS***1*A* / DZ6VS***1*A* FIT outdoor units (table columns printed as DX6VSA, DX6VSS, DZ6VSA)",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": "outdoor ambient temperature band and outdoor model",
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "1.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "10 +/- 1F",
     "DX6VSS (65F to 105F)": "10 +/- 1F",
     "DZ6VSA (65F to 105F)": "10 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "2.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "12 +/- 1F",
     "DX6VSS (65F to 105F)": "12 +/- 1F",
     "DZ6VSA (65F to 105F)": "12 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "2.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "14 +/- 1F",
     "DX6VSS (65F to 105F)": "14 +/- 1F",
     "DZ6VSA (65F to 105F)": "14 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "3.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "13 +/- 1F",
     "DX6VSS (65F to 105F)": "15 +/- 1F",
     "DZ6VSA (65F to 105F)": "15 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "3.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "-",
     "DX6VSS (65F to 105F)": "8 +/- 1F",
     "DZ6VSA (65F to 105F)": "8 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "4.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "-",
     "DX6VSS (65F to 105F)": "9 +/- 1F",
     "DZ6VSA (65F to 105F)": "9 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "5.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DX6VSA (65F to 105F)": "-",
     "DX6VSS (65F to 105F)": "9 +/- 1F",
     "DZ6VSA (65F to 105F)": "9 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   }
  ],
  "notes": "Table title as printed: Charging Table (FIT). Below 65 F and above 105 F outdoor ambient the manual says Weigh in Charge instead of giving a subcooling target. Subcooling target is only valid while the unit is operating at 100 percent capacity in CHARGE MODE; the seven segment display alternates cha and the current subcooling value when the unit is ready. Purge gauge lines, connect to the liquid base valve service port, convert liquid pressure to temperature with the P/T chart, thermometer on the liquid line at the liquid line service valve with good contact and insulated. Not more than 8 oz. of refrigerant should be added to reach the target; add 1 oz. at a time and wait 10 minutes to stabilize. Subcooling formula printed as SAT. LIQUID TEMP. minus LIQUID LINE TEMP. A dash means that size is not offered in that model column.",
  "source": "daikin-dc6vs-dz6vs-dh6vs-install.pdf (DX6VS/DZ6VS/DZ6VSA...EA Outdoor Unit Installation & Service Reference), Charging Table (FIT), printed page 29 (PDF page 29)"
 },
 {
  "id": "cc-daikin-fit-enhanced-capacity-r410a-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-410A",
  "meteringDevice": "as printed: not stated (charge by subcooling in CHARGE MODE)",
  "models": "DZ6VSA***E Enhanced Capacity FIT outdoor units",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": "outdoor ambient temperature band",
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "2.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DZ6VSA***E (65F to 105F)": "14 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "3.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DZ6VSA***E (65F to 105F)": "8 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "3.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DZ6VSA***E (65F to 105F)": "9 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   },
   {
    "row": "4.0 ton",
    "values": {
     "OD ambient < 65F": "Weigh in Charge",
     "DZ6VSA***E (65F to 105F)": "9 +/- 1F",
     "OD ambient > 105F": "Weigh in Charge"
    }
   }
  ],
  "notes": "Table title as printed: Charging Table (ENHANCED CAPACITY FIT). Manual note: subcooling information is valid only while cha and the current subcooling value are being displayed alternately on the PCB. Not more than 8 oz. of refrigerant should be added to reach the target; add 1 oz. at a time and wait 10 minutes to stabilize. Do NOT adjust the charge based on suction pressure.",
  "source": "daikin-dc6vs-dz6vs-dh6vs-install.pdf, Charging Table (ENHANCED CAPACITY FIT), printed page 30 (PDF page 30)"
 },
 {
  "id": "cc-daikin-fit-r32-charge-verification-test-table",
  "brand": "Daikin",
  "refrigerant": "R-32",
  "meteringDevice": "as printed: not stated (charge by subcooling)",
  "models": "DC6VS***1*A* / DH6VS***1*A* / DC9VSA[24-48]10A* / DH7VSA[24-48]10A* FIT outdoor units (table columns printed as DC6VSA, DC6VSS, DH6VSA, DH7VSA, DC9VSA)",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": "outdoor ambient temperature band and outdoor model",
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "1.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "7 +/- 1F",
     "DC6VSS (65F to 105F)": "7 +/- 1F",
     "DH6VSA (65F to 105F)": "7 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "2 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "*8 +/- 1F",
     "DC6VSS (65F to 105F)": "*8 +/- 1F",
     "DH6VSA (65F to 105F)": "*8 +/- 1F",
     "DH7VSA (65F to 105F)": "8 +/- 1F",
     "DC9VSA (65F to 105F)": "8 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "2.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "8 +/- 1F",
     "DC6VSS (65F to 105F)": "8 +/- 1F",
     "DH6VSA (65F to 105F)": "8 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "3 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "9 +/- 1F",
     "DC6VSS (65F to 105F)": "9 +/- 1F",
     "DH6VSA (65F to 105F)": "9 +/- 1F",
     "DH7VSA (65F to 105F)": "8 +/- 1F",
     "DC9VSA (65F to 105F)": "8 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "3.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "8 +/- 1F",
     "DH6VSA (65F to 105F)": "8 +/- 1F",
     "DH7VSA (65F to 105F)": "10 +/- 1F",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "4 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "8 +/- 1F",
     "DH6VSA (65F to 105F)": "8 +/- 1F",
     "DH7VSA (65F to 105F)": "10 +/- 1F",
     "DC9VSA (65F to 105F)": "10 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "10 +/- 1F",
     "DH6VSA (65F to 105F)": "10 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   }
  ],
  "notes": "Table title as printed: CHARGE VERIFICATION TEST charging table (FIT). Printed footnote: * 2 ton DC6VSA, DC6VSS, DH6VSA subcooling target is 10 +/- 1F for OD ambient temp below 80F. Manual note: this subcooling information is valid ONLY in CHARGE VERIFICATION TEST, not during 100 percent capacity operation - use the separate full capacity table for that. Unit is ready about 20-25 minutes after starting the test; the thermostat then shows the previous 5 minute average subcooling, refreshed every minute, and the FIT PCB seven segment display alternates cha and that value. If outdoor ambient is outside 65F-105F the charge verification test is not allowed. Not more than 8 oz. of refrigerant should be added; add 1 oz. at a time and wait 10 minutes. A dash means that size is not offered in that model column.",
  "source": "daikin-fit-r32-outdoor-install.pdf, CHARGE VERIFICATION TEST charging table (FIT), printed page 31 (PDF page 31)"
 },
 {
  "id": "cc-daikin-fit-r32-full-capacity-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-32",
  "meteringDevice": "as printed: not stated (charge by subcooling)",
  "models": "DC6VS***1*A* / DH6VS***1*A* / DC9VSA[24-48]10A* / DH7VSA[24-48]10A* FIT outdoor units (table columns printed as DC6VSA, DC6VSS, DH6VSA, DH7VSA, DC9VSA)",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": "outdoor ambient temperature band and outdoor model",
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "1.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "10 +/- 1F",
     "DC6VSS (65F to 105F)": "10 +/- 1F",
     "DH6VSA (65F to 105F)": "10 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "2 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "12 +/- 1F",
     "DC6VSS (65F to 105F)": "12 +/- 1F",
     "DH6VSA (65F to 105F)": "12 +/- 1F",
     "DH7VSA (65F to 105F)": "14 +/- 1F",
     "DC9VSA (65F to 105F)": "14 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "2.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "14 +/- 1F",
     "DC6VSS (65F to 105F)": "14 +/- 1F",
     "DH6VSA (65F to 105F)": "14 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "3 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "13 +/- 1F",
     "DC6VSS (65F to 105F)": "15 +/- 1F",
     "DH6VSA (65F to 105F)": "15 +/- 1F",
     "DH7VSA (65F to 105F)": "8 +/- 1F",
     "DC9VSA (65F to 105F)": "8 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "3.5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "8 +/- 1F",
     "DH6VSA (65F to 105F)": "8 +/- 1F",
     "DH7VSA (65F to 105F)": "9 +/- 1F",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "4 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "9 +/- 1F",
     "DH6VSA (65F to 105F)": "9 +/- 1F",
     "DH7VSA (65F to 105F)": "9 +/- 1F",
     "DC9VSA (65F to 105F)": "9 +/- 1F",
     "OD ambient > 105F": "Weigh in charge"
    }
   },
   {
    "row": "5 ton",
    "values": {
     "OD ambient < 65F": "Weigh in charge",
     "DC6VSA (65F to 105F)": "-",
     "DC6VSS (65F to 105F)": "9 +/- 1F",
     "DH6VSA (65F to 105F)": "9 +/- 1F",
     "DH7VSA (65F to 105F)": "-",
     "DC9VSA (65F to 105F)": "-",
     "OD ambient > 105F": "Weigh in charge"
    }
   }
  ],
  "notes": "Table title as printed: Full capacity charging table (FIT). Manual note: this table is valid ONLY when the system is operating at 100 percent capacity, and is NOT valid during CHARGE VERIFICATION TEST - the charge verification table has different targets for the same units. Not more than 8 oz. of refrigerant should be added to reach the target; add 1 oz. at a time and wait 10 minutes to stabilize. Do NOT adjust the charge based on suction pressure. A dash means that size is not offered in that model column.",
  "source": "daikin-fit-r32-outdoor-install.pdf, Full capacity charging table (FIT), printed page 31 (PDF page 31)"
 },
 {
  "id": "cc-daikin-dx20vc-inverter-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-410A",
  "meteringDevice": "both",
  "models": "DX20VC inverter condensing units with R-410A refrigerant",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "outdoor ambient temperature (F)",
  "colAxis": null,
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "< 65F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   },
   {
    "row": "65F to 105F",
    "values": {
     "subcooling (degF)": "8F +/- 1F"
    }
   },
   {
    "row": "> 105F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   }
  ],
  "notes": "Table title as printed: Charging Table (the manual prints Wheigh in Charge in the first cell - transcribed here as Weigh in Charge). Subcooling and superheat information is valid only while the unit is operating at 100 percent capacity or 100 percent compressor speed in CHARGE MODE; compressor speed is shown under the STATUS menu in the thermostat. Run the system at least 10 minutes to stabilize. On TXV applications the same page gives a target superheat of 7 to 9 F measured 4-6 in. from the compressor on the suction line, adjusted with the TXV while subcooling is brought to 8F +/- 1F with charge. Not more than 0.5 lb (8 oz) of refrigerant should be added to reach the target subcooling; add 4 oz at a time.",
  "source": "daikin-dx20vc-dz20vc-service.pdf (DX20VC Inverter Condensing Units Service Instructions), Charging Table, SERVICING section, PDF page 31 (printed page 32)"
 },
 {
  "id": "cc-daikin-dz20vc-heat-pump-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-410A",
  "meteringDevice": "both",
  "models": "DZ20VC heat pump outdoor units (2 to 5 ton)",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "outdoor ambient temperature (F)",
  "colAxis": null,
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "< 65 F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   },
   {
    "row": "65F to 105F",
    "values": {
     "subcooling (degF)": "2T to 4T: 8F +/- 1F; 5T: 10F +/- 1F"
    }
   },
   {
    "row": "> 105F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   }
  ],
  "notes": "Table title as printed: Charging Table. Printed footnote *1: 10 F +/- 1 F only for DZ20VC0601. Note that the DX20VC/DZ20VC service manual prints a flat 8F +/- 1F for the same family, while this install manual splits 2T-4T from 5T - both are recorded here as printed. Subcooling information is valid only while the unit is operating at 100 percent capacity or 100 percent compressor speed in CHARGE MODE. For a TXV indoor unit the same page targets 8F +/- 1F superheat as well. Not more than 0.5 lb (8 oz) of refrigerant should be added at a time; add 4 oz at a time and wait 20 minutes. Subcooling printed as SAT. LIQUID TEMP. minus LIQUID LINE TEMP.; superheat as SUCT. LINE TEMP. minus SAT. SUCT. TEMP.",
  "source": "daikin-dz20vc-install.pdf (DZ20VC Heat Pump Installation & Service Reference), Charging Table, PDF page 9"
 },
 {
  "id": "cc-goodman-avzc18-eev-target-subcooling",
  "brand": "Goodman (Daikin Comfort Technologies)",
  "refrigerant": "R-410A",
  "meteringDevice": "as printed: EEV applications",
  "models": "AVZC18 inverter heat pump condenser units with R-410A refrigerant",
  "chartType": "target-subcooling-fixed",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": null,
  "units": "F (target subcooling range)",
  "rows": [
   {
    "row": "2 TON",
    "values": {
     "subcooling": "10-12F"
    }
   },
   {
    "row": "3 TON",
    "values": {
     "subcooling": "13-15F"
    }
   },
   {
    "row": "4 TON",
    "values": {
     "subcooling": "8-10F"
    }
   },
   {
    "row": "5 TON",
    "values": {
     "subcooling": "11-13F"
    }
   }
  ],
  "notes": "From SUBCOOLING ADJUSTMENT ON EEV APPLICATIONS. Subcooling information is valid only while the unit is operating at 100 percent capacity or 100 percent compressor speed in CHARGE MODE; compressor speed is displayed under the STATUS menu in the thermostat. Run the system at least 20 minutes to let pressures stabilize. Outdoor ambient must be greater than 65 F and less than 105 F; if outside that range do not adjust subcooling. Thermometer on the liquid line at the liquid line service valve, good contact, insulated. Not more than 0.8 lb (13 oz) of refrigerant should be added at a time; add 4 oz at a time and wait 20 minutes to stabilize.",
  "source": "goodman-avzc18-heatpump-service.pdf (AVZC18 Inverter Heat Pump Service and Troubleshooting), SERVICING section, PDF page 17 (printed page 17)"
 },
 {
  "id": "cc-daikin-dh9vs-dc9vs-fit-charging-table",
  "brand": "Daikin",
  "refrigerant": "R-32",
  "meteringDevice": "as printed: not stated (charge by subcooling)",
  "models": "DH9VS***1*A* / DH7VS***1*A* / DC9VS***1*A* FIT outdoor units",
  "chartType": "subcooling-by-ambient",
  "rowAxis": "outdoor ambient temperature (F)",
  "colAxis": null,
  "units": "F (target subcooling)",
  "rows": [
   {
    "row": "< 65F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   },
   {
    "row": "65F to 105F",
    "values": {
     "subcooling (degF)": "11 +/- 1F"
    }
   },
   {
    "row": "> 105F",
    "values": {
     "subcooling (degF)": "Weigh in Charge"
    }
   }
  ],
  "notes": "Table title as printed: Charging Table. Manual note: subcooling information is valid only while cha and the current subcooling value are being displayed alternately on the PCB. Outdoor ambient must be 65F-105F; let the system stabilize about 30 minutes. Confirm indoor airflow and static are within tolerance before verifying the subcooling measurement. Charging equipment must use dedicated PVE oil gauges and hoses. Not more than 8 oz. of refrigerant should be added; add 1 oz. at a time and wait 10 minutes. Do NOT adjust the charge based on suction pressure.",
  "source": "daikin-fit-dh9vs-dc9vs-ac-heatpump-install.pdf, Charging Table, PDF page 26 (printed page 27)"
 },
 {
  "id": "cc-lennox-ml16kp2-normal-operating-pressures-cooling",
  "brand": "Lennox",
  "refrigerant": "R-454B",
  "meteringDevice": "as printed: not stated",
  "models": "ML16KP2-024, ML16KP2-036, ML16KP2-048, ML16KP2-060 outdoor units",
  "chartType": "pressure-table",
  "rowAxis": "temperature of air entering the outdoor coil (F)",
  "colAxis": "outdoor unit size",
  "units": "psig, printed as Liquid Line Pressure / Vapor Line Pressure",
  "rows": [
   {
    "row": "65",
    "values": {
     "-024": "227/134",
     "-036": "245/128",
     "-048": "236/126",
     "-060": "255/124"
    }
   },
   {
    "row": "75",
    "values": {
     "-024": "265/136",
     "-036": "284/130",
     "-048": "275/130",
     "-060": "297/126"
    }
   },
   {
    "row": "85",
    "values": {
     "-024": "307/138",
     "-036": "328/132",
     "-048": "317/132",
     "-060": "343/127"
    }
   },
   {
    "row": "95",
    "values": {
     "-024": "356/141",
     "-036": "375/133",
     "-048": "367/134",
     "-060": "393/129"
    }
   },
   {
    "row": "105",
    "values": {
     "-024": "408/143",
     "-036": "426/136",
     "-048": "417/137",
     "-060": "447/131"
    }
   },
   {
    "row": "115",
    "values": {
     "-024": "467/145",
     "-036": "479/138",
     "-048": "471/139",
     "-060": "500/137"
    }
   }
  ],
  "notes": "Table 1 - Normal Operating Pressures, Cooling Operation, tolerance printed as Liquid +/-10 and Vapor +/-5 psig. Header block states this table is for maintenance checks and is NOT a procedure for charging the system; minor variations are expected from installation differences, but significant deviations may mean the system is not properly charged or a component problem exists. Row label is the temperature of air entering the outdoor coil. R454B is a zeotropic blend - charge the unit with liquid only and use saturated liquid temperature to calculate liquid subcooling.",
  "source": "31_ML16KP2.pdf (Lennox ML16KP2 Service Literature, Corp. 100214, June 2026), Table 1, printed page 41 (PDF page 41)"
 },
 {
  "id": "cc-lennox-ml16kp2-normal-operating-pressures-heating",
  "brand": "Lennox",
  "refrigerant": "R-454B",
  "meteringDevice": "as printed: not stated",
  "models": "ML16KP2-024, ML16KP2-036, ML16KP2-048, ML16KP2-060 outdoor units",
  "chartType": "pressure-table",
  "rowAxis": "temperature of air entering the outdoor coil (F)",
  "colAxis": "outdoor unit size",
  "units": "psig, printed as Liquid Line Pressure / Vapor Line Pressure",
  "rows": [
   {
    "row": "20",
    "values": {
     "-024": "355/59",
     "-036": "262/36",
     "-048": "265/41",
     "-060": "294/47"
    }
   },
   {
    "row": "30",
    "values": {
     "-024": "366/73",
     "-036": "397/70",
     "-048": "388/57",
     "-060": "313/61"
    }
   },
   {
    "row": "40",
    "values": {
     "-024": "374/89",
     "-036": "314/83",
     "-048": "315/78",
     "-060": "332/71"
    }
   },
   {
    "row": "50",
    "values": {
     "-024": "392/107",
     "-036": "329/99",
     "-048": "340/93",
     "-060": "364/93"
    }
   },
   {
    "row": "60",
    "values": {
     "-024": "401/126",
     "-036": "346/115",
     "-048": "361/111",
     "-060": "382/112"
    }
   }
  ],
  "notes": "Table 1 - Normal Operating Pressures, Heating Operation, tolerance printed as Liquid +/-10 and Vapor +/-5 psig. Maintenance-check table, not a charging procedure. Values are transcribed exactly as printed, including the -060 column reading 355/59 at 20 F and the -036 column reading 262/36 at 20 F, which do not trend smoothly with the rest of the column - no smoothing or correction has been applied.",
  "source": "31_ML16KP2.pdf (Lennox ML16KP2 Service Literature, Corp. 100214, June 2026), Table 1, printed page 41 (PDF page 41)"
 },
 {
  "id": "cc-lennox-ml16kp2-matchup-target-subcooling",
  "brand": "Lennox",
  "refrigerant": "R-454B",
  "meteringDevice": "as printed: not stated",
  "models": "ML16KP2-024 / -036 / -048 / -060 outdoor units matched to the listed Lennox indoor units",
  "chartType": "target-subcooling-fixed",
  "rowAxis": "outdoor unit size and indoor unit matchup",
  "colAxis": "target subcool heating / target subcool cooling / total charge / additional charge",
  "units": "F for subcool columns; lb and oz for charge columns",
  "rows": [
   {
    "row": "ML16KP2-024 / CBK47UHE-024",
    "values": {
     "target subcool heating (+/-5F)": "10",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "6 lb 14 oz",
     "additional charge (lb oz)": "1 lb 9 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK48MVT-018/024",
    "values": {
     "target subcool heating (+/-5F)": "10",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "6 lb 14 oz",
     "additional charge (lb oz)": "1 lb 9 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK45UHVT-024",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "6 lb 12 oz",
     "additional charge (lb oz)": "1 lb 7 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK45UHVT-030",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "7 lb 2 oz",
     "additional charge (lb oz)": "1 lb 13 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK47UHET-030",
    "values": {
     "target subcool heating (+/-5F)": "17",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "7 lb 13 oz",
     "additional charge (lb oz)": "2 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK48MVT-030",
    "values": {
     "target subcool heating (+/-5F)": "17",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "7 lb 13 oz",
     "additional charge (lb oz)": "2 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40CT-24A/B",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "7 lb 0 oz",
     "additional charge (lb oz)": "1 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40CT-30A/B",
    "values": {
     "target subcool heating (+/-5F)": "23",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "5 lb 10 oz",
     "additional charge (lb oz)": "0 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40HT-24A",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "6 lb 3 oz",
     "additional charge (lb oz)": "0 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40HT-24B",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "5 lb 9 oz",
     "additional charge (lb oz)": "0 lb 4 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40HT-30A",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "6 lb 10 oz",
     "additional charge (lb oz)": "1 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40HT-30B",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "5 lb 5 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40DT-24B",
    "values": {
     "target subcool heating (+/-5F)": "30",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "7 lb 2 oz",
     "additional charge (lb oz)": "1 lb 13 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40DT-30/36B",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "6 lb 3 oz",
     "additional charge (lb oz)": "0 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK43UHET-024",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "7 lb 3 oz",
     "additional charge (lb oz)": "1 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CBK43UHET-030",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "7 lb 5 oz",
     "additional charge (lb oz)": "2 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-024 / CK40DT-30/36C",
    "values": {
     "target subcool heating (+/-5F)": "32",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "7 lb 0 oz",
     "additional charge (lb oz)": "1 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK47UHE-036",
    "values": {
     "target subcool heating (+/-5F)": "18",
     "target subcool cooling (+/-1F)": "6",
     "total charge (lb oz)": "8 lb 4 oz",
     "additional charge (lb oz)": "1 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK48MVT-036",
    "values": {
     "target subcool heating (+/-5F)": "18",
     "target subcool cooling (+/-1F)": "6",
     "total charge (lb oz)": "8 lb 4 oz",
     "additional charge (lb oz)": "1 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK47UHET-042",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 8 oz",
     "additional charge (lb oz)": "2 lb 2 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK48MVT-042",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 8 oz",
     "additional charge (lb oz)": "2 lb 2 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK45UHVT-036",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 15 oz",
     "additional charge (lb oz)": "2 lb 9 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK45UHVT-042",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "3",
     "total charge (lb oz)": "8 lb 6 oz",
     "additional charge (lb oz)": "2 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40CT-36A/B",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 9 oz",
     "additional charge (lb oz)": "2 lb 3 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40CT-48B/C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 12 oz",
     "additional charge (lb oz)": "2 lb 6 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40CT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "9 lb 1 oz",
     "additional charge (lb oz)": "2 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-36B",
    "values": {
     "target subcool heating (+/-5F)": "25",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "7 lb 1 oz",
     "additional charge (lb oz)": "0 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-36C",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 5 oz",
     "additional charge (lb oz)": "1 lb 15 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-42B",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "10 lb 1 oz",
     "additional charge (lb oz)": "3 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-42C",
    "values": {
     "target subcool heating (+/-5F)": "15",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 15 oz",
     "additional charge (lb oz)": "2 lb 9 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-48C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "8 lb 8 oz",
     "additional charge (lb oz)": "2 lb 2 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-48B",
    "values": {
     "target subcool heating (+/-5F)": "15",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "8 lb 7 oz",
     "additional charge (lb oz)": "2 lb 1 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "9 lb 13 oz",
     "additional charge (lb oz)": "3 lb 7 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40DT-30/36C",
    "values": {
     "target subcool heating (+/-5F)": "35",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "6 lb 6 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40DT-48C",
    "values": {
     "target subcool heating (+/-5F)": "43",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "9 lb 5 oz",
     "additional charge (lb oz)": "2 lb 15 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40DT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "26",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "8 lb 1 oz",
     "additional charge (lb oz)": "1 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK43UHET-036",
    "values": {
     "target subcool heating (+/-5F)": "29",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "8 lb 8 oz",
     "additional charge (lb oz)": "2 lb 2 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CBK43UHET-042",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "8 lb 5 oz",
     "additional charge (lb oz)": "1 lb 15 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40DT-42B",
    "values": {
     "target subcool heating (+/-5F)": "37",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "8 lb 5 oz",
     "additional charge (lb oz)": "1 lb 15 oz"
    }
   },
   {
    "row": "ML16KP2-036 / CK40DT-60D",
    "values": {
     "target subcool heating (+/-5F)": "25",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "9 lb 1 oz",
     "additional charge (lb oz)": "2 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK47UHE-048",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 1 oz",
     "additional charge (lb oz)": "1 lb 3 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK48MVT-048",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 1 oz",
     "additional charge (lb oz)": "1 lb 3 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK47UHE-060",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "11 lb 4 oz",
     "additional charge (lb oz)": "2 lb 6 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK48MVT-060",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "11 lb 4 oz",
     "additional charge (lb oz)": "2 lb 6 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK45UHVT-048",
    "values": {
     "target subcool heating (+/-5F)": "15",
     "target subcool cooling (+/-1F)": "6",
     "total charge (lb oz)": "9 lb 5 oz",
     "additional charge (lb oz)": "0 lb 7 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK45UHVT-060",
    "values": {
     "target subcool heating (+/-5F)": "11",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "9 lb 12 oz",
     "additional charge (lb oz)": "0 lb 14 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40CT-48B/C",
    "values": {
     "target subcool heating (+/-5F)": "21",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 6 oz",
     "additional charge (lb oz)": "1 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40CT-49C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "10",
     "total charge (lb oz)": "10 lb 1 oz",
     "additional charge (lb oz)": "1 lb 3 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40CT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "17",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "9 lb 5 oz",
     "additional charge (lb oz)": "0 lb 7 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40CT-60C",
    "values": {
     "target subcool heating (+/-5F)": "10",
     "target subcool cooling (+/-1F)": "9",
     "total charge (lb oz)": "10 lb 9 oz",
     "additional charge (lb oz)": "1 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40CT-60D",
    "values": {
     "target subcool heating (+/-5F)": "9",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "9 lb 3 oz",
     "additional charge (lb oz)": "0 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40HT-48B",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "9 lb 1 oz",
     "additional charge (lb oz)": "0 lb 3 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40HT-48C",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "8 lb 14 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "6",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "9 lb 3 oz",
     "additional charge (lb oz)": "0 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40HT-60D",
    "values": {
     "target subcool heating (+/-5F)": "15",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "10 lb 6 oz",
     "additional charge (lb oz)": "1 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40DT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "36",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "9 lb 3 oz",
     "additional charge (lb oz)": "0 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK43UHET-048",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 2 oz",
     "additional charge (lb oz)": "1 lb 4 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CBK43UHET-060",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "9 lb 9 oz",
     "additional charge (lb oz)": "0 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-048 / CK40DT-60D",
    "values": {
     "target subcool heating (+/-5F)": "32",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "9 lb 9 oz",
     "additional charge (lb oz)": "0 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CBK47UHE-060",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "10 lb 8 oz",
     "additional charge (lb oz)": "0 lb 12 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CBK48MVT-060",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "11",
     "total charge (lb oz)": "10 lb 8 oz",
     "additional charge (lb oz)": "0 lb 12 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CBK45UHVT-060",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "6",
     "total charge (lb oz)": "10 lb 7 oz",
     "additional charge (lb oz)": "0 lb 11 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40CT-49C",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 1 oz",
     "additional charge (lb oz)": "0 lb 5 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40CT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "8",
     "total charge (lb oz)": "10 lb 4 oz",
     "additional charge (lb oz)": "0 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40CT-60C",
    "values": {
     "target subcool heating (+/-5F)": "9",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "10 lb 9 oz",
     "additional charge (lb oz)": "0 lb 13 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40CT-60D",
    "values": {
     "target subcool heating (+/-5F)": "13",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "10 lb 3 oz",
     "additional charge (lb oz)": "0 lb 7 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "19",
     "target subcool cooling (+/-1F)": "6",
     "total charge (lb oz)": "10 lb 4 oz",
     "additional charge (lb oz)": "0 lb 8 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40HT-60D",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "7",
     "total charge (lb oz)": "10 lb 8 oz",
     "additional charge (lb oz)": "0 lb 12 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40DT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "43",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "9 lb 12 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CBK43UHET-060",
    "values": {
     "target subcool heating (+/-5F)": "28",
     "target subcool cooling (+/-1F)": "4",
     "total charge (lb oz)": "10 lb 6 oz",
     "additional charge (lb oz)": "0 lb 10 oz"
    }
   },
   {
    "row": "ML16KP2-060 / CK40DT-60D",
    "values": {
     "target subcool heating (+/-5F)": "52",
     "target subcool cooling (+/-1F)": "5",
     "total charge (lb oz)": "10 lb 12 oz",
     "additional charge (lb oz)": "1 lb 0 oz"
    }
   }
  ],
  "notes": "Table 2 - Indoor Unit Matches and Subcooling Charge Levels and Additional Charge. Cooling Mode: when outdoor ambient is 60F (15C) and above, use the cooling mode to adjust charge by the subcooling method; the cooling targets are based on 70 to 80F (21-27C) indoor return air temperature. Heating Mode: when outdoor ambient is below 60F (15C), use the heating mode targets, which are based on 65-75F (18-24C) indoor return air. Nameplate charge levels are based on 30 ft (9.1 m) line sets; on line sets with 3/8 in. (9.5 mm) liquid line add 3 oz for every 5 ft longer than 30 ft, subtract the same if shorter. Additional Charge column is the amount required in addition to the charge shown on the unit nameplate. R454B is a zeotropic blend - charge with liquid only and use saturated liquid temperature to calculate liquid subcooling. Printed footer: values in this table are most popular match-up pressures; indoor match-up, indoor air quantity and indoor load will cause the pressures to vary. For a list of all matches, check forms on LennoxPros.com.",
  "source": "31_ML16KP2.pdf (Lennox ML16KP2 Service Literature, Corp. 100214, June 2026), Table 2, printed page 41 (PDF page 41)"
 },
 {
  "id": "cc-lennox-sl22klv-matchup-target-subcooling",
  "brand": "Lennox",
  "refrigerant": "R-454B",
  "meteringDevice": "as printed: EEV (outdoor unit EEV controller maintains 10F target superheat in heating)",
  "models": "SL22KLV-024 / -036 / -048 / -060 outdoor units matched to the listed indoor units",
  "chartType": "target-subcooling-fixed",
  "rowAxis": "outdoor unit size and indoor unit matchup",
  "colAxis": "target subcool heating / target subcool cooling / total charge / additional charge",
  "units": "F for subcool columns; lb and oz for charge columns",
  "rows": [
   {
    "row": "SL22KLV-024 / CBK48MVT-042",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "11 lb 6 oz",
     "additional charge (lb oz)": "0 lb 12 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CBK48MVT-018/024",
    "values": {
     "target subcool heating (+/-5F)": "22",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "10 lb 14 oz",
     "additional charge (lb oz)": "0 lb 4 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CBK48MVT-030/036",
    "values": {
     "target subcool heating (+/-5F)": "27",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "10 lb 10 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40CT-30A",
    "values": {
     "target subcool heating (+/-5F)": "40",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "11 lb 3 oz",
     "additional charge (lb oz)": "0 lb 9 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40CT-30B",
    "values": {
     "target subcool heating (+/-5F)": "40",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "11 lb 3 oz",
     "additional charge (lb oz)": "0 lb 9 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40CT-36A",
    "values": {
     "target subcool heating (+/-5F)": "25",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "12 lb 1 oz",
     "additional charge (lb oz)": "1 lb 7 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40CT-36B",
    "values": {
     "target subcool heating (+/-5F)": "25",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "12 lb 1 oz",
     "additional charge (lb oz)": "1 lb 7 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40HT-42B",
    "values": {
     "target subcool heating (+/-5F)": "10",
     "target subcool cooling (+/-1F)": "22",
     "total charge (lb oz)": "14 lb 7 oz",
     "additional charge (lb oz)": "3 lb 13 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40HT-42C",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "10 lb 13 oz",
     "additional charge (lb oz)": "0 lb 3 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40CT-48B",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "11 lb 2 oz",
     "additional charge (lb oz)": "0 lb 8 oz"
    }
   },
   {
    "row": "SL22KLV-024 / CK40DT-42B",
    "values": {
     "target subcool heating (+/-5F)": "59",
     "target subcool cooling (+/-1F)": "17",
     "total charge (lb oz)": "12 lb 3 oz",
     "additional charge (lb oz)": "1 lb 9 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CBK48MVT-060",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "17 lb 7 oz",
     "additional charge (lb oz)": "1 lb 5 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CBK48MVT-042",
    "values": {
     "target subcool heating (+/-5F)": "39",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "17 lb 2 oz",
     "additional charge (lb oz)": "1 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40CT-49C",
    "values": {
     "target subcool heating (+/-5F)": "27",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "17 lb 8 oz",
     "additional charge (lb oz)": "1 lb 6 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CBK48MVT-048",
    "values": {
     "target subcool heating (+/-5F)": "25",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "17 lb 3 oz",
     "additional charge (lb oz)": "1 lb 1 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40CT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "33",
     "target subcool cooling (+/-1F)": "12",
     "total charge (lb oz)": "16 lb 6 oz",
     "additional charge (lb oz)": "0 lb 4 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40DT-50/60C",
    "values": {
     "target subcool heating (+/-5F)": "53",
     "target subcool cooling (+/-1F)": "12",
     "total charge (lb oz)": "16 lb 2 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40HT-42B",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "17 lb 11 oz",
     "additional charge (lb oz)": "1 lb 9 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40CT-60D",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "19 lb 3 oz",
     "additional charge (lb oz)": "3 lb 1 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40CT-60C",
    "values": {
     "target subcool heating (+/-5F)": "14",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "16 lb 10 oz",
     "additional charge (lb oz)": "1 lb 8 oz"
    }
   },
   {
    "row": "SL22KLV-036 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "13",
     "total charge (lb oz)": "17 lb 15 oz",
     "additional charge (lb oz)": "1 lb 13 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CBK48MVT-060",
    "values": {
     "target subcool heating (+/-5F)": "18",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "17 lb 3 oz",
     "additional charge (lb oz)": "2 lb 15 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CBK48MVT-048",
    "values": {
     "target subcool heating (+/-5F)": "29",
     "target subcool cooling (+/-1F)": "14",
     "total charge (lb oz)": "15 lb 13 oz",
     "additional charge (lb oz)": "1 lb 9 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CK40CT-60C",
    "values": {
     "target subcool heating (+/-5F)": "26",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "14 lb 4 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CK40CT-49C",
    "values": {
     "target subcool heating (+/-5F)": "17",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "15 lb 5 oz",
     "additional charge (lb oz)": "1 lb 1 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CHX35-60D-6F",
    "values": {
     "target subcool heating (+/-5F)": "15",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "16 lb 12 oz",
     "additional charge (lb oz)": "2 lb 4 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CK40HT-42B",
    "values": {
     "target subcool heating (+/-5F)": "7",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "17 lb 2 oz",
     "additional charge (lb oz)": "2 lb 14 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CK40HT-60D",
    "values": {
     "target subcool heating (+/-5F)": "18",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "16 lb 4 oz",
     "additional charge (lb oz)": "3 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-048 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "15",
     "total charge (lb oz)": "16 lb 6 oz",
     "additional charge (lb oz)": "3 lb 2 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CBK48MVT-060",
    "values": {
     "target subcool heating (+/-5F)": "22",
     "target subcool cooling (+/-1F)": "17",
     "total charge (lb oz)": "16 lb 13 oz",
     "additional charge (lb oz)": "2 lb 2 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40CT-60C",
    "values": {
     "target subcool heating (+/-5F)": "16",
     "target subcool cooling (+/-1F)": "18",
     "total charge (lb oz)": "17 lb 9 oz",
     "additional charge (lb oz)": "2 lb 14 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40CT-49C",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "18",
     "total charge (lb oz)": "15 lb 9 oz",
     "additional charge (lb oz)": "0 lb 14 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40HT-60D",
    "values": {
     "target subcool heating (+/-5F)": "24",
     "target subcool cooling (+/-1F)": "20",
     "total charge (lb oz)": "16 lb 11 oz",
     "additional charge (lb oz)": "2 lb 0 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40HT-42B",
    "values": {
     "target subcool heating (+/-5F)": "22",
     "target subcool cooling (+/-1F)": "19",
     "total charge (lb oz)": "16 lb 8 oz",
     "additional charge (lb oz)": "1 lb 13 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40CT-60D",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "17",
     "total charge (lb oz)": "16 lb 5 oz",
     "additional charge (lb oz)": "0 lb 4 oz"
    }
   },
   {
    "row": "SL22KLV-060 / CK40HT-51/61C",
    "values": {
     "target subcool heating (+/-5F)": "12",
     "target subcool cooling (+/-1F)": "16",
     "total charge (lb oz)": "14 lb 11 oz",
     "additional charge (lb oz)": "0 lb 0 oz"
    }
   }
  ],
  "notes": "Table 2 - Indoor Unit Matches and Subcooling Charge Levels and Additional Charge, printed on the SL22KLV Charging Label figure. Cooling Mode: when outdoor ambient is 60F (15C) and above, adjust charge by the subcooling method; cooling targets are based on 70 to 80F (21-27C) indoor return air. Heating Mode: when outdoor ambient is below 60F (15C), use the heating subcool column, based on 65-75F (18-24C) indoor return air. Nameplate charge levels are based on 30 ft (9.1 m) line sets; add 3 oz per 5 ft over 30 ft on a 3/8 in. liquid line, subtract if shorter. Additional Charge is the amount needed in addition to the nameplate charge. R454B is a zeotropic blend - charge with liquid only and use saturated liquid temperature to calculate liquid subcooling. Elsewhere in the manual: subcooling values in the charging sticker are based on 70 to 80F indoor return air, and the EEV controller holds a 10F target suction superheat.",
  "source": "47_SL22KLV.pdf (Lennox SL22KLV (R454B) Series Outdoor Units Service Literature, Corp. 100131, May 2026), Table 2 within FIGURE 53 SL22KLV Charging Label, printed page 97 (PDF page 97)"
 },
 {
  "id": "cc-lennox-lrp14hp-lrp16hp-heating-liquid-subcooling",
  "brand": "Lennox",
  "refrigerant": "R-410A",
  "meteringDevice": "as printed: not stated",
  "models": "LRP14HP / LRP16HP packaged heat pump units",
  "chartType": "target-subcooling-fixed",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": null,
  "units": "F (liquid subcooling, +/- 2 F)",
  "rows": [
   {
    "row": "2 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "25"
    }
   },
   {
    "row": "2.5 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "15"
    }
   },
   {
    "row": "3 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "11"
    }
   },
   {
    "row": "3.5 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "22"
    }
   },
   {
    "row": "4 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "24"
    }
   },
   {
    "row": "5 Ton",
    "values": {
     "liquid subcooling (+/- 2F)": "28"
    }
   }
  ],
  "notes": "TABLE 9 - Heat Pump Heating System Performance Values - LRP14HP / LRP16HP. Printed condition: based on outdoor ambient temperature of 47 F and indoor entering air of 70 F db. Manual states that for maximum heat pump performance the operating temperatures and pressures should be checked and subcooling determined at Standard ARI test conditions of 47 F outdoor / 70 F indoor dry bulb, and if the subcooling measurement deviates the charge should be adjusted accordingly.",
  "source": "29_LRP14_LRP16.pdf (Lennox LRP14HP/AC/GE/GN, LRP16GE/HP Service Literature, Corp. 100032, January 4 2024), TABLE 9, PDF page 34"
 },
 {
  "id": "cc-lennox-lrp16ge-cooling-liquid-subcooling",
  "brand": "Lennox",
  "refrigerant": "R-410A",
  "meteringDevice": "as printed: not stated",
  "models": "LRP16GE packaged gas/electric units",
  "chartType": "target-subcooling-fixed",
  "rowAxis": "nominal capacity (tons)",
  "colAxis": null,
  "units": "F (liquid subcooling, +/- 3 F)",
  "rows": [
   {
    "row": "2 Ton",
    "values": {
     "liquid subcooling (+/- 3F)": "10"
    }
   },
   {
    "row": "3 Ton",
    "values": {
     "liquid subcooling (+/- 3F)": "12"
    }
   },
   {
    "row": "4 Ton",
    "values": {
     "liquid subcooling (+/- 3F)": "10"
    }
   },
   {
    "row": "5 Ton",
    "values": {
     "liquid subcooling (+/- 3F)": "9"
    }
   }
  ],
  "notes": "TABLE 10 - Unit Cooling System Performance Values - LRP16GE. Printed condition: based on outdoor ambient temperature of 82 F and indoor entering air of 80 F db, 67 F wb. Manual states that for maximum cooling performance the operating temperatures and pressures should be checked and subcooling determined at Standard ARI test conditions of 82 F outdoor / 80 F indoor dry bulb / 67 F indoor wet bulb, and if the subcooling measurement deviates the charge should be adjusted accordingly.",
  "source": "29_LRP14_LRP16.pdf (Lennox LRP14HP/AC/GE/GN, LRP16GE/HP Service Literature, Corp. 100032, January 4 2024), TABLE 10, PDF page 34"
 }
];
