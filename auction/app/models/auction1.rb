class Auction1 < ApplicationRecord

  belongs_to :user

  has_many :bibs, dependent: :destroy

  validates :title, presence: true, uniqueness: true

  validates :reserve_price, numericality: {greater_than_or_equal_to: 0}

  validates :details,
  presence: {message: "must be given"},
  length: {minimum: 5, maximum: 2000}
end
