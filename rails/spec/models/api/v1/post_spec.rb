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

      it 'addressが空でも登録できる' do
        post.address = ''
        expect(post).to be_valid
      end

      it 'contentが空でも登録できる' do
        post.content = ''
        expect(post).to be_valid
      end
    end

    context '施設情報を登録できない場合' do
      it 'longitudeが空では登録できない' do
        post.longitude = ''
        post.valid?
        expect(post.errors.full_messages).to include("Longitude can't be blank")
      end

      it 'latitudeが空では登録できない' do
        post.latitude = ''
        post.valid?
        expect(post.errors.full_messages).to include("Latitude can't be blank")
      end

      it 'evaluationが空では登録できない' do
        post.evaluation = ''
        post.valid?
        expect(post.errors.full_messages).to include('Evaluation must be between 1 and 5')
      end

      it 'evaluationが0では登録できない' do
        post.evaluation = 0
        post.valid?
        expect(post.errors.full_messages).to include('Evaluation must be between 1 and 5')
      end

      it 'evaluationが6以上では登録できない' do
        post.evaluation = 6
        post.valid?
        expect(post.errors.full_messages).to include('Evaluation must be between 1 and 5')
      end

      it 'evaluationが少数では登録できない' do
        post.evaluation = 3.5
        post.valid?
        expect(post.errors.full_messages).to include('Evaluation must be an integer')
      end

      it 'nameかつimageが空では登録できない' do
        post.name = ''
        post.image = nil
        post.valid?
        expect(post.errors.full_messages).to include("Name can't be blank")
      end
    end
  end
end
