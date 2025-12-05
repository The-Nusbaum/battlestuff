# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_05_000021) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pg_trgm"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "rules_level", ["introductory", "standard", "advanced", "experimental", "era_specific"]
  create_enum "tech_base", ["inner_sphere", "clan", "mixed"]

  create_table "chassis", force: :cascade do |t|
    t.string "name", null: false
    t.string "inner_sphere_nickname"
    t.string "chassis_code"
    t.string "unit_type", null: false
    t.integer "tonnage", null: false
    t.boolean "is_omni", default: false
    t.enum "tech_base", default: "inner_sphere", null: false, enum_type: "tech_base"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chassis_code"], name: "index_chassis_on_chassis_code"
    t.index ["inner_sphere_nickname"], name: "index_chassis_on_inner_sphere_nickname"
    t.index ["is_omni"], name: "index_chassis_on_is_omni"
    t.index ["name", "chassis_code"], name: "index_chassis_on_name_and_chassis_code", unique: true
    t.index ["name"], name: "index_chassis_on_name"
    t.index ["tech_base", "is_omni"], name: "index_chassis_on_tech_base_and_is_omni"
    t.index ["tech_base"], name: "index_chassis_on_tech_base"
    t.index ["tonnage"], name: "index_chassis_on_tonnage"
    t.index ["unit_type", "tonnage"], name: "index_chassis_on_unit_type_and_tonnage"
  end

  create_table "equipment", force: :cascade do |t|
    t.string "name", null: false
    t.string "equipment_type"
    t.boolean "is_clan", default: false
    t.decimal "tonnage", precision: 6, scale: 2
    t.integer "critical_slots"
    t.integer "heat"
    t.integer "damage"
    t.integer "min_range"
    t.integer "short_range"
    t.integer "medium_range"
    t.integer "long_range"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipment_type"], name: "index_equipment_on_equipment_type"
    t.index ["name", "is_clan"], name: "index_equipment_on_name_and_is_clan", unique: true
    t.index ["name"], name: "index_equipment_on_name"
  end

  create_table "eras", force: :cascade do |t|
    t.string "name", null: false
    t.integer "code"
    t.integer "start_year"
    t.integer "end_year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_eras_on_code"
    t.index ["name"], name: "index_eras_on_name", unique: true
  end

  create_table "manufacturers", force: :cascade do |t|
    t.string "name", null: false
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "location"], name: "index_manufacturers_on_name_and_location", unique: true
    t.index ["name"], name: "index_manufacturers_on_name"
  end

  create_table "quirks", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "quirk_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_quirks_on_name", unique: true
  end

  create_table "sources", force: :cascade do |t|
    t.string "name", null: false
    t.string "path"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_sources_on_name", unique: true
  end

  create_table "unit_actuators", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.boolean "left_lower_arm", default: true
    t.boolean "left_hand", default: true
    t.boolean "right_lower_arm", default: true
    t.boolean "right_hand", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_actuators_on_unit_id"
  end

  create_table "unit_armors", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "armor_type", null: false
    t.string "manufacturer"
    t.integer "techbase"
    t.integer "head"
    t.integer "center_torso"
    t.integer "center_torso_rear"
    t.integer "left_torso"
    t.integer "left_torso_rear"
    t.integer "right_torso"
    t.integer "right_torso_rear"
    t.integer "left_arm"
    t.integer "right_arm"
    t.integer "left_leg"
    t.integer "right_leg"
    t.integer "front"
    t.integer "left"
    t.integer "right"
    t.integer "rear"
    t.integer "primary_turret"
    t.integer "secondary_turret"
    t.integer "rotor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_armors_on_unit_id"
  end

  create_table "unit_cockpits", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "cockpit_type", null: false
    t.boolean "ejection_seat", default: false
    t.boolean "command_console", default: false
    t.boolean "fhes", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_cockpits_on_unit_id"
  end

  create_table "unit_engines", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.integer "rating", null: false
    t.string "engine_type", null: false
    t.string "manufacturer"
    t.integer "techbase"
    t.integer "left_side_start", default: -1
    t.integer "right_side_start", default: -1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_engines_on_unit_id"
  end

  create_table "unit_equipment", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.bigint "equipment_id", null: false
    t.string "manufacturer"
    t.string "location"
    t.integer "location_index"
    t.boolean "rear_facing", default: false
    t.integer "quantity", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipment_id"], name: "index_unit_equipment_on_equipment_id"
    t.index ["unit_id", "equipment_id", "location"], name: "index_unit_equipment_on_unit_id_and_equipment_id_and_location"
    t.index ["unit_id"], name: "index_unit_equipment_on_unit_id"
  end

  create_table "unit_fluff", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.text "overview"
    t.text "capabilities"
    t.text "battle_history"
    t.text "deployment"
    t.text "variants"
    t.text "notables"
    t.text "additional"
    t.string "jumpjet_model"
    t.string "comm_system"
    t.string "targeting_system"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_fluff_on_unit_id"
  end

  create_table "unit_gyros", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "gyro_type", null: false
    t.integer "techbase"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_gyros_on_unit_id"
  end

  create_table "unit_heatsinks", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.integer "count", null: false
    t.string "heatsink_type", null: false
    t.integer "techbase"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_heatsinks_on_unit_id"
  end

  create_table "unit_jumpjets", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.integer "count", default: 0
    t.string "jumpjet_type"
    t.string "manufacturer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_jumpjets_on_unit_id"
  end

  create_table "unit_loadouts", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "source_book"
    t.text "info_summary"
    t.boolean "fcs_artemis_iv", default: false
    t.boolean "fcs_artemis_v", default: false
    t.boolean "fcs_apollo", default: false
    t.boolean "clan_case", default: false
    t.decimal "turret_limit", precision: 6, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_loadouts_on_unit_id"
  end

  create_table "unit_motives", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "motive_type", null: false
    t.integer "cruise_mp"
    t.integer "flank_mp"
    t.string "turret_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_motives_on_unit_id"
  end

  create_table "unit_quirks", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.bigint "quirk_id", null: false
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quirk_id"], name: "index_unit_quirks_on_quirk_id"
    t.index ["unit_id", "quirk_id"], name: "index_unit_quirks_on_unit_id_and_quirk_id", unique: true
    t.index ["unit_id"], name: "index_unit_quirks_on_unit_id"
  end

  create_table "unit_structures", force: :cascade do |t|
    t.bigint "unit_id", null: false
    t.string "structure_type", null: false
    t.string "manufacturer"
    t.integer "techbase"
    t.boolean "flotation", default: false
    t.boolean "limited_amphibious", default: false
    t.boolean "full_amphibious", default: false
    t.boolean "dune_buggy", default: false
    t.boolean "environmental_sealing", default: false
    t.boolean "trailer", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_structures_on_unit_id"
  end

  create_table "units", force: :cascade do |t|
    t.bigint "chassis_id", null: false
    t.string "variant_code"
    t.string "variant_name"
    t.string "full_model_designation"
    t.string "motive_type"
    t.string "file_path"
    t.bigint "source_id"
    t.bigint "era_id"
    t.bigint "manufacturer_id"
    t.enum "rules_level", enum_type: "rules_level"
    t.integer "year"
    t.boolean "year_restricted", default: false
    t.integer "production_era"
    t.integer "battle_value"
    t.decimal "cost", precision: 15, scale: 2
    t.integer "solaris7_id"
    t.integer "solaris7_image_id"
    t.string "ssw_image"
    t.integer "ssw_savefile_version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_value"], name: "index_units_on_battle_value"
    t.index ["chassis_id", "source_id"], name: "index_units_on_chassis_id_and_source_id"
    t.index ["chassis_id", "variant_code", "variant_name"], name: "idx_units_chassis_variant", unique: true
    t.index ["chassis_id"], name: "index_units_on_chassis_id"
    t.index ["era_id"], name: "index_units_on_era_id"
    t.index ["full_model_designation"], name: "index_units_on_full_model_designation"
    t.index ["manufacturer_id"], name: "index_units_on_manufacturer_id"
    t.index ["rules_level"], name: "index_units_on_rules_level"
    t.index ["source_id", "full_model_designation"], name: "index_units_on_source_id_and_full_model_designation"
    t.index ["source_id"], name: "index_units_on_source_id"
    t.index ["variant_code"], name: "index_units_on_variant_code"
    t.index ["variant_name"], name: "index_units_on_variant_name"
    t.index ["year"], name: "index_units_on_year"
  end

  add_foreign_key "unit_actuators", "units"
  add_foreign_key "unit_armors", "units"
  add_foreign_key "unit_cockpits", "units"
  add_foreign_key "unit_engines", "units"
  add_foreign_key "unit_equipment", "equipment"
  add_foreign_key "unit_equipment", "units"
  add_foreign_key "unit_fluff", "units"
  add_foreign_key "unit_gyros", "units"
  add_foreign_key "unit_heatsinks", "units"
  add_foreign_key "unit_jumpjets", "units"
  add_foreign_key "unit_loadouts", "units"
  add_foreign_key "unit_motives", "units"
  add_foreign_key "unit_quirks", "quirks"
  add_foreign_key "unit_quirks", "units"
  add_foreign_key "unit_structures", "units"
  add_foreign_key "units", "chassis"
  add_foreign_key "units", "eras"
  add_foreign_key "units", "manufacturers"
  add_foreign_key "units", "sources"
end
