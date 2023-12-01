  class ReviewsController < ApplicationController
    before_action :set_list, only: %i[new create]
    def new
      # We need @restaurant in our `simple_form_for`
      @list = List.find(params[:list_id])
      @review = Review.new
    end

    def create
      @review = Review.new(review_params)
      @review.list = @list
      @review.save
      redirect_to list_path(@list)
    end

    private

    def set_list
      @list = List.find(params[:list_id])
    end

    def review_params
      params.require(:review).permit(:content, :vote)
    end

  end
