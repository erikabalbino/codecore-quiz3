class Api::V1::Auction1sController < Api::ApplicationController
  before_action :authenticate_user!
  before_action :find_auction, only: [:show, :destroy, :update]

  def index
    @auctions = Auction1.order(created_at: :desc)
    render json: @auctions
  end

  def show
    render json: @auction
  end

  def create
    auction = Auction1.new(auction_params)
    auction.user = current_user

    if auction.save!
      render json: {id: auction.id}
    else
      render json: { error: auction.errors.full_messages }
    end
  end

  def destroy
    if @auction.destroy
      render json: {}
    else
      head :bad_request
    end
  end

  private
  def find_auction
    @auction = Auction1.find params[:id]
  end

  def auction_params
    params.require(:auction1).permit(:title, :details, :ends_on, :reserve_price)
  end
end
