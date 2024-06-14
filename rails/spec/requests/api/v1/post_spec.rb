RSpec.describe 'Api::V1::Registrations', type: :request do
  describe 'POST api/v1/auth' do
    subject { post(api_v1_user_registration_path, params: valid_attributes) }

    let(:valid_attributes) do
      {
        email: 'test@example.com',
        password: 'password'
      }
    end

    it '新規ユーザーの登録ができないこと' do
      subject
      res = JSON.parse(response.body)
      expect(res['error']).to eq 'User registration is not allowed'
      expect(response).to have_http_status(:forbidden)
    end
  end
end
