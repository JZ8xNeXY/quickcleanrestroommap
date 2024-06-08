class Api::V1::PostsController < ApplicationController
  def index
    logger.info "Fetching posts from the database..."
    posts = Post.all
    logger.info "Successfully fetched posts: #{posts.inspect}"
    render json: posts
  rescue StandardError => e
    logger.error "PostsController#index error: #{e.message}"
    logger.error e.backtrace.join("\n")
    render json: { error: 'Internal Server Error' }, status: :internal_server_error
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

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: post, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:name, :address, :content, :latitude, :longitude,
                                 :nursing_room, :anyone_toilet, :diaper_changing_station,
                                 :powder_corner, :stroller_accessible, :evaluation, :image)
  end
end
