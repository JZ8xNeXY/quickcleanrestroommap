require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET api/v1/posts' do
    subject { get(api_v1_posts_path) }

    it '正常にレスポンスが返る' do
      subject
      res = JSON.parse(response.body)
      puts(response.body)
      puts(res)
      expect(response).to have_http_status(:success)
    end
  end
end
