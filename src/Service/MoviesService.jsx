export const getMoviesById = (id,movies) => {
    // Tìm phim có ID khớp với ID yêu cầu
    return movies?.find((movie) => movie.id === id);
};
