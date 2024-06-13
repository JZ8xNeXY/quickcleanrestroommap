require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  let(:post) { FactoryBot.create(:post) }

  describe '施設情報を登録できる場合' do
    context 'すべての項目が存在すれば登録できる' do
      it 'すべての項目が存在すれば登録できる' do
        expect(post).to be_valid
      end

      it 'nameが空でもimageがあれば登録できる' do
        post.name = ''
        expect(post).to be_valid
      end

      it 'imageが空でもnameがあれば登録できる' do
        post.image = nil
        expect(post).to be_valid
      end
    end
  end
end
