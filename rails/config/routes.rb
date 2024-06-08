Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      resources :posts, only: [:index, :show, :create, :update, :destroy]
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/registrations'
      }

      namespace :current do
        resource :user, only: [:show]
      end
    end
  end
end
