class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :address, :content, :latitude, :longitude,
                                 :nursing_room, :anyone_toilet, :diaper_changing_station,
                                 :powder_corner, :stroller_accessible, :image)
  end
end
