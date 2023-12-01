class MoviesController < ApplicationController
  def new
    # We need @restaurant in our `simple_form_for`
    @movie = Movie.new
  end

  def create
      @movie = Movie.new(movie_params)
      @list = List.find_by(id: params[:movie][:list_id])

      if @movie.save
        @list.movies << @movie if @list.present?
        redirect_to movie_path(@movie)
      else
        render :new
      end
    end


  private

  def set_movie
    @movie = Movie.find(params[:id])
  end

  def movie_params
    params.require(:movie).permit(:title, :poster_url, :overview, :list_id)
  end
end
