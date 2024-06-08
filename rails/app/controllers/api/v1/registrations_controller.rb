module Api
  module V1
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        before_action :forbid_registration

        private

        def forbid_registration
          render json: { error: '新規登録は許可されていません。' }, status: :forbidden
        end
      end
  end
end
