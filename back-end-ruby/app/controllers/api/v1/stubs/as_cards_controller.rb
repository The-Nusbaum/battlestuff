# frozen_string_literal: true

module Api
  module V1
    module Stubs
      class AsCardsController < ApplicationController
        def index
          render json: {
            name: 'name',
            tp: 'TYPE',
            sz: 2,
            tmm: 2,
            mv: '5"t',
            role: 'Brawler',
            skill: 4,
            skill_base: 4,
            armor: {
              max: 5,
              current: 3
            },
            structure: {
              max: 3,
              current: 1
            },
            specials: [
              {
                shortName: 'Special 1',
                fullName: 'Special 1 full name',
                description: 'Special 1 description',
                source: 'Special 1 source'
              },
              {
                shortName: 'Special 2',
                fullName: 'Special 2 full name',
                description: 'Special 2 description',
                source: 'Special 2 source'
              },
              {
                shortName: 'Special 3',
                fullName: 'Special 3 full name',
                description: 'Special 3 description',
                source: 'Special 3 source'
              }
            ],
            criticals: {
              engine: {
                max: 2,
                current: 0
              },
              fireControl: {
                max: 4,
                current: 0
              },
              weapons: {
                max: 4,
                current: 0
              },
              motive: {
                max: 4,
                current: 0
              }
            },
            damages: {
              short: '5',
              medium: '4',
              long: '3',
              horizon: '1*'
            },
            pv: {
              base: 69,
              current: 69
            }
          }
        end
      end
    end
  end
end

