module Api
  module V1
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      def create
        render json: { error: 'User registration is not allowed' }, status: :forbidden
      end
    end
  end
end
