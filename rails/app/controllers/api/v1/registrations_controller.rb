module Api
  module V1
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      before_action :ensure_admin!, only: [:create]

      private

      def ensure_admin!
        unless current_user
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end
    end
  end
end
