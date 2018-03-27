class Bib < ApplicationRecord

  belongs_to :user
  belongs_to :auction1

  validates :bid, presence: true
end
