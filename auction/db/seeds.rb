# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
PASSWORD = 'supersecret'

User.destroy_all
#
super_user = User.create(
  first_name: 'John',
  last_name: 'Snow',
  email: 'js@winterfell.gov',
  password: PASSWORD,
)

10.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name

  User.create(
    first_name: first_name,
    last_name: last_name,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD
  )
end

users = User.all

puts Cowsay.say("Created #{users.count} users", :tux)

Auction1.destroy_all
Bib.destroy_all

20.times do
    Auction1.create(
    title: Faker::Commerce.product_name,
    details: Faker::Commerce.material + ',' + Faker::Commerce.product_name + ',' + Faker::Science.element,
    ends_on: Faker::Date.between(2.days.from_now, Date.today),
    reserve_price: Faker::Commerce.price,
    user: users.sample
  )
  # byebug
end

auctions = Auction1.all

puts Cowsay.say("Created #{auctions.count} auctions", :ghostbusters)


auctions.each do |auction|
  rand(0..5).times.each do
    Bib.create(
      bid: Faker::Commerce.price,
      auction1: auction,
      user: users.sample
    )
  end
end

bids = Bib.all

puts Cowsay.say("Create #{bids.count} bids", :moose)

puts "Login as admin with #{super_user.email} and password of '#{PASSWORD}'!"
