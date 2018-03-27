Rails.application.routes.draw do
  # For details on the DSL available within this file, see <http:></http:>//guides.rubyonrails.org/routing.html

  match '/biddr', to: "biddr#index", via: :all
  match '/biddr/*path', to: "biddr#index", via: :all


  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :auction1s do
        resources :bids, only: [:index, :show, :create, :destroy], shallow: true
      end
      resources :tokens, only: [:create], shallow: true
      resources :users
      match '*unmatched_route', to: 'application#not_found', via: :all
    end
  end
end
