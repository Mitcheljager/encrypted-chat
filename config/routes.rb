Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  root "rooms#index"

  resources :rooms, only: [:create, :show], param: :uuid
  resources :authentications, only: [:create], param: :uuid
  get "authenticate/:room_uuid", to: "authentications#index", as: "authenticate"

  resources :messages, only: [:create]
end
