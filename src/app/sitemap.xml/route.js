import { NextResponse } from "next/server";
import pool from "@/src/helper/db/db";
// Helper function to generate filter combinations (SEO-optimized)
function generateFilterUrls() {
  const filters = {
    category: [
      "Fireplace",
      "Fireplace%20Mantels",
      "Fire%20Tools",
      "Outdoor",
      "Cast%20Iron",
    ],
    fuelType: [
      "Wood",
      "Electric",
      "Gas",
      "Hybrid%20-%20Wood/Electric",
      "Bio-Ethanol",
    ],
    placement: ["Freestanding", "Inbuilt", "Outdoor"],
    design: ["Single%20Sided", "Two%20Sided", "Three%20Sided", "Four%20Sided"],
    brand: [
      "Esse",
      "Gazco",
      "Stovax",
      "Regency",
      "Morso",
      "Living%20Fire",
      "Paul%20Agnew%20Designs",
      "Kalora",
      "ADF",
      "Austroflamm",
      "Bosq",
      "Eurostove",
      "Heatmaster",
      "Hergom",
    ],
  };

  const urlCombinations = [];

  // 1. High-value: Category + Brand (e.g., /Fireplace/Esse)
  filters.category.forEach((cat) => {
    filters.brand.forEach((brand) => {
      urlCombinations.push(`/allProducts/${cat}/${brand}`);
    });
  });

  // 2. Medium-value: Category + Fuel Type (e.g., /Fireplace/Wood)
  filters.category.forEach((cat) => {
    filters.fuelType.forEach((fuel) => {
      urlCombinations.push(`/allProducts/${cat}/${fuel}`);
    });
  });

  // 3. Medium-value: Category + Placement (e.g., /Fireplace/Freestanding)
  filters.category.forEach((cat) => {
    filters.placement.forEach((place) => {
      urlCombinations.push(`/allProducts/${cat}/${place}`);
    });
  });

  // 4. Limited 3-filter combinations (avoid spammy URLs)
  const topCategories = [
    "Fireplace",
    "Fireplace%20Mantels",
    "Outdoor",
    "Fire%20Tools",
    "Cast%20Iron",
  ];
  topCategories.forEach((cat) => {
    filters.fuelType.slice(0, 2).forEach((fuel) => {
      filters.placement.slice(0, 2).forEach((place) => {
        urlCombinations.push(`/allProducts/${cat}/${fuel}/${place}`);
      });
    });
  });

  return [...new Set(urlCombinations)]; // Remove duplicates
}

async function getAllPages() {
  // Your existing product data
  const products = [
    { brand: "Eurostove", product: "Churchill_5_Convection_Dual_Control" },
    { brand: "Living_Fire", product: "Kosi_No.25" },
    { brand: "Kalora", product: "425R" },
    { brand: "Morso", product: "Ignis_-_Grill_Grate" },
    { brand: "Gazco", product: "eStudio_-_ES165R" },
    { brand: "Kalora", product: "600C" },
    {
      brand: "Living_Fire",
      product: "Nero_Framed_Slimline_-_Black_Fascia_-_1450mm",
    },
    { brand: "ADF", product: "Linea_100_Insert" },
    { brand: "Living_Fire", product: "Aeris_Hanging_–_Black_Shell_-_S/S_Pole" },
    { brand: "Living_Fire", product: "Slimline_Firebox_2000_-_Black_Fascia" },
    {
      brand: "Living_Fire",
      product: "Double_Sided_Slimline_Firebox_1350_-_Brushed_S/S_Fascia",
    },
    { brand: "Living_Fire", product: "Kosi_No.35" },
    { brand: "ADF", product: "Linea_85_B_Freestanding" },
    { brand: "ADF", product: "Linea_85_Insert" },
    { brand: "ADF", product: "Linea_100_Insert_Duo" },
    { brand: "ADF", product: "Hayra_85VL_Freestanding" },
    { brand: "Gazco", product: "eStudio_-_ES60R" },
    { brand: "ADF", product: "Hayra_85VP_Freestanding" },
    { brand: "ADF", product: "Linea_100_L_Freestanding_with_Steel_Base" },
    {
      brand: "ADF",
      product: "Linea_100_B_Duo_L_Freestanding_Heater_[Inc_Open_Base]",
    },
    { brand: "Regency", product: "Bellerive" },
    { brand: "Bosq", product: "Aere_70S_Freestanding" },
    { brand: "Kalora", product: "Fusion" },
    { brand: "Austroflamm", product: "Dexter_-_Door_Hinge_Left" },
    { brand: "Regency", product: "HZO42_-_Outdoor" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Bay" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_2000_Landscape" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_950_Aspect" },
    { brand: "Regency", product: "GFi750" },
    { brand: "Eurostove", product: "Churchill_5_Dual_Control" },
    {
      brand: "Eurostove",
      product: "Churchill_5_Convection_Dual_Control_Logstore",
    },
    { brand: "Esse", product: "700_wood_heater" },
    { brand: "Esse", product: "Ironheart_-_Outside_Air_-_Dry" },
    { brand: "Esse", product: "700_Wood_Heater_-_Outside_Air" },
    { brand: "Esse", product: "775_Wood_Heater_-_Outside_Air" },
    { brand: "Esse", product: "Vector" },
    {
      brand: "Living_Fire",
      product: "Cocoon_Pedestal_Standing_–_Black_Shell_-_S/S_Stand",
    },
    { brand: "Esse", product: "Ironheart_-_Outside_Air_-_Wet" },
    { brand: "Esse", product: "Ironheart_Dry" },
    { brand: "Gazco", product: "Onyx_-_150RW" },
    { brand: "Esse", product: "Ironheart_Wet" },
    { brand: "Esse", product: "Bakeheart_-_Outside_Air_-_Dry" },
    { brand: "Esse", product: "Bakeheart_-_Outside_Air_-_Wet" },
    { brand: "Esse", product: "Warmheart_S_-_Outside_Air_-_Dry" },
    { brand: "Esse", product: "Warmheart_S_-_Outside_Air_-_Wet" },
    { brand: "Esse", product: "1000_H" },
    { brand: "Esse", product: "1000_W" },
    { brand: "Gazco", product: "Onyx_-_110RW" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF" },
    { brand: "Regency", product: "Chicago_Corner_40_-_Right" },
    { brand: "Gazco", product: "Riva2" },
    { brand: "Heatmaster", product: "Seamless_Gas_Log_Fireplace" },
    { brand: "Gazco", product: "eStudio_-_ES135R" },
    { brand: "Morso", product: "Kamino_Outdoor_Fireplace" },
    { brand: "Gazco", product: "eStudio_-_ES105R" },
    { brand: "Hergom", product: "Glance_L_Freestanding" },
    { brand: "Morso", product: "1410_Freestanding" },
    { brand: "Hergom", product: "Hergom_Fire_Pit_-_Meteor" },
    { brand: "Regency", product: "Renmark" },
    { brand: "Regency", product: "New_York_View_40" },
    { brand: "Bosq", product: "Aere_70S_Insert" },
    { brand: "Heatmaster", product: "B750_-_Uninsulated_Firebox" },
    { brand: "Regency", product: "San_Francisco_Bay_60" },
    { brand: "Heatmaster", product: "Enviro_Ng_(Logs)" },
    { brand: "Stovax", product: "Studio_2_Freestanding" },
    { brand: "Living_Fire", product: "3-Fold_Rounded_Fire_Screen" },
    { brand: "Gazco", product: "eStudio_-_ES85R" },
    { brand: "Living_Fire", product: "Vellum_Wall_Mounted_-_S/S" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Slimline_50in_(1270mm)" },
    { brand: "Regency", product: "Berwick" },
    { brand: "Paul_Agnew_Designs", product: "Alto_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1250_Bay" },
    { brand: "Regency", product: "Ei25_Electric_Insert" },
    { brand: "Regency", product: "GF1500LST_-_LPG" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1250_Right_Corner" },
    { brand: "Regency", product: "San_San_Francisco_Bay_40" },
    { brand: "Regency", product: "Hume" },
    { brand: "Regency", product: "Windsor" },
    {
      brand: "Paul_Agnew_Designs",
      product: "Hestia_1400_Guillotine_Glass_Fronted",
    },
    { brand: "Regency", product: "FG39" },
    { brand: "Paul_Agnew_Designs", product: "Sie_750_Tunnel_Freestanding" },
    { brand: "Morso", product: "Morso_-_Brush_And_Scraper_Set" },
    { brand: "Regency", product: "Cardinia" },
    { brand: "Regency", product: "Alterra" },
    { brand: "Regency", product: "Gosford" },
    { brand: "Living_Fire", product: "2_Tier_Wood_Rack_w/_Firetools_-_Large" },
    { brand: "Austroflamm", product: "Clou_Xtra" },
    { brand: "Regency", product: "GF1500L" },
    { brand: "Austroflamm", product: "S120-45s_Cassette" },
    { brand: "Regency", product: "Montrose" },
    { brand: "Stovax", product: "Studio_2_Insert" },
    { brand: "Regency", product: "New_York_View_60" },
    { brand: "Regency", product: "DVi34L" },
    { brand: "Regency", product: "Chicago_Corner_40_-_Left" },
    { brand: "Regency", product: "GF950_-_LPG" },
    { brand: "Regency", product: "HZO42_-_Outdoor_-_LPG" },
    { brand: "Regency", product: "GF950L" },
    { brand: "Regency", product: "Albany" },
    { brand: "Regency", product: "Narrabri" },
    { brand: "Gazco", product: "Onyx_-_190RW" },
    { brand: "Regency", product: "Mansfield" },
    { brand: "Regency", product: "PG36" },
    { brand: "Morso", product: "Morso_-_Culi_Bbq_Grill_Fork" },
    { brand: "Kalora", product: "500C" },
    { brand: "Austroflamm", product: "Dexter_-_Door_Hinge_Right" },
    { brand: "Morso", product: "Grill_71" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "700_Decorative_Fascia_-_Black" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Freestanding" },
    { brand: "Hergom", product: "Glance" },
    { brand: "Living_Fire", product: "Black_-_Brass_Trim_-_4pc_Set" },
    { brand: "Hergom", product: "E-30_Freestanding" },
    { brand: "Living_Fire", product: "Fire_Grate_-_745mm" },
    { brand: "Hergom", product: "E-40_Freestanding" },
    { brand: "Morso", product: "7970_Wall_Mounted" },
    { brand: "Morso", product: "6143_Freestanding" },
    { brand: "Living_Fire", product: "Black_-_Pewter_Handle_-_4pc_Set" },
    { brand: "Morso", product: "1440_Freestanding" },
    { brand: "Morso", product: "6148_Freestanding" },
    { brand: "Morso", product: "7943_Freestanding" },
    { brand: "Morso", product: "7948_Freestanding" },
    { brand: "Morso", product: "8843_Freestanding" },
    { brand: "Bosq", product: "Aere_70S_Freestanding_L_-_Black_Steel_Base" },
    { brand: "Paul_Agnew_Designs", product: "850_Classic_Fascia_Black" },
    { brand: "ADF", product: "Hayra_85VB_Freestanding" },
    { brand: "ADF", product: "Linea_100_B_Freestanding" },
    { brand: "Living_Fire", product: "Black_Heavy_Duty_-_4pc_Set" },
    { brand: "Kalora", product: "Accent" },
    { brand: "ADF", product: "Linea_100_Duo_Freestanding" },
    { brand: "Austroflamm", product: "Woody" },
    { brand: "Kalora", product: "500BX_Woodstack" },
    { brand: "Kalora", product: "600BX_Woodstack" },
    { brand: "Living_Fire", product: "Black_-_Pewter_Trim_-_4pc_Set" },
    { brand: "Kalora", product: "Chalet_5" },
    { brand: "Kalora", product: "Chalet_6" },
    { brand: "Kalora", product: "Urban_LS" },
    { brand: "Kalora", product: "Urban_PT" },
    { brand: "Kalora", product: "Sorrento" },
    { brand: "Kalora", product: "Zenith_Electric_Fire_-_36in" },
    { brand: "Kalora", product: "Zenith_Electric_Fire_-_42in" },
    { brand: "Living_Fire", product: "Black_Heavy_Duty_-_4pc_Set" },
    { brand: "Morso", product: "Morso_-_Culi_BBQ_Grill_Tongs" },
    { brand: "Kalora", product: "Zenith_Electric_Fire_-_60in" },
    { brand: "Kalora", product: "Zenith_Electric_Fire_-_72in" },
    { brand: "Kalora", product: "Zenith_Electric_Fire_-_88in" },
    { brand: "Kalora", product: "Nexus_Electric_Fire_-_36in" },
    { brand: "Living_Fire", product: "3-Fold__Squared_Fire_Screen" },
    { brand: "Kalora", product: "Nexus_Electric_Fire_-_50in" },
    { brand: "Kalora", product: "Nexus_Electric_Fire_-_60in" },
    { brand: "Morso", product: "Forno_-_Garden_Set" },
    { brand: "Kalora", product: "Nexus_Electric_Fire_-_74in" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_1650_Landscape" },
    { brand: "Living_Fire", product: "Black_-_3pc_Set" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_2600_Landscape" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Insert" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_950_Landscape" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_950LT" },
    {
      brand: "Living_Fire",
      product: "4-Fold_Fire_Screen_Black_W/_Pewter_Finish",
    },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Woodland_Stove" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Slimline_60in_(1524mm)" },
    { brand: "Paul_Agnew_Designs", product: "Ilektro_Slimline_72in_(1828mm)" },
    { brand: "Paul_Agnew_Designs", product: "Alto_Glass_Fronted" },
    { brand: "Living_Fire", product: "Black_-_4pc_Set" },
    { brand: "Paul_Agnew_Designs", product: "Quadro_800_Glass_Fronted" },
    { brand: "Paul_Agnew_Designs", product: "Quadro_800_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1250_Glass_Fronted" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1250_Left_Corner" },
    { brand: "Living_Fire", product: "Black_with_Scraper_-_4pc_Set" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Glass_Fronted" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Left_Corner" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Right_Corner" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Peninsula" },
    { brand: "Morso", product: "Forno_Outdoor_Oven" },
    { brand: "Paul_Agnew_Designs", product: "Vue_1410_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1200_Guillotine_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1400_Guillotine_Tunnel" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1000_Bay_Guillotine" },
    { brand: "Morso", product: "Grill_71_Table" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF2L" },
    { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF2R" },
    {
      brand: "Paul_Agnew_Designs",
      product: "Hestia_1200_Guillotine_Glass_Fronted",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "Hestia_1000_Peninsula_Guillotine",
    },
    { brand: "Morso", product: "Ignis_Outdoor_Fire_Pit" },
    { brand: "Morso", product: "Morso_-_Faro_Lantern_-_80h" },
    { brand: "Paul_Agnew_Designs", product: "i700_Stove" },
    { brand: "Paul_Agnew_Designs", product: "Modica_600_Freestanding" },
    { brand: "Paul_Agnew_Designs", product: "Sie_750GF_Freestanding" },
    { brand: "Paul_Agnew_Designs", product: "Sie_750GF2R" },
    {
      brand: "Living_Fire",
      product: "3-Fold_Rounded_-_Black_W/_Nickel_Plated_Top_Frame",
    },
    { brand: "Paul_Agnew_Designs", product: "Sie_750GF2L" },
    { brand: "Paul_Agnew_Designs", product: "Sie_750GF3" },
    { brand: "Paul_Agnew_Designs", product: "Sie_750_G4_Freestanding" },
    { brand: "Living_Fire", product: "3-Fold_Rounded_Fire_Screen" },
    {
      brand: "Paul_Agnew_Designs",
      product: "700_Square_W/_Motif_Fascia_-_Black",
    },
    { brand: "Living_Fire", product: "Curved_Stand_-_4pc_Set" },
    { brand: "Morso", product: "Grill_Forno_II_Outdoor_Oven" },
    { brand: "Living_Fire", product: "Fire_Grate_-_915mm" },
    { brand: "Living_Fire", product: "Fire_Grates_-_Premium_Range_-_600mm" },
    {
      brand: "Living_Fire",
      product: "Fire_Grates_-_Premium_Range_-_8_Bar_-_750mm",
    },
    {
      brand: "Living_Fire",
      product: "Fixed_Wing_Sloping__-_Large_Fire_Screen",
    },
    {
      brand: "Living_Fire",
      product: "Fixed_Wing_Sloping_Fire_Screen__-_Small",
    },
    { brand: "Living_Fire", product: "Flaming_Magic_30g" },
    {
      brand: "Living_Fire",
      product: "Heavy_Duty_Classic__Black_-_Brass_-_4pc_Set",
    },
    { brand: "Living_Fire", product: "Tongio_Forging_-__Tongs" },
    { brand: "Living_Fire", product: "Tongio_Forging_-_Deluxe_-_3pc_Set" },
    {
      brand: "Living_Fire",
      product: "Tongio_Forging_-_Deluxe_-_Poker_-_Log_Roller",
    },
    { brand: "Living_Fire", product: "Tongio_Forging_-_Rake" },
    { brand: "Living_Fire", product: "Tongio_Forging_-_Riviera_-_3pc_Set" },
    { brand: "Living_Fire", product: "Tongio_Forging_-_Tongs_-_4pc_Set" },
    { brand: "Living_Fire", product: "Tongio_Forging_Deluxe_-_4pc_Set" },
    { brand: "Living_Fire", product: "Wood_Storage_-_Wood_Ring_With_Tray" },
    { brand: "Living_Fire", product: "Gated_Fire_Screen" },
    { brand: "Morso", product: "Forno_-_S/S_Fire_Divide" },
    { brand: "Morso", product: "Forno_-_Terra_Set" },
    { brand: "Morso", product: "Forno_-_Terra_Table" },
    { brand: "Morso", product: "Forno_Outdoor_-_Garden_Table" },
    { brand: "Morso", product: "Forno_-_Door" },
    { brand: "Morso", product: "Forno_Garden_Table_-_Cover" },
    { brand: "Morso", product: "Grill_Forno_-_Cover" },
    { brand: "Morso", product: "Grill_Forno_-_Door" },
    { brand: "Hergom", product: "Hergom_Fire_Pit_-_Ignis" },
    { brand: "Eurostove", product: "Loxton_5_Standard" },
    { brand: "Hergom", product: "Hergom_Fire_Pit_-_Zenith" },
    { brand: "Morso", product: "Morso_-_Culi_BBQ_Grill_Turner_[Spatula]" },
    { brand: "Morso", product: "Morso_-_Faro_Lantern_-_30h" },
    { brand: "Morso", product: "Morso_-_Faro_Lantern_-_55h" },
    { brand: "Morso", product: "Forno_-_Cover" },
    { brand: "Morso", product: "Forno_-_Flue_Pipe" },
    { brand: "Morso", product: "Morso_-_Fire_Tongs" },
    { brand: "Morso", product: "Morsø_-_Frying_Dish_and_Serving_Plate" },
    { brand: "Morso", product: "Morso_-_Garden_Table_Shelf" },
    { brand: "Morso", product: "Morso_-_Kamino_Cover" },
    { brand: "Morso", product: "Morso_-_Multi_Cocotte_4.6L_w/_Griddle_Lid" },
    { brand: "Morso", product: "Morso_-_Outdoor_Side_Table" },
    { brand: "Morso", product: "Morso_-_Pizza_&_Herb_Cutter" },
    { brand: "Morso", product: "Morso_-_Pizza_Peel" },
    { brand: "Morso", product: "Morso_-_Smokeeper" },
    { brand: "Morso", product: "Morso_-_Smoker_Box" },
    { brand: "Morso", product: "Morso_-_Steel_Handle" },
    { brand: "Morso", product: "Morso_Grill_17" },
    { brand: "Morso", product: "Morso_-_Table_Cover" },
    { brand: "Morso", product: "Morso_-_Tuscan_Grill" },
    { brand: "Morso", product: "Morso_-_Tuscan_Plancha" },
    {
      brand: "Paul_Agnew_Designs",
      product: "6000_Pattern_Square_Fascia_-_Black",
    },
    { brand: "Morso", product: "Morso_-_Vetro_Pizza_&_Frying_Plate" },
    { brand: "Morso", product: "Morso_Grill_-_Cover" },
    { brand: "Morso", product: "Forno_-_Brick_Set" },
    { brand: "Morso", product: "Forno_-_Terra_Table_Shelf" },
    { brand: "Morso", product: "Morso_-_Ash_Scraper" },
    { brand: "Paul_Agnew_Designs", product: "Athena_-_Black_Granite_-_1500" },
    { brand: "Paul_Agnew_Designs", product: "Riversdale_-_White_-_1500" },
    { brand: "Paul_Agnew_Designs", product: "Bouvet_-_Italian_Carrara_-_1310" },
    { brand: "Paul_Agnew_Designs", product: "Chilton-White-1370" },
    { brand: "Paul_Agnew_Designs", product: "Hampshire_-_Standard_Raw_-_1500" },
    { brand: "Paul_Agnew_Designs", product: "Milos_-_Lu_Grey_-_1310" },
    { brand: "Paul_Agnew_Designs", product: "700_Victorian_Fascia_-_Polished" },
    {
      brand: "Paul_Agnew_Designs",
      product: "New_William_IV_-_Italian_Cararra_-_1500",
    },
    { brand: "Paul_Agnew_Designs", product: "Paros_-_Lu_Grey_-_1459" },
    { brand: "Paul_Agnew_Designs", product: "Naxos_Mantel_-_Luna_Grey_-_1420" },
    {
      brand: "Paul_Agnew_Designs",
      product: "Victorian_Arched_-_Italian_Cararra_-_1650",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "Victorian_Arched_-_Mocha_Beige_-_1650",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "Victorian_Corbel_-_Mocha_Beige_-_1470",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "Victorian_Corbel_-_Mocha_Beige_-_1500",
    },
    { brand: "Paul_Agnew_Designs", product: "Victorian_Corbel_-_White_-_1470" },
    {
      brand: "Paul_Agnew_Designs",
      product: "Windsor_-_Italian_Cararra_-_1650",
    },
    { brand: "Paul_Agnew_Designs", product: "Hampshire_-_Large_Raw_-_1650" },
    { brand: "Paul_Agnew_Designs", product: "700_Classic_Fascia_-_Black" },
    {
      brand: "Paul_Agnew_Designs",
      product: "700_Decorative_Fascia_-_Arched_-_Polished",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "700_Decorative_Square_Fascia_-_Polished",
    },
    {
      brand: "Paul_Agnew_Designs",
      product: "850_Victorian_Arch_Fascia_-_Black",
    },
    { brand: "Paul_Agnew_Designs", product: "Camden_Insert_-_Black" },
    { brand: "Paul_Agnew_Designs", product: "Dublin_Insert_-_Black" },
    { brand: "Paul_Agnew_Designs", product: "550_Classic_Fascia_-_Black" },
    { brand: "Paul_Agnew_Designs", product: "Integra_Anson" },
    { brand: "Paul_Agnew_Designs", product: "Malvern_Insert_Black" },
    { brand: "Paul_Agnew_Designs", product: "Royal_Arch_Insert_-_Black" },
  ];

  // Construct product URLs
  const productUrls = products.map(
    ({ brand, product }) =>
      `/${encodeURIComponent(brand)}/${encodeURIComponent(product)}`
  );
  const filters = [
    ["Fireplace"],
    ["Fireplace%20Mantels"],
    ["Fire%20Tools"],
    ["Outdoor"],
    ["Cast%20Iron"],
    ["Hybrid%20-%20Wood/Electric"],
    ["Bio-Ethanol"],
    ["Gas"],
    ["Wood"],
    ["Electric"],
    ["Outdoor"],
    ["Inbuilt"],
    ["Freestanding"],
    ["Three%20Sided"],
    ["Two%20Sided"],
    ["Single%20Sided"],
    ["Four%20Sided"],
    ["Esse"],
    ["Kalora"],
    ["ADF"],
    ["Austroflamm"],
    ["Bosq"],
    ["Eurostove"],
    ["Gazco"],
    ["Heatmaster"],
    ["Hergom"],
    ["Living%20Fire"],
    ["Paul%20Agnew%20Designs"],
    ["Regency"],
    ["Morso"],
    ["Stovax"],
    ["Firepit"],
    // ["Heatmaster%20Wood"],
    ["Studio%202"],
    ["Greenfire"],
    ["City%20Series"],
    ["Heatmaster%20Gas"],
    ["ilektro%20Freestanding"],
    ["Aerion"],
    ["ilektro%20insert"],
    ["Hestia"],
    ["Pyro"],
    ["ilektro"],
    ["ilektro%20Slimline"],
    ["Ironheart%20Range"],
    ["Aere"],
    ["Churchill"],
    ["E-Series"],
    ["eStudio"],
    ["Glance"],
    ["Hayra"],
    ["Linea"],
    ["Nero"],
    ["Onyx"],
    ["Siena"],
    ["Slimline"],
    ["zenitth"],
    ["Cocoon%20Pedestal"],
    ["Vellum"],
    ["1000"],
    ["Regency%20Wood"],
    ["Regency%20Gas"],
    ["Regency%20Electric"],
    ["Forno"],
    ["Ignis"],
    ["Kamino"],
    ["Lanterns"],
    ["Morso%20Grill%2017"],
    ["Tuscan"],
    ["Austroflamm%20Wood"],
    ["Dexter"],
    ["Kalora%20Wood"],
  ];

  const filterSingleUrls = filters.map(
    (filterArray) =>
      `/allProducts/${filterArray.map(encodeURIComponent).join("/")}`
  );

  // Generate SEO-optimized filter URLs
  const filterUrls = generateFilterUrls();

  // Static pages (with corrected paths)
  const staticPages = [
    "/",
    "/home",
    "/our-story",
    "/maintenance-service",
    "/about",
    "/contact",
    "/warranty",
    "/terms",
    "/specificationSheet",
    "/privacy-policy",
    "/specification-sheet", // Changed from specificationSheet
    "/blog", // Added for content marketing
    "/showrooms", // Added if applicable
  ];

  return [...staticPages, ...productUrls, ...filterUrls, ...filterSingleUrls];
}

// export async function GET() {
//   const siteUrl = "https://livingfires.com.au";
//   const lastModDate = new Date().toISOString().split("T")[0];

//   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//   xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
//   xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
//   xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

//   // 1. Get all pages (static + dynamic)
//   const pages = await getAllPages();
//   const urlSet = new Set();

//   // 2. Process all URLs
//   for (const page of pages) {
//     if (!page || typeof page !== "string" || page.includes("undefined"))
//       continue;

//     const cleanedUrl = page.replace(/\/{2,}/g, "/").replace(/\/$/, "");
//     if (urlSet.has(cleanedUrl)) continue;
//     urlSet.add(cleanedUrl);

//     // Priority logic
//     const isProductUrl = /\/[^/]+\/[^/]+$/.test(cleanedUrl);
//     const priority =
//       cleanedUrl == "/"
//         ? "1.0"
//         : isProductUrl
//         ? "0.9"
//         : cleanedUrl.startsWith("/allProducts")
//         ? "0.7"
//         : "0.8";

//     xml += `  <url>\n`;
//     xml += `    <loc>${siteUrl}${cleanedUrl}</loc>\n`;
//     xml += `    <lastmod>${lastModDate}</lastmod>\n`;
//     xml += `    <changefreq>${
//       cleanedUrl.includes("/blog/") ? "weekly" : "monthly"
//     }</changefreq>\n`;
//     xml += `    <priority>${priority}</priority>\n`;

//     // Add hero images for product pages
//     if (isProductUrl) {
//       const [brand, productName] = cleanedUrl.split("/").filter(Boolean);

//       try {
//         // Fetch product data with hero images
//         const { rows } = await pool.query(
//           `SELECT
//             name,
//             brand_name,
//             hero_image
//           FROM tbl_master
//           WHERE name = $1 AND brand_name = $2`,
//           [decodeURIComponent(productName), decodeURIComponent(brand)]
//         );
//         if (rows.length > 0) {
//           const product = rows[0];

//           // Handle hero_image format (array or single object)
//           let heroImages = [];
//           if (Array.isArray(product?.hero_image)) {
//             heroImages = product?.hero_image;
//           } else if (product?.hero_image?.value) {
//             heroImages = [product?.hero_image];
//           }

//           // Add all hero images to sitemap
//           heroImages.forEach((image, index) => {
//             if (image?.value && image.value !== "TBC") {
//               xml += `    <image:image>\n`;
//               xml += `      <image:loc>${image.value}</image:loc>\n`;
//               xml += `      <image:title>${product.brand_name} ${
//                 product.name
//               } ${index > 0 ? `- Image ${index + 1}` : ""}</image:title>\n`;
//               xml += `      <image:caption>${product.brand_name} ${product.name}</image:caption>\n`;
//               xml += `    </image:image>\n`;
//             }
//           });
//         }
//       } catch (error) {
//         console.error(`Error fetching product data for ${cleanedUrl}:`, error);
//       }
//     }

//     xml += `  </url>\n`;
//   }

//   xml += `</urlset>`;

//   return new NextResponse(xml, {
//     headers: {
//       "Content-Type": "application/xml",
//       "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
//     },
//   });
// }

// Helper function to verify images with Googlebot

export async function GET() {
  const siteUrl = "https://livingfires.com.au";
  const lastModDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  const pages = await getAllPages();
  const urlSet = new Set();

  for (const page of pages) {
    if (!page || typeof page !== "string") continue;

    const cleanedUrl = page.replace(/\/{2,}/g, "/").replace(/\/$/, "");

    if (urlSet.has(cleanedUrl)) continue;
    urlSet.add(cleanedUrl);

    // Priority logic - SIMPLIFIED
    // alert(cleanedUrl)
    //   const priority =
    // cleanedUrl === "/" ? "1.0" : // Highest priority for homepage
    // !cleanedUrl?"1.0":
    // cleanedUrl.includes("/allProducts") ? "0.8" :
    // cleanedUrl.includes(product)? "0.9": "0.7"; // Default priorities
    const products = [
      { brand: "Eurostove", product: "Churchill_5_Convection_Dual_Control" },
      { brand: "Living_Fire", product: "Kosi_No.25" },
      { brand: "Kalora", product: "425R" },
      { brand: "Morso", product: "Ignis_-_Grill_Grate" },
      { brand: "Gazco", product: "eStudio_-_ES165R" },
      { brand: "Kalora", product: "600C" },
      {
        brand: "Living_Fire",
        product: "Nero_Framed_Slimline_-_Black_Fascia_-_1450mm",
      },
      { brand: "ADF", product: "Linea_100_Insert" },
      {
        brand: "Living_Fire",
        product: "Aeris_Hanging_–_Black_Shell_-_S/S_Pole",
      },
      { brand: "Living_Fire", product: "Slimline_Firebox_2000_-_Black_Fascia" },
      {
        brand: "Living_Fire",
        product: "Double_Sided_Slimline_Firebox_1350_-_Brushed_S/S_Fascia",
      },
      { brand: "Living_Fire", product: "Kosi_No.35" },
      { brand: "ADF", product: "Linea_85_B_Freestanding" },
      { brand: "ADF", product: "Linea_85_Insert" },
      { brand: "ADF", product: "Linea_100_Insert_Duo" },
      { brand: "ADF", product: "Hayra_85VL_Freestanding" },
      { brand: "Gazco", product: "eStudio_-_ES60R" },
      { brand: "ADF", product: "Hayra_85VP_Freestanding" },
      { brand: "ADF", product: "Linea_100_L_Freestanding_with_Steel_Base" },
      {
        brand: "ADF",
        product: "Linea_100_B_Duo_L_Freestanding_Heater_[Inc_Open_Base]",
      },
      { brand: "Regency", product: "Bellerive" },
      { brand: "Bosq", product: "Aere_70S_Freestanding" },
      { brand: "Kalora", product: "Fusion" },
      { brand: "Austroflamm", product: "Dexter_-_Door_Hinge_Left" },
      { brand: "Regency", product: "HZO42_-_Outdoor" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Bay" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_2000_Landscape" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_950_Aspect" },
      { brand: "Regency", product: "GFi750" },
      { brand: "Eurostove", product: "Churchill_5_Dual_Control" },
      {
        brand: "Eurostove",
        product: "Churchill_5_Convection_Dual_Control_Logstore",
      },
      { brand: "Esse", product: "700_wood_heater" },
      { brand: "Esse", product: "Ironheart_-_Outside_Air_-_Dry" },
      { brand: "Esse", product: "700_Wood_Heater_-_Outside_Air" },
      { brand: "Esse", product: "775_Wood_Heater_-_Outside_Air" },
      { brand: "Esse", product: "Vector" },
      {
        brand: "Living_Fire",
        product: "Cocoon_Pedestal_Standing_–_Black_Shell_-_S/S_Stand",
      },
      { brand: "Esse", product: "Ironheart_-_Outside_Air_-_Wet" },
      { brand: "Esse", product: "Ironheart_Dry" },
      { brand: "Gazco", product: "Onyx_-_150RW" },
      { brand: "Esse", product: "Ironheart_Wet" },
      { brand: "Esse", product: "Bakeheart_-_Outside_Air_-_Dry" },
      { brand: "Esse", product: "Bakeheart_-_Outside_Air_-_Wet" },
      { brand: "Esse", product: "Warmheart_S_-_Outside_Air_-_Dry" },
      { brand: "Esse", product: "Warmheart_S_-_Outside_Air_-_Wet" },
      { brand: "Esse", product: "1000_H" },
      { brand: "Esse", product: "1000_W" },
      { brand: "Gazco", product: "Onyx_-_110RW" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF" },
      { brand: "Regency", product: "Chicago_Corner_40_-_Right" },
      { brand: "Gazco", product: "Riva2" },
      { brand: "Heatmaster", product: "Seamless_Gas_Log_Fireplace" },
      { brand: "Gazco", product: "eStudio_-_ES135R" },
      { brand: "Morso", product: "Kamino_Outdoor_Fireplace" },
      { brand: "Gazco", product: "eStudio_-_ES105R" },
      { brand: "Hergom", product: "Glance_L_Freestanding" },
      { brand: "Morso", product: "1410_Freestanding" },
      { brand: "Hergom", product: "Hergom_Fire_Pit_-_Meteor" },
      { brand: "Regency", product: "Renmark" },
      { brand: "Regency", product: "New_York_View_40" },
      { brand: "Bosq", product: "Aere_70S_Insert" },
      { brand: "Heatmaster", product: "B750_-_Uninsulated_Firebox" },
      { brand: "Regency", product: "San_Francisco_Bay_60" },
      { brand: "Heatmaster", product: "Enviro_Ng_(Logs)" },
      { brand: "Stovax", product: "Studio_2_Freestanding" },
      { brand: "Living_Fire", product: "3-Fold_Rounded_Fire_Screen" },
      { brand: "Gazco", product: "eStudio_-_ES85R" },
      { brand: "Living_Fire", product: "Vellum_Wall_Mounted_-_S/S" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Ilektro_Slimline_50in_(1270mm)",
      },
      { brand: "Regency", product: "Berwick" },
      { brand: "Paul_Agnew_Designs", product: "Alto_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1250_Bay" },
      { brand: "Regency", product: "Ei25_Electric_Insert" },
      { brand: "Regency", product: "GF1500LST_-_LPG" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1250_Right_Corner" },
      { brand: "Regency", product: "San_San_Francisco_Bay_40" },
      { brand: "Regency", product: "Hume" },
      { brand: "Regency", product: "Windsor" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Hestia_1400_Guillotine_Glass_Fronted",
      },
      { brand: "Regency", product: "FG39" },
      { brand: "Paul_Agnew_Designs", product: "Sie_750_Tunnel_Freestanding" },
      { brand: "Morso", product: "Morso_-_Brush_And_Scraper_Set" },
      { brand: "Regency", product: "Cardinia" },
      { brand: "Regency", product: "Alterra" },
      { brand: "Regency", product: "Gosford" },
      {
        brand: "Living_Fire",
        product: "2_Tier_Wood_Rack_w/_Firetools_-_Large",
      },
      { brand: "Austroflamm", product: "Clou_Xtra" },
      { brand: "Regency", product: "GF1500L" },
      { brand: "Austroflamm", product: "S120-45s_Cassette" },
      { brand: "Regency", product: "Montrose" },
      { brand: "Stovax", product: "Studio_2_Insert" },
      { brand: "Regency", product: "New_York_View_60" },
      { brand: "Regency", product: "DVi34L" },
      { brand: "Regency", product: "Chicago_Corner_40_-_Left" },
      { brand: "Regency", product: "GF950_-_LPG" },
      { brand: "Regency", product: "HZO42_-_Outdoor_-_LPG" },
      { brand: "Regency", product: "GF950L" },
      { brand: "Regency", product: "Albany" },
      { brand: "Regency", product: "Narrabri" },
      { brand: "Gazco", product: "Onyx_-_190RW" },
      { brand: "Regency", product: "Mansfield" },
      { brand: "Regency", product: "PG36" },
      { brand: "Morso", product: "Morso_-_Culi_Bbq_Grill_Fork" },
      { brand: "Kalora", product: "500C" },
      { brand: "Austroflamm", product: "Dexter_-_Door_Hinge_Right" },
      { brand: "Morso", product: "Grill_71" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_1250_Landscape_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "700_Decorative_Fascia_-_Black" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_Freestanding" },
      { brand: "Hergom", product: "Glance" },
      { brand: "Living_Fire", product: "Black_-_Brass_Trim_-_4pc_Set" },
      { brand: "Hergom", product: "E-30_Freestanding" },
      { brand: "Living_Fire", product: "Fire_Grate_-_745mm" },
      { brand: "Hergom", product: "E-40_Freestanding" },
      { brand: "Morso", product: "7970_Wall_Mounted" },
      { brand: "Morso", product: "6143_Freestanding" },
      { brand: "Living_Fire", product: "Black_-_Pewter_Handle_-_4pc_Set" },
      { brand: "Morso", product: "1440_Freestanding" },
      { brand: "Morso", product: "6148_Freestanding" },
      { brand: "Morso", product: "7943_Freestanding" },
      { brand: "Morso", product: "7948_Freestanding" },
      { brand: "Morso", product: "8843_Freestanding" },
      { brand: "Bosq", product: "Aere_70S_Freestanding_L_-_Black_Steel_Base" },
      { brand: "Paul_Agnew_Designs", product: "850_Classic_Fascia_Black" },
      { brand: "ADF", product: "Hayra_85VB_Freestanding" },
      { brand: "ADF", product: "Linea_100_B_Freestanding" },
      { brand: "Living_Fire", product: "Black_Heavy_Duty_-_4pc_Set" },
      { brand: "Kalora", product: "Accent" },
      { brand: "ADF", product: "Linea_100_Duo_Freestanding" },
      { brand: "Austroflamm", product: "Woody" },
      { brand: "Kalora", product: "500BX_Woodstack" },
      { brand: "Kalora", product: "600BX_Woodstack" },
      { brand: "Living_Fire", product: "Black_-_Pewter_Trim_-_4pc_Set" },
      { brand: "Kalora", product: "Chalet_5" },
      { brand: "Kalora", product: "Chalet_6" },
      { brand: "Kalora", product: "Urban_LS" },
      { brand: "Kalora", product: "Urban_PT" },
      { brand: "Kalora", product: "Sorrento" },
      { brand: "Kalora", product: "Zenith_Electric_Fire_-_36in" },
      { brand: "Kalora", product: "Zenith_Electric_Fire_-_42in" },
      { brand: "Living_Fire", product: "Black_Heavy_Duty_-_4pc_Set" },
      { brand: "Morso", product: "Morso_-_Culi_BBQ_Grill_Tongs" },
      { brand: "Kalora", product: "Zenith_Electric_Fire_-_60in" },
      { brand: "Kalora", product: "Zenith_Electric_Fire_-_72in" },
      { brand: "Kalora", product: "Zenith_Electric_Fire_-_88in" },
      { brand: "Kalora", product: "Nexus_Electric_Fire_-_36in" },
      { brand: "Living_Fire", product: "3-Fold__Squared_Fire_Screen" },
      { brand: "Kalora", product: "Nexus_Electric_Fire_-_50in" },
      { brand: "Kalora", product: "Nexus_Electric_Fire_-_60in" },
      { brand: "Morso", product: "Forno_-_Garden_Set" },
      { brand: "Kalora", product: "Nexus_Electric_Fire_-_74in" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_1650_Landscape" },
      { brand: "Living_Fire", product: "Black_-_3pc_Set" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_2600_Landscape" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_Insert" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_950_Landscape" },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_950LT" },
      {
        brand: "Living_Fire",
        product: "4-Fold_Fire_Screen_Black_W/_Pewter_Finish",
      },
      { brand: "Paul_Agnew_Designs", product: "Ilektro_Woodland_Stove" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Ilektro_Slimline_60in_(1524mm)",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Ilektro_Slimline_72in_(1828mm)",
      },
      { brand: "Paul_Agnew_Designs", product: "Alto_Glass_Fronted" },
      { brand: "Living_Fire", product: "Black_-_4pc_Set" },
      { brand: "Paul_Agnew_Designs", product: "Quadro_800_Glass_Fronted" },
      { brand: "Paul_Agnew_Designs", product: "Quadro_800_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1250_Glass_Fronted" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1250_Left_Corner" },
      { brand: "Living_Fire", product: "Black_with_Scraper_-_4pc_Set" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Glass_Fronted" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Left_Corner" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Right_Corner" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Peninsula" },
      { brand: "Morso", product: "Forno_Outdoor_Oven" },
      { brand: "Paul_Agnew_Designs", product: "Vue_1410_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1200_Guillotine_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1400_Guillotine_Tunnel" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1000_Bay_Guillotine" },
      { brand: "Morso", product: "Grill_71_Table" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF2L" },
      { brand: "Paul_Agnew_Designs", product: "Hestia_1000_GF2R" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Hestia_1200_Guillotine_Glass_Fronted",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Hestia_1000_Peninsula_Guillotine",
      },
      { brand: "Morso", product: "Ignis_Outdoor_Fire_Pit" },
      { brand: "Morso", product: "Morso_-_Faro_Lantern_-_80h" },
      { brand: "Paul_Agnew_Designs", product: "i700_Stove" },
      { brand: "Paul_Agnew_Designs", product: "Modica_600_Freestanding" },
      { brand: "Paul_Agnew_Designs", product: "Sie_750GF_Freestanding" },
      { brand: "Paul_Agnew_Designs", product: "Sie_750GF2R" },
      {
        brand: "Living_Fire",
        product: "3-Fold_Rounded_-_Black_W/_Nickel_Plated_Top_Frame",
      },
      { brand: "Paul_Agnew_Designs", product: "Sie_750GF2L" },
      { brand: "Paul_Agnew_Designs", product: "Sie_750GF3" },
      { brand: "Paul_Agnew_Designs", product: "Sie_750_G4_Freestanding" },
      { brand: "Living_Fire", product: "3-Fold_Rounded_Fire_Screen" },
      {
        brand: "Paul_Agnew_Designs",
        product: "700_Square_W/_Motif_Fascia_-_Black",
      },
      { brand: "Living_Fire", product: "Curved_Stand_-_4pc_Set" },
      { brand: "Morso", product: "Grill_Forno_II_Outdoor_Oven" },
      { brand: "Living_Fire", product: "Fire_Grate_-_915mm" },
      { brand: "Living_Fire", product: "Fire_Grates_-_Premium_Range_-_600mm" },
      {
        brand: "Living_Fire",
        product: "Fire_Grates_-_Premium_Range_-_8_Bar_-_750mm",
      },
      {
        brand: "Living_Fire",
        product: "Fixed_Wing_Sloping__-_Large_Fire_Screen",
      },
      {
        brand: "Living_Fire",
        product: "Fixed_Wing_Sloping_Fire_Screen__-_Small",
      },
      { brand: "Living_Fire", product: "Flaming_Magic_30g" },
      {
        brand: "Living_Fire",
        product: "Heavy_Duty_Classic__Black_-_Brass_-_4pc_Set",
      },
      { brand: "Living_Fire", product: "Tongio_Forging_-__Tongs" },
      { brand: "Living_Fire", product: "Tongio_Forging_-_Deluxe_-_3pc_Set" },
      {
        brand: "Living_Fire",
        product: "Tongio_Forging_-_Deluxe_-_Poker_-_Log_Roller",
      },
      { brand: "Living_Fire", product: "Tongio_Forging_-_Rake" },
      { brand: "Living_Fire", product: "Tongio_Forging_-_Riviera_-_3pc_Set" },
      { brand: "Living_Fire", product: "Tongio_Forging_-_Tongs_-_4pc_Set" },
      { brand: "Living_Fire", product: "Tongio_Forging_Deluxe_-_4pc_Set" },
      { brand: "Living_Fire", product: "Wood_Storage_-_Wood_Ring_With_Tray" },
      { brand: "Living_Fire", product: "Gated_Fire_Screen" },
      { brand: "Morso", product: "Forno_-_S/S_Fire_Divide" },
      { brand: "Morso", product: "Forno_-_Terra_Set" },
      { brand: "Morso", product: "Forno_-_Terra_Table" },
      { brand: "Morso", product: "Forno_Outdoor_-_Garden_Table" },
      { brand: "Morso", product: "Forno_-_Door" },
      { brand: "Morso", product: "Forno_Garden_Table_-_Cover" },
      { brand: "Morso", product: "Grill_Forno_-_Cover" },
      { brand: "Morso", product: "Grill_Forno_-_Door" },
      { brand: "Hergom", product: "Hergom_Fire_Pit_-_Ignis" },
      { brand: "Eurostove", product: "Loxton_5_Standard" },
      { brand: "Hergom", product: "Hergom_Fire_Pit_-_Zenith" },
      { brand: "Morso", product: "Morso_-_Culi_BBQ_Grill_Turner_[Spatula]" },
      { brand: "Morso", product: "Morso_-_Faro_Lantern_-_30h" },
      { brand: "Morso", product: "Morso_-_Faro_Lantern_-_55h" },
      { brand: "Morso", product: "Forno_-_Cover" },
      { brand: "Morso", product: "Forno_-_Flue_Pipe" },
      { brand: "Morso", product: "Morso_-_Fire_Tongs" },
      { brand: "Morso", product: "Morsø_-_Frying_Dish_and_Serving_Plate" },
      { brand: "Morso", product: "Morso_-_Garden_Table_Shelf" },
      { brand: "Morso", product: "Morso_-_Kamino_Cover" },
      { brand: "Morso", product: "Morso_-_Multi_Cocotte_4.6L_w/_Griddle_Lid" },
      { brand: "Morso", product: "Morso_-_Outdoor_Side_Table" },
      { brand: "Morso", product: "Morso_-_Pizza_&_Herb_Cutter" },
      { brand: "Morso", product: "Morso_-_Pizza_Peel" },
      { brand: "Morso", product: "Morso_-_Smokeeper" },
      { brand: "Morso", product: "Morso_-_Smoker_Box" },
      { brand: "Morso", product: "Morso_-_Steel_Handle" },
      { brand: "Morso", product: "Morso_Grill_17" },
      { brand: "Morso", product: "Morso_-_Table_Cover" },
      { brand: "Morso", product: "Morso_-_Tuscan_Grill" },
      { brand: "Morso", product: "Morso_-_Tuscan_Plancha" },
      {
        brand: "Paul_Agnew_Designs",
        product: "6000_Pattern_Square_Fascia_-_Black",
      },
      { brand: "Morso", product: "Morso_-_Vetro_Pizza_&_Frying_Plate" },
      { brand: "Morso", product: "Morso_Grill_-_Cover" },
      { brand: "Morso", product: "Forno_-_Brick_Set" },
      { brand: "Morso", product: "Forno_-_Terra_Table_Shelf" },
      { brand: "Morso", product: "Morso_-_Ash_Scraper" },
      { brand: "Paul_Agnew_Designs", product: "Athena_-_Black_Granite_-_1500" },
      { brand: "Paul_Agnew_Designs", product: "Riversdale_-_White_-_1500" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Bouvet_-_Italian_Carrara_-_1310",
      },
      { brand: "Paul_Agnew_Designs", product: "Chilton-White-1370" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Hampshire_-_Standard_Raw_-_1500",
      },
      { brand: "Paul_Agnew_Designs", product: "Milos_-_Lu_Grey_-_1310" },
      {
        brand: "Paul_Agnew_Designs",
        product: "700_Victorian_Fascia_-_Polished",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "New_William_IV_-_Italian_Cararra_-_1500",
      },
      { brand: "Paul_Agnew_Designs", product: "Paros_-_Lu_Grey_-_1459" },
      {
        brand: "Paul_Agnew_Designs",
        product: "Naxos_Mantel_-_Luna_Grey_-_1420",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Victorian_Arched_-_Italian_Cararra_-_1650",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Victorian_Arched_-_Mocha_Beige_-_1650",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Victorian_Corbel_-_Mocha_Beige_-_1470",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Victorian_Corbel_-_Mocha_Beige_-_1500",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Victorian_Corbel_-_White_-_1470",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "Windsor_-_Italian_Cararra_-_1650",
      },
      { brand: "Paul_Agnew_Designs", product: "Hampshire_-_Large_Raw_-_1650" },
      { brand: "Paul_Agnew_Designs", product: "700_Classic_Fascia_-_Black" },
      {
        brand: "Paul_Agnew_Designs",
        product: "700_Decorative_Fascia_-_Arched_-_Polished",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "700_Decorative_Square_Fascia_-_Polished",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "850_Victorian_Arch_Fascia_-_Black",
      },
      { brand: "Paul_Agnew_Designs", product: "Camden_Insert_-_Black" },
      { brand: "Paul_Agnew_Designs", product: "Dublin_Insert_-_Black" },
      { brand: "Paul_Agnew_Designs", product: "550_Classic_Fascia_-_Black" },
      { brand: "Paul_Agnew_Designs", product: "Integra_Anson" },
      { brand: "Paul_Agnew_Designs", product: "Malvern_Insert_Black" },
      { brand: "Paul_Agnew_Designs", product: "Royal_Arch_Insert_-_Black" },

      {
        brand: "Living_Fire",
        product: "Aeris_Hanging_%E2%80%93_Black_Shell_-_S%2FS_Pole",
      },
      {
        brand: "Living_Fire",
        product: "Double_Sided_Slimline_Firebox_1350_-_Brushed_S%2FS_Fascia",
      },
      {
        brand: "ADF",
        product: "Linea_100_B_Duo_L_Freestanding_Heater_%5BInc_Open_Base%5D",
      },
      {
        brand: "Living_Fire",
        product: "Cocoon_Pedestal_Standing_%E2%80%93_Black_Shell_-_S%2FS_Stand",
      },
      { brand: "Living_Fire", product: "Vellum_Wall_Mounted_-_S%2FS" },
      {
        brand: "Living_Fire",
        product: "2_Tier_Wood_Rack_w%2F_Firetools_-_Large",
      },
      {
        brand: "Living_Fire",
        product: "4-Fold_Fire_Screen_Black_W%2F_Pewter_Finish",
      },
      {
        brand: "Living_Fire",
        product: "3-Fold_Rounded_-_Black_W%2F_Nickel_Plated_Top_Frame",
      },
      {
        brand: "Paul_Agnew_Designs",
        product: "700_Square_W%2F_Motif_Fascia_-_Black",
      },
      { brand: "Morso", product: "Forno_-_S%2FS_Fire_Divide" },
      {
        brand: "Morso",
        product: "Morso_-_Culi_BBQ_Grill_Turner_%5BSpatula%5D",
      },
      { brand: "Morso", product: "Mors%C3%B8_-_Frying_Dish_and_Serving_Plate" },
      {
        brand: "Morso",
        product: "Morso_-_Multi_Cocotte_4.6L_w%2F_Griddle_Lid",
      },
      { brand: "Morso", product: "Morso_-_Pizza_%26_Herb_Cutter" },
      { brand: "Morso", product: "Morso_-_Vetro_Pizza_%26_Frying_Plate" },
    ];
    const productNames = products.map((p) => p.product);
    let priority = "0.7"; // Default priority
    if (cleanedUrl === "/" || !cleanedUrl) {
      priority = "1.0"; // Highest priority for homepage
    } else if (cleanedUrl.includes("/home")) {
      priority = "1.0";
    } else if (cleanedUrl.includes("/allProducts")) {
      priority = "0.8";
    } else if (productNames?.some((product) => cleanedUrl.includes(product))) {
      priority = "0.9";
    }
    let changefreq = "monthly"; // default

    if (priority === "1.0") {
      changefreq = "daily";
    } else if (priority === "0.9") {
      changefreq = "weekly";
    } else if (priority === "0.8") {
      changefreq = "weekly";
    } else if (priority === "0.7") {
      changefreq = "monthly";
    }
    // products?.map(product => {
    //   if (cleanedUrl.includes(product)) {
    //     priority = "0.9";
    //   }
    // })

    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}${cleanedUrl}</loc>\n`;
    xml += `    <lastmod>${lastModDate}</lastmod>\n`;
    xml += `    <changefreq>${
      changefreq ? changefreq : "monthly"
    }</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;

    // Add images for product pages
    if (
      cleanedUrl.includes("/Paul_Agnew_Designs/") ||
      cleanedUrl.match(/\/[^/]+\/[^/]+/)
    ) {
      const [brand, product] = cleanedUrl.split("/").filter(Boolean);

      try {
        const { rows } = await pool.query(
          `SELECT hero_image FROM tbl_master 
           WHERE brand_name = $1 AND name = $2`,
          [brand, product]
        );

        if (rows[0]?.hero_image) {
          const images = Array.isArray(rows[0].hero_image)
            ? rows[0].hero_image
            : [rows[0].hero_image];

          images
            .filter((img) => img?.value)
            .forEach((img) => {
              xml += `    <image:image>\n`;
              xml += `      <image:loc>${img.value}</image:loc>\n`;
              xml += `      <image:title>${brand} ${product}</image:title>\n`;
              xml += `    </image:image>\n`;
            });
        }
      } catch (error) {
        console.error(`Error fetching images for ${cleanedUrl}:`, error);
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}

// async function verifyImageWithGooglebot(imageUrl) {
//   try {
//     const response = await fetch(imageUrl, {
//       headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' }
//     });

//     return {
//       url: imageUrl,
//       status: response.status,
//       accessible: response.ok,
//       contentType: response.headers.get('content-type')
//     };
//   } catch (error) {
//     return {
//       url: imageUrl,
//       error: error.message,
//       accessible: false
//     };
//   }
// }
